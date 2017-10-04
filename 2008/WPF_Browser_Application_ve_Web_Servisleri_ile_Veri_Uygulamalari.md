---
FallbackID: 2077
Title: WPF Browser Application ve Web Servisleri ile Veri Uygulamaları
PublishDate: 5/6/2008
EntryID: WPF_Browser_Application_ve_Web_Servisleri_ile_Veri_Uygulamalari
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, WPF, ASP.NET
old.EntryID: 76cbf299-63a5-443e-8d00-249ac9c7b425
---
WPF teknolojisi Windows uygulamalarında bize iki ve üç boyutlu
animasyonlarla zengin kullanıcı arayüzleri hazırlama şansı tanırken
**WPF Browser Application (XBAP)** yapısı ile beraber bu uygulamaları
istersek İnternet Tarayıcısı içerisine de taşıyabiliyoruz. Tabi bu
noktada istemci tarafında ufak ve sıkıcı bir ihtiyacımız var; .NET
Framework. WPF Browser Application projenizi geliştirirken kullanmış
olduğunuz .NET Framework sürümünün istemcilerde de yüklü olması şart.
Browser Application şablonu Expression Blend ile beraber gelmese de
Visual Studio içerisinde böyle bir proje yaratılarak aynı proje
rahatlıkla Expression Blend ile beraber açılabiliyor.

Örneğimizde basit bir uygulama yaparak iki metin kutusu, bir düğme ve
bir de etiket (TextBlock) kullanacağız. TextBox'lar içerisine yazılan
değerler bir web servisine gönderilecek ve web servisi söz konusu
değerlerin toplamını alarak uygulamamıza geri verecek. Normalde tabi ki
çok basit bir şekilde bu işlem istemci tarafında WPF ile halledilebilir
fakat bizim amacımız bir web servisi kullanarak **WPF Browser
Application** içerisinden sunucuya veri göndererek veri alabiliyor
olmak. Böylece rahatlıkla sunucu tarafındaki uygulama da kendisine gelen
verilere göre herhangi bir veritabanı sistemini sorgulayarak uygun
bilgileri geri döndürebilecektir.

**WPF Browser Application'ı tasarlayalım...**

İlk olarak uygulamamızı Visual Studio içerisinde **"File / New
Project"** menüsünden "**WPF Browser Application**" proje şablonunu
seçerek yarattıktan sonra görsel tasarımını tamamlayalım. Uygulama
içerisine otomatik olarak yerleştirilecek olan ana sayfamız "Page1.XAML"
dosyasını doğal olarak Expression Blend ile düzenlememiz gerekiyor.
Bunun için Visual Studio içerisinde yarattığımız bu projeyi Expression
Blend ile de açarak XAML dosyasını düzenlememiz gerek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Page</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="Page1"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Title</span><span
style="color: blue;">="Page1"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
Width</span><span style="color: blue;">="250"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="400"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid.RowDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: red;">
Height</span><span style="color: blue;">="0.168\*"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: red;">
Height</span><span style="color: blue;">="0.155\*"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: red;">
Height</span><span style="color: blue;">="0.132\*"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: red;">
Height</span><span style="color: blue;">="0.545\*"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid.RowDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Text</span><span style="color: blue;">="TextBox"</span><span
style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Kutu1"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Grid.Row</span><span style="color: blue;">="1"</span><span
style="color: red;"> Text</span><span
style="color: blue;">="TextBox"</span><span style="color: red;">
TextWrapping</span><span style="color: blue;">="Wrap"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Kutu2"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Grid.Row</span><span style="color: blue;">="2"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="Button"</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Center"</span><span style="color: red;">
Width</span><span style="color: blue;">="100"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="40"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Dugme"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Label</span><span style="color: red;">
Margin</span><span style="color: blue;">="8,8,8,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Height</span><span style="color: blue;">="27"</span><span
style="color: red;"> Grid.Row</span><span
style="color: blue;">="3"</span><span style="color: red;">
Content</span><span style="color: blue;">="Label"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Etiket"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Page</span><span style="color: blue;">\></span>

Hazırlamış olduğumuz uygulamanın yukarıdaki XAML kodunu incelediğinizde
ekranda iki adet metin kutusu, bir düğme ve bir de TextBlock olduğunu
göreceksiniz. Tüm bu kontrolleri bir Grid içerisine yerleştirerek
ekranda sabit bir şekilde görünmelerini sağlıyoruz.

**Web servisimizi hazırlayalım**

Sıra geldi web servisimizi hazırlamaya. Bunun için Visual Studio
içerisinde üzerinde çalıştığımız Solution yapısına yeni bir ASP.NET 3.5
web projesine ekleyeceğiz. "File / Add / New Project" menüsünden
"ASP.NET Web Application" seçeneğinden ilerleyebilirsiniz. Yarattığımız
web sitesine "WebService1.asmx" adında yeni bir web servisi ekleyerek
aşağıdaki şekilde kodumuzu yerleştirelim.

**[VB]**

<span style="color: blue;">Imports</span> System.Web.Services

