---
FallbackID: 2376
Title: Silverlight 3.0 içerisinde DataPager ve istemci/sunucu taraflı sayfalama
PublishDate: 7/2/2009
EntryID: Silverlight_3_0_icerisinde_DataPager_ve_istemci-sunucu_tarafli_sayfalama
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 97826af2-6e81-421b-9bcf-94502e4f64f2
---
Sayfalama senaryoları her zaman ihtiyacımız olan işlevselliklerden
olmuştur. En basit kullanımı ile bir DataGrid içerisindeki verinin
sayfalanabilir olarak gösterilebilmesi gerekir. Bu sayfalama işlemi
bazen sunucu taraflı bazen de istemci taraflı yapılabilir. Bu makalede
Silverlight 3.0 ile beraber gelen DataGrid kontrolünü kullanarak
sayfalama işlemlerine göz atacağız.

**Sayfalama için görsel kontrol?**

Sayfalama işlemi için doğrudan Silverlight 3.0 ile beraber gelen
**DataPager** kontrolünü kullanacağız. Bu kontrol kendisine verilen
**PagedCollectionView** nesnesine göre sayfalama yapabiliyor. Tabi söz
konusu veriyi doğrudan DataPager'a vermek pek anlamlı değil o nedenle
verimizi yaratıp ilk olarak bir gride bağlayalım. Sonrasında Grid
içerisindeki veriyi sayfalaması üzerine DataPager'a gerekli komutu
vereceğiz.

**İstemci taraflı sayfalama...**

İlk örneğimizde tüm veriyi istemci tarafında sayfalayacağız. Bu gibi bir
sayfalamayı ancak tüm veriyi istemci tarafına uygun bir sürede
alabiliyorsanız yapabilirsiniz. Eğer elinizdeki veri bir defada
istemciye yüklenemeyecek durumda ise sayfalamayı da tabi ki sunucu
tarafında yapmak gerekecektir. İstemci tarafındaki sayfalama aslında
sadece görsel amaçlarla ve ileriki adımlarda filtreme için
kullanılabilir.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
xmlns</span><span style="color: blue;">:</span><span
style="color: red;">data</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">layoutToolkit</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Layout.Toolkit"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">dataControls</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data.DataForm"</span>

       <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication77.MainPage"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span><span
style="color: red;"> Width</span><span
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
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Grid"\>\</</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Pager"\>\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span
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

Yukarıdaki örneğimizde bir DataGrid ve bir de DataPager kontrolü
bulunuyor. Söz konusu kontrollere gerekli isimleri de vererek kod
tarafından ulaşılabilir hale getirip uygulamamıza devam edebiliriz.
Elimizde basit bir isim listesi olduğunu düşünürsek ilk olarak bu
listeyi bir **PagedCollectionView'a** çevirmemiz gerekecek.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> AnaListe <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> <span
style="color: blue;">String</span>)

        AnaListe.Add(<span style="color: #a31515;">"Daron"</span>)

        AnaListe.Add(<span style="color: #a31515;">"Burak"</span>)

        AnaListe.Add(<span style="color: #a31515;">"Muammer"</span>)

        AnaListe.Add(<span style="color: #a31515;">"Uğur"</span>)

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
**PagedCollectionView**(AnaListe)

 

        **Grid**.ItemsSource = Liste

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod içerisinde basit bir String List'in
**PagedcollectionView'a** çevrilmesini görebilirsiniz. Aslında işlem
epey basit çünkü PagedCollectionView zaten constructor'larından birinde
**IEnumarable** interface'ini implemente eden obje istiyor. Elimizdeki
liste de buna uyduğunu göre doğrudan çeviri işlemini hızlıca
halledebiliyoruz. Son olarak eldeki PagedCollectionView'u da Grid
adındaki DataGrid'imize aktarmamız ilk aşamanın tamamlanması için
yeterli olacaktır.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
xmlns</span><span style="color: blue;">:</span><span
style="color: red;">data</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">layoutToolkit</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Layout.Toolkit"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">dataControls</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data.DataForm"</span>

       <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication77.MainPage"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span><span
style="color: red;"> Width</span><span
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
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Grid"\>\</</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Pager"</span><span style="color: red;">
PageSize</span><span style="color: blue;">="2"</span><span
style="color: red;"> DisplayMode</span><span
style="color: blue;">="PreviousNextNumeric"</span>

                   <span style="color: red;"> **Source**</span><span
style="color: blue;">**="{**</span><span
style="color: #a31515;">**Binding**</span><span style="color: red;">
**ItemsSource**</span><span style="color: blue;">**,**</span><span
style="color: red;"> **ElementName**</span><span
style="color: blue;">**=Grid}"**\>\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span
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

