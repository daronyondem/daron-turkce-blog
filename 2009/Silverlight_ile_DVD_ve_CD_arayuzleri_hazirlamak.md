---
FallbackID: 2399
Title: "Silverlight ile DVD ve CD arayüzleri hazırlamak!"
date: "2009-9-3"
EntryID: Silverlight_ile_DVD_ve_CD_arayuzleri_hazirlamak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Silverlight 2.0, Silverlight 3.0
old.EntryID: 524c9729-43a5-4398-a7a7-665448029592
---
# Silverlight ile DVD ve CD arayüzleri hazırlamak!
DVD veya CD arayüzleri hala bilgisayar dünyasında ciddi bir yere sahip.
İçeriğin paylaşımı adında internet ciddi bir yol almış olsa da hala CD
ve DVD medyalarını kullanarak içeriğin dağıtımı bazı senaryolarda çok
daha işlevsel olabiliyor. Bu gibi durumlarda doğal olarak bir arayüz ile
söz konusu içeriği bir CD veya DVD içerisinde sunmak gerekiyor. Peki bu
arayüzü geliştirmek için hangi teknolojileri kullanabiliriz?

Gelin beraberce sıralayalım;

HTML - Pufff!\
Flash - ActionScript? Pufff!\
 WPF - .NET Framework yükletmek? Puff!\
Silverlight - Oley! İşte bu!

Şaka bir yana :) aslında bir CD veya DVD arayüzü geliştirirken
ihtiyacımız olan şey hem arayüz içerisinde her tür data işlemini
yapabilimek hem de güzel bir arayüz tasarlayabilmektir. Varsayalım bir
ürün kataloğu yapıyorsunuz, büyük ihtimal ile söz konusu ürünler
arasında arayüzde arama da yapılabilmelidir. İşte ufak da olsa bir
programlama noktası karşımızda. Olabildiğince rahat programlamak ve
bildiğimiz bir dili kullanmak önemli. HTML ile JavaScript veya Flash ile
ActionScript bir .NET developer için çok da ferah bir gelecek
vaadetmeyecektir. Ayrıca HTML ile zaten güzel bir arayüz, zengin bir
kullanıcı deneyimi sağlamak da pek mümkün değil.

Alternatiflerden bir diğeri WPF olabilir ve aslında çok da güzel olur.
Fakat bu sefer de .NET Framework gereksinimi ile karşı karşıya
kalıyoruz. Eh hadi DVD'nin içine koyalım ama insanların bir DVD
arayüzünü görebilmek için .NET Framework kurup (en az 5dk) makinelerine
restart atacaklarından emin misiniz?

Tüm bu senaryonda en güzeli Silverlight! Hem bildiğimiz VB, C\# hem
Expression Blend ile süper kullanıcı deneyimi hem de 4MB Runtime ve 5
saniye yükleme süresi. Hem MAC desteği de var! Eh gönül daha ne ister?

**Tamam da şimdi tarayıcıda açtırmak da pek hoş olmuyor!**

Kesinlikle! Bir CD veya DVD arayüzünün tarayıcı içerisinde açılması
benim en uyuz olduğum noktalardan birisidir özünde. Neden mi? Çünkü
ister istemez bir web sitesi hissiyatı yaratıyorsunuz ve en azından
bende "çok uğraşılmamış" efekti oluşturuyor. Yani "adamlar web sitesi
yapıp koymuş DVD'ye!" gibi abuk bir yorumun gelmesi olasılığı ciddi
yüksek. O nedenle tarayıcıdan kurtulmamız gerek.

**HTML Application = HTA!**

HTA'larla ilk tanışdığımda "İşte bu" demiştim :) Sanırım SQL 2000'in
yükleme CD'sinin arayüzünde görmüştüm. Arayüz ilgimi çekmişti çünkü bir
tarayıcı gibi içinde HTML olduğunu hissetmiş fakat ortada bir tarayıcı
görmemenin de şaşkınlığını yaşamıştım. Sonra biraz CD'yi karıştırınca
HTA'larla tanıştım. HTA aslında HTML vs bir scripting dili ile
yazılabilir uygulamalar şeklinde tanımlanabilir. Bu uygulamalar
"Microsoft HTML Applicatio Host" adında özel bir uygulama tarafından
Windows içerisinde host edilir. Arka planda Internet Explorer kullanılır
fakat kullanıcılar bunu görmez. HTA uzantılı bir dosya rahatlıkla
Notepad ile açılabilen birer HTML dosyasıdır aslında.

