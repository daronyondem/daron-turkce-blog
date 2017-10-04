---
FallbackID: 2081
Title: Silverlight 2.0 Beta 2 ile beraber gelen TabControl incelemesi
PublishDate: 9/6/2008
EntryID: Silverlight_2_0_Beta_2_ile_beraber_gelen_TabControl_incelemesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 113d1d6a-d19a-4f29-84d8-7868273e9141
---
**Silverlight 2.0 Beta 2** ile beraber gelen yeni kontrollerden biri
olan **TabControl** özellikle Windows uygulamalarından alışmış olduğumuz
sayfalı uygulama tasarımlı ekranları web ortamında da rahatlıkla
oluşturabilmemizi sağlıyor. **System.Windows.Controls.Extended** sınıfı
altında bulunan TabControl'u kullanabilmek için projenize söz konusu
sınıfı reference olarak eklemiş olmanız gerekiyor. Visual Studio
içerisinde Silverlight projenize sağ tuş tıklayarak "Add Reference"
dedikten sonra gerekli eklemeleri yapabilirsiniz. Visual Studio
içerisinde araç çubuğundan bir TabControl alarak sahneye
yerleştirdiğinizde de işlem otomatik olarak gerçekleşecektir.
Referanslama kısmı tamamlandıktan sonra Expression Blend içerisinde de
Asset Library'de **Custom Controls** kısmında projenize referans olarak
eklediğiniz sınıfların altındaki kontrolleri bulabilirsiniz.

