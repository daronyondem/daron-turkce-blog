---
FallbackID: 2137
Title: ASP.NET AJAX 4.0 yollarında....
PublishDate: 7/28/2008
EntryID: ASP_NET_AJAX_4_0_yollarinda
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX
old.EntryID: 9840eb9e-f46a-47d1-8f8e-929871a26500
---
**ASP.NET 3.5** ile artık Framework'e dahil olan AJAX Extension
konusunda gelişmeler devam ediyor. **ASP.NET AJAX 4.0**'a ait
**Preview** sürümü download paketine aşağıdaki adresten ulaşabilirsiniz.
Unutmayın ki Preview (Önİzleme) sürümlerindeki özelliklerinin üretimde
kullanılması doğru olmaz ve bu özelliklerin gerçekten bir ürün olarak
Microsoft tarafından son sürümde yayınlanıp yayınlanmayacağını da kimse
garanti edemez.

<http://www.codeplex.com/aspnet/Release/ProjectReleases.aspx?ReleaseId=15511> 

**Peki ne gelişmeler var?**

Aslında şu an için gelişmelerin neredeyse hepsi istemci taraflı
uygulamalarla ilgili. Sunucu tarafına yeni bir ASP.NET kontrolü
gelmiyor. ASP.NET AJAX Features paketindeki sunucu kontrollerinin de
AJAX'ın bir sonraki sürümünde bulunacağı beklentiler arasında.

 İstemci tarafındaki yeniliklerden faydalanabilmek için yukarıdaki
adresten download paketini bilgisayarınıza indirdikten sonra hemen
**MicrosoftAjaxTemplates.js** dosyasını ASP.NET AJAX destekli bir
WebForm'un HTML kısmında include etmeniz yeterli olacaktır. Bunu ister
standart HTML komutları ile yapın ister sayfadaki ScriptManager'a bir
ScriptReference ekleyin, karar sizin.

**İstemci taraflı Template (Şablon) yapıları**

El yapımı AJAX yolculuklarımızda belki de en can sıkıcı noktalardan biri
sürekli istemci tarafında **for** döngüleri içerisinde DOM ile HTML
nesneleri yaratıp uygun verileri içlerine yerleştirip sayfada
konumlarını ayarlamaktır. Keşke sunucu tarafında Repeater gibi istemci
de bir şeyler olsa da biz bir şablon hazırlayıp datayı versek, binding
işlemini de kendisi yapsa? Ne güzel olurdu değil mi? Eh olsun o zaman :)

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span> <span
style="color: red;">ID</span><span
style="color: blue;">="ScriptManager1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">Scripts</span><span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptReference</span> <span
style="color: red;">Path</span><span
style="color: blue;">="MicrosoftAjaxTemplates.debug.js"</span> <span
style="color: blue;">/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">Scripts</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ScriptManager</span><span
style="color: blue;">\></span>

İlk önce yukarıdaki şekilde AJAX 4.0'ı sayfamıza ekleyelim. Ben
özellikle debug uzantılı dosyayı sayfama ekledim, böylece herhangi bir
hata oluştuğunda anlamlı açıklamalarla karşılaşacağız. Bu durumun
Web.Config'de Debug ayarı ile kısmen aynı olduğunu düşünebilirsiniz.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span style="color: blue;">="Sablon"</span>
<span style="color: red;">class</span><span
style="color: blue;">="sakla"\></span>

      Ürün Adı: <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: red;">value</span><span style="color: blue;">="{{
Adi }}"</span> <span style="color: blue;">/\></span><span
style="color: red;">&nbsp;</span>

      Fiyatı: <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: red;">value</span><span style="color: blue;">="{{
Fiyat + 'YTL' }}"/\></span><span style="color: red;">&nbsp;</span>

      <span style="color: green;">\<!--\* if (Fiyat\>5) { \*--\></span>

        Pahalıymış

      <span style="color: green;">\<!--\* } \*--\></span><span
style="color: blue;">\<</span><span style="color: #a31515;">br</span>
<span style="color: blue;">/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Bu da nesi? Karşınızda istemci tarafında şablonumuz. Bunu bir anlamda
sunucu taraflı ASP.NET Repeater kontrolünün ItemTemplate'ine
benzetebilirsiniz. Sablon adındaki DIV içerisine istediğiniz HTML
tasarımı yerleştirebilirsiniz. {{ ve }} işaretleri arasındaki komutlar
aslında birazdan verimizi bağlarken kullanacağımız veri kaynağımızda
Field'ler diyebiliriz.  Örneğin bizim veri kaynağımızda **Adi** ve
**Fiyat** adında iki özellik bulunacak. Kaynaktaki değerler {{ }}
işaretleri ile belirlenmiş yerlere otomatik olarak yerleştirilecek. {{
ve }} işaretleri arasında isterseniz ek JavaScript metodları da
kullanabilirsiniz.

      <span style="color: green;">\<!--\* if (Fiyat\>5) { \*--\></span>

        Pahalıymış

      <span style="color: green;">\<!--\* } \*--\></span><span
