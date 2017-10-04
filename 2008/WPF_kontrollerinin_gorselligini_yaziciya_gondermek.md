---
FallbackID: 2269
Title: WPF kontrollerinin görselliğini yazıcıya göndermek ;)
PublishDate: 8/12/2008
EntryID: WPF_kontrollerinin_gorselligini_yaziciya_gondermek
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: 1bda864d-a1b3-48cb-9d39-262592a0ff18
---
Bu aralar hızlıca bitirmem gereken bir WPF uygulaması üzerine
çalışıyorum :) O nedenle pratik çözümler üretmem gerekiyor ve tabi ki
bunları sizinle de paylaşmak istiyorum. Dün WPF içerisindeki bir
kontrolün görselliğini nasıl diske bir JPEG dosyası olarak
kaydedebileceğimizi görmüştük. Bugün de WPF'deki bir kontrolün
görselliğini nasıl yazıcıya gönderebileceğinizden bahsedeceğim :) Çok
kısa sürecek! :)

**[VB]**

<span style="color: blue;">Dim</span> MyPrinter <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
PrintDialog

<span style="color: blue;">If</span> MyPrinter.ShowDialog <span
style="color: blue;">Then</span>

   MyPrinter.PrintVisual(YazdirilacakWPFKontrolu, <span
style="color: #a31515;">"Printer kuyruğunda gözükecek bir açıklama
yazın!"</span>)

<span style="color: blue;">End</span> <span
style="color: blue;">If</span>

**[C\#]**

PrintDialog MyPrinter = <span style="color: blue;">new</span>
PrintDialog();

<span style="color: blue;">if</span> (MyPrinter.ShowDialog) {

    MyPrinter.PrintVisual(YazdirilacakWPFKontrolu, <span
style="color: #a31515;">"Printer kuyruğunda gözükecek bir açıklama
yazın!"</span>);

}

Bu kodları okuduğunuzda verdiğiniz tepkiyi çok merak ediyorum :) Acaba
WPF'deki bir kontrolün görselliğini yazıcıya yollamak bundan kolay
olabilir miydi? Basit bir şekilde bir PrintDialog yarattıktan sonra onu
kullanıcıya gösterip bir Printer seçmesini sağladıktan sonra PrintVisual
metodu ile hangi Visual'ın yazdırılacağını belirtmemiz yeterli oluyor.
Böylece rahatlıkla **vektörel** çıktılar alabiliyorsunuz. Tabi ki burada
herhangi bir sayfalama mekanizması vs yok, doğrudan Paint'ten print
alırmış gibi düşünebilirsiniz. Benim projemde ihtiyacım olan da buydu
zaten :)

Hepinize kolay gelsin.


