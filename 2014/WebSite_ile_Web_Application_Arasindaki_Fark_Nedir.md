# WebSite ile Web Application Arasındaki Fark Nedir?
[![Mvc website ile application arasındaki fark nedir?
](media/WebSite_ile_Web_Application_Arasindaki_Fark_Nedir/soru1.gif)](https://twitter.com/gokhanaydin85/status/454555280895115264)

Geçenlerden twitter üzerinden gelen sorulardan biriydi bu malum :)
Twitter'dan cevaplamak için uzun bir konu olmanın yanı sıra bloga
yazarsam daha faydalı olur diye düşündüm. O zaman gelin şu olaya bir göz
atalım. Neymiş bakalım "Web Application" ile "Web Site" arasındaki fark.

Aslına bakarsanız ilk olarak aklıma gelen cevap "proje şablonu farkından
başka bir şey değil" şeklinde oldu. Ama sonrasında tabi ki başka soru
işaretleri de söz konusu olabilir. Yani, anladık proje şablonu
farklılığı :) ama nedir bu farklılıklar? Veya neden var bu farklılıkar?
Konuya sadece MVC gözü ile bakmayacağım bu arada çünkü soru aslında
doğrudan MVC ile alakalı değil. **Web Application ve Web Site arasındaki
farklılık** MVC seçmeseniz ve WebForms ile gitseniz de karşınıza
çıkacaktır.

### Source code nerede olsun?

İlk olarak bu iki şablon konsepti arasında bir compiler davranış
farklılığı var. Zaten her şey de buradan çıkıyor :) Eğer web site ile
devam ederseniz compiler sadece validasyon amaçlı projenizi compile eder
ve sunucuya elinizdeki tüm source code'u atmanız gerekeir. Web project
tarafında ise deployment öncesinde compiler tüm dosyaları bir DLL'e
dönüştürür ve bu şekilde deployment yapılır. Bu iki yaklaşım arasında
ciddi farklılıklar var özünde. Birinde sunucudaki IL kodunuz Runtime
tarafından çalıştırılırken diğerinde doğrudan source code'unuz Runtime
tarafından compiler'lara sunucuda gönderilerek ([Dynamic
Compilation](http://msdn.microsoft.com/en-us/library/ms366723.aspx))
çalıştırılır. Bunun uygulamanın ilk açılışında küçük bir performans
farkı yaratacağı malum ama tabi ki bunu önemsemeyebilirsiniz de. Esas
büyük farklılık aslında yazılım geliştirme süreçlerinizin tanımı ile
alakalı. Eğer "sunucuya bağlanıp orada kod editlediğim oluyor"
diyorsanız işte o zaman Web Site ile devam etmeniz gerek. Malum Web
Application'da source code sunucuda bulunmuyor.

Yukarıda bahsettiğimiz karar aslında çok kritik bir karar. Olaya sadece
kendi açınızdan bakmayın. Eğer WebSite ile devam ederseniz, yani
sunucuya source code'ları atarsanız sunucuya erişimi olan herkesin o
kodları düzenleyebilmesine de olanak vermiş olursunuz. Bu sizin
şartlarınıza göre iyi veya kötü bir durum olabilir. Kararı verecek olan
sizsiniz. Bir diğer örnek de "ben sadece bir dosyayı değiştirip sunucya
atmak istiyordum" senaryosu :) Web Site'da bunu yapabilirsiniz çünkü
compile işlemi sunucuda gerçekleşir ama WebApplication'da tüm projeyi
tekrar compile edip atmak durumundasınız. Tabi projenizi farklı
assemblylere compile olacak şekilde bölüştürebilirsiniz ama o da apayrı
uzun bir hikaye.

### Hem CS hem VB aynı projede!

Ben pek böyle bir senaryo görmedim :) ama olur ya aynı projede bir
code-behind dosyası VB diğer CS ile yazılır :) işte bunu ancak
WebSite'da yapabilirsiniz. Aslında tüm bunların nedeni yine compile
işleminin nerede nasıl yapıldığı ile alakalı. Zaten WebProject'te proje
dosyasına göre compiler seçilir ve bu da kafadan farklı dil kullanımını
engeller. Tabi ki harici kütüphaneler ekleyip solution içerisinde farklı
diller kullanabilirsiniz amma illa ki aynı web site içerisinde olacak
diyorsanız WebSite kullanmalısınız. WebSite'lar için her dosya için ayrı
ayrı request üzerine dosya uzantısına göre compiler ile
eşleştirilebilir.

### Kullandığınız Microsoft dışı araçlardan ne haber?

Microsoft ürünleri dışında bir şeyler kullanıyorsanız, örneğin NUnit,
Cruise Control.NET hatta klasik bir TFS bile Web Site projelerinde
Continious Integration'da canınızı sıkabilir. Bugünlerde TFSLive ile
işler ciddi kolaylaşmış olsa da WebProject tarafında CI
implementasyonlarında çok daha rahat edersiniz. WebProject'ler MSBuild
ile çalışır ve MSBuild entegrasyonu olan her türlü araçta çok daha rahat
edersiniz. Zaten MSBuild normalde WebSite'da çalışmıyor :) Build edip
deploy etmiyoruz malum ama zorlayıp [etrafından dönüp
çalıştırabilirsiniz](http://msdn.microsoft.com/en-us/library/ms164291.aspx).
Zor işler bu işler. Ayrıca gerek yok. Eğer gerekiyorsa WebApplication
kullanın zaten. :) CI derdiniz yoksa bu problemleri yaşamanız pek de
olası değil. Ama örneğin hatırlıyorum.. Azure SDK ilk zamanlarda
Deployment Package yaratırken bile Web Sites projeleri ile seksen takla
atmamız gerekiyordu (eskiden).

### Edit & Continue sadece WebApplications'da var!

Sanırım başlık kendini açıklıyor zaten değil mi? Eğer Edit&Continue ile
debugging esnasından özgürce takılmayı seviyorsanız zaten WebSites
kullanmıyorsunuz demektir :)

Başka başka....

- WebApplication'da birden çok web projesi arasında dependency yaratabilirsiniz.
- Dışarıdan assemblye ulaşıp farklı araçlarla UnitTest yapabilirsiniz. Web Sites ile de tabi ki UnitTest yaparsınız ama biraz daha takla atmak gerekir çünkü her sayfa assembly'de bir sınıfla eşleşmez.
- Assembly versioning olayını WebSites'da doğal olarak yapamazsınız. Assembly delivery yok zaten.
- PreBuild-PostBuild gibi olaylarınız sadece WebProject'lerde olabilir.

Tabi ki ek olarak Visual Studio'nın şablona göre içeri attığı farklı
dosyalar ve klasör yapıları da var ama onlar pek de kritik değil.
Sanırım hepsi bu kadar :) Atladıklarım varsa yorum olarak beklerim ;)

Görüşmek üzere.



*Bu yazi http://daron.yondem.com adresinde, 2014-4-13 tarihinde yayinlanmistir.*
