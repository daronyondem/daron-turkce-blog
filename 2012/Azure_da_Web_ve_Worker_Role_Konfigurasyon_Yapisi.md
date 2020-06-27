# Azure'da Web ve Worker Role Konfigürasyon Yapısı
**[Aşağıdaki makalenin SDK2.2 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/tr/post/Azure_Web_Worker_Role_Konfigurasyon_Yapisi_SDK2_2)
bulabilirsiniz.]**

Azure'da bir web veya worker role yarattığınız gibi Solution Explorer
içerisindeki Azure projesinin altında Roles klasöründe role kendini
gösterir. Peki Azure projesi içerisindeki bu diğer dosyaların anlamı ne?
İşte şimdi bu soruyu cevaplayacağız :)

![Solution Explorer'daki config dosyaları bize
bakıyor...](media/Azure_da_Web_ve_Worker_Role_Konfigurasyon_Yapisi/config.jpg)\
*Solution Explorer'daki config dosyaları bize bakıyor...*

Azure projenizi yarattığınız anda hemen bir csdef ve iki cscfg dosyası
oluşturulacaktır. Şimdiden söyliyim :) buradaki CS'ler C\# değil :) Yani
VB ile proje yarattığınız vbdef falan olmuyor :) Buradaki CS'ler "Cloud
Service" anlamına geliyor.

**[ServiceDefiniton.csdef]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;"> </span><span
style="color:red;">encoding</span><span
style="color:blue;">=</span>"<span
style="color:blue;">utf-8</span>"<span style="color:blue;">?\></span>\
 <span style="color:blue;">\<</span><span
style="color:#a31515;">ServiceDefinition</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">WindowsAzureProject1</span>"<span
style="color:blue;"> </span><span style="color:red;">\
    xmlns</span><span style="color:blue;">=</span>"<span
style="color:blue;">http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceDefinition</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">WebRole</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">OrnekWebRole</span>"<span
style="color:blue;"> </span><span style="color:red;">vmsize</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Small</span>"<span style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Sites</span><span style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">Site</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span style="color:blue;">Web</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">Bindings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">          \<</span><span
style="color:#a31515;">Binding</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Endpoint1</span>"<span
style="color:blue;"> </span><span
style="color:red;">endpointName</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Endpoint1</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">        \</</span><span
style="color:#a31515;">Bindings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">Site</span><span style="color:blue;">\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">Sites</span><span style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Endpoints</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">InputEndpoint</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Endpoint1</span>"<span
style="color:blue;"> </span><span
style="color:red;">protocol</span><span
style="color:blue;">=</span>"<span style="color:blue;">http</span>"<span
style="color:blue;"> </span><span style="color:red;">port</span><span
style="color:blue;">=</span>"<span style="color:blue;">80</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">Endpoints</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Imports</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">Import</span><span
style="color:blue;"> </span><span
style="color:red;">moduleName</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Diagnostics</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">Imports</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">WebRole</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">ServiceDefinition</span><span
style="color:blue;">\></span>

Cloud çözümümüzde şu anda tek bir web role olduğunu düşünerek yukarıdaki
CSDEF dosyasına baktığımızda ilk bakışta http80 üzerinden bir Endpoint
olduğunu görebiliyoruz. CSDEF dosyasının açılımı "Cloud Service
Definition" yani servisin ana yapısını tanımlayan bir dosyadan
bahsediyoruz. O nedenle Endpoint'lerin burada listelenmesi çok mantıklı.
Bunlar servisi tanımlayan ana öğeler, konfigürasyon değiller. XML
içerisindeki dikkat etmemiz gereken ufak bir detay daha var, o da :
**vmsize=Small** kısmı! Daha önceki yazılarda da bahsetmiştik Azure
ortamında projenizi yayınlarken web role'ünüzü istediğiniz kadar sunucu
/ instance'a yayabilirsiniz ama bunu yaparken her bir instance'ın
boyutunu da belirlemeniz gerekiyor.

  ------------- ------------------- --------------- ----------------------
  **Boyut**     **CPU Sayısı**      **Disk (GB)**   **Bandwidth (Mbps)**
  ExtraSmall    Paylaşımlı (1Ghz)   20              5
  Small         1                   165             100
  Medium        2                   340             200
  Large         4                   850             400
  Extra Large   8                   1890            800
  ------------- ------------------- --------------- ----------------------

Yukarıdaki tablodu güncel Instance Size bilgilerini bulabilirsiniz.
Ayrıca daha detaylı bilgi için de Microsoft'un
[buradaki](http://go.microsoft.com/fwlink/?LinkId=164387) sitesini
inceleyebilirsiniz. Özetle :) kaç instance alırken instance size'ı da
vermeniz gerekiyor ve bu bilgi CSDEF'de bulunuyor.

