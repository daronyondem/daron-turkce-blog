---
FallbackID: 2451
Title: "PDC Gün 2"
date: "2009-11-19"
EntryID: PDC_Gun_2
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4, Windows 7, IE 9, Internet Explorer
old.EntryID: 8deb162f-1f6c-4f7f-b7e3-863bf2d4d47e
---
# PDC Gün 2
Bugün PDC'nin ikinci günüydü. Birinci günde sunucu taraflı yeniliklere
baktıktan sonra ikinci günde istemci tarafına göz atılacağı için herkes
nefesini tutmuş ikinci gün Keynote'u bekliyordu ki gerçekten de efsanevi
bir Keynote oldu diyebilirim! Salonda yaratılan heyecanı tahmin
edemezsiniz! Gelin neler olduğuna beraber bakalım!

Keynote Windows 7 ile beraber başladı. Windows 7'nin gelişme sürecindeki
etkilerden bahsedilirken hepimizin de bildiği üzere Beta ve RC
sürecindeki müşteri dönüşlerinin önemi ve ortaya çıkan üründeki etkisi
anlatıldı. Bu esnada verilen bazı istatistikler gerçekten ilgi
çekiciydi. 8 milyon kişinin Beta'yı yüklemesi bunlardan sadece bir
tanesi! Tüm bu süreçte sadece "Send Report" düğmeleri ile yolladığımız
raporlar sonucu bile Windows 7'de 5000 satıra yakın kod değişikliği
yapılmış.

![Windows 7 geliştirilme sürecinden
istatistikler.](media/PDC_Gun_2/18112009_1.jpg)\
*Windows 7 geliştirilme sürecinden istatistikler.*

Windows 7 ile beraber gelen bazı özelliklerin donanıma bağlı olduğunu
biliyorsunuz. Örneğin Multitouch sadece bunlardan biri. Aynı şekilde
Sensor development yapabilmek için de donanıma entegre sensörlerin
bulunması gerekiyor. Tüm bunlarla ilgili piyasadaki farklı donanımlarla
demoların yapıldığı Keynote'un bu kısmının sonunda özel olarak Acer'ın
bir laptopu tanıtıldı. Laptop'un Microsoft - Acer işbirliği ile
tasarlandığından vs bahsedilirken herkesin aklında "*Acaba neden laptop
tanıtıyorlar ki?*" sorusu geçti. İşte tam da bu noktada söz konusu
laptoptan her katılımcıya bir adet hediye edileceği duyuruldu!

![PCD'de her katılımcıya bir laptop
hediye!](media/PDC_Gun_2/18112009_2.jpg)\
*PCD'de her katılımcıya bir laptop hediye!*

Duyuru yapıldıktan sonra yaklaşık bir 10 saniye kadar salonda sessizlik
vardı. Herkes "Herhalde bu bir şaka" hissiyatında donup kalmıştı. Sonra
tabi ki büyük bir alkış koptu! Laptop'un verilmesindeki amaç tabi ki
PDC'ye katılan tüm developerların Windows 7'nin yeni özellikleri ile
ilgili API'ları rahatlıkla uygulamalarında kullanabilmeleri için bir
geliştirme ve test ortamı yaratmaktı. Gerçekten çok başarılı bir iş
çıkarıldığını söyleyebilirim.

Malumunuz bu haber dünya çapında sektörde twitter ve friendfeed
üzerinden yayıldıkça belki de o anda en sevilmeyen insanlar PDC'ye
katılanlar oldu :) Herkes "Keşke biz de gitseydik" gibi içinden geçirdi
ve bunu twitter mesajları ile de belli ettiler. Fakat bir gerçek var ki
PDC katılımı zaten kişi başı 2000\$ civarında :) Tabi bu durum
Microsoft'u laptop vermek zorunda bırakmıyor :) ama ortada pek de
"tamamen beleş laptop" durumu yok :) Diğer yandan laptop derken de neden
bahsettiğimizi detaylandırmak gerek...

**1.2 Ghz Celeron** ve **2GB Ram**'e sahip laptop formunda bir
netbooktan bahsedebiliriz aslında. Cihazda **CD-Rom yok** ve pil ömrü 8
saat. Atom işlemci olmamasına rağmen Celeron ile ucuz ve düşük pil
tüketimli bir seçenek kullanılmış. Laptop'un güzel tarafı **Duo-Touch**
bir ekrana sahip olması. Maalesef tam olarak Multitouch değil çünkü
sadece 2 touch point destekliyor ama yine de giriş seviyesi development
için yeterli. Ayrıca laptopa entegre **3G, GPS ve ışık sensörü**
bulunuyor. Böylece rahatlıkla **Sensor and Location API** ile de
development yapılabilir bir cihaz oluşturulmuş. Biliyorsunuz tüm bu
konularda ben sizlerle zaten teknik makaleleri de blogumda paylaşmıştık
hatta 4 ay önce bu konularda etkinlikler de yaptık. Ben de seminerlerde
harici bir sensör kit kullanmıştım :) artık dahililer de piyasada yerini
bulacak demek ki.

