# Windows Phone 7 Performans İpuçları
Dün[Windows Phone 7'de performans
metriklerinden](http://daron.yondem.com/tr/post/Windows_Phone_7_Performans_Metrikleri)
bahsettikten sonra bugün biraz da performans analizi ve ipuçlarına
odaklanmaya karar verdim :) Eğer dünkü yazıyı okumadıysanız kesinlikle
önce onu okuyup sonra buradan devam etmenizd büyük fayda olacaktır.

### RedrawRegions ile performans analizi

Şimdi bu örneğimizde hemen yeni bir uygulama yaratıyoruz ve ekrana basit
bir Ellipse ile Rectangle koyuyoruz.

**[XAML]**

<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Canvas</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="LayoutRoot"</span><span
style="color:red;"> Background</span><span
style="color:blue;">="Transparent"\></span>\
<span style="color:#a31515;">     </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Ellipse</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="ellipse"</span><span
style="color:red;"> Fill</span><span
style="color:blue;">="\#FFF4F4F5"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="128"</span><span
style="color:red;"> Canvas.Left</span><span
style="color:blue;">="179"</span><span
style="color:red;"> Stroke</span><span
style="color:blue;">="Black"</span><span style="color:red;"> \
        Canvas.Top</span><span style="color:blue;">="249"</span><span
style="color:red;"> Width</span><span
style="color:blue;">="119"/\></span>\
<span style="color:#a31515;">     </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Rectangle</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="rectangle"</span><span
style="color:red;"> Fill</span><span
style="color:blue;">="\#FFF4F4F5"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="794"</span><span
style="color:red;"> Stroke</span><span
style="color:blue;">="Black"</span><span
style="color:red;"> Width</span><span
style="color:blue;">="100"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Canvas</span><span style="color:blue;">\></span>

Yukarıdaki XAML kodunda da görebileceğiniz gibi aslında durum epey
basit. Kod tarafında ise basit bir DispatcherTimer ile Rectangle'ımızı
alıp ekranın sağına doğru taşıyalım.

**[C\#]**

        System.Windows.Threading.<span
style="color:#2b91af;">DispatcherTimer</span> Sayac = <span
style="color:blue;">\
                    new</span> System.Windows.Threading.<span
style="color:#2b91af;">DispatcherTimer</span>();\
\
        <span style="color:blue;">void</span> MainPage\_Loaded(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">RoutedEventArgs</span> e)\
        {\
            Sayac.Tick += <span style="color:blue;">new</span> <span
style="color:#2b91af;">EventHandler</span>(Sayac\_Tick);\
            Sayac.Interval = <span
style="color:#2b91af;">TimeSpan</span>.FromMilliseconds(25);\
            Sayac.Start();\
        }\
\
        <span style="color:blue;">void</span> Sayac\_Tick(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">EventArgs</span> e)\
        {\
            <span
style="color:#2b91af;">Canvas</span>.SetLeft(rectangle, <span
style="color:#2b91af;">Canvas</span>.GetLeft(rectangle) + 1);\
        }

Herşey çok güzel gözükse de aslında ciddi sorunlarımız var. Bu
uygulamayı çalıştırdığınızda Rectangle ile Ellipse çok güzel anime
olacak fakat aslında uygulama yapımızda bazı sorunlar nedeniyle ciddi
performans kaybediyoruz. Gelin şimdi hemen aşağıdaki ayarı yapalım.

**[C\#]**

        <span style="color:blue;">public</span> App()\
        {\
            UnhandledException += Application\_UnhandledException;\
\
            <span
style="color:blue;">if</span> (System.Diagnostics.<span
style="color:#2b91af;">Debugger</span>.IsAttached)\
            {\
                <span
style="color:#2b91af;">Application</span>.Current.Host.Settings.EnableFrameRateCounter = <span
style="color:blue;">true</span>;\
                <span
style="color:#2b91af;">Application</span>.Current.Host.Settings.EnableRedrawRegions = <span
style="color:blue;">true</span> ;\
            }\
\
            InitializeComponent();\
            InitializePhoneApplication();\
        }

App.xaml arkasında kodumuza Debugger attached durumdaysa çalıştırılmak
üzere**EnableRedrawRegions**  özelliği **True** olarak değiştiren bir
kod ekliyoruz. Böylece artık uygulamamız çalıştığında emülatör veya
telefon üzerinde ekranda sürekli "tekrar" çizilen kısımları
görebileceğiz.

![Hmm kocaman alan tekrar çiziliyor
gibi...](media/Windows_Phone_7_Performans_Ipuclari/wp7tricks.png)\
*Hmm kocaman alan tekrar çiziliyor gibi...*

Yukarıdaki sarı olarak gördüğünüz alan Rectangle sola oynadıkça tekrar
çizilen alanı gösteriyor. Tabi screenshot'tan anlamak biraz zor ama eğer
uygulamayı siz çalıştırırsanız göreceksiniz ki yukarıda sarı olarak
gösterilen alan sürekli renk değiştiyor. İşte sistem zaten bu şekilde
tekrar çizilen alanları sürekli farklı renklerde renklendirerek bizi
tekrar çizilme işleminden haberdar etmeye çalışıyor.

Şimdi esas soru şu :) Neden Rectangle sağa giderken soldaki (uzaktaki)
dairyi de içine alan koca bir alanın tekrar çizilmesi söz konusu olmuş
olabilir ki? İşte tam da bu noktada UIThread'in yarattığı ve Composition
Thread'e aktardığı yüzeyleri hatırlamanızı istiyorum. Her iki nesne de
aynı Canvas içerisinde ve Composition Thread kendisine beraber gelen bu
arkadaşları tek bir yüzey olarak birleştirip işlem yapmayı uygun görmüş.
Bu mekanizmayı değiştiremesek de ortaya saçma bir sonuç çıktığı kesin.
Eğer rectangle hareket ediyorsa sadece Rectangle çizilsin. Hatta
Rectangle da tekrar çizilmesin Cache'lensin çünkü onun da sadece
pozisyonu değişiyor :)

