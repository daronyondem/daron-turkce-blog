# Silverlight 2.0 HyperlinkButton Kullanımı
Silverlight 1.0 içerisinde harici sayfalara linkler verecek düğmeler
yaratmak için el ile kod yazmak gerekiyordu, eğer bir de gerçekten bir
HTML linki gibi gözüken bir HyperLink yaratmak isterseniz epey bir
uğraşmanız gerekecektir. Silverlight 2.0 Beta 1 ile bu soruna çok basit
bir çözüm geliyor; **HyperlinkButton**.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication19.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">**HyperlinkButton**</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">175,101,92,0</span>"<span style="color: blue;">
</span><span style="color: red;"> **Content**</span><span
style="color: blue;">=</span>"<span style="color: blue;">Tikla
Git</span>"<span style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Top</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Auto</span>"<span style="color: blue;">
</span><span style="color: red;"> **NavigateUri**</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://www.live.com</span>"<span
style="color: blue;"> </span><span style="color: red;">
**TargetName**</span><span style="color: blue;">=</span>"<span
style="color: blue;">\_blank</span>"<span
style="color: blue;">/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıda da görebileceğiniz gibi **HyperlinkButton** kısmen bizim
ASP.NET tarafında alıştığımız yapılardan farklı değil. **NavigateUri**
özelliğine verdiğiniz adrese yönlendirme yaparken **TargetName** ile
isterseniz hedef bir pencere veya frame de belirtebiliyorsunuz. Son
olarak **HyperlinkButton** içerisinde gözükmesini istediğiniz içeriği de
**Content** özelliğine aktarabilirsiniz.

Özellikle ASP.NET ile bir karşılaştırma yaparsak ASP.NET içerisinde
**HyperLink** kontrollerinin içine farklı kontroller koyabildiğimizi de
hatırlayabiliriz. Örneğin rahatlıkla bir **Image** kontrolünü HyperLink
içerisine koyarak kullanabiliriz. Aynı durum Silverlight için de
geçerli.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication19.Page</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/client/2007</span>"

<span style="color: blue;">    </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">    </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">400</span>"<span style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"<span style="color: blue;">
</span><span style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">HyperlinkButton</span><span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Center</span>"

<span style="color: blue;">                    </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">Auto</span>"

<span style="color: blue;">                    </span><span
style="color: red;">NavigateUri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://www.live.com</span>"

<span style="color: blue;">                    </span><span
style="color: red;">TargetName</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\_blank</span>"<span style="color: blue;">
</span><span style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">HyperlinkButton.**Content**</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">**Image**</span><span style="color: blue;">
</span><span style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">54</span>"

<span style="color: blue;">              </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Waterfall.jpg</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">HyperlinkButton.**Content**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">HyperlinkButton</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Herhangi bir **HyperlinkButton'ın** **Content** özelliği aslında sadece
metin içeriği almak için düzenlenmiş değil. İsterseniz herhangi bir
Silverlight kontrolünü de **Content** içerisine yerleştirebilirsiniz.
Bunun için tek yapmanız gereken **Content** özelliğini Inline olarak
değil de **HyperlinkButton** içerisinde ek taglar içinde düzenlemeniz.
İsterseniz birden çok kontrolü de Content içerisine
yerleştirebilirsiniz, tek şart elinizdeki tüm kontrolleri **Canvas**
gibi bir container element içerisine toplamış olmak.

**HyperlinkButton için Template Kullanımı**

Bir uygulamada birden çok **HyperlinkButton** kullanılması olası. Bu
gibi durumlarda tüm bu linklerin görsel özelliklerinin ortak bir noktada
tutuluyor olması gerekiyor. Hali hazırdaki bir HyperlinkButton'un görsel
özelliklerinin değiştirilebilmesi için **Content** özelliğine farklı
içerikler aktarmaktansa doğrudan HyperlinkButton'un **Template**
özelliği düzenlenebilir.

