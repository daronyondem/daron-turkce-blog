---
FallbackID: 2527
Title: Windows Phone 7'de Multitasking
PublishDate: 5/14/2010
EntryID: Windows_Phone_7_de_Multitasking
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone 7, Windows Phone
old.EntryID: 9c4e50fb-2411-4717-9b47-eb05703ce662
---
Şu ana kadar bildiklerimize dayanarak Windows Phone 7'nin multitasking
desteklemeyeceğini rahatlıkla söyleyebiliriz. Bu durum birer yazılım
geliştirici olarak çok işimize gelmese de aslında son kullanıcı
açısından bunun birçok faydası var. Cihazların pil ömründen tutun
performansına kadar çoğu noktada multitasking aslında cebimizde bu minik
cihazların kaldıramayacağı bir yük gibi duruyor. Son kullanıcı
tarafından baktığımızda sadece kabaca bu duruma iPhone ile herkes
alışkın. İşin bir diğer komik yanı ise aslında hiçbir son kullanıcının
pek de bu durumu önemsemiyor olması. Yani biz yazılımcılar kadar konuya
teknik açıdan bakıp endişelenen pek yok gibi :)

Bir son kullanıcı için önemli olan aslında çalıştırdığı programın arkada
çalışıp çalışmadığı bilmekten öte istediği işin yapılıp yapılmadığını
veya daha sık karşılaştığımız senaryolarda herhangi bir işin takibinin
yapılıp yapılmadığını bilmek. Daha somut bir örnek vermek gerekirse
varsayalım ki bir mail istemcisi kullanıyorsunuz. Normalde
bilgisayarımızda mail programını açık tutmamızın nedeni mail geldiğinde
haberdar olmaktır. Oysa bunun için koca mail programının açık olmasına
gerçekten gerek var mı? Yani daha ufak bir yapı arkada mail geldiğinde
haberdar olsa da bize ufak bir uyarı mesajı verse? Sonra gerekiyorsa ben
mail programını çalıştırıp istediğimi yapsam olmaz mı? İşte Windows
Phone 7 içerisinde yer alan **PushNotification** sistemi de tam olarak
bunu çözüyor.

**Olayın işleyişine bir göz atalım...**

Push mesajlarının gönderiminde toplam üç farklı kimlik bulunuyor
diyebiliriz. Bunlardan biri mesajı dinlemede olan telefon, diğeri mesajı
gönderen servis, bir diğeri ise iki servisin birbirine ulaşabilmesini
sağlayan bir anlamda router görevi gören Microsoft servisi. Her telefon
dinleme moduna geçerken bir kanal ismi tanımlayarak kendini "Microsoft
Push Notification Service" üzerinde tanımlıyor.

