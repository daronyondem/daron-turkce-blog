---
FallbackID: 2190
Title: "WPF ve ASP.NET ile video dosyalarından kare (thumbnail) almak."
date: "2008-9-19"
EntryID: WPF_ve_ASP_NET_ile_video_dosyalarindan_kare_thumbnail_almak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, WPF, ASP.NET
old.EntryID: 1dcd7116-409b-4f4e-8444-3cf7d4b3a6e2
---
WPF ile beraber özellikle video uygulamalarının programlanmasındaki
kolaylık sonucunda artık Multimedya alanında da sıkça .NET ile
programlanmış uygulamalar görebiliyoruz. Bu yolda WPF içerisindeki
MediaElement'in katkısı tabi ki yadsınamaz. Bu yazımızda WPF içerisinde
açtığımız bir video dosyasından bir kare (thumbnail) almayı deneyeceğiz.

Bu işlemi yapmak için normal şartlarda C++ ile DirectShow üzerine
çalışmak gerekiyor. Diğer .NET dilleri için Managed Provider'lar
bağımsız yazılımcılarca yazılmış olsa da kolay bir çözüm maalesef ki
yok. Bu nedenle biz kendi kodumuzda MediaPlayer ile bir video dosyasını
açacak ve istediğimiz saniyesine giderek o anki kareyi yakalayacağız.
Kodumuz MediaPlayer'in yani uygulamanın çalıştığı bilgisayarda Media
Player'ın oynatabildiği her video ile çalışacaktır, herhangi bir kodek
sınırımız olmayacak.

**Dikkat***: MediaPlayer / Media Player ve MediaElement farklı
şeylerdir. MediaPlayer doğrudan* ***System.Windows.Media.MediaPlayer***
*sınıfını tanımlarken, Media Player ise yazı boyunca bir bilgisayarda
yüklü olan uygulama olarak Media Player'ı anlatacaktır. Diğer yandan
MediaElement ise* ***System.Windows.Controls.MediaElement*** *sınıfını
tanımlar. MediaElement ile MediaPlayer sınıfları arasındaki en büyük
fark MediaPlayer'ın görsel olarak bir WPF formunda doğrudan video
gösterememesidir. Videonun ne şekilde nerede gösterileceğine*
***MediaPlayer*** *için kod ile karar vermek gerekir.*

**Önce videomuzu bir oynatalım.**

Uygulamamızda ilk olarak bir MediaPlayer yaratmamız ve sonrasında da
istediğimiz video dosyasını söz konusu MediaPlayer içerisinde oynatmamız
gerekiyor. Tüm bunları kodlarla yapacağız.

**[VB]**

        <span style="color: blue;">Dim</span> birMediaPlayer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
