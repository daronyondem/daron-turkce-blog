---
FallbackID: 2923
Title: "Azure SDK 2.5 ile WebJobs Yenilikleri"
date: "2014-11-18"
EntryID: Azure_SDK_2_5_ile_WebJobs_Yenilikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
# Azure SDK 2.5 ile WebJobs Yenilikleri
Webjobs konusunda daha önce sizlerle [birkaç
makale](http://daron.yondem.com/software/search/webjobs) paylaşmıştım.
Tam yeni bir makale ile konuya devam edelim diyecektim ki [Azure SDK
2.5](http://azure.microsoft.com/en-us/downloads/archive-net-downloads/)
çıktı :) Yeni sürüm ile beraber WebJobs tarafında da süper yenilikler
geldi. Yeniliklerin çoğu doğrudan Visual Studio içerisindeki WebJobs
geliştirme deneyimine dair yeni araçlardan oluşuyor. Gelin bu yazıda
Azure SDK 2.5'te WebJobs ile ilgili ne yenilikler varmış bir göz atalım.

![Publish as Azure
WebJobs](media/Azure_SDK_2_5_ile_WebJobs_Yenilikleri/webjobs_sdk25.png)
*Publish as Azure WebJobs*

İlk göreceğiniz yenilik "Solution Explorer" içerisinde herhangi bir
WebJobs projesine sağ tıklayınca karşınıza gelecek. Artık WebJobs
Publish etmek için bir Wizard / Sihirbaz var :) Aşağıda ekran
görüntüsünü görebileceğiniz sihirbaz farklı Job tipleri arasındaki
geçişleri ve ayarları kolaylaştırıyor.

![WebJobs Publishing
Wizard](media/Azure_SDK_2_5_ile_WebJobs_Yenilikleri/webjobs_sdk25_2.png)
*WebJobs Publishing Wizard*

Sihirbaz içerisinde yapılan tüm ayarlar webjob-publish-settings.json
dosyasında proje içerisinde saklanıyor. İsterseniz sonradan elle
değiştirme şansınız da var.

**[webjob-publish-settings.json ]**

```Javascript
{
  "$schema": "http://schemastore.org/schemas/json/webjob-publish-settings.json",
  "webJobName": "WebJobsTestApp",
  "startTime": null,
  "endTime": null,
  "jobRecurrenceFrequency": null,
  "interval": null,
  "runMode": "OnDemand"
}
```

Bir diğer yenilik de artık WebJobs'ların "Server Explorer"da kendini
göstermiş olması. Buradan rahatlıkla WebJobs'ları listeleyerek OnDemand
Job'ları da Visual Studio içerisinden çalıştırabiliyorsunuz.

![Server Explorer'da
WebJobs](media/Azure_SDK_2_5_ile_WebJobs_Yenilikleri/webjobs_sdk25_3.png)
*Server Explorer'da WebJobs*

Son güzellik ise artık WebJobs'ları doğrudan Visual Studio içerisinden
Debug edebilmek. Bunun için WebJobs çalışırken Server Explorer'da söz
konusu Job'a sağ tıklayıp "Attach Debugger" demeniz yeterli olacak.
Böylece WebJobs için de Remote Debugging yapabileceksiniz.

![WebJobs
Debugging](media/Azure_SDK_2_5_ile_WebJobs_Yenilikleri/webjobs_sdk25_4.png)
*WebJobs Debugging*

SDK 2.5 içerisinde Webjobs yenilikleri bunlar. Webjobs da kendi içinde
olgun bir ürün/servis olmaya doğru ilerliyor. Özellikle şu son gelen
yeniliklerle WebJobs SDK'de GA olduğuna göre ürünün ilk sürümü her şeyi
ile ortada demektir.

Görüşmek üzere!



*Bu yazi http://daron.yondem.com adresinde, 2014-11-18 tarihinde yayinlanmistir.*
