---
FallbackID: 2251
Title: "Silverlight 2.0 içerisinde Toolkit'ten Label kontrolünün kullanımı."
date: "2008-11-19"
EntryID: Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: c7205227-d787-4df7-9e0e-fff1a9be63b4
---
Silverlight ilk çıktığı günlerde en çok şaşırdığımız noktalar biri
"Label" adında bir kontrolün bulunmamasıydı. İşlevsellik olarak aynı
çözümü sunan **TextBlock** kontrolünü çok kısa bir sürede keşfetmiş
olsak da neden isminin değiştiğini pek anlayalamıştık. Bugünlerde
[Silverlight Toolkit](http://www.codeplex.com/silverlight) paketi ile
beraber özel bir **Label** kontrolü geldi.

**Nedir TextBlock ile Label'ın farkı?**

Aslında kaba tanımı ile **TextBlock** kontrolü Label'ın yapı taşıdır.
Bir **Label** kontrolü ControlTemplating desteklerken **TextBlock**
desteklemez. Zaten **Label** Template'leri oluştururken biz de
TextBlock'lardan faydalanacağız. Özetle Label'lar gelişmiş TextBlock
kontrolleridir de diyebiliriz. Sözü daha çok uzatmadan gelin neler
yapabildiğimize göz atalım.

*Not: Silverlight Toolkit'i kullanabilmeniz için*
[*CodePlex*](http://codeplex.com/Silverlight) *üzerindeki adresten
kütüphaneyi indirerek içerisindeki* ***Microsoft.Windows.Controls.dll***
*dosyasını projenize referans olarak eklemelisiniz.*

Bir Label kontrolünü Silverlight Toolkit'in referans alınmış olduğu
herhangi bir projede rahatlıkla kullanabilirsiniz. Expression Blend
içerisinde "Asset Library" kısmında "Custom Controls" sekmesinde
**Label** kontrolünü bulabilirsiniz. TextBlock'larda da oluğu gibi
herhangi bir **Label** içerisine yazı yazmak için **Content**
özelliğinden faydalanabilirsiniz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication2.Page"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">controls</span><span
style="color: blue;">="clr-namespace:Microsoft.Windows.Controls;assembly=Microsoft.Windows.Controls"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Content</span><span style="color: blue;">="Deneme Amaçlı
Metin"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Basit bir şekilde **Label** kontrolünün kullanımına dair yukarıdaki XAML
kodunu inceleyebilirsiniz. Bir TextBlock ile Label kontrolünü
birbirinden ayıran özelliklerden ilki Label kontrolünün **BorderBrush**
alabiliyor olması. Hatta sadece bu kadarla kalmayıp bir Label'ın hangi
kenarlarında **Border** bulunacağına da karar verebiliyorsunuz.

![Label kontrolünün BorderBrush
ayarları.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_1.png)\
*Label kontrolünün BorderBrush ayarları.*

Aynı şekilde isterseniz bir Label için **Background** da
belirleyebilirsiniz. Fakat makalemizin başından beridir bahsettiğimiz
Label'ın en önemli özelliği aslında ControlTemplating'e olanak tanıması.
Gelin şimdi Expression Blend içerisinde Label kontrolümüze sağ
tıklayarak gelen menüden "Edit Control Parts / Create Empty" komutunu
verelim. Böylece hali hazırda sahnede olan Label'ın görselliği yok
varsayılarak bizim Label kontrolünün yapısını tekrar tasarlayabilmemiz
sağlanacak. Bunun için ilk aşamada karşınıza gelen pencerede bu şablona
bir de isim vermeniz gerek. Unutmayın hazırlanan şablonlar sonrasında
birden çok Label'a linklenerek merkezi bir yerden kullanılabilir.

![Label kontrolü için yeni bir ControlTemplate
yaratıyoruz.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_2.png)\
*Label kontrolü için yeni bir ControlTemplate yaratıyoruz.*

ControlTemplate'imizi yarattıktan sonra Blend bizi otomatik olarak
**Template** tasarımına götürecektir. Bu sahnede otomatik olarak gelen
Grid nesnesini bir **Canvas'a** çevireceğiz. Bu seçimi tamamen örneğin
kolay ilerlemesi için yapıyoruz. Siz kendi tasarımlarınızda farklı
Layout kontrolleri tabi ki kullanabilirsiniz.

![ControlTemplate tasarımımız bitmek
üzere.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_3.png)\
*ControlTemplate tasarımımız bitmek üzere.*

Tasarımımızda Canvas'ın içerisinde bir **Rectangle** koyarak **Fill**
özelliğine de **Radial** bir **GradientBrush** atadık. Rectangle'ın
önünde de bir TextBlock koyuyoruz. **Label** içerisinde metni gösterecek
olan bu TextBlock kontrolü olacak. Label kontrolünün **Content**
özelliğine verilen değerlerin otomatik olarak şablon içerisinde bu
TextBlock'un **Content'ine** aktarılmasını sağlamalıyız. Bunu da ancak
**TemplateBinding** ile yapabiliriz.

![Blend arayüzünden TemplateBinding ayarlarımızı
yapıyoruz.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_4.png)\
*Blend arayüzünden TemplateBinding ayarlarımızı yapıyoruz.*

Blend'in arayüzünde şablonumuzu tasarlarken **TextBlock** kontrolümüzü
seçtikten sonra ekranın sağında kalan "Properties" sekmesinden söz
konusu TextBlock'un **Content** özelliğini ayarladığımız yerin hemen
yanındaki ufak kareye tıklıyoruz. Gelen menüden "**Template Binding**"
komutunu verdikten sonra Blend bize ana kontrolün hangi özelliğinin
şablondaki bahsi geçen özelliğe bağlanacağını soruyor. Tabi biz de hemen
**Content** özelliğini seçiyoruz. Böylece **Label** kontrolünün
**Content** özelliğini şablonun içindeki **TextBlock'un** **Content**
özelliğine bağlamış olduk.

![Template tasarımı modundan
çıkalım.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_5.png)\
*Template tasarımı modundan çıkalım.*

Artık tasarımımızı tamamladığımızda göre şablon tasarım modundan çıkıp
ana uygulamaya geri dönebiliriz. Artık Label kontrolünün Content'ini
değiştirdiğinizde ayarladığınız görsellik içindeki Textblock'a
yerleştiğini görebilirsiniz. En güzel de yeni bir Label eklediğinizde
aynı şablonu kullanmasını sağlayabilirsiniz.

![Hazırladığımız şablonu istediğimiz Label kontrolünde
kullanabiliriz.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_6.png)\
*Hazırladığımız şablonu istediğimiz Label kontrolünde kullanabiliriz.*

Uygulamanıza yeni bir Label ekledikten sonra hazırladığınız şablonu bu
Label üzerinde de kullanmak istiyorsanız doğrudan söz konusu Label'a sağ
tuş ile tıklayarak gelen menünden "**Edit Control Parts / Apply
Resource**" diyerek şablonunuzu adı ile seçebilirsiniz. Böylece geri
dönüp bu şablonda bir değişiklik yaptığınızda birden çok Label'da
değişiklik yapmış olacaksınız. Merkezi yönetim :)

Yaptığımız tüm işlemlerin sonucunda aşağıdaki XAML kodu yaratılıyor.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication2.Page"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">controls</span><span
style="color: blue;">="clr-namespace:Microsoft.Windows.Controls;assembly=Microsoft.Windows.Controls"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**ControlTemplate**</span><span
style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Key**</span><span
style="color: blue;">**="DenemeSablon"**</span><span
style="color: red;"> TargetType</span><span
style="color: blue;">="controls:Label"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="50"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="200"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">              </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FF000000"/\></span>

<span style="color: #a31515;">              </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">GradientStop</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FFFFFFFF"</span><span
style="color: red;"> Offset</span><span
style="color: blue;">="1"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
TextWrapping</span><span style="color: blue;">="Wrap"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="17"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="45.348"</span><span style="color: red;">
Foreground</span><span style="color: blue;">="\#FFFFFFFF"</span><span
style="color: red;"> Text</span><span
style="color: blue;">="**{**</span><span
style="color: #a31515;">**TemplateBinding**</span><span
style="color: red;"> **Content**</span><span
style="color: blue;">}"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">**ControlTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
BorderBrush</span><span style="color: blue;">="\#FFFF0000"</span><span
style="color: red;"> BorderThickness</span><span
style="color: blue;">="10,0,5,0"</span><span style="color: red;">
**Template**</span><span style="color: blue;">**="{**</span><span
style="color: #a31515;">**StaticResource**</span><span
style="color: red;"> **DenemeSablon**</span><span
style="color: blue;">**}"**</span><span style="color: red;">
Content</span><span style="color: blue;">="Tamamen Denemedir"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kodda özellikle önemli olan birkaç nokta var. İlk olarak
nasıl olmuş da Label'ımız **UserControl.Resources** altındaki
**DenemeSablon** adlı şablona bağlanmış? **TemplateBinding'in** kodu
nasıl yazılmış? Tüm bunların cevaplarını kod içerisinde kalın yazılı
bölümlerde bulabilirsiniz.

