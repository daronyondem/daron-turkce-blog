# Silverlight uygulamalarında MouseScroll (Roller) kullanımı.
Silverlight uygulamalarında kullanıcı ile Silverlight nesneleri arasında
bir iletişim sağlayabilmek için fare tıklamalarını kullanmak gerçekten
çok kolay. Bu deneyimi bir üst adıma yükselterek sitemizin
ziyaretçilerine Silverlight uygulamalarında fareleriniz roller'larını
kullanma şansı da tanıyabiliriz. Aslında kullanacağımız teknik
Silverlight 1.0'ın yapısı gereği istemci tarafında JavaScript ile söz
konusu durumları yakalayarak bunu Silverlight nesnelerine yansıtmak
olacak.

İlk olarak gelin **Expression Blend 2** ile yeni bir Silverlight projesi
yaratalım ve tasarım kısmına bir **Image** nesnesi yerleştirelim.
Hedefimiz site ziyaretçisinin faresinin roller'ı ile bu resmi büyütüp
küçültebilmesi, bir anlamda Zoom yapabilmesi. Hazılardığımız XAML kodu
aşağıdaki şekilde olmalı.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Width</span><span style="color: blue;">="352"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="229"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="8"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="8"</span>

        <span style="color: red;"> Source</span><span
style="color: blue;">="Autumn Leaves.jpg"</span><span
style="color: red;"> RenderTransformOrigin</span><span
style="color: blue;">="0,0"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Boyutlandir"**</span><span style="color: red;">
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
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu içerisinde özellikle dikkat etmemiz gereken nokta
**Image** içerisindeki **ScaleTransform** tagının programatik olarak
ulaşılabilir bir adının olmasının şart olması. Biz örneğimizde söz
konusu taga **Boyutlandir** adını verdik. Böylece bu nesneye ulaşarak
**ScaleX** ve **ScaleY** değerlerini programatik olarak değiştirerek
resme zoom yapılmış gibi bir ortamsağlayabileceğiz.

Bundan sonra tüm yapacaklarımızı projemizin **Page.xaml.js** dosyası
içerisinde yapacağız. İlk olarak bizim için otomatik olarak tanımlanmış
olan **handleLoad** fonksiyonu içerisine sayfa ilk açıldığında ve
Silverlight animasyonu yaratıldığında çalıştırılmak üzere aşağıdaki
kodları yazıyoruz.

    <span style="color: blue;">if</span> (window.addEventListener)

        window.addEventListener(<span
style="color: #a31515;">'DOMMouseScroll'</span>, **ScrollOldu**, <span
style="color: blue;">false</span>);

        document.onmousewheel = **ScrollOldu**;

        window.onmousewheel = document.onmousewheel;

Yukarıdaki kodlarda aslında aynı işlemi birden çok farklı yöntem ile
birçok kes yapıyoruz. Bunun nedeni kodumuzun hem **FireFox** hem
**Safari** hem de **Internet Explorer**'da çalışmasını sağlayabilmek.
Yaptığımız şeyi kabaca tanımlamak gerekirse aslında tarayıcının
**MouseScroll** durumunu kendi tanımladığımız **ScrollOldu** adında bir
JavaScript fonksiyonun yönlendiriyoruz. Bir anlamda kendi "*event
handler*" yapımızı tanımlıyoruz.

Bir sonraki adımda artık yavaş yavaş **ScrollOldu** fonksiyonunu
yazmamız gerekiyor. Fakat bunun öncesinde birkaç ufak bilgiyi paylaşmak
istiyorum. **ScrollOldu** durumu birazdan göreceğimiz, kendisiyle
beraber gelen parametresinde **scroll** işleminin değerini getirir. Bu
değer farklı tarayıcılarda farklı şekillerde yakalanır. O nedenle biz de
bir çok kontrol yapıyor olacağız. Bahsettiğimiz değer aslında artı veya
eksi bir **Integer** değeridir ve ne kadar scroll edilmesi gerektiğini
tanımlar. Biz örneğimizde sadece bu değerin + veya - olup olmadığını
kontrol edeceğiz, scroll miktarı ile zoom'u doğrudan eşleştirmeyeceğiz.
Böylece farklı bilgisayarlarda scroll hızı farklı ayarlanmış ise bu
durum uygulamaya yansımayacak.

    <span style="color: blue;">var</span> ScrollMiktari = 0;

    <span style="color: blue;">if</span> (!event)

        event = window.event;

    <span style="color: blue;">if</span> (event.wheelDelta)

    {

        ScrollMiktari = event.wheelDelta;

        <span style="color: blue;">if</span> (window.opera)

            ScrollMiktari = -ScrollMiktari;

    }

    <span style="color: blue;">else</span> <span
style="color: blue;">if</span> (event.detail)

        ScrollMiktari = -event.detail;

