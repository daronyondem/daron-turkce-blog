---
FallbackID: 2979
Title: "Yeni Blob tipimiz hayırlı olsun": AppendBlob
date: "2015-9-2"
EntryID: Yeni_Blob_tipimiz_hayirli_olsun_AppendBlob
IsActive: True
Section: software
MinutesSpent: 112
Tags: Azure Storage Services, Windows Azure
---
Daha önceleri Azure Storage altındaki [Blob servisleri](http://daron.yondem.com/software/search/blob) ile ilgili birçok yazı yazmıştım. Bu yazılarda bahsettiğim üzere Azure'da bir süre öncesine kadar iki farklı bir Blob söz konusuydu [Block ve PageBlob](http://daron.yondem.com/software/post/BlockBlob_ve_PageBlob_Detaylari_SDK2_5). Şubat ayında Azure Storage API'larındaki yeni bir güncelleme (v2015-02-21) ile yeni bir blob tipi daha Preview olarak kendini gösterdi. Geçen Ağustos'ta da nihai hali ile AppendBlob'lar yayına alındı ve Preview'dan çıktı.

Genel olarak blob tiplerini şöyle hızlıca hatırlayacak olursak;

**BlockBlob'lar** ağırlıklı olarak streaming için kullanılırken, parallel block upload ve sonrasında da BlockID'ler üzerinden Commit mantığı ile çalışıyorlar. **PageBlob'lar** ise tam tersi köşede rastgele okuma/yazma işlemleri yapabilme kabiliyeti ile beraber gelirken anlık commit ve doğrudan byte-byte işlem olanağı sağlıyor. AppendBlob'lar ise bu manzarada tam iki farklı blob tipinin ortasında duruyor. Hem block bazlı veri gönderimine olanak sağlarken hem de anında commit yapabiliyoruz. Adından da anlaşılacağı üzerine aslında bu Blob'lar tamamen Append işlemi, yani arka arkaya ekleme işlemi için optimize edilmiş durumdalar. Gönderilen her block doğrudan Blob'a commit oluyor ve Blob'un sonuna ekleniyor.

Tüm bu manzarayı göz önüne aldığınızda AppendBlob'lar özellikle loglama amaçlı kullanım için tasarlanmış gibi durabilir. Bana da sorarsanız durum bundan ibaret :) BlockBlob'lardan farklı olarak bir **AppendBlob** içerisine gönderdiğiniz bir block'u silemezsiniz, değiştiremezsiniz. Zaten gönderdiğiniz bir block'a karşılığı BlockBlob'da olduğu gibi size bir BlockID de verilmiyor. Yine özellikle BlockBlob ile karşılaştıracak olursak ilginç farklılıklardan biri de AppendBlob'a gönderilen her Block'un boyutunun birbirinden farklı olabileceği. Bu esneklik içerisinde bir Block en büyük 4MB olabilir ve bir AppendBlob'da azami 50.000 Block bulunabiliyor. Buradan kaba bir hesapla bir AppendBlob'un en büyük 195GB olabileceğini kestirmek zor değil :) Bu rakam PageBlob'larda 1TB.

Basit hali ile bir FileUpload örneği yapacak olursak Azure Storage SDK sayesinde işimiz pek de zor değil esasen. Tek yapmamız gereken kullandığımız blob tipini değiştirmek.

**[C\#]**
```cs
CloudAppendBlob appendThis = container.GetAppendBlobReference(ImageToUpload);
await appendThis.UploadFromFileAsync(ImageToUpload, FileMode.Open);
```
Tabi bu şekilde bir AppendBlob kullanmanın ne anlamı olduğu ile ilgili pek de fikrim yok. O nedenle gelin bir BlockUpload örneği yapalım ki AppendBlob'un hakkını vermiş olalım.

**[C\#]**
```cs
CloudAppendBlob appendThis = container.GetAppendBlobReference("ornekmetin.txt");
await appendThis.CreateOrReplaceAsync();
await appendThis.AppendTextAsync("Lay Lay");
Console.WriteLine(appendThis.DownloadText());
await appendThis.AppendTextAsync("Loy Loy");
Console.WriteLine(appendThis.DownloadText());
```

Tahmin edebileceğiniz üzere ben basit bir şekilde bir Console uygulamasında test ediyorum senaryoyu. SDK ile beraber gelen AppendText metodunu kullandım, ama tabi ki stream vs için de bolca yardımcı metod SDK'de mevcut. Bu noktada önemli olan ve atlanmaması gereken bir nokta var. **CreateOrReplaceAsync** olayının farkına varmışsınızdır sanırım? Eğer bu metod ile AppendBlob'u yaratmış olmasaydı ilk Append operasyonunun sonunda kucağımıza güzel bir 404 almış olurduk :) CreateOrReplace basit bir şekilde var olmayan bir AppendBlob'u yaratabileceği gibi var olanı bir AppendBlob'u sıfırlama işini da kendi içerisinde halledebiliyor. 

Son olarak değinmek isteyebileceğimiz bir diğer konu da Append operasyonlarında aynı veriyi birden çok defa yazma ihtimalini engellemek olabilir. Bunun için uygulanabilecek birkaç teknik var. Basit ETag'ler olabilir, sıra numaraları ve AppendPosition da işinizi görebilir. 

**[C\#]**
```cs
await appendThis.AppendTextAsync("Lay Lay", 
      System.Text.Encoding.UTF8, 
      new AccessCondition() { IfAppendPositionEqual = 0 }, null, null);
await appendThis.AppendTextAsync("Lay Lay");
```     
AppendPosition ile vereceğiniz posizyonun o an için Blob içerisinde yazmak istediğiniz ByteOffset olması gerekiyor. Örneğin aşağıdaki gibi bir kod bu işi çözecektir.

**[C\#]**
```cs
appendThis.FetchAttributes();
await appendThis.AppendTextAsync("Lay Lay",
      System.Text.Encoding.UTF8,
      new AccessCondition() { IfAppendPositionEqual =  appendThis.Properties.Length }, null, null);
```
Yukarıdaki kodda önce Blob'un **FetchAttributes** ile Properties kolleksiyonunu alıyoruz. Sonra da blobun toplam büyüklüğüne bakıp en sonuna oturacak yeni bir AppendBlock gönderiyoruz. Aynı ByteOffset'e iki kere yazamayacağımız için alt satırdaki Append işleminin iki defa gerçekleşmesi mümkün değil. Tabi tüm operasyona baktığınızda sürekli offset aldığımız için aynı veriyi farklı offsetlere yazma ihtimalimiz var. Bu durum özellikle birden çok istemciden Append gelirken de problem olabilir. Performanstan kayıp yaşamamak için bu sefer de her AppendBlock'a seri numarası veya epoch gibi şeyler eklemeyi düşünebilirsiniz.

İşte AppendBlob kabaca böyle bir yenilik :) Yıllardır Blob'lara pek yenilik gelmemişti. Tabi bunun arkasında hizmetin yeterli olgunlukta olmasının da payı var ama AppendBlob gerçekten de dump log işini kolaylaştırır nitelik. 

Görüşürüz.



