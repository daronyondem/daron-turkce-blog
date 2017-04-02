---
FallbackID: 2455
Title: Silverlight 4 Beta ile Commanding Yapısı
PublishDate: 11/23/2009
EntryID: Silverlight_4_Beta_ile_Commanding_Yapisi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 0c092e07-395b-41c1-ae03-e986464095d9
---
Silverlight 4 Beta ile beraber gelen özelliklerden biri de Command
yapıları. Command yapıları özellikle WPF developer'larının alışık
oldukları yapılar arasında fakat maalesef Silverlight tarafında bugüne
kadar herhangi bir runtime seviyesinde implementasyon yoktu. Özellikle
geniş çaplı iş uygulamalarının da artması ile uygulama içi kod yazım
yapılarında ve disiplinlerinde farklı arayışlar kendini gösterebiliyor.
Bu arayışlar sonucudur ki WPF tarafında MVP, MVVM gibi kod yazım
tasarımları ortaya çıkar.

Silverlight tarafında da aslında uzun bir süredir bu gibi konularda
harici kütüphaneler bulunuyordu. Benim bugüne kadar bu konularda yazı
yazmamamın nedeni ise daha herhangi bir standardın pek de oturumamış
olmasıydı. Bu yazımızda çok hızlı bir şekilde MVVM'in ufak bir kısmından
rüzgar gibi geçerek Silverlight 4'teki Command yapılarına göz atacağız.
Olabildiğince örnek üzerinden giderek yaptıklarımızın amacını da
anlatmaya çalışacağım.

**Tüm yapacaklarımızın amacı nedir?**

Aslında kod yazım şekilleri ile ilgili genel geçer bir bakış attığınızda
göreceksiniz ki en önemli hedeflerden biri farklı amaçlara hizmet eden
kodları olabildiğince birbirinden ayırmaktır. Bu süreç tabi ki ek bir
emek gerektirir ve bazen gereklidir, bazen ise değildir. Özünde bir
projeye başlarken sorulması gereken soru bu farklı amaçlara hizmet eden
kodları birbirinden ayırmanın söz konusu projede getireceği bir kazancın
olup olmadığının yanı sıra kazancın bu ek süreç için harcanacak emeğe
kıyasla toplamda hala bir kazanç olarak durup durmadığıdır. Tüm bu
soruları sormadan herhangi bir projede kod yazım şekli ile ilgili genel
geçer bir doğru kesinlikle bulunamaz.

Sadede gelirsek, bu makale boyunca anlatacaklarım sizin belki de bugüne
kadar yazdığınız Silverlight projelerinde uyguladığınız stilin çok
dışında olacaktır. Bu makalede anlatacağım uygulama geliştirme tarzı
kesinlikle genel geçer bir doğru değildir ve her projede "profesyonel
olalım" endişesi ile uygulanması gereken bir "guru tarzı" vs değildir :)
Birer yazılımcı olarak göreviniz uygun şartlarda uygun araçlarla uygun
çözümleri en düşük maliyet ve en yüksek verimlilik ile üretmek olduğunu
unutmamanızda fayda var.

Uyarı bölümünü geçtiğimize göre gelelim konumuza. Bahsettiğim gibi
genelde amacımız farklı amaçlara hizmet eden kodları birbirinden
ayırmak. Buna bir örnek olarak XAML ile VB/CS kodlarının ayrı dosyalarda
tutulmasını da verebiliriz. Oysa aynı dosyada da tutma şansımız var
fakat yapmıyoruz. Neden? Çünkü XAML ile VB/CS'in amacı farklı ve ayrı
yerlerde durmaları bize projelerimizin kod yazım süreçlerini
yönetmemizde büyük katkı sağlıyor. İşte bu endişenin devamında UI
(Kullanıcı arayüzü) ile ilgili kodların da veri katmanı ile salt görsel
katman (XAML) arasında kaldığını düşünürsek tam da o noktada bir
karışıklık kendini gösterebiliyor. İşte bu karışıklığı toparlayabilmek
ve bilyonlarca event-handler vs ile uğraşmamak adına **Commanding**
yapısını kullanabiliriz. Aman dikkat Commanding'in tek faydası tabi ki
bu değil, kodun test edilebilmesi, görsel ekranlar ile görsel ekranlara
veri bağlantısının yapıldığı kodun birbirinden tamamen
ayrıştırılabilmesi, DataBinding mekanizmasını kolaylaştırması gibi
birçok yan etkisi de var.

