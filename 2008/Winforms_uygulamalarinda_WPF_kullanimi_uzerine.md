---
FallbackID: 1940
Title: "Winforms uygulamalarında WPF kullanımı üzerine."
date: "2008-2-2"
EntryID: Winforms_uygulamalarinda_WPF_kullanimi_uzerine
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: 399ae928-b165-4690-8346-cdb60f82c9b4
---
# Winforms uygulamalarında WPF kullanımı üzerine.
WPF release olduğundan bu yana neredeyse tüm eğitimlerde ve seminerlerde
**WPF** ile klasik **Winforms** yapısının aynı uygulama içerisinde
beraber kullanılıp kullanılmayacağı sorusu ile karşılaşıyorum. Bu yazıda
klasik bir Winforms uygulamasında WPF kullanmanın yolunu inceleyeceğiz.

İlk olarak Visual Studio 2008 ile **.NET Framework 3.5** altyapısında
bir Winforms uygulaması yaratıyoruz. Solution Explorer içerisinde
projeye sağ tuş ile tıkladığımızda gelen menüden "Add / New Item"
dediğimizde WPF altında sadece **WPF User Control** ekleyebildiğimizi
görüyoruz. Hemen projemizde bir WPF User Control ekleyerek yolumuza
devam edelim. Tüm WPF uygulamalarında olduğu gibi WPF User Control'lerin
de görsel yapısının **Expression Blend** ile düzenlenmesi gerekiyor. Bu
amaçlı projemizi (proje dosyasını) Expression Blend ile de açıyoruz ve
WPF User Control içerisinde aşağıdaki şekliyle ufak bir animasyon
düzenliyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="UserControl1"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

            <span style="color: red;"> Width</span><span
style="color: blue;">="300"</span>

            <span style="color: red;"> Height</span><span
style="color: blue;">="300"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="Storyboard1"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span>

                                    <span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span>

                                    <span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Opacity)"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span>

                            <span style="color: red;"> Value</span><span
style="color: blue;">="1" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span>

                            <span style="color: red;"> Value</span><span
style="color: blue;">="0.4" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span>

                            <span style="color: red;"> Value</span><span
style="color: blue;">="1" /\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,0,0,0"</span>

              <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFF0000"</span>

              <span style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span>

              <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="rectangle" /\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

User Control içerisine tam boyutta yerleştirilmiş olan bir dikdörtgene
ait **Storyboard1** adındaki animasyon söz konusu dikdörtgenin şeffaflık
değerlerini değiştirerek basit bir animasyon oluşturuyor. Şimdi sıra
geldi bu WPF User Control'ü Winforms penceresine eklemeye. Winforms
pencerelerinde bir WPF User Control kullanabilmek için ilk olarak araç
çubuğunda "**WPF Interoperability**" sekmesinden formumuza bir
**ElementHost** kontrolü eklememiz gerekiyor.

![WPF User Control host edecek olan ElementHost kontrolünü forma
yerleştiriyoruz.](media/Winforms_uygulamalarinda_WPF_kullanimi_uzerine/0102008_1.png)\
*WPF User Control host edecek olan ElementHost kontrolünü forma
yerleştiriyoruz.*

ElementHost kontrolünü forma ekledikten sonra hemen kontrolün sağ üst
köşesindeki ufak üçgene tıklayarak gelen menüden projemizdeki WPF User
Control'lerden istediğimizi seçebiliyoruz. Eğer WPF User Control'lerin
bir listesi gelmiyorsa hemen projenizi "Build" ederek gerekli listenin
yenilenmesini sağlayabilirsiniz.

