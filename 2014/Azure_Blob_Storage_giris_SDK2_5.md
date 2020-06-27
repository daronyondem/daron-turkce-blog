# Azure'da Blob Storage'a giriş SDK(2.5)

Uzun süredir Azure yazılarında sürekli olarak :) uygulamamızın çalıştığı
sanal makinenin diskinin aslında kalıcı veri saklama alanı olarak
kullanılamayacağından bahsediyorum. Nedenini sanırım bugüne kadar
netleştirebilmişizdir :) Peki o zaman en basit haliyle kullanıcıdan
aldığımız bir resim dosyasını nereye saklayacağız? Nereye saklamalıyız
ki role'ümüzün tüm instance'ları bu dosyaya aynı şekilde ulaşabilsin?

### Windows Azure Storage Servisleri

Paylaşımlı ve kalıcı bir dosya saklama alanı olarak **Windows Azure
Storage servisleri** içerisinden Blob Storage'ı kullanmamız gerekiyor.
Windows Azure Storage servislerinde toplam üç tane farklı servis var;
blog, table ve queue. Biz bu yazımızda sadece Blob Storage konusunu
inceleyeceğiz. İleriki yazılarda tabi ki diğer konulara da bakarız ;)

![İlk Storage Account'umuzu
yaratırken](media/Azure_Blob_Storage_giris_SDK2_5/blob.png)
*İlk Storage Account'umuzu yaratırken*

Yeni bir Storage Account yaratırken bir DataCenter veya Affinity Group seçmenin yanı sıra bir de "Replication" modelini seçmemiz gerekiyor. Replication modeli olarak default gelen model "Geo-Redundant" modeli. Şimdilik o seçenek ile ilerleyelim. Sonraki yazılarda Replication modellerinin detaylarına göz atacağız.

*Not: Bir Storage Account yaratmak Microsoft'a para ödeyeceğiniz
anlamına gelmez. Storage Accountlar içerisindeki tüm servislerin
ücretlendirilme şekli kullanım üzerindendir. O nedenle yaratıp kenarda
bıraktığınız bir storage account'un sizin için bir maliyeti olmaz.*

![Storage Account'un
endpointleri.](media/Azure_Blob_Storage_giris_SDK2_5/blob2.png)
*Storage Account'un endpointleri.*

Storage Account'unuz yaratıldıktan Dashboard'da yukarıdaki gibi bilgileri bulabilirsiniz. Her Storage Account'ta blob,
table ve queue servisleri bulunur. Her servisin ise kendi endpointleri
vardır. Endpointlerin listesi malum ekran görüntüsünde görülüyor. Zaten
genel kural account adının sonuna servis adı sonrasına da
core.windows.net eklenmesi şeklinde. Yine tekrar etmek istiyorum :)
bunları yaratıp kullanmazsanız herhangi bir maliyeti yok :)

Storage account içerisindeki servislere ulaşırken ihtiyacınız olacak iki
şey var, birincisi account adı veya endpoint adresi, ikincisi ise
"Access Key" yani erişim anahtarı. Erişim anahtarı olarak iki tane
erişim anahtarı veriliyor. Her iki anahtar da aynı işi görüyor. Peki
neden ik tane var?

![Access Key'leri yenilemek
için.](media/Azure_Blob_Storage_giris_SDK2_5/blob3.png)
*Access Key'leri yenilemek için.*

Diyelim ki keyleri yenilemek istediniz. Bunu hemen "Regenerate" diyerek yapabilirsiniz. Karşınıza gelecek yeni ekradan
iki access key'den hangisini yenilemek istediğiniz sorulacaktır. Durum
öyle ki :) access key'i yenile dediğiniz anda eskisi direk pasif oluyor.
Peki canlı yayında olan uygulamanıza yeni access key'i verene kadar ne
olacak? Uygulama aşağı mı inecek? Tabi ki olmaz. O nedenle key
değiştirme senaryolarında eğer birinci key'i kullandıysanız onu önce bir
ikinci key ile değiştiriyorsunuz :) ikinci key CSCFG ile tamamen tüm
instancelara yayıldıktan sonra panele gelip birinci key'i regenrate
ediyorsunuz. Birinci key ile beraber CSCFG yine tüm instancelara
dağıldıktan sonra artık isterseniz ikinci key'i de regerate
edebilirsiniz. İşte bu senaryo nedeniyle aynı işe yarayan iki access
keyimiz mevcut.

