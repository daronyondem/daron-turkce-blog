---
FallbackID: 2186
Title: Internet Explorer 8.0 için Search Provider ve Search Suggestions sistemlerini hazırlamak.
PublishDate: 15/9/2008
EntryID: Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: 565a18db-b3ae-4ef3-b96d-d7f495e594e8
---
Internet Explorer 7.0 ile beraber alıştığımız "**Search Providers**"
yapısına IE 8.0 içerisinde bazı eklemeler yapıldı. Bu eklemelerin içinde
en dikkati çeken özellik "**Search Suggestions**" özelliği. Aslında biz
yazılımcıların uzun süredir AJAX ile hazırladığımız ve AutoComplete
adını verdiğimiz sistemin ta kendisi.

![IE 8.0 içerisinde Search Suggestions
örneği.](media/Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak/14092008_1.png)\
*IE 8.0 içerisinde Search Suggestions örneği.*

Artık IE içerisinde arama için siz bir şeyler yazdıkça o an seçtiğiniz
"Search Provider" eğer "Search Suggestion" destekliyorsa otomatik olarak
sonuçlar anında yukarıdaki gibi karşınıza gelecektir.

**Search Provider nasıl hazırlanır?**

Search Provider'lar aslında birer XML dosyası şeklinde hazırlanır. Bu
XML dosyası içerisinde arama motoru ile ilgili tarayıcının ihtiyaç
duyduğu bilgiler yer alır. Düşündüğümüzde bunlar tabi ki arama motorunun
adı, adresi ve tarayıcıda gösterilecek olan ikonundan farklı bilgiler
değiller.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">UTF-8</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">OpenSearchDescription</span><span
style="color: blue;"> </span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://a9.com/-/spec/opensearch/1.1/</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ShortName</span><span
style="color: blue;">\></span>AramaMotoruAdı<span
style="color: blue;">\</</span><span
style="color: #a31515;">ShortName</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Url</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">text/html</span>"<span style="color: blue;">
</span><span style="color: red;">template</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49438/WebSite2/?aranacak={searchTerms}</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">height</span><span
style="color: blue;">=</span>"<span style="color: blue;">16</span>"<span
style="color: blue;"> </span><span style="color: red;">width</span><span
style="color: blue;">=</span>"<span style="color: blue;">16</span>"<span
style="color: blue;"> </span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">image/icon</span>"<span
style="color: blue;">\></span>http://localhost:49438/WebSite2/aramaikonu.ico<span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">OpenSearchDescription</span><span
style="color: blue;">\></span>

