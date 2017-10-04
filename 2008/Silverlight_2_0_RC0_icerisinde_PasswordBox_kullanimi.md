---
FallbackID: 2203
Title: Silverlight 2.0 RC0 içerisinde PasswordBox kullanımı.
PublishDate: 2/10/2008
EntryID: Silverlight_2_0_RC0_icerisinde_PasswordBox_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 77b82265-0d4f-4bcf-8ce4-aa4c3e89d728
---
Silverlight 2.0 RC0 öncesinde Silverlight içerisinde özellikle kullanıcı
girişlerinde şifrelerin yazılacağı bir TextBox oluşturmak epey zahmetli
bir işti. Bunun için normal bir TextBox'ı sahneye yerleştiriyor sonra da
bu TextBox'a tüm karakterleri \* olan bir font bağlıyorduk. RC0 ile
beraber artık bu işleme özgü bir **PasswordBox** kontrolümüz var. Bu
yazımızda PasswordBox'ın kullanımına hızlıca değineceğiz.

![Expression Blend 2 içerisinde PasswordBox
kontrolü.](http://cdn.daron.yondem.com/assets/2203/01102008_1.png)\
*Expression Blend 2 içerisinde PasswordBox kontrolü.*

Yeni bir Silverlight projesi yarattıktan sonra Expression Blend 2
içerisinde Asset Library bölümünde PasswordBox'ı bulabilirsiniz. Tasarım
arayüzünden yukarıdaki şekilde bir PasswordBox alarak sahneye
yerleştirdiğinizde XAML dosyasında aşağıdaki gibi bir kod ile
karşılaşacaksınız.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication4.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"<span
style="color: blue;"> </span>

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">**PasswordBox**</span><span
style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">25</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">28,38,136,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Kodumuzda **PasswordBox** bir **Grid** içerisinde bulunduğu için
**Margin'i** ayarlanmış durumda. Bu şekilde hazırlanan basit bir
uygulamayı çalıştırdığınızda **PasswordBox** içerisine girdiğiniz her
karakter bir nokta ile gösterilecektir.

![PasswordBox'ın varsayılan
görünümü.](http://cdn.daron.yondem.com/assets/2203/01102008_2.png)\
*PasswordBox'ın varsayılan görünümü.*

PasswordBox'ın noktalarla doldurduğu karakterlerin yerine farklı bir
karakter seçmek için PasswordBox'ın **PasswordChar** özelliğinden
faydalanabilirsiniz. Bu özelliğe aktardığınız karakter PasswordBox
içerisine yazılan her karakterin gösteriminde kullanılacaktır.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication4.Page</span>"

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

<span style="color: blue;">    \<</span><span
style="color: #a31515;">PasswordBox</span><span style="color: blue;">
</span><span style="color: red;"> **PasswordChar**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**\***</span>"

<span style="color: blue;">                </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">25</span>"

<span style="color: blue;">                </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">28,38,136,0</span>"

<span style="color: blue;">                </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Programatik olarak da yukarıda bahsettiğimiz tüm özelliklere VB veya C\#
kodunuz ile ulaşabilirsiniz.

Hepinize kolay gelsin.


