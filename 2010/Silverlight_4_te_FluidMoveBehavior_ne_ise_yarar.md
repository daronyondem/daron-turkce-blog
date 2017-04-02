---
FallbackID: 2534
Title: Silverlight 4'te FluidMoveBehavior ne işe yarar?
PublishDate: 9/4/2010
EntryID: Silverlight_4_te_FluidMoveBehavior_ne_ise_yarar
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 024c6816-2639-4db7-8cdd-1ea688e6925d
---
Silverlight 3 ile beraber Behavior yapılarına alışmış hatta bunları
nasıl geliştirebileceğimize de [eski
makalelerde](http://daron.yondem.com/tr/post/f46c0a0d-7572-4f65-ba14-4869b913933d)
göz atmıştık. Silverlight 4 ile beraber gelen yeni Behaviorlardan
FluidMoveBehavior kolay kullanımı ile dikkat çekerken
uygulamalarınızdaki bir çok animasyon yükünden (özellikle programatik
olarak yapılması gerekenler) kurtulmanızı sağlıyor. Gelin bu Behavior'ın
hangi sorunu çözdüğüne ve nasıl kullanıldığına göz atalım.

Örneğimizde basit bir şekilde iki tane düğme yer alacak. Bu düğmeler bir
Grid içerisinde bulundukları için kendi pozisyonlarını ancak
Margin'lerini değiştirerek değiştirebilecekler. Margin değerleri dışında
aslında Button'larımızın RenderTransform altından TranslateTransform
uygulayarak da pozisyonlarını değiştirebiliriz fakat bu hem pozisyon
anlamında ek relative hesaplamalar gerektireceği için hem de dış Grid'in
boyutlandırmasından buttonların etkilenmesini istediğimiz iş
uygulamalarında bu yapıyı zedeleyeceği için tercih etmeyeceğimiz bir
yöntem olacaktır. Özetle :) bu buttonlar Grid içerisinde bulundukça tek
düzgün çaremiz Margin'lerini değiştirerek pozisyonlarını değiştirmek.

**[XAML]**

``` {style="font-family: consolas"}
    <Grid x:Name="LayoutRoot"
          Background="White">
        <Button x:Name="btn1"
                Content="Button"
                HorizontalAlignment="Left"
                Margin="43,142,0,0"
                Width="85"
                Height="67"
                VerticalAlignment="Top" />
        <Button x:Name="btn2"
                Content="Button"
                Height="73"
                Margin="169,55,0,0"
                VerticalAlignment="Top"
                HorizontalAlignment="Left"
                Width="104" />
 
    </Grid>
```

**[VB]**

``` {style="font-family: consolas"}
    Private Sub btn1_Click(ByVal sender As Object, 
    ByVal e As System.Windows.RoutedEventArgs) Handles btn1.Click
        btn1.Margin = New Thickness(300, 300, 0, 0)
    End Sub
 
    Private Sub btn2_Click(ByVal sender As Object, 
    ByVal e As System.Windows.RoutedEventArgs) Handles btn2.Click
        btn2.Margin = New Thickness(300, 300, 0, 0)
    End Sub
```

Basit iki düğme ve tıklandıklarında pozisyonlarını değiştirmeye ait
kodları yukarıdaki bulabilirsiniz. Şimdi sorumuz şu; biz bu pozisyon
değişikliğim nasıl anime ederiz? Margin Thickness tipinde olduğu için
anime etme şansımız yok. Aynı şekilde örneğin Grid içerisinde bulunan
bir nesnenin Row ve Column değerlerini de anime etmek mümkün olmuyor.
StoryBoard yaratıp Blend içerisinde bu değerleri değiştirirseniz anime
edilmediklerini görebilirsiniz.

**Karşınızda FluidMoveBehavior!**

Pozisyon değişiklikleri ne şekilde yapılmış olursa olsun
FluidMoveBehavior'ın işidir :) Arka planını nasıl çalıştığından
bahsetmeyeceğimiz isteyenleriniz karıştıracaktır zaten :) ama esas
önemli olan bizim işimizi ne kadar pratik bir şekilde halletiği ve nasıl
kullanıldığı.

Bir önceki örneğimizde Grid içerisinde iki tane button vardı ve
pozisyonları kod ile tıklandıklarında değiştiriliyordu. Tüm bu projeye
hiç dokunmadan Blend içerisinden bir **FluidMoveBehavior** alarak Grid
içerisine atacağız.

