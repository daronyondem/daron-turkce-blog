---
FallbackID: 1933
Title: Silverlight 1.0 ve InkPresenter kullanımı
PublishDate: 28/1/2008
EntryID: Silverlight_1_0_ve_InkPresenter_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 8d45130d-a7b2-4ce4-a4ad-f550eeea494f
---
Silverlight 1.0 ile beraber gelen ve hakkında belki de en az bahsedilen
kontrollerden biri de **InkPresenter** kontrolüdür. InkPresenter
kontrolü ile web ortamında TabletPC'lerdeki kalemler ile yazı girişi ve
doğrudan dokunmatik ekranlarda elle çizimlerin yapılabilmesi
sağlanabilir. Böylece kullanıcılar web sitenizde görsel öğeler ,
fotoğraflar, videolar üzerine bile kolaylıkla notlar alabilecektir.

Silverlight ile beraber gelen **InkPresenter** yapısında her şey
StylusPoint'ler şeklinde yaratılır. Birden çok **StylusPoint** bir
**StylusPointCollection** içerisinde **StylusPoints** adı altında
saklanır. Her bir Collection'dan bir **Stroke** oluşturulur ve
**Stroke'lar** da **StrokeCollection** ile toparlanır. Tüm bu yapıların
her birinin kendine has özellikleri, metodları bulunur. Çok fazla teknik
bilgiye boğulmadan hemen bir uygulama yaparak InkPresenter nesnesini
nasıl kullanabileceğimize bakalım.

İlk olarak sahneye bir InkPresenter koyarak fonunu da beyaz rengine
ayarlıyoruz. Ayrıca InkPresenter nesnesinin toplam üç farklı event'ını
(MouseLeftButtonDown, MouseMove ve MouseLeftButtonUp) farklı JavaScript
fonksiyonların da bağlamamız gerekiyor. Elimizdeki XAML aşağıdaki
şekilde sonlanıyor.

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
style="color: #a31515;">InkPresenter</span><span style="color: red;">
Background</span><span style="color: blue;">="White"</span> <span
style="color: red;"> Width</span><span
style="color: blue;">="303"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="0"</span>

  <span style="color: red;"> MouseLeftButtonDown</span><span
style="color: blue;">="MouseDown"</span><span style="color: red;">
MouseMove</span><span style="color: blue;">="MouseMove"</span><span
style="color: red;"> MouseLeftButtonUp</span><span
style="color: blue;">="MouseUp"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Toplam üç farklı event kullanacağız. **MouseLeftButtonDown** ile farenin
sol tuşuna basıldığı anda çizim yapmaya başlayacağız. **MouseMove** yani
fare hareket ettikçe yaptığımız çizime yeni noktalar ekleyeceğiz,
**MouseLeftButtonUp** ile farenin tuşu serbest bırakıldığında çizimi
tamamlayacağız.

<span style="color: blue;">var</span> YeniStroke;

İlk olarak yukarıdaki şekilde tüm JavaScript event'larımızda kullanılmak
üzere global bir **YeniStroke** değişkeni tanımlıyoruz. Fare ile
basıldığında bu değişken üzerinden yeni bir çizgi yaratacağız ve fare
hareket ettikçe bu değişkeni kontrol ederek eğer yeni bir çizgi
yaratmışsak çizgiye yeni noktalar ekleyeceğiz. Eğer yeni bir çizgi
yaratmamışsak demek ki farenin düğmesine basılmamış. Gelelim hemen
farenin düğmesine ilk tıklandığında çalışacak olan
**MouseLeftButtonDown** durumunda neler yapacağımıza.

<span style="color: blue;">function</span> MouseDown(sender,args)