**[HTA]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">HTML</span><span style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">link</span> <span
style="color: red;">href</span><span
style="color: blue;">="img/styles.css"</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"</span> <span
style="color: red;">rel</span><span
style="color: blue;">="stylesheet"</span> <span
style="color: blue;">/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">meta</span> <span
style="color: red;">http-equiv</span><span
style="color: blue;">="Content-Type"</span> <span
style="color: red;">content</span><span
style="color: blue;">="text/html; charset=utf-8"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">TITLE</span><span style="color: blue;">\></span>

      Internet Explorer 8 -DVD

    <span style="color: blue;">\</</span><span
style="color: #a31515;">TITLE</span><span style="color: blue;">\></span>

 

    <span style="color: blue;">\<</span><span
style="color: #a31515;">HTA</span><span
style="color: blue;">:</span><span
style="color: #a31515;">APPLICATION</span>

     <span style="color: red;">APPLICATIONNAME</span><span
style="color: blue;">="IE8DVD"</span> 

     <span style="color: red;">MAXIMIZEBUTTON</span><span
style="color: blue;">="no"</span>

     <span style="color: red;">MINIMIZEBUTTON</span><span
style="color: blue;">="no"</span>

     <span style="color: red;">SINGLEINSTANCE</span><span
style="color: blue;">="yes"</span>

     <span style="color: red;">ICON</span><span
style="color: blue;">="setup.ico"</span>

     <span style="color: red;">SCROLL</span><span
style="color: blue;">="no"</span> <span style="color: blue;">/\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">HEAD</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span> <span
style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">margin</span>:<span
style="color: blue;">0px</span>;<span style="color: blue;">"\></span>

 

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">for</span><span
style="color: blue;">="window"</span> <span
style="color: red;">event</span><span
style="color: blue;">="onload"\></span>

   window.resizeTo(820,640);

   window.moveTo((screen.width - 820) / 2, (screen.height - 640) / 2);

<span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

Yukarıda gördüğünüz kod basit bir HTA dosyasının içeriği. Aslında
içerisinde pek birşey yok. İlk anlamamız gereken şey aslında bir HTML
ile çalışıyor olduğumuz. Tabi biz arayüzü oluşturmak için HTML değil
Silverlight kullanacağız. Önemli olan ilk şey tabi ki dokümanın TITLE
kısmını ayarlamak çünkü bu uygulamanızın açılan penceresinin başlığı
olacak. Aşağıda gördükleriniz ise uygulama parametreleri.

**[HTA]**

    <span style="color: blue;">\<</span><span
style="color: #a31515;">HTA</span><span
style="color: blue;">:</span><span
style="color: #a31515;">APPLICATION</span>

     <span style="color: red;">APPLICATIONNAME</span><span
style="color: blue;">="IE8DVD"</span> 

     <span style="color: red;">MAXIMIZEBUTTON</span><span
style="color: blue;">="no"</span>

     <span style="color: red;">MINIMIZEBUTTON</span><span
style="color: blue;">="no"</span>

     <span style="color: red;">SINGLEINSTANCE</span><span
style="color: blue;">="yes"</span>

     <span style="color: red;">ICON</span><span
style="color: blue;">="setup.ico"</span>

     <span style="color: red;">SCROLL</span><span
style="color: blue;">="no"</span> <span style="color: blue;">/\></span>

Uygulamanın açılacağı pencerede pencereyi büyütme, küçültme vs gibi
düğmeleri isteyip istemediğinizi belirtebilir hatta uygulamanın tek
oturumunun olmasını da yukarıdaki parametreler ile sağlayabilirsiniz.
Uygulama ikonunu da ayarladıktan sonra önemli noktalardan biri
**Scroll** özelliği **NO** şeklinde set etmek. Malum biz bu HTML
içerisinde arayüz olarak Silverlight koyacağımız için zaten gerekli
scroll işlemlerini de SL içerisinde halledebiliriz.

**[HTA]**

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">for</span><span
style="color: blue;">="window"</span> <span
style="color: red;">event</span><span
style="color: blue;">="onload"\></span>

   window.resizeTo(820,640);

   window.moveTo((screen.width - 820) / 2, (screen.height - 640) / 2);