MediaPlayer

        birMediaPlayer.Open(<span style="color: blue;">New</span>
Uri(<span style="color: #a31515;">"C:\\Users\\Public\\Videos\\Sample
Videos\\Bear.wmv"</span>, UriKind.Absolute))

        birMediaPlayer.Play()

        birMediaPlayer.IsMuted = <span style="color: blue;">True</span>

        birMediaPlayer.Position = <span style="color: blue;">New</span>
TimeSpan(0, 0, 5)

**[C\#]**

            <span style="color: #2b91af;">MediaPlayer</span>
birMediaPlayer = <span style="color: blue;">new</span> <span
style="color: #2b91af;">MediaPlayer</span>();

            birMediaPlayer.Open(<span style="color: blue;">new</span>
<span style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">@"C:\\Users\\Public\\Videos\\Sample
Videos\\Butterfly.wmv"</span>));

            birMediaPlayer.Play();

            birMediaPlayer.IsMuted = <span
style="color: blue;">true</span>;

            birMediaPlayer.Position = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">TimeSpan</span>(0, 0, 5);

Yukarıdaki kodumuzda **birMediaPlayer** adını verdiğimiz **MediaPlayer**
değişkenimize bilgisayardaki bir video dosyasını açtırıyoruz. Sonrasında
hemen videoyu oynatmaya başlıyoruz aksi halde herhangi bir görsel elde
etme şansımız kalmaz. Bu esnada videodan ses gelmemesi için sesini de
kısıp doğrudan videonun beşinci saniyesine zıplıyoruz.

**[VB]**

        System.Threading.Thread.Sleep(5000)

        <span style="color: blue;">Dim</span> RenderTarBitmap <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
RenderTargetBitmap(1600, 1200, 1 / 96, 1 / 96, PixelFormats.Pbgra32)

        <span style="color: blue;">Dim</span> DVisual <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
DrawingVisual

        <span style="color: blue;">Dim</span> DContext <span
style="color: blue;">As</span> DrawingContext = DVisual.RenderOpen

        DContext.DrawVideo(birMediaPlayer, <span
style="color: blue;">New</span> Rect(0, 0, 1600, 1200))

        DContext.Close()

        RenderTarBitmap.Render(DVisual)

        birMediaPlayer.Stop()

        <span style="color: blue;">Dim</span> BMPFrame <span
style="color: blue;">As</span> BitmapFrame =
BitmapFrame.Create(RenderTarBitmap)

**[C\#]**

            System.Threading.<span
style="color: #2b91af;">Thread</span>.Sleep(5000);

            <span style="color: #2b91af;">RenderTargetBitmap</span>
RenderTarBitmap = <span style="color: blue;">new</span> <span
style="color: #2b91af;">RenderTargetBitmap</span>(1600, 1200, 1 / 96, 1
/ 96, <span style="color: #2b91af;">PixelFormats</span>.Pbgra32);

            <span style="color: #2b91af;">DrawingVisual</span> DVisual =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">DrawingVisual</span>();

            <span style="color: #2b91af;">DrawingContext</span> DContext
= DVisual.RenderOpen();

            DContext.DrawVideo(birMediaPlayer, <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Rect</span>(0, 0, 1600, 1200));

            DContext.Close();

            RenderTarBitmap.Render(DVisual);

            birMediaPlayer.Stop();

            <span style="color: #2b91af;">BitmapFrame</span> BMPFrame =
<span
style="color: #2b91af;">BitmapFrame</span>.Create(RenderTarBitmap);

İşte bu adımda gördüğünüz kod aslında uygulamamızın kalbi. Hemen ilk
satırdaki 5 saniyelik uyku modu dikkatinizi çekmiştir. Maalesef
MediaPlayer'ın içerisinde bir video yükleyip oynatmaya başlamış olsak da
bu işlemin tam olarak gerçekleşip gerçekleşmediğini anlama şansımız yok.
Video dosyasının büyüklüğüne bağlı olarak dosyanın açılması uzun
sürebilir. MediaPlayer'In **MediaOpened** event'ı ise tam olarak tahmin
ettiğiniz şekilde çalışmıyor. Sonuç olarak en iyi seçecek 5 saniyelik
bir bekleme süresi ile disk işlemlerinin tamamlanmasını beklemek. Tabi
unutmamak gerek ki tüm bu yukarıdaki kodları harici bir Threat
içerisinde yapmazsanız bu beş saniyelik sürede programınız
kilitlenecektir.

Sonraki aşamalarda biraz daha karışık bir yapı kullanarak MediaPlayer'ın
içerisinde görselliği almaya çalışıyoruz. **RenderTargetBitmap** sınıfı
hem oluşturulacak olan görüntünün boyutlarını piksel olarak alıyor, hem
de görüntünün dikey ve yatay olarak DPI (çözünürlük) değerini istiyor.
RenderTargetBitmap'in son parametresi ise oluşturulacak olan görseldeki
renk kanalları ile ilgili, bizim örneğimizde RGB ve Alpha kanallarını
tek tek 8bit toplam 32 bit olarak alıyoruz.

Bir **DrawingVisual** nesnesi yaratıp **Render** işlemini de
**RenderOpen** ile başlatarak o anki **DrawingContext'i** ele alıyoruz.
**DrawingContext'in** **DrawVideo** metodu doğrudan bir MediaPlayer
alarak o anki görüntüsüyü belirtilen bir alana çizebiliyor. Son olarak
**RenderTargetBitmap'in** **Render** metodu ile eldeki **Visual'dan**
bir **bitmap** yaratıyoruz. En sonda elde ettiğimiz BitmapFrame artık
videodan almış olduğumuz son görüntüyü temsil ediyor. Sıra geldi bu
görüntüyü JPEG olarak uygun bir dosyaya yazmaya.

**[VB]**

        <span style="color: blue;">Dim</span> BMPEncoder <span
style="color: blue;">As</span> BitmapEncoder = <span
style="color: blue;">New</span> JpegBitmapEncoder

        <span style="color: blue;">Dim</span> FStream <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
IO.FileStream(<span
style="color: #a31515;">"C:\\Users\\Public\\Videos\\Sample
Videos\\Butterfly.jpg"</span>, IO.FileMode.Create)

        BMPEncoder.Frames.Add(BMPFrame)

        BMPEncoder.Save(FStream)

        FStream.Flush()

        FStream.Close()

**[C\#]**

            <span style="color: #2b91af;">BitmapEncoder</span>
BMPEncoder = <span style="color: blue;">new</span> <span
style="color: #2b91af;">JpegBitmapEncoder</span>();

            System.IO.<span style="color: #2b91af;">FileStream</span>
FStream = <span style="color: blue;">new</span> System.IO.<span
style="color: #2b91af;">FileStream</span>(<span
style="color: #a31515;">@"C:\\Users\\Public\\Videos\\Sample
Videos\\Butterfly.jpg"</span>, System.IO.<span
style="color: #2b91af;">FileMode</span>.Create);

 

            BMPEncoder.Frames.Add(BMPFrame);

            BMPEncoder.Save(FStream);

            FStream.Flush();

            FStream.Close();

**JpegBitmapEncoder** sınıfı bizim için JPEG sıkıştırma işlemlerini
halledecektir. Tek yapmamız gereken bir de **FileStream** yaratarak
**Encoder'a** elimizdeki **BitmapFrame'i** ekleyerek **FileStream'e**
eldeki veriyi **Save** metodu ile kaydetmek. Böylece dosyamız artık
hazır, videodan karemizi istediğimiz çözünürlükte alabildik.

**ASP.NET ile video dosyasından kare almak?**

Konumuzla herhangi bir alakası yok gibi gözükebilir fakat aslında
ASP.NET ile bir video dosyasından kare (thumbnail) alabilmek de bir
başka işkencedir. İşin güzel tarafı .NET Framework içerisindeki tüm
sınıflar aslında siz onları referans olarak almanız şartı ile sizin
kullanımınıza açıktır. Özetle, yukarıdaki kod aynı şekilde ASP.NET'te de
çalışır :) Nasıl mı?

Yukarıdaki kodumuz içerisinde kullandığımız sınıflardan MediaPlayer
sınıfı .NET Framework içerisinde **PresentationCore.DLL** dosyasında
bulunur. Kullandığımız diğer sınıflar ve **PresentationCore.DLL**'in
Dependecy assembly'si olan bir diğer DLL'te **WindowsBase.DLL**
dosyasıdır. Tüm bu dosyalar bilgisayarınızda **C:\\Program
Files\\Reference Assemblies\\Microsoft\\Framework\\v3.0** adresinde
bulunur. Yarattığınız herhangi bir ASP.NET sitesine bu DLL'leri referans
olarak ekledikten sonra kodunuz aynı şekilde çalışacaktır.

Hepinize kolay gelsin.


