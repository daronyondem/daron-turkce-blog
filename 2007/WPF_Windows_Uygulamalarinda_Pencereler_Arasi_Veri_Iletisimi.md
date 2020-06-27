# WPF Windows Uygulamalarında Pencereler Arası Veri İletişimi
WPF Windows uygulamalarında klasik Windows uygulamalarında olduğu gibi
birden çok pencere açarak kullanıcıların farklı pencerelerde aynı anda
işlem yapmalarını sağlayabilirsiniz. Bu işlemler yapılırken iki veya
daha fazla pencere arasında gerçek zamanlı olarak veri aktarımı
gerekebilir. Bu tip bir durumda WPF uygulamalarında kullanabileceğimiz
**Application** objesi yardımımıza yetişiyor. Uygulama içerisindeki tüm
XAML sayfaları ve Classlar **Application** objesine erişerek herhangi
bir tipteki objeyi, değişkeni kaydedebilir veya okuyabilir. Bir örnek
ile bu işlemleri nasıl yapabileceğimizi inceleyelim.

**Ön Hazırlık**

Visual Studio ile WPF uygulamaları yaratabilmek için sistemimizde **.NET
Framework 3.0** ve gerekli **Visual Studio Extension**'larının kurulu
olması gerekiyor. Yükleme paketlerini aşağıdaki linklerden
indirebilirsiniz.

<http://www.microsoft.com/downloads/details.aspx?familyid=10CC340B-F857-4A14-83F5-25634C3BF043&displaylang=en>[\

http://www.microsoft.com/downloads/details.aspx?familyid=F54F5537-CC86-4BF5-AE44-F5A1E805680D&displaylang=en](http://www.microsoft.com/downloads/details.aspx?familyid=F54F5537-CC86-4BF5-AE44-F5A1E805680D&displaylang=en "Visual Studio 2005 extensions for .NET Framework 3.0 (WCF & WPF), November 2006 CTP")

**Uygulama Açılışında Birden Çok Pencere Açmak**

Visual Studio 2005 içerisinde yeni bir WPF Windows uygulaması
başlatıyoruz. WPF Windows uygulamaları ilk açıldıklarında varsayılan
pencereyi yüklerler. Bunun yanı sıra isterseniz farklı pencereleri de
uygulama açılışında açabilirsiniz. Gerekli kodları yazmak üzere
projemize ait **App.xaml** dosyasını açıyoruz.

<span style="color:green; ">' Interaction logic for App.xaml</span>\
<span style="color:blue; ">Partial</span><span> <span
style="color:blue; ">Public</span> <span
style="color:blue; ">Class</span> App</span>\
<span>    <span style="color:blue; ">Inherits</span>
System.Windows.Application</span>\
<span> </span>\
<span>    <span style="color:blue; ">Private</span> <span
style="color:blue; ">Sub</span> App\_Startup(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.Windows.StartupEventArgs) <span
style="color:blue; ">Handles</span> <span
style="color:blue; ">Me</span>.Startup</span>\
<span>        <span style="color:blue; ">Dim</span> x <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
Window2</span>\
<span>        x.Show()</span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; ">End</span><span> <span
style="color:blue; ">Class</span></span>

Yukarıdaki kodumuzda **Application'a** ait **StartUp** durumunu
kullanıyoruz. Uygulama ilk başlatıldığında **Window2** adındaki
penceremizden bir adet yaratarak kullanıcıya gösteriyoruz. Bu şekilde
birden çok pencereyi uygulamanın ilk başında açmak mümkün. Açtığımız bu
pencere kapatıldığında uygulamamızın da kapatılmasını istiyorsak söz
konusu pencerelere aşağıdaki kodu yazmamız gerekecek.

<span>    <span style="color:blue; ">Private</span> <span
style="color:blue; ">Sub</span> Window2\_Closing(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.ComponentModel.CancelEventArgs)
<span style="color:blue; ">Handles</span> <span
style="color:blue; ">Me</span>.Closing</span>\
<span>        Application.Current.**Shutdown**()</span>\
 <span style="line-height:115%; ">    <span
style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>

**Window2'ye** ait **Closing** durumuna yazdığımız kod ile uygulamamızın
tamamen kapatılmasını sağlıyoruz. Şimdi gelelim bu iki pencereyi birbiri
ile konuşturmaya.

