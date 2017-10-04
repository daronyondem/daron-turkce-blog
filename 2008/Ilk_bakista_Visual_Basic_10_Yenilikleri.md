---
FallbackID: 2232
Title: İlk bakışta Visual Basic 10 Yenilikleri!
PublishDate: 31/10/2008
EntryID: Ilk_bakista_Visual_Basic_10_Yenilikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Basic 2010, Visual Basic .NET
old.EntryID: e978466e-e72e-4f66-b539-15012e528248
---
**Visual Studio 2010** ve **.NET Framework 4.0 CTP**'lerinin
yayınlandığı bugünlerde iki yol sonra karşımıza çıkacak yazılım
teknolojilerine yön verme ve inceleme adına heyecanlı günler yaşadığımı
itiraf edebilirim.

![Visual Studio 2008 ve .NET Framework 4.0 yeni
logoları.](media/Ilk_bakista_Visual_Basic_10_Yenilikleri/30102008_1.jpg)\
*Visual Studio 2008 ve .NET Framework 4.0 yeni logoları.*

Tüm bu yenilikler arasında tabi ki Visual Basic'in de artık 10'uncu
sürümü ile karşı karşıyayız. Bu yazıa şu an yayında olan CTP üzerinden
yola çıkarak VB 10 ile beraber gelen yenilikleri inceleyeceğiz.

**Statement Lambda**

Lambda'lara az çok LINQ ile beraber alışmıştık. VB 10 ile beraber çok
ilginç ve bir o kadar da güzel bir özellik geliyor. Ama gelin bunun
öncesinde VB 9 ile neler yapardık bir göz atalım.

**[VB9]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Form1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs)

        MsgBox(<span style="color: #a31515;">"Burada"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Form1\_Load(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">MyBase</span>.Load

        <span style="color: blue;">AddHandler</span> <span
style="color: blue;">Me</span>.Click, <span
style="color: blue;">AddressOf</span> Form1\_Click

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz gibi basit bir şekilde Form'un **Load** durumunda dinamik
olarak yine formun **Click** **event'ını** bir **Sub'a** bağlıyoruz.
Böylece artık forma tıklandığında "**Burada**" mesajı gösterilecek. Tüm
bunu yapmak için, yani dinamik **event** bağlamak için gidip ayrı bir
yerde **Sub** yazmamız ve sonra da **AddressOf** ile bağlamamız
gerekiyordu. Oysa artık satır için **Sub** var :)

**[VB10]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Form1\_Load(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">MyBase</span>.Load

        <span style="color: blue;">AddHandler</span> <span
style="color: blue;">Me</span>.Click, <span
style="color: blue;">Sub</span>()

                                                     MsgBox(<span
style="color: #a31515;">"Burada"</span>)

                                            <span
style="color: blue;">End</span> <span style="color: blue;">Sub</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Nasıl? Güzel değil mi? Satır içi Sub'ımızı yazdık bitti. Bu işlevselliği
**AddressOf'u** kullandığınız her yerde kullanabileceğinizi düşünürseniz
gerçekten süper! Peki ya Function'lar? İşte size satır içi Function
kullanımı.

**[VB10]**

        <span style="color: blue;">Dim</span> Fonksyon = <span
style="color: blue;">Function</span>(x <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>)

                           <span style="color: blue;">               
Return</span> x \* 2

                       <span style="color: blue;">           End</span>
<span style="color: blue;">Function</span>

        MsgBox(Fonksyon(2))

Yukarıdaki kod içerisinde doğrudan Function'ımızı kodun içinde satır içi
yazarak tanımlıyoruz ve sonrasında da rahatlıkla Invoke işlemini
gerçekleştirebiliyoruz.

**Coşmuş Type Inference**

Type Inference'a zaten alışkın durumdayız. VB10 ve VS10 ile beraber bir
adım daha ileriye gidiliyor. Örneğin aşağıdaki gibi bir değişken
tanımında değişkenin bir Array olduğunu veya ne Array'i olduğunu
belirtmenize gerek kalmıyor.

![Type Inference'ın bu kadarı
:)](media/Ilk_bakista_Visual_Basic_10_Yenilikleri/30102008_2.jpg)\
*Type Inference'ın bu kadarı :)*

Unutmayın bu şekilde tanımlamalar performans kaybına neden olmaz.
Compiler Compile Time'da gerekli kodları üretecektir.

**PLINQ**

Parallel LINQ aslında VB'ye özel bir konu değil fakat VS10 ve VB10 ile
beraber de geldiği için hızlıca bahsetmek istiyorum. Adından da
anlaşılacağı üzere PLINQ'de çalıştırılan sorguların kendi içlerinde
birden çok işlemcide çalıştırılmak üzere hazırlanmış durumdalar. Gelin
hemen aşağıdaki koda bir göz atalım.

**[VB10]**

<span style="color: blue;">       Dim</span> sayilar = {10, 20, 30, 40}

 

        <span style="color: blue;">Dim</span> XML = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Sayilar</span><span
style="color: #6464b9;">\></span>

                      <span
style="color: #555555; background: #fffebf;">       \<%=</span> <span
style="color: blue;">From</span> Inc <span
style="color: blue;">In</span> sayilar.**AsParallel**

                          <span style="color: blue;">           
Select</span> <span style="color: #6464b9;">\<</span><span
style="color: #844646;">Sayi</span><span
style="color: #6464b9;">\></span><span
style="color: #555555; background: #fffebf;">\<%=</span> Inc <span
style="color: #555555; background: #fffebf;">%\></span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Sayi</span><span
style="color: #6464b9;">\></span> <span
style="color: #555555; background: #fffebf;">%\></span>

                  <span style="color: #6464b9;">         \</</span><span
style="color: #844646;">Sayilar</span><span
style="color: #6464b9;">\></span>

**AsParallel** metodu otomatik olarak PLINQ kullanılmasını sağlıyor.
Normal şartlarda sırası ile 10, 20, 30, 40 sayılarını alırken bu şekilde
**AsParallel** olarak sorgumuzu çalıştırdığımızda 20, 10, 30, 40 gibi
bir sonuç elde ediyoruz. Bunun nedeni işlemin paralel bir şekilde
çalıştırıldıktan sonra sonucun bize döndürülüyor olması. Bu ufak detay
bile aslında PLINQ'in kullanılabileceği ve kullanılamayacağı noktalara
karar vermek için yeterli sayılabilir.

**Add metodunu defalarca kullanmaktan kurtulunu!**

Bu özelliğe başlık bulmakta zorlandığımı sanırım farkına vardınız.
Düşünün ki elimizde bir **List** var ve bu **List** içerisinde birden
çok **Item** eklememiz gerekiyor. Normal şartlarda her bir **Item'ı**
yaratarak tek tek **Add** metodunu çağırırdık.

**[VB9]**

<span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> <span
style="color: blue;">String</span>)

