---
FallbackID: 2350
Title: Silverlight 3.0 içerisinde DataForm kullanımı.
PublishDate: 15/4/2009
EntryID: Silverlight_3_0_icerisinde_DataForm_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: a9c82093-92f2-41af-b020-a205200e0d96
---
DataForm kontrolüne hızlı bir şekilde göz atıldığında aslında
ASP.NET'teki DetailsView kontrolüne benzetilebilir. Bu önyargı ile
hızlıca konumuza giriş yaparken gelin ilk olarak bir Silverlight 3
projesine nasıl DataForm kontrolünü ekleyebiliriz inceleyelim.

**DataForm kontrolü sahnede...**

DataForm kontrolü Silverlight ile beraber gelen harici kontrollerden
biri. Yani DataForm kontrolü Silverlight 3'ün RunTime'ında bulunmuyor.
Öyle hemen istediğimiz yerde anında kullanamıyoruz. Eğer bizim
uygulamamız bu kontrolü kullanmak istiyorsa ona ait DLL'i referans
alarak kendi XAP dosyası içerisinde taşımak zorunda. Tabi bu harici
DLL'ler ile ilgili cachleme vs işlemleri de mümkün fakat bu konuda
makalemizin şimdilik dışında.

Durum böyle ise DataForm kontrolünü kullanabilmek için hemen  Visual
Studio içerisinde yeni bir SL 3.0 projesi yaratıp projemize sağ
tıklayarak "Add Reference" diyip
**System.Windows.Controls.Data.DataForm**'ı referans olarak eklemeliyiz.
Böylece artık bu DLL içerisindeki kontrolleri kullanabiliriz. Fakat daha
işimiz bitmedi. Projemize eklemiş olduğumuz bu Assembly içerisindeki
kontrolleri XAML tarafında veya Blend 3 içerisinde kullanabilmemiz için
ayrıca XAML tarafına da DLL'imizi tanıtmamız gerekiyor.

**[XAML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Class</span><span
style="color: blue;">="SilverlightApplication10.MainPage"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>

   <span style="color: red;"> xmlns</span><span
style="color: blue;">:</span><span style="color: red;">x</span><span
style="color: blue;">="http://schemas.microsoft.com/winfx/2006/xaml"</span>

   <span style="color: red;"> Width</span><span
style="color: blue;">="400"</span><span style="color: red;">
Height</span><span style="color: blue;">="300"</span>

   <span style="color: red;"> **xmlns**</span><span
style="color: blue;">**:**</span><span
style="color: red;">**dataControls**</span><span
style="color: blue;">**="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data.DataForm"** \></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">Grid</span><span style="color: red;">
x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="LayoutRoot"</span><span style="color: red;">
Background</span><span style="color: blue;">="White"\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**dataControls**</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span><span style="color: blue;"><span
style="color: red;"> x</span><span style="color: blue;">:</span><span
style="color: red;">Name</span><span
style="color: blue;">="birDataForm"</span>\>\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz şekli ile DLL'imizi **dataControls** adı altında
XAML tarafına da aldık. Sonrasında da içerisinde bulunduğumuz sayfadaki
Grid'in içine yine **dataControls** XML namespace'i üzerinden giderek
Assembly içerisinde **DataForm** sınıfından bir instance alıyoruz. Artık
sahnede bir DataForm var. Tüm bu işlemleri otomatik olarak yapmak
isterseniz Visual Studio içerisinde XAML dosyasını açarak araç
çubuğundan da DataForm kontrolünü sürükleyip sahneye bırakabilirsiniz.
Visual Studio sizin için otomatik olarak DLL'i referans alıp gerekli
XAML tanımlamalarını da yapacaktır. Bu noktada ufak bir detaya dikkat
çekmek istiyorum. Şu an Silverlight 3.0 Beta olduğu için Visual Studio
içerisinde designer tarafında desteği biraz zayıf. O nedenle araç
çubuğundan herhangi bir kontrolü XAML dosyanıza sürükleyip bırakmak
isterseniz sadece kod tarafına bırakabileceğinizi söylemem gerek.

**Hemen bir veri bağlayalım!**

Kontrolümüz artık sahnede olduğuna göre hemen bir veri bağlayarak neler
yapabiliyoruz göz atalım. İlk olarak bağlayacağımız veriyi temsil edecek
olan sınıfımızı yaratalım.

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Entities

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> **Urun**

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Adi**() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PAdi

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                PAdi = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> **Satis**() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Entities</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

        {

            <span style="color: blue;">private</span> <span
style="color: blue;">string</span> PAdi;

            <span style="color: blue;">public</span> <span
style="color: blue;">string</span> **Adi**

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PAdi; }

                <span style="color: blue;">set</span> { PAdi = <span
style="color: blue;">value</span>; }

            }

 

            <span style="color: blue;">private</span> <span
style="color: blue;">double</span> PSatis;

            <span style="color: blue;">public</span> <span
