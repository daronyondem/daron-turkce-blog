---
FallbackID: 2101
Title: Silverlight içerisinde ClipBoard kullanımı
PublishDate: 23/6/2008
EntryID: Silverlight_icerisinde_ClipBoard_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Silverlight 2.0
old.EntryID: 5cc7deaf-3c67-4afb-8431-d13959c57062
---
Silverlight uygulamaları içerisinden "**Clipboard**"a ulaşmak
istediğinizde maalesef hazır bir altyapı ile en azından şimdilik
**Silverlight 2.0 Beta 2** içerisinde karşılaşmıyoruz. Aynı şekilde
Silverlight 1.0 içerisinde de bu sorun için bir çözüm yok. Fakat
özellikle Silverlight 1.0 tarafında zaten JavaScript'in ana programlama
yapısı olduğunu düşünürsek "*Acaba tarayıcı içerisinde JavaScript ile
bir çözüm oluşturabilir miyiz?*" sorusu akla geliyor. Bu sorunun cevabı
en azından Internet Explorer için "Evet". FireFox varsayılan ayarları
ile bu gibi işlemlere JavaScript tarafında olanak tanımıyor.

**Silverlight 1.0 ile Clipboard kullanımı**

Yeni bir Silverlight 1.0 projesi yaratarak içerisine bir **TextBlock**
ve **Rectangle** yerleştirelim. Yapacağım işlem TextBlock içerisinde
yazılı metni Rectangle'a basıldığında ClipBoard'a taşımak olacak.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: blue;">  </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">  </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">  </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">640</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">480</span>"

<span style="color: blue;">  </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span style="color: blue;">White</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Page</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">274.242</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">43.939</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span
style="color: blue;">31.818</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">27.273</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span style="color: blue;">Kopyalanacak
Metin</span>"<span style="color: blue;"> </span><span
style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Etiket</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;"> **MouseLeftButtonDown**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Kopyala**</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">122.727</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">43.939</span>"<span style="color: blue;">
</span><span style="color: red;">Fill</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span
style="color: blue;">31.818</span>"<span style="color: blue;">
</span><span style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span
style="color: blue;">92.425</span>"<span style="color: blue;">
</span><span style="color: red;">RadiusY</span><span
style="color: blue;">=</span>"<span
style="color: blue;">16.167</span>"<span style="color: blue;">
</span><span style="color: red;">RadiusX</span><span
style="color: blue;">=</span>"<span
style="color: blue;">16.167</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dugme</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki kod uygulamamızın görsel arayüzünü oluşturuyor. "**Dugme**"
adındaki Rectangle nesnemizin **MouseLeftButtonDown** durumunda
çalıştırılacak olan kodu birazdan yazacağız.

<span style="color: blue;">function</span> Kopyala(sender)

{

    window.clipboardData.**setData**(<span
style="color: #a31515;">"text"</span>, sender.findName(<span
style="color: #a31515;">"Etiket"</span>).Text); 

}

