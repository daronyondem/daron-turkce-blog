---
FallbackID: 2708
Title: Live Connect ile SkyDrive'a programatik file upload
PublishDate: 24/9/2011
EntryID: Live_Connect_ile_SkyDrivea_programatik_fileupload
IsActive: True
Section: software
MinutesSpent: 0
Tags: live.com, SkyDrive, WPF
---
Build konferansında SkyDrive'a ait yeni API'lerin açılacağı ve Beta
olarak sunulduğu duyurusunun yapıldığı anda hemen aklımda kenara not
almıştım, "Ben bu işe bir bakiyim" diye :) SkyDrive malum kullanıcı
başına 25GB alan veriyor ve bu çoğu senaryoda özellikle free cloud
storage anlamına gelip güzel bir back-up lokasyonu olabiliyor. Özellikle
geliştirdiğiniz son kullanıcı ürünlerinde backup işlevselliği için çok
uygun bir seçenek.

### Örnek senaryo

Şimdi varsayalım ki elimizde bir CMS (Content Management System) var.
Bunu müşterilerimize satıyoruz. CMS'in kendi iç backup sistemi,
scheduler'ı vs olacaktır. Fakat genelde bu backuplar hep CMS'in
bulunduğu sunucuda tutulur ki bu aşırı mantıklı sayılmaz :) Yani
sunucunun başına birşey gelse backuplar da gider. Backup'ları alıp
scheduled bir şekilde başka bir sunucuya göndermek akıllıca olur ama bu
sefer de sunucu masrafları artar, entegrasyon sorunlu olabilir vs vs...

Tüm bu sorunları çözmek adına CMS yönetim panelinde bir bölüm tanımlayıp
backup için kullanıcıların LiveID'leri ile SkyDrive hesaplarını CMS'e
bağlamalarını isteyebilirsiniz. Böylece CMS artık istediği zaman söz
konusu SkyDrive hesabına bağlanığ backupları kopyalar ve herhangi bir
sorun olduğunda cloud'da backupımız olduğunu biliriz.

### Peki nasıl yapacağız tüm bunları?

SkyDrive'ın yeni SDK'sı ile beraber Windows 8 Metro ve WP7 için bazı
yardımcı kütüphaneler geliyor fakat ben bu kütüphaneleri pek beğenmedim
şu anda. O nedenle direk REST API'leri sağlayan SkyDrive'ın API'lerin
doğrudan ulaşacağız. Ben örnek boyunca bir WPF uygulaması kullanacağım
fakat bunu platform spesifik pek birşey kullanmayacağım için ister
Metro, ister WP7 tarafına da geçirebilirsiniz.

### Live Connect API için Application Tanımı

SkyDrive ile konuşmak için Live Connect API'lerini kullanacağız.
Hazırlayacağımız uygulamanın SkyDrive ve LiveConnect sisteminde tanımlı
olması lazım ki API'lere ulaşıp, kullanabilelim. Bunun için hemen
<http://go.microsoft.com/fwlink/?LinkId=193157> adresini ziyaret
edebilirsiniz.

![Uygulamamızı Live Connect için
tanımlarken...](media/Live_Connect_ile_SkyDrivea_programatik_fileupload/skydrive1.png)\
*Uygulamamızı Live Connect için tanımlarken...*

Siteye gittiğinizde ilk yapmanız gereken uygulamanızı bir isim verip
dilini seçmek. Dil kısmı çok kritik değil nitekim uygulama adı da çok
kritik değil ama özellikle uygulama adı daha sonraları kullanıcılarınız
kendi LiveID'leri ile uygulamanızı bağlarken gösterilecek isim olacak.
Bu adımın hemen sonrasında size ClientID ve Secret Key verilecektir.

![ClientID'miz ve Secret Key'imiz
karşımızda.](media/Live_Connect_ile_SkyDrivea_programatik_fileupload/skydrive2.png)\
*ClientID'miz ve Secret Key'imiz karşımızda.*

