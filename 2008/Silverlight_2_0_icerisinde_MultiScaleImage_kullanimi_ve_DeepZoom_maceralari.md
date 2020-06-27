---
FallbackID: 2132
Title: "Silverlight 2.0 içerisinde MultiScaleImage kullanımı ve DeepZoom maceraları"
date: "2008-7-24"
EntryID: Silverlight_2_0_icerisinde_MultiScaleImage_kullanimi_ve_DeepZoom_maceralari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 84a4bed5-dcdf-48a6-8cc7-2b193eeda808
---
Silverlight 2.0 ile beraber gelen kontrollerden biri de
**MultiScaleImage** kontrolü. Bu kontrolün yapabildikleri arasında
gerçekten çok ilginç uygulamalar var. Genel itibari ile çok büyük
boyutta resimlerin istemci tarafında bant genişliğinin en uygun
performans ile kullılarak gösterilmesini sağladığını söyleyebiliriz.
Örneğin elinizde çok yüksek çözünürlükte 2GB'lık bir fotoğraf var ve bu
fotoğrafı istemci tarafında göstermek istiyorsunuz veya elinizde toplam
3GB'lık bir fotoğraf arşivi var ve bunu güzel bir Silverlight galerisi
şeklinde kullanıcılarla paylaşmak istiyorsunuz. Fakat uygulamanın
çalışırken doğal olarak tüm resimleri yüklememesi hatta sadece o an
ekranda gözüken kısımları yüklemesi gerekiyor. Tüm bunları elle tek tek
kodlayarak yapabiliriz fakat **MultiScaleImage** varken aslında herşey
çok daha kolay ilerliyor.

**Deep Zoom Composer**

**MultiScaleImage** kontrolü içerisinde gösterilecek resimlerin farklı
detaylarda gösterilebilmesi ve kullanıcı resme zoom yaptıkça yeni
detayların yüklenerek ekranda gösterilebilmesi için arkaplanda
resimlerin biraz detaylı bir yapıda hazırlanmış olması gerekiyor. Bu
işlemleri otomatik olarak yapabilecek bir uygulama olan Deep Zoom
Composer'ı aşağıdaki adresten bilgisayarınıza indirip kurabilirsiniz.

<http://www.microsoft.com/downloads/details.aspx?FamilyID=457b17b7-52bf-4bda-87a3-fa8a4673f8bf&DisplayLang=en>

Yüklemeyi yapıp yeni bir DeepZoom projesi yarattığınızda programın
arayüzündeki "Add Image" düğmesi ile projeye istediğiniz kadar resim
ekleyebilirsiniz. Eklediğiniz bu resimleri "Compose" sekmesinde sahneye
sürükleyerek istediğiniz şekilde resimleri iç içe veya üst üste
koyabilirsiniz. Resimleri ufaltabilir veya büyütebilirsiniz. Unutmayın
ki burada bir resmi diğerine göre çok ufak yerleştirseniz de kullanıcı
birazdan hazırlayacağımız uygulamada zoom yaparak tüm detayları
görebilecek. Yani bir insan resmi koyup gözünün içine de ufacık
görünecek şekilde aslında 5MB'lık kocaman bir fotoğraf
yerleştirebilirsiniz. Kullanıcı resmi ilk açtığında bu fotoğraf insanın
gözünün içinde ufacık olduğu için tamamen yüklenmeyecek ve sadece
gözüktüğü kadarı istemciye gönderilecektir. Oysa kullanıcı zoom yaparak
gözün içine girip büyük fotoğrafı görmeye başladığında ise detaylar
yüklenerek fotoğrafınız tüm çözünürlüğü ile net bir şekilde
gözükecektir. DeepZoom Composer'ın kullanımı ile ilgili detaylı bilgiyi
sevgili [Turhal Temizer'in
yazısından](http://www.yazgelistir.com/Makaleler/1000001934.ygpx)
edinebilirsiniz.

![DeepZoom Composer içerisinde
fotoğraflarımız.](media/Silverlight_2_0_icerisinde_MultiScaleImage_kullanimi_ve_DeepZoom_maceralari/23072008_1.jpg)\
*DeepZoom Composer içerisinde fotoğraflarımız.*

Biz uygulamamızda yukarıdaki gibi fotoğrafları sahneye ekleyip sağ tuş
ile gelen menüden de tüm fotoğrafları "**Arrange to Grid"** diyerek bir
tablo içerisindeymiş gibi hizalatalım. Böylece tüm fotoğraflar yan yana
ve alt alta sıralanacaktır. Daha önce de bahsettiğim gibi isterseniz
fotoğrafları üst üste yerleştirme ve farklı tasarımlar yapma şansınız da
var. Örneğin bir mekanın duvarındaki reklamı ayrı bir detaylı fotoğraf
olarak koyabilirsiniz. Böylece kullanıcı mekan fotoğrafındaki duvarda
yer alan reklama zoom yaptığında aslında daha detaylı farklı bir görsel
yüklenmeye başlayacak ve normalde elde edilemeyen bir detay gösterimi
yapılabilecektir.

Son olarak DeepZoom Composer içerisinde "**Export**" bölümüne geçerek
artık fotoğraflarımızın gerekli çıktılarını almak istiyoruz. Export
esnasında özellikle "**Output Type**" olarak "**Export Images**"
seçeneğini işaretlemeyi unutmayın. Normalde DeepZoomComposer isterseniz
size hazır bir Silverlight projesi de yaratabiliyor fakat bu yazımızda
biz kendi uygulamamızı hazırlayacağımız için sadece fotoğrafların
düzenlenerek gerekli arşivin oluşturulmasını istiyoruz.

![DeepZoom Composer
arşivimiz.](media/Silverlight_2_0_icerisinde_MultiScaleImage_kullanimi_ve_DeepZoom_maceralari/23072008_2.png)\
*DeepZoom Composer arşivimiz.*

Yukarıda da gördüğünüz üzere gerekli dosyalar bizim için hazırlanmış.
Buradaki XML dosyalarını tek tek inceleyebilirsiniz. Aslında her bir
dosya ayrı birer XML dosyasına yönlendiriyor bizi. Arşive eklediğimiz
her resim için ayrıca birer XML dosyası yaratılıyor ve bu dosyalar
içerisinde resimlerle ilgili konum bilgisi gibi detaylar yer alıyor.
Ayrıca her resmimizin farklı boyutlarda kopyaları da klasörler içerisine
kopyalanmış durumda. Hatta çok büyük resimler parçalara bölünerek ayrı
ayrı dosyalar olarak da kaydedilmiş. **MultiScaleImage** kontrolünün de
gücü zaten buradan geliyor. Kaynaktaki farklı boyuttaki ve parçalardaki
fotoğrafları gerçek zamanlı olarak birleştirebiliyor ve otomatik olarak
ekranda gözüken detaya uygun hedef dosyaları istemciye yüklüyor. Tüm
geçiş efektlerini de tabi ki otomatik olarak yapıyor. Peki artık kaynak
dosyalarımız hazır olduğuna göre uygulamamızı da hazırlamaya başlayalım.

**Silverlight projemizi yaratalım...**

Yeni bir Silverlight projesi yaratarak hemen içerisine bir
**MultiScaleImage** kontrolü yerleştiriyoruz. Şimdilik tasarım anlamında
farklı birşey yapmayacağız. Uygulamamızın XAML kodu aşağıdaki gibi basit
bir şekilde sonlanıyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication6.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="1024"</span><span style="color: red;">
Height</span><span style="color: blue;">="768"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**MultiScaleImage**</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**DeepZoom**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

DeepZoom adını verdiğim **MultiScaleImage** kontrolümüzü programlamaya
başlayacağız. İlk olarak yapmak istediğimiz işlemleri bir sıralayalım;

-   Fotoğraf arşivimizi kontrole yükleyeceğiz.
-   Fare ile fotoğraf arşivi içerisinde gezilebilmesini sağlayacağız
-   Farenin roller'ı ile zoom ve zoom out yapılabilmesini sağlayacağız
-   Artistik hareketler yapacağız

Listemizdeki tek tek yaparak ilerleyelim. İlk olarak fotoğraf arşivimizi
doğrudan kontrolümüze bağlayalım.

**[VB]**

        DeepZoom.Source = <span style="color: blue;">New</span>
DeepZoomImageTileSource(<span style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"GeneratedImages/dzc\_output.xml"</span>,
UriKind.Relative))

