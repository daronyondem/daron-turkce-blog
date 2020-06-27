---
FallbackID: 2298
Title: "Kendi Silverlight Yükle mesajınızı göstermeniz için ipuçları"
date: "2009-1-6"
EntryID: Kendi_Silverlight_Yukle_mesajinizi_gostermeniz_icin_ipuclari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 26e74ec8-47ac-427c-aa5c-e35ed0e8694e
---
Silverlight kullanılan web sitelerin artış ile aslında kullanıcılara da
Silverlight yükletme konusunda ısrar giderek artıyor :) Bu konunun bir
ısrar olmaması ve kullanıcıların gönül rahatlığı ile Silverlight
Runtime'ını yükleyebilmeleri için aslında yükleme sürecinin öncesindeki
kullanıcı deneyimi çok önemli.

Eğer istemcide Silverlight yüklü değil ise sizin OBJECT tagları ile
sayfaya yerleştirdiğiniz uygulama gösterilmeyecektir. Bunun yerine
OBJECT tagları arasındaki HTML kodu kullanıcıya gösterilir. Visual
Studio ve Expression Blend ile yeni bir proje yarattığınızda söz konusu
HTML kodu varsayılan şekli ile aşağıdaki gibi gelir.

**[HTML]**

<span style="color: gray">        </span> <span
style="color: gray;">\<object</span> <span
style="color: gray;">data="data:application/x-silverlight-2,"</span>
<span style="color: gray;">type="application/x-silverlight-2"</span>
<span style="color: gray;">width="100%"</span> <span
style="color: gray;">height="100%"\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<param</span> <span
style="color: gray;">name="source"</span> <span
style="color: gray;">value="ClientBin/Carousel.xap"/\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<param</span> <span
style="color: gray;">name="onerror"</span> <span
style="color: gray;">value="onSilverlightError"</span> <span
style="color: gray;">/\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<param</span> <span
style="color: gray;">name="background"</span> <span
style="color: gray;">value="white"</span> <span
style="color: gray;">/\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<param</span> <span
style="color: gray;">name="minRuntimeVersion"</span> <span
style="color: gray;">value="2.0.31005.0"</span> <span
style="color: gray;">/\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<param</span> <span
style="color: gray;">name="autoUpgrade"</span> <span
style="color: gray;">value="true"</span> <span
style="color: gray;">/\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">a</span> <span
style="color: red;">href</span><span
style="color: blue;">="http://go.microsoft.com/fwlink/?LinkID=124807"</span>
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

<span style="color: gray">        </span> <span
style="color: gray;">\</object</span><span
style="color: blue;">\></span>

Yukarıdaki OBJECT tagları arasında renkli olarak gördüğümüz kısım sadece
Silverlight yüklü olmadığında gösterilecektir. Bu kısıma istediğiniz
HTML kodunu koyabilirsiniz. Buradaki standart link Silverlight'ın
Microsoft sitesinde yükleme sayfasına yönlendirirken diğeri de standart
"Install Silverlight" görselini gösterir.

![Standart Silverlight Yükleme
mesajı.](media/Kendi_Silverlight_Yukle_mesajinizi_gostermeniz_icin_ipuclari/05012009.jpg)\
*Standart Silverlight Yükleme mesajı.*

Kendi özel "Silverlight Yükle" görselinizi ve mesajınızı hazırlarken
kullanıcıları korkutup kaçırmamak adına sizlere birkaç tavsiyem olacak.

-   İnsanlara "Silverlight Yükle" derken neden yüklemelerini
    istediğinizi belirtin.
-   Kullanıcıların yüklemeden önce de sitenizin nasıl bir şey olduğunu
    görmeleri sağlayın, merak uyandırın. Özetle Silverlight yüklerlerse
    nasıl bir şeyle karşılaşacaklarını görsünler ki yüklemeye daha sıcak
    baksınlar.

Aşağıda bulabileceğiniz örnekte Silverlight ile çalışan bir sitenin
Silverlight yüklü olmadığında da nasıl gösterildiğini
inceleyebilirsiniz. Standart "Install Silverlight" görseli yerine böyle
bir deneyim çok daha çekici olacaktır.

![Örnek Silverlight Yükleme
Ekranı](media/Kendi_Silverlight_Yukle_mesajinizi_gostermeniz_icin_ipuclari/05012009_2.jpg)\
*Örnek Silverlight Yükleme Ekranı*

Hepinize kolay gelsin.


