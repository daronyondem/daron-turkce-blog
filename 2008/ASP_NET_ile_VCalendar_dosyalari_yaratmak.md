---
FallbackID: 2073
Title: ASP.NET ile VCalendar dosyaları yaratmak
PublishDate: 6/1/2008
EntryID: ASP_NET_ile_VCalendar_dosyalari_yaratmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, ASP.NET
old.EntryID: 948dce80-c08c-4d8d-8152-7f4798c6c8ee
---
Varsayalım ki web sitenizde belirli aktiviteleri paylaşıyorsunuz veya
belki de toplantıları. İnsanların buluşma tarihlerini bir kenara not
almalarını ve sonra da günü geldiğinde hatırlamalarını istiyorsunuz.
Artık çoğu kullanıcının bir şekilde dijital ortamda takvim tuttuğunu
varsayarsak neden onlara söz konusu aktivitelerini hızlı bir şekilde
takvimlerine ekleme olanağı tanımlayalım? Şükür ki bu konuda genel geçer
bir standart var; **VCalendar**!

VCalendar standardı çoğu dijital takvim uygulaması ile uyumlu bir
standart. Yapacağımız örnekte bir Generic Handler (ashx) kullanacağız.
Söz konusu handler bize **VCalendar** davetiye dosyaları oluşturarak
verecek. Siz uygulamalarınızda ashx dosyasına QueryString üzerinden
parametreler göndererek farklı VCalendar dosyaları oluşturabilirsiniz.

        context.Response.ContentType = <span
style="color: #a31515;">"application/download"</span>

İlk olarak yukarıdaki şekilde istemciye göndereceğimiz verinin download
edilmesi gereken bir uygulama dosyası olduğunu belirtelim. Böylece
istemcideki tarayıcı bir download penceresi açacaktır. VCalendar
dosyaları vcs uzantılıdır, istemciye doğrudan gönderdiğimiz istemcide
kullanıcı bunu ister Outlook ile açar ister farklı bir uygulama ile
kullanır, karar tamamen kullanıcıya kalmış.

**[VB]**

        <span style="color: blue;">Dim</span> BasTarih <span
style="color: blue;">As</span> <span style="color: blue;">Date</span> =
<span style="color: blue;">Date</span>.Now

        <span style="color: blue;">Dim</span> SonTarih <span
style="color: blue;">As</span> <span style="color: blue;">Date</span> =
<span style="color: blue;">Date</span>.Now.AddDays(1)

        <span style="color: blue;">Dim</span> Konum <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"İstanbul - MS Binası"</span>

        <span style="color: blue;">Dim</span> Konu <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"VCalendar Toplantısı"</span>

        <span style="color: blue;">Dim</span> Detay <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Toplantı VCalendar standartları
görüşülecek. "</span>

