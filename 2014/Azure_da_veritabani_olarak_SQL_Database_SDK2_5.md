---
FallbackID: 2939
Title: "Azure'da veritabanı olarak SQL Database (SDK2.5)"
date: "2014-12-1"
EntryID: Azure_da_veritabani_olarak_SQL_Database_SDK2_5
IsActive: True
Section: software
MinutesSpent: 0
Tags: SQL Azure, Windows Azure
---
# Azure'da veritabanı olarak SQL Database (SDK2.5)
Azure ortamına bir ASP.NET sitesini web role olarak atmayı gördük, hatta
örnek bir "Hello World" de yaptık :) Peki ya veritabanı? İşte güzel
haber! Veritabanı kısmı Azure dünyasında belki de en az değişen yer :)
SQL Azure doğrudan bildiğimiz MSSQL ile uyumlu. Tabi minik farklılıklar
var, onlara göz atacağız ama önemli olan şu ana kadar kullandığınız
Entity Framework, LINQ2SQL, ADO.NET, NHibernate... hepsi SQL Azure ile
de birebir çalışabilir durumdalar. Güzel haberleri paylaştıktan sonra
gelin detaylara bakalım ;)

### İlk SQL Azure veritabanımız....

SQL Azure ortamında bir veritabanı yaratmak için önce kendimize özel bir
SQL Azure sunucumuz olması gerekiyor. Azure'daki her serviste olduğu
gibi SQL Azure'da da tabi ki sanal bir sunucudan bahsediyoruz. SQL
Azure'un arkaplanındaki mimariye sonra hızlı bir göz atarız. Şimdilik
aksyon peşinde koşalım ;)

![İlk SQL Azure sunucumuz
yolda...](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new.png)
*İlk SQL Azure sunucumuz yolda...*

Azure web yönetim paneline gittikten sonra sol altta "SQL Databases"ı
seçerseniz veritabanı sunucuları yönetimine geçiş yapmış olursunuz.
Yukarıdaki ekran görüntüsünden de görebileceğiniz üzere sağ alt düğmedeki artıya basarak gelen ekranda hızlıca tüm ayarları yapıp yeni bir sunucuda yeni bir veritabanı isteyebiliyoruz. Eğer hali hazırda daha önce yarattığınız bir SQL sunucusu varsa o sunucuyu seçerek aynı sanal sunucu içerisinde de yeni veritabanları yaratma şansınız var. Bu süreçte tabi ki sunucunuzun yer alacağı veri merkezini (datacenter) seçmeniz gerekecek. Eğer bu sunucuyu ve içerisindeki veritabanınızı Azure ortamındaki bir uygulama kullanacaksa uygulama ile veritabanı sunucunuzun aynı veri merkezinde olmasında da dikkat etmenizde fayda var. Son olarak
administrator için kullanıcı adı ve şifre vermeniz gerekecek. Bu
noktada SQL Azure'un Windows Authentication desteklemediği (doğal
olarak) dikkatinizi çekecektir :)

![SQL Azure'umuzun Firewall
ayarları.](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new2.png)
*SQL Azure'umuzun Firewall ayarları.*

Kullanıcı adı ve şifre detaylarını geçtikten sonra sıra geliyor SQL
sunucunun önündeki Firewall'un ayarlarına. Bu ayarlara sunucunuzu seçtikten sonra "Configure" tabından ulaşabilirsiniz. Sizin o an için kullandığınız IP doğrudan karşınıza gelecektir. İsterseniz o IP'yi doğrudan Firewall kurallarına ekleyebilirsiniz. Böylece hali hazırda kullandığınız IP ile veritabanına bağlanabilirsiniz. IP'niz değiştiğinde gelip yeni IP'yi buraya yazmanız gerekecek. Bunu engellemenin bir yöntemi de IP-Range vermek ama bu da güvenlik açısından süper bir hareket sayılmaz. Bu noktada karar sizin :) Ekran görüntüsünde de görebileceğiniz üzere eğer alt taraftaki "Windows Azure Services" iznini vermezseniz Azure servisleri dahi veritabanına ve sunucuya ulaşamayacaktır.

![SQL Azure sunucusu
ayakta.](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new3.png)
*SQL Azure sunucusu ayakta.*

Artık sunucumuz ayakta. İçinde de hazır bir veritabanı var. Eğer yeni veritabanları eklemek isterseniz hemen veritabanı listesinin bulunduğu sayfada, bu sefer de alt barda orta kısımdaki artı düğmesine tıklayabilirsiniz.

