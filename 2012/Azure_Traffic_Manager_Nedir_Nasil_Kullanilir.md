---
FallbackID: 2822
Title: "Azure Traffic Manager Nedir? Nasıl Kullanılır?"
date: "2012-10-9"
EntryID: Azure_Traffic_Manager_Nedir_Nasil_Kullanilir
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Biliyorsunuz Azure datacenter'ları tüm dünyada farklı noktalara
konumlanmış durumda. Hatta bir servis deploy ederken hangi datacenter'a
deploy edeceğimizi de biz seçiyoruz. Ama çoğu zaman uygulamanız sadece
Amerika veya sadece Avrupa'ya hitap ediyor olmayacak. SAAS olarak
sunduğunuz bir servisin farklı bölgelerde aynı performans ile
kullanılabiliyor olmasını isteyeceksiniz. Yani özetle Kuzey Amerika DC
(DataCenter)'a attığınız bir uygulamanın Avrupa'dan kullanılırken
yaşayabileceği olası performans sorunlarını yaşamak yerine uygulamayı
hem Amerika hem de Avrupa'da birer DC'a atmak isteyebilirsiniz. Ama bu
sefer de başka bir sorun kendini gösteriyor... Nasıl olacak da
Avrupa'daki kullanıcılar Avupa'daki DC'ye Amerika'dakiler ise
Amerika'daki DC'ye yönlendirilecekler? İşte bu ve bunun gibi birkaç
senaryoyu Azure'da Traffic Manager çözüyor.

![Dünya üzerinde Windows Azure
Datacenter'ları...](media/Azure_Traffic_Manager_Nedir_Nasil_Kullanilir/datacenters.jpg)\
*Dünya üzerinde Windows Azure Datacenter'ları...*

Azure yönetim paneline girdikten sonra sol alttan "Virtual Network"
seçeneğini seçerseniz sol üstte "Traffic Manager" servisini
bulabilirsiniz. Buradan hemen "Policies" listesine geçerek Traffic
Manager kullanma yolunda maceramıza başlayabiliriz.

![İlk Traffic Manager policy'mizi
yaratırken...](media/Azure_Traffic_Manager_Nedir_Nasil_Kullanilir/trafficmanager_1.jpg)\
*İlk Traffic Manager policy'mizi yaratırken...*

Azure Traffic Manager aslında kullanımı çok basit bir servis çünkü çoğu
şeyi zaten sizin yerinize yapıyor. Sizin tek yapmanız gereken doğru
ayarlamaları gerçekleştirmek ve istiyorsanız belki de uygulama tarafında
da birkaç ufak şeyi ayarlamak. Gelin adım adım ilerleyelim. İlk
Policy'yi yaratmak için üst bardan "Create" dediğiniz karşınıza
aşağıdaki ekran gelecek. Herşey bu ekranda :) başka birşey yok.

![Traffic Manager'ın
ayarları...](media/Azure_Traffic_Manager_Nedir_Nasil_Kullanilir/trafficmanager_2.jpg)\
*Traffic Manager'ın ayarları...*

İlk olarak en üstten Traffic Manager'ı ayarlayacağımız subscription'ı
seçiyoruz. Sonrasında hemen altta üç farklı seçeneğimiz mevcut.
"**Performance**" seçeneği açıklamasında da yazdığı üzere network
anlamında en yüksek performansın alınmasını sağlayacak şekilde
kullanıcıyı uygun DC'ye yönlendiriyor. "**Failover**" seçeneği ise
birazdan hazırlayacağımız listeden yukarıdan aşağıya uygulamaların
sağlığına göre bir yönlendirme yapılmasını sağlıyor. Örneğin en üstte
Kuzey Amerika DC deployment'ı varsa ve bir altında da Güney Amerika DC
deployment'ı bulunuyorsa Kuzey Amerika DC'deki uygulamanız hayatta
olduğu sürece Güney Amerika'ya kimse yönlendirilmez. Listeniz ne kadar
uzunsa yukarıdan aşağıya doğru deployment'ların sağlığına göre
yönlendirme otomatik olarak Traffic Manager tarafından yapılabilir. Son
olarak "**Round Robin**" seçeneği ise hiçbir ölçüme veya şarta
bakmaksızın gelen herkesi tek tek, sırayla listenizdeki farklı DC'lere
yönlendirir.

