# Windows 7'de VHD'den boot etmek!
Windows 7 ile beraber gelen ve biz yazılımcıların özellikle yeni
teknolojileri test ederken kullanabileceğimiz en güzel özellik VHD'den
boot etme özelliği. Malum Beta veya Alpha yazılımları normal
kullandığımız makinelere yükleyemiyoruz. Oluşabilecek olası sorunlar
nedeniyle bu şekilde deneme amaçtı test ortamları yaratmamız
gerektiğinde kullandığımız şey sanal makineler olabiliyor. Fakat sanal
makinelerde ise performans sorunları yaşıyoruz çünkü herşes sanal :)
Makinenizin RAM'inden tutun CPU'suna kadar herşeyi aslında hem ana
işletim sistemine hem de sunulan sanal işletim sistemine paylaştırmak
zorunda kaldığımız bu seçenek çoğu zaman canımızı çıkartıyor.

**Eeee yani?**

Özetle artık sanal makinelere ihtiyacınız yok diyebilirim. VHD dosya
formatı zaten hali hazırda VirtualPC tarafından kullanılan hard disk
dosyalarını tanımlıyor. Windows 7 ile beraber bu şekilde sanal hard
diskler yaratarak söz konusu hard diskler üzerinden sisteminizi boot
edebiliyorsunuz. Yani düşünün ki normal makinenizde Lab.VHD adında bir
dosyayı C:\\ root dizininde yarattınız. Bu aslında sizin sanal
makinenizin sabit diski oluyor. Sonra bu dosyanın içindeki sabit diske
işletim sistemi kurup makineniz ilk açıldığında bu işletim sisteminin
açılmasını sağlayabiliyorsunuz. Sanal disk üzerinden açtığınız işletim
sisteminin sadece diski sanal oluyor! Diğer tüm donanım ve herşey
doğrudan fiziksel donanımlarınız ile aynı! Böylece disk kısmı hariç
hiçbir yerde performans kaybı yaşamıyorsunuz. İtiraf etmek gerekirse ben
diskteki perfromans kaybını da testlerimde pek hissetmedim. Söylentilere
göre diskteki performans kaybı %3'ün altında. Bu durumu normal sanal
makineler ile karşılaştırırsak efsanevi bir performanstan bahsettiğimiz
ortada.

**Peki nasıl yapacağız?**

İlk olarak Windows 7 DVD'nizi bilgisayarınız takıp sisteminizi baştan
başlatın. DVD'den bilgisayarınızı başlattığınızda tabi ki karşınıza
Windows 7 yükleme ekranı gelecek. Aman yüklemeye başlamayın :) Önce
sanal diskimizi yaratmamız gerek.

![Yükleme ekranında hemen "Repair"
diyoruz.](media/Windows_7_de_VHD_den_boot_etmek/01092009_1.jpg)\
*Yükleme ekranında hemen "Repair" diyoruz.*

Karşınıza gelen yukarıdaki ekranda hemen "Repair your computer"
seçeneğini seçerek ilerleyebilirsiniz. Buradan Shift+F10 tuşlarına
beraber basarak Command Prompt açmanız gerekiyor. Command Prompt
açıldıktan sonra girmeniz gereken komutları sırası ile aşağıdaki
şekilde;

**Diskpart\
**Sanal sürümüzü yaratacak olan uygulamayı açar.

**create vdisk file=d:\\Win7Lab.vhd maximum=30000**\
Bu komut yeni bir sanal disk yaratacaktır.Tahmin edebileceğiniz üzere
**file=** ile verdiğimiz parametre VHD dosyasının yaratılacağı ana
diskimizdeki konum oluyor. **maximum** parametresinde ise yaratacağınız
sanal diskin boyutunu belirtiyorsunuz. Tabi bu boyut sonuç olacak VHD
dosyasının boyutu olacak ve ana diskinizde bu kadar boş alana sahip
olmanız şart. Benim tavsiyem eğer diskinizde yer varsa 30GB vermeniz.
30GB rahatlıkla deneme amaçlı yükleyeceğiniz herşeyi sığdırabileceğiniz
bir alan olacaktır.

**select vdisk file=d:\\Win7Lab.vhd**\
Sıra geldi bu yarattığımızı diski sistemin boot listesine eklemek. Fakat
onun öncesinde tabi ki diski seçmemiz gerekiyor.

**attach vdisk**\
İşte sanal diskimizi boot liste eklediğimiz komut burası.

