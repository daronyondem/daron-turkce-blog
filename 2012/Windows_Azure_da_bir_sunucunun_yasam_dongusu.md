---
FallbackID: 2757
Title: Windows Azure'da bir sunucunun yaşam döngüsü!
PublishDate: 20/3/2012
EntryID: Windows_Azure_da_bir_sunucunun_yasam_dongusu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Windows Azure'un iç yapısına göz atacağımız bu yazımız :) hala kod
yazmaya başlamadığımız ikinci azure yazımız olacak. Maalesef elleri
kirletmeye başlamadan önce ortamı biraz daha incelemek ve neyin nasıl
çalıştığı ile ilgili fikir sahibi olmak gerek ;) Bir diğer deyişle ile
bulutlara doğru uçuşa geçerken biraz kafadaki bulutları yok edeceğiz :)

### Aslında herşey sanal...

Windows Azure ortamına uygulamanız ile geldiğinizde daha önceki
yazılarda da bahsettiğimiz üzere uygulamanızın bir veya birden çok
sunucuda çalışıyor olması yazdığınız kodu pek etkilemeyecek. Normal
şartlarda birden çok sunucunun gücüne ihtiyaç duyduğunuz zamanlarda iki
sunucunun önüne bir "Load Balancer" almak, yükü doğru şekilde dağıtmak,
sunuculardan birinin sorun yaşaması veya arızalanması durumunda artık
söz konusu sunucuya trafik yönlendirmemek gibi birçok senaryo ile
ilgilenmek gerekirken işte tüm bunlarla Azure'un kendisi ilgilenecek.

Azure ortamına gelip uygulamanızı birden çok sunucuya yaydığınızda
aslında elde ettiğiniz sunucular tamamen sanallaştırılmış, tertemiz
Windows Server 2008 kurulumları. Bu temiz sanal makineler Azure'un kendi
iç yapısında "Fabric Controller" olarak adlandırılan yönetici yazılımlar
tarafından yönetiliyor. İsterseniz genel mimariye bakarken farklı bir
senaryodan ilerleyelim.

### Azure ortamında bir sunucunun doğuşu....

Aslında burada bir sunucunun doğuşu demek pek doğru değil, bir Node
desek daha doğru olacak :) Özetle bir donanımın azure datacenter'ında
varoluşunun başından yola çıkarsak yol boyunca neyin nasıl yerleştiğini
görmek genel mimariyi görmek açısından da faydalı olabilir.

Azure ortamında bir sunucunun ilk dakikaları
[PXE](http://en.wikipedia.org/wiki/Preboot_Execution_Environment) ile
başlıyor. PXE'nin detaylarına girmeye gerek yok, kabaca bir makine
açıldığı gibi PXE Server'a bağlanıp daha üzerinde işletim sistemi yokken
[Windows
PE](http://technet.microsoft.com/en-us/library/cc766093(WS.10).aspx)
imajı indirmesini sağlıyor. Makine bu şekilde hafiften ayağa kalktığı
gibi hemen diske güzel bir format atılıp sonrasında da makine üzerinde
çalışacak esas işletim sisteminin VHD'si indiriliyor. İndirilen Host OS
VHD'si üzerinden boot edilen makinede artık Windows Azure Hypervisor
(sanallaştırıcı) ve Fabric Controller (FC) Host Agent bulunuyor. Artık
bu noktada makinede Azure DataCenter'ına hizmet etmek için hazır. Makine
üzerindeki FC Host Agent doğrudan FC (Fabric Controller) ile iletişime
geçerek makine üzerinde çalışması gereken uygulamaların listesini ve
görevlerini almaya başlıyor.

![Fabric Controller ve NOD
Yapısı](media/Windows_Azure_da_bir_sunucunun_yasam_dongusu/azure_fc.jpg)\
*Fabric Controller ve NOD Yapısı*

Bu noktada biraz da Fabric Controller hakkında konuşmak lazım çünkü
aslında Fabric Controller tüm Windows Azure Bulut İşletim Sistemi'nin
normal bir işletim sistemi ile kıyaslanırsa Kernel'i görevini görüyor.
Ayağa kalkan tüm makinelerde / NOD'lardaki işlemci, bellek vs gibi
kaynakların nasıl dağıtılacağına ve hangi NOD'da hangi servisin,
projenin çalışacağına Fabric Controller karar veriyor. Azure'a projenizi
verip "bunu iki tane bir çekirdekli makinede çalıştır" dediğiniz Fabric
Controller uygun iki fiziksel makineyi seçip orada size uygun kaynakları
ayırıp isole çalışma alalanını yaratıp uygulamanızı da makineye
aktarmakta sorumlu.

Fabric Controller da aslında kendi içinde bir Windows Azure servisi ve
tamamen datacenter içerisinde dağıtık bir yapıda çalışıyor. Her Rack
(bir paket server diyelim :)) başına FC toplam 5 kopya olarak tutuluyor.
Bunun nedeni ise kabaca hem sorunlarla başa çıkıp "high avalability"
(yani servisin olabildiğince ayakta kalması) sağlamak hem de Microsoft
FC'ye kendi içinde update yaptığında sıralı update yaparken de her tür
soruna karşı koruyabilmek.

FC'yi Windows Azure'un Kernel'ine benzetmemin nedenleri tabi ki bu kadar
değil. DataCenter içerisindeki uygulamaların ve kaynakların dağılımının
yanı sıra DataCenter'daki Load Balancer gibi donanımlarla da FC
konuşuyor. Yani varsayalım ki iki sunucuda çalışan bir uygulamanız var
ve bunu üç sunuya çıkarma karar aldınız. DataCenter'da uygun yeri bulup,
size özel sanal makineyi ayağa kaldırıp, içine uygulamanızı koyup
çalışır hale getirdikten sonra da Load Balancer'a "artık bu makineye de
trafik gönderebilirsin" diyecek kişi FC'nin ta kendisi. Aynı şekilde
makinelerden birinde sorun olduğunda uygun çözümleri üretecek kişi de
FC'nin kendisi. Özetle uygulamanız için datacenter içerisinde tüm
kaynaklar tek bir "makineymiş" gibi hissettiren kişi FC.

Bir NOD ayağa kalktıktan sonra içerisinde bulunan FC Agent doğrudan
FC'ye bağlanıp görev için hazır olduğunu söylediği anda FC ona makine
üzerinde çalışacak servislerin bilgilerini veriyor. Varsayalım üç tane
iki çekirdekli sunucuda çalıştırmak istediğiniz bir uygulamanız var. FC
elindeki makinelere bakıp (buna yeni gelen bir makine de dahil) boş yeri
olan bir NOD'un FC Agent'ı ile iletişime geçip gerekli ek VHD'leri
indirmesini istiyor. Neden mi? Azure ortamında şu an için resmi olarak
bilgi verilmese de sonuç itibari ile alabildiğin en büyük makine 8
çekirdekli. Buradan yorum yaparak fiziksel olarak da NOD'ların en
büyüğünün 8 çekirdek olduğunu düşünebiliriz. Bu durum tabi ki ileride
değişebilir. Şimdi siz üç tane iki çekirdekli makine istediniz. FC gidip
iki çekirdeği boş olan bir makine bulduğu anda o makinenin sizin Azure
projenizi host etmek üzere bir sanal makine yaratıp kendi HOST
VHD'sindeki Windows Azure Hypervisor ile ayağı kaldırmasını isteyecek.
İşte bu tamamen size özel ayağa kaldırılacak sanal makinenin de bir
Base.VHD'si var :) Önce o FC'nin "Image Repository"sinden indiriliyor.
Sonrasında sıra geliyor Differential VHD'lere.

Toplam üç tane diff VHD ekleniyor sanal makineye. Bunlardan ilki
içerisinde FC Guest Agent da bulunan ve host edeceğiniz uygulama türüne
göre değişen VHD. Örneğin Azure'da isterseniz üzerinde IIS bulunan veya
bulunmayan farklı sanal makineler (role instance) alabiliyorsunuz.  İlk
VHD bu gibi ana değişiklikleri belirlerken FC Guest Agent gibi ana
makinedeki FC Host Agent ile konuşacak FC Agent'ını da içeriyor. Malum
size özel ayrılan bu sanal makine içerisindeki hayatın tos pembe
olmasını sağlayan Agent ancak FC Guest Agent olabilir. Sanal makinede
bir sorun olduğunda bunu FC Guest Agent çözemezse doğrudan FC Host
Agent'a haber veriyor. Eğer Host Agent da durumu çözemezse bu sefer
FC'ye haber veriyor. Katman katman ilerleyen bu yetki zincirinde aslında
herkesin kendince bir çalışma alanı var :) FC Guest Agent uygulamanın
sağlıklı çalıştığından emin olursan FC Host Agent sanal makinelerin
sağlıklı çalışmasına FC ise datacenter'ın sağlıklı çalışmasına bakıyor.

