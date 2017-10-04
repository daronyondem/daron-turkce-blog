---
FallbackID: 2089
Title: Silverlight 2.0 içerisinde VisualStateManager kullanımı.
PublishDate: 13/6/2008
EntryID: Silverlight_2_0_icerisinde_VisualStateManager_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 83f0f77b-78ba-4c01-9ca9-e271ad615547
---
Bugüne kadar Silverlight içerisinde herhangi bir düğme veya farklı bir
kontrolün değişik durumlarında ayrı şekiller alması için maalesef
birbirinden bağımsız animasyonlar hazırlayarak tek tek gerekli eventlar
ile koddan eşleştirmemiz gerekiyordu. Örneğin bir düğmenin üzerine
gelindiğinde kırmızı olması ve bunu ufak bir animasyonla yapması için
ilk önce animasyonumuzu hazırlıyor sonra da düğmenin MouseOver event'ına
event-handlar kodumuzu bağlayarak animasyonu elle çalıştırıyorduk. Bu
şekilde çok sayıda proje yapıldı.

Oysa artık Silverlight 2.0 Beta 2 ile beraber karşımıza yepyeni bir
sistem geliyor : **VisualStateManager**!

Artık bir nesnenin farklı durumlarında nasıl gözükeceğini önceden
tanımlanmış durumlar için **Expression Blend 2.5** arayüzünden
ayarlayabiliyorsunuz. Silverlight bununla kalmayıp bu farklı durumlar
arasında geçiş efektlerini kendisi otomatik olarak yaratarak otomatik
olarak oynatabiliyor. Gelin biraz işin içine girip nasıl yapıldığına göz
atalım.

**Animasyonlu bir Button...**

Expression Blend 2.5 içerisinde sahneye bir Button yerleştiriyoruz.
Hedefimiz bu Button'un farklı durumlarda fon rengini değiştirmek.
Örneğin fare ile üzerine geldiğimizde düğme kırmızı olsun. Peki bunu
Expression Blend 2.5 içerisinde nasıl yapacağız?

![Düğmemizi Template'ini
düzenliyoruz.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_1.png)\
*Düğmemizi Template'ini düzenliyoruz.*

İlk olarak sahnedeki düğmemizin "Template"'ini düzenlememiz lazım.
Düğmemizin zaten hali hazırda bir tasarımı ve animasyonları var. Bunları
projenizi çalıştırdığınızda görebilirsiniz. Düğmenin üzerine
geldiğinizde rengi değişecektir. Biz tamamen sıfırdan bir düğme
tasarlamayacağımız için "**Edit Control Parts**" menüsünden "**Edit a
Copy**" seçeneğini kullanarak var olan tasarımın bir kopyasını alarak
yola devam edeceğiz. Eğer sıfırdan bir düğme tasarlamak isterseniz bu
ekranda "Create Empty" demeniz gerekecektir.

![Düğme Template'imize bir isim
verelim.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_2.png)\
*Düğme Template'imize bir isim verelim.*

Düğmemizin "Template"'ini yaratırken Expression Blend bize minik bir
soru soruyor. Şablonumuz bir "Resource" olarak yaratılacak ve projemizde
istediğimiz bir isimle istediğimiz bir yere konabilecek. Bu ekranda eğer
"**Application**" seçeneğini seçersen hazırlayacağımız şablonla ilgili
tüm özellikleri tanımlayan XAML kodu projenin içerisinde App.XAML
dosyası içerisinde saklanacaktır. Böylece şablonumuz aynı projedeki tüm
Page'lerde kullanılabilecek. Eğer varsayılan ayar olan "**This
document**" seçeneğini tercih ederseniz şablonla ilgili XAML kodları
içerisinde çalıştığınız Page.XAML dosyasına kaydedilecektir. Bu durumda
bu şablonu diğer Silverlight sayfalarınızda kullanmanız daha zor
olacaktır. Son bir seçenek ise harici bir Resource.xaml dosyasında tüm
kaynakları (şablonları) saklamak olabilir. "**Resource dictionary**"
seçeneği üzerinden yeni bir XAML dosyası yaratarak saklayacağınız
şablonlarınızı böylece birden fazla projede kullanabilirsiniz.

Biz şimdilik "**This document**" diyerek şablonumuza isim olarak da
"**DugmeStil**" değerini verelim.

