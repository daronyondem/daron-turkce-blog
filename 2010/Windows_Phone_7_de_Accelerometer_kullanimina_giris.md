# Windows Phone 7'de Accelerometer kullanımına giriş.
Bugün neredeyse her cep telefonunda bir Accelerometer mevcut. Böylece en
basit işlevsellik olarak telefonumuzu yana çevirdiğimizde algılamasını
ve ekranı da ona göre toparlamasını isteyebiliriz. İtiraf etmek
gerekirse zaten Accelerometer sahibi olup da bu işi yapmayan telefon
kalmadı gibi :) Diğer yandan önemli olan bizim uygulamalarımızda bu
durumu algılayıp uygun tepkiler verebilmemiz. Bunun için Windows Phone 7
üzerinde uygulama geliştirirken de kullanabileceimiz API'ler mevcut.
İşte bu makalemizde bu API'lere göz atarak basit bir resim gösteren
uygulama yazacağız.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="ContentGrid"</span><span style="color: red;">
Grid.Row</span><span style="color: blue;">="1"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Name</span><span style="color: blue;">="image1"</span>

          <span style="color: red;"> Stretch</span><span
style="color: blue;">="Uniform"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Stretch"</span>

          <span style="color: red;"> Source</span><span
style="color: blue;">="/WindowsPhoneApplication5;component/Images/Koala.jpg"
/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Yukarıda gördüğünüz kod ile ekrana bir Image nesnesi koyarak projemize
eklediğimiz bir resmi göstermesini sağlıyoruz. Bu esnada **Image**
nesnesinin her tarafa genişleyebilmesi için tüm **Alignment**
özellikleri **Stretch** olarak ayarlanmış durumda fakat diğer yandan da
resmin en boy oranı bozulmadan büyütülmesi için **Stretch** özelliği de
**Uniform** olarak ayarlanmış durumda. Peki bu şekli ile uygulamamızı
çalıştırdığımızda neler oluyor?

![Farklı pozisyonlarda
uygulamamız.](media/Windows_Phone_7_de_Accelerometer_kullanimina_giris/10052010_1.png)\
*Farklı pozisyonlarda uygulamamız.*

Eh herşey süper gibi duruyor. Resmimiz her şekilde kendine kalan alanda
en büyük şekilde gözükmeye çalışıyor. Fakat genelde kullanıcıların
telefonu yana çevirmiş olarak kullanmadıklarını :) ve eğer yana
çeviriyorlarsa büyük ihtimal resmi ekrana yayıp daha geniş görmek
istediklerini düşünebilir miyiz? Kesinlikle :) İşte bu durumda bizim
kullanıcının telefonu çevirdiğini anlamamız, hangi tarafa çevirdiğinizi
öğrenmemiz ve ona göre ekranı tekrar toparlamamız gerekecek. Hadi
bakalım, başlayalım.

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

 

            SupportedOrientations = SupportedPageOrientation.Portrait |
SupportedPageOrientation.Landscape;

 

            <span
style="color: blue;">this</span>.**OrientationChanging** += <span
style="color: blue;">new</span>
EventHandler\<OrientationChangedEventArgs\>(MainPage\_OrientationChanging);

        }

 

        <span style="color: blue;">void</span>
MainPage\_OrientationChanging(<span style="color: blue;">object</span>
sender, OrientationChangedEventArgs e)

        {

            <span style="color: blue;">if</span> (e.**Orientation** ==
PageOrientation.**LandscapeLeft** ||e.Orientation ==
PageOrientation.**LandscapeRight** )

            {

                TitleGrid.Visibility =
System.Windows.Visibility.Collapsed;

                Grid.SetRow(ContentGrid, 0);

                Grid.SetRowSpan(ContentGrid, 2);

            }

            <span style="color: blue;">else</span>

            {

                TitleGrid.Visibility = System.Windows.Visibility.Visible
;

                Grid.SetRow(ContentGrid, 1);

                Grid.SetRowSpan(ContentGrid, 1);

            }

        }

Kodumuzda ilk olarak sayfanın **OrientationChanging** event'ına bir
listener ataçlıyoruz. Sayfamızın zaten başında SupportedOrientations
kısmında hem yatay hem de dikey desteği olduğu için telefon sağa veya
sola çevrildiği anda bu event çalışacaktır. Event'ımız çalıştıktan sonra
yapmamız gereken ise telefonun hangi yöne nasıl döndüğünü angılayıp
sonra da ekranda gerekli değişiklikleri yapmak. Bunun için söz konusu
eventa gelen **OrientationChangedEventArgs** parametresi üzerinden
**Orientation** özelliğini kullanabiliriz. Eğer telefon sola veya sağa
döndürülmüş ve yan tutuluyorsa basit bir şekilde ekranın üstündeki
yazıyı kaldırıp resmimizin bulunduğu kısmı ana sayfada ekrana yayıyoruz.
Aksi durumda, yani telefon tekrar normal şeklinde tutulduğunda ise eski
ayarları tekrar yüklüyoruz. Böylece çok basit bir şekilde telefonun
durumunu algılayıp uygulamamızın tepki vermesini sağladık.

![Farklı tutuşlara göre tepki veren
uygulamamız.](media/Windows_Phone_7_de_Accelerometer_kullanimina_giris/10052010_2.png)\
*Farklı tutuşlara göre tepki veren uygulamamız.*

Sanırım son bir sorun kaldı. Dikkatinizi çektiyse örnek uygulamamızda
bir de menü var (ApplicatioBar) ve söz konusu menü içerisindeki düğmeler
bile telefonun durumuna göre sağa sola dönüyorlar fakat ekrandan yer
kaybetmemiz neden oluyorlar. Aslında biz ekranda uygulamamızın ana
yüzeyi dışında hiçbirşey gözüksün istemiyoruz. İşte bu gibi bir durumda
uygulamayı tam ekran moduna alabilirsiniz.

**[C\#]**

     <span class="style1_10052010">   void
MainPage\_OrientationChanging(object sender, OrientationChangedEventArgs
e)</span>

        {

            if (e.Orientation == PageOrientation.LandscapeLeft
||e.Orientation == PageOrientation.LandscapeRight )

            {

                TitleGrid.Visibility =
System.Windows.Visibility.Collapsed;

                Grid.SetRow(ContentGrid, 0);

                Grid.SetRowSpan(ContentGrid, 2);

                <span style="color: blue;">this</span>.FullScreen =
<span style="color: blue;">true</span>;

            }

            else

            {

                TitleGrid.Visibility = System.Windows.Visibility.Visible
;

                Grid.SetRow(ContentGrid, 1);

                Grid.SetRowSpan(ContentGrid, 1);

                <span style="color: blue;">this</span>.FullScreen =
<span style="color: blue;">false</span>;

            }

        }

Yukarıda gördüğünüz şekilde basit bir değişiklik uygulamanın farklı
durumda tamamen tam ekran çalışmasını sağlayabilir. Böylece ekranda
uygulamamızın ana ekranı dışında hiçbirşey gözükmeyecektir.

![FullScreen modunda uygulamamızın
görünüşü.](media/Windows_Phone_7_de_Accelerometer_kullanimina_giris/10052010_3.png)\
*FullScreen modunda uygulamamızın görünüşü.*



*Bu yazi http://daron.yondem.com adresinde, 2010-5-10 tarihinde yayinlanmistir.*
