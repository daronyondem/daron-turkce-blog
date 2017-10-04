---
FallbackID: 2540
Title: WebMatrix
PublishDate: 2/1/2011
EntryID: WebMatrix
IsActive: True
Section: software
MinutesSpent: 0
Tags: WebMatrix
old.EntryID: b116578a-f766-4ccc-ae0a-0b64dfcca612
---
Kod yazmanın bin türlü yolu var :) Bir yazıya da böyle başlanır mı? Eh
başladık artık. Şimdi ne demek istediğimi biraz daha anlatmaya
çalışiyim. Efendim en basit manzarada bugün Visual Studio'yu açıp "File
/ New Web Site" dediğimizde aşağıdaki seçenekler bizi karşılıyor.

![File / Web Site
dediğimizde...](http://cdn.daron.yondem.com/assets/2540/01012011_1.png)\
*File / Web Site dediğimizde...*

Görüldüğü üzere daha ilk adımda önümüzde birçok seçenek var. "Ne kadar
güzel. Daha ne istiyoruz ki?" tepkisini vermek mümkün olsa da aslında
hikayenin bir de diğer tarafı var. İşte bu yazımı takiben biraz da diğer
tarafa göz atacağız.

**Diğer taraf: Taze Yazılımcı'nın Çilesi**

Programcı dediğimiz insanın yetişme şekli ana iki dalda incelenebilir.
Birincisi, kişinin ÖSS puanı tutar :) isteyerek veya şansa girdiği
alanda okurken (ümit ediyoruz ki) isteyerek programcı olur. İkincisi ise
kendi kendine kişi kaşınır / depreşir ve herşeyi çözmeye çalışırken bir
bakar ki birşeyleri çözebilmeye başlamış :) Görüldüğü üzere bu
kişilerden ilki kendisine birşeyler hazır verildiği / öğretildiği için
şanslı gibi duruyor ama özünde her iki profilin de başlangıçta bir
depreşme sürecinin olduğu kesin.

Konuyu çok uzatıp çocukluğuma dönmeyeceğim :) (evet ben de ÇOK
depreştim) ama yazılım dünyasına yeni giren veya girmek isteyen biri
için yukarıdaki Visual Studio manzarasının çok sevecen bir yaklaşım
olmadığı kesin. Kişisel ilgi veya farklı nedenlerle bu sektöre / mesleğe
girmeyi düşünen birisinin "File / New" dediği anda karşısına bu kadar
çok seçenek gelmesi ciddi şekilde korkutucu. Emin olun ki o noktada
kimse "oh ne güzel bir sürü seçeneğim varmış" demeyecektir :)

**Konunun Özü : .NET platformu ile sıfırdan programcılığa giriş artık
çok da kolay değil!**

Artık taze bir programcı için hayat eskisi gibi kolay değil. Oradan,
buradan aldığı scriptleri birleştirip "Yahu bu nasıl çalışıyor acaba?"
"Acaba şu kodu kaldırsam ne olur?" gibi soruları deneme / yanılma
yöntemi ile öğrenmek eskisine göre .NET ortamında neredeyse mümkün
değil. Bu da uzun vadede doğal seleksyonla gelen yeni yazılımcıların
.NET ortamından değil de başka ortamlardan sektöre girmesi gibi bir
manzara yaratıyor. Tahmin edersiniz ki bu durum Microsoft için pek iç
açıcı değil!

**Sonuç: Enter The Matrix!**

Microsoft son dönemde Beta'ları ile yeni bir ürünün sinyallerini verdi.
**WebMatrix**! Sektörde eski olanlar eski WebMatrix IDE'sini
hatırlayacaktır. Baştan söyleyelim konunun o IDE veya konsept ile en
ufak bir alaksı yok :) Eski ismi ve konuyu unutun! WebMatrix tamamen
taze developer'lar için üretilmiş bir IDE ve platform! Tabi sadece
sektöre yeni girenler için değil hızlıca open source community
projelerini (Örn:Drupal, phpBB, WordPress) ayağa kaldırmak isteyen ve
belki de özelleştirmek isteyen web ajansları, basit web siteleri yapmak
isteyen yazılımcılar için de WebMatrix güzel bir ortam. Hemen bir ipucu
veriyim, WebMatrix içerisinde yeni syntax olan Razor, MVC3'deki Razor
için de erkenden deneyim birikimi sağlamanıza yardımcı olabilir.

