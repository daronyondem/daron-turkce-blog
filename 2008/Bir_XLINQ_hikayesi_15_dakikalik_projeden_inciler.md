---
FallbackID: 1973
Title: Bir XLINQ hikayesi... 15 dakikalık projeden inciler.
PublishDate: 1/3/2008
EntryID: Bir_XLINQ_hikayesi_15_dakikalik_projeden_inciler
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, LINQ, ASP.NET
old.EntryID: cf67faed-f400-4400-99fa-6d14e8f6cb0c
---
Dün verdiğim sözü tutmanın zamanı geldi. Sizlerle kodlarını paylaştığım
mini projenin içerisindeki önemli birkaç noktayı öne çekerek mini bir
XLINQ ve VB şovu yapmak istiyorum :) Üzgünüm C\# cılar **.Element** veya
**.Elements** gibi metodlarla uğraşmak zorunda kalacaklar ve benim güzel
VB'mi bırakarak ek metotlar kullanmaya niyetim yok :) Ayrıca paylaştığım
proje de VB ile yazılmış durumda o nedenle bu yazı da full VB olacak.
<span style="color: #808080">(Sektörde benim kadar agresif C\#'a
saldıran yok :) Allah sonumu hayır etsin:) Bu arada C\#'ı severim yani
ama herkes yerinde sağ olsun ;))</span>

Kodlara geçmeden önce gelin projenin kullandığı XML dosyalarının
yapısına bir göz atalım.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">Olay</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Tag</span><span
style="color: blue;">\></span>223257<span
style="color: blue;">\</</span><span
style="color: #a31515;">Tag</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Icerik</span><span
style="color: blue;">\></span>1112567<span
style="color: blue;">\</</span><span
style="color: #a31515;">Icerik</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Katilimci</span><span
style="color: blue;">\></span>0<span
style="color: blue;">\</</span><span
style="color: #a31515;">Katilimci</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Katilan</span><span style="color: blue;">
</span><span style="color: red;">Adi</span><span
style="color: blue;">=</span>"<span style="color: #0000FF">Ercan Altuğ
Yılmaz</span>"<span style="color: blue;"> </span><span
style="color: red;">Mail</span><span style="color: blue;">=</span>"<span
style="color: #0000FF">hebele@gubele.com</span>"<span
style="color: blue;"> </span><span style="color: red;">Tel</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0900900900:)</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Katilan</span><span style="color: blue;">
</span><span style="color: red;">Adi</span><span
style="color: blue;">=</span>"<span style="color: blue;">İbrahim
Demir</span>"<span style="color: blue;"> </span><span
style="color: red;">Mail</span><span style="color: blue;">=</span>"<span
style="color: blue;">hebele@gubele.com</span>"<span
style="color: blue;"> </span><span style="color: red;">Tel</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0900900900</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Olay</span><span style="color: blue;">\></span>

Projedeki her bir aktivite için aktivitenin **TAG** ozelliği ile aynı
isme sahip bir XML dosyası oluşturuluyor. Ayrıca **TAG** bilgisi neden
dosyanın içerisine de kaydetmişim bilmiyorum :) Şimdi kodumu okurken
saçma olduğunu gördüm. Neyse gece yarısı aceleyle herhangi bir planlama
olmadan kod yazılırsa böyle olur :) Yukarıdaki gibi yaratacağımız XML
dosyalarında **Olay** kök elementinin içerisinde **Icerik** kısmına söz
konusu aktivite ile ilgili açıklamaları içerecek olan HTML kodları
yerleştirilecek. Maksimum katılımcı sayısı **Katilimci** tagları arasına
yazılacak. Sonrasında aktiviteye kayıt olan herkesin bilgisi **Katilan**
taglarındaki gibi bu dosyaya eklenecek.

**kayit.aspx**

Bu dosyayı herhangi bir kaydı göstermek veya düzenlemek için
kullanacağız. Eğer bu dosyaya herhangi bir aktivitenin tag bilgisi adres
üzerinden **?tag=aktivite** şeklinde aktarılmış ise söz konusu
aktivitenin bilgileri gelecek ve sonrasında değiştirilebilecek. Aksi
halde yeni bir aktivite yaratılacak. Önemli olan birinci nokta yeni bir
aktivite için yeni bir XML dosyası yaratarak içerisine gerekli bilgileri
ekleyebilmek.

<span style="color: blue;">Dim</span> Belge <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
**XDocument**

<span style="color: blue;">Dim</span> root <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
**XElement**(<span style="color: #a31515;">"Olay"</span>)

root.Add(<span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"Tag"</span>, TextBox2.Text))