Client ID ve Secret Key çok önemli. Uygulamanız REST API'lerini
kullanırken bunlara ihtiyaç duyacak. Bir anlamda bu bilgiler
uygulamamızın içine gömülü olacak.

![Mobile App seçeneği çok
kritik.](media/Live_Connect_ile_SkyDrivea_programatik_fileupload/skydrive3.png)\
*Mobile App seçeneği çok kritik.*

Web sitesinden çıkmadan son olarak yapmamız gereken bir ayar daha var.
Hemen**API Settings** bölümüne geçip "**Mobile client app**" seçeneğini
"**Yes**" olarak değiştirmeniz gerek. Web uygulamalarında bir redirect
domain sayfası kullanılarak Login sonrası bu adrese yönlendirme
yapılması sağlanabiliyor ama bizimki bir web uygulaması olmadığı için
biz böyle özel bir yönlendirme istemiyoruz.

### Login ile SkyDrive erişim haklarını almak

LiveID'si olan bir kullanıcının SkyDrive erişim haklarını almak için
kesinlikle tarayıcı bazlı bir platform yaratmamız şart. Eğer bir ASP.NET
sitesi ise doğrudan SkyDrive login sayfasına yönlendirip bir önceki
adımda belirtlemediğimiz "Redirect Domain" bilgisini de sitenizin
adresini yazıp konuyu çözebilirsiniz. Eğer bir WPF/Windows uygulaması
yazıyorsanız WebBrowser componenti ile kullanıcıya SkyDrive Login
sayfasını göstermemiz gerek. Bu işlemi kullanıcının sadece bir defa
yapması yeterli olacak. Sonrasında biz artık istediğimiz zaman söz
konusu kullanıcının SkyDrive'ına ulaşabileceğiz.

**[VB]**

    <span style="color:blue;">Private</span> ClientID <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = <span
style="color:#a31515;">"000XXXXXXXXXXXXXXX03C"</span>\
    <span style="color:blue;">Private</span> ClientSecret <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = <span
style="color:#a31515;">"9dAkN6XXXXXXXXXXXXXXXXXXXXXeCnRI"</span>

İlk olarak sürekli kullanacağımız **ClientID** ve **ClientSecret'ı**
birer değişken olarak tutalım. Aslında bunları birer uygulama ayarı
olarak da saklayabilirsiniz. Karar sizin. (Aslında değişken olmalarına
da gerek yok :))

**[VB]**

  Browser.Navigate(<span style="color:blue;">String</span>.Format(<span
style="color:#a31515;">"https://oauth.live.com/authorize?"</span> &\
                               <span
style="color:#a31515;">"client\_id={0}&scope=wl.offline\_access"</span> &\
                               <span
style="color:#a31515;">"%20wl.skydrive%20wl.skydrive\_update&"</span> &\
                               <span
style="color:#a31515;">"response\_type=code&redirect\_uri="</span> &\
                               <span
style="color:#a31515;">"https://oauth.live.com/desktop"</span>, ClientID))

