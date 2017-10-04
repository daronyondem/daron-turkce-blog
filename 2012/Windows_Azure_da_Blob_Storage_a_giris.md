---
FallbackID: 2774
Title: Windows Azure'da Blob Storage'a giriş
PublishDate: 12/6/2012
EntryID: Windows_Azure_da_Blob_Storage_a_giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
**[Aşağıdaki makalenin SDK2.5 ile beraber yeni Azure özelliklerine uygunşekilde güncellenmiş halini[burada](http://daron.yondem.com/software/post/Azure_Blob_Storage_giris_SDK2_5)bulabilirsiniz.]**Uzun süredir Azure yazılarında sürekli olarak :) uygulamamızın çalıştığı
sanal makinenin diskinin aslında kalıcı veri saklama alanı olarak
kullanılamayacağından bahsediyorum. Nedenini sanırım bugüne kadar
netleştirebilmişizdir :) Peki o zaman en basit haliyle kullanıcıdan
aldığımız bir resim dosyasını nereye saklayacağız? Nereye saklamalıyız
ki role'ümüzün tüm instance'ları bu dosyaya aynı şekilde ulaşabilsin?

### Windows Azure Storage Servisleri

Paylaşımlı ve kalıcı bir dosya saklama alanı olarak **Windows Azure
Storage servisleri** içerisinden Blog Storage'ı kullanmamız gerekiyor.
Windows Azure Storage servislerinde toplam üç tane farklı servis var;
blog, table ve queue. Biz bu yazımızda sadece Blob Storage konusunu
inceleyeceğiz. İleriki yazılarda tabi ki diğer konulara da bakarız ;)

![İlk Storage Account'umuzu
yaratırken](media/Windows_Azure_da_Blob_Storage_a_giris/blob.png)
*İlk Storage Account'umuzu yaratırken*

Azure web yönetim panelinde "hosted servis"ler ile aynı kısımda bulunan
**Storage Accounts** tabına giderek kendimize yeni bir storage account
yaratmalıyız. Bunun için yukarıdaki ekran görüntüsünde de
görebileceğiniz "New Storage Account" düğmesine basıp
ilerleyebilirsiniz.

![Storage Account'umuza isim ve bölge
atıyoruz.](media/Windows_Azure_da_Blob_Storage_a_giris/blob2.png)
*Storage Account'umuza isim ve bölge atıyoruz.*

Karşınıza yukarıdaki basit ekran dışında başka bir ekran gelemeyecek
zaten. Bu ekranda Storage Account'unuza bir isim verip bir de bölge
seçmeniz yeterli. Eğer uygulamanızın diğer servisleri için de bir
Affinity Group yarattıysanız bu noktada tabi ki uygun Affinity Group'u
seçmek mantıklı olacaktır.

*Not: Bir Storage Account yaratmak Microsoft'a para ödeyeceğiniz
anlamına gelmez. Storage Accountlar içerisindeki tüm servislerin
ücretlendirilme şekli kullanım üzerindendir. O nedenle yaratıp kenarda
bıraktığınız bir storage account'un sizin için bir maliyeti olmaz.*

![Storage Account'un
endpointleri.](media/Windows_Azure_da_Blob_Storage_a_giris/blob3.png)
*Storage Account'un endpointleri.*

Storage Account'unuz yaratıldıktan sonra ekranın sağ tarafındaki
yukarıdaki gibi bilgileri bulabilirsiniz. Her Storage Account'ta blob,
table ve queue servisleri bulunur. Her servisin ise kendi endpointleri
vardır. Endpointlerin listesi malum ekran görüntüsünde görülüyor. Zaten
genel kural account adınıns onuna servis adı sonrasına da
core.windows.net eklenmesi şeklinde. Yine tekrar etmek istiyorum :)
bunları yaratıp kullanmazsanız herhangi bir maliyeti yok :)

Storage account içerisindeki servislere ulaşırken ihtiyacınız olacak iki
şey var, birincisi account adı veya endpoint adresi, ikincisi ise
"Access Key" yani erişim anahtarı. Erişim anahtarı olarak iki tane
erişim anahtarı veriliyor. Her iki anahtar da aynı işi görüyor. Peki
neden ik tane var?

![Access Key'leri yenilemek
için.](media/Windows_Azure_da_Blob_Storage_a_giris/blob4.png)
*Access Key'leri yenilemek için.*

Diyelim ki keyleri yenilemek istediniz. Bunu hemen Ribbon'dan
"Regenerate Keys" diyerek yapabilirsiniz. Karşınıza gelecek yeni ekradan
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

![Access Key'leri
yenilerken.](media/Windows_Azure_da_Blob_Storage_a_giris/blob5.png)
*Access Key'leri yenilerken.*

### Bloblar!

Blob kelimesinin açılımı "Binary Large Object". Bloblar Azure içerisinde
paylaşımlı dosya saklama yerimiz. Azure kendi içerisinde her datayı üç
kopya olarak tutuyor demiştik. Blob'larda da bu durum gereçli. Biri
tamamen datacenter dışında olmak şartı ile Blob'larda tutulan tüm veri
üç kopya olarak tutuluyor. Böylece veri kaybı neredeyse imkansız bir
hale getirilebiliyor.

![Blob iç yapısı.](media/Windows_Azure_da_Blob_Storage_a_giris/blob6.png)
*Blob iç yapısı.*

