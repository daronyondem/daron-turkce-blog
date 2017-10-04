---
FallbackID: 1730
Title: Sayfa Genelinde Kaydırma Çubuğundan Etkilenmeyen Sabit DIV (Katman)
PublishDate: 22/4/2007
EntryID: Sayfa_Genelinde_Kaydirma_Cubugundan_Etkilenmeyen_Sabit_DIV
IsActive: True
Section: software
MinutesSpent: 0
Tags: CSS, HTML
old.EntryID: 4aa09b7d-7384-44bb-a0ec-a31d5c5c11ca
---
Sayfada kaydırma çubuğu ile web sitenizi gezen kullanıcılara sayfanızın
belirli bölümü sürekli göstermek isteyebilirsiniz. Buna çok basit bir
örnek olarak sitenizin menüsü veya sitenize almış olduğunuz bir reklam
çalışması verilebilir. Kullanıcı yukarı ve aşağıya doğru sayfayı
gezerken sizin belirlediğiniz içerik yine sizin belirlediğiniz bir
konumda ekranda sürekli gözükecektir.

Bahsettiğimiz işlevselliği sağlamak için CSS komutlarından
faydalanacağız. Sayfamızda sürekli belirli bir konumda gözükmesini
istediğimiz kısmı bir DIV katmanı içerisine yerleştireceğiz ve söz
konusu DIV katmanına CSS özellikleri olarak konumlandırma
koordinatlarını ve sabit kalma komutunu vereceğiz. Gelin ilk olarak
içerisinde bir resim bulunan DIV katmanımızı hazırlayalım.\

<span style="color: blue;"> \<</span><span
style="color: rgb(163, 21, 21);">div</span><span
style="color: blue;">\>\
    \<</span><span style="color: rgb(163, 21, 21);">img</span><span>
<span style="color: red;"> src</span><span
style="color: blue;">="http://daron.yondem.com/tr/images/cert.gif"</span>
<span style="color: red;"> alt</span><span
style="color: blue;">=""</span> <span style="color: blue;"> /\>\
\</</span><span style="color: rgb(163, 21, 21);">div</span><span
style="color: blue;">\></span></span>

Katmanımız içerisinde bir resim bulunuyor. Siz kendi web sitenizde bu
katman içerisinde her türlü HTML içerik yerleştirebilirsiniz. Bu bir
reklam (Banner) çalışması olabileceği gibi sitenizin menüsü de olabilir.
Fakat unutmayın ki DIV katmanı içerisine yerleştirdiğiniz HTML
objelerinin dış objelerden bağımsız olması gerekiyor. Yani bir HTML
tablonun bir satırını alıp bu katman içerisine yerleştiremezsiniz. Eğer
böyle bir ihtiyacınız varsa söz konusu satırı tablodan ayırıp ayrı bir
tablo olarak düzenlemeniz gerekir.

Bir sonraki adımda katmanımıza satır içi CSS özellikleri vererek ekran
gözükmesi gereken konuma ait bilgileri aktaracağız.

<span style="color: blue;"> \<</span><span
style="color: rgb(163, 21, 21);">div</span><span style=""> <span
style="color: red;"> style</span><span
style="color: blue;">="top:10px;right:10px"</span><span
style="color: blue;">\>\
    \<</span><span style="color: rgb(163, 21, 21);">img</span> <span
style="color: red;"> src</span><span
style="color: blue;">="http://daron.yondem.com/tr/images/cert.gif"</span>
<span style="color: red;"> alt</span><span
style="color: blue;">=""</span> <span style="color: blue;"> /\>\
\</</span><span style="color: rgb(163, 21, 21);">div</span><span
style="color: blue;">\></span></span>

CSS özelliği olarak **top** özelliğine **10px** değeri vererek katmanın
ekranın en üst noktasından **10px** mesafede yer alacağını belirledik.
Aynı şekilde **right** özelliğine de **10px** değeri vererek katmanın
ekranın sağından 10px mesafede gösterileceğini belirlemiş olduk.
Yukarıdaki örneği bu hali ile çalıştırdığınızda maalesef çalışmadığını
göreceksiniz. Yapmamız gereken son bir ayar daha var. Konumlandırma ile
ilgili tüm ayarlarımızı yaptık fakat bunlara ek olarak kullandığımız
katmanın konumlandırma metodunu da belirtmemiz gerekiyor.

<span style="color: blue;"> \<</span><span
style="color: rgb(163, 21, 21);">div</span><span style=""> <span
style="color: red;"> style</span><span
style="color: blue;">="**position:fixed**;top:10px;right:10px"</span><span
style="color: blue;">\>\
    \<</span><span style="color: rgb(163, 21, 21);">img</span> <span
style="color: red;"> src</span><span
style="color: blue;">="http://daron.yondem.com/tr/images/cert.gif"</span>
<span style="color: red;"> alt</span><span
style="color: blue;">=""</span> <span style="color: blue;"> /\>\
\</</span><span style="color: rgb(163, 21, 21);">div</span><span
style="color: blue;">\></span></span>

CSS özelliği olarak **position** özelliğine **fixed** değerini vererek
söz konusu katmanın sayfada gösterim metodu olarak sürekli aynı konumda
gösterileceğini belirtmiş olduk. Artık kodumuzu çalıştırdığımızda
herhangi bir sorun ile karşılaşmayacağız.

**position:fixed** CSS düzenlemesi **Internet Explorer 7.0** ve
**FireFox 2.0+** internet tarayıcılarında doğru olarak çalışıyor.
Maalesef Internet Explorer'ın eski sürümlerinde bu konuyla ilgili bir
sorun vardı. Tabi ki her sorun gibi bu sorunun da çok sayıda çözümü var.
Hatta Internet Explorer 6.0 ve 5.0 sürümleri için farklı farklı çözümler
mevcut. Fakat ben yazımı burada sonlandırarak eski teknolojiye yatırım
yapmayacağım. Sizin de yapmanızı tavsiye etmem :)


