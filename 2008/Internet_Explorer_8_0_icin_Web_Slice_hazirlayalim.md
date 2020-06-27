---
FallbackID: 2185
Title: "Internet Explorer 8.0 için Web Slice hazırlayalım."
date: "2008-9-14"
EntryID: Internet_Explorer_8_0_icin_Web_Slice_hazirlayalim
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: cc7cd7ab-96e7-484d-baf4-cd9b21bc7392
---
# Internet Explorer 8.0 için Web Slice hazırlayalım.
IE8.0 ile gelen ve biz web yazılım geliştiricilerin önümüzdeki dönemde
belki de en fazla uygulayacağımız yeniliklerden biri **Web Slice**
yapısı. Özellikle tasarımcılar için Expression Design ve Photoshop gibi
araçlardan tanıdık gelecek olan Slice mantığı ile birebir ayı mantıkla
bir uygulamadan bahsediyoruz. Kullanıcı hazırlamış olduğunuz web
sitesinin belirli bir bölümü keserek kendi tarayıcısının bir parçası
haline getiriyor. Tabi bu kesme işleminin nasıl yapılabileceği ve
sonucunun ne olacağı konusunda bire bir yazılımcılar olarak biz devreye
giriyoruz. Konuyu fazla uzatmadan ilk önce çalışan bir Web Slice
nasılmış onu inceleyelim.

**Web Slice nedir? ne değildir?**

