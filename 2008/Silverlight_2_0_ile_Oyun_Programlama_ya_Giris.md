---
FallbackID: 2045
Title: "Silverlight 2.0 ile Oyun Programlama'ya Giriş"
date: "2008-5-4"
EntryID: Silverlight_2_0_ile_Oyun_Programlama_ya_Giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: f7ad69bc-8772-45b8-b6a0-fe83baf2c866
---
# Silverlight 2.0 ile Oyun Programlama'ya Giriş
Silverlight 2.0 ile beraber .NET programlama geldiğinde göre hemen
aklımıza gelen konulardan biri de "Oyun Programlama" oluyor. Silverlight
içerisinde var olan **StoryBoard** yapısını kullanarak oyun
programlamaya çalıştığınız noktada ise *"Bu iş böyle olmaz"* diyerek
bırakacağınız kesin. Maalesef StoryBoard yapısı çoğu işi kolaylaştırsa
da ve oyun programlama içerisinde belirli bir yeri olsa da işin tamamını
halletmek için yeterli değil.

Oyun programlamada çoğu zaman kare kare çizim yapabilmemiz ve nesnelerin
koordinatları ile tek tek ilgilenebilmemiz gerekir. Daha net bir tanımla
aslında ekranda çizimi bizim kod ile yaptırmamız gerekir. Bu noktada
**Silverlight 2.0 Beta 1** ile beraber gelen **DispatcherTimer**
nesnesini kullanarak bu makalemizde ufak bir örnek yapacağız.

Hedefimiz uygulamamızda bir kare içerisine bir top yerleştirerek bu
topun kare içerisinde duvarlara çarparak sürekli gezmesini sağlamak.
"*Bu ne biçim oyun?*" diyebilirsiniz. Tabi ki makale sonunda elimizde
hazır bir oyun olmayacak, amacımız oyun programlamada kullanılan yapının
bir modelini yaratmak.

İlk olarak gelin uygulamamızın görsel kısmını tamamlayalım. Yarattığımız
yeni Silverlight 2.0 uygulamasına bir Ellipse yerleştirerek en üst sol
köşeye konumlandıralım. Ellipse'in adı **Top** olsun. İşlemleri
tamamladığımızda elde edeceğimiz XAML aşağıdaki gibi olacak.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication15.Page</span>"

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
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">**Grid**</span><span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**LayoutRoot**</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFF4E80C</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Ellipse**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Top**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

XAML kodumuz hazır olduğuna göre artık arkaplana geçip programlamaya
başlayabiliriz. Uygulamamızda kullanılmak üzere toplam dört adet global
değişken tanımlayacağız.

    <span style="color: blue;">Dim</span> Konum <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Media.TranslateTransform()

    <span style="color: blue;">Dim</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

    <span style="color: blue;">Dim</span> XDegisim = 5

    <span style="color: blue;">Dim</span> YDegisim = 5

Bu değişkenlerden ilki olan Konum bizim için sürekli olarak topun
ekranın sol üst köşesinden ne kadar sağda ve aşağıda olacağını
saklayacak. Konum değişkeninin tipi **TranslateTransform** şeklinde. Bu
değişken tipi herhangi bir nesnesinin **RenderTransform** grubuna
aktardığımızda nesnenin X ve Y koordinatlarında yer değiştirmesini
sağlıyor. Eğer Expression Blend 2.5 içerisinde bir nesne yaratır ve
herhangi bir animasyon ile konumunu değiştirirseniz nesnenizin XAML
kodunun aşağıdaki hale geldiğini görebilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">80</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">136,93,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">155</span>"<span style="color: blue;"> </span><span
style="color: red;">Fill</span><span style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">rectangle</span>"<span style="color: blue;">
</span><span style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ScaleTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">SkewTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TranslateTransform </span> <span
style="color: #FF0000;">X</span><span
style="color: blue;">=</span>"<span
style="color: #0000FF">10</span>"<span style="color: blue;"> </span>
<span style="color: red;"> Y</span><span
style="color: blue;">=</span>"<span
style="color: #0000FF">10</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Rectangle.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

Expression Blend'in bizim için yarattığı **Rectangle** koduna da
baktığımızda aslında yapıyı anlayabiliyoruz.Rectangle içerisine
yerleştirilen bir **RenderTransform** yapısındaki **TransformGroup**
içerisinde **TranslateTransform** nesnesi yer alıyor. Bu nesnenin X ve Y
özellikleri de Rectangle'ın ne kadar yer değiştireceğine karar veriyor.
Biz bu aynı yapıyı kendi **Top** nesnemiz için programatik olarak
kullanacağız.

Şimdi tanımladığımız global değişkenlere geri dönelim.

    <span style="color: blue;">Dim</span> Konum <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Media.TranslateTransform()

    <span style="color: blue;">Dim</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

    <span style="color: blue;">Dim</span> XDegisim = 5

    <span style="color: blue;">Dim</span> YDegisim = 5

İkinci değişkenimiz bir **DispatcherTimer** tipinde bir Timer nesnesi.
Bu nesne aslında Windows programlamadan bildiğimiz Timer'dan farklı
değil. Bu Timer'ın da bir **Tick** durumu ve **Interval'i** var. Biz
örneğimizde Interval'i çok düşük vererek ekranda çizim yapmak için bu
nesneyi kullanacağız.

Diğer iki global değişkenimizin aslında Top'umuzun bir defada ne kadar
yer değiştireceğine karar veriyor. Bu değerleri büyüterek topun hızını
arttırabilir veya tam tersine azaltarak topunu hızını da
yavaşlatabilirsiniz.

        Timer.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 0, 0, 15)

        <span style="color: blue;">AddHandler</span> Timer.Tick, <span
