---
FallbackID: 1968
Title: "Dinamik Silverlight animasyonları yaratıyoruz."
date: "2008-2-25"
EntryID: Dinamik_Silverlight_animasyonlari_yaratiyoruz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 58b36757-8e6d-45f7-a2be-f43c426983c7
---
Silverlight uygulamalarında bazı durumlarda animasyonları dinamik olarak
yaratmak gerekebilir. Bu durum genelde söz konusu animasyonla ilgili
bazı değerlerin önceden bilinmemesinden kaynaklanır. Örneğin dinamik
olarak yarattığınız bir Silverlight nesnesine bağlı bir animasyon
hazırlamak isteyebilirsiniz, fakat hedef nesnenin özellikleri belli
olmadığı için animasyonu da yaratmanız mümkün olmayacaktır veya
animasyonla ilgili bazı değerleri AJAX ile sunucu tarafından alıyor
olabilirsiniz. Bu gibi durumlarda dinamik animasyon yaratabiliyor olmak
hayati öneme sahip.

Silverlight içerisinde dinamik nesneler yaratırken createFromXaml adında
bir metod kullanıyoruz, aynı şekilde dinamil animasyonlar (Storyboard)
yaratırken de yine createFromXaml metodunu kullanıyor olacağız.
createFromXaml metodu yapısı gereği tek bir parametre alıyor, söz konusu
parametre yaratılacak olan nesnenin veya animasyonun XAML kodu.
Animasyon tarafına tam olarak geçmeden önce gelin aşağıdaki şekilde bir
Silverlight projesi yaratalım.

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

<span style="color: red;">  **MouseLeftButtonDown**</span><span
style="color: blue;">**="Tiklandi"**</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Width</span><span style="color: blue;">="45"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="45"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="22"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="27"</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Top"**</span><span style="color: red;">
RenderTransformOrigin</span><span
style="color: blue;">="0.5,0.5"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: red;">
ScaleX</span><span style="color: blue;">="1"</span><span
style="color: red;"> ScaleY</span><span
style="color: blue;">="1"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: red;">
AngleX</span><span style="color: blue;">="0"</span><span
style="color: red;"> AngleY</span><span
style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RotateTransform</span><span style="color: red;">
Angle</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: red;"> X</span><span style="color: blue;">="0"</span><span
style="color: red;"> Y</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Ellipse.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki Silverlight uygulamamız içerisinde adını **Top** koyduğumuz
bir **Ellipse** nesnesi yer alıyor. Ayrıca Silverlight uygulamamızın ana
öğesi olan root **Canvas'ın** da **MouseLeftButtonDown** durumuna bir
event handler bağlamış durumdayız. Birazdan **Tiklandi** adındaki
JavaScript fonksiyonumuzu yazmaya başlayacağız.

Uygulamamızda amacımız Silverlight içerisinde kullanıcı her nereye
tıklarsa tıklasın topun hoş bir animasyon ile o noktaya gitmesini
sağlamak. Bunun için tabi ki her animasyon (StoryBoard) nesneleri
yaratmamız gerekecek fakat bu animasyonların özellikleri şu anda belli
değil çünkü kullanıcının sahnede nereye tıklayacağını bilmiyoruz. O
nedenle animasyonları dinamik olarak tıklama anında yaratarak
çalıştırmamız gerekecek. Yaratacağımız animasyonların şablonu aşağıdaki
gibi olmalı.

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Storyboard1**"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
**Value**</span><span style="color: blue;">**="185"**/\></span>

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
style="color: blue;">="Top"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.Y)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
**Value**</span><span style="color: blue;">**="200"**/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde **Top** nesnemizin sahnedeki yerini
değiştiriyoruz. Bu animasyonu hızlı bir şekilde Blend ile yaratarak
örnek XAML kodunu kopyaladık. Animasyon içerisinde özellikle koyu
yazılan yerlerdeki **Value** değerlerine dikkat etmekte fayda var. Bu
değerlerin **Top'un** gideceği hedef X ve Y koordinatları. Şimdi geçip
yavaş yavaş **Tiklandi** JavaScript fonksiyonumuzu yazmaya başlayalım.

<span style="color: blue;">function</span> Tiklandi(sender, args)

