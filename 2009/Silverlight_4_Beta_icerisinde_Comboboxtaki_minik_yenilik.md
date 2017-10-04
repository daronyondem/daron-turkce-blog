---
FallbackID: 2450
Title: Silverlight 4 Beta içerisinde Combobox'taki minik yenilik!
PublishDate: 19/11/2009
EntryID: Silverlight_4_Beta_icerisinde_Comboboxtaki_minik_yenilik
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 2d3c290d-34c5-462e-9638-a5c61585afd5
---
Silverlight 4 ile beraber gelen yenilikleri incelemeye başlayacağımız bu
makalede değinmek istediğimiz nokta biraz veri uygulamalarına yönelik
olacak. Aslına bakıldığında söz konusu yenilik çok basit gibi gözükse de
günü birlik silverlight veri uygulamaları geliştirme sürecinde sürekli
karşılaştığımız ve canımızı sıkan önemli bir sorunu çözmek için çok
değerli. Gelin hep beraber neden bahsettiğime bir göz atalım.

**Bir DataGrid içerisinde Combobox sorunsalı!**

Bunun neresi sorun yaratıyor diyebilirsiniz. Fakat veritabanında
tuttuğumuz değerleri entity tasarımımıza doğrudan yansıttığımızda (ki
Visual Studio içerisinde çoğu RAD (Rapid Application Development) aracı
bunu öngörür) Silverlight tarafındaki DataBing mekanizmalarında kıl bir
durum ile karşılaşıyorduk. Senaryoyu cümlelerle tanımlamak yerine örnek
üzerinden gitmeyi daha uygun görüyorum ;)

![Örnek veritabanı
tasarımı.](http://cdn.daron.yondem.com/assets/2450/18112009_1.png)\
*Örnek veritabanı tasarımı.*

Yukarıda gördüğünüz şekilde veritabanımızda iki tablo var. Bu tablolar
birbirine TipID üzerinden bağlı. Yani her Insan'ın bir tipi var ve bu
tipler de ayrı bir tabloda FK (Foreign Key) ile bağlı. Malum bu tasarım
bizim veritabanı tasarımlarımızın en ufak yapıtaşını temsil edebilir.
Böyle minik bir tasarımdan yola çıkarak doğrudan Entity'leri yaratarak
ilerlediğimizde bakalım Silverlight içerisinde bir DataGrid ile
insanları nasıl gösterebileceğiz?

**[VB]**

\<<span style="color: #2b91af;">ServiceContract</span>(Namespace:=<span
style="color: #a31515;">""</span>)\>

\<<span
style="color: #2b91af;">AspNetCompatibilityRequirements</span>(RequirementsMode:=<span
style="color: #2b91af;">AspNetCompatibilityRequirementsMode</span>.Allowed)\>

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">Service1</span>

 

    <span style="color: blue;">Dim</span> Veri <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">DataClasses1DataContext</span>

 

    \<<span style="color: #2b91af;">OperationContract</span>()\>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> InsanlarGetir() <span
style="color: blue;">As</span> <span
style="color: #2b91af;">List</span>(<span style="color: blue;">Of</span>
<span style="color: #2b91af;">Insanlar</span>)

        <span style="color: blue;">Return</span> (<span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> Veri.Insanlars).ToList

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

    \<<span style="color: #2b91af;">OperationContract</span>()\>

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> TiplerGetir() <span
style="color: blue;">As</span> <span
style="color: #2b91af;">List</span>(<span style="color: blue;">Of</span>
<span style="color: #2b91af;">Tipler</span>)

        <span style="color: blue;">Return</span> (<span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> Veri.Tiplers).ToList

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıda gördüğünüz servis içerisindeki iki metod bize tüm insanları ve
tipleri basit bir şekilde döndürecek. Bu metodları kullanarak
Silverlight tarafından gerekli veriyi sunucudan çekeren Gridimize
bağlamaya çalışacağız.

**[VB]**

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">MainPage</span>

    <span style="color: blue;">Inherits</span> <span
style="color: #2b91af;">UserControl</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">WithEvents</span> Servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.<span style="color: #2b91af;">Service1Client</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        Servis.InsanlarGetirAsync()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Servis\_InsanlarGetirCompleted(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> ServiceReference1.<span
style="color: #2b91af;">InsanlarGetirCompletedEventArgs</span>) <span
style="color: blue;">Handles</span> Servis.InsanlarGetirCompleted

        myGrid.ItemsSource = e.Result

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Gördüğünüz en basit hali ile web servisimizden Insanlar listesini alarak
Grid'e bağladık. Grid içerisinde kolonları da tabi özelleştirmiş olmamız
şart ki böylece uygun bir Combobox'ı da Grid'in bir kolonuna
yerleştirebilelim.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="myGrid"</span><span style="color: red;">
AutoGenerateColumns</span><span style="color: blue;">="False"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid.Columns</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTextColumn</span><span
style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTextColumn</span><span
style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}"/\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTemplateColumn</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTemplateColumn.CellTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox</span><span style="color: red;">
</span> <span style="color: blue;"> /\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTemplateColumn.CellTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGridTemplateColumn</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid.Columns</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">my</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataGrid</span><span
style="color: blue;">\></span>

