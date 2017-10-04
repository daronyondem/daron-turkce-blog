---
FallbackID: 2786
Title: Windows Azure'da Özel Domain Kullanımı
PublishDate: 4/9/2012
EntryID: Windows_Azure_da_Ozel_Domain_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Azure ortamında uygulamanızı koydunuz fakat yönetim portalının size
verdiği **ornek.cloudapp.net** gibi adresleri kullanmak istemiyorsunuz.
Onun yerine kendi aldığınız bir domain'i kullanmak istiyorsunuz :) Çok
doğal bir istek. Bunun için hali hazırda tanımlı bir domain'in DNS
ayarları ile oynamamız gerekecek. Gelin şimdi hem DNS ayarlarına bir göz
atalım hem de sadece bir web role'e bağlı domain değil storage account
endpointlerini de nasıl kendi domainlerimize alabiliriz ona bakalım :)

### Web Role' domain yönlendirmek...

Bir domain'i DNS'te A kaydı ile yönlendirmek için önce web role'ümüzü
veya daha doğrusu servisimizi temsil eden IP'yi bulmamız gerek. Bunun
için hemen Windows Azure web yönetim paneline login oluyoruz. Login
olduktan sonra deployment'ınızı bulup seçtikten sonra aşağıdaki gibi sağ
panelin en altında VIP olarak deployment'ı temsil eden IP'yi
bulabilirsiniz.

![VIP'mizi bulduk.](http://cdn.daron.yondem.com/assets/2786/domain.png)\
*VIP'mizi bulduk.*

VIP'ler bir deployment, hatta servis silinine kadar sizin oluyor. Yani
servisi tamamen silmediğiniz sürece o IP sürekli size ait olacak.

Şimdi sıra geldi DNS taraflarını ayarlamaya. Artık IP elimizdeki
olduğuna göre DNS sunucumuza gidip gerekli A kaydını girebiliriz.

![DNS kaydımızı
güncelliyoruz.](http://cdn.daron.yondem.com/assets/2786/domain2.png)\
*DNS kaydımızı güncelliyoruz.*

DNS kaydında aslında belki bir CNAME ile de işi bitirebilirsiniz. Fakat
ana domaini veya wilcard yönlendirme için doğrudan domainin root kaydını
A ile VIP'ye yönlendirmek daha rahat olacaktır. Sonrasında tabi bir de
www kaydını yönlendirmeyi unutmayın :)

Eğer kendi DNS sunucunuz yoksa, doğal olarak domain'i satın aldığınız
yerin sağladığı DNS servislerini kullanmanız gerekecek.

### Gelelim Storage Account için özel domainlere....

Storage account için verilen endpointleri değiştirmek ilk bakışta
anlamsız gelebilir. Çünkü sonuç itibari ile queue veya table storage
servislerinin endpointlerini dışarıdan görülme şansı yok. Ama özellikle
blob storage'ın endpointi eğer bloblarınız dışa doğrudan açıksa
rahatlıkla görülebilir halde olacaktır. Blob storage endpointlerini
isterseniz kendi alan adınınız altında bir yerlere alarak dışarıya daha
anlamlı bir manzara verebilirsiniz ;)

**[Normal URL yapısı]**

http://\<storage\_account\_adi\>.blob.core.windows.net/\<container\_adi\>/\<blob\>

**[Özelleştirilmiş URL yapısı]**

http://\<ozel\_domain\>/\<container\_adi\>/\<blob\>

Yukarıda gördüğünüz şekilde alan adlarını düzenleyebilmek için yine
azure yönetim paneline uğruyoruz. Yönetim panelinde tam da Storage
Account tanımladığımız yerde daha önceden yarattığımız ve yönlendirmeyi
tanımlamak istediğimiz Storage Account'u seçerek ribbon'dan "Add Domain"
düğmesine tıklıyoruz.

![Add Custom
Domain...](http://cdn.daron.yondem.com/assets/2786/domain3.png)\
*Add Custom Domain...*

"Add Domain" dediğiniz anda aşağıdaki manzara ile karşılaşacaksınız.
Burada istediğiniz gibi bir subdomain veya eğer ayrı bir domain
kullanmayı düşünüyorsanız domain'in kendisi yazabilirsiniz.

![Özel domainimizin yönlendirmesini
tanımlarken.](http://cdn.daron.yondem.com/assets/2786/domain4.png)\
*Özel domainimizin yönlendirmesini tanımlarken.*

"OK" dediğiniz bir süre beklemeniz gerekecek. İşlem bittikten sonra
karşınıza yeni bir popup ekranında yapmanız gereken bir CNAME
yönlendirmesi gelecek.

![Storage Account için CNAME
yönlendirmesi.](http://cdn.daron.yondem.com/assets/2786/domain5.png)\
*Storage Account için CNAME yönlendirmesi.*

Yukarıda gördüğünüz CNAME tanımını kendi DNS'imize yapmamız gerekiyor.
Bu yönlendirme aslında Azure'a bu alan adının bizim olduğunu
kanıtlamamız için yapmamız gereken bir yönlendirme. Bu yönlendirmeyi
yapana kadar yeni domain kaydı azure panelinde "pending" olarak durmaya
devam edecektir.

![Validation
CNAME](http://cdn.daron.yondem.com/assets/2786/domain7.png)\
*Validation CNAME*

Eğer kendi DNS sunucunuz varsa Windows Server üzerinde DNS yönetiminde
yukarıdaki gibi root domain'de bir CNAME kaydı yaratmanız yeterli
olacaktır.

![Domain'i validate
etmek...](http://cdn.daron.yondem.com/assets/2786/domain6.png)\
*Domain'i validate etmek...*

Gerekli CNAME ayarlarını yaptıktan sonra yine Azure yönetim panelinde
yeni domain kaydını bulup ribbon menüden de "Validate Domain" diyerek
validasyonu tamamlayabilirsiniz. CNAME kaydının yakalanabilmesi için 12
saate kadar beklemeniz gerekebileceğini baştan söyliyim :) ama benimki
10 dakikada oldu :)

![Son
yönlendirme...](http://cdn.daron.yondem.com/assets/2786/domain8.png)\
*Son yönlendirme...*

Validasyon işlemleri bittiğine göre artık domain'in bizim olduğunu
kanıtladık demektir :) Şimdi son olarak sıra geldi gerçekten istediğimiz
subdomain'i azure ortamındaki blob endpoint'ine yönlendirmek. DNS'te
yukarıdaki gibi yeni bir CNAME kaydı ile bu işlem de tamamlanabilir :)

**[Eski Blob Link]**

http://shortstore.blob.core.windows.net/deneme/inetalogo.png

**[Yeni Blob Link]**

http://download.kslt.biz/deneme/inetalogo.png

Yukarıda da gördüğünüz gibi artık blob ana domain'ini değiştirmiş olduk
;)

Hepinize kolay gelsin ;)


