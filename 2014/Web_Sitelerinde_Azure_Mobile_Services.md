---
FallbackID: 2911
Title: Web Sitelerinde Azure Mobile Services
PublishDate: 23/7/2014
EntryID: Web_Sitelerinde_Azure_Mobile_Services
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, Azure Mobile Services, HTML, HTML5, JavaScript, Windows Azure
---
Azure Mobile Services konusunda bundan önce sizlerle [bazı videolar
paylaştım, webcastler
yaptık](http://daron.yondem.com/tr/tag/Azure_Mobile_Services) ama itiraf
etmek gerekirse Azure Mobile Services kullanımını pek de Mobile dışında
düşünmedik. Zaten aslına bakarsanız Microsoft da böyle düşünmüyor :)
Fakat ürünün ismini bir kenara koyar ve ne yaptığına bakarsak kaba
tabiri ile bize REST üzerinde basit ve hızlı olarak data erişimi
sağlıyor. Tabi ki data erişimi dışında Mobile Services'da daha bir çok
component var ama dedim ya, kaba bir şekilde ürünün olayı bu. Bu noktaya
kadar aynı fikirdeysek şimdi geçelim hikayenin diğer açısına.

Geçenlerde bir web sitesi projesi ile ilgili düşünürken sitenin tüm veri
erişimini REST üzerinden bir API set ile tasarlamaya karar verdim.
Genelde bu gibi mimari tasarımları pek sevmem. Neden mi? Siteye giren
ziyaretçinin ilk yaptığı request ile ona ihtiyacı olan veriyi yollamak
yerine ihtiyacı olan veriyi alabileceği bir uygulama yolluyor olmak ve
sonrasında ikinci, üçüncü HTTP talepleri ile esas ziyaretçinin görmek
istediği şeyi vermek bence kullanıcı deneyimi açısından inanılmaz
anlamsız ve saçma. Böyle projelerde bulundum :), gördüm, saçma. Yanlış
olmasın, özellikle bahsettiğim saçmalık daha ilk sayfa açıldığında
yüklenecek verinin sonradan async API call ile yüklenmesi. Bu durum
özünde bir "mimari moloz sendromu" :) Ah şu "Mimari Moloz Sendormu"
yazısını yazmış olsaydım link verirdim şimdi. Neyse, kısmet :) Konumuza
dönersek, peki ben neden bu bahsettiğim web projesinde işleri böyle
yapiyim dedim? Aslında nedeni çok da önemli değil çünkü konumuz o değil
ama kabaca anlatmak gerekirse söz konusu web sitesinin full HTML olması
gerekiyordu :) Dedim ya, uzun hikaye.

### Yani?

Şimdi geleceğim nokta şudur ki, tüm veri kaynağını vs REST üzerinden
siteye beslemeye karar verince bir baktım normal bir asp.net projesinden
daha kompleks (doğal olarak) istemci-sunucu kafasında bir yapı nedeniyle
iş yükü gereksiz artıyor. API yaz, tüket vs... ohooo yapacağımız bir web
sitesi zaten ve malum HTML'den öteye bile geçemiyor. İşte o anda aklıma
aslında tam da bu işleri çözen yani otomatik olarak API açan ve
üzerinden veri erişimi vs sağlayan Mobile Services geldi. Dedim ya
normalde Mobile Services mobil uygulamalar için tasarlanmış bir yapı ama
sonuç itibari ile bu Mobile Services HTML5 ile programlanan Windows8
Tablet uygulamalarında da kullanılabiliyor ve tam da bu nedenle bir
JavaScript SDK'yi var!! İşte bu!

### Service erişimi anahtarı... Hmm...

Hayalimde taşlar çok güzel yerli yerine oturuyordu ki hemen aklıma
Mobile Services endpoint erişimi için kullandığımız management key'ler
geldi. O key'leri normal şartlarda biz mobil uygulamanın içine gömüyoruz
ve doğrudan erişilemiyor. En azından kolay yoldan erişilemiyor diyelim.
Bir web sitesi üzerinden Mobile Services kullandığımızda ise söz konusu
key/anahtar apaçık JavaScript kodunun içerisinde durmak zorunda. Bir an
hayallerim söndü. Sonra bir silkelendim :) Azure Mobile Services ile
daha önce ilgilenenler hatırlayacaktır her entity set, table için
permission / izinler ayarlayabiliyoruz. O ayarlar listesinde "Everyone"
diye bir seçenek var :) O seçeneği kullanmak mobil uygulama
geliştirirken pek de aklımıza gelmiyor çünkü zaten key'i uygulamanın
içine gömüyoruz ve her tür erişimi "key ile erişilebilir" diye
ayarlıyoruz. Oysa web ortamında "Everyone" olarak ayarlı bir tablo çok
daha işimizi görebilir ve keyi alenen paylaşmaktan kurtuluruz. Tabi bu
noktada aklınıza "Key yok herkes erişecek aman Allah'ım" gibi korku
cümleleri gelebilir :) Tamam da zaten REST API değil de normal web
sitesi üzerinden HTML ile sunsaydık veriyi herkes erişemeyecek miydi?
Pelki REST olduğu için :) otomatik kötüye kullanımı bilenler için
kolaylaştırmış oluyoruz fakat konsept olarak herkesin ulaşmasını
istediğiniz veriyi ne formatta açacaksanız açın sonuç itibari ile
herkese açacaksınız :) "Everyone" candır diyerek devam edelim. Böylece
"key"i JavaScript'in içinde bulundurmaktan kurtulduk.

