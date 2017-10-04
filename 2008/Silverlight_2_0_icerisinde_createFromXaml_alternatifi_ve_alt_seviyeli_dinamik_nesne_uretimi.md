---
FallbackID: 2079
Title: Silverlight 2.0 içerisinde createFromXaml alternatifi ve alt seviyeli dinamik nesne üretimi
PublishDate: 7/6/2008
EntryID: Silverlight_2_0_icerisinde_createFromXaml_alternatifi_ve_alt_seviyeli_dinamik_nesne_uretimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: b703f1b0-7ec1-4e1e-8fad-6dcf825775e4
---
**Silverlight 1.0** içerisinde JavaScript tarafında sahip olduğumuz
createFromXaml metodu çoğu durumda işimizi kolaylaştırıyordu. Dinamik
olarak yaratmak istediğimiz nesnelerin XAML kodunu bir kereliğine Blend
ile yaratarak sonrasında söz konusu XAML kodunu programatik olarak
String tipinde değiştirip doğrudan **createFromXaml** metoduna
verdiğimizde istediğimiz tüm Silverlight nesnelerini gerekli özellikleri
ile beraber almış oluyorduk. **Silverlight 2.0** tarafında ise tüm
nesneler artık birer .NET nesnesi olduğuna göre aslında bu nesnelerin
yaratılarak sahneye yerleştirilmesi çok daha kolay gibi gözüküyor. Gelin
ufak bir örnek yaparak durumu inceleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">57</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">20,22,0,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">64</span>"<span
style="color: blue;"> </span><span
style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,1</span>"<span style="color: blue;">
</span><span style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

Tasarımcımız Expression Blend ile yukarıdaki gibi özünde çok basit olan
bir **Ellipse** tasarladığını düşünelim ve biz de bu Ellipse'in
yükseklik ve genişlik özelliklerini elimizdeki herhangi bir veriye bağlı
olmak şartı ile değiştirerek birden çok Ellipse yaratmaya çalışacağız.
Bu noktada Silverlight 1.0 içerisinde **createFromXaml** kullanırken SL
2.0 içerisinde .NET nesneleri şeklinde gerekli işlemleri yaparak
Ellipse'ler yaratmaya karar verirsek aşağıdaki kodu yazmamız gerekiyor.

**[VB]**

<span style="color: blue;">Dim</span> Daire <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Ellipse

Daire.Height = 57

Daire.HorizontalAlignment = HorizontalAlignment.Left

Daire.Margin = <span style="color: blue;">New</span> Thickness(20, 22,
0, 0)

Daire.VerticalAlignment = VerticalAlignment.Top

Daire.Width = 64

Daire.Stroke = <span style="color: blue;">New</span>
SolidColorBrush(Color.FromArgb(100, 0, 0, 0))

<span style="color: blue;">Dim</span> GradientFirca <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
LinearGradientBrush

GradientFirca.StartPoint = <span style="color: blue;">New</span>
Point(0.5, 0)

GradientFirca.EndPoint = <span style="color: blue;">New</span>
Point(0.5, 1)

<span style="color: blue;">Dim</span> GradStop <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
GradientStop

GradStop.Color = Color.FromArgb(100, 0, 0, 0)

GradientFirca.GradientStops.Add(GradStop)

GradStop = <span style="color: blue;">New</span> GradientStop

GradStop.Color = Color.FromArgb(100, 255, 255, 255)

GradStop.Offset = 1

GradientFirca.GradientStops.Add(GradStop)

Daire.Fill = GradientFirca

<span style="color: blue;">Me</span>.LayoutRoot.Children.Add(Daire)

