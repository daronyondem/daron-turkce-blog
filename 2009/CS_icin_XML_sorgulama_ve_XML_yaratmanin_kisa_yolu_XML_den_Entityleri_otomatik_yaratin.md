---
FallbackID: 2362
Title: "C# için XML sorgulama ve XML yaratmanın kısa yolu! XML'den Entityleri otomatik yaratın."
date: "2009-5-4"
EntryID: CS_icin_XML_sorgulama_ve_XML_yaratmanin_kisa_yolu_XML_den_Entityleri_otomatik_yaratin
IsActive: True
Section: software
MinutesSpent: 0
Tags: LINQ, C#
old.EntryID: 4d512ded-066f-4c51-94a7-b6a6a6ff7fc5
---
# C# için XML sorgulama ve XML yaratmanın kısa yolu! XML'den Entityleri otomatik yaratın.
Bu hafta sonu epey yoğun bir tempo ile Ankara'da **Bilkent
Üniversitesi**'ndeki iki etkinlik ve **Çankaya Üniversitesi**'ndeki bir
etkinlik arasında gidip geldim :) Tüm bu tempo içerisinde XLINQ
konusundan bahsettiğim her dakikada VB'nin Inline XML özelliğine hayran
kalmayan kalmadı diyebilirim :) Ama gelin C\#'cılar için de faydalı
olabilecek bir ipucunu sizlerle paylaşiyim.

**WCF Rest Starter Kit Preview 2**

Aslında sizlere anlatacağım işlevsellik Rest based servislerin kullanımı
için hazırlanmış. İsterseniz bu çerçevede aşağıdan download
edebileceğiniz paketi bilgisayarınıa yükleyip diğer özellikleri de
inceleyebilirsiniz. Fakat bizim bu yazımızda odaklanacağımız nokta C\#
ile XML sorgulama ve hızlıca XML yaratma konuları olacak.

<http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=24644>

Özünde bugün rahatlıkla C\# ile XML sorgulayabilir veya yaratabilirsiniz
fakat elinizde hazır bir XML kodu olduğunu düşünürsek bu kodu yaratacak
veya okuyacak C\# kodunu yazarken sürekli hedef XML'in yapısını
incelemek zorunda kalıyoruz. VB'de Inline XML bu sorunu tamamen çözse de
C\# içerisinde ancak WCF Rest Starter Kit ile beraber gelen araçları
kullanarak işimizi kolaylaştırabiliriyoruz.

![WCF Rest Starter Kit ile beraber "Past XML as
Types"](media/CS_icin_XML_sorgulama_ve_XML_yaratmanin_kisa_yolu_XML_den_Entityleri_otomatik_yaratin/03052009_1.png)\
*WCF Rest Starter Kit ile beraber "Past XML as Types"*

**Elimizde gelen hazır bir formatta XML yaratalım!**

Elimize aşağıdaki gibi hazır bir formatta XML geldiğini varsayalım. Bir
şekilde bu XML ile aynı yapıda elimizde yer alan farklı bir veriden XML
oluşturmak durumunda kalırsak tek tek her tagı yaratan XElement,
XAttribute vs nesnelerini yaratmamız gerekecektir. Oysa eğer
bilgisayarınızda WCF Rest Starter Kit yükledi iseniz işiniz daha kolay.

**[XML]**

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;"> ?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">DenemeVeri</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Urunler</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Urun</span><span style="color: blue;">
</span><span style="color: red;">No</span><span
style="color: blue;">=</span>"<span
style="color: blue;">145</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Adi</span><span
style="color: blue;">\></span>Örnek Ürün<span
style="color: blue;">\</</span><span
style="color: #a31515;">Adi</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Kodu</span><span
style="color: blue;">\></span>df234sd<span
style="color: blue;">\</</span><span
style="color: #a31515;">Kodu</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Urun</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Urun</span><span style="color: blue;">
</span><span style="color: red;">No</span><span
style="color: blue;">=</span>"<span
style="color: blue;">146</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Adi</span><span
style="color: blue;">\></span>Örnek Ürün<span
style="color: blue;">\</</span><span
style="color: #a31515;">Adi</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Kodu</span><span
style="color: blue;">\></span>df234sd<span
style="color: blue;">\</</span><span
style="color: #a31515;">Kodu</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Urun</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Urunler</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">DenemeVeri</span><span
style="color: blue;">\></span>

WCF Rest Starter Kit kurulumunu tamamladıktan sonra doğrudan Visual
Studio'nun Edit menüsüne giderseniz "**Past XML as Types**" diye bir
seçenek göreceksiniz. Yukarıdaki örnek XML'i kopyaladıktan sonra Visual
Studio içerisinde herhangi bir projeye yeni bir CS dosyası ekleyip içine
kopyaladığımız XML'i "Past XML as Types" diyerek yapıştıralım.

**[C\#]**

<span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

[System.CodeDom.Compiler.<span
style="color: #2b91af;">GeneratedCodeAttribute</span>(<span
style="color: #a31515;">"System.Xml"</span>, <span
style="color: #a31515;">"2.0.50727.3521"</span>)]

[System.Diagnostics.<span
style="color: #2b91af;">DebuggerStepThroughAttribute</span>()]

[System.Xml.Serialization.<span
style="color: #2b91af;">XmlTypeAttribute</span>(AnonymousType = <span
style="color: blue;">true</span>)]

[System.Xml.Serialization.<span
style="color: #2b91af;">XmlRootAttribute</span>(Namespace = <span
style="color: #a31515;">""</span>, IsNullable = <span
style="color: blue;">false</span>)]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">DenemeVeri</span>

{

 

    <span style="color: blue;">private</span> <span
style="color: #2b91af;">DenemeVeriUrunler</span> urunlerField;

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    <span style="color: blue;">public</span> <span
style="color: #2b91af;">DenemeVeriUrunler</span> Urunler

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.urunlerField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.urunlerField = <span
style="color: blue;">value</span>;

        }

    }

}

