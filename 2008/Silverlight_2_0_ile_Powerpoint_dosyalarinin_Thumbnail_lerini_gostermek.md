---
FallbackID: 2121
Title: Silverlight 2.0 ile Powerpoint dosyalarının Thumbnail'lerini göstermek.
PublishDate: 13/7/2008
EntryID: Silverlight_2_0_ile_Powerpoint_dosyalarinin_Thumbnail_lerini_gostermek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: a74dbfa8-1bd7-4995-b86e-2936d1c5b6c8
---
Her programcının hayatında en az birkaç defe Office dosya formatları ile
ilgilendiği projeler olmuştur. Bu durum ister yeni bir Word dosyası
yaratmak olsun, ister bir Excel dosyasından veri çekmek olsun
**OpenXML** öncesinde ciddi sıkıntılar çektiğimiz bir gerçek. En basit
bir sebep olarak binary formatlı dokümanlar ile uğraşmak zorunda
kaldığımızı söyleyebiliriz. Office 2007 ile beraber tanıştığımız ve
sonlarına X harfleri eklenen dosya uzantıları aslında OpenXML'in
geldiğinin bir işaretiydi. İyi ki geldin diyerek yavaş yavaş konumuza
geçiş yapalım.

Daha önceki yazılarımda Silverlight 2.0 ile istemci tarafındaki
dosyalara
[OpenFileDialog](http://daron.yondem.com/tr/post/127a5e83-590f-44e1-8cdb-b69603944fc1)
ile ulaşabildiğimizi görmüştük. Yine aynı sistemi kullanarak bu sefer
amacımız bir Powerpoint dosyasını açarak söz konusu dosyanın Thumbnail
görüntüsünü Silverlight içerisinde göstermek. Aslında çok şanslıyız,
neden mi? Çünkü OpenXML var.

**OpenXML'in bize faydası ne?**

OpenXML formatındaki her dosya aslında bir ZIP dosyasıdır. Eğer dosyanın
uzantısını ZIP olarak değiştirirseniz aslında içerisine girerek tüm
detayları görebilirsiniz.

![OpenXML dosyalarının içinde herşey XML formatında, açık seçik
karşımızda.](media/Silverlight_2_0_ile_Powerpoint_dosyalarinin_Thumbnail_lerini_gostermek/12072008_1.png)\
*OpenXML dosyalarının içinde herşey XML formatında, açık seçik
karşımızda.*

Yukarıdaki basit bir Powerpoint dosyasının içeriği görebilirsiniz.
Gördüğünüz üzere aslında her şey ayrı ayrı XML dosyaları şeklinde
kaydedilmiş. Yani bir Office 2007 dosyası yaratmak özünde XML'ler
yaratarak ZIP'lemekten farklı değil. Hele bir de bu dosyaları açarak
programlarınızda göstermek istiyorsanız LINQ2XML'in gücünden de
faydalanarak çok hızlı çözümler geliştirmeniz mümkün.

Konumuza dönersek; bize Powerpoint dosyasının Thumbnail'i lazımdı. Bunun
için XML'ler içerisinde ilk slayt ile ilgili bilgileri alarak gerekli
çizimleri hazırlayabiliriz fakat buna gerek yok. Çünkü her PowerPoint
dosyası zaten işletim sisteminde gösterilecek olan Thumbnail'i kendi
içinde barındırır. OpenXML formatı sağ olsun, dosyamızın içini biraz
karıştırdığımızda görüyoruz ki ZIP dosyası içerisinde **docProps**
adındaki bir klasörün içinde **thumbnail.jpeg** adında bir JPG dosyası
bulunuyor. İşte bu dosya bizim Silverlight tarafında göstereceğimiz
thumbnail görselini içeriyor.

**ZIP'ten resmi nasıl alacağız?**

Yine daha önceki bir yazımda bir [ZIP dosyalarını Silverlight tarafında
açabilme](http://daron.yondem.com/tr/post/f6706f0b-dce4-4fec-bd2e-acf70d6cbc27)nin
yollarına değinmiştik. Hatta daha da ileri giderek Silverlight 2.0 XAP
dosyaları da birer ZIP dosyası olduğu için onları açmıştık. Şimdi ise
sıra başka bir ZIP dosyası açmaya geldi, Powerpoint dosyaları.

İlk olarak Powerpoint dosyasını açarak Thumbnail'i gösterecek olan
uygulamamızın tasarımını basit bir şekilde yapalım. Sahnede bir düğme ve
bir de Image nesnesi olsun. Düğmeye basında kullanıcıdan bilgisayarından
bir Powerpoint dosyası seçmesini isteyelim ve sonrasında da seçili
dosyanın Thumbnail'ini Image nesnesi içerisinde gösterelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication58.Page"</span>

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
style="color: #a31515;">Button</span><span style="color: red;">
Height</span><span style="color: blue;">="32"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
Margin</span><span style="color: blue;">="24,32,0,0"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Width</span><span style="color: blue;">="104"</span><span
style="color: red;"> Content</span><span
style="color: blue;">="Button"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="btnDosyaAc"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Margin</span><span style="color: blue;">="160,32,80,140"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="imgOnIzleme"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Sıra geldi gerekli işlemleri sırası ile yapacak olan kodumuzu yazmaya.

**[VB]**

        <span style="color: blue;">Dim</span> DosyaAc <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
OpenFileDialog

        DosyaAc.Filter = <span style="color: #a31515;">"PowerPoint 2008
Dosyaları (\*.pptx)|\*.pptx"</span>

        DosyaAc.Multiselect = <span style="color: blue;">False</span>

        DosyaAc.ShowDialog()

**[C\#]**

            <span style="color: #2b91af;">OpenFileDialog</span> DosyaAc
= <span style="color: blue;">new</span> <span
style="color: #2b91af;">OpenFileDialog</span>();

            DosyaAc.Filter = <span style="color: #a31515;">"PowerPoint
2008 Dosyaları (\*.pptx)|\*.pptx"</span>;

            DosyaAc.Multiselect = <span
style="color: blue;">false</span>;

            DosyaAc.ShowDialog();

İlk olarak yukarıdaki şekilde Silverlight tarafında kullanıcıdan
bilgisayarından bir Powerpoint dosyası seçmesini isteyelim. Sonrasında
bize dosyanın Stream'i gelecek ve biz de içerisinden istediğimiz JPEG
dosyasını almaya çalışacağız. Kodumuz içerisinde istemcideki dosyalara
ulaşmak için bir **OpenFileDialog** kullanıyor, filtresini de sadece
PPTX'leri gösterecek şekilde ayarlıyoruz.

**[VB]**

        <span style="color: blue;">If</span> DosyaAc.SelectedFile <span
style="color: blue;">IsNot</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> Foto <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Imaging.BitmapImage()

            <span style="color: blue;">Dim</span> Gelen =
Application.GetResourceStream(<span style="color: blue;">New</span>
Windows.Resources.StreamResourceInfo(DosyaAc.SelectedFile.OpenRead(),
<span style="color: blue;">Nothing</span>), <span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"docProps/thumbnail.jpeg"</span>,
UriKind.Relative)).Stream

            Foto.SetSource(Gelen)

            imgOnIzleme.Source = Foto

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

**[C\#]**

            <span style="color: blue;">if</span> (DosyaAc.SelectedFile
!= <span style="color: blue;">null</span>) {

                System.Windows.Media.Imaging.<span
style="color: #2b91af;">BitmapImage</span> Foto = <span
style="color: blue;">new</span> System.Windows.Media.Imaging.<span
style="color: #2b91af;">BitmapImage</span>();

                System.IO.<span style="color: #2b91af;">Stream</span>
Gelen = <span
style="color: #2b91af;">Application</span>.GetResourceStream(<span
style="color: blue;">new</span> System.Windows.Resources.<span
style="color: #2b91af;">StreamResourceInfo</span>(DosyaAc.SelectedFile.OpenRead(),
<span style="color: blue;">null</span>), <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"docProps/thumbnail.jpeg"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative)).Stream;

                Foto.SetSource(Gelen);

                imgOnIzleme.Source = Foto;

            }

Bu noktada Silverlight ile beraber gelen Resource yapısını kullanacağız
ve sanki harici bir kaynak açarmış gibi ZIP dosyasını açtıracağız.
Sonuçta hedefin bir Powerpoint dosyası olup olmadığı önemli değil. Bizim
istediğimiz **ZIP** dosyasındaki **docProps** klasöründe bir dosyayı
almak. Kullandığımız taktik daha önceleri Silverlight 2.0 XAP
dosyalarından dosya almak için kullandığımız taktik ile birebir aynı.
**StreamResource** olarak **OpenFileDialog'dan** gelen dosyanın
içerisinde JPEG dosyasını alıyor ve **GetResourceStream** ile de dosyayı
çekiyoruz. Çektiğimiz dosyayı daha önce **Foto** adında tanımladığımız
**BitmapImage** değişkenine **SetSource** ile atayarak sonunda da
delimizdeki resmi sahnedeki **Image** nesnesine aktarıyoruz.

Böylece Powerpoint dosyasında Thumbnail'i bularak Silverlight 2.0
içerisinde çok kolay bir şekilde gösterebildik. Bu aynı taktiği ASP.NET
ile de kullanarak gerektiğinde sunucu taraflı olarak Powerpoint
dosyalarında **Thumbnail'ler** yaratmak **OpenXML** sayesinde çocuk
oyuncağına dönüşmüş durumda.

Hepinize kolay gelsin.


