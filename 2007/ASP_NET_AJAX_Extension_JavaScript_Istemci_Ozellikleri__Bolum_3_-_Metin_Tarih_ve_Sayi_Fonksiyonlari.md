# ASP.NET AJAX Extension JavaScript İstemci Özellikleri (Bölüm 3 - Metin, Tarih ve Sayı Fonksiyonları)
ASP.NET AJAX Extension ile gelen JavaScript özelliklerini incelediğimiz
serimize devam ediyoruz. Bu sefer inceleyeceklerimiz arasında farklı
değişken tiplerine özel olarak gelen ve bizim aslında çoğuna .NET
tarafında alışkın olduğumuz metodlar var.

**String.endsWith ve String.startsWith**

Herhangi bir JavaScript değişkenine eğer metin tipinde bir değer
aktarılmış ise başlangıç veya son kısmında belirli bir metnin bulunup
bulunmadığını kontrol etmek için String.endsWith ve Strings.startsWith
metodlarını kullanabilirsiniz. Bu metodlar daha önceki yazılarımızda
bahsettiğimiz metodlardan farklı olarak direk değişkenlerin tanımına
ekleniyor. Sanırım ufak bir uygulama ile konuyu hızlıca
netleştirebiliriz.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> Metin = <span
style="color:#A31515; ">"Daron Yöndem"</span>;</span>\
 <span>        alert(Metin.startsWith(<span
style="color:#A31515; ">"Daron"</span>));</span>\
 <span>        <span style="color:green; ">// Sonuc =
True</span></span>\
 <span>        alert(Metin.endsWith(<span
style="color:#A31515; ">"m"</span>));</span>\
 <span>        <span style="color:green; ">// Sonuc =
True</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Kodumuz içerisinde Button1 düğmesine tıklandığında çalıştırılan Yarat
JavaScript fonksiyonu bir metin değişkeni yarattıktan sonra direk
değişken üzerinden Metin.startsWith şeklinde bir kullanım ile değişkenin
belirli bir metin ile başlayıp başlamadığını veya sonlanıp
sonlanmadığını kontrol ediyor. Metodları direk değişken üzerinden
kullandığımız için metodlara verdiğimiz tek parametre aratmak
istediğimiz metnin kendisi. Sonuç olarak her iki metod da True veya
False şeklinde birer Boolean değer döndürüyorlar.

**String.trim, String.trimEnd ve String.trimStart**

Trim fonksiyonu .NET tarafında sıkça kullandığımız tanıdık
fonksiyonlardan biri. Artık bu fonksiyonu JavaScript tarafında da
rahatlıkla kullanabiliyoruz. Trim fonksiyonuna ek olarak trimEnd ve
trimStart adında metin değişkenlerinin başındaki veya sonundaki
boşlukları silen fonksiyonlar da mevcut. Standard Trim fonksiyonumuz
.NET'te olduğu gibi metnin hem başındaki hem de sonunda boşlukları
siliyor.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> Metin = <span
style="color:#A31515; ">"    Yondem    "</span>;</span>\
 <span>        alert(<span style="color:#A31515; ">"x"</span> +
Metin.trim() + <span style="color:#A31515; ">"x"</span>);</span>\
 <span>        <span style="color:green; ">// Sonuc =
"xYondemx"</span></span>\
 <span>        alert(<span style="color:#A31515; ">"x"</span> +
Metin.trimEnd() + <span style="color:#A31515; ">"x"</span>);</span>\
 <span>        <span style="color:green; ">// Sonuc = "x   
Yondemx"</span></span>\
 <span>        alert(<span style="color:#A31515; ">"x"</span> +
Metin.trimStart() + <span style="color:#A31515; ">"x"</span>);</span>\
 <span>        <span style="color:green; ">// Sonuc = "xYondem   
x"</span></span>\
 <span>        alert(Metin.toLowerCase());</span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

