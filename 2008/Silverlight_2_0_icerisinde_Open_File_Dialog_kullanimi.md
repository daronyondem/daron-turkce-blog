---
FallbackID: 2118
Title: Silverlight 2.0 içerisinde Open File Dialog kullanımı
PublishDate: 10/7/2008
EntryID: Silverlight_2_0_icerisinde_Open_File_Dialog_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 127a5e83-590f-44e1-8cdb-b69603944fc1
---
**Silverlight 2.0 Beta 2** içerisinden normal şartlarda uygulamanın
çalıştığı bilgisayardaki dosyalara ulaşma şansınız olmaz. Bu durum
aslında çok normal bir durum çünkü Silverlight tamamen internet
tarayıcısı içerisinde çalışıyor ve dışarıya çıkarak sisteme ulaşması
büyük bir güvenlik açığı olurdu. Oysa bizim bazı durumlarda Silverlight
tarafına sistemimizdeki bir dosyayı aktarmak isteyebiliriz. Örneğin
sistemdeki bir video dosyasını kullanıcının web sitesindeki Silverlight
ile açarak oynatmasını isteyebiliriz. Özellikle bu Silverlight
uygulamasının Macintosh tarafında da çalışacağını düşünürsek aslında Mac
için basit bir WMV Player bile yapmış oluyoruz. Peki sistemdeki
dosyalara nasıl ulaşacağız? Tabi ki "Open File Dialog" aracılığı ile.

**Uygulamamızı tasarlayalım.**

İlk olarak istemci tarafındaki video dosyalarını oynatacak olan
uygulamamızın ana ekran tasarımını yapalım. Sahnede adı Video olan bir
MediaElement ve bir de Button bulunacak. Düğmeye basıldığında Open File
Dialog aracılığı ile istemcide video dosyalarından birini alacağız.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication55.Page"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**MediaElement**</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="24,8,128,84"</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Video**"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**Button**</span><span style="color: red;">
Height</span><span style="color: blue;">="24"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
Margin</span><span style="color: blue;">="192,0,128,44"</span><span
style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Bottom"</span><span style="color: red;">
Content</span><span style="color: blue;">="Dosya Aç"</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**btnAc**"</span><span style="color: red;">
Click</span><span style="color: blue;">="btnAc\_Click"/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

**Kodlama zamanı**

Düğmemize basıldığında ilk olarak yeni bir Open File Dialog yaratacağız
sonrasında da nesnemizin özelliklerini tanımlayacağız.

**[VB]**

<span style="color: blue;">Dim</span> DosyaAc <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
OpenFileDialog

DosyaAc.Filter = <span style="color: #a31515;">"WMV Dosyaları
(\*.wmv)|\*.wmv"</span>

DosyaAc.Multiselect = <span style="color: blue;">False</span>

DosyaAc.ShowDialog()

