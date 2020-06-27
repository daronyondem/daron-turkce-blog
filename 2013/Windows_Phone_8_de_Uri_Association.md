---
FallbackID: 2857
Title: "Windows Phone 8'de Uri Association"
date: "2013-10-1"
EntryID: Windows_Phone_8_de_Uri_Association
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone, Windows Phone 8
---
Windows Phone için geliştirdiğiniz bir uygulamada işletim sistemi
genelde bir entegrasyon noktası açmak veya belki de yazdığınız birden
çok uygulamanın birbirine referans data gönderebilmesini sağlamak için
kullanabileceğiniz yöntemlerden biri de **UriAssociation** yöntemi. Bu
yöntemde uygulama işletim sistemi genelinde kendi Uri formatını
tanımlıyor ve bu Uri protokolü ile navigasyon gerçekleştiren bir
uygulama olduğunda otomatik olarak sizin uygulamanız açılıyor. Örneğin
YouTube uygulamasının **vnd.youtube** protokolü ile bir navigasyon
yaparsanız eğer cihazda YouTube uygulaması yüklüyse direk o uygulama
açılacaktır. Tabi ki siz de uygulamalarınızda bu tip prokoller
tanımlayabilirsiniz. Eğer bu protokolleri uygulama sitenizde de
yayınlarsanız belki başkaları da kullanarak sizin uygulamanıza referans
veri gönderebilir ve bir anlamda entegre olabilirler.

### Nasıl yaparız?

İlk olarak yeni navigasyon protokolünü yani UriAssociation'ı
tanımlayacak uygulamadan başlayalım. Bu uygulamanın
**WMAppManifest.xml** dosyasını Visual Studio içerisinde "Open With /
XML Editor" diyerek elle açmanız gerekiyor. Sonrasında da dosyanın içine
yine elle aşağıdaki gibi prokol tanımımızı ekleyebiliyoruz.

**[WMAppManifest.xml]**

<span class="XML Delimiter"
style="color: #666666;">          \<</span><span class="XML Name"
style="color: #666666;">BackBackgroundImageURI</span><span
class="XML Delimiter" style="color: #666666;">\>\</</span><span
class="XML Name"
style="color: #666666;">BackBackgroundImageURI</span><span
class="XML Delimiter" style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">          \<</span><span class="XML Name"
style="color: #666666;">BackTitle</span><span class="XML Delimiter"
style="color: #666666;">\>\</</span><span class="XML Name"
style="color: #666666;">BackTitle</span><span class="XML Delimiter"
style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">          \<</span><span class="XML Name"
style="color: #666666;">DeviceLockImageURI</span><span
class="XML Delimiter" style="color: #666666;">\>\</</span><span
class="XML Name" style="color: #666666;">DeviceLockImageURI</span><span
class="XML Delimiter" style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">          \<</span><span class="XML Name"
style="color: #666666;">HasLarge</span><span class="XML Delimiter"
style="color: #666666;">\>\</</span><span class="XML Name"
style="color: #666666;">HasLarge</span><span class="XML Delimiter"
style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">        \</</span><span class="XML Name"
style="color: #666666;">TemplateFlip</span><span class="XML Delimiter"
style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">      \</</span><span class="XML Name"
style="color: #666666;">PrimaryToken</span><span class="XML Delimiter"
style="color: #666666;">\></span>\
 <span class="XML Delimiter" style="color: #666666;">    \</</span><span
class="XML Name" style="color: #666666;">Tokens</span><span
class="XML Delimiter" style="color:blue;">\></span>\
 <span class="XML Delimiter" style="color:blue;">    \<</span><span
class="XML Name" style="color:#a31515;">Extensions</span><span
class="XML Delimiter" style="color:blue;">\></span>\
 <span class="XML Delimiter" style="color:blue;">      \<</span><span
