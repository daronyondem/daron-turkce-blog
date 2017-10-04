---
FallbackID: 2766
Title: Windows Azure'da ilk projemiz ve deployment
PublishDate: 24/4/2012
EntryID: Windows_Azure_da_ilk_projemiz_ve_deployment
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
**[Aşağıdaki makalenin SDK2.2 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/tr/post/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2)
bulabilirsiniz.]**

Artık yavaş yavaş birşeyleri Azure ortamında görmenin zamanı geldi :)
Hemen Visual Studio'yu açıp "File / New Project" üzerinden "Cloud"'u
seçip ilk projemizi yaratalım. Bunu yaparken de Cloud projemize deneme
amaçlı olarak bir ASP.NET sitesinde ekleyelim.

![İlk Azure
projemiz...](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk.jpg)\
*İlk Azure projemiz...*

Projemizi yarattıktan sonra ASP.NET tarafındaki tüm dosyaları silip
basit bir ASPX ekleyip içine de klasik :) "Hello World" yazabiliriz.
Böylece minimalist bir ASP.NET sitemiz olmuş olacak.

![Basit bir Cloud
projesi.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk2.jpg)\
*Basit bir Cloud projesi.*

Dikkat ederseniz WebRole.Cs ile Web.Config'i silmedim. Konsept olarak
onları bırakmakta fayda var :) Web.Config'in içini yine de aşağıdaki
şekilde temizleyebilirsiniz. Malum sample site'ı sildiysek onunla ilgili
gereksiz ayarları da silmekte fayda var.

**[web.config]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;"> </span><span
style="color:red;">encoding</span><span
style="color:blue;">=</span>"<span
style="color:blue;">utf-8</span>"<span style="color:blue;">?\></span>\
 <span style="color:blue;">\<</span><span
style="color:#a31515;">configuration</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">system.diagnostics</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">trace</span><span style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">listeners</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">add</span><span style="color:blue;"> </span><span
style="color:red;">type</span><span style="color:blue;">=</span>"<span
style="color:blue;">Microsoft.WindowsAzure.Diagnostics.DiagnosticMonitorTraceListener, \
           
Microsoft.WindowsAzure.Diagnostics, Version=1.0.0.0, Culture=neutral, \
            PublicKeyToken=31bf3856ad364e35</span>"<span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">AzureDiagnostics</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">          \<</span><span
style="color:#a31515;">filter</span><span
style="color:blue;"> </span><span style="color:red;">type</span><span
style="color:blue;">=</span>""<span style="color:blue;"> /\></span>\
 <span style="color:blue;">        \</</span><span
style="color:#a31515;">add</span><span style="color:blue;">\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">listeners</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">trace</span><span style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">system.diagnostics</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">system.webServer</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">modules</span><span
style="color:blue;"> </span><span
style="color:red;">runAllManagedModulesForAllRequests</span><span
style="color:blue;">=</span>"<span style="color:blue;">true</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">system.webServer</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">configuration</span><span
style="color:blue;">\></span>

Artık default.aspx'in arkasındaki "Hello World" kısmını siz
halledersiniz :) Projemiz ilk ayarlarında tek instance ve small vm size
çalışacak şekilde geliyor. Şimdilik orada bir değişiklik yapmayacağız ve
hemen deployment'a geçeceğiz.

### Windows Azure hesabı edinmek

