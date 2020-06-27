---
FallbackID: 1759
Title: "İstemci Taraflı MD5 ile Yüksek Güvenlik"
date: "2007-8-23"
EntryID: Istemci_Tarafli_MD5_ile_Yuksek_Guvenlik
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX, ASP.NET, JavaScript
old.EntryID: dec6ac02-4f06-4cb5-986d-02907794fd74
---
Herhangi bir web sitesi ile kullanıcı (istemci) arasındaki web trafiği
normal şartlarda şifrelenmemiş (enkript edilmemiş) olarak aktarılır. Bu
durum esasen ciddi bir güvenlik açığı olabilir. İstemci bilgisayar ile
sunucu arasındaki ağ trafiğini yakalayabilen biri bu trafik üzerinden
geçen veriyi ele geçirerek kötü amaçlarla kullanabilir. Bu açığı
engellemek amacıyla özellikle E-Ticaret sitelerinde SSL uygulaması
yapılır. https ile başlayan adreslerinden tanıyabileceğimiz bu web
sitelerinde istemci ile sunucu arasındaki trafik enkript edilir. Böylece
ağ trafiğinin yakalanması halinde bile herhangi bir şekilde söz konusu
veri kullanılamayacaktır.

Peki SSL kullanılamayacak, ufak bütçeli projelerde en azından önemli
verileri kullanıcıdan (istemci) alırken enkript etme şansımız yok mu?
Varsayalım web sitemizin bir kullanıcı giriş sayfası var ve kullanıcımız
birer TextBox kontrolüne kullanıcı adını ve şifresini yazıyor. Bir
sniffer yazılımı kullanarak ağ trafiğini yakaladığımızda aşağıdaki
şekilde şifreyi ele geçirebiliyoruz.

{"Sifre":"GizliSifrem"}

Oysa bu şifreyi istemci tarafında JavaScript kütüphaneleri ile anında
MD5 algoritması ile enkript ederek sunucu tarafına gönderme şansımız
var. Böyle bir durumda sniffer yazılımı kullandığımızda karşımıza çıkan
sonuç aşağıdaki gibi.

{"Sifre":" afb5bcf186d39b00d94917df57b9c593 "}

Şimdi gelin bu işi nasıl yapacağımıza yakından bir göz atalım. İlk
olarak **Paul Johnston** tarafından hazırlanmış olan **MD5** JavaScript
kütüphanesini aşağıdaki adresten bilgisayarımıza indirelim.

<http://pajhome.org.uk/crypt/md5/>

Örneğimizde bir ASP.NET AJAX projesi üzerinden çalışacağımız için
bilgisayarımıza indirdiğimiz JavaScript dosyamızı web sayfamızdaki
ScriptManager’a **ScriptReference** olarak tanımlayacağız. Böylece
JavaScript dosyası sayfamıza linklenmiş olacak.

<span><span>      </span> <span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">ScriptManager</span> <span
style="color: red;">EnablePageMethods</span><span
style="color: blue;">="true"</span> <span
style="color: red;">ID</span><span
style="color: blue;">="ScriptManager1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span></span>\
 <span> <span>        </span><span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">Scripts</span><span
style="color: blue;">\></span></span>\
 <span> <span>          </span><span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">ScriptReference</span> <span
style="color: red;">Path</span><span
style="color: blue;">="md5.js"</span> <span
style="color: blue;">/\></span></span>\
 <span> <span>        </span> <span style="color: blue;">\</</span><span
style="color: rgb(163, 21, 21);">Scripts</span><span
style="color: blue;">\></span></span>\
 <span> <span>      </span> <span style="color: blue;">\</</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">ScriptManager</span><span
style="color: blue;">\></span></span>

