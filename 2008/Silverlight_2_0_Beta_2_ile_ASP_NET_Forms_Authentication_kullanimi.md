---
FallbackID: 2116
Title: Silverlight 2.0 Beta 2 ile ASP.NET Forms Authentication kullanımı
PublishDate: 8/7/2008
EntryID: Silverlight_2_0_Beta_2_ile_ASP_NET_Forms_Authentication_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 8ee754ae-1acb-444d-ab0a-39c40f771aae
---
ASP.NET Authentication mekanizmaları neredeyse tüm ASP.NET projelerinde
kullandığımız pratik çözümlerden. Özellikle Forms Authentication belki
de özellikle internet projelerinde en sık karşılaştığımız sistem. Peki
nasıl yaparız da **Silverlight 2.0 Beta 2** uygulamalarımızda **ASP.NET
Forms Authentication** yapısını kullanabiliriz?

**WCF üzerinden Authentication servisine ulaşalım.**

Silverlight tarafında sunucuyla veri alışverişi için en uygun seçim WCF
servisleri. Bu nedenle bize bir şekilde Authentication servisine
ulaşabileceğimiz bir servis gerekiyor. Yeni bir Silverlight projesi
yaratarak yanında gelen ASP.NET sitesiyle işlemlerimizi yapmaya
başlayalım.

ASP.NET'in kendi WCF Authentication servis altyapısını kullanacağız. Tek
ihtiyacımız olan bir Wrapper. Bunun için hemen ASP.NET sitesine sağ tuş
ile tıklayarak gelen menüden "Add New Item" diyip normal bir Text File
ekleyelim. Bu yeni dosyanın adını **Auth.svc** şeklinde düzenledikten
sonra içini açarak aşağıdaki kodu yapıştıralım.

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span
style="color: #a31515;">ServiceHost</span> <span
style="color: red;">Language</span><span
style="color: blue;">="VB"</span> <span
style="color: red;">Service</span><span
style="color: blue;">="System.Web.ApplicationServices.AuthenticationService"</span>
<span style="background: #ffee62;">%\></span>

Böylece servisimizi tamamladık. Sıra geldi bu servisin çalışması için
**Web.Config** içerisinde yapmamız gereken ayarlara. İlk olarak **Forms
Authentication** yapımızı ayarlayalım.

<span style="color: blue;">      \<</span><span
style="color: #a31515;">authentication</span><span style="color: blue;">
</span><span style="color: red;">mode</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Forms</span>"<span style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">forms</span><span style="color: blue;">
</span><span style="color: red;">loginUrl</span><span
style="color: blue;">=</span>"<span
style="color: blue;">default.aspx</span>"<span style="color: blue;">
</span><span style="color: red;">protection</span><span
style="color: blue;">=</span>"<span
style="color: blue;">All</span>"<span style="color: blue;"> </span><span
style="color: red;">timeout</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span style="color: blue;">/</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">credentials</span><span style="color: blue;">
</span><span style="color: red;">passwordFormat</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Clear</span>"<span style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">user</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">daron</span>"<span style="color: blue;">
</span><span style="color: red;">password</span><span
style="color: blue;">=</span>"<span
style="color: blue;">123</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">credentials</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">forms</span><span style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">authentication</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">authorization</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">deny</span><span style="color: blue;">
</span><span style="color: red;">users</span><span
style="color: blue;">=</span>"<span style="color: blue;">?</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">authorization</span><span
style="color: blue;">\></span>

Yukarıdaki kodumuz ile **default.aspx** haricindeki sitedeki her şeyi
dışarıya kapadık. Çok uğraşmamak için hemen Web.Config içerisinde de bir
kullanıcı tanımladım. Normalde bu tarz bir yapıyı kimseye tavsiye
etmiyorum. Tabi tüm dosyaları dışarıya kapadığımız için Silverlight
uygulaması da **Auth.svc** servisine de ulaşamayacak. O nedenle
servisimizi Authentication dışında tutup herkese açmamız lazım.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">location</span><span style="color: blue;">
</span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auth.svc</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">authorization</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">allow</span><span style="color: blue;">
</span><span style="color: red;">users</span><span
style="color: blue;">=</span>"<span style="color: blue;">\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">authorization</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">location</span><span
style="color: blue;">\></span>

Forms Authentication ayarlarımızı tamamladığımıza göre artık WCF
servisimizle ilgili ayarları da yapabiliriz.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">system.serviceModel</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">service</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">System.Web.ApplicationServices.AuthenticationService</span>"

