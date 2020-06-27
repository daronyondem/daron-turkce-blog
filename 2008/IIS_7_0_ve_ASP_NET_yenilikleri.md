---
FallbackID: 2160
Title: "IIS 7.0 ve ASP.NET yenilikleri."
date: "2008-8-20"
EntryID: IIS_7_0_ve_ASP_NET_yenilikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, IIS 7.0, ASP.NET
old.EntryID: c1a37cdf-9edc-4c68-a3f9-92198b0cfaed
---
Server 2008 ile beraber IIS 7.0'ın gelmesi özellikle ASP.NET
geliştiricileri için büyük kolaylıklar sunuyor. Bu yazımda sizlere bu
kolaylıklardan ufak bir demet sunarken özellikle HttpModule yazma ve IIS
7.0 tarafında kullanma konusuna değineceğim.

**Web.Config içindeki hazine**

Web.Config dosyası normalde biz yazılım geliştiricilerin sadece kendi
uygulamaları ile ilgili ayarları sakladıkları bir yerdi. Oysa artık IIS
içerisinde web uygulamanızın çalıştığı sitenin ayarları ile
uygulamanızın ayarlarına aynı gözle bakabiliriz. Bunun bir sonucu olarak
aynı site ile ilgili hem programatik ayarlar hem de IIS üzerindeki
ayarlar artık Web.Config içerisinde saklanıyor. Gelin Visual Studio 2008
ile yarattığımız yeni bir ASP.NET sitesinin Web.Config dosyasının ufak
bir bölümüne göz atalım.

<span style="color: blue;">    \<!--</span><span style="color: green;">
</span>

<span style="color: green;">        The system.webServer section is
required for running ASP.NET AJAX under Internet</span>

<span style="color: green;">        Information Services 7.0.  It is not
necessary for previous version of IIS.</span>

<span style="color: green;">    </span><span
style="color: blue;">--\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">validation</span><span style="color: blue;">
</span><span
style="color: red;">validateIntegratedModeConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptModule</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptModule</span>"<span style="color: blue;">
</span><span style="color: red;">preCondition</span><span
style="color: blue;">=</span>"<span
style="color: blue;">managedHandler</span>"<span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">System.Web.Handlers.ScriptModule,
System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
PublicKeyToken=31BF3856AD364E35</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">handlers</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WebServiceHandlerFactory-Integrated</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptHandlerFactory</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptHandlerFactoryAppServices</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptResource</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptHandlerFactory</span>"<span
style="color: blue;"> </span><span style="color: red;">verb</span><span
style="color: blue;">=</span>"<span style="color: blue;">\*</span>"<span
style="color: blue;"> </span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\*.asmx</span>"<span style="color: blue;">
</span><span style="color: red;">preCondition</span><span
style="color: blue;">=</span>"<span
style="color: blue;">integratedMode</span>"

<span style="color: blue;">            </span><span
style="color: red;">type</span><span style="color: blue;">=</span>"<span
style="color: blue;">System.Web.Script.Services.ScriptHandlerFactory,
System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
PublicKeyToken=31BF3856AD364E35</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptHandlerFactoryAppServices</span>"<span
style="color: blue;"> </span><span style="color: red;">verb</span><span
style="color: blue;">=</span>"<span style="color: blue;">\*</span>"<span
style="color: blue;"> </span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\*\_AppService.axd</span>"<span
style="color: blue;"> </span><span
style="color: red;">preCondition</span><span
style="color: blue;">=</span>"<span
style="color: blue;">integratedMode</span>"

<span style="color: blue;">            </span><span
style="color: red;">type</span><span style="color: blue;">=</span>"<span
style="color: blue;">System.Web.Script.Services.ScriptHandlerFactory,
System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
PublicKeyToken=31BF3856AD364E35</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptResource</span>"<span style="color: blue;">
</span><span style="color: red;">preCondition</span><span
style="color: blue;">=</span>"<span
style="color: blue;">integratedMode</span>"<span style="color: blue;">
</span><span style="color: red;">verb</span><span
style="color: blue;">=</span>"<span
style="color: blue;">GET,HEAD</span>"<span style="color: blue;">
</span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptResource.axd</span>"<span
style="color: blue;"> </span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">System.Web.Handlers.ScriptResourceHandler,
System.Web.Extensions, Version=3.5.0.0, Culture=neutral,
PublicKeyToken=31BF3856AD364E35</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">handlers</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

Gördüğünüz gibi normalden farklı olarak Web.Config içerisinde
**system.webServer** adında bir tagımız var. Zaten tag ile ilgili
gerekli açıklama İngilizce olarak hemen üstündeki yorum satırlarında
yapılmış. **system.webServer** tagları arasındaki ayarlar sadece IIS 7.0
içerisinde geçerli olacak ve burada yapılan ayarlar ile bu uygulamanın
çalışacağı IIS içerisinde sitedeki modüller ve HttpHandler'lar
düzenlenmiş olacak. Böylece artık IIS 7.0'a bir site yükledikten sonra
ayarlarını yapabilmeniz için harici bir web paneli kullanmanız veya
sunucuda admin haklarına sahip olmanız gerekmiyor. Doğrudan neredeyse
tüm ayarları Web.Config içerisinde düzenleyebiliyoruz.

