---
FallbackID: 2388
Title: Windows 7 içerisinde Taskbar Thumbnail'leri yönetmek.
PublishDate: 12/8/2009
EntryID: Windows_7_icerisinde_Taskbar_Thumbnailleri_yonetmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows 7
old.EntryID: eab076d7-acf7-494c-85a1-046736d571e0
---
Bir uygulama içerisinden birden çok pencerenin olduğu yılları
hatırlarsınız dersem belki de "O yıllar geride mi kaldı?"
diyebilirsiniz. MDI formları yıllarda uygulamalarımızın en önemli
parçaları oldular. Kullanıcı deneyimi olarak olabildiğince onlardan
kaçsak da farklı şekillerde de olsalar hep karşımıza çıkıyorlar. Sadece
MDI formları değil aslında TAB içeren tüm mekanizmalara konumuza dahil
edebiliriz. Örneğin Internet Explorer 8 içerisinde de birden çok tab
açarak aslında apayrı işler yapabiliyoruz. Aynı program içerisinde
çalışsak da aslında yaşanan deneyim son kullanıcı açısından ayrı bir
program kullanmaktan çok da farklı olmuyor.

![Internet Explorer içerisinden farklı tablar
taskbarda...](http://cdn.daron.yondem.com/assets/2388/12082009_1.jpg)\
*Internet Explorer içerisinden farklı tablar taskbarda...*

Şöyle bir düşünsek acaba bizim de hazırladığımız programlarda
kullanıcıların böyle geçiş yapabilecekleri ekranlar var mıdır? Aynı
uygulama içerisinden bir anda birden çok ekran üzerinde çalışan
kullanıcılara taskbar üzerinden ulaşarak acaba bu ekranlara taskbardan
da ayrı ayrı ulaşabileceklerini belirtebilsek güzel olmaz mıydı? Gelin
bu durumda minik bir örnek ile bu işlevselliği programlarımıza nasıl
katabileceğimize göz atalım.

**Ön Hazırlıklar**

Örnek WPF uygulamamızı yarattığımız gibi
[WindowsAPICodePack](http://code.msdn.microsoft.com/WindowsAPICodePack)
ile beraber gelen **Microsoft.WindowsAPICodePack.dll** ve
**Microsoft.WindowsAPICodePack.Shell.dll**'i referans olarak projemize
eklemeliyiz. Yarattığımız bu yeni WPF projesine ayrıca System.Drawing'i
de referans alıp sonrasında XAML tarafına geçelim.

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
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Resim"</span><span style="color: red;">
Source</span><span style="color: blue;">="Koala.jpg" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Resim2"</span><span style="color: red;">
Source</span><span style="color: blue;">="Desert.jpg" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

Yukarıdaki şekli ile uygulamamızın ana ekranında iki tane resim yer
alacak. Bu resimler birbirlerinin üstündeler yani her zaman uygulama
ekranında normal şartlarda sadece tek resim gözükebilir. Bu resimleri
uygulamalarınız içerisinde farklı ekranlar olarak kabul edebilirsiniz.
Amacımız kullanıcılar taskbar üzerinden bu iki resim arasında geçiş
yapabilmelerini ve bu iki resmi sanki uygulamanın iki ayrı arayüzüymüş
gibi görebilmelerini sağlamak.

**[VB]**

        <span style="color: blue;">If</span>
TaskbarManager.Instance.TabbedThumbnail.**GetThumbnailPreview**(Resim)
<span style="color: blue;">Is</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> GenT =
Resim.TransformToVisual(Application.Current.MainWindow)

            <span style="color: blue;">Dim</span> Nokta <span
style="color: blue;">As</span> Point = GenT.Transform(<span
style="color: blue;">New</span> Point(0, 0))

            <span style="color: blue;">Dim</span> Thumbnail <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TabbedThumbnail(Application.Current.MainWindow, Resim, <span
style="color: blue;">New</span> Vector(Nokta.X, Nokta.Y))

            Thumbnail.Tooltip = <span style="color: #a31515;">"Bu bir
foto!"</span>

            <span style="color: blue;">AddHandler</span>
Thumbnail.TabbedThumbnailActivated, <span
style="color: blue;">AddressOf</span>
Thumbnail\_TabbedThumbnailActivated

           
TaskbarManager.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

**[C\#]**

            <span style="color: blue;">if</span> (<span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.GetThumbnailPreview(Resim)
== <span style="color: blue;">null</span>) {

                <span style="color: blue;">var</span> GenT =
Resim.TransformToVisual(<span
style="color: #2b91af;">Application</span>.Current.MainWindow);

                <span style="color: #2b91af;">Point</span> Nokta =
GenT.Transform(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 0));

                <span style="color: #2b91af;">TabbedThumbnail</span>
Thumbnail = <span style="color: blue;">new</span> <span
style="color: #2b91af;">TabbedThumbnail</span>(<span
style="color: #2b91af;">Application</span>.Current.MainWindow, Resim,
<span style="color: blue;">new</span> <span
style="color: #2b91af;">Vector</span>(Nokta.X, Nokta.Y));

                Thumbnail.Tooltip = <span style="color: #a31515;">"Bu
bir foto!"</span>;

                Thumbnail.TabbedThumbnailActivated +=
Thumbnail\_TabbedThumbnailActivated;

                <span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail);

            }

Kodumuz biraz karışık gibi gözükebilir fakat aslında epeyce basit. Gelin
satır satır inceleyelim. İlk olarak IF içerisinde kontrol ettiğimiz
noktadan bahsedelim. Bizim örneğimizde **Resim** nesnesi için Toolbar'da
bir Thumbnail yaratacağız o nedenle daha önce yaratılıp yaratılmadığını
kontrol etmekte fayda var. Kontrol işlemini **GetThumbnailPreview**
metodu ile yapabiliyoruz. Eğer daha önce thumbnail yaratılmamış ise
kodumuz çalışmaya devam edecek.

**GenT** ve **Nokta** değişkenlerimiz aracılığı ile aslında uygulama
içerisinde **Thumbnail** olarak kullanacağımız elementin uygulama
penceresine göre offsetini hesaplıyoruz. Bu bilgiyi bir **Vector**
nesnesi olarak bir sonraki adımda **TabbedThumbnail** yaratırken
kullanmak zorundayız. **TabbedThumbnail** nesnesi yaratmak aslında
işlemin sonuna geldiğimizi de gösteriyor. Bu nesneyi yarattıktan sonra
geriye bir tek onu taskbara eklemek kalıyor. **TabbedThumbnail**
yaratırken parametre olarak uygulamamızın hangi penceresine eklediğimizi
ve görsel nesnemizi (**Resim**) verirken son olarak da görsel nesnenin
pencereye göre offsetini veriyoruz. **TabbedThumbnail** 'in isterseniz
Tooltip ve Title özelliklerini de set ederek Taskbar'da gözükmelerini
sağlayabilirsiniz.

Son adım yarattığımız **TabbedThumbnail** 'in kullanıcı tarafından
seçildiğinde çalıştırılacak olan event-listener'ını eklemek. Bunun için
**TabbedThumbnail** nesnesinin **TabbedThumbnailActivated** adında bir
event'ı bulunuyor. Son olarak event bağlamasını da bitirdiğimize göre
artık **AddThumbnailPreview** ile **TabbedThumbnail** 'imizi taskbara
ekleyebiliriz.

![Tek uygulama, taskbarda iki
thumbnail!](http://cdn.daron.yondem.com/assets/2388/12082009_2.jpg)\
*Tek uygulama, taskbarda iki thumbnail!*

Yukarıdaki şekli ile uygulamamızdaki iki farklı resim için de
**TabbedThumbnail** yaratarak Taskbara'a ekledikten sonra tek yapmamız
gereken her iki **TabbedThumbnail'in** de event listener'larında
uygulama arayüzünde gerekli değişiklikleri yapmak. Aşağıda uygulamanın
tam kodunu bulabilirsiniz.

Hepinize kolay gelsin.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Window1\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">If</span>
TaskbarManager.Instance.TabbedThumbnail.GetThumbnailPreview(Resim) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> GenT =
Resim.TransformToVisual(Application.Current.MainWindow)

            <span style="color: blue;">Dim</span> Nokta <span
style="color: blue;">As</span> Point = GenT.Transform(<span
style="color: blue;">New</span> Point(0, 0))

            <span style="color: blue;">Dim</span> Thumbnail <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TabbedThumbnail(Application.Current.MainWindow, Resim, <span
style="color: blue;">New</span> Vector(Nokta.X, Nokta.Y))

            Thumbnail.Tooltip = <span style="color: #a31515;">"Bu bir
foto!"</span>

            <span style="color: blue;">AddHandler</span>
Thumbnail.TabbedThumbnailActivated, <span
style="color: blue;">AddressOf</span>
Thumbnail\_TabbedThumbnailActivated

           
TaskbarManager.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">If</span>
TaskbarManager.Instance.TabbedThumbnail.GetThumbnailPreview(Resim2)
<span style="color: blue;">Is</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> GenT =
Resim.TransformToVisual(Application.Current.MainWindow)

            GenT =
Resim2.TransformToVisual(Application.Current.MainWindow)

            <span style="color: blue;">Dim</span> Nokta <span
style="color: blue;">As</span> Point = GenT.Transform(<span
style="color: blue;">New</span> Point(0, 0))

            <span style="color: blue;">Dim</span> Thumbnail <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
TabbedThumbnail(Application.Current.MainWindow, Resim2, <span
style="color: blue;">New</span> Vector(Nokta.X, Nokta.Y))

            Thumbnail.Tooltip = <span style="color: #a31515;">"Bu başka
bir foto!"</span>

            <span style="color: blue;">AddHandler</span>
Thumbnail.TabbedThumbnailActivated, <span
style="color: blue;">AddressOf</span>
Thumbnail2\_TabbedThumbnailActivated

           
TaskbarManager.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span>
Thumbnail\_TabbedThumbnailActivated(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
Microsoft.WindowsAPICodePack.Taskbar.TabbedThumbnailEventArgs)

        Canvas.SetZIndex(Resim2, 10)

        Canvas.SetZIndex(Resim, 11)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span>
Thumbnail2\_TabbedThumbnailActivated(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
Microsoft.WindowsAPICodePack.Taskbar.TabbedThumbnailEventArgs)

        Canvas.SetZIndex(Resim, 10)

        Canvas.SetZIndex(Resim2, 11)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Window1\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (<span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.GetThumbnailPreview(Resim)
== <span style="color: blue;">null</span>) {

                <span style="color: blue;">var</span> GenT =
Resim.TransformToVisual(<span
style="color: #2b91af;">Application</span>.Current.MainWindow);

                <span style="color: #2b91af;">Point</span> Nokta =
GenT.Transform(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 0));

                <span style="color: #2b91af;">TabbedThumbnail</span>
Thumbnail = <span style="color: blue;">new</span> <span
style="color: #2b91af;">TabbedThumbnail</span>(<span
style="color: #2b91af;">Application</span>.Current.MainWindow, Resim,
<span style="color: blue;">new</span> <span
style="color: #2b91af;">Vector</span>(Nokta.X, Nokta.Y));

                Thumbnail.Tooltip = <span style="color: #a31515;">"Bu
bir foto!"</span>;

                Thumbnail.TabbedThumbnailActivated +=
Thumbnail\_TabbedThumbnailActivated;

                <span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail);

            }

            <span style="color: blue;">if</span> (<span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.GetThumbnailPreview(Resim2)
== <span style="color: blue;">null</span>) {

                <span style="color: blue;">var</span> GenT =
Resim.TransformToVisual(<span
style="color: #2b91af;">Application</span>.Current.MainWindow);

                GenT = Resim2.TransformToVisual(<span
style="color: #2b91af;">Application</span>.Current.MainWindow);

                <span style="color: #2b91af;">Point</span> Nokta =
GenT.Transform(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 0));

                <span style="color: #2b91af;">TabbedThumbnail</span>