Artık Command Prompt'u kapatabilirsiniz fakat sakın yükleme ekranlarını
kapatmayın çünkü yeni yarattığımız sanal diske Windows7 yükleme zamanı
geldi. Bu arada ufak bir hatırlatma bu şekilde sanal disk üzerinden boot
edilebilecek iki işletim sistemi var; Windows 7 Ultimate, Enterprise ve
Server 2008 R2. Maalesef XP vs yükleyip bu şekilde sanal disk üzerinden
boot etme şansınız yok.

Windows 7 yüklemesini başlatırken "Advanced" sekmesini seçip uygun diski
seçmeyi unutmayın.

![Doğru diski seçmeyi
unutmayın.](media/Windows_7_de_VHD_den_boot_etmek/01092009_2.jpg)\
*Doğru diski seçmeyi unutmayın.*

Gördüğünüz gibi listede sanal diskimiz geliyor fakat alt tarafta da bu
diske ilgili yükleme yapılamayacağına dair bir uyarı var. İşte bu
uyarıyı hiç dikkat almıyorsunuz :) ve "Next" diyerek yüklemeye devam
ediyorsunuz. Windows 7 birkaç defa makineniz restart atarak yüklemeyi
tamamlayacaktır.

Yükleme tamamlandıktan sonra makineniz ilk açıldığında karşınızda iki
tane Windows7 seçeneği gelecek :) İkisinde de "Windows 7" yazacak ve
hangisinin sanal disk üzerinde hangisinin esas disk üzerinde olduğunu
anlamak zor olabilir. İlk yükleme sonrasında listede en üstte gelen
sanal diskin ta kendisi olacak. Fakat tabi ki bizim bu listedeki
isimleri değiştirmemiz gerek ayrıca büyük ihtimal ile listede ilk sırada
kendi esas Windows 7 yüklemenizin gelmesini isteyeceksiniz.

Hemen Admin hakları ile bir Command Prompt açalım ve son rötuşlarımızı
yapalım.

**bcdedit /v**\
bcdedit ile boot list üzerinde değişiklikler yapabiliyoruz. İlk
yapacağımız şey tüm boot listin içeriğine göz atmak. Bu liste
içerisindeki **identifier'lara** ihtiyacımız var.

![bcdedit'ten identifier'ları
alalım.](media/Windows_7_de_VHD_den_boot_etmek/01092009_4.png)\
*bcdedit'ten identifier'ları alalım.*

Yukarıdaki listeye göz attığınız her bir **identifier'ın** altında bir
de **device** bilgisi olduğunu görebilirsiniz. **Device** bilgilerine
göz attığımızda hangisinin sanal diski gösterdiği açık ve net belli :)

**bcdedit /set {identifier} description “Windows 7 Sanal Disk”**\
bcdedit kullanarak yukarıdaki komut ile istediğiniz bir diskin boot
listedeki görünen adını değiştirebilirsiniz. Üst görseldeki listeden
sanal diskimize ait boot kaydının **identifier'ını** alıp yukarıdaki
komutun içerisinde uygun yere yerleştirmeniz yeterli olacaktır. Tabi siz
kendinize özel bir description yazmayı da unutmayın.

**bcdedit /displayorder {identifier} /addlast**\
Sıra geldi sanal diskimizin boot listesinde en sona eklemek.
Hatırlarsanız ilk yükleme sonrasında sanal diskteki işletim sistemi
listede en başta gelmişti. Yukarıdaki komut sanal diskin identifier'ını
yerleştirerek komutu çalıştırırsanız söz konudu kayıt listenin en
sonunda taşınacaktır.

**bcdedit /default {identifier}**\
Son olarak sıra geldi varsayılan işletim sistemini değiştirmeye. Doğal
olarak sistemi açtığımızda boot list geldiğinde ana işletim sistemimize
ait seçeneğin seçili gelmesini isteyeceğiz. Böylece makinemizi her
açtığımıda illa bir seçenek seçmemiz gerekmeyecek. Bu durumda hemen ana
makinemizin **identifier'ını** yukarıdaki komuta ekleyerek
çalıştırabiliriz.

![Boot edilmek üzere VHD'miz
hazır.](media/Windows_7_de_VHD_den_boot_etmek/01092009_3.jpg)\
*Boot edilmek üzere VHD'miz hazır.*

Artık herşey tamam. Bilgisayarınız tekrar açtığınızda açıklaması ile
ikinci sırada sanal disk üzerindeki işletim sisteminiz gelecektir. Son
olarak ufak bir uyarı VHD dosyasının bulunduğu diskin BitLocker ile
şifrelenmemiş olması gerekiyor aynı şekilde VHD içindeki diski de
BitLocker ile şifreleme şansınız yok.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-9-2 tarihinde yayinlanmistir.*