{

  sender.CaptureMouse();

  <span style="color: green;">//Çizgmizi yaratalım</span>

  YeniStroke = sender.getHost().content.createFromXaml(<span
style="color: #a31515;">"\<Stroke/\>"</span>);

  <span style="color: green;">//Çizginin özelliklerini belirmeke için
gerekli nesneyi yaratalım.</span>

  <span style="color: blue;">var</span> StrokeSekli =
sender.getHost().content.createFromXaml(<span
style="color: #a31515;">"\<DrawingAttributes/\>"</span>);

  <span style="color: green;">//Yarattığımız çizgi özelliklerini
çizgimize aktaralım.</span>

  YeniStroke.DrawingAttributes = StrokeSekli;

  <span style="color: green;">//Çizgi özelliklerini belirleyelim.</span>

  YeniStroke.DrawingAttributes.Width = 4;

  YeniStroke.DrawingAttributes.Height = 4;

  YeniStroke.DrawingAttributes.Color = <span
style="color: #a31515;">"Black"</span>;

 

  <span style="color: green;">//Yeni gelen Stylus noktaları çizgimize
ekleyelim.</span>

  YeniStroke.StylusPoints.AddStylusPoints(args.GetStylusPoints(sender));

  <span style="color: green;">//Çizgimizi InkPresenter kontrolüne
ekleyelim.</span>

  sender.Strokes.add(YeniStroke);

}

Olabildiğince satır içi yorumlarla tek tek neler yaptığımızı anlatmaya
çalıştım. Genel olarak başlangıçta bir çizgi yaratmamız gerekiyor.
**Stroke** yarattıktan sonra onun özelliklerini belirlemek üzere
**DrawingAttributes** yaratarak Stroke içerisine ekliyoruz. Sonrasında
**MouseLeftButtonDown** durumuna parametre olarak gelen **args**
değişkeni üzerinden **GetStylusPoints** metodu ile çizilen noktaları
alarak kendi çizgimize ekliyoruz. En sonunda da çizgimizi
**InkPresenter** içerisine yerleştiriyoruz. Sıra geldi fare hereket
ettikçe çalışacak olan **MouseMove** durumundaki kodu yazmaya.

<span style="color: blue;">function</span> MouseMove(sender,args)

{

  <span style="color: green;">//En son eklenen çizgi hala çiziliyor
mu?</span>

  <span style="color: blue;">if</span> (YeniStroke!=<span
style="color: blue;">null</span>)

  {

    <span style="color: green;">//En son eklenen çizgiye yeni gelen
noktaları ekleyelim.</span>

   
YeniStroke.StylusPoints.AddStylusPoints(args.GetStylusPoints(sender));

  }

}

Fare hareket ettikçe acaba daha önce yeni bir çizgi yaratmaya başladık
mı diye ufak bir kontrol yapıyoruz. Eğer yaratmaya başlamadıysak zaten
yapacak bir şey yok. Ama eğer ki yeni bir çizgi yaratmaya başlamışsak
bunu global değişkenimize de aktarmışız demektir. Bu durumda yeni gelen
noktaları da söz konusu çizgiye eklememiz gerekir. Yine
**MouseLeftButtonDown'da** olduğu gibi **GetStylusPoints** ile yeni
noktaları alarak çizgimize ekliyoruz. Son olarak sıra geldi
**MouseLeftButtonDown** durumunu yazmaya.

<span style="color: blue;">function</span> MouseUp(sender,args)

{

  <span style="color: green;">//Çizgi bitti. Değişkeni yok et.</span>

  YeniStroke = <span style="color: blue;">null</span>;

  sender.releaseMouseCapture();

}

Farenin sol düğmesi bırakıldığı anda biz de global değişkenimizi yok
ediyoruz. Böylece artık fare ekranda hareket edildiğinde çizgiye yeni
noktalar eklenmeyecek.

![InkPresenter çizimi fare ile bu kadar olur
:)](media/Silverlight_1_0_ve_InkPresenter_kullanimi/27012008_1.png)\
*InkPresenter çizimi fare ile bu kadar olur :)*

İşte hepsi bu kadar, **InkPresenter'ı** bir resim (Image) veya video
(MediaElement) üzerine şeffaf olarak yerleştirerek de kullanabilirsiniz.

Hepinize kolay gelsin.