Windows Azure hesabı edinmek için basit bir şekilde
[windowsazure.com](http://www.windowsazure.com) adresine gitmeniz
gerekiyor. Buradan yeni bir hesap edinebilirsiniz veya deneme hesabını
da [buradan](http://www.windowsazure.com/en-us/pricing/free-trial/)
alabilirsiniz. Her iki seçenekte de Microsoft kredi kartı bilgileri
alacaktır. İlk seçenekte normal bir hesap aldığınız için doğal olarak
kullandığınız kaynakların ücreti kredi kartınızdan çekilecek. Azure
ortamında neye ne kadar para ödediğimiz konusunu ileride inceleyeceğiz
fakat şimdilik kullandığınız sunucular için saat başına para ödediğinizi
bilmenzide fayda var. Eğer bir deneme hesabı aldıysanız yine sizden
kredi kartı bilgileriniz alınacak fakat deneme süresi bitene kadar
kesinlikle kartınızdan para çekilmeyecek. Eğer deneme hesabının
limitlerine gelirseniz o ay için deneme hesabınızdaki kaynaklar
kapatılacak. Bir sonraki ayda tekrar açılarak deneme hesabı limitlerinde
azure hizmetlerini tekrar kullanabilir hale geleceksiniz fakat bu
süreçte hiçbir zaman kredi kartınızdan para çekilmeyecek. Deneme
hesapları için kredi kartı bilgis alınmasının birinci nedeni spam deneme
hesabı alınmasını engellemek ikincisi ise deneme dönemi bittikten sonra
kullanılan kaynakların ödemesini alabilmek.

Azure hesabınızı edindikten sonra yönetim paneli için sürekli ziyaret
edeceğiniz adres ise <http://windows.azure.com> şeklinde olacak. Tamamen
Silverlight ile geliştirilmiş olan bu site Azure ortamındaki tüm
servisleri kullanabilmenizi, yönetebilmenizi sağlayacak. Biz de şu anda
elimizde olan HelloWorld projesini bu portal üzerinden azure'a
yükleyeceğiz.

### Azure uygulamamızı paketlemek.

Azure projemiz ve hesabımız artık hazır olduğuna göre hemen Visual
Studio'da Solution Explorer içerisinde Azure projesine sağ tıklayıp
"Package" komutunu verebiliriz.

![Azure Package
yaratırken.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk3.jpg)\
*Azure Package yaratırken.*

Bir sonraki adımda karşınıza çıkacak soru paket yaratırken service
configuration olarak Cloud.cscfg veya Local.cscfg'nin kullanımı vey
Release veya Debug Build kullanılıp kullanılmayacağı şeklinde olacak.
Genel olarak tabi ki Cloud.cscfg'yi ve Release build konfigürasyonunu
kullanacağız.

![Azure paketimiz
hazır.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk4.jpg)\
*Azure paketimiz hazır.*

Paketleme işlemi bittiği gibi hemen paketlerin bulunduğu klasör
ekranınıza gelecektir. Yukarıdaki ekran görüntüsünden de görülebileceği
üzere toplam iki tane dosyamız var. Bunlardan CSPKG adından da tahmin
edilebileceği üzere "Cloud Service Package" yani uygulamamızın tüm
dosyalarını içeren paket. Diğer dosya ise CSCFG :) işte bu sanırım şu
anda ciddi tanıdık geliyor. Bizim Cloud.CSCFG'nin ta kendisi. Özetle :)
konfigürasyon dosyası ayrıca dururken geri kalan herşey bir paket
içerisinde toplanmış durumda.

Bu noktada gelin birkaç şeyin üzerinden tekrar geçelim. Birinci sorumuz
:) CSDEF nerede? Cevap : CSDEF paketin içerisinde. Yani eğer CSDEF'te
bir değişiklik yapmak isterseniz tüm paketi tekrar yaratıp yollamak
zorundasınız. Paketi tekrar yollamak ise bir upgrade başlatmak demek.
Sanırım şu anda neden konfigürasyon dosyasının dışarıda bırakıldığını
anlamışsınızdır :) konfigürasyon dosyası paket değiştirilmeden yani
uygulamaya upgrade yapılmadan da değiştirilebiliyor. Bu da tabi ki ciddi
bir esneklik sağlıyor.

Hemen bir noktayı daha hatırlayalım :) VM Size bilgisi CSDEF'teyken
Instance sayısı CSCGF'deydi. Yani VM Size değiştirirseniz tekrar paket
yaratıp yollamanız gerekecek, aynı şey role'lerinizin endpoint bilgileri
için de geçerli. Oysa Instance sayısı CSCFG'de olduğu için uygulamaya
upgrade yapılmadan uygulama çalışırken de değiştirilebiliyor.

### Sıra geldi deployment'a...

Hemen <http://windows.azure.com> adresine gidip LiveID'miz ile giriş
yaparak yönetim paneline ulaşıyoruz. Panel daha önce de bahsettiğimiz
üzere bir Silverlight uygulaması. Uygulama 30 saniye aralıklarla
elindeki veriye refresh atıyor :) o yüzden arada sırada beklemek zorunda
kalabiliyoruz. Refresh counter'ını ekranın sol altında görebilirsiniz.
Ben özellikle bu refresh sayesinde session'ımın expire etmemesine
bayılıyorum :) Bir günden daha fazla paneli açık bırakıp direk tekrar
kullanabilir olmak güzel :) Basit ama güzel :)

![Azure Yönetim
Paneli](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk5.jpg)\
*Azure Yönetim Paneli*

Panelin sol altında farklı Azure servislerinin kaba bir listesini
görebilirsiniz. İşte bu listeden panelin farklı bölümlerine geçerek
işlemlerimizi yapabiliyoruz. Hemen sol alttan "Hosted Services"
seçeneğini seçerek ilerleyeceğiz.

![Azure ortamında hosted
serviceler.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk6.jpg)\
*Azure ortamında hosted serviceler.*

Sol taraftan "Hosted Services, Storage Accounts & CDN"'i seçtikten sonra
yukarıdan da tekrar "Hosted Services"'i seçerseniz panelin orta kısmında
tüm servislerinizi görebilirsiniz. Eğer yeni bir hesap açtıysanız tabi
ki burası boş gelecektir. Bende hali hazırda bir deployment olduğu için
o da gösteriliyor. Benim örneğimde "shortone" adında bir service
deployment'ı var. Söz konusu bu servisin "prod4" adındaki deployment'ı
altında bir tane Worker Role bir tane de Web Role bulunuyor. Her iki
role de ikişer instance şeklinde düzenlenmiş.

