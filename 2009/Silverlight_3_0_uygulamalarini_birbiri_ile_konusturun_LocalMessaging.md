---
FallbackID: 2368
Title: "Silverlight 3.0 uygulamalarını birbiri ile konuşturun": LocalMessaging
date: "2009-6-5"
EntryID: Silverlight_3_0_uygulamalarini_birbiri_ile_konusturun_LocalMessaging
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 1526fe49-66cf-44d9-85a7-6ce6cee81a90
---
Bir web sitesi içerisinde birden çok Silverlight uygulamasını beraber
kullanıyor olabilirsiniz veya belki de aynı web sitesinde sizin
hazırladığınız bir Silverlight uygulamasının yanı sıra bir de başka bir
yazılımcının/tasarımcının hazırladığı Silverlight uygulaması
bulunuyordur. Peki hiç bu iki uygulamanın birbirinden haberdar
olabileceğini ve karşılıklı haberleşebileceklerini düşündünüz mü?

Eminim ki hemen aklınıza gelecek çözüm sunucu tarafından uygulamaları
birbiri ile konuşturmak olacaktır oysa artık Silverlight 3.0 ile beraber
**LocalMessaging** denilen ve Named Pipes mantığına çok benzeyen bir
sistem ile uygulamaları birbirleri ile haberleşebiliyorlar. Birden çok
Silverlight uygulaması ister aynı sayfada, ister tarayıcınızın ayrı
tablarında ister farklı tarayıcılarda olsun aynı makinede çalıştıkları
sürece birbirleri ile sunucudan bağımsız olarak tamamen istemci
tarafında konuşabiliyorlar.

**Neler yapılabilir?**

Aslında bu yapı ile bir çok farklı senaryo düşünülebilir. Her iki veya
üç Silverlight uygulamasını da sizin hazırladığınızı düşünürsek belki de
uygulamalar arasına interaksyon sağlayabilirsiniz. Kullanıcının bir
uygulamada yaptığı değişiklik bir diğerinde de bazı farklı mekanizmaları
tetikleyebilir.

Bir diğer senaryoda ise belki de hiç kodlarına sahip olmadığınız bir
Silverlight uygulaması ile sizin uygulamanızın birbiri ile istemci
tarafında konuşması gerektiğinde ortak belirlenen bir kanal üzerinden
uygulamaların haberleşmesini sağlayarak entegrasyon sağlayabilirsiniz.
Daha belki de benim aklıma gelmeyen birçok farklı mekanizma mümkün
olabilir.

**Mutfağa geçelim....**

Teorik kısmı atlattıktan sonra gelin biraz da LocalMessaging sistemini
nasıl kullanabileceğimize göz atalım. Özünde **LocalMessaging** yapısı
Named Pipes mantığı ile işliyor. Yani iki tarafın bir biri ile
haberleşmesi için bir kanala ihtiyacınız var. Kanallar String tipinde
isimler ile birbirinden ayırt ediliyor. Kanal ismine göre dinleyici
uygulama söz konusu kanalı dinlerken veri gönderecek uygulama da yine
aynı kanal ismini kullanarak veri gönderme işlemini yapabiliyor.

Yapacağımız örnekte uygulamalarımızdan birinde yer alan düğmeye
bastığımızda diğerinde bir animasyon çalıştıracağız. Bu sistemin
gerçekleşebilmesi için iki numaralı uygulama "**MesajKanali**" adındaki
bir kanalı dinlemeye başlarken aynı kanala bir numaralı uygulama ise iki
numaralı uygulamanın anlayabileceği bir mesaj gönderecek. Gelin ilk
olarak mesajı gönderecek olan uygulama ile işimize başlayalım.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication6.MainPage"</span>

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
style="color: #a31515;">**Button**</span><span style="color: red;">
Content</span><span style="color: blue;">="Mesaj Gönder"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**btnGonder**"</span><span style="color: red;">
Click</span><span style="color: blue;">="**btnGonder\_Click**"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamızın ekranında basit bir düğme bulunuyor. Söz konusu düğmeye
basıldığında mesaj gönderme işlemini başlatacağız.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnGonder\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.Windows.RoutedEventArgs)

        <span style="color: blue;">Dim</span> MesajGonderici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Messaging.LocalMessageSender(<span
style="color: #a31515;">"MesajKanali"</span>, <span
style="color: #a31515;">"localhost"</span>)

        MesajGonderici.SendAsync(<span
style="color: #a31515;">"BASLA"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> btnGonder\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageSender</span> MesajGonderici =

                <span style="color: blue;">new</span>
System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageSender</span>(<span
style="color: #a31515;">"MesajKanali"</span>, <span
style="color: #a31515;">"localhost"</span>);

            MesajGonderici.SendAsync(<span
style="color: #a31515;">"BASLA"</span>);

        }

