---
FallbackID: 2170
Title: Internet Explorer 8.0 Beta 2 ile gelen güvenlik yenilikleri
PublishDate: 8/31/2008
EntryID: b5a6af1b-2b5b-42ca-ae4b-ccd1c99441d3
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
---
**Internet Explorer 8.0 Beta 2** kısa bir süre önce yayınlandı. Bu
yazımda "Güvenlik" çerçevesinde IE 8.0 ile beraber gelen
değişikliklerden bahsedeceğim. Değineceğim bazı noktalar doğrudan son
kullanıcıya ilgilendirirken bazıları ise yazılım geliştiricilere yönelik
olacak.

**Data Execution Prevention**

Kısa adı DEP olan sistemin aslında doğrudan IE ile bir ilişkisi yoktu.
Windows XP ve 2003 ile beraber gelen altyapı sistemde belirli bellek
alanlarının korunmasını ve bu alanlardan kod çalıştırılmasını
engellenebilmesini sağlıyor. Böylece **Buffer Overrun** saldırılarına
ait boşlukların bulunması çok daha zor bir hal alıyor. Tabi "Managed
Code" yazarları olarak VB.NET ve C\#.NET programcılarına bu yapı yabancı
gelecektir. Maalesef şimdilik çok detaylarına girme şansımız yok.

Şu ana kadar bu altyapı Windows'da olmasına karşın maalesef IE 7.0 ile
beraber varsayılan ayarlarda açık gelmiyor. Bunun mantıklı bir nedeni
var; DEP ile uyumsuz programların bugüne kadar çalışması gerekiyordu,
özellikle IE 7.0 için yazılmış çoğu Plug-In maalesef bu durumdaydı. ATL
7.1 ve öncesindeki uygulamaların DEP ile karşı karşıya gelmesi durumunda
uygulamanın kendisine izin verilmeyen bir hafıza alanına yazmaya
çalışması sonucu doğrudan uygulamanın sonlandırılması söz konusu. Tabi
ki var olan Plug-In'leri ve uygulamaları uygun şekillder düzelterek
(IMAGE\_SCN\_MEM\_EXECUTE şeklinde işaretlemeler ile) sorunu gidermek
mümkün.

Internet Explorer 8.0 tarafında artık **DEP** Vista SP1 ve Server 2008
içerisinde otomatik olarak açık gelecek. DEP ile beraber bir de Vista'da
gelen **ASLR** (Address Space Layout Randomization)'yi de
birleştirdiğimizde ortaya güvenlik anlamında hoş bir manzara çıkıyor.
ASLR'nin yaptığı ise sistem her açıldığında Kernel32 gibi belleğe
yüklenen sistem öğelerinin her seferinde farklı bellek noktalarına
yüklenmesini sağlamak. Böylece kötü niyetli bir kodun saldırma öncesinde
doğru hedefi bulması daha zor oluyor.

Vista içerisinde hangi uygulamaların DEP tarafından korunduğunu görmek
isterseniz doğrudan "Görev Yöneticisi" / "Task Manager" içerisinde "View
/ Select Columns" altından "Data Execution Prevention" kolonunu seçerek
ilerleyebilirsiniz.

IE 7.0 içerisinde DEP'yi aktif hale getirmek için "Tools / Internet
Options / Advanced" sekmesine giderek uygun seçeneği
işaretleyebilirsiniz. Unutmayın bunu yapabilmeniz için IE'yi Admin
hakları ile açmış olmanız gerekecektir.

**Kullanıcıya özel ActiveX**

Özellikle Vista ile beraber gelen UAC (User Account Control) sonrasında
gelen en büyük şikayetlerden biri ActiveX kontrolleri yüklerken admin
haklarının gerekmesiydi. Kişisel olarak kullandığınız bilgisayarınızda
bu bir sorun teşkil etmese de şirket içi domainlere kayıtlı ve farklı
güvenlik sınırlamalarını olan bilgisayarlarda bu durum sıkıcı sonuçlar
doğuruyordu.