class="XML Name" style="color:#a31515;">Protocol</span><span
class="XML Delimiter" style="color:blue;"> </span><span
class="XML Attribute" style="color:red;">Name</span><span
class="XML Delimiter" style="color:blue;">=</span><span
class="XML Attribute Quotes">"</span><span class="XML Attribute Value"
style="color:blue;">ozelprotokol</span><span
class="XML Attribute Quotes">"</span><span class="XML Delimiter"
style="color:blue;"> </span><span class="XML Attribute"
style="color:red;">TaskID</span><span class="XML Delimiter"
style="color:blue;">=</span><span
class="XML Attribute Quotes">"</span><span class="XML Attribute Value"
style="color:blue;">\_default</span><span
class="XML Attribute Quotes">"</span>\
 <span class="XML Delimiter" style="color:blue;">      </span><span
class="XML Attribute" style="color:red;">NavUriFragment</span><span
class="XML Delimiter" style="color:blue;">=</span><span
class="XML Attribute Quotes">"</span><span class="XML Attribute Value"
style="color:blue;">Uri=%s</span><span
class="XML Attribute Quotes">"</span><span class="XML Delimiter"
style="color:blue;"> /\></span>\
 <span class="XML Delimiter" style="color:blue;">    \</</span><span
class="XML Name" style="color:#a31515;">Extensions</span><span
class="XML Delimiter" style="color:blue;">\></span>\
 <span class="XML Delimiter" style="color: #666666;">    \<</span><span
class="XML Name" style="color: #666666;">ScreenResolutions</span><span
class="XML Delimiter" style="color: #666666;">\></span>\
 <span class="XML Delimiter"
style="color: #666666;">      \<</span><span class="XML Name"
style="color: #666666;">ScreenResolution</span><span
class="XML Delimiter" style="color: #666666;"> </span><span
class="XML Attribute" style="color: #666666;">Name</span><span
class="XML Delimiter" style="color: #666666;">=</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Attribute Value"
style="color: #666666;">ID\_RESOLUTION\_WVGA</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Delimiter" style="color: #666666;">/\></span>\
 <span class="XML Delimiter"
style="color: #666666;">      \<</span><span class="XML Name"
style="color: #666666;">ScreenResolution</span><span
class="XML Delimiter" style="color: #666666;"> </span><span
class="XML Attribute" style="color: #666666;">Name</span><span
class="XML Delimiter" style="color: #666666;">=</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Attribute Value"
style="color: #666666;">ID\_RESOLUTION\_WXGA</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Delimiter" style="color: #666666;">/\></span>\
 <span class="XML Delimiter"
style="color: #666666;">      \<</span><span class="XML Name"
style="color: #666666;">ScreenResolution</span><span
class="XML Delimiter" style="color: #666666;"> </span><span
class="XML Attribute" style="color: #666666;">Name</span><span
class="XML Delimiter" style="color: #666666;">=</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Attribute Value"
style="color: #666666;">ID\_RESOLUTION\_HD720P</span><span
class="XML Attribute Quotes" style="color: #666666">"</span><span
class="XML Delimiter" style="color: #666666;">/\></span>\
 <span class="XML Delimiter" style="color: #666666;">    \</</span><span
class="XML Name" style="color: #666666;">ScreenResolutions</span><span
class="XML Delimiter" style="color:blue;">\></span>

Yukarıda XML dosyasının sadece bir kısmını paylaştım zaten renkli kısım
da tam olarak eklenmesi gereken kısım. Burada Name olarak istediğinizi
yazabilirsiniz, tabi özel karakterler kullanmak yok çünkü buradaki isim
protokol ismi olarak da Uri de kullanılacak olan isim. TaskId'yi aynen
bırakıyoruz. NavUriFragment ise yine aynen kalabilir, değiştirmenin pek
bir anlamı yok. NaviUriFragment'ın sonuna hedef uygulamaya
yönlendirilmek istenen pathUri eklenecek. Birazdan ona da bakacağız.