**[C\#]**

        System.<span style="color: #2b91af;">DateTime</span> BasTarih =
System.<span style="color: #2b91af;">DateTime</span>.Now;

        System.<span style="color: #2b91af;">DateTime</span> SonTarih =
System.<span style="color: #2b91af;">DateTime</span>.Now.AddDays(1);

        <span style="color: blue;">string</span> Konum = <span
style="color: #a31515;">"İstanbul - MS Binası"</span>;

        <span style="color: blue;">string</span> Konu = <span
style="color: #a31515;">"VCalendar Toplantısı"</span>;

        <span style="color: blue;">string</span> Detay = <span
style="color: #a31515;">"Toplantı VCalendar standartları görüşülecek.
"</span>;

Bir sonraki adımda yukarıdaki şekilde parametrelerimizi tanımlayalım. Bu
parametreleri siz uygulamalarınızda veritabanına bağlayabilirsiniz.
Yaratacağımız VCalendar dosyası buradaki bilgileri içerecek.

**[VB]**

        <span style="color: blue;">Dim</span> BirStream <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
IO.MemoryStream()

        <span style="color: blue;">Dim</span> Yazici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
IO.StreamWriter(BirStream)

        Yazici.AutoFlush = <span style="color: blue;">True</span>

**[C\#]**

        System.IO.<span style="color: #2b91af;">MemoryStream</span>
BirStream = <span style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">MemoryStream</span>();

        System.IO.<span style="color: #2b91af;">StreamWriter</span>
Yazici = <span style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">StreamWriter</span>(BirStream);

        Yazici.AutoFlush = <span style="color: blue;">true</span>;

**VCalendar** dosyaları özünde text (metin) bazlı dosyalardır. O nedenle
aslında sunucu tarafında bir metin yaratarak **Binary** olarak istemciye
göndereceğiz. Bu nedenle istemciye göndereceğimiz tüm içeriği
oluştururken elimizde bir **Stream** ve **StreamWriter** olması
gerekiyor. Söz konusu Stream herhangi bir konuma yazdırılmayacağı için
havada bir **MemoryStream** yaratarak ilerliyoruz. Söz konusu
StreamWriter'ın **AutoFlush** özelliğini **True** olarak aktardığımızda
artık tüm içerik otomatik olarak Stream'e aktarılıyor olacak.

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VCALENDAR"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"PRODID:-//daron.yondem.com"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VEVENT"</span>)

Yukarıdaki VCalendar standartlarına uygun dosyamızı yaratmaya başladık.
PRODID özelliğine aktardığınız değer çok önemli değil. Aslında bu
VCalendar dosyasını yaratan programın adını içermesi yeterli.

**[VB]**

        Yazici.WriteLine(<span style="color: #a31515;">"DTSTART:"</span>
& BasTarih.ToUniversalTime.ToString(<span
style="color: #a31515;">"yyyyMMdd\\THHmmss\\Z"</span>))

        Yazici.WriteLine(<span style="color: #a31515;">"DTEND:"</span> &
SonTarih.ToUniversalTime.ToString(<span
style="color: #a31515;">"yyyyMMdd\\THHmmss\\Z"</span>))

        Yazici.WriteLine(<span
style="color: #a31515;">"LOCATION:"</span> & Konum)

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION;ENCODING=QUOTED-PRINTABLE:"</span>
& Detay)

        Yazici.WriteLine(<span style="color: #a31515;">"SUMMARY:"</span>
& Konu)

**[C\#]**

        Yazici.WriteLine(<span
style="color: #a31515;">"DTSTART:"</span> +
BasTarih.ToUniversalTime().ToString(<span
style="color: #a31515;">"yyyyMMdd\\\\THHmmss\\\\Z"</span>));

        Yazici.WriteLine(<span style="color: #a31515;">"DTEND:"</span> +
SonTarih.ToUniversalTime().ToString(<span
style="color: #a31515;">"yyyyMMdd\\\\THHmmss\\\\Z"</span>));

        Yazici.WriteLine(<span
style="color: #a31515;">"LOCATION:"</span> + Konum);

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION;ENCODING=QUOTED-PRINTABLE:"</span> +
Detay);

        Yazici.WriteLine(<span
style="color: #a31515;">"SUMMARY:"</span> + Konu);

Gördüğünüz gibi neredeyse tüm parametrelerimizi burada dosyamıza
ekledik. Önemli olan noktalardan biri tüm tarih bilgilerinin ilk olarak
**UniversalTime'a** yani global olarak geçerli zaman dilimine
uyarlanması gerektiği. İkincisi ise tarih dosyaya yazdırılırken uyulması
gereken format. Sonraki satırlarda diğer parametrelerimizi de
aktardıktan sonra devam edebiliriz.

**[VB]**

        Yazici.WriteLine(<span
style="color: #a31515;">"PRIORITY:3"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VALARM"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"TRIGGER:-PT30M"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"ACTION:DISPLAY"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION:"</span> & Konu)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VALARM"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VEVENT"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VCALENDAR"</span>)

**[C\#]**

        Yazici.WriteLine(<span
style="color: #a31515;">"PRIORITY:3"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VALARM"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"TRIGGER:-PT30M"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"ACTION:DISPLAY"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION:"</span> + Konu)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VALARM"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VEVENT"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VCALENDAR"</span>)

Kodumuzun ilk satırında bu aktivitenin ne kadar önemli olduğuna dair bir
değer aktardıktan sonra aktivite ile ilgili bir alarm ayarlıyoruz. PT30M
ayarı ile aktiviteden yarım saat önce kullanıcının uyarılması
gerektiğini belirtmiş olduk. Siz bu ayarları istediğiniz gibi
değiştirebilirsiniz. Son olarak hem VEVENT gem de VCALENDAR'ı kapatarak
dosyamızı sonlandırıyoruz.

**[VB]**

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Disposition"</span>, <span
style="color: #a31515;">"attachment; filename=aktivite.vcs"</span>)

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Length"</span>,
BirStream.Length.ToString())

        context.Response.BinaryWrite(BirStream.ToArray())

