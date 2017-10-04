---
FallbackID: 2109
Title: Silverlight 2.0 içerisinde asenkron font dosyası indirerek kullanmak
PublishDate: 1/7/2008
EntryID: Silverlight_2_0_icerisinde_asenkron_font_dosyasi_indirerek_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 3fed3b8c-3f88-4edf-b29b-c461a5e1d246
---
Silverlight 1.0 ile beraber istemci tarafında herhangi bir font
yüklemesi olmadan istediğimiz fontları TextBlock ve TextBox gibi
kontrollerde kullanabilir hale gelmiştik. Silverlight 2.0 tarafında
gelen yeniliklerle beraber artık her şeyi VB veya C\# kodumuz ile
halletmemiz gerekiyor. Bu yazımızda Silverlight 2.0 ile beraber özel
font kullanımını inceleyeceğiz.

**Sunucudan asenkron font indirerek kullanmak**

Sunucudaki istediğimiz bir fontu asenkron olarak istemci tarafına
indirip istediğimiz kontrollere bağlayabiliriz. Böylece gerekli fontları
sadece gerekli olduğunda istemci tarafına taşımış oluruz. Bunun için
Silverlight 2.0 tarafında bir **WebClient** nesnesi kullanarak ilk
olarak font dosyasını istemci tarafına indirmemiz gerekiyor.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> Yukleme <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
WebClient

        <span style="color: blue;">AddHandler</span>
Yukleme.OpenReadCompleted, <span style="color: blue;">AddressOf</span>
Yukleme\_OpenReadCompleted

        Yukleme.OpenReadAsync(<span style="color: blue;">New</span>
Uri(<span
style="color: #a31515;">"/SilverlightApplication33Web/deveload.ttf"</span>,
UriKind.Relative))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">public</span> Page()

        {

            InitializeComponent();

 

            <span style="color: #2b91af;">WebClient</span> Yukleme =
<span style="color: blue;">new</span> <span
style="color: #2b91af;">WebClient</span>();

            Yukleme.OpenReadCompleted += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">OpenReadCompletedEventHandler</span>(Yukleme\_OpenReadCompleted);

            Yukleme.OpenReadAsync(<span style="color: blue;">new</span>
<span style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"/SilverlightApplication34Web/deveload.ttf"</span>,
<span style="color: #2b91af;">UriKind</span>.Relative));

        }

Kodumuzda Silverlight uygulaması yüklendiği gibi hemen bir **WebClient**
nesnesi yaratarak ardından **OpenReadCompleted** event'ı için dinamik
bir event handler bağlıyoruz. Söz konusu event handler WebClient
nesnesinin sunucudan aldığı dosyanın download işlemi bittiğinde
çalıştırılacak ve böylece biz de veri geldiğinde istediğimiz kontrole
bağlayabileceğiz. Event-handler bağlantısını da tamamladıktan sonra
**OpenReadAsync** ile sunucudan verimizi almaya başlıyoruz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Yukleme\_OpenReadCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Net.OpenReadCompletedEventArgs)

        Label1.FontSource = <span style="color: blue;">New</span>
FontSource(e.Result)

        Label1.FontFamily = <span style="color: blue;">New</span>
FontFamily(<span style="color: #a31515;">"DEVELOAD"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>
Yukleme\_OpenReadCompleted(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">OpenReadCompletedEventArgs</span>
e)

        {

            Label1.FontSource = <span style="color: blue;">new</span>
<span style="color: #2b91af;">FontSource</span>(e.Result);

            Label1.FontFamily = <span style="color: blue;">new</span>
<span style="color: #2b91af;">FontFamily</span>(<span
style="color: #a31515;">"DEVELOAD"</span>);

        }

Veri sunucudan geldiğinde, download işlemi bittiğinde çalışan
event-handler içerisinde hemen elimizdeki TextBlock olan **Label1**
adındaki kontrolün **FontSource** özelliğini değiştiriyoruz.
Tanımladığımız yeni **FontSource** veri kaynağını **e.Result** ile
alıyor, yani WebClient'ın indirdiği **Stream'i** doğrudan FontSource'a
çevirerek TextBlock'a aktarıyoruz. Son olarak tabi ki TextBlock'un
**FontFamily** özelliğini de uygun şekilde değiştirmemiz gerek.

İsterseniz **WebClient** nesnesinin **DownloadProgressChanged** durumuna
da bir event-handlar bağlayarak Fontların yüklenmesi esnasında
yüklemenin ne kadarının tamamlandığını da takip edebilirsiniz.

Hepinize kolay gelsin.


