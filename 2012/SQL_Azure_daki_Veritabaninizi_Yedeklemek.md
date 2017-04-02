---
FallbackID: 2819
Title: SQL Azure'daki Veritabanınızı Yedeklemek
PublishDate: 10/2/2012
EntryID: SQL_Azure_daki_Veritabaninizi_Yedeklemek
IsActive: True
Section: software
MinutesSpent: 0
Tags: SQL Azure, Windows Azure
---
Daha [önceki yazılarda](http://daron.yondem.com/tr/tag/SQL_Azure) SQL
Azure konusuna göz atmış ve geçişin kısmen de olsa ne kadar kolay
olduğunu görmüştük. Genel PAAS manzarasında geçişin en kolay olduğu veya
diğer bir tanımla grilerin olmadığı :) siyah ve beyazların olduğu bir
migration süreci gerektiriyor SQL Azure. Bu yazıda ilgileneceğimiz kısım
ise "backup" senaryosu. Doğal olarak SQL Azure'daki veritabanınız
belirli aralıklarla backuplarını almak isteyeceksiniz. Bu problemin
çözümü için birçok yol önerilebilir. Yedekleme stratejisi yerine veriyi
azure ortamından dışarı çıkaracak scheduled bir kopyalama stratejisini
de tarcih edebilirsiniz. Tercihlerinizi tabi ki iyi düşünmek ve
planlamak gerek. Şimdilik odaklanacağımız kısım Azure'da datacenter
içerisinde yedek almak olacak. Bunun avantajlarından biri yedeği aslında
yine belirli bir SLA sağlayan Azure ortamında, Cloud'da tutuyor olmanız.
İkinci büyük avantajı ise restore senaryosunda yedeğinizin zaten
Cloud'da olması ve restore'un olabildiğince hızlı gerçekleşebiliyor
olması.

Konunun detaylarına girmeden önce, özellikle SQL'da "High Availability"
konusuna hakim olmayan arkadaşlar veya bugüne kadar ihtiyacı olmamış
arkadaşlar için SQL Azure ortamındaki "backup"'ın ne anlama geldiğine
hızlıca bakalım istiyorum. "High Availability" derdi olmayan bir ortamda
backuplar hem altyapının hem de yazılımın olası hataları ile başa
çıkabilmek için alınabilirler. Tabi ki ihtyiaçlar sadece bu kadarla
bitmiyor ama listenin üstünde bunlar var. SQL Azure ortamında zaten
veritabanınızın iki replikasının olduğunu hatırlarsak backup alma
sebeplerimizi oluşturan liste biraz daha farklı şekilleniyor ve olası
yazılım hatalarına karşı önlem alma maddesi daha önce çıkıyor. İtiraf
etmek gerekirse ideal durumda zaten aldığınız backup'ı kullanmak zorunda
kalmamalısınız. Eğer 2 replika yetmez bana diyorsanız yazının sonunda
normal backup senaryosu ile entegre bir tavsiyede daha bulunacağım :)
Neden mi? "Restore" dediğiniz şey anlık gerçekleşmiyor sonuçta ve bir
downtime söz konusu olabiliyor. Cloud'da SAAS sattığımızı düşündüğümüzde
downtime kesinlikle göze alamayacağımız birşey.

### Peki nasıl olacak bu işler?

Teoriyi biraz kenara bırakalım diyeceğim ama birkaç şeyi daha
netleştirmemiz gerek. Hatırlarsanız[eski
yazılarda](http://daron.yondem.com/tr/post/Windows_Azure_da_veritabani_olarak_SQL_Azure)
SQL Azure'da backup yok demiştik :) Aslında var... Azure'da veritabanı
yedeğinizi almanızı sağlayacak bir servis mevcut. Bu servis Azure
Management Portal'ının içerisinde. Yedeğini almak istediğiniz
veritabanının erişim bilgilerini ve yedeğin konacak Storage Hesabının
erişim bilgilerini vermenizle beraber aslında bir yedek talebinde
bulunmuş oluyorsunuz. Bu talep arka planda işleniyor ve yedeğiniz bir
BACPAC dosyası olarak Storage hesabınızda bir bloba yerleştiriliyor.
Blob'un bulunduğu Container'ı "Private" set etmeyi unutmayın :) yoksa
dosya adını bulan veritabanı yedeğini güzelce indirir :)

