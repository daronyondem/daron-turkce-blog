---
FallbackID: 1767
Title: Masaüstü Paylaşım Yazılımı hazırlayalım...
PublishDate: 29/8/2007
EntryID: Masaustu_Paylasim_Yazilimi_hazirlayalim
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Basic 2005, Visual Basic .NET
old.EntryID: 3ecdca82-ba86-4154-a47c-4ae0ce61681a
---
Masaüstü paylaşım yazılımları özellikle teknik sorunlarda müşterilere
yardımcı olma noktasında gerçekten cankurtaran özelliğine sahipler. Peki
hiç kendi masaüstü paylaşım yazılımınızı programlamayı denediniz mi? Hiç
kolay olmayacağını baştan belirtmekte fayda var. Onun yerine çok daha
kolay bir yoldan bahsedeceğiz.

Windows Vista ile beraber gelen **Meeting Space** artık eski
**Netmeeting**'in yerini almış durumda. Maalesef **Netmeeting** ile
**Meeting Space** arasında bir bağ kurmak mümkün değil. Biz
örneğimizdeki **İstemci** **(Görüntüleyici)** ve **Sunucu (Paylaşımcı)**
uygulamaları için **Windows Desktop Sharing API (RdpEncom.dll)**
arayüzlerini kullanacağız. **Windows Meeting Space** ve **Remote
Assistance** uygulamalarının da kullandığı **API** olan bu araçlar
maalesef yukarıda da bahsettiğim üzere **NetMeeting** ile uyumlu değil.

Kullanacağımız toplam iki referans bulunuyor;

RDPSRAPISharingSession – Masaüstünü paylaşmamızı sağlayacak COM objesi.\
 IRDPSRAPIViewer – ActiveX Gösterici

**Sunucu Uygulaması**

Gelin sunucu uygulamasını hazırlayarak işimize başlayalım. Aşağıdaki
ekran görüntüsünde sunucu uygulamamızın kabaca form tasarımını
görebilirsiniz. Sırası ile **Button1, Button2 ve Button3** adındaki
düğmeleri ekledim. **textbox1** metin kutusunu da davet bağlantı metnini
göstermek için kullanacağım. Davet bağlantı metni dediğimiz istemcinin
sunucuya bağlanabilmesi için gerekli tüm bilgileri içeren bir metin. Bu
metni istemci yazılımına verdiğimizde direk sunucuya bağlanabilecek.
Herhangi IP, port vs iletilmesi gerekmiyor. Siz uygulamalarınızda bu
davet metnini farklı şekillerde sunucudan istemciye iletebilirsiniz.
Gerçek hayatta nasıl senaryolar olabileceğine dair makalemizin sonunda
yer ayırıyor olacağım.

![](media/Masaustu_Paylasim_Yazilimi_hazirlayalim/29082007_1.png)

Kod ekranımıza dönüp kodlarımızı yazmadan önce projemize **RDPComapi
DLL** referansını eklememiz gerekiyor. **Solution Explorer** içerisinde
projenize sağ tuş tıklayarak **Add Reference** bölümünden aşağıdaki gibi
gerekli seçimi yapabilirsiniz.

![](media/Masaustu_Paylasim_Yazilimi_hazirlayalim/29082007_2.png)

Sıra geldi kodlarımızı yazmaya. İlk olarak **RDPCOMAPILib**
kütüphanesini import edeceğiz. Sonrasında da global bir **RDPSession**
tanımlayacağız. Benim kullanacağım değişkenin adı kısa olması amacıyla
**X** olacak.

<span style="color: blue;">Imports</span><span> RDPCOMAPILib</span>\
 <span>  </span>\
 <span style="color: blue;"> Public</span><span> <span
style="color: blue;"> Class</span> Form1</span>\
 <span> <span>    </span> <span style="color: blue;"> Dim</span> x <span
style="color: blue;"> As</span> <span style="color: blue;"> New</span>
RDPSession</span>\
\
<span style="color: blue;"> End</span><span> <span style="color: blue;">
Class</span></span>

Kullanıcılar sunucuya bağlantığında çalıştırılmak üzere **Misafir**
adında bir objeyi parametre alan bir **Sub** yaratacağız. Yarattığımız
bu kodu ileride **RDPSession**'a ait **OnAttendeeConnected** durumuna
bağlayacağız.

    <span style="color: blue;"> Private</span> <span
style="color: blue;"> Sub</span> Geliyor(<span
style="color: blue;">ByVal</span> Misafir <span style="color: blue;">
As</span> <span style="color: blue;"> Object</span>)\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Misafirim <span style="color: blue;"> As</span> IRDPSRAPIAttendee =
Misafir</span>\
 <span> <span>       </span> Misafirim.ControlLevel =