Örnek olarak şu an yayında olan canlı bir siteyi inceleyelim. EBay'in IE
8 Beta 2 uyumlu sitesini [buradan](http://ie8.ebay.com/index.php)
inceleyebilirsiniz. Sitenin içerisinde ürünlerde bir aram
yaptırdığınızda arama sonucunda gelen listeden herhangi bir ürünün
üzerine fare ile gittiğinizde ürünün etrafında ilginç bir yeşil çerçeve
ve solunda da özel bir ikon beliriyor.

![Canlı bir WebSlice'a ait
ikon!](media/Internet_Explorer_8_0_icin_Web_Slice_hazirlayalim/13092008_1.png)\
*Canlı bir WebSlice'a ait ikon!*

Yukarıdaki resimde gördüğünüz yeşil ikona tıkladığımızda karşımıza
"*Subscripe to a Web Slice*" uyarısı çıkıyor. "Add" düğmesine basarak bu
Slice'ı IE 8.0'ın arayüzüne eklemiş oluyoruz.

![WebSlice'ımız artık IE 8.0 araç çubuğunda
duruyor.](media/Internet_Explorer_8_0_icin_Web_Slice_hazirlayalim/13092008_2.png)\
*WebSlice'ımız artık IE 8.0 araç çubuğunda duruyor.*

Biraz önce Web Slice'ını eklediğimiz ürünü artık IE 8.0 araç çubuğundan
takip edebiliyorum. Şu an için standart ayarlarda IE 2 saatlik
aralıklarla gidip bu Web Slice'ın yenilenip yenilenmediğini kontrol
edecek ve eğer yenilenmiş ise tarayıcının üst kısmında bu Web Slice
kalın yazılarla gözükecek. İsterseniz kontrol edilme süresini Web
Slice'a sağ tuş tıklayarak gelen menünden "Properties" komutunu vererek
siz de ayarlayabilirsiniz.

**Peki bu iş nasıl yapılıyor?**

İlk olarak hazırlamış olduğunuz web sitesinde nerelerin birer Web Slice
olacağına karar vermeniz gerekiyor. Web Slice olarak yerlere HTML
kodları içerisinde Microformats ile işaretlemeler yapıyoruz.
Microformats'ı bir HTML eklentisi gibi düşünebilirsiniz, HTML
elementlerine farklı anlamlar kazandırmak için kullanılan bir standart.
Buna bir örnek de XFN olabilir. Web Slice'lar da Microformats üzerinden
çalışıyorlar.

        <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">class</span><span
style="color: blue;">="**hslice**"</span> <span
style="color: red;">id</span><span
style="color: blue;">="urun1"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">class</span><span
style="color: blue;">="**entry-title item\_title**"\></span>

                ÜRÜN ADI

            <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">class</span><span
style="color: blue;">="**entry-content**"\></span>

                Ürünle ilgili özellikler

            <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">rel</span><span
style="color: blue;">="**feedurl**"</span> <span
style="color: red;">href</span><span
style="color: blue;">="/slicebilgi.ashx?ID=1"\>\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Yukarıda gördüğünüz HTML kodu bir WebSlice'ı tanımlıyor. Bu kod
içerisindeki tagların DIV olmalarının hiçbir önemi yok. Esas önemli
olanlar Microformat'lar yani class isimleri!

Bir WebSlice'ın oluşturulabilmesi için kesinlikle tüm WebSlice'ın bir
ana HTML elementi içerisinde yer alması gerekiyor. Bu HTML elementinin
class ismi olarak **hslice**'a sahip olması şart. Unutmayın bu isimlerde
CSS sınıfları tanımlayarak aynı anda bu classları görsel değişiklikler
için de kullanabilirsiniz fakat WebSlice'ın yapısının IE 8.0'ın
anlayabilmesi için classların isimlerinin değiştirilmemesi gerekir.
**hslice** olan ana elementin kesinlikle bir ID'ye sahip olması
gerekiyor, bu ID'nin standart HTML kuralları çerçevesinde sayfada tek
olması da şart.

Yukarıdaki örnek kodumuzu incelersek bir de **entry-title** CSS sınıfını
göreceksiniz. Bu şekilde işaretlenmiş bir elementin içerisinde metin
tarayıcı tarafından Web Slice'ın ismi olarak algılanacak ve kullanıcıya
da bu şekilde gösterilecektir. Ayrıca Web Slice'ın IE içerisinde araç
çubuğunda ilk gözüken kısmı da **entry-title**'dan alınır.

**entry-content** şeklinde işaretli kısımlar bu sayfadan kesilerek Web
Slice'ın tarayıcının araç çubuğundan ulaşılacak kısımlarını tanımlıyor.
Araç çubuğunda herhangi bir WebSlice'a tıklandığında sadece site
içerisinde bu WebSlice ile ilişkili olarak entry-content şeklinde
işaretli yerler alınarak gösterilecektir. Bunun haricinde isterseniz
WebSlice'ın araç çubuğundan gösterilecek kısmını farklı kaynaklardan da
alabilirsiniz. Örneğin harici bir RSS kaynağı kullanılabilir.

Örneğimizde içinde yazı olmayan bir link "a" tagı görüyorsunuz. Bu tag
kullanıcıya gösterilmeyecek fakat önemli olan bu tagın **rel**
özelliğinde **feedurl** değerini taşıması. Böylece WebSlice tarayıcıya
eklendiğinde tarayıcı WebSlice içerisinde gösterilecek veriyi
**entry-content** olarak ayarlanmış bölümlerden değil de doğrudan harici
bir RSS kaynağından alacak.

**RSS kaynağı nasıl ayarlanır?**

Eğer WebSlice içerisinden harici kaynak kullanılacaksa en mantıklısı bir
RSS kullanmak olacaktır. Tabi WebSlice'ın sayfa içindeki **rel**
özelliği **feedurl** olan adresin bu WebSlice'a özel olması şart. Yani
bizim örneğimizde 1 numaralı ürünle ilgili RSS kaynağının gelmesi için
slicebilgi.ashx dosyasına parametre olarak ürün ID'sini gönderiyoruz.
Söz konusu adresten çıkan RSS içerisinde ilk **item** nesnesi doğrudan
IE tarafından alınarak Web Slice içerisinde gösterilecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">rss</span> <span
style="color: red;">version</span><span
style="color: blue;">="2.0"\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">channel</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>WebSlice RSS<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">ttl</span><span
style="color: blue;">\></span>120<span
style="color: blue;">\</</span><span
style="color: #a31515;">ttl</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">item</span><span style="color: blue;">\></span>

      <span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>Ürün Bilgisi<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

      <span style="color: blue;">\<</span><span
style="color: #a31515;">description</span><span
style="color: blue;">\></span>HTML <span
style="color: red;">&lt;</span>b<span
style="color: red;">&gt;</span>kod<span
style="color: red;">&lt;</span>/b<span style="color: red;">&gt;</span>
gider<span style="color: blue;">\</</span><span
style="color: #a31515;">description</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">item</span><span style="color: blue;">\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">channel</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">rss</span><span style="color: blue;">\></span>

Yukarıdaki gibi basit bir RSS kaynağının Generic Handler(ASHX) üzerinden
aktarılıyor olması yeterli. ASHX'in arkasında VB veya C\# kodunuzda
gelen **ID** parametresine göre veritabanından veri alabilir ve uygun
içeriği üretebilirsiniz. **Item** tagları içerisinde **title** IE
içerisinde araç çubuğunda WebSlice'da gözükecektir. **Description**
içerisinde kod ise doğrudan Web Slice'ın içeriğini tanımlar.

Yukarıdaki gibi bir RSS'i rahatlıkla XLINQ ile yaratabilirsiniz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> ProcessRequest(<span
style="color: blue;">ByVal</span> context <span
style="color: blue;">As</span> HttpContext) <span
style="color: blue;">Implements</span> IHttpHandler.ProcessRequest

    context.Response.ContentType = <span
style="color: #a31515;">"text/xml"</span>

 

    <span style="color: blue;">Dim</span> RSS = <span