![FluidMoveBehavior iş
başında...](http://cdn.daron.yondem.com/assets/2534/03092010_1.png)\
*FluidMoveBehavior iş başında...*

Yukarıdaki ekran görüntüsünde de adım adım inceleyebileceğiniz üzere
yaptığımız şey aslında basit bir Drag&Drop ile FluidMoveBehavior'ı
Grid'in içine atmak sonrasında ek olarak FluidMoveBehavior seçiliyken
özelliklerinden **AppliesTo'yu** **Children** olarak değiştiriyoruz.

![FluidMoveBehavior Grid'in Children'larına
uygulansın.](http://cdn.daron.yondem.com/assets/2534/03092010_2.png)\
*FluidMoveBehavior Grid'in Children'larına uygulansın.*

Burada yaptığımız ayar ile **FluidMoveBehavior'a** Grid ile değil de
Grid'in **Children** adındaki kolleksiyonundaki nesneler ile
ilgilenmesini söylemiş oluyoruz. Bizim pozisyonunu değiştirdiğimiz
neslelerin Grid'in Children'ları olduğuna göre doğru yoldayız demektir.

Artık uygulamamızı çalıştırabiliriz.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Margin'ler değişiyor ve animasyon karşımızda!*

Gördüğünüz gibi programatik olarak arka tarafta yapılmış olması olası
onlarca pozisyon değişikliği bir anda animasyonlara çevrilebiliyor!
Hatta bu pozisyon değişiklikleri nasıl yaptığınız hiçbir önemi de yok!

**ListBox'a uygulasak?**

Dün yaptığımız
[örneği](http://daron.yondem.com/tr/post/9954fdcd-b67a-42a7-b82b-9ab7b86b7e1b)
hatırlarsanız bir ListBox'a Item ekleyip çıkarıyorduk ve Item'ların
eklenme ve çıkarılma noktasında nasıl anime olabileceğini görmüştük.
Fakat orada ufak bir sorun vardı. Item'lardan biri çıkarıldığında güzel
bir animasyon ile yok olsa da geri kalan boşluğu diğer Item'lar zınk
diye zıplayarak dolduruyordu ki bu da pek hoş bir görüntü değil.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Dün
[yaptığımız](http://daron.yondem.com/tr/post/9954fdcd-b67a-42a7-b82b-9ab7b86b7e1b)
Listbox'a item ekleyip çıkaran örneğimizin son hali.*

Şimdi ben diyorum ki :) Bu Item'ların eklendiği Grid'imsi birşeyler
vardır orada. Onu bulsak :) içine bir FluidMoveBehavior eklesek de bu
ListBoxItem'lar aralarından kaldırılan arkadaşın yerine doğru kayarak
animasyonla kaysalar?

![ListBox'ın ItemsPanel'ine
ulaşırken.](http://cdn.daron.yondem.com/assets/2534/03092010_4.png)\
*ListBox'ın ItemsPanel'ine ulaşırken.*

ListBox'ımıza sağ tuş ile tıkladıktan sonra "Edit Additional Templates /
Edit Layout of Items / Create Empty" dediğimizde tam da istediğimiz yere
yani "ItemsPanel"e ulaşıyoruz. Burası her bir ListBoxItem'ın yaratılıp
kendi containerları içerisine konduktan sonra kondukları yer. Bakalım
içeride ne varmış...

![ItemsPanel'de bir StackPanel var. İçine FluidMoveBehavior
atsak?](http://cdn.daron.yondem.com/assets/2534/03092010_5.png)\
*ItemsPanel'de bir StackPanel var. İçine FluidMoveBehavior atsak?*

ItemsPanel'e girdiğimizde orada bir StackPanel buluyoruz. Çok mantıklı!
Demek böylece ListBox içerisinde ListBoxItem'lar alt alta duruyormuş :)
Peki biz bu StackPanel'e de bir FluidMoveBehavior atsak ve AppliesTo
özelliği de yine Children yapsak acaba StackPanel içindeki Item'ların
pozisyonları değiştiğinde bir animasyon görebilir miyiz? Deneyelim.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Süper! Herşey yolunda...*

Güzel olmadı mı? :) Birkaç Item ekleyip sonra birini seçip seilmeyi
deneyin sonucu göreceksiniz. Unutmayın **FluidMoveBehavior'ın**
**EaseX** ve **EaseY** adında yaratılan animasyonun ivmesini de
değiştirebileceğiniz özellikleri mevcut. Onları da kullanırsanız daha
güzel sonuçlar alacağınızdan eminim. Ben hafiften yukarıda kullandım ;)

Hepinize kolay gelsin.

[Örnek Kaynak Kodlar : 03092010\_7.rar (38,98
KB)](http://cdn.daron.yondem.com/assets/2534/03092010_7.rar)


