---
FallbackID: 2377
Title: "Silverlight 3.0 içerisinde şeffaf videolar (Chrome Key Efekti)"
date: "2009-7-3"
EntryID: Silverlight_3_0_icerisinde_seffaf_videolar_Chrome_Key_Efekti
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 84d6a965-6c16-453f-be33-d89fd49fad1d
---
# Silverlight 3.0 içerisinde şeffaf videolar (Chrome Key Efekti)
Silverlight içerisinde herhangi bir nesneye şeffaf fon vermek veya bir
renk seçerken Alpha kanalını da ayarlamak mümkün fakat elinizde hali
hazırda bir görsel varsa ve bu görsel içerisindeki belirli bir rengin
şeffafa çevrilmesini istiyorsanız ne yapabilirsiniz?

**Ne zaman lazım olacak ki?**

"Chroma Key" denilen bu efektin en çok kullanıldığın yer fotoğraf veya
videoların birleştirilmesi noktasında karşımıza çıkıyor. Örneğin koşan
bir adam videosu var elinizde fakat bu adamı kendi fon görselinizde
koşturmak istiyorsunuz. Bu durumda videonun fonunu silip yerine başka
bir şeyler koyabiliyor olmanız gerekir. Aynı şey fotoğraflar için de
geçerli. Tabi her konuda olduğu gibi bu konuda da belirli kurallar var.
Bir şekilde bir resmin ve videonun fonunu silebilmek istiyorsanız
aslında o videonun da uygun şekilde hazırlanmış olması gerekiyor.

![Chroma Key'e uygun bir
video.](media/Silverlight_3_0_icerisinde_seffaf_videolar_Chrome_Key_Efekti/02072009_1.jpg)\
 *Chroma Key'e uygun bir video.*

Yukarıda görmüş olduğunuz kare bir videonun alınma. Fonun yeşil olması
tabi ki şart değil. Bu notkada önemli olan şey video içerisinden almak
istediğiniz obje ile fonun birbirine tezat renkler taşıması. Böylece bu
videoyu gösterirken yeşil pikselleri bularak şeffaf hale
çevirebileceğiz. Durum böyle olunca da rahatlıkla bu videonun arkasına
başka bir video veya herhangi bir kontrol yerleştirebiliriz.

**Peki nasıl yapacağız?**

Bir video veya resim dosyasından bir rengi şeffaf hale getirmek için o
dosyanın görselinde her pikseli tek tek gezmemiz gerekecek fakat
özellikle video dosyalarından bahsedersek video içerisinde her kareyi de
tek tek incelemek epey zahmetli olabilir. Oysa Silverlight 3.0 ile
beraber gelen yeni özelliklerden biri olan PixelShader efektleri tam da
bu iş için biçilmiş kaftan.