Kütüphane içerisindeki **hex\_md5();** metodunu kullanıyor olacağız. Söz
konusu metod **String** tipinde bir parametre alarak geriye şifrelenmiş
**Hex-String** döndürüyor. Örneğimizde şifre kontrol işlemi için bir
ASP.NET AJAX **PageMethod** kullanacağız. Sayfaya giriş için
kullanacağımız Giriş düğmesi ve Şifre, Kullanıcı adı TextBox'ları bir
UpdatePanel içerisinde yer alacak.

<span> <span>      </span> <span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">script</span> <span
style="color: red;">language</span><span
style="color: blue;">="javascript"</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span></span>\
 <span> <span>      </span> <span style="color: blue;">function</span>
KontrolEt()</span>\
 <span> <span>      </span>{</span>\
 <span> <span>        </span> <span style="color: green;">// Sayfada
Sifre TextBox'ına girilmiş şifreyi alıyoruz.</span></span>\
 <span> <span>        </span> <span style="color: blue;">var</span> Pass
= \$get(<span
style="color: rgb(163, 21, 21);">"Sifre"</span>).value;</span>\
 <span> <span>        </span> <span style="color: green;">// Şifreyi
şifreliyoruz.</span></span>\
 <span> <span>        </span> <span style="color: blue;">var</span> MD5
= hex\_md5(Pass);</span>\
 <span> <span>        </span> <span style="color: green;">//
GirisKontrol PageMethod'unu çalıştırarak kullanıcıyı kontrol
ediyoruz.</span></span>\
 <span> <span>        </span> PageMethods.GirisKontrolu(MD5,
Oldu);</span>\
 <span> <span>      </span>}</span>\
 <span> <span>      </span> <span style="color: blue;">function</span>
Oldu(Sonuc)</span>\
 <span> <span>      </span>{</span>\
 <span> <span>        </span> <span style="color: green;">// PageMethod
tarafından döndürülen Evet/Hayır sonucunu mesaj kutusu ile
gösteriyoruz.</span></span>\
 <span> <span>        </span> alert(Sonuc);</span>\
 <span> <span>      </span>}</span>\
 <span> <span>      </span> <span style="color: blue;">\</</span><span
style="color: rgb(163, 21, 21);">script</span><span
style="color: blue;">\></span></span>\
 <span> <span>      </span> <span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">UpdatePanel</span> <span
style="color: red;">ID</span><span
style="color: blue;">="UpdatePanel1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span></span>\
 <span> <span>        </span> <span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">ContentTemplate</span><span
style="color: blue;">\></span></span>\
          <span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">TextBox</span> <span
style="color: red;">ID</span><span style="color: blue;">="Adi"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\>\</</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">TextBox</span><span
style="color: blue;">\></span>\
 <span> <span>         </span><span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">TextBox</span> <span
style="color: red;">ID</span><span style="color: blue;">="Sifre"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\>\</</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">TextBox</span><span
style="color: blue;">\></span></span>\
 <span> <span>         </span><span style="color: blue;">\<</span><span
style="color: rgb(163, 21, 21);">input</span> <span
style="color: red;">id</span><span style="color: blue;">="Giris"</span>
<span style="color: red;">type</span><span
style="color: blue;">="button"</span> <span
style="color: red;">value</span><span
style="color: blue;">="Giris"</span> <span
style="color: red;">onclick</span><span
style="color: blue;">="KontrolEt();"</span> <span
style="color: blue;">/\></span></span>\
 <span> <span>        </span> <span style="color: blue;">\</</span><span
style="color: rgb(163, 21, 21);">ContentTemplate</span><span
style="color: blue;">\></span></span>\
       <span style="color: blue;">\</</span><span
style="color: rgb(163, 21, 21);">asp</span><span
style="color: blue;">:</span><span
style="color: rgb(163, 21, 21);">UpdatePanel</span><span
style="color: blue;">\></span><span></span>

