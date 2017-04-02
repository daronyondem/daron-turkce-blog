---
FallbackID: 2051
Title: Silverlight 2.0 ve Socket Programlama Mucizesi
PublishDate: 5/10/2008
EntryID: Silverlight_2_0_ve_Socket_Programlama_Mucizesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 893eadc5-c611-4303-a906-f03cb0167d5c
---
Socket programlama Silverlight çıktığından beri biz yazılım
geliştiricilerin en büyük hayali ve bu hayal gerçek oluyor. Silverlight
2.0 Beta 1 ile beraber Socket Programlama karşımızda. Yani artık istemci
ile sunucu arasında TCP/IP ile haberleşmek mümkün. Tabi belirli kurallar
var; bu kurallardan ilki sunucudaki uygulamanın istemci uygulamanın
yüklendiği web sitesi ile aynı konumda olması. Yani sunucu uygulamanızın
web siteniz ahmet.com ise ahmet.com'un reverse DNS Look-Up ile
bakıldığında çıkan IP adresine sahip sunucuda bulunması gerekiyor. Bu
durumun Silverlight'ın Beta 1 sonrası sürümlerinde policyfile gibi
sistemlerde daha esnek hale getirileceği söylentiler arasında fakat
baktığımızda şu anki hali ile bile süper bir potansiyel söz konusu.

**Peki nedir bunun avantajı?**

Diyorum ya, hayalimizdi diye, peken neden? Web sitelerinde güncel bilgi
göstermek her zamanki en büyük derttir. Bunu yapabilmek için çok
eskilere döndüğümüzde bazı meta tagları ile belirli aralıkla sayfanın
refresh atmasını sağladığımız günler bile olurdu. IFRAME vs nin gelmesi
ile en azından bunu sayfada kısmi bölümlerde uygulayabilir hale geldik.
Sonrasında AJAX geldi ve çok daha sinsi bir şekilde kullanıcı farkında
olmadan belirli aralıklarla sunucudan yeni veri talebinde bulunarak
sayfa değişmeden yeni içeriği gösterebildik. Oysa hep bizi rahatsız eden
bir nokta vardı, o da şu; sürekli istemciden sunucuya bağlanarak bir
veri değişikliğinin olup olmadığını kontrol etmek durumunda kalıyorduk.
Sunucuya "Yeni birşey var mı?" diye dakikada bir soruyor ve çoğunda da
hüsran ile geri dönüyordu. Keşke sunucu bize bir "Alo" diyebilse ve
değişiklik olduğunda istemciyi haberdar edebilse? Teknik olarak bu
güvenlik sebepleri nedeniyle zaten mümkün değil çünkü bir istemci
bilgisayara dışarıdan içeriye bağlantı kuramazsınız (kuramamanız
gerekir). Peki nasıl oluyor da Socket Programming bunu aşıyor? Aslında
aşmıyor, yine istemci sunucuya bağlanıyor fakat söz konusu bağlantı TCP
bazında olduğu herhangi bir trafiğe neden olmadan sürekli açık
tutulabiliyor. Durum böyle olunca sunucu kendisine bağlı istemciye
istediğinde söz konusu bağlantı üzerinden rahatlıkla ulaşabiliyor.

**Sunucu tarafından işe başlayalım.**

İlk olarak sunucudaki programımızı hazırlayalım. Söz konusu program
kendisine gelen tüm istekleri karşılayarak gerektiğinde istemcilere veri
gönderecek. Bizim programımız içerisinde bir TextBox bulunacak ve kutu
içerisine metin yazıldıkça kendisine bağlı tüm istemcilere bu metin
sürekli gönderilecek.

    <span style="color: blue;">Dim</span> Baglilar <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.Generic.List(<span style="color: blue;">Of</span>
System.IO.StreamWriter)

    <span style="color: blue;">Dim</span> yeniTR <span
