---
FallbackID: 2050
Title: "Silverlight 2.0 içerisinde ScrollViewer kullanımı."
date: "2008-5-9"
EntryID: Silverlight_2_0_icerisinde_ScrollViewer_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 3ef70f3d-f174-4b43-bc69-3f39c0bf22a6
---
# Silverlight 2.0 içerisinde ScrollViewer kullanımı.
Herhangi bir içeriği Silverlight 2.0 arayüzlerinde göstermek
istediğinizde özellikle veri bağlanabilir çoğu kontrolün kendi
içerisinde "ScrollBar" (Kaydırma Çubukları) içerdiğini görebilirsiniz.
Fakat bazı durumlarda bu hazır kontrolleri kullanmadığınızda veya
scrollbar özelliği bulunmayan bazı yapı taşı niteliğinde kontrolleri
beraber kullanmak istediğiniz ayrıca bir ScrollBar'a ihtiyacınız
olabilir. Bu gibi durumlarda bize scrollbar özellikleri ekleme konusunda
**ScrollViewer** kontrolü yardımcı oluyor.

Yapacağımız ilk örnekte 1024\*768 piksel büyüklüğünde bir resmi
uygulamamıza ekleyeceğiz. Fakat biz bu resim nesnesini tam ekran
göstermek istemiyoruz. Uygulamamız içerisinde ufak bir karede göstererek
insanların istiyorlarsa ScrollBar'lar aracılığı ile resmi gezmesini
istiyoruz. Bu durumda aslında yapmamız gereken çok basit. Aşağıdaki XAML
kodunu yaratacak şekilde **Image** nesnemizi bir **ScrollViewer**
içerisine yerleştirmemiz yeterli.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScrollBar.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;"> </span><span
style="color: red;">xmlns:d</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/expression/blend/2008</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:mc</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.openxmlformats.org/markup-compatibility/2006</span>"<span
style="color: blue;"> </span><span
style="color: red;">mc:Ignorable</span><span
style="color: blue;">=</span>"<span style="color: blue;">d</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">
**HorizontalScrollBarVisibility**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Auto**</span>"<span style="color: blue;"> ****
</span><span
style="color: red;">**VerticalScrollBarVisibility**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Auto**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">**Image**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">768</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1024</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Forest.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Gördüğünüz gibi ScrollViewer nesnemizin içerisinde kocaman bir resim
var. ScrollViewer içerisine programatik olarak farklı nesnelerin de
yerleştirilebiliyor olabilirdi. O nedenle biz ScrollViewer'a ait
**HorizontalScrollBarVisibility** ve **VerticalScrollBarVisibility**
özelliklerini de Auto yaparak ScrollBar'ların sadece gerektiğinde
gözükmesini sağladık. Zaten varsayılan ayarları ile maalesef yatay
ScrollBar gösterilmiyor o nedenle her halükarda bu ayarları değiştirmek
şart.

![ScrollViewer kontrolü iş
başında.](media/Silverlight_2_0_icerisinde_ScrollViewer_kullanimi/08052008_1.jpg)\
*ScrollViewer kontrolü iş başında.*

Kullanımın ne kadar basit olduğunu sanırım daha da anlatmaya gerek yok.
Gelin biraz daha karışık bir örneğe doğru yola çıkalım. Varsayalım ki
**ScrollViewer** ile beraber gelen kaydırma çubukları yerine kendi
oluşturduğunuz bazı düğmeleri kullanarak kaydırma işlemi yaptırmak
istiyorsunuz, bu durumda ne yapabilirdik?

İlk olarak örneğimizin görsel kısmını hazırlayarak uygulamamıza iki
düğme ekleyelim. Bu düğmeler rahatlıkla farklı görsellikler atanarak
daha anlamlı hale getirilebilir. Ben odak noktamızı kaybetmeme adına
düğmelerin görsel özellikleri ile ilgilenmeyeceğim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScrollBar.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;"> </span><span
style="color: red;">xmlns:d</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/expression/blend/2008</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:mc</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.openxmlformats.org/markup-compatibility/2006</span>"<span
style="color: blue;"> </span><span
style="color: red;">mc:Ignorable</span><span
style="color: blue;">=</span>"<span style="color: blue;">d</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,63,0</span>"<span style="color: blue;">
</span><span style="color: red;">
**HorizontalScrollBarVisibility**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Hidden**</span>"<span style="color: blue;"> ****
</span><span
style="color: red;">**VerticalScrollBarVisibility**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Hidden**</span>"<span style="color: red;">
**x:Name**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**Scroll**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">768</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1024</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Forest.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">57</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,8,8,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">51</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Yukarı</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Yukari**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">46</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,8,8</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">51</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Aşağı</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Asagi**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Kodumuz içerisinde önemli birkaç nokta var. Bunlardan ilki ScrollViewer
kontrolümüzün **VerticalScrollBarVisibility** ve
**HorizontalScrollBarVisibility** özelliklerinin **Hidden** olarak
ayarlanmış olması gerektiği. Eğer bu özellikleri **Disable** olarak
ayarlarsanız maalesef birazdan yapacağımız şekilde ScrollViewer'ın
kaydırma özelliklerinden faydalanamayız. Oysa biz işimizi olabildiğince
basite indirgemek ve kolaylaştırmak istiyoruz. O nedenle bu özellikler
**Hidden** olması ve ScrollViewer'dan faydalanmamız şart. Bu haldeyken
zaten ScrollBar'lar hiçbir şekilde gözükmeyecektir.

