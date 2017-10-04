---
FallbackID: 1764
Title: Live Search XML Web Servisleri'ni Kullanarak Kendi Arama Motorunuzu Yaratın
PublishDate: 28/8/2007
EntryID: Live_Search_XML_Web_Servislerini_Kullanarak_Kendi_Arama_Motorunuzu_Yaratin
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET
old.EntryID: 5b00b378-2c9d-46d3-927c-b7e80dd3252a
---
Hiç kendi arama motorunuzu programlamayı düşündünüz mü? Peki bu konuda
hiç araştırma yaptınız mı? Emin olun hiç kolay bir iş değil. Onun yerine
biraz kolaya kaçıp hazır arama motorlarından faydalanabiliriz. Gün
geçtikçe gelişen **Live** arama motorunu kullanacağımız bu makalemizde
ilk olarak arama motorunun XML web servislerini kullanabilmek için
<http://search.msn.com/developer> adresinden **Create and Manage
Application IDs** bölümüne girerek kendimize bir **AppID** (Uygulama
Kimliği) yaratmamız gerekiyor.

![Live Search AppID yaratma
yolundayız.](http://cdn.daron.yondem.com/assets/1764/27082007_01.png)\
 *Live Search AppID yaratma yolundayız.*

**AppID** yaratma yolunda ilerlediğimizde bizden **LiveID** kimlik
bilgilerimiz isteniyor. Giriş yaptıktan sonra arama motorumuzu
kullanacağımız uygulamamızla ilgili bir anahtar isim verdikten sonra
**AppID'mizi** hemen alabiliyoruz.

![Live AppID'mizi uygulama ismi vererek
alabiliyoruz.](http://cdn.daron.yondem.com/assets/1764/27082007_02.png)\
 *Live AppID'mizi uygulama ismi vererek alabiliyoruz.*

Tüm bu işlemleri tamamladıktan sonra artık
<http://soap.search.msn.com/webservices.asmx?wsdl> adresindeki web
servisini uygulamamızda kullanmaya başalayabiliriz. Projenize **Solution
Explorer** içerisinde sağ tuş ile tıkladığınızda gelen menüden **Add Web
Reference** seçeneğini seçerek tanımlama işlemlerini
tamamlayabilirsiniz.

![Kullanacağımız web servisini projemize web reference olarak
ekliyoruz.](http://cdn.daron.yondem.com/assets/1764/27082007_03.png)\
 *Kullanacağımız web servisini projemize web reference olarak
ekliyoruz.*

Live arama motoruna ait web servisini kullanırken özel sorgular
hazırlayarak farklı arama filtreleri uygulama şansımız da var. Gelin,
örneğimizde sadece üç site içerisinde arama yapan bir arama motoru
oluşturalım. Kullanabileceğiniz filtreleme seçenekleri çok geniş olduğu
için bu konuyu makalenin dahiline almayacağım, siz isterseniz
<http://msdn2.microsoft.com/en-us/library/aa905321.aspx> adresinden
geniş bilgi alabilirsiniz.

Kullanacağımız filtrelemede sadece belirli web siteleri içerisinde arama
yaptırılarak sonuçların bize **Live Search** tarafından döndürülmesini
istiyor olacağız. Bu nedenle ilk olarak yapacağım şey bize filtreleme
sorgusunun metnini döndüren bir fonksiyon yazmak olacak.

<span>    <span style="color:blue; ">Function</span> SorguYarat(<span
style="color:blue; ">ByVal</span> Aranan) <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>        <span style="color:blue; ">Dim</span> Writer <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
System.Text.StringBuilder</span>\
<span>        Writer.Append(Aranan)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">"
("</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"yazgelistir.com"</span>)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">" OR
"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"nedirtv.com"</span>)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">" OR
"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"microsoft.com.tr"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">")"</span>)</span>\
<span>        <span style="color:blue; ">Return</span>
Writer.ToString</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>

Yukarıda hazırlamış olduğumuz fonksiyon bir **StringBuilder**
tanımlayarak verdiğimiz metinleri aranacak olan metnin sonuna ard arda
ekliyor. Aslına bakarsanız yolladığımız sorgu bu kod içerisinde sabit
fakat ben özellikle bu şekilde yaparak sizin bu kodu veritabanına
bağlamanızı kolaylaştırmak istedim. Böylece sitelerinin isimlerini
eklediğimiz kodları bir döngü içerisinde kullanarak veritabanınızdan
gelen site adlarını sorguya ekleyerek, içerisinde arama yapılacak
sitelerin listesini dinamik olarak veritabanında çekebilirsiniz.

Şimdi sıra geldi arama işlemini yapacak olan fonksiyonu. Ben
fonksiyonumu bir **DataTable** döndürecek şekilde yazacağım. Böyle
yaparak fonksiyonumu ileride direk bir **Repeater** veya **GridView'e**
bağlamamı kolaylaştırıyorum. Fonksiyonun ana yapısını oluşturmadan
içerisindeki kodları yazalım.

<span>        <span style="color:green; ">'Verileri depolayacağımız sana
tablomuzu oluşturuyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MyData <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
**DataTable**(<span style="color:#A31515; ">"Sonuclar"</span>)</span>\
 <span>        <span style="color:green; ">'Tablomuza toplam dört kolon
ekleyeceğiz.</span></span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Baslik"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Açıklama"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Görünen URL"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"URL"</span>))</span>

Yukarıdaki kodlar ile **MyData** adında bir tablo yaratarak içerisine
dört adet kolon ekliyorum. Bu kolonlardaki verileri yeri geldiğinde
arama motorundan dönen sonuçlar ile dolduracağım. Live Search arama
motorundan çok detaylı sonuçlar geliyor, isterseniz siz daha farklı
kolonlar koyarak daha fazla veri alabilirsiniz. Benim için bu kadarı
yeterli :)

<span>        <span style="color:green; ">'Arama motorumuzu
tanımlıyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchEngine <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
**MSNSearchService**</span>\
 <span>        <span style="color:green; ">'Arama talbeni değişkenimizi
yaratıyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchRequest
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> **SearchRequest**</span>\
 <span>        MySearchRequest.AppID = <span
style="color:#A31515; ">**"Aldığınız AppID buraya
yazılacak."**</span></span>

Kodumuzun bu bölümünde arama servisimizi tanımlıyor sonra da arama
talebimize ait ana değişkenimizi tanımlayarak **AppID'mizi** atıyoruz.
**AppID** olarak yukarıda bahsettiğimiz Live web sitesinden almış
olduğunuz kendi AppID değerini yazmanız gerekiyor.

<span>        <span style="color:green; ">'Aranacak kaynaklar için talep
oluşturuyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySourceRequest(0)
<span style="color:blue; ">As</span> **SourceRequest**</span>\
 <span>        MySourceRequest(0) = <span
style="color:blue; ">New</span> **SourceRequest**</span>\
 <span>        <span style="color:green; ">'Kaç adet sonuç döneceğini
fonksiyondan gelen parametre belirliyor.</span></span>\
<span>        MySourceRequest(0).**Count** = Adet</span>\
 <span>        <span style="color:green; ">'Sadece web ortamını
arayacağız.</span></span>\
<span>        MySourceRequest(0).**Source** = SourceType.Web</span>\
 <span>        <span style="color:green; ">'Sonuçlardaki tüm bilgileri
ve kolonları alıyoruz.</span></span>\
<span>        MySourceRequest(0).**ResultFields** =
ResultFieldMask.All</span>\
 <span>        <span style="color:green; ">'Arama sorgumuzu
aktarıyoruz.</span></span>\
 <span>        MySearchRequest.**Query** =
**SorguYarat**(Aranan)</span>\
 <span>        <span style="color:green; ">'Talebimizi talep listesine
ekleyelim.</span></span>\
<span>        MySearchRequest.**Requests** = MySourceRequest</span>\
 <span>        <span style="color:green; ">'Aşağıdaki kültür bilgisini
isterseniz değiştirebilirsiniz.</span></span>\
 <span>        MySearchRequest.**CultureInfo** = <span
style="color:#A31515; ">"tr-TR"</span></span>

Bu bölüm biraz karışık gibi gözükebilir. Benim tavsiyem kod içerisine
yazdığım yorum satırlarını okuyarak ilerlemeniz. Önemli birkaç nokta
var. Bunlardan ilki **MySourceRequest(0).Count = Adet** tanımlamasında
yatıyor. Buraya verdiğimiz **Adet** değişkeni bizim fonksiyonumuza
parametre olarak verilen bir değişken olacak. Kabaca aradığımız bilgiye
dair kaç adet sonuç almak istediğimizi aktarıyoruz. Bir sonraki satırda
**web** içeriği aradığımızı özellikle belirtmemiz gerekiyor, malum Live
Search ile resim gibi farklı içerikler aratmak da mümkün.
**ResultFields** satırına geldiğimizde ise sonuçlara dair tüm bilgileri
istediğimizi belirtiyoruz. Belki bu noktada biraz optimizasyona
gidilerek kullanmayacağımız bilgileri istemeyebilirdik. **Query**
özelliğine geldiğimizde ise daha önce yaratmış olduğumuz **SorguYarat**
fonksiyonunu çalıştırarak sorgumuzu aramaya aktarıyoruz. Bu yapıda
aslında istersek birden çok arama yaratarak bir talep listesi olarak
topluca web servisine gönderebiliriz. Bizim örneğimizde aramaları tek
tek göndereceğiz. En son satırda da arama yaptıracağımız dilin kültür
bilgisini aktarıyoruz.

<span>        <span style="color:green; ">'Sıra geldi sonuçları
almaya.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchResponse
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> **SearchResponse**</span>\
 <span>        <span style="color:green; ">'Aramamızı gönderip sonuçları
alıyoruz.</span></span>\
<span>        MySearchResponse =
**MySearchEngine**.**Search**(MySearchRequest)</span>

Artık sıra geldi aramayı motora aktarmaya ve sonuçları almaya. Bir sonuç
değişkeni tanımlayarak önceden tanımladığımız arama motoru değişkenimiz
ile taleplerimizi XML web servisine gönderiyoruz.

<span>        <span style="color:green; ">'Sonuçlar arasında gezerek
kendi tablomuza aktaracağız.</span></span>\
<span>        <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> IncResponse <span
style="color:blue; ">As</span> **SourceResponse** <span
style="color:blue; ">In</span>
**MySearchResponse**.**Responses**</span>\
 <span>            <span style="color:blue; ">Dim</span> MyResults()
<span style="color:blue; ">As</span> **Result**</span>\
 <span>            MyResults = IncResponse.Results</span>\
<span> </span>\
<span>            <span style="color:blue; ">Dim</span> ResultRow <span
style="color:blue; ">As</span> DataRow</span>\
<span>            <span style="color:green; ">'Sonuç sayısı sıfırdan
yüksekse aktarmayı başlatalım.</span></span>\
<span>            <span style="color:blue; ">If</span>
IncResponse.Total \> 0 <span style="color:blue; ">Then</span></span>\
<span>                <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> MyResult <span
style="color:blue; ">As</span> **Result** <span
style="color:blue; ">In</span> **MyResults**</span>\
 <span>                    ResultRow = MyData.NewRow</span>\
<span>                    <span style="color:green; ">'Tek tek gelen
bilgileri kendi yarattığımız</span></span>\
<span>                    <span style="color:green; ">'tablomuza döngü
içerisinde satır satır ekliyoruz.</span></span>\
<span>                    ResultRow.Item(0) = MyResult.**Title**</span>\
 <span>                    ResultRow.Item(1) =
MyResult.**Description**</span>\
 <span>                    ResultRow.Item(2) =
MyResult.**DisplayUrl**</span>\
 <span>                    ResultRow.Item(3) = MyResult.**Url**</span>\
 <span>                    MyData.Rows.Add(ResultRow)</span>\
<span>                <span style="color:blue; ">Next</span></span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
<span>        <span style="color:blue; ">Next</span></span>

Gelen sonuçlar arasında bir **For Each** döngüsü ile dolaşırken bir
yandan da sonuçlardaki bilgileri kendi yarattığımız tablomuza satır
satır ekliyoruz. Tüm bu işlemler tamamlandıktan sonra fonksiyonumuz
tablomuzu geri döndürüyor olacak. Fonksiyonumuz tam kodu aşağıdaki
şekilde sonuçlanıyor.

<span>    <span style="color:blue; ">Function</span> Ara(<span
style="color:blue; ">ByVal</span> Aranan <span
style="color:blue; ">As</span> <span style="color:blue; ">String</span>,
<span style="color:blue; ">ByVal</span> Adet <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>) <span
style="color:blue; ">As</span> DataTable</span>\
 <span>        <span style="color:green; ">'Verileri depolayacağımız
sana tablomuzu oluşturuyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MyData <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
DataTable(<span style="color:#A31515; ">"Sonuclar"</span>)</span>\
<span>        <span style="color:green; ">'Tablomuza toplam dört kolon
ekleyeceğiz.</span></span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Baslik"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Açıklama"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Görünen URL"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"URL"</span>))</span>\
<span> </span>\
<span>        <span style="color:green; ">'Arama motorumuzu
tanımlıyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchEngine <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
MSNSearchService</span>\
<span>        <span style="color:green; ">'Arama talbeni değişkenimizi
yaratıyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchRequest
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> SearchRequest</span>\
 <span>        MySearchRequest.AppID = <span
style="color:#A31515; ">"Aldığınız AppID buraya
yazılacak."</span></span>\
 <span style="color:green; "> </span>\
<span>        <span style="color:green; ">'Aranacak kaynaklar için talep
oluşturuyoruz.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySourceRequest(0)
<span style="color:blue; ">As</span> SourceRequest</span>\
<span>        MySourceRequest(0) = <span style="color:blue; ">New</span>
SourceRequest</span>\
<span>        <span style="color:green; ">'Kaç adet sonuç döneceğini
fonksiyondan gelen parametre belirliyor.</span></span>\
<span>        MySourceRequest(0).Count = Adet</span>\
<span>        <span style="color:green; ">'Sadece web ortamını
arayacağız.</span></span>\
<span>        MySourceRequest(0).Source = SourceType.Web</span>\
<span>        <span style="color:green; ">'Sonuçlardaki tüm bilgileri ve
kolonları alıyoruz.</span></span>\
<span>        MySourceRequest(0).ResultFields =
ResultFieldMask.All</span>\
<span>        <span style="color:green; ">'Arama sorgumuzu
aktarıyoruz.</span></span>\
 <span>        MySearchRequest.Query = SorguYarat(Aranan)</span>\
 <span>        <span style="color:green; ">'Talebimizi talep listesine
ekleyelim.</span></span>\
<span>        MySearchRequest.Requests = MySourceRequest</span>\
<span>        <span style="color:green; ">'Aşağıdaki kültür bilgisini
isterseniz değiştirebilirsiniz.</span></span>\
<span>        MySearchRequest.CultureInfo = <span
style="color:#A31515; ">"en-US"</span></span>\
<span style="color:#A31515; "> </span>\
<span>        <span style="color:green; ">'Sıra geldi sonuçları
almaya.</span></span>\
<span>        <span style="color:blue; ">Dim</span> MySearchResponse
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> SearchResponse</span>\
<span>        <span style="color:green; ">'Aramamızı gönderip sonuçları
alıyoruz.</span></span>\
<span>        MySearchResponse =
MySearchEngine.Search(MySearchRequest)</span>\
<span> </span>\
<span>        <span style="color:green; ">'Sonuçlar arasında gezerek
kendi tablomuza aktaracağız.</span></span>\
<span>        <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> IncResponse <span
style="color:blue; ">As</span> SourceResponse <span
style="color:blue; ">In</span> MySearchResponse.Responses</span>\
<span>            <span style="color:blue; ">Dim</span> MyResults()
<span style="color:blue; ">As</span> Result</span>\
<span>            MyResults = IncResponse.Results</span>\
<span> </span>\
<span>            <span style="color:blue; ">Dim</span> ResultRow <span
style="color:blue; ">As</span> DataRow</span>\
<span>            <span style="color:green; ">'Sonuç sayısı sıfırdan
yüksekse aktarmayı başlatalım.</span></span>\
<span>            <span style="color:blue; ">If</span>
IncResponse.Total \> 0 <span style="color:blue; ">Then</span></span>\
<span>                <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> MyResult <span
style="color:blue; ">As</span> Result <span
style="color:blue; ">In</span> MyResults</span>\
<span>                    ResultRow = MyData.NewRow</span>\
<span>                    <span style="color:green; ">'Tek tek gelen
bilgileri kendi yarattığımız</span></span>\
<span>                    <span style="color:green; ">'tablomuza döngü
içerisinde satır satır ekliyoruz.</span></span>\
<span>                    ResultRow.Item(0) = MyResult.Title</span>\
<span>                    ResultRow.Item(1) =
MyResult.Description</span>\
<span>                    ResultRow.Item(2) =
MyResult.DisplayUrl</span>\
<span>                    ResultRow.Item(3) = MyResult.Url</span>\
<span>                    MyData.Rows.Add(ResultRow)</span>\
<span>                <span style="color:blue; ">Next</span></span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
<span>        <span style="color:blue; ">Next</span></span>\
<span>        <span style="color:green; ">'Tablomuzu geri
döndürüyoruz.</span></span>\
<span>        <span style="color:blue; ">Return</span> MyData</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>

Aslında Live Search arama motoru ile ilgili işlemlerimiz tamamlandı.
İsterseniz gelin şimdi hızlı bir şekilde yarattığımız fonksiyonu
kullanmak üzere bir web sayfası hazırlayalım. Sayfamıza tasarım endişesi
olmadan bir metin kutusu, arama işlemini başlatacak bir düğme ve bir de
arama sonuçlarını hemen gösterecek GridView ekleyeceğiz. Tüm bunları bir
**UpdatePanel** içerisine ekleyerek tüm sayfada AJAX kullanacağız.
Profesyonel çalışmalarda benim tavsiyem arama sonuçlarını göstermek için
**GridView** yerine güzel tasarlanmış bir **Repeater** kullanmanız ve
tüm sayfayı kapsayacak **UpdatePanel'lerden** olabildiğince kaçmanız.
Performans açısından pek anlamlı bir çözüm değil. Biz konumuza dönelim
ve hemen uygulamaya geçelim.

<span style="background:yellow; ">\<%</span><span
style="color:blue; ">@</span><span> <span
style="color:#A31515; ">Page</span> <span
style="color:red; ">Language</span><span
style="color:blue; ">="VB"</span> <span
style="color:red; ">AutoEventWireup</span><span
style="color:blue; ">="true"</span> <span
style="color:red; ">CodeFile</span><span
style="color:blue; ">="Default.aspx.vb"</span> <span
style="color:red; ">Inherits</span><span
style="color:blue; ">="\_Default"</span> <span
style="background:yellow; ">%\></span></span>\
 \
<span style="color:blue; ">\<!</span><span
style="color:#A31515; ">DOCTYPE</span><span> <span
style="color:red; ">html</span> <span style="color:red; ">PUBLIC</span>
<span style="color:blue; ">"-//W3C//DTD XHTML 1.1//EN"</span> <span
style="color:blue; ">"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"\></span></span>\
<span style="color:blue; ">\<</span><span
style="color:#A31515; ">html</span><span> <span
style="color:red; ">xmlns</span><span
style="color:blue; ">="http://www.w3.org/1999/xhtml"\></span></span>\
<span style="color:blue; ">\<</span><span
style="color:#A31515; ">head</span><span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>  <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span>  <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="UpdatePanel1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>          <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">TextBox</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="TextBox1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\>\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">TextBox</span><span
style="color:blue; ">\></span></span>\
<span>          <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Button1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span style="color:blue; ">="Ara"</span>
<span style="color:red; ">OnClick</span><span
style="color:blue; ">="Button1\_Click"</span> <span
style="color:blue; ">/\>\<</span><span style="color:#A31515; ">br</span>
<span style="color:blue; ">/\></span></span>\
<span>          <span style="color:blue; ">\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">GridView</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="GridView1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>          <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">GridView</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">ContentTemplate</span><span
style="color:blue; ">\></span></span>\
<span>      <span style="color:blue; ">\</</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">UpdatePanel</span><span
style="color:blue; ">\></span></span>\
<span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>  <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>

Sayfamızın HTML kodu yukarıdaki şekilde olacak. Sunucu tarafındaki
kodumuza baktığımızda ise hazırladığımız fonksiyonlar sayesinde aslında
arama işleminin ne kadar kolaylaştığını görüyor olacaksınız.

<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> Button1\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs)</span>\
<span>        GridView1.DataSource = **Ara**(TextBox1.Text, 10)</span>\
 <span>        GridView1.DataBind()</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>;

Gördüğünüz gibi yaptığımız tek şey hazırladığımzı **Ara** fonksiyonuna
aranacak metni ve kaç tane sonuç istediğimizi parametre olarak vermek.
Fonksiyon geriye bir **DataTable** döndüreceği için direk **GridView'a**
bağlayabiliyoruz.

Projemizin code-behind sayfasında kodların tamamı aşağıdaki şekilde
sonlanıyor.

<span style="color:blue; ">Imports</span><span> System.Data</span>\
<span style="color:blue; ">Imports</span><span>
com.msn.search.soap</span>\
<span> </span>\
<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Class</span> \_Default</span>\
<span>    <span style="color:blue; ">Inherits</span>
System.Web.UI.Page</span>\
<span> </span>\
<span>    <span style="color:blue; ">Function</span> SorguYarat(<span
style="color:blue; ">ByVal</span> Aranan) <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>        <span style="color:blue; ">Dim</span> Writer <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
System.Text.StringBuilder</span>\
<span>        Writer.Append(Aranan)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">"
("</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"yazgelistir.com"</span>)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">" OR
"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"nedirtv.com"</span>)</span>\
<span>        Writer.Append(<span style="color:#A31515; ">" OR
"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"site:"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">"microsoft.com.tr"</span>)</span>\
<span>        Writer.Append(<span
style="color:#A31515; ">")"</span>)</span>\
<span>        <span style="color:blue; ">Return</span>
Writer.ToString</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>\
<span style="color:blue; "> </span>\
 <span>    <span style="color:blue; ">Function</span> Ara(<span
style="color:blue; ">ByVal</span> Aranan <span
style="color:blue; ">As</span> <span style="color:blue; ">String</span>,
<span style="color:blue; ">ByVal</span> Adet <span
style="color:blue; ">As</span> <span
style="color:blue; ">Integer</span>) <span
style="color:blue; ">As</span> DataTable</span>\
 <span>        <span style="color:blue; ">Dim</span> MyData <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
DataTable(<span style="color:#A31515; ">"Sonuclar"</span>)</span>\
 <span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Baslik"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Açıklama"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"Görünen URL"</span>))</span>\