style="color: blue;">As</span> System.Threading.Thread

    <span style="color: blue;">Dim</span> TCPBaglantilari <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Threading.ManualResetEvent(<span
style="color: blue;">True</span>)

    <span style="color: blue;">Dim</span> Dinleyici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.TcpListener(System.Net.IPAddress.Any, 4530)

İlk olarak global değişkenlerimizi tanımlıyoruz. Bunlardan ilki olan
**Baglilar** değişkeni sunucuya bağlı olan istemcilere veri gönderecek
olan **StreamWriter** nesnelerini bir listesini taşıyacak. Böylece
istediğimizde bu liste içerisinde gezerek tüm bağlı olan istemcilere
veri gönderebileceğiz. **yeniTR** adındaki değişkenimizi yeni bir Threat
yaratmak ve her yerden kendisine ulaşabilmek için kullanacağız.
**TCPBaglantilari** değişkenimiz var olan Threat'ın blocklanması ve tüm
event-larının sıfırlanması için kullanılacak. **Dinleyici** adındaki
değişkenimizi ise tüm istemcileri dinleyecek olan ve gelen bağlantıları
algılayacak olan **TCPListener** nesnemizin ta kendisi. Gördüğünüz gibi
bu nesneyi tanımlarken iki parametre aktarmışız. Bunlardan ilki herhangi
bir IP adresi üzerinden bu uygulamaya bağlanılabileceği anlamına
gelirken diğer ise sadece 4530 portu üzerinden bağlantı yapılabileceği
anlamına geliyor. **Silverlight 2.0 Beta 1** şu anda **4502-4532**
aralığındaki portları kullanabiliyor.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btn\_Basla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
btn\_Basla.Click

        yeniTR = <span style="color: blue;">New</span>
System.Threading.Thread(<span style="color: blue;">AddressOf</span>
Bekle)

        yeniTR.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Uygulamamızdaki düğmeye basıldığında dinleme işlemini başlatmak üzere
yeni bir Thread yaratıyoruz. Söz konusu Thread **Bekle** Sub'ına bağlı.
Yarattığımız thread'i hemen başlatıp yolumuza devam edelim.

    <span style="color: blue;">Sub</span> Bekle()

        Dinleyici.Start()

        <span style="color: blue;">While</span> <span
style="color: blue;">True</span>

            TCPBaglantilari.Reset()

            Dinleyici.BeginAcceptTcpClient(<span
style="color: blue;">New</span> System.AsyncCallback(<span
style="color: blue;">AddressOf</span> **BaglantiGeliyor**), <span
style="color: blue;">Nothing</span>)

            TCPBaglantilari.WaitOne()

        <span style="color: blue;">End</span> <span
style="color: blue;">While</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yeni Thread içerisinde hemen Dinleyici nesnemizi başlatıyoruz ve kısır
bir döngüye giriyoruz. Sürekli olarak elimizdeki Threadi sıfırlayarak
Dinleyici'nin **BeginAcceptTcpClient** metodu ile istemciden bir
bağlantı geleceğini belirterek **WaitOne** metodu ile de bekliyoruz.
Eğer burada bir bağlantı gelir ve başarılı veya başarısız şekilde
sonuçlanırsa bu döngü başa gelerek tekrar yeni bir bağlantı bekleyecek.
**BeginAcceptTcpClient** içerisinde parametre olarak verdiğimiz
**BaglantiGeliyor** event-handları herhangi bir bağlantı geldiğinde
çalıştırılacak.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> BaglantiGeliyor(<span
style="color: blue;">ByVal</span> ar <span
style="color: blue;">As</span> System.IAsyncResult)

        TCPBaglantilari.Set()

        <span style="color: blue;">Dim</span> Musteri <span