PixelShader efektleri zaten uygulandıkları görselin her pikseli
gösterilmeden önce o pikseldeki renk değerlerine müdahale edebilen
efektler şeklinde tasarlanıyor. [Silverlight 3.0 ile Piksel
Shader](http://daron.yondem.com/tr/post/71093404-f9f0-4af1-8a3d-1129d0670ba8)
kullanımı makalemizde daha detaylı bilgi bulabilirsiniz.

Biz örneğimizde kullanmak üzere yeni bir PixelShader efekti yaratacağız.
Bu efekt kendisine gelen her pikseli inceleyerek Chrome Key rengine
yakın bir renk var ise o rengi şeffaf hale çevirecek. Tüm bu kontrol
yapılırken tabi ki eldeki renk ile Chrome key renginin yakınlığı
konusunda da bir parametre kullanmak durumundayız. Özetlemek gerekirse,
eğer videomuzun fonu yeşil ile Chrome Key rengimiz de yeşil olacak ve
PixelShader efektine yeşil rengini vereceğiz fakat duruma göre tam
olarak RGB değerleri belli olan bir yeşil rengini değil de o yeşil
rengine çok yakın diğer yeşilleri de şeffaflaştırmak isteyebiliriz. İşte
bu yakınlık değerini **Threshold** denilen ayrı bir parametrede
tutacağız.

**[HLSL]**

sampler2D input : register(S0);

 

<span style="color: blue;">float</span> red : register(C0);

<span style="color: blue;">float</span> green : register(C1);

<span style="color: blue;">float</span> blue : register(C2);

<span style="color: blue;">float</span> threshold : register(C3);

 

float4 main(float2 pos : TEXCOORD) : COLOR

{

    float4    color;

    <span style="color: blue;">float</span>    rkey, gkey, bkey, thresh;

 

    thresh = threshold;               

    rkey = red/255.0;

    gkey = green/255.0;

    bkey = blue/255.0;

 

    color = tex2D(input, pos);

 

    <span style="color: blue;">if</span> (abs(color.r - rkey) \<=
thresh)

    {

        <span style="color: blue;">if</span> (abs(color.g - gkey) \<=
thresh)

        {

            <span style="color: blue;">if</span> (abs(color.b - bkey)
\<= thresh)

            {

                <span style="color: green;">// Şeffaflaştır</span>

                color.a = 0.0;

            }

        }

    }

 

    <span style="color: blue;">return</span> color;

}

Yukarıdaki kod efektimizim HLSL ile yazılmış hali. Konumuz HLSL olmadığı
için detaylarına girmeyeceğim. Önemli olan bu şekilde HLSL efektini
yazdıktan sonra efekti compile edip ortaya çıkan PS dosyasını
Silverlight ile kullanmak. PixelShader efektlerinin Silverlight ile
kullanımı konusunda [Silverlight 3.0 ile Piksel
Shader](http://daron.yondem.com/tr/post/71093404-f9f0-4af1-8a3d-1129d0670ba8)
makalesini incelemeyi unutmayın.

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">AlphaShader</span> : <span
style="color: #2b91af;">ShaderEffect</span>

    {

        <span style="color: blue;">public</span> AlphaShader()

        {

            <span style="color: blue;">this</span>.PixelShader = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PixelShader</span>();

            <span style="color: blue;">this</span>.PixelShader.UriSource
= <span style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"/Alpha.ps"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative );

 

            <span
style="color: blue;">this</span>.UpdateShaderValue(InputProperty);

            <span
style="color: blue;">this</span>.UpdateShaderValue(RedProperty);

            <span
style="color: blue;">this</span>.UpdateShaderValue(GreenProperty);

            <span
style="color: blue;">this</span>.UpdateShaderValue(BlueProperty);

            <span
style="color: blue;">this</span>.UpdateShaderValue(ThreshProperty);

        }

 

        <span style="color: blue;">public</span> <span
style="color: #2b91af;">Brush</span> Input

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: #2b91af;">Brush</span>)GetValue(InputProperty); }

            <span style="color: blue;">set</span> {
SetValue(InputProperty, <span style="color: blue;">value</span>); }

        }

 

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> InputProperty = <span
style="color: #2b91af;">ShaderEffect</span>.RegisterPixelShaderSamplerProperty(<span
style="color: #a31515;">"Input"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">AlphaShader</span>), 0);

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> RedProperty = <span
style="color: #2b91af;">DependencyProperty</span>.Register(<span
style="color: #a31515;">"Threshold"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: blue;">double</span>), <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">AlphaShader</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyMetadata</span>(0.0,
PixelShaderConstantCallback(0)));

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> GreenProperty = <span
style="color: #2b91af;">DependencyProperty</span>.Register(<span
style="color: #a31515;">"Red"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: blue;">double</span>), <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">AlphaShader</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyMetadata</span>(0.0,
PixelShaderConstantCallback(1)));

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> BlueProperty = <span
style="color: #2b91af;">DependencyProperty</span>.Register(<span
style="color: #a31515;">"Green"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: blue;">double</span>), <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">AlphaShader</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyMetadata</span>(0.0,
PixelShaderConstantCallback(2)));

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">readonly</span> <span
style="color: #2b91af;">DependencyProperty</span> ThreshProperty = <span
style="color: #2b91af;">DependencyProperty</span>.Register(<span
style="color: #a31515;">"Blue"</span>, <span
style="color: blue;">typeof</span>(<span
style="color: blue;">double</span>), <span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">AlphaShader</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">PropertyMetadata</span>(0.25,
PixelShaderConstantCallback(3)));

 

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Threshold

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: blue;">double</span>)GetValue(ThreshProperty); }

            <span style="color: blue;">set</span> {
SetValue(ThreshProperty, <span style="color: blue;">value</span>); }

        }

 

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Red

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: blue;">double</span>)GetValue(RedProperty); }

            <span style="color: blue;">set</span> {
SetValue(RedProperty, <span style="color: blue;">value</span>); }

        }

 

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Green

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: blue;">double</span>)GetValue(GreenProperty); }

            <span style="color: blue;">set</span> {
SetValue(GreenProperty, <span style="color: blue;">value</span>); }

        }

 

        <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Blue

        {

            <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> (<span
style="color: blue;">double</span>)GetValue(BlueProperty); }

            <span style="color: blue;">set</span> {
SetValue(BlueProperty, <span style="color: blue;">value</span>); }

        }

    }