root.Add(<span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"Icerik"</span>, TextBox1.Text))

root.Add(<span style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"Katilimci"</span>, TextBox3.Text))

Belge.Add(root)

Belge.**Save**(Server.MapPath(<span
style="color: #a31515;">"App\_Data"</span>) & <span
style="color: #a31515;">"\\"</span> & TextBox2.Text & <span
style="color: #a31515;">".xml"</span>)

Yukarıdaki kodda bir **XDocument** yaratarak içerisine **XElement'ler**
ekliyoruz. Elementleri eklerken isterseniz değerlerini de ikinci
parametre olarak verebiliyorsunuz. Son olarak da **XDocument'ın**
**Save** metodu ile dosyayı kaydediyoruz. Olay aslında bu kadar basit.
Kullanıcının kutulara girdiği metinleri herhangi bir kontrolden
geçirmiyoruz, çünkü birincisi yönetim panelindeyiz. Yani güvenli bir
yerdeyiz, ikincisi bu projede buna zamanımız yok :D Ama aklınızda olsun
halka açık sitelerde böyle girişleri **script injection** için kontrol
etmek gerek.

Peki var olan bir dosyayı okuyup ekranda nasıl gösteririz?

<span style="color: blue;">Dim</span> Belge =
XDocument.Load(Server.MapPath(<span
style="color: #a31515;">"App\_Data"</span>) & <span
style="color: #a31515;">"\\"</span> & Request.QueryString(<span
style="color: #a31515;">"tag"</span>) & <span
style="color: #a31515;">".xml"</span>)

TextBox2.Text = Belge.<span style="color: #6464b9;">\<</span>Olay<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Tag<span
style="color: #6464b9;">\></span>.Value

TextBox3.Text = Belge.<span style="color: #6464b9;">\<</span>Olay<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Katilimci<span
style="color: #6464b9;">\></span>.Value

TextBox1.Text = Belge.<span style="color: #6464b9;">\<</span>Olay<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Icerik<span
style="color: #6464b9;">\></span>.Value

 

GridView1.DataSource = <span style="color: blue;">From</span> Gelenler
<span style="color: blue;">In</span> Belge.<span
style="color: #6464b9;">\<</span>Olay<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Katilan<span
style="color: #6464b9;">\></span> <span
style="color: blue;">Select</span> Gelenler.<span
style="color: #6464b9;">@</span>Adi, Gelenler.<span
style="color: #6464b9;">@</span>Mail, Gelenler.<span
style="color: #6464b9;">@</span>Tel

GridView1.DataBind()

İlk satırda gördüğünüz üzere **XDocument** sınıfının **Load** metodu ile
dosyamızı okuyarak **Belge** değişkenine aktarıyoruz. Bu noktada
özellikle VB ile ilgili late-binding olayından bahsetmek istiyorum.
Dikkatinizi çektiyse **Belge** değişkenini tanımlarken herhangi bir
değişken tipi belirtmedim. Bu durum kod çalışırken run-time esnasında
değişkenin tipi belli olacak şeklinde çalışmıyor. Eğer böyle çalışsaydı
yıllar önceki VB'deki performans kaybını yaşamış olurduk. Tam tersine
biz bu kodumuzda **Belge** değişkeninin tipini belirtmesek de compiler
bunu algılayarak gerekli tanımlamaları yapacaktır. Zaten yukarıdaki
manzarada bile Visual Studio içerisinde **Belge** değişkeninin üzerine
fare ile geldiğimizde değişkenin tipinin algılandığını görebiliyoruz.
Buradan yola çıkıp "*hiçbir değişkenin tipini tanımlamayın*" diye bir
şey söylemiyorum, bu büyük bir hata olur fakat tipi belli bir şey için
de uğraşmaya gerek yok :)<span style="color: #808080"> (VB'cilerdeki bu
tembellik nedir ya :D)</span>

**GridView** ile ilgili kısma geçerken bu Grid'in ne işe yarayacağını
baştan söyliyeyim. Tüm kolonları otomatik yaratılmak üzere ayarlanmış
bir Grid olarak bu arkadaşımızın görevi aktiviteye kayıt olanların
bilgilerini göstermek. Bunun için doğrudan Belge değişkenimize bir LINQ
sorgusu göndererek istediğimiz bilgileri kolonlar şeklinde alıyoruz. Ne
kadar kolay değil mi?

**default.aspx**

Proje içerisinde değinmek istediğim bir diğer dosya da ana kayıt
sayfası. Bu sayfada ilk olarak söz konusu aktiviteye kayıt olan kişi
sayısını bularak maksimum sayının altında olup olmadığını kontrol
etmemiz gerekiyor. Yani XML dosyası içerisinde **Katilan** taglarını
saymamız gerek.

