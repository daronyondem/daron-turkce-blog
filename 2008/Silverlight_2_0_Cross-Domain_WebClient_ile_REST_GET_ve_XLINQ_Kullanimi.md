---
FallbackID: 2036
Title: Silverlight 2.0 Cross-Domain WebClient ile REST (GET) ve XLINQ Kullanımı
PublishDate: 25/4/2008
EntryID: Silverlight_2_0_Cross-Domain_WebClient_ile_REST_GET_ve_XLINQ_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 4bfde604-04ab-427c-81cb-fc775b72f912
---
Silverlight 2.0 ile beraber istemci tarafında .NET dillerini
kullanabildiğimizi ilk duyduğumda aklıma gelen ilk şey **WebClient**
sınıfını artık istemci tarafında da kullanıp kullanamayacağım olmuştu.
Kesinlikle kullanabiliyoruz, hatta bununla kalmayıp istersek daha
detaylı bir kullanım için **HttpWebRequest'i** de tercih edebiliriz. Tüm
bu sınıflar bize REST kullanımında yardımcı oluyorlar. Normal şartlarda
uygulamalar arasında veri transferi için WSDL tanımlarına sahip
servislerin kullanımı tavsiye edilse de hala maalesef herhangi bir kural
tanımı olmayan veri kaynaklarını da kullanmak durumunda kalabiliyoruz.
İşte tam bu noktada WebClient basit işlemler için imdatımıza yetişiyor.
Eğer farklı HTTP Verb'lerini (GET, PUT, POST, DELETE) kullanacaksanız
daha detaylı işlemler için **HttpWebRequest'i** tercih etmeniz
gerekecektir. **WebClient** işin sadece **GET** kısmında yer alıyor.

Örneğimizdeki Silverlight 2.0 Beta 1 uygulamasında
**System.Net.WebClient** sınıfını kullanarak sunucudaki bir xml
dosyasını okuyacağız. İlk olarak okuduğumuz veriyi göstermek üzere
uygulamamıza bir TextBlock ve veriyi çekme işlemini başlatmak üzere bir
de Button ekleyerek aşağıdaki XAML kodunu yaratalım.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication7.Page</span>"

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
style="color: #a31515;">**TextBlock**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">47</span>"<span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">57,45,151,0</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Text</span><span style="color: blue;">=</span>"<span
style="color: blue;">TextBlock</span>"<span style="color: blue;">
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Wrap</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Metin**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**Button**</span><span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">94,136,151,121</span>"<span style="color: blue;">
</span><span style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Stretch</span>"<span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;"> **x:Name**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**Dugme**</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Sayfamız hazır olduğuna göre artık WebClient nesnemizi yaratacak olun
kodu düğmemizin arkasına yazabiliriz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> Dugme.Click

        <span style="color: blue;">Dim</span> Istek <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
**System.Net.WebClient**

        <span style="color: blue;">AddHandler</span>
Istek.**DownloadStringCompleted**, <span
style="color: blue;">AddressOf</span> istek\_DownloadStringCompleted

        Istek.**DownloadStringAsync**(<span
style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"http://www.alanadi.com/veri.xml"</span>))

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kodumuz içerisinde ilk olarak **WebClient** nesnemizi
yaratıyoruz. Bir sonraki adımda elimizdeki WebClient nesnesinin
**DownloadStringCompleted** durumunu harici bir event-handler'a
bağlıyoruz. Bunu yapmamızın nedeni WebClient sınıfının kendisine verilen
bir adresten alacağı veriyi tamamen asenkron olacak alıyor olması. Yani
sunucudan veri tam olarak geldiğinde bizi haberdar edecek olan
event-handları tanımlamamız gerekiyor. Son adımda ise
**DownloadStringAsync** komutuna hedef adresi de bir **Uri** değişkeni
olarak aktararak veri talebimizi sunucuya göndermiş oluyoruz. Sıra geldi
veri geldiğinde çalıştırılacak olan event-handler kodunu yazarak veriyi
TextBlock içerisine yazdırmaya. Fakat onun öncesinde ilk olarak hedef
aldığımız XML dosyasının yapısına bir göz atalım.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;"> ?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">Root</span><span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Kayitlar</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Adi</span><span
style="color: blue;">\></span>Ahmet<span
style="color: blue;">\</</span><span
style="color: #a31515;">Adi</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Adi</span><span
style="color: blue;">\></span>Daron<span
style="color: blue;">\</</span><span
style="color: #a31515;">Adi</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Adi</span><span
style="color: blue;">\></span>Mehmet<span
style="color: blue;">\</</span><span
style="color: #a31515;">Adi</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Kayit</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Kayitlar</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">Root</span><span style="color: blue;">\></span>

Örnek XML dosyamızı sunucudan istemciya aldıktan sonra biz sadece adının
içerisinde "Dar" geçen ilk kaydı bularak onun Adi'ni göstermek
istiyoruz. Bu XML dosyası çok daha farklı olabilirdi, içerisinde ID ve
Adi bilgileri olan bir ürün listesi olabilir ve istemci tarafına
aldıktan sonra farklı şekillerde filtrelemek isteyebilirdiniz. Tüm
bunları rahatlıkla yapabilmek için Silverlight 2.0 Beta 1 ile istemci
tarafında **XLINQ** kullanacağız. Silverlight 2.0 içerisinde XLINQ
kullanabilmek için Silverlight projenizde "Solution Explorer" içerisinde
sağ tıklayarak gelen menüden "Add Reference" komutu vermeniz ve
"System.Xml.Linq" sınıfını eklemeniz gerekiyor. Sonrasında artık
normalde olduğu gibi **XDocument** ve tüm **XLINQ** özelliklerinden
faydalanabiliriz.

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> **istek\_DownloadStringCompleted**(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Net.DownloadStringCompletedEventArgs)

        <span style="color: blue;">Dim</span> YeniDoc <span
