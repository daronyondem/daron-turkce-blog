---
FallbackID: 2711
Title: Windows 8 Metro Uygulamalarında Performans Metrikleri
PublishDate: 25/9/2011
EntryID: Windows_8_Metro_Performans_Metrikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
---
Windows 8'in Metro arayüzü için uygulama geliştirirken bu arayüzlerin
tablet donanımında çalışacağını göz önüne alarak performansa da dikkat
etmek gerekiyor. Aynı Windows Phone ortamındaki emülatörde olduğu gibi
Windows 8 içerisinde de uygulamalarınızla ilgili performans metriklerini
çalışma zamanında görebileceğiniz "Legend"lar overlay olarak
uygulamalara eklenebiliyor.

![Overlay gelen performans
metrikleri...](http://cdn.daron.yondem.com/assets/2711/metro_perf.jpg)\
*Overlay gelen performans metrikleri...*

Yukarıda gördüğünüz uygulama doğrudan Win8 Developer Preview ile beraber
gelen Sudoku uygulaması. Performans metrikleri ile ilgili Legend
açıldığında ekranın sol üstünde bazı garip sayılar görüyoruz :)

![Performans sayaçlarının
anlamları.](http://cdn.daron.yondem.com/assets/2711/metro_perf2.png)\
*Performans sayaçlarının anlamları.*

İşte o garip sayıların anlamları. Görseli itiraf ediyorum :) Build'den
oturumlardan birinden çaldım :) Buradaki performans sayaçlarını
kullanırken Composition ve UI Thread mantığının WP7'deki gibi burada da
olduğunu görmüş oluyoruz.

### Peki bu sayaçları nasıl açarız?

Bu sayaçları açmak için sevgili dostumuz **regedit.exe**'ye seslenmemiz
gerekiyor. İşte aşağıda regedit'de editlemeniz gereken yerler.

**[registry / 32-bit]**

HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Microsoft\\Xaml\\EnableFrameRateCounter
= 1

**[registry / 64-bit]**

HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\\
Xaml\\EnableFrameRateCounter = 1

Özellikle 64-bit makinelerde XAML key'ini ve DWORD'ü sizin yaratmanız
gerekecek. Bu ayarları yaptıktan sonra rahatlıkla metrikleri managed
uygulamalarda görebilirsiniz. Maalsef bu metrikler HTML5 uygulamalarında
şu an için gözükmüyor.

Hepinize kolay gelsin!

Bu makale **Windows 8 Developer Preview Build 8102** kullanılarak
yazılmıştır.


