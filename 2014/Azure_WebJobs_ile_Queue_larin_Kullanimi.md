---
FallbackID: 2915
Title: Azure WebJobs ile Queue'ların Kullanımı
PublishDate: 9/8/2014
EntryID: Azure_WebJobs_ile_Queue_larin_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
Hatırlarsanız bundan bir süre önce [Azure WebJobs konusundan
bahsetmiş](http://daron.yondem.com/software/post/WebJobs_Giris_ve_Bloblarla_Kullanimi),
hatta ilk girişi yapmanın yanı sıra Blob'lara WebJobs SDK kullanımına da
göz atmıştık. Bu yazıda ise aynı konuya davem ederken Azure WebJobs ile
beraber Azure Storage'daki Queue yapılarını, yani kuyrukları nasıl
kullanabileceğimize göz atacağız. Queue Storage servisine hiç göz
atmamış olanlarla ilk başta [Queue Servisi
yazısını](http://daron.yondem.com/software/post/Azure_Stroge_da_Queue_Servisi)
sonra da [Role'ler arası iletişimde nasıl
kullanıldığına](http://daron.yondem.com/software/post/Windows_Azure_da_Worker_Role_Kullanimi)
dair yazıyı okumanızı tavsiye ederim. Böylece Azure Storage Queue
yapısının hangi problemleri çözmeye çalıştığını ve nasıl bir şey
olduğunu hızlıca öğrenebilirsiniz.

WebJobs'ın kuyruklarla çalışma şekli bloblarla çalışma şekli ile az çok
aynı. Kuyruktaki Message'ları teker teker WebJob'ınızı çalıştırılmasına
neden olurken kuryuktaki mesaj doğrudan WebJob tanımındaki fonsiyonunuza
parametre olarak geçiyor.

**[C\#]**

```cspublic static void KuyruktanGelen([QueueInput("kuyrugum")] string parametre){}```
Metodun parametresini isterseniz yukarıdaki gibi dekore ederek
QueueInput'a kullanmak istediğiniz kuyruğun adını verebiliyorsunuz.
Parametre tipi eğer string olarak bırakılırsa aslında arka planda
kullanılan CloudQueueMessage üzerinden AsString ile alınan sonuç size
iletiliyor. Alternatif olarak "object" tipinde tanımlarsanız paramtreyi
bu sefer de AsBytes ile Byte Array döndürülecektir.

 Kuyruklarla çalışanlarınız hatırlayacaktır, kuyruktaki mesajların
alınma süreleri, expire süreleri var. Eğer belirli bir zamanda kuyruktan
alınan mesajı işleyemezseniz UpdateMessage ile expire süresini uzatmak
zorundasınız. Tüm bu işlemler WebJobs SDK tarafından otomatik olarak
gerçekleştiriliyor. Yani yukarıdaki metod ne kadar uzun sürerse sürsün
arka planda WebJobsSDK sürekli UpdateMessage ile kuyruktan aldığınız
mesajın expire süresini öteleyecektir. Aslına WebJobs SDK'in yaptıkları
bu kadarla da kalmıyor. Eğer metod içerisinde herhangi bir noktada
Exception throw ederseniz doğrudan mesaj kuyruğa geri bırakılıyor.
Özetle yapılmaya çalışılan aslında olabildiğince sizi doğrudan
gerçekeştirmeniz gerekecek kuyruk operasyonlarından uzaklaştırmak ve
böylece işinizi kolaylaştırmak.

### POCO desteği de var!

Çoğumuz kuyruklara mesaj atarken Serialized bir obje atıyoruz. Basit
stringler atmıyoruz. Bu durumun farkında olan SDK ekibi ciddi güzel bir
hareket yapmış ve Serialize-Deserialize olaylarını da transparan hale
getirmeye çalışmış. Bence çok da iyi iş çıkarmışlar.

**[C\#]**

```cspublic class OrnekKuyrukMesaji{    public string Icerik1 { get; set; }    public string Icerik2 { get; set; }}public static void KuyruktanGelen([QueueInput("queuename")] OrnekKuyrukMesaji parametre){}```

Bence bu çok şık bir hareket. Atla deve değil. Sonuç itibari ile gelen
String biz de DeSerialize edebilirdik ama böyle ufak şeyler hem kodu
daha temiz tutarken hem de sonuç itibari ile günlük işleri
kolaylaştırıyor.

### Kuyruğa geri mesaj atmak istersek?

Diyelim ki kuyruktan mesajı aldınız, işlediniz ve başka bir kuyruğa
atacaksınız veya Blobları da kullanıyorsunuz ve bloblardan gelen bir
trigger sonrasında bir kuyruğa mesaj atmak istediniz. Özetle, şu ana
kadar kuyruklardan nasıl mesaj alırız kısmına baktık. Şimdi ise nasıl
mesaj atabileceğimize göz atacağız.

**[C\#]**

```cspublic class OrnekKuyrukMesaji{    public string Icerik1 { get; set; }    public string Icerik2 { get; set; }}public class GidenMesaj{    public string Icerik1 { get; set; }    public string Icerik2 { get; set; }}public static void KuyruktanGelenKuyrugaGider(    [QueueInput("gelenkuyruk")] OrnekKuyrukMesaji parametre,    [QueueOutput("gidenkuyruk")] out GidenMesaj gidenParametre,    [QueueOutput("log")] out string log){    gidenParametre = new GidenMesaj();    gidenParametre.Icerik2 = parametre.Icerik1;    gidenParametre.Icerik1 = parametre.Icerik1;    log = gidenParametre.Icerik1;}```

Yukarıdaki örnekteki iki farklı POCO'yu bir kenara koyalım. En son
metoda baktığınızda bir değil tam üç tane kuyrukla alakamız olduğunu
göreceksiniz. Bu kuyruklardan ilki "gelenkuyruk" içinden mesaj
alacağımız yer olacak. Oradan gelen mesajları "OrnekKuyrukMesaji"
nesnesine DeSerialize ediyoruz. Sonra output parametre olarak iki farklı
parametremiz var ve ikisi de aslında farklı kuyruklara gidiyor. Birine
Seralize olacak bir obje olarak GidenMesaj nesnesini gönderirken
diğerine string gönderiyoruz. Bu metod WebJobs tarafından
çalıştırıldığında bir kuyruktan alından mesajı transform edip iki ayrı
kuyruğa mesaj göndermiş olacağız. Yazdığımız kodun normak Azure SDK'deki
Queue operasyonlarına göre inanılmaz derece kısalmış olduğunu söylemem
gerek. İtiraf etmek gerekirse WebJobs SDK benim tüm Azure SDK'leri
arasında en favori SDK'lerimden biri.

WebJobs candır diyerek :) bir sonraki makaleye kadar görüşmek üzere!


