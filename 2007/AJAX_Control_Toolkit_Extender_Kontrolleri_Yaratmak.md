---
FallbackID: 1769
Title: "AJAX Control Toolkit Extender Kontrolleri Yaratmak"
date: "2007-8-31"
EntryID: AJAX_Control_Toolkit_Extender_Kontrolleri_Yaratmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX
old.EntryID: a0f4e711-88be-49d1-aaed-957b844b78ae
---
# AJAX Control Toolkit Extender Kontrolleri Yaratmak
ASP.NET AJAX Extension kullandığımız web sitelerinde bize büyük kolaylık
sağlayan **AJAX Control Toolkit** içerisindeki kontroller gibi
**Extender** kontrolleri geliştirmek isterseniz tek yapmanız gereken
okumaya devam etmek. :) Peki bu gibi kontrolleri hazırlayabilmek için
nelere ihtiyacımız olacak? Eğer web sitesi geliştirmek için **Visual Web
Developer Express** kullanıyorsanız maalesef ek olarak **Visual Basic
2005 Express Edition** veya **Visual C\# 2005 Express Edition**'ın da
bilgisayarınızda yüklü olması gerekiyor. Kontrolümüzü geliştirme işini
maalesef Visual Web Developer içerisinde yapamıyoruz. Eğer **Visual
Studio 2005** kullanıyorsanız herhangi bir sorun yaşamazsınız. Visual
Studio içerisinde yaratmış olduğunuz herhangi bir web sitesini açarak
File / Add / New Project menüsünden **ASP.NET AJAX Control Project**
seçeneğini seçerek var olan **Solution** paketine **extender** kontrol
projenizi ekleyebilirsiniz. Eğer **Express** sürümü geliştiricileri
kullanıyorsanız kontrolü geliştirmek ve kullanmak için yukarıda
bahsettiğim gibi farklı araçları kullanmanız gerekiyor. Ben makale
boyunca Visual Studio 2005 kullanacağım.

![AJAX Control Project
yaratıyoruz...](media/AJAX_Control_Toolkit_Extender_Kontrolleri_Yaratmak/31082007_1.png)\
 *Kendi AJAX Control projemizi yaratıyoruz.*

Yaratacağımız örnek **Extender** kontrolünün adı **SayacDugme** olacak.
Kontrolün amacı kendisine atanan bir metin kutusuna yazı yazıldıkça
yazının uzunluğunu yine kendisine atanan bir düğmenin metnine eklemek.
Genelde bu tarz uygulamalar web sitelerinde iletişim formlarında
görülebiliyor. Aslına bakarsanız en uygun örnek cep telefonlarımızda
yazdığımız SMSler. Telefonumuzda yazı yazdıkça kaç karakter yazdığımız
bir köşede gösterilir. Bizim de oluşturacağımız **Extender** karakter
sayısını alarak kendisine atanan bir düğmenin üzerine yazacak.

![SayacDugme Extender projemizi Solution Explorer içerisinde
görebiliyoruz.](media/AJAX_Control_Toolkit_Extender_Kontrolleri_Yaratmak/31082007_2.png)\
*SayacDugme Extender projemizi Solution Explorer içerisinde
görebiliyoruz.*

Extender kontrolümüz yaratıldığında oluşturulan dosyalar arasından ilk
olarak **SayacDugmeExtender.vb** dosyası üzerinde çalışıyor olacağız.
Dosya içerisinde hazır olarak gelen **TargetControlType** özelliğinin
kontrol tipini aşağıdaki şekilde **TextBox** olarak değiştirmemiz
gerekiyor. Her bir **Extender** kontrolünün otomatik olarak bir
**TargetControlID** özelliği oluyor. Bizim **Extender** kontrolümüzde bu
özelliğe atanacak kontrolün **TextBox** tipinde olması şart.

<span>    \<TargetControlType(<span
style="color:blue; ">GetType</span>(**TextBox**))\> \_</span>

