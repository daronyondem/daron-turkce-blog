---
FallbackID: 1963
Title: "Dinamik Silverlight nesneleri üretmenin yolları."
date: "2008-2-20"
EntryID: Dinamik_Silverlight_nesneleri_uretmenin_yollari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 0aaaf6ac-d218-4eea-b07e-b30e68477a0a
---
Silverlight animasyonları içerisinde XAML ile tanımlanan tüm nesneleri
dinamik olarak kod ile de tanımlama şansımız var. Bu makalede
Silverlight ile dinamik içerik üretimine dair detaylardan bahsedeceğiz.

Silverlight içerisinde dinamik içerik üretebilmek için kullanacağımız
JavaScript metodu **createFromXaml** adında. Bu metod sadece tek bir
parametre alıyor, o da üreteceğimiz nesneye ait XAML kodunun ta kendisi.
İstediğimiz herhangi bir XAML kodunu **createFromXaml** metoduna vererek
geriye uygun bir JavaScript nesnesi alabiliyoruz. Gelin ufak bir örnek
ile konuya giriş yapalım. Aşağıda bir dikdörtgenin XAML kodu bulunuyor,
aynı dikdörtgeni JavaScript ile yaratacağız.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="100"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="100"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="100"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="100"/\></span>

Yukarıdaki dikdörtgenin aynısı JavaScript ile yaratabilmek için ilk
seçeneğimiz **createFromXaml** metoduna **Rectangle** tagını vererek
dikdörtgenin özelliklerini ayrı ayrı ayarlamak.

        <span style="color: blue;">var</span> Dikdortgen =
control.content.createFromXaml(<span
style="color: #a31515;">"\<Rectangle/\>"</span>);

        Dikdortgen.width = 100;

        Dikdortgen.height = 100;

        Dikdortgen[<span style="color: #a31515;">"Canvas.Left"</span>] =
100;

        Dikdortgen[<span style="color: #a31515;">"Canvas.Top"</span>] =
100;

        Dikdortgen.Fill = <span
style="color: #a31515;">"\#FFFF0000"</span>;

        rootElement.children.add(Dikdortgen);

Yukarıdaki kodun ilk satırında **createFromXaml** metodu ile
dikdörtgenimizi yaratarak **Dikdortgen** adındaki bir değişkene
aktarıyoruz. Sonrasında da her satırda **Dikdortgen** değişkeni ile
ilgili bir özelliği ayarlıyoruz. En son satırda ise elde ettiğimiz
**Dikdortgen** nesnesini root Silverlight elementinin içine eklemek için
**children.add** metodunu kullanıyoruz. Bu şekli ile birden çok
dikdörtgeni farklı özellikler ile dinamik olarak Silverlight
animasyonlarına ekleyebilirsiniz.

Örneğimizde bahsi geçen dikdörtgen nesnesini dinamik olarak yaratmanın
bir diğer yolu da doğrudan tüm XAML kodunu **createFromXaml** metoduna
topluca vermek. Böylece tek tek dikdörtgenin özelliklerini sonradan
ayarlamaya ihtiyaç duymadan daha az kod ile sorunumuzu çözebiliriz.

        <span style="color: blue;">var</span> Dikdortgen =
control.content.createFromXaml(<span
style="color: #a31515;">'\<Rectangle Width="100" Height="100"
Fill="\#FFFF0000" Canvas.Left="100" Canvas.Top="100"/\>'</span>);

        rootElement.children.add(Dikdortgen);

Buraya kadar yaptığımız tüm örneklerde isimsiz nesneler kullandık.
Yarattığımız hiçbir dikdörtgenin özel bir ismi yok. Eğer bu
dikdörtgenlere veya yarattığınız farklı nesnelere sonradan programatik
olarak ulaşabilmek isterseniz baştan bu nesnelere birer isim vermiş
olmak gerekecektir. Böyle bir durumda dikdörtgenimizin kodu aşağıdaki
şekilde olacaktır.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="KUTU"</span><span style="color: red;">
Width</span><span style="color: blue;">="100"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="100"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="100"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="100"/\></span>

İlk dikdörtgenimize ek olarak bu dikdörtgenin **x:Name** şeklinde bir
özelliği var ve söz konusu özelliğe **KUTU** değeri aktarılmış. Böylece
bu nesneye programatik olarak **KUTU** adı üzerinden ulaşabileceğiz.
Esas sorun yukarıdaki kodu **createFromXaml** metoduna verdiğinizde
karşınıza çıkacak. **createFromXaml** metodu sürekli hata verecek ve
maalesef verdiği hata mesajının da pek anlamlı olmaması sizi çözüm
yoluna yönlendirmeyecektir. Bu tarz bir durumda **createFromXaml'ın**
hata vermesinin aslında basit bir nedeni var. **x:Name** olarak
dikdörtgene verdiğimiz özellik aslında XML yazım kuralları gereği ikinci
bir namespace kullanıldığı anlamına geliyor. Söz konusu namespace
aslında her Silverlight XAML dosyasının roor (kök) elementinde tanımlı
durumda.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">**  xmlns**</span><span
style="color: blue;">**="http://schemas.microsoft.com/client/2007"**</span>

<span style="color: red;">**  xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**x**</span><span
style="color: blue;">**="http://schemas.microsoft.com/winfx/2006/xaml"**</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="640"</span><span style="color: red;">
Height</span><span style="color: blue;">="480"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="KUTU"</span><span style="color: red;">
Width</span><span style="color: blue;">="100"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="100"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="100"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="100"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde kalın olarak yazılı kısımda bulabileceğiniz
**namespace** tanımları kök **Canvas** nesnesinde tanımlanmış olduğu
için tüm alt nesneler için de geçerli olacaktır. Oysa bizim
**createFromXaml** metoduna verdiğimiz XAML kodunda kullanılan x
namespace'inden **createFromXaml** metodunun haberi yok. Bu durumda aynı
namespace tanımlarını **createFromXaml'a** verdiğimiz kod içerisinde de
yapmak zorundayız.

        <span style="color: blue;">var</span> Dikdortgen =
control.content.createFromXaml(<span
style="color: #a31515;">'\<Rectangle
xmlns="http://schemas.microsoft.com/client/2007"
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" x:Name="KUTU"
Width="100" Height="100" Fill="\#FFFF0000" Canvas.Left="100"
Canvas.Top="100"/\>'</span>);

        rootElement.children.add(Dikdortgen);

Yukarıdaki kod içerisinde de gördüğünüz üzere artık **createFromXaml**
metoduna verdiğimiz XAML koduna gerekli namespace tanımlamalarını da
ekledik. Böylece herhangi bir hata ile karşılaşmadan istediğimiz
isimlerde nesneler yaratarak dinamik olarak animasyonlara ekleyebilir ve
bu nesnelere sonradan programatik olarak da ulaşabiliriz.

Hepinize kolay gelsin.


