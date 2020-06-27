---
FallbackID: 2401
Title: "Silverlight 3.0 içerisinde Navigation API'yı inceliyoruz."
date: "2009-9-5"
EntryID: Silverlight_3_0_icerisinde_Navigation_API_yi_inceliyoruz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 50b7d2c8-13f5-4f82-b458-4f887a538448
---
İster AJAX sitelerinde olsun ister Silverlight bir şekilde istemci
tarafında sayfanın manipüle edildiği web uygulamalarındaki dertlerden
biri URL'in değişmiyor olması ile beraber tarayıcı geçmişinin de
çalışamaması. İlk bakışta belki büyük bir sorun gibi gözükmese de
müşterilerinize teslim ettiğiniz bu gibi projelerin sonrasında aldığınız
geri dönüşler emin olun sizi bu konuda ciddi şekilde şaşırtabilir.

**Navigation API ile sorunlara çözüm....**

Silverlight uygulamaları içerisindeki Navigation konseptini çözmeyi
hedefleyen Navigation kontrolleri ve API aynı anda yukarıdak
bahsettiğimiz URL'in duruma göre değişebilmesi ve hatta istemci taraflı
URLReWriting yapılabilmesini de sağlıyor. Bu çerçevede yeni bir
Silverlight projesi yaratarak adım adım ilerleyelim.

İlk olarak uygulamanızda Navigation API kullanacaksanız hemen
**System.Windows.Controls.Navigation** assembly'sini referans olarak
almanız gerekiyor. Bu assembly içerisinde kullanacağımız sınıflar ve
kontroller bulunuyor. Navigation sistemine kendine has bir **Frame** ve
**Page** yapısına sahip. Uygulamanızda navigasyon uygulamak istediğiniz
ana bir sayfa belirledikten sonra bu sayfa içerisinde Frame kontrolünü
yerleştiriyorsunuz. Sonrasında bu Frame içerisine farklı Page
kontrollerini yükleyebilirsiniz. Aslında bu yapı bizim eski klasik
HTML'den alıştığımız IFRAME'e çok benziyor tek farkı özünde tamamen
Silvelright içerisinde bir yapı olması.

Yarattığımız yeni Silverlight uygulamasında gerekli DLL'leri referans
aldıktan sonra ana sayfa olarak varsayılan ayarlarla gelen
**MainPage.xaml** UserControl'ünü kullanacağız. Bu UserControl içerisine
bir Frame kontrolü yerleştirmemiz gerekiyor.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication4.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span><span
style="color: gray"> </span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">navigation</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Navigation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d" d:DesignWidth="640" d:DesignHeight="480"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="BirFrame"</span><span style="color: red;">
Source</span><span style="color: blue;">="/AnaSayfa.xaml"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame</span><span style="color: blue;">\></span>

<span style="color: #a31515;"> </span><span style="color: #808080;">  
</span> <span style="color: #808080;">\</Grid\></span>

<span style="color: #808080;">\</UserControl</span><span
style="color: blue;">\></span>

System.Windows.Controls namespace'in eklenen kontrollerden biri olan
Frame kontrolü doğrudan System.Windows.Controls.Navigation assembly'si
üzerinden geliyor. Gerekli XML namespace'lerini de Usercontrol çapında
tanımladıktan sonra rahatlıkla söz konusu namespace üzerinden Frame
kontrolünü yaratabiliyoruz. Tabi bu Frame'in ilk açılışta göstereceği
**Page'in** adresini de **Source** olarak vermeniz gerekiyor.

Tüm bu hikaye içerisinde farkındaysanız bir UserControl bir **Page**
diye iki farklı şeyden bahsediyorum. UserControl'ler bizim normal
şartlarda kullandığımız hem ana sayfalarımız hem iç User Controllerimiz
vs olabiliyor. Silverlight içerisinde ana uygulama görseli de sonuç
olacak bir UserControl. Fakat söz konusu **Navigation API** olunca bir
Frame içerisinde ancak **Page** kontrollerini gösterebiliyorsunuz. Page
kontrollerinin özünde **UserControl'lerden** bir eksiği yok fazlası var.
O nedenle bir UserControl içerisinde yapabildiğiniz herşeyi Page
içerisinde yapabileceğinizi unutmayın.

