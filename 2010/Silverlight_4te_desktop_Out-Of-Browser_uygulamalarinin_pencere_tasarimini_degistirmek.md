# Silverlight 4'te desktop (Out-Of-Browser) uygulamalarının pencere tasarımını değiştirmek
Silverlight 4 ile beraber gelen "Full Trust Out Of Browser" modunun
getirdiği ek özelliklerden biri de tarayıcı dışına alınan bir
Silverlight uygulamasının host edildiği işletim sistemi penceresini de
özelleştirebiliyor olmak. Aslında daha gerçekçi bir bakış açısı ile
konuya bakarsak :) işletim sisteminin penceresini kullanmayıp kendi
pencere yapınızı oluşturmanız gerekiyor fakat bu noktada da Silverlight
içerisinde yeni API'ler gerçekten bu işi çocuk oyuncağına çeviriyor. Bu
yazımıda sıfırdan bir Full Trust OOB uygulaması yaratıp uygulama
penceresinin görünüşünde yapabileceğimiz değişikliklere göz atacağız.

![Uygulamamızın penceresi ile ilgili yapabileceğimiz
ayarlar.](media/Silverlight_4te_desktop_Out-Of-Browser_uygulamalarinin_pencere_tasarimini_degistirmek/06042010_1.png)\
*Uygulamamızın penceresi ile ilgili yapabileceğimiz ayarlar.*

Yeni yarattığımız uygulamaya sağ tuş ile Solution Explorer içerisinde
tıklayıp ulaşabileceğimiz "Properties" ekranında ilk olarak uygulama bir
"Out Of Browser" application yapabilmek için "Enable running application
out of the browser" seçeneğini işaretliyoruz. Sonrasında "Out-Of-Browser
Settings" bölümüne geçerek hemen full-trust moduna geçmek "Require
elevated trust" kutucuğunu işaretliyoruz. Böylece "**Windows Style"**
adındaki combo aktif hale gelerek bizim uygulamamıza ait işletim sistemi
penceresini özelleştirebilmemizi sağlıyor. İlk olarak gelin
uygulamamızda örnek amaçlı olarak ihtiyacımız olacak kontrolleri
yaratalım.

**[XAML]**

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="recBar"</span><span style="color: red;">
Fill</span><span style="color: blue;">="Blue"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="27"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnKapat"</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Height</span><span style="color: blue;">="19"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="0,8,8,0"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="23"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="recKose"</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Height</span><span style="color: blue;">="22"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Bottom"</span><span style="color: red;">
Width</span><span style="color: blue;">="31"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: red;"> EndPoint</span><span
style="color: blue;">="1.273,1.348"</span><span style="color: red;">
StartPoint</span><span style="color: blue;">="0.5,0"\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="Black"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="1"/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="White"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnUfalt"</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Height</span><span style="color: blue;">="19"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="0,8,72,0"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="23"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ToggleButton</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnBuyut"</span><span style="color: red;">
Content</span><span style="color: blue;">="ToggleButton"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="20"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,5,48,0"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Uygulama ekranımızda iki adet ayrı Rectangle var. Bunlardan birini
uygulama ekranını sağa sola taşıyabilmek için handle olarak
kullanacağız. Diğer rectangle ise uygulama ekranın sağ alt köşesine
yapıştırılmış durumda. Böylece bu rectangle da uygulama ekranının sağ
alttan tutularak tekrar boyutlandırılabilmesini sağlayacak.
Rectangle'lar haricinde iki button ve bir de ToggleButton'umuz var.
Düğmelerden biri uygulamayı kapatmak için diğeri ise Windows Taskbar'a
küçültebilmek için lazım. ToggleButton ise uygulamanın gerektiğine tam
ekran yapılabilmesini veya eski haline geri alınabilmesini sağlayacak.
Anlayacağız aslında kabaca normal bir Windows penceresi yapacağız ama
tamamen kendi tasarımımız ve implementasyonumuz ile yapacağız.

![Basit hali ile uygulama
ekranımız.](media/Silverlight_4te_desktop_Out-Of-Browser_uygulamalarinin_pencere_tasarimini_degistirmek/06042010_2.png)\
*Basit hali ile uygulama ekranımız.*

Aslında bu noktaya kadar tasarımınızı tamamladınız ve "No Border"
ayarını yaptıysanız uygulamanızın desktop modundaki penceresini
bitirdiniz demektir. Fakat geriye kalır işlevsellikleri eklemek. Yani en
basiti "Kapat" düğmesine basıldığında uygulama kapanmalı. Gelin şimdi bu
gibi özellikler için kullanacağımız API'lere hızlıca göz atalım.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> recBar\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.<span
style="color: #2b91af;">MouseButtonEventArgs</span>) <span
style="color: blue;">Handles</span> recBar.MouseLeftButtonDown

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

            **** <span
