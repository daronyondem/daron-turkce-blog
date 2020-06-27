---
FallbackID: 2321
Title: "Bir proje hikayesinde yazılımcı, tasarımcı ve kullanıcı deneyimi üçlemesi!"
date: "2009-2-7"
EntryID: Bir_proje_hikayesinde_yazilimci_tasarimci_ve_kullanici_deneyimi_uclemesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0, WPF
old.EntryID: 795f9a3c-fac8-4cd4-b068-2d0bf5a0adaf
---
Her zaman söylerim; web yazılım dünyası "grafik tasarım yapmak zorunda
kalan yazılımcıların" kurbanı oluyor :) Kimseyi suçlamıyorum çünkü çok
açık ve net bir şekilde aslında hiçbir yazılımcının grafik tasarım da
yapmak zorunda kalmaktan memnun olmadığını biliyorum. Özetle kimse
isteyerek yapmıyor. Bazen de yazılımcının bu işi üstlenmemesi veya proje
gereği böyle bir "grafik tasarım" ihtiyacı yokmuş gibi davranılması
sonucu bu sefer de ortaya çıkan ürün gerekli değeri görmeyebiliyor.
Örnek mi istiyorsunuz? :)

![Bir yazılımcıdan arayüz
tasarımı!](media/Bir_proje_hikayesinde_yazilimci_tasarimci_ve_kullanici_deneyimi_uclemesi/06022009_1.jpg)\
*Bir yazılımcıdan arayüz tasarımı!*

Yukarıda görmekte olduğunuz program bir MultiPoint Paint yazılımı. Yani
özetle bir bilgisayara birden çok fare bağlayarak birden çok kişinin
aynı anda çizim yapabilmesini sağlıyor. Özellikle İlköğretim seviyesinde
öğrenci başına bir bilgisayar düşmediğini düşünürsek güzel bir
alternatif olabilir. MultiPoint programlama ile ilgili blogumda gerekli
makaleleri bulabilirsiniz.

Neyse konumuza dönelim. Gördüğünüz üzere yazılımın işlevsellik anlamında
bir sorunu yok. Her şey açık ve net. Değil mi? Peki aynı yazılımı bir de
bir grafik tasarımcının elinden geçtikten sonra inceleyelim ne dersiniz?

![Bir grafik tasarımcının arayüz
tasarımı...](media/Bir_proje_hikayesinde_yazilimci_tasarimci_ve_kullanici_deneyimi_uclemesi/06022009_2.jpg)\
*Bir grafik tasarımcının arayüz tasarımı...*

Nereden nereye? Değil mi? Gerçekten arada büyük fark var. Aslına
bakarsanız yukarıdaki yazılım ile aşağıdaki arasında işlevsellik veya
kod açısından hiçbir fark yok! Bahsini ettiğimiz yazılım bir WPF
uygulaması ve tasarımı **Expression Design** ile yapıldıktan sonra hali
hazırda programlanmış olan WPF uygulamasına tasarımın aktarılması
yeterli oldu. Bu süreçte arka planda yazılımcının yazmış olduğu hiçbir
kod değiştirilmedi!

Demek ki neymiş? Görsel tasarım gerçekten çok önemli. Görsel tasarım,
Kullanıcı deneyimi tasarımı ve programlama konuları bir projede topluca
düşünülmesi gereken konular ve maalesef ki bu konuların ayrı uzmanlar
tarafından değerlendirilmesi de şart!

İsterseniz yukarıdaki projeye geri dönelim ve süreci nasıl işledi biraz
da ondan bahsediyim. İlk olarak ilk görselde gördüğünüz yazılım bir
yazılımcı tarafından kodlanıyor ve arayüz görüldüğü üzere rezalet.
Sonrasında tasarımcı bu rezalet arayüz için **Expression Design** ile
alternatif bir tasarım hazırlıyor. Bir sonraki adımda ise hem
programlama tarafına hem de kullanıcı deneyimi tarafına hakim bir başka
uzman hazırlanan görsel tasarımı yazılıma uyguluyor! Bu uygulayan kişi
ise **Expression Blend** kullanarak eldeki hazır programlanmış projeyi
açarak tasarım öğelerini düzenliyor. Sonuçta ortaya süper bir yazılım
çıkıyor diyebiliriz.

Sizlerin de elinde bu gibi karşılaştırmalı örnekler varsa lütfen
yorumlarda paylaşın ;)  