CTRL\_LEVEL.CTRL\_LEVEL\_INTERACTIVE</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>

Yukarıdaki kod içerisinde bize parametre olarak gelen **Misafir**
objesini kendi yarattığımız bir **IRDPSRAPIAttendee** objesine
eşitliyoruz. Sonrasında söz konusu objeye, yani misafire ait
**ControlLevel** özelliğini **CTRL\_LEVEL.CTRL\_LEVEL\_INTERACTIVE**
olarak düzenliyoruz. Farklı **ControlLevel** seçeneklerinden herhangi
birini kullanmak mümkün. Siz kendi çözümünüzde ihtiyaç duyduğunuz
şekilde bu ayarı değiştirebilirsiniz, örneğin istemci sadece sunucuyu
izliyor da olabilir. Bizim örneğimizde istemci sunucunun masaüstünde
işlem yapabilecek. Sıra geldi hazırladığımız **Sub'ın** durum
bağlantısını yapmaya.

    <span style="color: blue;"> Private</span> <span
style="color: blue;"> Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button1.Click\
 <span> <span>        </span> <span style="color: blue;">
AddHandler</span> x.OnAttendeeConnected, <span style="color: blue;">
AddressOf</span> Geliyor </span>\
 <span> <span>        </span> x.Open()</span>\
 <span> <span>    </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>

Sunucu ile istemci arasındaki bağlantıların davetiye metinlerine bağlı
olduğundan bahsetmiştik. Bu yapı esasen **Meeting Space**'de de
kullanılan ve **Windows Desktop Sharing API'**nin parçalarından biri.
Sunucu bir davetiye metni hazırlıyor ve bu metin istemci tarafından
kullanılarak bağlantı oluşturuluyor. Şimdi sunucu tarafından davetiye
metinleri oluşturabilmek için gerekli kodu yazacağız.

    <span style="color: blue;"> Private</span> <span
style="color: blue;"> Sub</span> Button2\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button2.Click\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Davetiye <span style="color: blue;"> As</span> IRDPSRAPIInvitation =
x.Invitations.CreateInvitation(<span
style="color: rgb(163, 21, 21);">"Denek"</span>, <span
style="color: rgb(163, 21, 21);"> "Grup"</span>, <span
style="color: rgb(163, 21, 21);"> ""</span>, 10)</span>\
 <span> <span>       </span> TextBox1.Text =
Davetiye.ConnectionString</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>

Bir davetiye yaratırken ilk parametre olarak kullanıcı adı, ikinci
parametre olarak varsa herhangi bir kullanıcı grubu adı, üçüncü
parametre olarak da gerekiyorsa bir şifre yerleştirebiliyoruz. Dördüncü
parametrede ise toplam kaç kişinin sunucuya bağlanabileceği bilgisi yer
alıyor. Bu bilgiler davetiye metninin içine yerleştiriliyor ve istemci
uygulama tarafından aktarılan değerler ile bunlar birbirini tutmaz ise
bağlantı kurulmuyor. Son olarak biz davetiye metnimizi formumuzdaki
metin kutusuna yerleştiriyoruz. Davetiye metnini kopyalayp,
yapıştırabilir veya bir dosya olarak kaydedebilirsiniz. Böylece
kullanıcılar davetiyelerini MSN gibi yazılımlarla birbirlerine
gönderebilir.

Son olarak sunucu uygulamamızın kodu aşağıdaki şekilde tamamlanıyor.

<span style="color: blue;"> Imports</span><span> RDPCOMAPILib</span>\
 <span>  </span>\
 <span style="color: blue;"> Public</span><span> <span
style="color: blue;"> Class</span> Form1</span>\
 <span> <span>   </span> <span style="color: blue;"> Dim</span> x <span
style="color: blue;"> As</span> <span style="color: blue;"> New</span>
RDPSession</span>\
 <span>  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button1.Click</span>\
 <span> <span>       </span> <span style="color: blue;">
AddHandler</span> x.OnAttendeeConnected, <span style="color: blue;">
AddressOf</span> Geliyor</span>\
 <span> <span>       </span> x.Open()</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span>Geliyor(<span
style="color: blue;">ByVal</span> Misafir <span style="color: blue;">
As</span> <span style="color: blue;"> Object</span>)</span>\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Misafirim<span style="color: blue;"> As</span> IRDPSRAPIAttendee =
Misafir</span>\
 <span> <span>       </span> Misafirim.ControlLevel =
CTRL\_LEVEL.CTRL\_LEVEL\_INTERACTIVE</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span> Button2\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button2.Click</span>\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Davetiye <span style="color: blue;"> As</span> IRDPSRAPIInvitation =
x.Invitations.CreateInvitation(<span
style="color: rgb(163, 21, 21);">"Denek"</span>, <span
style="color: rgb(163, 21, 21);"> "Grup"</span>, <span
style="color: rgb(163, 21, 21);"> ""</span>, 10)</span>\
 <span> <span>       </span> TextBox1.Text =
