---
FallbackID: 2769
Title: Azure'a Remote Desktop
PublishDate: 8/5/2012
EntryID: Azure_a_Remote_Desktop
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
**[Aşağıdaki makalenin SDK2.2 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/tr/post/Azure_Remote_Desktop_SDK2_2)
bulabilirsiniz.]**

İlk zamanlarda Azure'a Remote Desktop ile bağlanmak çok daha meşakkatli
bir işken artık yeni SDK'ler ile beraber çok basit bir hale geldi. Peki
nedir tam olarak bu Remote Desktop? Azure'a Remote Desktop ile bağlanmak
ne demek?

Biliyorsunuz deploy ettiğimiz her role'ün birden çok instance'ı var.
İşte her bir instance'ın çalıştığı size ait olarak sanal makineye remote
desktop ile bağlanabiliyorsunuz. Peki bunun amacı ne? Amacı tamamen
debugging. Yani remote ile bağlaniyim bazı ayarlar yapıp çıkiyim gibi
bir düşünceniz olmasın :) Unutmayın ki bu makineler her an
değiştirilebilir, yani bir hata vs olduğunda FC uygulamanızı taşıyabilir
ve makinede remote ile bağlanıp yaptığınız tüm değişiklikler uçar gider.
O nedenle remote bağlantısını daha fazla bir debugging aracı olarak
düşünmek gerek.

### Visual Studio'dan Publish

Bugüne kadar önceki makalelerle publish ve upgrade yöntemlerine göz
atmıştık fakat hiç Visual Studio içerisindek direk publish denemedek.
Remote Desktop konusunda hem azure management panelinden bir sertifika
yüklemek hem de servisinizin csdef ve cscfg'sinde ayarlar yapmak
gerekiyor. İşte tüm bu ayarları ve süreci kolaylaştırmak adına Visual
Studio ile beraber gelen Publish Wizard'ını kullanmak en akıllıcası.

![Visual Studio içerisinde Publish Wizard'ı
kullanırken.](http://cdn.daron.yondem.com/assets/2769/publish.jpg)\
*Visual Studio içerisinde Publish Wizard'ı kullanırken.*

Publish Wizard açıldıktan sonra karşınıza boş bir liste gelecek. Benim
aşağıdaki ekran görüntüsünde subscription listesinin dolu gelmesine
aldanmayın :) O sizde boş gelecek. Şimdi burada aslında yapılması
gereken daha önce bahsettiğim gibi bizim azure hesabına ulaşılması için
azure'un yönetmin panelinden bir management certificate yüklenmesi sonra
onun kendi bilgisayarımızda da ataçlanması vs gibi uzun bir süreç.

