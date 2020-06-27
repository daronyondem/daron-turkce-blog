---
FallbackID: 2403
Title: "Expression Blend ve SketchFlow"
date: "2009-9-6"
EntryID: Expression_Blend_ve_SketchFlow
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, Silverlight 3.0, WPF
old.EntryID: e0d0be38-40f8-4f2a-bd25-ae1ec516ceb9
---
# Expression Blend ve SketchFlow
Neredeyse her tür yazılım projesinde prototip geliştirmek çoğu zaman
başvurduğumuz bir süreç oluyor. Bazen bu prototipleri sadece yapacağımız
projenin fizibilitesini ölçmek amacı ile geliştirsek de bazen de
amacımız müşterimize gelecekte elde edeceği ürünü kabaca göstermek de
olabiliyor. İşin en sıkıcı tarafı ise çoğu zaman bu prototiplerin teklif
aşamasında kullanılması nedeniyle aslında kuyuya atılan bir taştan
farklı olmamaları. Yani prototipiniz karşılığında eğer hedef projeyi
teklifiniz ile alamazsanız hiçbir ücret alamayabilirsiniz. Sektörde
karşılaşabileceğiniz farklı senaryolara değinmek yerine işin biraz daha
teknik kısmına geçip bu süreçlerde işimizi kolaylaştırmak adına neler
yapabiliriz ve bu çerçevede Expression Blend bize nasıl yardımcı
olabilir sorularına cevap vereceğiz.

**Sketchflow**

Expression Blend 3 ile beraber SketchFlow denilen bir mekanizma, proje
şablonu geliyor. Sketchflow'un amacı prototip geliştirmeyi
kolaylaştırmak ve olabildiğince bu süreçlerde müşteri ile interaktif bir
sistem sağlamak. Sketchflow projelerini hem WPF hem de Silverlight
tarafında kullanabilirsiniz. Her iki altyapıda da aynı şekilde
çalışıyor. Hemen Expression Blend ile yeni bir Silverlight Sketchflow
projesi yaratalım.

![İlk Sketchflow projemizi
yaratıyoruz.](media/Expression_Blend_ve_SketchFlow/06092009_1.png)\
*İlk Sketchflow projemizi yaratıyoruz.*

Normal bir Blend projesine göre Sketchflow projeleri Blend ile
açıldığında ekranda iki farklı bölüm daha oluşacaktır. Bu bölümlerden
birinin adı "Map" diğeri ise "Sketchflow Animation" şeklinde.
Sketcthflow'un mantığında prototip geliştirmek olduğu için
geliştireceğiniz prototip uygulamanın haritası tabi ki çok önemli.
Uygulamada hangi sayfalar olacak? Hangi sayfadan hangi sayfaya geçişler
yapılacak? gibi tüm soruları harita üzerinde gerekli kontrolleri
yarattıkça cevaplamış oluyorsunuz.

![SkethFlow projelerinde Map üzerinde
çalışmak.](media/Expression_Blend_ve_SketchFlow/06092009_2.png)

Skethflow ile bir prototip geliştirirken tüm projenizin bir haritasını
yarattığınızı düşünebilirsiniz. Her ekranınız için haritada bir sayfa
yaratmanız gerekiyor. Sayfalara farklı isimler verebilirsiniz. Herhangi
bir sayfanın fare ile üzerine geldiğinde yukarıdaki görselde
görebileceğiniz gibi bir menü gözükecektir. Bu menüde en sağdaki düğmeye
bastığınızda söz konusu sayfanın harita üzerindeki rengini
değiştirebilirsiniz. Böylece harita çok daha anlamlı ve okunaklı
olacaktır. Diğer yandan haritadaki sayfaları birbirlerine uygun şekilde
bağlayarak haritadınızı tamamlamak da çok önemli. Bunu yapmak için ister
sayfaları tek tek yaratıp sonra menülerindeki soldan ikinci düğmeyi
kullanarak sayfaları birbirlerine bağlayın ister herhangi bir sayfanın
altındaki menüden soldan ilk düğmeyi kullanarak söz konusu sayfaya
bağlantılı yeni bir sayfa yaratın, seçim sizin. Son olarak her sayfanın
menüsünde soldan üçüncü düğme ise birden çok sayfada kullanılabilecek
Component'ler oluşturmanızı sağlayacaktır. Bu konuyu da ileride
detaylıca inceleyeceğiz.

