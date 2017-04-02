---
FallbackID: 2213
Title: ASP.NET'te Dynamic Data Web Site yapısına giriş.
PublishDate: 10/12/2008
EntryID: ASP_NET_te_Dynamic_Data_Web_Site_yapisina_giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, ASP.NET
old.EntryID: a562c8ca-165a-41ba-b82b-0996aa8ea267
---
ASP.NET tarafında programlama yaparken çoğu zaman yaptığımız işlemlerin
veya kullanıcılara sağlamaya çalıştığımız ortamında sadece CRUD (Create,
Read, Update, Delete) operasyonlarını yapmakla yükümlü olduğunu farkına
bile varmayız. Aslında tüm yaptığımız sürekli farklı toplolar için
INSERT, UPDATE, DELETE işlemlerini yapan sayfalar, arayüzler ve kodlar
yaratmaktır. Bazen bu kodların tabloların niteliğine göre biraz değişir
bazen de tablolar arası ilişkiler nedeniyle ek filtrelemeler koymamız
gerekir. Fakat özünde baktığımızda işin büyük kısmı ve sürekli tekrar
etmekten bir programcı olarak genelde sıkıldığımız kısmı klasik CRUD
işlemleridir.

İşte tam da bu noktada bizim sorunumuzu çözecek olarak yapı .NET
Framework 3.5 SP1 ile beraber artık Visual Studio'nun içerisinde:
**ASP.NET Dynamic Data Web Site**!

**Önce bir hazırlanalım!**

Nesne Tabanlı Tasarım mimarisinin mantığına tamamen aykırı olsa da
maalesef çoğu projede hala öncelikle veritabanı tasarımını yaparak
ilerliyoruz. Bu kötü bir alışkanlık gibi gözükse de ufak projelerde çok
sorun yaratmayacağını öngörebiliriz. Dynamic Data Web Site mantığında da
önce elinizde hazır bir veritabanı olması şart. Bunun için hemen hızlı
bir şekilde SQL 2008'de örnek bir veri tabanı yaratacağız.

