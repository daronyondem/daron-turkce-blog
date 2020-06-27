---
FallbackID: 3043
Title: "Azure Functions ve Event Hub Trigger kullanımı"
date: "2016-12-8"
EntryID: Azure_Functions_ve_Event_Hub_Trigger_kullanimi
IsActive: True
Section: software
MinutesSpent: 110
Tags: Azure Functions
---
Eğer IoT taraflarıyla uğraştıysanız Azure Event Hub ile de karşılaşmış olmanız olası. Ben bu yazıda Event Hub'ın detaylarını ileriki bir yazıya bırarak Event Hub deneyimizin olduğunu varsayarak Azure Functions entegrasyonundan bahsedeceğim. Azure Functions ile beraber Event Hub ile entegre olabilmek adına hem **eventHubTrigger** geliyor hem de input ve output binding özellikleri geliyor. 

### Test ortamımız

Test ortamımız epey basit. **eventHubTrigger**'ı test edebilmek adına içine **eventData** gelen bir Hub'a ihtiyacımız var. Bunun için Azure tarafında bir **darontest** adında Event Hub yaratıp içinde de **darontesthub** adında bir hub yarattım ben. Sonrasında basit bir uygulama ile hub'a eventData gönderdim.

**[uygulama.cs]**
```CS
string eventHubName = "darontesthub";
string connectionString = "{BURAYA SİZİN CONNECTION STRING GELECEK}";

var eventHubClient = EventHubClient.CreateFromConnectionString(connectionString, eventHubName);

var message = Guid.NewGuid().ToString();
eventHubClient.Send(new EventData(Encoding.UTF8.GetBytes(message)) { PartitionKey = "Test" });
```

Yukarıdaki kodu çalıştırdığımızda basit bir şekilde için GUID olan bir mesajı **Test** adında bir Partition'a atıyoruz. 

### Event Hub Trigger Binding

Event Hub Trigger'ımızı tanımlarken Azure'daki ortamın connection stringini kullanmamız gerekecek. Bunun için **appsettings.json**'ı kullanabiliriz. 

**[appsettings.json]**
```javascript
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "AzureWebJobsDashboard": "UseDevelopmentStorage=true",
    "AzureEventHubConnectionString": "{BURAYA SİZİN CONNECTION STRING GELECEK}"
  }
}
```

Yukarıdaki şekilde Event Hub connection stringini Azure portalından alıp **appsettings.json**'a yazdıktan sonra artık klasik trigger tanımımızı yapabiliriz. Bunun için de **functions.json**'a geçiyoruz.

**[function.json]**
```javascript
{
  "bindings": [
    {
      "type": "eventHubTrigger",
      "name": "telemetriGelen",
      "direction": "in",
      "path": "darontesthub",
      "consumerGroup": "$Default",
      "connection": "AzureEventHubConnectionString"
    },
    {
      "name": "cikanNesneler",
      "type": "table",
      "tableName": "Cikanlar",
      "connection": "AzureWebJobsStorage",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

Ben daha önceki bir yazıda yaptığımız [Table Trigger](http://daron.yondem.com/software/post/Azure_Functions_ve_Table_Binding_Kullanimi)'dan yola çıkarak devam edelim dedim :) O nedenle hızlıca yukarıya bir **Table Output Binding** koydum. Amacımız Event Hub'a **eventData** geldiğinde bunu yakalayıp Table'a kaydetmek. Tabi ki arada siz farklı işlemler de yapabilirsiniz. Ben örnek için "al gülüm, ver gülüm" yapıyorum :) 

Yukarıdaki **function.json**'a bakarsanız üst kısımda **eventHubTrigger**'ı bulabilirsiniz. Binding'imize **type** olarak **eventHubTrigger** dedikten sonra Azure Function'da metod imzasında bind edilecek parametrenin adını da **name** değerine veriyoruz. Dışarıdan içeriye data geleceği için **direction** **in** olarak kalıyor. **path** dediğimiz ise kullanacağımız **hub**'ın adı. **consumerGroup** kısmını aslında boş bıraksam da **Event Hub**'daki **$Default**'a yönlenirdi. Ben yine de boş geçmemek adına yazdım, fakat siz tabi ki istediğiniz **Consumer Group** adını yazabilirsiniz. Azure Event Hub'a özel bir tavsiye olarak Event Hub'a bağlı functionlarınızı çok şişirmemenizi tavsiye ederim. Onun yerine birden çok Function yazıp farklı Consumer Group'lar kullanmanız daha performanslı olacaktır. Azure Functions SDK arka planda **EventProcessorHost** kullanıyor ve **EventProcessorHost** Consumer Group'larda Parition başına tek reader kullanır. **EventProcessorHost** kendi içerisinde ölçeklenebilse de işinizi bölebiliyorsanız ayrı götürmen daha da hızlandıracaktır. Son olarak bir önceki adımda **appsettings.json**'a eklediğimiz connection stringi burada da **connection** olarak veriyoruz.

**[run.csx]**
```CS 
 #r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