style="color: blue;">\<</span><span style="color: #a31515;">br</span>
<span style="color: blue;">/\></span>

Bu üst kısımda gördüğünüz JavaScript kodunu biraz farklı yazmamız
gerekti. {{ ve }} işaretleri arasında JavaScript komutları
kullanabiliriz demiştik fakat burada kullanacağımız JavaScript'in
kendisinde de { ve } işaretleri bulunuyor. İşte böyle durumlarda
**\<!--\*** ve **\*--\>** işaretlerini kullanmamız gerekiyor. Buradaki
**IF** kontrolü hedef verideki **Fiyat** değeri 5'ten büyük olunca
**Pahalıymış** yazılmasını sağlayacak.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">style</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"\></span>

        <span style="color: #a31515;">.sakla</span>

        {

            <span style="color: red;">visibility</span>:<span
style="color: blue;">hidden</span>;

            <span style="color: red;">display</span>:<span
style="color: blue;">none</span>;

        }

    <span style="color: blue;">\</</span><span
style="color: #a31515;">style</span><span style="color: blue;">\></span>

Yukarıdaki CSS sınıfını bizim şablonumuzu sayfada görünmez yapmak için
kullanıyoruz. Bunun haricinde sayfada iki şeye daha ihtiyacımız var.
Birincisi bir düğme! Düğmeye basıldığında bu şablon üzerinden nesneler
yaratılarak sayfaya yerleştirilecek. İkincisi ise şablondan yarattığımız
nesneleri sayfada yerleştireceğimiz bir HostElement.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">input</span> <span
style="color: red;">id</span><span style="color: blue;">="TIKLA"</span>
<span style="color: red;">type</span><span
style="color: blue;">="button"</span> <span
style="color: red;">value</span><span
style="color: blue;">="button"</span> <span
style="color: red;">onclick</span><span
style="color: blue;">="Yarat();"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="BURAYA"\>\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Düğmeye basıldığında **Yarat** adındaki bir JavaScript fonksiyonu
çalıştırılacak. **BURAYA** adını verdiğimiz HTML DIV içerisine şablondan
türetilen nesneler yerleştirilecek. Sıra geldi **Yarat** JavaScript
fonksiyonunu yazmaya.

    <span style="color: blue;">function</span> Yarat()

    {

        <span style="color: blue;">var</span> Sablonum = <span
style="color: blue;">new</span>
Sys.Preview.UI.Template.getTemplate(\$get(<span
style="color: #a31515;">"Sablon"</span>));

        Sablonum.createInstance(\$get(<span
style="color: #a31515;">"BURAYA"</span>), {Adi: <span
style="color: #a31515;">"XX"</span>, Fiyat: <span
style="color: #a31515;">"34"</span>});

        Sablonum.createInstance(\$get(<span
style="color: #a31515;">"BURAYA"</span>), {Adi: <span
style="color: #a31515;">"XX"</span>, Fiyat: <span
style="color: #a31515;">"2"</span>});

    }

Görüldüğü olay aslında çok kolay. İlk satırda **Sablonum** adında bir
değişkene **Sablon** üzerinden **Template** nesnesini yaratıyoruz.
**getTemplate** metoduna **\$ge**t ile sayfadaki şablonu içeren DIV
elementini vermemiz yeterli oluyor. Sonrasında bu şablon üzerinden yeni
nesneler üretmemiz gerek. Bunun için **createInstance** metodunu
kullanacağız. **createInstance** metodu toplamda iki parametre alıyor;
üretilen nesne nereye yerleştirilecek ve üretilirken hangi veri kaynağı
kullanılacak. İlk parametreye **\$get** ile sayfadaki DIV'i bulup
veriyoruz, ikinciye ise bir JSON verisi aktarıyoruz. Burada kolaylıkla
ASP.NET AJAX'daki PageMethodlardan dönen verilen de aktarılabilir.

![Daha kolay
olamazdı.](http://cdn.daron.yondem.com/assets/2137/28072008_1.png)\
*Daha kolay olamazdı.*

**Başka, başka?**

XML ile declarative programlama AJAX'ın yıllardan beri konuşulan
altyapılarından biri. İlk konuşulduğu şekli ile olmasa da ilginç bir
yapı ile karşımıza çıkması olası. Şu an için bu konularda örnekler yapıp
ilerlemek için biraz erken sayılabilir. DataView gibi bazı kontrollerin
istemci taraflı sürümlerinin framework'e dahil edilmesi bile dedikodular
arasında. Zamanla ufukta güneş açtıkça gelişmeleri tabi ki sizlerle
paylaşıyor olacağım. Şimdilik bu kadarı ile yetinmeye çalışalım ;)

Hepinize kolay gelsin.


