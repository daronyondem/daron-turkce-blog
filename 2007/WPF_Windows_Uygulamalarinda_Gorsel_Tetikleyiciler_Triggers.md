---
FallbackID: 1779
Title: "WPF Windows Uygulamalarında Görsel Tetikleyiciler (Triggers)"
date: "2007-9-7"
EntryID: WPF_Windows_Uygulamalarinda_Gorsel_Tetikleyiciler_Triggers
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: c9813684-2844-4bb1-ab69-fda6d152e42a
---
WPF uygulamarında görsel öğelerin ön planda olduğu kesin. Bu noktada
uzmanı olmamız gereken konulardan biri de tetikleyicileri (trigger)
nasıl kullanacağımızı bilmek olacaktır. Farklı tetikleyiciler ile WPF
uygulamarımızdaki nesnelerin görsel özellikleri üzerinde değişiklikler
yapabilir ve interaktivite katabiliriz. Makalemiz boyunca
tetikleyicilarin kullanımına ve çeşitlerine değineceğiz.

**Nitelik (Property) Bazlı Tetikleyiciler**

İlk aşamada inceleyeceğimiz tetikliyici tipi belki de kullanımı en sade
ve kolay anlaşılır olan tip. Farklı nesnelerin niteliklerindeki
değişiklikler ve öne süreceğimiz şartlar çerçevesinde başka nesnelerin
görsel özellikleri üzerinde değişiklik yapmamızı sağlayacak nitelik
bazlı tetikleyiciler ile ilgili gelin hemen bir örnek yapalım. İlk
olarak tetikleyicimizi yerleştireceğimiz görsel özellikleri de içerecek
olan stil objemizi yani taglarımızı yazalım.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Style</span><span style="color:blue; ">
</span><span style="color:red; ">TargetType</span><span
style="color:blue; ">=</span><span>"<span style="color:blue; ">{x:Type
**TextBox**}</span>"<span style="color:blue; ">\></span></span>

Tagımızı yazarken **TargetType** özelliği vererek WPF uygulamamız
içerisinde tüm **TextBox** tipindeki objelere uygulanmasını sağlıyoruz.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Style.Triggers</span><span
style="color:blue; ">\></span>

Stilimize ait tetikliyicileri **Style.Triggers** tagları arasına
yerleştiriyor olacağız.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Trigger</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">IsMouseOver</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">True</span>"<span
style="color:blue; ">\></span></span>

Geldik tetikleyicimizi tanımladığımız kodlara. Hedef kontrolün, yani
bizim örneğimizde **TextBox'ın** **IsMouseOver** özelliği **True**
olduğunda çalışacak şekilde bir tetikleyici tanımladık. Tetikleyicinin
kontrol edeceği hedef kontroldeki özelliğin adını **Property**
parametresine değer olarak aktardıktan sonra karşılaştıracağımız değeri
de **Value** parametresine veriyoruz. Böylece sayfadaki herhangi bir
**TextBox'ın** fare ile üzerine gelindiğinde **IsMouseOver** özelliği
**True** olacak ve bizim de tetikleyicimiz çalışacak. Peki çalışıp da ne
yapacak?

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Setter</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Background</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Red</span>"<span style="color:blue; ">
/\></span></span>

Yukarıdaki kodumuz ile bir anlamda bir "tanımlayıcı" tanımlıyoruz ve
hedef kontrolün herhangi bir özelliğini istediğimiz bir değere
eşitleyebiliyoruz. Bizim kodumuzda hedef kontrolün **Background**
özelliği **Red** yani kırmızı olarak ayarladık. Şimdi gelin WPF
uygulamamızın tam koduna bir göz atalım.

![WPF kodumuz içerisinde tanımladığımız tetikleyicilerimiz ile TextBox
otomatik kırmızı
oluyor.](media/WPF_Windows_Uygulamalarinda_Gorsel_Tetikleyiciler_Triggers/06092007_1.png)\
 *WPF kodumuz içerisinde tanımladığımız\
 tetikleyicilerimiz ile TextBox otomatik kırmızı oluyor.*

<span style="color:blue; "><span
style="color: #000000;font-style: italic;font-weight: bold;">window1.xaml</span>\
\
 \<</span><span style="color:#A31515; ">Window</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">xmlns</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">xmlns:x</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">x:Class</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window1</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">x:Name</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">Title</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window1</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">Width</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">320</span>"<span style="color:blue; "> </span><span
