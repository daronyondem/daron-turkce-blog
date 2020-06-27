---
FallbackID: 1763
Title: "İstemci Taraflı AJAX Yüklemelerini JavaScript ile İptal Etmek"
date: "2007-8-27"
EntryID: Istemci_Tarafli_AJAX_Yuklemelerini_JavaScript_ile_Iptal_Etmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, ASP.NET
old.EntryID: fe2e906e-af31-4f8f-93f6-705c34a24e05
---
# İstemci Taraflı AJAX Yüklemelerini JavaScript ile İptal Etmek
Farklı web sitelerinde AJAX ile sunucudan istemciye veri yükleme
teknikleri kullanmak performans açısından ciddi faydalar sağlarken bazen
kontrolün elden çıkmasına da neden olabiliyor. Herhangi bir AJAX
yüklemesi, yani **XMLHttpRequest** gerçekleşirken sunucu ile istemci
arasında bir trafik sorunu oluştuğunda sitemizin ziyaretçisi çaresizce
AJAX yüklemesinin bitmesini bekliyor. Oysa o yükleme hiç bitmeyecek. Bir
diğer senaryoda ise gerçekten sayfaya uzun sürecek bir bilgi yükleniyor
olabilir, bu durumda da aslında ziyaretçimize gerektiğinde bu yüklemeyi
iptal etme şansı tanıyabiliriz. İşte tüm bu işlemleri istemci tarafında
direk JavaScript kodları yazarak nasıl yapabileceğimizi makalemiz
boyunca inceliyor olacağız.

Gelin ilk olarak kullanacağımız örneğimizin sayfa tasarımını, mark-up
HTML kodunu oluşturalım.

<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="UpdatePanel1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>                <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Label1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\>\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\>\<</span><span style="color:#A31515; ">br</span>
<span style="color:blue; ">/\></span></span>\
 <span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Button1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span> <span
style="color:blue; ">="Yükle"</span> <span
style="color:red; ">OnClick</span><span
style="color:blue; ">="button1\_Click"</span> <span
style="color:blue; ">/\></span></span>\
 <span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Button2**"</span> <span
style="color:red; ">style</span><span
style="color:blue; ">="**visibility:hidden;**"</span> </span>\
 <span>                            <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="İptal"</span> <span
style="color:blue; ">/\></span></span>\
<span>                <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span>

Sayfamıza yerleştirdiğimiz UpdatePanel içerisinde toplam iki adet düğme
bulunuyor. Bu düğmelerden ilkini yükleme işlemini başlatmak için,
ikincisini ise iptal etmek için kullanacağız. İptal etmek için
kullanacağımız **Button2** düğmesinin ilk başta görünmez olması için CSS
özelliği olarak **visibility** değerini **hidden** şeklinde
düzenliyoruz. İleriki kodlarımızda herhangi bir yükleme başladığında
iptal düğmesini görünür hale getireceğiz. Düğmelerimizin yanı sıra
sayfaya bir de **Label1** adında etiket ekledik, bu etiket üzerine
farklı mesajlar yazdırıyor olacağız.

<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Class</span> \_Default</span>\
 <span>    <span style="color:blue; ">Inherits</span>
System.Web.UI.Page</span>\
<span> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> button1\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs)</span>\
<span>        System.Threading.Thread.Sleep(3000)</span>\
<span>        label1.Text = <span
style="color:blue; ">Date</span>.Now.ToLongTimeString</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; ">End</span><span> <span
style="color:blue; ">Class</span></span>

Sayfamızın Code-Behind kısmında sadece yukarıdaki kodu kullanacağız.
**Button1**, yani yükleme işlemini yapacak olan düğmemize tıklandığında
ilk olarak 3 saniye süreyle mevcut **Thread'i** uykuya alıyoruz. Böylece
örneğimizi denediğimizde AJAX yüklemesi üç saniye sürecek. Tabi siz bu
kodu gerçek projelerinizde kullanmamalısınız. Bizim örneğimizde gerçek
bir yükleme söz konusu olmadığı için kodumuzu simülasyon amacıyla
düzenledik. Yükleme işleminin sonunda **Label1** içerisine mevcut saat
bilgisini yazdırıyoruz.

AJAX sunucu kontrolleri kullanılacak her sayfada bir **ScriptManager**
bulunması gerektiğine dair kuralı hepimiz biliyoruz. Bunun nedeni sayfa
içerisindeki tüm AJAX işlemlerinden **ScriptManager'ın** sorumlu olması
ve tüm işlemlerin **ScriptManager'ın** kontrolünde ilerliyor olması. Bu
durumda biz de işlemlerin iptali gibi konularda **ScriptManager** ile
çalışmak durumundayız. Buradan itibaren yazacağımız tüm kodlar
JavaScript kodları olacak, fakat her zamanki gibi kodlarımızı sayfanın
**Header** (Baş) kısmına yazma şansımız yok. Yazacağımız tüm JavaScript
kodları **ScriptManager** ile gelen JavaScript özelliklerini kullanacağı
için sayfada da **ScriptManager'dan** sonra yer almaları gerekiyor.
Kabaca yapımız aşağıdaki şekilde olacak.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="**ScriptManager1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"\></span></span>\
 <span>      ** **</span>**<span style="color:#339900"> //JavaScript