**[C\#]**

            DeepZoom.Source = <span style="color: blue;">new</span>
<span style="color: #2b91af;">DeepZoomImageTileSource</span>(<span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"GeneratedImages/dzc\_output.xml"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative));

Gördüğünüz üzere doğrudan **DeepZoom** kontrolümün **Source** özelliğini
değiştiriyorum ve yarattığımız yeni bir **DeepZoomImageTileSource**
nesnesini kendisine atıyoruz. Bu esnada bir önceki adımda DeepZoom
Composer'ın bizim için yarattığı arşivden **dzc\_output.xml** dosyasını
kaynak olarak gösteriyoruz. DeepZoom Composer'ın yarattığı
**GeneratedImages** klasörünü doğru olarak çalışabilmesi için XAP
dosyanız ile aynı konuma kopyalamanız gerekecektir.

**Fotoğraf arşivini gezelim.**

Sıra geldi fare ile fotoğrafların arasındaki gezintimize başlamaya.
Aslında yapacağımız işlem klasik bir Sürükle&Bırak işleminden farklı
değil. Fakat bu sefer sürükleyip bıraktıracağımız şey aslında
**MultiScaleImage** kontrolünün **ViewPortOrigin'i**. Yani bizim bu
arşive **MultiScaleImage** aracılığı ile bakış noktamızı değiştreceğiz.

**[VB]**

    <span style="color: blue;">Dim</span> Tasiniyor = <span
style="color: blue;">False</span>

    <span style="color: blue;">Dim</span> FareKonum <span
style="color: blue;">As</span> Point

    <span style="color: blue;">Dim</span> DeepZoomOrigin <span
style="color: blue;">As</span> Point

**[C\#]**

        <span style="color: blue;">bool</span> Tasiniyor = <span
style="color: blue;">false</span>;

        <span style="color: #2b91af;">Point</span> FareKonum;

        <span style="color: #2b91af;">Point</span> DeepZoomOrigin;

Sürükle ve bırak işlemi öncesinde ihtiyacımız olacak global
değişkenlerimizi yukarıdaki gibi yaratalım. Sonrasında toplam üç farklı
event için kod yazmamız gerekiyor. **MouseLeftButtonDown**,
**MouseMove** ve **MouseLeftButtonUp** durumlarında sürükleme işlemini
başlatıp durdurmaya karar vereceğiz.

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

        Tasiniyor = <span style="color: blue;">True</span>

        FareKonum = e.GetPosition(<span style="color: blue;">Me</span>)

        DeepZoomOrigin = DeepZoom.ViewportOrigin

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
Page\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseButtonEventArgs</span> e)

        {

            Tasiniyor = <span style="color: blue;">true</span>;

            FareKonum = e.GetPosition(<span
style="color: blue;">this</span>);

            DeepZoomOrigin = DeepZoom.ViewportOrigin;

        }

