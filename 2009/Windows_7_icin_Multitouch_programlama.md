---
FallbackID: 2389
Title: Windows 7 için Multitouch programlama.
PublishDate: 14/8/2009
EntryID: Windows_7_icin_Multitouch_programlama
IsActive: True
Section: software
MinutesSpent: 0
Tags: MultiTouch, Windows 7, WPF
old.EntryID: 26e059f5-c044-4e70-aa01-b2bea2dc7afe
---
Windows 7 ile beraber gelen Multitouch desteği bugünlerde çok yeni
donanımlar ile daha da hayatımızın içine giriyor. Artık birden çok
dokunma noktasını destekleyen ekranlar dizüstü bilgisayarlara kadar
girdi ve Windows 7'nin yardımı ile donanımdan bağımsız olarak Windows7
API'lerini kullanarak Multitouch desteğine sahip uygulamalar yazabilir
durumdayız. Bu yazımızda Multitouch dünyasına bir giriş yaparak
Multitouch uygulama geliştirirken Windows7 API'lerini nasıl
kullanabileceğimize göz atacağız.

Windows7 ile beraber gelen Multitouch API'lerine ait managed
wrapper'ları aşağıdaki adresten bilgisayarınıza indirebilirsiniz.
İndirme işlemi sonrası paket içerisinden **Windows7.Multitouch.dll** ve
**Windows7.Multitouch.WPF.dll** dosyalarını yeni yaratacağımız bir WPF
uygulamasına referans alarak hemen Multitouch programlamaya geçebiliriz.

<http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=WindowsTouch&DownloadId=5038>

**Donanım desteği var mı?**

DLL'lerimizi referans aldığımıza göre uygulamamızı yazmaya başlamadan
önce ilk yapmamız gereken uygulamanın çalışacağı hedef bilgisayarda
Multitouch donanım var mı, yok mu sorusuna bir cevap bulmak. Belki de
Multitouch donanım yoksa programımızı çalıştırmanın hiçbir anlamı
kalmayacaktır o nedenle kullanıcılara uygun bir uyarı vererek
programımızın Multitouch donanım gerektirdiğini söyleyebiliriz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span>
Windows7.Multitouch.TouchHandler.DigitizerCapabilities.IsMultiTouchReady
<span style="color: blue;">Then</span>

            MsgBox(<span style="color: #a31515;">"Multitouch
yok!"</span>)

            Environment.Exit(1)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Window1()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Window1\_Loaded);

        }

 

        <span style="color: blue;">void</span> Window1\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: blue;">if</span>
(!Windows7.Multitouch.<span
style="color: #2b91af;">TouchHandler</span>.<span
style="color: #2b91af;">DigitizerCapabilities</span>.IsMultiTouchReady)
{

                <span
style="color: #2b91af;">MessageBox</span>.Show(<span
style="color: #a31515;">"Multitouch yok!"</span>);

                <span
style="color: #2b91af;">Environment</span>.Exit(1);

            }

        }

Hemen referans aldığımız Assembly'lerden birindeki **IsMultiTouchReady**
propertysine göz atarak eğer geriye **False** dönüyorsa kullanıcıya
uygun mesajı gösterip programımızı kapatıyoruz. Bu kadarını yaptıktan
sonra uygulamamızın Multitouch dokunuşlarını algılayabilmesi için
gerekli Stylus Event'larını da geçerli hale getirmek için aşağıdaki kodu
hemen uygulamanın Multitouch kullanacak olan penceresinin **Loaded**
event listener'ına ekliyoruz.

**[VB]**

        Windows7.Multitouch.WPF.Factory.EnableStylusEvents(<span
style="color: blue;">Me</span>)