style="color: blue;">As</span> System.Net.Sockets.TcpClient =
Dinleyici.EndAcceptTcpClient(ar)

        <span style="color: blue;">If</span> Musteri.Connected <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> yazici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.IO.StreamWriter(Musteri.GetStream)

            yazici.AutoFlush = <span style="color: blue;">True</span>

            Baglilar.Add(yazici)

            yazici.Write(<span
style="color: #a31515;">"Bağlandınız."</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Baglanti geldiği anda bekleyen Threat'leri devam ettirmek adına
**TCPBaglantilari.Set()** metodunu çağırıyoruz. Unutmayalım ki
programımız aynı anda sadece tek istemcinin bağlantısını authenticate
edebilir, yani diğerleri bir önceki istemci bağlanıp bağlantısını
oluşturana kadar bekleyecektir. Bu noktada artık istemci bağlantı kurma
işlemini tamamladığı için diğerlerine yol veriyoruz. Musteri adında bir
**TCPClient** yarattıktan sonra **Dinleyici'nin** **EndAcceptTcpClient**
metodu ile args parametresi üzerinden gelen Request'i alıyoruz. Eğer
**Musteri** bağlı ise, yani **Connected** ise artık sıra geldi ona veri
göndermeye. Musteri'nin yani **TCPClient'ın** **Stream'ini** alarak
bundan bir **StreamWriter** oluşturuyoruz. Bu Stream üzerinden artık
istemciye istediğimiz veriyi gönderebiliriz.

Unutmayın ki uygulamamızda bir **TextBox** vardı ve içerisine birşey
yazıldığında tüm bağlı kullanıcılara gönderecektik. Bunun için sonra
kullanabilmek adına elimizdeki canlı **Stream'leri** saklamak
sorundayız. Global olarak tanımladığımız **Baglilar** adında
Generic.List'e elimizdeki **Stream'i** aktarıyoruz. Bu arada kullanıcıya
"Bağlandınız" diye de bir metin gönderiyoruz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> TextBox1\_TextChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
TextBox1.TextChanged

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> x <span style="color: blue;">As</span>
System.IO.StreamWriter <span style="color: blue;">In</span> Baglilar

            x.Write(TextBox1.Text)

        <span style="color: blue;">Next</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Artık **TextBox** içerisinde değişiklik olunca bunu istemcilere
göndermek çok kolay. Basit bir şekilde **Generic.List** içerisinde gezin
ve her Stream'e elinizdeki veriyi gönderin.

**İstemci tarafında neler olacak?**

Silverlight tarafında çok basit görsellikte bir uygulamamız olacak.
Sadece bir TextBlock! Uygulama tarayıcı içerisinde ilk açıldığında
sunucuya bağlanacak ve gelen veriyi sürekli olarak söz konusu TextBlock
içerisinde gösterecek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SocketsClient.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">TextBlock</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">42,46,37,125</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Metin</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

XAML kodumuzu yukarıdaki şekilde düzenledikten sonra hemen code-behind
dosyasına geçerek bağlantı kodlarımızı yazmaya başlayalım.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Hat <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.Socket(Net.Sockets.AddressFamily.InterNetwork,
Net.Sockets.SocketType.Stream, Net.Sockets.ProtocolType.Tcp)

        <span style="color: blue;">Dim</span> Args <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.SocketAsyncEventArgs

 

        Args.UserToken = Hat

        Args.RemoteEndPoint = <span style="color: blue;">New</span>
System.Net.DnsEndPoint(<span style="color: #a31515;">"localhost"</span>,
4530)

        <span style="color: blue;">AddHandler</span> Args.Completed,
<span style="color: blue;">AddressOf</span> Baglandi

        Hat.ConnectAsync(Args)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Silverlight uygulaması ilk yüklendiğinde hemen bir Socket bağlantısı
yaratmak için System.Net.Sockets.Socket üzerinden ilerliyoruz. **Hat**
adındaki değişkenimizi yaratırken verdiğimiz parametrelerden ilki olan
**InterNetwork** bizim bağlantı için IPv4 kullanacağımızı ve ikinci
parametre de TCP kullanacağımızı belirtiyor. Asenkron bir çalışma yapısı
için bir de **SocketAsyncEventArgs** nesnesi yaratarak söz konusu
nesneyi **Hat** adındaki Socket'imize bağlıyoruz. **Args'ın**
**RemoteEndPoint** özelliği istemcinin bağlanacağı sunucunun adresini ve
port bilgisini içeriyor. Bağlanti oluşturulduğunda elimizdeki
**SocketAsyncEventArgs** nesnesi olan **Args'ın** **Completed**
event-handları çalışacağı için ona da dinamik bir event-handler olarak
**Baglandi** metodunu atıyoruz. Son olarak **ConnectAsync** diyerek
**Socket** değişkenimizin eldeki **SocketAsyncEventArgs** ile sunucuya
bağlanmasını sağlıyoruz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Baglandi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Net.Sockets.SocketAsyncEventArgs)

        <span style="color: blue;">Dim</span> Gelen(1024) <span