**Silverlight 4 ile ne gelmiş?**

İlk olarak gelin Silvelright 4'de gelen yeniliğe bir göz atalım.
Olabildiğince basit bir örnekten yola çıkarak örneğimizi makale boyunca
geliştirerek evrim geçirmesini sağlayacağız. Varsayalım ki örneğimizde
bir düğme ve bir de TextBox olacak. TextBox içerisine yazı girildiğinde
düğme tıklanabilir olmalı ve yazıyı almalı. Oysa TextBox boş ise düğmeye
tıklanamamalı. Şimdi böyle bir durumda normal şartlarda ne yapardık bir
bakalım.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication16.MainPage"</span>

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

   <span style="color: red;"> d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="300"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="400"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="txtMetin"
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnTikla"</span><span style="color: red;">
Content</span><span style="color: blue;">="TIKLA"\>\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda basit bir şekilde örneğimizin XAML kodunu görüyorsunuz.
**btnTikla** adında bir Button ve **txtMetin** adında da bir
TextBox'ımız var.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">MainPage</span>

    <span style="color: blue;">Inherits</span> <span
style="color: #2b91af;">UserControl</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> txtMetin\_TextChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Controls.<span
style="color: #2b91af;">TextChangedEventArgs</span>) <span
style="color: blue;">Handles</span> txtMetin.TextChanged

        <span style="color: blue;">If</span> <span
style="color: blue;">String</span>.IsNullOrEmpty(txtMetin.Text) <span
style="color: blue;">Then</span>

            btnTikla.IsEnabled = <span style="color: blue;">False</span>

        <span style="color: blue;">Else</span>

            btnTikla.IsEnabled = <span style="color: blue;">True</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla.Click

        <span
style="color: #2b91af;">MessageBox</span>.Show(txtMetin.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz gibi tek tek hem düğmenin hem TextBox'ın uygun eventlarını
yakalamamız ve her seferinde de ayrı ayrı kontroller ulaşmamız gerekti.
İşte bu senaryoda kontrollerden herhangi birinin adı değişse hemen
arkaya dönüp kodumuzu da değiştirmemiz gerekecek. Aynı şekilde TextBox
yerine belki de ileride bir Combox konacak? Ve orada seçili nesneye göre
sistem çalışacak? İşte böyle bir durumda da herşeyi baştan toparlamamız
gerekir kod tarafında. Gördüğünüz gibi UI ile ilgili kod ve UI birbiri
ile çok fazla iç içe!

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">TiklaCommand</span>

    <span style="color: blue;">Implements</span> <span
style="color: #2b91af;">ICommand</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> CanExecute(<span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>)
<span style="color: blue;">As</span> <span
style="color: blue;">Boolean</span> <span
style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.CanExecute

        <span style="color: blue;">If</span> <span
style="color: blue;">String</span>.IsNullOrEmpty(parameter) <span
style="color: blue;">Then</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">False</span>

        <span style="color: blue;">Else</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">True</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Event</span> CanExecuteChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">EventArgs</span>) <span
style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.CanExecuteChanged

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Execute(<span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>)
<span style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.Execute

        <span style="color: #2b91af;">MessageBox</span>.Show(parameter)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Silverlight 4 ile beraber artık Commanding yapısı geldiğine göre