**[C\#]**

Ellipse Daire = <span style="color: blue;">new</span> Ellipse();

Daire.Height = 57;

Daire.HorizontalAlignment = HorizontalAlignment.Left;

Daire.Margin = <span style="color: blue;">new</span> Thickness(20, 22,
0, 0);

Daire.VerticalAlignment = VerticalAlignment.Top;

Daire.Width = 64;

Daire.Stroke = <span style="color: blue;">new</span>
SolidColorBrush(Color.FromArgb(100, 0, 0, 0));

LinearGradientBrush GradientFirca = <span
style="color: blue;">new</span> LinearGradientBrush();

GradientFirca.StartPoint = <span style="color: blue;">new</span>
Point(0.5, 0);

GradientFirca.EndPoint = <span style="color: blue;">new</span>
Point(0.5, 1);

GradientStop GradStop = <span style="color: blue;">new</span>
GradientStop();

GradStop.Color = Color.FromArgb(100, 0, 0, 0);

GradientFirca.GradientStops.Add(GradStop);

GradStop = <span style="color: blue;">new</span> GradientStop();

GradStop.Color = Color.FromArgb(100, 255, 255, 255);

GradStop.Offset = 1;

GradientFirca.GradientStops.Add(GradStop);

Daire.Fill = GradientFirca;

<span style="color: blue;">this</span>.LayoutRoot.Children.Add(Daire);

Gördüğünüz gibi aslında her şeyi .NET kodumuz ile de yapabiliyoruz fakat
tasarımcının Blend içerisinde yapmış olduğu tasarımı yukarıdaki koda
çevirmek ciddi "işkence" kıvamında. Tabi ki tasarımcının sahneye koyduğu
nesnelerin özelliklerine tek tek erişerek .NET kodumuz ile
değiştirebiliriz fakat şu anda yapmak istediğim bu nesnelerden
programatik olarak birden çok yaratıp özelliklerini de ayarlayarak
sahneye yerleştirmek.

Çözümlerden ilki UserControl yapısı; eğer yaratacağınız nesnelerin
yapıları sabit ise yani büyük değişiklikler yoksa söz konusu yapıyı bir
UserControl olarak tasarlayarak belirli özelliklerini değiştirip sahneye
yerleştirebilirsiniz. Fakat bazı durumlardan UserControl yapısı da
gerekli esnekliği sağlayamayabiliyor. İşte böyle durumlarda yardımımıza
**System.Windows.Markup.XamlReader.Load** metodu yetişiyor. Bu metod
Silverlight 1.0'da alışık olduğumuz **createFromXaml** metodu ile
birebir aynı mantıkta çalışıyor. Parametre olarak aldığı String XAML
kodundan bize Silverlight nesneleri yaratarak geri döndürüyor. Şimdi de
aşağıdaki şekilde XAML kodumuzun dinamik olarak yaratıp Silverlight
nesnemizi oluşturalım.

**[VB]**

<span style="color: blue;">Dim</span> EllipseXAML = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse</span> <span style="color: #b96464;">
**xmlns**</span><span style="color: #6464b9;">**=**</span><span
style="color: #555555;">**"**</span><span
style="color: #6464b9;">**http://schemas.microsoft.com/winfx/2006/xaml/presentation**</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Height</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">57</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">HorizontalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Left</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Margin</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">20,22,0,0</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">VerticalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Top</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Width</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">64</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Stroke</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                      <span style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                          <span style="color: #6464b9;">\<</span><span
style="color: #844646;">LinearGradientBrush</span> <span
style="color: #b96464;">EndPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,1</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">StartPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,0</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                              <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                              <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FFFFFFFF</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Offset</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">1</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                          <span style="color: #6464b9;">\</</span><span
style="color: #844646;">LinearGradientBrush</span><span
style="color: #6464b9;">\></span>

                      <span style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                  <span style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse</span><span
style="color: #6464b9;">\></span>

**[C\#]**

<span style="color: blue;">string</span> EllipseXAML = <span
style="color: #a31515;">"\<Ellipse
**xmlns=\\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\\"**
Height=\\"57\\" Visibility=\\"Collapsed\\"
HorizontalAlignment=\\"Left\\" Margin=\\"20,22,0,0\\"
VerticalAlignment=\\"Top\\" Width=\\"64\\"
Stroke=\\"\#FF000000\\"\>"</span> +

                        <span
style="color: #a31515;">"\<Ellipse.Fill\>"</span> +

                            <span
style="color: #a31515;">"\<LinearGradientBrush EndPoint=\\"0.5,1\\"
StartPoint=\\"0.5,0\\"\>"</span> +

                                <span
style="color: #a31515;">"\<GradientStop
Color=\\"\#FF000000\\"/\>"</span> +

                                <span
style="color: #a31515;">"\<GradientStop Color=\\"\#FFFFFFFF\\"
Offset=\\"1\\"/\>"</span> +

                            <span
style="color: #a31515;">"\</LinearGradientBrush\>"</span> +

                        <span
style="color: #a31515;">"\</Ellipse.Fill\>"</span> +

                    <span style="color: #a31515;">"\</Ellipse\>"</span>;

XAML kodumuzu VB veya C\# kod tarafına alıp
**System.Windows.Markup.XamlReader.Load** ile kullanacağımız zaman
kopyaladığımız XAML kodu içerisinde kullanılan tüm XML namespace
tanımlamalarını ana XAML dosyasından kopyalamış olmamız gerekiyor.
Yukarıdaki kodlarda kalın yazılı kısımlar bu şekilde kopyalanmıştır.

LINQ ile beraber VB içerisinde "inline XML" yapısı geliyor, bu yapıyı
Silverlight içerisinde de kullanabiliyoruz. Bunun için tek yapmamız
gereken Silverlight projemize sağ tuş tıklayarak "Add Reference" diyip
**System.XML.Linq** kütüphanesini projemize eklemek. Böylece artık
tasarımcının Blend içerisinde düzenlemiş olduğu XAML kodunu doğrudan
Silverlight içerisinde VB dosyamıza kopyalayabiliriz. C\# içerisinde ise
XAML kodumuzu bir string değişkene aktarabilmek için bolca escape char
kullanmamız gerekiyor.

Sıra geldi yarattığımız XAML kodu içerisinde istediğimiz özellikleri
değiştirmeye. VB içerisinde yarattığımız değişken doğrudan XAML aldığı
ve bir XElement nesnesi oluşturduğu için XML içerisindeki özelliklere
rahatlıkla ulaşabiliyoruz.

**[VB]**

EllipseXAML.<span style="color: #6464b9;">@</span>Width = 300

Maalesef C\# içerisinde böyle bir şansımız yok. Bir seçenek olarak C\#
içerisinde tüm XAML kodunu harici bir dosyada tutup söz konusu harici
dosyayı bir XML dosyasıymış gibi XDocument olarak yükleyerek kullanmak
olabilir. Yukarıdaki şekliyle özelliklere doğrudan ulaşmanın yanı sıra
istersek XAML kodunun içerisine ilk tanımlama esnasında da
yerleştirebiliriz.

**[VB]**

<span style="color: blue;">Dim</span> Yukseklik <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 57

<span style="color: blue;">Dim</span> EllipseXAML = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse</span> <span
style="color: #b96464;">xmlns</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Height</span><span
style="color: #6464b9;">=</span><span
style="color: #555555; background: #fffebf;">\<%=</span> Yukseklik <span
style="color: #555555; background: #fffebf;">%\></span> <span
style="color: #b96464;">HorizontalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Left</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Margin</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">20,22,0,0</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">VerticalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Top</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Width</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">64</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Stroke</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                      <span style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                          <span style="color: #6464b9;">\<</span><span
style="color: #844646;">LinearGradientBrush</span> <span
style="color: #b96464;">EndPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,1</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">StartPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,0</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                              <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                              <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FFFFFFFF</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Offset</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">1</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                          <span style="color: #6464b9;">\</</span><span
style="color: #844646;">LinearGradientBrush</span><span
style="color: #6464b9;">\></span>

                      <span style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                  <span style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse</span><span
style="color: #6464b9;">\></span>

**[C\#]**

<span style="color: blue;">int</span> Yukseklik = 57;

<span style="color: blue;">string</span> EllipseXAML = <span
style="color: #a31515;">"\<Ellipse
xmlns=\\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\\"
Height=\\""</span> + Yukseklik + <span style="color: #a31515;">"\\"
HorizontalAlignment=\\"Left\\" Margin=\\"20,22,0,0\\"
VerticalAlignment=\\"Top\\" Width=\\"64\\"
Stroke=\\"\#FF000000\\"\>"</span> +

                        <span
style="color: #a31515;">"\<Ellipse.Fill\>"</span> +

                            <span
style="color: #a31515;">"\<LinearGradientBrush EndPoint=\\"0.5,1\\"
StartPoint=\\"0.5,0\\"\>"</span> +

                                <span
style="color: #a31515;">"\<GradientStop
Color=\\"\#FF000000\\"/\>"</span> +

                                <span
style="color: #a31515;">"\<GradientStop Color=\\"\#FFFFFFFF\\"
Offset=\\"1\\"/\>"</span> +

                            <span
style="color: #a31515;">"\</LinearGradientBrush\>"</span> +

                        <span
style="color: #a31515;">"\</Ellipse.Fill\>"</span> +

                    <span style="color: #a31515;">"\</Ellipse\>"</span>;

Yukarıdaki kod içerisinde yarattığımız bir Integer değişkenin değerini
kendi XAML kodumuzdaki Elipse'in yüksekliğine atıyoruz. VB içerisinde bu
işlemi yine **Inline XML** tekniğini kullanarak yaparken C\# içerisinde
standart **string** işlemi olarak ilerlememiz gerekiyor.

Son olarak sıra geldi elimizdeki bu XAML kodundan nesnemizi yaratarak
sahneye yerleştirmeye.

**[VB]**

<span style="color: blue;">Dim</span> BirElips =
System.Windows.Markup.XamlReader.Load(EllipseXAML.ToString)

<span style="color: blue;">Me</span>.LayoutRoot.Children.Add(BirElips)

**[C\#]**

<span style="color: blue;">var</span> BirElips =
System.Windows.Markup.XamlReader.Load(EllipseXAML);

<span
style="color: blue;">this</span>.LayoutRoot.Children.Add((UIElement)BirElips);

Örneğimizi tamamladık. Fakat eğer bir veriye bağlı olarak birden çok
nesne yaratacak olsak nasıl olurdu? Hemen minik bir örnek ile onu da
inceleyelim. Farklı yüksekliklerden birden çok Ellipse yaratabilmek için
elimizdeki yüksekliklerin bir listesinin dizi olarak bulunduğunu
varsayalım.

**[VB]**

<span style="color: blue;">Dim</span> Yukseklik() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= {57, 67, 80}

<span style="color: blue;">Dim</span> EllipseXAML = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Canvas</span> <span
style="color: #b96464;">xmlns</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                      <span
style="color: #555555; background: #fffebf;">\<%=</span> <span
style="color: blue;">From</span> GelenVeri <span
style="color: blue;">In</span> Yukseklik <span
style="color: blue;">Select</span> <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse</span> <span
style="color: #b96464;">xmlns</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Height</span><span
style="color: #6464b9;">=</span><span
style="color: #555555; background: #fffebf;">\<%=</span> GelenVeri <span
style="color: #555555; background: #fffebf;">%\></span> <span
style="color: #b96464;">HorizontalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Left</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Margin</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">20,22,0,0</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">VerticalAlignment</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">Top</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Width</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">64</span><span style="color: #555555;">"</span>
<span style="color: #b96464;">Stroke</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                                                                <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                                                                   
<span style="color: #6464b9;">\<</span><span
style="color: #844646;">LinearGradientBrush</span> <span
style="color: #b96464;">EndPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,1</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">StartPoint</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">0.5,0</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">\></span>

                                                                       
<span style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FF000000</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                                                                       
<span style="color: #6464b9;">\<</span><span
style="color: #844646;">GradientStop</span> <span
style="color: #b96464;">Color</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">\#FFFFFFFF</span><span
style="color: #555555;">"</span> <span
style="color: #b96464;">Offset</span><span
style="color: #6464b9;">=</span><span
style="color: #555555;">"</span><span
style="color: #6464b9;">1</span><span
style="color: #555555;">"</span><span style="color: #6464b9;">/\></span>

                                                                   
<span style="color: #6464b9;">\</</span><span
style="color: #844646;">LinearGradientBrush</span><span
style="color: #6464b9;">\></span>

                                                                <span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse.Fill</span><span
style="color: #6464b9;">\></span>

                                                            <span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Ellipse</span><span
style="color: #6464b9;">\></span> <span
style="color: #555555; background: #fffebf;">%\></span>

                  <span style="color: #6464b9;">\</</span><span
style="color: #844646;">Canvas</span><span
style="color: #6464b9;">\></span>

<span style="color: blue;">Dim</span> BirElips =
System.Windows.Markup.XamlReader.Load(EllipseXAML.ToString)

        <span
style="color: blue;">Me</span>.LayoutRoot.Children.Add(BirElips)

VB programcıları için biraz yeni bir yapı olduğu için ilk önce
yukarıdaki VB kodumuzu inceleyelim. Her zamanki gibi yine VB içerisinde
inline XML özelliklerinden faydalanıyoruz. Birden çok Ellipse'i doğrudan
**XamlReader.Load**'a verme şansımız yok. XamlReader aynı SL 1.0'daki
**createFromXaml'da** olduğu gibi sadece tek bir nesne geri
döndürebiliyor. O nedenle tüm Ellipse'lerimizi bir Canvas içerisine
yerleştiriyoruz. XamlReader bize içerisinde Ellipse'lerin bulunduğu
**Canvas** nesnesini geri döndürecek. VB kodumuzda Canvas XML tagları
arasında \<%=%\> işaretleri içerisinde bir LINQ sorgusu görüyorsunuz. Bu
sorgu kodumuzun en üstündeki veri kaynağımız olan **Yukseklik** dizisini
sorgulayarak kayıtları alıyor. Alınan her kayıt için yapılan **Select**
işleminde ise geriye bir XML döndürülüyor. Doğal olarak bu XML bizim
Ellipse'in XAML kodu olacak. Tüm bu işlemleri yaparken **Select**
esnasında yarattığımız XAML'ın yüksekliğine de sorgunun çalıştığı
satırdaki değeri, yani dizinin içerisindeki değeri yükseklik olarak
atıyoruz. Böylece sorgumuz geriye yükseklikleri veri kaynağından
alınarak ayarlanmış bir Ellipse serisini XML olarak döndürüyor. Bu dönen
değeri Canvas tagları arasına alarak doğrudan EllipseXAML değişkenimize
aktarıyoruz. İşlem tamam.

**[C\#]**

<span style="color: blue;">int</span>[] Yukseklik = {57, 67, 87};

 

<span style="color: blue;">string</span> EllipseXAML = <span
style="color: #a31515;">"\<Canvas
xmlns=\\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\\"\>"</span> +

                        <span
style="color: blue;">string</span>.Join(<span
style="color: #a31515;">""</span>, (<span
style="color: blue;">from</span> GelenVeri <span
style="color: blue;">in</span> Yukseklik

                                            select <span
style="color: #a31515;">"\<Ellipse
xmlns=\\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\\"
Height=\\""</span> + GelenVeri + <span style="color: #a31515;">"\\"
HorizontalAlignment=\\"Left\\" Margin=\\"20,22,0,0\\"
VerticalAlignment=\\"Top\\" Width=\\"64\\"
Stroke=\\"\#FF000000\\"\>"</span> +

                                                <span
style="color: #a31515;">"\<Ellipse.Fill\>"</span> +

                                                    <span
style="color: #a31515;">"\<LinearGradientBrush EndPoint=\\"0.5,1\\"
StartPoint=\\"0.5,0\\"\>"</span> +

                                                        <span
style="color: #a31515;">"\<GradientStop
Color=\\"\#FF000000\\"/\>"</span> +

                                                        <span
style="color: #a31515;">"\<GradientStop Color=\\"\#FFFFFFFF\\"
Offset=\\"1\\"/\>"</span> +

                                                    <span
style="color: #a31515;">"\</LinearGradientBrush\>"</span> +

                                                <span
style="color: #a31515;">"\</Ellipse.Fill\>"</span> +

                                            <span
style="color: #a31515;">"\</Ellipse\>"</span>).ToArray()) +

                                            <span
style="color: #a31515;">"\</Canvas\>"</span>;

var BirElips = System.Windows.Markup.XamlReader.Load(EllipseXAML);

<span
style="color: blue;">this</span>.LayoutRoot.Children.Add((UIElement)BirElips);

C\# kodumuza baktığımızda ise "inline XML" desteği olmadığı için yine
String üzerinden gitmek durumunda kalıyoruz. XamlReader'a verilmek üzere
tüm Ellipse'lerimizi ana bir Canvas içerisine alırken Ellipse üretimi
için LINQ'ın sorgularının yardımını istiyoruz. C\# içerisinde LINQ
sorgumuz gerekli değerleri de XML içerisine yerleştirerek bir string
dizisi üretiyor. Son olarak elde ettiğimiz XAML kodundan nesnelerimizi
yaratıp sahneye yerleştiriyoruz.

**Sonuç**

Yukarıdaki teknikler ile farklı uygulamalarında tüm Silverlight
nesnelerini en alt seviyeden müdahale ederek XAML üzerinden
üretebilirsiniz. Fakat unutmamakta fayda var ki bu tarz yazılmış
uygulamaların sonradan değiştirilmesi, yönetilmesi çok zor olacaktır.
Örneğin tasarımcı yukarıdaki örneklerdeki Ellipse'in tasarımını
değiştirmeye karar vermesi programcı sanırım intihara epeyce
yaklaşacaktır. O nedenle XamlReader.Load tekniği olabildiğince en zor
durumlarda, en sıkıştığınız anlarda kullanmakta fayda var. Normal
şartlarda UserControl yapıları çoğu zaman gerekli çözümü sunacak ve daha
rahat bir çalışma ortamı sağlayacaktır.

Hepinize kolay gelsin...


