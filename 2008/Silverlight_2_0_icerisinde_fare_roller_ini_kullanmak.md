---
FallbackID: 2070
Title: Silverlight 2.0 içerisinde fare roller'ını kullanmak...
PublishDate: 5/28/2008
EntryID: Silverlight_2_0_icerisinde_fare_roller_ini_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 6c65ffd8-1d62-45c8-a591-555380135504
---
Silverlight 2.0 içerisinde .NET programlama dillerini kullanırken
istemci tarafında bir tarayıcıda olduğumuzu sürekli hatırlamak gerek. Bu
bilgiyi aklımızda tutarsak aslında Silverlight içerisinde yapılamayan
bazı şeyleri tarayıcının özelliklerinden faydalanarak yapma şansımız
olabiliyor. Bu konuya örneklerden biri Silverlight 2.0 içerisinde
farenin roller'ını yakalayarak zoom-in veya zoom-out efekti yaratmak.
Maalesef şimdilik Silverlight içerisinde farenin roller'ını
yakalayabileceğimiz herhangi bir event-handler yok. Bu durumda biz de
tarayıcının özelliklerinden faydalanacağız.

İlk olarak hazırlayacağımız **Silverlight 2.0 Beta 1** uygulamasının
XAML kodunu inceleyelim. **Page.xaml** içerisinde basit bir **Image**
nesnesi yer alıyor. Farenin rollerını kullanarak söz konusu Image
nesnesini zoom yapabileceğiniz, yani özünde Image nesnesinin boyutlarını
büyüterek küçülteleceğiz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScrollWheel.Page</span>"

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
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">147,112,156,126</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Forest.jpg</span>"<span style="color: blue;">
</span><span style="color: red;">RenderTransformOrigin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0.5</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Foto</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">          **\<**</span><span
style="color: #a31515;">**ScaleTransform**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**ZoomCarpani**</span>"<span style="color: blue;">
**** </span><span style="color: red;">**ScaleX**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**1**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**ScaleY**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**1**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">SkewTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">RotateTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde özellikle dikkat edilmesi gereken bir nokta
var. Normal şartlarda Expression Blend içerisinde bir Image nesnesi
yerleştirirseniz **Image.RenderTransform** tagı ve içerisindekiler
gelmeyecektir. Eğer söz konusu Image nesnesini sadece bir kere arayüz
içerisinde boyutlandırırsanız hemen bu taglar eklenir. Sonrasında
**RenderTransform** içerisindeki **ScaleTransform** kısmıyla
ilgileneceğiz. **Image** nesnemizin büyüklüğünü değiştirecek olan tag
bu. ScaleTransform'un **ScaleX** ve **ScaleY** adında X ve Y
doğrultusunda boyutlandırma yapabilen çarpanları var. Bu çarpanlara ve
**ScaleTransform** nesnesine programatik olarak ulaşabilmek için hemen
ScaleTransform'a **ZoomCarpani** adını veriyoruz. Böylece artık
rahatlıkla kod tarafından bu resmin boyutu ile oynayabiliriz.

Gelelim code-behind sayfamıza; ilk olarak internet tarayıcımızın farenin
roller'ını algıladığı event-handlerları yakalayarak kendi .NET event
handlerlarımızı bağlamalıyız.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

    System.Windows.Browser.HtmlPage.Window.AttachEvent(<span
style="color: #a31515;">"DOMMouseScroll"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

    System.Windows.Browser.HtmlPage.Window.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

    System.Windows.Browser.HtmlPage.Document.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Silverlight uygulamamız sayfaya ilk yüklendiğinde hemen mevcut HtmlPage
(HTML sayfa) üzerinden tarayıcı penceresini (Window) yakalayarak
**DOMMouseScroll** ve **onmousewheel** durumlarına kendi
**FareTekerlekDondu** kodumuzu atıyoruz. Ayrıca sayfada yüklü dokümanın
da (Document) **onmousewheel** event'ını aynı şekilde yakalamamız
gerekiyor. Tüm bu farklı event-handlerlar aslında hep bizim tek
event-handlarımız olan **FareTekerlekDondu'ye** yönlendiriliyor. Bunun
nedeni farklı tarayıcıların farklı event-handlerlar ile çalışıyor
olması. Bizim örneğimiz rahatlıkla Opera, Safari, FireFox ve IE'de
çalışacak. Sıra geldi **FareTekerlekDondu'yü** kodlamaya.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> FareTekerlekDondu(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Browser.**HtmlEventArgs**)

    ...

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki şekli ile kodumuzu yazarken dikkat etmemiz gereken nokta
**e** parametresinin tipi. **HtmlEventArgs** bize tarayıcının döndürdüğü
değerleri aktaracak.

    <span style="color: blue;">Dim</span> DonMiktar <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0

    <span style="color: blue;">Dim</span> Gelen <span
style="color: blue;">As</span> System.Windows.Browser.ScriptObject =
e.EventObject

Kodumuzda iki adet değişken tanımlıyoruz. Bunlardan ilki olan
**DonMiktar** tarayıcından gelen farenin roller'ını dönüş miktarını
alarak yönünü belirleyecek. Tarayıcılardan dönüş miktarı + veya - değer
olarak gelebilir ve maalesef bu durum tarayıcı tipine göre farklı
yönlerde dönüşleri tanımlıyor. Tanımladığımız bir diğer değişken ise
**Gelen** adında; bu değişken doğrudan e parametresinden
**EventObject'i** alarak bize dönüş miktarını ulaştıracak.

    <span style="color: green;">'IE ve OPERA</span>

    <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

        <span style="color: green;">'OPERA'da ters!</span>

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"opera"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

            DonMiktar = -DonMiktar

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        DonMiktar = Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>)

        <span style="color: green;">'Mozilla ve Safari</span>

    <span style="color: blue;">ElseIf</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

        DonMiktar = -Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

