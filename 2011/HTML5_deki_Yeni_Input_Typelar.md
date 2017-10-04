---
FallbackID: 2744
Title: HTML5'deki Yeni Input Type'lar
PublishDate: 24/12/2011
EntryID: HTML5_deki_Yeni_Input_Typelar
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, ASP.NET 4.5, HTML, HTML5, IE 10
---
HTML5 ile beraber gelen yenilikler arasında en pratiklerinden bir tanesi
input type sayısının günümüz ihtiyaçlarına göre arttırılıyor olması.
email, url, number, range, date picker, search ve color adlarında yeni
input typelarımıza hoş geldiniz diyebilirsiniz :)

**[HTML]**

        <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">name</span><span
style="color:blue;">="TextBox1"</span> <span
style="color:red;">type</span><span
style="color:blue;">="email"</span> <span
style="color:red;">id</span><span
style="color:blue;">="TextBox1"</span> <span
style="color:blue;">/\></span>

Yukarıda gördüğünüz input kontrolünün tipi aynen tahmin edeceğiniz üzere
bu kontrolün içerisine bir e-mail adresi yazılacağını belirtiyor. Bu
şekilde yapılan bir ayarlama bizi doğrudan istemci taraflı validasyon
kodu yazmaktan da kurtarıyor ve tarayıcı kendisi bu gibi validasyonları
çözebiliyor.

![HTML5 E-Mail Adresi
Kontrolü](media/HTML5_deki_Yeni_Input_Typelar/inputtypes.png)\
*HTML5 E-Mail Adresi Kontrolü*

Eğer isterseniz gösterilecek olan uyarı yazısını ve hatta özel
durumlarda validasyon için kullanılacak RegEx Pattern'i de ayrıca
belirleyebilirsiniz.

**[HTML]**

        <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">type</span><span
style="color:blue;">="tel"</span> <span
style="color:red;">name</span><span
style="color:blue;">="tel"</span> <span style="color:red;">\
            pattern</span><span
style="color:blue;">="\\(\\d\\d\\d\\) \\d\\d\\d\\\\d\\d\\d\\d"</span> <span
style="color:red;">\
            title</span><span style="color:blue;">="Telefon
numarasını (212) 2223344 şeklinde yazınız."</span> <span
style="color:blue;">/\></span>

Yukarıdaki kod içerisinde hem **pattern** hem **title** özellikleri
gerekli özelleştirmemeleri yapabilmemizi sağlıyor. Gelin hızlıca birkaç
örneğin daha kodunu inceleyelim.

**[HTML]**

    <span style="color:blue;">\<</span><span
style="color:maroon;">label</span><span style="color:blue;">\></span>\
         Enter your first name:\
        <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">name</span><span
style="color:blue;">="firstname"</span> <span
style="color:red;">type</span><span
style="color:blue;">="text"</span> <span
style="color:red;">required</span><span style="color:blue;">\></span>\
     <span style="color:blue;">\</</span><span
style="color:maroon;">label</span><span style="color:blue;">\></span>\
     <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">type</span><span
style="color:blue;">="url"</span> <span
style="color:red;">name</span><span
style="color:blue;">="url"</span> <span style="color:blue;">/\></span>\
     <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">type</span><span
style="color:blue;">="email"</span> <span
style="color:red;">name</span><span
style="color:blue;">="email"</span> <span
style="color:blue;">/\></span>\
     <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">type</span><span
style="color:blue;">="number"</span> <span
style="color:red;">min</span><span style="color:blue;">="0"</span> <span
style="color:red;">max</span><span
style="color:blue;">="10"</span> <span
style="color:red;">step</span><span
style="color:blue;">="2"</span> <span style="color:blue;">/\></span>

Kodumuzdaki yeniliklerden biri "**required**" attribute'ü. Bu attribute
sayesinde bir hücrenin kesinlikle doldurulup doldurulmaması gerektiğine
dair bilgiyi verebiliyorsunuz. Input Type **Number** olan kontrol ise
sıfır ile on arasında ikinin katlarından biri olarak bir sayı
istenmesini sağlıyor.

Eğer bu kontrollerle ilgili invalid durumundaki görselliği değiştirmek
isterseniz aşağıdaki gibi bir CSS kodu yazmak mümkün.

**[CSS]**

    <span style="color:blue;">\<</span><span
style="color:maroon;">style</span> <span
style="color:red;">type</span><span
style="color:blue;">="text/css"\></span>\
         <span style="color:maroon;">input:invalid</span>\
        {\
             <span style="color:red;">border</span>: <span
style="color:blue;">solid</span> <span style="color:blue;">red</span>;\
             <span style="color:red;">font-weight</span>: <span
style="color:blue;">bold</span>;\
         }\
    <span style="color:blue;">\</</span><span
style="color:maroon;">style</span><span style="color:blue;">\></span>

Tüm bunlarla ilgili ASP.NET 4.5 ile beraber gerekli düzenlemeleri
ASP.NET tarafında da göreceğiz.

![ASP.NET 4.5'ten yeni HTML5 Input Type'lara
destek.](media/HTML5_deki_Yeni_Input_Typelar/inputtypes2.png)\
*ASP.NET 4.5'ten yeni HTML5 Input Type'lara destek*

Ekran görüntüsünden de görebileceğiniz üzere ASP.NET'teki basit bir
Textbox'ın artık çok daha fazla TextMode'u var. Tüm bu TextMode'lar
HTML5'teki yeni Input Type'lara denk geliyor ve uygun HTML5 kodunun
yaratılmasını sağlıyor.

Gelecek çok güzel olacak :) Hepinize kolay gelsin.


