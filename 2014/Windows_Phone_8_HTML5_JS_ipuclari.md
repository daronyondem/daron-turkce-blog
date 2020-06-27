---
FallbackID: 2885
Title: "Windows Phone 8 için HTML5-JS ile uygulama geliştirenlere ipuçları"
date: "2014-2-26"
EntryID: Windows_Phone_8_HTML5_JS_ipuclari
IsActive: True
Section: software
MinutesSpent: 0
Tags: HTML5, JavaScript, Windows Phone 8
---
Windows Phone 8'de HTML/JS uygulamalar Windows 8'de olduğu gibi native
olmaktan çok uzak. Fakat hala çoğu developer ve firma mobile
uygulamalarında HTML5 kullanma konusunda ısrarlılar :) Sanırım bu son
cümlemden de pek HTML5/JS fanatiği olmadığımı belli etmişimdir. Aslına
bakarsanız bu konuda antipatim sadece mobil uygulamalarla sınırlı, yoksa
HTML/JS ile alıp veremediğim bir şey yok. Neyse, konuyu uzatmayayım ve
esasn olaya geçelim. Bu yazıda Windows Phone 8 için HTML/JS ile uygulama
yazmaya karar verirseniz kullanabileceğiniz bazı ipuçları ve
taktiklerden bahsetmek istiyorum.

![Windows Phone 8 için HTML 5 Projesi
oluştururken.](media/Windows_Phone_8_HTML5_JS_ipuclari/html5.jpg)\
*Windows Phone 8 için HTML 5 Projesi oluştururken.*

Öncesinde çok kısa olarak bu HTML5 hikayesi tam olarak nasıl
gerçekleşiyor Windows Phone 8'de konusunu aydınlatalım. Daha önce de
dediğim gibi Windows 8'deki gibi doğrudan WinRT Projeksiyonu yok. Yani
aslında yazdığınız JavaScript tarayıcı içerisinde çalışıyor, HTML de
aynı şekilde. C\# veya VB ile yazılabilen Native bir uygulamanın içine
WebBrowser kontrolü konularak, içine de uygulamanın içine gömülmüş HTML
içeriği kondurularak olay tamamlanıyor :) Tekrar etmek gerekirse,
içerisinde WebBrowser olan bir native app'den farklı bir şeyden
bahsetmiyoruz. Yukarıdaki gibi HTML5 seçeneğini seçmeniz de aslında size
sadece içinde hazır olarak WebBrowser kontrolü konmuş bir uygulama
getirecek. Şimdiden uyariyim, bu konu Windows Phone 8.1'de inanılmaz
değişecek. Demedi demeyin :) Tabi "değişecek" derken HTML5/JS
desteğinden bahsediyorum yoksa yukarıdaki şekilde yazacağınız bir
uygulamanın WP8.1'de çalışması ile ilgili bir sıkıntı olmayacak
kesinlikle.

### .NET kodundan JavaScript'e ulaşmak.

İlk yapmak isteyecebileceğiniz şeylerden biri .NET kodundan yani
arkadaki native taraftaki C\# veya VB'den tarayıcı içerisinde çalışan
HTML/JS'ye ulaşmaya çalışmak olabilir. Boş bir HTML5 App yarattıktan
sonra ben hemen HTML kısmına örnek bir JavaScript metodu koydum test
için.

**[HTML/JS]**

<span style="color:blue;">\<</span><span
style="color:maroon;">script</span> <span
style="color:red;">type</span><span style="color:blue;">=</span><span
style="color:blue;">"text/javascript"</span><span
style="color:blue;">\></span>\
    <span style="color:blue;">function</span> selamlar(param)\
    {\
        alert(param);\
    }\
<span style="color:blue;">\</</span><span
style="color:maroon;">script</span><span style="color:blue;">\></span>