Kullanıcı fare ile sahneye tıkladığında hemen taşınma işlemini
başlattığımız için global **Tasiniyor** değişkenini True yapıyoruz.
Böylece ileride yazacağımız **MouseMove** kodu durumdan haberdar
olabilecek. Bir sonraki adımda farenin pozisyonunu ve sonrasında da
DeepZoom kontrolünün o anki orijin noktasını kenara not alıyoruz. Bu
bilgileri ileriki hesaplamalarımızda kullanacağız.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        <span style="color: blue;">If</span> Tasiniyor <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> YeniDeepZoomOrigin
<span style="color: blue;">As</span> <span
style="color: blue;">New</span> Point

            YeniDeepZoomOrigin.X = DeepZoomOrigin.X -
(((e.GetPosition(DeepZoom).X - FareKonum.X) / DeepZoom.ActualWidth) \*
DeepZoom.ViewportWidth)

            YeniDeepZoomOrigin.Y = DeepZoomOrigin.Y -
(((e.GetPosition(DeepZoom).Y - FareKonum.Y) / DeepZoom.ActualHeight) \*
DeepZoom.ViewportWidth)

            DeepZoom.ViewportOrigin = YeniDeepZoomOrigin

        <span style="color: blue;">Else</span>

            FareKonum = e.GetPosition(<span
style="color: blue;">Me</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">MouseEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (Tasiniyor)

            {

                <span style="color: #2b91af;">Point</span>
YeniDeepZoomOrigin = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>();

                YeniDeepZoomOrigin.X = DeepZoomOrigin.X -
(((e.GetPosition(DeepZoom).X - FareKonum.X) / DeepZoom.ActualWidth) \*
DeepZoom.ViewportWidth);

                YeniDeepZoomOrigin.Y = DeepZoomOrigin.Y -
(((e.GetPosition(DeepZoom).Y - FareKonum.Y) / DeepZoom.ActualHeight) \*
DeepZoom.ViewportWidth);

                DeepZoom.ViewportOrigin = YeniDeepZoomOrigin;

            }

            <span style="color: blue;">else</span>

            {

                FareKonum = e.GetPosition(<span
style="color: blue;">this</span>);

            }

        }

Sahnenin **MouseMove** durumunda ilk olarak bir taşıma işlemi olup
olmadığını kontrol ediyoruz. Eğer taşıma işlemi yoksa **FareKonum**
adındaki ve farenin mevcut konumunu saklayan değişkeni yeniliyoruz. Bunu
yapmamızın nedeni ileride yazacağımız zoom işlemleri. Zoom işlemini
yaparken farenin konumuna hep ihtiyacımız olacak. Burada sürekli güncel
konumu **FareKonum'a** aktarmak gerekiyor. Eğer taşıma işlemi
yapılıyorsa bu sefer de DeepZoom kontrolümüzün ViewPortOrigin'ini uygun
şekilde ayarlamamız gerek. Bu amaçla kodumuzda yeni bir **Point**
değişkeni tanımlayarak farenin mevcut konumu, eski konumu ve eski orijin
noktası arasında koordinat hesaplamaları yaparak ilerliyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonUp

        Tasiniyor = <span style="color: blue;">False</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
Page\_MouseLeftButtonUp(<span style="color: blue;">object</span> sender,
<span style="color: #2b91af;">MouseButtonEventArgs</span> e)

        {

            Tasiniyor = <span style="color: blue;">false</span>;

        }

Son olarak farenin sol tuşu bırakıldığında da taşıma işlemini
sonlandırıyoruz. Böylece artık fotoğraf arşivi içerisinde kullanıcılar
rahatlıkla gezebilecektir. Sıra geldi zoom meselesine.

**Fare ile Zoom-In ve Zoom-Out**

Fare ile zoom işlemleri için farenin roller'ını kullanacağız. Detaylar
için Silverlight 2.0 içerisinde fare roller'ı kullanmayla ilgili
[buradaki](http://daron.yondem.com/tr/post/6c65ffd8-1d62-45c8-a591-555380135504)
makleyi inceleyebilirsiniz. İlk olarak DOM üzerinden gerekli eventları
Silverlight ile yakalamamız gerekiyor.

**[VB]**

        System.Windows.Browser.HtmlPage.Window.AttachEvent(<span
style="color: #a31515;">"DOMMouseScroll"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

        System.Windows.Browser.HtmlPage.Window.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

        System.Windows.Browser.HtmlPage.Document.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, <span
style="color: blue;">AddressOf</span> FareTekerlekDondu)

**[C\#]**

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.AttachEvent(<span
style="color: #a31515;">"DOMMouseScroll"</span>, FareTekerlekDondu);

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, FareTekerlekDondu);

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, FareTekerlekDondu);

**FareTekerlekDondu** eventı içerisinde aşağıda kodları yazmamız
gerekiyor. Bu kodların çok detayına inmeyeceğiz çünkü bir önceki
paragrafta bahsettiğim makalede zaten bu konu detayları ile inceleniyor.
Bizim için bu kodda önemli olan kısım Zoom işleminin yapıldığı satırlar.

**[VB]**

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

            <span style="color: green;">'Zoom yap</span>

**           ** <span style="color: blue;">**Dim**</span>
**ZoomlananNokta** <span style="color: blue;">**As**</span> **Point =
DeepZoom.ElementToLogicalPoint(FareKonum)**

**            DeepZoom.ZoomAboutLogicalPoint(2, ZoomlananNokta.X,
ZoomlananNokta.Y)**

        <span style="color: blue;">Else</span>

            <span style="color: green;">'Uzaklaş</span>

      **     ** <span style="color: blue;">**Dim**</span>
**ZoomlananNokta** <span style="color: blue;">**As**</span> **Point =
DeepZoom.ElementToLogicalPoint(FareKonum)**

