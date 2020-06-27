---
FallbackID: 1909
Title: "Silverlight ile istemci tarafına ZIP arşivi yükleyerek içeriğini kullanmak ve Preloader uygulaması"
date: "2008-1-5"
EntryID: Silverlight_ile_istemci_tarafina_ZIP_arsivi_yukleyerek_icerigini_kullanmak_ve_Preloader_uygulamasi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 6f5dbc20-6cd3-453e-a621-444ffed417cd
---
Silverlight ile beraber gelen belki de en güzel özelliklerden biri
Silverlight animasyonlarında kullanabileceğiniz harici içeriği sunucudan
istemciye indirirken bir **ZIP** paketi şeklinde indirerek
kullanabiliyor olmanız. Aşağıdaki örnekte uygulamamız bir ZIP paketini
sunucudan indirerek içerisinde bir resim dosyasını ekranda göstermek
üzere bir Silverlight **Image** nesnesine aktaracak. Tüm bunları
yaparkan söz konusu ZIP paketi yüklenirken bir de yüklenme durumunu
gösteren görsel çubuk hazırlayacağız.

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
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="245"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="38"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="28"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="23"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**DurumCubugu**"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: red;"> EndPoint</span><span
style="color: blue;">="0.988,0.5"</span><span style="color: red;">
StartPoint</span><span style="color: blue;">="0.012,0.5"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="0"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FF885656"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="0.772"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="1"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Width</span><span style="color: blue;">="153"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="19"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="40"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="34"</span><span style="color: red;">
TextWrapping</span><span style="color: blue;">="Wrap"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**DurumMetin**"</span><span style="color: red;">
Foreground</span><span
style="color: blue;">="\#FFFFFFFF"\>\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Width</span><span style="color: blue;">="245"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="189"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="28"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="80"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Foto**"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki Silverlight animasyonu içerisinde dosyanın yüklenme durumunu
gösterecek olan **DurumCubugu** adında bir dikdörtgenimiz var. Bu
dikdörtgenin genişliğini değiştirerek yükleme işlemini görsel olarak
kullanıcıya yansıtacağız. Söz konusu dikdörtgenin üzerine denk gelecek
şekilde bir de **TextBlock** yerleştirilmiş. **DurumMetin** adındaki bu
TextBlock içerisinde 40% şeklinde yükleme durumunu yazılı olarak
göstereceğiz. Son olarak yüklediğimiz ZIP dosyasındaki bir resmi
göstermek için de adı **Foto** olan bir **Image** nesnemiz bulunuyor.

Gelin şimdi ilk olarak sunucudan asenkron bir şekilde ZIP paketini
indirecek olan **downloader** nesnemizi yaratacağımız kodları
inceleyelim.

    <span style="color: blue;">var</span> yukleme =
control.CreateObject(<span style="color: #a31515;">"downloader"</span>);

    yukleme.AddEventListener(<span
style="color: #a31515;">"Completed"</span>, Bitti);

    yukleme.AddEventListener(<span
style="color: #a31515;">"DownloadProgressChanged"</span>, DurumDegisti);

    yukleme.Open(<span style="color: #a31515;">"GET"</span>, <span
style="color: #a31515;">"paket.zip"</span>);

    yukleme.Send();

Yukarıdaki kod Silverlight uygulaması ilk çalıştırıldığında hemen
devreye girecek. **handleLoad** event handler içerisinde bulunan
**control** parametresinden yola çıkarak **yukleme** adındaki
**downloader** nesnemizi yaratıyoruz. Bu nesneye toplam iki tane
**EventListener** ekleyeceğiz. Download işlemi tamamlandığımda
çalıştırılmak üzere **Bitti** adındaki bir JavaScript fonksiyonunu
**Completed** durumuna referans olarak veriyoruz. Ayrıca download
durumunda her değişiklik olduğunda çalıştırılmak üzere bir de
**DurumDegisti** adında bir JavaScript fonksiyonunu
**DownloadProgressChanged** durumuna bağlıyoruz. Bu her iki fonksiyonu
da ayrıca birazdan yazacağız. Son olarak sunucudan alacağımız dosya olan
**paket.zip** dosyasını da belirterek **Send**() metodu ile talebimizi
sunucuya gönderiyoruz.

