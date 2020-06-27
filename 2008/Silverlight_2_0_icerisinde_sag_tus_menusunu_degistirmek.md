---
FallbackID: 2113
Title: "Silverlight 2.0 içerisinde sağ tuş menüsünü değiştirmek."
date: "2008-7-5"
EntryID: Silverlight_2_0_icerisinde_sag_tus_menusunu_degistirmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 1e3d3365-05eb-4346-9df8-392e3554b28f
---
# Silverlight 2.0 içerisinde sağ tuş menüsünü değiştirmek.
Silverlight uygulamalarında sağ tuş uygulamaya tıkladığımızda karşımıza
Silverlight'a ait özel "Silverlight Configuration" menüsü gelir. Bu
menüden kullanıcıların Silverlight uygulaması ile ilgili ayarları
yapabilecekleri bir arayüze ulaşılır. Fakat bazı durumlarda farenin sağ
tuşunu biz de kullanmak isteyebiliriz. Bu ister global anlamda tüm
sayfayı kapsayacak şekilde olsun ister belirli Silverlight kontrolleri
için olsun istersek sağ tuş ile gelen menüyü değiştirme şansımız var.

**Menümüzü ve animasyonları hazırlayalım.**

Silverlight uygulamamızda sağ tuş ile tıklandığında gösterilmek üzere
hızlıca bir menü hazırlayalım. Menümüzde birden çok düğme bulunacak.
Düğmeleri dikey olarak sahnede sıralamak için Menu'ye ait kök element
olarak bir StackPanel kullanacağız.

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span style="color: red;">
Height</span><span style="color: blue;">="248"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="160"</span><span style="color: red;">
Background</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Menu1"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="24"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="48"</span><span style="color: red;">
Opacity</span><span style="color: blue;">="0"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu içerisinde **Menu1** adında bir StackPanel
bulunuyor. StackPanel içerisinde tüm düğmeler dikey olarak hizalanacak.
Bu StackPanel'i duruma göre sahnede gösterecek veya saklayacak olan
animasyonlarımızı da hazırlayalım. Animasyonlar basit bir şekilde
StackPanel'in **Opacity** özelliğini değiştirecekler.

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**MenuGel**"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Menu1**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Opacity)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="1"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**MenuGit**"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Menu1**"</span><span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Opacity)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

**Sıra kodlamada...**

Uygulayacağımız taktik aslında çok basit; Silverlight uygulamasının
içerisinde bulunduğu sayfanın **oncontextmenu** event'ını yakalayarak
normal çalışma şeklini iptal edip menü gösterme işlemini biz
üstleneceğiz. İlk olarak söz konusu event'ı uygulama açılışında
yakalayalım.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

        System.Windows.Browser.HtmlPage.Document.AttachEvent(<span
style="color: #a31515;">"oncontextmenu"</span>, <span
style="color: blue;">AddressOf</span> SagTus)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.AttachEvent(<span
style="color: #a31515;">"oncontextmenu"</span>, SagTus);

            <span
style="color: blue;">this</span>.MouseLeftButtonDown += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseButtonEventHandler</span>(Page\_MouseLeftButtonDown);

        }

Kodumuz içerisindeki **SagTus** adındaki event-handlerımızı da hemen
yazalım.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> SagTus(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> args <span
style="color: blue;">As</span> Browser.HtmlEventArgs)

        Menu1.SetValue(Canvas.LeftProperty, <span
style="color: blue;">CDbl</span>(args.OffsetX))

        Menu1.SetValue(Canvas.TopProperty, <span
style="color: blue;">CDbl</span>(args.OffsetY))

        MenuGel.Begin()

        args.PreventDefault()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> SagTus(<span
style="color: blue;">object</span> sender, System.Windows.Browser.<span
style="color: #2b91af;">HtmlEventArgs</span> args)

        {

            Menu1.SetValue(<span
style="color: #2b91af;">Canvas</span>.LeftProperty, (<span
style="color: blue;">double</span>)args.OffsetX);

            Menu1.SetValue(<span
style="color: #2b91af;">Canvas</span>.TopProperty, (<span
style="color: blue;">double</span>)args.OffsetY);

            MenuGel.Begin();

            args.PreventDefault();

        }

Kodumuzda ilk olarak **args** üzerinden farenin konumuzu alıyoruz ve söz
konusu konuma **Menu1** adındaki StackPanel'imizi taşıyoruz. Bizim
örneğimizdeki Silverlight uygulamasının kök elementi bir Canvas olduğu
için taşıma işlemini StackPanel'in **Canvas.Left** ve **Canvas.Top**
özelliklerini değiştirerek halledebiliriz. Bir sonraki adımda menüyü
görünür hale getirecek olan **MenuGel** animasyonunu çalıştırıp,
**args** üzerinden **PreventDefault** metodunu çalıştırarak söz konusu
event-handler'ın tarayıcı tarafından değerlendirilmesini engelliyoruz.
Böylece tarayıcı bu event çalıştığında herhangi bir menü göstermeyecek.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonDown

        MenuGit.Begin()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
Page\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseButtonEventArgs</span> e)

        {

            MenuGit.Begin();

        }

Son olarak uygulamanın herhangi bir yerine tıklandığında menüyü
saklayacak olan MenuGit animasyonunu çalıştırıyoruz. Böylece istediğimiz
gibi sağ tuş ile gelecek olan menüyü ayarlayabilir, tasarımını
değiştirebiliriz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-7-5 tarihinde yayinlanmistir.*
