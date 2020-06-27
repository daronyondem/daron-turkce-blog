# Silverlight 2.0 içerisinde ToolTip Kontrolü ve Tooltip şablonları
Özellikle Windows uygulamalarında "erişilebilirlik" açısından çok önemli
olan noktalardan biri de "İpucu" balonlarıdır. "Tooltip" olarak geçen bu
sistem sayesinde herhangi bir kontrolün veya nesnenin üzerinde fare ile
belirli bir süre durduğunuzda gerekli açıklama metni gösterilir. Böylece
kullanıcı ufak yardım yönergeleri ile yönlendirilebilir.

**Silverlight 2.0 Beta 2** için Tooltip işlevselliğini otomatik olarak
sağlayan bir **TooltipService** sınıfımız var. Gelin hemen bir örnekle
konumuzu inceleyelim.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication6.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">35,41,170,124</span>"

<span style="color: blue;">            </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Button</span>"

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dugme</span>"<span style="color: blue;">\></span>

<span style="color: blue;">**      \<**</span><span
style="color: #a31515;">**ToolTipService.ToolTip**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**        \<**</span><span
style="color: #a31515;">**ToolTip**</span><span style="color: blue;">
**** </span><span style="color: red;">**Content**</span><span
style="color: blue;">**=**</span>"<span style="color: blue;">**Bu bir
düğme**</span>"<span style="color: blue;">**\>\</**</span><span
style="color: #a31515;">**ToolTip**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**      \</**</span><span
style="color: #a31515;">**ToolTipService.ToolTip**</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kod içerisinde bir düğmeye **ToolTipService** ekleyerek
service de bir To**o**lTip kontrolü aktarıyoruz. ToolTip kontrolümüzün
**Content** özelliğine bir metin aktararak ip ucu olarak bu metnin
gösterilmesini sağlıyoruz. Bu şekilde istediğiniz Silverlight kontrolüne
ToolTipService ekleyebilirsiniz.

![Basit bir
Tooltip.](media/Silverlight_2_0_icerisinde_ToolTip_Kontrolu_ve_Tooltip_sablonlari/11062008_1.png)\
*Basit bir Tooltip.*

Eğer Tooltip'in görünümünü değiştirmek isterseniz Background, FontSize,
FontWeight, Foreground gibi birçok özelliğe sahipsiniz. İsterseniz fon
rengi gibi özelliklere farklı Brush yapıları da aktarabilirsiniz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication6.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">35,41,170,124</span>"

<span style="color: blue;">            </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Button</span>"

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Dugme</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ToolTip</span><span style="color: blue;">
</span><span style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Bu bir
düğme</span>"<span style="color: blue;">\></span>

<span style="color: blue;">        **  \<**</span><span
style="color: #a31515;">**ToolTip.Background**</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span style="color: blue;">0.5,1</span>"

<span style="color: blue;">                                </span><span
style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.5,0</span>"<span style="color: blue;">\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">          **\</**</span><span
style="color: #a31515;">**ToolTip.Background**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**          \<**</span><span
style="color: #a31515;">**ToolTip.BorderBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.519999980926514,-0.0670000016689301</span>"

<span style="color: blue;">                                </span><span
style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.519999980926514,0.899999976158142</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF000000</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFFFFFFF</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">          **\</**</span><span
style="color: #a31515;">**ToolTip.BorderBrush**</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Görüldüğü üzere rahatlıkla Tooltip'in görselliği değiştirilebiliyor. Bir
Tooltip'in fonuna VideoBrush yerleştirmeye sizin hayallerinize
bırakıyorum. Tooltip'e ait **VerticalOffset** ve **HorizontalOffset**
özellikleri ile Tooltip'in fareden ne kadar uzakta gözükeceğini de
ayarlayabilirsiniz.

![Özelleştirilmiş
Tooltip](media/Silverlight_2_0_icerisinde_ToolTip_Kontrolu_ve_Tooltip_sablonlari/11062008_2.png)\
*Özelleştirilmiş Tooltip*

Biraz daha ileri giderek ToolTip'in Content özelliğine istersek farklı
Silverlight kontrolleri de yerleştirebiliriz. Content içerisine sadece
bir Silverlight kontrolü yerleştirebilirsiniz fakat bu kontrolün
içerisinde başka kontroller bulunabilir, yani Canvas veya Grid gibi
Container kontrollerini kullanarak farklı görsel şemalar
yaratabilirsiniz. Aşağıdaki kod içerisinde biraz olayı abartarak ToolTip
içerisine bir video yerleştirdik.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication6.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">35,41,170,124</span>"

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Dugme</span>"

<span style="color: blue;">            </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TIKLA</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">        **  \<**</span><span
style="color: #a31515;">**ToolTip.Content**</span><span
style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">**MediaElement**</span><span
style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">66</span>"

<span style="color: blue;">                          </span><span
style="color: red;">VerticalAlignment</span><span
style="color: blue;">=</span>"<span style="color: blue;">Bottom</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Source</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://localhost:49167/SilverlightApplication6Web/Bear.wmv</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Stretch</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Fill</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">          **\</**</span><span
style="color: #a31515;">**ToolTip.Content**</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

![Tooltip içerisinde stream
video!](media/Silverlight_2_0_icerisinde_ToolTip_Kontrolu_ve_Tooltip_sablonlari/11062008_3.jpg)\
*Tooltip içerisinde stream video!*

**Özel Tooltip!**

Tooltip kontrolünün içerisinde gösterilecek Content'i değiştirmenin yanı
sıra tamamen Tooltip'in görsel durumunu da değiştirebiliriz. Örneğin
yuvarlak bir Tooltip yapılabilir. Bunun için ilk olarak Tooltip
kontrolünün varsayılan Template yapısını MSDN üzerinden almamız
gerekiyor. Adres şu şekilde;
<http://msdn.microsoft.com/en-us/library/cc296244(VS.95).aspx>

Elimizdeki **Template** içerisindeki ControlTemplate tagları arasındaki
herşey bizim Tooltip'in görüntü şablonunu oluşturuyor. Buradaki
Binding'lere dokunmamaya çalışıyoruz. Özellikle **ContentPresenter'ı**
silmememiz gerekiyor çünkü ToolTip'in Content'ına verilen içerik
Template içerisinde buraya yerleştiriliyor olacak.

Gelin farklı bir şey yapalım ve kendi içine konan metni Scrollbar ile
gösterebilen bir Tooltip oluşturalım. Bunun için hemen ControlTemplate'i
düzenlememiz gerekiyor.

<span style="color: blue;">\<</span><span
style="color: #a31515;">UserControl</span><span style="color: blue;">
</span><span style="color: red;">x:Class</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SilverlightApplication6.Page</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml/presentation</span>"

<span style="color: blue;">            </span><span
style="color: red;">xmlns:x</span><span
style="color: blue;">=</span>"<span
style="color: blue;">http://schemas.microsoft.com/winfx/2006/xaml</span>"

<span style="color: blue;">            </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">400</span>"

<span style="color: blue;">            </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">300</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Style</span><span style="color: blue;">
</span><span style="color: red;">x:Key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToolTipStili</span>"

<span style="color: blue;">          </span><span
style="color: red;">TargetType</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToolTip</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Setter</span><span style="color: blue;">
</span><span style="color: red;">Property</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Foreground</span>"

<span style="color: blue;">              </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FF313131</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Setter</span><span style="color: blue;">
</span><span style="color: red;">Property</span><span
style="color: blue;">=</span>"<span
style="color: blue;">FontSize</span>"

<span style="color: blue;">              </span><span
style="color: red;">Value</span><span
style="color: blue;">=</span>"<span style="color: blue;">11</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Setter</span><span style="color: blue;">
</span><span style="color: red;">Property</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Background</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">Setter.Value</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;"> </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToolTipBackground</span>"

<span style="color: blue;">                              </span><span
style="color: red;">StartPoint</span><span
style="color: blue;">=</span>"<span style="color: blue;">0,0</span>"

<span style="color: blue;">                              </span><span
style="color: red;">EndPoint</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0,1</span>"<span style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">LinearGradientBrush.GradientStops</span><span
style="color: blue;">\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFF9FAFA</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">0</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFEDF1F4</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.37259</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFE2E8EF</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span
style="color: blue;">0.372881</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">              \<</span><span
style="color: #a31515;">GradientStop</span><span style="color: blue;">
</span><span style="color: red;">Color</span><span
style="color: blue;">=</span>"<span
style="color: blue;">\#FFC3C9CD</span>"

<span style="color: blue;">                            </span><span
style="color: red;">Offset</span><span
style="color: blue;">=</span>"<span style="color: blue;">1</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">            \</</span><span
style="color: #a31515;">LinearGradientBrush.GradientStops</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">LinearGradientBrush</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">Setter.Value</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Setter</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">Setter</span><span style="color: blue;">
</span><span style="color: red;">Property</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Template</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">Setter.Value</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \<</span><span
style="color: #a31515;">**ControlTemplate**</span><span
style="color: blue;"> </span><span
style="color: red;">TargetType</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ToolTip</span>"<span style="color: blue;">\></span>

<span style="color: blue;">            \<</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;"> </span><span
style="color: red;">Height</span><span
style="color: blue;">=</span>"<span style="color: blue;">30</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Width</span><span
style="color: blue;">=</span>"<span style="color: blue;">100</span>"

<span style="color: blue;">                          </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WhiteSmoke</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">              **\<**</span><span
style="color: #a31515;">**ScrollViewer.Content**</span><span
style="color: blue;">\></span>

<span style="color: blue;">                \<</span><span
style="color: #a31515;">**ContentPresenter**</span><span
style="color: blue;"> </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding Content}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">ContentTemplate</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding ContentTemplate}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Cursor</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding Cursor}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">FontFamily</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding FontFamily}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">FontSize</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding FontSize}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">FontStretch</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding FontStretch}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">FontStyle</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding FontStyle}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">FontWeight</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding FontWeight}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Foreground</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding Foreground}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">HorizontalContentAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding
HorizontalContentAlignment}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">Padding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding Padding}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">TextAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding TextAlignment}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">TextDecorations</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding TextDecorations}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">TextWrapping</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding TextWrapping}</span>"

<span style="color: blue;">                                 
</span><span style="color: red;">VerticalContentAlignment</span><span
style="color: blue;">=</span>"<span
style="color: blue;">{TemplateBinding
VerticalContentAlignment}</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">      **        \</**</span><span
style="color: #a31515;">**ScrollViewer.Content**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**            \</**</span><span
style="color: #a31515;">**ScrollViewer**</span><span
style="color: blue;">\></span>

<span style="color: blue;">          \</</span><span
style="color: #a31515;">ControlTemplate</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">Setter.Value</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">Setter</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Style</span><span style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">UserControl.Resources</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">
</span><span style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">LayoutRoot</span>"

<span style="color: blue;">        </span><span
style="color: red;">Background</span><span
style="color: blue;">=</span>"<span
style="color: blue;">White</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">Button</span><span style="color: blue;">
</span><span style="color: red;">Margin</span><span
style="color: blue;">=</span>"<span
style="color: blue;">35,41,170,124</span>"

<span style="color: blue;">            </span><span
style="color: red;">x:Name</span><span
style="color: blue;">=</span>"<span style="color: blue;">Dugme</span>"

<span style="color: blue;">            </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span
style="color: blue;">TIKLA</span>"<span style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">ToolTip</span><span style="color: blue;">
</span><span style="color: red;">Style</span><span
style="color: blue;">=</span>"<span style="color: blue;">{StaticResource
ToolTipStili}</span>"

<span style="color: blue;">                </span><span
style="color: red;">Content</span><span
style="color: blue;">=</span>"<span style="color: blue;">Herhangi bir
açıklama metni burada olabilirdi.</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \</</span><span
style="color: #a31515;">ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">ToolTipService.ToolTip</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">Button</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">Grid</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">UserControl</span><span
style="color: blue;">\></span>

Yukarıdaki kodumuz içerisinde ControlTemplate'in doğrudan içine bir
**ScrollViewer** yerleştirdik ve Template içerisinde ContentPresenter'ı
da **ScrollViewer'ın** Content değerine aktardık. Böylece bu ToolTip
kontrolüne aktarılan tüm Content bir ScrollViewer içerisinde
gösterilecek.

![Custom
Tooltip](media/Silverlight_2_0_icerisinde_ToolTip_Kontrolu_ve_Tooltip_sablonlari/11062008_4.png)\
*Custom Tooltip*

Siz de bu şekilde farklı ToolTip kontrolleri tasarlayarak
uygulamalarınıza kullanabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-6-12 tarihinde yayinlanmistir.*
