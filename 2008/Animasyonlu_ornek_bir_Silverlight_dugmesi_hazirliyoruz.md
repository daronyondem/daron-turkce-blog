---
FallbackID: 1953
Title: Animasyonlu örnek bir Silverlight düğmesi hazırlıyoruz.
PublishDate: 9/2/2008
EntryID: Animasyonlu_ornek_bir_Silverlight_dugmesi_hazirliyoruz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: f3987f54-7163-4861-ab96-4685a18d3395
---
Bu makalemizde hızlı bir şekilde örnek bir Silverlight düğmesi
tasarlayarak fare ile üzerine gelindiğinde parlamasını üzerinden
çekildiğinde de eski haline geri dönmesini sağlayacağız. İlk olarak
düğmemizi çizmek için Expression Blend 2 içerisinde yeni bir Silverlight
projesi yaratalım ve Rectangle çizim aracı ile bir dikdörtgen çizelim.
Dikdörtgeni çizdikten sonra Expression Blend 2 içerisinde "Properties"
tabından "Fill" kısmında SolidColor seçerek kırmızı tonlarından biri
seçebiliriz. Son olarak da dikdörtgenimizin kenarlarında aşağıdaki
fotoğraftaki gibi fare ile tutarak köşelerini yuvarlayalım.

![Silverlight düğmemizi
yaratıyoruz.](media/Animasyonlu_ornek_bir_Silverlight_dugmesi_hazirliyoruz/09022008_1.png)\
*Silverlight düğmemizi yaratıyoruz.*

Düğmemizi çizdiğimize göre parlama efekti için biraz değişiklik yapalım.
**SolidColor** yerine **Gradient** seçerek beyazdan kırmızıya bir geçiş
ayarlayarak Expression Blend 2 içerisinde sol araç çubuğundan "Brush
Transform" aracını kullanarak aşağıdaki şekilde bir parlama efekti
hazırlayalım.

![Parlama efekti
hazır.](media/Animasyonlu_ornek_bir_Silverlight_dugmesi_hazirliyoruz/09022008_2.png)\
*Parlama efekti hazır.*

Sıra geldi fare ile üzerine geldiğimizde çalışacak olan animasyonu
hazırlamaya. Yapacağımız şey birer saniye arayla BrushTranform aracı ile
parlama efektinin yani Gradient'ın yönünü değiştirmek. Animasyonumuzu
hazırladıktan sonra düğmenin üzerinden fare ile çekildiğimizde
çalıştırılmak üzere animasyonumuzun bir kopyasını yaratacağız.

![Animasyonumuzun bir kopyasını
alalım.](media/Animasyonlu_ornek_bir_Silverlight_dugmesi_hazirliyoruz/09022008_3.png)\
*Animasyonumuzun bir kopyasını alalım.*

Animasyonumuzun kopyasını aldıktan sonra "geri çekilme" animasyonunu
yaratmak için bir önceki animasyondan aldığımız kopyayı tersine
çevireceğiz. Bunun için yukarıdaki görselde de görebileceğiniz Blend
içerisinde animasyon menüsünden "Reverse" komutunu kullanacağız. Böylece
her iki animasyonumuz da hazır. Artık sıra geldi her iki animasyonun da
zamanında çalışmasını sağlayacak kodları yazmaya.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="300"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span style="color: blue;">
**\<**</span><span style="color: #a31515;">**Storyboard**</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Anim1"\>**</span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Shape.Fill).(RadialGradientBrush.GradientOrigin)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="-0.071,-0.091"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="1.008,-0.061"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span style="color: blue;">
**\<**</span><span style="color: #a31515;">**Storyboard**</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Anim\_Copy1"\>**</span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(Shape.Fill).(RadialGradientBrush.GradientOrigin)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="1.008,-0.061"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="-0.071,-0.091"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
**MouseEnter**</span><span style="color: blue;">**="Geldi"**</span><span
style="color: red;"> **MouseLeave**</span><span
style="color: blue;">**="Gitti"**</span><span style="color: red;">
Width</span><span style="color: blue;">="127"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="33"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="62"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="163"</span><span
style="color: red;"> RadiusY</span><span
style="color: blue;">="10.5"</span><span style="color: red;">
RadiusX</span><span style="color: blue;">="10.5"</span><span
style="color: red;"> RenderTransformOrigin</span><span
style="color: blue;">="0.189,0.091"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="rectangle"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: red;"> GradientOrigin</span><span
style="color: blue;">="1.008,-0.061"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FFFFFFFF"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="1"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodunda hazırladığımız tüm animasyonlar ve düğmemiz yer
alıyor. Düğmemizin **MouseEnter** ve **MouseLeave** durumları ayrı
JavaScript fonksiyonlarına bağlanmış durumda. Aşağıda söz konusu
JavaScript fonksiyonlarını da inceleyebilirsiniz.

<span style="color: blue;">function</span> Gitti(sender)

{

  sender.findName(<span style="color: #a31515;">"Anim1"</span>).Begin();

}

<span style="color: blue;">function</span> Geldi(sender)

{

  sender.findName(<span
style="color: #a31515;">"Anim\_Copy1"</span>).Begin();

}

Her bir fonksiyon kendisine gönderilen **Sender** parametresi üzerinden
düğmemizi yakalayarak, onun üzerinden de **findName** ile animasyonları
bulup çalıştırıyor.

Böylece üzerine gelince veya fare ile üzerinden ayrıldığımızda uygun
animasyonları çalıştıran bir düğmemiz oldu. Hepimize hayırlı olsun ;)


