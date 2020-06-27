---
FallbackID: 2705
Title: "Windows 8 Metro UI'da AppBar Kullanımı"
date: "2011-9-22"
EntryID: Windows_8_Metro_UI_da_AppBar_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Metro UI, Visual Studio 11, Windows 8
---
# Windows 8 Metro UI'da AppBar Kullanımı
Windows 8 ile beraber Metro UI'da gelen uygulamalarda ekranı
olabildiğince temiz tutabilmek adına uygulama komutlarının ciddi bir
kısmının AppBar adı verilen barlarda saklanması söz konusu. Bu barlar
ekranın üst ve alt kısımlardan kullanıcı istediği zaman ekrana bir
animasyonla gelip bir toolbar gibi komutları listeyebiliyorlar.

![AppBar işte böyle birşey
:)](media/Windows_8_Metro_UI_da_AppBar_Kullanimi/appbar1.jpg)\
*AppBar işte böyle birşey :)*

Yukarıdaki ekran görüntüsünde örnek bir uygulama olarak Tweet@rama'yı
görüyorsunuz. Bu uygulama basit bir twitter istemcisi. İstemci
içerisindki verilerin yenilenmesi için kullanılacak **Refresh** ve
**Logout** düğmesi appbar içerisin yerleştirilmiş. AppBar'lar normald
uygulama başladığında görünmüyorlar. Ekranın alt ve varsa üstündn
AppBar'ların ekrana gelmesi için kullanıcının parmağı ile ekranın
dışından içeriye doğru üsttn veya alttan bir sürükleme işlemi yapması
AppBar'ın gözükmesi için yeterli. Touch olmayan cihazlarda ise ekranda
herhangi bir yerde fareye sağ tuşla tıklamak veya Ctrl+Alt+A kısayolu
AppBar'ın gözükmesini sağlıyor.

**[XAML]**

<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="LayoutRoot"</span><span
style="color:red;"> Background</span><span
style="color:blue;">="\#FFFFFF"\></span>\
<span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ApplicationBar</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="AppBarUst"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="88"</span><span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top" /\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>

Uygulamanıza bir AppBar eklemenin basit yolu yukarıdaki gibi XAML
tarafında bu işlemi tamamlamak. VerticalAlignment'ta Top verdiğiniz
AppBar'ınız ekranın üstünden, Bottom verdiğinizde ise altından
gelecektir. Varsayılan tasarım konseptinde AppBar'lar 88 piksel
yüksekliğinde fakat tabi ki bunu değiştirebilirsiniz. Fakat unutmayın
Touch için uygun olması açısından en azından AppBar'ın minimum bu
yükseklikte olmasının faydası var.

Yukarıdaki kodumuz bize boş bir AppBar verdi. Şimdi sıra geldi onun
içine birşeyler koymaya. Aslında bu noktadan sonrası normal bir
XAML/C\#/VB ilişkisinden farklı değil.

**[XAML]**

<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ApplicationBar</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="AppBarUst"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="88"</span><span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top" \></span>\
<span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>\
<span style="color:#a31515;">            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid.ColumnDefinitions</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ColumnDefinition</span><span
style="color:red;"> Width</span><span
style="color:blue;">="\*"/\></span>\
<span style="color:#a31515;">                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ColumnDefinition</span><span
style="color:red;"> Width</span><span
style="color:blue;">="Auto"/\></span>\
<span style="color:#a31515;">            </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid.ColumnDefinitions</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Button</span><span
style="color:red;"> Grid.Column</span><span
style="color:blue;">="0"</span><span
style="color:red;"> Content</span><span
style="color:blue;">="Back"</span><span style="color:red;"> \
                    Style</span><span
style="color:blue;">="{</span><span
style="color:#a31515;">StaticResource</span><span
style="color:red;"> BackButtonStyle</span><span style="color:blue;">}"\
                   </span><span
style="color:red;">HorizontalAlignment</span><span
style="color:blue;">="Left"</span><span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top"/\></span>\
<span style="color:#a31515;">        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">ApplicationBar</span><span
style="color:blue;">\></span>