```html
<script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
<script src='http://ajax.aspnetcdn.com/ajax/mobileservices/MobileServices.Web-1.1.0.min.js'></script>

<script type="text/javascript">
    var client = new WindowsAzure.MobileServiceClient('https://darondeneme.azure-mobile.net/');
    todoItemTable = client.getTable('todoitem');
    var sorgu = todoItemTable.where({ complete: false });
    sorgu.read().then(function (todoItems) {
        for (var i = 0; i < todoItems.length; i++) {
            alert(todoItems[i].text)
        };
    }, hataolursa);
    function hataolursa(hata) {
        var text = hata + (hata.request ? ' - ' + hata.request.status : '');
        alert(text);
    }
</script>
```

Yukarıdaki kod süper basit bir şekilde Azure Mobile Services SDK ile
beraber gelen Windows 8 HTML5 örneklerinden çırptığım bir kod :)
MobileServices Client'ı oluştururken key vermek için kullanılan ikinci
parametreyi tamamen sildim. "todoItem" adındaki mobile services
varsayılan örneği ile gelen tabloya da "Everyone" okuma izni verdim.

![Herkese okuma izni
verdik.](media/Web_Sitelerinde_Azure_Mobile_Services/mobileservices_1.png)
*Herkese okuma izni verdik.*

İşte bu kadar :) artık Azure Mobile Services SDK içerisindeki Windows 8
HTML uygulama geliştirmek için yer alan tüm kaynakları kullanabilir, tüm
JavaScript SDK'yi kullanabilir ve her türlü veri erişimizi Mobile
Services üzerinden yapabilirsiniz. Özetle web sitenizin arka planı
tamamen Azure Mobile Services olmuş oluyor.

### Her şey güzel gibi....

İtiraf etmek gerekirse Azure Mobile Services'ın bu şekilde
kullanılabileceğinin Microsoft'un aklına geldiğini bile sanmıyorum.
Materyallere, dokümanlara vs baktığınızda Azure Mobile Services'ın web
sitelerinde kullanımından bahsedildiğini hiç görmedim. Zaten ürünün adı
da belli :) Mobile Services. Peki bu işin altından bir sıkıntı çıkar mı?
Tek bir olası sıkıntı var; maliyet. Mobile services ücretsiz sürümünde
500.000 API erişimi limiti var. Yani sitenizde bir ayda 500.000 kişi
girip sadece ana sayfanıza baksa bile bu limite dayanabilirsiniz. 1.5
milyon API Call ise kabaca 25\$. Kesinlikle ucuz değil. Mobile
uygulamlarda Mobile Services kullanımı bu fiyatlandırmada çok daha karlı
oluyor çünkü o marketteki getiri potansiyeli normal web ortamından daha
farklı ve mobile services'ın ölçeklenebilirliği göreceli daha değerli
bir pozisyonda oluyor. Normal web sitesi kullanımında ise insan biraz
daha teredütte kalıyor. İlla sitenizin verisini API üzerinden
verecekseniz ve aceleniz varsa, yeterli yazılım geliştirme kaynaklarınız
(zaman vs) yok ama bütçeniz varsa Mobile Services süper uygun bir
seçenek olabilir. Bir diğer senaryo ise zaten hali hazırda Mobile
Services kullanan mobil uygulamalarınız varken web sitenizi de buradan
besleyebilmek olabilir. Böylece mobil uygulaması olan web sitesi olmayan
çoğu startup web sitelerini daha hızlı bir şekilde release etme şansına
sahip olabilir. Daha eminim ki benim aklıma gelmeyen bir çok senaryo
vardır ama genel olarak maliyeti akılda tuttukça ben başka bir olası
sorun ile karşılaşılabileceğini düşünmüyorum.

Görüşmek üzere.


