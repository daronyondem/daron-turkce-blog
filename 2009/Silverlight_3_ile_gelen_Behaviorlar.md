---
FallbackID: 2393
Title: "Silverlight 3 ile gelen Behaviorlar"
date: "2009-8-21"
EntryID: Silverlight_3_ile_gelen_Behaviorlar
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: eb385093-86eb-4cb3-96f3-668c036596d7
---
# Silverlight 3 ile gelen Behaviorlar
Silverlight 3 ile beraber gelen en güzel özelliklerden biri de
**Behavior** yapısı. Behavior'lar bize normalde programatik olarak
yaptığımız işlevsellikleri XAML içerisinde tanımlama şansı tanıyan
kontroller olarak öngörülebilirler. Daha fazla detaylarına inmeden SL
3.0 SDK ve Silverlight Toolkit ile beraber gelen Behavior'lara
isterseniz tek tek göz atalım ve bakalım eskisine kıyasla işimizi ne
kadar kolaylaştırıyorlar.

**Behaviorlar nerede?**

Behaviorlar'ı kullanmanın en kolay yolu Expression Blend'in içi. Sonuç
olarak bu kontroller birer XAML kodu yaratacağına göre ve biz de bunları
ezberleyip yazma eğiliminde en azından başlangıç aşamasında değilsek
Blend doğru seçim olacaktır. Blend 3 içerisinde yeni bir SL projesi
yarattıktan sonra hemen **Assets** paneline göz atıp **Behaviors**
tabını görebilirsiniz.

