---
FallbackID: 1772
Title: ASP.NET ile Web Sitelerinin Ekran Görüntüsünü Almak
PublishDate: 4/9/2007
EntryID: ASP_NET_ile_Web_Sitelerinin_Ekran_Goruntusunu_Almak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET
old.EntryID: 9adde894-3f7f-4728-98a3-05a1906d1a44
---
Web sitelerinin ekran görüntülerini (screenshot) alarak kullanıma sunan
hizmetler internet üzerinde mevcut. Bu makalemizde ASP.NET tarafında
nasıl başka bir sitenin ekran görüntüsü resim olarak alabileceğimizi
inceleyeceğiz. İlk olarak ufak bir noktaya değinmekte fayda var;
bahsedeceğimiz teknik bazı özel koşullarda (hedef web sitesinin görsel
öğeleri JavaScript ile düzenlemesi) başarılı sonuç vermeyebiliyor. O
nedenle eğer yüzde yüzlük bir başarı istiyorsanız ihtiyacınız olan hedef
web sitesinin ekran görüntüsü otomatik olarak alan bir windows
uygulaması ile web siteniz arasında entegrasyon sağlamak. Peki o zaman
neden bu işi web ortamında yapıyoruz? Maalesef normal barındırma
(hosting) hizmetlerinde sunucu tarafına kendi uygulamalarınızı
yüklemenize izin verilemez. Makalemizde izlediğimiz teknikler ile
herhangi bir barındırma alanında bu tarz bir uygulama yapabilirsiniz.

İlk olarak gelin ufak bir demo ile aslında ne yapacağımızı görelim.
Aşağıdaki adreste bu makaledeki kodun kullanıldığı bir uygulama var.
Uygulama John K. tarafından makalemizdeki kodun üzerine renk palet
analizi de eklenerek düzenlendi. Sistem, girilen adresin ekran
görüntüsünü aldıktan sonra görüntü içerisinde kullanılan ana renkleri
buluyor. Siz de makalemizdeki yöntemi kullanarak eminim ki çok daha
farklı uygulamalar yapabilirsiniz. Eğer beni uygulamalarınızla ilgili
haberdar edebilirseniz ayrıca sevinirim.

<http://www.todotoh.com/rgb/rgbanalysis.aspx>

**İş Başına**

Peki bu işi nasıl yapacağız? İlk olarak **.NET Framework**'un en önemli
konseptini hatırlatmakta fayda var. Web ile windows uygulamalarında
aslında biz aynı Framework'ü kullanıyoruz. Yani eğer istersek windows
forms uygulamalarında kullandığımız tüm kütüphaneleri ve objeleri web
forms uygulamalarımızda da kullanabiliriz. Bir web sitesinin ekran
görüntüsü almak için WinForms'da kullanabileceğimiz **WebBrowser**
adında bir objemiz var.

<span style="color:blue; ">Dim</span><span> MyBrowser <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
WebBrowser</span>\
<span>MyBrowser.**ScrollBarsEnabled** = <span
style="color:blue; ">False</span></span>\
 <span>MyBrowser.Size = <span style="color:blue; ">New</span> Size(1027,
768)</span>\
 <span>MyBrowser.**Navigate**(<span
style="color:#A31515; ">"http://daron.yondem.com"</span>)</span>\
 <span><span style="color:blue; ">Dim</span> myBitmap <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Bitmap(1024, 768)</span>\
<span><span style="color:blue; ">Dim</span> DrawRect <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Rectangle(0, 0, 1024, 768)</span>\
<span>MyBrowser.**DrawToBitmap**(myBitmap, DrawRect)</span>

Yukarıdaki kodumuz içerisinde yeni bir **WebBrowser** objesi yarattıktan
sonra ekranın kenarlarında kaydırma çubuklarının gözükmemesi için
**ScrollBarsEnabled** özelliğini **False** olarak düzenliyoruz. Bir
sonraki adımda **Browser** (Tarayıcı) objemizin boyutunu 1024\*768
yaparak sanki web sitesi o çözünürlükte bir ekranda açılmışmış gibi bir
ortam yaratıyoruz. **WebBrowser** objesine ait .**Navigate** metoduna
verdiğimiz parametre ile sitemizin yüklenmesini sağlıyoruz. Uygun resim
ve çizim alanı değişkenlerimizi de tanımladıktan sonra yine
**WebBrowser** objesine ait .**DrawToBitmap** metodunu kullanarak
görüntüyü değişkenimize alıyoruz.