<span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

Yukarda basit bir JavaScript kodu görüyorsunuz. Bu kod uygulamanızın
penceresinin boyutunu ayarlayacağı gibi pencerenin de ekranın tam
ortasında gözükmesini sağlayacaktır. HTA'lar içerisinde hem JavaScript
hem VBScript kullanabilirsiniz. Her script ait olduğu nesneye **for**
özelliği ve ait olduğu nesnenin hangi event'ını dinleyeceğine de
**event** parametresi ile bağlanır.

Bu noktadan sonra tabi ki sizin ilk olarak Silverlight uygulamanızı
hazırlamanız gerek. Arayüz olarak kullanılacak Silverlight uygulaması
hazırlandıktan sonra bu HTA içerisine uygun şekilde yerleştirilebilmesi
çok önemli.

**[HTA]**

<span style="color: gray;">\<HTML\></span>

<span style="color: gray">  </span> <span
style="color: gray;">\<head\></span>

<span style="color: gray">  </span> <span
style="color: gray;">\<link</span> <span
style="color: gray;">href="img/styles.css"</span> <span
style="color: gray;">type="text/css"</span> <span
style="color: gray;">rel="stylesheet"</span> <span
style="color: gray;">/\></span>

<span style="color: gray;">\<meta</span> <span
style="color: gray;">http-equiv="Content-Type"</span> <span
style="color: gray;">content="text/html; charset=utf-8"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<TITLE\></span>

      Internet Explorer 8 -DVD

<span style="color: gray">    </span> <span
style="color: gray;">\</TITLE\></span>

 

<span style="color: gray">    </span> <span
style="color: gray;">\<HTA:APPLICATION</span><span style="color: gray">
</span>

<span style="color: gray">     </span> <span
style="color: gray;">APPLICATIONNAME="IE8DVD"</span><span
style="color: gray">  </span>

<span style="color: gray">     </span> <span
style="color: gray;">MAXIMIZEBUTTON="no"</span>

<span style="color: gray">     </span> <span
style="color: gray;">MINIMIZEBUTTON="no"</span>

<span style="color: gray">     </span> <span
style="color: gray;">SINGLEINSTANCE="yes"</span>

<span style="color: gray">     </span> <span
style="color: gray;">ICON="setup.ico"</span>

<span style="color: gray">     </span> <span
style="color: gray;">SCROLL="no"</span> <span
style="color: gray;">/\></span>

<span style="color: gray">  </span> <span
style="color: gray;">\</HEAD\></span>

 

<span style="color: gray;">\<body</span> <span
style="color: gray;">style="margin</span>:<span
style="color: gray;">0px</span>;<span style="color: gray;">"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="silverlightControlHost"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">object</span> <span
style="color: red;">data</span><span
style="color: blue;">="data:application/x-silverlight-2,"</span> <span
style="color: red;">type</span><span
style="color: blue;">="application/x-silverlight-2"</span> <span
style="color: red;">width</span><span
style="color: blue;">="100%"</span> <span
style="color: red;">height</span><span
style="color: blue;">="100%"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="source"</span> <span
style="color: red;">value</span><span
style="color: blue;">="ClientBin/Interface.xap"/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="background"</span> <span
style="color: red;">value</span><span
style="color: blue;">="white"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="minRuntimeVersion"</span> <span
style="color: red;">value</span><span
style="color: blue;">="2.0.31005.0"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="autoUpgrade"</span> <span
style="color: red;">value</span><span
style="color: blue;">="true"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">cursor</span>:<span
style="color: blue;">pointer</span>;<span style="color: blue;">"</span>
<span style="color: red;">ID</span><span
style="color: blue;">="SLInstall"</span> <span
style="color: red;">border</span><span style="color: blue;">="0"</span>
<span style="color: red;">src</span><span
style="color: blue;">="images/install.jpg"</span> <span
style="color: blue;">/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

 

<span style="color: gray">    </span> <span
style="color: gray;">\<script</span> <span
style="color: gray;">for="window"</span> <span
style="color: gray;">event="onload"\></span>

   window.resizeTo(820,640);

   window.moveTo((screen.width - 820) / 2, (screen.height - 640) / 2);

