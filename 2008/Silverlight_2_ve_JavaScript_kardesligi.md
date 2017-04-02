---
FallbackID: 2024
Title: Silverlight 2.0 ve JavaScript kardeşliği
PublishDate: 4/14/2008
EntryID: Silverlight_2_ve_JavaScript_kardesligi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: a1426eb0-7120-4a66-9d5c-de5027fd59ed
---
Silverlight 2.0 ile beraber istemci tarafında VB.NET veya C\#
kullanabileceğimizi artık biliyoruz. Durum böyle olunca söz konusu .NET
dilleri ile Silverlight uygulamasının dışına çıkarak HTML sayfasındaki
klasik HTML elementlerine ulaşmak da büyük kolaylıklar sağlayabilir.
Böylece aslında kısmen şu an için istemci tarafındaki JavaScript'in
hakimiyetini kırmak da mümkün. Tabi bunun tam tersi senaryolarda da
JavaScript tarafından yola çıkarak Silverlight içerisinde .NET
metodlarına ulaşmak isteyebiliriz.

**HTML elementlerine ulaşalım**

İlk olarak Silverlight tarafında yazdığımız kod ile sayfadaki HTML
elementlerine nasıl ulaşabileceğimize bir göz atalım. Bunun için ilk
olarak **Silverlight 2.0 Beta 1** uygulaması içerisinden dışarı çıkarak
**Browser** içerisinde **HTMLPage**'in **Document** nesnesini
yakalamamız gerekiyor.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> Dugme.MouseLeftButtonDown

    <span style="color: blue;">Dim</span> MevcutBelge <span
style="color: blue;">As</span> System.Windows.Browser.HtmlDocument =
System.Windows.Browser.HtmlPage.Document

    MevcutBelge.GetElementById(<span
style="color: #a31515;">"icerik"</span>).SetAttribute(<span
style="color: #a31515;">"innerHTML"</span>, <span
style="color: #a31515;">"DENEME METNİ"</span>)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

MevcutBelge değişkenimize sayfadaki mevcut **HTMLDocument** nesnesini
aktardıktan sonra artık klasik JavaScript metodu gibi **GetElementById**
metodunu kullanabiliyoruz. Silverlight 2.0 animasyonunun bulunduğu
sayfadaki "icerik" adındaki HTML elementini yakaladıktan sonra basit bir
şekilde **innerHTML** özelliğine farklı bir metin aktarıyoruz. Bu
şekilde VB veya C\# kodu ile sayfalardaki HTML elementlerine ulaşılarak
farklı işlemler rahatlık istemci tarafında yapılabilir.

**Peki ya bir JavaScript kodu çalıştırmak istersek?**

İstemcideki .NET kodunuz ile sayfalarınızda hali hazırda yer alana
JavaScript kodlarını birbiri ile konuşturabiliyor olmak tabi ki çok
önemli. HTML sayfası içerisinde tanımlanmış olan herhangi bir JavaScript
metodunu doğrudan çalıştırmak için aşağıdaki kodu kullanabilirsiniz.

System.Windows.Browser.HtmlPage.Window.CreateInstance(<span
style="color: #a31515;">"Uyari"</span>)

Yukarıdaki kod içerisinde "Uyari" adındaki JavaScript fonksiyonu
çalıştırılıyor. Eğer bu fonksiyon aşağıdaki gibi tanımlanarak bir
parametre alsaydı daha farklı bir şekilde çalıştırmamız gerekecekti.

<span style="color: blue;">function</span> Uyari(mesaj)

{

    alert(mesaj);

}

Yukarıdaki JavaScript fonksiyonunu Silverlight tarafından VB veya C\#
ile çalıştırırken göndereceğimiz parametreyi de ek olarak belirtmemiz
gerekecek.

System.Windows.Browser.HtmlPage.Window.CreateInstance(<span
style="color: #a31515;">"Uyari"</span>, <span
style="color: blue;">New</span> <span
style="color: blue;">String</span>(<span
style="color: #a31515;">"23"</span>))

**CreateInstance** metoduna verdiğimiz ilk parametre çalıştırmak
istediğimiz JavaScript metodunun adı şeklinde düzenlenirken verdiğimiz
diğer parametre ise aslında JavaScript fonksiyonumuza aktarmak
istediğimiz diğer olası tüm parametrelerin bir dizisi.

**JavaScript tarafından .NET'e yolculuk...**