Uygulamamızın ekranında bir WebBrowser componentini Browser adı ile
bulundurduğumuzu düşünürsek :) yukarıdaki kod ile kullanıcıyı SkyDrive
Login sayfasına yönlendirebiliyoruz. Yönlendirme URL'imiz içerisinde
bazı parametreler dikkatinizi çekecektir. Bunlardan ilki tabi ki klasik
ClientID'miz :) İkinci parametre ise **scope** bilgisi. Scope bilgisi
ile kullanıcıdan ne tür haklar istediğimizi belirtebiliyoruz. Burada
özellikle <span style="color:#a31515;">wl.offline\_access</span> çok
önemli. Offline erişim istemezseniz her seferinde kullanıcıya login
yaptırmak zorunda kalırsınız. Eğer her seferinde kullanıcı login olmak
zorunda olmasın ve biz de kafamıza göre tekrar sonrasında kullanıcının
SkyDrive'ına ulaşabilelim istiyorsak kesinlikle offline access hakkı
istememiz gerek. Örneğimizde istediğimiz diğer haklar **wl.skydrive** ve
**wl.skydrive\_update** ise kullanıcının skydrive'ını okuma ve yazma
hakları ile ilgili. Live Connect API'leri aslında kullanıcının
takviminden tutun, kontaklarına kadar farklı şeylere ulaşmak için
kullanılabiliyor. Biz sadece SkyDrive'a ulaşacağımız için bu hakları
istiyoruz. Scope'lar konusunda diğer hakların bir
listesine[buradan](http://go.microsoft.com/fwlink/?LinkId=220012)
ulaşabilirsiniz.

![Kullanıcı SkyDrive'a login oluyor bize izin vermek
için.](media/Live_Connect_ile_SkyDrivea_programatik_fileupload/skydrive4.png)\
*Kullanıcı SkyDrive'a login oluyor bize izin vermek için.*

Kullanıcı bizim yönlendirdiğimiz URL ile login olduktan sonra karşısına
aşağıdaki gibi bir ekranda istediğimiz hakların listesi ve hangi
uygulamanın istediği bilgisi gösteriliyor. Kullanıcı bu haklara onay
verdiği gibi artık top bizde olacak.

![Kullanıcıya vereceği haklar
soruluyoru.](media/Live_Connect_ile_SkyDrivea_programatik_fileupload/skydrive5.png)\
*Kullanıcıya vereceği haklar soruluyoru.*

Haklar da gördüğünüz üzere birincisi "**Access your info anytime**"
hakkı var :) Yani istediğimiz zaman bu skydrive'a ulaşabilmek istiyoruz.
İkincisi ve üçüncüsü ise direk SkyDrive ile ilgili. SkyDrive'daki
fotoğraflardan tutun tüm dosyalara kadar ulaşabilir ve üçüncü hakka göre
de düzenleme yapabiliriz.

Kullanıcı bu ekranda "Yes" dedikten sonra artık SkyDrive sitesinin bize
haber vermesi gerek. Biz herhangi bir redirection tanımlamadık. O
nedenle doğrudan **https://oauth.live.com/desktop?code=XXXX** diye bir
sayfaya yönlendirme yapılacak. Bu sayfaya yapılan yönlendirmenin**code**
parametresi ile gidip REST API'lerden erişim anahtarı (access token)
isteyeceğiz.

Aşağıdaki minik kod ile WebBrowser componentinin Navigated eventini
dinliyor ve eğer bizim istediğimiz sayfaya bir yönlendirme varsa
**QueryString** üzerinden **Code** bilgisini alıp "access token" isteme
işlemini başlatıyoruz.

**[VB]**

    <span style="color:blue;">Private</span> <span
style="color:blue;">Sub</span> Browser\_Navigated(sender <span
style="color:blue;">As</span> <span
style="color:blue;">Object</span>, e <span
style="color:blue;">As</span> <span
style="color:#2b91af;">NavigationEventArgs</span>)\
                                                                 <span
style="color:blue;">Handles</span> Browser.Navigated\
        <span
style="color:blue;">If</span> e.Uri.ToString.StartsWith(<span
style="color:#a31515;">"https://oauth.live.com/desktop?code"</span>) <span
style="color:blue;">Then</span>\
            <span style="color:blue;">Dim</span> Code = System.Web.<span
style="color:#2b91af;">HttpUtility</span>.ParseQueryString(e.Uri.Query).Get(<span
style="color:#a31515;">"code"</span>)\
            Web.DownloadStringAsync(<span
style="color:blue;">New</span> <span style="color:#2b91af;">Uri</span>(\
                 <span style="color:blue;">String</span>.Format(<span
style="color:#a31515;">"https://oauth.live.com/token?"</span> &\
                               <span
style="color:#a31515;">"client\_id={0}&redirect\_uri="</span> &\
                               <span
style="color:#a31515;">"https://oauth.live.com/desktop&code={1}&"</span> &\
                               <span
style="color:#a31515;">"grant\_type=authorization\_code"</span>,\
                               ClientID, Code)), <span
style="color:#a31515;">"gettoken"</span>)\
        <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
    <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

