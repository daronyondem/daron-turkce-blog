---
FallbackID: 2849
Title: Build 2013 Gün 1 Özeti
PublishDate: 6/27/2013
EntryID: Build_2013_Gun_1_Ozeti
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Studio 2013, Windows 8, Windows 8.1, Windows Azure, Windows Phone
---
Son birkaç gündür Build 2013 konferansı için San Francisco'dayım.
Moscone Center adında bir konferans alanında gerçekleşen konferansın
bugün ilk Keynote'u tamamlandı. Geçen sene de hatırlarsanız [Build
2012](http://daron.yondem.com/tr/search/Build) için özetleri sizlerle
paylaşmıştım. Şimdi de geldi sıra **Build 2013**'e. Bugün keynote'da
birçok şey duyuruldu. Gelin tek tek başlayalım neler çıkmış, neler olmuş
bir bakalım.

![Build 2013, San Francisco, Moscone
Center](http://cdn.daron.yondem.com/assets/2849/moscone_center.jpg)\
*Build 2013, San Francisco, Moscone Center*

### Visual Studio 2012 Update 3

İlk olarak Visual Studio 2012 Update 3 çıktı. Windows 8.1 desteğinin
yanı sıra Visual Studio 2012 ile 2013 arasında proje paylaşımı desteği
de Update 3 ile beraber geliyor. Gelen diğer yeniliklerin listesine
[buradan](http://support.microsoft.com/kb/2835600) ulaşabilirsiniz.
Download için de hemen
[buradan](http://go.microsoft.com/fwlink/?LinkID=290979)
ilerleyebilirsiniz.

### Windows 8.1 Preview

Esas büyük haber Windows 8.1'in Preview'unun çıkmış olması. Buradaki
yenilikleri saymak gerçekten zor çünkü minör bir versyon için 8.1'de
gerçekten çok değişiklik ve yenilik var. En basitleri ve en dikkat
çekenleri arasında "Start" düğmesinin geri gelmesi var :) Aynı şekilde
bir de "Boot to Desktop" ile doğrudan Start menü yerine makinelerin
desktop'a boot olmasını sağlayan özellik öne çıkanlar arasında. Bu iki
özelliğin de eskiye dönüş niteliğinde olması manidar. İşin güzel tarafı
Metro UI ile yani yeni Start menü ile bu özellikler güzel bir şekilde
birleştirilmiş gözüküyor.

![Windows 8.1 Beta
Balığı](http://cdn.daron.yondem.com/assets/2849/win81_betafish.jpg)\
*Windows 8.1 Beta Balığı*

Benim favori Windows 8.1 özelliğim **multi-monitor DPI scaling**.
Özellikle Macbook'taki Retina gibi yüksek çözünürlüklü ekranlar arttıkça
bu tip ekranlara ahip laptopları harici ekranlara bağladığınızda ciddi
sıkıntılar oluyordu. Yüksek çözünürlükte yüksek DPI scaling kullanmak
gerekirken düşükte ise düşük kullanmak gerekiyor. Oysa Windows'ta bugüne
kadar sadece tek bir DPI Scaling ayarlanabiliyordu. Windows 8.1 ile
monitör başına ayarlanabilecek. Süper bir gelişme bu!

İkinci favori özelliğim ise "**Hands Free**" özelliği. Bu özelliğin
detayları çok açıklanmış olmasa da Keynote'da demoda bir bilgiayarın
webcami kullanılarak bir uygulama uzaktan el ile kontrol edildi. Bu tabi
ki hemen Kinect'i hatırlatıyor. Belli ki Kinect özelliklerinin yavaş
yavaş gündelik bilgisayarlara taşınması senaryosu gerçek oluyor. Güzel
gelişmeler bunlar, normal PC ve laptoplardaki webcamlerden bu şekilde
API'lar açılırsa çok ilginç uygulamalar geliştirilebilir.

Tabi ki hepsi bu kadar değil. Eğer tüm Windows 8.1 yeniliklerinin bir
listesine ulaşmak isterseniz
[buradan](http://msdn.microsoft.com/en-us/library/windows/apps/bg182410)
ilerleyebilirsiniz.

### 8" Windows Tabletler

Keynote boyunca üzerinde durulan konulardan biri de 8" civarında
boyutlardaki ufak tabletlerdi. Microsoft'un bu tabletleri önümüzdeki
dönemde ekstra önem vereceği belli. Şu an için örnek bir tablet olarak
[Acer'ın Iconia'sı](http://us.acer.com/ac/en/US/content/series/iconiaw3)
gösterildi ve konferansa katılan herkese de birer adet hediye edileceği
duyuruldu.

![8" Windows 8 Pro, Acer
Iconia](http://cdn.daron.yondem.com/assets/2849/acer.jpg)\
*8" Windows 8 Pro, Acer Iconia*

Cihaz gerçekten ilginç bir cihaz. 2G RAM, 64GB SSD ve 1.8GHz Atom
işlemcisi var. Tahmin edebleceğiniz üzere süper performans beklemek
doğru olmaz ama x86 olması üzerine teoride herşeyi yükleyebileceğimiz
anlamına geliyor ki bu ilginç bir durum. Şimdilik en ufak Windows 8
cihazlardan biri Iconia. Dışarıda satış fiyatı 379\$.

### Visual Studio 2013 Preview ve .NET 4.5.1

Konferansın ilk gününde kısmen sessizce duyurulan şeylerden biri de
**Visual Studio 2013 Preview** oldu. Hemen [buradan
download](http://www.microsoft.com/visualstudio/eng/2013-downloads)
edebilirsiniz. Şu anki Preview'ın Go-Live lisansı olsa da tavsiyem prod
makinelere kurmamanız. Test amaçlı sanal makinelere kurulum yapmanız çok
daha sağlıklı olacaktır. Visual Studio 2013 ile ilgili gösterilen
yenilikler arasında dikkatimi çekenler **Energy Consumption Analysis,
WebView kontrolü** yenilikleri ve **Azure Mobile Services** entegrasyonu
oldu. Artık Visual Studio içerisinde bir WinStore uygulamasının ne kadar
enerji tüketeceğini test/analiz edebiliyorsunuz. Cidden süper bir
tooling bu. Azure Mobile Services tarafındaki entegrasyon ise Mobile
Services kullanımını çocuk oyuncağına çevirmiş durumda.

![Visual Studio 2013'te Azure Mobile Services
Entegrasyonu](http://cdn.daron.yondem.com/assets/2849/azure.jpg)\
*Visual Studio 2013'te Azure Mobile Services Entegrasyonu*

Doğrudan Visual Studio içerisinde Mobile Services Endpointi yaratıp
gerekli ayarları da sihirbazlarla yapıp geçebiliyorsunuz :) Belli ki
Microsoft bu işleri mobile developerlar için kolaylaştırma konusuna
kafayı takmış durumda. Sonucu gerçekten çok başarılı olmuş.

![Konferansın Expo/Fuar
Alanı](http://cdn.daron.yondem.com/assets/2849/expo.jpg)\
*Konferansın Expo/Fuar Alanı*

### SurfacePro

Günün sonunda son bir duyuru ile tüm konferans katılımcıların Acer
Iconia'nın yanı sıra birer de SurfacePro hediye etti Microsoft. Artık bu
konferanslardaki hediye olayında ipin ucu kaçmaya başladı gerçekten. Bu
sefer verilen her iki cihaz da piyasada olan ve katılımcıların
ulaşamayacakları şeyler değil. O nedenle bence artık bu hediye olayı
amacından çıkmaya başladı. Eskiden .... ilk PDC'de laptop verildiğinde
içerisinde Accelerometer vs olan bir laptop verilmişti. Amaç Win7 ile
beraber gelen yeni API'ları developerların kullanabilmesiydi ve söz
konusu olanakları sağlayacak laptoplar piyasada yoktu. Oysa şimdi durum
öyle değil. Verilen donanımlar dışarıda, piyasada satılan donanımlar. En
azından şu Iconia'da W8.1 yüklü olsaydı "Neyse..." diyecektim ama o da
yok :) İndirip kendimiz kuracağız.

### Build 2013 Fotoğraflarım

Build 2013'te çektiğim fotoğrafları Flickr'da paylaştım. Makalede
kullanabildiklerim dışında, diğer fotoğraflara da göz atmak isterseniz
hemen aşağıda ;)

<div id="photos_Build_2013_Gun_1_Ozeti"
style="width: 600px; display: block; margin-left: auto;  margin-right: auto;">

[![](http://cdn.daron.yondem.com/assets/2849/9146877167_e1c5ffa424_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9146877167_e1c5ffa424_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9146877555_2196675fbb_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9146877555_2196675fbb_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9146878493_eb5f792841_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9146878493_eb5f792841_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9146878735_6e11f1cbd3_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9146878735_6e11f1cbd3_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149106026_7dcb30a9f9_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149106026_7dcb30a9f9_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149106448_fa77803654_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149106448_fa77803654_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149106980_c6aa655b9b_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149106980_c6aa655b9b_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149107454_47337b297c_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149107454_47337b297c_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149107716_954ee31c22_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149107716_954ee31c22_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149107790_59ab77d26e_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149107790_59ab77d26e_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149107944_2fe2308441_o_1.jpg)
<span>
</span>](http://cdn.daron.yondem.com/assets/2849/9149107944_2fe2308441_o.jpg)
[![](http://cdn.daron.yondem.com/assets/2849/9149108194_a7c83fd69c_o_1.jpg)](http://cdn.daron.yondem.com/assets/2849/9149108194_a7c83fd69c_o.jpg)

</div>

### Teknolot.TV ve Giik.FM Kayıtları

Konferansın ilk günü ile ilgili hem
[Teknolot.TV'de](http://www.teknolot.tv/) hem de
[Giik.FM'de](http://www.giik.fm) kayıtlarımız da mevcut. İster aşağıdan
Build 2013 Gün 1 Değerlendirme videomuzu izleyin, ister Giik.FM'i
ziyaret ederek Podcast'i dinleyin veya isterseniz ikisini de yapın :D
Seçenek bol ;) Kendinize çok iyi bakın. Yarın 2. gün keynote'u sonrasnda
görüşmek üzere.



