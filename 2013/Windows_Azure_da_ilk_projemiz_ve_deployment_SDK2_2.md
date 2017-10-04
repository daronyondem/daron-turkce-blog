---
FallbackID: 2881
Title: Windows Azure'da ilk projemiz ve deployment (SDK2.2)
PublishDate: 1/12/2013
EntryID: Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Artık yavaş yavaş birşeyleri Azure ortamında görmenin zamanı geldi :)
Hemen Visual Studio'yu açıp "File / New Project" üzerinden "Cloud"'u
seçip ilk projemizi yaratalım. Bunu yaparken de Cloud projemize deneme
amaçlı olarak bir ASP.NET sitesinde ekleyelim.

![İlk Azure
projemiz...](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk.gif)\
*İlk Azure projemiz...*

Projemizi yaratırken ASP.NET projesi için proje çeşidi olarak doğrudan
"Empty"yi seçerseniz boş, tertemiz bir sitemiz olacak. Hemen taze bir
ASPX ekleyip içine de klasik :) "Hello World" yazabiliriz. Böylece
minimalist bir ASP.NET sitemiz olmuş olacak.

![Basit bir Cloud
projesi.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk2.gif)\
*Basit bir Cloud projesi.*

Dikkat ederseniz WebRole.Cs ile Web.Config'i silmedim. Konsept olarak
onları bırakmakta fayda var :) Web.Config'in içi zaten Empty site
seçtiğimiz için süper temiz durumda.

**[web.config]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;"> </span><span
style="color:red;">encoding</span><span
style="color:blue;">=</span>"<span
style="color:blue;">utf-8</span>"<span style="color:blue;">?\></span>\
<span style="color:blue;">\<!--</span>\
<span
style="color:green;">  For more information on how to configure your ASP.NET application, please visit</span>\
<span
style="color:green;">  http://go.microsoft.com/fwlink/?LinkId=169433</span>\
<span style="color:green;">  </span><span
style="color:blue;">--\></span>\
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
                   
Microsoft.WindowsAzure.Diagnostics, Version=2.2.0.0, Culture=neutral, \
                    PublicKeyToken=31bf3856ad364e35</span>"\
<span style="color:blue;">          </span><span
style="color:red;">name</span><span style="color:blue;">=</span>"<span
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
style="color:#a31515;">system.web</span><span
style="color:blue;">\></span>\
<span style="color:blue;">    \<</span><span
style="color:#a31515;">compilation</span><span
style="color:blue;"> </span><span style="color:red;">debug</span><span
style="color:blue;">=</span>"<span style="color:blue;">true</span>"<span
style="color:blue;"> </span><span
style="color:red;">targetFramework</span><span
style="color:blue;">=</span>"<span style="color:blue;">4.5</span>"<span
style="color:blue;"> /\></span>\
<span style="color:blue;">    \<</span><span
style="color:#a31515;">httpRuntime</span><span
style="color:blue;"> </span><span
style="color:red;">targetFramework</span><span
style="color:blue;">=</span>"<span style="color:blue;">4.5</span>"<span
style="color:blue;"> /\></span>\
<span style="color:blue;">  \</</span><span
style="color:#a31515;">system.web</span><span
style="color:blue;">\></span>\
<span style="color:blue;">\</</span><span
style="color:#a31515;">configuration</span><span
style="color:blue;">\></span>

Artık default.aspx'in arkasındaki "Hello World" kısmını siz
halledersiniz :) Projemiz ilk ayarlarında tek instance ve small vm size
çalışacak şekilde geliyor. Şimdilik orada bir değişiklik yapmayacağız ve
hemen deployment'a geçeceğiz.

### Windows Azure hesabı edinmek