### Bloblar!

Blob kelimesinin açılımı "Binary Large Object". Bloblar Azure içerisinde
paylaşımlı dosya saklama yerimiz. 

![Blob iç yapısı.](media/Azure_Blob_Storage_giris_SDK2_5/blob6.png)  
*Blob iç yapısı.*

Blob yapısı en dıştan bir "Account" ile başlıyor. Bunu zaten bir önceki
adımda hesabımızı yaratırken gördük. Her account'un bir adı var ve en
dış nesne olarak doğrudan account'un kendisi varsayabiliriz. Her account
içerisinde birden çok **Container** olabiliyor. Container'ları şu noktada
birer klasör gibi de düşünebilirsiniz ama bir istisna var :(
container'ları içiçe koymak mümkün değil. Her container içerisinde de
istediğiniz kadar **Blob** olabiliyor, yani dosya veya binary obje.

Her blobun bir de dışarıya açık HTTP Endpoint'i var. Yani bir container
içerisine koyduğunuz bir bloba eğer uygun izinleri verdiyseniz bu blob /
dosya doğrudan dışarıdan bir GET talebi ile alınabiliyor. GET talebinin
gönderileceği yani dosyanın web adresi için şu şekilde oluşuyor;

http://**{storage account adı}**.blob.core.windows.net/**{container
adı}**/**{blob adı}**

Her bir storage account şu an için en fazla 100TB veri saklayabiliyor.
Bu sınıra storage account içerisindeki diğer servislerin (table, queue)
sakladığı verilerin de dahil olacağını unutmamak gerek.

### Page, Block Blob

Bloblar kendi içerlerinde ikiye ayrılıyorlar :) Page ve Block Blob'lar
şeklinde... Genelde dosyalar eğer ki deli random read/write olmayacak
block blob'larda tutulurlar. Bir block blob tek başına en fazla 200GB
veri alabilir. Bir Page Blob ise tek başına 1TB veri saklayabilir.

Page blob ile block blob arasındaki farklılığın detaylarına biraz girmek
gerekirse; Page Bloblar 512 byte'lık seriler şeklinde veriyi saklarken
Block Blob'larda bloklar 4MB'a kadar çıkabilir. Block bloblar kendi
içlerinde asenkron upload, birden çok kanal açımı, kaba bir transaction
yapısı sunarken Page Blob'larda herşey anında commit olur. Genel olarak
baktığımızda random read/write gerektiğinde, kabaca bir filesystem
stream access gerektiğinde Page Blob'lar daha mantıklı olacaktır fakat
chunk file / toplu dosya işlemlerinin bulunduğu senaryolarda block
bloblar çok daha pratik olur. Örneğin son kullanıcıdan aldığınız bir
resmi veya videoyu block blob'a kaydetmelisiniz :)

### İlk blob kullanımımız!

Eh hadi bakalım :) İlk blob kullanımımıza doğru yola çıkalım. Temiz bir
Azure projesini yine tertemiz bir web role ile aldıktan sonra WebRole'ün
ayarlarına giderek Storage Account erişim bilgilerimizi tutacak yeni bir
ayar bilgisini CSDEF ve CSCFG'ye koyalım.

![Hesap ayarlarımızı Azure projesine
eklerken.](media/Azure_Blob_Storage_giris_SDK2_5/blob4.png)
*Hesap ayarlarımızı Azure projesine eklerken.*

Yukarıdaki ekran görüntüsünden de yakalayabileceğiniz üzere "Add
Settings" diyerek istediğimiz isimde bir ayar tanımlayıp bunun da
"Connection String" olacağını belirttikten sonra sağda belirlen mini
düğmeye tıklayıp Storage Account bilgilerimizi girebileceğimiz ekrana
geliyoruz. Burada istersenis Account Name ile Key'i girerek doğrudan
Azure'daki Storage Account'tan blob servisini kullanın isterseniz "Microsoft Azure storage emulator" diyerek SDK ile beraber
bilgisayarınıza yüklenen emülatörü kullanın. Programatik açıdan emülatör
ile live servis arasında bir fark yok ;) o nedenle son testler haricinde
local emülatörü kullanarak devam edebilirsiniz.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
```

Ayarladığımız **blobConnection** connection stringini almak yerine ben şimdilik doğrudan DevelopmentStorageAccount kullanıyorum. Bunun üzerinden hemen
kendimize bir **CloudStorageAccount** nesnesi yaratıyoruz. Unutmayın ki
Storage Account ile ilgili tüm servisler normalde REST API'leri ile
açılmış durumdalar. Bu REST API'leri C\#'dan böyle rahat
kullanabilmemizi sağlayan wrapper'lar Azure SDK sayesinde projemizde
zaten bulunuyor. ASP.NET projemize referanslı gelen
Microsoft.WindowsAzure.Storage.dll wrapper'ımızın ta kendisi. Eğer sizin
projenizde referanslı değilse rahatlıkla Azure SDK'in kurulu olduğu
klasörden bularak elle de referans alabilirsiniz.

Account nesnemizi yarattıken sonra bu nesne üzerinden de bir **BlobClient**
yaratıyoruz. Böylece artık Storage Account üzerindeki blob servisi ile
ilgili işlem yapacağımızı da belirlemiş olduk.

[**C\#]**
```cs
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();
```

Biliyorsunuz bloblardaki herhangi bir blobu saklayabilmek için en
azından bir container sahibi olmamız gerekiyor. O nedenle yukarıdaki
kodda da hemen bir container yaratıyoruz. Elimizdeki **blobclient**
üzerinden dosyalar adında bir container'ın referansını alıyoruz. Aslında
böyle bir container şu anda yok :) ama zaten GetContainerReference
dediğinizde bir REST API call gerçekleşmiyor. Tabi tüm bu kodları yazarken
aslında sürekli olarak arka planda bir REST API Call'un yaratılmasını
sağladığımızı ve o mantığa uygun kod yazdığımızı akılda bulundurmak
gerek. Farklı bir benzetme ile :) belki de bunu yazdığımız anda SQL'e
gönderilmeyen LINQ2SQL sorgularına da benzetebiliriz :) Çok farklı bir
benzetme oldu farkındayım :)

*Not: Container isimleri kesinlikle küçük harflerden oluşmalı. 3-63
karakter uzunluğunda olmalı.*

Konumuza dönersek :) referansını aldığımız **container'ın** yaratılması
için container nesnesi üzerinden **CreateIfNotExists** diyoruz ve işlem
bitiyor. Artık "dosyalar" adında bir container nesnemiz var ve içine
dosya atabiliriz :)

**[C\#]**
```cs
var blob = container.GetBlockBlobReference(FileUploadControl.FileName);
blob.UploadFromStream(FileUploadControl.FileContent);
```

Herşey ne kadar basit ilerliyor değil mi? :) Elimizdeki container
üzerinden bu sefer de bir **BlockBlobReference** alıyoruz. Blob reference alırken
blob ismi olarak FileUpload kontrolünden gelen dosyanın ismini
veriyoruz. Tabi yine container'da olduğu gibi şu anda böyle bir blob
yok, sadece referansı var. Bir sonraki adımda o referans üzerinden
**UploadFromStream** diyerek FileUpload'daki içeriği verdiğimiz anda Upload
işlemi gerçekleşiyor ve blob fiziksel varlığına kavuşuyor :)

Eh hadi.. F5'e basın... ;)

Peki bu upload ettiğimiz resme nasıl ulaşacağız? Bunun için aşağıdaki gibi blob'dan URL istememiz gerekecek.

**[C\#]**
```cs
var blob = container.GetBlockBlobReference(FileUploadControl.FileName);
blob.UploadFromStream(FileUploadControl.FileContent);
Response.Write(blob.Uri.ToString());
```

URL'i aldıktan sonra doğrudan tarayıcıya yazıp dosyayı görmek isterseniz dosyaya ulaşamadığınızı göreceksiniz. Ama bu noktadan önce linkin formatına dikkat edelim :) Daha önce konuştuğumuz storage account ve blob link yaratma şeklinde pek benzemiyor gibi. Normalde container adı ve sonra da blob adı gelmesi gerekirdi. Tabi onun için account adının da domain başında subdomain tadında durması gerekiyordu. Eğer bu projeyi Azure'daki canlı bir Storage Account'a yönlendirirseniz herşey aynen daha önce konuştuğumuz gibi olacaktır. Ama local emülatörde çalışıyorsanız maalesef bu linklerin yapısı daha farklı olacak. Lokal emülatörde sadece tek bir storage account olabiliyor ve table, queue, blob gibi servisler farklı IP'ler yerine farklı portlardan yayınlanıyor. Durum böyle olunca default account adı olan "devstoreaccount1" i de URL içerisinde görüyoruz. Özetle, bu emülatöre özel geçici bir durum :)

![Dosyamıza ulaşamıyoruz.](media/Azure_Blob_Storage_giris_SDK2_5/blob5.png)
*Dosyamıza ulaşamıyoruz.*

Dosyaya ulaşamama problemimize geri dönersek. Problemin nedeni Container'ın izinleri ile alakalı. Varsayılan ayarlarla bir Container yaratıldığında sadece elinde key olan kişiler ulaşabiliyor. Yani biz zaten ConnectionString ile gittiğimiz için bizim için bir problem yok. Ama dışarıdan gelen bir kullanıcı URL ile doğrudan erişebilsin istiyorsak söz konusu Container'a ek izinler vermemiz şart.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExists();

BlobContainerPermissions containerPermissions = new BlobContainerPermissions();
containerPermissions.PublicAccess = BlobContainerPublicAccessType.Blob;
container.SetPermissions(containerPermissions);

var blob = container.GetBlockBlobReference(FileUploadControl.FileName);
blob.UploadFromStream(FileUploadControl.FileContent);
Response.Write(blob.Uri.ToString());
```

Yukarıdaki koddaki tek farklılık container'a tüm bloblar için public access yani genele erişim hakkı vermemiz. Kodu tekrar çalıştırırsanız artık bu hak verilmiş ve container içerisinde her dosyaya kendi linki ile erişilebiliyor olacaktır. Toplamda Blob'larda üç çeşit ana erişim hakkı var. 

- **Private**; sadece key ile ulaşılabilir.
- **Blob**; Blob izni verildiğinde blobun adresi biliniyorsa dosyaya ulaşılabilir.
- **Container**; adresler bilinmeden de Container'lar içerisindeki blobların listesine ulaşılabilir.

**[C\#]**
```cs
CloudStorageAccount account = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = account.CreateCloudBlobClient();
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");

foreach (var item in container.ListBlobs())
{
    ((ICloudBlob)item).Delete();
}
```

Hızlıca konumuza devam edecek olursak :) Örneğin bir Container içerisinde blobların listesine nasıl ulaşırım derseniz sanırım yukarıdaki kod yardımcı olabilir. Container üzerinden ListBlobs demeniz yeterli. Sonra tek tek gibip her blob'tan Uri'sini alabilir veya doğrudan "Delete" diyerek silebilirsiniz. Blob'lardaki dosyalarınızı geri almak isterseniz **DownloadToStream** size yardımcı olabilir.

**[C\#]**
```cs
foreach (var blobItem in container.ListBlobs())
{
    using (var fileStream = System.IO.File.OpenWrite(Path.GetTempFileName()))
    {
        ((CloudBlob)blobItem).DownloadToStream(fileStream);
    } 
} 
```

### Sonuç olarak

Birincisi şunu söyliyim :) Blob konusu bitmedi :) ama sanırım akıllardaki çoğu soru işaretini cevaplamıştır. Azure ortamında 180 instance çalışan web role'ünüzün kalıcı dosya saklama yeri kesinlikle Blob'lar olacaktır. İşin güzel tarafı özellikle dışarıya açılacak dosyalarda blobların bunu doğrudan yapıyor olması. Böylece dosya downloadları, resimler gibi birçok şeyin trafiği aslında sunucunuz üzerinden geçmiyor bile. Blobların performansından, arka planda doğru şekilde dağılmasında Microsoft sorumlu çünkü orada zaten hem bandwidth :) hem REST API transaction başına para alıyorlar. Tabi storage alanı için de para alınıyor :) 

Kolay gelsin.

*Bu yazi http://daron.yondem.com adresinde, 2014-12-4 tarihinde yayinlanmistir.*
