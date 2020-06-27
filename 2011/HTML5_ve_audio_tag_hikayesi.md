---
FallbackID: 2746
Title: "HTML5'te her tarayıcı ile uyumluluk yolunda audio tag kullanımı deneyimlerim"
date: "2011-12-30"
EntryID: HTML5_ve_audio_tag_hikayesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: HTML5, Silverlight 5
---
# HTML5'te her tarayıcı ile uyumluluk yolunda audio tag kullanımı deneyimlerim
HTML5 hikayelerinde her zaman en ön planda olanlar özelliklerden,
konulardan biri audio ve video olur :) Eh HTML5 yeni birşey ve
problemleri çözüyor vs diye düşünürken bilmem hiç denediniz mi ama tün
HTML5 hikayesinde bir video veya audio tagını her tarayıcıda çalışır
hale getirmek için yine her zamanki HTML/JavaScript taklalarını atmak
gerekiyor :)

Son günlerde bu tarz bir proje üzerinde çalışırken keşfettiğim birkaç
taklayı sizle paylaşmak istiyorum. Amacımız HTML5 ile tarayıcı
içerisinde (tüm tarayıcılarda) ses dosyaları oynatmak. İlk olarak
HTML5'deki audio tagının her tarayıcıda çalışmasını sağlamalı,
sonrasında da HTML5 desteklemeyen tarayıcılar için Silverlight ile bir
"kurtarma operasyonu" şansı tanımalıyız :)

### W3C her şeye karışmıyor aslında...

[W3C'ye baktığımızda](http://www.w3schools.com/html5/tag_audio.asp)
HTML5 tagının tüm güncel tarayıcılarda desteklendiğini görüyoruz. Fakat
W3C'nin ilgilenmediği bir nokta var :) O da bu taglerle oynatılabilecek
ses dosyalarının formatı! Biraz daha
konuyu[karıştırdığımızda](http://www.w3schools.com/html5/html5_audio.asp)
görüyoruz ki şu an piyasadaki tüm tarayıcılarda sadece MP3, Wav, ve Ogg
desteği var. MP3'ü görünce kendinizi mutlu hissetmeye başlayabilirsiniz
ama durun :) Firefox ve Opera MP3 desteklemiyor. Bu arada zaten WAV'ı
listeden direk siliyorum :) PCM stream edecek değiliz. Firefox ve Opera
ne destekliyor başka diye baktığımızda karşımıza OGG çıkıyor. Ama OGG'yi
de Safari ve Internet Explorer desteklemiyor :) Yani özetle, herkesin
desteklediği bir format yok. Ama eğer biz hem OGG hem MP3
sağlayabilirsek işte o zaman her yerde destek bulabiliriz.

### Hem MP3 hem OGG lazım....

Çözümü bulduk. Eğer HTML5 ile her tarayıcıda bir ses dosyası oynatmak
istiyorsak mecburen hem MP3 hem de OGG sağlamamız şart. Peki bunu nasıl
yaparız?

**[HTML]**

<span style="color:blue;">\<</span><span
style="color:maroon;">audio</span> <span
style="color:red;">controls</span><span
style="color:blue;">="controls"\></span>\
   <span style="color:blue;">\<</span><span
style="color:maroon;">source</span> <span
style="color:red;">src</span><span
style="color:blue;">="song.ogg"</span> <span
style="color:red;">type</span><span
style="color:blue;">="audio/ogg"</span> <span
style="color:blue;">/\></span>\
   <span style="color:blue;">\<</span><span
style="color:maroon;">source</span> <span
style="color:red;">src</span><span
style="color:blue;">="song.mp3"</span> <span
style="color:red;">type</span><span
style="color:blue;">="audio/mpeg"</span> <span
style="color:blue;">/\></span>\
   Your browser does not support the audio element.\
<span style="color:blue;">\</</span><span
style="color:maroon;">audio</span><span style="color:blue;">\></span> 

Yukarıdaki kod çok basit gözüküyor :) Sırası ile farklı codec'lerdeki
dosyalarımızı ayrı ayrı **source** olarak **audio** kontrolüne veriyoruz
ve işlem bitiyor. Her tarayıcı otomatik olarak kendi oynatabildiğini
seçiyor. Şimdi gelelim başka bir soruna...

### JavaScript ile source değişimi....

Benim uygulamam gereken senaryoda sayfada bir tane Audio tagı, yani bir
player olacaktı. Sayfadaki bir başka playlistten hangi şarkıyı
seçerseniz o oynatılacak audio tagında.. Hmmm demek ki **source'u**
JavaScript ile değiştirmemiz lazım. İşte tam da bu noktada çoklu source
verdiğinizde tarayıcıların bug'ları işin içine giriyor ve adam gibi bir
çözüm bulmak neredeyse imkansız oluyor. Bir enumaration olarak Source
listesini alıp değiştirebileceğinizi düşünürken hikayenin o şekilde
çalışamadığını görüyorsunuz.

**[JavaScript]**