**            DeepZoom.ZoomAboutLogicalPoint(0.5, ZoomlananNokta.X,
ZoomlananNokta.Y)**

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

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> FareTekerlekDondu(<span
style="color: blue;">object</span> sender, System.Windows.Browser.<span
style="color: #2b91af;">HtmlEventArgs</span> e)

        {

            <span style="color: blue;">int</span> DonMiktar = 0;

            System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span> Gelen = e.EventObject;

            <span style="color: green;">//IE ve OPERA</span>

            <span style="color: blue;">if</span>
((Gelen.GetProperty(<span style="color: #a31515;">"wheelDelta"</span>)
!= <span style="color: blue;">null</span>)) {

                <span style="color: green;">//OPERA'da ters!</span>

                <span style="color: blue;">if</span>
((Gelen.GetProperty(<span style="color: #a31515;">"opera"</span>) !=
<span style="color: blue;">null</span>)) {

                    DonMiktar = -DonMiktar;

                }

                DonMiktar = (<span
style="color: blue;">int</span>)Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>);

            }

            <span style="color: green;">//Mozilla ve Safari</span>

            <span style="color: blue;">else</span> <span
style="color: blue;">if</span> ((Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>) != <span
style="color: blue;">null</span>)) {

                DonMiktar = -1 \* (<span
style="color: blue;">int</span>)Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>);

            }

            <span style="color: blue;">if</span> (DonMiktar \> 0) {

                <span style="color: green;">//Zoom yap</span>

**               ** <span style="color: #2b91af;">**Point**</span>
**ZoomlananNokta = DeepZoom.ElementToLogicalPoint(FareKonum);**

**                DeepZoom.ZoomAboutLogicalPoint(2, ZoomlananNokta.X,
ZoomlananNokta.Y);**

            }

            <span style="color: blue;">else</span> {

                <span style="color: green;">//Uzaklaş</span>

**               ** <span style="color: #2b91af;">**Point**</span>
**ZoomlananNokta = DeepZoom.ElementToLogicalPoint(FareKonum);**

**                DeepZoom.ZoomAboutLogicalPoint(0.5, ZoomlananNokta.X,
ZoomlananNokta.Y);**

            }

 

            <span style="color: blue;">if</span> (DonMiktar != 0) {

                e.PreventDefault();

                Gelen.SetProperty(<span
style="color: #a31515;">"returnValue"</span>, <span
style="color: blue;">false</span>);

            }

        }

İlk olarak **ElementToLogicalPoint** metodu ile elimizdeki fare
konumunun **DeepZoom** içerisinde tam olarak hangi koordinatlara
geldiğini buluyoruz. Sonrasında da **ZoomAboutLogicalPoint** metodu ile
zoom işlemini yapıyoruz. Zoom işlemi esnasında bizden üç parametre
isteniyor, zoom miktarı, zoomlanacak noktanın X ve Y koordinatları.
Böylece basit bir şekilde zoom işlemini de çözmüş olduk.

**Atraksyon zamanı!**

Yapılacaklar listemizde son bir öğe kaldı :) "Atraksyon". Şimdi biraz
hareketli birşeyler yapalım. Eğer uygulamanın başından beridir benimle
aynı adımları takip ediyorsunuz şu an DeepZoom kontrolü içerisinde yan
yana ve alt alta sıralı onlarca fotoğrafınız var demektir. Peki bu
fotoğrafları rastgele karıştıran bir düğme eklesek? Animasyonlarla
fotoğraf düğmeye her basıldığında rastgele olarak yerlerini
değiştirseler hoş olmaz mıydı? Belki de sizin istediğiniz farklı
sıralara bile gelebilirler. Hemen kolları sıvayalım ve XAML'ımıza basit
bir düğme ekleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication6.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="1024"</span><span style="color: red;">
Height</span><span style="color: blue;">="768"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MultiScaleImage</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="DeepZoom"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Height</span><span style="color: blue;">="65"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,0,30,19"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Bottom"</span><span style="color: red;">
Width</span><span style="color: blue;">="174"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="Karistis"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Karistir"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Artık uygulamamızın XAML kodu yukarıdaki şekilde olacak. Düğmeye
tıklandığında DeepZoom kontrolü içerisindeki tüm resimleri alarak
sırasını karıştırmamız sonra da animasyonlarla yeni konumlara
yerleştirmemiz gerek. İlk olarak resimleri karıştıracak olan kodu
yazalım.

**[VB]**

        <span style="color: blue;">Dim</span> FotoList <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> MultiScaleSubImage)

        FotoList = DeepZoom.SubImages.ToList()

 

        <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> FotoList.Count - 1

            <span style="color: blue;">Dim</span> Simdiki <span
style="color: blue;">As</span> MultiScaleSubImage = FotoList(x)

            FotoList.RemoveAt(x)

            FotoList.Insert(Rnd() \* FotoList.Count, Simdiki)

        <span style="color: blue;">Next</span>

**[C\#]**

            <span style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">MultiScaleSubImage</span>\> FotoList = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">MultiScaleSubImage</span>\>();

            FotoList = DeepZoom.SubImages.ToList();

            <span style="color: #2b91af;">Random</span> Rastgele = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Random</span>();

 

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> x = 0; x \<= FotoList.Count - 1; x++)

            {

                <span style="color: #2b91af;">MultiScaleSubImage</span>
Simdiki = FotoList[x];

                FotoList.RemoveAt(x);

                FotoList.Insert(Rastgele.Next(FotoList.Count), Simdiki);

            }

