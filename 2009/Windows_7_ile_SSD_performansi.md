---
FallbackID: 2420
Title: "Windows 7 ile SSD performansı!"
date: "2009-10-3"
EntryID: Windows_7_ile_SSD_performansi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows 7
old.EntryID: dae35c7f-573a-41b1-83d4-987a51947944
---
Bugün sizlerle ilginç bir yazı paylaşacağım. Bundan yıllar önce :)
darkhardware.com'da [donanım
incelemeleri](http://www.darkhardware.com/st.php?u=reviews/asus-52xwriter)
yazardım. O yıllardan bu yıllara donanımdan iyice uzaklaştım diyebilirim
fakat tabi ki bir bilgisayar kullanıcısı ne kadar uzaklaşabilirse ben de
o kadar uzaklaşabildim. Tüm bunların bugünkü yazımla alakası ise bu
yazıda kısmen bir donanım incelemesi ile karşınıza çıkacam olmam.

**SSD Dünyası!**

Solid State Disk olarak bir süre önce duymaya başladığımız yeni bir
sabit disk tipi çok ilgi çekici bir şekilde ilerliyor. Mekanik herhangi
bir parçası olmayan bu diskleri kabaca bilgisayarınıza sokulmuş USB
hafıza kartları olarak düşünebilirsiniz. Durum böyle olunca tabi hem
fiziksel hareketin yavaşlığından kurtulmak hem de bu hareket için
gerekli enerjiyi harcamaktan kurtulmak mümkün. Standart SATA arabimini
kullanan bu güzel disklerden birini bundan yaklaşık iki ay önce paraya
kıyarak edindim. Bu yazıda da sizlerle deneyimlerini paylaşacağım.

**Daha uzun pil ömrü!**

Windows 7'nin de RTM olduğu döneme gelen bu upgrade senaryomda Windows 7
ile beraber laptop'umun pil ömrü yarım saat kadar artmıştı ki buna bir
de SSD'nin katkısı gelince ortaya 1.5 saatlik bir fark çıktı. Tüm güç
ayarlarını uygun şekilde yapıp hayati olmayan herşeyi kapatınca SSD ile
1 saatlik ekstra pil ömrü kazandım. Sanırım bu durum normal bir sabit
diske göre ısınma anlamında da katkısını gösterdi ki artık AMD işlemcili
laptopum (en azından) biraz daha soğuk.

**Hız! Aslında herşey hız!**

Aslında bir SSD satın almanın tek nedeni ekstra hız oluyor. Özellikle
developer gözü ile bakarsak aslında biz sürekli olarak ufak dosyaları
editleyen, yaratan kullanıcılarız. Düşünün VB, HTML vs kodlarını
yazdığınız dosyaların büyüklüğü hiç MB'ları buluyor mu? Tam aksine
genelde 1-20 KB arası gidip gelirler hatta çoğunluğu 2-8 KB arasındadır.
Durum böyle olunca ufak dosyalarla çalışabiliyor olmak ve en ufak Visual
Studio solution'unda bile 20-30 tane 3KB'lık dosyayı hızlıca açabilmek
ve bunları compile edebilmek çok önemli. Bu senaryoda SSD'ler bakalım
işe yarıyor mu?

![Testler
ortada!](media/Windows_7_ile_SSD_performansi/02102009_1.jpg)

Sanırım testler herşeyi gösteriyor. Sol tarafta klasik bir laptop diski
olarak 5400 devirlik bir disk görebilirsiniz. Hemen ortada ise 7200
devir ile laptoplarda aslında ısı sorunları yaratan fakat developerın
tek çaresi olan diske de baktığımızda aslında 4K dosya transferinde pek
bir fark olmadığını görüyoruz. Hatta şansa 5400 rpm 4K'da dosya yazarken
daha hızlı çıkmış. Oysa SSD tarafına geçtiğimizde ortada alenen belli
performans artışı var. Büyük dosyaları geçip yine 4K'lık dosyalara
baktığımızda 100 kata yakın performans farkı görülebiliyor.

Bu performans farkı Windows'un gelen açılışından tutun Visual Studio'nun
açılışına kadar herşeyi etkiliyor. Fakat SSD kullanırken ve satın
alırken dikkat edilmesi gereken bazı noktalar var.

**SSD kullanırken nelere dikkat etmeli?**

Birincisi en önemli tavsiye aslında Windows 7 kullanmak. Çünkü şu anda
SSD'leri tanıyarak ona uygun performans optimizasyonlarını otomatik
yapabilen tek işletim sistemi Windows 7. O nedenle mümkünse hemen
Windows 7'ye geçmek çoğu sorununuzu çözebilir. Bunlardan ilki Windows
7'nin TRIM özelliği. SSD'lerin iç yapılarına ve veriyi saklama
şekillerine pek girmeyeceğim fakat bilinmesi gereken ufak bir senaryo
var. Diyelim ki elinizde SSD'de yazılı bir dosya var ve bunda değişiklik
yaptınız. SSD'lerin gelen işleyiş şeklinde bu dosya eski yazıldığı
yerden alınır, değişiklik yapılır ve yepyeni bir yere yazılır! Eski yer
ise öyle kalır! Taaa ki diskteki boş yer bitene kadar. Tabi burada "boş
yer" derken fiziksel boş yerden bahsediyorum. Aslında dosyanın eski yeri
"boş" olarak işaretlenmiştir fakat boş değildir. Durum böyle olunca disk
tamamen bir kere kullanıldığında sonraki işlemlerde yavaşlamaya başlar
çünkü artık "boş" yer kalmamış ve eskiden veri bulunan "boş" olarak
işaretlenen yerler kullanılacaktır. Eh bu yerler kullanılırken ilk önce
gerçekten silinmeli sonra yeni veri yazılmalıdır. Bu durum diskin bir
süre sonra yavaşlamasına neden olur. TRIM işlemi diskteki "boş" olarak
işaretlenmiş yerlerin gerçekten boşaltılması anlamına gelir. Bu işlem
(SSD Firmware'i destekliyorsa) Windows 7 tarafından otomatik yapılır.
Bazı SSD üreticileri ayrı TRIM programları veriyorlar ve onları belirli
aralıklarla bilgisayarınızda çalıştırmanız gerekiyor.

-Windows Disk Caching'i kapatın. Artık ihtiyacınız yok.\
-Dosyalara son ulaşılma tarihini kaydetmeyi kapatın! (fsutil behavior
set disablelastaccess 1) İhtiyacınız varsa açık kalabilir fakat gerek
yoksa kapatın gitsin.\
-Superfetch'i kapatın! (Windows 7'de default kapanır)\
-Background Defrag'ı kapatın! Random accesste artık fiziksel hareket yok
ne gerek var defraga! (Windows 7'de default kapanır)\
-ReadyBoost kapatın! (Windows 7'de default kapanır)

