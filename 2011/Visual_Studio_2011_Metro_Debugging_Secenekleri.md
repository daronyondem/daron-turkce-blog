---
FallbackID: 2703
Title: Visual Studio 2011 Metro Debugging Seçenekleri
PublishDate: 20/9/2011
EntryID: Visual_Studio_2011_Metro_Debugging_Secenekleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Metro UI, Visual Studio 11, Windows 8
---
Windows 8 üzerinde Visual Studio 2011'e daha el atma şansınız oldu mu
bilemiyorum ama el atanlarınız için Debugging'le ilgili bir ipucu
paylaşmak istiyorum. Windows 8 üzerinde Visual Studio 2011 ile
çalışırken elinizde touch bir cihaz olmayabilir fakat yine de Metro
UI'dan bahsettiğimizde tabi herşeyi Touch üzerinden debug etmek ve Touch
ile ilgili testleri de yapmak gerekecek. Bu senaryoda ilk seçenek Visual
Studio ile beraber gelen simülatörü kullanmak.

![Simülatör'de
debugging!](http://cdn.daron.yondem.com/assets/2703/debug_in_simulator.png)\
*Simülatör'de debugging!*

Simülatörü seçerek debug etmeye başladığınızda uygulamanız artık
simülatör üzerindeki işletim sistemine yüklenecek. Aslında burada ufak
bir detaydan bahsetmek lazım. Simülatör dediğimiz bir remote desktoptan
öteye geçmiyor :) Simülatör remote üzerinden localhosta bağlanıp mouse
eventlerini toucha convert edip transfer ederek simülasyonu halletmiş
oluyor :) Çakalca bir hareket desek yalan olmaz :)

![Simülatörün
getirdikleri.](http://cdn.daron.yondem.com/assets/2703/debug_in_simulator2.png)\
*Simülatörün getirdikleri.*

Simülatörün sağ tarafında göreceğiniz listede **Touch, Pinch** ve
**Rotate** düğmeleri var. Bu düğmelerden Touch'a tıklarsanız mouse
imleci artık bir parmak rölü oynuyor. Pinch ve Rotate'de iki parmak
gerekeceği için bunu da mouseun sol tuşuna basılı tuttuğunuzda mouse'un
roller'ını döndürerek uygulayabiliyorsunuz. Sol tuşu bastığınızda ekrana
ilk parma izi geliyor ve roller'ı döndürdüğünüzde ise seçeneğinize göre
Pinch veya Rotate yapmış oluyorsunuz. Ayrıca cihazın sağa sola
döndürülmesi ve çözünürlük değiştirilmesi gibi işlemleri de yine
toolbarda bulabilirsiniz. Şu an için tek eksik sanırım GPS simülasyonu.

![Remote
debugging!](http://cdn.daron.yondem.com/assets/2703/debug_in_simulator3.png)\
*Remote debugging!*

Debugging konusunda bir diğer seçenek ise "Remote Debugging". Varsayalım
ki üzerinde Windows 8 ve Visual Studio yüklü bir tabletiniz veya touch
destekleyen bir cihazınız var fakat kod yazarken o cihaza sıkışmak da
istemiyorsunuz. Açıkçası çoğu zaman benim hep içerisine düştüğüm saçma
bir durum olmuştur bu. Ne zaman Touch'la alakalı bir uygulama yazacak
olsam adam akıllı bilgisayarımı bırakıp bir tablete geçmek hiç de hoş
olmuyor. İşte bu gibi senaryolar için Visual Studio kullandığınız
cihazın uzaktan bir tablete bağlanıp tablette uygulamayı debug modunda
açması sağlanmış. Debug pointler vs herşey remote applicationla da
çalışıyor. Normal debugging'den bir farkı yok. Yukarıdaki ekran
görüntüsünde remote debugging enable edilmiş bir makineye nasıl
bağlanabileceğinizi görebilirsiniz.

Remote debuggingi bir makinede aktif hale getirmek için "**Remote
Debugging Configuration Wizard**" denilen uygulamayı çalıştırmanız
yeterli olacaktır.

Hepinize kolay gelsin.

Bu makale **Visual Studio 11 Express for Windows Developer Preview**\
ve **Windows 8 Developer Preview Build 8102** kullanılarak yazılmıştır.


