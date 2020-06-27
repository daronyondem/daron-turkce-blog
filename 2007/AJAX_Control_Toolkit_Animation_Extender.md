---
FallbackID: 1757
Title: "AJAX Control Toolkit Animation Extender"
date: "2007-8-17"
EntryID: AJAX_Control_Toolkit_Animation_Extender
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, ASP.NET, JavaScript
old.EntryID: 331a9086-f67c-4338-987b-afa32a682c61
---
# AJAX Control Toolkit Animation Extender
ASP.NET AJAX kitabımda detaylıca bahsettiğim AJAX Control Toolkit benim
en çok ilgimi çeken kontrollerden biri olan <span>**Animation**</span>
**<span>Extender</span>** maalesef dokümantasyon eksikliği yüzünden
(kitabımı almayanlar tarafından :)) pek kullanılamıyor. Umarım bu makale
bu boşluğu doldurur.

**AJAX <span>Control</span> <span>Toolkit</span> <span>Animation</span>
<span>Extender</span>** kontrolü bize XML kodları yazarak **DHTML**
animasyonları yaratma olanağı sağlıyor. Bu <span>konsept</span> bizim
ileride <span>Silverlight</span> ile daha da aşina olacağımız XAML (XML
kodu) ile animasyon yaratma konseptine çok yakın. Hızlı bir şekilde ilk
örneğimize geçmeden önce bilgisayarınızda **ASP.NET AJAX
<span>1.0</span>** ve **AJAX <span>Control</span>
<span>Toolkit</span>**<span>’in</span> yüklü olduğundan emin olalım,
eğer gerekli yüklemeler bilgisayarınızda eksikse aşağıdaki adreslerden
indirerek hemen yükleyebilirsiniz.

<http://www.microsoft.com/downloads/details.aspx?FamilyID=ca9d90fa-e8c9-42e3-aa19-08e2c027f5d6&displaylang=en>\

<http://www.codeplex.com/AtlasControlToolkit/Release/ProjectReleases.aspx?ReleaseId=4923>

Yükleme sonrası <span>**Visual**</span> **<span>Studio</span>** veya
<span>**Visual**</span> **Web <span>Developer</span> Express**
içerisinde ASP.NET web sitesi yaratmak istediğinizde seçenek olarak
“**AJAX <span>Control</span> <span>Toolkit</span> Web Site**” seçeneği
de karşınıza çıkacaktır.

![AJAX Control Toolkit Web Site yaratırken Visual Studio
ekranı...](media/AJAX_Control_Toolkit_Animation_Extender/16082007_1.png)

Yeni bir “<span>**Ajax**</span> **<span>Control</span>
<span>Toolkit</span> Web Site**” yarattıktan sonra karşımıza ilk çıkan
<span><span>**default**</span>**.<span>aspx</span>**</span> dosyasına
<span>Toolbar</span> içerisinden bir <span>**AnimationExtender**</span>
eklediğimizde sayfamızın tasarım bölümünde aşağıdaki HTML kodu ile
karşılaşıyoruz

<span style="background:yellow;
">\<%</span><span style="
color:blue;">@</span><span> <span style="color:#A31515">Page</span>
<span style="color:red">Language</span><span
style="color:blue">="VB"</span> <span
style="color:red">AutoEventWireup</span><span
style="color:blue">="true"</span> <span
style="color:red">CodeFile</span><span
style="color:blue">="Default.aspx.vb"</span> <span
style="color:red">Inherits</span><span
style="color:blue">="\_Default"</span> <span
style="background:yellow;">%\></span></span>\
  \
 <span style="color:blue;">\<!</span><span
