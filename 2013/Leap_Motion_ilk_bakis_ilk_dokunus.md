# Leap Motion'a ilk bakış, ilk dokunuş
Kaç ay oldu hatırlamıyorum ama epey zaman oldu [Leap
Motion'ın](https://www.leapmotion.com/) Leap cihazı ile ilgili ilk
videoyu internette izlediğimde "İşte bu!" demiştim. Kinect'in el
hareketleri için daha hassas ve bir o kadar da ufaltılmış hali gibi
gözüküyordu. Her yere gömülebilir minik bir cihaz olarak Leap ile
yapılabilecek şeyler beni ciddi heyecanlandırmıştı ki hızlıca "Early
Adoption" programına başvurdum hatta bir de cihaz ön sipariş ettim. Tüm
bu hikayenin sonunda geçen hafta cihaz elime ulaştı ve tabi ki
deneyimlerimi paylaşma zamanı geldi :)

### Küçük, minik bir şey

Gerçekten de cihaz süper ufak birşey. Çakmak büyüklüğünde desem hiç de
yalan olmaz. Bu boyutu ile her yere konulabilir ve entegre edilebilir.
Üreticilerin cihazın kullanılacağını varsaydıkları konum monitörünüz ile
klavyenizin arasında boşluk. Kaba olarak cihazın üzerinden yukarıya
doğru ters bir piramit hayal edin, işte tam o alanı tarıyor cihaz.
20cm'den başlıyor tarama mesafesi ve 65cm'ye kadar hareketleri
yakalayabiliyor. Bu özelliği ise zaten Kinect'ten epey bir ayrılıyor
diyebiliriz.

![Ufacık cihazla 10 parmak yakalamak
mümkün.](media/Leap_Motion_ilk_bakis_ilk_dokunus/leap_1.jpg)\
*Ufacık cihazla 10 parmak yakalamak mümkün.*

Cihazı ilk kurduğunuzda sitesinden de yazılımını indirerek kurmanız
gerekiyor. Yazılımı ile beraber kendi marketplace'i de geliyor. AirSpace
adındaki yazılımı kurup ister ücretsiz ister ücretli bir çok Leap uyumlu
uygulamayı indirebiliyorsunuz. Uygulamalar içerisinde her tür içerik
var, oyunlardan tutun Windows 8'in başlat menüsünü Leap ile
kullanılabilir hale getiren eklentilere kadar birçok şey mevcut.

### SDK var mı? SDK?

Olmaz mı? Tabi ki Leap'in kendi developer programı ve SDK'i de var. C\#
için süper dost canlısı olduklarını söylemem ama haksızlık de etmiyim.
Cihazın her özelliğini rahatlıkla kullanabiliyorsunuz. Bir tane minik
sample bile geliyor SDK ile beraber. Ama özellikle Microsoft tarafındaki
developerların MS'ten alışkın oldukları SDK kalitesini beklememeleri
gerekecek. Hem dokümantasyon, hem de örnekler anlamında SDK epey kısıtlı
bir içeriğe sahip. Diğer yandan SDK ile beraber gelen kütüphaneler de
cihazın Firmware'i de daha RTM olmuş değil yani hala geliştiriliyorlar
ve zaten geliştirilmeleri de gerekiyor. Bu konuya sonra tekrar göz
atacağız :)

Leap SDK ile beraber **.NET 3.5 ve 4.0 SDK**'leri geliyor. Bunlardan
uygun DLL'i SDK'den alıp referans olarak örnek bir WPF projesine ekledim
ve neler yapabilirim diye hızlıca bir baktım. Unutmadan, referans
alamayacağınız Native 2 kütüphaneyi de 32-bit veya 64-bit seçeneklerine
göre uygulamanızın klasöründe bulundurmanız şart. Ben
**"LeapCSharp.NET4.0.dll"'**i referans alıp **"Leap.dll"** ve
**"LeapCSharp.dll"** dosyalarını da projeye ekleyip "Copy Always" olarak
ayarladım.

Leap ile çalışırken birkaç konsept var. Bunlardan ilk **Controller**
nesnesi. Bu nesne alıcı cihazı temsil ediyor diyebiliriz. **Listener**
adındaki nesneler de bu cihazlardan veri almamızı sağlıyorlar. Sensörden
aldığımız her veri paketi bir **Frame** olarak kabul ediliyor. Bu
noktada Kinect ile uğraşanlara bu senaryoların çoğu zaten tanıdık
gelecektir. Gelen veride RAW input pointlerin yanı sıra farklı
Gesture'lar da gelebiliyor. Bunlar SDK içerisinde tanımlı ve tek tek
enable edilmesi gerekiyor ki yardımcı kütüphaneler gerekli işleme
süreçlerini arka planda başlatsın. Aslında bir anlamda bizim adımıza
bazı sayılı Gesture'lar için RAW data SDK tarafından bizim adımızda
yazılımsal olarak işlenebiliyor.