Diff VHD'lerimize geri dönersek :) ikinci Diff.VHD doğrudan size
ayrılmış bir disk alanı. Burayı uygulamanız kullanabilir. Tabi unutmamak
gerek ki bu alan aslında kalıcı bir alan değil. Örneğin sanal makinede
bir sorun olursa ve FC uygulamanızı başka bir sunucuya taşıma kararı
alırsa tüm bu süreç baştan başlıyor ve eski Diff VHD'ler direk çöpe
atılıyor. Yani özetle şu an bahsettiğimiz Diff VHD uygulamanız
tarafından bir disk olarak kullanılabilse de kesinlikle kalıcı bir veri
saklama noktası değil. Zaten uygulamanızın birden çok sunucuda
çalıştığını ve bu VHD'lerin sync edilmediğini de düşünürsek :) Load
Balancer arkasındaki bir uygulama için kesinlikle böyle bir kalıcı veri
saklama konumu düşünülemez.

Üçüncü VHD :) Uygulamanızın kendisi! Azure'a uygulamanızı verdiğinizde
tek bir paket olarak veriyorsunuz. Bunun detaylarını ileriki yazılarda
göreceğiz. Verdiğiniz paket açılarak bir VHD haline çevriliyor ve
makineye ataçlanıyor.

### Artık makinemiz ayakta!

İşte artık azure'da uygulamamız ayakta :) Bir NOD'un azure
datacenter'ındaki yaşam döngüsüne bakmış olduk. Kısaca özetlemek
gerekirse :) (pek kısa olamayacak ama)

-   PXE Server üzerinden Windows PE gelir ve boot olur.
-   Makineye format atılır, Base.VHD indirilir ve oradan boot edilir.
-   Hypervisor ve FC Host Agent artık çalışır durumdadır.
-   FC Host Agent gider FC'den rolleri öğrenir.
-   FC Host Agent içerisinde FC Guest Agent'ın da bulunduğu Base.VHD'yi
    indirir.
-   FC Host Agent üzerinde bulunacak rollere göre Diff.VHD'yi indirir.
-   FC Host Agent uygulamamızın bulunduğu Diff.VHD'yi indirir.
-   FC Host Agent sanal makineyi ayağa kaldırır.
-   FC Host Agent uygulamamızı makinede çalışırır, herşey yolunda ise
    Load Balancer'a haber verir ve makineye trafik gelmeye başlar.

İşte durum budur :) Sanırım blogumun en uzun ve kodsuz yazılarından biri
oldu bu ;)

Kendinize çok iyi bakın.


