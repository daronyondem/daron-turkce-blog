---
FallbackID: 2954
Title: Table Services (SDK2.5) : Sinsi Relationlar
PublishDate: 14/2/2015
EntryID: Table_Services_SDK25_Sinsi_Relationlar
IsActive: True
Section: software
MinutesSpent: 61
Tags: Azure Storage Services, NOSQL, Windows Azure
---
Konuyla ilgili bir önceki yazı; [Azure Storage Table
Services](http://daron.yondem.com/software/post/Azure_Storage_Table_Services_SDK2_5)

Table Services ile bir önceki yazıda bazı konuları bir sonraki :) yazıya
yani bugüne bırakmıştık. Gelin şimdi kaldığımız yerden devam edelim.

Table Service ile uğraşırken relation desteğinin olmadığından ve aslında
bunun da en büyük farklılıklardan biri olduğundan bahsetmiştik. Hatta
eğer ki kuvvetli bir relational yapıya ihtiyacınız varsa tabi ki SQL
Azure tarafına doğru kaymanız gerektiğini de söylemiştik :) Amma :) tabi
ki mini relationlarla ilgili ilginç çözümler uygulayabiliriz. Bu ilginç
çözümleri uygularken de isteyeceğimiz bir diğer şey Entity Group
Transaction'ların mantıksal relation yapımızda kullanılabiliyor olması.
Biliyorsunuz EGT'ler sadece aynı table ve aynı partition içerisinde olan
nesneler arasında kullanılabiliyordu. Peki bir relational iki farklı
nesneyi nasıl olur da aynı partition ve aynı table'da tutarız?

### Çözüm basit!

Gerçekten basit :) Çünkü birincisi Table Services'daki her table'ın
şeması tamamen esnek. Yani bir table yaratırken şema vermediğimiz gibi
sonradan bir table'a istediğimiz kadar farklı şemada farklı nesneler
koyabiliyoruz. Önemli olan tek birşey var, tüm nesnelerin kesinlikle
PartitionKey, RowKey ve TimeStamp'i olmalı. Peki iki farklı nesneyi
nasıl tek tabloda tutarız? 

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
CloudTable table = tableClient.GetTableReference("Urunler");
await table.CreateIfNotExistsAsync();

var yeniUrun = new Urun
{
    PartitionKey = "Musteri1",
    RowKey = "Ürün1",
    Adi = "Deneme",
    Aciklama = "Açıklama"
};
var yeniDetay = new UrunDetay
{
    DetayMetin = "Deneme",
    PartitionKey = "Musteri1",
    RowKey = "detay_Ürün1"
};

TableBatchOperation batchOperation = new TableBatchOperation();
batchOperation.InsertOrMerge(yeniUrun);
batchOperation.InsertOrMerge(yeniDetay);

