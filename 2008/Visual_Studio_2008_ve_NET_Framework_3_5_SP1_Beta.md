# Visual Studio 2008 ve .NET Framework 3.5 SP1 Beta
Visual Studio 2008 ve .NET Framework'ün 3.5 sürümünün üzerinden uzun bir
süre geçmeden **SP1'in Beta 1**'i de karşımıza çıktı. İlginç olan SP1'in
aslında alıştığımız Service Pack yapısına benzemiyor olması. Var olan
bazı hataları düzeltmekten öte yeni özellikler ekleme yolunda ilerleyen
bu SP ile beraber gelen yenilikler arasında Visual Studio'nun WPF
Designer View kısmında performans optimizasyonları, Visual Basic ve C++
için yeni kontroller, Office 2007 Ribbon kontrolü, JavaScript
Intellisense altyapısında geliştirmeler, SQL 2008 desteği ve ADO.NET
Entity Framework dikkati çekiyor.

Özellikle **.NET Framework 3.5 SP1 Beta1** kısmına baktığımızda ise WPF
uygulamalarında şu an kadar yazılmış uygulamaların kodlarında hiçbir
değişiklik gerektirmeyecek şekilde tamamen altyapıda yapılan
değişiklikler ile ortalama %20 ile 45 arası performans kazanımı elde
edileceği belirtilen önemli noktalar arasında. Örneğin WPF tarafında
kullandığımız gerçek zamanlı DropShadow gibi efektler şu anda yazılım
destekli olarak yaratılırken SP1 sonrasında donanım destekli olarak
yaratılacak.

**.NET Framework 3.5 Client Profile**

Bu gerçekten çok akıllıca :) Bahsettiğim şey aslında şu; bugün .NET
Framework yüklemesi aslında bizim heryere yaptığımız bir yükleme. Yani
IIS üzerinde ASP.NET çalıştırmak için de aynı .NET Framework'ü
yüklüyoruz, istemcide çalıştırılacak .NET uygulaması için de istemciye
aynı .NET Framework'ü kuruyoruz. Oysa ASP.NET'te kullanılan altyapı ile
istemcideki exe'yi çalıştıracak altyapı tamamen birbiri ile aynı değil.
Özetle, bazı yerlere gereksiz şeyler yüklüyoruz :) İşte tam da bu sorunu
çözmek için **.NET Framework3.5 Client Profile** geliyor. Sadece istemci
tarafına yüklenmek üzere özel olarak hazırlanacak olan bu Framework
paketi ile artık istemciye yaklaşık 20MB'lık bir yükleme yaptırarak .NET
uygulamalarını çalıştırabileceğiz.

Tüm bu yenilikler ve daha fazlası :) şimdilik Beta1 yüklemeleri ile
karşınızda;

[Visual Studio 2008 Service Pack 1
Beta](http://go.microsoft.com/?linkid=8835250)\
 [.NET Framework 3.5 Service Pack 1
Beta](http://go.microsoft.com/?linkid=8835251)\
 [Visual Studio 2008 Express Editions with Service Pack 1
Beta](http://go.microsoft.com/?linkid=8835252)\

Bü yüklemelerin Beta olduğunu ve üretim yapılan sistemlere yüklenmemesi
gerektiğini özellikle belirtmek istiyorum. Ayrıca Silverlight 2.0 için
kullandığınız sanal makinelere de yükleme yapmamanızda fayda var. SL 2.0
için yapılan Beta yüklemeler ile bir çakışma söz konusu, sistem çalışmaz
hale geliyor. :)

Hepinize kolay gelsin...



*Bu yazi http://daron.yondem.com adresinde, 2008-5-15 tarihinde yayinlanmistir.*
