---
FallbackID: 1817
Title: Visual Studio 2008 ve Language Integrated Query
PublishDate: 10/20/2007
EntryID: Visual_Studio_2008_ve_Language_Integrated_Query
IsActive: True
Section: software
MinutesSpent: 0
Tags: LINQ, Visual Studio 2008
old.EntryID: 3828ccde-9e6e-48ef-8335-948d4e839521
---
Son zamanlarda özellikle **Silverlight**, **WPF** ve **Expression
Studio** ürün ailesi ile ilgili sizleri blogum ve webinerler aracılığı
ile bilgi bombardımanına tuttuğumun farkındayım :) Ama aslında her şey
bu kadarla bitmiyor. **Visual Studio 2008, Windows Server 2008, SQL
2008, ASP.NET 3.5** gibi daha bir sürü yeni ürün ve teknolojiye her gün
biraz daha yaklaşıyoruz. Ben bu yazımda özellikle **LINQ**'dan bahsetmek
istiyorum. Bunun nedeni bence Visual Studio 2008 ile beraber gelen en
önemli ve bize bir o kadar da yabancı olacak konulardan biri olması.

**LINQ (Language Integrated Query)**

Query dediğimizde aklımıza hemen SQL gelir, yani veritabanı sistemleri.
Kullandığımız hangi veritabanı sistemi olursa olsun bir sorgu (quary)
hazırlar ve veritabanı sunucusuna göndeririz. Geriye dönen veriye göre
programımız gerekli işlemleri yapmaya devam eder. LINQ dediğimiz sistem
ise herhangi bir veritabanı teknolojisi ile bire bir bağlantılı değil.
Daha açık dile getirmek gerekirse, LINQ SQL2008 ile veya başka bir
veritabanı sistemi ile beraber geliyor olmayacak. **LINQ** tamamen
**Visual Basic** veya **C\#** kodlarımızda kullanacağımız
"**sorguları**" tanımlıyor. Ve günün sorusu geliyor; *"Veritabanını
sorgulamayacaksak VB veya C\# içinde neyi sorgulayacağız?"* Biraz
düşünelim, bizim elimizde program kodlarını yazarken hangi veriler
oluyor? Tabi ki .NET objeleri. Sizi daha çok meraka ve sıkıntıya
sokmadan hemen bir örnek görelim.

    <span style="color: blue;">Dim</span> Sayilar() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= {5, 7, 1, 4, 9, 3, 2, 6, 8}

\

Yukarıdaki gibi bir dizimizin olduğunu varsayalım. Bu dizi içerisindeki
değerlerden sadece 5'ten ufak olanları küçükten büyüğe sıralayarak almak
için nasıl bir kod yazardınız? Aşağıdaki gibi bir kod yazamayacağımız
kesin.

    <span style="color: blue;">Dim</span> Bulunanlar = <span
style="color: blue;">From</span> n <span style="color: blue;">In</span>
Sayilar <span style="color: blue;">Select</span> n <span
style="color: blue;"> Where</span> n \<= 5 <span
style="color: blue;">Order By</span> n

    <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> n <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span> <span
style="color: blue;">In</span> Bulunanlar

        Response.Write(n)

    <span style="color: blue;">Next</span>

\

Muhteşem değil mi? LINQ ile ilk olarak sanırım bir yıl kadar önce
karşılaştım ve ilk tepkim *"Bu işin cılkı çıktı"* şeklindeydi :) Haklı
olarak bir an için yukarıdaki gibi SQL yazımına yakın bir kodu VB ile
yazabiliyor olmanın artık işimizi gereğinden fazla kolaylaştırdığını
düşündüm. Tabiri caiz ise artık .NET tarafında da verilerle oynamak
çocuk oyuncağı haline geliyor.

Aşağıdaki örnekte veritabanından veri çekmek yerine VB kodu ile bir
DataTable oluşturarak içerisinde üç satır bilgi yerleştirdim. Bakın
DataTable üzerine sorgu göndermek ne kadar kolay.

    <span style="color: blue;">Dim</span> tablom <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Data.DataTable

    tablom.Columns.Add(<span style="color: blue;">New</span>
Data.DataColumn(<span style="color: #a31515;">"Kolon1"</span>))

    <span style="color: blue;">Dim</span> satir <span
