---
FallbackID: 2154
Title: "ScriptManager'da EnableHistory ile AJAX uygulamalarında tarayıcı geçmişi desteği."
date: "2008-8-15"
EntryID: ScriptManager_da_EnableHistory_ile_AJAX_uygulamalarinda_tarayici_gecmisi_destegi
IsActive: True
Section: software
MinutesSpent: 0
Tags: AJAX
old.EntryID: 306e7425-d52e-46f4-a6e1-dfaf893ef598
---
AJAX kullanılan sitelerde tarayıcıların "Geri" düğmesinin çalışmaması
sorunu ile ilgili farklı JavaScript kütüphanelerinde çözümler bulunsa da
ASP.NET ile sunucu tarafında kullanılabilecek tek bir çözüm vardı.
Aşağıdaki adresten söz konusu çözüm ile ilgili makaleyi
inceleyebilirsiniz.

<http://daron.yondem.com/tr/post/1e6b22ff-cf0b-4927-a396-4eb5446daaa4>

Bahsettiğimiz çözüm ASP.NET harici özel bir sunucu kontrolünün
kullanılmasına dayalı. Oysa artık bunlara ihtiyacımız yok. .NET
Framework 3.5'in SP1 güncellemesi ile beraber artık ASP.NET AJAX
altyapısı istemci tarafındaki tarayıcı geçmişinin de kontrol
edilebilmesine olanak tanıyor. Gelin sistemin kullanım şeklini beraber
inceleyelim.

**ScriptManager'da yeni bir özellik : EnableHistory**

Ufak bir örnek yaparak uygulama üzerinden ilerleyelim. Örneğimizde
sayfamızda UpdatePanel içerisinde bir Label ve bir de Button bulunsun.
Düğmeye her bastığımızda basit bir şekilde Label'ın içerisindeki sayıyı
bir arttırsın. Amacımız bu şekilde UpdatePanel'in içi değişirken
tarayıcının geçmişini de yenileyerek tarayıcıdaki "Geri" ve "İleri"
düğmelerinin çalışmasını sağlamak.

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span> <span
style="color: red;">xmlns</span><span
style="color: blue;">="http://www.w3.org/1999/xhtml"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\>\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">form</span> <span
style="color: red;">id</span><span style="color: blue;">="form1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**ScriptManager**</span> <span
style="color: red;"> **EnableHistory**</span><span
style="color: blue;">**="true"**</span> <span
style="color: red;">ID</span><span
style="color: blue;">="ScriptManager1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**ScriptManager**</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**UpdatePanel**</span> <span
style="color: red;">ID</span><span
style="color: blue;">="UpdatePanel1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">ContentTemplate</span><span
style="color: blue;">\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**Label**</span> <span
style="color: red;">ID</span><span style="color: blue;">="Label1"</span>
<span style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span
style="color: blue;">="0"\>\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">Label</span><span style="color: blue;">\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**Button**</span> <span
style="color: red;">ID</span><span
style="color: blue;">="Button1"</span> <span
style="color: red;">runat</span><span
style="color: blue;">="server"</span> <span
style="color: red;">Text</span><span
style="color: blue;">="Button"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">ContentTemplate</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">asp</span><span
style="color: blue;">:</span><span
style="color: #a31515;">**UpdatePanel**</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">form</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

Yukarıdaki örnek sayfa içerisinde gördüğünüz kodun normal bir ASP.NET
AJAX uygulamasından tek farkı **ScriptManager** kontrolünün
**EnableHistory** özelliğinin **True** olarak ayarlanmış olması. Bu
özellik ScriptManager kontrolüne .NET Framework 3.5 SP1 güncellemesi ile
beraber eklendi. Tabi sadece bu ayarı değiştirmiş olmak her şeyin
çalışması için yeterli değil.

AJAX ile sayfada yapılan değişikliklerin hangilerinin birer "yeni sayfa"
niteliği taşıdığına karar vermemiz gerekiyor. Böylece tarayıcı doğru
durumları kendi geçmişine ekleyecektir. Bunun için sayfamızın kod
kısmına geçerek bizim örneğimizde AJAX isteğine neden olan **Button**
kontrolünün arkasında saklı koda göz atalım.

**[VB]**

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Button1.Click

        Label1.Text = <span
style="color: blue;">CInt</span>(Label1.Text) + 1

        ScriptManager1.AddHistoryPoint(<span
style="color: #a31515;">"sayi"</span>, Label1.Text)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

    <span style="color: blue;">protected</span> <span
style="color: blue;">void</span> Button1\_Click(<span
style="color: blue;">object</span> sender, <span
style="color: #2b91af;">EventArgs</span> e)

    {

      Label1.Text = (<span
style="color: blue;">int</span>.Parse(Label1.Text) + 1).ToString();

      ScriptManager1.AddHistoryPoint(<span
style="color: #a31515;">"sayi"</span>, Label1.Text);

    }

