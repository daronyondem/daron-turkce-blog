---
FallbackID: 1840
Title: Silverlight 1.1 - Animasyon ve Mouse İşlemlerine Giriş
PublishDate: 7/11/2007
EntryID: Silverlight_1_1_-_Animasyon_ve_Mouse_Islemlerine_Giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 3c788ab3-8528-4de0-8026-62c106768ea9
---
Nerden çıktı Silverlight 1.1? Aslına bakarsanız Silverlight 1.1 üzerine
uzun bir süre makale yazmayı düşünmüyordum. Bunun nedeni daha
Silverlight 1.1'in Alpha aşamasında olması. Yani şu anki yazılım,
teknoloji ile yayınlanacak Silverlight 1.1 arasında dağlar kadar farklar
olabilir (hatta olacaktır). O nedenle hali hazırda elimizdeki değerli
zamanımızı ağırlıklı olarak Silverlight 1.0 ile tüketmek özellikle
kurumsal projeler için çok daha mantıklı. Diğer yandan Silverlight 1.1
ile geliştirdiğimiz bir uygulamayı çalıştırmaları için istemcilere yine
Alpha aşamasında Silverlight 1.1 Plug-In'ini yüklemelerini de
isteyemeyiz. Gerçeği söylemek gerekirse ben orijinal makineme hiçbir
zaman Beta ve Alpha yazılım kurmam, bu tarz denemeler için sanal makine
kullanırım.

Silverlight 1.1 ile 1.0 sürümü arasındaki en büyük fark programlama
kısmında. Silverlight 1.0'da JavaScript ile istemci taraflı programlama
yapabiliyorken Silverlight 1.1 sürümünde .NET dillerini de kullanma
şansımız var. Yazdığımız kod bir DLL'e çevrilerek yine istemci tarafında
Silverlight 1.1 Plug-In ile çalıştırılıyor. Tabi bu noktada tüm .NET
Framework Silverlight 1.1'e aktarılmış durumda değil. Klasik .NET
Framework 30MB gibi bir boyuta sahipken Silverlight 1.1 Plug-In sadece
3MB. Yani özetle .NET Framework'ün bir kısmı aktarılmış durumda, tamamı
değil.

Farkındaysanız hala neden bu makaleyi yazdığımı açıklamadım :) Blogumu
takip eden dostlarım tarafından bana bir çok soru maili geliyor. Bu
soruların bazılarını cevaplarken "*Aslından bunu bir makale haline
getirsem herkes faydalanır*" diyerek anından bir blogpost'a çeviriyorum.
İşte bu makale de böyle bir makale :) Aslında bana gelen maillerden
birince cevap olarak yazılması gereken bir çözüm, ama ben buradan
paylaşarak herkesin okumasına olanak tanımak istiyorum. Arkadaşımız
çözümü C\# olarak istemiş, o nedenle bu makaleye özgü olarak C\#
kullanacağım. Ama lütfen bu bir gelenek haline gelmesin :) arkadaşlar
.NET geliştiriciler olarak hem C\# hem VB kodunu okumayı öğrenmekte
fayda var. Özellikle VB kodunu okumak zaten kolay :) Böylece bana da C\#
yazdırmış olmazsınız :) Haz etmediğim açıkça ortada sanırım ;)

