---
FallbackID: 2086
Title: Silverlight uygulamamızın tarayıcı tarafından tekrar boyutlandırıldığını nasıl algılarız?
PublishDate: 6/9/2008
EntryID: Silverlight_uygulamamizin_tarayici_tarafindan_tekrar_boyutlandirildigini_nasil_algilariz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: dd0ad6bc-14b9-4ad6-9c90-eeb707a814ee
---
Silverlight 2.0 Beta 2 ile beraber uygulamanızı hazırladınız ve
kullandığınız kontrollerin görsel özelliklerini öyle bir ayarladınız ki
istemci tarafında kullanıcı tarayıcı penceresinin boyutunu değiştirse de
uygulamanız herhangi bir sorun yaşamıyor. Ama keşke programatik olarak
da tarayıcının boyutu değiştiğinde haberim olsaydı diyorsanız işte size
çözüm;

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

    <span style="color: blue;">AddHandler</span>
**App.Current.Host.Content.Resized**, <span
style="color: blue;">AddressOf</span> Resized

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">public</span> Page()

{   

    InitializeComponent();   

    **App.Current.Host.Content.Resized** += <span
style="color: blue;">new</span> EventHandler(Resized);

}

Yukarıdaki şekliyle o an için geçerli olan uygulamanın içerisinde yer
aldığı sunucu elementi bulup **Resized** durumunu yakalıyoruz. Aslında
**Resized** durumundan bağımsız bir şekilde istediğiniz zaman
Silverlight uygulamanızın içerisinde bulunduğu pencerenin boyutunu
aşağıdaki kodlar ile alabilirsiniz.

**[VB]**

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Resized(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs)

    <span style="color: blue;">Dim</span> Yukseklik <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>
= App.Current.Host.**Content.ActualHeight**

    <span style="color: blue;">Dim</span> Genislik <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>
= App.Current.Host.**Content.ActualWidth**

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

<span style="color: blue;">void</span> Resized(<span
style="color: blue;">object</span> sender, EventArgs e)  

{  

    <span style="color: blue;">double</span> yukseklik =
App.Current.Host.**Content.ActualHeight**;  

    <span style="color: blue;">double</span> genislik =
App.Current.Host.**Content.ActualWidth**; 

}

Bu işlemi Resized event'ı içerisinde yaptığımızda ise internet
tarayıcısının boyutları değiştiğinde yeni boyutları almış oluyoruz. Ufak
bir uyarı yaparak yazımı tamamliyim, yukarıdaki kodların doğru
çalışabilmesi için tarayıcı içerisinde Silverlight uygulamanızın %100
genişlik ve yükseliğe sahip olması gerekiyor. Aslına bakılırsa tarayıcı
penceresinin değil Silverlight uygulamasının container'ının boyutunu
alıyoruz o nedenle eğer Silverlight uygulamasının boyutları sayfada
sınırlanmış olursa elimize sürekli aynı değerler ulaşacaktır.

Hepinize kolay gelsin.