![Entegre Ctrl+Alt+Del tuşu
:)](media/PDC_Gun_2/18112009_3.jpg)\
*Entegre Ctrl +Alt+Del tuşu :)*

Cihazda en ilgimi çeken özellikle entegre bir tek tuş ile Ctrl+Alt+Del
olayının kolaylaştırılmış olması. :) Herhalde laptop düşün donanımdan
çok takılacak diye düşünmüşler :D Şaka bir yana bana epeyce gereksiz
geldi bu tuş :) Ne de olsa söz konusu kombinasyonu epey elimiz alışık.
Özetle anlayacağınız ortada öyle sürekli kullanılacak bir laptop yok
aslında :) amaç netbook tadında ve özellikle de Windows 7'nin yeni
özelliklerinin denenebileceği bir donanım sağlamak olmuş. Güzel de olmuş
;)

**Internet Explorer 9**

Windows 7'den sonra sıra geldi Internet Explorer 9'a. Herhangi bir beta
vs duyurulmadı fakat IE9 ile beraber hedeflenen şeyler ve demolar
gösterildi. Özellikle IE9 ile beraber IE'nin rendering engine'inin
GDI'dan kurtarılarak tamamen Direct2D üzerine taşınmış olması bence
efsanevi bir hareket! Böylece artık en basit web sitesi bile render
edilirken hardware acceleration kullanış olacak. Bu durum özellikle
demolarda DHTML animasyonlarında kendini bariz bir şekilde belli
ediyordu.

![Internet Explorer 9
yolda...](media/PDC_Gun_2/18112009_4.jpg)\
*Internet Explorer 9 yolda...*

HTML 5 konusunda desteğine devam edecek olan Microsoft ekibi bu konudaki
dertlerini de yazılımcılarla paylaştı. Daha W3C tarafından
standartlaştırılmamış draft konseptleri tarayıcılarını entegre eden
rakiplerin "HTML 5 uyumluyuz" nidalarını eleştiren ekip bence de çok
haklı! Sonuçta standartlaşmamış bir şeyin herhangi bir tarayıcıya
implemente edilmesinin yazılım geliştiriciler için hiçbir anlamı yok!
Standartlara uymak çok önemli ve zaten bu konu yıllardır MS'i
eleştirdiğimiz bir konu olmuştu. Hazır MS bunu toparlarken rakiplerin
diğer yola sapması epey garip. Her neyse IE9 gerçekten ümit veriyorum.
Eğer IE7'den 8'e alınan yol kadar daha yol alınabilirse kesinlikle IE
çok daha başarılı olacaktır.

**Silverlight 4 Beta**

Günün en önemli duyurularından biri de Silverlight 4'ün Beta'sının
public dağıtımıydı! Silverlight gerçekten çok hızlı ilerleyen bir ürün
ve daha üçüncü sürümü çıkalı altı ay olmadı ki 4'ün Beta'sı ile karşı
karşıyayız. Tabi Silverlight bu süreçte süper bir gelişim gösteriyor ve
eksik özellikler olarak nitelendirdiğimiz çoğu şeyin adım adım
toparlandığını görebiliyoruz. Community'yi dinleme konusunda Microsoft
yine muhteşem bir iş çıkarıyor diyebilirim.

![Silverlight 4 Beta
karşınızda!](media/PDC_Gun_2/18112009_5.jpg)\
*Silverlight 4 Beta karşınızda!*

Gelin hızlıce Silverlight 4 Beta ile gelen yeniliklere göz atalım.

-   **Printing API**, Artık yazıcıya doğrudan özel olarak çıktı
    gönderebiliyor! Yay!