style="color: blue;">As</span> <span style="color: blue;">Byte</span>

        e.SetBuffer(Gelen, 0, Gelen.Length)

        <span style="color: blue;">RemoveHandler</span> e.Completed,
<span style="color: blue;">AddressOf</span> Baglandi

        <span style="color: blue;">AddHandler</span> e.Completed, <span
style="color: blue;">AddressOf</span> Geldi

        <span style="color: blue;">Dim</span> Baglanti <span
style="color: blue;">As</span> System.Net.Sockets.Socket = <span
style="color: blue;">CType</span>(e.UserToken,
System.Net.Sockets.Socket)

        Baglanti.ReceiveAsync(e)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Artık istemci sunucuya bağlandığında göre sıra geldi karşı taraftan yeri
geldiğinde veriyi almaya. Hatta ilk bağlantı esnasında hatırlarsanız
bizim sunucumuzun "Bağlandınız" diye bir metin gönderiyordu. Gelen
veriyi alabilmek için ve sürekli gelen veriyi dinlemek için eldeki
Socket'i alarak sürekli dinleme durumunda olmamız şart. Kodumuzdaki
event-handler içerisinde **e** parametresi aslında bizim bir önceki
adımda tanımladığımız **Args** adaınki **SocketAsyncEventArgs'ın** ta
kendisi. SetBuffer ile veriyi önbelleklemek için kullanacağımız ayarları
da bir **Byte** değişkeni üzerinden aktardıktan sonra ilginç bir şekilde
elimizdeki event-handlerları değiştiyoruz. Bundan sonra **Args'ın**
**Compeleted** durumu yeni bir bağlantı oluştuğunu değil yeni veri
geldiğini bildireceği için farklı bir event-handlerı bağlamamız
gerekiyor. **Baglandi** adındaki metodumuzla **Args'ın** ilişkisi
keserek **Geldi** adında farklı bir metoda bağlıyoruz. Son olarak
**Page.Load**'a atadığımız ve **e.UserToken** üzerinden alabileceğimiz
ana **Socket** değişkenimizi de yakalayarak **ReceiveAsync** metodu ile
veri alımını başlatıyoruz.

**Geldi** ve **Baglandi** metodları aslında Silverlight içerisinde ayrı
bir Thread içerisinde çalışıyor. Bu nedenle tüm bu işlemler yapılırken
kullanıcının uygulama ile olan interaktivitesi kesinlikle kesilmiyor.
Tabi ayrı bir Thread gibi davranıyor olmasını dezavantajı ise birazdan
karşımıza çıkacak. Kısır döngü içerisinde süreki **ReceiveAsync** ile
sunucuyu dinlerken istemci tarafında görsel arayüzde değişiklik
yapamayacağız. Bu da bizim sunucudan veri alabilmemizi fakat ekranda
göstermememize neden olacak. Tabi demokrasilerde çare tükenmez...

    <span style="color: blue;">Delegate</span> <span