![Push Notification Service'inden cihaza özel ulaşım adresi
alıyoruz.](http://cdn.daron.yondem.com/assets/2527/13052010_1.png)\
*Push Notification Service'inden cihaza özel ulaşım adresi alıyoruz.*

Yukarıdaki şemada da görebileceğiniz üzere telefon kendi dinleme kanal
adı ile servise başvurarak bir adres talep ediyor. Bu adres farklı
servislerin telefona push notification gönderirken kullanacakları adres
olacak. Böylece rahatlıkla bu adrese sahip her tür yazılım bu adres
üzerinden notification gönderebilecek. Söz konusu notification'lar
uygulamanız kapalı olsa da işletim sistemi tarafından dinleneceği için
uyarılar her zaman kullanıcılara gösterilebilecek. Tabi bu sistemin
çalışması için daha önce de bahsettiğimiz üzere bizim de push
notificationları sağlayacak bir servise ihtiyacımız var ve bu servisin
de telefonun adresine sahip olması gerekiyor.

![Push Notification telefona
gönderiliyor.](http://cdn.daron.yondem.com/assets/2527/13052010_2.png)\
*Push Notification telefona gönderiliyor.*

İlk aşamada telefon bizim yazacağımız bir servise kendi adresini
aktarıyor. Böylece servis artık telefona ulaşabileceği adresi bildiğine
göre Push Notification yollmaya hazır. Aslında telefon verdiği adres tam
olarak kendi adresi de değil :) Unutmayın bu adres Microsoft Push
Notification Service'in verdiği adres. Telefon Microsoft Push
Notification Service'den aldığı adresi bizim servise veriyor ve artık
bizim servis de bu adrese istediği mesajı gönderiyor. Gönderilen bu
mesaj özünde yine Microsoft Push Notification Service'e gidiyor ve
Microsoft Push Notification Service'de mesajı telefona iletiyor. Böylece
MSPush Notification Service ile cihaz bir Socket bağlantısına sahipken
bizim servisimiz sadece istediğinde MS Push Notification Service ile
bağlantı kurarak mesaj gönderebiliyor.

**Peki nasıl yapacağız bu işleri?**

Biz kendi servisimizi temsil etmek üzere bir WPF uygulaması yazalım.
Böylece WPF uygulaması kendi içerisinden telefona PUSH mesaj
yollayabilir olsun. Uygulamamızın içerisinde telefondan gelecek adres
bilgisini alabilecek bir servis olması gerek. Bu servise gelen adrese
sonrasında gönderim yaparak telefonu PUSH data yollamış olacağız. 

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">Service1</span>

    <span style="color: blue;">Implements</span> <span
style="color: #2b91af;">IService1</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> SetURL(<span
style="color: blue;">ByVal</span> URL <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">Uri</span>) <span
style="color: blue;">Implements</span> <span
style="color: #2b91af;">IService1</span>.SetURL

        <span style="color: #2b91af;">MainWindow</span>.URL =
URL.AbsoluteUri.ToString()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz gibi servisimiz epey basit. Tek yaptığı adresi alıp WPF
uygulamamızın içerisinde başka bir sınıfta tanımlı shared bir obeye
atamak. Herhangi bir sorunla karşılaşmamak adına servisi
basicHttpBinding olarak ayarlamanızı tavsiye ederim. Servisin default
gelen design adresini kullanarak WP7 uygulamamıza referans olarak
ekleyebiliriz hemen. WPF uygulamasında **App.Config** içerisinde
<http://localhost:8732/Design_Time_Addresses/WpfApplication1/Service1/>
gibi bir adres göreceksiniz. Uygulamamız örnek amaçlı olduğu için
doğrudan bu adresi kullanarak WP7 uygulamanıza service reference
ekleyebilirsinzi. Tabi onun öncesinde bu servisin host edilmesini de
sağlamamız gerek.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Shared</span> URL <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainWindow\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> SHost <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">ServiceHost</span>(<span
style="color: blue;">GetType</span>(<span
style="color: #2b91af;">Service1</span>))

        SHost.Open()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İşte bu kadar basit. Uygulamamız açıldığı anda bu servisi host edecek ve
böylece bizim WP7 uygulaması da bunu referans alıp kullanabilecek.
İsterseniz şimdi de gelin WP7 uygulaması tarafındaki
PushNotificationService tanımına bakıp Microsoft Push Notification
Service üzerinden adres alıp bizim WPF uygulamasına göndermeye
çalışalım.

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            <span style="color: blue;">var</span> Kanal = <span
style="color: blue;">new</span> HttpNotificationChannel(<span
style="color: #a31515;">"UygulamaKanali15"</span>);

            Kanal.ChannelUriUpdated += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<NotificationChannelUriEventArgs\>(Kanal\_ChannelUriUpdated);

            Kanal.Open();

            Kanal.BindToShellNotification();

        }

Kodumuzda yarattığımız **HttpNotificationChannel** sınıfı
Microsoft.Phone.Notification assembly'si altında olduğu için söz konusu
DLL'i projeye referans olarak eklemeyi unutmayın. Sonrasında
HttpNotificationChannel nesnemizi yaratarak kendi tanımladığımız bir de
kanal ismi veriyoruz. Nesnemize ait **ChannelUriUpdated** event'ı
Microsoft Push Notification Service'den cihazın adresi geldiğinde
çalışıyor. Özünde biz şu anda hem Push Listener tanımlayıp bunun için
Microsoft Push Notification Service'den adres isteyerek elimizdeki Push
Notification Service'i de **BindToShellNotification** ile işletim
sistemine aktarıyoruz. Adres geldiğinde söz konusu adresi bizim WPF
uygulamasındaki servise aktaracağız.

