# .NET Framework 3.5 açık kaynak kodları karşınızda!
Bundan bir süre önce **.NET Framework 3.5**'in açık kaynak kodlarının
Microsoft tarafından dağıtılacağını sizlere duyurmuştum. Bu gibi bir
dağıtımın özellikle Framework içerisinde hataların hızlıca
giderilebilmesine ve biz programcıların arka planda nelerin çalıştığını
görerek yerine göre daha performanslı uygulamalar hazırlayabilmemize
yardımcı olacağı kesin. İşte o gün bugün :)

Framework içerisindeki aşağıdaki kütüphanalerin açık kaynak kodları
yayınlandı.

-   **.NET Base Class Kütüphanaleri** (System, System.CodeDom,
    System.Collections, System.ComponentModel, System.Diagnostics,
    System.Drawing, System.Globalization, System.IO, System.Net,
    System.Reflection, System.Runtime, System.Security, System.Text,
    System.Threading, vs).
-   **ASP.NET** (System.Web, System.Web.Extensions)
-   **Windows Forms** (System.Windows.Forms)
-   **Windows Presentation Foundation** (System.Windows)
-   **ADO.NET ve XML** (System.Data ve System.Xml)

Çok yakında diğer sınıfların da zaman içerisinde paylaşıma açılacağı
ayrıca duyuruldu.

**Yükleme başlıyor...**

Visual Studio'nun .NET Framework açık kaynak koduna online olarak
ulaşabilmesi için aşağıdaki adresten gerekli paketi bilgisayarınıza
yüklemeniz şart. Maalesef söz konusu paket **Express** sürümlerle
çalışmayacaktır.

<https://connect.microsoft.com/VisualStudio/Downloads/DownloadDetails.aspx?DownloadID=10443&wa=wsignin1.0>

Yükleme işlemi tamamlandıktan sonra Visual Studio 2008 içerisinde
**Tools \> Options \> Debugging \> General** tabına giderek "**Enable
Just My Code**"" seçeneğini **OFF** ve "**Enable Source Server
Support"** seçeneğini **ON** olarak değiştirmeniz gerekiyor.

![Açık kaynak koduna yolculuk : Adım
1](media/NET_Framework_3_5_acik_kaynak_kodlari_karsinizda/18012008_1.png)\
*Açık kaynak koduna yolculuk : Adım 1*

Bir sonraki adımda yine "**Options**" içerisinde "**Symbols**" bölümüne
"<http://referencesource.microsoft.com/symbols>" adresini ekledikten
sonra internetten indirilen kaynakların önbelleklenmesi için de bir
klasör belirtmeliyiz. Klasör olarak kullanıcınızın yazma hakkına sahip
olduğu bir yol göstermenizde fayda var. Özellikle Vista kullanıcılarına
tavsiyem kendi kullanıcı klasörleri içerisinde bir adres vermeleri.
"**Search the above locations only when symbols are loaded manually**"
işaretini de işaretleyerek işlemimizi tamamlıyoruz.

![Açık kaynak koduna yolculuk : Adım
2](media/NET_Framework_3_5_acik_kaynak_kodlari_karsinizda/18012008_2.png)\
*Açık kaynak koduna yolculuk : Adım 2*

İşlemleri tamamlamak için "OK" düğmesine bastığınızda Visual Studio size
harici bir kaynaktan kaynak kodu yüklemenin tehlikeli olabileceğine dair
bir uyarı gösterecektir. Söz konusu uyarıya "**Yes**" diyerek kaynağa
güvendiğinizi belirtebilirsiniz.

**Peki NASIL kullanacağız?**

Şimdi hemen bir Winforms projesi başlatarak bir uyarı mesajı gösterelim.
Uyarı mesajımı gösterecek koda "**breakpoint**" ekledikten sonra projeyi
çalıştırarak "breakpoint" noktasına geldiğinde "**Call Stack**"
penceresinden istediğimiz sınıfı seçerek sağ tuş ile gelen menüden
"**Load Symbols**" komutu veriyoruz.

![Açık kaynak koduna yolculuk : Adım
3](media/NET_Framework_3_5_acik_kaynak_kodlari_karsinizda/18012008_3.png)\
*Açık kaynak koduna yolculuk : Adım 3*

Yükleme işlemi internet üzerinden yapılacağı için tabi ki "**Load
Symbols**"e tıklamadan önce internete bağlı olduğunuzdan emin olmanız
gerekiyor. İşlem bittiğinde "**Call Stack**" içerisinde gri satırlar
artık siyah olacak ve her satırın sonunda kaynak koddaki satır numaralı
da gözükecektir.

![Açık kaynak kodu
bilgisayarımızda.](media/NET_Framework_3_5_acik_kaynak_kodlari_karsinizda/18012008_4.png)\
*Açık kaynak kodu bilgisayarımızda.*

İncelemek istediğiniz koda karar verdikten sonra çift tıklayarak kaynak
dosyasının açılmasını sağlayabilirsiniz. Kaynak açılmadan önce size
lisans sözleşmesi de gösterilecektir, sözleşmeyi okuyup kabul ettikten
sonra kaynak kodu bilgisayarınıza indirilecektir. Daha sonraki
denemelerinizde sözleşme bir daha gösterilmeyecektir.

![.NET Framework açık kaynak kodu VB
:)](media/NET_Framework_3_5_acik_kaynak_kodlari_karsinizda/18012008_5.png)\
*.NET Framework açık kaynak kodu VB :)*

İşte açık kaynak kodu karşımızda. Unutmayalım bu kod bizler için
hazırlanmış bir kod. Yani içerisinde bize özel yorumlar var.
Karşılaşacağımız bazı sınıflar VB bazıları ise C\# ile yazılmış durumda.
Maalesef şimdilik istediğimiz dilde inceleme gibi bir şansımız yok.

Hepimize hayırlı, uğurlu olsun :)



*Bu yazi http://daron.yondem.com adresinde, 2008-1-18 tarihinde yayinlanmistir.*
