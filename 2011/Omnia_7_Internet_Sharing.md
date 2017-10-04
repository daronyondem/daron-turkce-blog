---
FallbackID: 2728
Title: Omnia 7'ye Internet Sharing
PublishDate: 17/11/2011
EntryID: Omnia_7_Internet_Sharing
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone, Windows Phone 7.5
---
Daha önceleri Samsung Omnia 7 ile yaşadığım [bazı
maceraları](http://daron.yondem.com/tr/post/TMobile_Samsung_Omnia_7_ile_Mango)
sizlerle paylaşmıştım :) Son son daha dün Omnia 7 için bir update daha
çıktı, hatta bir değil üst üste iki update çıktı. Nette birçok yerde bu
update'lerin Omnia 7'ye "Internet Sharing" yani "Access Point" olma
özelliğini getirdiği söylense de bende durum böyle olmadı :) ve
"Internet Sharing" gelmedi. Firmware ve OS sürümleri bire bir nette
diğer söylenenlere uysa bile belli ki orada bir sorun vardı.

Neyse, ben de dayanamayıp artık bu işi legal / illegal bir şekilde çözme
kararı verdim :) Daha önce de aslında bu updateler olmadan seksen takla
atıp Internet Sharing'in Enable etmenin yöntemleri vardı fakat şu ana
kadar "doğru vatandaş" konseptine resmi update'in gelmesini bekliyordum
:)

![WP7'de Internet
Sharing](http://cdn.daron.yondem.com/assets/2728/wp7_internet_sharing.jpg)\
*WP7'de Internet Sharing*

Yukarıdaki fotoğraftan da görebileceğiniz üzere şu anda Omnia 7'imde
Internet Sharing var ve tabiri caiz ise "çatır çatır" da çalışıyor :)
Peki siz nasıl yapabilirsiniz?

1.  İlk olarak "developer unlock"a sahip bir cihaza ihtiyacınız var.
    Bunu ister marketplace hesabınızla yapın ister cihaz başına 9\$ alan
    [Chevron Unlock](http://labs.chevronwp7.com/) aracı ile yapın.
2.  İkinci adımda makinenize **Visual Studio ve WP7.5 SDK**'larının
    yüklü olduğunu varsayarak :) SDK ile beraber gelen "Application
    Deployment" aracını kullanarak [buradaki XAP
    dosyasını](http://cdn.daron.yondem.com/assets/2728/File%20Deployer.xap)
    telefona atın.
3.  Telefonunuzla \#\#634\# numarasını çevirerek "**Diagnosis
    Application**"'ın yüklenmesini sağlayın. Bu uygulama telefonun
    ROM'unda var. Siz numarayı çevirince telefonun uygulamalar listesine
    gelecek.
4.  "Diagnosis Application"ı açın ve bu sefer de \*\#9908\# numarasını
    uygulama içerisindeki keypad'e girin.
5.  Karşınıza bir lisbox çıkarak. En alttan "System Tweaks"'ı seçip
    "Save" ve "Close" düğmelerine sırası ile basın.
6.  Telefonunuzu kapatıp açın ve işlem tamam!

Bu işlemleri yaptıktan sonra telefonunuz 3G networkünü görmemeye
başlayabilir. Kullandığınız operatörün APN ayarlarını elle sıfırdan
yaparsanız herşey çözülecektir. Turkcell senaryosunda sadece APN Name
olarak "internet" yazmanız yeterli olacaktır.

Bu işlemlerle beraber Omnia 7'de Internet Sharing aktif hale geldi :)
Diğer telefonlarla ilgili maalesef fikrim yok.

Hepinize kolay gelsin.


