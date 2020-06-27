---
FallbackID: 1937
Title: "Visual Studio 2008 ve XAML Biçimlendirme"
date: "2008-1-30"
EntryID: Visual_Studio_2008_ve_XAML_Bicimlendirme
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Visual Studio 2008, WPF
old.EntryID: 30b195f4-8146-47e9-aad3-f7f9665f04e4
---
XAML kodlarını yazarken hangi elementin ne özelliğe sahip olduğunu
bulmak bazen karışık kodlarda iyice içinden çıkılmaz bir hal alabiliyor.
Bu tarz durumlarda "Keşke bir kod düzenleyici olsa!" gibi haykırışlarda
bulunabilirsiniz. Aslında var :) Visual Studio 2008 içerisinde
"**Tools/Options**" menüsüne ufak bir yolculuk ile bu ayarları
bulabilirsiniz.

![XAML formatlama özellikleri Visual Studio
içerisinde.](media/Visual_Studio_2008_ve_XAML_Bicimlendirme/30012008_1.png)\
*XAML formatlama özellikleri Visual Studio içerisinde.*

Yukarıdaki şekli ile XAML kodları için "Position each attribute on a
separate line" seçeneğini işaretlerseniz bundan sonra Visual Studio
içerisine yapıştırdığınız kodlar otomatik olarak formatlanacak ve
aşağıdaki hale dönüşecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

      <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

      <span style="color: red;"> Width</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Background</span><span
style="color: blue;">="White"</span>

      <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Glyphs</span><span style="color: red;">
Width</span><span style="color: blue;">="147"</span>

        <span style="color: red;"> Height</span><span
style="color: blue;">="93"</span>

        <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="29"</span>

        <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="76"</span>

        <span style="color: red;"> UnicodeString</span><span
style="color: blue;">="Selamlar"</span>

        <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FF000000"</span>

        <span style="color: red;"> FontRenderingEmSize</span><span
style="color: blue;">="72"</span>

        <span style="color: red;"> FontUri</span><span
style="color: blue;">="webdings.ttf" /\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Gördüğünüz gibi taglara ait her bir özellik ayrı satırlar olarak
yerleştirilmiş. Böylece çok daha kolay okunabilir bir kod
sağlanabiliyor. Tercihlerinize göre farklı ayarlar yapmanız da mümkün.

Hepinize kolay gelsin.