Herşey çok kolay geliyor kulağa değil mi? Ama birkaç sorunumuz var.
Birincisi management portal'ında sunulan bu servisi biz kod ile nasıl
kullanılırız? Neden kod ile kullanalım ki? diye soruyor olabilirsiniz.
Azure management portalında bir schedule'in servisi yok. Yani veritabanı
yedeklerimi şu aralıkla al, şuraya şöyle koy vs gibi bir ayarlama yapma
şansınız yok. O nedenle kendi scheduler'ımızı ve kendi backup
sistemimizi kendimiz yazacağız :) Bunun için basit bir WorkerRole
kullanabiliriz. WorkerRole belirli aralıkla uyanarak bizim backup
işlemimizle ilgili talebi sisteme gönderecek.

Hala herşey kulağa çok basit geliyor :) Biraz daha zorlaştırmamız lazım.
:) Şaka bir yana, olay gerçekten de bu kadarla bitmiyor. Worker'ı
yazdınız ve bir şekilde azure management portalındaki talebi kod
management API'lerine göndermeyi de başardınız diyelim.... Bu işlemi
"transactionally consistent" olmadığını söylesem? Peki şimdi bu da ne
demek? Basit bir şekilde bir transaction tam ortadayken backup alıyor
olabilirsiniz demek? Farklı tablolarıdaki transactional FK
relation'larınız saçma sapan şekillerde backup'da kendini gösterebilir
demek. Emin olun, bunu kimse istemez :)

### Canımızı sıkmayalım :)

Tam herşey kısmen iyi gidiyordu ki bir de başımıza "transactional
conssitency" çıktı. Peki ne yapacağız o zaman? Çözüm basit. SQL Azure
ortamında "copy database" kullanacağız. Var olan bir veritabanının
kopyasını alabiliyorsunuz. Kopyalama işlemi "transactional conssitency"
sağlıyor. Kopyamızı aldıktan sonra kopyanın yedeğini alıyoruz. Sonra da
kopya veritabanını silip, atıyoruz. İşte yedekleme stratejimiz bu
olacak. Şimdi gelin bunları sırası ile nasıl yaparız :) tek tek
inceleyelim.

### Kod yazma zamanı!

İlk yapmamız gereken bir WorkerRole içeren Azure projesi yaratmak. Bu
Worker içerisinde SQL Azure veritabanımızın bulunduğu sunucuya bağlanıp
**Master** veritabanını hedefleyerek çalıştırabileceğimiz bir T-SQL ile
istediğimiz bir veritabanının kopyalanmasını sağlayabiliyoruz.

**[C\#]**

<span style="color:#2b91af;">SqlCommand</span> cmd = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">SqlCommand</span>(<span style="color:blue;">\
                    string</span>.Format(<span
style="color:#a31515;">"CREATE DATABASE Backup{0} AS COPY OF {0};"</span>, sqldbname), \
                                    cnn);\
cnn.Open();\
cmd.ExecuteNonQuery();\
cnn.Close();

Kodun tamamını paylaşmama sanırım gerek yok :) **sqldbname** adındaki
değişkenimizde kopyalamak istediğimiz veritabanının adının bulunduğu
düşünün. Veritabanını alıp aynı isimde fakat önünde "Backup" yazan yeni
bir veritabanı yaratıyoruz. Kopyalama işlemini başlattıktan sonra
işlemin ne zaman tamamlandığını takip etmemiz gerek. Malum büyük
veritabanları için bu işlem saatler bulabiliyor. Bizim worker zaten
şimdilik While(true)'da. O kısmı değiştirmeyeceğiz. O nedenle uygun bir
şekilde bu kopyalama işleminin durumunu kontrol edip, işlem bitene kadar
içerisinde olduğumuz worker'ı belirli aralıklarla uyutmamız gerek.

