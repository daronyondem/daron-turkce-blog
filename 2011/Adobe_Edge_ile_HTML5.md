---
FallbackID: 2730
Title: "Adobe Edge ile HTML5'e erken bir bakış"
date: "2011-11-22"
EntryID: Adobe_Edge_ile_HTML5
IsActive: True
Section: software
MinutesSpent: 0
Tags: Edge, HTML5
---
Son zamanların ciddi popüler konularından biri HTML5 :) Aslında bu
konuda konuşacak çok şey var. Danışmanlıklarımın %90'ında HTML5 soruları
aldığımı itiraf etmem gerek. HTML5'in geleceği, gerçekten ne kadar
cross-platform olduğu, Microsoft'un HTML5 yaklaşımı, HTML5 ile
"phonegap" vs ile cross-platform mobile app development hikayesi vs...
Bunlar karışık konular ve itiraf etmek gerekirse bu konularda sizlere
net cevaplar vermek yerine aslında mevcut manzarayı görmenizi ve kendi
değerlendirmenizi yapabilmenizi tercih ederim.

İşte tam da bu çerçevede son zamanlarda giderek daha da sesi çıkan
Adobe'nin HTML5 designer editörü **Adobe Edge**'den bahsetmek istiyorum.
Eski bir ACP (Adobe Certified Professional) olarak uzun süredir
Photoshop ve Premier hariç pek Adobe araçlarını kullanmadığımı itiraf
etmem gerek. Silverlight'ın kuvvetlenmesi ile beraber makineme Flash
yüklememeye başlayalı sanırım üç yıl oluyor. Peki nedir bu Edge? Aslında
bu soruya gelmeden önce birkaç bilgi daha veriyim :)

-   Adobe Flash'ı mobil platformların için geliştirmeyi bırakacağını
    duyurdu.
-   Adobe Flex'i open source hale getirdi.

Bu iki maddeden yola çıkarak siz ne yorumlar yaparsınız bilemiyorum :)
Ama benim gördüğüm manzara Adobe'nin Flash'ı öncelikler listesinde
arkaya attığı. Bugüne kadar Open Source yapmayı düşünmediğin birşeyi
open source yapmak şirket içi kaynakları azaltmak için bir yöntem midir?
Yani acaba Adobe Flash tarafındaki çalışan sayısını ve yatırımını
azaltıp onun yerine open source community'sinden destek mi bekliyor
bilemiyorum :) Ama bu haberi özellikle aynı dönemde ortaya çıkan
mobil'de Flash'tan vazgeçme hikayesi ile birleştirirseniz garip bir
kimya oluştuğu bir gerçek. Eh bir de bunun üzerine "Odağımızı HTML5'e
yönlendiriyoruz" gibi duyurular çıkarsa :) Adobe Edge'e göz atmanın tam
zamanı demektir.

### Adobe Edge

Şu an inceleyebileceğimiz Adobe Edge sürümü "Preview 3" yani aynı
Windows 8 tarafında ve Expression Blend 5 tarafında da olduğu gibi Alpha
/ Beta vs değil. Özetle uygulamanın çok daha erken ve ön sürümlerinden
birine göz atıyor olacağız. O nedenle pek eleştirel yaklaşmak şu an için
mantıklı değil. Onun yerine daha fazla "Neler var?" ve "Adobe nasıl
ilerlemeyi planlıyor?" gibi soruların cevabını arayacağız.

[Adobe Edge'in Preview 3 sürümünü indirmek için buraya
tıklayabilirsiniz.](http://labs.adobe.com/technologies/edge/)

Aadobe Edge'i ilk açtığımızda yeni bir proje yarattığımız gibi aslında
Flash arayüzüne çok benzeyen bir arayüz ile karşılaşıyoruz. Tabi arayüz
çok daha basit ve bu eminim ki daha "Preview 3"de olmamızdan
kaynaklanıyor.

![Adobe Edge Toolbar Preview 3'ün ne kadar "Preview" olduğunun
kanıtı.](media/Adobe_Edge_ile_HTML5/edge_1.jpg)\
*Adobe Edge Toolbar Preview 3'ün ne kadar "Preview" olduğunun kanıtı.*

Yukarıda gördüğünüz basit ekran görüntüsünde Adobe Edge arayüzünden tek
araç çubuğunu görüyorsunuz :) Şaka değil "Button" yok. Tabi tekrar
etmekten sıkılmadan :) bunun bir "Preview" olduğunu yine hatırlatacağım.
Şimdilik özelliklerden çok benim merak ettiğim HTML5 animasyonlarının
nasıl yapıldığı ve arka planda nasıl bir kod yaratıldığı.