style="color: blue;">New</span> XDocument()

    RSS.Add(<span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"rss"</span>, <span
style="color: blue;">New</span> XAttribute(<span
style="color: #a31515;">"version"</span>, <span
style="color: #a31515;">"2.0"</span>), \_

               <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"channel"</span>, \_

                  <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"WebSlice RSS"</span>), \_

                  <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"ttl"</span>, <span
style="color: #a31515;">"120"</span>), \_

                  <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"item"</span>, \_

                    <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Ürün Bilgisi"</span> &
context.Request.QueryString(<span style="color: #a31515;">"id"</span>)),
\_

                    <span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"description"</span>, <span
style="color: #a31515;">"HTML \<b\>kod\</b\> gider"</span>)))))

    context.Response.Write(RSS.ToString())

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">void</span> ProcessRequest (HttpContext context) {

        context.Response.ContentType = <span
style="color: #a31515;">"text/xml"</span>;

 

        XDocument RSS = <span style="color: blue;">new</span>
XDocument();

        RSS.Add(<span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"rss"</span>,

            <span style="color: blue;">new</span> XAttribute(<span
style="color: #a31515;">"version"</span>, <span
style="color: #a31515;">"2.0"</span>),

            <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"channel"</span>,

                <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"WebSlice RSS"</span>),

                <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"ttl"</span>, <span
style="color: #a31515;">"120"</span>),

                <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"item"</span>,

                    <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"title"</span>, <span
style="color: #a31515;">"Ürün Bilgisi"</span> +
context.Request.QueryString[<span
style="color: #a31515;">"id"</span>].ToString()),

                    <span style="color: blue;">new</span> XElement(<span
style="color: #a31515;">"description"</span>, <span
style="color: #a31515;">"HTML \<b\>kod\</b\> gider"</span>)))));

        context.Response.Write(RSS.ToString());

    }

**İçerik kadar sürede bir yenilensin?**

Yazımın başında da bahsettiğim gibi kullanıcı WebSlice içeriğinin ne
kadar zamanda bir yenilenmesi gerektiğine karar verebiliyor. Fakat bunun
haricinde yazılımcı olarak bizim de TTL (Time To Live) değeri vererek
içeriğin ne kadar zamana kadar geçerli olduğunu belirtebiliyoruz. Hemen
bir önceki örneğimizdeki RSS kaynağındaki TTL değeri de dikkatinizi
çekmiştir. TTL değerleri dakika üzerinden verilir. İsterseniz
WebSlice'ın ana sayfadaki HTML kodunun içerisinde de Class adı **ttl**
olan bir tag içerisinde bu değeri yazabilirsiniz.

**Slice'lar var ama biraz kapalı kalsalar olmaz mı?**

HTML kodunuz içerisinde Slice'lar var fakat bir süreliğine veya belirli
bir sayfada IE'nin yeşil Slice çerçevelerini ve düğmelerini göstermesini
istemiyorsunuz. İşte bu durumda aşağıdaki Meta taglarını
kullanabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">meta</span> <span
style="color: red;">name</span><span
style="color: blue;">="slice"</span> <span
style="color: red;">scheme</span><span style="color: blue;">="IE"</span>
<span style="color: red;">content</span><span
style="color: blue;">="off"</span> <span style="color: blue;">/\></span>

Yeşil düğmeler ortadan kaybolsa da Slice'lar çalışmaya devam eder ve
kullanıcılar isterlerse IE içerisinde Slice menüsünden tüm Slice'ları
görebilir. Ayrıca sayfadaki Slice'ları istemci tarafında dinamik olarak
yaratıyorsanız veya değiştiriyorsanız IE'nin Slice Discovery'sini
yenilemek ve Slice menüsündeki Slice listesinin güncellenmesini sağlamak
için aşağıdaki JavaScript komutunu çağırabilirsiniz.

window.external.contentDiscoveryReset()

**Slice ekleme düğmelerinin tasarımını değiştirilir mi?**

Slice'ların hepsi kendi özel yeşil düğmeleri ile eklenebilse de bu yeşil
düğmeleri yukarıdaki taktik ile kapattığınızda kendi düğmeleriniz ile
Slice'ları ekletmek isteyebilirsiniz. Bunun için özel olarak
kullanabileceğimiz bir JavaScript komutu yer alıyor.

window.external.addToFavoritesBar('http://sliceburada.com',
'SliceTitleBurada', 'slice')

Yukarıdaki JavaScript metoduna verdiğimiz üç parametreden ilki doğrudan
Slice'ın HTML **hslice** kodlarının bulunduğu adresin ta kendisi. İkinci
parametre sayfadaki hangi Slice'ı istediğimizi belirten Slice'ın **ID**
bilgisi. Son olarak eklenecek öğenin tipini de **slice** olarak
belirtiyoruz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-9-14 tarihinde yayinlanmistir.*
