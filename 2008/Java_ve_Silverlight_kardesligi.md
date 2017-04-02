---
FallbackID: 2155
Title: Java ve Silverlight kardeşliği.
PublishDate: 8/16/2008
EntryID: Java_ve_Silverlight_kardesligi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 691ca224-0f26-4d50-8fe4-b69299d2dfd8
---
Silverlight'ın sunucu tarafındaki programlama dillerinden ve sunucu
platformundan tamamen bağımsız olduğundan sürekli bahsediyoruz. Bu
çerçevede daha önceki yazılarımdan birince [PHP ile Silverlight
2.0](http://daron.yondem.com/tr/post/b133a50e-9d51-47bc-a552-fd2dcf871c00)
kullanımına değinmiştim. Bu yazımızda da Java ile Silverlight
kullanımına değineceğiz.

Örneğimizde Java tarafından hazırladığımız bir web servisini Silverlight
2.0 tarafında Visual Studio içerisinden kullanacağız. Visual Studio ve
.NET altyapısı ile rahatlıkla WSDL uyumlu web servislerini
kullanabildiğimizi düşünürsek aynı standartlara uygun bir web servisinin
Java ile hazırlanmış olması durumunda herhangi bir sorun
yaşamayacağımıza kesin gözü ile bakabiliriz. İlk olarak Java tarafında
aşağıdaki kodumuz ile basit bir web servisi hazırlayalım.

package com.daron.ws;

 

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">wsclass</span> {

 

    <span style="color: blue;">public</span> <span
style="color: blue;">int</span> topla(<span
style="color: blue;">int</span> x, <span style="color: blue;">int</span>
y)

    {

        <span style="color: blue;">return</span> x+y;

    }

 

}

Yukarıdaki ufak kod ile aslında basit bir metod tanımlamış oluyoruz.
Metodumuz aldığı iki integer parametreyi toplayıp geri döndürüyor. Bu
parametreler ve metodun yapacağı işlemler sizin örneklerinizde çok daha
farklı olabilir. Şu an için amacımız Silverlight tarafından Java'ya veri
gönderip geriye sonuç alabiliyor olmak.

Eclipse üzerinden WSDL dosyasını da otomatik olarak yukarıdaki metod
üzerinden yarattıktan sonra artık sıra geliyor bu servisi Silverlight
tarafında kullanmaya. Silverlight 2.0 uygulamamızı yine Visual Studio
içerisinde geliştireceğimiz için Java servisinin bulunduğu siteyi Visual
Studio içerisinde de açmanız daha rahat bir çalışma ortamı yaratacaktır.
Basit bir şekilde Visual Studio 2008 içerisinden "*File / Open Web
Site*" diyerek Java ile hazırlanmış siteyi açabilirsiniz. Tabi Java
dosyalarını sadece birer dosya olarak göreceksiniz, düzenleme şansınız
olmayacak. Siteyi açtıktan sonra "*File / Add / New Project*" diyerek
Silverlight projenizi sitenize ekleyebilirsiniz. Silverlight
uygulamasını çalıştıracak olan örnek HTML dosyası otomatik olarak Java
sitenize eklenecektir.

**Web servisini referans alalım...**

Web servisini referans olarak ekleyebilmeniz için tabi ki servisin
çalışıyor olması gerek. Bunun için Eclipse üzerinden Tomcat'i
kullanabilirsiniz. IIS yüklü bir makinede çalışıyorsanız 8080 gibi
harici bir port vermeyi unutmayın. Web servisini tarayıcınızda
çalıştırdıktan sonra adresini kopyalayarak Silverlight projenize sağ
tıklayarak "*Add Service Reference*" diyerek referans ekleme işlemini
tamamlayabilirsiniz.

