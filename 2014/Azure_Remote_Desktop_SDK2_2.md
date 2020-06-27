# Azure'a Remote Desktop (SDK2.2)
İlk zamanlarda Azure'a Remote Desktop ile bağlanmak çok daha meşakkatli
bir işken artık yeni SDK'ler ile beraber çok basit bir hale geldi. Peki
nedir tam olarak bu Remote Desktop? Azure'a Remote Desktop ile bağlanmak
ne demek?

Biliyorsunuz deploy ettiğimiz her role'ün birden çok instance'ı var.
İşte her bir instance'ın çalıştığı size ait olan sanal makineye remote
desktop ile bağlanabiliyorsunuz. Peki bunun amacı ne? Amacı tamamen
debugging. Yani remote ile bağlaniyim bazı ayarlar yapıp çıkiyim gibi
bir düşünceniz olmasın :) Unutmayın ki bu makineler her an
değiştirilebilir, yani bir hata vs olduğunda FC uygulamanızı taşıyabilir
ve makinede remote ile bağlanıp yaptığınız tüm değişiklikler uçar gider.
O nedenle remote bağlantısını daha fazla bir debugging aracı olarak
düşünmek gerek.

### Visual Studio'dan Publish

Bugüne kadar önceki makalelerle publish ve upgrade yöntemlerine göz
atmıştık fakat hiç Visual Studio içerisindek direk publish denemedik.
Remote Desktop konusunda hem azure management panelinden bir sertifika
yüklemek hem de servisinizin csdef ve cscfg'sinde ayarlar yapmak
gerekiyor. İşte tüm bu ayarları ve süreci kolaylaştırmak adına Visual
Studio ile beraber gelen Publish Wizard'ını kullanmak en akıllıcası.

![Visual Studio içerisinde Publish Wizard'ı
kullanırken.](media/Azure_Remote_Desktop_SDK2_2/publish.jpg)\
*Visual Studio içerisinde Publish Wizard'ı kullanırken.*

Publish Wizard açıldıktan sonra karşınıza boş bir liste gelecek. Benim
aşağıdaki ekran görüntüsünde subscription listesinin dolu gelmesine
aldanmayın :) O sizde boş gelecek. Şimdi burada aslında yapılması
gereken daha önce bahsettiğim gibi bizim azure hesabına ulaşılması için
azure'un yönetmin panelinden bir management certificate yüklenmesi sonra
onun kendi bilgisayarımızda da ataçlanması vs gibi uzun bir süreç.

![Publish Wizard'a Azure hesabımız için yaratılmış bir sertifikayı
vermek
gerekecek.](media/Azure_Remote_Desktop_SDK2_2/publish2.png)\
*Publish Wizard'a Azure hesabımız için yaratılmış bir sertifikayı vermek
gerekecek.*

Bunun yerine yukarıdaki ekran görüntüsünde "Sign in" dediğinizde Azure
Login sayfasına yönlendirileceksiniz. Sayfaya direk azure hesabınızın
LiveID'si ile login olduğunuzda herşey bitmiş olacak. Subscription
listesinde üyeliklerinizi bulabileceksiniz.

Import işlemi bittikten sonra uygulamanızı publish etmek istediğiniz
subscription'ı seçip sihirbazda yavaş yavaş ilerleyebilirsiniz :)

![Remote Desktop seçeneğini aktif hale
getirmeli.](media/Azure_Remote_Desktop_SDK2_2/publish3.png)\
*Remote Desktop seçeneğini aktif hale getirmeli.*

Gördüğünüz gibi aslında webdeki yönetim panelinde yapabildiğimiz çoğu
şey bu sihirbazda da yapabiliyoruz. Var olan bir servisi seçip upgrade
başlatabilirsiniz veya yeni bir servis bile yaratabilirsiniz. Ekranın en
altındaki "Enable Remote Desktop for all roles" ise bizim
ilgileneceğimiz seçenek olacak. Checbox'ı işaretledikten sonra yanındaki
"Settings" düğmesine basarsanız remote desktop için kullanacağınız
kullanıcı adı ve şifresini de belirleyebilirsiniz.

Artık sihirbazın sonuna doğru ilerlemeye hazırız. En sonda bizi
"Publish" düğmesi bekliyor olacak. Basarak hem yaptığımız
değişikliklerin hem de uygulamanın yeni sürümünün sunucuya atılmasını
sağlayabiliriz.

![Visual Studio içerisinden deployment devam
ediyor.](media/Azure_Remote_Desktop_SDK2_2/publish4.png)\
*Visual Studio içerisinden deployment devam ediyor.*