Sıra geldi **TargetControlID** gibi ek bir parametre daha eklemeye.
**Extender** kontrolümüzün bir metin kutusundaki harf sayısını kendisine
atanan bir düğme üzerine yazacağından bahsetmiştik. Bu durumda söz
konusu düğmeye ait ID bilgisinin de bir şekilde Extender'a iletilmiş
olması gerekiyor.

<span><span>        \<ExtenderControlProperty()\> \_</span>\
 <span>        \<DefaultValue(<span style="color:#A31515; ">""</span>)\>
\_</span>       \
         \<**IDReferenceProperty**(<span
style="color:blue; ">GetType</span>(**Button**))\> \_</span>\
 <span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Property</span> TargetButtonID() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
 <span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
GetPropertyValue(<span style="color:#A31515; ">"TargetButtonID"</span>,
<span style="color:#A31515; ">""</span>)</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>                SetPropertyValue(<span
style="color:#A31515; ">"TargetButtonID"</span>, value)</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>

Yukarıda da inceleyebileceğiniz üzere kontrolümüze ait ek özellikleri
bir **Property** olarak tanımlıyoruz. Yapı az çok **Class** yapılarında
kullandığımız **Property'ler** ile aynı. Örneğimizde **Property** adını
**TargetButtonID** olarak düzenledik. Bu şekilde **Property**
tanımlarken dikkat etmemiz gereken ufak birkaç nokta var. Eğer
tanımlanan **Property** için gelecek değer başka bir kontrolün ID
bilgisi ise üstteki **IDReferenceProperty** tanımlaması ile gelecek olan
kontrolün tipini de belirleyebiliyoruz. Ayrıca her bir Property için
**ExtenderControlProperty** özelliğinin de ayarlanması şart. İsterseniz
Property ler için varsayılan değerleri de **DefaultValue** ile
tanımlayabilirsiniz. Kodlar içerisinde kullandığımız
**GetPropertyValue** ve **SetPropertyValue** metodları ise ileriki
aşamalarda JavaScript tarafında tanımlayacağımız metodları kullanacak.

Kontrolümüze ek bir parametre daha ekliyor olacağız. Bu parametre sadece
bir metin alacak. Extender kontrolümüz bir düğmenin üzerine toplam metin
uzunluğunu yazarken ayrıca düğmenin adını da yazmalı. Örneğin *"Gönder
(56)"* gibi bir yazının düğmenin üzerinde olması mantıklı olur. Bu
durumda düğmenin üzerinde esas yazacak olan *"Gönder"* gibi bir metni de
bizim kullanıcıdan alıyor olmamız gerekir.

<span>        \<ExtenderControlProperty()\> \_</span>\
 <span>        \<DefaultValue(<span style="color:#A31515; ">""</span>)\>
\_</span>\
 <span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Property</span> Metin() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
 <span>            <span style="color:blue; ">Get</span></span>\
 <span>                <span style="color:blue; ">Return</span>
GetPropertyValue(<span style="color:#A31515; ">"Metin"</span>, <span
style="color:#A31515; ">""</span>)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
 <span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
 <span>                SetPropertyValue(<span
style="color:#A31515; ">"Metin"</span>, value)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>

Bir önceki adımda olduğu gibi burada da bir Property tanımladık. Bu
Property'nin tek farkı bir kontrolün ID bilgisini taşımayacağı için
**IDReferenceProperty** özelliğine sahip olmaması. Sunucu tarafındaki
kodumuzu tamamladık. **SayacDugmeExtender.vb** dosyamızın son hali
aşağıdaki şekilde.

<span style="color:blue; ">Imports</span><span> System</span>\
 <span style="color:blue; ">Imports</span><span>
System.ComponentModel</span>\
 <span style="color:blue; ">Imports</span><span> System.Web.UI</span>\
 <span style="color:blue; ">Imports</span><span>
System.Web.UI.WebControls</span>\
 <span style="color:blue; ">Imports</span><span>
AjaxControlToolkit</span>\
 <span> </span>\
 <span>\#<span style="color:blue; ">Region</span> <span