Sanırım bu noktaya kadar herşey net (birşey hariç :) birazdan geliyoruz
oraya) Subscription altındaki deploymentlardan istediklerinizi seçip
"Selected DNS Names" listesine ekleyerek Traffic Manager'ın trafik
yönlendireceği deploymentlar listesine ekleyebilirsiniz. Tüm bunlar
bittikten sonra bir de ayarlarda "Specify a monitoring endpoint"
seçeneği var. O da ne ola ki?

"Failover" seçeneğinden hatırlarsanız eğer deployment sağlıksız hale
gelirse listedeki bir diğer DC'ye yönlendirme olacak demiştik. Traffic
Manager kendisi gidip uygulamanın sağlığını kontrol etmiyor. Nitekim bir
uygulamanın sağlığını nasıl tanımlarsınız? Role'ün ayakta olması mı?
Yoksa olası bir servis ayakta olsa da gelen taleplere cevap verebilmesi
mi? Peki ya gelen taleplere istenen cevabı veremiyorsa veya belki de
uygulamanızın derinlerinde bazı kontroller yapıp o şekilde sağlık
kontrolü yapmak isterseniz? İşte bu gibi olası karışıklıklar yüzünden
Traffic Manager implementasyonu epey basit tutulmuş. Sizden
uygulamanızda bir endpoint istiyor ve o endpoint'in Traffic Manager
bakmaya geldiğinde 10 saniye içerisinde HTTP200 döndürmesi gerek :)
Böylece Traffic Manager o deployment'ın hayatta olduğunu anlayabiliyor.
Bunu ister basit bir HTML dosyasında yönlendirin ister dinamik bir
dosyaya yönlendirip hatta dinamik bir ASPX'e yönlendirmeniz halinde
programatik olarak da uygulamanız içerisinde istediğinizde HTTP200
göndermeme kararlı alıp otomatik olarak o deployment'ın traffic manager
loop'unun dışında kalmasını sağlayabilirsiniz :) Traffic Manager
endpointleri 30 saniyede bir kontrol edecektir.

Peki ya HTTP200 gelmezse ama başka sorunlardan dolayı olursa bu durum?
Zaten ilk hatada direk Traffic Manager o deployment'ı offline'a almıyor.
30 saniye aralıklarla 3 defa kontrol ediliyor. Yani toplamda 1.5
dakikadan önce o deployment'ın looptan çıkma şansı yok. Tabi tüm bu
maceraya daha hiç bahsetmediğimiz bir de DNS TTL eklenecek. Default
ayarı 5dk olduğu için bir deployment offline'a alınsa da cache'lenmiş
DNS değerleri ile hala o deploymenta trafik gidiyor olabilir. O nedenle
tüm bu ayarları istediğiniz şekilde düzenlemek önemli.

### Peki ya domain?

Herşey bittikten sonra Traffic Manager'a verdiğiniz DNS Prefix ile size
bir domain verilecek. İşte o sub-domain artık dışarıya açılan kapınız.
Servislerinizi kendi endpoint'lerini, VIP'leri vs kullanmamalısınız.
Traffic Manager'dan aldığınız domaine güzel bir CNAME ile kendi alan
adınızı yönlendirebilirsiniz. Böylece herşey tamamlanmış olacak.

Son olarak, birkaç uyarıda buluniyim. Traffic Manager arkasına aldığınız
tüm deployment'ların yazılımınızın aynı sürümü olmasına dikkat edin.
Özellikle update'leri doğru yönetmeniz gerek. Policy change yapıp sonra
updateleri DC'lere dağıtmak doğru olabilir. Bu gibi senaryoları önceden
doğru tasarladığınıdan emin olun. Son olarak sağlık endpoint'leriniz tüm
servislerle aynı olmalı çünkü zaten ayrı ayrı tanımlama şansımız yok.

Hepinize kolay gelsin!