EnableStylusEvents derken parametre olarak eventların yaratılacağı
**Window** nesnesi isteniyor biz de kendi elimizdeki ana pencereyi
kendisine aktarıyoruz. Bu noktadan sonra artık her dokunuş (Stylus) ile
ilgili eventları yakalayabiliriz. Şimdilik bu örneğimizde kullanacağımız
event'ın adı **StylusMove** olacak. Amacımız kullanıcıların uygulamamız
üzerinde herhangi bir parmaklarını gezdirdikçe arkada bir iz
bırakıyormuş gibi çizgi çizdirmek. Böylece kullanıcıların birden çok
parmak kullanarak aynı anda birden fazla çizgi çizebilecekler.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_StylusMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.StylusEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.StylusMove

      <span style="color: gray">  </span> <span
style="color: gray;">Dim</span><span style="color: gray"> Daire </span>
<span style="color: gray;">As</span> <span
style="color: gray;">New</span><span style="color: gray"> Ellipse</span>

<span style="color: gray">        Daire.Fill = </span> <span
style="color: gray;">New</span><span style="color: gray">
SolidColorBrush(Colors.Red)</span>

        Daire.Height = 10

        Daire.Width = 10

        Daire.HorizontalAlignment = Windows.HorizontalAlignment.Left

        Daire.VerticalAlignment = Windows.VerticalAlignment.Top

        Daire.Margin = <span style="color: blue;">New</span>
Thickness(e.GetPosition(<span style="color: blue;">Me</span>).X,
e.GetPosition(<span style="color: blue;">Me</span>).Y, 0, 0)

       <span style="color: gray"> </span> <span
style="color: gray;">Me</span><span
style="color: gray">.Root.Children.Add(Daire)</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Window1\_StylusMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">StylusEventArgs</span> e)

        {

<span style="color: #808080">            </span> <span
style="color: #808080;">Ellipse</span><span style="color: #808080">
Daire = </span> <span style="color: #808080;">new</span> <span
style="color: #808080;">Ellipse</span><span
style="color: #808080">();</span>

<span style="color: #808080">            Daire.Fill = </span> <span
style="color: #808080;">new</span> <span
style="color: #808080;">SolidColorBrush</span>(<span
style="color: #808080;">Colors</span><span
style="color: #808080">.Red);</span>

            Daire.Height = 10;

            Daire.Width = 10;

<span style="color: #808080">            Daire.HorizontalAlignment =
</span> <span style="color: #808080;">HorizontalAlignment</span><span
style="color: #808080">.Left;</span>

<span style="color: #808080">            Daire.VerticalAlignment =
</span> <span style="color: #808080;">VerticalAlignment</span><span
style="color: #808080">.Top;</span>

            Daire.Margin = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Thickness</span>(e.GetPosition(<span
style="color: blue;">this</span>).X, e.GetPosition(<span
style="color: blue;">this</span>).Y, 0, 0);

<span style="color: gray">            </span> <span
style="color: gray;">this</span><span
style="color: gray">.Root.Children.Add(Daire);</span>

        }

Yukarıdaki kod içerisinde konumuzla ilgisiz olan kodları gri renkte
yazdım. Geri kalan kısma bakarsak aslında yaptığımız şey **StylusMove**
eventını yakalayarak bir **Ellipse** nesnesi yaratıp onun da pozisyonunu
ayarlamak. Bu event her **Stylus** için çalışacağı için basit bir
şekilde o anda gelen Stylus'ın pozisyonunu alarak elimizde yeni
yarattığımız **Ellipse'e** set ediyoruz. İşte bu kadar! Aynı normal bir
fare imlecinin pozisyonunu yakalamak gibi.

Eğer burada konuyu biraz daha ilerleterek StylusMove'da o anki
parmakları birbirinden ayırt edip farklı renklerde daireler koymak
isterseniz tabi ki bu da mümkün. Fakat o noktada ufak bir uyarıda
bulunmam gerek. Birincisi ekrana tıklayan parmakları aslında tanıma
şansımız yok. Yani şu anda dokunan parmak ile biraz sonra dokunan parmak
aynı mı yoksa değil mi hiçbir zaman bilemeyiz. Aynı şekilde ekrana o
anda dokunmakta olan bir parmak varsa ikinci gelen parmağın sadece
ikinci olduğunu algılayabiliriz. Sonrasında o ikinci parmak gibip başka
bir ikinci parmak gelirse bu ikisinin de aynı olup olmadığını hiçbir
zaman bilemeyiz. O nedenle konunun özüne dönersek bizim kodumuzun
algılayabileceği şey ancak ekrana tıklayan parmakların kaçıncı dokunan
parmak oldukları. Bu çerçevede StylusMove gibi Stylus eventların da
birer **StylusID** gönderiliyor.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_StylusMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.StylusEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.StylusMove

      <span style="color: gray">  </span> <span
