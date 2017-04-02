---
FallbackID: 2158
Title: WPF içerisinde "Splash Screen" gösterimi.
PublishDate: 8/19/2008
EntryID: WPF_icerisinde_Splash_Screen_gosterimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: 42aa421c-ca60-4e35-b1e0-4b6920e678b9
---
WPF uygulamalarında "Splash Screen" hazırlama ile ilgili sıkıntılara
yönelik elle hazırlanmış taktikler ve farklı çözümler vardı. .NET
Framework 3.5'in SP1 güncellemesi ile beraber artık WPF uygulamaları
için native **Splash Screen** hazırlamak gerçekten çocuk oyuncağına
dönüştü.

Yarattığınız herhangi bir WPF uygulamasının Solution'ına istediğiniz bir
JPEG veya şeffaflık içeren PNG dosyasını ekleyin. Bunun için ister
Visual Studio içerisinde ister Blend içerisinde projeye "Solution
Explorer" içerisinde sağ tıklayarak gelen menüden "Add Existing Item"
diyerek ilerleyebilirsiniz. Önemli olan adım söz konusu dosyayı projeye
ekledikten sonra onun "**Build Action**"ınını "**Splash Screen**" olarak
değiştirmek.

![WPF içerisinde Splash Screen
ayarlamak.](http://cdn.daron.yondem.com/assets/2158/18082008_1.png)\
*WPF içerisinde Splash Screen ayarlamak.*

Visual Studio içerisinde söz konusu dosyayı seçtikten sonra "Properties"
panelinden "Build Action" özelliğini yukarıdaki şekilde
değiştirdiğinizde artık programınızın belleğe yüklenene kadar seçmiş
olduğun görsel gösterilecektir. Maalesef bu Splash Screen'in tasarımını
XAML ile düzenlemek veya animasyonlu GIF kullanmak gibi seçenekler şu
anda mevcut değil, fakat şeffaf PNG kullanabiliyor olmak gerçekten güzel
ve çözüm ise çok pratik.

Hepinize kolay gelsin.