Kodumuz içerisinde kullandığımız clipboardData sınıfı ile ilgili
detaylara
[MSDN](http://msdn.microsoft.com/en-us/library/ms535220(VS.85).aspx)
üzerinden ulaşabilirsiniz. setData metodu toplamda iki parametre alıyor;
bunlardan ilki ClipBoard'a kopyalanacak olan verinin tipi, ikincisi ise
kopyalanacak olan içeriğin ta kendisi. Aynı şekilde isterseniz
ClipBoard'dan veri almak için **getData** metodunu da kullanabilirsiniz.

<span style="color: blue;">function</span> Getir(sender)

{

    sender.findName(<span style="color: #a31515;">"Etiket"</span>).Text
= window.clipboardData.getData(<span
style="color: #a31515;">"text"</span>);   

}

**getData** metodu sadece ClipBoard'dan alacağı verinin tipini parametre
olarak alarak geriye doğrudan elde ettiği veriyi döndürüyor.

**Peki ya Silverlight 2.0 tarafında neler yapacağız?**

Aslında çok farklı bir işlem yapmayacağız. Silverlight 2.0 Beta 2
tarafında da şimdilik JavaScript'in nimetlerinden faydalanmak
zorundayız. O nedenle istemci tarafındaki VB veya C\# kodumuz ile
sayfanın JavaScript tarafındaki özelliklerine ulaşıp yine JavaScript
tarafındaki metodlarını çalıştıracağız.

İlk olarak Silverlight 2.0 Beta 2 uygulamamızın arayüzünü aşağıdaki
şekilde düzenleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication14.Page"</span>

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
style="color: #a31515;">TextBox</span><span style="color: red;">
Height</span><span style="color: blue;">="40"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="16,8,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="120"</span><span
style="color: red;"> Text</span><span style="color: blue;">="Herhangi
bir Metin"</span><span style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="txtMetinKutusu"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Height</span><span style="color: blue;">="24"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="16,72,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="88"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="Kopyala"</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="btnKopyala"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Height</span><span style="color: blue;">="24"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="16,112,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="88"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="Yapıştır"</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="btnYapistir"**/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Bir TextBox ve iki Button'dan oluşan uygulamamızın ilk olarak kopyalama
işlemini yapacak olan kodunu yazalım.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnKopyala\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> btnKopyala.Click

        <span style="color: blue;">Dim</span> Clipboard <span
style="color: blue;">As</span> Browser.ScriptObject =
Browser.HtmlPage.Window.GetProperty(<span
style="color: #a31515;">"clipboardData"</span>)

        Clipboard.Invoke(<span style="color: #a31515;">"setData"</span>,
<span style="color: #a31515;">"text"</span>, txtMetinKutusu.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> btnKopyala\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span> Clipboard =
(System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span>)System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.GetProperty(<span
style="color: #a31515;">"clipboardData"</span>);

            Clipboard.Invoke(<span
style="color: #a31515;">"setData"</span>, <span
style="color: #a31515;">"text"</span>, txtMetinKutusu.Text).ToString();

        }

Kodumuz içerisinde ilk olarak tarayıcının **clipboardData** sınıfını
yakalamamız gerekiyor. Bunun için içerisinde olduğumuz tarayıcının
(Browser) yine mevcut HTML sayfasının (HtmlPage) ait olduğu pencereyi
(Window) yakalayıp onun üzerinden **GetProperty** ile
**clipboardData'yı** alarak **ScriptObject** tipinde yarattığımız
Clipboard değişkenimize aktarıyoruz. Sonrasında doğrudan değişkenimiz
üzerinden **Invoke** diyerek aynı **Reflection** yapar gibi **setData**
metodunu çalıştırıyoruz. Normal şartlarda JavaScript tarafına
vereceğimiz parametreleri de yine **Invoke** metoduna aktarıyoruz.
Böylece kopyalama işlemini tamamlamış olduk. Aynı şekilde ClipBoard'dan
veri almayı da hemen **getData** ile yapabiliriz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnYapistir\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> btnYapistir.Click

        <span style="color: blue;">Dim</span> Clipboard <span
style="color: blue;">As</span> Browser.ScriptObject =
Browser.HtmlPage.Window.GetProperty(<span
style="color: #a31515;">"clipboardData"</span>)

        txtMetinKutusu.Text = Clipboard.Invoke(<span
style="color: #a31515;">"getData"</span>, <span
style="color: #a31515;">"text"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> btnYapistir\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span> Clipboard =
(System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span>)System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Window.GetProperty(<span
style="color: #a31515;">"clipboardData"</span>);

            txtMetinKutusu.Text = Clipboard.Invoke(<span
style="color: #a31515;">"getData"</span>, <span
style="color: #a31515;">"text"</span>).ToString();

        }

Clipboard'dan veri alırken de aynı şekilde **clipboardData** nesnemizi
yakaladıktan sonra bu sefer **getData** metodunu çalıştırıyoruz ve
geriye dönen değeri de örneğimizde **TextBox** içerisine yazdırıyoruz.

C\# kullananların haricen aşağıdaki şekilde uygulama başlangıcında
Event-Handlar bağlantılarını yapmaları gerekecektir. VB kodlarındaki
Handles keyword'ü ile bu işlem satır içinde yapılabildiği için ek olarak
yazmak gerekmiyor.

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            btnKopyala.Click += <span style="color: blue;">new</span>
<span
style="color: #2b91af;">RoutedEventHandler</span>(btnKopyala\_Click);

            btnYapistir.Click += <span style="color: blue;">new</span>
<span
style="color: #2b91af;">RoutedEventHandler</span>(btnYapistir\_Click);

        }

Böylece hem Silverlight 1.0 hem 2.0 içerisinde Clipboard'dan veri alarak
veri aktarımı yapabildik. Tabi tüm bu işlemlerin sadece Internet
Explorer içerisine olması üzücü. Diğer tarayıcılar için de geçerli
olacak şekilde umarız ileride Silverlight Runtime içerisine standart
işlevsellikler eklenir.

Hepinize kolay gelsin.