![Veritabanımızı
yaratalım.](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new4.png)
*Veritabanımızı yaratalım.*

Yeni bir veritabanı yaratırken normalden farklı olarak karşılaştığınız seçenekler Azure'un size sağlayacağı performans ve boyut ile ilgili. Basic Tier olarak adlandırılan en düşük seviyeli fiyatlandırmada 5DTU performans ile 2GB'a kadar yükselebiliyorsunuz. Standard'da 1-50 DTU arasında 250GB, Premium'da ise 100-800 DTU ile 500GB'a kadar çıkabilirsiniz. Tüm bunlar arasından bir veritabanı boyutu ve performans seçeneği seçerken hemen ekranın altında seçtiğiniz sunucunuzun bulunduğu makineden "Available DTU" miktarına da göz atın derim. Seçtiğiniz tier doğal olarak oradaki var olan performans miktarının üstünde olmamalı. Eğer durum öyleyse yeni bir SQL Azure sunucusu almanın vakti gelmiş demektir. Eğer daha büyük veritabanı alanına ihtiyacınız
varsa SQL Federation desteği, horizontal / vertical partitioning gibi
konular girecektir işin içine. Bu noktada hafif hayal kırıklığına
uğrayanlar ve "500GB/800DTU neyime yeter?" diyenler varsa hızlı bir cevap
veriyim :) "Blogu takip etmeye devam edin" :) Şaka bir yana, evet
ileride paylaşacağım bazı konular size farklı bir perspektif
kazandıracaktır ve aslında 500GB'ın yetmeme ihtimalinin ne kadar da az
olduğunu alternatifleri görünce eminim ki siz de kabul edeceksiniz ;)
Yine de tekrar ediyim :) h/v partitioning uygulanabilir teknikler
arasında.

![ConnectionString'lerde pek bir değişiklik yok gibi
:)](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new5.png)
*ConnectionString'lerde pek bir değişiklik yok gibi :)*

Yukarıdaki görüntüyü özellikle Azure yönetim panelinden bir screenshot
olarak almak istedim. Gördüğünüz üzere connection stringlerde bir
değişiklik yok. Zaten daha önce de bahsettiğimiz gibi erişim için aynı
araçları kullanıyor olacağız, connection string'de de uygun sunucu
adresini, kullanıcı adını ve şifreyi vermek yeterli. Birkaç ufak
farklılıktan biri Encrypt=True'nun zorunlu olması ve kullanıcı adının
sonuna @ işareti ile beraber sunucu adının eklenmesi gerektiği.

### Peki hiç mi kötü haber yok?

Olmaz olur mu :) ama bu haberlerin ne kadar kötü olup olmayacağı biraz
da size bağlı :) Projelerinize ve MSSQL'de kullandığınız özelliklere
bağlı.

**Database'ler arası cross-query yok!** Her connection stringde database
adı bulunmak zorunda ve her connection bağlantı kurduğu DB'ye özel. Bir
connection üzerinden birden çok DB'ye ulaşma şansınız yok, bunlar aynı
SQL Azure sunucusunda olsa da birşey değişmiyor. O nedenle cross db
çalışan querylerinizi değiştirip DAL katmanına almanız gerekecek bu
mantıkları.

**Backup Database yok!** :) Sakin! Veritabanınızın yedeğini tabi ki
alabiliyorsunuz fakat eski yöntemlerle değil. Nasıl olabileceğine dair
bir ipucu olsun diye aşağıdaki ekran görüntüsü paylaşıyorum. Bir başka
günde, makalede bu konuyu ayrıca inceliyor oluruz.

![Backup senaryosu için
ipucu...](media/Azure_da_veritabani_olarak_SQL_Database_SDK2_5/sql_new6.png)
*Backup senaryosu için ipucu...*

**Global Temp Tables yok!** Doğal olarak...

**CLR Stored Procedure yok.** Bu özellik ileride gelebilir. Şimdilik
yok. Ama normal SP'lerle ilgili bir sorun yok aman diyim yanlış
anlaşılma olmasın :) CLR SP'lerden bahsediyoruz.

Tüm bunlarla beraber SQL Azure bir migration senaryosunda uygulamanızı
Azure ortamına alırken size en arkadaşça davranacak olan servistir :)
Yukarıda bahsettiğimiz birkaç nokta haricinde herşey aynı ve herhangi
bir sorun yaşamanız söz konusu değil.

Kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2014-12-1 tarihinde yayinlanmistir.*
