---
FallbackID: 2516
Title: Windows Phone 7'de Touch Programlamaya Giriş
PublishDate: 3/5/2010
EntryID: Windows_Phone_7_de_Touch_Programlamaya_Giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4, Windows Phone 7, Windows Phone
old.EntryID: 1ef00d4e-8e5d-445b-9abd-5eef8de85542
---
Windows Phone 7'nin ilk duyurularında yapılan açıklamalarda özellikle
WP7 ile çalışacak cihazlarla ilgili bazı şartların yerine getirilmesi
gerektiğinin açıklanması çok sevindirici oldu. Bu şartlardan biri de
cihazların WVGA (800x480) 4 point multitouch capacitive ekrana sahip
olmaları şartıydı. Bu şartın WP7 yayınlanana kadar var olmaya devam edip
etmeyeceğini bilemeyiz ama şimdiden WP7 dünyasında Silverlight ile
Multitouch programlamaya ufak bir giriş yapabiliriz.

WP7 için yayınlanan Developer Tools paketini bilgisayarınıza
yüklediğinizde yanında gelen emülatör aslında Multitouch emülasyonunu da
bir anlamda destekliyor. Eğer emülatörü çalıştırdığınız sistem bir
Windows 7 ise ve hali hazırda donanım / bilgisayar multitouch bir ekrana
sahipse bu doğrudan emülatör üzerinde de WP7 arayüzünde Multitouch
özelliklerini kullanabileceğiniz anlamına geliyor. Böylece rahatlıkla
development ortamınıza da sahip olabiliyorsunuz. Bu yazımıda WP7
üzerindeki Silverlight'ın Multitouch yaklaşımına ayrıca göz atmamız
gerekecek çünkü normal Silverlight Multitouch API'lerinden farklı olarak
şu anki mobil ortamda Silverlight kabaca WPF'e çok daha yakın API'ler
sunuyor. Özellikle Silverlight 3 veya 4'teki gibi kendi
[ManipulationProcessor'ınızı](http://daron.yondem.com/tr/post/ea33f1e2-6209-42c7-8495-747a34771b00)
yazmanıza gerek kalmaması çok hızlı sonuçlar almanızı sağlıyor.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
**ManipulationDelta**</span><span
style="color: blue;">**="ContentGrid\_ManipulationDelta"**</span><span
style="color: red;">  x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="ContentGrid"</span><span style="color: red;">
Grid.Row</span><span style="color: blue;">="1"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
RenderTransformOrigin</span><span
style="color: blue;">="0.5,0.5"</span><span style="color: red;">
Height</span><span style="color: blue;">="254"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="70,66,0,0"</span><span
style="color: red;"> Name</span><span
style="color: blue;">="image1"</span><span style="color: red;">
Stretch</span><span style="color: blue;">="Fill"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="336"</span><span
style="color: red;"> Source</span><span
style="color: blue;">="/WindowsPhoneApplication1;component/Images/Koala.jpg" \></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**ImageScale**" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**ImageTranslate**" /\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Yukarıdaki XAML kodu örnek uygulamamızın ana ekranındaki Content kısmını
temsil ediyor. Hemen projemize bir resim ekledikten sonra onu gösterecek
Image kontrolünü de sahneye alıyoruz. Image nesnemizle ilgili pozisyon
ve boyut değişikliği yapacağımız için uygun Transform nesnelerini de
gruplayarak **RenderTransform** özelliğine atıyoruz. Böylece bu
Transform'lara verdiğimiz isimlerle kod kısmından ulaşarak rahatlıkla
resmin boyutunu ve konumunu değiştirebileceğiz. Dikkat edilmesi gereken
nokta **Touch** durumunu yakalamak istediğiniz kontrolün
**ManipulationDelta** event'ında bir listener ataçlamak. Peki nedir bu
ManipulationDelta? Aslında bu otomatik olarak arka planda çalışan
manipulasyon işlemi sonrasında gerekli hesaplamalar da yapıldıktan sonra
çalışacak olan event. Böylece biz TouchPoint'ler arası koordinat
değişikliklerinden kaynaklanan hesaplamaların sonuçları elde edildiğinde
haberdar edileceğiz. Söz konusu event'ın argümanları üzerinden de
hesaplamaların sonuçlarını alabileceğiz.

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> ContentGrid\_ManipulationDelta(<span
style="color: blue;">object</span> sender, ManipulationDeltaEventArgs e)

        {

            <span style="color: blue;">if</span>
(e.CumulativeManipulation.Scale != <span
style="color: blue;">null</span>)

            {

                ImageScale.ScaleX = e.CumulativeManipulation.Scale.X;

                ImageScale.ScaleY = e.CumulativeManipulation.Scale.Y;

            }        

 

            ImageTranslate.X = e.CumulativeManipulation.Translation.X;

            ImageTranslate.Y = e.CumulativeManipulation.Translation.Y;

 

            e.Handled = <span style="color: blue;">true</span>;

        }

Eventimiz içerisinde kod sanırım daha basit olamazdı! Argüman üzerinden
gelen CumulativeManipulation nesnesi içerisinde tüm yeni hesaplanmış
değerler bulunuyor. Tek yapmamız gereken özünde bu değerleri elimizdeki
uygun nesnelere transfer etmek. Scale konusunda bir if kontrolü olduğunu
göreceksiniz. **ManipulationDelta** eventı kullanıcı tek **TouchPoint**
ile birşeyler yaptığında da çalışıyor. Yani kullanıcı tek parmağı ile
birşeyleri sadece yerinden oynatıyor da olabilir. Böyle bir durumda
**Scale** özelliği tabi ki **null** geliyor fakat Translation dolu
gelmeye devam ediyor. Bu nedenle bir if kontrolü ile durumu kontrol
altında tutmak mantıklı olabilir.

**Hareket ve hız algılama!**

Touch telefonlarda oluşan alışkanlıkardan biri de ekranda tek parmak ile
sağa, sola doğru çizgiler oluşturarak aslında ekrandaki görseli ekranın
sağına veya soluna itme hareketidir. Bu gibi bir işlevsellik için yine
Manipulation sistemi kullanılabilir fakat bu sefer ManipulationDelta
yerine **ManipulationCompleted** event'ına bir listener ataçlayabiliriz.
Böylece tüm Manipulation işlemi bittiğinde son sonucu toplam olarak
alabiliriz.

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            <span
style="color: blue;">this</span>.ManipulationCompleted += <span
style="color: blue;">new</span>
EventHandler\<ManipulationCompletedEventArgs\>(MainPage\_ManipulationCompleted);

        }

 

        <span style="color: blue;">void</span>
