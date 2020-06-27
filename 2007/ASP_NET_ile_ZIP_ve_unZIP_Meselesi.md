# ASP.NET ile ZIP ve unZIP Meselesi
İster web siteleri programlarken ister windows programlarında çoğu zaman
bir ZIP dosyası oluşturmaya ihtiyaç duymuşsunuzdur. Ben genelde ZIP
dosyalarını web sitelerinde yedekleme işlemleri için veya kullanıcı
birden çok dosyayı siteden download edecekse hepsini birleştirip bir
dosya olarak verebilmek için kullanırım. Windows programlarında da
yedekleme işlemleri için veya Export ve İmport işlemlerinde dışarıyda
tek bir dosya vermek için kullanabiliriz. Genel olarak baktığımızda
internette bizi veri trafiğinden kurtaran ve derli doplu downloadlar
sağlayan bir araç gibi kullanılabilir ZIP dosyaları.

Esas mesele .NET kodumuz ile istediğimiz dosyaları ZIPleyip var olan ZIP
dosyalarını da açabilmek. Bu noktada bir sürü alternatif var, isterseniz
üçüncü parti componentler satın alabilirsiniz veya ücretsiz dağıtılan
bazı DLL kütüphanelerini de kullanabilirsiniz. Ama aslında bizim .NET
Framework dahilinde kullanabileceğimiz yapılar da mevcut.

Microsoft.VisualStudio.Zip.dll

"*Böyle bir sınıftan haberim yoktu. Bu kadar kolay mıymış*?" diyenler
üzülmesinler :) Haberinizin olmaması çok normal çünkü bu sınıf yapısına
Visual Studio içerisinde "Add Reference" dediğinizde gelen listede
karşılaşmanız mümkün değil. Aslında bu sınıf sadece Visual Studio
Content Installer ve Template Wizard ile kullanılmak üzere hazırlanmış.
O nedenle herhangi bir şekilde bu sınıfla ilgili Microsoft'dan destek
almanız da mümkün değil.

Yukarıda ismini yazmış olduğum DLL dosyasını kendiniz gidip **GAC
(Global Assembly Cache)** içerisinden bularak almanız gerekecek. Bunun
için **Start** menüsünden **Run** diyerek
**c:\\windows\\assembly\\gac\_msil\\** yazabilir ve direk söz konusu
klasöre ulaşabilirsiniz. Benim bilgisayarımda tam yolu şu şekilde oldu:
C:\\windows\\assembly\\gac\_msil\\Microsoft.VisualStudio.Zip\\8.0.0.0\_\_b03f5f7f11d50a3a\\Microsoft.VisualStudio.Zip.dll

DLL dosyasını projenize kopyaladıktan sonra "Add Reference" bölümünde de
"Browse" diyerek DLL'i doğrudan projenize referans olarak
ekleyebilirsiniz.

<span style="color: blue;">Imports</span> Microsoft.VisualStudio.Zip

Yukarıdaki şekilde DLL içerisindeki hedefimizi import ettikten sonra
aşağıdaki gibi basit bir kod ile ZIP dosyalarını diske açabiliyoruz.

        <span style="color: blue;">Dim</span> Cozucu <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Microsoft.VisualStudio.Zip.ZipFileDecompressor(<span
style="color: #a31515;">"C:\\Benim\\dosyam\\burada.zip"</span>)

        Cozucu.UncompressToFolder(<span
style="color: #a31515;">"C:\\Dosyaları\\Buraya\\Koy\\"</span>)

\

**Cozucu** adını verdiğimiz bir değişkene **ZipFileDecompressor**
sınıfının bir kopyasını hedef ZIP dosyamızın tam yolunu da vererek
yarattıktan sonra **UncompressToFolder** metodu ile istediğimiz bir yere
tüm dosyaları açabiliyoruz. Şimdi sıra geldi ZIP dosyaları yaratmaya;

        <span style="color: blue;">Dim</span> Dosyalar() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= System.IO.Directory.GetFiles(<span
style="color: #a31515;">"C:\\Sıkıştıracağım\\Dosyaların\\Hepsi\\burada\\"</span>)

        <span style="color: green;">'Dosyaların tam yol listesinin
bulunduğu dizide sadece dosya isimlerini bırakalım.</span>

        <span style="color: blue;">For</span> Sayac <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> Dosyalar.GetUpperBound(0)

            Dosyalar(Sayac) =
System.IO.Path.GetFileName(Dosyalar(Sayac))

        <span style="color: blue;">Next</span>

 

        <span style="color: blue;">Dim</span> Sikistirici <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ZipFileCompressor(<span
style="color: #a31515;">"C:\\ZIP\\Dosyam\\Buraya.zip"</span>, <span
style="color: #a31515;">"C:\\Sikistirilacak\\Dosyaların\\Bulundugu\\yer\\Burası\\"</span>,
Dosyalar, <span style="color: blue;">True</span>, <span
style="color: blue;">False</span>)

\

Sıkıştırma işlemine başlamadan önce sıkıştıracağımız dosyaların bir
listesini **String** tipinde bir diziye almamız gerekiyor. O nedenle ilk
satırda **System.IO.Directory.GetFiles** sınıfını kullanarak
**Dosyalar** adındaki dizimize listeyi alıyoruz.
**System.IO.Directory.GetFiles** sınıfı dosyaların listesini geriye
dosyaların tam yolu ile döndürüyor. Biz dosyaların yol bilgisinin ZIP
dosyasına aktarılmasını istemediğimiz için dizideki her bir öğeyi
**for** döngüsü ile gezerek dosya isimlerini
**System.IO.Path.GetFileName** sınıfı ile ayıklıyoruz.

Sıra geldi sıkıştırma işlemini yapmaya. Sıkıştırma işlemi için
**Sikistirici** adında bir **ZipFileCompressor** yaratıyoruz. Esasen bu
değişken yaratma işlemini yaparken sıkıştırma işini de yapmış olacağız.
**ZipFileCompressor** tanımlarken verdiğimiz parametrelerden ilki
yaratılacak ZIP dosyasının adı ve tam yolu. İkinci parametre tüm
sıkıştırılacak dosyaların bulunduğu klasörün tam yolu, üçüncü parametre
ise dosyalarımızın adlarının bulunduğu dizinin ta kendisi. Son olarak
verdiğimiz iki parametreden ilki hedef konumda başka bir ZIP dosyası
varsa silinip silinmeyeceğini diğeri ise bir hata durumunda
sıkıştırmanın iptal edilip edilmeyeceğini belirliyor.



*Bu yazi http://daron.yondem.com adresinde, 2007-10-11 tarihinde yayinlanmistir.*
