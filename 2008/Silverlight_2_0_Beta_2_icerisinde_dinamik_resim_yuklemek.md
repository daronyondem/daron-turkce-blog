---
FallbackID: 2097
Title: Silverlight 2.0 Beta 2 içerisinde dinamik resim yüklemek
PublishDate: 19/6/2008
EntryID: Silverlight_2_0_Beta_2_icerisinde_dinamik_resim_yuklemek
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 144b0ef6-17fa-49c5-b510-5df056dfa25b
---
**Silverlight 2.0 Beta 2** ile beraber gelen değişikliklerden biri de
dinamik olarak Image nesneleri yaratmak ve bu nesnelere farklı resimler
yüklemekle ilgili. Eskiden Beta 1 içerisinde sadece **Source**
özelliğini değiştirerek resimleri dinamik olarak yükleyebiliyorken artık
biraz daha uğraşmamız gerekiyor.

İlk olarak yeni bir Silverlight 2.0 Beta 2 projesi yaratarak projemize
kullanacağımız resimleri ekleyelim. Sonrasında dinamik olarak bir
**Image** nesnesi yaratıp içerisini **ImageSource** ile dolduruyoruz.

**[VB]**

<span style="color: blue;">Dim</span> Foto <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Image

<span style="color: blue;">Dim</span> Adres <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Uri(<span style="color: #a31515;">"garden.jpg"</span>, UriKind.Relative)

<span style="color: blue;">Dim</span> FotoKaynak <span
style="color: blue;">As</span> ImageSource = <span
style="color: blue;">New</span>
System.Windows.Media.Imaging.BitmapImage(Adres)

Foto.SetValue(Image.SourceProperty, FotoKaynak)

<span style="color: blue;">Me</span>.LayoutRoot.Children.Add(Foto)

**[C\#]**

<span style="color: #2b91af;">Image</span> Foto = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Image</span>();

<span style="color: #2b91af;">Uri</span> Adres = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"garden.jpg"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative);

<span style="color: #2b91af;">ImageSource</span> FotoKaynak = <span
style="color: blue;">new</span> System.Windows.Media.Imaging.<span
style="color: #2b91af;">BitmapImage</span>(Adres);

Foto.SetValue(<span style="color: #2b91af;">Image</span>.SourceProperty,
FotoKaynak);

<span style="color: blue;">this</span>.LayoutRoot.Children.Add(Foto);

Yukarıdaki kodumuzun ilk satırında yarattığım Silverlight Image
nesnesini doldurmak için bir ImageSource'a ihtiyacımız var. Bunun için
ilk olarak yükleyeceğimiz resim adresini **Uri** tipinde yaratıyoruz.
Relative konumlandırma ile doğrudan uygulamanın içerisindeki resim
dosyasını kullanacağız. Sonrasında elimizdeki Uri'den bir
**ImageSource** yaratıyoruz ve bu ImageSource'u da Image nesnemizin
**SourcePropoerty'sine** atıyoruz. Tüm bu işlemler tamamlandıktan sonra
tabi ki eldeki Image Silverlight nesnesini de sahneye eklememiz lazım.

**Peki ya proje harici bir resmi yüklemek istersek?**

Harici resmin bulunduğu internet adresi üzerinden bir Uri yaratarak
yukarıdaki kodun aynısını kullanabilirsiniz. Böylece uygulamanız söz
konusu adresteki fotoğrafı yükleyecektir.

**[VB]**

<span style="color: blue;">Dim</span> Adres <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Uri(<span style="color: #a31515;">"www.alanadi.com/resim.jpg"</span>,
UriKind.Absolute)

**[C\#]**

<span style="color: #2b91af;">Uri</span> Adres = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"www.alanadi.com/resim.jpg"</span>, <span
style="color: #2b91af;">UriKind</span>.Absolute);

Hepinize kolay gelsin.


