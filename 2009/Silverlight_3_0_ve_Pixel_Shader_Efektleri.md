---
FallbackID: 2356
Title: "Silverlight 3.0 ve Pixel Shader Efektleri"
date: "2009-4-24"
EntryID: Silverlight_3_0_ve_Pixel_Shader_Efektleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 71093404-f9f0-4af1-8a3d-1129d0670ba8
---
Pixel Shader efektleri genelde oyun programcılarının duyduğu fakat web
veya windows programcılarının pek de haşır neşir olmadıkları bir
alandır. Tabi bunun birçok nedeni var; Pixel Shader efektleri **HLSL**
(High Level Shading Language) denilen  farklı bir dil ile yazılarak
DirectX'in SDK'sı ile beraber gelen bir compiler ile kullanılabilir hale
geliyor. Her ne kadar HLSL C tabanlı dillere benzese de özünde esas
problem bu efektlerin kullanılacağı ortamların azlığıydı.

Bundan yaklaşık 9 ay önce WPF'e SP1 ile beraber Pixel Shader
efektlerinin gelmesi sonrasında sizlerle bu konuda [bir
yazı](http://daron.yondem.com/tr/post/9c4b31d1-b7d5-4b39-a636-be1b53029f53)
paylaşmıştım. Bugün ise konumuz Silverlight içerisinde Pixel Shader
efeklerinin kullanımı. Silverlight 3.0 ile beraber artık istediğiniz bir
Pixel Shader efektini herhangi bir UIElement yani kontrole rahatlıkla
uygulayabiliyorsunuz. Hatta bu konuda Runtime ile beraber gelen hazır
iki efekt bulunuyor; **DropShadow** ve **Blur**.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span>

           <span style="color: red;"> Content</span><span
style="color: blue;">="TIKLA"</span>

           <span style="color: red;"> Height</span><span
style="color: blue;">="100"</span>

           <span style="color: red;"> Width</span><span
style="color: blue;">="100"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**BlurEffect**</span>

                   <span style="color: red;"> Radius</span><span
style="color: blue;">="10" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu içerisinde gördüğünüz üzere basit bir **Button**
nesnesine **Blur** efekti vermek aslında gerçekten çok kolay. Blur
efektinin piksellere uygulanırken ne kadar uygulanacağı ile ilgili bir
de yarıçap verebiliyoruz. Her efektin kendine göre farklı parametreleri
olabiliyor. Verilen bu efektler tamamen gerçek zamanlı olarak
uygulandığı için gerektiğinde kod ile yaratılabilir ve kontrol
edilebilirler.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span>

               <span style="color: red;"> Content</span><span
style="color: blue;">="TIKLA"</span>

               <span style="color: red;"> Height</span><span
style="color: blue;">="100"</span>

               <span style="color: red;"> Width</span><span
style="color: blue;">="100"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BlurEffect</span>

                       <span style="color: red;"> **x**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**Name**</span><span
style="color: blue;">**="btnBlur"**</span>

                       <span style="color: red;"> **Radius**</span><span
style="color: blue;">="10" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Slider</span>

               <span style="color: red;"> Minimum</span><span
style="color: blue;">="0"</span>

               <span style="color: red;"> Margin</span><span
style="color: blue;">="10"</span>

               <span style="color: red;"> Value</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
**Radius**</span><span style="color: blue;">,</span><span
style="color: red;"> ElementName</span><span
style="color: blue;">=**btnBlur**,</span><span style="color: red;">
Mode</span><span style="color: blue;">=TwoWay}" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

