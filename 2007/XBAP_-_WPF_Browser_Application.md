---
FallbackID: 1845
Title: "XBAP - WPF Browser Application"
date: "2007-11-11"
EntryID: XBAP_-_WPF_Browser_Application
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 3.0, Visual Studio 2008, WPF
old.EntryID: 1bc7bc98-85e8-4bec-a681-bd9087118aa8
---
**XBAP da ne ola ki?**

XBAP'ın açılımı "XAML Browser Applications" şeklinde. Peki XAML neydi?
Extensible Application Markup Language, yani WPF (Windows Presentation
Foundation) ile beraber gelen XML yapısında görsel, vektörel içeriklerin
tanımlandığı bir model. XAML aynı anda Silverlight içerisinde de görsel
arayüzü modellemek, animasyonları hazırlamak için kullandığımız yapının
ta kendisi. Daha önceki yazılarımda bu konulardan bahsettiğim için
XAML'in veya WPF'in çok detaylarına girmeyeceğim.

**WPF'de yapabildiğiniz herşeyi Browser'a taşıyın!**

XBAP işte tam olarak bu işi yapıyor. **WPF Browser Application** olarak
da tanımlayabileceğimiz bu uygulamalar tamamen internet üzerinden
çalışarak istemcideki tarayıcının içerisinde sunuluyor. Hemen aşağıdaki
linklerden birkaç örnek incelemenizi tavsiye ediyorum. Sonrasında
konumuza devam edelim.

<http://scorbs.com/workapps/woodgrove/FinanceApplication.xbap>\
 <http://ttpdownload.bl.uk/browserapp.xbap>\
 <http://scorbs.com/workapps/photobook/PhotoBook.xbap>\

Örnekleri incelediyseniz özellikle ilk örnekteki 3 boyutlu grafikler
dikkatinizi çekmiştir. WPF'in 3D desteği olduğunu biliyoruz, bu
çerçevede hazırladığımız herhangi bir WPF 3D uygulamasını hemen WFP
Browser Application olarak çevirerek internette yayınlama şansımız da
var. Maalesef şu an ne Silverlight ne de Flash'ın böyle bir desteği yok.

**Silverlight, WPF, XBAP? Nedir bunların farkı?**

