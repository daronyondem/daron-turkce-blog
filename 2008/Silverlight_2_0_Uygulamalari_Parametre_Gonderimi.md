---
FallbackID: 2040
Title: Silverlight 2.0 Uygulamaları Parametre Gönderimi
PublishDate: 29/4/2008
EntryID: Silverlight_2_0_Uygulamalari_Parametre_Gonderimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 4834596e-b5ec-450f-8e3c-cfba929d958e
---
Silverlight 2.0 uygulamalarını web sayfalarımıza **OBJECT** tagları ile
koyacağımızı biliyoruz. Artık Silverlight 1.0'daki gibi JavaScript ile
uğraşmak durumunda kalmayacağız. Durum böyle olunca tabi ki bu
uygulamalara dışarıdan belirli durumlarda parametreler de göndermek
gerekecek.

Örneğin bir Video Player hazırladınız ve aynı sayfada birden çok Video
göstermek için kullanacaksınız fakat bu videolar da sunucu tarafındaki
veriye bağlı olacak. Yani özetle Video Player Silverlight uygulamamız
bir ASP.NET Repeater içerisindeyse video dosyasının adını nasıl
Silverlight uygulamamıza aktarırız?

**Dışarıdan Parametre Gönderimi**

İlk olarak sayfamız içerisinde Object tagları arasında bir yerlerde
parametrelerimizi belirtmemiz lazım. Bunun için aşağıdaki gibi bir yapı
kullanabiliriz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">object</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/x-silverlight</span>"

<span style="color: blue;">        </span><span
style="color: red;">width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">
</span><span style="color: red;">height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">param</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span style="color: blue;">source</span>"

<span style="color: blue;">        </span><span
style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ClientBin/deneme.xap</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">**  \<**</span><span
style="color: #a31515;">**param**</span><span style="color: blue;"> ****
</span><span style="color: red;">**name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**initParams**</span>**"**

<span style="color: blue;">**       ** </span><span
style="color: red;">**value**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**metin=osman**</span>"<span style="color: blue;">
**/\>**</span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

İsterseniz parametre sayısını arttırmak için yukarıdaki param tagının
**value** özelliğine birden çok parametre ve değer çifti verebilirsiniz.
Tek yapmanız gereken *metin=osman,deger=xx* şeklinde çiftleri
birbirinden birer virgül ile ayırmak. Eğer ASP.NET ile beraber gelecek
Silverlight sunucu kontrolünü kullanarak uygulamanızı sayfanıza
ekliyorsanız bu durumda aşağıdaki gibi bir yapı kullanabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">asp:Silverlight</span><span
style="color: blue;"> </span><span style="color: red;">ID</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Xaml1</span>"<span style="color: blue;">
</span><span style="color: red;">runat</span><span
style="color: blue;">=</span>"<span
style="color: blue;">server</span>"<span style="color: blue;"> </span>

<span style="color: blue;">                </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\~/ClientBin/deneme.xap</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">                </span><span
style="color: red;"> **InitParameters**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**metin=osman**</span>"<span style="color: blue;">
</span>

<span style="color: blue;">                </span><span
style="color: red;">Version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">2.0</span>"<span style="color: blue;"> </span>

<span style="color: blue;">                </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;"> </span>

<span style="color: blue;">                </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;"> /\></span>

**Peki uygulama içerisinde nasıl kullanacağız?**

