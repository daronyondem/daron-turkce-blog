---
FallbackID: 2699
Title: İlk Windows 8 HTML5 Metro Uygulamamız
PublishDate: 9/16/2011
EntryID: Ilk_Windows_8_HTML5_Metro_Uygulamamiz
IsActive: True
Section: software
MinutesSpent: 0
Tags: HTML, HTML5, JavaScript, Metro UI, Visual Studio 11, Windows 8, WinRT
---
Build konferansı ile beraber biliyorsunuz artık yeni Windows 8 METRO
arayüzünde HTML5 uygulamalarının da çalışabileceği haberi kesinleşmiş
oldu. METRO arayüzünde HTML5 ve JS, XAML ve C\# veya VB veya C++
beraberce kullanılabiliyorlar. Bu noktada biraz özellikle HTML5 tarafına
değinmek istiyorum. Değinirken aklımdaki soruları ve kendi bulduğum bazı
cevapları sizlerle paylaşıp biraz da yorumlarınızı dinlemek istiyorum
desem doğru olur. Arada da JavaScript WinRT ilişkisine bir giriş yapmış
oluruz.

### HTML5 = Cross Platform

Aslında bu başlığı atmadan önce şu soruyu sormak lazım: "HTML
Cross-Platform mu?" Yani HTML5'den falan bahsetmiyorum. Şu an elimizde
var olan HTML Cross-Platform mu? Aslına bakarsanız evet. Bugün HTML ile
yapılmış bir site arayüzü kabaca her telefonda, tablette ve
bilgisayarda  / işletim sisteminde açılıyor / çalışıyor. Tabi burada
konunun biraz detayına girersek hepimiz de biliyoruz ki HTML'in her
cihazda aynı şekilde görünebilmesi için birkaç takla atmamız gerekiyor.
Ama zaten bu sorunu hoş görmeyi öğrenmiş bir şekilde doğmadık mı biz? :)

Peki konu HTML5 olunca birşey değişecek mi? Aslında pek değişmeyecek.
Yani bugün HTML ile ilgili var olan sorunlar yine HTML5 ile de var
olmaya devam edecek. Diğer yandan da şu anda nasıl HTML bizim "en
cross-platform" gidebilen teknolojimiz ise, HTML5 de öyle olacak. Ama
ufak bir fark var...

### Uygulamalar ve Siteler

Bugüne kadar HTML kullanımımız site yapmakla alaklıydı. Yani veri
göstermenin ötesinde pek birşey yapmıyorduk. En fazla bir basit bir
kutuya (TextBox) metin alırız sonra HTML sunucuya gider ve yenisi gelir.
HTML ile tarayıcı içi uygulamaya yazmaya başlamamız şurada 10 yılı
geçmez. JavaScript / AJAX vs ile beraber HTML biraz canlanmaya başladı
ve biz bu yolda da birçok sorun yaşamadık. Başımıza bir de JavaScript'in
Cross-Platform olma derdi çıktı ve bire bir aynı kolaylıkları ve
zorlukları JavaScript ile de yaşadık. Buna rağmen sadece içerik gösteren
cross-platform web sitelerinden istemci tarafında tepki verebilen ve
yaşayan cross-platform web uygulamalarına geçiş pek de sancılı olmadı.
(Esas sancıyı şimdi göreceğiz :))

Önümüzdeki dönemde HTML'i çok daha farklı bir gelecek bekliyor. HTML5 ve
JavaScript Windows 8 ile beraber Windows Metro UI uygulaması olarak
çalışıyor. Metro UI içerisinde bir Silverlight uygulaması ile HTML5
uygulaması arasındaki farkı kullanıcıların anlama şansı yok. Kulağa ne
kadar hoş geliyor değil mi? Sanırım aynı hayali paylaşıyoruz?
HTML5+JavaScript ile yazacağım bir uygulama Windows 8'de MetroUI'da
çalıştığı gibi yarın iPhone5'te HTML5 destekli tarayıcı da çalışacak....
mı?

### Cross Platform Uygulama (Ütopyası)

