---
FallbackID: 2106
Title: "Silverligth 2.0'da uygulama fonunu şeffaf kullanmak"
date: "2008-6-26"
EntryID: Silverligth_2_0_da_uygulama_fonunu_seffaf_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: b334e195-feb7-4411-a77d-b6f07d482068
---
Özellikle dikdörtgen köşelere sahip olmayan Silverlight uygulamalarında
sayfanın fonunun Silverlight'ın fonunda da gözükmesini isteyebilirsiniz.
Aslında basit bir şekilde **Silverlight 2.0 Beta 2** uygulamasının
fonunu şeffaf yapabilsek sorunumuz çözülmüş olacaktır. Bunun için
yapmamız gereken ufak bir kaç ayar var.

Eğer bir ASP.NET sayfasında Silverlight sunucu kontrolünü
kullanıyorsanız aşağıdaki şekilde **PluginBackground** özelliğini
**Transparent** ve **Windowless** özelliğini de **True** olarak
ayarlamanız yeterli olacaktır. ASP.NET Silverlight sunucu kontrolü
gerekli HTML içeriği sizin için üretecektir.

            <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Silverlight</span> <span style="color: red;">
**PluginBackground**</span><span
style="color: blue;">="Transparent"</span> <span style="color: red;">
**Windowless**</span><span style="color: blue;">="true"</span>

            <span style="color: red;">ID</span><span
style="color: blue;">="Xaml1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Source</span><span
style="color: blue;">="\~/ClientBin/SilverlightApplication29.xap"</span>

            <span style="color: red;">MinimumVersion</span><span
style="color: blue;">="2.0.30523"</span> <span
style="color: red;">Width</span><span
style="color: blue;">="100%"</span> <span
style="color: red;">Height</span><span
style="color: blue;">="100%"</span> <span
style="color: blue;">/\></span>

Eğer Silverlight uygulamanızı ASP.NET dışı bir sayfada kullanacaksanız
bu sefer söz konusu parametreleri OBJECT tagları arasında belirtmeniz
gerekiyor.

        <span style="color: blue;">\<</span><span
style="color: #a31515;">object</span> <span
style="color: red;">data</span><span
style="color: blue;">="data:application/x-silverlight,"</span> <span
style="color: red;">type</span><span
style="color: blue;">="application/x-silverlight-2-b2"</span> <span
style="color: red;">width</span><span
style="color: blue;">="100%"</span> <span
style="color: red;">height</span><span
style="color: blue;">="100%"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="source"</span> <span
style="color: red;">value</span><span
style="color: blue;">="ClientBin/SilverlightApplication29.xap"/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="onerror"</span> <span
style="color: red;">value</span><span
style="color: blue;">="onSilverlightError"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="**background**"</span> <span
style="color: red;">value</span><span
style="color: blue;">="Transparent"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="**pluginbackground**"</span> <span
style="color: red;">value</span><span
style="color: blue;">="Transparent"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">param</span> <span
style="color: red;">name</span><span
style="color: blue;">="**windowless**"</span> <span
style="color: red;">value</span><span
style="color: blue;">="true"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">href</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkID=115261"</span>
<span style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">text-decoration</span>: <span
style="color: blue;">none</span>;<span style="color: blue;">"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">img</span> <span
style="color: red;">src</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkId=108181"</span>
<span style="color: red;">alt</span><span style="color: blue;">="Get
Microsoft Silverlight"</span> <span
style="color: red;">style</span><span
style="color: blue;">="</span><span
style="color: red;">border-style</span>: <span
style="color: blue;">none"/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">a</span><span style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">object</span><span
style="color: blue;">\></span>

Tabi tüm bunları yaparken Silverlight uygulaması içerisinde Root
görselinizin fonunun da şeffaf bırakıldığını kontrol etmekte fayda var.

Hepinize kolay gelsin.