style="color:#A31515;">DOCTYPE</span><span> <span
style="color:red">html</span> <span style="color:red">PUBLIC</span>
<span style="color:blue">"-//W3C//DTD XHTML 1.1//EN"</span> <span
style="color:blue">"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">html</span><span> <span
style="color:red">xmlns</span><span
style="color:blue">="http://www.w3.org/1999/xhtml"\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">head</span><span> <span
style="color:red">runat</span><span
style="color:blue">="server"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">title</span><span
style="color:blue">\></span>Untitled Page<span
style="color:blue">\</</span><span
style="color:#A31515">title</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">head</span><span style="
color:blue;">\></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">body</span><span style="
color:blue;">\></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">form</span> <span style="color:red">id</span><span
style="color:blue">="form1"</span> <span
style="color:red">runat</span><span
style="color:blue">="server"\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">**ToolkitScriptManager**</span> <span
style="color:red">ID</span><span
style="color:blue">="**ScriptManager1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:blue">/\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">div</span><span
style="color:blue">\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">**AnimationExtender**</span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender1**"</span> <span
style="color:red">runat</span><span
style="color:blue">="server"\></span></span>\
 <span><span>            </span><span style="color:blue">\</</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">**AnimationExtender**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">div</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">form</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">body</span><span style="
color:blue;">\></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">html</span><span style="color:blue;">\></span>

Sayfa içerisinde toplam iki adet kontrol bulunuyor. Bunlardan ilki olan
<span>**ToolkitScriptManager**</span> sayfamızı ilk açtığımızda zaten
içerisinde vardı. ASP.NET AJAX <span>1.0</span> ile daha önce projeler
gerçekleştirmiş olanlar hatırlayacaktır; AJAX özellikleri kullanacağımız
her sayfada <span>**ScriptManager**</span> adında bir kontrolün sayfanın
en başında yer alması gerekiyordu. <span>ScriptManager</span>
sayfamızdaki diğer AJAX kontrollerinin çalışabilmesi ve bizim istemci
taraflı AJAX kodları yazarken Microsoft kütüphanesinden
faydalanabilmemiz için gerekli olan tüm <span>JavaScript</span>
kütüphanelerinin sayfaya eklenmesini sağlıyor. AJAX <span>Control</span>
<span>Toolkit</span> söz konusu olduğunda <span>Control</span>
<span>Toolkit</span> içerisindeki her kontrolün kendi ayrı
<span>JavaScript</span> dosyalarının da sayfaya eklenmesi gerektiğini
düşünürsek bazen bir sayfada kullanılan farklı AJAX kontrolleri
nedeniyle 10-15 adet farklı <span>JavaScript</span> dosyalarının
<span>arkaplanda</span> sayfaya eklenmiş olduğunu görebiliyorduk.
Aslında tüm bu <span>JavaScript</span> kodlarının olabildiğince daha az
sayıda dosyada derlenmesi ve toplu olarak sayfaya eklenmesi daha
mantıklı olacaktır. İşte bu bahsettiğimiz <span>optimizasyonu</span>
bizim yerimize <span>**ToolkitScriptManager**</span> yapacak. Bunun için
de klasik ASP.NET AJAX <span>**ScriptManager**</span> yerine
<span>Control</span> <span>Toolkit</span> kullanılan projelerde artık
<span>**ToolkitScriptManager**</span> kullanıyor olacağız.

Sayfadaki diğer kontrol bizim biraz önce eklediğimiz
<span>**AnimationExtender**</span> kontrolü. Gelin şimdi hızlı bir
şekilde bu kontrolün aldığı özelliklere bakmak için aşağıdaki kodu
inceleyelim.

<span style="color:blue;">\<</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">**TargetControlID**</span><span
style="color:blue">="**Button1**"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">**Animations**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnLoad</span><span style="color:blue">\></span>
... <span style="color:blue">\</</span><span
style="color:#A31515">OnLoad</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnClick</span><span style="color:blue">\></span>
... <span style="color:blue">\</</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnMouseOver</span><span
style="color:blue">\></span> ... <span
style="color:blue">\</</span><span
style="color:#A31515">OnMouseOver</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnMouseOut</span><span
style="color:blue">\></span> ... <span
style="color:blue">\</</span><span
style="color:#A31515">OnMouseOut</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnHoverOver</span><span
style="color:blue">\></span> ... <span
style="color:blue">\</</span><span
style="color:#A31515">OnHoverOver</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnHoverOut</span><span
style="color:blue">\></span> ... <span
style="color:blue">\</</span><span
style="color:#A31515">OnHoverOut</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">**Animations**</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>