Yukarıda görmüş olduğunuz XML formatı
[OpenSearch](http://www.opensearch.org/Specifications/OpenSearch/1.1)
standartlarına uygun şekilde hazırlanmalıdır. **ShortName** tagları
arasında arama motorunun adı, **URL** taglarının **template** özelliğine
arama motorunun adresi yazılır. Adresi yazarken dikkat etmeniz gereken
nokta aranacak terimler yerine denk gelen noktaya **{searchTerms}**
yazmanız. Tarayıcı içerisinde kullanıcının arattığı herhangi bir şey
doğrudan bu adresteki {searchTerms} yazının yerine konarak verilen adres
çalıştırılacaktır. Son olarak isterseniz arama motorunuzun ikon
dosyasını da bir **Image** tagı içerisine adresini yazarak
iletebilirsiniz.

Yukarıdaki şekilde Search Provider dosyanızı hazırladıktan sonra artık
geriye kalan tek şey kullanıcıların bu dosyayı bir Search Provider
olarak bilgisayarlarına eklemelerini sağlayacak JavaScript kodunu
yazmak.

<span style="color: blue;">\<</span><span
style="color: #a31515;">a</span>

<span style="color: blue;">  </span><span
style="color: red;">href</span><span style="color: blue;">=</span>"<span
style="color: blue;">\#</span>"

<span style="color: blue;">  </span><span
style="color: red;">onclick</span><span
style="color: blue;">=</span>"<span
style="color: blue;">window.external.AddSearchProvider('http://localhost:49438/WebSite2/arama.xml')</span>"<span
style="color: blue;">\></span>

  Search Provider Ekle

<span style="color: blue;">\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

window.external.AddSearchProvider metoduna doğrudan XML dosyasının
konumunu verirseniz yukarıdaki gibi bir linke tıklandığında Search
Provider ekleme ekranının gelmesini sağlayabilirsiniz. Artık
kullanıcılar sizin Search Provider'ınızı kullanabilirler.

**Peki ya Search Suggestions?**

Search Suggestions sistemi tabi ki Search Provider'ların üzerine eklenen
bir sistem. O nedenle yukarıdaki gibi elinizde hazır bir Search
Provider'ın zaten bulunması gerekiyor. Sonrasında eklemeler ile Search
Provider'ınızı Search Suggestions destekli hale getirebiliyorsunuz.

<span style="color: gray;">\<?xml version=</span>"<span
style="color: gray;">1.0</span>"<span style="color: gray;">
encoding=</span>"<span style="color: gray;">UTF-8</span>"<span
style="color: gray;">?\></span>

<span style="color: gray;">\<OpenSearchDescription xmlns=</span>"<span
style="color: gray;">http://a9.com/-/spec/opensearch/1.1/</span>"<span
style="color: gray;">\></span>

<span style="color: gray;">  \<ShortName\></span><span
style="color: gray">AramaMotoruAdı</span><span
style="color: gray;">\</ShortName\></span>

<span style="color: gray;">  \<Url type=</span>"<span
style="color: gray;">text/html</span><span style="color: gray">"</span>

<span style="color: gray;">      template=</span>"<span
style="color: gray;">http://localhost:49438/WebSite2/?aranacak={searchTerms}</span>"<span
style="color: gray;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Url</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/x-suggestions+json</span>"

<span style="color: blue;">      </span><span
style="color: red;">template</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49438/WebSite2/json.ashx?aranacak={searchTerms}</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Url</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/x-suggestions+xml</span>"

<span style="color: blue;">      </span><span
style="color: red;">template</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49438/WebSite2/xml.ashx?aranacak={searchTerms}</span>"<span
style="color: blue;">/\></span>

<span style="color: gray;">  \<Image height=</span>"<span
style="color: gray;">16</span><span style="color: gray">"</span>

<span style="color: gray;">        width=</span>"<span
style="color: gray;">16</span><span style="color: gray">"</span>

<span style="color: gray;">        type=</span>"<span
style="color: gray;">image/icon</span>"<span
style="color: gray;">\></span><span
style="color: gray">http://localhost:49438/WebSite2/aramaikonu.ico</span><span
style="color: gray;">\</Image\></span>

<span style="color: gray;">\</OpenSearchDescription</span><span
style="color: blue;">\></span>

Bir önceki örneğimizdeki arama.xml dosyasına iki URL daha ekliyoruz. Bu
sefer eklediğimiz URL'lerin type özellikleri **text/html** değil de
**application/x-suggestions+json** veya
**application/x-suggestions+xml** olabiliyor. Her iki özelliği beraber
kullanmanın herhangi bir anlamı yok. Amacımız Search Suggestion
esnasından gösterilecek AutoComplete bilgisinin alınacağı adresi
belirlemek. Bu adreslerden ya XML ya da JSON formatında veri aktarımı
yapılabiliyor. Yine bu adresler içerisinde de aranan kelime doğrudan
{searchTerms} kısmına yerleştiriliyor. XML veya JSON döndüreceği için en
mantıklısı bu adreslerde ASHX (Generic Handler) kullanmak.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SearchSuggestion</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Query</span><span
style="color: blue;">\></span>asp.net<span
style="color: blue;">\</</span><span
style="color: #a31515;">Query</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Section</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Text</span><span
style="color: blue;">\></span>Sonuç 1<span
style="color: blue;">\</</span><span
style="color: #a31515;">Text</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>Açıklama<span
style="color: blue;">\</</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Url</span><span
style="color: blue;">\></span>http://sonucadresi.com<span
style="color: blue;">\</</span><span
style="color: #a31515;">Url</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Section</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">SearchSuggestion</span><span
style="color: blue;">\></span>

Yukarıdaki örnekte ASHX dosyamıza **aranan** parametresi olarak
**asp.net** metnini gönderdiğimizde ortaya çıkan sonucu görebiliriz.
**Query** tagları arasına doğrudan aranan parametresi tekrar yazdırarak
tarayıcıya iletmemiz gerekiyor. Böylece tarayıcı gerçekten aranan şeyin
sonucunun gelip gelmediğini kontrol edebiliyor. Sonrasında bir
**Section** açarak içerisine tek tek **item** tagları içerisinde her
arama sonucunun **Text** (metin), **Description** (Açıklama) ve **Url**
(Adres) bilgisini veriyoruz. Bizim örneğimizde şimdilik sadece tek sonuç
var. Tarayıcı en fazla 10 adet sonuç gösterebiliyor.

![İlk Search Suggestion denememizin
sonucu.](media/Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak/14092008_2.png)\
*İlk Search Suggestion denememizin sonucu.*

Yukarıdaki ekran görüntüsünde de inceleyebileceğiniz üzere XML'den
gönderdiğimiz tek sonuç bilgisi otomatik olarak tarayıcı tarafından
gösterilmiş durumda. Eğer kullanıcı gelen sonuçlardan herhangi birine
tıklarsa o sonuca ait **Url** tagları ile gelen adrese yönlendirilir.
Şimdi sıra geldi bu sonuçlara biraz da görsellik eklemeye.

Son bir defa tekrar yukarıdaki ekran görüntüsüne bir göz atalım.
Dikkatinizi çektiyse en üstte "AramaMotoduAdı Suggestions" yazıyor. Bu
başlık otomatik olarak arama motorunun adı alınarak sonuna "Suggestions"
eklenerek oluşturuluyor. İşin güzel tarafı biz istersek alt başlıklar
oluşturabiliyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SearchSuggestion</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Query</span><span
style="color: blue;">\></span>asp<span
style="color: blue;">\</</span><span
style="color: #a31515;">Query</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Section</span><span
style="color: blue;">\></span>

<span style="color: blue;">    **\<**</span><span
style="color: #a31515;">**Separator**</span><span style="color: blue;">
**** </span><span style="color: red;">**title**</span><span
style="color: blue;">**=**</span>"<span style="color: blue;">**Bölüm
1**</span>"<span style="color: blue;"> **/\>**</span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Text</span><span
style="color: blue;">\></span>Sonuç 1<span
style="color: blue;">\</</span><span
style="color: #a31515;">Text</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>Açıklamaa<span
style="color: blue;">\</</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Url</span><span
style="color: blue;">\></span>http://sonucadresi.com<span
style="color: blue;">\</</span><span
style="color: #a31515;">Url</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">    **\<**</span><span
style="color: #a31515;">**Separator**</span><span style="color: blue;">
**** </span><span style="color: red;">**title**</span><span
style="color: blue;">**=**</span>"<span style="color: blue;">**Bölüm
2**</span>"<span style="color: blue;"> **/\>**</span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Text</span><span
style="color: blue;">\></span>Sonuç 2<span
style="color: blue;">\</</span><span
style="color: #a31515;">Text</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>Açıklamaa<span
style="color: blue;">\</</span><span
style="color: #a31515;">Description</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Url</span><span
style="color: blue;">\></span>http://sonucadresi.com<span
style="color: blue;">\</</span><span
style="color: #a31515;">Url</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Item</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Section</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">SearchSuggestion</span><span
style="color: blue;">\></span>

Yukarıdaki XML içerisinde **Separator** tagları dikkatinizi çekecektir.
Bu taglar title özelliklerindeki yazılarla beraber Search Suggestion
içerisinde farklı bölümlemelerin oluşmasını sağlayacaktır.

![İki bölümlü Search
Suggestion.](media/Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak/14092008_3.png)\
*İki bölümlü Search Suggestion.*

Son olarak gelelim bu sonuçların yanına ufak birer de görsel
yerleştirmeye. Böylece çok daha hoş bir görüntü oluşacaktır. Aslında tek
yapmamız gereken her bir sonucu tanımlayan **item** elementinin
içerisine bir de **image** elementi yerleştirerek sonuçla ilgili resmin
adresini vermek.

<span style="color: gray;">\<SearchSuggestion\></span>

<span style="color: gray;">  \<Query\></span><span
style="color: gray">asp</span><span
style="color: gray;">\</Query\></span>

<span style="color: gray;">  \<Section\></span>

<span style="color: gray;">    \<Separator title=</span>"<span
style="color: gray;">Bölüm 1</span>"<span style="color: gray;">
/\></span>

<span style="color: gray;">    \<Item\></span>

<span style="color: gray;">      \<Text\></span><span
style="color: gray">Sonuç 1</span><span
style="color: gray;">\</Text</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49438/WebSite2/dock.jpg</span>"

<span style="color: blue;">            </span><span
style="color: red;">alt</span><span style="color: blue;">=</span>"<span
style="color: blue;">Bir resim</span>"

<span style="color: blue;">            </span><span
style="color: red;">width</span><span
style="color: blue;">=</span>"<span style="color: blue;">75</span>"

<span style="color: blue;">            </span><span
style="color: red;">height</span><span
style="color: blue;">=</span>"<span style="color: blue;">50</span>"<span
style="color: blue;"> /\></span>

<span style="color: gray;">      \<Description\></span><span
style="color: gray">Açıklamaa</span><span
style="color: gray;">\</Description\></span>

<span style="color: gray;">      \<Url\></span><span
style="color: gray">http://sonucadresi.com</span><span
style="color: gray;">\</Url\></span>

<span style="color: gray;">    \</Item\></span>

<span style="color: gray;">    \<Separator title=</span>"<span
style="color: gray;">Bölüm 2</span>"<span style="color: gray;">
/\></span>

<span style="color: gray;">    \<Item\></span>

<span style="color: gray;">      \<Text\></span><span
style="color: gray">Sonuç 2</span><span
style="color: gray;">\</Text\></span>

<span style="color: gray;">      \<Description\></span><span
style="color: gray">Açıklamaa</span><span
style="color: gray;">\</Description\></span>

<span style="color: gray;">      \<Url\></span><span
style="color: gray">http://sonucadresi.com</span><span
style="color: gray;">\</Url\></span>

<span style="color: gray;">    \</Item\></span>

<span style="color: gray;">  \</Section\></span>

<span style="color: gray;">\</SearchSuggestion</span><span
style="color: blue;">\></span>

Daha önceki arama sonucunu tanımlayan XML dosyamızdaki ilk **item**
tagının içerisine bir de **Image** tagı yerleştiriyoruz. Bu Image
tagının aslında HTML'den bildiğimiz **Image** tagından neredeyse hiçbir
farklı yok. **Source** özelliğine gösterilecek olan fotoğrafın adresini,
**alt** özelliğine ToolTip metnini, **width** ve **height**
özelliklerine de resmin gösterilecek olan boyutunu belirtmemiz yeterli
olacaktır.

![Search Suggestion içerisinde fotoğraf
gösterimi.](media/Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak/14092008_4.png)\
*Search Suggestion içerisinde fotoğraf gösterimi.*

Bizim örneğimizde resmin boyutları XML içerisinde tanımlı şekilde. Bu
boyutları sabit tutabileceğiniz gibi isterseniz dinamik olarak da
ayarlayabilirsiniz. Bunun için Search Provider'ın XML tanımındaki URL
bilgisinde ufak bir değişiklik yapmak gerekiyor.

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Url</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/x-suggestions+xml</span>"

<span style="color: blue;">      </span><span
style="color: red;">template</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49438/WebSite2/xml.ashx?aranacak={searchTerms}?}&amp;\

