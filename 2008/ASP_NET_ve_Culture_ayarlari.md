---
FallbackID: 2072
Title: ASP.NET ve Culture ayarları
PublishDate: 31/5/2008
EntryID: ASP_NET_ve_Culture_ayarlari
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, ASP.NET
old.EntryID: 54009553-010c-4955-a841-f9416cd73734
---
ASP.NET uygulamalarında **Date.Now()** gibi çoğu sınıf o anki
**CurrentCulture** üzerinden gerekli bilgileri alarak çalışır. Yani
uygulamanın çalıştığı makinen Regional Settings'i Türkiye'ye göre
ayarlanmış ise tarih bilgisi ona göre gelecektir. Bu durum genelde
sıkıntı yaratmasa da özellikle yurt dışından hosting (barındırma)
hizmeti aldığınızda sıkıntılar baş göstermeye başlar. Eğer uygulamanız
farklı ülkelere ve dillere hizmet edecek şekilde bir altyapıya sahip
değilse veya buna gerek yoksa aslında uygulamanın her şart altında
belirli bir CurrentCulture ile çalışmasını isteyebilirsiniz.

Varsayalım satın aldığınız hosting firması yurt dışında olduğu için
sunucularını yüklerken "Regional Settings"de sunucu ayarı olarak
İngilizceyi seçtiler. Bu durumda Date.Now() dahil kullandığınız çoğu
sınıf geriye farklı formatlarda değerler döndürecektir. Örneğin bizde
sıfırdan küçük sayılar virgül ile ayrılırken İngilizce ayarlanmış bir
sunucuda nokta ile ayrılacaktır. Bu gibi sıkıntıları toptan çözmek için
**Web.Config** içerisinde yapabileceğiniz bir ayar var.

<span style="color: blue;">\<</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">globalization</span><span style="color: blue;">
</span><span style="color: red;">culture</span><span
style="color: blue;">=</span>"<span
style="color: blue;">tr-TR</span>"<span style="color: blue;">
</span><span style="color: red;">uiCulture</span><span
style="color: blue;">=</span>"<span
style="color: blue;">tr-TR</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

Yukarıdaki şekilde Web.Config içerisindeki System.Web tagları arasına
uygun satırı yerleştirmeniz yeterli. Artık tüm uygulama herşeyden
bağımsız olarak Türkiye'ye ve Türkçe'ye göre çalışacaktır.

<span style="background: #ffee62;">\<%</span><span
style="color: blue;">@</span> <span style="color: #a31515;">Page</span>
<span style="color: red;">UICulture</span><span
style="color: blue;">="tr-TR"</span> <span
style="color: red;">Culture</span><span
style="color: blue;">="tr-TR"</span> <span
style="background: #ffee62;">%\></span>

Ayrıca isterseniz bu ayarı her aspx (web form) için ayrı ayrı da
yapabilirsiniz. Yukarıdaki şekilde herhangi bir web forumun mark-up
kısmına **Page** için **UICulture** ve **Culture** ayarlarını
tanımlayabilirsiniz.

Hepinize kolay gelsin...