<span>**AnimationExtender**</span> kontrolümüz kendi içerisinde
tanımlayacağımız tüm animasyonlara sayfadaki hangi elementin neden
olacağını <span>**TargetControlID**</span> aracılığı ile bizden
öğreniyor. Örneğin sayfada bir düğmeye tıklanacak ve sonrasında
animasyon uygulanacaksa <span>**TargetControlID**</span> değerine söz
konusu düğmenin **ID** bilgisini vermemiz gerekiyor. Tabi sadece tıklama
(<span>**OnClick**</span>) gibi durumlarla sınırlandırılmış değiliz;
yukarıdaki kod içerisinde de görebileceğiniz gibi
<span>**OnLoad**</span>, <span>**OnMouseOver**</span> gibi çok sayıda
durum (<span>**event**</span>) söz konusu. Her bir durumda uygulanmak
üzerine farklı animasyonlar tanımlayabiliyoruz, fakat tüm bu durumlar
<span>**TargetControlID**</span> özelliğine aktarılmış elementin
durumlarına bağlı olacak.\
 Animasyonlarımızı XML kodları ile yazacağımızdan bahsetmiştim. Her bir
farklı durum <span>(</span><span>onclick</span>, <span>onload</span>…
vs) için farklı <span>animasyanları</span> hazırladıktan sonra
yukarıdaki örnekteki uygun duruma ait (<span>onclick</span> vs) XML
<span>taglarının</span> arasına yazmamız gerekiyor. Hemen bir örnek ile
ilerleyelim.

<span style="color:blue;">\<</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span> <span
style="color:red">ID</span><span
style="color:blue">="AnimationExtender1"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">TargetControlID</span><span
style="color:blue">="Button1"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">**OnHoverOver**</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeOut</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">**OnHoverOver**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">**OnHoverOut**</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeIn</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">**OnHoverOut**</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span style="color:blue;"><span> </span>\<</span><span style="
color:#A31515;">asp</span><span style="color:blue;">:</span><span
style="color:#A31515;">Button</span><span> <span
style="color:red">ID</span><span style="color:blue">="Button1"</span>
<span style="color:red">runat</span><span
style="color:blue">="server"</span> <span
style="color:red">Text</span><span style="color:blue">="Button"</span>
<span style="color:blue">/\></span></span>

Sayfamıza ayrıca bir <span>**Button**</span> ekledik. Bu düğmeyi hedef
kontrol yani <span>**TargetControlID**</span> olarak ayarladık.
<span>AnimasyonExtender</span> içerisinde <span>**FadeIn**</span> ve
<span>**FadeOut**</span> olarak iki farklı animasyonu hedef kontrolün
iki farklı durumuna (<span>**OnHoverOver**</span> ve
<span>**OnHoverOut**</span>) tanımladık. Böylece fare ile hedef
kontrolün üzerine gelindiğinde <span>**OnHoverOver**</span> içerisinde
tanımlanmış animasyon, fare ile hedef kontrolün üzerinden ayrıldığımızda
ise <span>**OnHoverOut**</span> içerisindeki animasyon çalışacak.
Animasyonların tanımlanması ile ilgili detayları birazdan inceleyeceğiz,
şimdilik durum kontrolüne <span>konsantre olarak</span> yukarıdaki kodu
tekrar incelemenizi tavsiye ediyorum.\
 Animasyon tanımlamalarımızı yaparken iki farklı seçeneğimiz var.
Bunlardan ilki <span>**Sequence**</span> animasyon, diğeri ise
<span>**Parallel**</span>. <span>**Sequence**</span> animasyon
<span>tagları</span> içerisinde yer alan tüm animasyonlar tek
<span>tek</span>, XML kodu içerisine yazılma sıraları ile
gerçekleştirilir. Bir animasyon bitmeden diğerine geçilemez.
<span>**Parallel**</span> animasyonlarda ise tüm animasyon aynı anda
çalışır. Bir <span>**Sequence**</span> animasyon içerisinde bir
<span>**Parallel**</span> animasyon yer alabileceği gibi tam tersi de
olabilir. Gelin yine örnek üzerinden gidelim.\
 Örneğimizdeki sayfaya bir ASP.NET <span>**Calendar**</span> kontrolü
