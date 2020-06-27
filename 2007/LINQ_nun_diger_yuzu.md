---
FallbackID: 1897
Title: "LINQ'nun diğer yüzü":)
date: "2007-12-26"
EntryID: LINQ_nun_diger_yuzu
IsActive: True
Section: software
MinutesSpent: 0
Tags: LINQ
old.EntryID: 86729470-1741-4039-8fe4-b66371f1b2cf
---
# LINQ'nun diğer yüzü
Bir süredir okuduğum yazılarda ve konuştuğum kişilerde **LINQ**
denildiğinde akla sadece veritabanına kolay yoldan sorgu yollama gibi
bir kavramın geldiğini gördüm. O nedenle bu yazımda birkaç örnek ile
aslında LINQ'nun çok daha farklı durumlarda kullanılabileceğini ve
işimizi veritabanından bağımsız olarak da kolaylaştırabileceğini
göstermek istiyorum.

Birinci örneğimizde içerisinde birden çok TextBox ve birçok farklı
control bulunan bir web sayfamız bulunsun. Varsayalım ki biz bu
sayfadaki tüm TextBox'ların bir anda **Enabled** özelliklerinin
**False** olmasını istiyoruz. Bu durumda yazacağımız kod aşağıdaki gibi
olacaktır.

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> kontrol <span
style="color: blue;">In</span> <span
style="color: blue;">Me</span>.Form.Controls

            <span style="color: blue;">If</span> <span
style="color: blue;">TypeOf</span> kontrol <span
style="color: blue;">Is</span> TextBox <span
style="color: blue;">Then</span>

                <span style="color: blue;">CType</span>(kontrol,
TextBox).Enabled = <span style="color: blue;">False</span>

            <span style="color: blue;">End</span> <span
style="color: blue;">If</span>

        <span style="color: blue;">Next</span>

Oysa LINQ kullanarak bu işi çok daha hoş bir hale getirebiliriz.
Yukarıdaki döngüde sayfadaki tüm kontrolleri dönmemiz gerekirken LINQ
ile sayfadaki kontrolleri filtreleterek döngümüzün kaynağına sadece
TextBox listesinin gelmesini sağlayabiliriz.

<span style="color: blue;">For</span> <span
style="color: blue;">Each</span> kontrol <span
style="color: blue;">As</span> TextBox <span
style="color: blue;">In</span> <span style="color: blue;">From</span>
Gelenler <span style="color: blue;">In</span> <span
style="color: blue;">Me</span>.Form.Controls <span
style="color: blue;">Where</span> <span
style="color: blue;">TypeOf</span> Gelenler <span
style="color: blue;">Is</span> TextBox <span
style="color: blue;">Select</span> Gelenler

     kontrol.Enabled = <span style="color: blue;">False</span>

<span style="color: blue;">Next</span>

Gördüğünüz gibi hayat aslında çok daha kolay ve LINQ yeri geldiğinde çok
farklı kaynakları sorgulamaya bile yarıyabiliyor. Gelin bir örnek daha
yapalım.

Çoğu zaman hazırladığımız web sitelerine kullanıcıların dosya yükleme
veya resim yükleme gibi işlemler yapabilecekler kısımlar ekleriz. Tabi
ki bu dosyalar yüklendikten sonra bir yerlerde de gösterilmek üzere
seçilmelidir. Hikayeyi daha fazla uzatmadan esas konuya geleyim.
Varsayalım ki bir klasör içerisinde tüm dosyaları bir DropDownList
kontrolüne bağlayacağız. Dosyaların isimlerinin kullanıcıya
gösterilmesini tam yol bilgisinin ise DropDownList'e ait Value
özelliklerinde saklanmasını istiyoruz. Yazacağımız kod aşağıdaki gibi
olacaktır.

<span style="color: blue;">Partial</span> <span
style="color: blue;">Class</span> \_Default

    <span style="color: blue;">Inherits</span> System.Web.UI.Page

 

    <span style="color: blue;">Class</span> DropSatir

        <span style="color: blue;">Private</span> P\_Dosya <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Private</span> P\_Path <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

        <span style="color: blue;">Property</span> Dosya() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> P\_Dosya

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                P\_Dosya = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

        <span style="color: blue;">Property</span> Path() <span
style="color: blue;">As</span> <span style="color: blue;">String</span>

            <span style="color: blue;">Get</span>

                <span style="color: blue;">Return</span> P\_Path

            <span style="color: blue;">End</span> <span