**Label'a DataBinding nasıl yapılır?**

Bir Label'e neden **DataBind** yapmak isteyelim? Sonuçta sadece **Text**
göstermeyecek mi? Ve bu Text'in değişme şansı da yok ki
**TwoWayBinding** vs gereksin? Tüm bu soruların cevabı aslında
yukarıdaki **ControlTemplating** ile de alakalı. Bir **Label** düşünün
ki kendisine Bind edilmiş nesneye göre şekil alabiliyor? Ne dersiniz?

Bir önceki örneğimizden devam edelim. Varsayalım ki Label'ımızda bir
ürünün adını göstereceğiz fakat ürünün satış miktarına göre de Label'ın
arkasında Gradient'ın (Aslında Rectangle) şeffaflaşmasını veya görünür
olmasını istiyoruz. Bunun için ilk olarak gelin kontrolümüzün tasarımını
biraz değiştirelim.

![DataBind yapacağımız Label kontrolünün şablonunu biraz
değiştirdik.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_7.png)\
*DataBind yapacağımız Label kontrolünün şablonunu biraz değiştirdik.*

Sadece renklerde biraz değişiklik yaptık. Böylece arkadaki Rectangle
tamamen şeffaf olsa da yazı görünebilecek. Şimdi geçelim kod tarafına ve
bu Label'a nasıl veri bağlarız ona bakalım.