style="color: blue;">AddressOf</span> Timer\_Tick

        Timer.Start()

Silverlight uygulamamız sayfada ilk açıldığında hemen Timer nesnemizin
Interval'ini 15 milisaniye olarak ayarlıyoruz. Her 15 milisaniyede bir
ekrandaki Top'un yeni konumunu belirleyeceğiz böylece animasyon
oluşturmuş olacağız. Doğal olarak Timer nesnemizin **Tick** durumunu da
yakalamamız lazım. Onun için bir de event-handler tanımıyoruz.
Event-Handler kodumuza birazdan bakacağız. Son olarak Timer'ın **Start**
metodu ile sayacı başlatıyoruz.

Sıra geldi Timer'ın her bir Tick durumunda topun yeni pozisyonunu
ayarlamaya. Aslında kullanacağımız kod çok basit.

        Konum.X += XDegisim

        Konum.Y += YDegisim

        Top.RenderTransform = Konum

Global değişkenimiz olan **Konum** değişkeninin X ve Y değerlerine
değişim miktarlarını ekleyerek Top'un **RenderTransform'una**
eşitleyerek Top'un yeni konumunu almasını sağlıyoruz. Fakat ortada bir
sorun var; Top'un duvarlardan sekmesi lazım. Kabaca baktığımızda aslında
yapmamız gereken dört kontrol var. Eğer top alt kenara çarptıysa artık
XDegisim miktarı 5 değil de -5 olmalı. Böylece top tekrar yukarıya doğru
gitmeye başlamalı. Aynı şekilde her kenar için bu kontrolün yapılması
lazım. Eğer top sağ kenara çarptıysa artık YDegisim miktarı 5 değil
de -5 olmalı. Tüm bu kontrolleri yaptığımızda aşağıdaki gibi bir kod
elde ediyoruz.

        <span style="color: blue;">If</span> Konum.X = <span
style="color: blue;">Me</span>.LayoutRoot.ActualWidth - Top.Width <span
style="color: blue;">Then</span>

            XDegisim = -XDegisim

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.Y = <span
style="color: blue;">Me</span>.LayoutRoot.ActualHeight - Top.Height
<span style="color: blue;">Then</span>

            YDegisim = -YDegisim

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.X = 0 <span
style="color: blue;">Then</span>

            XDegisim = Math.Abs(XDegisim)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.Y = 0 <span
style="color: blue;">Then</span>

            YDegisim = Math.Abs(YDegisim)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        Konum.X += XDegisim

        Konum.Y += YDegisim

        Top.RenderTransform = Konum

IF kontrollerimizi sırasıyla incelersek; ilkinde eğer topun konumu
sahnemizdeki ana Canvas'ımız olan **LayoutRoot'un** genişliğinden
**Top'un** genişliğini de çıkararak aldığımız koordinata ulaşmış ise
hemen **XDegisim** miktarını - hale getiriyoruz. Böylece Top geri
gitmeye başlayacak. Aynı şekilde ikinci IF kontrolünde de Y yönünde aynı
kontrolü yapıyoruz. Tabi bir de işin diğer tarafı var, yani değişim
miktarı eksi iken top ekranın üstüne veya soluna doğru gidecek. Bu
durumda da üçüncü ve dördüncü IF kontrolümüz ile Top bu pozisyonlara
gelmiş ise değişim miktarlarının mutlak değerini alarak pozitif hale
çeviriyoruz.

Bu hali ile uygulamamızı çalıştırdığımızda topumuzun duvarlardan sekerek
sonsuza dek gezecektir. Kodumuzun son hali aşağıdaki şekilde;

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Dim</span> Konum <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Media.TranslateTransform()

    <span style="color: blue;">Dim</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

    <span style="color: blue;">Dim</span> XDegisim = 5

    <span style="color: blue;">Dim</span> YDegisim = 5

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Timer.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 0, 0, 15)

        <span style="color: blue;">AddHandler</span> Timer.Tick, <span
style="color: blue;">AddressOf</span> Timer\_Tick

        Timer.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Timer\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs)

        <span style="color: blue;">If</span> Konum.X = <span
style="color: blue;">Me</span>.LayoutRoot.ActualWidth - Top.Width <span
style="color: blue;">Then</span>

            XDegisim = -XDegisim

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.Y = <span
style="color: blue;">Me</span>.LayoutRoot.ActualHeight - Top.Height
<span style="color: blue;">Then</span>

            YDegisim = -YDegisim

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.X = 0 <span
style="color: blue;">Then</span>

            XDegisim = Math.Abs(XDegisim)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span> Konum.Y = 0 <span
style="color: blue;">Then</span>

            YDegisim = Math.Abs(YDegisim)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        Konum.X += XDegisim

        Konum.Y += YDegisim

        Top.RenderTransform = Konum

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonDown

        <span style="color: blue;">If</span> Timer.IsEnabled <span
style="color: blue;">Then</span>

            Timer.Stop()

        <span style="color: blue;">Else</span>

            Timer.Start()

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Ek olarak bir de sayfanın genelinde **MouseLeftButtonDown** durumunu
yakalayarak Silverlight uygulamasına tıklandığında Timer'ın
durdurulabilerek tekrar başlatılabilmesi için gerekli kodu da yazarsak
örneğimiz artık tamamlanmış demektir. Artık farklı animasyon yapmak,
farklı koordinat kontrolleri yapmak hatta matematiksel koordinat
hesaplamalarını ortaokula dönüp biraz da trigonometri ekleyerek lise
bilgisi ile de vektörel hesaplamalara çevirmek tamamen size kalmış.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-5-4 tarihinde yayinlanmistir.*