Artık her şey değişti, kullanıcıların Admin haklarına sahip olmasalar da
kendi kullanıcı hesaplarına özel olarak ActiveX uygulamaları
yükleyebilecekler. Eğer söz konusu ActiveX uygulaması zararlı bir kod
içeriyorsa bu durumun bilgisayar hiçbir şekilde zarar görmeyecektir. Var
olan ActiveX uygulamaları herhangi bir sorun yaşamadan bu sistem ile
çalışacak.

Kullanıcıların herhangi bir ActiveX kontrolü ile karşılaştıklarında
kontrolü sadece kendileri için veya tüm makine bazında yüklemek isteyip
istemediklerini seçebilecekler. Bu seçim şu anki Internet Explorer
içerisinde ActiveX kontrolleri için gelen uyarı mekanizmasına dahil
edilmiş durumda.

**Siteye özel ActiveX**

Hazırladığınız ActiveX kontrollerinin sadece belirli bir sitede
çalışmasını isteyebilirsiniz. Özellikle yüksek güvenlik amacıyla
bankacılık uygulamalarında kullanılan ActiveX kontrolleri buna bir örnek
olarak gösterilebilir. Bu kısıtlamanın yapılabilmesi için ActiveX
uygulaması geliştirilirken "**SiteLock Active Template Library**"nin
kullanılması gerekiyor. Arka planda çalışan mantık aslında çok basit;
Internet Explorer içerisinde çalışabilecek ActiveX kontrollerinin "Safe"
şeklinde işaretlenmesi gerekir. Eğer bir ActiveX kontrolü kendi istediği
alan adları haricinde çalıştırıldığında kendisini "UnSafe" olarak
tanımlarsak IE doğrudan söz konusu ActiveX'i pasif hale getiriyor.

Standart ATL şablonunun yerine oturan SiteLock şablonu IObjectSafety ve
IObjectSafetySiteLockImpl üzerinden türüyerek Build esnasından
tanımlanan siteler dışında çalışmıyor. SiteLock 1.14 şablonunu aşağıdaki
adresten indirebilirsiniz.

<http://www.microsoft.com/downloads/details.aspx?FamilyID=43cd7e1e-5719-45c0-88d9-ec9ea7fefbcb&displaylang=en>

