---
FallbackID: 2038
Title: "Silverlight 2.0 ItemsControl ve ObservableCollection ile DataBinding"
date: "2008-4-27"
EntryID: Silverlight_2_0_ItemsControl_ve_ObservableCollection_ile_DataBinding
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 6d471b0f-da7e-40e4-b965-eb572d1bf3f8
---
# Silverlight 2.0 ItemsControl ve ObservableCollection ile DataBinding
ASP.NET kullanırken en sevdiğim kontrol Repeater kontrolüdür. Bana
herşeyi istediğim gibi esnek bir şekilde düzenleme şansı tanır. Aynı
mantıkla **Silverlight 2.0 Beta 1** tarafına geçtiğimizde karşımızda
**ItemsControl** çıkıyor. ItemsControl'e bağladığınız herhangi bir veri
içerisindeki her Item'ın nasıl gözükeceği aynı Repeater içerisinde
olduğu gibi bir **ItemTemplate** aracılığı ile karar verebiliyorsunuz.
Ayrıca tüm bu Item'ların nasıl bir kontrol içerisinde ekrana
yerleştirileceğini de belirleme şansınız var. Özünde **ItemsControl**
tek başına herhangi bir görsellik barındırmıyor, herşeyi sizin tek tek
ayarlamış olmanız şart.

Örneğimizde elimizde bulunan bir ürün listesini ItemsControl'e
bağlayarak ürünlerin isimleri ile satış grafiklerini göstereceğiz. Bunu
yaparken de Silverlight 2.0 ile beraber gelen DataBinding sistemini
kullanacağız. İlk olarak gelin code-behind tarafından başlayalım ve ürün
listemizi yaratacağımız ürün tipini tanımlayalım.

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

 

    <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
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

 

    <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PSatis

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

            PSatis = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>()

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
adi <span style="color: blue;">As</span> <span
style="color: blue;">String</span>, <span
style="color: blue;">ByVal</span> satis <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

        <span style="color: blue;">Me</span>.Adi = adi

        <span style="color: blue;">Me</span>.Satis = satis

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz gibi aslında klasik bir .NET sınıfından farklı değil. Her
zamanki gibi **Urun** sınıfımızı / tipini yarattık ve bu sınıf üzerinde
bir liste üreterek ItemsControl'e bağlayacağız. Normal şartlarda olsa
belki bir **Generic.List** kullanırdık oysa Silverlight 2.0 ile beraber
bir **ObservableCollection** kullanacağız. Bunun tabi ki mantıklı bir
nedeni var. **ObservableCollection** yapıları Silverlight 2.0 tarafında
DataBind işlemleri için kullanıldıklarında Public bir
**ObservableCollection** listesi bir defa herhangi bir kontrole
bağlandıktan sonra sürekli organik bir bağ içerisinde kalıyor. Böylece
eldeki liste üzerinde herhangi bir değişiklik kod tarafında yapıldığında
otomatik olarak sonuç görsel öğelere de yansıyor. Biz de bu nedenle
örneğimizde **ObservableCollection** listesi kullanacağız, böylece kod
tarafında listede bir değişiklik yaptığımızda sonuç doğrudan görsel
olarak ItemsControl'e yansıyacak.

<span style="color: blue;">Public</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.ObjectModel.ObservableCollection(<span
style="color: blue;">Of</span> Urun)

 

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

    <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 9

        Liste.Add(<span style="color: blue;">New</span> Urun(<span
style="color: #a31515;">"Urun Adi "</span> & x, Rnd() \* 150))

    <span style="color: blue;">Next</span>

    UrunlerControl.ItemsSource = Liste

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz gibi aslında **ObservableCollection'ların** normal
**Generic.List'**lerden kullanım açısından pek bir farkı yok. Biz
örneğimizde rastgele ürünler ve satış rakamları yaratarak ürettiğimiz
listeyi, adını **UrunlerControl** olarak koyduğumuz **ItemsControl**
nesnesine **ItemsSource** özelliği üzerinden bağlıyoruz.

**Gelelim XAML kodumuza...**

<span style="color: blue;">\<</span><span
style="color: #a31515;">ItemsControl</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">27,8,44,8</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">UrunlerControl</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

          **Her bir yaratılan öğenin görsel tanımı buraya gelir.**

<span style="color: blue;">        \</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

            **Tüm yaratılan öğelerin içerisine yerleştirileceği ortamı
tanımlar.**

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">ItemsControl</span><span
style="color: blue;">\></span>

Yukarıdaki ItemsControl içerisinde toplamda iki farklı **Template**
bulunuyor. Bunlardan ilki **ItemTemplate** içerisinde **DataTemplate**.
ItemsControl'e bağladığımız verideki her biri **Urun** için bir adet
**DataTemplate** oluşturulacaktır. Bu sistemi ASP.NET'teki Repeater
içerisinde ItemTemplate yapısına benzetebiliriz. Tüm bu yaratılan
DataTemplate'lar ise **ItemsPanel** içerisinde **ItemsPanelTemplate'ta**
tanımlanmış görsel yapının içerisine oturtulacaktır. ItemsControl'un
kendine ait bir görsel yapısı olmadığı için aslında ItemsPanelTemplate
bu yapıyı oluşturuyor olacak.