kodlarımız buraya</span>**<span style="color:#339900"></span>\
 <span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="**UpdatePanel1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>                <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Label1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\>\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\>\<</span><span style="color:#A31515; ">br</span>
<span style="color:blue; ">/\></span></span>\
 <span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Button1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span> <span
style="color:blue; ">="Yükle"</span> <span
style="color:red; ">OnClick</span><span
style="color:blue; ">="button1\_Click"</span> <span
style="color:blue; ">/\></span></span>\
 <span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**Button2**"</span> <span
style="color:red; ">style</span><span
style="color:blue; ">="visibility:hidden;"</span> </span>\
 <span>                            <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="İptal"</span> <span
style="color:blue; ">/\></span></span>\
<span>                <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>

Gelelim yazacağımız JavaScript kodlarına ve anlamlarına. İlk olarak
sayfamızdaki **ScriptManager'a** gelen her AJAX isteğini kontrol altına
almak için bir **handler** eklememiz gerekiyor.

Sys.WebForms.PageRequestManager.getInstance().**add\_initializeRequest**(**DurumKontrol**);

Yukarıdaki kod içerisinde sayfadaki ScriptManager yani
**PageRequestManager'a** ait mevcut kopyayı (Instance) alıyoruz ve
**.add\_initializeRequest** metodu ile sayfada gerçekleşecek her bir
AJAX talebinde çalıştırılmak üzere kendi hazırladığımız bir fonksiyonu
atıyoruz. Fonksiyonumuzun adı **DurumKontrol** olacak ve aşağıdaki
şekilde oluşturuyor olacağız.

<span>        <span style="color:blue; ">function</span>
DurumKontrol(sender, args)</span>\
<span>        {</span>\
<span>            <span style="color:blue; ">var</span> **prm** =
Sys.WebForms.PageRequestManager.getInstance();</span>\
 <span>            <span style="color:blue; ">if</span>
(**args.get\_postBackElement().id** == <span
style="color:#A31515; ">**'Button2'**</span> &
**prm.get\_isInAsyncPostBack()**)</span>\
 <span>                {</span>\
<span>                    **prm.abortPostBack();**</span>\
 <span>                }</span>\
<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">**'Button1'**</span>)</span>\
 <span>                {</span>\
<span>                   ** args.set\_cancel(<span
style="color:blue; ">true</span>);**</span>\
 <span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleme devam ediyor..."</span>;</span>\
<span>                }</span>\
<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (!prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">**'Button1'**</span>)</span>\
 <span>                {</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleniyor..."</span>;</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Button2"</span>).style.visibility = <span
style="color:#A31515; ">"visible"</span>;</span>\
<span>                }</span>\
<span>        }</span>

Gelin şimdi bu fonksiyon içerisinde neler yaptığımıza tek tek bakalım.
İlk olarak yine fonksiyon içerisinde kullanmak üzere **prm** adında bir
değişken tanımlayarak sayfada kullanılan mevcut ScriptManager'a ait
**PageRequestManager** objesinin bir kopyasını, vekilini alıyoruz.

<span>            <span style="color:blue; ">if</span>
(args.**get\_postBackElement().id** == <span
style="color:#A31515; ">'Button2'</span> &
**prm.get\_isInAsyncPostBack())**</span>\
 <span>                {</span>\
<span>                    prm.**abortPostBack();**</span>\
 <span>                }</span>

Yukarıda inceleyebileceğimiz bir sonraki adımda kontrol ettiğimiz iki
durum söz konusu. Bunlardan ilki; **DurumKontrol** fonksiyonumuzun
çalışmasına neden olan kaynak AJAX talebinin sayfadaki hangi kontrolden
geliyor olduğu. **args.get\_postBackElement().id** komutu ile kaynak
kontrolün ID bilgisini alabiliyoruz. Eğer kaynak element **Button2**
ise, yani **İptal** düğmesine basılmış ise ve hali hazırda süregelen bir
AJAX asenkron veri aktarımı varsa hemen var olan aktarımı iptal etmemiz
gerekiyor. **prm.get\_isInAsyncPostBack()** komutu ile hali hazırda
süregelen bir AJAX asenkron yüklemesi olup olmadığı öğrenebiliriz. Her
iki durum da olumlu ise **prm.abortPostBack();** komutu ile süregelen,
yani aslında bir önceki yüklemeyi iptal ediyoruz.

<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">**'Button1'**</span>)</span>\
 <span>                {</span>\
<span>                   ** args.set\_cancel(<span
style="color:blue; ">true</span>);**</span>\
 <span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleme devam ediyor..."</span>;</span>\
<span>                }</span>

