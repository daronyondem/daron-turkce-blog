# Windows Phone 7'de Isolated Storage Kullanımı
Windows Phone 7 içerisinden kullanıcılara doğrudan bir dosya sistemi
gösterimi yapılmıyor aynı şekilde yazılım geliştiriciler de herhangi bir
dosya sistemine erişim yapamıyor. Yani bizim Windows Mobile 6.x'ten
alışık olduğum gibi uygulamalar dosyalarını dosya sisteminde bir yerlere
kaydetmiyorlar. Kullanılacak model her uygulamanın kendi
[IsolatedStorage](http://daron.yondem.com/tr/post/efebcb20-60cb-4964-ba43-0b1949fb5e23)
alanını kullanması. Varsayılan ayarlarla her uygulamaya 2GB kota
veriliyor. Her uygulama kendi dosyalarını buraya saklayarak uygulama
açıldığında da aynı alana erişerek kullanıcıya gerekli dosyaların bir
listesini gösterebilir. Böylece son kullanıcı bakış açısı ile çok daha
derli toplu bir sistem yaratılmış oluyor. Diğer yandan uygulamaların
işletim sisteminin bulunduğu olası bir dosya sistemine erişmemesi de
güvenlik açısından çoğu sorunun önünü kesiyor. Tüm bu sistem içerisinde
uygulamanızın ayarları da aynı şekilde IsolatedStorage içerisinde
tutulabiliyor. Bu örneğimizde WP7 içerisinde ufak bir Silverlight
uygulaması yaparak kendi tanımladığımız custom bir entity'yi
IsolatedStorage içerisinde uygulama ayarı olarak saklayacağız.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="ContentGrid"</span><span style="color: red;">
Grid.Row</span><span style="color: blue;">="1"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Height</span><span style="color: blue;">="74"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="120,51,0,0"</span><span
style="color: red;"> Name</span><span
style="color: blue;">="textBox1"</span><span style="color: red;">
Text</span><span style="color: blue;">="TextBox"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="322" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBox</span><span style="color: red;">
Height</span><span style="color: blue;">="74"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="120,131,0,0"</span><span
style="color: red;"> Name</span><span
style="color: blue;">="textBox2"</span><span style="color: red;">
Text</span><span style="color: blue;">="TextBox"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="322" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="63"</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="167,227,0,0"</span><span style="color: red;">
Name</span><span style="color: blue;">="button1"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="242"</span><span
style="color: red;"> Click</span><span
style="color: blue;">="button1\_Click" /\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

İlk olarak uygulama ekranına iki adet TextBox ve bir de Button
yerleştiriyoruz. Bu TextBox'lar içerisindeki verileri bir Entity'ye
aktardıktan sonra söz konusu Entity'yi de IsolatedStorage içerisinde
ApplicationSetting olarak saklayacağız. Kaydetme işlemini doğrudan
Button'un Click durumunda yapabiliriz.

**[C\#]**

<span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

{

    <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

    <span style="color: blue;">public</span> <span
style="color: blue;">int</span> Stok { <span
style="color: blue;">get</span>; <span style="color: blue;">set</span>;
}

}

Yukarıdaki gördüğünüz sınıf örneğimiz için kullanacağımız basit bir
Entity. TextBox'lar içerisindeki verileri ürünün adı ve stok bilgisi
şeklinde ilişkilendireceğiz. IsoStore içerisinde tüm
ApplicationSetting'ler birer String olarak saklanabildiği için bizim de
eldeki Entity'yi bir şekilde string'e serialize etmemiz sonrasında da
tabi aynı bilgisi IsoStore'dan okurken DeSerialize etmemiz gerekecek.
Bunun için en uygunu hızlıca JSON formatını kullanabileceğimiz
**DataContractJsonSerializer** sınıfından faydalanmak.
System.ServiceModel.Web'i projemize referans olarak eklediğimiz gibi
artık yolda devam etmeye hazırız.

![System.ServiceModel.Web'i referans olarak
alıyoruz.](media/Windows_Phone_7_de_Isolated_Storage_Kullanimi/05052010_1.png)\
*System.ServiceModel.Web'i referans olarak alıyoruz.*

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            Urun BirUrun = <span style="color: blue;">new</span> Urun();

            BirUrun.Adi = textBox1.Text;

            BirUrun.Stok = <span
style="color: blue;">int</span>.Parse(textBox2.Text);

 

            <span style="color: blue;">string</span> json = <span
style="color: #a31515;">""</span>;

 

            <span style="color: blue;">using</span> (MemoryStream ms =
<span style="color: blue;">new</span> MemoryStream())

            {

                DataContractJsonSerializer serializer = <span
style="color: blue;">new</span>
DataContractJsonSerializer(BirUrun.GetType());

                serializer.WriteObject(ms, BirUrun);

                ms.Position = 0;

 

                <span style="color: blue;">using</span> (StreamReader
reader = <span style="color: blue;">new</span> StreamReader(ms))

                {

                    json =  reader.ReadToEnd();

                }

            }

            IsolatedStorageSettings.ApplicationSettings[<span
style="color: #a31515;">"BizimUrun"</span>] = json;

        }

Yukarıdaki kodumuz kaydetme düğmemizin arkasındaki kod. Kaydet düğmesine
basıldığı gibi Entity'mizden bir adet yaratıp gerekli bilgileri de
TextBox'lardan Property'lere atadıktan sonra bir
DataContractJsonSerializer yaratarak entity'yi eldeki MemoryStream'e
serialize ediyoruz. Sonunda da MemoryStream'i okuyarak String bilgiyi
alıp hızlıca ApplicationSettings içerisinde Key/Value Pair tadında
saklıyoruz. Artık uygulamanızı kapatıp açsanız bile sürekli uygulamanıza
ait IsoStore içerisinde bu Entity bulunacaktır. Son olarak sıra geldi
kaydettiğimiz bu veriyi, uygulama ayarını bir şekilde IsoStore'dan
okuyarak uygulama ilk açıldığında TextBox'lara eski değerleri atamaya.

**[C\#]**

        <span style="color: blue;">void</span> MainPage\_Loaded(<span
style="color: blue;">object</span> sender, RoutedEventArgs e)

        {

            <span style="color: blue;">if</span>
(IsolatedStorageSettings.ApplicationSettings.Contains(<span
style="color: #a31515;">"BizimUrun"</span>))

            {

                Urun BirUrun;

                <span style="color: blue;">string</span> json =
IsolatedStorageSettings.ApplicationSettings[<span
style="color: #a31515;">"BizimUrun"</span>].ToString();

                <span style="color: blue;">using</span> (MemoryStream ms
= <span style="color: blue;">new</span>
MemoryStream(Encoding.Unicode.GetBytes(json)))

                {

                    DataContractJsonSerializer serializer = <span
style="color: blue;">new</span> DataContractJsonSerializer(<span
style="color: blue;">typeof</span>(Urun));

                    BirUrun = (Urun)serializer.ReadObject(ms);

                }

                textBox1.Text = BirUrun.Adi;

                textBox2.Text = BirUrun.Stok.ToString();

            }

        }

Uygulamamız ilk açıldığında IsoStore içerisinde elimizdeki Key olan
"**BizimUrun**"'e denk gelen bir Value var mı kontrolünü yaptıktan sonra
eğer daha önce veri kaydedilmiş ise hemen okuma işlemine geçiyoruz. Yeni
bir Entity yarattıktan sonra eldeki String JSON değerini AppSettings'den
alıp ByteArray'den MemoryStream yaratıyoruz. Geriye kalan artık söz
konusu **MemoryStream** içerisindeki verinin
**DataContractJsonSerializer** tarafından bir **Urun** nesnesine
DeSerialize edilmesi. İşlem tamamlandıktan sonra da Entity içerisindeki
değerleri rahatlıkla uygulama arayüzündeki kontrollere atayabiliriz.

**Sonuç**

Gördüğünüz gibi aslında herşey normal Silverlight development tarafı ile
neredeyse bire bir aynı. Bu noktada önemli olan aslında bunun artık
WP7'de uygulama geliştirme modeli olması. IsolatedStorage WP7'de çok
önemli bir yere sahip ve her uygulamanın doğrudan Runtime tarafından
yönetilen kendi disk alanına sahip olmasına olanak tanıyor. Böylece
artık dosya sisteminde dosyayı bulup ilişkili programlama açma devri
kapanıyor onun yerine ilişkili program açılıp onun içerisinden
dosyaların listesi görünerek uygun dosya seçilik açılabiliyor. Tabi bu
bahsettiğimiz IsoStore'un normal FileSystem modunda kullanımı, diğer
yandan uygulama ile ilgili kullanıcının doğrudan kaydetme işlemi
yapmadığı ve bizim yönettiğimiz veriler bu makalede gördüğümüz üzere
ApplicationSetting olarak saklanabiliyor.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2010-5-5 tarihinde yayinlanmistir.*