Yukarıdaki metodu WebBrowser içerisinde açılacak HTML'in içine koydum.
Basit bir şekilde gönderdiğimiz metni bir MessageBox ile gösterecek. Bir
sonraki adımda amacımız arkadaki C\# kodundan buraya parametre gönderip
"selamlar" adındaki JavaScript kodunu çalıştırmak. Bunu test edebilmek
için de uygulamaya yeni bir AppBarButton ekleyelim.

**[XAML]**

<span style="color: #999999">    </span><span
style="color:#999999;">\<phone:PhoneApplicationPage.ApplicationBar\></span>\
 <span style="color: #999999">        </span><span
style="color:#999999;">\<shell:ApplicationBar IsVisible="True" IsMenuEnabled="True" Mode="Minimized"\></span>\
 <span style="color: #999999">            </span><span
style="color:#999999;">\<shell:ApplicationBarIconButton IconUri="/Assets/AppBar/appbar.back.rest.png" IsEnabled="True"</span><span
style="color:red;"> </span>\
 <span style="color:red;"><span style="color:#999999;">               
Text</span></span><span
style="color:#999999;">="back" Click="BackApplicationBar\_Click"/\></span>\
 <span style="color: #999999">            </span><span
style="color:#999999;">\<shell:ApplicationBarIconButton IconUri="/Assets/AppBar/appbar.next.rest.png" IsEnabled="True"</span><span
style="color:red;"> </span>\
 <span style="color:red;"><span style="color:#999999;">               
Text</span></span><span
style="color:#999999;">="forward" Click="ForwardApplicationBar\_Click"/\></span>\
 <span style="color: #999999">            </span><span
style="color:#999999;">\<shell:ApplicationBar.MenuItems\></span>\
 <span style="color: #999999">                </span><span
style="color:#999999;">\<shell:ApplicationBarMenuItem Text="home" Click="HomeMenuItem\_Click" /\></span>\
                 <span style="color:blue;">\<</span><span
style="color:#a31515;">shell</span><span
style="color:blue;">:</span><span
style="color:#a31515;">ApplicationBarMenuItem</span><span
style="color:red;"> Text</span><span
style="color:blue;">="JS Çalıştır"</span><span
style="color:red;"> Click</span><span
style="color:blue;">="ApplicationBarMenuItem\_Click" /\></span>\
 <span style="color: #999999">            </span><span
style="color:#999999;">\</shell:ApplicationBar.MenuItems\></span>\
 <span style="color: #999999">        </span><span
style="color:#999999;">\</shell:ApplicationBar\></span>\
 <span style="color: #999999">    </span><span
style="color:#999999;">\</phone:PhoneApplicationPage.ApplicationBar</span><span
style="color:blue;">\></span>

"JS Çalıştır" adındaki düğmenin arkasına da esas işi yapacak kodu
yazıyoruz.

**[C\#]**

<span style="color:blue;">private</span> <span
style="color:blue;">void</span> ApplicationBarMenuItem\_Click(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">EventArgs</span> e)\
 {\
     Browser.InvokeScript(<span
style="color:#a31515;">"selamlar"</span>, <span
style="color:#a31515;">"yeni bir selam"</span>);\
 }

Örneğimizdeki WebBrowser nesnesinin instance adı "Browser" şeklindeydi.
Hemen onun üzerinden "**InvokeScript**" diyerek çalıştıracağımız metodun
adını ve parametresini veriyoruz. Bu noktada sadece sizin tanımladığımız
JavaScript metodlarını değil JavaScript contextindeki her şeyi
çalıştırabilirsiniz. Örneğin "InvokeScript"'in ilk parametresini
"**eval**" derseniz ikinci parametreye string olarak vereceğiniz
JavaScript kodu doğrudan çalıştırılacaktır. Bu hali ile aslında klasik
JavaScript'teki "eval" komutunu çalıştırmış oluyoruz.

### JavaScript'ten .NET'e ulaşmak

Tahmin ettiğiniz üzere bu sefer de amacımız tam ters yönde ilerlemek.
Yani JavaScript kodundan arkadaki CS/VB koduna ulaşmak. Buradaki
metodumuz bir önceki gibi generic olmayacak. WebBrowser kontrolünün
ScriptNotify özelliğini kullanacağız. Gelin adım adım ilerleyelim. İlk
olarak HTML kodumuzun içerisinde durumu test edebilmek adına bir düğme
ve JavaScript kodu yerleştirelim.

