---
FallbackID: 2736
Title: ".NET'ten Twitter'a mesaj atmak"
date: "2011-12-1"
EntryID: CS_VB_Twitter_a_mesaj_atmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, C#, Visual Basic .NET
---
Son günlerde minik birkaç araştırma ile bloguma Facebook ve Twitter
entegrasyonu ekledim. Entegrasyondan kastım nedir ilk önce onu açıkliyim
çünkü ortada atla deve bir durum yok :) Bugün kadar RSS'lerim FeedBurner
üzerinden dağıtıldığı için FeedBurner'ın RSS'ten Twitter'a
güncellemeleri post eden özelliğini kullanıyordum. Bu özellik her açıdan
süper olsa da doğal olarak blogdaki post başlığını RSS üzerinden
alabiliyorda ve özetle twitter'a giden mesajı özelleştiremiyordum. İlk
aşamada bu sorunu hallederek blogdan doğrudan Tweeter'a post gönderme
sorununu çözdem. Sonrasında ise Twitter ile Facebook Fan Page bağlantımı
yapan Facebook uygulamasına gıcık olduğum için :) onu da kendi
entegrasyonumla değiştirmek istiyordum. Facebook entegrasyon konusunu
bir başka yazıya bırakacağım. Şimdilik gelin herhangi bir yazılımdan C\#
veya VB kodundan nasıl basit bir şekilde profilinizden Tweet'ın mesajı
gönderebilirsiniz konusuna göz atalım.

### Bir Twitter Application tanımlamak gerek...

Dışarıdan herhangi bir uygulamanın twitter API'lerini kullanabilmesi
için bu uygulamanınn **Consumer key** ve **Consumer secret** denilen iki
anahtara ihtiyacı var. Bu bilgiler olmadan kimse Twitter API'lerini
kullanamıyor. Bu bilgileri almak demek de aslında Twitter'a gidip bir
"Application Submission" yapmak demek. Yani özetle Twitter'a diyoruz ki
biz senin API'lerini kullanacak bir uygulama geliştireceğiz :) Bize
gerekli bilgileri ver!

Burada ufak bir not geçmem lazım. Aslında şu ana kadar gördüğünüz tüm
Twitter Client'ları yani Windows Phone'dakinden tutun iPhone'dakine
kadar hepsi de bu şekilde önce Twitter'a başvurup kendilerini orada
uygulama olarak tanımlatıyorlar ki kendilerine özel key'leri
alabilsinler. Biz de örneğin web sitemiz sanki bir Twitter Client'mış
gibi başvurup gerekli keyleri alacağız. Yani bu işlem genelde Twitter
istemcileri yazmak için yapılsa da sonuç itibari ile Twitter API'lerini
kullanmak isteyen her "yazılım parçasının" kendisini gibi Twitter'a bu
şekilde tanıtması gerekiyor.

<https://dev.twitter.com/apps>

İşlemler çok basit. Önce yukarıdaki adresi ziyaret edip tabi ki Twitter
kullanıcınızla login oluyorsunuz. "Create New Application" dedikten
sonra sizden uygulamanızı adı, açıklaması, web sitesi gibi bilgiler
sorulacak. Uygulamanın adı atılan her tweet'in altında ufaktan
gözüküyor. Web sitesi bilgisi ise uygulama adı gözüktüğüne tıklandığında
kullanıcıların yönlendirilmesini istediğiniz yer olabilir. Benim
örneğimde ben bu işi blogum için yaptığım için uygulama adını "Daron
Yöndem Blog" koydum, linki ise blogumun adresi olarak verdim.

Bilgier arasında "Callback URL" diye birşey göreceksiniz. Eğer siz de
benim gibi tek bir kullanıcı için yazpıyorsanız bu işi Callback URL'i
boş bırakabilirsiniz. Demek istediğim şu :) şimdi benim blogdan Twitter
API'leri kullanılırken önce Twitter API kullanma iznini çözmemiz sonra
da benim blogun benim twitter hesabından mesaj atma iznini çözmemiz
gerekecek. Doğal olarak benim blogum sadece benim hesabımdan mesaj
atacağı için Callback URL'i boş bırakıyorum. Eğer yazacağınız uygulama
farklı hesaplardan mesaj atacaksa ve hatta (atıyorum) sitenize gelen
insanların Twitter hesapları ile ilgili size "mesaj atma hakkı"
verebilmelerini istiyorsanız o zaman Callback URL'e ihtiyacınız olacak.
Fakat maalesef ben bu yazıda o konulara girmeyeceğim :) Yoksa yazı çok
uzayabilir. Bu yazıdaki amacımız bir yerden sadece tek bir hesaba tweet
atabilmek.

