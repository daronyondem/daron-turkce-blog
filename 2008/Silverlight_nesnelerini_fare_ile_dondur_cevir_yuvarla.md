---
FallbackID: 1959
Title: "Silverlight nesnelerini fare ile döndür / çevir / yuvarla":)
date: "2008-2-16"
EntryID: Silverlight_nesnelerini_fare_ile_dondur_cevir_yuvarla
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: a2b9ef4b-0d68-47e3-9f9b-5d28f2e84ff2
---
Silverlight içerisinde fare ile nesneler arasında bir etkileşim kurmak
için JavaScript ile çok farklı kodlar yazılabilir. Bu makalede herhangi
bir nesneyi fare ile tutarak sahnede kendi etrafında çevirmeyi
deneyeceğiz. Bunun için hemen yeni bir Silverlight animasyonu
yaratıyoruz ve içerisinde örnek olması amacıyla ufak bir resim
yerleştiriyoruz. **Image** nesnesinin adını **Foto** olarak verdikten
sonra **Image** tagları arasına aşağıdaki şekliyle **RotateTransform**
nesnesi yerleştirmemiz gerekiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="400"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Width</span><span style="color: blue;">="185"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="184"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="110"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="103"</span><span style="color: red;">
Source</span><span style="color: blue;">="image[1].jpg"</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="Foto"**</span><span style="color: red;">
RenderTransformOrigin</span><span
style="color: blue;">="0.5,0.5"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RotateTransform</span><span style="color: red;">
**x**</span><span style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="FotoAci"**</span><span style="color: red;">
Angle</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde özellikle dikkat etmemiz gereken iki nokta
var. Bunlardan ilki **Image** nesnemizin adının **Foto** olması,
ikincisi ise aynı şekilde Foto'ya ait **RotateTransform** nesnesine de
**FotoAci** ismini vermiş olmamış. Bu isimler üzerinden söz konusu
nesnelere ulaşıyor olacağız.

Kullanıcılar fotoğrafımıza tıklayarak döndürme işlemini
başlatabilsinler. Yani Foto nesnesinin MouseLeftButtonDown durumunu
kontrol etmeliyiz. Aynı şekilde döndürme işlemini bitirebilmek için
MouseLeftButtonUp durumunu da kontrol etmemiz gerekecek. Fakat bunların
haricinde fare ile döndürme işlemi yapılırken kullanıcı Foto nesnesinin
dışına da çıkabilir. Bu durumda döndürmenin devam edebilmesi için tüm
sahnedeki MouseMouve durumunu kontrol etmemiz gerekecek. Ayrıca döndürme
işlemine fotoğrafın üzerinde başlayıp dışarıda sonlandırılabilir. Özetle
aşağıdaki şekilde dört farklı durumu kontrol etmemiz gerekiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="400"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: red;">**  MouseMove**</span><span
style="color: blue;">**="FareHareketli"**</span>

<span style="color: red;">**  MouseLeftButtonUp**</span><span
style="color: blue;">**="FareGitti"**</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
**MouseLeftButtonDown**</span><span
style="color: blue;">**="FareGeldi"**</span><span style="color: red;">
**MouseLeftButtonUp**</span><span
style="color: blue;">**="FareGitti"**</span> <span style="color: red;">
Width</span><span style="color: blue;">="185"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="184"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="110"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="103"</span><span style="color: red;">
Source</span><span style="color: blue;">="image[1].jpg"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Foto"</span><span style="color: red;">
RenderTransformOrigin</span><span
style="color: blue;">="0.5,0.5"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RotateTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="FotoAci"</span><span style="color: red;">
Angle</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Şimdi sıra geldi gerekli JavaScript kodlarını yazmaya. Doğruda
projemizin **Page.xaml.js** dosyasına yöneliyoruz. İlk olarak
**FareGeldi** fonksiyonunu yazalım.

<span style="color: blue;">var</span> FareBasili;

<span style="color: blue;">var</span> SonDurum;

 

<span style="color: blue;">function</span> FareGeldi(sender, args)

{

    <span style="color: green;">//Global fare takibini başlat</span>

    sender.captureMouse();

    <span style="color: green;">//Tuşa BASILDI!! :)</span>

    FareBasili = <span style="color: blue;">true</span>;

    <span style="color: green;">// Durumu bir kenara kaydet</span>

    SonDurum = args.getPosition(<span style="color: blue;">null</span>);

}

Yukarıdaki kodun öncesinde iki adet global değişken tanımlıyoruz. Bu
değişkenlerden biri farenin tuşunun basılı olup olmadığı kontrol edecek.
Böylece **MouseMove** durumunda gerekli işlemlerin yapılıp,
yapılmamasını sağlayacağız. Diğer değişken ise fare imlecinin
pozisyonunu bir kenara kaydediyor, ileride kullanıyor olacağız.