![Java web servisimizi referans olarak
ekliyoruz.](http://cdn.daron.yondem.com/assets/2155/15082008_1.png)\
*Java web servisimizi referans olarak ekliyoruz.*

Referans ekleme işlemi tamamlandığında artık Silverlight ile herhangi
bir web servisini kullanır gibi Java web servisimizi de
kullanabiliyoruz. Örneğimizi çalıştırabilmek için ilk olarak Silverlight
ekranımıza iki metin kutusu ve bir de düğme yerleştirelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication1.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">48.411</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">33.2830009460449,22.693000793457,115.582000732422,0</span>"<span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Text</span><span style="color: blue;">=</span>"<span
style="color: blue;">TextBox</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Kutu1</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">TextBox</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">48.95</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">33.2830009460449,75.1039962768555,115.582000732422,0</span>"<span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Text</span><span style="color: blue;">=</span>"<span
style="color: blue;">TextBox</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Kutu2</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">52.95</span>"<span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">92.2839965820313,0,165.50700378418,88.1999969482422</span>"<span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dugme</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Her şey hazır olduğuna göre artık web servislerimizi kodumuz ile
tanımlayıp kullanabiliriz.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        <span style="color: blue;">Dim</span> Servisim <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.**wsclassClient**

        <span style="color: blue;">AddHandler</span>
Servisim.toplaCompleted, <span style="color: blue;">AddressOf</span>
Servisim\_toplaCompleted

        Servisim.toplaAsync(Kutu1.Text, Kutu2.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servisim\_toplaCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
ServiceReference1.toplaCompletedEventArgs)

        Dugme.Content = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> SilverlightApplication2

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Page</span> : UserControl

    {

        ServiceReference1.**wsclassClient** Servisim = <span
style="color: blue;">new</span>
SilverlightApplication2.ServiceReference1.**wsclassClient**();

 

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Dugme.Click += <span
style="color: blue;">new</span> RoutedEventHandler(Dugme\_Click);

            Servisim.toplaCompleted += <span
style="color: blue;">new</span>
EventHandler\<SilverlightApplication2.ServiceReference1.toplaCompletedEventArgs\>(Servisim\_toplaCompleted);

        }

 

        <span style="color: blue;">void</span> Dugme\_Click(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            Servisim.toplaAsync(<span
style="color: blue;">int</span>.Parse(Kutu1.Text), <span
style="color: blue;">int</span>.Parse(Kutu2.Text));

        }

 

        <span style="color: blue;">void</span>
Servisim\_toplaCompleted(<span style="color: blue;">object</span>
sender,
SilverlightApplication2.ServiceReference1.toplaCompletedEventArgs e)

        {

            Dugme.Content = e.Result.ToString();

        }

    }

}

Konumuz Silverlight ile web servisleri kullanımı olmadığı için
yukarıdaki kodun detaylarına girmeyeceğim. Bu konuda detaylı bir yazıyı
aşağıdaki adresten inceleyebilirsiniz.

<http://daron.yondem.com/tr/post/19fe09b2-2987-4369-a5d5-58e0641c8d6b>

Kodları incelediğimizde yaptığımız şeyin aslında ASP.NET ile hazırlanmış
bir web servisi kullanmaktan farklı olmadığını görüyoruz. Java ile
yazılmış olan web servisimiz yine Silverlight tarafından asenkron olarak
kullanılabiliyor.

Projenizi Visual Studio içerisinde Build ederek Silverlight XAP
dosyasını oluşturduktan sonra siteyi Tomcat üzerinden çalıştırmak
zorunda olduğunuzu unutmayın. Aksi halde web servisi çalışmayacağı için
Silverlight hata verecektir.

**Sonuç**

Silverlight'ın güzelliklerinden faydalanmak için ASP.NET tarafında
olmanız şart değil. İster Java ister PHP ister herhangi bir sunucu
taraflı programlama dili kullanın Silverlight ile kullanıcı arayüzünüzü
hazırlayabilirsiniz.

Java ile WSDL uyumlu web servisi hazırlayıp çalıştırabilme :)
konusundaki yardımlarından dolayı sevgili **Bilge Başaltun**'a buradan
çok teşekkür ediyorum.

Hepinize kolay gelsin.