Yukarıda gördüğünüz kod içerisindeki ilk satırda mesaj gönderebilmek
için bir **LocalMessageSender** yaratıyoruz. Söz konusu sınıfın
constructor'ı bizden kanal ismini ve mesajın gönderileceği domainin
adını istiyor. Bizim kullanacağımız kanalı ismi şimdilik
"**MesajKanali**" olacak. Kanalimizi ve mesaj göndericimizi
yarattığımıza göre artık söz konusu mesaj göndericinin **SendAsync**
metodu ile mesajımızı bu kanalı dinleyen herkese gönderebiliriz.
SendAsync metodunun sonundaki Async uzantısından da anlayabileceğiniz
üzere işlem asenkron olarak yapılacak. Yani mesaj gönderdildikten sonra
durumdan haberdar olmak istiyorsanız **LocalMessageSender'ın**
**SendCompleted** event'ını yakalamanız gerekiyor.

Eğer gönderdiğiniz mesaj herhangi bir hedef domain'e bakılmaksızın söz
konusu kanalı dinleyen herkese gönderilsin istiyorsanız aşağıdaki
şekilde ikinci parametre olarak **Global** değerini de verebilirsiniz.

**[VB]**

        <span style="color: blue;">Dim</span> MesajGonderici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Messaging.LocalMessageSender(<span
style="color: #a31515;">"MesajKanali"</span>,
System.Windows.Messaging.LocalMessageSender.Global)

Gördüğünüz gibi mesaj gönderme işlemi epey basit. Maalesef ki mesajlar
sadece String tipinde olabiliyor. Eğer .NET objeleri göndermek
isterseniz uygun XML Serializer'ları kullanabilirsiniz. Örneğimizde biz
"BASLA" mesajını gönderiyoruz. Tabi bu mesajın alıcı tarafında da
alındıktan sonra bir anlam ifade etmesi gerekecek. Onun için de
dinleyici tarafında uygun kodu birazdan yazacağız.

**Dinleyici nerede?**

Sıra geldi dinleyici uygulamayı hazırlamaya. Dinleyici uygulamamızda
basit bir animasyon olacak ve kendisine diğer uygulamadan uygun mesaj
gönderildiği anda bu animasyon başlatılacak. Siz örneklerinizde farklı
senaryolar uygulayabilirsiniz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication7.MainPage"</span>

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
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Storyboard</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Animasyon"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: red;"> BeginTime</span><span
style="color: blue;">="00:00:00"</span>

                                          <span style="color: red;">
Storyboard.TargetName</span><span
style="color: blue;">="rectangle"</span>

                                          <span style="color: red;">
Storyboard.TargetProperty</span><span
style="color: blue;">="(UIElement.Opacity)"\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:00"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:01"</span><span style="color: red;">
Value</span><span style="color: blue;">="1"</span><span
style="color: red;"> KeySpline</span><span
style="color: blue;">="1,0,1,1"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">SplineDoubleKeyFrame</span><span
style="color: red;"> KeyTime</span><span
style="color: blue;">="00:00:02"</span><span style="color: red;">
Value</span><span style="color: blue;">="0"</span><span
style="color: red;"> KeySpline</span><span
style="color: blue;">="0,1,1,1"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DoubleAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Height</span><span style="color: blue;">="100"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="100"</span><span style="color: red;">
Fill</span><span style="color: blue;">="Red"</span><span
style="color: red;"> Opacity</span><span
style="color: blue;">="0"</span><span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="rectangle"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda XAML'ını gördüğünüz uygulama Dinleyici uygulamamız. İçerisinde
bir Rectangle ve basit bir de animasyon bulunuyor. Artık Dinleyici
uygulamamız içerisinde de bir dinlayici nesnesi tanımlayıp mesajın
gönderileceği kanalı dinlemeye başlamanın zamanı geldi.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Gonderebilenler <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
List(<span style="color: blue;">Of</span> <span
style="color: blue;">String</span>)

        Gonderebilenler.Add(<span
style="color: #a31515;">"localhost"</span>)

        <span style="color: blue;">Dim</span> MesajDinleyici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Messaging.LocalMessageReceiver(<span
style="color: #a31515;">"MesajKanali"</span>,
Messaging.ReceiverNameScope.Domain, Gonderebilenler)

        <span style="color: blue;">AddHandler</span>
