---
FallbackID: 2266
Title: "Silverlight 2.0 ve Adaptive Streaming"
date: "2008-12-5"
EntryID: Silverlight_2_0_ve_Adaptive_Streaming
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 01ff6ad5-3fc2-42ec-bd7d-1149b3ce29fe
---
# Silverlight 2.0 ve Adaptive Streaming
Silverlight dünyasında 1.0 sürümü ile başlayan video uygulamalarındaki
yüksek performans gibi avantajların yenileri 2.0 sürümünde de tabi ki
devam ediyor. Bu yenilikler arasında en ilginçlerinden biri **Adaptive
Streaming**. Bugün internet ortamında video yayını dediğimizde en büyük
sorunlarımızdan biri farklı bant genişliklerine hitap edebilecek içeriği
oluşturmak. Maalesef ülkemizde 1 MBit bağlantıyı baz alarak ilerlemek
zorunda kalsak da aslında 4 MBit'e kadar ADSL hatlarının kullananların
sayısı hiç de az değil. Peki tüm bu kullanıcılara en uygun kalitede
video yayınını nasıl yapabiliriz?

**Farklı bant genişliklerine farklı kalitelerde video yayını!**

Bu hiç de yabancı olduğumuz bir çözüm değil. Elimizdeki video dosyasını
farklı bitrate'lerde encode ederiz ve kullanıcılara sitemize
girdiklerinde farklı seçenekler sunarız. Her kullanıcı kendi
bağlantısına göre istediği kaliteyi seçer. Peki ya videoyu seyrederken
bant genişliğinde değişiklikler olursa? Varsayalım ki kullanıcımız
paylaşımlı internet bulunan bir ortamda ve kişisel olarak elde ettiği
bant genişliği değişebiliyor. Bu durumda ne yapacağız? Tabi ki
"Yükleniyor." mesajları göstereceğiz, yapacak pek bir şey yok! Aslında
var!

**Adaptive Streaming! Bırakın yayın akışı bant genişliğine uysun!**

Silverlight 2.0 ile beraber kullanabildiğimiz Adaptive Streaming
teknikleri ile artık videonuzun kalitesi ile kullanıcının bant genişliği
arasında ilişki ile ilgilenmeniz gerekmiyor. Adaptive Streaming otomatik
olarak kullanıcının bant genişliğini algılayarak uygun kalitedeki video
dosyasının sunucudan çekiyor. Hatta bunu sadece video ilk oynatılırken
değil video oynatıldığı sürece yapıyor! Böylece videoyu başta kaliteli
bir şekilde izleyen bir kullanıcının bant genişliği düştüğünde video
duracağına ve "yükleniyor" mesajları gösterileceğine videonun daha düşük
kaliteli sürümlerine otomatik geçiş yapılıyor. Tabi ki bu geçişlerin
hepsi otomatik olduğu üzere video duraksamıyor ve kullanıcılarımız
hiçbir şey hissetmiyor. Peki tüm bunlar için biz ne mi yapıyoruz? Hmm
bir kaç düğmeye tıklamak.

**Expression Encoder 2 SP 1 ile gelenler!**

Adaptive Streaming için video içeriği hazırlamanın birkaç yolu var.
Aslında ilki oturup gerekli dosyaları tek tek encode ederek gerekli
manifest XML dosyalarını da elle hazırlamak. Fakat bu zahmete girmek
yerine doğrudan Expression Encoder 2'yi de kullanabilirsiniz. SP1 ile
beraber Expression Encoder'a gerekli Adaptive Streaming şablonları da
eklendi.

![Adaptive Streaming için
seçenekler.](media/Silverlight_2_0_ve_Adaptive_Streaming/04122008_1.png)\
*Adaptive Streaming için seçenekler.*

Video profili olarak "Adaptive Streaming"i seçtiğinizde varsayılan
ayarları ile dört farklı kalitede videonun encode edilmesi
sağlanacaktır. İsterseniz ek kalite sekmeleri tanımlayabilir veya var
olanları değiştirebilirsiniz. Tüm bu ayarları tamamladıktan sonra sıra
geliyor Adaptive Streaming için hangi altyapıyı kullanacağınıza.