style="color: gray;">Dim</span><span style="color: gray"> Daire </span>
<span style="color: gray;">As</span> <span
style="color: gray;">New</span><span style="color: gray"> Ellipse</span>

        <span style="color: blue;">If</span> e.StylusDevice.Id = 10
<span style="color: blue;">Then</span>

            Daire.Fill = <span style="color: blue;">New</span>
SolidColorBrush(Colors.Red)

        <span style="color: blue;">Else</span>

            Daire.Fill = <span style="color: blue;">New</span>
SolidColorBrush(Colors.Green)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

       <span style="color: gray"> Daire.Height = 10</span>

        Daire.Width = 10

        Daire.HorizontalAlignment = Windows.HorizontalAlignment.Left

        Daire.VerticalAlignment = Windows.VerticalAlignment.Top

<span style="color: gray">        Daire.Margin = </span> <span
style="color: gray;">New</span><span style="color: gray">
Thickness(e.GetPosition(</span><span style="color: gray;">Me</span><span
style="color: gray">).X, e.GetPosition(</span><span
style="color: gray;">Me</span><span style="color: gray">).Y, 0,
0)</span>

<span style="color: gray">        </span> <span
style="color: gray;">Me</span><span
style="color: gray">.Root.Children.Add(Daire)</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Window1\_StylusMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">StylusEventArgs</span> e)

        {

<span style="color: #808080">            </span> <span
style="color: #808080;">Ellipse</span><span style="color: #808080">
Daire = </span> <span style="color: #808080;">new</span> <span
style="color: #808080;">Ellipse</span><span
style="color: #808080">();</span>

            <span style="color: blue;">if</span> (e.StylusDevice.Id ==
10)

            {

                Daire.Fill = <span style="color: blue;">new</span> <span
style="color: #2b91af;">SolidColorBrush</span>(<span
style="color: #2b91af;">Colors</span>.Red);

            }

            <span style="color: blue;">else</span>

            {

                Daire.Fill = <span style="color: blue;">new</span> <span
style="color: #2b91af;">SolidColorBrush</span>(<span
style="color: #2b91af;">Colors</span>.Green);

            }

            Daire.Height = 10;

            Daire.Width = 10;

<span style="color: #808080">            Daire.HorizontalAlignment =
</span> <span style="color: #808080;">HorizontalAlignment</span><span
style="color: #808080">.Left;</span>

<span style="color: #808080">            Daire.VerticalAlignment =
</span> <span style="color: #808080;">VerticalAlignment</span><span
style="color: #808080">.Top;</span>

<span style="color: #808080">            Daire.Margin = </span> <span
style="color: #808080;">new</span> <span
style="color: #808080;">Thickness</span><span
style="color: #808080">(e.GetPosition(</span><span
style="color: #808080;">this</span><span style="color: #808080">).X,
e.GetPosition(</span><span style="color: #808080;">this</span><span
style="color: #808080">).Y, 0, 0);</span>

<span style="color: #808080">            </span> <span
style="color: #808080;">this</span><span
style="color: #808080">.Root.Children.Add(Daire);</span>

        }

Yukarıda görebileceğiniz şekilde Stylus eventlarımıza gelen argümanlar
üzerinden **StylusDevice'a** ve onun **ID'sine** ulaşabiliyoruz. Bu
noktada ID'ler 10'dan başlıyor ve aynı anda dokunan her parmak için
birer artarak devam ediyor. Bizim basit örneğimizde her zaman ilk
dokunan parmak için kırmızı daireler koyarken ikinci dokunan parmak için
de yeşil daireler koyarak bu her iki parmağı ayrı ayrı
algılayabildiğimizi görebiliyoruz.

