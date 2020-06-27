---
FallbackID: 2191
Title: ".NET için De-Compile işlemleri ve Obfuscation"
date: "2008-9-20"
EntryID: NET_icin_De-Compile_islemleri_ve_Obfuscation
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 3.0, .NET Framework 3.5, ASP.NET 3.5, Silverlight 2.0, Visual Basic 2005, Visual Basic 2008, Visual Studio 2005, Visual Studio 2008, Visual Basic .NET, ASP.NET
old.EntryID: 72068eed-b6a9-4557-b1c6-260786e24e50
---
# .NET için De-Compile işlemleri ve Obfuscation
İster VB olsun ister C\#, ister web ister Windows uygulaması olsun
yazdığımız tüm kodların derlenerek (Compile) bir EXE veya DLL haline
dönüştürüldüğünü biliyoruz. Aslında .NET içerisinde yapılan işlem sizin
yazdığınız herhangi bir .NET dilindeki kodun **MSIL** (Microsoft
Intermediate Language)’a çevrilmesidir. İşte tam bu noktada akla gelen
ilk soru; acaba bu çeviri işleminin tersini yapmak mümkün mü? Yani
elimizdeki DLL veya EXE dosyasından yola çıkarak VB veya C\# kodumuzu
geri alabilir miyiz? Cevap: **Evet**.

Şu andan itibaren yapacaklarımız hedef olarak kullanacağınız uygulamanın
lisans sözleşmesine göre yeri geldiğinde suç teşkil edebilir. O nedenle
sizi özellikle uyarmak istiyorum. Çoğu zaman De-Compile işlemleri
yaparkenki amacımız yazdığımız kodun nasıl derleyici tarafında MSIL’e
çevrildiğini incelemek veya kaynak kodunu kaybettiğimiz ve bize ait olan
bir uygulamanın kodlarına ulaşmak olacaktır. Diğer yandan lisans
sözleşmesi ile aykırı düşmediği sürece farklı uygulamaları da De-Compile
ederek arka planda farklı işlemlerin nasıl yapıldığını inceleme şansınız
da olabilir.

.NET tarafına geçtiğimizde herhangi bir DLL veya EXE’nin aslında MSIL
kodları içerdiğinden bahsetmiştik. Tabi ki bu **MSIL** kodları doğrudan
bilgisayarlar tarafından çalıştırılabilir kodlar değiller. O nedenle
içerisinde MSIL bulunan bir .NET yapısının çalışabilmesi için hedef
makinede .NET Framework’ün yüklü olması gerekiyor. .NET Framework
içerisindeki **CLR** (Common Language Runtime) bizim MSIL kodumuzu
makine diline çevirerek çalışmasını sağlayacaktır. Kabaca baktığımızda
De-Compile yolunda bizim ilk olarak elimizdeki DLL veya EXE içerisinden
MSIL kodunu alarak çıkarmamız gerekecek. Bunun için doğrudan .NET
Framework SDK paketi ile beraber gelen **MSIL DisAssembler**
(**ILDASM**) uygulamasını kullanabiliriz.

**IL DASM Kullanımı**

Bilgisayarınıza .NET Framework SDK paketini kurduktan sonra doğrudan
“Başlat” menüsünden ulaşabileceğiniz ILDASM programını Visual Studio
yükleme konumu içerisinde SDK klasörü altında da bulabilirsiniz.
Programı açtıktan sonra “File / Open” menüsünden istediğiniz bir .NET
DLL veya EXE dosyasını açma şansınız olacaktır.Deneme amaçlı olarak
gelin mini bir Windows uygulaması yazalım ve ILDASM ile açarak
alacağımız sonucu görelim. Uygulamamız içerisinde birer TextBox, Button
ve Label bulunacak. Basit bir şekilde düğmeye basıldığında TextBox
içerisindeki değeri Label içerisine aktaracağız.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
Button1.Click

        Label1.Text = TextBox1.Text

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> WindowsFormsApplication1

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Form1</span> : Form

    {

        <span style="color: blue;">public</span> Form1()

        {

            InitializeComponent();

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, EventArgs e)

        {

            label1.Text = textBox1.Text;

        }

    }

}

Yukarıda yazdığımız kodlar ile oluşturduğumuz uygulamayı ILDASM ile
açarak sonucu inceleyelim. Uygulamanın ilk açılan penceresinde bizim
EXE’ye ait tüm sınıflar ve namespace’ler gözüküyor olacaktır. Eğer
herhangi bir nesnenin tanımı veya metodu ile ilgili MSIL kodunu görmek
isterseniz doğrudan çift tıklayarak yeni bir pencerede kodların
açılmasını sağlayabilirsiniz.

![ILDASM içerisinde EXE’mizin MSIL kodları açıkça
gözüküyor](media/NET_icin_De-Compile_islemleri_ve_Obfuscation/19092008_1.png)\
*ILDASM içerisinde EXE’mizin MSIL kodları açıkça gözüküyor*

