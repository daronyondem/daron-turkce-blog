---
FallbackID: 1898
Title: LINQ2XML
PublishDate: 12/27/2007
EntryID: LINQ2XML
IsActive: True
Section: software
MinutesSpent: 0
Tags: LINQ
old.EntryID: 3dc9614e-471c-4c41-ad54-d7c2276b15a7
---
LINQ'nun güzellikleri serime devam etmek istiyorum :) .NET Framework3.5
ile gerçek hayat projeleri yapabileceğimiz bu dönemde LINQ'nun proje
süreçlerini ciddi şekilde hızlandırdığı kesin. Daha önceki yazılarımda
kabaca **LINQ2XML'den** bahsetmiştim. XML verilerini LINQ ile
sorgulayarak istediğimiz verileri alabiliyor olmak önceki muadilleri
olan XMLReader'a ve XPATH'e kıyasla çok daha kolay kullanılabilir bir
arayüz sağlıyor.

Konuya hemen çok popüler bir örnek ile giriş yapmak istiyorum. TCMB web
sitesinden güncel döviz kurlarını çekmek neredeyse her yazılım
geliştiricinin deneyim ettiği bir işlemdir. Bu işlem için için eskiden
en kolay yol olarak bir dataset yaratıp dataset'e ait ReadXML metodunu
kullanıyorduk. Aslında sadece bir döviz kuru okumak için DataSet iki
complex bir nesne yaratıyor olmak ciddi anlamda sistem kaynaklarının
boşa harcanması demektir ama kimin umrunda? :) Profesyonel yol ise
**XMLReader** ile **XPATH** kullanarak uygun veriyi almak.

Peki artık LINQ varsa ve biz LINQ ile XML verilerini de
sorgulayabileceksek aşağıdaki kod yeterli olmak mı?

        <span style="color: blue;">Dim</span> doc = XDocument.Load(<span
style="color: #a31515;">"http://www.tcmb.gov.tr/kurlar/today.xml"</span>)

        Response.Write(doc.<span
style="color: #6464b9;">\<</span>Tarih\_Date<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Currency<span
style="color: #6464b9;">\></span>.Where(<span
style="color: blue;">Function</span>(x) x.<span
style="color: #6464b9;">\<</span>CurrencyName<span
style="color: #6464b9;">\></span>.Value = <span
style="color: #a31515;">"US DOLLAR"</span>).<span
style="color: #6464b9;">\<</span>ForexBuying<span
style="color: #6464b9;">\></span>.Value)

Yukarıdaki kod içerisinde ilk olarak bir **System.XML.Linq.XDocument**
nesnesi yaratıyoruz. Dokümanımız direk web sitesinden XML belgesini
okuyor. Bir sonraki satırda ise direk **LINQ2XML** kullanarak verimizi
buluyoruz. Son satırı biraz parçalayarak inceleyelim.

doc.<span style="color: #6464b9;">\<</span>Tarih\_Date<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Currency<span
style="color: #6464b9;">\></span>

Bu kod ile hedef doküman içerisindeki XML taglarını gezerek
**Tarih\_Date** tagları içerisinde bulunan tüm **Currency** taglarının
bir listesini alıyoruz. Bu listeyi aldıktan sonra **LINQ Extension
Method**'larından **Where'i** kullanarak bir sorgu çalıştırıyoruz.

doc.<span style="color: #6464b9;">\<</span>Tarih\_Date<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Currency<span
style="color: #6464b9;">\></span>.Where(<span
style="color: blue;">Function</span>(x) x.<span
style="color: #6464b9;">\<</span>CurrencyName<span
style="color: #6464b9;">\></span>.Value = <span
style="color: #a31515;">"US DOLLAR"</span>)

Buradaki **Where** methodu bizden bir karşılaştırma fonksiyonu istiyor.
Söz konusu fonksiyon karşılaştırmak için gelen veriyi parametre olarak
alıyor. Biz **Currency** tagını listelediğimizde göre her bir
**Currency** içerisinde **CurrencyName** üzerinden verimizi
filtreliyoruz ve sadece **CurrencyName'i** "US DOLLAR" olan satırı
**Currency'i** istiyoruz.

Filtreleme işlemini yaptıktan sonra hala elimizde filtremize uyan bir
**Currency** elementi listesi var. Bize tek bir **Currency** döneceğini
bildiğimiz için direk söz konusu **Currency'nin** bu sefer de
**ForexBuying** elementini yakalayarak içerisinde değeri almak için de
**Value** metodunu kullanıyoruz.

doc.<span style="color: #6464b9;">\<</span>Tarih\_Date<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Currency<span
style="color: #6464b9;">\></span>.Where(<span
style="color: blue;">Function</span>(x) x.<span
style="color: #6464b9;">\<</span>CurrencyName<span
style="color: #6464b9;">\></span>.Value = <span
style="color: #a31515;">"US DOLLAR"</span>).<span
style="color: #6464b9;">\<</span>ForexBuying<span
style="color: #6464b9;">\></span>.Value

Böylece artık elimizde dolar kuru var. Bu şekilde herhangi bir XML
dokümanı içerisinde gezmek gerçekten çok kolay. Gelin aynı XML dokümanı
içerisinde farklı bir sorgu çalıştıralım. **Curreny** listesi içerisinde
**Isim** değerinde "I" harfi bulunan kayıtların **CurrencyName'lerini**
listeletelim.

        <span style="color: blue;">Dim</span> doc = XDocument.Load(<span
style="color: #a31515;">"http://www.tcmb.gov.tr/kurlar/today.xml"</span>)

 

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> kur <span
style="color: blue;">In</span> doc.<span
style="color: #6464b9;">\<</span>Tarih\_Date<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Currency<span
style="color: #6464b9;">\></span>.Where(<span
style="color: blue;">Function</span>(x) x.<span
style="color: #6464b9;">\<</span>Isim<span
style="color: #6464b9;">\></span>.Value.Contains(<span
style="color: #a31515;">"I"</span>))

            Response.Write(kur.<span
style="color: #6464b9;">\<</span>CurrencyName<span
style="color: #6464b9;">\></span>.Value)

        <span style="color: blue;">Next</span>

Yukarıda da gördüğünüz gibi **XDocument** üzerinden sorgumu
oluşturduktan sonra direk bir **For Each** döngüsüne kaynak olarak
veriyorum. Döngü içerisinde de bir **Currency** elementi olan kur
değişkeninin **CurrencyName** değerini alarak ekrana yazdırıyorum.

Anlayacağınız artık XPath bilgisi olmadan rahatlıkla XML kaynaklarını
sorgulamanız mümkün.

Hepinize kolay gelsin.


