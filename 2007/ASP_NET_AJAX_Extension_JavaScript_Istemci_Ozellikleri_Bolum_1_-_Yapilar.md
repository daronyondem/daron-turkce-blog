# ASP.NET AJAX Extension JavaScript İstemci Özellikleri (Bölüm 1 - Yapılar)
ASP.NET AJAX Extension dediğimizde çoğunlukla aklımıza UpdatePanel,
Timer gibi sunucu kontrolleri gelir. Oysa ASP.NET AJAX Extension ile
beraber zengin bir JavaScript istemci kütüphanesi de geliyor. Bu makale
serisi boyunca benim Client Extensions olarak adlandırdığım ASP.NET AJAX
Extension'ın istemci taraflı özelliklerine bakacağız. Muhabbeti çok
uzatmadan ilk konumuz ile maratonumuza başlayalım.

**Sınıf, Üye ve Kütüphane Yapısı**

Class, Member ve Library kelimeleri bizim ASP.NET sunucu taraflı
programlamada özellikle nesne tabanlı programlama yaparken kullandığımız
yapılar nedeniyle tanıdık. Bu bölümümüzde bu yapıları JavaScript
tarafında nasıl kullanabileceğimizi inceleyeceğiz. Örneklerle konuya
girmeden önce hatırlatmak istediğim bir nokta var. ASP.NET AJAX
Extension ile beraber gelen JavaScript özelliklerini ve kütüphanelerini
kullanabilmeniz için bu özellikleri kullanacağınız sayfaların başında
birer ScriptManager yer alması şart. Sunucu kontrollerini kullanırken
zaten ScriptManager bulundurmak zorunda olduğumuzu biliyoruz, aynı durum
istemci taraflı işlevler için de geçerli.

<span>Type.registerNamespace(<span
style="color:#A31515; ">"Takim"</span>);</span>

Örneğimize başlarken yukarıdaki kodumuz ile ilk hamlede Takim adinda bir
kütüphane tanımlıyoruz. Bu şekilde bir kütüphane tanımladıkta sonra
kütüphaneye istediğimiz sayıda farklı özellik ve fonksiyon
tanımlayabiliriz. Bir takımımız için oyuncular tanımlayacağız.

<span>Takim.Oyuncu = <span style="color:blue; ">function</span>(adi,
soyadi, pozisyonu) {</span>\
 <span> <span style="color:blue; ">this</span>.\_adi = adi;</span>\
 <span> <span style="color:blue; ">this</span>.\_soyadi =
soyadi;</span>\
 <span> <span style="color:blue; ">this</span>.\_pozisyonu =
pozisyonu;</span>\
 <span>}</span>

Tanımladığımız yeni fonksiyonu Takim kütüphanesi içerisinde Oyuncu
sınıfına eşitliyoruz. Aslında Oyuncu diye bir sınıf yoktu, biz eşitleme
işlemini yaparken tanımlanmış oldu. Oyuncu fonksiyonunu toplam üç adet
parametresi var. Bu parametreler fonksiyonu ait iç değişkenlere
aktarılıyor. this. ile başlayan değişkenleri VB.NET'teki private
değişkenlere benzetebiliriz. ASP.NET AJAX kütüphanesi \_ (alt çizgi) ile
başlayan değişkenleri özel değişkenler olarak kabul edecek ve dışarıdan
ulaşılmalarına izin vermeyecektir. Peki bu değişkenlere dışarıdan nasıl
ulaşacağız?

<span>Takim.Oyuncu.prototype = {</span>\
 <span> </span>\
 <span> Adi: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_adi;</span>\
 <span> },</span>\
 <span> </span>\
 <span> Soyadi: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_soyadi;</span>\
 <span> },</span>\
 <span> </span>\
 <span> Detay: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_adi + <span
style="color:#A31515; ">', '</span> + <span
style="color:blue; ">this</span>.\_soyadi + <span
style="color:#A31515; ">', Pozisyonu:'</span> + <span
style="color:blue; ">this</span>.\_pozisyonu;</span>\
 <span> }</span>\
 <span>}</span>

Oyuncu sınıfına ait üç farklı fonksiyon, bir anlamda property (özellik)
ekliyoruz. Bu fonksiyonlar sınıf yapısının kendisine has
değişkenlerinden değerleri alarak dışarıya sunuyorlar. İçerideki
verileri dışa sunuş şekli konusunda istediğimiz gibi kod yazma şansımız
var. Örneğin Detay fonksiyonu oyuncunun adini, soyadini alarak
pozisyonunu da ekleyerek bir metin döndürüyor.