Programlama açısından XBAP ile WPF arasındaki fark çok az. XBAP bir
internet tarayıcı içerisinde (Sadece Internet Explorer) çalıştığı için
bazı ek güvenlik sınırlamaların maruz kalıyor. WPF ise zaten bildiğimiz
windows programlarından farksız. Hem XBAP hem de WPF'de tüm .NET
dillerini (VB.NET, C\# vs) kullanabiliyoruz. XBAP'ın avantajı bir
HTTPRequest ile karşı tarafta internet tarayıcıya yüklenerek hemen
çalıştırılabiliyor olması. Fakat bu noktada özellikle belirtmem gereken
bir nokta var; istemci bilgisayarda .NET Framework 3.0'ın yüklü olması
şart! Aksi halde uygulama çalışmayacaktır. Bunun için bir ASP.NET sitesi
hazırlayarak ilk aşamada kullanıcının bilgisayarında .NET Framework
3.0'ın yüklü olup olmadığı incelenerek uygun mesajlar verilebilir ama
her halükarda istemcileri Windows XP SP2 ve Vista ile sınırlamış
oluyorsunuz.

Silverlight zaten apayrı bir dünya. İstemcide .NET Framework 3.0 vs
yüklü olmasa da sadece Silverlight Plug-In yüklü ise Macintosh dahil tüm
cihazlarda çalışacaktır. WPF ile XBAP arasındaki kadar büyük bir
yakınlık olmasa da Silverlight da WPF'in ufak bir parçası aslında.
Silverlight şu anki 1.0 sürümünde JavaScript, ileride ise .NET dilleri
ile programlanabilecek fakat yine de kullanılan .NET sınıfları da
sınırlı olacak ve XBAP gibi geniş olanaklara sahip olmayacak.

**Ufak bir örnek yapalım.**

Şimdi çok ufak bir WPF windows uygulaması hazırlayalım ve aynı
uygulamayı **WPF Browser Application** yapmanın ne kadar kolay olduğunu
inceleyelim. Tüm bunları yaparken Visual Studio 2008 kullanacağım. VS
2005 ile WPF Browser Application Proje Şablonu gelmiyor ve bazı
işlemleri elle yapmak gerekiyor. O nedenle Visual Studio 2005 ile hiç
uğraşmayarak doğrudan Visual Studio 2008 kullanacağım. Önümüzdeki bir
ayı takiben tüm örneklerimi de VS 2008 ile yapıyor olacağım. Eğer hala
VS 2008 Beta 2 edinmediyseniz hemen bilgisayarınıza indirmenizi tavsiye
ederim. Bu konuda aşağıdaki yazımı inceleyebilirsiniz.

[Visual Studio 2008 Virtual PC İmajları
Yenilendi](PermaLink.aspx?guid=8e0206a9-238c-4aa9-b293-0ab955bb205c)

[Expression Blend 2 Beta September
Preview](http://go.microsoft.com/fwlink/?LinkID=79076&clcid=0x409)
kullanarak yeni bir WPF Application yaratarak otomatik olarak gelen
uygulamanın ana penceresi üzerine bir dikdörtgen koyarak ufak bir
animasyon tanımladım. Bunu takiben bir de pencereme düğme koyarak
önceden hazırladığım animasyonu bu düğmeye bağladım. Window1.XAML'in
kodu aşağıdaki şekilde sonlandı.

<span style="color: blue;">**\<**</span><span
style="color: #a31515;">**Window**</span>

<span style="color: blue;">** ** </span><span style="color: red;">
**xmlns**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**http://schemas.microsoft.com/winfx/2006/xaml/presentation**</span>**"**

<span style="color: blue;">** ** </span><span style="color: red;">
**xmlns:x**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**http://schemas.microsoft.com/winfx/2006/xaml**</span>**"**

<span style="color: blue;">** ** </span><span style="color: red;">
**x:Class**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**Window1**</span>**"**

<span style="color: blue;">** ** </span><span style="color: red;">
**x:Name**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**Window**</span>**"**

<span style="color: blue;">** ** </span><span style="color: red;">
**Title**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**Window1**</span>**"**

<span style="color: blue;">** ** </span><span style="color: red;">
**Width**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**300**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Height**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**300**</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Storyboard</span><span style="color: blue;">
</span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">OrnekAnimasyon</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:02</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">91</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.Y)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:02</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">93</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Window.Triggers</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">EventTrigger</span><span style="color: blue;">
</span><span style="color: red;">RoutedEvent</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ButtonBase.Click</span>"<span style="color: blue;">
</span><span style="color: red;">SourceName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">BeginStoryboard</span><span
style="color: blue;"> </span><span
style="color: red;">Storyboard</span><span
style="color: blue;">=</span>"<span style="color: blue;">{StaticResource
OrnekAnimasyon}</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">EventTrigger</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Window.Triggers</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">18,34,131,128</span>"<span style="color: blue;">
</span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: blue;">
</span><span style="color: red;">ScaleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">ScaleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: blue;">
</span><span style="color: red;">AngleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span
style="color: red;">AngleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;"> </span><span style="color: red;">Angle</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: blue;"> </span><span style="color: red;">X</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span style="color: red;">Y</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">18,0,0,8</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">81</span>"<span
style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">36</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">**\</**</span><span
style="color: #a31515;">**Window**</span><span
style="color: blue;">\></span>

Şu an hala bir windows programı üzerinde çalıştığımızı aşağıdaki basit
ekran görüntüsünü inceleyerek tekrar hatırlayalım :)

![Örnek WPF
Uygulamamız](media/XBAP_-_WPF_Browser_Application/10112007_1.png)\
*Örnek WPF Uygulamamız*

Şimdi biraz .NET kodu yazmak için Blend'de hazırladığım projemi Visual
Studio ile açarak hazırlamış olduğum animasyonun bitişinde çalıştırılmak
üzere aşağıdaki kodu yazacağım.

<span style="color: blue;">Imports</span> System

<span style="color: blue;">Imports</span> System.IO

<span style="color: blue;">Imports</span> System.Net

<span style="color: blue;">Imports</span> System.Windows

<span style="color: blue;">Imports</span> System.Windows.Controls

<span style="color: blue;">Imports</span> System.Windows.Data

<span style="color: blue;">Imports</span> System.Windows.Media

<span style="color: blue;">Imports</span> System.Windows.Media.Animation

<span style="color: blue;">Imports</span> System.Windows.Navigation

 

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Window1

    <span style="color: blue;">Dim</span> <span
style="color: blue;">WithEvents</span> Animasyonum <span
style="color: blue;">As</span> Storyboard

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        <span style="color: blue;">MyBase</span>.New()

 

        <span style="color: blue;">Me</span>.InitializeComponent()

 

        <span style="color: green;">' Insert code required on object
creation below this point.</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Animasyonum = <span style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Resources.Item(<span
style="color: #a31515;">"OrnekAnimasyon"</span>), Storyboard)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Animasyon\_Bitti(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Animasyonum.Completed

        Microsoft.VisualBasic.MsgBox(<span
style="color: #a31515;">"Bitti"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Sıra geldi uygulamamızı aynen bir WPF Browser Application'a çevirmeye.
Bunun için ilk olarak Visual Studio 2008 içerisine yeni bir WPF Browser
Application yaratmamız gerekiyor.

![Visual Studio 2008 ile WPF Browser Application
yaratıyoruz.](media/XBAP_-_WPF_Browser_Application/10112007_2.png)\
*Visual Studio 2008 ile WPF Browser Application yaratıyoruz.*

Projemizi yarattıktan sonra ilk olarak XAML kodlarımızı kopyalayacağız.
Visual Studio ile WPF Browser Application'ımızı yarattıktan sonra bizim
için otomatik olarak boş bir XAML Page de yaratılmış oluyor. Page1.XAML
olarak geçen dosyanın içeriğine gelin hızlıca bir göz atalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Page</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span style="color: blue;">Page1</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Title</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Page1</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

 

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Page</span><span style="color: blue;">\></span>

Hmm... Peki bunun herhangi bir WPF uygulamanın bir penceresinden farkı
nedir? Onun da içerisinde Grid yok muydu? Evet, aynen öyle. Aradaki fark
WPF uygulamalarda Window'lar varken XAML Browser Application'larda
Page'lerin olması. Yani sadece XML dosyasında kök element değişiyor. O
nedenle WPF windows uygulamamızda Window tagları arasında yer alan tüm
XAML kodunu kopyalayarak burada Page taglarının arasına koymamız
gerekiyor. Zaten bu nedenle bir önceki örnekteki XAML kodunda Window
taglarını koyu olarak yazmıştım :) Bakalım tüm bu işlemleri yapınca WPF
Browser Application'ımızın Page1.XAML dosyası ne hale geliyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Page</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span style="color: blue;">Page1</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Title</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Page1</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">  **\<**</span><span
style="color: #a31515;">**Page.Resources**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Storyboard</span><span style="color: blue;">
</span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">OrnekAnimasyon</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:02</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">91</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.Y)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:02</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">93</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">  **\</**</span><span
style="color: #a31515;">**Page.Resources**</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">  **\<**</span><span
style="color: #a31515;">**Page.Triggers**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">EventTrigger</span><span style="color: blue;">
</span><span style="color: red;">RoutedEvent</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ButtonBase.Click</span>"<span style="color: blue;">
</span><span style="color: red;">SourceName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">BeginStoryboard</span><span
style="color: blue;"> </span><span
style="color: red;">Storyboard</span><span
style="color: blue;">=</span>"<span style="color: blue;">{StaticResource
OrnekAnimasyon}</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">EventTrigger</span><span
style="color: blue;">\></span>

<span style="color: blue;">  **\</**</span><span
style="color: #a31515;">**Page.Triggers**</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">18,34,131,128</span>"<span style="color: blue;">
</span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: blue;">
</span><span style="color: red;">ScaleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">ScaleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: blue;">
</span><span style="color: red;">AngleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span
style="color: red;">AngleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;"> </span><span style="color: red;">Angle</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: blue;"> </span><span style="color: red;">X</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span style="color: red;">Y</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">18,0,0,8</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">81</span>"<span
style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">36</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Page</span><span style="color: blue;">\></span>

Yukarıdaki kodu incelerseniz özellikle kalın olarak yazılmış 4 satır kod
göreceksiniz. Bunlar sayfamızdaki Trigger (Tetikleyiciler) ve Ressources
(Kaynaklar) ile ilgili tanımlamaların bulunduğu bölümler. Bu bölümlerin
tag isimlerinde WPF uygulamamızda "Window" yazıyordu, onları "Page"
olarak değiştirmemiz gerekti, çünkü artık bir Window değil Page
içerisinde çalışıyoruz.

Sıra geldi VB ile yazdığımız kodları da WPF Browser Application tarafına
taşımaya. Gelin yine Page1.XAML'in boş VB sayfasına göz atalım.

<span style="color: blue;">Class</span> Page1

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Epey basit değil mi? :) Eh gelin o zaman kodlarımızı kopyalayalım.

<span style="color: blue;">Imports</span> System.Windows.Media.Animation

 

<span style="color: blue;">Class</span> Page1

    <span style="color: blue;">Dim</span> <span
style="color: blue;">WithEvents</span> Animasyonum <span
style="color: blue;">As</span> Storyboard

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Animasyonum = <span style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Resources.Item(<span
style="color: #a31515;">"OrnekAnimasyon"</span>), Storyboard)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Animasyon\_Bitti(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Animasyonum.Completed

        Microsoft.VisualBasic.MsgBox(<span
style="color: #a31515;">"Bitti"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Aynı kodları bire bir "copy-past" :) Hiçbir değişiklik gerekmeden
uygulamamızı artık F5 tuşu ile Internet Explorer içerisinde
çalıştırabiliriz.

![XBAP - WPF Browser Application iş
başında.](media/XBAP_-_WPF_Browser_Application/10112007_3.png)\
*XBAP - WPF Browser Application iş başında.*

Hızlı ilerlemek ve konsepti gösterebilmek adına yine çok basit bir örnek
olduğunun farkındayım fakat hayal gücünüzü kullanmak tabi ki size
kalmış. WPF içerisinde yapılabilen (neredeyse) herşeyi WPF Browser
Application'lar ile yapmak da mümkün.

Hepinize kolay gelsin.


