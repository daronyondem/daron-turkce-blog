---
FallbackID: 2456
Title: Silverlight 4 Beta Masaüstü (OOB) Yenilikleri!
PublishDate: 24/11/2009
EntryID: Silverlight_4_Beta_Masaustu_OOB_Yenilikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: c7de1450-c795-4894-bb63-c0ce9169e6ec
---
Silverlight uygulamalarının rahatlıkle en ufak bir kod bile yazılmadan
masaüstüne taşınması muhteşem bir de yazılım geliştirici deneyimi!
Sanırım bu cümlem epey sansasyonel olabilir :) Kod yazılmayan bir şey
nasıl yazılım geliştirici deneyimi olabilir değil mi? Her neyse biz
konumuza dönelim. Sonuç olarak hazırladığımız bir web uygulaması olan
Silverlight projesini en ufak bir değişiklik yapmadan masaüstü ortamına
alabiliyor olmak hatta bu senaryonun Mac ortamında da aynen çalışması
Silvelright 3 zamanında büyük heyecan yaratmıştı. Silverlight 4 ile
beraber OOB (Out Of Browser) moduna tabi ki bir çok eklenti geldi. Bu
yazımızda bu eklentilerden ve yeni özelliklerden bir kısmına
değineceğiz.

![Silverlight 4 Beta ile beraber gelen OOB
Ayarları](http://cdn.daron.yondem.com/assets/2456/23112009_1.png)

Yukarıdaki ekran görüntüsü klasik bir Silverlight projesine ait OOB
moduna alınırken Visua Studio içerisinde kullandığımız ayarların
bulunduğu yere ait. Özellikle kırmızı ile çizilmiş alanlardaki
yenilikleri farkına varmışsınızdır. Minik yeniliklerden biri artık OOB
modunda açılacak pencerenin boyutundan tutun ekranın neresinde
açılacağına kadar gerekli kararları biz verebiliyoruz. Kod içerisinde de
herhangi bir yer **Application.Current.MainWindow** üzerinden tüm bu
özelliklere runtime esnasında da ulaşabilirsiniz.

**Trusted Mode = ON!**

İşte en güzel özelliklerden biri Trusted Mode'un artık gelmiş olması.
Yani artık Silverlight uygulamanız desktop moduna alınırken kullanıcı
izin verirse doğrudan diske erişebilir hatta sistemdeki donanımlara bile
erişebilirsiniz! Tüm izinler sizin! Bunun için yukarıdaki ekran
görüntüsünde yer alan en alttaki seçeneği işaretleyerek uygulamanızı
dağıtabilirsiniz.

![Trusted Mode için ek güvenlik
uyarısı.](http://cdn.daron.yondem.com/assets/2456/23112009_2.png)\
*Trusted Mode için ek güvenlik uyarısı.*

Doğal olarak bu uygulamaların sisteme tam erişimi olacağı için
Silverlight Runtime normal bir OOB yükleme uyarısı yerine bir güvenlik
uyarısı çıkarıyor. Bu güvenlik uyarısını eğer kullanıcı onaylarsa artık
uygulamanızın tüm bilgisayar full trust erişimi var demektir. Eğer
uygulama içerisinde kod ile bu güvenlik seviyesine sahip olup
olmadığınızı kontrol etmeniz gerekirse
Application.Current.HasElevatedPermissions property'sini
kullanabilirsiniz. Duruma göre geriye gerekli Boolean değer
döndürülecektir.

Full trust modunda çalışan uygulamaların normal SL uygulamalarına göre
birçok artı özelliği oluyor. Örneğin Cross-Domain Request diye birşey
artık kalmıyor. Full Screen veya Open File Dialog gibi ekranların
kullanıcı tepkisi ile çalıştırılması gerektiği gibi şartlar ve kurallar
ortadan kalkıyor.

**Trusted Mode'da dosya erişimi nasıl?**

Tüm makineye erişiminiz olduğunu söylesem de aslında tam olarak öyle
değil. Örneğin bilgisayarın diskinde istediğiniz bir yere
gidemiyorsunuz. Zaten unutmayın ki uygulamanız bir Mac üzerinde de
çalışıyor olabilir. O nedenle ancak önceden tanımlı alanlara erişme
şansınız var. Örneğin "My Documents" / "Belgelerim" bunlardan sadece
biri.
**Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)**
gibi bir komutla MyDocument klasörünün konumunu öğrenebilir ve orada
istediğinizi yapabilirsiniz.

**COM Erişim Desteği!**

Eski bir VB'ci olarak :) Bu başlık beni taaa VB 6.0 günlerime döndürdü.
Malum COM erişimi asılında çok önemli ve Full Trust modu ile beraber
doğrudan COM erişimi de Silverlight 4 uygulamalarına gelebiliyor.
Böylece sistemde yüklü COM kodu ile konuşabiliyorsunuz. Bu konuda
sanırım en sık kullanılması olası örneklerde biri Office uygulamaları
ile konuşmak. Malum zaten söz konusu COM objelerinin diyelilm.. hedef
bilgisayarda yüklü olması şart. O nedenle bilgisayarında Office yüklü
bir kullanıcının Word'üne ulaşarak bir dosya açtırabiliyor olmak veya
veri aktarabiliyor olmak ilginç senaryolara yol açabilir. Aynı bunun
gibi COM üzerinden belki farklı özel donanımlara da ulaşabilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla.Click

        <span style="color: blue;">Dim</span> Excel <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>
= Interop.<span
style="color: #2b91af;">ComAutomationFactory</span>.CreateObject(<span
style="color: #a31515;">"Excel.Application"</span>)

        Excel.visible = <span style="color: blue;">True</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> btnTikla\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

               <span style="color: blue;">dynamic</span> Excel =
System.Windows.Interop.<span
style="color: #2b91af;">ComAutomationFactory</span>.CreateObject(<span
style="color: #a31515;">"Excel.Application"</span>);

               Excel.visible = <span style="color: blue;">true</span>;

        }

