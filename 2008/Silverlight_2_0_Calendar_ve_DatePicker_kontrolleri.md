---
FallbackID: 2053
Title: Silverlight 2.0 Calendar ve DatePicker kontrolleri.
PublishDate: 11/5/2008
EntryID: Silverlight_2_0_Calendar_ve_DatePicker_kontrolleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 6baea5ad-5be9-48e9-bf60-3077c691c3cc
---
Silverlight 2.0 ile beni en çok şaşırtan özelliklerden biri de WPF'in
web sürümü diyebileceğimiz ve WPF'e kıyasla bir çok eksiği olan bir
torun olarak Silverlight ile beraber artık WPF'de bulunmayan bazı
kontrollerin geliyor olması. Tahminen uzun vadede her iki taraf da
birbirinden besleniyor olacaktır. Bugün baktığımızda ilk dikkati çeken
kontrollerden biri de maalesef WPF tarafında olmayan **Calendar** ve
**DateTimePicker** kontrolleri. Bu yazımızda bu iki kontrolü ve bu
kontrollerle neler yapabileceğimizi inceleyeceğiz.

![Calendar kontrolü şekilden şekilde
girebiliyor.](http://cdn.daron.yondem.com/assets/2053/10052008_1.png)\
*Calendar kontrolü şekilden şekilde girebiliyor.*

Yukarıdaki şekli ile birer Calender kontrolü yaratmak için tek yapmanız
gereken XAML kodunuzu aşağıdaki şekilde düzenlemek.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Calendar.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Calendar</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">21,20,145,57</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Tek yaptığımız bir Calendar tagı açarak kenarlardan olan uzaklığını
belirtmek. "Çocuk oyuncağı" denen bu olsa gerek. Peki daha neler
yapabiliriz? Aslında bu aşamadan sonra bahsedeceğimiz tüm özellikler
Calendar ve DatePicker kontrolleri için birebir aynı. O nedenle gelin
öncesinde bir de DatePicker kontrolünün XAML koduna bakalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">DatePicker</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">20</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">42,0,156,23</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">/\></span>

DatePicker kontrolünü de sahneye yerleştirmek en az Calendar kontrolü
kadar basit. Bu durumda hızlıca programatik işlevselliklere göz
atabiliriz. Aşağıdaki gibi bir Silverlight uygulaması hazırlayarak
kodlamaya başlayalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Calendar.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Calendar</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">21,20,145,57</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Takvim**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">DatePicker</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">20</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">42,0,156,23</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Bottom</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**TarihSecici**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Uygulamamızda **Takvim** adında bir **Calendar** kontrolü ve
**TarihSecici** adında bir **DateTimePicker** bulunuyor. Bu kontroller
Silverlight uygulaması ile beraber ilk gösterildiklerinde içlerinde
herhangi bir tarih seçili gelmiyor. Oysa aşağıdaki şekilde güncel tarihi
seçili hale getirebilirsiniz.

        Takvim.SelectedDate = <span style="color: blue;">Date</span>.Now

        TarihSecici.SelectedDate = <span
style="color: blue;">Date</span>.Now

Makalemizin en üstündeki görsele baktığınızda Calendar kontrolünün iki
farklı görsel durumunun bulunduğunu görebilirsiniz. Normal şartlarda
Calendar kontrolü günleri gösterecek şekilde açılıyor, sonrasında eğer
üstteki ay ismine tıklarsanız ayların seçilebileceği arayüz geliyor.
Oysa isterseniz Calendar kontrolü sayfada ilk açıldığında da ayların
seçilebileceği arayüzün otomatik gelmesini sağlayabilirsiniz.

        Takvim.DisplayMode = CalendarMode.Year

Eğer Calender nesnesinin **DisplayMode** özelliği **Month** olursa tam
bir ayı gösteriyor, **Year** şeklinde düzenlendiğinde ise tüm yılı yani
ayları gösteriyor. Bunun haricinde isterseniz her iki kontrolün de hangi
tarih aralıklarını gösterebileceğini ek olarak düzenleyebilirsiniz.

        TarihSecici.SelectableDateStart = <span
style="color: blue;">Date</span>.Today.Subtract(<span
style="color: blue;">New</span> TimeSpan(5, 0, 0, 0))

        TarihSecici.SelectableDateEnd = <span
style="color: blue;">Date</span>.Today.AddDays(5)

Yukarıdaki kod içerisinde DatePicker kontrolümüzün
**SelectableDateStart** ve **SelectableDateEnd** özelliklerine
**DatePicker** içerisinde seçilebilecek başlangıç ve bitiş tarihlerini
aktarıyoruz. Bunu yaparken söz konusu tarihlerin hesaplamalarını da tabi
ki dinamik olarak yapabilirsiniz. Böylece bu örneğimizde kontrol sürekli
olarak mevcut tarihden 5 gün öncesinin ve 5 gün sonrasının
seçilebilmesine olanak tanıyacaktır.

        TarihSecici.DisplayDateStart = <span
style="color: blue;">Date</span>.Today.Subtract(<span
style="color: blue;">New</span> TimeSpan(5, 0, 0, 0))

        TarihSecici.DisplayDateEnd = <span
style="color: blue;">Date</span>.Today.AddDays(5)

Seçili tarihleri belirlemenin yanı sıra isterseniz belirli tarihleri
seçilemez yapmanın yanı sıra tamamen o tarihlerin gösterilmemesini de
sağlayabilirsiniz. Bunun için **DisplayDateStart** ve **DisplayDateEnd**
özelliklerinden faydalanabilirsiniz.

![SelectableDateve DisplayDate arasında
fark.](http://cdn.daron.yondem.com/assets/2053/10052008_2.png)\
*SelectableDateve DisplayDate arasında fark.*

Hepinize kolay gelsin.


