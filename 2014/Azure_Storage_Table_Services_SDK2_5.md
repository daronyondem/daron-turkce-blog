---
FallbackID: 2952
Title: Azure Storage Table Services (SDK2.5)
PublishDate: 12/10/2014
EntryID: Azure_Storage_Table_Services_SDK2_5
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, NOSQL, Windows Azure
---
Azure ortamında Storage Services kapsamında yarattığımız her bir Storage
account ile beraber bize bir blob, bir table, bir de queue servisi
sağlandığını biliyoruz. Bugüne kadar bloblarla ilgili birçok konuya
değinmiş olsak da daha Table servisi ile ilgili birşey yapmadık :) Şimdi
gelin Table Services yapısına bir giriş yapalım.

### Bir NOSQL hikayesi....

NoSQL genel olarak çoğu developer'ın ilgi alanı dahilinde olmamış bir
konseptti. İtiraf etmek gerekirse konseptin adlandırılmasında da bazı
problemler var aslında :) Özünde NoRel de denilebilir belki :) Nedenine
gelirsek, Azure'taki Table Services'in belki de normal bir SQL'den en
büyük farklılıklarından biri "relation" bulunmaması. Bazılarınız şu anda
"nasıl yani?" derken bazılarınızın da "tamam sorun değil ben yazılım
katmanına çözerim onu" gibi bir tepki verebileceğini tahmin ediyorum.
Aslında burada en tehlikeli tepki ikinci tepki :) çünkü eğer ki NoSQL
yapısında gidip kendi normal relational SQL sanal yapımızı oluşturmaya
çalışırsak büyük hata yapmış oluruz... Neden mi? Relational yapıya
ihtiyacınız varsa zaten Azure SQL Database var. Neden kastıralım ki? :)

Table servis'in nerelerde, nasıl ve hangi nedenle kullanılabileceği
konusunu biraz da ileri makaleler bırakacağım. Şimdilik ipucu olarak
No-SQL, Big Data and Hadoop vs diye sıralayabilir fikir vermesi için.
Sonuç itibari ile table service'in çalışma yapısını, kullanımını,
yapabildiklerini veya yapamadıklarını ve arkasındaki nedenleri :)
bilmeden / anlamadan çıkıp da Table Services nerde kullanılmalı'nın
tanımını yapmak faydasız olacaktır. İşte bu yüzden :) Gelin direk işin
içine girelim ve bakalım neler oluyor.

### İlk Table Service örneğine doğru...

Tüm Storage servislerinde olduğu gibi Table Services de tamamen REST
API'leri ile kullanılabiliyor. 

**[C\#]**
```cs
public class Urun2
{
    public string Timestamp { get; set; }
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string Adi { get; set; }
    public string Aciklama { get; set; }
}
```

Yukardaki kod malum bizim uygulamamızda kullanacağımız basit bir entity.
Bu Entity'nin özellikle ilk üç property'si eminim ki ilginç gelecektir
:) İsterseniz hemen o üçünü incelemeye başlayalım.

**Timestamp** : Bu property'e biz genelde dokunmuyoruz :) Bu property
azure table services tarafından concurrency kontrolü için kullanılıyor.
Yani biz hiçbir zaman bu arkadaşa bir değer atamıyor veya genelde
oradaki değeri alıp birşeyler de yapmıyoruz. O nedenle bu property
kesinlikle bulunması gereken fakat bizi pek de ilgilendirmeyen bir
property.

**PartitionKey** : İlk olarak bu property'nin bir String olduğuna dikkat
çekiyim :) PartitionKey property'si çok kritik bir property. Table
servis içerisinde bir table'da bulunan entity'lerinizin gerektiğinde
farklı sunucularda farklı partitionlara dağıtılması noktasında dağıtım
işlemi partitionkey'e göre yapılıyor. Yani eğer ki "Arabalar" diye bir
table'ınız varsa ve içinde 100 milyon araba varsa.. ve bu table'daki
performans düşüşü nedeniyle Storage Services bu table'ı partitionlama
kararı alırsa... bu işlemi ancak partitionkey'e göre yapar. Peki bunun
tam olarak anlamı nedir?

![Örnek bir
partitioning.](http://cdn.daron.yondem.com/assets/2782/table.png)
*Örnek bir partitioning.*

Yukarıdaki örneği bir inceleyelim isterseniz. Aslında yukarıdaki tek bir
tablomuz var. Arabalar tablosu :) PartitionKey olarak arabanın tipi
kullanılmış ve arabalara partitionkey değeri olarak Sedan, Coupe gibi
değerler verilmiş. Table Services performansın düştüğünü algıladığında
hemen PartitionKey'e göre iki partition yaratıp tabloyu iki farklı
sunucuya dağıtmış. Buraya kadar manzara süper. Peki şimdi soruyorum :)
Ben kırmızı arabaları getir dersem ne olacak? Tabi ki cross-partition
yani partittionlar arası / genel bir sorgu çalıştırmış olacağım. İşte
can alıcı nokta da zaten burası :) Çünkü olabildiğince cross-partition
sorgulardan kaçmam gerek. Ha cross-partition sorgu olamaz mı? tabi ki
olabilir fakat bu durumda ben partitionlamadan kazanacağım performans
kazanamam.