Şu ana kadar DataPager kontrolümüz ile DataGrid'in birbirinden haberi
yoktu. İşte yukarıdaki kod içerisinde bu iki kontrolü birbirinden
haberdar ediyoruz ve DataGrid'in ItemsSource'un kodumuz ile vermiş
olduğumuz PagedViewCollection'ın DataPager tarafından kontrol edilmesini
sağlıyoruz.

Tüm bu işlemleri yapabilmek için basit bir Element Binding kullanarak
**DataPager'ın** **Source** Property'sini **Grid'in**
**ItemsSource'una** bind etmemiz yeterli oluyor. Artık elimizde istemci
tarafında sayfalama ile çalışabilen bir DataGrid var. DataGrid'in her
sayfasında kaç kayıt gösterileceğini **PageSize** özelliğinden
ayarlayabilirsiniz.

![Sayfalama desteği ile bir DataGrid
kontrolü.](http://cdn.daron.yondem.com/assets/2376/01072009.png)\
*Sayfalama desteği ile bir DataGrid kontrolü.*

DataPager ile ilgili farklı görsel özellikler için **DisplayMode**
Enumaration'ını incelemenizi tavsiye ederim.

**Sunucu taraflı sayfalama...**

Eğer veri miktarınız çok yüksek ise maalesef tüm veriyi istemci tarafına
almak gibi bir şansınız olmayabilir. Bu gibi durumlarda Silverlight
uygulamasının sürekli olarak istediği sayfanın sayısını sunucuya
göndererek sadece o sayfadaki veriyi sunucudan alması gerekecektir.
Tahmin edebileceğiniz üzere bu işin iki farklı ayağı var; birincisi
sunucu tarafında uygun sayfaya ait veriyi sayfa numarasına göre
döndürebilen bir web servisinin hazırlanması, ikincisi ise bu servisin
Silverlight tarafından doğru olarak kullanılabilmesi.

**[Service / VB]**

    <span style="color: blue;">Dim</span> DB <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
DataClasses1DataContext

 

    \<OperationContract()\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> VeriGetir(<span
style="color: blue;">ByVal</span> Atla <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> Al <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> List(<span style="color: blue;">Of</span>
Urunler)

        <span style="color: blue;">Return</span> (<span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> DB.Urunlers <span
style="color: blue;">Skip</span> (Atla) <span
style="color: blue;">Take</span> (Al) <span
style="color: blue;">Select</span> inc).ToList()

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

    \<OperationContract()\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> KayitSayisi() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> (<span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> DB.Urunlers <span
style="color: blue;">Select</span> inc).Count

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

Yukarıda sunucu tarafındaki servisimizin kodunu bulabilirsiniz. Toplamda
iki servise ihtiyacımız var; bu servislerinden biri veritabanında
bulunan toplam kayıt sayısını alarak istemciye göndermek zorunda.
Böylece DataPager kontrolü toplam kaç sayfalık bir veri ile uğraştığını
bilebilecek. Diğer yandan sayfa sayfa duruma göre veri döndürebilecek
bir servis de kesinlikle şart. Tüm bunları LINQ2SQL ile beraber
yaparsanız sayfalamanız otomatik olarak SQL tarafına kadar taşınmış
oluyor. Aksi halde sizin SQL tarafındaki sayfalama mekanizmasını da
kurmanız gerekecektir.

Özellikle VeriGetir adındaki metodumuzu incelemek gerekirse toplamda iki
parametre aldığını görebiliriz. Bunlardan biri veritabanından kayıt
çekilirken kaç kayıt atlanmasını gerektiğini diğeri ise kaç kayıt
alınması gerektiğini belirtiyor. Örneğin her defasında 10'ar kayıt
gösteriyorsak ve üçüncü sayfadaysak toplam 20 kayıt atlamamız gerektiği
ve 10 kayıt almamız gerektiğini hesaplamak pek zor değil. Bu
hesaplamaları Silverlight tarafında yaparak servise parametre olarak
vereceğiz. Servis de bize uygun veriyi döndürecek.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
xmlns</span><span style="color: blue;">:</span><span
style="color: red;">data</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">layoutToolkit</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Layout.Toolkit"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">dataControls</span><span
style="color: blue;">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data.DataForm"</span>

       <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication77.MainPage"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

       <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span><span
style="color: red;"> Width</span><span
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
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Grid"\>\</</span><span
style="color: #a31515;">data</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Pager"</span><span style="color: red;">
PageSize</span><span style="color: blue;">="1"</span><span
style="color: red;"> DisplayMode</span><span
style="color: blue;">="PreviousNextNumeric"\>\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataPager</span><span
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

Yukarıdaki XAML kodu uygulamamızın ana ekranını temsil ediyor. Bir
önceki örneğimizden farklı olarak burada artık bir ElementBinding
kullanmadığımı görebilirsiniz. Nedeni çok basit; artık tüm veri DataGrid
üzerinde değil o nedenle DataPager gidip de Grid'in ItemsSource'u
üzerinden sayfalama yapamayacak.

<span style="color: #FF0000">*Not:* ***ElementBinding*** *mekanizmasının
çalışmasını ve ilk örneğimizdeki sistemi daha profesyonel bir şekilde
veriyi sunucu tarafında sayfalar hale getirmek isterseniz yapmanız
gereken* ***IPagedCollectionView*** *interface'ini implemente eden kendi
PagedCollectionView nesnenizi programlamanız. Nesne içerisinde sayfa
değişim eventlarından bir çok farklı duruma erişip verinin uygun
kaynaklardan alınmasını sağlayabilirsiniz. Ben kişisel olarak ne kadar
bu yolun daha profesyonel olduğunu düşünsem de hem yazılım geliştirme
süreci olacak hem de kalifikasyon açısından hedeflediğimiz işlevsellik
için biraz yüksek seviyede kaldığını düşünüyorum. O nedenle makalede çok
daha basit bir teknik kullanacağım. Eğer siz daha karışık
işlevselliklere ihtiyaç duyarsanız* ***IPagedCollectionView***
*interface'i üzerinden ilerleyebilirsiniz.*</span>

DataPager'ı kullanmaktaki tek amacımız kullanıcıya uygun arayüzü
göstermesi. Yani "sağ" "sol" düğmeleri ve "sayılar" bizim için yeterli.
Bundan sonrasında ne de olsa sunucu tarafında sayfalama yapacağımıza
göre DataPager'ın bize kullanıcı tarafından seçili sayfanın sayısını
vermesi yeterli olacaktır. Fakat DataPager'ın çalışması için uygun bir
PagedViewCollection'ın **Source** olarak atanmış olması şart.

**[VB]**

    <span style="color: blue;">WithEvents</span> Servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.Service1Client

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Servis.KayitSayisiAsync()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_KayitSayisiCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
ServiceReference1.KayitSayisiCompletedEventArgs) <span
style="color: blue;">Handles</span> Servis.KayitSayisiCompleted

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Nullable(<span
style="color: blue;">Of</span> <span
style="color: blue;">Integer</span>))

        <span style="color: blue;">For</span> index <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 1 <span style="color: blue;">To</span> e.Result

            Liste.Add(<span style="color: blue;">Nothing</span>)

        <span style="color: blue;">Next</span>

        <span style="color: blue;">Dim</span> DummyList <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
