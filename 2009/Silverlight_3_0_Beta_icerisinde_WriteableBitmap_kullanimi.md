---
FallbackID: 2357
Title: Silverlight 3.0 Beta içerisinde WriteableBitmap kullanımı.
PublishDate: 25/4/2009
EntryID: Silverlight_3_0_Beta_icerisinde_WriteableBitmap_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 8b42751d-bd28-4dde-9d78-5bae5933c73b
---
Silverlight içerisinde tamamen kod ile çizim yapmanın ötesinde bazı
durumlarda sıfırdan bir Bitmap oluşturmak da isteyebilirsiniz. Bazı
durumlarda ise belki de elinizde var olan bir Bitmap nesnesini
değiştirmek isteyebilirsiniz. Bu gibi durumlarda Silverlight 2.0
içerisinde derdimize derman olabilecek hazır bir API gelmezken artık
Silverlight 3.0 içerisinde **WriteableBitmap** nesnesi bulunuyor.
WriteableBitmap ile beraber istediğimiz Bitmap'i sıfırdan kod ile
yaratabiliyoruz. Hatta bununla kalmayıp çok güzel şeyler de
yapılabiliyor ama tüm bu güzel şeyleri görebilmek için biraz daha
makeleyi okumaya devam etmeniz gerekecek :)

**Hadi sıfırdan Bitmap yaratalım?**

Sıfırdan bir Bitmap yaratmak demek aslında bir resim veya fotoğraf
yaratırken her bir pikselde yer alacak renge karar vermek demektir.
Bununla ilgili kullanabileceğiniz çok ilginç algoritmalar
oluşturabilirsiniz. (Mandelbrot :)) Örneğin Quake1 zamanında 3D bir oyun
olarak gözükse de özünde bu şekilde ekrana Bitmap'ler pompalayan bir
yapıdan farklı bir mimarisi yoktu. Neyse konumuza dönelim ve bakalım biz
kendi bitmapimizi nasıl yaratabileceğiz.

**[XAML]**

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Image</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="imgFoto" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Yukarıdaki şekli ile basit bir Image nesnesini Silverlight uygulamamızın
sahnesine yerleştiriyoruz. Bundan sonraki kodlarımızda söz konusu
nesnenin içerisine farklı Bitmap'ler oluşturarak yerleştireceğiz.

**[VB]**

        <span style="color: blue;">Dim</span> bitmap <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Imaging.WriteableBitmap(100, 100, Media.PixelFormats.Bgr32)

