---
FallbackID: 2303
Title: "Silverlight 2.0 ve ADO.NET Data Services"
date: "2009-1-10"
EntryID: Silverlight_2_0_ve_ADO_NET_Data_Services
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0, ADO.NET Data Services
old.EntryID: 5d3bd419-4128-4f41-9c4f-a3cb6273b4a8
---
Silverlight 2.0 tarafında veritabanı erişimi için mecburen web
servisleri kullanmak zorundayız. Durum böyle olunca tek tek
veritabanındaki işlemler için ayrı web servisleri yazmak bir noktadan
sonra işkenceye dönüşebiliyor. Bugünlerde özellikle LINQ ve Entity
Framework ile beraber data layer'larımızda ciddi kolaylıklardan
faydalanabiliyoruz fakat web servisleri tarafında geldiğinde ise LINQ vs
ile gelen nesneleri geri döndüren web servislerini tek tek yazmak yine
can sıkıcı bir hal alıyor.

Aslında tüm bu sorunları çözebilecek bir altyapı .NET Framework
içerisinde artık mevcut. **ASP.NET Data Services** adını verdiğimiz
altyapı ile beraber bir veritabanına erişimi doğrudan REST üzerinden
yapabiliyorsunuz.

**Peki nasıl?**

İlk önce gelin ASP.NET Data Services sonuç olarak nasıl bir hizmet
yaratıyor ona bakalım. Bugün herhangi bir veritabanına farklı where
sorguları ile select'ler göndermek istesek bu sorgulardaki where
cümleciklerini parametreli hale getirmemiz ve bu parametreleri alarak
uygun datayı döndüren web servisleri yazmamız gerekiyor. Ancak bu
şekilde Silverlight ile veritabanına erişebiliyoruz. Farklı
senaryolardan eğer sorgularınızın filtreleme şekilleri değişirse bu
sefer tekrar gidip uygun web servisini yazmak zorunda kalıyorsunuz.
Başka bir seçenek olarak where cümleciklerini parametre alan bir servis
yazılabilir fakat bu pek güvenli bir manzara olmaz.

Tüm bu problemleri çözmek için ASP.NET Data Services ile sorgularınızı
yazabileceğiniz özel bir syntax geliyor ve artık URL üzerinden sorgu
gönderebiliyoruz.

http://localhost:4351/WebDataService1.svc/Uruns(2)

Örneğin yukarıdaki gibi bir adrese gittiğimizde veritabanındaki Uruns
tablosunda ID'si 2 olan ürünün bilgilerini XML olarak almış oluyoruz.

**[XML]**

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;">
</span><span style="color: red;">standalone</span><span
style="color: blue;">=</span>"<span
style="color: blue;">yes</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">entry</span><span style="color: blue;">
</span><span style="color: red;">xml:base</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:4351/WebDataService1.svc/</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:d</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/ado/2007/08/dataservices</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:m</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/ado/2007/08/dataservices/metadata</span>"<span
style="color: blue;"> </span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://www.w3.org/2005/Atom</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">id</span><span
style="color: blue;">\></span>http://localhost:4351/WebDataService1.svc/Uruns(2)<span
style="color: blue;">\</</span><span
style="color: #a31515;">id</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">title</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">text</span>"<span
style="color: blue;">\>\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">updated</span><span
style="color: blue;">\></span>2009-01-11T22:18:06Z<span
style="color: blue;">\</</span><span
style="color: #a31515;">updated</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">author</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">name</span><span style="color: blue;">
/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">author</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">link</span><span style="color: blue;">
</span><span style="color: red;">rel</span><span
style="color: blue;">=</span>"<span
style="color: blue;">edit</span>"<span style="color: blue;">
</span><span style="color: red;">title</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Urun</span>"<span style="color: blue;">
</span><span style="color: red;">href</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Uruns(2)</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">link</span><span style="color: blue;">
</span><span style="color: red;">rel</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/ado/2007/08/dataservices/related/Kategori</span>"<span
style="color: blue;"> </span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/atom+xml;type=entry</span>"<span
style="color: blue;"> </span><span style="color: red;">title</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Kategori</span>"<span style="color: blue;">
</span><span style="color: red;">href</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Uruns(2)/Kategori</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">category</span><span style="color: blue;">
</span><span style="color: red;">term</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**SilverlightApplication17.Web.Urun**</span>"<span
style="color: blue;"> </span><span
style="color: red;">scheme</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/ado/2007/08/dataservices/scheme</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">content</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/xml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">m:properties</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">d:ID</span><span style="color: blue;">
</span><span style="color: red;">m:type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Edm.Int32</span>"<span
style="color: blue;">\></span>2<span
style="color: blue;">\</</span><span
style="color: #a31515;">d:ID</span><span style="color: blue;">\></span>

