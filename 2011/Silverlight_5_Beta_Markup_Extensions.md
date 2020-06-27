# Silverlight 5 Beta Markup Extensions
XAML tarafındaki binding mekanizmalarını biliyoruz. Örneğin herhangi bir
property'yi XAML tarafında tanımlı bir nesnenin bir attribute'üne
bağlamak için aşağıdaki gibi basit bir binding syntaxi kullanabiliriz.

<span style="color:#a31515;">         </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBox</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Binding</span><span
style="color:red;"> Metin</span><span style="color:blue;">,</span><span
style="color:red;"> Mode</span><span
style="color:blue;">=TwoWay}" /\></span>

Peki ya bu yapıların yeterli gelmediği senaryolarda kendi yapılarımızı
tanımlama şansımız var mı? İşte tam da bu noktada **Markup Extensions**
Silverlight 5 Beta ile karşımıza çıkıyor. Çoğu zaman ViewModel'lerinizi
daha temiz tutabilmek ve olabildiğince View(XAML) ile ViewModel'i
birbirinden uzak tutabilmek adına kullanabileceğimiz Markup Extensions
özelliği gelin beraber inceleyelim.

**Kendi extensionlarımızı yaratsak?**

Kendi markup extension'ınızı yaratmanızı gerektirecek birçok senaryo ve
neden bulunabilir. Biz şimdilik ufak bir lokalizasyon örneği üzerinden
ilerleyelim. Böylece yapının nasıl çalıştığını ve implementasyonu
incelemiş oluruz. Sonrası artık sizin hayal gücünüze kalır ;)

Örneğimizde herhangi bir kontrole verilecek olan String değerin lokalize
olmasını sağlayacağız. Bu işlem Silverlight içerisinde farklı binding
yapıları ile yapılabilir fakat synaxti basitleştirmeyi düşünürsek
aşağıdaki gibi birşey hayal edebiliriz.

<span style="color:#a31515;">         </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">TextBox</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">Lokalizasyon</span><span
style="color:red;"> Anahtar</span><span
style="color:blue;">=Metin,</span><span
style="color:red;"> Varsayılan</span><span
style="color:blue;">=Bulunamadı}" /\></span>

Hayat ne kadar güzel olurdu değil mi? XAML kodu ne kadar da temiz
gözüküyor :) **Metin** adında bir anahtarımız olduğunu ve anahtara denk
gelen metnin dil dosyalarından alınacak TextBox'ın **Text** değerine
verilmesi gerektiğini belirtmek keşke bu kadar kolay olsa. Diğer yandan
bir ikinci parametre olarak da **Varsayılan** değerimiz var. Eğer
lokalizasyon dosyalarında **Metin** anahtarı bulunamazsa bu değer
Textbox'a aktarılacak. Eh, gelin şimdi buna benzer birşey yapalım.

**[VB]**

<span style="color:blue;">Public</span> <span
style="color:blue;">Class</span> <span
style="color:#2b91af;">Lokalizasyon</span>\
     <span style="color:blue;">Inherits</span> Markup.<span
style="color:#2b91af;">MarkupExtension</span>\
\
    <span style="color:blue;">Public</span> <span
style="color:blue;">Property</span> Anahtar <span
style="color:blue;">As</span> <span style="color:blue;">String</span>\
     <span style="color:blue;">Public</span> <span
style="color:blue;">Property</span> Varsayilan <span
style="color:blue;">As</span> <span style="color:blue;">String</span>\
\
<span style="color: gray">    </span><span
style="color: gray;">Public</span> <span
style="color: gray;">Overrides</span> <span
style="color: gray;">Function</span><span
style="color: gray"> ProvideValue(serviceProvider </span><span
style="color: gray;">As</span><span
style="color: gray"> System.</span><span
style="color: gray;">IServiceProvider</span><span
style="color: gray">) </span><span style="color: gray;">As</span> <span
style="color: gray;">Object</span>\
 <span style="color: gray">        </span><span
style="color: gray;">Dim</span><span
style="color: gray"> Metin </span><span
style="color: gray;">As</span> <span
style="color: gray;">String</span><span
style="color: gray"> = </span><span
style="color: gray;">MevcutDil</span><span
style="color: gray">.Bul(Anahtar)\
         </span><span style="color: gray;">If</span> <span
style="color: gray;">String</span><span
style="color: gray">.IsNullOrEmpty(Metin) </span><span
style="color: gray;">Then</span>\
 <span style="color: gray">            </span><span
style="color: gray;">Return</span><span style="color: gray"> Varsayilan\
         </span><span style="color: gray;">Else</span>\
 <span style="color: gray">            </span><span
style="color: gray;">Return</span><span style="color: gray"> Metin\
         </span><span style="color: gray;">End</span> <span
style="color: gray;">If</span>\
 <span style="color: gray">    </span><span
style="color: gray;">End</span> <span
style="color: gray;">Function</span>\
 <span style="color:blue;">End</span> <span
style="color:blue;">Class</span>

İlk olarak yukarıdaki kod içerisindeki renkli kısımlara bakalım. Apayrı
bir kod dosyası yaratarak projemize ekledikten sonra yeni bir sınıf
yaratıyoruz. Bu sınıfımızın **MarkupExtensions'ın** türüyor olması çok
önemli. Böylece kendi Markup Extension'ımızı yazabileceğiz. Sonrasında
hemen bu markupda kullanmak istediğimiz olası parametreleri
belirtiyoruz. Bizim örneğimizde **Anahtar** ve **Varsayilan** adında iki
tane parametre hayal etmiştik. Hemen onları birer String Property olarak
tanımlıyoruz.