Hali hazırda herhangi bir efektin farklı özelliklerine animasyonlar
uygulayabileceğiniz gibi isterseniz bu özellikleri yine Silverlight 3.0
ile beraber yeni gelen
[ElementBinding](http://daron.yondem.com/tr/post/ad1bc507-f86a-4fa2-94e4-a45e28c6619d)
sistemini kullanarak editlenebilir hale de getirebilirsiniz. Yukarıdaki
örneğimizde özellikle gidip **BlurEffect** nesnemize **btnBlur** ismini
veriyoruz. Böylece artık bu efektin özelliklerine hem programatik olarak
hem de farklı Binding'lerde rahatlıkla ulaşabiliriz.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="BlurOL"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimation</span>

               <span style="color: red;"> Duration</span><span
style="color: blue;">="00:00:01.000"</span>

               <span style="color: red;"> From</span><span
style="color: blue;">="0"</span>

               <span style="color: red;"> To</span><span
style="color: blue;">="10"</span>

               <span style="color: red;">
Storyboard.TargetName</span><span style="color: blue;">="btnBlur"</span>

               <span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(BlurEffect.Radius)" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

Örneğimizdeki **BlurEffect** nesnesinin **Radius** özelliğini hedef alıp
anime eden bir animasyonun XAML kodunu yukarıda inceleyebilirsiniz. Söz
konusu animasyon çalıştırıldığında düğmemiz bir saniye içerisinde
yavaşça netliğini kaybediyor.

**Peki hepsi bu kadar mı?**

DropShadow ve Blur efektleri sadece hazır gelenler. Oysa esas güzellik
bizim de kendi Pixel Shader efektlerimizi yazabiliyor olmamız. Tabi
bunun için öncesinde bilgisayarınıza DirectX SDK'sını yüklemeniz ve SDK
içerisindeki **fxc** aracını kullanabiliyor olmanız şart. Kabaca
aşağıdaki komutlar ile yazmış olduğunuz bir PixelShader **FX** dosyasını
**PS** dosyasına compile edebilirsiniz.

fxc /T ps\_2\_0 /Fo DaronEfekt.ps DaronEfekt.fx

Eğer bilgisayarınıza DirectX SDK'sını yüklemek istemiyorsanız aşağıdaki
adresteki Silverlight uygulamasını kullanarak PS dosyaları
hazırlayabilirsiniz. Sayfa açıldığında karşınıza çıkan ilk kutucuğa
almak istediğiniz PS dosyasının adını, ikinci kutucuğa ise HLSL kodunu
koymanız yeterli olacaktır. Sistem otomatik olarak PS dosyasını compile
edip download linki sunacaktır.

<http://www.voxpeeps.com/slpixelshadercompiler/>

**Pixel Shader efekti nasıl yazılır?**

Bu makalenin amacı Pixel Shader nasıl yazılır sorusuna cevap vermek
olmadığı gibi ben de kişisel anlamda bir Pixel Shader uzmanı sayılmam. O
nedenle olabildiğince basit bir şekillde kabaca konunun üzerinden
geçeceğiz.

**[HLSL]**

sampler2D input : register(s0);

float4 main(float2 uv : TEXCOORD) : COLOR

{

    float4 Color;

    Color = tex2D( input , uv.xy);

    Color.r=1;

    <span style="color: blue;">return</span> Color;

}

Yukarıda gördüğünüz Pixel Shader efektinin yaptığı tek şey kendisine
verilen piksellerdeki kırmızı renk değerini maksimuma çekmek. **input**
parametresi üzerinden piksel bilgisi, yani bir anlamda boyama fırçası
gelirken **uv** parametresi ise offset koordinatları içeriyor. X ve Y
koordinatı olarak gelen bu bilgiler 0 ile 1 arasında oluyor. Yani özünde
tüm koordinatlar 0,0 ile 1,1 arasında diyebiliriz. Tüm bu bilgiler
üzerinden fırçamızdaki uygun koordinatlardaki rengi almak için ise
text2D metodunu kullanabiliyoruz. Elimize geçen renk değişkeni ARGB
değerleri olan klasik bir Color nesnesi olarak geliyor. Böylece biz hem
renk hem de koordinatlar üzerinden rahatlıkla oynama yapabiliyoruz.

Yukarıdaki efekt kendi içinde bir değer alarak kırmızı rengini 1 olarak
eşitliyor. Oysa biz bu değerin yeri geldiğinde bu efekte parametrik
olarak gönderilmesini de isteyebiliriz. Böyle durumlarda PixelShader
kodumuzda söz konusu parametreyi de tanımlamamız şart.

**[HLSL]**

sampler2D input : register(s0);

<span style="color: blue;">int</span> kirmizilik : register(c0);

 

float4 main(float2 uv : TEXCOORD) : COLOR

{

    float4 Color;

    Color = tex2D( input , uv.xy);

 

    Color.r=kirmizilik;

    <span style="color: blue;">return</span> Color;

}

Değişkenimizi tanımlarken register ettiğimiz c0 noktasına dikkat. Bu
nokta üzerinden söz konusu parametreye Silverlight tarafından da
ulaşabileceğiz. Eğer farklı parametreler tanımlayaracak c1, c2 şeklinde
devam edebilirsiniz. Gelin daha detalara girip makalemizi bir HLSL
makalesine çevirmeden PixelShader efektimizin Silverlight tarafındaki
kullanım şekline göz atalım.

**PS dosyamızı Silverlight ile nasıl kullanırız?**

PS dosyasını ilk olarak Silverlight projenize sağ tıklayarak gelen
menüden "Add / Existing Item" diyerek eklemeniz gerekiyor. Sonrasında
söz konusu PS dosyasını Solution Explorer içerisinde seçili tutup Visual
Studio'nun Properties paneline geçerseniz **Build Action** adında bir
özellik göreceksiniz. Söz konusu özelliğe "Content" değerini vererek PS
dosyasının XAP içerisine alınmasını sağlayabilirsiniz. Eğer bu şekilde
bir ayarlama yapmazsanız PS dosyası projede kalır fakat XAP dosyasına
eklenmez ve uygulamanız da söz konusu Shader efektini kullanamaz.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> DaronEfekti

    <span style="color: blue;">Inherits</span> Effects.ShaderEffect

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        <span style="color: blue;">Dim</span> YeniEfekt <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Effects.PixelShader

        YeniEfekt.UriSource = <span style="color: blue;">New</span>
Uri(<span style="color: #a31515;">"DaronEfekt.ps"</span>,
UriKind.Relative)

        <span style="color: blue;">Me</span>.PixelShader = YeniEfekt

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">DaronEfekti</span> :
System.Windows.Media.Effects.<span
style="color: #2b91af;">ShaderEffect</span>

    {

        <span style="color: blue;">public</span> DaronEfekti()

        {

            System.Windows.Media.Effects.<span
style="color: #2b91af;">PixelShader</span> YeniEfekt = <span
style="color: blue;">new</span> System.Windows.Media.Effects.<span
style="color: #2b91af;">PixelShader</span>();

            YeniEfekt.UriSource = <span style="color: blue;">new</span>
<span style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"DaronEfekt.ps"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative);

            <span style="color: blue;">this</span>.PixelShader =
YeniEfekt;

        }

    }

