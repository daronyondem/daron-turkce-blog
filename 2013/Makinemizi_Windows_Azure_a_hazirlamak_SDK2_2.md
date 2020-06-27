---
FallbackID: 2874
Title: "Makinemizi Windows Azure'a hazırlamak (SDK2.2)"
date: "2013-11-27"
EntryID: Makinemizi_Windows_Azure_a_hazirlamak_SDK2_2
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
# Makinemizi Windows Azure'a hazırlamak (SDK2.2)
Windows Azure dünyasına girişimize devam ederken :) sıra geldi yavaş
yavaş elleri kirletmeye... Azure ile ilgili ilk projemizi yaratma
yolunda ilerlerken doğal olarak Visual Studio açıp birşeyler yapmak için
bazı yüklemeler yapmamız gerekecek. Gelin şimdi beraber neler yapmamız
gerektiğine hızlı bir göz atalım.

### SQL 2012 Express

Benim gibi kaç tane çılgın var bilmiyorum fakat ben developer
makinesinde SQL Express sevmeyen bir insandım :) Bunu desteklemek için
birçok neden bulabilirim ama detaylara girmeyelim :) Genelde hep SQL'in
Developer Edition'ı default instance kurar devam ederdim. Windows Azure
SDK'yi kurup local emülatörleri kullanmaya başladığınızda göreceksiniz
ki bu emülatörlerin bazıları arka planda SQL LocalDB kullanıyor. Bu yeni
bir durum, eskiden emülatörler SQL Express kullanıyorlardı. Aslında bu
SQL değişikliği, yani Express'den LocalDB'ye geçiş biraz da Full IIS'ten
IIS Express'e geçiş ile alakalı. Bu konuya birazdan değineceğiz. Fakat
şimdilik aklınızda olsun, eğer ki local development için Full IIS
kullanma kararı alırsanız yanına bir de SQL Express koymanızda fayda
var. LocalDB'nin In-Proc yapısı sizi sarmayabilir :) Özetle, eğer "Başım
ağrımasın, aman kurarım, parayla değil ya..." modundaysanız kurun dursun
:) Ama itiraf ediyim, LocalDB de fena çalışmıyor Storage Emülator'üne
deli deli abanmayacaksın testlerde LocalDB ile yaşayabilirsiniz.

### IIS Express

Eski SDK sürümleri ile çalışanlar varsa IIS Express'in yeni olduğunu
göreceklerdir. Eskiden Full IIS üzerinden çalıştırmamız gerekiyordu
Emülatörü. Bu nedenle her seferinde Visual Studio'yu da "Admin" hakları
ile açmamız şarttı. Artık şartlar değişti ve Visual Studio'yu admin
hakları ile açmadan da emülatörleri IIS Express ile kullanabiliyoruz.
İşin tek sıkıntılı tarafı IIS Express'in Multi-Instance local debugging
desteklememesi. Eğer Azure rollerinizde birden çok instance ayağı
kaldırarak test yapmak istiyorsanız bunu makinenizde yapmanın tek
yöntemi Full IIS kullanmak. "Benim ihtiyacım olmaz" diyorsanız eğer
benden söylemesi "kaçınılmazı ertelemekten" başka birşey yapmış
olmazsınız :) Eninde sonunda multi-instance local debugging yapacaksınız
:) O nedenle benim tavsiyem daha Visual Studio bile kurmadan temiz temiz
Full IIS'inizi de kurun. Böylece sonra keyfiniz istediğinde projenin
debug modundaki ayarları yapıp istediğiniz IIS Express istediğinizde
Full IIS kullanırsınız. Herşeyi kurup bitirdikten sonra üzerine IIS
bindirmek farklı sıkıntılara neden olabilir.

### Yükleme yollarında...

 Artık sıra geldi yüklemelerimizi yapmaya. Bunun için hızlıca Visual
Studio'yu açıp yeni bir Cloud projesi yaratabilirsiniz desem de
inanmayın :)

![Azure araçlarını
edinirken...](media/Makinemizi_Windows_Azure_a_hazirlamak_SDK2_2/install.png)\
*Azure araçlarını edinirken...*

Yukarıdaki manzarada gördüğünüz "Get Windows Azure SDK for .NET"i
seçerek yeni bir proje yaratırmış gibi ilerleyebilirsiniz. Ekrana hemen
(Visual Studio) içerisinde bir web sayfası açılacak ve oradan direk
download işlemini yaparak yüklemenizi başlatabileceksiniz.

![Yüklemeye doğru adım,
adım...](media/Makinemizi_Windows_Azure_a_hazirlamak_SDK2_2/install2.jpg)\
*Yüklemeye doğru adım, adım...*

Download düğmesine bastığınızda karşınıza "Web Platform Installer"
yüklemesi gelecek. Yine web sitesinden "**Download / Install**" diyerek
yüklemeyi yapabilirsiniz. Yükleme öncesinde makinenizdeki gerekli
şartları kurulum uygulaması test edecektir. Bu şartlar ve makinenizde
hali hazırda yüklü olanlar da göz önüne alınarak yeni bir download
listesi oluşturulacak. Listeyi onayladığınız gibi tek tek herşey
makinenize indirilecek ve kurulacak :) Tüm bu süreç bittikten sonra
artık Visual Studio'da Cloud projelerinizi görebileceksiniz. Unutmadan,
yüklemeyi Visual Studio içerisinden başlattıktan sonra yükleme süresince
Visual Studio'nun kapalı olması gerektiği için VS'yi kapatmayı unutmayın
:)

![Yükleme tamam.](media/Makinemizi_Windows_Azure_a_hazirlamak_SDK2_2/install3.png)\
*Yükleme tamam.*

İşte herşey tamam. Artık yeni Azure projeleri yaratmak için herşey
hazır. Hadi ne bekliyorsunuz?

Bir sonraki yazıda görüşmek üzere ;)



*Bu yazi http://daron.yondem.com adresinde, 2013-11-27 tarihinde yayinlanmistir.*
