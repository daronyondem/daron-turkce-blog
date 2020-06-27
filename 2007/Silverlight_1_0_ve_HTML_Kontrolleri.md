# Silverlight 1.0 ve HTML Kontrolleri
Bolca **Silverlight 1.0** uygulamaları hazırladığımız :) bugünlerde
maalesef Silverlight 1.0 ile beraber gelen hazır kontrollerin azlığı
yüzünden biraz zorluk çekiyoruz. Bu durum Silverlight'ın bir sonraki
sürümünde düzeliyor olacak fakat biz o zamana kadar uygulamalarımızda
HTML kontrolleri ile idare etmek durumundayız. Peki nasıl olur da bir
Silverlight uygulamasında HTML kontrollerini kullanırız?

Esasen çözüm özünde çok basit. Silverlight'ın programlamasını ne de olsa
sayfamızdaki JavaScript ile yapıyoruz. Aynı JavaScript aslında sayfadaki
diğer HTML kontrollerine de ulaşabilme olanağına sahip. Yani hem
Silverlight hem de HTML nesnelerine aynı anda aynı kod ile ulaşabiliriz.
Bu durumda geriye sadece bir tek soru kalıyor;

**HTML kontrollerini Silverlight animasyonlarının üzerine nasıl
yerleştiririz?**

İlk olarak ufak bir Silverlight animasyonu hazırlayarak sayfanıza
yerleştirin. Sonrasında hemen gidip **createSilverlight** metodunuzu
bularak içerisinde aşağıdaki değişikliği yapın. Eğer projenizi
**Expression Blend 2** ile yarattıysanız **createSilverlight**
fonksiyonu **default\_html.js** dosyası içerisinde yer alacaktır.

<span style="color: blue;">function</span> createSilverlight()

{

  <span style="color: blue;">var</span> scene = <span
style="color: blue;">new</span> DEVELOAD\_SV.Page();

  Silverlight.createObjectEx({

    source: <span style="color: #a31515;">"Page.xaml"</span>,

    parentElement: document.getElementById(<span
style="color: #a31515;">"BirHost"</span>),

    id: <span style="color: #a31515;">"BirHost"</span>,

    properties: {

      width: <span style="color: #a31515;">"100%"</span>,

      height: <span style="color: #a31515;">"100%"</span>,

      version: <span style="color: #a31515;">"1.0"</span>,

    **  isWindowless:** <span style="color: #a31515;">"**True"**</span>

    },

    events: {

      onLoad: Silverlight.createDelegate(scene, scene.handleLoad)

    }

  });

}

Özellikle kalın olarak yazdığım satıra dikkat etmenizde fayda var.
Silverlight animasyon nesnemize ait **isWindowless** özelliğini **True**
olarak ayarladığımızda artık bir sonraki adıma geçmek için hazırız
demektir. Aslında bundan sonrası tamamen **HTML** ve **CSS** bilgisi ile
alakalı.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="BirHost"\></span>

 

      <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

            createSilverlight();

      <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

 

      <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">class</span><span
style="color: blue;">="container1"\></span>

 

      <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Yukarıda gördüğünüz HTML kodu Silverlight animasyonumuzun gösterileceği
sayfada yer alıyor. Hali hazırda zaten Silverlight uygulamamız için bir
**Host** element olarak **BirHost** elementi ayarlanmış durumda. Bir
önceki bölümde **createSilverlight** fonksiyonumuz içerisinde de
**BirHost** elementini **parentElement** olarak ayarlamıştık. Normalden
farklı olarak bu sefer kodumuzda, **BirHost** elementi içerisinde başka
bir DIV elementi daha yer alıyor. İşte bu DIV elementi bizim HTML
kontrollerimizi koyacağımız yer. Önemli olan söz konusu DIV elementine
doğru CSS özelliklerini aktararak **Silverlight** uygulamasının önünde
gözükmesini sağlamak.

      <span style="color: #a31515;">.container1</span>

      {

        <span style="color: red;">height</span>:<span
style="color: blue;">300px</span>; 

    **   ** <span style="color: red;"> **z-index**</span>:<span
style="color: blue;">**1**</span>**; **

**       ** <span style="color: red;"> **position**</span>:<span
style="color: blue;">**absolute**</span>;

        <span style="color: red;">top</span>:<span
style="color: blue;">230px</span>;

        <span style="color: red;">left</span>:<span
style="color: blue;">0px</span>;

        <span style="color: red;">width</span>:<span
style="color: blue;">100%</span>;

      }

Yukarıdaki CSS sınıfı içerisinde özellikle kalın yazılı satırlar çok
önemli. **z-index** CSS özelliğini **1** olarak ayarlayarak söz konusu
DIV elementinin bir katman öne gelmesini ve Silverlight uygulamasının
önünde gözükmesini sağlıyoruz. Sonrasında **position** özelliğini de
**absolute** tanımlayarak DIV elementini ekranda istediğimiz yere
konumlandırabiliyoruz. Artık **DIV** elementimiz Silverlight
uygulamamızın önünde gözükecek.

DIV elementinin içine istediğiniz HTML nesnelerini yerleştirebilirsiniz
ve söz konusu HTML elementlerinin **onclick** gibi eskiden de
kullandığımız eventlarına farklı JavaScript fonksiyonları aktararak yine
bu fonksiyonlar içerisinde Silverlight animasyonunuzdaki nesnelere de
**.findName** metodu ile ulaşabilirsiniz. Aslında bu noktada ister HTML
elementlerini yakalamak olsun ister Silverlight nesnelerini, bugüne
kadar yaptıklarımızdan herhangi bir farklılık söz konusu değil. Esas
mesele HTML nesnelerini "Overlay" olarak Silverlight animasyonunun önüne
koyabilmekti :)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-12-3 tarihinde yayinlanmistir.*
