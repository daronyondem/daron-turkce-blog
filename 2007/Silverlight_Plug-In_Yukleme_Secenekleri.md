---
FallbackID: 1893
Title: "Silverlight Plug-In Yükleme Seçenekleri"
date: "2007-12-22"
EntryID: Silverlight_Plug-In_Yukleme_Secenekleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: bb671a89-eebd-4b81-88aa-0f0009eee180
---
# Silverlight Plug-In Yükleme Seçenekleri
Silverlight ile yaptığımız projelerde istemci tarafında eğer
**Silverlight Plug-In** yüklü değilse projemiz dahilinde
**Silverlight.js** dosyası otomatik olarak bir yükleme uyarısı çıkarıyor
ve kullanıcıyı gerekli yüklemeleri yapmak üzere Microsoft web sitelerine
yönlendiriyor. Bu durumun pek bir zararı yok gibi gözükse de aslında
kullanıcıyı başka bir web sitesine yönlendirmeden de bu işi
halledebiliriz :)

![Standard bir Silverlight yükleme
uyarısı.](media/Silverlight_Plug-In_Yukleme_Secenekleri/21122007_1.png)\
*Standard bir Silverlight yükleme uyarısı.*

Peki Microsoft web sitelerine yönlendirmeden doğrudan bir yüklemeyi
nasıl ayarlayabiliriz. Aslında durum gerçekten basit bir ayardan öteye
geçmiyor.

    properties: {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>,

      inplaceInstallPrompt: <span style="color: blue;">true</span>

    },

Silverlight uygulamamıza ait createSilverlight fonksiyonu içerisinde
belirlediğimiz parametreler arasında bir de **inplaceInstallPrompt**
parametresi ayarlıyoruz. Bu parametrenin değeri **true** olarak
ayarlandığında Silverlight yükleme uyarısı aşağıdaki şekilde ekrana
gelecektir. Söz konusu resme tıklandığında da direk yükleme işlemi
başlayacaktır.

![Doğrudan yükleme yapan uyarı
mesajı.](media/Silverlight_Plug-In_Yukleme_Secenekleri/21122007_2.png)\
*Doğrudan yükleme yapan uyarı mesajı.*

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-12-22 tarihinde yayinlanmistir.*
