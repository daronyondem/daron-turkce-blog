---
FallbackID: 2194
Title: Vista UAC ve Winforms uygulamaları ilişkisinde yazılımcının yeri :)
PublishDate: 9/23/2008
EntryID: Vista_UAC_ve_Winforms_uygulamalari_iliskisinde_yazilimcinin_yeri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Vista, Visual Studio 2008
old.EntryID: 357c7100-3f44-48f9-a83b-da73c22c343a
---
Windows Vista ile beraber karşımıza çıkan UAC (User Account Control)
aslında Winforms programcılığında çok şey değiştirdi. Özetle artık
istediğimiz gibi herhangi bir klasöre dosya yazamıyoruz veya Registry
içerisinde istediğimiz değişiklikleri yapamıyoruz. Ya uygulamamıza
verilen haklar çerçevesinde hareket etmek zorundayız ya da kullanıcıdan
ek haklar istemeliyiz.

Bu yazıda hızlı bir şekilde Vista ile gelen UAC'nin yazılım geliştirme
esnasındaki kullanımına değinerek farklı çözümler geliştireceğiz.

**Dosyaları diskte nereye yazmalı?**

Programınızın ürettiği bir dosya var ve onu istediğiniz yere
yazamadığınızın farkında vardınız. Eğer dosyanın yazılacağı yeri
kullanıcıdan bir SaveFileDialog ile alıyorsanız zaten bu prosesi Vista
kendisi halledecek ve kullanıcıyı Admin hakkı gerektiğine dair
uyaracaktır fakat eğer dosyayı siz programatik olarak doğrudan yazmak
istiyorsanız maalesef hakkınız olan bir yer bulmanız gerek.

Environment.GetFolderPath(Environment.SpecialFolder.**LocalApplicationData**)

Yukarıdaki kod ile kolaylıkla yazma hakkınız olan bir alana
ulaşabilirsiniz. Tabi bunun haricinden kullanıcının Desktop veya
MyDocuments gibi alanlara da doğrudan Admin hakkı gerekmeksizin ulaşması
hakkı vardır. Tüm bu klasörlere de rahatlıkla ulaşabilirsiniz fakat
genelde bu noktalara yazılımlarla ilgili özel dosyaların saklanması
doğru olmaz.

Environment.GetFolderPath(Environment.SpecialFolder.**Desktop**)

Environment.GetFolderPath(Environment.SpecialFolder.**MyDocuments**)

**Admin haklarını nasıl alırız?**

Eğer hazırladığınız uygulamanın kesinlikle Admin haklarına ihtiyacı
varsa uygulamayı UAC'yi çağıracak şekilde düzenlemelisiniz. Böylece
program ilk açıldığında kullanıcıdan Admin hakları isteyecektir, aksi
halde program açılmayacaktır. Tüm bu ayarları projelerinizdeki
**app.manifest** dosyası içerisinde yapabilirsiniz. Bu dosyaya kolay
şekilde ulaşmak için Visual Studio içerisindeki Solution Explorer
içerisinde projeye sağ tıklayarak kelen menüden "Properties"i seçip
"Application" tabında "**View UAC Settings**" demeniz yeterli olacaktır.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">asmv1:assembly</span><span style="color: blue;">
</span><span style="color: red;">manifestVersion</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">urn:schemas-microsoft-com:asm.v1</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:asmv1</span><span
style="color: blue;">=</span>"<span
style="color: blue;">urn:schemas-microsoft-com:asm.v1</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:asmv2</span><span
style="color: blue;">=</span>"<span
style="color: blue;">urn:schemas-microsoft-com:asm.v2</span>"<span
style="color: blue;"> </span><span
style="color: red;">xmlns:xsi</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://www.w3.org/2001/XMLSchema-instance</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">assemblyIdentity</span><span
style="color: blue;"> </span><span
style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0.0.0</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">MyApplication.app</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">trustInfo</span><span style="color: blue;">
</span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">urn:schemas-microsoft-com:asm.v2</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">security</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">requestedPrivileges</span><span
style="color: blue;"> </span><span style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">urn:schemas-microsoft-com:asm.v3</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">requestedExecutionLevel</span><span
style="color: blue;"> </span><span style="color: red;">level</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**requireAdministrator**</span>"<span
style="color: blue;"> </span><span
style="color: red;">uiAccess</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">requestedPrivileges</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">security</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">trustInfo</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asmv1:assembly</span><span
style="color: blue;">\></span>

Bu dosya içerisinde normalde **asInvoker** yazan yere yukarıdaki gibi
**requireAdministrator** yazarsanız bir sonraki  Build ile oluşturulan
uygulama artık UAC'den admin hakları isteyerek çalışacaktır. Bu da
uygulamanıza her yere ulaşım hakkı verildiği anlamına gelir.

Hepinize kolay gelsin.


