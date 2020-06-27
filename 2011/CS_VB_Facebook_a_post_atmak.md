---
FallbackID: 2737
Title: ".NET'ten Facebook'a post atmak."
date: "2011-12-5"
EntryID: CS_VB_Facebook_a_post_atmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, C#, Visual Basic .NET
---
# .NET'ten Facebook'a post atmak.
Hazır [.NET'ten Twitter'a mesaj
atma](http://daron.yondem.com/tr/post/CS_VB_Twitter_a_mesaj_atmak)
konusuna bakmışken :) Gelin bir de aynı hikayenin Facebook ayağına göz
atalım. İtiraf etmem gerek Facebook tarafı biraz daha ... hmm nasıl
desem :) "kıl" :) Aynı Twitter'da olduğu gibi yine bir Application
olarak uygulamamızı tanımlamamız gerekiyor ama buradaki farklılıklardan
biri genelde Facebook uygulamalarının Facebook içerisinde de
listeleniyor ve sunuluyor olması. Benim hikayemde ben blogdan kendi fan
page'ime post atmak istediğim için sonuç itibari ile ortada herkesin
kullanabileceğimi bir Facebook uygulaması vs olmayacak. Facebook
ortamına yaratacağım uygulamayı veya daha doğrusu "Uygulama
Pointer"'ının sadece Facebook API'lerine ulaşabilmek için kullanacağız.

Eğer [.NET'ten Twitter'a mesaj
atma](http://daron.yondem.com/tr/post/CS_VB_Twitter_a_mesaj_atmak)
konusunu okuduysanız API'lere ulaşım ve mesaj atma mantığının aslında
Facebook'da da bire bir aynı olduğunu söyleyebilirim. İlk olarak
Facebook API'lerini kullanabilmek için Facebook'da bir uygulama yaratıp
gerekli izinleri yani key'leri alacağız. Sonra yarattığımız o
uygulamanın profil sayfamıza veya benim örneğimde fan page'ime ulaşması
için gerekli izinleri isteyeceğiz. İzinlerle ilgili tokenları da
aldıktan sonra kendi başımıza yolumuza devam edebiliriz :)

<http://www.facebook.com/developers>

Hemen yukarıdaki adrese gidip facebook hesabınızla giriş yapıyorsunuz.
"Create New App" dediğiniz anda bir uygulama ismi bir de namespace
istenecek. Kafanıza göre uygun birşeyler seçin :) Bu uygulamayı zaten
bizim dışımızda yani benim örneğimden blogdan facebook post atmak için
benim dışımda kimse kullanmayacak.

Uygulamayı yarattığınız anda karşınıza gelen ilk sayfada **App ID** ve
**App Secret** bilgileri yer alacaktır. İşte bunlar Facebook API'lerini
kullanmak için izinlerimiz! Aynı sayfanın alt kısmında ise aşağıdaki
ekran görüntüsünü göreceksiniz.

![Uygun bir seçeneği seçip geçiyoruz
:)](media/CS_VB_Facebook_a_post_atmak/facebook.gif)\
*Uygun bir seçeneği seçip geçiyoruz :)*

Daha önce de dediğim gibi bizim Facebook uygulamamız facebook üzerinde
görünür bir uygulama falan olmayacak. Sadece facebook işlem yapabilen
bir uygulama olacak. Zaten uygulamanın kendisi aslında benim örneğimde
benim blog oluyor :) Blogumun da tek yapacağı benim adıma fan page'ime
post atmak o kadar. O nedenle yukarıdaki ekran görüntüsündeki gibi
Canvas URL vs bilgilerini sallayabilirsiniz. Bu URL bilgilerini Facebook
üzerinde çalışacak bir uygulama geliştirmek istediğinizde tabi ki kritik
olacaktır fakat bu senaryo konumuz dışında :)

### Kendi profilimiz için token alma zamanı!

Şimdi uygulamamızı yarattık ama bu uygulamanın daha bizim profil
sayfamızda işlem yapma hakkı yok. Normalde bu hak alma vs işlemlerini
uygulamanızın bir parçası haline getirebilirsiniz. Tabi bu durum eğer
uygulamanız birden çok müşteriye ve facebook hesabına erişecekse
gerekecektir. Benim örneğimde tek istediğim kendi profil sayfama hatta
profilimden de öte fan page sayfama erişebilmekti.

**[URL]**

http://www.facebook.com/dialog/oauth/?response\_type=token&display=popup&\
scope=**user\_about\_me,publish\_stream,offline\_access,manage\_pages**&\
client\_id=APP\_ID\_BURAYA&\
redirect\_uri=http://www.facebook.com/connect/login\_success.html

