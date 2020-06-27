---
FallbackID: 2694
Title: "Silverlight 5 RC ile PInvoke kullanarak CD-ROM'u açalım":)
date: "2011-9-11"
EntryID: Silverlight_5_RC_ile_PInvoke
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 5
---
Silverlight 5 RC ile beraber gelen yeniliklerden biri olan PInvoke
konusuna bakacağız bugün. Aslında özüne bakarsanız PInvoke dediğimde
size tanıdık geliyorsa Silverlight tarafındaki de birebir aynı durumda.
Fakat PInvoke'a tanıdık olmayanlar için hem ufak bir giriş hem de
Silverlight 5 RC tarafındaki durumuna göz atmış olalım.

### Platform Invoke

Kısa adıyla PInvoke aslında COM API'leri kullanmadan sistem kaynakları
ile konuşmak anlamına gelir. Daha önceden bu konuda deneyimleri olanlar
hatırlayacaktır ki .NET tarafında DllImport ile sistem assemblylerini
alıp farklı API'leri kullanabiliyoruz. İşte aynı mekanizma artık
Silverlight 5 RC ile beraber ister tarayıcı içerisinde ister OOB modunda
elevated trust uygulamalarda kullanılabilir hale geliyor.

Örneğimizde **winmm.dll** 'den
[mciSendString](http://msdn.microsoft.com/en-us/library/dd757161(v=vs.85).aspx)
fonksiyonunu kullanarak bilgisayardaki CD-ROM'u açılmasını sağlayacağız
:) Belki de şu sürekli CD-ROM'u açıp kapatan uygulamalardan birini
yazarız :) Şaka bir yana bu işlemi yapmak için kullanabileceğimiz
komutlara da
[MSDN'den](http://msdn.microsoft.com/en-us/library/dd798661(v=vs.85).aspx)
ulaşabiliyoruz.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        [DllImport("winmm.dll", EntryPoint = "mciSendStringA")]
        public static extern void mciSendStringA(string lpstrCommand,
            string lpstrReturnString, Int32 uReturnLength, Int32 hwndCallback);
```

İlk olarak kullancağımız fonksiyonu yukarıdaki şekilde Silverlight
projemize alıyoruz. Sıra geliyor fonksiyonun paremetrelerini kullanarak
istediğimiz komutları göndermeye. Bu noktada bize lazım olan sadece ilk
parametre. Diğer parametreleri merak edenleriniz
[buraya](http://msdn.microsoft.com/en-us/library/dd757161(v=vs.85).aspx)
göz atabilir.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        private void button1_Click(object sender, RoutedEventArgs e)
        {
            mciSendStringA("set CDAudio door open", null, 0, 0); 
        }
```

Son olarak Silverlight içerisinde örneğin bir düğmeye tıklandığında da
yukarıdaki kodu çalıştırabiliriz. Böylece bilgisayarın CD-ROM'u
açılacaktır. Kullandığımız komutla ilgili detaylara
[buradan](http://msdn.microsoft.com/en-us/library/dd798661(v=vs.85).aspx)
ulaşabilirsiniz.

![PInvoke için InBrowser Elevated Trust
Ayarı](media/Silverlight_5_RC_ile_PInvoke/sl5_rc_pinvoke.png)\
*PInvoke için InBrowser Elevated Trust Ayarı*

Son olarak tüm bunların çalışması için uygulamamızı bir şekilde Elevated
Trust haline getirmemiz de gerekecek. Bunun için yöntemlerin biri yine
Silverlight 5 Beta ile beraber yeni gelen [InBrowser Elevated
Trust](http://daron.yondem.com/tr/post/892fdbe4-864e-4e9b-a5c2-3dfa9d7d1218)'ı
kullanmak. Yukarıdaki ayarlama ile son noktayı da koymuş oluyoruz. Artık
uygulamayı çalıştırıp düğmeye bastığımızda CD-ROM'umuz açılıyor :)

Siz de bunun gibi çok farklı şeyler yapabilirsiniz, özetle Platform
Kaynakları'na doğrudan erişebilirsiniz. Tabi tüm bunların sadece Windows
ortamında çalışacağını ve Silverlight'ın MAC'te çalışması durumunda bu
özelliklerin çalışmayacağını aklınızda tutmanızda fayda var.

Kolay gelsin.


