---
FallbackID: 2568
Title: Silverlight 5 Beta In-Browser Elevated Trust
PublishDate: 4/25/2011
EntryID: Silverlight_5_Beta_In-Browser_Elevated_Trust
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 5
old.EntryID: 892fdbe4-864e-4e9b-a5c2-3dfa9d7d1218
---
Silverlight'ın masaüstündeki Elevated Trust özelliği duyurulduğundan
beridir bu konuda çerçevesinde en çok sorulan soru "Acaba tarayıcı
içerisinden de bu haklara sahip olabilir miyiz?" şeklindeydi. Özellikle
AutomationFactory'yi herkes tarayıcıdan da kullanabilmek istiyordu. Tabi
ki bu durum web ortamında uygulamalar için epey tehlikeli olabilir fakat
eğer şirket için bir intranet uygulamasından bahsediyorsak iplleri biraz
daha ele alarak bu tarz işlevsellikleri sağlamak da mümkün.

İşte tam da bu noktada Silverlight 5 Beta ile beraber In-Browser
(Tarayıcı içi) Elevated-Trust özelliği geliyor. Gelin hangi şartlarda
neyin nasıl çalışacağına bir göz atalım.

**In-Browser Elevated Trust nasıl ayarlanır?**

Her zaman olduğu gibi ilk yapmanız gereken tabi ki uygulamanın
manifestinde Elevated-Trust çalışabilmesi ile ilgili değişiklikleri
yapmak. Bunun için Visual Studio içerisinde projeye sağ tıklayarak
Properties komutuyla ulaştığınız ekranlardaki kontrolleri de
kullanabilirsiniz.

**[OutOfBrowserSettings.xml]**

<span style="color:blue;">  \<</span><span
style="color:#a31515;">OutOfBrowserSettings.SecuritySettings</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">SecuritySettings</span><span
style="color:blue;"> </span><span
style="color:red;">ElevatedPermissions</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Required</span>"<span
style="color:blue;"> /\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">OutOfBrowserSettings.SecuritySettings</span><span
style="color:blue;">\></span>

Bu işlemi tamamladıktan sonra basit bir Elevated Trust testi için
aşağıdaki kodu uygulama yerleştirip önce tarayıcı dışında sonra da
tarayıcı içinde kodun çalışıp çalışmadığına göz atalım.

**[C\#]**

            <span style="color:blue;">dynamic</span> WScript = <span
style="color:#2b91af;">AutomationFactory</span>.CreateObject(<span
style="color:#a31515;">"WScript.Shell"</span>);\
             WScript.Run(<span
style="color:#a31515;">@"C:\\Windows\\notepad.exe"</span>, 1, <span
style="color:blue;">true</span>);

İlginç bir şekilde göreceksiniz ki kod hem tarayıcı içerisinde hem de
dışında çalışacak. Yani bir anda tarayıcı içerisindeki uygulamamız da
Elevated Trust oldu. Eh olay bu kadar mı? :) Tabi ki değil. Şu anda
büyük ihtimal ile uygulamayı 127.0.0.1 localhost üzerinden
çalıştırdığınız için herşey sorunsuz çalışıyor. Silverlight dosyasının
bir sunucuya atıp remote download yaptığınız anda tarayıcı içerisindeki
Elevated Trust ortadan kalkacaktır. Biraz önce karşılaştığımız durum
aslında biz developerların debug hayatını kolaylaştırmak için yapılmış
bir güzellik :)

**[Registry.exe]**

HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Silverlight\\AllowElevatedTrustAppsInBrowser
(DWORD) 0×00000001

Bir uygulamanın tarayıcı içerisinde de Elevated Trust çalışabilmesi için
yukarıdaki Registry kaydının hedef makineden yapılmış olması gerekiyor.
Söz konusu kayıt bir GP ile de uygulanabilir. Bu kadarla bitmiyor,
uygulamanın hedef makinede **Trusted Publishers Certificate** listesinde
bulunan bir Code Signage Certificate ile imzalanmış olması gerekiyor.

**Daha daha?**

Registry'de kayıt olarak ekleyebileceğiniz iki ayar daha var aslında.
Bunlardan ilki **AllowInstallOfElevatedTrustApps** şeklinde. Eğer bu
şekilde bir DWORD'ü 0 değeri ile eklerseniz artık Elevated Turst
uygulamalar kullanıcılar tarafından bilgisayarlarına yüklenemez. Fakat
bu uygulamalar tarayıcı içerisinde Elevated Trust modunda çalışmaya
devam edebilir. İkinci keyword ise
**AllowLaunchOfElevatedTrustApps**.Tahmin edebileceğiniz gibi bu arkadaş
ise hem tarayıcı içi hem de dışı tüm Elevated Trust'ların deaktif
olmasını sağlayabiliyor. Bu senaryoda kullanıcı bilgisayarına Elevated
Turst uygulama yüklese de uygulama normal modda çalışıyor.

**Peki eksik birşey var mı?**

Evet :) SL5 Beta ile beraber yeni gelen Window sınıfı sadece
Out-Of-Browser Elevated Trust'ta çalışabiliyor. In-Browser uygulama
Elevated Trust olsa da Window sınıfını kullanma şansı yok.

Son bir ekleme daha... Eğer uygulamanız sadece tarayıcı içerisinde
Elevated Trust çalışsın istiyorsanız ve varsayılan "Install...." context
menüsünün gözükmemesini istiyorsanız bunu projenin OutOfBrowserSettings
özelliklerinden ayarlayabileceğinizi unutmayın ;)

**[OutOfBrowserSettings.xml]**

<span
style="color: gray;">\<OutOfBrowserSettings ShortName=</span>"<span
style="color: gray;">SilverlightApplication9 Application</span>"<span
style="color: gray;"> </span>\
 <span
style="color: gray;">                      EnableGPUAcceleration=</span>"<span
style="color: gray;">False</span>"<span style="color:blue;"> </span>\
 <span style="color:blue;">                      </span><span
style="color:red;">ShowInstallMenuItem</span><span
style="color:blue;">=</span>"<span
style="color:blue;">False</span>"<span style="color:blue;">\></span>\
 <span style="color:blue;">  </span><span
style="color: gray">\<</span><span
style="color: gray;">OutOfBrowserSettings.Blurb\></span><span
style="color: gray">SilverlightApplication9 \
Application on your desktop; at home, at work or on the go.</span><span
style="color: gray;">\
\</OutOfBrowserSettings.Blurb\></span>\
 <span
style="color: gray;">  \<OutOfBrowserSettings.WindowSettings\></span>\
 <span style="color: gray;">    \<WindowSettings Title=</span>"<span
style="color: gray;">SilverlightApplication9 Application</span>"<span
style="color: gray;"> /\></span>\
 <span
style="color: gray;">  \</OutOfBrowserSettings.WindowSettings\></span>\
 <span
style="color: gray;">  \<OutOfBrowserSettings.SecuritySettings\></span>\
 <span
style="color: gray;">    \<SecuritySettings ElevatedPermissions=</span>"<span
style="color: gray;">Required</span>"<span
style="color: gray;"> /\></span>\
 <span
style="color: gray;">  \</OutOfBrowserSettings.SecuritySettings\></span>\
 <span style="color: gray;">  \<OutOfBrowserSettings.Icons /\></span>\
 <span style="color: gray;">\</OutOfBrowserSettings</span><span
style="color:blue;">\></span>

Hepinize kolay gelsin ;)