Bir **DeepZoom** içerisinde tüm resimler birer **MultiScaleSubImage**
olarak bulunuyor. DeepZoom içerisinden tüm listeyi alıp içerisindeki her
resmi listeden çıkartıp yeni bir rastgele indeks ile ekliyoruz. Böylece
her seferinde sıralamayı rastgele değiştirmiş olduk. Sıra geldi bu
sıralama ile resimleri sahnedeki yeni konumlarına birer animasyon ile
göndermeye.

**[VB]**

        <span style="color: blue;">Dim</span> KolonSayisi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 5

        <span style="color: blue;">Dim</span> SatirSayisi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 5

        <span style="color: blue;">Dim</span> ToplamEklenen <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0

 

        <span style="color: blue;">For</span> Satir <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> SatirSayisi

            <span style="color: blue;">For</span> Kolon <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> KolonSayisi

                <span style="color: blue;">If</span> ToplamEklenen \<\>
FotoList.Count <span style="color: blue;">Then</span>

 

....................                

 

        ToplamEklenen += 1

                <span style="color: blue;">Else</span>

        <span style="color: blue;">Exit</span> <span
style="color: blue;">Sub</span>

                <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

            <span style="color: blue;">Next</span>

        <span style="color: blue;">Next</span>

**[C\#]**

            <span style="color: blue;">int</span> KolonSayisi = 5;

            <span style="color: blue;">int</span> SatirSayisi = 5;

            <span style="color: blue;">int</span> ToplamEklenen = 0;

 

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> Satir = 0; Satir \<= SatirSayisi;
Satir++)

            {

                <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> Kolon = 0; Kolon \<= KolonSayisi;
Kolon++)

                {

                    <span style="color: blue;">if</span> (ToplamEklenen
!= FotoList.Count)

                    {

                       

..............................

 

                        ToplamEklenen += 1;

                    }

                    <span style="color: blue;">else</span>

                    {

                        <span style="color: blue;">break</span>;

                    }

                }

            }

Yukarıdaki kodumuzun orta kısmında birazdan her resmi farklı bir konuma
animasyon ile gönderen kodu yazacağız. Fakat onun öncesinde kodun ana
yapısını bir inceleyelim. Resimler yan yana ve alt alta sıralayacağımız
için aslında bir Grid yapısında görsellik yaratmış olacağız. Kodumuzda
**KolonSayisi** ve **SatirSayisi** değişkenleri kaç kolon ve satırlık
bir sıralama yapılacağını belirliyor. ToplamEklenen değişkeni ise o ana
kadar kaç fotoğraf eklediğimizi hafızada tutacak, böylece döngü
içerisinde eklenen toplam fotoğraf sayısı elimizdeki fotoğraf sayısına
ulaşırsa döngüden çıkacağız. Şimdi gelelim fotoğrafları yeni konumlarına
gönderecek animasyonları yaratacak kodumuza.

**[VB]**

        <span style="color: blue;">Dim</span> Foto <span
style="color: blue;">As</span> MultiScaleSubImage =
FotoList(ToplamEklenen)

        <span style="color: blue;">Dim</span> MevcutKonum <span
style="color: blue;">As</span> Point = Foto.ViewportOrigin

        <span style="color: blue;">Dim</span> HedefKonum <span
style="color: blue;">As</span> Point = <span
style="color: blue;">New</span> Point(-1.14 \* Kolon, -0.8 \* Satir)

 

        <span style="color: green;">'Animasyonu yaratalım</span>

        <span style="color: blue;">Dim</span> Anim <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Storyboard

        <span style="color: blue;">Dim</span> NoktaAnim <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
PointAnimationUsingKeyFrames

        <span style="color: blue;">Dim</span> KeyFrame <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
SplinePointKeyFrame

        KeyFrame.Value = HedefKonum

        KeyFrame.KeyTime = KeyTime.FromTimeSpan(TimeSpan.FromSeconds(1))

 

        <span style="color: blue;">Dim</span> Ivme <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
KeySpline

        Ivme.ControlPoint1 = <span style="color: blue;">New</span>
Point(0, 1)

        Ivme.ControlPoint2 = <span style="color: blue;">New</span>
Point(1, 1)

        KeyFrame.KeySpline = Ivme

        NoktaAnim.KeyFrames.Add(KeyFrame)

 

        Storyboard.SetTarget(NoktaAnim, Foto)

        Storyboard.SetTargetProperty(NoktaAnim, <span
style="color: blue;">New</span> PropertyPath(<span
style="color: #a31515;">"ViewportOrigin"</span>))

 

        Anim.Children.Add(NoktaAnim)

 

        Anim.Begin()

**[C\#]**

        <span style="color: #2b91af;">MultiScaleSubImage</span> Foto =
FotoList[ToplamEklenen];

<span style="color: #2b91af;">        Point</span> MevcutKonum =
Foto.ViewportOrigin;

<span style="color: #2b91af;">        Point</span> HedefKonum = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(-1.14 \* Kolon, -0.8 \* Satir);

 

<span style="color: green;">        //Animasyonu yaratalım </span>

<span style="color: #2b91af;">        Storyboard</span> Anim = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Storyboard</span>();

        <span
style="color: #2b91af;">PointAnimationUsingKeyFrames</span> NoktaAnim =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">PointAnimationUsingKeyFrames</span>();

        <span style="color: #2b91af;">SplinePointKeyFrame</span>
KeyFrame = <span style="color: blue;">new</span> <span
style="color: #2b91af;">SplinePointKeyFrame</span>();

        KeyFrame.Value = HedefKonum;

        KeyFrame.KeyTime = <span
style="color: #2b91af;">KeyTime</span>.FromTimeSpan(<span
style="color: #2b91af;">TimeSpan</span>.FromSeconds(1));

 

        <span style="color: #2b91af;">KeySpline</span> Ivme = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">KeySpline</span>();

        Ivme.ControlPoint1 = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 1);

        Ivme.ControlPoint2 = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(1, 1);

        KeyFrame.KeySpline = Ivme;

        NoktaAnim.KeyFrames.Add(KeyFrame);

 

        <span