Access Token istemek için oauth.live.com'a bir GET atmamız gerekiyor :)
Yukarıda **Web** adında gördüğünüz değişken basir bir **WebClient**
nesnesi. Bu GET ile beraber de **ClientID'mizi**, redirecturi olarak
desktop uygulamalarının default kullanması gereken desktop URL'ini ve
code kısmına da biraz önce aldığımız **Code** bilgisini veriyoruz.
Grant\_Type olarak bir authorization\_code istediğimizi de belirtip
talebi başlatıyoruz. Ben ek olarak Context olsun diye "gettoken"
contexti yolladım ama itiraf etmek gerekirse gereksiz oldu :) Aynı
WebClient'ı kullanarak birkaç talep göndermek gerekir diye düşündüm ama
gerekmedi :) Neyse, belki size lazım olursa Context üzerinden ayrıştırma
şansınız olur.

**[VB]**

    <span style="color:blue;">Private</span> <span
style="color:blue;">Sub</span> Web\_DownloadStringCompleted(sender <span
style="color:blue;">As</span> <span style="color:blue;">Object</span>, \
                e <span style="color:blue;">As</span> <span
style="color:#2b91af;">DownloadStringCompletedEventArgs</span>) <span
style="color:blue;">Handles</span> Web.DownloadStringCompleted\
        <span style="color:blue;">If</span> e.UserState = <span
style="color:#a31515;">"gettoken"</span> <span
style="color:blue;">Or</span> e.UserState = <span
style="color:#a31515;">"refreshtoken"</span> <span
style="color:blue;">Then</span>\
            <span style="color:blue;">Dim</span> jss = <span
style="color:blue;">New</span> System.Web.Script.Serialization.<span
style="color:#2b91af;">JavaScriptSerializer</span>\
            <span
style="color:blue;">Dim</span> found = jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">String</span>))(e.Result)\
            refresh\_token = found(<span
style="color:#a31515;">"refresh\_token"</span>)\
            access\_token = found(<span
style="color:#a31515;">"access\_token"</span>)\
            upload\_location = (jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)) \_\
                               (Web.DownloadString(<span
style="color:blue;">String</span>.Format( \_\
                  <span
style="color:#a31515;">"{0}/me/skydrive?access\_token={1}"</span>, APIBase, access\_token)))) \_\
                    (<span
style="color:#a31515;">"upload\_location"</span>)\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.access\_token = access\_token\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.upload\_location = upload\_location\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.refresh\_token = refresh\_token\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.Save()\
\
            btn.IsEnabled = <span style="color:blue;">True</span>\
        <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
    <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

Yukarıdaki kodu okurken bir UserState kontrolü yaptığımı görüyorsunuz :)
Aslında gerek yok. Refreshtoken olayına biraz gireceğiz ama State
kontrolü yapmasam da olurmuş. Bir önceki adımda yaptığımız GET ile bize
bir JSON dönüyor. Bu JSON içerisinde **access\_token** (erişim anahtarı)
ve **refresh\_token** (yenileme anahtarı) geliyor. Access Token bizim
herhangi bir yere erişebilmek için ihtiyacımız olan anahtarın ta kendisi
fakat Access Token 3600 saniyede expire ediyor. Eğer yeni bir **Access
Token** gerekirse **Refresh Toke**n ile tekrar bir talep gönderip
yenisini alabiliyoruz. Unutmayın Refresh Token sadece Offline Erişim
istediğinizde sağlanır. (Ki biz de bunu yapmıştık. JSON'un deserialize
ettikten sonra tokenları ben hem değişkenlere hem de sonrasında WPF
uygulamamda ayrıca ayarladığım kullanıcı ayarlarına atıyorum. Buradaki
amaç aslında şu; WPF'in kullanıcı ayarlarına atıp veya belki de
veritabanına atıp **Access\_Token** ile **Refresh\_Token**'ı saklarsanız
uygulamanız kapanlıp açılsa aradan yıllar geçse bile :) tekrar bu
bilgiler ile kullanıcının SkyDrive'ına istediğiniz zaman
ulaşabilirsiniz.

