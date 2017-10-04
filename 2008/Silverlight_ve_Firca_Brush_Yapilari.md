---
FallbackID: 1948
Title: Silverlight ve Fırça (Brush) Yapıları
PublishDate: 6/2/2008
EntryID: Silverlight_ve_Firca_Brush_Yapilari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 83152c85-1cd2-4192-b216-92aaaf6303cd
---
İster Silverlight uygulamaları olsun ister WPF uygulamaları, her şekilde
XAML kodları içerisindeki Brush (fırça) tanımlamaları görsel anlamda çok
önemlidir. Herhangi bir nesnenin içerisini boyamaktan tutan resim ile
doldurmaya kadar çoğu noktada **Brush** yapıları kullanılır.

Bu makalemizde **Silverlight** içerisinde kullanabileceğimiz **Brush**
yapılarını ufak örneklerle inceleyeceğiz. Makale boyunca bahsi geçen tüm
işlemleri bir "yazılımcı" perspektifi ile değerlendireceğim, o nedenle
XAML kodlarını yazmak için **Visual Studio** kullanacağız. Tasarımcı
arkadaşların **Expression Blend** dünyasında daha farklı araçları ve
olanakları olacaktır.

**SolidColorBrush**

Herhangi bir nesnenin için tek bir renk ile doldurmak istiyorsanız veya
herhangi bir alana tek bir renk atamak istiyorsanız yapmanız gereken bir
**SolidColorBrush** kullanmaktır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">500</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">500</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        **\<**</span><span
style="color: #a31515;">**SolidColorBrush**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Black**</span>"<span
style="color: blue;">**\>\</**</span><span
style="color: #a31515;">**SolidColorBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Örneğimizde bir Silverlight animasyonu içerisinde yer alan Ellipse
nesnenin içerisini tek bir renk ile doldurmak için uygun bir
**SolidColorBrush** kullanıyoruz. Söz konusu Brush'ın rengini ayarlamak
için **Color** özelliğinden faydalanmamız gerekiyor. Herhangi bir
**SolidColorBrush'ın** **Color** özelliğine doğrudan bir renk adı
verebileceğiniz gibi toplam 8 karakterden oluşan Hexadecimal bir değer
de aktarabilirsiniz. \#AARRGGBB şeklinde formatlı olan renk değerinin
**AA** kısımlarına Alpha (şeffaflık), **RR** (Red / Kırmızı), **GG**
(Green / Yeşil), **BB** (Blue / Mavi) renk değerleri aktarılır.

**LinearGradientBrush**

Gradient yapısını az çok çoğu programdan biliyoruz, belirli bir renkten
başka bir renge doğru geçişlerin yapıldığı boyama şekline Gradient
deniyor. Bu şekilde bir boyamayı Silverlight içerisinde yapabilmemiz
için GradientBrush yapılarından birini kullanmanız gerekir. Bu çerçevede
**LinearGradientBrush** doğrusal olarak renkler arası geçişlerin
yapıldığı bir boyama işlemine olanak tanır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">**        \<**</span><span
style="color: #a31515;">**LinearGradientBrush**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**GradientStop**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Yellow**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Offset**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**0**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**GradientStop**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Black**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Offset**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**0.7**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**GradientStop**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Yellow**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Offset**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**1**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">**        \</**</span><span
style="color: #a31515;">**LinearGradientBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

LinearGradientBrush yapıları içerisinde birbirinden bağımsız
GradientStop'lar kullanılır. Her bir **GradientStop** renk geçişinin
tamamlanacağı noktayı ve o noktadaki rengi belirler. Bizim örneğimizde
sarıdan siyaha ve sonrasında tekrar siyahtan sarıya doğru bir geçiş
olacak. Bu doğrusal geçiş boyunca geçişlerin tam olarak hangi noktalarda
yapılacağına da her bir **GradientStop'ın** **Offset** değeri karar
verir. 0 ile 1 arasında tüm geçiş doğrusu üzerinde belirlenen konuma
göre **GradientStop'lar** yerleştirilir. Yukarıdaki kodun oluşturduğu
görseli aşağıda inceleyebilirsiniz.

![LinearGradientBrush
çizimi](http://cdn.daron.yondem.com/assets/1948/06022008_1.png)\
*LinearGradientBrush çizimi.*

Yukarıdaki resimde de gördüğünüz gibi LinearGradientBrush yapısı sol üst
köşeden başlayarak sağ alt köşeye doğru ilerler. Bu doğrunun yönünü
değiştirmek için LinearGradientBrush'ların **StartPoint** ve
**EndPoint** özelliklerinden faydalanabiliriz. Bu özelliklerin her ikisi
de LinearGradientBrush doğrusunun başlangıç ve son noktalarının X ve Y
koordinatlarını içerir. Söz konusu koordinatlar 1 ile 0 arasında
verilerek nesnenin en üst sol noktası 0,0 (origin) olarak kabul edilir.
Gerektiğinde bu değerler eksi veya artı olarak 0'dan küçük veya 1'den
büyük de olabilir. Bu gibi durumlarda Gradient doğrusunun nesne
sınırlarının dışarısında başlayacağı veya biteceği öngörülür.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span style="color: red;">
**StartPoint**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**0,0**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**EndPoint**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**0,1**</span>"<span style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Yellow</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Black</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.7</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Yellow</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde tanımlanan LinearGradientBrush'ın başlangıç
noktası 0,0 ve sonlanma noktası da 0,1 olarak verilmiş. Başlangıç ve
bitiş noktalarının sadece Y koordinatları değiştirilmiş ve bitiş noktası
nesnenin sol altına denk getirilmiş. Aldığımız görsel sonuç aşağıdaki
gibi olacaktır.

![LinearGradientBrush yönündeki
değişiklik.](http://cdn.daron.yondem.com/assets/1948/06022008_2.png)\
*LinearGradientBrush yönündeki değişiklik.*

**RadialGradientBrush**

LinearGradientBrush'ların tüm özelliklerine sahip olan
RadialGradientBrush'ların tek farkı doğrusal bir renk değişimi sağlamak
yerine dairesel bir renk değişimi sağlamalarıdır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">**        \<**</span><span
style="color: #a31515;">**RadialGradientBrush**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**GradientStop**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Yellow**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Offset**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**0**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**GradientStop**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Color**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Black**</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**Offset**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**1**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">**        \</**</span><span
style="color: #a31515;">**RadialGradientBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz yapıda LinearGradientBrush'lara kıyasla tek fark
Brush'ımız kendi adı. Aldığımız görsel sonuç ise aşağıdaki şekilde.

![RadialGradientBrush
çizimi.](http://cdn.daron.yondem.com/assets/1948/06022008_3.png)\
*RadialGradientBrush çizimi.*

RadialGradientBrush'ların merkez noktasını değiştirerek farklı görsel
efektler oluşturmak mümkün. Bunun için **GradientOrigin** denen
özellikten faydalanacağız ve söz konusu özelliğe merkez noktası için X
ve Y koordinatları aktaracağız. Bu koordinatların da 1 ile 0 arasında
olması gerekiyor, aksi halde merkez nokta nesnenin dışına çıkacaktır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;"> **** </span><span
style="color: red;">**GradientOrigin**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**0,0**</span>"<span style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Yellow</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Black</span>"<span style="color: blue;">
</span><span style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Aldığımız görsel sonuç gerçekten etkileyici. Özellikle bir **Ellipse**
kullanmış olmamız **RadialGradientBrush'ın** ışık etkisi yaratmasına
neden oldu.

![Origin'i değiştirilmiş
RadialGradientBrush.](http://cdn.daron.yondem.com/assets/1948/06022008_4.png)\
*Origin'i değiştirilmiş RadialGradientBrush.*

**ImageBrush**

Nesnelerin içlerini resimlerle doldurmak için kullanacağınız fırça
(Brush) yapısının adı ImageBrush olarak geçiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        **\<**</span><span
style="color: #a31515;">**ImageBrush**</span><span style="color: blue;">
**** </span><span style="color: red;">**ImageSource**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**kaplumbaga.jpg**</span>"<span
style="color: blue;">**\>\</**</span><span
style="color: #a31515;">**ImageBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Kodumuzda da gördüğünüz üzere Ellipse'imizin Fill özelliğine bir
**ImageBrush** aktarıyoruz. Söz konusu ImageBrush resim kaynağını
**ImageSource** özelliği ile alıyor. Böylece elde ettiğimiz görüntü
aşağıdaki şekilde oluyor.

![ImageBrush ile gelen kaplumbağamız
:)](http://cdn.daron.yondem.com/assets/1948/06022008_5.jpg)\
*ImageBrush ile gelen kaplumbağamız :)*

ImageBrush'a özel olarak bahsedebileceğimiz bir durum kaynak resmin
hedef alana yerleştirilirken en-boy oranına göre ne tarz bir
konumlandırma yapılacağıdır. Bu konuyla ilgili ImageBrush'ın **Stretch**
özelliğinden faydalanıyoruz.

-   **Fill** : Resmin en-boy oranı korunmadan hedef alan doldurulur.
-   **Uniform** : Resmin en boy oranı korunarak olabilen en büyük
    boyutta yerleştirilir.
-   **UniformToFill**: Resmin en-boy oranı korunarak hedef alan tamamen
    doldurulur. Bu işlemin gerçekleşebilmesi için resmin fazla gelen
    kısımları dışarıda bırakılır.

**VideoBrush**

Belki de en ilginç fırçalardan biridir VideoBrush. ImageBrush gibi
çalışan VideoBrush kaynak olarak bir resim dosyası almak yerine video
alır. Böylece nesnelerin için hareketli bir görüntü ile doldurulabilir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Canvas</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">120</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">44</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**MediaElement**</span><span
style="color: blue;"> </span><span style="color: red;">Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**AyiVideo**</span>"<span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**ayi.wmv**</span>"<span style="color: blue;">
</span><span style="color: red;">Opacity</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> </span><span
style="color: red;">IsMuted</span><span
style="color: blue;">=</span>"<span
style="color: blue;">True</span>"<span
style="color: blue;">\>\</</span><span
style="color: #a31515;">MediaElement</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Ellipse</span><span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">200</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">**VideoBrush**</span><span style="color: blue;">
</span><span style="color: red;">SourceName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**AyiVideo**</span>"<span
style="color: blue;">\>\</</span><span
style="color: #a31515;">VideoBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Ellipse.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Ellipse</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki kodumuz içerisinde Ellipse'in Fill değerine bir VideoBrush
aktarıyoruz. Bu **VideoBrush'a** video kaynağı olarak **AyiVideo**
adında bir **MediaElement** bağlamışız. VideoBrush'lar doğrudan video
dosyalarını açamaz, arada aracı bir MediaElement gerekir. Bu nedenle
sahneye yerleştirdiğimiz MediaElement'imizin şeffaflığını **Opacity**
değerini 0 yaparak arttırıyoruz. Böylece sahnede **MediaElement**
gözükmeyecek. Ayrıca video ile beraber gelen sesin de duyulmaması için
yine MediaElement'e ait **IsMuted** özelliği **True** yapıyoruz. Sonuçta
aşağıdaki görüntüyü elde ediyoruz.

![VideoBrush ile aldığımız ayıcık Ellipse
içerisinde.](http://cdn.daron.yondem.com/assets/1948/06022008_6.jpg)\
*VideoBrush ile aldığımız ayıcık Ellipse içerisinde.*

Silverlight 1.0 içerisindeki Brush'larımız hepsi bu kadar. Hepinize
kolay gelsin.


