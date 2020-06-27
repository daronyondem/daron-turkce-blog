---
FallbackID: 2384
Title: "Windows 7 Taskbar'da Overlay İkon ve Progress Özellikleri"
date: "2009-8-10"
EntryID: Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows 7, WPF
old.EntryID: ad1f6284-0ca4-4652-879d-b34bd9626d18
---
*Windows 7'nin RTM olduğu bugünlerde artık yeni hazırladığımız
uygulamalarda da Windows7'nin özelliklerinden faydalanmanın zamanı
geldi. Önümüzdeki günlerde sizlerle Windows7 tarafında farklı
yenilikleri teknik detaylar ile paylaşacağım. Bugün bu ilk makalemizde
hızlı bir giriş yapalım. Umarım yazılar faydalı olur.*

Windows 7 ile beraber gelen farklı özelliklerin C\# veya VB gibi managed
diller ile kullanımı için ilk olarak gerekli olan managed wrapperları
bilgisayarımıza indiremeliyiz.
<http://code.msdn.microsoft.com/WindowsAPICodePack> adresinden
indirebileceğiniz CodePack içerisinde yer alan wrapper'lar bizim
rahatlıkla Windows7 API'larına C\# veya VB ile ulaşabilmemizi
sağlayacaktır. İndirdiğiniz paket içerisinde WindowsAPICodePack adında
bir Visual Studio solution dosyası bulacaksınız. Söz konusu projeyi
Visual Studio ile açıp kaynak kodlarını inceleyebilir ve
derleyebilirsiniz. Derleme işlemi sonrasında Windows 7'nin farklı
özellikleri için farklı wrapper DLL'leri kullanımımıza hazır olacak.

**Taskbar'da Overlay Ikon Kullanımı**

Windows 7 ile beraber gelen görsel anlamdaki en önemli özelliklerden
biri alıştığımız Taskbar yapısının ciddi şekilde değişiyor olması. Yeni
yapı ile beraber kullanıcılara taskbar üzerinden anlık olarak çok daha
fazla bilgi aktarma şansımız oluyor. Örneğin eskiden sadece notification
bölümünde gösterebildiğimiz veya özel uyarı mesajları çıkardığımız
durumlara ait görsel değişiklikleri artık doğrudan Taskbar'da uygulama
ikonu üzerine ek bir ikon ekleyerek kullanıcılara yansıtabiliyoruz. Bu
etkileşimi kullanan uygulamalara bir örnek olarak Outlook'u ele
alabiliriz. Outlook içerisinde herhangi bir mesaj geldiğinde artık
taskbardaki outlook ikonunun yanında bir de mail ikonu görebiliyoruz.
Böylece Outlook herhangi bir ek mesaj penceresi vs açmadan aslında
kullanıcıyı rahatlıkla durumdan haberdar edebiliyor.

![Taskbar içerisinde Overlay İkon
gösterimi.](media/Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri/09082009_1.jpg)\
*Taskbar içerisinde Overlay İkon gösterimi.*

Biz de uygulamalarımızda bu tür ikonlar göstererek kullanıcıları farklı
durumlardan haberdar edebiliriz. O nedenle gelin bu gibi ikonları
Taskbar'da göstermenin yolunu beraberce inceleyelim.

İlk olarak hemen Taskbar ile ilgili wrapper DLL'lerimizi yeni
yaratacağımız bir WPF projesine referans almamız gerekiyor. Taskbar
özelliklerini kullanabilmeniz için **Microsoft.WindowsAPICodePack.dll**
ve **Microsoft.WindowsAPICodePack.Shell.dll**'i referens almanız yeterli
olacaktır. Ayrıca WPF tarafından **System.Drawing** sınıfını da referans
almayı unutmayın. Sonraki adımda herhangi bir ikon (\*.ico) dosyasını
projenize sağ tuş ile tıklayarak "Add Existing Item" seçeneği ile
ekleyin ve dosyanın Build Action'ını da "Resource" olarak ayarlayın.
Böylece artık uygulamamız içerisinde bir ikon dosyamız var ve yeri
geldiğinde bu dosyanın taskbarda gözükmesini sağlamamız gerekiyor.

Örnek olması amacı ile uygulama ekranın bir düğme yerleştirin ve
düğmenin Click durumuna da aşağıdaki kodu yazalım.

**[VB]**

        <span style="color: blue;">Dim</span> ikon = <span
style="color: blue;">New</span>
System.Drawing.Icon(Application.GetResourceStream(<span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"light.ico"</span>,
UriKind.RelativeOrAbsolute)).Stream)

        **TaskbarManager.Instance.SetOverlayIcon**(ikon, <span
style="color: #a31515;">"Uygulamanın bir fikri var!"</span>)

Kod içerisinde de görebileceğiniz üzere aslında işlem oldukça basit. İlk
olarak projemize eklediğimiz ico dosyasını bir Resource olarak
**Application.GetResourceStream** ile alıyoruz. Aldığımız bu stream'den
bir ikon yarattıktan sonra wrapper sınıflarımız içerisinde
**SetOverlayIcon** metodunu kullanmamız yeterli oluyor. Söz konusu metod
toplamda iki parametre ile rahatlıkla çalışabilir durumda. İlk parametre
malum ikonunumuz ikincisi ise screen reader uygulamaları tarafından ikon
gösterildiğinde okunacak olan metin.

