---
FallbackID: 2533
Title: SL4'te ListBox ile gelen yeni State'ler ve kullanımı ile oluşan hoş manzara.
PublishDate: 9/3/2010
EntryID: SL4te_ListBox_ile_gelen_yeni_Stateler_ve_kullanimi_ile_olusan_hos_manzara
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 9954fdcd-b67a-42a7-b82b-9ab7b86b7e1b
---
Silverlight içerisinde uzun süredir sahip olduğumuz primitive
kontrollerden biri sayılabilecek ListBox'ı eminim ki bolca
kullanıyorsunuz. Bu makalede değineceğimiz ufak nokta ise ListBox'a
gelen yeni State'ler. Silverlight 4 ile beraber gelen birkaç yeni State
ile aslında ListBox'larını kolaylıkla daha "hoş" bir hale
dönüştürebiliyorsunuz :) Gelin hızlıca göz atalım.

**[XAML]**

``` {style="font-family: consolas"}
    <Grid x:Name="LayoutRoot"
          Background="White">
        <ListBox x:Name="listBox"
                 Margin="63,19,174,62" />
        <Button x:Name="btnTikla"
                Content="Button"
                Height="31"
                Margin="70,0,188,8"
                VerticalAlignment="Bottom" />
 
    </Grid>
```

Yukarıdaki kodumuz normal bir ListBox ve Button içeriyor. Amacımız
örneğimizi inceleyebilmek adına hızlıca bu ListBox'a programatik olarak
birşeyler eklemek.

**[VB]**

``` {style="font-family: consolas"}
    Private Sub btnTikla_Click(ByVal sender As Object, 
    ByVal e As System.Windows.RoutedEventArgs) Handles btnTikla.Click
        listBox.Items.Add(Rnd() * 100)
    End Sub
```

Sanırım şimdilik epey basit oldu değil mi? Böyle de kalsın. Ama gelin
hemen uygulamanın nasıl çalıştığına da bir göz atalım.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Basit bir örnek.*

Görüldüğü üzere herşey yolunda ve normal bir ListBox görevini yapıyor.
Şimdi geçelim Blend tarafına ve ListBox'ımıza hemen sağ tıklayarak "Edit
Additional Templates / Edit Generated Item Container / Edit A Copy"
komutunu verelim.

![ItemContainerStyle'ı
değiştirirken](http://cdn.daron.yondem.com/assets/2533/02092010_2.png)\
*ItemContainerStyle'ı değiştirirken*

Bu komut ile aslında yaptığımız şey ListBox içerisinde yaratılan her bir
ListBoxItem'ı host eden parent elementin stilinin bir kopyasını almak
oluyor. Böylece her bir ListBoxItem'ı çevreleyen bu tek tek kontrollerin
merkezi tasarımını değiştirebiliyor olacağız. "Edit A Copy" diyip
kopyayı alıp, aldığınız kopyaya da istediğiniz ismi verdikten sonra sıra
geliyor State yapısındaki değişikliğe göz atmaya.

![LayoutStates
gelmiş!](http://cdn.daron.yondem.com/assets/2533/02092010_3.png)\
*LayoutStates gelmiş!*

Gördüğünüz üzere artık ListBox'ların LayoutStates diye bir
VisualStateGroup'u var. Burada bahsedilen şey her bir ListBoxItem
yüklendikten / yaratıldıktan sonra (AfterLoaded), önce (BeforeLoaded)
veya silinmeden (ListBox içinden kaldırılmadan) önce (BeforeUnloaded)
farklı bir state durumun oluşabileceği. Eh bu durum (state)'e de bir
animasyonla geçiş yaparsak güzel bir manzara yakalayabiliriz.

![ContentPresenter ListBoxItem'ı temsil
ediyor.](http://cdn.daron.yondem.com/assets/2533/02092010_4.png)\
*ContentPresenter ListBoxItem'ı temsil ediyor.*

ItemContainerStyle'ın içine baktığımızda **contentPresenter** diye bir
arkadaşla karşılaşıyoruz. Daha önce de bahsettiğimiz üzere şu anda her
bir ListBoxItem yaratılırken parent olarak yaratan Container
içerisindeyiz. Yani şu anda bu gördüğümüz **Template** her bir
ListBoxItem için yaratılıyor ve ListBoxItem bu Template içerisindeki
contentPresenter'ın içine konduktan sonra da Template'imiz ayrıca
ListBox'ın içine konuyor (aslında orada da birkaç katman var ama
şimdilik konumuz dışında). Özetle aklımızda bulunması gereken şey bizim
ListBoxItem'ın yani yarattığımız her nesnenin bu tasarım içerisinde
contentPresenter'ın içine gelecek olması. O nedenle
**contentPresenter'ı** anime etmemiz ListBoxItem'ı anime etmek için
yeterli.

İlk olarak base state'i seçelim ve contentPresenter'ımızının Opacity
değerini 0 olaray ayarlayalım. Sonra da **AfterLoaded** state'ini
seçerek Opactiy değerini 100 yapalım. Böylece ilk yaratıldığında
ListBoxItem gözükmeyecek fakat Loaded olduktan sonra Container bunu
algılayıp **AfterLoaded** state'ine geçtiğinde Container gözüktüğü için
ListBoxItem'da gözükecek. State'ler arası geçiş süresini de bir saniye
olarak verirsek herşey hazır demektir.

![Ayrı State'lerde ayrı Opacity değerleri ve geçiş süremiz
hazır.](http://cdn.daron.yondem.com/assets/2533/02092010_5.png)\
*Ayrı State'lerde ayrı Opacity değerleri ve geçiş süremiz hazır.*

Eğer isterseniz "BeforeUnloaded" state'inde de Opacity'yi yine 0 vererek
ListBox içerisinden bir nesne kaldırıldığında görünmez olarak kalkmasını
da sağlayabilirsiniz.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Uygulamanın son hali.*

Hepinize kolay gelsin!

[Örnek kaynak kodlar, 02092010\_7.rar (30,68
KB)](http://cdn.daron.yondem.com/assets/2533/02092010_7.rar)