yukarıdaki şekilde bir sınıf tanımlayabiliriz. Gördüğünüz bu sınıf
doğrudan **ICommand** interface'ini implemente ediyor. Bu Interface
içerisinde otomatik olarak **CanExecuteChanged** eventı, **CanExecute**
ve **Execute** metodları bulunuyor. Toplamda iki metoddan **CanExecute**
metodu kendisine gelen bir parametreye göre olası bir komutun çalışıp
çalışamayacağına kadar veriyor. Bizim örneğimizde gelen parametreyi
TextBox içerisinde metin olarak düşünebilirsiniz. Eğer metin yoksa
geriye False varsa True döndürüyoruz. İkinci metodumuz olan Execute ise
aslında çalıştırılacak komutun ta kendisini tanımlıyor. Basit bir
şekilde şimdilik gelen parametreyi bir MessageBox ile gösteriyoruz.
Hepsi bu kadar. Sıra geldi tüm bu mekanizmayı XAML yani görsel tarafla
bağlamaya. Dikkat edin şu ana kadar ne bir TextBox ne de bir Button'dan
bahsettik! Kodumuzda hiçbir kontrolün adı veya tipi yok! Bizim için tek
önemli olan gelen parametrenin tipi, değeri ve yapacağımız iş!

Yukarıdaki kodu ayrı bir VB dosyası olarak projeye ekledikten sonra
artık sınıfımızı XAML tarafında kullanabilmek adına gerekli
tanımlamaları XAML tarafında yapmalıyız.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication15.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d"</span>

<span style="color: gray">   </span> <span style="color: gray;">
d:DesignHeight="300" d:DesignWidth="400"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">daron</span><span
style="color: blue;">="clr-namespace:SilverlightApplication15"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TiklaCommand</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="TiklaCommand" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span> <span
style="color: gray;">\<Grid x:Name="LayoutRoot"
Background="White"\></span>

<span style="color: gray;">        \<StackPanel\></span>

<span style="color: gray;">            \<TextBox x:Name="txtMetin"
/\></span>

<span style="color: gray;">            \<Button Command="{StaticResource
TiklaCommand}"</span><span style="color: gray"> </span>

<span style="color: gray">                   </span> <span
style="color: gray;"> CommandParameter="{Binding Text,
ElementName=txtMetin, Mode=TwoWay}"</span><span style="color: gray">
</span>

<span style="color: gray">                   </span> <span
style="color: gray;"> x:Name="btnTikla"
Content="TIKLA"\>\</Button\></span>

<span style="color: gray;">        \</StackPanel\></span>

<span style="color: gray;">    \</Grid\></span>

<span style="color: gray;">\</UserControl</span><span
style="color: blue;">\></span>

İlk olarak her zamanki gibi XMLNS yani XML NameSpace tanımımız ile arka
plandaki sınıfımızı bu tarafa import ediyoruz. Sonrasında da
UserControl'un Resource'ları arasında **TiklaCommand'in** bir kopyasını
alıyoruz. Artık sıra geldi gerekli Binding'leri ayarlayarak Textbox ve
Button ile Command arasındaki ilişkiyi belirlemeye.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication15.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d"</span>

<span style="color: gray">   </span> <span style="color: gray;">
d:DesignHeight="300" d:DesignWidth="400"</span>

<span style="color: gray">            </span> <span
style="color: gray;">
xmlns:daron="clr-namespace:SilverlightApplication15"\></span>

<span style="color: gray;">    \<UserControl.Resources\></span>

<span style="color: gray;">        \<daron:TiklaCommand
x:Name="TiklaCommand" /\></span>

<span style="color: gray;">    \</UserControl.Resources\></span>

<span style="color: gray;">    \<Grid x:Name="LayoutRoot"
Background="White"\></span>

<span style="color: gray;">        \<StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="txtMetin"
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Command</span><span style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
TiklaCommand</span><span style="color: blue;">}"</span>

                   <span style="color: red;">
CommandParameter</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Text</span><span style="color: blue;">,</span><span style="color: red;">
ElementName</span><span style="color: blue;">=txtMetin,</span><span
style="color: red;"> Mode</span><span
style="color: blue;">=TwoWay}"</span>

                   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="btnTikla"</span><span style="color: red;">