**[C\#]**

<span style="color:blue;">int</span> StateEnum = 7;\
<span style="color:blue;">while</span> (StateEnum != 0)\
{\
    cmd = <span style="color:blue;">new</span> <span
style="color:#2b91af;">SqlCommand</span>(<span
style="color:#a31515;">"SELECT state FROM sys.databases WHERE name = @BackupDBName"</span>, cnn);\
    cmd.Parameters.AddWithValue(<span
style="color:#a31515;">"@BackupDBName"</span>, <span
style="color:#a31515;">"Backup"</span> + sqldbname);\
    cnn.Open();\
    StateEnum = <span
style="color:blue;">int</span>.Parse(cmd.ExecuteScalar().ToString());\
    cnn.Close();\
\
    <span style="color:blue;">if</span> (StateEnum == 4)\
    {\
        <span style="color:blue;">throw</span> <span
style="color:blue;">new</span> <span
style="color:#2b91af;">Exception</span>(<span
style="color:#a31515;">"Something is badly wrong. The DB is in SUSPECT state"</span>);\
    }\
    <span style="color:#2b91af;">Thread</span>.Sleep(<span
style="color:#2b91af;">TimeSpan</span>.FromMinutes(1));\
}

Hmm şimdi düşündüm de yukarıda ExecuteScalar'daki olası exception'ları
handle etsek iyi olur :) Her neyse :) burada yaptığımız şey sistemdeki
tüm veritabanlarının durumunu kontrol etmek. Bizim kopya veritabanının
durum bilgisi "0" geldiğinde kopyalama bitmiş demektir. Eğer durum
bilgisi "4" gelirse ciddi kritik birşeyler var anlamına geliyor. O zaman
bir yerlere bir notification atmak, durumu manual kontrol etmek anlamlı
olacaktır. Kodumuz içerisinde kopyalanan veritabanının durumu "0" olana
kadar bir dakika aralıklarla durumu kontrol ediyoruz. İşlem
tamamlandığınızda artık kopya veritabanımız hazır demektir. Sıra geliyor
BACPAC için Azure'da talep göndermeye.

### Azure Import Export Service Client v 1.6

Azure'daki backup servisini kullanmak için yardımımıza yetişebilecek bir
Client var. "[DAC Import/Export" aracını hemen CodePlex'ten
indirebilirsiniz](http://sqldacexamples.codeplex.com/releases). Paketin
içerisinde "DacIESvcCli.exe" adındaki client bizim Azure'a backup
talebimizi göndermemizi ve sonrasında da backup işlemini takip etmemizi
sağlayacak olan arkadaşın ta kendisi. EXE'nin yanındaki
"DacIESvcCli.exe.config"'yi de unutmayın derim :) Orada da datacenter
mapping'leri bulunuyor management servisleri ile ilgili. Bu iki dosyayı
bizim Worker'ın kullanabiliyor olması gerek. Ama nasıl? Bizim worker'ın
yanında böyle bir EXE'yi nasıl koyarız? Koymayacağız zaten :) Hemen
Storage Account'unuzu "tools" adında bir container yaratıp bu iki
dosyayı oraya atın. Evet, kullanacağımız araçları cloud'daki storage'a
atıyoruz. Worker ilk açıldığında o storage'dan kullanacağı tooları alıp
kendi çalıştığı makineden temporary bir klasöre kopyalayabilir değil mi?
Süper :)