Şimdi gelin bir de basit **Page** yaratıp adını **AnaSayfa.xaml**
yapalım ki yukarıdaki uygulamamız rahatlıkla çalışsın. Projenizde "Add
new item" dediğiniz "Silverlight Page" seçeneği ile karşılaşacaksınız.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Page</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication4.AnaSayfa"</span>

          <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

          <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

          <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

          <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

          <span style="color: red;"> mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span>

          <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">navigation</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Navigation"</span>

          <span style="color: red;"> d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="640"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="480"</span>

          <span style="color: red;"> Title</span><span
style="color: blue;">="AnaSayfa Page"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Page</span><span style="color: blue;">\></span>

Gördüğünüz gibi Page kontrolleri de yine
System.Windows.Controls.Navigation altından geliyor. Bir Page
kontrolünün Title özelliği uygulama tarayıcıda açıkken tarayıcının
işletim sistemine ait üst çubuğunda gözükecek olan içeriği tanımlıyor.
Böylece **Frame** içerisindeki Page'ler değiştikçe her **Page** kendi
Title bilgisini tarayıcının çubuğuna aktarabiliyor. Sadece bu kadarla
kalınmıyor aslında.

Hatırlarsanız ana sayfadaki Frame kontrolümüze Source olarak
**AnaSayfa.xaml** demiştik. Buradan yola çıkarak Frame kontrolü ilk
açıldığında Silverlight projeniz içerisinde AnaSayfa.xaml'ı
yükleyecektir. Sonrasında başka bir sayfaya yönlendirme yapmak
isterseniz bunu ana sayfanızdaki bir **HyperlinkButton** ile rahatlıkla
yapabilirsiniz.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication4.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span><span
style="color: gray"> </span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span><span
style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">
xmlns:navigation="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Navigation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d" d:DesignWidth="640" d:DesignHeight="480"\></span>

<span style="color: gray;">    \<Grid x:Name="LayoutRoot"\></span>

<span style="color: gray;">        \<StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**BirFrame**"</span><span style="color: red;">
Source</span><span style="color: blue;">="/AnaSayfa.xaml"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame</span><span style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">HyperlinkButton</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Link1"</span><span style="color: red;">
NavigateUri</span><span
style="color: blue;">="/BaskaSayfa.xaml"</span><span
style="color: red;"> TargetName</span><span
style="color: blue;">="**BirFrame**"</span><span style="color: red;">
Content</span><span style="color: blue;">="TIKLA"/\></span>

<span style="color: #808080;">        \</StackPanel\></span>

<span style="color: #808080;">    \</Grid\></span>

<span style="color: #808080;">\</UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki örnekte gördüğünüz HyperlinkButton'un **TargetName** özelliği
çok önemli. Bu özelliğe aktarılan isim bizim **Frame** kontrolünün ismi
olduğu için kontrol içerisindeki linkin doğrudan Silverlight
içerisindeki **Frame'e** yönlendirileceği anlaşılabiliyor.
HyperlinkButton'ın NavigateUri özelliğinde ise Silvelright uygulaması
içerisindeki bir diğer **Page** kontrolünün adresi bulunuyor. Bu
adresler Silverlight uygulamasının rootuna göre veriliyor. Yukarıdaki
HyperlinkButton'a tıklandığıda otomatik olarak hedef Page Frame
içerisinde yüklenecektir.

Tüm bu işlemler gerçekleşirken Navigation API sizin yerinize tarayıcının
adres çubuğunda da gerekli değişiklikleri otomatik olarak yapacaktır.

*Uygulama ilk açıldığında adresi:*\
http://localhost:2593/**SilverlightApplication4TestPage.html\#/AnaSayfa.xaml**

*HyperlinkButton'a tıkladıktan sonraki adres:*\

http://localhost:2593/**SilverlightApplication4TestPage.html\#/BaskaSayfa.xaml**

Yukarıdaki adresler arasındaki farklarda da görebileceğiniz üzere Frame
içerisine yüklenen her kontrolün adresi tarayıcının da adres çubuğunda
bulunuyor. Bu adresler birer **Fragment** olarak implemente edildiği
için tarayıcı herhangi bir şekilde sayfaya refresh atmasa da bu
değişiklikleri tarayıcı geçmişine kaydedebilecektir. Böylece rahatlıkla
kullanıcılar tarayıcıların "İleri" ve "Geri" düğmeleri kullanarak
uygulamamız içerisinde gezebilecekler. Bu sistemin bir diğer avantajı da
kullanıcıların uygulamamızla ilgili farklı sayfaların linklerini alarak
arkadaşlarına gönderebilecek olmaları. Bu adresler eğer kopyalanıp
farklı bir makineden farklı bir tarayıcıda doğrudan çalıştırılırsa
Navigation API uygun Page'i Frame içerisine otomatik olarak
yükleyecektir.

