---
FallbackID: 1886
Title: Sayfa içi Silverlight uygulamaları
PublishDate: 12/14/2007
EntryID: Sayfa_ici_Silverlight_uygulamalari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: eaab8a38-7f8c-4d67-86f6-1456dcf9e90d
---
Sayfa içi Silverlight kullanımı özellikle Silverlight animasyonlarını ve
görsellerini oluşturan XAML kodunu sunucu tarafında oluşturuyorsanız
belirli senaryolarda işinizi kolaylaştırabilir. Örneğin bir **ASP.NET
Repeater** içerisinde **ItemTemplate'ler** ile XAML kodu oluşturmak bu
konsept içerisinde mümkün.

Normal şartlarda bir Silverlight uygulaması **createSilverlight**
fonksiyonundaki **Silverlight.createObjectEx** metoduna verilen
**source** parametresinde yazan adresteki XAML kodunu alarak gerekli
animasyonları oluşturur. **Source** parametresi içerisinde aşağıdaki
gibi **\#** işaret ile başlayarak bir kaynak belirttiğinizde
**Silverlight.createObjectEx** fonksiyonu **** sayfa içerisinde uygun
bir XAML kaynağı arayacak ve varsa gerekli yüklemeyi sağlayacaktır.

<span style="color: blue;">function</span> createSilverlight()

{

  <span style="color: blue;">var</span> scene = <span
style="color: blue;">new</span> ITU2.Page();

  Silverlight.createObjectEx({

    source: <span style="color: #a31515;">"**\#CODE"**</span>,

    parentElement: document.getElementById(<span
style="color: #a31515;">"SilverlightControlHost"</span>),

    id: <span style="color: #a31515;">"SilverlightControl"</span>,

    properties: {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>

    },

    events: {

      onLoad: Silverlight.createDelegate(scene, scene.handleLoad)

    }

  });

}

Peki **\#CODE** da nedir? Yukarıdaki gibi **\#CODE** dediğimizde
Silverlight harici bir XAML dosyasına bakmak yerine
**createSilverlight** fonksiyonunun çalıştırıldığı sayfada ID bilgisi
**CODE** olan bir **SCRIPT** bloğu arayacak. Söz konusu SCRIPT bloğunun
aşağıdaki gibi TYPE özelliğinin de **TEXT/XAML** olması gerekir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span> <span
style="color: red;">xmlns</span><span
style="color: blue;">="http://www.w3.org/1999/xhtml"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Silverlight.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Default\_html.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Page.xaml.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">style</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"\></span>

    <span style="color: #a31515;">.silverlightHost</span> {

      <span style="color: red;">height</span>: <span
style="color: blue;">480px</span>;

      <span style="color: red;">width</span>: <span
style="color: blue;">640px</span>;

    }

  <span style="color: blue;">\</</span><span
style="color: #a31515;">style</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">**\<**</span><span
style="color: #a31515;">**script**</span> <span style="color: red;">
**id**</span><span style="color: blue;">**="CODE"**</span> <span
style="color: red;"> **type**</span><span
style="color: blue;">**="text/xaml"\>**</span>

\<Canvas

  xmlns=<span
style="color: #a31515;">"http://schemas.microsoft.com/client/2007"</span>

  xmlns:x=<span
style="color: #a31515;">"http://schemas.microsoft.com/winfx/2006/xaml"</span>

  Width=<span style="color: #a31515;">"300"</span> Height=<span
style="color: #a31515;">"300"</span>

  Background=<span style="color: #a31515;">"White"</span>

  x:Name=<span style="color: #a31515;">"Page"</span>

  \> 

  \<Rectangle Width=<span style="color: #a31515;">"0"</span>
Height=<span style="color: #a31515;">"2"</span> Fill=<span
style="color: #a31515;">"\#FFFB0000"</span> Stroke=<span
style="color: #a31515;">"\#FF000000"</span> RadiusX=<span
style="color: #a31515;">"26.5"</span> RadiusY=<span
style="color: #a31515;">"26.5"</span> Canvas.Left=<span
style="color: #a31515;">"-113"</span> Canvas.Top=<span
style="color: #a31515;">"166"</span>/\>

\</Canvas\>

<span style="color: blue;">**\</**</span><span
style="color: #a31515;">**script**</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="SilverlightControlHost"</span> <span
style="color: red;">class</span><span
style="color: blue;">="silverlightHost"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

      createSilverlight();

    <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

Yukarıdaki örnekte de görebildiğiniz üzere Silverlight uygulaması ile
ilgili tüm XAML kodu SCRIPT tagları arasına yerleştirilmiş durumda. Daha
önceki adımda JavaScript tarafında **\#CODE** diyerek burada ID bilgisi
**CODE** olan bölümden gerekli XAML içeriğinin alınmasını sağladık.
Silverlight uygulamamız normal bir Silverlight animasyonu olarak
çalışmaya devam edecektir. Direk sayfa içerisinde bulunan bu XAML kodunu
harici bir sayfa yaratmadan Repeater gibi nesnelerle veritabanına
bağlayarak kullanmamız bu teknik ile çok daha kolaylaşıyor.

Hepinize kolay gelsin.