**Manipulation İşlemleri**

Bir sonraki aşamada birden çok dokunma noktası ile yapılabilen
manipülasyon işlemleri göz atacağız. Bu çerçevede en tanıdık örnek bir
ekranda var olan resmin kullanıcının iki parmağı ile tekrar
boyutlandırılabiliyor, yer değiştiriyor ve döndürülebiliyor olması. Tüm
bunlar için artık elimizde her dokunuş koordinatlarının olduğunu
düşünürsek geriye sadece gerekli hesaplamaları yaparak ekrandaki bir
resme veya farklı bir nesneye sonucu yansıtmak kalıyor. Fakat merak
etmeyin, o hesaplamaları da bizim yapmamıza gerek yok. Bunun yerine
Managed Wrapper'lar ile beraber gelen ManipulationProcessor sınıfıdan
faydalanabiliriz.

Yeni bir WPF projesi yarattıktan sonra gerekli DLL'lerimizi de referans
alarak sonrasında hemen projemize bir resim dosyası ekleyelim. Bu arada
bir sonraki adımda ihtiyacımız olacağı için System.Drawing assemblysini
de projeye referans olarak eklemeyi unutmayın. Projeye eklediğimiz resmi
göstermesi için XAML tarafına da bir **Image** nesnesi koymayı
unutmayalım. Tabi bu **Image** nesnesini yerine göre tekrar
boyutlandıracağımız, ekrandaki yerini değiştireceğimiz veya belirli bir
açıya göre döndüreceğimiz için **Image** nesnesinin içine de gerekli
Transform objelerini şimdiden koymakta fayda var.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="Window1"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Title</span><span
style="color: blue;">="Window1"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Source</span><span style="color: blue;">="Koala.jpg" <span
style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">="0.5, 0.5"</span>\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="**Konum**"
/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RotateTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="**Aci**"
/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="**Boyut**"
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

