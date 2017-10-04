---
FallbackID: 2535
Title: FluidMoveBehavior ve FluidMoveSetTagBehavior ile efsanevi hareketler.
PublishDate: 5/9/2010
EntryID: FluidMoveBehavior_ve_FluidMoveSetTagBehavior_ile_efsanevi_hareketler
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 0353ed49-03f5-4533-9cf9-c0abd644d71d
---
Daha önce
[FluidMoveBehavior'a](http://daron.yondem.com/tr/post/024c6816-2639-4db7-8cdd-1ea688e6925d)
hızlıca göz atmıştık. Bu yazımızda ise FluidMoveBehavior'ı bir başka
senaryoda kullanarak biraz daha efsaneleştireceğiz :) Eğer bir önceki
yazıyı okuduysanız screenshot'larda birşey dikkatinizi çekmiş olabilir.

![O da nesi?](media/FluidMoveBehavior_ve_FluidMoveSetTagBehavior_ile_efsanevi_hareketler/04092010_1.png)\
*O da nesi?*

Yukarıdaki ekran görüntüsünde de inceleyebileceğiniz üzere
**FluidMoveBehavior** nesnemizim **Tag Properties** sekmesinde iki
özelliği daha var. Daha önceki makalemizde bu özelliklere değinmemiştik.
(Bir önceki
[makaleyi](http://daron.yondem.com/tr/post/024c6816-2639-4db7-8cdd-1ea688e6925d)
okumadıysanız lütfen okuyun :), daha anlamlı olacaktır) Konuya girmeden
önce gelin ilk olarak örneğimiz için gerekli altyapıyı hazırlayalım.

**[XAML]**

``` {style="font-family: consolas"}
<UserControl.Resources>
        <DataTemplate x:Key="DataTemplate1">
            <Grid>
                <TextBlock Margin="0,0,0,4"
                           TextWrapping="Wrap"
                           Text="{Binding Adi}"
                           d:LayoutOverrides="Width, Height">
                </TextBlock>
            </Grid>
        </DataTemplate>
        <DataTemplate x:Key="DataTemplate2">
            <Grid>
                <TextBlock Margin="0,0,0,4"
                           TextWrapping="Wrap"
                           Text="{Binding Adi}"
                           d:LayoutOverrides="Width, Height">
                </TextBlock>
            </Grid>
        </DataTemplate>
    </UserControl.Resources>
 
    <Grid x:Name="LayoutRoot"
          Background="White">
        <ListBox x:Name="listBox1"
                 HorizontalAlignment="Left"
                 Margin="8,8,0,70"
                 Width="189"
                 ItemTemplate="{StaticResource DataTemplate1}" />
        <ListBox x:Name="listBox2"
                 HorizontalAlignment="Right"
                 Margin="0,8,8,70"
                 Width="191"
                 ItemTemplate="{StaticResource DataTemplate2}" />
        <Button x:Name="btnTikla"
                Content="Yana Al &gt;"
                Height="58"
                Margin="9,0,8,8"
                VerticalAlignment="Bottom" />
 
    </Grid>
```

Yukarıdaki kod kullanacağımız örnek uygulamanın XAML kodu. Özetlemek
gerekirse ekranda iki ListBox ve bir de Button var. Bunların haricinde
her ListBox'ın içerisinde tekrar eden kısım olan **ItemTemplate'ler** de
Blend ile yaratılmış ve içlerine de birer basit **TextBlock** konmuş.
TextBlock'ların Text'leri de ListBox'lara bind edilecek nesnelerin
**Adi** adındaki **Property'lerine** bind edilmiş. İşin bu kısmı
makalemizin sınırları dışında olduğu için detaylarına değinmeyeceğiz.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Sol ListBox'ta seçili birşeyi sağdakine alabilirsiniz.*

