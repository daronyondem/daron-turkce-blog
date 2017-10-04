---
FallbackID: 2850
Title: Build 2013 Gün 2 Özeti
PublishDate: 28/6/2013
EntryID: Build_2013_Gun_2_Ozeti
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Mobile Services, Windows Azure
---
Dünkü [Build 2013 Birinci Gün
özeti](http://daron.yondem.com/tr/post/Build_2013_Gun_1_Ozeti)nden sonra
sıra geldi ikinc güne. Bugün konferansın ikinci ve son Keynote'u da
yapıldı. Böylece duyurulacak herşey bir anlamda bitmiş ve duyurulmuş
oldu. Peki neler oldu? Beklendiği üzere ikinci gün tam bir Azure şenliği
gerçekleşti ve şenlik ilk başta Azure Web Sites'ın release olması ile
başladı.

![Azure Web Sites Release
oldu!](http://cdn.daron.yondem.com/assets/2850/azure_web.jpg)\
*Azure Web Sites Release oldu!*

Uzun süredir beklediğimiz bir haberdi bu ve sonunda Azure'un PAAS
üstünde biraz daha high level bir web sitesi host alanı da var
diyebiliriz. Release ile beraber klasik %99.95 SLA Web Sites hizmeti
için de geçerli. Web Sites duyurusunun heyecanı tam yatışırken bir domba
duyuru daha geldi. Azure Mobile Services da release oldu!

![Azure Mobile Services Release
oldu!](http://cdn.daron.yondem.com/assets/2850/azure_mobile.jpg)\
*Azure Mobile Services Release oldu!*

Mobile Services'ın da Release olması en az Web Sites kadar önemli. Son
dönemde her iki hizmet de Azure hizmetleri arasında en popüler olan
hizmetler. Bu hizmetlerin release olmasını bekleyen çok kişi olduğunu
biliyorum o nedenle her iki haberin üst üste gelmesi efsanevi bir
hareket oldu. Unutmadan, ufak bir detayı atlamamam gerek Mobile
Services'daki Scheduler hala Preview. O da yakında release olacaktır.

### AutoScaling

İşte bunun için ayrı başlık atılır :) AutoScaling Azure'da başından
beridir en büyük problemlerden biriydi. AutoScale olmadan Cloud'un bir
anlamı kalmıyor bence. Diğer yandan AutoScale yapmak istediğiniz Azure
gerekli tüm araçları sağlasa da hala esas scaler eksikti ve ya WASABI
gibi araçları kullanmak zorunda kalıyordur ya da kendimiz yazıyorduk.
Her iki senaryo da maalesef hayata geçirilmesi ciddi maliyetli
senaryolardı. İşte artık Azure tarafında da bir AutoScaler var! Şu an
için Preview olarak duyurulan Azure Scaling CPU ve Storage Queue Item
sayılarına göre max-min limitler de alarak scaling yapabiliyor.

![Azure Scale Preview
yayında.](http://cdn.daron.yondem.com/assets/2850/azure_scale.jpg)\
*Azure Scale Preview yayında.*

Scaler'ın Preview olması şu an için çok kritik değil çünkü önemli olan
şu anda Microsoft'un müşterilerini, bizleri dinleyip bu işi yapmaya baş
koymuş olması. Şu noktadan sonra gönlümüz rahat bir şekilde AutoScaling
ihtiyaçlarımızın da Microsoft tarafından dinlendiğini ve karşılanacağını
biliyoruz. Bu çok güzel bir haber!

### One ASP.NET

İtiraf ediyorum Keynote'un geri kalanı yalandır benim için :D Şaka bir
yana yukarıdaki heyecan verici haberlerin yanında Keynote'un geri kalanı
benim için süper sönüktü. Yine de ilginç noktalardan biri "One ASP.NET"
konseptiydi. ASP.NET tarafında biliyorsunuz seksen tane dallanma oldu,
WebForms, MVC, Web API vs... derken seksen çeşit ASP.NET'imiz oldu.
Microsoft bunların hepsini bir proje yani bir ASP.NET haline geri
döndürmeye karar vermiş. Kesinlikle çok doğru ve şık bir hareket olmakla
beraber şimdilik bunu sadece proje şablonu olarak tasarlamışlar :)
Visual Studio içerisinde bir UI değişikliğinden öteye pek de geçmiyor.
Umarım bu konsepti sürekli akıllarında tutup olayı birkaç adım daha
ileriye taşırlar. Nitekim yapacağınız işe veya kullanacağınız tekniğe
göre farklı ASP.NET'ler kullanıyormuş gibi olmanız pek de anlamlı değil.
Sonuçta hepsi zaten aynı ASP.NET.

### Geri kalanlar....

Keynote boyunca başka şeyler de gösterildi. Bazıları gereksiz bazıları
önemsiz ama birkaç tane daha hızlıca bahsedilebilecek nokta var.
Bunlardan ilki Visual Studio'da ASP.NET'te debug modda SignalR
kullanarak IDE'deki değişiklikleri tarayıcıya aktarmak olmuş. Ben pek
tekin bulmadım bu implementasyonu :) Allah sonumuzu hayır etsin. Diğer
ilginç şeylerden biri de Multiple Browser debug moduydu. Artık debug
oturumlarında birden çok tarayıcı açtırabileceğiz doğrudan Visual
Studio'dan.

İşte durumlar bunlar. Böylece Build 2013 ikinci gün Keynote'unu da
geçirmiş olduk ve bir Build daha geçti. Dün olduğu gibi bugün de 2. gün
Keynote'u ile ilgili bir [Giik.FM podcastimiz](http://www.giik.fm) ve
[Teknolot.TV videocastimiz](http://www.teknolot.tv) var. Bu aralar
özellikle Teknolot.TV'yi takip etmeyi unutmayın :) AzureShow'da yeni
mobile services videolaro ve benim özel videoblogumda da Build'de hediye
edilen cihazların unboxing videoları yayınlanacak ;) Kaçırmayın derim.

Görüşmek üzere!