Tabi olay bu kadar kolay değil. Elimizdeki ilk sorun web sitesinin
yüklenmesini beklemek zorunda olmamız. Bunun için kör bir döngü
kullanacağız.

<span>MyBrowser.Navigate(<span
style="color:blue; ">Me</span>.URL)</span>\
<span><span style="color:blue; ">While</span> MyBrowser.**ReadyState**
\<\> WebBrowserReadyState.**Complete**</span>\
 <span>   Application.DoEvents()</span>\
<span><span style="color:blue; ">End</span> <span
style="color:blue; ">While</span></span>

Kodumuzda **WebBrowser** objesinin **ReadyState** özelliğini kontrol
ederek **Complete** olana kadar kısır bir döngüye sokuyoruz. Döngü
içerisinde kullandığımız **Application.DoEvents()** kodu döngü süresince
**WebBrowser'daki** yüklemenin kilitlenmemesini ve devam etmesini
sağlayacak. Bir sonraki sorunumuz aslında çok daha kritik.
**WebBrowser** objesi özünde bir **COM** objesi olduğu için **Single
Threaded** bir Thread içerisinde çalıştırılması gerekiyor. Bu aslında
biraz da işimize yarar, böylece tüm bu yükleme kodlarını başka bir
**Thread** içerisine almış oluruz.

\
<span><span style="color:blue; ">Dim</span> NewTh <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Threading.Thread(<span style="color:blue; ">AddressOf</span>
DoIt)</span>\
<span>NewTh.**SetApartmentState(Threading.ApartmentState.STA)**</span>\
 <span>NewTh.Start()</span>

Yukarıda bir **Thread** tanımı yer alıyor. Bu tanım içerisinde en önemli
nokta ikinci satırdaki kod. Yarattığımız Thread için
**SetApartmentState** diyerek çalışma şeklini
**SingleThreadedApartment** haline çeviriyoruz. Tüm sorunları aştık,
geriye kaldı gelen ekran görüntüsünü uygun şekilde küçültme kodumuza. Bu
işlem için çok farklı teknikler kullanılabilir, ben aşağıda bu
tekniklerden birine ait kodu paylaşacağım. Makalemizin esas konusu bu
olmadığı için detaya girmeyeceğim.

<span><span style="color:blue; ">Dim</span> imgOutput <span
style="color:blue; ">As</span> System.Drawing.Image = myBitmap</span>\
 <span><span style="color:blue; ">Dim</span> oThumbNail <span
style="color:blue; ">As</span> System.Drawing.Image = <span
style="color:blue; ">New</span> Bitmap(twidth, theight, \_</span>\
<span>                imgOutput.PixelFormat)</span>\
<span><span style="color:blue; ">Dim</span> g <span
style="color:blue; ">As</span> Graphics =
Graphics.FromImage(oThumbNail)</span>\
<span>g.CompositingQuality =
Drawing2D.CompositingQuality.HighSpeed</span>\
<span>g.SmoothingMode = Drawing2D.SmoothingMode.HighSpeed</span>\
<span>g.InterpolationMode =
Drawing2D.InterpolationMode.HighQualityBilinear</span>\
<span><span style="color:blue; ">Dim</span> oRectangle <span
style="color:blue; ">As</span> Rectangle = <span
style="color:blue; ">New</span> Rectangle(0, 0, twidth, theight)</span>\
<span>g.DrawImage(imgOutput, oRectangle)</span>

Şimdi gelin tüm bu kodları birleştirerek bir **Class** yapısı içerisinde
projelerimizde kullanacağımız kodumuzu inceleyelim.

