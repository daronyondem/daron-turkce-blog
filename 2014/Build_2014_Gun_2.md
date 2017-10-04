---
FallbackID: 2900
Title: Build 2014 Gün 2
PublishDate: 4/4/2014
EntryID: Build_2014_Gun_2
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Mobile Services, Azure Storage Services, SQL Azure, Visual Studio 2013, Windows Azure
---
Dün sizlerle Microsoft Build 2014 konferasının ilk gününden izlenimleri
ve ağırlıklı olarak da [Keynote'dan
haberleri](http://daron.yondem.com/tr/post/Build_2014_Gun_1)
aktarmıştım. Bugün de ikinci güne göz atacağız. Konferans yarın da devam
edecek fakat yarın Keynote bulunmadığı için pek de hakkında yazılacak
bir şey olmuyor zaten. O nedenle bu post özünde Build 2014 için son
yazım olacak :) Başlamadan önce uyariyim, yazıyı okurken canınız
sıkılabilir. Dünkinden farklı olarak bugünün Keynote'u pek de başarılı
değildi.

### Azure tarafından haberler!

İkinci gün Keynote Azure tarafından haberle başladı. Benim özellikle
dikkatimi çekenler 300 Milyon Active Directory kullanıcısı ve 20 Trilyon
Storage Objecsi oldu :) Tabi 1 milyondan fazla sayıda SQL Database host
ediliyor olması da süpermiş. Aslında bu istatistikler hangi hizmetlerin
daha popüler olduğunu da az çok göstermiş oluyor. ACS de fena iş
yapmıyormuş :)

![Azure
İstatistikleri](media/Build_2014_Gun_2/day2_1.jpg)
*Azure İstatistikleri*

Her zaman söylerim eğer bir Keynote'da istatistiklerden bahsediliyorsa
anlatılacak heyecan verici bir şey yok demektir :) Yani benim için
yukarıdaki manzara "Dakika bir, gol bir" anlamını taşıdı. Zaten
Keynote'un geri kalanında da durum aynen tahmin ettiğim gibi oldu.
Biricni güne kıyasla neredeyse heyecan verici ve benim için yeni olan
hiçbir şey ile karşılaşmadım.

![TitanFall Azure'da 100.000 VM
kullanıyor.](media/Build_2014_Gun_2/day2_2.jpg)
*TitanFall Azure'da 100.000 VM kullanıyor.*

Yukarıdaki fotoğraf sanırım paylaşmaya değer :) **100.000 VM**
kullanılıyormuş TitanFall'ın arkasında ve bu VM'ler tamamen Azure'da
bulunuyor. O Subscription'ın billing sayfasını görmek isterdim :) Şaka
bir yana inanılmaz boyutlardan bahsediyoruz ve bu Azure tarafından
baktığınızda sadece bir müşteri. XBOX tarafında bunun gibi birçok ürünün
Azure tarafında çalıştığını biliyorum. Her zaman söylediğim gibi
Microsoft'un kendi ürünlerini kullanıyor olması bizler için de süper bir
avantaj. Bazı sorunları çözmeleri için illa bizim söylememiz gerekmiyor
:)

### IAAS'ta neler var?

Keynote süresince Azure haberlerini kabaca ikiye ayırdılar. IAAS ve PAAS
şeklinde oldu bu ayrım. Çok da mantıklı duruyor zaten. IAAS tarafında
**VM clone'lama** geldi. Hali hazırda var olan bir VM'i alıp Image'ini
yaratıp yeni VM'ler oluşturabiliyorsunuz. Kendi Image'imizi alıp upload
edip VM yaratabiliyorduk ama var olan bir VM'den Image Extract etmek
yeni gelen bir özellik. Bir diğer güzel haber de Remote Debugging'in
IAAS tarafına da gelmesi. VM'inizdeki uygulamayı VM'e Visual Studio
yüklemeye gerek kalmadan uzaktan debug edebiliyorsunuz. Bu tabi ki IAAS
tarafında uygulama host edenler çok işine yarayacak bir yenilik. IAAS
tarafında portalda yapılabilen çoğu işlem Visual Studio içerisine de
taşınmış. Araçlar anlamında ufak da olsa güzel bir yenilik de bu oldu.
IAAS tarafında benim dikkatimi çekenler bunlar oldu. Güzel birkaç
yenilik var ama atla deve değil.