ApplicationBar içerisin koymak istediğimiz düğmeleri doğrudan bir Grid
içerisine alıp AppBar'ın içine yerleştirebiliyoruz. Burada sadece ufak
bir uyarıda bulunmam gerek. Metro Style gereği tavsiye edilen
AppBar'daki düğmelerin ya ekranın sağına ya da soluna yapışık dizilmesi.
AppBar'ı ortalayarak düğme koymak doğru değil. Bunun özünd yatan neden
ise insanların ellerinde tablet tuttuklarında ekranın ortasına
ulaşmalarının zor olması :) Oysa ekran kenarlarına dokunmak çok daha
kolay olacaktır özellikle tableti iki elinizle kenarlardan tuttuğunuzu
düşünürsek.

Bu örnekte ben basit Button yerleştirdim. Button'umuzun Stlye'ını da
aşağıda paylaşıyorum.

**[XAML]**

<span style="color:blue;">\<</span><span
style="color:#a31515;">Style</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Key</span><span
style="color:blue;">="BackButtonStyle"</span><span
style="color:red;"> TargetType</span><span
style="color:blue;">="Button"\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="Background"</span><span
style="color:red;"> Value</span><span
style="color:blue;">="Transparent"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="Foreground"</span><span
style="color:red;"> Value</span><span
style="color:blue;">="White"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="BorderBrush"</span><span
style="color:red;"> Value</span><span
style="color:blue;">="Transparent"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="FontFamily"</span><span
style="color:red;"> Value</span><span
style="color:blue;">="Segoe UI"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="FontSize"</span><span
style="color:red;"> Value</span><span
style="color:blue;">="9"/\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter</span><span
style="color:red;"> Property</span><span
style="color:blue;">="Template"\></span>\
<span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Setter.Value</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ControlTemplate</span><span
style="color:red;"> TargetType</span><span
style="color:blue;">="Button"\></span>\
<span style="color:#a31515;">                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>\
<span style="color:#a31515;">                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">VisualStateManager.VisualStateGroups</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">VisualStateGroup</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="CommonStates"\></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">VisualState</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="Normal"/\></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">VisualState</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="MouseOver"/\></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">VisualState</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="Pressed"\></span>\
<span
style="color:#a31515;">                                </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Storyboard</span><span
style="color:blue;">\></span>\
<span
style="color:#a31515;">                                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ColorAnimation</span><span
style="color:red;"> Duration</span><span
style="color:blue;">="0"</span><span style="color:red;"> \
                                        To</span><span
style="color:blue;">="White"</span><span style="color:red;"> \
                        Storyboard.TargetProperty</span><span
style="color:blue;">="(Ellipse.Fill).(SolidColorBrush.Color)"\
                       </span><span
style="color:red;">Storyboard.TargetName</span><span
style="color:blue;">="ButtonEllipse" /\></span>\
<span
style="color:#a31515;">                                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">ColorAnimation</span><span
style="color:red;"> Duration</span><span
style="color:blue;">="0"</span><span style="color:red;"> To</span><span
style="color:blue;">="Black"</span><span style="color:red;"> \
                    Storyboard.TargetProperty</span><span
style="color:blue;">="(TextBlock.Foreground).(SolidColorBrush.Color)"</span><span
style="color:red;">\
                    Storyboard.TargetName</span><span
style="color:blue;">="Glyph" /\></span>\
<span
style="color:#a31515;">                                </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Storyboard</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">VisualState</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">VisualStateGroup</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">VisualStateManager.VisualStateGroups</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">StackPanel</span><span
style="color:red;"> Orientation</span><span
style="color:blue;">="Vertical"\></span>\
<span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span> <span
style="color:red;">Margin</span><span
style="color:blue;">="0,14,0,5" \></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Ellipse</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="ButtonEllipse"</span><span
style="color:red;"> Height</span><span
style="color:blue;">="40"</span><span
style="color:red;"> Width</span><span
style="color:blue;">="40"</span><span style="color:red;"> \
                                    Fill</span><span
style="color:blue;">="Transparent"</span><span
style="color:red;"> HorizontalAlignment</span><span
style="color:blue;">="Center"\
</span>                           <span style="color:red;">       
Stroke</span><span style="color:blue;">="White"</span><span
style="color:red;"> \
                                    StrokeThickness</span><span
style="color:blue;">="2"</span><span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Center"/\></span>\
<span style="color:#a31515;">                            </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="Glyph"</span><span
style="color:red;"> Text</span><span
style="color:blue;">="ç"</span><span
style="color:red;"> FontFamily</span><span
style="color:blue;">="Wingdings"</span><span style="color:red;"> \
                                        FontSize</span><span