**Page'lere parametre nasıl göndeririz?**

Belki de Page'leri Frame içerisine yüklerken parametreler göndermek
isteyeceksiniz. Hatta belki de bir Page'in kendi içerisinde bulunduğu
Frame'e başka bir Page'i yüklemesini söyleyebilmesini isteyeceksiniz.
Biraz karışık oldu değil mi? Gelin tek tek bu soruları da cevaplayalım.
İlk olarak ana sayfadan değil de bir Page'in kendi içinden navigasyon
sağlamanın yoluna bakalım.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btntikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> btntikla.Click

        <span
style="color: blue;">Me</span>.NavigationService.Navigate(<span
style="color: blue;">New</span> Uri(<span
style="color: blue;">String</span>.Format(<span
style="color: #a31515;">"/Urun.xaml?ID={0}"</span>, 1),
UriKind.Relative))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod doğrudan Frame içerisinde bir Page'in içindeki düğmeye
bağlı. Ana sayfada Frame'e ulaşarak "sen bu adresi aç" demek kolay fakat
Frame içerisinde bir Page'i kendi sahibi olan Frame'e böyle bir komut
gönderebilmesi için her Page içerisinde otomatik olarak yer alan
**NavigationService'i** kullanmamız gerekiyor. **NavigationService**
üzerinden çağırdığınız **Navigate** metoduna her zamanki gibi
Silverlight uygulamanız içerisindeki bir başka Page'in adresini
verebilirsiniz.

Yukarıda yönlendirme yaptığımız adrese dikkat ettiyseniz sonunda bir
parametre var. Sanki normal bir web sitesinde yönlendirme yaparmış gibi
**QueryString** üzerinden parametre gönderebiliyoruz. Tabi söz konusu
Urun.Xaml adındaki Page'in de bu parametreyi okuyabilmesi gerekiyor.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

    <span style="color: blue;">Inherits</span> Page

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: green;">'Executes when the user navigates to
this page.</span>

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Overrides</span> <span
style="color: blue;">Sub</span> OnNavigatedTo(<span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.Windows.Navigation.NavigationEventArgs)

        <span style="color: blue;">If</span> <span
style="color: blue;">Me</span>.NavigationContext.QueryString.ContainsKey(<span
style="color: #a31515;">"ID"</span>) <span
style="color: blue;">Then</span>

            GelenParametre.Text = <span
