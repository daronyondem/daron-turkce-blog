# AJAX Web Sitelerinde Tarayıcıda Geri/İleri Düğmesi Sorunu
İnternet tarayıcılarındaki **Geri** ve **İleri** düğmelerinin ne kadar
çok kişi tarafından kullanıldığını ilk AJAX web projelerinin
kullanıcılarına teslim edilmesi ile anladım. Neredeyse herkes bu
düğmelerin çalışmamasından şikayetçiyi (Haklılardı). AJAX altyapısı
üzerine kurduğumuz web sitelerinde performansı arttırmak amacıyla
olabildiğince işlemleri AJAX tekniği ile yapmaya çalışıyoruz. Bu durumun
iki sakıncası var; birincisi web sitesi içerisindeki farklı konumlar
için farklı adresler oluşmuyor. Kullanıcı web sitemizde onlarca düğmeye
tıklayarak iç kısımlarda biryerlere ulaşmış olabiliyor fakat sayfa hiç
yenilenmediği için ulaştığı noktanın bir adresi (URL) olmuyor. İkinci
sakıncası ise makalemin ana nedeni olan ve bir önceki nedenden
kaynaklanan, tarayıcılardaki Geri ve İleri düğmelerinin çalışmaması.
Sayfanın adresi değişmediği için hiçbir internet tarayıcı sayfanın
içerisindeki değişiklikleri adres geçmişine eklemiyor ve bu nedenle
geriye veya ileriye gidiş de mümkün olmuyor.

Peki ne yapabiliriz? İlk aşamada sayfanın adresini değiştirmek için
sayfa içi çapalar (linkler) kullanabiliriz. Bu tarz linkleri aşağıdaki
şekilde tanımlayabilirsiniz. Normal adresin sonuna bir \# işareti ile
eklenirler ve adresein bu kısmının değişmesi için sayfanın yenilenmesi
gerekmez.

http://www.biradres.com/birdosya.aspx?ID=2\#Capa

Güzel bir taktik olduğu kesin fakat maalesef yukarıdaki şekliyle
yaratılan adresler Internet Explorer içerisinde sayfa geçmişine
eklenmeyebiliyor (IE sürümüne bağlı). Bizim tüm tarayıcılarla uyumlu
olmamız şart. Bu durumda Internet Explorer için farklı bir teknik
kullanmamız gerekecek. Sayfanın içerisine gizli bir **IFRAME** (Satır
içi çerçeve) ekleyerek **IFRAME** içerisindeki dosyanın adresini
değiştirebiliriz. Bu durum Internet Explorer'da adres geçmişine yeni bir
sayfay eklemek için yeterli olacaktır. Tek yapmamız gereken sayfamızı
yenileyen AJAX komutlarının başına **IFRAME** adresini de değiştiren bir
kod eklemek. Peki **Geri** veya **İleri** düğmelerine basıldığını nasıl
anlayacağız? **IFRAME** içerisinde kullanacağımız adres gerçek bir
sayfaya yönlenecek ve eğer tarayıcıdaki düğmeler ile bu sayfa değişmişse
bir üst seviyedeki ana sayfaya JavaScript ile bir parametre gönderecek.
Böylece ana sayfa AJAX teknikleri ile kendini eski haline çevirecek.

Merak etmeyin, biz bunları tek tek yapmayacağız. Onun yerine bu konuda
işimizi çok kolaylaştıracak bir sunucu kontrolü kullanacağız.
Bahsettiğim kontrolün adı **UpdateHistory**. Aşağıdaki adresten kontrol
paketini indirebilirsiniz. Paket içerisinde yer alan
**nStuff.UpdateControls.dll** dosyasını **Toolbox** içerisine ekleyerek
projenizdeki herhangi bir sayfaya sürükle&bırak tekniği ile kontrolü
ekleyebilirsiniz.

<http://www.nikhilk.net/Content/Samples/UpdateControls.zip>

Kontrolü sayfaya eklediğinizde aşağıdaki şekilde gözükecektir. Kontrol
üzerinde yapmamız gereken hiçbir ayar yok.

<span><span style="color:blue; ">\<</span><span
style="color:#A31515; ">nStuff</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdateHistory</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="**UpdateHistory1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">nStuff</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdateHistory</span><span
style="color:blue; ">\></span>

