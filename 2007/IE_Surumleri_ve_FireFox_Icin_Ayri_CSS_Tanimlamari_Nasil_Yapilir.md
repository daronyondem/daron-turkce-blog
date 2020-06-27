# Internet Explorer Sürümleri ve FireFox İçin Ayrı CSS Tanımlamarı Nasıl Yapılır?
Web tasarımları ile uğraşırken HTML ve CSS kodlarını düzenleme
aşamasında en sıkıntılı sorunlardan biri farklı tarayıcılarda aynı
görsel sonucu almaya çalışmaktır. Bazen bu sorunu çözmek hiç mümkün
olmayabilir. Sitemizin tüm görsel özelliklerini harici bir CSS
dosyasında tuttuğumuzu düşünürsek, aslında tek yapmamız gereken farklı
internet tarayıcıları için farklı CSS dosyaları hazırlayarak söz konusu
tarayıcılar ile sitemiz açıldığında uygun CSS dosyasını sayfamıza
ekliyor olmak.

Sayfamıza bir CSS dosyası eklemek için aşağıdaki kodu kullanacağız.

<span style="color: blue;">\<</span><span
style="color: maroon;">style</span><span style="color: blue;">\></span>\
<span style="color: blue;">@import</span><span> url("/ie.css");</span>\
<span style="color: blue;">\</</span><span
style="color: maroon;">style</span><span style="color: blue;">\></span>

Kod içerisinde **import** CSS komutunu kullanarak sayfaya adresini
belirttiğim CSS dosyasının yüklenmesini sağlamış oluyorum. Sıra geldi
tarayıcının Internet Explorer olup olmadığını anlamaya.

<span style="color: blue;">\<!</span><span style="color: green;">--[if
IE]\></span>\
<span style="color: green;">\< style\></span>\
<span style="color: green;">@import url("/ie.css");</span>\
<span style="color: green;">\</style\></span>\
<span style="color: green;">\<![endif]--</span><span
style="color: blue;">\></span>

Yukarıdaki kodun renginin yeşil olmasının nedeni aslında standart
tarayıcılar tarafından kodun işlenmeyeceği anlamına geliyor.
Başlangıcında **<span style="color: blue;">\<!</span>**<span
style="color: green;">**--** </span>ve sonunda **<span
style="color: green;">--</span>**<span style="color: blue;">**\>**
</span>olan bölgeler HTML kodlarında devre dışı bırakılmış sayılır. O
nedenle yukarıdaki kod FireFox'da çalışmayacak. Oysa Internet Explorer
kodun ilk kısmında yer alan <span style="color: green;">**[if IE]**
</span>şart komutunu algılayacaktır. Böylece eğer tarayıcı Internet
Explorer ise söz konusu CSS dosyası sayfaya eklenecek, değilse bu
satırlar devre dışı sayılacağı için eklenmeyecek. Ayrıca isterseniz
farklı Internet Explorer sürümleri için de kontroller yaparak farklı CSS
dosyaları ekleyebilirsiniz.

<span style="color: blue;">\<!</span><span style="color: green;">--[if
gt IE 5]\></span>\
<span style="color: green;">\< style\></span>\
<span style="color: green;">@import url("/ie.css");</span>\
<span style="color: green;">\</style\></span>\
<span style="color: green;">\<![endif]--</span><span
style="color: blue;">\></span>

Yukarıdaki kodun ilk satırında yer alan <span
style="color: green;">**gt** </span>komutu "**daha yukse**k" anlamına
geliyor. Yani eğer tarayıcının Internet Explorer sürümü 5'den yüksek ise
kod çalıştırılacaktır. Bunun gibi aşağıdaki farklı karşılaştırma
komutlarını da kullanabilirsiniz.

<span style="color: green;">gt - </span>daha yuksek\
<span style="color: green;">gte - </span>esit veya daha yuksek\
<span style="color: green;">lt - </span>daha dusuk\
<span style="color: green;">lte - </span>esit veya daha dusuk

Bana bu kadarı yetmez, ben kullanıcının tarayıcısının Safari, Camina,
Konqueror vs olup olmadığını da anlamak istiyorum diyorsanız çözüm
JavaScript. JavaScript ile kullanıcı tarafında gerekli kontrolleri
yaparak sayfanıza uygun CSS dosyasını ekleyebilirsiniz. Gerekli
kontrolleri yapacak olan uygun JavaScript fonksiyonunu
<http://www.quirksmode.org/js/detect.html> adresinde bulabilirsiniz.

Kolay gelsin...



*Bu yazi http://daron.yondem.com adresinde, 2007-5-10 tarihinde yayinlanmistir.*
