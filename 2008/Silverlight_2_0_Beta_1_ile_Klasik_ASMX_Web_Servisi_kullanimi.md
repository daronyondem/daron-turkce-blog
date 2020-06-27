# Silverlight 2.0 Beta 1 ile Klasik ASMX Web Servisi kullanımı
Silverlight 2.0 ile beraber .NET dillerini kullanabilirker aslında
sunucu tarafındaki veriye ulaşma yapısı biraz değişiyor. Normal
şartlarda istemci tarafından sunucuya bağlanabilmek için AJAX
isteklerini kullanırken artık istemci tarafında elimizde .NET varken ne
yapacağız?

İşte bu soruya bir cevap olarak klasik **ASMX** web servislerinin
**Silverlight 2.0 Beta 1** ile kullanımına göz atarak hali hazırda
elimizde web servisleri ile bulunan projelere nasıl Silverlight 2.0 Beta
1 uygulamalarını bağlayabileceğimizi göreceğiz.

**Klasik ASMX servisimiz hazır**

Örneğimizde kullanılmak üzere kendisine verilen iki sayıyı toplayarak
geri döndüren bir method'u harici bir web servisi olarak hazırlayarak
Silverlight uygulamamıza bağlayacağız. Bunun için Silverlight
uygulamamızı host edecek olan ASP.NET 3.5 sitesine bir web servisi
ekleyerek içerisine aşağıdaki kodu yazıyoruz.

<span style="color: blue;">Imports</span> System.Web

<span style="color: blue;">Imports</span> System.Web.Services

<span style="color: blue;">Imports</span> System.Web.Services.Protocols

 

\<WebService(Namespace:=<span
style="color: #a31515;">"http://tempuri.org/"</span>)\> \_

\<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1\_1)\> \_

\<<span
style="color: blue;">Global</span>.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()\>
\_

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> servisim

    <span style="color: blue;">Inherits</span>
