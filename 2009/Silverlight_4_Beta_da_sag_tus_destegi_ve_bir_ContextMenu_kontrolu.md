---
FallbackID: 2454
Title: "Silverlight 4 Beta'da sağ tuş desteği ve bir ContextMenü kontrolü"
date: "2009-11-22"
EntryID: Silverlight_4_Beta_da_sag_tus_destegi_ve_bir_ContextMenu_kontrolu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: b621640a-b973-45e9-a67a-7b8493ca872a
---
# Silverlight 4 Beta'da sağ tuş desteği ve bir ContextMenü kontrolü
Silverlight 3 zamanlarında gelen en önemli isteklerden biri farenin sağ
tuşu ile ilgili eventları yakalayabilmekti. Biliyorsunuz normal
şartlarda herhangi bir Silverlight uygulamasına sağ tuş ile tıklarsanız
karşınıza "Silverlight" diye bir menü seçeneği geliyor ve burada da
Silverlight Runtime ile ilgili ayarlara ulaşılabiliyor. Uzun bir süre
sağ tuş implementasyonunun pek de mümkün olmadığı ve güvenlik nedeni ile
Microsoft'un bu gibi bir şeye izin vermeyeceği konusunda yorumlar
internette gezindi. İtiraf etmek gerekirse ben de konsept olarak pek
olası bir çözüm öngöremiyordum.

**Silverlight 4'te fareye sağ tuş desteği!**

Oysa bir de baktık ki Silverlight 4 ile (Beta) farenin sağ tuşuna dair
eventleri de ayrıca yakalayabiliyoruz. Bu destek özellikle iş
uygulamalarında çok anlamlı bir boşluğu dolduruyor. Kullanıcılara hali
hazırda web ortamında bir "thinclient" deneyimi sunan ve sanki windows
ortamındaki programları kullanıyormuşcasına zengin deneyimler
sağlayabilen Silverlight'ın aynı hissiyatı devam ettirebilmesi adına
farenin sağ tıklamalarına da uygun tepkileri verebilmesi çok önemliydi.
Bu açığın kapatılıyor olduğunu görmek çok sevindirici.

**Peki nasıl?**

Aslında konu epey basit. Artık Silverlight içerisindeki tüm kontrollerin
MouseLeftButtonDown ve MouseLeftButtonUp gibi birer de
**MouseRightButtonDown** ve **MouseRightButtonUp** eventları bulunuyor.
Söz konusu eventları tarayıcı ve platform bağımsız olarak yakalayıp
istediğiniz işlevselliği sunabilirsiniz.

Silverlight 4'te sağ tuş desteği gelmesine rağmen varsayılan ayarlarla
hala sağ tuş ile tıkladığınızda eksi klasik Silverlight menüsü
gelecektir. Bu menünün gelmesini engellemek için tabi ki kendi
implementasyonunuzu yapmanız gerekiyor. Eğer bu menünün gelmesini
istemiyorsanız hemen herhangi bir kontrolün **MouseLeftButtonDown**
eventını yakalayarak event listener'a gelen argüman üzerindeki
**Handled** Property'sini kullanabilirsiniz.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication13.MainPage"</span>

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
style="color: #a31515;">TextBox</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="txtMetin"</span><span style="color: red;">
Height</span><span style="color: blue;">="100" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="ContextMenu"</span><span style="color: red;">
Visibility</span><span style="color: blue;">="Collapsed"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span>

             <span style="color: red;"> VerticalAlignment</span><span
style="color: blue;">="Top"</span><span style="color: red;">
Height</span><span style="color: blue;">="50"</span><span
style="color: red;"> Width</span><span
style="color: blue;">="150"</span> <span style="color: red;">
Background</span><span style="color: blue;">="Red"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">TextBlock</span><span style="color: red;">
Text</span><span style="color: blue;">="Başardın!" /\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki XAML kodunda basit bir **TextBox** ve bir de **Visibility**
özelliği **Collapsed** olarak ayarlanmaış **Grid** görüyorsunuz.
Amacımız TextBox'a sağ tuş ile tıklandığında bir ContextMenu kıvamında
Grid'imizi kullanıcıya göstermek. Grid içerisinde ben deneme amacı ile
bir **TextBlock** koydum fakat siz hem bu Grid'in içerisinde duruma göre
programatik olarak doldurabilir hem de içerisine düğmeler koyup
düğmelerin click eventlarını yakalayabilirsiniz. Sistemi geliştirmek
size kalmış.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> txtMetin\_MouseRightButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.<span
style="color: #2b91af;">MouseButtonEventArgs</span>) <span
style="color: blue;">Handles</span> txtMetin.MouseRightButtonDown

        e.Handled = <span style="color: blue;">True</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

