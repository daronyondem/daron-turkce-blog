# Build Konferansı İkinci Gün Raporu
İtiraf etmek gerekirse her konferansta olduğu gibi :) Build'in de ikinci
günü ilk güne kıyasla sönük geçti. Sabah başlayan Keynote Windows Server
8, Azure, ASP.NET 4.5 etrafında şekillendi. Server 8 tarafında ben biraz
esnedim açıkçası :) Eminim ki ITPro tarafında olanlar için, sistem
uzmanları için heyecanlandırıcı birşeyler vardır ama bana biraz uzak bu
konular. Ben hemen ASP.NET 4.5 tarafındaki birkaç nokta ile başliyim
gördüklerimi anlatmaya.

![Debugging'de yeni bir
konsept!](media/Build_Konferansi_Ikinci_Gun_Raporu/DSC00166.jpg)\
*Debugging'de yeni bir konsept!*

İlk dikkatimi çeken debugging tarafında aslında Visual Studio'nun
sonraki sürümü ile alaklı bir nokta oldu. Görsel arayüz, arayüze ait
çalışma zamanında yaratılmış HTML ve bu HTML'in yaratılmasını sağlayan
arka plandaki kod, hepsi birbiri ile ilişkili bir şekilde navige
edilebiliyor. Yani görsel "render" edilmiş HTML arayüzde bir nesneye
tıklandığında onun yine render edilmiş HTML'deki tagi seçilip sonra da o
tagin yaratılmasına neden olan arka plandaki kod otomatik olarak seçili
geliyor. Bu neyin neden var olan hale geldiği gibi soruların çok hızlı
cevaplanabilmesini sağlıyor.

### Otomatik JavaScript ve CSS Minification

Bu gerçekten çok zekice ve güzel bir özellik! Artık projelerinizde
CSS'lerinizi ve JavaScript dosyalarınızı bir klasöre toplar ve bu
klasörün bir CSS veya JavaScript klasörü olduğunu belirtirseniz ASP.NET
tüm CSS'leri ve JavaScript tek bir dosya haline getirim tek bir request
ile istemciye gönderilebilmesini sağlamakla kalmıyor bir de bu kodları
minimize edip (içlerindeki boşlukları vs çıkarmak gibi) performansın
artmasını sağlıyor. Tüm bu mekanizmanın otomatik çalışıyor olması
gerçekten muhteşem!

### WebSockets

Keynote esnasında bu konunun çok derinlerine inilmese de WebSockets
desteğinin ASP.NET 4.5'te çok önemli bir yerinin olduğunun defalarca
altı çizildi.

![WebSockets desteği ASP.NET 4.5 ile
beraber...](media/Build_Konferansi_Ikinci_Gun_Raporu/DSC00169.jpg)\
*WebSockets desteği ASP.NET 4.5 ile beraber...*

Socketler zaten bildiğim şeyler, işte tam onların Web'den kullanılabilir
halleri ve sunucu ayağı ASP.NET ile beraber hazır olarak geliyor.

### Team Foundation Service on Azure

TFS hosted olarak da adlandırabileceğimiz TFS'in Microsoft tarafından
bir servis olarak sunulması modeli Azure üzerinden gerçekleştiriliyor.
Şu an için Build konferansına katılan herkese birer hesap verildi. Yakın
gelecekte genel bir betanın açılabileceğini tahmin ediyorum.

![İlk gündeki sır belli oldu : TFS in
Cloud!](media/Build_Konferansi_Ikinci_Gun_Raporu/DSC00197.jpg)\
*İlk gündeki sır belli oldu : TFS in Cloud!*

Böylece yukarıda gördüğünüz ve etkinliğin ilk günü her katılımcıya
dağıtılan süprizi de öğrenmiş olduk :) Bu sürpriz TFS on Azure
hesaplarının erişim bilgilerini içeriyormuş :)

### Duyurulan başka neler var!

Gün boyunca duyurulan fakat çok detayına girilmeyen birkaç daha oldu.
Onları da hemen aşağıda listeliyim :)

-   [ASP.NET MVC 4 Developer Preview](http://www.asp.net/mvc/mvc4)
-   [ASP.NET 4.5 Developer
    Preview](http://go.microsoft.com/fwlink/?LinkId=228707)
-   [Visual Studio 2011 Developer Preview (Şu an için sadece MSDN
    üyelerine)](http://msdn.microsoft.com/en-US/vstudio/hh127353) Cuma
    itibari ile [buradan](http://go.microsoft.com/fwlink/?LinkId=225709)
    herkese!
-   Team Foundation Server 2011 (Cuma
    [herkese](http://go.microsoft.com/fwlink/?LinkId=225714), şu an
    [MSDN](http://go.microsoft.com/fwlink/?LinkId=227374) üyelerine)

İşte ikinci gün de böyle geçti. Konferansın üçüncü gününde herhangi bir
Keynote vs yok. O nedenle herhangi bir ek duyuru da beklemiyorum. Özetle
artık heyecanlı günleri geride bıraktık :) Bundan sonra eldekilere
bakacağız. Yeterince malzeme var gibi inceleyecek.

Görüşmek üzere!



*Bu yazi http://daron.yondem.com adresinde, 2011-9-15 tarihinde yayinlanmistir.*