![Edge'de ilk
animasyonumuz.](media/Adobe_Edge_ile_HTML5/edge_2.jpg)\
*Edge'de ilk animasyonumuz.*

Deneme amaçlı olarak yola çıkarak ilk animasyonumu yukarıdaki şekilde
hazırladım. Flash veya Blend'den alışık olduğumuz Keyframe mantığı bire
bir korunmuş durumda. Animasyon yine KeyFrame'ler yaratılarak
Frame'lerde Property'ler değiştirilerek oluşturuluyor. Aslında itiraf
etmek gerekirse IDE'de anime edilen Property isimlerinin gösterilmesi,
sadece anime edilen değişikliklerin kaydedilmesi ve koda yansıması bana
daha fazla Blend'i hatırlattı. Malum Flash arayüzündeki yaklaşım
Property bazlı değil. Ama aslına bakarsanız Adobe'yi yapıyı bu şekilde
kurmaya iten şey arka planda yaratmak zorunda kaldığı kodun yapısı.
Flash seçeneğinde kendi SWF formatını compile ettiği için Adobe'nin
(veya daha doğrusu Macromedia'nın) o noktada daha özgür olmuş olduğunu
söyleyebiliriz. HTML5 konusunda maalesef Adobe aynı özgürlüğe sahip
değil.

Animasyon hazırlarken ister ekrande değişiklikler yapıp bu
değişikliklerden otomatik animasyon yaratılmasını ve otomatik keyframe
eklenmesini sağlayabiliyor ister bu otomatik mekanizmayı devre dışı
bırakıp elle tek tek toolbox'dan propertyleri bulup anime
edebiliyorsunuz.

Ben örneğimde basit bir Image koyup onu ekranda sağa sola taşıdım :)
Animasyonu yaratırken herhangi bir sorun yaşamadım. Herşey süper yolunda
gitti. Sonrasında tabi ki arka planda neler oluyor diye proje
dosyalarını karıştırmaya başladım.

![Basit Edge projesinin
dosyaları.](media/Adobe_Edge_ile_HTML5/edge_3.png)\
*Yeni bir Edge projesinin içeriği.*

Ekran görüntüsünde de paylaştığım gibi Edge'in kendi uzantısı ile
tanımladığı dosya dışında herşey normal HTML, JavaScript ve CSS. JS
dosyalarına baktığımızda hemen jQuery dikkati çekiyor :) Sonrasında
Edge'in kendi JS kütüphaneleri var (jQuery Plug-In). Son olarak projenin
kodlarını taşıdığını düşünebileceğimiz iki tane de Untitled diye
başlayan JS dosyası root klasöre yerleştirilmiş durumda.

Edge dosyasının içinde proje ile ilgili bazı parametreleri tanımlayan
bir JSON nesnesi var. Tahmin edeceğiniz üzere projenin çalışması için
kritik değil. Daha fazla IDE için bazı bilgiler yer alıyor proje ile
ilgili.

![Edge projesinin ana HTML
dosyası.](media/Adobe_Edge_ile_HTML5/edge_4.png)\
*Edge projesinin ana HTML dosyası.*

Ana HTML dosyamıza göz attığımızda doğal olarak projedeki bütün JS
dosyalarının dahil edildiğini görüyoruz. Ek olarak bir de DIV id'si ve
Class'ı set edilmiş şekilde ortada duruyor. Herşey bu DIV içerisinde
gerçekleşiyor.

Projede aslında bizim IDE'de yaptığımız olayları yansıtan esas
JavaScript dosyası ise "**Untitled-1\_edge.js**" dosyasının ta kendisi.
Benim örneğimde bu dosyanın içeriğini aşağıda bulabilirsiniz.

**[Javascript]**

