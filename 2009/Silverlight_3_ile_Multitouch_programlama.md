---
FallbackID: 2390
Title: Silverlight 3 ile Multitouch programlama.
PublishDate: 8/15/2009
EntryID: Silverlight_3_ile_Multitouch_programlama
IsActive: True
Section: software
MinutesSpent: 0
Tags: MultiTouch, Silverlight 3.0
old.EntryID: ea33f1e2-6209-42c7-8495-747a34771b00
---
Silverlight 3.0 ile beraber tarayıcı içerisinde Multitouch desteği de
geldi. Şu an için sadece Windows 7 ve Internet Explorer üzerinde
sunulabilen bu deneyimi yaratmak için WPF tarafından biraz daha farklı
tekniklerle ilerlemek gerekiyor. Bu yazımıda Silverlight 3.0 tarafında
Multitouch API'larına göz attıktan sonra bir Manipulation örneği
yapacağız.

**Silverlight ve Multitouch**

Silverlight içerisinde herhangi bir şekilde gerçekleşen Touch durumunu
algılamak için kullanabileceğimiz tek bir event bulunuyor. Söz konusu
event'ın adı **Touch.FrameReported** şeklinde. Bu eventa bağlanan bir
event listener'ın argümanı ile beraber gelen bilgiler bizim için fazlası
ile yeterli olacaktır.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

        <span style="color: blue;">AddHandler</span>
Touch.FrameReported, <span style="color: blue;">AddressOf</span> Touched

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Sub</span> Touched(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.TouchFrameEventArgs)

      

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            <span style="color: #2b91af;">Touch</span>.FrameReported +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">TouchFrameEventHandler</span>(Touch\_FrameReported);

        }

 

        <span style="color: blue;">void</span>
Touch\_FrameReported(<span style="color: blue;">object</span> sender,
<span style="color: #2b91af;">TouchFrameEventArgs</span> e)

        {

 

        }

Event'ımızın TouchFrameEventArgs'ında birçok değerli veri bulunuyor.
Örneğin her bir touch için birer **Timestamp** alabiliyoruz. Timestamp'i
özünde eski OLEAutomationDate'lere benzetebilirsiniz. Size farklı touch
işlemleri arasında süreyi rahatlıkla hesaplayabilmeniz için integer
Timestamp'ler döndürüyor. Bunun haricince argüman tarafında önemli üç
adet metod bulunuyor. Bunlardan ilki **GetPrimaryTouchPoint** metodu.
Touch işlemi esnasından bir yada daha çok noktadan ekrana
dokunulabileceği için ilk dokunma noktası Primary denerek
**GetPrimaryTouchPoint** aracılığı ile bize iletiliyor. Ayrıca
**GetTouchPoints** metodu da tüm dokunulan noktaların bir listesini
getirir. TouchPoint tipinde gelen bu noktalara ait ek bilgileri de
TouchPoint sınıfı üzerinden alabilirsiniz. Örneğin dokunulan noktanın
pozisyonu, alanı, hatta TouchDevice üzerinden de unique ID'sini elde
etmek mümkün. Son olarak argüman üzerindeki
**SuspendMousePromotionUntilTouchUp** metodu de Touch işlemleri bitene
yani kullanıcı tüm parmaklarını ekrandan çekene kadar fare kullanımını
engelleyecektir.

Tüm bu hikaye içerisinde en önemli şeylerden biri Touch işleminin hangi
aşamada olduğu. Toplam üç farklı aşama mevcut. Bunlardan ilgi
kullanıcının ekrana değdiği ilk an (**Down**), bir sonraki kullanıcının
parmağını ekranda gezdirdiği süre (**Move**), son olarak (**Up**)
kullanıcının parmağını ekranda çektiği an şeklinde üç farklı aksyon
bulunuyor. Bu her aksyon TouchPoint nesnelerinin **Action** değişkeninde
bir enumaration olarak bizi bekliyor. Herhangi bir şekilde bize
raporlanan TouchPoint'in pozisyonunu alabildiğimiz gibi o anda ilk
dokunma mı, bırakma mı yoksa sürekli dokunma mı oluştuğunu takip
edebiliyoruz. Unutmadan hatırlatmak fayda var, kullanıcı parmağını
ekranda oynatmadan tutarsa da bu bir **Move** aksyonu olarak
algılanıyor.

