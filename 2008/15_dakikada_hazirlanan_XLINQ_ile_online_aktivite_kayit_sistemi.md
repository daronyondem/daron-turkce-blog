---
FallbackID: 1972
Title: "15 dakikada hazırlanan XLINQ ile online aktivite kayıt sistemi"
date: "2008-2-29"
EntryID: 15_dakikada_hazirlanan_XLINQ_ile_online_aktivite_kayit_sistemi
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, LINQ, ASP.NET
old.EntryID: 74e0f3a3-2c6c-4e80-9667-8adaec06e7bd
---
# 15 dakikada hazırlanan XLINQ ile online aktivite kayıt sistemi
Ücretsiz 24 saatlik Silverlight eğitimi ile ilgili duyuru içerisindeki
kayıt formunu görmüşsünüzdür. Maalesef bu form sistemini yapmamı
bekleyerek duyuruyu üç gün kadar geç yapabildik :) Bu aralarda ciddi çok
yoğun.

Peki böyle bir formu yapmak ne kadar sürebilir ki? Ortalama 15 dakikamı
aldı, ama sadece bir mailform değil :) Hazır yapmışken ileriki
aktiviteler için de kullanabileceğim bir sistem yapmak istedim. Hedefim
mini-iğrenç :) bir yönetim panelinden en azından aktivite yaratıp
kapatabilmekti, tabi kayıt olan kişilerin listesini de alabilmem
gerekiyordu. Neden iğrenç dediğimi de açıklıyım. Sadece ben kullanacağım
için yönetim panelinin güzelliği ile vs hiç mi hiç uğraşmadım :) iş
görsün yeter.

Konuyu uzatmadan, bütün bunları neden size anlattığımı da söylemekte
fayda var. Hazırlamış olduğum sistemi tüm kodları ile sizlerle
paylaşmaya karar verdim. Evet, birazdan indirebileceksiniz :)

Sistem aslında çok basit bir mantıkla çalışıyor. Yönetim panelinden bir
aktivite yaratıyorsunuz aktiviteye verdiğiniz TAG özelliği o aktivitenin
kodu oluyor. Bu kod üzerinden default.aspx?event=kod gibi adreslerle
insanlar bu aktivitelere kayıt olabiliyorlar. Her bir aktivitenin kodu,
aciklamasi ve maksimum katılımcı sınırı var. Aciklama kısmı aktivite ile
ilgili sayfadaki kayıt formunun üzerindeki HTML kısmı içeriyor. Makimum
katılımcıyı isterseniz 0 vererek sınırsız hale getirebiliyorsunuz. Her
bir aktivite ile ilgili tüm bilgiler ayrı ayrı XML dosyalarında
App\_data klasöründe saklanıyor.

**Uyarılar**

Arkadaşlar birazdan projenin kodlarını indirip incelerken bu projeyi bir
gece yarısı saat 01.00 ile 01.15 arasında yaptığımı aklınızın bir
köşesinde bulundurun :) Hatta bu projeyi paylaşıyorum diye içerisinde
herhangi bir değişiklik vs de yapmadım. Yalan olmasın login.aspx deki
şifreyi değiştirdim. O nedenle aşağıda bahsettiğim noktalarla ilgili bu
projeyi örnek almayın!

**Bunları örnek almayın!**

-Authentication yapısı rezalet. Zaten login.aspx de kullanıcı adı bile
yok, sadece şifre soruyor :) Şifreyi sorduğu metin kutusunun tipi bile
Password değil :) Bir ara düzeltmek lazım. Forms Authentication kurmaya
üşendim.

-XML dosyalarının okunması ve yazılması arasında aslında
application.lock kullanmak lazım. Aynı salisede 2 kişi formu göndermeye
kalkarsa biri karambole gidecektir. Allahtan bizde pek böyle bir ihtimal
yok gibi :) (Umarım)

**İncelenmesi gereken kısımlar (Projenin kodunu paylaşmaktaki amacım)**

XLINQ ile yazılmış kısımlara özellikle dikkat etmenizde fayda var. XML
dosyalarının yaratılmasındaki kolaylık, okunmasındaki rahatlık özellikle
dikkat çekici. Bu kodu sizlerle paylaşmanın birinci nedeni XLINQ örneği
olarak incelemeniz ikincisi ise böyle bir mini sisteme ihtiyacı olan
varsa alsın rahat rahat kullansın :)

LINQ'den bahsettiğimize göre unutmamak gerek ki bu site ASP.NET 3.5 ile
hazırlanmıştır. Projedeki bazı kodlarla ilgili yarın bazı açıklamalar da
yayınlayacağım.

Hepinize kolay gelsin.

[Aktivite Kayıt Sistemi Kaynak Kodları - 28022008\_1.zip (7.5
KB)](media/15_dakikada_hazirlanan_XLINQ_ile_online_aktivite_kayit_sistemi/28022008_1.zip)



*Bu yazi http://daron.yondem.com adresinde, 2008-2-29 tarihinde yayinlanmistir.*