(<span style="color:blue;">function</span> (\$, Edge, compId) {\
    <span style="color:blue;">var</span> symbols = {\
         <span style="color:maroon;">"stage"</span>: {\
            version: <span style="color:maroon;">"0.1.3"</span>,\
             baseState: <span
style="color:maroon;">"Base State"</span>,\
             initialState: <span
style="color:maroon;">"Base State"</span>,\
             content: {\
                dom: [\
        {\
             id: <span style="color:maroon;">'vesikalik'</span>,\
             type: <span style="color:maroon;">'image'</span>,\
             tag: <span style="color:maroon;">'div'</span>,\
             rect: [0, 0, 162, 161],\
            fill: [<span
style="color:maroon;">'rgba(0,0,0,0)'</span>, <span
style="color:maroon;">'images/vesikalik.png'</span>],\
             transform: [[10, 239]]\
        }],\
                 symbolInstances: [\
      ]\
            },\
             states: {\
                <span style="color:maroon;">"Base State"</span>: {\
                     <span
style="color:maroon;">"\${\_stage}"</span>: [\
             [<span style="color:maroon;">"color"</span>, <span
style="color:maroon;">"background-color"</span>, <span
style="color:maroon;">'rgba(255,255,255,1)'</span>],\
             [<span style="color:maroon;">"style"</span>, <span
style="color:maroon;">"height"</span>, <span
style="color:maroon;">'400px'</span>],\
             [<span style="color:maroon;">"style"</span>, <span
style="color:maroon;">"width"</span>, <span
style="color:maroon;">'550px'</span>]\
          ],\
                    <span
style="color:maroon;">"\${\_vesikalik}"</span>: [\
             [<span style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"translateX"</span>, <span
style="color:maroon;">'0px'</span>],\
             [<span style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"translateY"</span>, <span
style="color:maroon;">'99px'</span>],\
             [<span style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"rotateZ"</span>, <span
style="color:maroon;">'0deg'</span>]\
          ]\
                }\
            },\
            timelines: {\
                 <span
style="color:maroon;">"Default Timeline"</span>: {\
                     fromState: <span
style="color:maroon;">"Base State"</span>,\
                     toState: <span style="color:maroon;">""</span>,\
                     duration: 7500,\
                    labels: {\
\
                     },\
                    timeline: [\
            { id: <span
style="color:maroon;">"eid15"</span>, tween: [<span
style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"\${\_vesikalik}"</span>, <span
style="color:maroon;">\
                "rotateZ"</span>, <span
style="color:maroon;">'360deg'</span>, { fromValue: <span
style="color:maroon;">'0deg'</span>}], \
                position: 4500, duration: 1250 },\
            { id: <span
style="color:maroon;">"eid8"</span>, tween: [<span
style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"\${\_vesikalik}"</span>, <span
style="color:maroon;">\
                "translateX"</span>, <span
style="color:maroon;">'214px'</span>, { fromValue: <span
style="color:maroon;">'0px'</span>}]\
                , position: 0, duration: 2000, easing: <span
style="color:maroon;">"easeOutElastic"</span> },\
             { id: <span
style="color:maroon;">"eid17"</span>, tween: [<span
style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"\${\_vesikalik}"</span>, <span
style="color:maroon;">\
                "translateX"</span>, <span
style="color:maroon;">'235px'</span>, { fromValue: <span
style="color:maroon;">'214px'</span>}]\
                , position: 5750, duration: 1750, easing: <span
style="color:maroon;">"easeOutElastic"</span> },\
             { id: <span
style="color:maroon;">"eid12"</span>, tween: [<span
style="color:maroon;">"transform"</span>, <span
style="color:maroon;">"\${\_vesikalik}"</span>, <span
style="color:maroon;">\
                "translateY"</span>, <span
style="color:maroon;">'239px'</span>, { fromValue: <span
style="color:maroon;">'99px'</span>}]\
                , position: 2000, duration: 2500, easing: <span
style="color:maroon;">"easeInOutQuad"</span>}]\
                 }\
            }\
        }\
    };\
\
    <span style="color:blue;">var</span> comp;\
     Edge.registerCompositionDefn(compId, symbols);\
\
    <span style="color:darkgreen;">/\*\*\
     \* Adobe Edge DOM Ready Event Handler\
    \*/</span>\
     \$(window).ready(<span style="color:blue;">function</span> () {\
         comp = <span
style="color:blue;">new</span> Edge.Composition(compId, { stage: <span
style="color:maroon;">"."</span> + compId }, {});\
         <span style="color:darkgreen;">/\*\*\
         \* Adobe Edge Timeline Launch\
        \*/</span>\
        comp.ready(<span style="color:blue;">function</span> () {\
             comp.play();\
        });\
    });\
})(jQuery, jQuery.Edge, <span
style="color:maroon;">"EDGE-294043132"</span>);