Yukarıdaki kodumuz **ScrollOldu** fonksiyonumuzun baş kısmı.
**ScrollOldu** fonksiyonumuza gelen **event** adındaki parametrenin
tarayıcıya göre var olup olmamasına göre farklı eşleştirmeler yapıyoruz.
**event** nesnesinin yine tarayıcıya göre **wheelDelta** özelliği var
oradan gerekli değeri yakalıyoruz, yoksa bu sefer **detail**
özelliğinden değerimizi alıyoruz. Bazı tarayıcılarda aşağıya doğru
scroll + değer anlamına gelirken bazılarında tam tersi olabiliyor.
Tarayıcılar arası farkların detaylarına girmeyeceğim fakat mantığı
anlamakta fayda var.

Artık **ScrollMiktari** değişkenimize **scroll** değerini aldıktan sonra
gelen değerin pozitif veya negatif olmasına göre **Image** nesnemizi
boyutlandırmamız gerekiyor.

    <span style="color: blue;">if</span> (ScrollMiktari)

    {

        <span style="color: blue;">var</span> Boyutlandir =
document.getElementById(<span
style="color: #a31515;">"SilverlightControl"</span>).content.findName(<span
style="color: #a31515;">"Boyutlandir"</span>);

        <span style="color: blue;">if</span> (ScrollMiktari \> 0)

        {

            Boyutlandir.ScaleX = Boyutlandir.ScaleX  + 0.1;

            Boyutlandir.ScaleY = Boyutlandir.ScaleX  +  0.1;

        }

        <span style="color: blue;">else</span>

        {

            Boyutlandir.ScaleX = Boyutlandir.ScaleY - 0.1;

            Boyutlandir.ScaleY = Boyutlandir.ScaleY - 0.1;

        }

    }

Gördüğünüz gibi ilk başta sayfadaki Silverlight kontrolümüzü bularak
içerisinden **Boyutlandir** nesnemizi bir değişkene aktarıyoruz.
Sonrasında da ScrollMiktarı'nın durumuna göre Boyutlandir'in **ScaleX**
ve **ScaleY** değerlerini 0.1 artırıyor veya azaltıyoruz.

Son olarak yapmamız gereken işlem ise Silverlight uygulamamızın
bulunduğu sayfanın kendi içinde Scroll etmesini engellemek. Bunun için
de fonksiyonumuzun sonunda **MouseScroll** durumunu tarayıcının
değerlendirmesini sonlandırmak için olumsuz değerler geri döndürüyor
olacağız.

    <span style="color: blue;">if</span> (event.preventDefault)

        event.preventDefault();

    event.returnValue = <span style="color: blue;">false</span>;

Yazacağımız JavaScript kodları sonlandığında göre artık Page.xaml.js
dosyasının son halini inceleyebiliriz.

<span style="color: blue;">if</span> (!window.UntitledProject1)

    window.UntitledProject1 = {};

 

UntitledProject1.Page = <span style="color: blue;">function</span>()

{

}

 

UntitledProject1.Page.prototype =

{

    handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

    {

    <span style="color: blue;">if</span> (window.addEventListener)

        window.addEventListener(<span
style="color: #a31515;">'DOMMouseScroll'</span>, **ScrollOldu**, <span
style="color: blue;">false</span>);

        document.onmousewheel = **ScrollOldu**;

        window.onmousewheel = document.onmousewheel;

    }

}

<span style="color: blue;">function</span> **ScrollOldu**(event)

{

    <span style="color: blue;">var</span> **ScrollMiktari** = 0;

    <span style="color: blue;">if</span> (!event)

        event = window.event;

    <span style="color: blue;">if</span> (event.**wheelDelta**)

    {

        ScrollMiktari = event.**wheelDelta**;

        <span style="color: blue;">if</span> (window.opera)

            ScrollMiktari = -ScrollMiktari;

    }

    <span style="color: blue;">else</span> <span
style="color: blue;">if</span> (event.**detail**)

        ScrollMiktari = -event.**detail**;

    <span style="color: blue;">if</span> (ScrollMiktari)

    {

        <span style="color: blue;">var</span> **Boyutlandir** =
document.getElementById(<span
style="color: #a31515;">"SilverlightControl"</span>).content.findName(<span
style="color: #a31515;">"**Boyutlandir**"</span>);

        <span style="color: blue;">if</span> (ScrollMiktari \> 0)

        {

            Boyutlandir.ScaleX = Boyutlandir.ScaleX  + 0.1;

            Boyutlandir.ScaleY = Boyutlandir.ScaleX  +  0.1;

        }

        <span style="color: blue;">else</span>

        {

            Boyutlandir.ScaleX = Boyutlandir.ScaleY - 0.1;

            Boyutlandir.ScaleY = Boyutlandir.ScaleY - 0.1;

        }

    }

    <span style="color: blue;">if</span> (event.preventDefault)

        event.**preventDefault**();

    event.**returnValue** = <span style="color: blue;">false</span>;

}

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-2-24 tarihinde yayinlanmistir.*
