---
FallbackID: 1895
Title: Silverlight 1.0 Projeleri ve Visual Studio 2008
PublishDate: 24/12/2007
EntryID: Silverlight_1_0_Projeleri_ve_Visual_Studio_2008
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: b1dce46a-cc11-4a1c-a3ac-0c4fa89b64b0
---
Eğer **Visual Studio 2008**'e geçiş yaptıysanız yeni bir proje
yarattığınızda **Silverlight 1.0** seçeneğinin var olmadığını görerek
eminim ki siz de benim gibi hayal kırıklığına uğramışsınızdır. Visual
Studio 2005'e Silverlight 1.0 proje şablonunu yüklemek için
**Silverlight 1.0 SDK** ile beraber gelen "**Project Template**"
kurulumundan faydalanıyorduk. Maalesef Silverlight 1.0 SDK Visual Studio
2008'e ile uyumlu proje şablonlarını yükleyecek şekilde hala
yenilenmedi.

Aslına bakarsanız **Expression Blend 2 December Preview**'u da
incelediğimizde artık Silverlight 1.0 projeleri için proje dosyalarının
yaratılmadığını ve direk Visual Studio'daki "**Open Web Site"** menüsü
gibi bir klasör göstererek Silverlight 1.0 web siteleri yaratarak eski
sitelerini açabildiğimizi görüyoruz. Bu güzel bir gelişme çünkü çoğu
zaman Silverlight uygulamaları zaten var olan bir web sitesinin bir
parçası olacaktır. Ayrı bir proje olarak değerlendirmek çoğu durumda
mümkün olmuyor.

Herşeye rağmen bir şekilde Visual Studio 2008 ile beraber de Silverlight
1.0 proje şablonlarını kullanabilmemiz gerekir. Bunun için
bilgisayarınıza Visual Studio 2005 Silverlight 1.0 proje şablonunu
yükledikten sonra aşağıdaki konumda yer alan ZIP dosyasını alarak

**..\\Documents\\Visual Studio 2005\\Templates\\ProjectTemplates\\Visual
C\#\\Silverlight\\SilverlightJSApplication.zip**

aşağıdaki konuma kopyalamanız gerekiyor.

**..\\Documents\\Visual Studio 2008\\Templates\\ProjectTemplates\\Visual
C\#\\Silverlight\\SilverlightJSApplication.zip**

Kopyalama işlemini tamamladıktan sonra Visual Studio 2008'i açtığınızda
aşağıdaki şekilde Silverlight projesi yaratma seçeneği ile
karşılaşacaksınız.

![Visual Studio 2008 içerisinde Silverlight 1.0 Proje
Şablonu](http://cdn.daron.yondem.com/assets/1895/23122007_1.png)\
*Visual Studio 2008 içerisinde Silverlight 1.0 Proje Şablonu*

Bu sistemi kullanarak yarattığınız **Silverlight 1.0** projeleri ile
beraber **Visual Studio 2008** bir de Solution File yaratacaktır. Bu
dosyaları isterseniz **Expression Blend 2** ile açabilirsiniz veya
yukarıda da bahsettiğim gibi direk "File / Open / Site" menüsü ile
klasörü açmayı deneyebilirsiniz.

Hepinize kolay gelsin.

*Not:Visual Studio 2008 için Microsoft tarafından dağıtılan
**Silverlight Tools** paketi Silverlight 2.0 sürümü içindir. Yukarıdaki
bahsettiklerim 1.0 yani şu an yayında olan sürüm için geçerli.*