Hazırladığımız örnek uygulamanın **Button\_Click** durumundaki MSIL
kodunu bulduğumuzda aşağıdaki sonuç ile karşılaşıyoruz.

**[MSIL]**

.method <span style="color: blue;">private</span> instance <span
style="color: blue;">void</span>  **Button1\_Click**(<span
style="color: blue;">object</span> sender,

                                            <span
style="color: blue;">class</span> [mscorlib]System.EventArgs e) cil
managed

{

  <span style="color: green;">// Code size       23 (0x17)</span>

  .maxstack  8

  IL\_0000:  ldarg.0

  IL\_0001:  callvirt   instance <span style="color: blue;">class</span>
[System.Windows.Forms]System.Windows.Forms.Label
WindowsApplication1.**Form1::get\_Label1()**

  IL\_0006:  ldarg.0

  IL\_0007:  callvirt   instance <span style="color: blue;">class</span>
[System.Windows.Forms]System.Windows.Forms.TextBox
WindowsApplication1.**Form1::get\_TextBox1()**

  IL\_000c:  callvirt   instance <span
style="color: blue;">string</span>
[System.Windows.Forms]System.Windows.Forms.**TextBox::get\_Text()**

  IL\_0011:  callvirt   instance <span style="color: blue;">void</span>
[System.Windows.Forms]System.Windows.Forms.**Label::set\_Text(**<span
style="color: blue;">**string**</span>)

  IL\_0016:  ret

} <span style="color: green;">// end of method
Form1::Button1\_Click</span>

Yukarıdaki MSIL kodu normal şartlarda CLR tarafından makine koduna
çevrilerek hedef ortamda çalıştırılıyor. Artık MSIL kodumuzu aldığımıza
göre bu kodu VB veya C\# koduna çevirmemiz lazım. Tabi bu iş o kadar
kolay değil ve tek tek elle yapılabilecek bir iş de değil. O nedenle bu
sefer de farklı bir araç kullanacağız.

**Reflector iş başında**

Lutz Roeder tarafından yazılmış bir program olarak Reflector’ı
<http://www.red-gate.com/products/reflector/> adresinden bilgisayarınıza
indirebilirsiniz. Program aslında bir önceki adımda anlattığım MSIL
çözme işlemini de kendi içinde yapabiliyor. Bununla kalmayıp çözdüğü
MSIL kodunu istediğiniz .NET diline de çevirebiliyor.

Programı çalıştırdıktan sonra “File / Open” menüsünden istediğiniz bir
EXE veya DLL dosyasını seçebilirsiniz. Uygulamanın ana penceresindeki
sınıf listesine hemen seçtiğiniz program da gelecektir.

![Reflector ile kaynak kodunu
görebiliyoruz.](media/NET_icin_De-Compile_islemleri_ve_Obfuscation/19092008_2.png)\
*Reflector ile kaynak kodunu görebiliyoruz.*

Ufak bir gezinti ile istediğiniz sınıfın veya metodun koduna doğrudan
ulaşabilirsiniz. Reflector arayüzündeki “Programlama Dili” seçeneğinde
VB, C\#, Delphi ve IL seçenekleri bulunuyor. Bir önceki bölümde
hazırladığımız uygulamamızı açarak **Button.Click** durumundaki kodu
farklı dillerde Reflector ile alıp inceleyelim.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> EventArgs)

    <span style="color: blue;">Me</span>.Label1.Text = <span
style="color: blue;">Me</span>.TextBox1.Text

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> Button1\_Click(<span
style="color: blue;">object</span> sender, EventArgs e)

{

    <span style="color: blue;">this</span>.Label1.Text = <span
style="color: blue;">this</span>.TextBox1.Text;

}

Yazdığımız kodlar ile Reflector’ın bize verdiği kodlar tam olarak aynı
değil. Bu durum zaten çok normal. Çünkü MSIL koduna çeviri esnasında
aslında çoğu şey değişiyor. Örneğin tanımladığımız değişkenlerin bize
özel olan isimlendirmeleri yok oluyor veya bizim kullandığımız bazı kısa
metotlar uzun şekilleri ile yazılabiliyor. Hatta özellikle VB
içerisindeki casting kolaylıkları Compile esnasında farklı
değişikliklere neden olabiliyor. Bu durumda De-Compile ile aldığımız kod
da yazdığımız koddan biraz farklı oluyor. Yine de elimizde çalışır
durumda bir kod olduğuna kesin gözü ile bakabiliriz.

**Nasıl engelleriz? Obfuscation!**