Yukarıda gördüğünüz URL'i alıp doğrudan bir tarayıcıya
yapıştırabilirsiniz. Tabi öncesinde APPID kısmını kendi APPID'niz ile
değiştirmeyi unutmayın. Bu adrese gittiğinizde facebooka login olduktan
sonra sizden uygulamaya izin vermeniz istenecektir :) İstediğim
izinlerin çeşitlerini zaten URL içerisinde görebiliyorsunuz diye tahmin
ediyorum. **offline\_access** alacağımız tokenların expire etmemesini
sağlayacak. **publish\_stream** profilinizin duvarına post atabilmemize
izin verecek. Son olarak **manage\_pages** ise hesabınıza bağlı fan page
gibi sayfaları da yönetebilmeye izin verecek.

İzin verme işlemini yaptığınızda sayfaya sadece "Success" yazısı
gelecektir. İşte tam o anda tarayıcının adres çubuğundaki adresi alın,
kopyalayın!

**[URL]**

http://www.facebook.com/connect/login\_success.html\#\
 access\_token=AAAEnj\_ACCESSTOKEN\_BU\_ISTE\_uJZBIZD&\
expires\_in=0

Adresin içindeki fragment kısmına baktığımızda parametrelerde access
token'ın bulunduğunu görebiliyoruz! İşte budur :) İhtiyacımız olan
bilgiyi aldık.

Eğer siz de benim gibi bir fan page'e post etmek istiyorsunuz fan
page'ler için ayrı ayrı token almanız gerekiyor. Bir hesaba bağlı tüm
fan page vs'lerin tokenlarını görmek için yukarıdaki işlemleri yaptıktan
sonra aldığınız token ile aşağıdaki adresi ziyaret edebilirsiniz :)

**[URL]**

https://graph.facebook.com/me/accounts?\
access\_token=AAAEnj\_ACCESSTOKEN\_BU\_ISTE\_uJZBIZD

Bu adresteki Access Token bir önceki adımda elde ettiğimiz token.
Token'ı verip bu adrese girdiğinizde karşınıza bir JSON nesnesi
gelecektir. JSON içerisindeki tüm page'ler ve her biri için ayrı ayrı
access token'lar bulunacak. Eğer o page'lerle ilgili işlem yapmak
istiyorsanız söz konusu page'in token'ınını kullanmanız gerek.

### Token'ımız hazır şimdi kod yazma zamanı!

Artık ister kendi profil sayfamız olsun ister fan page, token'ımız hazır
olduğuna göre facebook'a nasıl bir post atarız ona bakalım. Aynı Twitter
tarafında olduğu gibi yine NuGet üzerinden bir kütüphane indirerek
ilerleyeceğiz. NuGet konusunu ilk defa duyanlar [.NET'ten Twitter'a
mesaj atma](http://daron.yondem.com/tr/post/CS_VB_Twitter_a_mesaj_atmak)
konusuna bakabilirler.

NuGet'te "Facebook" diye aratırsanız karşınıza "**Facebook SDK Core**"
diye bir kütüphane gelecektir. O kütüphaneyi referans almanız yeterli.

**[VB]**

<span style="color:blue;">Dim</span> fb = <span
style="color:blue;">New</span> <span
style="color:#2b91af;">FacebookClient</span>(<span
style="color:#a31515;">"AAAEnj\_ACCESSTOKEN\_BU\_ISTE\_uJZBIZD"</span>)\
 fb.Post(<span style="color:#a31515;">"/me/feed"</span>, <span
style="color:blue;">New</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)() <span style="color:blue;">\
        From</span> {{<span
style="color:#a31515;">"message"</span>, <span
style="color:#a31515;">"Örnek Mesaj!"</span>}})

İşte kodumuz bu kadar :) Eldeki token ile bir **FacebookClient**
yaratıyoruz sonra da "**/me/feed**"'e yani kendi duvarımıza mesajımızı
gönderiyoruz. Eğer bir fan page token'ı kullanıyorsanız fan page ID'nizi
"ME"nin yerine koyarak mesajı aşağıdaki gibi gönderebilirsiniz.

**[VB]**

<span style="color:blue;">Dim</span> fb = <span
style="color:blue;">New</span> <span
style="color:#2b91af;">FacebookClient</span>(<span
style="color:#a31515;">"AAAEnj\_ACCESSTOKEN\_BU\_ISTE\_uJZBIZD"</span>)\
 fb.Post(<span
style="color:#a31515;">"/207845619255642/feed"</span>, <span
style="color:blue;">New</span> <span
style="color:#2b91af;">Dictionary</span>(<span
style="color:blue;">Of</span> <span
style="color:blue;">String</span>, <span
style="color:blue;">Object</span>)() <span style="color:blue;">\
        From</span> {{<span
style="color:#a31515;">"message"</span>, message}})

İşte budur! :) Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2011-12-5 tarihinde yayinlanmistir.*
