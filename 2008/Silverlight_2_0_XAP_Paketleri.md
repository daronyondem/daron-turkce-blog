---
FallbackID: 1994
Title: "Silverlight 2.0 XAP Paketleri"
date: "2008-3-19"
EntryID: Silverlight_2_0_XAP_Paketleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: e93f297c-9d8c-4e34-807e-d6a0e9e47147
---
# Silverlight 2.0 XAP Paketleri
Silverlight 2.0 (Beta 1) yazılarımın yavaş yavaş geleceğinden
bahsetmiştim. İşte ilki ile karşınızdayım. Bu yazıda **Silverlight 2.0
Beta 1** ile beraber gelen yeni dağıtım şeklinden bahsedeceğiz.
Silverlight 1.0 uygulamalarında sitenize herhangi bir Silverlight
animasyonu yerleştirebilmeniz için epey emek harcayarak birden çok
JavaScript dosyasını sayfanıza linklemeniz sonrasında uygun HTML
elementlerini ayarlamanız hatta bir de yanında XAML dosyanızı koymanız
gerekiyordu. Bu durum Silverlight 2.0 ile beraber değişiyor ve karşımıza
**XAP** uzantılı dosyalar geliyor. XAP'ın herhangi bir açılımı yok (en
azından şimdilik).

XAP dosyaları aslında özünde birer ZIP dosyası. Bu dosyalar içerisinde
Silverlight projenize ait DLL'ler bulunuyor. Silverlight 2.0 ile beraber
VB veya C\# kullanarak kodlama yapabildiğimiz için bu kodlardan DLL
dosyaları yaratılıyor ve söz konusu DLL'ler XAP dosyası içerisinde
istemciye gönderilerek istemci tarafında Silverlight Run-Time ile
çalıştırılıyor. Expression Blend ile hazırladığınız **XAML** dosyaları
da aynı DLL dosyaları içerisine birer **Resource** olarak ekleniyor.

Şu an **ASP.NET 3.5 Extensions** paketi içerisinde yer alan ve ileride
ASP.NET'e eklenmesi düşünülen kontrollerden biri olan Silverlight
kontrolü XAP dosyalarını alarak doğrudan ASP.NET sayfalarına
yerleştirilebilecek. Örnek bir Silverlight kontrolünün kodunu aşağıda
inceleyebilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Silverlight</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span>

    <span style="color: red;">PluginBackground</span><span
style="color: blue;">="White"</span>

    <span style="color: red;">Source</span><span
style="color: blue;">="**animasyon.xap**"</span>

    <span style="color: red;">Version</span><span
style="color: blue;">="2.0"\></span>

          <span style="color: blue;">\<</span><span
style="color: #a31515;">PluginNotInstalledTemplate</span><span
style="color: blue;">\></span>

                   Plug-In Yüklü Değil

          <span style="color: blue;">\</</span><span
style="color: #a31515;">PluginNotInstalledTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Silverlight</span><span
style="color: blue;">\></span>

Gördüğünüz gibi artık bir Silverlight 2.0 animasyonunu herhangi bir
ASP.NET sitesine yerleştirmek çocuk oyuncağına dönüşmüş. Tabi
"artık"derken bu kullandıklarımızın hiçbirinin daha yayında olan
yazılımlar olmadığını da akılda tutmakta fayda var. Fakat geleceğin
böyle olduğunu görmek hoş.

**Bir XAP dosyasında neler var?**

İlk olarak tabi ki bizim yazdığımız uygulamanın kodlarını ve XAML
kaynaklarını içeren DLL dosyamız var. Bu DLL dosyasını De-Compile
ettiğimizde içerisinde **Resource** olarak XAML dosyalarımızın var
olduğunu görebiliyoruz.

![Silverlight 2.0 DLL dosyası içerisindeki XAML
dosyalarımız.](media/Silverlight_2_0_XAP_Paketleri/18032008_2.png)\
*Silverlight 2.0 DLL dosyası içerisindeki XAML dosyalarımız.*

Haricen Silverlight 2.0 projemizde kullandığımız kontrollere ait DLL
dosyaları da yine XAP içerisinde bulunuyor. Silverlight 2.0 içerisinde
standart kontroller bile ayrı DLL dosyaları olarak geliyor. Bunların
zamanla Plug-In'e dahil edilip edilmeyeceği belli değil fakat
Silverlight 2.0 mimarisinde harici DLL dosyalarından farklı kontroller
kullanılabileceği için bu yapı her zaman var olacaktır.

![Silverlight 2.0 Beta 1 XAP dosyası
içeriği.](media/Silverlight_2_0_XAP_Paketleri/18032008_1.png)\
*Silverlight 2.0 Beta 1 XAP dosyası içeriği.*

XAP dosyası içerisinde bir de XAML dosyası bulunuyor. Aşağıda içeriğini
inceleyebileceğiniz örnek bir **AppManifest.xaml** dosyasına
baktığımızda XAP paketi içerisinde tüm DLL'lerin sınıf isimleri ile
ilişkilendirildiklerini görüyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Deployment</span> <span
style="color: red;">xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007/deployment"</span>
<span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>
<span style="color: red;">EntryPointAssembly</span><span
style="color: blue;">="SilverlightApplication3"</span> <span
style="color: red;">EntryPointType</span><span
style="color: blue;">="SilverlightApplication3.App"</span> <span
style="color: red;">RuntimeVersion</span><span
style="color: blue;">="2.0.30226.2"\></span>

  <span style="color: blue;">\<</span><span
style="color: #a31515;">Deployment.Parts</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">AssemblyPart</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="SilverlightApplication3"</span> <span
style="color: red;">Source</span><span
style="color: blue;">="SilverlightApplication3.dll"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">AssemblyPart</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="System.Windows.Controls"</span> <span
style="color: red;">Source</span><span
style="color: blue;">="System.Windows.Controls.dll"</span> <span
style="color: blue;">/\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">AssemblyPart</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="System.Windows.Controls.Extended"</span> <span
style="color: red;">Source</span><span
style="color: blue;">="System.Windows.Controls.Extended.dll"</span>
<span style="color: blue;">/\></span>

  <span style="color: blue;">\</</span><span
style="color: #a31515;">Deployment.Parts</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Deployment</span><span
style="color: blue;">\></span>

**Deployment** tagı içerisindeki **EntryPointAssembly** uygulama ilk
çalıştırıldığında hangi DLL'in başlatılacağını belirliyor.

Bu haliyle yeni Silverlight 2.0 paketlerine baktığımızda olayın epey
derlenip toparlandığını görüyoruz. Özellikle Silverlight 1.0 ile ilgili
sıkça akla gelen "kod güvenliği" sorunları ile ilgili kısmi bir ilerleme
var diyebiliriz. En azından artık XAP (ZIP) dosyasını açmanız DLL'i
çıkarmanız ve De-Compile etmeniz gerekiyor. Tabi ki tüm bunlar mümkün :)
fakat biraz daha zağmetli hale geldi diyebiliriz. Ayrıca artık
Silverlight uygulamalarının dağıtımı ve paylaşımı çok daha kolay.
Özellikle bu tip animasyonları içerik yönetim sistemlerinde kullanmak
isteyenler için SL 2.0 büyük kolaylık olacaktır.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-3-19 tarihinde yayinlanmistir.*