![Expression Blend içerisinde
Behavior'lar.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_1.png)\
*Expression Blend içerisinde Behavior'lar.*

Gördüğünüz üzere ilk bakışta toplam sekiz Behavior bizi bekliyor. Hemen
en kolayı ile başlayarak bakalım Behavior'ları nasıl kullanıyoruz.

**HyperlinkAction**

Varsayalım ki elinizde bir kontrol var ve tıklandığında internette bir
adrese yönlendirme yapmak istiyorsunuz. Bu durumda HyperlinkButton belki
durumu kurtarabilir fakat elinizdeki her kontrolü tasarımı ile beraber
birer HyperlinkButton'a çevirmek de ciddi işkence olabilir. Keşke
herhangi bir kontrole tıklandığında bir URL'e yönlendirebilsek? Aslında
bunu kod tarafından yapabiliriz. Örneğin elimizde bir **Rectangle**
varsa onun **MouseLeftButtonDown** durumunu yakalayıp orada da kod ile
kullanıcıyı başka bir web sayfasına yönlendirebiliriz.

Tüm bunları yapmak yerine basit bir şekilde **HyperlinkAction**
Behavior'ını da kullanabiliriz. Hemen sahneye örnek bir Rectanlge
aldıktan sonra **Assets** içerisinden de **HyperlinkAction'ı** alarak
"Objects and Timeline" içerisinde Rectangle'ın üzerine bırakabilirsiniz.

![Behavior'ımız
sahnede.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_2.png)\
*Behavior'ımız sahnede.*

Behavior'ı eklediğiniz anda yukarıdaki manzara ile karşılaşacaksınız.
Artık Rectangle'ın için bir başka kontrol var yani bir Behavior var.
Hemen bu Behavior nesnesini seçerseniz bu sefer de **Properties**
panelinde Behavior'a ait özellikleri bulabilirsiniz.

![Behavior'ımıza ait
ayarlar.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_3.png)\
*Behavior'ımıza ait ayarlar.*

Behavior'ımızın özelliklerini incelediğimizde aslında karşımızda bir
EventTrigger olduğunu görüyoruz. Bu yapı daha önce WPF ile çalışanlara
tanıdık gelecektir. **SourceName** özelliğinde **Parent** yazması
Behavior'ımızın otomatik olarak içerisinde olduğu Rectangle'ı kaynak
aldığını anlamına geliyor. **EventName** kısmında Rectangle'ın hangi
durumunda linkin çalışmasını istiyorsak onu seçiyoruz. Varsayılan
ayarlarda **MouseLeftButtonDown** geliyor. Son olarak tabi linkimizin
adresini ve hedefini de girersek artık herşey tamamdır. Bir satır bile
kod yazmadan sadece birkaç ayar ile işimizi bitirdik. Bu sistem
özellikle tasarımcılar açısından çok değerli olsa da hızlı uygulama
geliştirme noktasında herkesin işine yarayacaktır. Diğer yandan bu
şekilde farklı Behavior'ları yazılımcıların da hazırlayabileceğini
düşünürsek işlevselliklerin merkezi hale getirilmesinde de Behavior'lar
ciddi rol oynayabilir.

**MouseDragElementBehavior**

Drag&Drop işlemleri alışkın olduğumuz işlevsellikler arasında. Bu
işlevselliği Silverlight içerisinde sağlamak için de hemen kod
tarafından ilerleyebiliriz. Oysa basit durumlarda kullanabileceğimiz bir
Behavior olarak **MouseDragElementBehavior** da rahatlıkla
kullanılabilir. Söz konusu behavior'ı herhangi bir kontrole bağlamanız
onun sürüklenip bırakılabilir hale gelmesi için yeterli.
MouseDragElementBehavior'ın **ConstrainToParentBounds** adında tek bir
özelliği var. Eğer bu özelliğe True değerini verirseniz sürükelyip
bırakmayı hedeflediğiniz nesne sadece kendi Parent nesnesi içerisinde
sürüklenebilecektir. Aksi halde nesne tamamen global olarak
sürüklenebilir.

**PlaySoundAction**

Silverlight içerisinde ses veya video dosyalarını oynatmak için
MediaElement kullanıyoruz. Oysa bazı durumlarda basit bir uyarı sesi
veya farklı bir efekt yaratmak isteyebiliriz. Bu gibi durumlarda
özellikle sahnede bir MediaElement tutmak, duruma göre Source'unu
değiştirmek ve Play metodu ile sesi oynatmak ciddi miktarda kod
yazmanızı gerektirebilir. Oysa PlaySoundAction Behavior'ı ile doğrudan
herhangi bir elementin bir durumunda ses oynatabilirsiniz.

![PlaySoundAction
ayarları.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_4.png)\
*PlaySoundAction ayarları.*

PlaySoundAction Behavior'ı SourceName ile aldığı kendi Parent
kontrolünün herhangi bir durumunda yine Behavior'a Source olarak
verilmiş bir WMA veya MP3 dosyasını oynatabiliyor. Görüldüğü üzere
işimizi ciddi şekilde kolaylaştırabilir.

**RemoveElementAction**

Adından da anlaşılacağı üzere RemoveElementAction sahnedeki herhangi bir
kontrolü sahneden kaldırıp yok eden bir işlevselliğe sahip. Örneğin bir
Rectangle'a tıklandığında başka bir kontrolün sahneden kalkmasını
istiyorsanız RemoveElementAction doğru seçim olacaktır.

![RemoveElementAction'ın
ayarları.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_5.png)\
*RemoveElementAction'ın ayarları.*

Klasik Behavior'larda olduğu gibi RemoveElementAction'ın da SourceName
ve EventName adında iki property'si ile Behavior'ın hangi kontrolün
hangi eventı çalıştığında çalıştırılacağına karar verebiliyoruz.
Sonrasında da TargetName ile sahneden kaldırılacak kontrolü behavior'a
teslim etmemiz gerekiyor. Bu noktada ekrandaki herhangi bir elementi
seçebilirsiniz, Behavior'ınız rahatlıkla çalışacaktır.

**ControlStoryboardAction**

Hayatınızı ciddi anlamda kolaylaştırabilecek Behavior'lardan biri de
ControlStoryBoardAction olacaktır. Tahmin edebileceğiniz üzere bu
Behavior herhangi bir kontrolün bir durumunda gidip bir animasyonu
çalıştırabilir, durdurabilir veya bu iki durum arasında toggle işlemi de
sağlayabilir. Tüm bunları bir satır bile kod yazmadan artık doğrudan
Blend arayüzünde ayarlayabilirsiniz.

![ControlStoryboardAction iş
başında.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_6.png)\
*ControlStoryboardAction iş başında.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere rahatlıkla bir
kontrolün MouseLeftButtonDown durumunda başka bir animasyonu
çalıştırabiliyoruz.

**ChangePropertyAction**

Varsayalım ki herhangi bir kontrolün bir property'sine ait değeri
değiştirmek istiyorsunuz. Bu çok basit bir şekilde nesnenin rengi
olabileceği gibi belki çok daha farklı bir özelliği de olabilir. Bunun
için arka tarafa geçip C\# veya VB kodu yazabilirsiniz fakat tasarımcı
gözü ile baktığımızda bu pek de sıcak bir seçenek değil. İşte bu gibi
durumlarda lowlevel bir Behavior olarak ChangePropertyAction karşımıza
çıkıyor ve herhangi bir kontrolün herhangi bir özelliğini istediğimiz
zaman değiştirebiliyor.

![ChangePropertyAction ile animasyon dahi
oluşturabilirsiniz.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_7.png)\
*ChangePropertyAction ile animasyon dahi oluşturabilirsiniz.*

ChangePropertyAction'ın TargetName özelliğine herhangi bir özelliğini
değiştirmek istediğiniz hedef kontrolünü aktarıyorsunuz. Bizim
örneğimizde Behavior'ın verildiği nesnenin ta kendisini değiştireceğimiz
için TargetName değerini Parent olarak kaldı. Sonrasında hedef elementin
hangi özelliğini değiştireceğimizi seçip yeni değeri veriyoruz. Eğer
isterseniz ek olarak bir de Animation properties tabından animasyon
ayarı yapabilirsiniz. Eğer seçtiğiniz hedef Property anime edilebilir
bir Property ise bu kısımda yazdığınız Duration (Süre) ve Ease (İvme)
ayarına göre animasyon oynatılacaktır. Bizim örneğimizde hedef nesnenin
Fill özelliğini değiştirdiğimiz animasyon çalışmayacaktır çünkü Fill
değil ancak Fill'in için SolidColorBrush'ının Color özelliği anime
edilebilir. Oysa Opacity Property'sini seçseydik doğrudan hedef kontol
üzerinden anima edebilirdik.

**FluidMoveBehavior**

Behavior'lar arasında en havalı efekte sahip Behavior ile karşı
karşıyayız :) FliudMoveBehavior'ın amacı herhangi bir Panel kontrolü
içerisindeki nesnelerin Panel kontrolü nedeniyle oluşan görsel
değişikliklerinin birer animasyon ile gerçekleşmesini sağlamak. Güzel ve
bir o kadar da anlaşılması zor bir cümle olduğunun farkındayım :) Şimdi
diyelim ki bir WrapPanel'iniz var ve içerisinde birçok kontrolünüz
bulunuyor. Bu kontroller WrapPanel'in durumuna göre yukarı aşağı
toparlanarak farklı satırlara veya aynı satıra toplanırlar. İşte bu
toplanma işleminde kontrollerin pozisyonları değişir fakat bu değişim
bir animasyon ile gerçekleşmez. FliudMoveBehavior bu değişimin bir
animasyon ile yapılmasını sağlar.