Yukarıdaki kodlar içerisinde de görebileceğiniz üzere kendi **Shader**
efektimizi yaratırken Silverlight ile beraber gelen **ShaderEffect**
sınıfını inherit ediyoruz. Bu sınıfın kendi içerisinde zaten mevcut bir
PixelShader Property'si var. Söz konusu Property'ye biz de kendi
**PixelShader** efektimizi yaratarak veriyoruz. Kendi **PixelShader**
efektimizi yaratırken de **UriSource** olarak Silverlight projemize
eklediğimiz PS dosyasının relatif yolunu vermeyi unutmuyoruz. Aslında
basit bir şekilde Silvelright için PixelShader efektimizi yaratma
işlemini bitirdik fakat unutmayın ki bizim efektin bir de ekstra
parametresi vardı. İşte bu parametre için Silverlight tarafında da bir
**Dependancy Property** tanımlamamız gerekiyor. Özellikle Dependancy
Property yaratmamızın nedeni aslında bu Property üzerinden gerektiğinde
StoryBoard'ların da animasyon yapabilmesini sağlamak.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Kirmizilik() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">Me</span>.GetValue(KirmiziProperty)

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

            <span
style="color: blue;">Me</span>.SetValue(KirmiziProperty, value)

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Shared</span> <span
style="color: blue;">ReadOnly</span> KirmiziProperty <span
style="color: blue;">As</span> DependencyProperty = \_

    DependencyProperty.Register(<span
style="color: #a31515;">"Kirmizilik"</span>, <span
style="color: blue;">GetType</span>(<span
style="color: blue;">Double</span>), \_

                                <span
style="color: blue;">GetType</span>(DaronEfekti), \_

                                <span style="color: blue;">
**New**</span> **PropertyMetadata(0.0,
PixelShaderConstantCallback(0)))**

**[C\#]**

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Kirmizilik

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: blue;">double</span>)GetValue(KirmiziProperty); }

            <span style="color: blue;">set</span> {
SetValue(KirmiziProperty, <span style="color: blue;">value</span>); }

        }

 

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> KirmiziProperty =

            <span