Bu ekran görüntüsünde dikkat edilmesi gereken bir diğer nokta ise bende
toplam 3 subscription olması. Bu aslında üç tane ayrı Windows Azure
hesabı anlamına geliyor. Farklı Azure hesabları aynı LiveID'ye
bağlanabiliyor. Durum böyle olduğunda LiveID'niz ile login olduğunuzda
bu hesapları subscription olarak görebiliyorsunuz. Bu ayrım genelde
projeler arası "muhasebe" kapsamında da ayrım yapmak istediğinizde çok
mantıklı olabilir.

![İlk Hosted
Service'imiz.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk7.jpg)\
*İlk Hosted Service'imiz.*

Panelde uygun subscription'ı seçtikten sonra üst ribbon bar'da "New
Hosted Service" diyerek yeni bir servis yaratmaya başlayabiliriz. Bu
servis bizim biraz önce yarattığımız HelloWorld web uygulamasını
barındıracak.

![Servisimizi
yüklerken...](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk8.jpg)\
*Servisimizi yüklerken...*

Yukarıdaki ekran ilk servis yaratırken ve yüklerken karşımıza çıkacak
olan ekran. En üstte yine subscription seçebiliyorsunuz. Bir allta
service'e istediğimiz gibi bir isim verirken "URL prefix" ise
servisimizin barındırılacak adresi yaratmak için kullanılıyor.
Sonrasında istersek elimizdeki farklı domain'leri de buraya yönlendirme
şansımız var ama isterseniz doğrudan deneme.cloudapp.net gibi Azure'un
verdiği bir adresi de kullanabilirsiniz.

Bir alt kademede servisimiz barındırılacağı datacenter'ın konumunu
seçiyoruz. Servisinizin kullanacağını düşündüğün ülkelere olabildiğinde
yakın bir datacenter seçmek çok mantıklı olacaktır. Şu an için kabaca
her kıtada iki datacenter var.

**Deployment options** denilen kısımda üç seçenek var. Bunlardan en
sonuncusu bir deployment yapmamak ve sadece servisi tanımlamak. Böylece
deployment'ı sonra da yapabilirsiniz. İlk iki seçenek ise production ve
sating olarak ayrılıyor. Bu iki ayrım arasında sadece tek bir fark var
:) servisiniz yayınlanacağı adres. Production deploymentı yaparsanız
önceki adımlarda seçtiğinizde adreste siteniz yayında olur. Staging
derseniz size özel apayrı bir staging URL daha yaratılır ve deployment
oraya yapılır. Staging daha fazla test amaçlı ve herkesin görmediği bir
alan olarak düşünebilirsiniz.

Son olarak deployment'ımıza da bir isim verip artık azure servis
paketimizi ve konfigürasyon dosyamızı verebiliyoruz. Zaten Visual Studio
paketi yarattıktan sonra klasörünü açmıştı, hemen orada dosyaları
gösterebilirsiniz. Şimdi gönül rahatlığı ile "OK"e basın ve süreci
panelden izleyin :) Upload dahil sunucuların provisioningi toplam 10
dakikayı bulacaktır. Bu süreçte FC Azure DataCenter'ında istediğimiz
şartlara uygun boş yer bulacak, VM'leri dağıtacak, ayağa kaldıracak,
load balancer'a haber verecek vs vs vs :)

![SLA SLA SLA! :) %99.95 için 2 instance
şart.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk9.jpg)\
*SLA SLA SLA! :) %99.95 için 2 instance şart.*

Yüklemenizi başlattığınız anda yukarıdaki şekilde bir uyarı alacaksınız.
Bunun nedeni çok basit :) Bizim uygulamadaki web role tek instance
çalışmak üzere ayarlı ve Azure bu durumda %99.95'lik garantisini
veremiyor. İşte uyarı da bununla ilgili. "Yes" diyerek bu uyarıyı es
geçip deployment'a devam edebilirsiniz. Fakat unutmayın :) tavsiye
edilen her zaman 2 instance, benden söylemesi.

![Paket upload
olurken...](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk10.jpg)\
*Paket upload olurken...*

Upload işlemi bittikten sonra sonra servisinize role sayısına ve
instance sayısına göre sunucuların hazırlanması 5 ile 15 dakika arasında
sürebiliyor. Süreci doğrudan yönetim panelinden izleyebilirsiniz.

![Herşey hazırlanıyor
:)](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk11.jpg)

Herşey hazır olduktan sonra servisinizin deployment'ını seçip yönetim
panelinin sağ tarafındaki konsoldan da servise ait linki bulabilirsiniz.
Tıklayın ve servisinizi azure ortamında çalışır görün ;)

![Staging için verilen
adres.](media/Windows_Azure_da_ilk_projemiz_ve_deployment/ilk12.jpg)\
*Staging için verilen adres.*

İtiraf ediyorum :) tüm bu deployment senaryosunu kolaylaştırmanın bir
yolu var :) ama bire bur bu senaryoyu görmek de bence çok önemli. Neyin
ne olduğunu anlamak ve yönetim paneli ile azure paketimiz arasında
ilişki bence kritik. İleriki yazılarda farklı konulara da bakarken
Visual Studio içerisinden doğrudan Publish senaryolarına göz atacağımz
;)

Görüşmek üzere.