Blob yapısı en dıştan bir "Account" ile başlıyor. Bunu zaten bir önceki
adımda hesabımızı yaratırken gördük. Her account'un bir adı var ve en
dış nesne olarak doğrudan account'un kendisi varsayabiliriz. Her account
içerisinde birden çok Container olabiliyor. Container'ları şu noktada
birer klasör gibi de düşünebilirsiniz ama bir istisna var :(
container'ları içiçe koymak mümkün değil. Her container içerisinde de
istediğiniz kadar Blob olabiliyor, yani dosya veya binary obje.

Her blobun bir de dışarıya açık HTTP Endpoint'i var. Yani bir container
içerisine koyduğunuz bir bloba eğer uygun izinleri verdiyseniz bu blob /
dosya doğrudan dışarıdan bir GET talebi ile alınabiliyor. GET talebinin
gönderileceği yani dosyanın web adresi için şu şekilde oluşuyor;

http://**\<storage account adı\>**.blob.core.windows.net/**\<container
adı\>**/**\<blob adı\>**

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
eklerken.](media/Windows_Azure_da_Blob_Storage_a_giris/blob7.png)
*Hesap ayarlarımızı Azure projesine eklerken.*

Yukarıdaki ekran görüntüsünden de yakalayabileceğiniz üzere "Add
Settings" diyerek istediğimiz isimde bir ayar tanımlayıp bunun da
"Connection String" olacağını belirttikten sonra sağda belirlen mini
düğmeye tıklayıp Storage Account bilgilerimizi girebileceğimiz ekrana
geliyoruz. Burada istersenis Account Name ile Key'i girerek doğrudan
Azure'daki Storage Account'tan blob servisini kullanın isterseniz "User
the Windows Azure Storage emulator" diyerek SDK ile beraber
bilgisayarınıza yüklenen emülatörü kullanın. Programatik açıdan emülatör
ile live servis arasında bir fark yok ;) o nedenle son testler haricinde
local emülatörü kullanarak devam edebilirsiniz.

**[C\#]**
```cs
CloudStorageAccount account = 
    CloudStorageAccount.FromConfigurationSetting("blobConnection");
CloudBlobClient blobClient = account.CreateCloudBlobClient();
```

Ayarladığımız **blobConnection** connection stringini alarak hemen
kendimize bir **CloudStorageAccount** nesnesi yaratıyoruz. Unutmayın ki
Storage Account ile ilgili tüm servisler normalde REST API'leri ile
açılmış durumdalar. Bu REST API'leri C\#'dan böyle rahat
kullanabilmemizi sağlayan wrapper'lar Azure SDK sayesinde projemizde
zaten bulunuyor. ASP.NET projemize referanslı gelen
WindowsAzure.StorageClient.dll wrapper'ımızın ta kendisi. Eğer sizin
projenizde referanslı değilse rahatlıkla Azure SDK'in kurulu olduğu
klasörden bularak elle de referans alabilirsiniz.

Account nesnemizi yarattıken sonra bu nesne üzerinden de bir BlobClient
yaratıyoruz. Böylece artık Storage Account üzerindeki blob servisi ile
ilgili işlem yapacağımızı da belirlemiş olduk.

[**C\#]**
```cs
CloudBlobContainer container = blobClient.GetContainerReference("dosyalar");
container.CreateIfNotExist();
```

Biliyorsunuz bloblardaki herhangi bir blobu saklayabilmek için en
azından bir container sahibi olmamız gerekiyor. O nedenle yukarıdaki
kodda da hemen bir container yaratıyoruz. Elimizdeki **blobclient**
üzerinden dosyalar adında bir container'ın referansını alıyoruz. Aslında
böyle bir container şu anda yok :) ama zaten GetContainerReference
dediğiniz bir REST API call gerçekleşmiyor. Tabi tüm bu kodları yazarken
aslında sürekli olarak arka planda bir REST API Call'un yaratılmasını
sağladığımızı ve o mantığa uygun kod yazdığımızı akılda bulundurmak
gerek. Farklı bir benzetme ile :) belki de bunu yazdığımız anda SQL'e
gönderilmeyen LINQ2SQL sorgularına da benzetebiliriz :) Çok farklı bir
benzetme oldu farkındayım :)

*Not: Container isimleri kesinlikle küçük harflerden oluşmalı. 3-63
karakter uzunluğunda olmalı.*

Konumuza dönersek :) referansını aldığımız **container'ın** yaratılması
için container nesnesi üzerinden **CreateIfNotExist** diyoruz ve işlem
bitiyor. Artık "dosyalar" adında bir container nesnemiz var ve içine
dosya atabiliriz :)

**[C\#]**
```cs
var blob = container.GetBlobReference(FileUpload1.FileName);
blob.UploadFromStream(FileUpload1.FileContent);
```

Herşey ne kadar basit ilerliyor değil mi? :) Elimizdeki container
üzerinden bu sefer de bir blobreference alıyoruz. Blob reference alırken
blob ismi olarak FileUpload kontrolünden gelen dosyanın ismini
veriyoruz. Tabi yine container'da olduğu gibi şu anda böyle bir blob
yok, sadece referansı var. Bir sonraki adımda o referans üzerinden
UploadFromStream diyerek FileUpload'daki içeriği verdiğimiz anda Upload
işlemi gerçekleşiyor ve blob fiziksel varlığına kavuşuyor :)

Eh hadi.. F5'e basın... ;)

![Hata var...](media/Windows_Azure_da_Blob_Storage_a_giris/blob8.png)
*Hata var...*

Haha! :) Çalışacak zannetiniz dimi?? :) Daha birkaç şey daha var
yapmamız gereken. Şimdi hataya bakalım ne diyor... Diyor ki... "Önce
SetConfigurationSettingPublisher" demen lazım diyor :)

Hadi buradan sonrasını size bırakıyorum :) Biraz araştırın bakalım :)
Bir sonraki yazıda biraz daha detaya girerek Blob konumuza devam
edeceğiz ;)


