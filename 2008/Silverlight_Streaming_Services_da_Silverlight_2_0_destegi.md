---
FallbackID: 2003
Title: "Silverlight Streaming Services'da Silverlight 2.0 desteği."
date: "2008-3-28"
EntryID: Silverlight_Streaming_Services_da_Silverlight_2_0_destegi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 38ad98af-ef3f-463c-96dc-99e3b6a735a5
---
# Silverlight Streaming Services'da Silverlight 2.0 desteği.
Yavaş yavaş Silverlight 2.0 yazılarına başladığımız bugünlerde derinlere
inmeden önce **Silverlight 2.0** konusunda **Silverlight Streaming
Services** altyapısı nasıl kullanabileceğimize değinmek istiyorum. Daha
önce bu konuda Silverlight 1.0 için [detaylı bir
yazı](http://daron.yondem.com/tr/post/e27332ab-82c3-4084-a220-181fb7f0b885)
hazırlamıştım.

Silverlight ile ilgili Microsoft tarafından sağlanan ücretsiz bir
barındırma hizmeti olan **Silverlight Streaming Services** içerisinde
**Silverlight 2.0** uygulamalarınızı yayınlayabilmeniz için bazı ufak
ayarlara dikkat etmeniz gerekiyor. Silverlight 1.0'dan farklı olarak bu
sefer **manifest.xml** dosyası içerisinde aşağıdaki yapının bulunması
şart.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>2.0<span
style="color: blue;">\</</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">source</span><span
style="color: blue;">\></span>Uygulamam.xap<span
style="color: blue;">\</</span><span
style="color: #a31515;">source</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">width</span><span
style="color: blue;">\></span>600<span
style="color: blue;">\</</span><span
style="color: #a31515;">width</span><span style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">height</span><span
style="color: blue;">\></span>500<span
style="color: blue;">\</</span><span
style="color: #a31515;">height</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">background</span><span
style="color: blue;">\></span>white<span
style="color: blue;">\</</span><span
style="color: #a31515;">background</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">isWindowless</span><span
style="color: blue;">\></span>false<span
style="color: blue;">\</</span><span
style="color: #a31515;">isWindowless</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

Gördüğünüz gibi artık harici JavaScript linklemek ve hangi JavaScript
dosyasının önce çalışacağını belirtmek gibi bir derdimiz yok. Tek
yapmamız gereken yukarıdaki şekilde uygulamamızla ilgili ayarları ve XAP
dosyamızı belirttikten sonra XAP dosyamız ile beraber bu
**manifest.xml** dosyasını ZIP'leyerek sunucuya göndermek.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-3-28 tarihinde yayinlanmistir.*