style="color: blue;">Me</span>.NavigationContext.QueryString(<span
style="color: #a31515;">"ID"</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Urun.xaml adındaki Page'imizin için otomatik olarak gelen
**OnNavigateTo** metodu söz konusu **Page** ekrana geldiğinde
çalışacaktır. Kontrol ekrana geldiğinde hemen gidip kendisine
**QueryString** üzerinden bir ID gönderilip gönderilmediğini kontrol
etmemiz gerek. Bunun için yine her Page'de bulunan
**NavigationContext'i** kullanıyoruz.

**NavigationContext'in** altındaki **QueryString** nesnesinin
**ContainsKey** özelliği ile ID parametresinin gelip gelmediğini kontrol
ettikten sonra QueryString Dictionary'sine doğrudan elimizdeki key'i
verip değeri alabiliyoruz. Böylece hazırladığınız bir Page'i Frame
içerisine yüklerken ona bir parametre gönderip onun da parametreye uygun
verileri göstermesini veya uygun işlemleri yapmasını sağlayabilirsiniz.

**UriMapping işlemleri.**

Şu ana kadar yaptığımız tüm işlemlerde verdiğimiz Frame adresleri
otomatik olarak adres çubuğuna yazıldı. Bu durumun birçok avantajı var.
Fakat ortada hoş olmayan bir konu var ki o da herşeyin alenen ve çirkin
bir şekilde adres çubuğunda gözüküyor olması. Örneğin aşağıdaki adres
bizim Urun.xaml'a parametre gönderdiğimize oluşan adres.

http://localhost:2593/**SilverlightApplication4TestPage.html\#/Urun.xaml?ID=1**

Bu sorun tanıdık geliyor değil mi? Aslında biz bu sorunu yıllarda web
uygulamalarında da yaşadık ve UrlReWriting kullanarak daha hoş URL'lere
sahip olmayı öğrendik. İşte aynı sistemi Navigation API içerisinde de
**UriMapper** kontrolleri ile sağlayabiliyorsunuz.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication4.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span><span
style="color: gray"> </span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">uriMapper</span><span
style="color: blue;">="clr-namespace:System.Windows.Navigation;assembly=System.Windows.Controls.Navigation"</span>

<span style="color: gray">            </span> <span
style="color: gray;">
xmlns:navigation="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Navigation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d" d:DesignWidth="640" d:DesignHeight="480"\></span>

<span style="color: #808080;">    \<Grid x:Name="LayoutRoot"\></span>

<span style="color: #808080;">        \<StackPanel\></span>

<span style="color: #808080;">            \<navigation:Frame
Height="300" x:Name="BirFrame" Source="/AnaSayfa"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame.UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">=""</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/AnaSayfa.xaml"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">="/{SayfaAdi}"</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/{SayfaAdi}.xaml"/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame.UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">       </span> <span
style="color: #808080;">     </span> <span
style="color: #808080;">\</navigation:Frame\></span>

<span style="color: #808080;">            \<HyperlinkButton
x:Name="Link1"</span><span style="color: red;"> NavigateUri</span><span
style="color: blue;">="/BaskaSayfa"</span><span style="color: red;">
</span> <span style="color: gray;"> TargetName</span><span
style="color: gray;">="BirFrame" Content="TIKLA"/\></span>

<span style="color: gray;">        \</StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

uriMapper kontrolünü kullanabilmek için ayrı bir XAML namespace
tanımlayarak bu sefer de System.Windows.Controls.Navigation'ı import
etmemiz gerekiyor. Sonrasında **uriMapper** kontrolünü yaratarak
doğrudan Frame'in UriMapper özelliğine verebiliyoruz. **UriMapper**
kendi içerisinde **UriMapping** kontrolleri kullanıyor.  Her
uriMapping'in bir **Uri** ve bir de **MappedUri** özelliği var.

**[XAML]**

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">=""</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/AnaSayfa.xaml"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">="/{SayfaAdi}"</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/{SayfaAdi}.xaml"/\></span>

Örneğimizdeki bu iki kodu incelersek ilkinde boş bir adres geldiğinde
açılarak kontrolün adresine yönlendirildiğini görebiliriz. İkincisinde
ise bir değişken kullanılmış durumda. **SayfaAdi** adını verdiğimiz bu
değişkeni gelen adresten alıp sonuna **.xaml** uzantısını ekleyip
yönlendiriyoruz. Böylece bir önceki adımdaki URL'lerimiz ile şu ankiler
çok daha farklı olabiliyor.

*Uygulama ilk açıldığında adresi:*\
http://localhost:2593/**SilverlightApplication4TestPage.html\#/AnaSayfa**

*HyperlinkButton'a tıkladıktan sonraki adres:*\

http://localhost:2593/**SilverlightApplication4TestPage.html\#/BaskaSayfa**

Eğer kodumuzda dikkat ettiyseniz artık **HyperlinkButton'un**
**NavigateUri'sinde** **BaskaSayfa.xaml** yazmıyor, doğrudan sadece
**BaskaSayfa** yazıyor. Artık sondaki .xaml uzantıları Mapper tarafından
halledilecek. Bu şekilde QueryString parametrelerini de map
edebilirsiniz.

**[XAML]**

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">=""</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/AnaSayfa.xaml"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">="/Urun/{ID}"</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/Urun.xaml?ID={ID}"/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">="/{SayfaAdi}"</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/{SayfaAdi}.xaml"/\></span><span
style="color: #a31515;">                        </span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">uriMapper</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span
style="color: blue;">\></span>

Yukarıdaki ek Mapping sayesinde artık **Urun/2** şeklinde gelen adresler
doğrudan **Urun.xaml?ID=2** şekline dönüştürülecek.

*UriMapping öncesi:*\

http://localhost:2593/SilverlightApplication4TestPage.html**\#/Urun.xaml?ID=2**

*UriMapping sonrası:*\
http://localhost:2593/SilverlightApplication4TestPage.html**\#/Urun/2**

Gördüğünüz gibi Naviation API gerçekten kuvvetli bir altyapı sunuyor.
Tüm bu altyapının her noktasına ayrı ayrı müdahale edebiliyorsunuz.
Mantık olarak çok yabancı olmadığımız bir kullanım şekli olduğu da
kesin.

Hepinize kolay gelsin.