Content</span><span style="color: blue;">="TIKLA"\>\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: #808080;">        \</StackPanel\></span>

<span style="color: #808080;">    \</Grid\></span>

<span style="color: #808080;">\</UserControl</span><span
style="color: blue;">\></span>

Özünde yaptığımız tek şey Button'un **Command** ve **CommandParameter**
özelliklerini set etmek. Command olarak hemen StaticResource'lar
arasından daha bir önceki adımda yarattığımız Command'imizi veriyoruz.
Sonrasında parametreyi aktarırkende Element Binding kullanarak
TextBox'ın Text özelliğindeki değeri alıp gönderiyoruz. İşte bu kadar!
Peki şimdi size soruyorum, XAML ile arka plandaki UI işlevselliğini
barındıran kod birbirinden gerçekten de uzaklaşmadı mı? Evet, uzaklaştı.
Daha mı çok uğraştık? Şimdilik hayır ama farklı senaryolarda daha çok
uğraşmamız da gerekebilirdi.

**İşi biraz daha karıştıralım!**

Gördüğünüz üzere yukarıdaki teknik ile bir uygulama geliştirdiğinizde
onlarca Command ve Bindingler yazacaksınız. Bu gibi bir durumda kodu
biraz daha kısaltmak ve basitleştirmek adına Generic Command tipleri
yaratabilirsiniz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">BirCommand</span>(<span
style="color: blue;">Of</span> T)

    <span style="color: blue;">Implements</span> <span
style="color: #2b91af;">ICommand</span>

 

    <span style="color: blue;">Private</span> executeAction <span
style="color: blue;">As</span> <span
style="color: #2b91af;">Action</span>(<span
style="color: blue;">Of</span> <span style="color: #2b91af;">T</span>)

    <span style="color: blue;">Private</span> canExecuteAction <span
style="color: blue;">As</span> <span
style="color: #2b91af;">Func</span>(<span style="color: blue;">Of</span>
<span style="color: #2b91af;">T</span>, <span
style="color: blue;">Boolean</span>)

 

    <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
executeAction <span style="color: blue;">As</span> <span
style="color: #2b91af;">Action</span>(<span
style="color: blue;">Of</span> <span style="color: #2b91af;">T</span>),
<span style="color: blue;">ByVal</span> canExecuteAction <span
style="color: blue;">As</span> <span
style="color: #2b91af;">Func</span>(<span style="color: blue;">Of</span>
<span style="color: #2b91af;">T</span>, <span
style="color: blue;">Boolean</span>))

        <span style="color: blue;">Me</span>.executeAction =
executeAction

        <span style="color: blue;">Me</span>.canExecuteAction =
canExecuteAction

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> CanExecute(<span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>)
<span style="color: blue;">As</span> <span
style="color: blue;">Boolean</span> <span
style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.CanExecute

        <span style="color: blue;">Return</span>
(canExecuteAction(parameter))

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Event</span> CanExecuteChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">EventArgs</span>) <span
style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.CanExecuteChanged

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> Execute(<span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>)
<span style="color: blue;">Implements</span> System.Windows.Input.<span
style="color: #2b91af;">ICommand</span>.Execute

        executeAction(parameter)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıda gördüğünüz sınıf aslında bizim bir önceki örneğimizde