style="color:#A31515; ">"Assembly Resource Attribute"</span></span>\
 <span>\<Assembly: System.Web.UI.WebResource(<span
style="color:#A31515; ">"SayacDugme.SayacDugmeBehavior.js"</span>, <span
style="color:#A31515; ">"text/javascript"</span>)\> </span>\
 <span>\#<span style="color:blue; ">End</span> <span
style="color:blue; ">Region</span></span>\
 <span style="color:blue; "> </span>\
 <span style="color:blue; ">Namespace</span><span> SayacDugme</span>\
 <span> </span>\
 <span>    \<Designer(<span
style="color:blue; ">GetType</span>(SayacDugmeDesigner))\> \_</span>\
 <span>    \<ClientScriptResource(<span
style="color:#A31515; ">"SayacDugme.SayacDugmeBehavior"</span>, <span
style="color:#A31515; ">"SayacDugme.SayacDugmeBehavior.js"</span>)\>
\_</span>\
 <span>    \<TargetControlType(<span
style="color:blue; ">GetType</span>(TextBox))\> \_</span>\
 <span>    <span style="color:blue; ">Public</span> <span
style="color:blue; ">Class</span> SayacDugmeExtender</span>\
 <span>        <span style="color:blue; ">Inherits</span>
ExtenderControlBase</span>\
 <span> </span> <span>      \
 </span><span>        \<ExtenderControlProperty()\> \_</span>\
 <span>        \<DefaultValue(<span style="color:#A31515; ">""</span>)\>
\_</span>\
 <span>        \<IDReferenceProperty(<span
style="color:blue; ">GetType</span>(Button))\> \_</span>\
 <span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Property</span> TargetButtonID() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
 <span>            <span style="color:blue; ">Get</span></span>\
 <span>                <span style="color:blue; ">Return</span>
GetPropertyValue(<span style="color:#A31515; ">"TargetButtonID"</span>,
<span style="color:#A31515; ">""</span>)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
 <span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
 <span>                SetPropertyValue(<span
style="color:#A31515; ">"TargetButtonID"</span>, value)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
 <span style="color:blue; "> </span>\
 <span>        \<ExtenderControlProperty()\> \_</span>\
 <span>        \<DefaultValue(<span style="color:#A31515; ">""</span>)\>
\_</span>\
 <span>        <span style="color:blue; ">Public</span> <span
style="color:blue; ">Property</span> Metin() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
 <span>            <span style="color:blue; ">Get</span></span>\
 <span>                <span style="color:blue; ">Return</span>
GetPropertyValue(<span style="color:#A31515; ">"Metin"</span>, <span
style="color:#A31515; ">""</span>)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
 <span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
 <span>                SetPropertyValue(<span
style="color:#A31515; ">"Metin"</span>, value)</span>\
 <span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
 <span style="color:blue; "> </span>\
 <span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Class</span></span>\
 <span style="color:blue; "> </span>\
 <span style="color:blue; ">End</span><span> <span
style="color:blue; ">Namespace</span></span>

Sıra geldi istemci tarafında çalışacak olan JavaScript kodlarımızı
yazmaya. Tüm JavaScript kodlarımızı projemize ait
**SayacDugmeBehavior.js** dosyası içerisine yazıyor olacağız. Sunucu
tarafında tanımladığımız Property'ler ile ilgili fonksiyonları ve
değişkenleri JavaScript tarafında da tanımlamamız gerekiyor. İlk olarak
önümüze gelen JavaScript dosyasında aşağıdaki şekilde değişkenlerimizi
tanımlayalım.

<span>SayacDugme.SayacDugmeBehavior = <span
style="color:blue; ">function</span>(element) {</span>\
<span>    SayacDugme.SayacDugmeBehavior.initializeBase(<span
style="color:blue; ">this</span>, [element]);</span>\
<span>    <span
style="color:blue; ">this</span>.**\_TargetButtonIDValue** = <span
style="color:blue; ">null</span>;</span>\
 <span>    <span style="color:blue; ">this</span>.**\_MetinValue** =
<span style="color:blue; ">null</span>;</span>\
 <span>};</span>

