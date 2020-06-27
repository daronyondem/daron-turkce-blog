# Silverlight ile tam ekran uygulamalar
Silverlight uygulamalarının yeri geldiğinde tam ekran olarak da
kullanılabildiğini örneklerde görmüşsünüzdür. İster amacınız tam ekran
video oynatmak olsun ister kullanıcılarınıza bir web sitesinden öte
deneyimler yaşatmak olsun Silverlight ile kolaylıkla internet üzerinden
yayınlanan tam ekran uygulamalar hazırlayabilirsiniz.

Örneğimizde web sitesi içerisindeki bir videoyu oynatan bir
**MediaElement** kullanacağız. Silverlight animasyonuna fare ile
tıklandığında animasyon tam ekran olacak ve beraberinde video da tam
ekran olarak oynatılacak. Uygulamamızın XAML kodu aşağıdaki şekilde
olabilir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="300"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="0"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span><span style="color: red;">
Source</span><span style="color: blue;">="Bear.wmv"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="300"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Medya**"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Silverlight uygulamamız ilk açıldığında **handeLoad** durumunu
çalıştıracaktır. Animasyon başlatıldığı gibi ilk olarak tüm
animasyondaki fare tıklamalarını yakalamamız gerekecek. Böylece herhangi
bir tıklama durumunda doğrudan tam ekran moduna geçebiliriz.

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    rootElement.addEventListener(<span
style="color: #a31515;">"MouseLeftButtonDown"</span>,
Silverlight.createDelegate(<span style="color: blue;">this</span>, <span
style="color: blue;">this</span>.MouseLeftButtonDown));

    control.Content.OnFullScreenChange = <span
style="color: blue;">this</span>.OnFullScreenChange;

  }

Yukarıdaki kod içerisinde ilk satırda fare tıklamalarını yakalayacak
olan JavaScript fonksiyonumuzu bağlıyoruz. Bir sonraki satırda ise
Silverlight animasyonunun **FullScreen** yani tam ekran olma durumu
değiştiğinde çalıştırılmak üzere bir JavaScript fonksiyonu tanımlıyoruz.
Böylece animasyon tam ekran moduna geçtiğinde ek olarak video gösterim
işlemini yapan MediaElement'i de tam ekran yapacağız. Unutmayın ki
**MediaElement** toplam animasyonun içerisinde sadece bağımsız bir
nesne. Tam ekran olan şey bizim Silverlight animasyonumuz MediaElement
değil.

  MouseLeftButtonDown: <span
style="color: blue;">function</span>(sender, keyEventArgs)

  {

    sender.GetHost().Content.FullScreen = <span
style="color: blue;">true</span>;

  }

**MouseLeftButtonDown** durumuna iletilen parametreler arasından
**sender'ı** alarak **GetHost**() metodu ile Silverlight animasyonumuzu
yakalıyor ve içeriğine ait **FullScreen** özelliğini **true** yaparak
tam ekran moduna geçişi sağlıyoruz. Sıra geldi tam ekran moduna geçişi
algılayarak animasyon içerisindeki nesneleri uygun boyutlara getirecek
olan kodumuza.

  OnFullScreenChange: <span style="color: blue;">function</span>(sender,
keyEventArgs)

  {

    sender.findName(<span
style="color: #a31515;">"Medya"</span>).Height=sender.getHost().content.actualHeight;

    sender.findName(<span
style="color: #a31515;">"Medya"</span>).Width=sender.getHost().content.actualWidth;

  }

Yukarıda da gördüğünüz gibi doğrudan **Medya** adındaki **MediaElement**
nesnemizi yakalayarak genişlik ve yükseklik değerlerini değiştiriyoruz.
Silverlight animasyonunun tam boyutunu alabilmek için yine **Content**
üzerinden bu sefer **actualHeight** ve **actualWidth** özelliklerini
kullanıyoruz. Böylece tam olarak ekranın boyutunu alarak
MediaElement'imizi tam ekran boyutuna büyütebiliyoruz.

Tam ekran modundan çıkış ile ilgili kurallar zaten bizim
değiştiremeyeceğimiz şekilde Silverlight Plug-In tarafından tanımlanmış
durumda. Kullanıcılar **Esc** tuşu ile tam ekrandan çıkış
yapabiliyorlar. Konu ile ilgili ufak bir uyarı tam ekran moduna geçiş
esnasında otomatik olarak gösteriliyor.

Uygulamamızın son halindeki JavaScript dosyasında bakarsak sonuç
aşağıdaki gibi.

<span style="color: blue;">if</span> (!window.UntitledProject1)

  window.UntitledProject1 = {};

 

UntitledProject1.Page = <span style="color: blue;">function</span>()

{

}

 

UntitledProject1.Page.prototype =

{

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    rootElement.addEventListener(<span
style="color: #a31515;">"MouseLeftButtonDown"</span>,
Silverlight.createDelegate(<span style="color: blue;">this</span>, <span
style="color: blue;">this</span>.MouseLeftButtonDown));

    control.Content.OnFullScreenChange = <span
style="color: blue;">this</span>.OnFullScreenChange;

  },

  MouseLeftButtonDown: <span
style="color: blue;">function</span>(sender, keyEventArgs)

  {

    sender.GetHost().Content.FullScreen = <span
style="color: blue;">true</span>;

  },

  OnFullScreenChange: <span style="color: blue;">function</span>(sender,
keyEventArgs)

  {

    sender.findName(<span
style="color: #a31515;">"Medya"</span>).Height=sender.getHost().content.actualHeight;

    sender.findName(<span
style="color: #a31515;">"Medya"</span>).Width=sender.getHost().content.actualWidth;

  }

}

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-1-6 tarihinde yayinlanmistir.*