![ActiveX'ler artık birer
Add-On](http://cdn.daron.yondem.com/assets/2170/30082008_1.png)\
*ActiveX'ler artık birer Add-On ve siteye özel yüklenebiliyorlar.*

Kullanıcılar ActiveX uygulamalarını IE 8.0 içerisinde birer Add-On
olarak görecekleri için istedikleri ayarı "Manage Add-ons" penceresinden
yaparak belirli ActiveX'lerin sadece istedikleri sitelerde çalışmasını
sağlayabilirler. Bu ayar "Group Policy" üzerinden de artık
yapılabiliyor.

 HKEY\_CURRENT\_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Ext\\Stats\\{ID}\\iexplore\\AllowedDomains\\{Domain}

Yukarıda adres üzerinden Registry içerisinde gerekli ayarlar
bulunabilir. {ID} yerine kontrol edilmesi hedeflenen ActiveX kontrolünün
Class ID'si, {Domain} yerine de izin verilen domainler atanabilir.

**Phishing Koruması**

Phishing koruması aslında IE 7.0 ile beraber karşımıza gelmişti. IE 8.0
ile beraber SmartScreen adı altında gelen yeni özellikler gerçekten
etkileyici.

![Phishing çabaları
nafile!](http://cdn.daron.yondem.com/assets/2170/30082008_2.png)\
*Phishing çabaları nafile!*

Yukarıda gördüğünüz adres barındaki adresin bir Phishing çabası olma
ihtimali çok yüksek. Böyle bir durumda IE bunun farkına varıp hemen
kullanıcıyı uyarabiliyor. Eskiden Phisping analizi internette gezme
hızımızı da etkilerken bu sefer o konuda da yeni geliştirmeler yapılmış
ve daha hızlı bir inceleme motoruna geçilmiş durumda.

**XSS Saldırıları**

Son dönemde XSS (Cross Site Scripting) saldırıları belki de en sık
karşılaştığımız güvenlik açıklarından. Bu teknik ile rahatlıkla bir web
sitesi ile kullanıcısı arasına girerek kullanıcının bastığı tuşlara
kadar her tür bilgi alınabiliyor. Bu konuda tam bir koruma sunmanın
kullanıcı deneyimini ciddi şekilde kötü durumlara sürükleyeceği için
minimal koruma mekanizmaları devreye sokulmuş.

![XSS Koruması](http://cdn.daron.yondem.com/assets/2170/30082008_3.png)\
*XSS Koruması*

Yazılım geliştiriciler isterler bu korumaları sunucu tarafından
kapatabiliyorlar. Tek yapmaları gereken **X-XSS-Protection: 0** şeklinde
gerekli HTTP Header bilgisinin sayfalarına eklemek.

Bu noktada özellikle bir uyarıda bulunmak istiyorum. İstemci tarafında
bir tarayıcı olarak IE 8.0'ın XSS koruması her çeşit XSS saldırısını
korumamakla beraber kesinlikle bir yazılım geliştiricinin bu sisteme
"güvenerek" hareket etmesine neden olabilecek bir yapı değildir.
Unutmamak gerek ki herkese IE kullanmayabilir.

**Cross Domain Request**

XDR için bugüne kadar birçok teknik kullanıldı. Bunların içinde belki de
en çok tercih edilen harici script'lerin SCRIPT tagları ile dinamik
olarak sayfalara JavaScript ile eklenmesi. Normalde bir güvenlik açığını
temsil etse de bu teknik bugün Mash-Up dediğimiz uygulamalarının
temelini oluşturuyor. Bu tekniği uzun vadede ortadan kaldırmak adına IE
8.0 ile beraber bir XDR nesnesi geliyor.

XDomainRequest objesi klasik XMLRequest ile aynı şekilde çalışırken
harici domainlerden veri alınabilmesini sağlıyor. Bunun için sadece
uzaktaki hedefin HTTP Header bilgisinde **XDomainRequest: 1** yer alması
gerekiyor.

**HTML Üretiminde Güvenlik**

Özellikle AJAX'ın oluşumu ile beraber eldeki veriden istemci tarafında
HTML oluşturarak kullanıcıya göstermek performansı arttırmek adına
kullanılan tekniklerden biridir. Bu tekniğin tehlikeli tarafı elinize
gelen veri eğer harici kaynaklardan geliyorsa aslında bir anlamda
sayfaya script de ekleyebileceğiniz durumlarının oluşması.

Artık **toStaticHTML** adında bir metodumuz var. Böylece elimizdeki
herhangi bir metni doğrudan HTML'e çevirirken tüm kontrollerin
yapılmasını sağlayabiliyoruz. Eğer kaynak metinde script tagları varsa
hepsi güzelce temizlenecektir :)

**JSON ve EVAL tehlikesi**

JSON verileri uğraşırken EVAL metodunu kullanmamak neredeyse mümkün
değil. Hatta JSON'un getirdiği en önemli kolaylıktan faydalanmanın tek
yolu EVAL komutunu kullanıyor olmak. Oysa yine verinin harici
kaynaklardan geldiğini düşünürsek EVAL komutu sayfada doğrudan metin
bazındaki bir kodu çalıştırdığı için çok tehlikeli sonuçlar doğurabilir.
Karşı taraftan gelen zarar verici bir kod sitenizde çalışabilir.

Örnek kod:

var Nesne = JSON.parse(XML.responseText);

IE 8.0 ile beraber yeni gelen JSON Parser nesnesini kullanmanız halinde
artık güvenli olarak ilerleyebilirsiniz. Söz konusu parser doğrudan
metin olarak aldığı kaynağı JavaScript nesneleri olarak geri döndürüyor.
Bu özellik ile beraber **toStaticHTML**  komutunun kullanımı çok daha
sağlıklı bir deneyim sağlayacaktır.

**MIME TYPE Kararları**

MIME Type ayarları normal şartlarda HTTP Header bilgisi içerisinde
saklansa da bugüne kadar Internet Explorer kendi kendine kararlar
vererek daha kolay bir kullanım sağlamak için MIME Type değişiklikleri
yapabiliyordu. Örneğin text/plain olarak ayarlanmış bir dosya içerisinde
HTML kodu varsa bu dosya açıldığında IE içerisinde bir HTML sayfa olarak
render edilir. Oysa dosya bir text dosyasıdır ve o şekilde
gösterilmelidir.

IE 8.0 ile beraber eğer sunucudan authoritative=true HTTP header
bilgisini gönderirseniz IE sizin sunucu tarafında düzenlediğiniz MIME
Type ayarlarını saygı göstererek herhangi bir değişiklik yapmayacaktır.

**O uygulamayı sitemde çalıştırma!**

Bir diğer güvenlik açığı da sitelerde tıklanarak istemci tarafına
indirilen herhangi bir uygulamanın veya farklı kodun doğrudan sitenin
üzerinde çalıştırılabiliyor olmasıydı. Örneğin bir PDF dosyasına
tıkladığında dosyayı indirerek doğrudan IE içerisinde açabilirsiniz. Bu
işlemi yapabilmeniz için karşınızda uygun seçenekler IE tarafında
getirilir.

Eğer kullanıcıya sunulacak dosyayı kesinlikle kullanıcı tarafında diske
kaydedilmesini ve doğrudan site üzerinden açılamamasını istiyorsanız
**X-Download-Options: noopen** HTTP Header bilgisini vererek bu işlemin
tamamlanmasını sağlayabilirsiniz.

**InPrivate**

Bir Internet Explorer düşünün ki kapattığınızda her şey eskisi gibi
olacak :) Tarayıcı geçmişi, cookie, Temp dosyaları ve geri kalan herşey
tarayıcıyı kapattığınızda otomatik olarak yok olsa ne kadar güzel
olurdu? Tabi tüm bunları varsayılan ayarlarda olmaması gerekiyor :)
Sadece istediğimizde böyle geçici özel bir IE açabilsek?

