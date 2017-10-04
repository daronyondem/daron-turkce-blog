---
FallbackID: 2365
Title: Web servislerimi Windows uygulamasında nasıl host ederim?
PublishDate: 2/6/2009
EntryID: Web_servislerimi_Windows_uygulamasinda_nasil_host_ederim
IsActive: True
Section: software
MinutesSpent: 0
Tags: WCF
old.EntryID: efc4285f-96db-4fdd-8768-7169d787e939
---
Dün bana gelen sorulardan birini cevaplamak üzerine hızlı bir makale
yazmaya karar verdim :) Gelen soruya doğrudan girmeden önce senaryoya
bir bakalım. Elimizde bir istemci var ve bu istemci sunucu üzerindeki
web servislerini kullanıyor. Söz konusu web servisleri IIS üzerine
yerleştirilmiş durumda. Oysa bizim istediğimiz şey bir anda bu web
servislerini IIS'ten bağımsız hale getirmek. Örneğin bize ait başka bir
sunucu uygulaması, özünde bir Windows uygulaması olsun ve söz konusu
uygulama bu web servislerini sunmak ile sorumlu olsun. Ne dersiniz?

**Nasıl olacak ki?**

Web servislerine genel olarak IIS üzerinden sunulan sayfalar gözü ile
bakarız oysa WCF ile bu manzara biraz değişiyor. WCF mantığında aslında
web servisi diye birşey yok, sadece Servis var. Söz konusu servisi ister
WEB ister başka bir şey üzerinden veya daha doğru bir tanımlama ile
başka bir protokol ile yayınlayabilirsiniz. Yayınlanan protokolün
mantığı vs aslında servisin iç yapısı ile alakasızdır! İşte WCF bunu
sağlıyor. O nedenle ilk olarak varsa yazmış olduğumuz eski ASMX'leri
birer WCF servisi haline dönüştürelim.

Bu dönüştürme işlemini yaparken projenize "Add New Item" diyerek yeni
bir WCF servisi eklemelisiniz. Fakat projeniz ne projesi olacak? Yani
eğer bu servisimizi bir web sitesi üzerinden sunmak istiyorsak tabi ki
elimizde bir ASP.NET projesi olmalı ve o projeye WCF servisimizi
eklemeliyiz. Oysa bizim istediğimiz şey bu Servis'in bir Windows
uygulaması tarafından sunulması. O zaman ilk olarak elimizde bir
Winforms veya WPF projesi bulunması gerekiyor, sonrasında bu projeye
"Add New Item" diyerek bir Service ekleyebiliriz.

![Projemizde servisimiz bizi
bekliyor...](http://cdn.daron.yondem.com/assets/2365/01062009_1.gif)\
*Projemizde servisimiz bizi bekliyor...*

Yukarıda projemizin Servis eklenmiş halini görebilirsiniz. Projemize
otomatik olarak bir Interface ve bir de Implentasyon kodları eklenmiş
durumda. Eğer ASP.NET tarafında WCF servisleri kullandı iseniz bu
noktada birşey dikkatinizi çekecektir. SVC uzantılı bir dosyamız yok!
Çünkü ona ihtiyacımız yok :) Bu servis IIS tarafından sunulmayacak, bunu
kendi programımız ile biz sunacağız o nedenle SVC gibi bir "placeholder"
dosyaya ihtiyacımız yok.

Bu noktadan sonra WCF ile klasik web servisleri arasındaki farklardan en
önemlisi bir Interface ve bir de Implementasyon dosyasının ayrı ayrı
bulunuyor olması. Makalemizin amacı WCF anlatmak olmadığı için bu farkın
detaylarına girmeyeceğiz fakat burada Interface'in servisin dışa sunduğu
imzası olduğunu düşünebilirsiniz. Biz basit bir servis hazırlayarak
devam edelim.

**[VB]**

<span style="color: blue;">Imports</span> System.ServiceModel

 

\<ServiceContract()\> \_

<span style="color: blue;">Public</span> <span
style="color: blue;">Interface</span> IService1

 

    \<OperationContract()\> \_

    <span style="color: blue;">Function</span> Topla(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> y <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>)

 

<span style="color: blue;">End</span> <span
style="color: blue;">Interface</span>

**[C\#]**

<span style="color: blue;">namespace</span> WindowsFormsApplication1

{

    [<span style="color: #2b91af;">ServiceContract</span>]

    <span style="color: blue;">public</span> <span
style="color: blue;">interface</span> <span
style="color: #2b91af;">IService1</span>

    {

        [<span style="color: #2b91af;">OperationContract</span>]

        <span style="color: blue;">int</span> Topla(<span
style="color: blue;">int</span> x, <span style="color: blue;">int</span>
y);

    }

}

Servisimiz şimdilik iki sayı alıp toplayacak. Yukarıda gördüğünüz
Interface dosyası içerisinde servisin fonksiyonu ile ilgili bir
implementasyon bulunmuyor. Sadece servisin uygulayacağı Intefrace'i
yazdık. Sıra geldi şimdi de gerekli kodları yazacağımız diğer VB/C\#
dosyamıza geçmeye.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Service1

    <span style="color: blue;">Implements</span> IService1

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Topla(<span
style="color: blue;">ByVal</span> x <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>, <span
style="color: blue;">ByVal</span> y <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>
<span style="color: blue;">Implements</span> IService1.Topla

        <span style="color: blue;">Return</span> x + y

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> WindowsFormsApplication1

{

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Service1</span> : <span
style="color: #2b91af;">IService1</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">int</span> Topla(<span
style="color: blue;">int</span> x, <span style="color: blue;">int</span>
y)

        {

            <span style="color: blue;">return</span> x + y;

        }

    }

}

