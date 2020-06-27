---
FallbackID: 2686
Title: "Silverlight'ta Dependency Property'ler"
date: "2011-9-4"
EntryID: Silverlightta_Dependency_Propertyler
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0, Silverlight 3.0, Silverlight 4, Silverlight 5, WPF
---
Bugüne kadar Silverlight ve WPF konusunda birçok seminerde hep
kenarından sıyırdığımız :) ve sürekli olarak "şimdilik oraya girmeyelim"
dediğim yerlerden birine girmeye hazır mısınız? Karşınızda "Dependency
Property"'ler!

Dependancy Property'ler öyle veya böyle SL veya WPF ile ilgilenenler
oradan buradan kesinlikle duydukları şeylerdir. Aslında tüm WPF ve
SL'deki DataBinding'in ayakta kalmasını sağlayan en kritik noktalardan
biridir. Ufak bir ipucu vermek adında MVVM'de ICollectionChanged ve
INotifyPropertyChanged ne yapıyorsa aslında ilk aşamada Dependency
Property'ler de bunu yaparlar. Özünde cevaplamamız gereken soru şu,
bugün bir nesnenizin bir Property'si nesne içinden veya nesne dışından
gelen bir değer ile değiştirildiğinde bu konuda nesnenizin veya nesne
dışı birilerinin haberdar olma şansı var mı? :) Siz bu soruyu düşünür
durun, biz bir yandan DP (Dependency Property) olaylarına girişelim.

**[C\#]**

        <span style="color:blue;">private</span> <span
style="color:blue;">string</span> \_Adi;\
         <span style="color:blue;">public</span> <span
style="color:blue;">string</span> Adi\
         {\
            <span style="color:blue;">get</span> { <span
style="color:blue;">return</span> \_Adi; }\
             <span style="color:blue;">set</span> { \_Adi = <span
style="color:blue;">value</span>; }\
         }

Yukarıda klasik bir Property görüyorsunuz. Aslında eskiden
Property'lerin de olmadığı zamanlarda :) biz bu Property'lerin işini
yapmak için seksen takla atardık. Peki bu Property ne iş yapıyor ki? İlk
olarak private bir Field'imiz var. Yani aslında datayı sakladığımız yer
bize özel bir yer ve dışarıdan kimse ulaşamıyor. Ulaşmak isteyenler veya
yeni değer atamak isteyenler bizim Property üzerinden ilerlemek zorunda
kalıyor. Böylece Set/Get içerisinde biz gerekli kontrol vs
mekanizmalarımızı koyabiliyoruz.

Silverlight ve WPF tarafına geldiğimizde böyle basit bir Property yapısı
tam olarak işimizi görmüyor çünkü animasyonlardan tutun databinding'e
kadar birçok kaynakla bu property değişirken aslında başkalarının da bu
durumdan haberdar olması gerekiyor. Yani biri gelip şimdi dışarıdan
burada Adi Property'sini değiştirse başkalarının haberi olabilir mi? Ha
tabi diyebilirsiniz ki "Set" esnasında dışarı çıkar ve ayrıca yazmış
olduğumuz bir eventi çalıştırırım (Örn:INotifyPropertyChanged). Buraya
kadar kesinlikle haklısınız :) Ama makalenin devamında göreceksiniz ki
DP'lerin ekstra özellikleri de var, tabi şimdilik önce bir bu olayı
halledelim :)

**[C\#]**

        <span style="color:blue;">public</span> <span
style="color:blue;">string</span> Adi\
         {\
            <span style="color:blue;">get</span> { <span
style="color:blue;">return</span> (<span
style="color:blue;">string</span>)GetValue(AdiProperty); }\
             <span
style="color:blue;">set</span> { SetValue(AdiProperty, <span
style="color:blue;">value</span>); }\
         }

İlk Dependency Property'mizi yazmaya başladığımız bu noktada
değiştirdiğimiz tek şey eskiden kullandığımız Private Field değişkeni
oldu. Artık onu kullanmak yerine GetValue ve SetValue adında
static/shared metodlar kullanmaya başladık. Bu metodlar DependencyObject
sınıfının altında Framework'ün içinde. Tam da bu noktada hatırlamak
gerek ki DP yapısı Framework içerisinde gömülü bir yapı ve biz onu
kullanıyor olacağız. Peki bu noktada "**AdiProperty**" dediğimiz şey ne?

**[C\#]**

        <span style="color:blue;">public</span> <span
style="color:blue;">static</span> <span
style="color:blue;">readonly</span> <span
style="color:#2b91af;">DependencyProperty</span> AdiProperty =\
             <span
style="color:#2b91af;">DependencyProperty</span>.Register(\
                <span style="color:#a31515;">"Adi"</span>,\
               <span style="color:blue;">typeof</span>(<span
style="color:blue;">string</span>),\
                <span style="color:blue;">typeof</span>(<span
style="color:#2b91af;">MainPage</span>),\
           <span style="color:blue;">new</span> <span
style="color:#2b91af;">PropertyMetadata</span>(<span
style="color:blue;">new</span> <span
style="color:#2b91af;">PropertyChangedCallback</span>(<span
style="color:#2b91af;">MainPage</span>.OnAdiPropertyChanged)));

Geldik işin en karışık noktasına. Biraz önce GetValue ve SetValue ile
değer aldığımız ve değer atadığımız, bizim eski Private Field'in yerini
alan AdiProperty işte tam da burada bir **DependencyProperty** olarak
tanımlanmış durumda. Değişkenin yine static/shared olduğuna dikkat
etmekte fayda var. Hatta bir de üzerine readonly tanımlanmış. Neden mi?
Çünkü zaten bir defa referansını **DependencyProperty** sınıfındaki
**Register** metodundan alacak o kadar. Bir daha da bu değişken
değişmeyecek. SetValue ve GetValue ile aslında biz bu referansını
verdiğimiz değişkenin değerinin değişmesini istediğimizde arkada koca
bir dünya dönecek :)

Özünde DP yapısı bir key/value dictionary'dir ve bir observer pattern
implementasyonu ile direk Framework içerisine gömülüdür. Biz yukarıda
aldığımız referans ile yeni değeri bu yapıya ilettiğimizde değer
dictionary içerisinde gerekli kurallar uygulandıktan sonra
değiştirilecek ve birazdan göreceğimiz Callback metodu ile tüm
dinleyicilere de haber verilecek.

DP tanımlama şeklimize geri dönersek... Register metoduna ilk olarak
Property'mizin adını string olarak veriyoruz, sonra Property'mizin
tipini ve bu propertyi register eden nesnenin tipini atayıp kolay kısmı
atlatıyoruz :) En son parametre bizden bir PropertyMetadata istiyor.
MetaData içerisine farklı şeyler konabilir, bunlardan ilki bir CallBack
metodu. Yani birileri bu Property'yi Binding aracılığı ile
değiştirdiğinde (DP mekanizmasını kullanarak) haberdar olabilmemiz için
gerekli method.

