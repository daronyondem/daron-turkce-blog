---
FallbackID: 2525
Title: Windows Phone 7'de Accelerometer verisini okumak.
PublishDate: 12/5/2010
EntryID: Windows_Phone_7_de_Accelerometer_verisini_okumak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone 7, Windows Phone
old.EntryID: 70081645-0bb4-4051-9bcc-41294381d539
---
Cep telefonlarının en önemli parçalarından biri de artık
Accelerometer'lar. Telefonu farklı yönlenere çevirdiğimizde durumu
algılayan donanım parçasından bahsediyorum :) Aslında bu donanım son
dönemde cep telefonlarından çıkıp bilgisayarlarımıza kadar geldi hatta
bu konuda Windows 7 ile beraber "[Sensor and Location
API](http://daron.yondem.com/tr/post/29e6cf2c-659a-4da7-baff-d9eca2476c24)"
adında yeni bir API serisi bile var. Tabi Windows Phone 7 için uygulama
geliştirirken de doğal olarak cihazlardaki Accelerometer'a ulaşmamız
gerekecek. Merak edenler için özellikle belirtiyim; üzerinde WP7 bulunan
her telefonun bir Accelerometer içermesi Microsoft tarafından şart
koşuluyor. O nedenle uygulamalarınızı kodlarken rahat olabilirsiniz, her
halükarda bir Accelerometer sahibi olacaksınız.

İlk olarak gelin yeni yaratacağımız bir WP7 uygulamasına bir düğme ve üç
tane de TextBlock koyalım. Düğmeye basıldığı anda Accelerometer
sensörüne bağlantıyı kuracağız sonrasında da sensörden yeni veri
geldikçe X, Y ve Z koordinatlarını ayrı ayrı TextBlock'larda
göstereceğiz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ContentGrid</span>"<span style="color: blue;">
</span><span style="color: red;">Grid.Row</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">50</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">116,23,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button1</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">252</span>"<span style="color: blue;"> </span><span
style="color: red;">Click</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button1\_Click</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">57</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">167,139,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">textBlock1</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">144</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">57</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">154,201,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">textBlock2</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">144</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">57</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">137,250,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">textBlock3</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">144</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Tasarım kısmını kabaca bitirdiğimize göre sıra geldi Accelerometer
nesnemizi yakalamaya. Malum telefonlarda bir Accelerometer şart olsa da
sadece bir tane olması gerektiğine dair herhangi bir kural yok. O
nedenle eğer isterseniz sistemdeki tüm Accelerometer'ların bir listesini
**Microsoft.Devices.Sensors.AccelerometerSensor** listesinden
alabilirsiniz. Tabi tüm bunları yapabilmeniz için projenize
Microsoft.Devices.Sensors assembly'sini referans olarak da eklemiş
olmanız gerekiyor.

Eğer tüm liste sizi ilgilendirmiyorsa ve bir anlamda esas sensörü yani
varsayılan Accelerometer'ı almak istiyorsanız hızlıca
**Microsoft.Devices.Sensors.AccelerometerSensor.Default**
diyebilirsiniz.

**[C\#]**

    <span style="color: #2b91af;">AccelerometerSensor</span>
accelerometer;

 

    <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

    {

        accelerometer = <span
style="color: #2b91af;">AccelerometerSensor</span>.Default;

        accelerometer.ReadingChanged += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<<span
style="color: #2b91af;">AccelerometerReadingAsyncEventArgs</span>\>(accelerometer\_ReadingChanged);

        accelerometer.Start();

    }

Kod içerisinde de görebileceğiniz gibi uygulamamızdaki düğmeye basıldığı
anda sistemdeki varsayılan Accelerometer'ı hemen daha önce
tanımladığımız **AccelerometerSensor** tipindeki bir değişkene
aktarıyoruz. Özünde bunu yapmamızın tek bir nedeni. Sensörü dinleme
işlemini başlatmak için **Start** ve bitirmek için de **Stop**
metodlarını kullanabiliyorsunuz. Malum sensöre ileride ulaşıp
durdurabilmek için global bir değişken tanımlamak en mantıklısı. Bunun
haricinde unutmamamız gereken birşey daha var; o da sensörün
**ReadingChanged** event'ine bir listener ataçlamak. Böylece sensörden
yeni data geldiği anda haberdar olabileceğiz.

**[C\#]**

    <span style="color: blue;">void</span>
accelerometer\_ReadingChanged(<span style="color: blue;">object</span>
sender, <span
style="color: #2b91af;">AccelerometerReadingAsyncEventArgs</span> e)

    {

        Dispatcher.BeginInvoke(() =\> Degisti(e));

    }

 

    <span style="color: blue;">void</span> Degisti(<span
style="color: #2b91af;">AccelerometerReadingAsyncEventArgs</span> e)

    {

        textBlock1.Text = e.Value.Value.X.ToString();

        textBlock2.Text = e.Value.Value.Y.ToString();

        textBlock3.Text = e.Value.Value.Z.ToString();

    }

ReadingChanged eventı başka thread tarafından çalıştırıldığı için
doğrudan UIThread'e ulaşamıyoruz. Bu nedenle Dispathcher üzerinden
metodumuzu çalıştırmamız gerek ki UIThread'de işlem yapabilelim. Tüm bu
süreçte bizim için değerli olan datayı taşıyan ise ReadingChanged'e
gelen argüman parametresi. Söz konusu parametreyi doğrudan UIThread'deki
metodumuza da yolluyoruz ki değerleri alıp ekrana yazabilsin. Son olarak
**Degisti** adındaki metodun içerisinde X, Y ve Z değerlerinin nasıl
alınabildiğini de görebiliyorsunuz.

Artık elimizde sensörün o an için bize gönderdiği koordinat bilgisi var.
Geriye kalan bu bilgilere dayanarak uygulama içerisinde farklı birşeyler
yapmak. Tabi bu noktadan sonrası için makalemie devam edemeyeceğiz :)
Çünkü özünde minik ama kötü bir haberim var. Şu anda MIX ile yayınlanan
Windows Phone 7 CTP'sindeki simülatör sensör desteğine sahip değil :( O
nedenle bu yazdığımız kodların hiçbirini test etme veya uygulama
geliştirme şansımız olmuyor. Yine de şöyle bir bakış atmış ve olayın
nihai manzarada da ne kadar kolay olabileceğine dair fikir edinmiş
olduk.

Hepinize kolay gelsin.