Bu sistemin bir diğer avantajı ise kendi bilgisayarınızda çalıştığınız
IIS üzerinde yaptığınız tüm ayarların otomatik olarak sunucuya
Web.Config dosyasının atılması ile karşı tarafa da yansıması. Böylece
"*Benim bilgisayarımda çalışıyor ve sunucuya atınca çalışmıyor*"
şikayetlerine son geliyor diyebiliriz. Artık web sitenizi sunucuya
yüklediğinizde tüm ayarlarını da karşı tarafa aktarmış oluyorsunuz.

**Ufak bir örnek...**

IIS içerisinde her web sitesinin otomatik olarak açılmaya ayarlı
sayfaları vardır. Genelde bunlar **default.htm, default.aspx** gibi
sayfalardır ve varsayılan ayarlar ile karşımıza çıkarlar. Böylece
sunucuya bir site yüklediğinizde ilk olarak hangi sayfanın açılması
gerektiği belirtilmiş olur. Eğer bu ayarı IIS 6.0'da değiştirmek
isterseniz ya hosting sağlayıcınızın size bir yönetim paneli sunması
lazım ya da yine size özel script hakları ayarlaması gerekir. Oysa IIS
7.0 içerisinde bu ayar Web.Config içerisinde saklanıyor. Nasıl mı?

Bilgisayarınızda IIS 7.0 Manager'ı açarak ASP.NET web sitenizi seçin ve
IIS Manager içerisinde "**Default** **Document**" kısmına giderek yeni
bir doküman ismi ekleyin.

![IIS 7.0 içerisinde "Default Document"
ayarı.](media/IIS_7_0_ve_ASP_NET_yenilikleri/20082008_1.png)\
*IIS 7.0 içerisinde "Default Document" ayarı.*

Bu yaptığınız ayarı kendi bilgisayarınıza yaptınız ve sitenizi sunucuya
yüklediğinizde tekrar yapmanız gerekecek! dersem de inanmayın. Çünkü IIS
7.0 içerisindeki bu ayar aslında söz konusu web sitesindeki Web.Config
dosyasına yazıldı, aynen aşağıdaki gibi;

<span style="color: blue;">  \<</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">defaultDocument</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">files</span><span style="color: blue;">\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ornek.aspx</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">files</span><span style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">defaultDocument</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

Gördüğünüz gibi IIS içerisinde yeni bir "Default Document" eklemek için
aslında tek yapmanız gereken Web.Config'de gerekli tanımlamaları yapmak.
Bunun gibi daha birçok ayar tamamen Web.Config içerisine hapsedilmiş
durumda. Böylece çoğu sorundan kolayca kurtulmak mümkün.

**HttpModule yazalım...**

IIS 7.0'ın çalışma yapısı ile IIS 6.0'ın yapısı arasında büyük fark var.
IIS 6.0'da ISAPI önünde **HttpModule** yazabilirken IIS 7.0'da aslında
çok daha düşük seviyelere inebiliyoruz. Örneğin ASP.NET ile yazdığınız
bir HttpModule otomatik olarak sitenizdeki tüm HTML dosyalarını ve PHP
sayfaları bile etkileyebiliyor. Bunun nedeni HttpModule'ün doğrudan
IIS'in ana motoru üzerinde çalışıyor olması, yani tam bir entegrasyon
söz konusu.

Bir HttpModule yazmak için basit bir şekilde yeni bir sınıf oluşturarak
**iHttpModule** interface'ini implemente etmek yeterli olacaktır. Bu
işlemi yaptıktan sonra HttpApplication üzerinden bir Request işleminin
tüm event'larına ulaşabilirsiniz. Örneğin aşağıdaki gibi bir HttpModule
web sayfası içerisinde açılan her sayfanın başına bir metin
ekleyecektir.

**[VB]**

<span style="color: blue;">Imports</span> Microsoft.VisualBasic

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Class2

    <span style="color: blue;">Implements</span> IHttpModule

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Dispose() <span
style="color: blue;">Implements</span> System.Web.IHttpModule.Dispose

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Init(<span
style="color: blue;">ByVal</span> context <span
style="color: blue;">As</span> System.Web.HttpApplication) <span
style="color: blue;">Implements</span> System.Web.IHttpModule.Init

        <span style="color: blue;">Dim</span> myapp = <span
style="color: blue;">CType</span>(context, HttpApplication)

        <span style="color: blue;">AddHandler</span> myapp.BeginRequest,
