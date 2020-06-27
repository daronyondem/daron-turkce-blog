# Silverlight 2.0 Beta 2 ve Expression Blend 2.5 July Preview yayında!
Hafta sonuna gelmesi gerçekten muhteşem :) Ne kadar heyecanlı olduğumu
anlatamam. Silverlight 2.0 Beta 2 ile beraber gelen yenilikler ve diğer
Silverlight 2.0 yazılarımı sizlerle paylaşmaya devam edeceğim. Fakat
onun öncesinde gelin hızlı bir şekilde Silverlight 2.0 Beta 2 ile
beraber gelen yeniliklere bir göz atalım.

-   Runtime içerisinde daha çok kontrol var!
-   **Go-Live** lisansı geldi!

İlk olarak Silverlight 2.0 Beta 1 ile beraber Plug-In haricinde gelen ve
her seferinde DLL dosyalarını XAP paketimize eklemek zorunda kaldığımız
kontrollerin çoğunun artık Plug-In'e dahil edildiğine dair müjdeyi
vermem gerek. Böylece artık Silverlight 2.0 uygulamalarımızın XAP
paketleri çok daha küçük olacak. Diğer yandan Silverlight 2.0 Beta 2 ile
beraber artık Go-Live lisansı da geliyor, yani artık yavaş yavaş ticari
uygulamalara geçiş yapabilir, hazırladığınız uygulamaları
müşterilerinize sunabilirsiniz. Tabi ileriki sürümlerde yine altyapıda
değişiklikler olacaktır, ürün RTM olana kadar bu risk geçerli olacak.

-   **TabPanel** kontrolü geldi
-   **Calendar** kontrolünde yenilikler var! (Çoklu gün seçimi artık
    mümkün)
-   WPF'deki **Control Templating** desteği Expression Blend 2.5 June
    Preview içerisinde

**Control Templating** muhteşem bir esneklik sağlıyor. Bu konuda daha
önce bir makale yazmıştım fakat herşeyi XAML kodundan elle yapmak
zorunda kalmak pek hoş değil. Artık **Expression Blend 2.5**'in yeni
sürümü olan **June Preview** ile beraber Silverlight 2.0 projeleri için
de Control Templating desteği geliyor.

-   TextBox içerisinde Copy/Paste desteği
-   Tam ekran uygulamalarda klavyedeki oklar, tab, enter, "home", "end",
    boşluk, "pageup" ve "pagedown" tuşlarına ek destek. Eski sürümlerde
    hiçbir tuş desteklenmiyordu.
-   Adaptive Streaming
-   DRM

Video konusunda "**adaptive streaming**" gerçekten çok önemli. Otomatik
olarak istemcideki işlemci kullanımını ve bant genişliğine göz önüne
alarak hedef video kaynağında varsa farklı bitrate ayarlarındaki
videoları otomatik olarak seçebilen bu sistem çok değerli bir altyapı
sunuyor. Diğer yandan **DRM (Digital Rights Management)** da artık
karşımızda; **Windows DRM** ve **PlayReady DRM** destekleniyor.

-   **Visual State Manager**

Muhteşem bir sistem! Artık her kontrolün farklı durumlarında ne şekilde
gözükebileceğini tek tek Expression Blend 2.5'in arayüzünden
ayarlayabiliyorsunuz. Örneğin bir Button'un MouseOver durumunda nasıl
gözükeceğini ayarlıyorsunuz ve farklı durumlar arasında geçiş
animasyonlarını da sistem otomatik olarak sizin için yapıyor. Eskiye
kıyasla kontrollerin özelleştirilmesi gerçekten kolaylaştıracak olan bu
sistem ileride WPF'e de aktarılacak. Aslında Silverlight WPF'in torunu
olmasına karşın yine ilk olarak Silverlight içerisinde karşımıza çıkan
ve sonradan WPF'e aktarılacak bir sistem ile karşı karşıyayız :)

-   Cross-Domain Request desteği
-   WCF üzerinden Duplex Bağlantı

Beta 2 ile beraber hem HTTP hem de Socket programlamada cross-domain
desteği policy XML dosyaları aracılığı ile sağlanabiliyor. Ayrıca hali
hazırda Flash'ın da kullanmakta olduğu XML policy dosyalarına destek
bulunuyor. Sunucu tarafında Push veri alımı ile ilgili sadece Socket
programlama bir alternatif olarak gözükürken artık WCF servislerinde de
aynı yapı kullanılabiliyor.

-   .NET Framework 3.5 SP1 ile beraber gelecek olan ADO.NET Data
    Servisleri'ne tam destek
-   LINQ to JSON

Yeni çıkan ASP.NET 3.5 AJAX kitabımda da bahsetmiş olduğum LINQ
sorguları ile JSON verilerinin sorgulanmasına ait sistemin bir benzeri
Silverlight içerisinde de entegre edildi. Böylece hali hazırda JSON
formatında veri kaynağı sağlayan servislerden gelen verileri çok daha
rahat sorgulayabileceğiz.

-   **DataGrid Yenilikleri** : Kolon bazlı sıralama yapabilme, sürükle
    ve bırak tekniği ile kolonların yerlerinin değiştirilebilmesi.
-   **Isolated Storage** içerisinde uygulamaların sakladıklarına artık
    son kullanıcılar da Silverlight uygulamalarında sağ tuş ile
    tıklayarak gelen menüden ulaşabilecekler.

Tüm bu yeniliklerle ilgili ayrı ayrı makaleleri tabi ki sizlerle
paylaşıyor olacağım. Bu gerçek bir yenilik ziyafeti :) developer olmayı
işte bu yüzden çok seviyorum ;)

**Download adresleri:**

[Silverlight 2.0 Beta 2
Runtime](http://www.microsoft.com/silverlight/handlers/getSilverlight.ashx?v=2.0)
(4,66MB)\
 [Microsoft Silverlight Tools Beta 2 for Visual Studio
2008](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=50a9ec01-267b-4521-b7d7-c0dba8866434&u=http%3a%2f%2fdownload.microsoft.com%2fdownload%2f1%2fd%2fd%2f1dd9ba72-9023-42f8-8ddf-abbd2f87649c%2fsilverlight_chainer.exe)
(84,3MB)\
 [Expression Blend 2.5 June
Preview](http://download.microsoft.com/download/8/5/8/858627dc-9aa3-4f86-bb3d-729204927da3/Blend.en.msi)
(32,3MB)



*Bu yazi http://daron.yondem.com adresinde, 2008-6-8 tarihinde yayinlanmistir.*