**Farklı Pencerelerin İletişimi**

Uygulalamızda ilk açılan pencere olan **Window1** içerisinde aşağıdaki
**Class** yapısını tanımlayalım.

<span>    <span style="color:blue; ">Public</span> <span
style="color:blue; ">Class</span> Adam</span>\
<span>        <span style="color:blue; ">Dim</span> \_Adi <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>        <span style="color:blue; ">Dim</span> \_Soyadi <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span style="color:blue; "> </span>\
<span>        <span style="color:blue; ">Property</span> Adi() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
\_Adi</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>                \_Adi = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span style="color:blue; "> </span>\
<span>        <span style="color:blue; ">Property</span> Soyadi() <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span></span>\
<span>            <span style="color:blue; ">Get</span></span>\
<span>                <span style="color:blue; ">Return</span>
\_Soyadi</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Get</span></span>\
<span>            <span style="color:blue; ">Set</span>(<span
style="color:blue; ">ByVal</span> value <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>                \_Soyadi = value</span>\
<span>            <span style="color:blue; ">End</span> <span
style="color:blue; ">Set</span></span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Property</span></span>\
<span style="color:blue; "> </span>\
<span>        <span style="color:blue; ">Sub</span> <span
style="color:blue; ">New</span>()</span>\
<span> </span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span style="color:blue; "> </span>\
<span>        <span style="color:blue; ">Sub</span> <span
style="color:blue; ">New</span>(<span style="color:blue; ">ByVal</span>
Adi <span style="color:blue; ">As</span> <span
style="color:blue; ">String</span>, <span
style="color:blue; ">ByVal</span> Soyadi <span
style="color:blue; ">As</span> <span
style="color:blue; ">String</span>)</span>\
<span>            <span style="color:blue; ">Me</span>.Adi = Adi</span>\
<span>            <span style="color:blue; ">Me</span>.Soyadi =
Soyadi</span>\
<span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>\
<span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Class</span></span>

**Adam** adındaki bu Class yapısı üzerinden bir **adam** değişkeni
tanımlayacağız. **Adam** yapısına ait **Adi** ve **Soyadi**
özelliklerine farklı değerler aktardıktan sonra bu yapıyı başka bir
pencereyle paylaşacağız. İlk olarak gelin **Window1'e** ait XAML koduna
bakalım.

![Veri girişi yaptığımız WPF
penceremiz.](media/WPF_Windows_Uygulamalarinda_Pencereler_Arasi_Veri_Iletisimi/05092007_1.png)\
 *Veri girişi yapacağımız WPF penceresi.*\

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">Window</span><span style="color:blue; ">
</span><span style="color:red; ">x:Class</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Window1</span>"</span>\
 <span style="color:blue; ">    </span><span
style="color:red; ">xmlns</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"</span>\
<span style="color:blue; ">    </span><span
style="color:red; ">xmlns:x</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml</span>"</span>\
<span style="color:blue; ">    </span><span
style="color:red; ">Title</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">WPF\_Demo</span>"<span style="color:blue; ">
</span><span style="color:red; ">Height</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">165</span>"<span style="color:blue; "> </span><span
style="color:red; ">Width</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">301</span>"</span>\
<span style="color:blue; ">    \></span>\
<span style="color:blue; ">    \<</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">    \<</span><span
style="color:#A31515; ">TextBox</span><span style="color:blue; ">
</span><span style="color:red; ">Height</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">26</span>"<span style="color:blue; ">
</span>,</span>\
<span style="color:blue; ">             </span><span
style="color:red; ">Margin</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">51,16,142,0</span>"<span style="color:blue; ">
</span></span>\
<span style="color:blue; ">             </span><span
style="color:red; ">Name</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">TextBox1</span>"<span style="color:blue; ">
</span></span>\
<span style="color:blue; ">             </span><span
style="color:red; ">VerticalAlignment</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Top</span>"<span
style="color:blue; ">\>\</</span><span
style="color:#A31515; ">TextBox</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">    \<</span><span
style="color:#A31515; ">Button</span><span style="color:blue; ">
</span><span style="color:red; ">Margin</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">52,51,0,58</span>"<span style="color:blue; ">
</span><span style="color:red; ">Name</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Button1</span>"<span style="color:blue; ">
</span></span>\
<span style="color:blue; ">            </span><span
style="color:red; ">HorizontalAlignment</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">Left</span>"<span style="color:blue; ">
</span><span style="color:red; ">Width</span><span
style="color:blue; ">=</span>"<span style="color:blue; ">75</span>"<span
style="color:blue; ">\></span>KAYDET<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">Button</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">    \<</span><span
style="color:#A31515; ">TextBox</span><span style="color:blue; ">
</span><span style="color:red; ">Height</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">26</span>"<span style="color:blue; "> </span><span
style="color:red; ">HorizontalAlignment</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Right</span>"<span style="color:blue; ">
</span></span>\
<span style="color:blue; ">             </span><span
style="color:red; ">Margin</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">0,16,31,0</span>"<span style="color:blue; ">
</span><span style="color:red; ">VerticalAlignment</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Top</span>"<span style="color:blue; ">
</span></span>\
<span style="color:blue; ">             </span><span
style="color:red; ">Width</span><span
style="color:blue; ">=</span><span>"<span
style="color:blue; ">100</span>"<span style="color:blue; "> </span><span
style="color:red; ">Name</span><span style="color:blue; ">=</span>"<span
style="color:blue; ">TextBox2</span>"<span
style="color:blue; "> \>\</</span><span
style="color:#A31515; ">TextBox</span><span
style="color:blue; ">\></span></span>\
<span style="color:blue; ">  \</</span><span
style="color:#A31515; ">Grid</span><span style="color:blue; ">\></span>\
<span style="color:blue; ">\</</span><span
style="color:#A31515; ">Window</span><span
style="color:blue; ">\></span>

Penceremizde iki adet **TextBox** ve bir adet **Button** bulunuyor.
Düğmeye tıklandığında aşağıdaki kod çalışarak kutular içerisinde yazan
bilgiler çerçevesinde bir **adam** değişkeni yaratacak ve adını,
soyadını belirleyecek. Sonrasında da sihirli kodumuzu kullanarak
**Application** Class'ı ile veriyi kaydedecek.

<span>    <span style="color:blue; ">Private</span> <span
style="color:blue; ">Sub</span> Kaydet\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.Windows.RoutedEventArgs) <span
style="color:blue; ">Handles</span> Button1.Click</span>\
<span>        <span style="color:blue; ">Dim</span> YeniAdam <span
style="color:blue; ">As</span> <span style="color:blue; ">New</span>
**Adam**(TextBox1.Text, TextBox2.Text)</span>\
<span>        <span style="color:blue; ">If</span>
Application.Current.Properties.**Contains**(<span
style="color:#A31515; ">"Sahip"</span>) = <span
style="color:blue; ">False</span> <span
style="color:blue; ">Then</span></span>\
 <span>            Application.Current.Properties.**Add**(<span
style="color:#A31515; ">"Sahip"</span>, YeniAdam)</span>\
 <span>        <span style="color:blue; ">Else</span></span>\
