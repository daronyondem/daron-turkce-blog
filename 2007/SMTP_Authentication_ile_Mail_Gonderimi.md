---
FallbackID: 1800
Title: SMTP Authentication ile Mail Gönderimi
PublishDate: 4/10/2007
EntryID: SMTP_Authentication_ile_Mail_Gonderimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 3.0, ASP.NET, Visual Basic 2005, Visual Basic .NET
old.EntryID: ce85955a-9a3c-4fc7-9288-5840d315fae8
---
Geçenlerde bir programcı dostumun kodlarına bakarken mail gönderim
işlemleri için hala eski **System.Web.Mai**l sınıflarını kullandığını
gördüm. Bunun aslında bir zararı yok fakat yeni hali ile aslında
kullanılması gereken **System.Net.Mail** sınıfıdır. Tabi bu noktada ufak
bir sorun oluşuyor, sorun bakmadan önce gelin **System.Web.Mail s**ınıfı
ile kullanıcı adı ve şifre kullanarak SMTP Authentication desteği ile
mail gönderen kodumuza bakalım.

<div style="color: black;">

        <span style="color: blue;">Dim</span> message <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Web.Mail.MailMessage

        message.BodyFormat = Mail.MailFormat.Html

        message.Body = html

        message.To = <span
style="color: #a31515;">"hedef@mail.com"</span>

        message.From = <span
style="color: #a31515;">"gonderen@mail.com"</span>

        <span style="color: blue;">Dim</span> server <span
style="color: blue;">As</span> System.Web.Mail.SmtpMail

        server.SmtpServer = <span
style="color: #a31515;">"mail.sunucum.com"</span>

        message.Fields.Add(<span
style="color: #a31515;">"http://schemas.microsoft.com/cdo/configuration/smtpauthenticate"</span>,
<span style="color: #a31515;">"1"</span>)

        message.Fields.Add(<span
style="color: #a31515;">"http://schemas.microsoft.com/cdo/configuration/sendusername"</span>,
<span style="color: #a31515;">"adresim@mail.com"</span>)

        message.Fields.Add(<span
style="color: #a31515;">"http://schemas.microsoft.com/cdo/configuration/sendpassword"</span>,
<span style="color: #a31515;">"sifrem"</span>)

        server.Send(message)

</div>

\

Yarattığımız **message** nesnesine **Fields.Add** metodu ile SMTP
Authentication kullanacağımızı, kullanıcı adını ve şifresini
aktarıyoruz. **System.Web.Mail** üzerinden yarattığımız SMTP sunucusunun
adresini de vermeyi tabi ki unutmadık. Yukarıdaki kod herhangi bir sorun
olmadan çalışacaktır, fakat Microsoft tarafından tavsiye edilen daha
yeni bir sınıf yapımız var; **System.Net.Mail.**

<div style="color: black;">

        <span style="color: blue;">Dim</span> message <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Mail.MailMessage

        message.IsBodyHtml = <span style="color: blue;">True</span>

        message.Body = html

        message.To.Add(<span style="color: blue;">New</span>
System.Net.Mail.MailAddress(<span
style="color: #a31515;">"hedef@mail.com"</span>))

        message.From = <span style="color: blue;">New</span>
System.Net.Mail.MailAddress(<span
style="color: #a31515;">"gonderen@mail.com"</span>)

        <span style="color: blue;">Dim</span> server <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Mail.SmtpClient

        server.Send(message)

</div>

\

Kodumuzda aslında aynı işlemleri biraz daha farklı bir şekilde yaptık.
"*Peki nerde SMTP Authentication ayarları?*" dediğinizi duyar gibiyim.
Gelin o ayarları da kodumuzun içerisinde koymaktansa daha kolay
değiştirebileceğimiz bir yere, yani **Web.Config** içerisine
yerleştirelim.

<div style="color: black;">

<span style="color: blue;">  \<</span><span
style="color: #a31515;">system.net</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">mailSettings</span><span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">smtp</span><span style="color: blue;">
</span><span style="color: red;">from</span><span
style="color: blue;">=</span>"<span
style="color: blue;">gonderen@mail.com</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">        \<</span><span
style="color: #a31515;">network</span><span style="color: blue;">
</span><span style="color: red;">host</span><span
style="color: blue;">=</span>"<span
style="color: blue;">mail.sunucum.com</span>"<span style="color: blue;">
</span><span style="color: red;">port</span><span
style="color: blue;">=</span>"<span style="color: blue;">25</span>"<span
style="color: blue;"> </span><span
style="color: red;">userName</span><span
style="color: blue;">=</span>"<span style="color: blue;">kullanici
adi</span>"<span style="color: blue;"> </span>

<span style="color: blue;">                </span><span
style="color: red;">password</span><span
style="color: blue;">=</span>"<span
style="color: blue;">şifre</span>"<span style="color: blue;">
</span><span style="color: red;">defaultCredentials</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">      \</</span><span
style="color: #a31515;">smtp</span><span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">mailSettings</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">system.net</span><span
style="color: blue;">\></span>

</div>

\

"Yok, ben ısrarla SMTP Authentication olayını kodumun içerisinde çözmek
istiyorum!" diyorsanız aşağıdaki kodu kullanabilirsiniz.

<div style="color: black;">

        <span style="color: blue;">Dim</span> message <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Mail.MailMessage

        message.IsBodyHtml = <span style="color: blue;">True</span>

        message.Body = html

        message.To.Add(<span style="color: blue;">New</span>
System.Net.Mail.MailAddress(<span
style="color: #a31515;">"hedef@mail.com"</span>))

        message.From = <span style="color: blue;">New</span>
System.Net.Mail.MailAddress(<span
style="color: #a31515;">"gonderen@mail.com"</span>)

        <span style="color: blue;">Dim</span> server <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
System.Net.Mail.SmtpClient(<span
style="color: #a31515;">"mail.sunucum.com"</span>)

        server.Credentials = <span style="color: blue;">New</span>
System.Net.NetworkCredential(<span style="color: #a31515;">"kullanıcı
adı"</span>, <span style="color: #a31515;">"şifre"</span>)

        server.Send(message)

</div>

\

Hepinize kolay gelsin...


