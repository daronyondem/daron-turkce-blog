---
FallbackID: 2460
Title: Silverlight 4 Beta'da masaüstünden webe dosya sürükle & bırak!
PublishDate: 28/11/2009
EntryID: Silverlight_4_Beta_da_masaustunden_webe_dosya_surukle_birak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 102a3691-92e0-466b-ad4f-075be1e15edc
---
Web uygulamaları ile masaüstü deneyimini birbiri ile konuşturmak aslında
çok önemli özelliklerden biri. Bu çerçevede iletişim olarak
adlandırdığımız şey basit bir şekilde dosyalara erişim bile olabilir.
Bir web uygulamasının kullanıcının onayı ile kullanıcıya ait bir dosyaya
erişmesi için bugün kullanabileceğimiz metodlardan en uygunu bir
OpenFileDialog kullanmak gibi gözükse de aslında OpenFileDialog'un
yaptığı işi doğrudan bir "Sürükle/Bırak" işlemi ile de yapabiliriz.
Maalesef bu gibi bir altyapıyı özellikle masaüstünden web uygulamasına
doğru oluşturmak ciddi emek gerektiriyor.

Silverlight 4 Beta ile beraber artık herhangi bir Silverlight
uygulamasını Sürükle/Bırak işlemlerinde kullanabiliyoruz ve kullanıcılar
masaüstünden veya işletim sisteminin herhangi bir konumundan aldıkları
dosyayı sürükle&bırak tekniği ile web uygulamasına, silverlight'a
bırakabiliyorlar. Aynı sistem tabi ki Silverlight'ın masaüstüne alındığı
OOB (Out Of Browser) modunda da çalışıyor. Böylece kullanıcılar için çok
daha rahat ve kullanışlı bir ortam, web ile masaüstü arasında kolay bir
köprü kurulabiliyor.

**Masaüstünden al webe bırak!**

Örneğimizde geliştireceğimiz uygulama sürükle&bırak tekniği ile
kullanıcıların bilgisayarlarından resimleri atabilecekleri bir web
uygulaması olacak. Silverlight projemiz aldığı resimleri bir ListBox
içerisinde listeyecek ve ListBox'tan seçilen resim de sağ tarafta
uygulama içerisinde gösterilebilecek.

İsterseniz ilk olarak uygulamamızın görsel arayüzünü hazırlayalım ve bir
Grid içerisinde iki kolon yaratarak kolonlardan birine uygun bir
**ListBox** diğerine de bir **Image** nesnesi yerleştirelim. Bu
kontrolleri sırası ile **listResimler** ve **imgResim** isimlerini
vererek devam edebiliriz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication26.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

   <span style="color: red;"> mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span>

   <span style="color: red;"> d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="300"</span><span style="color: red;">
d</span><span style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="400"\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: red;"> Width</span><span
style="color: blue;">="0.325\*"/\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ColumnDefinition</span><span
style="color: red;"> Width</span><span
style="color: blue;">="0.675\*"/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid.ColumnDefinitions</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ListBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="listResimler"</span><span style="color: red;">
Margin</span><span style="color: blue;">="5"</span><span
style="color: red;"> **AllowDrop**</span><span
style="color: blue;">**="True"**/\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Image</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="imgResim"</span><span style="color: red;">
Grid.Column</span><span style="color: blue;">="1"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="5"/\></span>

 

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodu uygulamamızın tasarımını yansıtırken aslında
içerisinde önemli bir nokta var. Dikkat ettiyseniz ListBox'un
**AllowDrop** adında bir özelliği var ve **True** olarak ayarlanmış
durumda. İşte bu özellikle ile beraber artık ListBox'ımıza kullanıcılar
işletim sisteminden dosyalar alarak atabilecekler. Siz örneklerinizde
isterseniz farklı nesnelere de bu gibi işlevsellikler ekleyebilirsiniz.

İlk adımda uygulamamıza sürükle&bırak ile bırakılan tüm resimleri
saklayacak olan bir **FileInfo** listesi yaratacağız. Malum
Sürükle&Bırak işlemi web ortamında çalışırken aynı OpenFileDialog'da
olduğu gibi Silverlight bize dosyaların full path'ini güvenlik nedeni
ile vermeyecek. Bize sadece dosya içeriğine ve dosya özelliklerine
ulaşabileceğimiz FileInfo nesneleri gelecek. Biz de bu nesneleri global
bir değişkende tutarak bu değişkeni de sürekli uygulama içerisinde
ListBox'ımıza bind edilmiş olarak muhafaza edeceğiz.

**[VB]**

    <span style="color: blue;">Dim</span> Dosyalar <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.ObjectModel.<span