Tüm örneklerimizdeki ile aynı yapıyı kullanarak yine sayfada bulunan bir
düğmeye tıklayarak Yarat JavaScript fonksiyonunu çalıştırıyor olacağız.
Fonksiyonumuz kendi tanımladığı bir metin değişkenine hem başında hem de
sonunda bolca boşluk olan bit metin aktararak sırasıyla hem başında hem
sonunda boşlukları silerek tüm Trim metodlarını deniyor ve sonuçları
kullanıcıya gösteriyor. Özellikle sonucu kullanıcıya gösterirken
boşluklar daha net gözüksün diye metinlerine başında ve sonunda ekstra
olarak birer x harfi koydum. Oluşan sonuçları ayrıca kod içerisindeki
yorum satırlarında da görebilirsiniz.

**String.format**

String.format metodu özellikle bir metnin içerisinde başka metinler
yerleştirmek için sıkça kullandığımız metodlardan biri. Sunucu
tarafındaki kullanımı ile aynı şekilde artık istemci tarafında da bu
metodu kullanma şansımız var.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> ay = <span
style="color:#A31515; ">"Ocak"</span>;</span>\
 <span>        <span style="color:blue; ">var</span> gun = <span
style="color:#A31515; ">"Pazartesi"</span>;</span>\
 <span>        <span style="color:blue; ">var</span> Metin =
String.format(<span style="color:#A31515; ">"Bugün aylardan {0} ve
günlerden {1}"</span>, ay, gun);</span>\
 <span>        alert(Metin);</span>\
 <span>        <span style="color:green; ">// Sonuc = Bugün aylardan
Ocak ve günlerden Pazartesi</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

Sayfadaki düğmeye basıldığında çalışacak olan Yarat fonksiyonumuz kendi
içerisinde tanımlanan ay ve gun değişkenleri içerisindeki metinleri
String.format ile başka bir metnin içerisine yerleştirecek ve sonrasında
da Metin değişkenine aktaracak. String.format metoduna verdiğimiz metin
içerisinde süslü tırnak işaretleri arasında indeks numaraları yer
alıyor. Sıfırdan başlayarak devam eden bu numaralar ile aynı sırada bu
numaraların metin içerisindeki yerlerine yerleşecek olan değerleri
taşıyan değişkenleri de parametre olarak String.format metoduna vermemiz
gerekiyor.

**String.toLowerCase ve String.toUpperCase**

Herhangi bir metni istemci tarafında büyük harften küçüğe veya küçük
harften büyük harfe çevirmek için kullanabileceğimiz CSS özelliklerinin
yanı sıra JavaScript tarafında da kullanabileceğimiz alternatiflerimiz
mevcut. String.toLowerCase metodu direk değişkenlerin isimleri ile
beraber kullanılarak geriye küçük harflerden oluşan bir metin
döndürüyor. Aynı şekilde .toUpperCase metodu da geriye büyük harflerden
oluşan metinler döndürebiliyor. Örneğimizle devam edelim.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> buyuk = <span
style="color:#A31515; ">"BUYUK HARFLERDI BUNLAR"</span>;</span>\
 <span>        <span style="color:blue; ">var</span> kucuk = <span
style="color:#A31515; ">"kucuk harflerdi bunlar"</span>;</span>\
 <span>        alert(buyuk.toLowerCase());</span>\
 <span>        <span style="color:green; ">//SONUC = "buyuk harflerdi
bunlar"</span></span>\
 <span>        alert(kucuk.toUpperCase());</span>\
 <span>        <span style="color:green; ">//SONUC = "KUCUK HARFLERDI
BUNLAR"</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

Örneğimizde iki farklı değişken yaratarak içlerine tamamen büyük
harflerden veya tamamen küçük harflerden oluşan metinler aktarıyoruz.
Sonrasında bu değişkenlerşn .toLowerCase veya .toUpperCase metodlarını
kullanarak harflerin durumunu değiştirerek kullanıcıya gösteriyoruz.
Alacağınız sonuçları kod içerisinde yorum satırlarında
inceleyebilirsiniz.

**String.indexOf**

Metin değişkenleri içerisinde belirli bir yazının tam olarak metnin
neresinde olduğunu öğrenmek istediğimizde sunucu tarafından alışık
olduğumuz .indexOf metodu artık istemci tarafında da yardımımıza
koşuyor. .indexOf metoduna parametre olarak aratmak istediğimiz metni
veriyoruz ve arattığımız metnin hedef metin içerisinde bulunduğu yerdeki
ilk karakterin indeks numarasını alabiliyoruz.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> buyuk = <span
style="color:#A31515; ">"Ahmet ile Mehmet gezmeye
gittiler."</span>;</span>\
 <span>        alert(buyuk.indexOf(<span
style="color:#A31515; ">"Mehmet"</span>));</span>\
 <span>        <span style="color:green; ">//SONUC = 10</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span> 

