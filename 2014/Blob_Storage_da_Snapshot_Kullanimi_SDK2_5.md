# Blob Storage'da Snapshot Kullanımı (SDK2.5)
Blobların en sevdiğim özelliklerinden biri blob başına snapshot
alabiliyor olmamız :) Sınır yok, istediğiniz kadar snapshot
alabilirsiniz :) (yeter ki parasını ödeyin) Şaka bir yana SnapShot
almanın kolaylığı ve "yedekleme" amaçlı olarak süper faydalı olması
geliştireceğiniz uygulamalarda eminim ki ciddi katma değer sağlayacaktır.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();

CloudBlockBlob blob = container.GetBlockBlobReference("istanbul_azure_logo.png");
var snapshotBlob = blob.CreateSnapshot();

Response.Write(snapshotBlob.SnapshotQualifiedUri);
```

Yukarıdaki kod içerisinde basit bir blob bulduktan sonra hemen üzerinden
**CreateSnapshot** metodunu çağırıyoruz. Metodu çağırdığımız anda
aslında artık blobun snapshot'ı yani bir kopyası tarihin tozlu
raflarında yerini almış oluyor :) Blobun snapshot'ına direk ulaşmak
isterseniz ancak SnapshotTime üzerinden snapshot'ın alındığı tarihi
kullanarak ilerleyebiliyorsunuz. Local testte aldığımız URL aşağıdaki gibi oluyor.

http://127.0.0.1:10000/devstoreaccount1/dosyalar/istanbul_azure_logo.png?snapshot=2014-12-2T11:33:32.5370000Z

Güzel, bir snapshot yarattık ve belli ki ona ulaşabiliyoruz. Fakat ya
bir blob'un birden çok snapshot'u alınmışsa? Onlara nasıl ulaşırız? İşte
bu noktada klasik blob listeleme senaryosunda geri dönüyoruz. Normal
blobları listelermiş gibi ilerlerken ek olarak SnapShot'ların da
listelenmesi için bir parametre göndermemiz yeterli oluyor.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();

CloudBlockBlob blob = container.GetBlockBlobReference("istanbul_azure_logo.png");

var snapshots = container.ListBlobs(blob.Name, true, BlobListingDetails.Snapshots);
foreach (CloudBlockBlob snap in snapshots)
{
    if(snap.IsSnapshot )
    {
        Response.Write(snap.SnapshotQualifiedUri);
    }                
}
```

Yukarıdaki kod içerisinde ListBlobs'a verdiğimiz **BlobListingDetails**
işimizi görecektir. Ayrıca söz konusu metoda verdiğimiz ilk parametrede de eldeki blobun adını vererek sadece o bloba ait kayıtların dönmesini sağlamış oluyoruz.  Ama burada ufak bir uyarıda da bulunmam gerek. ListBlobs'un ilk parametresi bir Prefix aslında. Yani one2one match olarak ismine göre Blob aramaz. O nedenle eğer prefix ile tutturabileceğinizden emin değilseniz içeride ayrıca BlobName kontrol yapmakta fayda var. Elimize gelen listede dolaşırken orijinal blobu dışarıdan bırakmak için **IsSnapShot** kontrolü yapıyor, sonrasında da **SnapshotQualifiedUri**'yi alıyoruz.

Doğal olarak bu noktadan sonra artık SnapShot'lar da birer blob
oldukları için SnapShot silme işlemini de normal bir blob siler gibi
yapabiliyoruz ama ufak bir sorun var :) O da normal şartlarda SnapShot'ı
olan bir ana blobun SnapShot'ların hepsi silinmeden silinemiyor olması.
Bunun için SnapShot listesi alıp for'la gezip tek tek SnapShot silmeye
gerek yok ;)

**[C\#]**
```cs
blob.Delete(DeleteSnapshotsOption.IncludeSnapshots);
```

Yukarıdaki gibi silme işlemine de **DeleteSnapshotsOption** verebilirsiniz. Burada **IncludeSnapshots** veya **DeleteSnapshotsOnly** diyebiliyorsunuz. 

**[C\#]**

```cs
birBlob.StartCopyFromBlob(snapshotBlob);
```

Eğer ki bir SnapShot Blob'unu alıp bir başka bloba kopyalamak isterseniz
yukarıdaki kod yardımcı olabilir. Unutmayın ana blobları kopyalarken
SnapShot'lar taşınmaz ve kopyalanmaz. Snapshot her zaman ilk yaratılığı
bloba bağlıdır. StartCopyFromBlob metodunu bir snapshotı restore etmek için de kullanmanız gerekecek. SnapShot'tan orijinal blobun üzerine kopyalama yapmak yeterli olacaktır.

### Birkaç detay...

SnapShotların çalışma şeklini bilmek ne için ne kadar para ödeyeceğinizi
bilmek adına da önemli. Bir SnapShot aldığınızda eğer SnapShot
yapıldıktan sonra Blob'da değişiklik olmadıysa ek bir ücret
ödemiyorsunuz. Özetle aslında sadece değişen Block veya Page için
SnapShot'larda para ödersiniz. Fakat ufak bir uyarı :) eğer SnapShot'lar
sizin için çok önemliyse ve çok kullanacaksanız StorageClient ile
beraber gelen **UploadFile, UploadText, UploadStream** veya
**UploadByteArray** gibi metodları kullanmayın. Bu metodlar upload
esnasından tamamen sıfırdan upload yaptıkları için tüm page'ler veya
block'lar değişiyor ve bu da sıfırdan bir snapshot almış olmak anlamına
geliyor. Nitekim bu şekilde de ilerlenebilir ama bilerek ilerlemekte
fayda var :) Bahsettiğimiz metodların kullanımları kolay ama SnapShot'ta
da ufak bir dezavantajları var. Eğer böyle kullanacaksanız tavsiyem
SnapShot'larınızı doğru yönetin ki gereksiz yere binlerce SnapShot
durmasın kenarlarda.

SnapShot'ları çok yoğun kullanacaksanız ideal yöntem bir alt seviyeye
inip kaynaklarınızı doğrudan Page veya Block seviyesinde yönetmek.
StorageClient içerisinde PutBlock ve PutBlockList gibi işinize
yarayabilecek metodlar mevcut ;)

Kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2014-12-7 tarihinde yayinlanmistir.*