<span style="color:blue; ">Imports</span><span> System</span>\
<span style="color:blue; ">Imports</span><span> System.Drawing</span>\
<span style="color:blue; ">Imports</span><span>
System.Drawing.Imaging</span>\
<span style="color:blue; ">Imports</span><span>
System.Windows.Forms</span>\
<span style="color:blue; ">Imports</span><span>
System.Diagnostics</span>\
<span> </span>\
<span style="color:blue; ">Namespace</span><span>
GetSiteThumbnail</span>\
<span> </span>\
<span>    <span style="color:blue; ">Public</span> <span
style="color:blue; ">Class</span> GetImage</span>\
<span>        <span style="color:blue; ">Private</span> S\_Height <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>        <span style="color:blue; ">Private</span> S\_Width <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>        <span style="color:blue; ">Private</span> F\_Height <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>        <span style="color:blue; ">Private</span> F\_Width <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>        <span style="color:blue; ">Private</span> MyURL <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Property</span> ScreenHeight()
<span style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
S\_Height</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>                S\_Height = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Property</span> ScreenWidth()
<span style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
S\_Width</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>                S\_Width = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Property</span> ImageHeight()
<span style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
F\_Height</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>                F\_Height = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Property</span> ImageWidth()
<span style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
F\_Width</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>                F\_Width = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Property</span> WebSite() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
MyURL</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>                MyURL = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Sub</span> <span
style="color:blue; ">New</span>(<span style="color:blue; ">ByVal</span>
WebSite <span style="color:blue; ">As</span> <span
style="color:blue; ">String</span>, <span
style="color:blue; ">ByVal</span> ScreenWidth <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>, <span
style="color:blue; ">ByVal</span> ScreenHeight <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>, <span
style="color:blue; ">ByVal</span> ImageWidth <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>, <span
style="color:blue; ">ByVal</span> ImageHeight <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>            <span style="color:blue; ">Me</span>.WebSite =
WebSite</span>\
<span>            <span style="color:blue; ">Me</span>.ScreenWidth =
ScreenWidth</span>\
<span>            <span style="color:blue; ">Me</span>.ScreenHeight =
ScreenHeight</span>\
<span>            <span style="color:blue; ">Me</span>.ImageHeight =
ImageHeight</span>\
<span>            <span style="color:blue; ">Me</span>.ImageWidth =
ImageWidth</span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Function</span> GetBitmap()
<span style="color:blue; ">As</span> Bitmap</span>\
<span>            <span style="color:blue; ">Dim</span> Shot <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
WebPageBitmap(<span style="color:blue; ">Me</span>.WebSite, <span
style="color:blue; ">Me</span>.ScreenWidth, <span
style="color:blue; ">Me</span>.ScreenHeight)</span>\
<span>            Shot.GetIt()</span>\
<span>            <span style="color:blue; ">Dim</span> Pic <span
style="color:blue; ">As</span> Bitmap = Shot.DrawBitmap(<span
style="color:blue; ">Me</span>.ImageHeight, <span
style="color:blue; ">Me</span>.ImageWidth)</span>\
<span>            <span style="color:blue; ">Return</span> Pic</span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Class</span></span>\
<span> </span>\
<span>    <span style="color:blue; ">Class</span> WebPageBitmap</span>\
<span>        <span style="color:blue; ">Dim</span> MyBrowser <span
style="color:blue; ">As</span> WebBrowser</span>\
<span>        <span style="color:blue; ">Dim</span> URL <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>        <span style="color:blue; ">Dim</span> Height <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span>        <span style="color:blue; ">Dim</span> Width <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Sub</span> <span
style="color:blue; ">New</span>(<span style="color:blue; ">ByVal</span>
url <span style="color:blue; ">As</span> <span
style="color:blue; ">String</span>, <span
style="color:blue; ">ByVal</span> width <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>, <span
style="color:blue; ">ByVal</span> height <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>)</span>\
<span>            <span style="color:blue; ">Me</span>.Height =
Height</span>\
<span>            <span style="color:blue; ">Me</span>.Width =
width</span>\
<span>            <span style="color:blue; ">Me</span>.URL = url</span>\
<span>            MyBrowser = <span style="color:blue; ">New</span>
WebBrowser</span>\
<span>            MyBrowser.ScrollBarsEnabled = <span
style="color:blue; ">False</span></span>\
<span>            MyBrowser.Size = <span style="color:blue; ">New</span>
Size(<span style="color:blue; ">Me</span>.Width, <span
style="color:blue; ">Me</span>.Height)</span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Sub</span> GetIt()</span>\
<span>            MyBrowser.Navigate(<span
style="color:blue; ">Me</span>.URL)</span>\
<span>            <span style="color:blue; ">While</span>
MyBrowser.ReadyState \<\> WebBrowserReadyState.Complete</span>\
<span>                Application.DoEvents()</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">While</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span> </span>\
<span>        <span style="color:blue; ">Function</span>
DrawBitmap(<span style="color:blue; ">ByVal</span> theight <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>, <span
style="color:blue; ">ByVal</span> twidth <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>) <span
style="color:blue; ">As</span> Bitmap</span>\
<span>            <span style="color:blue; ">Dim</span> myBitmap <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Bitmap(Width, Height)</span>\
<span>            <span style="color:blue; ">Dim</span> DrawRect <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Rectangle(0, 0, Width, Height)</span>\
<span>            MyBrowser.DrawToBitmap(myBitmap, DrawRect)</span>\
<span>            <span style="color:blue; ">Dim</span> imgOutput <span
style="color:blue; ">As</span> System.Drawing.Image = myBitmap</span>\
<span>            <span style="color:blue; ">Dim</span> oThumbNail <span
style="color:blue; ">As</span> System.Drawing.Image = <span
style="color:blue; ">New</span> Bitmap(twidth, theight,
imgOutput.PixelFormat)</span>\
<span>            <span style="color:blue; ">Dim</span> g <span
style="color:blue; ">As</span> Graphics =
Graphics.FromImage(oThumbNail)</span>\
<span>            g.CompositingQuality =
Drawing2D.CompositingQuality.HighSpeed</span>\
<span>            g.SmoothingMode =
Drawing2D.SmoothingMode.HighSpeed</span>\
<span>            g.InterpolationMode =
Drawing2D.InterpolationMode.HighQualityBilinear</span>\
<span>            <span style="color:blue; ">Dim</span> oRectangle <span
style="color:blue; ">As</span> Rectangle = <span
style="color:blue; ">New</span> Rectangle(0, 0, twidth, theight)</span>\
<span>            g.DrawImage(imgOutput, oRectangle)</span>\
<span>            <span style="color:blue; ">Try</span></span>\
<span>                <span style="color:blue; ">Return</span>
oThumbNail</span>\
<span>            <span style="color:blue; ">Catch</span> ex <span
style="color:blue; ">As</span> Exception</span>\
<span>            <span style="color:blue; ">Finally</span></span>\
<span>                imgOutput.Dispose()</span>\
<span>                imgOutput = <span
style="color:blue; ">Nothing</span></span>\
<span>                MyBrowser.Dispose()</span>\
<span>                MyBrowser = <span
style="color:blue; ">Nothing</span></span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Try</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Class</span></span>\
<span> </span>\
<span style="color:blue; ">End</span><span> <span
style="color:blue; ">Namespace</span></span>

Yarattığımız iki classtan biri olan **GetImage** programcıdan alacağı
ekran görüntüsüne ait çözünürlük bilgilerini ve geri döndüreceği resmin
boyut bilgilerini alıyor. Aldığı bilgiler çerçevesinde ekran
görüntüsünün alınması sonrasında da görüntünün istenen boyuta
küçültülmesini sağlayacak. **WebPageBitmap** class'ımız ise ekran
görüntüsünün alınmasından ve sonrasında da tekrar boyutlandırılmasında
sorumlu. Tabi tüm bu işlemleri ayrı bir **Thread** içerisinde yapmamız
gerektiğinden bahsetmiştik. Şimdi de gelin yukarıdaki Class'ımızı
sayfamızda nasıl kullanabileceğimize bakalım.

<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Class</span> \_Default</span>\
 <span>    <span style="color:blue; ">Inherits</span>
System.Web.UI.Page</span>\
<span> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> Button1\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs) <span
style="color:blue; ">Handles</span> Button1.Click</span>\
<span>        <span style="color:blue; ">Dim</span> NewTh <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Threading.Thread(<span style="color:blue; ">AddressOf</span>
DoIT)</span>\
<span>       
NewTh.**SetApartmentState(Threading.ApartmentState.STA)**</span>\
 <span>        NewTh.Start()</span>\
