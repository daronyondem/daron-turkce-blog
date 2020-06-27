# Silverlight 2.0 içerisinde harici dinamik XAP (Silverlight 2.0) uygulamalarının asenkron yüklenmesi.
Dinamik olarak Silverlight 2.0 uygulamalarında farklı XAP dosyalarını
istemci tarafına yükleyerek ana XAP içerisinde gösterebiliyor olmak
kullanıcı deneyimi açısından büyük önem taşıyor. İçerisinde yoğun
animasyonların ve belki de harici kontrollerin bulunduğu bir arayüzü
Silverlight uygulaması istemciye ilk gönderildiğinde topluca göndermek
doğru olmayabilir. Bu durum hem ana Silverlight uygulamasının istemcide
açılma süresini uzatacak hem de belki kullanıcının hiç kullanmayacağı
uygulama bölümlerinin gereksiz yere kullanıcıya gönderilmesine neden
olacaktır. Tüm bu nedenlerle dinamik olarak harici XAP dosyalarını, yani
Silverlight uygulamalarını başka bir Silverlight uygulaması içerisine
yükleyerek çalıştırabilmek büyük önem taşıyor. Sonraki örneğimizde
dinamik XAP yükleme işlemini nasıl yapabileceğimizi inceleyeceğiz.

**Projemizi hazırlayalım...**

İlk olarak Visual Studio içerisinde yeni bir Silverlight projesi
yaratarak beraberinde bir de ASP.NET uygulaması yaratılması için ilk
açılışta gelen uyarı kutusunda gerekli işaretlemeyi yapalım. Bu standart
prosesi atlattıktan sonra artık Visual Studio içerisindeki
Solution'ımıza yeni bir Silverlight projesi daha eklememiz gerekiyor.
Toplam olarak Solution içerisinde bir ASP.NET ve iki Silverlight projesi
bulunacak.

Solution'a Solution Explorer içerisinde sağ tuş ile tıklayarak gelen
menüden "Add / New Project" yeni bir Silverlight projesi seçerek
ekleyebilirsiniz. Ekleme işlemini yaparken size aşağıdaki şekilde bir
pencere ile eklenen Silverlight uygulamasının Solution içerisinde bir
ASP.NET sitesi ile ilişkilendirip ilişkilendirilmeyeceği sorulacaktır.
Bu noktada var olan uygulama ile yeni Silverlight'ımızı
ilişkilendirmemiz gerekiyor, böylece Visual Studio içerisinde F5'e
bastığımızda bu Silverlight uygulaması da compile edilerek ASP.NET
sitesi içerisine kopyalanacaktır.

![İkinci Silverlight uygulamamızı Solution içerisine
eklerken...](media/Silverlight_2_0_icerisinde_harici_dinamik_XAP_uygulamalarinin_asenkron_yuklenmesi/02072008_1.png)\
*İkinci Silverlight uygulamamızı Solution içerisine eklerken...*

**Sonradan yüklenecek Silverlight uygulamamızı hazırlayalım...**

İlk olarak uzaktaki (remote) Silverlight uygulamamızı hazırlayalım.
Örnek olması ve konudan çok uzaklaşmamak adına uygulamamız çok basit
olacak fakat unutmayın ki uzaktaki Silverlight uygulaması video gösteren
veya belki de harici kontroller (DataGrid) kullanan bir uygulama da
olabilirdi. Böyle bir durumda karşıdan yüklenecek uygulamamız çok daha
büyük bir boyuta sahip olurdu.

Biz şimdilik uygulama içerisinde toplama işlemi yapan iki TextBox ve bir
de Button bulunsun. Böylece ana uygulamada toplama işlemi yapılacağı
zaman bu harici uygulamayı yükleyerek kullanıcının istediğini yapmasını
sağlayalım.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightRemote.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Height</span><span style="color: blue;">="40"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="40,40,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="120"</span><span
style="color: red;"> Text</span><span
style="color: blue;">="TextBox"</span><span style="color: red;">
TextWrapping</span><span style="color: blue;">="Wrap"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Kutu1**"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Height</span><span style="color: blue;">="40"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,40,40,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="120"</span><span
style="color: red;"> Text</span><span
style="color: blue;">="TextBox"</span><span style="color: red;">
TextWrapping</span><span style="color: blue;">="Wrap"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Kutu2**"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Margin</span><span style="color: blue;">="160,120,160,140"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Dugme**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamızın XAML kodu yukarıdaki şekilde sonlanıyor. Şimdi geçelim
arkaplanda çalışan ve basit bir şekilde toplama işlemi yaparak sonucu
düğmenin üzerine yazdıran koda.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        Dugme.Content = <span
style="color: blue;">CInt</span>(Kutu1.Text) + Kutu2.Text

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            Dugme.Click += <span style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Dugme\_Click);

        }

 

        <span style="color: blue;">void</span> Dugme\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            Dugme.Content = <span