style="color: blue;">double</span> **Satis**

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PSatis; }

                <span style="color: blue;">set</span> { PSatis = <span
style="color: blue;">value</span>; }

            }

        }

    }

Gördüğünüz gibi sınıfımızın adı **Urun** ve içerisinde de iki adet
farklı Property var. Bu sınıfımızdan yola çıkarak birden çok **Urun**
yaratıp bunları da DataForm kontrolümüze veri kaynağı olarak vereceğiz.
Ama gelin bunun öncesinde tek bir Urun sınıfı yaratarak **DataForm'a**
verelim bakalım neler yapacak.

**[VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        birDataForm.CurrentItem = <span style="color: blue;">New</span>
Entities.Urun() <span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi"</span>, .Satis = 20}

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span>  MainPage\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            birDataForm.CurrentItem = <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün Adi"</span>, Satis = 20 };

        }

Daha önceden XAML tarafında yaratmış olduğumuz DataForm kontrolüne isim
olarak **birDataForm** ismini verdiğimiz için kod tarafında da aynı
isimle ulaşıp şimdilik DataForm'un **CurrentItem** özelliğine yeni bir
nesne atıyoruz. Söz konusu nesne daha önce tanımlamış olduğumuz **Urun**
sınıfının bir instance'ı.

![DataForm içerisinde tek bir kaydın
düzenlenmesi.](http://cdn.daron.yondem.com/assets/2350/15042009_1.gif)\
*DataForm içerisinde tek bir kaydın düzenlenmesi*

Gördüğünüz üzere **DataForm** otomatik olarak kendisine bağlanan veri
içerisinde tüm Property'ler için hem Textblock ve Textbox'lar
yerleştirebiliyor hem de söz konusu Property'lerin adlarını da yanına
yazarak aslında kabaca bir veri giriş ve düzenleme ekranı oluşturuyor.
DataForm içerisinde sol üstte bulunan Edit düğmesine tıklarsanız ortaya
veriyi düzenleyebileceğiniz bir ekran gelirken "Save" düğmesi de hemen
altta kendini gösteriyor. Tabi ki bu aşamadan sonra özelleştirilmesi
gereken birçok nokta var. İşte biz de makalemizin devamında bu noktalara
değineceğiz.

**MetaData aşkı!**

Eğer ASP.NET Dynamic Data projeleri üzerine biraz çalışma şansınız
olduysa veri kaynağı olarak kullanılan sınıflara verilen MetaData'lar
ile beraber birçok şeyin ayarlanabildiğini hatırlayacaksınız. DataForm
ile beraber çalışırken de aslında çoğu kuralı MetaData'lar ile
DataForm'a bağlayacağımız veri kaynağı seviyesinde ayarlamamız
gerekiyor. Örneğin yukarıdaki projemizde Urun adındaki nesnemizi
tanımlarken **Adi** ve **Satis** Property'lerinde tabi ki Türkçe
karakterler kullanmadık. Oysa DataForm bu Property'leri istemci tarafına
açarken belki de Türkçe karakterler de içeren düzgün isimleri açmalı
değil mi?

**[VB]**

<span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Entities

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        **\<System.ComponentModel.DataAnnotations.Display(Name:=**<span
style="color: #a31515;">"**Adı"**</span>**)\> \_**

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PAdi

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                PAdi = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        **\<System.ComponentModel.DataAnnotations.Display(Name:=**<span
style="color: #a31515;">"**Satış"**</span>**)\> \_**

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Entities</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

        {

 

            <span style="color: blue;">private</span> <span
style="color: blue;">string</span> PAdi;

            **[System.ComponentModel.DataAnnotations.**<span
style="color: #2b91af;">**Display**</span>**(Name =** <span
style="color: #a31515;">"**Adı"**</span>**)]**

            <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PAdi; }

                <span style="color: blue;">set</span> { PAdi = <span
style="color: blue;">value</span>; }

            }

 

            <span style="color: blue;">private</span> <span
style="color: blue;">double</span> PSatis;

        **    [System.ComponentModel.DataAnnotations.**<span
style="color: #2b91af;">**Display**</span>**(Name =** <span
style="color: #a31515;">"**Satış"**</span>**)]**

            <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Satis

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PSatis; }

                <span style="color: blue;">set</span> { PSatis = <span
style="color: blue;">value</span>; }

            }

 

        }

    }

Yukarıdaki kod içerisinde Urun sınıfımızı tanımlarken neleri
değiştirediğimize dikkat edelim. Her bir Property'i tanımlarken bir de
MetaData veriyoruz. **System.ComponentModel.DataAnnotations** sınıfı
altında kullanabileceğiniz bir çok farklı MetaData'yı bulabilirsiniz.
Bunların bazılarına makalemiz içerisinde göz atacağız. Şu an için
**Display** MetaData'sını vererek söz konusu Property'lerin **DataForm**
tarafından hangi isimle gösterilmesi gerektiğini belirtiyoruz. Tabi ki
bu noktada istediğimiz gibi Türkçe karakterler kullanabiliriz. Bundan
sonraki örnek kodlarda **Urun** sınıfının tüm tanımını değil sadece
**MetaData** koyduğumuz satırların etrafını yazacağım.