**[C\#]**

OpenFileDialog DosyaAc = <span style="color: blue;">new</span>
OpenFileDialog();

DosyaAc.Filter = <span style="color: #a31515;">"WMV Dosyaları
(\*.wmv)|\*.wmv"</span>;   

DosyaAc.Multiselect = <span style="color: blue;">false</span>;   

DosyaAc.ShowDialog();

Kod içerisinde Open File Dialog'un ilk olarak **Filter** özelliğini
tanımlıyoruz. Aslında buradaki kullanım Windows Forms'daki kullanım ile
neredeyse aynı. Bizim örneğimizdeki filtrede kullanıcıya sadece WMV
dosyalarını seçtiriyoruz. Bir sonraki adımda Open File Dialog nesnemizin
**Multiselect** özelliğinide **False** yaparak bir defada sadece bir
dosya seçilebilmesini de sağladıktan sonra artık Dialog'u ekranda
göstermek için **ShowDialog** metodunu çağırabiliriz.

**[VB]**

<span style="color: blue;">If</span> DosyaAc.SelectedFile <span
style="color: blue;">IsNot</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

Video.AutoPlay = <span style="color: blue;">True</span>

Video.SetSource(DosyaAc.SelectedFile.OpenRead)

<span style="color: blue;">End</span> <span
style="color: blue;">If</span>

**[C\#]**

<span style="color: blue;">if</span> (DosyaAc.SelectedFile != <span
style="color: blue;">null</span>) {

    Video.AutoPlay = <span style="color: blue;">true</span>;

    Video.SetSource(DosyaAc.SelectedFile.OpenRead);

}

Kullanıcı Open File Dialog'u kapattıktan sonra herhangi bir dosyanın
seçilip seçilmediğini **SelectedFile** özelliği üzerinden kontrol ederek
eğer dosya seçilmiş ise **OpenRead** metodu ile dosyayı okuyabiliyoruz.
Biz okuduğumuz dosyayı MediaElement'in **Source'una** aktaracağımız için
ilk olarak aktarma sonrası hemen video oynatılsın diye MediaElement'in
**AutoPlay** özelliğini **True** yapıyoruz. Son olarak da **SetSource**
metoduna elimizdeki dosyayı aktarıyoruz. Böylece artık video dosyası
**MediaElement** içerisinde oynatılıyor olacak. Unutmayın videoyu
sunucuya almadık, hala tamamen istemci tarafında çalışıyoruz.

**Birden çok dosya okuyalım**

Open File Dialog'un **MultiSelect** özelliği **True** olduğunda birden
çok dosya seçilerek işlem yapılabiliyor. Bu konudaki örneğimizde sahnede
bir TextBox ve bir düğme bulunacak. Düğmeye tıklandığında sistemden
kullanıcıların istedikleri kadar fazla sayıda TXT dosyası
seçebilecekler. Bu dosyaların hepsinin içeriğini arka arkaya TextBox
içerisine yerleştireceğiz.

**[VB]**

        <span style="color: blue;">Dim</span> DosyaAc <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
OpenFileDialog

        DosyaAc.Filter = <span style="color: #a31515;">"TXT Dosyaları
(\*.txt)|\*.txt"</span>

        DosyaAc.Multiselect = <span style="color: blue;">True</span>

        DosyaAc.ShowDialog()

        <span style="color: blue;">If</span> DosyaAc.SelectedFiles <span
style="color: blue;">IsNot</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">Then</span>

            <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> Dosya <span
style="color: blue;">In</span> DosyaAc.SelectedFiles

                txtMetin.Text += Dosya.OpenText.ReadToEnd

            <span style="color: blue;">Next</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

**[C\#]**

OpenFileDialog DosyaAc = <span style="color: blue;">new</span>
OpenFileDialog();

DosyaAc.Filter = <span style="color: #a31515;">"TXT Dosyaları
(\*.txt)|\*.txt"</span>;

DosyaAc.Multiselect = <span style="color: blue;">true</span>;

DosyaAc.ShowDialog();

<span style="color: blue;">if</span> (DosyaAc.SelectedFiles != <span
style="color: blue;">null</span>) {

    <span style="color: blue;">foreach</span> ( Dosya <span
style="color: blue;">in</span> DosyaAc.SelectedFiles) {

        txtMetin.Text += Dosya.OpenText.ReadToEnd;

    }

}

Yukarıdaki kod içerisinde her zamanki gibi Open File Dialog nesnemizi
oluşturarak uygun filtreyi tanımlıyoruz. Dikkat etmemiz gereken nokta
**Multiselect** özelliğinin **True** olarak ayarlanmış olması. Dosyalar
seçildikten sonra **SelectedFiles** listesinden her bir dosyayı tek tek
alarak **OpenText** metoduyla dosya içerisindeki yazıyı okuyarak
**txtMetin** adındaki Tex**t**Box nesnemize aktarıyoruz.

Hepinize kolay gelsin.


