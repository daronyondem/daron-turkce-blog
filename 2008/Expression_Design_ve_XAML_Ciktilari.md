---
FallbackID: 1939
Title: Expression Design ve XAML Çıktıları
PublishDate: 31/1/2008
EntryID: Expression_Design_ve_XAML_Ciktilari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Design, Silverlight, WPF
old.EntryID: 8332611c-6d2d-4f97-92d4-9d29f0711a6e
---
İster **Silverlight** ister **WPF** uygulamalarında vektörel çizimlere
animasyonlar katıyor olmak hayati öneme sahip. Bu çerçevede bizim
elimizde hali hazırda bulunan vektörel çizimleri veya yapacağımız yeni
çizimleri WPF veya Silverlight'a uygun şekilde XAML kodları olarak elde
etmemiz gerekiyor. **Expression Design** işte tam noktada devreye
giriyor.

Bir Microsoft ürünü olarak **Expression Design** ile ilgili sizleri
şaşırtacağına inandığım birkaç noktadan bahsetmek istiyorum. Bu
noktalardan ilki Expression Design içerisinde **File / Import** menüsüne
ufak bir yolculuk yaptığımızda karşımıza **Adobe Photoshop** ve **Adobe
Illustrator** dosya formatlarının da geliyor olması. **PSD** veya **AI**
dosyalarını doğrudan vektörel formatları ve katman yapıları bozulmadan
Expression Design içerisine aktarabiliyorsunuz. Böylece eldeki hazır
tasarımları hızlıca WPF veya Silverlight dünyasına taşımak mümkün
oluyor. Bir diğer şaşırtıcı nokta da **File / Export** menüsünde. Bu
menüden WPF ve Silverlight için XAML çıktıları almanın yanı sıra **PDF**
veya **PSD** dosyaları da alabiliyoruz.

**XAML çıktı alma yolunda ilerlerken...**

Expression Design içerisinde tasarım yaparken bir tasarımcı olarak
dikkat etmemiz gereken noktalardan ilki "Layers" panelinde
oluşturduğumuz katmanların yapıları ve özellikle isimleri. Expression
Design içerisinde oluşturulan her bir katman ileriki noktalarda WPF veya
Silverlight dünyasında programcı tarafından da kullanılabiliyor
olacaktır. Hatta söz konusu katmanlara tasarımcının verdiği isimler ile
programcılar da ulaşacaktır. Bu nedenle tasarımcının olabildiğince
yapılsan çerçevede anlamlı katmanlamalar yaparak, yine anlamlı
isimlendirmeler yapmasında büyük fayda var. Aksi halde programcının
görsel nesneleri sahnede bulması ve gerekli kodu yazması çok daha zor
olacaktır.

Bir diğer dikkat edilmesi gereken nokta da "**Effects**" menüsü ile
ilgili. Maalesef Expression Design içerisindeki tüm efektler WPF
tarafından desteklenmiyor, Silverlight tarafında desteklenen bir efekt
ise 1.0 sürümünde mevcut değil. Bu noktada efektler kullanırken birazdan
XAML çıktısı alacağımız ekranda bahsedeceğim detaylara dikkat etmek
gerekecektir.

**File / Export / XAML\***

Çiziminizi tamamladıktan sonra doğrudan File / Export menüsünü açarak
dosya tipi olarak da XAML'ı seçtiğinizde "OK" düğmesine basmanızla
birlikte karşınıza yeni bir pencere gelecektir. Bu pencerede çıktı
alacağımız XAML kodları ile ilgili ayarları yapmamız gerekiyor.

![Expression Design XAML Export penceresindeki
ayarlar.](media/Expression_Design_ve_XAML_Ciktilari/31012008_1.png)\
*Expression Design XAML Export penceresindeki ayarlar.*

İlk olarak çıktı alacağımız XAML kodunun WPF mi yoksa Silverlight ile mi
kullanılacağına karar vermemiz gerekiyor. Bu seçim XAML kodunda büyük
değişiklikleri neden olacaktır. Basit bir örnek olarak XAML dokümanının
kök elementinin WPF'de Window, Silverlight içerisinde ise Canvas
olduğunu hatırlayabiliriz. Seçimimizi yaptıktan sonra bizi daha farklı
ayarlar bekliyor.