-   .NET 4 ile SL 4 arasında Assembly paylaşımı!
-   UDP Multicast desteği!
-   Sağ tuş Context menüler
-   Webcam ve Mikrofon kullanımı!!!!
-   Fare Roller desteği! Native!
-   RichTextArea kontrolü!
-   Command desteği (WPF'ten hatırlanabilir)
-   Clipboard desteği!
-   Out Of Browser modunda HTML hosting desteği (Webbrowser)
-   OOB modunda istendiğinde tam sistem erişimi! Böylece full trust
    modunda tüm donanımlara erişebilirsiniz!!!!
-   Full trust modunda COM Interop!
-   OOB'de Notification API, MSN tadında uyarılar gösterebilirsiniz!
-   OOB'de hosted pencerenin tasarımını değiştirbilmek!
-   Full trust'da Full Screen'de Full Keyboard desteği.
-   ViewBox kontrolü artık Toolkit haricinde SDK'ye dahil.
-   Sağdan sola yazım desteği (Arapça vs için)
-   Offline DRM kullanımı
-   İşletim sisteminde Silverlight uygulamalarına Drag&Drop desteği!
-   Databinding yenilikleri!
-   MEF!
-   ItemsControls'de Fluid desteği!
-   Implecit Temalar.

Tüm bu özelliklerle ilgili teknik makaleleri çok yakında sizlerle
paylaşıyor olacağım ;) 

Silverlight 4 Beta sadece Visual Studio 2010 Beta 2 ile beraber
çalışabilecek. O nedenle gerekli yüklemeleri yapmadan önce makinanızda
Visual studio 2010 Beta 2 bulunması şart. O nedenle aman dikkat diyorum
deneme amaçlı kullanacağınız bu makine kesinlikle normal projelerinizi
geliştirdiğiniz bilgisayarınız olmamalı. Expression Blend tarafında ise
tabi ki Silverlight 4 destekleyecek yeni bir Blend gerekecek. Şimdilik
bu konuda da Blend 4'ün Preview'u işimizi görecektir. İndirmeniz
gerekenlere aşağıdaki adreslerden ulaşabilirsiniz;

[Visual Studio 2010 Beta
2](http://msdn.microsoft.com/en-us/vstudio/dd582936.aspx)\
 [Silverlight Tools for Visual Studio
2010](http://go.microsoft.com/fwlink/?LinkID=177508)\
 [Expression Blend 4
Preview](http://go.microsoft.com/fwlink/?LinkId=169446)\

**Gece oldu! Şimdi Underground PDC zamanı!**

Akşam üstü başlayan bir diğer aktivite ise Underground PDC
aktivitesiydi! Bu aktiviteye PDC katılımcıları haricinde özel katılım
kodu alanlar katılabildi :) Katılım kodlarını genelde Microsoft
çalışanları dağıttı. Ben taaa TechEd Europe zamanı sağ olsun Silverlight
Program Manager Tim Heuer'den almıştım. Underground PDC adından da
anlaşılacağı üzere biraz daha gayri resmi bir etkinlik olarak PDC'nin
relax haliydi diyebiliriz. İçerik olarak çok radikal birşey olmasa da
ortam gerçekten hoştu.

![Underground PDC böyle
olur!](media/PDC_Gun_2/18112009_6.jpg)\
*Underground PDC böyle olur!*

Etkinlik LA Lakers kızlarının sahnede yerlerini alması ile başladı :)
Çok yorum yapılabilecek bir sahne değil desem de bana inanmayın :) Her
neyse ben yorum yapmiyim fotoğrafı yukarıda siz inceleyin, yorumları siz
yapın :) Etkileyici bir başlangıçtı diyebilirim. Etkinliğe katılanlar LA
Lakers kızlarının yanına giderek MSDEV logolu dövme yaptırabiliyorlardı
tabi beraber fotoğraf çekilmek isteyenler de az değildi :)

![Scott
sahnede!](media/PDC_Gun_2/18112009_7.jpg)\
*Scott sahnede!*

Sonrasında Scott sahneyi aldı ve tekrar Silverlight 4 ile ilgili oturum
başladı. Daha önce de bahsettiğim gibi Underground PDC ile normal
PDC'nin katılımcıları aynı değildi çünkü Underground için ayrıca
davetiye almanız gerekiyordu. Biraz da bu nedenle PDC içeriği ile
Underground PDC içeriği çakıştı diyebilirim. Fakat zevkli bir ortamda
zevkli bir etkinlikti diyebilirim.

Böylece yavaştan PDC'nin de sonuna doğru gelmeye başladık. Yarın üçüncü
ve son gün! Herhangi bir keynote yok. Regional Director'lar olarak Scott
Gu ile ayrı bir toplantımız var. Toplantı tamamen gizlilik sözleşmeleri
çerçevesinde olacağı için pek paylaşabileceğim birşey olmayacaktır diye
tahmin ediyorum ama tabi belli de olmaz :)

Görüşmek üzere!



*Bu yazi http://daron.yondem.com adresinde, 2009-11-19 tarihinde yayinlanmistir.*