Sayfa içerisinde ayrıca deneme amaçlı olarak bir **UpdatePanel**
bulunduralım. UpdatePanel içerisine bir düğme ve bir de **Label**
yerleştirelim. Düğmeye her tıklandığında **Label** içerisindeki sayısal
değeri alıp üzerine bir ekleyip geri döndürsün. Böylece sürekli içeriği
değişen bir **UpdatePanel** sahibi olmuş oluruz.

<span><span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="**UpdatePanel1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span><span style="color:blue; ">  \<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
 <span><span style="color:blue; ">    \<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**etiket**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span>0<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\></span></span>\
 <span><span style="color:blue; ">    \<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="**dugme**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">OnClick</span><span
style="color:blue; ">="dugme\_Click"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="TIKLA"</span> <span
style="color:blue; ">/\></span></span>\
 <span><span style="color:blue; ">   \</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span>

Yukarıdaki kod içerisinde düğmeye tıklandığında **etiket** adındaki
**Label** içerisindeki değeri alarak bir arttıracağımızdan bahsetmiştik.
Arttırma işlemini yaparken aslında sayfanın içeriği değiştiği için
gerekli kaydın tarayıcıya ait sayfa geçmişi listesine de eklenmesini
istiyoruz. Böylece **İleri** ve **Geri** düğmeleri ile site içerisinde
gezebileceğiz. Bunun için aşağıdaki kodu yazıyor olacağız.

<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> dugme\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs)</span>\
<span>        etiket.Text = <span
style="color:blue; ">CInt</span>(etiket.Text) + 1</span>\
<span>        UpdateHistory1.**AddEntry**(<span
style="color:blue; ">CInt</span>(etiket.Text))</span>\
     <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span>

Yukarıdaki kodun ilk satırı bize yabancı değil. İkinci satıra
baktığımızda ise **UpdateHistory** kontrolüne ait **AddEntry** metodunu
kullandığımızı görüyoruz. Bu metoda vermiş olduğumuz tek parametre olan
metin değeri sayfanın adresine, \# işaretinden sonrasına ekleyecek.
Tarayıcıda ileri veya geri düğmelerine basıldığında bizim sayfayı tekrar
eski haline göre düzenlememiz için geriye yine bu veri döndürülecek.
Veritabanına bağlı gerçek bir örnekte sayfada gösterilen veriyi bir
veritabanı tablosundan Birincil Anahtar (Primary Key) değerini sorguyla
göndererek aldığınızı düşünelim. Bu durumda **AddEntry** komutu ile
adrese ekleyeceğimiz veri **Primay Key'in** ta kendisi olmalıdır.
Böylece bir sonraki adımda göreceğimiz üzere sayfa kullanıcı tarafından
ileri ve geri düğmeleri ile değiştirildiğinde adresin \# işaretinden
sonraki kısmına bakarak sayfaya kolaylıkla veri yerleştirebiliriz.

Son olarak gelelim kullanıcının ileri ve geri düğmelerini kullandığında
sayfanın nasıl eski haline dönüştürüleceğine. Bu işlemi yapmak için
**UpdateHistory** kontrolüne ait **Navigate** metodunu kullanacağız. Söz
konusu metod bize hedef sayfanın **EntryName** değerini döndürüyor
olacak.

<span><span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> UpdateHistory1\_Navigate(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> nStuff.UpdateControls.HistoryEventArgs)
<span style="color:blue; ">Handles</span>
UpdateHistory1.**Navigate**</span>\
 <span>   <span style="color:blue; ">If</span> <span
style="color:blue; ">String</span>.IsNullOrEmpty(**e.EntryNam**e) =
<span style="color:blue; ">False</span> <span
style="color:blue; ">Then</span></span>\
 <span>      etiket.Text = e.EntryName</span>\
<span>   <span style="color:blue; ">Else</span></span>\
<span>      etiket.Text = <span
style="color:#A31515; ">"0"</span></span>\
<span>   <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
 <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span>