maxgenislik={maxWidth}&amp;satiryuksekligi={rowHeight}&amp;bolumyuksekligi={sectionHeight}</span>"<span
style="color: blue;">/\></span>

ASHX dosyasına ek olarak gönderebileceğiniz **{maxWidth}, {rowHeight}**
ve **{sectionHeight}** bilgileri tarayıcı tarafından otomatik olarak
doldurulacaktır. **{maxWidth}** Search Suggestion barının genişliğini,
**{rowHeight}** her bir sonucun gösterildiği satırının yüksekliğini,
**{sectionHeight}** ise varsa bir bölümün toplam yüksekliğini
verecektir. Bu bilgileri kullanıcının çözünürlüğüne göre değişeceği için
sizde ASHX dosyanıza gelen parametrelere uygun şekilde XML yaratırken
**Image** taglarının boyutlarını belirleyebilirsiniz.

Gelin işin bir de sunucu tarafına göz atalım ve son örneğimizdeki XML
kodunu oluşturacak ASHX'ın arkasına bakalım.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> ProcessRequest(<span
style="color: blue;">ByVal</span> context <span
style="color: blue;">As</span> HttpContext) <span
style="color: blue;">Implements</span> IHttpHandler.ProcessRequest

        context.Response.ContentType = <span
style="color: #a31515;">"text/xml"</span>

 

        <span style="color: blue;">Dim</span> XMLFeed <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