Gördüğünüz gibi **TargetButtonID** ve **Metin** Property'leri için birer
JavaScript değişkeni tanımladık ve başlangıç için değerlerini **null**
olarak verdik. Bir sonraki adımda bu değişkenlerin **get** ve **set**
metodlarını yazıyor olacağız.

<span>    get\_TargetButtonID : <span
style="color:blue; ">function</span>() {</span>\
 <span>        <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_TargetButtonIDValue;</span>\
 <span>    },</span>\
 <span>    set\_TargetButtonID : <span
style="color:blue; ">function</span>(value) {</span>\
 <span>        <span
style="color:blue; ">this</span>.\_TargetButtonIDValue = value;</span>\
 <span>    },</span>\
 <span>    get\_Metin : <span style="color:blue; ">function</span>()
{</span>\
 <span>        <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_MetinValue;</span>\
 <span>    },</span>\
 <span>    set\_Metin : <span
style="color:blue; ">function</span>(value) {</span>\
 <span>        <span style="color:blue; ">this</span>.\_MetinValue =
value;</span>\
 <span>    }</span>

Yukarıdaki tüm JavaScript fonksiyonlarını **SayacDugmeBehavior'ın**
**prototype'ına** tanımlıyoruz. Sıra geldi metin kutusuna yazı
yazıldıkça düğmenin üzerine gerekli metni yazacak JavaScript
fonksiyonunu yazmaya.

<span>         \_onkeyup : <span style="color:blue; ">function</span>()
{</span>\
<span>               <span style="color:blue; ">var</span> harf\_sayisi
= <span
style="color:blue; ">this</span>.**get\_element()**.value.length;</span>\
 <span>               <span style="color:blue; ">var</span> dugme =
\$get(<span
style="color:blue; ">this</span>.**\_TargetButtonIDValue**);</span>\
 <span>               dugme.value = <span
style="color:blue; ">this</span>.\_MetinValue + <span
style="color:#A31515; ">'('</span> + harf\_sayisi + <span
style="color:#A31515; ">')'</span>;</span>\
<span>         },</span>

Gördüğünüz gibi prototip tanımlamasına eklediğimiz bu fonksiyon ile ilk
olarak harf sayisini bir değişkene alıyoruz. <span
style="color:blue; ">this</span>.**get\_element()** metodu bize extender
kontrolümüzün **TargetControlID'sine** verilmiş kontrolünü getirecek.
**Extender** kontrolüne bağlanan düğmeyi de JavaScript ile
yakalayabilmek için kontrolümüze aktarılan **ID** bilgisi üzerinden yola
çıkarak **\$get** metodunu kullanıyoruz. Son olarak düğmenin üzerine
yazılacak yazıyı oluştururken de extender kontrolümüze verilmiş
**Metin** yazısı ile toplam harf sayısını uygun şekilde birleştiriyoruz.

Fonksiyonumuzu tamamladık, fakat hala bize verilen metin kutusunun
**keyup** özelliğine bağlanmadı. Sayfa ilk yüklendiğinde extender
kontrolüne ait **initialize** metodu çalıştırılır. Bizim de söz konusu
anda gerekli durum bağlantılarını yapmamız gerekiyor.

<span>    initialize : <span style="color:blue; ">function</span>()
{</span>\
<span>        SayacDugme.SayacDugmeBehavior.callBaseMethod(<span
style="color:blue; ">this</span>, <span
style="color:#A31515; ">'initialize'</span>);</span>\
<span>        \$**addHandler**(<span
style="color:blue; ">this</span>.get\_element(), <span
style="color:#A31515; ">**'keyup'**</span>,</span>\
 <span>        Function.createDelegate(<span
style="color:blue; ">this</span>, <span
style="color:blue; ">this</span>.**\_onkeyup**));</span>\
 <span>             <span
style="color:blue; ">this</span>.\_onkeyup();</span>\
<span>    }, </span>

