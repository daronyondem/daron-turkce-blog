---
FallbackID: 2770
Title: Windows Azure'da Local Storage kullanımı
PublishDate: 15/5/2012
EntryID: Windows_Azure_da_Local_Storage_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
**[Aşağıdaki makalenin SDK2.2 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/tr/post/Windows_Azure_Local_Storage_kullanimi_SDK2_2)
bulabilirsiniz.]**

Azure ortamı ile ilgilendiğimizden beridir :) sürekli olarak her bir
role instance'ın aslında kendi kalıcı veri saklama ortamının
bulunmadığından bahsediyoruz. Bunun tabi ki bir çözümü var :) Windows
Azure Storage adı verilen ayrı Azure servisleri paylaşımlı ve kalıcı bir
disk alanı sağlayabiliyorlar. Fakat tüm bu servisler REST API'leri ile
kullanılıyor ve paylaşımlı yani uzak noktada bir veri saklama yeri
sağlıyorlar. Oysa bizim doğrudan kodumuzun çalıştığı yer olan sunucunun
da bir diski var. Bu disk kalıcı olmasa da :) yani FC'nin farklı
senaryolarda uygulamamızı farklı fiziksel/sanal sunuculara taşıyacağı ve
diskimizi kaybedebileceğimizi bilsek de sonuç itibari o disk hala bizim
kodumuzun en hızlı erişime sahip olduğu veri saklama birimi. Ayrıca :)
tamamen beleş! Beleş derken :) zaten sunucumuzun vm boyutuna göre
ödediğimiz para karşılığı aldığımız bir disk alanı olduğunu için beleş
diyorum :) oysa ileriki zamanlarda inceleyeceğimiz Windows Azure Storage
için ek ödeme yapmamız gerekecek.

### Hoş Geldin Local Storage

Herhangi bir instance'ın kendi disk alanına ulaşmak isterseniz
kullanmanız gereken yapı Local Storage yapısı olacak. Aslında kullanımı
epey basit, ilk olarak Visual Studio'da role'ün ayarlarına geçiyoruz.

![LocalStorage ayarlarımız
karşınızda.](http://cdn.daron.yondem.com/assets/2770/localstorage.png)\
*LocalStorage ayarlarımız karşınızda.*

Role ayarlarındaki tablardan biri olan "Local Storage" tabına
geçtiğimizde "Add Local Storage" diyerek istediğimiz kadar bir alan
belirleyip bu alana da bir isim vererek işlemi tamamlayabiliyoruz. Artık
verdiğimiz isimle tanımlanmış istediğimiz kadar bir disk alanımız oldu.
Seçenekler arasında "Clean on role recycle" seçeneği biraz aldatıcı
olabilir. Role recycle edildiğinde "Clean" demeseniz de yani o
CheckBox'ı işaretlemeseniz de hala bu disk alanını geçiçi bir alan
olduğunu unutmamak çok kritik!

**[C\#]**

<span style="color:#2b91af;">LocalResource</span> X = <span
style="color:#2b91af;">RoleEnvironment</span>.GetLocalResource(<span
style="color:#a31515;">"OrnekStorage"</span>);\
 <span style="color:blue;">var</span> Path = X.RootPath;

İşte kod bu kadar :) Yukarıdaki kodu çalıştırdığınızda Path değişkenine
"E:\\XXX\\YYY" gibi bir disk yolu gelecektir. Artık o yolu kullanarak
istediğiniz gibi System.IO sınıflarını kullanabilirsiniz. Artık orası
sizin istediğiniz boyutta tamamen kontrolünüze bırakılmış bir disk
alanı.

### Nereden? Nasıl? Niçin?

Başından beridir :) "aman dikkat bu disk kalıcı değil" gibi :) sürekli
tehlike çanlarını çalıyorum :) Peki o zaman LocalStorage neden var?
LocalStorage geçiçi işlemler için geçici fakat çok yüksek performanslı
bir disk alanı olarak düşünmek çok doğru olur. Random Read/Write için
süper bir seçenek. Kodunuz işleyeceği bir dosyayı diske alıp işleyip
sonra kalıcı bir veri saklama alanına koyabilir. İleriki zamanlarda
işleyeceğimiz diğer veri saklama yöntemlerinde hem sakladığımız veri
miktarı hem de transaction başına para ödememiz gerektiğini göreceğiz.
Oysa buradaki disk hem makine ile beraber gelen beleş bir alan hem de
yaptığımız IO işlem yoğunluğuna göre ek bir para vs ödememiz gerekmiyor.

Hepinize kolay gelsin ;)