Başlıktan sanırım nereye gideceğimizi anladınız ama etkilenmemeye
çalışın :) Amacım sizleri de düşünmeye itmek ve kesinlikle yorumlarınız
duymak. Sonuç itibari ile ben de iki gün önce izlediğim bir Keynote
sonrasında kafamda toparlananları döküyorum şu anda ortaya.

Konumuza dönersek :) Hepimizin hayali (en azından benim öyleydi)
HTML5'in Windows ortamında doğal bir uygulama geliştirme platformu
olması ile beraber tek bir uygulama geliştirip her platformda
çalıştırabiliyor olmak. Peki bu gerçekten olabilecek mi? Gelin basit bir
Windows 8 HTML5 uygulamasının kodlarına göz atalım.

**[HTML5]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>WinWebApp3</title>
    <!-- WinJS references -->
    <link rel="stylesheet" href="/winjs/css/ui-dark.css" />
    <script src="/winjs/js/base.js"></script>
    <script src="/winjs/js/wwaapp.js"></script>
    <!-- WinWebApp3 references -->
    <link rel="stylesheet" href="/css/default.css" />
    <script src="/js/default.js"></script>
</head>
<body>
    <div style="height: 253.57px; width: 374.11px;">
        <button id="Dugme" style="position: absolute; top: 210px; left: 100px;">Deneme</button>
        <img id="Foto" style="height: 200px; width: 200px;"></div>
</body>
</html>
```

Tüm JavaScript referanslarını bir kenara koyalım. Sonuçta onları diğer
platformlarda bir işe yaramasa da sorun yaratmayacaktır. Orta kısma
baktığımızda da pek bir sorun görmüyoruz. Yani şimdilik HTML5 kısmı ile
ilgili bir sorun yok. Tabi tüm bunları yaparken uygulamanın basitliğini
akılda tutmakta fayda var. Ortada sadece bir düğme ve bir de resim
nesnesi var. HTML5 ile ilgili MetroUI'da kullanılan bazı elementlerinin
daha W3C'nin draft listesinde olduğunu ve her tarayıcı tarafından daha
implemente edilmediğini es geçiyorum. Bunlar zaten yazının başında
bahsettiğimiz "HTML'in bildiğim, alıştığımız sorunları" listesine dahil.

Şimdi gelin bu uygulamanın JavaScript koduna geçelim. JavaScript kodu
içerisinde amacımız düğmeye basıldığında kullanıcının bilgisayarından
bir resim almak. Bunun için bir WinRT call başlatıp MetroUI'da Windows 8
ile beraber, işletim sisteminde gelen "FileOpenPicker"ı çalıştırmamız
gerek. Aslında bunun Winforms'daki OpenFileDialog'dan pek farkı yok.
OpenFileDialog'un MetroUI'cası açılacak :) Uygulamamızı JavaScript ile
geliştirdiğimiz için bizim bu WinRT call'u JavaScriptten yapmamız gerek.

**[JavaScript]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        openPicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);
```

Yukarıdaki basit kod bir **FileOpenPicker** yaratıp açılabilecek
dosyaların tiplerini vermekten öteye geçmiyor. Açılan FileOpenPicker'da
varsayılan konum olarak "**MyPictures**" klasörünün gösterilmesini ve
gösterilen resimlerin de **thumbnail** olarak listelenmesini sağlıyoruz.

Bu uygulamamızı birazdan tamamlarız ve açtığımız resmi HTML5'teki
**Image** nesnesine aktarırız ama onun öncesinde koda tekrar bir bakıp
ne kadar Cross-Platform olabileceğini bir düşünmenizi istiyorum :)
"Windows" ile başlamıyor mu bu API'ler? Yani özetle OpenFileDialog açma
şeklinizden tutun cihazın Accelerometer'ına ulaşmaya kadar birçok "HTML5
sitenizi **HTML5 uygulaması**'na" çevirecek özellik **platform bağımlı**
olmak zorunda kalacak. Özellikle bu API'lerle W3C'nin pek de
ingilenmediğini düşünürsek bunların standardlaşması çok zor gözüküyor.

