# Windows Management Instrumentation ne ola ki?
Bugün üzerinde uğraştığım bir projede X bir windows uygulamasının
çalıştığı makinedeki tüm networking device'ları Enable etmesi veya tam
tersine Disable etmesi gerekiyordu. Çözümü uygularken aslında bu konudan
blogda da bahsetmenin iyi olabileceğini düşündüm. Malum bu tip bir
işlemi kendi ellerimizle Windows'un sunduğu arayüzlerden yapabiliriz
fakat programatik olarak da bunu yapmak mümkün müdür? Tabi ki mümkün :)
Aslında bu noktada anahtar cevap **WMI (Windows Management
Instrumentation).**

WMI için çok farklı tanımlar yapılbilir fakat en yüzeysel hali ile bu
makalemizi ilgilendiren kısmı WMI aracılığı ile bizim işletim sistemi
tarafından sunulan birçok yönetimsel (yönetilebilir) cihazın (bazı)
ayarlarına ve aksyonlarına ulaşabiliyor olmamız. Bunlar bildiğimiz
Property ve Method'lar şeklinde karşımıza çıkar. Bu dünyaya hızlı bir
giriş yapmak için aslında WMI içerisinde neler bulabileceğinizi ve
varlığını bilmeniz yeterli çünkü WMI'ın yapısını bilmeden de hazır
araçlarla çok hızlı ilerleyebilirsiniz.

[WMI Code Creator
v1.0](http://www.microsoft.com/downloads/details.aspx?FamilyID=2cc30a64-ea15-4661-8da4-55bbc145c30e&displaylang=en)

Yukarıdaki linkten indireceğiniz araç size tüm WMI sınıflarını gezme
şansı verecektir. Hatta bu kadarla kalmayıp bu sınıflara VB.NET,
VBScript ve C\# tarafından nasıl ulaşabileceğinizi gösteren hazır kodlar
da üretecektir. Bu kodları doğrudan herhangi bir .NET uygulamasını alıp
çalıştırabilmeniz için tek yapmanız gereken **System.Management**
DLL'lerini referans olarak projenize eklemek.

![WMI Code Creator içerisinden NetworkAdapter'lara ulaşan kodu
alabiliyoruz.](media/Windows_Management_Instrumentation_ne_ola_ki/25012010_1.png)\
*WMI Code Creator içerisinden NetworkAdapter'lara ulaşan kodu
alabiliyoruz.*

Yukarıdaki ekran görtünüsünden aldığımız kod doğrudan bir sistemdeki tüm
NetworkAdapter yani network cihazlarının listesini veriyor. Bu
cihazlarla ilgili tek tek işlem yapmak da hiç zor değil. Uygulama
içerisinde "Execute a method" adındaki ikinci ekrana geçtiğinizde
istediğiniz WMI sınıfına göz atarak hangi metodların bulunduğu
görebilirsiniz. Bu metodlardan birini seçerseniz bu sefer de o metodu
çağıran bir kod yaratılacaktır.

![Network cihazlarına uygulayabildiğimiz
aksyonlar.](media/Windows_Management_Instrumentation_ne_ola_ki/25012010_2.png)\
*Network cihazlarına uygulayabildiğimiz aksyonlar.*

Aynı şekilde bu gibi cihazların eventlarını da dinleyebileceğinizi tabi
ki unutmayalım ve son bir dipnot olarak da WMI üzerinde bulabileceğiniz
herşeyin sadece işletim sistemi ile alakalı olmak zorunda OLMADIĞI
olacak :) Kafalar hafiften karışmış olabilir fakat özetlemek gerekirse.
WMI Provider'ı olan her tür yazılım bu motoru kullanabilir. Örneğin bir
makineye yüklü SQL Server'da her veri tabanı yaratıldığında haberdar
olmak isteyebilirsiniz :) Bu gibi daha birçok şey WMI'lar üzerinden
yapılabilir.

Gelelim bizim hikayemize... Bir sistemdeki Network cihazlarını yakalayıp
onları kapatabilecek veya açabilecek kod aşağıdaki şekilde sonlanıyor;

**[VB]**

        <span style="color: blue;">Dim</span> WMI = GetObject(<span
style="color: #a31515;">"winmgmts:\\\\.\\root\\cimv2"</span>)

        <span style="color: blue;">Dim</span> Adapters =
WMI.Execquery(<span style="color: #a31515;">"Select \* from
Win32\_NetworkAdapter"</span>)

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> Adapter <span
style="color: blue;">In</span> Adapters

            Adapter.Disable()

        <span style="color: blue;">Next</span>

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2010-1-26 tarihinde yayinlanmistir.*