**[ServiceConfiguration.cscfg]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;"> </span><span
style="color:red;">encoding</span><span
style="color:blue;">=</span>"<span
style="color:blue;">utf-8</span>"<span style="color:blue;">?\></span>\
 <span style="color:blue;">\<</span><span
style="color:#a31515;">ServiceConfiguration</span><span
style="color:blue;"> </span><span
style="color:red;">serviceName</span><span
style="color:blue;">=</span>"<span
style="color:blue;">WindowsAzureProject1</span>"<span
style="color:blue;"> </span><span style="color:red;">\
    xmlns</span><span style="color:blue;">=</span>"[<span
style="color:blue;">http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration</span>](http://schemas.microsoft.com/ServiceHosting/2008/10/ServiceConfiguration)"<span
style="color:blue;"> </span><span style="color:red;">\
    osFamily</span><span style="color:blue;">=</span>"<span
style="color:blue;">1</span>"<span style="color:blue;"> </span><span
style="color:red;">osVersion</span><span
style="color:blue;">=</span>"<span style="color:blue;">\*</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">Role</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">OrnekWebRole</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Instances</span><span
style="color:blue;"> </span><span style="color:red;">count</span><span
style="color:blue;">=</span>"<span style="color:blue;">1</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">Setting</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString</span>"<span
style="color:blue;"> \
            </span><span style="color:red;">value</span><span
style="color:blue;">=</span>"<span
style="color:blue;">UseDevelopmentStorage=true</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">Role</span><span style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">ServiceConfiguration</span><span
style="color:blue;">\></span>

CSCGF dosyalarının açılımı Cloud Service Configuration şeklinde. Bu
dosyalardan varsayılan ayarlarda iki tane geliyor. Böylece kendi
makinenizde test ederken local.cfg'yi azure'da deploy ederken de
cloud.cfg'yi kullanabiliyorsunuz. İsterseniz farklı staging cfg
dosyaları da yaratabilirsiniz.

Yukarıdaki XML dosyasında önemli olan birkaç nokta var. Birincisi
**Diagnostics** ile ilgili **connectionstring**. Diagnostic bilgisi eğer
ki kullanırsanız :) DiagnosticsAgent tarafından belirli aralıkla kalıcı
veri saklama alanlarına (yani storage hesaplarına) aktarılabiliyor.
Storage hesaplarının detaylarına ileride bakacağız. Storage hesaplarının
kendilerine özel bir connectionstring'leri oluyor aynı SQL gibi. Şu an
yukarıdaki XML'de gördüğünüz **UseDevelopmentStorage=true** connection
string değeri developer makinesindeki storage emülatörünü kullanacağımız
anlamına geliyor. Bu konunun detaylarına ileride bakacak olsak da
şimdilik konuyu bilmekte fayda var.

CSCFG dosyası içerisindeki bir diğer önemli şey ise .... <span
style="color: blue;">\<</span><span
style="color:#a31515;">Instances</span><span
style="color:blue;"> </span><span style="color:red;">count</span><span
style="color:blue;">=</span>"<span style="color:blue;">1</span>"<span
style="color:blue;"> /\> </span>kısmı...Tahmin edebileceğiniz üzere Role
başına kaç instance olacağı bilgisini buraya yazıyoruz. Şimdi tam da
burada değinmemiz gereken önemli bir nokta var. Dikkat ettiyseniz
Instance sayısını bir konfigürasyon olarak kabul edilirken instance size
doğrudan CSDEF'de servisin tanımında yazılıydı. Bu da şu sonucu ortaya
çıkarıyor :) Instance size değiştirmek isterseniz servisin yapısını
değiştirmiş oluyorsunuz ve tüm instance'ların restart'ı şart oluyor.
Instance size değiştirmek ise sadece konfigürasyon değişikliği olduğu
için total bir role restart gerekmiyor.

Genel yaklaşım olarak ek konfigürasyon bilgileri hep CSCFG dosyalarına
konur. Ama bunu yapabilmek için de öncesinde CSDEF'te söz konusu
konfigürasyonun varlığını tanımlamanız gerekir. Nasıl mı?

### Özel Konfigürasyonlar

Kendi özel konfigürasyon ayarlarınızı saklayabileceğiniz yerlerden biri
CSCGF dosyası. Bu dosya içerisindeki konfigürasyon değerleri saklamak
istiyorsanız ilk olarak CSDEF'te konfigürasyonun varlığını
tanımlamalısınız.

**[CSDEF]**

<span style="color: gray;">  \<WebRole name=</span>"<span
style="color: gray;">WebRole1</span>"<span
style="color: gray;"> vmsize=</span>"<span
style="color: gray;">Small</span>"<span style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">Setting</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">DataConnectionString</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color: gray;">    \<Sites\></span>\
 <span style="color: gray;">      \<Site name=</span>"<span