ekleyeceğim. Sayfada yer alacak olan iki farklı düğmeden biri
<span>**Calender**</span> kontrolünü %10 şeffaf yapacak, diğeri ise
tekrar görünür hale getirecek. İki farklı hedef kontrolüm, yani iki
farklı <span>**TargetControl**</span> olacağı için mecburen iki farklı
<span>**AnimationExtender**</span> kullanacağım.

<span style="color:blue;">\<</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">TargetControlID</span><span
style="color:blue">="Button1"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">**OnClick**</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">**Sequence**</span> <span
style="color:red">**AnimationTarget**</span><span
style="color:blue">="**Calendar1**"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeOut</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">**Sequence**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">**OnClick**</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span><span>  </span><span style="color:blue">\<</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">AnimationExtender</span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender2**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">TargetControlID</span><span
style="color:blue">="Button2"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">**OnClick**</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">**Sequence**</span> <span
style="color:red">**AnimationTarget**</span><span
style="color:blue">="**Calendar1**"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeIn</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">**Sequence**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">**OnClick**</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Button</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Button1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">**OnClientClick**</span><span
style="color:blue">="return false"</span> <span
style="color:red">Text</span><span style="color:blue">="Görünmez
Yap"</span> <span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Button</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Button2**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">**OnClientClick**</span><span
style="color:blue">="return false"</span> <span
style="color:red">Text</span><span style="color:blue">="Görünür
Yap"</span> <span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Calendar</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Calendar1**"</span> <span
style="color:red">runat</span><span
style="color:blue">="server"\>\</</span><span
style="color:#A31515">asp</span><span style="color:blue">:</span><span
style="color:#A31515">Calendar</span><span
style="color:blue">\></span></span>

Yukarıdaki kod içerisinde bizim için yeni olabilecek iki şey var.
Bunlardan ilki <span>**Sequence**</span> animasyonlar ve bu
animasyonlara ait <span>**AnimationTarget**</span> özellikleri. Daha
önceki örneğimizde animasyona neden olan kontrol, yani
<span>**TargetControl**</span> ile animasyonun gerçekleştiği kontrol
aynıydı. Oysa şu an biz bir düğmeye tıklayıp başka bir kontrole
animasyon uygulamak istiyoruz. Bu nedenle animasyon serisine yani
<span>**Sequence**</span> animasyonuna bir hedef belirtmemiz gerekiyor.
Örneğimizde bu kontrol **Calendar1** olacak çünkü animasyonu takvime
uygulayacağım. Bir ikinci ilginç nokta da düğmelerimize verdiğimiz
<span>**OnClientClick**</span> özellikleri. Sayfada normal ASP.NET
düğmeleri kullandığımız için doğal olarak düğmelere her tıkladığımızda
sayfa <span>**PostBack**</span> oluyor. Oysa bizim animasyonların
çalışabilmesi için bunu engellememiz şart. Bu nedenle
<span>**ClientClick**</span> özelliklerine “<span>**return**</span>
**<span>false</span>**” <span>JavaScript</span> kodunu yazıyoruz.
Böylece söz konusu düğmelere tıklandığında sayfa
<span>**PostBack**</span> olmayacak, sadece animasyonlar çalışacak.\
 Şimdi bir de <span>**Parallel**</span> animasyon denemesi yapalım.
<span>**Parallel**</span> animasyon <span>tagları</span> arasında iki
farklı animasyon koyacağız. Animasyonlardan biri yine takvimin
görünürlük değerini değiştirirken diğeri de aynı takvimin fon rengini
beyazdan kırmızıya ve kırmızıdan beyaza çevirecek.

