---
FallbackID: 1949
Title: "Silverlight Projelerinin Yapı Taşları"
date: "2008-2-7"
EntryID: Silverlight_Projelerinin_Yapi_Taslari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: a3b41570-d13d-49b4-a8f1-193324d0895d
---
# Silverlight Projelerinin Yapı Taşları
Bir Silverlight projesi farklı dosyalardan ve yapılardan oluşur. Bu
yapılar neredeyse tamamı ister **Visual Studio** içerisinde ister
**Expression Blend 2** içerisinde bir Silverlight projesi yarattığınızda
otomatik olarak oluşturularak karşınıza çıkar. Her şey ne kadar otomatik
olsa da belirli noktalarda işlemlere müdahale edebilmek açısından bizim
için otomatik olarak hazırlanan şeylerin neler olduğunu biliyor olmak
önemlidir. Bu yazımızda bir Silverlight projesinin doğumundan
bahsedeceğiz.

İlk olarak Expression Blend 2 içerisinde yeni bir Silverlight Web Site
yaratalım ve bakalım "Project Explorer" içerisinde neler var.

![Expression Blend 2 içerisinde Silverlight projesindeki
dosyalar.](media/Silverlight_Projelerinin_Yapi_Taslari/07022008_1.png)\
*Expression Blend 2 içerisinde Silverlight projesindeki dosyalar.*

Gördüğünüz üzere bizim için yaratılmış olan birden çok dosya bulunuyor.
İlk olarak gelin **default.html** dosyasından başlayalım.

**default.html**

Herhangi bir Silverlight animasyonu tek başına çalışma yetisine sahip
değildir. Silverlight nesnelerinin bir şekilde bir web sayfası
içerisinde sunuluyor olması gerekir. Bu nedenle bizim projemizde de
Expression Blend 2 bizim için otomatik olarak bir HTML dosyası yaratarak
söz konusu HTML dosyası içerisinde Silverlight animasyonumuzu
yerleştirmiş durumda. Bu HTML dosyasının içeriğine baktığımızda ilginç
yapılarla karşılaşıyoruz.

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Silverlight.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Default\_html.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Page.xaml.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

İlk dikkatimizi çeken yukarıdaki şekli ile üç farklı JavaScript
dosyasının sayfaya eklenmiş olması. Bu dosyaların ne işlemler yaptığına
birazdan sırası ile göz atacağız. HTML sayfamızı incelemeye devam
edelim.

  <span style="color: blue;">\<</span><span
style="color: #a31515;">style</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"\></span>

    <span style="color: #a31515;">\#silverlightControlHost</span> {

      <span style="color: red;">height</span>: <span
style="color: blue;">480px</span>;

      <span style="color: red;">width</span>: <span
style="color: blue;">640px</span>;

    }

    <span style="color: #a31515;">\#errorLocation</span> {

      <span style="color: red;">font-size</span>: <span
style="color: blue;">small</span>;

      <span style="color: red;">color</span>: <span
style="color: blue;">Gray</span>;

    }

  <span style="color: blue;">\</</span><span
style="color: #a31515;">style</span><span style="color: blue;">\></span>

Sayfa içerisinde yukarıdaki gördüğünüz gibi CSS sınıfları yer alıyor. Bu
sınıflar \# deyimi ile tanımlandığı için sayfada kendi adlarındaki HTML
elementlerini bularak onları etkileyeceklerdir.
**SilverlightControlHost** adındaki element birazdan kodunu göreceğimiz
ve içerisinde Silverlight animasyonunu barındıracak olana DIV
elementinin ta kendisi. Bu elementin yükseklik ve genişliğini buradan
tanımlayarak aslında Silverlight animasyonunun genel yükseklik ve
genişliğini de tanımlamış oluyoruz. Bu genişlik ve yükseklik tanımlama
işlemi için aslında faydalanabileceğimiz başka bir yer daha var. Ondan
da ileriki adımlara bahsedeceğiz. Konuyu CSS kullanmadan çözmek de
mümkün.