style="color:red; ">Height</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">240</span>"<span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">       \<</span><span
style="color:#A31515; ">Window.Resources</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">             \<</span><span
style="color:#A31515; ">Style</span><span style="color:blue; ">
</span><span style="color:red; ">TargetType</span><span
style="color:blue; ">=</span><span>"<span style="color:blue; ">{x:Type
TextBox}</span>"<span style="color:blue; ">\></span></span>\
 <span style="color:blue; ">                    \<</span><span
style="color:#A31515; ">Style.Triggers</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                           \<</span><span
style="color:#A31515; ">Trigger</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">IsMouseOver</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">True</span>"<span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">                                 
\<</span><span style="color:#A31515; ">Setter</span><span
style="color:blue; "> </span><span
style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Background</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Red</span>"<span style="color:blue; ">
/\></span></span>\
 <span style="color:blue; ">                           \</</span><span
style="color:#A31515; ">Trigger</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                    \</</span><span
style="color:#A31515; ">Style.Triggers</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">             \</</span><span
style="color:#A31515; ">Style</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">       \</</span><span
style="color:#A31515; ">Window.Resources</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">       \<</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">
</span><span style="color:red; ">x:Name</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">LayoutRoot</span>"<span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">             \<</span><span
style="color:#A31515; ">TextBox</span><span style="color:blue; ">
</span><span style="color:red; ">Margin</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">35,48,66,0</span>"<span style="color:blue; ">
</span><span style="color:red; ">VerticalAlignment</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Top</span>"<span style="color:blue; ">
</span></span>\
 <span style="color:blue; ">                    </span><span
style="color:red; ">Height</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">33</span>"<span style="color:blue; "> </span><span
style="color:red; ">Text</span><span style="color:blue; ">=</span>"<span
style="color:blue; ">TextBox</span>"<span style="color:blue; ">
</span><span style="color:red; ">TextWrapping</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Wrap</span>"<span
style="color:blue; ">/\></span></span>\
 <span style="color:blue; ">       \</</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">\></span>\
 <span style="line-height:115%; color:blue; ">\</</span><span
style="line-height:115%; color:#A31515; ">Window</span><span
style="color:blue; ">\></span>

Uygulamamız içerisinde yer alan metin kutusu yine uygulamamızın
**Window.Resources** kısmında tanımladığımız stiller tarafından
etkilenecek. Stilimiz içerisinde tanımladığımız tetkileyiciler
gerektiğinde çalışarak metin kutusunun fonunu kırmızı yapacak.

**Çok Şartlı Tetikleyiciler**

Tetikleyicileri farklı kontrollerin özellikleri üzerinden nasıl
kullanabileceğimize baktıktan sonra sıra geldi birden fazla koşulu
kontrol ederek tetikleyicilerimizi çalıştırmaya. Bir sonraki örneğimizde
yine bir metin kutusu kullanacağız, fakat bu sefer sadece fare ile metin
kutusu üzerine gelinmesini değil aynı anda metin kutusunun içerisinde
"Sihirli Kelime" yazmasını da kontrol edeceğiz. Eğer metin kutusu
içerisinde "Sihirli Kelime" yazıyorsa fare ile üzerine geldiğimizde
metin kutusunun fon rengi değişecek. Böylece metin kutusuna ait iki
farklı niteliği kontrol etmiş olacağız.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">MultiTrigger</span><span
style="color:blue; ">\></span>

Kullanacağımız esas tag **MultiTrigger** tagı olacak. **MultiTrigger**
içerisinde istediğiniz sayıda farklı **Trigger'lar**
tanımlayabilirsiniz.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">MultiTrigger.Conditions</span><span
style="color:blue; ">\></span>

Her bir **MultiTrigger'ın** birden çok koşulu olabildiğinden
bahsetmiştik. Bu koşullarımızı **MultiTrigger.Conditions** tagları
arasına yazmamız gerekiyor.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Condition</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">IsMouseOver</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">True</span>"<span style="color:blue; ">
/\></span></span>

İşte ilk şartımızı tanımlıyoruz. Bir önceki örneğimizdeki ile aynı
özellikleri vererek tanımladığımız şartımızda hedef kontrolün
**IsMouseOver** durumunun **True** olup olmadığı kontrol edilecek.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Condition</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Text</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span style="color:blue; ">Sihirli
Kelime</span>"<span style="color:blue; "> /\></span></span>

İkinci şartımızı da yukarıdaki şekilde tanımlıyoruz. Şartımız hedef
kontrolün **Text** özelliğinin yani **TextBox'ın** içeriğinin "Sihirli
Kelime" metnine eşit olması.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Setter</span><span style="color:blue; ">
</span><span style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Background</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Green</span>"<span style="color:blue; ">
/\></span></span>

