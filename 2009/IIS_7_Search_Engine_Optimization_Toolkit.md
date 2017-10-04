---
FallbackID: 2366
Title: IIS 7 Search Engine Optimization Toolkit
PublishDate: 3/6/2009
EntryID: IIS_7_Search_Engine_Optimization_Toolkit
IsActive: True
Section: software
MinutesSpent: 0
Tags: IIS 7.0
old.EntryID: 4294ed70-c96c-45ed-b50a-66e330a1ae95
---
Arama Motoru Optimizasyonu konusu bazı durumlarda çok önemli bir hal
alabiliyor. Bu konuya ciddi yatırım yapan kişiler / kurumsal bulmak hiç
de zor değil. İşte tam da bu konuda Microsoft tarafından **IIS7** için
**Search Engine Optimization Toolkit** yayınlandı. Söz konusu Toolkit'i
IIS7 üzerine aşağıdaki adresten indirerek bilgisayarınıza
kurabilirsiniz.

[Search Engine Optimization Toolkit
(X86)](http://go.microsoft.com/?linkid=9668966)\
 [Search Engine Optimization Toolkit
(X64)](http://go.microsoft.com/?linkid=9668967)

**Peki neler var içinde?**

Toolkit içerisinde araçlara hızlı olarak ulaşmak için hemen IIS
Manager'a açarak çalışan bir sitenizin özelliklerinin vs ayarlandığı ana
sayfayı açabilirsiniz. Artık ASP.NET ve IIS gibi tabların yanı sıra bir
de "Search Engine Optimization" adında tab ile karşılaşıyor olmanız
gerekir. Söz konusu tab altında üç farklı komut göreceksiniz.

![IIS Manager içerisinde yeni
seçenekler.](media/IIS_7_Search_Engine_Optimization_Toolkit/03062009_1.jpg)\
*IIS Manager içerisinde yeni seçenekler.*

Gelin şimdi bu bölümlerin ne işe yaradıklarını tek tek inceleyerek bu
yeni Toolkit ile neler yapabileceğimize bir göz atalım. İlk olarak "Site
Analysis" adındaki kısım ile başlayalım ve hali hazırdaki bir sitemizin
analizini yaptıralım.

**Site Analysis**

Bu bölüme girdiğinizde karşınıza boş bir ekran gelecek. Burada önemli
olan IIS Manager'ın en sağında menüde nasıl komutlar ile karşılaşıyor
olmamız. Komutların ilki hemen dikkati çekiyor "**New Analysis**" diyor.
Hemen yeni bir analiz yaratmak için düğmeye basarak devam ediyoruz.
Analiz için yeni bir isim verdikten sonra hemen analizi
başlatabilirsiniz fakat unutmayın; IIS hemen sitenizdeki tüm linkleri
takip ederek tüm sayfaları incelemeye başlayacak. Bu süreç sitenizdeki
link yoğunluğuna göre çok uzun sürebilir ve bilgisayarınız tüm işlemci
gücünü kullanacaktır. Yeni bir analiz yaratırken karşınıza çıkan ekranda
"**Maximum Number Of Links**" ayarı ile kaç adet linkin
incelenebileceğini ve "**Maximum Download Size per Link**" ile de link
başına analiz için söz konusu adreslerden ne kadar verinin
alınabileceğini sınırlayabilirsiniz.

![SEO Toolkit'ten ilk
rapor.](media/IIS_7_Search_Engine_Optimization_Toolkit/03062009_2.gif)\
*SEO Toolkit'ten ilk rapor.*

Analiz bittiğinde ilk karşılaştığınız rapor en sık karşılaşılan
hataların bir listesini oluşturuyor. Bu hataların bazıların sadece
performans kaybına neden olurken bazıları ise doğrudan arama motorlarına
ait optimizasyon ayarları ile ilgili. Taradığım siteyi itiraf
etmeyeceğim :) fakat 3000 tane hedefi bozuk link olmasına şaşırmadım
desem yalan olur.

Tabi eğer amacınız hataları düzeltmek ise yukarıdaki rapor pek anlamlı
değil. Bu raporun haricinde Toolkit isterseniz en çok hata olan
sayfaların bir listesini de verebiliyor. Sayfa sayfa tek tek raporu
inceleyebilir ve her sayfada en çok kullanılan kelimelerin listelerini
dahi alabilirsiniz. Performans noktasında ise en yavaş açılan
sayfalarınızı listeleyen Toolkit belki de projenize hangi noktalarda
sorun olduğunu bulmanıza da yardımcı olabilir.

**Robots Exlusion**

Robots.txt dosyası arama motoru optimizasyonu ile ilgilenen herkesin
aşina olduğu dosyalardan biri. Bu dosya içerisinde kabaca arama
motorunun web sitenizde hangi adreslere gitmesini istediğini
istediğinizi veya aynı şekilde hangi adreslere gitmemesini istediğiniz
belirtebilirsiniz. İşte bu dosyaya IIS Manager içerisinde de artık
pratik bir şekilde yaratabilirsiniz. Hatta en güzel de bir önceki adımda
oluşturduğumuz Web Analizi'nde yakalanan adresler üzerinden de bu
ayarları yapabiliyor olmamız.

![Robots.txt dosyasını IIS Manager üzerinden
yaratalım.](media/IIS_7_Search_Engine_Optimization_Toolkit/03062009_3.gif)\
*Robots.txt dosyasını IIS Manager üzerinden yaratalım.*

**Sitemaps and SiteMap Indexes**

SiteMap mantığı zaten bildiğimiz bir mantık. Normal şartlarda benim
kişisel tavsiyem SiteMap dosyalarının özellikle veritabanına bağlı
projelerde doğrudan veritabanından bilgi alınarak oluşturulması hatta bu
bilginin yine otomatik olarak Robots.txt içerisine de eklenmesi. Böylece
robots.txt içerisinde SiteMap'in adresi bulunursa arama motoru da
SiteMap üzerinden ilerleyebilecektir. Tabi tüm bu yapıyı kodlamak yerine
veya belki de farklı teknolojiler ile hazırlanmış sitelerle uğraşmak
yerine IIS Manager üzerinden de yapabilirsiniz. Yine Robots.txt
tarafında olduğu gibi burada da bir SiteMap yaratırken bir önceki adımda
sitenin analizinde bulunan URL'leri kullanma şansınız oluyor. Son olarak
söz konusu SiteMap'i de Robots'a eklediğiniz düşünürsek herşey tamamdır.

**Sonuç**

Aslına bakarsanız hem SiteMap hem de Robots.txt kısmı aslında çok da öne
çıkan özellikler değiller. Zaten bu özellikler site analizine de bağlı
olmasa neredeyse hiçbir anlamı kalmayacak. Fakat Site Analyse özelliği
gerçekten güzel. Bu gibi analiz yapan ücretsiz araçlar bulmak mümkün
fakat benim gördüğüm kadarı ile Toolkit'in kalitesini yakalayan araçlar
genelde ücretli olarak satılıyor. Bu kapsam Toolkit hemen çalışmakta
olan herhangi bir IIS'e yüklenerek optimizasyonu girişebilir bir ortam
sağlıyor.

Hepinize kolay gelsin.


