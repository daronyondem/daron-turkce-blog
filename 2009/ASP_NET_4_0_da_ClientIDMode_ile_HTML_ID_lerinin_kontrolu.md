# ASP.NET 4.0'da ClientIDMode ile HTML ID'lerinin kontrolü.
ASP.NET'te en sevmediğim özelliklerden biri yaratılan HTML kodu
üzerindeki kontrolün pek de mümkün olmaması. Aslında bu sevmediğim
özellik ASP.NET'in işimizi bu kadar kolaylaştırabilmesini sağlayan en
önemli altyapısı ile ilişkili. Fakat derdime çare arayacak olsam aslında
tam olarak da yaratılan HTML kontrollerinin ID'lerine takıldığımı
söyleyebilirim. Boyumu aşan ID'leri kontrol edememek bir de bu ID'lere
JavaScript ile ulaşmak zorunda kalmak ölümcül bir deneyim!

**Neden bahsediyorsun?**

Bahsettiğim şey aslında basit bir Repeater bile olabilir. Örneğin
sayfanıza bir Repeater yerleştirdiniz ve içinde de çok basit bir Label
bulunuyor. Aslında tek yapmak istediğiniz elinizdeki ürünlerin
isimlerini listelemek diyelim. Bu durumda kabaca kullanacağınız Repeater
yapısı aşağıdaki gibi olacaktır.

**[ASP.NET]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">repeater</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Label</span>
<span style="color: red;">ID</span><span
style="color: blue;">="lbl\_UrunAdi"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span style="color: blue;">='</span><span
style="background: #ffee62;">\<%</span>\# Eval("Adi") <span
style="background: #ffee62;">%\></span><span
style="color: blue;">'\>\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">repeater</span><span
style="color: blue;">\></span>