kullandığımız ICommand interface'ini implemente eden nesnemizin generic
olan hali. Tabi ben biraz VB tembelliği yapıp parametreleri Generic
yapmadım :) Onu da size bırakmış oliyim. Burada önemli olan noktalardan
biri ise sınıfımızın artık bir Constructor'a sahip olarak çalıştıracağı
her iki **CanExecute** ve **Execute** fonksyonlarını da dışarıdan alıyor
olması. Böylece artık proje içerisinde istediğimiz zaman hızlıca
ICommand tipinden sınıflar yaratabiliriz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">ViewModel</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">ReadOnly</span> <span
style="color: blue;">Property</span> Tikla() <span
style="color: blue;">As</span> <span
style="color: #2b91af;">ICommand</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">New</span> <span
style="color: #2b91af;">BirCommand</span>(<span
style="color: blue;">Of</span> <span
style="color: blue;">String</span>)(<span
style="color: blue;">Sub</span>(param)

                                                                        
<span style="color: #2b91af;">MessageBox</span>.Show(param)

                                                                    
<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>,

                                                                    
<span style="color: blue;">Function</span>(param) <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>

                                                                     
     <span style="color: blue;">If</span> <span
style="color: blue;">String</span>.IsNullOrEmpty(param) <span
style="color: blue;">Then</span>

<span style="color: blue;">                                   
                                             Return</span> <span
style="color: blue;">False</span>

<span style="color: blue;">                                   
                                       Else</span>

<span style="color: blue;">                                   
                                             Return</span> <span
style="color: blue;">True</span>

                                                               
            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

<span style="color: blue;">                                   
                                 End</span> <span
style="color: blue;">Function</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki ViewModel sınıfımız içerisinde sadece bir ReadOnly property
var. Söz konusu property'nin de tipi ICommand olmak durumunda. Bu
şekilde bu sınıf içerisine sayfanızda kullandığınız tüm Command'leri
yerleştirebilirsiniz. Örneğimizde Property geriye bizim **BirCommand**
sınıfımızdan yaratıp döndürüyor. **BirCommand** sınıfımızın
Constructor'ı da iki ayrı fonksyonu parametre olarak alıyor. Böylece
herşey bir yerde oldu bitti.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication15.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d"</span>

<span style="color: gray">   </span> <span style="color: gray;">
d:DesignHeight="300" d:DesignWidth="400"</span>

<span style="color: gray">            </span> <span
style="color: gray;">
xmlns:daron="clr-namespace:SilverlightApplication15"\></span>

<span style="color: gray;">    \<UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ViewModel</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="ViewModel"
/\></span>

<span style="color: #808080;">    \</UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"</span><span
style="color: red;"> DataContext</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
ViewModel</span><span style="color: blue;">}"\></span>

<span style="color: #a31515;">      </span> <span
style="color: #808080;">  </span><span
style="color: #808080;">\<StackPanel\></span>

<span style="color: #808080;">            \<TextBox x:Name="txtMetin"
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Command</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Tikla</span><span style="color: blue;">}"</span>

                   <span style="color: red;">
CommandParameter</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Text</span><span style="color: blue;">,</span><span style="color: red;">
ElementName</span><span style="color: blue;">=txtMetin,</span><span
style="color: red;"> Mode</span><span
style="color: blue;">=TwoWay}"</span>

                   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="btnTikla"</span><span style="color: red;">
Content</span><span style="color: blue;">="TIKLA"\>\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: #808080;">        \</StackPanel\></span>

<span style="color: #808080;">    \</Grid\></span>

<span style="color: #808080;">\</UserControl</span><span
style="color: blue;">\></span>

XAML tarafında ise artık ViewModel sınıfımızı Root elementimiz olan
Grid'e DataContext olarak verip sonrasında içerideki herhangi bir
kontrole de doğrudan Command Binding verebiliyoruz.

**İşte bu kadar!**

Yazıyı sonlandırmadan önce özellikle yazının başında uyarılarımızı
tekrar hatırlamanızı rica ediyorum. Command sistemi güzeldir hoştur
fakat mecburi değildir. Bu sadece bir yazılım geliştirme stilidir ve
bazı durumlarda mantıklı/faydalı olur bazılarında ise sadece size ek iş
çıkartır. O nedenle benim tavsiyem her iki yolu da bilerek uygun
yerlerde uygun çözümleri uygulamanız ve genel geçer bir doğru aramamanız
olacak.

Hepinize kolay gelsin.