ASP.NET AJAX istemci kütüphanesinden \$**addHandler** metodunu
kullanarak extender kontrolümüze atanmış metin kutusunun **keyup**
durumuna elimizdeki fonksiyonu bağlıyoruz. Son satırda da söz konusu
fonksiyonu bir defalığına çalıştırıyoruz, böylece sayfa ilk
yüklendiğinde düğme üzerinde sayaç sıfırı gösteriyor olacak. Kodumuz
sonlandığına göre tüm JavaScript dosyamızın yapısını aşağıda
inceleyebilirsiniz.

<span>Type.registerNamespace(<span
style="color:#A31515; ">'SayacDugme'</span>);</span>\
 <span> </span>\
<span>SayacDugme.SayacDugmeBehavior = <span
style="color:blue; ">function</span>(element) {</span>\
<span>    SayacDugme.SayacDugmeBehavior.initializeBase(<span
style="color:blue; ">this</span>, [element]);</span>\
<span>    <span style="color:blue; ">this</span>.\_TargetButtonIDValue =
<span style="color:blue; ">null</span>;</span>\
<span>    <span style="color:blue; ">this</span>.\_MetinValue = <span
style="color:blue; ">null</span>;</span>\
<span>};</span>\
<span> </span>\
<span>SayacDugme.SayacDugmeBehavior.prototype = {</span>\
<span>         \_onkeyup : <span style="color:blue; ">function</span>()
{</span>\
<span>               <span style="color:blue; ">var</span> harf\_sayisi
= <span
style="color:blue; ">this</span>.get\_element().value.length;</span>\
<span>               <span style="color:blue; ">var</span> dugme =
\$get(<span
style="color:blue; ">this</span>.\_TargetButtonIDValue);</span>\
<span>               dugme.value = <span
style="color:blue; ">this</span>.\_MetinValue + <span
style="color:#A31515; ">'('</span> + harf\_sayisi + <span
style="color:#A31515; ">')'</span>;</span>\
<span>         },</span>\
<span>    initialize : <span style="color:blue; ">function</span>()
{</span>\
<span>        SayacDugme.SayacDugmeBehavior.callBaseMethod(<span
style="color:blue; ">this</span>, <span
style="color:#A31515; ">'initialize'</span>);</span>\
<span>        \$addHandler(<span
style="color:blue; ">this</span>.get\_element(), <span
style="color:#A31515; ">'keyup'</span>,</span>\
<span>        Function.createDelegate(<span
style="color:blue; ">this</span>, <span
style="color:blue; ">this</span>.\_onkeyup));</span>\
<span>             <span
style="color:blue; ">this</span>.\_onkeyup();</span>\
<span>    }, </span>\
<span>    dispose : <span style="color:blue; ">function</span>()
{</span>\
<span>        SayacDugme.SayacDugmeBehavior.callBaseMethod(<span
style="color:blue; ">this</span>, <span
style="color:#A31515; ">'dispose'</span>);</span>\
<span>    },</span>\
<span> </span>\
<span>    get\_TargetButtonID : <span
style="color:blue; ">function</span>() {</span>\
<span>        <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_TargetButtonIDValue;</span>\
<span>    },</span>\
<span>    set\_TargetButtonID : <span
style="color:blue; ">function</span>(value) {</span>\
<span>        <span
style="color:blue; ">this</span>.\_TargetButtonIDValue = value;</span>\
<span>    },</span>\
<span>    get\_Metin : <span style="color:blue; ">function</span>()
{</span>\
<span>        <span style="color:blue; ">return</span> <span
style="color:blue; ">this</span>.\_MetinValue;</span>\
<span>    },</span>\
<span>    set\_Metin : <span style="color:blue; ">function</span>(value)
{</span>\
<span>        <span style="color:blue; ">this</span>.\_MetinValue =
value;</span>\
<span>    }</span>\
<span>};</span>\
<span> </span>\
<span>SayacDugme.SayacDugmeBehavior.registerClass(<span
style="color:#A31515; ">'SayacDugme.SayacDugmeBehavior'</span>,
AjaxControlToolkit.BehaviorBase);</span>