MainPage\_ManipulationCompleted(<span style="color: blue;">object</span>
sender, ManipulationCompletedEventArgs e)

        {

            <span style="color: blue;">if</span>
(e.FinalVelocities.LinearVelocity.X \> 1000 &&
e.FinalVelocities.LinearVelocity.Y \> 500)

            {

                SolaGit.Begin();

            }

        }

Yukarıdaki kod içerisinde **ManipulationCompleted'da** argüman üzerinden
kullanıcının yaptığı hareketin hızını vektör olarak alıyoruz.
**FinalVelocities** altında yer alan **LinearVelocity** özelliğinin X ve
Y değerlerini kontrol ederek hangi yöne hangi hızda hareket yapıldığını
kontrol edebilirsiniz. Yapılan hareketin yönüne ve hızına göre de farklı
bir animasyon çalıştırılarak ekranda uygun değişiklikler yapılabilir.

Bu yazımızda hızlıca WP7 üzerinde Silverlight tarafındaki Touch
API'lerine giriş yaptık. Özellikle WPF'e benzemesi ile API'ler çok
tanıdık. Diğer yandan kişisel bir yorum olarak özellikle WP7'ye özel
eklenen API'lerin isimlendirilmelerinden yola çıkarak üzerlerinde son
sürüme kadar epey değişiklik olacağını da tahmin etmek zor değil.

Hepinize kolay gelsin.