![Bir başka örnek
partitioning.](http://cdn.daron.yondem.com/assets/2782/table2.png)
*Bir başka örnek partitioning.*

Oysa yukarıdaki şekilde partitionKey'lerimde renk bilgileri olsaydı
"bana kırmızı arabaları getir" dediğimde çok basit bir şekilde tek bir
partition (yani disk / makine) üzerinden veri gelecekti. Sorgum diğer
partition'a gitmeyecekti bile. Böylece tüm partitioning konseptinden
faydalanmış olacaktır. Özünde Table Service'in datamı partitionlaması
bir işe yaramış olacaktır.

Şimdi eminim ki aklınıza hemen ya ben hem renge hem de tipe göre sorgu
yazacaksam sorusu geliyordu :) Birincisi tabi ki bunu yapabilirsiniz ve
partitionging'den faydalanmaktan vaz geçmiş olursunuz ama ikincisi ise
:) belki de çok karışık sorgularınız varsa SQL'i düşünmelisiniz :)
Burada "düşünmelisiniz" derken "vazgeçin buralardan" demiyorum aman
dikkat. SQL ile Table Service arasındaki kararı vermek çoğu zaman birçok
değişkeni olan ve zor bir karar. Daha da önemlisi %99 ihtimal ile iki
servisi beraber kullanacaksınız :) bunun da kendince nedenleri olacak.
Umarım bu yazıda ve ilerikilerde vereceğim bilgiler doğru kararları
alabilmeniz adına işine yarar fakat buradan "sorgunuz karşıkça SQL'e
gidin" gibi genel mesajlar alıp çıkmamanız çok önemli. Benim yapmaya
çalışacağım şey size bilgileri vermek, ihtimalleri göstermek, düşünmeniz
gerekenlere dikkat çekmek, gerisindeki kararın emin olun birçok
değişkeni var.

Sanırım PartitionKey'in anlamını ve değerini artık anladık. PartitionKey
property'si string olduğu için rahatlıkla istediğiniz değerleri
verebilirsiniz. Tabi ufak bir uyarı daha... PartitionKey vermiş olmanız
datanızın illa partitionlandığı anlamına da gelmiyor :) Performans
açısından ihtiyaç olunduğunu düşünürse Storage Services'deki "Smart NLB"
partitioning'i kendisi tetikleyecektir (sizin tetikleme şansınız yok).

**RowKey:** Bir property'miz daha var :) O da RowKey. Tahmin
edebileceğiniz üzere RowKey artık bir satırı doğrudan tanımlayan key
anlamına geliyor. Tam olarak Primary Key diyemem çünkü RowKey ile
PartitionKey beraber PK rolü oynuyorlar. Yani bir table'da aynı
RowKey'den fakat farklı PartitionKey'de bulunan iki entity olabilir.
Tabi karar tamamen sizin isterseniz RowKey'i tek de tutabilirsiniz tek
başına.

RowKey ile PartitionKey'in beraber ne şekillerde tanımlandıkları çok
önemli. Table Service'de en yüksek performansı alabileceğiniz sorguların
kesinlikle beraberlerinde RowKey ve PartitionKey getirmeleri gerekiyor.
Böylece sorguyu hem bir Partition ile sınırlamış oluryorsunuz, sonra da
Partition içerisinde RowKey üzerinden arama yaparak sonucu
alabiliyorsunuz.

**[C\#]**
```cs
public class Urun : TableEntity
{
    public string Adi { get; set; }
    public string Aciklama { get; set; }
}
```

Her sınıf tanımını yaparken bu üç property'yi de tek tek tanımlamak
istemiyorsanız :) Basit bir şekilde sınıflarınızı  StorageClient ile
beraber gelen TableEntity'den türeterek ilerleyebilirsiniz.
Böylece tüm bu sınıflar direk üç property'ye de sahip olacaktır.

Herşeyin öncesinde TableService'a bağlanıp bir table yaratmamız gerek.

