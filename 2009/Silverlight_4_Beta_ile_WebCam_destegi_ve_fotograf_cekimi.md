---
FallbackID: 2459
Title: Silverlight 4 Beta ile WebCam desteği ve fotoğraf çekimi!
PublishDate: 27/11/2009
EntryID: Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: ff35845f-2340-4b8e-8456-4e7008c51a84
---
Silverlight 2 sonrasında CLR'a geçiş ve 3 ile gelen yeni özellikler
çerçevesinde en sık aldığım sorulardan biri Mikrofon ve Ses kartı
erişiminin olup olmadığıydı. Silverlight 4 ile beraber her iki donanıma
da doğrudan erişim geliyor. Bu erişim ile çok farklı uygulamalar
geliştirmek mümkün, ister görüntülü chat sistemleri, ister Silverlight
içerisinde doğrudan harici bir görüntü kaynağından gelen görüntüyü
proses eden barkod okuma uygulamaları olsun çok ilginç çözümler
geliştirilebilir. Biz bu yazımızda Silverlight 4 Beta içerisinden kamera
erişimine göz atacağız ve kamera görüntüsünden de bir kare almaya
çalışacağız. Aldığınız fotoğrafı sonrasında ister sunucuya gönderebilir
ister doğrudan kullanıcıya verebilirsiniz.

**Kamera'ya nasıl ulaşırız?**

Silverlight içerisinden sistemde bulunan tüm kameraların bir listesini
alabilir ve özelliklerine göre kamera seçebilirsiniz. Hatta söz konusu
kameraların tek tek hangi çözünürlüklerde ve kalitede kayıt
sağlayabileceğini de bulabilirsiniz.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">MainPage</span>

    <span style="color: blue;">Inherits</span> <span
style="color: #2b91af;">UserControl</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;"> **Dim**</span> **Kameralar =** <span
style="color: #2b91af;">
**CaptureDeviceConfiguration**</span>**.GetAvailableVideoCaptureDevices**

        <span style="color: blue;">Dim</span> Liste = <span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> Kameralar

                    <span style="color: blue;">From</span> formats <span
style="color: blue;">In</span> inc.SupportedFormats

                    <span style="color: blue;">Select</span> <span
style="color: blue;">New</span> <span
style="color: #2b91af;">Kamera</span> <span
style="color: blue;">With</span> {.Adi = inc.**FriendlyName**,

                                             .Format =
formats.**FramesPerSecond** & <span
style="color: #a31515;">"fps,"</span> &

                                                formats.**Width** &
<span style="color: #a31515;">"x"</span> & formats.**Height**,

                                             .Varsayilan =
inc.**IsDefaultDevice**}

 

        myGrid.ItemsSource = Liste

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">Kamera</span>

        <span style="color: blue;">Property</span> Adi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Property</span> Format <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Property</span> Varsayilan <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki örnek uygulamada ekran bir DataGrid bulunuyor. Bu gride
**CaptureDeviceConfiguration.GetAvailableVideoCaptureDevices** ile
aldığımız tüm kameraları **SupportedFormats** dizilerindeki sağladıkları
çözünürlüklerle beraber joinleyerek aktarıyoruz. Benim test makinemde
tek kamera olduğu için aşağıdaki ekran görüntüsü ile karşılaştım.

![Webcam'in desteklediğini
ayarlar.](media/Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi/26112009_1.png)\
*Webcam'in desteklediğini ayarlar.*

**Peki istediğimiz webcamden görüntüyü alıp nasıl gösterebiliriz?**

İlk olarak kullanıcıdan izin almamız gerek. Eğer kullanıcı webcam
erişimine izin vermez ise hiçbirşey yapamayız. Session bazında saklanan
bu izni kullanıcıdan istemek için kullanacağımız metodun adı
**RequestDeviceAccess** şeklinde.

**[VB]**

        <span style="color: blue;">Dim</span> IzinVarMi = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.AllowedDeviceAccess

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> IzinVarMi <span
style="color: blue;">Then</span> IzinVarMi = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.RequestDeviceAccess

Yukarıdaki ilk satırda **AllowedDeviceAccess** ile ilk olarak o anda
iznimiz var mı yoksa yok mu konusunu kontrol ediyoruz. Eğer iznimiz
varsa tekrar kullanıcıdan izin istemek saçma olur. Eğer yoksa hemen bir
alt satırda **RequestDeviceAccess** ile iznimizi istiyoruz.

![Kullanıcıdan kameraya bağlanma izni
istiyoruz.](media/Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi/26112009_2.png)\
*Kullanıcıdan kameraya bağlanma izni istiyoruz.*