MesajDinleyici.MessageReceived, <span
style="color: blue;">AddressOf</span> MesajDinleyici\_MessageReceived

        MesajDinleyici.Listen()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> MainPage()

        {

            InitializeComponent();

            <span style="color: blue;">this</span>.Loaded += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">RoutedEventHandler</span>(MainPage\_Loaded);

        }

 

        <span style="color: blue;">void</span> MainPage\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            <span style="color: #2b91af;">List</span>\<<span
style="color: #2b91af;">String</span>\> Gonderebilenler = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">List</span>\<<span
style="color: blue;">string</span>\>();

            Gonderebilenler.Add(<span
style="color: #a31515;">"localhost"</span>);

            System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageReceiver</span> MesajDinleyici =

                <span style="color: blue;">new</span>
System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageReceiver</span>(<span
style="color: #a31515;">"MesajKanali"</span>,

                    System.Windows.Messaging.<span
style="color: #2b91af;">ReceiverNameScope</span>.Domain,
Gonderebilenler);

            MesajDinleyici.MessageReceived += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<System.Windows.Messaging.<span
style="color: #2b91af;">MessageReceivedEventArgs</span>\>(MesajDinleyici\_MessageReceived);

            MesajDinleyici.Listen();

        }

Uygulamamız açıldığı gibi hemen işlemlere başlıyoruz. İlk olarak
dinlemek istediğimiz kanalların bulunduğu domain'lerin bir listesini
yaratmamız gerek. Bunun için bir String listesi yeterli olacaktır. Bu
liste içerisinde dinleyeceğiniz kanalın hangi domain'den geleceğini
belirlemiş oluyorsunuz. Aksi halde herhangi bir domain'den yola çıkan ve
aynı kanal ismini kullanan uygulamalar ile çakışmanız olası.