<span style="color:blue;">\<</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">TargetControlID</span><span
style="color:blue">="Button1"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">**Parallel**</span> <span
style="color:red">**AnimationTarget**</span><span
style="color:blue">="**Calendar1**"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">**FadeOut**</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">**Color**</span> <span
style="color:red">PropertyKey</span><span
style="color:blue">="backgroundColor"</span> <span
style="color:red">StartValue</span><span
style="color:blue">="\#FFFFFF"</span> <span
style="color:red">EndValue</span><span
style="color:blue">="\#ff0000"</span> <span
style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">**Parallel**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span><span>  </span><span style="color:blue">\<</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">AnimationExtender</span> <span
style="color:red">ID</span><span
style="color:blue">="**AnimationExtender2**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">TargetControlID</span><span
style="color:blue">="Button2"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">**Parallel**</span> <span
style="color:red">**AnimationTarget**</span><span
style="color:blue">="**Calendar1**"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">**FadeIn**</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">**Color**</span> <span
style="color:red">PropertyKey</span><span
style="color:blue">="backgroundColor"</span> <span
style="color:red">StartValue</span><span
style="color:blue">="\#ff0000"</span> <span
style="color:red">EndValue</span><span
style="color:blue">="\#FFFFFF"</span> <span
style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">**Parallel**</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Button</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Button1**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">OnClientClick</span><span
style="color:blue">="return false"</span> <span
style="color:red">Text</span><span style="color:blue">="Görünmez
Yap"</span> <span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Button</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Button2**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">OnClientClick</span><span
style="color:blue">="return false"</span> <span
style="color:red">Text</span><span style="color:blue">="Görünür
Yap"</span> <span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="color:#A31515;">Calendar</span><span>
<span style="color:red">ID</span><span
style="color:blue">="**Calendar1**"</span> <span
style="color:red">runat</span><span
style="color:blue">="server"\>\</</span><span
style="color:#A31515">asp</span><span style="color:blue">:</span><span
style="color:#A31515">Calendar</span><span
style="color:blue">\></span></span>

Animasyonlar içerisinde kullanabileceğiniz farklı animasyon
<span>taglarını</span> sırayla inceleyelim.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**Resize**</span><span> <span
style="color:red">Width</span><span style="color:blue">="200"</span>
<span style="color:red">Height</span><span
style="color:blue">="300"</span> <span
style="color:red">Unit</span><span style="color:blue">="px"</span> <span
style="color:blue">/\></span></span>

Yukarıdaki animasyon ile hedef elementin yüksekliğinin ve genişliğinin
verilen değerlere doğru bir animasyon ile büyütülmesini veya
küçültülmesini sağlayabilirsiniz.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**EnableAction**</span><span> <span
style="color:red">Enabled</span><span style="color:blue">="false"</span>
<span style="color:blue">/\></span></span>

Özellikle düğmelerin tıklanabilir olması veya olmaması arasında geçiş
yapmak için yukarıdaki animasyon kodunu kullanabilirsiniz. Bir düğmenin
rengini açık bir renkten koyu bir renge çevirirken aynı anda paralel bir
animasyonda düğmeyi tıklanamaz hale de getirebilirsiniz.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**ScriptAction**</span><span> <span
style="color:red">Script</span><span
style="color:blue">="alert('Selamlar!');"</span> <span
style="color:blue">/\></span></span>

Sadece animasyon yapmakla kalmayıp animasyonlarınızın belirli
noktalarında <span>**JavaScript**</span> kodları da çalıştırabilirsiniz.
Bu özellik animasyonlar tamamlandıktan sonra kullanılırsa animasyonun
bitmesi ile sayfada farklı işlemler yapabilmenizi sağlayabilir.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**Color**</span><span> <span
style="color:red">AnimationTarget</span><span
style="color:blue">="MyContent"</span></span>\
 <span><span> </span><span style="color:red">Duration</span><span
style="color:blue">="1"</span></span>\
 <span><span> </span><span style="color:red">StartValue</span><span
style="color:blue">="\#FF0000"</span></span>\
 <span><span> </span><span style="color:red">EndValue</span><span
style="color:blue">="\#666666"</span></span>\
 <span><span> </span><span style="color:red">Property</span><span
style="color:blue">="style"</span></span>\
 <span><span> </span><span style="color:red">PropertyKey</span><span
style="color:blue">="backgroundColor"</span> <span
style="color:blue">/\></span></span>

Objelerin CSS özellikleri üzerinde direk oynamak için yukarıdaki kodu
kullanabilirsiniz. Örneğin bu kod içerisinde hedef objenin fon rengi
değiştiriliyor.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**StyleAction**</span><span> <span
style="color:red">Attribute</span><span
style="color:blue">="display"</span> <span
style="color:red">Value</span><span style="color:blue">="none"</span>
<span style="color:blue">/\></span></span>

