---
FallbackID: 2853
Title: "Jawbone UP İnceleme ve API Kullanımı"
date: "2013-8-26"
EntryID: Jawbone_UP_Inceleme_ve_API_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Gadget
---
Pedormetrelerle hiç uğraştınız mı bilmiyorum fakat son zamanlarda çok
farklı pedometreler farklı özelliklerle ortaya çıkıyorlar veya belki de
ben spora olan ilgimin hayatıma geri gelmesi ile bu durumun daha bir
farkına varmaya başladım. Her neyse, konumuz tabi ki bu değil. Pedometre
nedir? Kabaca attığınız adım sayısını sayan cihazlardır ve genelde
Accelerometer kullanırlar. Bu cihazlardan birine denk gelmediyseniz bile
kesinlikle aynı işi yapan iPhone, Android veya Windows Phone
uygulamalarına denk gelmişsinizdir. Telefonun accelerometresini
kullanarak attığınız adımları sayan bu uygulamalar pil ömrünüzden
yemekle de bilinirler :)

Tamam, geyiği bir kenara bırakıyorum. Karşınızda Jawbone Up!

Jawbone bileklik olarak kullanabildiğiniz bir pedometre ve beraberinde
birkaç güzel özellikle daha geliyor. Yukarıdaki videoda da anlatmaya
çalıştığım üzere :) adımlara sayıyor, titreşim ile sizi uyandırabiliyor,
uyku sürenizi ölçüyor ve gün içerisinde aktivitenizi olabildiğince
arttırmak için de arada sırada sizi dürtükleyebiliyor. 10 gün pil ömrü
ile rakipleri arasında ciddi şekilde dikkati çekiyor. Tabi bunu dijital
bir ekran ve bluetooth bağlantı özelliklerine sahip olmadığı için
yapabiliyor. Yine de 10 gün pil ömrü candır. Her gün şarj etmek zorunda
olduğunuz 80 milyon cihaza bir tane daha eklensin istemeyeceğinizden
eminim.

Cihazla ilgili kısa bir inceleme videosu (yukarılarda) yayınlamanın yanı
sıra ben biraz da araştırma yaparak bu cihazın ürettiği veriyi kendi web
sitesinden nasıl çekeriz kısmı üzerine çalıştım. Maalesef açık bir
şekilde developerlarla paylaştıkları API'leri yok. Rezaletin dik alası.
Neyse, bildiğim kadarı ile uygulama entegrasyonu düşünürseniz Jawbone
ile iletişime geçip API'lerine full erişim sağlayabiliyorsunuz ama benim
istediğimiz sadece salt "Read-Only" erişimdi. Yani doğrudan bir
entegrasyon senaryom yoktu. O nedenle biraz araştırdım ve internette
Jawbone API'lerini reverse engineering yöntemleri ile bulan arkadaşlarla
karşılaştım. Üzerine birazcık daha uğraşıp mini mini bir wrapper yazdım
:) Kaynak kodlarını da Github'a attım ki ilgilenenleriniz katkıda
bulunabilsin :)

**[Github]**