Tanımlamalarımızı bitirdikten sonra sıra geldi sınıfımızın kaydını
yapmaya.

Takim.Oyuncu.registerClass(<span
style="color:#A31515; ">'Takim.Oyuncu'</span>, <span
style="color:blue; ">null</span>, Sys.IDisposable);

Bu kayıt sayesinde yarattığımız sınıf üzerinden oluşturacağımız
değişkenler yine ASP.NET AJAX tarafından kontrol edilerek, gerektiğinde
(dispose) yok edilecek. Tüm bu kodları eğer web sayfanızın direk
içerisine yerleştireceksiniz yapmanız gereken ek bir işlem yok. Fakat
eğerki sizde benim gibi ayrı bir JavaScript dosyası kullanacaksınız
kesinlikle sonunda aşağıdaki satırın bulunması gerekiyor.

<span style="line-height:115%; color:blue; ">if</span><span
style="line-height:115%; "> (<span
style="color:blue; ">typeof</span>(Sys) !== <span
style="color:#A31515; ">'undefined'</span>)
Sys.Application.notifyScriptLoaded();</span>

Bu kod ile ScriptManager'ı JavaScript tanımlamalarımızın
tamamlandığından haberdar ediyoruz. JavaScript kodumuzu aşağıdaki
şekilde sonlandırıyoruz.

<span>Type.registerNamespace(<span
style="color:#A31515; ">"Takim"</span>);</span>\
 <span> </span>\
 <span>Takim.Oyuncu = <span style="color:blue; ">function</span>(adi,
soyadi, pozisyonu) {</span>\
 <span> <span style="color:blue; ">this</span>.\_adi = adi;</span>\
 <span> <span style="color:blue; ">this</span>.\_soyadi =
soyadi;</span>\
 <span> <span style="color:blue; ">this</span>.\_pozisyonu =
pozisyonu;</span>\
 <span>}</span>\
 <span> </span>\
 <span>Takim.Oyuncu.prototype = {</span>\
 <span> </span>\
 <span> Adi: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_adi;</span>\
 <span> },</span>\
 <span> </span>\
 <span> Soyadi: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_soyadi;</span>\
 <span> },</span>\
 <span> </span>\
 <span> Detay: <span style="color:blue; ">function</span>() {</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_adi + <span
style="color:#A31515; ">', '</span> + <span
style="color:blue; ">this</span>.\_soyadi + <span
style="color:#A31515; ">', Pozisyonu:'</span> + <span
style="color:blue; ">this</span>.\_pozisyonu;</span>\
 <span> }</span>\
 <span>}</span>\
 <span>Takim.Oyuncu.registerClass(<span
style="color:#A31515; ">'Takim.Oyuncu'</span>, <span
style="color:blue; ">null</span>, Sys.IDisposable);</span>\
 <span> </span>\
 <span style="line-height:115%; color:blue; ">if</span><span
style="line-height:115%; "> (<span
style="color:blue; ">typeof</span>(Sys) !== <span
style="color:#A31515; ">'undefined'</span>)
Sys.Application.notifyScriptLoaded();</span>

Son olarak hazırladığımız kütüphaneyi kullandığımız örnek bir sayfa ile
bölümümüzü tamamlayalım.

<span style="background:yellow; ">\<%</span><span
style="color:blue; ">@</span><span> <span
style="color:#A31515; ">Page</span> <span
style="color:red; ">Language</span><span
style="color:blue; ">="VB"</span> <span
style="background:yellow; ">%\></span></span>\
\
 <span style="color:blue; ">\<!</span><span
style="color:#A31515; ">DOCTYPE</span><span> <span
style="color:red; ">html</span> <span style="color:red; ">PUBLIC</span>
<span style="color:blue; ">"-//W3C//DTD XHTML 1.0
Transitional//EN"</span> <span
style="color:blue; ">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"\></span></span>\
 <span style="color:blue; "> </span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">html</span><span> <span
style="color:red; ">xmlns</span><span
style="color:blue; ">="http://www.w3.org/1999/xhtml"\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span> <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"</span> <span
style="color:red; ">src</span><span
style="color:blue; ">="client.js"\>\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="JavaScript"\></span></span>\
 <span> <span style="color:blue; ">function</span> Yarat() </span>\
 <span> {</span>\
 <span> <span style="color:blue; ">var</span> Oyuncum = <span
style="color:blue; ">new</span> Takim.Oyuncu( </span>\
 <span> <span style="color:#A31515; ">'Oyuncu Adi'</span>, <span
style="color:#A31515; ">'Oyuncu Soyadý'</span>, <span
style="color:#A31515; ">'Pivot'</span>);</span>\
 <span> alert(Oyuncum.Detay());</span>\
 <span> <span style="color:blue; ">return</span> <span
style="color:blue; ">false</span>;</span>\
 <span> }</span>\
 <span> <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; "> </span>\
 <span> <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat()"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="TIKLA"</span> <span