Giriş aşamasında ayarlarımız bu kadar. Şu anda yeni bir protokol
yarattık ve ona sahip çıktık. Sıra geldi bu protokol ile bir Uri
açıldığında bunu algılamak ve gerekli aksyonu alabilmek. Bizim
örneğimizde yukarıda yaptığımız ayarlar çerçevesinde aşağıdaki gibi bir
Uri kullanılarak uygulamamız açılabilir.

<span class="string"
style="color:#a31515;">ozelprotokol:MainPage?ID=1</span>

Görüldüğü üzere protokol adı en başta bulunuyor. Sonraki kısım ise
NaviUriFragment'taki Uri parametresi olarak gelecek. Genelde bu kısımda
bir operasyon adı ve birkaç tane de parametre gönderilir. Biz
örneğimizde operasyon adı olarak "MainPage", parametre olarak da bir ID
göndereceğiz. Operasyon adı olarak MainPage saçma gelebilir ki zaten
saçma :) Genelde operasyon adı hedef uygulama içindeki mantıklı
birşeylere yönlendirilir. Ben işin bu kısmı ile uğraşmamak ve sadece
örneği çalıştırmak adına operasyon adının hedef uygulamadaki bir Page'in
adı ile aynı tuttum :) Birazdan neden böyle yaptığımı daha net
göreceğiz.

Şimdi, konumuza dönersek, diyelim ki yukarıdaki gibi bir Uri bize geldi.
Bunu yakalamamız, çözmemiz ve uygulamamız içerisinde uygun sayfalara
yönlendirmemiz gerekecek. Bunun için bir **UriMapper** yazarak
RootNavigasyon'a ekleyeceğiz.

**[OzelUriMapper.cs]**

    <span class="keyword" style="color:blue;">class</span> <span
class="User Types" style="color:#2b91af;">OzelUriMapper</span> : <span
class="User Types" style="color:#2b91af;">UriMapperBase</span>\
     {\
         <span class="keyword" style="color:blue;">public</span> <span
class="keyword" style="color:blue;">override</span> <span
class="User Types" style="color:#2b91af;">Uri</span> <span
class="identifier">MapUri</span>(<span class="User Types"
style="color:#2b91af;">Uri</span> <span class="identifier">uri</span>)\
         {\
             <span class="keyword" style="color:blue;">var</span> <span
class="identifier">tempUri</span> <span class="operator">=</span> <span
class="identifier">uri</span><span class="operator">.</span><span
class="identifier">ToString</span>();\
\
             <span class="keyword" style="color:blue;">if</span> (<span
class="identifier">tempUri</span><span class="operator">.</span><span
class="identifier">Contains</span>(<span class="string"
style="color:#a31515;">"/Protocol"</span>))\
             {\
                 <span class="comment"
style="color:green;">//Eğer Protokol ile gelmişse decode edelim.</span>\
                 <span class="identifier">tempUri</span> <span
class="operator">=</span> <span class="identifier">System</span><span
class="operator">.</span><span class="identifier">Net</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">HttpUtility</span><span
class="operator">.</span><span class="identifier">UrlDecode</span>(<span
class="identifier">tempUri</span>);\
\
                 <span class="comment"
style="color:green;">//Uri var mı kontrol edelim.</span>\
                 <span class="keyword"
style="color:blue;">if</span> (<span
class="identifier">tempUri</span><span class="operator">.</span><span
class="identifier">Contains</span>(<span class="string"
style="color:#a31515;">"Uri"</span>))\
                 {\
                     <span class="comment" style="color:green;">//Burada
ReWrite kararlarını vermemiz gerek.</span>\
\
                     <span class="comment"
style="color:green;">//ReWrite ettiğimiz yeni Uri ile Redirection yapıyoruz.</span>\
                     <span class="keyword"
style="color:blue;">return</span> <span class="keyword"
style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">Uri</span>(<span
class="identifier">yeni</span>, <span class="User Types(Enums)"
style="color:#2b91af;">UriKind</span><span
class="operator">.</span><span class="identifier">Relative</span>);\
                 }\
             }\
             <span class="keyword"
style="color:blue;">return</span> <span class="identifier">uri</span>;\
         }\
     }