Kodumuz içerisinde ilk olarak gelen parametrenin boş olup olmadığını
kontrol ediyoruz. Eğer sayfa ilk defa açılıyorsa söz konusu parametre
boş olacaktır. Bu durumda **etiket** adındaki **Label** içerisine 0
yazmamız yeterli. Eğer **UpdateHistory** tarafından bize döndürülen
**EntryName** boş değilse kullanıcı bir şekilde **Geri** veya **İleri**
düğmelerini kullanmış demektir. Kullanıcının hangi sayfaya gitmek
istediğini **EntryName** değişkeni ile anlıyorum. Benim örneğimde bu
veriyi direk **etiket** içerisine yazdırıyorum. Veritabanına bağlı
gerçek bir örnekte siz geri dönen **Primary Key** verinize göre
veritabanından gerekli içeriği çekerek sayfaya yerleştirebilirsiniz.

Son olarak projemin doğru çalışıp çalışmadığını kontrol etmek için
**UpdatePanel** dışına da bir **Label** yerleştirerek sayfa açılışında
mevcut saat bilgisini yazdırdım. Böylece sadece UpdatePanel içeriği mi
yenileniyor yoksa tüm sayfa mı yenileniyor anlayabileceğim.

Son hali ile sayfanın HTML kodu aşağıdaki şekilde;

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
<span style="background:yellow; ">\<%</span><span
style="color:blue; ">@</span><span> <span
style="color:#A31515; ">Register</span> <span
style="color:red; ">Assembly</span><span
style="color:blue; ">="nStuff.UpdateControls"</span> <span
style="color:red; ">Namespace</span><span
style="color:blue; ">="nStuff.UpdateControls"</span> <span
style="color:red; ">TagPrefix</span><span
style="color:blue; ">="nStuff"</span> <span
style="background:yellow; ">%\></span></span>\
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
style="color:#A31515; ">ajaxToolkit</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ToolkitScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">nStuff</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdateHistory</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="UpdateHistory1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">nStuff</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdateHistory</span><span
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
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="etiket"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span>0<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\></span></span>\
<span>                    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="dugme"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">OnClick</span><span
style="color:blue; ">="dugme\_Click"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="TIKLA"</span> <span
style="color:blue; ">/\></span></span>\
<span>                <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span></span>\
<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Label</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Label1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="Label"\>\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">Label</span><span
style="color:blue; ">\>\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Sayfamızın Code-Behind kısmı da aşağıdaki gibi sonlandı.

<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Class</span> \_Default</span>\
<span>    <span style="color:blue; ">Inherits</span>
System.Web.UI.Page</span>\
<span> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> dugme\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs)</span>\
<span>        etiket.Text = <span
style="color:blue; ">CInt</span>(etiket.Text) + 1</span>\
<span>        UpdateHistory1.AddEntry(<span
style="color:blue; ">CInt</span>(etiket.Text))</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; "> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> Page\_Load(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs) <span
style="color:blue; ">Handles</span> <span
style="color:blue; ">Me</span>.Load</span>\
<span>        Label1.Text = <span
style="color:blue; ">Date</span>.Now.ToLongTimeString</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; "> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> UpdateHistory1\_Navigate(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> nStuff.UpdateControls.HistoryEventArgs)
<span style="color:blue; ">Handles</span>
UpdateHistory1.Navigate</span>\
<span>        <span style="color:blue; ">If</span> <span
style="color:blue; ">String</span>.IsNullOrEmpty(e.EntryName) = <span
style="color:blue; ">False</span> <span
style="color:blue; ">Then</span></span>\
<span>            etiket.Text = e.EntryName</span>\
<span>        <span style="color:blue; ">Else</span></span>\
<span>            etiket.Text = <span
style="color:#A31515; ">"0"</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; ">End</span><span> <span
style="color:blue; ">Class</span></span>

Çözümümüz ile aslında sadece Geri ve İleri tuşları ile ilgili sorunu
çözmedik. Ayrıca AJAX uygulamalarında her sayfanın ayrı adreslerinin
olmaması sorununu da çözdük. Kopyala - Yapıştır tekniği ile adresler \#
işaretinden sonraki kısımları ile beraber taşındıklarında başka bir
tarayıcıda denenmeleri durumda sayfa doğru konumda açılacaktır.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-8-25 tarihinde yayinlanmistir.*
