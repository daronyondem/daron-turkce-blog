---
FallbackID: 2689
Title: "Hazır Dependency Property'leri kullanmak"
date: "2011-9-6"
EntryID: Hazir_Dependency_Propertyleri_kullanmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0, Silverlight 3.0, Silverlight 4, Silverlight 5, Windows Phone, Windows Phone 7, WPF
---
# Hazır Dependency Property'leri kullanmak
İki gündür [DP (Dependency Property)'lerle
uğraşıyoruz](http://daron.yondem.com/tr/post/WPFte_Dependency_Propertylerde_baska_neler_var)
:) Artık kabaca ne olduklarını ve nasıl kullanıldıklarını anladık. Fakat
şu ana kadar hep biz kendi DP'lerimizi yarattık peki ya var olanlar?
Aslında hali hazırda var olan DP'leri aynı Framework'ün iç yapısının
kullandığı gibi kullanabiliyor olmak büyük kolaylıklar sağlayabilir.
Gelin basit bir örnekle var olan DP'lere nasıl el atabileceğimze göz
atalım.

Bu örneğimizde yapmak istediğimiz şey basit bir WPF uygulamasının ana
ekranının yüksekliği değiştiğinden bundan haberdar olmak. Biz biliyoruz
ki Window nesnesinin Height Property'si aslında bir DP! Bu durumda eğer
bu Property'nin Callback'ine ataçlanabilirsek değişikliklerden
rahatlıkla haberdar olabiliriz.

**[C\#]**

        <span
style="color:#2b91af;">DependencyPropertyDescriptor</span> HeightRef = <span
style="color:#2b91af;">DependencyPropertyDescriptor</span>.\
                FromProperty(<span
style="color:#2b91af;">Window</span>.HeightProperty, <span
style="color:blue;">typeof</span>(<span
style="color:#2b91af;">Window</span>)); 

İlk olarak yukarıdaki gibi hemen Property üzerinden Descriptor'ı almak
için yine **DependencyPropertyDescription** altındaki static/shared bir
metodu kullanıyoruz. Almak istediğimiz Property'nin PropertyPath'ini
verdikten sonra DP'nin sahibi nesnenin tipini de aktarıyoruz. Böylece
artık elimizde Descriptor var.

**[C\#]**

        <span style="color:blue;">void</span> MainWindow\_Loaded(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">RoutedEventArgs</span> e)\
        {\
            <span style="color:blue;">if</span> (HeightRef != <span
style="color:blue;">null</span>)\
            {\
                HeightRef.AddValueChanged(<span
style="color:blue;">this</span> , <span
style="color:blue;">delegate</span>\
                {\
                    TXT.Text = <span
style="color:blue;">this</span>.Height.ToString();\
                });\
            } \
        }

Uygulama açıldığında hemen Descripor'ımız hayatta mı diye kontrol
ettikten sonra Descriptor üzerinden AddValueChanged'e yeni bir event
listener veriyoruz. Böylece artık binding aracılığı ile herhangi bir
şekilde bu Property değiştiğinde bizim de durumdan haberimiz olacak.

Bu kodu çalıştırdığınızda uygulamanın ana ekranını resize ettikçe yeni
yüksekliğin hep size raporlandığını görebilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2011-9-6 tarihinde yayinlanmistir.*