**[VB]**

<span style="color:blue;">Public</span> <span
style="color:blue;">Class</span> <span
style="color:#2b91af;">Lokalizasyon</span>\
     <span style="color:blue;">Inherits</span> Markup.<span
style="color:#2b91af;">MarkupExtension</span>\
\
    <span style="color:blue;">Public</span> <span
style="color:blue;">Property</span> Anahtar <span
style="color:blue;">As</span> <span style="color:blue;">String</span>\
     <span style="color:blue;">Public</span> <span
style="color:blue;">Property</span> Varsayilan <span
style="color:blue;">As</span> <span style="color:blue;">String</span>\
\
    <span style="color:blue;">Public</span> <span
style="color:blue;">Overrides</span> <span
style="color:blue;">Function</span> ProvideValue(serviceProvider <span
style="color:blue;">As</span> System.<span
style="color:#2b91af;">IServiceProvider</span>) <span
style="color:blue;">As</span> <span style="color:blue;">Object</span>\
         <span style="color:blue;">Dim</span> Metin <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = <span
style="color:#2b91af;">MevcutDil</span>.Bul(Anahtar)\
         <span style="color:blue;">If</span> <span
style="color:blue;">String</span>.IsNullOrEmpty(Metin) <span
style="color:blue;">Then</span>\
             <span style="color:blue;">Return</span> Varsayilan\
        <span style="color:blue;">Else</span>\
             <span style="color:blue;">Return</span> Metin\
        <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
     <span style="color:blue;">End</span> <span
style="color:blue;">Function</span>\
 <span style="color:blue;">End</span> <span
style="color:blue;">Class</span>

Gelelim can alıcı noktaya. Kendi markup extension'ımızı yaratabilmemiz
için bu extension'ın yapacağı şeyi de belirtmemiz gerek. Esas
işlevselliği kodlayacağımız yer **ProvideValue** metodu olacak. Bu
metodun içerisinde sınıfımızı gelen parametrelere göre gerekli kodları
yazarak geriye ne döndürmemiz gerektiğine karar verebiliyoruz.
Hatırlarsanız biz bir anahtara göre lokalizasyon dosyalarından metin
döndürecektik.

Bu noktada lokalizasyonu nasıl implemente ettiğiniz kısmına
bulaşmayacağız çünkü amacımız tam olarak o kısmı incelemek değil.
MevcutDil.Bul adında static/shared bir metoda anahtar göndererek o an
kullanıcının kullandığı dile göre metni aldığımızı düşünelim. Sonraki
adımda bu metnin boş olup olmadığını kontrol ediyoruz. Eğer metin boş
ise yapmamız gereken bize verilen **Varsayilan** parametresini geri
göndermek ki binding sonrasında o metin gözüksün.

Tüm bu kodlamayı bitirdikten sonra artık XAML tarafına geçebiliriz. İlk
Markup Extension'ımızı yazmış olduk. Sıra geldi onu kullanmaya. Bunun
için hemen bu sınıfı tanımladığımız assembly için bir XML namespace
tanımlayalım.

[XAML]

<span style="color: gray;">
\<UserControl x:Class="SilverlightApplication4.MainPage"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:d="http://schemas.microsoft.com/expression/blend/2008"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> mc:Ignorable="d"</span>\
             <span style="color:red;"> xmlns</span><span
style="color:blue;">:</span><span style="color:red;">daron</span><span
style="color:blue;">="clr-namespace:SilverlightApplication4"</span>\
 <span style="color: gray">   </span><span
style="color: gray;"> d:DesignHeight="300" d:DesignWidth="400"\></span>

Yukarıdaki gibi istediğiniz bir isimle XML namespaceinizi tanımladıktan
sonra doğrudan bu namespace üzerinden markup extensionımızı binding
syntaxlarında kullanabiliriz.

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
style="color:#a31515;">TextBox</span><span
style="color:red;"> Text</span><span style="color:blue;">="{</span><span
style="color:#a31515;">daron</span><span
style="color:blue;">:</span><span
style="color:#a31515;">Lokalizasyon</span><span
style="color:red;"> Anahtar</span><span
style="color:blue;">=Metin,</span><span
style="color:red;"> Varsayilan</span><span
style="color:blue;">=Bulunamadi}" /\></span>\
 <span style="color:#a31515;">    </span><span
style="color:blue;">\</</span><span
style="color:#a31515;">Grid</span><span style="color:blue;">\></span>

Başta hayal ettiğimize çok yakın bir yazım şeklini yakalayabildik değil
mi? İşte MarkUp Extension bu işe yarıyor. Esasında ViewModel'in içinde
ayağı olacak bir işlemi dışarı çekerek XAML kodunu da daha temiz
tutabiliyoruz. Makrup Extension yapıları ile "Şunu da ben bunla yaparım"
:) dediğiniz şeyleri yorum olarak bekliyorum ;) Bakalım neler çıkacak.

Görüşmek üzere.



*Bu yazi http://daron.yondem.com adresinde, 2011-4-18 tarihinde yayinlanmistir.*
