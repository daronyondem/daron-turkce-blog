---
FallbackID: 2075
Title: "Silverlight 2.0 Beta 1 içerisinde ToggleButton kullanımı"
date: "2008-6-3"
EntryID: Silverlight_2_0_Beta_1_icerisinde_ToggleButton_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 7c6bdbb7-6971-43b7-ad1f-9a74ecfe404a
---
Checkbox ve RadioButton kontrolleri neredeyse her projede en az bir defa
kullandığımız kontroller arasında yerlerini alırlar. Bu kontroller gibi
farklı kontroller oluşturarak kullanıcıyı bir durumdan haberdar etmek
veya kullanıcının bir durumu değiştirmesini sağlamak mümkün olabilir.
Örneğin basit bir video oynatıcısı uygulamasında "Play" düğmesi ile
"Pause" düğmesini aynı düğme içerisinde kullanabilirsiniz. Söz konusu
düğme kendi içinde değişerek her tıklandığında "Play" veya "Pause"
şeklinde üzerindeki yazıyı değiştirir ve videonun da durdurulmasını veya
oynatılmasını sağlar. **Checkbox** veya **RadioButton** düğmeleri gibi
bu gibi kontrollere özünde "**ToggleButton**" denir ve **Silverlight 2
Beta 1** içerisinde **Checkbox** ve **RadioButton** da zaten hali
hazırda adı **ToggleButton** olan bir kontrol yapısından türetilmiştir.
Bu yazımızda **ToggleButton** kontrolünün detaylarına ve kullanımına
değineceğiz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication21.Page</span>"

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
style="color: #a31515;">**ToggleButton**</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">104,109,177,138</span>"<span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToggleButton</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToggleDugme</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki şekli ile standart bir **ToggleButton** kontrolünü ister
Blend ister Visual Studio içerisinde uygulamanıza yerleştirebilirsiniz.
Sonrasında arkaplanda **ToggleButton** kontrolünün yakalayabileceğimiz
iki kendine özel event'ı var; bunlardan ilki **Checked**, diğeri ise
**Unchecked** durumları. Yarattığımız ToggleButton'ın görsel
özelliklerine değinmeden önce hemen bu event'lar ile neler
yapabileceğimize bir göz atalım.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ToggleDugme\_Checked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> ToggleDugme.Checked

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretli"</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ToggleDugme\_Unchecked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> ToggleDugme.Unchecked

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretsiz"</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> ToggleDugme\_Checked(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

{

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretli"</span>;

}

 

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> ToggleDugme\_Unchecked(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

{

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretsiz"</span>;

}

Basit bir şekilde ToggleButton kontrolümüzün içerisine yazılı metni
değiştirdiğimiz örneğimizi çalıştırdığımızda artık **Button**
görünümündeki **ToggleButton** kontrolüne her bastığımızda içinde duruma
göre "İşaretli" veya "İşaretsiz" yazacak. Ayrıca isterseniz ToggleButton
kontrolüne ait **IsChecked** özelliğini de kullanarak ToggleButton'un o
anki durumundan haberdar olabilirsiniz.

**Belirsiz durumlara özel...**

Bazı durumlarda sadece iki seçenek yetmez ve "belirsizlik" seçimi de
yapmak gerekebilir. Bu durumda kullanıcıya sadece Evet veya Hayır
şeklinde cevap vermenin yanı sıra isterse "Bilmiyorum" gibi bir seçeneğe
de yönelebilir. **ToggleButton** içerisinde böyle bir yapı da var. Eğer
bir ToggleButton'un **IsThreeState** özelliğini **True** olarak
ayarlarsanız artık iki değil üç seçenekli bir ToggleButton sahibi olmuş
oluyorsunuz. Peki bu üçüncü seçeneği kod tarafında nasıl yakalıyoruz?

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ToggleDugme\_Checked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> ToggleDugme.Checked

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretli"</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ToggleDugme\_Indeterminate(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> ToggleDugme.**Indeterminate**

    ToggleDugme.Content = <span
style="color: #a31515;">"Belirsiz"</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> ToggleDugme\_Unchecked(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> ToggleDugme.Unchecked

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretsiz"</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> ToggleDugme\_Checked(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

{

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretli"</span>;

}

 

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> **ToggleDugme\_Indeterminate**(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

{

    ToggleDugme.Content = <span
style="color: #a31515;">"Belirsiz"</span>;

}

 

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> ToggleDugme\_Unchecked(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

{

    ToggleDugme.Content = <span
style="color: #a31515;">"İşaretsiz"</span>;

}

Gördüğünüz gibi ToggleButton'un ayrıca bir de **Indeterminate** adında
bir event-handler'ı bulunuyor. Söz konusu durumu yakalayarak belirsizlik
halinde de gerekli işlemlerin yapılmasını sağlayabilirsiniz. Böyle bir
durumda **IsChecked** özelliği geriye **null / nothing** döndürecektir.

Unutmayın ki herhangi bir kontrolün **Content** özelliği aslında
içerisine farklı Silverlight kontrolleri de alabilir hatta kontrollerin
görsel yapısının tamamen değiştirebilirsiniz. Silverlight 2 Beta 1
içerisinde [Control
Templating](http://daron.yondem.com/tr/post/64891675-eba7-4cad-88a5-70cb3d148993)
ile ilgili yazıyı inceleyerek ToggleButton için de aynı teknikleri
uygulayabilirsiniz.

Hepinize kolay gelsin.


