---
FallbackID: 1921
Title: "VB 9.0 yeniliklerinden bir demet."
date: "2008-1-17"
EntryID: VB_9_0_yeniliklerinden_bir_demet
IsActive: True
Section: software
MinutesSpent: 0
Tags: LINQ, Visual Basic 2008, Visual Basic .NET
old.EntryID: 310e1b6d-8380-4803-8230-103ae1f85c8a
---
# VB 9.0 yeniliklerinden bir demet.
Özellikle uzun metinleri hazırladığımız kodun içerisine gömmek
istediğimizde satır atlamaları vs epey can sıkıcı bir hal alıyor. Bu
nedenle çoğu zaman bu metinleri harici bir TXT dosyasına koyarak oradan
çekmeyi tercih ediyorum. Oysa yeri geldiğinde bir ASP.NET web sayfasında
minik bir HTML kodunu veya Winforms uygulamasında çok satırlı bir uyarı
mesajını rahatlıkla kodun içerisine koyabilsek ne kadar hoş olurdu değil
mi?

"*Koyarız zaten*" dediğinizi duyar gibiyim. Gelin eskiden nasıl
koyduğumuza ufak bir örnek ile bakalım.

<span style="color: blue;">Dim</span> UyarıMesaji <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Bu ""ÖZEL"" bir uyarı"</span> & vbCrLf
& <span style="color: #a31515;">"mesajıdır."</span>

Eğer içeri alacağınız metin çok uzunsa aslında bir de kodun
okunabilirliği adına kod içerisinde de satır atlayarak yazmak
isteyebilirsiniz. Bu durumda da takriben aşağıdaki gibi bir manzara
ortaya çıkacaktır.

        <span style="color: blue;">Dim</span> UyarıMesaji <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: #a31515;">"Bu ""ÖZEL"" bir uyarı"</span> \_

                                    & vbCrLf & <span
style="color: #a31515;">"mesajıdır."</span>

Peki bu kadar sorunlardan bahsettik de çözümü nedir? Çözüm **.NET
Framework 3.5** ile beraber gelen **XLINQ** sınıflarında yatıyor :)

        <span style="color: blue;">Dim</span> UyarıMesaji <span
style="color: blue;">As</span> XElement = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span><span style="color: #555555;">Bu "Özel"
bir uyarı </span>

<span style="color: #555555;">mesajıdır.</span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span>

 

        Console.Write(UyarıMesaji.Value)

İşte artık istediğiniz gibi metinlerinizi bir **XElement** olarak kod
içerisine yerleştirebilir sonra da söz konusu XElement'in **value**
metodu ile metni alabilirsiniz. Hatta daha da güzel kullanım şekilleri
var.

        <span style="color: blue;">Dim</span> **UyarıNo** <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 7893

        <span style="color: blue;">Dim</span> UyarıMesaji <span
style="color: blue;">As</span> XElement = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span><span style="color: #555555;">Bu "Özel"
bir uyarı </span>

<span style="color: #555555;">mesajıdır.</span>

<span style="color: #555555;">Uyarı numarası:</span><span
style="color: #555555; background: #fffebf;">\<%=</span> **UyarıNo**
<span style="color: #555555; background: #fffebf;">%\></span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span>

Yukarıdaki kod içerisinde yarattığımız metne bir değişkeni de metin
olarak ekliyoruz. Bu teknik özellikle bir metnin içerisine çok sayıda
farklı parametre eklenecek işimizi epey kolaylaştıracaktır. Gelin bir de
birden çok uyarı numarasının bulunabileceği bir örnek yapalım.

        <span style="color: blue;">Dim</span> UyarıNo() <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= {7893, 7777}

        <span style="color: blue;">Dim</span> UyarıMesaji <span
style="color: blue;">As</span> XElement = <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span><span style="color: #555555;">Bu "Özel"
bir uyarı </span>

<span style="color: #555555;">mesajıdır.</span>

<span style="color: #555555; background: #fffebf;">\<%=</span> <span
style="color: blue;">From</span> **Uyarilar** <span
style="color: blue;">In</span> UyarıNo <span
style="color: blue;">Select</span> <span
style="color: #6464b9;">\<</span><span
style="color: #844646;">Uyari</span><span
style="color: #6464b9;">\></span>

<span style="color: #555555;">Uyarı numarası:</span><span
style="color: #555555; background: #fffebf;">\<%=</span> **Uyarilar**
<span style="color: #555555; background: #fffebf;">%\></span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Uyari</span><span
style="color: #6464b9;">\></span>.**Value** <span
style="color: #555555; background: #fffebf;">%\></span><span
style="color: #6464b9;">\</</span><span
style="color: #844646;">Mesaj</span><span
style="color: #6464b9;">\></span>

Yukarıdaki kod kafanızı karıştırabilir. Belki biraz eski ASP günlerine
dönmek anlamanıza yardımcı olabilir. İlk olarak **UyarıNo** adında bir
diziye toplam iki adet uyarı numarası ekledim. Uyarı mesajımı yaratırken
bu dizinin içerisinde her bir uyarı numarasını mesajın sonuna yazdırmak
istiyorum. Mesajı **XElement** olarak oluştururken içine bir LINQ
sorgusu yerleştiriyorum. **LINQ** sorgusu geriye yine bir **XElement**
yaratarak söz konusu elementin **Value'sunu** döndürüyor. LINQ sorgusu
dizi içerisinde gezerek her bir kayıt için gerekli metni yaratarak toplu
olarak döndürecektir.

Gördüğünüz gibi **VB 9.0** ile beraber çok ilginç yenilikler geliyor.
Daha da güzeli :) bunlar maalesef C\# tarafında yok :)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-1-17 tarihinde yayinlanmistir.*