style="color: blue;">As</span> Xml.Linq.XDocument =
**Xml.Linq.XDocument.Parse**(e.**Result**)

        Metin.Text = (<span style="color: blue;">From</span> Gelenler
<span style="color: blue;">In</span> YeniDoc.<span
style="color: #6464b9;">\<</span>Root<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Kayitlar<span
style="color: #6464b9;">\></span>.<span
style="color: #6464b9;">\<</span>Kayit<span
style="color: #6464b9;">\></span> \_

                      <span style="color: blue;">Where</span>
Gelenler.<span style="color: #6464b9;">\<</span>Adi<span
style="color: #6464b9;">\></span>.Value.Contains(<span
style="color: #a31515;">"Dar"</span>) \_

                      <span style="color: blue;">Select</span>
Gelenler.<span style="color: #6464b9;">\<</span>Adi<span
style="color: #6464b9;">\></span>.Value).SingleOrDefault

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Bir önceki adımda düğmeye tıklandığında yarattığımız WebClient nesnesine
aktardığımız event-handları burada tanımlıyoruz. Böylece sunucudan veri
geldiğinde bu metod çalıştırılıyor olacak. Sunucudan gelen ham veriye
**e.Result** ile ulaşabiliyoruz. Gelen veri özünde XML olacağı için
hemen bir **XDocument** yaratarak XDocument sınıfının **Parse** özelliği
ile verimizi işlenebilir hale getiriyoruz. Son adımda ise klasik bir
**XLINQ** sorgusu yazarak adında "Dar" geçen kaydı bularak değeri
**Metin** adındaki **TextBlock** nesnemize aktarıyoruz.

Böylece sunucudan farklı bir XML dosyasını alarak XLINQ ile rahatlıkla
istemci tarafında işleyebildiğimizi gördük.

**Peki ya başkan bir alan adından veri çekmek istersek?**

Aslında bu bölümde bahsedeceğimiz sorun Silverlight'dan bağımsız olup
tüm AJAX uygulamalarında geçerli bir sorun. Maalesef tarayıcılardaki
uygulamalar güvenlik sebepleri ile kendi çalıştıkları alan adı
haricindeki konumlardan veri alamaz veya gönderemezler. Bu nedenle
maalesef Silverlight tarafından da yola çıkarak başka bir alan adından
veri almak mümkün değil gibi gözükebilir. Oysa bir yol var.

İster harici klasik ASMX Web Servisleri, ister WCF servisleri veya ister
doğrudan REST kullanmak isteyin, harici bir alan adına ulaşmak
istiyorsanız aslında söz konusu alan adındaki veri kaynağının size
ulaşım izni vermiş olması gerekiyor. Silverlight 2.0 karşı hedef alan
adında **clientaccesspolicy.xml** adında bir dosya arar. Eğer bu dosyayı
bulabiliyorsa içerisinde yazılı kurallar çerçevesinde sizin söz konusu
alan adındaki içeriğe ulaşmanıza izin verir.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">access-policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">cross-domain-access</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">allow-from</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">domain</span><span style="color: blue;">
</span><span style="color: red;">uri</span><span
style="color: blue;">=</span>"<span style="color: blue;">\*</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">allow-from</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">grant-to</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">resource</span><span style="color: blue;">
</span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span style="color: blue;">/</span>"<span
style="color: blue;"> </span><span
style="color: red;">include-subpaths</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">grant-to</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">cross-domain-access</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">access-policy</span><span
style="color: blue;">\></span>

Yukarıdaki gibi bir **clientaccesspolicy.xml** dosyası herhangi bir alan
adından hedef alan adındaki her konuma ulaşılabileceği anlamına gelir.
İsterseniz bu dosyayı değiştirerek farklı kurallar koyabilir, sadece
belirli alan adlarında çalışan uygulamaların hedef konuma ulaşabilmesini
sağlayabilirsiniz.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;">?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">access-policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">cross-domain-access</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">allow-from</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">domain</span><span style="color: blue;">
</span><span style="color: red;">uri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://daron.yondem.com</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">allow-from</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">grant-to</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">resource</span><span style="color: blue;">
</span><span style="color: red;">path</span><span
style="color: blue;">=</span>"<span
style="color: blue;">/servisler/</span>"<span style="color: blue;">
</span><span style="color: red;">include-subpaths</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">grant-to</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">policy</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">cross-domain-access</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">access-policy</span><span
style="color: blue;">\></span>

Örneğin yukarıdaki gibi bir policy dosyasında sadece
**daron.yondem.com** adresinden xml dosyasının bulunduğu alan adında
**servisler** klasörü içerisinde kaynaklara ulaşılabileceği tanımlanmış.
Policy dosyaları ile ilgili detaylara
[buradan](http://msdn2.microsoft.com/en-us/library/cc197955(VS.95).aspx)
ulaşabilirsiniz.

Hepinize kolay gelsin.


