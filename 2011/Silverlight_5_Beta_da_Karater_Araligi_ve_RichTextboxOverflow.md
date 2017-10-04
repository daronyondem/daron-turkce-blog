---
FallbackID: 2566
Title: Silverlight 5 Beta'da Karater Aralığı ve RichTextboxOverflow
PublishDate: 23/4/2011
EntryID: Silverlight_5_Beta_da_Karater_Araligi_ve_RichTextboxOverflow
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 5
old.EntryID: 2dd0c513-99ca-439d-b1aa-344f6b41246b
---
İtiraf etmem gerek ki Silverlight'ın metin gösterme konusunda
özellikleri gerçekten çok yavaş gelişti. Richtextbox'ın çok uzun bir
süreden sonra geldiğini düşünürsek şimdi bahsedeceğimiz özelliğin de
özünde epey geciktiğini söyleyebilirim. Fakat sonuç itibari ile :) hiç
gelmemesinden iyidir diyerek konumuza devam edelim :)

Silverlight 5 Beta ile beraber metin gösterimi konusunda özünde gelen
iki yenilik var. Bunlardan biri artık metin içinde karakterler arası
mesafeyi düzenleyebiliyor hatta anime edebiliyor olmamız. İkincisi ise
bir metnin akışını sağlayacak şekilde aynı ekranda birden çok kontrolü
birbirine bağlayabiliyor olmamız. Bu durum özellikle metnin font ve
metin aralığının dinamik olduğu senaryolardan çok değerli oluyor. Gelin
şimdi örneklerle neler olduğuna bir bakalım.

**Karakter aralığını değiştirmenin basit yolu....**

Herhangi bir TextBlock içerisinde gösterdiğiniz metin basit bir şekilde
karakter aralığını belirtmek için **CharacterSpacing** attribute'ü
kullanabilirsiniz. İşin güzel tarafı daha önce de bahsettiğimiz gibi bu
property'yi anime etme şansınız da var.

**[XAML]**

<span style="color:#a31515;">     </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> Margin</span><span
style="color:blue;">="88,96,110,138"</span> \
                   <span style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span> \
                   <span style="color:red;"> Text</span><span
style="color:blue;">="Örnek bir metin!"</span> \
                   <span
style="color:red;"> **CharacterSpacing**</span><span
style="color:blue;">="204"/\></span>

**Yeni bir kontrol : RichTextBoxOverflow**

Uzun uzun metinler gösteren uygulamalar yapmayı planlıyorduysanız size
güzel bir haberim var. İster bir online e-book reader yazın ister basit
bir RSS reader artık elinizdeki uzun metinleri istediğiniz gibi
kolonlara bölebilir ve metinlerin ekranda bir alandan diğer alana
otomatik akmasını sağlayabilirsiniz. Bu işlevselliğe ulaşabilmek için
artık elimizde yeni bir kontrol var, adı da **RichTextBoxOverflow**.

**[XAML]**

<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="LayoutRoot"</span><span
style="color:red;"> Background</span><span
style="color:blue;">="White"\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">RichTextBox</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="RT1"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="110"</span><span
style="color:red;"> Margin</span><span
style="color:blue;">="25,22,188,0"</span> \
                     <span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top"</span> \
                     <span
style="color:red;"> **OverflowContentTarget**</span><span
style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> ElementName</span><span
style="color:blue;">=**RT2**}"/\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">**RichTextBoxOverflow**</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="**RT2**"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="104"</span> \
                             <span
style="color:red;"> Margin</span><span
style="color:blue;">="194,0,38,30"</span> \
                             <span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Bottom"/\></span>\
 <span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>

Yukarıdaki kod içerisinde de görebileceğiniz gibi ilk olarak sahnede
normal bir **RichTextBox** var. Elimizdeki tüm metni bu RichTextBox'a
veriyoruz. RichTextBox'ın içine sığmayan metnin otomatik olarak
**RichTextBoxOverflow** kontrolüne akmasını sağlamak için **Overflow**
kontrolünü normal RichTextBox'ın **OverflowContentTarget** özelliğine
bind ediyoruz. İşte bu kadar :)

![RichTextBoxOverflow'lar arka
arkaya...](media/Silverlight_5_Beta_da_Karater_Araligi_ve_RichTextboxOverflow/22042011_1.png)\
*RichTextBoxOverflow'lar arka arkaya...*

Bu şekilde istediğiniz kadar RichTextBoxOverflow kontrolünü birbirine
bağlayabilirsiniz. Metin sırası ile tüm kontrolü gezerek dağılacaktır /
akacaktır. Metnin puntosunu veya belki de karakter aralığını anime
ettiğinizde flow'un da değişiyor olması hoş bir manzara yaratmıyor desem
yalan olur :)

**[XAML]**

<span style="color:#a31515;">         </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">RichTextBox</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="RT1"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="110"</span><span
style="color:red;"> Margin</span><span
style="color:blue;">="25,22,188,0"</span> \
                     <span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top"</span> \
                     <span
style="color:red;"> OverflowContentTarget</span><span
style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> ElementName</span><span
style="color:blue;">=RT2}"/\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">RichTextBoxOverflow</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span style="color:blue;">="RT2"</span> \
                             <span
style="color:red;"> Margin</span><span
style="color:blue;">="185,145,47,51"</span>\
                             <span
style="color:red;"> OverflowContentTarget</span><span
style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> ElementName</span><span
style="color:blue;">=RT3}"/\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">RichTextBoxOverflow</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="RT3"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="104"</span> \
                             <span
style="color:red;"> Margin</span><span
style="color:blue;">="0,0,0,8"</span> \
                             <span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Bottom"</span> \
                             <span
style="color:red;"> HorizontalAlignment</span><span
style="color:blue;">="Left"</span><span
style="color:red;"> Width</span><span
style="color:blue;">="168"/\></span>

Eğer metin üzerinde bir selection editin veya font ile ilgili ayarlar
yapacaksanız tüm bu ayarları ilk RichTextBox üzerinden yapmanız
gerekiyor. Tüm bu ayarlar otomatik olarak gerektiğinde (Yani etilenen
metin kısmı diğer kontrollerin alanına denk geliyorsa)
**RichTextBoxOverFlow** kontrollerine aktarılacaktır.

Hepinize kolay gelsin ;)