Harita üzerinde yaptığınız her işlem otomatik olarak projenize
yansıyacaktır. Harita içerisinde oluşturduğunuz sayfalar aslında
projenizdeki ayrı bir XAML olarak saklanacaktır. Bu XAML sayfalarını
ayrı ayrı açıp her zamanki gibi Blend içerisinde tasarımınızı
yapabilirsiniz.

**Tasarım yaparkan kullandığınız stillere dikkat!**

Unutmayın ki bir prototip tasarlıyoruz. Prototipte amacımız ürünü
müşteriye beğendirmekten öte aslında ileride ne gibi bir ürünle
karşılaşacağına dair fikir vermek. Eğer projenin tüm görsel tasarımını
da yapmak zorunda kalırsak işimiz ciddi zorlaşabilir. Oysa dediğimiz
gibi yapmak istediğimiz şey sadece "nasıl birşey olacak?" kısmını
müşteriye göstermek ve görsel detaylara takılmalarını olabildiğince
engellemek.

Bunun için Sketchflow projelerinde kullanabileceğiniz özel olarak
stillerle değiştirilmiş kontroller bulunuyor. "Asset Library" altında
"Styles" tabına göz atarsanız normal projelerde bulunmayan
**SketchStyles** seçeneğini bulacaksınız.

![Sketchflow'a özel
SketchStyles.](media/Expression_Blend_ve_SketchFlow/06092009_3.png)\
*Sketchflow'a özel SketchStyles.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere SketchStyles
kontrollerini kullandığımızda zaten kontrollerin tasarımları gereği
müşterimize "bu bir konsept tasarımdır" mesajını vermiş oluyoruz. Kimse
bu şekilde hazırlanmış bir ekran görüntüsünün tasarımını eleştirmeyecek
ve herkes tasarımın konsept olarak geliştirildiğini anlayacaktır.
Böylece bir dertten daha kurtularak prototipimizi geliştirmeye devam
edebiliriz.

**Navigasyon**

Ekranlarınızı tek tek tasarladıkça ekranlar arası geçişlerin de nasıl
yapılabileceği önem kazanacaktır. Bir prototip ürettiğimize göre kod ile
sayfalar arası geçiş yapacak değiliz. Konunun çok daha basit bir çözümü
olsa gerek. Herhangi bir kontrol üzerine ekranda sağ fare tuşu ile
tıklarsanız karşınıza gelen menünün en altında **Navigate** komutunu
bulabilirsiniz.

![Navigasyonun kolay
yolu.](media/Expression_Blend_ve_SketchFlow/06092009_4.png)\
*Navigasyonun kolay yolu.*

Gördüğünüz gibi içerisinde olduğumuz **Giris** sayfasında
gidebileceğimiz tüm seçenekler **Navigate To** menüsünde bulunuyor. Şu
an için uygulamamızın haritasında **Giris** sayfası ile **Sonuc**
sayfası birbiri ile ilişkilendirimiş değil. Yine de **Navigate To**
menüsünden eğer Sonuc sayfasını seçerseniz uygulama haritanız da bu
bilgiye göre yenilenecek ve **Giris** ile **Sonuc** sayfaları birbiri
ile ilişkilendirilecektir.

*Not: SketchFlow projelerinde Blend Behavior'larını kullanabilirsiniz.
Bu şekilde çok daha zengin işlevsellikteki prototipleri tek satır bile
kod yazmadan yaratabilirsiniz.*

**Animasyonlar?**

SketchFlow projelerinizde isterseniz StoryBoard'lar kullanabilirsiniz
fakat genelde prototip üretirken çok kompleks animasyonlar yerine genel
anlamda ekranla ilgili animasyonları üretmek daha mantıklı olacaktır.
Örneğin ekrandaki bir menü gözüküp kaybolacak veya soldan alışveriş
sepeti gelecek gibi bir animasyon çok daha anlamlı olabilir. Bu gibi
durumlarda StoryBoard'lara kıyasla daha kolay kullanılabilen SketchFlow
Animation'larından faydalanabilirsiniz.

![SketchFlow animasyonlarını yaratmanın
yolu.](media/Expression_Blend_ve_SketchFlow/06092009_5.png)

SkethFlow animasyonlarında tüm ekranın aslında birer State serisi olarak
kaydedildiğini düşünebilirsiniz. Ekranın farklı durumları vardır ve
bunlar ayrı ayrı kareler olarak kaydedilerek bu kareler arası geçiş
süreleri, ivmeleri vs belirlenir. Sonrasında bu animasyon herhangi bir
kontrol tarafından hızlıca tetiklenebilir.