**SSD alırken nelere dikkat etmeli?**

Tabi önce bir fiyatına dikkat etmeli :) Sonra kasadan dönmemekte fayda
var. Hala epey tuzlu rakamlarla satılıyor ve eğer bir SSD sahibi
olacaksanız elinizdeki 500GB'lık 5400 rpm'den vaz geçip belki de 64 GB'a
geçmeyi göze almalısınız çünkü yüksek kapasitedeki SSD'ler daha da
yüksek fiyatlarla geliyor.

Kapasitesi aynı olup arasında büyük fiyat varkı olan SSD'ler bulmanız da
olası. Bu SSD'lerin arasında en önemli fark genelde SLC (Single Level
Cell) ve MLC (Multi Level Cell) kullanmaları oluyor. MLC'ler genelde
daha ucuz, yüksek kapasiteli ve büyük veri yığınlarını saklamakta
iyiyken SLC'ler ise daha pahalı ve veri yazmada daha hızlıdır. Ayrıca
SLC'ler fiziksel anlamda da daha dayanıklı disklerdir ve daha az enerji
tüketirler. Daha teknik detaya girmek gerekirse SCL'ler her bir cell'de
1 veya 0 şeklinde iki değer (1bit) saklanabilirken, MLC'lerde 00, 01,
10, 11 gibi dört durum (2bit) saklanabilir. Cell'lerde veriler
elektriksel olarak saklandığında göre bu durum farklılıkları ancak
elektriksek yük farkları ile oluşturulabilir ve durumlar arasında
farklar MLC'lerde daha az tutularak 4 durum yaratılır oysa bu fark 2
durum oluşturulurken çok daha yüksektir. Bu nedenle SLC'ler daha güvenli
ve hızlıyken MLC'lerde bir veriyi okumak için daha yoğun işlem yapılması
gerekir. Unutmadan; MLC disklerin ömrü de genelde 10 kat daha kısa olur.

Bu kadar kötü konuştuktan sonra gerçeği de söylemek gerek sanırım :)
Açıkçası ben MLC aldım :) Belki ileride SLC'ye geçiş yaparım. Yukarıdaki
SSD testinde kullanılan da malum MLC bir disktir.

Hepinize kolay gelsin!


