---
FallbackID: 3005
Title: Build 2016 1. Gün
PublishDate: 3/31/2016
EntryID: Build_2016_Birinci_Gun
IsActive: True
Section: software
MinutesSpent: 26
Tags: Haberler, Visual Studio 2015
---
Bugün Microsoft'un Build 2016 konferasının ilk günü gerçekleşti. Her zamanki gibi konferansın ilk ve ikinci günlerinde birer Keynote konuşması bulunuyor ve bu konuşmalarda konferansın en büyük duyuruları gerçekleşiyor. Eğer uzun, uzun yazı okumak istemiyorsanız hemen aşağıda ilk günün değerlendirmesini yaptığımız bir videoyu paylaşıyorum :)

<iframe width="560" height="315" src="https://www.youtube.com/embed/w3ftCHBnI1s" frameborder="0" allowfullscreen></iframe>

Şimdi gelelim sırası ile neler oldu, neler bitti... 

Windows Hello'yu bilenleriniz vardır. Windows 10 ile beraber gelen ve yüz tanıma sistemlerini de dahil ederek farklı biometrik authentication yapıları sunan bu mekanizma artık Microsoft'un yeni tarayıcısı Edge ile web sitelerinde de kullanılabilecek. Bunu sağlayan [spesifikasyon Kasım 2015'te W3C'ye gönderilmişti](https://www.w3.org/Submission/2015/02/).

###Windows Anniversary Update

Windows'un bir sonraki güncellemesinin bu yaz çıkacağı duyuruldu. Ücretsiz olarak dağıtılacak bu pakete şimdilik **Anniversary Update** dediler. Anniversary Update ile beraber gelecek dört ana yenilik grubu gözüküyor. İlk olarak **parmak izi ile ilgili gelişmeler** var; login işlemlerinin yanı sıra artık uygulamalar da parmakizi ile authentication yapabilecekler. Bunun ilk örneği yukarıda da bahsettiğimiz gibi Edge oldu. İkinci ana yenilik **Ink konusu** ile ilgili. Özellikle Surface ürün grubu ile beraber kalem kullanımına verilen ağırlığı desteklemek adına yazılım tarafında da ciddi yenilikler var. API anlamında şimdilik çok bir bilgi bulunmasa da demolarda Windows ile beraber gelen harita ve not alma gibi uygulmalarda eskiye kıyasla daha zengin bir Yapay Zeka ve Ink birleşimi görülüyor. Harita üzerine elle yazdığın bir not ile işaretlediğiniz bir noktanın arasındaki farkın ayırt edilerek birinin GPS koordinatına bağlanması diğerinin ise üç boyutlu perspektifi ile dengelenerek gösterilmesi buna bir örnek. Üçüncü konu **Windows üzerinde Bash desteği**! Microsoft ve Canonical işbirliğinde gerçekleştirilen bu iş bir sanallaştırma, container veya emülasyon değil :) Doğrudan syscall tercümesi diye Türkçe'ye çevirmek doğru olur sanırım. Son yenilik ise geçen sene Build 2015'te de bahsedilen ([Project Centennial](https://devpreviewsignup.windows.com/)) klasik **Win32 ve .NET uygulamalarının UWP olarak paketlenebilmesi**. Bu yenilik de Anniversary Update ile beraber gelecek. Eğer şimdid

###Her XBOX artık bir Dev Kit

XBOX için uygulama geliştirmek ciddi dertli bir konuydu. Developer cihazı bulmak inanılmaz zordu. Tüm bunlar değişiyor. En azından, kısmen değişiyor. Artık UWP appleri doğrudan herhangi bir XBOX cihazında çalıştırabileceksiniz. Windows Phone'dan tanıdık bir şekilde cihazı unlock etmek için Windows Store'dan bir uygulama indirmeniz gerekecek. Sonrasında istediğiniz gibi remote debugging vs her şey açık. Ama tek bir sıkıntı var, oyun geliştirip göndermeyi düşünmeyin. Şimdilik oyun geliştirme için submission almıyorlar. Maalesef eskisi gibi sadece sertifikalı iş ortakları oyun geliştirip gönderebilecek. Şu an için açılan kısmı platformun klasik uygulama geliştirme kısmı. Yani eğer XBOX üzerinde çalışacak oyun dışı uygulamalar düşünüyorsanız yolunuz açık.

###Hololens satışta.

Bu haberi daha önce de duyduğunuzu düşünebilirsiniz. Aslında duydunuz. Hololens kısıtlı sayıda ve belirli şartlar aranarak satıştaydı. Artık kısıtlılık ortadan kalktı ve Hololens Developer Kit herkese açık satışta. 

###Cortana ve Bot'lar

Cortana'nın Türkçe desteği olmadığı için şimdilik Cortana gelişmeleri bizi pek heyecanlandırmıyor ama itiraf etmek gerekirse Cortana gün geçtikçe akıllanıyor ve işletim sistemine ve araçlara entegre oluyor. Artık sadece maillere ve takvime hakim bir asistam olmanın ötesinde farklı uygulamalardan da beslenebiliyor. Demolardan birinde not alma uygulamasında aldığınız bir notun içeriğine göre aksyon alabilen bir Cortana gördüm. Efsanevi hareketler bunlar. Tabi tüm bunların arkasında bir de yeni **Bot altyapısı** var. [Facebook M](http://www.theguardian.com/technology/2015/aug/27/facebook-m-virtual-assistant-siri-google-now)'in bir boy büyüğü diyebiliriz. Bu çerevede [Microsoft Bot Framework](https://dev.botframework.com/)'ü de duyurdu. Bot Framework'ün [Skype için ayrı bir SDK](http://www.skype.com/en/developer/)'i de mevcut. Böylece Skype için de Bot yazılabiliyor. 

###Cognitive API Set

Azure tarafında Machine Learning yatırımının bir meyvesi de [Cognitive API](https://www.microsoft.com/cognitive-services) grubu. Eski adı Project Oxford olan API'lar Yüz tanıma, obje tanıma, cinsiyet, yaş, duygu tanıma, sesten konuşmacı ayırt etme gibi eklentilerle artık kullanıma açık. Keynote'da gösterilen örneklerden biriyle oynamak isterseniz adres şöyle; [https://www.captionbot.ai/](https://www.captionbot.ai/)

###Diğerleri

[Visual Studio 2015 Update 2 çıktı!](http://go.microsoft.com/fwlink/?LinkId=691129)  
[Visual Studio 15 Preview çıktı!](https://www.visualstudio.com/downloads/visual-studio-next-downloads-vs) 

İlk günden haberler bu kadar. Haberlerin haricinde kişisel yorumlarımı da merak ediyorsanız :) yukarıdaki videoyu kaçırmayın derim.

Görüşmek üzere.
