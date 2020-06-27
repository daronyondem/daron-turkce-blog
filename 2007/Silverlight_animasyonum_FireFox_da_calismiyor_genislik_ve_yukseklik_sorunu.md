---
FallbackID: 1850
Title: "Silverlight animasyonum FireFox'da çalışmıyor! "100%" genişlik ve yükseklik sorunu."
date: "2007-11-14"
EntryID: Silverlight_animasyonum_FireFox_da_calismiyor_genislik_ve_yukseklik_sorunu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: a0323ab1-6402-413a-a973-949320c362ca
---
# Silverlight animasyonum FireFox'da çalışmıyor! 100% genişlik ve yükseklik sorunu.
Daha önceki blog yazılarımdan
[birinde](http://daron.yondem.com/tr/post/22ed2164-f1bf-4fd4-a25e-1cab7bb7059b)
Türkiye'nin ilk kurumsal Silverlight uygulaması olarak DEVELOAD
Yazılım'a ait [web sitesini](http://www.deveload.com/) sizlerin
beğeninize sunmuştum. O zamanlar pek önemsemediğimiz için sitenin
FireFox ile uyumlu olup olmaması konusunda bir çalışma yapmamıştık.
Açıkçası hala pek önemsemiyoruz çünkü hem uluslararası çalışmalardan hem
de yurt içi sitelerden aldığımız istatistiklerde hala FireFox'un
yaygınlığı %5'i bulamadı. Neyse biz konumuza dönelim.

O tarihlerden beridir Silverlight'ın kullanımı ile ilgili yerli bir
örnek vermem gerektiğinde [www.deveload.com'u](http://www.deveload.com)
veriyorum. Tabi ki bunu reklam olması amacıyla yapmıyorum :) DEVELOAD
tarafında sitemizi Silverlight ile yenilerken amacımız Silverlight
olmadan önce Flash ile yaptığımız tarz uygulamaların tıpatıp aynılarının
Silverlight ile de başarılı ve kolay bir şekilde yapılabildiğini
göstermekti. Fakat her yaptığım demoda önce Silverlight'ın cross-browser
olduğundan bahsedip sonra da cross-browser olmayan bir örnek göstermek
her tür açıklamama rağmen biraz komik oluyordu :) Malum söz konusu
sitenin FireFox uyumsuz olması tamamen bizim yazdığımız kodlardan
kaynaklanıyordu (öyle sanıyorduk) Silverlight'ın kendisinden değil.

Sözün özü, biraz önce bu konuya el atarak acaba nedir bu kodların
FireFox'da çalışmamasının nedeni diyerek ufak bir çalışmaya giriştim ve
tabi ki sorunu buldum.

Sorun maalesef yazdığımız JavaScript kodları ile alakalı değil :)
Silverlight ile ilgiliymiş :) Site içerisinde genel olarak kullanılan
100% genişlikte ve 100% yükseklikte bir Silverlight animasyonu var. Bu
animasyonun üzerine bir katman (DIV) yerleştirilerek ekstra içerik
gösteriliyor. Silverlight animasyonunun genişliğinin ve yüksekliğinin
100% olması için animasyona aşağıdaki parametreleri vermişiz.

<span style="color: blue;">function</span> createSilverlight()

{

  <span style="color: blue;">var</span> scene = <span
style="color: blue;">new</span> DEVELOAD\_SV.Page();

  Silverlight.createObjectEx({

    source: <span style="color: #a31515;">"Page.xaml"</span>,

    parentElement: document.getElementById(<span
style="color: #a31515;">"DEVELOAD\_Host"</span>),

    id: <span style="color: #a31515;">"DEVELOAD\_Host"</span>,

    properties: {

      **width:** <span style="color: #a31515;"> **"100%"**</span>,

      **height:** <span style="color: #a31515;"> **"100%"**</span>,

      version: <span style="color: #a31515;">"1.0"</span>,

      isWindowless: <span style="color: #a31515;">"True"</span>

    },

    events: {

      onLoad: Silverlight.createDelegate(scene, scene.handleLoad)

    }

  });

}

Maalesef Silverlight animasyonu ile ilgili verilen bu parametrelerdeki
değerler eğer yüzde üzerinden verilmiş ise FireFox'da herhangi bir
görüntü alamıyorsunuz. Internet Explorer içerisinde ise hiçbir sorun
yok. Aslında bu sorun FireFox içerisinde normal HTML elementlerinde de
var ve çözüm olarak sayfadaki HTML ve BODY taglarına da aynı CSS
özelliklerini vermek yeterli oluyor. Fakat Silverlight için bu da
yeterli değil. Çok daha farklı bir çözüm gerekiyor.

DEVELOAD\_SV.Page.prototype =

{

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    <span style="color: blue;">if</span> (window.innerHeight)

    {         

      \$get(<span
style="color: #a31515;">'DEVELOAD\_Host'</span>).style.height =
window.innerHeight + <span style="color: #a31515;">"px"</span>;

    }

  }

}

Yukarıdaki koddan da anlaşılacağı gibi Silverlight animasyonu yüklenir
yüklenmez bir boyutlandırma işlemi başlatıyoruz. Sorun tamamen
animasyonun boyutunun tanımlanamaması ile alakalı. FireFox içerisinde
animasyon yükleniyor ve Silverlight çalışıyor fakat yüzde olarak verilen
genişlik ve yükseklik değerleri geçersiz olduğu için ekranda gözükmüyor.
Bu nedenle animasyon yüklendiğinde çalıştırılan **handleLoad**
fonksiyonu içerisinde ilk olarak **window.innerHeight** diye bir
özelliğin olup olmadığını kontrol ederek FireFox gibi bir tarayıcıda
olup olmadığımızı anladıktan sonra gerekiyorsa Silverlight nesnesini
yakalayarak yüksekliğini pencerenin yüksekliğine eşitliyoruz. Aynı
şekilde genişliğini de düzenleyebilirsiniz. Böylece animasyonunuz ekrana
tamamen yayılacaktır.

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2007-11-14 tarihinde yayinlanmistir.*
