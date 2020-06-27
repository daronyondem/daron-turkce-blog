# AJAX ve WCF Servisleri
**ASP.NET 3.5**'in gelmesi ile beraber yavaş yavaş yeni AJAX
uygulamalarımızı da bu yeni platforma taşımamız gerekiyor. Çoğunuzun
**Visual Studio 2008**'e ait Express sürümlerini hemen
bilgisayarlarınıza indirdiğinizden eminim. Bu yazımda bahsetmek
istediğim nokta **WCF servisleri ile ASP.NET AJAX** entegrasyonu.
Aslında bildiğimiz üzere WCF hiç de yeni bir teknoloji değil. **.NET
Framework 3.0** ile uzun süredir hayatımızda olan WCF maalesef gerekli
yazılımcı araçlarının zayıflığı nedeniyle pek tercih edilmiyordu. Benim
de aslında şu ana kadar bu konuda yazı yazmamamın en önemli nedeni işin
gerçekten zor olmasıydı, neyse "*bekleyen derviş*" misali sonunda Visual
Studio 2008 ile yine her şey gerekli kolaylığa kavuştu.

Ben bu yazımda **Visual Web Developer 2008 Express Edition**
kullanacağım. Yazılımı hemen ücretsiz olarak aşağıdaki adresten
bilgisayarınıza indirebilirsiniz.

<http://www.microsoft.com/express/download/>

Visual Web Developer 2008 ile yeni bir web sitesi yarattıktan sonra
eklenen ilk *default.aspx* dosyasına bir **ScriptManager**
yerleştiriyoruz. Böylece artık söz konusu sayfa ASP.NET AJAX destekli
bir sayfa oluyor. Malum, artık AJAX özellikleri ASP.NET 3.5 ile beraber
zaten dahili olarak geliyor ve herhangi bir ek ayar veya yükleme
gerektirmiyor. Sayfamızı bu hali ile bıraktıktan sonra hemen projemize
bir WCF servisi ekleyelim. Bunun için "*Solution Explorer"* içerisinde
projeye sağ tuş ile tıklayarak gelen menüden "*Add new Item*" dedikten
sonra "*AJAX-Enabled WCF Service*" seçeneğini seçmemiz gerekiyor.

![Projemize yeni bir WCF servisi
ekliyoruz.](media/01122007_1.png)
*Projemize yeni bir WCF servisi ekliyoruz.*

Projemize yukarıdaki şekli ile bir WCF servisi eklediğimizde VWD
(*Visual Web Developer*) bizim için gerekli WCF **end-point** ayarlarını
**Web.Config** içerisinde otomatik olarak yapmakla birlikte AJAX ile
kullanabilmemiz için servisin gerekli JavaScript arayüzlerini de
yaratmasını sağlıyor. **Web.Config** içerisine baktığımızda aşağıdaki ek
düzenlemeleri görüyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">system.serviceModel</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">behaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">endpointBehaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">behavior</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ServiceAspNetAjaxBehavior</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">enableWebScript</span><span
style="color: blue;"> /\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">behavior</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">endpointBehaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">behaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">serviceHostingEnvironment</span><span
style="color: blue;"> </span><span
style="color: red;">aspNetCompatibilityEnabled</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">service</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Service</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">endpoint</span><span style="color: blue;">
</span><span style="color: red;">address</span><span
style="color: blue;">=</span>""<span style="color: blue;"> </span><span
style="color: red;">behaviorConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ServiceAspNetAjaxBehavior</span>"

<span style="color: blue;">      </span><span
style="color: red;">binding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">webHttpBinding</span>"<span style="color: blue;">
</span><span style="color: red;">contract</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Service</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">service</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">system.serviceModel</span><span
style="color: blue;">\></span>

Gelin şimdi de yeni yaratmış olduğumuz ve benim örneğimde adını
**service.svc** verdiğim WCF servisimizin kodların bir bakalım.

<span style="color: blue;">Imports</span> System.ServiceModel

<span style="color: blue;">Imports</span> System.ServiceModel.Activation

<span style="color: blue;">Imports</span> System.ServiceModel.Web

 

\<ServiceContract(Namespace:=<span style="color: #a31515;">""</span>)\>
\_

