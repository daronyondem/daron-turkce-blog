---
FallbackID: 1774
Title: "UpdatePanel.Update JavaScript Muadili"
date: "2007-9-5"
EntryID: UpdatePanel_Update_JavaScript_Muadili
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX
old.EntryID: 8353a00e-5035-4f21-a13d-56aa8c0e6419
---
ASP.NET AJAX Extension 1.0 ile beraber gelen **UpdatePanel** sunucu
kontrolü biz yazılım geliştiricilerin hayatını ciddi şekilde
kolaylaştırdı. Fakat maalesef **UpdatePanel'in** çok büyük bir eksiği.
UpdatePanel'in **UpdateMode** özelliği **Conditinal** olarak
düzenlendiğinde sunucu tarafında **UpdatePanel1.Update** gibi bir kod
ile herhangi bir UpdatePanel nesnesinin içeriğinin asenkron olarak
yenilenmesini sağlayabilirken bu işlemin istemci tarafından
tetiklenebilmesini sağlayacak hazır bir çözüm yok.

Makalemiz boyunca yukarıda bahsi geçen sorunu çözmek için nasıl bir
teknik kullanabileceğimize ve işimizi kolaylaştırmak için bu teknikleri
bizim için otomatik olarak kullanabilecek bir **Control Toolkit
Extender** kontrolünü nasıl programlayabileceğimize değineceğiz.

**UpdatePanel JavaScript Extender**

Sorunumuzun çözüm tekniklerine girmeden önce gelin makalemiz boyunca
hazırlayacağımız UpdatePanel JavaScript Extender kontrolünün kullanım
şekline bakalım.

<span>      <span style="color:blue; ">\<</span><span
style="color:#A31515; ">JS</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanelJavaScriptExtender</span> <span
style="color:red; ">**TargetControlID**</span><span
style="color:blue; ">="UpdatePanel1"</span> </span>\
 <span>                                        <span
style="color:red; ">**ClientCommand**</span><span
style="color:blue; ">="Guncelle"</span></span>\
 <span>                                        <span
style="color:red; ">ID</span><span
style="color:blue; ">="UpdatePanelJavaScriptExtender1"</span> </span>\
<span>                                        <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>      <span style="color:blue; ">\</</span><span
style="color:#A31515; ">JS</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanelJavaScriptExtender</span><span
style="color:blue; ">\></span></span>

Yukarıdaki kodumuz içerisinde **UpdatePanelJavaScriptExtender** için
tanımladığımız iki özellik yer alıyor. Bunlardan ilki
**TargetControlID** özelliği. Sayfamızda JavaScript komutları ile Update
etmek istediğimiz UpdatePanel'in ID bilgisini Extender kontrolümüzün
**TargetControlID** özelliğine aktarmak durumundayız. İkinci aşamada ise
karşımıza **ClientCommand** özelliği çıkıyor. JavaScript ile istemci
tarafında UpdatePanel'i Update ederken kullanmak isteyeceğimiz
JavaScript fonksiyonunun adını buraya parametre olarak vermemiz
gerekiyor. Bizim örneğimizde UpdatePanel1'i yenilemek için sayfada
**Guncelle** JavaScript fonksiyonunu kullanacağız. Kullanacağımız örneğe
ait tam sayfa HTML kodu aşağıdaki şekilde;

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
style="color:blue; ">="UpdatePanelJavaScript"</span> <span
style="color:red; ">Namespace</span><span
style="color:blue; ">="UpdatePanelJavaScript.UpdatePanelJavaScript"</span></span>\
<span>  <span style="color:red; ">TagPrefix</span><span
style="color:blue; ">="JS"</span> <span
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
<span>  <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span>  <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="**UpdatePanel1**"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
 <span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>          <span style="color:blue; ">\<</span><span
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
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\<</span><span
style="color:#A31515; ">JS</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanelJavaScriptExtender</span> <span
style="color:red; ">**TargetControlID**</span><span
style="color:blue; ">="**UpdatePanel1**"</span> </span>\
<span>                                        <span
style="color:red; ">**ClientCommand**</span><span
style="color:blue; ">="**Guncelle**"</span></span>\
<span>                                        <span
style="color:red; ">ID</span><span
style="color:blue; ">="**UpdatePanelJavaScriptExtender1**"</span>
</span>\
 <span>                                        <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>      <span style="color:blue; ">\</</span><span
