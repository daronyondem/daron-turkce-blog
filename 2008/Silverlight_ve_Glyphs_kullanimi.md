---
FallbackID: 1934
Title: Silverlight ve Glyphs kullanımı
PublishDate: 29/1/2008
EntryID: Silverlight_ve_Glyphs_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: b131244e-b2af-44a6-836a-3815cb36fe6c
---
Daha önceki yazılarımda Silverlight 1.0 ile beraber sunucu tarafına
yerleştirilen font dosyalarının istemcide "yükleme bağımsız" ve
"platform bağımsız" olarak nasıl kullanılabileceğinden bahsetmiştim.
Bunlara ek olarak daha kolay bir kullanım ile özellikle farklı font
dosyalarındaki belirli görselleri gösterme amacıyla kullanabileceğiniz
bir de **Glyphs** kontrolümüz bulunuyor.

Örneğimizde meşhur Webdings font serisinden bir font kullanarak
istediğimiz bir görselin gösterilmesini sağlayacağız. Bunun için
herhangi bir JavaScript kodu yazmamız gerekmiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="300"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Glyphs</span><span style="color: red;">
Width</span><span style="color: blue;">="147"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="93"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="29"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="76"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FF000000"</span>

<span style="color: red;">  FontRenderingEmSize</span><span
style="color: blue;">="72"</span><span style="color: red;">
**Indices**</span><span style="color: blue;">**="134"**</span><span
style="color: red;"> **FontUri**</span><span
style="color: blue;">**="webdings.ttf"**/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu içerisinde özellikle koyu yazılı bölgeye dikkat
etmekte fayda var. Webdings.ttf dosyası Silverlight tarafından otomatik
olarak sunucudan indirilerek font içerisindeki karakter tablosundan 134.
karakter alınarak ekranda gösterilecektir.

![Glyphs ile font dosyasından alınan vektörel
görsel.](http://cdn.daron.yondem.com/assets/1934/28012008_1.png)\
*Glyphs ile font dosyasından alınan vektörel görsel.*

Fontlardan tek tek görsel almanın yanı sıra isterseniz **Glyphs**
kontrolünü belirli bir yazı bir font ile göstermek için de
kullanabilirsiniz. Bu noktada benim tercihim yazının başında belirttiğim
ve daha önceki yazılarımdaki teknik olacaktır fakat bu tekniğin avantajı
herhangi bir JavaScript kodu yazmıyor olmak olarak da
değerlendirilebilir :)

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

<span style="color: red;">  xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">  Width</span><span
style="color: blue;">="300"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span>

<span style="color: red;">  Background</span><span
style="color: blue;">="White"</span>

<span style="color: red;">  x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"</span>

<span style="color: blue;">  \></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Glyphs</span><span style="color: red;">
Width</span><span style="color: blue;">="147"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="93"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="29"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="76"</span>

<span style="color: red;">  UnicodeString</span><span
style="color: blue;">="Selamlar"</span><span style="color: red;">
Fill</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> FontRenderingEmSize</span><span
style="color: blue;">="72"</span>

<span style="color: red;">  FontUri</span><span
style="color: blue;">="webdings.ttf"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Bu sefer farklı olarak **Indices** tanımlamasını yapmak yerine doğrudan
göstermek istediğimiz karakterleri **UnicodeString** parametresine
aktarıyoruz.

Hepinize kolay gelsin.