Şartlarımızı tamamladıktan sonra son olarak da yapacağımız işlemi yine
bir önceki bölümdeki ile aynı şekilde tanımlıyoruz. Oluşturduğumuz kodun
son halini aşağıda inceleyebilirsiniz.

![WPF uygulamamızda iki farklı koşulu kontrol ederek metin kutusunun fon
rengini
değiştiyoruz.](media/WPF_Windows_Uygulamalarinda_Gorsel_Tetikleyiciler_Triggers/06092007_2.png)\
 *WPF uygulamamızda iki farklı koşulu kontrol ederek\
 metin kutusunun fon rengini değiştiyoruz.*

<span style="color:blue; "><span
style=" color: #000000;font-style: italic;font-weight: bold;">window2.xaml</span>\
\
 \<</span><span style="color:#A31515; ">Window</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">xmlns</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">xmlns:x</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">x:Class</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window2</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">x:Name</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">Title</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window2</span>"</span>\
 <span style="color:blue; ">       </span><span
style="color:red; ">Width</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">320</span>"<span style="color:blue; "> </span><span
style="color:red; ">Height</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">240</span>"<span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">       \<</span><span
style="color:#A31515; ">Window.Resources</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">             \<</span><span
style="color:#A31515; ">Style</span><span style="color:blue; ">
</span><span style="color:red; ">TargetType</span><span
style="color:blue; ">=</span><span>"<span style="color:blue; ">{x:Type
TextBox}</span>"<span style="color:blue; ">\></span></span>\
 <span style="color:blue; ">                    \<</span><span
style="color:#A31515; ">Style.Triggers</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                           \<</span><span
style="color:#A31515; ">MultiTrigger</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                                 
\<</span><span
style="color:#A31515; ">MultiTrigger.Conditions</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                                       
\<</span><span style="color:#A31515; ">Condition</span><span
style="color:blue; "> </span><span
style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">IsMouseOver</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">True</span>"<span style="color:blue; ">
/\></span></span>\
 <span style="color:blue; ">                                       
\<</span><span style="color:#A31515; ">Condition</span><span
style="color:blue; "> </span><span
style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Text</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span style="color:blue; ">Sihirli
Kelime</span>"<span style="color:blue; "> /\></span></span>\
 <span style="color:blue; ">                                 
\</</span><span
style="color:#A31515; ">MultiTrigger.Conditions</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                                 
\<</span><span style="color:#A31515; ">Setter</span><span
style="color:blue; "> </span><span
style="color:red; ">Property</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Background</span>"<span style="color:blue; ">
</span><span style="color:red; ">Value</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Green</span>"<span style="color:blue; ">
/\></span></span>\
 <span style="color:blue; ">                           \</</span><span
style="color:#A31515; ">MultiTrigger</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">                    \</</span><span
style="color:#A31515; ">Style.Triggers</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">             \</</span><span
style="color:#A31515; ">Style</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">       \</</span><span
style="color:#A31515; ">Window.Resources</span><span
style="color:blue; ">\></span>\
 <span style="color:blue; ">       \<</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">
</span><span style="color:red; ">x:Name</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">LayoutRoot</span>"<span
style="color:blue; ">\></span></span>\
 <span style="color:blue; ">             \<</span><span
style="color:#A31515; ">TextBox</span><span style="color:blue; ">
</span><span style="color:red; ">Margin</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">55,88,65,72</span>"<span style="color:blue; ">
</span><span style="color:red; ">Text</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">TextBox</span>"<span style="color:blue; ">
</span><span style="color:red; ">TextWrapping</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Wrap</span>"<span
style="color:blue; ">/\></span></span>\
 <span style="color:blue; ">       \</</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">\></span>\
 <span style="line-height:115%; color:blue; ">\</</span><span
style="line-height:115%; color:#A31515; ">Window</span><span
style="color:blue; ">\></span>

WPF uygulamamızda yine bir TextBox nesnesi var. Metin kutusu içerisinde
"Sihirli Kelime" yazdığımızda ve fare ile üzerine geldiğimizde her iki
koşul da yerine getirildiği için metin kutusunun fon rengi yeşile
dönüyor.

Hepinize kolay gelsin.

[Örneklere ait kaynak kodları - 06092007\_3.zip (141,21
KB)](media/WPF_Windows_Uygulamalarinda_Gorsel_Tetikleyiciler_Triggers/06092007_3.zip)