### Bir Upload yapalım!

Benim tüm bu işlere girmemin nedeni upload yapmaktı :) O nedenle sizinle
upload örneğini paylaşacağım. Fakat upload dışında bu uygulamamız
SkyDrive'da artık her tür hareketi yapabilir, klasör yaratmak, silmek vs
herşey dahil. Detaylar için[Live
SDK](https://connect.microsoft.com/site1226/program7291)'ye buradan
ulaşabilirsiniz. Bu arada unutmadan şu an için kullandığımız bu API'ler
Beta! Ona göre hareket etmekte fayda var :)

Tam da Beta konusuna değinmişken biraz önce incelediğimiz kodun içindeki
garip "upload\_location" konusuna değinelim. Aslında gelin o satırı
tekrar bir sahneye alalım :) çünkü pek insan oğlunun okuyabileceği
şekilde yazmamışım!

**[VB]**

            upload\_location = (jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)) \_\
                               (Web.DownloadString(<span
style="color:blue;">String</span>.Format( \_\
                  <span
style="color:#a31515;">"{0}/me/skydrive?access\_token={1}"</span>, APIBase, access\_token)))) \_\
                    (<span
style="color:#a31515;">"upload\_location"</span>)

Şimdi birincisi belli ki benim bir yerlerde tanımlanmış upload\_location
diye bir değişkenim var ve bunu bir şekilde WebClient üzerinden
DownloadString ile bir GET yollayıp aldığım sonuca eşitliyorum. Hatta
arada JSON Deserialize bile var tek satırda oy oy oy :) Demiştim insan
okuyamaz diye :D Neyse konunun özeti şu; access\_token ve
refresh\_token'ı aldıktan sonra ben hemen bir GET daha yollayıp
SkyDrive'daki Root klasörün upload path'ini alıyorum. Bunun için bu
oauth.live.com'a değil de APIBase diye değişkendeki adrese talep
gönderdiğimi umarım farkına varabilmişsinizdir :) String.Format'taki ilk
parametre :)

**[VB]**

    <span style="color:blue;">Dim</span> APIBase <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = <span
style="color:#a31515;">"https://beta.apis.live.net/v5.0"</span> <span
style="color:green;">'https://apis.live.net/v5.0</span>

APIBase'i yukarıdaki şekilde "commenti dahil" tanımlamanızda fayda var
:) Bunun nedeni daha önce de bahsettiğim gibi Beta API'leri kullanacak
olmamız. Şu ana kadar yaptığımız herşey Live API'lerinin canlıda olan
API'leriydi. Şu an itibari ile Beta API'leri çağıracağız. Bu API'ler
yayına geçtiğinde tek yapmanız gereken commentli kısımdaki adresi
kullanmak, o kadar!

**VB]**

            upload\_location = (jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)) \_\
                               (Web.DownloadString(<span
style="color:blue;">String</span>.Format( \_\
                  <span
style="color:#a31515;">"{0}/me/skydrive?access\_token={1}"</span>, APIBase, access\_token)))) \_\
                    (<span
style="color:#a31515;">"upload\_location"</span>)

Bizim şu yukarıdaki GET'e geri dönersek :) /me/skydrive diyerek
skydrive'ın root klasörü ile ilgili bilgi istemiş oluyoruz. Tabi bu
arada access\_token'ı da yolluyoruz. Gelen bilginin içerisindeki
**upload\_location** bu klasöre upload yapmak istediğimiz PUT talebimizi
göndereceğimiz yer. 

