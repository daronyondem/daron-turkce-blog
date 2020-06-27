# Expression Blend 2.5 XAML Intellisense Add-In
Expression Blend içerisinde eksikliği en çok eleştiri alan özelliklerden
biri XAML Intellisense bulunmaması. Konsept olarak Expression ürün
ailesi tasarımcıları hedeflediği için Blend içerisinde XAML kodunun elle
yazılmayacağı düşünülerek herhangi bir Intellisense desteği sağlanmıyor.
Eğer elle düzenlemek istersek söz konusu XAML dosyalarını Visual Studio
ile açarak ilerlemek durumunda kalıyoruz.

Bu eksiklik göz önüne alınarak **Expression Blend 2.5** ile beraber
gelen Add-In altyapısı kullanılarak Blend içerisinde XAML Intellisense
desteği getiren bir eklenti yayınlandı. Yükleme paketini aşağıdaki
adresten bilgisayarınıza indirebilirsiniz;

<http://code.msdn.microsoft.com/Release/ProjectReleases.aspx?ProjectName=BlendSense&ReleaseId=1358>

Yükleme paketi içerisindeki dosyaların Blend'in yüklü olduğu klasöre
kopyaladıktan sonra paket içerisindeki Blend.bat üzerinden Blend'i
açabilirsiniz. Blend 2.5 ile herhangi bir Add-In kullanabilmeniz için
gerekli Add-In'in DLL dosyasının yolunun program açılırken argument
olarak aktarılması gerekiyor. O nedenle ister hali hazırdaki
kısayollarınızı bu şekilde düzenleyiz ister Blend.bat dosyasını
kullanın, karar sizin.

![Blend 2.5 içerisinde XAML Intellisense
Add-In](media/Expression_Blend_2_5_XAML_Intellisense_Add-In/02082008_1.png)\
*Blend 2.5 içerisinde XAML Intellisense Add-In*

Bahsettiğimiz Add-In'in şimdilik sadece **Blend 2.5 June Preview** ile
uyumlu olduğunu ve ancak WPF projelerinde Intellisense sağlayabildiğini
de hatırlatarak yazımı sonlandırıyorum.



*Bu yazi http://daron.yondem.com adresinde, 2008-8-3 tarihinde yayinlanmistir.*
