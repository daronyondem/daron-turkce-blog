---
FallbackID: 2785
Title: Azure Stroge'da Queue Servisi
PublishDate: 28/8/2012
EntryID: Azure_Stroge_da_Queue_Servisi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
Azure Storage Account'larda gelen blob ve table'dan sonra son servis
olan queue (kuyruk) servisi veri saklama açısından diğer servisler kadar
öne çıkmasa da sonuç itibari güzel bir kuyruklama altyapısı olarak
uygulamaların azure ortamındaki varlığı için çok kritik değere sahip.
Gelin hızlıca bu kuyruk altyapısının nasıl çalıştığında ve nasıl
kullanılabileceğine göz atalım.

**[C\#]**

<span style="color:blue;">var</span> storageAccount = <span
style="color:#2b91af;">CloudStorageAccount</span>.FromConfigurationSetting(<span
style="color:#a31515;">"DataConnectionString"</span>);\
 <span
style="color:blue;">var</span> Client = storageAccount.CreateCloudQueueClient();\
 <span
style="color:#2b91af;">CloudQueue</span> q = Client.GetQueueReference(<span
style="color:#a31515;">"yenikuyruk"</span>);\
 q.CreateIfNotExist();

Yeni bir kuyruk yaratmak için ilk olarak storageAccount üzerinden
QueueClient alıyoruz. **QueueClient** nesnesi üzerinden aynı bir blob
veya table yaratırmış gibi kuyruk adı verip bir referans alıp sonra da
CreateInNotExist ile kuryuğumuzu yaratabiliyoruz. Yaratılan bir kuyruğa
istediğimiz kadar mesaj ekleyebiliriz.

**[C\#]**

<span style="color:blue;">var</span> storageAccount = <span
style="color:#2b91af;">CloudStorageAccount</span>.FromConfigurationSetting(<span
style="color:#a31515;">"DataConnectionString"</span>);\
 <span
style="color:blue;">var</span> Client = storageAccount.CreateCloudQueueClient();\
 <span
style="color:#2b91af;">CloudQueue</span> q = Client.GetQueueReference(<span
style="color:#a31515;">"yenikuyruk"</span>);\
 <span style="color:#2b91af;">CloudQueueMessage</span> yeniMesaj = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">CloudQueueMessage</span>(<span
style="color:blue;">\
                                string</span>.Format(<span
style="color:#a31515;">"text:{0}"</span>,TextBox1.Text));\
 q.AddMessage(yeniMesaj);

Yukarıdaki örnekte kuyruğu aldıktan sonra hemen yeni bir
**CloudQueueMessage** yaratıyoruz. Her mesajın içine bir byte array veya
string yerleştirilebiliyor. Tabi istediğiniz gibi elinizdeki objeleri de
serialize edip buraya koymakta serbestsiniz fakat dikkat :) her mesaj
ancak 64KB büyüklüğünde olabilir. Genel olarak eğer kuyruğa büyük bir
veri yerleştirmek gerekiyorsa veriyi kuyruğa koymak yerine bir blob'a
koyup blobun Uri'yi kuryuğa atmak çok daha mantıklı olacaktır.

**[C\#]**

q.AddMessage(yeniMesaj, TimeSpan.FromMinutes(1),TimeSpan.FromMinutes(2));

Eğer isterseniz kuyruğa bir mesaj eklerken iki tane daha parametre
verebilirsiniz. Bunlardan ilki kuyruktan mesajın ne kadar süre
yaşayacağı, yani kuyrukta var olacağı, bir diğer ise kuyruğa eklenmesine
rağmen mesajın ne kadar süre sonra erişilebilir olması. Konuyu aslında
şöyle açıklayabiliriz, bu kuyruğa mesaj koymamızın bir amacı var. Bazı
işleri sıraya koyuyoruz sonra da worker'lar gelip alıp bu işleri
yapıyorlar. Koyduğunuz bir işin siz koyduktan 2 dakika sonra alınabilir
(görünür) olmasını sağlayabiliyor ve 1 dakika boyunca da alınıp
yapılmamışsa yokolmasını ayarlayabiliyorsunuz. Her ne ayar yaparsanız
yapın :) 7 gün içinde bir mesaj alınmaz ise kuyruktan her halükarda
silinecektir.

**[C\#]**

<span style="color:blue;">var</span> storageAccount = <span
style="color:#2b91af;">CloudStorageAccount</span>.FromConfigurationSetting(<span
style="color:#a31515;">"DataConnectionString"</span>);\
 <span
style="color:blue;">var</span> Client = storageAccount.CreateCloudQueueClient();\
 <span
style="color:#2b91af;">CloudQueue</span> q = Client.GetQueueReference(<span
style="color:#a31515;">"yenikuyruk"</span>);\
 <span
style="color:#2b91af;">CloudQueueMessage</span> mevcutMesaj = q.GetMessage();

Eğer kuyruktan bir mesaj almak isterseniz doğrudan Queue üzerinden
GetMessage() metodunu çalıştırabilirsiniz. Bir mesaj kuyruktan
alındıktan sonra 30 saniye içerisinde eğer alan kişi tarafından silinmez
ise mesaj tekrar kuyrukta görünür hale gelir. Alan uygulama eğer
istersen mesajı alırken daha uzun bir süre için de alabilir. Bunun için
GetMessage() metoduna TimeSpan tipinde bir parametre geçebilirsiniz.
Böylece aldığınız mesajla ilgili işlemleri yapıp sonra geri dönüp
mesajın tamamen silinmesi için komut gönder aralığınız daha geniş
olacaktır. Alınan bir mesaj zaten alındığı andan süresi bitene kadar
diğer tüm alıcılara görünmez olacaktır. Bu yapı sayesinde Azure'daki
kuyruklarda mesaj kaybı engelleniyor. Unutmadan :) bir mesajı en fazla 7
günlüğüne alabilirsiniz, daha uzun süre görünmez tutamazsınız.

Bir mesajı alıp içeriğini mesaja ait **SetMessageContent** metodu ile
değiştirebilirsiniz. **DequeueCount** property'si üzerinden ise o ana
kadar mesajı alıp zamanında operasyonu bitiremeyen kaç alıcının mesaja
ulaştığına dair rakamı bulabilirsiniz. Böylece "message poisining"in de
önüne geçme şansınız olur.

Kuyruklar bu kadar basit :) Tabi kuyrukların kullanım şekilleri ve
yerleri önemli. Aslında teknik olarak API'leri çok uğraştırmasa da
görevleri ve önemleri gerçekten çok büyük ;) En kısa zamanda farklı
makalelerde kuyrukları sahnede görmek üzere ;) Kendinize çok iyi bakın!


