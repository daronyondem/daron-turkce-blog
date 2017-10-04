---
FallbackID: 1960
Title: Silverlight nesnelerinin fare ile dinamik olarak büyütülerek küçültülmesi.
PublishDate: 17/2/2008
EntryID: Silverlight_nesnelerinin_fare_ile_dinamik_olarak_buyutulerek_kucultulmesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 33ceddaf-3f67-4e5d-a8a1-1cba7344c3cd
---
Silverlight animasyonları içerisindeki nesnelerin dinamik olarak
kullanıcılar tarafından boyutlandırılmasını sağlayabilirsiniz. Bunun
için de tabi ki en hızlı yol kullanıcıya fare ile herhangi bir nesneyi
tutarak büyütüp küçültme şansı tanımaktır. Bu makalemizde bu çeşit bir
işlevselliği nasıl oluşturabileceğimizi inceleyeceğiz.

Yeni bir Silverlight projesi oluşturarak sahneye deneme amaçlı olarak
bir **Rectangle** nesnesi yerleştirelim. Amacımız kullanıcıların bu
nesneye tıklayarak dikdörtgeni fare ile büyütüp küçültebilmelerini
sağlamak. Dikdörtgene tıkladıktan sonra fare ile nesneden uzaklaştıkça
çizim büyüyecek, nesnenin sol üst köşesine yaklaştıkça dikdörtgen
küçülecek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
**MouseLeftButtonDown**</span><span
style="color: blue;">**="FareGeldi"**</span><span style="color: red;">
**MouseMove**</span><span
style="color: blue;">**="FareHareketli"**</span><span
style="color: red;"> **MouseLeftButtonUp**</span><span
style="color: blue;">**="FareGitti"**</span><span style="color: red;">
Width</span><span style="color: blue;">="249"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="237"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="86"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="36"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki şekliyle Silverlifght animasyonumuzu hazırlıyoruz. XAML
kodumuz içerisinde bir dikdörtgen bulunuyor. Bu dikdörtgen yerine siz
örneklerinizde **MediaElement** gibi içerisinde video oynayan nesneler
de kullanabilirsiniz. Dikdörtgenimize tıklandığında büyüme ve küçülme
işlemleri olacağı için dikdörtgenin **MouseLeftButtonDown**,
**MouseMove** ve **MouseLeftButtonUp** durumlarına ayrı ayrı JavaScript
fonksiyonları yazmamız gerekiyor. Gelin tek tek bu fonksiyonları yazmaya
başlayalım.

<span style="color: blue;">var</span> FareBasili;

<span style="color: blue;">var</span> SonDurum = {};

 

<span style="color: blue;">function</span> FareGeldi(sender,args)

{

    sender.captureMouse();

    FareBasili=<span style="color: blue;">true</span>;

    **SonDurum** = args.getPosition(<span
style="color: blue;">null</span>);

}

İlk olarak fareye ilk tıklandığında çalıştırılacak olan **FareGeldi**
fonksiyonunu yazıyor. Söz konusu fonksiyon içerisinde farenin durumunu
global olarak yakalayabilmemizi sağlayacakolan **captureMouse** metodunu
çağırdıktan sonra **FareBasili** adında düzenlemiş olduğumuz global
değişkenin değerini **true** olarak değiştiriyoruz. Böylece bir sonraki
adımda fare hareketini yakalarken büyütme işlemi başlatılmış mı yoksa
başlatılmamış mı kontrolünü yapabileceğiz. Son olarak da farenin
sahnedeki konumunu yine global değişkenimiz olan **SonDurum**
değişkenine aktarıyoruz.

<span style="color: blue;">function</span> FareHareketli(sender,args)

{

    <span style="color: blue;">if</span>(**FareBasili**)

    {

        sender.width += args.getPosition(<span
style="color: blue;">null</span>).X - **SonDurum**.X;

        sender.height += args.getPosition(<span
style="color: blue;">null</span>).Y - **SonDurum**.Y;

        **SonDurum** = args.getPosition(<span
style="color: blue;">null</span>);

    }

}

Dikdörtgen nesnesi üzerinde fare hareket ettikçe tetiklenecek olan
**MouseMove** durumuna bağlı **FareHareketli** fonksiyonu içerisinde ilk
olarak dikdörtgene basılarak herhangi bir büyütme veya küçültme
işleminin başlatılıp başlatılmadığı kontrol etmek için **FareBasili**
değişkeninin değerine bakıyoruz. Eğer öncesinde bir büyütme işlemi
başlatılmış ise gerekli değişiklikleri yapıyoruz. Farenin güncel konumu
ile bir önceki konumu arasında farkı alıp bu farkı nesnenin genişlik ve
yükseklik değerlerine ekliyoruz. Son olarak da farenin güncel konumunu
tekrar global değişkenimize kaydederek işlemi bitiyoruz. Böylece fare
hareket ettikçe gerçekleşen konum değişikliği kadar piksel değeri
nesnenin boyutuna yansıtılacak.

<span style="color: blue;">function</span> FareGitti(sender,args)

{

    sender.releaseMouseCapture();

    **FareBasili** = <span style="color: blue;">false</span>;

}

Son olarak **MouseLeftButtonUp** durumunda çalışacak olan **FareGitti**
fonksiyonumuzu yazıyoruz. Bu fonksiyon kullanıcı farenin düğmesinden
parmağını çektiğinde çalışacak. Yani artık büyütme veya küçültme işlemi
sonlandı. Bu durumdan **MouseMove** event'ını haberdar edebilmek için
hemen global değişkenimizi false olarak değiştiriyoruz.

Artık örneğimiz çalışmaya hazır. Örneğin son halinin kaynak kodları şu
şekilde;

**[Page.xaml.js]**\
 <span style="color: blue;">\
 if</span> (!window.Resize)

    window.Resize = {};

 

Resize.Page = <span style="color: blue;">function</span>()

{

}

 

Resize.Page.prototype =

{

    handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

    {

    }

}

 

<span style="color: blue;">var</span> FareBasili;

<span style="color: blue;">var</span> SonDurum = {};

 

<span style="color: blue;">function</span> FareGeldi(sender,args)

{

    sender.captureMouse();

    FareBasili=<span style="color: blue;">true</span>;

    SonDurum = args.getPosition(<span style="color: blue;">null</span>);

}

<span style="color: blue;">function</span> FareHareketli(sender,args)

{

    <span style="color: blue;">if</span>(FareBasili)

    {

        sender.width += args.getPosition(<span
style="color: blue;">null</span>).X - SonDurum.X;

        sender.height += args.getPosition(<span
style="color: blue;">null</span>).Y - SonDurum.Y;

        SonDurum = args.getPosition(<span
style="color: blue;">null</span>);

    }

}

<span style="color: blue;">function</span> FareGitti(sender,args)

{

    sender.releaseMouseCapture();

    FareBasili = <span style="color: blue;">false</span>;

}

Hepinize kolay gelsin.


