---
FallbackID: 2685
Title: Feedburner'ı değişikliklerde pinglemek
PublishDate: 9/3/2011
EntryID: Feedburneri_degisikliklerde_pinglemek
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, ASP.NET 2.0, ASP.NET 3.5, ASP.NET 4.0, ASP.NET MVC 3
---
Blog yazmak ciddi ciddi apayrı bir işmiz :) Örneğin ben hiç
düşünmemiştim ki bloguma yazı eklediğimizde nasıl hemen FeedBurner bunu
görüyor. Nasıl oluyor da çat çat her tarafa otomatik publish oluyor.
Feedburner çılgın çılgın gelip bakıyor sürekli sanarken aslında durumun
pek de öyle olmadığını öğrendim :) Aslında blog sistemlerinin hepsi
gidip bu üçüncü parti yerlere XML-RPC ile Ping atıyorlarmış. Hatta bunu
otomatik hale getiren <http://pingomatic.com/> gibi yerler var. Tamam da
tüm bunları nasıl otomatik hale getireceğiz? Yani bloga bir yazı
girdiğimde veya yazıyı değiştirdiğimde nasıl olacak da tüm bu servisleri
haberdar edeceğim?

**[VB]**

        <span style="color:blue;">Public</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Sub</span> Send()\
            Execute(<span
style="color:#a31515;">"http://ping.feedburner.com"</span>)\
            Execute(<span
style="color:#a31515;">"http://rpc.pingomatic.com/RPC2"</span>)\
        <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>\
\
        <span style="color:blue;">Private</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Sub</span> Execute(url <span
style="color:blue;">As</span> <span style="color:blue;">String</span>)\
            <span style="color:blue;">Try</span>\
                <span style="color:blue;">Dim</span> request <span
style="color:blue;">As</span> <span
style="color:#2b91af;">HttpWebRequest</span> = <span
style="color:blue;">DirectCast</span>(<span
style="color:#2b91af;">WebRequest</span>.Create(url), <span
style="color:#2b91af;">HttpWebRequest</span>)\
                request.Method = <span
style="color:#a31515;">"POST"</span>\
                request.ContentType = <span
style="color:#a31515;">"text/xml"</span>\
                request.Timeout = 3000\
\
                AddXmlToRequest(request)\
                <span
style="color:blue;">Dim</span> Res = request.GetResponse()\
                <span style="color:blue;">Dim</span> Reader <span
style="color:blue;">As</span> <span style="color:blue;">New</span> <span
style="color:#2b91af;">StreamReader</span>(Res.GetResponseStream())\
                <span
style="color:blue;">Dim</span> Final = Reader.ReadToEnd\
            <span
style="color:blue;">Catch</span> generatedExceptionName <span
style="color:blue;">As</span> <span
style="color:#2b91af;">Exception</span>\
                <span
style="color: #2b91af; text-decoration: line-through;">Helpers</span><span
style="text-decoration: line-through">.ErrorReport(generatedExceptionName.Message, generatedExceptionName.StackTrace)</span>\
            <span style="color:blue;">End</span> <span
style="color:blue;">Try</span>\
        <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

İşte yukarıdaki kod işinizi görecektir. Basit bir POST işlemi ile Ping
yapılabiliyor. Catch'deki gereksiz loglama benim blogla alakalı :) onu
kaldırdım oradan. Şimdi kodu okuyanlarınız tabi **AddXmlToRequest**
nerede diye soracaklar. İşin sırrı da biraz orada zaten.

**[VB]**

        <span style="color:blue;">Private</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Sub</span> AddXmlToRequest(request <span
style="color:blue;">As</span> <span
style="color:#2b91af;">HttpWebRequest</span>)\
            <span style="color:blue;">Dim</span> stream <span
