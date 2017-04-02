---
FallbackID: 2530
Title: Silverlight Out Of Browser uygulamasını nasıl debug ederiz?
PublishDate: 7/20/2010
EntryID: Silverlight_Out_Of_Browser_uygulamasini_nasil_debug_ederiz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0, Silverlight 4, Visual Studio 2010
old.EntryID: 9da5e764-b6bd-4779-b8ed-67197b97417f
---
Sanırım aradan epey zaman geçti fakat :) geçenlerde misafir olarak
bulunduğum bir şirkette aşağıdaki ipucunu paylaştığımda "Neden bloga
yazmıyorsunuz bunları?" tepkisini alınca :) aklımda kenara not almıştım.
"Bunu bloga yazmam lazım" şeklinde :) ve zamanı geldi. Biliyorsunuz
Silverlight'ın bir OutOfBrowser modu söz konusu ve özellikle "Elevated
Trust"ın da gelmesi ile epey popüler olmaya başladı bu özellik. Peki bu
şekilde OOB modunda çalışan uygulamalar geliştirirken uygulamamızı nasıl
debug edeceğiz? Sonuçta F5'e bastığımızda projemiz hem bir web sunucu
üzerinden çalıştırılıyor ve uygulama windows modunda açılamıyor.

Visual Studio 2010 ile beraber bu soruna da bir çözüm geldi. Artık
Silverlight projenizi OOB moduna geçebilecek şekilde ayarladıktan sonra
Silverlight projenize sağ tıklayıp "Properties" komutunu verdiğinizde
"Debug" tabında özel bir ayar bulabilirsiniz.

![Out Of Browser modunda debug
seçeneği.](http://cdn.daron.yondem.com/assets/2530/20072010_1.jpg)\
*Out Of Browser modunda debug seçeneği.*

Yukarıdaki ekran görüntüsünde de gördüğünüz üzere Debug ayarlarında eğer
"Out-of-browser application" seçeneğini işaretlerseniz artık Visual
Studio 2010 içerisinde F5'e bastığınızda Silverlight uygulamanız
doğrudan Desktop uygulaması gibi açılacaktır ve rahatlıkla her tür
debugging işlemini yapabileceksiniz.

Hepinize kolay gelsin ;)