Yukarıda UriMapperBase'den gelen yeni bir UriMapper görebilirsiniz.
UriMapper'a direk uygulamaya gelen tüm Uri'ler gelecek, hatta zaten bu
Mapper'ı doğrudan uygulamanın RootFrame'ine ekleyeceğiz. O nedenle
aslında uygulama içerisindeki tüm navigasyonlar zaten buradan geçecek.
Mapping esnasında yaptığımız ilk kontrol gelen Uri'nin bizim protokol
ile gelip gelmediğini kontrol etmek. Eğer durum öyle ise parametresinde
bulunan veriyi Decode etmemiz gerekiyor.

![Protok üzerinden gelen Uri bilgisi bu
şekilde.](media/Windows_Phone_8_de_Uri_Association/uriassociation_1.png)\
*Protok üzerinden gelen Uri bilgisi bu şekilde.*

Decoding sonrası da tam da elimize bizim istediğimiz ve en üstte
bahsettiğimiz Uri geçmiş olacak. O noktadan sonra da protokolün
çeşidine, operasyon adına ve geri kalan parametrelere bakarak farklı
kararlar verebiliriz.

**[OzelUriMapper.cs]**

<span style="color: #666666">    </span><span class="keyword"
style="color:#666666;">class</span> <span class="User Types"
style="color:#666666;">OzelUriMapper</span><span
style="color: #666666"> : </span><span class="User Types"
style="color:#666666;">UriMapperBase</span>\
 <span style="color: #666666">    {\
         </span><span class="keyword"
style="color:#666666;">public</span> <span class="keyword"
style="color:#666666;">override</span> <span class="User Types"
style="color:#666666;">Uri</span> <span class="identifier"
style="color: #666666">MapUri</span>(<span class="User Types"
style="color:#666666;">Uri</span> <span style="color: #666666"><span
class="identifier">uri</span>)\
         {\
             </span><span class="keyword"
style="color:#666666;">var</span> <span style="color: #666666"><span
class="identifier">tempUri</span> <span class="operator">=</span> <span
class="identifier">uri</span><span class="operator">.</span><span
class="identifier">ToString</span>();\
\
             </span><span class="keyword"
style="color:#666666;">if</span><span style="color: #666666"> (<span
class="identifier">tempUri</span><span class="operator">.</span><span
class="identifier">Contains</span></span>(<span class="string"
style="color:#666666;">"/Protocol"</span><span
style="color: #666666">))\
             {\
                 </span><span class="comment"
style="color:#666666;">//Eğer Protokol ile gelmişse decode edelim.</span>\
 <span style="color: #666666">                <span
class="identifier">tempUri</span> <span class="operator">=</span> <span
class="identifier">System</span><span class="operator">.</span><span
class="identifier">Net</span><span class="operator">.</span></span><span
class="User Types" style="color:#666666;">HttpUtility</span><span
style="color: #666666"><span class="operator">.</span><span
class="identifier">UrlDecode</span>(<span
class="identifier">tempUri</span>);\
\
                 </span><span class="comment"
style="color:#666666;">//Uri var mı kontrol edelim.</span>\
 <span style="color: #666666">                </span><span
class="keyword" style="color:#666666;">if</span><span
style="color: #666666"> (<span class="identifier">tempUri</span><span
class="operator">.</span><span
class="identifier">Contains</span></span>(<span class="string"
style="color:#666666;">"Uri"</span><span style="color: #666666">))\
                 {</span>\
                     <span class="keyword"
style="color:blue;">string</span> <span
class="identifier">operasyon</span> <span
class="operator">=</span> <span class="string"
style="color:#a31515;">""</span>;\
                     <span class="keyword"
style="color:blue;">string</span> <span
class="identifier">Id</span> <span class="operator">=</span> <span
class="string" style="color:#a31515;">""</span>;\
\
                     <span class="comment"
style="color:green;">// Uri'de protokol şablonu var mı?</span>\
                     <span class="keyword"
style="color:blue;">string</span> <span
class="identifier">ProtocolSablonu</span> <span
class="operator">=</span> <span class="string"
style="color:#a31515;">"/Protocol?Uri="</span>;\
\
                     <span class="comment"
style="color:green;">//Operasyonlar doğrudan farklı sayfalara maplenebilir.</span>\
                     <span class="keyword"
style="color:blue;">int</span> <span
class="identifier">operasyonAdUzunlugu</span> <span
class="operator">=</span> <span class="identifier">tempUri</span><span
class="operator">.</span><span class="identifier">IndexOf</span>(<span
class="string" style="color:#a31515;">"?"</span>, <span
class="identifier">ProtocolSablonu</span><span
class="operator">.</span><span class="identifier">Length</span>);\
                     <span class="keyword"
style="color:blue;">int</span> <span
class="identifier">IdUzunlugu</span> <span
class="operator">=</span> <span class="identifier">tempUri</span><span
class="operator">.</span><span class="identifier">IndexOf</span>(<span
class="string" style="color:#a31515;">"="</span>, <span
class="identifier">operasyonAdUzunlugu</span> <span
class="operator">+</span> <span class="number">1</span>);\
\
                     <span class="identifier">operasyon</span> <span
class="operator">=</span> <span class="identifier">tempUri</span><span
class="operator">.</span><span class="identifier">Substring</span>(<span
class="identifier">ProtocolSablonu</span><span
class="operator">.</span><span class="identifier">Length</span>, <span
class="identifier">operasyonAdUzunlugu</span> \
<span class="operator">                        -</span> <span
class="identifier">ProtocolSablonu</span><span
class="operator">.</span><span class="identifier">Length</span>);\
                     <span class="comment"
style="color:green;">//ID o sayfaya gönderilebilecek bir başka parametre. Bunun gibi farklı\
                     parametreler eklenebilir.</span>\
                     <span class="identifier">Id</span> <span
class="operator">=</span> <span class="identifier">tempUri</span><span
class="operator">.</span><span class="identifier">Substring</span>(<span
class="identifier">IdUzunlugu</span> <span
class="operator">+</span> <span class="number">1</span>);\
\
                     <span class="keyword"
style="color:blue;">string</span> <span
class="identifier">yeni</span> <span class="operator">=</span> <span
class="User Types" style="color:#2b91af;">String</span><span
class="operator">.</span><span class="identifier">Format</span>(<span
class="string" style="color:#a31515;">"/{0}.xaml?ID={1}"</span>, <span
class="identifier">operasyon</span>, <span
class="identifier">Id</span>);\
\
 <span style="color: #666666">                    </span><span
class="comment"
style="color:#666666;">//ReWrite ettiğimiz yeni Uri ile Redirection yapıyoruz.</span>\
 <span style="color: #666666">                    </span><span
class="keyword" style="color:#666666;">return</span> <span
class="keyword" style="color:#666666;">new</span> <span
class="User Types" style="color:#666666;">Uri</span>(<span
class="identifier" style="color: #666666">yeni</span><span
style="color: #666666">, </span><span class="User Types(Enums)"
style="color:#666666;">UriKind</span><span style="color: #666666"><span
class="operator">.</span><span class="identifier">Relative</span>);\
                 }\
             }\
             </span><span class="keyword"
style="color:#666666;">return</span> <span style="color: #666666"><span
class="identifier">uri</span>;\
         }\
     }</span>