Artık Grid'imiz de hazır durumda. Geriye birkaç eksik kaldı. Combobox'ı
nasıl dolduracağız? Combobox'ı dolduracak olan veriye Grid'e gelmiyor.
Grid'e sadece Insanlar listesi geliyor ve bu liste içerisinde de sadece
seçili Tipler'in ID bilgileri bulunuyor. Bu durumda ortak bir yerlerden
tüm Tip listesini çekip Combobox'lara vermek zorundayız. Bunun için
harici bir veri kaynağı yaratalım.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">TipListesi</span>

    <span style="color: blue;">Property</span> Tipler <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.ObjectModel.<span
style="color: #2b91af;">ObservableCollection</span>(<span
style="color: blue;">Of</span> ServiceReference1.<span
style="color: #2b91af;">Tipler</span>)

 

    <span class="style3_18112009">Dim</span> Servis <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ServiceReference1.<span style="color: #2b91af;">Service1Client</span>

 

    <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>()

        <span style="color: blue;">AddHandler</span>
Servis.TiplerGetirCompleted, <span
style="color: blue;">Sub</span>(sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
e <span style="color: blue;">As</span> ServiceReference1.<span
style="color: #2b91af;">TiplerGetirCompletedEventArgs</span>)

                                                    Tipler = e.Result

                                                <span
style="color: blue;">End</span> <span style="color: blue;">Sub</span>

        Servis.TiplerGetirAsync()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

 

Yukarıdaki sınıfımızı XAML içerisinden veri kaynağı olarak kullanacağız.
Sınıf içerisinde listemizi sınıfın bir kopyası alındığı anda
dolduruyoruz. Doldurma işlemi için de tabi ki yine web servisimizdeki
Tiplere ait metodu çağırmak durumundayız.

**[XAML]**

<span class="style4_18112009">\<UserControl
xmlns:my="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>
<span class="style4_18112009">
x:Class="SilverlightApplication4.MainPage"</span>

   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

   xmlns:d="http://schemas.microsoft.com/expression/blend/2008"

  
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"

   mc:Ignorable="d"

   d:DesignHeight="300" d:DesignWidth="400"

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">daron</span><span
style="color: blue;">="clr-namespace:SilverlightApplication4"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TipListesi</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="TumTipler"
/\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">   </span><span class="style4_18112009">
\<Grid x:Name="LayoutRoot" Background="White"\></span>

        \<my:DataGrid x:Name="myGrid" AutoGenerateColumns="False"\>

            \<my:DataGrid.Columns\>

                \<my:DataGridTextColumn Binding="{Binding Adi}"/\>

                \<my:DataGridTextColumn Binding="{Binding Adi}"/\>

                \<my:DataGridTemplateColumn\>

                    \<my:DataGridTemplateColumn.CellTemplate\>

<span class="style4_18112009">                       
\<DataTemplate</span><span style="color: blue;">\></span>

<span style="color: #a31515;">                            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ComboBox</span><span style="color: red;">
DisplayMemberPath</span><span style="color: blue;">="Tip"</span><span
style="color: red;"> ItemsSource</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Source</span><span style="color: blue;">={</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
TumTipler</span><span style="color: blue;">},</span><span
style="color: red;"> Path</span><span style="color: blue;">=Tipler}"
/\></span>

                        \</DataTemplate\>

                    \</my:DataGridTemplateColumn.CellTemplate\>

                \</my:DataGridTemplateColumn\>

            \</my:DataGrid.Columns\>

        \</my:DataGrid\>

    \</Grid\>