**[C\#]**

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Disposition"</span>, <span
style="color: #a31515;">"attachment; filename=aktivite.vcs"</span>);

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Length"</span>,
BirStream.Length.ToString());

        context.Response.BinaryWrite(BirStream.ToArray());

Sıra geldi oluşturduğumuz dosyayı istemciye göndermeye. İlk olarak
istemciye gönderdiğimiz HTTPResponse'a bazı header bilgileri eklememiz
gerekiyor. Bunlardan ilki istemcinin aldığı dosyayı hangi isimle
açacağı. Bizim örneğimizde dosya adı **aktivite.vcs** şeklinde yer
alıyor. İkincisi ise oluşturduğumuz dosyanın boyutu. Son olarak
**Response.BinaryWrite** ile elimizdeki **Stream'i** istemciye
gönderiyoruz.

Eğer istemci bu adresi doğrudan açarsa karşısına bir VCalendar download
penceresi gelecektir. Yarattığımız ashx dosyasını farklı aspx dosyaları
içerisinde linkleyerek kullanıcıların linklere bastıklarında VCalendar
dosyalarını indirebilmelerini sağlayabilirsiniz.

Generic Handler'ımızın son hali ile aşağıdaki şekilde;

**[VB]**

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span
style="color: #a31515;">WebHandler</span> <span
style="color: red;">Language</span><span
style="color: blue;">="VB"</span> <span
style="color: red;">Class</span><span
style="color: blue;">="vcalendar"</span> <span
style="background: #ffee62;">%\></span>

 

<span style="color: blue;">Imports</span> System

<span style="color: blue;">Imports</span> System.Web

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> vcalendar : <span
style="color: blue;">Implements</span> IHttpHandler

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> ProcessRequest(<span
style="color: blue;">ByVal</span> context <span
style="color: blue;">As</span> HttpContext) <span
style="color: blue;">Implements</span> IHttpHandler.ProcessRequest

        context.Response.ContentType = <span
style="color: #a31515;">"application/download"</span>

 

        <span style="color: blue;">Dim</span> BasTarih <span
style="color: blue;">As</span> <span style="color: blue;">Date</span> =
<span style="color: blue;">Date</span>.Now

        <span style="color: blue;">Dim</span> SonTarih <span
style="color: blue;">As</span> <span style="color: blue;">Date</span> =
<span style="color: blue;">Date</span>.Now.AddDays(1)

        <span style="color: blue;">Dim</span> Konum <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"İstanbul - MS Binası"</span>

        <span style="color: blue;">Dim</span> Konu <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"VCalendar Toplantısı"</span>

        <span style="color: blue;">Dim</span> Detay <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Toplantı VCalendar standartları
görüşülecek. "</span>

 

        <span style="color: blue;">Dim</span> BirStream <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
IO.MemoryStream()

        <span style="color: blue;">Dim</span> Yazici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
IO.StreamWriter(BirStream)

        Yazici.AutoFlush = <span style="color: blue;">True</span>

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VCALENDAR"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"PRODID:-//daron.yondem.com"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VEVENT"</span>)

 

        Yazici.WriteLine(<span style="color: #a31515;">"DTSTART:"</span>
& BasTarih.ToUniversalTime.ToString(<span
style="color: #a31515;">"yyyyMMdd\\THHmmss\\Z"</span>))

        Yazici.WriteLine(<span style="color: #a31515;">"DTEND:"</span> &
SonTarih.ToUniversalTime.ToString(<span
style="color: #a31515;">"yyyyMMdd\\THHmmss\\Z"</span>))

        Yazici.WriteLine(<span
style="color: #a31515;">"LOCATION:"</span> & Konum)

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION;ENCODING=QUOTED-PRINTABLE:"</span>
& Detay)

        Yazici.WriteLine(<span style="color: #a31515;">"SUMMARY:"</span>
& Konu)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"PRIORITY:3"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VALARM"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"TRIGGER:-PT30M"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"ACTION:DISPLAY"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION:"</span> & Konu)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VALARM"</span>)

 

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VEVENT"</span>)

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VCALENDAR"</span>)

 

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Disposition"</span>, <span
style="color: #a31515;">"attachment; filename=aktivite.vcs"</span>)

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Length"</span>,
BirStream.Length.ToString())

        context.Response.ContentType = <span