<span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

[System.CodeDom.Compiler.<span
style="color: #2b91af;">GeneratedCodeAttribute</span>(<span
style="color: #a31515;">"System.Xml"</span>, <span
style="color: #a31515;">"2.0.50727.3521"</span>)]

[System.Diagnostics.<span
style="color: #2b91af;">DebuggerStepThroughAttribute</span>()]

[System.Xml.Serialization.<span
style="color: #2b91af;">XmlTypeAttribute</span>(AnonymousType = <span
style="color: blue;">true</span>)]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">DenemeVeriUrunler</span>

{

 

    <span style="color: blue;">private</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrun</span> urunField;

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    <span style="color: blue;">public</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrun</span> Urun

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.urunField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.urunField = <span
style="color: blue;">value</span>;

        }

    }

}

<span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

[System.CodeDom.Compiler.<span
style="color: #2b91af;">GeneratedCodeAttribute</span>(<span
style="color: #a31515;">"System.Xml"</span>, <span
style="color: #a31515;">"2.0.50727.3521"</span>)]

[System.Diagnostics.<span
style="color: #2b91af;">DebuggerStepThroughAttribute</span>()]

[System.Xml.Serialization.<span
style="color: #2b91af;">XmlTypeAttribute</span>(AnonymousType = <span
style="color: blue;">true</span>)]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrun</span>

{

 

    <span style="color: blue;">private</span> <span
style="color: blue;">string</span> adiField;

 

    <span style="color: blue;">private</span> <span
style="color: blue;">string</span> koduField;

 

    <span style="color: blue;">private</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrunFiyatlar</span>
fiyatlarField;

 

    <span style="color: blue;">private</span> <span
style="color: blue;">byte</span> noField;

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.adiField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.adiField = <span
style="color: blue;">value</span>;

        }

    }

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Kodu

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.koduField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.koduField = <span
style="color: blue;">value</span>;

        }

    }

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    <span style="color: blue;">public</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrunFiyatlar</span> Fiyatlar

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.fiyatlarField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.fiyatlarField = <span
style="color: blue;">value</span>;

        }

    }

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    [System.Xml.Serialization.<span
style="color: #2b91af;">XmlAttributeAttribute</span>()]

    <span style="color: blue;">public</span> <span
style="color: blue;">byte</span> No

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.noField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.noField = <span
style="color: blue;">value</span>;

        }

    }

}

<span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

[System.CodeDom.Compiler.<span
style="color: #2b91af;">GeneratedCodeAttribute</span>(<span
style="color: #a31515;">"System.Xml"</span>, <span
style="color: #a31515;">"2.0.50727.3521"</span>)]

[System.Diagnostics.<span
style="color: #2b91af;">DebuggerStepThroughAttribute</span>()]

[System.Xml.Serialization.<span
style="color: #2b91af;">XmlTypeAttribute</span>(AnonymousType = <span
style="color: blue;">true</span>)]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">DenemeVeriUrunlerUrunFiyatlar</span>

{

 

    <span style="color: blue;">private</span> <span
style="color: blue;">byte</span>[] fiyatField;

 

    <span style="color: blue;">private</span> <span
style="color: blue;">byte</span> seviyeField;

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    [System.Xml.Serialization.<span
style="color: #2b91af;">XmlElementAttribute</span>(<span
style="color: #a31515;">"Fiyat"</span>)]

    <span style="color: blue;">public</span> <span
style="color: blue;">byte</span>[] Fiyat

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.fiyatField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.fiyatField = <span
style="color: blue;">value</span>;

        }

    }

 

    <span style="color: gray;">///</span><span style="color: green;">
</span><span style="color: gray;">\<remarks/\></span>

    [System.Xml.Serialization.<span
style="color: #2b91af;">XmlAttributeAttribute</span>()]

    <span style="color: blue;">public</span> <span