Herhalde çoğunuz “tüm kodlarımız gözler önünde” endişesi
içerisindesiniz. Aslında durum gerçekten de öyle. Tabi bu durumun birçok
faydası var. Kişisel olarak itiraf etmek gerekirse farklı yazılımları
De-Compile ederek çok şey öğrendiğimi söyleyebilirim. Bir defasında da
kendi ürettiğimiz bir yazılımı De-Compile etmemiz gerekmişti, gerçekten
hayat kurtarmıştı. Peki bunu nasıl engelleyebiliriz? İlk olarak şunu
açıkça belirtiyim, herhangi bir .NET uygulamasından MSIL kodunun
alınmasını engellemenin hiçbir yolu yok. Yapabileceğimiz tek şey MSIL
kodunun okunabilirliliğini azaltmak için işlevsel olarak aynı işi gören
fakat daha karışık bir MSIL kodu yaratmak. Bu işlem **obfuscation**
olarak adlandırılıyor.

**Obfuscation** ile ilgili sektörde çok sayıda ücretli yazılım
bulabilirsiniz. Biz bunlardan **Xenocode'**aait **Postbuild
2008** adındaki ticari yazılımı kullanarak obfuscation ile neler
yapabildiğimize bakacağız. XenoCode’u ilk açtığımızda karşımıza hemen
bir uygulama listesi geliyor. Bu listeye bir önceki adımda kendi
hazırladığımız EXE dosyasını ekleyerek uygulamanın üst menüsünden
“Protect” tabına geçiyoruz. Burada sadece Windows’da çalışacak EXE
dosyalarına uygulanabilecek özel bir koruma yöntemi olan “**Surpress
ILDASM**” seçeneğinin işaretini kaldırmamız gerek. Bu seçenek DLL’lere
zaten uygulanamayacaktır. Ekranın sağ tarafında korumak istediğimiz
sınıfların ve metodların bir listesini işaretleyebiliyoruz. Tüm ayarları
tamamladıktan sonra uygulamanın sağ altındaki “**XenoCode Application**”
düğmesine basıyoruz.

![Obfuscation işlemi için
yollardayız](media/NET_icin_De-Compile_islemleri_ve_Obfuscation/19092008_3.png)\
*Obfuscation işlemi için yollardayız*

Obfuscation işlemini tamamladıktan sonra sıra geldi testlerimizi
yapmaya. İlk olarak uygulamamızı ILDASM ile açarak bakalım MSIL kodumuz
ne hale gelmiş.

**[MSIL]**

.method <span style="color: blue;">private</span> instance <span
style="color: blue;">void</span>  **x44d0c0526a414989**(<span
style="color: blue;">object</span> **xe0292b9ed559da7d**,

                                                <span
style="color: blue;">class</span> [mscorlib]System.EventArgs
xfbf34718e704c6bc) cil managed

{

  <span style="color: green;">// Code size       23 (0x17)</span>

  .maxstack  8

  IL\_0000:  ldarg.0

  IL\_0001:  callvirt   instance <span style="color: blue;">class</span>
[System.Windows.Forms]System.Windows.Forms.Label
WindowsApplication1.**xaa4f033827d75b4d**::**get\_x029e304eb4c44750**()

  IL\_0006:  ldarg.0

  IL\_0007:  callvirt   instance <span style="color: blue;">class</span>
[System.Windows.Forms]System.Windows.Forms.TextBox
WindowsApplication1.**xaa4f033827d75b4d**::**get\_x77691a2cfb8f8048**()

  IL\_000c:  callvirt   instance <span
style="color: blue;">string</span>
[System.Windows.Forms]System.Windows.Forms.TextBox::get\_Text()

  IL\_0011:  callvirt   instance <span style="color: blue;">void</span>
[System.Windows.Forms]System.Windows.Forms.Label::set\_Text(<span
style="color: blue;">string</span>)

  IL\_0016:  ret

} <span style="color: green;">// end of method
xaa4f033827d75b4d::x44d0c0526a414989</span>

Gördüğünüz gibi aslında çok büyük bir değişiklik yok. Sadece sınıfların
ve metodların isimleri değiştirilerek karışık isimler verilmiş. Aynı
uygulamayı **Reflector** ile açtığımızda ise aşağıdaki kodları elde
ediyoruz.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> x44d0c0526a414989(<span
style="color: blue;">ByVal</span> xe0292b9ed559da7d <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> xfbf34718e704c6bc <span
style="color: blue;">As</span> EventArgs)

    <span style="color: blue;">Me</span>.x029e304eb4c44750.Text = <span
style="color: blue;">Me</span>.x77691a2cfb8f8048.Text

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">private</span> <span
style="color: blue;">void</span> x44d0c0526a414989(<span
style="color: blue;">object</span> xe0292b9ed559da7d, EventArgs
xfbf34718e704c6bc)

{

    <span style="color: blue;">this</span>.x029e304eb4c44750.Text =
<span style="color: blue;">this</span>.x77691a2cfb8f8048.Text;

}

Kodlar epey okunurluluğunu kaybetmiş durumda. Bizim örneğimizde sadece
tek bir satır kod bulunduğu için neyin ne olduğunu anlamak çok zor
olmuyor. Fakat binlerde satırdan oluşan uygulamaların kodlarından
anlaşılabilir bir sonuç çıkarmak neredeyse imkânsız olacaktır.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-9-20 tarihinde yayinlanmistir.*
