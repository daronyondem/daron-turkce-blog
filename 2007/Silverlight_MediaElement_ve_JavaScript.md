---
FallbackID: 1827
Title: Silverlight MediaElement ve JavaScript
PublishDate: 10/29/2007
EntryID: Silverlight_MediaElement_ve_JavaScript
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, Silverlight
old.EntryID: 7bc99221-292d-4a23-a7cf-2f4aa892984a
---
Silverlight 1.0 uygulamalarında Video yayınının gücünden daha önceki
yazılarımda bahsetmiştim. Gelin şimdi hep beraber sıfırdan bir
Silverlight Video Oynatıcı'sı hazırlayalım. **Expression Blend 2
September Preview** yazılımını kullanacağımız bu demoda yeni bir
Silverlight (JavaScript) projesi yaratarak **Page1.xaml** üzerinde
çalışacağız. Dosyamıza bir adet **MediaElement** eklememiz gerekiyor,
bunun için Expression Blend 2 içerisinde sol araç çubuğundan **Asset
Library**'ye girerek "MediaElement" yazarak kontroller arasında arama
yaptırmamız gerekiyor. Kontrol listesi içerisinde MediaElement'i
bulduktan sonra sayfaya ekleyebilirsiniz.

![Asset Library içerisinden MediaElement'imizi
buluyoruz.](http://cdn.daron.yondem.com/assets/1827/28102007_1.png)\
*Asset Library içerisinden MediaElement'imizi buluyoruz.*

MediaElement'i sayfaya ekledikten sonra sıra geldi bir de video dosyası
eklemeye. MediaElement'e ait Source özelliğine Blend 2 içerisinden bir
video bağladığımızda video dosyasının bir kopyası projemize otomatik
olarak ekleniyor.

![MediaElement'e ait Source özelliğine videomuzu
gösteriyoruz.](http://cdn.daron.yondem.com/assets/1827/28102007_2.png)\
*MediaElement'e ait Source özelliğine videomuzu gösteriyoruz.*

Bu işlemleri tamamladıktan sonra Silverlight uygulamamızı direk
çalıştırabiliriz. Video dosyamız **MediaElement** içerisinde oynatılıyor
olacaktır. Şimdi gelin videonun üzerine tıklandığında durmasını sonra da
tekrar tıklandığında devam etmesini sağlayalım. Bunun için
MediaElement'e ait **MouseLeftButtonDown** özelliğine bir JavaScript
fonksiyonu atamamız gerekiyor. Maalesef bunu şimdilik direk XAML kodu
içerisinde yapmamız gerekiyor, Expression Blend 2 içerisinde bu işlem
için bir arayüz yok. Benim tavsiyem Video projesini Blend 2 ile beraber
aynı anda Visual Studio ile de açmanız. Visual Studio içerisinde XAML
Intellisense desteğini de kullanarak daha rahat bir çalışma ortamı
yaratabilirsiniz. **VideoTiklandi** adinda bir JavaScript fonksiyonunu
aktardığımız **MediaElement** nesnemizi içeren XAML kodumuzun tamamı
aşağıdaki şekilde sonlanıyor.

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
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">  </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span style="color: blue;">White</span>"

<span style="color: blue;">  </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Page</span>"

<span style="color: blue;">  \></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">MediaElement</span><span style="color: blue;">
</span><span style="color: red;">Canvas.Left</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;"> </span><span
style="color: red;">Canvas.Top</span><span
style="color: blue;">=</span>"<span style="color: blue;">8</span>"<span
style="color: blue;"> </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bear.wmv</span>"<span style="color: blue;">
</span><span style="color: red;"> **MouseLeftButtonDown**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**VideoTiklandi**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

\

Sıra geldi JavaScript fonksiyonumuzun kendisini yazmaya.
**Page.xaml.js** adında Expression Blend 2 tarafından yaratılmış
JavaScript dosyasında bize örnek olması amacıyla bazı kodlar
yerleştirilmiş. İlk olarak bu kodları silerek Page.xaml.js'i aşağıdaki
hale getirmemiz gerekiyor.

<span style="color: blue;">if</span> (!window.VideoYansima)

  window.VideoYansima = {};

 

VideoYansima.Page = <span style="color: blue;">function</span>()

{

}

 

VideoYansima.Page.prototype =

{

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

  }

}

\

Tüm bu kodların devamına **VideoTiklandi** JavaScript fonksiyonumuzu
tanımlayalım. Fonksiyonumuz video eğer oynatılıyorsa durduracak,
durdurulmuş durumdaysa tekrar devam ettirecek. Videonun var olan
durumunu saklamak üzere **Oynuyor** adında bir JavaScript değişkeni
kullanacağız.

<span style="color: blue;">var</span> Oynuyor = <span
style="color: blue;">true</span>;

 

<span style="color: blue;">function</span> VideoTiklandi (sender, args)

{

  <span style="color: blue;">if</span> (Oynuyor)

  {

    **sender.pause();**

    Oynuyor = <span style="color: blue;">false</span>;

  }

  <span style="color: blue;">else</span>

  {

    **sender.play();**

    Oynuyor = <span style="color: blue;">true</span>;

  };

}

\

Yukarıdaki kod içerisindeki standart JavaScript işlemlerinin yanı sıra
Silverlight ile ilişkili olarak dikkat etmemiz gereken noktalardan biri
MediaElement'imize **sender** JavaScript objesi üzerinden ulaşabiliyor
olmamız. Hali hazırda JavaScript fonksiyonumuzu MediaElement üzerinden
tetiklediğimiz için **sender** nesnesi de MediaElement'in ta kendisi
oluyor. MediaElement'in doğrudan **play(), pause()** ve **stop()**
metodlarını kullanarak videoyu durdurabilir, başlatabilir veya bulunduğu
yerden devam ettirebiliriz.

Basit bir Silverlight video oynatıcısı hazırladığımız bu örnekte
MediaElement'i ve JavaScript fonksiyonlarının Silverlight yapısındaki
yerini hızlıca inceledik. Bu yazımı takiben sonraki makalemde bu
örneğimize devam ederek **MediaElement** içerisindeki videonun
**VideoBrush** ile yansımasını almayı öğreneceğiz.

Hepinize kolay gelsin.