![Adaptive Streaming için ne
kullanalım?](media/Silverlight_2_0_ve_Adaptive_Streaming/04122008_2.png)\
*Adaptive Streaming için ne kullanalım?*

Adaptive Streaming ile yayın yapmanın birkaç yolu var ama bunların
öncesinden şu ufak detaylardan bahsedelim. Adaptive Streaming sadece
HTTP üzerinden çalışıyor. Zaten Silverlight'ın MMS üzerinden de HTTP
protokolü ile çalıştığını biliyoruz. O nedenle pek bir değişiklik yok
fakat ek olarak burada yarattığımız tüm video dosyalarının doğrudan HTTP
üzerinden yayınlanması gerektiğini hatırlatmak isterim. Yani dosyalar
IIS gibi bir web sunucusunu üzerinden sunulmalı.

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere Expression
Encoder bizden bir seçim daha yapmamızı istiyor. "Output Mode" olarak
kastedilen aslında Adaptive Streaming için dosyaların ve Manifest'lerin
nasıl hazırlanması gerektiği ile ilgili. Eğer "IIS Smooth Streaming"i
işaretlerseniz manifest harici bir XML olarak tutuluyor. "ASF" seçeneği
ise duruma göre tek bir dosyada tüm farklı streamleri ve manifesti veya
her stream için bir dosya ve dahili manifestleri oluşturuyor.

Ama tüm bunları kullanabilene kadar yaklaşık bir altı ay kadar
beklemeniz gerekecek :) Bunun nedeni "Smooth Streaming" için IIS
tarafında yüklü olması gereken HTTP Handler'ların daha Microsoft
tarafından yayınlanmamış olması. "Smooth Streaming" handlerlarının
2009'un ilk çeyreğinde yayınlanması bekleniyor. Tabi MS'ten önce bu
konuda başka bir sunucu altyapısı için kendi HTTP Handler'ını yazan
olmaz ise :) sonuçta kodlar açık.

**Peki ne yapacak Smooth Streaming?**

IIS tarafında çalışacak olan Smooth Streaming altyapısını şu an
<http://www.smoothhd.com/> adresinden test edebilirsiniz. Tabi gerçekten
HD kalitesine ulaşabilmek için bağlantınızın kuvvetli olması şart aksi
halde sistem düşük kaliteye otomatik olarak geçecektir.

Smooth Streaming sunucu tarafında video dosyalarını tamamen istek
üzerine parçalara bölerek istemciye gönderiyor. Bu parçaları ayrı ayrı
2, 3 saniyelik video dosyaları olarak düşünebilirsiniz. Bu parçalama
sistemi sayesinde internetin doğasında yer alan proxy ve cache
mekanizmalarından otomatik olarak video içerikleri de faydalanmış
oluyor.

İstemci tarafındaki tüm işlemler ise
[MediaStreamSource](http://msdn.microsoft.com/en-us/library/system.windows.media.mediastreamsource(VS.95).aspx)
sınıfı ile hallediliyor. Bu sınıf ile gelen videodan kaç karenin eksik
olduğu ve saniyede kaç karenin mevcut internet hattı üzerinden
alınabildiği gerçek zamanlı olarak kontrol edilerek kaynak değişimi
yapılabiliyor. Tüm bu işlemleri yapacak olan kodları ayrı bir
AdaptiveStream sınıfı olarak Expression Encoder 2 SP1 ile beraber gelen
Silverlight 2 video oynatıcılarına dahil edilmiş durumda. İsterseniz
haricen bu sınıfları alıp kendi yarattığınız uygulamalara da
ekleyebilirsiniz.

Şimdilik bu kadar, IIS 7 için "Smooth Streaming" yayınlandığında işin
sunucu tarafına da ayrı bir yazıda değineceğiz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-12-5 tarihinde yayinlanmistir.*