**[C\#]**

        <span style="color:blue;">private</span> <span
style="color:blue;">static</span> <span
style="color:blue;">void</span> OnAdiPropertyChanged(<span
style="color:#2b91af;">DependencyObject</span> d, <span
style="color:#2b91af;">DependencyPropertyChangedEventArgs</span> e)\
         {\
            <span
style="color:#2b91af;">MainPage</span> control = d <span
style="color:blue;">as</span> <span
style="color:#2b91af;">MainPage</span>;\
             <span style="color:blue;">string</span> b = (<span
style="color:blue;">string</span>)e.NewValue;\
         }

Yukarıda gördüğünüz metodun hala static/shared olduğunu hatırlatmam
gerek. Malum DP'ler bu şekilde tanımlanıyor çünkü özünde bunlar birer
değişken değil, birer tanım! Unutmayın ki DP'ler aslında Register
metodundan dönen referanslardı ve esas değerin saklandığı yer Framework
tarafından yönetiliyor. Şimdi gelelim bizim Callback metoduna. Bu metod
da static/shared ve biz öyle veya böyle bu callback metodunun
çalışmasına neden olan değişikliği yapmış olan nesnenin mevcut
kopyasının bir referansı ile yeni değeri alabilmek isteyeceğiz. İşte bu
noktada **DependencyObject** zaten bizim nesnenin ta kendisi ouyor ve
EventArgs üzerinden de **NewValue** ile set edilen yeni değeri
alabiliyoruz.

*Not: Unutmadan :) DP kullanacak tüm nesnelerin DependencyObject'ten
türemesi şarttır. Zaten bunu kabacak yukarıdaki Callback'te nesne
referansının DependencyObject tipinde gelmesinden de anlayabiliriz :)*

Artık sıfırdan bir DP tanımlamış olduk. Rahatlıkla bu DP'yi bindinglerde
kullanabilirsiniz. Eğer binding aracılığı ile gelenlerle kendi değer
atamalarınızı birbirinden ayırt etme ihtiyacınız olursa unutmayın ki
binding aracılığı ile gelen değerleri ana property'mizin Set'in düşmez
ve direk Callback'e gelir.

Silverlight içerisindeki DP hikayemiz bu kadar. WPF'te DP'lerin farklı
ek özellikleri de var. Onları da yarın inceleyeceğiz ;) Son olarak gelin
bir de aşağıdaki soruya cevap verelim.

### DP mi INotifyPropertyChanged mi ?

Bu soruyu sadece Silverlight tarafında cevaplamak biraz daha zor. Daha
önce de bahsettiğim gibi WPF'te DP'lerin ek özellikleri var ve bu
özellikler DP kullanmak için ciddi neden olarak karşımıza çıkabilir. Ama
sadece SL tarafına baktığımızda manzara şu şekilde karşımıza çıkıyor;

INotifyPropertyChanged

-   Modelleme esnasından sizi daha özgür hissettirir :)
-   Serialize olurkan kolaylık sağlar.
-   Event'i istediğiniz zaman çağırabilirsiniz ve istemezseniz
    çağırmazsınız.

Dependency Property'ler

-   Kod yazmadan beleş Callback verir :)
-   Validasyon ve limitleme desteği sağlar (Sadece WPF)
-   Binding'lerde daha yüksek performans verir.
-   UI kontrollerine daha uygundur çünkü kafadan DependencyObject'ten
    türeme gerektirir.

Aklıma gelenler bunlar oldu. Sizin de ekleyecekleriniz olursa
yorumlarınızı bekliyorum ;)

Hepinize kolay gelsin.


