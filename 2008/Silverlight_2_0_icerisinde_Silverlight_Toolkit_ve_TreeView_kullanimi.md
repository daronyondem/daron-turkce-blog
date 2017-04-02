---
FallbackID: 2230
Title: Silverlight 2.0 içerisinde Silverlight Toolkit ve TreeView kullanımı
PublishDate: 10/29/2008
EntryID: Silverlight_2_0_icerisinde_Silverlight_Toolkit_ve_TreeView_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: ca1d60fd-f524-416b-87be-7519838cccde
---
Silverlight 2.0 ile beraber gelen kontrol sayısı 1.0'a kıyasla ciddi
miktarda arttı. Fakat hala eksikler var! İşte bu eksikleri Silverlight
sürümleri arasında doldurabilmek adına yeni bir proje
[CodePlex](http://www.codeplex.com) üzerinde yayında. Proje aslında uzun
süredir geliştiriliyor. Fakat daha yeni yeni stabil kontroller sunmaya
başladı. Aslında eski AJAX Control Toolkit'e benzetebileceğimiz bir
yapıda ilerleyen [Silverlight
Toolkit](http://www.codeplex.com/Silverlight) unutmamak gerek ki
doğrudan Microsoft tarafından geliştirilmiyor, tamamen açık kaynak
kodları ile gönüllü programcılar tarafından ilerletilen bu projede bazı
kontroller stabil olarak işaretlenmişken bazıları ise hala "Preview"
konumundalar.

İşte bu kütüphane içerisinde stabil olarak işaretlenmiş olan
kontrollerden belki de en acil ihtiyaç duyacağımız **TreeView**
kontrolünü bu yazımızda inceleyeceğiz.

**Nasıl yüklenir?**

Silverlight Toolkit içerisinde kontrollerden herhangi birini
kullanabilmek için ilk olarak tabi ki söz konusu kütüphaneyi CodePlex
üzerinden indirmeliyiz. Hemen aşağıdaki adresten son paketi
indirebilirsiniz;

<http://www.codeplex.com/Silverlight/Release/ProjectReleases.aspx?ReleaseId=18804>

Paketi bilgisayarınıza indirdiğinizde **Binaries** klasörü içerisinde
bulunan **Microsoft.Windows.Controls.dll** dosyasını yeni yarattığınız
bir Silverlight projesine Visual Studio içerisinde referans olarak
eklemeniz gerekiyor. Paket içerisinde bulunan diğer DLL'lere ve
dosyalara ileriki makalelerimizde değineceğiz.

Unutmayın, referans ekleme işlemini doğrudan Silverlight projenize
yapmanız gerek. Silverlight projenizle aynı Solution içerisinde bulunan
ASP.NET proje ile herhangi bir ilişkimiz yok.

Bu işlemi tamamladıktan sonra artık **Expression Blend** tarafına
geçerek kontrollerimizi kullanmaya başlayabiliriz. Eğer Expression Blend
ile değil de Visual Studio tarafında XAML kodlarını yazmak isterseniz
tek tek XAML içerisinde NameSpace tanımlarını yapmanız gerekecektir.

Expression Blend ile projemizi açtıktan sonra "Asset Library"e gidip
"Custom Controls" tabına geçtiğimizde TreeView kontrolü karşımıza
çıkıyor.

![TreeView kontrolü Expression Blend içerisinde karşımıza
çıkıyor!](http://cdn.daron.yondem.com/assets/2230/28102008_1.png)\
*TreeView kontrolü Expression Blend içerisinde karşımıza çıkıyor!*

TreeView kontrolünü Blend içerisinde projenizde herhangi bir XAML
dosyasına eklediğinizde XAML koduna dönüp bakarsanız aşağıdaki şekilde
gerekli NameSpace tanımlarının da yapılmış olduğunu göreceksiniz. Eğer
Blend kullanmasaydık bu işlemleri Visual Studio içerisinde elle yapmamız
gerekecekti.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication7.Page"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> **xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**controls**</span><span
style="color: blue;">**="clr-namespace:Microsoft.Windows.Controls;assembly=Microsoft.Windows.Controls"**\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

 

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**controls**</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span style="color: red;">
Margin</span><span style="color: blue;">="74,43,133,137"/\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

**Nasıl kullanılır?**

Bir TreeView aslında birden çok TreeViewItem içerir. İsterseniz bu
TreeViewItem'ları doğrudan Expression Blend içerisinde sürükle & bırak
tekniği ile TreeView içerisine yerleştirebileceğiniz gibi isterseniz
doğrudan kod ile databind işlemleri de yapabilirsiniz.

**[XAML]**

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span style="color: red;">
Margin</span><span style="color: blue;">="74,43,133,137"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Deneme1"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Denem 2"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Deneme 3"\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Height</span><span style="color: blue;">="100"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="100"</span><span style="color: red;">
Header</span><span style="color: blue;">="İçinde!"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde birden çok TreeViewItem içeren bir TreeView
görüyorsunuz. TreeView altında toplam üç adet TreeViewItem varken son
TreeViewItem içerisinde bir tane daha TreeViewItem var. Böylece iç içe
açılarak devam eden sonsüz döngüde bir ağaç yapısı oluşturmak mümkün.

TreeViewItem'ların Header özelliğine gözükecek metin değerini
girebileceğiniz gibi aslında farklı Silverlight kontrollerini de Header
içerisine koyma şansınız var.

**[XAML]**

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span style="color: red;">
Margin</span><span style="color: blue;">="74,43,133,137"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Deneme1"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Denem 2"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Header</span><span style="color: blue;">="Deneme 3"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span style="color: red;">
Height</span><span style="color: blue;">="100"</span>

                              <span style="color: red;">
Width</span><span style="color: blue;">="100"\></span>

<span style="color: #a31515;">**         ** </span><span
style="color: blue;">**\<**</span><span
style="color: #a31515;">**controls**</span><span
style="color: blue;">**:**</span><span
style="color: #a31515;">**TreeViewItem.Header**</span><span
style="color: blue;">**\>**</span>

<span style="color: #a31515;">**           ** </span><span
style="color: blue;">**\<**</span><span
style="color: #a31515;">**Image**</span><span style="color: red;">
**Height**</span><span style="color: blue;">**="50"**</span>

**                 ** <span style="color: red;"> **Width**</span><span
style="color: blue;">**="50"**</span>

**                 ** <span style="color: red;"> **Source**</span><span
style="color: blue;">**="Tree.jpg" /\>**</span>

<span style="color: #a31515;">**         ** </span><span
style="color: blue;">**\</**</span><span
style="color: #a31515;">**controls**</span><span
style="color: blue;">**:**</span><span
style="color: #a31515;">**TreeViewItem.Header**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeViewItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde de görebileceğiniz gibi TreeViewItem'lardan
birinin Header'ında bir Image nesnesi, yani fotoğraf var. Siz
uygulamalarınızda farklı fantaziler yaparak isterseniz MediaElement
aracılığı ile video bile koyabilir veya belki de TreeView içerisine bir
DataGrid veya Calendar bile koyabilirsiniz.

Gelelim tüm bu işlemlerin kod ile nasıl yapıldığına. Varsayalım elimizde
TreeView'de göstermek istediğimiz bir veri var. İlk olarak bu veriyi
uygun şekilde düzenlememiz gerek. Bizim örneğimizde **Fiyati** ve
**Adi** gibi özelliklere sahip bir sınıf kullanalım. Her bir
TreeViewItem bu sınıf üzerinden oluşturulacak.

**[VB]**

    <span style="color: blue;">Class</span> Urun

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Adi**() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PAdi

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                PAdi = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PFiyati <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Fiyati**() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PFiyati

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

                PFiyati = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PList <span
style="color: blue;">As</span> List(<span style="color: blue;">Of</span>
Urun)

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Liste**() <span
style="color: blue;">As</span> List(<span style="color: blue;">Of</span>
Urun)

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PList

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> List(<span style="color: blue;">Of</span>
Urun))

                PList = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">
**New**</span>()

            <span style="color: blue;">Me</span>.PList = <span
style="color: blue;">New</span> List(<span
style="color: blue;">Of</span> Urun)

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

        <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

        {

            <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

            <span style="color: blue;">public</span> <span
style="color: blue;">int</span> Fiyati { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

            <span style="color: blue;">public</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">Urun</span>\> Liste { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

 

            <span style="color: blue;">public</span> Urun()

            {

                <span style="color: blue;">this</span>.Liste = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">Urun</span>\>();

            }

        }

Gördüğünüz gibi sınıfımızın **Adi** ve **Fiyati** özellikleri haricinde
bir de **List** tipinden **Liste** adında Property'si var. Bunun nedeni
aslında çok basit. Her bir TreeViewItem'ın kendi içinde birden çok
TreeViewItem olabilir demiştik. Bizim her bir ürünümüzün için de bu
şekilde birden çok ürün saklanabiliyor olacak. Verimizi bu şekilde
üretip TreeView'e DataBind ettiğimizde TreeView geri kalanı halledecek.

Gelin şimdi de bizim için deneme amaçlı olarak geçici veri yığını
yaratacak bir kod yazalım.

**[VB]**

    <span style="color: blue;">Function</span> **Veriyarat**() <span
style="color: blue;">As</span> List(<span style="color: blue;">Of</span>
Urun)

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Urun)

        <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 10

            <span style="color: blue;">Dim</span> BirUrun = <span
style="color: blue;">New</span> Urun <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün"</span> & x, .Fiyati = Rnd() \* 1000}

            <span style="color: blue;">For</span> y <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 5

                BirUrun.Liste.Add(<span style="color: blue;">New</span>
Urun <span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün"</span> & y, .Fiyati = Rnd() \* 1000})

            <span style="color: blue;">Next</span>

            Liste.Add(BirUrun)

        <span style="color: blue;">Next</span>

        <span style="color: blue;">Return</span> Liste

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

**[C\#]**

       <span style="color: blue;">public</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">Urun</span>\> Veriyarat()

        {

            <span style="color: #2b91af;">Random</span> RastGele = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Random</span>();

            <span style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">Urun</span>\> Liste = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">Urun</span>\>();

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> x = 0; x \<= 10; x++) {

                <span style="color: #2b91af;">Urun</span> BirUrun =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün"</span> + x.ToString(), Fiyati =
RastGele.Next(0,1000) };

                <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> y = 0; y \<= 5; y++) {

                    BirUrun.Liste.Add(<span
style="color: blue;">new</span> <span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün"</span> + y.ToString(), Fiyati =
RastGele.Next(0, 1000) });

                }

                Liste.Add(BirUrun);

            }

            <span style="color: blue;">return</span> Liste;

        }

Kodumuz içerisinde toplam 10 adet içerisinde 5'er ürün bulunan ürün
yaratılıyor. Şimdi tüm bu listeyi alarak doğrudan TreeView'ın
ItemsSource özelliğine aktaracağız. Siz örneklerinizde farklı sınıflar
ve farklı veri kaynakları kullanabilirsiniz. Özellikle LINQ2SQL veya
Data Services kullandığınızı düşünürsek zaten elinize bu şekilde hazır
nesneler gelecektir.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Agac.ItemsSource = Veriyarat()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(Page\_Loaded);

        }

 

        <span style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            Agac.ItemsSource = Veriyarat();

        }

Veri bağlantımızı yaptık. Fakat bu TreeViewItem'lar nasıl yaratılacak?
**Fiyati** ve **Adi** adındaki özelliklerin içindeki değerler nerede
gösterilecek? İşte bu noktada XAML tarafına geçerek bir ItemTemplate
düzenlememiz gerekiyor. Böylece **TreeView** kendisine bağlanan veriye
göre **TreeViewItem'lar** yaratırken nasıl bir görsellikten yola
çıkacağını ve bu görsellik içerisinde gelen veriden hangi değerlerin
nerelere yerleştirileceğini anlayabilecek.

**[XAML]**

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView</span><span style="color: red;">
Margin</span><span style="color: blue;">="74,43,133,137"</span>

                      <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Agac"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView.**ItemTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**HierarchicalDataTemplate**</span><span
style="color: red;"> ItemsSource</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
**Liste**</span><span style="color: blue;">}"\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span style="color: red;">
Orientation</span><span style="color: blue;">="Horizontal"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Text</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
**Adi**</span><span style="color: blue;">}"</span>

                      <span style="color: red;"> Margin</span><span
style="color: blue;">="5,0,0,0"</span>

                      <span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span>

                      <span style="color: red;"> FontSize</span><span
style="color: blue;">="10" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Text</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
**Fiyati**</span><span style="color: blue;">}"</span>

                      <span style="color: red;"> Margin</span><span
style="color: blue;">="5,0,0,0"</span>

                      <span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span>

                      <span style="color: red;"> FontSize</span><span
style="color: blue;">="10" /\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**HierarchicalDataTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TreeView.**ItemTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**TreeView**</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu ile aslında uygulamamızı sonlandırmış olduk. Peki
neler yaptık? İlk olarak TreeView'ın **ItemTemplate'i** içerisinde yine
Toolkit içerisinden gelen **HierarchicalDataTemplate** nesnesini
yerleştirdik. Bu nesne bizim kod tarafında yarattığımız nested yapıyı
algılayarak iç içe TreeViewItem'ların yaratılmasını sağlayacak fakat
DataBind yaptığımız sınıfların hangi Property'sinin başka nested
TreeViewItem'ların verilerini sakladığını anlayabilmesi için söz konusu
Property'nin adını vermemiz lazım. Hatırlarsanız bizde Urun sınıfının
Liste adında bir property'si vardı ve tüm alt öğeleri o saklıyordu. Biz
de burada **HierarchicalDataTemplate** 'e **ItemsSource** olarak
**Liste'yi** **Bind** ediyoruz. Geri kalanı kendisi halledecektir.

**HierarchicalDataTemplate** içerisinde doğrudan her bir TreeViewItem'ın
Header bilgisini girer gibi istediğiniz Silverlight kontrollerini
kullanabiliyorsunuz. Burada yapacağınız tasarım her **TreeViewItem**
için kullanılacaktır. Tabi bunu yaparken Binding'lerimizi de unutmuyoruz
ve yerine göre **Fiyati** ve **Adi** özelliklerini istediğimiz
kontrollerin istediğimiz özelliklerine Bind ediyoruz. Bizim örneğimizde
bir **StackPanel** içerisinde **Fiyati** ve **Adi** özelliklerini
gösterecek iki farklı **TextBlock** bulunuyor.

![DataBind TreeView örneğimiz
bitti.](http://cdn.daron.yondem.com/assets/2230/28102008_2.png)\
*DataBind TreeView örneğimiz bitti.*

Tüm verimizi bağladığımıza göre yeri geldiğinde seçili öğeyi nasıl
yakalarız? Her bir TreeView'ın kendi **SelectedItemChanged** event'ı
var. Bu event çalıştığında söz konusu TreeView'ın **SelectedItem**
özelliğinden seçili öğeyi alabilirsiniz. En önemlisi **SelectedItem**
size aslında **DataBind** esnasında bağlanan verinin içerisinde bulunan
nesneyi döndürüyor. Yani bizim örneğimizde **SelectedItem'ı** aldığımda
elimize **Urun** tipinden bir nesne gelecek. Gönül daha ne ister? :)

Hepinize kolay gelsin.


