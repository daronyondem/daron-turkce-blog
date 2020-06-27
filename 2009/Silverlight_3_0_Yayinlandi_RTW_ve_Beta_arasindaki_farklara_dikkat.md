---
FallbackID: 2379
Title: "Silverlight 3.0 Yayınlandı - RTW ve Beta arasındaki farklara dikkat."
date: "2009-7-12"
EntryID: Silverlight_3_0_Yayinlandi_RTW_ve_Beta_arasindaki_farklara_dikkat
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 2100c93d-88f4-45f3-a065-6096b2e5539e
---
Heyecanle beklenen an geldi ve Silverlight 3 yayınlandı. Beta sürümünden
Release'e kadar olan değişikliklere göz atacağımız bu yazıda önce gelin
Silverlight 3 dünyasına hızlıca nasıl gireriz bir göz atalım.

<http://www.silverlight.net/getstarted>

Silverlight dünyasına girmenin en kolay yolu hemen yukarıdaki adresi
ziyaret etmek. Bu adres içerisinde Silverlight 3 tarafında
bilgisayarınıza yüklemeniz gereken herşeyi bulabilirsiniz. Unutmadan,
eğer bilgisayarınızda Silverlight 3 Beta yüklemeleri varsa herşeyin
öncesinde bu yüklemeleri bilgisayarınızdan kaldırmayı unutmayın.

![Silverlight 3.0
Yüklemeleri](media/Silverlight_3_0_Yayinlandi_RTW_ve_Beta_arasindaki_farklara_dikkat/11072009_1.png)\
*Silverlight 3.0 Yüklemeleri*

Yukarıdaki ekran görüntüsünde silverlight.net sitesinin bir parçasını
görüyorsunuz. Burada ilk aşamada yer alan yüklemelere özellikle dikkat
etmek gerek. "Web Platform Installer" olarak geçen yükleme paketi
bilgisayarınız için gerekli tüm yüklemeleri yapabilir. Bu yüklemeler
içerisinde Visual Studio'nun Express sürümü ve SQL Express de dahil. WPI
ile ilgili ayrı bir yazı yazılabilir fakat şimdilik kabaca genel
anlamına değinmek yeterli olacaktır diye tahmin ediyorum. WPI'ın amacı
bilgisayarınıza tüm yazılım geliştirme platformunu yüklemektir. Yükleme
esnasından ASP.NET MVC'den PHP modüllerine kadar istediklerinizi
seçebilirsiniz.

Eğer bilgisayarınızda hali hazırda Visual Studio yüklü ise be zaten
"benim platformum hazır" diyorsanız bu sefer hızlıca "*download the
tools directly*" linkine tıklayıp **Visual Studio Tools for
Silverlight** paketini indirebilirsiniz. Böylece yazılım geliştirme
ortamınız Silverlight 3.0 ile tanışmış olacaktır.

**Expression Blend 3 RC**

Silverlight 3.0 ile beraber tabi ki yeni bir de Blend sürümüne
ihtiyacımız var. Expression Studio 3 daha yayınlanmadığı için
Silverlight 3.0'a özel olarak Expression Blend 3'ün RC sürümü
Silverlight'cılarla paylaşıldı. Çok yakın zamanda Expression Studio 3
ile beraber Blend 3 de release olacak. Şimdilik RC sürümü ile dahatlıkla
idare edebilirsiniz. Sketchflow kısmı eminim ki dikkatinizi çekecektir.
Bu konuda uzun uzun makale ve seminer planlarım var :)

Silverlight Toolkit ve DeepZoom tarafında da yeni gelişmeler var.
İndirip yeni sürümlerini ücretsiz olarak bilgisayarınıza kurabilirsiniz.
Özellikle DeepZoom Composer tarafında yeni menü navigasyon sistemlerini
incelemenizi tavsiye ederim. Ayrı makaleler bu konuda da çok yakında
karşınızda olacak.

**Silverlight 3.0 RTW ile değişenler?**