style="color:blue;">="25"</span><span
style="color:red;"> HorizontalAlignment</span><span
style="color:blue;">="Center"\
</span><span
style="background-color: #FFFFFF">                                       </span><span
style="color:red;">VerticalAlignment</span><span
style="color:blue;">="Center" /\></span>\
<span style="color:#a31515;">                        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>\
<span style="color:#a31515;">                        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBlock</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">TemplateBinding</span><span
style="color:red;"> Content</span><span
style="color:blue;">}"</span><span
style="color:red;"> HorizontalAlignment</span><span
style="color:blue;">="Center"\
</span>                       <span style="color:red;">          
FontFamily</span><span style="color:blue;">="Segoe UI"</span><span
style="color:red;"> FontSize</span><span
style="color:blue;">="12"/\></span>\
<span style="color:#a31515;">                    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">StackPanel</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">                </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>\
<span style="color:#a31515;">            </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">ControlTemplate</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">        </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Setter.Value</span><span
style="color:blue;">\></span>\
<span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Setter</span><span style="color:blue;">\></span>\
<span style="color:blue;">\</</span><span
style="color:#a31515;">Style</span><span style="color:blue;">\></span>

Sonuç olarak uygulamamızı bu şekli ile çalıştırdığıp AppBar'ımız görünür
hale getirdiğimizde aşağıdaki manzara ile karşılaşıyoruz.

!["Back" düğmemiz AppBar'da yerini
aldı.](media/Windows_8_Metro_UI_da_AppBar_Kullanimi/appbar2.jpg)\
*"Back" düğmemiz AppBar'da yerini aldı.*

Appbar'daki düğmeler normal Button'lar olduğu için doğal olarak onları
normal button olarak kullanıyoruz :) Yani Click eventleri vs eskisi ile
tamamen aynı.

**[C\#]**

            AppBarUst.IsPersistent = <span
style="color:blue;">true</span>;

Eğer herhangi bir AppBar'ın sürekli gözükmesini isterseniz IsPersistent
özelliğine True vermeniz yeterli. Böylece uygulamanın ilk açıldığı andan
itibaren AppBar sürekli gözükür olacaktır. Opsyonel komutlar değil de
hep kullanılacak komutlar yerleştirecekseniz AppBar içerisine bu mantık
uygun olabilir.

Son olarak AppBar'ın ekranda çıkıp yok olma senaryosunda da değişikler
yapabilirsiniz. Normalde AppBar bir parmak sürtme :) işlemi ile ekrana
geldikten sonra tekrar ancak aynı parmak sürtme işlemi ile ekrandan
kaldırılabiliyor. Yani şu ekranın üst veya altından ekrana doğru bir
parmak sürtme işlemi vardı ya? onu tekrar yapmanız gerekiyor AppBar'ın
ekrandan kalkması için. Bu senaryoyu isterseniz **DismissMod** özelliği
ile değiştirebiliyorsunuz.

**[C\#]**

            AppBarUst.DismissMode = <span
style="color:#2b91af;">ApplicationBarDismissMode</span>.EdgeSwipe;  

AppBar'ın **DismissMode** özelliğine verebileceğiniz değerlerden biri
**EdgeSwipe**. Bu zaten normal şartlardaki AppBar'ın çalışma şekli.
Bunun haricinde isterseniz **LightDismiss** değerini vererek AppBar'ın
ekranda herhangi bir yere dokunulduğunda ekrandan direk gitmesini
sağlayabilirsiniz. Son olarak DismissMode'a verebileceğiniz bir diğer
değer ise **TimeDelay**. Bu durumda ise AppBar'ın belirli bir süre sonra
kendiliğinden yok olmasını ayarlayabiliyorsunuz. Süre olarak istediğiniz
süreyi de AppBar'ın **Delay** Property'sine mili saniye olarak
aktarabilirsiniz.

**[C\#]**

            AppBarUst.DismissMode = <span
style="color:#2b91af;">ApplicationBarDismissMode</span>.TimeDelay;\
            AppBarUst.Delay = 6000;

Hepinize kolay gelsin!

Bu makale **Visual Studio 11 Express for Windows Developer Preview**\
ve **Windows 8 Developer Preview Build 8102** kullanılarak yazılmıştır.



*Bu yazi http://daron.yondem.com adresinde, 2011-9-22 tarihinde yayinlanmistir.*