<span style="color: blue;">AddressOf</span> myapp\_BeginRequest

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> myapp\_BeginRequest(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs)

        <span style="color: blue;">Dim</span> myapp = <span
style="color: blue;">CType</span>(sender, HttpApplication)

        myapp.Context.Response.Write(<span
style="color: #a31515;">"Deneme"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Class1</span> : <span
style="color: #2b91af;">IHttpModule</span>

{

    <span style="color: blue;">public</span> Class1()

    {

 

    }

 

    <span style="color: blue;">public</span> <span
style="color: blue;">void</span> Dispose()

    {

        <span style="color: blue;">throw</span> <span
style="color: blue;">new</span> <span
style="color: #2b91af;">NotImplementedException</span>();

    }

 

    <span style="color: blue;">public</span> <span
style="color: blue;">void</span> Init(<span
style="color: #2b91af;">HttpApplication</span> context)

    {

        <span style="color: #2b91af;">HttpApplication</span> myapp =
(<span style="color: #2b91af;">HttpApplication</span>)context;

        myapp.BeginRequest += <span style="color: blue;">new</span>
<span style="color: #2b91af;">EventHandler</span>(myapp\_BeginRequest);

    }

 

    <span style="color: blue;">void</span> myapp\_BeginRequest(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">EventArgs</span> e)

    {

        <span style="color: #2b91af;">HttpApplication</span> myapp =
(<span style="color: #2b91af;">HttpApplication</span>)sender;

        myapp.Context.Response.Write(<span
style="color: #a31515;">"Deneme"</span>);

    }

}

Tabi bu gibi bir HttpModule'ü kullanabilmeniz için Web.Config içerisinde
gerekli ayarlamayı da yapmanız gerekir.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">validation</span><span style="color: blue;">
</span><span
style="color: red;">validateIntegratedModeConfiguration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WindowsAuthentication</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">UrlMappingsModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">UrlAuthorization</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">StaticFileModule</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">StaticCompressionModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Session</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ServiceModel</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">RoleManager</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">RequestMonitorModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">RequestFilteringModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ProtocolSupportModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Profile</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">OutputCache</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">IsapiModule</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">IsapiFilterModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">HttpLoggingModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">HttpCacheModule</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">FormsAuthentication</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">FileAuthorization</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">DirectoryListingModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">DefaultDocumentModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">DefaultAuthentication</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CustomErrorModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ConfigurationValidationModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AnonymousIdentification</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AnonymousAuthenticationModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">remove</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptModule</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">DefaultDocumentModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AnonymousAuthenticationModule</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">          **  \<**</span><span
style="color: #a31515;">**add**</span><span style="color: blue;"> ****
</span><span style="color: red;">**name**</span><span
style="color: blue;">**=**</span>"<span
style="color: #0000FF">**YeniModul**</span>"<span style="color: blue;">
**** </span><span style="color: red;">**type**</span><span
style="color: blue;">**=**</span>"<span style="color: blue;">**Class12
/\>**</span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">system.webServer</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde IIS 7.0'ın mödüllerini düzenliyoruz. İlk
olarak tüm modülleri pasif hale getirerek kullanmayacağımız işlemleri
iptal ediyoruz. Sonrasında da sadece üç modül istiyoruz. Bunlardan
**DefaultDocumentModule** otomatik olarak varsayılan dokümanın
açılmasını sağlıyor. **AnonymousAuthenticationModule** ise anonim
ulaşımı sağlıyor. Sonrasında da bizim yazdığımız **HttpModule'ün** sınıf
ismini taşıyan yeni modülümüzü ekliyoruz. Böylece artık bu web sitesi
içerisindeki tüm isteklerde bu modül de çalışacak.

İsterseniz tüm bu modül ayarlarını otomatik olarak IIS Manager
içerisinde de yapabilirsiniz. Ayarlamaları yapacağınız web sitesini
seçtikten sonra "**Modules**" kısmına geçerek tüm modülleri silebilir,
sağ menüden "**Add Managed Module**" diyerek site içerisinde yazılmış
modülleri bularak ekleyebilirsiniz.

**Başka neler var?**

IIS 7.0 içerisinde FastCGI ile PHP desteği geliyor. Hatta PHP tarafında
da yukarıdaki HttpModule'lerin çalıştığını düşünürseniz PHP ile tüm bu
modülleri kullanabileceğiniz sonucuna varabilirsiniz. Örneğin ASP.NET
Forms Authentication modülünü PHP ile kullanabilirsiniz hatta böylece
yarısı PHP yarısı ASP.NET ile yazılmış bir sitede global Authentication
sistemi bile kurmuş olursunuz. Daha bu gibi bir çok esnekliğe sahip olan
IIS 7.0 ile yazılım geliştirme ortamı arıyorsanız Vista ile beraber IIS
7.0'ın geldiğini de hatırlatmak isterim.

Hepinize kolay gelsin.