<span class="style4_18112009">\</UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki XAML dosyasında özellikle değişen renkli kısımlara dikkat
etmekte fayda var. İlk olarak arka planda yarattığımız sınıfımızı XAML'a
alabilmek için namespace tanımını yapıyoruz sonrasında da sınıfın bir
kopyasını Local Resource olarak yaratıyoruz. Son olarak bu
**StaticResource'u** Combobox'ın **ItemsSource'una** bağlıyoruz.
**DisplayMemberPath'i** de **Tip** olarak set ettikten sonra herşey
bitti! Artık uygulamamızı çalıştırabiliriz. Her satır Grid içerisinde
gösterilirken Combobox'lar da Tipler ile doldurulmuş olacaktır.

**Peki de her kayıt için seçili tip seçili gelecek mi?**

İşte esas sorun burada başlıyor. Maalesef gelmeyecek! Bizim bir şekilde
her kayıt Grid içerisinde yaratılırken elimizde olan TipID ile Combobox
içerisindeki nesnelerden birini bağlamamız gerek. Böylece Combobox
içerisinden uygun kayıt otomatik olarak seçili gelmeli! Hatta TwoWay
Binding kullanarak Combobox içerisinde bir seçim değişikliği olduğunda
bunu ana kayıt listemize de yansıtabilmemiz şart.

Bu durumda bakıyoruz Combobox'ın bind edilebilecek ne özellikleri var!
Elde sadece **SelectedItem** bulunuyor! Şimdi ben bu SelectedItem'ı
nasıl TipID'ye bağlayacağım? TipID **integer** oysa SelectedItem
**Tipler** tipinde. İşte bu ikisini birbirine bağlamanın yolu bir
**ValueConverter** kullanmak!

**[VB]**

<span style="color: blue;">Imports</span> System.Windows.Data

 

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> <span
style="color: #2b91af;">TipMatchConverter</span>

    <span style="color: blue;">Implements</span> <span
style="color: #2b91af;">IValueConverter</span>

 

    <span style="color: blue;">Dim</span> TumTipler <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">TipListesi</span>

    <span style="color: blue;">Dim</span> Tipler <span
style="color: blue;">As</span> System.Collections.ObjectModel.<span
style="color: #2b91af;">ObservableCollection</span>(<span
style="color: blue;">Of</span> ServiceReference1.<span
style="color: #2b91af;">Tipler</span>)

 

    <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>()

        Tipler = TumTipler.Tipler

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Convert(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> targetType <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">Type</span>, <span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> culture <span
style="color: blue;">As</span> System.Globalization.<span
style="color: #2b91af;">CultureInfo</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>
<span style="color: blue;">Implements</span> System.Windows.Data.<span
style="color: #2b91af;">IValueConverter</span>.Convert

        <span style="color: blue;">Return</span> (<span
style="color: blue;">From</span> inc <span
style="color: blue;">In</span> Tipler <span
style="color: blue;">Where</span> inc.ID = <span
style="color: blue;">CInt</span>(value)).SingleOrDefault

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> ConvertBack(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> targetType <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">Type</span>, <span
style="color: blue;">ByVal</span> parameter <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> culture <span
style="color: blue;">As</span> System.Globalization.<span
style="color: #2b91af;">CultureInfo</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>
<span style="color: blue;">Implements</span> System.Windows.Data.<span
style="color: #2b91af;">IValueConverter</span>.ConvertBack

        <span style="color: blue;">Return</span> <span
style="color: blue;">CType</span>(value, ServiceReference1.<span
style="color: #2b91af;">Tipler</span>).ID

    <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Hazırladığımız bu **Converter** yapısını da **SelectedItem'ın**
bindinginde artık rahatlıkla kullanabiliriz.

**[XAML]**

<span class="style4_18112009">\<UserControl
xmlns:my="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>
<span class="style4_18112009">
x:Class="SilverlightApplication4.MainPage"</span>

   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

   xmlns:d="http://schemas.microsoft.com/expression/blend/2008"

  
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"

   mc:Ignorable="d"

   d:DesignHeight="300" d:DesignWidth="400"

            xmlns:daron="clr-namespace:SilverlightApplication4"\>

<span class="style4_18112009">    \<UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TipListesi</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span style="color: blue;">="TumTipler"
/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">daron</span><span
style="color: blue;">:</span><span
style="color: #a31515;">TipMatchConverter</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="TipMatchConverter" /\></span>

<span style="color: #a31515;">   </span><span class="style4_18112009">
\</UserControl.Resources</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span> <span
class="style4_18112009">\<Grid x:Name="LayoutRoot"
Background="White"\></span>

        \<my:DataGrid x:Name="myGrid" AutoGenerateColumns="False"\>

            \<my:DataGrid.Columns\>

                \<my:DataGridTextColumn Binding="{Binding Adi}"/\>

                \<my:DataGridTextColumn Binding="{Binding Adi}"/\>

                \<my:DataGridTemplateColumn\>

                    \<my:DataGridTemplateColumn.CellTemplate\>

                        \<DataTemplate\>

                            \<ComboBox DisplayMemberPath="Tip"
ItemsSource="{Binding Source={StaticResource TumTipler}, Path=Tipler}"

                                     <span style="color: red;">
SelectedItem</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
TipID</span><span style="color: blue;">,</span><span
style="color: red;"> Converter</span><span
style="color: blue;">={</span><span
style="color: #a31515;">StaticResource</span><span style="color: red;">
TipMatchConverter</span><span style="color: blue;">},</span><span
style="color: red;"> Mode</span><span
style="color: blue;">=TwoWay}"/\></span>

                        \</DataTemplate\>

                    \</my:DataGridTemplateColumn.CellTemplate\>

                \</my:DataGridTemplateColumn\>

            \</my:DataGrid.Columns\>

        \</my:DataGrid\>

    \</Grid\>

<span class="style4_18112009">\</UserControl</span><span
style="color: blue;">\></span>

Kendimizi hamallık yapmış gibi hissetmemiz normal :) Çünkü biraz öyle
oldu. Fakat yapacak birşey yok. Silverlight 3.0'da uygulayabileceğiniz
en temiz çözümlerden biri bu. Bu arada unutmadan belirtiyim aslında
Converter içerisinde servisten verinin kesinlikle gelip gelmediğini de
kontrol etmenizde fayda var. Kullanıcının bağlantı hızına göre sorunlar
yaşanabilir. Tavsiyem Tipler'i global bir yerlerde tutup oradan
kullanmanız olabilir.