Liste.Add(<span style="color: #a31515;">"Ahmet"</span>)

Liste.Add(<span style="color: #a31515;">"Mehmet"</span>)

Peki VB10 tarafında neler yapabiliriz? Yeni bir Keyword'ümüz var :
**From**

**[VB10]**

 <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> <span
style="color: blue;">String</span>) <span
style="color: blue;">From</span> {<span
style="color: #a31515;">"Ahmet"</span>, <span
style="color: #a31515;">"Mehmet"</span>}

Aslında arka planda çalışan yapı doğrudan dizi içerisindeki bir **Item**
için **Add** metodunu çağırmaktan farklı değil. Örneğin elimizde özel
bir sınıfın listesi olsaydı aynı şekilde o sınıftan da objeler yaratarak
from ile listeye ekleyebilirdik.

**[VB10]**

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Adam) From {

            <span style="color: blue;">New</span> Adam() <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ahmet"</span>, .Soyadi = <span
style="color: #a31515;">"Hebe"</span>},

            <span style="color: blue;">New</span> Adam() <span
style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Mehmet"</span>, .Soyadi = <span
style="color: #a31515;">"Hebe"</span>}}

Örnek kodumuzdaki **List** bir **Adam** **List'i** olduğu için burada
önemli olan **List** sınıfının **Add** metodunun **Adam** tipinden
değişken istiyor olması. Sırasıyla yaratarak bir array olarak veriyoruz.
İsterseniz **Adam** tipinden **List'elerin** **Add** metoduna
**Overrides** keywordü ile bir alternatif eklemek için
**ExtensionMethod'ları** da kullanabilirsiniz.

**[VB9]**