CSS özelliklerinin değişimi ile ilgili alternatif olarak
<span>**StyleAction**</span> animasyonunu da kullanabilirsiniz.\
 Peki ya sayfadaki bir duruma, bir koşula göre farklı animasyonların
çalışmasını istiyorsanız? Merak etmeyin, bunun için de bir çözüm var.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**Condition**</span><span> <span
style="color:red">ConditionScript</span><span
style="color:blue">="\$get('isaret').**checked**"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeOut</span> <span
style="color:red">AnimationTarget</span><span
style="color:blue">="up\_container"</span> <span
style="color:red">minimumOpacity</span><span
style="color:blue">=".2"</span> <span
style="color:blue">/\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">**Condition**</span><span
style="color:blue;">\></span>

Yukarıdaki gibi <span>**condition**</span> <span>tagı</span> ile direk
sayfadaki bir <span>**CheckBox**’ın</span> işaretli olup olmadığını
kontrol edebileceğiniz gibi herhangi bir <span>JavaScript</span> komutu
da çalıştırabilir veya sayfada tanımlı <span>**global**</span> bir
<span>JavaScript</span> değişkenini kontrol edebilirsiniz. Şart
sağlandığında <span>**Condition**</span> <span>tagları</span> arasındaki
animasyon uygulanacaktır, aksi halde pas geçilecektir.

<span style="color:blue;">\<</span><span
style="color:#A31515;">**FadeOut**</span><span> <span
style="color:red">**Duration**</span><span
style="color:blue">=".5"</span> <span
style="color:red">**Fps**</span><span style="color:blue">="20"</span>
<span style="color:red">**MinimumOpacity**</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>

<span>**FadeIn**</span> ve <span>**FadeOut**</span> animasyonlarını daha
önce de kullandık. Detaylı olarak incelemek gerekirse söz konusu
animasyonlar için animasyon süresini <span>**Duration**</span>
özelliğine aktarmamız gerekiyor. Diğer yandan isterseniz animasyonun
saniyede kaç kare gösterimi ile oluşturulacağına da <span>**Fps**</span>
değeri ile karar verebilirsiniz. Son olarak şeffaflığa gidiş veya
şeffaflıktan dönüş animasyonlarında <span>**MinimumOpacity**</span> ve
<span>**MaximumOpacity**</span> ile minimum şeffaflık ve maksimum
şeffaflık limitlerini de ayarlayabilirsiniz.

Tüm bu animasyonları isterseniz direk <span>JavaScript</span> ile de
oluşturabilir ve kullanabilirsiniz.

<span style="color:blue;">var</span><span> **effects** = <span
style="color:blue">new</span> Array();</span>\
 <span>**effects**[0] = <span style="color:blue">new</span>
AjaxControlToolkit.Animation.**FadeInAnimation**(\$get(<span
style="color:#A31515">"**Calendar1**"</span>), .3, 30, .3, 1, <span
style="color:blue">false</span>);</span>\

<span>AjaxControlToolkit.Animation.**SequenceAnimation**.play(\$get(<span
style="color:#A31515">"**Calendar1**"</span>), 0, 24, **effects**,
1);<span>  </span></span>

Yukarıdaki <span>JavaScript</span> kodumuz içerisinde ilk olarak
animasyonlarımızın bir listesini saklayacak <span>**Array**</span>
tipindeki değişkenimizi tanımlıyoruz. Benim değişkenimde sadece tek bir
animasyon var, siz isterseniz birden çok animasyon ekleyebilirsiniz.
Animasyonlarla ilgili parametreleri yine <span>JavaScript</span> ile
aktarıyoruz. Son olarak da <span>**AjaxControlToolkit**’e</span> ait
<span>JavaScript</span> sınıfları aracılığı ile hazırladığımız animasyon
serisini bir <span>**SequenceAnimation**</span> olarak oynatmak
<span>için **.<span>play</span>**</span> komutunu kullanıyoruz. Her bir
animasyon için hedef HTML elementini ve gerekli animasyon
parametrelerini vermemiz gerekiyor. XML-<span>Script’e</span> kıyasla
biraz daha zor bir teknik olduğu için benim tavsiyem
<span>**AnimationExtender**</span> animasyonlarını
<span>JavaScript</span> ile birazdan inceleyeceğimiz şekilde
kullanmanızdır.

