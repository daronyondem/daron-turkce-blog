---
FallbackID: 2845
Title: TechEd North America 2013'den Azure Haberleri
PublishDate: 6/4/2013
EntryID: TechEd_North_America_2013_den_Azure_Haberleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Bugünler New Orleans'da TechEd North America 2013 gerçekleşiyor... (Bu
mudur yani demeyin.. şimdilik ülke gündemi tepkilerimi
[twitter'dan](http://www.twitter.com/daronyondem)bloğa taşıma niyetim
yok) Konferans çerçevesinde her zamanki gibi bazı güzel duyurular
yapıldı. Özellikle Azure tarafındakileri sizlerle hızlıca paylaşmak
istiyorum çünkü gerçekten heyecan verici güzellikler var.

### Durdurulmuş VM'lere para ödenmeyecek!

Bunun arka plan implementasyonunu gerçekten merak ediyorum :) Yakında
öğrenirim :) Neyse, konuya dönelim. Eskiden IAAS tarafında bir VM
yarattığınızda VM'i durdursanız da o kaynakları reserve ettiğiniz için
para ödemeye devam ederdiniz. Artık bu durum kalktı. Bir VM durdurulduğu
anda artık para ödeme durumu da olmuyor yani çalıştığı süre için para
ödeniyor fakat çalışmadığı zaman da VM yok olmuyor doğal olarak :) Tabi
burada ufak bir detay var. VM'in diski zaten sizin Storage hesabınızda
olacağı için zaten o storage için ayrıca para veriyorsunuz ama yine de
VM config'lerinin bu şekilde saklanması çok hoş. Ufak bir iş değil bu.

Bu durum şimdilik Web Site'lar ve Mobile Service Reserved Instance'lar
için de geçerli fakat "Cloud Services" için geçerli değil. Yaz sonuna
doğru Cloud Services için de b özelliğin geleceği dedikoduları var :)
İşte o zaman ben bayram edeceğim.

### Saat yerine dakika başına taksimetre!

Eskiden azure'da herhangi bir kaynağı reserve ettiğiniz anda o saat için
parasını öderdiniz. Hatta saat derken de taksimetre saat başı atardı.
Yani 16.30-17.30 arası iki saat sayılırdı. Neyse, artık bunların hiçbiri
dert değil çünkü artık dakika başına para ödüyoruz. Bu inanılmaz iyi bir
haber. Özellikle bir önceki haberle bu birleştiğinde istediğinizde
kapatıp bırakabileceğiniz ve istediğinizde kullanıp dakika başına para
verebileceğiniz VM'leriniz olabilir :) PAAS tarafında ise autoscaling
stratejilerini çok daha kolaylaştıracaktır bu gelişme. Cidden çok iyi!

### Deneme Hesapları ve MSDN Azure seçeneklerindeki muhasebe değişiklikleri!

Ara başlık okkalı oldu :) Ben bunlara muhasebe değişiklikleri demeyi
tercih ettim çünkü olayın muhasebe tarafını kolaylaştıran değişiklikler
ve esneklikler söz konusu. İlk olarak deneme hesaplarında artık şu kadar
bundan, bu kadar şundan kullanabilirsin gibi detayları geride bırakıp
Microsoft **aylık 200\$ kota veriyor** :) Bu kota ile istediğiniz Azure
servisini alıp kullanabiliyorsunuz. Bu kadar basit.

MSDN hesabı sahiplerine ise ilk olarak ürününe göre **%33 ile %90 arası
indirim** yapıyor Microsoft Azure'da. Sonra da MSDN subscriptionlar ile
beraber gelen kullanım kotalarını da deneme hesaplarındaki gibi
basitleştiriyorlar. MSDN **Professional Subscribers \$50/ay**, MSDN
**Premium Subscribers \$100/ay** ve MSDN **Ultimate Subscribers
\$150/ay** krediye sahipler. Bu kredi ile istedikleri Azure servisini
kullanabilirler.

Muhasebe değişiklikleri 1 Ağustos itibari ile hesaplarınızda gözükmeye
başlayacak fakat isterseniz hemen şimdi Azure hesabınıza girip "migrate"
talebi yollayarak daha hızlı geçiş isteyebilirsiniz :)

Görüldüğü üzere güzel haberler geldi TechEd North America'dan...
Unutmadan son olarak ufak bir müjde daha... Bugüne kadar MSDN
hesabımızaki yazılımların lisansları Azure'daki VM'lere deployment izni
vermezken artık Dev/Test lisanslarını Azure'da da kullanabiliyoruz. Yani
IAAS tarafından VM alıp bu lisanslarla kurulum yapabilirsiniz.

Görüşmek üzere!


