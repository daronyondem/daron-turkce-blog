---
FallbackID: 2458
Title: Silverlight 4 Beta ile .NET 4.0 arasında Assembly paylaşımı
PublishDate: 26/11/2009
EntryID: Silverlight_4_Beta_ile_NET_4_0_arasinda_Assembly_paylasimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 548ccd80-17c6-4d06-ba92-de5638738468
---
Silverlight projelerin Assembly paylaşımı en çok istediğimiz
özelliklerden biriydi. Yanlış anlaşılmasın tabi ki .NET Framework
Assembly'lerinin Silverlight ile kullanımından bahsetmiyoruz. Tam
tersine Silverlight Assembly'lerinin .NET uygulamaları tarafından
kullanımından bahsedeceğiz. Neden mi? Aslında şimdilik en ana nedeni
Entity, Validasyon paylaşımı diyebiliriz. Genellikle Silverlight
projelerimize referans aldığımız web servisleri ile beraber
entitylerimiz de bir şekilde Silverlight tarafına gelse de pek çok
farklı senaryoda bu yeterli olmayabiliyor. O nedenle hazırladığımız
Assembly'leri hem ASP.NET, hem WPF, hem Winforms hem de SL tarafında
kullanabiliyor olmak çok önemli.

Silverlight 4 Beta ile beraber "Assembly Paylaşımı" özelliği geliyor.
Silverlight 4 için yazdığınız sınıf kütüphanalerini rahatlıkla .NET 4.0
projeleri ile paylaşabiliyorsunuz. Tabi dikkat edilmesi gereken nokta
tamamen Silverlight'a özel sınıfları ve namespace'leri kullanmamış
olmanız. Bu kurala uyduğunuz sürece bir sorun yaşamanız pek mümkün
değil.

**Hayi başlayalım...**

İlk olarak yeni bir Silverlight projesi yaratalım ve sonrasında da
Entity'lerimizi saklamak için ayrı bir "Silverlight Class Library"
projesini solution'a ekleyelim. Bu Class Library içerisinde basit bir
şekilde Insan adında bir Entity barındıracağız bu entity kendi
içerisinde **IDataErrorInfo** sınıfını da implemente ederek validasyon
mantığını da içerecek.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">Insan</span>

    <span style="color: blue;">Implements</span> ComponentModel.<span
style="color: #2b91af;">IDataErrorInfo</span>

 

    <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> PAdi

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

        <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

            PAdi = value

        <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">ReadOnly</span> <span
style="color: blue;">Property</span> [Error] <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
<span style="color: blue;">Implements</span> System.ComponentModel.<span
style="color: #2b91af;">IDataErrorInfo</span>.Error

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Return</span> <span
style="color: blue;">Nothing</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">Default</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">ReadOnly</span> <span
style="color: blue;">Property</span> Item(<span
style="color: blue;">ByVal</span> columnName <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)
<span style="color: blue;">As</span> <span
style="color: blue;">String</span> <span
style="color: blue;">Implements</span> System.ComponentModel.<span
style="color: #2b91af;">IDataErrorInfo</span>.Item

        <span style="color: blue;">Get</span>

            <span style="color: blue;">Dim</span> Hata <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
= <span style="color: blue;">Nothing</span>

            <span style="color: blue;">Select</span> <span
style="color: blue;">Case</span> columnName

                <span style="color: blue;">Case</span> <span
style="color: #a31515;">"Adi"</span>

                    <span style="color: blue;">If</span> <span
style="color: blue;">String</span>.IsNullOrEmpty(<span
style="color: blue;">Me</span>.PAdi) <span
style="color: blue;">Then</span>

                        Hata = <span style="color: #a31515;">"Adı
eksik"</span>

                    <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

            <span style="color: blue;">End</span> <span
style="color: blue;">Select</span>

            <span style="color: blue;">Return</span> Hata

        <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Bu noktadan sonra artık Silverlight Class Library'ye farklı proje
tiplerinde referans alarak kullanabiliriz. Örneğin ASP.NET projemize
referans alarak web servisi tarafından kullanabilir veya solution
içerisine bir de WPF projesi ekleyip orada da aynı Entity'leri
kullanabiliriz.

**Silverlight 4 Assembly'lerini referans alırken...**

Herhangi bir .NET projesinden SL Assembly'lerini referans alırken dikkat
etmeniz gereken nokta söz konusu referansı proje referansı olarak
almamanız. Aksi halde Visual Studio iki projesi sync etmeye çalışacak ve
hata verecektir. İleride bu mekanizma düzelir mi bilinmez fakat şu an
için tek çare söz konusu DLL'e ait referansı dosya üzerinden almak. Yani
referans eklerken "Browse" tabına geçerek compile edilmiş DLL'i bulup
referans olarak almanız gerekiyor.

![Dosya referansı almak çok
önemli!](http://cdn.daron.yondem.com/assets/2458/25112009_1.png)\
*Dosya referansı almak çok önemli!*

Dosya referansı olarak projelerinize referans aldığınızda Visual Studio
söz konusu proje için harici DLL'i solution dışı bir DLL'miş gibi kabul
edecektir. Bunun tabi ki bazı dezavantajları olacak, örneğin SL DLL'inde
değişiklik yaparsan compile etmeden değişiklikleri diğer projelerde
göremeyeceksiniz.

![Web servislerini referans alırken harici entity
kullanmalı.](http://cdn.daron.yondem.com/assets/2458/25112009_2.png)\
*Web servislerini referans alırken harici entity kullanmalı.*

Son yapmamız gereken ayar ise ister WPF tarafından olsun ister Winforms
tarafından herhangi bir servisi referans alırken servis ile beraber
gelen değil de harici DLL'de bulunan Entity'leri kullanmak. Bunun için
Service Reference yaratırken veya yaratılmış bir servis referansına sağ
tuş ile solution explorer içerisinde tıklayarak "Configure..." komutunu
verip "Reuse types" seçeneğini işaretleyebilirsiniz. Böylece listeden de
projenize referans olarak gelmiş uygun Assembly'yi seçip entitylerin söz
konusu assembly'den kullanılmasını sağlayabilirsiniz.

İşte assembly paylaşımı bu kadar kolay. Hepinize kolay gelsin!


