---
FallbackID: 3045
Title: Azure Functions ve Notification Hub Binding
PublishDate: 10/12/2016
EntryID: Azure_Functions_ve_Notification_Hub_Binding
IsActive: True
Section: software
MinutesSpent: 105
Tags: Azure Functions, Azure Notification Hub
---
Mobil uygulamaların back-end tarafı ile ilgili bana gelen en popüler sorular push notificationlar ile ilgili oluyor. Belirli aralıklarla bazı şeyleri kontrol edip notification yollamak bunların arasında en popüleri. Azure Functions ile beraber gelen Azure Notification Hub Output Binding desteği aslında bu tarz senaryolar için biçilmiş kaftan. 

### Hazırlıklar

Hazırlıklar kapsamında elinizde var olduğunu varsaydığımız bazı şeyler var :) Bunlardan ilki tabi ki Azure Notifican Hub hizmeti ve o hizmeti kullanan, push notification alabilen istemciler. Elinizde var olan Notification Hub'ın **DefaultFullSharedAccessSignature** Access Policy'sini Azure Portalı'ndan alıp **appsettings.json**'a koymanız gerekiyor.

**[appsettings.json]**
```javascript
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName={NAME};AccountKey={KEY}",
    "AzureWebJobsDashboard": "DefaultEndpointsProtocol=https;AccountName={NAME};AccountKey={KEY}",
    "NotifHubConnectionString": "Endpoint=sb://{ENDPOINT}.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey={KEY}"
  }
}
```

Ben **appsettins.json**'da key olarak **NotifHubConnectionString** kullandım. Bunu birazdan Azure Functions'da binding definitionda kullanacağız.

### Output binding 

Output binding olarak **notificationHub** bindingi kullanacağız. Bunun yanı sıra Azure Function'ı tetiklemek için de bir **timerTrigger** kullanalım. Örnekteki [**timerTrigger**](http://daron.yondem.com/software/post/Azure_Functions_ve_TimerTrigger_Kullanimi) 30 saniyede bir çalışacak. Böylece amacımız şu an için 30 saniyede bir tüm clientlara notification göndermek. Her zamanki gibi siz bu yapıyı farklı tasarlayabilirsiniz.

**[function.js]**
```javascript
{
  "bindings": [
    {
      "schedule": "0/30 * * * * *",
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in"
    },
    {
      "name": "notification",
      "type": "notificationHub",
      "tagExpression": "",
      "hubName": "daronnotification",
      "connection": "NotifHubConnectionString",
      "platform": "wns",
      "direction": "out"
    }
  ],
  "disabled": false
}
```

Yukarıdaki **function.js** dosyasında **timerTrigger** haricindeki kısımı incelersek **notificationHub** tipinde bir binding daha görüyoruz. Bu bindingin doğal olarak **direction**'ı **out** olarak ayarlanmak zorunda. **tagExpression** aslında Notification Hub'daki taglerinizi kullanabileceğiniz bir alan. Ben bu örnekte kullanmadım ve boş geçtim. **hubName** notification hub'ınız adı olacak. **connection** özelliği bir önceki adımda **appsettings.json**'da tanımladığımız key/value çiftinin key kısmı. Böylece notificationHub bindingi hangi service account'a gideceğini bilebilecek. Son olarak bir de **platform** özelliği var. Burada **Notification Hubs**'ın desteklediği **apns** (Apple Push Notification Service), **adm** (Amazon Device Messaging), **gcm** (Google Cloud Messaging), **wns** (Windows Push Notification Services), **mpns** (Microsoft Push Notification Service) veya yine Notification Hubs'ın **template** özelliğini kullanacağınızı belirtebilirsiniz. Ben bu örnekte istemci olarak bir UWP uygulaması kullanacağım için **wns** seçtim. Farklı platformlara ayrı ayrı yollamak isterseniz ya ayrı ayrı bindingler ayarlamanız gerekecek ya da doğrudan Notification Hub'ın **template** özelliğine başvurmanız gerekecek.

### Implementasyon

Artık herşey hazır ve kod yazmaya başlayabiliriz demeden önce bir de kullanacağımız [**Microsoft Azure Notification Hubs .NET SDK**](https://www.nuget.org/packages/Microsoft.Azure.NotificationHubs/)'ın nuget paketini **project.json**'a eklememiz gerekiyor.

**[project.json]**
```javascript
{
  "frameworks": {
    "net46":{
      "dependencies": {
        "Microsoft.Azure.NotificationHubs": "1.0.7"
      }
    }
  }
}
```

Bu da tamamlandığına göre yavaştan **run.csx**'e geçip kodumuzu yazabiliriz.

**[run.csx]**
```CS 
 #r "Microsoft.Azure.NotificationHubs"
using System;
using Microsoft.Azure.NotificationHubs;

public static async Task Run(TimerInfo myTimer, IAsyncCollector<Notification> notification, TraceWriter log)
{
   log.Info($"Sending WNS toast notification of a new user");
   string wnsNotificationPayload = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                                    "<toast><visual><binding template=\"ToastText01\">" +
                                        "<text id=\"1\">" +
                                            "Push " + DateTime.Now.ToString() +
                                        "</text>" +
                                    "</binding></visual></toast>";

   log.Info($"{wnsNotificationPayload}");
   await notification.AddAsync(new WindowsNotification(wnsNotificationPayload));
}
```

Yukarıdaki metodun imzasına baktığınızda bir **timerTrigger** ve bir de **notificationHub** bindingden gelen parametreleri görebilirsiniz. **IAsyncCollector<Notification>**'a istediğiniz sayıda notification verebilirsiniz. Örneğin hem Tile hem de Toast notification göndermek isterseniz bunu bir defada yapmak mümkün. Tüm bunları tabi ki  **notificationHub** bindingde tanımladığımız üzere tabi ki **wns** üzerinden gideceğini unutmayın. Eğer farklı platformları aynı anda hedeflemek isterseniz Notification Hub'ın **template** kısmına bulaşmanız gerek.

Ben bu örnekte basit bir şekilde saat bilgisini push notification olarak gönderdim.

![Azure Functions'dan Push Notification gönderirken...](media/Azure_Functions_ve_Notification_Hub_Binding/notificationhub-1.png)

İşte gördüğünüz gibi olay bu kadar basit. Artık ister **timerTrigger** gibi yapılarla belirli aralıklarla bir durumu kontrol edip ona göre push notification gönderme kararı alın, ister bir kuyruğu dinleyip görev geldiğinde notification gönderin. Dediğim gibi bundan sonrası sizin ihtiyaçlarınıza göre şekillendirilebilir. Önemli olan kısım Azure Functions ve NotificationHub Binding ile beraber aslında full bir back-end derdine girmeden notification ihtiyaçlarınızın neredeyse hepsini karşılayabiliyorsunuz. 

Hepinize kolay gelsin.
