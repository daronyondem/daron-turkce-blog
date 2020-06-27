---
FallbackID: 2704
Title: "Windows 8 Metro UI'da Accelerometer desteği"
date: "2011-9-21"
EntryID: Windows_8_Metro_UI_da_Accelerometer_destegi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Metro UI, Visual Studio 11, Windows 8
---
# Windows 8 Metro UI'da Accelerometer desteği
Tabletlerde Accelerometer kullanımı epey popülar. Bu fikirle yola
çıkarsak tabi ki Windows 8 Metro UI tarafında da Accelerometer
donanımına erişebilmek gerekecek. Bu yazımızda basit bir şekilde
Accelerometer datasını nasıl alırız sorusunun cevabını verecek API'lere
göz atacağız.

**[C\#]**

            <span
style="color: #2b91af;">Accelerometer</span> BirAccelerometer = <span
style="color: #2b91af;">Accelerometer</span>.GetDefault();

Hızlıca konuya girelim istedim :) Yukarıdaki bir satır kod sistemdeki
Accelerometer'ın bir reference'ını almamız için yeterli. Eğer bu refence
null / nothing dönerse anlayın ki sistemde bir accelerometer yok.

**[C\#]**

            <span
style="color: blue;">if</span> (BirAccelerometer!= <span
style="color: blue;">null</span>)\
            {\
                BirAccelerometer.ReadingChanged += <span
style="color: blue;">new</span> <span
style="color: #2b91af;">TypedEventHandler</span>\<<span
style="color: #2b91af;">Accelerometer</span>, <span
style="color: #2b91af;">\
                       
AccelerometerReadingChangedEventArgs</span>\>(ReadingChanged);\
            }\
            <span style="color: blue;">else</span>\
            {\
                <span style="color: green;">//Accelerometer yok!</span>\
            }

Yukarıdaki kodumuzda ilk olarak Accelerometer'ın varlığını kontrol
ettikten sonra hemen **ReadingChanged** eventine bir listener atarak
Accelerometer'dan yeni değer geldiğinde haberdar olmamızı sağlamış
oluyoruz.

**[C\#]**

        <span style="color:blue;">private</span> <span
style="color:blue;">void</span> ReadingChanged(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">AccelerometerReadingChangedEventArgs</span> e)\
        {\
            <span
style="color:#2b91af;">Window</span>.Current.CoreWindow.Dispatcher.InvokeAsync(CoreDispatcherPriority.Normal, (s, a) =\>\
            {\
                AccelerometerReading reading = (a.Context <span
style="color:blue;">as</span> <span
style="color:#2b91af;">AccelerometerReadingChangedEventArgs</span>).Reading;\
                <span
style="color:blue;">double</span> X = reading.AccelerationX;\
                <span
style="color:blue;">double</span> Y = reading.AccelerationY;\
                <span
style="color:blue;">double</span> Z = reading.AccelerationZ;\
            }, <span style="color:blue;">this</span>, e);\
        }

**ReadingChanged** event listener'ı içerisinde evente
gelen**AccelerometerReadingChangedEventArgs** üzerinden**Context**
property'si ile bir **AccelerometerReading** nesnesi alabiliyoruz. Bu
nesne içerisindeki X, Y ve Z propertyleri direk Accelerometer'dan gelen
veriyi gösteriyor. Tabi okuma işlemini Dispatcher üzerinden gidip
UIThread'e aktarmamız gerek aksi halde cross-thread hatası alırız.
Reading eventleri UIThread'e düşmediği için bu geçişi yapmamız şart.

**[C\#]**

            BirAccelerometer.Shaken -= <span
style="color:blue;">new</span> <span
style="color:#2b91af;">TypedEventHandler</span>\<<span
style="color:#2b91af;">Accelerometer</span>, <span
style="color:#2b91af;">\
                                                           
AccelerometerShakenEventArgs</span>\>(Shaken);

Bir diğer güzellik ise yukarıda da görebileceğiniz üzere **Shaken**
eventi. Tablet'i elinize alıp salladığınızda otomatik olarak bu event
çalışıyor. Böylece sallamaya özel hareketler yapabilirsiniz :)

Son olarak sürekli Accelerometer dinlemeden istediğiniz zaman
Accerometer verisini almak için de aşağıdaki gibi bir yapı
kullanabilirsiniz.

**[C\#]**

                <span
style="color:#2b91af;">AccelerometerReading</span> OkunanVeri = BirAccelerometer.GetCurrentReading();\
                <span
style="color:blue;">double</span> X = OkunanVeri.AccelerationX;\
                <span
style="color:blue;">double</span> Y = OkunanVeri.AccelerationY;\
                <span
style="color:blue;">double</span> Z = OkunanVeri.AccelerationZ;

Hepinize kolay gelsin!

Bu makale **Visual Studio 11 Express for Windows Developer Preview**\
ve **Windows 8 Developer Preview Build 8102** kullanılarak yazılmıştır.



*Bu yazi http://daron.yondem.com adresinde, 2011-9-21 tarihinde yayinlanmistir.*
