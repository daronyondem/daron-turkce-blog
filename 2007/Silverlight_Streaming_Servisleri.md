---
FallbackID: 1812
Title: Silverlight Streaming Servisleri
PublishDate: 16/10/2007
EntryID: Silverlight_Streaming_Servisleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: e27332ab-82c3-4084-a220-181fb7f0b885
---
Daha önceki yazılarımda **Silverlight Streaming Servisleri**'nden
bahsetmiştim. <http://silverlight.live.com/> adresinden ulaşabileceğimiz
bu ücretsiz servis ile **4GB**'lık bir web alanında Silverlight
uygulamalarımızı dünyaya açabiliyoruz. Peki nasıl yapacağız bu işi? İlk
olarak <http://silverlight.live.com> sitesini ziyaret ederek **Live
ID'**miz ile kayıt olmamız gerekiyor. Kayıt işlemini tamamladıktan sonra
karşımıza gelen ekranda "Manage Applications" seçeneğini seçerek
Silverlight uygulamamızı bir ZIP dosyası olarak yükleyebiliyoruz.

![Silverlight Streaming
Services](media/Silverlight_Streaming_Servisleri/15102007_1.png)\
 *Silverlight Streaming Services sitesine giriş yaptığımıza karşımıza
çıkan ekran.*

Bir sonraki ekranda bizden ZIP dosyamız ve uygulamamıza verilmek üzere
bir isim isteniyor.

![Silverlight Streaming Servisleri'ne ZIP dosyamızı
yüklüyoruz.](media/Silverlight_Streaming_Servisleri/15102007_2.png)

Yükledim ama çalışmıyor diyenler varsa büyük ihtimal ile benim
yazılarımı ilk defa okuyorlar demektir.Yazılarımı okurken bir yandan
uygulama yapmamanızı tavsiye ederim, çünkü genelde en can alıcı noktaya
en sona bırakırım. Yukarıdaki adımları takip ederek Silverlight
uygulamanızı bir ZIP dosyası olarak sıkıştırıp yüklediyseniz tabi ki
uygulamanız çalışmayacaktır. Neden mi? Çünkü bu işin bazı kuralları var.
Gelin şimdi Silverlight Streaming Servisleri için nasıl ZIP dosyası
hazırlarız bir inceleyelim.

-   Yükleyeceğiniz Silverlight uygulamasını bir ZIP paketine
    sıkıştırırken kesinlikle HTML, HTM, ASPX, ASP, MEDIA, CSPROJ veya
    CONFIG uzantılı dosyaları pakete eklememelisiniz.
-   Dosyalarınız ZIP paketinin ana dizininde olmalıdır. Yani ZIP paketi
    içerisinde bir klasörde vs bulunmamalılar.
-   Tüm JavaScript dosyalarınız ve kaynaklarınız bir listesinin
    bulunduğu Manifest.XML dosyası ZIP paketi içerisinde yer almalıdır.

**Nedir bu Manifest.xml?**

Manifest.xml dosyası Silverlight Streaming Servisleri'nin sizin
Silverlight uygulamanızla ilgili gerekli bilgileri edinebilmesini
sağlayacak olan dosyadır. Bu çerçevede tabi ki bizim söz konusu dosyayı
doğru şekilde hazırlamış olmamız çok önemli. Gelin aşağıda bir
manifest.xml örneği inceleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">source</span><span
style="color: blue;">\></span>myfile.xaml<span
style="color: blue;">\</</span><span
style="color: #a31515;">source</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">width</span><span
style="color: blue;">\></span>800<span
style="color: blue;">\</</span><span
style="color: #a31515;">width</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">height</span><span
style="color: blue;">\></span>600<span
style="color: blue;">\</</span><span
style="color: #a31515;">height</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">background</span><span
style="color: blue;">\></span>\#00FFFFFF<span
style="color: blue;">\</</span><span
style="color: #a31515;">background</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>1.0<span
style="color: blue;">\</</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">isWindowless</span><span
style="color: blue;">\></span>true<span
style="color: blue;">\</</span><span
style="color: #a31515;">isWindowless</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">loadFunction</span><span
style="color: blue;">\></span>StartWithParent<span
style="color: blue;">\</</span><span
style="color: #a31515;">loadFunction</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">jsOrder</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>MicrosoftAjax.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>PreviewMedia.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>EmePlayer.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>player.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>StartPlayer.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">jsOrder</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

\

Yukarıda örnek bir Mainfest.xml dosyasının içeriği görebilirsiniz.
Silverlight uygulamanızda eğer birden çok XAML dosyası varsa hangisinin
ilk olarak yükleneceğini belirtmeniz gerekiyor. Bunun için **source**
taglarını kullanıyoruz. Eğer sadece bir XAML dosyanız varsa bu tagı
yerleştirmenize gerek yok. JavaScript ile Silverlight uygulamanızı
yaratırken boyut, arkaplanı rengi bilgilerini belirtmediyseniz Manifest
içerisinde de belirtebilirsiniz. Version tagları arasında kullanmış
olduğunuz Silverlight sürümünü yazmanız gerekiyor. Biz şimdilik bu
sürümü tek release sürümü olan 1.0 olarak bırakacağız. Eğer Silverlight
uygulamanızın üzerine HTML Overlay tekniği ile HTML nesneleri
yerleştirecekseniz **isWindowless** seçeneğini de **true** olarak
düzenlemekte fayda var. Gelelim en can alıcı ayarlara; bunlardan ilki
Silverlight uygulamanızı yaratacak olan JavaScript fonksiyonu.
**StartWithParent** fonksiyonu yine Streaming Servisleri tarafından
yaratılıyor, isterseniz buraya farklı JavaScript metodlarının isimlerini
yazarak durumu siz de kontrol edebilirsiniz. Son olarak uygulamanızda
kullandığınız tüm JavaScript dosyalarını **jsOrder** tagları arasına tek
tek eklemeniz gerekiyor.

