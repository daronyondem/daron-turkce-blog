# ASP.NET içerisinde Web.Config Inheritance'ı engellemek.
Herhangi bir web sitesine bir ASP.NET uygulaması yerleştirdiğinizde
otomatik olarak uygulama ile beraber Web.Config dosyasını da sunucuya
yerleştirmiş olursunuz. Bazı durumlarda (benim blogda olduğu üzere)
birden çok ASP.NET uygulamasını tek bir alan adı altında çalıştırmanız
gerekebilir. Bu uygulamaları iç içe klasörlerle ayırmak vs pek işe
yaramaz çünkü kök klasörde bulunan Web.Config içerisinde tüm ayarlar alt
klasörleri de otomatik olarak etkiler. Yani bir "inheritance" durumu söz
konusudur.

Kök dizindeki Web.Config içerisindeki tüm ayarları tek tek iç
dizinlerdeki Web.Config'ler içerisinde "remove" etmek mümkün fakat çok
zahmetli bir iş. Diğer yandan bazı durumlarda farklı ASP.NET sürümlerini
de aynı site içerisinde kullanmak isteyebilirsiniz, örneğin benim blog
ASP.NET 2.0 kullanırken aktivite kayıt uygulamam ASP.NET 3.5 ile
hazırlandı.

**İşin kolayı!**

Herhangi bir **Web.Config** dosyası içerisindeki ayarları "inheritance"
ile alt klasörlerini geçmesini istemiyorsanız aslında yapacağınız çok
ufak bir ayar var.

<span style="color: blue;">\<</span><span
style="color: #a31515;">location</span><span style="color: blue;">
</span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span style="color: blue;">.</span>"<span
style="color: blue;"> </span><span
style="color: red;">inheritInChildApplications</span><span
style="color: blue;">=</span>"<span
style="color: blue;">false</span>"<span style="color: blue;">\> </span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

<span style="color: blue;">\<!--</span><span style="color: green;">Tüm
ayarlar burada</span><span style="color: blue;">--\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">system.web</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">location</span><span
style="color: blue;">\></span>

**Web.Config** dosyanız içerisinde tüm ayarların bulunduğu
**System.Web** taglarını ayrıca bir **location** tagı içerisine alarak
söz konusu **location** tagının da **inheritInChildApplications**
özelliğini **False** olarak ayarlarsanız artık kök dizindeki ayarlarınız
diğer dizinler tarafından kullanılmayacaktır. Böylece rahatlıkla yeni
uygulamalarınızı aynı alan adına yükleyebilirsiniz.

Hepinize kolay gelsin...



*Bu yazi http://daron.yondem.com adresinde, 2008-5-23 tarihinde yayinlanmistir.*