### Peki ya PAAS?

Baştan bir kere şunu söylemem lazım. Micrsoft Cloud işine PAAS
tarafından girdiği için doğal olarak son dönemde IAAS'a odaklanmış
durumdalar. Çünkü esas büyük eksikler ve sektörü yakalama anlamında
büyük yatırımın yapılması gereken yer IAAS tarafı. Ama PAAS tarafından
bahsederken de Keynote boyunca sadece Azure Web Sites'dan bahsetmiş
olmaları bana saçma geldi. Tabi bu noktada şunu sorabilirsiniz "Cloud
Services tarafında ne olabilirdi ki yenilik?" İtiraf etmek gerekirse pek
de birşey gelmiyor aklıma. PAAS'taki Cloud Services konsepti zaten
yeterince kuvvetli.

![Sözüm ona PAAS tarafındaki yenilik
listesi.](media/Build_2014_Gun_2/day2_3.jpg)
*Sözüm ona PAAS tarafındaki yenilik listesi.*

Yukarıdaki liste PAAS tarafında yenilikler diye özetlenen listenin ta
kendisi. Bir kere Slide'ın başlığı "Web Announcements"... İçinde hem
Tooling, hem Framework hem Azure Web Sites yenilikleri beraber
listelenmiş. Eh hangi bir Azure PAAS'tan bahsediyorduk? 2. gün Keynote'u
hep böyle "doldurmaca" içerikle geçti. Duyurulacak çok fazla, doyurucu
içeriğin olmamasından yola çıkarak Azure PAAS derken Web Essentials
anlatıldı. Saçmalığın dik alası!  Diğer yandan Azure Web Sites'da
yenilik diye sıralanan **AutoScale'in GA** olması, **Traffic Manager'a
Web Sites desteği** gelmesi, **WebJobs** vs... bunların hepsi zaten bir
süredir var! Bazıları geçen hafta duyuruldu, bazıları daha da önce.
Microsoft'un Build'in ikinci gününde ciddi bir hataya düştüğünü
düşünüyorum. İleriki parafraglarda daha detaylarına gireceğim ama şunu
unutmamları gerek. Bu konferansa zaten Microsoft'un takip edenler ve
etmek isteyenler geliyor. Bu konferans "Microsoft ne yapıyormuş bakiyim
ben bir yıldır pek takip etmedim" diyip sonra da yıllık güncelleme almak
için 2000\$ konferans parası veren insanlarla dolu değil. Yani özetle...
daha önce duyurulmuş şeyleri pişirip geri satma yeri değil burası.
Maalesef Azure PAAS tarafında durum bu oldu.