En büyük değişikliklerden biri Silverlight 3.0 SDK içerisinde yer alan
bazı kontrollerin doğrudan Toolkit içine taşınmış olması. Bu duruma çok
farklı yorumlar getirmek mümkün fakat esas yapılmak istenen şey bu
kontrolleri SDK içerisine eklemeden önce biraz daha feedback almak ve bu
süreçte de kontrolleri açık kaynak kodları ile beraber yazılım
geliştiriciler ile paylaşabilmek. O nedenle aşağıdaki kontrollerin hepsi
Beta SDK içerisinden Toolkit tarafına kaydırıldı.

DockPanel, WrapPanel, Expander, HeaderedContentControl, Viewbox,\
DataForm, ExpandDirection, ExpanderAutomationPeer, LengthConverter,
StretchDirection

**DataForm ve DataPager**

DataForm ve DataPager kontrollerinde büyük değişiklikler oldu. Artık
DataForm kontrolünün Fields adında bir collection'ı yok. Onun yerine
eskiden de olan Edit ve Normal modlar için özeleştirme sağlayan Template
yapıları kullanılacak. Eski Template yapılarında tasarımı sıfırdan
yaratırken bu sefer Template'ler içerisinde **IPagedCollectionView**
adında kontroller de kullanabileceğiz. Söz konusu DataField'ler
içerisine kendi kontrollerini koyarak özelleştirmeler yapabilirsiniz.
Açıkçası bu değişiklik benim çok hoşuma gitmedi. Eskisi özellikle
DataGrid ile çok daha uyumlu bir yazılımcı deneyimi sağlıyordu. Fakat
özünde bu değişikliklerin tekrar değişmesi de olası, çünkü ne de olsa bu
kontroller Toolkit içerisinde.

DataPager kontrolü tarafında ise **IPagedCollectionView** sınırlaması
kaldırılarak artık herhangi bir **IEnumerable** kullanılabilmesi
sağlanmış.

**MetaAttributes**

Özellikle DataForm içerisinde Fields Collection'ın kaldırılması
sonrasında canım biraz sıkılmıştı ki MetaAttributes tarafındaki
değişiklikler keyfimi yine getirdi. Genelde ister DataGrid olsun ister
DataForm, bizim Fields veya Columns collectionları editlememizin esas
nedeni bir kolonu göstermek istemememizden veya editlenmesini
istememizden kaynaklanır. AutoGenereateColumns/Fields özelliklerini
sevsek de kolon başına ayar yapabilmek için Field'leri elle yaratmamız
gerekiyordu.

**[VB]**

    \<Bindable(<span style="color: blue;">True</span>,
BindingDirection.TwoWay)\> \_

<span style="color: gray">    </span> <span
style="color: gray;">Private</span><span style="color: gray"> \_Ornek
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span>

<span style="color: gray">    </span> <span
style="color: gray;">Public</span> <span
style="color: gray;">Property</span><span style="color: gray"> Ornek()
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span>

<span style="color: gray">        </span> <span
style="color: gray;">Get</span>

<span style="color: gray">            </span> <span
style="color: gray;">Return</span><span style="color: gray">
\_Ornek</span>

<span style="color: gray">        </span> <span
style="color: gray;">End</span> <span style="color: gray;">Get</span>

<span style="color: gray">        </span> <span
style="color: gray;">Set</span>(<span
style="color: gray;">ByVal</span><span style="color: gray"> value
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span><span style="color: gray">)</span>

            \_Ornek = value

<span style="color: gray">        </span> <span
style="color: gray;">End</span> <span style="color: gray;">Set</span>

<span style="color: gray">    </span> <span
style="color: gray;">End</span> <span
style="color: gray;">Property</span>

Eskiden uygulayabildiğimiz yukarıdaki teknik ile bir Property'nin
Bindable olup olmadığını hatta ne şekilde Bind edilebileceğini de
ayarlayabiliyorduk. Yeni SL 3.0 RTW ile bu MetaAttribute'ler biraz
değişti.

