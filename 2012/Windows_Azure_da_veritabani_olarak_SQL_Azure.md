---
FallbackID: 2771
Title: "Windows Azure'da veritabanı olarak SQL Azure"
date: "2012-5-22"
EntryID: Windows_Azure_da_veritabani_olarak_SQL_Azure
IsActive: True
Section: software
MinutesSpent: 0
Tags: SQL Azure, Windows Azure
---
**[Aşağıdaki makalenin SDK2.5 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/software/post/Azure_da_veritabani_olarak_SQL_Database_SDK2_5)
bulabilirsiniz.]**

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
yolda...](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql.png)
*İlk SQL Azure sunucumuz yolda...*

Azure web yönetim paneline gittikten sonra sol altta "Databases"ı
seçerseniz veritabanı sunucuları yönetimine geçiş yapmış olursunuz.
Yukarıdaki ekran görüntüsünden de görebileceğiniz üzere uygun bir
subscription'ı seçtikten sonra ribbon'dan "Create" diyerek yeni bir SQL
Azure sunucusu yaratabilirsiniz. Sunucuyu yaratırken ilk olarak
sunucunun yer alacağı datacenter bölgesini seçmeniz, sonrasında da
administrator için kullanıcı adı ve şifre vermeniz gerekecektir. Bu
noktada SQL Azure'un Windows Authentication desteklemediği (doğal
olarak) dikkatinizi çekecektir :)

![SQL Azure'umuzun Firewall
ayarları.](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql2.png)
*SQL Azure'umuzun Firewall ayarları.*

Kullanıcı adı ve şifre detaylarını geçtikten sonra sıra geliyor SQL
sunucunun önündeki Firewall'un ayarlarına. Burada kesinlikle unutmamamız
gereken bir checkbox var :) Sanırım yukarıdaki ekran görüntüsünden hangi
Checkbox'tan bahsettiğim belli oluyorlar. Eğer o CheckBox işaretlenmez
ise.... durum vahim :) Yönetim paneli dahil kimse sunucuya bağlanamaz. O
nedenle o Checkbox işaretlenmeli :) Sonrasında tabi ki eğer kendi
development makinenizden de bağlanacaksanız bu sunucuya kendi IP'nizi
Firewall kurallarına eklemeniz gerek. Dikkat dikkat : ekran
görüntüsündeki gibi firewall kurallarını evde denemeyin :)

![SQL Azure sunucusu
ayakta.](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql3.png)
*SQL Azure sunucusu ayakta.*

Artık sunucumuz ayakta, hemen ekranın sağ tarafında sunucunun tam yol
bilgisini de bulabilirsiniz. Artık bu bilgileri kullanarak isterseniz
sunucuya SQL Server Management Studio ile bağlanabilirsiniz ama dikkat
etmeniz gereken ufak bir nokta var. SQL Azure desteği Management
Studio'ya 2008 R2 sürümü ile beraber geldi. Yani SQL Server Management
Studio 2008 R2 :) indirmeniz şart, aksi halde kesinlikle SQL Azure'daki
bir sunucuya bağlanamazsınız. Nitekim R2'da da bağlanırsanız GUI'lerde
eksikler göreceksiniz maalesef şimdilik :(

![Veritabanımızı
yaratalım.](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql4.png)
*Veritabanımızı yaratalım.*

Sunucumuz hazır olduğuna göre artık veritabanızımı da yaratabilirsiniz.
Ribbon'dan Create DB dediğinizde sizden veritabanı adı, çeşidi ve boyutu
istenecektir. Çeşitler arasındaki farklara şu anda girmeyeceğim :)
nitekim bu makalenin yazıldığı zamanda major farklar yok ama ileride
olacaktır. Boyut konusunda ise kabaca ihtiyacınızı tahmin ederek
ilerlemeniz gerek. Şu an için alabileceğiniz en büyük boyut 150GB,
ileride artarabilir. Eğer daha büyük veritabanı alanına ihtiyacınız
varsa SQL Federation desteği, horizontal / vertical partitioning gibi
konular girecektir işin içine. Bu noktada hafif hayal kırıklığına
uğrayanlar ve "150GB neyime yeter?" diyenler varsa hızlı bir cevap
veriyim :) "Blogu takip etmeye devam edin" :) Şaka bir yana, evet
ileride paylaşacağım bazı konular size farklı bir perspektif
kazandıracaktır ve aslında 150GB'ın yetmeme ihtimalinin ne kadar da az
olduğunu alternatifleri görünce eminim ki siz de kabul edeceksiniz ;)
Yine de tekrar ediyim :) h/v partitioning uygulanabilir teknikler
arasında.

![ConnectionString'lerde pek bir değişiklik yok gibi
:)](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql5.png)
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

**Use yok!** Evet, eğer her bağlantı zaten DB'ye özelse :) neden USE
olsun ki? Yok!

**Backup Database yok!** :) Sakin! Veritabanınızın yedeğini tabi ki
alabiliyorsunuz fakat eski yöntemlerle değil. Nasıl olabileceğine dair
bir ipucu olsun diye aşağıdaki ekran görüntüsü paylaşıyorum. Bir başka
günde, makalede bu konuyu ayrıca inceliyor oluruz.

![Backup senaryosu için
ipucu...](media/Windows_Azure_da_veritabani_olarak_SQL_Azure/sql6.png)
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