style="color: #2b91af;">Storyboard</span>.SetTarget(NoktaAnim, Foto);

        <span
style="color: #2b91af;">Storyboard</span>.SetTargetProperty(NoktaAnim,
<span style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyPath</span>(<span
style="color: #a31515;">"ViewportOrigin"</span>));

 

        Anim.Children.Add(NoktaAnim);

 

        Anim.Begin();

Kodumuz biraz uzun gibi gözükse de aslında özünde yaptığımız şey çok
basit. İlk olarak döngümüzle oluşturduğumuz **ToplamEklenen** sayısı
üzerinden o anki resmi **FotoList** içerisinden bir değişkene alıyoruz.
**MevcutKonum** ve **HedefKonum** değişkenlerimiz ise fotoğrafın şu anki
ve animasyonun sonundaki konumlarını saklıyor. Yeni konum hesaplarken
kolon ve satır arası mesafelerle sayıları çarparak yeni konumu
rahatlıkla hesaplayabiliyoruz. Artık hedeflediğimiz konum da belli
olduğuna göre geriye kaldı eldeki fotoğrafı hedef konuma taşıyacak
animasyonu yaratmak. Animasyon yapacağımız şey fotoğrafın
**ViewportOrigin** özelliği ve bu özelliği **Point** tipinde. Bu nedenle
**PointAnimationUsingKeyFrame** kullanarak hedef **KeyFrame'i**
yaratacağız. Kodumuzda baktığımızda **KeyFrame** adındaki değişkenimiz 1
saniye sonra **ViewPortOrigin** değerini değiştiriyor. Ayrıca animasyonu
ivme vermek için bir de KeySpline kullanıyoruz. Tüm bu nesnelerin
birbirlerine eklenme şekilleri XAML'da bir StoryBoard yaratmaktan farklı
değil. Kodumuzun en sonunda artık animasyonumuzu çalıştırmak için Begin
metodunu çağırabiliriz.

**Herşey bitti**

Uygulamamız bitti. Artık istediğimiz kadar fotoğraflarımız arasında
geçebilir, zoom yapabilir hatta resimleri bir düğme ile animasyonlu bir
şekilde karıştırabiliriz. Uygulamanın tam kodunu aşağıda
inceleyebilirsiniz.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Dim</span> Tasiniyor = <span
style="color: blue;">False</span>

    <span style="color: blue;">Dim</span> FareKonum <span
style="color: blue;">As</span> Point

    <span style="color: blue;">Dim</span> DeepZoomOrigin <span
style="color: blue;">As</span> Point

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: green;">'Kaynağımızı bağlayalım</span>

        DeepZoom.Source = <span style="color: blue;">New</span>
DeepZoomImageTileSource(<span style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"NewFolder1/dzc\_output.xml"</span>,
UriKind.Relative))

 

        <span style="color: green;">'MouseWheel bağlantısı
yapalım</span>

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

            <span style="color: green;">'Zoom yap</span>

            <span style="color: blue;">Dim</span> ZoomlananNokta <span
style="color: blue;">As</span> Point =
DeepZoom.ElementToLogicalPoint(FareKonum)

            DeepZoom.ZoomAboutLogicalPoint(2, ZoomlananNokta.X,
ZoomlananNokta.Y)

        <span style="color: blue;">Else</span>

            <span style="color: green;">'Uzaklaş</span>

            <span style="color: blue;">Dim</span> ZoomlananNokta <span
style="color: blue;">As</span> Point =
DeepZoom.ElementToLogicalPoint(FareKonum)

            DeepZoom.ZoomAboutLogicalPoint(0.5, ZoomlananNokta.X,
ZoomlananNokta.Y)

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

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonDown

        Tasiniyor = <span style="color: blue;">True</span>

        FareKonum = e.GetPosition(<span style="color: blue;">Me</span>)

        DeepZoomOrigin = DeepZoom.ViewportOrigin

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseLeftButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonUp

        Tasiniyor = <span style="color: blue;">False</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_MouseMove(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.MouseEventArgs)
<span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseMove

        <span style="color: blue;">If</span> Tasiniyor <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> YeniDeepZoomOrigin
<span style="color: blue;">As</span> <span
style="color: blue;">New</span> Point

            YeniDeepZoomOrigin.X = DeepZoomOrigin.X -
(((e.GetPosition(DeepZoom).X - FareKonum.X) / DeepZoom.ActualWidth) \*
DeepZoom.ViewportWidth)

            YeniDeepZoomOrigin.Y = DeepZoomOrigin.Y -
(((e.GetPosition(DeepZoom).Y - FareKonum.Y) / DeepZoom.ActualHeight) \*
DeepZoom.ViewportWidth)

            DeepZoom.ViewportOrigin = YeniDeepZoomOrigin

        <span style="color: blue;">Else</span>

            FareKonum = e.GetPosition(<span
style="color: blue;">Me</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Karistir\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Karistir.Click

        <span style="color: blue;">Dim</span> FotoList <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> MultiScaleSubImage)

        FotoList = DeepZoom.SubImages.ToList()

 

        <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> FotoList.Count - 1

            <span style="color: blue;">Dim</span> Simdiki <span