<span style="color: gray;">\</script</span><span
style="color: blue;">\></span>

     <span style="color: blue;">\<</span><span
style="color: #a31515;">SCRIPT</span> <span
style="color: red;">FOR</span><span
style="color: blue;">="SLInstall"</span> <span
style="color: red;">EVENT</span><span
style="color: blue;">="onclick"</span> <span
style="color: red;">LANGUAGE</span><span
style="color: blue;">="VBScript"\></span>

      <span style="color: blue;">Dim</span> objShell

      <span style="color: blue;">Dim</span> lngReturn

 

      <span style="color: blue;">on</span> <span
style="color: blue;">error</span> <span
style="color: blue;">resume</span> <span
style="color: blue;">next</span>

 

      <span style="color: blue;">set</span> objShell = CreateObject(
<span style="color: #a31515;">"WScript.Shell"</span> )

 

        lngReturn = objShell.Run (<span
style="color: #a31515;">"Silverlight.2.0.exe"</span>, 4, 1)

 

      <span style="color: blue;">set</span> objShell = <span
style="color: blue;">Nothing</span>

      document.execCommand(<span
style="color: #a31515;">"Refresh"</span>)

 

    <span style="color: blue;">\</</span><span
style="color: #a31515;">SCRIPT</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

İşte esas noktaya geldik. Yukarı gördüğünüz OBJET tagları klasik bir SL
uygulamasının bir HTML sayfaya yerleştirildiği taglardan farklı değil.
Bir tek minik fark var o da OBJECT tagları içindeki HTML kodu!
Hatırlarsanız tarayıcılar eğer OBJECT taglarını render edemezse
içlerindeki HTML'i gösteriyorlardı. Bu gibi bir durumda Silverlight
hedef makinede yüklü değilse bu demektir de tarayıcı OBJECT taglarını
render edemeyecek bir OBJECT içerisindeki HTML'i kullanıcıya gösterecek.

**[HTML]**

      <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">cursor</span>:<span
style="color: blue;">pointer</span>;<span style="color: blue;">"</span>
<span style="color: red;">ID</span><span
style="color: blue;">="SLInstall"</span> <span
style="color: red;">border</span><span style="color: blue;">="0"</span>
<span style="color: red;">src</span><span
style="color: blue;">="images/install.jpg"</span> <span
style="color: blue;">/\></span>

Yukarıdaki şekilde güzel bir resim Silverlight yüklü değilken
gösterilecek resim olarak seçilebilir. Tabi bu resmin tasarımında
kullanıcıya uygun mesajı bir metin olarak göstermeniz şart. Diğer yandan
bu resim nesnesinin fare ile üzerine geldindiğinde el işareti
gösterilmesi için uygun CSS'in kullanılması da gerekiyor. Son olarak bu
IMG'ye bir de ID veriyoruz çünkü bu resme tıklandığında Silverlight
Runtime yüklemesini başlatmalıyız!

**[VBScript]**

     <span style="color: blue;">\<</span><span
style="color: #a31515;">SCRIPT</span> <span
style="color: red;">FOR</span><span
style="color: blue;">="SLInstall"</span> <span
style="color: red;">EVENT</span><span
style="color: blue;">="onclick"</span> <span
style="color: red;">LANGUAGE</span><span
style="color: blue;">="VBScript"\></span>

      <span style="color: blue;">Dim</span> objShell

      <span style="color: blue;">Dim</span> lngReturn

 

      <span style="color: blue;">on</span> <span
style="color: blue;">error</span> <span
style="color: blue;">resume</span> <span
style="color: blue;">next</span>

 

      <span style="color: blue;">set</span> objShell = CreateObject(
<span style="color: #a31515;">"WScript.Shell"</span> )

 

        lngReturn = objShell.Run (<span
style="color: #a31515;">"Silverlight.2.0.exe"</span>, 4, 1)

 

      <span style="color: blue;">set</span> objShell = <span
style="color: blue;">Nothing</span>

      document.execCommand(<span
style="color: #a31515;">"Refresh"</span>)

 

    <span style="color: blue;">\</</span><span
style="color: #a31515;">SCRIPT</span><span
style="color: blue;">\></span>

