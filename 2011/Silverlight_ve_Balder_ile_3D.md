---
FallbackID: 2546
Title: "Silverlight ve Balder ile 3D"
date: "2011-2-1"
EntryID: Silverlight_ve_Balder_ile_3D
IsActive: True
Section: software
MinutesSpent: 0
Tags: Balder, Silverlight 4
old.EntryID: df5efb20-5a04-497b-85d8-48d5c6678956
---
Geçenlerde bir proje için Silverlight üzerinde 3D denemeleri yapmam
gerekti. Bu vesile ile elde ettiğim bazı demoları sizlerle de paylaşmaya
karar verdim.

Silverlight ve 3D dediğimizde kafalar biraz karışabilir. Şu anda
Silverlight 4.0 sürümünde hala eski
[Projection](http://daron.yondem.com/tr/post/9392035b-c1c2-4149-b4f7-066fce25dd6b)
yapısı mevcut. Bu yapı özünde uygun senaryolarda 3D'den çok daha
işlevsel olabiliyor. Fakat tabi ki gerçek bir 3D ihtiyacında pek
ihtiyaçlarımızı karşıladığını söyleyemiz. Diğer yandan Silverlight 5 ile
ilgili duyuruları takip edebildiyseniz Silverlight 5 içerisinde Native
bir 3D API Set'inin de bulunacağını duymuşsunuzdur. SL5'teki 3D'nin ne
kadar kompleks bir API seti sunacağı konusunda pek net bilgi yok. Benim
beklentim epey high level apilerin geleceği yönünde. Neyse konumuza
dönersek, şu anda elimizdeki Silverlight 4 ile 3D'ye dair neler
yapabiliriz ona bakalım.

**Balder, bir 3D motoru!**

Balder doğrudan [CodePlex](http://balder.codeplex.com/) üzerinden
indirebileceğiniz açık kaynak kodlu bir 3D motoru. Native olarak
desteklenmeyen 3D ortamını bizim için Balder yaratabiliyor. Arka planda
neler oluyor neler bitiyor hikayesi çok uzayabileceği için o taraflara
girmeyeceğim. Fakat şunu bilmekte fayda var ki bahsettiğimiz 3D SL
tarafından desteklenen GPU destekli bir 3D vs değil. Yani
bekleyebileceğimiz performans da buna uygun olmalı. Konuyu çok uzatmadan
istersen demomuza geçelim. İlk olarak Balder'in
[CodePlex](http://balder.codeplex.com/releases/53579/download/155685)
sayfasından kütüphaneyi bilgisayarımıza indiriyoruz. Paket içerisinden
SL4 DLL'lerini alarak bilgisayarımızda uygun bir yere koyuyoruz.

**3D bir modeli Balder ile gösterelim!**

Balder'i kullanarak 3D bir modeli örnek projemizde göstererek modelin üç
boyutlu ortamdaki koordinatlarına da nasıl ulaşabileceğimizi göreceğiz.
Bunun için hemen sıfırdan bir Silverlight 4 projesi yaratarak Balder'in
DLL'lerini referans olarak projemize ekliyoruz. Kullanacağımız 3D modeli
3DSMax gibi bir yerden almak istediğimizde elimizde bir **ASE (ASCII
Export File)** olması gerekiyor. Bu dosyalar otomatik olarak Balder
tarafından tanınarak modellenebiliyorlar. Bilenler bilir :) ben her
zamanki basit çaydanlık modeli ile devam edeceğim :) Model dosyasını siz
de aşağıdan indirebilirsiniz.

[Çaydanlık Modeli - Teapot.ASE - 01022011\_6.zip (171,24
KB)](media/Silverlight_ve_Balder_ile_3D/01022011_6.zip)

Dosyayı bilgisayarınızda indirdikten sonra hemen dosyaya sağ tuşla
tıklayıp "Properties" diyerek "Unblock" demeyi unutmayın. Aksi haldi bir
sonraki adımda yapmamız gerekenleri yapamayız. Gelelim bu dosyayı
Silverlight projemize eklemeye. Basit bir şekilde Solution Explorer'dan
SL projesine sağ tıklayıp "Add Existing Item" diyerek dosyayı projeye
ekleyebilirsiniz. Unutmamanız gereken tek nokta dosyanın "**Build
Action**"ınını "**Resource**" olarak ayarlamak.

![ASE dosyasını Resource olarak
ayarlıyoruz.](media/Silverlight_ve_Balder_ile_3D/01022011_5.png)\
*ASE dosyasını Resource olarak ayarlıyoruz.*

Dosya artık projemizde olduğuna göre sıra geldi bu dosyayı göstermeye.
Balder ile 3D bir ortam yaratmak için farklı nesnelere ihtiyacımız
olacak. Basit bir tahminle en azından bir 3D alan, kamera, ışık gibi
öğelere ihtiyacımız olacağı kesin. Tüm bunlar Balder'in 3D motoru
içerisinde tanımlı olacak ve Balder tarafından kullanılacak öğeler
olacak. Bu nesnelerin her birini kullanabilmek için uygun namespace'leri
XAML tarafında tanımlamamız gerek. Malum bahsettiğimiz ışık vs gibi
şeyleri de XAML ile tanımlamak anlamlı olacaktır.

**[XAML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    xmlns:Execution="clr-namespace:Balder.Execution;assembly=Balder" 
    xmlns:View="clr-namespace:Balder.View;assembly=Balder"
    xmlns:Lighting="clr-namespace:Balder.Lighting;assembly=Balder"
    xmlns:Geometries="clr-namespace:Balder.Objects.Geometries;assembly=Balder"
```

Yukarıdaki XML namespace tanımlarını Silverlight projenizde
kullanacağınız UserControl'ün root elementinde yapmanız yeterli
olacaktır. Rootelement derken XML root elementi kast ediyorum :) Yani
eğer bir User Control yaratıyorsanız UserControl XML elementi zaten root
element oluyor. Tüm bu düzenlemeleri tamamladıktan sonra sıra geliyor 3D
ortamı yaratmaya.

**[XAML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
<UserControl x:Class="Balder_3D_1.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d"
    xmlns:Execution="clr-namespace:Balder.Execution;assembly=Balder" 
    xmlns:View="clr-namespace:Balder.View;assembly=Balder"
    xmlns:Lighting="clr-namespace:Balder.Lighting;assembly=Balder"
    xmlns:Geometries="clr-namespace:Balder.Objects.Geometries;assembly=Balder"
    d:DesignHeight="300" d:DesignWidth="400">
 
    <Grid x:Name="LayoutRoot" Background="White">
        <Execution:Game Width="400" Height="400">
            <Execution:Game.Camera>
                <View:Camera Position="-20,100,-10" />
            </Execution:Game.Camera>
        </Execution:Game>
    </Grid>
</UserControl>
```

Yukarıdaki kod içerisinde şu anki UserControl'ün tüm yapısını
görebilirsiniz. Root UI Element olarak Grid'in içerisine hemen bir
**Game** area yerleştirdim. **Execution** namespace'i altından
alabileceğimiz bu nesneden bir kopya yaratıp 3D motor tarafından
oluşturulacak görsel alanın boyutunu da **Game** elementine verdiğimiz
**Height** ve **Width** değerleri ile belirlemiş olduk. Bu yarattığımız
üç boyutlu alan içerisinde tabi ki bir kameraya ihtiyacımız olacak.
Bizim gözümüzle gördüğümüz veya 3D motorun render edeceği görüntünün
açısı vs bu kameranın bakış açısına göre hesaplanacak. **View**
namespace'i altından da bir **Camera** nesnesi alarak **Game'in**
**Camera** propertysine set ediyoruz. Ben bizim örneğimizde kameranın 3D
ortamdaki pozisyonunu çaydanlık modelimizin büyüklüğüne göre özel olarak
ayarladım ki çaydanlığı görebilelim :) Malum çaydanlığın arkasında
kalmak ve başka yönlere boş boş bakıyor olmak da mümkün :)

