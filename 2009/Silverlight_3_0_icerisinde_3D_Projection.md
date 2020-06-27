# Silverlight 3.0 içerisinde 3D Projection.
Silverlight 3.0 ile beraber gelen en ilgi çekici özelliklerden biri 3D
desteği. Bu makalemizde Silverlight ile beraber gelen 3D özelliklerine
bakmadan önce aslında nasıl bir 3D mantığı ile karşı karşıya olduğumuzu
netleştirmekte fayda var. Özellikle Silverlight öncesi WPF ile
ilgilnenlerin 3D beklentisi eminim ki çok yüksek olacaktır. Tabi daha
öncesinde 3D oyun programlama ile ilgilenenleri liste dışında tutuyoruz
:) amacımız zaten oyun tarafı değil.

WPF içerisinde alıştığımız yapıdaki 3D ortamda istediğimiz bir 3D objeyi
alarak X, Y ve Z koordinatları ile doğrudan kontrol edebiliyorduk oysa
Silverlight tarafındaki 3D desteği biraz daha farklı. Aslında bakılırsa
tam olarak 3D desteği olarak da adlandırılmıyor söz konusu mekanizma.
Esas bahsedilen özelliğin adı "3D Plane" olarak geçiyor. Peki bunun
anlamı nedir? Özetlemek gerekirse aslında Silverlight içerisindeki 3D
desteği sadece 3D ortam şeklinde. Yani sadece içerisinde bulunduğunuz
ortam 3D :) elinizdeki nesneler 3D değil.

**Ne? Nasıl?**

Elinizde iki boyutlu bir nesne olduğunu düşünün. Aslında çok basit bir
şekilde bir TextBox düşünseniz de yeterli olacaktır. Bir TextBox nesnesi
3D bir nesne midir? Yani kalınlığı var mıdır? Hayır, bir TextBox'ın
sadece genişlik ve yüksekliği vardır. İşte bu şekilde 2D nesneleri
Silverlight içerisinde artık sanki 3D ortamdaymış gibi
gösterebiliyorsunuz. Özünde bahsettiğimiz şey **3D Projection**
(Yansıtma). Nasıl ki elimizdeki 2D nesnelere **RenderTransform'lar**
uygulayarak iki boyutlu ortamda istediğimiz gibi manipüle
edebiliyorduysak artık Silverlight içerisinde tüm görsel nesneleri 3D
ortamda da manipüle edebiliyorsunuz. Gelin hemen hızlı bir örnek ile
konuya girelim.

![Farklı 3D Transform'lar uygulanmış
ComboBox'lar.](media/Silverlight_3_0_icerisinde_3D_Projection/07062009_1.jpg)\
*Farklı 3D Transform'lar uygulanmış ComboBox'lar.*

Yukarıdaki ekran görüntüsünde aslında basit bir **ComboBox**
görüyorsunuz fakat söz konusu ComboBox sanki üç boyutlu ortamdaymış gibi
döndürülmüş hatta görüntülerden birinde arkasına çevrilmiş. Tüm bu
mekanizma animasyonlar dahil çalışırken eldeki nesneleriniz hepsi
"arkası döndürüldüğünde" bile kullanılabilir olmaya devam ediyor.
Düşünün, tüm bunlar animasyonlar ile birleştirildiğide üç boyutlu
ortamda gezen kontroller şeklinde :) ne kadar ilginç arayüzler
yaratılabilir.

**Kod tarafına geçiş yapalım...**

Kod tarafında herhangi bir nesneyi 3D ortamdaymış gibi ekrana yansıtmak
istiyorsanız yapmanız gereken söz konusu nesne için hemen bir
**Projection** tanımlamak. Şu an için Silverlight içerisinde sadece
**PlaneProjection** destekleniyor o nedenle tek seçeneğimiz var.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication43.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox</span><span style="color: red;">
Width</span><span style="color: blue;">="200"</span><span
style="color: red;"> Height</span><span
style="color: blue;">="20"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox.Projection</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;"> **\<**</span><span
style="color: #a31515;">**PlaneProjection**</span><span
style="color: red;"> **RotationX**</span><span
style="color: blue;">**="208"**</span> ****

