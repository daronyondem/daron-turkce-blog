---
FallbackID: 1879
Title: "Visual Basic 9.0 (2008) Extension Methods"
date: "2007-12-10"
EntryID: Visual_Basic_9-2008_Extension_Methods
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Basic 2008, Visual Basic .NET
old.EntryID: d0410ea6-2365-49b1-9452-8591d1af27ec
---
# Visual Basic 9.0 (2008) Extension Methods
Bu yazımda **VB 9.0** sürümü, yani **Visual Studio 2008** ile beraber
gelen **Extension Methods** yapısından bahsedeceğim. Extension metodlar
sayesinde herhangi bir Base Type'a yeni özellikler ekleyebiliyorsunuz.
Örneğin aşağıdaki gibi bir kod yazılbiliyor:

    <span style="color: blue;">Dim</span> Sayi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 20

    <span style="color: blue;">Dim</span> Sayi2 <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= Sayi.Karesi

    MsgBox(Sayi2)

    <span style="color: green;">'SONUÇ = 400</span>

Yukarıdaki kodda aslında **Integer Base Type** içerisine bir ekleme
yapılmış durumda. Böylece hangi **Integer** değişkenden sonra
Intellisense ile gelen seçeneklere bakarsanız bakın her zaman **Karesi**
metodunu görüyorsunuz ve söz konusu metot değişkenin karesini geri
döndürüyor. Peki bunu nasıl yapıyoruz?

**Extension Methods yaramanın yolları**

Extension Method yaratmanın ilk kuralı metodların bir **Module**
içerisinde yer almak zorunda olması. İkinci kural ise her metodun aldığı
ilk parametrenin metodun extend edeceği **Base Type** ile aynı olması.
Tüm bu kurallara uyarak aşağıdaki gibi bir **Extension Method**
tanımlayabiliyoruz.

<span style="color: blue;">Public</span> <span
style="color: blue;">Module</span> Extenders

      **\<System.Runtime.CompilerServices.Extension()\> \_**

      <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Karesi(<span
style="color: blue;">ByVal</span> sonuc <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> sonuc \* sonuc

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Module</span>

Yukarıdaki kod içerisinde özellikle koyu yazılan satıra dikkat etmekte
fayda var. Bu satır söz konusu metodun bir Extension Method olduğunu
belirtiyor. **Karesi** adındaki metodumun ilk ve tek parametresi
**Integer** olduğu için Integer Base Type'ı etkileyecek. İlk verdiğim
örnekteki kodun çalışır halini bir Winforms uygulaması olarak
düşündüğümüzde kodumuz aşağıdaki gibi sonlanıyor.

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
Button1.Click

        <span style="color: blue;">Dim</span> Sayi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 20

        <span style="color: blue;">Dim</span> Sayi2 <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= Sayi.Karesi

        MsgBox(Sayi2)

        <span style="color: green;">'SONUÇ = 400</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Module</span> Extenders

    \<System.Runtime.CompilerServices.Extension()\> \_

      <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Karesi(<span
style="color: blue;">ByVal</span> sonuc <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> sonuc \* sonuc

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Module</span>

Peki ya bu metodlara bir de ek parametre vermek istersek nasıl yaparız?
Tek yapmanız gereken Extension Method'unuzu tanımlarken ek
parametrelerini metodunuza eklemek.

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
Button1.Click

        <span style="color: blue;">Dim</span> Sayi <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 20

        <span style="color: blue;">Dim</span> Sayi2 <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= Sayi.Carp(10)

        MsgBox(Sayi2)

        <span style="color: green;">'SONUÇ = 200</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Module</span> Extenders

    \<System.Runtime.CompilerServices.Extension()\> \_

      <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Carp(<span
style="color: blue;">ByVal</span> sonuc <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> Carpilacak <span
style="color: blue;">As</span> <span
style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

        <span style="color: blue;">Return</span> sonuc \* Carpilacak

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Module</span>

Yukarıdaki kod içerisinde yer alan **Carp** adındaki Extension Method'un
toplam iki parametresi var. Bunlardan ilki metodun BaseType'ına ait
değeri getirirken ikincisi ise gerçek parametrenin ta kendisi.

Hazırladığınız **Extension Modulelerini** farklı dosyalara yazarak her
sayfaya **Import** ederek kullanabilirsiniz. Arka planda aslında
bağımsız bir metot çağırmaktan farklı bir şey çalışmıyor sadece kullanım
ve kodlama açısından bir kolaylık söz konusu.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-12-10 tarihinde yayinlanmistir.*