style="color: blue;">As</span> MultiScaleSubImage = FotoList(x)

            FotoList.RemoveAt(x)

            FotoList.Insert(Rnd() \* FotoList.Count, Simdiki)

        <span style="color: blue;">Next</span>

 

        <span style="color: blue;">Dim</span> KolonSayisi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 5

        <span style="color: blue;">Dim</span> SatirSayisi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 5

        <span style="color: blue;">Dim</span> ToplamEklenen <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0

 

        <span style="color: blue;">For</span> Satir <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> SatirSayisi

            <span style="color: blue;">For</span> Kolon <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> KolonSayisi

                <span style="color: blue;">If</span> ToplamEklenen \<\>
FotoList.Count <span style="color: blue;">Then</span>

                    <span style="color: blue;">Dim</span> Foto <span
style="color: blue;">As</span> MultiScaleSubImage =
FotoList(ToplamEklenen)

                    <span style="color: blue;">Dim</span> MevcutKonum
<span style="color: blue;">As</span> Point = Foto.ViewportOrigin

                    <span style="color: blue;">Dim</span> HedefKonum
<span style="color: blue;">As</span> Point = <span
style="color: blue;">New</span> Point(-1.14 \* Kolon, -0.8 \* Satir)

 

                    <span style="color: green;">'Animasyonu
yaratalım</span>

                    <span style="color: blue;">Dim</span> Anim <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Storyboard

                    <span style="color: blue;">Dim</span> NoktaAnim
<span style="color: blue;">As</span> <span
style="color: blue;">New</span> PointAnimationUsingKeyFrames

                    <span style="color: blue;">Dim</span> KeyFrame <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
SplinePointKeyFrame

                    KeyFrame.Value = HedefKonum

                    KeyFrame.KeyTime =
KeyTime.FromTimeSpan(TimeSpan.FromSeconds(1))

 

                    <span style="color: blue;">Dim</span> Ivme <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
KeySpline

                    Ivme.ControlPoint1 = <span
style="color: blue;">New</span> Point(0, 1)

                    Ivme.ControlPoint2 = <span
style="color: blue;">New</span> Point(1, 1)

                    KeyFrame.KeySpline = Ivme

                    NoktaAnim.KeyFrames.Add(KeyFrame)

 

                    Storyboard.SetTarget(NoktaAnim, Foto)

                    Storyboard.SetTargetProperty(NoktaAnim, <span
style="color: blue;">New</span> PropertyPath(<span
style="color: #a31515;">"ViewportOrigin"</span>))

 

                    Anim.Children.Add(NoktaAnim)

 

                    Anim.Begin()

 

                    ToplamEklenen += 1

                <span style="color: blue;">Else</span>

                    <span style="color: blue;">Exit</span> <span
style="color: blue;">Sub</span>

                <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

            <span style="color: blue;">Next</span>

        <span style="color: blue;">Next</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> SilverlightApplication1

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : <span
style="color: #2b91af;">UserControl</span>

    {

        <span style="color: blue;">bool</span> Tasiniyor = <span
style="color: blue;">false</span>;

        <span style="color: #2b91af;">Point</span> FareKonum;

        <span style="color: #2b91af;">Point</span> DeepZoomOrigin;

 

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Page\_Loaded);

            <span
style="color: blue;">this</span>.MouseLeftButtonDown += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseButtonEventHandler</span>(Page\_MouseLeftButtonDown);

            <span style="color: blue;">this</span>.MouseLeftButtonUp +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">MouseButtonEventHandler</span>(Page\_MouseLeftButtonUp);

            <span style="color: blue;">this</span>.MouseMove += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">MouseEventHandler</span>(Page\_MouseMove);

            <span style="color: blue;">this</span>.Karistir.Click +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Karistir\_Click);

        }

 

        <span style="color: blue;">void</span> Karistir\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">MultiScaleSubImage</span>\> FotoList = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">MultiScaleSubImage</span>\>();

            FotoList = DeepZoom.SubImages.ToList();

            <span style="color: #2b91af;">Random</span> Rastgele = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Random</span>();

 

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> x = 0; x \<= FotoList.Count - 1; x++)

            {

                <span style="color: #2b91af;">MultiScaleSubImage</span>
Simdiki = FotoList[x];

                FotoList.RemoveAt(x);

                FotoList.Insert(Rastgele.Next(FotoList.Count), Simdiki);

            }

 

            <span style="color: blue;">int</span> KolonSayisi = 5;

            <span style="color: blue;">int</span> SatirSayisi = 5;

            <span style="color: blue;">int</span> ToplamEklenen = 0;

 

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> Satir = 0; Satir \<= SatirSayisi;
Satir++)

            {

                <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> Kolon = 0; Kolon \<= KolonSayisi;
Kolon++)

                {

                    <span style="color: blue;">if</span> (ToplamEklenen
!= FotoList.Count)

                    {

                        <span
style="color: #2b91af;">MultiScaleSubImage</span> Foto =
FotoList[ToplamEklenen];

                        <span style="color: #2b91af;">Point</span>
MevcutKonum = Foto.ViewportOrigin;

                        <span style="color: #2b91af;">Point</span>
HedefKonum = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(-1.14 \* Kolon, -0.8 \* Satir);

 

                        <span style="color: green;">//Animasyonu
yaratalım </span>

                        <span style="color: #2b91af;">Storyboard</span>
Anim = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Storyboard</span>();

                        <span
style="color: #2b91af;">PointAnimationUsingKeyFrames</span> NoktaAnim =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">PointAnimationUsingKeyFrames</span>();

                        <span
style="color: #2b91af;">SplinePointKeyFrame</span> KeyFrame = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">SplinePointKeyFrame</span>();

                        KeyFrame.Value = HedefKonum;

                        KeyFrame.KeyTime = <span
style="color: #2b91af;">KeyTime</span>.FromTimeSpan(<span
style="color: #2b91af;">TimeSpan</span>.FromSeconds(1));

 

                        <span style="color: #2b91af;">KeySpline</span>
Ivme = <span style="color: blue;">new</span> <span
style="color: #2b91af;">KeySpline</span>();

                        Ivme.ControlPoint1 = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 1);

                        Ivme.ControlPoint2 = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(1, 1);

                        KeyFrame.KeySpline = Ivme;

                        NoktaAnim.KeyFrames.Add(KeyFrame);

 

                        <span
style="color: #2b91af;">Storyboard</span>.SetTarget(NoktaAnim, Foto);

                        <span
style="color: #2b91af;">Storyboard</span>.SetTargetProperty(NoktaAnim,
<span style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyPath</span>(<span
style="color: #a31515;">"ViewportOrigin"</span>));

 

                        Anim.Children.Add(NoktaAnim);

 

                        Anim.Begin();

 

                        ToplamEklenen += 1;

                    }

                    <span style="color: blue;">else</span>

                    {

                        <span style="color: blue;">break</span>;

                    }

                }

            }

 

        }

 

        <span style="color: blue;">void</span> Page\_MouseMove(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">MouseEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (Tasiniyor)

            {

                <span style="color: #2b91af;">Point</span>
YeniDeepZoomOrigin = <span style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>();

                YeniDeepZoomOrigin.X = DeepZoomOrigin.X -
(((e.GetPosition(DeepZoom).X - FareKonum.X) / DeepZoom.ActualWidth) \*
DeepZoom.ViewportWidth);

                YeniDeepZoomOrigin.Y = DeepZoomOrigin.Y -
(((e.GetPosition(DeepZoom).Y - FareKonum.Y) / DeepZoom.ActualHeight) \*
DeepZoom.ViewportWidth);

                DeepZoom.ViewportOrigin = YeniDeepZoomOrigin;

            }

            <span style="color: blue;">else</span>

            {

                FareKonum = e.GetPosition(<span
style="color: blue;">this</span>);

            }

        }

 

        <span style="color: blue;">void</span>