<span style="color: blue;">              </span><span
style="color: red;">behaviorConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AuthenticationServiceTypeBehaviors</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">endpoint</span><span style="color: blue;">
</span><span style="color: red;">contract</span><span
style="color: blue;">=</span>"<span
style="color: blue;">System.Web.ApplicationServices.AuthenticationService</span>"

<span style="color: blue;">                  </span><span
style="color: red;">binding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">basicHttpBinding</span>"<span style="color: blue;">
</span><span style="color: red;">bindingConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">userHttp</span>"

<span style="color: blue;">                  </span><span
style="color: red;">bindingNamespace</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://asp.net/ApplicationServices/v200</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">service</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">services</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">bindings</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">basicHttpBinding</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">binding</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">userHttp</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">security</span><span style="color: blue;">
</span><span style="color: red;">mode</span><span
style="color: blue;">=</span>"<span
style="color: blue;">None</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">binding</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">basicHttpBinding</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">bindings</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">behaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">serviceBehaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">behavior</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AuthenticationServiceTypeBehaviors</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">serviceMetadata</span><span
style="color: blue;"> </span><span
style="color: red;">httpGetEnabled</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">behavior</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">serviceBehaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">behaviors</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<!--</span><span style="color: green;">
HTTP üzerinden servise ulaşımı sağlar. </span><span
style="color: blue;">--\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">serviceHostingEnvironment</span><span
style="color: blue;"> </span><span
style="color: red;">aspNetCompatibilityEnabled</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">system.serviceModel</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<!--</span><span
style="color: green;">Authentication servisini dışarıya açar</span><span
style="color: blue;">--\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">system.web.extensions</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">scripting</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">webServices</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">authenticationService</span><span
style="color: blue;"> </span><span
style="color: red;">enabled</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">
</span><span style="color: red;">requireSSL</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">webServices</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">scripting</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">system.web.extensions</span><span
style="color: blue;">\></span>

Her şey hazır. Internet tarayıcınızda Auth.svc adresini açtığınızda
servisin çalışır halde olduğunu görebilirsiniz. Sıra geldi Silverlight
ile bu servisi kullanmaya.

**WCF Authentication Servisimiz Silverlight ile dilleniyor.**

Herhangi bir WCF servisini Silverlight uygulamamıza linklermiş gibi yine
projeye sağ tıklayarak "Add Service Reference" diyerek referansımızı
yaratıyoruz. Sonrasında artık kod içerisinde tüm Authentication
mekanizmalarını kullanabiliriz.

**[VB]**

    <span style="color: blue;">WithEvents</span> Servisim <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.AuthenticationServiceClient

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Giris\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Giris.Click

        Servisim.LoginAsync(Kullanici.Text, Sifre.Text, <span
style="color: #a31515;">""</span>, <span
style="color: blue;">True</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servisim\_LoginCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
ServiceReference1.LoginCompletedEventArgs) <span
style="color: blue;">Handles</span> Servisim.LoginCompleted

        Giris.Content = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            Giris.Click += <span style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Giris\_Click);

        }

 

        <span style="color: blue;">void</span> Giris\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            ServiceReference1.<span
style="color: #2b91af;">AuthenticationServiceClient</span> Servisim =
<span style="color: blue;">new</span>
SilverlightApplication2.ServiceReference1.<span
style="color: #2b91af;">AuthenticationServiceClient</span>();

            Servisim.LoginCompleted += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<SilverlightApplication2.ServiceReference1.<span
style="color: #2b91af;">LoginCompletedEventArgs</span>\>(Servisim\_LoginCompleted);

            Servisim.LoginAsync(Kullanici.Text, Sifre.Text, <span
style="color: #a31515;">""</span>, <span
style="color: blue;">true</span>);

        }

 

        <span style="color: blue;">void</span>
Servisim\_LoginCompleted(<span style="color: blue;">object</span>
sender, SilverlightApplication2.ServiceReference1.<span
style="color: #2b91af;">LoginCompletedEventArgs</span> e)

        {

            Giris.Content = e.Result.ToString();

        }

Yukarıdaki örnek kodlar içerisinde WCF servisimizin LoginAsync metodunu
kullanarak bir Login işlemi yapmaya çalışıyoruz. Yine servis ile beraber
gelen event'lardan biri olan LoginCompleted durumunda ise Login
işleminin başarılı olup olmadığını ekrana yazdırıyoruz. Bu şekilde
servis içerisinde kullanabileceğiniz **Logout**, **IsLoggedIn** gibi
metodlar da bulunuyor.

Hepinize kolay gelsin.


