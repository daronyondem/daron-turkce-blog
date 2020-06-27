# Silverlight 2.0 Çıktı!
Silverlight 2.0 sonunda yayınlandı. Bana çook uzun gelen bu bekleyişin
sonunda hem bazı şeyleri tekrar ederek hem de SL 2.0 ile ilgili yeni
bilgiler vererek bu dünyaya giriş yolunda başlangıç noktasında olanlar
için bir rehber hazırlamaya karar verdim. Buyurun beraber ilerleyelim.

**Silverlight 2.0 Runtime**

Silverlight uygulamalarının istemci tarafında yani tarayıcı içerisinde
çalışabilmesi için sistemde Silverlight 2.0 RunTime'ın yüklü olması
gerekiyor. Bu paket şu anda 4MB büyüklüğünde ve otomatik olarak
RunTime'ı yükleyecek mekanizmalar zaten Silverlight projelerine dahil
ediliyor. Bu RunTime şu anda tüm tarayıcılarda çalışıyor ve Windows, Mac
sürümleri mevcut. Windows Mobile, Linux ve Symbian konusunda çalışmalar
devam ediyor.

Silverlight 'ın çalışabilmesi için sunucu veya istemci tarafında
kesinlikle .NET Framework yüklü olması **gerekmiyor**!

**Gelen yenilikler...**

Silverlight 2.0 ile beraber artık Silverlight uygulamaları programlarken
**VB, C\#, JavaScript, IronPyhton ve IronRuby** dillerini
kullanabilirsiniz.

1.0 sürümünde eksik olan ana form kontrollerinin RunTime'a eklenmesinin
yanı sıra Layout kontrolleri,
[Calendar](http://daron.yondem.com/tr/post/6baea5ad-5be9-48e9-bf60-3077c691c3cc)
gibi özel kontroller ve
[DataGrid](http://daron.yondem.com/tr/post/fdba63c3-cf68-4f61-9527-aef452123c3b)
gibi veri kontrolleri de kullanımımıza sunuluyor. Tüm bu kontrollerin
tasarımları ile ilgili WPF'den de alışık olduğumuz şablonlama yapısı
kullanılabilir.

Silverlight 2.0 ile REST, WS\*/SOAP, POX, RSS, ve HTTP kullanılarak
farklı verilere ulaşmak mümkün. Bu çerçevede Cross-Domain-Request için
de [Policy
File](http://daron.yondem.com/tr/post/4bfde604-04ab-427c-81cb-fc775b72f912)
aracılığı ile destek sağlanıyor.

Aslında Silverlight 2.0 ile gelen Core CLR .NET'te alışık olduğumuzdan
pek farklı değil. İstemci tarafında çalışacağımız için HTML/DOM
entegrasyonu, LINQ ve özellikle XLINQ gibi tüm yapılar Silverlight 2.0
içerisinde de mevcut.

**Gelecek neler getirecek?**

AJAX Control Toolkit'i hatırlayanlarınız vardır. Aynı şekilde WPF için
de bir control toolkit çıkarıldı. Şimdi de sıra Silverlight tarafında.
"**Silverlight Control Pack**" adı verilen paket CodePlex üzerinden
yayınlanacak TreeView gibi güzel kontroller olacak. Paket tamamen [açık
kaynaklı](http://www.opensource.org/licenses/ms-pl.html) olarak
yayınlanacak.

**Eclipse** özellikle Cross-Platform bir yazılım geliştirme aracı olarak
bilinen IDE'lerden biri. Microsoft sponsorluğunda ilerleyen Soyotec'e
ait bir proje ile [Eclipse'e Silverlight](http://www.eclipse4sl.org/)
geliştirme entegrasyonu uygulanacak. Ek olarak Microsoft Silverlight
XAML'ının "[Open
Specification](http://www.microsoft.com/interop/osp/default.mspx)"
olarak duyurdu, yani isteyenler bu XAML kodunu üreten veya yazan
yazılımlar üretebilecekler.

**Araçlar nerede?**

Her zamanki gibi Visual Studio üzerinde "[Silverlight
Tools](http://go.microsoft.com/fwlink/?LinkId=129043)" paketini kurmanız
gerekiyor. Bu paket ile beraber Silverlight SDK, proje şablonları,
Intellisense desteği gibi noktlar Visual Studio'ya dahil oluyor.
Sonrasında tabi ki Silverlight 2.0 uygulamalarını tasarımı için de
Expression Blend'e ihtiyacımız var. Blend'in son yayınlanan sürümü olan
2.0 sürümü sadece Silverlight 1.0 destekliyor. Blend 2'ye Silverlight
2.0 desteğinin gelmesi için [Blend 2
SP1](http://www.microsoft.com/downloads/details.aspx?FamilyId=EB9B5C48-BA2B-4C39-A1C3-135C60BBBE66&amp;displaylang=en)'in
yüklenmesi gerek. Silverlight 2.0 Beta 2 günlerini hatırlayan Blend
2.5'i de hatırlayacaklardır, artık 2.5 diye bir şey yok :)

[Silverlight Tools for Visual Studio 2008
SP1](http://go.microsoft.com/fwlink/?LinkId=129043) (72.1MB)\
 [Microsoft Expression Blend 2 Service Pack
1](http://www.microsoft.com/downloads/details.aspx?FamilyId=EB9B5C48-BA2B-4C39-A1C3-135C60BBBE66&displaylang=en)
(17.8MB)\
 [Deep Zoom
Composer](http://www.microsoft.com/downloads/details.aspx?FamilyID=457B17B7-52BF-4BDA-87A3-FA8A4673F8BF&displaylang=en)
(3.8MB)

Silverlight 2.0 Tools paketi artık Visual Studio'nun Express sürümlerini
de destekliyor. Yani Silverlight uygulamaları programlamak için çok
kuvvetli **ücretsiz** bir alternatifiniz var.

**Nasıl öğrenebilirim?**

Silverlight 2.0 öğrenebilmeniz için başta Silverlight 2.0'ın
desteklediği programlama dillerinden birini öğrenmeniz gerek. Bu noktada
ağırlıklı olarak C\# ve VB karşımıza çıkacaktır. Aşağıdaki adreste benim
şu anda Silverlight 2.0 ile ilgili toplam **55** makalem var.

<http://daron.yondem.com/tr/formatpage.aspx?path=liste.format.html#Silverlight>

Makaleleri incelemeye başlarken Silverlight 2.0 seminerlerime ait
videoları de
[SeminerTV](http://daron.yondem.com/tr/formatpage.aspx?path=seminertv.format.html)
bölümünden edinebilirsiniz. Çok yakında Silverlight 2.0 ile ilgili
farklı detaylara yönelik seminer, ücretsiz eğitimleri de blogumdan
duyuracağım.

Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2008-10-15 tarihinde yayinlanmistir.*