**Deneyelim...**

Hemen bir deneme yapalım ve ufak bir video dosyasını Expression Encoder
ile encode ederek Output kısmından da bir Silverlight Template seçerek
Silverlight oynatıcılı bir çıktı alalım. Eğer bilgisayarınızda
Expression Encoder yüklü değil ise ve hazırda bir WMV dosyanız varsa bir
alternatif olarak <http://www.silverlightgenerator.com> 'dan da
faydalanabilirsiniz. Silverlight paketimizi hazırladıktan sonra
içerisinde gereksiz dosyaları (CSPROJ, HTML vs) siliyoruz ve aşağıdaki
içeriği ile **manifest.xml** dosyamızı yaratıyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>1.0<span
style="color: blue;">\</</span><span
style="color: #a31515;">version</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">loadFunction</span><span
style="color: blue;">\></span>StartWithParent<span
style="color: blue;">\</</span><span
style="color: #a31515;">loadFunction</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">jsOrder</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>MicrosoftAjax.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>BasePlayer.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>PlayerStrings.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>player.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">js</span><span
style="color: blue;">\></span>StartPlayer.js<span
style="color: blue;">\</</span><span
style="color: #a31515;">js</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">jsOrder</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">SilverlightApp</span><span
style="color: blue;">\></span>

\

Gördüğünüz gibi çok fazla detaylı ayarlara bulaşmadan basit bir şekilde
JavaScript dosyalarını sıralayarak manifest.xml dosyamızı tamamladık.
Şimdi tüm bu paketi **manifest.xml** ile beraber bir ZIP dosyası haline
getirerek Silverlight Streaming Servisleri'ne yükleyebiliriz.

**Yüklemem Tamam... Sıra Yayında...**

ZIP paketinizi Silverlight Streaming Servisleri'ne yüklediğinizde
karşınıza aşağıdaki gibi bir sayfa gelecek ve Silverlight uygulamanızı
web sitenize eklemeniz için ihtiyaç duyacağınız kodları size aktarıyor
olacak.

![Silverlight Streaming Servisleri'nden uygulamamızı kendi sitemize
aktarıyoruz.](media/Silverlight_Streaming_Servisleri/15102007_3.png)\
*Silverlight Streaming Servisleri'nden uygulamamızı kendi sitemize
aktarıyoruz.*

Yukarıdaki ekran görüntüsüne yer alan açıklamalardan da anlaşılacağı
üzere en üst kutuda yer alan kodu web sayfamızın HTML kodları arasında
HEAD taglarının arasına yerleştiriyoruz. İkinci kutuda yer alan kodları
Silverlight uygulamasının sitenizde gözükeceği konuma yerleştirmeniz
gerekiyor. Son olarak üçüncü kutudaki kodları ise harici olarak
yaratacağımız bir **CreateSilverlight.js** dosyasına yerleştirmeliyiz.
Tüm bunlar tamamlandığında basit bir HTML sayfasının kodu aşağıdaki
şekilde sonlanıyor.

<span style="color: blue;">\<!</span><span
style="color: #a31515;">DOCTYPE</span> <span
style="color: red;">html</span> <span style="color: red;">PUBLIC</span>
<span style="color: blue;">"-//W3C//DTD XHTML 1.0
Transitional//EN"</span> <span
style="color: blue;">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span> <span
style="color: red;">xmlns</span><span
style="color: blue;">="http://www.w3.org/1999/xhtml"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

 

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="http://agappdom.net/h/silverlight.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

 

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="CreateSilverlight.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

 

  <span style="color: blue;">\<</span><span
style="color: #a31515;">meta</span> <span
style="color: red;">http-equiv</span><span
style="color: blue;">="Content-Type"</span> <span
style="color: red;">content</span><span
style="color: blue;">="text/html; charset=utf-8"</span> <span
style="color: blue;">/\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>Untitled 2<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span> <span
style="color: red;">id</span><span
style="color: blue;">="Wrapper\_denek"</span> <span
style="color: red;">style</span><span style="color: blue;">="width:
500px; height: 400px; overflow: hidden;"\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

 

  <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

<span style="color: blue;">var</span> Wrapper\_denek =
document.getElementById(<span
style="color: #a31515;">"Wrapper\_denek"</span>);

CreateSilverlight();

  <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

 

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

\

**Geçmiş Olsun..**

Tüm yapmamız gereken bu kadar. Artık siz de Silverlight uygulamalarınızı
hemen yayına alabilirsiniz. Özellikle videolarınızı hemen Silverlight
ile hazırlayarak dünyaya açabilirsiniz.

Kolay gelsin...


