---
FallbackID: 2520
Title: Windows Phone 7'de ApplicationBar ve Menü Kullanımı
PublishDate: 7/5/2010
EntryID: Windows_Phone_7_de_ApplicationBar_ve_Menu_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone 7, Windows Phone
old.EntryID: 1578f4ec-0e47-45bc-9e70-62d015181798
---
Windows Phone 7 ile beraber gelen uygulama için navigasyon sistemlerinin
bir parçası da işletim sisteminin sunduğu menü altyapısı. Bu konuda
radikal bir değişikliğe giden Microsoft artık işletim sistemin ekranının
altında veya üstünde (fiziksel düğmelere en yakın kısımda) bir bar
göstererek söz konusu bar üzerinden komutları sunuyor. Eskiden olduğu
gibi uygulamaların alt kısımda iki düğme bulunarak bu düğmelere
basıldığında da açılan uzun kısmi menülere artık yer yok.

![WP7'de navigasyon
menüleri...](http://cdn.daron.yondem.com/assets/2520/06052010_1.png)\
*WP7'de navigasyon menüleri...*

Yukarıda gördüğünüz sistemde üst kısımda gördüğünüz dört düğme sürekli
olarak gözüken düğmeler oluyor ve **ApplicationBarIconButton** sınıfı
ile yaratılıyor. Bu düğmeler bir **ApplicationBar'ın** parçaları
arasında. Ayrıca isterseni ApplicationBar'lara ek olarak
**ApplicationBarMenuItem** da ekleyebiliyorsunuz. MenuItem'lar normalde
gözükmüyor fakat BarIconButton'ların listesinin yanında yer alan üç
noktaya tıkladığınızda MenuItem'lar da sahneye geliyor ve
kullanılabiliyor. Duruma göre uygulamanızın istediğiniz ekranına
istediğiniz ApplicationBar'ı yaratabilir ve duruma göre IconButton ve
MenuItem'ları beraber veya ayrı ayrı kullanabilirsiniz.

ApplicationBar'lar ekran başına yani PhoneApplicationPage başına
yaratılabilse de genelde merkezi bir yerde tutup birden çok ekranda
kullanmak daha mantıklı olabilir böylece bar arkasındaki navigasyon vs
kodları da Navigation API'yi kullanıyorsa rahatlıkla uygulama içerisinde
tek bir merkezi bar ile gezilebilmesini sağlayabilirsiniz. Örnek
projemizde de yaratacağımız barı App.XAML içerisine koyarak merkezi hale
getireceğiz, böylece barımızı tüm Page'lerde kullanma şansımız olacak.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Application</span>

   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="WindowsPhoneApplication5.App"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>   
  

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">system</span><span
style="color: blue;">="clr-namespace:System;assembly=mscorlib"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mpc</span><span
style="color: blue;">="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls"</span>

**  ** <span style="color: red;"> **xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**shell**</span><span
style="color: blue;">**="clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone.Shell"**</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">phoneNavigation</span><span
style="color: blue;">="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Application.RootVisual</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">phoneNavigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">PhoneApplicationFrame</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="RootFrame"</span><span style="color: red;">
Source</span><span style="color: blue;">="/MainPage.xaml"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Application.RootVisual</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Application.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="MainAppBar"</span><span style="color: red;">
Visible</span><span style="color: blue;">="True"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.MenuItems</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarMenuItem</span><span
style="color: red;"> Text</span><span style="color: blue;">="Gel de
tıklama..."</span><span style="color: red;"> Click</span><span
style="color: blue;">="MenuTiklandi" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.MenuItems</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.Buttons</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="1.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="2.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="3.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="4.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.Buttons</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar</span><span
style="color: blue;">\></span>

Yukarıdaki gördüğünüz ApplicatioBar implementasyonu yapılmış bir
App.XAML dosyası. ApplicationBar ve diğer kullanacağımız sınıflar
Microsoft.Phone.Shell altında tanımlı olduğu için söz konusu assembly'i
projemize referans olarak eklememiz sonrasında da XAML dosyası
içerisinde özel bir namespace tanımlayarak import etmiş olmamız gerek.
Kodun en üst kısmında kalın olarak göreceğiniz kısımda tam da bu işlemi
yapıyoruz. Sonrasında sıra geliyor artık menümüz içerisinde düğmelere ve
komutlara karar vermeye. Şimdilik deneme amaçlı olarak üst parafraglarda
görselini gördüğümüz menüyü tanımlamak için dört adet IconButton ve bir
tane de MenuItem yaratabiliriz. MenuItem'lar Text alırken
IconButton'lara ise birer PNG dosya verebilirsiniz. Unutmayın
PNG'lerinizi projenize ekledikten sonra **Build Action** olarak
**Content** seçmeniz gerekecek. Son olarak Click eventlarını de
bağlayarak kod tarafına geçebiliriz.

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> IconDugmeTiklandi(<span
style="color: blue;">object</span> sender, EventArgs e)

        {

           
((PhoneApplicationFrame)Application.Current.RootVisual).Navigate(<span
style="color: blue;">new</span> Uri(<span
style="color: #a31515;">"/OrnekSayfa.xaml"</span>, UriKind.Relative));

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> MenuTiklandi(<span
style="color: blue;">object</span> sender, EventArgs e)

        {

           
((PhoneApplicationFrame)Application.Current.RootVisual).Navigate(<span
style="color: blue;">new</span> Uri(<span
style="color: #a31515;">"/OrnekSayfa2.xaml"</span>, UriKind.Relative));

        }

Örneğimizin basitliğini korumak adına projemizde iki adet
OrnekSayfa.xaml ve OrnekSayfa2.xaml adında Page olduğunu varsayalım ve
IconButton'lardan herhangi birine basıldığında sayfalardan birine
MenuItem'a basıldığında da diğerine yönlendirelim. Gördüğünüz üzere kod
aslında olabildiğince basit. Navigation API'ye App.xaml içerisinden
ulaşabilmek için uygulamanın RootVisual'ını buluyoruz ki o da zaten
bizim **PhoneApplicationFrame**. Böylece AppFrame üzerinden de
rahatlıkla **Navigate** metodunu çağırabiliyoruz.

Sıra geldi bu menüyü istediğimiz Page'lerle ilişkili hale getirmeye.
Böylece söz konusu Page'ler uygulamada gösterilirken bu menü de ekrana
gelecek.

**[XAML]**

\<phoneNavigation:PhoneApplicationPage

   x:Class="WindowsPhoneApplication5.MainPage"

   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

  
xmlns:phoneNavigation="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"

   xmlns:d="http://schemas.microsoft.com/expression/blend/2008"

  
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"

   mc:Ignorable="d" d:DesignWidth="480" d:DesignHeight="800"

   FontFamily="{StaticResource PhoneFontFamilyNormal}"

   FontSize="{StaticResource PhoneFontSizeNormal}"

   Foreground="{StaticResource PhoneForegroundBrush}"

   <span style="color: red;"> ApplicationBar</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
MainAppBar</span><span style="color: blue;">}"\></span>

 

    \<Grid x:Name="LayoutRoot" Background="{StaticResource
PhoneBackgroundBrush}"\>