**HTML/JS**

<span style="color:#999999;">\<html\></span>\
<span style="color: #999999">    </span><span
style="color:#999999;">\<head\></span>\
<span style="color: #999999">        </span><span
style="color:#999999;">\<meta</span> <span
style="color:#999999;">http-equiv="Content-Type"</span> <span
style="color:#999999;">content="text/html; charset=UTF-8"</span> <span
style="color:#999999;">/\></span>\
<span style="color: #999999">        </span><span
style="color:#999999;">\<link</span> <span
style="color:#999999;">rel="stylesheet"</span> <span
style="color:#999999;">type="text/css"</span> <span
style="color:#999999;">href="/html/css/phone.css"</span> <span
style="color:#999999;">/\></span>\
 <span style="color: #999999">        </span><span
style="color:#999999;">\<title\></span><span
style="color: #999999">Windows Phone</span><span
style="color:#999999;">\</title</span><span
style="color:blue;">\></span>\
        <span style="color:blue;">\<</span><span
style="color:maroon;">script</span> <span
style="color:red;">type</span><span style="color:blue;">=</span><span
style="color:blue;">"text/javascript"</span><span
style="color:blue;">\></span>\
            <span style="color:blue;">function</span> CSCagir()\
            {\
                window.external.notify(<span
style="color:#a31515;">"Selam"</span>);\
            }\
        <span style="color:blue;">\</</span><span
style="color:maroon;">script</span><span style="color:blue;">\></span>\
 <span style="color: #999999">    </span><span
style="color:#999999;">\</head\></span>\
<span style="color: #999999">    </span><span
style="color:#999999;">\<body\></span>\
<span style="color: #999999">        </span><span
style="color:#999999;">\<div\></span>\
<span style="color: #999999">            </span><span
style="color:#999999;">\<p\></span><span
style="color: #999999">MY APPLICATION</span><span
style="color:#999999;">\</p\></span>\
<span style="color: #999999">        </span><span
style="color:#999999;">\</div\></span>\
<span style="color: #999999">        </span><span
style="color:#999999;">\<div</span> <span
style="color:#999999;">id="page-title"</span><span
style="color:blue;">\></span>\
            <span style="color:blue;">\<</span><span
style="color:maroon;">p</span><span
style="color:blue;">\></span>page title<span
style="color:blue;">\</</span><span style="color:maroon;">p</span><span
style="color:blue;">\></span>\
            <span style="color:blue;">\<</span><span
style="color:maroon;">input</span> <span
style="color:red;">type</span><span style="color:blue;">=</span><span
style="color:blue;">"button"</span> <span
style="color:red;">onclick</span><span style="color:blue;">=</span><span
style="color:blue;">"</span>CSCagir()<span style="color:blue;">"</span>\
     <span style="color: #999999">   </span><span
style="color:#999999;">\</div\></span>\
 <span style="color: #999999">    </span><span
style="color:#999999;">\</body\></span>\
<span style="color:#999999;">\</html</span><span
style="color:blue;">\></span>

Yukarıdaki kod içerisinde iki önemli nokta var. Bunlardan ilki test için
eklediğimiz en alttaki düğme ve ikincisi de o düğmenin tıklandığında
çağırdığı **CSCagir** metodu. CSCagir'ın içine baktığınızda "notify"
işleminin kullanıldığını göreceksiniz. İşte bu metod bizim arkadaki
CS/VB koduna ulaşabilmemizi sağlayacak. JavaScriptten istediğimiz bir
parametreyi alıp notify ile arkaya atmış oluyoruz. Arkaya atılan bu
verinin yakalanması için WebBrowser kontrolünün **ScriptNotify**
event'inin dinlenmesi gerekiyor.

**[XAML]**