Şimdi gelin manipülasyon örneğimize geçelim ve tüm bunların birlikte
nasıl kullanıldığına göz atalım. Manipülasyon örneğinde bildiğiniz üzere
amacımız ekrana basit bir resim koyarak onun kullanıcı tarafından iki
parmak kullanılarak boyutlandırılabilmesini, taşınabilmesini ve
çevrilebilmesini sağlamaktır. WPF tarafından farklı olarak daha
Silverlight için etrafta hazırlanmış bir ManipulationProcessor
bulunmadığı için tüm işlemleri bizim yapmamız gerekecek. İlk aşamada
gelin uygulamamızın ekranını hazırlayarak konuya girelim.

**[XAML]**

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
Source</span><span style="color: blue;">="Koala.jpg"</span><span
style="color: red;"> RenderTransformOrigin</span><span
style="color: blue;">="0.5,0.5"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ScaleTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="ImageScale"
/\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TranslateTransform</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="ImageTranslate" /\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">RotateTransform</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="ImageRotate"
/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">TransformGroup</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image.RenderTransform</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

Uygulama ekranımızda basit bir Image nesnesi bulunuyor. Bu Image
nesnesinin durumda göre pozisyonunu, dönüş açısını ve boyutunu
değiştireceğimiz için uygun Transform nesnelerini de içerisinde
yerleştirerek gerekli isimlendirmeleri de yaptık. Böylece rahatlıkla kod
tarafından bu işlemleri halledebiliriz. Şimdi sıra geldi Touch ile
ilgili gerekli işlemleri arka tarafta yapmaya.

Hemen makalemizin başında da gördüğümüz üzere **FrameReported** eventına
bir event-listener bağlıyoruz.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

        <span style="color: blue;">AddHandler</span>
Touch.FrameReported, <span style="color: blue;">AddressOf</span> Touched

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            <span style="color: #2b91af;">Touch</span>.FrameReported +=
<span style="color: blue;">new</span> <span
style="color: #2b91af;">TouchFrameEventHandler</span>(Touch\_FrameReported);

        }

Amacımız FrameReported içerisinde ilk olarak en az iki tane TouchPoint
olurkenki durumları yakalamak. Kullanıcının resmi tutup manipulasyon
yapabilmesi için en az iki parmağının ekrana dokunuyor olması gerek.
Ayrıca Action olarak da parmaklarını ilk dokundurduğu anda değil
parmaklarını sürüklerken işlem yapmamız şart. Tüm bu süreçleri kontrol
ederken sürekli olarak parmakların bir önceki durumu ile şu anki durumu
arasındaki farklara göre gerekli hesaplmaları yaparak resmimize
yansıtacağız. Aslında tüm bu sürece gelişmiş bir drag&drop gözü ile
bakabilirsiniz.

**[VB]**

    <span style="color: blue;">Dim</span> \_FirstTouch <span
style="color: blue;">As</span> Point = <span
style="color: blue;">New</span> Point(0, 0)

    <span style="color: blue;">Dim</span> \_SecondTouch <span
style="color: blue;">As</span> Point = <span
style="color: blue;">New</span> Point(0, 0)

Uygulamamızda ilk olarak yukarıdaki şekli ile iki tane Point değişkenini
global olarak tanımlıyoruz. Bu değişkenler sürekli olarak kullanıcının
parmaklarının bir önceki koordinatlarını saklayacak. Böylece biz de o
anki koordinatlar ile bir önceki arasında farkları yakalayabileceğiz.

**[VB]**

    <span style="color: blue;">Sub</span> Touched(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.TouchFrameEventArgs)

        <span style="color: blue;">If</span> <span
style="color: blue;">Not</span> e.GetPrimaryTouchPoint(<span
style="color: blue;">Me</span>) <span style="color: blue;">Is</span>
<span style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> IlkDokunus <span
style="color: blue;">As</span> TouchPoint

            <span style="color: blue;">Dim</span> IkinciDokunus <span
style="color: blue;">As</span> TouchPoint

 

            IlkDokunus = e.GetPrimaryTouchPoint(<span
style="color: blue;">Me</span>)

            <span style="color: blue;">If</span> IlkDokunus.Action =
TouchAction.Down <span style="color: blue;">Then</span>

                \_FirstTouch = <span style="color: blue;">New</span>
Point(0, 0)

                \_SecondTouch = <span style="color: blue;">New</span>
