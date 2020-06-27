---
FallbackID: 2223
Title: "Dynamic Data Web Site'larda MetaData ile sütun özelliklerini ayarlamak."
date: "2008-10-22"
EntryID: Dynamic_Data_Web_Site_larda_MetaData_ile_sutun_ozelliklerini_ayarlamak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, LINQ, ASP.NET
old.EntryID: f1ff4a9a-ef43-4ebb-9f2e-1f599df4c8b1
---
.NET 3.5 SP1 ile beraber gelen **Dynamic Data Web Site** yapısı ile
beraber doğrudan sadece veri üzerinde çalışan web uygulamaları yazmanın
gerçekten kolaylaştığını itiraf edebiliriz. Fakat her yeni araç gibi
Dynamic Data ile beraber de istediklerimizi yapabilmek için kendine özgü
özelleştirme kurallarını bilmemiz gerek. Bu yazıda elimizde hazır bir
**Dynamic Data Web Site** olacak ve bu web sitesinde gösterilen
veritabanındaki bazı tablolardaki bazı sütunların gösterim esnasındaki
özelleştirmelerine değineceğiz. Cevaplayacağımız sorulardan bazıları
şunlar olacak;

-   Belirli bir tablonun sadece bir sütununun görünmemesini nasıl
    sağlarım?
-   İstediğim bir sütunun istediğim değerleri almasını nasıl sağlarım?