<span>        <span style="color:blue; ">While</span> NewTh.ThreadState
= Threading.ThreadState.**Running**</span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">While</span></span>\
<span>        Image1.ImageUrl = TextBox1.Text.Replace(<span
style="color:#A31515; ">"."</span>, <span
style="color:#A31515; ">"\_"</span>) & <span
style="color:#A31515; ">".jpg"</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; "> </span>\
<span>    <span style="color:blue; ">Sub</span> DoIT()</span>\
<span>        <span style="color:blue; ">Try</span></span>\
<span>            <span style="color:blue; ">Dim</span> thumb <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
**GetSiteThumbnail.GetImage(<span
style="color:#A31515; ">"http://"</span> & TextBox1.Text, 1024, 768,
320, 240)**</span>\
 <span>            <span style="color:blue; ">Dim</span> x <span
style="color:blue; ">As</span> System.Drawing.Bitmap =
thumb.GetBitmap()</span>\
<span>            x.Save(Server.MapPath(<span
style="color:#A31515; ">"."</span>) & <span
style="color:#A31515; ">"\\"</span> & TextBox1.Text.Replace(<span
style="color:#A31515; ">"."</span>, <span
style="color:#A31515; ">"\_"</span>) & <span
style="color:#A31515; ">".jpg"</span>)</span>\
<span>        <span style="color:blue; ">Catch</span> ex <span
style="color:blue; ">As</span> Exception</span>\
<span>            <span style="color:blue; ">Dim</span> y <span
style="color:blue; ">As</span> System.IO.StreamWriter =
System.IO.File.CreateText(<span
style="color:#A31515; ">"C:\\Inetpub\\wwwroot\\screeny\\error.txt"</span>)</span>\
<span>            y.WriteLine(ex.Message & vbCrLf & ex.Source)</span>\
<span>            y.Flush()</span>\
<span>            y.Close()</span>\
<span>        <span style="color:blue; ">Finally</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Try</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
 <span style="color:blue; ">End</span><span> <span
