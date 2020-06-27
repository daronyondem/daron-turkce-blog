---
FallbackID: 1944
Title: "Silverlight ve MediaElement kullanımı."
date: "2008-2-4"
EntryID: Silverlight_ve_MediaElement_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 62c3f483-42ef-4888-972c-b58dcc8b2e7f
---
# Silverlight ve MediaElement kullanımı.
Silverlight uygulamalarında videonun yeri çok önemli, tarayıcı ve
platform bağımsız olarak istemci tarafında klasik WMV dosyalarını
oynatabiliyor olmak büyük avantaj sağlıyor. Tabi tüm bunları yapabilmek
için Silverlight içerisinde MediaElement nesneleri kullanmamız
gerekiyor. Bu yazıda MediaElement'in kullanımına ve bazı özelliklerine
göz atacağız.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

      <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

      <span style="color: red;"> Width</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Background</span><span
style="color: blue;">="White"</span>

      <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0" /\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Herhangi bir Silverlight uygulamasına yukarıdaki şekli ile bir
MediaElement yerleştirebilirsiniz. Klasik Silverlight nesnelerinde
olduğu gibi MediaElement'in de Width, Height ve Canvas.Left, Canvas.Top
özellikleri ile sahnedeki boyutu ve konumu belirlenebiliyor.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> **Source**</span><span
style="color: blue;">="Lake.wmv"</span>

              <span style="color: red;"> **Volume**</span><span
style="color: blue;">="1"</span>

              <span style="color: red;"> **IsMuted**</span><span
style="color: blue;">="True" /\></span>

MediaElement'e herhangi bir video dosyası yüklemek için **Source**
özelliğini değiştirmek yeterli. **Source** özelliğine bir dosya adının
yanı sıra doğrudan MMS adresleri de aktarabilirsiniz. Ayrıca
MediaElement'in **Volume** özelliği ile sesi veya **IsMuted** Boolean
özelliği ile sesin açık olup olmayacağını da ayarlama şansınız var.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Source</span><span
style="color: blue;">="Lake.wmv"</span>

              <span style="color: red;"> Stretch</span><span
style="color: blue;">="Fill" /\></span>

Son olarak MediaElement'e ait Stretch özelliği ile video görselinin
MediaElement içerisine nasıl yerleştirileceğine de karar verebilirsiniz.
Bu özelliğe verebileceğiniz üç değeri aşağıdaki şekilde
tanımlayabiliriz.

-   **Uniform** : Stretch özelliğinin varsayılan değeri olan Uniform ile
    video görselinin en-boy oranı bozulmadan MediaElement içerisine
    yerleştirilmesi sağlanır.
-   **UniformToFill**: Bu seçenekte video görselinin en boy oranı
    korunurken videonun boyu veya eni tam olarak MediaElement içerisini
    dolduracak şekilde büyütülür ve sığmayan kesimler MediaElement'in
    dışında tutularak kesilir.
-   **Fill**: Fill seçeneği kullanıldığında video görseli MediaElement
    içerisine sığacak şekilde tekrar boyutlandırılır. Bu seçenekte
    videonun en-boy oranı korunmaz.

**Videoyu yönetmek...**

Herhangi bir video dosyasını oynatırken onu durdurabiliyor olmak
önemlidir. Silverlight ile böyle bir işlevsellik sağlayabilmek için
kendi düğmelerimizi ve kodumuzu yazmamız gerekiyor. Bu nedenle aşağıdaki
şekliyle bir Silverlight uygulaması yaratalım ve sonrasında her bir
düğme için yazacağımız kodları incleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

      <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

      <span style="color: red;"> Width</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

      <span style="color: red;"> Background</span><span
style="color: blue;">="White"</span>

      <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Page"\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Source</span><span
style="color: blue;">="Lake.wmv"</span>

              <span style="color: red;"> Stretch</span><span
style="color: blue;">="Fill" /\></span>

              <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Video" /\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

        <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

        <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="8"</span>

        <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="261"</span>

        <span style="color: red;"> Opacity</span><span
style="color: blue;">="0.7"</span>

        <span style="color: red;"> **MouseLeftButtonDown**</span><span