Point(0, 0)

            <span style="color: blue;">ElseIf</span> IlkDokunus.Action =
TouchAction.Move <span style="color: blue;">Then</span>

                <span style="color: blue;">If</span>
e.GetTouchPoints(<span style="color: blue;">Me</span>).Count \> 1 <span
style="color: blue;">Then</span>

                    IkinciDokunus = e.GetTouchPoints(<span
style="color: blue;">Me</span>)(1)

                    <span style="color: green;">''BURADA MANIPULATION
YAPILACAK</span>

                <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

            <span style="color: blue;">ElseIf</span> IlkDokunus.Action =
TouchAction.Up <span style="color: blue;">Then</span>

               \_FirstTouch = <span style="color: blue;">New</span>
Point(0, 0)

               \_SecondTouch = <span style="color: blue;">New</span>
Point(0, 0)

<span style="color: blue;">            End</span> <span
style="color: blue;">If</span>

 

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">void</span> Touch\_FrameReported(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">TouchFrameEventArgs</span> e)

        {

            <span style="color: blue;">if</span>
((e.GetPrimaryTouchPoint(<span style="color: blue;">this</span>) !=
<span style="color: blue;">null</span>))

            {

                <span style="color: #2b91af;">TouchPoint</span>
IlkDokunus = <span style="color: blue;">default</span>(<span
style="color: #2b91af;">TouchPoint</span>);

                <span style="color: #2b91af;">TouchPoint</span>
IkinciDokunus = <span style="color: blue;">default</span>(<span
style="color: #2b91af;">TouchPoint</span>);

 

                IlkDokunus = e.GetPrimaryTouchPoint(<span
style="color: blue;">this</span>);

                <span style="color: blue;">if</span> (IlkDokunus.Action
== <span style="color: #2b91af;">TouchAction</span>.Down)

                {

                    \_FirstTouch = <span style="color: blue;">new</span>
<span style="color: #2b91af;">Point</span>(0, 0);

                    \_SecondTouch = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 0);

                }

                <span style="color: blue;">else</span> <span
style="color: blue;">if</span> (IlkDokunus.Action == <span
style="color: #2b91af;">TouchAction</span>.Move)

                {

                    <span style="color: blue;">if</span>
(e.GetTouchPoints(<span style="color: blue;">this</span>).Count \> 1)

                    {

                        IkinciDokunus = e.GetTouchPoints(<span
style="color: blue;">this</span>)[1];

                        <span style="color: green;">//BURADA
MANIPULATION YAPILACAK</span>

                    }

                }

                <span style="color: blue;">else</span> <span
style="color: blue;">if</span> (IlkDokunus.Action == <span
style="color: #2b91af;">TouchAction</span>.Up)

                {

                    \_FirstTouch = <span style="color: blue;">new</span>
<span style="color: #2b91af;">Point</span>(0, 0);

                    \_SecondTouch = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(0, 0);

                }

            }

        }

Yukarıdaki ilk kodumuz karışık gibi gözükse de aslında basit birkaç
koşul kontrolünden farklı değil. İlk olarak **GetPrimaryTouchPoint** ile
hali hazırda ilk TouchPoint var mı yok mu kontrolünü gerçekleştiriyoruz.
Eğer varsa ikinci amacımız söz konusu Touch işleminin Action'una göre
işlem yapmak. Eğer ilk TouchPoint'imize ait Action Up veya Down ise yani
kullanıcı parmağını ilk defa dokunduruyor veya çekiyorsa hemen global
değişkenlerimizi sıfırlıyoruz. Böylece bir sonraki Touch ile sürükleme
işleminde gerekli kontrolleri yaparak işlemleri sıfırdan başlatabiliriz.
Fakat unutmayın ki daha bu sadece ilk TouchPoint yani kullanıcının ilk
parmağı! Belki de hiç ikinci bir parmak değimedi ekrana. Böyle bir
durumda manipülasyon yapamayacağımız için ikinci parmak var mı diye
kontrol etmemiz şart.

Eğer ilk TouchPoint'in aksyonu **Move** ise bu sefer hemen
**GetTouchPoints** ile toplam parmak sayısını alıyoruz. Eğer bu sayı
birden yüksekse belli ki ekranda iki parmak var. Her iki parmağa ait
TouchPoint'lerini ayrı birer değişkene aldıktan sonra sıra gelecek bu
parmakların koordinatlarına göre hesaplamaları yapmaya.

