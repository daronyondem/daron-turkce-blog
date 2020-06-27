---
FallbackID: 2334
Title: "Internet Explorer 8.0 içerisinde AJAX ile geri ve ileri butonlarına dair çözüm."
date: "2009-3-14"
EntryID: Internet_Explorer_8_0_icerisinde_AJAX_ile_geri_ve_ileri_butonlarina_dair_cozum
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: d8bb0d05-f831-4f81-99f2-f4bca72a8748
---
# Internet Explorer 8.0 içerisinde AJAX ile geri ve ileri butonlarına dair çözüm.
Web sitelerinde AJAX kullanımı gün geçtikçe artıyor ve neredeyse artık
AJAX kullanılmayan sitelere demode gözüyle bakmaya başladık. Bu
çerçevede AJAX’lı sitelerde yaşadığımız en büyük sorunlardan biri
tarayıcını geri ve ileri düğmelerinin çalışmaması. Konu ile ilgili
farklı tarayıcılar için farklı taktiksel çözümler geliştirilmiş olsa da
artık IE 8 ile beraber standart bir çözüm de geliyor.

AJAX ile sayfaları programatik olarak yenilediğimizde sayfa adresinin
değişmiyor olması aslında sorunumuzun esas nedeni. Eğer sayfanın
adresini değiştirebilseydik tarayıcı da bu adresi kendi tarayıcı
geçmişine ekleyebilecekti. Tam da bu noktada web adreslerinin sonuna
ekleyebildiğimiz çapalar akılımıza geliyor. Örneğin **default.aspx\#1**
ile **default.aspx\#2** aslında aynı sayfa olsalar da ayrı adresler
şeklinde tanımlanıyor. Bu adresin çapa kısmı, yani \# işaretinden
sonraki kısmı değişse de tarayıcı sayfayı baştan yüklemeyecektir çünkü
konsept olarak aynı sayfa içerisinde farklı bir konum arayacaktır.
Çapaların bu özelliğinden faydalanarak normal kullanımlarının yanı sıra
sadece adres çubuğundaki adresi değiştirebilmek için de kullanabiliriz.
Peki tüm bunları nasıl yapacağız?

**[JavaScript]**

window.location.hash = "birsey";

Yukarıda gördüğünüz kod AJAX kullandığımız web sitelerinde hayatımızı
kurtaracak olan kodun sadece ufak bir parçası. Doğrudan
**window.location.hash** değerine aktardığınız değerler artık
tarayıcının adres çubuğunda \# işaretinden sonrasına eklenecek ve hash
değeri her değiştirildiğinde bir önceki adres de tarayıcı geçmişine
kaydedilecek. Böylece hızlı bir şekilde AJAX sitemizde ileri ve geri
düğmelerinin aktif hale gelmesini sağlayabiliyoruz. Fakat bir sonraki
adımda kullanıcının ileri veya geri düğmelerine bastığını da algılamamız
gerekiyor ki duruma göre gerekli AJAX isteklerini tekrar yaparak sayfayı
eski haline getirebilelim. Unutmayın sayfa hiçbir şekilde tekrar
yüklenmeyecek o nedenle sayfayı eski haline getirmek de tamamen bize
kalıyor. Hash değerine daha önce söz konusu sayfaları tanımlayacak bir
değer verdiyseniz kullanıcı tarayıcıda gezerken gidilmek isteyen
sayfanın hash değeri size verildiğinde sayfanın eski halini
üretebilmeniz hiç de zor olmayacaktır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span> <span
style="color: red;">onhashchange</span><span
style="color: blue;">="HashChanged();"\></span>

Yine IE 8 ile beraber gelen AJAX navigasyon sisteminin bir parçası da
kullanıcının tarayıcı içerisinde ileri veya geri düğmelerini
kullandığında bizi haberdar edecek olan event-listener. Standart şekli
ile herhangi bir HTML sayfada yer alan Body tagının **onhashchange**
event’ına özel bir JavaScript listener fonksiyonu ekleyebilirsiniz.
Böylece artık ileri veya geri navigasyonlarında bizim **HashChanged**
metodumuz çalıştırılacak. Peki ne yapacağız **HashChanged** içerisinde?
Hash değiştiğinde göre yeniden **window.location.hash** üzerinden yeni
hash değerini alıp ona uygun AJAX isteklerini gerçekleştirerek siteyi
eski haline getirmemiz gerekiyor.

Tüm bu manzara içerisinde önemli olan noktalardan biri de AJAX
sitelerinde yaşadığımız bir diğer sorunu daha gidermiş olmamız.
Bildiğiniz üzere AJAX sitelerinde sitenin farklı durumlarına ait farklı
URL adresleri de bulunmaz. Oysa bizim \# implementasyonu ile beraber
artık sitemizin **hash** bilgisini değiştirdiğimiz her noktada yeni bir
sayfa ve URL de yaratmış oluyoruz.

*Not: Bu sistemi ASP.NET AJAX ile beraber kullanabilmeniz için ya
ScriptManager'ın tüm requestlerini JavaScript ile yakalamanız ya da
sadece PageMethod kullanmanız gerekecektir. Daha kolay bir entegrasyon
için maalesef ASP.NET 4.0'ı beklememiz gerekecek.*



*Bu yazi http://daron.yondem.com adresinde, 2009-3-14 tarihinde yayinlanmistir.*
