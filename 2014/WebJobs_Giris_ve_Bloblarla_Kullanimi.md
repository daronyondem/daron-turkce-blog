---
FallbackID: 2904
Title: "WebJobs Giriş ve Bloblarla Kullanımı"
date: "2014-4-21"
EntryID: WebJobs_Giris_ve_Bloblarla_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
# WebJobs Giriş ve Bloblarla Kullanımı
Azure tarafında uzun yıllardır en sıkıntılı konulardan biri
ScheduledService'ler. Aslında sıkıntı da zaten bu gibi zamanlanmış
servislerin oluşturulması için tabiri caiz ise adam gibi bir altyapının
olmaması. Tabi ki isterseniz bir VM alıp "Windows Scheduler"
kullanabilirsiniz veya Cloud Service'inize bir worker ekleyip işi
çözebilirsiniz ama bu çözümlerden biri PAAS çözümü değilken diğeri ise
basit bir Scheduler için çok maliyetli. Bu yazıda bahsedeceğimiz
WebJobsSDK bu sorunu çözmeyi amaçlarken kendisi de Preview'da olan
WebJobs konsepti ile Azure Web Sites üzerinden sunuluyor. Şu an için
Preview olmasından dolayı çok eleştirel yaklaşmayacağım fakat WebJobs'ı
nasıl kullanırıza gelmeden önce bilmeniz gereken birkaç şey var. İlk
olarak bu servisin Azure Web Sites altında gelmesi manidar. WebJobs şu
anda Cloud Service'daki ölçeklenebilirlik ihtiyaçlarınızla paralel
yükleri kaldırabilecek nitelikte değil. Azure Web Site deploymentınızın
boyutu bugün neyse WebJobs'da aynı kaynaklarda çalışıyor ve kaynakları
paylaşıyor. Yani ayrıca scale etme vs şansınız yok. Cloud Service'ler
için şu anda daha low level bir implementasyon sunan Azure Scheduler'ı
tavsiye edebilirim. Zaten her iki servisin adındaki farklılık da çok
anlamlı. Biri Scheduler biri Job :) Yani sonuç itibari ile Job'ları da
schedule edebiliyoruz ama WebJobs çok daha yüksek seviyeli, Azure Web
Sites'a uygun bir altyapı sağlayarak çok daha kolay kullanımlı bir ortam
sağlıyor. Konsept üzerinden konuşmayı bu noktada bırakıp gelin Webjobs
SDK ile neler yapabiliyoruz görelim.

### WebJobsSDK

WebJobs üzerinden bir çok senaryo ilerletmek mümkün. Ben .NET tarafına
odaklanacağım ama Bash, PHP, Node, Python veya basit BAT dosyları ile de
Job yazabilirsiniz. .NET tarafında yazdığımız Job'ı bir "Console
Application" olarak tasarlayacağız ve sağladığı kolaylıklardan da
faydalanmak için WebJobsSDK'i referans olarak projemize ekleyeceğiz.
Yeni bir konsol uygulaması yarattıken sonra SDK'in Preview Nuget
paketlerini indirmek için Nuget Package Manager Console'da aşağıdaki
komutları çalıştırabilirsiniz.

Install-Package Microsoft.WindowsAzure.Jobs -Pre   
Install-Package Microsoft.WindowsAzure.Jobs.Host -Pre

Bu komutları çalıştırdığında projenize dört tane referans eklenecek.
AzureConfiguration, StorageClient, Jobs ve JobsHost adındaki bu
referansların ikisi doğrudan JobsSDK ile alakalı iken diğer ikisi ise
JosbSDK'in doğrudan Azure'daki Storage Servislerini kullanmak zorunda
olmasından kaynaklanıyor. Yanında bir de JSON.NET gelecektir. Onun da
ileriki makalelerde JobsSDK'in Storage'lardaki Queue'lar ile olan
ilişkisine bakarken hep beraber göreceğiz :)

### Blob üzerinden "Trigger" ve "Output"