**[VB]**

                    <span style="color: blue;">Dim</span> FirstTouch
<span style="color: blue;">As</span> Point = IlkDokunus.Position

                    <span style="color: blue;">Dim</span> SecondTouch
<span style="color: blue;">As</span> Point = IkinciDokunus.Position

 

                    <span style="color: blue;">If</span> \_FirstTouch.X
\<\> 0 <span style="color: blue;">Then</span>

                        <span style="color: green;">''ESAS OLAY BURADA
:)</span>

                    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

 

                    \_FirstTouch = FirstTouch

                    \_SecondTouch = SecondTouch

**[C\#]**

                        <span style="color: #2b91af;">Point</span>
FirstTouch = IlkDokunus.Position;

                        <span style="color: #2b91af;">Point</span>
SecondTouch = IkinciDokunus.Position;

 

                        <span style="color: blue;">if</span>
(\_FirstTouch.X != 0)

                        {

                           <span style="color: green;">//ESAS OLAY
BURADA :)</span>

                        }

 

                        \_FirstTouch = FirstTouch;

                        \_SecondTouch = SecondTouch;

Ele aldığımız TuchPoint'lerden Position alarak birer değişkene
aktarıyoruz. Sonrasında tabi ki bu pozisyonları bir önceki pozisyonlar
ile karşılaştıracağımız için aslında "bir önceki pozisyon" diye birşey
var mı onu kontrol etmemiz gerekiyor. Eğer varsa gerekli işlemleri
yapacağız yoksa eldeki pozisyonu kenara atacağız ki bir sonraki işlemde
bu pozisyona göre değişiklikleri hesaplayabilelim.

**[VB]**

<span style="color: blue;">Dim</span> ScaleDelta = (((((FirstTouch.X -
SecondTouch.X) \^ 2) + ((FirstTouch.Y - SecondTouch.Y) \^ 2)) \^ (1 /
2)) / \_

                             ((((\_FirstTouch.X - \_SecondTouch.X) \^
2) + ((\_FirstTouch.Y - \_SecondTouch.Y) \^ 2)) \^ (1 / 2))) - 1

