---
FallbackID: 2238
Title: Silverlight Toolkit içerisinde gelen hazır renk şablonları (Thema) inceliyoruz.
PublishDate: 11/6/2008
EntryID: Silverlight_Toolkit_icerisinde_gelen_hazir_renk_sablonlari_inceliyoruz
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 97b6c373-f3b6-4343-acd5-f6cddb3c9d19
---
Silverlight Toolkit konusunda yazılarıma devam edeceğimden bahsetmiştim.
Bu yazımızda Silverlight Toolkit ile beraber gelen theming (renk
şablonları) yapısına göz atacağız. Hali hazırda Toolkit ile beraber
gelen şablonların nasıl kullanılabildiğini inceleyeceğiz.

Yarattığımız yeni bir Silverlight 2.0 projesini Blend 2 ile açtıktan
sonra ilk aşamada hemen Silverlight Toolkit içerisindeki gerekli
DLL'leri referans almamız gerekiyor. Toolkit paketini bilgisayarınızda
açtığınızda içinde Themes adında bir klasör olduğunu göreceksiniz. Bu
klasör içerisinde her bir DLL farklı bir renk şablonunu temsil ediyor.
İsterseniz hepsini referans olarak ekleyebilir veya sadece
kullanacaklarınızı projenize dahil edebilirsiniz. Örneğimizde ben
hepsini referans olarak alacağım ki aradaki farkları görelim.

![Blend 2 içerisinde projeye referans
eklerken.](http://cdn.daron.yondem.com/assets/2238/05112008_1.png)\
*Blend 2 içerisinde projeye referans eklerken.*

Themes klasöründeki tüm DLL'leri referans olarak aldıktan sonra bir de
Toolkit paketinin ana klasöründeki
**Microsoft.Windows.Controls.Theming.dll** dosyasını referans olarak
almalısınız.

![Tüm hazır Theme'ler kontroller şeklinde Asset
Library'de.](http://cdn.daron.yondem.com/assets/2238/05112008_2.png)\
*Tüm hazır Theme'ler kontroller şeklinde Asset Library'de.*

Tüm DLL'leri doğru şekilde projenize referans olarak eklediğinizde Blend
2 içerisinde Asset Library'nin Custom Controls bölümünde her bir Thema
için ayrı bir kontrol göreceksiniz. Bu kontrollerin kullanımı biraz
garip :) Herhangi bir thema'dan etkilenmesini istediğiniz tüm
kontrolleri bu yukarıdaki thema kontrolleri içerisine koymanız
gerekiyor. Yani aslında bir anlamda kendileri birer LayoutControl gibi
davranıyorlar.

![Blend içerisinde Theme kontrollerinin
yapısı.](http://cdn.daron.yondem.com/assets/2238/05112008_3.png)\
*Blend içerisinde Theme kontrollerinin yapısı.*

Yukarıdaki ekran görüntüsünde gördüğünüz üzere
**ExpressionDarkTheme**'den etkilenmesini istediğimiz tüm kontrolleri
bir Canvas içerisinde kendisine teslim etmişiz. Theme kontrolleri
aslında içlerine sadece bir kontrol alabiliyorlar o nedenle Canvas gibi
ayrı bir LayoutControl daha kullanmamız gerekiyor.

Bu yapı sayesinde bir uygulamada birden çok şablonu farklı uygulama
bölümlerinde kullanabilirsiniz. Örneğin bir Grid'in iki kolonu
içerisinde farklı Theme kontrolleri koyarak bu kontrollerin içerisinde
söz konusu şablonlardan faydalanabilir ve bu şekilde farklı
kombinasyonlar ile de çalışabilirsiniz.

![Toolkit içerisinde hazır renk
şablonları.](http://cdn.daron.yondem.com/assets/2238/05112008_4.png)\
*Toolkit içerisinde hazır renk şablonları.*

Yukarıdaki şablonlar doğrudan Toolkit içerisinde hazır olarak gelen
şablonların örnekleri. Tasarımcıların ne kadar hoşuna gider bilemiyorum
:) ama yazılımcıların çok işine yarayacağından eminim. İsteyenler
Toolkit paketi içerisinde Themes/XAML klasöründe bu tasarımların XAML
kodlarını da bulabilirler.

Hepinize kolay gelsin.