Thumbnail = <span style="color: blue;">new</span> <span
style="color: #2b91af;">TabbedThumbnail</span>(<span
style="color: #2b91af;">Application</span>.Current.MainWindow, Resim2,
<span style="color: blue;">new</span> <span
style="color: #2b91af;">Vector</span>(Nokta.X, Nokta.Y));

                Thumbnail.Tooltip = <span style="color: #a31515;">"Bu
başka bir foto!"</span>;

                Thumbnail.TabbedThumbnailActivated +=
Thumbnail2\_TabbedThumbnailActivated;

                <span
style="color: #2b91af;">TaskbarManager</span>.Instance.TabbedThumbnail.AddThumbnailPreview(Thumbnail);

            }

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span>
Thumbnail\_TabbedThumbnailActivated(<span
style="color: blue;">object</span> sender,
Microsoft.WindowsAPICodePack.Taskbar.<span
style="color: #2b91af;">TabbedThumbnailEventArgs</span> e)

        {

            <span
style="color: #2b91af;">Canvas</span>.SetZIndex(Resim2, 10);

            <span style="color: #2b91af;">Canvas</span>.SetZIndex(Resim,
11);

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span>
Thumbnail2\_TabbedThumbnailActivated(<span
style="color: blue;">object</span> sender,
Microsoft.WindowsAPICodePack.Taskbar.<span
style="color: #2b91af;">TabbedThumbnailEventArgs</span> e)

        {

            <span style="color: #2b91af;">Canvas</span>.SetZIndex(Resim,
10);

            <span
style="color: #2b91af;">Canvas</span>.SetZIndex(Resim2, 11);

        }

[Örneklere ait kaynak kodlar - 12082009\_3.rar (3,23
MB)](http://cdn.daron.yondem.com/assets/2388/12082009_3.rar)