style="color: blue;">int</span>.Parse(Kutu1.Text) + <span
style="color: blue;">int</span>.Parse(Kutu2.Text);

        }

**Ana Silverlight uygulamamızı hazırlayalım...**

Sıra geldi gerektiğinde uzaktaki Silverlight uygulamamızı yükleyerek
kullanıcının kullanmasını sağlayacak olan ana uygulamamızı geliştirmeye.
Bunun için yine basit bir örnek olarak uygulamamız içerisine bir
**StackPanel** yerleştirelim. Söz konusu StackPanel içerisinde şimdilik
uzaktaki uygulamamızın yüklenmesini sağlayacak olan bir düğme yer
alacak.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication36.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**StackPanel**</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**LayoutRoot**"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="TOPLAMA işlemi için
tıkla"</span><span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="**Dugme**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamızın tasarımı da hazır olduğuna göre artık düğmeye basıldığında
çalışacak kod kısmına geçebiliriz. Düğmemize tıklandığında bir WebClient
kullanarak sunucudan diğer uygulamanın XAP dosyasını istemci tarafına
yüklememiz gerekiyor.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        <span style="color: blue;">Dim</span> Yukleme <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
WebClient

        <span style="color: blue;">AddHandler</span>
Yukleme.OpenReadCompleted, <span style="color: blue;">AddressOf</span>
**Yukleme\_OpenReadCompleted**

 

        Yukleme.OpenReadAsync(<span style="color: blue;">New</span>
Uri(<span
style="color: #a31515;">"**SilverlightRemote**.**xap**"</span>,
UriKind.Relative))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            Dugme.Click += <span style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Dugme\_Click);

        }

 

        <span style="color: blue;">void</span> Dugme\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: #2b91af;">WebClient</span> Yukleme =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">WebClient</span>();

            Yukleme.OpenReadCompleted += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">OpenReadCompletedEventHandler</span>(**Yukleme\_OpenReadCompleted**);

            Yukleme.OpenReadAsync(<span style="color: blue;">new</span>
<span style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"**SilverlightRemote.xap**"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative));

        }

Kodumuzun ilk satırında bir **WebClient** yarattıktan sonra WebClient'ın
**OpenReadCompleted** event'ını da bir event-handler'a bağlıyoruz.
Sonrasında da **OpenReadAsync** metodu ile uzaktaki XAP dosyasını
istemciye indirmeye başlıyoruz. İndirme işlemi tamamlandığında
event-handler kodumuz çalışacak. Şimdi esas işlemleri yapacağımız, XAP
dosyası istemciye indiğinde çalışacak olan event-handler kodumuza
geçelim.

**[VB]**

<span style="color: blue;">Dim</span> UygulamaManifesti <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: blue;">New</span>
IO.**StreamReader**(Application.**GetResourceStream**(<span
style="color: blue;">New</span>
Windows.Resources.**StreamResourceInfo**(e.Result, <span
style="color: blue;">Nothing</span>), <span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"AppManifest.xaml"</span>,
UriKind.Relative)).**Stream**).**ReadToEnd**()

**[C\#]**

<span style="color: blue;">string</span> UygulamaManifesti = <span
style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">**StreamReader**</span>(<span
style="color: #2b91af;">Application</span>.**GetResourceStream**(<span
style="color: blue;">new</span> System.Windows.Resources.<span
style="color: #2b91af;">**StreamResourceInfo**</span>(e.Result, <span
style="color: blue;">null</span>), <span style="color: blue;">new</span>
<span style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"AppManifest.xaml"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative)).**Stream**).**ReadToEnd**();

Buradaki kod ilk bakışta biraz karışık gelebilir fakat aslında çok
basit. Her Silverlight uygulaması içerisinde (XAP dosyası içerisinde)
bir **AppManifest.xaml** bulunur. Bu dosya içerisinde tek tek söz konusu
uygulamada kullanılan Assembly'lerin adları ve ilişkili DLL dosyalarının
adları bulunur. Bizim de hedefimiz uzaktaki uygulamada kullanılmış tüm
Assembly'leri bularak istemci tarafında belleğe yüklemek. Aslında bizim
örneğimizde tek bir Assembly olduğunu biliyoruz fakat eğer örnek farklı
olsaydı ve harici kontroller kullanılmış olsaydı doğal olarak birden çok
Assembly olacaktı. O nedenle biz daha genel geçer bir taktik kullanarak
esnek olalım.

