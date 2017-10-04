---
FallbackID: 2777
Title: Blob Storage'da Snapshot Kullanımı
PublishDate: 3/7/2012
EntryID: Blob_Storage_da_Snapshot_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
**[Aşağıdaki makalenin SDK2.5 ile beraber yeni Azure özelliklerine uygunşekilde güncellenmiş halini[burada](http://daron.yondem.com/software/post/Blob_Storage_da_Snapshot_Kullanimi_SDK2_5)bulabilirsiniz.]**Blobların en sevdiğimiz özelliklerinden biri blob başına snapshot
alabiliyor olmamız :) Sınır yok, istediğiniz kadar snapshot
alabilirsiniz :) (yeter ki parasını ödeyin) Şaka bir yana SnapShot
almanın kolaylığı ve "yedekleme" amaçlı olarak süper faydalı olmasın
geliştireceğiniz uygulamalara eminim ki ciddi katma değer sağlayacaktır.

**[C\#]**
```cs
CloudStorageAccount account = 
        CloudStorageAccount.FromConfigurationSetting("blobConnection");
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobDirectory directory = blobClient.GetBlobDirectoryReference("dosyalar/resimler");

var BirBlob = (CloudBlob)directory.ListBlobs().Take(1).SingleOrDefault();
Response.Write(BirBlob.Uri + "<br/>");

var snapshot = BirBlob.CreateSnapshot();
var uri = BlobRequest.Get(snapshot.Uri, 0, 
                    snapshot.SnapshotTime.Value, null).Address.AbsoluteUri;
Response.Write(uri);
```

Yukarıdaki kod içerisinde basit bir blob bulduktan sonra hemen üzerinden
**CreateSnapshot** metodunu çağırıyoruz. Metodu çağırdığımız anda
aslında artık blobun snapshot'ı yani bir kopyası tarihin tozlu
raflarında yerini almış oluyor :) Blobun snapshot'ına direk ulaşmak
isterseniz ancak SnapshotTime üzerinden snapshot'ın alındığı tarihi
kullanarak ilerleyebiliyorsunuz.

![Alınan bir snapshot'ın
URL'i.](media/Blob_Storage_da_Snapshot_Kullanimi/snapshot.png)
*Alınan bir snapshot'ın URL'i.*

Güzel, bir snapshot yarattık ve belli ki ona ulaşabiliyoruz. Fakat ya
bir blob'un birden çok snapshot'u alınmışsa? Onlara nasıl ulaşırız? İşte
bu noktada klasik blob listeleme senaryosunda geri dönüyoruz. Normal
blobları listelermiş gibi ilerlerken ek olarak SnapShot'ların da
listelenmesi için bir parametre göndermemiz yeterli oluyor.

**[C\#]**
```cs
CloudStorageAccount account = 
    CloudStorageAccount.FromConfigurationSetting("blobConnection");
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobDirectory directory = blobClient.GetBlobDirectoryReference("dosyalar/resimler");

var BirBlob = (CloudBlob)directory.ListBlobs().Take(1).SingleOrDefault();
Response.Write(BirBlob.Uri + "<br/>");

var snapshots = directory.ListBlobs(new BlobRequestOptions()
    {
        BlobListingDetails = BlobListingDetails.Snapshots,
        UseFlatBlobListing = true
    }).Where(item => 
            ((CloudBlob)item).SnapshotTime.HasValue && 
            item.Uri.Equals(BirBlob.Uri))
.ToList<IListBlobItem>();

foreach (CloudBlob item in snapshots)
{
    var uri = BlobRequest.Get(item.Uri, 0,
        item.SnapshotTime.Value, null).Address.AbsoluteUri;
    Response.Write(uri + "<br/>");
}
```

Yukarıdaki kod içerisinde ListBlobs'a verdiğimiz **BlobRequestOptions**
içerisinde **BlobListingDetails'a** **Snapshots** değeri verilmiş
durumda. Böylece aldığımız listede tüm snapshotlar da bulunacak. Tabi
bunun üzerine bir de elimizdeki Blob'un SnapShot'ına ihtiyacımız olduğu
için Uri'lerin aynı olup olmadığını ve SnapshotTime ile de Blob'un
normal bir blob mu yoksa SnapShot mı olduğunu kontrol ediyoruz. Böylece
istediğimiz bir blobun SnapShot listesini alabiliyoruz.

Doğal olarak bu noktadan sonra artık SnapShot'lar da birer blob
oldukları için SnapShot silme işlemini de normal bir blob siler gibi
yapabiliyoruz ama ufak bir sorun var :) O da normal şartlarda SnapShot'ı
olan bir ana blobun SnapShot'ların hepsi silinmeden silinemiyor olması.
Bunun için SnapShot listesi alıp for'la gezip tek tek SnapShot silmeye
gerek yok ;)

**[C\#]**
```cs
BirBlob.DeleteIfExists(new BlobRequestOptions()
{
    DeleteSnapshotsOption = DeleteSnapshotsOption.IncludeSnapshots
});
```

Yukarıdaki gibi silme işlemine de BlobRequestOptions'da
**IncludeSnapshots** derseniz işlem tamamdır. Blob silindiğinde
beraberinde tüm snapshotlar da silinecektir.

**[C\#]**

```cs
BirSnapshot.CopyFromBlob(BirBaskaBlob);
```

Eğer ki bir SnapShot Blob'unu alıp bir başka bloba kopyalamak isterseniz
yukarıdaki kod yardımcı olabilir. Unutmayın ana blobları kopyalarken
SnapShot'lar taşınmaz ve kopyalanmaz. Snapshot her zaman ilk yaratılığı
bloba bağlıdır.

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
SnapShot'larınızı doğru yönetin ki gereksiz yere binler SnapShot
durmasın kenarlarsa.

SnapShot'ları çok yoğun kullanacaksanız ideal yöntem bir alt seviyeye
inip kaynaklarınızı doğrudan Page veya Block seviyesinde yönetmek.
StorageClient içerisinde PutBlock ve PutBlockList gibi işine
yarayabilecek metodlar mevcut ;)

Kolay gelsin.


