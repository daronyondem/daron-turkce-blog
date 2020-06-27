# Blob Ortamında File System Etkisi yaratmak (SDK2.5)
Blob konusunu inceledikçe aslında adam akıllı dosya tutabileceğimiz :)
süper bir yer olduğu hissiyatı eminim ki sizin de içinizi kaplamıştır.
Bu düşünce yapısı ile ilerlerken aslında akla gelebilecek daha bir sürü
soru var. Örneğin bir sitede kullandığımız CSS, JavaScript dosyaları
acaba sitenin bir parçası mı olmalı yoksa Blob'da mı durmalı :)

Nereden çıktı bu da şimdi diyebilirsiniz ama bir düşünün. En ufak CSS
değişikliğinde tüm service package'ı tekrar yaratıp upgrade süreci
başlatmak ister misiniz? Aynı soru belki sitenizde kullandığınız ve site
tasarımının bir parçası olan görsel dosyaları için de geçerli. Sitedeki
şirket logosu bir blobda dursa daha iyi olmaz mı?

Tüm bu soruları kendi kendimize sora duralım ister bu gibi ihtiyaçlar
yüzünden olsun ister eski alışkanlıkar sonuç itibari ile Blog
Storage'daki tek klasörlere yapısı olarak gözüken Container'lar bize
yetmeyecek galiba :) Container'ları iç içe koyamayacağımızdan
bahsetmiştim değil mi? Bu konuya canınız sıkılıyorsa işte süper olmasa
da işin çözümü şöyle...

### File System Etkisi

Bir sunucudaki klasörlerin web ortamına yansıma şekli malum URL'de
kendini gösterir. Her ne kadar artıkl URLReWriting sayesinde
delikanlılığın kitabı tekrar yazılsa da :) sonuç itibari URL'deki
ayrımlar çoğu zaman bizim için mantıksal ayrımlar şeklinde dosyaların
yönetimi için ciddi yardımcı bir öğedir. Aynı etkiyi Azure'da Blob
Storage'da yakalayabilir miyiz? sorusuna "Evet" cevabını verebilirim :)
ama birazdan her ne yaparsak yapalım sakın unutmayın :) aslında böyle
birşey yok :) yapacağımız herşey sanal, hala bloblarınız bir container
içerisinde olacak.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();

BlobContainerPermissions containerPermissions = new BlobContainerPermissions();
containerPermissions.PublicAccess = BlobContainerPublicAccessType.Blob;
container.SetPermissions(containerPermissions);

var blob = container.GetBlockBlobReference("resimler/" + FileUploadControl.FileName);
blob.UploadFromStream(FileUploadControl.FileContent);

Response.Write(blob.Uri.ToString());
```

Çakallığın farkına vardınız mı? :) Blob ismimiz artık sadece dosya ismi
değil. Yukarıdaki kod bloba isim olarak "resimler/" ile beraber dosya
adını veriyor böylece blobun ismi "resimler/ornek.jpg" gibi birşey
oluyor. Peki bunun URL'e yansıması nasıl olacak?

![Blob adını istediğimiz gibi verince URL de istediğimiz gibi oldu
:)](media/Blob_Ortaminda_File_System_Etkisi_yaratmak_SDK2_5/blob_cakalliklari.png)
*Blob adını istediğimiz gibi verince URL de istediğimiz gibi oldu :)*

Nasıl? Güzel oldu mu :) Şimdi tabi ki diyeceksiniz ki... "tamam güzel de
bu dosyaların yönetimini kolaylaştırmıyor" ve kesinlikle haklısınız :)
Bu noktaya kadar sadece web sitemize girip bu adresi gören ziyaretçileri
kandırmış olduk. Yoksa arka planda değişen hiçbirşey olmadı, olamaz da.
Ammmaaa! :)

StorageClient diye bir wrapper kullanıyoruz ya :) İşte onun içindeki
bazı ek ilginç hareketler Container'lar içerisinde sanal klasörler
varmış gibi listelemeler yapabilmemizi sağlıyor. Böylece normal bir
dosya sisteminden beklediğimiz gibi klasörleme mantığını kodda da
kullanabiliyoruz.

**[C\#]**

```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();

CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
CloudBlobDirectory directory = container.GetDirectoryReference("resimler");
foreach (var blobItem in directory.ListBlobs())
{
    Response.Write(blobItem.Uri + "<br/>");
} 
```

Yukarıdaki kodda Container'ımızı yakaladıktan sonra artık içinde klasörler varmış gibi "VirtualDirectory" yapısında ilerliyoruz. "resimler" adı Blob'ların adında yer alsa da bir klasörmüş gibi
CloudBlobDirectory olarak alıp içindeki blobları listeleyebiliyoruz. 

http://127.0.0.1:10000/devstoreaccount1/dosyalar/resimler/digerleri/  
http://127.0.0.1:10000/devstoreaccount1/dosyalar/resimler/test.txt  
http://127.0.0.1:10000/devstoreaccount1/dosyalar/resimler/v.jpg  

Yukarıda örnek bir dosya listesi görebilirsiniz. Fark ettiyseniz yukarıda bir sorun var. Listenin ilk başkındaki nesne bir dosya değil. Deneme amaçlı olarak iç içe birden çok klasör yaratacak şekilde bloblara isim verirseniz bir CloudBlobDirectory'den alacağınız Blob listesi aslında içindeki klasörü de getirecektir. Bu durumdan kurtulmanın tek yöntemi gelen nesnelerin tipini kontrol etmek.

**[C#]**
```cs
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
CloudBlobDirectory directory = container.GetDirectoryReference("resimler");
foreach (var blobItem in directory.ListBlobs())
{
    if (blobItem is CloudBlobDirectory)
    {
        foreach (var blobItemNested in ((CloudBlobDirectory)blobItem).ListBlobs())
        {
            Response.Write("Dosya:" + blobItemNested.Uri + "<br/>");
        }
    }
} 
```

Kodun foreach ile başlayan noktasından itibaren manzaraya bakacak
olursan aslında container adımız olan **resimleri** bir klasör olarak
kabul edip içindeki blobları dönüyorum. Bu dönüş sürecinde :) gelen
nesnenin bir **CloudBlobDirectory** olup olmadığını kontrol edip (yani
klasör olup olmadığını bir anlamda anlayıp) eğer klasörse tekrar onun
altından da bir ListBlobs çekerek dosyaları alabiliyoruz.

Normal bir dosya sistemi konseptine yaklaşmaya birkaç adım kaldı sanırım :)
Bunlardan ilki klasör yaratbilme. Maalesef bu konuda bire bir
System.IO'ya benzetilebilecek bir yapı yok. Unutmayın sonuçta sanal
klasör dediğimiz şeyler aslında blobların isimleri :) Sanal klasör ve
dosya ayrımını yapan StorageClient wrapper. Yani aslında şu an ne
yapıyorsak bunlar sorgular şeklinde Container seviyesinde
çalıştırılıyorlar.

İtiraf etmek gerekirse bu Directory yapısına Microsoft desteği ne zaman kesecek diye ben heyecanla bekliyorum. Eski SDK sürümlerinde bu gibi bir destek developerların Blob yapısına geçmeleri için güzel bir havuçtu ve klasör yapısına alışmış developerlara bir çıkış yolu sunuyordu. Fakat artık bu geçiş dönemininin az çok bittiğini de düşünürsek söz konusu geçiş araçlarına gerek var mı tartışılır. Sonuç itibari ile tüm bunlar, sanal klasörler vs doğal, organiz değil :) ve performansa etkisi olacaktır. Daha da kötüsü eğer bu yapıya çok odaklanır ve kendinizi kaptırırsanız blobların gerçek çalışma şeklini unutabilir ve bir anda kendinizi tüm blog yapısını efektif olmaktan çok uzak yöntemlerle kullanırken bulabilirsiniz. Özlete, bence sıkışmadıkça uzak durun :)

Kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2014-12-6 tarihinde yayinlanmistir.*
