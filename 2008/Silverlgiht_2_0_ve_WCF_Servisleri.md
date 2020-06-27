---
FallbackID: 2035
Title: "Silverlgiht 2.0 ve WCF Servisleri"
date: "2008-4-25"
EntryID: Silverlgiht_2_0_ve_WCF_Servisleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0, WCF
old.EntryID: ec53a760-d6fd-414d-aa78-22e0c04dcc19
---
.NET Framework 3.0 ile beraber karşımıza çıkan WCF servisleri aslında
çoktan klasik web servislerinin yerini de almış durumda. Tabi ki
doğrudan bir karşılaştırma yapmak çok yanlış olacaktır, WCF çok daha
geniş kapsamlı bir çerçevede değerlendirilmeli. Silverlight 2.0 tarafına
baktığımızda ise istemci ile sunucu arasındaki veri trafiğini klasik
ASMX web servislerine bağlayabileceğimiz gibi istersek doğrudan WCF
servislerini de kullanabiliyoruz. Bu yazıda Silverlight 2.0 Beta 1 ile
WCF servislerininin kullanımına değineceğiz.

**WCF servisimizi hazırlayalım.**

Visual Studio 2008 içerisinde yarattığımız yeni Silverlight projemize
eşlik eden Web Project içerisinde yeni bir WCF servisi yaratıyoruz.
Örneğimizde Silverlight tarafından gönderilen iki sayıfa WCF servisi
tarafından alınarak sunucu tarafından toplanacak ve geri döndürülecek.
Bu çerçevede uygun bir WCF servisini hazırlarken aşağıdaki kodları
yazmamız gerekiyor.

**[IService.vb]**

<span style="color: blue;">Imports</span> System.ServiceModel

 

\<ServiceContract()\> \_