style="color:#A31515; ">JS</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanelJavaScriptExtender</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="**Guncelle**(1);"</span> <span
style="color:blue; ">/\></span></span>\
 <span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>  <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Gördüğünüz gibi sayfamızda, içerisinde bir **Label** bulunan bir
UpdatePanel ve bir adet HTML Button bulunuyor. HTML buttonun **OnClick**
özelliğine **Guncelle** JavaScript fonksiyonumuz yerleştirilmiş. Burada
dikkat etmemiz gereken bir diğer nokta da aslında Guncelle fonksiyonuna
bir de parametre vermiş olmamış. UpdatePanelJavaScriptExtender
kontrolümüz sadece UpdatePanel'i yenilemek ile kalmayacak sunucu
tarafına parametre de aktarabiliyor olacak. Şimdi de sunucu tarafında
yazdığımız koda bakalım.

<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Class</span> \_Default</span>\
 <span>    <span style="color:blue; ">Inherits</span>
System.Web.UI.Page</span>\
<span> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> UpdatePanelJavaScriptExtender1\_Update
\_</span>\
<span>                            (<span
style="color:blue; ">ByVal</span> Sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
\_</span>\
<span>                            <span
style="color:blue; ">ByVal</span> E <span style="color:blue; ">As</span>
System.EventArgs, \_</span>\
<span>                            <span
style="color:blue; ">ByVal</span> **parameter** <span
style="color:blue; ">As</span> <span
style="color:blue; ">**String**</span>) \_</span>\
 <span>                            <span
style="color:blue; ">**Handles**</span>
**UpdatePanelJavaScriptExtender1.Update**</span>\
<span>        Label1.Text = **parameter**</span>\
 <span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="line-height:115%; color:blue; ">End</span><span
style="line-height:115%; "> <span
style="color:blue; ">Class</span></span>

UpdatePanelJavaScriptExtender kontrolümüzün **Update** adında bir durumu
(event) var. Bu durum biz istemci tarafında **Guncelle** fonksiyonumuzu
çalıştırdığımızda gerçekleşiyor olacak. Update durumunun getirdiği
parametrelere bakarsak arada **parametre** adında bir **String** değer
bulunduğunu görebiliriz. Bu değer bizim istemci tarafında **Guncelle**
fonksiyonuna verdiğimiz **1** değeri olacak. Kodumuz içerisinde gelen bu
değeri **Label1** içerisine yazıyoruz. Siz projelerinizde farklı
işlemler yapabilir veya farklı dinamik parametreler, hatta JSON olarak
serialize ederek her tür veriyi, objeyi gönderebilirsiniz.

**Peki Nasıl?**\

Nasıl oluyor da normal şartlarda UpdatePanel'in JavaScript ile Update
edilme özelliği yokken bizim UpdatePanelJavaScript Extender kontrolümüz
bunu yapıyor? Bir düşünelim; biz UpdatePanel içerisine bir **TextBox**
koysak ve **AutoPostBack** özelliğini **True** yapsak bu kontrol
içerisine birşey yazıldığında UpdatePanel'in yenilenmesini ve TextBox
içerisinde yazının da sunucu tarafına gönderilmesini sağlar mı?
Kesinlikle. Bu durumda gidelim UpdatePanel içerisine ekranda görünmeyen,
gizli bir TextBox ekleyelim. İstediğimiz zaman TextBox içine JavaScript
ile bir metin yazıp (parametremizi) sonra da TextBox'ın içeriği
değiştirildiğinde çalışan **onchanged** durumundaki JavaScript kodunu
çalıştıralım. Sonra da gidip sunucu tarafında TextBox'ın içindeki veriyi
alıp işlemlerimizi yapalım. İşte UpdatePanelJavaScript Extender
kontrolümüzün yaptığı da aslında bu. Ama bunların hepsini bizden gizli
olarak, bizi hiç uğraştırmadan yapıyor.

