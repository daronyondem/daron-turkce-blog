---
FallbackID: 2541
Title: WebMatrix ile Razor Syntax'ına Giriş
PublishDate: 3/1/2011
EntryID: WebMatrix_ile_Razor_Syntaxina_Giris
IsActive: True
Section: software
MinutesSpent: 0
Tags: WebMatrix
old.EntryID: ee938be5-fe8b-46e7-af6d-23db812911ac
---
Dün WebMatrix dünyasına hızlı bir giriş yapmış ve yeni bir proje
yarattıktan sonra ne tip dosyalar ekleyebileceğimize bakarak elde
ettiğimiz ipuçlarından da ASP, PHP ve ASP.NET'i rahatlıkla
kullanabildiğimizi görmüştük. Hatırlarsanız bunların yanı sıra bir de
VBHTML ve CSHTML gibi dosya tipleri ile karşılaştık. İşte bu dosyalar
Razor denilen bir syntax kullanılarak oluşturuyor ve baz olarak tabi ki
C\# veya VB kullanılabiliyor. Nasıl birşey bahsettiğimize göz atmak için
WebMatrix içerisinde boş bir site yaratarak siteye de bir CSHTML dosyası
ekleyelim.

![Sitemize ilk dosyamızı
eklerken.](http://cdn.daron.yondem.com/assets/2541/02012011_1.png)\
*Sitemize ilk dosyamızı eklerken.*

Dosya ilk bakışta normal bir HTML dosyası gibi gözükse de inline olarak
C\# veya duruma göre VB yazabiliyoruz. İşte aşağıdaki basit bir örneği
bulabilirsiniz.

**[C\#]**

![İlk WebMatrix
örneğimiz!](http://cdn.daron.yondem.com/assets/2541/02012011_2.png)

Sanırım önce biraz zaman vermem gerek kodu incelemeniz için :) "Ne
oluyor burada yahu?" dediğinizi duyar gibiyim. Şimdi ilk kuralımız şu;
herhangi bir kod yazacağınız zaman @ işareti ile başlıyoruz! Tek satırlı
çıktısı olan bir kod yazacaksanız doğrudan @ işareti ile başlayarak tek
satırda kodu bitirebilirsiniz. Compiler @ işaretini gördüğü anda bunun
bir C\# kodu olduğunu anlıyor. Şimdi hemen "Ya ben gerçekten @ işaretini
HTML'e koyacaksam?" sorusunu sorduğunuzu da biliyorum :) birazdan o da
geliyor... Geri dönersek konumuza :) @ işaretleri kodların başlandığı
yerleri belirtiyordu. Eğer çok satırlı kod yazacaksanız bu sefer
parantezler arasına alarak başına @ koyarsanız bir kod bloğuna sahip
olmuş oluyorsunuz. Bazı durumlarda compiler FOR döngüsünde olduğu gibi
kod bloğunun o satırda sonlanmadığını anlayabilirse ek olarak
parantezler kod bloğu yaratmaya gerek kalmayabiliyor.

**[VB]**

![WebMatrix'de ilk VB
kodumuz!](http://cdn.daron.yondem.com/assets/2541/02012011_3.png)

Visual Basic tarafında syntax epeyce değişiyor. İlk olarak kod yazmak
istediğiniz herhangi bir yerde sadece @ işareti yeterli olmayabiliyor ve
tek satırda bile kodun başına ve sonunda Code / End Code ikilisini
yerleştirmeniz gerekiyor. Satır içerisinde sadece değer aktaran yerlerde
doğrudan @ işareti ile değişken vs çağırabilseniz de yukarıdaki For
döngüsünün içindeki HTML'de de görebileceğiniz üzere kod içerisinde
markup yazabilmek için tekrar @ işareti kullanmanız gerekiyor.

Gelelim kritik sorulardan birine. Ya @ işaretini doğrudan HTML'de output
etmek isterseniz? İşte o zaman @ işaretinden önce boşluk
bırakmamalısınız :) yani bir mail adresi vs yazarken zaten @ işaretinden
önce kodda boşluk olmayacağı için compiler bunu bir kod olarak değil de
HTML içerik olarak değerlendirecektir. Eğer HTML'de boşluk bırakmak
isterseniz &nbsp; dostunuz olabilir. Bir diğer problem ise yine
yukarıdaki for döngülerinin iç yapısı ile ilgili. Örneklerimizdeki for
döngüleri içlerinden birer HTML kod fışkırtıyorlar :) Bunun bir HTML
olarak output edilmesi gerektiğini açtığımız HTML taginden anlıyor
compiler. Peki ya HTML tag'i açmak istemiyorsam? Sadece elimdekini
output etmek istiyorsam? İşte o zaman da \<text\> tagini
kullanabilirsiniz. \<text\> tagleri arasına alacağınız bir içerik
doğrudan sayfaya HTML olarak çıkartılacaktır.

**[VB]**

![HTML tagi olmadan HTML output
etmek.](http://cdn.daron.yondem.com/assets/2541/02012011_4.png)

Kod içerisinde kısımları comment olarak işaretlemek içinse iki yöntem
var. Birincisi klasik C\# veya VB'deki comment mekanizmaları ikincisi
ise Razor'a özel syntax.

**[C\#]**

![Comment
syntaxı.](http://cdn.daron.yondem.com/assets/2541/02012011_5.png)

Dikkat ederseniz üst kısımda açılan bir kod bloğundaki kodu C\# syntax'ı
ile comment ederken alt kısımdaki bir Razor kod bloğunu ise Razor
syntax'ı ile commentlemiş olduk. Sanırım basit bir şekilde Razor
syntax'ın giriş yapmayı başardık. Tabi ki daha eminim merak ettiğiniz
birçok şey var. Önümüzdeki günlerde bu konuda ek yazılarla
ilerleyeceğiz.

Görüşmek üzere!