style="color: blue;">Sub</span> MyDelegate(<span
style="color: blue;">ByVal</span> myArg2 <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

 

    <span style="color: blue;">Sub</span> GelGel(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">String</span>)

        Metin.Text = x

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İlk olarak bir **Delegate** tanımlayacağız, söz konusu delegemiz sadece
bir parametre alacak. Ayrıca bir de Sub yaratıyoruz. Aynı şekilde Sub'da
bir metin parametresi alıyor ve bizim uygulamamızda adı **Metin** olan
**TextBlock** içerisine yerleştiriyoruz. İşte bu yapı ile biraz önce
bahsettiğimiz sorundan kurtuluyor olacağız.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Geldi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Net.Sockets.SocketAsyncEventArgs)

        <span style="color: blue;">Dim</span> Gelen <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= System.Text.Encoding.UTF8.GetString(e.Buffer, e.Offset,
e.BytesTransferred)

        <span
style="color: blue;">Me</span>.Dispatcher.BeginInvoke(<span
style="color: blue;">New</span> MyDelegate(<span
style="color: blue;">AddressOf</span> GelGel), <span
style="color: blue;">New</span> <span
style="color: blue;">String</span>() {Gelen})

        <span style="color: blue;">Dim</span> Baglanti <span
style="color: blue;">As</span> System.Net.Sockets.Socket = <span
style="color: blue;">CType</span>(e.UserToken,
System.Net.Sockets.Socket)

        Baglanti.ReceiveAsync(e)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Aslında sunucudan gelen veriyi almak çok kolay. Kodumuz içerisindeki ilk
satır bu işi hallediyoruz. Esas mesele veriyi aldıktan sonra sahnede
göstermek. Dispatcher nesnesi belki de Silverlight içerisinde en ilginç
yapılardan biri; **Dispatcher** ile mevcut Thread'i yakalayarak
**BeginInvoke** ile başka bir metod çalıştırıyoruz. Çalıştıracağımız
metodu sunucudan gelen veriyi parametre olarak vereceğiz ve söz konusu
metod (GelGel) bu veriyi alarak sahnedeki **Metin** adındaki
**TextBlock** içerisine yerleştirecek. **BeginInvoke** ile ilgili
işimizi de tamamladıktan sonra artık tekrar sunucunun dinlenmeye
başlanması için elimizdeki Socket'i yakalayarak **ReciveAsync** metodunu
çalıştırıyoruz. Bu sistem böyle sonsuza tek dönecek ve sunucudan gelen
veri sürekli olarak tüm istemcilerde anında gösterilecek.

Son olarak hem istemci hem de sunucu uygulamanın tam kodunu sizlerle
paylaşmak istiyorum.

**[İstemci: Silverlight uygulaması]**

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
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Hat <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.Socket(Net.Sockets.AddressFamily.InterNetwork,
Net.Sockets.SocketType.Stream, Net.Sockets.ProtocolType.Tcp)

        <span style="color: blue;">Dim</span> Args <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.SocketAsyncEventArgs

 

        Args.UserToken = Hat

        Args.RemoteEndPoint = <span style="color: blue;">New</span>
System.Net.DnsEndPoint(<span style="color: #a31515;">"localhost"</span>,
4530)

        <span style="color: blue;">AddHandler</span> Args.Completed,
<span style="color: blue;">AddressOf</span> Baglandi

        Hat.ConnectAsync(Args)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Baglandi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Net.Sockets.SocketAsyncEventArgs)

        <span style="color: blue;">Dim</span> Gelen(1024) <span
style="color: blue;">As</span> <span style="color: blue;">Byte</span>

        e.SetBuffer(Gelen, 0, Gelen.Length)

        <span style="color: blue;">RemoveHandler</span> e.Completed,
<span style="color: blue;">AddressOf</span> Baglandi

        <span style="color: blue;">AddHandler</span> e.Completed, <span