{

    <span style="color: blue;">var</span> TiklananYer =
args.getPosition(<span style="color: blue;">null</span>);

    <span style="color: blue;">var</span> AnimXAML = <span
style="color: #a31515;">'\<Storyboard
xmlns="http://schemas.microsoft.com/client/2007"
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
x:Name="Storyboard'</span> + TiklananYer.X.toString() +
TiklananYer.Y.toString() + <span
style="color: #a31515;">'"\>\<DoubleAnimationUsingKeyFrames
BeginTime="00:00:00" Storyboard.TargetName="Top"
Storyboard.TargetProperty="(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)"\>\<SplineDoubleKeyFrame
KeyTime="00:00:01" Value="'</span> + (TiklananYer.X -
sender.findName(<span style="color: #a31515;">"Top"</span>).width) +
<span
style="color: #a31515;">'"/\>\</DoubleAnimationUsingKeyFrames\>\<DoubleAnimationUsingKeyFrames
BeginTime="00:00:00" Storyboard.TargetName="Top"
Storyboard.TargetProperty="(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.Y)"\>\<SplineDoubleKeyFrame
KeyTime="00:00:01" Value="'</span> + (TiklananYer.Y -
sender.findName(<span style="color: #a31515;">"Top"</span>).height) +
<span
style="color: #a31515;">'"/\>\</DoubleAnimationUsingKeyFrames\>\</Storyboard\>'</span>;

    <span style="color: blue;">var</span> Anim =
sender.getHost().content.createFromXaml(AnimXAML);

    sender.resources.Add(Anim);

    Anim.Begin();

}

Yukarıdaki fonksiyon istediğimiz işlemi tamamlamamız için yeterli. Gelin
bu fonksiyon içerisinde neler yaptığımıza bir bakalım. Birinci satırda
hemen **TiklananYer** adındaki bir değişkene fare ile tıklanan noktanın
koordinatlarını kaydediyoruz. Bunun için **Tiklandi** fonksiyonumuza
gelen ikinci parametre olan **args** üzerinden **getPosition** metodunu
kullanıyoruz. Bir sonraki adımda sıra geldi yaratacağımız animasyonun
XAML kodunu hazırlamaya.

**AnimXAML** adında bir değişkene Blend içerisinde hazırladığımız XAML
metnini aktarıyoruz. Fakat bunu yaparken metin içerisindeki bazı şeyleri
de JavaScript ile atamamız gerekiyor. Örneğin hem X hem de Y yönünde
gidilmesi hedeflenen noktanın koordinatlarını **TiklananYer**
değişkenimizden alarak XAML içerisine yerleştiriyoruz. Top nesnemizin
tam olarak tıklanan noktayı ortalayabilmesi için fareden gelen
koordinatların topun yüksekliğini veya genişliğini çıkartmayı da
unutmamamız gerek. XAML kodu içerisinde değiştirdiğimiz bir diğer
özellik de **StoryBoard** nesnesinin adı. Her tıklama işleminde yeni bir
**StoryBoard** yaratıp Silverlight animasyonumuza ekleyeceğimiz için
farklı isimler vermemiz gerekecek. Aynı isimde birden çok **StoryBoard**
ekleyemeyiz. Bunun için biz örneğimizde X ve Y koordinatlarını metin
olarak **StoryBoard** adının sonuna ekledik. Kullanıcının aynı noktaya
tıklamayacağını ümit ediyoruz :) İsterseniz siz söz konusu animasyonun
var olup olmadığını kontrol ederek daha sağlıklı bir işleyiş de
sağlayabilirsiniz. Animasyon varsa yaratmadan doğrudan
çalıştırabilirsiniz.

**createFromXaml** metodu ile hazırlamış olduğumuz XAML kodundan
**StoryBoard** nesnemizi yarattırarak **Anim** adında bir değişkene
aktarıyoruz. Artık sıra geldi bu animasyonu Silverlight sayfamızın
kaynaklarına (**resource**) eklemek. O işlemi de tamamladıktan sonra
artık animasyonumuzu çalıştırabiliriz.

Uygulamayı çalıştırdığınızda Silverlight içerisinde nereye tıklarsanız
tıklayın topun son tıklanan yere doğru hareket ettiğini göreceksiniz.
Eğer top tıkladığınız noktaya ulaşmadan başka bir yere tıklarsanız
yönünü değiştirerek oraya doğru geldiğini de görebilirsiniz. Bunun
nedeni böyle bir durumda iki farklı animasyonun yaratılarak
çalıştırılıyor olması. Son biten animasyon son başlatılan olacağı için
top en sonunda kendisini son tıklanan noktada bulacaktır.

Hepinize kolay gelsin.