<span style="color:blue; ">\<</span><span
style="color:#A31515; ">div</span><span> <span
style="color:red; ">id</span><span
style="color:blue; ">="gereksiz"</span> <span
style="color:red; ">runat</span><span
style="color:blue; ">="server"</span> <span
style="color:red; ">style</span><span
style="color:blue; ">="display:none;"\>\</</span><span
style="color:#A31515; ">div</span><span
style="color:blue; ">\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span> <span
style="color:red">ID</span><span
style="color:blue">="AnimationExtender1"</span> <span
style="color:red">**BehaviorID**</span><span
style="color:blue">="**Yoket**"</span> <span
style="color:red">runat</span><span style="color:blue">="server"</span>
<span style="color:red">**TargetControlID**</span><span
style="color:blue">="**gereksiz**"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">Parallel</span> <span
style="color:red">AnimationTarget</span><span
style="color:blue">="Calendar1"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeOut</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">Resize</span> <span
style="color:red">Width</span><span style="color:blue">="400"</span>
<span style="color:red">Unit</span><span style="color:blue">="px"</span>
<span style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">Parallel</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span><span>  </span><span style="color:blue">\<</span><span
style="color:#A31515">ajaxToolkit</span><span
style="color:blue">:</span><span
style="color:#A31515">AnimationExtender</span> <span
style="color:red">ID</span><span
style="color:blue">="AnimationExtender2"</span> <span
style="color:red">BehaviorID</span><span
style="color:blue">="Goster"</span> <span
style="color:red">runat</span><span
style="color:blue">="server"</span><span>  </span><span
style="color:red">TargetControlID</span><span
style="color:blue">="gereksiz"\></span></span>\
 <span><span>    </span><span style="color:blue">\<</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\<</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>          </span><span style="color:blue">\<</span><span
style="color:#A31515">Parallel</span> <span
style="color:red">AnimationTarget</span><span
style="color:blue">="Calendar1"\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">FadeIn</span> <span
style="color:red">Duration</span><span style="color:blue">=".5"</span>
<span style="color:red">Fps</span><span style="color:blue">="20"</span>
<span style="color:red">MinimumOpacity</span><span
style="color:blue">=".1"</span> <span
style="color:blue">/\></span></span>\
 <span><span>            </span><span style="color:blue">\<</span><span
style="color:#A31515">Resize</span> <span
style="color:red">Width</span><span style="color:blue">="200"</span>
<span style="color:red">Unit</span><span style="color:blue">="px"</span>
<span style="color:blue">/\></span></span>\
 <span><span>          </span><span style="color:blue">\</</span><span
style="color:#A31515">Parallel</span><span
style="color:blue">\></span></span>\
 <span><span>        </span><span style="color:blue">\</</span><span
style="color:#A31515">OnClick</span><span
style="color:blue">\></span></span>\
 <span><span>    </span><span style="color:blue">\</</span><span
style="color:#A31515">Animations</span><span
style="color:blue">\></span></span>\
 <span style="color:blue;">\</</span><span
style="color:#A31515;">ajaxToolkit</span><span style="
color:blue;">:</span><span
style="color:#A31515;">AnimationExtender</span><span
style="color:blue;">\></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">input</span><span> <span
style="color:red">id</span><span
style="color:blue">="**Button4**"</span> <span
style="color:red">type</span><span style="color:blue">="button"</span>
<span style="color:red">value</span><span
style="color:blue">="Yoket"</span> <span
style="color:red">onclick</span><span style="color:blue">="var
onclkBehavior =
\$find(**'Yoket'**).get\_OnClickBehavior().get\_animation();onclkBehavior.**play**();"</span>
<span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">input</span><span> <span
style="color:red">id</span><span
style="color:blue">="**Button1**"</span> <span
style="color:red">type</span><span style="color:blue">="button"</span>
<span style="color:red">value</span><span
style="color:blue">="Goster"</span> <span
style="color:red">onclick</span><span style="color:blue">="var
onclkBehavior =
\$find(**'Goster'**).get\_OnClickBehavior().get\_animation();onclkBehavior.**play**();"</span>
<span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">input</span><span> <span
style="color:red">id</span><span
style="color:blue">="**Button2**"</span> <span
style="color:red">type</span><span style="color:blue">="button"</span>
<span style="color:red">value</span><span
style="color:blue">="Gostermeye Ara Ver"</span> <span
style="color:red">onclick</span><span style="color:blue">="var
onclkBehavior =
\$find(**'Goster'**).get\_OnClickBehavior().get\_animation();onclkBehavior.**pause**();"</span>
<span style="color:blue">/\></span></span>\
 <span style="color:blue;">\<</span><span
