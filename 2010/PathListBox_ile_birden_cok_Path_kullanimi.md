---
FallbackID: 2537
Title: PathListBox ile birden çok Path kullanımı.
PublishDate: 9/7/2010
EntryID: PathListBox_ile_birden_cok_Path_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 4
old.EntryID: 00a0e3c0-972c-4489-8c8b-6b728e3565d1
---
PathListBox maceramıza bu makalemizde de devam edeceğiz. Hatırlarsanız
dün
[PathListBox](http://daron.yondem.com/tr/post/6da235ad-bdcd-46dc-a328-0428eb447d65)
kontrolüne hızlı bir giriş yapmıştık. Bugün ise aslında PathListBox'ın
Path'i ile olan ilişkisine göz atacağız.

Bir PathListBox'ı sadece hazır Ellipse vs gibi nesnelere değil kendi
çizdiğiniz Path nesnelerine de bağlayabilirsiniz. Bunun için sahnede bir
PathListBox bir de elle çizilmiş çizgi olduğunu düşünürsek yapılması
gereken PathListBox'ın Properties panelinden "**Select an object to use
as a LayoutPath**" düğmesine tıklayıp yine sahneden uygun Path'i seçiyor
olmak.

![PathListBox'a Path
atarken.](http://cdn.daron.yondem.com/assets/2537/06092010_1.png)\
*PathListBox'a Path atarken.*

Mouse'unuz ile Path nesnesini işaretlerken aynı yukarıdaki gibi "[Path]
will be named "path"" diye bir uyarı ile karşılaşacaksınız. Bu uyarı
Path nesnemizim ismi olmadığı için karşımıza çıkıyor. Blend otomatik
olarak bu nesneye bir isim verecek ve PathListBox'ın LayoutPaths
kolleksiyonuna Path'imizi ekleyecek.

![Birden çok Path
kullanabiliriz.](http://cdn.daron.yondem.com/assets/2537/06092010_2.png)\
*Birden çok Path kullanabiliriz.*

PathListBox'a Path atarken birden çok Path seçme şansınız var. Tüm bu
Path'ler PathListBox'ın **LayoutPaths** koleksiyonuna ekleneceği için
Properties panelinde de ayrı ayrı seçilebilir şekilde gözükecektir.

**[XAML]**

``` {style="font-family: consolas"}
        <ec:PathListBox x:Name="pListBox"
                        Margin="57,38,97,76">
            <ec:PathListBox.LayoutPaths>
                <ec:LayoutPath SourceElement="{Binding ElementName=path}" />
                <ec:LayoutPath SourceElement="{Binding ElementName=path1}" />
            </ec:PathListBox.LayoutPaths>
        </ec:PathListBox>
        <Path x:Name="path"
              Data="M25,110 C25,110 144,-44 168,59 C192,162 
        206,197.99954 254,115.99997 C302,34.000401 330,-9.9992914 359,46.000286"
              Margin="24.5,20.403,40.5,138.338"
              Stretch="Fill"
              Stroke="Black"
              UseLayoutRounding="False"
              StrokeThickness="3" />
        <Path x:Name="path1"
              Data="M103,119 C103,119 56,218 159,237 C262,256 
        295.99982,269 332.99979,230 C369.99976,191 301.99982,
        176.00018 368.99976,158.00012"
              Margin="89.799,116.5,30.5,44.193"
              Stretch="Fill"
              Stroke="Black"
              StrokeThickness="3"
              UseLayoutRounding="False" />
```

Yukarıdaki XAML kodunu inceleyerek de olayın nasıl geliştiğini daha net
anlayabiliriz. Her bir Path için bir LayoutPath nesnesi yaratılarak
SourceElement özellikleri Path'lere isimleri ile Element Binding set
edilerek bağlanıyor. Sonrasında bu LayoutPath'ler de PathListBox'a
ekleniyor.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*PathListBox'da birden çok Path.*

Yukarıdaki örnekte birden çok Path nesnesi olan bir PathListBox'ın kendi
içerisindeki Item'ları nasıl dağıttığını görebilirsiniz. LayoutPaths
adındaki koleksiyonun içerisinde sıraya göre Path'lere tek tek Item'lar
dağıtııyor. Dikkat edilmesi gereken bir nokta Path'lerin alan olarak
PathListBox'dan büyük olmaması. Böyle bir durumda Item'lar gözükse de
tıklanamaz oluyor. Yukarıdaki örnekte söz konusu hatayı da
inceleyebilirsiniz. PathListBox'a eklenen 1 ve 2 gibi rakamları
seçemezken orta kısma denk gelenleri seçebildiğinizi göreceksiniz. Bunun
nedeni PathListBox'ın görsel alanının Path'lerin tamamını kapsamıyor
olması.

![PathListBox Path'lerden
ufak!](http://cdn.daron.yondem.com/assets/2537/06092010_4.png)\
*PathListBox Path'lerden ufak!*

Hemen birkaç ek bildiye daha değinelim. PathListBox'ın
**StartItemIndex** diye bir özelliği var. Path'lerin ilkine en başta
gösterilmesi gereken Item'ın **Index** numarasını vermenizi sağlar. Ek
olarak **WrapItems** özelliğini de işaretlerseniz eğer StartItemIndex
kullanılmış ve ilk Item değil de daha sonraki Item'lardan başlanarak
Path üzerine nesnelerin konması istenmiş ise baştan eksik kalan
Item'ların en sona tekrar eklenip eklenmemesi gerektiğini ayarlar.

Son olarak unutmayın ki bir [önceki
makalemizde](http://daron.yondem.com/tr/post/6da235ad-bdcd-46dc-a328-0428eb447d65)
incelediğimiz tüm özellikler tek tek Path başına ayarlanabilir durumda.
Yani bir Path'in Capacity değerini değiştirip ona sadece iki nesne
konmasını bir diğerine ise 5 nesne konmasını tek tek ayarlayabilirsiniz.

[![Get Microsoft
Silverlight](http://go.microsoft.com/fwlink/?LinkId=161376)](http://go.microsoft.com/fwlink/?LinkID=149156&v=4.0.50401.0)\
*Nasıl bir örnek bu örnek?? :D*

Yukarıdaki aşırı ilginç / saçma :) örneği toparlamak için eklemek
istediğim şey :) tüm bu animasyonlara ek olarak gerekirse Path'lerinizi
de anime edebileceğiniz :) Böylece gereğinden fantastik uygulamalar
hazırlayabilirsiniz. Bu bir ListBox'tı değil mi? :)

Hepinize kolay gelsin.

[Örnek Kaynak kod: 06092010\_6.rar (30,86
KB)](http://cdn.daron.yondem.com/assets/2537/06092010_6.rar)


