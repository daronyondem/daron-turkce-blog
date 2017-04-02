---
FallbackID: 1901
Title: ASP.NET 3.5 ve IIS ayarları üzerine...
PublishDate: 12/29/2007
EntryID: ASP_NET_3_5_ve_IIS_ayarlari_uzerine
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 3.5, IIS 6.0, ASP.NET
old.EntryID: 61e4a87c-c5ad-476e-8168-6684d2f414b2
---
.NET Framework 3.5 ile beraber ASP.NET 3.5'i de kullanmaya başladığımız
bugünlerde artık projelerimizi yavaş yavaş sunuculara aktarmaya doğru da
yaklaşıyoruz. Peki sunucuda neler yapmamız gerekiyor? Aslında durum daha
önceki .NET Framework sürümlerinden pek farklı değil. .NET Framework
3.5'i direk sunucunuza kurmanız gerekiyor fakat öncesinde kesinlikle
.NET Framework 2.0'ın kurulmuş olması şart. Malum 3.5 sürümü 2.0 üzerine
gelen eklentilerden oluşuyor ve hala 2.0 sürümündeki sınıflar 3.5
içerisinde de kullanılıyor.

Kurulumu tamamladıktan sonra akla gelecek ikinci bir soru ise IIS
içerisinde nasıl bir ayar yapmamız gerektiği. Hatırlarsanız .NET
Framework 2.0 ile beraber IIS içerisinde artık her bir web sitesi için
1.0 ve 2.0 arasında bir seçim yapabildiğimiz ayarlar gelmişti. Bu
ayarlara baktığınızda 3.5 seçeneğini göremezseniz şaşırmayın çünkü
ASP.NET 3.5 siteleri IIS'de 2.0 siteleri gibi çalışıyor. Yani söz konusu
siteyi IIS içerisinde .NET Framework 2.0 ile çalışacak şekilde
ayarladıysanız hiçbir sorunla karşılaşmazsınız.

O zaman ne farkı kaldı? Fark aslında projenizin Web.Config dosyası
içerisinde yer alıyor.

<span style="color: blue;">    \<</span><span
style="color: #a31515;">system.codedom</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">compilers</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">compiler</span><span style="color: blue;">
</span><span style="color: red;">language</span><span
style="color: blue;">=</span>"<span
style="color: blue;">c\#;cs;csharp</span>"<span style="color: blue;">
</span><span style="color: red;">extension</span><span
style="color: blue;">=</span>"<span
style="color: blue;">.cs</span>"<span style="color: blue;"> </span><span
style="color: red;">warningLevel</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"

<span style="color: blue;">                  </span><span
style="color: red;">type</span><span style="color: blue;">=</span>"<span
style="color: blue;">Microsoft.CSharp.CSharpCodeProvider, System,
Version=2.0.0.0, Culture=neutral,
PublicKeyToken=b77a5c561934e089</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">providerOption</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CompilerVersion</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">v3.5</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">providerOption</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WarnAsError</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">compiler</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">compiler</span><span style="color: blue;">
</span><span style="color: red;">language</span><span
style="color: blue;">=</span>"<span
style="color: blue;">vb;vbs;visualbasic;vbscript</span>"<span
style="color: blue;"> </span><span
style="color: red;">extension</span><span
style="color: blue;">=</span>"<span
style="color: blue;">.vb</span>"<span style="color: blue;"> </span><span
style="color: red;">warningLevel</span><span
style="color: blue;">=</span>"<span style="color: blue;">4</span>"

<span style="color: blue;">                  </span><span
style="color: red;">type</span><span style="color: blue;">=</span>"<span
style="color: blue;">Microsoft.VisualBasic.VBCodeProvider, System,
Version=2.0.0.0, Culture=neutral,
PublicKeyToken=b77a5c561934e089</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">providerOption</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CompilerVersion</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">v3.5</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">providerOption</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">OptionInfer</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">providerOption</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WarnAsError</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">compiler</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">compilers</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">system.codedom</span><span
style="color: blue;">\></span>

İşte Web.Config içerisinde yer alan yukarıdaki bölüm projenizin ASP.NET
3.5 projesi olduğunu ve .NET Framework 3.5 özelliklerini
kullanabileceğini belirtiyor. Böylece gerekli referanslar ile artık web
siteniz LINQ ve entegre AJAX gibi özelliklerden faydalanabilecek. Visual
Studio 2008 ile yarattığınız ASP.NET 3.5 sitelerinde Web.Config
dosyalarına bu kod otomatik olarak ekleniyor.

Hepinize kolay gelsin.