<span style="color:blue;">\<</span><span
style="color:#a31515;">phone</span><span
style="color:blue;">:</span><span
style="color:#a31515;">WebBrowser</span><span
style="color:#999999;"> x:Name="Browser"</span>\
 <span style="color: #999999">                 </span><span
style="color:#999999;"> HorizontalAlignment="Stretch"</span>\
 <span style="color: #999999">                 </span><span
style="color:#999999;"> VerticalAlignment="Stretch"</span>\
 <span style="color: #999999">                 </span><span
style="color:#999999;"> Loaded="Browser\_Loaded"</span>\
 <span style="color: #999999">                 </span><span
style="color:#999999;"> NavigationFailed="Browser\_NavigationFailed"</span>\
                  <span style="color:red;"> ScriptNotify</span><span
style="color:blue;">="Browser\_ScriptNotify"/\></span>

Gerekli event-listener'ı da yukarıdaki gibi ataçladıktan sonra CS/VB
tarafına geçip implementasyonumuzu tamamlayabiliriz.

**[CS]**

<span style="color:blue;">private</span> <span
style="color:blue;">void</span> Browser\_ScriptNotify(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">NotifyEventArgs</span> e)\
 {\
     <span style="color:#2b91af;">MessageBox</span>.Show(e.Value);\
 }

Ben yine örnek olması amacı ile konuyu süper basit tutuyorum. Arka
tarafa gelen değeri **e.value** argümanı üzerinden alabiliyoruz.
Örneğimizde bunu bir **messageBox** ile göstermek test için yeterli
olacaktır.

### Tarayıcı Paylaşımı ve Cache Problemleri

Problemlerin en büyüğü aslında uygulamanızı sistem tarayıcısını
kullanıyor olması ve normal tarayıcı instance'ında yaratılan tüm cookie
ve cache'in sizin uygulamanızın içindeki tarayıcı için de geçerli
olması. Bu bazı durumlarda kullanıcıların aslında uygulamanızın bir web
sitesi olduğunu anlamalarına neden olabilir ve siz de bunu
istemeyebilirsiniz. O nedenle aşağıdaki iki komut ile ortalığı
temizlemek güzel bir fikir olabilir.

**[C\#]**

<span style="color:blue;">await</span> Browser.ClearCookiesAsync();\
 <span
style="color:blue;">await</span> Browser.ClearInternetCacheAsync();

### Highlight olayını kaldırsak?

Bir diğer can sıkıcı nokta da normal native uygulamalarda olmayan fakat
HTML5 uygulamalardan kendini gösteren "Highlight" durumu. Tarayıcı
içerisindeki tüm kontrollerde touch ile interaction oluştuğunda gözüken
gri bir dikdörtgen var. Bu dikdörtgen uygulama içerisindeki HTML içeriği
ele veren tasarım öğelerinden biri oluyor. İşte bundan da kurtulabilmek
için aşağıdaki meta attribute'u kullanabilirsiniz.

[HTML]

<span style="color:#999999;">\<link</span> <span
style="color:#999999;">rel="stylesheet"</span> <span
style="color:#999999;">type="text/css"</span> <span
style="color:#999999;">href="/html/css/phone.css"</span> <span
style="color:#999999;">/\></span>\
 <span style="color:blue;">\<</span><span
style="color:maroon;">meta</span> <span
style="color:red;">name</span><span
style="color:blue;">="msapplication-tap-highlight"</span> <span
style="color:red;">content</span><span
style="color:blue;">="no"</span> <span style="color:blue;">/\></span> \
 <span style="color:#999999;">\<title\></span><span
style="color: #999999">Windows Phone</span><span
style="color:#999999;">\</title</span><span
style="color:blue;">\></span>

Şimdilik benden bu kadar. Sizin de aklınıza gelenler varsa aşağıdaki
yorum olarak paylaşabilirsiniz. Şu an için çoğu JavaScript kütüphanesini
WP için de HTML5 uygulamalarında kullanabilirsiniz. Aynı şekilde çoğu
HTML5 özelliği de mevcut.

Görüşmek üzere.