<span>            Application.Current.Properties.**Item**(<span
style="color:#A31515; ">"Sahip"</span>) = YeniAdam</span>\
 <span>        <span style="color:blue; ">End</span> <span
style="color:blue; ">If</span></span>\
 <span>    <span style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>

Kodumuzda **YeniAdam** adındaki değişkenimizi yarattıktan sonra
**Application.Current** diyerek mevcut uygulamayı yakalıyoruz. Mevcut
uygulamanın **Properties** listesine farklı isimler vererek kayıtlar
koyabiliriz. Bizim kaydımızın ismi **Sahip** olacak. Kayıt daha önce
varsa sadece değiştiriyoruz. .**Contains** metodu ile kaydın daha önce
eklenip eklenmediğini kontrol edebilirsiniz.

Kaydetme işlemimiz tamamlandığında göre **Window2** penceremize ait XAML
kodunu inceleyerek çalışmalarımıza **Window2** üzerinde devam edelim.

<span style=" color:blue; ">\<</span><span
style=" color:#A31515; ">Window</span><span style=" color:blue; ">
</span><span style=" color:red; ">x:Class</span><span
style=" color:blue; ">=</span><span>"<span
style="color:blue; ">Window2</span>"</span>\
<span style=" color:blue; ">    </span><span
style=" color:red; ">xmlns</span><span
style=" color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"</span>\
<span style=" color:blue; ">    </span><span
style=" color:red; ">xmlns:x</span><span
style=" color:blue; ">=</span><span>"<span
style="color:blue; ">http://schemas.microsoft.com/winfx/2006/xaml</span>"</span>\
<span style=" color:blue; ">    </span><span
style=" color:red; ">Title</span><span
style=" color:blue; ">=</span><span>"<span
style="color:blue; ">WPF\_Demo</span>"<span style="color:blue; ">
</span><span style="color:red; ">Height</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">135</span>"<span style="color:blue; "> </span><span
style="color:red; ">Width</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">289</span>"</span>\
<span style=" color:blue; ">    \></span>\
<span style=" color:blue; ">    \<</span><span
style=" color:#A31515; ">Grid</span><span
style=" color:blue; ">\></span>\
<span style=" color:blue; ">    \<</span><span
style=" color:#A31515; ">Button</span><span style=" color:blue; ">
</span><span style=" color:red; ">Margin</span><span
style=" color:blue; ">=</span><span>"<span
style="color:blue; ">81,34,125,45</span>"<span style="color:blue; ">
</span><span style="color:red; ">Name</span><span
style="color:blue; ">=</span>"<span
style="color:blue; ">Button1</span>"<span
style="color:blue; ">\></span>Sahip Kim?<span
style="color:blue; ">\</</span><span
style="color:#A31515; ">Button</span><span
style="color:blue; ">\></span></span>\
<span style=" color:blue; ">  \</</span><span
style=" color:#A31515; ">Grid</span><span
style=" color:blue; ">\></span>\
<span style=" color:blue; ">\</</span><span
style=" color:#A31515; ">Window</span><span
style=" color:blue; ">\></span>

