---
FallbackID: 2295
Title: "Tek bir tıkla projeni sunucuda çalıştır... Cassini Web Server Launcher"
date: "2009-1-3"
EntryID: Tek_bir_tikla_projeni_sunucuda_calistir_Cassini_Web_Server_Launcher
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, ASP.NET 3.5, Silverlight, Silverlight 2.0, ASP.NET
old.EntryID: 2efde635-a690-4339-91b1-02dc870a08de
---
Yeni yılda hayatınızı kolaylaştırma yolunda iddialıyım :) Bu sefer de
benim işimi çok kolaylaştıran bir aracı sizlerle paylaşacağım.

Visual Studio içerisinde F5'e bastığımızda System Tray'de beliren
"**ASP.NET Development Server**"'ı hatırlarsınız. Aslında adı "Cassini"
olan bu server işimizi epeyce kolaylaştırır ve bizim her sererinde
IIS'te sitemizi veya uygulamamızı ayarlamamızı gerektirmeden uygulamanın
sanal bir sunucu ortamında test edilmesini sağlar.

Peki hiç herhangi bir projenizi doğrudan çalıştırıp görmek istediğinizde
mecburen Visual Studio ile açıp F5'e bastığınız oldu mu? :) Veya
mecburen IIS'te web site ayarlamak zorunda kaldınız mı? sadece sitenizi
çalıştırabilmek için? İşte bu işkence aslında sürekli yaşadığımız bir
süreç ve çok kolay bir çözümü var. Biz de Visual Studio gibi gidip
Cassini'yi kullanabiliriz.

Aslında Cassini bizim bilgisayarlarımızda **WebDev.WebServer.exe**
olarak yüklü bulunuyor. Tabi ki EXE'yi doğrudan alıp taşıyamazsınız, çok
sayıda bağlantılı DLL vs de söz konusu. Ama biz bu EXE'ye doğru
parametreleri gönderirsek aynı Visual Studio'nun kullandığı gibi
herhangi bir klasördeki dosyaları web sunucudaymış gibi
çalıştırabiliyor. Bu EXE'nin nasıl kullanıldığını merak edenleri veya
birazdan sizlerle tanıştıracağım uygulamanın nasıl yazıldığını merak
edenleri İngilizce blogumdaki [bir
yazıya](http://daron.yondem.com/en/post/3dd88a31-b300-4849-9243-9f1ab3d22597)
davet edebilirim :)

![Sağ tıkla sunucudaaymış gibi
çalıştır!](media/Tek_bir_tikla_projeni_sunucuda_calistir_Cassini_Web_Server_Launcher/02012009_2.png)\
*Sağ tıkla sunucudaaymış gibi çalıştır!*

Gelelim sadede... **Infragistics'te** çalışan **J. Ambrose Little** tüm
bunları yaparak uygulamayı da bir SETUP paketi şeklinde hazırlamış ve
bununla da kalmamış ve bu sistemi işletim sisteminin context menü'süne
bağlamış. Yani özetle; herhangi bir klasöre sağ tıklayıp "**ASP.NET 2.0
Web Server Here**" dediğizde Cassini açılıyor ve söz konusu klasör
içerisindeki uygulama server üzerinden çalıştırılıyormuş gibi karşınıza
çıkıyor. Aynı Visual Studio'da F5'e basmış gibi :)

Uygulamayı aşağıdaki linkten bilgisayarınıza indirip yükleyebilirsiniz.

[Cassini Web Server Launcher - 02012009\_1.msi (355
KB)](media/Tek_bir_tikla_projeni_sunucuda_calistir_Cassini_Web_Server_Launcher/02012009_1.msi)

ASP.NET 2.0 dediğine bakmayın 3.5 SP1 ile herhangi bir sorunu yok.

Hepinize kolay gelsin...