Yukarıdaki sınıf bizim **AlphaShader** adını verdiğimiz kendi
**PixelShader** efektimizin Silverlight içerisindeki tanımı. Söz konusu
PixelShader efekti uygulama içerisindeki compile edilmiş **Alpha.ps**
efektini kullanıyor. Gördüğünüz tüm Dependency Propoerty'ler de aslında
HLSL'e gönderdiğimiz parametreler. Chroma Key rengimizin RGB değerlerini
ayrı ayrı gönderirken Threshold değerini de 1 ile 0 arasında
gönderiyoruz.

Artık efektimiz hazır olduğuna göre uygulamamızın arayüzünü de
hazırlayabiliriz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication30.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="800"</span><span style="color: red;">
Height</span><span style="color: blue;">="600"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">daron</span><span
style="color: blue;">="clr-namespace:SilverlightApplication30"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span style="color: blue;">="8,18,86,69"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="Desert.jpg"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="myVideo"</span>

           <span style="color: red;"> Margin</span><span
style="color: blue;">="30,32,109,89"</span>

           <span style="color: red;"> Source</span><span
style="color: blue;">="ornek.wmv"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Gördüğünüz gibi örneğimizde basit bir şekilde bir resim ve üzerinde de
bir video bulunuyor. Amacımız video içerisindeki yeşil kısmı kaldırıp
sanki video içerisinde arkadaş resmin üzerinde hareket ediyormuş
izlenimi yaratmak. Şimdi tekrar kod tarafına geçerek efektimizi
MediaElement'imize uygulayalım.

**[C\#]**

        <span style="color: blue;">void</span> MainPage\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: blue;">var</span> x = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">AlphaShader</span>();

            x.Threshold = 0.37;

            x.Red = 91;

            x.Green =254;

x.Blue = 125;

            myVideo.Effect = x;

        }

Gördüğünüz gibi daha önceki adımlarda yarattığımız AlphaShader
sınıfımızdan bir kopya alıp tüm Property'lerine uygun değerleri
veriyoruz. Sonrasında da artık efektimizi MediaElement'in Effect'ine
eşitliyoruz. Peki nasıl bir sonuç mu alıyoruz? Sonuç aşağıda.

![PixelShader ile Chrome Key
efekti.](media/Silverlight_3_0_icerisinde_seffaf_videolar_Chrome_Key_Efekti/02072009_2.jpg)\
*PixelShader ile Chrome Key efekti.*

Gördüğünüz gibi videomuz içerisindeki yeşil kısımlar tamamen yok oldu ve
onun yerine çok daha farklı bir görsel yerleştirebildik. Videomuz
oynarken de herhangi bir sorun olmayacak ve PixelShader efektimiz
sürekli çalışarak bulduğu yeşil pikselleri şeffaf hale getirecek.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-7-3 tarihinde yayinlanmistir.*
