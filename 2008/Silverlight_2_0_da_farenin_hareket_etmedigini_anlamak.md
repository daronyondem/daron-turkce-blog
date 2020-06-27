---
FallbackID: 2200
Title: "Silverlight 2.0'da farenin hareket etmediğini anlamak."
date: "2008-9-29"
EntryID: Silverlight_2_0_da_farenin_hareket_etmedigini_anlamak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 85778af8-624b-4a94-92cb-1db0d8b3cf9a
---
# Silverlight 2.0'da farenin hareket etmediğini anlamak.
Bu yazımızda **Silverlight 2.0 RC0** ile Silverlight uygulaması
içerisinde minik bir ekran koruyucusu yapacağız. Aslında amacımız ekran
korumak değil tabi ki, istediğimiz şey kullanıcı Silverlight
uygulamasını kullanmadığında farklı bir içerik göstermek. Bu belki bir
reklam, belki farklı bir "Ekrana Geri Dön Kullanıcı" sesli mesajı veya
çok daha farklı bir uyarı sistemi olabilir. Özellikle veritabanı
üzerinden veri alarak bu veriyi düzenleyen bir Silverlight uygulamasını
düşünürsek belki de kullanıcı uzun süre ekran başında değilse verileri
sunucuya göndererek kaydetmek için doğru zamanı yakalamışız demektir. Bu
sistemin kullanılabileceği diğer örnekleri sizin hayal gücünüze
bırakıyorum.

**Animasyonlarımızı hazırlayalım**

Örneğimizde görsel olarak herhangi bir ek öğe yer almayacak. Kullanıcı
fareyi hareket ettirmezse bir süre sonra uygulamanın ana Grid'inin
rengini siyaha çevireceğiz. Kullanıcı fare ile herhangi bir hareket
yaptığı anda ise tekrar söz konusu Grid'i beyaza çevireceğiz. Siz
örneklerinizde çok daha farklı işlemler yapabilirsiniz. Şimdi gelin bu
iki animasyonla beraber oluşan XAML kodumuza göz atalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication2.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Storyboard</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**Gitti**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"

<span style="color: blue;">                                   
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**LayoutRoot**</span>"

<span style="color: blue;">                                   
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(Panel.Background).(SolidColorBrush.Color)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineColorKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:01</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Storyboard</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**Geldi**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"

<span style="color: blue;">                                   
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**LayoutRoot**</span>"

<span style="color: blue;">                                   
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(Panel.Background).(SolidColorBrush.Color)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">SplineColorKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:01</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**LayoutRoot**</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Gördüğünüz gibi kodumuzda yer alan iki animasyon da **LayoutRoot**
adındaki Grid'in rengini bir saniyede değiştirmeyi hedefliyor.
Animasyonlardan **Geldi** adındaki Storyboard **Grid'in** rengini beyaza
alırken, **Gitti** adındaki ise Siyah'a götürüyor. Kullanıcı fareyi
hareket ettirmediğinde yani ekran başından gittiğinde **Gitti**, geri
geldiğinde ise **Geldi** animasyonunu oynatacağız.

**DispatcherTimer yetiş imdadımıza!**

Farenin kullanıcı tarafından hareket ettirilip ettirilmediği sürekli
kontrol etmek yerine aslında bizim ana bir Timer'a ihtiyacımız var.
Varsayalım ki beş saniye boyunca herhangi bir hareket olmamışsa ekranı
karartacağız. Bu durumda farenin oynatıldığı son harekette bu beş
saniyelik sayacı başlatmamız gerek. Biz hangi fare hareketinin son
hareket olduğunu anlayamayacağımız için aslında farenin her hareketinde
sayacımızı başlatmalıyız fakat sonrasında eğer fare tekrar hareket
ettirilirse sayacı durdurup baştan başlatmamız gerek.

İlk olarak Timer olarak kullanacağımız DispathcerTimer'ı global olarak
tanımlayalım.

**[VB]**

<span style="color: blue;">WithEvents</span> Kontrol <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

**[C\#]**

System.Windows.Threading.DispatcherTimer Kontrol = <span
style="color: blue;">new</span>
System.Windows.Threading.DispatcherTimer();

Uygulama ilk olarak istemciye yüklendiğinde hemen elimizdeki Timer'ın
Interval yani tekrar aralığını düzenleyerek Timer'ı başlatmamız
gerekiyor.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Kontrol.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 5)

        Kontrol.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            Kontrol.Interval = <span style="color: blue;">new</span>
<span style="color: #2b91af;">TimeSpan</span>(0, 0, 5);

            Kontrol.Start();

        }

