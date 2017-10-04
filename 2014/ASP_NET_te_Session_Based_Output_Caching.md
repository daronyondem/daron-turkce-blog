---
FallbackID: 2898
Title: ASP.NET'te Session Based Output Caching
PublishDate: 26/3/2014
EntryID: ASP_NET_te_Session_Based_Output_Caching
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, ASP.NET 2.0, ASP.NET 3.5, ASP.NET 4.0, ASP.NET 4.5
---
ASP.NET'te OutputCaching olayını bilmeyen yoktur diye tahmin ediyorum.
Kabaca herhangi bir sayfanın çıktısının cache'e alınmasını sağlayan bu
özellik ile isterseniz **PartialCaching** de yapabilirsiniz. Yani bir
sayfanın tamamı cache'e alınmazken içindeki bir **UserControl**
alınabilir. Tüm bunların epey detaylıca ayarlarını yapmak da mümkün.
Örneğin Cache'in ne şekilde oluşturulacağını belirlemek için
**VaryByParam** ile **GET/POST** ile gelen parametrelerdeki
değişiklikleri baz alabiliyoruz. Buna ek olarak **VaryByControl** ile de
sayfadaki herhangi bir ASP.NET kontrolündeki değişikliğin Cache'i valide
etmesini de sağlayabiliyoruz. Böylece tek bir sayfa URL'den gelen bir
ID'ye göre birden çok defa cache'e alınabiliyor veya sayfadaki bir
kontroldeki her state için ayrı ayrı cache'lenebiliyor.

### VaryByCustom

İşte şimdi size bir VaryByCustom hikayesi anlatacağım :) Çoğumuzun
bilmediğini tahmin ettiğim **VaryByCustom** aynı **VaryByParam** ve
**VaryByControl'de** olduğu gibi **OutputCaching'de** variyasyonların
nasıl yaratılacağını belirliyor. Fakat adından da anlaşılacağı üzere bu
işlemi olabildiğince özelleştirilebilir bir şekilde yaparak bize
esneklik sağlıyor. Esasında benim tüm bu makaleyi yazmama neden olan
ihtiyaç şöyle bir ihtiyaçtı. ASP.NET'te bir sayfada yer alan
UserControl'üm dışarıdan aldığı bir parametreye göre içerik gösteriyor.
Bu parametre hep değişebiliyor ve tabi ki farklı parametreler için
farklı cache'ler şart. Bu noktaya kadar sanırım "VaryByControl" yeter de
artar. UserControl'ün içinde dışarıdan parametreyi aldığı bir property
var ve bu Property'yi VaryByControl ile OutputCache'e vermemiz bu
noktaya kadar ihtiyacımızı giderecek.

**[ASP.NET]**

```html
<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ornek.ascx.vb" Inherits="site.ornek" %>
<%@ OutputCache Duration="160" VaryByControl="ornek.birID" Shared="true" %>
```

Yukarıdaki manzarada 160 saniyelik bir OutputCache'i UserControl'e
verdik. Farklı sayfalarda bu UserControl aynı parametrelerle
kullanılırsa tek bir defa Cache'lenmesi için **Shared** özelliğini de
**True** olarak set ettik. Son olarak da **ornek** adındaki
UserControlümüzün **birID** adındaki Property'sini **VaryByControl**
diyerek tüm cache'lerin bu property'ye gelen değerler etrafında
oluşturulmasını sağladık. Bir sonraki adıma geçecek olursak esas ilginç
noktaya gelmiş olacağız. Tüm cachle'lerin session based olmasını
istiyoruz :) Evet, bir nefes alalım... Biliyorsunuz ASP.NET'teki
OutputCache Session based değil. Yani bir kullanıcı siteye gelip
Cache'lenmeye sebep oldu ise diğer kullanıcı geldiğinde Cachelenmiş
içeriği görür. Aslında bu tam da OutputCache'in yapması gereken şey. Ama
benim ihtiyacım olan bu değildi :) İstediğim şey siteye gelen her
kullanıcının kendi cache'ine sahip olması. Böylece her kullanıcı siteye
geldiği anda taze veri alacak ve kendi session'ı boyunca cachelenmiş
veri görecek. Bunu yapabilmek için **VaryBySession** gibi bir şey lazım
ki böyle bir şey yok. O yüzden ben de **VaryByCustom'a** başvurma kararı
aldım.

**[ASP.NET]**

```html
<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ornek.ascx.vb" Inherits="site.ornek" %>
<%@ OutputCache Duration="160" VaryByControl="ornek.birID" VaryByCustom="sessionlifetime" Shared="true" %>
```

İlk olarak yukarıdaki gibi OutputCache'e **VaryByCustom** özelliği
veriyoruz. Buraya ne yazdığınız önemli değil. Yeter ki **Browser**
yazmayın :) çünkü o şekilde tanımlı hazır bir yapı zaten var. Onun
yerine ben kendi örneğimde "**sessionlifetime**" dedim. Dediğim gibi
buraya herhangi bir string değer verebilirsiniz. Bir sonraki adımda bu
değeri yakalayan yine biz olacağız.

**[Global.asax / VB]**

```vb
Public Overrides Function GetVaryByCustomString(context As HttpContext, arg As String) As String
    If (arg = "sessionlifetime") Then
        Return context.Session.SessionID
    Else
        Return ""
    End If
End Function
```

**Global.asax** içerisinde **Override** edebileceğiniz
**GetVaryByCustomString** adında bir fonksiyon var. Bu arkadaşa context
olarak **HttpContext** ile beraber bir de **args** parametresi geliyor.
Koddan da anlayabileceğiniz üzere args zaten bizim **VaryByCustom'a**
verdiğimiz değer. Eğer farklı sayfalarda farklı **VaryByCustom**
değerleriniz varsa buradaki fonksiyonu bir Switch koyarak ilerlemeniz
gerekecek. Ben Session based caching istediğim için Cache Validasyonu
adına SessionID'yi kullanmak mantıklı oldu. Buradan geri döndüğünüz her
farklı değer OutputCache için bir input olacak ve eğer yeni farklı bir
değer gelmiş ise hemen yeni bir Cache yaratılacak. Eğer değer daha önce
geri gönderilmiş ise bu sefer söz konusu kontrolün içeriği Cache'den
stream edilecek.

İşte bu kadar basit. Böylece hem UserControl'e gelen parametreye göre
hem de Session based bir OutputCaching'im olmuş oldu :) Ben mutluyum,
umarım sizin de işinize yarar.

Kolay gelsin.