Son olarak sorulara geçmeden önce kullandığım geliştirme ortamından da
bahsetmek istiyorum. Örnekleri yaparken [Visual Studio 2008 Beta 2
Professional
Edition](http://go.microsoft.com/fwlink/?LinkID=89146&clcid=0x409) ve
[Expression Blend 2 September
Preview](http://go.microsoft.com/fwlink/?LinkID=79076&clcid=0x409)
kullandım. Sistemimde Plug-In olarak [Silverlight 1.1 Alpha September
Refresh](http://go.microsoft.com/fwlink/?LinkID=88986&clcid=0x409)
yüklüydü.

Gelen sorulara bakalım :)

**Silverlight 1.1 tarafında animasyonlara .NET kodu ile nasıl müdahale
ederiz?**

Bunun için ilk olarak bir animasyon hazırlamamız gerekiyor. Aşağıdaki
şekilde bir animasyonu Silverlight sayfamızda **Resource** olarak
tanımlayalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: blue;">        </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">        </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">        </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">parentCanvas</span>"<span style="color: blue;">
</span>

<span style="color: blue;">        </span><span
style="color: red;">Loaded</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Page\_Loaded</span>"<span style="color: blue;">
</span>

<span style="color: blue;">        </span><span
style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightProject14.Page;assembly=ClientBin/SilverlightProject14.dll</span>"

<span style="color: blue;">        </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">640</span>"

<span style="color: blue;">        </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">480</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span style="color: blue;">White</span>"

<span style="color: blue;">        \></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Storyboard</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Timeline1</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"<span style="color: blue;">
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ellipse</span>"<span style="color: blue;">
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
style="color: blue;">00:00:01</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">209</span>"<span style="color: blue;">/\></span>

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
style="color: blue;">ellipse</span>"<span style="color: blue;">
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
style="color: blue;">00:00:01</span>"<span style="color: blue;">
</span><span style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">29</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas.Resources</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">123</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">119</span>"<span style="color: blue;"> </span><span
style="color: red;">Fill</span><span style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span style="color: blue;">71</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">116</span>"<span style="color: blue;"> </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ellipse</span>"<span style="color: blue;">
</span><span style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse.RenderTransform</span><span
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
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SkewTransform</span><span style="color: blue;">
</span><span style="color: red;">AngleX</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span
style="color: red;">AngleY</span><span
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
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span style="color: red;">Y</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

\

Yukarıdaki kod içerisinde basit bir **Ellipse** nesnesinin ekrandaki
yeri değiştiriliyor. Yarattığımız **StoryBoard'un** adı **Timeline1**
şeklinde bırakılmış. Şimdi istediğimiz şey Ellipse'in kendisine
tıklandığında animasyonun başlatılması. Yazacağımız kod tam olarak
aşağıdaki şekilde olacak.

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Windows;

<span style="color: blue;">using</span> System.Windows.Controls;

<span style="color: blue;">using</span> System.Windows.Documents;

<span style="color: blue;">using</span> System.Windows.Ink;

<span style="color: blue;">using</span> System.Windows.Input;

<span style="color: blue;">using</span> System.Windows.Media;

<span style="color: blue;">using</span> System.Windows.Media.Animation;

<span style="color: blue;">using</span> System.Windows.Shapes;

 

<span style="color: blue;">namespace</span> SilverlightProject16

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : <span
style="color: #2b91af;">Canvas</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> o, <span
style="color: #2b91af;">EventArgs</span> e)

        {

            <span style="color: green;">// Required to initialize
variables</span>

            InitializeComponent();

            ellipse.MouseLeftButtonDown += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonDown);

        }

 

        <span style="color: blue;">void</span>
ellipse\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseEventArgs</span> e)

        {

            Timeline1.Begin();

        }

    }

}

\

Gördüğünüz gibi ilk olarak **Page.Loaded** durumunda sayfamızda yer alan
**ellipse** nesnesinin **MouseLeftButtonDown** durumuna bir Handler
bağlıyoruz. Sonrasında da söz konusu **handler** içerisinde
**Timeline1** nesnemizin **begin()** metodunu çalıştırarak animasyonu
başlatabiliyoruz. Bu kodu eğer VB.NET koduna çevirecek olursak aradaki
tek fark özel olarak **Handler** tanımlamak yerinde VB.NET'teki
**Handles** deyimini kullanarak işi halledebiliyor olmamız. VB.NET
kodunu da koymadan edemeyeceğim sanırım :)

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> Canvas

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
EventArgs)

        <span style="color: green;">' Required to initialize
variables</span>

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ellipse\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> ellipse.MouseLeftButtonDown

        Timeline1.Begin()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

\

**Mouse ile nesneleri nasıl boyutlandırırz?**

Yukarıdaki soruya kıyasla bu biraz ağır bir konu sayılabilir. İlk olarak
sorunun çözümüne dair mantığı kavramamız gerekiyor. Hedefimiz
Silverlight 1.1 içerisinde bir nesnenin büyüklüğünü, yani genişlik ve
yüksekliğini farenin ekrandaki konumuna göre ayarlayabiliyor olmak.
Kullanıcı fareyi ekranda gezdirdikçe farenin konumuna göre objemizi
tekrar boyutlandıracağız. Boyutlandırma işlemini yapabilmek için fare
ile nesneye tıklandığı anda nesnenin yükseklik ve genişliğini bir kenara
not alıp fare sürüklendikçe eski konumu ile yeni konumu arasındaki farkı
nesnenin boyutuna yansıtacağız. Gelin ilk olarak kullanacağımız global
değişkenlerimizi tanımlayalım.

        <span style="color: #2b91af;">Boolean</span> Tikli = <span
style="color: blue;">false</span>;

        <span style="color: #2b91af;">Point</span> BaslangicKonum;

        <span style="color: #2b91af;">Double</span> BaslangicYukseklik;

        <span style="color: #2b91af;">Double</span> BaslangicGenislik;

\