![WebMatrix ilk
ekranı!](http://cdn.daron.yondem.com/assets/2540/01012011_1.jpg)\
*WebMatrix ilk ekranı!*

WebMatrix'i ilk açtığımızda karşımıza yukarıdaki ekran geliyor.
WebMatrix'in Beta 3 sürümünü buradan indirebilirsiniz. Yukarıdaki ekran
görüntüsünden de anlayabileceğiniz üzere WebMatrix'in birkaç ayağı var.
Birincisi ve belki de en kolayı hızlıca hazır open source projeleri
sisteminize kurarak özelleştirebiliyor olmanız.

![WebMatrix içerisindeki hazır
projeler!](http://cdn.daron.yondem.com/assets/2540/01012011_4.png)\
*WebMatrix içerisindeki hazır projeler!*

"Site From Web Gallery" dediğinizde yukarıdaki ekran sizi karşılıyor.
Buradan WordPress gibi herhangi bir projeyi seçerek otomatik olarak
makinenize indirilmesini ve gerekli kurulumların da yine otomatik olarak
yapılmasını sağlayabilirsiniz.

![WordPress sizin adınıza WebMatrix tarafından indirilip,
kuruluyor.](http://cdn.daron.yondem.com/assets/2540/01012011_2.jpg)\
*WordPress sizin adınıza WebMatrix tarafından indirilip, kuruluyor.*

Kurulum gerçekleştikten sonra php, asp veya asp.net ile yazılmış
herhangi bir open source projenin sourcelarını açarak WebMatrix
içerisinde doğrudan düzenlemeler yapabilirsiniz.

WebMatrix içerisinde tabi ki sıfırdan web sitesi yaratmak da mümkün.
Bunun için "Site From Template" seçeneğini seçip "Empty Site" profili
ile boş bir site alabilirsiniz. Artık sitenize yeni dosyalar ekleyebilir
ve yazılım geliştirme sürecine geçebilirsiniz. Şimdilik çok detayına
girmeden yeni bir web sitesi yarattığımızda web sitemize
ekleyebileceğimiz dosya tiplerine bir göz atalım.

![WebMatrix ile development yaparkenki
seçeneklerimiz.](http://cdn.daron.yondem.com/assets/2540/01012011_3.png)\
*WebMatrix ile development yaparkenki seçeneklerimiz.*

Ekran görüntüsünden de anlayabileceğiniz üzere :) seçenekler epey geniş.
**Classic ASP** olarak geçen eski ASP'nin yanı sıra **ASP.NET** desteği
de mevcut. Bunlara ek olarak ilginç bir seçenek de **PHP**. Neden
ilginç? Çünkü esasında bir Microsoft ürünündeyiz :) WebMatrix IDE'si
içerisinde rahatlıkla PHP siteleri de yaratabilir ve kodlarınızı
yazabilirsiniz. Yani artık Microsoft tarafında bir **PHP developer
IDE**'si de mevcut diyebiliriz. Son olarak WebMatrix tarafında en ilginç
nokta ise **CSHTML** ve **VBHTML** olarak geçen dosya türleri ve
programlama modeli. Önümüzdeki günlerde ek makalelerle CSHTML ve VBHTML
konusuna detaylıca göz atacağız :) Şimdilik hızlıca değerlendirmek
gerekirse; MVC3'te gelecek Razor view engine'in içine tüm programlama
yapısının da gömüldüğü özellikle ASP ve PHP yazılımcılarının ve yazılım
dünyasına yeni girmeyi düşünenlerin seveceğini tahmin ettiğim bir
yapıdan bahsedebiliriz.

**Yeni bir heyecan!**

WebMatrix gerçekten yeni bir heyecan! veya belki de eski bir heyecanın
taze bir kanla geri gelmesi :) Açıkçası bin türlü yorum yapılabilir.
Fakat ortada bir gerçek var ki yazının en başında bahsettiğim sorunları
çözeceği kesin. Kısa sürede, denemelerimde yeni gelen CSHTML ve VBHTML
syntax'ından ben çok keyif aldım. Önümüzdeki günlerde bu yeni syntax ile
ilgili deneyimlerimi ve detaylarını paylaşacağım :) Hatta minik bir
projede kullanmaya başladık bile! ;) Bakalım neler olacak.

Hepinize kolay gelsin.