Gördüğünüz üzere kodumuzun ilk satırında basit bir şekilde Label
içerisindeki değeri bir arttırıyoruz. Son olarak elde ettiğimiz değeri
ayrıca **ScriptManager** üzerinden **AddHistoryPoint** komutu ile
istemci tarafında bir tarayıcı geçmişi noktası olarak kaydediyoruz.
**AddHistoryPoint** komutu toplamda iki parametre alıyor (Key/Value
Pair), birincisi sizin tamamen kendi isteğinize göre
tanımlayabileceğiniz bir string değer, diğeri ise bu string değer ile
eşleşen değişkenin ta kendisi. Örneğin eğer web sayfamız farklı
ürünlerin gösterildiği bir sayfa olsaydı bu noktada string değer olarak
"ID" verip ikinci parametre olarak da gösterilen ürünün primary key
değerini aktarabilirdik. Tüm bu değerler bize ileride geri döndürülüyor
olacak.

Tarayıcı geçmişine yeni bir nokta ekledik ve tarayıcımızı sayfanın
değiştiğinden haberdar ettik. Hatta değişen sayfa ile ilgili ufak bir
bilgiyi de **AddHistoryPoint** sayesinde kaydetmiş olduk. Şimdi sıra
geldi web sitemizin kullanıcısı tarayıcının "Geri" veya "İleri"
tuşlarına tıkladığında bizim durumu nasıl algılayarak uygun hareketleri
yapacağımızı belirlemeye. Bunun için sunucu tarafında
**ScriptManager'ın** **Navigate** adındaki event-handler'ını
kullanacağız.

**[VB]**

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> ScriptManager1\_Navigate(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.Web.UI.HistoryEventArgs) <span
style="color: blue;">Handles</span> ScriptManager1.Navigate

        Label1.Text = e.State(<span
style="color: #a31515;">"sayi"</span>)

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

**[C\#]**

    <span style="color: blue;">void</span>
ScriptManager1\_Navigate(<span style="color: blue;">object</span>
sender, <span style="color: #2b91af;">HistoryEventArgs</span> e)

    {

        Label1.Text = e.State[<span
style="color: #a31515;">"sayi"</span>];

    }

**Navigate** event-handler'ına gelen **HistoryEventArgs** üzerinden
**State** dizisine daha önce **AddHistoryPoint** derken verdiğimiz
anahtar stringi ilettiğimizde eşleştirilmiş olan değeri alabiliyoruz.
Böylece kullanıcı bir önceki sayfaya gitmek istediğinde o sayfa
yaratılırken eklemiş olduğumuz **HistoryPoint** ile eşleştirilmiş değeri
yakalayabileceğiz. Bizim örneğimizde sayfayı eski haline getirmek için
söz konusu değeri Label'ın içine aktarmak yeterli oluyor. Eğer bu değer
bir ürüne ait primary key olsaydı tekrar veritabanını sorgulayarak
sayfayı uygun verilerle dolduracak bilgileri çekecektik.

**Sonuç**

Aslına bakılırsa gerçek anlamı ile bir "Geri" navigasyonu sağlamıyoruz.
Tarayıcının "Geri" düğmesine basıldığında bir önceki sayfayı tekrar AJAX
ile oluşturuyoruz. İstemci tarafında bu durum sanki geri gidilmiş gibi
algılanıyor, oysa veriler tekrar sunucudan geliyor. Maalesef bunun şu an
için farklı bir çözümü yok.

Diğer yandan tarayıcının sayfa değişmemesine rağmen sayfa değişmiş gibi
davranmasını sağlamak için de sayfa adresine aşağıdaki gibi anchor
bilgileri ekleniyor. Bu durum site içerisinde anchor kullanımını
engelleyecektir. Diğer yandan anchor içerisinde **AddHistoryPoint** ile
eklediğimiz tüm veriler encrypt edilerek saklandığı için bu verilerin
olabildiğince güvenlik seviyesinin düşük olmasında da fayda var.

http://localhost:54366/Default.aspx\#&&/wEXAQUEc2F5aQUBMrCb2/2XpreE0oVczcMgPShkFLH/

Son olarak yukarıdaki gibi linklerin yaratılması ile beraber artık AJAX
sayfalarında da sitenin farklı durumlarının farklı web adreslerine sahip
olduğunu unutmayalım. Böylece AJAX ile çalışan bir sitede gezildiğinde
kullanıcılar tam olarak içerisinde bulundukları görsel sayfanın adresini
kopyalayarak paylaşabileceklerdir.

Hepinize kolay gelsin.


