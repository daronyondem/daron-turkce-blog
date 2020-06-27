# Azure Event Grid Nedir?

Hi� webhook a�mak zorunda kaldiniz mi? Veya s�yle sorayim; hi� size ait olmayan, harici bir HTTP Endpointi belirli bir olay ger�eklestiginde iteklemeniz gerekti mi? :) Peki itekleyemeyip, sonra tekrar denemeniz gerekti mi? Peki b�yle bir altyapi olusturup milyonlarca farkli yeri, milyonlarca defa, hatta hata durumunda tekrar deneyebilecek sekilde iteklemeniz gerekti mi? "Yahu bu bildigimiz pub/sub?" diyorsaniz dogru yolda sayiliriz. Gelin devam edelim. 

�zellikle Serverless'in pop�lerlesmesi ile beraber event based uygulamalardaki eventlerin tabiri caiz ise cloud eventlerine d�n�smesi giderek hizlaniyor. Azure'daki bir uygulamada olusan durumla gidip AWS'deki bir uygulamayi tetiklemeniz gerekebiliyor. Bunu yaparken AWS'deki uygulamanin hayatta oldugunu da varsayamazsiniz, ��nk� burasi Cloud, her sey olabilir :) Azure Event Grid'in ��zd�g� problem de bu. Uygulamalar gelip "Subscribe" olduktan sonra Event'ler dogrudan uygulamalara Azure Event Grid tarafindan g�nderiliyor. **HTTP200 veya 202 disinda** bir cevap geldigi anda Azure Event Grid s�z konusu eventi teslim etmeyi tekrar deniyor. 10 saniye, 30 saniye, 1 dakika, 5 dakika, 10 dakika, 30 dakika, 1 saat... Bir saatten sonra tekrar birer saat ara ile denemeler devam eder. Deneme s�releri arasinda ufak rastgele zaman araliklari da var, yani nokta atisi beklemeyin. 24 saat i�erisinde bir event teslim edilemezse silinir, iptal edilir. **1 milyon event operasyonu i�in 0.60$** �dersiniz. Bu operasyon sayisina tekrar denemeler de dahildir. Azure Event Grid budur :)

### Eventin hangi tarafindasiniz?

Bu noktadan sonra Event Grid ile ilgilenme sekliniz aslinda Event'in hangi tarafinda olacaginiza g�re degisiyor. Event alacak olan taraftaysaniz (Handler) size verilecek bir endpointe subscribe olmaniz gerekecek. Bu konuda da eger elinizde �zel olarak custom bir publisher (event yollayan) yoksa Azure i�erisindeki implemantasyonlara g�z atabilirsiniz. Azure kendi i�inde de Event Grid'i kullaniyor ve �ogu hizmetin zaten Event Grid entegrasyonu var. Asagidaki grafikte de g�rebileceginiz �zere default Azure Publisher'larindan herhangi birine gidip subscribe olabilirsiniz. (Custom Topics konusuna sonraki bir yazida bakacagiz *Edit:[Event-Grid-Harici-Publisher-Handler](Yazi burada)*)

![Azure Event Grid Publisher ve Handler'lar](media/Azure-Event-Grid-Nedir/event-grid.gif)

Eger aldiginiz eventi yine Azure i�erisindeki bir hizmete aktarmak isterseniz bunun i�in de hazir handler entegrasyonlari var. Yine yukaridaki grafikte sag tarafta platform ile beraber gelen Handler'larin listesine bakabilirsiniz. �rnegin bir blob yaratildiginda Azure Function �alistirmak istiyorsaniz Event Grid s�per dogru bir tercih olacaktir.

### Azure Function mi? BlobTrigger vardi ya? Neden Event Grid?

Azure Functions ile hi� ugrasmamis olsaniz da bu b�l�m� atlamayin :) ��nk� bir anlamda Microsoft'un neden Event Grid diye bir seyle ortaya �iktigini anlamak i�in g�zel bir �rnek olacak. 

