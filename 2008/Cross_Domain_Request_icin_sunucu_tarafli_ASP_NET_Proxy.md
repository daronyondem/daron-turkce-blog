---
FallbackID: 2061
Title: Cross Domain Request için sunucu taraflı ASP.NET Proxy
PublishDate: 19/5/2008
EntryID: Cross_Domain_Request_icin_sunucu_tarafli_ASP_NET_Proxy
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, Silverlight, Silverlight 2.0
old.EntryID: 40f51ce0-3ca2-4f47-815a-5071386cd640
---
İstemci taraflı programlama sistemleri AJAX ile karşımıza çıkmıştı,
Silverlight ile beraber ise artık istemci taraflı programlama neredeyse
"hayatımız" oluyor. Bu durumda karşılaştığımız en büyük sorun
"Cross-Domain-Request" sınırlaması. Güvenlik nedenleriyle bir alan
adından bir başka alan adına bağlanarak veri talebinde bulunamıyoruz.
Eğer karşıdaki alan adının ihtiva ettiği siteye admin erişiminiz varsa
tabi ki farklı teknikler kullanarak bu sorunu çözebilirsiniz. Bu konuda
Silverlight 2.0 ile beraber
[clientaccesspolicy.xml](http://daron.yondem.com/tr/post/4bfde604-04ab-427c-81cb-fc775b72f912)dosyası
geliyor.

**Peki ya karşı siteye admin erişimimiz yoksa?**

İşte o zaman kendi sitemizde sunucu taraflı bir proxy kullanmamız şart.
ASP.NET ile sunucu tarafından istediğimiz siteye bağlanarak istediğimiz
dosyası alabiliriz. Bu durumda bir ASPX sayfası yapsak bizim yerimize
gidip kendisine hedef gösterdiğimiz adresten gerekli dosyayı alıp
istemci tarafına, yani bize iletse hoş olmaz mı?

        <span style="color: blue;">Dim</span> Talep <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Net.WebClient

        <span style="color: blue;">Dim</span> GelenVeri <span
style="color: blue;">As</span> <span style="color: blue;">Byte</span>()
= Talep.DownloadData(Request.QueryString(<span
style="color: #a31515;">"Dosya"</span>))

        Response.ContentType = Talep.ResponseHeaders(<span
style="color: #a31515;">"Content-type"</span>).ToString

        Response.OutputStream.Write(GelenVeri, 0,
GelenVeri.GetLength(0))

        Response.OutputStream.Close()

        Response.End()

Yukarıdaki kod içerisinde doğrudan bir **WebClient** yaratarak farklı
bir adresten veri indirme işlemi yapıyoruz. Kod içerisindeki en önemli
nokta indirmek istediğimiz hedef veri ile istemciye göndereceğimiz
verinin **ContentType** değerlerinin aynı olması gerektiği. Bunun için
**Response.ContentType**'ı WebClient üzerinden aldığımız **Content-Type
header** bilgisi ile eşleştiriyoruz. Böylece proxy'miz gerektiğinde
video veya resim dosyalarını da rahatlıkla indirerek bize ulaştırabilir.

**Performans?**

Yukarıdaki örneğimiz çok basit bir yapıya sahip. Dosyayı sunucuya
indirerek doğrudan istemciye gönderiyor. Yüksek sayıda istek oluşan
projelerde veya büyük dosyalar indirecek olan uygulamalarında farklı
performans senaryoları uygulamak gerekecektir. Aslında baktığımızda bu
yapının herhangi bir Proxy programlamaktan pek farkı yok. Aklıma ilk
aşamada gelen dikkat edilmesi gereken noktalar şöyle oldu;

-   Büyük dosya indirirken istemcinin hala bağlı olup olmadığını
    **Response.IsClientConnected** ile kontrol etmek gerekir.
-   Büyük dosya indirme işlemlerinde bufferlamak ve kısım kısım
    indirerek istemciye göndermek daha mantıklı olabilir. Özellikle
    video dosyalarında.
-   Kesinlikle bu dosyaya request yollayanın headerını kontrol etmek
    lazım. Kötü niyetli biri bu proxy'yi sadece sunucunun bant
    genişliğini harcamak için kullanabilir veya gereksiz yere sunucuyu
    yorabilir.

Hepinize kolay gelsin.


