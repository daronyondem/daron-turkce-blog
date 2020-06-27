---
FallbackID: 2270
Title: "WPF uygulamalarında özel dosyaları Resource olarak saklamak ve kullanmak"
date: "2008-12-9"
EntryID: WPF_uygulamalarinda_ozel_dosyalari_Resource_olarak_saklamak_ve_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: WPF
old.EntryID: 43a5de7c-99d4-4299-8850-e6173bca8981
---
# WPF uygulamalarında özel dosyaları Resource olarak saklamak ve kullanmak
Uygulamalarda kullandığımız ikonlar veya görselleri çoğu zaman uygulama
klasöründe saklamayı sevmeyiz. Hem bu görselleri kısmen korumak için hem
de kalabalık yaratmamaları için EXE'nin içerisinde gömmeyi tercih
ederiz. WPF ile beraber bu iş biraz daha kolaylaşıyor. Gelin bir WPF
uygulamasında herhangi bir görseli nasıl dahili hale getirebileceğimizi
inceleyelim.

Visual Studio ile yarattığımız yeni WPF projemize Solution Explorer
içerisinde sağ tuş ile tıklayarak gelen menüden "Add Existing Item"
diyip yeni bir JPEG dosyası ekliyoruz. Amacımız bu dosyayı EXE'nin
içinde saklayarak uygulamanın ana penceresinde de göstermek.

Dosyayı projenize ekledikten sonra onu seçerek hemen "Propterties"
paneline göz atmanız gerekiyor. Böylece bu resim dosyası ile ilgili
projedeki ayarları değiştirebileceğiz. Dosya ile ilgili "**Build
Action**" ayarının kesinlikle "**Resource**" olması gerekiyor. Tüm bu
ayarları tamamladıktan sonra XAML tarafında bir Image nesnesi ekleyelim.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">Window</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="Window1"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

  <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

  <span style="color: red;"> Title</span><span
style="color: blue;">="Window1"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="300"\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="Foto"</span><span style="color: red;">
HorizontalAlignment</span><span
style="color: blue;">="Stretch"</span><span style="color: red;">
VerticalAlignment</span><span
style="color: blue;">="Stretch"\>\</</span><span
style="color: #a31515;">Image</span><span style="color: blue;">\></span>

<span style="color: #a31515;">  </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Window</span><span
style="color: blue;">\></span>

Basit bir şekilde eklediğimiz ve adı **Foto** olan bu **Image**
nesnesine çalışma zamanında biraz önce EXE'mize eklediğimiz fotoğrafı
aktarmamız gerekiyor. Bunun için **Window.Loaded** event'ını
kullanacağız.

**[VB]**

Foto.Source = <span style="color: blue;">New</span> BitmapImage(<span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"pack://application:,,,/resim.jpg"</span>))

Gördüğünüz üzere işlem epey basit. Aslında anahtar kısım **Uri**
tarafında. Eğer uygulama içerisindeki Resource'lara ulaşmak istiyorsanız
pack Uri'leri kullanmanız gerekiyor. pack Uri'lerinin syntax yapısına
girmeyeceğim, epey uzun ve detaylı bir konu. Bizim için şimdilik önemli
olan bu Uri'nin sonundaki dosya ismini değiştirerek istediğimiz kaynağa
erişebiliyor olmamız. Eğer uygulama içi klasörler yaratarak dosyaları
ayrı klasörlere koyduysanız doğrudan resim.jpg'in önünde path bilgisi de
yazabilirsiniz.

Bu sistemi ister resim, ister ses, ister fare imleci saklamak için
kullanabilirsiniz. Artık bu gibi ufak kaynaklar otomatik olarak
EXE'nizin içerisinde taşınıyor olacak.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-12-9 tarihinde yayinlanmistir.*