Gördüğünüz gibi toplam dört adet değişkenimiz var. Bunlardan ilki
**Tikli** adında bir **Boolean** değişken. Fare ekranda gezdirildikçe
nesnemizi boyutlandıracağımızdan bahsetmiştik. Tabi boyutlandırma
işleminin başlaması için kullanıcının nesneye tıklayıp sürüklemesi
gerekecek. O nedenle nesneye tıklandığında global değişkenimiz
**Tikli'yi** **True** yaparak fare sürüklendikçe boyutlandırılma
yapılmasını onaylayacağız. Farenin sol düğmesi bırakıldığında **Tikli**
değişkenini **False** yaparak boyutlandırmayı durduracağız. Bunun
haricinde **BaslangicKonum** değişkenimiz farenin sürüklemenin başındaki
konumuzun hafızada saklayacak, böylece sürüklenen miktarı bularak
nesneye yansıtacağız. Nesnenin başlangıçtaki genişlik ve yüksekliğini de
birer değişkende saklıyor olacağız. Bu değerler üzerine farenin
ekrandaki konum değişikliğini ekleyeceğiz.

            InitializeComponent();

            ellipse.MouseLeftButtonDown += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonDown);

            ellipse.MouseLeftButtonUp += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonUp);

            <span style="color: blue;">this</span>.MouseLeftButtonUp +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonUp);

            <span style="color: blue;">this</span>.MouseMove += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(Page\_MouseMove);

\

C\# için yukarıdaki gibi Event Handler tanımlamalarımızı yapmamız
gerekiyor. İlk örneğimizdeki aynı XAML kodu kullanarak **ellipse**
nesnemizi boyutlandıracağız. O nedenle **ellipse'in**
**MouseLeftButtonDown** ve **MouseLeftButtonUp** durumlarını kontrol
etmemiz gerekiyor. Ayrıca Silverlight uygulamamızın genelinde de
**MouseLeftButtonUP** ve **MouseMove** durumlarını kontrol edeceğiz. Bu
durumlarda neler yapacağımıza birazdan bakacağız.

        <span style="color: blue;">void</span>
ellipse\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseEventArgs</span> e)

        {

            Tikli=<span style="color: blue;">true</span>;

            BaslangicKonum=e.GetPosition(<span
style="color: blue;">this</span>);

            BaslangicGenislik=ellipse.Width;

            BaslangicYukseklik = ellipse.Height;

        }

\

**ellipse** üzerine fare ile tıklandığında ve farenin düğmesi tıklı
duruma geldiğinde yukarıdaki kodumuz çalışacak. Tıklandığı anda hemen
**Tikli** değişkenimizi **True** olarak düzenliyoruz. Sonrasında
**e.GetPosition(this)** diyerek farenin Silverlight animasyonumuzun
neresinde olduğunu global değişkenimize aktarıyoruz. Aynı şekilde
**ellipse'in** genişlik ve yüksekliğini de değişkenlerimize alıyoruz.

        <span style="color: blue;">void</span>
ellipse\_MouseLeftButtonUp(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseEventArgs</span> e)

        {

            Tikli = <span style="color: blue;">false</span>;   

        }

\

Yukarıda tanımladığımız kodumuzu hem **ellipse'in** hem de genel olarak
Silverlight uygulamamızın **MouseLeftButtonUp** durumuna bağladık. Her
iki şekilde de farenin tuşunu kullanıcı bıraktığında **Tikli**
değişkenimizi **False** yaparak artık boyutlandırma işleminin
yapılmamasını sağlayacağız. Gelelim boyutlandırma işlemine.

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">MouseEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (Tikli)

            {

                <span style="color: #2b91af;">Point</span> SimdikiKonum
= e.GetPosition(<span style="color: blue;">this</span>);

                ellipse.Width = <span
style="color: #2b91af;">Math</span>.Abs(SimdikiKonum.X-BaslangicKonum.X+BaslangicGenislik);

                ellipse.Height  = <span
style="color: #2b91af;">Math</span>.Abs(SimdikiKonum.Y -
BaslangicKonum.Y + BaslangicYukseklik );

            }

        }

\

Genel olarak tüm Silverlight uygulamamız üzerinde fare sürüklendiği
sürece yukarıdaki kod çalışacak. İlk olarak **Tikli** değişkenini
kontrol ediyoruz. Eğer fare ile **ellipse** nesnemize tıklanmışsa ona
uygun boyutlandırma işlemini yapmamız gerekiyor. **SimdikiKonum** adında
bir değişken tanımlayarak farenin mevcut konumunu alarak hem X hem de Y
yönlerinde farenin başlangıçtaki konumu ile farklarını, üzerine de
nesnemizin başlangıçtaki genişlik ve yüksekliğini koyarak tekrar
genişlik ve yükseklik değerlerine aktarıyoruz. Böylece farenin
sürüklenme miktarı nesnenin genişliğine ve yüksekliğine eklenmiş oluyor.
Tüm bunları yaparken **Math.Abs** metodu ile hesaplanan değerin mutlak
değerini alarak nesnemizin her zaman görünür boyutlarda olmasını
sağlıyoruz.

