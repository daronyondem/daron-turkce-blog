---
FallbackID: 2783
Title: Table Services Round 2 : Sinsi Relationlar :)
PublishDate: 8/14/2012
EntryID: Table_Services_Round_2_Sinsi_Relationlar
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
**[Aşağıdaki makalenin SDK2.5 ile beraber yeni Azure özelliklerine uygunşekilde güncellenmiş halini[burada](http://daron.yondem.com/software/post/Table_Services_SDK25_Sinsi_Relationlar)bulabilirsiniz.]**Konuyla ilgili bir önceki yazı; [Azure Storage Table
Services](http://daron.yondem.com/tr/post/Azure_Storage_Table_Services)

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
nasıl tek tabloda tutarız? Tabi ki aynı tabloyu hedefleyen iki farklı
Context ile ;)

**[C\#]**
```cs
public class Urun : TableServiceEntity
{
    public string Adi { get; set; }
    public string Aciklama { get; set; }
}
public class UrunDetay : TableServiceEntity
{
    public string DetayMetin { get; set; }
}
```

İlk olarak yukarıdaki gibi iki farklı nesnemiz olduğunu ve bu nesnelerin
aslında birbirleri ile ilişkide olacaklarını varysalaım. Yeni özünde her
ürünün bir UrunDetay nesnesinin olacağını varsayıyoruz. Nesneleri
yukarıdaki şekilde tanımladıktan sonra bu nesneler için ayrı ayrı birer
de ServiceContext tanımlıyoruz.

**[C\# / UrunlerContext]**
```cs
public class UrunlerContext : TableServiceContext
{
    private static CloudStorageAccount storageAccount =
    CloudStorageAccount.FromConfigurationSetting("DataConnectionString");
    public UrunlerContext()
        : base(storageAccount.TableEndpoint.AbsoluteUri, storageAccount.Credentials)
    {
    }
    public DataServiceQuery<WebRole1.Entities.Urun> Urunler
    {
        get
        {
            return CreateQuery<WebRole1.Entities.Urun>("Urunler");
        }
    }
}
```

**[C\# / UrunDetayContext]**
```cs
public class UrunDetayContext : TableServiceContext
{
    private static CloudStorageAccount storageAccount =
    CloudStorageAccount.FromConfigurationSetting("DataConnectionString");
    public UrunDetayContext()
        : base(storageAccount.TableEndpoint.AbsoluteUri, storageAccount.Credentials)
    {
    }
    public DataServiceQuery<WebRole1.Entities.UrunDetay> UrunlerDetaylar
    {
        get
        {
            return CreateQuery<WebRole1.Entities.UrunDetay>("Urunler");
        }
    }
}
```

Gördüğünüz gibi her iki context'de doğrudan "Urunler" tablosunu
hedefliyor. Bu iki context'e birden INSERT yapmak istersek aşağıdaki
gibi bir kod kullanabiliriz tabi ki.

**[C\#]**
```cs
var urunlerContext = new UrunlerContext();
var yeniUrun = new Entities.Urun
{
    PartitionKey = "Musteri1",
    RowKey = "Ürün1",
    Adi = "Deneme",
    Aciklama = "Açıklama"
};
urunlerContext.AddObject("Urunler", yeniUrun);
urunlerContext.SaveChanges();

var urunDetaylarContext = new UrunDetayContext();
var yeniDetay = new Entities.UrunDetay
{
    DetayMetin = "Deneme",
    PartitionKey = "Musteri1",
    RowKey = "detay_Ürün1"
};
urunDetaylarContext.AddObject("Urunler", yeniDetay);
urunDetaylarContext.SaveChanges();
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

**[C\#]**
```cs
var urunDetaylarContext = new UrunDetayContext();
var urunlerContext = new UrunlerContext();

var ArananUrunKey = "Ürün1";
var AnaUrun = urunlerContext.Urunler.AsTableServiceQuery()
              .Where(c => c.RowKey == ArananUrunKey 
                       && c.PartitionKey == "Musteri1");
var Sonuc = urunDetaylarContext.UrunlerDetaylar.AsTableServiceQuery()
              .Where(c => c.RowKey == string.Format("detay_{0}", ArananUrunKey) 
              && c.PartitionKey == "Musteri1");
```

Görüşmek üzere!

Konunun devamı için; [Table Services Round 3 : Continuation
Token](http://daron.yondem.com/tr/post/Table_Services_Round_3_Continuation_Token)