style="color: blue;">byte</span> Seviye

    {

        <span style="color: blue;">get</span>

        {

            <span style="color: blue;">return</span> <span
style="color: blue;">this</span>.seviyeField;

        }

        <span style="color: blue;">set</span>

        {

            <span style="color: blue;">this</span>.seviyeField = <span
style="color: blue;">value</span>;

        }

    }

}

Yukarıda da gördüğünüz üzere biraz önce yapıştırdığımız tüm XML kodu bir
anda Entity'ler olarak karşımıza çıkıyor. Böylece artık bu Entity'leri
kullanarak aynı formatta bir XML yaratabiliriz. Gelin bir deneyelim;

**[C\#]**

        <span style="color: #2b91af;">DenemeVeri</span> Ornek = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">DenemeVeri</span>();

        <span style="color: #2b91af;">DenemeVeriUrun</span>[] Urunler =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">DenemeVeriUrun</span>[1];

        <span style="color: #2b91af;">DenemeVeriUrun</span> YeniUrun =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">DenemeVeriUrun</span>();

        YeniUrun.Adi = <span style="color: #a31515;">"Örnek
Ürün"</span>;

        YeniUrun.Kodu = <span style="color: #a31515;">"123"</span>;

        YeniUrun.No = 123;

        Urunler[0] = YeniUrun;

        Ornek.Urunler = Urunler;

 

        <span style="color: #2b91af;">XmlSerializer</span> MySerializer
= <span style="color: blue;">new</span> <span
style="color: #2b91af;">XmlSerializer</span>(<span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">DenemeVeri</span>));

        <span style="color: #2b91af;">TextWriter</span> TW = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">StringWriter</span>();

        MySerializer.Serialize(TW, Ornek);

        Response.Write(TW.ToString());

Yukarıdaki kod içerisinde aslında XML taglarından türetmiş olduğumuz
Entity'leri kullanarak yeni bir XML kaynağı yaratabiliyoruz. Tüm bunları
yaparken nesneler tanımlı olduğu için hem nested itemların yapılarını
kontrol etmemize gerek kalmıyor hem de Intellisens bize yardımcı oluyor
:)

**Peki ya XML sorgularken?**

Elimizde tanımı hazır bir XML dosyasından Entity'leri yarattığımıza göre
aslında yine bildiğimiz bir XML'i okuyarak bu Entity'lere de
çevirebiliyor olmamız gerek. Böylece XML sorgularken karşılaştığımız ve
karşımızdaki XML'in yabancı bir yapıya sahip olmasından yola çıkan
zorluklardan yine kurtulabiliriz.

**[C\#]**

        <span style="color: #2b91af;">XDocument</span> Dok = <span
style="color: #2b91af;">XDocument</span>.Load(Server.MapPath(<span
style="color: #a31515;">"XMLFile.xml"</span>));

        <span style="color: #2b91af;">XmlSerializer</span> MySerializer
= <span style="color: blue;">new</span> <span
style="color: #2b91af;">XmlSerializer</span>(<span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">DenemeVeri</span>));

        <span style="color: #2b91af;">TextReader</span> TW = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">StringReader</span>(Dok.ToString());

        <span style="color: #2b91af;">DenemeVeri</span> Denek =
MySerializer.Deserialize(TW) <span style="color: blue;">as</span> <span
style="color: #2b91af;">DenemeVeri</span> ;

        Response.Write(Denek.Urunler.Count());

Yukarıda gördüğünüz kod içerisinde ilk olarak makalemizin başındaki
XML'in kayıtlı olduğu bir XML dosyasını okutuyoruz. Söz konusu XML
dosyasının içeriğinden yarattığımız Entity'ler projemizin içerisinde
yine hazır bulunuyorlar. Bu noktadan sonra tek yapmamız gereken eldeki
XML'i **DeSerialize** ederek yine elde tanımlı **Entity'lere** çevirmek.
Çeviri işlemini de tamamladıktan sonra artık rahat rahat istediğimiz
veriye Intellisense'in de yardımı ile ulaşabiliriz. Hedef XML'in yapısı
hiç bilmesek de sorgulama yapmak Entity'ler sayesinde kolaylaşıyor.

**[C\#]**

        Response.Write((<span style="color: blue;">from</span> inc <span
style="color: blue;">in</span> Denek.Urunler <span
style="color: blue;">where</span> inc.No==145 <span
style="color: blue;">select</span> inc.Adi).Single());

Yukarıda gördüğünüz sorgu aslında biraz önce **DeSerialize** ettiğimiz
XML'i sorguluyor. Yine Intellisense ve LINQ yardımı ile sorgunun kodunu
yazmak da çok kolaylaşıyor.

Hepinize kolay gelsin ;) C\#'cılar ;)



*Bu yazi http://daron.yondem.com adresinde, 2009-5-4 tarihinde yayinlanmistir.*