Diğer dosyamızda artık çalışacak olan kodumuzu yazıyoruz. Burada
gördüğünüz metodun ve kodun klasik web servislerinde yazdığınız koddan
pek bir farkı yok. Genelde eski servislerinizden kodunuz alıp
kopyala-yapıştır metodu ile WCF'e rahatlıkla taşıyabilirsiniz.

Artık WCF servisimiz hazırladığımız Winforms uygulaması içerisinde hazır
olduğuna göre sıra geldi bu servisi nasıl başkalarına sunacağımza
bakmaya. Bunun için hızlıca kullanabileceğimiz özel bir sınıf bulunuyor.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Form1

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.Object, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.EventArgs) <span style="color: blue;">Handles</span>
Button1.Click

        <span style="color: blue;">Dim</span> ServisSunucu <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceModel.ServiceHost(<span
style="color: blue;">GetType</span>(Service1))

        ServisSunucu.Open()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

<span style="color: blue;">namespace</span> WindowsFormsApplication1

{

    <span style="color: blue;">public</span> <span
style="color: blue;">partial</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Form1</span> : <span
style="color: #2b91af;">Form</span>

    {

        <span style="color: blue;">public</span> Form1()

        {

            InitializeComponent();

        }

 

        <span style="color: blue;">private</span> <span
style="color: blue;">void</span> button1\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">EventArgs</span> e)

        {

            System.ServiceModel.<span
style="color: #2b91af;">ServiceHost</span> ServisSunucu = <span
style="color: blue;">new</span> System.ServiceModel.<span
style="color: #2b91af;">ServiceHost</span>(<span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">Service1</span>));

            ServisSunucu.Open();

        }

    }

}

**ServiceHost** nesnesi parametre olarak yaratacağı servisin tipini
ister. Bizim daha önce yazdığımız servisin tipini kendisine iletmemiz
ile beraber aslında bir servis sunucusu yaratmış oluyoruz. Söz konusu
sunucuyu **Open** metodu ile başlatabilir veya **Close** metodu ile
kapatabiliriz. Uygun şekilde bu komutları sunucuda çalışacak olan
Winforms veya WPF uygulamamızda farklı düğmelere bağlayabilirsiniz.

**Peki servisi başkaları nasıl kullanacak?**

Servisi ekledik, çalıştırdık ama adresi nedir? Yani başkaları nasıl
kullanacak? Daha önce de bahsettiğim gibi aslında bir WCF servisinin
hangi Endpoint (çıkış noktası/adres) ile yayınlanacağı ve hangi protokol
ile sunulacağı gibi ayarların yapılması gerekiyor. Yine maalesef ki bu
ayarların detaylarına bu makalede inmeyeceğiz fakat biraz şanslıyız
çünkü zaten varsayılan ayarları ile WCF servisleri **wsHttpBinding**
kullanıyor. Yani HTTP üzerinden çıkıyorlar. Bizim de istediğimiz eski
web servisleri gibi bu servislerin de HTTP üzerinden ulaşılabiliyor
olmasıydı. Fakat çıkış noktası konusunda ufak bir ayar yapmamız şart.

Çıkış noktası veya servisimizin HTTP adresi ile ilgili ayar aslında
uygulamanın içindeki **App.config** dosyasında saklanıyor. Bu dosya eğer
Solution Explorer içerisinde gözükmüyorsa doğrudan "Show all files"
düğmesine tıklayarak görünür hale getirebilirsiniz.

![App.Config dosyası
karşınızda.](http://cdn.daron.yondem.com/assets/2365/01062009_2.gif)\
*App.Config dosyası karşınızda.*

App.Config dosyasını açtığınızda farklı ayarlar ile karşılaşacaksınız.
Bu ayarlar içerisinde bir adres dikkatinizi çekecektir.

**[App.Config]**

<span style="color: gray;">\<?xml version=</span>"<span
style="color: gray;">1.0</span>"<span style="color: gray;">
encoding=</span>"<span style="color: gray;">utf-8</span>"<span
style="color: gray;"> ?\></span>

<span style="color: gray;">\<configuration\></span>

<span style="color: gray;">    \<system.serviceModel\></span>

<span style="color: gray;">        \<behaviors\></span>

<span style="color: gray;">            \<serviceBehaviors\></span>

<span style="color: gray;">                \<behavior name=</span>"<span
style="color: gray;">WindowsApplication1.Service1Behavior</span>"<span
style="color: gray;">\></span>

<span style="color: gray;">                    \<serviceMetadata
httpGetEnabled=</span>"<span style="color: gray;">true</span>"<span
style="color: gray;"> /\></span>

<span style="color: gray;">                    \<serviceDebug
includeExceptionDetailInFaults=</span>"<span
style="color: gray;">false</span>"<span style="color: gray;"> /\></span>

<span style="color: gray;">                \</behavior\></span>

<span style="color: gray;">            \</serviceBehaviors\></span>

<span style="color: gray;">        \</behaviors\></span>

<span style="color: gray;">        \<services\></span>

<span style="color: gray;">            \<service
behaviorConfiguration=</span>"<span
style="color: gray;">WindowsApplication1.Service1Behavior</span><span
style="color: gray">"</span>

<span style="color: gray;">                name=</span>"<span
style="color: gray;">WindowsApplication1.Service1</span>"<span
style="color: gray;">\></span>

<span style="color: gray;">                \<endpoint
address=</span><span style="color: gray">""</span><span
style="color: gray;"> binding=</span>"<span
style="color: gray;">wsHttpBinding</span>"<span style="color: gray;">
contract=</span>"<span
style="color: gray;">WindowsApplication1.IService1</span>"<span
style="color: gray;">\></span>

<span style="color: gray;">                    \<identity\></span>

<span style="color: gray;">                        \<dns
value=</span>"<span style="color: gray;">localhost</span>"<span
style="color: gray;"> /\></span>

<span style="color: gray;">                    \</identity\></span>

<span style="color: gray;">                \</endpoint\></span>

<span style="color: gray;">                \<endpoint
address=</span>"<span style="color: gray;">mex</span>"<span
style="color: gray;"> binding=</span>"<span
style="color: gray;">mexHttpBinding</span>"<span style="color: gray;">
contract=</span>"<span
style="color: gray;">IMetadataExchange</span>"<span
style="color: gray;"> /\></span>

<span style="color: gray;">                \<host</span><span
style="color: blue;">\></span>

<span style="color: blue;">                    \<</span><span
style="color: #a31515;">baseAddresses</span><span
style="color: blue;">\></span>

<span style="color: blue;">                        \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">baseAddress</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:8732/Design\_Time\_Addresses/WindowsApplication1/Service1/</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">                    \</</span><span
style="color: #a31515;">baseAddresses</span><span
style="color: blue;">\></span>

<span style="color: gray;">                \</host\></span>

<span style="color: gray;">            \</service\></span>

<span style="color: gray;">        \</services\></span>

<span style="color: gray;">    \</system.serviceModel\></span>

<span style="color: gray;">\</configuration</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz adresi değiştirmeniz halinde uygulamanız söz konusu
adresi dinlemeye başlayacaktır. Tabi bu işlemi özellikle root adreslerde
denerseniz uygulamanızın Admin hakları ile çalışmasına da dikkat etmeniz
gerek. Örneğin aşağıdaki şekilde adresimizi değiştirelim ve sonrasında
da bu adres üzerinden servisimizi başka bir uygulama ile kullanmayı
deneyelim.

**[App.Config]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">host</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">baseAddresses</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">add</span><span style="color: blue;">
</span><span style="color: red;">baseAddress</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost/benimservisim</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">baseAddresses</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">host</span><span style="color: blue;">\></span>

Basit bir şekilde bu uygulamayı admin hakları ile başlattıktan sonra
yeni bir proje yaratarak "Add Service Reference" dediğinizde bu adresi
girmeniz servise ulaşmanız için yeterli olacaktır. Unutmayın servisi
host edecek uygulamanızın admin hakları ile başlamasının yanı sıra
servisin **ServiceHost** üzerinden **Open** metodu ile çalıştırılmış
olması da gerekiyor.

![Normal bir servisi kullanmaktan farkı
yok!](http://cdn.daron.yondem.com/assets/2365/01062009_3.gif)\
*Normal bir servisi kullanmaktan farkı yok!*

Gördüğünüz gibi yarattığımız başka bir projede rahatlıkla bir önceki
uygulamamızda çalışan servisi referans olarak alabiliyoruz. Tabi bu
referansa ait endpoint'i de kod ile set etmekte fayda var.

Bundan sonrası için servisinizi kullanırken normalden farklı bir
mekanizma söz konusu değil. Her zamanki gibi servisinizi IIS üzerinden
sunuluyormuş gibi kullanabilirsiniz. Hatta belki makalemizin devamında
WCF'i biraz daha araştırarak bu servisin farklı Binding'ler ile nasıl
sunulabileceğine de bakabilir ve birkaç saniye içerisinde aynı servisin
hem HTTP hem de TCP üzerinden sunulmasını sağlayabilirsiniz.

Hepinize kolay gelsin.


