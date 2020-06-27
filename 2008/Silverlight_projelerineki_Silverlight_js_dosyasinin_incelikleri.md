---
FallbackID: 1951
Title: "Silverlight projelerineki Silverlight.js dosyasının incelikleri."
date: "2008-2-9"
EntryID: Silverlight_projelerineki_Silverlight_js_dosyasinin_incelikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 6ff37001-ac18-4698-900a-bee025187001
---
# Silverlight projelerineki Silverlight.js dosyasının incelikleri.
Her Silverlight projesinde yer alan en önemli dosyalardan biri
**Silverlight.js** dosyasıdır. Bu dosya içerisinde özünde üç farklı
JavaScript fonksiyonu tanımlanmıştır. Bunlar **createObject**,
**createObjectEx** ve **isInstalled** fonksiyonlarıdır. Bu
fonksiyonlardan **createObjectEx** yarattığımız her yeni Silverlight
projesinde otomatik olarak kullanılan bir fonksiyondur. Bu makalemiz
boyunca bu fonksiyonlarla yapabileceklerimize ve **Silverlight.js**
dosyasının derinliklerine ineceğiz.

**createObject ve createObjectEx Metodları**

Her iki metod da aslında aynı işi yapıyor. Arada tek farkı
**createObject** metodu aldığı parametreleri tek tek alırken
**createObjectEx** metodu bir JSON dizisi olarak alıyor olması. Gelin
hızlıca aldıkları parametrelere ve anlamlarına bir göz atalım.

-   **Source**: Silverlight animasyonuna yüklenecek olan XAML kaynağına
    ait bir adres veya sayfa içi blok ID'si alabilir.
-   **Parent**: Silverlight animasyonunun sayfada içerisine
    yerleştirileceği HTML elementinin ID bilgisini alır.
-   **ID**: Sayfadaki Silverlight animasyonunun adı olacak olan ID
    bilgisini alır. Bu ID sayfadaki başka bir HTML elementi tarafından
    kullanılmamış olmalıdır.
-   **Properties** : Silverlight animasyonu ile ilgili genişlik,
    yükseklik, fon rengi gibi özellikleri bir dizi olarak alır.
-   **Events**: Silverlight animasyonu ilk yaratılırken bağlanabilecek
    JavaScript durum fonksiyonlarının tanımlandığı yerdir.
    Tanımlanabilen durumlar **onLoad** ve **onError** durumlarıdır.
-   **initParam**: Kullanıcı tarafından gerektiğinde tanımlanan
    parametrelerdir.
-   **Context**: Kullanıcı tarafından gerektiğinde aktarılabilen ve
    onLoad duruma aktarılacak olan bir parametredir.

<div style="text-align:center;">

<div
style="border-style: solid; border-color: inherit; border-width: 1px; width:500px; text-align:left;padding:10px; ">

  Silverlight.**createObjectEx**({

    source: <span style="color: #a31515;">"Page.xaml"</span>,

    parentElement: document.getElementById(<span
style="color: #a31515;">"silverlightControlHost"</span>),

    id: <span style="color: #a31515;">"SilverlightControl"</span>,

    properties: {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>

    },

    events: {

      onLoad: Silverlight.createDelegate(scene, scene.handleLoad)

      }

    }

</div>

*createObjectEx Metodu kullanım örneği.*

</div>

\

<div style="text-align:center;">

<div
style="border-style: solid; border-color: inherit; border-width: 1px; width:500px; text-align:left;padding:10px; ">

  Silverlight.createObject(

    <span style="color: #a31515;">"Page.xaml"</span>,

    document.getElementById(<span
style="color: #a31515;">"silverlightControlHost"</span>),

    <span style="color: #a31515;">"SilverlightControl"</span>,

    {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>

    },

    {

      onLoad: Silverlight.createDelegate(scene, scene.handleLoad)

      }

    }

</div>

*createObject Metodu kullanım örneği.*

</div>

Yukarıda iki metod arasındaki kullanım farkını daha net bir şekilde
görebilirsiniz. Her iki metod içerisinde de **Properties** listesi bir
JSON listesi olarak aktarılıyor. Şimdi gelelin bu liste içerisinde
neleri tanımlayabiliyor olduğumuza.

-   **Width**: Silverlight nesnesinin genişliğini belirler. Sabit bir
    piksel değeri olabileceği gibi bir yüzde değeri de içerebilir.
-   **Height**: Silverlight nesnesinin yüksekliğini belirler. Sabit bir
    piksel değeri olabileceği gibi bir yüzde değeri de içerebilir.
-   **background**: Silverlight nesnesinin fon rengini belirler.
    Varsayılan değeri null şeklindedir ve bu durum fon renginin beyaz
    olmasına neden olur.
-   **isWindowless**: Silverlight nesnesinin sayfa içerisinde
    nesnelerden bağımsız olarak yerleştirilebilmesini sağlar. **True**
    değeri aktarıldığında nesnenin background değeri artık şeffaflık da
    içerebilir. Silverlight animasyonu önüne HTML kontrollerini overlay
    koyabilmek için de bu teknik kullanılır.
-   **frameRate**: Silverlight nesnesinin maksimum gösterebileceği
    saniyede kare sayısını sınırlar. Desteklenen en yüksek sayı 64
    şeklindedir. Varsayılan değer 24'tür.
-   **inplaceInstallPrompt**: Değeri **true** olduğunda standart
    Silverlight yükleme görseli yerine kullanıcı sözleşmesine de link
    içeren bir görsel kullanılır. Böylece kullanıcı Microsoft web
    sitesine yönlenmeden doğrudan Plug-In'i yüklemeye başlayabilir.
-   **version**: Silverlight animasyonunun çalıştırılabilmesi için
    istemcide yüklü olması gereken minimum Silverlight Plug-In sürümünü
    belirler.
-   **ignoreBrowserVer**: Silverlight animasyonu yüklenmeden önce
    tarayıcının Silverlight destekleyip desteklemediğinin kontrol
    edilmemesini sağlar. Varsayılan değeri **false** şeklindedir.
-   **enableHtmlAccess**: Silverlight animasyonu içerisindeki nesnelerin
    animasyon dışındaki sayfadaki HTML elementlerine ulaşıp
    ulaşamayacağını belirler. Varsayılan değeri **true** şeklindedir.

**isInstalled**

Otomatik kontrol işlemlerinin yanı sıra isterseniz kendi kontrol
kodunuzu yazarak **Silverlight.js** içerisindeki **isInstalled**
metodunu da kullanabilirsiniz. Böylece istemci tarafında hangi
Silverlight Plug-In'in yüklü olduğunu görebilirsiniz.

    <span style="color: blue;">if</span>(Silverlight.isInstalled(<span
style="color: #a31515;">"1.0"</span>))

    {

      createSilverlight();

    }

    <span style="color: blue;">else</span>

    {

      alert(<span style="color: #a31515;">"AMAN TANRIM! Silverlight
yüklü değil!!"</span>);

    }

Yukarıda gördüğünüz kod ile Silverlight Plug-In'in 1.0 sürümünün yüklü
olup olmadığı kontrol ediyoruz. Eğer yüklü değilse uygun bir uyarı
mesajı :) gösteriyoruz. Farklı senaryolarda bu noktada kullanıcıya
farklı görsel uyarılar gösterilebilir.

Silverlight.js tarafında detaylar bu kadar. Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-2-9 tarihinde yayinlanmistir.*