<span style="color: blue;">Public</span> <span
style="color: blue;">Interface</span> IService

 

    \<OperationContract()\> \_

    <span style="color: blue;">Function</span> Toplama(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> y <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Interface</span>

**[Service.vb]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Service

    <span style="color: blue;">Implements</span> IService

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Toplama(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> y <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
<span style="color: blue;">Implements</span> IService.Toplama

        <span style="color: blue;">Return</span> x + y

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

WCF servisimiz hazır olduğuna göre Silverlight tarafına geçiş
yapabiliriz diye düşünüyorsunuz kesinlikle aldanıyorsunuz. Varsayılan
ayarları ile Visual Studio içerisinde herhangi bir WCF servisi
yarattılığında **wsHttpBinding** kullanılır oysa bizim Silverlight
tarafında **basicHttpBinding'e** ihtiyacımız var. O nedenle hemen
projemizin Web.Config dosyasına ufak bir yolculuk yaparak aşağıdaki
şekilde ayarlarda değişiklik yapmamız gerekiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">service</span><span style="color: blue;">
</span><span style="color: red;">behaviorConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ServiceBehavior</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Service</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">endpoint</span><span style="color: blue;">
</span><span style="color: red;">address</span><span
style="color: blue;">=</span>""<span style="color: blue;"> </span><span
style="color: red;">binding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**basicHttpBinding**</span>"<span
style="color: blue;"> </span><span
style="color: red;">contract</span><span
style="color: blue;">=</span>"<span
style="color: blue;">IService</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">identity</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">dns</span><span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">localhost</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">identity</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">endpoint</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">endpoint</span><span style="color: blue;">
</span><span style="color: red;">address</span><span
style="color: blue;">=</span>"<span
style="color: blue;">mex</span>"<span style="color: blue;"> </span><span
style="color: red;">binding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">mexHttpBinding</span>"<span style="color: blue;">
</span><span style="color: red;">contract</span><span
style="color: blue;">=</span>"<span
style="color: blue;">IMetadataExchange</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">service</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

Artık tüm ayarlarımız tamamladı. Silverlight 2.0 tarafına rahatlıkla
geçebiliriz.

**Silverlight 2.0 ve WCF bağlantısı**

WCF servisimiz ile Silverlight uygulamamızın aynı domain içerisinde
olması şart. Güvenlik kuralları nedeniyle "cross-domain" yani alan
adları arası veri trafiği oluşturma şansımız yok. Visual Studio
içerisinde Silverlight projenize sağ tıklayarak gelen menüden "**Add
Service Reference**" düğmesine basarak proje içerisinde WCF servisini
Silverlight uygulamasına referans olarak ekleyebilirsiniz.

İlk olarak gelin uygulamamızın XAML koduna bir göz atalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication3.Page</span>"

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
style="color: #a31515;">**TextBox**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">29</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">72,37,134,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Text</span><span style="color: blue;">=</span>"<span
style="color: blue;">TextBox</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Sayi1**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**TextBox**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">39</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">72,81,134,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Text</span><span style="color: blue;">=</span>"<span
style="color: blue;">TextBox</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Sayi2**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">114,144,188,122</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Topla**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**TextBlock**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">43</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">86,0,147,47</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Sonuc**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Şimdi kod tarafına geçerek bir önceki adımda referans olarak projemize
eklediğimiz WCF servisini kullanmaya başlayalım.

<span style="color: blue;">WithEvents</span> Servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
WCFServisim.ServiceClient

Yukarıdaki şekli ile servisimizi uygulama içerisinde global olarak
tanımlıyoruz. WCF servisimi bu şekilde tanımlamamın aslında önemli bir
nedeni var. Birazdan WCF servisi ile istemci tarafından suncuya bir veri
talebi gönderdiğimizde, yani toplanacak olan sayıları gönderip toplamı
istediğimizde aslında asenkron bir talepte bulunmuş olacağız. Klasik
Windows uygulamalarından alıştığımız yapıdan farklı olarak Silverlight
2.0 içerisinde WCF servislerinin kullanımı tamamen asenkron olarak
gerçekleşiyor. Durum böyle olunca asenkron bir istek sonrasında
sunucudan cevap (veri) geldiğinde bizim kodumuzun da durumdan haberdar
edilmesi gerekecek. Söz konusu haber yine WCF servisimize özel olan bir
başka event-handler'ın çalıştırılması ise bize ulaştırılacak. Aslında
dinamik olarak servisimizi yaratırken event-handler da bağlayabilirdik.
Ama Visual Basic ile yukarıdaki gibi bir kullanım çok daha rahat oluyor.
C\# programcıları dinamik event-handler bağlamayı kullanabilirler.

Global değişkenimizde WCF servisimiz hazır olduğuna göre artık düğmemize
bazıldığında söz konusu servisi rahatlıkla kullanabiliriz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Topla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Topla.Click

        Servis.ToplamaAsync(<span
style="color: blue;">Integer</span>.Parse(Sayi1.Text), <span
style="color: blue;">Integer</span>.Parse(Sayi2.Text))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz gibi **Servis** değişkenim üzerinden **ToplamaAsync**
metodunu çağırıyorum. Metodu çalıştırdıktan sonra sunucudan veri
geldiğinde bu metoda özel olan **ToplamaCompleted** event'ı
çalıştırılacak.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_ToplamaCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> WCFServisim.ToplamaCompletedEventArgs)
<span style="color: blue;"> **Handles**</span>
**Servis.ToplamaCompleted**

        Sonuc.Text = e.**Result**.ToString

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**ToplamaCompleted** event'ına gelen parametrelerden ikincisinin tipine
baktığımızda **ToplamaCompletedEventArgs** ile karşılaşıyoruz. Bu
tamamen bizim metodumuza özel bir değişken tipi. Buradan yola çıkarak
**e.Result** dediğimizde ise doğrudan bizim WCF metodumuzun döndürdüğü
nesneyi yakalayabiliyoruz. Örneğimizde gelen sonucu uygulama içerisinde
bir **TextBlock** içine yazdırıyoruz.

Kodumuzun tamamına baktığımızda aşağıdaki manzara ile karşılaşıyoruz.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">WithEvents</span> Servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
WCFServisim.ServiceClient

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Topla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Topla.Click

        Servis.ToplamaAsync(<span
style="color: blue;">Integer</span>.Parse(Sayi1.Text), <span
style="color: blue;">Integer</span>.Parse(Sayi2.Text))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_ToplamaCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> WCFServisim.ToplamaCompletedEventArgs)
<span style="color: blue;">Handles</span> Servis.ToplamaCompleted

        Sonuc.Text = e.Result.ToString

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**Peki ya C\# olsaydı?**

Visual Basic'e özel yapılar kullandığım için aynı kodun C\# muadilini de
sizlerle paylaşmak istiyorum. Böylece C\# programcıları için anlaşılması
çok daha kolay olacaktır.

<span style="color: blue;">namespace</span> SilverlightApplication4

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : UserControl

    {

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            Topla.**Click** += <span style="color: blue;">new</span>
RoutedEventHandler(**Topla\_Click**);

        }

 

        <span style="color: blue;">void</span> Topla\_Click(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            WCFServisim.ServiceClient **Servis** = <span
style="color: blue;">new</span> WCFServisim.ServiceClient();

            Servis.**ToplamaCompleted** += <span
style="color: blue;">new</span>
EventHandler\<WCFServisim.**ToplamaCompletedEventArgs**\>(**Servis\_ToplamaCompleted**);

            Servis.**ToplamaAsync**(<span
style="color: blue;">int</span>.Parse(Sayi1.Text), <span
style="color: blue;">int</span>.Parse(Sayi2.Text));

        }

 

        <span style="color: blue;">void</span>
**Servis\_ToplamaCompleted**(<span style="color: blue;">object</span>
sender, SilverlightApplication4.WCFServisim.ToplamaCompletedEventArgs e)

        {

            Sonuc.Text = e.**Result**.ToString();

        }

    }

}

Hepinize kolay gelsin.


