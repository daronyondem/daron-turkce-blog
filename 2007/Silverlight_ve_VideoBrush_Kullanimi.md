# Silverlight ve VideoBrush Kullanımı
Dünkü Silverlight ve MediaElement örneğimize **VideoBrush** ile devam
edeceğiz. İlk olarak MediaElement nesnemizi biraz daha ufaltarak yansıma
için ekranda yer açalım. Sonrasında da MediaElement'imize bir isim
vereceğiz.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">MediaElement</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Goruntu</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bear.wmv</span>"<span style="color: blue;">
</span><span style="color: red;">MouseLeftButtonDown</span><span
style="color: blue;">=</span>"<span
style="color: blue;">VideoTiklandi</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">384</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">288</span>"<span style="color: blue;"> </span><span
style="color: red;">Stretch</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Fill</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;">/\></span>

\

Yukarıdaki biri x:Name diyerek herhangi bir elemente isim verme şansımız
var. Bu işlemi Expression Blend 2 içerisinde görsel arayüzden de
yapabiliriz.

![MediaElement'imize isim
veriyoruz.](media/Silverlight_ve_VideoBrush_Kullanimi/29102007_1.png)\
*MediaElement'imize isim veriyoruz.*

Verdiğimiz bu isim ileride bir **VideoBrush** tanımlarken çok işimize
yarayacak. Şimdi gelin videonun yansımasını gösterecek olan, ekranda
taşıyacak olan nesnemizi belirleyelim. Bunun için basit bir dikdörtgen
(rectangle) kullanacağız. **Rectangle** nesnesini Expression Blend 2
içerisinde solda araç çubuğunda bulabilirsiniz. Dikdörtgenin bir
yansımayı temsil edebilmesi için perspektifi ile oynamanın yanı sıra
dikdörtgene bir de **OpacityMask** uygulayacağız.

![Dikdörtgenimize uyguladığımız perspektif ve yansıma
efektleri.](media/Silverlight_ve_VideoBrush_Kullanimi/29102007_2.png)\
*Dikdörtgenimize uyguladığımız perspektif ve yansıma efektleri.*

Yukarıdaki ekran görüntülerinde de görebileceğiniz üzere ilk olarak
dikdörtgenin Y ekseninde yansımasını alıyoruz sonrasında da perspektif
veriyoruz. Son olarak da sıra geldi bir **OpacityMask** uygulamaya.
Böylece yansıma görünür durumdan başlayarak şeffaflığa doğru kaybolacak.

![OpacityMask ayarlarımızı
yapıyoruz.](media/Silverlight_ve_VideoBrush_Kullanimi/29102007_3.png)\
*OpacityMask ayarlarımızı yapıyoruz.*

Dikdörtgeni Expression Blend 2 içerisinde seçtikten sonra sağ sütundan
**Properties** sayfasında **OpacityMask'ı** seçiyoruz. **OpacityMask**
olarak uygulamak üzere bir **Gradient** seçerek **gradient**
renklerinden birinin **Alpha** değerini sıfır yaparak şeffaftan
görünürlülüğe doğru giden bir efekt yaratıyoruz. Efektin yönünü
ayarlamak için Expression Blend 2'nin sol araç çubuğundan **Brush
Transform** aracını kullanabilirsiniz.

Tüm bunları tamamladığımızda dikdörtgenimizin XAML kodu aşağıdaki
şekilde sonlanıyor.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">380.569</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">70</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">297</span>"<span style="color: blue;"> </span><span
style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span
style="color: blue;">-25</span>"<span style="color: blue;"> </span><span
style="color: red;">Opacity</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.8</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: blue;">
</span><span style="color: red;">ScaleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">ScaleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">-1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: blue;">
</span><span style="color: red;">AngleX</span><span
style="color: blue;">=</span>"<span
style="color: blue;">23.963</span>"<span style="color: blue;">
</span><span style="color: red;">AngleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;"> </span><span style="color: red;">Angle</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: blue;"> </span><span style="color: red;">X</span><span
style="color: blue;">=</span>"<span
style="color: blue;">51.527</span>"<span style="color: blue;">
</span><span style="color: red;">Y</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle.OpacityMask</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.514,0.957</span>"<span style="color: blue;">
</span><span style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.507,0.129</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#00000000</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle.OpacityMask</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

\

Tüm ayarlarımızı tamamladığımıza göre sıra geldi bir **VisualBrush**
tanımlayarak dikdörtgenini içini bu **VisualBrush** ile doldurmaya. Bu
işlemleri direk XAML kodları yazarak yapacağız. Aşağıda bir
VisualBrush'ın nasıl tanımlandığını inceleyelim.