<span
style="color:blue;">var</span> source = document.createElement(<span
style="color:maroon;">'source'</span>);\
<span style="color:blue;">if</span> (document.getElementById(<span
style="color:maroon;">'videotag'</span>).canPlayType(<span
style="color:maroon;">'audio/mpeg;'</span>)) {\
    source.type = <span style="color:maroon;">'audio/mpeg'</span>;\
    source.src = URL;\
} <span style="color:blue;">else</span> {\
    source.type = <span style="color:maroon;">'audio/ogg'</span>;\
    source.src = OGG;\
}

İşte yukarıdaki kod hayatınızı kurtarabilir :) Kod içerisinde yeni
bir**source** tagi yaratıp, sonrasında sayfadaki adı **videotag** olan
audio elementini bulup oynatabildiği codec'i de **canPlayType** metodu
ile kontrol edip... yeni source'u video tagine aşağıdaki şekilde
ekleyebiliyoruz.

**[JavaScript]**

document.getElementById(<span style="color:maroon;">'<span
style="color: maroon;">videotag</span>'</span>).appendChild(source);\
document.getElementById(<span style="color:maroon;">'<span
style="color: maroon;">videotag</span>'</span>).play();

Sorun çözüldü :) Bu kod tüm tarayıcılarda çalışacaktır. Peki ya HTML5
yoksa? yani tarayıcı audio tagını hiç desteklemiyorsa? İşte o zaman
sayfaya bir Silverlight player koyacağız. İster hazır bir Silverlight
player bulun ister kendiniz yazın önemli olan o Silverlight Player'ı
sayfaya JavaScript ile koyabilmeniz ve benim senaryomda yine JavaScript
ile SL Player'a hem oynatacağı dosyanın yolunu hem de gerekli play/stop
komutlarını gönderebilmek.