**Peki Silverlight 4.0 ile ne oldu?**

Silverlight 4.0 ile gelen özellikle çok basit :) Aslında bu basit
özelliğin değerini bilelim diye yukarıdaki senaryoyu özellikle anlatmak
istedim. Silverlight 4.0 ile Combobox'lara **SelectedValue** geliyor! :D
Oley!

Böylece rahatlıkla Combobox'ın **SelectedValuePath'ini** **ID** olarak
ayarlayıp **Tipler** nesnesindeki **ID** kolonunun DataGrid'e gelen
**Insanlar** nesnesindeki **TipID** ile **SelectedValue** üzerinden bind
edilmesini sağlayabiliyoruz.

**[XAML]**

<span class="style4_18112009">\<UserControl
xmlns:my="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span>
<span class="style4_18112009">
x:Class="SilverlightApplication4.MainPage"</span>

   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"

   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"

   xmlns:d="http://schemas.microsoft.com/expression/blend/2008"

  
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"

   mc:Ignorable="d"

   d:DesignHeight="300" d:DesignWidth="400"

            xmlns:daron="clr-namespace:SilverlightApplication4"\>

    \<UserControl.Resources\>

        \<daron:TipListesi x:Name="TumTipler" /\>

    \</UserControl.Resources\>

    \<Grid x:Name="LayoutRoot" Background="White"\>

        \<my:DataGrid x:Name="myGrid" AutoGenerateColumns="False"\>

            \<my:DataGrid.Columns\>

                \<my:DataGridTextColumn Binding="{Binding Adi}"/\>

                \<my:DataGridTextColumn Binding="{Binding Soyadi}"/\>

                \<my:DataGridTemplateColumn\>

                    \<my:DataGridTemplateColumn.CellTemplate\>

<span class="style4_18112009">                       
\<DataTemplate</span><span style="color: blue;">\></span>

                            \<ComboBox DisplayMemberPath="Tip"
ItemsSource="{Binding Source={StaticResource TumTipler}, Path=Tipler}"

                                    <span style="color: red;">
SelectedValue</span><span style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
TipID</span><span style="color: blue;">,</span><span
style="color: red;"> Mode</span><span
style="color: blue;">=TwoWay}"</span><span style="color: red;">
SelectedValuePath</span><span style="color: blue;">="ID" /\></span>

                        \</DataTemplate\>

                    \</my:DataGridTemplateColumn.CellTemplate\>

                \</my:DataGridTemplateColumn\>

            \</my:DataGrid.Columns\>

        \</my:DataGrid\>

    \</Grid\>

<span class="style4_18112009">\</UserControl</span><span
style="color: blue;">\></span>

İşte gördüğünüz üzere :) bu kadar basit görülebilecek bir değişiklik
aslında ne kadar da hayat kurtarıcı olabililyor. Silverlight 4.0 release
olsa da hemen şu dertlerden kurtulsak :)

Hepinize kolay gelsin.


