# Silverlight 2.0 Plug-In Algılama ve OBJECT Tagı
**Silverlight 2.0 Beta 2** ile beraber 1.0 sürümüne göre uygulamaların
dağıtım sistemi değişti ve karşımıza
[XAP](http://daron.yondem.com/tr/post/e93f297c-9d8c-4e34-807e-d6a0e9e47147)
dosyaları çıktı. Bu dosyaları standart HTML veya herhangi bir sunucu
taraflı programlama altyapısında kullanmanın yolu da aslında eskiden
Flash tarafında alışık olduğumuz Object taglarına dönüştü. Bu durumun
tabi ki güzel yanları var, Silverlight 1.0'da olduğu gibi harici
JavaScript dosyalarına (Silverlight.js) ve DIV elementlerine vs
ihtiyacımız olmuyor. Şimdi gelin beraber Silverlight 2.0 uygulamalarını
sayfalarımıza yerleştirirken kullanacağımzı **OBJECT** tagları ile gelen
yenilikleri inceleyelim.

**Yeni bir Silverlight 2.0 projesi**

Visual Studio 2008 içerisinde yeni bir Silverlight 2.0 projesi
yarattığımızda bizim için test amaçlı olarak örnek bir de HTML dosyası
hazırlanıyor. Bu dosya içerisinde bir Silverlight uygulamasının
gösterimi için konulmuş kodları yavaş yavaş inceleyelim.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="**silverlightControlHost**"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">object</span> <span style="color: red;">
**data**</span><span
style="color: blue;">="data:application/x-silverlight,"</span> <span
style="color: red;"> **type**</span><span
style="color: blue;">="application/x-silverlight-2-b2"</span> <span
style="color: red;"> **width**</span><span
style="color: blue;">="100%"</span> <span style="color: red;">
**height**</span><span style="color: blue;">="100%"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="source"</span> <span
style="color: red;">value</span><span
style="color: blue;">="ClientBin/SilverlightApplication56.xap"/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="onerror"</span> <span
style="color: red;">value</span><span
style="color: blue;">="onSilverlightError"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="background"</span> <span
style="color: red;">value</span><span
style="color: blue;">="white"</span> <span
style="color: blue;">/\></span>

 

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">href</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkID=115261"</span>
<span style="color: red;">style</span><span
style="color: blue;">="text-decoration: none;"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">src</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkId=108181"</span>
<span style="color: red;">alt</span><span style="color: blue;">="Get
Microsoft Silverlight"</span> <span
style="color: red;">style</span><span
style="color: blue;">="border-style: none"/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">iframe</span> <span
style="color: red;">style</span><span
style="color: blue;">='visibility:hidden;height:0;width:0;border:0px'\>\</</span><span
style="color: #a31515;">iframe</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

En dışta silverlightControlHost adında bir DIV elementi bulunuyor.
Aslında böyle elementin bulunmasına hiç gerek yok, sadece CSS ile
Silverlight uygulamasının boyutu ayarlanabilsin diye yerleştirilmiş bu
DIV elementinin başka herhangi bir işlevselliği olmadığı için rahatlıkla
koddan kaldırılabilir.

Esas **OBJECT** tagımıza geçtiğimizde karşımıza dört farklı özellik
çıkıyor. Bunlardan **Data** özelliği **OBJECT** taglarının farklı
tarayıcılarda farklı işlevselliklerle karşılaşmasından dolayı
yerleştirilmiş. Data özelliği olmayan **OBJECT** tagları bazı
tarayıcılarda sorun çıkartabiliyor. **TYPE** özelliği tarayıcıya
Silverlight Plug-In'in bu **OBJECT** tagından sorumlu olduğu bilgisini
verirken **width** ve **height** ise uygulamanın sayfadaki boyutunu
belirtiyor.

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="source"</span> <span
style="color: red;">value</span><span
style="color: blue;">="ClientBin/SilverlightApplication56.xap"/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="onerror"</span> <span
style="color: red;">value</span><span
style="color: blue;">="onSilverlightError"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="background"</span> <span
style="color: red;">value</span><span
style="color: blue;">="white"</span> <span
style="color: blue;">/\></span>

OBJECT tagları arasında bazı parametreler var. Bu parametreler
uygulamanın özelliklerine göre değişecektir, hatta burada tanımlanmamış
olan bazı farklı parametreler de kullanmak mümkün. Mevcut parametreler
arasında **Source** parametresi istemciye yüklenecek olan **XAP**
dosyasının adresini taşırken **onerror** parametresi ise hata durumunda
istemci tarafında çalıştırılacak olan **JavaScript** metodunun adını
saklıyor.

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">href</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkID=115261"</span>
<span style="color: red;">style</span><span
style="color: blue;">="text-decoration: none;"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">src</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkId=108181"</span>
<span style="color: red;">alt</span><span style="color: blue;">="Get
Microsoft Silverlight"</span> <span
style="color: red;">style</span><span
style="color: blue;">="border-style: none"/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

Buradaki kod ise aslında istemcide Silverlight Runtime yüklü olmadığında
gösterilecek olan içeriği tanımlıyor. Gördüğünüz gibi basit bir şekilde
"Get Microsoft Silverlight" logosu gösterilerek microsoft.com'da bir web
sayfasına yönlendirilmiş. Artık SL 1.0'da olduğu gibi Silverlight
Plug-In'in hangi sürümünün veya hangi platforma özel yüklemesinin
yapılacağına JavaScript ile istemci tarafında karar vermiyoruz. Herhangi
bir şekilde yükleme gerektiğinde doğrudan Microsoft sitesine yönlendirme
yaparak tüm işi Microsoft'a bırakıyoruz. Bu biz yazılım geliştiriciler
için çok daha rahat bir sistem.

Eğer isterseniz yukarıdaki HTML kodunu değiştirerek **Silverlight**
**RunTime** yüklü olmadığında ekranda gösterilecek içeriği farklı bir
şekilde tanımlayabilirsiniz. Önemli olan tek nokta herhangi bir şekilde
bir link ile kullanıcıları doğru adrese yönlendirerek Microsoft
sitesinden RunTime paketini indirmelerine olanak tanımak.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="**silverlightControlHost**"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">object</span> <span style="color: red;">
**data**</span><span
style="color: blue;">="data:application/x-silverlight,"</span> <span
style="color: red;"> **type**</span><span
style="color: blue;">="application/x-silverlight-2-b2"</span> <span
style="color: red;"> **width**</span><span
style="color: blue;">="100%"</span> <span style="color: red;">
**height**</span><span style="color: blue;">="100%"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="source"</span> <span
style="color: red;">value</span><span
style="color: blue;">="ClientBin/SilverlightApplication56.xap"/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="onerror"</span> <span
style="color: red;">value</span><span
style="color: blue;">="onSilverlightError"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="background"</span> <span
style="color: red;">value</span><span
style="color: blue;">="white"</span> <span
style="color: blue;">/\></span>

 

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">href</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkID=115261"</span>
<span style="color: red;">style</span><span
style="color: blue;">="text-decoration: none;"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">src</span><span
style="color: blue;">="silverlightyok.jpg"</span> <span
style="color: red;">alt</span><span style="color: blue;">="Microsoft
Silverlight Yükle"</span> <span style="color: red;">style</span><span
style="color: blue;">="border-style: none"/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">iframe</span> <span
style="color: red;">style</span><span
style="color: blue;">='visibility:hidden;height:0;width:0;border:0px'\>\</</span><span
style="color: #a31515;">iframe</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

Örneğin yukarıdaki kod içerisindeki HTML sayesinde eğer istemci
tarafında Silverlight Runtime yüklü değil ise silverlightyok.jpg adında
bir resim gösteriliyor ve tıklandığında RunTime yüklenmek üzere
Microsoft web sitesine yönlendiriliyor.

        <span style="color: blue;">\<</span><span
style="color: #a31515;">iframe</span> <span
style="color: red;">style</span><span
style="color: blue;">='visibility:hidden;height:0;width:0;border:0px'\>\</</span><span
style="color: #a31515;">iframe</span><span
style="color: blue;">\></span>

Bu da nesi? Bu tamamen Safari tarafında bir önbellekleme sorununu
gidermek için yerleştirilmiş normalde kullanılmayan bir IFRAME. Safari
tarayıcısında bir sayfada eğer bir IFRAME varsa sayfa hiçbir şekilde
önbelleğe alınmıyor.

Bunların haricinde Visual Studio'da yaratılan sayfa içinde hata yakalama
için **onSilverlightError** adında bir JavaScript fonksiyonu ve
**errorLocation** adında bir DIV elementi bulunuyor. Bahsi geçen bu
JavaScript fonksiyonu herhangi bir hata durumunda hata mesajını alarak
**errorLocation** içerisine yazdırmakla sorumlu.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-7-11 tarihinde yayinlanmistir.*
