---
FallbackID: 3040
Title: Azure Functions ile QueueTrigger Kullanmak
PublishDate: 12/5/2016
EntryID: Azure_Functions_ile_QueueTrigger_Kullanmak
IsActive: True
Section: software
MinutesSpent: 88
Tags: Azure Functions
---
Azure Functions'da kullanabileceğimiz Trigger yapılarından biri de QueueTrigger. Azure Storage hizmetinin bir parçası olan Queue Storage genelde Web ve Worker Role'lerin birbirinden bağımsız olarak ölçeklendirildiğinde birbirleri ile konuşabilmesi için kullanılıyor. Bu yazıdaki amacım tabi ki Queue Storage'ı anlatmak değil. O konuyu merak edenler için daha tavsiyem [daha önce yazdığım bu yazıyı](http://daron.yondem.com/software/post/Azure_Stroge_da_Queue_Servisi) okumaları ;)

### Queue Trigger Tanımlamak

Queue Trigger tanımlama işimize yeni yaratacağımız bir Function'ın **function.js** dosyasından başlayacağız.

**[function.js]**
```javascript
{
    "disabled": false,
    "bindings": [
      {
        "name": "queueJob",
        "queueName": "samplequeue",
        "connection": "AzureWebJobsStorage",
        "type": "queueTrigger",
        "direction": "in"
      }
    ]
}
```

Parametrelere bakacak olursak, **name** bizim functiona Queue mesajını taşıyacak olan parametrenin adı olacak, **queueName** dinleyeceğimiz kuyruğun adı olacak (kullanacağımız storage hesabında bu isimde bir kuyruk yaratmamız gerek), **connection** kısmında **appsettings.json**'a koyacağımız storage connection stringini **key** adını yazıyoruz ki functions hangi storage account'a gideceğini bilsin ve son olarak **type** için doğal olarak **queueTrigger** diyerek **direction** olarak da **in** diyoruz. Böylece **queueTrigger** tipinde bir **inputTrigger** yaratmış olduk ve hangi storage account'taki hangi kuyruğu dinlemek istediğimizi ve hangi parametre ismi ile bizim function'a gönderilmesi gerektiğini de belirtmiş olduk.

**[appsettings.json]**
```javascript
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "AzureWebJobsDashboard": "UseDevelopmentStorage=true"
  }
}
```

**AppSettings.json** dosyamız yukarıdaki şekilde local storage emülatörünü gösteriyor. Buradaki **AzureWebJobsStorage** connection stringini zaten function'ı tanımlarken de kullanmıştık. **samplequeue** adındaki kuyruğu Azure Functions Runtime bu storage account içerisinde arayacak. Localde test edebilmek için [Azure Storage Explorer](http://storageexplorer.com/) kullanarak local emülatörü bağlanıp elle gerekli kuyruğu yaratabilirsiniz.

**[run.csx]**
```CS 
using System;

public static void Run(string queueJob,
    DateTimeOffset expirationTime,
    DateTimeOffset insertionTime,
    DateTimeOffset nextVisibleTime,
    string queueTrigger,
    string id,
    string popReceipt,
    int dequeueCount,
    TraceWriter log)
{
    log.Info($"C# Queue trigger function çalıştı: {queueJob}\n" +
        $"queueTrigger={queueTrigger}\n" +
        $"expirationTime={expirationTime}\n" +
        $"insertionTime={insertionTime}\n" +
        $"nextVisibleTime={nextVisibleTime}\n" +
        $"id={id}\n" +
        $"popReceipt={popReceipt}\n" +
        $"dequeueCount={dequeueCount}");
}
```

Yukarıda en basit hali ile bir log atan Azure Function var. Gelin şimdi bu function'ın parametrelerini inceleyelim. 