Tüm bu mekanizmayı yaratmamızın nedeni yukarıdaki gibi bir ListBox'tan
diğerine Item'ları çıkarıp ekleyecek olmamız. Yani ekrandaki düğmeye
basıldığında aynı yukarıdaki örnekteki gibi ListBox'ın birinde seçilen
nesne düğmeye basıldığında kaldırılıp sağdaki ListBox'a eklenecek. Bu
kadar basit.

Sadece metin göstereceksek nedeni ItemTemplate yarattık diyenleriniz
olabilir. Birazdan o templateları kullanacağız :)

Yukarıdaki örneğin kodunu da bir inceleyelim hızlıca isterseniz.

**[VB]**

``` {style="font-family: consolas"}
Imports System.Collections.ObjectModel
 
Partial Public Class MainPage
    Inherits UserControl
 
    Public Class OrnekItem
        Public Property Adi As String
        Public Property EkBilgi As String
    End Class
 
    Public Sub New()
        InitializeComponent()
    End Sub
 
    Dim SolNesneler As New ObservableCollection(Of OrnekItem)
    Dim SagNesneler As New ObservableCollection(Of OrnekItem)
 
    Private Sub MainPage_Loaded(ByVal sender As Object,
                                ByVal e As RoutedEventArgs) Handles Me.Loaded
        For index = 1 To 10
            SolNesneler.Add(New OrnekItem With {.Adi = "Örnek" & index,
                                                .EkBilgi = "Deneme"})
        Next
        listBox1.ItemsSource = SolNesneler
        listBox2.ItemsSource = SagNesneler
    End Sub
 
    Private Sub btnTikla_Click(ByVal sender As Object,
                               ByVal e As RoutedEventArgs) Handles btnTikla.Click
        Dim Secili = listBox1.SelectedItem
        SolNesneler.Remove(Secili)
        SagNesneler.Add(Secili)
    End Sub
End Class
```

Koda yukarıdan aşağıya bakacak olursanız iki adet
ObservableCollection'ın iki farklı ListBox'a bind edildiğini, bu
kolleksiyonlardan birinin dummy içerikle doldurulduğunu görebilirsiniz.
Hatta bunun için bir de OrnekItem diye nesne yarattık :) Hatırlarsanız
zaten ListBox'ın ItemTemplate'lerindeki TextBlock'ların Text'leri de
OrnekItem'ın **Adi** adındaki Property'lerine bind edilmişti. Herşey
güzel gibi. Son olarak Button'un Click durumunda seçili arkadaşı bulup
bir listeden çıkarıp diğerine ekliyoruz. Böylece bind edilmiş olan
ListBoxlarda da aynı değişikliği görebiliriz.

**Herşey hazır!**

Artık örneğin can alıcı noktasına gelmeye hazırız. FluidMoveBehavior ile
önceki makalelerde bir nesnenin pozisyon değişikliğini anime
edebileceğimizi görmüştük. Bu animasyon nesne bazında yapılabileceği
gibi aynı veriyi temsil eden farklı nesneler arasında da yapılabilir.
Yani bir ürünü gösteren X UIElement'iniz ve Y UIElement'iniz aynı ürünü
gösterdiği için bu ilişkiden yola çıkarak X'den Y'e bir animasyon
yapabiliriz. Tabi görsel olarak düzgün ve doğal bir sonuç almak için
kabaca X ve Y'nin görsel olarak da aynı olmaları gerek :) pozisyon
özellikleri haricinde...

Toparlayacak olursak... Soldaki ListBox'dan bir nesneyi alıp sağdakine
eklediğimizde aslında data olarak yani nesne olarak bir nesneyi bir
yerden alıp başka bir yere koymuş oluyoruz. Bizim örneğimizde nesnemiz
**OrnekItem**. Kodumuzu da incelerseniz **OrnekItem** adındaki bir
nesneyi seçili olduğu için bir collection'dan alıp diğerine koyduğumuzu
görebilirsiniz. Yani sol listbox'dan sağ listbox'a taşınan şey aynı şey!
Değişen ne? Görsel olarak bu nesneyi gösteren nesneler yani
UIElement'ler değişiyor. Birinde sağ ListBox eldeki nesneyi gösterirken
diğerine sol ListBox gösteriyor. Güzel olan taraf ise aslında her iki
ListBox'ın da aynı şekilde nesneyi gösteriyor olması. Değişen tek şey
pozisyon!