**İş Başına**

Kontrolümüzü kullanmak güzeldi, kolaydı ama bizim bu kontrolün nasıl
hazırlandığını ve hazırlanma aşamasında karşılaşılabilecek olası
sorunları da incelememiz şart. Yeni bir **ASP.NET AJAX Control Project**
açarak kodlarımızı yazmaya başlayabiliriz. İlk olarak gelin kontrolümüz
için yazdığımız JavaScript kodumuza yani kontrol projemizdeki JavaScript
dosyasının içeriğine bakalım.

<span style="color:green; ">/\*\*</span>\
 <span style="color:green; "> \* @author Daron Yöndem </span>\
<span style="color:green; "> \* @web http://daron.yondem.com</span>\
<span style="color:green; "> \*/</span>\
<span>Type.registerNamespace(<span
style="color:#A31515; ">'UpdatePanelJavaScript'</span>);</span>\
<span>UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior = <span
style="color:blue; ">function</span>(element) {</span>\
<span>   
UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.initializeBase(<span
style="color:blue; ">this</span>, [element]);</span>\
 <span>    <span style="color:green; ">//ClientCommand özelliğimiz için
iç bir değişken tanımladık.</span></span>\
 <span>    <span style="color:blue; ">this</span>.\_ClientCommandValue =
<span style="color:blue; ">null</span>;</span>\
<span>}</span>\
<span>UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.prototype =
{</span>\
<span>    initialize : <span style="color:blue; ">function</span>()
{</span>\
<span>       
UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.callBaseMethod(<span
style="color:blue; ">this</span>, <span
style="color:#A31515; ">'initialize'</span>);</span>\
<span>    },</span>\
<span>    dispose : <span style="color:blue; ">function</span>()
{</span>\
<span>       
UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.callBaseMethod(<span
style="color:blue; ">this</span>, <span
style="color:#A31515; ">'dispose'</span>);</span>\
<span>    },</span>\
 <span>    <span style="color:green; ">//ClientCommand özelliği için Set
ve Get JavaScript metodlarını tanımladık.</span></span>\
 <span>     get\_ClientCommand : <span
style="color:blue; ">function</span>() {</span>\
<span>        <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_ClientCommandValue;</span>\
<span>    },</span>\
<span>    set\_ClientCommand : <span
style="color:blue; ">function</span>(value) {</span>\
<span>        <span
style="color:blue; ">this</span>.\_ClientCommandValue = value;</span>\
<span>    }</span>\
<span>}</span>\
<span>UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.registerClass(<span
style="color:#A31515; ">'UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior'</span>,
AjaxControlToolkit.BehaviorBase);</span>\
 <span style="color:green; ">//JavaScript fonksiyonu çalıştırıldığında
burası çalışacak.</span>\
 <span style="color:green; ">//Buradaki Update JavaScript metodu
parametre olarak</span>\
 <span style="color:green; ">//parametremizi ve gizli TextBox'ın ID sini
alıyor.</span>\
 <span>UpdatePanelJavaScript.Update = <span