Kodumuzun tamamı aşağıdaki şekilde sonlanıyor.

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Windows;

<span style="color: blue;">using</span> System.Windows.Controls;

<span style="color: blue;">using</span> System.Windows.Documents;

<span style="color: blue;">using</span> System.Windows.Ink;

<span style="color: blue;">using</span> System.Windows.Input;

<span style="color: blue;">using</span> System.Windows.Media;

<span style="color: blue;">using</span> System.Windows.Media.Animation;

<span style="color: blue;">using</span> System.Windows.Shapes;

 

<span style="color: blue;">namespace</span> SilverlightProject16

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : <span
style="color: #2b91af;">Canvas</span>

    {

        <span style="color: #2b91af;">Boolean</span> Tikli = <span
style="color: blue;">false</span>;

        <span style="color: #2b91af;">Point</span> BaslangicKonum;

        <span style="color: #2b91af;">Double</span> BaslangicYukseklik;

        <span style="color: #2b91af;">Double</span> BaslangicGenislik;

 

        <span style="color: blue;">public</span> <span
style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> o, <span
style="color: #2b91af;">EventArgs</span> e)

        {

            <span style="color: green;">// Required to initialize
variables</span>

            InitializeComponent();

            ellipse.MouseLeftButtonDown += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonDown);

            ellipse.MouseLeftButtonUp += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonUp);

            <span style="color: blue;">this</span>.MouseLeftButtonUp +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(ellipse\_MouseLeftButtonUp);

            <span style="color: blue;">this</span>.MouseMove += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(Page\_MouseMove);

        }

 

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">MouseEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (Tikli)

            {

                <span style="color: #2b91af;">Point</span> SimdikiKonum
= e.GetPosition(<span style="color: blue;">this</span>);

                ellipse.Width = <span
style="color: #2b91af;">Math</span>.Abs(SimdikiKonum.X-BaslangicKonum.X+BaslangicGenislik);

                ellipse.Height  = <span
style="color: #2b91af;">Math</span>.Abs(SimdikiKonum.Y -
BaslangicKonum.Y + BaslangicYukseklik );

            }

        }

 

        <span style="color: blue;">void</span>
ellipse\_MouseLeftButtonUp(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseEventArgs</span> e)

        {

            Tikli = <span style="color: blue;">false</span>;   

        }

 

        <span style="color: blue;">void</span>
ellipse\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseEventArgs</span> e)

        {

            Tikli=<span style="color: blue;">true</span>;

            BaslangicKonum=e.GetPosition(<span
style="color: blue;">this</span>);

            BaslangicGenislik=ellipse.Width;

            BaslangicYukseklik = ellipse.Height;

        }

    }

}

\

Bir de VB.NET tarafına bakalım :)

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> Canvas

    <span style="color: blue;">Dim</span> Tikli <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>
= <span style="color: blue;">False</span>

    <span style="color: blue;">Dim</span> BaslangicKonum <span
style="color: blue;">As</span> Point

    <span style="color: blue;">Dim</span> BaslangicGenislik <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

    <span style="color: blue;">Dim</span> BaslangicYukseklik <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
EventArgs)

        <span style="color: green;">' Required to initialize
variables</span>

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ellipse\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> MouseEventArgs) <span
style="color: blue;">Handles</span> ellipse.MouseLeftButtonDown

        Tikli = <span style="color: blue;">True</span>

        BaslangicKonum = e.GetPosition(<span
style="color: blue;">Me</span>)

        BaslangicGenislik = ellipse.Width

        BaslangicYukseklik = ellipse.Height

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ellipse\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> MouseEventArgs) <span
style="color: blue;">Handles</span> ellipse.MouseLeftButtonUp

        Tikli = <span style="color: blue;">False</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> MouseEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonUp

        Tikli = <span style="color: blue;">False</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> MouseEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        <span style="color: blue;">If</span> Tikli <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> SimdikiKonum <span
style="color: blue;">As</span> Point = e.GetPosition(<span
style="color: blue;">Me</span>)

            ellipse.Height = Math.Abs(SimdikiKonum.Y -
BaslangicKonum.Y + BaslangicYukseklik)

            ellipse.Width = Math.Abs(SimdikiKonum.X - BaslangicKonum.X +
BaslangicGenislik)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

\

Böylece sorunumuzu çözmüş aldık. Artık ellipse nesnesine tıklanarak
nesne Silverlight animasyonu içerisinde boyutlandırılabilecek.

Silverlight 1.1 ile ilgili gelen sorular şimdilik bu kadar.

Hepinize kolay gelsin.