Sahnemizde ayrıca iki adet de düğme var. Bu düğmelere her basıldığında
bir miktar scroll yaptırmak istiyoruz. Aslında bizim örneğimizde hem
yatay hem de dikey kaydırma çubukları gerektiği için toplam dört düğme
gerekirdi. Fakat ben şimdilik sadece dikey kaydırma çubuğunu simüle
edeceğim, aynı sistemi yatay için kullanmak size kalıyor.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Asagi\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Asagi.Click

    <span style="color: blue;">If</span> Scroll.ScrollableHeight \> 0
<span style="color: blue;">Then</span>

        Scroll.ScrollToVerticalOffset(Scroll.VerticalOffset + 10)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Yukari\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Yukari.Click

    <span style="color: blue;">If</span> Scroll.ScrollableHeight \> 0
<span style="color: blue;">Then</span>

        Scroll.ScrollToVerticalOffset(Scroll.VerticalOffset - 10)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Hem **Yukari** hem de **Asagi** adindaki düğmelerimize yukarıdaki
şekilde kodlarımızı yazdığımızda düğmelere her basıldığında ScrollViewer
içerisindeki resim 10 piksel yukarı veya aşağıya doğru kayıyor. Kodumuzu
incelediğimizde basit bir IF kontrolü ile ScrollViewer'ın yükseklik
olarak kaydırılabilip kaydırılamayacağını öğreniyoruz eğer
**ScrollableHeight** sıfırdan büyük ise demek ki kaydırma işlemi
yapabiliriz. Kaydırma işlemini yapabilmek için mevcut **VerticalOffset**
üzerinden konumu alarak üzerine 10 piksel ekleyip veya çıkartıp bu
konuma scroll edilebilmesi için de **ScrollToVerticalOffset** metodunu
kullanıyoruz. Bu metod almış olduğu Offset değerine scroll ediyor.

**Daha kaygan bir Scroll olmaz mı?**

Yukarıdaki örneğimizi denediğinizde düğmeye her bastığımızda 10
piksellik bir kayma göreceksiniz. Bu durum sizi de benim gibi rahatsız
ettiyse daha hoş bir çözüme doğru ilerleyebiliriz. Rahatsızlık yaratan
aslında iki konu var, birincisi kullanıcı kaydırma işlemine devam etmek
için milyonlarca kez düğmeye tıklamak zorunda. Bu hiç de hoş bir durum
değil. Oysa biz düğmeye tıklandığı anı yakalayıp kullanıcı düğmeyi
bırakana kadar kaydırmaya devam etsek süper olurdu. Düğmeye fare ile
tıklandığı ve bırakıldığı anları yakalamak için rahatlıkla
**MouseLeftButtonDown** ve **MouseLeftButtonUp** eventlarını
kullanabiliriz. Tek yapmamız gereken bu arada sürekli kaydırma işlemi
yapmak. Hatta bu kaydırma işlemini de 20 milisaniyede 1 piksel şeklinde
yaparsak aslında çok daha hoş bir kaydırma efekti yaratmış oluruz.

Peki tüm bunları nasıl yapacağız. Silverlight 2.0 Beta 1 ile beraber
gelen **DispatchTimer** nesnesini kullanacağız. Bu aslında bizim
bildiğimiz Winforms'daki Timer'dan pek farklı değil. Esasen tek farkı
istemci tarafında farklı bir Threat içerisinde çalışıyormuş gibi
davranması.

<span style="color: blue;">Dim</span> Timer <span
style="color: blue;">As</span> Windows.Threading.DispatcherTimer

