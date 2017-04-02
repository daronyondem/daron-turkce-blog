---
FallbackID: 2063
Title: Silverlight 2.0 GridSplitter Kullanımı
PublishDate: 5/22/2008
EntryID: Silverlight_2_0_GridSplitter_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 10ca87be-00bd-41f6-ac4c-8b89dfe95fcc
---
Silverlight 2.0 içerisinde **Grid** kullanımı HTML içerisinden alışık
olduğumuz Table yapısından pek farklı değil. Kolonlar ve satırlar
yaratarak görsel öğeleri ekranda konumlandırabilmenizi sağlayan Grid
kontrolü ile beraber kullanabileceğimiz kontrollerden biri de
**GridSplitter** kontrolü. GridSplitter kontrolü bir Gridin kolon veya
satırlarının kullanıcı tarafından fare ile boyutlandırılabilmesini
sağlıyor. Herhangi bir Grid yaratarak satır veya sütunlar oluşturduktan
sonra istediğiniz **Grid** hücresine **GridSplitter** kontrolü
yerleştirebiliyorsunuz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">GridSplit.Page</span>"

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
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.435\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.07\*</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.495\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">GridSplitter</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;"> **Grid.Column**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**1**</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF0092FF</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">10</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodunda yer alan Grid'in toplam üç kolonu var. Bu
kolonlardan birinin içerisinde gözükecek şekilde bir de **GridSplitter**
nesnesi yerleştirilmiş. GridSplitter nesnesinin **Grid.Column** özelliği
1 olduğu için içerisinde bulunduğu Grid'in 1 Index numaralı kolonunda
gözükecek.

![GridSplitter kontrolü 2 resmi
boyutlandırıyor.](http://cdn.daron.yondem.com/assets/2063/21052008_1.jpg)\
*GridSplitter kontrolü 2 resmi boyutlandırıyor.*

Yukarıdaki gibi bir örnek elde etmek için Grid'in diğer kolonlarına
birer Image nesnesi yerleştirdim. GridSplitter kontrolünü fare ile tutup
sürüklediğimde her iki resim de içerisinde bulundukları kolonlara
sığacak şekilde kendilerini boyutlandırdılar.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">GridSplit.Page</span>"

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
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.435\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">
**Width**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**Auto**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.495\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">GridSplitter</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Grid.Column</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF0092FF</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">10</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Creek.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Grid.Column</span><span
style="color: blue;">=</span>"<span style="color: blue;">2</span>"<span
style="color: blue;"> </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dock.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde dikkat etmemiz gereken nokta GridSplitter
kontrolünü yerleştirdiğimiz Grid kolonunun **Width** özelliğinin
**Auto** olması, böylece GridSplitter'ın genişliği ne ise söz konusu
kolonun genişliği de o olacaktır.

GridSplitter kontrolünü yukarıdaki taktikleri izleyerek sadece dikey
olarak ekranı bölmek için değil yatay olarak Grid'in satırları arasında
da kullanabilirsiniz. Ayrıca birden çok Grid kontrolünü iç içe
kullanarak farklı ekranlar yaratmak da mümkün.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">GridSplit.Page</span>"

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
style="color: #a31515;">Grid.RowDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.72\*</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">RowDefinition</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.237\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid.RowDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.435\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: blue;"> </span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.538\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GridSplitter</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">10</span>"<span
style="color: blue;"> </span><span
style="color: red;">Grid.Column</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF5EFF00</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Creek.jpg</span>"<span style="color: blue;">
</span><span style="color: red;">Stretch</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Uniform</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Grid.Column</span><span
style="color: blue;">=</span>"<span style="color: blue;">2</span>"<span
style="color: blue;"> </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dock.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">GridSplitter</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">
</span><span style="color: red;">Grid.Row</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">10</span>"<span
style="color: blue;"> </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF0092FF</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Grid.Row</span><span
style="color: blue;">=</span>"<span style="color: blue;">2</span>"<span
style="color: blue;"> </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Garden.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki örnekte toplamda üç satırı bulunan bir Grid kontrolünün
ikinci satırında **GridSplitter** bulunuyor. Aynı Grid'in birinci
satırında ise içerisinde üç kolun bulunan ayrı bir Grid var. İçteki bu
Grid'in de ikinci kolonunda bir **GridSplitter** var. Böylece yatay
GridSplitter kullanıldığında dikey olan ve iç Grid'de bulunan
GridSplitter da otomatik olarak boyutlandırılmış oluyor.

![2 Grid ve 2 GridSplitter'ın
kardeşliği.](http://cdn.daron.yondem.com/assets/2063/21052008_2.jpg)\
*2 Grid ve 2 GridSplitter'ın kardeşliği.*

Bu gibi arayüzler neredeyse çoğu yazılımda karşımıza çıkan sistemler
içerisinde. Silverlight 2.0 ile beraber iş uygulamaları geliştirirken bu
tarz kolaylıkların büyük bir iş yükünü omuzlarımızdan kaldıracağı kesin.

**GridSplitter değişiklikleri algılamak?**

GridSplitter'ı kullanmak gerçekten çok kolay. Fakat istemci tarafında
kullanıcı tüm GridSplitter'ları ayarladıktan sonra Silverlight
uygulamasını başka bir zamanda tekrar açtığında tüm ayarları tekrar
yapmak zorunda kalması hiç hoş olmaz. O nedenle GridSplitter ile yapılan
ayarları bir şekilde saklamamız gerek.

Aslında GridSplitter'ın yaptığı işlem içerisinde bulunduğu Grid'in
kolonlarının boyutlarını değiştirmek öte değil. Bu durumda bizim Grid'in
kolonlarında değişiklik olup olmadığı yakalamamız ve söz konusu
değişiklikleri kaydetmemiz gerekiyor.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> IcGrid\_LayoutUpdated(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> IcGrid.LayoutUpdated

    Metin.Text = IcGrid.ColumnDefinitions(0).Width.ToString

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Herhangi bir Grid'in LayoutUpdated metodunu yakaladığınızda aslında
Grid'in görselliğindeki tüm boyut değişikliklerini de yakalamış
oluyorsunuz. GridSplitter Grid'in kolonlarının boyutunu değiştirdikçe
LaoutUpdated metodu çalıştırılacaktır. Bizim yapacağımız da basit bir
şekilde **IcGrid** adını verdiğimiz Grid'in sıfırcı kolonunun
genişliğini alarak kaydetmek. Kaydetme işlemini bir [web
servisi](http://daron.yondem.com/tr/post/ec53a760-d6fd-414d-aa78-22e0c04dcc19)
ile sunucu tarafına yapabileceğiniz gibi doğruda [Isolated
Storage](http://daron.yondem.com/tr/post/efebcb20-60cb-4964-ba43-0b1949fb5e23)
kullanarak istemci tarafında da saklayabilirsiniz. Ben örnek içerisinde
söz konusu değeri **Metin** adındaki bir **TextBlock** içerisine
yazdırdım.

Kaydettiğiniz genişlik ve yükselik değerlerini Silverlight uygulaması
tekrar açıldığında görsel arayüze uygulamak ise çok daha kolay.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

    IcGrid.ColumnDefinitions(0).Width = <span
style="color: blue;">New</span> System.Windows.GridLength(100)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İstediğimiz herhangi bir Grid'in kolonunu yakalayarak Width özelliğini
değiştirebiliyoruz.

Hepinize kolay gelsin ;)