Yukarıda bir **VBScript** kodu görüyorsunuz. Silverlight Runtime
yüklemesine ait **EXE** dosyasının **HTA** ile aynı klasöre koyduktan
sonra uygun zamanda yüklemeyi başlatmak şart. Bunun için bir **Shell**
nesnesi yaratarak yüklemeyi başlatabiliyoruz. Yükleme bitince de sayfaya
**Refresh** atıyoruz böylece kullanıcı yüklemeyi yaptıktan sonra ekranı
kapatıp açmadan hemen arayüzü görebiliyor. Bu scriptin **FOR** ve
**EVENT** özelliklerine bakarsanız bizim bir önceki adımda yarattığımız
**IMG** nesnesinin **onclick** durumunda çalışacağını görebilirsiniz.

**Diskten birşey çalıştırmak istersek?**

Biliyorsunuz Silverlight'ın çalıştığı makinedeki diske erişimi yok.
Bunun nedeni Silverlight'ın çalıştığı yer olan tarayıcı içerisindeki
alandan yani bir web sitesinden de hedef makinedeki diske ulaşamıyor
olmamız. HTA'lar bu konuda biraz farklılar. HTA'larda rahatlıkla diske
erişebilirsiniz. Aslında bir önceki örnekte biz bu işi zaten yapmadık
mı? HTA içerisinden gidip Silverlight Runtime'ı yüklemek demek harici
bir EXE'yi çalıştırmak demek değil mi? Aynen öyle. Peki biz bunu
Silverlight içerisinden nasıl yapabiliriz?

Silverlight içerisinde çıkıp VBScript'e ulaşıp, parametre göndererek
VBScript ile de diske erişebiliriz.

**[VBScript]**

     <span style="color: blue;">\<</span><span
style="color: #a31515;">SCRIPT</span> <span
style="color: red;">LANGUAGE</span><span
style="color: blue;">="VBScript"\></span>

             <span style="color: blue;">sub</span> Getir(<span
style="color: blue;">byval</span> address)

      <span style="color: blue;">Dim</span> objShell

      <span style="color: blue;">Dim</span> lngReturn

 

      <span style="color: blue;">on</span> <span
style="color: blue;">error</span> <span
style="color: blue;">resume</span> <span
style="color: blue;">next</span>

 

      <span style="color: blue;">set</span> objShell = CreateObject(
<span style="color: #a31515;">"WScript.Shell"</span> )

 

        lngReturn = objShell.Run (address, 4, 1)

 

      <span style="color: blue;">set</span> objShell = <span
style="color: blue;">Nothing</span>

            <span style="color: blue;">end</span> <span
style="color: blue;">sub</span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">SCRIPT</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz VBScript metodu tek bir parametre alarak Shell
nesnesi yaratıp parametreden gelen adresi diskte çalıştırmaya çalışıyor.
Bu durumda biz bu metodu Silverlight tarafından çağırıp uygun
parametreyi verebilirsek işlem tamamlanmış demektir.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnSource\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> btnSource.Click

        System.Windows.Browser.HtmlPage.Window.Invoke(<span
style="color: #a31515;">"Getir"</span>, <span
style="color: blue;">New</span> <span
style="color: blue;">String</span>(<span
style="color: #a31515;">"samples/Hedehodo.exe"</span>))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İşte bu kadar basit. Silverlight'tan DOM'a çıkarak Getir adındaki
metodumuzu çalıştırıp bir de String parametre gönderiyoruz. Söz konusu
String parametre aslında çalıştırmak istediğimiz uygulamanın HTA
dosyasının bulunduğu yere göre relative Uri'sini içeriyor. Böylece bu
parametre VBScript'e aktarılacak, oradan da Shell üzerinden
çalıştırılabilecek.

**Süper değil mi?**

Şimdi yapabileceklerinizi bir düşünün :) Silverlight uygulaması
içerisinde yapabildiğiniz herşey bir anda bir DVD arayüzüne
dönüştürülebiliyor. SaveFileDialog, OpenFileDialog, Socket bağlantılar!,
Desktop moduna geçip makineye anında yükleme yapabilmek! ve daha bir çok
Silverlight özelliğini bir anda kullanabilir hale geliyorsunuz! Bu
gerçekten muhteşem!



*Bu yazi http://daron.yondem.com adresinde, 2009-9-3 tarihinde yayinlanmistir.*