İlk olarak Label'a bağlayacağım Urun'ümüzün bir sınıf olarak programatik
anlamda tanımlamamız gerekiyor.

[**VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

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

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Satis { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

    }

Gördüğünüz üzere **Urun** sınıfımızın iki **Property'si** var. Bunlardan
ilki ürünün ismini saklayacak olan **Adi**, diğeri ise **Satis**
miktarı. Özellikle **Satis** Property'sinin **Double** olarak
tanımlandığına dikkat edelim. Herhangi bir **Convertor** kullanmadan bu
Property'si **Bind** edeceğimiz için **Opacity** ile uyumlu şekilde 1
ile 0 arasında **Double** değerler taşımalı.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Etiket.DataContext = <span style="color: blue;">New</span>
Urun() <span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Bir ürün adı"</span>, .Satis = 0.5}

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

    <span style="color: blue;">private</span> <span
style="color: blue;">void</span> Page\_Loaded(<span
style="color: blue;">object</span> sender,
System.Windows.RoutedEventArgs e)

    {

        Etiket.DataContext = <span style="color: blue;">new</span> Urun
{ Adi = <span style="color: #a31515;">"Bir ürün adı"</span>, Satis = 0.5
};

    }

Kodumuzda basit bir şekilde yeni bir ürün yaratarak **Etiket** adındaki
**Label** kontrolümüze **DataContext** özelliği üzerinden bağlıyoruz.
Peki **Adi** ve **Satis** Property'leri **Label** içerisinde neleri
etkileyecek? İşte bunun için ayrıca XAML tarafında ayarlar yapmamız
gerek.

![Rectangle'ın Opacity'sinin DataBinding ayarlarını
yapıyoruz.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_8.png)\
*Rectangle'ın Opacity'sinin DataBinding ayarlarını yapıyoruz.*

Blend tarafında Label kontrolünün şablonuna tekrar geri dönüyoruz. Daha
önce yarattığımız ControlTemplate'i açarak üzerinde değişiklikler
yapmamız gerekiyor. İlk olarak şablon içerisinde Rectangle'ı seçerek
**Properties** tabından Opacity'sinin yanında ufak kareye tıklıyoruz ve
gelen menüden "**Custom Expression**" komutunu seçiyoruz. Böylece artık
binding ile ilgili ayarı doğrudan el ile yazacağız.

![DataBinding için Custom Expression
yazıyoruz.](media/Silverlight_2_0_icerisinde_Toolkitten_Label_kontrolunun_kullanimi/18112008_9.png)\
*DataBinding için Custom Expression yazıyoruz.*

Yazdığımız Custom Expression ile artık **Label** kendi içindeki
Rectangle'ın **Opacity** değerinin kendisine verilen datadan geleceğini
ve bağlanması gereken Property'nin adının da **Satis** olduğunu
biliyoru. Aynı işlemi **ControlTemplate** içerisindeki **TextBlock**
için de yaparak bu sefer TextBlock'un **Content** özelliğini **Adi**
Property'sine **{Binding Adi}** Custom Expression'ı ile bağlamamız
gerek.

Tüm bu işlemleri yaptıktan sonra uygulamayı çalıştırdığınızda
bağladığınız verideki ürün adının TextBlock içerisine yerleştiğini ve
gelen satış bilgisine göre de arkadaki Rectangle'ın şeffaflığının
belirlendiğini görebilirsiniz. Böylece gelen veriye göre görselliğini
değiştiren bir Label tasarlamış olduk.

Hepinize kolay gelsin.


