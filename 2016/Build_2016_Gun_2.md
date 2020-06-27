---
FallbackID: 3006
Title: "Build 2016 2. Gün"
date: "2016-4-1"
EntryID: Build_2016_Gun_2
IsActive: True
Section: software
MinutesSpent: 32
Tags: Haberler, Windows Azure
---
Build konferansı ikinci günü de geride kaldı. Tahmin ettiğim üzere bugünkü Keynote ağırlıklı olarak Azure üzerineydi ama onun öncesinde beklediğimiz birkaç duyuru geldi :)

### Xamarin
Biliyorsunuz, bir süre önce Microsoft, Xamarin'i satın aldı. Satın alma sonrasında en çok merak edilen konu Xamarin'in fiyatlandırılmasının ne olacağıydı. Çok uzatmadan haberleri paylaşiyim; **[Xamarin artık tamamen ücretsiz](https://blog.xamarin.com/xamarin-for-all/)** ve ücretsiz olan Visual Studio Community Edition ile beraber geliyor. Xamarin tarafında her anlamda yeniliklerin devam edeceği ve hatta hızlanacağı malum. Örneğin Keynote'daki bir demoda iOS Remote Debugging'in doğrudan Windows üzerinden yapılabildiği ve Touch emülasyonunun da olduğu gösterildi. Günün sonunda iOS için uygulamala geliştirirken MacOS ortamında Touch emülasyonu yapamazken Windows ortamında yapabiliyor hale geldik. Haberler bu kadarla da kalmıyor; **Xamarin artık Open Source**! Son yıllarda büyük markaların gidip startupları satın alıp kapattıkları :) veya tamamen marka değişikliğine gittikleri düşünülürse Microsoft'un yaptığı epey radikal bir hareket. Xamarin'i satın aldı, ücretsiz yaptı ve kaynak kodunu da açtı... Vay anasını...

### Azure
Azure tarafında birçok yenilik var. Zamanla bunların detaylarını blogda paylaşmaya çalışacağım. Ana yeniliklerden biri **IoT Hub tarafında Device Management**'ın zenginleşmesi. 

Bir diğer büyük duyuru ise **Azure Funtions** hizmeti. [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) her ne kadar AWS'nin Lambda'sına rakip olarak çıktı diye düşünülse de bence sadece bir zamanlama tesadüfü söz konusu. Microsoft zaten bir süredir Service Fabric ile Microservices tarafına yöneliyordu. Bu arada unutmadan, **Service Fabric** de artık [Preview'dan çıktı ve yayında](https://azure.microsoft.com/en-us/documentation/articles/service-fabric-cluster-creation-for-windows-server/). Azure Functions daha minimal bir Microservices ortamı sunuyor. Ayrıca Azure WebJobs SDK'i de miras aldığı için WebJobs'ın bütün özelliklerine de sahip Azure Functions. Zaman içerisinde WebJobs kalkarsa şaşırmam. Zaten Azure Functions da serverless olarak adlandırılan Execution Time üzerinden fiyatlandırılan bir ortamda, yani Azure Web Apps altyapısında çalışıyor. Azure Functions'ın da Service Fabric'in de Runtime tamamen açık kaynak kodlu. Yani özünde bunları alıp AWS'de de çalıştırabilirsiniz :)

**DocumentDB** tarafında da ilginç bir yenilik var, MongoDB protocol desteği geldi. İtiraf etmek gerekrise işlevsellik açısında iki ürünün arası epey açık ama en azından Node uygulaması geliştirenler için artık Azure'da güzel bir database seçeneği var.

PowerBI Embedded adında yeni bir hizmetin önizlemesi duyuruldu. Bugüne kadar PowerBI ile uğraşmamış olabilirsiniz. Ama bugünden itibaren uygulama içi olarak kullanabileceğiniz bir hizmet olduğu için bence bakmanızda fayda var. 

### Office

Ofis tarafından beni heyecanlandıran tek şey var, o da **Graph API**. Özellikle takvim ve mail verisi üzerinden yapılabilecek o kadar çok şey var ki :) Tüm bunların API'ları yok değildi, ama maalesef çok zayıf ve eksikti. Söylenene göre o eksikler giderilmiş. Açıp bakmak gerek tabi :)

**[Office Plug-In sistemi Mac'e de geldi.](http://dev.office.com/blogs/build2016release)** Zaten HTML+JS ile geliştirildikleri için çok zor olmamıştır diye tahmin ediyorum Mac ortamına taşımak.

İkinci günden notlarıma düşenler bunlar. Yukarıdaki duyurularla ilgili ve genel anlamda Build yorumlarımı merak ediyorsanız her zamanki gibi bir de video çektim :) Aşağıda izleyebilirsiniz. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/gu9uxyXq9IQ" frameborder="0" allowfullscreen></iframe>

Görüşmek üzere.
