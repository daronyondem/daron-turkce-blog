---
FallbackID: 2128
Title: Silverlight 2.0 içerisinden Download penceresi açtırmak.
PublishDate: 20/7/2008
EntryID: Silverlight_2_0_icerisinden_Download_penceresi_actirmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 58677c9b-1b1e-424d-a8c8-862ac5e296ac
---
Silverlight 2.0 Beta 2 içerisinde istemci makinedeki herhangi bir
dosyaya ulaşmakla ilgili örneklerimizde **Open File Dialog** nesnesini
detayları ile incelemiştik. Tam zıttı bir senaryoda da kullanıcıya
sistemine kaydedebileceği bir dosya vermek isteyebiliriz. Bu gibi bir
çözüm için maalesef Save File Dialog gibi bir kontrole sahip değiliz. O
nedenle biraz farklı bir taktik uygulayarak kullanıcıya vermek
istediğimiz dosyayı ilk olarak sunucuya göndererek kaydedeceğiz
sonrasında da sunucudan dosyayı tekrar istemcinin alarak
kaydedebilmesini sağlayacağız. Bu senaryo ilk bakışta çok saçma gibi
gözükse de aslında dosya yaratma işlemini sunucu tarafında yaparsanız
herhangi bir performans sorunu olmayacaktır. Gönül isterdi ki dosyayı
tamamen istemcide Silverlight ile yaratarak kullanıcıya verebilelim.
Fakat maalesef şimdilik en azından Beta 2 içerisinde böyle bir şansımız
yok.

Peki herşeyi yaptık, dosyamızı **Silverlight 2.0 Beta 2** ile yarattık,
sunucuya bir web servisi aracılığı ile gönderdik ve kaydettik. Bundan
sonrasında bu dosyayı Silverlight içerisinden istemcideki kullanıcıya
nasıl vereceğiz. Kullanacağımız taktik aslında epeyce basit. Tüm
tarayıcılarda kullanıcıyı dosya downloadu için dosyanın bulunduğu adrese
yönlendirirseniz hemen "Download" penceresi açılacaktır. Kullanıcının
içerisinde bulunduğu web sayfası hala görüntülenmeye devam edecektir.
Yani aslında siz kullanıcıyı başka bir adrese yönlendiriyor olsanız da
söz konusu adreste bir sayfa olmadığı için görüntüde bir değişiklik
olmayacak ve hedef adresteki dosyanın download işlemi başlayacaktır. Biz
de Silverlight tarafından bu taktikten faydalanacağız ve sayfanın
adresini kullanıcının indirmesini istediği adres ile değiştirerek
tarayıcının "Save File Dialog" açmasını sağlayacağız.

**[VB]**

        <span style="color: blue;">Dim</span> Adres <span
style="color: blue;">As</span> Uri

       
Uri.TryCreate(System.Windows.Browser.HtmlPage.Document.DocumentUri,
<span style="color: blue;">New</span> Uri(<span
style="color: #a31515;">"indir.zip"</span>, UriKind.Relative), Adres)

**[C\#]**

            <span style="color: #2b91af;">Uri</span> Adres;

            <span
style="color: #2b91af;">Uri</span>.TryCreate(System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.DocumentUri, <span
style="color: blue;">new</span> <span
style="color: #2b91af;">Uri</span>(<span
style="color: #a31515;">"teklialtyazi.zip"</span>, <span
style="color: #2b91af;">UriKind</span>.Relative), <span
style="color: blue;">out</span> Adres);

İlk olarak kullanıcıyı yönlendirmek istediğimiz adresi oluşturmamız
gerek. Bunun için **Uri** sınıfındaki **TryCreate** metodunu
kullanacağız. Bu metod bizden bir base **Uri** ve **Relative** Uri
alarak ikisini birleştirebiliyor. **Base** **Url** için içerisinde
bulunduğumuz sayfanın adresini
**System.Windows.Browser.HtmlPage.Document.DocumentUri** ile veriyoruz,
relative **Uri** için yeni bir **Uri** değişkeni yaratıp download
edilecek olan dosyanın adını veriyoruz. Son olarak da almak sonucun
aktarılacağı yeni **Uri** değişkenimizi referans olarak aktarıyoruz.

**[VB]**

        <span
style="color: blue;">CType</span>(System.Windows.Browser.HtmlPage.Document.GetProperty(<span
style="color: #a31515;">"location"</span>),
System.Windows.Browser.ScriptObject).SetProperty(<span
style="color: #a31515;">"href"</span>, Adres.ToString)

**[C\#]**

            ((System.Windows.Browser.<span
style="color: #2b91af;">ScriptObject</span>)System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.GetProperty(<span
style="color: #a31515;">"location"</span>)).SetProperty(<span
style="color: #a31515;">"href"</span>, Adres.ToString());

Simdi yapmamız gereken ise sayfanın adresini bir önceki adımda elde
ettiğimiz adres ile değiştirmek. İlk olarak
**System.Windows.Browser.HtmlPage.Document.GetProperty** ile sayfadaki
dokümanın location özelliğini alıyoruz. Sonrasında da dokümanı bir
**ScriptObject'e** cast ederek **SetProperty** ile **href** özelliğini
değiştiriyoruz. Aslında bunu biraz JavaScript'teki
**document.location.href** özelliğine benzetebilirsiniz. Artık kodumuzu
çalıştırdığımızda Silverlight içerisinde herhangi bir düğmeye
basıldığında otomatik olarak tarayıcının "Save File Dialog" penceresi
açılacak ve kullanıcı istediği dosyayı Silverlight tarafından
indirebilecek.

Hepinize kolay gelsin.