XDocument(<span style="color: blue;">New</span> XDeclaration(<span
style="color: #a31515;">"1.0"</span>, <span
style="color: #a31515;">"utf-8"</span>, <span
style="color: #a31515;">"yes"</span>))

        XMLFeed.Add(<span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"SearchSuggestion"</span>, \_

                      <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Query"</span>,
context.Request.QueryString(<span
style="color: #a31515;">"aranacak"</span>)), \_

                        <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Section"</span>, \_

                          <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Separator"</span>, \_

                            <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Bölüm 1"</span>)), \_

                          <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Item"</span>, \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Text"</span>, <span
style="color: #a31515;">"Sonuç 1"</span>), \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Image"</span>, \_

                              <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"source"</span>, <span
style="color: #a31515;">"http://localhost:49438/WebSite2/dock.jpg"</span>),
\_

                              <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"alt"</span>, <span
style="color: #a31515;">"Bir resim"</span>), \_

                              <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"width"</span>, <span
style="color: #a31515;">"75"</span>), \_

                              <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"height"</span>, <span
style="color: #a31515;">"50"</span>)), \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Description"</span>, <span
style="color: #a31515;">"Açıklamaa"</span>), \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Url"</span>, <span
style="color: #a31515;">"http://sonucadresi.com"</span>)), \_

                          <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Separator"</span>, \_

                            <span style="color: blue;">New</span>