Yazımızda kullanacağımız örnek siteyi yaratmak için
[buradaki](http://daron.yondem.com/tr/post/a562c8ca-165a-41ba-b82b-0996aa8ea267)
yazıyı inceleyebilirsiniz.

**MetaData üzerinden ayarlamalar...**

Dynamic Data yapısına baktığımızda olabildiğince her şeyin otomatik
ilerlediğini görüyoruz. Örneğin bir tablonun içerisindeki tüm sütunlar
otomatik olarak söz konusu tablo ile beraber tüm sayfalarda
düzenlenebilir şekilde gözükmeye başlıyor. Sütunlarla ilgili tek tek
ayar yapmanın tek yolu söz konusu sütunlara ek MetaData bilgileri
vermek. Peki bizim sütunlarımızı kodumuzla kim tanımlıyor?

Biz projemizde LINQ2SQL kullanarak ilerlediğimiz için veritabanındaki
her bir nesneyi tanımlayan objeler LINQ'e ait DBML'in arkasında
tanımlanmış durumda. Bir DBML dosyasının arkasına baktığınızda
**designer.vb** veya **designer.cs** uzantılı dosyalar görebilirsiniz.
Bu dosyalar içerisinde veritabanındaki tüm nesnelerin birer kopyası .NET
nesneleri olarak yaratılmıştır.

**[VB]**

\<Table(Name:=<span style="color: #a31515;">"dbo.Urunler"</span>)\>  \_

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urunler

    <span style="color: blue;">Implements</span>
System.ComponentModel.INotifyPropertyChanging,
System.ComponentModel.INotifyPropertyChanged

**[C\#]**

[<span style="color: #2b91af;">Table</span>(Name=<span
style="color: #a31515;">"dbo.Urunler"</span>)]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urunler</span> : <span
style="color: #2b91af;">INotifyPropertyChanging</span>, <span
style="color: #2b91af;">INotifyPropertyChanged</span>

{

Yukarıda gördüğünüz şekilde başlayan **Urunler** adındaki Class DBML
dosyasının arkasında duruyor ve bizim her bir ürünümüzü tanımlıyor.
Maalesef bu designer dosyalarında değişiklik yapamıyoruz. Aslında
değişiklik yapabilirsiniz fakat DBML dosyasında Visual Studio
arayüzündeki tasarım araçları ile yaptığınız her işlem bu dosyaların
sistem tarafından tekrar yaratılmasına neden olacağı için kullanıcı
tarafından yapılan tüm kod değişiklikleri kaybolacaktır. Peki bu durumu
nasıl çözeceğiz? Dikkat ettiyseniz tüm bu sınıflar **Partial** olarak
tanımlanmıştır yani bir başka bir dosyada tekrar **Partial** birer sınıf
yaratarak işlemlerimize devam edebiliriz. Bu durumda buyurun yeni bir
VB/CS dosyası oluşturalım ve **Partial** olarak aynı sınıftan bir adet
daha yaratalım.

**[VB]**

\<ComponentModel.DataAnnotations.MetadataType(<span
style="color: blue;">GetType</span>(**UrunlerMeta**))\> \_

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urunler

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

[System.ComponentModel.DataAnnotations.<span
style="color: #2b91af;">MetadataType</span>(<span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">UrunlerMeta</span>))]

<span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urunler</span>

{

 

}

Yukarıdaki koda baktığınızda özellikle en üstteki **MedadataType**
işaretleri dikkatinizi çekecektir. Aslında bu da bir MetaData fakat
maalesef bu şekilde **Partial** sınıflara doğrudan **MetaData**
veremiyoruz. O nedenle başka bir sınıf yaratarak MetaData'ları orada
tutacağız ve o sınıftan MedaData'ları bu tarafa aktaracağız. Kodumuz
içerisinde **UrunlerMeta** olarak geçen obje aslında başka bir sınıfın
adı.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> UrunlerMeta

 

    <span style="color: blue;">Private</span> \_Fiyati <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>

    \<ComponentModel.DataAnnotations.**Range**(10, 20,
errormessage:=<span style="color: #a31515;">"Hata!"</span>)\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Fiyati**() <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> \_Fiyati

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>)

            \_Fiyati = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">UrunlerMeta</span>

{

    [System.ComponentModel.DataAnnotations.<span
style="color: #2b91af;">Range</span>(10, 20, ErrorMessage = <span
style="color: #a31515;">"Hata!"</span>)]

    <span style="color: blue;">public</span> <span
style="color: blue;">object</span> Fiyati { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

}

**UrunlerMeta** sınıfı içerisinde sadece **Fiyati** adında bir
**Property** var. Aslında ana **Urunler** sınıfındaki tüm Property'leri
burada da tanımlayarak kullanabilirdik fakat şimdilik bize **Fiyati**
Property'si yeterli. **ComponentModel.DataAnnotations** altından
**Range** sınıfını kullanarak **Fiyati** değerinin 10 ile 20 arasında
olmak zorunda olduğunu ve bu durumun sağlanmaması halinde de hata olarak
*"Hata!"* yazısının gösterilmesi gerektiğini belirtiyoruz. Gelin bu
kodun bir de web sitesindeki yansımasına göz atalım.

![Range sınıfı ile yaptığımız ayarlamalar arayüzde kendini
gösteriyor.](media/Dynamic_Data_Web_Site_larda_MetaData_ile_sutun_ozelliklerini_ayarlamak/21102008_1.png)\
*Range sınıfı ile yaptığımız ayarlamalar arayüzde kendini gösteriyor.*

**Başka neler yapabiliriz?**

MetaData'lar üzerinden başka neler yapılabileceği ile ilgili çok sayıda
farklı senaryo mevcut fakat en basit örnekleri inceleyebilmek için
kabaca **ComponentModel.DataAnnotations** sınıfına göz atmak yeterli
olacaktır. Örneğin aşağıdaki gibi bir kod istediğiniz bir kolonun web
sitesinde gösterilmemesini sağlayabilir.

**[VB]**

\<ComponentModel.DataAnnotations.ScaffoldColumn(<span
style="color: blue;">False</span>)\> \_

**[C\#]**

[System.ComponentModel.DataAnnotations.<span
style="color: #2b91af;">ScaffoldColumn</span>(<span
style="color: blue;">false</span>)]

Peki ya diğer seçenekler? Gelin hızlı bir tur atalım.

**DisplayColumn**

Bu özellik toplam en fazla üç parametre alabilir. Amacı tablolar arası
ilişkilendirmelerde kullanıcının gördüğü metinleri değiştirmektir.
Örneğin bizim projemizde ürünlere bağlı olan kategorilerin adları
otomatik olarak her üründe gösteriliyor. Sistem aslında arka planda
**Kategoriler** tablosunda ID(PK) kolonundan sonra karşılaştığı ilk
String kolonu alarak göstermeye göre ayarlı. Oysa bazı durumlar FK'in
bağlı olduğu tablodan alınması gereken ve gösterilecek olan metin çok
daha ileride farklı bir sütunda olabilir. İşte **DisplayColumn** bunu
ayarlıyor ve bir FK durumunda ana tablodan hangi sütunun bu üründe
gösterilmesi gerektiğine karar veriyor. Bunun haricinde aldığı iki diğer
parametrenin ilki hangi kolon üzerinden **Sorting** yapılabileceği ve
üçüncü parametre ise Sorting işleminin ilk açılışında hangi yönde
yapılacağı verisini taşıyor.

**RegularExpression**

Kendisine ilk parametre olarak verilen RegEx desenini hedef kolona test
eden ve uyuşmaması durumunda da ikinci parametre olarak verilen hata
mesajının gösterilmesini sağlayan bir Validation sisteminin
entegrasyonuna yönelik olarak kullanılabilir.

**Required**

Sadece tek bir parametresi vardır; eşleştirildiği sütun için veri
girilmez ise gösterilmesi gereken hata mesajını String olarak alır.

**ScaffoldTable**

Tablo sınıflarına doğrudan verilebilen bu MetaData ile bir tablonun web
sitesi görselliğinde gösterilip gösterilmeyeceğini belirler.

**StringLength**

Bir sütuna girilebilecek maksimum metin uzunluğu ilk parametresi olarak
alır. İkinci parametresinde ise söz konusu uzunluk aşıldığında
gösterilecek olan hata mesajını saklar.

**Sonuç**

Yazı boyunda Annotation'lar içerisinde atladığım bazı seçenekler oldu.
Bu seçenekleri ileriki yazılarda daha detaylı olarak incelememiz
gerektiği için şimdilik yüzeysel olarak geçmek istemedim.

Hepinize kolay gelsin.