**Window2** içerisinde sadece bir adet **Button** var. Düğmeye
tıkladığımızda **Window1** tarafından kaydedilen bilgiyi okuyarak
kullanıcıya birer mesaj kutusu ile basit bir şekilde göstereceğiz.
Kodumuz aşağıdaki şekilde olacak.

<span>    <span style="color:blue; ">Private</span> <span
style="color:blue; ">Sub</span> Button1\_Click(<span
style="color:blue; ">ByVal</span> sender <span
style="color:blue; ">As</span> <span style="color:blue; ">Object</span>,
<span style="color:blue; ">ByVal</span> e <span
style="color:blue; ">As</span> System.Windows.RoutedEventArgs) <span
style="color:blue; ">Handles</span> Button1.Click</span>\
<span>       
MessageBox.Show(Application.Current.Properties.**Item**(<span
style="color:#A31515; ">"Sahip"</span>).**adi**)</span>\
 <span>       
MessageBox.Show(Application.Current.Properties.**Item**(<span
style="color:#A31515; ">"Sahip"</span>).**soyadi**)</span>\
 <span style="line-height:115%; ">    <span
style="color:blue; ">End</span> <span
style="color:blue; ">Sub</span></span>

Gördüğünüz gibi yine **Application.Current** diyerek uygulamamızın tüm
**Properties** listesine ulaşabiliyoruz. Burada **Sahip** adındaki
bilgiyi alarak aldığımız kişi değişkeninin **Adi** ve **Soyadi**
özelliklerine ulaşabiliyoruz. Böylece her iki pencere de açıkken birinde
yapılan değişiklikler kaydedilebilirken diğerinden de direk okunabilir
veya her iki pencere de aynı obje üzerinde değişiklikler yapabilir.
Değişiklikerin pencereler tarafından algılanmasını isterseniz
**Actived** durumlarında Application üzerinden veriler tekrar
alabilirsiniz.

Hepinize kolay gelsin.

[Örnek Uygulama Kaynak Dosyaları - 05092007\_1.zip (417,09
KB)](media/WPF_Windows_Uygulamalarinda_Pencereler_Arasi_Veri_Iletisimi/05092007_1.zip)



*Bu yazi http://daron.yondem.com adresinde, 2007-9-6 tarihinde yayinlanmistir.*
