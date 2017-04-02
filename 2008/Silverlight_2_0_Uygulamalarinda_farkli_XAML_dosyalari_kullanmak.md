---
FallbackID: 2004
Title: Silverlight 2.0 Uygulamalarında farklı XAML dosyaları kullanmak.
PublishDate: 3/29/2008
EntryID: Silverlight_2_0_Uygulamalarinda_farkli_XAML_dosyalari_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 9f42770f-889d-4173-acc4-5b9ddc02da33
---
Bir Silverlight uygulamasında birden çok XAML dosyası kullanarak
dosyalar arasında geçiş yapmak isteyebilirsiniz. Fakat bu noktada
maalesef sizi ufak bir sorun bekliyor. Herhangi bir Silverlight
uygulamasının ana görsel elementini maalesef ki değiştirme şansınız yok.
Ana görsel element olarak bahsettiğimiz şey aslında Silverlight 2.0
uygulamasının XAML koduna ait "Root Element" oluyor. Söz konusu root
element sadece uygulama ilk çalıştırılırken belirlenebiliyor. Peki bu
durumda nasıl bir çözüm geliştirebiliriz?

**Root Elementi bir Container olarak kullansak?**

Uygulamamızın ana elementini bir Grid yapsak ve içerisinde XAML
dosyalarımızı birer UserControl olarak yerleştirsek, böylece istediğimiz
zaman Grid içerisindeki elementlerini değiştirerek farklı XAML dosyaları
yükletemez miyiz? Güzel bir fikre benziyor. Deneyip görelim.

İlk olarak içerisinde basit bir şekilde iki adet XAML dosyası içeren
yeni bir Silverlight 2.0 projesi yaratıyoruz. Bu dosyalardan birinde
sadece bir TextBlock varken diğerinde bir TextBlock ve bir de Button
olarak. İlk dosyadaki Button'a basıldığında ikinci dosyanın yüklenmesini
sağlayacağız. Gelin önce dosyalarımızın XAML kodlarına hızlıca bir göz
atalım.

