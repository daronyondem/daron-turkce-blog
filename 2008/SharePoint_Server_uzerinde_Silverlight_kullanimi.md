---
FallbackID: 2022
Title: "SharePoint Server üzerinde Silverlight kullanımı."
date: "2008-4-13"
EntryID: SharePoint_Server_uzerinde_Silverlight_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Silverlight 2.0, SharePoint
old.EntryID: 690517ba-c893-49f8-a744-07894794ca6f
---
**SharePoint Server** artık sadece bir şirket içi iletişim ve paylaşım
alanı olmanın ötesinde internete açık web sitelerinin altyapısında da
rahatlıkla kullanılıyor. Her iki ihtimalde de SharePoint üzerinde
Silverlight kullanımı farklı olanaklar tanıyabilir. Örneğin şirket için
canlı video yayını dağıtımlarınızı **SharePoint** ve **Media Services**
ile **Silverlight** aracılığı ile kullanıcılara yansıtabilir veya şirket
içi eğitim videolarınızı Silverlight ile SharePoint üzerine
yerleştirebilirsiniz. Tabi ki SharePoint'in web servislerine bağalanarak
AJAX aracılığı SharePoint'in dahili verisine bağlanarak çok daha farklı
senaryolar da gerçeleştirilebilir.

**Peki SharePoint içerisinde Silverlight'ı nasıl kullanacağız?**

SharePoint içerisinde Silverlight kullanımı ile ilgili yayınlanmış olan
bir paket var. Bu paketi sunucuya yüklemenizle beraber artık SharePoint
üzerinde size özel bir WebPart'ınız oluyor. Bu WebPart'ı herhangi bir
WebPartZone'a ekleyerek istediğiniz Silverlight uygulamasının söz konusu
alanda çalışmasını sağlayabiliyorsunuz. Özetle, aslında WebPart'ımız
Silverlight uygulamalarımız için bir HostElement görevi görüyor.

Software & Services BluePrints çerçevesinde yayınlanan paketin adı
Silverlight BluePrint for SharePoint şeklinde. Aşağıdaki adresten söz
konusu paketleri ve örnekleri indirerek sunucunuza kurabilirsiniz.

<http://www.ssblueprints.net/sharepoint/>

Maalesef bu adresteki çoğu örnek Silverlight 2.0 ile hazırlanmış
durumda. "Maalesef" dememin nedeni daha Silverlight 2.0'ın Beta 1
sürecinde olması ve kesinlikle kullanımdaki sunucularınıza SL 2.0 ile
ilgili yüklemeleri yapmamanız gerektiği. Bu durumda hızlı bir şekilde
yukarıdaki adresteki ilk örnek olan "Hello Silverlight Web Part"ını
yükleyerek işe başlayabiliriz. Bu yükleme paketi içerisinde
SilverlightPart'ın yüklemesi de bulunuyor. SharePoint'e Silverlight
uygulaması yüklemek için kullanacağımız esas WebPart da zaten bu.
WebPart şu anda SL 2.0 da desteklediği için bazı durumlarda SL2.0
yüklemeleri de yapmamız şart.

"Setup\_SilverlightPart.zip" adındaki dosyanın içerisinde yüklemeyi
tamamlamanız yeterli olacaktır. Diğer yüklemeler sadece örnek
uygulamalar içeriyor. İşimiz bitti zannediyorsanız aldanıyorsunuz. Daha
yapmamız gereken birçok iş var. Gelin sunucuda yapılması gerekenleri bir
liste haline getirelim.