![FliudMoveBehavior ve WrapPanel
beraber.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_8.jpg)\
*FliudMoveBehavior ve WrapPanel beraber.*

Yukarıdaki ekran görüntüsünde inceleyebileceğiniz örneğimizde bir
Wrappanel içerisinde birçok düğme bulunuyor. Bu düğmeler duruma göre
WrapPanel içerisinde değişik yerlerde bulunacaklar. İşte bu konum
değişikleri de birer animasyonla yapılsın diye WrapPanel içine
FluidMoveBehavior'ı atıp efektin WrapPanel'e değil de WrapPanel içindeki
tüm kontrollere uygulanması gerektiğini de **Applies To** seçeneğine
**Children** değerini vererek belirtiyoruz. İsterseniz oluşturulacak
animasyonlar için süre ve easing de ayrıca Behavior üzerinden
ayarlayabilirsiniz.

İtiraf etmek gerekirse tüm Behavior'lar arasında hızlı bir şekilde
etkileyici görsel şölen yaratan en başarılı Behavior'lardan biri
FluidMoveBehavior. O nedenle kesinlikle denemenizi tavsiye ederim.

**GoToStateAction**

Son Behavior'ımızın adı GoToStateAction. Hatırlarsanız
**VisualStateManager** ile beraber neredeyse tüm kontrollerin farklı
State'leri vardı. Bu State'ler kontrollerin farklı durumlarında
tasarımcıların farklı tasarımlar ve hatta geçiş animasyonları yapmasını
sağlıyor. Yazılımcılarla tasarımcıların beraber çalıştığı projelerde
ayrıca özel UserControl'ler için de custom state tanımlamaları
yapılabiliyor. İşte tüm bu işlemlerde bir control'ün state'ini
değiştirmek için normalde yine kod tarafına geçerdir ama artık
**GoToStateAction** ile beraber buna gerek kalmıyor ve Blend içerisinde
de hangi kontrolün hangi durumunda herhangi bir kontrolün  farklı bir
State'ine geçiş yapılabileceğine karar verebiliyoruz.

![GoToStateAction'a ait
ayarlar.](media/Silverlight_3_ile_gelen_Behaviorlar/20082009_9.png)\
*GoToStateAction'a ait ayarlar.*

Behavior'ımızı herhangi bir kontrole ekleyip söz konusu kontrolün hangi
event'ında çalışacağına da karar verdikten sonra **TargetName** hedef
kontrolümüzü seçerek sonrasında da **StateName** kısmında da geçiş
yapılmasını istediğimiz hedef kontrolün State'ini seçiyoruz. Ayrıca
geçiş esnasında animasyon yapılmasını istiyorsanız **UserTransitions**
özelliğini de seçili tutmayı unutmayın.

**Sonuç olarak...**

Behavior'lar ciddi anlamda Blend kullanımını arttırarak olabildiğince
kod yazımını azaltabiliyor. Böylece hedef projeler çok daha hızlı bir
şekilde sonlandırılabilir. Yazılımcılar olarak isterseniz kendi
Behaviorlarınızı da yazabilirsiniz. O konuda da çok yakında ayrı bir
makale ile karşınıza olacağım.

Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2009-8-21 tarihinde yayinlanmistir.*
