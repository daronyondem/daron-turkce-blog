---
FallbackID: 1819
Title: Silverlight Uygulamalarında Performans
PublishDate: 10/22/2007
EntryID: Silverlight_Uygulamalarinda_Performans
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 8c2d5f22-af61-4d0d-94e4-dfde28f58027
---
*"Ne zaman Silverlight uygulamaları hazırlamaya başladık da sıra
performansa geldi?"* diyenleriniz olabilir :) Haklısınız, umarım yakında
giriş seviyesi **Silverlight** yazıları da yazabilirim. Aslında bu tür
yazılar yazıyorum ama maalesef şimdilik her ay yayınlanmak üzere
**PC.NET**'e gidiyor yazılar. (Reklam yaptığımın farkındayım:)) Gelin
şimdi konuya dönelim ve Silverlight uygulamaları hazırlarken performans
konusunda yapabileceklerimizi inceleyelim.

**Şeffaf Fon Uygulamaları**

Silverlight animasyonunuza şeffaf bir fon vermek çoğu zaman güzel
görüntüler alabilmek için uygun bir çözüm olacaktır. Böylece web
sayfasının fonunun üzerine oturtulmuş bir animasyon sayfadaki diğer
nesnelerin üstünde olsa da aradaki fark ziyaretçi tarafından algılanmaz.
Tüm bunlara karşın gerekmeyen durumlarda sürekli şeffaf fon kullanmak da
ciddi performans kaybına neden olacaktır. O nedenle herhangi bir
Silverlight animasyonunuzun fonunu şeffafa değiştirirken tekrar
düşünmekte fayda var.

**Animasyonlarınız için StoryBoard kullanın.**

Hem Silverlight hem de WPF Windows Uygulamalarında animasyonlar
StoryBoard'lar aracılığı ile yapılır. Storyboard'lar ile hedef bir
nesnenin Double, Point veya Color tipindeki değerlerinin başlangıç ve
son değerleri ayarlanarak aradaki animasyonun otomatik yaratılması
sağlanır. StoryBoard'lar yerine JavaScript ile döngülerle nesnelerin
özellikleri üzerinde oynayarak animasyonlar yaratmak ciddi performans
kaybı yaratacaktır. Aman dikkat diyorum.

**Metinlerin Animasyonları**

Metinleri animasyonlarda kullanırken metin boyutlarını değiştiriyorsanız
ciddi şekilde sistem kaynaklarını tüketiyorsunuz demektir. Metin olarak
düzenlenmiş bir nesneyi herhangi bir animasyon ile büyüttüğünüzde
Silverlight söz konusu metnin güncel büyüklükteki punto değerlerine göre
tekrar oluşturulmasını sonra da netleştirmesini yapacaktır. Yani 10
pikselden 20 piksele büyüyen bir yazı 10 kere tekrar oluşturulacaktır.
Oysa bu tarz metinleri vektörel çizimler olarak Silverlight
animasyonlarınıza eklerseniz böyle bir performans kaybı yaşamazsınız.

**Sihirli Görünmezlik**

Bir nesneyi görünmez yapmak için **Opacity** (Şeffaflık) değerini 0
yapabilirsiniz, ama yapmayın :) Flash'dan alışık olunan bu yapının
yerine Silverlight'da direk nesnelere ait **Visibility** özelliği var.
Bir nesnenin şeffaflığı 0 olsa bile ekranda Silverlight tarafından
oluşturulmaya devam edecektir. Oysa nesne görünmez ise aslında artık
onunla ilgili görsel bir işlem yapılmaması gerekir. Bu durumda söz
konusu nesnenin **Visibility** özelliğini **Collapsed** olarak
ayarlarsanız nesne tamamen ekrandan kalkacak ve hiç sistem kaynaklarını
meşgul etmeyecektir.

**Videolarınızı Yeniden Encode Edin**

Eğer elinizdeki bir videoyu internette yayınlamak istiyorsanız WMV
dosyanızı ufak bir **MediaElement** içerisine yerleştirerek küçültmeyin.
Eğer videonun ufak boyutlarda gösterilmesi gerekiyorsa videonuzu söz
konusu boyutlarda tekrar encode edin ve uygulamanızda orijinal
boyutlarıyla gösterin. Gerçek zamanlı boyutlandırma video dosyaları için
gereğinden fazla sistem kaynağı tüketecektir. Diğer yandan ufak
boyutlarda bir video dosya boyutu olarak da ufalacağı için sunucu ve
istemci arası veri trafiğinde de kara geçmiş olursunuz.

**Yoğun JavaScript İşlemlerine Dikkat**

Eğer bir JavaScript fonksiyonunuz ile uzun sürecek bazı işlemler serisi
yaptıracaksınız bu seriyi ufak parçalara bölerek sırayla yaptırın.
JavaScript arka planda çalışırken **Silverlight** animasyonlarının devam
etmesi zor olacaktır ve performans düşüşü yaşanacaktır. Eğer işlemleri
bölerek sırayla yaptırırsanız Silverlight'a animasyonlarıyla devam etme
şansı tanımış olursunuz.

Hepinize kolay gelsin.


