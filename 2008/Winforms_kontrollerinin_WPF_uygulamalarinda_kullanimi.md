---
FallbackID: 2016
Title: "Winforms kontrollerinin WPF uygulamalarında kullanımı."
date: "2008-4-9"
EntryID: Winforms_kontrollerinin_WPF_uygulamalarinda_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: 5314b222-d27e-4b4d-9435-74c4c38ef61c
---
# Winforms kontrollerinin WPF uygulamalarında kullanımı.
Daha önceki bir
[yazımda](http://daron.yondem.com/tr/post/399ae928-b165-4690-8346-cdb60f82c9b4)
WPF özelliklerini Winforms pencerelerine nasıl taşıyabileceğimizden
bahsetmiştim. Oysa bir de tam tersi bir senaryo da mümkün olabilir. Yani
Winforms tarafındaki bir kontrolü herhangi bir WPF uygulamasına
kullanmak isteyebilirsiniz. Peki bu durumda neler yapabilirz? İşte bu
yazımızda bu sorunu çözeceğiz.

**Winforms kontrollerini WPF projemize ekleyelim.**

İlk olarak yarattığımız herhangi bir WPF projesinde Winforms
kontrollerini kullanabilmek için tabi ki **System.Windows.Forms**
namespace'ini projemize referans olarak eklememiz gerekiyor. Ayrıca
Winforms kontrolleri ile WPF uygulaması arasında aracı görevi görecek
olan **WindowsFormsHost** sınıfının da projeye kesinlikle referans
olarak eklenmesi şart.

![WPF projemizde Winforms kontrolleri kullanabilmek için eklediğimiz
referanslar.](media/Winforms_kontrollerinin_WPF_uygulamalarinda_kullanimi/08042008_1.png)\
*WPF projemizde Winforms kontrolleri kullanabilmek için eklediğimiz
referanslar.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere biri .NET
Framework 2.0'dan diğeri de 3.0'dan iki farklı harici sınıfı projemize
referans olarak eklememiz gerekiyor. Sonrasında artık yazacağımız kodlar
ile uygulamamızda Winforms kontrollerini kullanabileceğiz.

**Kod ile Winforms kontrollerinin WPF içerisinde kullanımı**

Gelin hemen bir örnek deneyelim ve ufak bir WPF uygulaması hazırlayarak
içerisine de minik bir animasyon yerleştirelim. Sonrasında hedefimiz bu
WPF uygulamasına bir Winforms Button kontrolü yerleştirerek düğmeye
basıldığında WPF animasyonunu çalıştırmak olsun.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/psentation"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="Window1"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Window"</span>

<span style="color: red;">  Title</span><span
style="color: blue;">="Window1"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="Animasyon"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Rectangle.RadiusX)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="99"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Rectangle.RadiusY)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="99"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="46,80,0,0"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="199"</span><span style="color: red;">
Height</span><span style="color: blue;">="137"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFF0000"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**rectangle**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
Margin</span><span style="color: blue;">="96,0,295,70"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Bottom"</span><span style="color: red;">
Height</span><span style="color: blue;">="118"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**WinformsCanvas**"/\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

Gördüğünüz gibi kod içerisinde animasyon uygulanan bir dikdörtgen ve bir
de Canvas bulunuyor. Söz konusu Canvas'ın adı da **WinformsCanvas**
olarak düzenlenmiş. İşte biz de Winforms kontrolümüzü tam bu Canvas'ın
içerisine kod ile ekleyeceğiz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> HostKontrol <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Forms.Integration.**WindowsFormsHost**

        <span style="color: blue;">Dim</span> x <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Forms.**Button**

        x.Text = <span style="color: #a31515;">"Deneme"</span>

        <span style="color: blue;">AddHandler</span> x.Click, <span
style="color: blue;">AddressOf</span> **Tiklandi**

        HostKontrol.Child = x

        WinformsCanvas.Children.Add(HostKontrol)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> **Tiklandi**(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

        <span style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Resources(<span
style="color: #a31515;">"Animasyon"</span>), Storyboard).Begin(<span
style="color: blue;">Me</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz gibi ilk olarak bir **WindowsFormsHost** kontrolü
yaratıyoruz. Bu kontrol herhangi bir Winforms kontrolünün WPF
uygulamasına kullanılabilmesini sağlıyor. Biz örnek olarak bir düğme
yaratarak **HostKontrol** değişkenine bunu aktarıyoruz. Son olarak da
XAML kodumuzdaki Canvas'ın içerisinde **WindowsFormsHost** kontrolümü
yerleştiriyoruz. Kod içerisinde yarattığımız düğmenin **Click** durumun
da başka bir handler ile yakaladığımız için rahatlıkla istediğimiz WPF
animasyonunu yakalayarak çalıştırabiliriz. Tabi hikaye sadece standart
Winforms kontrolleri için geçerli değil, isterseniz Winforms
uygulamalarında UserControl'lerinizi de aynı şekilde kullanabilirsiniz.

**XAML ile Winforms kontrollerinin WPF içerisinde kullanımı**

Peki doğrudan XAML içerisinde Winforms kontrollerini kullanmak istersek
neler yapabiliriz? Böyle bir durumda da doğrudan XAML içerisinde söz
konusu sınıfları tanımlamış olmanız gerekecektir.

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">wfi</span><span
style="color: blue;">="clr-namespace:System.Windows.Forms.Integration;assembly=WindowsFormsIntegration"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">wf</span><span
style="color: blue;">="clr-namespace:System.Windows.Forms;assembly=System.Windows.Forms"</span>

Yukarıdaki gibi gerekli tanımlamaları yaptıktan sonra artık ister
doğrudan **WindowsFormsHost** kontrolünü ister herhangi bir Winforms
kontrolünü XAML içerisinde rahatlıkla kullanabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/psentation"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">**  xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**wfi**</span><span
style="color: blue;">**="clr-namespace:System.Windows.Forms.Integration;assembly=WindowsFormsIntegration"**</span>

<span style="color: red;">**  xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**wf**</span><span
style="color: blue;">**="clr-namespace:System.Windows.Forms;assembly=System.Windows.Forms"**</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="Window1"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Window"</span>

<span style="color: red;">  Title</span><span
style="color: blue;">="Window1"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="Animasyon"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Rectangle.RadiusX)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="99"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Rectangle.RadiusY)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="99"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Window.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Window.Triggers</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Window.Triggers</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="46,80,0,0"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="199"</span><span style="color: red;">
Height</span><span style="color: blue;">="137"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFF0000"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="rectangle"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
Margin</span><span style="color: blue;">="96,0,295,70"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Bottom"</span><span style="color: red;">
Height</span><span style="color: blue;">="118"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="WinformsCanvas"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**WindowsFormsHost**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">wf</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**Button**</span><span style="color: red;">
Text</span><span style="color: blue;">="Tikla"</span><span
style="color: red;"> Click</span><span
style="color: blue;">="**Tiklandi**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">WindowsFormsHost</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

Düğmemizin code-behind kısmına baktığımızda aslında standart bir
event-handler'dan farklı birşey de görmüyoruz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Tiklandi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

        <span style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Resources(<span
style="color: #a31515;">"Animasyon"</span>), Storyboard).Begin(<span
style="color: blue;">Me</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Böylece Winforms kontrolümüzü WPF içerisinde rahatlıkla
kullanabiliyoruz. Özellikle WPF kontrolleri arasında şu an eksik olan
çoğu Winforms kontrolünü bu şekilde WPF dünyasına alarak söz konusu
kontrollerin işlevselliklerinden faydalanabiliriz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-4-9 tarihinde yayinlanmistir.*