- **queueJob** zaten bizim **function.js** içerisinde **name** olarak verdiğimiz parametre. Bu parametreyi biz şimdilik **string** olarak tanımladık. Azure Functions Runtime'ı kuyruktan gelen mesaj string olarak deserialize edip bize verecek. Ben bu örnekte kuyruktaki mesaja "ornekmesaj" yazmıştım ve bu string parametrede de geriye o metin geldi.
- **queueTrigger** parametresi ilk bakışta kafa karıştırabilir çünkü bu parametrenin yaptığı iş aynı bizim **queueJob** gibi string olarak kuyruktaki mesajın içeriği dönmek. Peki neden böyle iki parametre var? Çünkü eğer isterseniz **queueJob** parametresini string olarak değil de **CloudQueueMessage** tipinde de alabiliyorsunuz. Bu durumda ayrıca bir de **string** olarak aliyim derseniz **queueTrigger**'ı kullanabilirsiniz. 
- **expirationTime** kuyruktaki mesajı işlemezseniz ne kadar sürede expire edeceğini verir. 
- **insertionTime** kuyruktaki mesajın kuyruğa eklediği zamanı verir.
- **nextVisibleTime** kuyruktan alınan bir mesajın alındıktan sonra başarılı bir şekilde işlenmezse ne zaman tekrar kuyrukta görünür olacağını verir. Eğer input parametre tipini **CloudQueueMessage** olarak alırsanız bu süreyi uzatma şansınız olabilir. 
- **Id** bu queueItem'ın unique ID'sini verir.
- **popReceipt** ise eğer **CloudQueueMessage** mesaj ile manual işlemler yapmak isterseniz işinize yarayabilir. O anki Azure Functions instance'ının kuyruktan mesajı alırken elde ettiği **popReceipt**'ı size verir. Böylece eğer elinizdeki işlem uzun sürer ve başka bir instance da kuyruktan aynı işi alırsa **popReceipt** ile storage API'larına gittiğinizde geriye hata alma şansınız olur. Genelde **popReceipt** kullanımını Azure Stroge SDK zaten kendi içerisinde hallediyor. Ama Azure Storage'ın REST API'larına kendiniz gitmek isterseniz bir queue mesajına bir delete veya update yapmanız için elinizdeki kesinlikle **popReceipt**'ınızın olması gerekir. Bir anlamda sizin kuyruktan mesajı alma biletiniz diyebiliriz. İtiraf etmek gerekirse bir Azure Functions içerisinde bu parametreyi kullanma ihtimaliniz epey düşük.
- **dequeueCount** parametresi ile bir mesajın kuyruktan kaç defa alındığını verir. Sürekli kuyruktan aldığınız fakat bir türlü başarılı bir şekilde işleyemediğiniz mesajları işlemeyi kaç defa deneyeceğinizi belirlemeniz gerekiyor. Zehirli mesajlar olarak da adlandırılan bu mesajlar bir süre sonra sayı olarak artarsa sürekli kısır döngüde aynı mesajları işlemeye çalışıp hep başarısız olan bir ortama sebep verebilir. Buna engel olmak için **dequeueCount** kullanarak bir mesajın kaç defa denendiğini görebilirsiniz. Varsayılan ayarlarda Azure Functions bir mesajı 5 defa işlemeyi deneyip sonra doğrudan **samplequeue-poison** kuyruğuna taşıyacaktır. Bu kuyruğun adı tahmin edeceğiniz üzere sürekli olarak sizin orijinal kuyruk adınızın sonuna **-poison** eklenerek oluşturulur. **Poison** (zehirli) mesaj kuyruğunu dinleyerek gerekli işlemleri yapmak da artık size kalıyor. 