Bu örnek genel resmi görmekten uzak, çok basit bir örnek oldu.
Uygulamalarınız karıştıkça kullandığınız şeylerin hem HTML5 tarafında
hem de JavaScript tarafında giderek platforma özel hale geldiğini
göreceksiniz. Bunun nedenlerinden biri kullanılan bu özelliklerin
bazılarının diğer platformlarda veya işletim sistemlerinde olmaması veya
basit bir şekilde sadece farklı API'lerle sunulması olması olabiliyor.

### Peki Cross-Platform gerçekten hayal mi?

Aslında bu sorunun cevabı Cross-Platform'a ulaşmakla ilgili nasıl bir
beklentiniz olduğuna bağlı. Doğru bir katmanlama ve ayrıştırma ile
Cross-Platforma'a yaklaşmak doğal olarak HTML5'te Silverlight'tan daha
kolay ama bu bir tıklama ile olacak iş de değil. Maalesef HTML5 de olsa
birçok cross-platform senaryonuzda bolca if'ler kullanacağınızdan emin
olabilirsiniz.

Özetle benim görüşüm MetroUI ve Windows 8 ile beraber gelen HTML5'in bir
Cross-Platform mucizesinden öte Cross-Platform hayali yolunda ufak bir
adım oluşturarak süreci biraz kolaylaştıracağı yönünde. Ama bunun
kesinlikle (maalesef) minör bir adım olduğunun farkında olmak önemli.
Diğer yandan tabi ki özellikle HTML ve JavaScript guruları için Windows
platformuna ve MetroUI'a geçmek için bu çok önemli bir fırsat.

### Uygulamamızı bitirelim :)

Şimdi şu fotoğraf seçip açacağımız uygulamamızı bitirelim. Fotoğraf açma
işlemi için açtığımız **OpenFilePicker** Windows 8 Metro arayüzünde yeri
geldiğinde harici kaynaklara da ulaşabiliyor. Yani OpenFilePicker'dan
kullanıcıların başka bir uygulamaya zıplamış ve oradan resim seçiyor
olabilirler veya belki de internet kaynaklı bir yerlere zıplamışlardır.
Özetle OpenFilePicker internetteki kaynakların da seçilebilmesine olanak
tanıyor. Bu senaryoda bizim dosya açma işlemimiz uzun sürebilir. O
nedenle dosya açma işlemi default olarak asenkron bir işlem olarak
karşımıza geliyor.

**[JavaScript]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        openPicker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var Dosya = URL.createObjectURL(file);
                document.getElementById("Foto").src = Dosya;
            }
        });
```

Yukarıdaki kod içerisinde **pickSinbleFileAsync** metodu
çalıştırıldıktan sonra **then** diye bir komut daha göreceksiniz. İşte
bu Async Framework'deki **wait** metodu gibi çalışıyor. Yani eğer bir
metod asenkronsa sonrasında **then** diyerek veridğiniz işlemler o
asenkron metod tamamlandıktan sonra çalışıyor. Bir diğer örnekle aslında
asenkron çalışan bir yapının **Completed** gibi bir eventi varsa
otomatik olarak onu bekleyip onun eventin listener'ında işlem yapmak
gibi bir çalışma yapısından bahsediyoruz.

Bizim Async işlem bittinten sonra parametre olarak gönderilen file
objesinden bir **ObjectURL** yaratmamız gerekiyor. O işlemi de yaptıktan
sonra doğrudan HTML'deki **Image** nesnemizi bulup source'una eldeki
dosyayı veriyoruz. Böylece JavaScript'ten bir Windows Runtime (WinRT)
API'sini çağırmış olduk.

Hem ilk JavaScript'ten WinRT Call'umuz :) hem de HTML5'in gidişatı ile
ilgili beyinlerinize diktiğim şüpheler hepinize hayırlı olsun :D

Görüşmek üzere!

Bu makale **Visual Studio 11 Express for Windows Developer Preview**\
ve **Windows 8 Developer Preview Build 8102** kullanılarak yazılmıştır.


