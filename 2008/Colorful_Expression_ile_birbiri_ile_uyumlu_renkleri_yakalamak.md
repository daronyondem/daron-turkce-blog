# Colorful Expression ile birbiri ile uyumlu renkleri yakalamak.
Renklerin birbirine uyumu özellikle biz yazılımcılar için pek
anlaşılamayan bir sistemi tanımlar :) Kişisel olarak ben bir renk
yığınındaki renklerin birbirine uyumlu olup olmadığını anlayabilsem de
"Buyur uyumlu 3 renk seç" derseniz pek de başarılı olamam. Belli ki bu
durum genel geçer bir sorunu tanımlıyor ki RD, [Jonas
Folloseo](http://jonas.follesoe.no/) birazdan sizlere detaylarından
bahsedeceğim uygulamayı hazırlamış. Uygulama özünde Adobe'nin
[Kuler](http://kuler.adobe.com/) sitesinin API'larını kullanıyor.
Kuler'dan hızlı bir şekilde bahsetmek gerekirse tasarımcıların
birbirleri ile uyumlu renk şemalarını paylaştıkları bir Web 2.0 portalı
diyebiliriz.

**Colorful Expression**

Aşağıdaki adresten indirebileceğiniz uygulama toplam 3 bölümden
oluşuyor.

<http://www.codeplex.com/colorful>

Birincisi **Colorful WPF** adında tek başına çalışabilen bir WPF
uygulaması. Bu uygulama içerisinde birbirleri ile uyumlu renk şemalarını
inceleyebilir ve aramalar yapabilirsiniz. Unutmayın ki sistem Kuler'ın
API'larından faydalanıyor yani programı ancak online durumdayken
kullanabilirsiniz. Colorful WPF'in en güzel özelliği herhangi bir renk
şemasının altındaki düğmeler aracılığı ile hızlı bir şekilde bu renkleri
kullanabilmenizi sağlayacak XAML Brush kodlarını alabiliyor olmamız.

![Colorful WPF içerisinde birbiri ile uyumlu renklerin bir
listesi.](media/Colorful_Expression_ile_birbiri_ile_uyumlu_renkleri_yakalamak/07112008_1.png)\
*Colorful WPF içerisinde "silver" kelimesi aratıldığında çıkan birbiri
ile uyumlu renklerin bir listesi.*

Yukarıdaki ekran görüntüsünde yer alan en üstteki "**Silver**" adındaki
renk şemasının altındaki "**Swatches**" düğmesine tıkladığımda doğrudan
aşağıdaki XAML kodu panoya kopyalanıyor ve rahatlıkla Silverlight veya
WPF projelerinde kullanabiliyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverColor1</span>"<span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF474143</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverColor2</span>"<span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFA69E9D</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverColor3</span>"<span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFE7E2DA</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverColor4</span>"<span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverColor5</span>"<span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFE7E8E7</span>"<span style="color: blue;">
/\></span>

**Expression Design ve Blend Add-In**

Colorful Expression içerisindeki renk şablonlarını isterseniz doğrudan
Expression Design veya Blend içerisinde de kullanabiliyorsunuz. Bunun
için download paketi içerisinden program adına uygun klasörün içindeki 2
DLL dosyasını programların bilgisayarlarınızda yüklü oldukları konumlara
kopyalamanız gerek. Sonrasında aşağıdaki şekilde hem Blend hem de
Design'ı çalıştırdığınızda **Colurfull Expression**'ı doğrudan Blend
veya Design içerisinde de kullanabilirsiniz.

*Blend.exe –addin:Colorful.Blend.AddIn.dll\
* *Design.exe –addin:Colorful.Design.AddIn.dll*

![Expression Design içerisinde Colorful
paneli.](media/Colorful_Expression_ile_birbiri_ile_uyumlu_renkleri_yakalamak/07112008_2.png)\
*Expression Design içerisinde Colorful paneli.*

Yukarıdaki ekran görüntüsünde Colurful Expression'ın doğrudan Expression
Design içerisinde kullanılabildiğini görebiliyorsunuz. Aynı şekilde
Blend 2 içerisinde de rahatlıkla **Colurful** paneline ulaşılabiliyor.

![Expression Blend 2 içerisinde Colorful
paneli.](media/Colorful_Expression_ile_birbiri_ile_uyumlu_renkleri_yakalamak/07112008_3.png)\
*Expression Blend 2 içerisinde Colorful paneli.*

Blend içerisinde Colorful panelinin kullanımı ile ilgili Design'a
kıyasla ek avantajlar da söz konusu. Sahneye sürükleyip bıraktığınız bir
renk şablonu aslında arka planda birer **SolidColorBrush** olarak
sayfanın Resource'larına ekleniyor. Böylece bu renkleri istediğiniz
kadar farklı yerlerde rahatlıkla merkezi olarak kullanabiliyorsunuz.

![Colorful'un yarattığı XAML kodları otomatik olarak
karşımızda.](media/Colorful_Expression_ile_birbiri_ile_uyumlu_renkleri_yakalamak/07112008_4.png)\
*Colorful'un yarattığı XAML kodları otomatik olarak karşımızda.*

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-11-8 tarihinde yayinlanmistir.*
