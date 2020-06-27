# Silverlight 3.0 ve harici Resource dosyalarının MergedResourceDictionary yapısı ile kullanımı
Silverlight ve WPF ile beraber gelen Resource yapıları özellikle web
tasarımcıları tarafından alışılmış CSS'in çok daha gelişmiş bir hali
şeklinde tanımlanabilir. Sadece görsel anlamda değil aynı anda
kontrollerin veya nesnelerin işlevsellik anlamında da birçok
özelliklerinin birer stil olarak saklanmasını ve tekrar
kullanılmalarının yanı sıra uygulama çerçevesinde merkezi yönetim
sağlamasını da düşünürsek Silverlight projelerde Resource kullanımının
büyük önemi var.

Maalesef Silverlight 2.0 ile beraber elimizdeki tek seçenek
Resource'larımızı App.xaml içerisine yerleştirerek uygulama çapında
kullanmaktı. Oysa çoğu zaman harici CSS dosyaları gibi Silverlight
tarafında da Resource'larımızı harici dosyalara alarak farklı
uygulamalarda da ortak olarak kullanmak istedik. Microsoft bizi dinlemiş
olsa gerek ki Silverlight 3.0 ile beraber **MergedDictionaries** yapısı
geliyor.

**Nedir bu MergedDictionaries?**

MergedDictionary'ler sayesinde harici bir dosyada yer alan
ResourceDictionary'lerimizi Silverlight uygulamalarımda yer alan
kontrollerinin Resources koleksyonlarına ekleyebiliyoruz. Böylece artık
harici dosyalarda Resource'larımızı saklayabiliriz. Peki nasıl
yapacağız? Gelin basit bir örnek ile adım adım bu işlemleri nasıl
yapabileceğimiz ve ne gibi seçeneklerin bizi beklediğine bir göz atalım.

**[XAML / HariciResource.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: red;">    xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SolidColorBrush</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="**OzelRenk**"</span><span style="color: red;">
Color</span><span style="color: blue;">="\#FF499422"/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz kod harici bir XAML dosyası içerisinde tek başına
bulunuyor. Aslında bu dosya harici bir **ResourceDictionary** tanımlıyor
ve içerisinde de sadece bir adet **SolidColorBrush** var. Bunun gibi
farklı Resource tiplerini de bu dosya içerisinde saklayabiliriz. Biz
şimdilik kodlarımız kısa ve anlaşılır olsun diye bu basit örnek
üzerinden ilerleyelim. **OzelRenk** adındaki bu Resource'u uygulamanız
içerisinde kullanabilmeniz için ilk olarak dosyayı Silverlight projenize
eklemeniz gerekiyor. Ekleme işlemi sonrası Solution Explorer içerisinden
dosyayı seçtiğinizde Properties panelinde **Build Action**'ın
**Content** olmasına dikkat edin. Böylece XAML dosyası XAP içerisindeki
DLL'inize eklenecektir.

Dosyamızı projemize ekledik fakat hala onu herhangi bir yerde
tanımlamadık. Bu noktada iki seçenek var, bunlardan biri söz konusu
tanımlamayı App.XAML içerisinde yaparak harici Resource dosyasındaki tüm
Resource'ların uygulamada her yerde kullanılabilmesini sağlamak,
ikincisi ise sadece UserControl başına harici dosyayı Import etmek. Her
iki seçenekte de aynı kod kullanılacağı için gelin App.XAML içerisinde
nasıl bir değişiklik yapmamız gerektiğine göz atalım.

**[XAML / App.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Application</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

            <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication14.App"</span>

            <span style="color: blue;"> \></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Application.Resources</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary.MergedDictionaries</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: red;"> Source</span><span
style="color: blue;">="HariciResource.xaml"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ResourceDictionary.MergedDictionaries</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Application.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Application</span><span
style="color: blue;">\></span>

Gördüğünüz gibi **Application.Resources** içerisinde bir
**MergedDictionaries** serisi yaratarak içerisine de harici
**ResourceDictionary'imizi** koyuyoruz. Böylece artık harici
dosyamızdaki tüm Resource'lar rahatlıkla uygulama genelinde
kullanılabilecek.

**[XAML / UserControl1.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication14.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Fill</span><span style="color: blue;">="**{**</span><span
style="color: #a31515;">**StaticResource**</span><span
style="color: red;"> **OzelRenk**</span><span
style="color: blue;">}"</span><span style="color: red;">
Stroke</span><span style="color: blue;">="\#FF000000"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="64"</span><span style="color: red;">
Margin</span><span style="color: blue;">="74,75,159,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"/\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz basit **UserControl** içerisinde bir **Rectangle**
bulunuyor. Bu **Rectangle** aslında bizim biraz önce uygulamamıza
eklediğimiz harici Resource dosyası içerisindeki bir kaynağı kullanıyor.
Sadece buradaki koda baktığımızda aslında söz konusu Resource'ların
**App.xaml** içerisinde olması ile harici dosyada olması arasında bir
fark yok.

**Ya harici projelerdeki Resource dosyaları?**

Şu ana kadarki örneğimizde **Resource** dosyası kendi projemiz
içerisindeydi. Oysa belki de Resource'larınızı harici **Silverlight
Class Library**'ler içerisinde tutuyor olabilirsiniz. İşte böyle bir
durumda da doğrudan söz konusu DLL'i referans alarak onun içerisindeki
bir **Resource Dictionary**'yi projenizde kullanmak isteyeceğiniz kesin.
Bu gibi bir durumda değişen tek şey hedeflediğiniz XAML dosyasının
adresi yani Source.

**[XAML / App.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Application</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

            <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication16.App"</span>

            <span style="color: blue;"> \></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Application.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary.MergedDictionaries</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: red;"> Source</span><span
style="color: blue;">="SilverlightClassLibrary1;component/HariciResource.xaml"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ResourceDictionary.MergedDictionaries</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ResourceDictionary</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Application.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Application</span><span
style="color: blue;">\></span>

Yukarıdaki şekli ile örneğimizi incelediğinizde unutmayın ki projemize
referans aldığımız ve Assembly adı **SilverlightClassLibrary1** olan bir
DLL bulunuyor. Söz konusu DLL içerisinde yine bir önceki örnekte
kullandığımız **HariciResource.xaml** dosyası bulunuyor. **App.xaml**
dosyamızdaki tek farklılık **HariciResource.xaml** dosyasına ulaşırken
kullandığımız yol tanımı.

Böylece Resource'larınızı harici DLL'lerde tutabilir ve istediğiniz
projeye referans alarak kullanabilirsiniz. Veya projelerinizde Static
Resource isimleri kullanarak yer geldiğinde sadece referansı
değiştirerek tüm projenin görselliğinin değişmesini sağlayabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-6-7 tarihinde yayinlanmistir.*
