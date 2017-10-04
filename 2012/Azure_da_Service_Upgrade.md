---
FallbackID: 2763
Title: Azure'da Service Upgrade
PublishDate: 1/5/2012
EntryID: Azure_da_Service_Upgrade
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
**[Aşağıdaki makalenin SDK2.2 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/tr/post/Azure_da_Service_Upgrade_SDK2_2)
bulabilirsiniz.]**

Azure ortamına bir servisi deploy ettikten sonra doğal olarak bir gün
onu upgrade de etmemiz gerekecek :) İşte gibi bir senaryoda
ilerleyebileceğim birkaç yol var. Bunlardan ilki normal upgrade
prosedürü. Her zamanki gibi Azure projenize sağ tıklar ve package'ı
yaratırsınız. Sonra management portalına girersiniz :)

![Normal bir upgrade
senaryosu...](http://cdn.daron.yondem.com/assets/2763/upgrade.jpg)\
*Normal bir upgrade senaryosu...*

Upgrade etmek istediğiniz deployment'ı seçip sağ tıkladığınız anda gelen
context menüden upgrade komutunu vererek upgrade sürecini
başlatabilirsiniz.

![Upgrade sürecini
başlatırken.](http://cdn.daron.yondem.com/assets/2763/upgrade2.jpg)\
*Upgrade sürecini başlatırken.*

Upgrade'i başlattığınız anda karşınıza yukarıdaki ekran gelecektir. Yeni
deployment için bir isim verebilir ve yani azure deployment paketi ile
konfigürasyon dosyasını iletebilirsiniz. Eğer ki VM Size veya Role
sayılarında bir değişiklik oluyorsa en alttaki CheckBox'ı işaretlemeyi
unutmayın. Dikkat :) Role sayısı, instance sayısı değil. Yani özetle
aslında öğrenilmek istenen şey CSDEF'de değişiklik oldu mu bilgisi.

Bu noktada "OK"'e basmanız halinde upgrade işlemi başlayacak ve instance
sayınıza göre her upgrade domain gezilerek tek tek otomatik upgrade
edilecek. Fakat gelin bir de farklı bir senaryoya bakalım :) ama bunun
için önce upgrade öncesinde bulunan ve daha önce deploy edilmiş olan
servisimizin içindeki web role'ün instance count'unu değiştirelim.

![Servis çalışırken konfigürasyonu
değiştirmek.](http://cdn.daron.yondem.com/assets/2763/upgrade3.jpg)\
*Servis çalışırken konfigürasyonu değiştirmek.*

Herhangi bir deployment'ı seçip üst menüden "Configure" komutunu
verirseniz karşınıza aşağıdaki ekran gelecektir. Bu ekranda yeni bir
konfigürasyon dosyasının azure paketini deploy etmeden sisteme atabilir
veya hali hazırda bulunan konfigürasyonu direk text olarak
düzenleyebilirsiniz.

![Instance Count'u 2'ye
değiştirirken.](http://cdn.daron.yondem.com/assets/2763/upgrade4.jpg)\
*Instance Count'u 2'ye değiştirirken.*

Ben açılan ekranda hemen Instance Count'u 2 yaparak elimdeki web role'e
yeni bir sunucu daha eklenmesini sağlayacağım. Yeni sunucunun ayağa
kaldırılması, uygulamanın yüklenip sunucunun Load Balancer'a eklenmesi
için bir 5dk beklememiz gerekecek.

### Manual Upgrade

İşlem tamamlandıktan sonra Upgrade senaryomuza geri dönelim. Upgrade
için ana projemizdeki Instance Count'u da iki yapıp, yeni bir baket
yaratıp bu sefer Upgrade penceresinde "Upgrade Mode" olarak Manual'i
seçeceğiz.

Manual upgrade'de her bir upgradedomain'in upgrade olmasını bizim
tetikleyebilmemiz sağlanıyor. Yani normal şartlarda azure tek tek her
upgrade domain'i load balancer'dan çıkarıp sırayla upgrade ederken
Manual seçenekte her adım için bizden onay bekleyecek.

![Upgrade'i başlatmaya
hazırız.](http://cdn.daron.yondem.com/assets/2763/upgrade5.jpg)\
*Upgrade'i başlatmaya hazırız.*

Upgrade işlemini onayladığınızda ve yeni paketiniz azure'a yüklenip
işlemler başlamaya hazır olduğunda yukarıdaki gibi bir manzara ile
karşılaşacaksınız. Artık manual update işlemini başlatmaya hazırız.

![Manual Upgrade'i bu sefer gerçekten başlatalım
:)](http://cdn.daron.yondem.com/assets/2763/upgrade6.jpg)\
*Manual Upgrade'i bu sefer gerçekten başlatalım :)*

Upgrade işlemine hazır olan Deployment'ı seçtiğinizde üst ribbon menüde
"Start" diye bir komut göreceksiniz. Start komutuna basmak upgrade
işlemlerinin başlaması için yeterli. İşlemleri başlattıktan sonra da tek
tek upgradedomain'lerin onaylarını vereceğiz.

![Tek tek
upgrade...](http://cdn.daron.yondem.com/assets/2763/upgrade7.jpg)\
*Tek tek upgrade...*

Role'ümüzde iki instance olduğu için bu instancelardan biri ayrı bir
upgradedomain diğeri ise ayrı bir upgradedomain'e alınmış durumda.
Yukarıdaki ekran görüntüsünde ilk instance upgrade edilmiş ve bitmiş.
İkincisi ise yeni tetiklenmiş. Tüm upgradedomain'leri gezene kadar
sürekli ribbon'daki Start'a basarak tek tek upgrade'leri tetikleyerek
bir yandan da uygulamanızın durumunu test edebilirsiniz.

### VIP Swap

Bir diğer upgrade yöntemi ise VIP Swap. VIP Swap aslında arkada hem bir
production hem de staging deploymentlarınızın olmasını gerektirir.
Yaptığı işlem ise basitçe domainlerle IP'leri değiştirmektir :) Yani bir
anda staging deployment'ınızın production, production ise staging olur.
Bunun en büyük avantajı tabi ki anında geri dönebiliyor olmanız :) bir
sorun gördüğünüz anda çat diye eski haline çevirmeniz mümkün. Bu süreçte
kesinlikle sunucularda bir upgrade süreci başlatılmıyor çünkü zaten
upgrade edilmiş bir staging ortamını upgrade edilmemiş bir production
ile değiştiriyorsunuz.

VIP Swap'in belki tek dezavantajı 2000 instance'lı bir deployment'ınız
varsa :) bunu bire bir aynı şekilde hem staging hem de production için
tutmak zorunda olmanız. Her iki ortamın CSDEF'lerinin bire bir aynı
olması gerekiyor. Eğer CSDEF'te değişiklik varsa VIP Swap yapma şansınız
olmayacaktır. Staging'de de aynı kaynakları muhafaza etmeye gelince..
itiraf etmek gerekirse 2000 instance da olsa sonuçta staging'i test
amaçlı tutar ve SWAP sonrası herşey yolundaysa staging sunucularını
silerseniz sonuçta sadece kullandığınız saat kadar ödeme yapacağınız
için çok büyük bir sorun da yaratmayacaktır.

![VIP Swap](http://cdn.daron.yondem.com/assets/2763/upgrade8.jpg)\
*VIP Swap*

VIP Swap yapabilmek için herhangi bir deployment'ı seçip üst ribbon
menüden "Swap VIP" komutunu verebilirsiniz. İşlem zaten süper kolay
tamamlanacaktır ;)

Kolay gelsin.