**[VB]**

    <span style="color:blue;">Sub</span> Upload(FilePath <span
style="color:blue;">As</span> <span style="color:blue;">String</span>)\
        <span style="color:blue;">Dim</span> filename <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = System.IO.<span
style="color:#2b91af;">Path</span>.GetFileName(FilePath)\
        <span style="color:#2b91af;">MessageBox</span>.Show(<span
style="color:#a31515;">"Başlıyor!!!"</span>)\
        Web.UploadData(<span
style="color:blue;">String</span>.Format(<span
style="color:#a31515;">"{2}/{0}?access\_token={1}"</span>,\
                                     filename, access\_token,\
                                     upload\_location), <span
style="color:#a31515;">"PUT"</span>,\
                                 ReadFile(FilePath))\
        <span style="color:#2b91af;">MessageBox</span>.Show(<span
style="color:#a31515;">"Bitti"</span>)\
    <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

Şimdi artık Upload işlemine geçebiliriz. Elimide Upload Location var,
access\_token var. Yukarıdaki metodu sistemdeki bir dosyanın Path'ini
verdiğim gibi upload\_location'ının sonuna dosya adını ve parametre
olarak da access\_token'ı ekleyip PUT işlemini başlatıyor.
MessageBox'ları siz silin bence :) Debug.WriteLine'dan daha çok
seviyorum ben onları çıkardıkları ses nedeniyle :P

Son olarak dosyayı byte arraye çeviren ReadFile metodumu da paylaşiyim.

**[VB]**

    <span style="color:blue;">Public</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Function</span> ReadFile(filePath <span
style="color:blue;">As</span> <span
style="color:blue;">String</span>) <span
style="color:blue;">As</span> <span style="color:blue;">Byte</span>()\
        <span style="color:blue;">Dim</span> buffer <span
style="color:blue;">As</span> <span style="color:blue;">Byte</span>()\
        <span style="color:blue;">Dim</span> fileStream <span
style="color:blue;">As</span> <span style="color:blue;">New</span> <span
style="color:#2b91af;">FileStream</span>(filePath, <span
style="color:#2b91af;">FileMode</span>.Open, <span
style="color:#2b91af;">FileAccess</span>.Read)\
        <span style="color:blue;">Try</span>\
            <span style="color:blue;">Dim</span> length <span
style="color:blue;">As</span> <span
style="color:blue;">Integer</span> = <span
style="color:blue;">CInt</span>(fileStream.Length)\
            buffer = <span style="color:blue;">New</span> <span
style="color:blue;">Byte</span>(length - 1) {}\
            <span style="color:blue;">Dim</span> count <span
style="color:blue;">As</span> <span style="color:blue;">Integer</span>\
            <span style="color:blue;">Dim</span> sum <span
style="color:blue;">As</span> <span
style="color:blue;">Integer</span> = 0\
            <span
style="color:blue;">While</span> (count = fileStream.Read(buffer, sum, length - sum)) \> 0\
                sum += count\
            <span style="color:blue;">End</span> <span
style="color:blue;">While</span>\
        <span style="color:blue;">Finally</span>\
            fileStream.Close()\
        <span style="color:blue;">End</span> <span
style="color:blue;">Try</span>\
        <span style="color:blue;">Return</span> buffer\
    <span style="color:blue;">End</span> <span
style="color:blue;">Function</span>

### Peki ya RefreshToken sonradan nasıl kullanılıyor?

Uygulamanızın bir önceki açılışında bir access\_token ve refresh\_token
aldığını (kullanıcının logini sonrasında) ve tekrar açıldığında da
bunlara devam etmesi gerektiğini düşünürsek aslında tek yapmamız gereken
hemen eldeki accees\_token ile refresh\_token'ı Live API'lere gönderip
yenisini istemek.

