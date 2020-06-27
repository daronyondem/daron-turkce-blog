# Silverlight Toolkit'ten WrapPanel'in kullanımı.
Layout kontrolleri XAML ile arayüzler oluştururken "olmazsa olmazlar"
listemizin en başında geliyor. Silverlight 1.0'daki Canvas kontrolünden
sonra 2.0'da birçok kontrol yardımımıza yetişse de maalesef WPF'deki
zenginliğe ulaşamamıştı. Bu eksikliği Silverlight Toolkit karşılıyor ve
paket içerisindeki WrapPanel aynı WPF içerisindeki işlevsellikleri
Silverlight için de sağlıyor.

Silverlight Toolkit DLL'lerinden **Microsoft.Windows.Controls.DLL**
dosyasını Silverlight 2 projenize referans olarak ekledikten sonra
WrapPanel kontrolünü Blend 2 içerisinde Asset Library'de "Custom
Controls" tabında bulabilirsiniz.

![Expression Blend 2 içerisinde Silverlight Toolkit'ten
WrapPanel.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_1.png)\
*Expression Blend 2 içerisinde Silverlight Toolkit'ten WrapPanel.*

Bu noktadan sonra Blend içerisinde doğrudan bir WrapPanel'i sahneye
yerleştirebilirsiniz. Peki nedir WrapPanel? WrapPanel içerisindeki
kontrolleri bir sepete atırılmış gibi sürekli toplayarak kendi içine
sığdırmaya çalışan bir kontroldür. Gelin örnekler ile tam olarak nasıl
çalıştığına göz atalım.

![WrapPanel içerisinde birden çok
nesne.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_2.png)\
*WrapPanel içerisinde birden çok nesne.*

Yukarıdaki görselde sahnede bir WrapPanel yer alıyor. Söz konusu
WrapPanel içinde toplam 6 tane Button var. Bu Button'ların konumları ile
ilgili hiçbir ayar yapmadık. Düğmeleri WrapPanel içerisinde attıkça
WrapPanel kendisi ilk başta düğmeleri yan yana koymaya başladı sonra yer
kalmayınca alt satıra attı ve alt satıra düğmeler dizmeye başladı. İşte
WrapPanel'in mantığı da budur. İçerisinde bulunan nesneleri sırası ile
toparlayarak konumlandırır.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication23.Page"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">controls</span><span
style="color: blue;">="clr-namespace:Microsoft.Windows.Controls;assembly=Microsoft.Windows.Controls"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

 

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span style="color: red;">
Margin</span><span style="color: blue;">="39,35,141,93"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span
style="color: blue;">\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Örneğimizin XAML kodunu da yukarıda bulabilirsiniz. Gördüğünüz gibi
WrapPanel içerisindeki düğmelerin hiçbirinin konumlandırma bilgisi yok.
Düğmelerin içerisinde yazılacak yazılar dışında hiçbir özellikleri set
edilmiş değil.

![WrapPanel'in Orientation özelliği Vertical
yapılınca...](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_3.png)\
*WrapPanel'in Orientation özelliği Vertical yapılınca...*

İsterseniz bir WrapPanel'in içerisindeki nesnelerin ekranın üstüne doğru
değil de soluna doğru da toparlanmalarını sağlayabilirsiniz. Bunun için
WrapPanel'in **Orientation** özelliğini **Vertical** olarak ayarlamanız
yeterli olacaktır. Böylece sıralama işlemi dikey olarak yapılacak ve
dikey boy doldurulduğunda yeni bir kolon yaratılarak hizalama devam
edecektir.

**[XAML]**

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span style="color: red;">
Margin</span><span style="color: blue;">="39,35,141,142"</span><span
style="color: red;"> **Orientation**</span><span
style="color: blue;">**="Vertical"**\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span
style="color: blue;">\></span>

**WrapPanel içerisinde nesnelerin hizalama ayarlarına dikkat!**

WrapPanel içerisindeki nesnelerin her biri kendi satır ve sütunları
içerisinde hizalandırılabilirler. Stretch modunda olan nesnelerin oluşan
bir kolon veya sütun içerisinde tüm nesnelerin en geniş veya en yüksek
olan nesneye uyum sağlayacaktır. Bu nedenle eğer bir satır veya sütun
içerisinde nesnelerin orijinal büyüklüklerinde kalmalarını istiyorsanız
hizalamalarını kesinlikle tek tek ayarlamalısınız.

