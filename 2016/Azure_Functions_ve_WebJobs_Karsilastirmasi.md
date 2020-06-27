---
FallbackID: 3039
Title: "Azure Functions ve WebJobs Karşılaştırması"
date: "2016-12-4"
EntryID: Azure_Functions_ve_WebJobs_Karsilastirmasi
IsActive: True
Section: software
MinutesSpent: 22
Tags: Azure Functions
---
# Azure Functions ve WebJobs Karşılaştırması
Son zamanlarda Azure Functions yazıları yazmaya başlayınca özellikle WebJobs ile arasındaki benzerlikleri dikkat çekmiyor değil. Durum böyle olunca detaylı bir karşılaştırma yapalım istedim.

### Comsumption Plan : App Service Plan

Azure Functions'ın en büyük özelliği **"Serverless"** olması. Bir anlamda Microsoft'un FaaS (Function-As-A-Service) hizmeti olan Azure Functions'ta fiyatlandırma ve kullanım ölçümü GB-s üzerinden yapılıyor. Yani burada saniye başına kullanılan memory ve işlemci'den bahsediyoruz. Maksimum 1.5GB memory'ye kadar yükselebiliyor bir function'ın bellek alanı. WebJobs'a baktığımızda ise ölçeklendirilmesinin tamamen App Service Plan'a dayalı olduğunu görüyoruz. Bu durumda ufak bir WebJob için bile (Hele bir de Continious Run derseniz "Always On" da gerekeceği için Basic Tier şart olacak) bir VM almak zorunda kalabiliyorsunuz. WebJob'ınızı ne kadar çalıştığını vs kimse umursamıyor ve kullansanız da kullanmasanız da VM'in parasını ödemek zorunda kalıyorsunuz. 

Bazılarınız zaten hali hazırda App Service Plan'larımız var diyebilirler. O durumda hem Azure Functions'ı hem de WebJob'larınızı isterseniz klasik App Service Plan'lara da atabilirsiniz. Fakat tabi ki bu durumda Azure Functions'ın Serverless özelliğinden kopmuş oluyorsunuz. 

### HTTP API Sunarken

Webjobs ile HTTP API host etmek ayrı bir dertti. WebJobs kendisi Kudu SCM üzerine kurulu olduğu için HTTP endpoint verebilse de Kudu'nun authentication yapısından geçmek zorunda kalıyorduk. Bu da tabi ki API açmak isteyen bir developer için pek de anlamlı değil. Azure Functions'a baktığımızda ise çok daha geniş authentication seçenekleri görüyoruz. Azure Active Directory, Facebook, Google, Twitter, LiveID vs diyerek liste uzuyor. Ayrıca Azure Functions API Metadata'sını da OpenAPI specificationu ile sunabiliyor. 

### Visual Studio ve Araçlar

Visual Studio tarafında Webjobs biraz daha avantajlı. 2014 yılından beridir ortalıkla olduğu için WebJobs'ın Visual Studio entegrasyonu çok daha iyi. Azure Functions'ın ise Visual Studio araçları çıkalı daha bir hafta olmadı ve şu an için Preview'da. Fakat, Azure Portal'ına giderseniz tam tersi bir durum göreceksiniz. WebJobs için bir kod yazma ortamı yokken Azure Functions için full bir kod yazma ortamı söz konusu. Rahatlıkla Azure Portal'ına gidip bir function'ı sıfırdan yazıp, çalıştırabilir ve hatta debug bile edebilirsiniz. 

### Geri kalanlar

Bunların dışında her iki platform arasında bir fark yok. Trigger'lar aynı, binding özellikleri aynı. Birinin diğerinden üstün bir özelliği en azından ben bu yazıyı yazarken yok. 

Sorularınız olursa aşağıda yorum olarak alabilirim ;) 

Görüşmek üzere.

*Bu yazi http://daron.yondem.com adresinde, 2016-12-4 tarihinde yayinlanmistir.*
