---
FallbackID: 2943
Title: "Azure Storage'da Replikasyon Modelleri"
date: "2014-12-5"
EntryID: Azure_Storage_da_Replikasyon_Modelleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
Dün Storage Account'ları incelerken Redundancy modelinden, Replication seçeneklerinden bahsetmiş fakat detayları incelememiştik. Bu yazıda tüm Storage servisleri için geçerli olan farklı redundancy modellerine göz atacağız.

Bir **Storage Account** yarattığınızda size sorulan sorulardan biri de "**Replication**" modeli oluyor. Azure ortamında Storage için şu an dört farklı Replication modeli söz konusu.

![Replication modeli fiyatlandırma için de kritik.](media/Azure_Storage_da_Replikasyon_Modelleri/blob_ragrs.png)
*Replication modeli fiyatlandırma için de kritik.*

#### Locally Redundant  

Farklı [Fault-Domain ve Upgrade-Domain](http://daron.yondem.com/software/post/Fault_ve_Update_Domain_SDK2_2)'lerde olacak şekilde storage transactionlarınızın hepsi senkron bir şekilde toplam üç ayrı storage node'una gönderilir. Böylece Azure Storage servisinin arka planında bir donanım sorunu oluşsa da veriniz ulaşılabilir durumda olur.

#### Geo-Redundant  

Locally Redundant modelde olduğu gibi aynı datacenter içerisinde yine üç kopya tutulur. Bu üç kopyanın haricinde asenkron olarak transactionlar bir başka bölgedeki DataCenter'a daha gönderilir. Diğer DC'ye gönderilen transaction da yine söz konusu DC'de üç kopya olarak tutulur. Bu seçenek genelde failover amacı ile kullanılır ve ilk bölgedeki üç kopya bir şekilde kaybedilirse veya altyapı aşağı inerse ikinci bölgedekinin kullanımı sağlanır. İki bölge arasındaki replication asenkron olduğu için failover esnasında kopyalanmamış bir miktar data tamamen kaybedilebilir.

#### Read-Access Geo-Redundant  

Geo-Redundant yapı ile aynı özellikleri barındıran bu yapıda ek olarak okuma operasyonları birden çok bölgeye dağıtılarak daha yüksek okuma performansı elde edilir.

#### Zone Redundant  
Bu modelde veriniz yine üç kopya olarak tutulur ve aynı Zone içerisindeki farklı DataCenter'larda saklanır. Zone Redundant modeli Geo-Redundant modelin çoğrafi olarak aynı bölge içerisine uygulanmış hali olarak düşünebilirsiniz. Tüm diğer modellerde şu anda Storage servislerinin hepsi desteklenirken, Zone Redundant modelde sadece Block Blob'lar destekleniyor. İleriki yazılarda bahsedeceğimiz Page Blob, Table ve Queue yapıları Zone Redundant olan Storage Account'larda kullanılamıyor.

### Read-only Access Geo Redundant Storage nasıl kullanılır?

Eğer RA-GRS modelinin kendi kendine arka planda çalışacağını zaennediyorsanız aldanırsınız. Aslında tam olarak da aldanmış sayılmazsınız, eğer Storage Client Library 3.0 (ve sonraki) sürümünü kullanıyorsanız sorun olmayacaktır. Her halükarda gelin biz neler oluyor bir göz atalım. 

![Read Only İkincil Endpointler geldi...](media/Azure_Storage_da_Replikasyon_Modelleri/blob_ragrs_2.png)
*Read Only İkincil Endpointler geldi...*

Yukarıdaki ekran görüntüsünde RA-GRS replikasyon modelini kullanan bir Storage Account ile kullanmayan bir Storage Account'un endpoint farklılıklarını görebilirsiniz. Görüldüğü üzere RA-GRS'yi seçtiğimizde Secondary Endpoint denilen ikinci erişim adresi oluşturuluyor. Böylece arka planda kopyalanan storage ortamına ulaşabiliyorsunuz. Tabi diğer yandan bu şekilde iki farklı endpoint verildiğinde de akla şu soru geliyor; "Hangisine ne zaman gideceğime ben mi karar vereceğim?" Özetle, amacımız failover olmadığına göre (öyle olsaydı zaten sadece Geo-Redundant kullanırdık) ve amacımız okuma operasyonlarını dağıtmak olduğuna göre bu işi biz mi yapacağız? Cevabı; Evet.

**[C#]**

```cs
CloudStorageAccount account = CloudStorageAccount.Parse("DefaultEndpointsProtocol=http;AccountName=daronragrs;AccountKey=DRxxxaPXg==;");
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();

var blob = container.GetBlockBlobReference(FileUploadControl.FileName);
blob.UploadFromStream(FileUploadControl.FileContent);
Response.Write(blob.Uri.ToString());
```

Yukarıdaki kodu daha önceki yazılardan hatırlayabilirsiniz. Basit bir şekilde örnek bir container yaratıp içerisine de FileUpload kontrolü ile verilen bir dosyayı blog olarak atıyoruz. Bu kodun RA-GRS'a özel bir yanı yok. Kodu çalıştırdığımızda da doğal olarak bize blob endpoint URL olarak **http://daronragrs.blob.core.windows.net/dosyalar/sample.txt** geliyor. Storage hesabımızın replikasyon modeli RA-GRS olduğu için "sample.txt" dosyayı ikinci endpointin arkasına da kopyalanacak ve "**http://daronragrs-secondary.blob.core.windows.net/dosyalar/sample.txt**" adresinden de ulaşılabilir halde olacak. Böylece normal storage SLA'i olan %99.9, %99.99'a yükselmiş olacak :) Peki dışarıdan gelmeyen ve sizin kodunuz ile yaptığınız okuma operasyonlarını nasıl dağıtacaksınız? Özetle Storage Library size nasıl yardımcı olacak?

![Storage Client içerisinde Location seçenekleri.](media/Azure_Storage_da_Replikasyon_Modelleri/blob_ragrs_3.png)
*Storage Client içerisinde Location seçenekleri.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere her Client objesinin bir LocationMode özelliği var. LocationMode'a ister doğrudan Primary veya Secondary diyebileceğiniz gibi istersenizi önceliğe göre terih seçeneği de verebiliyorsunuz. Bu noktada özellikle dikkat etmeniz gereken nokta "SecondaryOnly" seçeneği. Eğer sadece "Secondary" terseniz container yaratma gibi kodlarınız "Read" operasyonu değil "Update / Write" operasyonu olduğu için çatlayacaktır. O nedenle eğer hem read hem write yapıyorsanız benim tavsiyem en kötü ihtimalde "SecondaryThenPrimary" tercihini kullanın.

Önceliklendirmeli ayarlarda (PrimaryThenSecondary veya SecondaryThenPrimary) bilmeniz gereken birkaç nokta daha var. Bu şekilde yapılan ayarlar aslında bir anlamda "Failover" ayarı oluyor. Eğer lokasyonlardan birine ulaşılamazsa RetryPolicy'sine göre SDK doğrudan diğer lokasyona yönlenecektir. Bu senaryoda tek istisna Secondary ile alakalı. Eğer Secondary'den 404 NotFound gelirse ayrı Retry Cycle içerisinde tekrar Secondary denenmeyecektir. Bunun nedeni ise birazdan bahsedeceğimiz replikasyon gecikmesi (replication delay) ile alakalı. Malum iki ayrı lokasyon arasında replikasyon yapılırken bir gecikme de söz konusu. Bu gecikme sizin servise yönlendirdiğiniz taleplerin yoğunluğuna göre bir noktada hissedilir hale gelebilir. Bunu da engellemenin yolu var :)

**[C#]**

```cs
ServiceStats stats = blobClient.GetServiceStats(
    new BlobRequestOptions() { 
        LocationMode = LocationMode.SecondaryOnly 
    });
if (stats.GeoReplication.Status == GeoReplicationStatus.Live)
{
    if (stats.GeoReplication.LastSyncTime.HasValue == true)
    {
        if (stats.GeoReplication.LastSyncTime.Value.AddSeconds(30) < DateTime.UtcNow)
        {
            blobClient.DefaultRequestOptions.LocationMode = LocationMode.PrimaryThenSecondary;
        }
        else
        {
            blobClient.DefaultRequestOptions.LocationMode = LocationMode.SecondaryThenPrimary;
        }
    }
} 

```

İşte karşınızda **LastSyncTime** ve **GeoReplicationStatus**. Gelin adım adım yukarıdaki kodu inceleyelim. BlobClient üzerinden **GetServiceStats** dediğimizde RA-GRS olarak ayarlı hesabımızın replikasyon durumunun bilgisini istemiş oluyoruz. Replikasyon bilgisini ancak Secondary Endpoint'ten isteyebilirsiniz. O nedenle bu metoda parametre olarak **BlobRequestOptions** veriyoruz. Storage Client ile operasyon başına Secondary-Primary endpoint kararı almak isterseniz bu kararı bir BlobRequestOptions içine koyup metoda iletebilirsiniz. Böylece bizim örneğimizde BlobClient'ın genel karar mekanizmasından farklı olarak sadece **GetServiceStats** için Endpoint kararını ezerek doğrudan Secondary Endpoint'e gitmiş oluyoruz. 

Bir sonraki adımda GeoReplication'ın Status'üne bakmamız gerek. Burada üç seçenek mevcut. Eğer **Unavailable** gelirse replikasyon falan yok ortada, her şey dağılmış ve Secondary'ye ulaşılamıyor demektir. Bu durumda kesinlikle Primary'ye gitmeniz gerek. Bizim kod örneğimizde işin bu kısmına dair bir yapı yok. Eğer **Bootstrap** gelirse daha replikasyon yeni başlatılmış ve data kopyalanıyor demektir. Bu durum sadece ilk olarak bir Storage Account'un GRS'den RA-GRS'ye alındığında gerçekleşir. Son olarak da **Live** değeri söz konusu. Bu da replikasyonun sağlıklı bir şekilde ayakta olduğunu gösteriyor. 

Replikasyonun sağlığından emin olduktan sonra **LastSyncTime**'a bakıyoruz. Örneğimizde eğer LastSycnTime üzerinden 30 saniyeden çok zaman geçmiş ise Primary'ye geçmemişse Secondary'e gidiyoruz. Tabi her iki seçenekte de diğer endpointi failover olarak verebilmek adına "SecondaryOnly" veya "PrimaryOnly" yerine sürekli olarak "PrimaryThenSecondary" veya "SecondaryThenPrimary" kullandık. Tabi tüm bunlar sizin ihtiyaçlarınıza göre farklı tasarlanabilir. Hatta 30 saniye kuralı dahi tamamen değiştirilmesi gereken bir kural. Bu noktada sormanız gereken soru "Ne kadarlık bir replikasyon gecikmesini hoş görebilirim?" sorusu. Tüm bunları yanı sıra bir de şöyle bir sıkıntı var, ya son 1 dakikadır zaten replikasyonun güncellenmesini gerektirecek bir operasyon olmadıysa? Bu durumda zaten LastSyncTime'ın bir dakika önceyi göstermesi normal. Özetle şu anki zaman ile LastSyncTime arasında 30 saniyeden fazla süre olması replikasyonun tamamlanmış halde olup olmadığına dair bir fikir vermiyor. **LastSyncTime** her servis başına (Blob, Table, Queue) en son her iki lokasyonunda da kuyrukta replike edilecek şey kalmadan eşitlenmiş olduğu anın zamanını verir. Örneğin X adındaki blobunuz LastSyncTime'dan sonra her iki lokasyona da replike edilmiş ve eşitlenmiş olabilir ama Y adındaki blobunuz daha sonradan değiştirildiği için daha replikasyon kuyrunda kalmış olabilir. Bu nedenle tüm servis genelinde bir eşitlenme anı yaşanmadığından LastSyncTime X blobunun eşitlenme anında daha eski bir zamanı gösterebilir. Tüm bu senaryoların etrafından dolaşacak kodları yazmak da size kalıyor :) Geo-Replikasyon hiçbir zaman basit olmamıştır zaten.

###Merak edebilecekleriniz :)

Aklınıza gelebilecek ve cevaplamadığımız bazı sorular var. 

1. **Secondary Endpoint'in Credential/Key'leri ne durumda?**  
Secondary ile Primary'nin key'ler tamamen aynı. Secondary'nin Key diye bir konsepti olmadığını düşünebilirsiniz.

2. **Shared Access Signature'lere ne oluyor?**  
Hiç bir şey olmuyor. İmzalama esnasında kullandığınız account ismine -secondary eklememeniz çok önemli. İmza için kullandığınız key aynı olduğundan resourceURI'yi de DNS'den vs çıkarmamanız şart. Aksi halde problem çıkacaktır. Özetle aynı SAS ile secondary'ye Endpoint'e gidebilirsiniz.

3. **Storage Analytics kullanıyorum. Secondary için ne olacak?**   
Secondary endpointin storage analytics'i primary ile aynı yerde saklanıyor. Metric tablolarının adları Secondary ve Primary olarak ayrıştırılacak saklanacaktır.

Hepinize kolay gelsin.