<span style="color: blue;">Module</span> Module1

    \<Runtime.CompilerServices.Extension()\>

    <span style="color: blue;">Sub</span> Add(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
List(<span style="color: blue;">Of</span> Form1.Adam), <span
style="color: blue;">ByVal</span> Adi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>,
<span style="color: blue;">ByVal</span> soyadi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

        x.Add(<span style="color: blue;">New</span> Form1.Adam() <span
style="color: blue;">With</span> {.Adi = Adi, .Soyadi = soyadi})

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Module</span>

VB9'da tanıştığımız Extension Method'lardan bir adet tanımlayarak
**Adam** tipinden bir **Liste** oluşturulduğunda bu objelerin bir
**Add** metodlarının olacağını ve **Adi**, **Soyadi** olarak
**String'ler** alacağını tanımlıyoruz. Extension Method içerisinde de bu
bilgileri alıp yeni bir **Adam** yaratıp listeye ekliyoruz. Böylece
artık elimizdeki listeye **Adam** eklemek için **Add** metodunu
çağırırken iki adet String verip bir **Adam** eklenmesini de
sağlayabildik. Ama aslında bu **Add** metodunu da biz değil **From**
keyword'ü kullanacak.

**[VB10]**

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Adam) <span
style="color: blue;">From</span> {

            {<span style="color: #a31515;">"Ahmet"</span>, <span
style="color: #a31515;">"Hebe"</span>},

            {<span style="color: #a31515;">"Mehmet"</span>, <span
style="color: #a31515;">"Hebe"</span>}}

Böylece artık yukarıdaki kodumuzda doğrudan bilgileri vererek her
seferinde **New** ile obje yaratmadan da istediğimiz kadar **Adam**
ekleyebiliriz.

**Property tanımlamaları**

C\#'dan en çok kıskandığım özelliklerden biri **Get** ve **Set'lerin**
kısaltılmasıydı. Çoğu zaman **Property** tanımlarken aslında Get ve Set
kodlarını değiştirmiyoruz. Her ne kadar VS içerisinde kısa yolları
kullanarak bu kodları yazmıyor olsak da maalesef biz yazmamış olsak da
projemizdeki her satır kodun bir gün bir bug olarak karşımıza çıkma
ihtimali var :)

**[VB9]**

<span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Varsayılan"</span>

<span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

    <span style="color: blue;">Get</span>

        <span style="color: blue;">Return</span> PAdi

    <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

        PAdi = value

    <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

"Eskiden" kelimesini kullanmak için daha erken olsa da maalesef
Property'leri VB9'da yukarıdaki şekilde tanımlıyorduk.

**[VB10]**

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Varsayılan"</span>

Sanırım bu kodun üzerine daha fazla söz söylemeye gerek yok.

**Son sürpriz!**

Yukarıdaki kodlar dikkatinizi çekmediyse ufak bir ipucunda buluniyim.
Tek satırda yazılması gereken kodları çoklu satırlı olarak yazarken bir
değişiklik görebiliyor musunuz?

**[VB9]**

        <span style="color: blue;">Dim</span> Liste2 <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Adam) From { \_

            {<span style="color: #a31515;">"Ahmet"</span>, <span
style="color: #a31515;">"Hebe"</span>}, \_

            {<span style="color: #a31515;">"Mehmet"</span>, <span
style="color: #a31515;">"Hebe"</span>}}

**[VB10]**

        <span style="color: blue;">Dim</span> Liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> Adam) From {

            {<span style="color: #a31515;">"Ahmet"</span>, <span
style="color: #a31515;">"Hebe"</span>},

            {<span style="color: #a31515;">"Mehmet"</span>, <span
style="color: #a31515;">"Hebe"</span>}}

Benim sanırım en çok sevindiğim gelişmelerden biri bu oldu. Artık uzun
uzun tek satırda kod yazmak zorunda değiliz veya her satır atlamak
istediğimizde \_ alt çizgi ile alt satıra geçme zorunluluğu da yok!
C\#'dan en çok kıskandığım özelliklerden biri de buydu.

VB kolayın kullanımını arttırarak kuvvetli bir dil olarak var olma
yolunda tam gaz devam ediyor. Gelişmeler çok sevindirici. Bakalım 2010'a
kadar karşımıza çıkacak diğer CTP'lerde neler olacak.

Hepinize kolay gelsin.


