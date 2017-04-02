---
FallbackID: 2196
Title: Uygulamayı bilgisayarın ikinci ekranına nasıl iteriz? :)
PublishDate: 9/25/2008
EntryID: Uygulamayi_bilgisayarin_ikinci_ekranina_nasil_iteriz
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 3.5, Visual Basic 2008, Visual Studio 2008, WPF, Visual Basic .NET
old.EntryID: bed8c4b1-9a56-493e-82a2-292a15a2e79d
---
Bugün sizinle ufak bir ipucu paylaşmak istiyorum. Bir projenin gerekleri
nedeniyle hazırladığımız bir Windows uygulamasının bilgisayara bağlı
ikinci ekranda açılmasını istiyorduk. Bu ekranlara Windows'un **Extended
Desktop** mantığı ile görüntü aktarılıyor. Nasıl yaparım diye uğraşırken
bir anda kafamın üzerinde bir ampul gördüm. Evet ampul yanıyordu :)

"Extended Desktop" kullanırken bir programı ikinci ekrana almak için ne
yaparız? Fare ile onu tutar ve yan tarafa taşırız. Sonra eğer o
programın ikinci ekranda tam ekranı kaplamasını istiyorsak zaten doğal
olarak Maximized şeklinde ufak bir ayar işi görecektir. Bu durumda neden
bu işi programatik olarak uygulama başlangıcında yapmayalım?

**[VB]**

        System.Windows.Forms.Screen.AllScreens(0).Bounds.Width

        <span style="color: blue;">Me</span>.WindowState =
WindowState.Maximized

**[C\#]**

System.Windows.Forms.Screen.AllScreens[0].Bounds.Width;

<span style="color: blue;">this</span>.WindowState =
WindowState.Maximized;

İşte bu kadar. Yapmamız gereken iş aslında açılan formu ekranın sağ
tarafına doğru itip diğer ekrana geçecek konuma getirmek. Sonra artık bu
formu Maximized yaptığınız kendi ekranında büyüyecektir.
Çözünürlüklerden bağımsız olarak sürekli bu işlemin çalışabilmesi için
de ilk ekranın genişliğini almak yeterli olacaktır.

Hepinize kolay gelsin.