Ortamımız hazır olduğuna göre artık kod yazmaya başlayabiliriz.
Yapacağımız uygulamanın iki bölümü olacak. WebJobsSDK'i kullanarak
harici bir Storage Account içerisindeki bir [Blob
Container](http://daron.yondem.com/tr/search/blob)'ın içine dosya
konduğu anda kendi tanımlayacağımız bir işlem yapmak istediğimizi
varsayalım. Örneğin ben özel bir container'a bir text dosyası konduğunda
içindeki metni küçük harflere çevirerek başka bir containera yeni bir
text dosyası olarak kopyalamak istiyorum. Bunun tamamen otomatik olarak
WebJobs tarafından sürekli yeni bloblar için yapılmasını istiyoruz. Tabi
böyle saçma bir örnek vermemin nedeni örneği basit tutabilmek ama siz
daha karmaşıklarını hayal edebilirsiniz. Örneğin bir container'a konan
resimleri resize etmek güzel bir senaryo olabilir.

**[C\#]**

```cs
class Program
{
    static void Main(string[] args)
    {
        JobHost host = new JobHost();
        host.RunAndBlock();
    }
    public static void LowerCase(
        [BlobInput(@"gelenblobcontainer/{name}")] Stream gelenStream,
        [BlobOutput(@"gidenblobcontainer/{name}")] Stream gidenStream)
    {
        string tumMetin = "";
        using (StreamReader st = new StreamReader(gelenStream))
        {
            tumMetin = st.ReadToEnd();
        }
        using (StreamWriter stw = new StreamWriter(gidenStream))
        {
            stw.Write(tumMetin.ToLower());
        }
    }
}
```

Yukarıdaki kafa karıştırabilecek bir çok şey var. O nedenle gelin adım
adım ilerleyelim. Konsol uygulaması ilk çalıştığında **JobHost** adında
bir nesne yaratıp **RunAndBlock** ile Host'u çalıştırıyoruz. Bu noktada
WebJobs'a bizim konsol uygulaması ile tüm jobların çalışması gerektiği
mesajını vermiş olduk. Sonrasında hemen altta ise **LowerCase** diye bir
metod var. Bu metodun parametrelerinde bir anlamda "Model Binding"
mevcut. **BlobInput** ve **BlobOutput** için verdiğiniz değerler
doğrudan container adı üzerinden giden ve takip etmek istediğiniz
Blobların adresini tanımlayan path değerleri. {name} keyword'ü blobun
kendi adını temsil ediyor. Böylece benim storage account'um içerisindeki
containerlardan "**gelenblobcontainer**" adındaki container içindeki
bloblar takip edilecek ve bu blobların içeriği doğrudan **Stream**
olarak **gelenStream'e** atanacak. Aynı işlem **OutputBlob** ile de
Storage Account'a geri blob atmak için kullanılacak. OutputBlob için ben
farklı bir container kullandım. Blob ismi olarak ilk gelen InputBlob'un
ismini atadım. Bu noktadan sonra **gidenStream'e** her ne yazarsam
yaziyim **OutputBlob'a** verdiğim path çerçevesinde Storage Account'ta
bir blob'a yazılacak. Geri bize geri kalan da gelen Stream'i okuyup
istediğimiz değişiklikleri yapıp OutputStream'e son hali yollamak.

Gördüğünüz üzere WebJobs SDK süper bir implementasyona sahip. Neredeyse
tün Blob kullanımına dair karışıklıkları çözüp atıyor. Peki hangi
StorageAccount'u kullanacağını nasıl biliyor derseniz işte onu da tabi
ki Web.Config'den alacak. Bunun için Azure Web Sites'ın yönetim paneline
gidip iki farklı Connection String tanımlamamız gerek.

![Webjobs'a özel iki Connection
String.](media/WebJobs_Giris_ve_Bloblarla_Kullanimi/webjobs_1.png)

Yukarıdaki ekran görüntüsüne de görebileceğiniz üzere Azure Web
Site'ımızın Connection String'lerine iki adet yeni item ekliyoruz.
Bunlardan "AzureJobsData" doğrudan bizim kullanacağımız verilerin
bulunduğu Storage Account'un Connection Stringi. Örneğimizdeki
"gelenblobcontainer" bu Storage Account'un içerisinde olacak. Diğer
Connection String ise AzureJobsRuntime'ın kullanacağı ve kendi loglarını
tutacağı yer. Her iki connection string de aynı Storage Account'u
hedefleyebilir. O konuda bir sıkıntı olmayacaktır. Runtime Logging için
WebJobsSDK iki adet ek container yaratacak. Bunlar
"azure-jobs-invoke-log" ve "azure-jobs-event-queue" şeklinde. Umuyorum
ki sizin aynı isimde containerlarınız yoktur :) Bu containerların içinde
sistem kendi loglarını tutuyor.

![WebJobs'ın loglarından bir
örnek.](media/WebJobs_Giris_ve_Bloblarla_Kullanimi/webjobs_3.png)
*WebJobs'ın loglarından bir örnek.*

Tabi bu logları tek tek text dosyalarını açarak incelememize gerek yok.
Bunun için Azure Web Sites altında bir
[Extension](http://daron.yondem.com/tr/post/Azure_Web_Sites_Kudu_ve_Custom_Site_Extensions)
olarak çalışan özel bir Dashboard var. Dashboard'a ulaşmak için
<https://SITENIZINADI.scm.azurewebsites.net/azurejobs/> adresine
gitmeniz gerekiyor. Deployment Credential'larınızı kullanarak buraya
giriş yaptığınız anda inanılmaz güzel detayları görebilmeye
başlayacaksınız.

![WebJobs
Dashboard'u.](media/WebJobs_Giris_ve_Bloblarla_Kullanimi/webjobs_4.png)
*WebJobs Dashboard'u.*

Bu Dashboard içerisinde sadece WebJobs Host'unuzu yaşam döngüsünü değil
tek tek yapılan işlerin detaylarını bile görebilirsiniz. Özellikle
birden çok Job'ınız olduğunu düşünürsek buradaki loglar debugging için
de süper bir değere sahip.

![Dashboard'un detaylarında neler
saklı...](media/WebJobs_Giris_ve_Bloblarla_Kullanimi/webjobs_5.png)
*Dashboard'un detaylarında neler saklı...*

Blobların aynı sıra WebJobs Azure Storage'daki Queue ve Table servisleri
ile de çalışabiliyor. Bunların detaylarına ileriki yazılarda göz
atacağız. Şimdilik isterseniz bir de gelin yukarıdaki tüm hikayesine göz
attığımız örnek WebJob projemizi Azure'a nasıl deploy edeceğimize
bakalım. :) O konuyu atladık.

### Deployment

Elinizdeki Konsol uygulamasını deploy etmek için her şeyi alıp bir ZIP
haline getirmeniz lazım. Bu ZIP'i doğrudan Azure Management portalından
upload edeceğiz. Management Portal içerisinde kullanacağınız Web Site'ın
detaylarına girdiğiniz en üst kısımda WebJobs tabını göreceksiniz. Oraya
girip yenib ir Job yaratmak istediğinizde sizden Job için bir isim,
çalışma şekli ve ZIP dosyası istenecek.

![Farklı WebJob
seçenekleri.](media/WebJobs_Giris_ve_Bloblarla_Kullanimi/webjobs_6.png)
*Farklı WebJob seçenekleri.*

Biz örneğimizde "Continious" seçeneği kullanmalıyız ki sürekli olarak
yeni bir Blob geldiğinde Job'ımız çalışsın. Bu arada Blob'lardaki
değişiklikler ortalama 10 dakikada bir kontrol ediliyor. Malum ne kadar
sürekli takip et desek de Storage servislerine bir REST call gitmesi
lazım. WebJobs için diğer seçeneklerden biri "On Demand". Bu durumda
gelip portaldan Job'ın çalışmasını tetikleyebilirsiniz veya **JobHost**
nesnesine erişimi olan herhangi bir yerden JobHost'un **Call** metodunu
da çağırabilirsiniz.

Olayın biraz daha derinlerine inersek aslında Upload ettiğiniz ZIP
dosyası doğrudan sitenizde "**site\\wwwroot\\App\_Data\\jobs\\{job
tipi}\\{job adı}**" şeklinde bir pathe extract edilecektir. Job Tipi
"**Continuous**" veya "**triggered**" olabilir. Hem scheduled hem de On
Deman joblar "Triggered" olarak geçiyor. Dosyalarda herhangi bir
değişiklik olduğunda sistem ilk olarak "run" adına sahip ve WebJobs
tarafından desteklenen uzantılarda bir dosya arayacak. Eğer WebJobs bu
gibi bir dosya bulabilirse çalıştıracak aksi halde desteklenen
uzantılardaki tüm dosyalara bakacak.

Böylece WebJobs'ın sadece genel kullanımına değil Blob'larla nasıl
kullanılabileceğine de göz atmış olduk. İleriki bir yazıda Queue ve
Table servisleri ile WebJobs kullanımını da inceleyeceğiz.

Makaledeki örneği
[Github](https://github.com/daronyondem/AzureOrnekler/tree/master/WebJobsSDK_Preview/WebJobsTestApp)
üzerinden indirebilirsiniz.



*Bu yazi http://daron.yondem.com adresinde, 2014-4-21 tarihinde yayinlanmistir.*