-   [Silverlight BluePrint](http://www.ssblueprints.net/sharepoint/)
    sitesinden ilk örneği indir ve içerisindeki
    Setup\_SilverlightPart.zip dosyasında yüklemeleri yap.
-   [Silverlight
    Plug-In](http://www.microsoft.com/silverlight/resources/install.aspx)'i
    sunucuya yüklemeniz gerekiyor. (Sorun yaşarsanız [SL 2.0
    Plug-In'](http://www.microsoft.com/silverlight/resources/installationFiles.aspx?v=2.0)i
    de yüklemek durumunda kalabilirsiniz)
-   [Silverlight 2 Beta 1
    SDK](http://www.microsoft.com/downloads/info.aspx?na=90&p=&SrcDisplayLang=en&SrcCategoryId=&SrcFamilyId=4e03409a-77f3-413f-b108-1243c243c4fe&u=http://download.microsoft.com/download/4/1/b/41b00352-1a7f-48bb-be51-b9cef025ca11/silverlight_sdk.exe)'nın
    sistemde yüklü olması gerekiyor.
-   "C:\\Program Files\\Microsoft
    SDKs\\Silverlight\\v2.0\\Libraries\\Server" adresinden
    **System.Web.Silverlight.dll** dosyasını "C:\\windows\\assembly"
    adresine kopyalayın.
-   SharePoint web sitenizin altındaki /ClientBin/ klasöründe doğru
    Silvelight.js dosyasının bulunduğundan emin olun. Eğer yoksa
    "C:\\Program Files\\Microsoft SDKs\\Silverlight\\v2.0\\Tools"
    adresinden söz konusu dosyayı kopyalayın.
-   IIS üzerinde XAML ve kullanacaksanız SL 2.0 için XAP Mime Type
    ayarlarını yapmanız gerekecek. Ayarlar şu şekilde olmalı.\
     **Extension**: .xaml / **MIME Type**: application/xaml+xml\
     **Extension**: .xap / **MIME Type**: application/x-silverlight-2-b1
    (Sadece SL 2.0 Beta 1 için özeldir)
-   Son olarak IIS'e ufak bir reset ile işlemi tamamlayabiliriz.

**SilverlightPart'ın kullanımı üzerine...**

SharePoint sunucumuza yüklediğimiz **SilverlightPart** özelliğini aktif
hale getirmek için ilk olarak "Site Actions / Site Settings / Modify All
Settings" menüsünden yola çıkarak "Site Collection Features" kısmına
gitmemiz gerekiyor. Burada yüklemiş olduğunuz SilverlightPart'ı
göreceksiniz, hemen yanında "Activate" düğmesi ile özelliği aktif hale
getirebilirsiniz.

![SilverlightPart özelliğini aktif hale
getirdik.](media/SharePoint_Server_uzerinde_Silverlight_kullanimi/12042008_1.png)\
*SilverlightPart özelliğini aktif hale getirdik.*

Artık herhangi bir sayfada WebPart olarak SilverlightPart'ımızı
ekleyebiliriz. Sayfalarımızda "Add a WebPart" dedikten sonra karşımıza
gelen listeden SilverlightPart'ımızı seçebiliyoruz. Ekleme işlemini
tamamladıktan sonra sıre geliyor ayarlara. WebPart'a ait "Tool Pane"'i
açtığınızda karşınıza bazı seçenekler gelecek. Bu seçeneklerden ilki
SharePoint sitenize koyacağınız Silvleright uygulamasının hangi sürüm
için hazırlanmış olduğu. Eğer 2.0 için hazırlanmış ise sizden bir XAP
dosyası seçmeniz istenecek. Eğer SL 1.0 için hazırlanmış bir uygulamayı
sitenize yerleştireceksiniz bu sefer de XAML dosyasını seçmeniz
gerekecektir. SL 1.0 uygulamanızın arkaplanında bir programlama
yapıldıysa ayrıca "Include JavaScript" işaretini de işaretleyerek uygun
JavaScript dosyasını seçmeniz şart. Bahsettiğimiz bu JavaScript dosyası
**Expression Blend 2** ile yaratılmış bir projedeki **Page.xaml.js**
dosyasına denk geliyor. Yani hiçbir şekilde **Silverlight.js** veya
**default.html.js** içerisinde yapılan işlemlerin yapılmasına veya söz
konusu dosyalardaki kodların bu tarafa taşınmasına gerek yok çünkü SL
uygulamasının yaratılması ve sayfaya yerleştirilmesi işini
**SilverlightPart** yapacak, yani gerekli JavaScript kodlarını kendisi
yaratacak.

![SilverlightPart
ayarları.](media/SharePoint_Server_uzerinde_Silverlight_kullanimi/12042008_2.png)\
*SilverlightPart ayarları.*

Tüm ayarlarımızı tamamladığımıza göre artık "OK" düğmesine basarak
sayfamızda Silverlight uygulamamızı rahatlıkla çalıştırabiliriz. Peki bu
seçtiğimiz XAML, XAP ve JavaScript dosyaları nerede? SharePoint web
sitenizin içerisindeki **ClientBin** klasörü içerisinde koyduğunuz tüm
dosyalar SilverlightPart içerisinde seçilebilir hale gelecektir.

Hepinize kolay gelsin.


