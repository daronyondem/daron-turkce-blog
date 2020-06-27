# Kaynak kodu paylaştıkça artar...
Açık kaynak kodu özellikle Microsoft taraflı yazılım geliştiricilerin
biraz endişe ile baktıkları bir alandır. Bu durum söz konusu
yazılımcıların Microsoft platformlarının kullanıyor olmalarının bir
sonucu olarak öngörülebileceği gibi belki de platform seçiminin asıl
nedeni de olabilir.

Kendi adıma geriye dönüp baktığımda .NET 1.1 ile beraber ASP.NET web
sitelerimizi birer DLL olarak koruyabilmemiz beni o günlerde çok
heyecanlandırmıştı. Uzun bir süre ürettiğimiz yazılımları [DEVELOAD
Yazılım & Tasarım](http://www.deveload.com)'da da bu şekilde dağıttık.
Çok defa kopyalanma durumları ile karşılaştık ve kopyaları devre dışı
bırakabildik. .NET 2.0 geldiğinde yeni compile seçenekleri aslında çok
daha heyecan vericiydi. Artık HTML kodlarını bile otomatik olarak DLL
içerisine gömebiliyorduk. Her şey saklanabiliyordu. Tabi ki "decompile"
seçenekleri her zaman var ama karşıdaki kötü niyetli kişinin işi epeyce
zorlaşmıştı.

Bugün baktığımda ise aslında yazılımlarımızın kopyalanmasını çok da
umursamadığımızı görüyorum. Compile seçeneklerinin zenginleşmesine
rağmen artık tüm yazılımlarımızı açık kaynak kodu ile dağıtıyoruz. Tabi
bunun belirli sebepleri var.

1.  Yazılımınızı kopyalamak isteyen zaten bir şekilde kopyalar.
2.  Açık kaynak kodu ile yazılımı müşterimize aktarmak bir gün biz
    destek veremediğinizde de başkalarından destek alarak hala
    yazılımımızı kullanmaya devam edebilmelerini sağlar ve esas
    anlamında müşteriyi kaybetmemiş oluruz.
3.  Verdiğimiz yazılımı kendileri geliştirebilirler. Geliştirilen
    kısımları beğenirsek müşterimizden satın alabiliriz :) Bir anlamda
    müşterilerimiz Ar-Ge departmanımız olur.

En çok korkulan noktalardan biri "*O kadar uğraştığım kodu alıp biraz
değiştirip aynı üründen satarlar!*" Bu korkunun tabi ki biraz haklı bir
yüzü de var. Özünde yasal olarak korunan kodunuzun biraz değiştirilerek
satılması durumunda söz konusu sahtekarlara dava açarak hakkınızı
arayabilirsiniz. Fakat bunun ülkemizde özellikle kobiler çerçevesinde
ufak çaplı projelerde ne kadar gerçekçi bir bakış açısı olabileceği
tartışılır. (Bakınız en ufak davanın ülkemizde kaç sene sürdüğüne).

Diğer yandan aslında farkında olmadığımız bir durum da var. Başkasının
yazdığı kodu anlamak ciddi algoritmalarda pek de kolay değildir. Karşı
tarafın epey bir emek harcaması gerekecektir. Sizin yazdığınız bir
yazılımı dokümantasyonları olmadan karşı tarafın geliştirmeye devam
etmesi epey zor olacaktır. Yani yazılımı alıp taklalar attırıp
satabilmek için aslında o yazılımı üretebilecek kadar da bilgi sahibi
olmak gerekir.

Bir diğer bakış açısında ise şöyle bir senaryodan bahsedebiliriz;
yazılımınızın kopyalanarak kullanıldığı yerlerde çıkan sorunlarda
insanlar ister istemez size ulaşacaktır. Böyle bir durumu biz
DEVELOAD'da bire bir yaşadık. Bizim yazılımımızı kullandığı ve sorun
yaşadığını söyleyen bir kurum telefonla ulaşarak destek istedi. Olayın
çok detayına girmeyeceğim ama sonuçta yazılımımızın gayri resmi
kopyasını kullanan söz konusu kurum şu an bizim müşterimiz. Bunu biraz
"reklamın iyisi kötüsü olmaz" sözüne de benzetebiliriz. Kopya olarak da
olsa yazılımınız kullanılması size artı sağlayacaktır.

Tüm bunları üst üste koyduğumuzda aslında açık kaynak koddan korkmanın
pek de lüzumu yok. Bu korkunun bir kısmının ülkemizdeki yasal işlemlerin
yavaşlığına bağlı olduğu bir gerçek ama bana sorarsanız pek de önemi
yok. Bilgi paylaştıkça artar, kaynak kodları da aynen :)



*Bu yazi http://daron.yondem.com adresinde, 2007-10-31 tarihinde yayinlanmistir.*