**[C\#]**

        ServiceReference1.Service1Client Servis = <span
style="color: blue;">new</span> ServiceReference1.Service1Client();

 

        <span style="color: blue;">void</span>
Kanal\_ChannelUriUpdated(<span style="color: blue;">object</span>
sender, NotificationChannelUriEventArgs e)

        {

            Servis.SetURLAsync(e.ChannelUri);

        }

WPF uygulamamızdaki servisi reference aldığımıza göre içerisindeki
**SetURL** metodunu kullanarak **ChannelUriUpdated** eventinden gelen
adresi gönderebiliriz. Böylece WP7 uygulamamız kendi adresini alıp bizim
servise göndermiş oldu. Bir sonraki adımda bizim bu adrese yani
Microsoft Push Notification Services'a bir mesaj yollamamız gerekiyor ki
mesaj telefona iletilsin ve kullanıcıya gösterilsin. Bu nedenle
geçiyoruz yine WPF uygulamamıza.

**[VB]**

        <span style="color: blue;">Dim</span> MesajXML = <span
style="color: #6464b9;">\<?</span><span
style="color: #844646;">xml</span> <span
style="color: #b96464;">version</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">1.0</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">encoding</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">utf-8</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">?\></span>

                       <span style="color: #6464b9;">\<</span><span
style="color: #844646;">wp:PushNotification</span> <span
style="color: #b96464;">xmlns:wp</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">WindowsPhonePushNotification</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

<span style="color: #555555;">                           </span><span
style="color: #6464b9;">\<</span><span
style="color: #844646;">wp:Toast</span><span
style="color: #6464b9;">\></span>

<span style="color: #555555;">                              
</span><span style="color: #6464b9;">\<</span><span
style="color: #844646;">wp:Text1</span><span
style="color: #6464b9;">\></span><span
style="color: #555555;">Mesaj1</span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">wp:Text1</span><span
style="color: #6464b9;">\></span>

<span style="color: #555555;">                              
</span><span style="color: #6464b9;">\<</span><span
style="color: #844646;">wp:Text2</span><span
style="color: #6464b9;">\></span><span
style="color: #555555;">Mesaj2</span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">wp:Text2</span><span
style="color: #6464b9;">\></span>

<span style="color: #555555;">                           </span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">wp:Toast</span><span
style="color: #6464b9;">\></span>

<span style="color: #555555;">                       </span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">wp:PushNotification</span><span
style="color: #6464b9;">\></span>

 

        <span style="color: blue;">Dim</span> Mesaj <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"X-WindowsPhone-Target: toast"</span> &
vbCrLf & vbCrLf & MesajXML.ToString()

Yukarıdaki gördüğünüz XML paketi Microsoft Notification Service'e
göndermemiz gereken paket. Bu paketin otomatik hazırlanması ile ilgili
bir helper sınıfı eminim ki yakında yayınlanacaktır. Fakat şimdilik elle
yapmamız gerekiyor. Paketin içerisinde iki adet String data var. Bu
dataları istediğiniz gibi değiştirebilirsiniz. Son olarka hazırladığımız
bu paketi daha önce servisimize iletilmiş olan adrese gönderiyoruz.

**[VB]**

        <span style="color: blue;">Dim</span> Gonder <span
style="color: blue;">As</span> <span
style="color: #2b91af;">HttpWebRequest</span> = <span
style="color: #2b91af;">WebRequest</span>.Create(URL)

        Gonder.Method = <span style="color: #a31515;">"POST"</span>

        Gonder.Headers = <span style="color: blue;">New</span> <span
style="color: #2b91af;">WebHeaderCollection</span>()

        Gonder.ContentType = <span
style="color: #a31515;">"text/xml"</span>

        Gonder.Headers.Add(<span
style="color: #a31515;">"X-NotificationClass"</span>, <span
style="color: #a31515;">"2"</span>)

 

        <span style="color: blue;">Dim</span> ByteArr = <span
style="color: blue;">New</span> <span
style="color: #2b91af;">UTF8Encoding</span>().GetBytes(Mesaj)

        Gonder.ContentLength = ByteArr.Length

        <span style="color: blue;">Dim</span> GStream =
Gonder.GetRequestStream

        GStream.Write(ByteArr, 0, ByteArr.Length)

**ToastNotificaton** olarak adlandırılan ve telefonun ekranının üst
kısmında bir uyarı olarak çıkan bu mesajlar için üç farklı aciliyet
seviyesi belirleyebiliyorsunuz. Yukarıdaki kod içerisinde 2 değeri
anında teslimat yapılması gerektiğini belirtliyor. 12 ve 22 gibi değer
vererek mesajınızın ToastNotification'lar harici farklı Push
Notification mesajları arasında da nasıl önceliklendirilebileceğini
belirtebiliyorsunuz. Eh artık herşey hazır. WPF uygulamamızı çalıştırıp
WP7 uygulamamızı da başlatabiliriz. WP7 uygulaması ilk olarak Microsoft
Notification Services'a bağlanıp kendine bir adres yarattıracak.
Sonrasında bu adresi bizim WPF uygulamamıza verecek. WPF uygulamamız da
artık istediği zaman bu adres mesaj gönderebilecek. Burada önemli olan
nokta telefonda uygulamanız kapalı olsa da mesaj işletim sistemi
tarafından alınarak kullanıcıya gösterilebilecek.

![ToastNotification
sahnede.](http://cdn.daron.yondem.com/assets/2527/13052010_3.png)\
*ToastNotification sahnede.*

Hepinize kolay gelsin.


