---
FallbackID: 2784
Title: "Table Services Round 3": Continuation Token
date: "2012-8-21"
EntryID: Table_Services_Round_3_Continuation_Token
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure Storage Services, Windows Azure
---
**[Aşağıdaki makalenin SDK2.5 ile beraber yeni Azure özelliklerine uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/software/post/Table_Services_SDK_25_Continuation_Token)
bulabilirsiniz.]**

Hiç denediniz mi bilmiyorum :) ama eğer ki bir table'dan 1000'den fazla
nesneniz varsa.. ki kesinlikle olacaktır. Hatta Table Service'in en
kuvvetli yönlerinden biri şu anda SQL Azure 150GB database sınırına
sahipken Table Service'de 1TB'a kadar bir table'da data tutabiliyor
olmamız :) neyse ne diyordum? :) Evet, denediyseniz :) select
çektiğinizde göreceksiniz ki 1000 kayıttan daha fazla kayıt
alamıyorsunuz. Durum çok normal çünkü bu da servisin sınırlarından biri.
Eğer 1000'den fazla kayıt alacaksanız size gelen "Continuation Token"ı
alıp sonra da o token ile ikinci bir REST talebi göndermeniz gerekiyor.
Bu arada unutmadan Table Service'de her bir sorgunun çalışma süresinin
maksimum 5 saniye olduğunu da bu vesile ile hatırlatiyim ;)

### CloudTableQuery

TableServiceContext'lerimi yaratırken sürekli olarak DataServiceQuery
kullandık, oysa DataServiceQuery maalesef ki Table Service ile beraber
gelen Continuation Token yapısını desteklemiyor. İtiraf etmek gerekirse
onu destekler hale getirebiliriz çünkü sonuç itibari ile Continuation
Token dediğimiz şey bir http header. O bilgiyi alıp bir sonraki request
ile yollamamız halinde doğrudan bir önceki sorgunun devamını almış
oluyoruz. Fakat tüm bunlarla uğraşmak yerine doğrudan CloudTableQuery
sınıfını kullanabiliriz. Söz konusu sınıfın kendi içinde zaten
Continuation Token desteği var ;)

**[C\#]**
```cs
var urunlerContext = new UrunlerContext();
var AnaUrun = urunlerContext.Urunler.AsTableServiceQuery().Execute().ToList();
```

"Bu kadar!" desem? :) Ama ne yaptığımıza bir bakmak gerek. Birincisi
"AsTableServiceQuery" diye bir extension method kullandık. Bu metodun
adı kesinlikle yanlış :) çünkü aslında bir DataServiceQuery'i yerine
CloudTableQuery döndürüyor :) Böylece artık bu noktadan itibaren
"Continuation Token" desteğinin çantada olduğunu söyleyebiliriz.
Sonrasında "Execute" metodu ise Continuation Token'ı kendi için handle
ederek tüm kayıtlar gelene kadar bin bin :) sayfa sayfa kayıtları
alabiliyor. Eh üzerinde bir de cila gibi ToList çağırınca :) tüm table
elimizde.

Eğer ki sayfaları tek tek gezip, continuation token'ları siz alıp belki
de uygulama içerisinde de bir sayfalama yapısı ile bağlamak isterseniz
tabi ki bunu da yapmak mümkün.

**[C\#]**
```cs
var urunlerContext = new UrunlerContext();
var CloudQuery = urunlerContext.Urunler.AsTableServiceQuery();
IAsyncResult iAsyncResult = CloudQuery.BeginExecuteSegmented
                                (BeginExecuteSegmentedIsDone, CloudQuery); 
```

Yukarıdaki şekilde CloudTableQuery'yi yarattıktan sonra üzerinden
**BeginExecuteSegmented** diyerek her bin kayıtlık talep için talep
serisini biz başlatmış oluyoruz. Bunu yaparken hem bir AsyncCallBack hem
de context olarak query'nin kendisi parametre veriyoruz.

**[C\#]**
```cs
static void BeginExecuteSegmentedIsDone(IAsyncResult result)
{
    CloudTableQuery<Entities.Urun> CloudQuery = result.AsyncState 
                                            as CloudTableQuery<Entities.Urun>;
    var resultSegment = CloudQuery.EndExecuteSegmented(result);
    List<Entities.Urun> listSongs = resultSegment.Results.ToList<Entities.Urun>();
    if (resultSegment.HasMoreResults)
    {
        IAsyncResult iAsyncResult = CloudQuery.BeginExecuteSegmented
            (resultSegment.ContinuationToken, BeginExecuteSegmentedIsDone, CloudQuery); 
    }
} 
```

Callback içerisinde ilk olarak hemen **AsyncState'den**
CloudTableQuery'imizi geri alıyoruz. Sonra query üzerinden
**EndExecuteSegmented** diyerek eldeki Result ile durumu
sonuçlandırıyoruz. Artık **Result** üzerinden Urun listemizi alabiliriz.
Burada ister aldığınız veriyi direk bir ekranda gösterip Continatiın
Token'ı saklayın ister benim yaptığım gibi tüm kayıtlar bitene kadar
recursive takılın :)

Kodun devamında aldığımız result olan **resultSegment** üzerinden
**HasMoreResults** diyerek başka kayıt var mı onu kontrol ediyoruz. Eğer
varsa isterseniz yine **resultSegment** üzerinden alabileceğimiz
**ContinuationToken** ile yeni bir **BeginExecuteSegmented** ile sonraki
talebi gönderebiliriz.

Böylece sayfa sayfa kayıtları bizim elle almamız da mümkün ;)

Hepinize kolay gelsin ;)


