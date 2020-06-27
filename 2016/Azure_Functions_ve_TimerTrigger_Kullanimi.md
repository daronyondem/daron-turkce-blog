# Azure Functions ve TimerTrigger Kullanımı
Belirli zamanlarda veya aralıkla iş yapmak hep problem olmuştur :) Hem istediğim zamanda ve aralıkta çalışmasından emin olmak isteriz hem de altyapıyı ölçeklendirdiğimizde söz konusu işin yine bir defa çalışmış olmasını isteriz :) Hayat zor :) Şaka bir yana, tüm bunlar için Azure Functions içerisinde kullanımı süper basit bir yapı var, adı da **timerTrigger**. Gelin hızlıca detaylarına göz atalım.

**[function.js]**
```javascript
{
  "bindings": [
    {
      "schedule": "0 */2 * * * *",
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in"
    }
  ],
  "disabled": false
}
```

İlk olarak yukarıdaki gibi Azure Functions bindingimizi ayarlıyoruz. **schedule** kısmında bir [CRON Expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) kullanıyoruz. Basit bir şekilde {saniye} {dakika} {saat} {gün} {ay} {haftanın günü}
formatında bir tanımdan bahsediyoruz. Bizim yukarıdaki örneğimizde timer beş saniyede bir çalışacak. **name** parametresinde verdiğimiz değer birazdan yazacağımız Azure Functions'a geçecek olan parametrenin de adı olacak. Timer'ımıza function içerisinden de ulaşabileceğiz. **type** parametresi bindingin tipini belirliyor malum :) **timerTrigger** kullanarak geçiyoruz. Son olarak **direction** için de tabi ki **in** kullanmamız gerek, zaten farklı bir seçenek pek de olası değil.

**[run.csx]**
```CS 
public static void Run(TimerInfo myTimer, TraceWriter log)
{
    if (myTimer.IsPastDue)
    {
        log.Info("Geç kalmışız!");
    }
    log.Info($"Timer {DateTime.Now} zamanında çalıştı.");
    log.Info($"5 dakika sonra çalışma zamanı {myTimer.Schedule.GetNextOccurrence(System.DateTime.Now.AddMinutes(5)).ToString()}");
    log.Info($"Son çalışan zaman {myTimer.ScheduleStatus.Last.ToString()}");
}
```

Yukarıda da Function kodumuzun kendisini görebilirsiniz. **myTimer** olarak gelen parametre Timer'ın kendisi. **IsPastDue** daha önce kaçırılmış bir zamanlamanın çalıştırılıp çalıştırılmadığı dönüyor. Eğer fonksyon çalışma gerektiği zamanda çalıştırılmadı ve sonradan çalıştırılıyorsa burada "True" dönecektir. Tabi buradan çalıştırma isteklerinin kuyruklandığı fikrine falan kapılmayın :) Buradaki durum daha fazla Azure Function'ın çalışması için gerekli ortamın karşılaşabileceği sıkıntılarla alakalı. Örneğin birazdan bahsedeceğimiz blob lease için Storage Account'a ulaşılamamış olabilir. Bu gibi durumlarda Function Timeout'a uğramadan önce gecikirse **IsPastDue** true gelecektir. 

Daha sonraki adımlarda **TimerInfo** üzerinden alabileceğimiz bazı ek bilgileri de göstermek istedim. Örneğin **GetNextOccurrence** ile bir zaman verip o zamandan sonra ne zaman Timer'ın çalışacağını alabiliyorsunuz. Bizim timer iki dakikada bir çalışacak ve ben beş dakika sonra hangi zamanda tekrar çalışacağını soruyorum TimerInfo'ya. Son satırda da **ScheduleStatus.Last** diyerek en son çalıştığı zamanı alıyorum. Eğer bir dakikadan kısa süreli timerlar kullanıyorsanız **ScheduleStatus** null gelecektir. Bu da [hardcoded bir kural](https://github.com/Azure/azure-webjobs-sdk-extensions/blob/97413de6b312b4d529b42206123853a8fca07918/src/WebJobs.Extensions/Extensions/Timers/Scheduling/TimerSchedule.cs).

![iki dakikada bir Timer çalışıyor.](media/Azure_Functions_ve_TimerTrigger_Kullanimi/timerTrigger-1.png)

Yukarıda da gördüğünüz gibi Timer ile ilgili bir sıkıntımız yok. Normal şartlarda Azure Functions'da Consumption Plan'daysanız birazdan soracağım soruyu sormanız anlamlı olmaz fakat özellikle App Service Plan'daysanız App Service Plan'ı scale ettiğinizde Timer'larınızın her sunucuda çalışıp çalışmayacağından, yani daha basit bir tabirle tek instance olup olmadıklarından emin olamayabilirsiniz. Cevabı; hiç fark etmez. **timerTrigger**'lar her zaman Singleton ;) Bunu başarabilmek için de **host.json**'daki storage account ayarlarından gidip bir blob lease alıyor runtime. Eğer function çalıştığında lease alamazsa zaten çalıştığını varsayacak. Eğer bir hata nedeniyle lease bırakılmamışsa bu sefer de tabi ki timeoutu beklemeniz gerekecek.

**[host.json]**
```javascript
{
  "singleton": {
    "listenerLockPeriod": "00:01:00"
  }
}
```

Varsayılan ayarlarda blob lease'ler bir dakikalığına alınır. Fakat isterseniz bunu **host.json** içerisinde **listenerLockPeriod** değeri vererek değiştirebilirsiniz. Lock'ı kısaltmak hata durumlarında toparlama hızını da arttıracaktır çünkü sonuç itibari ile timeout beklemek zorunda kalacak bir sonraki instance ama tabi bir de lease yenileme maliyeti var. Eğer Azure Function'ınız 60 saniyeden uzunsa lease'in yenilenmesi gerekir, yoksa iki instance sahibi olabilirsiniz. Bunun için varsayılan ayar da **listenerLockPeriod** süresinin yarısında lease'in yenilenmesi şeklinde. Özetle, 30 saniyelin bir lock 15 saniyede bir lease yenileme anlamına gelir ki bu da toplam Storage Account transaction sayınızı ikiye katlar. Söylemedi demeyin :)

Bundan sonraki artık size kalmış. İsterseniz **timerTrigger** ile beraber [Queue Binding](http://daron.yondem.com/software/post/Azure_Functions_ile_QueueTrigger_Kullanmak) kullanarak belirli sürelerde kuyruğa iş atarsanız, isterseniz [Blob Binding](http://daron.yondem.com/software/post/Azure_Functions_ile_BlobTrigger_Kullanmak) maceralara atılırsınız :) tercih size kalmış. Tabi bunların hiçbirini kullanmayıp istediğiniz kodu da Azure Functions'da çalıştırabilirsin. 

Görüşmek üzere.

*Bu yazi http://daron.yondem.com adresinde, 2016-12-6 tarihinde yayinlanmistir.*
