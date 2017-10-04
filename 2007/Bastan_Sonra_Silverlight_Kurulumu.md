---
FallbackID: 1821
Title: Baştan Sonra Silverlight Kurulumu
PublishDate: 24/10/2007
EntryID: Bastan_Sonra_Silverlight_Kurulumu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, Silverlight
old.EntryID: dbf49c38-c111-4adf-9823-464e5eeb2001
---
Silverlight uygulamaları geliştirmeyle ilgili makalelerime geçmeden önce
yavaş yavaş bilgisayarlarımızı Silverlight uygulamalarına hazırlamaya
başlayalım. İlk olarak aşağıdaki adreslerden Silverlight 1.0'ı
bilgisayarımıza kurmamız gerekiyor. Bu kurulum bilgisayarımızda
Silverlight 1.0 uygulamalarının çalıştırılabilmesini sağlayacak.

<http://www.microsoft.com/silverlight/downloads.aspx>

Kurulumu tamamladıktan sonra sıra geldi yazılım geliştirme araçlarımızı
da Silverlight uyumlu hale getirmeye. Bu noktada eğer Visual Studio 2008
Beta 2 kullanacaksanız [Microsoft Silverlight Tools Alpha Refresh for
Visual Studio 2008 Beta 2 (July
2007)](http://go.microsoft.com/fwlink/?LinkID=89149&clcid=0x409)
paketini kurmanız gerekiyor. Eğer sisteminizi Beta yazılımlar ile riske
atmak istemiyorsanız ve Visual Studio 2005 ile devam edecekseniz benim
tavsiyem ilk olarak [Visual Studio 2005 extensions for .NET Framework
3.0 (WCF & WPF), November 2006
CTP](http://www.microsoft.com/downloads/details.aspx?FamilyId=F54F5537-CC86-4BF5-AE44-F5A1E805680D&displaylang=en)
paketini bilgisayarınıza kurmanız. Böylece artık WPF uygulamalarını da
Visual Studio ile açabilirsiniz. Silverlight tarafına gelince de
[Microsoft Silverlight 1.0 Software Development
Kit](http://www.microsoft.com/downloads/details.aspx?FamilyId=FB7900DB-4380-4B0F-BB95-0BAEC714EE17&displaylang=en)
paketini bilgisayarınıza kurmanız gerekiyor. Kurulumu tamamladıktan
sonra "Başlat" / "Start" menünüze "**Microsoft Silverlight 1.0 SDK**"
bölümü gelecektir. Bu bölümde **Silverlight 1.0 Visual Studio 2005
Template** adında bir kurulum daha bulacaksınız. Bu kurulumu da
yüklediğinizde artık Visual Studio 2005 içerisinde yeni bir proje
yaratırkan "Visual C\#" altında "Silverlight" seçeneği ile de
karşılaşacaksınız. Bu seçeneğin sadece Visual C\# altında çıkıyor
olmasının nedeni Silverlight proje şablonu'nun C\# proje şablonlarından
türetilmiş olması. Aksi halde Silverlight 1.0'ın C\#, VB gibi .NET
dilleri ile herhangi bir ilişkisi yok.

![Visual Studio 2005 içerisinde Silverlight Proje
seçeneği.](http://cdn.daron.yondem.com/assets/1821/23102007_1.png)\
*Visual Studio 2005 içerisinde Silverlight Proje seçeneği.*

Artık Visual Studio 2005 ile Silverlight projeleri yaratabilir veya var
olan projeleri açabiliriz. Tabi bu noktada "*Varolan proje nerden var
olacak biz yaratmazsak*?" diyenler varsa :) Silverlight projeleri
yaratabileceğimiz bir diğer alternatif yazılıma geçiş yapmakta fayda
var. Aslına bakarsan tam olarak bir alternatif denemez çünkü
**Expression Blend 2** ile Visual Studio'nun projelerdeki konumu çok
farklı. Expression Blend 2 görsel animasyonların hazırlanması noktasında
devreye girerken Visual Studio ise zengin Intellisense desteği ile daha
çok programcılara hitap ediyor. Şu an için Visual Studio 2005 içerisinde
JavaScript Intellisense desteği bulunmasa da 2008 sürümünde bu konuda da
ciddi gelişmeler olacak.

Konuya geri dönmemiz gerekirse, bilgisayarınıza Expression Blend 2'yi de
aşağıdaki adresten yükleyebilirsiniz. Blend 2 şu an September Preview
aşamasında, yani daha tam anlamıyla yayınlanmış, son haline gelmiş bir
yazılım değil.

<http://www.microsoft.com/Expression/products/download.aspx?key=blend2preview>

Tüm bu yüklemeleri yaptığınızda aslında tüm hazırlıklarınızı da bitirmiş
oluyorsunuz fakat eksik kalan ufak bir nokta var. Visual Studio
içerisinde Silverlight uygulamalarımızın XAML kodlarını düzenleme
şansımız var. Eğer yukarıda bahsettiğim gibi WPF desteğini de
yüklediyseniz zaten Visual Studio XAML dosyaları açarak size gerekli
Intellisense desteğini sağlayacaktır. Fakat konu Silverlight olunca
Intellisense desteğinin de farklılaşması gerekiyor çünkü Silverlight
içerisindeki XAML yapısı WPF'deki kadar zengin değil ve aslında
Silverlight içerisinde kullanamayacağımız kodların Intellisense ile
gelmesi durumu söz konusu ki bu hiç de hoş bir durum değil. O nedenle
Silverlight için özel bir Intellisense veritabanı yüklememiz gerekiyor.
Bu veritabanı Silverlight 1.0 SDK ile beraber geliyor.

Benim bilgisayarıma yaptığım kurulumda ihtiyacım olan
**Silverlight.xsd** dosyasını
**C:\\Program Files\\Microsoft Silverlight 1.0 SDK\\Tools\\silverlight.xsd**
adresinde buldum. Bu dosyayı alarak yine kendi bilgisayarımdaki
**C:\\Program Files\\Microsoft Visual Studio 8\\Xml\\Schemas** adresine
kopyaladım. Siz bilgisayarınızdaki kurulumlara göre bu yolları
özelleştirebilirsiniz.

Tüm işlemleri tamamladık. Artık sonraki makalelerde Silverlight
uygulamalarına yelken açabiliriz.

Hepinize kolay gelsin.


