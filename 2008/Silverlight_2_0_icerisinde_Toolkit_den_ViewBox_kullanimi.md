---
FallbackID: 2250
Title: "Silverlight 2.0 içerisinde Toolkit'den ViewBox kullanımı."
date: "2008-11-18"
EntryID: Silverlight_2_0_icerisinde_Toolkit_den_ViewBox_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 32e59795-7e82-4763-9196-ed9cf07767bb
---
# Silverlight 2.0 içerisinde Toolkit'den ViewBox kullanımı.
WPF'den Silverlight dünyasına geçince eksiğini hissettiğimiz
kontrollerin Silverlight Toolkit projesi ile sağlanmaya çalışıldığına
dair daha önceki yazılarımda ufak ipuçları vermiştim. Bu sefer de yine
Toolkit içerisinde ViewBox kontrolünü inceleyeceğiz. **ViewBox** hali
hazırda WPF içerisinde bulunan bir Layout kontrolü. Silverlight
tarafında ise herhangi bir muadilinin olmaması bazı durumlarda ciddi
sıkıntı yaratabiliyor.

**Peki nedir ViewBox?**

İster WPF ister Silverlight tarafında olun sahnenin planını Layout
kontrolleri dediğimiz kontroller ile düzenlemek durumundasınız. Bu
kontrollerin her birinin birbirinden farklı özellikleri var. Tüm bu
özellikleri göz önünde aldığımızda ViewBox'ın eşsiz olduğu nokta
içerisindeki tüm nesneleri vektörel olarak görsel anlamda tekrar
boyutlandırabiliyor olması. Birkaç görsel örnek ile konuyu
netleştirelim.

*Not: Silverlight Toolkit'i kullanabilmeniz için*
[*CodePlex*](http://codeplex.com/Silverlight) *üzerindeki adresten
kütüphaneyi indirerek içerisindeki* ***Microsoft.Windows.Controls.dll***
*dosyasını projenize referans olarak eklemelisiniz.*

![Grid içerisinde 5 farklı Ellipse'in değişen
durumları.](media/Silverlight_2_0_icerisinde_Toolkit_den_ViewBox_kullanimi/17112008_1.png)\
*Grid içerisinde 5 farklı Ellipse'in değişen durumları.*

Yukarıdaki gibi bir Grid içerisinde bulunan nesneler Grid'in
kenarlarından olan uzaklarına ve farklı hizalama bilgilerine göre
konumlandırılırlar. Bu nedenle Grid'in boyutu değiştiğinde nesnelerin
kenarlara olan uzaklıklarını sabit tutabilmek adına nesneler garip
şekillerde boyutlandırılır. Oysa biz bu Grid'in boyutlandırırken
içindeki görselliği doğrudan aynı şekilde büyütmesini istiyorduk hem de
vektörel olarak. Maalesef Silverlight 2.0 ile beraber hali hazırda gelen
ve bu işlevselliği sağlayacak hiçbir Layout kontrolü yok! Tabi bu durum
"*Böyle bir Layout kontrolü yazılamaz*" anlamına gelmiyor :) Nitekim
yazmışlar ve Silverlight Toolkit içerisinden de biz **ViewBox**
kontrolünü alıp kullanabileceğiz.

**ViewBox kontrolümüzü kullanalım.**

Silverlight Toolkit'i projenize referans olarak aldıktan sonra
Expression Blend içerisinde doğrudan "Asset Library"'de "Custom
Controls" tabında "ViewBox" kontrolünü bulabilirsiniz. Bir önceki
bölümdeki görsel örneğimizde kullandığımız Grid'i gelin bir ViewBox
içerisine yerleştirelim.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication1.Page"</span>

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

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**Viewbox**</span><span style="color: red;">
Margin</span><span style="color: blue;">="24,24,176,108"\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
Height</span><span style="color: blue;">="Auto"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="Auto"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Margin</span><span style="color: blue;">="8,8,8,8"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFF0000"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Height</span><span style="color: blue;">="16"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="56,40,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="32"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Height</span><span style="color: blue;">="16"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span><span style="color: red;">
Margin</span><span style="color: blue;">="0,40,48,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="32"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Margin</span><span style="color: blue;">="88,80,88,80"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="20"</span><span style="color: red;">
Height</span><span style="color: blue;">="20"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Ellipse</span><span style="color: red;">
Height</span><span style="color: blue;">="40"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="56,0,48,24"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Bottom"</span><span
style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"/\></span>

