---
FallbackID: 1818
Title: WPF Uygulamalarında FlowDocumentReader Kullanımı
PublishDate: 10/21/2007
EntryID: WPF_Uygulamalarinda_FlowDocumentReader_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 3.0, WPF, Expression Blend
old.EntryID: 2b6cf08f-b910-4109-82c5-ed3550c21150
---
Expression Studio içerisinde bulunan Expression Blend bir animasyon
tasarım aracı olarak bize WPF Windows uygulamaları tasarlama olanağı
tanıyor. Artık Windows uygulamalarında iki veya üç boyutlu animasyonlar
kullanmak gerçekten çok kolay. Son yaptığımız Expression Blend
webinerine katılanlar demolarda bu kolaylığın farkına varmışlardır. Bu
kadar animasyonlardan bahsettikten sonra bir animasyon örneği
vereceğimizi düşünüyorsanız, haklısınız ama yanılıyorsunuz :)

WPF uygulamalarında kullanabileceğimiz farklı kontroller var. Eski
Windows uygulamalarından alıştığımız Button, Label vs kontrollerin yanı
sıra çok kullanışlı ve ilginç kontroller mevcut. Bu kontrollerden
özellikle FlowDocumentReader kontrolü çok hızlı birşekilde işlevsel
uygulamalar hazırlamanızı sağlayabilir. Gelin şimdi hemen Expression
Blend ile bir WPF Windows Application yaratalım.