İlk olarak TextBox kontrolümüzün **MouseRightButtonDown** eventını
yakalayarak burada **Handled** özelliğine **True** değerini veriyoruz.
Böylece TextBox'ın üzerine sağ tuş ile tıklandığı anda söz konusu
senaryoyla bizim ilgilendiğimizi sisteme belirtmiş oluyoruz ve artık
Silverlight Runtime kendi menüsünü göstermiyor. Normal şartlarda Context
menülerin gösterimi farenin sağ tuşu kaldırıldığında yapılır. Yani tuşa
bastığınızda değil tuştan parmağınızı çektiğinizde context menü
gösteriliyor. Biz bu event ile tuşa basıldığı anda "*Hop! Ben
halledeceğim bu işi*" :) şeklinde bir mesaj ile Silverlight Runtime'ı
pinglemiş oluyoruz ve tabi ki **MouseRightButtonUp** durumunu yakalayıp
kendi menümüzü göstermek de bize kalıyor.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> txtMetin\_MouseRightButtonUp(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.<span
style="color: #2b91af;">MouseButtonEventArgs</span>) <span
style="color: blue;">Handles</span> txtMetin.MouseRightButtonUp

        ContextMenu.Margin = <span style="color: blue;">New</span> <span
style="color: #2b91af;">Thickness</span>(e.GetPosition(<span
style="color: blue;">Me</span>).X, e.GetPosition(<span
style="color: blue;">Me</span>).Y, <span
style="color: #a52a2a;">0</span>, <span
style="color: #a52a2a;">0</span>)

        ContextMenu.Visibility = Windows.<span
style="color: #2b91af;">Visibility</span>.Visible

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Sıra geldi olası bir ContextMenu yapısını kullanıcıya göstermeye. XAML
kısmından hatırlarsanız bizim elimizde adı **ContextMenu** olan bir Grid
vardı. Amacımız bu Grid'i farenin sağ tuşu ile tıklandığında tıklanan
noktada göstermek. Bu nedenle yine TextBox'ın **MouseRightButtonUp**
eventını yakalayarak bu elimizdeki ContextMenu'nün **Margin'ini**
ayarlıyoruz. ContextMenu işlevselliği görecek Grid'imiz bir başka Grid
içerisinde yer aldığı için pozisyonunu değiştirebilmek adına Margin
vermemiz şart. Dikkat etmeniz gereken nokta Grid'in XAML içerisinde
pozisyonlandırma olarak sol üste yaslanmış olması. O nedenle sol üst
köşeden mesafalelerini vermemiz pozisyonlandırma için yeterli olacaktır.
Yine event listener'a gelen argüman üzerinden **GetPosition** metodunu
kullanarak farenin tıklandığı yerin X ve Y koordinatlarını alarak
**Margin** olarak Grid'imize veriyoruz. Böylece ContextMenu'müz artık
istediğimiz yere geldi ve gösterime hazır. Bu durumda Visibility'sini de
Visible yaparak kullanıcıya gösterebiliriz.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_MouseLeftButtonDown(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.Input.<span
style="color: #2b91af;">MouseButtonEventArgs</span>) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.MouseLeftButtonDown

        ContextMenu.Visibility = Windows.<span
style="color: #2b91af;">Visibility</span>.Collapsed

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Unutmadan! Uygulama içerisinde bir yerlere farenin sol tuşu ile
tıklandığında ContextMenu'üyü tekrar görünmez yapmayı atlamayın yoksa
context menü sürekli gözükecektir. Bunun için basit bir şekilde root
elementin **MouseLeftButtonDown** özelliğini yakalayıp orada Grid'imizin
**Visibility'sini** **Collapsed** yapabilirsiniz.

**Daha kolay yolu yok mu ContextMenü meselesinin?**

Farkındayım :) Kendi kendinize "Ya tamam da bir ContextMenü için bu
kadar uğraşmak doğru mu? Yok ContextMenü kontrolü?" şeklinde sordunuz :)
Maalesef yok! Yani en azından Silverlight 4 Beta ile şu anda gelmiyor.
Ama güzel bir haberim var. Silverlight Program Manager'lardan [Jesse
Bishop](http://www.jebishop.com/2009/11/18/implementing-a-contextmenu-in-silverlight-4-beta/)'un
yazmış olduğu bir kontrol var. Söz konusu kontrolü kullanarak rahatlıkla
uygulamalarınıza ContextMenu'ler ekleyebilirsiniz. Gelin basit bir
şekilde bu implementasyonun nasıl yapıldığına bir göz atalım.

İlk olarak Jesse Bishop'un yazmış olduğu kontrolün kaynak kodlarını
sitesinden indirerek compile etmeniz gerek veya üşeniyorsanız ben sizin
için compile ettim :) Aşağıdaki linkten doğrudan Assembly'leri
indirebilirsiniz.

[Silverlight 4 Beta için ContextMenu Kontrolleri - 21112009\_1.zip
(19,11 KB)](media/Silverlight_4_Beta_da_sag_tus_destegi_ve_bir_ContextMenu_kontrolu/21112009_1.zip)

Referans alma işlemini tamamladıktan sonra Assembly içerisindeki
kontrolleri kullanabilmek adına Assembly'yi XML NameSpace ile XAML
tarafına import etmemiz gerek.

**[XAML]**

<span style="color: gray;">\<UserControl
x:Class="SilverlightApplication13.MainPage"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>

