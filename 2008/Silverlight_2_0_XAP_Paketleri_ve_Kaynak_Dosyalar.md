---
FallbackID: 2037
Title: Silverlight 2.0 XAP Paketleri ve Kaynak Dosyalar
PublishDate: 4/27/2008
EntryID: Silverlight_2_0_XAP_Paketleri_ve_Kaynak_Dosyalar
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 9e2fab0a-49ea-48f4-ac2f-7b0dc2a0f16f
---
Silverlight 2.0 uygulamalarında tüm uygulamaya ait VB veya C\# kodu ile
beraber XAML dosyalarının da birer DLL olarak düzenlendiğini ve
sonrasında XAP adında, özünde ZIP dosyaları şeklinde paketlenerek
istemciye gönderildiğini biliyoruz. Durum böyle olunca bir Silverlight
uygulaması ile beraber sunucudan istemciye farklı kaynaklar göndermeyle
ilgili değişik yollar söz konusu oluyor.

Bunlardan en basiti tabi ki sunucuda yer alan hali hazırdaki bir dosyayı
asenkron bir istek ile istemciye taşımak. Fakat bu durumda eğer
istenecek olan veri çok ufaksa aslında ilk Silverlight uygulamasının
yüklenmesinde kullanılan veri transferinde bu ufak dosyalar da ana XAP
dosyası ile beraber gönderilebilirdi. Böylece hem toplamda sunucuya
gönderilen istek sayısı azalırdı hem de XAP dosyalarının yapısı gereği
sıkıştırma özelliğinden faydalanılmış olurdu.

**Build Action : Resource**

Visual Studio içerisinde Silverlight projelerinde herhangi bir dosyayı
seçtikten sonra "Properties" paneline göz attığımızda "Build Action"
adında bir ayar görebilirsiniz. Bu ayar ile söz konusu dosyanın ne
şekilde sunucudan istemciye gönderileceğini ayarlamış oluyoruz.

Varsayılan ayarları ile projenize bir resim dosyası eklediğinizde Build
Action ayarı **Resource** olarak düzenlenmiş olacaktır. Bu dosyalar
doğrudan Silverlight uygulaması için yaratılacak DLL dosyası içerisine
Resource olarak yerleştirilecektir. DLL dosyasının yüklenme süresini
uzatmamak adına olabildiğince ufak ve önemli dosyaları bu şekilde
projelere eklemekte fayda var.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Foto.jpg</span>"<span
style="color: blue;">/\></span>

Bu şekilde projelere eklenmiş dosyaları XAML içerisinde doğrudan
yukarıdaki gibi kullanabilirsiniz.

**Build Action : Content**

Eğer dosyanızın orijinal DLL'i şişirmesini istemiyorsanız fakat yine de
aynı XAP dosyası içerisinde istemciye gitmesini istiyorsanız.
Kullanmanız gereken seçenek "**Content**" seçeneği. Bu şekilde
işaretlenmiş dosyalar XAP dosyası içerisine konarak istemciye
gönderilir. Eğer istemci tarafında Plug-In hedef dosyayı XAP dosyası
içinde bulamazsa bu sefer XAP dosyası ile aynı klasörde sunucu üzerinden
dosyayı almaya çalışıyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: blue;">
</span><span style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">/Foto.jpg</span>"<span
style="color: blue;">/\></span>

Normalinden farklı olarak bu sefer tüm verilen adreslerin başında bir /
yerleştirilmesi ve relative konum verilmesi gerekiyor. Her ihtimale
karşı yine de çok büyük dosyaları da bu şekilde kullanmamakta fayda var.
Çünkü unutmayın XAP dosyası istemciye tamamen gitmeden uygulamanız
çalışmayacaktır.

Hepinize kolay gelsin.


