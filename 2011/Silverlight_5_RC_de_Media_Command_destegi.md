---
FallbackID: 2695
Title: "Silverlight 5 RC'de Media Command desteği."
date: "2011-9-12"
EntryID: Silverlight_5_RC_de_Media_Command_destegi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 5
---
# Silverlight 5 RC'de Media Command desteği.
Silverlight 5 RC ile beraber gelen bir diğer özellik ise **Media
Command** desteği. Bunu ister klavyeler üzerinde bulunan özel tuşlarla
ilişkili bir konu olarak ele alın ister harici kumandası olan ortamlarda
Silverlight'ın çalışma durumunda gerekli destek olarak düşünün aslında
konu çok basit :)

![Medya oynatmaya dair düğmeleri olan bir
klavye.](media/Silverlight_5_RC_de_Media_Command_destegi/klavye_remote.png)\
*Medya oynatmaya dair düğmeleri olan bir klavye.*

MediaCommand'lerin hepsi yani yukarıdaki klavyede gördüğünüz "Play",
"Stop" gibi düğmelerin hepsi Silverlight'ta tek bir evente düşüyor
artık. Söz konusu eventin adı **MediaCommand** ve doğrudan
**UserControl** üzerinden erişilebiliyor.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        public MainPage()        {            InitializeComponent();            this.MediaCommand += new MediaCommandEventHandler(MainPage_MediaCommand);        }         void MainPage_MediaCommand(object sender, MediaCommandEventArgs e)        {                    }
```

MediaCommand eventine yukarıdaki gibi eriştikten sonra sıra geliyor
hangi düğmeye basılıp hangi komutun verildiğini anlamaya.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        void MainPage_MediaCommand(object sender, MediaCommandEventArgs e)        {            if (e.MediaCommand == System.Windows.Media.MediaCommand.Play)            {             }        }
```

Gördüğünüz gibi eventimize gelen **MediaCommandEventArgs** üzerinden
ulaştığımız ve adı yine **MediaCommand** olarak property bir enum
veriyor. Bu enum ile beraber hangi düğmeye basıldığını anlayıp uygun
şekilde gerekli implementasyonu yapabiliriz.

Tüm MediaCommand'lerin bir
listesini[MSDN'de](http://msdn.microsoft.com/en-us/library/system.windows.media.mediacommand(v=vs.96).aspx)
bulabilirsiniz.

Dikkat etmeniz gereken ufak bir nokta var. Menu, Title, Info, Display,
Guide ve TVkomutları şimdilik sadece XBOX ortamındaki Silverlight için
eklenmiş durumda. Bu komutlar Windows veya Mac'te bulunmuyor.

Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2011-9-12 tarihinde yayinlanmistir.*