**[XAML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        <Execution:Game Width="400" Height="400">
            <Execution:Game.Camera>
                <View:Camera Position="-20,100,-10" />
            </Execution:Game.Camera>
            <Lighting:OmniLight x:Name="MainLight" Position="0,2,-10" Strength="0.5" 
        Diffuse="White" />
        </Execution:Game>
```

İki adımımız daha kaldı. Bunlardan ilki yarattığımız 3D ortama
yukarıdaki gibi bir de ışık eklemek :) Işıksız hiçbirşeyi göremeyiz
değil mi? Bu durumda ortamımıza bir **OmniLight** ekliyoruz.
OmniLight'lar her yöne eşit miktarda ışık gönderen ışık kaynaklarıdır.
Başka bir örnek olarak SpotLight'lar ise ışığı sadece belirlenen bir
yöne doğru gönderirler. OmniLight'ımızı yarattıktan sonra **Strenght**
(Kuvvet) ve **Diffuse** (Dağılma) değerlendirni ayarlıyoruz. Bizim
senaryomuzda ışığımız Beyaz olacak.

Geldik artık son adıma. Daha önce projemize eklediğimiz teapot.ase
dosyasında modelin yaratmış olduğumuz 3D ortamda gösterilmesini
istiyoruz.

**[XAML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <Grid x:Name="LayoutRoot" Background="White">
        <Execution:Game Width="400" Height="400">
            <Execution:Game.Camera>
                <View:Camera Position="-20,100,-10" />
            </Execution:Game.Camera>
            <Lighting:OmniLight x:Name="MainLight" Position="0,2,-10" Strength="0.5" 
                        Diffuse="White" />
            <Geometries:Mesh x:Name="MainObject" AssetName="/Balder_3D_1;component/teapot.ase"/>
        </Execution:Game>
    </Grid>
```

Geometries namespace'i altından bir Mesh objesi alarak "AssetName"
özelliğine de Mesh objesinin render etmesini istediğimiz ASE dosyasının
Assembly içerisinde yolunu veriyoruz. Bizim örnek projemizin adı
**Balder\_3D\_1** olduğu için Assembly adımız da aynı şekilde oluyor.
Artık herşey hazır gibi. Bakalım projemize çalışıyor mu?

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50826.0)\
*Woohooo! Çalışıyor :)*