Artık WPF kontrolümüz Winforms uygulamamızda çalışıyor fakat
animasyonumuz daha çalışmıyor. Animasyonumuzun WPF içerisinde Rectangle
nesnesine tıklandığında çalışmasını istiyoruz, bunun için aynı ASP.NET
uygulamalarında da olduğu gibi hemen WPF User Control'ün arkasındaki
(code-behind) koda uzanarak aşağıdaki satırları yazıyoruz.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> UserControl1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> rectangle\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> **rectangle.MouseLeftButtonDown**

        <span style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Resources(<span
style="color: #a31515;">"**Storyboard1**"</span>),
**System.Windows.Media.Animation.Storyboard**).**Begin**(<span
style="color: blue;">Me</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

WPF User Control arkasındaki kod içerisinde **Rectangle** nesnesinin
**MouseLeftButtonDown** durumunda User Control'e ait kaynaklar
içerisinde animasyonumuzu bularak çalıştırıyoruz. Böylece artık Winforms
uygulamasında söz konusu dikdörtgene tıklandığında animasyon
çalışacaktır.

**Winforms'dan WPF içine erişim.**

Şimdi ikinci soru geliyor! Peki Winforms penceresinde başka bir kontrol
veya kod ile WPF User Control içerisindeki animasyona nasıl ulaşırız?
Aslında çok kolay, çünkü özünde bir User Control'den bahsediyoruz. Nesne
yönelimli mimari gereği bir şekilde nested nesnelere ulaşabiliyor
olmamız gerekir. Mantık olarak yapmamız gereken ilk olarak gidip
ElementHost içerisindeki User Control'ü bulmak sonrasında da User
Control'ün kaynaklarından istediğimiz animasyonu bularak çalıştırmak.
Winforms penceremize klasik bir Button koyduktan sonra yazdığımız kod
aşağıdaki şekilde sonlanıyor.

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
Button1.Click

        <span style="color: blue;">Dim</span> UC = <span
style="color: blue;">CType</span>(**ElementHost1.HostContainer.Children.Item(0)**,
UserControl1)

        <span style="color: blue;">CType</span>(UC.Resources(<span
style="color: #a31515;">"Storyboard1"</span>),
System.Windows.Media.Animation.Storyboard).Begin(UC)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz üzere ElementHost kontrolünün HostContainer yapısı içerisinde
WPF User Controlü yakalayabiliyoruz. HostContainer içerisinde şu an
zaten tek bir UserControl var, o da bizim UserControl1 olarak
yarattığımız WPF User Controlümüz. Gerekli cast'ları da yaptıkran sonra
yakaladığımız User Control üzerinden aynı bir önceki adımda olduğu gibi
animasyonumuza da ulaşabiliyoruz. Bu şekilde User Control içerisindeki
her şeye ulaşabilirsiniz.

**WPF User Control'den Winforms'a erişim.**

Bir diğer senaryoda da WPF User Control içerisindeki kodlardan dışarıya,
yani esas Winforms penceresine ulaşmak isteyebilirsiniz. Aslında bu
durumda da eski taktikler işe yarıyor. User Control içerisinde hızlı bir
şekilde aşağıdaki gibi bir Property belirleyerek söz konusu User
Control'ün yarattığımız Property'sini üst formdan belirliyoruz. Böylece
User Control içerisinden dışarıya ulaşabiliyoruz.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> UserControl1

    <span style="color: blue;">Private</span> PMyParent <span
style="color: blue;">As</span> Form

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> MyParent() <span
style="color: blue;">As</span> Form

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PMyParent

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> Form)

            PMyParent = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> rectangle\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> rectangle.MouseLeftButtonDown

        MyParent.Text = <span style="color: #a31515;">"Tamamdir"</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

WPF User Controlümüzün yukarıdaki kodunda **MyParent** adında bir
Property tanımladık. Bu Property'yi doğrudan Winforms penceresinde
tanımlarken aslında Winforms penceremizin bir "Instance" ını aktarmış
olacağız. böylece User Control doğrudan Winforms penceresinin her şeyine
ulaşabilecek. Bizim kodumuzda pencerenin adını değiştiriyoruz :) Şimdi
gelelim ana pencerede neler yazacağımız.

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Form1\_Load(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Load

        <span style="color: blue;">Dim</span> UC = <span
style="color: blue;">CType</span>(ElementHost1.HostContainer.Children.Item(0),
UserControl1)

        UC.MyParent = <span style="color: blue;">Me</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Ana pencerenin yüklendiği anda **ElementHost** içerisine eklenmiş olan
UserControl1'i yakalayarak **MyParent** özelliğini ana pencerenin
kendisini aktarıyoruz. Böylece WPF User Control içerisinden de dış
pencereye ulaşılabilecek.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-2-2 tarihinde yayinlanmistir.*