Bir yolu olsa da soldaki ListBox'ın içinde bizim nesnemizi gösteren
ItemTemplate'teki TextBlock ile sağdaki ListBox'ın içinde nesnemizi
gösteren ItemTemplate'teki TextBlock arasında bir animasyon yapabilsek
hoş olmaz mıydı? :)

![FluidMoveSetTagBehavior
kullanıyoruz...](media/FluidMoveBehavior_ve_FluidMoveSetTagBehavior_ile_efsanevi_hareketler/04092010_3.png)\
*FluidMoveSetTagBehavior kullanıyoruz...*

Yukarıdaki ekran görüntüsüne baktığınızda **FluidMoveSetTagBehavior**
diye yeni bir behavior göreceksiniz. Bu behavior'ı anime etmek
istediğimiz hedef / başlangıç noktasındaki nesneye vermemiz gerekiyor.
Bizim örneğimizde soldaki ListBox'ın ItemTemplate'indeki TextBlock tam
da bizim başlangıç noktamız olacak nesne. Sonuçta bu ListBox'tan yola
çıkan OrnekItem diğer ListBox'a yerleşene kadarki süreci anime etmek
istediğimiz göre başlangıç noktamızı temsil edecek olan UIElement de
soldaki ListBox'ın içinde bir TextBlock olacaktır.

Başlangıç noktamızı FluidMoveSetBehvior ile tanımlarken başlangıçtaki ve
sondaki iki TextBlock'un yani UIElement'in birbiri ile
ilişkilendirilebilmesi için bir bağ yaratmamız gerek. Bu iki TextBock'u
birbiri ile alakalı kılan neydi? **OrnekItem**! Söz konusu
TextBlock'ların yaratılmasına neden olan **OrnekItem** instance'ları
aynı olacağına göre bu bağlantı üzerinden yola çıkarak bir ListBox'tan
kalkan ve diğerine eklenen TextBlocklar arasındaki ilişkisi kurabiliriz.
Aslında biz değil de bir sonraki adımda bu ilişkiyi
**FluidMoveBehavior** kuracak. Bu ilişkinin kurulabilmesi için
**FluidMoveSetTagBehavior** ile başlangıç noktamızı belirlerken
FluidMoveSetTagBehavior'ın **Tag** özelliğini de **DataContext** olarak
set ediyoruz. Böylece artık **DataContext** yani **OrnekItem** üzerinden
bağlantı kurulabilir şekilde başlangıç nesnemizi belirttik.

![FluidMoveBehavior da
sahnede....](media/FluidMoveBehavior_ve_FluidMoveSetTagBehavior_ile_efsanevi_hareketler/04092010_4.png)\
*FluidMoveBehavior da sahnede....*

Geldik esas nesnemizi yani FluidMoveBehavior'ı ekleyeceğimiz yere.
Sağdaki ListBox'ımızın ItemTemplate'indeki TextBlock'a
**FluidMoveBehavior'ı** ekliyoruz. Böylece burada FluidMoveBehavior eğer
varsa diğer **FluidMoveSetTagBehavior'ın** belirlediği **DataContext'e**
göre başlangıç nesnesini bulup animasyon yapabilecek. Tabi söz konusu
arama işleminin DataContext'e göre yapılmasını belirtmek için de
FluidMoveBehavior'ın **InitialTag** özelliğini DataContext olarak
değiştiriyoruz.

Herşey bitti desem inanır mısınz?

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Soldan sağa taşımalar artık animasyonlu...*

Hepinize kolay gelsin ;)

[Örnek Kaynak Kodu : 04092010\_6.rar (30,03
KB)](media/FluidMoveBehavior_ve_FluidMoveSetTagBehavior_ile_efsanevi_hareketler/04092010_6.rar)