Peki bu ASP.NET kodu çalıştığında ortaya HTML olarak ne çıkacak
dersiniz? Gelin aşağıdaki HTML'i beraber inceleyelim.

 **[HTML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl00\_lbl\_UrunAdi"\></span>Örnek1<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl01\_lbl\_UrunAdi"\></span>Örnek2<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl02\_lbl\_UrunAdi"\></span>Örnek3<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl03\_lbl\_UrunAdi"\></span>Örnek4<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl04\_lbl\_UrunAdi"\></span>Örnek5<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl05\_lbl\_UrunAdi"\></span>Örnek6<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl06\_lbl\_UrunAdi"\></span>Örnek7<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl07\_lbl\_UrunAdi"\></span>Örnek8<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl08\_lbl\_UrunAdi"\></span>Örnek9<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_ctl09\_lbl\_UrunAdi"\></span>Örnek10<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

Yukarıdaki kodda da gördüğünüz üzere her bir Label / Span tagının ayrı
bir ID'si var. Zaten olması gereken de bu, çünkü bir sayfada ancak aynı
ID'den bir adet bulunabilir. Fakat ASP.NET'in bu farklı ID'leri
yaratırken izlediği yol biraz farklı. İlk olarak container elementin adı
alınıyor sonra ctl ile başlayan satır Index numarası kullanılıyor sonra
da içerideki orijinal kontrolün adı ekleniyor ve ortaya kocaman bir ID
çıkıyor. Bu ID'lerin her birini üç karakterlik isimlere kısaltmış olsak
ciddi miktarda web sitesi trafiğini de azaltmış olacağız. Hadi trafiği
geçtik bu Label'lardan birine JavaScript ile ulaşmak isterseniz ne
yapacaksınız? Eminim çoğunuzun dinamik JavaScript kodları yarattığı ve
içlerine sunucu tarafından istedikleri kontrollerin ClientID'lerini
koydukları günler vardı. Geçmiş zamanla konuşuyorum çünkü ASP.NET 4.0
ile bu sistem değişiyor.

![Hoş geldin
ClientIDMode!](media/ASP_NET_4_0_da_ClientIDMode_ile_HTML_ID_lerinin_kontrolu/13092009_1.gif)\
*Hoş geldin ClientIDMode!*

Artık kontrol başına **ClientIDMode** belirleyerek söz konusu kontrolün
istemci taraflı ID'sinin ne şekilde yaratılacağını kontrol edebiliyoruz.
Peki ClientIDMode için gelen seçenekler nelerdir?

**AutoID:** Herşey eskisi gibi devam eder.\
 **Inherit:** Bir üst kontrolde bu özellik nasıl ayarlanmış ise aynısı
alt kontrolde de geçerli olur.\
**Predictable:** Eski ID'lere benzeye fakat şekli şemali kontrol
edilebilir ID yapıları oluşturulmasını sağlar. Bu yapı daha fazla
DataBound kontrollerin içi için kullanılır.\
**Static:** Söz konusu kontrolün sunucu tarafındaki ID'si ne ise istemci
tarafındaki da bire bir aynı olur. Bu noktada bir sayfa içerisinde aynı
ID'nin tekrar kullanılmaması sizin sorumluluğunuzdadır. Özellikle
Repeater gibi yapıların içinde kullanımı tehlikeli olabilir.

**Static**

Eğer herhangi bir kontrolün ClientIDMode'unu Static olarak ayarlarsanız
sunucu tarafındaki ID doğrudan istemciye gönderilecektir. Örneğin bir
üstteki Repeater içerisindeki Label'ın ClientIDMode özelliğini Static
yaparsak alacağımız sonuç aşağıdaki gibi olur.

**[HTML]**

 <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek1<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek2<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek3<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek4<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek5<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek6<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek7<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek8<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek9<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="lbl\_UrunAdi"\></span>Örnek10<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

Gördüğünüz gibi tüm Span tagları aynı ID özelliğine sahip. Bu durum tabi
ki tehlikeli çünkü bu durumda bir JavaScript ile bu kontrollerin
hiçbirini bulamayız. Zaten durum kurallara aykırı fakat yaptığımız hata
basit. **Static** modu kesinlikle DataBound kontrollerin içerisindeki
kontrollerde kullanılmamalı. DataBound kontroller hariç sayfada tekil
kullandığınız kontroller için rahatlıkla Static modunu
kullanabilirsiniz.

**Predictable**

Databound kontrollerin içi için kullanılabilecek en anlamlı çözüm
Predictable modudur. Bu modda varsayılan ayarları ile ilk önce container
elementin ismi alınır sonra iç elementin ismi alınır ve en sona da Index
numarası yerleştirilir. Yine en üstteki Repeater örneğimizi ele alalım
ve **Repeater'ın** **ClientIDMode** özelliğini aşağıdaki gibi
Predictable şeklinde düzenleyelim.

**[ASP.NET]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Repeater</span> <span
style="color: red;">ID</span><span
style="color: blue;">="Repeater1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span style="color: red;">
**ClientIDMode**</span><span
style="color: blue;">**="Predictable"**\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Label</span>
<span style="color: red;">ID</span><span
style="color: blue;">="lbl\_UrunAdi"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span style="color: blue;">='</span><span
style="background: #ffee62;">\<%</span>\# Eval("Adi") <span
style="background: #ffee62;">%\></span><span
style="color: blue;">'\>\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Repeater</span><span
style="color: blue;">\></span>

Kodumuzu çalıştırdığımız aldığımız HTML sonucu aşağıdaki şekilde
olacaktır.

 <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_lbl\_UrunAdi\_0"\></span>Örnek1<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_lbl\_UrunAdi\_1"\></span>Örnek2<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_lbl\_UrunAdi\_2"\></span>Örnek3<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="Repeater1\_lbl\_UrunAdi\_3"\></span>Örnek4<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

Gördüğünüz gibi en azından bildiğim isimler kullanılmış ve ana
repeater'in isminin yanına label'ın ismi sonra da Index numarası
yerleştirilmiş. Bu noktada maalesef Repeater ve Label'a verdiğimiz
isimlerin uzunlukları da önem kazanıyor.

Predictable modunda kullanabileceğiniz bir diğer özellik ise
**ClientIDRowSuffix** özelliği. Fakat maalesef bu özelliği sadece
DataKey koleysiyonları tutan kontrollerde kullanabilirsiniz. Örneğin bir
GridView bunun için uygun olacaktır.

**[ASP.NET]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">gridview</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">autogeneratecolumns</span><span
style="color: blue;">="false"</span> <span style="color: red;">
**clientidmode**</span><span
style="color: blue;">**="Predictable"**</span>

**   ** <span style="color: red;"> **clientidrowsuffix**</span><span
style="color: blue;">**="ID"**\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">Columns</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TemplateField</span> <span
style="color: red;">HeaderText</span><span
style="color: blue;">="ID"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span style="color: #a31515;">Label</span>
<span style="color: red;">ID</span><span
style="color: blue;">="lbl\_Adi"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span style="color: blue;">='</span><span
style="background: #ffee62;">\<%</span>\# Eval("Adi") <span
style="background: #ffee62;">%\></span><span
style="color: blue;">'</span> <span style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">ItemTemplate</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TemplateField</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">Columns</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">gridview</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz GridView'ın **ClientIDRowSuffix** özelliğine ID
değeri verilmiş. Böylece yaratılan ID'lerin sonunda artık Index numarası
değil doğrudan veritabanından gelen ID değeri yerleştirilecek.

**[HTML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">table</span> <span
style="color: red;">cellspacing</span><span
style="color: blue;">="0"</span> <span
style="color: red;">rules</span><span style="color: blue;">="all"</span>
<span style="color: red;">border</span><span
style="color: blue;">="1"</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid"</span> <span
style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">border-collapse</span>: <span
style="color: blue;">collapse</span>;<span
style="color: blue;">"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">th</span> <span
style="color: red;">scope</span><span
style="color: blue;">="col"\></span>

            ID

        <span style="color: blue;">\</</span><span
style="color: #a31515;">th</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid\_lbl\_Adi\_3"\></span>Örnek1<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid\_lbl\_Adi\_4"\></span>Örnek2<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid\_lbl\_Adi\_5"\></span>Örnek3<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">span</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirGrid\_lbl\_Adi\_6"\></span>Örnek4<span
style="color: blue;">\</</span><span
style="color: #a31515;">span</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">td</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">tr</span><span style="color: blue;">\></span>

Hemen kodumuzdaki Label'ların ID'lerine bakarsak Grid'in adını, sonra
Label'ın adını ve en sonunda da ID değerlerini görebiliyoruz. Malum ID
değerlerin kayıtların sırası ile aynı olmayabilirler. Bu gibi bir teknik
ile kontrollerin ID'leri set edildiğinde JavaScript ile veritabanından
gelen değerlere göre sayfada uygun kontrolleri bulmak da çok daha
kolaylaşıyor.

**Başka nasıl ayarlanır?**

Eğer isterseniz **ClientIDMode** özelliğini projelerinde sayfa bazında
veya uygulama bazında da ayarlayabilirsiniz.

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span style="color: #a31515;">Page</span>
<span style="color: red;">Language</span><span
style="color: blue;">="VB"</span> <span
style="color: red;">AutoEventWireup</span><span
style="color: blue;">="false"</span> <span style="color: red;">
**ClientIDMode**</span><span style="color: blue;">**="Static"**</span>
<span style="color: red;">CodeFile</span><span
style="color: blue;">="Default.aspx.vb"</span> <span
style="color: red;">Inherits</span><span
style="color: blue;">="\_Default"</span> <span
style="background: #ffee62;">%\></span>

Yukarıdaki şekli ile bir sayfada ClientIDMode ayarlamak tüm sayfa için
geçerli olmasını sağlayacaktır. Ayrıca uygulama bazında da Web.Config
içerisinde gerekli ayarı yapabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">pages</span> <span
style="color: red;">clientIdMode</span><span
style="color: blue;">="Predictable"\>\</</span><span
style="color: #a31515;">pages</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-9-14 tarihinde yayinlanmistir.*
