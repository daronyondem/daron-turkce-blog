# Silverligh 5 Beta ve DoubleClick
Yıllardır :) Silverlight'ta DoubleClick neden yok diye bekliyoruz da
bekliyoruz :) Tabi bekliyoruz derken aslında birka satır kodla olay
çözülebiliyor. Hatta bu konuda mini bir
[makalem](http://daron.yondem.com/tr/post/15fd122a-d6c9-4b81-b716-1470ca32abe1)
bile var. Ama malum yani insan gibi bir DoubleClick eventimiz olsaydı
kontroller için olmaz mıydı? Oldu, hem de daha fazlası oldu!

**Double, Triple, Quadruple...
n-**[**tuple**](http://en.wikipedia.org/wiki/Tuple) **:) click!**

Hani bir kod yazarken her ihtimali düşünme hikayesi (çukuru) vardır ya?
Tam da o çukurun etrafında gezeceğiz şimdi. DoubleClick beklerken
Silverlight 5 Beta ile beraber öyle bir mekanizma geldi ki artık ister
double, ister Triple istediğiniz click miktarını yakalayabilirsiniz.
Gerekli mi? Tartışmayı size bırakıyorum :) ama gelin bir olayın nasıl
kullanıldığına göz atalım.

**[XAML]**

<span style="color:#a31515;">    </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Grid</span><span
style="color:red;"> x</span><span style="color:blue;">:</span><span
style="color:red;">Name</span><span
style="color:blue;">="LayoutRoot"</span><span
style="color:red;"> Background</span><span
style="color:blue;">="White"\></span>\
 <span style="color:#a31515;">        </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">Rectangle</span><span
style="color:red;"> Height</span><span
style="color:blue;">="100"</span><span
style="color:red;"> HorizontalAlignment</span><span
style="color:blue;">="Left"</span> \
                   <span style="color:red;"> Margin</span><span
style="color:blue;">="134,96,0,0"</span><span
style="color:red;"> Name</span><span
style="color:blue;">="rectangle1"</span><span
style="color:red;"> Stroke</span><span
style="color:blue;">="Black"</span> \
                   <span style="color:red;"> StrokeThickness</span><span
style="color:blue;">="1"</span><span
style="color:red;"> VerticalAlignment</span><span
style="color:blue;">="Top"</span><span
style="color:red;"> Width</span><span
style="color:blue;">="200" /\></span>\
 <span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>

İlk olarak sahneye basit bir Rectangle alıyoruz. Bu Rectangle'ın
DoubleClick vs durumunu yakalamak için kodumuzda hemen
**MouseLeftButtonDown** eventine bir listener ekliyoruz.

**[C\#]**

        <span style="color:blue;">public</span> MainPage()\
         {\
            InitializeComponent();\
             rectangle1.MouseLeftButtonDown += <span
style="color:blue;">new</span> <span
style="color:#2b91af;">MouseButtonEventHandler</span>(rectangle1\_MouseLeftButtonDown);     \
         }\
\
        <span
style="color:blue;">void</span> rectangle1\_MouseLeftButtonDown(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">MouseButtonEventArgs</span> e)\
         {\
            \
        }

"Nasıl yani?" dediğinizi duyar gibiyim. Hani DoubleClick'ti?
**MouseLeftButtonDown** da nereden çıktı değil mi? Sürprizi sona
saklıyorum :)

** [C\#]**

        <span
style="color:blue;">void</span> rectangle1\_MouseLeftButtonDown(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">MouseButtonEventArgs</span> e)\
         {\
            <span
style="color:blue;">if</span>(**e**.**ClickCount** == 2)\
             {\
                <span
style="color:#2b91af;">MessageBox</span>.Show(<span
style="color:#a31515;">"Çift tıklandı!"</span>);               \
             }\
        }

Tadaaa! :) "Saçmalığa gel" dediğinizi duyar gibiyim. Bu özelliği
runtime'a bu şekilde eklemeyi kim akıl etti bilemiyorum :) Daha önce
başka bir platformda karşılaşanınız varsa lütfen yorum bıraksın :) Şaka
bir yana saçma olmanın yanı sıra esneklik anlamında da eleştiri
alamayacak bir implementasyon söz konusu :) Ama bilemiyorum, yani
istediğimiz bir DoubleClick eventiydi. "Kör istedi...." :)

Neyse, sonuç itibari ile DoubleClick öyle veya böyle artık Silverlight 5
Beta ile karşımızda. **MouseButtonEventArgs** üzerinden **ClickCount**
propertysi ile klik sayısını alarak iki olduğunda istediğimiz işlemi
yapabiliriz. İyi günlere hep beraber kullanalım ;)

Görüşmek üzere.

Not: Bu implementasyon SL5 release olduğunda değişir. Sonra söylemedi
demeyin :)



*Bu yazi http://daron.yondem.com adresinde, 2011-4-19 tarihinde yayinlanmistir.*