style="color: blue;">**="Oynat"**\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

              <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span>

              <span style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span>

              <span style="color: red;"> RadiusX</span><span
style="color: blue;">="16.5"</span>

              <span style="color: red;"> RadiusY</span><span
style="color: blue;">="16.5" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Width</span><span style="color: blue;">="47"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="21"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="13"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="5"</span>

              <span style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"\>\<</span><span
style="color: #a31515;">Run</span><span style="color: red;">
Text</span><span style="color: blue;">="Oynat" /\>\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

        <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

        <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="86"</span>

        <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="261"</span>

        <span style="color: red;"> Opacity</span><span
style="color: blue;">="0.7"</span>

        <span style="color: red;"> **MouseLeftButtonDown**</span><span
style="color: blue;">**="Bekle"**\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

              <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span>

              <span style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span>

              <span style="color: red;"> RadiusX</span><span
style="color: blue;">="16.5"</span>

              <span style="color: red;"> RadiusY</span><span
style="color: blue;">="16.5" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Width</span><span style="color: blue;">="47"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="21"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="13"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="5"</span>

              <span style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"</span>

              <span style="color: red;"> Text</span><span
style="color: blue;">="Bekle" /\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Canvas</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

        <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

        <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="166"</span>

        <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="261"</span>

        <span style="color: red;"> Opacity</span><span
style="color: blue;">="0.7"</span>

        <span style="color: red;"> **MouseLeftButtonDown**</span><span
style="color: blue;">**="Durdur"**\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="73"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="31"</span>

              <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FFFFFFFF"</span>

              <span style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span>

              <span style="color: red;"> RadiusX</span><span
style="color: blue;">="16.5"</span>

              <span style="color: red;"> RadiusY</span><span
style="color: blue;">="16.5" /\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Width</span><span style="color: blue;">="47"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="21"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="13"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="5"</span>

              <span style="color: red;"> TextWrapping</span><span
style="color: blue;">="Wrap"</span>

              <span style="color: red;"> Text</span><span
style="color: blue;">="Durdur" /\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Canvas</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu ile tanımlanan Silverlight nesnesinde toplam üç
adet (Oynat, Bekle, Durdur) düğme yer alıyor. Her bir düğme farklı
JavaScript fonksiyonlarına bağlanmış durumda. Şimdi sıra geldi gerekli
JavaScript fonksiyonlarını yazmaya.

<span style="color: blue;">function</span> Oynat(sender)

{

  sender.findName(<span
style="color: #a31515;">"Video"</span>).**Play**();

}

<span style="color: blue;">function</span> Bekle(sender)

{

  sender.findName(<span
style="color: #a31515;">"Video"</span>).**Pause**();

}

<span style="color: blue;">function</span> Durdur(sender)

{

  sender.findName(<span
style="color: #a31515;">"Video"</span>).**Stop**();

}

Her bir fonksiyonu çalıştıran düğmeye ait **sender** nesnesi üzerinden
**findName** metodunu çalıştırarak Video ismini vermiş olduğumuz
MediaElement'imizi bularak **Play**, **Pause** veya **Stop** metodları
ile video üzerinde gerekli işlemleri yapabiliyoruz.

**Video'nun Buffer durumunu gösterme...**

Video oynatılmadan önce yüklenirken önbellekleme durumunu algılayarak
kullanıcıya gösterebiliyor olmak da önemli bir işlevsellik
sağlayacaktır. Bu noktada kullanacağımız MediaElement'e ait durumun adı
**BufferingProgressChanges** olarak geçiyor.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Source</span><span
style="color: blue;">="Lake.wmv"</span>

              <span style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span>

              <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Video"</span>

              <span style="color: red;">
BufferingProgressChanged</span><span style="color: blue;">="Onbellek"
/\></span>

Yukarıdaki şekli ile gerekli durumu ve çalıştırılacak olan Onbellek
JavaScript fonksiyonunu MediaElement içerisinde tanımladıktan sonra sıra
geldi gerekli JavaScript fonksiyonunu yazmaya.

<span style="color: blue;">function</span> Onbellek(sender)