![SkethFlow animasyonlarını
oynatırken.](media/Expression_Blend_ve_SketchFlow/06092009_6.png)\
*SkethFlow animasyonlarını oynatırken.*

Herhangi bir kontrole sağ tıkladıktan sonra gelen menüde "Play SkethFlow
Animation" seçeneğini göreceksiniz. Bu seçenek altında projenizde
bulunan animasyonların bir listesi bulunacaktır. İstediğinizi seçerek
söz konusu kontrol tarafından animasyonun tetiklenmesini
sağlayabilirsiniz.

**Prototipi yayınlayalım!**

Prototipiniz tamamen hazır olduktan sonra büyük ihtimal ile çalışmanızı
müşteriniz ile paylaşmak isteyeceksiniz. Bu gibi bir durumda yardımızda
"**SketchFlow Player**" yetişecek. SketchFlow projelerinin ayrı
kenilerine özel player yazılımları var. Bu yazılımlar WPF tarafında ve
Silverlight tarafında tamamen aynı gibi gözükse de aslında WPF'te bir
EXE olarak Silverlight'ta ise bir web sitesi olarak karşımıza
çıkıyorlar. Projenizi bitirdikten sonra Blend içerisinde F5'e basmanız
yeterli olacaktır.

![SketchFlow Player
karşınızda.](media/Expression_Blend_ve_SketchFlow/06092009_7.png)\
*SketchFlow Player karşınızda.*

Bahsettiğimiz üzere SketchFlow player duruma göre bir Silverlight veya
WPF uygulaması olabiliyor. Player içerisinde prototipinizdeki tüm
sayfalar gösterilir. Sol üst "Navigate" ekranın sürekli olarak
içerisinde bulunan sayfadan hangi sayfalara geçiş yapılabileceği
gösterilir. Sol altta ise uygulamanın haritası görülebilir. Tabi ana
ekranda ise prototipiniz gösterilir ve herşey tıklanabilir,
kullanılabilir durumdadır. İşin en güzel tarafı ise müşteriniz bu player
üzerinden projeyi incelerken yorumlar da yapabilir.

![Müşteriden gelen
yorumlar.](media/Expression_Blend_ve_SketchFlow/06092009_8.png)\
*Müşteriden gelen yorumlar.*

SketchFlow Player içerisinde rahatlıkla müşteriniz "Feedback" ekranını
kullanarak doğrudan proje üzerine yorumlarını ekleyebilir. Bu yorumlar
sonrasında Export düğmesi ile bir XML'e alınıp Blend içerisinde de
açılabiliyor. "Window" menüsünden "Feedback" kısmını ekrana getirdikten
sonra müşterinizden gelen XML'i ekleyerek doğrudan projeniz üzerinde
görebilirsiniz.

![Müşteri yorumları Blend
içerisinde.](media/Expression_Blend_ve_SketchFlow/06092009_9.png)\
*Müşteri yorumları Blend içerisinde.*

**Müşterim ekran görüntülerini teklifin içinde istiyor!**

Biliyorum, bazı müşteriler illa ekran görüntülerini ve prototipi kağıt
üzerinde görmek ister. Dokümanlamak isterler. Konumuz müşterinin haklı
veya haksız olduğu olmadığına göre biz bu işi nasıl çözeriz ona bakalım.
Aslında pek bakacak birşey de yok, çünkü işimiz çok kolay. Prototipiniz
bittikten sonra "File" menüsünden "**Export to Microsoft Word**"
komutunu verebilirsiniz.

![Projemizin detayları bir Word
dokümanında.](media/Expression_Blend_ve_SketchFlow/06092009_10.png)\
*Projemizin detayları bir Word dokümanında.*

Projenizdeki her ekran ayrı birer sayfada ekran görüntüsü ile beraber
Word'e aktarılacaktır. Dokümanın ilk sayfasında hem projenizin haritası
hem de iç sayfalara dair linkler ve indeks de otomatik olarak
hazırlanacaktır. Eh, gönül daha ne ister?

Expression Blend içerisinde SketchFlow hangi amaçla kullanırsanız
kullanın müşterilerinizle ilişkinizi kolaylaştıracağı veya bir adım
ileriye taşıyacağı kesin.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-9-6 tarihinde yayinlanmistir.*