IList<TableResult> results = await table.ExecuteBatchAsync(batchOperation);
```

Durum çok basit değil mi? Artık tabloda iki farklı şemada iki farklı
nesne var. Bu noktada düşünmemiz gereken birkaç şey var :) Birincisi bir
tabloya PartitionKey, RowKey harici bir sorgu gönderirsek ne olacak?
Yani "where" kısmında "DetayMetin" ile ilgili araması olan bir sorgu
gönderirsem aynı tabloda bütün Urun nesneleri de gezilecek mi? Oysa
Urun'lerin böyle bir özelliği yok. İşte tam da bu sorunu çözmek ve aynı
tablodaki bu iki farklı nesne tipini birbirinden rahat bir şekilde ayırt
edebilmek için .... RowKey'e dikkat :) Aslında iki nesne arasındaki
ilişkiyi de RowKey üzerinde tutmuş durumdayım. İlk nesnenin RowKey
değerini alıp önüne bir "preFix" ekleyip UrunDetay nesnesinin RowKey'ine
verdim. Böylece rahatlıkla istediğimiz zaman bir detay bilgisi almak
istediğimizde ana nesnenin RowKey'inin başına "detay\_" ekleyerek ikinci
bir sorguyla da detayını alabiliriz ;) 

Unutmadan, yukarıdaki senaryoda hem ana, hem de detay nesnesini aynı transaction'da gönderdiğimize de dikkat çekmek istiyorum :) Nitekim bu iki yapıyı iki farklı tabloda tutsak bu gibi pratik bir transaction desteğimiz olmayacaktı. 

Peki tek tabloda iki farklı nesne tipi saklarsak okuma işlemi esnasından ne olur? Standard prosedürle devam ederseniz hiçbir şey olmaz :) Gelen verinin ne olduğuna, ne tipte olduğuna dinamik nesneler alarak tek tek kontrol etmeniz gerekir. Table Services arka planda sizin verdiğiniz farklı nesne şemalarında dinamik kısımları XML'e serialize ederek SQL'de saklıyor. Table Services'ın iç yapısı tahmin ettiğinizden daha basit aslında. Önceden tanımlı kolonlar olan PartitionKey, RowKey ve TimeStamp dışında her şey XML'e serialize edilip saklanıyor. Siz okumaya kalktığınızda ise malum deserialize edilirken aynı anda farklı şemalarda nesneler alırsanız bunu bir DyanmicEntity tablosu olarak size verecektir. Bu tablodaki her DynamicEntity'nin farklı bir şeması oluyor. Tabi bizim istediğimiz bu şemalardaki farklılıkların elimizdeki entity'lerle eşleşmesi. Örneğimizde kullandığımız entitylerde ufak bir değişiklik yaparak süreci kolaylaştırmak adına UrunDetay nesnesini Urun'den Inherit edecek şekilde ayarlayalım. Sonra da "Resolver" neymiş ona bakalım.

**[C\#]**
```cs
EntityResolver<Urun> resolver = (pk, rk, ts, props, etag) =>
{
    Urun birUrun = null;
    if (props.ContainsKey("DetayMetin"))
    {
        birUrun = new UrunDetay(); 
    }
    else
    {
        birUrun = new Urun(); 
    }
    birUrun.PartitionKey = pk;
    birUrun.RowKey = rk;
    birUrun.Timestamp = ts;
    birUrun.ETag = etag;
    birUrun.ReadEntity(props, null);
    return birUrun;
};

TableQuery<DynamicTableEntity> query = new TableQuery<DynamicTableEntity>()
    .Where(TableQuery.CombineFilters(
        TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Musteri1"),
        TableOperators.And,
        TableQuery.CombineFilters(
             TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, "Ürün1"),
             TableOperators.Or,
             TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, 
                string.Format("detay_{0}", "Ürün1")))));
var result = table.ExecuteQuery(query, resolver);
```

Yukarıdaki kod içerisinde iki yeni yapı ile karşılaşıyoruz. Bunlardan ilki **"EntityResolver"**. EntityResolver'ın görevi içerisindeki mantığa göre gelen DynamicEntity'lerin tam olarak neye çevrileceğine karar vermek. Biz örneğimizdeki basit bir şekilde gelen nesnenin "DetayMetin" adındaki bir property'si var mı, yok mu noktasını kontrol ediyoruz. Eğer DetayMetin yoksa demek ki gelen arkadaş bir Ürün :) Bu mantığa göre hangi nesnenin Initialize edileceğine karar verip mapping işini yine SDK'ye bırakıyoruz. Resolver'ımız hazır olduktan sonra sıra geliyor uygun sorguyu Table Services'a göndermeye. Öyle bir sorgu göndermeliyiz ki bir defada hem ana nesneyi hem de detay nesnesini alalım. Nitekim bu noktada "Arkadaş böyle yapacaksan bunu flatten etseydin ya!" diyebilirsiniz :) Senaryoya değil neyin nasıl yapıldığına odaklanın. Aksi halde tabi ki NOSQL ortamında sürekli beraber atomik şekilde kullanacağınız şeyleri iki ayrı entity olarak tutmak süper bir fikir değil. 

Konumuza geri dönersek, yukarıdaki kod örneğinde Table Services'a karşı komplike bir sorgunun nasıl oluşturulduğunu görebilirsiniz. Amacımız yine tek sorgu ile tam istediğimiz veriyi almak. Sorguda PartitionKey verdiğimiz için zaten Cross-Partition bir gezinme yaşanmayacak. İçerisinde bulunduğumuz Partition'da da RowKey üzerinden arama yapıyoruz. Anlayacağınız her şey yolunda :) 

Sorguyu çalıştırdığımızda geriye içerisinde iki entity bulunan bir liste geliyor. Liste içerisinde her nesne doğru şekilde bizim Urun ve UrunDetay nesnelerimizden yaratılacak deserialize edilmiş durumda. Her şey tam da istediğimiz gibi ;)

Görüşmek üzere!