XAttribute(<span style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Bölüm 2"</span>)), \_

                          <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Item"</span>, \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Text"</span>, <span
style="color: #a31515;">"Sonuç 2"</span>), \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Description"</span>, <span
style="color: #a31515;">"Açıklamaa"</span>), \_

                            <span style="color: blue;">New</span>
XElement(<span style="color: #a31515;">"Url"</span>, <span
style="color: #a31515;">"http://sonucadresi.com"</span>)))))

        context.Response.Write(XMLFeed)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">void</span> ProcessRequest (HttpContext context) {

        context.Response.ContentType = <span
style="color: #a31515;">"text/xml"</span>;

 

        XDocument XMLFeed = <span style="color: blue;">new</span>
XDocument(<span style="color: blue;">new</span> XDeclaration(<span
style="color: #a31515;">"1.0"</span>, <span
style="color: #a31515;">"utf-8"</span>, <span
style="color: #a31515;">"yes"</span>));

        XMLFeed.Add(<span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"SearchSuggestion"</span>,

            <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Query"</span>,
context.Request.QueryString[<span
style="color: #a31515;">"aranacak"</span>].ToString()),

            <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Section"</span>,

                <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Separator"</span>,

                    <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Bölüm 1"</span>)),

                    <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Item"</span>,

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Text"</span>, <span
style="color: #a31515;">"Sonuç 1"</span>),

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Image"</span>,

                            <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"source"</span>, <span
style="color: #a31515;">"http://localhost:49438/WebSite2/dock.jpg"</span>),

                            <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"alt"</span>, <span
