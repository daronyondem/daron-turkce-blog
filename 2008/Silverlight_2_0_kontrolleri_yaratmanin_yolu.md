---
FallbackID: 2114
Title: "Silverlight 2.0 kontrolleri yaratmanın yolu."
date: "2008-7-6"
EntryID: Silverlight_2_0_kontrolleri_yaratmanin_yolu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: e17f6d54-d4a5-4cc8-84cf-f00bf27fcb8f
---
Silverlight 2.0 içerisinde kullandığımız standart kontrollerin yanı sıra
istersek kendi kontrollerimizi de hazırlama şansımız var. Daha önceleri
ister ASP.NET ister Windows uygulamalarından alışık olduğumuz bu
uygulama ile hazırladığınız size özel kontrolleri farklı projelerde
rahatlıkla kullanma şansına sahip olabilirsiniz. Bu yazımızda deneme
amaçlı olarak Silverlight 2.0 ile beraber gelen Button kontrolünü baz
alıp geliştirerek yeni bir kontrol oluşturacağız. Yaratacağımız yeni
**TimeOutButton** kontrolü kullanıcından bir **TimeOut** değeri alacak.
Milisaniye cinsinden verilen bu süre sonunda Button kullanılamaz hale
gelecek. Bu esnada Button'un üzerinde sürekli kaç saniye kaldığı da
yazılacak. Kullanıcıların belirli bir sürede bir işlemi tamamlamasını
istiyorsanız bu gibi bir Button işinizi görebilir. Gelin hemen işe
koyulalım.

**Çalışma ortamımızı hazırlayalım.**

Kontrolümüzü geliştirirken sürekli test etmek isteyeceğiz. O nedenle ilk
olarak sağlıklı bir çalışma ortamı hazırlamamız lazım. Yeni bir
Silverlight projesi yarattığınızda Visual Studio içerisinde Solution
içinde bir ASP.NET ve bir de Silverlight projeniz bulunur. Solution
dosyasına bir proje daha ekleyeceğiz. Solution Explorer içerisinde
solution dosyasına sağ tuş ile tıkladıktan sonra "Add / New Project"
diyerek "**Silverlight Class Library**" seçeneğini işaretlemeniz yeterli
olacaktır. Böylece yeni kontrolümüzü oluşturmak için kodlarımızı
yazacağımız ortamı geliştirdik.

Solution'ı Compile ettiğimizde Silverlight projemize otomatik olarak bu
kontrol projemizin de eklenmesi gerekiyor. O nedenle hemen Silverlight
projesine sağ tuş ile tıklayarak gelen menüden "Add Reference" komutunu
verin ve karşınıza gelen pencereden de "Projects" tabına geçerek Class
Library projenizi seçin. Böylece artık F5'e bastığınızda her şey
otomatik olarak yapılacaktır ve kontrolünüzü kullanılır şekilde
inceleyebileceksiniz. Tabi testlere geçmeden önce biraz kod yazmamız
gerekiyor ;)

**Kontrolümüzü hazırlayalım.**

Class Library içerisinde kod dosyamızda düğmemizin adını taşıyan bir
Class bulunuyor. Bu Class'ı biz örneğimizde standart Silverlight Button
kontrolünden inherit edeceğiz. Böylece yeni ve gelişmiş bir Button
yaratırken her şeye sıfırdan başlamayacağız, Silverlight içerisinde
hazır Button kontrolünü alarak üzerine yeni işlevsellikler ekleyeceğiz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> TimeOutButton

    <span style="color: blue;">Inherits</span> **Button**

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> TimeOutBtn

{

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">TimeOutButton</span> : <span
style="color: #2b91af;"> **Button**</span>

    {

       

    }

}

Bir sonraki adımda hemen kontrolümüze yeni bir Property tanımlayalım.
Property'miz sayesinde kullanıcıların düğmenin ne kadar süre aktif
kalacağını tanımlayabilecekler.

**[VB]**

    <span style="color: blue;">Private</span> PTimeOut <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> TimeOut() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PTimeOut

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

            PTimeOut = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