Deployment başladıktan sonra tüm detayları Visual Studio içerisindeki
"Windows Azure Activity Log" penceresinden izleyebilirsiniz. Herşey
tamamlandığında remote bağlantı için tekrar web yönetim paneline
yönlenmemiz gerekecek.

![İstediğimiz Instance'a
Remote...](media/Azure_Remote_Desktop_SDK2_2/publish5.png)\
*İstediğimiz Instance'a Remote...*

Yönetim paneline girdikten sonra istediğiniz bir Instance'ın listeden
seçip sonrasında yukarıdaki "Connect" düğmesini kullanarak Remote
bağlantıyı başlatabilirsiniz. Remote Desktop'a geçtiğinizde sizden
Visual Studio içerisindeyken yaratmış olduğunuz şifre istenecektir. Onu
da girdiğiniz kendinizi bir anda Azure'daki bir sanal makinenin
desktopında bulacaksınız.

![Azure'daki makinemizin
diskleri...](media/Azure_Remote_Desktop_SDK2_2/publish6.png)\
*Azure'daki makinemizin diskleri...*

Makineye hazır RDP yapmışken :) biraz ortalığı karıştıralım değil mi?
Hatırlarsanız her sanal makineye ek üç tane VHD ataçlanıyordu. Bunlardan
üçünü de yukarıdaki listede görebiliyoruz. Birinde işletim sistemi,
diğerinde uygulamamız, sonuncusunda da bize özel bir disk alanı
bulunuyor.  Bu disk alanının artık kalıcı bir veri saklama ortamı
olmadığı fikrine alıştık sanırım :) Son birkaç yazıdır bundan sürekli
bahsediyoruz ;)

![Small Instance
Konfigürasyonu](media/Azure_Remote_Desktop_SDK2_2/publish7.png)\
*Small Instance Konfigürasyonu*

Biliyorsunuz Small Instance'da tek çekirdek var. Bu çekirdeğin 2.1 GHz
bir AMD olduğunu görmüş olduk. Ayrıca spesifikasyonlara uygun şekilde
1.75GB da RAM'imiz var Small Instance'da.

![Uygulamamız diske açılmış
:)](media/Azure_Remote_Desktop_SDK2_2/publish8.png)\
*Uygulamamız diske açılmış :)*

Diskleri biraz daha karıştırdığımızda uygulamamızı da doğrudan kendi
diskinde bulabiliyoruz. Bizim web.config işte burada :)

![Azure'da bir role altında çalışan
processler.](media/Azure_Remote_Desktop_SDK2_2/publish9.png)\
*Azure'da bir role altında çalışan processler.*

Son olarak gelin bir de sistemde çalışan processlere göz atalım :)
Yukarıdaki ekran görüntüsünde gördüğün listedeki bazı processler bizi
ilgilendiren ve azure mimarisinden tanıdık olduğumuz uygulamalar.

1.  Windows Azure Drives adında bir role ek VHD ataçlanmasını sağlayan
    ek bir özellik için kullanılır. İleriki yazılarda bu konuya
    değineceğiz.
2.  Diagnostic dataların toplanmasını ve merkezi bir yere kopyalanmasını
    sağlar.
3.  Web role'ün IIS ayarlarını yöneten bir WCF named pipes servisi.
4.  Diagnostic dataların toplanmasını ve merkezi bir yere kopyalanmasını
    sağlar. 
5.  Makineye remote bağlantı yapılabilmesini sağlar.
6.  Windows Azure Monitoring Agent FC Guest Agent'ın yani Windows Azure
    Guest Agent'ın yüklenmesi, güncellenmesi ve konfigürasyonundan
    sorumlu.
7.  Windows Azure Runtime Bootstrapper RoleConfig dosyasını okuyup,
    uygulamak ve rolü ayağa kaldırmakla sorumlu.
8.  Web Role Host FullIIS çalıştıran rollerin dışarıdan giriş noktası.
    RoleEntryPoint'i bulup çalıştıran arkadaş budur.
9.  FC Guest Agent Guest OS içerisinde firewall, ACL, LocalStorage
    kaynakları, servis paketi, konfigürasyon ve sertifikalardan sorumlu.
    Aynı anda Fabric ile konuşan konuşup WaHostBootstrapper'ı
    çalıştırır.

İşte böylece hem azure'daki bir instance'a nasıl RDP yapabileceğimizi
gördük, hem Visual Studio içerisinden deployment senaryosuna göz atmış
olduk hem biraz da azure'daki sanal bir makineyi karıştırdık ;)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2014-3-3 tarihinde yayinlanmistir.*
