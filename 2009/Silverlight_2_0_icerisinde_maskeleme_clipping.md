---
FallbackID: 2302
Title: Silverlight 2.0 içerisinde maskeleme (clipping)
PublishDate: 1/9/2009
EntryID: Silverlight_2_0_icerisinde_maskeleme_clipping
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: ebe6be30-a49c-46a7-ae3a-404c605a37ca
---
Bu yazımızda Silverlight 2.0 içerisinde maskeleme (clip) işlemlerine göz
atacağız. İlk olarak basit bir maskeleme işleminin XAML içerisinde nasıl
yapıldığına baktıktan sonra bu maskeleri nasıl anime edebileceğimize ve
programatik yoldan ulaşımına değineceğiz.

**Bir maske yaratalım!**

Herhangi bir nesneye maske aktarmak demek aslında o nesnenin Clip
özelliğine uygun bir şekil aktarmak demektir. Elinizde var olan bir
geometri nesnesini alarak bir element'in Clip özelliğine verdiğiniz anda
artık söz konusu Geometri nesnesi bir maske görevi görür. Expression
Blend içerisinde baktığınızda maskeler nesnelerin birer Property'sine
atandığı için ayrı birer obje olarak arayüzde gözükmez.

![Expression Blend içerisinde maskelenmeye hazır
kontroller.](http://cdn.daron.yondem.com/assets/2302/09012009_1.jpg)\
*Expression Blend içerisinde maskelenmeye hazır kontroller.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere sahnede bir Image
ve bir de Ellipse nesnesi bulunuyor. Bir sonraki adımda amacımız bu
Ellipse nesnesini Image için bir maske haline getirmek. Yapacağımız
işlem bu iki nesneyi fare ile seçip "Objects and Timeline" kısmında sağ
tıklayıp "**Path / Make Clipping Path**" komutunu vermek. Böylece söz
konusu Ellipse artık Image'in Clip özelliğine bir geometri olarak
aktarılacak ve ortada Ellipse diye bir nesne kalmayacak.

![Maskelenmiş Image kontrolümüz
karşınızda.](http://cdn.daron.yondem.com/assets/2302/09012009_2.jpg)\
*Maskelenmiş Image kontrolümüz karşınızda.*

Artık kontrolümüzü maskeledik ve Ellipse diye bir nesne kalmadı peki
arkaplanda XAML tarafında neler oldu? Gelin Blend'in bizim için
yarattığı XAML kodunu bir detaylıca inceleyelim.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span
style="color: blue;">="25.032,27,84.032,54.842"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="1080366\_88011245.jpg"</span><span
style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span><span style="color: red;">
**Clip**</span><span style="color: blue;">="M258.5,130 C258.5,166.17465
212.60919,195.5 156,195.5 C99.390816,195.5 53.5,166.17465 53.5,130
C53.5,93.825348 99.390816,64.5 156,64.5 C212.60919,64.5 258.5,93.825348
258.5,130 z"/\></span>

Gördüğünüz gibi Image nesnesinin uzun bir Clip datası var. Bu data bizim
bir önceki adımda yarattığımız Ellipse'in ta kendisi. Aslında bu kodu bu
şekilde yazmak yerine daha okunaklı bir şekilde de yazabilirdik. Nasıl
mı?

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span
style="color: blue;">="7.968,-68,101.032,0"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="1080366\_88011245.jpg"</span><span
style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="218"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">EllipseGeometry</span><span style="color: red;">
Center</span><span style="color: blue;">="200,100"</span><span
style="color: red;"> RadiusX</span><span
style="color: blue;">="90"</span><span style="color: red;">
RadiusY</span><span style="color: blue;">="60" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

Peki ne değişti? Nesne basında **Clip** vermiş olduk. Image nesnesinin
Clip özelliğine doğrudan koordinatları girmek yerine ayrı bir element
vermeye karar verdik ve bu nedenle de **Image.Clip** tagları açarak
içerisine bir Geometry nesnesi yerleştirdik. **EllipseGeometry** nesnesi
gibi **GeometryGroup**, **LineGeometry**, **PathGeometry** nesneleri de
mevcut. Bizdeki örnekte **EllipseGeometry'nin** **Center** özelliği
maskelenen **Image** nesnesinin merkez noktasına göre maskenin ne kadar
uzaklıkta olacağına dair X ve Y değerlerini verirken RadiusX ve
RadiusY'de yatay ve dikey olarak Ellipse'in yarıçapını tanımlıyor. Peki
bu iki metod arasındaki diğer farklar nelerdir? Gelin olayın animasyon
kısmına bir bakalım.

**Maskelere animasyon katalım....**

Herhangi bir nesnenin maskesine animasyon verebilmek için Expression
Blend içerisinde animasyon modunda sol taraftaki araç çubuğundan
**Selection** aracı yerine "**Direct Selection**" aracını
kullanmalısınız. Söz konusu aracı seçtiğiniz anda seçili nesnenin
maskesine ait tanımlı noktaları ekranda görebilirsiniz. Böylece
rahatlıkla KeyFrame'ler yaratarak noktaların pozisyonlarını
değiştirebilir ve maskeyi anime edebilirsiniz.

![Maskemize animasyon
verirken.](http://cdn.daron.yondem.com/assets/2302/09012009_3.jpg)\
*Maskemize animasyon verirken.*

Biz örneğimizde maskedeki tüm noktaları toplu seçerek bir Ellipse
şekliden tüm maskenin pozisyonunu değiştiren bir animasyon hazırlıyoruz.
Böylece sanki bir ışık ile resme bakılıyormuş gibi resmin üzerinde
geziliyor görüntüsü yaratıyoruz. Gelin Blend'in bizim için yarattığı
XAML koduna göz atalım.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Storyboard1"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**image**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(**UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.StartPoint)**"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="258.5,130"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="218.937328102718,129.064332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="**(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[0].(BezierSegment.Point1)**"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="**258.5,166.174652099609**"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="**218.937328102718,165.238984828011**"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[0].(BezierSegment.Point2)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="212.609191894531,195.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="173.046519997249,194.564332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[0].(BezierSegment.Point3)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="156,195.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="116.437328102718,194.564332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[1].(BezierSegment.Point1)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="99.3908157348633,195.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="59.8281438375813,194.564332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[1].(BezierSegment.Point2)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="53.5,166.174652099609"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="13.937328102718,165.238984828011"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[1].(BezierSegment.Point3)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="53.5,130"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="13.937328102718,129.064332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[2].(BezierSegment.Point1)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="53.5,93.8253479003906"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="13.937328102718,92.8896806287922"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[2].(BezierSegment.Point2)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="99.3908157348633,64.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="59.8281438375813,63.5643327284016"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[2].(BezierSegment.Point3)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="156,64.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="116.437328102718,63.5643327284016"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[3].(BezierSegment.Point1)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="212.609191894531,64.5"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="173.046519997249,63.5643327284016"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[3].(BezierSegment.Point2)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span
style="color: blue;">="258.5,93.8253479003906"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="218.937328102718,92.8896806287922"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="image"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Clip).(PathGeometry.Figures)[0].(PathFigure.Segments)[3].(BezierSegment.Point3)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="258.5,130"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span
style="color: blue;">="218.937328102718,129.064332728402"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Animasyonun kodu gördüğünüz gibi epey uzun. Aslında Blend kendi Clip'ini
noktalardan yarattığı için mecburen bu noktaları tek tek anime ederek
noktaların pozisyonlarını değiştirmek zorunda kalıyor. Bu esnada bizim
Image'in XAML kodlarına bakarsan zaten minik bir değişiklik de
dikkatimizi çekiyor.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span
style="color: blue;">="57,73.921,52,8.079"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="1080366\_88011245.jpg"</span><span
style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="image"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PathGeometry</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PathFigure</span><span style="color: red;">
IsClosed</span><span style="color: blue;">="True"</span><span
style="color: red;"> StartPoint</span><span
style="color: blue;">="258.5,130"\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BezierSegment</span><span style="color: red;">
Point1</span><span
style="color: blue;">="258.5,166.174652099609"</span><span
style="color: red;"> Point2</span><span
style="color: blue;">="212.609191894531,195.5"</span><span
style="color: red;"> Point3</span><span
style="color: blue;">="156,195.5"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BezierSegment</span><span style="color: red;">
Point1</span><span
style="color: blue;">="99.3908157348633,195.5"</span><span
style="color: red;"> Point2</span><span
style="color: blue;">="53.5,166.174652099609"</span><span
style="color: red;"> Point3</span><span
style="color: blue;">="53.5,130"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BezierSegment</span><span style="color: red;">
Point1</span><span
style="color: blue;">="53.5,93.8253479003906"</span><span
style="color: red;"> Point2</span><span
style="color: blue;">="99.3908157348633,64.5"</span><span
style="color: red;"> Point3</span><span
style="color: blue;">="156,64.5"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BezierSegment</span><span style="color: red;">
Point1</span><span
style="color: blue;">="212.609191894531,64.5"</span><span
style="color: red;"> Point2</span><span
style="color: blue;">="258.5,93.8253479003906"</span><span
style="color: red;"> Point3</span><span
style="color: blue;">="258.5,130"/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PathFigure</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PathGeometry</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

Söz konusu Clip'in içindeki noktaları anime edebilmek için Blend de
kısmen bizim taktiğe geri dönmüş ve bir PathGeometry yerleştirmiş. Oysa
biz zamanında Ellipse koymuştuk :) Neden doğrudan o esnada
**EllipseGeometry** koymadın? diye Blend'e sorarsak eminim cevabı basit
olacaktır. "Nereden bilebilirim ki bu noktaları ayrı ayrı anime
etmeyeceğinizi?" Aslında Blend haklı. Blend her ihtimali düşünmek
zorunda çünkü o bir GUI :) Oysa biz kendi örneğimizde maske olarak
Ellipse'in şeklini değiştirmeyeceğiz, sadece konumunu değiştireceğiz o
nedenle bu sistem bize çok da uygun değil.

Yukarıdaki **PointAnimation** taglarına bakarsan tek tek Image
nesnesinin **Clip** özelliğindeki değerin alınıp bu değerdeki noktaların
Index numarası verilerek bulunduğunu ve pozisyonlarının değiştirildiğini
görebilirsiniz. Performans açısından bir sıkıntısı olmasa da oluşan
kodun okunabilirliliği çok zayıf olmakla beraber bu gibi bir **Clip**
nesnesinin programatik olarak anime edilmesi de neredeyse imkansız. C\#
veya VB kodu ile tek tek bu noktaları bulup anime etmek işkenceden
farksız olacaktır.

**Peki ya bizim teknikle yaparsak?**

Bizim esas istediğimiz maskenin konumunun değişmesiydi. Daha önceki
kodlarımızda bir EllipseGeometry'yi maske olarak verebilmiştik. Bu
EllipseGeometry nesnesinin Center özelliği maskenin konumunu
belirliyordu. Bu durumda bizim kodumuzda bu özelliklerin anime edilmesi
yeterli olacaktır. Fakat eğer Blend içerisinde bu animasyonu yapacak
olursanız bizim EllipseGeometry'yi ısrarlı bir şekilde yukarıdaki gibi
bir **PathGeometry'ye** çevirecek ve yine aynı animasyon kodunu
üretecektir. Bu durumda bizim de programatik olarak bu maskeyi anime
etmemiz yine zorlaşacaktır.

Sonuç olarak eğer bir nesnenin maskesinin pozisyonunu çok uğraşmadan kod
ile anime edebilmek istiyorsanız Blend'in arayüzünden anime etmemeniz
gerekiyor.

**Programatik olarak maskeye erişmek...**

Bir nesnenin maskesine programatik olarak erişmek için söz konusu
nesnenin Clip özelliğini alıp uygu Geometry tipine cast edebilirsiniz.
Sonrasında elinizde Geometry nesnesi ile ilgilenmeniz yeterli olacaktır.
Oysa bir diğer seçenek de XAML içerisinde bu Geometry nesnesine el ile
bir isim vermektir.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span
style="color: blue;">="7.968,-68,101.032,0"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="1080366\_88011245.jpg"</span><span
style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="218"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">EllipseGeometry</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Maskesi"**</span><span style="color: red;">
Center</span><span style="color: blue;">="200,100"</span><span
style="color: red;"> RadiusX</span><span
style="color: blue;">="90"</span><span style="color: red;">
RadiusY</span><span style="color: blue;">="60" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.Clip</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

Gördüğünüz gibi basit bir şekilde bizim EllipseGeometry nesnesine bir
isim verdik. Artık kod tarafında bu isim ile **EllipseGeometry'ye**
ulaşabilir ve **Center** veya **RadiusX** ve **RadiusY** özelliklerini
değiştirebiliriz.

**[VB]**

Maskesi.Center = <span style="color: blue;">New</span> Point(200, 200)

Böylece tamamen kod ile bu maskeyi anime etmek istediğinizde de
rahatlıkla bu noktayı anime ederek maskenin pozisyonunun değiştiği bir
animasyon üretebilirsiniz. Örnek bir kodu aşağıda inceleyebilirsiniz.

**[VB]**

<span style="color: blue;">Dim</span> DBL <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
PointAnimation

DBL.From = <span style="color: blue;">New</span> **Point(100, 100)**

DBL.To = <span style="color: blue;">New</span> **Point(200, 200)**

DBL.Duration = <span style="color: blue;">New</span> TimeSpan(0, 0, 2)

Storyboard.SetTarget(DBL, **Maskesi**)

Storyboard.SetTargetProperty(DBL, <span style="color: blue;">New</span>
PropertyPath(**EllipseGeometry.CenterProperty**))

<span style="color: blue;">Dim</span> SB <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Storyboard

SB.Children.Add(DBL)

SB.Begin()

**[C\#]**

PointAnimation DBL = <span style="color: blue;">new</span>
PointAnimation();

DBL.From = <span style="color: blue;">new</span> Point(100, 100);

DBL.To = <span style="color: blue;">new</span> Point(200, 200);

DBL.Duration = <span style="color: blue;">new</span> TimeSpan(0, 0, 2);

Storyboard.SetTarget(DBL, Maskesi);

Storyboard.SetTargetProperty(DBL, <span style="color: blue;">new</span>
PropertyPath(EllipseGeometry.CenterProperty));

Storyboard SB = <span style="color: blue;">new</span> Storyboard();

SB.Children.Add(DBL);

SB.Begin();

Eğer bu animasyonu XAML tarafında temiz olarak yazmak isterseniz aslında
pratik bir şekilde elle de yazabilirsiniz.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Storyboard1"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Maskesi**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="**(EllipseGeometry.Center)**"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="100,100"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplinePointKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="200,200"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">PointAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Animasyonumuz doğrudan Maskesi adındaki **EllipseGeometry'yi** hedef
alarak onun **Center** property'sini anime ediyor.

Unutmayın ki bizim örneğimizde böyle bir optimizasyon yapabilmemizin
nedeni maskenin sadece pozisyonunu değiştirmek istememiz. Eğer maskedeki
her bir noktanın konumunu ayrı ayrı birbirinden bağımsız olarak anime
etmek isterseniz Blend'in yaptığı teknikten farklı bir seçeneğiniz zaten
yok.

Hepinize kolay gelsin.


