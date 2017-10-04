---
FallbackID: 1884
Title: Fanatizmin Zararları
PublishDate: 14/12/2007
EntryID: Fanatizmin_Zararlari
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
old.EntryID: 79b28f8a-8223-4187-b8e3-9114e962237d
---
**Fanatizm** başlığını attıktan sonra nasıl bunu benim blogun konseptine
bağlayacağımı merak ediyorsanız aslında hiç de zor değil çünkü toplumca
"**Yazılımda Fanatizm**" diyebileceğimiz ciddi bir sorunun içine yine
çok ciddi şekilde düşmüş durumdayız . Peki nedir bu "Yazılımda
Fanatizm"?

Aslında olay çok basit, önünde daha iyi bir ürün veya teknoloji
bulunmasına rağmen ısrarla X marka ürün veya teknolojiyi seçen adama ben
"**FANATİK**" diyorum ve şahsen futbolla da çok ilgilenmeyen biri olarak
fanatikleri hiç mi hiç sevmiyorum. Belki sizlere "**Regal**"in
reklamlarını hatırlatarak ne demek istediğimi daha iyi anlatabilirim. Bu
arada yanlış anlaşılmasın hayatımda bir tane bile Regal ürünü almadım
ama reklamlarında anlatılan konsept aslında hepimizin içine düştüğümüz
bir soruna parmak basıyor. Olayı biraz daha somutlaştıralım.

Benim blogumda bugüne kadar herhangi bir Linux ürünü ile ilgili yazı
görmemişsiniz göremezsiniz de çünkü uzmanlık alanım değil. Ama yeri
geldiğinde Adobe ürünleri ile ilgili yazılar da yazdım, yazmaya da devam
ederim gerektiğince. Zaten sayfanın en üstünde de yer aldığı üzere ACP
sertifikasyonuna da sahibim. Meseleyi uzatmadan şöyle bir örnek veriyim.

Varsayalım bir web projemiz var elimizde ve bu projenin ihtiyaçlarını
değerlendirdiğimizde bizim sitemizden bir dosya arşivi yayınlamamız
gerekiyor. Şimdi düşünelim bakalım. Amacımız en hızlı üretkenlik ile en
uygun şekilde projeyi sonlandırarak müşteriye en düşük maliyeti sağlamak
değil mi? Bu durumda en hızlı web uygulaması üretimi için Visual Studio
2008 ve ASP.NET'i seçiyoruz. Hatta projemiz 20.000\$ altında olduğuna
göre Visual Studio 2008 lisansı da satın almıyoruz ve gidip tamamen
ücretsiz Visual Web Developer Express kullanıyoruz.Veritabanı sistemi
olarak da SQL kullanmak istediğimiz için ilk akla gelen seçeneklerimiz
MySQL veya MSSQL Express Edition. MSSQL Expression Edition ile beraber
Managed Code Store Procedure'ler kullanarak üretkenliğimizi
arttırabileceğimiz için yine ücretsiz olan MSSQL Expression Edition'ı
tercih ediyoruz. Ne de olsa projemizdeki veritabanı sunucusu tek
işlemcili olacak ve tüm ihtiyaçlarımız MSSQL Expression Edition
tarafından karşılanabiliyor. Sitemizi yayınlamak için bir de hosting
ayarlamamız gerekecek. ASP.NET 3.5 kullanacağımız için Windows Server
2003 kullanmak zorundayız fakat sitemizin ciddi bir dosya paylaşımı
altyapısı da olacak ve bu dosyaları barındıracak bir Windows hosting
ciddi pahalı. O zaman gelin tekrar düşünelim. Neden dosyalarımızı bir
Linux sunucuya koymuyoruz? Linux barındırma alanları çok daha uzuc değil
mi? Öyleyse dosyalarımızı ASP.NET 3.5 ile hazırladığımız ve Windows
Server 2003 üzerinde çalışan sitemize yüklediğimizde sitemiz bizim
ayarladığımız Linux sunucuya bağlansın ve dosyayı oraya koysun. Sonra da
direk Linux sunucu üzerinden dosyaları stream edelim ama uygulamamız
Windows sunucuda çalışsın.

**Süper oldu!**

En düşük maliyeti sağladık mı? Evet. Üretkenliğimizi arttırmak için
Microsoft ürünleri seçtik fakat dosya paylaşımı için de sektördeki
hizmetleri değerlendirirken Linux tarafını tercih ettik. Amacımıza
ulaştık mı? Bence ulaştık. Yukarıda bahsettiğim senaryo gerçek bir
projede uygulanmış gerçek bir senaryodur. Tabi ki bu senaryo farklı
kurumlarda farklı şekillerde olabilirdi. Benim esas anlatmak istediğim
nokta bir "**ÇÖZÜM**" geliştirirken sektördeki tüm ürünleri ve
teknolojileri **markadan bağımsız** olarak **fanatizmden** uzak bir
şekilde değerlendirmenin gerekliliği.

"*Ben Microsoft sevmem! Açık kaynak kodcuyum!", "Ben Linux sevmem
Microsoft süperdir*" gibi balon sözlerle yaşanan zamanlar artık geçti.
**Expression Studio** içerisinde "**Photoshop PSD**"çıktısı varsa,
**Expression Media** artık **Quicktime** videolarını oynatıyorsa,
**Office 2007** dosya formatları XML olmuşsa, bugün **AJAX Extension,
Silverlight ve .NET Framework 3.5** açık kaynak kodlu dağıtılıyorsa
bunların hepsi Microsoft'un durumun farkında olduğunun göstergesidir.
Peki siz farkında mısınız? Yoksa hala birer fanatik misiniz?


