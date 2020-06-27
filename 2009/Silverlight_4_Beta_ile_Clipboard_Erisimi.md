# Silverlight 4 Beta ile Clipboard Erişimi
Taaa Silverlight 1.0 zamanında Clipboard erişimi ile ilgili bir
[makale](http://daron.yondem.com/tr/post/5cc7deaf-3c67-4afb-8431-d13959c57062)
yazmıştım. Aradan bir buçuk yıl geçmiş :) Silverlight 4 Beta ile beraber
Clipboard erişimi artık default olarak geliyor. Böylece rahatlıkla
JavaScript mile uğraşmadan C\# veya VB kodunuz ile Clipboard'a
ulaşabilir, veri alabilir veya verebilirsiniz.

**Bakalım Clipboard'da birşey var mı?**

Clipboard'dan birşey almadan önce birşey olup olmadığını kontrol etmek
gerek. Şu an için Silverlight 4 Beta'da Clipboard erişlimi olarak sadece
**Unicode** metin desteği var. O nedenle kullanacağımız tüm API'lerde de
bu izi rahatlıkla görebilirsiniz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication8.MainPage"</span>

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
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnKes"</span><span style="color: red;">
Content</span><span style="color: blue;">="Kes" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnYapistir"</span><span style="color: red;">
Content</span><span style="color: blue;">="Yapıştır" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="txtMetin"
/\></span>

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

Yukarıdaki XAML kodu örnek uygulamamızın arayüzüne ait. Arayüzde basit
birer Kes ve Yapıştır düğmelerinin yanı sıra bir de TextBox yer alıyor.
Amacımız sistem clipboardundaki veriyi bu textbox içerisine yapıştırmak
veya textbox içerisinden bir metni kesip aynı şekilde clipboarda
yerleştirmek.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnYapistir\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnYapistir.Click

        <span style="color: blue;">If</span> <span
style="color: #2b91af;">Clipboard</span>.ContainsText <span
style="color: blue;">Then</span>

            txtMetin.Text = <span
style="color: #2b91af;">Clipboard</span>.GetText

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yapıştır düğmemizin arkasında hemen **Clipboard** sınıfındaki shared
metodlardan **ContainsText'i** kullanarak Clipboard içerisinde bir metin
olup olmadığını kontrol edebiliyoruz. Sonrasında eğer metin varsa
rahatlıkla bu metni de **GetText** ile alabiliyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnKes\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnKes.Click

        <span
style="color: #2b91af;">Clipboard</span>.SetText(txtMetin.SelectedText)

        txtMetin.Text = txtMetin.Text.Remove(txtMetin.SelectionStart,
txtMetin.SelectionLength)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Sıra kesme işlemine yani **Clipboard'a** data aktarmaya gelince de yine
**Clipboard** sınıfı altındaki **SetText** metodunu kullanabiliriz. Söz
konusu metod parametre olarak Clipboard'a aktarmak istediğimiz yazıyı
alıyor. Tabi söz konusu yazıyı Clipboard'a yerleştirdikten sonra
TextBox'tan da kaldırmanın uygun olacağını düşündüm :) O nedenle bir
sonraki satırı da keyfi olarak ekledim diyebilirim.

![Clipboard erişimi
hakkı!](media/Silverlight_4_Beta_ile_Clipboard_Erisimi/19112009_1.png)\
*Clipboard erişimi hakkı!*

Uygulamanız ilk Clipboard erişimine el attığı anda :) kullanıcıya
yukarıdaki gibi bir uyarı penceresi gösterilecektir. Bu pencere ile
kullanıcı uygulamanıza Clipboard erişimi izni verebilir. Eğer izin
verilir ise uygulama söz konusu session boyunca bu izne sahip olacaktır.
Eğer izin verilmez ise kodunuz bir Exception verecektir. O nedenle
erişim kodlarınızı Try/Catch blokları içerisinde tutup hataya göre yol
almak uygun olabilir.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-11-20 tarihinde yayinlanmistir.*
