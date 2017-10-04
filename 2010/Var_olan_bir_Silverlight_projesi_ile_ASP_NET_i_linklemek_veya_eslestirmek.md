---
FallbackID: 2529
Title: Var olan bir Silverlight projesi ile ASP.NET'i linklemek / eşleştirmek
PublishDate: 19/7/2010
EntryID: Var_olan_bir_Silverlight_projesi_ile_ASP_NET_i_linklemek_veya_eslestirmek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4, Visual Studio 2010
old.EntryID: 622ffe1e-9ca0-49d3-b7d5-f47c30fe5c50
---
Yeni bir Silverlight projesi yaratırken çoğu zaman yanında bir de
ASP.NET sitesi alırız. Böylece veritabanı erişimi vs gibi işlemleri
ASP.NET tarafında yapabilir ve rahatlıkla Silverlight uygulamasını
sitemize entegre etmiş oluruz. Bunun üzerine ek olarak Silverlight
debugging özelliklerini de sitemizi debug ederken kullanabiliriz. Tüm
bunlar güzel, hoş ama ya zaten elimizde bir site varsa ve buna
Silverlight projesi eklemek istersek? Bu noktada da sorun yok çünkü
Visual Studio 2010 içerisinde "File / Add New Project" diyerek yeni bir
SL projesi yarattığınızda karşınıza söz konusu projeyi solution
içerisindeki hangi asp.net projesi ile linklemek istediğiniz soran bir
pencere gelecektir. Bu penceredeki ayarlarla yine yukarıda saydığımız
tüm kolaylıklardan faydalanabilirsiniz.

Esas sorun elde var olan ve birbirinden bağımsız Silverlight projeleri
ile ASP.NET projeleri birleştirirken ortaya çıkıyor. Bir solution
içerisine "File / Add Existing Project" diyerek hepsini ekleseniz de
maalesef entegrasyonla ilgili hiçbir işlem gerçekleşmiyor ve size
hiçbirşey sorulmuyor. O nedenle F5'e bastığınızda ne SL projesi build
oluyor ne XAP web sitesine kopyalanıyor ne de SL Debugging özellikleri
aktif oluyor. Bu sıkıntılı durumu çözmek için Visual Studio 2010
içerisinde özel bir ayar söz konusu ;)

Visual Studio'da Solution Explorer içerisinde Silverlight uygulamanızı
linklemek istediğiniz web uygulamasına sağ tıklayarak "**Properties**" /
"**Property Pages**" komutunu verdikten sonra karşınıza gelecek ekranda
"**Silverlight Applications**" diye bir sekme göreceksiniz. İşte tam da
bu ekranda artık ister yeni bir SL uygulaması yaratabilir ister solution
içerisindeki başka bir SL projesini ASP.NET sitesi ile
eşleştirebilirsiniz.

![Var olan SL projesi ile ASP.NET'i birbirine linklemenin
yolu.](http://cdn.daron.yondem.com/assets/2529/19072010_1.jpg)\
*Var olan SL projesi ile ASP.NET'i birbirine linklemenin yolu.*

Eşleştirme işlemi esnasında XAP'ın kopyalanacağı klasörü belirtebilir
aynı anda eğer istiyorsanız sizin için otomatik bir test HTML sayfası da
yaratılmasını sağlayabilirsiniz. Son olarak "Enable SL Debugging"
seçeneği de işaretli tutmayı unutmayın ki ASP.NET projenizi debug
ederken SL kısımlarındaki hataları da rahatlıkla inceleyebilin.

Hepinize kolay gelsin ;)


