# ASP.NET AJAX Extension JavaScript İstemci Özellikleri (Bölüm 5 - Handler İşlemleri)
ASP.NET AJAX ile beraber gelen JavaScript özelliklerine değindiğimiz
yazı serisinin son yazısında JavaScript handler işlemlerine bakacağız.
ASP.NET sunucu tarafındaki handler yaratmak bizim için çok kolay.
Oluşturduğumuz herhangi bir Sub'ın tanımının sonuna handles yazdığımızda
olası seçenekler karşımıza çıkıyor. Ayrıca otomatik olarak gerekli
kodların eklenmesini de sağlayabiliyoruz. AddHandlers metodu sunucu
tarafında kullandığımız metodlardan biri. JavaScript ile istemci
tarafında da bu tarz işlemler yapmamız mümkün. Bir düğmenin
tıklandığında hangi komutları çalıştıracağına yine istemci tarafında
JavaScript ile karar verebiliyoruz. Gelin kullanabileceğimiz metodlara
ufak örnekler ile bakalım.

**\$addHandler Metodu**

Sayfa içerisindeki HTML elementlerinin farklı durumlarına handler'lar
atamak için \$addHandler metodunu kullanıyor olacağız. Başındaki \$
işaretinden de anlaşılacağı üzere bu bir kısayol metodu. Metodun tam
yolu **Sys.UI.DomEvent.addHandler** şeklinde. Örneğimizde bir düğmenin
onclick durumunda hangi JavaScript komutunu çalıştıracağına yine başka
JavaScript komutları ile karar veriyor olacağız. Bunun için bagla
adındaki bir JavaScript fonksiyonu kullanacağız ve söz konusu fonksiyon
sayfanın ilk açılışında çalışıyor olacak.

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
style="color:#A31515; ">script</span><span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"\></span></span>\
 <span style="color:blue; ">function</span><span> Uyari()</span>\
 <span>{</span>\
 <span>    alert(<span style="color:#A31515; ">"Düğmeye
basıldı"</span>);</span>\
 <span>}</span>\
 <span style="color:blue; ">function</span><span> Bagla()</span>\
 <span>{</span>\
 <span>    \$addHandler(\$get(<span
style="color:#A31515; ">"Button1"</span>), <span
style="color:#A31515; ">'click'</span>, Uyari);</span>\
 <span>}</span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; "> </span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">html</span><span> <span
style="color:red; ">xmlns</span><span
style="color:blue; ">="http://www.w3.org/1999/xhtml"\></span></span>\
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
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span> <span
style="color:red; ">onload</span><span
style="color:blue; ">="Bagla();"\></span></span>\
 <span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span><span
style="color:blue; ">\></span></span>\
 <span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="button"</span> <span
style="color:blue; ">/\>\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Yukarıdaki örneğimizde sayfanın başında **body** tagına verdiğimiz
**onload** durumunda çalışan **Bagla** fonksiyonu devreye giriyor.
Sonrasında **Bagla** fonksiyonu içerisindeki kodumuz ile **Button1'in**
**click** durumuna **Uyari** adındaki JavaScript fonksiyonumuzu
aktarıyoruz. Böylece bir sonraki aşamada artık düğmeye basıldığında
**Uyari** fonksiyonu çalışıyor olacak.

**\$addHandlers Metodu**

Bir önceki bölümde incelediğimiz addHandler metodu ile birden çok
handler eklerken kullanabileceğimiz bir diğer method da addHandlers
metodu. Birden çok handlerı bir HTML elementine eklemek için tek
yapmamız gereken listemizi aşağıdaki formatta hazırlayarak addHandlers
metoduna aktarıyor olmak.

{click:Uyari, mouseover:Tikla, mouseout:Dugme}

Listemizi handler isimleri ve çalışacak JavaScript fonksiyonlarının
isimlerinden yukarıdaki şekilde hazırladıktan sonra addHandlers metodunu
aşağıdaki şekilde kullanabiliyoruz.

<span style="">\$addHandlers(\$get(<span
style="color:#A31515; ">"Button1"</span>), {click:Uyari,
mouseover:Tikla, mouseout:Dugme});</span>

addHandlers metoduna verdiğimiz ilk parametre handler'ları eklemek
istediğimiz HTML elementinin kendisi. İkinci parametremiz için bir
önceki aşamada hazırladığımız handler listemiz.

**\$removeHandler Metodu **

Handler'ları kontrollerimize ekledikten sonra bazı durumlarda çıkarmak
da isteyebiliriz. Örneğin bir düğmeye bir defa basılacak ise handler'ını
kaldırarak bir daha basılmasını engelleyebiliriz. Bu durumda
kullanacağımız metodun adı \$removeHandler şeklinde. Metodumuzun
kullanım şekli aşağıdaki gibi;

\$removeHandler(\$get(<span style="color:#A31515; ">"Button1"</span>),
<span style="color:#A31515; ">"mouseover"</span>, Tikla);

\$removeHandler metodu bizden toplamda üç parametre alıyor. Bu
parametrelerden ilki handler'ı kaldıracağımız HTML elementinin kendisi.
İkinci parametre ise handlerın adı. Biz kodumuzda söz konusu HTML
elementinden **mouseover** handler'ını kaldırıyoruz. Son parametre
olarak da handler olan JavaScript fonksiyonunun adını veriyoruz.

**\$clearHandlers**

Peki HTML elementimizden tüm handler'ları kaldırmak istiyorsak ne
yapabiliriz? İşte bu noktada \$clearHandlers metodunu kullanabiliriz.
Söz konusu metod parametre olarak sadece hedef HTML kontrolünü alıyor.
Sonrasında HTML elementine ait tüm handler'lar temizleniyor.

<span>    \$clearHandlers(\$get(<span
style="color:#A31515; ">"Button1"</span>));</span>

Yukarıdaki kodumuz kendisine aktarılan Button1 elementinden tüm
handler'ları siliyor.

**Sonuç**

ASP.NET AJAX Extension ile beraber gelen JavaScript özelliklerini
incelediğimiz bu yazı serimiz boyunca ilk olarak sınıf, üye ve kütüphane
yapılarını inceledik, enumaration yapısını kullandık. Sonrasında
JavaScript dizileri üzerinde çalışırken bize kolaylık sağlayabilecek
yeniliklerden bahsettik. Metin, tarih ve sayısal değişkenlerle ilgili
yeni JavaScript fonksiyonlarını da inceledikten sonra DOM üzerinde HTML
elementlerine ulaşabilmemizi ve görsel özelliklerini değiştirebilmemizi
sağlayacak JavaScript yenilikleri ile ilgili örnekler yaptık. Son olarak
bu yazımızda da handler işlemlerinden bahsettik.

Tüm bu yeni JavaScript olanakları ile istemci taraflı programlama
yapmanın kolaylaştığından bahsetmek hiç de yanlış olmaz. AJAX Extension
ile gelen bu yeniliklerle hepinize yeni projelerde başarılar dilerim ;)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-9-12 tarihinde yayinlanmistir.*