**[VB]**

    \<Display(AutoGenerateField:=<span
style="color: blue;">True</span>)\> \_

    \<Editable(<span style="color: blue;">False</span>)\> \_

<span style="color: gray">    </span> <span
style="color: gray;">Private</span><span style="color: gray"> \_Ornek
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span>

<span style="color: gray">    </span> <span
style="color: gray;">Public</span> <span
style="color: gray;">Property</span><span style="color: gray"> Ornek()
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span>

<span style="color: gray">        </span> <span
style="color: gray;">Get</span>

<span style="color: gray">            </span> <span
style="color: gray;">Return</span><span style="color: gray">
\_Ornek</span>

<span style="color: gray">        </span> <span
style="color: gray;">End</span> <span style="color: gray;">Get</span>

<span style="color: gray">        </span> <span
style="color: gray;">Set</span>(<span
style="color: gray;">ByVal</span><span style="color: gray"> value
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String</span><span style="color: gray">)</span>

            \_Ornek = value

<span style="color: gray">        </span> <span
style="color: gray;">End</span> <span style="color: gray;">Set</span>

<span style="color: gray">    </span> <span
style="color: gray;">End</span> <span
style="color: gray;">Property</span>

Artık çok daha kolay bir şekilde doğrudan bir Property'nin
**AutoGenerateField** aşamasında yaratılıp yaratılmayacağını
belirleyebiliyor veya **Editable** ile bu özelliğini editlenebilir olup
olmadığı bilgisini de aktarabiliyoruz. Bunun gibi yaratılacak olan
kolonun kaçıncı sırada olacağını veya kolon adını da aşağıdaki şekilde
belirtebilirsiniz.

**[VB]**

    \<Display(AutoGenerateField:=<span style="color: blue;">True</span>,
Name:=<span style="color: #a31515;">"Kolon Adı"</span>, Order:=1)\> \_

    \<Editable(<span style="color: blue;">False</span>)\> \_

<span style="color: gray">    </span> <span
style="color: gray;">Private</span><span style="color: gray"> \_Ornek
</span> <span style="color: gray;">As</span> <span
style="color: gray;">String ....</span>

**Navigation Framework**

Silverlight 3.0 Beta ile karşılaştığımız Navigation Framework içerisinde
de ciddi değişiklikler var. Eski halinde **UriMapper'ımızı** App.XAML
içerisinde yaratmak zorunda olup bir de bunun üzerine yarattığımız
**Mapper** sınıfının instance'ına ait ismin de uriMapper olmak zorunda
olması ciddi anlamda saçmalıktı :) Tabi ki bu durum düzeltilmiş ve artık
uriMapper'larınızı UserControl içerisinde de yaratabiliyor ve
istediğiniz ismi verebiliyorsunuz. Sonrasında da uriMapper'ı elle
istediğiniz bir frame'e bağlamanız gerekiyor.

**[XAML]**

<span style="color: #A31515">....</span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigationCore</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Key</span><span
style="color: blue;">="**HerhangiBirMapper**"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigationCore</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapping</span><span style="color: red;">
Uri</span><span style="color: blue;">="Siparis"</span><span
style="color: red;"> MappedUri</span><span
style="color: blue;">="/Sayfalar/Siparis.xaml" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">navigationCore</span><span
style="color: blue;">:</span><span
style="color: #a31515;">UriMapper</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">navigation</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Frame</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="frame"</span><span style="color: red;">
UriMapper</span><span style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
**HerhangiBirMapper**</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\>\
 .....</span>

Son olarak eskiden herhangi bir UserControl'ü de içine alabilen
frame'ler artık sadece Page'den Inherit edilmiş sayfaları alabilecek.

**Diğer mini değişiklikler...**

**PixelShader Efektleri :** Eskiden Content veya Resource olarak
projelere eklenebilen PS dosyaları rahatlıkla kullanılabiliyordu artık
sadece Resource olarak ayarlanmış PS dosyaları PixelShader olarak
kullanılabilecek.