style="color:blue; ">function</span>(HiddenBoxID, parameter) {</span>\
<span>  <span style="color:green; ">//Gizli TextBox kontrolünü
buluyoruz.</span></span>\
<span>       <span style="color:blue; ">var</span> HiddenBox
=\$get(HiddenBoxID);</span>\
 <span>  <span style="color:green; ">//Parametre yoksa rastgele bir sayı
döndürelim.</span></span>\
 <span>       <span style="color:blue; ">if</span> (<span
style="color:blue; ">typeof</span>(parameter)==<span
style="color:#A31515; ">"undefined"</span>)</span>\
<span>       {</span>\
<span>             parameter = <span
style="color:#A31515; ">"RANDOMPARAM"</span> + Math.random();</span>\
<span>       };</span>\
 <span>       <span style="color:green; ">//Eğer bir önceki aktarılan
parametre ile </span></span>\
 <span>       <span style="color:green; ">//şimdiki aynı ise
parametremizin sonuna rastgele bir sayı ekliyoruz.</span></span>\
 <span>       <span style="color:blue; ">if</span> (HiddenBox.value ==
parameter)</span>\
<span>       {</span>\
<span>             parameter = parameter + <span
style="color:#A31515; ">"RANDOMPARAM"</span> + Math.random();</span>\
<span>       };</span>\
 <span>       <span style="color:green; ">//Parametremizi TextBox'ın
içine koyuyoruz.</span></span>\
 <span>       HiddenBox.value = parameter;</span>\
 <span>       <span style="color:green; ">//TextBox'ın onchange
özelliğinde JavaScript kodunu alıyoruz ve temizliyoruz.</span></span>\
 <span>       <span style="color:blue; ">var</span> MyCommand =
String(HiddenBox.onchange).replace(<span
style="color:#A31515; ">'function anonymous()\\n{\\n'</span>,<span
style="color:#A31515; ">''</span>);</span>\
<span>       MyCommand = MyCommand.replace(<span
style="color:#A31515; ">'\\n}'</span>,<span
style="color:#A31515; ">''</span>);</span>\
<span>       MyCommand = MyCommand.replace(<span
style="color:#A31515; ">'function onchange(event)
{\\njavascript:\\n'</span>,<span
style="color:#A31515; ">''</span>);</span>\
 <span>       <span style="color:green; ">//onchange durumundaki
JavaScript kodunu çalıştırıyoruz.</span></span>\
 <span>       eval(MyCommand);</span>\
<span>};</span>\

Olabildiğince satır arası yorumlar ile kodumuzda neler yaptığımıza
anlatmaya çalıştım. Özellikle birkaç önemli noktaya değinmekte fayda
var. JavaScript kodlarımız içerisinde UpdatePanelJavaScript Extender
kontrolümüz için **Update** adında bir fonksiyon tanımlıyoruz. Bu
fonksiyon içerisinde direk elimizdeki **TextBox** kontrolüne
ulaşamıyoruz. Eğer sayfamızda birden çok UpdatePanel JavaScript Extender
kontrolü varsa yukarıdaki JavaScript kodu sayfaya sadece bir defa
ekleniyor. Yani yukarıdaki kodun değişkenlere bağımlı olması şart. Bu
durumda biz de TextBox kontrolümüzün adını Update JavaScript
fonksiyonumuza parametre olarak vermeye karar verdik. Söz konusu Update
fonksiyonunu kullanacak başka bir JavaScript fonksiyonu oluşturmayı ve
TextBox kontrolümüzü UpdatePanel'in içerisine eklemeyi sunucu
tarafındaki kodumuzla bir sonraki aşamada yapıyor olacağız.

JavaScript kodumuz ayrıca kendisine verilen parametrenin bir önceki
parametre ile yani TextBox kontrolünün içeriği ile aynı olup olmadığını
da kontrol ediyor. Eğer aynı ise sonuna rastgele bir sayı ekliyor, bu
rastgele sayıyı da sunucu tarafında siliyor olacağız. Neden böyle birşey
yapmaya ihtiyaç duyduğumuza gelince; maalesef TextBox'ın içeriği
değişmez ise **onchange** durumunu çalıştıramıyoruz. O nedenle aynı
parametre gönderildiğinde de bir Update sağlayabilmek için sonuna
rastgele bir sayı ekleyerek değiştirmiş gibi davranmamız gerekiyor. Son
olarak kodumuzla gizli TextBox'ımızın **onchange** JavaScript kodunu
alarak ve temizleyerek kendimiz çalıştırıyoruz.

Şimdi geçelim sunucu tarafındaki Extender kodumuza.

<span style="color:blue; ">Imports</span><span> System</span>\
<span style="color:blue; ">Imports</span><span>
System.ComponentModel</span>\
<span style="color:blue; ">Imports</span><span> System.Web.UI</span>\
<span style="color:blue; ">Imports</span><span>
System.Web.UI.WebControls</span>\
<span style="color:blue; ">Imports</span><span>
AjaxControlToolkit</span>\
<span> </span>\
<span>\#<span style="color:blue; ">Region</span> <span
style="color:#A31515; ">"Assembly Resource Attribute"</span></span>\
<span>\<Assembly: System.Web.UI.WebResource(<span
style="color:#A31515; ">"UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.js"</span>,
<span style="color:#A31515; ">"text/javascript"</span>)\> </span>\
<span>\#<span style="color:blue; ">End</span> <span
style="color:blue; ">Region</span></span>\
<span style="color:blue; "> </span>\
<span style="color:blue; ">Namespace</span><span>
UpdatePanelJavaScript</span>\
<span> </span>\
<span>    \<Description(<span style="color:#A31515; ">"Creates
JavaScript interface simulating UpdatePanel.Update()"</span>)\>
\_</span>\
<span>    \<Designer(<span
style="color:blue; ">GetType</span>(UpdatePanelJavaScriptDesigner))\>
\_</span>\
<span>    \<ClientScriptResource(<span
style="color:#A31515; ">"UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior"</span>,
<span
style="color:#A31515; ">"UpdatePanelJavaScript.UpdatePanelJavaScriptBehavior.js"</span>)\>
\_</span>\
<span>    \<TargetControlType(<span
style="color:blue; ">GetType</span>(UpdatePanel))\> \_</span>\
<span>    <span style="color:blue; ">Public</span> <span
style="color:blue; ">Class</span> UpdatePanelJavaScriptExtender</span>\
<span>        <span style="color:blue; ">Inherits</span>
ExtenderControlBase</span>\
<span> </span>\
 <span>        <span style="color:green; ">'Durumları ile beraber
UpdatePanel içerisine ekleyeceğimiz</span></span>\
 <span>        <span style="color:green; ">'TextBox'ı
yaratıyoruz.</span></span>\
 <span>        <span style="color:blue; ">WithEvents</span> MyTextBox
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span>
System.Web.UI.WebControls.TextBox</span>\
 <span>        <span style="color:green; ">'Extender kontrolümüze ait
Update durumunu tanımlıyoruz.</span></span>\
 <span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Event</span> Update(<span
style="color:blue; ">ByVal</span> Sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> E <span
style="color:blue; ">As</span> EventArgs, <span
style="color:blue; ">ByVal</span> parameter <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span> </span>\
 <span>        <span style="color:green; ">'ClientCommand özelliğine ait
Get ve Set metodları.</span></span>\
 <span>        \<ExtenderControlProperty()\> \_</span>\
<span>        \<DefaultValue(<span
style="color:#A31515; ">"Update"</span>)\> \_</span>\
<span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Property</span> ClientCommand() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
GetPropertyValue(<span style="color:#A31515; ">"ClientCommand"</span>,
<span style="color:#A31515; ">""</span>)</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>                SetPropertyValue(<span
style="color:#A31515; ">"ClientCommand"</span>, value)</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span style="color:blue; "> </span>\
 <span>        <span style="color:green; ">'Extender Render edildiğinde
ilk çalıştırılan kodlar.</span></span>\
 <span>        <span style="color:blue; ">Private</span> <span
style="color:blue; ">Sub</span>
UpdatePanelJavaScriptExtender\_Init(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs) <span
style="color:blue; ">Handles</span> <span
style="color:blue; ">Me</span>.Init</span>\
<span>            <span style="color:green; ">'TextBox AutoPostBack
olsun.</span></span>\
<span>            MyTextBox.AutoPostBack = <span
style="color:blue; ">True</span></span>\
<span>            <span style="color:green; ">'TextBox sayfada görünmez
olsun</span></span>\
<span>            MyTextBox.Style.Add(<span
style="color:#A31515; ">"visibility"</span>, <span
style="color:#A31515; ">"hidden"</span>)</span>\
<span>            MyTextBox.Style.Add(<span
style="color:#A31515; ">"display"</span>, <span
style="color:#A31515; ">"none"</span>)</span>\
 <span>            <span style="color:green; ">'Hedef UpdatePanel'i
bulalım.</span></span>\
 <span>            <span style="color:blue; ">Dim</span> TargetPanel
<span style="color:blue; ">As</span> System.Web.UI.UpdatePanel = <span
style="color:blue; ">Me</span>.TargetControl</span>\
 <span>            <span style="color:green; ">'TextBox'ı
ekleyelim.</span></span>\
 <span>           
TargetPanel.ContentTemplateContainer.Controls.Add(MyTextBox)</span>\
 <span>            <span style="color:green; ">'OnClientCommand
özelliğine verilen JavaScript fonksiyonunu yaratalım.</span></span>\
 <span>            <span style="color:blue; ">Dim</span> script <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
System.Web.UI.HtmlControls.HtmlGenericControl(<span
style="color:#A31515; ">"script"</span>)</span>\
<span>            script.Attributes.Add(<span
style="color:#A31515; ">"type"</span>, <span
style="color:#A31515; ">"text/javascript"</span>)</span>\
<span>            script.Attributes.Add(<span
style="color:#A31515; ">"language"</span>, <span
style="color:#A31515; ">"javascript"</span>)</span>\
 <span>            <span style="color:blue; ">Dim</span> builder <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
System.Text.StringBuilder</span>\
<span>            builder.Append(<span style="color:#A31515; ">"function
"</span>)</span>\
<span>            builder.Append(<span
style="color:blue; ">Me</span>.ClientCommand)</span>\
<span>            builder.AppendLine(<span
style="color:#A31515; ">"(parameter) {"</span>)</span>\
<span>            builder.Append(<span
style="color:#A31515; ">"UpdatePanelJavaScript.Update('"</span>)</span>\
<span>            builder.Append(MyTextBox.ClientID)</span>\
<span>            builder.AppendLine(<span style="color:#A31515; ">"',
parameter);"</span>)</span>\
 <span>            builder.AppendLine(<span
style="color:#A31515; ">"};"</span>)</span>\
<span>            script.InnerHtml = builder.ToString</span>\
<span>            <span style="color:green; ">'JavaScript fonksiyonumuzu
Extender'a ekleyelim.</span></span>\
<span>            <span
style="color:blue; ">Me</span>.Controls.Add(script)</span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; "> \
         <span style="color:green; ">'UpdatePanel içerisine eklediğimiz
TextBox'a ait TextChanged durumunu kontrol ediyoruz..</span></span>\
 <span>        <span style="color:blue; ">Sub</span>
Control\_TextChanged(<span style="color:blue; ">ByVal</span> sender
<span style="color:blue; ">As</span> <span
style="color:blue; ">Object</span>, <span
style="color:blue; ">ByVal</span> e <span style="color:blue; ">As</span>
System.EventArgs) <span style="color:blue; ">Handles</span>
MyTextBox.TextChanged</span>\
 <span>            <span style="color:blue; ">Dim</span> SenderControl
<span style="color:blue; ">As</span> System.Web.UI.WebControls.TextBox =
sender</span>\
 <span style="color:blue; ">         <span
style="color:green;">'RANDOMPARAM'ın varlığını kontrol ederek RaiseEvent
ile kendi Update durumumuzu çalıştırıyoruz.</span></span>\
 <span>            <span style="color:blue; ">If</span>
SenderControl.Text.IndexOf(<span
style="color:#A31515; ">"RANDOMPARAM"</span>) \<\> -1 <span
style="color:blue; ">Then</span></span>\
 <span>                <span style="color:blue; ">If</span>
SenderControl.Text.IndexOf(<span
style="color:#A31515; ">"RANDOMPARAM"</span>) = 0 <span
style="color:blue; ">Then</span></span>\
 <span>                    <span style="color:blue; ">RaiseEvent</span>
Update(<span style="color:blue; ">Me</span>, e, <span
style="color:#A31515; ">""</span>)</span>\
 <span>                <span style="color:blue; ">Else</span></span>\
 <span>                    <span style="color:blue; ">RaiseEvent</span>
Update(<span style="color:blue; ">Me</span>, e,
SenderControl.Text.Substring(0, SenderControl.Text.IndexOf(<span
style="color:#A31515; ">"RANDOMPARAM"</span>)))</span>\
 <span>                <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
 <span>            <span style="color:blue; ">Else</span></span>\
 <span>                <span style="color:blue; ">RaiseEvent</span>
Update(<span style="color:blue; ">Me</span>, e,
SenderControl.Text)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
 <span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Class</span></span>\
 <span style="color:blue; "> </span>\
 <span style="color:blue; ">End</span><span> <span
style="color:blue; ">Namespace</span></span>

Yukarıdaki kod içerisinde önemli noktalardan birincisi UpdatePanel
içerisine ekleyeceğimiz TextBox kontrolümüzü **WithEvents** ile
yaratıyor olmak. Böylece söz konusu TextBox'a ait **TextChanged**
durumunu Extender içerisinde kontrol edebileceğiz ve kendi
Extender'ımızın **Update** durumunu çalıştırabileceğiz. İkincisi ise
kendi **Update** durumumuzu (event) tanımlıyor olmamız.

Extender ilk olarak web sayfasına eklendiğinde ve sayfa ilk olarak
istemcide çalıştırıldığında Extender'a ait **Inıt** durumu çalışacaktır.
Biz **Inıt** durumunda kendi TextBox'ımızı **CSS** özellikleri ile
görünmez yaparak **AutoPostBack** özelliğini de ayarladıktan sonra hedef
UpdatePanel içerisine ekliyoruz. Sonraki adımda da Extender kontrolüne
verilen **ClientCommand** özelliğine göre Extender JavaScript
kodlarımızdaki **Update** metodunu kullanacak sayfa içi JavaScript
kodunu yaratmalıyız. Bunun için de bir **StringBuilder** ve
**HTMLGenericControl** kullandık. Son olarak JavaScript kodumuzu
Extender'a ekledik.

Gelelim TextBox'a ait **TextChanged** durumuna. TextBox içerisine
JavaScript ile yerleştirilen metni kontrol etmemiz gerekiyor. Eğer
**RANDOMPARAM** var ise silmemiz gerek. Bu işlemleri de tamamladıktan
sonra **RaiseEvent** ile kendi Update durumumuzu çalıştırıyoruz. Böylece
Extender'ı kullananlar Update durumu üzerinde direk parametreyi
alabilecekler.

**Altenatif Teknikler**

Yukarıdaki kontrolü kullanmak veya kontrolün işleyiş mantığına uymanın
haricinde farklı teknikler de söz konusu. Örneğin aşağıdaki kodu
kullanarak herhangi bir HTML objesinden direk başka bir .NET objesinin
**PostBack** JavaScript kodunu alarak çalıştırabilirsiniz.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">input</span><span style=""> <span
style="color:red; ">id</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">type</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">value</span><span
style="color:blue; ">="button"</span> <span
style="color:red; ">onclick</span><span
style="color:blue; ">="</span><span
style="background:yellow; ">\<%</span>=
ClientScript.GetPostBackEventReference(new PostBackOptions(**TextBox1**,
"")) <span style="background:yellow; ">%\></span><span
style="color:blue; ">"</span> <span
style="color:blue; ">/\></span></span>

Tabi yukarıdaki kod içerisinde TextBox'ın içeriğine bir parametre koyma
şansınız olmayacaktır. Farklı bir şekilde düzeneyerek böyle bir özellik
eklemek de mümkün. Extender kontrolümüzün güzel yanı bize tüm bu
işlevleri kolayca kullanabileceğimiz istediğimiz isimde JavaScript
fonksiyonları ve sunucu taraflı durum kontrolü sağlaması.

Hepinize kolay gelsin.

[UpdatePanel JavaScript Extender Kaynak Kodu - 04092007\_1.zip (493,15
KB)](media/UpdatePanel_Update_JavaScript_Muadili/04092007_1.zip)