**[C\#]**

        <span style="color: blue;">public</span> <span
style="color: blue;">int</span> TimeOut { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

Düğmemiz ilk olarak sayfada gözüktüğünde hemen işlemlere başlamamız
gerekiyor. İlk olarak düğmenin için sayaç bilgisi yazacak yeni bir
kontrol eklememiz şart. Düğmenin **Content** özelliği duruma göre
doğrudan bir String olabilir veya Content içerisinde farklı Silverlight
nesneleri bulunabilir. Tüm bunları göz önünde bulundurmak zorundayız.

**[VB]**

        <span style="color: blue;">Dim</span> **Container** <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
**StackPanel**

        Container.Orientation = Orientation.Vertical

        Container.HorizontalAlignment =
Windows.HorizontalAlignment.Center

        Container.VerticalAlignment = Windows.VerticalAlignment.Center

 

        <span style="color: blue;">If</span> <span
style="color: blue;">Me</span>.Content.GetType() <span
style="color: blue;">Is</span> System.Type.GetType(<span
style="color: #a31515;">"System.String"</span>) <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> TextBl <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TextBlock

            TextBl.Text = <span style="color: blue;">Me</span>.Content

            Container.Children.Add(TextBl)

        <span style="color: blue;">Else</span>

            Container.Children.Add(<span
style="color: blue;">Me</span>.Content)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        Container.Children.Add(MyBox)

        <span style="color: blue;">Me</span>.Content = Container

**[C\#]**

            <span style="color: #2b91af;">StackPanel</span> Container =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">StackPanel</span>();

            Container.Orientation = <span
style="color: #2b91af;">Orientation</span>.Vertical;

            Container.HorizontalAlignment = System.Windows.<span
style="color: #2b91af;">HorizontalAlignment</span>.Center;

            Container.VerticalAlignment = System.Windows.<span
style="color: #2b91af;">VerticalAlignment</span>.Center;

 

            <span style="color: blue;">if</span> (<span
style="color: blue;">object</span>.ReferenceEquals(<span
style="color: blue;">this</span>.Content.GetType(), System.<span
style="color: #2b91af;">Type</span>.GetType(<span
style="color: #a31515;">"System.String"</span>))) {

                <span style="color: #2b91af;">TextBlock</span> TextBl =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">TextBlock</span>();

                TextBl.Text = <span
style="color: blue;">this</span>.Content.ToString();

                Container.Children.Add(TextBl);

            }

            <span style="color: blue;">else</span> {

                Container.Children.Add(<span
style="color: blue;">this</span>.Content <span
style="color: blue;">as</span> <span
style="color: #2b91af;">UIElement</span>);

            }

            Container.Children.Add(MyBox);

            <span style="color: blue;">this</span>.Content = Container;

Kodumuz içerisinde ilk olarak bir StackPanel yaratıyoruz. StackPanel'in
özelliklerini ayarladıktan sonra hemen düğmemize atanmış Content'i
kontrol ediyoruz. Amacımız Content içerisinde her ne varsa hepsini
StackPanel içine eklemek. Sonrasında bizim kalan saniye miktarını
göstereceğimiz TextBlock'u da yine StackPanel içerisine ekleyerek
StackPanel'i de düğmenin Content'i yapacağız. Böylece bu TimeOutButton
kontrolünü kullananlar düğmenin Content'ine ne koyarlarsa koysunlar
kalan saniye miktarı sürekli bu Content'in içerisinde gösterilecek.

Eğer düğmeye atanmış Content String tipindeyse bu String'i alıp yeni bir
TextBlock yaratarak içerisine yerleştiriyoruz. TextBlock'umuzu da
StackPanel içine koyuyoruz. Eğer Content String değilse demek ki
kullanıcı düğmenin Content'ine bir Silverlight nesnesi koymuş. Bu
durumda söz konusu nesneyi alıp doğrudan StackPanel içine koyabiliriz.
Son olarak kodumuzda gözükmeyen fakat uygulamamızda global bir değişken
olarak yarattığımız MyBox adındaki TextBlock'u da StackPanel'e ekliyoruz
ve StackPanel'i de düğmenin Content'i yapıyoruz. MyBox kontrolünü global
yaratmamızın nedeni ileriki adımlarda MyBox'ın içeriğine sürekli kalan
saniye miktarını yazdıracak olmamız.

**[VB]**

    <span style="color: blue;">Dim</span> MyBox <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TextBlock

    <span style="color: blue;">WithEvents</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

**[C\#]**

        <span style="color: #2b91af;">TextBlock</span> MyBox = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">TextBlock</span>();

        System.Windows.Threading.<span
style="color: #2b91af;">DispatcherTimer</span> Timer = <span
style="color: blue;">new</span> System.Windows.Threading.<span
style="color: #2b91af;">DispatcherTimer</span>();

Global değişkenimiz arasında bir de **DispatcherTimer** bulunuyor. Bu
Timer ile kalan saniye miktarını sürekli hesaplayıp kontrol ederek
düğmenin içine yazdıracağız.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Timer\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Timer.Tick

        <span style="color: blue;">If</span> PTimeOut \<= 0 <span
style="color: blue;">Then</span>

            Timer.Stop()

            MyBox.Visibility = Windows.Visibility.Collapsed

            <span style="color: blue;">Me</span>.IsEnabled = <span
style="color: blue;">False</span>

        <span style="color: blue;">Else</span>

            PTimeOut -= 1000

            MyBox.Text = (PTimeOut / 1000).ToString  + <span
style="color: #a31515;">" saniye kaldı."</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Timer\_Tick(<span
style="color: blue;">object</span> sender, System.<span
style="color: #2b91af;">EventArgs</span> e)

        {

            <span style="color: blue;">if</span> (TimeOut \<= 0)

            {

                Timer.Stop();

                MyBox.Visibility = System.Windows.<span
style="color: #2b91af;">Visibility</span>.Collapsed;

                <span style="color: blue;">this</span>.IsEnabled = <span
style="color: blue;">false</span>;

            }

            <span style="color: blue;">else</span> {

                TimeOut -= 1000;

                MyBox.Text = (TimeOut / 1000).ToString() + <span
style="color: #a31515;">" saniye kaldı."</span>;

            }

        }

Kodumuzda kalan süreyi **PTimeOut** adındaki private değişkenimizde
saklayacağız. Eğer kalan süre sıfırın altında ise hemen Timer'ımızı
durduruyor ve kalan süreyi gösteren TextBlock'umuz olan MyBox'ı sahneden
kaldırıp düğmeyi de pasif hale getiriyoruz. Kalan süre sıfırdan büyük
olduğu sürece **MyBox** TextBlock içerisine gerekli uyarıyı yazdırıp
kalan süreyi Timer'ın Intervali kadar azaltıyoruz.

![Expression Blend içerisinde hazırladığımız yeni
kontrol.](media/Silverlight_2_0_kontrolleri_yaratmanin_yolu/05072008_1.png)\
*Expression Blend içerisinde hazırladığımız yeni kontrol*

Artık kontrolümüz hazır. Projemizi Blend ile açtığımızda Asset Library
içerisinde Custom Controls tabında kontrolümüzü görebiliyoruz. Sahneye
bir TimeOutButton ekleyip TimeOut özelliğini de ayarladıktan sonra
kontrolümüzü kullanabiliriz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication47.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">TimeOutBtn</span><span
style="color: blue;">="clr-namespace:TimeOutBtn;assembly=TimeOutBtn"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TimeOutBtn</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**TimeOutButton**</span><span
style="color: red;"> **TimeOut**</span><span
style="color: blue;">**="5000"**</span><span style="color: red;">
Height</span><span style="color: blue;">="72"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="56,48,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="128"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="TimeOutButton"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Hepinize kolay gelsin. Uygulamanın tam kodunu aşağıda
inceleyebilirsiniz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> TimeOutButton

    <span style="color: blue;">Inherits</span> Button

 

    <span style="color: blue;">Private</span> PTimeOut <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> TimeOut() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PTimeOut

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

            PTimeOut = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Dim</span> MyBox <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TextBlock

    <span style="color: blue;">WithEvents</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> TimeOutButton\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Container <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
StackPanel

        Container.Orientation = Orientation.Vertical

        Container.HorizontalAlignment =
Windows.HorizontalAlignment.Center

        Container.VerticalAlignment = Windows.VerticalAlignment.Center

 

        <span style="color: blue;">If</span> <span
style="color: blue;">Me</span>.Content.GetType() <span
style="color: blue;">Is</span> System.Type.GetType(<span
style="color: #a31515;">"System.String"</span>) <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> TextBl <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TextBlock

            TextBl.Text = <span style="color: blue;">Me</span>.Content

            Container.Children.Add(TextBl)

        <span style="color: blue;">Else</span>

            Container.Children.Add(<span
style="color: blue;">Me</span>.Content)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        Container.Children.Add(MyBox)

        <span style="color: blue;">Me</span>.Content = Container

        Timer.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 1)

        Timer.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Timer\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Timer.Tick

        <span style="color: blue;">If</span> PTimeOut \<= 0 <span
style="color: blue;">Then</span>

            Timer.Stop()

            MyBox.Visibility = Windows.Visibility.Collapsed

            <span style="color: blue;">Me</span>.IsEnabled = <span
style="color: blue;">False</span>

        <span style="color: blue;">Else</span>

            PTimeOut -= 1000

            MyBox.Text = (PTimeOut / 1000).ToString  + <span
style="color: #a31515;">" saniye kaldı."</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">using</span> System;

<span style="color: blue;">using</span> System.Net;

<span style="color: blue;">using</span> System.Windows;

<span style="color: blue;">using</span> System.Windows.Controls;

<span style="color: blue;">using</span> System.Windows.Documents;

<span style="color: blue;">using</span> System.Windows.Ink;

<span style="color: blue;">using</span> System.Windows.Input;

<span style="color: blue;">using</span> System.Windows.Media;

<span style="color: blue;">using</span> System.Windows.Media.Animation;

<span style="color: blue;">using</span> System.Windows.Shapes;

 

<span style="color: blue;">namespace</span> TimeOutBtn

{

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">TimeOutButton</span> : <span
style="color: #2b91af;">Button</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">int</span> TimeOut { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

 

        <span style="color: #2b91af;">TextBlock</span> MyBox = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">TextBlock</span>();

        System.Windows.Threading.<span
style="color: #2b91af;">DispatcherTimer</span> Timer = <span
style="color: blue;">new</span> System.Windows.Threading.<span
style="color: #2b91af;">DispatcherTimer</span>();

 

        <span style="color: blue;">public</span> TimeOutButton()

        {

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(TimeOutButton\_Loaded);

            Timer.Tick += <span style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>(Timer\_Tick);

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> TimeOutButton\_Loaded(<span
style="color: blue;">object</span> sender, System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: #2b91af;">StackPanel</span> Container =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">StackPanel</span>();

            Container.Orientation = <span
style="color: #2b91af;">Orientation</span>.Vertical;

            Container.HorizontalAlignment = System.Windows.<span
style="color: #2b91af;">HorizontalAlignment</span>.Center;

            Container.VerticalAlignment = System.Windows.<span
style="color: #2b91af;">VerticalAlignment</span>.Center;

 

            <span style="color: blue;">if</span> (<span
style="color: blue;">object</span>.ReferenceEquals(<span
style="color: blue;">this</span>.Content.GetType(), System.<span
style="color: #2b91af;">Type</span>.GetType(<span
style="color: #a31515;">"System.String"</span>))) {

                <span style="color: #2b91af;">TextBlock</span> TextBl =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">TextBlock</span>();

                TextBl.Text = <span
style="color: blue;">this</span>.Content.ToString();

                Container.Children.Add(TextBl);

            }

            <span style="color: blue;">else</span> {

                Container.Children.Add(<span
style="color: blue;">this</span>.Content <span
style="color: blue;">as</span> <span
style="color: #2b91af;">UIElement</span>);

            }

            Container.Children.Add(MyBox);

            <span style="color: blue;">this</span>.Content = Container;

            Timer.Interval = <span style="color: blue;">new</span> <span
style="color: #2b91af;">TimeSpan</span>(0, 0, 1);

            Timer.Start();

        }

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Timer\_Tick(<span
style="color: blue;">object</span> sender, System.<span
style="color: #2b91af;">EventArgs</span> e)

        {

            <span style="color: blue;">if</span> (TimeOut \<= 0)

            {

                Timer.Stop();

                MyBox.Visibility = System.Windows.<span
style="color: #2b91af;">Visibility</span>.Collapsed;

                <span style="color: blue;">this</span>.IsEnabled = <span
style="color: blue;">false</span>;

            }

            <span style="color: blue;">else</span> {

                TimeOut -= 1000;

                MyBox.Text = (TimeOut / 1000).ToString() + <span
style="color: #a31515;">" saniye kaldı."</span>;

            }

        }

    }

}