**OutOfBrowser Desktop Uygulamaları**: Eskiden Detach komutu yeni
sürümde Install olarak değiştirildi. Yeni komut :
**App.Current.Install()** Aynı şekilde eski App.Current.RunningOffline
da **App.Current.IsRunningOutOfBrowser** oldu. ExecutionStateChanged,
**InstallStateChanged** şeklinde değiştirildi. Ayrıca OutOfBrowser
uygulamaları ile ilgili yaratılan XAML kodu da tamamen değiştirilecek
harici bir **OutOfBrowserSettings.xml** dosyasında tutulması gerekiyor.

**[OutOfBrowserSettings.xml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">OutOfBrowserSettings</span><span
style="color: blue;"> </span><span
style="color: red;">ShortName</span><span
style="color: blue;">=</span>"<span style="color: blue;">Kısayol
Adı</span>"<span style="color: blue;"> </span><span
style="color: red;">EnableGPUAcceleration</span><span
style="color: blue;">=</span>"<span
style="color: blue;">False</span>"<span style="color: blue;">
</span><span style="color: red;">ShowInstallMenuItem</span><span
style="color: blue;">=</span>"<span
style="color: blue;">True</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">OutOfBrowserSettings.Blurb</span><span
style="color: blue;">\></span>Açıklama tooltip<span
style="color: blue;">\</</span><span
style="color: #a31515;">OutOfBrowserSettings.Blurb</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">OutOfBrowserSettings.WindowSettings</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">WindowSettings</span><span style="color: blue;">
</span><span style="color: red;">Title</span><span
style="color: blue;">=</span>"<span style="color: blue;">Pencere
adı</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">OutOfBrowserSettings.WindowSettings</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">OutOfBrowserSettings.Icons</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">
</span><span style="color: red;">Size</span><span
style="color: blue;">=</span>"<span
style="color: blue;">16,16</span>"<span
style="color: blue;">\></span>1.png<span
style="color: blue;">\</</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">
</span><span style="color: red;">Size</span><span
style="color: blue;">=</span>"<span
style="color: blue;">32,32</span>"<span
style="color: blue;">\></span>2.png<span
style="color: blue;">\</</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">
</span><span style="color: red;">Size</span><span
style="color: blue;">=</span>"<span
style="color: blue;">48,48</span>"<span
style="color: blue;">\></span>3.png<span
style="color: blue;">\</</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">
</span><span style="color: red;">Size</span><span
style="color: blue;">=</span>"<span
style="color: blue;">128,128</span>"<span
style="color: blue;">\></span>4.png<span
style="color: blue;">\</</span><span
style="color: #a31515;">Icon</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">OutOfBrowserSettings.Icons</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">OutOfBrowserSettings</span><span
style="color: blue;">\></span>

**Visual Studio 2008'de Design arayüzü?** Artık yok! Yanlış duymadınız
:) artık Visual Studio 2008 içerisinde Silverlight XAML dosyalarını
açtığınızda otomatik olarak XAML kod kısmı açılacak ve Preview kısmı
olmayacak. Aslında bu kadar çok doğru bir karar çünkü design modunda
"design" yapılamadığı için :) zaten pek de anlamlı olmuyordu ve gereksiz
yere işleyişi yavaşlatıyordu. Visual Studio 2010'a kadar Silverlight
projelerinde Visual Studio içerisinde design penceresi olmayacak.

**Silverlight.js** dosyasında ufak değişiklikler var. İsteyenler hemen
buradan indirebilirler: <http://code.msdn.microsoft.com/silverlightjs>

**.NET Ria Services** artık Go-Live lisansına sahip. Yani sorumluluk
size ait olsa da kullandığınız projeleri yayınlayabilirsiniz. Fakat bu
tabi ki RIA Services'in release olduğu anlamına gelmiyor.

Eminim ki unuttuğum bir çok değişiklik veya yenilik vardır. Onları da en
kısa zamanda ayrı ayrı makaleler olarak sizlerle paylaşmak üzere...


