---
FallbackID: 2042
Title: "Silverlight 2.0 içerisinde Isolated Storage kullanımı"
date: "2008-5-1"
EntryID: Silverlight_2_0_icerisinde_Isolated_Storage_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: efebcb20-60cb-4964-ba43-0b1949fb5e23
---
Web uygulamalarında Cookie kullanımı alışık olduğumuz bir yapıdır. Bu
yapının bir benzeri Silverlight 2.0 Beta 1 ile beraber de karşımıza
geliyor. "**Isolated Storage**" olarak adlandırılan alan sadece
Silverlight uygulamanıza özel olarak varsayılan ayarları ile 100KB'lık
bir alanı istemci tarafında programcının kullanımına sunuyor. İlk olarak
gelin bu alana veri yazma ve okuma işlemlerinin nasıl yapıldığına bir
göz atalım.

Örneğimizde uygulamamız içerisinde bir TextBox ve iki Button yer alacak.
Buttonlardan birine basıldığında TextBox içerisindeki veri **Isolated
Storage** içerisine kaydedilecek diğeri ise veriyi silecek. Isolated
Storage içerisinde doğrudan dosyalar ve klasörler saklayabiliyoruz. O
nedenle biz de örneğimizde saklamak istediğimiz metni bir TXT dosyası
şeklinde diske kaydedeceğiz. Gelin ilk olarak uygulamamızın arayüzünü
aşağıdaki şekilde hazırlayalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication12.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**TextBox**</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">38,18,51,105</span>"<span style="color: blue;">
</span><span style="color: red;">Text</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TextBox</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**txtMetin**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">41</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,0,51,35</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">127</span>"<span style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">KAYDET</span>"<span style="color: blue;"> ****
</span><span style="color: red;">**x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**DgmKaydet**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">41</span>"<span
style="color: blue;"> </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Left</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">104,0,0,35</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">91</span>"<span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">KAYDI
SİL</span>"<span style="color: blue;"> </span><span style="color: red;">
**x:Name**</span><span style="color: blue;">**=**</span>"<span
style="color: blue;">**DgmSil**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamız ilk açıldığında Isolated Storage içerisinde daha önce
kaydedilmiş "deneme.txt" adında bir dosyanın olup olmadığını kontrol
edeceğiz. Eğer böyle bir dosya varsa içeriğini okuyarak doğrudan TextBox
içerisinde göstereceğiz.

        <span style="color: blue;">Using</span> **DEPO** <span
style="color: blue;">As</span>
IO.**IsolatedStorage.IsolatedStorageFile** =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">If</span>
DEPO.**FileExists**(<span style="color: #a31515;">"deneme.txt"</span>)
<span style="color: blue;">Then</span>

<span style="color: blue;">Dim</span> **Dosya** <span
style="color: blue;">As</span>
IO.IsolatedStorage.**IsolatedStorageFileStream** =
DEPO.**OpenFile**(<span style="color: #a31515;">"deneme.txt"</span>,
IO.FileMode.Open, IO.FileAccess.Read)

<span style="color: blue;">Dim</span> **Okuyucu** <span
style="color: blue;">As</span> IO.**StreamReader** = <span
style="color: blue;">New</span> IO.StreamReader(Dosya)

                txtMetin.Text = Okuyucu.ReadToEnd

                Okuyucu.Close()

            <span style="color: blue;">Else</span>

                txtMetin.Text = <span style="color: #a31515;">"Dosya
yok"</span>

            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

Isolated Storage ile ilgili yapacağımız tüm işlemleri
**IsolatedStorageFile.GetUserStoreForApplication()** ile mevcut
kullanıcının alanını ele alarak yapacağız. O an için istemci işlem yapan
kullanıcının bizim uygulamamız için ayrılmış olan alanına ulaştıktan
sonra hemen hedef konumda deneme.txt adında bir dosya olup olmadığını
**FileExists** metodu ile kontrol edebiliyoruz. Eğer söz konusu dosya
varsa **OpenFile** metodu ile dosyamızı açarak bir **StreamReader'a**
kaynak olarak veriyoruz. Bundan sonrası aslında alışık olduğumuz dosya
okumat metodları. Eğer böyle bir dosya yok ise TextBox içerisinde
doğrudan "Dosya Yok" yazdırıyoruz. Eğer dosyamız herhangi bir klasör
içerisinde olsaydı gerekli metodlara sadece dosya ismini değil klasör
ismi ile beraber bir yol adresini vermek durumunda kalacaktık. Unutmayın
tüm bu klasörler ve dosyalar bizim uygulamamıza ait Isolated Storage
alanına saklanıyor olacak. Klasör yaratma konusunda özellikle bir
uyarıda bulunmam gerek. Normal şartlarda Windows'ta herhangi bir klasör
boş ise diskte yer kaplamaz. Isolated Storage içerisinde her klasör 1KB
alan kaplıyor. Bunun aslında mantıklı bir açıklaması var; kötü niyetli
Silverlight programcıların istemci tarafında milyonlarca klasör
yaratmasını engellemek :)