**[VB]**

  Web.DownloadStringAsync(<span style="color:blue;">New</span> <span
style="color:#2b91af;">Uri</span>(\
            <span style="color:blue;">String</span>.Format(<span
style="color:#a31515;">"https://oauth.live.com/token?client\_id={0}"</span> &\
                          <span
style="color:#a31515;">"&redirect\_uri=https://oauth.live.com/desktop"</span> &\
                          <span
style="color:#a31515;">"&client\_secret={1}&refresh\_token={2}&"</span> &\
                          <span
style="color:#a31515;">"grant\_type=refresh\_token"</span>, ClientID,\
                          ClientSecret, refresh\_token)),\
        <span style="color:#a31515;">"refreshtoken"</span>)

Yukarıdaki GET talebimiz eldeki ClientID, ClientSecret ve
RefresthToken'ı göndererek yeni bir access\_token ve refresh\_token
istiyor. Özellikle **grant\_type'daki** değişikliğe dikkat.

**[VB]**

    <span style="color:blue;">Private</span> <span
style="color:blue;">Sub</span> Web\_DownloadStringCompleted(sender <span
style="color:blue;">As</span> <span style="color:blue;">Object</span>, \
                e <span style="color:blue;">As</span> <span
style="color:#2b91af;">DownloadStringCompletedEventArgs</span>) <span
style="color:blue;">Handles</span> Web.DownloadStringCompleted\
        <span style="color:blue;">If</span> e.UserState = <span
style="color:#a31515;">"gettoken"</span> <span
style="color:blue;">Or</span> e.UserState = <span
style="color:#a31515;">"refreshtoken"</span> <span
style="color:blue;">Then</span>\
            <span style="color:blue;">Dim</span> jss = <span
style="color:blue;">New</span> System.Web.Script.Serialization.<span
style="color:#2b91af;">JavaScriptSerializer</span>\
            <span
style="color:blue;">Dim</span> found = jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">String</span>))(e.Result)\
            refresh\_token = found(<span
style="color:#a31515;">"refresh\_token"</span>)\
            access\_token = found(<span
style="color:#a31515;">"access\_token"</span>)\
            upload\_location = (jss.Deserialize(<span
style="color:blue;">Of</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)) \_\
                               (Web.DownloadString(<span
style="color:blue;">String</span>.Format( \_\
                  <span
style="color:#a31515;">"{0}/me/skydrive?access\_token={1}"</span>, APIBase, access\_token)))) \_\
                    (<span
style="color:#a31515;">"upload\_location"</span>)\
\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.access\_token = access\_token\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.upload\_location = upload\_location\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.refresh\_token = refresh\_token\
            WpfApplication1.<span
style="color:#2b91af;">MySettings</span>.Default.Save()\
\
            btn.IsEnabled = <span style="color:blue;">True</span>\
        <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
    <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

RefreshToken ile gelen bir talebin sonucu ilk token talebinin sonucu ile
aynı. Yani geri gelen JSON aynı :) O nedenle ben direk aynı Completed
eventini bıraktım gitti :) İşte tam da bu yüzden UserState gereksiz oldu
:)

### İşlem Tamam

Dokümantasyonu şu an için muhteşem güzel olmasa da API'ler epey
stabiller Beta olmalarına rağmen. O nedenle rahatlıkla development
yapılabilir. SkyDrive'ın özellikle önümüzdeki dönemde WP7.5 ve Windows 8
ile beraber epey entegrasyonla daha da değer kazanacağını düşünürsek
entegrasyon manzaralarını düşünmek anlamlı olabilir. Unutmadan :) Upload
işleminde dosya formatlarında sınırlar var. Örneğin ZIP
gönderemiyorsunuz ama ZIP'i JPG yapınca gönderiyor :) Benim için çok
dert olmadı açıkçası. Diğer yandan göndereceğiniz dosyalar büyükse
WebClient'ın **UploadDataAsync** asenkron metodunu da kullanabilirsiniz.

Umarım işinize yarar! Hepinize kolay gelsin ;)

Bu makale **Live Connect SDK SkyDrive Developer Preview / Beta**REST
API'leri kullanılarak hazırlanmıştır.