<span style="color: blue;">      \<</span><span
style="color: #a31515;">VideoBrush</span><span style="color: blue;">
</span><span style="color: red;">SourceName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Goruntu</span>"<span style="color: blue;">
/\></span>

\

Hiç zor bir kod sayılmaz. Tek yapmamız gereken hedef video kontrolünün
adını **SourceName** özelliğine aktarmış olmak. Tanımladığımız bu
VideoBrush'ı dikdörtgenin **Fill** değerine atayacağız. XAML sayfamızın
tamamının son hali aşağıdaki şekilde sonlanıyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: blue;">  </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">  </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">435</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">382</span>"

<span style="color: blue;">  </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span style="color: blue;">White</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Page</span>"

<span style="color: blue;">  \></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">MediaElement</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Goruntu</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bear.wmv</span>"<span style="color: blue;">
</span><span style="color: red;">MouseLeftButtonDown</span><span
style="color: blue;">=</span>"<span
style="color: blue;">VideoTiklandi</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">384</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">288</span>"<span style="color: blue;"> </span><span
style="color: red;">Stretch</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Fill</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">380.569</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">70</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">297</span>"<span style="color: blue;"> </span><span
style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span
style="color: blue;">-25</span>"<span style="color: blue;"> </span><span
style="color: red;">Opacity</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.8</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  **  \<**</span><span
style="color: #a31515;">**Rectangle.Fill**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**      \<**</span><span
style="color: #a31515;">**VideoBrush**</span><span style="color: blue;">
**** </span><span style="color: red;">**SourceName**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Goruntu**</span>"<span style="color: blue;">
**/\>**</span>

<span style="color: blue;">**    \</**</span><span
style="color: #a31515;">**Rectangle.Fill**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: blue;">
</span><span style="color: red;">ScaleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">ScaleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">-1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: blue;">
</span><span style="color: red;">AngleX</span><span
style="color: blue;">=</span>"<span
style="color: blue;">23.963</span>"<span style="color: blue;">
</span><span style="color: red;">AngleY</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;"> </span><span style="color: red;">Angle</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: blue;"> </span><span style="color: red;">X</span><span
style="color: blue;">=</span>"<span
style="color: blue;">51.527</span>"<span style="color: blue;">
</span><span style="color: red;">Y</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Rectangle.OpacityMask</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.514,0.957</span>"<span style="color: blue;">
</span><span style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.507,0.129</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#00000000</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Rectangle.OpacityMask</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

\

![VisualBrush ile yarattığımız video
yansıması.](media/Silverlight_ve_VideoBrush_Kullanimi/29102007_4.jpg)\
*VisualBrush ile yarattığımız video yansıması.*

Bu yazımızda da *VideoBrush* tanımlamayı, nesnelere isim vermeyi,
dikdörtgen nesnelerini ve transform işlemlerinin bir kısmını inceledik.
Silverlight ile videoların yansımalarını almak bu kadar kolay. Bu
yansımaların herhangi bir performans alanında dezavantajı yok.

Biz örneğimizde tanımlamış olduğumuz VisualBrush'ı bir Rectangle'a ait
**Fill** özelliğine aktardık. İsterseniz VisualBrush'ları aşağıdaki
şekilde istediğiniz yere aktarabilirsiniz.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">244</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">84</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;"> </span><span
style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span style="color: blue;">72</span>"<span
style="color: blue;"> </span><span
style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">TextBlock.Foreground</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">VideoBrush</span><span style="color: blue;">
</span><span style="color: red;">SourceName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Goruntu</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">TextBlock.Foreground</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

\

Bu örnekte sayfaya yerleştirdiğimiz bir **TextBlock** nesnesinin
**ForeGround** özelliğine **VisualBrush** tanımladık. Böylece TextBlock
içerisinde yazan yazıların içinde videomuz oynatılacak.

![Yazının içerisinde video
yerleştiriyoruz.](media/Silverlight_ve_VideoBrush_Kullanimi/29102007_5.jpg)\
*Yazının içerisinde video yerleştiriyoruz.*

Tüm bu video işlemleri çok kolaylıkla sadece birkaç satır kod ile en
ufak bir performans kaybı olmaksızın yapılabilir. Gerisi tamamen sizin
hayal gücünüze kalmış.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-10-30 tarihinde yayinlanmistir.*