Yine de gelin hızlıca yenilikleri bir sıraliyim. Malum bazıları ile
ilgili benim blogda yazı yazma şansım olmadı. Bazılarına da yakında
değineceğim. AutoScale'i atlıyorum. Eski haber bu. Traffic Manager
konusunda değişen bir şey yok. Bu konuda daha önce hazırladığım [hem bir
makale hem de bir video](http://daron.yondem.com/tr/search/traffic) var.
Yeni gelen tek şey Traffic Manager'a artık Azure Web Sites
Endpointlerini de ekleyebiliyor olmamız. **Webjobs** konusunda ileriki
günlerde yazı yazmaya başlayacağım. Webjobs bir süredir var ama SDK'i
yeni yeni olgunlaşmaya başladı. Şu anda zaten hala Preview aşamasında.
Webjobs özünde Azure Web Sites için Scheduled Job çalıştırmanızı
sağlıyor. Çok önemli ve süper bir özellik fakat yeni değil. Gelelim
Backup olayına. **Backup** konusunda güzel olan Azure Web Sites
backupları alınırken hem sitenin hem de bağlantılı database'in yedeğinin
alınıyor olması. Tabi bunun düzgün çalışması için veritabanı ile site
arasında bağlantıyı Azure Management Portal'dan tanımlamış olmanız
gerekiyor. Son olarak Azure Web Sites'a **Java desteği gelmiş**. Bu
haberin beni ne kadar heyecanlandırdığını tahmin edebilirsiniz.

Bir diğer haber de Azure Web Sites'a **Staging ortamı desteğinin
gelmesiydi**. Bu haber o kadar eski bir haber ki utandılar herhalde
yukarıdaki listeye koymaya ve sadece sözlü olarak bahsettiler. Üzerine
demo da yaptılar. Azure Web Sites'ın Staging'inde inanılmaz bir rezalet
yaptı Microsoft. Seksen defa feedback verdik Azure MVP'leri olarak
laftan anlamadılar. Nedir mesele? Cloud Service kullananlar bilirler
orada da Staging konsepti mevcut. Staging Endpoint URL'i bir GUID olarak
yaratılır. Böylece önüne gelen sizin staging ortamına ulaşamaz. Azure
Web Sites'ın staging endpointleri normal endpoint adresinin service
namespace'in sonuna "-staging" eki konularak yaratılıyor. Yani herhangi
bir Azure Web Sites hesabının adını biliyorsanız sonuna -staging koyup
staging ortamına ulaşabilirsiniz. Tek kelime ile "Rezalet". Daha ne
diyim?

### Azure Mobile Services

Mobile Services tarafında güzel yenilikler var. Bir süre önce duyurulan
.NET back-end desteğinin tekrar altı çizildi. Benim özellikle dikkatimi
çeken iki duyuru oldu listede. Bunlardan ilki "Offline Data Sync".
Mobile Services kullanan mobil uygulamaların en büyük ihtiyaçlarından
biri de Offline çalışabilme yeteneği. Bu konuda bir çözüm yolda. İkinci
ilginç haber ise "Notification Hub"da Kindle desteği gelmesi. Türkiye
için pek anlamlı değil çünkü malum Kindle Türkiye'de hizmet ve cihaz
olarak mevcut değil fakat Notification Hub'ın desteklediği platform
sayısında artış adına güzel bir adım.

![Mobile Services
Yenilikleri](media/Build_2014_Gun_2/day2_4.jpg)
*Mobile Services Yenilikleri*

Mobile Services ile iligli geri kalan yeniliklerin listesi yukarıdaki
fotoğrafta bulunuyor. Bazıları maalesef ki eski yenilikler :(

### SQL Databases tarafındaki yenilikler

SQL Database tarafında beklemediğim güzel yenilikler duyuruldu. Keynote
boyunca keyfimin yerine geldiği nadir anlardan biriydi SQL Database'ler
bahsedilen aralık. İlk yenilik 15GB olan maksimum database boyutunun
500GB'a yükseltilmiş olması. Bu kesinlikle kendi içerisinde
High-Availability içeren bir servis için büyük bir adım ve gelişme. Bu
haberin yanında iki güzellik daha var. Active Geo-Replication bunlardan
biri. Aynı bölgede birden çok data center arasında otomatik replication
kullanılabiliyor artık.  İkinci yenilik ise "Self-Service Recovery". SQL
Database'inizin otomatik olarak 30 günlük historysinin tutulduğunu ve
bunun için ek ücret ödemediğinizi düşünün. İşte "Self-Service Recovery"
aynen bunu yapıyor :) Aslına bakarsanız tüm duyurular içerisindeki en
ilginç ve günlük hayatta işe yarayacak yeniliklerden biri buydu.

![SQL Database tarafındaki
yenilikler.](media/Build_2014_Gun_2/day2_5.jpg)
*SQL Database tarafındaki yenilikler.*

### .NET Foundation, Roslyn, Microsoft ve Open Source

Microsoft'un son 15 yıldır yürüttüğü bir çok Open Source projesi, ürünü
var. Bugün yaptıkları duyuru ile tüm bu ürünleri ve uzman ekipleri .NET
Foundation adı altında toplayacaklarını paylaştılar. Aşağıdaki slaytta
kabaca projelerin listesini bulabilirsiniz. Bunların içinde yer almayan
bir diğer duyuru de Roslyn'ın Open Source olarak paylaşılması oldu.
Böylece artık yeni [C\# ve VB Compiler'ları tamamen Open
Source](https://roslyn.codeplex.com/) olmuş oldu. Tabi gönderilen PULL
requestlerin yüzde kaçı kabul edilir bilemiyorum :)

![.NET Foundation ile Open
Source](media/Build_2014_Gun_2/day2_6.jpg)
*.NET Foundation ile Open Source*

### Yepyeni bir Azure Portalı!

Bu beklediğim duyurulardan biriydi :) Yaklaşık 6-7 aydır bu portal için
Microsoft Ürün Grubu'na feedback veriyoruz Azure MVP'leri olarak.
Sonunda Portal Preview olarak duyuruldu. Azure Portal tamamen değişiyor.
Bu değişim süreci bir önceki değişim süreci ile aynı olacak. Bir süre
boyunca iki portal da, yani hem şimdiki hem yeni portal beraber yayında
olacak ve istediğinizi kullanabileceksiniz. Yeni Portal tamamlandığında
eskisi kapatılacak. Yeni Azure Portal'ı gerçekten son 20 yıldır
Microsoft'tan gördüğüm en büyük yaratıcı hareketlerden biri! Hani
"Ribbon" olayı nasıl oldu? Bir anda tüm uygulamalarda görmeye başladık.
İşte aynı şekilde yeni Azure Portal'ının **Blades** ve **Journey** UI
konsepti de bence yavaş yavaş tüm admin portallarında kendini göstermeye
başlayacak. <http://portal.azure.com> adresinden denemenizi tavsiye
ederim :)

