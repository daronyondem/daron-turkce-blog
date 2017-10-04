---
FallbackID: 2412
Title: ASP.NET 4.0'da full ViewState kontrolü!
PublishDate: 15/9/2009
EntryID: ASP_NET_4_0_da_full_ViewState_kontrolu
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET 4.0, ASP.NET
old.EntryID: 8ae727f9-12e9-4e50-8613-a0507c2f393c
---
ASP.NET'teki performans optimizasyonu açısından en sevmediğimiz fakat
yine işimizi kolaylaştırdığı için kullanmak durumunda kaldığımız bir
diğer özellik de ViewState. Sayfa içerisinde kontrollerin
State/Durum'larını saklayabilmesini ve PostBack sonrasında aynı durum
ile devam edebilmesini sağlayan bu altyapı neden sevilmez?

![ViewState
canavarı!](http://cdn.daron.yondem.com/assets/2412/14092009_1.gif)\
*ViewState canavarı!*

İşte tam da yukarıdaki manzara nedeniyle ViewState'i sevmeyiz oysa
ViewState candır :) Çünkü işimizi çok kolaylaştırır. Önemli olan tam
olarak nerede ViewState'i kullanacağımıza karar vermemizdir. Örneğin bir
web sayfasında hiç postback yoksa neden ViewState kullanalım? Eğer söz
konusu sayfadan sürekli başka sayfalara yönlendirmeler yapıyorsanız ne
gerek var? Veya daha da farklısı, sayfanın kendi state'ini saklamasına
gerek yoksa neden kullanalım? Varsayılan ayarları ile her yerde açık
gelen bu ViewState canavarını eğer kontrol ederseniz aslında çok da
faydanıza çalışabilir bir araç haline gelebilir.

Bugüne kadar ViewState'i sayfa bazında veya kontrol bazında pasif hale
getirebiliyorduk. Bunun için basit bir şekilde kontrolümüzün
**EnableViewState** özelliğini değiştirmemiz yeterli oluyordu.

**[ASP.NET]**

 <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">GridView</span> <span
style="color: red;">EnableViewState</span><span
style="color: blue;">="true"</span> <span
style="color: red;">ID</span><span
style="color: blue;">="BirGrid"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">GridView</span><span
style="color: blue;">\></span>

Ama ufak bir sorun var. Ya ben tüm sayfada ViewState'i kapatmak fakat
özellikle bir kontrol için açmak istiyorsam? Maalesef bunu yapamıyoruz.
Peki o zaman bu makalenin amacı ne? ASP.NET 4.0 ile beraber artık
kontrol başına birbirinden bağımsız olarak ViewState'in kullanılıp
kullanılmayacağını ayarlayabiliyorsunuz.

![ViewStateMode
karşınızda.](http://cdn.daron.yondem.com/assets/2412/14092009_2.gif)\
*ViewStateMode karşınızda.*

Artık tüm sayfada ViewState'i kapatsanız da kontrol başına
**ViewStateMode** ayarlayarak ilerleyebilirsiniz. Söz konusu ayara ait
seçenekler zaten çok basit. **Enabled / Disable** ViewState'i o kontrol
için açıp kapatırken **Inherit** ise bir üst kontrolün özelliğinin alt
kontrolde de geçerli olmasını sağlıyor.

Hepinize kolay gelsin.