"Text"'leri ne yapacağız? Eğer çiziminiz içerisinde metinler
kullanmışsanız bunların da birer TextBlock olarak yerleştirilmesi, ya da
vektörele çevrilerek bu yazıların birer vektörel çizim olarak
(vectorize) XAML koduna konması gerekiyor. Seçimi yaparken dikkat
edilmesi gereken noktalardan biri bahsi geçen metnin programatik olarak
değiştiriliip değiştirilmeyeceği detayı. Eğer metinler programcı
tarafından veritabanına vs bağlanacak ise kesinlikle TextBlock olmaları
şart, aksi halde vektörel olarak sahneye yerleştirilen bir metin
doğrudan değiştirilemeyecektir. Fakat bu detayın yanı sıra bir de işin
animasyon kısmı var. Eğer yerleştirilen metinlerin büyütülüp küçüldüğü
animasyonlar düzenlenecek ise metinleri vektörel olarak sahneye koymak
daha yüksek performans sağlayacaktır. TextBlock üzerinden yapılan
büyütme ve küçültme animasyonlarında nesne her boyut değiştirdiğinde
içerisinde metin tekrar font dosyasından gerekli bilgiler alınarak
vektörel olarak yaratılacaktır. Böyle bir animasyon vektörel bir
animasyona kıyasla daha çok sistem kaynağına ihtiyaç duyar. Eğer yazılan
yazılarda boyut değiştirme animasyonları yapılacaksa ve bu yazılar
programatik olarak değiştirilmeyecekse kesinlikle "**Paths**" seçeneği
kullanılarak yazılar vektörele çevirlmelidir.

**"Live Effects"** olarak geçen gerçek zamanlı efektlerin hepsinin WPF
veya Silverlight tarafından desteklenmediğinden bahsetmiştik. Eğer
desteklenmeyen bir efekt kullanılmış ise **"Rasterize all live
effects"** seçeneği sayesinde efektlerin ayrı birer PNG görsel olarak
kaydedilerek efekt verilen nesnelerin arkasına yerleştirilmesini
sağlayabilirsiniz. Bir diğer seçenek ise "**Only Export Live Effects
supported by XAML**" olarak sadece desteklenen efektlerin XAML olarak
yerleştirilmesine olanak tanıyor. Efektlerle ilgili de performans
konusunda olabildiğince dikkat etmekte fayda var. Eğer efekt verilen
nesne boyut değiştirmeyecekse, yani efekti sürekli aynı şekilde
gözükecekse söz konusu efektli bir PNG olarak yerleştirmek ileriye dönük
animasyonlarda performans artışı sağlayacaktır. Sahnede yerini
değiştirdiğiniz bir nesnenin efekti her karede tekrar baştan
yaratılacağına nesnenin arkasında bitmap de yer değiştirecektir. Böylece
çok daha az işlemci gücü kullanılır. Diğer yandan hedef nesnenin
boyutunu değiştiren animasyonlar varsa arkada bir PNG dosyasının durması
efeklerin boyutlandırılamamasına, örneğin bir "**Drop Shadow**" efekti
ile yerleştirilen gölgenin nesneden ufak kalmasına neden olabilir. Bu
tarz durumlarda ya arkadaki PNG'yi de animasyona dahil etmek ya da
doğrudan desteklenen gerçek zamanlı efektleri tercih etmek gerekecektir.

Son olarak tercih etmemiz gereken seçenekler arasında "**Image
Strokes**" yapısı yer alıyor. Expression Design içerisinde vektörel
çizimlerinizde kullandığınız "stroke" yapılarının bazıları vektörelken
bazıları ise bitmap. XAML çıktısı alırken isterseniz bu stroke
yapılarını detay seviyesi (level) belirterek vektörel olarak alabilir
veya doğrudan bitmap olarak da (rasterize) kaydedebilirsiniz. Her
zamanki gibi vektörel kayıtlarda animasyonlarda herhangi bir bozulma
olmazken bitmap kayıtlarda ise daha yüksek performans elde ediliyor.

Tüm ayarları yaptığımıza göre artık XAML çıktımızı almaya hazırız.
"**Export**" düğmesi ile çıktınızı .xaml uzantılı bir dosya olarak alıp
WPF veya Silverlight projelerinizde kullanabilirsiniz.

Hepinize kolay gelsin.

*\*XAML çıktıları ile ilgili sorun yaşamamak adına Expression Design'ın
Export bölümü ile ilgili büyük çapta değişiklikler içeren Expression
Design SP1 yükleme paketini bilgisayarınıza yüklemenizde fayda var.*