**                               ** <span style="color: red;">
**CenterOfRotationY**</span><span style="color: blue;">**="1"**</span>
****

**                               ** <span style="color: red;">
**CenterOfRotationX**</span><span style="color: blue;">**="1"**</span>
****

**                               ** <span style="color: red;">
**RotationY**</span><span style="color: blue;">**="33"**</span> ****

**                               ** <span style="color: red;">
**GlobalOffsetY**</span><span style="color: blue;">**="15"**</span> ****

**                               ** <span style="color: red;">
**GlobalOffsetX**</span><span style="color: blue;">**="35"/\>**</span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ComboBox.Projection</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: red;">
Content</span><span style="color: blue;">="Seçenek 1"\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: red;">
Content</span><span style="color: blue;">="Seçenek 1"\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: red;">
Content</span><span style="color: blue;">="Seçenek 1"\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: red;">
Content</span><span style="color: blue;">="Seçenek 1"\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBoxItem</span><span style="color: red;">
Content</span><span style="color: blue;">="Seçenek 1"\>\</</span><span
style="color: #a31515;">ComboBoxItem</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ComboBox.Items</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">ComboBox</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Bir önceki bölümde sizinle paylaştığım ekran görüntüsünde sağ tarafta
bulunan ComboBox'ın XAML kodunu yukarıda bulabilirsiniz. Burada önemli
olan şey ComboBox'ın **Projection** özelliğine atanmış olan
**PlaneProjection** nesnesi. Söz konusu PlaneProjection nesnesinin
birçok özelliği set edilmiş durumda. İşte biz de makalemizin geri
kalanında bu özelliklerin anlamlarına göz atacağız.

**RotationX, RotationY, RotationZ**

İsimlerinden de anlaşılacağı üzere bu özellikler bir şekilde elimizdeki
nesnenin üç boyutlu ortamda kaç derece ile döndürüleceğini belirliyor.
Peki X, Y ve Z derken neyi kast ediyorlar? Hemen gözünüzde üç boyutlu
bir ortam canlandırın ve söz konusu ortadam ComboBox'ımızı koyalım.
ComboBox'ı etrafında döndürebileceğiniz aslında üç adet eksen vardır.
Bunlardan birincisi X ekseki. Eğer X ekseki etrafında ComboBox'ı
döndürmek istiyorsanız RotationX değerine gerekli açıyı verebilirsiniz.
Aynı şekilde Y ve Z eksenleri etrafında da eldeki nesne döndürülecekse
rahatlıkla özelliklere de açı değerleri vererek istediğiniz sonucu
alabilirsiniz.

![Eksenler ve Rotation
özellikleri...](media/Silverlight_3_0_icerisinde_3D_Projection/07062009_2.gif)\
*Eksenler ve Rotation özellikleri...*

Yukarıdaki görsel içerisinde X, Y ve Z eksenlerini ve etraflarında
döndürülmüş Button görsellerini inceleyebilirsiniz. Bu noktada dikkat
edilmesi gereken detaylardan biri de aslında eksenlerin gerçekten de her
nesnenin tam ortasından geçiyor olması. Her görsel nesne kendi X, Y ve Z
eksenlerine sahip ve bunlar varsayılan ayarlarda nesnenin tam ortasından
geçecek şekilde ayarlanmış. Örneğin X ekseni etrafında 45 derece
döndürülen bir Button eksen tam da Button'un ortasından geçtiği için
kendi merkezi etrafında dönüyormuş gibi gözüküyor.

İsterseniz eksenlerin yerlerini değiştirme şansınız da var. Tüm eksenler
varsayılan ayarları ile nesnelerin tam ortasından geçersen harici Offset
değerleri ayarlanabiliyor. Offset değerleri bilindiği üzere 0 ile 1
arasında nesnenin sol üst köşesinden başlayarak sağ alt köşesine gider.
Eğer X eksenine 0 Offset değerini verirseniz bu X ekseninin düğmenin en
üstüne denk geleceği anlamına gelir. Aynı şekilde eğer 1 değerini
verirseniz ekseni düğmenin en alt noktasına itmiş olursunuz.

![CenterOfRotation
ayarları.](media/Silverlight_3_0_icerisinde_3D_Projection/07062009_3.gif)\
*CenterOfRotation ayarları.*