Yukarıdaki kod biraz karışık gözükebilir fakat aslında yapmaya
çalıştığımız şey çok basit. Tarayıcıdan farenin roller'ının dönüş
miktarını almaya çalışıyoruz. Maalesef farklı tarayıcılarda bu sistemin
farklı çalışması gerekiyor. Opera ve IE bu değeri **wheelDelta**
özelliği üzerinden verirken Mozilla ve Safari **detail** adında bir
property kullanıyor. Ayrıca IE dışında tüm tarayıcılarda değerler ters,
veya belki de IE'de ters :) Ama duruma göre gelen değeri eksi ile
çarpmak zorunda kalıyoruz.

    <span style="color: blue;">If</span> DonMiktar \> 0 <span
style="color: blue;">Then</span>

        ZoomCarpani.ScaleX += 0.1

        ZoomCarpani.ScaleY += 0.1

    <span style="color: blue;">Else</span>

        ZoomCarpani.ScaleX -= 0.1

        ZoomCarpani.ScaleY -= 0.1

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

Artık elimizde **DonMiktar** değişkeni hazır olarak bulunduğunda göre
DonMiktar'ın eksi veya artı değer almasına göre elimizdeki resmi büyütüp
küçültebiliriz. Bu noktada büyütme ve küçültme miktarını el ile
ayarlamakta fayda var. Aslında **DonMiktar** içerisinde farenin
roller'ının bir defada ne kadar döndürüldüğüne dair bir değer geliyor
fakat bunu kullanmak farklı sistemlerde çok ilginç sonuçlar verebiliyor.
En iyisi sabit bir yol izlemek.

    <span style="color: blue;">If</span> DonMiktar \<\> 0 <span
style="color: blue;">Then</span>

        e.PreventDefault()

        Gelen.SetProperty(<span
style="color: #a31515;">"returnValue"</span>, <span
style="color: blue;">False</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

Son olarak tarayıcıya farenin roller değişimi ile ilgili işlemlerini
bizim yaptığımızı belirtmemiz gerek. Böylece tarayıcı içerisinde sayfa
scroll etmeyecektir.

Uygulamamızın tam kodu aşağıdaki şekilde sonuçlanıyor....

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> FareTekerlekDondu(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Browser.HtmlEventArgs)

    <span style="color: blue;">Dim</span> DonMiktar <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0

    <span style="color: blue;">Dim</span> Gelen <span
style="color: blue;">As</span> System.Windows.Browser.ScriptObject =
e.EventObject

    <span style="color: green;">'IE ve OPERA</span>

    <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

        <span style="color: green;">'OPERA'da ters!</span>

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"opera"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

            DonMiktar = -DonMiktar

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        DonMiktar = Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>)

        <span style="color: green;">'Mozilla ve Safari</span>

    <span style="color: blue;">ElseIf</span> <span
style="color: blue;">Not</span> Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>) <span
style="color: blue;">Is</span> <span style="color: blue;">Nothing</span>
<span style="color: blue;">Then</span>

        DonMiktar = -Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

 

    <span style="color: blue;">If</span> DonMiktar \> 0 <span
style="color: blue;">Then</span>

        ZoomCarpani.ScaleX += 0.1

        ZoomCarpani.ScaleY += 0.1

    <span style="color: blue;">Else</span>

        ZoomCarpani.ScaleX -= 0.1

        ZoomCarpani.ScaleY -= 0.1

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

 

    <span style="color: blue;">If</span> DonMiktar \<\> 0 <span
style="color: blue;">Then</span>

        e.PreventDefault()

        Gelen.SetProperty(<span
style="color: #a31515;">"returnValue"</span>, <span
style="color: blue;">False</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Hepinize kolay gelsin...


