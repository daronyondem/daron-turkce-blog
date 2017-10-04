---
FallbackID: 2373
Title: Silverlight Toolkit'ten AutoCompleteBox kullanımı.
PublishDate: 23/6/2009
EntryID: Silverlight_Toolkitten_AutoCompleteBox_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: e8feabdc-bac0-438f-bd6f-7eb6793a01e0
---
Bu yazımızda [Silverlight Toolkit](http://www.codeplex.com/Silverlight)
ile beraber gelen **AutoCompleteBox** kontrolünü inceleyeceğiz.
Bilgisayarınızda Silverlight Toolkit yükledikten sonra Toolkit
içerisindeki tüm kontrolleri Visual Studio içerisinde Toolbox'ta
görebilirsiniz. Ayrıca Toolkit DLL'lerini referans alarak kontrolleri
elle XAML sayfalarınıza ekleme şansınız da var. Örneğin AutoCompleteBox
kontrolünü inceleyecek olursak; bir sayfaya söz konusu kontrolü eklemek
için ilk olarak Toolkit Assembly'lerinden
**System.Windows.Controls.Input** Assembly'sini projenize referans
almanız sonrasında da **System.Windows.Controls** NameSpace'i altından
kontrolü bulmanız gerekecektir.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
**xmlns**</span><span style="color: blue;">**:**</span><span
style="color: red;">**input**</span><span
style="color: blue;">**="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Input"**</span>
<span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication54.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**input**</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">**input**</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz basit örnek içerisinde XAML root elementimizde
gerekli input XML namespace'i tanımlanmış durumda. Böylece artık input
namespace'i üzerinden **AutoCompleteBox** kontrolümüzü kullanabiliriz.
Daha önce de bahsettiğim üzere eğer Visual Studio'nun Toolbox'ından söz
konusu kontrolü kod tarafına sürükle bırak tekniği ile yerleştirirseniz
zaten tüm bu işlemleri otomatik olarak gerçekleştirilebiliyor.

**Haydi veriye bağlayalım!**

Kontrolümüzü artık sahneye yerleştirdiğimize göre hemen çalıştırmak ve
sonucu görmek isteyeceğiz fakat onun öncesinde tabi ki bir veri
bağlantısı yapmamız şart. Kullanıcılar kutuya birşey yazarken
AutoComplete kısmında neler gösterilecek?

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
xmlns</span><span style="color: blue;">:</span><span
style="color: red;">input</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Input"</span>
<span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication54.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="myAutoCompleteBox"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"\>\</</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Secenekler() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= {<span style="color: #a31515;">"Silverlight"</span>, <span
style="color: #a31515;">"Silvernight"</span>, <span
style="color: #a31515;">"Silverfight"</span>, <span
style="color: #a31515;">"SilverMonth"</span>}

        myAutoCompleteBox.ItemsSource = Secenekler

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> MainPage\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: blue;">string</span>[] Secenekler = {
<span style="color: #a31515;">"Silverlight"</span>, <span
style="color: #a31515;">"Silvernight"</span>, <span
style="color: #a31515;">"Silverfight"</span>, <span
style="color: #a31515;">"SilverMonth"</span> };

            myAutoCompleteBox.ItemsSource = Secenekler;

        }

Yukarıdaki kod içerisinde aslında basit bir şekilde tüm seçenekleri
doğrudan AutoCompletebox'ın **ItemsSource'una** atamış oluyoruz.
Sonrasında AutoCompleteBox kendi içerisinde gerekli filtrelemeleri
kullanıcılar metin giriş yaptıkça gerçekleştirerek sonucu gösteriyor.

![Silverlight içerisinde basit bir
AutoCompleteBox](media/Silverlight_Toolkitten_AutoCompleteBox_kullanimi/22062009_1.png)\
*Silverlight içerisinde basit bir AutoCompleteBox*

**Peki ya web servisinden alacak olsak sonuçları?**