style="color: #2b91af;">DependencyProperty</span>.Register(<span
style="color: #a31515;">"Kirmizilik"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: blue;">double</span>), <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">DaronEfekti</span>), <span style="color: blue;">
**new**</span> <span
style="color: #2b91af;">**PropertyMetadata**</span>**(0.0,
PixelShaderConstantCallback(0)**));

Yukarıdaki kodların normal bir Dependancy Property'den tek farkı
**Metadata** kısmı! İşte tam da bu noktada bir
**PixelShaderConstantCallback** görüyoruz. Söz konusu Callback nesnesine
parametre olarak PixelShader HLSL kodumuzu yazarken parametremize
verdiğimiz c0'ın sayısal kısmını veriyoruz :) Artık herşey hazır. Sıra
geldi bu efektimizi XAML içerisinde kullanmaya.

**Efektimizi tepe tepe kullanalım :)**

Efektimizi kullanabilmek için ilk aşamada XAML tarafında uygulamamızın
assemblysini bir XML namespace olarak tanımlıyoruz. Sonrasında söz
konusu namespace üzerinden rahatlıkla efektimizi herhangi bir nesneye
atayabiliyoruz. Tabi bu işlemleri C\# veya VB kodu ile de yapabiliriz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span>

   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication21.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">daron</span><span
style="color: blue;">="clr-namespace:SilverlightApplication21"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span>

   <span style="color: red;"> Height</span><span
style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="BlurOL"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimation</span>

               <span style="color: red;"> Duration</span><span
style="color: blue;">="00:00:01.000"</span>

               <span style="color: red;"> From</span><span
style="color: blue;">="0"</span>

               <span style="color: red;"> To</span><span
style="color: blue;">="1"</span>

               <span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="**Renk**"</span>

               <span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="**(DaronEfekti.Kirmizilik)**" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Grid</span>

       <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span>

       <span style="color: red;"> Background</span><span
style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**btnTikla**"</span>

               <span style="color: red;"> Content</span><span
style="color: blue;">="TIKLA"</span>

               <span style="color: red;"> Height</span><span
style="color: blue;">="100"</span>

               <span style="color: red;"> Width</span><span
style="color: blue;">="100"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**DaronEfekti**</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Renk**"\>\</</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DaronEfekti</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Slider</span>

               <span style="color: red;"> Minimum</span><span
style="color: blue;">="0"</span>

               <span style="color: red;"> Maximum</span><span
style="color: blue;">="1"</span>

               <span style="color: red;"> Value</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
**Kirmizilik**</span><span style="color: blue;">,</span><span
style="color: red;"> ElementName</span><span
style="color: blue;">=**Renk**,</span><span style="color: red;">
Mode</span><span style="color: blue;">=TwoWay}" /\></span>

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

Yukarıdaki XAML kodunda da inceleyebileceğiniz üzere hazırladığımız
efektin özelliklerine bir Slider aracılığı ile erişebildiğimiz gibi
gerekirse doğrudan söz konusu efektin bir özelliğine animasyon da
verebiliyoruz. Örneğimizdeki animasyon Button kontrolünün
görselliğindeki tüm kırmızılık renk değerlerini en düşük seviyesinden en
yükseğe doğru anime edecektir.

**Hazırı yok mu bunların?**

Kendi Pixel Shader'larınızı yazmak her zaman doğru seçim olmayabilir :)
Bazen başkaları yazsa da biz hemen kullansak hissiyatı kapılmamak elde
değil. Esasen bu hissiyatın nedeni HLSL'in çoğumuza yabancı bir uzmanlık
alanı olması. Bu çerçevede tabi ki konunun uzmanları "Özgür Yazılım"
çerçevesinde :) codeplex'te açık kaynak kodları ile Silverlight için
birçok Pixel Shader kütüphanesini paylaşmış durumdalar. Zaten bu
kütüphanelerin neredeyse hepsi daha önce de WPF için downloada
sunulmuştur.

<http://wpffx.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=25285>

Yukarıdaki adresten Silverlight 3.0 ile uyumlu Pixel Shader
kütüphanelerini indirebilirsiniz.

Hepinize kolay gelsin.