<span style="color: blue;">      **\<**</span><span
style="color: #a31515;">**d:Adi**</span><span
style="color: blue;">**\>**</span>**Ürün2**<span
style="color: blue;">**\</**</span><span
style="color: #a31515;">**d:Adi**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      **\<**</span><span
style="color: #a31515;">**d:KategoriID**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**m:type**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Edm.Int32**</span>"<span
style="color: blue;">**\>**</span>1<span
style="color: blue;">**\</**</span><span
style="color: #a31515;">**d:KategoriID**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">m:properties</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">content</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">entry</span><span style="color: blue;">\></span>

Tahmin ettiğiniz üzere aslında bizim normal şartlarda yazdığımız web
servisleri de kısmen bu işi yapıyor. Yani bize XML ile istediğimiz
veriyi gönderiyoruz. Şimdi bir düşünelim, bu şekilde esnek olarak URL
üzerinden farklı sorgular gönderdiğimde bana istediğim veriyi XML ile
sanki web servisinden sonuç dönüyormuş gibi döndüren bir sistem aslında
benim Silverlight tarafından veritabanını sorgulamam için çok daha esnek
bir yapı olmaz mı? Her farklı sorgu için ayrı ayrı web servisleri
yazmaktan kurtulmaz mıyım? Evet :) amaç da zaten bu.

Tabi bu arada bir web servisinin çalışma şeklide ve sağladığı XML'lerin
snytax'ı ile buradaki biraz farklı. Konumuz dışında olsa da aradaki bu
farkın bilincinde olmakta fayda var.

**Yapalım şu işi...**

Gelin hızlı bir örnek ile ASP.NET Data Services yapısının kullanımını ve
Silverlight tarafındaki yansımalarını giriş seviyesine inceleyerek
ilerleyelim. İlk olarak yeni bir Silverlight projesi yaratıyor ve yanına
da güzel bir ASP.NET sitesi alıyoruz. ASP.NET sitemize hemen bir
**ADO.NET Data Service** dosyası eklememiz gerekiyor. Bunu ASP.NET
sitenize sağ tıklayarak "Add New Item" diyerek gelen pencereden uygun
dosyayı seçip yapabilirsiniz.

**[VB]**

<span style="color: blue;">Imports</span> System.Data.Services

<span style="color: blue;">Imports</span> System.Linq

<span style="color: blue;">Imports</span> System.ServiceModel.Web

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> WebDataService1

    <span style="color: blue;">Inherits</span> DataService(<span
style="color: blue;">Of</span> **DataClasses1DataContext**)

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Shared</span> <span style="color: blue;">Sub</span>
InitializeService(<span style="color: blue;">ByVal</span> config <span
style="color: blue;">As</span> IDataServiceConfiguration)

        config.SetEntitySetAccessRule(<span
style="color: #a31515;">**"\*"**</span>, EntitySetRights.AllRead)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

ADO.NET Data Service'i projenize eklediğinizde hemen karşınıza
yukarıdaki kodlar çıkacaktır. Koyu ile yazılı kısımları bizim elle
eklememiz gerekiyor. **DataClasses1DataContext** olarak adı geçen şey
aslında projemizdeki bir LINQ2SQL Classes dosyası. ADO.NET'in Data
Servisleri üzerinden hangi Entity'leri yayınlayacağını belirlememiz
gerek. Bu nedenle aslında bir data servisi yaratmadan önce ya LINQ2SQL
DBML dosyanızı hazırlamanız ya da Entity Framework tarafında
Entity'lerinizi hazırlamanız gerekiyor. Yazımızın konusu dışında olduğu
için işin bu kısmına şimdilik değinmeyeceğim. Önemli olan yarattığınız
bu veri kaynağının yukarıdaki şekilde Data Servisi'nize aktarmanız.

Bir sonraki adımda ise veri kaynağındaki hangi Entity'lere ne şekilde
erişim hakları vereceğiniz. Yani bu data servislerini kullanarak
insanlar sadece SELECT mi yapabilecek, yoksa Update veya Delete işlemi
de yapabilecekler mi ona karar vermemiz gerekiyor. Bu noktada güvenlik
açısından epey dikkatli olmak gerek. Ben şimdilik **AllRead** diyerek
sadece SELECT için veri kaynağındaki tüm tabloları \* işareti ile açtım.

**Silverlight tarafındaki maceralar.**

Servisimiz hazır olduğuna göre artık sıra geldi Silverlight tarafında bu
servisi kullanmaya. Başlangıç için normal bir web servisi kullanmaktan
pek farklı olmadığını söyleyebilirim. Silverlight projemize sağ
tıklayarak "Add Service Reference" diyoruz ve ADO.NET Data
Service'imizin SVC dosyasının adresini veriyoruz. Böylece gerekli
istemci taraflı proxy yaratılmış oluyor.

Her zamanki gibi veri kaynağımızı kullanmadan önce servis üzerinden bir
bağlantı kopyası almamız gerekecektir. Normal şartlarda Silverlight ile
SoapClient sınıflarından kopya alırken bu sefer doğrudan **DataContext**
alacağız.

**[VB]**

<span style="color: blue;">Dim</span> Veri <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.DataClasses1DataContext(<span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"http://localhost:4351/WebDataService1.svc/"</span>))

DataContext'imizi alırken servisimizin tam yolunu da parametre olarak
veriyoruz. Böylece artık bu servis üzerindeki tüm veriye ulaşabiliriz.
Sıra geldi sorgularımızı yazmaya. Silverlight tarafında web
servislerinin kullanımında da olduğu üzere tüm veri trafiğinin asenkron
ilerleyeceğini hatırlarsak aslında sorgularımızı gönderip sonrasında
ayrı bir event-listener ile sonucu alacağımızı da tahmin etmek zor
değil. ADO.NET Data Services sorgularının URL üzerinden farklı bir
syntax ile gittiğini görmüştük fakat elimizde bir DataContext olduğuna
göre geri gelen IQueryable nesneleri LINQ ile sorgulayabiliyor olmamız
gerekir. Söz konusu LINQ sorguları otomatik olarak Data Services
tarafına uygun şekilde çevrilerek gönderilecektir. Sözü daha fazla
uzatmadan kodumuzu inceleyelim.

**[VB]**

<span style="color: blue;">Dim</span> Sorgu <span
style="color: blue;">As</span>
System.Data.Services.Client.**DataServiceQuery**(<span
style="color: blue;">Of</span> ServiceReference1.**Urun**) = <span
style="color: blue;">From</span> gelenler <span
style="color: blue;">In</span> Veri.Uruns <span
style="color: blue;">Where</span> gelenler.ID = 2 <span
style="color: blue;">Select</span> gelenler

Sorgu.**BeginExecute**(<span style="color: blue;">New</span>
**AsyncCallback**(<span style="color: blue;">AddressOf</span>
**Geldi**), **Sorgu**)

**[C\#]**

            System.Data.Services.Client.<span
style="color: #2b91af;">DataServiceQuery</span>\<ServiceReference1.<span
style="color: #2b91af;">Urun</span>\> Sorgu =

                (System.Data.Services.Client.<span
style="color: #2b91af;">**DataServiceQuery**</span>\<ServiceReference1.<span
style="color: #2b91af;">Urun</span>\>)

                <span style="color: blue;">from</span> gelenler <span
style="color: blue;">in</span> Veri.Uruns <span
style="color: blue;">where</span> gelenler.ID == 2 <span
style="color: blue;">select</span> gelenler;

            Sorgu.**BeginExecute**(<span style="color: blue;">new</span>
<span style="color: #2b91af;"> **AsyncCallback**</span>(**Geldi**),
**Sorgu**);

Yukarıdaki kodlar bir sorgunun sunucu tarafına gönderilmesini sağlayacak
olan kodlar. Sorgumuzu ilk satırda standart LINQ sorgusu olarak
yazıyoruz fakat unutmayın ki burada bazı sınırlamalar var. ADO.NET Data
Services sorgularında tüm keyword'leri kullanmak mümkün olmuyor. O
nedenle eğer buradaki LINQ sorgularında Take vs gibi bazı keyword'leri
kullanırsanız Visual Studio hata verecektir.

Yazdığımız sorguyu bir **DataSerivceQuery** değişkenine eşitliyoruz ve
**Query** nesnemizi yaratırken de geriye ne tür bir nesne döneceğini
yine servis üzerinden gelen nesne tanımı ile belirtiyoruz. Artık
sorgumuz hazır olduğuna göre **BeginExecute** ile çalıştırabiliriz.
Fakat bu noktada da iki parametreye ihtiyacımız var; birincisi bu sorgu
tamamlandığında hangi event çalıştırılacak? Yani bir Callback lazım
bize. Asenkron bir **Callback** yaratarak ilerliyoruz. İkinci parametre
ise sorgunun kendisi. Böylece CallBack çalıştığında buradaki sorgunun
state'i de geri dönecek.

**[VB]**

<span style="color: blue;">Sub</span> Geldi(<span
style="color: blue;">ByVal</span> ar <span
style="color: blue;">As</span> IAsyncResult)

        <span style="color: blue;">Dim</span> Sorgu <span
style="color: blue;">As</span>
System.Data.Services.Client.DataServiceQuery(<span
style="color: blue;">Of</span> ServiceReference1.Urun) = ar.AsyncState

        <span style="color: blue;">Dim</span> result =
Sorgu.EndExecute(ar)

        MessageBox.Show(result.SingleOrDefault.Adi)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> Geldi(<span
style="color: #2b91af;">IAsyncResult</span> ar)

        {

            System.Data.Services.Client.<span
style="color: #2b91af;">DataServiceQuery</span>\<ServiceReference1.<span
style="color: #2b91af;">Urun</span>\> Sorgu =

                (System.Data.Services.Client.<span
style="color: #2b91af;">DataServiceQuery</span>\<ServiceReference1.<span
style="color: #2b91af;">Urun</span>\>)ar.AsyncState;

            <span style="color: blue;">var</span> result =
Sorgu.EndExecute(ar);

            <span
style="color: #2b91af;">MessageBox</span>.Show(result.SingleOrDefault().Adi);

        }

Geldi adındaki asenkron callback'imiz çalıştığında hemen kendisine
parametre olarak gelen **Result'ın** için **AsyncState** üzerinden
**Sorgu** değişkenimizi alıyoruz. Artık sorgu tamamlandığında göre
çalışma işlemini de sonlandırıp sonucu almak gerek. **EndExecute**
metoduna tekrar Callback'e gelen parametreyi verip sonucun bir değişkene
aktarılmasını sağlıyoruz ve aldığımız değişken üzerinden istediğimiz
veriye ulaşabiliyoruz.

**İşte bu kadar...**

Data Services yapısı ile Silverlight tarafındaki kodlamanın çok
kolaylaştığını söylemek pek doğru olmaz. Elimizde veriyi sağlayan hazır
bir web servisi olsaydı çok daha rahat bir kodlama ortamına sahip
olabilirdik fakat Data Services bize web servislerine dokunmadan tek bir
altyapıya bağlanarak istediğimiz sorguları çalışma zamanında oluşturma
şansı tanıyor. Tabi bu sorgular sadece SELECT sorguları olmak zorunda
değil, yeri geldiğinde Update, Delete ve Insert de yapabiliriz. Bu
makalemizde giriş seviyesinde kalacağımız için şimdilik diğer işlemlere
pek dokunmayacağız.

Hepinize kolay gelsin.