![Uygulamamızın bir fikri var! Ampül
yanıyor!](media/Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri/09082009_2.jpg)\
*Uygulamamızın bir fikri var! Ampül yanıyor!*

Yukarıdaki ekran görüntüsünde de inceleyebileceğiniz üzere istediğimiz
zaman taskbar'da bu şekilde overlay ikonlar gösterebiliyoruz. Böylece
kullanıcılar uygulamamız arka planda çalışırken bu ufak mesajlar ile
uygulamamızın durumundan veya uygulamamıza yaptırdıkları herhangi bir
işlemin durumundan haberdar olabilirler.

**Taskbar'da Progress Gösterimi**

Varsayalım ki bir programa uzun bir işlem yaptırıyoruz ve sürekli ne
zaman biteceğinin merakı ile yanıp kavruluyoruz :) Aslında bu durum en
sık internetten birşey indirirken başımıza gelmez mi? Download ettiğimiz
o dosyanın ne kadarının bilgisayarımıza inmiş olduğunu kontrol etmek
için sürekli gidip download penceresine bakarız. Oysa keşke bunun çok
daha basit bir yolu olsaydı diyorsanız artık Taskbar üzerinde de
Progress gösterebileceğimizin müjdesini veriyorum.

Şu anda hemen Windows7 üzerinde testini yapabileceğiniz uygulama
Internet Explorer'ın ta kendisi. Eğer Internet Explorer ile bir download
işlemi başlatırsanız Taskbar'da download işleminin ne kadarının bitmiş
olduğunu gösteren bir progressBar göreceksiniz.

![Internet Explorer ile download
yaparken...](media/Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri/09082009_3.jpg)\
*Internet Explorer ile download yaparken...*

Ne kadar basit ve bir o kadar işlevsel değil mi? Yukarıda gördüğünüz
görüntü sayesinde download esnasında sürekli Internet Explorer'a gidip
durum kontrolü yapmaktan kurtuluyoruz. Peki biz kendi programlarımızda
acaba bu işlevselliği nasıl sunarız?

Her zamanki gibi yeni bir WPF uygulaması yaratarak
**Microsoft.WindowsAPICodePack.dll** ve
**Microsoft.WindowsAPICodePack.Shell.dll**'i referans olarak projemize
ekledikten sonra sahneye hemen deneme amaçlı bir düğme koyalım. Söz
konusu düğmeye her basıldığında elimizdeki bir Progress değişkenini
arttırdığımızı düşünelim.

**[VB]**

    <span style="color: blue;">Dim</span> Progress <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> btnTikla\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> btnTikla.Click

        Progress += 10

        TaskbarManager.Instance.SetProgressValue(Progress, 100)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod örneğinizde tamamen deneme amaçlı olarak yarattığımız
Progress değişkeni düğmeye her basıldığında ilerleyen bir süreci temsil
ediyor. Söz konusu süreci Taskbar'a yansıtmak için **SetProgressValue**
metodunu kullanıyoruz. Metodumuzun aldığı ilk parametresi göstermesi
gereken Progress'in değeri, ikinci parametres ise maksimum verilebilecek
Progress değerinin ta kendisi. Aslında işlem bu kadar basit fakat ek
olarak isterseniz Progress ile ilgili ek bilgiler aktarmak adına
Progress görselinin rengini de kısmen değiştirebilirsiniz. Örneğin belki
de süreç kullanıcı tarafından veya bir hata nedeniyle durmuştur? Bu
durumda kullanıcıyı yine Taskbar üzerinden uyarabilir miyiz acaba?

![Taskbar Progress'de farklı State
kullanımları.](media/Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri/09082009_4.jpg)\
*Taskbar Progress'de farklı State kullanımları.*

Taskbar'da Progress gösterirken Progress'in ayrıca nasıl gösterileceği
ile ilgili ek bir ayar daha yapabilirsiniz. Bu ayarın adı da State.
Böylece Progress'in bekleme durumunda olduğunu veya hata verdiğini veya
belki de Progress'in belirsiz olduğunu ve ne zaman biteceğini
bilmediğinizi kullanıcıya belirtebilirsiniz.

**[VB]**

           
TaskbarManager.Instance.SetProgressState(TaskbarProgressBarState.Indeterminate)

Yukarıda gördüğünüz kod basit bir şekilde Taskbar'daki Progress'in
belirsiz olduğunu belirterek Indeterminate State'e geçiş yaptırıyor.
Böylece taskbardaki Progress sürekli aynı animasyon ile uygulama
ikonunun arkasından geçecek ve uygulamanın bir işlem yaptığı fakat bitiş
süresinin belli olmadığı kullanıcıya belirtilmiş olacakı. Bu şekilde
farklı state'lerin görsellikteki değişikliklerini bir üstteki ekran
görüntüsünde inceleyebilirsiniz.

Bir sonraki makalemizde Taskbar özellikleri ile devam edeceğiz. Hepinize
kolay gelsin.

[Makaleye ait örnek kodlar : 09082009\_3.rar (1,05
MB)](media/Windows_7_Taskbar_da_Overlay_Ikon_ve_Progress_Ozellikleri/09082009_3.rar)