Callback URL'i boş bırakıp geçtikten sonra uygulamanızı yaratmış
olacaksınız. Uygulamanızın logosunu (bende sitemin favicon'u oldu bu) ve
diğer ayarları ayrıca yapabilirsiniz. Unutmamanız gereken ayarlardan
biri "Settings" tabında bulabileceğiniz "Access Type" bilgisi. Bu bilgi
default olarak "Read Only" geliyor. Onu "**Read and Write**" olarak
değiştirmeyi unutmayın.

Uygulama ayarlarınızın ana sayfasında artık **Consumer Key**
ve**Consumer Secret** bilgilerini bulabilirsiniz. Geriye kaldı bu
keylerle Twitter API'lerini kullanacak olan uygulamanın sizin twitter
hesabınıza mesaj atma hakkını verip bu sefer de o hakla ilgili token
bilgisini almak :)

![Twitter'da keylerimiz ve kendi hesabımıza izin
işlemi.](media/CS_VB_Twitter_a_mesaj_atmak/twitter_api.gif)\
*Twitter'da keylerimiz ve kendi hesabımıza izin işlemi.*

Yukarıda gördüğünüz ekran direk uygulama ayarlarınızın bulunduğu bölümün
"Details" tabı. Burada yine Consumer Key ve Consumer Secret'ınızı
görebilirsiniz. (Görüntüdeki keyler benim yarattığım test uygulamasının
:) heyecanlanmayın uygulamayı çok sildim :)) En altta gördüğünüz "Create
my access token" düğmesi direk o anda login olduğunuz hesap için
uygulamaya izin verip size access token bilgisini verecektir. Bizim de
tam ihtiyacımız olan şey bu zaten :) Twitter API access keylerimiz ile
geldiğimizde kendi profilimize de erişebilmek istiyoruz.

![Access Token'ımız da
hazır.](media/CS_VB_Twitter_a_mesaj_atmak/twitter_api2.gif)\
*Access Token'ımız da hazır.*

Artık kendi hesabımıza ulaşabilmek için **Access Token** ve**Access
Token Secret** bilgileri de elimizde. Elde ettiğimiz bu dört bilgi;
Consumer Key, Consumer Secret, Access Token ve Access Token Secret
uzaktan Twitter API'lerine bağlanıp kendi hesabımıza mesaj atabilmemiz
için yeterli :)

### Sıra geldi uygulamamızı yazmaya :)

Uygulamayı yazarken HttpWebRequest'lerle OAuth'la uğraşacağımı
düşünüyorsunuz süper yanılıyorsunuz :) Visual Studio'da gidip "Tools /
Extension Manager"'dan hemen "**NuGet Package Manager**"ı bulup
yüklüyorsunuz :) NuGet kapaca birçok open source librarynin Visual
Studio entegrasyonunu otomatize eden bir arkadaş.

![NuGet kullanıma
hazır.](media/CS_VB_Twitter_a_mesaj_atmak/twitter_api3.gif)\
*NuGet kullanıma hazır.*

NuGet yüklemesi bittikten sonra hemen projenize sağ tıklayıp "**Manage
NuGet Packages**" komutunu veriyorsunuz. "Online" tabında "Twitter" diye
aratırsanız "**TweetSharp**" diye bir yükleme göreceksiniz. Hemen çift
tıklayıp yükleyin!

![TweetSharp
yüklenirken...](media/CS_VB_Twitter_a_mesaj_atmak/twitter_api4.gif)\
*TweetSharp yüklenirken...*

Sanırım tüm yüklemelerimiz artık hazır :) İş geldi son üç satır kodu
yazmaya. Evet, şaka değil. Sadece üç satır :)

**[VB]**

        <span style="color:blue;">Dim</span> TW <span
style="color:blue;">As</span> <span
style="color:blue;">New</span> TweetSharp.<span
style="color:#2b91af;">TwitterService</span>\
        TW.AuthenticateWith(<span
style="color:#a31515;">"ConsumerKeyBurada"</span>, <span
style="color:#a31515;">"ConsumerSecretBurada"</span>, <span
style="color:#a31515;">\
                "AccessTokenBurada"</span>, <span
style="color:#a31515;">"AccessTokenSecretBurada"</span>)\
        <span style="color:blue;">Dim</span> Status <span
style="color:blue;">As</span> TweetSharp.<span
style="color:#2b91af;">TwitterStatus</span> = TW.SendTweet(<span
style="color:#a31515;">"İlk Twitter Mesajımız!"</span>)

Tahmin edebileceğiniz üzere ilk satır **TweetSharp** kütüphanesinden bir
**TweetService** alıyor. İkinci satır API Key'lerimizi kullanarak
Authentication'ı halletmenin haricinde o **TwitterService** instance'ı
için ulaşacağımız hesabın erişim hakları olan**AccessToken** ve
**AccessTokenSecret'ı** da tanımlıyor. Son olarak :) son satırda artık
**SendTweet** ile twitter mesajımızı gönderiyoruz!

Hepinize geçmiş olsun ;)