**[C\#]**

 <span style="color: blue;">double</span> ScaleDelta = (<span
style="color: #2b91af;">Math</span>.Sqrt(<span
style="color: #2b91af;">Math</span>.Pow(FirstTouch.X - SecondTouch.X,
2) + <span style="color: #2b91af;">Math</span>.Pow(FirstTouch.Y -
SecondTouch.Y, 2)) /

                                <span
style="color: #2b91af;">Math</span>.Sqrt(<span
style="color: #2b91af;">Math</span>.Pow(\_FirstTouch.X -
\_SecondTouch.X, 2) + <span
style="color: #2b91af;">Math</span>.Pow(\_FirstTouch.Y -
\_SecondTouch.Y, 2))) - 1;

İlk olarak boyutlandırma işlemi ile başlayalım. Resmimizin boyutunun ne
kadar değişeceğini 1 üzerinden orantılayarak vermemiz gerekiyor ki
ScaleTransform'un ScaleX ve ScaleY'sine aktarabilelim. Gelen
ScaleDelta'yı sonrasında bu ScaleX ve ScaleY'ye ekleyeceğiz o nedenle
bulduğumuz sonucu 1'den çıkartıyoruz ki normal boyuta göre farkı
bulalım.

Resmin boyut değişikliği ile ilgili hesaplamayı yaparken izlediğimiz yol
her iki parmağın bir önceki pozisyonlarına göre aralarındaki mesafeyi
bulup sonra da şu an pozisyonlara göre mesafeleri arasında oranı bir
üzerinden hesaplamak. Basit bir hipotenüs hesaplaması gözü ile bakarsak
elimizdeki iki noktadan bir üçgen oluşturup hipotenüsü bulmamız mesafe
için yeterli olacaktır. Üçgenin yatay kenarı ve dikey kenarının
uzunlukları için noktaların X ve Y koordinatları arasındaki farkları
kullanabiliyoruz.

**[VB]**

<span style="color: blue;">Dim</span> PositionPoint = <span
style="color: blue;">New</span> Point(((FirstTouch.X + SecondTouch.X) /
2) - ((\_FirstTouch.X + \_SecondTouch.X) / 2), \_

                                                 ((FirstTouch.Y +
SecondTouch.Y) / 2) - ((\_FirstTouch.Y + \_SecondTouch.Y) / 2))

**[C\#]**

 <span style="color: blue;">var</span> PositionPoint = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Point</span>(((FirstTouch.X + SecondTouch.X) /
2) - ((\_FirstTouch.X + \_SecondTouch.X) / 2),

                                ((FirstTouch.Y + SecondTouch.Y) / 2) -
((\_FirstTouch.Y + \_SecondTouch.Y) / 2));

Resmin pozisyonu ile ilgili değişikliği hesaplamak biraz daha kolay. İki
parmak arasındaki doğrunun orta noktasını bularak bir önceki orta nokta
ile şimdiki orta nokta arasındaki farkı almak pozisyon değişikliğini
yakalamak için yeterli olacaktır.

**[VB]**

<span style="color: blue;">Dim</span> AngleDelta =
(Math.Atan2(FirstTouch.Y - SecondTouch.Y, FirstTouch.X -
SecondTouch.X) \* 180 / Math.PI) - \_

                             (Math.Atan2(\_FirstTouch.Y -
\_SecondTouch.Y, \_FirstTouch.X - \_SecondTouch.X) \* 180 / Math.PI)

**[C\#]**

 <span style="color: blue;">var</span> AngleDelta = (<span
style="color: #2b91af;">Math</span>.Atan2(FirstTouch.Y - SecondTouch.Y,
FirstTouch.X - SecondTouch.X) \* 180 / <span
style="color: #2b91af;">Math</span>.PI) -

                                (<span
style="color: #2b91af;">Math</span>.Atan2(\_FirstTouch.Y -
\_SecondTouch.Y, \_FirstTouch.X - \_SecondTouch.X) \* 180 / <span
style="color: #2b91af;">Math</span>.PI);

İki keranın bildiğiniz bir üçgenin iç açılarından birini nasıl
bulursunuz? :) Bazılarınızı yıllar önceki lise yıllarına döndürdüğümün
farkındayım. Dikey mesafe (Y) ve yatay mesafeyi (X) verip bir noktanın x
eksenine göre (0,0)'dan açısını radyan olarak veren **Math.Atan2**
metodunu kullanarak parmaklarımızla oluşturduğumuz çizginin orta
noktasının (0,0)'a göre x ekseninden açısını alabiliyoruz. Tabi radyanı
da bildiğimiz açıya çevirmek için 180'le çarpıp PI'ye bölüyoruz. Eski
pozsiyonlara göre hesapladığımız açı ile şimdiki açı arasındaki fark da
tam olarak bulmak istediğimiz şeydi.

**[VB]**

                        ImageScale.ScaleX += ScaleDelta

                        ImageScale.ScaleY += ScaleDelta

                        <span style="color: blue;">If</span>
ImageScale.ScaleX \< 0 <span style="color: blue;">Then</span>
ImageScale.ScaleX = 0

                        <span style="color: blue;">If</span>
ImageScale.ScaleY \< 0 <span style="color: blue;">Then</span>
ImageScale.ScaleY = 0

 

                        ImageTranslate.X += PositionPoint.X

                        ImageTranslate.Y += PositionPoint.Y

 

                        ImageRotate.Angle += AngleDelta

**[C\#]**

                            ImageScale.ScaleX += ScaleDelta;

                            ImageScale.ScaleY += ScaleDelta;

                            <span style="color: blue;">if</span>
(ImageScale.ScaleX \< 0) ImageScale.ScaleX = 0;

                            <span style="color: blue;">if</span>
(ImageScale.ScaleY \< 0) ImageScale.ScaleY = 0;

 

                            ImageTranslate.X += PositionPoint.X;

                            ImageTranslate.Y += PositionPoint.Y;

 

                            ImageRotate.Angle += AngleDelta;

Sıra geldi tüm bu hesaplamalarla bulduğumuz değerleri Image nesnesminde
Transform'lara aktarmaya. Sadece Scale için dikkat etmemiz gereken şey
eksi değer vermemek. Aksi halde resim ters dönecektir.

Kodumuz bu kadar. Manipülasyon işlemimizi de tamamladık ve artık
projemiz çalışmaya hazır.

Hepinize kolay gelsin.

[Örneklere ait kaynak kodlar. - 14082009\_1.rar (73,14
KB)](http://cdn.daron.yondem.com/assets/2390/14082009_1.rar)