<span style="color: #a31515;">          </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**Viewbox**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde de görebildiğiniz üzere elimizdeki Grid'i
doğrudan alıp bir ViewBox içerisinde yerleştirdik. Böylece artık
ViewBox'ı tekrar boyutlandırdığımızda içerisinde tüm görseller vektörel
olarak bir bütün şeklinde kabul edilecek ve o şekilde tekrar
boyutlandırılacak.

![ViewBox
güzelliği.](media/Silverlight_2_0_icerisinde_Toolkit_den_ViewBox_kullanimi/17112008_2.png)\
*ViewBox güzelliği.*

Gördüğünüz gibi görselde hiçbir değişiklik yok. Elimizdeki çizim
vektörel olduğu için büyüdüğünde de herhangi bir görsel bozulma olmuyor.
Tabi ViewBox'ı her durumda kullanmak da doğru olmayacaktır. Örneğin
Silverlight ekranınızda bir Button varsa (veya herhangi bir kontrol) ve
bu kontrolün dinamik olarak boyutlandırılmasını istiyorsanız ViewBox
yerine Grid'i tercih etmelisiniz. Çünkü Grid Button'un **Height** ve
**Width** gibi özellikleri üzerinden Button'a boyut verirken **ViewBox**
doğrudan Button'un görselliği üzerinden vektörel olarak büyütecektir.

![ViewBox ve Grid
farkı.](media/Silverlight_2_0_icerisinde_Toolkit_den_ViewBox_kullanimi/17112008_3.png)\
*ViewBox ve Grid farkı.*

**ViewBox özellikleri...**

Bir ViewBox kontrolü içerisinde görsellerin nasıl boyutlandırılacağı ile
ilgili verebileceğimiz kararlar var. Bunlardan ilki Strech özelliği.
Gelin Strech özelliğine verebileceğimiz değerler arasındaki farklara bir
örnek ile bakalım.

![ViewBox'ın Strech özellikleri arasındaki
farklar.](media/Silverlight_2_0_icerisinde_Toolkit_den_ViewBox_kullanimi/17112008_4.png)\
*ViewBox'ın Strech özellikleri arasındaki farklar.*

Farklar sanırım görselde açık bir şekilde belli oluyor. **None**
değerini verdiğimiz Strech özelliği ViewBox içerisindeki görsellerin
boyutlandırılmamasını sağlıyor. **Uniform** değeri en/boy oranını
koruyarak ViewBox'ın içerisinde tam sığacak şekilde görseli büyütürken
**UniformToFill** ise yine en/boy oranını korusa da bu sefer ya eni ya
da boyu her şekilde ViewBox'ın içine en büyük değeri ile yerleştiriyor.
Strech özelliğine doğrudan **Fill** değerini verirseniz bu sefer
görselin en/boy oranı korunmadan tamamen ViewBox'ın içerisine yayılıyor.

Ayrıca isterseniz ViewBox'ın **VerticalAlignment** ve
**HorizontalAlignment** özellikleri ile de **UniForm** modunda ViewBox
içerisindeki görselin nasıl hizalanacağına karar verebilirsiniz.

**StretchDirection özelliği.**

Şu ana kadar **ViewBox** içerisinde görsellerin sürekli büyüdüğünü
gördük fakat isterseniz ViewBox'ın boyutunu ufaltarak aynı şekilde
elinizdeki görseli küçültebilirsiniz de. Bazı durumlarda ise ViewBox
içerisindeki görselin sadece gerektiğinde büyütülmesini veya sadece
küçültülmesini isteyebilirsiniz. Bu gibi durumlarda gerekli
sınırlamaları yapmak için doğrudan **StretchDirection** özelliğini
kullanabilirsiniz.

Eğer **StretchDirection** değeri **UpOnly** olursa ViewBox içerisindeki
görsel gerektiğinde sadece büyütülecektir. ViewBox kendi içindeki
görselden daha fazla ufaltılırsa içindeki görseli kesinlikle
ufaltmayacaktır. Aynı şekilde **DownOnly** özelliği de ViewBox'ın kendi
içerisindeki görseli gerektiğinde sadece ufaltmasını sağlayacaktır.
**StretchDirection** özelliğinin varsayılan değeri **Both** olarak
geldiği için normal şartlarda hem ufaltma hem de büyütme yapar.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-11-18 tarihinde yayinlanmistir.*