Eğer fare hareket etmezse yukarıdaki Timer sonuna kadar çalışacak ve
doğal olarak Timer'ın Tick event'ı çalıştırılacaktır. Fakat bu süreçte
eğer fare oynatılırsa bizim bu Timer'ı durdurup baştan başlatmamız gerek
ki sayacımızı da bir anlamda sıfırlamış olalım. Uygulamamızın MouseMove
durumunu yakalamamız yeterli olacaktır.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        Kontrol.Stop()

        Kontrol.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, MouseEventArgs e)

        {

            Kontrol.Stop();

            Kontrol.Start();

        }

Sıra geldi Timer'ın Tick eventına gerekli kodu yazmaya. Aslında bu
noktada yazacağımız tek kod bizim Gitti animasyonunu çalıştıracak olan
kod olacak. Böylece uygulama kullanıcının fareyi beş saniyedir
oynatmadığını algılamış ve gerekli işlemi yapmış olacak.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Kontrol\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Kontrol.Tick

        Gitti.Begin()

        Gitmis = <span style="color: blue;">True</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Kontrol\_Tick(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">EventArgs</span> e)

        {

            Gitti.Begin();

            Gitmis = <span style="color: blue;">true</span>;

        }

Kod içerisinde ilginizi çeken nokta eminim ki Gitmis değişkenidir.
Gitmis değişkeni uygulamamızda global olarak tanımlayacağımız bir
Boolean değişkeni. Bu değişkeni ScreenSaver yapımızın çalışıp
çalışmadığını kontrol etmek için kullanacağız. Böylece MouseMove
durumunda daha önce eğer ekran karartılmış ise ekranı
aydınlatabileceğiz. Gelin MouseMove durumundaki yeni kodumuzu da
inceleyelim.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        Kontrol.Stop()

        Kontrol.Start()

        <span style="color: blue;">If</span> Gitmis <span
style="color: blue;">Then</span>

            Gitmis = <span style="color: blue;">False</span>

            Geldi.Begin()

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, MouseEventArgs e)

        {

            Kontrol.Stop();

            Kontrol.Start();

            <span style="color: blue;">if</span> (Gitmis)

            {

                Gitmis = <span style="color: blue;">false</span>;

                Geldi.Begin();

            }

        }

Gördüğünüz gibi fare her oynatıldığında sayacımızı sıfırlarken daha önce
ekran karartılmış mı kontrol ediyoruz. Eğer karartılmış ise hemen
aydınlatma işlemini başlatıyoruz ve tabi ki **Gitmis** değişkenimizi de
**False** olarak ayarlıyoruz.

Uygulamamızın tam kodu aşağıdaki şekilde sonlanıyor;

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">WithEvents</span> Kontrol <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

    <span style="color: blue;">Dim</span> Gitmis <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>
= <span style="color: blue;">False</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Kontrol.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 5)

        Kontrol.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        Kontrol.Stop()

        Kontrol.Start()

        <span style="color: blue;">If</span> Gitmis <span
style="color: blue;">Then</span>

            Gitmis = <span style="color: blue;">False</span>

            Geldi.Begin()

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Kontrol\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Kontrol.Tick

        Gitti.Begin()

        Gitmis = <span style="color: blue;">True</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Collections.Generic;

<span style="color: blue;">using</span> System.Linq;

<span style="color: blue;">using</span> System.Net;

<span style="color: blue;">using</span> System.Windows;

<span style="color: blue;">using</span> System.Windows.Controls;

<span style="color: blue;">using</span> System.Windows.Documents;

<span style="color: blue;">using</span> System.Windows.Input;

<span style="color: blue;">using</span> System.Windows.Media;

<span style="color: blue;">using</span> System.Windows.Media.Animation;

<span style="color: blue;">using</span> System.Windows.Shapes;

 

<span style="color: blue;">namespace</span> SilverlightApplication3

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : UserControl

    {

        System.Windows.Threading.DispatcherTimer Kontrol = <span
style="color: blue;">new</span>
System.Windows.Threading.DispatcherTimer();

        <span style="color: blue;">bool</span> Gitmis;

 

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> RoutedEventHandler(Page\_Loaded);

            <span style="color: blue;">this</span>.MouseMove += <span
style="color: blue;">new</span> MouseEventHandler(Page\_MouseMove);

            <span style="color: blue;">this</span>.Kontrol.Tick += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>(Kontrol\_Tick);

        }

 

        <span style="color: blue;">void</span> Kontrol\_Tick(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">EventArgs</span> e)

        {

            Gitti.Begin();

            Gitmis = <span style="color: blue;">true</span>;

        }

 

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, MouseEventArgs e)

        {

            Kontrol.Stop();

            Kontrol.Start();

            <span style="color: blue;">if</span> (Gitmis)

            {

                Gitmis = <span style="color: blue;">false</span>;

                Geldi.Begin();

            }

        }

 

        <span style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            Kontrol.Interval = <span style="color: blue;">new</span>
<span style="color: #2b91af;">TimeSpan</span>(0, 0, 5);

            Kontrol.Start();

        }

 

    }

}

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-9-29 tarihinde yayinlanmistir.*
