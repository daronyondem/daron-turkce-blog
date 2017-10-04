---
FallbackID: 2413
Title: ASP.NET 4.0'da UrlRouting
PublishDate: 16/9/2009
EntryID: ASP_NET_4_0_da_UrlRouting
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 4.0, ASP.NET
old.EntryID: e6f2b81a-defc-4255-ba19-d0071526aadf
---
URLReWrite, URLMapping veya URLRouting adını ne koyarsanız koyun bugün
web projelerinin olmazsa olmazlarından biri de web siteleri içi
linklerin okunabilir ve arama motorları tarafından rahatlıkla
anlaşılabilir hale getirilmesi. Bunun için kullanılabilecek kolay veya
zor birçok teknik var. Bunlardan bazıları request başına gelen adresi
alıp değerlendirirken bazıları daha alt seviyelerden de ilerleyebiliyor.
Bu noktada bence önemli olan olabildiğince dış ürün veya kütüphanelere
başvurmadan ASP.NET içinde çözümü üretiyor olmak.

Aslında URLRouting şu anda ASP.NET MVC'de ve DynamicData projelerinde
zaten kullanılıyor. Birkaç takla atarak aynı kütüphaneleri normal
ASP.NET projelerine almak da mümkün. ASP.NET 4.0 tarafında ise çok daha
rahat kullanıma sahip bir şekilde URLRouting karşımıza çıkıyor.

İlk olarak gelin Routing kurallarımızı belirleyelim. Bunun için sitemize
bir Global.asax dosyası ekleyerek Application'ın Start event'ında
gerekli tanımlamaları yapabiliyoruz.

**[VB]**

<span style="color: blue;">Sub</span> Application\_Start(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

    Routing.RouteTable.Routes.Add(<span
style="color: #a31515;">"Sayfalar"</span>,

                                <span style="color: blue;">new</span>
Routing.Route(<span style="color: #a31515;">"sayfa/{adi}"</span>,

                                <span style="color: blue;">new</span>
Web.Routing.PageRouteHandler(<span
style="color: #a31515;">"\~/sayfa.aspx"</span>)))

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıda gördüğünüz kod içerisinde sanal yol olarak tanımladığımız
**sayfa/Daron** şeklindeki adresleri sayfa.aspx'e yönlendiriyoruz. Peki
"**daron**" parametresine ne oldu dediğinizi duyar gibiyim. Dikkat
ettiyseniz aslında **Daron** parametresini adi adında bir değişkene
aktarmış olduk. Bu değişken otomatik olarak **sayfa.aspx'e**
gönderilecek. Sayfa.aspx içerisinde bu gibi parametrelere ulaşmak için
de aşağıdaki kodu kullanabiliyoruz.

**[VB]**

<span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> Page\_Load(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Load

    <span style="color: blue;">Dim</span> Gelen <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= Page.RouteData.Values(<span style="color: #a31515;">"adi"</span>)

    Response.Write(Gelen)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İşte bu kadar basit. Ne kadar kolay değil mi? İsterseniz Application
Startup durumda çok sayıda Routing tanımlayabilirsiniz. Tüm bu
Routingler içerisindeki değerler uygun sayfalara parametre olarak
gönderilecektir. Söz konusu sayfalar da bu parametreleri alarak gerekli
işlemleri yapabilirler.

**RouteUrl ve RouteValue**

Peki ya belirli bir sayfadan diğerine link vereceksek? Hatta link
verilen sayfada da parametreyi sayfa içerisindeki HTML kodunda
kullanacaksak? Bir üstteki örnekte basit bir şekilde "Daron"
parametresini sayfa Routing'ine gönderdik ve sayfa.aspx de bunu alıp
ekrana yazdı. Oysa bunu yapmanın çok daha kolay bir yolu daha var.

![Kısa yolda URLRouting'e özel
link.](media/ASP_NET_4_0_da_UrlRouting/15092009_1.gif)\
*Kısa yolda URLRouting'e özel link.*

Gördüğünüz gibi expression builderlar kullanarak hızlıca gerekli linki
yaratabiliyoruz. İşin güzel tarafı eğer Global.asax içerisinde parametre
olarak "adi" parametresini alan Routing kuralını değiştirirseniz bir
anda tüm projenizdeki linklerin de uygun şekilde değişip güncel
hallerinin yaratılıyor olması. Böylece hiç uğraşmadan dinamik bir
altyapı yaratmış oluyorsunuz.

**[ASP.NET]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">form</span> <span
style="color: red;">id</span><span style="color: blue;">="form1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Label</span>
<span style="color: red;">ID</span><span
style="color: blue;">="Label1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span style="color: blue;">="</span><span
style="background: #ffee62;">\<%</span>\$RouteValue:adi<span
style="background: #ffee62;">%\></span><span
style="color: blue;">"</span> <span style="color: blue;">/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">form</span><span style="color: blue;">\></span>

Ayrıca yukarıdaki şekilde herhangi bir sayfaya gelen parametreyi de
**RouteValue** expression ile rahatlıkla alıp sayfada kullanabilirsiniz.

Hepinize kolay gelsin.