Sıra geldi nesneyi çevirme işlemine, yani FareHareketli JavaScript
fonksiyonunu yazmaya.

<span style="color: blue;">function</span> FareHareketli(sender,args)

{

    <span style="color: blue;">var</span> GuncelDurum =
args.getPosition(<span style="color: blue;">null</span>);

 

    <span style="color: green;">// Fareye basılı mı??</span>

    <span style="color: blue;">if</span> (FareBasili)

    {   

        <span style="color: blue;">var</span> AciNesnesi =
sender.findName(<span style="color: #a31515;">"FotoAci"</span>);

 

       <span style="color: green;">// Nesnenin merkez noktasının
global</span>

       <span style="color: green;">//koordinatlarını bulalım.</span>

        <span style="color: blue;">var</span> Merkez = {};     

        Merkez.X = sender.findName(<span
style="color: #a31515;">"Foto"</span>)[<span
style="color: #a31515;">"Canvas.Left"</span>] + sender.findName(<span
style="color: #a31515;">"Foto"</span>).width/2;

        Merkez.Y = sender.findName(<span
style="color: #a31515;">"Foto"</span>)[<span
style="color: #a31515;">"Canvas.Top"</span>] + sender.findName(<span
style="color: #a31515;">"Foto"</span>).height/2;

 

        <span style="color: green;">// Çeviri işlemi</span>

        <span style="color: blue;">var</span> SonAci =
parseInt(Math.atan2(SonDurum.Y - Merkez.Y, SonDurum.X - Merkez.X) \* 360
/ (2 \* Math.PI));

        <span style="color: blue;">var</span> GuncelAci =
parseInt(Math.atan2(GuncelDurum.Y - Merkez.Y, GuncelDurum.X -
Merkez.X) \* 360 / (2 \* Math.PI));

        AciNesnesi.Angle += GuncelAci-SonAci;

 

        <span style="color: green;">// Son durumu tekrar sakla.</span>

        SonDurum = GuncelDurum;

    }

}

Yukarıdaki kod sizi korkutmasın. Aslında epey basit bir işlemden
bahsediyoruz. İlk satırda farenin güncel koordinatlarını alıyoruz
sonrasında da fareye basılı mı yoksa değil mi kontrolünü yapmak için
kendi **FareBasili** değişkenimize danışıyoruz. Eğer farenin düğmesine
basılmış ise döndürme işlemini yapmamız gerekecek.

Döndürme işlemini yaptıktan sonra hesapladığımız yeni açı değerini adını
FotoAci koyduğumuz RotateTransform nesnesine aktarmamız gerekecek. O
nedenle baştan nesnemizi **AciNesnesi** adında bir değişkene
aktarıyoruz. Sıra geldi hesaplamalara; kullanacağımız teknik farenin
sahnedeki konumu ile çevirmek istediğimiz nesnenin merkez noktası
arasında bir doğru çizerek bu döğrunun X aksına açısını almak olacak. Bu
nedenle ilk olarak nesnenin merkezinin global koordinatlarını buluyoruz.
Sonrasında açı hesaplama işlemlerini yaparken ilk olarak bir önceki
durumdaki, yani bizim **SonDurum** değişkenine kaydettiğimiz durumdaki
açıyı hesaplıyoruz sonra da şu anki durumdaki açıyı hesaplıyoruz. Açı
hesaplama için standart JavaScript fonksiyonları kullanıyoruz.
Kullandığımız esas fonksiyon olan Math.atan2 geriye Radiant döndürdüğü
için onu da dereceye çeviriyoruz.

Son olarak önceki ile sonraki açı arasındaki farkı alarak
**RotateTransform** nesnesinin açısına ekliyoruz. **SonDurum**
değişkenini de güncelledikten sonra işimiz bitiyor.

İşimiz bitiyor derken sadece **FareHareketli** fonksiyonundan
bahsediyordum. Tabi ki daha **FareGitti** fonksiyonunu da yazmamız
lazım.

<span style="color: blue;">function</span> FareGitti(sender,args)

{

    FareBasili = <span style="color: blue;">false</span>;

    sender.releaseMouseCapture();

}

Gördüğünüz gibi FareGitti kısmı belki de işin en kolay kısmı. Global
**FareBasili** değişkenimizi **false** yaptıktan sonra global fare
yakalamayı da kapatıyoruz.

Artık projemizi çalıştırabiliriz. **Foto** nesnemizi faremiz ile
istediğimiz gibi döndürebiliyoruz.

Hepinize kolay gelsin.


