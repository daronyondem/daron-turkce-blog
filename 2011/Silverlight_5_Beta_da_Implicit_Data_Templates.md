# Silverlight 5 Beta'da Implicit Data Templates
Silverlight 5 Beta ile beraber gelen yeni özelliklerden biri de Implicit
Data Templates. Özelliğin güzelliğine gelmeden önce :) biraz elimizde
neler var ona bakalım.

Malum ListBox gibi kontrollerin **ItemTemplate'ini**
özelleştirebiliyoruz. **ItemTemplate** kabaca kontrol içerisinde
kontrole vereceğimiz nesne listesindeki her nesneyi görsel olarak temsil
edecek olan görsel tasarımı tanımlıyor.

**[XAML]**

<span style="color: #a31515;">     </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">ListBox</span><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="list\_Mesajlar"</span><span
style="color: red;"> HorizontalAlignment</span><span
style="color: blue;">="Left"</span><span
style="color: red;"> Margin</span><span
style="color: blue;">="24,18,0,17"</span><span style="color: red;"> \
    Width</span><span style="color: blue;">="131"</span><span
style="color: red;"> ItemTemplate</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">StaticResource</span><span
style="color: red;"> DataTemplate1</span><span
style="color: blue;">}"/\></span>

ItemTemplate editleme işlemini Expression Blend ile yaparsak Blend
otomatik olarak bir DataTemplate'i kontrolün Resources kolleksiyonuna
koyarak DataTemplate'e verdiğimiz ismi direk ListBox'ın ItemTemplate
özelliğine atıyor.

**[XAML]**

<span style="color:blue;">\<</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;"> </span><span style="color:red;">x:Key</span><span
style="color:blue;">=</span>"<span
style="color:blue;">DataTemplate1</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">d:DesignWidth</span><span
style="color:blue;">=</span>"<span style="color:blue;">318</span>"<span
style="color:blue;"> </span><span
style="color:red;">d:DesignHeight</span><span
style="color:blue;">=</span>"<span style="color:blue;">108</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Gönderen:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding GonderenAdi}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Alan:</span>"<span style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding AlanAdi}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Mesaj:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding Metin}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">\></span>

Yukarıdaki gördüğünüz basit bir **DataTemplate**. Tahmin edebileceğiniz
üzere **AlanAdi**, **GonderenAdi** ve **Metin** gibi Property'leri ile
nesnelerden oluşan bir kolleksiyonu göstermek için yaratılmış durumda.
Şimdi bir de kod tarafına göz atalım.