**[C\#]**

            System.Windows.Media.Imaging.<span
style="color: #2b91af;">WriteableBitmap</span> bitmap =

                <span style="color: blue;">new</span>
System.Windows.Media.Imaging.<span
style="color: #2b91af;">WriteableBitmap</span>(100, 100,

                    System.Windows.Media.<span
style="color: #2b91af;">PixelFormats</span>.Bgr32);

WriteableBitmap nesnesini yaratırken oluşturacağımız Bitmap'in genişlik
ve yükseklik değerlerinin yanı sıra bir de Piksel formatını
tanımlıyoruz. Bu aşamada iki seçenek söz konusu. Eğer **Bgr32**
kullanırsanız resminizde R (Red), G (Green) ve B (Blue) kanalları yer
alacaktır. Eğer **Pbgra32** kullanırsanız RGB'ye ek olarak bir de Alpha
(şeffaflık) kanalı kullanabilirsiniz. Yani özünde eğer oluşturacağınız
resmin şeffaflığı olacak ise Pbgra32, olmayacaksa Bgr32 kullanmanız
uygun olacaktır.

**[VB]**

        bitmap.Lock()

**Lock** ve **Unlock** metodlarını Bitmap yaratma işleminin başında ve
sonunda kullanacağız. Bu metodların amacı Bitmap yaratılırken veya
değiştirilirken söz konusu değişikliklerin görsel olarak ekrana
yansımasını engellemek. Lock işlemini de yaptığımıza göre artık yavaş
yavaş çizimimizi yapmaya başlayalım.

**[VB]**

        <span style="color: blue;">For</span> y <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 99

            <span style="color: blue;">For</span> x <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> 99

                <span style="color: blue;">Dim</span> renkler(3) <span
style="color: blue;">As</span> <span style="color: blue;">Byte</span>

                renkler(0) = x <span style="color: green;">'B
(Mavi)</span>

                renkler(1) = x <span style="color: green;">'G
(Yeşil)</span>

                renkler(2) = y <span style="color: green;">'R
(Kırmızı)</span>

                bitmap((x \* 100) + y) = BitConverter.ToInt32(renkler,
0)

            <span style="color: blue;">Next</span>

        <span style="color: blue;">Next</span>

**[C\#]**

            <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> y = 0; y \<= 99; y++)

            {

                <span style="color: blue;">for</span> (<span
style="color: blue;">int</span> x = 0; x \<= 99; x++)

                {

                    <span style="color: blue;">byte</span>[] renkler =
<span style="color: blue;">new</span> <span
style="color: blue;">byte</span>[4];

                    renkler[0] = (<span
style="color: blue;">byte</span>)x; <span style="color: green;">//B
(Mavi)</span>

                    renkler[1] = (<span
style="color: blue;">byte</span>)x; <span style="color: green;">//G
(Yeşil)</span>

                    renkler[2] = (<span
style="color: blue;">byte</span>)y; <span style="color: green;">//R
(Kırmızı)</span>

                    bitmap[(x \* 100) + y] = <span
style="color: #2b91af;">BitConverter</span>.ToInt32(renkler, 0);

                }

            }

WriteableBitmap içerisinde herhangi bir piksele ulaşmak gerçekten çok
kolay. Ulaşmak istediğiniz bir pikselin indeks numarasını doğrudan
**bitmap(0)** şeklinde vererek söz konusu piksele ulaşabiliyorsunuz.
Indeks numarası sürekli soldan sağa giderek satır bittiğinde de bir alt
satıra geçerek devam ediyor. Böylece iç içe iki döngü kullanarak
rahatlıkla tüm pikselleri gezebiliyoruz. Piksellere renk atama işlemini
yaparken üçlü bir byte yaratıp **255** üzerinden **RGB** değerlerini
verip sonra da Byte'ımızı **Int32'ye** çevirip Bitmap'imize atıyoruz.
Şimdilik örneğimizde döngülerden değerler alıp kullandık ki her
seferinde biraz daha farklı bir renk yaratılsın.

**[VB]**

        bitmap.Invalidate()

        bitmap.Unlock()

        imgFoto.Source = bitmap

Son olarak **Invalidate** metodu ile verdiğimiz değerlerden Bitmap'in
çizilmesini ve **Unlock** ile de gösterilebilir olmasını sağladıktan
sonra XAML içerisinde tanımladığımız **Image** nesnesine kaynak olarak
atıyoruz.

![Yarattığımız Bitmap
karşımızda!](http://cdn.daron.yondem.com/assets/2357/25042009_1.png)\
*Yarattığımız Bitmap karşımızda!*

Yukarıdaki görselde gördüğünüz Bitmap'i tamamen kendi kodumuz ile
yaratmış olduk. Bu şekilde Bitmap yaratma proseslerini Multithread
olarak çalıştırarak farklı animasyonlar yapmak da mümkün.

**Başka başka?**

WriteableBitmap'in bir diğer özelliği ise ekrandaki herhangi bir
Silverlight elementinin görselliğini alabiliyor olması. Böylece belki de
ekranda gösterdiğiniz bir Grid'in görselliğini resim olarak alabilir
veya belki de oynattığınız bir videonun o anki karesini
yakalayabilirsiniz. Tüm bunları WriteableBitmap ile yapmak gerçekten çok
kolay.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span>

   <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication26.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span>

   <span style="color: red;"> Height</span><span
style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Grid</span>

       <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span>

       <span style="color: red;"> Background</span><span
style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Image</span>

           <span style="color: red;"> Height</span><span
style="color: blue;">="100"</span>

           <span style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span>

           <span style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span>

           <span style="color: red;"> Source</span><span
style="color: blue;">="Flower.jpg"</span>

           <span style="color: red;"> Width</span><span
style="color: blue;">="100"</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="imgFoto" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span style="color: #a31515;">Image</span>

           <span style="color: red;"> Height</span><span
style="color: blue;">="100"</span>

           <span style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Right"</span>

           <span style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span>

           <span style="color: red;"> Width</span><span
style="color: blue;">="100"</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="imgFoto2" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki gibi iki adet Image kontrolümüzün olduğu bir uygulama
düşünelim. Image'lardan birinde Flower.jpg adındaki dosya gösterilirken
diğeri ise boş. Biz kodumuz ile bir Image kontrolündeki görselliği alıp
diğerine kaynak olarak vereceğiz.

**[VB]**

        <span style="color: blue;">Dim</span> bitmap <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Imaging.WriteableBitmap(100, 100, PixelFormats.Pbgra32)

        bitmap.Render(imgFoto, imgFoto.RenderTransform)

        imgFoto2.Source = bitmap

**[C\#]**

               System.Windows.Media.Imaging.<span
style="color: #2b91af;">WriteableBitmap</span> bitmap =

                   <span style="color: blue;">new</span>
System.Windows.Media.Imaging.<span
style="color: #2b91af;">WriteableBitmap</span>(100, 100, <span
style="color: #2b91af;">PixelFormats</span>.Pbgra32);

                bitmap.Render(imgFoto, imgFoto.RenderTransform);

                imgFoto2.Source = bitmap;

Gördüğünüz gibi WriteableBitmap nesnemizi her zamanki gibi yarattıktan
sonra tek yaptığımız Render metodunu çağırmak. Render metodu ilk olarak
görselliği alacağı Silverlight elementinin adını istiyor. İkinci
parametre ise söz konusu kontrole uygulanmış olan RenderTransform
özellikleri. Böylece **Render** işlemi esnasında tam olarak doğru
koordinatlar yakalanabiliyor. Sonrasında elimizdeki bitmap'i başka bir
Image nesnesine kaynak olarak verebiliyoruz. Bu işlemi belirli aralıkla
yaparsanız kabaca WPF'teki VisualBrush efektini elde etmeniz de mümkün.

Hepinize kolay gelsin.