Sunucu tarafına baktığımızda ise elimizdeki gerçek şifreyi istemciden
gelen enkript edilmiş şifre ile karşılaştırmak üzere enkript ediyor
olacağız. Biz örneğimizde gerçek şifreyi veritabanından vs çekmeyeceğiz.
Onun yerine ben **GerçekŞifrem** metnini şifre olarak kullanacağım. Siz
projelerinizde bu metni kullandığınız veritabanlarına bağlayabilirsiniz.
Aşağıda sunucu taraflı yazmış olduğumuz AJAX PageMethod kodu yer alıyor.

<span> \<System.Web.Services.WebMethod()\> \_</span>\
 <span> <span>  </span><span style="color: blue;">Shared</span> <span
style="color: blue;">Function</span>GirisKontrolu(<span
style="color: blue;">ByVal</span> Sifre <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)
<span style="color: blue;">As</span> <span
style="color: blue;">Boolean</span></span>\
 <span> <span>    </span> <span style="color: green;">'Şifremizi
IOStream objesine çevirecek olan encoder objesini
tanımlayalım.</span></span>\
 <span> <span>    </span> <span style="color: blue;">Dim</span> encoder
<span style="color: blue;">As</span> <span
style="color: blue;">New</span> UTF8Encoding()</span>\
 <span> <span>    </span> <span style="color: green;">'MD5 Servisine
ulaşalım.</span></span>\
 <span> <span>    </span> <span style="color: blue;">Dim</span> MD5
<span style="color: blue;">As</span> <span
style="color: blue;">New</span>
System.Security.Cryptography.MD5CryptoServiceProvider</span>\
 <span> <span>    </span> <span style="color: green;">'Doğru şifreyi
enkript edelim.</span></span>\
 <span> <span>    </span> <span style="color: blue;">Dim</span>
GercekSifre<span style="color: blue;"> As</span> <span
style="color: blue;">Byte</span>() =
MD5.ComputeHash(encoder.GetBytes(<span
style="color: rgb(163, 21, 21);">"GerçekŞifrem"</span>))</span>\
 <span> <span>    </span> <span style="color: green;">'Gerçek Şifremizi
HEX'e çevirelim.</span></span>\
 <span> <span>    </span> <span style="color: blue;">Dim</span> Dogru
<span style="color: blue;">As</span> <span
style="color: blue;">New</span> StringBuilder()</span>\
 <span> <span>    </span> <span style="color: blue;">For</span> i <span
style="color: blue;">As</span> <span style="color: blue;">Integer</span>
= 0 <span style="color: blue;">To</span> GercekSifre.Length - 1</span>\
 <span> <span>      </span> Dogru.Append(GercekSifre(i).ToString(<span
style="color: rgb(163, 21, 21);">"x2"</span>))</span>\
 <span> <span>    </span> <span style="color: blue;">Next</span>
i</span>\
 <span> <span>    </span> <span style="color: green;">'Enkript edilmiş
doğru şifre ile istemciden gelen enkript edilmiş şifreyi
karlılaştıralım..</span></span>\
 <span> <span>    </span> <span style="color: blue;">If</span>
Dogru.ToString = Sifre <span style="color: blue;">Then</span></span>\
 <span> <span>      </span> <span style="color: blue;">Return</span>
<span style="color: blue;">True</span></span>\
 <span> <span>    </span> <span style="color: blue;">Else</span> : <span
style="color: blue;">Return</span> <span
style="color: blue;">False</span></span>\
 <span> <span>    </span> <span style="color: blue;">End</span> <span
style="color: blue;">If</span></span>\
 <span><span>  </span><span style="color: blue;">End</span> <span
style="color: blue;">Function</span></span>

Hepsi bu kadar. Artık istemci tarafında girilen tüm şifreler enkript
edildikten sonra sunucuya kontrol için gönderiliyor olacak. Böylece
istemci ile sunucu arasındaki hiçbir yazılım veya donanım söz konusu
şifreyi ağ trafiği üzerinden yakalasa bile tam olarak ne olduğunu
anlayamayacaktır.

Hepinize kolay gelsin.


