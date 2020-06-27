---
FallbackID: 2202
Title: "Debug modunda XML değişkenlerini incelemek için gelişmiş XML Visualizer"
date: "2008-10-1"
EntryID: Debug_modunda_XML_degiskenlerini_incelemek_icin_gelismis_XML_Visualizer
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Studio 2008
old.EntryID: 00cede9d-d2a7-40ce-979a-dcd23a57fd02
---
Özellikle XLINQ ile beraber XML kullanımının daha da arttığını itiraf
etmem gerek. XPATH yerine XML veriyi LINQ ile sorgulayabiliyor olmak
yazılım geliştiricilerin çok daha cesurca XML kullanmaya yönelmesine
neden oldu. Bu çerçevede Debug işlemlerinde de sıkça XML değişkenlerini
incelemek durumunda kalıyoruz. Peki bu süreçte aşağıdaki gibi
araçlarımız olsa işimiz kolaylaşmaz mıydı?

**Hoş Geldin XML Visualizer**

Visual Studio içerisinde ek bir Debug Visualizer olarak eklenen XML
Visualizer ile beraber XML değişkenlerinde Debug modunda daha kolay bir
inceleme ortamı sağlanıyor.

![XML Visualizer iş
başında.](media/Debug_modunda_XML_degiskenlerini_incelemek_icin_gelismis_XML_Visualizer/30092008_1.png)\
*XML Visualizer iş başında.*

XML Visualizer'ın kendi ekranında ise birçok seçenek bulunuyor. Ekran
ilk açıldığında XML kodlarını doğrudan Internet Explorer'ın motoru ile
gösterdiği için Ctrl+F gibi arama işlemlerini kullanabiliyoruz.

![XML Visualizer aslında IE'nin motorunu
kullanıyor.](media/Debug_modunda_XML_degiskenlerini_incelemek_icin_gelismis_XML_Visualizer/30092008_2.png)\
*XML Visualizer aslında IE'nin motorunu kullanıyor.*

İsterseniz görüntüye bir XSLT dosyası bağlayabileceğiniz gibi isterseniz
farklı XPATH sorguları yazarak doğrudan elinizdeki XML'i
sorgulayabilirsiniz de.

![XPATH sorguları Debug
verilerinde!](media/Debug_modunda_XML_degiskenlerini_incelemek_icin_gelismis_XML_Visualizer/30092008_3.png)\
*XPATH sorguları Debug verilerinde!*

**Nasıl yüklenir?**

Hemen <http://www.codeplex.com/XmlVisualizer> adresinden
**XmlVisualizer.dll** dosyasını bilgisayarınıza indirerek
bilgisayarınızda **C:\\Users\\Daron\\Documents\\Visual Studio
2008\\Visualizers** adresine kopyalayın. Bu adres tabi ki sizin
bilgisayarınızdaki kullanıcıların adına göre değişecektir. Artık Visual
Studio'yu tekrar açtığınızda yukarıdaki bahsettiğimiz tüm işlevleri
kullanabileceksiniz.

Hepinize kolay gelsin.