Kodu yukarıdan aşağıya incelerseniz, önce bir **Stage** yaratılıp resmin
yerleştirildiğini, sonrasında **State** ve son olarak **timeline'ın**
yaratıldığını görebilirsiniz. Timeline içerisinde transformasyonların
hepsinin **From** ve **To** gibi property değerleri üzerinden gittiğine
dikkat etmekte fayda var. Bu senaryo zaten SL veya WPF ile uğraşanlar
için epey tanıdık gelecektir.

Kodun sonuna doğru yaratılan tüm sembollerin bir **CompID** ile
eşleştirildiğini ve **Stage'e** konduktan sonra da "**play**" metodu ile
senaryonun başlatıldığını görebilirsiniz.

Durumu özetleyecek olursak :) Edge IDE'sinde yapılan herşey arka planda
JavaScript yaratıyor. Yaratılan JavaScript'e hakim olabilmek adına Adobe
kendi jQuery plug-inlerini geliştirmiş durumda. İlginç olan şeylerden
biri Edge IDE'sindeki toolbardaki nesnelerle çizim yapsanız, örneğin bir
dikdörtgen koysanız bile dikdörtgenden tutun tüm çizimlere kadar herşeyi
şu an JavaScript ile yaratmaya çalışıyorum. Ben açıkçası bu noktada SVG
kullanımı öngörüyordum fakat şu an için yok. Belki ileride olacaktır.

Peki ya direk SVG Import edersek ne olur? diyorsanız orada da hafif bir
hüsran var açıkçası. SVG'lere doğrudan Image gibi "asset" muamelesi
yapıyor Edge :) Yani SVG içerisindeki objeleri tek tek anime edebilmeyi
veya IDE içerisinde SVG'nin iç objelerine ulaşmayı düşünmeyin bile. Şu
an için SVG'yi bir DIV'e JavaScript ile background olarak set ediyor :(

### Özetle...

HTML5 ile designer-developer işbirliğini tooling olarak destekleyebilme
noktasında ne kadar erken bir çağda olduğumuzu Adobe Edge de destekliyor
ve kanıtlıyor... Bu konuda ana iki savaşçı olarak MS de Adobe de kabaca
aynı noktada gibi duruyor. Aradaki büyük farklılıklardan biri MS'in
elinde kendi tarayıcısı olması ve tarayıcısını da HTML5'i istediği
noktaya getirmek için değiştirebiliyor olması :) Tabi bu durum biraz da
tehlikeli çünkü MS'in IE'de yaptıkları sonuç itibari ile cross browser
olmuyor. Nitekim şu an için baktığınızda çılgın HTML5 implementasyonları
daha fazla Windows 8 ile gelen METRO UI'yı hedeflemiş gibi duruyor,
genel web ortamını değil. Adobe ise doğal olarak bu riski göze alamaz
(MS bu riski METRO dışında alacak mı o da pek belli değil) Adobe'nin
yapmaya çalıştığı cross-browser bir çözümü eldeki araçlarla yaratmak. Bu
çerçevede doğru bir başlangıç noktasında olduklarını da itiraf etmek
gerek.

Aslında Adobe ile MS'i yani Edge ile Blend'i karşılaştırırken ilginç bir
nokta var :) Blend'in şu ana kadar çıkan Preview'ları sadece Windows 8
Metro'yu hedefliyor aslında. Yani Blend'in Edge gibi genel web
uygulamalarını HTML5 ile hedefleyip hedeflemeyeceği daha pek belli
değil. Bakalım önümüzdeki aylar ne gösterecek.

### Tavsiye ;)

Microsoft'un HTML5 bakışını incelemek için tavsiyem aşağıdaki iki
webcast videosunu izlemeniz ;) Geleceğe dair ciddi fikir vereceklerinden
eminim.

-   [Internet Explorer 10 ve HTML5 Dünyasında Bir
    Gezinti](http://daron.yondem.com/tr/post/Internet_Explorer_10_ve_HTML5_Video)
-   [Windows 8 Tablet Development'a
    Giriş](http://daron.yondem.com/tr/post/Win8_Tablet_Development_Giris_Video)

Hepinize kolay gelsin.

Bu makalede**Adobe Edge Preview 3** kullanılmıştır.