style="color: gray;">Web</span>"<span style="color: gray;">\></span>\
 <span style="color: gray;">        \<Bindings\></span>\
 <span style="color: gray;">          \<Binding name=</span>"<span
style="color: gray;">Endpoint1</span>"<span
style="color: gray;"> endpointName=</span>"<span
style="color: gray;">Endpoint1</span>"<span
style="color: gray;"> /\></span>\
 <span style="color: gray;">        \</Bindings\></span>\
 <span style="color: gray;">      \</Site\></span>\
 <span style="color: gray;">    \</Sites\></span>\
 <span style="color: gray;">    \<Endpoints\></span>\
 <span style="color: gray;">      \<InputEndpoint name=</span>"<span
style="color: gray;">Endpoint1</span>"<span
style="color: gray;"> protocol=</span>"<span
style="color: gray;">http</span>"<span
style="color: gray;"> port=</span>"<span
style="color: gray;">80</span>"<span style="color: gray;"> /\></span>\
 <span style="color: gray;">    \</Endpoints\></span>\
 <span style="color: gray;">    \<Imports\></span>\
 <span style="color: gray;">      \<Import moduleName=</span>"<span
style="color: gray;">Diagnostics</span>"<span
style="color: gray;"> /\></span>\
 <span style="color: gray;">    \</Imports\></span>\
 <span style="color: gray;">  \</WebRole</span><span
style="color:blue;">\></span>

Yukarıda gördüğünüz örnek CSDEF'de servisin tanımına yeni bir
konfigürasyon ihtiyacı eklemiş oluyoruz. Artık eğer bir CSCFG'de bu
konfigürasyona dair değer / girdi bulunmaz ise proje kesinlikle build
edilemeyecektir.

**[CSCFG]**

<span style="color:blue;">  \<</span><span
style="color:#a31515;">Role</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">WebRole1</span>"<span style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Instances</span><span
style="color:blue;"> </span><span style="color:red;">count</span><span
style="color:blue;">=</span>"<span style="color:blue;">1</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">Setting</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">DataConnectionString</span>"<span
style="color:blue;"> </span><span style="color:red;">value</span><span
style="color:blue;">=</span>"<span
style="color:blue;">UseDevelopmentStorage=true</span>"<span
style="color:blue;"> /\></span>\
 <span style="color: gray;">      \<Setting name=</span>"<span
style="color: gray;">Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString</span>"<span
style="color: gray;"> </span>\
 <span style="color:blue;"><span style="color: gray">       
</span></span><span style="color: gray;">value=</span>"<span
style="color: gray;">UseDevelopmentStorage=true</span>"<span
style="color: gray;"> /\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">ConfigurationSettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">Role</span><span style="color:blue;">\></span>

Aynı örneğin CSCFG kısmına baktığımızda ise eklediğimiz yeni
ConnectionString değerine yine DevelopmentStorage değerini verdiğimizi
görüyoruz. Bu gibi özel konfigürasyonları ister SQL connection string'i
için ister başka ayarlar için kullanın. Olayın özü bu konfigürasyon
dosyalarının uygulamadan tamamen ayrı tutulması ve konfigürasyondaki
değişikliklerin uygulamada bir restart etkisi yaratmaması. Ha :) tabi
eğer ki bir konfigürasyon değişikliği restart gerektiriyorsa onu da
sizin tetiklemeniz veya belki de uygulama içerisinden config'in değişip
değişmediğini takip edip gerekli uygulama içi değişiklikleri
tetiklemeniz gerekecektir.