style="color: blue;">AddressOf</span> Geldi

        <span style="color: blue;">Dim</span> Baglanti <span
style="color: blue;">As</span> System.Net.Sockets.Socket = <span
style="color: blue;">CType</span>(e.UserToken,
System.Net.Sockets.Socket)

        Baglanti.ReceiveAsync(e)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Geldi(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Net.Sockets.SocketAsyncEventArgs)

        <span style="color: blue;">Dim</span> Gelen <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= System.Text.Encoding.UTF8.GetString(e.Buffer, e.Offset,
e.BytesTransferred)

        <span
style="color: blue;">Me</span>.Dispatcher.BeginInvoke(<span
style="color: blue;">New</span> MyDelegate(<span
style="color: blue;">AddressOf</span> GelGel), <span
style="color: blue;">New</span> <span
style="color: blue;">String</span>() {Gelen})

        <span style="color: blue;">Dim</span> Baglanti <span
style="color: blue;">As</span> System.Net.Sockets.Socket = <span
style="color: blue;">CType</span>(e.UserToken,
System.Net.Sockets.Socket)

        Baglanti.ReceiveAsync(e)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Delegate</span> <span
style="color: blue;">Sub</span> MyDelegate(<span
style="color: blue;">ByVal</span> myArg2 <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

 

    <span style="color: blue;">Sub</span> GelGel(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">String</span>)

        Metin.Text = x

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[Sunucu: Winforms Uygulaması]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

 

    <span style="color: blue;">Dim</span> Baglilar <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.Generic.List(<span style="color: blue;">Of</span>
System.IO.StreamWriter)

    <span style="color: blue;">Dim</span> yeniTR <span
style="color: blue;">As</span> System.Threading.Thread

    <span style="color: blue;">Dim</span> TCPBaglantilari <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Threading.ManualResetEvent(<span
style="color: blue;">True</span>)

    <span style="color: blue;">Dim</span> Dinleyici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Sockets.TcpListener(System.Net.IPAddress.Any, 4530)

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btn\_Basla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
btn\_Basla.Click

        <span style="color: green;">'İzin Verilen Port Aralığı
4502-4532</span>

        yeniTR = <span style="color: blue;">New</span>
System.Threading.Thread(<span style="color: blue;">AddressOf</span>
Bekle)

        yeniTR.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Sub</span> Bekle()

        Dinleyici.Start()

        <span style="color: blue;">While</span> <span
style="color: blue;">True</span>

            TCPBaglantilari.Reset()

            Dinleyici.BeginAcceptTcpClient(<span
style="color: blue;">New</span> System.AsyncCallback(<span
style="color: blue;">AddressOf</span> BaglantiGeliyor), <span
style="color: blue;">Nothing</span>)

            TCPBaglantilari.WaitOne()

        <span style="color: blue;">End</span> <span
style="color: blue;">While</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> BaglantiGeliyor(<span
style="color: blue;">ByVal</span> ar <span
style="color: blue;">As</span> System.IAsyncResult)

        TCPBaglantilari.Set()

        <span style="color: blue;">Dim</span> Musteri <span
style="color: blue;">As</span> System.Net.Sockets.TcpClient =
Dinleyici.EndAcceptTcpClient(ar)

        <span style="color: blue;">If</span> Musteri.Connected <span
style="color: blue;">Then</span>

            <span style="color: blue;">Dim</span> yazici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.IO.StreamWriter(Musteri.GetStream)

            yazici.AutoFlush = <span style="color: blue;">True</span>

            Baglilar.Add(yazici)

            yazici.Write(<span
style="color: #a31515;">"Bağlandınız."</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> TextBox1\_TextChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
TextBox1.TextChanged

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> x <span style="color: blue;">As</span>
System.IO.StreamWriter <span style="color: blue;">In</span> Baglilar

            x.Write(TextBox1.Text)

        <span style="color: blue;">Next</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Hepinize kolay gelsin.