[Jawbone API Erişimi Testleri Kaynak
Kodu](https://github.com/daronyondem/jawboneUP "Jawbone API Erişimi Testleri Kaynak Kodu")

Bu işler nasıl oluyor derseniz, gelin hızlıca bir göz atalım.

**[C\#]**

        <span class="keyword" style="color:blue;">private</span> <span
class="User Types" style="color:#2b91af;">HttpClient</span> <span
class="identifier">aClient</span> <span class="operator">=</span> <span
class="keyword" style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">HttpClient</span>();\
         <span class="keyword" style="color:blue;">public</span> <span
class="User Types" style="color:#2b91af;">HttpClient</span> <span
class="identifier">Client</span>\
         {\
             <span class="keyword" style="color:blue;">get</span>\
             {\
                 <span class="identifier">aClient</span><span
class="operator">.</span><span
class="identifier">DefaultRequestHeaders</span><span
class="operator">.</span><span class="identifier">Add</span>(<span
class="string" style="color:#a31515;">"user-agent"</span>, <span
class="identifier">user\_Agent</span>);\
                 <span class="comment"
style="color:green;">//aClient.DefaultRequestHeaders.Add("x-nudge-token", nudge\_token);</span>\
                 <span class="identifier">aClient</span><span
class="operator">.</span><span
class="identifier">DefaultRequestHeaders</span><span
class="operator">.</span><span class="identifier">Add</span>(<span
class="string" style="color:#a31515;">"x-nudge-platform"</span>, <span
class="identifier">nudge\_platform</span>);\
                 <span class="identifier">aClient</span><span
class="operator">.</span><span
class="identifier">DefaultRequestHeaders</span><span
class="operator">.</span><span class="identifier">Add</span>(<span
class="string" style="color:#a31515;">"x-nudge-request-id"</span>, <span
class="identifier">nudge\_request\_id</span>);\
                 <span class="identifier">aClient</span><span
class="operator">.</span><span
class="identifier">DefaultRequestHeaders</span><span
class="operator">.</span><span class="identifier">Add</span>(<span
class="string" style="color:#a31515;">"x-nudge-device-id"</span>, <span
class="identifier">nudge\_device\_id</span>);\
                 <span class="keyword"
style="color:blue;">if</span> (<span class="operator">!</span><span
class="keyword" style="color:blue;">string</span><span
class="operator">.</span><span
class="identifier">IsNullOrEmpty</span>(<span
class="identifier">token</span>))\
                 {\
                     <span class="identifier">aClient</span><span
class="operator">.</span><span
class="identifier">DefaultRequestHeaders</span><span
class="operator">.</span><span class="identifier">Add</span>(<span
class="string" style="color:#a31515;">"x-nudge-token"</span>, <span
class="identifier">token</span>);\
                 }\
                 <span class="keyword"
style="color:blue;">return</span> <span
class="identifier">aClient</span>;\
             }\
         }

Jawbone API'ları ile konuşmak için header'a koymamız gereken bazı
bilgiler var. Bunlar arasında önemli olanlardan biri **Nudge-Token**.
Token adından da belli olduğu üzere ilk Authentication sonrası
alacağımız ve her API call'da kullanacağımız erişim anahtarımız. O
nedenle Authentication API hariç her yere giderken bu Token'ın header'da
bulunması şart. Geri kalan header değerlerini hardcoded tutabilirsiniz.
Default değerler Github projesinde var.

**[C\#]**

        <span class="keyword" style="color:blue;">public</span> <span
class="keyword" style="color:blue;">async</span> <span
class="User Types" style="color:#2b91af;">Task</span><span
class="operator">\<</span><span class="keyword"
style="color:blue;">string</span><span class="operator">\></span> <span
class="identifier">GetToken</span>()\
         {\
             <span class="User Types"
style="color:#2b91af;">HttpClient</span> <span
class="identifier">aClient</span> <span class="operator">=</span> <span
class="keyword" style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">APIClient</span>()<span
class="operator">.</span><span class="identifier">Client</span>;\
\
             <span class="keyword" style="color:blue;">var</span> <span
class="identifier">content</span> <span class="operator">=</span> <span
class="keyword" style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">FormUrlEncodedContent</span>(<span
class="keyword" style="color:blue;">new</span>[] \
             {\
                 <span class="keyword"
style="color:blue;">new</span> <span
class="User Types(Value Types)">KeyValuePair</span><span
class="operator">\<</span><span class="keyword"
style="color:blue;">string</span>, <span class="keyword"
style="color:blue;">string</span><span class="operator">\></span>(<span
class="string" style="color:#a31515;">"email"</span>, <span
class="identifier">EMail</span>),\
                 <span class="keyword"
style="color:blue;">new</span> <span
class="User Types(Value Types)">KeyValuePair</span><span
class="operator">\<</span><span class="keyword"
style="color:blue;">string</span>, <span class="keyword"
style="color:blue;">string</span><span class="operator">\></span>(<span
class="string" style="color:#a31515;">"pwd"</span>, <span
class="identifier">Password</span>),\
                 <span class="keyword"
style="color:blue;">new</span> <span
class="User Types(Value Types)">KeyValuePair</span><span
class="operator">\<</span><span class="keyword"
style="color:blue;">string</span>, <span class="keyword"
style="color:blue;">string</span><span class="operator">\></span>(<span
class="string" style="color:#a31515;">"service"</span>, <span
class="string" style="color:#a31515;">"nudge"</span>)\
             });\
\
             <span class="keyword" style="color:blue;">var</span> <span
class="identifier">result</span> <span class="operator">=</span> <span
class="keyword" style="color:blue;">await</span> <span
class="identifier">aClient</span><span class="operator">.</span><span
class="identifier">PostAsync</span>(<span class="User Types"
style="color:#2b91af;">APIUris</span><span
class="operator">.</span><span class="identifier">LoginUri</span>, <span
class="identifier">content</span>);\
             <span class="keyword" style="color:blue;">var</span> <span
class="identifier">rootResult</span> <span
class="operator">=</span> <span class="keyword"
style="color:blue;">await</span> <span
class="identifier">result</span><span class="operator">.</span><span
class="identifier">Content</span><span class="operator">.</span><span
class="identifier">ReadAsAsync</span><span
class="operator">\<</span><span class="User Types"
style="color:#2b91af;">APIEntities</span><span
class="operator">.</span><span class="User Types"
style="color:#2b91af;">RootObject</span><span
class="operator">\></span>();\
             <span class="keyword" style="color:blue;">if</span> (<span
class="identifier">rootResult</span><span class="operator">.</span><span
class="identifier">error</span> <span class="operator">!=</span> <span
class="keyword" style="color:blue;">null</span>)\
             {\
                 <span class="keyword"
style="color:blue;">throw</span> <span class="keyword"
style="color:blue;">new</span> <span class="User Types"
style="color:#2b91af;">Exception</span>(<span
class="identifier">rootResult</span><span class="operator">.</span><span
class="identifier">error</span><span class="operator">.</span><span
class="identifier">msg</span>);\
             }\
             <span class="keyword" style="color:blue;">else</span>\
             {\
                 <span class="keyword"
style="color:blue;">return</span> <span
class="identifier">rootResult</span><span class="operator">.</span><span
class="identifier">token</span>;\
             }            \
         }

Yukarıdaki kod ilk authentication kodumuz. Jawbone hesabınızın e-mail ve
password'ünü göndererek geriye bir token istiyoruz. Bu token biraz önce
bahsettiğimiz ve header'da tutacağımız token'ın ta kendisi. RootObject
nesnesinin ne olduğunu merak edebilirsiniz. Jawbone API'lerinin döndüğü
JSON'lara denk gelen C\# nesnelerini ben Github'daki projeye ekledim.
İşte RootObject de bu API call'un geriye döndürdüğü response'a denk
geliyor. Nesneyi full buraya kopyala-yapıştır koymuyorum. Zaten
Github'taki kaynak kodunda görebilirsiniz.

![Jawbone UP](media/Jawbone_UP_Inceleme_ve_API_Kullanimi/pic1.jpg)\
*Jawbone UP*

Token'ı aldıktan sonra benim son olarak yapmak istediğimiz
aktivitelerimi çekmekti. Bu noktada kullanacağımız API adresi aşağıdaki
şekilde;

https://jawbone.com/nudge/api/v.1.33/users/@me/social

Buradan epey detaylı bilgi dönüyor. Tüm aktivitilerle beraber attığınız
adım sayısı, süresi, eğer varsa logladığınız yiyecekler ve onların
kalori miktarlarının yanı sıra carb-protein-fat oranları gibi birçok
detaylı bilgiyi API'lardan alabiliyorsunuz. Eğer API'larla ilgili daha
fazla bilgi isterseniz aşağıdaki iki adresi incelemenizi tavsiye
edebilirim. Benim işime yukarıdaki iki API yettiği için ben sadece
onları Wrapper'a ekledim. Eğer siz de başka API'lar kullanacak olursanız
Github'da beklerim ;)

<https://niklaslindblad.se/2013/07/jawbone-up-api-updates/>
<http://eric-blue.com/projects/up-api/#JawboneUPAPI-NotableHTTPHeaders>. 

Görüşmek üzere!