**[C\#]**

        <span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">Mesaj</span>\
         {\
            <span style="color:blue;">public</span> <span
style="color:blue;">string</span> Metin { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
         }\
        <span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">Mail</span> : <span
style="color:#2b91af;">Mesaj</span> \
         {\
            <span style="color:blue;">public</span> <span
style="color:blue;">string</span> GonderenMail { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
             <span style="color:blue;">public</span> <span
style="color:blue;">string</span> GonderenAdi { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
             <span style="color:blue;">public</span> <span
style="color:blue;">string</span> AlanMail { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
             <span style="color:blue;">public</span> <span
style="color:blue;">string</span> AlanAdi { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
         }\
        <span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">SMS</span> : <span
style="color:#2b91af;">Mesaj</span> \
         {\
            <span style="color:blue;">public</span> <span
style="color:blue;">string</span> GonderenNumara { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
             <span style="color:blue;">public</span> <span
style="color:blue;">string</span> AlanNumara { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
         }

Kodumuz içerisinde iki tip mesajımız var. SMS ve Mail adındaki bu mesaj
tipindeki nesneler Mesaj adında bir başka nesneden türetilmiştir. Bizim
istediğimiz ise tüm bu nesneleri alıp topluca ListBox'da gösterebilmek
ve duruma göre de eğer elde **Mail** varsa farklı bir DataTemplate,
**SMS** varsa farklı bir tasarım kullanmak.

**Karşınızda Implicit Data Templates**

Biraz önce karşılaştığımız sorunu çözebilmek için Implicit Data Template
kullanmamız şart. Peki nasıl olacak? İlk olarak elimizdeki Mesaj
listesini gönül rahatlığı ile ListBox'ın ItemsSource'una vereceğiz.
Listemizde Mail ve SMS'ler karşılık olarak duracaklar. Herhangi bir
sorun yok. DataTemplate'ler konusuna gelince ise ilk olarak Key ile
DataTemplate'i ListBox'a bağlamaktan vazgeçeceğiz. Sonra ise her
DataTemplate'e hangi tür veriyi göstereceklerine dair gerekli bilgiyi
vermemiz gerekecek.

**[XAML]**

<span style="color:blue;">\<</span><span
style="color:#a31515;">UserControl.Resources</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">** **</span><span
style="color:red;">**DataType**</span><span
style="color:blue;">**=**</span>"<span
style="color:blue;">**daron:Mesaj**</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">d:DesignWidth</span><span
style="color:blue;">=</span>"<span style="color:blue;">318</span>"<span
style="color:blue;"> </span><span
style="color:red;">d:DesignHeight</span><span
style="color:blue;">=</span>"<span style="color:blue;">108</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Gönderen:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding GonderenAdi}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Alan:</span>"<span style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding AlanAdi}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Mesaj:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding Metin}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \<</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;"> </span><span
style="color:red;">**DataType**</span><span
style="color:blue;">**=**</span>"<span
style="color:blue;">**daron:SMS**</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">    \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">d:DesignWidth</span><span
style="color:blue;">=</span>"<span style="color:blue;">318</span>"<span
style="color:blue;"> </span><span
style="color:red;">d:DesignHeight</span><span
style="color:blue;">=</span>"<span style="color:blue;">108</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Gönderen:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding GonderenNumara}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;"> </span><span
style="color:red;">Orientation</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Horizontal</span>"<span
style="color:blue;">\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Alan:</span>"<span style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">        \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding AlanNumara}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">Mesaj:</span>"<span
style="color:blue;"> </span><span
style="color:red;">Foreground</span><span
style="color:blue;">=</span>"<span
style="color:blue;">\#FF3F3F3F</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">      \<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:blue;"> </span><span
style="color:red;">TextWrapping</span><span
style="color:blue;">=</span>"<span style="color:blue;">Wrap</span>"<span
style="color:blue;"> </span><span style="color:red;">Text</span><span
style="color:blue;">=</span>"<span
style="color:blue;">{Binding Metin}</span>"<span
style="color:blue;">/\></span>\
 <span style="color:blue;">    \</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">  \</</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#a31515;">UserControl.Resources</span><span
style="color:blue;">\></span>

Yukarıda iki farklı DataTemplate görüyorsunuz. DataType özelliklerinden
de anlayabileceğiniz bu arkadaşlar iki farklı nesne tipini
hedefliyorlar. Bu arada tabi C\# kodunda tanımladığım nesneleri XAML'a
alabilmek için XML NameSpace tanımımızı da koymayı unutmamalıyız.

**[XAML]**

<span style="color: gray;">
\<UserControl x:Class="SilverlightApplication10.MainPage"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>\
             <span style="color:red;"> xmlns</span><span
style="color:blue;">:</span><span style="color:red;">daron</span><span
style="color:blue;">="clr-namespace:SilverlightApplication10"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> mc:Ignorable="d"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> d:DesignHeight="300" d:DesignWidth="400"\></span>

Bu şekli ile örneği çalıştırdığınızda ListBox'a verdiğiniz farklı
mesajlardan, yani SMS ve Mail'lerden oluşan listenin başarılı bir
şekilde ListBox tarafından gösterildiğini göreceksiniz. Listedeki her
SMS için uygun SMS'lere bağladığımız DataTemplate her Mail için de Mail
nesnesi ile eşleştirdiğimiz DataTemplate kullanılıyor olacak.

**Sorun olabilir!**

Diyelim ki aynı UserControl içerisinde bir de Combobox var ve şansa
bakın ki Combobox'da Mail veya SMS tipinde nesneler gösteriyor :) İşte
dağıldığımız noktadır :) DataTemplate'ler ayrı ayrı isimlerle ListBox'a
bağlamadığımız ve bir anlamda ortada bıraktığımız için Combobox da aynı
DataTemplate'leri kullanacak.

![Ortalık karışmış gibi
duruyor...](media/Silverlight_5_Beta_da_Implicit_Data_Templates/25042011_1.jpg)\
*Ortalık karışmış gibi duruyor...*

Bu durumu engellemenin yolu DataTemplate'leri doğrudan ListBox'ın içine
gömmek. Böylece bu DataTemplate'ler sadece o ListBox için geçerli
olacaktır.

**[XAML]**

<span style="color:#a31515;">         </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ListBox</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="list\_Mesajlar"</span> \
                 <span style="color:red;"> Margin</span><span
style="color:blue;">="24,18,119,17"\></span>\
 <span style="color:#a31515;">     **       **</span><span
style="color:blue;">**\<**</span><span
style="color:#a31515;">**ListBox.Resources**</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:red;"> DataType</span><span
style="color:blue;">="daron:Mesaj"\></span>\
 <span style="color:#a31515;">                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> d</span><span style="color:blue;">:</span><span
style="color:red;">DesignWidth</span><span
style="color:blue;">="318"</span><span style="color:red;"> d</span><span
style="color:blue;">:</span><span
style="color:red;">DesignHeight</span><span
style="color:blue;">="108"\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> Orientation</span><span
style="color:blue;">="Horizontal"\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Gönderen:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> GonderenAdi</span><span
style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> Orientation</span><span
style="color:blue;">="Horizontal"\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Alan:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> AlanAdi</span><span
style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Mesaj:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> Metin</span><span style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:red;"> DataType</span><span
style="color:blue;">="daron:SMS"\></span>\
 <span style="color:#a31515;">                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> d</span><span style="color:blue;">:</span><span
style="color:red;">DesignWidth</span><span
style="color:blue;">="318"</span><span style="color:red;"> d</span><span
style="color:blue;">:</span><span
style="color:red;">DesignHeight</span><span
style="color:blue;">="108"\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> Orientation</span><span
style="color:blue;">="Horizontal"\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Gönderen:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> GonderenNumara</span><span
style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> Orientation</span><span
style="color:blue;">="Horizontal"\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Alan:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> AlanNumara</span><span
style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="Mesaj:"</span><span
style="color:red;"> Foreground</span><span
style="color:blue;">="\#FF3F3F3F"/\></span>\
 <span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> TextWrapping</span><span
style="color:blue;">="Wrap"</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> Metin</span><span style="color:blue;">}"/\></span>\
 <span style="color:#a31515;">                    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">                </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">DataTemplate</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">        **    **</span><span
style="color:blue;">**\</**</span><span
style="color:#a31515;">**ListBox.Resources**</span><span
style="color:blue;">\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">ListBox</span><span style="color:blue;">\></span>

Normalde bir DataTemplate'i ListBox'ın içine gömmek için
**Listbox.ItemTemplate** diyerek bir XML elementi açar ve aslında hem
Resource'u ListBox içine koymuş hem de gerekli Property'si set etmiş
olurduk. Bu sefer birden çok **DataTemplate** olacağı için hepsini alıp
**Resource** olarak ListBox'ın içine koyuyoruz. ListBox yine her zamanki
gibi **DataType'ın** göre uygun Template'i seçerken ekrandaki diğer
hiçbir kontrol bu DataTemplate'lere ulaşamayacaktır.

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2011-4-26 tarihinde yayinlanmistir.*