Şimdi geçelim bir sonraki adıma ve elimizdeki metin kutusuna yazılan
herhangi bir değeri TXT dosyası olarak Isolated Storage içerisine nasıl
kaydedeceğimizi inceleyelim.

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">Using</span> **Dosya** <span
style="color: blue;">As</span>
IO.IsolatedStorage.**IsolatedStorageFileStream** =
DEPO.**CreateFile**(<span style="color: #a31515;">"deneme.txt"</span>)

<span style="color: blue;">Dim</span> **Yazici** <span
style="color: blue;">As</span> IO.**StreamWriter** = <span
style="color: blue;">New</span> IO.StreamWriter(Dosya)

                Yazici.Write(**txtMetin**.Text)

                Yazici.Close()

                **Istatistik**()

            <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

Yukarıdaki kod içerisinde yine **GetUserStoreForApplication** diyerek
mevcut kullanıcının Isolated Storage alanını alıyoruz ve sonrasında
**CreateFile** metodu ile yeni bir dosya yaratıyoruz. Yarattığımız
dosyanın içerisine ise bir **StreamWriter** ile elimizdeki metni
yazdırıyoruz. Kodun en sonunda **Istatistik** denen bir kodu
çalıştırdığımı göreceksiniz. Söz konusu kodu ileriki adımlarda
yazacağız. Amacımız Isolated Storage içerisinde kullanılan ve kalan
alanı kullanıcıya göstermek olacak.

Artık dosyamızı da kaydettiğimize göre sıra geldi ikinci düğmeye
basıldığında söz konusu dosyayı Isolated Storage alanından silmeye.

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">If</span>
DEPO.**FileExists**(<span style="color: #a31515;">"deneme.txt"</span>)
<span style="color: blue;">Then</span> DEPO.**DeleteFile**(<span
style="color: #a31515;">"deneme.txt"</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

Kodumuz gerçekten çok basit. Yine mevcut Isolated Storage alanından yola
çekerek **FileExists** ile dosyanın varlığını kontrol ettikten sonra
**DeleteFile** ile söz konusu dosyayı istemciden siliyoruz.
Uygulamamızın tam kodunu incelemeden önce bir de **Istatistik** adındaki
kodumuzu yazalım.

<span style="color: blue;">Sub</span> Istatistik()

    <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

        **DgmKaydet**.Content = <span style="color: #a31515;">"Kaydet
"</span> & vbCrLf & <span style="color: #a31515;">"(Kalan Alan:"</span>
& Math.Round(DEPO.**AvailableFreeSpace** / 1024) & <span
style="color: #a31515;">"/"</span> & Math.Round(DEPO.**Quota** / 1024) &
<span style="color: #a31515;">")"</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Kullanıcının Isolated Storage alanını bir değişkene aktardıktan sonra
doğrudan **Quota** ile mevcut kotayı, **AvailableFreeSpace** ile de boş
alanınn byte olarak alabiliyoruz. Örneğimizde bu sayıları 1024'e bölerek
kullanıcıya KB biriminde bir istatistik gösteriyoruz. Şimdi
uygulamamızın son halini inceleyebiliriz.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">If</span> DEPO.FileExists(<span
style="color: #a31515;">"deneme.txt"</span>) <span
style="color: blue;">Then</span>

                <span style="color: blue;">Dim</span> Dosya <span
style="color: blue;">As</span>
IO.IsolatedStorage.IsolatedStorageFileStream = DEPO.OpenFile(<span
style="color: #a31515;">"deneme.txt"</span>, IO.FileMode.Open,
IO.FileAccess.Read)

                <span style="color: blue;">Dim</span> Okuyucu <span
style="color: blue;">As</span> IO.StreamReader = <span
style="color: blue;">New</span> IO.StreamReader(Dosya)

                txtMetin.Text = Okuyucu.ReadToEnd

                Okuyucu.Close()

            <span style="color: blue;">Else</span>

                txtMetin.Text = <span style="color: #a31515;">"Dosya
yok"</span>

            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> DgmKaydet.Click

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">Using</span> Dosya <span
style="color: blue;">As</span>
IO.IsolatedStorage.IsolatedStorageFileStream = DEPO.CreateFile(<span
style="color: #a31515;">"deneme.txt"</span>)

                <span style="color: blue;">Dim</span> Yazici <span