**[C\#]**

```cs
CloudStorageAccount storageAccount =  CloudStorageAccount.DevelopmentStorageAccount;
CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
CloudTable table = tableClient.GetTableReference("Urunler");
try
{
    if (await table.CreateIfNotExistsAsync())
    {
        Console.WriteLine("İşlem tamam");
    }
    else
    {
        Console.WriteLine("Bu isimde bir tablo var.");
    }
}
```

Blob'larla uğraştıysanız buradaki kod da epey basit gelecektir :) Bu
sefer bir blobClient almak yerine CloudTableClient alıyoruz. Üzerinden de
**CreateTableIfNotExists** gibi süper bir metod kullanıp :) tablomuzu
yaratmış oluyoruz.

Gelin şimdi hızlı bir şekilde basit CRUD (Create, Read, Update, Delete)
işlemlerine göz atalım.

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
CloudTable table = tableClient.GetTableReference("Urunler");
Urun2 urun = new Urun2()
{
    PartitionKey = "Musteri1",
    RowKey = (new Random().Next(1, 100)).ToString(),
    Adi = "Deneme",
    Aciklama = "Açıklama"
};
TableOperation insertOrMergeOperation = TableOperation.InsertOrMerge(urun);
TableResult result = await table.ExecuteAsync(insertOrMergeOperation);
```

Ben ürünleri müşterilere göre partitionlama kararı aldım. Özellikle
birden çok müşterinin kendi tenant'larını kullandıkları bir yapıda bu
çok anlamlı olacaktır. Sonuç itibari ile bir müşterinin diğer müşterinin
verisine ulaşma gibi bir ihtimali zaten sıfır. RowKey'i ise şimdilik
Random bir sayı olarak verdim ama unutmayın RowKey ve PartitionKey Table
Service'deki ana iki Index'imiz. O nedenle sorgularınızı da düşünerek
Index'lemek istediğiniz bilgileri bu property'lere atamak süper mantıklı
olacaktır.

Kodun geri kalanının pek Azure ile bir alakası yok :)

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
CloudTable table = tableClient.GetTableReference("Urunler");
TableOperation retrieveOperation = TableOperation.Retrieve<Urun2>("Musteri1", "1");
TableResult result = await table.ExecuteAsync(retrieveOperation);
Urun2 urun = result.Result as Urun2;
if (urun != null)
{
    TableOperation deleteOperation = TableOperation.Delete(urun);
    await table.ExecuteAsync(deleteOperation);
}
```

Kayıt silme konusunda yukarıdaki kodu kullanabilirsiniz. 

### Entity Group Transactions

**[C\#]**
```cs
TableBatchOperation batchOperation = new TableBatchOperation();

for (int i = 0; i < 100; i++)
{
    batchOperation.InsertOrMerge(new Urun2()
       {
           PartitionKey = "Musteri" + i.ToString(),
           RowKey = (new Random().Next(1, 100)).ToString(),
           Adi = "Deneme",
           Aciklama = "Açıklama"
       });
}
IList<TableResult> results = await table.ExecuteBatchAsync(batchOperation);

foreach (var res in results)
{
    var eklenenUrun = res.Result as Urun2;
}
```

Süper önemli noktalardan biri de "Entity Group Transaction"'lar.
Elinizde birden çok işlem var ve bunları toplu olarak gönderebilmek
istiyorsunuz. İşte o zaman EGT'leri kullanmanız şart. Bunun için normal TableOperation'lar yerine TableBatchOperation yaratıyorsunuz. Sonrasında kullanım batch olmayan operasyonlarla aynı şekilde. Tek farkı "ExecuteBatch" ile tüm işlemleri aynı anda REST API üzerinden gönderebilecek olmanız. Fakat burada da birkaç dikkat edilmesi gereken
nokta var. Birincisi her EGT en fazla 100 işlem taşıyabilir. İkincisi
ise bir EGT paketi en fazla 4MB büyüklüğünde olabilir. Bunları göz önüne
alarak uygulamanızı tasarlamanız kritik. Tam "sınırlardan" bahsederken
bir entity'nin 1MB'dan büyük olamayacağını (binary datalar bloblara
gitsin lütfen :)) ve entity başına 255'dan fazla property olamayacağını
da belirtiyim :)

EGT'lerin çalışması için ayrıca bir EGT içerisinde işlemlerin tek bir
table ve tek bir partition'ı hedefliyor olması şart.
Cross-Partition-Transaction yok. Tam da bu noktada eminim ki
bazılarınıza "nasıl ya iki table'da aynı transaction içinde işlem
yapamıyor muyuz?" diyecektir :) cevabım : "evet yapamıyorsunuz". Ama
yazının başından beridir bahsetmediğim ilginç bir nokta var aslında :)
Dikkat ettiyseniz Table yaratırken Field tanımlamaları yapmadık.
Table'ların şemaları statik değil! Yani bir table içerisinde aslında
farklı şemalarda nesneler bulunabiliyor. Ama ben şimdilik bu konuyu bir
sonraki yazımıza bırakıyorum ;)

Görüşmek üzere.