**[C\#]**

        <span class="identifier">Leap</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">Controller</span> <span
class="identifier">controller</span>;\
         <span class="User Types"
style="color:#2b91af;">SampleListener</span> <span
class="identifier">listener</span>;\
\
         <span class="keyword" style="color:blue;">void</span> <span
class="identifier">MainWindow\_Loaded</span>(<span class="keyword"
style="color:blue;">object</span> <span
class="identifier">sender</span>, <span class="User Types"
style="color:#2b91af;">RoutedEventArgs</span> <span
class="identifier">e</span>)\
         {\
             <span class="identifier">Leap</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">Controller</span> <span
class="identifier">controller</span> <span
class="operator">=</span> <span class="keyword"
style="color:blue;">new</span> <span class="identifier">Leap</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">Controller</span>();\
             <span class="User Types"
style="color:#2b91af;">SampleListener</span> <span
class="identifier">listener</span> <span class="operator">=</span> <span
class="keyword" style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">SampleListener</span>();\
             <span class="identifier">listener</span><span
class="operator">.</span><span class="identifier">ParmakVar</span> <span
class="operator">+=</span> <span
class="identifier">listener\_ParmakVar</span>;\
             <span class="identifier">controller</span><span
class="operator">.</span><span
class="identifier">AddListener</span>(<span
class="identifier">listener</span>);\
         }

Yukarıdaki kodda hızlı bir şekilde **Controller** ve **Listener**
yaratıyorum. Listener'ın kendi iç yapısına birazdan geleceğiz. Ama
öncesinde buraya bir göz atalım. Controller'a listener vermek dışında
pek de birşey yok aslında elimizde :) Sonrasında Listener'ın bize veri
göndermesini bekliyoruz.