![Düğmemizin farklı durumlarında tasarım değişiklikleri
yapacağız.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_3.png)\
*Düğmemizin farklı durumlarında tasarım değişiklikleri yapacağız.*

Yukarıdaki ekran görüntüsünde de inceleyebileceğiz üzere düğmemizin
şablonuna girdiğimiz anda düğmemizle ilgili farklı durumların
listelendiği bir "**Interaction**" penceresi Expression Blend içerisine
ekleniyor. Buradan herhangi bir durumu fare ile seçtikten sonra düğme
üzerinde yapmak istediğiniz görsel değişiklikleri
gerçekleştirebilirsiniz.

![Düğmemizin fon gölge rengini
değiştiriyoruz.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_4.png)\
*Düğmemizin fon gölge rengini değiştiriyoruz.*

Biz örneğimizde düğmenin üzerindeki mavi gölgenin rengini değiştirmeye
çalışalım. Standart bir düğmenin fare ile üzerine geldiğinde alt tarafa
doğru ek mavi bir gölge geliyor. Expression Blend içerisinde
baktığımızda bu gölge "**Background**" adı verilen bir Rectangle ile
sağlanmış. Söz konusu Rectangle'ın Fill rengi aşağıdaki gibi DataBound
gözüküyor.

![DataBound görsel değeri lokal bir değere
aktarıyoruz.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_5.png)\
*DataBound görsel değeri lokal bir değere aktarıyoruz.*

Yukarıdaki görselde Rectangle'ın Fill değerinin tanımlandığı bölgenin
turuncu bir çizgi ile çevrelendiği görebilirsiniz. Bu durum söz konusu
özelliğin bir sistem değişkenine bağlı olduğu anlamına geliyor. Biz bu
değeri değiştirmek istediğimiz için Fill özelliğinde değerin bir
kopyasını almak amacıyla "Fill"'in hemen yanındaki ufak kareye tıklayıp
gelen menünden "**Convert to Local Value**" diyoruz. Artık söz konusu
değer bizim şablon içerisine taşındı, böylece üzerinde istediğimiz
değişikliği yapıp gölgeyi kırmızı hale getirebiliriz. Renk paletinden
yeni bir renk seçmeniz yeterli.

![Transition efektlerini ve süreleri
ayarlayalım.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_6.png)\
*Transition efektlerini ve süreleri ayarlayalım.*

Normal şartlarda bir düğmenin üzerine geldiğinde yeni görsel duruma
geçiş esnasında bir animasyon çalıştırılıyor, fakat fareyi düğmenin
üzerinden çektiğinizde normal haline "anında" geçiyor yani herhangi bir
animasyon çalıştırılmıyor. MouseOver durumundan Normal'e geçişte de bir
animasyon çalıştırılmasını istiyorsanız hemen Blend arayüzünde
"**MouseOver**" durumunun yanındaki oka tıklayarak gelen menüden
"**Mousevoer \> Normal**" seçeneğini seçerek bu geçiş esnasında da bir
animasyon yaratılmasını istediğinizi belirtebilirsiniz. Böylece kırmızı
hale geçişte ve eski hale dönüşte birer animasyon oynatılarak geçişler
sağlanacaktır. Bu animasyonların sürelerini de hemen yanlarındaki 0.2s
değerlerini düzenleyerek değiştirebilirsiniz.

**Dikkat dikkat!**

"MouseOver" veya "MouseLeave" gibi durumlarda görsel değişiklikler
yaratırken aklınızda olması gereken ufak bir ipucu var. Animasyon
uygulayacağınız nesnelerin her durumda sahnede yer alması gerekiyor.
Yani sadece **MouseOver** durumunda gözükecek olan bir Rectangle'ın
**Normal** durumdan **MouseOver** duruma bir animasyonda kullanılması
mümkün olmaz. Görünmezden görünüre doğru bir animasyon tasarlayacak
olsanız da hedef nesnenin hem başlangıç hem de son durumlarında sahnede
bulunması gerekiyor. Tek yapacağınız başlangıç noktasında söz konusu
nesneyi görünmez ayarlamaktır.

![Şablon düzenleme modundan geri
çıkalım.](media/Silverlight_2_0_icerisinde_VisualStateManager_kullanimi/12062008_7.png)\
*Şablon düzenleme modundan geri çıkalım.*

**Arka planda neler oluyor?**