style="color: blue;">As</span> IO.StreamWriter = <span
style="color: blue;">New</span> IO.StreamWriter(Dosya)

                Yazici.Write(txtMetin.Text)

                Yazici.Close()

                Istatistik()

            <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Sub</span> Istatistik()

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            DgmKaydet.Content = <span style="color: #a31515;">"Kaydet
"</span> & vbCrLf & <span style="color: #a31515;">"(Kalan Alan:"</span>
& Math.Round(DEPO.AvailableFreeSpace / 1024) & <span
style="color: #a31515;">"/"</span> & Math.Round(DEPO.Quota / 1024) &
<span style="color: #a31515;">")"</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> DgmSil\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> DgmSil.Click

        <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            <span style="color: blue;">If</span> DEPO.FileExists(<span
style="color: #a31515;">"deneme.txt"</span>) <span
style="color: blue;">Then</span> DEPO.DeleteFile(<span
style="color: #a31515;">"deneme.txt"</span>)

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

        Istatistik()

        Page\_Loaded(sender, e)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Örneğimizdeki gibi farklı dosyalar yaratarak Isolatetd Storage alanı
içerisinde saklayabilirsiniz. Ayrıca isterseniz **CreateDirectory**,
**DeleteDirectory** metodlarını kullanarak istemci tarafında farklı
klasörler yaratabilir, gerektiğinde **GetDirectoryNames** ve
**GetFileNames** ile daha önce kaydedilmiş dosya ve klasörlerin
isimlerini de birer liste olarak alabilirsiniz.

**Peki ya 100KB bize yetmezse?**

Eğer 100KB size yetmiyorsa hedef istemcideki kullanıcının iznini alarak
söz konusu alanı arttırabilirsiniz. Bunun için aşağıdaki gibi bir kod
yeterli olacaktır.

       <span style="color: blue;">Using</span> DEPO <span
style="color: blue;">As</span> IO.IsolatedStorage.IsolatedStorageFile =
IO.IsolatedStorage.IsolatedStorageFile.GetUserStoreForApplication()

            DEPO.**TryIncreaseQuotaTo**(1000000)

        <span style="color: blue;">End</span> <span
style="color: blue;">Using</span>

**TryIncreaseQuotaTo** metoduna parametre olarak istediğiniz alanın byte
miktarını aktarmanız gerekiyor. Böylece kullanıcıya uygulamanın daha
fazla alan istediğine dair bir uyarı gösterilecek onayı isteniyor. Eğer
kullanıdı onay verirse **TryIncreaseQuotaTo** metodu geriye **True**
döndürüyor, aksi halde ise **False** Boolean değeri geliyor.

**Daha kolay kullanımı birşey yok mu?**

Isolated Storage gerçekten bize istemci tarafında mini bir sabit disk
verirmişcesine olanaklar sağlıyor. Oysa bazı durumlarda sadece ufacık
bir değeri, uygulamayla ilgili bir ayarı istemci tarafında saklamak
gerekebilir. Bunun için tek tek gidip dosyalar yaratmak ve verileri
dosyalara kaydetmek uğraştırıcı gelebilir. İşte böyle bir durumda özel
olarak hazırlanmış olan
**System.IO.IsolatedStorage.ApplicationSettings** sınıfından
faydalanabiliyoruz.

<span style="color: green;">'Mevcut AppSettings nesnesini alalım.</span>

<span style="color: blue;">Dim</span> Ayarlar <span
style="color: blue;">As</span>
System.IO.IsolatedStorage.ApplicationSettings =
System.IO.IsolatedStorage.ApplicationSettings.Default

<span style="color: green;">'Yeni bir ayar ekleyelim</span>

        Ayarlar.Add(<span style="color: #a31515;">"RenkSecimi"</span>,
<span style="color: #a31515;">"Kirmizi"</span>)

<span style="color: green;">'Var olan ayarı değiştirelim</span>

        Ayarlar(<span style="color: #a31515;">"RenkSecimi"</span>) =
txtMetin.Text

<span style="color: green;">'Var olan bir ayarın değerini alalım</span>

        txtMetin.Text = <span
style="color: blue;">CType</span>(Ayarlar(<span
style="color: #a31515;">"RenkSecimi"</span>), <span
style="color: blue;">String</span>)

<span style="color: green;">'Var olan bir ayarı silelim</span>

        Ayarlar.Remove(<span
style="color: #a31515;">"RenkSecimi"</span>)

**System.IO.IsolatedStorage.ApplicationSettings** sınıfı üzerinden
varsayılan ayarları bir değişkene aktardıktan sonra yukarıdaki örnek kod
içerisindeki metodları kullanarak rahatlıkla farklı ayarları Isolated
Storage içerisine kaydedebiliyor, değiştirebiliyor ve silebiliyoruz.

Hepinize kolay gelsin.


