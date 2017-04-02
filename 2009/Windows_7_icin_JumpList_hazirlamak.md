---
FallbackID: 2387
Title: Windows 7 için JumpList hazırlamak.
PublishDate: 8/13/2009
EntryID: Windows_7_icin_JumpList_hazirlamak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows 7, WPF
old.EntryID: c4091ac2-7471-440e-9326-8d6703f43741
---
Windows 7 Taskbarındaki en kuvvetli araçlardan biri JumpList'ler.
Taskbardaki herhangi bir programın üzerine sağ tuş ile tıklarsanız
karşınızda yeni bir menü gelecektir. Bu menü uygulama bazlı olarak
değişebileceği gibi tamamen özelleştirilebiliyor da. Örneğin hızlıca
Outlook'u inceleyecek olursan Windows 7 ile beraber Outlook'a ait
JumpList menüsünde aslında hayatımızı gerçekten kolaylaştırabilecek
kısayollar ile karşılaşabiliriz.

![Outlook'a ait JumpList
karşınızda...](http://cdn.daron.yondem.com/assets/2387/12082009_4.jpg)\
*Outlook'a ait JumpList karşınızda...*

Gördüğünüz üzere JumpList üzerinden neredeyse program içerisindeki ana
bölümlere ulaşmak veya en sık yapılan işlemlere hızlıca erişmek mümkün.
İşte biz de programlarımıza bu özellikleri kazandırabiliyoruz. Bunun
için her zamanki gibi
[WindowsAPICodePack](http://code.msdn.microsoft.com/WindowsAPICodePack)
ile beraber gelen **Microsoft.WindowsAPICodePack.dll** ve
**Microsoft.WindowsAPICodePack.Shell.dll**'i uygulamalarımızda referans
almamız gerekiyor. Gelin yeni bir WPF uygulaması yaratarak JumpList'e
nasıl hükmedebileceğimize bir göz atalım.

**[VB]**

        <span style="color: blue;">Dim</span> JumpL =
JumpList.CreateJumpList()

 

        <span style="color: blue;">Dim</span> JumpListGorev <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
JumpListLink(<span
style="color: #a31515;">"C:\\Windows\\notepad.exe"</span>, <span
style="color: #a31515;">"Not al!"</span>)

        JumpL.AddUserTasks(JumpListGorev)

        JumpL.AddUserTasks(<span style="color: blue;">New</span>
JumpListSeparator)

        JumpL.AddUserTasks(JumpListGorev)

        JumpL.Refresh()

Her uygulamada bir defaya mahsus olarak JumpList sınıfı üzerinden
**CreateJumpList** metodunu çağırmak durumundayız .Tavsiyem bu metodu
uygulamanızda bir Property haline getirerek duruma göre ilk çağrılışta
nesnenin yaratılması. Artık JumpList'imiz elimizde olduğuna göre hemen
JumpList'e farklı görevler ekleyebiliriz. Örneğimizdeki JumpListLink
nesnesinin amacı uygulama dışındaki bir başka uygulamayı çalıştırmak.
Basit bir şekilde Windows ile beraber gelen NotePad'i çağıracağız.
JumpListLink yaratırken verdiğimiz ikinci parametre JumpList üzerinde bu
komut ile eşleştirilecek olan metni tanımlıyor.

Son olarak bir önceki adımda yarattığımız JumpList nesnemize elimizdeki
**JumpListLink'i** **AddUserTasks** komutu ile ekliyoruz. Örnek olması
amacı ile yukarıdaki kod içerisinde aynı nesneyi iki kere JumpList'e
ekledim. Arada da ayrıca bir JumpListSeparator kullandım. Böylece siz de
JumpList'lerinizde eklediğiniz farklı komutları bu şekilde gruplayarak
birbirinden ayırabilirsiniz.

![Kendimize özel bir JumpList
örneği.](http://cdn.daron.yondem.com/assets/2387/12082009_5.jpg)\
*Kendimize özel bir JumpList örneği.*

**JumpListLink** yaratırken harici dosyalara link vermemizin arkasında
aslında anlamlı nedenler var. JumpList'leri uygulamanızın bir parçası
gibi gözükse de aslında uygulamanız yokken de Taskbar'da
bulunabiliyorlar. Örneğin uygulamanızı kullanıcıların Taskbar'a
pinlediğini düşünelim. Bu durumda uygulamanız kapalı olsa da ikonu
taskbarda gözükecektir. Aynı şekilde uygulamanız kapalıyken ikonuna sağ
tıklanırsa JumpList de gösterilecektir. Hatta uygulamanızın en son
JumpList'i ayarladığı şekli ile gözükecektir!

Bizim örneğimizdeki uygulamayı taskbara pinlerseniz, uygulamayı
kapatsanız da doğrudan Notepad'i açabilirsiniz ve bu durumdan bizim
uygulamamızın haberi bile olmaz. Bu nedenle eğer kendi uygulamalarınıza
parametre gönderecekseniz uygun argümanlar ile uygulamanızı hedeflemek
durumundasınız.

Örnek kodumuzun son satırında da JumpList'e ait Refresh metodunu
çağırıyoruz. Böylece gerekli ayarlar Windows tarafından kaydediliyor.

**Son açılan dosyalar? Sık açılan dosyalar?**

İsterseniz JumpList üzerinde uygulamanız tarafından sıkça açılan
dosyaların veya en son açılan dosyaların gösterilmesini de
sağlayabilirsiniz. Bunun için tabi ki uygulamanızın çalıştığı sistemde
söz konusu dosya uzantılarının uygulamanız ile eşleştirilmiş olması
gerekiyor. Merak etmeyin, programınızı söz konusu uzantıların varsayılan
programı olarak ayarlamak zorunda değilsiniz, sadece eşleştirilmiş
olması yeterli olacaktır.

![Expression Web ile açılan son
dosyalar...](http://cdn.daron.yondem.com/assets/2387/12082009_6.jpg)\
*Expression Web ile açılan son dosyalar...*

Sonrasında aşağıdaki gibi bir kod ile bu işlevselliği ister "son açılan
dosyalar" (**Recent**) ister "sıkça açılan dosyalar" (**Frequent**)
modunda aktif hale getirebilirsiniz.

**[VB]**

        JumpL.KnownCategoryToDisplay =
JumpListKnownCategoryType.Frequent

        JumpL.Refresh()

Eğer isterseniz siz de JumpList içerisinde bölümler yaratabilir ve bu
bölümlere ayrı ayrı isimler verebilirsiniz. Sonrasında her bölüme
istediğiniz kadar JumpListLink ekleme şansınız olacaktır.

**[VB]**

        <span style="color: blue;">Dim</span> Kategori <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
JumpListCustomCategory(<span style="color: #a31515;">"Özel
Kategori"</span>)

        <span style="color: blue;">Dim</span> JumpListGorev <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
JumpListLink(<span
style="color: #a31515;">"C:\\Windows\\notepad.exe"</span>, <span
style="color: #a31515;">"Not al!"</span>)

        Kategori.AddJumpListItems(JumpListGorev)

        JumpL.AddCustomCategories(Kategori)

 

        JumpL.Refresh()

İlk satırda yarattığımız **JumpListCustomCategory** nesnesine her
zamanki gibi **AddJumpListItems** ile yeni nesneler ekleyebiliriz. Tüm
bunlar söz konusu kategori içerisinde listelenecektir. Tüm bu
işlemlerden sonra JumpList üzerinden Refresh metodunu çağırmayı
unutmayın.

![Özel kategorisi ile birlikte JumpList'imizin son
hali.](http://cdn.daron.yondem.com/assets/2387/12082009_7.jpg)\
*Özel kategorisi ile birlikte JumpList'imizin son hali.*

Hepinize kolay gelsin.

[Örnek uygulama kaynak kodları - 12082009\_8.rar (566,92
KB)](http://cdn.daron.yondem.com/assets/2387/12082009_8.rar)