**[VB]**

        \<System.ComponentModel.DataAnnotations.Display(Name:=<span
style="color: #a31515;">"Satış"</span>, Description:=<span
style="color: #a31515;">"Bu satış değeridir"</span>)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

Yukarıdaki şekli ile tanımlanan bir Display MetaData'sında ek olarak bir
de Description verisi bulunuyor. Bu parametreye herhangi bir değer
verilmesi halinde DataForm içerisinde bu Property'nin yanında bir ünlem
işareti belirecektir. Kullanıcılar söz konusu ünlem işaretinin üzerine
fareleri ile geldiklerinde ise açıklamanızı görebilirler.

![MetaData içerisinde Description yer
alırsa...](http://cdn.daron.yondem.com/assets/2350/15042009_2.gif)\
*MetaData içerisinde Description yer alırsa...*

Şu ana kadar yaptığımız işlemlerin hepsinde belki de en sinir bozucu
noktalardan biri DataForm içerisinde tüm Property'lerin sınıf
tanımındaki sıra ile gösteriliyor olmasıdır. Aslında bu sırayı da
değiştirebiliyoruz.

**[VB]**

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        \<System.ComponentModel.DataAnnotations.Display(**Order:=1**)\>
\_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PAdi

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                PAdi = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        \<System.ComponentModel.DataAnnotations.Display(Name:=<span
style="color: #a31515;">"Satış"</span>, Description:=<span
style="color: #a31515;">"Bu satış değeridir"</span>, **Order:=0)\> \_**

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

Display MetaData'sını tanımlarken verebileceğiniz **Order** parametresi
doğrudan bu Property'lerin hangi sıra ile DataForm içerisinde
gösterileceğini belirliyor. Sıfırdan başlayarak vereceğiniz bu sayılarla
küçükten büyüğe doğru gidecek sırada Property'ler ekrana getirilecektir.
Bizim örneğimizde üstte **Satis** altta **Adi** parametreleri yer
alıyor.

**Binding yollarında...**

İlk örneğimizde DataForm'a bağladığımız nesne kod tarafında içerisinde
bulunduğu scope dışında yaşayamayacağı için pek anlamlı bir örnek
olmamıştı. DataForm içerisinde edit işlemi yapılsa da söz konusu bağlı
değişken arkada yaşamadığı için edit işleminin de anlamı kalmıyor. Fakat
eğer DataForm'a bağladığınız değişkenleri kod tarafında sürekli canlı
tutarsanız DataForm içerisindeki değişikliklerin doğrudan nesneye
yansıtıldığını da görebilirsiniz. Duruma göre bu işlevselliği
değiştirmek veya bazen arka taraftaki nesnede bulunan bazı Property'leri
DataForm içerisinde göstermemek de isteyebilirsiniz. Örneğin bizim Urun
nesnesinin bir PK property'si olsaydı kesin onu göstermek istemezdir.

**[VB]**

        \<System.ComponentModel.Bindable(<span
style="color: blue;">False</span>)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

Yukarıdaki gibi herhangi bir Property'yi doğrudan Bindable False olarak
işaretleyebilirsiniz. Böylece söz konusu Property hiçbir şekilde bağlı
olduğu kontroller tarafından gösterilmeyecektir. Diğer yandan bu
Property'nin gösterilmesi fakat değerinin değiştirilemesini isterseniz
bu sefer de aşağıdak şekilde Bindable'a ikinci bir parametre vererek tek
yönlü veri bağlantısı oluşturabilirsiniz.

**[VB]**

        \<System.ComponentModel.Bindable(<span
style="color: blue;">True</span>,
ComponentModel.BindingDirection.OneWay)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

Yukarıdaki şekli ile bu Property DataForm'un edit modunda gözükse de
değeri değiştirilemeyecektir.

**Ya Validation gerekirse?**

Belki de DataForm kontrolünün en can alıcı noktalarından biri tüm
validasyon işlemlerini de kısmen MetaData üzerinden yapabiliyor olmamız.
Örneğin bazı Property'lerin kullanıcı tarafından boş geçilememesini
isteyebilirsiniz. Bu ve bu gibi tüm Validation işlemleri için yine
**System.ComponentModel.DataAnnotations** sınıfı altındaki tanımlardan
faydalanabiliriz.

**[VB]**

       
\<System.ComponentModel.DataAnnotations.**Required**(**ErrorMessage**:=<span
style="color: #a31515;">"Boş geçilemez"</span>)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

Yukarıdaki örnek kodda da görebileceğiniz üzere **Required** olarak
işaretlediğimiz **Adi** Property'sine bir de **ErrorMessage** vermişiz.
DataForm kontrolü bu Property ile ilgili gerekli validasyonları yapmakla
kalmayacak, herhangi bir sorun olduğunda MetaData içerisinde
tanımladığımız hatayı da güzel bir şekilde kullanıcıya gösterecek.

![Basit bir validasyon
örneği!](http://cdn.daron.yondem.com/assets/2350/15042009_3.gif)\
*Basit bir validasyon örneği!*

Validasyon yöntemlerinden bazıları bir önceki örneğimizdeki gibi hazır
bir şekilde tanımlanmış bizim kullanımızı bekliyor. Bunlardan biri de
doğrudan sayısal değerlerin alabilecekleri değer aralığını kontrol eden
**Range** sınıfı.

**[VB]**

        \<System.ComponentModel.DataAnnotations.**Range**(1, 10,
ErrorMessage:=<span style="color: #a31515;">"Aman!"</span>)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

Range MetaData'sını biz örneğimizde anlamlı olması açısından **Satis**
Property'sine verelim. Artık yukarıdaki tanımlama ile beraber Satis
Property'si kesinlikle 1 ile 10 arasında olmak zorunda. Aksi durumda
MetaData içerisinde tanımladığımız **ErrorMessage** kullanıcıya
gösterilecektir.

**[VB]**

        \<System.ComponentModel.DataAnnotations.StringLength(10)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

Hazır gelen kontrollerden biri de StringLenght kontrolü. Bu MetaData ile
beraber söz konusu Property'e atanabilecek metin uzunluğunun en yüksek
değerini tanımlamış oluyoruz. Böylece kullanıcılar daha yüksek değerler
girdiğinde eğer tanımlanmış ise özel hata mesajları da gösterilebiliyor.

Eğer isterseniz tüm bu validasyonların yanı sıra daha karmaşık
**RegularExpression** yapıları da kullanabilirsiniz. Bizim örneğimizde
varsayalım ki kullanıcıların ürünlere isim verirken hep büyük harf ile
başlamalarını istiyoruz. Bu durumda aşağıdaki gibi bir RegEx
tanımlamasını işimizi görecektir.

**[VB]**

       
\<System.ComponentModel.DataAnnotations.**RegularExpression**(<span
style="color: #a31515;">"\^[A-Z]+[a-zA-Z]\*\$"</span>,
ErrorMessage:=<span style="color: #a31515;">"Büyük harfle
başlamalı"</span>)\> \_

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

**Hardcore Validasyon?**

Bazı durumlarda validasyon ile ilgili RegEx'ler de işinizi görmeyebilir.
Bizim örneğimizde bu duruma uygun anlamlı bir senaryo yaratmak zor olsa
da diyelim ki ürünlerimiz A harfi ile başlıyorsa fiyatlarının kesinlikle
10 ile 20 arasında olması gerekiyor. Bu senaryoyu gerçek hayata taşırken
aslında farklı Property'lerin farklı iş kuralları ile kontrol edilmesi
gerektiğini de düşünebilirsiniz. Böyle bir durumda tamamen farklı bir
mekanizma kullanabilmek için **CustomValidation** yapısı bizi bekliyor.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Kontrol

        <span style="color: blue;">Public</span> <span
style="color: blue;">Shared</span> <span
style="color: blue;">Function</span> UrunKontrol(<span
style="color: blue;">ByVal</span> BirUrun <span
style="color: blue;">As</span> Urun) <span
style="color: blue;">As</span> <span style="color: blue;">Boolean</span>

            <span style="color: blue;">If</span>
BirUrun.Adi.StartsWith(<span style="color: #a31515;">"A"</span>) <span
style="color: blue;">Then</span>

                <span style="color: blue;">If</span> BirUrun.Satis \> 10
<span style="color: blue;">And</span> BirUrun.Satis \< 20 <span
style="color: blue;">Then</span>

                    <span style="color: blue;">Return</span> <span
style="color: blue;">True</span>

                <span style="color: blue;">Else</span>

                    <span style="color: blue;">Return</span> <span
style="color: blue;">False</span>

                <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

            <span style="color: blue;">Else</span>

                <span style="color: blue;">Return</span> <span
style="color: blue;">True</span>

            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Function</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Kontrol</span>

    {

        <span style="color: blue;">public</span> <span
style="color: blue;">static</span> <span
style="color: blue;">bool</span> UrunKontrol(Urun BirUrun)

        {

            <span style="color: blue;">if</span>
(BirUrun.Adi.StartsWith(<span style="color: #a31515;">"A"</span>))

            {

                <span style="color: blue;">if</span> (BirUrun.Satis \>
10 & BirUrun.Satis \< 20)

                {

                    <span style="color: blue;">return</span> <span
style="color: blue;">true</span>;

                }

                <span style="color: blue;">else</span>

                {

                    <span style="color: blue;">return</span> <span
style="color: blue;">false</span>;

                }

            }

            <span style="color: blue;">else</span>

            {

                <span style="color: blue;">return</span> <span
style="color: blue;">true</span>;

            }

        }

    }

Yukarıdaki gördüğünüz kod içerisinde **Kontrol** adında bir sınıfın
içinde Shared / Static olarak tanımlanmış bir Validasyon metodu
bulunuyor. Metod aslında alıştığımız .NET metodlarından farklı değil.
**UrunKontrol** adını verdiğimiz bu metod kendisine parametre olarak
verilen bir **Urun** nesnesini kontrol ederek geriye **True** veya
**False** şeklinde Valid / Uygundur veya InValid / Uygun Değildir mesajı
döndürmüş oluyor. Bu hazırladığımız validasyon metodunun herhangi bir
Urun nesnesine uygulanması için ise **Urun** nesnesinin tanımına ufak
bir MetaData eklemesi yeterli olacaktır.

**[VB]**

    \<System.ComponentModel.DataAnnotations.CustomValidation(<span
style="color: blue;">GetType</span>(Kontrol), <span
style="color: #a31515;">"UrunKontrol"</span>, ErrorMessage:=<span
style="color: #a31515;">"Olmadı!"</span>)\> \_

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

**[C\#]**

    [System.ComponentModel.DataAnnotations.<span
style="color: #2b91af;">CustomValidation</span>(<span
style="color: blue;">typeof</span>(<span
style="color: #2b91af;">Kontrol</span>), <span
style="color: #a31515;">"UrunKontrol"</span>, ErrorMessage = <span
style="color: #a31515;">"Olmadı!"</span>)]

    <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span>

    {

    }

**CustomValidation** olarak tanımladığımız bu kontrol mekanizmasını
sınıfımıza bağlarken ilk olarak validasyon yapacak olan sınıfın tipini
veriyoruz. Sonrasında bu sınıf içerisinde hangi metodun kullanılacağını
bir String parametre olarak verip bir de eğer istiyorsak validasyon
işlemi **False** döndürdüğünde gösterilmek üzere **ErrorMessage**
ayarlıyoruz. İsterseniz bu mekanizmayı sınıf bazında değil doğrudan
Property bazında da kurabilirsiniz.

**Herşey kontrol altında...**

Tüm bahsettiğimiz validasyon sistemlerine ek olarak bazen bir ürün
düzenlenmesi ile ilgili istemci tarafında DataForm ile yaratılan
süreçlere müdahale etmek de isteyebilirsiniz. Örneğin bir ürün
kaydedilirken adı boş ise belki ona varsayılan bir isim vermek
isteyeceksiniz veya bir ürünün kayıt moduna geçildikten sonra herhangi
bir değişiklik yapılmadan kayıt modundan çıkılmasını engellemek de
isteyebilirsiniz. Bu gibi daha birçok senaryo olabilir.

**[VB]**

    <span style="color: blue;">Public</span> <span
style="color: blue;">Class</span> Urun

        <span style="color: blue;">Implements</span>
ComponentModel.**IEditableObject**

 

        <span style="color: blue;">Private</span> PAdi <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Adi() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PAdi

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                PAdi = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Private</span> PSatis <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

        <span style="color: blue;">Public</span> <span
style="color: blue;">Property</span> Satis() <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> PSatis

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">Double</span>)

                PSatis = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

 

        <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> **BeginEdit**() <span
style="color: blue;">Implements</span>
System.ComponentModel.IEditableObject.BeginEdit

 

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

        <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> **CancelEdit**() <span
style="color: blue;">Implements</span>
System.ComponentModel.IEditableObject.CancelEdit

 

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

 

        <span style="color: blue;">Public</span> <span
style="color: blue;">Sub</span> **EndEdit**() <span
style="color: blue;">Implements</span>
System.ComponentModel.IEditableObject.EndEdit

 

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

**[C\#]**

        <span style="color: blue;">public</span> <span
style="color: blue;">class</span> <span
style="color: #2b91af;">Urun</span> : <span style="color: #2b91af;">
**IEditableObject**</span>

        {

            <span style="color: blue;">private</span> <span
style="color: blue;">string</span> PAdi;

            <span style="color: blue;">public</span> <span
style="color: blue;">string</span> Adi

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PAdi; }

                <span style="color: blue;">set</span> { PAdi = <span
style="color: blue;">value</span>; }

            }

 

            <span style="color: blue;">private</span> <span
style="color: blue;">double</span> PSatis;

            <span style="color: blue;">public</span> <span
style="color: blue;">double</span> Satis

            {

                <span style="color: blue;">get</span> { <span
style="color: blue;">return</span> PSatis; }

                <span style="color: blue;">set</span> { PSatis = <span
style="color: blue;">value</span>; }

            }

 

            <span style="color: blue;">public</span> <span
style="color: blue;">void</span> **BeginEdit**()

            {

                <span style="color: blue;">throw</span> <span
style="color: blue;">new</span> <span
style="color: #2b91af;">NotImplementedException</span>();

            }

 

            <span style="color: blue;">public</span> <span
style="color: blue;">void</span> **CancelEdit**()

            {

                <span style="color: blue;">throw</span> <span
style="color: blue;">new</span> <span
style="color: #2b91af;">NotImplementedException</span>();

            }

 

            <span style="color: blue;">public</span> <span
style="color: blue;">void</span> **EndEdit**()

            {

                <span style="color: blue;">throw</span> <span
style="color: blue;">new</span> <span
style="color: #2b91af;">NotImplementedException</span>();

            }

        }

Kendi sınıfınıza **IEditableObject** interface'ini implemente ettiğiniz
anda artık sınıfınızın **BeginEdit**, **CancelEdit** ve **EndEdit** gibi
durumları olacak. Bu durumlara dair kod bloklarına yazacağınız kodlar
edit işlemi başladığında, iptal edildiğinde veya bittiğinde
çalıştırılacaktır. Böylece siz de bu süreçlerde nesne ile ilgili
değişiklikleri rahatlıkla yapabilirsiniz.

**Çoklu kayıt desteği de var.**

**DataForm** kontrolünü epey karıştırmış olsak da aslında hiç
bakmadığımız bir özelliği var. Örneklerimizin başından beridir sadece
tek bir nesne yarattık ve **DataForm'un** **CurrentItem'ına** atadık.
Oysa **DataForm** kontrolünün **ItemsSource'una** da birden çok nesne
içeren listeler bağlanabilir.

** [VB]**

    <span style="color: blue;">Private</span> <span
style="color: blue;">Sub</span> MainPage\_Loaded(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Windows.RoutedEventArgs) <span
style="color: blue;">Handles</span> <span
style="color: blue;">Me</span>.Loaded

        <span style="color: blue;">Dim</span> liste <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.ObjectModel.ObservableCollection(<span
style="color: blue;">Of</span> Entities.Urun)

        liste.Add(<span style="color: blue;">New</span> Entities.Urun()
<span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi"</span>, .Satis = 20})

        liste.Add(<span style="color: blue;">New</span> Entities.Urun()
<span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi2"</span>, .Satis = 30})

        liste.Add(<span style="color: blue;">New</span> Entities.Urun()
<span style="color: blue;">With</span> {.Adi = <span
style="color: #a31515;">"Ürün Adi3"</span>, .Satis = 40})

        birDataForm.ItemsSource = liste

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

        <span style="color: blue;">void</span> MainPage\_Loaded(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">RoutedEventArgs</span> e)

        {

            System.Collections.ObjectModel.<span
style="color: #2b91af;">ObservableCollection</span>\<<span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span>\> liste = <span
style="color: blue;">new</span> System.Collections.ObjectModel.<span
style="color: #2b91af;">ObservableCollection</span>\<<span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span>\>();

            liste.Add(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün Adi"</span>, Satis = 20 });

            liste.Add(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün Adi2"</span>, Satis = 30 });

            liste.Add(<span style="color: blue;">new</span> <span
style="color: #2b91af;">Entities</span>.<span
style="color: #2b91af;">Urun</span> { Adi = <span
style="color: #a31515;">"Ürün Adi3"</span>, Satis = 40 });

            birDataForm.ItemsSource = liste;

        }

Kodumuzda bu sefer tamamen deneme amaçlı olarak içerisinde birden çok
**Urun** bulunan bir **ObservableCollection** kullanıyoruz. Uygulamamızı
çalıştırdığımıda **DataForm** kontrlünün sağ üstünde navigasyon
kontrolleri de yerini alıyor. Böylece artık **DataForm** kontrolü
içerisinde birden çok nesnenin de gezilerek düzenlenebileceğini görmüş
olduk.

![Çoklu kayıt düzenleme
ekranı.](http://cdn.daron.yondem.com/assets/2350/15042009_4.gif)\
*Çoklu kayıt düzenleme ekranı.*

Yukarıdaki ekran görüntüsünde sağ üst köşede gördüğünüz düğmeler sadece
kayıtlar arasında gezintiyi sağlamıyor. Ayrıca bulunan kaydın
düzenlenebilmesinin yanı sıra yeni bir kayıt eklenebilmesini hatta
silinebilmesini de sağlayabiliyorlar. Hali hazırda nesnemize bir
**ObservableCollection** bağladığımız için zaten tüm değişiklikler
otomatik olarak nesneye de yansıyacaktır.

**AutoGenerateFields ?**

Sanırım ASP.NET ile biraz uğraşan herkes AutoGenerateFields deyince ne
demek istediğimi anlayacaktır. Bir DataForm'un normal şartlarda
kendisine verdiğimiz veriye uygun şekilde gerekli TextBox vs kayıt
düzenleme kontrollerini otomatik olarak yaratmasını sağlayan özellik
AutoGenerateFields'in varsayılan değeri olan "True" değerinde saklı.
Eğer **AutoGenerateFields** özelliğini **False** olarak ayarlarsanız
artık veri kaynağından gelen her verinin ne şekilde görsel ekrana
yansıtılacağını tek tek sizin ayarlamanız gerekecektir. Tabi bu durum da
bazı senaryolarda özelleştirme adına şart oluyor. Şimdi gelin bu konunun
detaylarına bakalım.

**[XAML]**

<span style="color: #a31515;">        </span> <span
class="style1_15042009">\<dataControls:DataForm</span><span
style="color: red;"> AutoGenerateFields</span><span
style="color: blue;">="False"</span><span style="color: red;"> </span>
<span class="style1_15042009"> x:Name="birDataForm"\></span>

<span class="style1_15042009">           
\<dataControls:DataForm.Fields</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormCheckBoxField</span><span
style="color: blue;"> /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormComboBoxField</span><span
style="color: blue;"> /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormDateField</span><span
style="color: blue;"> /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTemplateField</span><span
style="color: blue;"> /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTextField</span><span
style="color: blue;"> /\></span>

            \</dataControls:DataForm.Fields\>

<span class="style1_15042009">       
\</dataControls:DataForm</span><span style="color: blue;">\></span>

Yukarıdaki kod çalışır bir kod olmayacaktır. Fakat kabaca bir
DataForm'un içerisinde gösterilecek verilerin ayarlanması ile ilgili
kullanabileceğimiz Field tiplerini ve DataForm içerisine nasıl
yerleştirebileceğimizi inceleyebilirsiniz. Bu Field tiplerinin her biri
aslında farklı veri tiplerini hedefliyorlar. Örneğin **CheckBoxField**
**Boolean** tipindeki verilerin gösterimi için rahatlıkla
kullanılabilirken **TextField** ise metin tabanlı ve özünde TextBox
olarak gösterilecek verileri temsil edecektir. Eğer bu Field tipleri
size yeterli gelmiyorsa ve kendi özel Field tasarımınızı yaratmak
istiyorsanız bu sefer de **DataFormTemplateField'i** kullanabilirsiniz.

**[XAML]**

<span style="color: #a31515;">       </span><span
class="style1_15042009"> \<dataControls:DataForm</span>

           AutoGenerateFields="False"

           x:Name="birDataForm"\>

<span class="style1_15042009">           
\<dataControls:DataForm.Fields</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTextField</span>

                   <span style="color: red;">
FieldLabelContent</span><span style="color: blue;">="Kayıt Adı"</span>

                   <span style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTextField</span>

                   <span style="color: red;">
FieldLabelContent</span><span style="color: blue;">="Satış
Sayısı"</span>

                   <span style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Satis</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">            </span> <span
class="style1_15042009">\</dataControls:DataForm.Fields\></span>

<span class="style1_15042009">       
\</dataControls:DataForm</span><span style="color: blue;">\></span>

Bir önceki adımda veri bağlantısını da yaptığımız DataForm üzerinden
ilerlersek ilk olarak **AutoGenerateFields** özelliğini **False** olarak
ayarlayıp sonrasında da iki tane **TextField** ekliyoruz. Her bir
**TextField'in** veri kaynağından hangi veriyi alıp göstereceğini
belirlemek için tabi ki veri kaynağımız olan nesnelerin property'lerine
ait adları vermemiz gerekiyor. Bu aşamada her bir Field'in **Binding**
özelliğine bir Binding atıyoruz ve **Property** adı ile veri
bağlantısını da tamamlıyoruz. Son olarak yine her bir TextField'e de
**FieldLabelContent** vererek bu Field'ler için yaratılacak
TextBox'ların yanına konacak Label'ların da içeriğini belirlemiş
oluyoruz. Ayrıca isterseniz **FieldLabelPosition** gibi Field'lere ayrı
farklı özellikleri de değiştirerek ana görsel öğelerin dizilimine
müdahale edebilirsiniz.

Eğer DataForm kontrolüne bağladığınız nesnelerin çok sayıda Property'si
varsa bunları belirli gruplar ve altbaşlıklar ile de göstermek
isteyebilirsiniz. Bunun için **DataFormFieldGroup** nesnesini
kullanabilir hatta bu grupların arasına da **DataFormSeparator'lar**
koyabilirsiniz.

**[XAML]**

        \<dataControls:DataForm

           AutoGenerateFields="False"

           x:Name="birDataForm"\>

<span class="style1_15042009">           
\<dataControls:DataForm.Fields</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**DataFormHeader**</span>

                   <span style="color: red;"> Content</span><span
style="color: blue;">="Düzenlenecek şeyler" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**DataFormSeparator**</span><span
style="color: blue;"> /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**DataFormFieldGroup**</span>

                   <span style="color: red;"> Orientation</span><span
style="color: blue;">="Horizontal"\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTextField</span>

                       <span style="color: red;">
**FieldLabelPosition**</span><span style="color: blue;">="Top"</span>

                       <span style="color: red;">
FieldLabelContent</span><span style="color: blue;">="Kayıt Adı"</span>

                       <span style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataFormTextField</span>

                       <span style="color: red;">
**FieldLabelPosition**</span><span style="color: blue;">="Top"</span>

                       <span style="color: red;">
FieldLabelContent</span><span style="color: blue;">="Satış
Sayısı"</span>

                       <span style="color: red;"> Binding</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Satis</span><span style="color: blue;">}" /\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**DataFormFieldGroup**</span><span
style="color: blue;">\></span>

            \</dataControls:DataForm.Fields\>

<span class="style1_15042009">       
\</dataControls:DataForm</span><span style="color: blue;">\></span>

Yukarıdaki kod içerisinde ilk olarak bir **FormHeader** bulunuyor.
Sonrasında bir **Separator** da kullandıktan sonra elimizdeki
**TextField'leri** bir **Fieldgroup** içerisine aldık. **FieldGroup'un**
**Orientation** özelliğini de **Horizontal** yaptığımızda artık bu grup
içerisindeki kayıt düzenleme nesneleri yan yana gösterilecektir.

![Özelleştirilmiş bir DataForm
kontrolü.](http://cdn.daron.yondem.com/assets/2350/15042009_5.gif)\
*Özelleştirilmiş bir DataForm kontrolü.*

**Daha da özelleştirelim, daha da!**

Eğer yukarıdaki Field yapılarını özelleştirmek sizin ihtiyaçlarınızı
gidermediyse aslında bir adım daha ileri giderek tüm görsel yapıyı
değiştirme şansınız da var. Bunun için artık DataForm'un
**DisplayTemplate ve EditTemplate** özelliklerine eğilmemiz şart.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span>

           <span style="color: red;"> AutoGenerateFields</span><span
style="color: blue;">="False"</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="birDataForm"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**HeaderTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.HeaderTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**DisplayTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.DisplayTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**EditTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.EditTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**InsertTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.InsertTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz şekilde düzenlenen Template / Şablon yapıları birer
**DataTemplate** olarak tanımlanır ve bu şablonlar içerisinde tanımlı
görsel tasarımlar doğrudan DataForm kontrolü tarafından kullanılır.

**[XAML]**

<span style="color: #a31515;">        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span>

           <span style="color: red;"> AutoGenerateFields</span><span
style="color: blue;">="False"</span>

           <span style="color: red;"> x</span><span
style="color: blue;">:</span><span style="color: red;">Name</span><span
style="color: blue;">="birDataForm"\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**DisplayTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**TextBlock**</span>

                           <span style="color: red;"> Text</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}"\>\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**TextBlock**</span>

                           <span style="color: red;"> Text</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Satis</span><span style="color: blue;">}"\>\</</span><span
style="color: #a31515;">TextBlock</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.DisplayTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.**EditTemplate**</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**TextBox**</span>

                           <span style="color: red;"> Text</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Adi</span><span style="color: blue;">}"\>\</</span><span
style="color: #a31515;">TextBox</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                        </span><span
style="color: blue;">\<</span><span
style="color: #a31515;">**TextBox**</span>

                           <span style="color: red;"> Text</span><span
style="color: blue;">="{</span><span
style="color: #a31515;">Binding</span><span style="color: red;">
Satis</span><span style="color: blue;">}"\>\</</span><span
style="color: #a31515;">TextBox</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                    </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">StackPanel</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">                </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">DataTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">            </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm.EditTemplate</span><span
style="color: blue;">\></span>

<span style="color: #a31515;">        </span><span
style="color: blue;">\</</span><span
style="color: #a31515;">dataControls</span><span
style="color: blue;">:</span><span
style="color: #a31515;">DataForm</span><span
style="color: blue;">\></span>

Yukarıdaki XAMl içerisinde DataForm kontrolümüzün **DisplayTemplate** ve
**EditTemplate** şablonlarına basit birer StackPanel yerleştiriyoruz. Bu
StackPanel'ler içerisinde **DisplayTemplate'te** **TextBlock'lar** var,
**EditTemplate'te** ise **TextBox'lar** var. Tüm bu kontrollerin
**Text** özellikleri veri kaynağından uygun Property'lere bağlı durumda.
Veri bağlama işlemini yine klasik **Binding** sistemi ile yapıyoruz.
Kontrol normalde TextBlock'ları gösterirken düzenleme moduna geçince ise
EditTemplate içerisindeki TextBox'ları gösterecektir. Tabi siz
örneklerinizde basit birer StackPanel yerine çok daha özelleştirilmiş
görsel tasarımlar kullanabilirsiniz.

**Sonuç**

Görüldüğü üzere DataForm kontrolü kendisinden beklenenden çok daha
fazlasını sunabilecek bir kontrol olarak karşımızda. İş uygulamalarında
sürekli hazırladığınız çoğu formun Silverlight içerisinde rahatlıkla ve
en önemlisi de hızlı bir şekilde oluşturulabilmesini sağlıyor. İster
basit ister karışık validasyon kurallarınız olsun, ister basit ister
karışık ve özelleştirilmiş bir tasarımınız olsun DataForm kontrolü her
durumda size uyum sağlayabilecek şekilde tasarlanmış. Eh hadi ;) Sıra
sizde...

Hepinize kolay gelsin....