style="color: #2b91af;">**App**</span>**.Current.MainWindow.DragMove()**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod ile uygulama penceremizin taşınması ile ilgili gerekli
işlevselliği projemize eklemiş olduk. Çok kolay değil mi? Tek yapmanız
gereken handle olarak kullanacağınız bir UIElement'i sahneye eklemek (bu
bizim örneğimizde bir rectangle) sonra da MouseLeftButtonDown eventinde
**DragMove** metodunu çağırmak. Geriye kalan herşey otomatik olarak
halloluyor. Artık uygulamamızın kendi tasarladığımız penceresindeki
handle'dan tutup sağa sola taşıyabiliriz. Tabi eğer taşınan koordinatı
kenara bir yere kaydetmek ve bir dahakine oradan açmak isterseniz
kaydetme ve okuma işlemlerini IsolatedStorage'dan AppSettings ile sizin
yapmanız gerekecektir.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> recKose\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.<span
style="color: #2b91af;">MouseButtonEventArgs</span>) <span
style="color: blue;">Handles</span> recKose.MouseLeftButtonDown

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

            **** <span
style="color: #2b91af;">**App**</span>**.Current.MainWindow.DragResize(**<span
style="color: #2b91af;">**WindowResizeEdge**</span>**.BottomRight)**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Dikkatinizi çektiyse tüm API'leri kullanırken uygulamanın Desktop
modunda olup olmadığını ve Full Trust bir uygulama olup olmadığını da
kontrol ediyoruz. Çünkü aksi halde kullanıcıların bu API'leri tarayıcı
içerisinde de çağırabilirlerde ve tek alacakları şey de garip hatalar
olurdu. Konumuza dönecek olursak. Bir sonraki adımda hedefimiz uygulama
penceremizin boyutunun kullanıcı tarafından değiştirilebilmesini
sağlamak. Bunun için zaten uygulama ekranında ek bir Rectangle nesnesini
ekranın sağ altına yerleştirmiştik. Böylece kullanıcıların o Rectangle
üzerinden tıklayarak uygulama penceresini boyutlandırabilecekti. İşte
bunu da yapabilmek için söz konusu Rectangle'ın MouseLeftButtonDown
durumunda **DragResize** metodunu çağırıyoruz. Metodumuzu çağırırken
ayrıca uygulamanın neresinden Resize edildiğini de parametre olarak
vermemiz gerekiyor. Bizim Rectangle sağ altta olduğunda göre
**BottomRight** parametresi doğru olacaktır. Başka herhangi birşey
yapmamız gerekmiyor. Artık penceremiz hem taşınabilir hem de
boyutlandırılabilir oldu.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnKapat\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnKapat.Click

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

            <span style="color: #2b91af;">
**App**</span>**.Current.MainWindow.Close()**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnUfalt\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnUfalt.Click

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

            **** <span
style="color: #2b91af;">**App**</span>**.Current.MainWindow.WindowState
=** <span style="color: #2b91af;">**WindowState**</span>**.Minimized**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnBuyut\_Checked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnBuyut.Checked

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

          ** ** <span
style="color: #2b91af;">**App**</span>**.Current.MainWindow.WindowState
=** <span style="color: #2b91af;">**WindowState**</span>**.Maximized**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnBuyut\_Unchecked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnBuyut.Unchecked

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">App</span>.Current.HasElevatedPermissions <span
style="color: blue;">And</span> <span
style="color: #2b91af;">App</span>.Current.IsRunningOutOfBrowser <span
style="color: blue;">Then</span>

            **** <span
style="color: #2b91af;">**App**</span>**.Current.MainWindow.WindowState
=** <span style="color: #2b91af;">**WindowState**</span>**.Normal**

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki dört durumu çok basit bulduğum için topluca değerlendirmeyi
uygun buldum. Kodlarımızdan ilki Close metodu ile programı kapatıyor.
Diğer metodlar ise özünde hem Winforms hem de WPF'ten alışık olduğumuz
WindowsState'i değiştiriyor. Yani uygulama penceresini tam ekran
yapabiliyor, normal haline alabiliyor veya taskbara ufaltabiliyoruz. Tüm
bunları uygun kontrollere de atayınca olay bitiyor.

Gördüğünüz gibi kendi özel pencerelerini tasarlayarak Silverlight
Desktop uygulamalarınızı da apayrı görselliklerle sunabilirsiniz ;)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2010-4-7 tarihinde yayinlanmistir.*