Davetiye.ConnectionString</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span> Button3\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button3.Click</span>\
 <span> <span>       </span> x.Close()</span>\
 <span> <span>       </span>x = <span style="color: blue;">
Nothing</span></span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span style="color: blue;"> End</span><span> <span
style="color: blue;"> Class</span></span>

**İstemci Uygulama**

İstemci uygulamamızda **IRDPSRAPIViewer ActiveX** objesini kullanıyor
olacağız. Araç çubuğunuza söz konusu kontrolü eklemeniz gerekecek.

![](media/Masaustu_Paylasim_Yazilimi_hazirlayalim/29082007_3.png)

Araç çubuğuna kontrolü ekledikten sonra tek yapmanız gereken formunuzun
üzerine bir adet **RDPViewer** eklemek. Ben uygulama içerisinde birkaç
**TableLayoutPanels** kullanarak formun penceresinin boyutu
büyütüldüğünde **RDPViewer** objesinin de otomatik büyümesini sağladım.

![](media/Masaustu_Paylasim_Yazilimi_hazirlayalim/29082007_4.png)

    <span style="color: blue;"> Private</span> <span
style="color: blue;"> Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button1.Click\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Davetiye = InputBox(<span style="color: rgb(163, 21, 21);">"Davetiye
metniniz lütfen?"</span>, <span style="color: rgb(163, 21, 21);">
"Dikkat"</span>)</span>\
 <span> <span>       </span> AxRDPViewer1.Connect(Davetiye, <span
style="color: rgb(163, 21, 21);"> "Denek"</span>, <span
style="color: rgb(163, 21, 21);"> ""</span>)</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>

**Bağlan** düğmesine basıldığında basit bir şekilde kullanıcıdan
davetiye metnini bir **InputBox** ile alıyoruz. Sunucu tarafında bir
şifre belirtmediğimiz için burada da kodumuzda herhangi bir şifre
yazmıyoruz. İstemci uygulamamızın tam kodu aşağıdaki şekilde sonlanıyor.

<span style="color: blue;"> Public</span><span> <span
style="color: blue;"> Class</span> Form1</span>\
 <span>  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button1.Click</span>\
 <span> <span>       </span> <span style="color: blue;"> Dim</span>
Davetiye = InputBox(<span style="color: rgb(163, 21, 21);">"Davetiye
metniniz lütfen?"</span>, <span style="color: rgb(163, 21, 21);">
"Dikkat"</span>)</span>\
 <span> <span>       </span> AxRDPViewer1.Connect(Davetiye, <span
style="color: rgb(163, 21, 21);"> "User1"</span>, <span
style="color: rgb(163, 21, 21);"> ""</span>)</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span> <span>   </span> <span style="color: blue;"> Private</span>
<span style="color: blue;"> Sub</span> Button2\_Click(<span
style="color: blue;">ByVal</span> sender <span style="color: blue;">
As</span> System.Object, <span style="color: blue;"> ByVal</span> e
<span style="color: blue;"> As</span> System.EventArgs) <span
style="color: blue;"> Handles</span> Button2.Click</span>\
 <span> <span>       </span> AxRDPViewer1.Disconnect()</span>\
 <span> <span>   </span> <span style="color: blue;"> End</span> <span
style="color: blue;"> Sub</span></span>\
 <span style="color: blue;">  </span>\
 <span style="color: blue;"> End</span><span> <span
style="color: blue;"> Class</span></span>

**Sonuç**

Sanırım masaüstü paylaşım uygulamasını programlamanın ne kadar da
kolaylaştığından bahsetmeme gerek yok. Tabi yukarıda kullandığımız
yapılar şu an için sadece Windows Vista üzerinde geçerli. Gerçek hayatta
bu projeyi tam olarak nerede kullanabiliriz diyenler olursa ufak bir
tavsiyede bulunabilirim. Varsayalım müşterilerinize satışını yaptığınız
bir yazılımınız var ve destek sağlamanız gerekiyor. Programınızın yardım
menüsünden müşterileriniz yardım talebinde bulunurlar. Yardım talebinde
bulundukları anda yine sizin programınız bir davetiye hazırlayarak
davetiye metnini sizin web sunucunuzda bulunan web servisi aracılığı
teknik destek merkezine iletir. Teknik destek merkezinizdeki görevliler
gelen davetiye üzerinden direk müşterinin masaüstüne bağlanarak yardımcı
olabilirler. Gerçekten hoş bir uygulama olacağı kesin. Eminim ki
üzerinde düşünüldüğünde çok farklı uygulama senaryoları oluşturulabilir.

Hepinize kolay gelsin.