public static void Run(string telemetriGelen, ICollector<OrnekObje> cikanNesneler, TraceWriter log)
{
    OrnekObje gidenObje = new OrnekObje();
    gidenObje.PartitionKey = System.Guid.NewGuid().ToString();
    gidenObje.RowKey = System.Guid.NewGuid().ToString();
    gidenObje.Metin = $"{telemetriGelen} alındı";
    cikanNesneler.Add(gidenObje);
}

public class OrnekObje
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string Metin { get; set; }
}
```

Yukarıdaki function'da **telemetriGelen** string tipinden bir değişken ve bize doğrudan Event Hub'a gönderilen veriyi getiriyor. Biz bu örnekte Random birer **ParitionKey** ve **RowKey** vererek doğrudan Table Services'a atıyoruz. Eğer **eventData** ile ilgili daha çok veriye ulaşmak isterseniz **Service Bus SDK'ine başvurmanız gerekecek.

![Table Services'a attığımız Event Hub verisi.](media/Azure_Functions_ve_Event_Hub_Trigger_kullanimi/eventhubtrigger-1.png)

**[project.json]**
```javascript
{
  "frameworks": {
    "net46":{
      "dependencies": {
        "WindowsAzure.ServiceBus" : "3.4.3"
      }
    }
  }
}
```

İlk aşamada yukarıdaki gibi **ServiceBus** nuget paketini projeye ekleyin. Bunu yaptıktan sonra projeyi çalıştırdığınızda Azure Functions Runtime function'ı çalıştırmadan önce **nuget restore** da yapacak. Sonrasında doğrudan **using** ile kütüphaneyi kullanabiliriz. Gelin onu da **output binding**'e bakarken yapalım.

### Output Binding

Output binding için **function.json** dosyasındaki Table Binding'i kaldırarak yerine tahmin edebileceğiniz üzere bir **Event Hub Binding koyuyoruz. **Event Hub Trigger**'dan farklı olarak **direction** **out** olacak ve **Consumer Group** olmayacak.

**[function.json]**
```javascript
{
  "bindings": [
    {
      "type": "eventHubTrigger",
      "name": "telemetriGelen",
      "direction": "in",
      "path": "darontesthub",
      "consumerGroup": "$Default",
      "connection": "AzureEventHubConnectionString"
    },
    {
      "type": "eventHub",
      "name": "telemetriGiden",
      "path": "darontesthub",
      "connection": "AzureEventHubConnectionString2",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

Arada ben ikinci bir Hub daha yaratıp onun da connection stringi ekledim **appsettings.json**'a. Böylece bir hub'dan alıp diğerine aktarıyor olacağız.

**[run.csx]**
```CS
using Microsoft.ServiceBus.Messaging;

public static void Run(EventData telemetriGelen, ICollector<string> telemetriGiden, TraceWriter log)
{
    telemetriGiden.Add("Mesaj 1 " + telemetriGelen);
    telemetriGiden.Add("Mesaj 2 " + telemetriGelen);
}
```

Gördüğünüz üzere Event Hub Trigger'ın bindinginde nesne tipi olarak **EventData** kullandık. Böylece artık **eventData**'nın sadece body değil tüm bilgilerine ulaşabiliriz. Ayrıca output binding'de de **ICollector** kullanarak geriye birden çok event gönderiyoruz. Burada **ICollector<string>** yerine isterseniz **ICollector<EventData>** de kullanabilirsiniz. 

### Ek ayarlar

**[Host.json]**
```javascript
{
    "eventHub": {
      "maxBatchSize": 64,
      "prefetchCount": 256
    },
}
```

Yukarıdaki ayarları varsayılan değerleri ile yazdım. **maxBatchSize** bir defada event hub'dan alınacak mesaj sayısını belirliyor. **PrefetchCount** da tahmin edebileceğiniz üzere aslında Azure Functions SDK'in arkaplanda kullandığı **EventProcessorHost** ile ilgili. Toplamda ne kadar mesajın işlenme öncesinde belleğe alınması gerektiğini belirtiyor. Azure Functions SDK mesaj göndermek için **EventHubClient** ve dinlemek için **EventProcessorHost** kullanıyor. 