Bir önceki örneği incelerken büyük ihtimal ile kendi içinizden "*Eee
peki kocaman bir listemiz varsa hepsini istemciye mi alacağız?*" diye
sormuşsunuzdur. Tabi ki hayır. Aslında normal şartlarda yapmamız gereken
şey AutoCompleteBox içerisine yazılan kelimeyi sunucuya göndermek ve
geri gelen sonucu da AutoCompleteBox'ın AutoComplete bölümünde
göstermek. İşte bu işlemi yapabilmek için AutoCompletebox'ın
**Populating** eventını kullanıyoruz.

Örneğimizde **Tavsiye** adında bir webmethod kullanacağız. Web
servisinin yazımı kısmına girmeyeceğim fakat kabaca bahsetmek gerekirse
istemciden aranacak kelimeyi alan ve veritabanına gidip uygun
AutoComplete seçeneklerini bir list olarak döndüren bir webmethod
yeterli olacaktır.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> myAutoCompleteBox\_Populating(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Controls.PopulatingEventArgs) <span
style="color: blue;">Handles</span> myAutoCompleteBox.Populating

        e.Cancel = <span style="color: blue;">True</span>

        <span style="color: blue;">Dim</span> servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.Service1Client

        <span style="color: blue;">AddHandler</span>
servis.TavsiyelerCompleted, <span style="color: blue;">AddressOf</span>
Servis\_TavsiyelerCompleted

        servis.TavsiyelerAsync(myAutoCompleteBox.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(MainPage\_Loaded);

            myAutoCompleteBox.Populating += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PopulatingEventHandler</span>(myAutoCompleteBox\_Populating);

        }

 

        <span style="color: blue;">void</span>
myAutoCompleteBox\_Populating(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">PopulatingEventArgs</span> e)

        {

            e.Cancel = <span style="color: blue;">true</span>;

            ServiceReference1.Service1Client servis = <span
style="color: blue;">new</span> ServiceReference1.Service1Client();

            servis.TavsiyelerCompleted += Servis\_TavsiyelerCompleted;

            servis.TavsiyelerAsync(myAutoCompleteBox.Text);

        }

Yukarıdaki kodumuzda AutoCompleteBox'ın **Populating** durumunu
yakalayarak hemen **e.Cancel** değerini **True** yaparak **Populate**
işlemini iptal ediyoruz. Neden mi? Çünkü Populate işlemi, yani
AutoComplete listesinin gösterilmesi işlemi şu anda yapılamaz. İşlemi
yapabilmek için bizim Webmethod'umuza parametreyi vermemiz, söz konusu
bilginin sunucuya gitmesi ve en önemli cevabın gelmesi gerekiyor! Cevap
gelmeden **Populate** edemeyiz! O nedenle burada hemen **Populate**
işlemini iptal ediyoruz. Sonrasında WebServis'imizden bir kopya alıp
**Completed** durumu da ayrı bir handler'a bağlayıp elimizdeki
AutoCompleteBox içerisinde metni **Tavsiyeler** adındaki Webmethod'umuza
gönderiyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_TavsiyelerCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
ServiceReference1.TavsiyelerCompletedEventArgs)

        myAutoCompleteBox.ItemsSource = e.Result

        myAutoCompleteBox.PopulateComplete()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Servis\_TavsiyelerCompleted(<span
style="color: blue;">object</span> sender,
ServiceReference1.TavsiyelerCompletedEventArgs e)

        {

            myAutoCompleteBox.ItemsSource = e.Result;

            myAutoCompleteBox.PopulateComplete();

        }

Populating durumunda çağırdığımız web servisimizin Completed durumunda
artık veri elimizde olduğunda göre doğrudan AutoCompleteBox'ımızın
**ItemsSource'una** verebiliriz. Son olarak tabi ki Populate işlemini
bitirdiğimizi de AutoCompleteBox'a belirtmemiz gerek ki hemen sonucu
kullanıcıya göstersin.

**Arama şeklini nasıl değiştiririz?**