style="color: #a31515;">"Bir resim"</span>),

                            <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"width"</span>, <span
style="color: #a31515;">"75"</span>),

                            <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"height"</span>, <span
style="color: #a31515;">"50"</span>)),

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Description"</span>, <span
style="color: #a31515;">"Açıklamaa"</span>),

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Url"</span>, <span
style="color: #a31515;">"http://sonucadresi.com"</span>)),

                <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Separator"</span>,

                    <span style="color: blue;">new</span>
XAttribute(<span style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Bölüm 2"</span>)),

                    <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"Item"</span>,

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Text"</span>, <span
style="color: #a31515;">"Sonuç 2"</span>),

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Description"</span>, <span
style="color: #a31515;">"Açıklamaa"</span>),

                        <span style="color: blue;">new</span>
XElement(<span style="color: #a31515;">"Url"</span>, <span
style="color: #a31515;">"http://sonucadresi.com"</span>)))));

 

        context.Response.Write(XMLFeed.ToString());

    }

Tabi tüm yukarıdaki kodun bir veritabanına bağlanması ve uygun şekilde
**For** döngüleri ve **LINQ** sorguları ile birden çok **item**
elementlerinin yaratılması gerekiyor.

İşin JSON tarafına baktığımızda maalesef programatik olarak kullanımı
çok daha bir sistem söz konusu. Ayrıca JSON tarafında Separator ve Image
nesneleri şu an için desteklenmiyor. O nedenle JSON kullanımı pek uygun
değil.

**Her Search Provider aynı anda bir Accelerator!**

Internet Explorer 8.0 ile beraber gelen bir diğer yenilik de eski adıyla
"**Activities**" olan "**Accelerator**"lar. Accelerator'ların detayına
girmeyeceğiz, bunun için ayrı bir makale çok daha uygun olur fakat her
Search Provider'ın aslında otomatik olarak da bir Accelerator olduğunu
söyleyebiliriz. IE içerisinde herhangi bir web sayfasını açtıktan sonra
bir metin seçip fare ile sağ tıkladığınızda Accelerator menüsünden
Search Provider'ları görebilirsiniz.

![Her Search Provider aynı anda bir
Accelerator!](media/Internet_Explorer_8_0_icin_Search_Provider_ve_Search_Suggestions_sistemlerini_hazirlamak/14092008_5.png)\
*Her Search Provider aynı anda bir Accelerator!*

Bu otomatik Accelerator yapısının oluşması için ek bir işlem yapmak
gerekmiyor. İsterse kullanıcı rahatlıkla "Manage Accelerators"
bölümünden arama motorunu ilk sağ tık ile gelen menüye de alabiliyor.

**Search Provider'ı bulunabilir hale getirmek?**

JavaScript kodu ile Search Provider ekleme işlemini görmüştük. Bunun
haricinden tarayıcıların sayfanıza girildiği gibi uygun Search
provider'ı otomatik olarak bulabilmesi için de aşağıdaki kodu sayfanın
**head** bölümüne yerleştirebilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">link</span><span style="color: blue;">
</span><span style="color: red;">title</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AramaMotoruAdı</span>"

<span style="color: blue;">      </span><span
style="color: red;">rel</span><span style="color: blue;">=</span>"<span
style="color: blue;">search</span>"

<span style="color: blue;">      </span><span
style="color: red;">type</span><span style="color: blue;">=</span>"<span
style="color: blue;">application/opensearchdescription+xml</span>"

<span style="color: blue;">      </span><span
style="color: red;">href</span><span style="color: blue;">=</span>"<span
style="color: blue;">AramaMotoruAdı</span>"<span
style="color: blue;">\></span>

Burada önemli olan nokta Search Provider'ı tanımlayan XML dosyası
içerisinde **ShortName** ile bu tag içerisindeki **title'ın** kesinlikle
aynı olması gerektiği. Aksi halde birleştirme işlemi yapılamayacaktır.
**link** tagı içerisinde **href** özelliği doğrudan Search Provider'ın
XML dosyasını göstermelidir.

Hepinize kolay gelsin.