style="color:blue;">As</span> IO.<span
style="color:#2b91af;">Stream</span> = <span
style="color:blue;">DirectCast</span>(request.GetRequestStream(), IO.<span
style="color:#2b91af;">Stream</span>)\
            <span style="color:blue;">Using</span> writer <span
style="color:blue;">As</span> <span style="color:blue;">New</span> <span
style="color:#2b91af;">XmlTextWriter</span>(stream, <span
style="color:#2b91af;">Encoding</span>.ASCII)\
                writer.WriteStartDocument()\
                writer.WriteStartElement(<span
style="color:#a31515;">"methodCall"</span>)\
                writer.WriteElementString(<span
style="color:#a31515;">"methodName"</span>, <span
style="color:#a31515;">"weblogUpdates.ping"</span>)\
                writer.WriteStartElement(<span
style="color:#a31515;">"params"</span>)\
                writer.WriteStartElement(<span
style="color:#a31515;">"param"</span>)\
                writer.WriteElementString(<span
style="color:#a31515;">"value"</span>, <span
style="color:#a31515;">"Daron Yöndem"</span>)\
                writer.WriteEndElement()\
                writer.WriteStartElement(<span
style="color:#a31515;">"param"</span>)\
                writer.WriteElementString(<span
style="color:#a31515;">"value"</span>, <span
style="color:#a31515;">"http://feeds2.feedburner.com/daronyondem"</span>)\
                writer.WriteEndElement()\
                writer.WriteEndElement()\
                writer.WriteEndElement()\
            <span style="color:blue;">End</span> <span
style="color:blue;">Using</span>\
        <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

Benim blogda ping ile beraber "*Hey burada değişiklik var!*" dediğim tek
yer feedburner RSS linkim olduğu için onu direk kodun içine gömdüm.
Sizin kodunuzda parametrik olabilir bu kısım tabi ki :) Kabaca
yolladığım XML aşağıdaki şekilde;

**[XML]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;">?\></span>\
<span style="color:blue;">\<</span><span
style="color:#a31515;">methodCall</span><span
style="color:blue;">\></span>\
<span style="color:blue;">  \<</span><span
style="color:#a31515;">methodName</span><span
style="color:blue;">\></span>weblogUpdates.ping<span
style="color:blue;">\</</span><span
style="color:#a31515;">methodName</span><span
style="color:blue;">\></span>\
<span style="color:blue;">  \<</span><span
style="color:#a31515;">params</span><span style="color:blue;">\></span>\
<span style="color:blue;">    \<</span><span
style="color:#a31515;">param</span><span style="color:blue;">\></span>\
<span style="color:blue;">      \<</span><span
style="color:#a31515;">value</span><span
style="color:blue;">\></span>Hoboloy<span
style="color:blue;">\</</span><span
style="color:#a31515;">value</span><span style="color:blue;">\></span>\
<span style="color:blue;">    \</</span><span
style="color:#a31515;">param</span><span style="color:blue;">\></span>\
<span style="color:blue;">    \<</span><span
style="color:#a31515;">param</span><span style="color:blue;">\></span>\
<span style="color:blue;">      \<</span><span
style="color:#a31515;">value</span><span
style="color:blue;">\></span>http://www.hoyhoy.com/<span
style="color:blue;">\</</span><span
style="color:#a31515;">value</span><span style="color:blue;">\></span>\
<span style="color:blue;">    \</</span><span
style="color:#a31515;">param</span><span style="color:blue;">\></span>\
<span style="color:blue;">  \</</span><span
style="color:#a31515;">params</span><span style="color:blue;">\></span>\
<span style="color:blue;">\</</span><span
style="color:#a31515;">methodCall</span><span
style="color:blue;">\></span>

Buradaki methodName önemli, geri kalanlar ise sizin istediğiniz şekilde
değiştirebileceğiniz şeyler. Unutmayın bunu sadece yeni içerik
eklendiğinde değil içerik değişikliğinde de yapmanız gerekiyor.

Hepinize kolay gelsin ;)


