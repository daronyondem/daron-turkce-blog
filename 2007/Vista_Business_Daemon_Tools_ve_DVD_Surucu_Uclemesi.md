# Vista Business, Daemon Tools ve DVD Sürücü Üçlemesi
Mutluyum! Çünkü artık DVD sürücüm çalışıyor :) Nerden çıktı
diyebilirsiniz, buyrun anlatiyim.

Tahminen iki ay önce satın almış olduğum **HP Compaq** dizüstü
bilgisayarım ile eski ASUS'uma veda ettim. Sonrasında geçen bir ayın
huzuru ve mutluluğuna çamur atar gibi bir anda DVD sürücüm çalışmamaya
başladı. Uğraşacak hiç zamanım olmadığı için durumu kabullenerek yoluma
devam ettim. Bugün şans eseri bilgisayarı servisine gösterdim ve bir,
iki gün bilgisayarımdan ayrı kalmam gerektiğini belirttiler.
"*Bilgisayarım olmadan asla!*" veya HP'nin konseptine uygun olarak
"*Bilgisayarım hayatımdır!*" diyerek vazgeçemeyeceğimi dile getirdim ve
iş yerime geri döndüm.

Esas hikaye bundan sonra başlıyor. İşyerinde masama geçtim va
bilgisayarımı açtım. Karşımda Norton Dos sürümünü gördüm. Yanlış tahmin
etmemişim, bilgisayarım CD'den boot etmişti ve teknik servis CD'sini
bilgisayarımda unutmuştu. Neyse CD'yi bir kenara koyalım, demek ki DVD
sürücüde sorun yok! Windows açıldı ve hala DVD sürücünün çalışmadığını
gördüm.

**Sorun Yazılımsal!**

İşte artık mesele benim meselem :) Sorun yazılımsal ise benim bu işi
çözmem lazım diyerek kolları sıvadım ve tabi ki çözdüm. Sorunun nedeni
bilgisayarımda yüklü olan **DAEMON Tools** programı. Sanal DVD sürücüler
yaratarak CD veya DVD imajlarının kullanılmasını sağlayan program
nedeniyle Vista Business'da böyle bir sorun oluşuyor. Tabi ki bulduğum
çözümü sizlerle de paylaşacağım.

1.  Başlat/Start menüsünden Çalıştır/Run komutu ile regedit.exe'yi
    çalıştırın.
2.  Registry içerisinde
    **HKEY\_LOCAL\_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Class**
    yolunu bulun.
3.  Bu klasör içerisindeki **{4D36E965-E325-11CE-BFC1-08002BE10318}**
    isimli klasörü bulun.
4.  Yukarıdaki klösörü bulduktan sonra içindeki **LowerFilters** ve
    **UpperFilters** kayıtlarını silin.
5.  Bilgisayarınızı baştan başlatın. İşlem tamam.

Hepinize kolay gelsin.

*Not:Sanal sürücü ekleyip çıkarma işlemleri yaptığınızda yukarıdaki
işlemleri tekrar etmeniz gerekecektir.*



*Bu yazi http://daron.yondem.com adresinde, 2007-9-27 tarihinde yayinlanmistir.*