Transform nesnelerine kod tarafından rahat ulaşabilelim diye şimdiden
yukarıdaki gibi birer isim verebiliriz. Sıra geldi arka tarafta
yazacağımız kodlara. Her zamanki gibi ilk olarak Stylus event'larını
Enable edelim ve bu sefer StylusMove, StylusDown ve StylusUp
eventlarının hepsini de yakalayalım. Bizim tüm manipülasyon işlemlerini
yapacak olan nesneyi de yaratarak gerekli tüm eventlarda bilgileri
hesaplama için kendisine aktarmamız gerekecek.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Windows7.Multitouch.WPF.Factory.EnableStylusEvents(<span
style="color: blue;">Me</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">WithEvents</span> ManiProc <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Windows7.Multitouch.Manipulation.ManipulationProcessor(Windows7.Multitouch.Manipulation.ProcessorManipulations.**ALL**)

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Window1\_Loaded(<span
style="color: blue;">object</span> sender, System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            Windows7.Multitouch.WPF.<span
style="color: #2b91af;">Factory</span>.EnableStylusEvents(<span
style="color: blue;">this</span>);

        }

 

        Windows7.Multitouch.Manipulation.<span
style="color: #2b91af;">ManipulationProcessor</span> ManiProc = <span
style="color: blue;">new</span> Windows7.Multitouch.Manipulation.<span
style="color: #2b91af;">ManipulationProcessor</span>(Windows7.Multitouch.Manipulation.<span
style="color: #2b91af;">ProcessorManipulations</span>.**ALL**);

**ManipulationProcessor** nesnemizi yaratırken parametre olan bir
**Enum** alıyor ve söz konusu Enumaration içerisindeki seçeneklerimiz
bizim ne tür manipülasyon hesaplaması istediğimizi belirtiyor. Sadece
tekrar boyutlandırma veya sadece döndürme ile ilgili manipülasyonlar da
isteyebiliriz. Bizim örneğimizde tüm manipülasyonları kullanacağımız
için **ALL** diyerek devam ediyoruz. Sıra geldi daha önce yakaladığımız
Stylus eventlarında gerekli datayı alıp **ManipulationProcessor** 'a
aktarmaya.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_StylusDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.StylusDownEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.StylusDown

        ManiProc.ProcessDown(e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">Me</span>).ToDrawingPointF())

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_StylusMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.StylusEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.StylusMove

        ManiProc.ProcessMove(e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">Me</span>).ToDrawingPointF())

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_StylusUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.StylusEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.StylusUp

        ManiProc.ProcessUp(e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">Me</span>).ToDrawingPointF())

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Window1\_StylusDown(<span
style="color: blue;">object</span> sender, System.Windows.Input.<span
style="color: #2b91af;">StylusDownEventArgs</span> e)

        {

            ManiProc.ProcessDown((<span
style="color: blue;">uint</span>)e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">this</span>).ToDrawingPointF());

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Window1\_StylusMove(<span
style="color: blue;">object</span> sender, System.Windows.Input.<span
style="color: #2b91af;">StylusEventArgs</span> e)

        {

            ManiProc.ProcessMove((<span
style="color: blue;">uint</span>)e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">this</span>).ToDrawingPointF());

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Window1\_StylusUp(<span
style="color: blue;">object</span> sender, System.Windows.Input.<span
style="color: #2b91af;">StylusEventArgs</span> e)

        {

            ManiProc.ProcessUp((<span
style="color: blue;">uint</span>)e.StylusDevice.Id, e.GetPosition(<span
style="color: blue;">this</span>).ToDrawingPointF());

        }

Yukarıdaki kodda da görebileceğiniz üzere aslında bizim yaptığımız
birşey yok. Gelen **StylusID** ile pozisyonu doğrudan Processor'ımıza
aktarıyoruz. Processor hesaplamaları tamamladıktan sonra kendine özel
ayrı bir event çalıştırarak bize sonucu aktaracak.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ManiProc\_ManipulationDelta(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
Windows7.Multitouch.Manipulation.ManipulationDeltaEventArgs) <span
style="color: blue;">Handles</span> ManiProc.ManipulationDelta

        Konum.X += e.TranslationDelta.Width

        Konum.Y += e.TranslationDelta.Height

 

        Aci.Angle += e.RotationDelta \* 180 / Math.PI

 

        Boyut.ScaleX \*= e.ScaleDelta

        Boyut.ScaleY \*= e.ScaleDelta

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> ManiProc\_ManipulationDelta(<span
style="color: blue;">object</span> sender,
Windows7.Multitouch.Manipulation.<span
style="color: #2b91af;">ManipulationDeltaEventArgs</span> e)

        {

            Konum.X += e.TranslationDelta.Width;

            Konum.Y += e.TranslationDelta.Height;

 

            Aci.Angle += e.RotationDelta \* 180 / <span
style="color: #2b91af;">Math</span>.PI;

 

            Boyut.ScaleX \*= e.ScaleDelta;

            Boyut.ScaleY \*= e.ScaleDelta;

        }

İşte geldik en can alıcı noktaya. Processor'ımızın **ManipulationDelta**
event'ı çalıştığında artık gerekli hesaplamalar yapılmış demektir.
Geriye kalıyor hesaplamaları uygun şekilde ekrandaki resmimize
yansıtmak. Bunun için zaten daha önce resmimize ait Transform
nesnelerine özel isimler vermiştik. Bu durumda eldeki Delta değerlerini
doğrudan uygun Transform nesnelerinin özelliklerine ekleyebiliriz.

Uygulamamız bitti. Artık programı çalıştırarak iki parmağınız ile
rahatlıkla resmi tutup sürükleyebilir veya boyutlandırabilir,
döndürebilirsiniz. Herşey bu kadar basit.

Hepinize kolay gelsin.

[Örneklere ait kaynak kodları - 13082009\_1.rar (1,59
MB)](media/Windows_7_icin_Multitouch_programlama/13082009_1.rar)


