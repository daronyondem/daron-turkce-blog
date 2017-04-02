---
FallbackID: 2779
Title: Windows Azure Drive
PublishDate: 7/17/2012
EntryID: Windows_Azure_Drive
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
**Azure Drive 2015 yılı itibari ile Microsoft tarafından
sonlandırılıyor. Onun yerine Azure Files adında bir hizmet devreye
alınacak. [Azure Files ile ilgili yazıma
buradan](http://daron.yondem.com/software/post/Azure_Files_Nedir_Nasil_Kullanilir)
ulaşabilirsiniz.**

Windows Azure Storage seti kapsamında pek bilinmeyen ve popüler olmayan
:) seçeneklerden biri de Windows Azure Drive konsepti. Popüler
olmamasının nedeni belki de çok ufak bir aralığa hitap ediyor olması.
Peki nasıl? Aslında Windows Azure Drive bir page blob'un API'lerinin
NTFS File System API'lerine map edilmesi anlamına geliyor. Yani
elinizdeki bir VHD'yi alıp bir page blob'a atıyorsunuz ve sonrasonda
VHD'yi de sanal bir makineye / webrole'a ataçlayıp direk
kullanabiliyorsunuz. "Hah işte bu!" diyenlerinize :) şimdilik "bir
sakin" diyorum :)

Page Blob'lar biliyorsunuz 512 byte'lık paketler şeklinde saklanıp Block
Blob'lara kıyasla random read/write senaryolarunda kullandığımız
arkadaşlardı. O nedenle VHD senaryosu için de süper uygun bir seçenkler.
Ama işin her zamanki gibi bir de kötü tarafı var :) Malum web
role'leriniz hiçbir zaman tek instance olmayacak. Peki biz bu VHD'yi
birden çok instance'a ataçlayabilecek miyiz? Yani Windows Azure Drive
belli ki kalıcı bir veri saklama alanı, blobda olduğuna göre öyle olmalı
;) peki bu alana normal bloblardaki gibi VHD'ye de herkes ulaşabilecek
mi? Evet AMMMA :) sadece tek instance yazma işlemi yapabilir.
Hayallerinizi yıktığımı biliyorum ama yapacak birşey yok. Bir VHD
dosyası sadece tek makineye yazma işlemleri için ataçlanabiliyor. Birden
çok makineye ataçladığınızda aslında VHD'nin (yani bir anlamda page
blob'un) bir snapshot'ını ataçlayabiliyorsunuz.

### Peki o zaman ne işimize yaradı?

Aslında Windows Azure Drive'ın da varlığı migration süreçlerini
kolaylaştırmak. Yoksa Azure ortamında sıfırdan başlayan bir projede
kalıcı veri saklama stratejisi olarak Azure Drive'ı düşünmek yanlış
olacaktır. Migration süreçlerinde kesinlikle disk erişimi olması gereken
ve LocalStorage'ın yetmediği veya en azından diğer instance'ların da
okuma erişimi gerektiği durumlarda Azure Drive kullanılabiliyor. Diğer
yandan unutmamak gerek ki Azure Drive'da yazma işlemleri instancelara
paylaştırılmasa da LocalStorage'a kıyasla sonuçta Azure Drive kalıcı bir
veri saklama ortamı. Yani uygulama recycle olduğunda, makine restart
yediğinde veya uygulamanız başka bir VM'e taşındığında Azure Drive hem
kalacaktır (çünkü page blobda).

Şimdi gelin isterseniz yavaş yavaş bir Azure Drive'ı nasıl
yaratabileceğimze ve kullanabileceğimize göz atalım.