<span style="color: blue;">If</span> **Belge.**<span
style="color: #6464b9;">**\<**</span>**Olay**<span
style="color: #6464b9;">**\>**</span>.<span
style="color: #6464b9;">**\<**</span>**Katilimci**<span
style="color: #6464b9;">**\>**</span>**.Value** \<= **Belge.**<span
style="color: #6464b9;">**\<**</span>**Olay**<span
style="color: #6464b9;">**\>**</span>.<span
style="color: #6464b9;">**\<**</span>**Katilan**<span
style="color: #6464b9;">**\>**</span>**.Count** <span
style="color: blue;">And</span> Belge.<span
style="color: #6464b9;">\<</span>Olay<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Katilimci<span
style="color: #6464b9;">\></span>.Value \<\> 0 <span
style="color: blue;">Then</span>

Label1.Text = <span style="color: #a31515;">"Aktivite için maksimum
kayıt sayısına ulaşıldı. Üzgünüz, bir dahakine."</span>

kayittablo.Visible = <span style="color: blue;">False</span>

<span style="color: blue;">Else</span>

Belge değişkenimize XML dosyasını yükledikten sonra doğrudan **Olay'ın**
**Katilimci** değerinden maksimum katılımcı sayısını alabiliyoruz. O ana
kadar toplam kaç kişinin kayıt olduğunu, yani **Katilan** taglarının
sayısını da doğrudan **Count** metodu ile alabiliyoruz. XLINQ cidden
süper bir şey, eskiden ömür tüketirdi bu işler.

<span style="color: blue;">Dim</span> Belge =
XDocument.Load(Server.MapPath(<span
style="color: #a31515;">"App\_Data"</span>) & <span
style="color: #a31515;">"\\"</span> & Request.QueryString(<span
style="color: #a31515;">"event"</span>) & <span
style="color: #a31515;">".xml"</span>)

Belge.<span style="color: #6464b9;">\<</span>**Olay**<span
style="color: #6464b9;">**\>**</span>.**SingleOrDefault**.Add(<span
style="color: blue;">New</span> XElement(<span
style="color: #a31515;">"Katilan"</span>, <span style="color: blue;">
**New**</span> **XAttribute(**<span
style="color: #a31515;">**"Adi"**</span>**, TextBox1.Text)**, <span
style="color: blue;">New</span> XAttribute(<span
style="color: #a31515;">"Mail"</span>, TextBox2.Text), <span
style="color: blue;">New</span> XAttribute(<span
style="color: #a31515;">"Tel"</span>, TextBox3.Text)))

Belge.Save(Server.MapPath(<span
style="color: #a31515;">"App\_Data"</span>) & <span
style="color: #a31515;">"\\"</span> & Request.QueryString(<span
style="color: #a31515;">"event"</span>) & <span
style="color: #a31515;">".xml"</span>)

Son olarak gelelim kayıt olan ziyaretçinin bilgilerini XML dosyasına
eklemeye. XML dosyasını okuyarak içerisinde **Olay** kök elementini
buluyoruz. Normalde elementler liste olarak döndürüldüğü için bizim bu
listeyi tek bir elemente çevirmemiz lazım. **Olay** elementinin zaten
XML dosyasında bir adet olabileceğini biz biliyoruz, çünkü kök element.
O nedenle **Olay'ı** yakaladıktan sonra .**SingleOrDefault** diyerek
bunu tek bir element olarak alıyoruz ve içerisine **Katilan** elementi
ekliyoruz. **Katilan** elementini **XElement** olarak yaratırken birinci
parametrede elementin adını verdikten sonra istediğiniz kadar başka
**XElement'ler** veya **XAttribute'ler** ekleyebilirsiniz. Bizde
katılımcının adı, telefonu ve maili yeterli olacak. Son olarak dosyayı
diske kaydediyoruz.

**XLINQ ile XML uygulamaları "bebelere balon" kıvamında!**

Eski günlerde olsak yukarıdaki işlemleri yapabilmek için XSLT, XPATH
bilmenin yanı sıra bolca da XML okuma ve yazma için kod yazmanız
gerekirdi. Oysa bugün iş gerçekten çocuk oyuncağı da olmanın ötesinde
"*bebelere balon*" kıvamına gelmiş durumda. Umarım bu projeyi sizlerle
paylaşmam XLINQ'nun kullanımı ile ilgili ufak da olsa bir fikir verip bu
dünyaya giriş yapmanıza yardımcı olur.

Hepinize kolay gelsin.


