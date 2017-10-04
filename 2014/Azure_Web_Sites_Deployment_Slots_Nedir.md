---
FallbackID: 2924
Title: Azure Web Sites Deployment Slots Nedir?
PublishDate: 19/11/2014
EntryID: Azure_Web_Sites_Deployment_Slots_Nedir
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Daha önceki yazılarımda Cloud Services için geçerli olan [VIP
SWAP](http://daron.yondem.com/software/post/Azure_da_Service_Upgrade_SDK2_2)'ten
bahsetmiştim. Azure'da Production ve Staging ortamları yaratbileceğimizi
ve bunlar arası hızlıca geçiş yapabileceğimizi görmüştük. Tüm bunları
Azure Web Sites için de yapabileceğinizi biliyor muydunuz? Yeni Azure
Management Portal ile beraber artık Azure Web Sites için de "Deployment
Slots" kavramı var. Bu yazıda Deployment Slots'un ne olduğuna ve nasıl
kullanacağına göz atacağız.

Deployment Slots konseptini kullanabilmeniz için sitenizin "Standard
Mode" fiyatlandırma seviyesinde olması gerekiyor. Bunun için tek
çekirdekli bir makine seçerek sitenizi scale etmeniz gerekecek.
Sonrasında hemen portalda sitenizin altındaki "Deployment Slots"
listesinden yeni bir slot ekleyebilirsiniz.

![Staging Deployment Slot
ekliyoruz.](http://blob.daron.yondem.com/assets/2924/deploymentstlots_1.gif)
*Staging Deployment Slot ekliyoruz.*

Yeni slot eklerken slota vereceğiniz ismin yanı sıra yeni slottaki
uygulamanın konfigürasyon ayarlarının da productiondan kopyalanıp
kopyalanmayacağını seçme şansınız var. Aslında Azure Web Sites
içerisindeki yapı Cloud Services'dan daha esnek çünkü sadece Production
ve Staging bakış açışı ile yaklaşılmış değil. İstediğiniz kadar
deplyoment slot yaratabilirsiniz. Bunun bir nedeni de ileride
bahsedeceğimiz A/B Testing senaryoları.

![SWAP
Zamanı](http://blob.daron.yondem.com/assets/2924/deploymentstlots_2.gif)
*SWAP Zamanı*

Her şey hazır olduğunda üst bardaki "SWAP" düğmesine basarak hedef bir
deployment slot seçip değiş tokuşu gerçekleştirebilirsiniz. Buradaki
yapı Cloud Services'daki VIP SWAP ile bire bir aynı. İç tarafta bir
DNS/IP değişliğinden öte değil SWAP işlemi. Yani konfigürasyonlarınıza
dikkat etmenizde fayda var. Aksi halde Staging database'ine giden
Staging ortamınınz bir anda Production'a geçip Staging database'ine
giden bir Prod ortamına kavuşabilirsiniz :) Korkutucu gözüktüğünden
eminim. O nedenle dikkatli olmakta fayda var.

### Dikkat Dikkat!

Şimdi ben güzel güzel deployment slot'un adını "Staging" diye koydum da
:) dikkatinizi çektiyse söz konusu slotun URL'i de
<http://darontest-staging.azurewebsites.net> oldu. Buradaki tehlike ne
mi? Bu adresi tahmin etmek hiç de zor değil. Cloud Services tarafında
Staging ortamlarına verilen URL'lerde birer GUID var. O nedenle o
adreslerin tahmin edilmesi zor ama burada "staging" adının kullanılması
tehlikeli olabilir. Ama zaten o adı biz vermedik mi? Evet :) Yani
özetle,  staging amacı ile yeni bir deployment slot yaratırken adını
"staging" koymak ne kadar pratik olsa da bana kalırsa random bir Suffix
ile kullanın. Böylece dışarıdan deployment adınızı bilen birisi sonuna
staging ekleyerek staging ortamınıza ulaşamasın.

### A/B Testing

Deployment slotslar ile yapabileceğiniz bir diğer şey de A/B Testing.
Sitenizin farklı sürümlerini farklı slotlara deploy ederek trafiğin
belirli bir kısmını bir slota diğer bir kısmını da başka bir slota
yönlendirebilirsiniz. Böylece %10luk bir trafiği bir slota yönlendirerek
gerçek trafik ile test sürüşü yapma şansınız olabilir. A/B Testing
sadece sitenin işlevselliği anlamında değil genel olarak kullanımı
anlamında da test edilmesi için kullanılabilir. Örneğin her bir slota
farklı Analytics hesapları bağlayarak belirli bir süre 10% trafiği bir
slota gönderip toplanan veriyi karşılaştırarak sitenizle ilgili hangi
tasarım değişikliğinin daha doğru olacağına karar verebilirsiniz.

![Testing in
production...](http://blob.daron.yondem.com/assets/2924/deploymentstlots_3.gif)
*Testing in production...*

Ne kadar adı korkutucu gözükse de :) bu özelliği Azure tarafında
"Testing in production" denmiş. Yukarıda ekran görüntüsünde de
görebileceğiniz üzere ben trafiğin 10%'unu staging ortamına yönlendirme
kararı aldım :) Unutmayın ki istediğiniz kadar deployment slot yaratarak
istediğiniz gibi trafiği dağıtabilirsiniz.

Hepinize kolay gelsin.