style="color: #a31515;">"application/download"</span>

        context.Response.BinaryWrite(BirStream.ToArray())

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">ReadOnly</span> <span
style="color: blue;">Property</span> IsReusable() <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>
<span style="color: blue;">Implements</span> IHttpHandler.IsReusable

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">False</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span
style="color: #a31515;">WebHandler</span> <span
style="color: red;">Language</span><span
style="color: blue;">="C\#"</span> <span
style="color: red;">Class</span><span
style="color: blue;">="Handler"</span> <span
style="background: #ffee62;">%\></span>

 

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Web;

 

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Handler</span> : <span
style="color: #2b91af;">IHttpHandler</span> {

 

    <span style="color: blue;">public</span> <span
style="color: blue;">void</span> ProcessRequest (<span
style="color: #2b91af;">HttpContext</span> context) {

        context.Response.ContentType = <span
style="color: #a31515;">"application/download"</span>;

 

        System.<span style="color: #2b91af;">DateTime</span> BasTarih =
System.<span style="color: #2b91af;">DateTime</span>.Now;

        System.<span style="color: #2b91af;">DateTime</span> SonTarih =
System.<span style="color: #2b91af;">DateTime</span>.Now.AddDays(1);

        <span style="color: blue;">string</span> Konum = <span
style="color: #a31515;">"İstanbul - MS Binası"</span>;

        <span style="color: blue;">string</span> Konu = <span
style="color: #a31515;">"VCalendar Toplantısı"</span>;

        <span style="color: blue;">string</span> Detay = <span
style="color: #a31515;">"Toplantı VCalendar standartları görüşülecek.
"</span>;

 

        System.IO.<span style="color: #2b91af;">MemoryStream</span>
BirStream = <span style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">MemoryStream</span>();

        System.IO.<span style="color: #2b91af;">StreamWriter</span>
Yazici = <span style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">StreamWriter</span>(BirStream);

        Yazici.AutoFlush = <span style="color: blue;">true</span>;

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VCALENDAR"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"PRODID:-//daron.yondem.com"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VEVENT"</span>);

 

        Yazici.WriteLine(<span
style="color: #a31515;">"DTSTART:"</span> +
BasTarih.ToUniversalTime().ToString(<span
style="color: #a31515;">"yyyyMMdd\\\\THHmmss\\\\Z"</span>));

        Yazici.WriteLine(<span style="color: #a31515;">"DTEND:"</span> +
SonTarih.ToUniversalTime().ToString(<span
style="color: #a31515;">"yyyyMMdd\\\\THHmmss\\\\Z"</span>));

        Yazici.WriteLine(<span
style="color: #a31515;">"LOCATION:"</span> + Konum);

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION;ENCODING=QUOTED-PRINTABLE:"</span> +
Detay);

        Yazici.WriteLine(<span
style="color: #a31515;">"SUMMARY:"</span> + Konu);

 

        Yazici.WriteLine(<span
style="color: #a31515;">"PRIORITY:3"</span>);

 

        Yazici.WriteLine(<span
style="color: #a31515;">"BEGIN:VALARM"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"TRIGGER:-PT30M"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"ACTION:DISPLAY"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"DESCRIPTION:"</span> + Konu);

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VALARM"</span>);

 

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VEVENT"</span>);

        Yazici.WriteLine(<span
style="color: #a31515;">"END:VCALENDAR"</span>);

 

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Disposition"</span>, <span
style="color: #a31515;">"attachment; filename=aktivite.vcs"</span>);

        context.Response.AppendHeader(<span
style="color: #a31515;">"Content-Length"</span>,
BirStream.Length.ToString());

        context.Response.BinaryWrite(BirStream.ToArray());

    }

 

    <span style="color: blue;">public</span> <span
style="color: blue;">bool</span> IsReusable {

        <span style="color: blue;">get</span> {

            <span style="color: blue;">return</span> <span
style="color: blue;">false</span>;

        }

    }

 

}

Hepinize kolay gelsin.