Yukarıdaki kodun içine gerekli olan parsing işlemlerini de ekleyince
aslında istediğimiz tüm bilgileri almış oluyoruz. Elimizde operasyonun
adı var, parametrenin adı ve değeri de var. Ben basit bir şekilde
operasyon adını uygulamadaki sayfa adına map ediyoruz ve gelen Id
parametresini de o sayfaya ID parametresi olarak gönderiyorum. Sanırım
operasyon adını neden sayfa adı olarak kullandığımızı anlamışsınızdır :)
Tembellikten. Siz böyle yapmayın :)

ReWrite işlemi sonrası her zamanki gibi herhangi bir sayfa
OnNavigateTo'da bu bilgileri yakalayabilir.

**[MainPage.xaml]**

        <span class="keyword" style="color:blue;">protected</span> <span
class="keyword" style="color:blue;">override</span> <span
class="keyword" style="color:blue;">void</span> <span
class="identifier">OnNavigatedTo</span>(<span class="User Types"
style="color:#2b91af;">NavigationEventArgs</span> <span
class="identifier">e</span>)\
         {\
             <span class="keyword" style="color:blue;">try</span>\
             {\
                 <span class="User Types"
style="color:#2b91af;">MessageBox</span><span
class="operator">.</span><span class="identifier">Show</span>(<span
class="identifier">NavigationContext</span><span
class="operator">.</span><span
class="identifier">QueryString</span>[<span class="string"
style="color:#a31515;">"ID"</span>]);\
             }\
             <span class="keyword"
style="color:blue;">catch</span> (<span class="User Types"
style="color:#2b91af;">Exception</span>)\
             {\
             }\
             \
             <span class="keyword" style="color:blue;">base</span><span
class="operator">.</span><span
class="identifier">OnNavigatedTo</span>(<span
class="identifier">e</span>);\
         }