*Not: Silverlight içerisinde nesne ve Play/Stop gibi metodları,
işlemleri JavaScript'e açabilmek için "*[*Silverlight 2.0 ve JavaScript
Kardeşliği*](http://daron.yondem.com/tr/post/a1426eb0-7120-4a66-9d5c-de5027fd59ed)*"
makalesine göz atabilirsiniz.*

İlk olarak sayfamız açıldığında tarayıcının HTML5'in audio tagini
destekleyip desteklemediğini bulmamız gerek. Bunun için basit bir
şekilde, daha önceki adımlarda kullandığımız **canPlayType** metodunun
var olup olmadığını kontrol edebiliriz.

**[JavaScript]**

<span style="color:blue;">if</span> (!document.createElement(<span
style="color:maroon;">'audio'</span>).canPlayType) 

Eğer **canPlayType** yoksa belli ki HTML5 desteği yok ve artık
Silverlight kontrolünü sahneye koymanın zamanı geldi. Yeni bir SL
nesnesi yaratıp, onu bir XAP ile ilişkilendirip sahneye koymak için
[Silverlight.js](http://daron.yondem.com/tr/post/6ff37001-ac18-4698-900a-bee025187001)
dosyası içerisindeki **createObject** metodunu kullanacağız.
Bahsettiğimiz Silverlight.js zaten her Silverlight projesi ile beraber
gelir ve Silverlight SDK içerisinde de bulunur. Bu dosyayı sayfaya
include ettikten sonra aşağıdaki şekilde SL objemizi yaratabiliriz.

**[JavaScript]**

<span style="color:blue;">var</span> getSilverlightMethodCall =\
<span
style="color:maroon;">"javascript:Silverlight.getSilverlight(\\"4.0.60310.0\\");"</span>\
<span style="color:blue;">var</span> installImageUrl =\
<span
style="color:maroon;">"http://go.microsoft.com/fwlink/?LinkId=161376"</span>;\
<span style="color:blue;">var</span> imageAltText = <span
style="color:maroon;">"Get Microsoft Silverlight"</span>;\
<span style="color:blue;">var</span> altHtml =\
<span
style="color:maroon;">"\<a href='{1}' style='text-decoration: none;'\>"</span> +\
<span style="color:maroon;">"\<img src='{2}' alt='{3}' "</span> +\
<span
style="color:maroon;">"style='border-style: none'/\>\</a\>"</span>;\
altHtml = altHtml.replace(<span
style="color:maroon;">'{1}'</span>, getSilverlightMethodCall);\
altHtml = altHtml.replace(<span
style="color:maroon;">'{2}'</span>, installImageUrl);\
altHtml = altHtml.replace(<span
style="color:maroon;">'{3}'</span>, imageAltText);\
\
Silverlight.createObject(\
<span style="color:maroon;">"ClientBin/sl\_player.xap"</span>,\
slhost, <span style="color:maroon;">"slPlugin"</span>,\
{\
    width: <span style="color:maroon;">"100%"</span>, height: <span
style="color:maroon;">"100%"</span>,\
    background: <span
style="color:maroon;">"white"</span>, alt: altHtml,\
    version: <span style="color:maroon;">"4.0.60310.0"</span>\
},\
{ onError: onSLError, onLoad: onSLLoad },\
<span
style="color:maroon;">"param1=value1,param2=value2,param3=varsa[init\
paramlar](http://daron.yondem.com/tr/post/4834596e-b5ec-450f-8e3c-cfba929d958e)
buradan gönderilebilir"</span>, <span
style="color:maroon;">"row3"</span>);

Yukarıdaki kodu ben de Silverlight SDK'in içinden çaldım :) Burada
dikkat edilmesi gereken birkaç nokta var. Birincisi **slhost** adındaki
parametre Silverlight objesinin yerleştirileceği sayfadaki host
elementi. Yani aşağıdaki gibi bir DIV.

**[HTML]**

<span style="color:blue;">\<</span><span
style="color:maroon;">div</span> <span style="color:red;">id</span><span
style="color:blue;">="slhost"\></span>\
<span style="color:blue;">\</</span><span
style="color:maroon;">div</span><span style="color:blue;">\></span>

Böyle bir DIV'i sayfada istediğiniz yere koyarsanız. Bir üstteki
JavaScript kodu çalıştığında SL projeniz bu DIV içerisine
yerleştirilecektir. JavaScript kodundaki parametrelerden biri tabi ki
XAP dosyasının yolu. Onu zaten ayarlarsınız uygun şekilde. Bir diğer
parametre ise bende "**slPlugin**" olarak atanmış olan sayfa içerisinde
SL objenizin adı. Bu isim, SL
objesinin**document.getElementById('slPlugin')** şeklinde ulaşmak
istediğinizde kullanacağınız nesne adını belirliyor. Daha önce de
dediğim gibi JavaScript ile bu SL player'a dosya yolu göndermemiz ve o
dosyayı oynatması için komut vermemiz gerekecek. O nedenle
JavaScript'ten bu SL objesine ulaşabilmemiz çok kritik.

JavaScript kodundaki diğer parametreler sanırım anlaşılır durumdalar.
Yükseklik, genişlik vs açıklamaya gerek yok. Son bir nokta ise **alt**
parametresi ile ilgili. Bu parametreye vereceğiniz HTML eğer ki sistemde
SL Runtime yüklü değil ise yine bizim **slhost** DIV'i içerisine konacak
olan HTML. Örnekteki kodu ben SDK'den aldığımız için standard "Get
Microsoft Silverlight" yazısı gelecektir. İsterseniz JavaScript'teki
HTML'yi değiştirebilirsiniz.

### Silverlight ve JavaScript

Bu konuda özellikle "[Silverlight 2.0 ve JavaScript
Kardeşliği](http://daron.yondem.com/tr/post/a1426eb0-7120-4a66-9d5c-de5027fd59ed)"
makalemi okumanızı tavsiye ederim. Detaylara girmeden ben özellikle bu
projede ne yaptığımdan bahsedeceğim.

Silverlight projesinde ekrana bir MediaElement atıp aşağıdaki şekilde de
ufak bir Play metodu yazıp bunu **ScriptableMember** olarak
tanımlıyoruz.

**[C\#]**

[System.Windows.Browser.<span
style="color:#2b91af;">ScriptableMember</span>()]\
<span style="color:blue;">public</span> <span
style="color:blue;">void</span> Play(<span
style="color:blue;">string</span> URL)\
{\
    myMedia.Source = <span style="color:blue;">new</span> <span
style="color:#2b91af;">Uri</span>(URL, <span
style="color:#2b91af;">UriKind</span>.Absolute);\
    myMedia.Play();\
}

Metod malum URL'i parametre olarak alıp **myMedia**
adındaki**MediaElemente** atıp oynatıyor. Ayrıca App Start'ta tüm SL
projesini aşağıdaki şekilde ScritableObject olarak tanımlayıp adını da
"Page" veriyoruz.

**[C\#]**

<span style="color:blue;">var</span> Root = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">MainPage</span>();\
System.Windows.Browser.<span
style="color:#2b91af;">HtmlPage</span>.RegisterScriptableObject(<span
style="color:#a31515;">"Page"</span>, Root);\
<span style="color:blue;">this</span>.RootVisual = Root;

Son olarak artık JavaScript'ten dosya yolunu verip C\#'daki Play
metodunu çağırabiliyoruz.

**[JavaScript]**

document.getElementById(<span
style="color:maroon;">'slPlugin'</span>).Content.Page.Play(<span
style="color:maroon;">'URLBURADA'</span>);

Gördüğünüz üzere basit bir audio player işi tahmin ettiğinizden daha
karışık hale gelebiliyor. Özetle dikkat etilmesi gereken birkaç nokta
var;

-   MP3 ve OGG tüm tarayıcılar için şart.
-   canPlayType ile codec kontrolü yapılabilir.
-   HTML5 desteği yoksa SL veya Flash player şart.
-   SL dosyasını JavaScript'ten sayfaya alıp kontrol edebiliriz.

Hepinize kolay gelsin! ;)



*Bu yazi http://daron.yondem.com adresinde, 2011-12-30 tarihinde yayinlanmistir.*