![Queue Trigger Log çıktısı](http://blob.daron.yondem.com/assets/3040/queuetrigger-1.png)

Bir mesajın başarılı bir şekilde işlenip işlenmediğine Azure Functions nasıl karar verir? diye sorarsanız, cevabı basit. Eğer function geriye bir exception dönmüyorsa alınan mesaj başarılı bir şekilde işlendi demektir.

### Runtime Konfigürasyonu

Azure Functions'daki **qeueTrigger**lar ile ilgili yapabileceğimiz bazı özelleştirmeler var. Bunları  **host.json** dosyası içerisinde yapabiliyoruz ve bir Function App genelinde geçerli oluyor. 

**[host.json]**
```javascript
{
  "queues": {
    "maxPollingInterval": 2000,
    "batchSize": 16,
    "maxDequeueCount": 2,
    "newBatchThreshold": 8
  }
}
```

- **maxPollingInterval** Azure Functions Runtime'ının ne kadar sürede bir kuyruğu kontrol edeceğini belirler. Varsayılan ayarlarda iki saniyede bir kuyruğa gidip yeni bir job olup olmadığı kontrol edilir. Bunu isterseniz burada değiştirebilirsiniz.
- **batchSize** Aynı anda paralel olarak alınabilecek görev sayısını belirler. Varsayılan ayar 16, azami verebileceğiniz değer ise 32. Bu değer size az gelirse maalesef daha fazla arttırmak için birden fazla Function veya Thread ile uğraşmak zorundasınız. Bu konuda UserVoice üzerinde bir istek var, [oy vermek isterseniz buyurun](https://feedback.azure.com/forums/169385-web-apps-formerly-websites/suggestions/7454605-webjobs-better-scalability-support-needed) :)
- **maxDequeueCount** dan daha önce bahsetmiştik. Varsayılan ayar beş defa bir mesajı denemek şeklinde. Bu sayıyı istediğiniz gibi değiştirebilirsiniz.
- **newBatchThreshold** yeni bir Batch alınması için ulaşılması gereken asgari batch batch sayısını tanımlar. Varsayılan ayarlarda bu **batchSize**'ın yarısı olarak tanımlanır. Örneğin **batchSize** için aynı anda 16 mesaj alınabileceğini ayarladıysanız **newBatchThreshold** 8 olacaktır ve eldeki paralel olarak işlenen mesaj sayısı 8'e düşmedikçe yeni bir 16'lık Patch alınmayacaktır. **newBatchThreshold** değerini değiştirerek kuyruktan aynı anda daha fazla mesaj alınmasını sağlayabilirsiniz fakat özellikle **Consumption Plan** yerine klasik **App Service Plan** kullanıyorsanız RAM/CPU tüketimi adına aşırı paralelleşmekten uzak durmak da isteyebilirsiniz. Dikkatli olmakta fayda var :)

### Queue Binding 

Bu noktaya kadar bir queue trigger tanımlayıp kuyruğa mesaj atıldığında onu işlemeyi gördük. Gelin bir de bir kuyruktan diğerine mesaj atma konusuna bakalım. Özetle, queue bindingleri kullanarak birden çok kuyruk arasında iletişim sağlayacağız.

**[function.js]**
```javascript 
{
  "disabled": false,
  "bindings": [
    {
      "name": "queueJob",
      "queueName": "samplequeue",
      "connection": "AzureWebJobsStorage",
      "type": "queueTrigger",
      "direction": "in"
    },
    {
      "name": "queueJobOutput",
      "queueName": "samplequeueout",
      "connection": "AzureWebJobsStorage",
      "type": "queue",
      "direction": "out"
    }
  ]
}
```

Yukarıdaki örnekde ikinci bir binding daha görüyorsunuz. Yine **name** parametresindeki değer bizim function'ın imzasında yer alacak. **queueName** bu sefer yeni bir output kuyruğunun adı. **connection**ımız aynı, böylece aynı storage hesabını kullanmış olacağız. Son olarak binding tipimiz **queue** ve **direction** da **out** şeklinde ayarlanmış durumda.

**[run.csx]**
```CS
using System;

public static void Run(string queueJob, out string queueJobOutput, TraceWriter log)
{
    queueJobOutput = queueJob + " devam....";
}
```

Bu sefer function kodunu biraz daha temiz tutmak istedim. Basit bir şekilde input ve output parametrelerimiz var. **queueJobOutput** parametresini zaten output bindingimizi tanımlarken kullandığımız **name** değeri oldu. Bu functionın yapacağı şey bir kuyruğa mesaj eklendiğinde tetiklenip gelen mesajın sonunda " devam..." metnini ekleyip yeni kuyruğa yeni bir mesaj olarak eklemek olacak. Eminim siz daha anlamlı senaryolar düşünebilirsiniz :)

**[run.csx]**
```CS
using System;

public static void Run(string queueJob, ICollector<string> queueJobOutput, TraceWriter log)
{
    queueJobOutput.Add(queueJob + " devam...)");
    queueJobOutput.Add(queueJob + " daha da devam...");
}
```

Eğer aynı kuyruğa birden çok mesaj  / görev atmanız gerekirse bu sefer **ICollector**'ı kullanabilirsiniz. Yukarıdaki örnekte bizim kaynak kuyruktan gelen görevi alıp iki farklı görev (queue job) yaratıp output bindingde tanımlı kuyruğa gönderiyoruz. 

### POCO Kullanımı

İsterseniz bindinglerde kendi özel objelerinizi de kullanabilirsiniz.

**[run.csx]**
```CS
using System;

public static void Run(string queueJob, out OrnekMesaj queueJobOutput, TraceWriter log)
{
    queueJobOutput = new OrnekMesaj() { Metin = $"{queueJob} devam..." };
}

public class OrnekMesaj
{
    public string Metin { get; set; }
}
```

Yukarıdaki örnekte kaynak kuyruktan gelen metnin üzerine " devam..." metnini eklerken artık geriye basit bir **String** olarak değil de custom **OrnekMesaj** nesnesi ile gönderiyoruz. Buradan yeni kuyruk objesine, göreve deserialize işlemini JSON deserializer kullaran Azure Functions Runtime kendisi halledecek. Aynı işlemi input binding'lerde de kullanabilirsiniz. 

![Output Binding'de JSON Deserialization](http://blob.daron.yondem.com/assets/3040/queuetrigger-2.png)

Yukarıdaki ekran görüntüsünde yaptığımız örneklerin output binding sonuçlarını görebilirsiniz. 

Kolay gelsin ;)