Page\_MouseLeftButtonUp(<span style="color: blue;">object</span> sender,
<span style="color: #2b91af;">MouseButtonEventArgs</span> e)

        {

            Tasiniyor = <span style="color: blue;">false</span>;

        }

 

        <span style="color: blue;">void</span>
Page\_MouseLeftButtonDown(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">MouseButtonEventArgs</span> e)

        {

            Tasiniyor = <span style="color: blue;">true</span>;

            FareKonum = e.GetPosition(<span
style="color: blue;">this</span>);

            DeepZoomOrigin = DeepZoom.ViewportOrigin;

        }

 

        <span style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: green;">//Kaynağımızı bağlayalım</span>

            DeepZoom.Source = <span style="color: blue;">new</span>
<span style="color: #2b91af;">DeepZoomImageTileSource</span>(<span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"NewFolder1/dzc\_output.xml"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative));

 

            <span style="color: green;">//MouseWheel bağlantısı
yapalım</span>

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.AttachEvent(<span
style="color: #a31515;">"DOMMouseScroll"</span>, FareTekerlekDondu);

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, FareTekerlekDondu);

            System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.AttachEvent(<span
style="color: #a31515;">"onmousewheel"</span>, FareTekerlekDondu);

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> FareTekerlekDondu(<span
style="color: blue;">object</span> sender, System.Windows.Browser.<span
style="color: #2b91af;">HtmlEventArgs</span> e)

        {

            <span style="color: blue;">int</span> DonMiktar = 0;

            System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span> Gelen = e.EventObject;

            <span style="color: green;">//IE ve OPERA</span>

            <span style="color: blue;">if</span>
((Gelen.GetProperty(<span style="color: #a31515;">"wheelDelta"</span>)
!= <span style="color: blue;">null</span>)) {

                <span style="color: green;">//OPERA'da ters!</span>

                <span style="color: blue;">if</span>
((Gelen.GetProperty(<span style="color: #a31515;">"opera"</span>) !=
<span style="color: blue;">null</span>)) {

                    DonMiktar = -DonMiktar;

                }

                DonMiktar = (<span
style="color: blue;">int</span>)Gelen.GetProperty(<span
style="color: #a31515;">"wheelDelta"</span>);

            }

            <span style="color: green;">//Mozilla ve Safari</span>

            <span style="color: blue;">else</span> <span
style="color: blue;">if</span> ((Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>) != <span
style="color: blue;">null</span>)) {

                DonMiktar = -1 \* (<span
style="color: blue;">int</span>)Gelen.GetProperty(<span
style="color: #a31515;">"detail"</span>);

            }

            <span style="color: blue;">if</span> (DonMiktar \> 0) {

                <span style="color: green;">//Zoom yap</span>

                <span style="color: #2b91af;">Point</span>
ZoomlananNokta = DeepZoom.ElementToLogicalPoint(FareKonum);

                DeepZoom.ZoomAboutLogicalPoint(2, ZoomlananNokta.X,
ZoomlananNokta.Y);

            }

            <span style="color: blue;">else</span> {

                <span style="color: green;">//Uzaklaş</span>

                <span style="color: #2b91af;">Point</span>
ZoomlananNokta = DeepZoom.ElementToLogicalPoint(FareKonum);

                DeepZoom.ZoomAboutLogicalPoint(0.5, ZoomlananNokta.X,
ZoomlananNokta.Y);

            }

 

            <span style="color: blue;">if</span> (DonMiktar != 0) {

                e.PreventDefault();

                Gelen.SetProperty(<span
style="color: #a31515;">"returnValue"</span>, <span
style="color: blue;">false</span>);

            }

        }

    }

}

Hepinize kolay gelsin.