![Yeni bir WPF Windows uygulaması
yaratıyoruz.](http://cdn.daron.yondem.com/assets/1818/20102007_1.png)\
*Yeni bir WPF Windows uygulaması yaratıyoruz.*

Uygulamamızı yarattıktan sonra içerisinde bir adet
**FlowDocumentReader** kontrolü yerleştireceğiz. Bu kontrolü direk araç
çubuğunda bulma şansınız yok. O nedenle araç çubuğundan "Asset Library"
kısmına giderek kontrolümüzü orada bulmamız gerekecek.

![FlowDocumentReader kontrolümüzü Asset Library içerisinde
buluyoruz.](http://cdn.daron.yondem.com/assets/1818/20102007_2.png)\
*FlowDocumentReader kontrolümüzü Asset Library içerisinde buluyoruz.*

Kontrolü uygulamamızdaki **Window1** penceresine yerleştirdikten sonra
kontrolümüze **flowDoc** adını vererek genişliğini ve yüksekliğini
ayarlıyoruz. Son olarak da pencereye bir **Button** yerleştirerek
içerisine de **Content** özelliğine "Doküman Aç" değerini vererek
gerekli bilgiyi yazmış olduk. **Window1.xaml** dosyasının XAML kodları
aşağıdaki şekilde sonuçlanıyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span>

<span style="color: blue;">  </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">  </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window1</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window</span>"

<span style="color: blue;">  </span><span
style="color: red;">Title</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window1</span>"

<span style="color: blue;">  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">640</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">480</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">FlowDocumentReader</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,0,50</span>" <span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">flowDoc</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,10,10</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">136</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Doküman
Aç</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

\

Programımızın tasarımını bitirdik. Sıra geldi kodlamaya. Penceremizdeki
düğmeye basıldığında klasik Windows doküman açma dialoğunun gelmesini ve
seçilen bir XAML dokümanını programımızda gösterilmesini istiyoruz.
Burada özellikle bir detayı belirtmem gerek; programımızın açacağı XAML
dosyaları **FlowDocument** formatında olmalı. Yani bunlar herhangi bir
XAML dosyası olamaz. Bu dokümanların nasıl yaratılacağına ileride
değineceğim ama şimdilik gelin örnek bir XAML dokümanını inceleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">FlowDocument</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Table</span><span style="color: blue;">
</span><span style="color: red;">CellSpacing</span><span
style="color: blue;">=</span>"<span style="color: blue;">5</span>"<span
style="color: blue;">\></span>

 

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Table.Columns</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableColumn</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableColumn</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableColumn</span><span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableColumn</span><span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Table.Columns</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">    \<</span><span
style="color: #a31515;">TableRowGroup</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SkyBlue</span>"<span style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span style="color: blue;">
</span><span style="color: red;">ColumnSpan</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"<span
style="color: blue;"> </span><span
style="color: red;">TextAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">24pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span
style="color: blue;">\></span>Gezegen Bilgileri<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LightGoldenrodYellow</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span
style="color: blue;">\></span>Gezegen<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span
style="color: blue;">\></span>Güneşten Mesafe<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span
style="color: blue;">\></span>Çap<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span
style="color: blue;">\></span>Kütle<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span style="color: blue;">
</span><span style="color: red;">ColumnSpan</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span style="color: blue;">\></span>İç
Gezegenler<span style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Merkür<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>57,910,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>4,880 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>3.30e23 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">lightgray</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Venus<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>108,200,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>12,103.6 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>4.869e24 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Dünya<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>149,600,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>12,756.3 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>5.972e24 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">lightgray</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Mars<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>227,940,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>6,794 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>6.4219e23 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span style="color: blue;">
</span><span style="color: red;">ColumnSpan</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">14pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bold</span>"<span style="color: blue;">\></span>Dış
Gezegenler<span style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Jupiter<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>778,330,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>142,984 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>1.900e27 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">lightgray</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Satürn<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>1,429,400,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>120,536 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>5.68e26 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Uranüs<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>2,870,990,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>51,118 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>8.683e25 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">lightgray</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>Neptün<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>4,504,000,000 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>49,532 km<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>1.0247e26 kg<span
style="color: blue;">\</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TableCell</span><span style="color: blue;">
</span><span style="color: red;">ColumnSpan</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Paragraph</span><span style="color: blue;">
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">10pt</span>"<span style="color: blue;">
</span><span style="color: red;">FontStyle</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Italic</span>"<span style="color: blue;">\></span>

            Kaynak:

<span style="color: blue;">            \<</span><span
style="color: #a31515;">Hyperlink</span><span style="color: blue;">
</span><span style="color: red;">NavigateUri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://encarta.msn.com/encnet/refpages/artcenter.aspx</span>"<span
style="color: blue;">\></span>Encarta<span
style="color: blue;">\</</span><span
style="color: #a31515;">Hyperlink</span><span
style="color: blue;">\></span>

            web sitesi.

<span style="color: blue;">          \</</span><span
style="color: #a31515;">Paragraph</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">TableCell</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">TableRow</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">    \</</span><span
style="color: #a31515;">TableRowGroup</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Table</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">FlowDocument</span><span
style="color: blue;">\></span>

\

Bir FlowDocument'ın nasıl yaratılacağı ile ilgili detaylara
girmeyeceğim. Ama sanırım yukarıda her şey yeterince açıktır.
FlowDocument'ları Tag isimleri farklı birer HTML dokümanına
benzetebilirsiniz. Programımız yukarıdaki şekilde düzenlenmiş belgeleri
açabilecek.

Sıra geldi artık programlama kodumuzu yazmaya. Bunun için Expression
Blend içerisinde düğmemizi seçerek sağ sütunda "Properties" sekmesine
geçeceğiz. "Properties" sekmesi içerisinde de "Events" bölümüne
geçtikten sonra "Click" özelliğine istediğimiz bir **method** adı
yazacağız.

![Düğmemizin Click durumuna ait methodu
tanımlıyoruz.](http://cdn.daron.yondem.com/assets/1818/20102007_3.png)\
*Düğmemizin Click durumuna ait methodu tanımlıyoruz.*

Yukarıdaki gibi DocAcTiklandi değerini yazdığınız Expression Blend size
gerekli Event kodunuzu verecektir. Eğer bilgisayarınızda Visual Studio
ve [WPF
Extension](http://www.microsoft.com/downloads/details.aspx?FamilyId=F54F5537-CC86-4BF5-AE44-F5A1E805680D&displaylang=en)
yüklü ise direk Visual Studio içerisinde projeniz açılacaktır. İlk
baktığımızda aşağıdaki kodun otomatik olarak eklendiğini görüyoruz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> DokAcTiklandi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.Windows.RoutedEventArgs)

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

\

Programımızın Window1.xaml dosyasının XAML kodlarına baktığımızda ise
ufak bir değişiklik görebiliriz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span>

<span style="color: blue;">  </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">  </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window1</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window</span>"

<span style="color: blue;">  </span><span
style="color: red;">Title</span><span
style="color: blue;">=</span>"<span style="color: blue;">Window1</span>"

<span style="color: blue;">  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">640</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">480</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">FlowDocumentReader</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,0,50</span>"<span style="color: blue;"> </span>
<span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">flowDoc</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,10,10</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">136</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Doküman
Aç</span>"<span style="color: blue;"> </span><span style="color: red;">
**Click**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**DokAcTiklandi**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

\

XAML kodlarına dikkatli olarak bakarsak artık **Button** nesnesine ait
**Click** özelliğinin bizim için otomatik olarak ayarlanmış olduğunu
görebiliriz. Bu noktadan sonra bizim tek yapmamız gereken uygun kodları
Visual Studio içerisinde yazmak. İlk olarak aşağıdaki kod ile
penceredeki FlowDocumentReader nesnesini bulacağım. Aslında buna normal
şartlarda gerek yok, fakat bazen Visual Studio içerisinde Intellisense
XAML kodundaki objeleri yakalayamıyor. Bunun nedeni büyük ihtimal ile
tüm bu XAML desteğinin bir Extension olarak yükleniyor olması. Visual
Studio 2008 ile yaptığım denemelerde böyle bir sorunla karşılaşmadım. O
nedenle eğer siz de aynı sorunla karşılaşırsanız aşağıdaki kod ile
kontrolümüzü yakalayabilirsiniz.

<span style="color: blue;">Dim</span> flowDoc <span
style="color: blue;">As</span> FlowDocumentReader = <span
style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.FindName(<span
style="color: #a31515;">"flowDoc"</span>), FlowDocumentReader)

\

Sonraki adımda ilk olarak kendimize özel bir **FlowDocument** nesnesi
tanımlayacağız. Kullanıcının doküman açabilmesi için eski Windows
uygulamalarında da kullandığımız **OpenFileDialog** nesnesinden yardım
alacağız.

        <span style="color: blue;">Dim</span> yeniDoc <span
style="color: blue;">As</span> Documents.FlowDocument = <span
style="color: blue;">Nothing</span>

        <span style="color: blue;">Dim</span> Dialog <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Microsoft.Win32.OpenFileDialog

        Dialog.Filter = <span style="color: #a31515;">"FlowDocument
Dosyaları (\*.xaml)|\*.xaml"</span>

        <span style="color: blue;">If</span> Dialog.ShowDialog.Value
<span style="color: blue;">Then</span>

 

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

\

Eğer **OpenFileDialog** ile kullanıcı bir dosya seçmiş ise sıra gelecek
dosyayı okuyarak daha önce yarattığımız **FlowDocument** değişkenimiz
olan **yeniDoc** değişkenine aktarmaya.

            <span style="color: blue;">Dim</span> xamlDosya <span
style="color: blue;">As</span> FileStream = <span
style="color: blue;">CType</span>(Dialog.OpenFile, FileStream)

            <span style="color: blue;">Try</span>

                yeniDoc = <span
style="color: blue;">CType</span>(Markup.XamlReader.Load(xamlDosya),
Documents.FlowDocument)

                flowDoc.Document = yeniDoc

            <span style="color: blue;">Catch</span> ex <span
style="color: blue;">As</span> Exception

                System.Windows.MessageBox.Show(ex.Message)

            <span style="color: blue;">End</span> <span
style="color: blue;">Try</span>

\

Yukarıdaki kod içerisinde ilk satırda xamlDosya adında bir
**FileStream** yaratarak dosyamızın konumunu alıyoruz. Sonrasında dosya
okuma işlemini Try-Catch bloğu içerisinde gerçekleştireceğiz. En
baştayarattığımız **yeniDoc** **FlowDocument** değişkenimize gerçek
dosyayı okuyarak yüklemek için **Markup.XamlReader** sınıfını
kullanıyoruz. Xaml dosyası okunduktan sonra değişken tipini de
**FlowDocument'a** çevirerek kendi **yeniDoc** nesnemize aktardık. Artık
elimizdeki **FlowDocument** değişkenimiz penceremizdeki
**FlowDocumentReader'a** aktarılmaya hazır. **FlowDocumentReader'a** ait
**Document** özelliğine gerekli değeri aktararak okuma işlemini
sonlandırabiliriz. Tüm bu işlemler süresince eğer bir hata gerçekleşirse
hatayı bir mesaj kutusu olarak Try-Catch bloğu ile kullanıcıya
gösterebiliyoruz.

Artık programımızı deneyebiliriz. Visual Studio veya Expression Blend
içerisinde F5'e bastığınızda program derlenecek ve otomatik olarak
çalıştırılacaktır. Yukarıda örnek olarak verdiğimiz FlowDocument XAML
dosyasını açtığımızda aşağıdaki gibi bir ekranla karşılaşıyoruz.

![WPF uygulamamızda FlowDocumentReader
görüntüsü.](http://cdn.daron.yondem.com/assets/1818/20102007_4.png)\
*WPF uygulamamızda FlowDocumentReader görüntüsü.*

Gördüğünüz gibi dosyamız programımızda gösteriliyor. Peki neden
**FlowDocumentReader**? FlowDocumentReader'ın özellikleri tek tek
yazarak anlatmaya çalışmaktansa gelin aşağıda ufak bir seri görüntü ile
durumu inceleyelim.

![FlowDocument içerisinde otomatik
sayfalama.](http://cdn.daron.yondem.com/assets/1818/20102007_5.png)\
*FlowDocument içerisinde otomatik sayfalama.*

**FlowDocumentReader** kontrolünün kendi içerisinde bazı özellikleri
var. Bunlardan ilki programın kullanıcısına açılan dokümanı farklı
şekillerde okuyabilme olanağı sağlıyor olması. Yukarıdaki ekran
görüntüsünde kullanıcı dokümanı sayfalar şeklinde görmek istediği için
**FlowDocumentReader** gerekli düzenlemeleri otomatik olarak yapmış. Tüm
bu işlemlerin tamamen vektörel olarak yapıldığını bu nedenle her şekilde
yazılarda ve grafiklerde çok net görüntüler alındığını özellikle
belirtmek istiyoruz.

![FlowDocumentReader'da zoom yapmak arama yapmak kadar
kolay.](http://cdn.daron.yondem.com/assets/1818/20102007_6.png)\
*FlowDocumentReader'da zoom yapmak arama yapmak kadar kolay.*

**FlowDocumentReader** kontrolü ile beraber gelen diğer özellikler de
çok etkileyici. Kullanıcı istediği zaman dokümana zoom yapabiliyor.
Yukarıdaki görüntüde dokümanın biraz büyütülmüş halini görebilirsiniz.
Yazılarda herhangi bir bozulma yok. Aynı şekilde kullanıcı isterse
yazıların boyutu **FlowDocumentReader'ın** sağ altında bulunan
kontroller ile küçültebilir de. Son olarak bahsetmek istediğim belki de
en önemli işlevlerden biri de Arama. **FlowDocumentReader** ile beraber
otomatik bir arama motoru geliyor ve açılan doküman içerisinde aramaları
FlowDocumentReader tamamen kendisi yapıyor.

Sanırım artık neden bu yazımda FlowDocumentReader'ı anlatmak
istediğimizi anlamışsınızdır. Tabiri caiz ise iki satır kod yazarak
muhteşem bir program yapmış olduk. WPF olmadan önce bu tarz bir programı
hazırlamak belki de bir haftamızı alırdı.

**FlowDocument Dosyaları nasıl yaratılır?**

Gelelim can alıcı soruya. Eminim ki çoğunuz şu anda elinizdeki bir sürü
dokümanı yukarıdaki şekilde windows uygulamaları ile göstermek
müşterilerinize projelerde göstermek istiyorsunuz. Daha önce de
bahsettiğim gibi HTML ile FlowDocument yazımı arasında ciddi
benzerlikler var. Bu noktada HTML'den FlowDocument'a yani XAML'e
çevirmek için gerekli araçlar da hazır. Aşağıdaki adresten XAML'den
HTML'e veya tam tersi HTML'den XAML'e çeviri yapabilen bir yazılımı açık
kaynak kodu ile indirebilirsiniz.

<http://wpf.netfx3.com/files/folders/developer/entry816.aspx>

Makale boyunca yaptığımız örneğin kodlarını da aşağıdan
indirebilirsiniz.

[WPF FlowDocumentReader Proje Kaynak Kodları - 20102007\_1.zip (137,43
KB)](http://cdn.daron.yondem.com/assets/1818/20102007_1.zip)

Hepinize kolay gelsin.