İlk olarak yukarıdaki şekilde Timer değişkenimizi global olarak
tanımladık. Global tanımlamamızın nedeni hem **MouseLeftButtonDown** hem
de **MouseLeftButtonUp** durumlarında bu Timer'a başvuracak olmamız.
Aslında yapacağımız esas işlemi Timer'ı **MouseLeftButtonDown**
durumunda yani kullanıcı düğmeye basında başlatmak ve
**MouseLeftButtonUp** durumunda ise yani kullanıcı düğmeyi bıraktığında
ise durdurmak.

    <span style="color: blue;">If</span> Scroll.ScrollableHeight \> 0
<span style="color: blue;">Then</span>

        Timer = <span style="color: blue;">New</span>
Windows.Threading.DispatcherTimer

        Timer.**Interval** = <span style="color: blue;">New</span>
TimeSpan(0, 0, 0, 0, **20**)

        <span style="color: blue;">AddHandler</span> Timer.**Tick**,
<span style="color: blue;">AddressOf</span> **TimerTick**

        Timer.**Start**()

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

Yukarıdaki kodumuzu düğmemizin **MouseLeftButtonDown** durumuna
yazıyoruz. Kullanıcı düğmeye tıkladığı anda global değişkenimize yeni
bir **DispatchTimer** nesnesi aktararak **Interval** değerini 20
milisaniye olarak düzenliyoruz. Böyleceher 20 milisaniyede bir bir
sonraki adımda **DispatchTimer** nesnesine bağladığımız **Tick**
event-handları çalıştırılıyor olacak. Tüm ayarlarımızı tamamladıktan
sonra DispatchTimer'ın **Start** metodu ile işlemi başlatıyoruz.

<span style="color: blue;">Sub</span> TimerTick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

    Scroll.ScrollToVerticalOffset(Scroll.VerticalOffset + 1)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Timer'ın her **Tick** durumunda daha önce kullandığımız kodu kullanarak
kaydırma işlemi yapıyoruz. Bu sefer Tick durumları 20 milisaniyede bir
olacağı için sadece 1 piksellik bir kayma yaratacağız.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Asagi\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> Asagi.MouseLeftButtonUp

    Timer.Stop()

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Son olarak düğmenin **MouseLeftButtonUp** durumunda ise Timer'ımızı
durdurarak kayma işlemini sonlandırıyoruz. Uygulamamızı hem **Asagi**
hem de **Yukari** düğmeleri için tamamladığımızda kodumuz aşağıdaki
şekilde sonuçlanıyor.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Dim</span> Timer <span
style="color: blue;">As</span> Windows.Threading.DispatcherTimer

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Asagi\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span style="color: blue;">
**Handles**</span> **Asagi.MouseLeftButtonDown,
Yukari.MouseLeftButtonDown**

        <span style="color: blue;">If</span> Scroll.ScrollableHeight \>
0 <span style="color: blue;">Then</span>

            Timer = <span style="color: blue;">New</span>
Windows.Threading.DispatcherTimer

            Timer.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 0, 0, 20)

            <span style="color: blue;">AddHandler</span> Timer.Tick,
<span style="color: blue;">AddressOf</span> TimerTick

            Timer.Start()

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Sub</span> TimerTick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

        <span style="color: blue;">If</span> Yukari.IsFocused <span
style="color: blue;">Then</span>

            Scroll.ScrollToVerticalOffset(Scroll.VerticalOffset - 1)

        <span style="color: blue;">Else</span>

            Scroll.ScrollToVerticalOffset(Scroll.VerticalOffset + 1)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Asagi\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span style="color: blue;">
**Handles**</span> **Asagi.MouseLeftButtonUp, Yukari.MouseLeftButtonUp**

        Timer.Stop()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki kod içerisinde MouseLeftButtonDown ve MouseLeftButtonUp
event-handlerlarının sadece birer kere bulunduğu dikkatinizi çekecektir.
Söz konusu event-handlerları her iki düğmeye de bağlamış durumdayız.
Aslında her iki düğmenin de sadece uygun zamanlarda Timer nesnesini
başlatması ve sonlandırma yeterli. Önemli olan Timer'ın Tick durumunda
içeriğini yukarı veya aşağıya kaydırılacağına karar verebiliyor olmak.
Bunun için de ben örneğimde **Yukari** düğmesinin **IsFocused**
özelliğinden faydalandım. Eğer bir düğmeye basılmış ise doğal olarak söz
konusu düğme Focus almış demektir. Böylece o an için hangi düğmeye
basılmakta olduğunu yakalayıp one göre işlem yapılabilir.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-5-9 tarihinde yayinlanmistir.*