**InPrivate** tarayıcı pencereleri kullanıcı tüm bu saydıklarımızı
sağlıyor. InPrivate olarak açtığınız bir pencereyi kapattığınızda o
pencere ile ilgili her şey yok ediliyor. IE 8.0 içerisinde "Safety /
InPrivate Browsing" komutu ile açabileceğiniz InPrivate pencerelerini
adres çubuğundaki InPrivate yazısından tanıyabilirsiniz.

![InPivate Browsing ile internet kafelerde güvenlik
:)](http://cdn.daron.yondem.com/assets/2170/30082008_4.png)\
*InPrivate Browsing ile internet kafelerde güvenlik :)*

**InPrivate Blocking**

InPrivate Browsing'e ek olarak bir de Blocking mekanizması var. Bu
sistemin amacı ise size özel bilgilerin farklı sitelere siz farkında
olmadan ulaşmasını engellemek. Örneğin aynı remote script'in eklendiği
iki siteyi ark arkaya gezdiğinizde aslında uzaktaki bir script olmasına
rağmen söz konusu uzaktaki sunucu sizin ziyaret ettiğiniz bir önceki
siteden sonrakine geldiğinizi bilecek ve ona göre işlem yapabilecektir.
Oysa siz bu bilgiyi yeni girmiş olduğunuz siteye vermek
istemeyebilirsiniz.

Eğer InPrivate Blocking aktif ise tarayıcı her sitede harici olarak
yüklenen scriptlerin listesini saklayacak ve durumuna göre bazı
scriptleri de-aktif edecektir.

IE 8.0 Beta 2 ile karşılaştığımızda güvenlik taraflı yeniliklerin
kendimde önemli olanlarını seçerek sizlerle paylaştım. İleriki
yazılarımda daha heyecan verici uygulamalar yapacağız.

Hepinize kolay gelsin.