Bir önceki bölümde verdiğimiz parametrelere Silverlight uygulamaları
içerisinde **Application** nesnesinin **Startup** durumunda
erişebiliyoruz. Söz konusu durumu uygulamanızın **App.xaml** dosyası
içerisinde kodlayabiliyorsunuz.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Application\_Startup(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
StartupEventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Startup

    e.InitParams(<span style="color: #a31515;">"metin"</span>)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki şekli ile Application nesnesinin Startup durumuna parametre
olarak gelen **StartupEventArgs** üzerinden **InitParams** dizisinde
parametrelerimizi bulabiliyoruz. Fakat aslında bizim esas istediğimiz bu
parametrelere doğrudan uygulamamızın ana XAML dosyalarında ulaşabiliyor
olmak. Bunun için biraz daha uğraşmamız gerekecek. İlk olarak gelin
içerisinde bir **TextBlock** olan XAML kodumuza bakalım. **Metin**
parametresi ile Silverlight uygulamasına aktarılan metni bu TextBlock
içerisinde göstereceğiz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication10.Page</span>"

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
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">29,26,41,48</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Metin</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Görüldüğü üzere ortada çok karışık bir durum yok. Sadece bir TextBlock
var. Peki nasıl olacak da parametrelerimizi sayfamıza aktaracağız.
Aslında sayfa dediğimiz XAML dosyaları birer Class.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

.........................

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki kod bizim herhangi bir XAML kodumuzun arkasında .NET kodunu
gösteriyor. Page adında bir sınıf tanımlanmış ve bu sınıf aslında
aşağıdaki şekilde XAML kodumuza da bağlanmış durumda.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
**** </span><span style="color: red;">**x:Class**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**SilverlightApplication10.Page**</span>"

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

Yani her XAML dosyası aslında birer sınıf olarak tanımlanıyor. Peki
başlangıçta hangi XAML dosyasının açılacağı nasıl ayarlanıyor? Gelin
App.XAML içerisindeki orijinal StartUp eventının koduna bir göz atalım.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Application\_Startup(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
StartupEventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Startup

    <span style="color: blue;">Me</span>.RootVisual = <span
style="color: blue;">New</span> Page()

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İşte tam bu noktada uygulama açıldığında bizim Page sınıfından bir adet
yaratılarak uygulamanın ana görseli haline getirilmiş. Yani bir XAML
dosyasını yüklemek için aslında söz konusu XAML koduna bağlı .NET sınıfı
kullanılmış. Bu durumda biz Page sınıfımızı bir Property eklesek ve bu
Property'ye Application Startup'daki parametreleri aktarsak Page sınıfı
içerisinden de tüm parametrelere ulaşmaz mıyız?

Kesinlikle ulaşırız. Hatta üzerine bir de yeni alternatif bir
Constructer yazdık mı aslında işimiz daha da kolaylaşır. Gelin tek tek
bunları yapalım.

<span style="color: blue;">Private</span> PInitParams <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>)

<span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> InitParams() <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>)

    <span style="color: blue;">Get</span>

        <span style="color: blue;">Return</span> PInitParams

    <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>))

        PInitParams = value

    <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

Yukarıdaki gördüğünüz Property'yi **Page** sınıfı içerisinde
kullanacağız. Bu Property aslında Application Startup'taki tüm
**InitParams'ları** taşıyabilecek. Zaten söz konusu **InitParams'ın**
tipine de baktığımızda **System.Collections.Generic.IDictionary(Of
String, String))** ile karşılaşıyoruz. Sıra geldi bir de yeni
Constructor yazmaya.

<span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
IncInitParams <span style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>))

    <span style="color: blue;">Me</span>.InitParams = IncInitParams

    InitializeComponent()

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kodu da ekledikten sonra artık istersek yeni bir **Page**
sınıfı yaratırken atanacak olan Parametre listesini de verebiliriz.
**Page** sınıfımızın tam kodu aşağıdaki şekilde sonlanıyor.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Private</span> PInitParams <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>)

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **InitParams**() <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>)

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PInitParams

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>))

            PInitParams = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
**IncInitParams** <span style="color: blue;">As</span>
System.Collections.Generic.IDictionary(<span
style="color: blue;">Of</span> <span style="color: blue;">String</span>,
<span style="color: blue;">String</span>))

        <span style="color: blue;">Me</span>.**InitParams** =
**IncInitParams**

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Metin.Text = **InitParams**(<span
style="color: #a31515;">"metin"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Page.Loaded durumunda da **Page** sınıfımızın kendi Property'si olan
**InitParams** üzerinden **Metin** parametresini alarak TextBlock
içerisine yazdırıyoruz. Peki App.xaml'ın arkasına ne yazdık?

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> App

    <span style="color: blue;">Inherits</span> Application

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Application\_Startup(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
StartupEventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Startup

        <span style="color: blue;">Me</span>.RootVisual = <span
style="color: blue;">New</span> **Page(e.InitParams)**

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz gibi Page sınıfını yaratırken doğrudan uygulamaya gelen tüm
parametrelerin listesini de sınıfımıza aktarıyoruz. Böylece artık Page
sınıfında da söz konusu tüm parametrelere ulaşılabilecek.

Hepinize kolay gelsin.


