---
FallbackID: 1842
Title: "Silverlight ve ASP.NET AJAX ile Uygulama Geliştirme Webineri Sonrasında"
date: "2007-11-8"
EntryID: Silverlight_ve_ASP_NET_AJAX_ile_Uygulama_Gelistirme_Webineri_Sonrasinda
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, Expression Studio, Silverlight, Webiner
old.EntryID: 8b565c36-b033-41b1-8e39-ce6170bee9d5
---
Bugün **Microsoft Kurumsal Webiner** serisinin ilk webinerini
"**Silverlight ve ASP.NET AJAX ile Uygulama Geliştirme**" konusunda
gerçekleştirdik. Duyuruların yavaş yavaş yayılıyor olmasının yanı sıra
ilk webinerde 80 kişilik bir katılım ile güzel bir aktivite oldu.

Webinerin mini sunumunu :) ve demoya ait kaynak kodları aşağıdaki
adresten indirebilirsiniz.

[Webiner Sunum ve Demo Kaynak Kodları - 07112007\_1.zip (467.18
KB)](media/Silverlight_ve_ASP_NET_AJAX_ile_Uygulama_Gelistirme_Webineri_Sonrasinda/07112007_1.zip)

Webiner sonrası gelen soruları ve cevaplarımı buradan paylaşmak
istiyorum. Umarım faydalı olur.

**Soru**: Visual Studio 2008'e bu bu designer (Expression Blend) bağlı
gelecek mi?

**Cevap**: Visual Studio 2008'de JavaScript Intellisense desteği
gelecek. Design kısmı şu anki ile aynı. Designer olarak Expression Blend
2'yi ayrı bir program olarak kullanmanız gerekecek.

**Soru**: Expression Studio, Blend, Design, Web olsun tamamen Visual
Studio'yu görsel tasarım açısından desteklemek üzere çıkarılmış bir
platform mudur? Ve bunlarda yapabileceklerimiz sadece görsel tasarımdan
mı ibarettir? Kod yazamıyor muyuz?

**Cevap**: Expression serisi aynen bahsettiğiniz gibi tasarımcılara
yöneliktir. Kod yazmak için Visual Studio kullanmak şart. Kolay gelsin.

**Soru**: Bu Expression Designer 2008'de de bu şekilde mi kullanılacak
yoksa daha entegre olacak mı?

**Cevap**: Expression Blend 2 içerisindeki projeler direk VS 2008 ile de
açılabiliyor. Solution Explorer içerisind e herhangi bir dosyaya sağ tuş
tıklayınca "Edin in VS 2008" opsiyonu var.

**Soru**: 2008 ne zaman RTM olacak?

**Cevap**: Bu ay sonu tahmin edilen süre :)

**Soru**: Animasyon ve benzeri şeyleri eklerken JavaScript kısmı bu
kadar manüel olacak mı 2008'de de ?

**Cevap**: Intellisense desteği gelecek. Bu kadar manüel değil :) AJAX
ile ilgili de çok hoş JavaScript Intellisense destekleri yolda.

**Soru**: Peki teşekkür ederim :)

**Cevap**: ben teşekkür ederim ;) iyi çalışmalar

**Soru**: Silverlight hiç bilmiyorum. Sorularım biraz saçma kalabilir.
XAML'i değiştirdiğimiz anda mı içerik değişiyor yoksa bekleme süresi var
mı? Kendi içinde her hangi bir event işlemi sırasında kendi okuduğu
XAML'i değiştirebiliyor muyuz? Değiştirebiliyorsak değiştirdiğimiz anda
aynı şekilde işlemine devam ediyor mu?

**Cevap**: XAML'i değiştirdiğiniz anda sayfayı veya Silverlight
animasyon nesnesini baştan yüklemeniz gerekir. Başka bir seçenek olarak
arka planda asenkron XAML yükleyerek animasyonu aktarabilirsiniz.
Herhangi bir event da XAML ile nesne ekleyip çıkarabiliyorsunuz. XAML'de
değişiklik olunca kaynaktan tekrar yükleyerek sayfaya yansıtmanız gerek.

Katılan herkese teşekkürler. Hepinize kolay gelsin.


