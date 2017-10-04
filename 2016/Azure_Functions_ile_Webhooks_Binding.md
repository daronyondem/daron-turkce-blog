---
FallbackID: 3044
Title: Azure Functions ile Webhooks Binding
PublishDate: 9/12/2016
EntryID: Azure_Functions_ile_Webhooks_Binding
IsActive: True
Section: software
MinutesSpent: 170
Tags: Azure Functions
---
WebHooks bildiğiniz üzere çoğu üçüncü parti servisin entegrasyonu için kullanılıyor. Azure Functions özellikle Consumption Plan'da dışarıdan gelen WebHooks'ları beklemek ve gerektiğinde tepki verebilmek adına süper uygun bir araç. O nedenle şöyle ufak bir WebHooks implementasyon örneği yapalım istedim. Basit bir şekilde Github'dan gelen eventleri alıp Table Services'a atacağız :)

### Github Webhooks ve Azure Functions

Webhooks konusunda en hızlı aklıma gelen yer Github oldu :) [Github'ın Webhooks dokümantasyonuna buradan](https://developer.github.com/webhooks/) göz atabilirsiniz. Biz örneğimizde [**PullRequestEvent**](https://developer.github.com/v3/activity/events/types/#pullrequestevent)'i kullanacağız. Böylece bir PR(Pull Request)'ın "assigned", "unassigned", "labeled", "unlabeled", "opened", "edited", "closed", veya "reopened" durumlarından haberdar olabileceğiz. Bu durumların hepsini bir Table'a kaydedeceğiz. [**TableBinding**](http://daron.yondem.com/software/post/Azure_Functions_ve_Table_Binding_Kullanimi) konusuna daha önce bakmıştık. "Amacın nedir?" derseniz :) bir anlamda githubdaki PR eventlerinin bir logunu tutmuş olacağız. Örneğin, toplandığımız veriden bir PR'ın bize assign edildikten ne kadar süre sonra kapatıldığı konusunda bir istatistik çıkarmak mümkün :) Maksat fantazi ve biraz da örnek olsun :)

### Adım 1 : Bindingler hazırlanır

İlk olarak bindinglerimizi hazırlayarak başlayalım. InputBinding olarak bir [HttpTrigger](http://daron.yondem.com/software/post/Azure_Functions_ile_ilk_Serverless_Maceramiz) kullanacağız. Normalden farklı olarak burada **methods** arrayini kullanarak bu API'a sadece **POST** ile ulaşılmasına izin vereceğiz. Zaten tüm WebHook'lar da bu şekilde çalışır ve Github'ınki de tabi ki böyle çalışıyor.

**function.json**
```javascript
{
  "bindings": [
    {
      "name": "req",
      "type": "httpTrigger",
      "direction": "in",
      "authLevel": "function",
      "methods": [ "POST" ]
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

HTTP Method ayarının dışında **authLevel**'a da dikkat. Onu da **function** level yaparak kullanacağımız erişim anahtarının bu function'a özel olmasını sağlayacağız. Genel olarak baktığınızda HttpTrigger'ımız bu kadar. İçeriye **req** parametresi ile alıp geri kalanları function'ın içinde halledeceğiz.

Gelelim outputbinding'e. Daha öncede söylediğim gibi biz Table Services kullanacağız. Bunun için ben Azure Functions ile beraber gelen storage hesabını kullanacağım. Her zamanki gibi **connection** bilgisini **appsettings.json**'a atmayı unutmayın. Bizim örneğimizde **table** adı olarak da **Cikanlar** adını kullanacağız. Zaten farkına vardıysanız işin bu tarafını [Table Binding makalesinden](http://daron.yondem.com/software/post/Azure_Functions_ve_Table_Binding_Kullanimi) çaldım :)

### Adım 2 : Esas kod yazılır.

**[run.csx]**
```CS
 #r "Newtonsoft.json"
using Newtonsoft.Json;

using System.Net;
using System.Threading.Tasks;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<GithubKaydi> cikanNesneler, TraceWriter log)
{
   string jsonContent = await req.Content.ReadAsStringAsync();
   dynamic data = JsonConvert.DeserializeObject(jsonContent);

   GithubKaydi cikanLog = new GithubKaydi();
   cikanLog.PartitionKey = data.action;
   cikanLog.RowKey = System.Guid.NewGuid().ToString();
   cikanLog.JSONPayload = data.ToString();
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

Yukarıdan aşağıya göz atacak olursak, ilk olarak tabi ki Newtonsoft'un JSON kütüphanesini import ediyorum. Bunu aslında **project.json** içerisinde de nuget paketi ile de yapabilirsiniz, fakat itiraf etmek gerekirse bende bu sefer ısrarla nuget restore'u çalıştırmadı Azure Functions :) Aşağıdaki gibi dev console'da elle giriştim, yine yediremedim. 

![Portal'daki Dev Console'daki çırpınışlar](http://blob.daron.yondem.com/assets/3044/webhook-3.png)

**[project.json]**
```javascript
{
  "frameworks": {
    "net46":{
      "dependencies": {
        "Newtonsoft.Json": "9.0.1"
      }
    }
  }
}
```

Ama siz garantiye almak için yukarıdaki şekilde **project.json**'ı da editlerseniz iyi olur.

```CS
string jsonContent = await req.Content.ReadAsStringAsync();
dynamic data = JsonConvert.DeserializeObject(jsonContent);
```

Bizim en üstteki kodu parça parça inceleyecek olursak, ilk başta requesti alıp doğrudan bir JSON olarak deserialize edip dynamic bir objeye attığımı görebilirsiniz.

```CS
GithubKaydi cikanLog = new GithubKaydi();
cikanLog.PartitionKey = data.action;
cikanLog.RowKey = System.Guid.NewGuid().ToString();
cikanLog.JSONPayload = data.ToString();
cikanNesneler.Add(cikanLog);
```

Sonrasında aslında artık yukarıdaki gibi Github'dan gelen data ile uğraşıyoruz. Table Services'a atarken **ParitionKey**'e Github'dan gelen aksyonu ve **RowKey** olarak da random bir GUID verdim.

```CS
return req.CreateResponse(HttpStatusCode.OK, new
{
    body = $"From GitHub :{data.assignee.id}"
});
```

En sonda verdiğimiz bu response'un Github için hiçbir değeri yok. Yani HTTP 200 tabi ki önemli :) bahsettiğim body kısmıydı.

### Adım 3 : Github'da WebHook tanımlanır.

Github arayüzüne gidip istediğiniz repo'nun **Settings** kısmına geçerseniz **WebHooks** ayarlarını bulabilirsiniz. Buradan yeni bir webhook eklememiz gerekiyor.

![github'ta yeni webhook tanımlarken](http://blob.daron.yondem.com/assets/3044/webhook-1.png)

Function App ile beraber gelen default access key'i kullanırsanız sondaki "==" kısımları canınızı sıkabilir. Github aldığı değeri URL encode ediyor :) O nedenle o "=="ler %3D'lere dönüşüyor. O nedenle benim tavsiyem Azure Functions portaline gidip özel key tanımlamanız. 

![Kendi Function Access Key'lerinizi portalde ekleyebilirsiniz.](http://blob.daron.yondem.com/assets/3044/webhook-4.png)

Portalde keyinizi tanımladıktan sonra bunu her zamanki gibi URL'e **code** parametresi ile ekleyip son URL'i github'a verebilirsiniz.

![Github'taki WebHook eventlerinin listesi.](http://blob.daron.yondem.com/assets/3044/webhook-2.png)

Biz sadece Pull Request'leri ile ilgili eventleri dinleyeceğimiz için webhook yaratırken de sadece bunu seçmenizde fayda var.

Github'daki **Secret** kısmını merak edenler varsa, o kısımda verdiğiniz key ile payload HMAC hexdigest ile hashlenir. İsterseniz tabi ki bunu da Azure Function içerisinde validate edebilirsiniz fakat ben yazıyı daha uzatmamak için orayı atlıyorum. Siz isterseniz signature'a **X-Hub-Signature** header'ından ulaşabilirsiniz. 

### Sonuç

![Github eventleri Table Services'da loglandı](http://blob.daron.yondem.com/assets/3044/webhook-5.png)

Sonuç olarak githubdaki eventler WebHook üzerinden bize geliyor ve biz de Table Services'a atıyoruz. Bundan sonrası artık size kalmış :) 