Diğer CSS sınıfı olan **errorLocation** ise yine sayfada
**errorLocation** adındaki DIV elementini etkileyecek. Bu element
Silverlight animasyonunda herhangi bir hata olursa söz konusu hataya ait
mesajın gösterileceği elementin ta kendisi.

  <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="silverlightControlHost"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

      createSilverlight();

    <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

 

  <span style="color: green;">\<!-- Runtime errors from Silverlight will
be displayed here.</span>

<span style="color: green;">  This will contain debugging information
and should be removed or hidden when debugging is completed --\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">='errorLocation'\>\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Bir önceki adımda incelediğimiz ve detaylarından bahsettiğimiz CSS
sınıfları yukarıdaki DIV elementlerini etkiliyorlar. Bu elementlerden
özellikle **SilverlightControlhost** elementi çok önemli. Bu element
içerisinde Silverlight animasyonumuz yerleştiriliyor olacak. Yerleştirme
işlemini yapan JavaScript fonksiyonu da **createSilverlight**
fonksiyonu. **createSilverlight** fonksiyonu sayfada herhangi bir yerde
olabilir veya herhangi bir şekilde çalıştırılabilir.

Şimdi gelelim sırasıyla sayfamıza linklenmiş olan JavaScript
dosyalarının ne işe yaradığına.

**Silverlight.js**

Silverlight JavaScript dosyası sayfanın en üstünde yer almalıdır. Bu
dosya içerisindeki kodlar istemci tarafında Silverlight Plug-In'in yüklü
olup olmadığı kontrol ederek gerekli mesajların, görsel uyarıların
gösterilmesini sağlayacaktır. Eğer bu görsel uyarıları bir şekilde
değiştirmek istiyorsanız **Silverlight.js** dosyası doğru hedeftir.

**Default\_html.js**

Bu dosya içerisinde aslında tek bir JavaScript fonksiyonu bulunuyor;
**createSilverlight**. Hatırlarsanız bu fonksiyon bizim HTML dosyamızda
sayfaya Silverlight animasyonumuzu yüklemek için kullandığımız
fonksiyondu. Söz konusu fonksiyon doğrudan **Default\_html.js**
içerisinde tanımlanıyor.

  <span style="color: blue;">var</span> scene = <span