Maalesef Expression Blend'in yaratmış olduğu tüm XAML kodunu burada
yapıştırmayacağız, yaklaşık 180 satırlık bir kod söz konusu. Onun yerine
özellikle bizim yaptığımız işlemleri ilgili kısmını buraya alarak bir
inceleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">vsm:VisualStateGroup.**Transitions**</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">vsm:VisualTransition</span><span
style="color: blue;"> </span><span
style="color: red;">Duration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00.5000000</span>"

<span style="color: blue;">                        </span><span
style="color: red;">To</span><span style="color: blue;">=</span>"<span
style="color: blue;">MouseOver</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">vsm:VisualTransition</span><span
style="color: blue;"> </span><span
style="color: red;">Duration</span><span
style="color: blue;">=</span>"<span style="color: blue;">0:0:0.1</span>"

<span style="color: blue;">                        </span><span
style="color: red;">To</span><span style="color: blue;">=</span>"<span
style="color: blue;">Pressed</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">vsm:VisualTransition</span><span
style="color: blue;"> </span><span
style="color: red;">Duration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00.5000000</span>"

<span style="color: blue;">                        </span><span
style="color: red;">From</span><span style="color: blue;">=</span>"<span
style="color: blue;">MouseOver</span>"

<span style="color: blue;">                        </span><span
style="color: red;">To</span><span style="color: blue;">=</span>"<span
style="color: blue;">Normal</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">vsm:VisualStateGroup.**Transitions**</span><span
style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">vsm:VisualState</span><span
style="color: blue;"> </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Normal</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">vsm:VisualState</span><span
style="color: blue;"> **** </span><span
style="color: red;">**x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**MouseOver**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">Duration</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**BackgroundGradient**</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">SplineColorKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">{StaticResource
MouseOverLinearBevelDarkEndColor}</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;"> </span><span
style="color: red;">BeginTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Duration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00.0010000</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Storyboard.TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**Background**</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Storyboard.TargetProperty</span><span
style="color: blue;">=</span>"<span
style="color: blue;">(Shape.Fill).(SolidColorBrush.Color)</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">SplineColorKeyFrame</span><span
style="color: blue;"> </span><span
style="color: red;">KeyTime</span><span
style="color: blue;">=</span>"<span
style="color: blue;">00:00:00</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ColorAnimationUsingKeyFrames</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Storyboard</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">vsm:VisualState</span><span
style="color: blue;">\></span>

Kod içerisinde de görebileceğiniz üzere **MouseOver** durumu içerisinde
toplam iki adet animasyon var. Bunlardan biri **Background'u** diğeri de
**BackgroundGradient'i** değiştiriyor. Adı **Background** olan animasyon
bizim biraz önce Blend arayüzünden hazırladığımız animasyonun ta
kendisi. Peki bu animasyon ne zaman nasıl çalıştırılacak? İşte tüm
bunlara **VisualStateGroup.Transitions** tagları arasındaki bilgiler
karar veriyor. Kaç saniyede hangi durumdan hangi duruma göre
animasyonlar oynatılacağı doğrudan bu taglar arasında belirlenmiş
durumda. Oynatılacak animasyonlar da zaten her durumun ismiyle
ilişkilendirilmiş şekilde kod içerisinde duruyor.

**Koddan geçişleri çalıştırmak istersek?**

Bazı durumlarda hazırlanan bu animasyonları kod ile de çalıştırmak
isteyebilirsiniz. Örneğin kullanıcının tıklaması gereken bir düğme
vardır, fakat tıklamıyordur :) bu durumda sanki **MouseOver** olmuş gibi
bir düğmeyi parlatıp söndürmek hoş olabilir.

**[VB]**

VisualStateManager.GoToState(Dugme, <span
style="color: #a31515;">"MouseOver"</span>, <span
style="color: blue;">true</span>)

**[C\#]**

VisualStateManager.GoToState(Dugme, <span
style="color: #a31515;">"MouseOver"</span>, <span
style="color: blue;">true</span>);

Yukarıdaki kod ile **Dugme** adındaki düğmemizin **MouseOver** durmuna
geçmesini ve arada gerekli animasyonun da oynatılmasını sağlamış
oluyoruz. Eğer son Boolean parametreyi **False** olarak verirseniz geçiş
animasyonu oynatılmaksızın söz konusu duruma geçilecektir.

Hepinize kolay gelsin.