**[C\#]**

<span style="color:blue;">string</span> TempFolder = System.IO.<span
style="color:#2b91af;">Path</span>.GetTempPath();\
<span style="color:#2b91af;">Trace</span>.WriteLine(TempFolder);\
\
<span style="color:green;">//</span><span class="auto-style2">Temp
folder'ı bir temizlesek fena olmaz.</span>\
System.IO.<span
style="color:#2b91af;">DirectoryInfo</span> allFiles = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">DirectoryInfo</span>(TempFolder);\
<span style="color:blue;">foreach</span> (<span
style="color:#2b91af;">FileInfo</span> file <span
style="color:blue;">in</span> allFiles.GetFiles())\
{\
    file.Delete();\
}\
\
<span style="color:green;">//Kullanacağımız araçları makineye
indirelim.</span>\
<span
style="color:#2b91af;">CloudBlobClient</span> BlobClient = CloudHelpers.Storage.<span
style="color:#2b91af;">Blob</span>.GetBlobClient();\
<span
style="color:#2b91af;">CloudBlobContainer</span> ToolsContainer = BlobClient.GetContainerReference(<span
style="color:#a31515;">"tools"</span>);\
<span
style="color:blue;">var</span> AllBlobs = ToolsContainer.ListBlobs();\
<span style="color:blue;">foreach</span> (<span
style="color:#2b91af;">CloudBlob</span> item <span
style="color:blue;">in</span> AllBlobs)\
{\
    item.DownloadToFile(<span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">@"{0}\\{1}"</span>, TempFolder, item.Name));\
}

Yukarıdaki kod aslında hepimiz bildiği basit Storage işlemleri.
WorkerRole'ün çalıştığı yerde temp folder'ı bir temizliyoruz. Hani olur
ya WorkerRole restart yemiştir, orada kirli birşeyler kalmıştır :)
Temizlemekte fayda var. Sonra da storage'dan araçları temp folder'ımıza
indiriyoruz. Bunun workerın "OnStart"ında yapabilirsiniz, sonuç olarak
sadece bir defa yapılacak.

Artık kullanacağımız araçları makineye indi. Veritabanının kopyasını
alacak kodu da yazmıştık. Yani kopya da alındı ve hazır. Sıra geldi
bizim DAC Client'a doğru komutları gönderip backup talebini azure'a
göndermek.

**[C\#]**

<span style="color:blue;">string</span> BackupCommand = <span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">@"-s {0}.database.windows.net </span>\
<span
style="color:#a31515;">-d Backup{1} -u {2} -p {3} -bloburl </span>\
<span
style="color:#a31515;">http://{4}.blob.core.windows.net/{5}/{6}.bacpac -blobaccesskey </span>\
<span style="color:#a31515;">{7} -accesskeytype storage -x "</span>,\
    sqlservername, sqldbname, sqlusername, \
    sqlpassword, storageaccountname, \
    storagecontainername, storageblobname, storageaccesskey);\
\
<span style="color:#2b91af;">ProcessStartInfo</span> ExtProcess = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">ProcessStartInfo</span>();\
ExtProcess.FileName = <span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">@"{0}\\{1}"</span>, TempFolder, <span
style="color:#a31515;">"DacIESvcCli.exe"</span>);\
ExtProcess.Arguments = BackupCommand;\
ExtProcess.CreateNoWindow = <span style="color:blue;">true</span>;\
ExtProcess.ErrorDialog = <span style="color:blue;">false</span>;\
ExtProcess.UseShellExecute = <span style="color:blue;">false</span>;\
ExtProcess.WindowStyle = <span
style="color:#2b91af;">ProcessWindowStyle</span>.Hidden;\
ExtProcess.RedirectStandardOutput = <span
style="color:blue;">true</span>;\
ExtProcess.RedirectStandardInput = <span
style="color:blue;">false</span>;\
ExtProcess.RedirectStandardError = <span
style="color:blue;">true</span>;\
\
<span style="color:#2b91af;">Process</span> exeProcess = <span
style="color:#2b91af;">Process</span>.Start(ExtProcess);

Olayımız budur :) Olayın özü yukarıdaki BackupCommand. SQL sunucusunun
adresi, veritabanı adı, erişim bilgileri, storage account'ın erişim
bilgileri ve BACPAC'ın kaydedileceği yer gibi bir seri parametreyi DAC
Client'ı veriyoruz. Böylece talebimizi göndermiş olduk. Bundan sonra
sıra geliyor talebin, yani işlemin durumunu takip etmeye. İşte bu
noktada ciddi saçmalıklar var :) Aslında DAC Client bir requestID alarak
belirli bir işlemin durumunu report edebiliyor fakat ben o requestID'yi
yukarıdaki request sonucunda nasıl alabileceğimizi bulamadım :) Yok öyle
birşey :D API Request'i biz yapsak alırız da DAC Client'da sanki o kısım
encapsulate olmuş gibi duruyor. Yine de son işlemlerin statuslerini
alabileceğimiz bir komut mevcut. Request ID vermeden status talebinde
bulunursak tüm son işlemlerin durumlarını alabiliyoruz ama bu sefer de
işin pis tarafı :) EXE'nin raporu output string olarak vermesi :) Sonuç
itibari ile amacına uygun ama raporu XML olarak file system'e falan
koysa süper olurmuş :)

