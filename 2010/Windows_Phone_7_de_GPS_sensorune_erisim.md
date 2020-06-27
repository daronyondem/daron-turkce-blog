---
FallbackID: 2526
Title: "Windows Phone 7'de GPS sensörüne erişim."
date: "2010-5-13"
EntryID: Windows_Phone_7_de_GPS_sensorune_erisim
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone 7, Windows Phone
old.EntryID: ec8facbd-6ae8-4547-ba12-211dc5ad9fcd
---
# Windows Phone 7'de GPS sensörüne erişim.
GPS sensörleri gün geçtikçe her yerde karşımıza çıkıyor. Kişisel olarak
konuşmam gerekirse bir cep telefonu satın alırken GPS sensörüne sahip
olması benim için satın alma kararımda çok önemli bir kriter. Özellikle
harita uygulamalarına özgüymüş gibi düşünsek de aslında çoğu uygulamanın
farklı şekilde kullanıcızı fiziksel konumuna ait bilgiyi kullanma şansı
olabilir. En basit örnek olarak bir çeviri uygulaması düşünün
İngilizceden Türkçe'ye çeviri yapıyor. Bu uygulama benim Fransa'da
olduğumu anlasa ve hemen Fransızca'dan çeviri moduna geçse hoş olmaz mı?
Tabi ki tüm bunların ayarlanabilir olması şart fakat bu tarz
işlevsellikler uygulamalara eklenebilmesi için en önemli nokta uygulama
geliştiriciler için donanımdan bağımsız kod yazma olanağı yaratmak.

Windows Phone 7 cihazlarında GPS sensörü bulunması şart. O nedenle
uygulama geliştirirken her şekilde bir GPS sensörüne sahip olduğunuzu
düşünebilirsiniz. Diğer yandan özünde bir kullanıcının dünya üzerindeki
yerini tespit ederken ne kadar detaya ihtiyacınız olduğuna da karar
vermelisiniz. Eğer benim bir önceki örneğimde bahsettiğim gibi sadece
hangi ülkede bulunduğu sizin için önemli ise belki de bu bilgiyi
doğrudan telefonun sinyal aldığı GSM servisi üzerinden alabilirsiniz.
Eğer çok ciddi detaya ihtiyacınız varsa tabi ki GPS sensörünü
çalıştırmanız gerekecektir. Hatta GPS konusunda da uydu pozisyonları ile
ilgili ek verilerin indirilmesi için Wi-Fi veya 3G üzerinden internete
çıkıp global veritabanlarından veri almanız gerekebilir. Tüm bunların
hepsini Windows Phone 7 bizim yerimize yapıyor ve en önemlisi ise bize
edinmek istediğimiz verinin ne kadar detaylı olması gerektiğine dair
karar verme şansı tanıyor. Böylece belki de çok detaya ihtiyacınız
olmayan bir senaryoda GPS sensörünü çalıştırmadan (kaynak tüketmeden)
ilerleyebiliriz.

**Başlayalım...**

WP7'de Location API kullanabilmek için projenize ilk aşamada
**System.Device.Location** DLL'ini referans almanız gerekiyor.
Sonrasında aşağıdaki gibi uygulama ekranımızı tasarlayıp sensörümüze
ulaşmaya başlayabiliriz.

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

<span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Her zamanki gibi demo amaçlı olarak uygulama ekranına iki TextBlock ve
bir de Button koyduk. Amacımız düğmeye basıldığında sensöre ulaşıp
aldığımız koordinat bilgilerini de iki TextBlock üzerinde göstermek.

**[C\#]**

    <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

    {

        <span style="color: #2b91af;">GeoCoordinateWatcher</span>
Pozisyon = <span style="color: blue;">new</span> <span
style="color: #2b91af;">GeoCoordinateWatcher</span>(GeoPositionAccuracy.High);

        Pozisyon.MovementThreshold = 15;

        Pozisyon.PositionChanged += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<<span
style="color: #2b91af;">GeoPositionChangedEventArgs</span>\<GeoCoordinate\>\>(Pozisyon\_PositionChanged);

        Pozisyon.Start();

    }

Uygulama içerisindeki düğmeye tıklandığı anda yeni bir
GeoCoordinateWatcher nesnesi yaratıyoruz. Constructor'a bir parametre
ile beraber gittiğimiz dikkatinizi çekmiştir. İşte buradaki parametre
bizim istediğimiz lokasyon bilgisinin hassasiyeti ile ilgili. Eğer GPS
sensörü kullanılsın istiyorsanız **High**, yok sadece GSM üzerinden
lokasyon alınsın istiyorsanız **Low** seçeneklerini kullanabilirsiniz.
İkinci adımda **MovementThreshold** adında ek bir parametremiz daha var.
Malum GPS cihazları (özellikle antensiz ve telefon içerisinde olanlar)
çok hassas cihazlar ve ufak hatalar yapabiliyorlar. Örneğin siz sabit
dursanız da sizi hareket ediyormuş gibi gösterebilirler. Bunu kısmen
engellemek için bir "paraziti engelleme" parametresi belirliyoruz :)
Aslında bu parametre ile belirli bir miktarın altındaki koordinat
değişikliklerin raporlanmamasını sağlamış oluyoruz. Böylece gerçeken
bizim "umursadığımız" bir değişiklik olduğunda bize rapor geliyor.

Bir sonraki adımda GPS sensöründen yeni veri geldiğinde haberdar olmak
için kullanacağımız event listener'ımızı **GeoCoordinateWatcher'ın**
**PositionChanged** eventine bağlıyoruz. Son olarak da bilgi alma
işlemini yani sensörü dinleme işlemini başlatıyoruz.

**[C\#]**

    <span style="color: blue;">void</span>
Pozisyon\_PositionChanged(<span style="color: blue;">object</span>
sender, <span
style="color: #2b91af;">GeoPositionChangedEventArgs</span>\<GeoCoordinate\>
e)

    {

        Dispatcher.BeginInvoke(() =\> Degisti(e));

    }

Pozisyon değişikliğini dinleyen listener'ımız beraberinde argümanı ile
geliyor ve söz konusu argüman içerisinde bizim istediğimiz tüm bilgiler
mevcut. Diğer yandan bu event başka bir thread tarafından çalıştırıldığı
için yine UIThread'i bilgi aktarmak için Dispatcher üzerinden ayrı bir
metod çağırıyoruz.

**[C\#]**

    <span style="color: blue;">void</span> Degisti(<span
style="color: #2b91af;">GeoPositionChangedEventArgs</span>\<GeoCoordinate\>
e)

    {

        textBlock1.Text = e.Position.Location.Latitude.ToString();

        textBlock2.Text = e.Position.Location.Longitude.ToString();

    }

Argümanımızı artık UIThread'e kadar aldık. Geriye eldeki parametreleri
ekrana yazmak kaldı. Tabi siz farklı uygulamalarda bu parametreleri
farklı şekillerde kullanabilirsiniz. Kötü haber ise MIX ile beraber
gelen emülatörün GPS simülasyonu yapamaması. O nedenle bu gibi
uygulamalar geliştirirken kendi sallama değerlerinizi yaratan bir sınıf
kullanmanız çok daha mantıklı olabilir. Son noktada da gördüğünüz üzere
Location implementasyonu rahatlıkla yapılabilir.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2010-5-13 tarihinde yayinlanmistir.*
