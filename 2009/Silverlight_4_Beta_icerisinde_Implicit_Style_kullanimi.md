---
FallbackID: 2453
Title: Silverlight 4 Beta içerisinde Implicit Style kullanımı
PublishDate: 21/11/2009
EntryID: Silverlight_4_Beta_icerisinde_Implicit_Style_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 138d7aa7-feeb-497c-8bac-881d9d9d8d0f
---
Silverlight içerisinde bir uygulamanın arayüzünü temalaştırmak için
bugüne kadar uyguladığımız yöntem hazır bir temayı harici bir Resource
dosyasında tutmaktı. Böylece istediğimiz zaman Resource dosyasını
değiştirerek uygulama temasını da değiştirmiş oluyorduk. Bu işlemi
programatik olarak yapmak ise apayrı bir dertti. Farkındaysanız hep
geçmiş zaman kullandım :) Bunun nedeni Silverlight 4 ile beraber
hikayenin biraz değişiyor olması. Silverlight 4 ile beraber rahatlıkla
Implicit Style yapıları kullanabiliyorsunuz. Yani artık UIElement
ağacının en üst noktasında bir yerde tanımladığınız bir stil otomatik
olarak tüm alttaki nesneleri etkileyebiliyor ve bu mekanizma kontrol
tipine özel olarak uygulanabiliyor.

Sözün özü; artık isterseniz bir Silverlight uygulamasında tüm
Button'lara otomatik olarak uygulanabilecek bir stili hiç uğraşmadan
uygulama geliştirildikten sonra bile App.XAML içerisinde
tanımlayabiliyorsunuz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication10.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

   <span style="color: red;"> mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span>

   <span style="color: red;"> d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="300"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="400"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span style="color: red;">
Orientation</span><span style="color: blue;">="Horizontal"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki örnek uygulamamızda iki ayrı StackPanel içerisinde ikişer
TextBox var. İstediğimiz şey çok ta uğraşmadan tüm bu Textbox'ların fon
rengini global olarak değiştirmek. Bunun için hızlı bir şekilde
App.XAML'a giderek yeni bir stil tanımlayabiliriz.

**[App.XAML]**

\<Application
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

            xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

            x:Class="SilverlightApplication10.App"

            \>

<span class="style1_20112009">    \<Application.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Style</span><span style="color: red;">
TargetType</span><span style="color: blue;">="TextBox"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Setter</span><span style="color: red;">
Property</span><span style="color: blue;">="Background"</span><span
style="color: red;"> Value</span><span
style="color: blue;">="Red"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Style</span><span style="color: blue;">\></span>

    \</Application.Resources\>

<span class="style1_20112009">\</Application</span><span
style="color: blue;">\></span>

Tanımladığımız bu Stil için bir Key (Ad) vermediğimizi özellikle
belirtmek istiyorum. Herhangi bir ad vermediğimiz anda artık Stillerimiz
kendi TargetType'larına göre her kontrolü bulup etkileyebiliyorlar.
Böylece artık bu Silverlight uygulaması içerisindeki tüm TextBox'ların
fon rengi kırmızı olmuş oldu.

Diğer yandan tüm uygulama bazında genel stiller ayarlayabileceğimiz gibi
uygulama içerisinde bölgesel olarak da Implicit Style kullanabiliriz.

**[XAML]**

\<UserControl x:Class="SilverlightApplication10.MainPage"

   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

   xmlns:d="http://schemas.microsoft.com/expression/blend/2008"

  
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"

   mc:Ignorable="d"

   d:DesignHeight="300" d:DesignWidth="400"\>

 

    \<Grid x:Name="LayoutRoot" Background="White"\>

        \<StackPanel Orientation="Horizontal"\>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Style</span><span style="color: red;">
TargetType</span><span style="color: blue;">="TextBox"\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Setter</span><span style="color: red;">
Property</span><span style="color: blue;">="Background"</span><span
style="color: red;"> Value</span><span
style="color: blue;">="Blue"/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Style</span><span style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Style</span><span style="color: red;">
TargetType</span><span style="color: blue;">="TextBox"\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Setter</span><span style="color: red;">
Property</span><span style="color: blue;">="Background"</span><span
style="color: red;"> Value</span><span
style="color: blue;">="Yellow"/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Style</span><span style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

        \</StackPanel\>

    \</Grid\>

<span class="style1_20112009">\</UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki örnekte ayrı StackPanel'ler içerisinde ayrı birer Stil
bulunuyor. Bu stiller de kendi içlerinde bulundukları StackPanel
içerisindeki tüm TextBox'ları etkileyeceklerdir. Uygulama bazında
ayarladığımız global stil maalesef artık bu StackPanel'ler içerisinde
geçerli olmayacaktır. Hem global hem local stillerimiz hedef
kontrollerin aynı Property'lerini değiştirmeye çalıştıkları için
çakışıyorlar ve en alt seviyedeki geçerli oluyor. Fakat bu noktada özel
bir noktaya dikkat çekmek gerek. Bu stiller aynı Property'leri
etkilemeseydi de çakışacaklardır. Yani en üstte **Background**
değiştiren alt seviyede de **ForeGround** değiştiren bir stiliniz olursa
alt seviyedeki stil üsttekini ezeceği için üsttekinin Background ayarı
artık alt seviyedeki stilin altındakilere etkilemeyecektir. Yani
anlayacağınız çakışma **Property** bazlı değil stil bazı ve maalesef
stiller üst üste bindirilemiyorlar. **BasedOn** Style yapısı Key
verilmiş bir stil üzerinden kullanılabilse de şu anda Key verilmemiş
stiller arasında kullanılamıyorlar.

**Expression Blend desteği tam gaz devam!**

Malum söz konusu stiller ve tasarım olunca Expression Blend'den vaz
geçilemez. Bu noktada Implicit Style desteği Expression Blend'in .NET
4.0 Preview sürümünde de geliyor. Böylece tasarımcılar da rahatlıkla
Implicit Style yapıları oluşturabiliyorlar.

![Expression Blend içerisinde Implicit Style
yapıları.](media/Silverlight_4_Beta_icerisinde_Implicit_Style_kullanimi/20112009_1.png)\
*Expression Blend içerisinde Implicit Style yapıları.*

Blend içerisinde mantık da tamamen aynı. Herhangi bir kontrol üzerinden
Template veya Stil editlediğinizde karşınıza gelen diyalogta artık bir
de "**Apply to all**" seçeneği bulunuyor. Bu seçeneği kullandığınızda
tabi ki stile bir isim veremiyorsunuz ve stili yarattığınız kontrolden
itibaren her noktayı etkiliyor. Stili yaratırken hangi kontrol üzerinden
etkilemeye başlayacağına karar vermek için stili nereye kaydedeceğinizi
karar vermeniz yeterli. Yani "**Define in**" kısmında hali hazırda
üzerinde çalıştığınız dokümandan bir kontrol seçebilir veya
**Application** diyerek uygulama genelini de belirtebilirsiniz.

Implicit Style'lar ile beraber artık hazır SL projelerinin tasarımını
değiştirmek çok daha kolay bir hal aldı. Aynı şekilde temalar uygulamak
da bir o kadar basitleşti.

Hepinize kolay gelsin.


