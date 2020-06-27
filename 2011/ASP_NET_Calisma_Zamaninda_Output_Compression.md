# ASP.NET Çalışma Zamanında Output Compression
Blogu yazarken kullandığım bir ufak taktiği daha sizlerle paylaşmak
istiyorum :) Özellikle blogun [arama](http://daron.yondem.com/tr/search)
ve [arşiv](http://daron.yondem.com/tr/archive/) kısımlarında süper işime
yarayan bu taktik IIS'ten response'un sıkıştırılarak gönderilmesi.
Konuya geçmeden önce sizden
blogun[arama](http://daron.yondem.com/tr/search)
ve[arşiv](http://daron.yondem.com/tr/archive/) kısımlarını bir ziyaret
etmenizi istiyorum. Sayfaların açılış hızından tutun özellikle arama
kısmındaki aramanın hızına kadar sanırım tüm bu performans öğeleri
dikkatinizi çekecektir. Sayfaların hızlı açılması adına birer günlük
output caching koyduğumu itiraf etmem gerek. Bu bölümlerde blogun son
bir günündeki değişikliklerin yansımamasını göze alarak böyle bir
caching stratejisinin doğru olacağını düşündüm.

**[HTML]**

        <span style="background: yellow;">\<%</span><span
style="color:blue;">@</span> <span
style="color:maroon;">OutputCache</span> <span
style="color:red;">Duration</span><span
style="color:blue;">="86400"</span> <span
style="color:red;">VaryByParam</span><span
style="color:blue;">="lang"</span> <span
style="background: yellow;">%\></span>\

Konumuz olmasa da yukarıdaki ayarlama hemen bir paylaşiyim istedim. Bu
arada unutmadan VaryByParam cachlemenin bir değişkene göre
farklılaştırılabilmesini sağlıyor. Örneğin benim blogda İngilizce ve
Türkçe sayfalarda arama sayfaları aslında aynı sadece URLReWriting
üzerinden gelen **Lang** parametresine göre sayfa kendisini
şekillendiriyor. Bu parametreye göre iki farklı cache alınıp
kullanılabilmesi için VaryByParam'ı da set edebiliyoruz. Bu kısa Cache
hatırlatmasından sonra gelelim esas
meseleye,[arama](http://daron.yondem.com/tr/search) sayfası.

### gzip veya deflate

Hem arama hem de arşiv sayfasında sayfanın outputu çok büyük. Arşiv
sayfasında tüm makaleler ve linkleri olduğu için HTML çok şişti. Arama
sayfasında ise başka bir nedenle şişme oldu :) O neden ne mi? Bloga
arama özelliğini eklerken düşündüm ve aslında postların başlıkları ve
tagleri dışında bir aramanın gerekmediğini düşündüm. Yani postların
metinlerinin içinde bir arama çok anlamlı değil. Sonrasında aklıma gelen
fikir şu oldu; acaba dedim 3000 tane postun başlıkları ile taglerini
direk sayfa ilk açılışında JSON olarak outputa eklesem sayfa çok mu
şişer? Düşündüğüm şey herşeyi sayfa ilk açılırken içine eklemek sonra da
arama işleminini tamamen JavaScript ile istemcide yapmaktı. Böylece
süper bir performans elde edecektim. Yaptığım testlerde 3000 makalenin
başlık ve tag bilgilerinin ortalam 120 KB tuttuğunu gördüm. Ortalama bir
ADSL bağlantısında bunun 1sn'de download olacağını düşünürsek aslında
uzun bir süre sayılmaz ama yine de plain-text bir içeriği böyle bulk
göndermek söz konusu olunca bunu ziplesem ne olur diye düşünmeye
başladım ve....

**[VB]**

        <span style="color:blue;">Public</span> <span
style="color:blue;">Shared</span> <span
style="color:blue;">Sub</span> GZipEncodePage()\
            <span style="color:blue;">If</span> IsGZipSupported() <span
style="color:blue;">Then</span>\
                <span style="color:blue;">Dim</span> Response <span
style="color:blue;">As</span> <span
style="color:#2b91af;">HttpResponse</span> = <span
style="color:#2b91af;">HttpContext</span>.Current.Response\
\
                <span
style="color:blue;">Dim</span> AcceptEncoding <span
style="color:blue;">As</span> <span
style="color:blue;">String</span> = <span
style="color:#2b91af;">HttpContext</span>.Current.Request.Headers(<span
style="color:#a31515;">"Accept-Encoding"</span>)\
                <span
style="color:blue;">If</span> AcceptEncoding.Contains(<span
style="color:#a31515;">"gzip"</span>) <span
style="color:blue;">Then</span>\
                    Response.Filter = <span
style="color:blue;">New</span> System.IO.Compression.<span
style="color:#2b91af;">GZipStream</span>(\
                        Response.Filter, System.IO.Compression.<span
style="color:#2b91af;">CompressionMode</span>.Compress)\
                    Response.AppendHeader(<span
style="color:#a31515;">"Content-Encoding"</span>, <span
style="color:#a31515;">"gzip"</span>)\
                <span style="color:blue;">Else</span>\
                    Response.Filter = <span
style="color:blue;">New</span> System.IO.Compression.<span
style="color:#2b91af;">DeflateStream</span>(\
                        Response.Filter, System.IO.Compression.<span
style="color:#2b91af;">CompressionMode</span>.Compress)\
                    Response.AppendHeader(<span
style="color:#a31515;">"Content-Encoding"</span>, <span
style="color:#a31515;">"deflate"</span>)\
                <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
            <span style="color:blue;">End</span> <span
style="color:blue;">If</span>\
        <span style="color:blue;">End</span> <span
style="color:blue;">Sub</span>

İşte ortaya yukarıdaki kod çıktı. Bu kod ilk olarak sayfayı açan
istemcinin**Encoding** destekleyip desteklemediğine göz atıyor. Sonra da
desteklenen encoding seçeneğine göre uygun **gzip** veya **deflate**
encoding'i kullanıyor. Bu teknik sunucunuzun durumuna göre hafiften ek
yük yaratabilir. Özellikle dinamik sayfaları sürekli zipliyor olmak tabi
ki request yükünü etkileyecektir. Fakat benim senaryomdaki gibi zaten
günlük cachelenen bir içeriği ziplemenin hiçbir zararı olmaz. Sözün özü
120 KB'lık output 30KB civarına indi. Özetle 35 KB'lık bir arama sayfası
3000 makalenin başlık ve taglerini de download etmiş şekilde istemciye
gönderiliyor. Hiç fena değil!

gzip ve deflate gibi output compression site genelinde IIS'ten de
ayarlanabilir ama sitenizin yüküne göre çalışma zamanında kapatıp açmak
veya sayfa bazında kapatıp açmak isterseniz yukarıdaki kod işinizi
görecektir.

Hepinize kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2011-9-8 tarihinde yayinlanmistir.*