style="color: blue;">As</span> Data.DataRow = tablom.NewRow

    satir.Item(0) = <span style="color: #a31515;">"Deneme"</span>

    tablom.Rows.Add(satir)

    satir = tablom.NewRow

    satir.Item(0) = <span style="color: #a31515;">"Denek"</span>

    tablom.Rows.Add(satir)

    satir = tablom.NewRow

    satir.Item(0) = <span style="color: #a31515;">"Daron"</span>

    tablom.Rows.Add(satir)

 

    <span style="color: blue;">Dim</span> Bulunanlar = <span
style="color: blue;">From</span> n <span style="color: blue;">In</span>
tablom.Rows <span style="color: blue;">Where</span> n.item(0) <span
style="color: blue;">Like</span> <span
style="color: #a31515;">"\*D\*"</span> <span style="color: blue;">Order
By</span> n.item(0)

    <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> n <span style="color: blue;">As</span>
Data.DataRow <span style="color: blue;">In</span> Bulunanlar

        Response.Write(n.Item(0))

    <span style="color: blue;">Next</span>

\

Muhteşem. Ama bu kadarla kalmıyor gelişmeler. LINQ'nin birçok uygulanma
şekli var. LINQ2XML, LINQ2SQL, LINQ2Entity vs... Maalesef bunların
hepsinden bahsetmeyeceğim. Yukarıda incelediğimiz kısım LINQ2Entity veya
LINQ2Objects olarak adlandırılabilir. Şimdi bir de LINQ2XML ile ilgili
ufak bir örnek yapalım.

        <span style="color: blue;">Dim</span> Adam <span
style="color: blue;">As</span> XElement = \_

            <span style="color: blue;">\<</span><span
style="color:maroon;">Adam</span><span style="color: blue;">\></span>

                <span style="color: blue;">\<</span><span
style="color:maroon;">Adi</span><span
style="color: blue;">\></span><span
style="color: gray;">Daron</span><span
style="color: blue;">\<</span>/<span
style="color:maroon;">Adi</span><span style="color: blue;">\></span>

                <span style="color: blue;">\<</span><span
style="color:maroon;">Soyadi</span><span
style="color: blue;">\></span><span
style="color: gray;">Yöndem</span><span
style="color: blue;">\<</span>/<span
style="color:maroon;">Soyadi</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span>/<span
style="color:maroon;">Adam</span><span style="color: blue;">\></span>

 

        Response.Write(Adam.<span style="color: blue;">\<</span>Adi<span
style="color: blue;">\></span>.Value)

\

Hayatımızın çok kolaylaşacağı ortada. Yukarda gördüğümüz kodlar bize en
uzak seçenekte 6 ay mesafede. Peki şimdiden LINQ ile denemeler yapmak
için nelere ihtiyacınız var? Özet olarak Visual Studio 2008 diyebilirim.
Visual Studio 2008'e ait Beta2 sürümünü Microsoft web sitesinden
indirebilirsiniz. Hatta direk sanal makine imajları da mevcut,
bilgisayarınıza kurmadan direk sanal makineyi **Virtual PC** ile
çalıştırarak var olan sisteminizi etkilemeden denemeler yapabilirsiniz.
Tüm bu yazılımları ücretsiz indirmek için aşağıdaki linkleri
kullanabilirsiniz.

[Visual Studio 2008 Beta 2
Download](http://www.microsoft.com/downloads/details.aspx?FamilyId=B98A61BA-99B0-40B7-AB6E-5386A2B94217&displaylang=en)

[Virtual PC 2007
Download](http://www.microsoft.com/downloads/details.aspx?FamilyId=04D26402-3199-48A3-AFA2-2DC0B40A73B6&displaylang=en)

Beta 2 aşamasında olan bir ürünün parçası olarak şu an LINQ'yu üretim
amacıyla kullanmak pek mümkün değil. O nedenle önümüzdeki dönemde LINQ
ile ilgili detaylı yazılar yazmayacağım. Yazılarımı takip edenler
bilirler, her yeni çıkan teknoloji veya ürün bende küçük bir çocuğa
verilen oyuncaktan farksız etki yaratır.Yazımın başında da bahsettiğim
gibi zaten hali hazırda yeni "programcı oyuncakları" olarak elimizde
yepyeni Silverlight, Expression Studio duruyor. LINQ biraz bekleyebilir
:) 

Bu yazımda amacım sizlere geleceğe yönelik ufak bir öngörü aktarmaktı.
Hepinize kolay gelsin.