Yine diyorum, ben uygulama ilk açılırken çatlamasın diye hatayı yuttum
yukarıda, siz yapmayın :) Makalelerde kullandığım örneklerde anlatılan
konu dışındaki implementasyonları örnek almayın lütfen. Maksat konuyu
anlatmak :)

Son olarak yapmamız gereken birşey daha var. Tüm bu UriReWrite
olaylarının çalışması için hazırladığımız Mapper'ı RootFrame'e atamamız
gerek.

**[App.xaml.cs]**

<span style="color: #666666">        </span><span class="comment"
style="color: #666666;">// Do not add any additional code to this method</span>\
 <span style="color: #666666">        </span><span class="keyword"
style="color: #666666;">private</span> <span class="keyword"
style="color: #666666;">void</span> <span class="identifier"
style="color: #666666">InitializePhoneApplication</span><span
style="color: #666666">()\
         {\
             </span><span class="keyword"
style="color: #666666;">if</span><span style="color: #666666"> (<span
class="identifier">phoneApplicationInitialized</span>)\
                 </span><span class="keyword"
style="color: #666666;">return</span>;<span style="color: #666666">\
\
             </span><span class="comment"
style="color: #666666;">// Create the frame but don't set it as RootVisual yet; this allows the splash</span>\
 <span style="color: #666666">            </span><span class="comment"
style="color: #666666;">// screen to remain active until the application is ready to render.</span>\
 <span style="color: #666666">            <span
class="identifier">RootFrame</span> <span
class="operator">=</span></span> <span class="keyword"
style="color: #666666;">new</span> <span class="User Types"
style="color: #666666;">PhoneApplicationFrame</span><span
style="color: #666666">();\
             <span class="identifier">RootFrame</span><span
class="operator">.</span><span class="identifier">Navigated</span> <span
class="operator">+=</span> <span
class="identifier">CompleteInitializePhoneApplication</span>;\
\
             </span><span class="comment"
style="color: #666666;">// Handle navigation failures</span>\
 <span style="color: #666666">            <span
class="identifier">RootFrame</span><span class="operator">.</span><span
class="identifier">NavigationFailed</span> <span
class="operator">+=</span> <span
class="identifier">RootFrame\_NavigationFailed</span>;\
\
             </span><span class="comment"
style="color: #666666;">// Handle reset requests for clearing the backstack</span>\
 <span style="color: #666666">            <span
class="identifier">RootFrame</span><span class="operator">.</span><span
class="identifier">Navigated</span> <span
class="operator">+=</span> <span
class="identifier">CheckForResetNavigation</span></span>;\
             <span class="identifier">RootFrame</span><span
class="operator">.</span><span class="identifier">UriMapper</span> <span
class="operator">=</span> <span class="keyword"
style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">OzelUriMapper</span>();\
 <span style="color: #666666">            </span><span class="comment"
style="color: #666666;">// Ensure we don't initialize again</span>\
 <span style="color: #666666">            <span
class="identifier">phoneApplicationInitialized</span> <span
class="operator">=</span></span> <span class="keyword"
style="color: #666666;">true</span>;\
 <span style="color: #666666">        }</span>

