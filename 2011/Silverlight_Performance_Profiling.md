---
FallbackID: 2570
Title: Silverlight Performance Profiling
PublishDate: 26/4/2011
EntryID: Silverlight_Performance_Profiling
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4, Silverlight 5, Visual Studio 2010
old.EntryID: 96723672-c174-4480-b7a6-fd462fe3eeda
---
Silverlight uygulamalarında ihtiyaç duyulan Visual Studio
özelliklerinden biri de performans metriklerini analiz edebilmek ve
inceleyebilmekti. Aslında bu ihtiyacımızı ilkel yöntemlerle
karşılayabiliyorduk :) Command Prompt üzerinden birkaç komutla VSP'yi
alıp sonra Visual Studio ile inceleyebiliyorduk. Bu noktada ilkel
dediğim Command Prompt oluyor evet :) Özellikle IE instance'ı yaratıp
process ID'yi bazı komutlara parametre veriyor olmak pek modern bir
deneyim sayılmasa gerek.

![Silverlight CPU Profiler
Sonucu](http://cdn.daron.yondem.com/assets/2570/26042011_1.png)\
*Silverlight CPU Profiler Sonucu*

Olayın özüne dönersek; artık Visual Studio 2010 SP1 ile beraber standart
Visual Studio içerisindeki GUI'ler yardımı ile de Silverlight Profiling
yapabiliyoruz. Ekranlar tanıdık geleceği için hızlıca üzerinden geçerek
"neler olmuş?" sorusuna cevap vermeye çalışalım.

**Performance Wizard**

Herhangi bir Silverlight projesi içeren Solution içerisinden Silverlight
projesini seçip Visual Studio menüsünden **Analyze, Launch Performance
Wizard** komutunu vererek Performance Wizard ekranına gelebiliriz. CPU
profiling işlemi için ek birşey yapmanız gerek yok ama memory profiling
için tavsiyem uygulamanızı desktop moduna almanız ve debug için de
desktop seçeneğini kullanmanız.

![Silverlight Memory
Profiling](http://cdn.daron.yondem.com/assets/2570/26042011_2.png)\
*Silverlight Memory Profiling*

Memory profiling öncesinde uygulamanızı desktop moduna aldıktan sonra
profiling için de bir sonraki ekranda Silverlight projemizi seçiyoruz.
Son olarak Finish düğmesine bastığınızda uygulama açılacak ve profiling
kaydı alınmaya başlayacaktır.

![Profiling için uygun projeyi
seçiyoruz.](http://cdn.daron.yondem.com/assets/2570/26042011_3.png)\
*Profiling için uygun projeyi seçiyoruz.*

Profiling sonuçlarını her zamanki gibi Visual Studio içerisinde
inceleyebilirsiniz.

![Silverlight Memory Profiling
Sonucu](http://cdn.daron.yondem.com/assets/2570/26042011_4.png)\
*Silverlight Memory Profiling Sonucu*

Eğer ki işin için SL tarafından kullandığınız web servislerini yani
ASP.NET uygulamanızı da katmak isterseniz aynı yukarıdaki gibi
Performance Profiler'ı başlattıktan sonra Visual Studio içerisinden
"Performance Explorer" paneline gidip "Attach" düğmesine basarak ASP.NET
tarafı için de uygun iexplorer instance'ını profiler'a ekleyebilirsiniz.

![ASP.NET ve Silverlight
beraber...](http://cdn.daron.yondem.com/assets/2570/26042011_5.png)\
*ASP.NET ve Silverlight beraber...*

Böylece aynı raporda hem SL hem ASP.NET tarafınıa görebilir ve
performans analizi yapabilirsiniz.

Hepinize kolay gelsin ;)


