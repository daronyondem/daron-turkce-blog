---
FallbackID: 2837
Title: Sitenize Windows 8 ve Internet Explorer 10 için Flip Ahead Ekleyin
PublishDate: 3/16/2013
EntryID: Sitenize_Flip_Ahead_Ekleyin
IsActive: True
Section: software
MinutesSpent: 0
Tags: HTML, HTML5, IE 10, Internet Explorer, Metro UI, Windows 8
---
Windows 8 ile beraber gelen METRO demekte ısrar ettiğim :) ekranı herkes
biliyordur. Doğru ismi "Start Screen" :) Neyse, şimdi o ekranda
malumunuz bir "Internet Explorer" var. Touch optimize vs... Tabi Start
Screen'de IE kullanabilmek için IE'nin default tarayıcı olması
gerekiyor. Bu detayı da atlamayalım. Chrome vs default tarayıcı ayarlı
ise StartScreen'de IE kullanma şansınız da kalmıyor. Özetle Start
Screen'de sadece default tarayıcınızı kullanabiliyorsunuz. Bu detayı da
verdikten sonra gelelim konumuza. Start Screen'deki IE'de "Flip Ahead"
denilen bir özellik var.

![IE 10'daki Flip Ahead aslında
opsyonel.](http://cdn.daron.yondem.com/assets/2837/flipahead_1.png)\
*IE 10'daki Flip Ahead aslında opsyonel.*

Bu özellik ile beraber tarayıcı aslında web sitenizin sayfalarında ileri
geri "Flip" özelliği sağlayabiliyor. "Geri" kısmı zaten malum "browser
history" hikayesi ama "ileri" kısmı biraz garip geliyor kulağa değil mi?
Yani bir siteye girdiğimde "ileri" gitmek istersem beni nereye
götüreceğine nasıl karar vereceksin ki? İşte zaten bu yazımızın esas
amacı da konuya teknik implementasyonu tarafından bakmak.

![Flip Ahead düğmesi normalda
"Disabled"](http://cdn.daron.yondem.com/assets/2837/flipahead_2.png)\
*Flip Ahead düğmesi normalda "Disabled"*

Normal şartlarda "Flip Ahead" düğmesi "Disabled" duruyor. Hatta özellik
de varsayılan ayarlarda kapalı geliyor. Eğer özellik açılırsa hem bu
düğmeler çalışır hale geliyor hem de Touch özelliği olan bir tablette
tek parmak hareketi ile ekrandan da sayfa geçişleri yapılabiliyor. İşin
teknik tarafını test etmek için ben bloğum ana sayfasını kullandım. Şu
an "<http://daron.yondem.com/tr/blog/>" sayfasına giderseniz bu özelliği
açık olarak kullanabilirsiniz. Tabi ben ileri-geri özelliğini ters
implemente ettim çünkü benim blogda ancak öyle anlamlı oluyor. Yani
ileri giderseniz aslında tarih olarak sitede geri gitmiş oluyorsunuz.

**[HTML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <link rel="next" href="/tr/page/5"></link>
    <link rel="prev" href="/tr/page/3"></link>
```

İşte olayın implementasyon tarafı bu kadar. Eğer bir sayfada yukarıdaki
gibi metadatalar varsa o sayfa IE10'un Flip Ahead özelliğinde kendini
gösterebiliyor. Eğer özellik açık değilse bu şekilde metadata olan
sayfalarda IE kullanıcıya özelliği açmasına dair ufak bir uyarıda da
bulunuyor.

![IE10'dan Flip Ahead özelliği olan bir siteye girildiğinde gelen
uyarı...](http://cdn.daron.yondem.com/assets/2837/flipahead_3.png)\
*IE10'dan Flip Ahead özelliği olan bir siteye girildiğinde gelen
uyarı...*

Özellik bir kere açıldıktan sonra artık sürekli kullanılabiliyor :) Eh
hadi bakalım... Herkes sitesine eklesin şimdi bu özelliği :)

Görüşmek üzere!