{

  sender.findName(<span style="color: #a31515;">"Fon"</span>)[<span
style="color: #a31515;">"Opacity"</span>]=sender.BufferingProgress;

}

Yukarıdaki fonksiyonda **sender** nesnesi bizim MediaElement'imizin ta
kendisi olduğu için rahatlıkla **sender** üzerinden yola çıkarak
MediaElement'in o anki önbellek durumunu **BufferingProgress**
özelliğinden alabiliyoruz. Önbellek durumu 1 ile 0 arasında **decimal**
olarak gönderileceği için aynı değeri doğrudan başka bir elementin
şeffaflığına aktararak yükleme süresince sürekli şeffaftan görünür hale
gelen bir animasyon yaratmış oluyoruz. Peki "fon" elementi de nedir?
Aşağıdaki şekliyle fonu siyah olan bir dikdörtgeni sahneye koyarsak
video yüklenirken söz konusu dikdörtgen giderek görünüz hale gelecek,
sonrasında da üzerinde video gözükecektir.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Rectangle</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

            <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

            <span style="color: red;"> Fill</span><span
style="color: blue;">="\#FF000000"</span>

            <span style="color: red;"> Stroke</span><span
style="color: blue;">="\#FF000000"</span>

            <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

            <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

            <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Fon" /\></span>

**Videoları maskeleme**

Maskeleme işlemleri XAML kodlarında Clipping olarak geçer. O nedenle tüm
Silverlight nesnelerine olduğu gibi MediaElement'lere de Clip'ler
ayarlanabilir. Bunu için aşağıdaki gibi basit bir kod kullanabiliriz.

<span style="color: #a31515;">  </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">MediaElement</span><span style="color: red;">
Width</span><span style="color: blue;">="300"</span>

              <span style="color: red;"> Height</span><span
style="color: blue;">="300"</span>

              <span style="color: red;"> Canvas.Left</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Canvas.Top</span><span
style="color: blue;">="0"</span>

              <span style="color: red;"> Source</span><span
style="color: blue;">="lake.wmv"</span>

              <span style="color: red;"> Stretch</span><span
style="color: blue;">="Fill"</span>

              <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="Video"</span>

              <span style="color: red;">
BufferingProgressChanged</span><span
style="color: blue;">="Onbellek"\></span>

<span style="color: #a31515;">**   ** </span><span
style="color: blue;">**\<**</span><span
style="color: #a31515;">**MediaElement.Clip**</span><span
style="color: blue;">**\>**</span>

<span style="color: #a31515;">**     ** </span><span
style="color: blue;">**\<**</span><span
style="color: #a31515;">**EllipseGeometry**</span><span
style="color: red;"> **RadiusX**</span><span
style="color: blue;">**="50"**</span>

**                     ** <span style="color: red;">
**RadiusY**</span><span style="color: blue;">**="50"**</span>

**                     ** <span style="color: red;">
**Center**</span><span
style="color: blue;">**="100,100"\>\</**</span><span
style="color: #a31515;">**EllipseGeometry**</span><span
style="color: blue;">**\>**</span>

<span style="color: #a31515;">**   ** </span><span
style="color: blue;">**\</**</span><span
style="color: #a31515;">**MediaElement.Clip**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">MediaElement</span><span
style="color: blue;">\></span>

Gördüğünüz gibi **MediaElement** içerisinde ayrı bir **EllipseGeometry**
nesnesi **Clip** olarak tanımlanmış durumda. Bu şekilde kod
yazabileceğiniz gibi doğrudan **Expression Blend** içerisinde görsel
olarak da maskeleme yapma şansınız var. Blend içerisinde herhangi iki
nesneyi "**Objects and Timeline**" panelinden seçerek sağ tıkladığınızda
gelen menüden **Path / Make Clipping Path** komutu vermeniz halinde
seçili olan üstteki nesne bir alt nesneye Clip olarak ayarlanacaktır.
Aynı şekilde Clip ayarlanmış bir nesneye sağ tıkladığınızda gelen
menüden de **Path / Release Clipping Path** diyerek maskelemeyi kaldırma
şansınız da var.



*Bu yazi http://daron.yondem.com adresinde, 2008-2-4 tarihinde yayinlanmistir.*
