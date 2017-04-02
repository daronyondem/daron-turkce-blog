---
FallbackID: 2102
Title: Silverlight 2.0 ile Analog Saat Uygulaması
PublishDate: 6/23/2008
EntryID: Silverlight_2_0_ile_Analog_Saat_Uygulamasi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: f229ac3b-1499-4982-b80e-fddef455c124
---
**Silverlight 2.0 Beta 2** kullanarak analog bir saat gösterimi
yapacağımız bu yazı içerisinde StoryBoard kullanımını ve
StoryBoard'ların belirli zamanlara özel olarak konumlandırılmasını
inceleyeceğiz. Gelin ilk olarak işin görsel tarafını halledelim ve
Expression Blend 2.5 ile bir saat görseli yaratalım.

Saatimizde toplam üç adet dikdörtgene ihtiyacımız var. Bu dikdörtgenler
saatin akrep, yelkovan ve saniye göstergesini temsil edecek. Ayrıca
saatin ana gövdesini oluşturacak bir de Ellipse kullanacağız.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication16.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span><span
style="color: red;"> mc</span><span style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,0,120,20"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Govde"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="80"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,59,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Saat"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="107"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,32,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span> <span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FF00C6FF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Dakika"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="131"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,8,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFD600FF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Saniye"**/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Bu noktadan sonra animasyonlarımızı hazırlamaya başlayalım. Saniyeyi
gösterecek olan saat kolunun toplam 60 saniye içerisinde 360 derece
dönmesi gerekiyor. Buna uygun animasyon yaratmadan önce tüm
dikdörtgenlerimizin merkez noktasını saatin ortasına gelecek şekilde
düzenleyelim. Böylece dikdörtgenler saatin merkez noktasın etrafında
dönecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication16.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span><span
style="color: red;"> mc</span><span style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,0,120,20"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Govde"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="80"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,59,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span><span
style="color: red;"> **RenderTransformOrigin**</span><span
style="color: blue;">**="0.5,1"**</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFFFFFF"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Saat"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="107"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,32,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span><span
style="color: red;"> **RenderTransformOrigin**</span><span
style="color: blue;">**="0.5,1"**</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FF00C6FF"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Dakika"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="131"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="136,8,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="8"</span><span
style="color: red;"> **RenderTransformOrigin**</span><span
style="color: blue;">**="0.5,1"**</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFD600FF"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Saniye"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamızın XAML kodunun son hali yukarıdaki şekilde. Hemen saniye
koluna ait animasyonu hazırlayalım. **SaniyeAnim** adını vererek yeni
bir **StoryBoard** yaratıyoruz ve söz konusu StoryBoard'un 60.
saniyesinde saniye adındaki dikdörtgeni dönüş açısını 360 derece olarak
tanımlıyoruz.

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**SaniyeAnim**"</span><span style="color: red;">
**RepeatBehavior**</span><span
style="color: blue;">**="Forever"**\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Saniye**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.RenderTransform).(TransformGroup.Children)[2].(RotateTransform.Angle)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="**00:01:00**"</span><span style="color: red;">
Value</span><span style="color: blue;">="**360**"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Yukarıdaki animasyon içerisinde de gördüğünüz üzere ilk olarak
animasyonun **RepeatBehavior** özelliğine **Forever** değerini vererek
animasyonun sürekli tekrar edeceğini belirtiyoruz. Sonrasında **Saniye**
dikdörtgenini hedef alan animasyon dikdörtgenin dönüş açısını bir dakika
içinde 360 dereceye getiriyor.

Saniye kolu için yaptığımız animasyonlarla aynı mantıkta dakika ve saat
kolları için de animasyonlar düzenleyeceğiz. Dakika kolu için
düzenlediğimiz animasyon dakika kolunu 60 dakika içerisinde 360 derece
döndürecek.

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**DakikaAnim**"</span><span style="color: red;">
RepeatBehavior</span><span style="color: blue;">="Forever"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Dakika**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.RenderTransform).(TransformGroup.Children)[2].(RotateTransform.Angle)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="**01:00:00**"</span><span style="color: red;">
Value</span><span style="color: blue;">="**360**"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Son olarak saat kolu için düzenleyeceğimiz animasyonda da saat kolunu 12
saat içerisinde 360 derece döndüreceğiz.

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**SaatAnim**"</span><span style="color: red;">
RepeatBehavior</span><span style="color: blue;">="Forever"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Saat**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.RenderTransform).(TransformGroup.Children)[2].(RotateTransform.Angle)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="**12:00:00**"</span><span style="color: red;">
Value</span><span style="color: blue;">="**360**"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Tüm bu animasyonlar çalıştığında saatimiz doğru bir şekilde işliyor
olacak. Fakat esas mesele Silverlight uygulaması ilk açıldığında tüm
saat kollarını doğru başlangıç noktalarına getirmek. Bunu yapabilmek
için StoryBoard'ların **Seek** metodundan faydalanacağız. Seek metodu
ile istediğimiz bir StoryBoard'u kendi içinde istediğimiz zaman
aralığına getirebiliyoruz.

        SaniyeAnim.Begin()

        DakikaAnim.Begin()

        SaatAnim.Begin()

 

        SaniyeAnim.Seek(<span style="color: blue;">New</span>
TimeSpan(0, 0, Now.Second))

        DakikaAnim.Seek(<span style="color: blue;">New</span>
TimeSpan(0, Now.Minute, Now.Second))

        SaatAnim.Seek(<span style="color: blue;">New</span>
TimeSpan(Now.Hour, Now.Minute, Now.Second))

Yukarıdaki kodun başında tüm animasyonlarımızı hemen başlatıyoruz sonra
da her animasyonu uygun başlangıç noktasına getirmek için **Seek**
metodunu kullanıyoruz. Seek metoduna verdiğimiz **TimeSpan**
parametresini yaratırken her bir kola uygun değerleri aktarıyoruz.
Saniye koluna sadece içerisinde bulunduğumuz zamanın saniyesini, dakika
koluna dakikayı ve saat koluna da saat bilgisini veriyoruz ve
animasyonlarımız o konumdan gelerek oynamaya devam ediyor.

Saat uygulamamızı tamamladık, hepinize kolay gelsin.