Tüm bu işlemleri tamamladıktan sonra projenizi **Build** ederek oluşacak
**SayacDugme.dll** dosyasını araç çubuğunuza ekleyebilir ve tüm
projelerinizde hazırladığımız Extender kontrolünü kullanabilirsiniz.
Fakat unutmamakta fayda var; Extender kontrolümüz bir AJAX Control
Toolkit Extender'ı olduğu için eklendiği her projeye AJAX Control
Toolkit'e ait DLL dosyasını da ekleyecektir. Bilgi olarak aklımızda
olmasında fayda var. Kontrolümüzü kullandığımız bir web sayfasının HTML
kodu aşağıdaki şekilde sonuçlanıyor.

![SayacDugme Extender kontrolümüz iş
başında.](media/AJAX_Control_Toolkit_Extender_Kontrolleri_Yaratmak/31082007_3.png)\
*SayacDugme Extender kontrolümüz iş başında.*

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
 <span style="background:yellow; ">\<%</span><span
style="color:blue; ">@</span><span> <span
style="color:#A31515; ">Register</span> <span
style="color:red; ">Assembly</span><span
style="color:blue; ">="SayacDugme"</span> <span
style="color:red; ">Namespace</span><span
style="color:blue; ">="SayacDugme.SayacDugme"</span> <span
style="color:red; ">TagPrefix</span><span
style="color:blue; ">="Daron"</span> <span
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
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span>Untitled Page<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">title</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">head</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\<</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span>    <span style="color:blue; ">\<</span><span
style="color:#A31515; ">form</span> <span
style="color:red; ">id</span><span style="color:blue; ">="form1"</span>
<span style="color:red; ">runat</span><span
style="color:blue; ">="server"\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">ajaxToolkit</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">ToolkitScriptManager</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="ScriptManager1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:blue; ">/\></span></span>\
<span>        <span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span
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
style="color:blue; ">\>\<</span><span
style="color:#A31515; ">asp</span><span
style="color:blue; ">:</span><span style="color:#A31515; ">Button</span>
<span style="color:red; ">ID</span><span
style="color:blue; ">="Button1"</span></span>\
<span>            <span style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">Text</span><span
style="color:blue; ">="Button"</span> <span
style="color:blue; ">/\></span></span>\
<span>            <span style="color:blue; ">\<</span><span
style="color:#A31515; ">Daron</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">SayacDugmeExtender</span> <span
style="color:red; ">ID</span><span
style="color:blue; ">="SayacDugmeExtender1"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span></span>\
<span>                                      <span
style="color:red; ">TargetControlID</span><span
style="color:blue; ">="TextBox1"</span></span>\
<span>                                      <span
style="color:red; ">TargetButtonID</span><span
style="color:blue; ">="Button1"</span></span>\
<span>                                      <span
style="color:red; ">Metin</span><span
style="color:blue; ">="TIKLA"\></span></span>\
<span>            <span style="color:blue; ">\</</span><span
style="color:#A31515; ">Daron</span><span
style="color:blue; ">:</span><span
style="color:#A31515; ">SayacDugmeExtender</span><span
style="color:blue; ">\></span></span>\
<span>        <span style="color:blue; ">\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
<span>      </span>\
<span>    <span style="color:blue; ">\</</span><span
style="color:#A31515; ">form</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">body</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">html</span><span style="color:blue; ">\></span>\

Hepinize kolay gelsin.

[Sayaç Düğme Extender kontrolü projesine ait kodlar - 31082007\_1.zip
(521,41 KB)](media/AJAX_Control_Toolkit_Extender_Kontrolleri_Yaratmak/31082007_1.zip)



*Bu yazi http://daron.yondem.com adresinde, 2007-8-31 tarihinde yayinlanmistir.*