![Publish Wizard'a Azure hesabımız için yaratılmış bir sertifikayı
vermek
gerekecek.](http://cdn.daron.yondem.com/assets/2769/publish2.jpg)\
*Publish Wizard'a Azure hesabımız için yaratılmış bir sertifikayı vermek
gerekecek.*

Bunun yerine yukarıdaki ekran görüntüsünde "Sign in to download
credentials" dediğinizde özel bir sayfaya yönlendirileceksiniz. Sayfaya
direk azure hesabınızın LiveID'si ile login olduğunuzda
uzantısı \*.publishsettings olan bir dosya downloada başlayacak. İşte o
dosyayı download edip yine yukarıdaki ekran görüntüsündeki "Import"
düğmesine basıp Import etmeniz gerekiyor. publishsettings dosyasının
içeriğine bakarsanız zaten bir sertifika ve subsriptionların ID'lerini
bulabilirsiniz.

**[publishsettings]**

<span style="color:blue;">\<?</span><span
style="color:#a31515;">xml</span><span style="color:blue;"> </span><span
style="color:red;">version</span><span
style="color:blue;">=</span>"<span style="color:blue;">1.0</span>"<span
style="color:blue;"> </span><span
style="color:red;">encoding</span><span
style="color:blue;">=</span>"<span
style="color:blue;">utf-8</span>"<span style="color:blue;">?\></span>\
 <span style="color:blue;">\<</span><span
style="color:#a31515;">PublishData</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">PublishProfile</span>\
 <span style="color:blue;">    </span><span
style="color:red;">PublishMethod</span><span
style="color:blue;">=</span>"<span
style="color:blue;">AzureServiceManagementAPI</span>"\
 <span style="color:blue;">    </span><span
style="color:red;">Url</span><span style="color:blue;">=</span>"<span
style="color:blue;">https://management.core.windows.net/</span>"\
 <span style="color:blue;">    </span><span
style="color:red;">ManagementCertificate</span><span
style="color:blue;">=</span>"<span
style="color:blue;">XXXXXX</span>"<span style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Subscription</span>\
 <span style="color:blue;">      </span><span
style="color:red;">Id</span><span style="color:blue;">=</span>"<span
style="color:blue;">35283b01-5568-48cb-97cc-XX</span>"\
 <span style="color:blue;">      </span><span
style="color:red;">Name</span><span style="color:blue;">=</span>"<span
style="color:blue;">Azdem155G43017W</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Subscription</span>\
 <span style="color:blue;">      </span><span
style="color:red;">Id</span><span style="color:blue;">=</span>"<span
style="color:blue;">3aaeb2e8-fb95-4e6c-a785-XX</span>"\
 <span style="color:blue;">      </span><span
style="color:red;">Name</span><span style="color:blue;">=</span>"<span
style="color:blue;">Windows Azure MSDN - Visual Studio Ultimate</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">Subscription</span>\
 <span style="color:blue;">      </span><span
style="color:red;">Id</span><span style="color:blue;">=</span>"<span
style="color:blue;">d3d0c62a-f14e-4195-a4b5-XX</span>"\
 <span style="color:blue;">      </span><span
style="color:red;">Name</span><span style="color:blue;">=</span>"<span
style="color:blue;">DEVELOAD</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">PublishProfile</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">PublishData</span><span
style="color:blue;">\></span>

Import işlemi bittikten sonra uygulamanızı publish etmek istediğiniz
subscription'ı seçip sihirbazda yavaş yavaş ilerleyebilirsiniz :)

![Remote Desktop seçeneğini aktif hale
getirmeli.](http://cdn.daron.yondem.com/assets/2769/publish3.jpg)\
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
ediyor.](http://cdn.daron.yondem.com/assets/2769/publish4.jpg)\
*Visual Studio içerisinden deployment devam ediyor.*

Deployment başladıktan sonra tüm detayları Visual Studio içerisindeki
"Windows Azure Activity Log" penceresinden izleyebilirsiniz. Herşey
tamamlandığında remote bağlantı için tekrar web yönetim paneline
yönlenmemiz gerekecek.

![İstediğimiz Instance'a
Remote...](http://cdn.daron.yondem.com/assets/2769/publish5.jpg)\
*İstediğimiz Instance'a Remote...*

Yönetim paneline girdikten sonra istediğiniz bir Instance'ın listeden
seçip sonrasında yukarıdaki "Connect" düğmesini kullanarak Remote
bağlantıyı başlatabilirsiniz. Remote Desktop'a geçtiğinizde sizden
Visual Studio içerisindeyken yaratmış olduğunuz şifre istenecektir. Onu
da girdiğiniz kendinizi bir anda Azure'daki bir sanal makinenin
desktopında bulacaksınız.

![Azure'daki makinemizin
diskleri...](http://cdn.daron.yondem.com/assets/2769/publish6.jpg)\
*Azure'daki makinemizin diskleri...*

Makineye hazır RDP yapmışken :) biraz ortalığı karıştıralım değil mi?
Hatırlarsanız her sanal makineye ek üç tane VHD ataçlanıyordu. Bunlardan
üçünü de yukarıdaki listede görebiliyoruz. Birinde işletim sistemi,
diğerinde uygulamamız, sonuncusunda da bize özel bir disk alanı
bulunuyor.  Bu disk alanının artık kalıcı bir veri saklama ortamı
olmadığı fikrine alıştık sanırım :) Son birkaç yazıdır bundan sürekli
bahsediyoruz ;)

![Small Instance
Konfigürasyonu](http://cdn.daron.yondem.com/assets/2769/publish7.jpg)\
*Small Instance Konfigürasyonu*

Biliyorsunuz Small Instance'da tek çekirdek var. Bu çekirdeğin 2.1 GHz
bir AMD olduğunu görmüş olduk. Ayrıca spesifikasyonlara uygun şekilde
1.75GB da RAM'imiz var Small Instance'da.

![Uygulamamız diske açılmış
:)](http://cdn.daron.yondem.com/assets/2769/publish8.jpg)\
*Uygulamamız diske açılmış :)*

Diskleri biraz daha karıştırdığımızda uygulamamızı da doğrudan kendi
diskinde bulabiliyoruz. Bizim webform1.aspx işte burada :)

![Azure'da bir role altında çalışan
processler.](http://cdn.daron.yondem.com/assets/2769/remote.png)\
*Azure'da bir role altında çalışan processler.*

Son olarak gelin bir de sistemde çalışan processlere göz atalım :)
Yukarıdaki ekran görüntüsünde gördüğün listedeki bazı processler bizi
ilgilendiren ve azure mimarisinden tanıdık olduğumuz uygulamalar.

1.  Windows Azure Drives adında bir role ek VHD ataçlanmasını sağlayan
    ek bir özellik için kullanılır. İleriki yazılarda bu konuya
    değineceğiz.
2.  Diagnostic dataların toplanmasını ve merkezi bir yere kopyalanmasını
    sağlar.
3.  Diagnostic dataların toplanmasını ve merkezi bir yere kopyalanmasını
    sağlar.
4.  Makineye remote bağlantı yapılabilmesini sağlar.
5.  Windows Azure Guest Agent (FC Guest Agent) ve bootstrapper.
6.  Hyper-V guest VM integration servisleri
7.  Web role'ün IIS ayarlarını yöneten bir WCF named pipes servisi.

İşte böylece hem azure'daki bir instance'a nasıl RDP yapabileceğimizi
gördük, hem Visual Studio içerisinden deployment senaryosuna göz atmış
olduk hem biraz da azure'daki sanal bir makineyi karıştırdık ;)

Hepinize kolay gelsin.


