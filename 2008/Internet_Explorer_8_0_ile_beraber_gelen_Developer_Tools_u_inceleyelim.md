---
FallbackID: 2183
Title: Internet Explorer 8.0 ile beraber gelen Developer Tools'u inceleyelim.
PublishDate: 12/9/2008
EntryID: Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: 349de328-1866-4210-bd2c-409c01121ff5
---
Internet Explorer içerisinde en büyük eksikliklerden biri de biz yazılım
geliştiriciler için gerekli profilleme de hata bulma araçlarına sahip
olmamasıydı. Bunun için bazı durumlarda harici eklentiler kullanırken
bazen alternatif tarayıcılara da yönelmek zorunda kalıyorduk. Bu
yazımızda yukarıda bahsi geçen sorunları çözme amacıyla Internet
Explorer 8.0'a eklenmiş olan "Developer Tools" uygulamasını
inceleyeceğiz.

**CSS ve HTML DOM gerçek zamanlı düzenleme**

Internet Explorer 8.0 içerisinde Tools menüsünden ulaşabileceğiniz
"**Developer Tools**" ayrı bir pencerede ayrı bir programmış gibi açılsa
da tabi ki tarayıcı ile entegre çalışıyor. Açılan "Developer Tools"
penceresinin sağ üst köşesinde "Pin" düğmesine basarsanız bu pencere
kendini IE içerisine yerleştirecektir. Açtığınız herhangi bir sitenin 
HTML DOM'unu incelemenin yanı sıra CSS konusunda raporlar da
alabiliyorsunuz. Hangi CSS sınıfının nereden geldiği, ve sayfada geçerli
olup olmadığını görebiliyorsunuz. Örneğin harici bir CSS ayarı local
satır içi bir stil ayarı ile devre dışı bırakılmış olabilir. Tüm bunları
rahatlıkla bir liste olarak görmek mümkün.

![CSS ve DOM tam kontrol
altında!](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_1.png)\
*CSS ve DOM tam kontrol altında!*

Yukarıdaki gördüğünüz ekranda sol tarafta sayfanın DOM ağacını
inceleyebilirsiniz. DOM içerisinde herhangi bir element özel olarak
seçildiğinde o elementi etkileyen tüm CSS sınıfları, özellikleri ve bu
özelliklerin nereden geldikleri sağ tarafta görülebiliyor. Daha da
güzeli sağ taraftaki herhangi bir özelliğe tıklarsanız istediğiniz bir
değeri değiştirerek IE içerisinde gerçek zamanlı olarak sonucu
görebiliyorsunuz.

İsterseniz "Developer Tools" içerisinde HTML tabından CSS tabına geçerek
doğrudan sayfadaki tüm CSS özelliklerini yakalayabilir ve gerçek zamanlı
olarak değişiklikler de yapabilirsiniz. Tüm bu değişiklikleri
tamamladıktan sonra araç çubuğundaki "Kaydet" düğmesine basmanız CSS
dosyanızın o anki hali ile kaydedilmesi için yeterli.

**JavaScript Debuging**

Visual Studio içerisinde JavaScript Debuging'e kıyasla çok daha başarılı
bulduğum IE 8.0 Developer Tools içerisinde JavaScript araçlarının en
büyük avantajı doğrudan IE ile beraber çalıştıkları için tarayıcı
içerisindeki tüm aktiviteyi takip edebiliyor olmak. İsterseniz herhangi
bir JavaScript değişkenine aynı Visual Studio içerisinde VB veya C\#
kodlarına yaptığımız gibi Watch'lar ekleyin veya istediğiniz bir adıma
BreakPoint yerleştirin. Hatta F10 ve F5 gibi Visual Studio kısayolları
bile aynı.

![JavaScript tarafında Watch koyarak durumu takip
edin.](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_2.png)\
*JavaScript tarafında Watch koyarak durumu takip edin.*

Özellikle Silverlight 1.0 tarafında yazılan JavaScript kodlarının veya
AJAX tarafında yazılan veri ulaşım kodlarının incelenmesi ve hataların
bulunması epey kolaylaşmış durumda. Aşağıdaki görsel içerisinde
JavaScript ile tanımlanmış bir Silverlight nesnesinin **Source**
özelliğine verilen değeri doğrudan "Locals" tabı üzerinden giderek
sayfada tanımlanmış tüm JavaScript nesnelerini listeleyip bulabiliyoruz.
Tüm bunları yaparken istediğiniz anda herhangi bir değişkenin değerini
Developer Tools içerisinde değiştirebilirsiniz, sonucu gerçek zamanlı
olarak IE içerisinde göreceksiniz.

