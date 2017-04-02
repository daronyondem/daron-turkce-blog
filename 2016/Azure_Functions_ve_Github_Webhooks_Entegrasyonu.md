---
FallbackID: 3047
Title: Azure Functions ve Github Webhooks Entegrasyonu
PublishDate: 12/13/2016
EntryID: Azure_Functions_ve_Github_Webhooks_Entegrasyonu
IsActive: True
Section: software
MinutesSpent: 68
Tags: Azure Functions
---
Daha önceki [Azure Functions ve Webhooks konusundaki yazıda](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) Github'ı örnek olarak kullanmıştık. Fakat aslına bakarsanız Azure Functions ile beraber Github ve Slack için hazır entegrasyon yapıları geliyor. Örneğin yine [Azure Functions ve Webhooks](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) yazısından hatırlarsanız Github implementasyonunda **Secret**'ı kullanmamış ve o kısmı size bırakmıştım. Onun yerine biz URL üzerinden giden **Function based Authentication** kullanmıştık. Oysa **Secret** kullansaydık buna da gerek kalmayacaktı :) Peki neden o yazıyı öyle yazdın? derseniz :) ben konuyu daha genel bir yapıda anlatmak istedim. Bu yazıda ise Azure Functions için **httpTrigger**'lardaki **webHookType** özelliğine bakacağız.

### httpTrigger'da webHookType

Azure Functions'da trigger olarak **httpTrigger** kullanırken **webHookType** denilen bir özelliği de opsyonel olarak tanımlayabiliyorsunuz. Bu özelliğin alabildiği şu an için üç değer var; 

- genericJson : Bu seçenekte aslında tek yapılan httpTrigger'ın sadece POST almasını sağlamak ve application/json content-type sınırlaması yapmak. Bunun dışında bir işlevsellik sağlamıyor. Biz bunu kapaca [Azure Functions ve Webhooks konusundaki yazıda](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) **webHookType** kullanmadan yaptık.
- github : Bu tahmin edebileceğiniz üzere doğrudan github uyumlu olarak çalışabilen bir webhook receiver implementasyonu yapmamızı sağlayacak. Yine [Azure Functions ve Webhooks konusundaki yazıda](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) bahsettiğimiz **Secret** kısmı ile ilgili implementasyon burada otomatik olarak geliyor. Dikkat edilmesi gereken tek nokta trigger definition'da **authLevel** özelliğinin ayarlanmamış olması gerekiyor. Nedeni ise aslında anonim bir metod kullanarak validasyonu ** X-Hub-Signature** header'ı üzerinden yapacak olmamız. 
- slack : Aynı bir önceki github örneğinde olduğu gibi bu seçenek de doğrudan Slack için hazır bir yapı getiriyor. Bu seçenekte de **authLevel** özelliğinin trigger definition'da tanımlanmaması gerekiyor. 

**[function.js]**
```javascript
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "webHookType": "github",
      "name": "req"
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

Yukarıdaki bindinglerden de anlayabileceğiniz üzere örneğimizde bir **httpTrigger** ile input binding kullanırken yine [Azure Functions ve Webhooks konusundaki yazıda](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) yaptığımız gibi kayıtları alıp **Table Services**'a atacağız. Normal şartlardaki bir **httpTrigger**'dan farklı olarak burada bir de **webHookType** denilen bir özelliğe **github** değerini veriyoruz. 

![Github Secret doğrudan ekranda.](http://blob.daron.yondem.com/assets/3047/github-webhook-1.png)

**webHookType**'ı **github** olarak ayarladığınız anda Azure Web Portal'ındaki Azure Functions editöründe bir değişiklik göreceksiniz. Artık **code** parametresi ile URL üzerinden bir erişim kodu gitmeyecek. Onun yerine doğrudan **Github Secret** adında bir field ekleniyor. Bu fielddeki değeri alıp Github'da WebHook tanımlarken doğrudan Github Secret olarak vereceğiz.

![Github Secret'ı Webhook tanımlarken Github'a veriyoruz.](http://blob.daron.yondem.com/assets/3047/github-webhook-2.png)

Azure Portal'ından aldığımız key'i yukarıdaki gibi github'da WebHook'a **Secret** olarak verdiğimizde aslında işimiz neredeyse bitmiş oluyor.

**[run.csx]**
```CS 
using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<GithubKaydi> cikanNesneler, TraceWriter log)
{
   dynamic data = await req.Content.ReadAsAsync<object>();

   GithubKaydi cikanLog = new GithubKaydi();
   cikanLog.PartitionKey = data?.action;
   cikanLog.RowKey = System.Guid.NewGuid().ToString();
   cikanLog.JSONPayload = data?.ToString();
   cikanNesneler.Add(cikanLog);

   return req.CreateResponse(HttpStatusCode.OK, new
   {
      body = $"From GitHub : {data.assignee.id}"
   });
}

public class GithubKaydi
{
   public string PartitionKey { get; set; }
   public string RowKey { get; set; }
   public string JSONPayload { get; set; }
}
```

Yukarıdaki örnek yine [Azure Functions ve Webhooks konusundaki yazıdan](http://daron.yondem.com/software/post/Azure_Functions_ile_Webhooks_Binding) çalıntı :) Değişen tek kısım benim Newtonsoft kullanmaktan vazgeçmem oldu :) Onun dışında kod bire bir aynı. 

![Github'dan gelen webhook verileri Table Services'da.](http://blob.daron.yondem.com/assets/3047/github-webhook-3.png)

Verileri yine alıp Table Services'a attığımız için yukarıdaki gibi full JSON Payload'u görebiliyoruz. 

İtiraf etmek gerekirse **webhooktype**lar zamanla artacak gibi hissediyorum :) Hatta bu konuda ipucu olarak [Github'da yakaladağım fakat daha resmi dokümantasyonda olmayan şeyler](https://github.com/Azure/azure-webjobs-sdk-script/blob/1ab54a94916c8180105af1e43b24a483f070a53f/sample/WebHook-Azure-CSharp/function.json) de var :) Bakalım ilerleyen zamanlarda başka neler göreceğiz :)

Görüşmek üzere.