Gelelim yükleme durumu değiştiğinde çalıştırılacak olan **DurumDegisti**
fonksiyonunu yazmaya.

<span style="color: blue;">function</span> DurumDegisti(sender,
eventArgs)

{

sender.FindName(<span
style="color: #a31515;">"DurumCubugu"</span>).Width =
**sender.DownloadProgress** \* 245;

sender.FindName(<span style="color: #a31515;">"DurumMetin"</span>).Text
= Math.floor(**sender.DownloadProgress \* 100**) + <span
style="color: #a31515;">"%"</span>;

}

Her durum değişikliğinde ilk olarak **DurumCubugu** adındaki Silverlight
dikdörtgenimizi bularak genişliğini değiştiriyoruz. Söz konusu
dikdörtgenin maksimum genişliği 245 şeklinde olduğu için bize bir
üzerinden gelen **DownloadProgress** özelliğini doğrudan 245 ile
çarparak dikdörtgenin genişliğine aktarıyoruz. Sonrasında da yine aynı
değeri 100 ile çarparak yüz üzerinden ne kadar yükleme yapıldığını
bularak bu sefer de DurumMetin adındaki TextBlock nesnemizin içerisine
yazdırıyoruz. Bunu yaparken gelen değeri **Math.floor** adındaki klasik
bir JavaScript fonksiyonu ile yuvarlıyoruz.

Peki download işlemi bittiğinde ne yapacağız? ZIP içerisinden dosyamızı
alarak nasıl **Image** nesnesine aktaracağız?

<span style="color: blue;">function</span> Bitti(sender, eventArgs)

{

sender.findName(<span
style="color: #a31515;">"Foto"</span>).SetSource(sender, <span
style="color: #a31515;">"IMG\_5237.jpg"</span>);

}

Yukarıda da gördüğünüz üzere aslında durum oldukça basit. **Image**
nesnemiz olan **Foto** nesnesini bulduktan sonra **SetSource** metodunu
kullanıyoruz. Kaynak olarak **sender**, yani ZIP dosyamızdan gelen
veriyi gösterdikten sonra kaynak paketteki dosya adını da vermemiz
yeterli oluyor.

Silverlight uygulamasının tam JavaScript kodu aşağıdaki şekilde
sonlanıyor.

<span style="color: blue;">if</span> (!window.UntitledProject4)

  window.UntitledProject4 = {};

 

UntitledProject4.Page = <span style="color: blue;">function</span>()

{

}

 

UntitledProject4.Page.prototype =

{

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    <span style="color: blue;">var</span> yukleme =
control.CreateObject(<span style="color: #a31515;">"downloader"</span>);

    yukleme.AddEventListener(<span
style="color: #a31515;">"Completed"</span>, Bitti);

    yukleme.AddEventListener(<span
style="color: #a31515;">"DownloadProgressChanged"</span>, DurumDegisti);

    yukleme.Open(<span style="color: #a31515;">"GET"</span>, <span
style="color: #a31515;">"paket.zip"</span>);

    yukleme.Send();

  }

}

<span style="color: blue;">function</span> Bitti(sender, eventArgs)

{

sender.findName(<span
style="color: #a31515;">"Foto"</span>).SetSource(sender, <span
style="color: #a31515;">"IMG\_5237.jpg"</span>);

}

<span style="color: blue;">function</span> DurumDegisti(sender,
eventArgs)

{

sender.FindName(<span
style="color: #a31515;">"DurumCubugu"</span>).Width =
sender.DownloadProgress \* 245;

sender.FindName(<span style="color: #a31515;">"DurumMetin"</span>).Text
= Math.floor(sender.DownloadProgress \* 100) + <span
style="color: #a31515;">"%"</span>;

}

Hepinize kolay gelsin.