![Yeni Azure Management
Portal'ı.](media/Build_2014_Gun_2/day2_7.jpg)
*Yeni Azure Management Portal'ı.*

### Visual Studio Online Yayında!

Eski adı TFSLive olan Visual Studio Online biliyorsunuz epey bir süredir
ücretsiz. Bunun nedenlerinden biri tabi ki servisin Preview aşamasında
olmasıydı. Artık Visual Studio Online Live oldu ve ücretlendirilme şekli
de belirlendi. Yeni modele göre hala beş kullanıcıya kadar Visual Studio
Online kullanımı ücretsiz. Ek kullanıcılar için ise aylık 20\$ maliyet
söz konusu. Açılış kutlamaları çerçevesinde :) kısa bir süre için bu
fiyatı Microsoft 10\$'a çekmiş durumda. Visual Studio Online Basic
olarak geçen 20\$/ay şeklindeki profilin yanı sıra bir de 45\$/Ay
profili söz konusu. Bu profilin adı ise Visual Studio Pro. Bu profilde
ilginç olarak aylık kiralama yöntemi ile bildiğimiz Visual Studio Pro
IDE lisansı da almış oluyorsunuz. Son olarak Visual Studio Advanced ise
ek süreç yönetimi araçlarını da getirerek aylık 60\$ maliyet sunuyor.
Profiller arası karşılaştırmaların detayı için doğrudan [Visual Studio
Online
sitesini](http://www.visualstudio.com/en-us/products/visual-studio-online-overview-vs.aspx)
ziyaret edebilirsiniz.

### Ve geri kalanlar

Geri kalanlar inanılmaz bir saçmlık yığını. Build 2. Gün Keynote'un son
bir saatinde Microsoft bildiğiniz toparlamaca yaptı. WPF'e hala yatırım
yapıyoruz diyip Sharepoint entegrasyonu gösterdiler. Winforms'a yatırıp
yapıyoruz diyip bir başka firmanın VB6'dan HTML5'e uygulama migration
aracını gösterdiler. Amaçsız hareketler yığını olarak geçip gitti geri
kalan bir saat. Ben VB6'da kod yazdım! Çok güzel günlerdi. Ama bugün
çıkıp da bana 2014 yılındaki en büyük Microsoft Developer Konferansı'nda
Microsoft bana VB6'dan HTML5'e migration aracı olarak bir partner
aracını gösteriyorsa... şu Keynote'u bir saat erken bitirin daha iyi
derim ben. Bu konferansa dünyanın her tarafından insanlar "VB6'dan
Migration yapılabiliyor günümüz teknolojilerine bakın teknolojiler o
kadar da çabuk ölmüyor" gibi saçma bir mesajı dinlemek için gelmedi.
Keynote'un son bir saatinin bir kısmını insanların artık "Microsoft hede
hödö den vaz mı geçti" dediği şeyleri toparlamak için kullandılar ve
bence ortalığı sıvamaktan öteye geçemediler. Daha da kötüsü aslında
durumu daha da kötü bir hale getirdiler çünkü zaten bu konferansa
gelenlerin çoğu her yıl geliyor ve Microsoft'un neyi nasıl yaptığını
biliyor. Amaç eğer dışarıdaki Community'e ulaşmaksa... emin olun zaten
onlar Build'i online izlemiyorlar. Ayrıca Online izleyenlere mesaj
vereceksin diye oraya 20 saat uçuşla gelen 5000 kişiyi bloklayamazsın.

Son yarım saati ise "Microsoft ile çalışmak için her alanda Microsoft
kullanmak zorunda değilsiniz" mesajı vererek geçirdiler. Efendim neymiş
Amazon Cloud servisleri ile Azure beraber kullanılabilirmiş. Valla?
Ciddi misiniz ya? Ve bunu her yıl bir defa yaptığınız en büyük developer
konferansında yarım saat anlatmanız mı gerektiğini düşündünüz? Azure
kullanırken client uygulama olarak Windows platformu şart değilmiş iOS
de kullanabilirmişiz! İnanılmaz, şaka gibi bir yarım saatti son yarım
saat. Verilen mesajların hepsi doğru fakat tamamen yersiz! Oradaki 5000
kişinin 500'üne yarayacak mesajlar için 4500 kişinin 1 saatini alma
hakları olduğunu düşünmüyorum. "Nereden varıyorsun bu yargılara?"
diyebilirsiniz. Kişisel fikrim. Ama nasıl ki bu konferansta herkes
"Microsoft Xamarin'i satın aldığını duyuracak" beklentisi ile gezerken
ben "Xamarin kendini kolay kolay satmaz Microsoft'a" diyorduysam ve bu
konuda en ufak bir duyuru bile olmadıysa diğer konularda da kendimce
doğru yorumlar yapabildiğimi düşünüyorum. Yıllardır Microsoft ile en az
10 ayrı ülkede çok yakından çalıştım, yıllardır gitmediğim konferansları
kalmadı, izleyici oldum, görevli oldum, konuşmacı oldum. Bir şeyleri
tutturabiliyor olmam sanırım normal.

### Sonuç

Evet, eğer bu başlığı atmasaydım bu yazıyı bitiremeyebilirdim. O nedenle
"Sonuç" diyip biraz da kendimi durdurmak istedim :) Sonuç olarak genele
baktığımda güzel bir Build 2014 geçti. 2. gün 1. güne kıyasla kötüydü
ama genel olarak güzel yatırımlar var ve Microsoft doğru yoldu. Client
tarafında doğru yolda, yatırım miktarı çok yüksek. Open Source tarafında
bastırmaya devam ediyorlar. Cloud tarafında yatırımları yine çok büyük
ve fena saldırıyorlar. Son bir yılda iyi yol alındı ve önümüzdeki bir
yıl da çok iyi geçecek gibi duruyor. Eğer bu yazımın sonuna da moraliniz
bozuldu ise tavsiyem dünkü [1. gün
değerlendirmemi](http://daron.yondem.com/tr/post/Build_2014_Gun_1) de
bir okuyun, hatta tekrar okuyun. Dün efsane bir gündü! :)

Görüşmek üzere!