![Farklı hizalamalara sahip
nesneler!](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_4.png)\
*Farklı hizalamalara sahip nesneler!*

Yukarıdaki görselde ikinci düğmenin dikey hizalamalası değiştirilerek
kendi özgün boyutunda gösterilmesi sağlanmıştır. Söz konusu düğmenin
bulunduğu satırın yüksekliğini arttıran isen birinci düğmedir.

[XAML]

<span style="color: #a31515;">      </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span style="color: red;">
Margin</span><span style="color: blue;">="39,35,141,142"</span><span
style="color: red;"> Orientation</span><span
style="color: blue;">="Horizontal"</span><span style="color: red;">
HorizontalAlignment</span><span style="color: blue;">="Left"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="134"</span><span style="color: red;">
Height</span><span style="color: blue;">="50"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span style="color: red;">
VerticalAlignment</span><span style="color: blue;">="Top"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"</span><span
style="color: red;"> **HorizontalAlignment**</span><span
style="color: blue;">**="Left"**</span><span style="color: red;">
**VerticalAlignment**</span><span
style="color: blue;">**="Top"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Button</span><span style="color: red;">
Content</span><span style="color: blue;">="Button"/\></span>

<span style="color: #a31515;">      </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">controls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">WrapPanel</span><span
style="color: blue;">\></span>

**Nerelerde kullanılabilir?**

WrapPanel'in belki de en sık kullanıldığı basit yerlerden biri harici
kontrollerdeki diğer Layout kontrollerinin yerini alarak farklı
görsellikler sağlama noktasıdır. Örneğin normal şartlarda içerisindeki
öğelerin dikey veya yatay olarak tek bir satır veya sütunda
gösterilebileceği bir ListBox kontrolünün Layout kontrolünü değiştirerek
ListBox içerisinde tüm nesnelerin ekrana sığacak şekilde bir WrapPanel
içerisinde toplanmasını sağlayabilirsiniz.

![Standart bir
ListBox.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_5.png)\
*Standart bir ListBox.*

Yukarıda gördüğünüz standart ListBox içerisinde öğeler dikey olarak
sıralanmış durumda. Oysa bu öğelerin uzunlukları kısa ve belki de
"Deneme 1" ile "Deneme 2" yan yana konabilirdi. Böylece çok daha fazla
öğe aynı anda ekranda gösterilirken kullanıcının çok daha hızlı şekilde
aradığı şeye ulaşması sağlanabilirdi. Bu detayların haricinde görsel
olarak da daha güzelbir sonuç alabiliriz.

Bu durumda bizim yapmamız gereken  yukarıda hazırladığımız standart
ListBox'ın Layout kontrolünü değiştirmek. Bunun için Expression Blend
içerisinde kontrolü seçerek sağ tuş tıklayıp aşağıdaki görselde
görebileceğiniz menüye doğru hızlı bir yolculuk yapıyoruz.

![ListBox'ın Layout kontrolünü
değiştireceğiz.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_6.png)\
*ListBox'ın Layout kontrolünü değiştireceğiz.*

ListBox'ın içerisinde normal şartlarda bir Grid Layout kontrolü
bulunuyor. Bu kontrolü silerek yerine bir WrapPanel koymamız gerekecek.

![Grid yerine WrapPanel
karşınızda.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_7.png)\
*Grid yerine WrapPanel karşınızda.*

WrapPanel'i koyduktan sonra WrapPanel'in genişliğini de ListBox'ınızın
genişliğine eşitlemeyi unutmayın. Bunu dinamik arayüzlerde LayoutUpdated
eventlarında yapabilir veya XAML tarafında bir Binding ile
çözebilirsiniz.

![ListBox içerisinde
WrapPanel.](media/Silverlight_Toolkit_ten_WrapPanel_in_kullanimi/12112008_8.png)\
*ListBox içerisinde WrapPanel.*

Yukarıdaki görselde WrapPanel ile ListBox'ın iş ortaklığının sonucunu
görebilirsiniz. ListBox içerisinde nesneler mümkün oldukça yan yana
alınarak yukarıya doğru toplanmışlar. Bizim örneğimizde nesne sayısı
artık az geldiği için ListBox'ın scroll barları da gözükmüyor.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-11-13 tarihinde yayinlanmistir.*