![DACClient'ın raporu bu şekilde
:)](http://cdn.daron.yondem.com/assets/2819/dacclient.png)\
*DACClient'ın raporu bu şekilde :)*

Yukarıdaki screenshot'da da gördüğün gibi bize gelen bu raporu alıp
içerisinden bizim bir önceki talebe denk gelen "Status" kısmına bakmamız
lazım. "Status" eğer "Completed" ise işlem tamamlandı demektir. İşlem
tamamlandığı gibi de backup bittiğinde göre sadece backup amacı ile
kopyaladığımız veritabanını kopyasını silebiliriz ki sürekli para
ödemeyelim onun için.

**[C\#]**

<span style="color:blue;">string</span> CheckStatus = <span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">@"-s {0}.database.windows.net -u {1} -p {2} -status "</span>,\
   sqlservername, sqlusername, sqlpassword);\
\
ExtProcess = <span style="color:blue;">new</span> <span
style="color:#2b91af;">ProcessStartInfo</span>();\
ExtProcess.FileName = <span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">@"{0}\\{1}"</span>, TempFolder, <span
style="color:#a31515;">"DacIESvcCli.exe"</span>);\
ExtProcess.Arguments = CheckStatus;\
ExtProcess.CreateNoWindow = <span style="color:blue;">true</span>;\
ExtProcess.ErrorDialog = <span style="color:blue;">false</span>;\
ExtProcess.UseShellExecute = <span style="color:blue;">false</span>;\
ExtProcess.WindowStyle = <span
style="color:#2b91af;">ProcessWindowStyle</span>.Hidden;\
ExtProcess.RedirectStandardOutput = <span
style="color:blue;">true</span>;\
ExtProcess.RedirectStandardInput = <span
style="color:blue;">false</span>;\
ExtProcess.RedirectStandardError = <span
style="color:blue;">true</span>;\
\
<span style="color:blue;">string</span> StatusText = <span
style="color:#a31515;">""</span>;\
<span style="color:blue;">while</span> (StatusText.Contains(<span
style="color:#a31515;">"Completed"</span>) == <span
style="color:blue;">false</span>)\
{\
    <span style="color:blue;">string</span> Output = <span
style="color:#2b91af;">Process</span>.Start(ExtProcess).StandardOutput.ReadToEnd();\
    <span style="color:blue;">string</span> BlobFullUri = <span
style="color:blue;">string</span>.Format(<span
style="color:#a31515;">"http://{0}.blob.core.windows.net/{1}/{2}.bacpac"</span>, \
        storageaccountname, storagecontainername, storageblobname);\
    StatusText = Output.Substring(Output.IndexOf(BlobFullUri) + BlobFullUri.Length, 20);\
    <span style="color:#2b91af;">Thread</span>.Sleep(<span
style="color:#2b91af;">TimeSpan</span>.FromMinutes(1));\
}

CheckStatus commandini en üstte görüyorsunuz. Yine DAC Client'ı
kullanarak status report istiyoruz. EXE'yi çalıştırırken output'unu da
alıp string olarak parse etmemiz gerekiyor :) Biliyorum, durum pek iç
açıcı değil ama direk management API'lerini çağırmaktan daha pratik ve
çalışıyor :) Parsing tarafındaki mantığımız süper basit. Yedekleme
hedefi olarak verdiğimiz BlobUri'yi arayıp onu takip eden Status'ü
alıyoruz. Burada tabi ki önemli olan BlobUri'nizin unique olması ki
zaten öyle olmak zorunda. Aynı BlobUri hedefi ile birden çok talep
göndermemiş olmanız gerekiyor. Kodumuz Status'ü dakikada bir kontrol
ediyor ve tamamlandığında da bir anlamda artık :) kodu akışına bırakıyor
:).

Tüm bu işlemleri yaptıktan sonra artık kopya veritabanını DROP
edebilirsiniz. Ama... drop etmeyebilirsiniz de! Niye mi? Yazının başında
restore operasyonunun downtime'a neden olabileceğinden bahsetmiştik.
Tabi diğer yandan "dakikada bir restore" yapmayacağınızı da biliyoruz.
Genel olarak backupları günlük tutsanız bile bir hafta öncesi bir
backup'a restore etme ihtimaliniz düşük. Genelde bir önceki backupa
restore edilir değil mi? Güzel. Peki diğer yandan aldığımız kopya
veritabanı için de günlük para ödediğimizi biliyor muyuz? Yani o
veritabanını 2 saatliğine sunucuda tutmuş olsanız da günlük parasını
vereceksiniz. Bunun üzerine eğer günlük yedek alıyorsanız :) aslında
veritabanını kopyaladıktan sonra hemen silmenin sizin için hiçbir maddi
faydası olmadığını düşünebilirsiniz. Gerçekten de öyle. Buna ek olarak
bir de o kopya veritabanını ayakta tutmak demek aslında restore
gerekmesi durumunda direk veritabanı switch edebileceğiniz anlamına
geliyor! Yazılımınızda bunu yapabileceğiniz bir mimari var mıdır, yok
mudur bilemem ama full bir restore yapmaktan çok daha pratik ve
downtime'ı düşük bir seçenek olduğu kesin.

Özetle, tüm bu senaryoyu implemente ettiğinizde geçmişe dönük günlük
yedekleriniz varken bir tane de bir gün öncenin yedeği sürekli bir
sunucuda ayakta backup bekliyor olacak :) Yine de umuyoruz ki bunların
hiçbirine ihtiyacımız olmaz.

Hepinize kolay gelsin!


