---
FallbackID: 2878
Title: PushOver implementasyonu ile bloga yorum geldiğinde push notification
PublishDate: 1/2/2014
EntryID: bloga_yorum_geldiginde_push_notification
IsActive: True
Section: software
MinutesSpent: 0
Tags: Genel, Visual Basic .NET, Visual Studio 2013
---
Push Notificationlar malumunuz artık epey popüler :) Ben de bir süredir
[IFTTT](https://ifttt.com/p/daronyondem) ile beraber
[PushOver](https://pushover.net/) kullananlardanım.
[IFTTT](https://ifttt.com/p/daronyondem) zaten efsane bir site ve
hizmet. Kesinlikle göz atmanızı tavsiye ederim. Çoğu farklı servisi
birbiri ile bağlayıp ilginç otomasyonlar yaratmanızı sağlayacaktır.
[PushOver](https://pushover.net/) ise basit hale ile developerlara High
Level bir Push Notification altyapısı sunuyor. Sadece notification alıp
gösteren birer iOS ve Android appleri var. Siteye kaydolup bu app'i
yükledikten sonra doğrudan cihazlarınıza Push Notification gönderebilir
hale geliyorsunuz ve bunu basit bir API call ile veya sistemin size
vereceği özel bir mail adresine mail atarak bile yapabiliyorsunuz.
Örneğin benim Visual Studio Online Status blogunun RSS'indeki
yenilikleri bana Push Notification olarak gönderen bir [IFTTT
Recipe'ım](https://ifttt.com/recipes/129843-visual-studio-online-service-update-leri-push-notification-olarak-gelir)
var :) Böylece sistem maintance'ı vs olduğunda bana anında Push
Notification geliyor.

PushOver'ı ürünlerinize bile entegre edebilirsiniz. PushOver üzerinden
App Registration seçeneği var. Bu şekilde tanımlandığında herhangi bir
App PushOver üzerinden Notification yollayabilir hale gelebiliyor. Tabi
notification yollayacağınız kişilerin de ID'leri gerekiyor ki bunu da
zaten PushOver hesabı olan kullanıcılar uygulamanıza bu bilgileri
vererek tamamlayabilirler. Ben geçenlerde bu sistemi blogumdaki
yorumlara ekleme kararı aldım :) Bloguma yorum geldiğinde bana zaten
mail geliyor ama itiraf ediyim o mailleri Exchange'de bir kural ile ayrı
bir klasöre alıyorum. Mailin yanı sıra bir de telefonuma Push
Notification gelse çok daha hızlı tepki verebilirim diye düşündüm.
Mail'i de bir backup kuyruğu olarak tutmuş olurum. Böylece notification
fail olursa çok dert olmaz.

![Pushover ana
sayfa...](http://cdn.daron.yondem.com/assets/2878/pushover1.gif)\
*Pushover ana sayfa...*

PushOver'a kaydolduktan sonra ana sayfada hemen kendi UserKey'inizi
bulabilirsiniz. Bu sizin hesabınıza Push Notification gönderirken bir
uygulamanın kullanması gereken keyin ta kendisi. Sol altta ise "Register
an Application" düğmesini görüyorsunuz. İşte orası da benim örneğimde
blogumu bir Push Notification göndericisi olarak tanımlayacağım yer.
Uygulamanızı tanımlarken sadece birkaç basit data soruluyor.

![Blogum PushOver'da app olarak
tanımlandı.](http://cdn.daron.yondem.com/assets/2878/pushover2.gif)\
*Blogum PushOver'da app olarak tanımlandı.*

Tanımlama işlemi bittikten sonra uygulamanıza ait API Token'ı da almış
oluyorsunuz. İşte bu API Token da bizim Push Notification göndermek için
kullanacağımız anahtar olacak. Böylece PushOver tarafındaki tüm
ayarlarımızı bitirdik. Artık ben de bloga geçip yorum geldiğinde
PushOver API'ına gerekli bilgilerin gönderilmesini sağlayabilirim.

**[VB]**

<span style="color:blue;">Public</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Function</span> SendSelfPushNotification(Message <span
style="color:blue;">As</span> <span
style="color:blue;">String</span>, Title <span
style="color:blue;">As</span> <span style="color:blue;">String</span>, \
                                                 URL <span
style="color:blue;">As</span> <span
style="color:blue;">String</span>, URLTitle <span
style="color:blue;">As</span> <span style="color:blue;">String</span>)\
    <span style="color:blue;">Dim</span> Parameters = <span
style="color:blue;">New</span> <span
style="color:#2b91af;">NameValueCollection</span>() <span
style="color:blue;">From</span> {\
        {<span style="color:#a31515;">"token"</span>, <span
style="color:#2b91af;">ConfigurationManager</span>.AppSettings(<span
style="color:#a31515;">"PushOverToken"</span>)},\
        {<span style="color:#a31515;">"user"</span>, <span
style="color:#2b91af;">ConfigurationManager</span>.AppSettings(<span
style="color:#a31515;">"PushOverUserKey"</span>)},\
        {<span style="color:#a31515;">"message"</span>, Message},\
        {<span style="color:#a31515;">"url"</span>, URL},\
        {<span style="color:#a31515;">"url\_title"</span>, URLTitle},\
        {<span style="color:#a31515;">"title"</span>, Title}}\
\
    <span style="color:blue;">Dim</span> client <span
style="color:blue;">As</span> <span style="color:blue;">New</span> <span
style="color:#2b91af;">WebClient</span>()\
    <span style="color:blue;">Try</span>\
        client.UploadValues(<span
style="color:#a31515;">"https://api.pushover.net/1/messages.json"</span>, Parameters)\
    <span style="color:blue;">Catch</span> ex <span
style="color:blue;">As</span> <span
style="color:#2b91af;">Exception</span>\
\
    <span style="color:blue;">End</span> <span
style="color:blue;">Try</span>\
<span style="color:blue;">End</span> <span
style="color:blue;">Function</span>

İşte yukarıdaki gibi basit bir kod işimizi görecektir. PushOver
endpointine benim senaryomda gerekli tüm parametreleri gönderiyorum.
WebClient geriye 200 dönmezse exception throw edecek. Ben o exceptionı
es geçmeyi tercih ettim çünkü zaten yorumlar bana mail olarak da geliyor
ve o tarafta bir kuyruk / retry mantığım var blogda. Push
Notification'larda biraz tembel davranıp "Gittiyse gitmiştir" diyerek es
geçiyorum farklı senaryoları :)

![PushOver ile notificationlar
gelirken.](http://cdn.daron.yondem.com/assets/2878/pushover3.gif)\
*PushOver ile notificationlar gelirken.*

Yukarıdaki muhteşem GIF çalışmam içerisinde :) PushOver'a gelen örnek
bir notificationı görebilirsiniz. Notification geldikten sonra App
açılıyor ve app içerisinde de notificationın detaylarına tıkladığımızda
API Request'inde verdiğimiz bir linki de ekleyebiliyoruz. Ben bu
senaryoda blogumda o linkin bulunduğu sayfaya one-time bir token ile
beni otomatik admin olarak login yapan linki yerleştirdim. Böylece o
linke tıkladığımda doğrudan yorumu modere edebileceğimiz bir web sayfası
açılmış oluyor.

Pushover sayesinde gerçekten kolay bir şekilde pratik Push Notification
entegrasyonları yapmak mümkün. Örneğin bir diğer örnek senaryo da
şirketinizdeki bazı uygulamalara eklediğiniz monitoring warning
e-mailleri vs olabilir :) Hayal gücünüzü kullanın :) Görüşmek üzere.