![CacheMode ile herşey
yolunda!](media/Windows_Phone_7_Performans_Ipuclari/wp7tricks2.png)\
*CacheMode ile herşey yolunda!*

İşte Rectangle nesnesinin CacheMode özelliğini değiştirdiğimiz gibi
yukarıdaki şekilde nesnelerin ayrı ayrı ele alındığında ve hatta
(screenshotta belli olmuyor ama) Rectangle'ın tekrar tekrar render
edilme hikayesinin de sonlandığını görebiliyoruz.

**[XAML]**

<span style="color:#a31515;">   </span><span
style="color: #808080"> </span><span
style="color: #808080;">\<Canvas x:Name="LayoutRoot" Background="Transparent"\></span>\
<span style="color: #808080;">    
\<Ellipse x:Name="ellipse" Fill="\#FFF4F4F5" Height="128" Canvas.Left="179"</span><span
style="color: gray;"> </span>\
<span style="color:red;"><span style="color: #808080">           
Stroke</span></span><span
style="color: #808080;">="Black" Canvas.Top="249" Width="119"/\></span>\
<span style="color: #808080;">        \<Rectangle</span><span
style="color:red;"> CacheMode</span><span
style="color:blue;">="BitmapCache"</span> <span
style="color: gray;"> x:Name="rectangle"</span><span
style="color:red;"> </span>\
<span style="color:red;"><span style="color: gray">           
Fill</span></span><span
style="color: gray;">="\#FFF4F4F5" Height="794" Stroke="Black" Width="100"/\></span>\
<span style="color: gray;">    \</Canvas</span><span
style="color:blue;">\></span>

### CacheVisualization

Bir diğer önemli nokta ise Cache'lenmiş alanları görmek. Aynı şekilde bu
özellikl de yukarıdaki örneğimizindeki gibi sorunları rahatlıkla
yakalamanıza yardımcı olabilir. CacheVisualization bir uygulama
içerisind Cachelenmiş alanları maviye boyayarak gösteriyor.

**[C\#]**

                <span
style="color:#2b91af;">Application</span>.Current.Host.Settings.EnableCacheVisualization = <span
style="color:blue;">true</span>;

CacheVisualization'ı açmak için yukarıdaki komutu kullanabilirsiniz.

![Rectangle'daki CacheMode değişikliklierinin
yansıması.](media/Windows_Phone_7_Performans_Ipuclari/wp7tricks3.png)\
*Rectangle'daki CacheMode değişikliklierinin yansıması.*

Yukarıdaki iki ayrı ekran görüntüsünde de görebileceğiniz üzere solda
Rectangle'ın CacheMode kapalıyken Cache' alınan şey tüm yüzey olmuş.
Buradan da yüm yüzeyin Composition Thread'e beraber gönderildiğini
anlayabiliyoruz. Diğer yandan sağ tarafta Rectangle için ayrıca
CacheMode belirlediğimizde de mavi olarak gösterilen yerler ayrı ayrı
nesneler olduğu için Cache'lenmenin nerelerde olduğunu anlayabiliyoruz.

Umarım bu analizlerle uygulamalarınızı daha performanslı hale
getirebilirsiniz ;) Kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2011-9-27 tarihinde yayinlanmistir.*