Kodumuz içerisindeki buyuk adındaki metin değişkeninde kısmen uzun bir
metin yer alıyor. Bu metin içerisinde bir kelimeyi aratarak kelimenin
başladığı harfin hedef metin içerisinde kaçıncı harften başladığını
bulabiliyoruz. Yukarıdaki örnek içerisinde .indexOf metodu geriye 10
değerini döndürerek aradığımız metnin hedef metin içerisinde onuncü
karakterden başlayarak yer aldığını belirtiyor.

**Date.format**

Sadece metin değişkenleri için değil, tarih değişkenleri için de güzel
yenilikler söz konusu. Örneğimizde bir metin değişkeni yaratarak
.toString metodu ile değerini kullanıcıya göstereceğiz. Sonra da söz
konusu metin değişkenine bir format uygulayarak tekrar kullanıcıya
göstereceğiz. Aradaki farkı hep beraber görelim.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Goster()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> tarih = <span
style="color:blue; ">new</span> Date();</span>\
 <span>        alert(tarih.toString() + <span
style="color:#A31515; ">"\<br\>"</span>);</span>\
 <span>        <span style="color:green; ">//SONUC = Fri Jan 16 16:50:31
UTC+0200 2007</span></span>\
 <span>        tarih = tarih.format(<span
style="color:#A31515; ">"d"</span>);</span>\
 <span>        alert(tarih.toString() + <span
style="color:#A31515; ">"\<br\>"</span>);</span>\
 <span>        <span style="color:green; ">//SONUC =
01/16/2007</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Goster();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

.format metodunu da önceki metodlar gibi direk değişkenler üzerinden
kullanabiliyoruz. Sunucu taraflı .NET programlamadan alışık olduğumuz
format değerlerini vererek aynı sunucu tarafında olduğu gibi istemci
tarafında da tarihlerin gösterilme biçimlerini değiştirebiliyoruz.

**Number.format**

Bu yazımızda son olarak sayıları istemci tarafında biçimlendirmek için
kullanabileceğimiz Number.format metoduna değineceğiz. Yazımızın konusu
haricinde olduğu için biçimlendirme metinleri ile ilgili detaylara
girmeyeceğim. Hızlı bir örnek ile JavaScript tarafında herhangi bir
sayıyı para değeri gibi göstermeyi deneyeceğiz. Gösterdiğimiz sayının
bin ayracı ve iki ondalık basamağı olacak.

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
style="color:blue; ">="http://www.w3.org/1999/xhtml"</span> <span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span>    <span style="color:blue; ">function</span> Yarat()</span>\
 <span>    {</span>\
 <span>        <span style="color:blue; ">var</span> sayi =
4390;</span>\
 <span>        alert(sayi.toString());</span>\
 <span>        <span style="color:green; ">//SONUC = 4390</span></span>\
 <span>        sayi = sayi.format(<span
style="color:#A31515; ">"c"</span>);</span>\
 <span>        alert(sayi.toString());</span>\
 <span>        <span style="color:green; ">//SONUC =
4,390.00</span></span>\
 <span>    }</span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="Tıkla"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="Yarat();"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

JavaScript ile yarattığımız sayısal bir değişkenin formatını .format
metodu ile parasal değere (currency) çevirerek kullanıcıya
gösterdiğimizde sayının binler ayracı ve iki ondalık basamağı olduğunu
görüyoruz.

Serimizin bu yazısında da metin, sayısal ve tarih değişkenlerine eklenen
JavaScript fonksiyonları göz attık. Bir sonraki yazıda JavaScript ile
DOM üzerinde yapabileceğimiz işlemlerle ilgili gelen yeniliklerden
bahsedeceğiz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-9-10 tarihinde yayinlanmistir.*