Yukarıda gördüğünüz kod C\#'daki yeni **Dynamic** keyword'ünü kullanmak
zorunda. Late-binding olacağı için mecburen C\# 4.0 ile gelen Dynamic
keywordü ile ilerlemeliyiz. VB'de yeni birşey kullanmaya pek gerek
kalmıyor çünkü Late-binding zaten VB'nin özünde var. İşin kötü tarafı bu
şekilde kod yazarken herhangi Intellisense'e sahip olamaycaksınız :(
Makalemizin konusu tam olarak bu olmadığı için Excel development kısmına
girmeyeceğiz fakat yukarıdaki koddan itibaren Excel'i istemci tarafından
açtıktan sonra istediğiniz gibi doküman yaratabileceğinizi vs
unutmamakta fayda var.

**WebBrowser kontrolü!**

OOB modunda gelen bir diğer yenilik de WebBrowser kontrolü! Sadece OOB
modunda çalışabilen bu kontrol bildiğiniz WPF'tekinden pek farklı değil.
İçerisinde herhangi bir siteyi açabiliyor, hatta söz konusu sitede başka
bir SL veya Flash uygulaması da yer alabiliyor.

![OOB Modunda WebBrowser kontrolü
çalışıyor.](http://cdn.daron.yondem.com/assets/2456/23112009_4.jpg)\
*OOB Modunda WebBrowser kontrolü çalışıyor.*

Eğer Trsuted Mode'da olmazsanız ancak lokal makinedeki HTML dosyalarını
gösterebilirsiniz, Trusted Mode'a geçerseniz rahatlıkla Cross-Domain'den
de kurtularak tüm webi kullanıcıya gösterme şansınız olabilir.

![WebBrowser kontrolü sadece OOB modunda
çalışır.](http://cdn.daron.yondem.com/assets/2456/23112009_3.png)\
*WebBrowser kontrolü sadece OOB modunda çalışır.*

Eğer uygulamanız farklı veri kaynaklarından HTML içeriği çekip
gösterecekse bu işlevselliği de WebBrowser kontrolünün
**NavigateToString** metodu ile yaratabilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> btnTikla.Click

        Tarayici.NavigateToString(<span
style="color: #a31515;">"\<b\>BURADA\</b\>"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki örnekte de görebileceğiniz üzere rahatlıkla elinizdeki HTML
kodu render edip göstermek için de WebBrowser kontrolünü
kullanabilirsiniz. Hatta WebBrowser kontrolünün **InvokeScript** metodu
ile yüklediğiniz HTML sayfadaki bir JavaScript metodunu çağırabilir
JavaScript tarafından da SL uygulamasına ping mesajları
gönderebilirsiniz.

**[JavaScript]**

window.external.Notify("Hoop! Sakin!");

WebBrowser kontrolünün içine yüklediğiniz bir HTML'in içerisindeki
JavaScript kodlarının herhangi bir yerinden yukarıdaki gibi Notification
mesajları Silverlight Runtime'a gönderilebilir. Unutmayın ki tüm bunlar
OOB modunda WebBrowser kontrolü için geçerli. Yukarıdaki şekilde
gönderilen bir mesaj WebBrowser tarafından **OnScriptNotify** eventı ile
yakalanabilir. **NotifyEventArgs** getiren söz konusu eventın argümanı
üzerinden de **Value** Property'si ile gelen notification mesajını
alabilirsiniz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Tarayici\_ScriptNotify(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Controls.<span
style="color: #2b91af;">NotifyEventArgs</span>) <span
style="color: blue;">Handles</span> Tarayici.ScriptNotify

        <span style="color: #2b91af;">MessageBox</span>.Show(e.Value)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Bu haliyle tüm manzara bakıldığında harici siteleri gösterebilmenin yanı
sıra lokal uygulama tarafından verilen HTML'leri de render edip
içlerindeki JavaScript'i de çalıştırabilen. Hatta CLR ile JavaScript'i
de yine uygulama içerisinde çift taraflı olarak konuşturabilen esnek bir
yapıdan bahsediyoruz.

Silverlight 4 masaüstü modunda da giderek kuvvetlenerek
geliştirilebilecek uygulamalarda uygulanabilecek çözümleri
genişletmemizde büyük fayda sağlıyor.

Hepinize kolay gelsin.


