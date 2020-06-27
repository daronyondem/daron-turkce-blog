---
FallbackID: 2204
Title: "Silverlight 2.0 RC0 içerisinde ComboBox kullanımı."
date: "2008-10-3"
EntryID: Silverlight_2_0_RC0_icerisinde_ComboBox_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 494df829-6d32-4a2b-956f-b4bd5851c024
---
# Silverlight 2.0 RC0 içerisinde ComboBox kullanımı.
Silverlight 2.0 RC0 ile gelen yeni kontrollerden biri de ComboBox
kontrolü. Bu yazımızda Combobox'ın kullanımına, görsel düzenlemelerin
nasıl yapıldığında göz atacağız. İlk olarak yeni bir Silverlight projesi
yaratalım ve Expression Blend 2 içerisinden Asslet Library'de bir
**Combobox** bularak sahneye yerleştirelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication5.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**ComboBox**</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">              </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Top</span>"

<span style="color: blue;">              </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">157</span>"

<span style="color: blue;">              </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">38,43,0,0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu sahnede boş bir Combobox yaratacaktık. **Combobox**
içerisine XAML kodu ile yeni öğeler eklemek istersek Combobox'ın
**Items** dizisine **ComboBoxItem'lar** eklememiz gerekecek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">          </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Top</span>"

<span style="color: blue;">          </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">157</span>"

<span style="color: blue;">          </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">38,43,0,0</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">İlk
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">İkinci
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Son
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">ComboBox</span><span
style="color: blue;">\></span>

Her ComboBoxItem'ın ayrıca bir de **IsSelected** özelliği var. Böylece
uygulama ilk çalıştırıldığında ve ComboBox sahneye ilk geldiğinde hangi
Item'ın seçili olacağına karar verebilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">          </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Top</span>"

<span style="color: blue;">          </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">157</span>"

<span style="color: blue;">          </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">38,43,0,0</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;"> **IsSelected**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**True**</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">İlk
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">İkinci
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Son
Seçenek</span>"<span style="color: blue;">\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">ComboBox</span><span
style="color: blue;">\></span>

Tabi çoğu zaman bizler uygulamalarımızda bu şekilde seçenekleri XAML
kodu içerisine gömmeyeceğiz. Genelde bir veri kaynağımız olacak ve veri
kaynağındaki listelerin ComboBox içerisinde gösterilmesini tercih
edeceğiz. Bu durumda gelin şimdi de ComboBox'a nasıl veri
bağlayabileceğimizi inceleyelim.

İlk olarak **Urun** adında sınıfımızı tanımlayalım ve bu sınıf üzerinden
örneğimizde kullanacağımız geçici veriyi üretelim.

**[VB]**

<span style="color: blue;">Class</span> Urun

 

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

 

 

    <span style="color: blue;">Private</span> PFiyat <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Fiyat() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PFiyat

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

            PFiyat = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

        <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

        {

            <span style="color: blue;">private</span> <span
style="color: blue;">string</span> PAdi;

            <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PAdi; }

                <span style="color: blue;">set</span> { PAdi = <span
style="color: blue;">value</span>; }

            }

 

 

            <span style="color: blue;">private</span> <span
style="color: blue;">int</span> PFiyat;

            <span style="color: blue;">public</span> <span
style="color: blue;">int</span> Fiyat

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PFiyat; }

                <span style="color: blue;">set</span> { PFiyat = <span
style="color: blue;">value</span>; }

            }

        }