<span style="color: gray">   </span> <span style="color: gray;">
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>

            <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span
style="color: red;">context</span><span
style="color: blue;">="clr-namespace:ContextMenuControls;assembly=ContextMenuControls"</span>

<span style="color: gray">   </span> <span style="color: gray;">
mc:Ignorable="d"</span>

<span style="color: gray">   </span> <span style="color: gray;">
d:DesignHeight="300" d:DesignWidth="400"\></span>

Import işlemi de tamamlandığına göre artık bu Assembly içerisindeki tüm
kontrolleri projemizde kullanabiliriz. Bir önceki örneğimizdeki TextBox
ile devam edelim. Amacımız bu TextBox'a yine bir ContextMenü atamak.

**[XAML]**

<span style="color: #a31515;">     </span> <span
style="color: #808080;">   </span><span
style="color: #808080;">\<TextBox x:Name="txtMetin"
Height="100" \></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ContextMenu.ContextMenu</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ContextMenu</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">MenuItem</span><span style="color: red;">
Text</span><span style="color: blue;">="Hede"</span><span
style="color: red;"> Tag</span><span
style="color: blue;">="1"</span><span style="color: red;">
Click</span><span style="color: blue;">="MenuItem\_Click" /\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">MenuItem</span><span style="color: red;">
Text</span><span style="color: blue;">="Hödö"</span><span
style="color: red;"> Tag</span><span
style="color: blue;">="2"</span><span style="color: red;">
Click</span><span style="color: blue;">="MenuItem\_Click" /\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">MenuItem</span><span style="color: red;">
Text</span><span style="color: blue;">="Bödö"</span><span
style="color: red;"> Tag</span><span
style="color: blue;">="3"</span><span style="color: red;">
Click</span><span style="color: blue;">="MenuItem\_Click" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ContextMenu</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">context</span><span
style="color: blue;">:</span><span
style="color: #a31515;">ContextMenu.ContextMenu</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">       </span><span
style="color: #808080;"> </span> <span
style="color: #808080;">\</TextBox</span><span
style="color: blue;">\></span>

Gördüğünüz gibi olay epeyce basit aslında. **TextBox** için bir
**ContextMenu** atadıktan sonra içerisine de istediğimiz kadar
**MenuItem** koyabiliyoruz. Ben örnek olarak tüm MenuItem'ları aynı
event-listener'a bağladım. Söz konusu event listener içerisinde de gelen
MenuItem'ın **Tag'ına** göre senaryolarınızı ayrıştırabilirsiniz.
Aslında söz konusu kontroller Silverlight 4 ile beraber gelen Commanding
yapısına da destek veriyor fakat şimdilik daha commanding kısmı ile
ilgili makale yazmadığım için konuyu oralara genişletmiyorum.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MenuItem\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> System.<span
style="color: #2b91af;">Object</span>, <span
style="color: blue;">ByVal</span> e <span style="color: blue;">As</span>
System.<span style="color: #2b91af;">EventArgs</span>)

        <span style="color: #2b91af;">MessageBox</span>.Show(<span
style="color: blue;">CType</span>(sender, ContextMenuControls.<span
style="color: #2b91af;">MenuItem</span>).Tag)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Eğer ContextMenu'leri kod ile yaratıp kontrollere atamak isterseniz tabi
ki bu da mümkün. Bunun için örneğimizdeki TextBox'a ait ContextMenu
Assembly'sinden gelen bir attached property'yi set ederek
ilerleyebiliriz.

**[VB]**

        <span style="color: blue;">Dim</span> CMenu <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ContextMenuControls.<span style="color: #2b91af;">ContextMenu</span>

        <span style="color: blue;">Dim</span> Item <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
ContextMenuControls.<span style="color: #2b91af;">MenuItem</span>

        Item.Text = <span style="color: #a31515;">"Gel Tıkla"</span>

        <span style="color: blue;">AddHandler</span> Item.Click, <span
style="color: blue;">Sub</span>()

                                   <span
style="color: #2b91af;">MessageBox</span>.Show(<span
style="color: #a31515;">"ok"</span>)

                               <span style="color: blue;">End</span>
<span style="color: blue;">Sub</span>

        CMenu.Items.Add(Item)

        ContextMenuControls.<span
style="color: #2b91af;">ContextMenu</span>.SetContextMenu(txtMetin,
CMenu)

Yukarıdaki kod içerisinde bir ContextMenu yaratıp içerisine de bir
MenuItem yerleştiriyoruz. Basit bir şekilde şimdilik MenuItem'a
tıklandığında bir MessageBox gösteriyoruz. Önemli olan en sonda
**ContextMenu** sınıfı üzerinden **SetContextMenu** ile **TextBox'a**
elimizdeki menüyü ataçlamamız. Böylece herşey tıkırında çalışacaktır.

Buradan bu güzel kontrol için Jesse'ye teşekkür ediyorum :) Umarım
yakında Silverlight Toolkit'te görürüz bu kontrolü.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-11-22 tarihinde yayinlanmistir.*