System.Web.Services.WebService

 

    \<WebMethod()\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> **Toplama**(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> y <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> x + y

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Bir sonraki adımda Silverlight projemize Visual Studio 2008 içerisinde
sağ tıklayarak gelen menüden "*Add Service Reference*" komutunu vererek
servisimizi Silverlight projesine referans olarak ekliyoruz.

**Uygulamamızı tasarlıyoruz**

Silverlight uygulamamız içerisinde iki adet TextBox, bir Button ve bir
de TextBlock yer alacak. Bu TextBox'lardan alınan değerler web servisine
gönderilecek. Değerlerin toplam web servisinden geri döndüğünde ise
sonuç TextBlock içerisine yazılacak. Hazırlayacağımız örnek bir
Silverlight uygulamamısının XAML kodu aşağıdaki şekilde sonuçlanıyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication2.Page"</span>

    <span style="color: red;">xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

    <span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

    <span style="color: red;">Width</span><span
style="color: blue;">="400"</span> <span
style="color: red;">Height</span><span
style="color: blue;">="300"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span> <span
style="color: red;">Background</span><span
style="color: blue;">="White"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**TextBox**</span> <span
style="color: red;">Height</span><span style="color: blue;">="31"</span>
<span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">="Left"</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="48,46,0,0"</span> <span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">="Top"</span> <span
style="color: red;">Width</span><span style="color: blue;">="115"</span>
<span style="color: red;">Text</span><span
style="color: blue;">=""</span> **** <span
style="color: #a31515;">**x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Sayi1"**/\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**TextBox**</span> <span
style="color: red;">Height</span><span style="color: blue;">="31"</span>
<span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">="Right"</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="0,46,79,0"</span> <span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">="Top"</span> <span
style="color: red;">Width</span><span style="color: blue;">="116"</span>
<span style="color: red;">Text</span><span
style="color: blue;">=""</span> <span style="color: #a31515;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Sayi2"**/\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**Button**</span> <span
style="color: red;">Height</span><span style="color: blue;">="33"</span>
<span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="133,112,155,0"</span> <span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">="Top"</span> <span
style="color: red;">Content</span><span
style="color: blue;">="TOPLA"</span> <span style="color: #a31515;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Topla"**/\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**TextBlock**</span> <span
style="color: red;">Height</span><span style="color: blue;">="42"</span>
<span style="color: red;">Margin</span><span
style="color: blue;">="87,0,103,72"</span> <span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">="Bottom"</span> <span
style="color: red;">Text</span><span
style="color: blue;">="TextBlock"</span> <span
style="color: red;">TextWrapping</span><span
style="color: blue;">="Wrap"</span> <span style="color: #a31515;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Sonuc"**/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

**Servisimizi kullanalım...**

Sıra geldi artık işin arkaplanın geçerek kodumuzu yazmaya. Projemize
eklediğimiz servis referansına verdiğimiz isim üzerinden servisimizin
bir kopyasını yaratarak içerisindeki **Toplama** metodunu kullanmak
istiyoruz.

        <span style="color: blue;">Dim</span> BirServis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
KlasikServisim.servisimSoapClient

        BirServis.ToplamaAsync(Sayi1.Text, Sayi2.Text)

Yukarıdaki kod aslında alışık olduğumuz web servisi kullanımından pek
farklı değil. Fakat arada ufak bir değişiklik var. Bizim adını
"**Toplama**" olarak koyduğumuz metodun sonuna **Async** eklenmiş.
Aslında bunun anlamı çok basit; Silverlight tarafında çağırdığınız bir
web servisi tamamen asenkron olarak çalıştırılıyor. Yani bizim AJAX
tarafında alışık olduğumuz istemciden sunucuya bağlanarak veri çekme
mantığı bire bir web servisleri için de uygulanmış. Oysa eskiden Windows
programlarında web servisleri kullanırken içerisinde bulunduğumuz Threat
kesinlikle verinin gelmesini beklerdi.

Peki veri asenkron geliyorsa bizim verinin geldiğinden haberdar olmamız
gerekmez mi? Çünkü bu şartlar altında verinin ne zaman sunucudan
geleceğini bilemiyoruz. İşte tam bu noktada kodumuz içerisinde dinamik
olarak bir event-handler tanımlamamız gerekiyor.

       <span style="color: blue;">Dim</span> BirServis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
KlasikServisim.servisimSoapClient

        <span style="color: blue;">AddHandler</span>
BirServis.**ToplamaCompleted**, <span
style="color: blue;">AddressOf</span> **Bitti**

        BirServis.ToplamaAsync(Sayi1.Text, Sayi2.Text)

        Sonuc.Text = <span
style="color: #a31515;">"Hesaplanıyor..."</span>

Yukarıdaki kodumuzda **Bitti** adındaki bir event-handler'ı servisimizin
**ToplamaCompleted** metoduna bağlıyoruz. Böylece Toplama işlemi
tamamlandığında söz konusu event-handler çalıştırılacak. Şimdi bir de
veri geldiğinde nasıl TextBlock içerisine yazdıracağımıza göz atalım.

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Bitti(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> KlasikServisim.ToplamaCompletedEventArgs)

        Sonuc.Text = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz gibi bir önceki adımda tanımladığımız **Bitti** event'ının
aldığı ikinci parametre olan **ToplamaCompletedEventArgs** tipinde e
değişkeni üzerinden **Result** yani sonuca ulaşabiliyoruz. Söz konusu
parametre doğrudan **Toplama** metoduna özel olduğu için içerisinde
**Result** özelliğinin tipi de zaten web servisimizdeki metodun dönüş
tipi olan **Integer**.

Uygulamamızın tam kodu aşağıdaki şekilde sonlanıyor.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Topla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Topla.Click

        <span style="color: blue;">Dim</span> BirServis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
KlasikServisim.servisimSoapClient

        <span style="color: blue;">AddHandler</span>
BirServis.ToplamaCompleted, <span style="color: blue;">AddressOf</span>
Bitti

        BirServis.ToplamaAsync(Sayi1.Text, Sayi2.Text)

        Sonuc.Text = <span
style="color: #a31515;">"Hesaplanıyor..."</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Bitti(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> KlasikServisim.ToplamaCompletedEventArgs)

        Sonuc.Text = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-4-23 tarihinde yayinlanmistir.*