![AzureDrive
yollarında.](http://cdn.daron.yondem.com/assets/2779/clouddrive.png)
*AzureDrive yollarında.*

Projenizde AzureDrive konseptini kullanacaksanız ilk olarak yukarıdaki
şekilde SDK ile beraber gelen WindowsAzure.CloudDrive referansını
eklmeniz gerekiyor. Bu assembly sayesinde AzureDrive API'lerini
rahatlıkla kullanabileceğiz.

AzureDrive'ın bir page blob üzerinden çalıştığını biliyoruz fakat malum
page blob'lara giden gelen her REST call için para ödüyoruz. O nedenle
üzerinde çalıştığımız makinede de ufak bir önbelleğimiz olsa iyi olur
diye düşünüyorum. Önbellek alanı için LocalStorage'ı kullanabiliriz, ne
de olsa sanal makine ile gelen ve para ödemediğimiz bir kaynak
LocalStorage.

![AzureDrive için önbellek =
LocalStorage](http://cdn.daron.yondem.com/assets/2779/clouddrive2.png)
*AzureDrive için önbellek = LocalStorage*

LocalStorage alanını verirken planladığınız alandan biraz daha büyük bir
alan ayırmakta fayda var. Örneğin ben 200 MB düşünürken 220 yaptım.
Bunun nedeni ise cache alanı için verdiğimiz alanın tamamının
kullanılamıyor olması. O nedenle koddan 200MB verdiğimizi söyleyecek
olsak da 200MB'ın tamamı kullanılamayacağı için hata alabiliriz. Baştan
220 gibi bir rakam verirseniz bu sorun yaşanmayacaktır.

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
LocalResource localCache = RoleEnvironment.GetLocalResource("OnBellek");
CloudDrive.InitializeCache(localCache.RootPath, localCache.MaximumSizeInMegabytes);
```

İşlemlere başlarken ilk olarak StorageAccount'umuzu alıyoruz. Ben
şimdilik local'de çalıştıracağım için doğrudan
**DevelopmentStorageAccount'u** hedef aldım. Sonrasında LocalStorage'a
ulaşıp daha önce ayarladığımız **OnBellek** alanını alıyoruz. Önbellek
alanının disk adresini ve boyutunu da **CloudDrive** sınıfı üzerinden
**InitializeCache** diyerek en baştan tüm işlemler için cache olarak
veriyoruz.

**[C\#]**
```cs
CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
blobClient.GetContainerReference("vhdler").CreateIfNotExist();
```

Yaratacağımız VHD'nin bir blobda bulunması gerekiyor. Bunun için hemen
blobClient üzerinden vhdler adındaki bir container yaratıyoruz ki bir
sonraki adımda da VHD dosyamız direk burada oluşturulsun.

**[C\#]**
```cs
var CloudDriveBlobUri = blobClient.GetContainerReference("vhdler")
                                  .GetPageBlobReference("ornek.vhd").Uri.ToString();
CloudDrive myCloudDrive = storageAccount.CreateCloudDrive(CloudDriveBlobUri);
```

VHD'lerimiz koyacağımız container içerisinde ornek.vhd adında bir blobun
referansını alıyoruz. Daha bu blob yaratılmış değil, CloudDrive sınıfı
tarafından yaratılacak. İkinci satırda ise artık CloudDrive'ımızı
yaratmak için **CreateCloudDrive** derken eldeki hedef blobun da
adresini veriyoruz.

**[C\#]**
```cs
myCloudDrive.Create(500); 
string driveLetter = myCloudDrive.Mount(200, DriveMountOptions.None);
```

Geldik son iki satıra :) Artık referansını yarattığımız CloudDrive
üzerinden Create diyerek istediğimiz boyutta drive yaratabiliriz. Ben bu
örnekte 500 MB'lık bir drive yarattım. 16MB ile 1TB arası istediğiniz
boyutlarda CloudDrive yaratabilirsiniz ve toplam makine başına 16
CloudDrive'ınız olabilir. Yukarıdaki ikinci satırda ise kullanılacak
cache miktarı ile beraber drive'ı mount ederek artık sürücüye verilen
harfi de alabiliyoruz. Maalesef sürücü harfini bizim verme şansımız yok.
Sürücü harfi otomatik olarak yaratılıp bize verilecek zorunda.

**[C\#]**
```cs
void Application_Start(object sender, EventArgs e)
{
    CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
    LocalResource localCache = RoleEnvironment.GetLocalResource("OnBellek");
    CloudDrive.InitializeCache(localCache.RootPath, localCache.MaximumSizeInMegabytes);
    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
    blobClient.GetContainerReference("vhdler").CreateIfNotExist();
    var CloudDriveBlobUri = blobClient.GetContainerReference("vhdler")
                                      .GetPageBlobReference("ornek.vhd").Uri.ToString();
    CloudDrive myCloudDrive = storageAccount.CreateCloudDrive(CloudDriveBlobUri);
    myCloudDrive.Create(500); 
    string driveLetter = myCloudDrive.Mount(200, DriveMountOptions.None);
}
```

Kodun tamamı yukarıdaki şekilde sonlanıyor. Bu kodu rahatlıkla
Global.asax'da Application Start'a koyabilirsiniz. Böylece uygulamanız
ilk başlatıldığında hemen sürücü de sisteme eklenecektir.

Artık bu noktadan sonra sürücü harfini de aldığımıza göre istediğiniz
gibi System.IO altındaki herşeyi kullanabilirsiniz. VHD'yi normal bir
NTFS sürücüsü olarak düşünebilirsiniz :) ki zaten öyle. Eğer VHD'yi
bırakmak isterseniz UnMount metodu da mevcut.

**[C\#]**
```cs
//SnapShot alır.
myCloudDrive.Snapshot();
//Snapshot alıp hedef bir başka bloba kopyalar
myCloudDrive.CopyTo(blobClient.GetContainerReference("vhdler").GetPageBlobReference("kopya.vhd").Uri);
//Mount edilmiş drive listesini getirir.
CloudDrive.GetMountedDrives();
```

Ek olarak yukarıdaki metodlar da işinize yarıyabilir :) Snapshot
almaktan tutun, alınan bir snapshot'ı hedef başka bir bloba kopyalamaya
kadar herşey mümkün. Snapshotların yönetimi doğrudan blob'lardaki
Snapshot mantığı ile aynı. Eğer eski bir snapshot'a dönmek isterseniz o
snapshot'ın blob adresini kullanarak CloudDrive yaratmanız yeterli.

![Lokal emülatördeki
durum.](http://cdn.daron.yondem.com/assets/2779/clouddrive3.png)
*Lokal emülatördeki durum.*

Lokal emülatör ile çalıştığınızda VHD dosyası blob'a kaydedilmeyecektir.
Arka plandaki implementasyonu biraz daha farklı emülatörün. Storage
Emulator'ın arayüzünü açarsanız hemen File menüsünden "Open Azure Drive
Folder" gibi bir komut göreceksiniz. Buradan Azure Drive'ın makinenize
hangi klasörde yaratıldığını ve tüm VHD içeriğinin aslında doğrudan
sizin dosya sisteminizde oluğunu görebilirsiniz :) Test için epey güzel
açıkçası. Ama yine de tekrar ediyim, Azure ortamında işler böyle
yürümüyor ve VHD bir page bloba kaydediliyor.

### Elimdeki bir VHD'yi nasıl upload ederim?

İşte güzel bir soru daha :) Elimde koca bir VHD var, bunu baştan nasıl
upload ederim AzureDrive olarak kullanılmak üzere. Bunu upload edecek
kodu yazmak mümkün ama :) hazır birşey kullanmak daha pratik olur
sanırım. Ben [Cerebrata'nın](http://www.cerebrata.com/) Cloud Storage
Studio ürününü kullanıyorum. Şu an için pek ücretsiz ve süper çalışan
bir ürün bulmak mümkün değil, o nedenle Cloud Storage Studio'yu herkese
tavsiye ederim, özellikle Azure ile ilgili bolca çalışacaksanız ürünün
lisans ücreti de kabul edilebilir boyutlarda.

![Cloud Storage Studio
süper!](http://cdn.daron.yondem.com/assets/2779/clouddrive4.png)
*Cloud Storage Studio süper!*

Hepinize kolay gelsin.


