# WPF'te Dependency Property'lerde başka neler var
Dün hatırlarsanız [Silverlight tarafında DP (Dependency Property)'lerin
kullanımına](http://daron.yondem.com/tr/post/Silverlightta_Dependency_Propertyler)
değinmiştik. Yazının sonuna doğru WPF'te aslında DP'lerin bazı ek
özelliklerinin de olduğundan bahsetmiştim. Şimdi gelen o özelliklere bir
göz atalım.

**[C\#]**

        <span style="color:blue;">public</span> <span
style="color:blue;">string</span> Adi\
        {\
            <span style="color:blue;">get</span> { <span
style="color:blue;">return</span> (<span
style="color:blue;">string</span>)GetValue(AdiProperty); }\
            <span
style="color:blue;">set</span> { SetValue(AdiProperty, <span
style="color:blue;">value</span>); }\
        }\
\
        <span style="color:blue;">public</span> <span
style="color:blue;">static</span> <span
style="color:blue;">readonly</span> <span
style="color:#2b91af;">DependencyProperty</span> AdiProperty =\
            <span
style="color:#2b91af;">DependencyProperty</span>.Register(\
               <span style="color:#a31515;">"Adi"</span>,\
               <span style="color:blue;">typeof</span>(<span
style="color:blue;">string</span>),\
               <span style="color:blue;">typeof</span>(<span
style="color:#2b91af;">MainWindow</span>),\
          <span style="color:blue;">new</span> <span
style="color:#2b91af;">PropertyMetadata</span>(<span
style="color:#a31515;">"Varsayılan Değer"</span>,OnAdiPropertyChanged, AdiCoerceCallback), AdiValidateCallback);

Yukarıda basit şekli ile bir DP'nin tanmını görüyorsunuz. SL tarfına
göre değişen kısım **PropertyMetaData** kısmı. Burada ilk parametremiz
eğer varsa Property'nin alacağı varsayılan değer. İkinci parametre ise
yine SL'de de bulunan Property binding vs yolları ile değiştiğinde
çalışacak olan Callback metodu. Tüm bunlara ek olarak WPF'te
PropertyMetaData'ya bir de **CoerceCallback** verebiliyoruz.

**[C\#]**

        <span style="color:blue;">private</span> <span
style="color:blue;">static</span> <span
style="color:blue;">object</span> AdiCoerceCallback(<span
style="color:#2b91af;">DependencyObject</span> obj, <span
style="color:blue;">object</span> o)\
        {\
            <span style="color:blue;">string</span> s = o <span
style="color:blue;">as</span> <span style="color:blue;">string</span>;\
            <span style="color:blue;">if</span> (s.Length \> 12)\
                s = s.Substring(0, 12);\
            <span style="color:blue;">return</span> s;\
        }

CoerceCallback bize eldeki değeri bir anlamda valide edip başka bir
değere mecbur kılmayı sağlıyor. Örneğin bir Slider'ın Value'sunu hiçbir
zaman MaxValue'nun üzerinde bir değere set edemezsiniz. Bu gibi
kontroller CoerceCallback'te yapılabiliyor.

Son olarak WPF örneğimizde farklı olan bir de ValidateCallback'imiz var.

**[C\#]**

        <span style="color:blue;">private</span> <span
style="color:blue;">static</span> <span
style="color:blue;">bool</span> AdiValidateCallback(<span
style="color:blue;">object</span> value)\
        {\
            <span style="color:blue;">return</span> value != <span
style="color:blue;">null</span>;\
        }

Adından da belli olacağı üzere burada da validasyon yapabiliyoruz. Geri
döndüreceğiniz Boolean değere göre system Exception üretiyor.

WPF'teki farklılıklar bunlar, ama daha DP maceralarımız bitmedi :) Yarın
devam.

Hepinize kolay gelsin!



*Bu yazi http://daron.yondem.com adresinde, 2011-9-5 tarihinde yayinlanmistir.*
