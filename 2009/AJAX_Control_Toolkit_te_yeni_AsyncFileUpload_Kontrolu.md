---
FallbackID: 2419
Title: AJAX Control Toolkit'te yeni AsyncFileUpload Kontrolü
PublishDate: 10/2/2009
EntryID: AJAX_Control_Toolkit_te_yeni_AsyncFileUpload_Kontrolu
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, ASP.NET 3.5, ASP.NET
old.EntryID: df55edd7-8189-4708-9c32-7b9896e29760
---
AJAX'tan ilk bahsetmeye başladığımız yıllarda en çok aldığım sorulardan
biri asenkron File Upload işlemi ile ilgiliydi. Asenkron işlem
yapabilmek ve sayfanın Refresh atmaması çok hoş bir durumdu ve bu durumu
istemciden sunucuya dosya yüklerken de yaşayabilmek istiyorduk. Bugünler
bu gibi bir sorunu çözmek için Silverlight kullanmayı tercih etsem de
özellikle 2GB'dan ufak dosyaların yüklenmesi noktasında aslında hala
eski taktikler kullanılabilir.

Eminim bazılarınız "Yapılıyor zaten AJAX ile" şeklinde içinden cevap
verecektir. Tabi ki yapılır fakat pek de kolay değil. İnternette bulunan
çoğu çözüm seksen tane ekstra ayar gerektirirken hiçbir ayar
gerektirmeden çalışan ASP.NET FileUpload kontrollerinin çoğu ise ücretli
olarak karşımıza çıkıyor. Kişisel yorumumla geç kalınmış olsa da artık
sonunda [AJAX Control
Toolkit](http://ajaxcontroltoolkit.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=33804)
içerisinde bir **FileUpload** kontrolü var!

**ASP.NET için asenkron çalışan FileUpload kontrolü!**

Her zamanki gibi tüm AJAX Control Toolkit kontrollerinde yaptığımız
üzere ilk olarak Toolkit'in en güncel DLL'ini
[sitesinden](http://ajaxcontroltoolkit.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=33804)
bilgisayarımıza indiriyor sonra da Visual Studio içerisinde yarattığımız
ASP.NET projesine **Reference** olarak Toolkit içerisinde DLL'i
ekliyoruz. Eğer sürekli olarak AJAX Control Toolkit kontrollerini
kullanacaksanız Toolbox'a da bu kontrolleri ekleyebilirsiniz.

**[ASP.NET]**

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span
style="color: #a31515;">Register</span> <span
style="color: red;">assembly</span><span
style="color: blue;">="AjaxControlToolkit"</span> <span
style="color: red;">namespace</span><span
style="color: blue;">="AjaxControlToolkit"</span> <span
style="color: red;">tagprefix</span><span
style="color: blue;">="cc1"</span> <span
style="background: #ffee62;">%\></span>

Eğer Toolbox'a eklemediyseniz yukarıdaki şekilde Control Toolkit'i
kullanacağınız her sayfada elle gerekli tanımlamaları yapmanız gerekiyor
ki mark-up tarafında bu assembly içerisinde kontrolleri kullanabilelim.
Eğer Toolbox'a kontrolleri eklerseniz zaten sürükle-bırak işlemi ile
kontrolü sayfaya yerleştirebilir hale gelirsiniz. Böylece yukarıdaki kod
da otomatik olarak yaratılır. İtiraf etmek gerekirse ben de otomatik
yaratılanı yukarıya yapıştırdım :)

**[Default.aspx]**

<span style="background: #ffee62; color: gray;">\<%</span><span
style="color: gray;">@</span> <span style="color: gray;">Page</span>
<span style="color: gray;">Language="VB"</span> <span
style="color: gray;">AutoEventWireup="false"</span> <span
style="color: gray;">CodeFile="Default.aspx.vb"</span> <span
style="color: gray;">Inherits="\_Default"</span> <span
style="background: #ffee62; color: gray;">%\></span>

<span style="background: #ffee62; color: gray;">\<%</span><span
style="color: gray;">@</span> <span style="color: gray;">Register</span>
<span style="color: gray;">assembly="AjaxControlToolkit"</span> <span
style="color: gray;">namespace="AjaxControlToolkit"</span> <span
style="color: gray;">tagprefix="cc1"</span> <span
style="background: #ffee62; color: gray;">%\></span>

<span style="color: gray;">\<!DOCTYPE</span> <span
style="color: gray;">html</span> <span
style="color: gray;">PUBLIC</span> <span
style="color: gray;">"-//W3C//DTD XHTML 1.0 Transitional//EN"</span>
<span
style="color: gray;">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"\></span>

<span style="color: gray;">\<html</span> <span
style="color: gray;">xmlns="http://www.w3.org/1999/xhtml"\></span>

<span style="color: gray;">\<head</span> <span
style="color: gray;">runat="server"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<title\>\</title\></span>

<span style="color: gray;">\</head\></span>

<span style="color: gray;">\<body\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<form</span> <span
style="color: gray;">id="form1"</span> <span
style="color: gray;">runat="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">cc1</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ToolkitScriptManager</span> <span
style="color: red;">ID</span><span
style="color: blue;">="ToolkitScriptManager1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">cc1</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ToolkitScriptManager</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">cc1</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AsyncFileUpload</span> <span
style="color: red;">ID</span><span
style="color: blue;">="AsyncFileUpload1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Label</span>
<span style="color: red;">ID</span><span
style="color: blue;">="Label1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span
style="color: blue;">="Label"\>\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: blue;">\></span>

<span style="color: #808080">    </span> <span
style="color: #808080;">\</form\></span>

<span style="color: #808080;">\</body\></span>

<span style="color: #808080;">\</html</span><span
style="color: blue;">\></span>

Yukarıda basit bir ASP.NET sayfasında **AsyncFileUpload** kontrolünü
bulabilirsiniz. Tabi sayfada ayrıca bir de **ToolkitScriptManager**
bulunuyor ki Toolkit kontrollerini kullanabilelim. Son olarak alt
tarafta göreceğiniz **Label** kontrolünü ise sadece sayfanın Refresh
atıp atmadığını kontrol etmek için kullanacağız. Dikkatinizi çektiyse
**AsyncFileUpload** kontrolü herhangi bir UpdatePanel içerisinde değil.
Zaten normal olanda budur. Fakat eğer isterseniz AsyncFileUpload
kontrolünü bir UpdatePanel içerisinde de rahatlıkla kullanabilirsiniz.
İşlevsellikte herhangi bir değişiklik olmuyor.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Class</span> \_Default

    <span style="color: blue;">Inherits</span> System.Web.UI.Page

 

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> AsyncFileUpload1\_UploadedComplete(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
AjaxControlToolkit.AsyncFileUploadEventArgs) <span
style="color: blue;">Handles</span> AsyncFileUpload1.UploadedComplete

        AsyncFileUpload1.SaveAs(MapPath(<span
style="color: #a31515;">"\~/Konum/"</span>) &
IO.Path.GetFileName(e.filename))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> Page\_Load(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Load

        Label1.Text = <span
style="color: blue;">Date</span>.Now.ToLongTimeString

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki kodun ilk kısmında önemli olan şey **AsyncFileUpload**
kontrolünün **UploadedComplete** eventını yakalamak. Adından da
anlaşılacağı üzere Upload işlemi bittiğinde bu event çalışıyor ve biz de
rahatlıkla **AsyncFileUpload** kontrolünün **SaveAs** metodu ile
dosyamızı sunucuya kaydedebiliyoruz. Kaydederken de diskteki uygun bir
yolu vermekte fayda var.

Alt kısımda göreceğiniz kod ise sayfa her refresh attığında sayfaya o
anki saat bilgisini saniyesi ile yazdırıyor. Yaptığınız denemede
göreceksiniz ki dosya yüklenmesine rağmen saat bilgisi hiç değişmeyecek.
Bu da sayfanın tamamen refresh atmadığının bir kanıtı.

**Animasyon göstermek istersek?**

Yükleme işlemi asenkron olsa da kullanıcıya her zamanki AJAX
animasyonlarından birini göstermek çok önemli. Malum zaten AJAX
animasyonu olarak bahsettiğim şey aslında basit ve sürekli aynı
animasyonu gösteren bir GIF dosyasından farklı değil.

![Örnek AJAX Loading
animasyonu.](http://cdn.daron.yondem.com/assets/2419/01102009_1.gif)\
*Örnek AJAX Loading animasyonu.*

Bu GIF dosyasını bildiğimiz şekilde ASP.NET sayfasına ekledikten sonra
AsyncFileUpload kontrolünün ThrobberID özelliğine Image kontrolümüzün
ID'sini vermemiz yeterli olacaktır.

**[Default.aspx]**

<span style="background: #ffee62; color: gray;">\<%</span><span
style="color: gray;">@</span> <span style="color: gray;">Page</span>
<span style="color: gray;">Language="VB"</span> <span
style="color: gray;">AutoEventWireup="false"</span> <span
style="color: gray;">CodeFile="Default.aspx.vb"</span> <span
style="color: gray;">Inherits="\_Default"</span> <span
style="background: #ffee62; color: gray;">%\></span>

<span style="background: #ffee62; color: gray;">\<%</span><span
style="color: gray;">@</span> <span style="color: gray;">Register</span>
<span style="color: gray;">assembly="AjaxControlToolkit"</span> <span
style="color: gray;">namespace="AjaxControlToolkit"</span> <span
style="color: gray;">tagprefix="cc1"</span> <span
style="background: #ffee62; color: gray;">%\></span>

<span style="color: gray;">\<!DOCTYPE</span> <span
style="color: gray;">html</span> <span
style="color: gray;">PUBLIC</span> <span
style="color: gray;">"-//W3C//DTD XHTML 1.0 Transitional//EN"</span>
<span
style="color: gray;">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"\></span>

<span style="color: gray;">\<html</span> <span
style="color: gray;">xmlns="http://www.w3.org/1999/xhtml"\></span>

<span style="color: gray;">\<head</span> <span
style="color: gray;">runat="server"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<title\>\</title\></span>

<span style="color: gray;">\</head\></span>

<span style="color: gray;">\<body\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<form</span> <span
style="color: gray;">id="form1"</span> <span
style="color: gray;">runat="server"\></span>

 <span style="color: gray">   </span> <span
style="color: gray;">\<cc1:ToolkitScriptManager</span> <span
style="color: gray;">ID="ToolkitScriptManager1"</span> <span
style="color: gray;">runat="server"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</cc1:ToolkitScriptManager\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<div</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Image</span>
<span style="color: red;">ImageUrl</span><span
style="color: blue;">="\~/ajax-loader.gif"</span> <span
style="color: red;">ID</span><span style="color: blue;">="Image1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: blue;">/\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">cc1</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AsyncFileUpload</span> <span
style="color: red;">ThrobberID</span><span
style="color: blue;">="Image1"</span> <span
style="color: red;">ID</span><span
style="color: blue;">="AsyncFileUpload1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: blue;">/\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</div\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<asp:Label</span> <span
style="color: gray;">ID="Label1"</span> <span
style="color: gray;">runat="server"</span> <span
style="color: gray;">Text="Label"\>\</asp:Label\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</form\></span>

<span style="color: gray;">\</body\></span>

<span style="color: gray;">\</html</span><span
style="color: blue;">\></span>

Eğer kontrolün tasarımında da hızlı bir değişiklik yapmak isterseniz
şimdilik iki farklı tasarım hazır olarak sizi bekliyor.

![Kontrolde kullanılabilecek hazır iki farklı tasarım
var.](http://cdn.daron.yondem.com/assets/2419/02102009_2.png)\
*Kontrolde kullanılabilecek hazır iki farklı tasarım var.*

Hepinize kolay gelsin.