<span>        MyData.Columns.Add(<span style="color:blue; ">New</span>
DataColumn(<span style="color:#A31515; ">"URL"</span>))</span>\
 <span> </span>\
 <span>        <span style="color:blue; ">Dim</span> MySearchEngine
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> MSNSearchService</span>\
 <span>        <span style="color:blue; ">Dim</span> MySearchRequest
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> SearchRequest</span>\
 <span>        MySearchRequest.AppID = <span
style="color:#A31515; ">"Aldığınız AppID buraya
yazılacak."</span></span>\
 <span style="color:green; "> </span>\
 <span>        <span style="color:blue; ">Dim</span> MySourceRequest(0)
<span style="color:blue; ">As</span> SourceRequest</span>\
 <span>        MySourceRequest(0) = <span
style="color:blue; ">New</span> SourceRequest</span>\
 <span>        MySourceRequest(0).Count = Adet</span>\
 <span>        MySourceRequest(0).Source = SourceType.Web</span>\
 <span>        MySourceRequest(0).ResultFields =
ResultFieldMask.All</span>\
 <span>        MySearchRequest.Query = SorguYarat(Aranan)</span>\
 <span>        MySearchRequest.Requests = MySourceRequest</span>\
 <span>        MySearchRequest.CultureInfo = <span