Azure Functions i�erisinde BlobTrigger denilen bir yapi var. [Hatta ben bu yapiyla ilgili de 2016'da detayli bir yazi yazmistim](http://daron.yondem.com/azure_functions_ile_blobtrigger_kullanmak). Functions SDK i�erisindeki BlobTrigger ile bir Blob degistiginde Function'lar tetiklenebiliyor. Fakat BlobTrigger aslinda kendi logunu tutarak, polling yaparak �alisiyor. Zaten eski yazida da bahsetmisim, �ok sayida blobun oldugu senaryolarda QueueTrigger vs kullanmak daha iyi oluyordu. Isin g�zel tarafi Event Grid kullandiginizda artik sizin  polling yapmaniza gerek kalmiyor yok, execution log tutup onu incelemnize de gerek yok. Event Grid kendisi gelip Function'inizi tetikleyebiliyor. Yani eskiden Event Grid olaydi Azure Function ekibinin BlobTrigger yapisini yazmasina falan gerek kalmayacakti :) 

### Azure i�inden Publisher ve Handler Kullanmak

Gelin hizlica yukaridaki senaryonun Azure'da nasil �alistigina bir g�z atalim. Bunun i�in bir Azure Function App yarattiktan sonra i�ine basit bir Function koyacagiz. Amacimiz bu Function'in Event Grid entegrasyonunu kullanarak Publisher olarak ayarlayip istedigimiz Storage Account'tan gelen eventleri karsilamasini saglamak. 

![Event Grid Trigger'i olan bir Function ekliyoruz.](media/Azure-Event-Grid-Nedir/event-grid-trigger.jpg)

Yukaridaki ekran g�r�nt�s�nde de g�rebileceginiz �zere ben Azure Functions sitesinde template'lardan hazir olarak gelen Event Grid Trigger'i se�tim. �ok �nemli bir detay degil bu, beraberinde getirecegi sadece metod imzasinda iki tane hazir parametre.

![Event Grid Subscription ekliyoruz.](media/Azure-Event-Grid-Nedir/event-grid-trigger-2.jpg)

Gelen kod yukaridaki kadar. Sag �stte g�rd�g�n�z "Add Event Grid Subscription"a basarak ilerleyecegiz. Bunu yapmadan �nce Event Grid destegi olan V2 bir Azure Storage hesabiniz olmasi gerekiyor. Eski Storage Account'larda Event Grid destegi yok.

![Event Grid Subscription ayarlari.](media/Azure-Event-Grid-Nedir/event-grid-trigger-subscription.jpg)

Yukaridaki ekran g�r�nt�s�nde t�m gerekli ayarlari g�rebilirsiniz. Anlatilmasi gerekenlere gelirsek;

- **Topic Type**: Tabi Storage Account dinleyecegimiz i�in bunu se�tik.
- **Instance**: Bu benim storage account'un adi :) �ok yaratici :)
- **Event Types**: Burada Created ve Deleted'lari alabiliyoruz. Ben sadece Created se�tim.
- **Subscriber Type**: Event Hub veya Webhook olabiliyor. Azure Function i�in built-in Webhook destegi daha rahat oluyor diye d�s�nd�m.
- **Subscriber Endpoint**: Buradaki endpoint [EventGridExtensions](https://github.com/Azure/azure-functions-eventgrid-extension/blob/master/src/EventGridExtension/EventGridExtensionConfig.cs)'dan geliyor. Event Grid'e subscribe olurkenki validasyon gibi konulari bu extension hallediyor ve bizim Function i�inde ugrasmamiza gerek kalmiyor. Bu konuyu da ileriki bir yazida Azure disi handler kullanirken inceleyecegiz.
- **Prefix Filter**: Sadece belirli bir containerdaki dosyalari isleyebilecek �rnek bir filtre koymak istedim.
- **Suffix Filter**: Ben kullanmadim fakat ne ise yaradigi sanirim belli :) Blob URL suffix matching yapabiliyorsunuz.   
   
Azure Functions tarafinda Event'i adam gibi deserialize etmek i�in de kodu asagidaki sekilde degistirebilirsiniz:)   
   
```CS
#r "Newtonsoft.Json"
#r "Newtonsoft.Json"
#r "Microsoft.Azure.WebJobs.Extensions.EventGrid"

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;

public static void Run(EventGridEvent eventGridEvent, TraceWriter log)
{
    log.Info($"Subject: {eventGridEvent.Subject}");
    log.Info($"Time: {eventGridEvent.EventTime}");
    log.Info($"Data: {eventGridEvent.Data.ToString()}");
}
```

Su EventGridExtension ve beraberinde gelen custom endpointten biraz daha bahsetmekte fayda var. Azure Event Grid'e herhangi bir endpoint kendini subscribe ederken ayni anda valide de etmesi gerekiyor. Bunun i�in  Event Grid subscribe olan tarafa bir **SubscriptionValidationEvent** g�nderiyor. Bu normal eventlerden farkli bir event ve i�erisinde **validationCode** var. Subscribe olan tarafin bunu alip **validationResponse** olarak geri d�nd�rmesi gerekiyor ki subscription olusturulsun. Validasyon s�recinden ge�ildikten sonra artik karsi tarafa normal eventler g�nderilmeye baslaniyor. Biz bunlari Azure Function i�erisinde sifirdan yapmayalim diye Azure Function ekibi bir Extension yazmis. T�m bunlari sifirdan nasil yapacagimiza ileriki yazilarda custom subscriber olustururken g�z atacagiz. 

### Polling'e son

Azure Event Grid ger�ek anlaminda pollingden kurtulmamizi sagliyor. Bug�ne kadar Azure i�erisinde de Azure Function'lar olsun Logic Apps olsun bir�ok hizmet �yle veya b�yle birbirleri ile konusabilmek i�in polling yapiyordu. Oysa artik Event Grid ile pollingin maliyetinden ve kismi gecikmelerinden kurtulmus oluyoruz. Serverless tarafina baktiginizda ise eventing i�in kuyruk kullanma ve kuyrugu poll'lamaya s�per bir alternatif. Tabi bu "kuyruk yerine artik Event Grid" gibi bir sonu� da �ikarmiyor :) Kuyruklarin yeri ayri, fakat artik eventing i�in kuyruklari k�t�ye kullanmaya gerek yok. Event Grid bug�n saniyede milyonlarca eventi destekleyecek bir altyapiya sahip. En g�zel tarafi ise bir event publisher'a birden �ok subscriber da olabiliyor olmasi. Bir anlamda fan-out da yapabiliyorsunuz. 

### Fiyatlandirma

Azure Event Grid'in fiyatlandirmasi ger�ek bir cloud hizmetinin fiyatlandirmasina �ok g�zel bir �rnek. Hi� kullanmazsaniz hi� �demezsiniz. Provisioning vs yok. **Ayda 100.000 operasyon �cretsiz**. Bu kota yazilim gelistirme s�re�lerindeki, test vs ihtiya�larinizi rahatlikla karsilasayacaktir. Azure Event Grid i�in bir operasyon demek gelen, giden event, servisle konusmak i�in sizin kullandigimiz management api'lari ve bir eventin teslim edilmesi i�in eger gerekmisse farkli denemelerin toplami anlamina geliyor. Unutmadan bir de bu "Advanced matching" var ayri operasyon olarak kabul edilen. Bu da "subject pattern filtering", yani "Subject ends with" sorgusunu kullandiginizda ge�erli olacaktir. 

### Son olarak...

* 99.99% SLA
* [Management SDK'leri Python, .Net, ve Node.js](https://docs.microsoft.com/azure/event-grid/sdk-overview)'leri i�in su an yayinda. Go, Ruby, ve Java SDK'leri ise yakinda gelecek. 
* [Publish SDK i�in su an .Net destegi var](https://docs.microsoft.com/azure/event-grid/sdk-overview). Python, Node.js, Go, Ruby, ve Java yakinda gelecek.   
   
Simdilik bu kadar :) Sonraki yazilarda g�r�smek �zere.




*Bu yazi http://daron.yondem.com adresinde, 2018-2-13 tarihinde yayinlanmistir.*