Bir sonraki adımda ek bir kontrol daha yapacağız. Eğer bir yükleme
yapılıyorsa ve kullanıcı hala **Yükle** düğmesine tıklıyorsa, bu sefer
de *"Yükleme devam ediyor..."* şeklinde bir uyarı göstererek yeni bir
yükleme başlatmamamızda fayda var. Bu mekanizmayı kurmak için de ilk
olarak süregelen bir yükleme var mı diye
**prm.get\_isInAsyncPostBack()** komutu ile kontrol ediyor ve eğer yeni
elimize ulaşan yükleme talebini de **Button1** oluşturmuş ise
**args.set\_cancel(<span style="color:blue; ">true</span>)** komutu ile
yeni gelen talebi geçersiz kılıyor, geri çeviriyoruz. Son olarak
sayfamızdaki **Label1** içerisine uygun bir mesaj aktarıyoruz.

<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (!prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">'Button1'</span>)</span>\
<span>                {</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleniyor..."</span>;</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Button2"</span>).style.visibility = <span
style="color:#A31515; ">"visible"</span>;</span>\
<span>                }</span>

Yapacağımız son kontrol aslında bir denetleme değil. Hatırlarsanız
örneğimizin başında tasarımımızı yaparken **İptal** düğmesini sayfada
görünmeyecek şekilde ayarlamıştık. Şimdi sıra geldi yeni bir yükleme
başladığınıda hemen **İptal** düğmemizi görünür hale getirmeye. Eğer
süregelen bir yükleme yoksa ve yeni bir yükleme işlemi **Button1**
aracılığı ile başlatılmış ise **Label1** içerisine *"Yükleniyor.."*
yazıyoruz ve **Button2'nin** **visibility** özelliğini **visible**
olarak değiştiriyoruz.

Sayfamızın tam kodunu aşağıdaki inceleyebilirsiniz.

<span style="background:yellow; ">\<%</span><span
style="color:blue; ">@</span><span> <span
style="color:#A31515; ">Page</span> <span
style="color:red; ">Language</span><span
style="color:blue; ">="VB"</span> <span
style="color:red; ">AutoEventWireup</span><span
style="color:blue; ">="true"</span> <span
style="color:red; ">CodeFile</span><span
style="color:blue; ">="Default.aspx.vb"</span> <span
style="color:red; ">Inherits</span><span
style="color:blue; ">="\_Default"</span> <span
style="background:yellow; ">%\></span></span>\
 \
<span style="color:blue; ">\<!</span><span
style="color:#A31515; ">DOCTYPE</span><span> <span
style="color:red; ">html</span> <span style="color:red; ">PUBLIC</span>
<span style="color:blue; ">"-//W3C//DTD XHTML 1.1//EN"</span> <span
style="color:blue; ">"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"\></span></span>\
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
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">script</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="text/javascript"</span> <span
style="color:red; ">language</span><span
style="color:blue; ">="javascript"\></span></span>\
<span>       
Sys.WebForms.PageRequestManager.getInstance().**add\_initializeRequest(DurumKontrol)**;</span>\
 <span>        </span>\
<span>        <span style="color:blue; ">function</span>
DurumKontrol(sender, args)</span>\
<span>        {</span>\
<span>            <span style="color:blue; ">var</span> prm =
Sys.WebForms.PageRequestManager.getInstance();</span>\
<span>            <span style="color:blue; ">if</span>
(args.**get\_postBackElement().id** == <span
style="color:#A31515; ">'Button2'</span> &
prm**.get\_isInAsyncPostBack()**)</span>\
 <span>                {</span>\
<span>                    **prm.abortPostBack();**</span>\
 <span>                }</span>\
<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">'Button1'</span>)</span>\
<span>                {</span>\
<span>                    **args.set\_cancel(<span
style="color:blue; ">true</span>);**</span>\
 <span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleme devam ediyor..."</span>;</span>\
<span>                }</span>\
<span>            <span style="color:blue; ">else</span> <span
style="color:blue; ">if</span> (!prm.get\_isInAsyncPostBack() &
args.get\_postBackElement().id == <span
style="color:#A31515; ">'Button1'</span>)</span>\
<span>                {</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Label1"</span>).innerHTML = <span
style="color:#A31515; ">"Yükleniyor..."</span>;</span>\
<span>                    \$get(<span
style="color:#A31515; ">"Button2"</span>).style.visibility = <span
style="color:#A31515; ">"visible"</span>;</span>\
<span>                }</span>\
<span>        }</span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">script</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="UpdatePanel1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>                <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Label1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\>\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\>\<</span><span style="color:#A31515; ">br</span>
<span style="color:blue; ">/\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span> <span
style="color:blue; ">="Yükle"</span> <span
style="color:red; ">OnClick</span><span
style="color:blue; ">="button1\_Click"</span> <span
style="color:blue; ">/\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Button2"</span> <span
style="color:red; ">style</span><span
style="color:blue; ">="visibility:hidden;"</span> </span>\
<span>                            <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="İptal"</span> <span
style="color:blue; ">/\></span></span>\
<span>                <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Sonuç olarak yukarıdaki teknikler ile sayfa içerisindeki tüm AJAX veri
transferi işlemlerine çok daha hakim bir yaklaşım ile çok daha kullanıcı
dostu bir web platformu oluşturarak web sitelerimizin ziyaretçilerini
biraz daha rahatlatabiliriz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-8-27 tarihinde yayinlanmistir.*