\<AspNetCompatibilityRequirements(RequirementsMode:=AspNetCompatibilityRequirementsMode.Allowed)\>
\_

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Service

 

    \<OperationContract()\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Topla(<span
style="color: blue;">ByVal</span> Sayi1 <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> Sayi2 <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> Sayi1 + Sayi2

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Aslında yukarıdaki kodun büyük bölümü VWD tarafından zaten otomatik
olarak yerleştirilmişti. Benim tek yaptığım kendi **Function'ımı**
yazmak oldu. Test amacıyla iki parametre alarak bunları toplayıp geri
döndüren bir **Function** hazırladım. Bu noktada özellikle dikkat
etmemiz gereken nokta bu Function'ların **\<OperationContract()\> \_**
şeklinde işaretlenmiş olmasının gerektiği. Artık web servisim bittiğine
göre sıra geldi **default.aspx**'e dönerek gerekli JavaScript kodlarını
yazmaya.

İlk olarak web servisim tarafından toplanacak iki sayıyı kullanıcıdan
almak üzere iki adet HTML kutusunu ve toplama işlemini tetikleyecek olan
HTML düğmesini sayfama yerleştiriyorum. Sonrasında da
**ScriptManager'a** **ServiceReference** olarak WCF servisimi
tanıtıyorum.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">form</span> <span
style="color: red;">id</span><span style="color: blue;">="form1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span> <span
style="color: red;">ID</span><span
style="color: blue;">="**ScriptManager1**"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">Services</span><span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**ServiceReference**</span> <span
style="color: red;">Path</span><span
style="color: blue;">="**service.svc**"</span> <span
style="color: blue;">/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">Services</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">id</span><span
style="color: blue;">="**Sayi1**"</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">id</span><span
style="color: blue;">="**Sayi2**"</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">onclick</span><span
style="color: blue;">="**Baslat**()"</span> <span
style="color: red;">id</span><span
style="color: blue;">="Button1"</span> <span
style="color: red;">type</span><span
style="color: blue;">="button"</span> <span
style="color: red;">value</span><span
style="color: blue;">="button"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">form</span><span style="color: blue;">\></span>

Yukarıdaki kodu incelerseniz HTML Button nesnesinin **Baslat** adında
bir JavaScript fonksiyonunu tetiklediğini görebilirsiniz. Sıra geldi bu
JavaScript fonksiyonlarını yazarak web servisindeki kodumuzu asenkron
olarak kullanmaya.

![Visual Web Developer 2008 ile beraber gelen JavaScript
Intellisense.](media/AJAX-ve-WCF-Servisleri/01122007_2.png)\
*Visual Web Developer 2008 ile beraber gelen JavaScript Intellisense*

**Baslat** adını verdiğim JavaScript fonksiyonumu yazarken aynen eskiden
**ASP.NET AJAX Extension** içerisinde Web Servisilerini kullandığımız
gibi WCF servisinin de sınıf ismi üzerinden tüm yazdığımız metotlara
ulaşabiliyoruz. Daha da güzeli tüm bunlar tamamen Intellisense desteği
ile geliyor :) Kodumuzu tamamladığımızda sayfanın tamamının kodu
aşağıdaki şekilde sonlanıyor.

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span style="color: #a31515;">Page</span>
<span style="color: red;">Language</span><span
style="color: blue;">="VB"</span> <span
style="color: red;">AutoEventWireup</span><span
style="color: blue;">="false"</span> <span
style="color: red;">CodeFile</span><span
style="color: blue;">="Default.aspx.vb"</span> <span
style="color: red;">Inherits</span><span
style="color: blue;">="\_Default"</span> <span
style="background: #ffee62;">%\></span>

 

<span style="color: blue;">\<!</span><span
style="color: #a31515;">DOCTYPE</span> <span
style="color: red;">html</span> <span style="color: red;">PUBLIC</span>
<span style="color: blue;">"-//W3C//DTD XHTML 1.0
Transitional//EN"</span> <span
style="color: blue;">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span> <span
style="color: red;">xmlns</span><span
style="color: blue;">="http://www.w3.org/1999/xhtml"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>Untitled Page<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

    <span style="color: blue;">function</span> Baslat()

    {

        Service.Topla(\$get(<span
style="color: #a31515;">"Sayi1"</span>).value, \$get(<span
style="color: #a31515;">"Sayi2"</span>).value,Tamamlandi);

    }

    <span style="color: blue;">function</span> Tamamlandi(Data)

    {

        alert(Data.toString());

    }

    <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">form</span> <span
style="color: red;">id</span><span style="color: blue;">="form1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span> <span
style="color: red;">ID</span><span
style="color: blue;">="ScriptManager1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">Services</span><span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ServiceReference</span> <span
style="color: red;">Path</span><span
style="color: blue;">="service.svc"</span> <span
style="color: blue;">/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">Services</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">id</span><span style="color: blue;">="Sayi1"</span>
<span style="color: red;">type</span><span
style="color: blue;">="text"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">id</span><span style="color: blue;">="Sayi2"</span>
<span style="color: red;">type</span><span
style="color: blue;">="text"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">onclick</span><span
style="color: blue;">="Baslat()"</span> <span
style="color: red;">id</span><span
style="color: blue;">="Button1"</span> <span
style="color: red;">type</span><span
style="color: blue;">="button"</span> <span
style="color: red;">value</span><span
style="color: blue;">="button"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">form</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

**Baslat** JavaScript fonksiyonunda **\$get** AJAX Extension kısayol
metodları ile sayfadaki **Sayi1** ve **Sayi2** adındaki HTML
elementlerini yakalayarak içlerindeki değerleri AJAX ile asenkron olarak
web servisime gönderiyorum. Gelen sonuç **Tamamlandi** metoduma
parametre olarak geliyor ve ben de bir JavaScript mesaj kutusu ile bunu
kullanıcıya gösteriyorum.

**Sonuç**

Görüldüğü üzere eski web servislerini kullanmak ile WCF servislerini
kullanma noktasında artık pek bir fark kalmamış durumda. O nedenle
**"Yaşasın WCF"** :)  sloganı ile hepinize kolay gelsin diyorum :)



*Bu yazi http://daron.yondem.com adresinde, 2007-12-1 tarihinde yayinlanmistir.*
