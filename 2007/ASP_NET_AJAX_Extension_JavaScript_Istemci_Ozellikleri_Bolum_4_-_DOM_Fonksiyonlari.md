---
FallbackID: 1783
Title: "ASP.NET AJAX Extension JavaScript İstemci Özellikleri (Bölüm 4 - DOM Fonksiyonları)"
date: "2007-9-11"
EntryID: ASP_NET_AJAX_Extension_JavaScript_Istemci_Ozellikleri_Bolum_4_-_DOM_Fonksiyonlari
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX
old.EntryID: f8a9905e-7d02-4a0b-b672-2ee0e7f74c7e
---
# ASP.NET AJAX Extension JavaScript İstemci Özellikleri (Bölüm 4 - DOM Fonksiyonları)
Bir önceki yazımızda ASP.NET AJAX Extension ile beraber gelen istemci
tarafındaki sayısal, metin ve tarih değişkenleri ile ilgili
fonksiyonları inceledikten sonra sıra DOM objeleri ile ilgili metodlara
geldi. İstemci tarafında JavaScript kodu kullanırken sıklıkla yaptığımız
işlemler arasında sayfanın görsel özellikleri üzerinde oynamak geliyor.
Bazen tüm sayfanın bazen de sayfadaki belirli elementlerin farklı
özelliklerini JavaScript ile değiştirmemiz gerekebiliyor. Bu durumda
artık eski stil JavaScript komutları ile boğuşmaktansa ASP.NET AJAX
Extension ile beraber gelen yeni komutları kullanabiliriz. Yazı boyunca
olabildiğince yeni özellikleri eski muadilleri ile karşılaştırarak
ilerliyor olacağız.

**\$get Metodu**

Sayfa içerisindeki HTML elementleri üzerinde JavaScript ile değişiklik
yapabilmek için söz konusu elementleri sayfada bulmuş veya bir anlamda
yakalamış olmamız gerekir. Elimizde olmayan bir obje üzerinde değişiklik
yapmamız da mümkün olmayacaktır. Gelin ilk olarak eskiden bu işi nasıl
yapıyorduk ona bir bakalım.

document.getElementById(<span
style="color:#A31515; ">"Label1"</span>).innerHTML= <span
style="color:#A31515; ">"Birinci Metin geldi."</span>;

Yukarıdaki kodu kullanarak sayfa içerisinde yer alan Label1 adındaki
nesneyi yakalayarak JavaScript ile içeriğini değiştirebiliyoruz. Tabi bu
kodu kullanmak için sayfamızda ScriptManager yer alması gerekmiyor. Peki
projemiz hali hazırda bir ASP.NET AJAX projesi ise ve sayfamızda bir
ScriptManager var ise ne kullanabiliriz?

    Sys.UI.DomElement.getElementById(<span
style="color:#A31515; ">"Label1"</span>).innerHTML= <span
style="color:#A31515; ">"Metin geldi."</span>;

ASP.NET AJAX Extension ile beraber gelen yapı yukarıdaki gibi. "Bunun
neresi daha kolay?" deyişinizi duyar gibiyim. Kesinlikle haklısınız hiç
de kolay değil, hatta bariz bir şekilde daha uzun bir kod söz konusu.
Ama Microsoft tarafındaki geliştiriciler de zaten durumun farkında bu
nedenle bu JavaScript sınıfları için birer kısayol komutu da
tanımlamışlar.

    \$get(<span style="color:#A31515; ">"Label1"</span>).innerHTML=
<span style="color:#A31515; ">"Metin geldi."</span>;

Ne kadar kolay değil mi? Gerçekten de öyle. Sadece \$get metodunu
kullanarak yakalamak istediğimiz elementin ID bilgisini vermemiz
yeterli. Elementi yakaladıktan sonra üzerinde her tür işlem
yapabilirsiniz.

**addCssClass Metodu**

Sayfamız içerisindeki HTML elementlerini yakaladıktan sonra sıra geldi
elementlerin görsel özelliklerini değiştirmeye. Bunun için ilk aşamada
farklı görsel özellikleri tanımlayan birer CSS sınfı hazırlayalım.