PagedCollectionView(Liste)

        Pager.Source = DummyList

 

        Servis.VeriGetirAsync(Pager.PageIndex \* Pager.PageSize,
Pager.PageSize)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Sayfa ilk yüklendiğinde hemen kayıt sayısını getirecek olan servisimizi
çağırıyoruz. Söz konusu servisten toplam kayıt sayısı geldiği gibi
sadece DataPager'a verilmek üzere boş bir List yaratıyoruz. Bu List
içerisinde **Item** sayısı gelen kayıt sayısı ile aynı fakat List'in
içindeki her Item aslında boş! DataPager'ın çalışması için aslında boş
bir liste yaratıp kendisini kandırıyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Pager\_PageIndexChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Pager.PageIndexChanged

        Servis.VeriGetirAsync(Pager.PageIndex \* Pager.PageSize,
Pager.PageSize)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_VeriGetirCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
ServiceReference1.VeriGetirCompletedEventArgs) <span
style="color: blue;">Handles</span> Servis.VeriGetirCompleted

        Grid.ItemsSource = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Artık DataPager kontrolümüzün PageIndexChanged durumunu yakalayabiliriz.
Her defasında sayfa değiştiğinde sayfa sayısı ile sayfa boyutunu çarpıp
atlanacak olan kayıt sayısını buluyoruz. Zaten sayfa sayısı Index olarak
geldiği için ilk sayfada 0 gelecek ve atlanacak kayıt sayısı da 0
olacak. Servise göndermemiz gereken ikinci parametre de zaten
DataPager'ın PageSize özelliği, yani sayfa başına gösterilecek kayıt
sayısı.

Son olarak bu servisimizden gelen sonucu da Grid'imize bağlarsak işlem
tamamlanmış olacaktır. Artık elimizde sunucu tarafında sayfalama
yapabilen bir arayüzümüz var.