İznimizi aldıktan sonra rahatlık istediğimiz bir Device'ı seçerek
cihazdan veri kaynağını alabiliriz. Sistemde farklı mikrofon ve
kameralar olabileceği için bunların kompinasyonundan bir
**CaptureSource** yaratabiliyorsunuz. Bizim örneğimizde sadece kameraya
ulaşacağımız için yaratacağımız CaptureSource'un sadece
**VideoCaptureDevice** özelliğini set edeceğiz.

**[VB]**

            <span style="color: blue;">Dim</span> Cihaz = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.GetDefaultVideoCaptureDevice

            <span style="color: blue;">Dim</span> Kaynak <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">CaptureSource</span>

            Kaynak.VideoCaptureDevice = Cihaz

Tüm bu ayarları yaptıktan sonra sıra geliyor görüntü alma işlemini
başlatmaya ve alacağımız görüntüyü de bir yerlerde göstermeye. Bunun
için herhangi bir kontrolü kullanabilirsiniz çünkü görüntüyü bir
**VideoBrush** aracılığı ile alacağız ve bildiğiniz üzere
VideoBrush'ları da istediğimiz herhangi bir SL kontrolünde normal renk
fırçaları gibi kullanabiliyoruz.

**[VB]**

            <span style="color: blue;">Dim</span> Firca <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">VideoBrush</span>

            Firca.SetSource(Kaynak)

 

            Kaynak.Start()

            Dikdortgen.Fill = Firca

Yukarıdaki kodumuzda VideoBrush'ımızı yaratarak Source olarak eldeki
CaptureSource'u veriyoruz. Sonrasında **CaptureSource** üzerinden
görüntü veya ses yakalama işlemini başlatmak için **Start** metodunu
çağırmayı unutmamak gerek. En son olarak da eldeki VideoBrush'a adı
**Dikdortgen** olarak bir Rectangle'a basit bir şekilde aktarabiliriz.

![Kamera görüntüsü
karşınızda.](media/Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi/26112009_3.jpg)\
*Kamera görüntüsü karşınızda.*

Yukarıda gördüğünüz üzere kamera görüntüsünü almakla kalmayıp
Silverlight'taki Transformasyon ve PixelShader özelliklerini de
rahatlıkla bu görüntüler üzerine uygulayabiliyoruz. Uygulamanın tam
kodlarını aşağıda bulabilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla.Click

        <span style="color: blue;">Dim</span> IzinVarMi = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.AllowedDeviceAccess

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> IzinVarMi <span
style="color: blue;">Then</span> IzinVarMi = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.RequestDeviceAccess

 

        <span style="color: blue;">If</span> IzinVarMi <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> Cihaz = <span
style="color: #2b91af;">CaptureDeviceConfiguration</span>.GetDefaultVideoCaptureDevice

            <span style="color: blue;">Dim</span> Kaynak <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">CaptureSource</span>

            Kaynak.VideoCaptureDevice = Cihaz

 

            <span style="color: blue;">Dim</span> Firca <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">VideoBrush</span>

            Firca.SetSource(Kaynak)

 

            Kaynak.Start()

            Dikdortgen.Fill = Firca

            Golge.Fill = Firca

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[XAML]**

<span style="color: gray;">\<UserControl
xmlns:my="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>
<span style="color: gray;">
x:Class="SilverlightApplication25.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d"</span>

<span style="color: gray">   </span> <span style="color: gray;">
d:DesignHeight="300" d:DesignWidth="400"\></span>

 

<span style="color: gray;">    \<Canvas x:Name="LayoutRoot"
Background="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Dikdortgen"</span><span style="color: red;">
Height</span><span style="color: blue;">="168"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="249"</span><span style="color: red;">
Canvas.Left</span><span style="color: blue;">="20"</span><span
style="color: red;"> Canvas.Top</span><span
style="color: blue;">="19"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">BlurEffect</span><span style="color: red;">
Radius</span><span style="color: blue;">="15"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle.Effect</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnTikla"</span><span style="color: red;">
Content</span><span style="color: blue;">="BAŞLAT"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="25"</span><span style="color: red;">
Width</span><span style="color: blue;">="100"</span><span
style="color: red;"> Canvas.Left</span><span
style="color: blue;">="300"</span><span style="color: red;">
Canvas.Top</span><span style="color: blue;">="275"</span> <span
style="color: blue;"> /\></span>

<span style="color: #808080;">        \<Rectangle x:Name="Golge"
Height="67" Canvas.Left="27.207" Canvas.Top="191" Width="249"
RenderTransformOrigin="0.5,0.5" UseLayoutRounding="False"
d:LayoutRounding="Auto"\></span>

<span style="color: #808080;">           
\<Rectangle.OpacityMask\></span>

<span style="color: #808080;">                \<LinearGradientBrush
EndPoint="0.5,1" StartPoint="0.5,0"\></span>

<span style="color: #808080;">                    \<GradientStop
Color="Transparent" Offset="0"/\></span>

<span style="color: #808080;">                    \<GradientStop
Color="White" Offset="1"/\></span>