Eksenin yerini değiştirmiş olmak artık düğmemizin kendi merkezine göre
değilde üst noktasına göre veya alt noktasına göre dönmesini
sağlayacaktır. **CenterOfRotation** olarak geçen bu özelliğin **X, Y ve
Z** Offset değerlerini ayrı ayrı düzenleyebiliyorsunuz. Yukarıdaki
görselde de görebileceğiniz üzere aslında X ekseninin Y eksenine göre ne
kadar aşağıda veya yukarıda olacağını ayarlıyoruz. O nedenle düğmenizin
X eksenin **Offset** değeri olarak ne kadar uzak olacağına dair bilgiyi
**CenterOfRotationY** değerine atamanız gerekiyor. Aynı şekilde diğer
eksenler için de **CenterOfrotationX** ve **CenterOfRotationZ**
özellikleri de mevcut.

**GlobalOffset ve LocalOffset ayarları.**

Şu ana kadar eksenleri etrafında nesnelerin ne açı ile döneceklerini ve
eksenlerin nesnelerin neresine denk geleceğini ayarladık. Oysa başka
dertlerimiz de olabilir. Bunlardan en basiti tüm işlemleri yaparken
nesneyi uygulama genelinde Global olarak da posizyonlandırmak
isteyebilirsiniz. İşte üç boyutlu ortamda nesnenize Global bir pozisyon
vermek istiyorsanız kullanacağınız özellikleri **GlobalOffsetX**,
**GlobalOffsetY** ve **GlobalOffsetZ** özellikleri olacaktır. Bu
özellikler kesinlikle animasyonunuzu veya nesnenin nasıl döneceğini vs
değiştirmez. Nesneyi kendi X, Y ve Z eksenleri ile beraber Global,
uygulama bazında ayrı bir X, Y ve Z ekseni üzerinden tekrar
pozusyonlandırdığınızı düşünebilirsiniz.

Gelelim animasyonlarınızı en hareketli ve janjanlı hale getirecek olan
son özelliğe; LocalOffset! Adından da anlaşılacağı üzere aslınad yine
nesnenizi bir şeyden uzaklaştırıyorsunuz fakat bu sefer global anlamda
değil. Nesnenin kendi içinde belirlenen açılarla etrafında döndüğü
eksenlerden devasa miktarlarda uzaklaştırılarak sanki uzaklardan bir
yerden geliyormuş efekti ile ekrana gelmesini sağlayan mekanizma
LocalOffset'tir. Düşünün ki nesneniz ekseni etrafında değil de
ekseninden 50 piksel uzakta bir dairede dönüyor? Nasıl gözükürdü?

![Ekseninden uzaklarda dönen bir
Button.](media/Silverlight_3_0_icerisinde_3D_Projection/07062009_4.gif)\
*Ekseninden uzaklarda dönen bir Button.*

Yukarıdaki görüntüden bir Button'un ekseninden uzakta dönmesi halinde
nasıl bir animasyon oluşabileceğini tahmin edebilirsiniz. Offset
değerlerini arttırarak ve sadece X değil farklı eksenlerde aynı anda
açılar vererek animasyonlar hazırladığınızda nesnelerinizi üç boyutlu
ortamda istediğiniz gibi hareketlendirebiliyorsunuz. Tüm bu süreçte
Button'un sürekli olarak tıklanabilir kaldığını da hatırlatmak isterim.

**Sonuç**

Yukarıda bahsettiğimiz tüm özelliklere programatik erişimin haricinde
animasyon içerisinde de kullanabileceğiniz kesin. Özellikle unutulmaması
gereken nokta Projection'ın tüm nesnelere uygulanabiliyor olması, yani
elinizde içi dolu bir **StackPanel** veya bir **DataGrid** olabilir ve
tüm bunları keni iç elementleri ile beraber rahatlıkla anime
edebilirsiniz. Hatta belki StackPanel'inizin içinde bir nesne zaten
kendi X, Y, Z koordinatlarına göre üç boyutlu bir animasyonu
gerçekleştiriyordur ve siz StackPanel'i de başka bir üç boyutlu
animasyona alarak daha ilginç manzaralar da yaratabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-6-14 tarihinde yayinlanmistir.*