![JavaScript tarafındaki sayfada bulunan tüm nesneler ve değişkenler
düzenlenebiliyor.](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_3.png)\
*JavaScript tarafındaki sayfada bulunan tüm nesneler ve değişkenler
düzenlenebiliyor.*

**Profiler ile optimizasyon**

Yazdığımız kodun ne kadar optimize olduğunu anlamak çok önemli. Bunun
için tam olarak hangi kodun daha çok zaman aldığını bilmeliyiz.
Özellikle SQL tarafında alışık olduğumuz Profiler sistemine benzeyen bir
yapı ile artık IE üzerinde de Developer Tools içerisinde bir Profiler
bulunuyor. "Start Profiler" düğmesine bastıktan sonra IE penceresine
geçip site üzerinde istediğiniz işlemleri yapabiliyorsunuz. Sonra
Developer Tools'a dönerek "Stop Profiler" dediğinizde geçen süre
içerisinde yaptığınız tüm işlemlerin bir listesi karşınıza çıkıyor. Bu
listeyi ister bir "Function" listesi olarak alın ister bir ağaç
görüntüsünde hangi function'ın hangisini çağırdığına bakarak inceleyin.
Önemli olan artık hangi işlemin ne kadar sürdüğünü görebiliyor olmamız.

![Kod optimizasyonu için
Profiler](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_4.png)\
*Kod optimizasyonu için Profiler*

**Image Optimizasyonu**

Bazı durumlarda bir web sitesine koyduğumuz resmin hem en ve boy boyutu
hem de dosya boyutuna bakabilmek için doğrudan dosyanın kendisini
bulmamız gerekebilir. Developer Tools içerisinde Image menüsü böyle bir
durumda yardımımıza koşuyor ve doğrudan gerçek zamanlı olarak gezdiğiniz
tüm sitelerdeki resimlerin boyutlarını resimlerin üzerine yazıyor.
Gerçekten hoş bir özellik.

![Gerçek zamanlı olarak sitedeki resimlerle ilgili detayları
görebilirsiniz.](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_5.png)\
*Gerçek zamanlı olarak sitedeki resimlerle ilgili detayları
görebilirsiniz.*

**Pratik araçlar**

Bir sayfadaki tüm DIV'leri görmek mi istiyorsunuz, tek yapmanız gereken
"Outline" menüsünden DIV seçeneğini işaretlemek. Böylece gerçek zamanlı
olarak sayfa içerisinde tüm DIV'ler ayrıca birer çerçeve içine
alınacaktır. Sadece DIV elementleri değil istediğiniz bir elementi
kendiniz de belirterek aranmasını sağlayabilirsiniz.

Tools menüsünden "Show Ruler" özelliği ile fare ile ekranda tıkladığınız
iki nokta arasında mesafeyi piksel olarak ölçebilir bu mesafeler
arasında X ve Y koordinatları farkları görebilirsiniz.

![Pratik araçlardan biri :
Cetvel!](media/Internet_Explorer_8_0_ile_beraber_gelen_Developer_Tools_u_inceleyelim/11092008_6.png)\
*Pratik araçlardan biri : Cetvel!*

Aynı menüdeki "Show Color Picker" ile gezdiğiniz sitedeki herhangi bir
rengi seçebilir RGB ve HEX renk kodlarını alabilirsiniz. "Resize"
menüsünden ekran çözünürlükleri seçerek tarayıcının otomatik olarak
farklı ekran çözünürlüğündeymiş gibi boyutlandırılmasını
sağlayabilirsiniz.

**Sonuç**

IE 8.0 çok ilginç ve güzel yenilikler ile geliyor. IE içerisinde bu
kadar geniş özelliklere sahip bir  Developer Tools paketi görmek çok
sevindirici. Umarım daha yeni özellikler ile IE'nin sonraki sürümlerinde
de gelişmeye devam eder.

Hepinize kolay gelsin.


