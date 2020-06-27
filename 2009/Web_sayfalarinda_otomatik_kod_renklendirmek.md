---
FallbackID: 2294
Title: "Web sayfalarında otomatik kod renklendirmek."
date: "2009-1-2"
EntryID: Web_sayfalarinda_otomatik_kod_renklendirmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
old.EntryID: f0112688-45d8-41cb-a281-73d68c5205f9
---
Yılın ilk yazısında yıl boyunca tüm yazılarınızda kullanabileceğiniz bir
kolaylıktan bahsetmek istiyorum; kod renklendirmek! Özellikle teknik
makale yazanların en büyük dertlerinden biri de Visual Studio içerisinde
kod renklendirmeleri gibi web sayfalarında da kodların renkli olarak
gözükmesini sağlamaktır. Bu kapsamda bazıları kodların resim dosyaları
olarak sitelerine koyar fakat bu durum okunabilirlilik açısından sorun
yaratmasa da "kodları kopyalayamayan milyonlar" :) tarafından küfür
yemenize ramak kaldı demektir!

Bugün aslında çok basit bir JavaScript kütüphanesinden bahsedeceğiz. Bu
kütüphane sayesinde aşağıdaki dillerle yazılmış tüm kodları otomatik
olarak sayfa içerisinden JavaScript ile renklendirebiliyorsunuz.

  ------------- --------------------------------
  **Dil Adı**   **Dile ait MicroFormat**
  C++           `cpp`, `c`, `c++`
  C\#           `c#`, `c-sharp`, `csharp`
  CSS           `css`
  Delphi        `delphi`, `pascal`
  Java          `java`
  Java Script   `js`, `jscript`, `javascript`
  PHP           `php`
  Python        `py`, `python`
  Ruby          `rb`, `ruby`, `rails`, `ror`
  Sql           `sql`
  VB            `vb`, `vb.net`
  XML/HTML      `xml`, `html`, `xhtml`, `xslt`
  ------------- --------------------------------

Yukarıdaki listede desteklenen dillerin yanında bir de MicroFormat
tanımlarını bulabilirsiniz. Bunların ne şekilde kullanıldığına birazdan
değineceğiz.

**Color Coding için altyapı hazırlıkları...**

İlk olarak sitenizdeki tüm kodları PRE tagları arasına almanız
gerekiyor. Eğer kodlarınız içerisinde XML'de olduğu gibi \< ve \>
işaretleri varsa bu sefer de bir textarea kullanabilirsiniz. Söz konusu
tagların hepsine isim olarak aynı ismi vermeniz gerek. Ayrıca tagların
CSS class isminin de yukarıdaki listede bulunan dillere göre
MicroFormat'lardan alınması şart. Gelin hızlı bir örnekle nasıl bir
şeyden bahsettiğimizi görelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">pre</span> <span
style="color: red;">name</span><span style="color: blue;">="code"</span>
<span style="color: red;">class</span><span
style="color: blue;">="vb.net"\></span>

Dim x as string

<span style="color: blue;">\</</span><span
style="color: #a31515;">pre</span><span style="color: blue;">\></span>

Gördüğünüz gibi **PRE** tagının ismi **CODE** ve class değeri de
**vb.net** şeklinde ayarlanmış. Birazdan yazacağımız JavaScript kodunda
sayfada adı **code** olan tüm tagların içeriğinin renklendirilmesini
belirteceğiz ve renklendirme yapılırken her bir **code** adındaki tagın
class ismine bakılarak hangi dilde kod yazıldığını anlaşılacak. Peki tüm
bunları nasıl yapacağız?

İlk olarak [buradan](http://code.google.com/p/syntaxhighlighter/)
kullanacağımız tüm JavaScript dosyalarını indirebilirsiniz. Dosyalar
içerisinde kodların görselliğini ayarlayacak bir CSS ve bir de clipboard
kopyalama sistemi için Flash dosyası bulunuyor. Özellikle
bilgisayarınıza tüm dosyaları indirdiğinizde scripts klasörüne
bakarsanız aslında her dil için ayrı ayrı JavaScript dosyaları
bulunduğunu görebilirsiniz. Paketteki **shCore.js** dosyası tüm
renklendirme sisteminin ana dosyası. Diğer JS dosyaları ise ayrı ayrı
dillere özel olarak hazırlanmış. Bu dosyalardan hangilerini istiyorsanız
onları sayfanıza eklemeniz yeterli olacaktır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">link</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"</span> <span
style="color: red;">rel</span><span
style="color: blue;">="stylesheet"</span> <span
style="color: red;">href</span><span
style="color: blue;">="styles/SyntaxHighlighter.css"\>\</</span><span
style="color: #a31515;">link</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">language</span><span
style="color: blue;">="javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="scripts/shCore.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">language</span><span
style="color: blue;">="javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="scripts/shBrushVb.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">language</span><span
style="color: blue;">="javascript"\></span>window.onload = <span
style="color: blue;">function</span> ()

{    dp.SyntaxHighlighter.ClipboardSwf = <span
style="color: #a31515;">'/scripts/clipboard.swf'</span>;   

dp.SyntaxHighlighter.HighlightAll(<span
style="color: #a31515;">'code'</span>);}<span
style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz kodları sayfanıza yerleştirirseniz aslında tüm
gerekli ayarları da tamamlamış oluyorsunuz. Böylece gerekli CSS
sınıfları ve JavaScript kütüphaneleri sayfaya eklenmiş oldu. Son olarak
sayfa açıldığında da hem ClipBoard için kullanacağımız Flash dosyasını
hem de sayfada taranacak tagların isimlerini aktarmış olduk.

![Renklendirilmiş
kodumuz.](media/Web_sayfalarinda_otomatik_kod_renklendirmek/01012009.png)\
*Renklendirilmiş kodumuz.*

Yukarıda gördüğünüz son görsel şekil yazdığımız kodların sonucu ortaya
çıkıyor. JavaScript kütüphanesi PRE taglarından böyle bir görsellik
yaratıyor. Eğer isterseniz bu görsellik içerisinde bazı noktaları da PRE
taglarına ek parametreler ekleyerek tanımlayabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">pre</span> <span
style="color: red;">name</span><span style="color: blue;">="code"</span>
<span style="color: red;">class</span><span
style="color: blue;">="vb.net:nocontrols:firstline[10]"\></span>"\>

Dim x as string

<span style="color: blue;">\</</span><span
style="color: #a31515;">pre</span><span style="color: blue;">\></span>

Yukarıdaki kod içerisinde **class** değerinde kullandığımız dili
tanımladıktan sonra üst üste iki nokta koyarak diğer parametrelerimizi
de yazabiliyoruz. Bu parametrelerden **nocontrols** parametresi görsel
arayüzde üstteki düğmelerin gözükmemesini sağlarken **firstline** ise
kod görünümüzdeki ilk satırın satır numarasını belirliyor.

Hepinize yeni yılda bol paylaşımlı günler dilerim ;)