Herşey çok güzel görünüyor. Peki ya biz şimdi bu objenin üç boyutlu
ortamdaki koordinatlarını değiştirmek istersek? veya belki de kameranın,
ışığın koordinatlarını nasıl değiştirebiliriz? Tüm bu objelere kod
tarafından ulaşabilmek için ilk olarak objeleri isimlendirmekte fayda
var.

**[XAML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <Grid x:Name="LayoutRoot" Background="White">
        <Execution:Game Width="400" Height="400">
            <Execution:Game.Camera>
                <View:Camera x:Name="Kamera" Position="-20,100,-10" />
            </Execution:Game.Camera>
            <Lighting:OmniLight x:Name="Isik" Position="0,2,-10" Strength="0.5" 
                Diffuse="White" />
            <Geometries:Mesh x:Name="Caydanlik" AssetName="/Balder_3D_1;component/teapot.ase"/>
        </Execution:Game>
    </Grid>
```

Artık her objenin bir ismi olduğuna göre rahat rahat kod tarafından
ulaşarak fantastik hareketler yapabiliriz.

![3D ortamdaki tüm objelere
ulaşabiliyoruz.](media/Silverlight_ve_Balder_ile_3D/01022011_3.png)\
*3D ortamdaki tüm objelere ulaşabiliyoruz.*

Yukarıdaki ekran görüntüsünde de görebileceğiniz üzere artık tüm objeler
elimizin altında ve tek tek X, Y ve Z koordinatlarına ulaşabiliyor,
değiştirebiliyoruz. Peki ben makaleyi böyle bir bitireceğim? Tabi ki
hayır :) Aşağıdaki örneği bir inceleyin. Mouse ile çaydanlığın etrafında
gezebildiğinizi göreceksiniz.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50826.0)\
*Çaydanlık forever!*

Şimdi mouse koordinatları ile nesnenin transformasyonu arasındaki
değişimleri kontrol edecek kodu da merak ediyorsunuzdur :) İşte aşağıda;

[XAML]

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <Grid x:Name="LayoutRoot" Background="White">
        <Execution:Game Width="400" Height="400">
            <Execution:Game.Camera>
                <View:Camera x:Name="Kamera" Position="-20,100,-10" />
            </Execution:Game.Camera>
            <Lighting:OmniLight x:Name="Isik" Position="0,2,-10" Strength="0.5" 
                        Diffuse="White" />
            <Geometries:Mesh InteractionEnabled="True" x:Name="Caydanlik" 
            AssetName="/Balder_3D_1;component/teapot.ase"/>
        </Execution:Game>
    </Grid>
```

İşte bu kadar :) Objenin InteractionEnabled özelliği True yaptığınız
anda iş tamamdır.

Sonuç olarak :) şu anda Silverlight'ta 3D desteği olmasa da bu gibi ufak
hareketleri yapmak pek de zor değil. Bu noktada Balder'i yazan çılgın
Silverlight MVP'si [Einar Ingebrigtsen](http://www.ingebrigtsen.info/)'e
teşekkür etmek gerek sanırım. Gerçek hayatta ne gibi implementasyonlar
yapılabilir noktasına gelince. Balder ile bir oyun yazmak özellikle
performans açısından biraz fantastik olur. Ben genel olarak 3D
modellerin gösterilmesi gereken senaryolarda güzel bir çözüm olarak
görüyorum Balder'i. Ama buradan yola çıkarak bir araba yarışı yazmak
falan tabi ki mümkün değil. Bunun için belki de SL5'teki native
implementasyonları beklemek gerekecek.

Örnekle ilgili projeyi aşağıdan indirebilirsiniz.

[Örnek Proje Kodları - 01022011\_7.zip (1,69
MB)](media/Silverlight_ve_Balder_ile_3D/01022011_7.zip)

Hepinize kolay gelsin.