**[Page.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span>

    <span style="color: red;">xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

    <span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

    <span style="color: #a31515;">x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication4.Page"</span>

    <span style="color: red;">Width</span><span
style="color: blue;">="640"</span> <span
style="color: red;">Height</span><span
style="color: blue;">="480"\></span>

 

    <span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span> <span
style="color: red;">Background</span><span
style="color: blue;">="White"</span> <span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**TextBlock**</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**etiket**"</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="146,120,270,225"</span> <span
style="color: red;">TextWrapping</span><span
style="color: blue;">="Wrap"</span> <span
style="color: red;">FontSize</span><span
style="color: blue;">="72"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">Run</span> <span
style="color: red;">FontFamily</span><span
style="color: blue;">="Portable User Interface"</span> <span
style="color: red;">FontSize</span><span
style="color: blue;">="14.666666984558106"</span> <span
style="color: red;">FontStretch</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">FontStyle</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">FontWeight</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">Foreground</span><span
style="color: blue;">="\#FF000000"</span> <span
style="color: red;">Text</span><span style="color: blue;">="1"/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**Button**</span> <span
style="color: red;">Height</span><span style="color: blue;">="30"</span>
<span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">="Left"</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="169,0,0,78"</span> <span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">="Bottom"</span> <span
style="color: red;">Width</span><span style="color: blue;">="105"</span>
<span style="color: red;">Content</span><span
style="color: blue;">="Button"</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="**Dugme**"/\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

**[Page2.xaml]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span>

    <span style="color: red;">xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/client/2007"</span>

    <span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

    <span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">d</span><span
style="color: blue;">="http://schemas.microsoft.com/expression/blend/2008"</span>

    <span style="color: #a31515;">xmlns</span><span
style="color: blue;">:</span><span style="color: red;">mc</span><span
style="color: blue;">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

    <span style="color: #a31515;">mc</span><span
style="color: blue;">:</span><span
style="color: red;">Ignorable</span><span
style="color: blue;">="d"</span>

    <span style="color: #a31515;">x</span><span
style="color: blue;">:</span><span style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication4.Page2"</span>

    <span style="color: #a31515;">d</span><span
style="color: blue;">:</span><span
style="color: red;">DesignWidth</span><span
style="color: blue;">="640"</span> <span
style="color: #a31515;">d</span><span style="color: blue;">:</span><span
style="color: red;">DesignHeight</span><span
style="color: blue;">="480"\></span>

 

    <span style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span> <span
style="color: #a31515;">x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span> <span
style="color: red;">Background</span><span
style="color: blue;">="White"</span> <span
style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">**TextBlock**</span> <span
style="color: red;">Margin</span><span
style="color: blue;">="154,113,206,172"</span> <span
style="color: red;">TextWrapping</span><span
style="color: blue;">="Wrap"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">Run</span> <span
style="color: red;">FontFamily</span><span
style="color: blue;">="Portable User Interface"</span> <span
style="color: red;">FontSize</span><span
style="color: blue;">="14.666666984558106"</span> <span
style="color: red;">FontStretch</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">FontStyle</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">FontWeight</span><span
style="color: blue;">="Normal"</span> <span
style="color: red;">Foreground</span><span
style="color: blue;">="\#FF000000"</span> <span
style="color: red;">Text</span><span style="color: blue;">="2"/\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">**TextBlock**</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Herhangi bir Silverlight 2.0 projesinde ilk açılacak olan XAML
dosyasının sınıfı **App.xaml** ile beraber çalışan code-behind dosyasına
belirlenir. Bu dosyayı  WPF uygulamalarında app.xaml'a veya ASP.NET
uygulamalarındaki Global.asax'a benzetebilirsiniz. App.xaml uygulama ile
ilgili global işlemlerin yapıldığı yerdir. İlk olarak app.xaml
dosyasının code-behind kısmına geçerek uygulamanın **OnStartUp**
durumuna özel bir kod yazacağız.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> OnStartup(<span
style="color: blue;">ByVal</span> o <span style="color: blue;">As</span>
<span style="color: blue;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
EventArgs) <span style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Startup

    <span style="color: blue;">Dim</span> BirGrid <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Windows.Controls.Grid

    BirGrid.Children.Add(<span style="color: blue;">New</span> Page)

    <span style="color: blue;">Me</span>.RootVisual = BirGrid

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yukarıdaki kod içerisinde ilk olarak bir **Silverlight 2.0 Grid**
kontrolü yaratıyoruz. Unutmayın ki WPF'de de oluğu gibi **Grid**
kontrolleri birer **DataGrid** değiller. **Grid** kontrolleri HTML'deki
karşılığı ile **table** diyebileceğimiz **container** kontrollerinden
sadece biri. Yarattığımız **Grid** kontrolü içerisine **Page.xaml**
dosyamızı yüklemek için Page.xaml'a ait code-behind'daki sınıfından bir
kopya yaratarak Grid'imizin children listesine ekliyoruz. Son olarak da
uygulamamızın ana / root elementini Grid kontrolü olarak tanımlıyoruz.
Böylece bundan sonra ana elementi değiştirmeden doğrudan Grid
içerisindeki kontrolleri değiştirerek aslında tüm uygulama arayüzünü de
değiştirmiş olacağız.

Gelelim Page.xaml dosyamızın code-behind kısmına ve bakalım Page.xaml
içerisinde bulunan düğmemize basıldığında nasıl olacak da uygulama
arayüzünden page.xaml'ı kaldırarak page2.xaml'ı yükleyeceğiz.

<span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> Dugme\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span>
System.Windows.Input.MouseButtonEventArgs) <span
style="color: blue;">Handles</span> Dugme.MouseLeftButtonDown

    <span style="color: blue;">Dim</span> Root <span
style="color: blue;">As</span> Grid = <span
style="color: blue;">CType</span>(<span
style="color: blue;">Me</span>.Parent, Grid)

    Root.Children.Clear()

    Root.Children.Add(<span style="color: blue;">New</span> Page2)

<span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Yapmamız gereken aslında şu an içerisinde olduğumuz Page.xaml dosyasının
parent elementini bularak içerisindekileri silmek. Bunun için
**Me.Parent** ile Gridimizi yakalıyoruz ve sonrasında **children.clear**
ile sayfadaki herşeyi siliyoruz. Son olarak da Page2.xaml dosyamıdan bir
kopya yaratarak aynı Grid'in içerisine ekliyoruz. Böylece Silverlight
2.0 uygulamamızın içerisinde artık başka bir XAML dosyası yüklemiş
olduk.

Hepinize kolay gelsin.