Windows Azure hesabı edinmek için basit bir
şekilde[windowsazure.com](http://www.windowsazure.com) adresine gitmeniz
gerekiyor. Buradan yeni bir hesap edinebilirsiniz veya deneme hesabını
da[buradan](http://www.windowsazure.com/tr-tr/pricing/free-trial/)
alabilirsiniz. İlk seçenekte normal bir hesap aldığınız için doğal
olarak kullandığınız kaynakların ücreti kredi kartınızdan çekilecek.
Azure ortamında neye ne kadar para ödediğimiz konusunu <span
style="text-decoration: line-through;">ileride inceleyeceğiz</span> ([Bu
yazıya bakmak
isteyebilirsiniz.](http://daron.yondem.com/tr/post/blogumu_azure_a_tasidiktan_sonraki_maliyetler))
fakat şimdilik kullandığınız sunucular için saat başına para ödediğinizi
bilmenzide fayda var. Eğer bir deneme hesabı aldıysanız yine sizden
kredi kartı bilgileriniz alınacak fakat deneme süresi bitene kadar
kesinlikle kartınızdan para çekilmeyecek. Eğer deneme hesabının
limitlerine gelirseniz o ay için deneme hesabınızdaki kaynaklar
kapatılacak. Bir sonraki ayda tekrar açılarak deneme hesabı limitlerinde
azure hizmetlerini tekrar kullanabilir hale geleceksiniz fakat bu
süreçte hiçbir zaman kredi kartınızdan para çekilmeyecek. Deneme
hesapları için kredi kartı bilgisi alınmasının birinci nedeni spam
deneme hesabı alınmasını engellemek ikincisi ise deneme dönemi bittikten
sonra kullanılan kaynakların ödemesini alabilmek.

Azure hesabınızı edindikten sonra yönetim paneli için sürekli ziyaret
edeceğiniz adres ise <https://manage.windowsazure.com/> şeklinde olacak.
Gelin HelloWorld projesini bu portal üzerinden azure'a yükleyelim.

### Azure uygulamamızı paketlemek.

Azure projemiz ve hesabımız artık hazır olduğuna göre hemen Visual
Studio'da Solution Explorer içerisinde Azure projesine sağ tıklayıp
"Package" komutunu verebiliriz.

![Azure Package
yaratırken.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk3.gif)\
*Azure Package yaratırken.*

Bir sonraki adımda karşınıza çıkacak soru paket yaratırken service
configuration olarak Cloud.cscfg veya Local.cscfg'nin kullanımı vey
Release veya Debug Build kullanılıp kullanılmayacağı şeklinde olacak.
Genel olarak tabi ki Cloud.cscfg'yi ve Release build konfigürasyonunu
kullanacağız.

![Azure paketimiz
hazır.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk4.gif)\
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

Hemen <https://manage.windowsazure.com/> adresine gidip LiveID'miz ile
giriş yaparak yönetim paneline ulaşıyoruz.

![Azure Yönetim
Paneli](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk5.gif)\
*Azure Yönetim Paneli*

Panelin sol altında farklı Azure servislerinin kaba bir listesini
görebilirsiniz. İşte bu listeden panelin farklı bölümlerine geçerek
işlemlerimizi yapabiliyoruz. Hemen sol alttan "Cloud Services"
seçeneğini seçerek ilerleyeceğiz.

![Azure ortamında clouse servisimizi
yaratırken.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk6.gif)\
*Azure ortamında clouse servisimizi yaratırken.*

Hemen ekranın en altında kocaman bir artı düğmesi göreceksiniz. Ona
bastığınız anda karşınıza yeni servis yaratmak sihirbazı gelecek.
Buradan "Compute"ü seçip "Cloud Service" diyerek devam edeceğiz.
Sonrasında "Quick Create" diyerek servisimize bir isim vermemiz
gerekiyor. Bu isim aynı anda servisin web adresi olacak. Bu adresi
isterseniz kendi DNS sunucunuz üzerinden yönlendirmelerle sonradan
özelleştirebilirsiniz. O nedenle çok kritik bir seçim değil açıkçası.
Ekranda göreceğiniz seçeneklerden biri de "Region or Affinity Group"
seçeneği olacak. Burada servisinizin barındırılmasını istediğiniz Azure
Data Center'ınızı seçebilirsiniz. "Affinity Groups" olayına sonraki
yazılarda göz atacağız.

Yeni "Cloud Service"inizi oluşturduktan sonra hemen karşınıza gelecek
olan listeden onu seçip üstten "Dashboard"'a tıklarsanız ana ekrana
ulaşmış olacağız.

![İlk Hosted
Service'imiz.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk7.gif)\
*İlk Cloud Service'imizi yüklerken.*

Yukarıda da görebileceğiniz üzere doğrudan "Upload a new production
deployment" komutu karşımıza geldi bile. Staging / Production tercihi
şimdilik tamamen size kalmış. Sonuç olarak "Hello World!" için Unit Test
de yazmadık :P Şaka bir yana Staging / Production vs farklı
Environment'lar tabi ki kritik ama şimdilik örneği basit tutmak adına
istediğiniz şekilde takılabilirsiniz. Unutmayın ki Staging deployment
yaparsanız başta rezerve ettiğiniz adrese değil size verilecek farklı
bir adrese deployment yapmış olacaksınız. Zaten Staging ve Prod'un aynı
adreste olmasını da beklemiyordunuz değil mi? Aynen öyle :)

![Servisimizi
yüklerken...](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk8.gif)\
*Servisimizi yüklerken...*

Deployment yaparken bir "Deployment Label" vermenin yanı sıra tabi ki
paketi ve config dosyasını vermemiz gerekiyor. Eğer bu dosyaları daha
önce bir Storage Account'u attıysanız oradan da seçebilirsiniz. Şimdi
tabi soracaksınız "Storage Account" da nesi? diye. Daha o konulara
gelmedik. İleriki yazılarda ona da bakacağız. Ama deployment öncesi bir
storage account kullanmanın avantajı deploy ettiğiniz her paketin
aslında birer kopyasını da cloud ortamında saklıyor olmanız olacak.
Böylece rollback deployment gerektiğinde işler çok daha pratik olacak.
Tabi tüm bunlar TFSLive ile Continious Integration (CI) kullanıyorsanız
hiç uğraşmadan sahip olacağınız şeyler olacak. Çok ilerilere uçtuk. Geri
dönüp en ilkel hali ile bir şu deployment'ı bitirelim. Son olarak iki
tane daha seçenek var bu ekranda. Birincisi "Deployment'ı hemen başlat"
seçeneği. Paketleri yükleyip sonra deployment da yapabilirsiniz. Ayrıca
bizim örneğimizde de olduğu gibi eğer Role'lerinizin tek instance ise
ekrandaki "Deploy even" diye başlayan seçeneği de işaretlemeniz gerek ki
SLA'den vaz geçtiğinizi kabul etmiş olun. Malum eğer bir Role iki
instance değilse Azure SLA vermiyor Uptime için. Bu durumu bildiğinizi
ve bile bile tek instance deployment yaptığınızı belirtmeniz gerekiyor. 
Şimdi gönül rahatlığı ile "OK"e basın ve süreci panelden izleyin :)
Upload dahil sunucuların provisioningi toplam 10 dakikayı bulacaktır. Bu
süreçte FC Azure DataCenter'ında istediğimiz şartlara uygun boş yer
bulacak, VM'leri dağıtacak, ayağa kaldıracak, load balancer'a haber
verecek vs vs vs :)

![Paket upload
olurken...](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk9.gif)\
*Paket upload olurken...*

Upload işlemi bittikten sonra sonra servisinize role sayısına ve
instance sayısına göre sunucuların hazırlanması 5 ile 15 dakika arasında
sürebiliyor. Süreci doğrudan yönetim panelinden izleyebilirsiniz. İşlem
tam başladığında aşağıdaki gibi bir ekran çıkacak karşınıza.

![Deployment işleri
başlar...](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk10.gif)

Buradaki "1 Instance" yazısına tıklarsanız tüm deploymentı detayları ile
izleyebilirsiniz. Aşağıda deployment adımlarını görebilirsiniz.

![Staging için verilen
adres.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk11.gif)

Herşey hazır olduktan sonra servisinizin "Dashboard" sayfasına geçip tüm
detayları ve Endpoint'ini görebilirsiniz.

![Deployment sonrası service'in
detayları.](media/Windows_Azure_da_ilk_projemiz_ve_deployment_SDK2_2/ilk12.gif)\
*Deployment sonrası service'in detayları.*

İtiraf ediyorum :) tüm bu deployment senaryosunu kolaylaştırmanın bir
yolu var :) ama bire bur bu senaryoyu görmek de bence çok önemli. Neyin
ne olduğunu anlamak ve yönetim paneli ile azure paketimiz arasında
ilişki bence kritik. İleriki yazılarda farklı konulara da bakarken
Visual Studio içerisinden doğrudan Publish senaryolarına göz atacağız ;)
Şimdiden merak edenler [Teknolot.TV'deki seminer
kaydına](http://www.teknolot.tv/visual-studio-2013-ile-beraber-gelen-azure-ve-xaml-yenilikleri/)
(Veya
[YouTube](http://www.youtube.com/watch?feature=player_embedded&v=G0aqWKZz7bY))
göz atabilirler.

Görüşmek üzere.