![Expression Blend 2 June Preview içerisinde TabControl ve
TabItem](http://cdn.daron.yondem.com/assets/2081/08062008_1.png)\
*Expression Blend 2 June Preview içerisinde TabControl ve TabItem*

Expression Blend içerisinde sahneye bir TabControl yerleştirdikten sonra
sıra geldi söz konusu **TabControl** içerisinde **TabItem** (sayfa)
yerleştirmeye. Kolaylık olması açısından Blend içerisinde yerleştirmiş
olduğunuz TabControl'a "*Objects and Timeline*" penceresinde çift
tıklarsanız söz konusu kontrolün sarı bir çerçeve içerisine alındığını
göreceksiniz. Bu şekilde herhangi bir kontrol sarı bir çerçeve ile
işaretlendiğinde o kontrol dışında ekranda bulunan her şey kilitlenmiş
olacaktır. Böylece rahatlıkla ekrana yerleştireceğimiz yeni **TabItem**
kontrollerinin kesinlikle **TabControl** içerisine yerleştirileceğini
garanti edebiliriz. Aksi halde fare ile kontrol eklerken özel olarak
dikkat etmeniz gerekecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication3.Page</span>"

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
style="color: blue;">=</span>"<span style="color: blue;">300</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:System\_Windows\_Controls</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Extended</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:System\_Windows\_Controls\_Primitives</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls.Primitives;assembly=System.Windows.Controls.Extended</span>"<span
style="color: blue;">\></span>

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
style="color: #a31515;">System\_Windows\_Controls:**TabControl**</span><span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">                                       
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">8,34,0,64</span>"

<span style="color: blue;">                                       
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">184</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">System\_Windows\_Controls:**TabItem**</span><span
style="color: blue;"> </span><span style="color: red;">
**Content**</span><span style="color: blue;">=</span>"<span
style="color: blue;">TabItem</span>"

<span style="color: blue;">                                     
</span><span style="color: red;"> **Header**</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Tab1</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">System\_Windows\_Controls:**TabItem**</span><span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TabItem2</span>"

<span style="color: blue;">                                     
</span><span style="color: red;">Header</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Tab2</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">System\_Windows\_Controls:TabControl</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde yerleştirdiğimiz TabControl ve TabItem'ların
XML kodunda namespace olarak uzun uzun System\_Windows\_Controls adını
gözüyorsunuz. Aslında bu yapıyı değiştirebiliriz; eğer dokümanın
üzerindeki namespace isimlerini değiştirirseniz aynı isimleri kodunuz
içerisinde de rahatlıkla kullanabilirsiniz.

TabItem'ların iki önemli özelliği var; bunlardan ilki **Header** yani
TabItem'ım sayfa bilgisinin gözüktüğü yerde yazılacak olan yazı, diğeri
ise **Content** yani TabItem'ın temsil ettiği sayfada gösterilecek olan
içerik. Şimdi örneğimizdeki hem namespace'leri değiştirerek daha
okunaklı bir isim verelim hem de TabItem'larımızın içerisine daha farklı
içerikler yerleştirelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication3.Page</span>"

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
style="color: blue;">=</span>"<span style="color: blue;">300</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:**Ex**</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Extended</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:Pri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls.Primitives;assembly=System.Windows.Controls.Extended</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:vsm</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows;assembly=System.Windows</span>"<span
style="color: blue;">\></span>

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
style="color: #a31515;">Ex:TabControl</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">8,34,0,64</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">184</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      **\<**</span><span
style="color: #a31515;">**Ex:TabItem**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      **  \<**</span><span
style="color: #a31515;">**Ex:TabItem.Header**</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Right</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">76</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dock.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>Bölüm 1<span
style="color: blue;">\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">        **\</**</span><span
style="color: #a31515;">**Ex:TabItem.Header**</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>Deneme amaçlı metin<span
style="color: blue;">\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: blue;">    **  \</**</span><span
style="color: #a31515;">**Ex:TabItem**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ex:TabItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TabItem2</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Header</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Tab2</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ex:TabControl</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Kodumuz içerisinde yer alan TabItem'ın hem Header (başlık) kısmını hem
de içeriğini özel olarak düzenliyoruz. **\<Ex:TabItem.Header\>** tagları
arasında **TabItem** için **header** görseli olarak farklı Silverlight
kontrolleri kullanabiliyoruz. Tek bir sınırlamamız var; **Header**
içerisinde kök element sadece bir adet olabiliyor. Bu sorunu aşmak için
Container Elementlerimizden Grid'i kullanabiliriz. Header içerisine
yerleştirdiğimiz bir Grid içerisine istediğimiz kadar Silverlight
kontrolü koyabiliriz. Header tagları haricinde doğrudan TabItem'ın
içerisine de TabItem'ın sayfa içeriğinde gözükmesini istediğimiz
kontrolleri koyabiliyoruz.

![Özelleştirilmiş TabItem kontrolümüz
karşımızda!](http://cdn.daron.yondem.com/assets/2081/08062008_2.jpg)\
*Özelleştirilmiş TabItem kontrolümüz karşımızda!*

TabItem'ların Header'ları içerisine farklı Silverlight kontrollerini
koymanın yanı sıra istersek Header'ın tamamen görsel şablonunu da
değiştirebiliriz. Bunun için bir **ControlTemplate** hazırlayarak
TabItem'ımıza bağlamamız gerekecek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication3.Page</span>"

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
style="color: blue;">=</span>"<span style="color: blue;">300</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:Ex</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Extended</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:Pri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows.Controls.Primitives;assembly=System.Windows.Controls.Extended</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:vsm</span><span
style="color: blue;">=</span>"<span
style="color: blue;">clr-namespace:System.Windows;assembly=System.Windows</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**ControlTemplate**</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**TabItemControlTemplate1**</span>"

<span style="color: blue;">                    </span><span
style="color: red;"> **TargetType**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Ex:TabItem**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">              </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">100</span>"

<span style="color: blue;">              </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Forest.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">**ContentPresenter**</span><span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding **Header**}</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ControlTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

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
style="color: #a31515;">Ex:TabControl</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Left</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">8,34,0,64</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">184</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ex:TabItem</span><span style="color: blue;">
</span><span style="color: red;"> **Template**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**{StaticResource
TabItemControlTemplate1}**</span>"<span style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">Ex:TabItem.Header</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Right</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">76</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dock.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>Bölüm 1<span
style="color: blue;">\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">Ex:TabItem.Header</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>Deneme amaçlı metin<span
style="color: blue;">\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ex:TabItem</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ex:TabItem</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TabItem2</span>"

<span style="color: blue;">                  </span><span
style="color: red;">Header</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Tab2</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ex:TabControl</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Kodumuzda yarattığımız ControlTemplate içerisinde bir Grid ve onun
içinde de bir Image ile **ContentPresenter** yer alıyor. Söz konusu
ContentPresenter'ın Content özelliğini Template'in uygulanacağı
kontrolün Header özelliğine bağlanmış. Böylece bu şablonu bağlı bir
TabItem'ın Header'ına yerleştirilen kontrollerin bu şablon
uygulandığında şablon içerisindeki ContentPresenter'ın içerisine
yerleştirilecek. XAML kodunu çok uzatmamak adına örnekte sürekli Image
nesneleri kullandığımız için ortaya çıkan örnek çok anlamlı olmayacaktır
fakat Expression Blend içerisinde biraz daha detaylı bir çalışma ile
güzel sonuçlar alınabilir.

![Expression Blend 2 July Preview içerisinde Silverlight ControlTemplate
desteği.](http://cdn.daron.yondem.com/assets/2081/08062008_3.png)\
*Expression Blend 2 July Preview içerisinde Silverlight ControlTemplate
desteği.*

Tüm bu yapıları tamamen XAML kodları yazarak oluşturabileceğiniz gibi
Expression Blend içerisinde araçları kullanarak da yapabilirsiniz.
Herhangi bir TabItem kontrolüne sağ tuş ile tıklayarak yukarıdaki
şekilde "Edit Control Parts / Edit Template" diyerek TabItem'ların
görselliklerini Blend içerisinde de ayarlayabilirsiniz. Her kontrol için
ilk başta "Edit a Copy" diyerek var olan görsellikten bir şablon kopyası
alarak veya "Create Empty" diyerek boş bir şablon yaratarak
ilerleyebilirsiniz.

Son olarak her TabControl'ün bir de **TabStripPlacement** özelliği
olduğundan bahsetmek gerek. Bu özelliğe verdiğiniz değerler ile
TabItem'ların Header kısımlarının TabControl'ün üstünde, sağında,
solunda veya altında gözükmesini sağlayabilirsiniz.

Hepinize kolay gelsin.


