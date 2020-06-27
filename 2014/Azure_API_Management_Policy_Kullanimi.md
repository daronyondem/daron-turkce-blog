---
FallbackID: 2921
Title: "Azure API Management Policy Kullanımı"
date: "2014-10-28"
EntryID: Azure_API_Management_Policy_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: API Management, Windows Azure
---
# Azure API Management Policy Kullanımı
Bir önceki
[yazıda](http://daron.yondem.com/software/post/Azure_API_Management_Giris)
Azure API Management konusuna hızlı bir giriş yapmıştık. Basit bir
servisi alıp wrap etmiştik. Bu yazıda biraz daha derinlere girip sadece
UrlReWrite değil farklı transformasyonlara da göz atacağız. Bunun için
API Management portalındaki Policies sekmesine yönelmemiz gerekiyor.

![Policy'ler ile bir çok farklı hareket yapmak
mümkün.](media/Azure_API_Management_Policy_Kullanimi/api_policies.png)
*Policy'ler ile bir çok farklı hareket yapmak mümkün.*

Policies ekranına geçtiğinde portalınızdaki bir ürün, API ve sonrasında
da API'ın operasyonunu seçmeniz gerekiyor. Bir önceki makalede
hazırladığımız HavaDurumu servisinden ilerleyecek olursak bizim zaten
bir GET operasyonumuz vardı. Hatırlarsanız kullandığımız harici servis
XML çıktı veriyordu. Gelin biz bu XML'i bizim API'larımızdan
gerektiğinde JSON olarak verilebilecek hale getirelim. Bunun için
"Configure Policy" düğmesine tıklayarak sağ tarafta bulunan olası policy
askyonlarından "Convert XML to JSON"ı alıp orta kısma sürüklemeniz
gerekiyor. Burada editör çok da süper bir editör değil açıkçası :) O
nedenle XML dokümanı içerisinde doğru şeyleri doğru yerlere koymazsanız
hata alırsınız.

```xml
<policies>
    <inbound>
        <base />
        <rewrite-uri template="forecast?q={sehir}&amp;mode=xml" />
    </inbound>
    <outbound>
        <xml-to-json kind="direct" apply="content-type-xml" consider-accept-header="true" />
        <base />
    </outbound>
</policies>
```

Kullanacağımız final policy dosyası yukarıdaki gibi olacak. Outbound
tagının içerisinde çıkışta XML-JSON çeviri işlemi yapacağımızı
ekliyoruz. Bu işlemi yaparken de API'mıza gelen talepteki Accept
Header'ına saygı duyacağımızı belirtmemizde fayda var. Aksi halde
sürekli JSON vermek durumunda kalabiliriz. Bence isteyenin kendi
istediği çıktıyı seçebilmesi önemli.

![JSON Output
hazır.](media/Azure_API_Management_Policy_Kullanimi/api_policies_2.png)
*JSON Output hazır.*

Artık dışarıdan API'mız çağrıldığında eğer Accept Header'da app/json
varsa API'mız kendisine gelen XML'i JSON'a çevirerek dışarıya verecek.
Böylece aslında bakarsanız olası bir senaryoda şirket içerisindeki bir
XML çıktıya sahip servisi alıp güzel bir JSON API'ına UrlRewrite ile
REST API konseptine uygun bir şekilde toparlayarak işimizi hızlıca
bitirebiliyoruz. Gelin bir adım daha ileri giderek bir de output cache
ekleyelim API'mıza. Sürekli içerideki diğer servise gitmek
istemeyebiliriz.

```XML
<policies>
    <inbound>
        <cache-lookup vary-by-developer="true" vary-by-developer-groups="false" downstream-caching-type="public">
            <vary-by-header>Accept</vary-by-header>
            <vary-by-header>Accept-Charset</vary-by-header>
        </cache-lookup>
        <base />
        <rewrite-uri template="forecast?q={sehir}&amp;mode=xml" />
    </inbound>
    <outbound>
        <xml-to-json kind="direct" apply="content-type-xml" consider-accept-header="true" />
        <base />
        <cache-store duration="90" caching-mode="cache-on" />
    </outbound>
</policies>
```

Bu sefer policymizin iki farklı ayağına da dokunmamız gerekiyor. InBound
ayağında eğer varsa önbelleklenmiş bir şey onu dışarıya aktarmamız
gerek. O nedenle InBound'da Cache-Lookup yapıyoruz. Lookup yaparken
cache'in neye göre invalide olacağına karar verebilirsiniz. Benim
örneğimde ilk olarak her developer için ayrı önbelleklenme şartı koştum
fakat developer grouplarına göre ise önbelleği ayırmadım. Developer
Group konsepti Azure Management API'ın Management ekranında var olan bir
gruplama yapısı. Son olarak Accept Header'ının ve Charset'in de ayrı
ayrı önbelleklenmesi şart :) JSON isteyene XML vermek istemiyorsanız :)

Önbellek ayarlarını yaptıktan sonra sıra geliyor çıkış noktasında
önbellek çıktısını açıp önbellek süresini belirlemeye. Bizim örneğimizde
önbellek süresi 90 saniye.

![Önbellekleme 90
saniyede.](media/Azure_API_Management_Policy_Kullanimi/api_policies_3.png)
*Önbellekleme 90 saniyede.*

Yukarıdakiler gibi bir çok policy aksyonu mevcut. Bunların içerisinde
full text replace bile var :) Açıkçası XSLT tadında bir şema
transformasyon aracı olsaydı tadından yenmezdi :) ve belki de şu an
bulunan çoğu policy aksyonunu daha generic bir seçenekle sağlamış
olabilirlerdi. Fakat öyle bir şey yok :) Nitekim API Management'a aşırı
yük yüklemek de çok doğru olmayabilir. Özellikle önbelleklemeyi
açmazsanız ve çok fazla response processing yaparsanız yavaşlıklarla baş
başa kalabilirsiniz veya sırf bu nedenle scale etmek zorunda da
kalabilirsiniz. O nedenle belki de en önemli noktalardan biri doğru
önbellekleme politikasını tanımlamış olmak. Tabi önbelleğinizi toplam
miktarı da bir noktaca scale etmenize neden olabilir :) Tabi günün
sonunda bu servisleri sattığınızı düşünürsek pek de büyük dert olmasa
gerek.

Görüşmek üzere.



*Bu yazi http://daron.yondem.com adresinde, 2014-10-28 tarihinde yayinlanmistir.*