style="color: #2b91af;">ObservableCollection</span>(<span
style="color: blue;">Of</span> <span
style="color: #2b91af;">FileInfo</span>)

 

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">RoutedEventArgs</span>) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        listResimler.DisplayMemberPath = <span
style="color: #a31515;">"Name"</span>

        listResimler.ItemsSource = Dosyalar

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Her FileInfo sınıfında dosyanın adı Name Property'si altında saklanır. O
nedenle uygulama ilk açıldığında ListBox ile yaptığımız bindingde de
ListBox'ın dosya isimlerini göstermesi için "Name" pathini
**DisplayMemberPath** olarak veriyoruz. Elimizde bir
ObservableCollection olduğuna göre biz ne zaman bu kolleksiyona bir
nesne eklesek otomatik olarak ListBox'da da gözükeceğinden eminiz. Şimdi
sıra geldi kullanıcılar resimleri ListBox'un üzerine bırakınca o
resimleri yakalayıp bu listeye eklemeye.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> listResimler\_Drop(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.<span
style="color: #2b91af;">DragEventArgs</span>) <span
style="color: blue;">Handles</span> listResimler.Drop

        <span style="color: blue;">If</span> e.Data <span
style="color: blue;">IsNot</span> <span
style="color: blue;">Nothing</span> <span
style="color: blue;">AndAlso</span> e.Data.GetDataPresent(<span
style="color: #2b91af;">DataFormats</span>.FileDrop) <span
style="color: blue;">Then</span>

            <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> Dosya <span
style="color: blue;">As</span> <span
style="color: #2b91af;">FileInfo</span> <span
style="color: blue;">In</span> e.Data.GetData(<span
style="color: #2b91af;">DataFormats</span>.FileDrop)

                Dosyalar.Add(Dosya)

            <span style="color: blue;">Next</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Gördüğünüz üzere ListBox'un **Drop** eventını yakalayarak işe
başlayabiliyoruz. Bu event kullanıcılar ListBox'a birşey bıraktıkları
anda çalışacaktır. Argüman üzerinden yola çıkara ilk olarak ortada bir
**Data** var mı yoksa yok mu kontrolünü yapıp sonra da gelen data bir
**FileDrop** mudurun kontrolünü yapıyoruz. Zaten şu anda Silverlight
tarafında tek desteklenen de bu format.

Tüm kontrolerden geçtikten sonra **Data** üzerinden **GetData** diyerek
uygulamaya bırakılan tüm veriyi alabiliriz. GetData geriye bir FileInfo
array'i döndürecektir. Bu array içerisinde gezerek tek tek her
FileInfo'yu hemen kendi yarattığımız listeye ekliyoruz. Tabi ki listemiz
ObservableCollection olduğu için eklenen her resim de anında ListBox
içerisinde gözüküyor! Süper!

Şimdi sıra geldi bu resimlerden yani aslında **FileInfo'ların**
içlerinden ListBox'da biri seçildiğinde resim bilgisini alıp sağdaki
**Image** nesnesinde göstermeye.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> listResimler\_SelectionChanged(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Controls.<span
style="color: #2b91af;">SelectionChangedEventArgs</span>) <span
style="color: blue;">Handles</span> listResimler.SelectionChanged

        <span style="color: blue;">Dim</span> SeciliFile <span
style="color: blue;">As</span> <span
style="color: #2b91af;">FileInfo</span> = listResimler.SelectedItem

 

        <span style="color: blue;">Dim</span> Foto <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
<span style="color: #2b91af;">BitmapImage</span>

        Foto.SetSource(SeciliFile.OpenRead)

        imgResim.Source = Foto

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

ListBox'ın **SelectionChanged** eventını yakaladıktan sonra
**SelectedItem'ı** da bir FileInfo'ya cast ediyoruz. Zaten ListBox'a
**FileInfo** kolleksiyonu bind ettiğimize göre geriye bir FileInfo
dönmesi çok normal. Gelen **FileInfo'nun** **OpenRead** metodu ile
aldığımız **FileStream'i** hemen bir **BitmapImage'a** kaynak vererek
onu da uygulamamızdaki **Image** nesnesine **Source** olarak veriyoruz.
İşlem tamam.

![Masaüstünden webe
Sürükle&Bırak!](media/Silverlight_4_Beta_da_masaustunden_webe_dosya_surukle_birak/27112009_1.jpg)\
*Masaüstünden webe Sürükle&Bırak!*

Artık uygulamamız tarayıcı içerisinde çalışırken işletim sisteminden
resim dosyalarını alıp ListBox'a sürükleyip bırakabiliriz. Sonrasında da
ListBox içerisinden istediğimiz resmi seçiip ön izlemesini de
yapabiliriz. Bundan sonrasında yaratılabilecek her türlü işlevsellik
artık size kalıyor. Unutmayın ki bu sistem aynen OOB (Out Of Browser)
modunda da kullanılabiliyor.

Kullanıcılarınıza Sürükle&Bırak işlemini daha çarpıcı bir şekilde
hissetirebilmek için isterseniz kontrollerin **DragEnter**,
**DragLeave**, **DragMove** gibi eventlarını da yakalayarak ekranda
görsel değişiklikler yapabilirsiniz. Böylece kullanıcıların ellerindeki
dosyaları tam olarak bırakabilecekleri yerde olup olmadıklarını daha
rahat anlayabilirler.

Hepinize kolay gelsin.