style="color:blue; ">Class</span></span> 

Code-Behind dosyamızın kodunu yukarda inceleyebilirsiniz. **Button1'e**
tıklandığında uygun Thread'i yaratarak **DoIT** Sub'ını çalıştıracağı
şekilde hazırlıyoruz. Basit bir şekilde Thread'in bitmesini beklemek
için yine kısır bir döngü kullanarak **ThreadState** durumunu kontrol
ettik. Ekran görüntüsü alındığı gibi kullanıcıya göstermek için biraz
kullanıcıyı bekletmemiz gerekecek. Eğer siz bir AJAX web sitesi
hazırlıyorsanız ekran görüntüsünün alınmasını beklemektense bir AJAX
**Timer** ile durumu kontrol edip kullanıcıya bilgi verebilirsiniz.

**DoIT** Sub'ımız içerisine bakarsak aslında bir önceki **Class**
yapımızı kullandığımızı görüyoruz. Ben kodumda ekran görüntüsünü ve
oluşursa herhangi bir hatayı farklı yerlere kaydettim. Siz bu konumları
değiştirerek farklı yapılar kurabilirsiniz.

Tüm bu kodlara ek olarak daha yüksek performanslı bir sonuç için
kodunuzun daha önce alınmış ekran görüntülerini kontrol ederek eğer söz
konusu adrese ait ekran görüntüsü çok eski değilse yenisini almadan
kullanıcıya eskisi de göstermesini sağlayabilirsiniz.

Hepinize kolay gelsin.

[Makale Kaynak Kodu - 03092007\_1.zip (3,48
KB)](media/ASP_NET_ile_Web_Sitelerinin_Ekran_Goruntusunu_Almak/03092007_1.zip)


