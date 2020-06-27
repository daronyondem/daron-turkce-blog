---
FallbackID: 2940
Title: "Azure'da SQL Azure Mimarisi (SDK2.5)"
date: "2014-12-2"
EntryID: Azure_da_SQL_Azure_Mimarisi_SDK2_5
IsActive: True
Section: software
MinutesSpent: 0
Tags: SQL Azure, Windows Azure
---
# Azure'da SQL Azure Mimarisi (SDK2.5)
Bu yazıda SQL Azure'a biraz daha farklı bir bakış açısı ile bakalım
istiyorum. SQL Azure ve Microsoft Azure'un beraber sahneye alındığında
eldeki diğer senaryolarla nasıl uyuşabileceğine göz atalım. Sonrasında
SQL Azure'un iç mimarisine bir bakış atıp nasıl bir çalışma yapısı
olduğunu inceleyelim. Son olarak da ufak bir ipucu ile günü bitirelim ;)

![Farklı
yaklaşımlar...](media/Azure_da_SQL_Azure_Mimarisi_SDK2_5/sql_architecture.png)
*Farklı yaklaşımlar...*

SQL Azure'un kullanımı noktasında genel olarak üç farklı senaryo
düşünebilir. Yukarıdaki diagrama göz atacak olursak yukarıdan başlayarak ilk senaryomuz tamamen Azure
içerisinde var olan bir uygulama yapısı. Uygulamamız bir web sitesi, web
role içerisinde yani Azure Datacenter'ında barındırılıyor ve yine aynı
yerdeki SQL Azure veritabanını kullanıyor. Bu yapıya "Code Near" yani
yakın kod deniyor. Bu yapıda SQL ile veriyi kullanan kodun biribirine
süper yakın olması tabi ki performansı ciddi şekilde etkiliyor.

İkinci yapı ise slayt içerisinde tam ortada göreceğiniz yapı. Bu yapıda
uygulama dediğimiz yazılım uzak bir noktada çalışıyor. Bu Azure
DataCenter'ı dışında bir yerlerde çalışan bir sunucu uygulaması
olabileceği gibi belki bir masaüstü uygulaması bile olabilir. Uygulama
doğrudan Azure ortamındaki SQL Azure'a bağlanarak çalışıyor. Bu yapıya
da ilkinin tam tersi olduğu için "Code Far" deniyor. Veriyi kullanan kod
ile veritabanının birbirinden en uzak olduğu bu yapıda ciddi latency
problemleri ve performans kayıpları olabiliyor.

Üçüncü ve son modelde ise daha hybrid bir senaryo kullanılıyor. Cloud
tarafındaki uygulama yine cloud tarafında bulunan ve koda en yakın
lokasyonda olan bir veritabanını kullanırken uzak noktada olan bir başka
uygulama da aynı şekilde yine kendine yakın bir veritabanı sunucusu
kullanıyor. Bu iki veritabanı sunucusu istenirse SQL Azure Data Sync
servisi ile senkronize edilebiliyor. Ayrıca tabi ki farklı senaryolar
için uzak noktadaki uygulamanın hala doğrudan cloud veritabanına
bağlanma şansı da var.

### Affinity Groups

Bu üç yapıyı da kullanırken dikkat edilmesi gereken birşey var. İster
SQL Azure sunucusu yaratırken ister bir hosted service tanımlarken Azure
Yönetim Paneli bize hep servisi hangi bölgeye veya datacenter'a
konumlandırmak istediğimizi soruyor. Ama maalesef bu yeterli değil.
Azure datacenter'ları malum kocaman arkadaşlar :) koca datacenter
içerisinde aynı uygulamanın birer parçası olan web role ile sql'in
apayrı uçlarda olmasını istemeyiz. Eğer bu gibi servislerin FC
tarafından olabildiğince düşük latency ile birbirlerine ulaşılabilecek
şekilde datacenter içerisinde konumlandırılmasını istiyorsanız Affinity
Group'lar yaratmalı ve servislerinizi tanımlarken söz konusu Affinity
Group'ların içerisine koymalısınız.

![Affinity Group
tanımlamak.](media/Azure_da_SQL_Azure_Mimarisi_SDK2_5/sql_architecture2.png)
*Affinity Group tanımlamak.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere bir Affinity Group tanımlamak için hemen portalın "Settings" bölümüne geçip "Affinity Groups" tabını kullanabilirsiniz. Sonrasında Azure tarafında yaratacağınız her servis için Data Center seçmek yerine artık Affinity Group seçmeniz gerekecek. Zaten her AF en başından bir Data Center'a bağlandığı için aslında yaptığınız şey bir DC içerisinde daha ufak bir application Group yaratıp onu kullanmak oluyor.  Özetle bir anlamda servislerinizi, SQL
Azure sunucularınızı aynı datacenter içerisinde bir pakete koymaya
çalışıyorsunuz. Bunu anlayan FC'de olabildiğince bu servisler için
provision edilecek sanal ve sonrasında da fiziksel sunucuları
birbirlerine tabiri caiz ise yakın konumlardan seçecek :)

![Arka planda neler
oluyor?](media/Azure_da_SQL_Azure_Mimarisi_SDK2_5/sql_architecture3.png)
*Arka planda neler oluyor?*

Arka planda neler olduğuna devam edecek olursak :) SQL Azure'da her
veritabanı üç kopya olarak tutuluyor. İlk veritabanı Single Primary oluyor ve tüm CRUD onun üzerinden
ilerliyor. Diğer veritabanların birer replica olarak duruyorlar. Eğer
Primary'de herhangi bir sorun olursa replica'lardan biri hemen Primary
oluyor ve paralelde de yeni bir replica daha yaratılıyor. Read operasyonları secondary'lere de dağıtılıyor.

![Daha da derinlere
doğru...](media/Azure_da_SQL_Azure_Mimarisi_SDK2_5/sql_architecture4.png)
*Daha da derinlere doğru...*

Daha da derinlere dalacak olursak :) Genel mimari manzarada en önce tabi
ki yine bir TDS Load Balancer var. Load Balancer sonrasında firewall ve
içeride de Gateway'ler bulunuyor. Bu Gateway'ler arkadaki bir çok gerçek
SQL sunucusunu bize sanal sunucular olarak yansıtıyor. Tüm bunlar
olurken en altta da yine FC'nin bu sunucuların sağlığından sorumlu
olduğunu unutmamak gerek.

Bize bir SQL sunucusu olarak gözüken sanal SQL Azure sunucusundaki bir
veritabanı ile bir diğeri aslında gerçek fiziksel dünyada farklı
sunucularda olabiliyorlar. İşte tam da bu nedenle şimdilik cross-db
query yok.



*Bu yazi http://daron.yondem.com adresinde, 2014-12-2 tarihinde yayinlanmistir.*