![Örneğimizdeki veritabanının
tasarımı.](http://cdn.daron.yondem.com/assets/2213/11102008_1.png)\
*Örneğimizdeki veritabanının tasarımı.*

Veritabanımızı yukarıdaki şemaya göre yarattıktan sonra artık hemen bu
veritabanını kontrol edecek olan web sitesini yaratmak üzere Visual
Studio tarafına geçebiliriz.

**Yeni bir Dynamic Web Site!**

Visual Studio içerisinde "File / New Web Site" menüsüne ufak bir
yolculuk yaparsak karşımıza seçenekler arasında bir de "**Dynamic Data
Web Site**"ın geldiğini göreceğiz. Hemen bu seçeneği işaretleyerek yeni
web sitemizi yaratalım.

Projenizi yarattıktan sonra "Solution Explorer" içerisinde gördüğünüz
farklı klasör ve dosyalar aklınızı karıştırmasın. Bu konulara ileriki
makalelerde detaylı olarak değineceğiz. Şu an için önemli olan hemen web
sitemizi veritabanı ile ilişkilendirerek ayağa kaldırıp sonuca ulaşmak.

Dynamic Data Web Site'ın veritabanına ulaşması için Entity Framework
kullanabileceğiniz gibi rahatlıkla LINQ2SQL sınıflarından da
faydalanabilirsiniz. Biz örneğimizde LINQ2SQL kullanacağız. Bu nedenle
hemen yeni bir DBML dosyasını projemize ekliyoruz ve veritabanımızdan
"Kategoriler" ve "Ürünler" tablolarını DBML dosyasına taşıyoruz.

*LINQ2SQL'in detayların bu yazıda girmeyeceğim, merak edenler bu
konudaki detayları "*[*LINQ2SQL'e
Giriş*](http://daron.yondem.com/tr/post/83ec9383-266e-4556-bce6-9cfa3f497c7e)*"
yazımdan edinebilirler.*

Artık LINQ2SQL sınıflarımız da hazır olduğuna göre geriye sadece tek bir
nokta kalıyor; Dynamic Data Web Site'ı LINQ2SQL sınıflarımız ile
haberleştirmek. Bu işlemi yapabilmemiz için gerekli kod aslında hazır
bir şekilde projenin Global.asax dosyasında duruyor.

    <span style="color: green;">'                    IMPORTANT: DATA
MODEL REGISTRATION </span>

    <span style="color: green;">' Uncomment this line to register LINQ
to SQL classes or an ADO.NET Entity Data</span>

    <span style="color: green;">' model for ASP.NET Dynamic Data. Set
ScaffoldAllTables = true only if you are sure </span>

    <span style="color: green;">' that you want all tables in the data
model to support a scaffold (i.e. templates) </span>

    <span style="color: green;">' view. To control scaffolding for
individual tables, create a partial class for </span>

    <span style="color: green;">' the table and apply the
[Scaffold(true)] attribute to the partial class.</span>

    <span style="color: green;">' Note: Make sure that you change
"YourDataContextType" to the name of the data context</span>

    <span style="color: green;">' class in your application.</span>

    <span style="color: green;">'
model.RegisterContext(GetType(YourDataContextType), New
ContextConfiguration() With {.ScaffoldAllTables = False})</span>

Yukarıdaki gibi tamamen pasif hale getirilmiş bir paragraf yazı ve bir
satır kod Global.asax'ın en başında yer alıyor. Bizim için önemli olan
en alttaki kod satırı tabi ki. Bu satırı aktif hale getirerek
**YouDataContextType'ın** yerine kendi DBML dosyamızın DataContext'ini
atamamız gerek. Sonrasında da **ScaffoldAllTables** özelliğini **False**
değerinden **True'ye** çevirmeliyiz.

**[VB]**

model.RegisterContext(<span
style="color: blue;">GetType</span>(DataClassesDataContext), <span
style="color: blue;">New</span> ContextConfiguration() <span
style="color: blue;">With</span> {.ScaffoldAllTables = <span
style="color: blue;">True</span>})

**[C\#]**

model.RegisterContext(<span style="color: blue;">typeof</span>(<span
style="color: #2b91af;">DataClassesDataContext</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">ContextConfiguration</span>() {
ScaffoldAllTables = <span style="color: blue;">true</span> });

Son olarak yukarıdaki kod işimizi görecektir. Burada özellikle
açıklanması gereken nokta sanırım ScaffoldAllTables özelliği. Bu özellik
sayesinde Dynamic Data Web Site hedef veritabanındaki (Şu anda sadece
LINQ2SQL'in sağladığı tablolar) tüm tablolara ulaşarak gerekli CRUD
işlemlerinin yapılabilmesini sağlayacaktır. Bu işlemin yapılıp
yapılmayacağına isterseniz tablo bazında da karar verebilirsiniz, fakat
bunun detaylarına daha ileride gireceğiz.

Şimdi son değişikliklerle beraber Global.asax dosyamızı da kaydedelim ve
projemizi çalıştıralım :)

![Dynamic Data Web Site'ın ilk
görünümü.](http://cdn.daron.yondem.com/assets/2213/11102008_2.png)\
*Dynamic Data Web Site'ın ilk görünümü.*

Gördüğünüz gibi site çalıştığında anda kendisine bağlı tüm tabloları
hemen listeledi. Şimdi hızlıca bir Kategorilers sayfasına yönelelim.
Unutmadan, buradaki isimlerin LINQ2SQL'deki nesne isimleri olduklarını
hatırlamakta fayda var, isterseniz bu isimleri LINQ2SQL tarafından
rahatlıkla değiştirebilirsiniz, başka seçenekler de var ama onları da
ileride inceleyeceğiz.

![Kategoriler tablosu
listeleniyor.](http://cdn.daron.yondem.com/assets/2213/11102008_3.png)\
*Kategoriler tablosu listeleniyor.*

Benim daha önce veritabanına girişini yaptığın birkaç veriyi yukarıdaki
ekranda görebilirsiniz. Gördüğünüz gibi otomatik olarak tüm bu
kategoriler için Edit / Delete ve Details bölümleri açılmış.
Kategoriler'in Aciklama özellikleri burada gösterilmemiş ve Details
bölümü ile gidilen sayfaya saklanmış. Daha da güzeli her kategorinin
yanına bir "View Urunlers" linki konarak bu kategorideki ürünlerin
görülebileceği sayfaya birer de link konmuş. Eh gönül daha ne ister?

![Ürünler'in gösterildiği Dynamic Data
Sayfası](http://cdn.daron.yondem.com/assets/2213/11102008_4.png)\
*Ürünler'in gösterildiği Dynamic Data Sayfası*

Ürünlerin gösterildiği sayfaya gittiğimizde ise otomatik olarak
Kategoriler'in bir DropDownList'e dönüştüğünü ve filtreleme amaçlı
olarak kullanılabildiğini görüyoruz. Ayrıca burada da hem yeni ürün
ekleme amaçlı hem de düzenleme için gerekli tüm detaylar hazırlanmış.

![Ürünler'imizin detaylarını düzenleyebileceğimiz sayfalar da
hazır.](http://cdn.daron.yondem.com/assets/2213/11102008_5.png)\
*Ürünler'imizin detaylarını düzenleyebileceğimiz sayfalar da hazır.*

Herhangi bir ürüne ait Edit linkine tıkladığımızda gittiğimiz sayfada
Urunler tablosundaki her bir Field'e uygun şekilde gerekli görsel
öğelerin yaratıldığını görebiliyoruz. Veritabanına NText olarak
düzenlediğimiz yerler MultiLine TextBox'lar haline gelirken
kategorilerimiz de bir DropDownList haline gelmiş.

Tabi ki bu web sitesi bu şekilde kullanılabileceği gibi
özelleştirmelerin gerekeceği de kesin. Sonraki Dynamic Data ile ilgili
yazılarımda özelleştirmelerle ilgili detayların yanı sıra arka plandaki
mekanizmaları da inceleyeceğiz.

Hepinize kolay gelsin.