Biz örneğimizde ana yapı olarak bir **StackPanel** kullanacağız ve
**ItemsPanelTemplate** içerisinde içindeki nesneleri dikey hizalamaya
ayarlanmış bir StackPanel bulunacak.

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">StackPanel</span><span style="color: blue;">
</span><span style="color: red;">Orientation</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Vertical</span>"<span
style="color: blue;">\>\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

Diğer yandan üretilecek olan her biri **Urun'un** görselliği için de
**DataTemplate** içerisinde bir **TextBlock** bir de **Rectangle**
kullanacağız. **DataTemplate** içerisine sadece bir element
yerleştirebildiğimiz için bir ContainerElement olarak yine
**StackPanel** kullanacağız. Bu sefer her bir **Urun** için
oluşturulacak olan StackPanel'ler kendi içlerindeki nesneleri yatay
olarak hizalayacaklar. Böylece StackPanel'ler içerisindeki TextBlock ve
Rectangle'lar yan yana duracaklar.

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">**StackPanel**</span><span style="color: blue;">
</span><span style="color: red;">Orientation</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Horizontal</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">**TextBlock**</span><span
style="color: blue;">/\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">**Rectangle**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

Amacımız TextBlock içerisinde ürünün adını gösterirken ürün satış
rakamına göre Rectangle'ın da genişliğini ayarlayarak genişliğine göre
ürünlerin yanında bir satış grafiği göstermek. Bu durumda hemen
Silverlight 2.0'a özel DataBind sistemini kullanarak TextBlock'un
**Text** özelliğini **ItemsControl'a** aktarılan verilerin **Adi**
özelliğine, Rectangle'ın **Width** özelliğini de **Satis** değerine
bağlamamız gerekiyor.

<span style="color: blue;">          \<</span><span
style="color: #a31515;">StackPanel</span><span style="color: blue;">
</span><span style="color: red;">Orientation</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Horizontal</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;"> ****
</span><span style="color: red;">**Text**</span><span
style="color: blue;">**=**</span>"<span style="color: blue;">**{Binding
Adi}**</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span style="color: red;">
**Width**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**{Binding Satis}**</span>"<span
style="color: blue;"> </span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

İşimiz tamamlandı. Artık uygulamamızı çalıştıracak sonucu görebiliriz.
Fakat onun öncesinde gelin sürekli ürünlerin listesini değiştiren bir de
Düğme ekleyelim uygulamamıza ve elimizdeki **ObservableCollection**
yapısındaki ürün listesini sürekli değiştirsin. Düğmemizin arkaplandaki
koduna aşağıdaki satırları yazmamız yeterli olacaktır.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

    Liste.Clear()

    <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 9

        Liste.Add(<span style="color: blue;">New</span> Urun(<span
style="color: #a31515;">"Urun Adi "</span> & x, Rnd() \* 150))

    <span style="color: blue;">Next</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod içerisinde **ObservableCollection** listemizi temizliyor
ve tekrar ürünler ekliyoruz. Herhangi bir şekilde tekrar DataBind işlemi
yapmasak da söz konusu işlemlerin sonucu ItemsControl'ün görsel
arayüzüne yansıyor.

Uygulamamızın tam XAML kodunu aşağıda inceleyebilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication8.Page</span>"

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
style="color: #a31515;">ItemsControl</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">27,8,44,8</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">UrunlerControl</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">StackPanel</span><span style="color: blue;">
</span><span style="color: red;">Orientation</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Horizontal</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span style="color: blue;">{Binding
Adi}</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">{Binding
Satis}</span>"<span style="color: blue;"> </span><span
style="color: red;">Fill</span><span style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ItemsControl.ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">StackPanel</span><span style="color: blue;">
</span><span style="color: red;">Orientation</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Vertical</span>"<span
style="color: blue;">\>\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ItemsPanelTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ItemsControl.ItemsPanel</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ItemsControl</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,17,8</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">70</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Yenile</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dugme</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Code-Behind kısmındaki VB kodumuz da bu şekilde;

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
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

 

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>()

 

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

        <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
adi <span style="color: blue;">As</span> <span
style="color: blue;">String</span>, <span
style="color: blue;">ByVal</span> satis <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

            <span style="color: blue;">Me</span>.Adi = adi

            <span style="color: blue;">Me</span>.Satis = satis

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

 

    <span style="color: blue;">Public</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.ObjectModel.ObservableCollection(<span
style="color: blue;">Of</span> Urun)

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 9

            Liste.Add(<span style="color: blue;">New</span> Urun(<span
style="color: #a31515;">"Urun Adi "</span> & x, Rnd() \* 150))

        <span style="color: blue;">Next</span>

        UrunlerControl.ItemsSource = Liste

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        Liste.Clear()

        <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 9

            Liste.Add(<span style="color: blue;">New</span> Urun(<span
style="color: #a31515;">"Urun Adi "</span> & x, Rnd() \* 150))

        <span style="color: blue;">Next</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Silverlight 2.0 Beta 1 ile beraber gelen bu DataBind özellikleri aslında
WPF tarafından tanıdık olsa da Cross-Platform olarak istemci tarafında
bu işlemleri yapabiliyor olmak gerçekten heyecan verici.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-4-27 tarihinde yayinlanmistir.*