<span style="color: blue;">    \<</span><span
style="color: #a31515;">HyperlinkButton</span><span
style="color: blue;"> </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Center</span>"

<span style="color: blue;">                    </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">Auto</span>"

<span style="color: blue;">                    </span><span
style="color: red;">NavigateUri</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://www.live.com</span>"

<span style="color: blue;">                    </span><span
style="color: red;">TargetName</span><span
style="color: blue;">=</span>"<span style="color: blue;">\_blank</span>"

<span style="color: blue;">                    </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Center</span>"

<span style="color: blue;">                    </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">TIKLA</span>"

<span style="color: blue;">                    </span><span
style="color: red;"> **Template**</span><span
style="color: blue;">=</span>"<span style="color: blue;">{StaticResource
**LinkTemplate**}</span>"<span style="color: blue;"> /\></span>

Yukarıdaki HyperlinkButton'un **Template** özelliği uygulama
içerisindeki kaynaklardan birine bağlanmış. Birazdan **LinkTemplate**
adındaki HyperlinkButton şablonumuzu hazırlayacağız. Böylece aynı görsel
şablonu birden çok link kullanabilecek.

Örneğimizde ulaşmak istediğimiz noktayı belirleyelim. HyperlinkButton'un
Content özelliğine verilen içeriğin doğrudan görsel şablonun ortasında
gözükmesini istiyoruz. Bunun için bir **ContentPresenter** kullanacağız.
Bu ContentPresenter'ın arkasında ise kenarları yuvarlatılmış bir
dikdörtgen kullanalım. Böylece **HyperlinkButton'umuz** normal bir düğme
gibi gözüksün.

<span style="color: blue;">    \<</span><span
style="color: #a31515;">ControlTemplate</span><span
style="color: blue;"> </span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LinkTemplate</span>"<span style="color: blue;">
</span><span style="color: red;"> **TargetType**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**HyperlinkButton**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">**Grid**</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">Rectangle</span><span style="color: blue;">
</span><span style="color: red;">Stroke</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"

<span style="color: blue;">                  </span><span
style="color: red;">RadiusY</span><span
style="color: blue;">=</span>"<span style="color: blue;">16</span>"

<span style="color: blue;">                  </span><span
style="color: red;">RadiusX</span><span
style="color: blue;">=</span>"<span style="color: blue;">16</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFF0000</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">RadialGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">Rectangle.Fill</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">Rectangle</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ContentPresenter</span><span
style="color: blue;"> </span><span
style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">10,10,10,10</span>"<span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding Content}</span>"

<span style="color: blue;">                          </span><span
style="color: red;">HorizontalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Center</span>"

<span style="color: blue;">                          </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Center</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">**Grid**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">ControlTemplate</span><span
style="color: blue;">\></span>

Yukarıdaki kod tüm isteklerimizi yerine getiriyor. Şimdi önemli
noktalara tek tek değinelim. İlk olarak **ControlTemplate** içerisine
iki kontrol koyacağımız için bunları bir container element içerisine
almamız gerekiyor. Biz örneğimizde **Grid** kullandık. ContentPresenter
kontrolümüzün **Content** özelliğini şablonun hedefi olacak
HyperlinkButton'un **Content** özelliğine bağladıktan sonra geriye
sadece ufak iki ayar kalıyor. Birincisi **ContentPresenter** ile
**Rectangle** arasında mesafe kalması için ContentPresenter'a elle
**Margin** vermek. Böylece **HyperlinkButton** içerisine ne konulursan
konulsun her zaman arkasında Rectangle'ın kenarlarından 10'a piksel uzak
kalacak. İkinci ufak detay ise **ControlTemplate'in** **TargetType**
özelliğinin kesinlikle ayarlanmış olması gerektiği.

Artık birden çok **HyperlinkButton** kullanarak aynı görsel özellikleri
kullanabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-5-30 tarihinde yayinlanmistir.*