**[C\# / WebRole.cs]**

<span
style="color:#2b91af;">RoleEnvironment</span>.Changing += RoleEnvironmentChanging;

WebRole.CS'de OnStart'da Role'ün Changing eventine bir listener
ataçlayıp değişiklikleri takip edebilir, onaylayabilir veya
reddedebilirsiniz.

**[C\#]**

<span style="color:blue;">private</span> <span
style="color:blue;">void</span> RoleEnvironmentChanging(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">RoleEnvironmentChangingEventArgs</span> e)\
 {\
    <span
style="color:blue;">if</span> (e.Changes.Any(change =\> change <span
style="color:blue;">is</span> <span
style="color:#2b91af;">RoleEnvironmentConfigurationSettingChange</span>))\
     {\
        e.Cancel = <span style="color:blue;">true</span>;\
    }\
}

Yukarıdaki kod ile değişikliğin bir konfigürasyon değişikliği olup
olmadığını kontrol edip kabul edip etmeyeceğimizi gibi kararları
verebiliyoruz.

**[C\#]**

<span
style="color:#2b91af;">RoleEnvironment</span>.Changed += (s, arg) =\>\
{\
     <span style="color:blue;">if</span> (arg.Changes.OfType\<<span
style="color:#2b91af;">RoleEnvironmentConfigurationSettingChange</span>\>()\

        .Any((change) =\> (change.ConfigurationSettingName == "BirAyar")))\
     {\
        <span style="color:blue;">if</span> (!configSetter(<span
style="color:#2b91af;">RoleEnvironment</span>.GetConfigurationSettingValue("BirAyar")))\
         {\
            <span
style="color:#2b91af;">RoleEnvironment</span>.RequestRecycle();\
         }\
    }\
}

Değişiklik olduktan sonra ise :) isterseniz yukarıdaki gibi değişikliğin
tipine göre farklı kararlar alabilirsiniz. Konfigürasyonlarla ilgili
farklı senaryolarla ileride farklı konuları incelediğimizde
karşılaşacağız. Şu an için tüm senaryoların üzerinden geçmek maalesef
mümkün değil.

### Peki bunun kolay yolu yok mu?

:) Bir yere kadar var. Azure projesi içerisinde Roles klasöründen
herhangi bir Role'e çift tıklarsanız karşınıza tam da yukarıda
bahsettiğimiz ayarların bazılarını düzenleyebilmenizi sağlayacak bir GUI
gelecektir.

![Visual Studio içerisinden
konfigürasyonlar.](media/Azure_da_Web_ve_Worker_Role_Konfigurasyon_Yapisi/config2.jpg)\
*Visual Studio içerisinden konfigürasyonlar.*

Yukarıdaki ekran görüntüsünde gördüklerimize hızlıca göz atalım. Bazları
zaten eminim ki tanıdık gelecektir konfigürasyon dosyalarından :)

### Full Trust / Partial Trust

Bu hikaye ilginç bir hikayedir :) Şimdi zaten varsayılan ayarlardan Full
Trust geliyorda "Partial Trust" neden var ki? diyebilirsiniz. Aslında
hikayeye Adem ile Havva'dan başlamak gerek :) Azure'un ilk zamanları...
:) Daha Full Trust yok :) Şaka değil... Önceki yazılarda hep bahsettik,
eğer bir WebRole alırsanız IIS var, Worker Role alırsanız yok dedik.
Aslında verdiğim bilgi tam olarak doğru değildi :) Azure'un ilk
zamanlarında hem Web hem Worker Role'lerde IIS yoktu. Onun yerine
Microsoft tarafından sadece Azure için geliştirilmiş özel bir IIS Hosted
Web Core içeren bir sunucu uygulaması vardı. Bu uygulamanın
geliştirilmesindeki mantık FC Guest Agent ile IIS arasındaki iletişimi
optimize etmek ve bu ikiliyi birbirine biraz daha yaklaştırmaktı. Fakat
sonra insanlar IIS'in diğer özelliklerini istedikçe ve IIS Hosted Web
Core full bir IIS desteği veremeyince Microsoft da "Full Trust" diye
birşey çıkardı. Bu modda full IIS'iniz var ve makine üzerinde de her tür
scripting hakkına sahipsiniz. Yani kod ile gidip IIS'e yeni bir http
header vs ekleyebilirsiniz. İşte Full Trust ile Partial Trust arasındaki
büyük farklılık bu ve default ayarlarda Full Trust geldiği için ben şu
anda merak ediyorum kaç proje Partial Trust kullanıyor diye :) Bilmem
mesajı doğru verebildim mi :)

### Instance Count / VM Size

Sanırım bunlarla ilgili yeterine konuştuk. Daha fazla konuyu uzatmanın
lüzumu yok :) Endpoint'leri de aynı şekilde direk geçeceğim. Hatta aynı
şeyi Diagnostics için de yapıp konfigürasyon kısmını bitirdik diyeceğim
:) Eğer konfigürasyon sayfasında "Settings" tabına geçerseniz oradan da
ConnectionString gibi ayarları yapabildiğinizi görebilirsiniz. Endpoints
tabında da eğer isterseniz özel endpointler tanımlanabilir. Örneğin bir
worker role'ün http80 endpointi olmasa ,IIS'i olmasa da aslında gidip
http80 endpointi ayarlayabilir ve belki de kendi datanızı stream
edebilirsiniz :) Kulağa ilginç geliyor değil mi?

Konfigürasyon sayfasında diğer tablarla ilgili ilerleyen zamanlarda yeri
geldikçe apayrı yazılar yazacağım için şimdilik oralara bulaşmıyorum ;)
Bir sonraki yazıda görüşmek üzere!

Kendinize çok iyi bakın.



*Bu yazi http://daron.yondem.com adresinde, 2012-4-10 tarihinde yayinlanmistir.*