style="color: blue;">Get</span>

            <span style="color: blue;">Set</span>(<span
style="color: blue;">ByVal</span> value <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

                P\_Path = value

            <span style="color: blue;">End</span> <span
style="color: blue;">Set</span>

        <span style="color: blue;">End</span> <span
style="color: blue;">Property</span>

        <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>()

 

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

        <span style="color: blue;">Sub</span> <span
style="color: blue;">New</span>(<span style="color: blue;">ByVal</span>
Dosya <span style="color: blue;">As</span> <span
style="color: blue;">String</span>, <span
style="color: blue;">ByVal</span> Path <span
style="color: blue;">As</span> <span style="color: blue;">String</span>)

            P\_Dosya = Dosya

            P\_Path = Path

        <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

 

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Button1.Click

        <span style="color: blue;">Dim</span> DosyaListesi <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Collections.Generic.List(<span style="color: blue;">Of</span>
DropSatir)

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> dosya <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
<span style="color: blue;">In</span>
System.IO.Directory.GetFiles(Server.MapPath(<span
style="color: #a31515;">"."</span>))

            DosyaListesi.Add(<span style="color: blue;">New</span>
DropSatir(System.IO.Path.GetFileName(dosya), dosya))

        <span style="color: blue;">Next</span>

 

        DropDownList1.DataSource = DosyaListesi

        DropDownList1.DataTextField = <span
style="color: #a31515;">"Dosya"</span>

        DropDownList1.DataValueField = <span
style="color: #a31515;">"Path"</span>

        DropDownList1.DataBind()

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

<span style="color: blue;">End</span> <span
style="color: blue;">Class</span>

Bir DropDownList doldurmak için bu kadar kod çok değil mi? diyorsanız
aslında yapacak pek de bir şey yok :) Tek tek direk döngü içerisinde
ListItem'lar yaratarak DropDownList'e ekleyebilirdik. O zaman da kodumuz
aşağıdaki şekilde olurdu.

    <span style="color: blue;">Protected</span> <span
style="color: blue;">Sub</span> Button1\_Click(<span
style="color: blue;">ByVal</span> sender <span
style="color: blue;">As</span> <span style="color: blue;">Object</span>,
<span style="color: blue;">ByVal</span> e <span
style="color: blue;">As</span> System.EventArgs) <span
style="color: blue;">Handles</span> Button1.Click

        <span style="color: blue;">For</span> <span
style="color: blue;">Each</span> dosya <span
style="color: blue;">As</span> <span style="color: blue;">String</span>
<span style="color: blue;">In</span>
System.IO.Directory.GetFiles(Server.MapPath(<span
style="color: #a31515;">"."</span>))

            DropDownList1.Items.Add(<span
style="color: blue;">New</span>
ListItem(System.IO.Path.GetFileName(dosya), dosya))

        <span style="color: blue;">Next</span>

    <span style="color: blue;">End</span> <span
style="color: blue;">Sub</span>

Çok daha kısa değil mi? :) Ama bu durumda DropDownList'in DataBound
event'ı çalışmayacaktır. Biz dönelim bir de bu işlemi LINQ kullanarak
nasıl yapabiliriz ona bakalım.

DropDownList1.DataSource = <span style="color: blue;">From</span>
Dosyalar <span style="color: blue;">In</span>
System.IO.Directory.GetFiles(Server.MapPath(<span
style="color: #a31515;">"."</span>)) <span
style="color: blue;">Select</span> Dosya =
System.IO.Path.GetFileName(Dosyalar), Dosyalar

DropDownList1.DataTextField = <span
style="color: #a31515;">"Dosya"</span>

DropDownList1.DataValueField = <span
style="color: #a31515;">"Dosyalar"</span>

DropDownList1.DataBind()

Gördüğünüz gibi olay çok daha basit bir hal alıyor. LINQ içerisinde
**System.IO.Directory.GetFiles**'dan gelen veriye bir sorgu
gönderiyoruz. Sorgumuzu alırken **Dosya** adında bir kolon tanımlayarak
onu da **System.IO.Path.GetFileName** metodundan gelen veriye
eşitliyoruz. Böylece istediğimiz veriler ayrı ayrı kolonlar olarak bize
döndürülüyor ve doğrudan **DropDownList** kontrolümüze bağlayabiliyoruz.

Artık sanırım LINQ ile ilgili çok daha farklı düşünceleriniz vardır :)

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2007-12-26 tarihinde yayinlanmistir.*