Varsayılan ayarları ile AutoCompleteBox'lar kendilerine verilen verinin
içinde arama yaparken kullanıcının yazdığı metinile başlayan sonuçları
gösterirler. Bunun değiştirmenin yolu AutoCompletebox'ların SearchMode
özelliğinde yatıyor.

![Veri kaynağında nasıl arama yapılacağını
belirleyin.](media/Silverlight_Toolkitten_AutoCompleteBox_kullanimi/22062009_2.png)\
*Veri kaynağında nasıl arama yapılacağını belirleyin.*

Peki bu arama sistemleri size yetmedi ve daha da özelleştirmek
isterseniz ne yapabilirsiniz? Filtreleme işlemini tamamen ele alma
şansınız da var. Bu durum özellikle AutoCompleteBox'a kendi nesne
tiplerinizi bağladığınızda çok anlamlı olabilir. Filtreleme esnasından
belki de sadece ItemsSource'a verdiğiniz nesnelerin belirli
Property'lerine göre ayrı ayrı mantıklarıda aramalar yapılsın
isteyebilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        myAutoCompleteBox.ItemFilter = <span
style="color: blue;">AddressOf</span> Arama

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Function</span> Arama(<span
style="color: blue;">ByVal</span> metin <span
style="color: blue;">As</span> <span style="color: blue;">String</span>,
<span style="color: blue;">ByVal</span> nesne <span
style="color: blue;">As</span> ServiceReference1.Service1Urun) <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>

        <span style="color: blue;">If</span> nesne.Adi.Contains(metin)
<span style="color: blue;">Then</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">True</span>

        <span style="color: blue;">Else</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">False</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            myAutoCompleteBox.ItemFilter = Arama;

        }

 

        <span style="color: blue;">bool</span> Arama(<span
style="color: blue;">string</span> metin, ServiceReference1.Service1Urun
nesne)

        {

            <span style="color: blue;">if</span>
(nesne.Adi.Contains(metin)) {

                <span style="color: blue;">return</span> <span
style="color: blue;">true</span>;

            }

            <span style="color: blue;">else</span> {

                <span style="color: blue;">return</span> <span
style="color: blue;">false</span>;

            }

        }

Yukarıdaki örneğimizde AutoCompleteBox'ın **ItemFilter'ına** yeni bir
metod atıyoruz. Bu metod parametre olarak o anda **filtrelenmek**
istenen **Item'ı**, yani benim örneğimde **ServiceReference** ile
beraber gelen tipte bir nesneyi ve filtrelemede kullanılacak metni
alıyor. Sonrasında gerekli kontrolleri yaptıktan sonra geriye
filtrelediğiniz her bir nesnenin gösterilip gösterilmeyeceğine dair
birer **Boolean** değer döndürmeniz yeterli olacaktır.

**Görsel özelleştirmeler...**

Makalemizde incelediğimiz tüm özellikleri kullandınız, kendi
nesnelerinizi web servisi ile döndürdünüz ve özel bir filtrelemede de
eklediniz. Fakat AutoComplete listesinde daha çok detay göstermek
istiyorsunuz. Bu durumda gelin AutoCompleteBox'ın ItemTemplate'ini bir
inceleyelim.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="myAutoCompleteBox"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox.**ItemTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                **** </span><span
style="color: blue;">**\<**</span><span
style="color: #a31515;">**DataTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Grid</span>
<span style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Width</span><span style="color: blue;">="Auto"\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: red;"> Width</span><span style="color: blue;">="250"
/\></span>

<span style="color: #a31515;">                            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: red;"> Width</span><span style="color: blue;">="250"
/\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Foreground</span><span style="color: blue;">="Red"</span><span
style="color: red;"> Grid.Column</span><span
style="color: blue;">="0"</span><span style="color: red;">
Text</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Foreground</span><span style="color: blue;">="Red"</span><span
style="color: red;"> Grid.Column</span><span
style="color: blue;">="1"</span><span style="color: red;">
Text</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Soyadi</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;"> **\</**</span><span
style="color: #a31515;">**DataTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox.**ItemTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">input</span><span
style="color: blue;">:</span><span
style="color: #a31515;">AutoCompleteBox</span><span
style="color: blue;">\></span>