style="color:#A31515; ">"en-US"</span></span>\
 <span style="color:#A31515; "> </span>\
 <span>        <span style="color:blue; ">Dim</span> MySearchResponse
<span style="color:blue; ">As</span> <span
style="color:blue; ">New</span> SearchResponse</span>\
 <span>        MySearchResponse =
MySearchEngine.Search(MySearchRequest)</span>\
 <span> </span>\
 <span>        <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> IncResponse <span
style="color:blue; ">As</span> SourceResponse <span
style="color:blue; ">In</span> MySearchResponse.Responses</span>\
<span>            <span style="color:blue; ">Dim</span> MyResults()
<span style="color:blue; ">As</span> Result</span>\
<span>            MyResults = IncResponse.Results</span>\
<span> </span>\
 <span>            <span style="color:blue; ">Dim</span> ResultRow <span
style="color:blue; ">As</span> DataRow</span>\
 <span>            <span style="color:blue; ">If</span>
IncResponse.Total \> 0 <span style="color:blue; ">Then</span></span>\
<span>                <span style="color:blue; ">For</span> <span
style="color:blue; ">Each</span> MyResult <span
style="color:blue; ">As</span> Result <span
style="color:blue; ">In</span> MyResults</span>\
 <span>                    ResultRow = MyData.NewRow</span>\
 <span>                    ResultRow.Item(0) = MyResult.Title</span>\
<span>                    ResultRow.Item(1) =
MyResult.Description</span>\
<span>                    ResultRow.Item(2) =
MyResult.DisplayUrl</span>\
<span>                    ResultRow.Item(3) = MyResult.Url</span>\
<span>                    MyData.Rows.Add(ResultRow)</span>\
<span>                <span style="color:blue; ">Next</span></span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
 <span>        <span style="color:blue; ">Next</span></span>\
 <span>        <span style="color:blue; ">Return</span> MyData</span>\
 <span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Function</span></span>\
 <span style="color:blue; "> </span>\
<span>    <span style="color:blue; ">Protected</span> <span
style="color:blue; ">Sub</span> Button1\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.EventArgs)</span>\
<span>        GridView1.DataSource = Ara(TextBox1.Text, 10)</span>\
<span>        GridView1.DataBind()</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; ">End</span><span> <span
style="color:blue; ">Class</span></span>

Hepinize kolay gelsin.