Yukarıda gördüğünüz XAML kodu herhangi bir ApplicationPage'in kodu
olabilir. Önemli olan App.xaml içerisinde aslında Resource olarak
tanımladığımız menümüzü alıp istediğimiz sayfaya ApplicationBar olarak
atamak. Böylece artık bu sayfada bizim menü gözükmeye başlayacak.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">phoneNavigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">PhoneApplicationPage</span>

   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="WindowsPhoneApplication5.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">phoneNavigation</span><span
style="color: blue;">="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

**  ** <span style="color: red;"> **xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**shell**</span><span
style="color: blue;">**="clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone.Shell"**</span>

   <span style="color: red;"> mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span><span style="color: red;"> d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="480"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="800"</span>

   <span style="color: red;"> FontFamily</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
PhoneFontFamilyNormal</span><span style="color: blue;">}"</span>

   <span style="color: red;"> FontSize</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
PhoneFontSizeNormal</span><span style="color: blue;">}"</span>

   <span style="color: red;"> Foreground</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
PhoneForegroundBrush</span><span style="color: blue;">}"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">phoneNavigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">PhoneApplicationPage.ApplicationBar</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar</span><span style="color: red;">
Visible</span><span style="color: blue;">="True"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.MenuItems</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarMenuItem</span><span
style="color: red;"> Text</span><span style="color: blue;">="Gel de
tıklama..."</span><span style="color: red;"> Click</span><span
style="color: blue;">="MenuTiklandi" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.MenuItems</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.Buttons</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="1.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="2.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="3.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBarIconButton</span><span
style="color: red;"> IconUri</span><span
style="color: blue;">="4.png"</span><span style="color: red;">
Click</span><span style="color: blue;">="IconDugmeTiklandi" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar.Buttons</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">shell</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ApplicationBar</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">phoneNavigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">PhoneApplicationPage.ApplicationBar</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
PhoneBackgroundBrush</span><span style="color: blue;">}"\></span>

Ayrıca isterseniz ApplicationBar'lar Page başına da tanımlayabilirsiniz.
Yani App.xaml gibi global bir yere koymadan Bar'ları her sayfanın içine
gömme şansına da sahipsiniz. Yukarıdaki XAML kodu bunun için güzel bir
örnek olabilir.

Hepinize kolay gelsin.