Elimizde dinlenecek domain listedi **Gonderebilenler** değişkeninde
bulunduktan sonra **MesajDinleyici'mizi** yaratabiliriz.
LocalMessageReceiver sınıfından aldığımız değişkenimizi yaratırken
toplam üç parametre vermemiz gerek. Bunlardan ilki dinleyeceğimiz kanalı
**String** adı, ikincisi ise dinleme işlemini hangi çapta yapmak
istediğimiz. **Global** anlamda dinleyerek **Gonderebilenler**
listemizdeki tüm alan adlarını dinleyebileceğimiz gibi **Domain**
çapından ilerleyerek sadece bulunduğumuz alan adını dinleyebiliriz. Eğer
sadece bulunduğunuz alan adını dinleyecekseniz aslında
**Gonderebilenler** listesine gerek yok ama yine de örneğimizde eksik
olmasın diye bir parametremiz **Nothing**/**Null** şeklinde geçmeyelim
istedim.

Bir sonraki adımda MesajDinleyici nesnemizim **MessageReceived**
event'ını da ayrı bir event-listener'a bağlamamız gerekiyor ki mesaj
geldiğinde durumdan haberdar olabilelim. Tabi son olarak
**LocalMessageReceiver'ın** **Listen** metodunu da çağırıyor ve dinleme
işlemini başlatıyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MesajDinleyici\_MessageReceived(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Messaging.MessageReceivedEventArgs)

        <span style="color: blue;">If</span> e.Message = <span
style="color: #a31515;">"BASLA"</span> <span
style="color: blue;">Then</span> Animasyon.Begin()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
MesajDinleyici\_MessageReceived(<span style="color: blue;">object</span>
sender, System.Windows.Messaging.<span
style="color: #2b91af;">MessageReceivedEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (e.Message == <span
style="color: #a31515;">"BASLA"</span>) Animasyon.Begin();

        }

Dinleme işlemine bağladığımız event-listener içerisinden yer alan
MessageReceivedEventArgs üzerinden Message Property'si ile gelen mesajı
alabilirsiniz. Bu mesajı farklı şekilerde Parse ederek anlam
kazandırabileceğiniz gibi basit bir şekilde komut anlamında String
karşılaştırma yaparak da yapacağınız işlemleri belirleyebilirsiniz. Biz
örneğimizde BASLA mesajı geldiğinde elimizdeki animasyonu
çalıştırıyoruz.

Bu noktadan sonra eğer Dinleyici uygulama hemen, anında mesajı gönderen
kişiye bir cevap vermek isterse MessageReceivedEventArgs ile beraber
gelen Response özelliğini kullanabilir. Böylece belki gelen komut için
bir cevap belki de başka bir bilgi gönderilebilir.

**[VB]**

<span style="color: gray">    </span> <span
style="color: gray;">Private</span> <span
style="color: gray;">Sub</span><span style="color: gray">
MesajDinleyici\_MessageReceived(</span><span
style="color: gray;">ByVal</span><span style="color: gray"> sender
</span> <span style="color: gray;">As</span> <span
style="color: gray;">Object</span><span style="color: gray">, </span>
<span style="color: gray;">ByVal</span><span style="color: gray"> e
</span> <span style="color: gray;">As</span><span style="color: gray">
System.Windows.Messaging.MessageReceivedEventArgs)</span>

<span style="color: gray">        </span> <span
style="color: gray;">If</span><span style="color: gray"> e.Message =
</span> <span style="color: gray;">"BASLA"</span> <span
style="color: gray;">Then</span><span style="color: gray">
Animasyon.Begin()</span>

        e.Response = <span style="color: #a31515;">"OLDU"</span>

<span style="color: gray">    </span> <span
style="color: gray;">End</span> <span style="color: gray;">Sub</span>

**[C\#]**

<span style="color: gray">        </span> <span
style="color: gray;">void</span><span style="color: gray">
MesajDinleyici\_MessageReceived(</span><span
style="color: gray;">object</span><span style="color: gray"> sender,
System.Windows.Messaging.</span><span
style="color: gray;">MessageReceivedEventArgs</span><span
style="color: gray"> e)</span>

        {

<span style="color: gray">            </span> <span
style="color: gray;">if</span><span style="color: gray"> (e.Message ==
</span> <span style="color: gray;">"BASLA"</span><span
style="color: gray">) Animasyon.Begin();</span>

            e.Response=<span style="color: #a31515;">"OLDU"</span>;

        }

Burada tanımlanan Response değişkeni içerisinde bilgi otomatik olarak
mesajı gönderen uygulamayı geri gidecektir. Geri giden bu veriyi mesajı
gönderen uygulamanın yakalayabilmesi için kesinlikle kendi içerisinde
**LocalMessageSender'ın** **SendCompleted** event'ını dinlemesi gerekir.
Söz konusu event'ın **SendCompletedEventArgs** parametresinin
**Response** Property'si dinleyiciden gönderilen mesajı içerecektir.
Mesajın göndericisine ait örnek kodu aşağıda inceleyebilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnGonder\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.Windows.RoutedEventArgs)

        <span style="color: blue;">Dim</span> MesajGonderici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Messaging.LocalMessageSender(<span
style="color: #a31515;">"MesajKanali"</span>, <span
style="color: #a31515;">"localhost"</span>)

        <span style="color: blue;">AddHandler</span>
MesajGonderici.SendCompleted, <span
style="color: blue;">AddressOf</span> x\_SendCompleted

        MesajGonderici.SendAsync(<span
style="color: #a31515;">"BASLA"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> x\_SendCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Messaging.SendCompletedEventArgs)

        <span style="color: blue;">If</span> e.Response = <span
style="color: #a31515;">"OLDU"</span> <span
style="color: blue;">Then</span> MessageBox.Show(<span
style="color: #a31515;">"olmuş!"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
MesajGonderici\_SendCompleted(<span style="color: blue;">object</span>
sender, System.Windows.Messaging.<span
style="color: #2b91af;">SendCompletedEventArgs</span> e)

        {

            <span style="color: blue;">if</span> (e.Response == <span
style="color: #a31515;">"OLDU"</span>)

            {

                <span
style="color: #2b91af;">MessageBox</span>.Show(<span
style="color: #a31515;">"olmuş!"</span>);

            }

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> btnGonder\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageSender</span> MesajGonderici =

                <span style="color: blue;">new</span>
System.Windows.Messaging.<span
style="color: #2b91af;">LocalMessageSender</span>(<span
style="color: #a31515;">"MesajKanali"</span>, <span
style="color: #a31515;">"localhost"</span>);

            MesajGonderici.SendCompleted += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">EventHandler</span>\<System.Windows.Messaging.<span
style="color: #2b91af;">SendCompletedEventArgs</span>\>(MesajGonderici\_SendCompleted);

            MesajGonderici.SendAsync(<span
style="color: #a31515;">"BASLA"</span>);

        }

Böylece Silverlight uygulamaları tarafında aynı makinede çalışan, ister
aynı tarayıcıda olsun, ister olmasın farklı domainlerdeki uygulamaların
istenen güvenlik kısıları ile birbiriyle konuşabilmesini sağlamış olduk.
Hem de tüm bunları tamamen istemci tarafında sunucumuzu hiç yormadan
hallettik.

Hepinize kolay gelsin.