<span style="color: #808080;">               
\</LinearGradientBrush\></span>

<span style="color: #808080;">           
\</Rectangle.OpacityMask\></span>

<span style="color: #808080;">           
\<Rectangle.RenderTransform\></span>

<span style="color: #808080;">                \<TransformGroup\></span>

<span style="color: #808080;">                    \<ScaleTransform
ScaleY="-1" ScaleX="1"/\></span>

<span style="color: #808080;">                    \<SkewTransform
AngleY="0" AngleX="52.651"/\></span>

<span style="color: #808080;">                    \<RotateTransform
Angle="0"/\></span>

<span style="color: #808080;">                    \<TranslateTransform
X="36.69"/\></span>

<span style="color: #808080;">                \</TransformGroup\></span>

<span style="color: #808080;">           
\</Rectangle.RenderTransform\></span>

<span style="color: #808080;">        \</Rectangle\></span>

<span style="color: #808080;">    \</Canvas\></span>

<span style="color: #808080;">\</UserControl</span><span
style="color: blue;">\></span>

**Kameradan fotoğrafı nasıl yakalarız?**

Kameranın görüntüsünden fotoğraf yakalayabilmeniz için hazır bir API
doğrudan **CaptureSource** nesnesi üzerinden sunuluyor. Ama sunulan
API'ın birkaç ufak sorunu var. Birincisi eğer yukarıdaki gibi görüntüye
bir PixelShader eklediyseniz veya üzerine birşeyler bindirdiyseniz
maalesef bunların hiçbiri aldığınız fotoğrafta yer almayacaktır.
İkincisi ile eğer CaptureSource durdurulmuş ise son gelen kareyi alma
şansınız olmuyor. Gelin yine de ilk önce bu API'ye bir göz atalım sonra
da istersek daha farklı bir yöntem olarak ne uygulayabiliriz ona
bakarız.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla2\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla2.Click

        <span style="color: blue;">If</span> Kaynak <span
style="color: blue;">IsNot</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            Kaynak.AsyncCaptureImage(<span
style="color: blue;">Sub</span>(Foto)

                                                              
Dispatcher.BeginInvoke(<span style="color: blue;">Sub</span>()

                                                               
                                          imgFoto.Source = Foto

                                                       
                                             <span
style="color: blue;">End</span> <span style="color: blue;">Sub</span>)

                                     <span
style="color: blue;">                    End</span> <span
style="color: blue;">Sub</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod içerisinde **Kaynak** olarak geçen nesne bizim bir önceki
örneğimizde başlattığımız CaptureSource nesnesi. Bu nesneyi UserControl
içerisinde tanımlayarak farklı eventlarda kullanılabilir hale
getirdikten sonra fotoğraf çekme işlemini yapacak düğmede nesnenin
varlığını kontrol ederek işleme devam ediyoruz. CaptureSource üzerinden
**AsyncCaptureImage** metodunu çağırdığınızda fotoğraf alma işlemini
yaparak bir **Callback'e** düşüyor. Bu Callback'den geri veri
döndürebilmek ve sahneye yeni koyduğumuz **imgFoto** adındaki **Image**
nesnesine source aktarabilmek adına **Dispatcher** üzerinden UI Thread'e
ulaşıyoruz. Tüm bunları lamdalarla yapınca iş epey kolayca halloluyor.

![Fotoğrafımızı yakalayap sağa
koyduk.](media/Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi/26112009_4.jpg)\
*Fotoğrafımızı yakalayap sağa koyduk.*

Gördüğünüz gibi aldığımız görüntü ana kaynaktan olduğu için Blur efekti
vs uygulanmış değil. Oysa orta kısımda gördüğümüzün tam aynısını almak
isterdi gönül. İşte böyle bir durumda doğrudan Silverlight 3 ile gelen
**WriteableBitmap** sınıfını kullanabiliriz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla2\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla2.Click

        <span style="color: blue;">Dim</span> Goruntu <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Imaging.<span style="color: #2b91af;">WriteableBitmap</span>(Dikdortgen,
<span style="color: blue;">Nothing</span>)

        imgFoto.Source = Goruntu

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Kodumuzda **WriteableBitmap** yaratırken ekranda hedef nesne olarak da
Rectangle tipindeki Dikdortgen'imizi veriyoruz. Böylece Blur vs
efektleri uygulanmış hali ile görüntüyü alabiliyoruz.

![PixelShader efekti ile görüntüyü
aldık.](media/Silverlight_4_Beta_ile_WebCam_destegi_ve_fotograf_cekimi/26112009_5.jpg)\
*PixelShader efekti ile görüntüyü aldık.*

Artık aldığınız bu fotoğrafları işlemek veya doğrudan sunucuya bir web
servisi aracılığı ile göndermek vs tamamen size kalmış. Hepinize kolay
gelsin.


