---
FallbackID: 2336
Title: "Silverlight UserControl'üm Design modunda Blend içinde mi? Yoksa gerçek hayatta mı?"
date: "2009-3-16"
EntryID: Silverlight_UserControl_um_Design_modunda_Blend_icinde_mi__Yoksa_gercek_hayatta_mi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: e1e64b9f-1109-4de2-9a38-e28c07b5faef
---
# Silverlight UserControl'üm Design modunda Blend içinde mi? Yoksa gerçek hayatta mı?
Bugün sizlerle ufak fakat bence bir o kadar da değerli bir ip ucu
paylaşacağım. Üzerinde çalıştığımız projelerden birinde hiç hoş olmayan
bir sorun ile karşılaştık. Aslında sorunun nedeni Visual Studio ve
Expression Blend içerisinde Silverlight projeleri düzenlenirken söz
konusu projeler içerisindeki UserControl'lerin PageLoad ve Init
kodlarının tasarım aşamasında da çalıştırılıyor olması. Ne demek
istiyorum?

Örneğin **Detay** adında bir UserControl hazırladınız ve bunu da **Ana**
adında bir UserControl'ün içerisine yerleştirdiniz. Bu yerleştirme
işlemini de XAML içerisinde namespace tanımlayarak yaptınız ki tasarımcı
Blend içerisinde söz konusu UserControl'ü rahatlıkla düzenleyebilsin.
Özetle UserControl'lerinizin XAML kodları aşağıdaki gibi olsun;

**[Ana.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication27.Ana"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> **xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**SilverlightApplication27**</span><span
style="color: blue;">**="clr-namespace:SilverlightApplication27"**</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span><span
style="color: red;"> mc</span><span style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Metin"</span><span style="color: red;">
Text</span><span style="color: blue;">="DENEME"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**SilverlightApplication27**</span><span
style="color: blue;">**:**</span><span
style="color: #a31515;">**Detay**</span><span style="color: red;">
Margin</span><span style="color: blue;">="83,61,217,139"</span><span
style="color: red;"> d</span><span style="color: blue;">:</span><span
style="color: red;">LayoutOverrides</span><span
style="color: blue;">="VerticalAlignment"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Gördüğünüz üzere diğer UserControl'ü almak üzere XAML NameSpace tanımı
yapılmış ve ekrana da Detay adındaki UserControl yerleştirilmiş.

**[Detay.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

<span style="color: red;">    mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span>

<span style="color: red;">    x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication27.Detay"</span>

<span style="color: red;">    d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="100"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="100"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Text</span><span style="color: blue;">="TextBlock"</span><span
style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Metin"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki şekli ile tanımladığımız **Detay** adındaki **UserControl**
içerisinde de sadece bir TextBlock bulunuyor. Detay'ın kodunda bir
şekilde **Page.Load** durumunda ekrandaki kontrollere veri bağlarsanız
tüm bu işlemlerin Expression Blend içerisinde **Ana.XAML** açıldığında
çalıştırıldığını göreceksiniz. Sonuç itibari ile **Ana.XAML** içerisine
**Detay** kontrolünü koyduğumuz için Blend **Ana** adındaki UserControl
içerisinde göstermek üzere Detay'ı çalıştırıp doğrudan sahneye
yerleştiriyor. "Ne kadar güzel?" dediğinizi duyar gibiyim :) Aslında
durum gerçekten hoş. Bu sistem sayesinde ana bir kontrole yerleştirilmiş
UserControl'ler kendi Page.Load'ları da çalıştırılarak gerçek çalışır
hallerindeki görüntüleri ile tasarımcıya gösteriliyorlar. Fakat ya
**Page.Load**'da çalışan kod uygulamanın bir web sunucu üzerinden host
edilmiş olmasını gerektiriyorsa? İşte tam da o noktada Blend çatlıyor :)
doğal olarak....

**Peki ne yapmak gerek?**

Çözüm basit. Bizim UserControl'lerin kendilerinin Blend'de mi yoksa
gerçekten çalışma zamanında da çalıştırıldıklarını algılamaları ve ona
uygun işlem yapmaları gerekiyor. Örneğin bizim **detay** adındaki
UserControl Blend tarafından açıldığında kendi içindeki TextBlock'e
"DENEME" yazarken, gerçekten açıldığında ise sunucudan veri çekmeli.

**[VB]**

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span>
ComponentModel.DesignerProperties.GetIsInDesignMode(<span
style="color: blue;">Me</span>) <span style="color: blue;">Then</span>

            MyServis.GetNewsFromBlogAsync()

        <span style="color: blue;">Else</span>

            textBlock.Text = <span style="color: #a31515;">"Blend
içerisinde blog ile bağlantı kurulamaz."</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

Yukarıda gördüğünüz kod ile herhangi bir **UIElement'in** Blend
içerisinde Design modunda açılıp açılmadığını öğrenebiliyorsunuz.
Örneğin bizim örneğimizde normal şartlarda web servisinden veri çeken
kod eğer Blend içerisinde açılmış ise veri çekmek yerine uygun yere
uygun mesajı yazıyor. Farklı örneklerde tasarımcıya yardımcı olmak amacı
ile DataBind ettiğiniz kontrolleri belki de tasarımcı için kod
içerisinde veri yaratıp databind edebilirsiniz. Oysa uygulama
çalıştığında gerçek veri kaynağına yönelebilir.

**GetIsInDesignMode** metoduna parametre olarak herhangi bir
**UIElement** verdiğinizde size Design modunda olunup olunmadığına dair
Boolean bir değer döndürüyor.

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2009-3-16 tarihinde yayinlanmistir.*