style="color: blue;">new</span> UntitledProject9.Page();

  Silverlight.createObjectEx({

    source: <span style="color: #a31515;">"Page.xaml"</span>,

    <span style="color: green;">//Silverlight animasyonu için yüklenecek
olan XAML kaynağı.</span>

    parentElement: document.getElementById(<span
style="color: #a31515;">"silverlightControlHost"</span>),

    <span style="color: green;">//Animasyonun yerleştirileceği HTML
elementinin ID bilgisi.</span>

    id: <span style="color: #a31515;">"SilverlightControl"</span>,

    <span style="color: green;">//Animasyona verilen ID bilgisi.</span>

    properties: {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>

    },

Yukarıdaki kod createSilverlight fonksiyonunun sadece bir parçası.
Silverlight nesnemiz yaratılırken tabi ki bazı parametrelerin verilmesi
gerekiyor. Bu parametreleri olabildiğince yukarıdaki kod içerisinde
satır aralarında anlatmaya çalıştım. Silverlight animasyonumuzda
kullanılacak olan kaynak XAML kodunun geleceği adresten tutun,
animasyonun sayfada yükleneceği konumun HTML elementine ait ID bilgisine
kadar herşey burada belirleniyor. Özellikle Silverlight animasyonuna da
bu noktada bir ID bilgisi verildiğini atlamamak gerek. Silverlight
uygulamasının programlanması noktasında bu ID bilgisi üzerinden
Silverlight nesnesine ulaşılacaktır.

Son olarak animasyon alanının toplam genişlik ve yüksekliğinin buradan
da ayarlandığını bilmekte fayda var. Varsayılan hali ile yaratılan
projelerde genişlik ve yükseklik ayarları CSS ile düzenlenmiş durumda.
Oysa burada da gerekli ayarlar yapılarak herhangi bir CSS kullanmadan da
ilerlenebilir.

Version bilgisi altında şu an için 1.0 bulunuyor. İleride Silverlight'ın
farklı sürümleri de yayınlandığında bu noktadaki bilgiye uygun işlemler
Plug-In tarafından yapılacaktır.

    events: {

      **onLoad**: Silverlight.createDelegate(scene, scene.handleLoad),

      **onError**: <span style="color: blue;">function</span>(sender,
args) {

        <span style="color: blue;">var</span> errorDiv =
**document.getElementById(**<span
style="color: #a31515;">"**errorLocation"**</span>**);**

        <span style="color: blue;">if</span> (errorDiv != <span
style="color: blue;">null</span>) {

          <span style="color: blue;">var</span> errorText =
args.errorType + <span style="color: #a31515;">"- "</span> +
args.errorMessage;

 

          <span style="color: blue;">if</span> (args.ErrorType == <span
style="color: #a31515;">"ParserError"</span>) {

            errorText += <span style="color: #a31515;">"\<br\>File:
"</span> + args.xamlFile;

            errorText += <span style="color: #a31515;">", line
"</span> + args.lineNumber;

            errorText += <span style="color: #a31515;">" character
"</span> + args.charPosition;

          }

          <span style="color: blue;">else</span> <span
style="color: blue;">if</span> (args.ErrorType == <span
style="color: #a31515;">"RuntimeError"</span>) {

            errorText += <span style="color: #a31515;">"\<br\>line
"</span> + args.lineNumber;

            errorText += <span style="color: #a31515;">" character
"</span> +  args.charPosition;

          }

          errorDiv.innerHTML = errorText;

        } 

Yukarıdaki kod içerisinde aslında iki işlem yapılıyor. Bu işlemlerden
ilki Silverlight animasyonunun yüklenmesi yani **onLoad** durumunda
çalıştırılmak üzere bir JavaScript metodunun aktarılması. Söz konusu bu
metodu başka bir dosya içerisinde yazıyor olacağız. İkincisi ise
**onError** yani Silverlight animasyonu içerisinde herhangi bir hata
olursa çalıştırılacak olan JavaScript fonksiyonunun hazırlanması. Bu
fonksiyon doğrudan kod içerisinde yazılmış. Şu andaki kod hatanın
mesajını alarak **errorDiv** adındaki bir HTML elementinin içerisine
yerleştiriyor. Söz konusu element de **errorLocation** adındaki HTML
elementinden yakalanıyor. **errorLocation** elementini HTML dosyamızın
içerisinden hatırlıyoruz.

**Page.xaml.js**

Son olarak sıra geldi esas Silverlight JavaScript kodlarımızı
yazacağımız Page.xaml.js dosyamıza. Bu dosyayı kabaca bir code-behind
dosyası olarak kabul edebilirsiniz. Dosya içerisinde bizim için yazılmış
olan örnek kodlar bulunuyor.

  **handleLoad**: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    <span style="color: blue;">this</span>.control = control;

 

    <span style="color: green;">// Sample event hookup:  </span>

    rootElement.addEventListener(<span
style="color: #a31515;">"MouseLeftButtonDown"</span>,
Silverlight.createDelegate(<span style="color: blue;">this</span>, <span
style="color: blue;">this</span>.handleMouseDown));

  },

Bu dosya içerisinde özellikle **handLoad** JavaScript fonksiyonundan
bahsetmek istiyorum, çünkü bu fonksiyon bir önceki adımda
**default\_html.js** içerisinde Silverlight animasyonunun **onLoad**
durumuna bağlanmıştı. Söz konusu fonksiyon HTML sayfası açıldıktan ve
**createSilverlight** fonksiyonu çalıştırıldıktan sonra hemen
çalışacaktır. Yani Silverlight animasyonun yüklenmesinden sonra yapmak
isteyeceklerinizi hemen burada yazabilirsiniz. handlLoad içerisindeki
örnek kodları da gönül rahatlığı ile silebilirsiniz.

Böylece yeni başlayan bir Silverlight projesindeki dosyaları ve neyin
nasıl çalıştığını incelemiş olduk.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-2-7 tarihinde yayinlanmistir.*