Kod içerisinde de gördüğünüz üzere AutoCompleteBox'ın ItemTemplate'i
aslında kendi içerisinde **AutoComplete** kısmında tekrar ettiği
satırları tanımlıyor. Bu satırların tasarımı aslında arkaplanda bir
ListBox'ın Item'larıdır. Bizim örneğimizde ulaşmaya çalıştığımız
işlevsellik iki veya daha çok Property'i kullanıcıya gösterirken arka
plandaki filtrelememiz ile de bir AutoComplete işlevselliği sağlamak.
Zaten hali hazırda AutoCompleteBox'ımıza nesnelerimizi ItemsSource
üzerinden aktardığımız için o nesnelerin tüm Property'lerine dair
Binding'leri de ItemTemplate içerisinde ayarlayabiliyoruz.

![AutoComplete kısmı özelleştirilmiş bir
AutoCompleteBox.](media/Silverlight_Toolkitten_AutoCompleteBox_kullanimi/22062009_4.png)\
*AutoComplete kısmı özelleştirilmiş bir AutoCompleteBox.*

**Taktikler**

Eğer herhangi bir AutoCompleteBox'ın ItemsSource'una kendi
tanımladığınız tiplerden oluşan listeler verirseniz AutoComplete
bölümünde saçma metinler görebilirsiniz. Normal şartlarda bir String
Array vs verildiğinde herhangi bir sorun olmuyor fakat kendi
tanımladığınız sınıflarda veya web servislerinden Proxy aracılığı ile
aldığınız sınıflarda sorun yaşayabilirsiniz. Bu durumu düzeltmenin yolu
kendi sınıflarınız için birer **ToString** extension'ı yazmak olabilir.
AutoCompleteBox kendisine verilen tüm nesnelerin üzerinden ToString
metodunu çağırarak gelen metni AutoComplete kısmında gösterir. O nedenle
siz de kendi sınıflarınızda ToString'i override ederek kendi istediğiniz
verileri geri döndürebilirsiniz.

**[VB]**

<span style="color: blue;">Namespace</span> ServiceReference1

    <span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Service1Urun

        <span style="color: blue;">Public</span> <span
style="color: blue;">Overrides</span> <span
style="color: blue;">Function</span> ToString() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">Me</span>.Adi & <span
style="color: blue;">Me</span>.Soyadi

        <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Namespace</span>

**[C\#]**

<span style="color: blue;">namespace</span> ServiceReference1

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Service1Urun</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">override</span> <span
style="color: blue;">string</span> ToString()

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.Adi + <span
style="color: blue;">this</span>.Soyadi;

        }

    }

}

Yukarıdaki örnek kod içerisinde ServiceReference1 adında bir servis
referansı ile beraber gelen Service1Urun adındaki nesnenin ToString
metodunu override ediyoruz. Artık söz konusu nesneden sonra ToString
denildiğinde buradaki Function çalışacak ve nesnenin **Adi** ile
**Soyadi** Property'lerini birleştirerek geri döndürecek. Böylece
AutoCompleteBox da bu ToString'den gelen veriyi gösterebilecek.

**Otomatik seçilseler...**

AutoComplete listesini gösteriyorsunuz fakat her seferinde kullanıcının
bir kayıt seçmek zorunda kalmasını da istemiyorsunuz. Belki de en uygun
seçecek hemen seçilebilir şekilde gelse? Nasıl mı?

![IsTextCompletionEnabled = True
olursa...](media/Silverlight_Toolkitten_AutoCompleteBox_kullanimi/22062009_3.png)\
*IsTextCompletionEnabled = True olursa...*

AutoCompleteBox'ın **IsTextCompletionEnabled** özelliği True yaparsanız
yukarıdaki gibi kullanıcılar metin girişi yaparken bir yandan da en
uygun seçeneği seçtirebilirsiniz. Böylece anında seçimi onaylayarak
kullanıcılar hızlıca işleme devam edebilirler.

Hepinize kolay gelsin.


