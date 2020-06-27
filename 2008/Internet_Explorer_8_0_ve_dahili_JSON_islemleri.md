---
FallbackID: 2184
Title: "Internet Explorer 8.0 ve dahili JSON işlemleri"
date: "2008-9-13"
EntryID: Internet_Explorer_8_0_ve_dahili_JSON_islemleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: 5fd841c9-c9df-4e1c-a0d0-0f35e19c839a
---
AJAX ile programlama yaparken en sık kullandığımız veri taşıma
formatlarından biri JSON (JavaScript Object Notation). Detaylarına
baktığımızda ASP.NET AJAX içerisinde de tüm PageMethod'lar sunucundan
istemciye JSON formatından veri gönderiyor. Bunun tabi ki anlamlı
nedenleri var; JSON XML'e kıyasla çok daha düşük boyutta çok daha fazla
veri taşıyabiliyor. Ayrıca JSON'un JavaScript tarafında kullanımı XML'e
göre daha kolay. JSON'un artık neredeyse tüm AJAX kütüphanelerinde
kullanıldığını düşünürsek Microsoft tarafında da IE 8.0'a JSON ile
ilgili özelliklerin eklenmesi gerektiği kararı alınarak Beta 2 ile
beraber doğrudan JSON'a özel yeni JavaScript özellikleri sunuluyor.
Gelin neler varmış beraber inceleyelim.

**Eval() mi? İmdat!**

AJAX kullanılan sitelerdeki en büyük güvenlik açıklarının arkasına
baktığımızda belki de çoğu zaman Eval metodu karşımıza çıkacaktır. Peki
**Eval** metodu ne yapar? Eval kendisine String olarak verilen bir
değişkenin içindekileri bir kodmuş gibi çalıştırır. Örneğin aşağıdaki
kod çalıştırıldığında ekrana normalde alert JavaScript metodu
çalıştırılarak getirilen bir mesaj kutusu gelecektir.

        <span style="color: blue;">var</span> Degisken = <span
style="color: #a31515;">"alert('DENEME');"</span>;

        eval(Degisken);

Gördüğünüz gibi aslında çalıştırılan kod doğrudan bir metin olarak başka
bir değişkenin içerisinde saklanıyor. Güvenlik açığı nerede? JSON
kullandığınızda sunucudan gelen bir metni doğrudan Eval ile çalıştırarak
JSON'un bir JavaScript dizisi olmasını sağlarız. Bu noktada eğer veri
harici bir kaynaktan geliyorsa veya bu veriyi daha önce kullanıcı
girmişse aslında kullanıcının doğrudan sitenizde çalıştırılacak bir
JavaScript kodunu girmesini sağlamış olursunuz. Bunu engellemenin tabi
ki yolları var, harici kütüphanalerde yine JavaScript ile eval'e verilen
metinleri Parse ederek inceleyen metodlar mevcut, hatta bazıları bunun
için Regular Expression bile kullanabiliyor. Fakat bunların hepsi
unutmayalım ki yine JavaScript metodları kullanılarak yapılan işlemler.
Oysa bizim doğrudan tarayıcı motorunda bu işlemleri yapan bir sistemimiz
olsa daha hızlı ve güvenli olmaz mı?

**IE 8.0 ve JSON**

IE 8.0 Beta 2 ile beraber doğrudan JSON'u parse edebilme özelliği
geliyor. Serialization ve Deserialization işlemlerini doğrudan IE
içerisinde Native kodlar yaptığı için tabi ki ortaya çok daha yüksek
performanslı bir çözüm çıkıyor.

        <span style="color: blue;">var</span> KitaplarMetin = <span
style="color: #a31515;">"{\\"kitaplar\\":{\\"kitap\\":[\\"ASP.NET
AJAX\\",\\"ASP.NET 3.5 AJAX\\"]}}"</span>;

        <span style="color: blue;">var</span> Kitaplar =
JSON.parse(KitaplarMetin);

        alert(Kitaplar.kitaplar.kitap[0]);

Yukarıdaki kod içerisinde KitaplarMetin değişkenine bir JSON metni
aktarıyoruz. Bu metnin bir şekilde JavaScript nesnelerine çevrilmesi
gerekiyor. Bunun için klasik eval metodunu kullanmaktansa doğrudan IE
8.0 Beta 2 ile beraber gelen **JSON** nesnesinin **parse** özelliğini
kullanıyoruz. Son satırda ise artık Kitaplar değişkenimize aktarılan
JSON nesnelerinin içerisinden ilk kitabın adını alıyoruz.

Peki ya eldeki JavaScript nesnelerini JSON'dan standart metne çevirmek
istersek ne yapacağız? Bu durumda da yardımımıza yine JSON nesnesinin
**stringify** metodu yetişiyor.

        <span style="color: blue;">var</span> Kitaplar = {

            kitaplar:{

                kitap:[

                    <span style="color: #a31515;">'ASP.NET AJAX'</span>,

                    <span style="color: #a31515;">'ASP.NET 3.5
AJAX'</span>

                ]

            }

        };

        alert(JSON.stringify(Kitaplar));

Yukarıdaki örnekte yarattığımız Kitaplar adından nesneyi **stringify**
metodu ile bir JSON metnine çeviriyoruz. Ayrıca isteyenler haricen
.**toJSON** metodunu da kullanabilirler. IE 8.0 ile beraber standart
olarak Boolean, String, Date, Number sınıflarının prototiplerine toJSON
metodu eklenmiş durumda.

**Zaten JSON sınıfı lokalde harici dosya ile tanımlıydı!**

Bugüne kadar harici kütüphanelerle yukarıdaki işlemleri yaptığımız için
tabi ki bu kütüphanelerin JSON nesnesi tanımladıklarını unutmadık. Böyle
bir durumda aşağıdaki gibi ufak bir kontrol ile tarayıcının JSON
nesnesini tanımlayıp tanımlamadığını kontrol edip eğer tanımlı değilse
harici scriptler üzerinden ilerlemek gerek.

        <span style="color: blue;">if</span>(!<span
style="color: blue;">this</span>.JSON)

        {

            JSON = .....;

        }

Hepinize kolay gelsin.


