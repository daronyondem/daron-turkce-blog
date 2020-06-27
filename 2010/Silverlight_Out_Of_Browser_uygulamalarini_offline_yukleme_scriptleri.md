---
FallbackID: 2531
Title: "Silverlight Out Of Browser uygulamalarını offline yükleme scriptleri"
date: "2010-7-21"
EntryID: Silverlight_Out_Of_Browser_uygulamalarini_offline_yukleme_scriptleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: f8d69b56-449b-491b-83b6-09aaad12973f
---
# Silverlight Out Of Browser uygulamalarını offline yükleme scriptleri
Silverlight ile OOB (Out-Of-Browser) modunda uygulamalar geliştirirken
bir diğer hissedilebilen ihtiyaç da bu uygulamaları bazen ayrı bir
şekilde dağıtabilmek oluyor. Normal şartlarda bir OOB uygulaması ancak
Silverlight uygulamasının webde istemcide açılması aracılığı ile
yüklenebiliyor. Fakat bunun haricinde isterseniz bu yükleme işlemini bir
script ile başlatma şansınız da olabilir. Böylece söz konusu script bir
SETUP paketine konduğunda rahatlıkla Silverlight OOB uygulamasını tek
başına CD/DVD gibi bir medyada dağıtılabilir hale getirebilirsiniz.

**[Silent installation script]**

"%ProgramFiles%\\Microsoft Silverlight\\sllauncher.exe"\
 /install:"SLDosya.xap"\
 /origin:"http://www.ornek.com/ClientBin/SLDosya.xap"\
 /shortcut:desktop+startmenu /overwrite

Yukarıda gördüğünüz komutu çalıştırmanız haline yükleme işlemi hemen
başlayacaktır. Burada önemli olan birkaç detay var, birincisi 64-bit
yüklü sistemlerde ProgramFiles klasörünün adının değiştiğini unutmayın
:) Bu nedenle olası bir SETUP paketi hazırlarken farklı ihtimalleri
kontrol etmeniz gerekecektir. İkinci detay ise komuta gönderdiğimiz
parametrelerin kendisi. İlk parametremiz olan **install** doğrudan OOB
modunda yüklemek istediğimiz SL uygulamasının dosyasını hedefliyor.
Dosya lokal dosya sistemine bulunmalı. İkinci parametre olan **origin**
parametresi ise dosyanın webden güncellenebileceği adresi belirtiyor.
Daha önce de belirttiğim gibi normalde bu yükleme işlemi webden
yapılıyordu ve o senaryoda webdeki XAP dosyasının adresi belli olduğu
için runtime tarafından kenara kaydedilerek sürekli webde yeni bir
sürümün bulunup bulunmadığı kontrol edilebiliyor varsa yenisi hemen
istemciye indirilebiliyordu. Oysa şu anda biz bir anlamda offline
yükleme yaptığımız için dosyanın webdeki güncelleme noktasını elle
belirtmemiz gerekiyor. Böylece aynı webden yüklenmiş gibi update
mekanizması çalışmaya devam edecektir.

Son parametremiz ise **shortcut** parametresi. Yükleme esnasından
nerelere kısayollar konulmasını istiyorsanız onları da bu parametreye
vererek ilerleyebilirsiniz. Son olarak **overwrite** parametresini de
verirseniz eğer uygulama daha önceden yüklenmiş ise yenisi üzerine
yazılacaktır. Ek olarak eğer uygulamayı yükledikten sonra otomatik
olarak anında çalıştırmak da istiyorsanız bu sefer de aşağıda komutu
kullanabilirsiniz.

**[Otomatik çalıştırma scripti]**

"%ProgramFiles%\\Microsoft Silverlight\\sllauncher.exe"\
 /emulate:"SLOrnek.xap"\
 /origin:"http://www.ornek.com/SLOrnek.xap"\
 /overwrite

Unutmamak gerek ki tüm bu işlemlerde sizin uygulamanızla iligli ayırt
edici olan bir nevi GUID özelliği taşıyan parametre aslında **origin**
parametresidir. Yani sllauncher.exe tüm uygulamaları origin parametresi
üzerinden tanır ve ayırt eder. O nedenle bir uygulamayı sistemden
kaldırmak için kullanacağımız aşağıdaki scriptte de sadece **origin**
parametresini vermemiz uygulamanın sistemden silinmesi için yeterlidir.

**[Uninstall scripti]**

"%ProgramFiles%\\Microsoft Silverlight\\sllauncher.exe"\
 /uninstall\
 /origin:http://www.ornek.com/SLOrnek.xap

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2010-7-21 tarihinde yayinlanmistir.*