.NET tarafında hazırladığımız ve Silverlight ile istemci tarafında
çalışan bir metodu JavaScript ile kullanabilmemiz için ilk aşamada
yapmamız gereken bazı ayarlar var. Bunlardan ilki uygulamamız ilk
yüklendiğinde elimizdeki Silverlight sayfasını HTML sayfasına bir
"**ScriptableObject**" olarak tanımlamamız gerektiği. Bunu yapmak için
uygulamamızın **App.xaml** dosyasının arkasındaki kodlardan
faydalanacağız.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> OnStartup(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
EventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Startup

    <span style="color: blue;">Dim</span> Sayfam <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Page()

    System.Windows.Browser.HtmlPage.RegisterScriptableObject(<span
style="color: #a31515;">"Page"</span>, Sayfam)

    <span style="color: blue;">Me</span>.RootVisual = Sayfam

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz gibi ilk satırda Silverlight uygulamamızda gösterilecek
sayfayı yaratıyoruz ve bir sonraki satırda hemen söz konusu sayfayı
mevcut HTML sayfamıza bir **ScriptableObject** olarak kaydediyoruz.
Sayfayı Silverlight uygulamamızın ana görsel öğesi haline getirerek
kullanıcıya gösterilmesini de sağmalayı unutmayalım.

Bu ayarı tamamladıktan sonra sıra geldi JavaScript tarafı ile
paylaşacağımız fonksiyonumuzu yazmaya.

\<System.Windows.Browser.ScriptableMember()\> \_

<span style="color: blue;">Public</span> <span
style="color: blue;">Function</span> Kare(<span
style="color: blue;">ByVal</span> X <span style="color: blue;">As</span>
<span style="color: blue;">Integer</span>) <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>

    <span style="color: blue;">Return</span> X \^ 2

<span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

Yukarıdaki örnekte basit fonksiyon kendisine parametre olarak verilen
sayının karesini alarak geri döndürüyor. Bu fonksiyonun JavaScript
tarafı ile paylaşılabilmesi için kesinlikle yukarıdaki şekilde
**ScriptableMember** olarak işaretlenmiş olması gerekiyor. Son olarak
sıra geldi bu metodu kullanabilecek olan JavaScript kodunu yazmaya fakat
onun öncesinde dikkat etmemiz gereken bir nokta. Sayfamızdaki herhangi
bir Silverlight uygulaması içerisindeki bir metodu dışarıdan
kullanabilmek için ilk olarak söz konusu Silverlight uygulamasını
bulmamız gerekiyor. Yani Silverlight uygulamamızın bir isminin olması
şart.

<span style="color: blue;">\<</span><span
style="color: #a31515;">object</span><span style="color: blue;">
</span><span style="color: red;">**id**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**SL**</span>"<span style="color: blue;">
</span><span style="color: red;">data</span><span
style="color: blue;">=</span>"<span
style="color: blue;">data:application/x-silverlight,</span>"<span
style="color: blue;"> </span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">application/x-silverlight-2-b1</span>"<span
style="color: blue;"> </span><span style="color: red;">width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">
</span><span style="color: red;">height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">param</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">source</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication8.xap</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">param</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">onerror</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">onSilverlightError</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">param</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">background</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">white</span>"<span style="color: blue;"> /\></span>

 

<span style="color: blue;">  \<</span><span
style="color: #a31515;">a</span><span style="color: blue;"> </span><span
style="color: red;">href</span><span style="color: blue;">=</span>"<span
style="color: blue;">http://go.microsoft.com/fwlink/?LinkID=108182</span>"<span
style="color: blue;"> </span><span style="color: red;">style</span><span
style="color: blue;">=</span>"<span
style="color: blue;">text-decoration: none;</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">img</span><span style="color: blue;">
</span><span style="color: red;">src</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://go.microsoft.com/fwlink/?LinkId=108181</span>"<span
style="color: blue;"> </span><span style="color: red;">alt</span><span
style="color: blue;">=</span>"<span style="color: blue;">Get Microsoft
Silverlight</span>"<span style="color: blue;"> </span><span
style="color: red;">style</span><span
style="color: blue;">=</span>"<span style="color: blue;">border-style:
none</span>"<span style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

Yukarıdaki şekliyle sayfaya yerleştirilen bir Silverlight uygulamasına
isim vermek için uygulamaya ait object taglarına bir ID bilgisi atamak
yeterli olacaktır. Artık ID bilgisi üzerinden Silverlight uygulamamız
ulaşarak aşağıdaki gibi JavaScript içerisinden .NET metodumuzu
çalıştırabiliriz.

SL.Content.Page.Kare(2)

Hepinize kolay gelsin.