Yukarıdaki kod içerisinde bir **StreamResourceInfo** nesnesine
**e.Result** ile indirdiğimiz XAP dosyasını aktarıyoruz. Bu
**StreamResource** içerisinden de Application.**GetResourceStream** ile
**AppManifest.xaml** dosyasını istiyoruz. Dosyayı aldığımızda
**Stream'ini** de bir **StreamReader** ile sonuna kadar **ReadToEnd**
ile okuyoruz. Böylece artık elimizde **AppManifest.xaml** var.

**[VB]**

<span style="color: blue;">Dim</span> Dagitim <span
style="color: blue;">As</span> Deployment = <span
style="color: blue;">CType</span>(Markup.XamlReader.Load(UygulamaManifesti),
Deployment)

**[C\#]**

<span style="color: #2b91af;">Deployment</span> Dagitim =
System.Windows.Markup.<span
style="color: #2b91af;">XamlReader</span>.Load(UygulamaManifesti) <span
style="color: blue;">as</span> <span
style="color: #2b91af;">Deployment</span>;

Bir sonraki adımda **AppManifest.xaml** içerisinde tanımlı olan
**Deployment** şeklini bir **Deployment** nesnesine eşitlememiz
gerekiyor. Bunu aslında elimizde String olarak var olan bir XAML'ı .NET
nesnesine çevirme olarak değerlendirebilirsiniz.
**Markup.XamlReader.Load** metodu ile elimizdeki dosyayı okutarak gelen
nesneyi de **Deployment'a** Cast ediyoruz. Zaten uzaktaki (remote)
uygulamamızı Compile ettiğimizde oluşan XAP dosyasının içerisine girerek
AppManifest.xaml'ına baktığımızda da aşağıdaki XAML ile karşılaşıyoruz.

**[XAML]** AppManifest.xaml

<span style="color: blue;">\<</span><span
style="color: #a31515;">Deployment</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007/deployment"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span><span
style="color: red;"> EntryPointAssembly</span><span
style="color: blue;">="SilverlightRemote"</span><span
style="color: red;"> EntryPointType</span><span
style="color: blue;">="SilverlightRemote.App"</span><span
style="color: red;"> RuntimeVersion</span><span
style="color: blue;">="2.0.30523.6"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Deployment.Parts</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span style="color: blue;">
**\<**</span><span style="color: #a31515;">**AssemblyPart**</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="SilverlightRemote"**</span><span
style="color: red;"> **Source**</span><span
style="color: blue;">**="SilverlightRemote.dll" /\>**</span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Deployment.Parts</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Deployment</span><span
style="color: blue;">\></span>

Sıra geldi artık Deployment içerisindeki tüm Assembly'leri gezerek
hepsini istemci tarafında hafızaya yüklemeye. Tüm bu yüklemeleri
yaparken aralarından SilverlightRemote.dll adında olanı bir kenara
çekerek referansını ayrı bir değişkende tutacağız. Bunun yapmamızın
nedeni ise bu DLL içerisindeki **Page** sınıfından bir adet türeterek
sahneye almak zorunda olmamız. Assembly'leri hafızaya yüklesek de işin
görsel kısmını sahneye almamız lazım. Bunun detaylarına birazdan
değineceğiz, önce bir Assembly'leri tek tek yükleyelim.

**[VB]**

        <span style="color: blue;">Dim</span> GorselAssembly <span
style="color: blue;">As</span> System.Reflection.Assembly = <span
style="color: blue;">Nothing</span>

 

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> BirAssembly <span
style="color: blue;">As</span> AssemblyPart <span
style="color: blue;">In</span> Dagitim.Parts

            <span style="color: blue;">Dim</span> AssemblyDLLAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= BirAssembly.Source

            <span style="color: blue;">Dim</span> StreamBilgi <span
style="color: blue;">As</span> Windows.Resources.StreamResourceInfo =
Application.GetResourceStream(<span style="color: blue;">New</span>
Windows.Resources.StreamResourceInfo(e.Result, <span
style="color: #a31515;">"application/binary"</span>), <span
style="color: blue;">New</span> Uri(AssemblyDLLAdi, UriKind.Relative))

 

            <span style="color: blue;">If</span> AssemblyDLLAdi = <span
style="color: #a31515;">"SilverlightRemote.dll"</span> <span
style="color: blue;">Then</span>

                GorselAssembly = BirAssembly.Load(StreamBilgi.Stream)

            <span style="color: blue;">Else</span>

                BirAssembly.Load(StreamBilgi.Stream)

            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">Next</span>

**[C\#]**

            System.Reflection.<span
style="color: #2b91af;">Assembly</span> GorselAssembly = <span
style="color: blue;">null</span>;

 

            <span style="color: blue;">foreach</span> (<span
style="color: #2b91af;">AssemblyPart</span> BirAssembly <span
style="color: blue;">in</span> Dagitim.Parts)

            {

                <span style="color: blue;">string</span> AssemblyDLLAdi
= BirAssembly.Source;

                System.Windows.Resources.<span
style="color: #2b91af;">StreamResourceInfo</span> StreamBilgi = <span
style="color: #2b91af;">Application</span>.GetResourceStream(<span
style="color: blue;">new</span> System.Windows.Resources.<span
style="color: #2b91af;">StreamResourceInfo</span>(e.Result, <span
style="color: #a31515;">"application/binary"</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(AssemblyDLLAdi, <span
style="color: #2b91af;">UriKind</span>.Relative));

 

                <span style="color: blue;">if</span> (AssemblyDLLAdi ==
<span style="color: #a31515;">"SilverlightRemote.dll"</span>)

                {

                    GorselAssembly =
BirAssembly.Load(StreamBilgi.Stream);

                }

                <span style="color: blue;">else</span>

                {

                    BirAssembly.Load(StreamBilgi.Stream);

                }

            }

Satır satır yukarıdaki kodumuzu inceleyelim. İlk satırda **Assembly**
tipinde bir değişken yaratıyoruz. Bu değişken gerektiğinde bizim
uzaktaki uygulama içerisinde görsel arayüzü tanımlayan **Page**
sınıfının bulunduğu DLL'in referansını taşıyacak. Sonrasında hemen
**Deployment** nesnemiz olan **Dagitim'ın** **Parts** dizisinde bir
**ForEach** döngüsü başlatarak tüm Assembly'leri gezmeye başlıyoruz. Her
Assembly'nin **Source'unu** yani tam DLL dosyasının adını alarak bu
dosyaları tek tek **StreamBilgi** adındaki değişkenimize yüklüyoruz. XAP
dosyası içerisinden DLL'leri alırken aynı **AppManifest.Xaml**'ı
alırkenki tekniği kullanıyoruz. Son olarak hemen o an için üzerinde
çalıştığımız Assembly'nin görsel arayüzümüzün bulunduğu Assembly olup
olmadığını kontrole diyoruz. Bunun için doğrudan Assembly'e ait DLL
adını karşılaştırıyoruz.

Burada hemen bir dipnot geçelim. Bir Silverlight uygulaması içerisinde
harici kontrolleri içeren veya farklı sınıfları ve kodları barındıran
DLL'ler bulunabilir. Bunların haricinde bir de her XAML (görsel) dosya
arkasındaki UserControl tipindeki sınıflar vardır. Biz yukarıdaki
kodumuzda içerisinde UserControl bulunan DLL'i ayırarak bir kenara
referansını kaydediyoruz çünkü bu UserControl'ları sahneye almamız
gerekiyor. Oysa diğer Assembly'leri kullanabilmek için sadece belleğe
yüklememiz yeterli.

IF koşulumuz içerisinde gerekli kontrolleri de yaptıktan sonra normal
Assembly'leri Load metodu ile Stream'ini vererek belleğe yüklerken
içerisinde UserControl'lerimizin bulunduğu Assembly'i yüklerken
**GorselAsssembly** değişkenine de bir referansını alıyoruz.

**[VB]**

        <span style="color: blue;">Dim</span> Arayuz <span
style="color: blue;">As</span> UIElement = <span
style="color: blue;">CType</span>(GorselAssembly.CreateInstance(<span
style="color: #a31515;">"SilverlightRemote.Page"</span>), UIElement)

        LayoutRoot.Children.Add(Arayuz)

**[C\#]**

            <span style="color: #2b91af;">UIElement</span> Arayuz =
GorselAssembly.CreateInstance(<span
style="color: #a31515;">"SilverlightRemote.Page"</span>) <span
style="color: blue;">as</span> <span
style="color: #2b91af;">UIElement</span>;

            <span
style="color: blue;">this</span>.LayoutRoot.Children.Add(Arayuz);

Sıra geldi **GorselAssembly** içerisindeki ana UserControl'ümüz olan
**Page** sınıfından bir instance olarak sahneye yerleştirmeye. Bunun
için Assembly'nin **CreateInstance** metoduna sınıfımızın tam yolunu
vererek bir kopyasını alıyor ve **UIElement** tipine cast ediyoruz.
Sonrasında da elimizdeki nesneyi uygulamamızdaki StackPanel içerisine
ekliyoruz.

Artık uygulamamızı çalıştırabiliriz. İlk Silverlight uygulaması
istemciye yüklendikten sonra düğmeye bastığınızda ikinci uygulama
sunucudan alınarak içerisinde UserControl sahneye yerleştirilecektir.
Böylece rahatlıkla bir Silverlight projesini parçalar şeklinde
geliştirebilir ve uygulamanın bölümlerini gerektikçe istemci tarafına
aktarabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-7-2 tarihinde yayinlanmistir.*
