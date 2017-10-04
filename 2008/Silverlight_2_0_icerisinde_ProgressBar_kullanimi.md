---
FallbackID: 2207
Title: Silverlight 2.0 içerisinde ProgressBar kullanımı.
PublishDate: 6/10/2008
EntryID: Silverlight_2_0_icerisinde_ProgressBar_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 4b0c6f27-26d8-4e3f-bf12-af03d43afb45
---
.NET Framework'ün ufak bir paketini içerse de Silverlight ile web
tarayıcısı içerisinde büyük mucizeler yaratmak mümkün. .NET'in
JavaScript gibi scripting dillerine kıyasla işlemci kullanımındaki
hakimiyetini de düşündüğümüzde istemci tarafında yapacağımız işlemlerin
yoğunluğun artacağı kesin. Tüm bu işlemler süresince tabi ki
kullanıcıları da bilgilendirmemiz gerekiyor. AJAX ile az çok web
tarafında da alıştığımız "Loading" GIF'lerinin yerine Silverlight
tarafında RC0 ile beraber artık **ProgressBar** kontrolümüz var.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication7.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    **\<**</span><span
style="color: #a31515;">**ProgressBar**</span><span
style="color: blue;"> **** </span><span
style="color: red;">**Height**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**28**</span>**"**

<span style="color: blue;">**               ** </span><span
style="color: red;">**VerticalAlignment**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Top**</span>**"**

<span style="color: blue;">**               ** </span><span
style="color: red;">**Margin**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**40,58,29,0**</span>"<span
style="color: blue;">**/\>**</span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Standart bir ProgressBar'ı yukarıdaki XAML kodu ile uygulamanıza
ekleyebilirsiniz. Aslında Silverlight içerisinde ProgressBar'ın
Winforms'daki muadilinden ilk bakışta pek bir farkı yok. ProgressBar'ın
**Value** özelliği o anki değeri, **Maximum** özelliği ise alabileceği
en yüksek değeri tanımlıyor.

Gelin ufak bir örnek yapmak için bir **DispatcherTimer** kullanalım.
Timer'ımızın iki saniyede bir ProgressBar'ı biraz ilerletsin. Böylece
işlem yapılıyormuş gibi ProgressBar'ı izleyebilelim.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Page

    <span style="color: blue;">Inherits</span> UserControl

 

    <span style="color: blue;">WithEvents</span> Timer <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Threading.DispatcherTimer

 

    <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> <span style="color: blue;">New</span>()

        InitializeComponent()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Page\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        **Progress.Maximum = 20**

        Timer.Interval = <span style="color: blue;">New</span>
TimeSpan(0, 0, 2)

        Timer.Start()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Timer\_Tick(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Timer.Tick

        **Progress.Value += 1**

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Yukarıdaki kod ile Progress adındaki ProgressBar'ımızı oynattığımızda
aşağıdaki görüntü ile karşılaşıyoruz.

![ProgressBar iş
başında.](media/Silverlight_2_0_icerisinde_ProgressBar_kullanimi/05102008_1.png)\
*ProgressBar iş başında.*

Eğer gerçekten yapılacak işlemin ne kadar süreceği bilmiyorsanız ve bir
şekilde bu bilgiyi kullanıcıya gösterme şansınız yoksa bu sefer de
işlemin sürdüğüne dair bir gösterge olarak ProgressBar'ı kullanmak için
**IsIndeterminate** özelliğini **True** olarak ayarlayabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">ProgressBar</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">28</span>"

<span style="color: blue;">            </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Top</span>"

<span style="color: blue;">            </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">40,58,29,0</span>"

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Progress</span>"

<span style="color: blue;">            **** </span><span
style="color: red;">**IsIndeterminate**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**True**</span>"<span
style="color: blue;">/\></span>

Böyle bir durumda ProgressBar içerisinde sürekli olarak aynı animasyon
çalıştırılacaktır.

![ProgressBar sonsuz
döngüde!](media/Silverlight_2_0_icerisinde_ProgressBar_kullanimi/05102008_2.png)\
*ProgressBar sonsuz döngüde!*

ProgressBar'ın görselliğini değiştirmek için **Foreground** ve
**Background** özelliklerinden faydalanabilirsiniz. **Foreground**
özelliği **ProgressBar** içerisinde dolu kısımları etkilerken
**Background** ise ProgressBar'ın boş olan kısımlarını etkileyecektir.

<span style="color: blue;">\<</span><span
style="color: #a31515;">**ProgressBar**</span><span
style="color: blue;"> </span>

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Progress</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">ProgressBar.**Background**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**ImageBrush**</span><span style="color: blue;">
</span>

<span style="color: blue;">                </span><span
style="color: red;">ImageSource</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Garden.jpg</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">ProgressBar.**Background**</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">ProgressBar</span><span
style="color: blue;">\></span>

Örneğin yukarıdaki kod ile aşağıdaki şekilde bir ProgressBar'ın fonuna
bir fotoğraf yerleştirebilirsiniz. Hatta **Background** için bir
**ImageBrush** yerine **VideoBrush** kullanarak farklı uygulamalar da
oluşturulabilir. Burada özellikle **Indeterminate** ile ilgili dikkat
etmek gerek. **Indeterminate** aktif hale geldiğinde Silverlight
içerisinde ProgressBar'ın ForeGround'u ile tüm kontrol kaplanıyor ve
üzerinden beyaz dikey Gradient'lar animasyon ile geçiriliyor. Bu sistem
ancak ProgressBar'ın ControlTemplate'i özelleştirilebilirse
değiştirilebiliyor aksi halde tüm standart ProgressBar kontrolleri bu
şekilde çalışıyor.

Hepinize kolay gelsin.