<span style="color: blue;">Imports</span> System.Web.Services.Protocols

<span style="color: blue;">Imports</span> System.ComponentModel

 

\<System.Web.Services.WebService(Namespace:=<span
style="color: #a31515;">"http://tempuri.org/"</span>)\> \_

\<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1\_1)\>
\_

\<ToolboxItem(<span style="color: blue;">False</span>)\> \_

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> WebService1

    <span style="color: blue;">Inherits</span>
System.Web.Services.WebService

 

    \<WebMethod()\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> **Topla**(<span
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

**[C\#]**

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Collections;

<span style="color: blue;">using</span> System.Linq;

<span style="color: blue;">using</span> System.Web;

<span style="color: blue;">using</span> System.Web.Services;

<span style="color: blue;">using</span> System.Web.Services.Protocols;

<span style="color: blue;">using</span> System.Xml.Linq;

 

[<span style="color: #2b91af;">WebService</span>(Namespace = <span
style="color: #a31515;">"http://tempuri.org/"</span>)]

[<span style="color: #2b91af;">WebServiceBinding</span>(ConformsTo =
<span style="color: #2b91af;">WsiProfiles</span>.BasicProfile1\_1)]

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">WebService</span> : System.Web.Services.<span
style="color: #2b91af;">WebService</span>

{

 

    <span style="color: blue;">public</span> WebService()

    {

    }

 

    [<span style="color: #2b91af;">WebMethod</span>]

    <span style="color: blue;">public</span> <span
style="color: blue;">int</span> Topla(<span
style="color: blue;">int</span> x, <span style="color: blue;">int</span>
y)

    {

        <span style="color: blue;">return</span> x + y;

    }

}

Sıra geldi bu web servisini WPF Browser Application içerisinde
kullanmaya.

**Reference ekleyelim**

Web servisinizi hazırladıktan sonra rahatlıkla WPF Browser Application
projenize sağ tıklayarak ve "Add Service Reference" diyerek web
servisinizi bulup referans olarak ekleyebilirsiniz. Sonrasında normal
bir Winforms uygulamasında olduğu gibi uzaktaki servisi
kullanabilirsiniz.

**[VB]**

<span style="color: blue;">Class</span> Page1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        <span style="color: blue;">Dim</span> Servis = <span
style="color: blue;">New</span> ServiceReference1.WebService1SoapClient

        Etiket.Content = Servis.Topla(Kutu1.Text, Kutu2.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page1</span> : <span
style="color: #2b91af;">Page</span>

    {

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Dugme\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            ServiceReference1.<span
style="color: #2b91af;">WebServiceSoapClient</span> Servis = <span
style="color: blue;">new</span>
WpfBrowserApplication1.ServiceReference1.<span
style="color: #2b91af;">WebServiceSoapClient</span>();

            Etiket.Content = Servis.Topla(<span
style="color: blue;">int</span>.Parse(Kutu1.Text), <span
style="color: blue;">int</span>.Parse(Kutu2.Text)).ToString();

        }

    }

Yukarıdaki kodumuzda basit bir şekilde **ServiceReference1** üzerinde
servisimizi tanımlayarak içerisindeki **Topla** metodunu kullanıyoruz.
Sonucu da WPF uygulamasında **Etiket** adındaki **TextBlock** içerisine
yazdırıyoruz.

**Sorunlar baş gösteriyor...**

Fakat ufak bir sorun var. WPF Browser Application'ı Visual Studio
içerisinden çalıştırdığınızda doğrudan dosya sistemi üzerinden
çalıştırılacaktır, yani IIS veya **ASP.NET Development Server** devreye
girmeyecektir. Oysa bizim web servisi ASP.NET Development Server
üzerinde çalışmak zorunda. Visual Studio'nun web servisini ASP.NET
Development Server üzerinden çalıştırırken WPF Browser Application'ı
dosya sisteminden çalıştırması bizi büyük bir sorunla baş başa
bırakacak; "**Güvenlik**".

Artık hem AJAX hem de Silverlight nedeniyle çoğumuzun bildiği üzere
istemci tarafında bir alan adından yola çıkarak başka bir alan adına
bağlanıp veri alımı veya gönderimi yapamazsınız. WPF Browser Application
dosya sisteminden başlatıldığında maalesef web servisini "başka bir alan
adında" olarak algılayacağı için veri trafiği gerçekleşmeyecektir. Bu
durumda yapılacak şey belli; WPF Browser Application'ı bizim web servisi
ile aynı projeye "output" ettirmemiz, aslında **Publish** etmemiz gerek.

WPF Browser Application projenize sağ tuş ile tıklayın ve "Publish"
komutu verin. Yayınlanacak konum olarak web servisinize ait dosyaların
bulunduğu ASP.NET sitenizin ana klasörünü gösterin. Böylece WPF Browser
Application hazırlanarak web sitenize yerleştirilmiş olacak. Şimdi
ASP.NET Development Server üzerinden XBAP dosyasını açabilir ve
uygulamanızı gönül rahatlığı ile kullanabilirsiniz.

Hepinize kolay gelsin.