style="color:#A31515;">asp</span><span style="
color:blue;">:</span><span style="line-height:
115%;color:#A31515;">Calendar</span><span> <span
style="color:red">ID</span><span style="color:blue">="Calendar1"</span>
<span style="color:red">runat</span><span
style="color:blue">="server"\>\</</span><span
style="color:#A31515">asp</span><span style="color:blue">:</span><span
style="color:#A31515">Calendar</span><span
style="color:blue">\></span></span>

Yukarıdaki örneğimizde <span>**AnimationExtender**</span> kontrolleri
içerisinde tanımladığımız animasyonları <span>JavaScript</span> ile
çalıştırıyoruz. Normal şartlarda <span>**AnimationExtender**’lar</span>
<span>başka .NET</span> kontrollerine bağlanmak zorunda oldukları için
yalancı bir .NET kontrolü yaratıp <span>**AnimationExtender**</span>
kontrollerinin <span>**TargetControlID**</span> özelliklerini boş
geçmememiz gerekiyor. Bunun için kodun en başında bir **DIV** yaratarak
CSS özelliği ile görünmez yaptım. Söz konusu <span>**DIV**’i</span> her
iki <span>**AnimationExtender**’a</span> da
<span>**TargetControlID**</span> olarak verdim. Böylece bir sorun
yaşamayacağız. <span>AnimationExtender</span> kontrollerini
<span>JavaScript</span> ile yakalayabilmek için her iki kontrole de
farklı <span>**BehaviorID**</span> isimleri atadım. Kontrollerin
<span>**BehaviorID**</span> özelliklerindeki isimlerden animasyonları
yakalayacağız. Gelelim bizim esas animasyonları oynatacak olan
<span>JavaScript</span> kodlarımızın bulunduğu düğmelere. Formun en
altında toplam dört adet HTML düğmesi bulunuyor. Bu düğmelerin
<span>**OnClick**</span> özelliklerine ikişer satırlık
<span>JavaScript</span> kodları koydum. Bu kodları tek <span>tek</span>
incelemekte fayda var.

<span style="color:blue;">var onclkBehavior =
\$find(**'Yoket'**).get\_OnClickBehavior().get\_animation();\
 onclkBehavior.**play**();</span>

İlk satırda sayfadaki animasyonumu yakalayacak olan komut bulunuyor.
<span>**get**</span>**\_<span>OnClickBehavior</span>()**. Komutu ile söz
konusu animasyona ait <span>**OnClick**</span> durumuna atanmış
animasyonu alabiliyoruz. Aldığımız animasyonu
<span>**onclkBehavior**</span> adındaki değişkene aktardıktan
<span>sonra **.<span>play</span>**</span>**()** komutu ile oynatıyoruz.

<span style="color:blue;">var onclkBehavior =
\$find(**'Goster'**).get\_OnClickBehavior().get\_animation();\
 onclkBehavior.**pause**();</span>

**.<span>pause</span>()** komutu söz konusu animasyonu durduruyor. Fakat
sonrasında tekrar <span>**play**</span>**()** komutu ile bu animasyonu
devam ettirmek mümkün.

Umarım hepiniz için bu ilk <span>yazgelistir</span>.com makalem faydalı
bir kaynak olmuştur. <span>Silverlight</span> ile web dünyasına giriş
yapmadan önce bir süre için DHTML animasyon ihtiyaçlarınızı
<span>AnimationExtender</span> kontrolü ile sağlayabileceğinizden
eminim.

Herkese kolay gelsin…



*Bu yazi http://daron.yondem.com adresinde, 2007-8-17 tarihinde yayinlanmistir.*
