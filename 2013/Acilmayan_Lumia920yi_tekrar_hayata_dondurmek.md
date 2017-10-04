---
FallbackID: 2836
Title: Açılmayan Lumia920'yi tekrar hayata döndürmek
PublishDate: 9/2/2013
EntryID: Acilmayan_Lumia920yi_tekrar_hayata_dondurmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone, Windows Phone 8
---
Bundan bir süre önce Lumia920'mim saçmalamaya başlamıştı ve bende çözüm
arayışı içerisinde telefona bir reset atmıştım. Reset atmamla beraber
telefon boot olmamaya başladı. İlk açılışta "Nokia" logosu geliyor ve
orada takılıyordu. Ne denediysem olmadı, olamadı... Ben de bıraktım.

Bugün probleme tekrar yoğunlaştım ve biraz daha derinden daldım.
Telefonu tekrar imajlamak gerektiği belliydi. O nedenle araştırmalarıma
başladım, birkaç yerde tökezledim ama sonuç başarılı Lumia920 artık
hayata geri döndü. Peki yolda neler yaptım? Başıma neler geldi? İşte bu
blog post Lumia920'yi hayata döndürme maceramı içeriyor :)

### WPCentral'da hayat kurtarır...

Ne zaman bir telefonla ilgili böyle bir "kurtarma operasyonuna" girişsem
her zaman çözümü WPCentral'da bulmuşumdur. Bu sefer de öyle oldu.
Aşağıdaki adresteki makale aslında maceranın büyük kısmını ve yapılması
gerekenleri anlatıyor.

<http://forums.wpcentral.com/nokia-lumia-920/203979-fix-bricked-920s-after-reset-flash-process-defined-inside.html>

### Peki neler yapıyoruz?

İlk olarak[NaviFirmPlus 1.7](http://www.filedropper.com/navifirmplus17)
ve[Nokia Care Suite
5](http://www.filedropper.com/nokiacaresuite5020124545)'i indirmek
gerekiyor. Linkleri doğrudan yukarıdaki adresten aldım. Aslında her iki
uygulamaya da gerek var mı pek emin değilim. Birazdan yolda başıma
gelenleri anlatırım :)

NaviFirm'i indirdikten sonra çalıştırın karşınıza aşağıdaki gibi bir
manzara gelecek. Uygun Lumia920 modelini bulmanız işin en dertli tarafı
zaten. Benim Lumia920 Build konferansında hediye edildiği için ben
cihazın ne model olduğunu falan bilmiyordum ve hala da bilmiyorum :)
Kendimce "Developer Device" diyerek o imajı seçtim ve çalışmadı :) Artık
size de iyi şanslar diliyorum. Ama unutmadan, o listede Turkcell
imajları vs gördüm ben. Şimdiden söylemesi, eğer Türkiye'den aldıysanız
işiniz kolay olabilir.

![NaviFirm Plus'da cihaz imajını
ararken.](http://cdn.daron.yondem.com/assets/2836/lumia_1.png)\
*NaviFirm Plus'da cihaz imajını ararken.*

Son noktada tüm seçimleri yapınca uygulamada sağda bir dosya listesi
oluşacak. Hepsini seçip "**Download**"a basıyorsunuz. Toplam 1 GB'lık
bir downloaddan bahsediyoruz. İşlem bitince indirdiğiniz tüm dosyaları
alıp bilgisayarınızda
**"C:\\ProgramData\\Nokia\\Packages\\Products\\rm-820\\"** klasörüne
kopyalamanız gerek. Eğer dosya yolunda var olmayan klasörler varsa bire
bir aynı dosya yolunu oluşturacak şekilde klasörleri de yaratın. Zaten
eğer Nokia Suite'i yüklediyseniz Packages klasörüne kadar tüm
klasörlerin var olması gerek.

Şimdi sıra geldi bu imajı Nokia Care Suite ile açmaya. Care Suite'in
yüklendiği yerde "**Product Support Tool for Store 5**" diye bir
uygulama var. Uygulamayı açıp "**File / Open Product**" diyip
"**RM-820**"'yi seçmeniz gerekiyor. Sonrasında alt soldan "**Programming
/ Recovery**" demelisiniz. Son olarak "Start" diyerek işlemi
başlatıyorsunuz.

İşte bu noktada hafiften işler karıştı bende çünkü "Product Code does
not match" diyerek güzel bir hata aldım ve indirdiğim imajın yanlış
olduğunu anladım. Hemen Nokia Care Suite'deki "**Find Online**"
düğmesini kullanarak yeni bir image daha indirdim :) Bu sefer şansımı
AT&T'den yana kullandım. Malum cihazı amerikadan aldığım için belki uyar
diye düşümdüm ki tutturmuşum.

![Nokia Care Suite ile image
download.](http://cdn.daron.yondem.com/assets/2836/lumia_3.png)\
*Nokia Care Suite ile image download.*

Ben tekrardan yeni imajı indirerek devam ettim. İşlemi tamamlamak için
telefonun ses azaltma düğmesi ile açma düğmesini basılı tutmanız
gerekiyor. Telefon titreyince "Start"a basın ve düğmeleri de bırakıp
hemen bu sefer de ses yükseltme tuşunu basılı tutmaya başlayın.

![Yeni image load olurken Lumia920'nin kırmızı
hali...](http://cdn.daron.yondem.com/assets/2836/lumia_4.jpg)\
*Yeni image load olurken Lumia920'nin kırmızı hali...*

Ekranda gözüken Nokia logosu yukarıya doğru çıkacak ve sonrasında da
Image yüklenirken yukarıdaki fotoğrafta da görebileceğiniz üzere telefon
kırmızı bir ekran açarak yükleme sürecini gösterecek.

İşte bu kadar... önemli olan doğru imajı seçebilmiş olmak. Bende biraz
zor oldu o kısım :) Nitekim Nokia Care Suite içerisinden image download
edilebilirken neden NavSuite'i kullanalım onu da anlamış değilim ama
sanırım bir farklılık var ki ben Nokia Care Suite'de Turkcell sürümü
cihazın imajınıı göremedim oysa NaviFirm'de vardı. Yani özetle bence siz
de aynı yoldan gidin ve farklı maceralarınız olursa aşağıya yorum
bırakmaktan da çekinmeyin.

Görüşmek üzere.