style="color:blue; ">/\>\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span> <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

Tüm yazdığımız JavaScript kodlarını Client.js adında bir dosyaya
kaydederek sayfamıza standard yollarla ekledikten sonra sayfa içi
JavaScript kodları ile kullanabiliyoruz. Kodumuzda Oyuncu sınıfından bir
Oyuncu türeterek adını, soyadını ve pozisyonunu da tanımladıktan sonra
oyuncuya ait Detay metodunu çalıştırarak aldığımız metni bir uyarı
kutusu ile gösteriyoruz.

**Sıralar**

Enumarations olarak bildiğimiz yapıları JavaScript tarafında da kullanma
şansımız var. Bunun için ilk olarak gerekli değerleri içeren
tanımlamalarımızı aşağıdaki şekilde yapmamız gerekiyor.

<span>Type.registerNamespace(<span
style="color:#A31515; ">"Sistem"</span>);</span>\
 <span> </span>\
 <span>Sistem.Renk = <span
style="color:blue; ">function</span>(){};</span>

İlk olarak yukarıdaki şekilde Sistem adında bir kütüphane tanımlayarak
içerisine boş bir Renk metodu ekliyoruz. Şimdi de Renk metodu içerisinde
Enumaration tanımlıyor olacağız.

<span>Sistem.Renk.prototype = </span>\
 <span>{</span>\
 <span> Mavi: 0x0000FF,</span>\
 <span> Yesil: 0x00FF00,</span>\
 <span> Beyaz: 0xFFFFFF </span>\
 <span>}</span>

Örneğimizde şimdilik üç adet renk tanımlayalım, karşılığında değer
olarak da renkler Hex karşılığını koyalım. Tanımlamalarımız bittiğine
göre sıra geldi kütüphaneye kaydımızı yaptırıp dosyamızı kapatmaya.

<span>Sistem.Renk.registerClass(<span
style="color:#A31515; ">"Sistem.Renk"</span>);</span>\
 <span> </span>\
 <span style="color:blue; ">if</span><span> (<span
style="color:blue; ">typeof</span>(Sys) !== <span
style="color:#A31515; ">'undefined'</span>)
Sys.Application.notifyScriptLoaded();</span>

JavaScript dosyamızın tam hali aşağıdaki şekilde olmalı;

<span>Type.registerNamespace(<span
style="color:#A31515; ">"Sistem"</span>);</span>\
 <span> </span>\
 <span>Sistem.Renk = <span
style="color:blue; ">function</span>(){};</span>\
 <span>Sistem.Renk.prototype = </span>\
 <span>{</span>\
 <span> Mavi: 0x0000FF,</span>\
 <span> Yesil: 0x00FF00,</span>\
 <span> Beyaz: 0xFFFFFF </span>\
 <span>}</span>\
 <span>Sistem.Renk.registerClass(<span
style="color:#A31515; ">"Sistem.Renk"</span>);</span>\
 <span> </span>\
 <span style="color:blue; ">if</span><span> (<span
style="color:blue; ">typeof</span>(Sys) !== <span
style="color:#A31515; ">'undefined'</span>)
Sys.Application.notifyScriptLoaded();</span>

Sayfamıza bu JavaScript dosyasını linklediğimizde aşağıdaki gibi
kullanabiliyor olacağız.

<span><span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span><span style="color:blue; ">function</span> Boya(Renk)</span>\
 <span> {</span>\
 <span> document.body.bgColor = eval(<span
style="color:#A31515; ">"Renkler."</span> + Renk);</span>\
 <span> }</span>\
 <span style="line-height:115%; "><span
style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>

Yukarıdaki kodumuzda yer alan Boya adındaki fonksiyon kendisine verilen
metin tipindeki renk adını alarak Renkler. metni ile birleştirerek eval
komutu ile JavaScript olarak çalıştıracak. Böylece JavaScript kodu
olarak Renkler.Mavi gibi kodlar ile önceden tanımladığımız Hex
değerlerine ulaşabiliyor olacağız.

Bir sonraki yazımda AJAX Extension'a ait istemci taraflı özelliklere,
JavaScript dizileri üzerinde çalışma yöntemleri ile devam ediyor
olacağız.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-9-8 tarihinde yayinlanmistir.*
