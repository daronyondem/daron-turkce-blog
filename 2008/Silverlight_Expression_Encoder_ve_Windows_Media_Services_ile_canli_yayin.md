---
FallbackID: 1928
Title: "Silverlight, Expression Encoder ve Windows Media Services ile canlı yayın"
date: "2008-1-23"
EntryID: Silverlight_Expression_Encoder_ve_Windows_Media_Services_ile_canli_yayin
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Encoder, Silverlight
old.EntryID: c44b96e8-e240-4ede-8c1f-7bdc000da97f
---
# Silverlight, Expression Encoder ve Windows Media Services ile canlı yayın
**Silverlight 1.0** ile **MediaElement** kullanarak **MMS** adresleri
üzerinden gelen "*on-demand*" veya "*live*" yayınları kullanıcılara
gösterme şansımız var. Bu yazıda **Windows Media Services** ile
**Silverlight'ın** beraber kullanılmasıyla ilgili karşılaşabileceğiniz
sorunlara ve çözümlerine değinirken özellikle canlı bir yayın örneği
yapacağız.

**Windows Media Services ayarları...**

İlk aşamada ayarlanması gereken şey sunucunun ta kendisi. Windows Media
Services yüklü bir sunucuda PUSH desteği olan bir **Publishing Point**
yaratmamız gerekiyor. "PUSH desteği" demek uzaktan bir Encoder'ın
bağlanarak bu Publishing Point (Yayın Noktası)'e veri aktarabileceği
anlamına geliyor. Eğer uzaktan bir kaynak bağlanmaz ise herhangi bir
yayın da olmayacak. Bunu yapabilmek için **Media Services** içerisinde
Publishing Points listesine sağ tıklayarak gelen menüden "**Add
Publishing Point (Advanced)**" seçeneğini işaretliyoruz.

!["Publishing Point"
ayarları](media/Silverlight_Expression_Encoder_ve_Windows_Media_Services_ile_canli_yayin/22012008_1.png)\
*"Publishing Point" ayarları*

Karşınıza çıkan ekranda yukarıdaki gibi yapacağınız ayarlar sonrasında
geriye kalıyor ince detaylara :) Aslında burada işler biraz karışıyor.
Silverlight MMS adreslerinden video oynatabiliyor olsa da aslında MMS
protokolü ile video yayını alamıyor. "*Nasıl yani?*" dediğinizi duyar
gibiyim. Bir MMS adresi üzerinden üç farlı protokolde yayın yapılabilir,
bunlar **HTTP, MMS** ve **RTSP** şeklinde. Her üç protokol için de Media
Services içerisinde sunucu bazında genel ayarlar yapılabiliyor.
Silverlight bu protokoller arasından HTTP'yi kullanıyor ve maalesef
Media Services ile beraber varsayılan ayarlarda HTTP protokolü ile MMS
üzerinden yayın 80 portu üzerinden yapılıyor. "Maalesef" dememin nedeni
çoğu Media Server'ın aynı anda IIS olarak da kullanılmasından
kaynaklanıyor. Eğer sunucunuzda IIS varsa ve Media Services ile
Silverlight tarafına video göndermek istiyorsanız özel bir ayar yaparak
Media Services'ın MMS üzerinden HTTP protokolünde başka bir port
kullanmasını sağlamalı ve Silverlight uygulamalarınıza da söz konusu
port bilgisini adres ile beraber aktarmalısınız. Eğer sunucunuzda IIS
çalışmıyorsa zaten herhangi bir sorun yaşamazsınız.

Biz örnek olması için Media Services sunucusunun MMS üzerinden HTTP
protokolü ile video gönderirken kullanacağı portu değiştirelim. Media
Services yönetim penceresinde sunucuya tıkladıktan sonra sağ panelde
"Properties" sayfasına geçerek "**Control Protocol**" ayarlarına geçin.

![Media Services
ayarları](media/Silverlight_Expression_Encoder_ve_Windows_Media_Services_ile_canli_yayin/22012008_2.png)\
*Media Services ayarları*

Yukarıdaki ekranda da görebileceğiniz üzere "**WMS HTTP Server Control
Protocol**" seçeneğineçift tıkladığınızda özel bir ayar penceresi
açılacaktır. Bu pencerede "Use Default Port" yerine özel bir port
numarası ayarlamanız gerekecektir. Böylece Silverlight bu port üzerinden
HTTP ile MMS adresine bağlanabilecek. Windows Media Player gibi istemci
yazılımları doğrudan MMS protokolünü kullanacağı için bu ayardan
etkilenmeyeceklerdir.

**Dikkat Dikkat!**

"On-Demand" veya "Live" bir Publishing Point düzenlerken dikkat etmeniz
gereken bir diğer nokta da kesinlikle Playlist dosyaları kullanmamanız
gerektiği. Silverlight "Playlist" desteği yok.

**Yayın Zamanı**

Sıra geldi yayın için videoyu gönderecek olan istemciyi ayarlamaya.
Bunun için Expression Encoder kullanacağız. Expression Encoder
içerisinde "**View / Live Encoding Mode**" menüsünden yayın moduna geçiş
yapabilirsiniz. Burada sisteminize bağlı kameraları veya diskinizde
dosyaları kullanabileceğiniz bir yayın ortamı bulunuyor. Bizi şu an
ilgilendiren esas ayarlar "**Output**" tabında yer alıyor.

![Expression Encoder ile canlı
yayındayız.](media/Silverlight_Expression_Encoder_ve_Windows_Media_Services_ile_canli_yayin/22012008_3.png)\
*Expression Encoder ile canlı yayındayız.*

Bu ekranda "Publishing Point" seçeneğini işaretleyerek bağlanacağımız
sunucunun IP:Port ve Publishing Point adını girmemiz gerekiyor. (Örn:
http://127.0.0.1:8080/deneme) Hemen sonrasında "**Pre Connect**"
düğmesine basarak authentication işlemini de yapabilirsiniz. Yayına
hazırsınız, artık "**Start**" düğmesine basmanız yeterli."

**Silverlight ile canlı yayın!**

Geldik işin en kolay noktasına. Aslında tek yapmamız gereken artık
ekrana bir **MediaElement** koyup **Source** özelliğini de Publishing
Point'imize yönlendirmek. Aşağıdaki gibi bir kod başlangıç seviyesinde
işimizi görecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="401"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="278"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="106"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="90"</span><span style="color: red;">
Source</span><span
style="color: blue;">="mms://127.0.0.1:8080/deneme"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-1-23 tarihinde yayinlanmistir.*