**[C\#]**

        <span class="keyword" style="color:blue;">void</span> <span
class="identifier">MainWindow\_Unloaded</span>(<span class="keyword"
style="color:blue;">object</span> <span
class="identifier">sender</span>, <span class="User Types"
style="color:#2b91af;">RoutedEventArgs</span> <span
class="identifier">e</span>)\
         {\
             <span class="identifier">controller</span><span
class="operator">.</span><span
class="identifier">RemoveListener</span>(<span
class="identifier">listener</span>);\
             <span class="identifier">controller</span><span
class="operator">.</span><span class="identifier">Dispose</span>();\
         }

Önemli noktalardan biri **Controller** ile işiniz bittiğinde Listener'ı
detach'layıp doğal olarak Controller'ı da serbest bırakmak.

**[C\#]**

    <span class="keyword" style="color:blue;">class</span> <span
class="User Types" style="color:#2b91af;">SampleListener</span> : <span
class="User Types" style="color:#2b91af;">Listener</span>\
     {\
         <span class="keyword" style="color:blue;">public</span> <span
class="keyword" style="color:blue;">override</span> <span
class="keyword" style="color:blue;">void</span> <span
class="identifier">OnFrame</span>(<span class="User Types"
style="color:#2b91af;">Controller</span> <span
class="identifier">controller</span>)\
         {\
             <span class="User Types"
style="color:#2b91af;">Frame</span> <span
class="identifier">frame</span> <span class="operator">=</span> <span
class="identifier">controller</span><span class="operator">.</span><span
class="identifier">Frame</span>();\
             \
             <span class="keyword" style="color:blue;">if</span> (<span
class="operator">!</span><span class="identifier">frame</span><span
class="operator">.</span><span class="identifier">Hands</span><span
class="operator">.</span><span class="identifier">Empty</span>)\
             {\
                 <span class="User Types"
style="color:#2b91af;">Hand</span> <span
class="identifier">hand</span> <span class="operator">=</span> <span
class="identifier">frame</span><span class="operator">.</span><span
class="identifier">Hands</span>[<span class="number">0</span>];\
\
                 <span class="User Types"
style="color:#2b91af;">FingerList</span> <span
class="identifier">fingers</span> <span class="operator">=</span> <span
class="identifier">hand</span><span class="operator">.</span><span
class="identifier">Fingers</span>;\
                 <span class="keyword"
style="color:blue;">if</span> (<span class="operator">!</span><span
class="identifier">fingers</span><span class="operator">.</span><span
class="identifier">Empty</span>)\
                 {\
                     <span class="keyword"
style="color:blue;">if</span> (<span
class="identifier">ParmakVar</span> <span
class="operator">!=</span> <span class="keyword"
style="color:blue;">null</span>)\
                     {\
                         <span class="identifier">ParmakVar</span>(<span
class="identifier">fingers</span>);  \
                     }\
                 }\
             }\
         }\
\
         <span class="keyword" style="color:blue;">public</span> <span
class="keyword" style="color:blue;">delegate</span> <span
class="keyword" style="color:blue;">void</span> <span
class="User Types(Delegates)"
style="color:#2b91af;">ParmaklarGelir</span>(<span class="User Types"
style="color:#2b91af;">FingerList</span> <span
class="identifier">parmaklar</span>);\
         <span class="keyword" style="color:blue;">public</span> <span
class="keyword" style="color:blue;">event</span> <span
class="User Types(Delegates)"
style="color:#2b91af;">ParmaklarGelir</span> <span
class="identifier">ParmakVar</span>;\
     }

Gelelim bizim basit Listener'a... Aslında SDK içerisinde çok daha
karmaşık ve neredeyse SDK'in tüm özelliklerini kullanan bir Listener
mevcut ama üzerinden birkaç takla atmak gerekiyor kullanılabilir hale
getirmek için. Ben hazır o taklaları atarken biraz da örneği
basitleştirmek adına ortalığı temizledim. Bizim örneğimizde sadece elin
parmaklarına ihtiyacımız olduğu için eğer bir el varsa ilkini alıp onun
da parmakları yakalanmış ise parmakları alıp bir event ile parmak
listesini dışarı atıyorum. Böylece biraz önce kodumuz bu event'i
dinleyerek Listener'dan istediği temiz veriyi alabilecek.

Ben örnek uygulamamda beş parmağı temsil edecek beş Ellipse kullandım.
Bunlar XAML tarafında tanımlı ve P1, P2 gibi isimlere sahip.

**[C\#]**

        <span class="keyword" style="color:blue;">void</span> <span
class="identifier">listener\_ParmakVar</span>(<span
class="identifier">Leap</span><span class="operator">.</span><span
class="User Types" style="color:#2b91af;">FingerList</span> <span
class="identifier">parmaklar</span>)\
         {\
             <span class="keyword" style="color:blue;">this</span><span
class="operator">.</span><span class="identifier">Dispatcher</span><span
class="operator">.</span><span class="identifier">Invoke</span>((<span
class="User Types(Delegates)"
style="color:#2b91af;">Action</span>)(() <span
class="operator">=\></span>\
             {\
                 <span class="identifier">ParmakPozisyonla</span>(<span
class="identifier">P1</span>, <span
class="identifier">parmaklar</span>[<span class="number">0</span>]<span
class="operator">.</span><span class="identifier">TipPosition</span>);\
                 <span class="identifier">ParmakPozisyonla</span>(<span
class="identifier">P2</span>, <span
class="identifier">parmaklar</span>[<span class="number">1</span>]<span
class="operator">.</span><span class="identifier">TipPosition</span>);\
                 <span class="identifier">ParmakPozisyonla</span>(<span
class="identifier">P3</span>, <span
class="identifier">parmaklar</span>[<span class="number">2</span>]<span
class="operator">.</span><span class="identifier">TipPosition</span>);\
                 <span class="identifier">ParmakPozisyonla</span>(<span
class="identifier">P4</span>, <span
class="identifier">parmaklar</span>[<span class="number">3</span>]<span
class="operator">.</span><span class="identifier">TipPosition</span>);\
                 <span class="identifier">ParmakPozisyonla</span>(<span
class="identifier">P5</span>, <span
class="identifier">parmaklar</span>[<span class="number">4</span>]<span
class="operator">.</span><span class="identifier">TipPosition</span>);\
             })); \
             \
         }\
\
         <span class="keyword" style="color:blue;">void</span> <span
class="identifier">ParmakPozisyonla</span>(<span class="User Types"
style="color:#2b91af;">Ellipse</span> <span
class="identifier">P</span>, <span class="identifier">Leap</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">Vector</span> <span
class="identifier">Pozisyon</span>)\
         {\
             <span class="identifier">P</span><span
class="operator">.</span><span
class="identifier">RenderTransformOrigin</span> <span
class="operator">=</span> <span class="keyword"
style="color:blue;">new</span> <span
class="User Types(Value Types)">Point</span>(<span
class="number">0.5</span>, <span class="number">0.5</span>);\
             <span class="User Types"
style="color:#2b91af;">Canvas</span><span class="operator">.</span><span
class="identifier">SetLeft</span>(<span
class="identifier">P</span>, <span
class="identifier">Pozisyon</span><span class="operator">.</span><span
class="identifier">x</span>);\
             <span class="User Types"
style="color:#2b91af;">Canvas</span><span class="operator">.</span><span
class="identifier">SetTop</span>(<span
class="identifier">P</span>, <span
class="identifier">Pozisyon</span><span class="operator">.</span><span
class="identifier">y</span>);\
             <span class="identifier">P</span><span
class="operator">.</span><span class="identifier">Height</span> <span
class="operator">=</span> <span class="User Types"
style="color:#2b91af;">Math</span><span class="operator">.</span><span
class="identifier">Abs</span>(<span
class="identifier">Pozisyon</span><span class="operator">.</span><span
class="identifier">z</span>);\
             <span class="identifier">P</span><span
class="operator">.</span><span class="identifier">Width</span> <span
class="operator">=</span> <span class="identifier">P</span><span
class="operator">.</span><span class="identifier">Height</span>;\
         }

Listener'ın eventinden gelen veriyi kullanabilmek için Dispatcher ile
UIThread'e çıkmam gerekiyor. Malumunuz UIThread'in sahip olduğu
Ellipse'lerin konumunu vs değiştirmemiz gerekecek gelen veriye göre.
Aslında kodun geri kalanı artık WPF ile alakalı. Nesnelerin merkez
noktasını belirt ve sonra da elindeki Vektör'lerden pozisyonu alıp
nesnelerin yukarıdan ve aşağıdan mesafelerine aktar. Tüm yaptığım bu.
Tabi biraz daha atraksyon olsun diye parmakların Z koordinatını da
Ellipse'lerin büyüklüğüne bağladım. Yani böytece eğer sensör
monitörünüzün önündeyse parmaklar sağa gidince Ellipse'ler sağa, sola
gidince sola giderken parmaklarınız monitöre yaklaşırken Ellipse'ler
büyüyecek, uzaklaşınca da küçülecek.  İşte bu kadar :) Yaptığın bu mini
örneğin kaynak kodlarını indirmek isterseniz
[GitHub'a](https://github.com/daronyondem/leap_testrun) koydum.

### Vaatler güzel de sonuç?

İtiraf etmem lazım ki ne cihaz ne de SDK bende "Production Quality"
hissiyatı yaratmadı. Cihaz dışarıdan epey güzel gözüküyor ama verdiği
datanın kullanılabilir olması için parazitlerin epey bir temizlenmesi
şart. Bunu tabi ki siz de kendiniz kod yazarak yapabilirsiniz ama ben bu
tür cihazların RAW data verirken basit bir Karaköy sensörü olmaktan
öteye geçip biraz daha developer dostu veri sağlaması gerektiğini
düşünüyorum. Bu noktada Leap Motion'ın daha yapması gereken çok şey var.
Şu anda çat diye alıp SDK ile birşeyler çıkartmak pek mümkün değil.
Üzerine uğraşılırsa tabi ki süper şeyler çıkartılabilir. Şu an için
kendi AppStore'larına baktığımda da uygulamalarda aslında bu eksikliği
hissedebiliyorsunuz. Detection Precision'ı epey kötü durumda ama bunun
nedeni sensörden öte yazılım kaynaklı.

Sonuç olarak :) ben Leap Motion özellikle ufaklığı ile çok değerli bir
cihaz çünkü Kinect'in giremediği bir sürü yere girebilir gibi duruyor.
Detaylı detection sistemi de doğal olarak tarama alanının farklılığı
nedeni ile Kinect'ten iyi. Kinect vücut iskeletine odaklanırken Leap
Motion insan eline ve eldeki cihazlara odaklanıyor. Örneğin elinizde
tuttuğunuz bir kalemi de pointer olarak algılabiliyor. Umuyorum ki
zamanla, gerekli yazılım desteğinin de gelişmesi ile süper bir noktaya
gelecektir.

Görüşmek üzere!



*Bu yazi http://daron.yondem.com adresinde, 2013-8-20 tarihinde yayinlanmistir.*