<span>       <span style="color:blue; ">\<</span><span
style="color:#A31515; ">style</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/css"\></span></span>\
 <span style="color:#A31515; ">.baslik1</span><span> {</span>\
 <span>       <span style="color:red; ">font-family</span>: <span
style="color:blue; ">Arial,</span> <span
style="color:blue; ">Helvetica,</span> <span
style="color:blue; ">sans-serif</span>;</span>\
 <span>       <span style="color:red; ">font-size</span>: <span
style="color:blue; ">large</span>;</span>\
 <span>       <span style="color:red; ">font-weight</span>: <span
style="color:blue; ">bold</span>;</span>\
 <span>       <span style="color:red; ">text-transform</span>: <span
style="color:blue; ">uppercase</span>;</span>\
 <span>       <span style="color:red; ">color</span>: <span
style="color:blue; ">\#FF0000</span>;</span>\
 <span>}</span>\
 <span style="color:#A31515; ">.baslik2</span><span> {</span>\
 <span>       <span style="color:red; ">font-family</span>: <span
style="color:blue; ">Arial,</span> <span
style="color:blue; ">Helvetica,</span> <span
style="color:blue; ">sans-serif</span>;</span>\
 <span>       <span style="color:red; ">font-size</span>: <span
style="color:blue; ">medium</span>;</span>\
 <span>       <span style="color:red; ">font-weight</span>: <span
style="color:blue; ">bold</span>;</span>\
 <span>       <span style="color:red; ">font-variant</span>: <span
style="color:blue; ">small-caps</span>;</span>\
 <span>       <span style="color:red; ">color</span>: <span
style="color:blue; ">\#C0C0C0</span>;</span>\
 <span>}</span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">style</span><span style="color:blue; ">\></span>

CSS sınıflarımızı yukarıdaki gibi tanımladıktan sonra bu CSS sınıflarını
JavaScript ile yakaladığımız elementlere yine JavaScript ile
ekleyeceğiz. Kodumuz aşağıdaki gibi olacak.

<span>    Sys.UI.DomElement.addCssClass(\$get(<span
style="color:#A31515; ">"Label1"</span>), "<span
style="color:#A31515; ">baslik2</span>");</span>

Maalesef addCssClass metodu için bir kısayol metodu bulunmuyor, bu
nedenle tam yolunu yazmamız şart. Örneğimizde de gördüğünüz üzere \$get
metodu ile sayfadaki Label1 nesnesini yakaladıktan sonra addCssClass
metoduna birinci parametre olarak veriyoruz. Böylece addCssClass
kendisine ikinci parametre olarak verdiğimiz isimdeki CSS sınıfını hangi
HTML elementine ekleyeceğini de algılayabiliyor. Dikkatinizi çektiyse
yukarıda iki adet CSS sınıfı tanımladık. Bir objenin CSS sınıfını
değiştirmek isterseniz, yani söz konusu HTML elementinin CSS özelliğine
addCssClass ile baslik1'i ekledikten sonra baslik2 CSS sınıfını eklemek
isterseniz maalesef görsel olarak birşey değişmeyecektir. Bunun nedeni
bir HTML elementine sadece bir CSS sınıfı ekleyebileceğinizdendir. Peki
ne yapacağız? Tabi ki eklediğimiz CSS sınıfını önce çıkaracağız sonra da
diğerini ekleyeceğiz. HTML elementlerinden CSS sınıfı çıkarmak için
kullanacağımız metodu bir sonraki bölümde inceleyeceğiz.

**removeCssClass Metodu**

Bir önceki bölümde HTML elementlerine CSS sınıfları ekledik. Şimdi sıra
geldi çıkarmaya. CSS sınıfını söz konusu elementten çıkartırsak başka
bir CSS sınıfı ekleyebileceğiz.

    Sys.UI.DomElement.removeCssClass(\$get(<span
style="color:#A31515; ">"Label1"</span>), "<span
style="color:#A31515; ">baslik2</span>");

Yukarıdaki kodumuz ile removeCssClass metoduna verdiğimiz ilk
parametredeki HTML elementinden ikinci parametrede verdiğimiz CSS sınıfı
çıkartılıyor. Böylece bir sonraki aşamada addCssClass metodu ile başka
bir CSS sınıfını elementimize ekleyebiliriz.

**containsCssClass Metodu**

HTML elementlerine bir CSS sınıfını ekleyip eklemediğinizi kontrol
etmeniz gerektiğinde containsCssClass metodunu kullanabilirsiniz.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span><span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span style="color:blue; ">function</span><span> Resim()</span>\
 <span>{</span>\
 <span>    <span style="color:blue; ">if</span>
(Sys.UI.DomElement.containsCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"gizle"</span>))</span>\
 <span>    {</span>\
 <span>        Sys.UI.DomElement.removeCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"gizle"</span>);</span>\
 <span>        Sys.UI.DomElement.addCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"goster"</span>);</span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">else</span></span>\
 <span>    {</span>\
 <span>        Sys.UI.DomElement.removeCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"goster"</span>);</span>\
 <span>        Sys.UI.DomElement.addCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"gizle"</span>);</span>\
 <span>    };</span>\
 <span>}</span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span>

Yukarıdaki Resim JavaScript fonksiyonumuz sayfada bulunan Image1 adında
bir nesneyi bularak eğer CSS sınıfı gizle şeklinde verilmiş ise goster
yapıyor, aksi halde ise gizle yapıyor. gizle ve goster CSS sınıflarını
aşağıda inceleyebilirsiniz.

<span>       <span style="color:blue; ">\<</span><span
style="color:#A31515; ">style</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/css"\></span></span>\
 <span>        <span style="color:#A31515; ">.gizle</span> {</span>\
 <span>               <span style="color:red; ">display</span>: <span
style="color:blue; ">none</span>;</span>\
 <span>        }</span>\
 <span>        <span style="color:#A31515; ">.goster</span> {</span>\
 <span>               <span style="color:red; ">display</span>: <span
style="color:blue; ">block</span>;</span>\
 <span>        }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">style</span><span
