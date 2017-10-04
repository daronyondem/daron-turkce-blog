---
FallbackID: 2515
Title: Windows Phone 7 Development dünyası ve ilk uygulamamız
PublishDate: 2/5/2010
EntryID: Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4, Windows Phone 7, Windows Phone
old.EntryID: 06f74e8e-372b-4574-9817-20c2975f52ea
---
Windows Phone 7 için developer araçları bir süre önce
[MIX](http://daron.yondem.com/tr/post/10fab4d4-960f-4f20-b1db-0b54abbee4dd)
konferkansında duyurulmuştu. Bu yazımızda söz konusu araçlara bir giriş
yaparak WP7 ortamında Silverlight'ın durumuna genel bir bakış atacağız.
İlk olarak tabi ki WP7 development yapabilmemiz için bilgisayarımıza
yüklememiz gereken araçlar söz konusu. Bunlardan ilki Visual Studio'nun
bir türevini içerisinde Phone7 için özel bir Visual Studio Express
sürümü.

[Windows Phone Developer Tools
CTP](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=cabcd5ed-7dfc-4731-9d7e-3220603cad14)

Yazılım geliştirme tarafı için Developer Tools yeterli olurken tasarım
noktasında tabi her zamanki gibi Expression Blend'e ihtiyacımız olacak.
O nedenle şu anda elde bulunan seçenek ancak[Blend 4
RC](http://www.microsoft.com/downloads/details.aspx?displaylang=en&FamilyID=88484825-1b3c-4e8c-8b14-b05d025e1541)
üzerine aşağıdaki yüklemeleri yapmak.

[Expression Blend Add-in Preview 2 for Windows
Phone](http://www.microsoft.com/downloads/details.aspx?FamilyID=47f5c718-9dec-4557-9687-619c0fdd3d4f&displaylang=en)\
 [Expression Blend Software Development Kit (SDK) Preview 2 for Windows
Phone](http://www.microsoft.com/downloads/details.aspx?FamilyID=86370108-4c14-42ee-8855-226e5dd9b85b&displaylang=en)

Gerekli yüklemeleri tamamladıktan sonra sisteminizde Visual Studio 2010
haricinde bir de "**Visual Studo 2010 Express for Windows Phone**"
bulunacaktır. Yazılımın özellikle Express olarak adlandırılmasının
anlamlı bir nedeni var. WP7 için hem Blend hem de Visual Studio tarafı
yazılımlar son haline geldiğinde dahi tamamen ücretsiz olarak
dağıtılacak. Böylece yazılım geliştiriciler rahatlıkla bu platforma
geçiş yapabilecekler.

![File / New Project
dediğimizde....](media/Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz/01052010_1.png)\
*File / New Project dediğimizde....*

Yüklemeleri bitirdiğiniz gibi ilk yapacağınız şey tabi ki hemen "File /
New Project" menüsüne gitmek olacak. Windows Phone 7 için development
ortamı olan Visual Studio sürümünde File / New Project dediğimizde
karşımıza iki seçenek geliyor. Bunlardan biri Silverlight, ikincisi ise
XNA. Gördüğünüz üzere başka herhangi bir seçenek de yok. Konunun özüne
dönersek Windows Mobile 6.x sürümlerinde çalışan hiçbir uygulama WP7'de
çalışmayacak ve aynı tarz ile uygulama geliştirilemeyecek. İtiraf etmek
gerekirse bu epey radikal bir hareket fakat bir o kadar da anlamlı ve
güzel. İleriki adımlarda ilk uygulamamızı yarattığımızda da göreceksiniz
ki Microsoft'un bu platformda yapmaya çalıştığı şey aslında herşeyi
biraz daha düzene sokup, kuralları da belirleyerek toplam kullanıcı
deneyimi kalitesinin artmasını sağlayacak şekilde yazılımcı ve
tasarımcıları yönlendirmek. Bu yeni "New Project" penceresi aslında bize
şu mesajı veriyor; "*WP7 için uygulama geliştirecekseniz tek
platformunuz Silverlight, eğer Oyun geliştireceksiniz platformunuz
XNA!*"

**Ufak bir kişisel deneyim paylaşımı....**

İlginç bir alt başlık attığımın farkındayım. Şimdi yukarıdaki manzaraya
baktığımızda en azından biliyoruz ki XNA için Hardware Acceleration
şart. Aynı şekilde WP7'de Silverlight ta bu HW'a sahip. Fakat acaba
nasıl? Gerçekten güzel olacak mı? gibi sorular eminim ki içinizi
kemiriyordur (en azından benim öyleydi). Son Amerika ziyaretimde aslında
pek de yeni bir ürün sayılmayacak [Zune
HD](http://en.wikipedia.org/wiki/Zune_HD)'lerden satın aldım. İlk
fırsatta onunla ilgili de bir inceleme yayınlamayı düşünüyorum blogumda.
Zune HD hali hazırda NVIDIA'nın Tegra chipseti ile gelen Multitouch
Capacitive ekrana sahip ilginç bir cihaz. En güzeli ne? Üzerinde XNA
oyunları çalışıyor! Keşke ülkemizde de Zune HD satışı olsaymış Avrupa'da
bile maalesef belirli ülkelerde var. Özetle çok uzatmadan hikayeyi şöyle
özetliyim, cihazın ne kadar rahat ve yüksek performans ile XNA
oyunlarını çalıştırdığını emin olun tahmin edemezsiniz. Ben ilk
denediğimde ağzım açık kaldı ve işte o an! Windows Phone 7'ye inanmaya
başladım! WP7 sadece telefon özelliği eklenmiş bir Zune HD bile olmaz
emin olun çok büyük ses getirecek! Cümlelerle anlatmak zor fakat
ümidinizi kaybetmeyin! ;)

**İlk WP7 projemiz....**

İlk WP7 projemizde "**Windows Phone Application**" proje şablonunu
kullanacağız. Diğer şablonlardan biri zaten klasik Class Library diğeri
ise bazı hazır kodlar da içeren ve sisteme hızlı göz atmanızı sağlayan
sample şablon gibi birşey özünde. İçi en boş olan şablon "Windows Phone
Application" ile başladığımızda karşımıza her zaman alıştığımız XAML
kodunun yanında da "Preview" ekranı geliyor. Tabi bu sefer Preview
ekranı biraz farklı çünkü malum bir telefon uygulaması geliştiriyoruz ve
bu nedenle Visual Studio da bize tasarımı bir telefon ekranında
gösteriyor. Hatta ekranda gördüğümüz yazıların da sanki renkleri
büyüklükleri vs ayarlı gibi duruyor değil mi? İşte WP7 ile gelen tasarım
şablonu aynen bu şekilde. Genelde beklenen tüm uygulama geliştiricilerin
bu tasarım öğelerine istisnalar hariç olabildiğince sadık kalmaları.
Böylece ne gibi uygulama geliştirilerse geliştirilsin tüm uygulamalar
özellikle son kullanıcı tarafından bir sistemin parçası şeklinde
algılanabilecek. Yarattığımız bu yeni projede bulunan bütün renkler ve
stiller uygulama içerisinde Resource olarak App.Xaml içerisinde duruyor.

**[App.Xaml]**

 <span style="color: red;">......\
xmlns</span><span style="color: blue;">:</span><span
style="color: red;">phoneNavigation</span><span
style="color: blue;">="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"\>\
</span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">Application.RootVisual</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">phoneNavigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">PhoneApplicationFrame</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="RootFrame"</span><span style="color: red;">
Source</span><span style="color: blue;">="/MainPage.xaml"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Application.RootVisual</span><span
style="color: blue;">\>\
 ........</span>

App.xaml içerisinde önemli kısımlardan bir tanesi yukarıda. Koddan da
anlaşılabileceği üzere aslında uygulama WP7'de ilk başlatıldığında
açılacak XAML dosyasının XAP içerisinde Uri'siniz burada vermeniz
gerekiyor. Özünde XAML koduna daha da dikkatli bakarsak sanki SL'deki
**Navigation API** gibi birşeyler var değil mi? Çünkü normal SL
uygulamalarında biz **RootVisual** olarak bir **UserControl** verirken
burada **PhoneApplicationFrame** adında bir nesne verilmiş ve söz konusu
nesnenin de başlangış Source'u MainPage.Xaml olarak gösterilmiş. Aynı
Navigation API mantığı ;) Zaten en üstteki XMLNS tanımında kullanılan
Assembly'den de bunun sadece Phone uygulamalarına özel olduğunu
görebiliriz.

![WP7'de boş bir Silverlight
projesi.](media/Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz/01052010_2.png)\
*WP7'de boş bir Silverlight projesi.*

Yarattığımız bu sıfır projeye şöyle genel bir bakacak olursa içerisinde
alıştığımız Silverlight uygulamalarında farklı olarak **Background.png**
ve **ApplicationIcon.png** gibi iki resmin olduğunu görüyoruz ilk
aşamada. Bu PNG'lerden biri uygulaman telefon içerisinde programlar
listesinde gözükecek ikonuyken diğeri ise eğer uygulama telefonun ana
ekranına pinlenirse gözükecek olan ikon oluyor. Bir diğer ek gelen dosya
ise yine WP7'ye özel uygulama özelliklerine ait ayarların saklı olduğu
**WMAppManifest.xml** dosyası. Bu dosya ile ilgili ayarları aslında
projesine sağ tıklayarak gelen menüden "Properties"i seçerek de
yapabilirsiniz.

![Proje
özellikleri.](media/Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz/01052010_3.png)\
*Proje özellikleri.*

WP7 için yaratılan bir SL projesinin özellikleri baktığımızda şu anda
tek garip gelen seçenek "Supports central settings" seçeneği oluyor.
Nedir acaba bu? Şu an için bu özellik MIX ile beraber duyurulan
Developer Tools ve Runtime'a dahil edilmiş değil. Fakat ileride uygulama
içerisindeki bir "Ayarlar" sayfasının doğrudan telefonun kendi
"Settings" menüsüne eklenmesini sağlayacak olan Chechbox şimdiden
karşınızda diyebiliriz. Hatta işaretlediğiniz şu anda simülatör'de de
uygulamanızı telefonun ayarlar sayfasında görebiliyorsunuz fakat
şimdilik sadece ismi gözüküyor.

**Uygulamayı çalıştırırken...**

Uygulamanızı geliştirirken her zamanki Silverlight bilginizi
kullanabilirsiniz. Hiçbir farkı yok. Çalıştırırken ise tabi ki bir WP7
simülatörüne ihtiyacınız olacak. Simülatör zaten Developer Tools ile
birlikte bilgisayarınıza yüklenmiş oluyor o nedenle hemen F5'e basarak
uygulamayı çalıştırabilirsiniz. Simülatörü her defasında kapatmanıza
gerek yok, Visual Studio'dan da Debug'ı durdurup sonra aynı simülatör
kopyasını kullanmaya devam edebilirsiniz. Bu noktada dikkat etmeniz
gereken ufak bir detay var. Simülatör hali hazırda aslında bir sanal
makine yani :) yani aslında bir simülatör değil sanallaştırılmış bir WP7
işletim sistemi çalıştırıyorsunuz test esnasında. O nedenle eğer bir
sanal makine kullanıyorsanız sistem çalışmayacaktır :( Test fiziksel bir
makineye geçmeniz gerekecek ve unutmayın tüm bunlar yayınlanmamış
ürünler o nedenle normal kullandığınız işletim sistemi kopyalarına da
yüklememenizde büyük fayda var.

![Simülatörü seçerek
ilerleyebilirsiniz.](media/Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz/01052010_4.png)\
*Simülatörü seçerek ilerleyebilirsiniz.*

**Expression Blend tarafında neler oluyor?**

Expression Blend de kendi tarafında tabi ki WP7 desteği ile geliyor.
Özellikle App.xaml içerisinde gelen stillere sahip kontrolleri sahneye
yerleştirme konusunda Blend'in sağladığı kolaylıklar vazgeçilemez
şeyler. Artık bildiğiniz tüm Silverlight animasyonlar ve herşey bire bir
aynı şekilde WP7 üzerinde de çalışıyor.

![Expression Blend 4 içerisinde WP7
desteği.](media/Windows_Phone_7_Development_dunyasi_ve_ilk_uygulamamiz/01052010_5.png)\
*Expression Blend 4 içerisinde WP7 desteği.*

Önümüzdeki dönemde sizlerle WP7 üzerinde SL development konusunda
makalelerimi paylaşmaya devam edeceğim fakat tüm bu süreçte unutmamamız
gereken bir nokta var. WP7 şu anda hala bebek yaşlarını yaşıyor hatta
belki de cenin :) o nedenle özellikle Silverligt dünyasında daha önce
deneyimi olanlara söylemem gerek ki karşılaşacağınız eksikler olacaktır
ve bunların hepsinin son yayınlanan sürümde toparlanacağı söylemi söz
konusu. O nedenle şimdilik bu yapıyı bir "oyun alanı" olarak
değerlendirmeniz ve ileriki sürümlere kadar deneyim edinme amacıyla
kullanmanız doğru olur.

Hepinize kolay gelsin.

 

 


