---
FallbackID: 2712
Title: "Windows Phone 7'de Performans Metrikleri"
date: "2011-9-26"
EntryID: Windows_Phone_7_Performans_Metrikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone, Windows Phone 7
---
# Windows Phone 7'de Performans Metrikleri
Dünkü yazımda [Windows 8 Metro UI'daki performans
metriklerine](http://daron.yondem.com/tr/post/Windows_8_Metro_Performans_Metrikleri)
değinirken metriklerin Windows Phone'dakilere çok benzediğinden
bahsetmiştim. Fakat sonrasında gelen birkaç mail ile anladım ki ben hiç
Windows Phone'daki metriklerden blogumda bahsetmemişim :) O zaman tam
zamanıdır diyerek konuya girelim.

Windows Phone'da performans çok kritik. Artık yazdığınız Silverlight
uygulaması bir bilgisayarda değil donanımı çok daha sınırlı bir
telefonda çalışacağı için çok daha dikkatli bir şekilde ilerlemek
gerekiyor. Bu süreçte bize sağlanan performans metrikleri ciddi şekilde
işimize yarayabilir. Windows 8 Metro UI'dan farklı olarak WP7 tarafında
debug modunda olduğunuz sürece default olarak metrikler sürekli
gösteriliyor.

![Windows Phone 7'de performans
metrikleri.](media/Windows_Phone_7_Performans_Metrikleri/wp7perf.jpg)\
*Windows Phone 7'de performans metrikleri.*

Yukarıdaki görselde WP7 emülatörünü görüyorsunuz. Emülatörde herhangi
bir uygulama çalıştığında sağ üstte performans metriklerini kendini
gösteriyor. Bu metrikleri uygulamanızı cihaz üzerinde debug ettiğinizde
de yine cihaz üzerinde görebilirsiniz. Aslında tüm bu işevselliği
sağlayan App.xaml arkasında duran aşağıdaki kod.

**[C\#]**

      <span style="color:blue;">if</span> (System.Diagnostics.<span
style="color:#2b91af;">Debugger</span>.IsAttached)\
      {\
          <span
style="color:#2b91af;">Application</span>.Current.Host.Settings.EnableFrameRateCounter = <span
style="color:blue;">true</span>;\
      }

Kod uygulamanın debug modunda çalışıp çalışmadığına bakarak
FrameRateCounter'ı Enable edip etmeme kararını veriyor. Şimdi gelin bu
counter'lar içerisindeki rakamların anlamlarına göz atalım.

![WP7'deki Performance
Counter'lar](media/Windows_Phone_7_Performans_Metrikleri/wp7perf2.png)\
*WP7'deki Performance Counter'lar.*

Yukarıdaki görselde her bir sayacın anlamı yazılı olsa da anlamlarından
öte bu sayaçların ne işe yaradıklarını da öğrenmek gerek. İtiraf etmek
gerekirse ben dün[Windows 8 Metro için performans
metrikleri](http://daron.yondem.com/tr/post/Windows_8_Metro_Performans_Metrikleri)yazısını
yazarken tüm bunları anlattığımı düşünüyordum :) Ama anlatmamışım :)
Kısmet bugüneymiş diyelim.

### Composition Thread FPS

WP7'de ve Windows 8 Metro UI'da uygulamalar ilk açıldıkları andan
itibaren iki Thread ile geliyorlar. Bunlardan ilki tabi ki UIThread yani
tüm UI işlemlerinden sorumlu olup sahney bir StackPanel koyduğunuzda
onun pozisyonlandırılmasını ve içindeki nesnelerin konumlandırılmasını
hesaplayan, ayarlayan Thread. UIThread aynı anda biliyorsunuz ki bizim
UIElement'lerle ilgili event listenerlar içerisine yazdığımız kodları da
çalıştırıyor. Yani ayrı bir thread yaratarak oraya almadığınız sürece
bir button'un click'inde yazdığıız kod UIThread'de çalışır. Bu durum
çoğu zaman yoğun işlemler söz konusu olduğunda uygulamaların
UIThread'lerinin arkadaki işlemlere odaklanmışkan UI'ın kendisini yani
User Interface'i yenileyememesi ve bildiğimiz "Not Responding"
durumlarına neden olabiliyor. Çoğu zaman uygulama arayüzlerinin yavaş
olması ve az FPS ile çalışmasının nedenlerinden biri de bu oluyor.

Composition Thread bu konuda UIThread'in yükünü hafifletmek ve bazı
işlemleri otomatik olarak başka bir thread'e çekebilmek adına implemente
edilmiş bir çözüm. UIThread tarafından sahneye yerleştirilmiş nesnelerin
yerleşimleri ile ilgili değişiklik olmaksızın ihtiyaç olunan diğer tüm
bitmap rendering işlemlerini ve hesaplamaları WP7 otomatik olarak
Composition Thread'e atar ve işlemler orada gerçekleşir.

-   Scale transformasyonları
-   Translate transformasyonları
-   Rotate transformasyonları
-   Plane projectionlar
-   Opacity değişiklikleri
-   Kare Maskeleme

Yukarıdaki işlemlerin hepsi otomatik olarak Composition Thread'e atılır.
Burada ufak bir hatırlatma; eğer Scale Transform ekranın yarısından
fazlasana kaplayacak boyutta ise bu işlem UIThread'de tutulur. Çoğu
zaman Composition Thread kullanımı otomatik gerçekleşir fakat özellikle
bir nesnenin olabildiğince CompositionThread'e atılmasını istiyorsanız
basit bir
şekilde[BitmapCaching](http://daron.yondem.com/tr/post/27ca0d6d-2a2d-4c9b-8706-da5c32267213)
kullanabilirsiniz.

Normal şartlarda WP7'de Composition Thread FPS'i 60FPS olur. Bunu 25'in
altına düşürmeye başladığınız anda kullanıcı performans sorunları
hissedecektir. O nedenle bu metriğe dikkat etmekte fayda var.

Bu arada ufak bir not daha. Eğer composition thread'de hiçbir işlem
yapılmıyorsa bu performans metriği geriye sürekli sıfır dönecektir. O
nedenle her sıfır gördüğünüzde hiç frame render edilemiyor gibi bir
korkuya kapılmaya gerek yok :)

### UIThread FPS

Aslında CompositionThread'den bahsederken kısaca UIThread'i de özetlemiş
olduk. Composition Thread'e atılamayan tüm animasyonlar,
pozisyonlandırmalar ve tüm UI işlemleri doğrudan UIThread'de yapılır.
Databinding de bunlara dahil. Önemli olan şey olabildiğince UIThread'i
boşa almak. Yani olabildiğince BitmapCaching ile CompositionThread'e
paslamalar hatta gerektikçe BackgroundWorker'lar ile işlemleri dışarıya
almalar çok kritik.

UIThread FPS miktarının 12'nin altına kesinlikle düşmemesi gerek. Eğer
tutabiliyorsanız 20 üzerind tutmak şart. Bazı durumlardan ne yaparsanız
yapın UIThread'in fpsinin yükselmediğini görebilirsiniz. Bu gibi
durumlarda hemen CompositionThread'in FPS'ine bakın. UIThread aslında
CompositionThread'e verdiği işlemlerin sonucunu da bekleyeceği için
UIThread FPS'i hiçbir zaman CompositionThread FPS'inden yüksek
olamayacaktır.

### Doku Bellek Kullanımı (Texture Memory Usage)

Doku bellek kullanımı aslında çok kritik bir performance metriği değil.
Eğer uygulamanız ile ilgili genel memory sorunları yaşamıyorsanız buraya
bakmanıza da gerek yok. Bu metrik size UIThread tarafından
CompositionThread'e aktarılmış ve ekrana çizilen dokuların bellekteki
toplam boyutunu verecektir. Unutmayın, bu tüm uygulamanın kullandığı
bellek miktarı değil.

### Yüzey Sayacı (Surface Counter) ve Ara Yüzey Sayacı

UIThread tarafından CompositionThread'e aktarılan toplan yüzey sayısını
buradan bulabilirsiniz. UIThread elindeki UIElementleri kendi uygun
gördüğü şekillerde gruplayarak toplu render edilmek üzere
CompositionThread'e gönderir. Composition Thread'e ilk gönderilen yüzey
sayısı "Ara Yüzey Sayacı"nda gözükür. Composition Thread tekrar bu
yüzeyleri birleştirerek son haline getirirken elde ettiği yüzey sayısını
da son olarak "Yüzey Sayacı"na yazar.

Yüzey sayacını takip etmek özellikle elinizdeki elementlerin sayısına
göre karşılaştırmak anlamlı olacaktır. Elinizdeki element sayısından çok
daha düşük yüzey sayılarına sahip olmanız performansı arttıracaktır.

### Ekran Dolgu Sayacı

Geldik en kritik metriklerden birine. Ekran dolgu sayacı size kaç ekran
dolusu piksel render edildiğini söyler. Yani :) 480\*800 pikselimiz
olduğunu düşünürsek bir ekranda eğer ekran dolgu sayacı 2 veriyorsa bu 2
tane 480\*800 lük alan render ediliyor demektir. Peki ekran 480\*800
iken neden daha fazla piksel render edilsin? İşte bunun nedeni aslında
daha önce konuştuğumuz "yüzeylerden" kaynaklanıyor. Nesnelerin farklı
yüzeylere toplanıp toplu işlendikten sonra birleştirilip sahneye
konmaları ve nesne çizilirken oluşturulan piksellerin sonra özellikle
üst üst gelen nesnelerde tekrar üst üste bindirilerek yeni piksellerin
hesaplanması ekran dolgu sayacının yükselmesine neden olabiliyor.

Ekran dolgu sayacının şişiren bir diğer neden ise ekranın dışına da
taşan fakat bir kısmı ekranda gözüktüğü için tamamen yüzey olarak render
edilmek zorunda kalınan büyük nesneler.

Genelde benim tavsiyem bu sayacı 2 ile 2.5 arasında tutmanız. Eğer
3.0'lara yaklaşırsanız zaten uygulamanızın ciddi takıldığını
görebilirsiniz.

Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2011-9-26 tarihinde yayinlanmistir.*