Uygulamamız ilk çalıştırıldığında yukarıda tanımladığımız **Urun**
sınıfından nesneler yaratarak bir **List** değişkenine ekleyeceğiz.
Sonra da bu listeyi **ComboboxUrunler** adını verdiğimiz Combobox'ımıza
bağlayacağız.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

    <span style="color: blue;">Dim</span> Urunler <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Urun)

    Urunler.Add(<span style="color: blue;">New</span> Urun <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi1"</span>, .Fiyat = 1000})

    Urunler.Add(<span style="color: blue;">New</span> Urun <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi2"</span>, .Fiyat = 2000})

    Urunler.Add(<span style="color: blue;">New</span> Urun <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi3"</span>, .Fiyat = 3000})

    Urunler.Add(<span style="color: blue;">New</span> Urun <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi4"</span>, .Fiyat = 4000})

 

    comboboxUrunler.DisplayMemberPath = <span
style="color: #a31515;">"Adi"</span>

    comboboxUrunler.ItemsSource = Urunler

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            <span style="color: #2b91af;">List</span>\<Urun\> Urunler =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<Urun\>();

            Urunler.Add(<span style="color: blue;">new</span> Urun { Adi
= <span style="color: #a31515;">"Ürün Adi1"</span>, Fiyat = 1000 });

            Urunler.Add(<span style="color: blue;">new</span> Urun { Adi
= <span style="color: #a31515;">"Ürün Adi2"</span>, Fiyat = 2000 });

            Urunler.Add(<span style="color: blue;">new</span> Urun { Adi
= <span style="color: #a31515;">"Ürün Adi3"</span>, Fiyat = 3000 });

            Urunler.Add(<span style="color: blue;">new</span> Urun { Adi
= <span style="color: #a31515;">"Ürün Adi4"</span>, Fiyat = 4000 });

 

            comboboxUrunler.DisplayMemberPath = <span
style="color: #a31515;">"Adi"</span>;

            comboboxUrunler.ItemsSource = Urunler;

        }

Combobox'ın **ItemsSource** özelliğine aktardığımız liste otomatik
olarak Combobox'ın içerisine tüm öğelerin yerleştirilmesini
sağlayacaktır fakat bizim yarattığımız **Urun** sınıfının hangi
özelliğinin Combobox içerisinde gösterileceğini belirlememiz gerekiyor.
Bunun için ComboBox'ın **DisplayMemberPath** özelliğine istediğimiz
**Urun** sınıfının bir özelliğinin adını atıyoruz. Böylece **ComboBox**
kendisine atanan dizideki her öğenin söz konusu özelliğindeki veriyi
kullanıcıya gösterecektir.

Eğer veri bağlantısı sonrası ComboBox içerisinde seçili olacak öğeyi
belirlemek isterseniz kullanabileceğiniz iki yöntem var.

**[VB]**

        comboboxUrunler.SelectedItem = (<span
style="color: blue;">From</span> gelenler <span
style="color: blue;">In</span> Urunler <span
style="color: blue;">Where</span> gelenler.Adi = <span
style="color: #a31515;">"Ürün Adi2"</span>).SingleOrDefault

        comboboxUrunler.SelectedIndex = Urunler.IndexOf((<span
style="color: blue;">From</span> gelenler <span
style="color: blue;">In</span> Urunler <span
style="color: blue;">Where</span> gelenler.Adi = <span
style="color: #a31515;">"Ürün Adi2"</span>).SingleOrDefault)

**[C\#]**

comboboxUrunler.SelectedItem = (<span style="color: blue;">from</span>
gelenler <span style="color: blue;">in</span> Urunler <span
style="color: blue;">where</span> gelenler.Adi == <span
style="color: #a31515;">"Ürün Adi2"</span> <span
style="color: blue;">select</span> gelenler).SingleOrDefault();

comboboxUrunler.SelectedIndex = Urunler.IndexOf((<span
style="color: blue;">from</span> gelenler <span
style="color: blue;">in</span> Urunler <span
style="color: blue;">where</span> gelenler.Adi == <span
style="color: #a31515;">"Ürün Adi2"</span> <span
style="color: blue;">select</span> gelenler).SingleOrDefault());

Bunlardan ilki doğrudan ComboBox'ın **SelectedItem** özelliğini
tanımlayarak seçili öğeyi belirlemek. Yukarıdaki kod içerisinde elimizde
diziden istediğimiz Item'ı bir LINQ sorgusu ile bularak söz konusu
Item'ın **SelectedItem** olması gerektiğini belirlemiş oluyoruz. Bir
diğer seçenek ise doğrudan seçili olacak Item'In **Index** numarasını
**SelectedIndex** değerine aktarmak.

ComboBox içerisinde kullanıcı bir Item seçtiğinde ise doğrudan
ComboBox'ın SelectionChanged event'ı çalıştırılacaktır. Böylece doğrudan
SelectedItem özelliği üzerinden seçili öğeyi alabilir ve bu öğleyle
ilgili bilgilere ulaşabilirsiniz. Bizim örneğimizde seçili öğenin
tipinin de Urun olduğunu bildiğimiz için doğrudan Urun sınıfına Cast
ederek seçili öğeye ait tüm bilgilere ulaşabiliyoruz.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> comboboxUrunler\_SelectionChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Controls.SelectionChangedEventArgs) <span
style="color: blue;">Handles</span> comboboxUrunler.SelectionChanged

    MessageBox.Show(<span
style="color: blue;">CType</span>(comboboxUrunler.SelectedItem,
Urun).Fiyat)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
comboboxUrunler\_SelectionChanged(<span
style="color: blue;">object</span> sender, SelectionChangedEventArgs e)

        {

           
MessageBox.Show(((Urun)comboboxUrunler.SelectedItem).Fiyat.ToString());

        }

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-10-3 tarihinde yayinlanmistir.*