style="color:blue; ">\></span></span>

Söz konusu CSS sınıflarımız HTML elementi üzerinde değiştirildiğinde
elementimiz sayfada bir görünmez olacak bir görünür olacak.

**toggleCssClass Metodu**

Geldik CSS sınıfları ile ilgili benim en sevdiğim fonksiyona. Tüm
yukarıda öğrendiklerimizin ötesinde eğer bir HTML elementinin CSS
sınıfını değiştirmek istiyorsanız kısa yoldan toggleCssClass metodunu da
kullanabilirsiniz. Metodumuz hedef HTML elementinin CSS sınıfını
verdiğimiz başka bir sınıf ile değiştiriyor. Gelin bir önceki
bölümümüzde JavaScript kodumuzu toggleCssClass metodunu kullanarak
baştan yazalım.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span><span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span style="color:blue; ">function</span><span> Resim()</span>\
 <span>{</span>\
 <span>    <span style="color:blue; ">if</span>
(Sys.UI.DomElement.containsCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"gizle"</span>))</span>\
 <span>    {</span>\
 <span>        Sys.UI.DomElement.toggleCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"goster"</span>);</span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">else</span></span>\
 <span>    {</span>\
 <span>        Sys.UI.DomElement.toggleCssClass(\$get(<span
style="color:#A31515; ">"Image1"</span>), <span
style="color:#A31515; ">"gizle"</span>);</span>\
 <span>    };</span>\
 <span>}</span>\
 <span style="line-height:115%; color:blue; ">\</</span><span
style="line-height:115%; color:#A31515; ">script</span><span
style="color:blue; ">\></span>

Gördüğünüz gibi kodumuz çok daha kısa ve sade oldu. toggleCssClass
metodunun kullanımı da aynı addCssClass metodu gibi. CSS sınıfını
değiştireceğimiz HTML elementi ile birlikte atanacak CSS sınıfının adını
sırası mile parametre olarak vermemiz yeterli.

İstemci taraflı ASP.NET AJAX Extension JavaScript yeniliklerini
incelediğimiz serimizin bu yazısında DOM üzerinde işlem yapmayı ve
görsel özelliklerle ilgili atamalar yapmayı inceledik. Bir sonraki
yazımızda JavaScript handler işlemlerine değineceğiz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-9-11 tarihinde yayinlanmistir.*
