---
FallbackID: 1814
Title: SQL Server Database Publishing Wizard
PublishDate: 16/10/2007
EntryID: SQL_Server_Database_Publishing_Wizard
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, Visual Studio 2005, SQL Server 2005
old.EntryID: d865738a-4fb1-4101-b289-518215a39dbe
---
Yeni hazırladığınız web sitenizi SQL2005 veritabanı üzerine kurguladınız
ve lokal olarak kendi makinenizde yarattığınız SQL veritabanına
hazırladığınız site ile bazı verilerinizi de girdiniz. Sıra geldi web
sitenizi online hale getirmeye, yani hosting sağlayıcınızın sunucularına
yüklemeye. Sitenizin dosyalarını FTP üzerinden sunucuya gönderdiniz, son
olarak da SQL veritabanınızı hosting sağlayıcınızın verdiği paylaşımlı
SQL sunucu üzerindeki veritabanına yüklemeniz gerekiyor. İşte bu noktada
sorunlar başlıyor. Eğer bilgisayarınızda **Visual Studio 2005** ile
beraber gelen **SQL Express** yüklü ise maalesef **SSIS (eski DTS)**
sisteminizde yüklü olmayacaktır. O nedenle veritabanınızı karşıya atma
şansınız yok. Diğer yandan çoğu hosting sağlayıcı kendi yönetim
panelleri üzerinden sizin SQL scriptleri yükleyerek işlem
yapabileceğiniz ortamlar sağlar. Aslında elinizde tüm veritabanınızı
içerisindeki veriler ile birlikte yaratabilecek bir SQL Script bloğu
olsu hiç sorun yaşamayacaksınız.

**Karşınızda SQL Server Database Publishing Wizard 1.1**

Tam olarak yukarıda bahsettiğimiz sorunu giderme amacıyla hazırlanmış
olan **Database Publishing Wizard** ile herhangi bir SQL veritabanından
SQL Script'leri yaratabiliyoruz. Bu işlemi yaparken veritabanındaki tüm
objeleri yaratacak scriptlerin yanı sıra veritabanındaki veriyi de
scriptler şeklinde alabiliyorsunuz. Yazılımı aşağıdaki adresten
bilgisayarınıza indirebilirsiniz.

<http://www.microsoft.com/downloads/details.aspx?FamilyID=56E5B1C5-BF17-42E0-A410-371A838E570A&displaylang=en>

![SQL Server Database Publish Wizard ile SQL Script
yaratıyoruz.](http://cdn.daron.yondem.com/assets/1814/16102007_1.png)\
 *SQL Server Database Publish Wizard ile SQL Script yaratıyoruz.*

Database Publishing Wizard'ı bilgisayarınız Start/Başlat menüsünden
çalıştırabileceğiniz gibi isterseniz Visual Studio 2005 içerisinden de
kolaylıkla kullanabilirsiniz. Visual Studio 2005 içinde Server Explorer
tabında herhangi bir veritabanına sağ tuş ile tıkladığınızda "Publish to
provider" komutu ile karşılaşacaksınız, söz konusu komut Database
Publishing Wizard'ın açılmasını sağlayacaktır.

![Visual Studio 2005 ve Database Publishing
Wizard](http://cdn.daron.yondem.com/assets/1814/16102007_2.png)\
 *Visual Studio 2005 ve Database Publishing Wizard*

Database Publishing Wizard Visual Studio 2008 ile beraber entegre olarak
gelecek. İleriye dönük olarak şu anda desteklenen bir başka Publish
metodu daha yer alıyor. Bir web servisi aracılığı ile hosting
sağlayıcıya veritabanınızı aktarma şansı tanıyan bu metoddan ben bu
yazımda bahsetmedim çünkü bu servisi şu an dünyada bile veren çok az
hosting sağlayıcı var. Umarım zamanla bu servis de yaygınlaşır ve onunla
ilgili bir yazıyı da bir gün yazmam gerekir :)

Hepinize kolay gelsin...


