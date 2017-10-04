---
FallbackID: 1731
Title: CSS Optimizasyonu
PublishDate: 23/4/2007
EntryID: CSS_Optimizasyonu
IsActive: True
Section: software
MinutesSpent: 0
Tags: CSS
old.EntryID: 7d486108-9d61-4b41-9034-91eded6de3a5
---
CSS'in varlığı başlı başına bir optimizasyon ihtiyacından kaynaklanır.
HTML kodları arasında onlarca defa aynı görsel tanımlamaları yapmama
amacıyla CSS kullanırız. Böylece hem iş yükümüzü azaltmış oluruz hem de
istemci tarafına gönderilen toplam veri azalır ve performans artar. Aynı
durum CSS içerisinde de söz konusu. Yazdığımız CSS kodunun ne kadar
doğru ve kısa olduğu performans açısından önemli, fakat diğer yandan bu
optimizasyon bazen kodun okunabilirliliğini de azaltabiliyor.\

İki arada bir derede kaldığımız bu noktada projeler yayına girmeden CSS
kodlarını optimize eden ek yazılımlar kullanılıyor. Projeye ait CSS
dosyası optimizasyon işleminden geçirildikten sonra internet ortamına
aktarılıyor, oysa geliştiricilerin üzerinde çalıştıkları dosya ise eski
optimize olmayan, kolay okunabilir dosya oluyor. Bu durumun tek kötü
yanı üzerinde sıkça değişiklik yapılan projelerde her yükleme öncesi ek
olarak optimizasyon işleminin yapılmasının gerekmesi.

Uzun lafın kısası, esasen benim bu yazıyı yazmamın nedeni sizi
[www.cleancss.com](http://www.cleancss.com/) ile tanıştırmak. Siteye
direk kes-yapıştır yöntemi ile CSS dosyanızı aktarabileceğiniz gibi
internet ortamındaki CSS dosyanızın konumu belirterek de
kullanabilirsiniz. Sistemin yaptığı işlem tüm CSS kodlarınızı kontrol
ettikten sonra seçtiğiniz seçeneklere uygun olarak kodunuzu optimize
etmek. Optimizasyon işlemi sonrası yeni CSS kodunuzu sitenin alt
tarafında bulabileceğiniz gibi tüm yapılan değişikliklere ait
açıklamalar da bir liste olarak sıralanıyor. Benim yaptığım denemelerde
%30-%40 arası değerlerde optimizasyon yapılabildi. Başarılı fakat
yeterli değil.

Aşağıdaki CSS kodumu optimizasyon motoruna aktardım.

<span style="color: rgb(163, 21, 21);"> span</span><span> {</span>\
 <span style="color: red;"> border-width</span><span>:<span
style="color: blue;">2px</span>;</span>\
 <span style="color: red;"> border-color</span><span>:<span
style="color: blue;">black</span>;</span>\
 <span style="color: red;"> border-style</span><span>:<span
style="color: blue;">dashed</span>;</span>\
 <span> }</span>

Aldığım sonuç şu şekilde oldu;

<span style="color: rgb(163, 21, 21);"> span</span><span> {</span>\
 <span style="color: red;"> border-width</span><span>:<span
style="color: blue;">2px</span>;</span>\
 <span style="color: red;"> border-color</span><span>:<span
style="color: blue;">\#00</span>;</span>\
 <span style="color: red;"> border-style</span><span>:<span
style="color: blue;">dashed</span>;</span>\
 <span> }</span>

Optimizasyon amacıyla bu CSS sınıfı içerisinde yapılan tek değişiklik
renk değeri ile ilgili. Yüzlerce renk tanımladığımız bir CSS dosyası
içerisinde bu ve bu gibi değişiklikler biriktiğinde ciddi bir fark
oluşuyor. Diğer yandan [www.cleancss.com](http://www.cleancss.com/)
adresindeki araç CSS dosyası içerisinde ikişer defa tanımlanmış CSS
sınıflarını kontrol etmek gibi ek özelliklere de sahip. Fakat sadece CSS
optimizasyon araçlarını kullanmak yeterli değil. Gelin bir de benim
yaptığım optimizasyon sonrası yukarıdaki CSS sınıfının son haline
bakalım.

<span style="color: rgb(163, 21, 21);"> span</span><span> {</span>\
 <span style="color: red;"> border</span><span>:<span
style="color: blue;">2px black dashed</span>;</span>\
 <span> }</span>

İşte bu kadar. Yukarıdaki CSS sınıfımı ek olarak CSS optimizasyon
motoruna aktardığımda oluşan son hali de aşağıdaki gibi.\

<span style="color: rgb(163, 21, 21);"> span</span><span> {</span>\
 <span style="color: red;"> border</span><span>:<span
style="color: blue;">2px \#00 dashed</span>;</span>\
 <span> }</span>

Sonuç muhteşem. En yukarıdaki CSS sınıfımızdan buralara geldik. Benim
tavsiyem CSS optimizasyon araçlarını kullanmanızdan yana. Çok kısa
sürede ciddi optimizasyon sağlayabiliyorlar fakat maksimum optimizasyon
için sizin de kodlarınıza bir göz atmanız şart.\