Hemen uygulamanın App.xaml.cs dosyasını açarak yukarıdaki
OzelUriMapper'lı satırı ekleyin ve işimiz bitsin :) Şimdi istediğiniz
bir uygulamadan aşağıdaki şekilde navigasyonlar verip direk bu
uygulamanın çalışmasını sağlayabilirsiniz.

**[Başka uygulama, button\_click]**

        <span class="keyword" style="color:blue;">private</span> <span
class="keyword" style="color:blue;">async</span> <span class="keyword"
style="color:blue;">void</span> <span
class="identifier">Button\_Click</span>(<span class="keyword"
style="color:blue;">object</span> <span
class="identifier">sender</span>, <span class="User Types"
style="color:#2b91af;">RoutedEventArgs</span> <span
class="identifier">e</span>)\
         {\
             <span class="comment"
style="color:green;">//Başka bir uygulamayı özel olarak tanımlı bir protokol üzerinden başlatıyoruz.</span>\
             <span class="keyword"
style="color:blue;">await</span> <span
class="identifier">Windows</span><span class="operator">.</span><span
class="identifier">System</span><span class="operator">.</span><span
class="User Types" style="color:#2b91af;">Launcher</span><span
class="operator">.</span><span
class="identifier">LaunchUriAsync</span>(<span class="keyword"
style="color:blue;">new</span> <span
class="identifier">System</span><span class="operator">.</span><span
class="User Types" style="color:#2b91af;">Uri</span>(<span
class="string"
style="color:#a31515;">"ozelprotokol:MainPage?ID=1"</span>));\
         }

Bunu sadece siz değil herkes yapabilir. Eğer aynı telefonda aynı
protokolü kullanan birden çok uygulama varsa bu sefer işletim sistemi
hedef uygulama seçtirmek için bir liste gösterecektir. Daha da güzeli
eğer bu şekilde bir link kullanılır ve linki kullanabilen bir uygulama
telefonda yoksa WP otomatik olarak marketplace'den bu protoklü açabilen
uygulamaları da listeleyip kullanıcıya tavsiye edebiliyor. Tabi ki o
listede sizin uygulamanız da yer alacak. Hem de bunlar için ek hiçbirşey
yapmanıza gerek yok.

### Dikkat edilmesi gerekenler!

İlk dikkat edilmesi gereken nokta zaten işletim sistemi tarafından
kullanılan protokolleri kullanmamak. Bunların bir listesini
[MSDN'de](http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj207065(v%3Dvs.105).aspx#BKMK_Reservedprotocolnames)
bulabilirsiniz. Ek olarak bir de Nokia'nın ve marketplace'deki bazı
popüler uygulamaların kullandıkları protkoller var. Bu protokollerin bir
kısmının listesine de
[Nokia'nın](http://developer.nokia.com/Community/Wiki/URI_Association_Schemes_List)
sitesinden ulaşabilirsiniz. Bu protokolleri siz de kullanabilirsiniz.
Hem bu protokolleri kaynak olabilir hem de bu protokolleri hedef olarak
kullanabilirsiniz. Son olarak bu özel protokolleri NFC üzerinden
taranarak alınmış, mail içerisinde gönderilmiş, bir web sitesindeki HTML
linke tıklanarak edinilmiş, web redirectionla yönlendirilmiş de
olabilir. Hepsi de çalışacaktır.

Makaledeki örneği iki Windows Phone uygulaması olarak çalışır şekilde
indirmek isterseniz örnekler GitHub'da!

<https://github.com/daronyondem/WPMakaleOrnekleri/tree/master/uri_association>

Görüşmek üzere!


