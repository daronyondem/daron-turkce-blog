---
FallbackID: 2781
Title: Windows Azure Platform Management
PublishDate: 7/31/2012
EntryID: Windows_Azure_Platform_Management
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Azure ile ilgileniyorsanız makinenizde kesinlikle yüklü olması gereken
bir araçtan bahsedeceğim şimdi :) Hem de ücretsiz.

### Windows Azure Platform Management Tool

Platform Management Tool doğrudan MMC üzerine oturuyor ve arka planda da
Powershell kullanıyor. Araçla Azure'daki neredeyse her tür içeriği
kontrol etme şansınız var. Buna hosted service'leriniz, role'leriniz,
diagnostics verileri, storage account vs herşey dahil :)

Yükleme işlemlerine başlamak için ilk olarak hemen projenin
[CodePlex'teki sitesini](http://wapmmc.codeplex.com/) ziyaret etmeniz
gerekiyor. Yükleme paketini indirip çalıştırdığınızda normal ayarlarında
herşey C'de WindowsAzure adında bir klasör altına yüklenecektir.

![Yüklemeyi yaptığımız yerde bir yükleme daha var aslında
:)](http://cdn.daron.yondem.com/assets/2781/mmc.png)
*Yüklemeyi yaptığımız yerde bir yükleme daha var aslında :)*

Yüklemeyi tamamladığınız anda yukarıdaki şekli ile yükleme klasörü
ekranınıza gelecektir. Buradaki **StartHere.cmd** ile aslında esas
yüklemeye başlamanız gerekiyor.. Ama bir sorun var :) CodePlex'teki
proje en son SDK 1.4 sürümü için güncellenmiş. O nedenle yükleme önceski
SDK 1.4'ün sistemde yüklü olup olmadığı kontrol ediliyor. Oysa benim
makinemde bu yazıyı yazarken SDK 1.6 var. Kurulumu tamamlayabilmek adına
ufak bir çakallık yapıp dependency'lere el atmamız gerek.

C:\\WindowsAzure\\MMC\\setup\\scripts\\dependencies\\check\\CheckAzureSDK.ps1
PowerShell script

Yukarıdaki adreste bulabileceğiniz dosyayı notepad ile açın ve hemen
aşağıdaki değişikliği tamamlayın.

**[eski]**
```js
$res1 = SearchUninstall -SearchFor 'Windows Azure SDK*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\';$res2 = SearchUninstall -SearchFor 'Windows Azure SDK*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\';($res1 -or $res2)```

**[yeni]**

```js$res1 = SearchUninstall -SearchFor 'Windows Azure SDK*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\';$res2 = SearchUninstall -SearchFor 'Windows Azure SDK*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\';$res3 = SearchUninstall -SearchFor 'Windows Azure Tools*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\';$res4 = SearchUninstall -SearchFor 'Windows Azure Tools*' -SearchVersion '1.4.20227.1419' -UninstallKey 'HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\';$res5 = SearchUninstall -SearchFor 'Windows Azure Emulators*' -SearchVersion '1.6.21103.1459' -UninstallKey 'HKLM:SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\';$res6 = SearchUninstall -SearchFor 'Windows Azure Emulators*' -SearchVersion '1.6.21103.1459' -UninstallKey 'HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\';($res1 -or $res2 -or $res3 -or $res4 -or $res5 -or $res6)```

Böylece artık dependency'lerimiz arasına bir OR koyup :) 1.6'ının da
kontrol edilmesini sağladık. Şimdi StartHere.Cmd'yi başlatıp kurulumu
yapabilirsiniz.

![Kurulum SDK 1.4'e bakıyor :) ama kandırmak
mümkün.](http://cdn.daron.yondem.com/assets/2781/mmc2.png)
*Kurulum SDK 1.4'e bakıyor :) ama kandırmak mümkün.*

Kurulum tamamlandıktan sonra Azure Management MMC için masaüstünüze bir
kısayol konup konsol da hemen ekranınıza gelecektir. Şimdi gelin bir de
hafiften konsolun kullanımına bakalım.

![MMC'de Subscription
ayarlarımız.](http://cdn.daron.yondem.com/assets/2781/mmc3.png)
*MMC'de Subscription ayarlarımız.*

MMC'yi ilk açtığınızda hemen sizden bir subscription ID ve management
sertifikası isteyecektir. Subscription ID'yi Azure Web Management
Portal'ına gidip alabilirsiniz. Bunun "Hosted Services" tarafına geçip
yeni deployment yaptığımız ekran bir subscription'ı seçili hale getirin
ve hemen ekranın sağında panelden Subscription ID'yi alıp MMC'nin için
uygun yere yapıştırın.

Sıra geldi management sertifikasına. Management sertifikasını sıfırdan
yaratıp uygun hareketlerle web management portalından yüklemek mümkün
ama bence işkence çekmek yerine zaten bir deployment yaptıysanız eğer
bir de Visual Studio içerisinde Publishing aracı ile deployment yapın
derim :) Böylece hazır bir management sertifikanız da olmuş olur
makinenizde yüklü. Onu seçip ilerleyebilirsiniz.

![Herşey kontrol
altında.](http://cdn.daron.yondem.com/assets/2781/mmc4.png)
*Herşey kontrol altında.*

Tüm işlemleri yaptıktan sonra artık subscription içerisindeki herşeyi
kontrol edebilir hale geleceksiniz. Web veya WorkerRole'lerinizle ilgili
işlemlerden tutun Storage Account içerisindeki servisleri yönetmeye
kadar her tür hareket mümkün olacaktır. Azure MMC kesinlikle her Azure
developer'ın makinesinde bulunması gereken hayat kurtarıcı bir araç ;)

Görüşmek üzere ;)


