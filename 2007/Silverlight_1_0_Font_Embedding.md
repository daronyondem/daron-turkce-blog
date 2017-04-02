---
FallbackID: 1857
Title: Silverlight 1.0 Font Embedding
PublishDate: 11/21/2007
EntryID: Silverlight_1_0_Font_Embedding
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: 7f0cd1bc-bbda-4471-ab48-6d3218fd2fad
---
Biraz önce mail ile süper bir soru aldım :) Soru şöyle: **"Silverlight
içerisinde font dahil edip istemci tarafında kullanma şansımız var mı?"
EVEEEET** :) Var. Silverlight uygulamanızdaki herhangi bir
**TextBlock'un** **setFontSource** metodunu kullanarak sadece
Silverlight animasyonunun çalıştığı istemci makinedeki fontları değil
harici font kaynaklarını kullanmasını da sağlayabilirsiniz. Peki bunu
nasıl yapacağız?

İlk olarak kullanacağımız fontu tabi ki sunucumuza yerleştirmemiz
gerekiyor. Sonrasında Silverlight uygulamamız istemcide yüklendiği anda
fontu da yüklemeye başlamamız lazım. Bunun için bir Silverlight
**downloader** nesnesi yaratarak kullanacağız. Aşağıdaki gibi bir kod
işimizi görecektir.

<span style="color: blue;">if</span> (!window.Font\_SV)

  window.Font\_SV = {};

 

Font\_SV.Page = <span style="color: blue;">function</span>()

{

}

 

Font\_SV.Page.prototype =

{

  handleLoad: <span style="color: blue;">function</span>(control,
userContext, rootElement)

  {

    <span style="color: blue;">var</span> **yukleyici** =
document.getElementById(<span
style="color: #a31515;">'SilverlightControl'</span>).c**reateObject(**<span
style="color: #a31515;">"**downloader"**</span>);

    yukleyici.addEventListener(<span
style="color: #a31515;">"Completed"</span>, **Tamamlandi**);

    yukleyici.open(<span style="color: #a31515;">"GET"</span>, <span
style="color: #a31515;">"**Dungeon.TTF**"</span>);

    yukleyici.send();

  }

}

Gelin satır satır yukarıdaki kodu inceleyelim. İlk satırda adını
**yukleyici** olarak verdiğim bir JavaScript değişkenine download
nesnesi yaratıyorum. Bunun için sayfamdaki Silverlight uygulamamın ID
bilgisini **document.getElementById** metoduna vererek Silverlight
uygulamamı yakaladıktan sonra uygulamama ait **createObject** metodunu
kullanıyorum. Söz konusu metodu obje tipi olarak **downloader** değerini
vermem yeterli oluyor. Artık elimizde bir **downloader** nesnesi
bulunduğuna göre gelelim bu nesnenin ayarlarına.

İkinci satırda hemen **downloader** nesnesine sunucudan veriyi istemciye
asenkron olarak yükleme işini bitirdiğinde çalıştırılmak üzere
**Tamamlandi** adinda bir JavaScript fonksiyonu aktarıyorum. Bu
fonksiyonu biraz yazacağız.

Üçüncü satırda **downloader** nesnesini aynı bir XMLHttpRequest nesnesi
gibi sunucudan veri isteme metodunu ve isteyeceği dosyayı ayarlıyorum.
GET metodu şimdilik uygun. Dosya adı olarak da benim örneğimde
**Dungeon.TTF** font dosyamın adı. Bu noktada özellikle belirtmem
gereken bir nokta var. Yine aynı XMLHttpRequest nesnelerinde de olduğu
gibi **downloader** nesnesi de ancak URL üzerinden dosya çekebiliyor.
Yani bu kodları makinenizde çalıştırırken de IIS veya ASP.NET
Development Server üzerinden çalıştırmanız gerekecek.

Son olarak dördüncü satırda artık tüm ayarlarım tamamlandığı için veri
alım işlemini başlatmak üzere talebimi **yukleyici'nin** **send** metodu
ile sunucuya gönderiyorum.

Peki veri geldiğinde neler yapacağız? Gelin şimdi de aşağıdaki kodu
inceleyelim.

<span style="color: blue;">function</span> Tamamlandi(sender, eventArgs)

{

    sender.findName(<span
style="color: #a31515;">"Metin"</span>).setFontSource(sender);

    sender.findName(<span
style="color: #a31515;">"Metin"</span>).fontFamily = <span
style="color: #a31515;">"TrSah Dungeon"</span>;

    sender.findName(<span style="color: #a31515;">"Metin"</span>).text =
<span style="color: #a31515;">"Bu artık çok özel bir fontla yazılmış bir
metin!!!"</span>;

}

**Tamamlandi** adındaki fonksiyonum çalıştırıldığında hemen Silverlight
uygulamamdaki **Metin** ID'li TextBlock nesnemi yakalıyorum. Sonrasında
TextBlock nesnesine ait **setFontSource** metoduna parametre olarak
diren **sender** parametresini veriyorum. Yine aynı karşılaştırmayı
yaparak sizlere XMLHttpRequest nesnelerini hatırlatmak isteyorum.
**XMLHttpRequest** nesneleri ile AJAX uygulamalarında da sunucudan
asenkron isteklerde bulunduğumuzda isteğimiz tamamlandığında
çalıştırılan fonksiyonumuza gelen ilk parametre aslında sunucudan gelen
verinin ta kendisi oluyordu. Burada da durum aynı. Bizim **Tamamlandi**
fonksiyonumuzun **sender** parametresi **downloader** tarafından
gönderilen ve sunucudan gelen font dosyamızın verisi.

Gelen veriyi TextBlock nesnemizin font kaynaklarına ekledikten sonra
sıra geldi söz konusu fontu **TextBlock** için gösterim aşamasında
seçmeye. Bunun için **TextBlock'a** ait **fontFamily** özelliğini
yüklediğimiz fontun adı ile değiştiriyoruz. Son olarak da **TextBlock**
içerisinde metni içerisinde Türkçe karakterler de olan bir metin ile
değiştiriyorum. En ufak bir sorun yok :)

Biraz daha kullanıcı dostu bir yükleme süreci için isterseniz siz
uygulamalarınızda yükleme işlemini başlatmadan önce ekranda "Yükleniyor"
gibi bir uyarı mesajı da gösterebilirsiniz.

Örnek uygulamayı aşağıdaki adreste inceleyebilirsiniz. Kaynak kodlarını
özellikle bir paket olarak koymuyorum. İsteyenler sayfanın kaynak
kodlarına girerek zaten alabilirler :) Sizler için de biraz Silverlight
egzersizi olmuş olur.

<http://daron.yondem.com/samples/font_embed/>

Kolay gelsin.


