---
FallbackID: 2959
Title: "Table Services SDK 2.5 Continuation Token"
date: "2015-3-11"
EntryID: Table_Services_SDK_25_Continuation_Token
IsActive: True
Section: software
MinutesSpent: 45
Tags: Azure Storage Services, Windows Azure
---
# Table Services SDK 2.5 Continuation Token
Hiç denediniz mi bilmiyorum :) ama eğer ki bir table'dan 1000'den fazla
nesneniz varsa.. ki kesinlikle olacaktır. Hatta Table Service'in en
kuvvetli yönlerinden biri şu anda SQL Azure 500GB database sınırına
sahipken Table Service'de 200TB'a kadar bir table'da data tutabiliyor
olmamız :) neyse ne diyordum? :) Evet, denediyseniz :) select
çektiğinizde göreceksiniz ki 1000 kayıttan daha fazla kayıt
alamıyorsunuz. Durum çok normal çünkü bu da servisin sınırlarından biri.
Eğer 1000'den fazla kayıt alacaksanız size gelen "Continuation Token"ı
alıp sonra da o token ile ikinci bir REST talebi göndermeniz gerekiyor.
Bu arada unutmadan Table Service'de her bir sorgunun çalışma süresinin
maksimum 5 saniye olduğunu da bu vesile ile hatırlatiyim ;)

### Test Ortamı

İlk olarak isterseniz bir test ortamı yaratalım. Bunun için basit bir nesne yaratıp dummy data insert edebiliriz.

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
CloudTable table = tableClient.GetTableReference("Urunler");
await table.CreateIfNotExistsAsync();

for (int i = 0; i < 10000; i++)
{
    CustomerEntity customer = new CustomerEntity("Örnek", i.ToString())
    {
        PhoneNumber = Guid.NewGuid().ToString(),
        PartitionKey = "Silver"
    };
    customer = await InsertOrMergeEntityAsync(table, customer);
}    
```

Yukarıdaki kod daha önce gördüğümüz, işlediğimiz mekanizmaları kullanarak 10.000 kayıt atıyor table services'a. Sıra bu veriyi okumaya gelince yine her zamanki **TableQuery** yapısını kullanacağız. Var sayalım ki söz konusu table içerisindeki bir partitiondaki tüm veriyi almak istiyorsunuz. Bizim örneğimizde de zaten 10.000 satırı tek bir partitiona attığımız için işimiz kolay.

### ContinuationToken Kullanımı

```cs
TableQuery<CustomerEntity> partitionScanQuery = new TableQuery<CustomerEntity>().Where
    (TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Silver"));

TableContinuationToken token = null;
do
{
    TableQuerySegment<CustomerEntity> segment = 
        await table.ExecuteQuerySegmentedAsync(partitionScanQuery, token);
    token = segment.ContinuationToken;
    foreach (CustomerEntity entity in segment)
    {
        Console.WriteLine("Kim gelmiş?: {0},{1}\t{2}", 
                entity.PartitionKey, 
                entity.RowKey, 
                entity.PhoneNumber);
    }
}
while (token != null);
```

ParitionKey üzerinden sorguyu oluşturduktan sonra **ExecuteQuerySegmentedAsync** derken daha önce yarattığımız bir **TableContinuationToken** nesnesi veriyoruz. Bu token bize sorgumuzu devam ettirerek 1000 kayıttan sonraki diğer 1000'leri, yani aslında ResultSet içerisindeki diğer sayfaları almamızı sağlayacak. Aslında ilk sorgu çalıştığında bu token'ı ExecuteQuerySegmentedAsync pek bir anlamı yok çünkü zaten ilk başta token null ama sonraki sayfaları çekerken token vererek devam etmemiz gerek. O nedenle kodu baştan bu şekilde yazmak pratik ;) İlk çalışmada sihirli kısım **TableQuerySegment** kısmı. **ExecuteQuerySegmentedAsync**'den geri gelen **TableQuerySegment** ile beraber **ContinuationToken** geliyor. Biz de zaten bu arkadaşı alıp Do/While dışında tanımladığımız değişkenimize atıyoruz. Bir sonraki turda bu değişkeni **ExecuteQuerySegmentedAsync**'e verdiğimiz için sorgunun aynı yerden devam ederek geri kalan kayıtların gelmesini sağlamış olacağız.

Böylece büyük verileri sayfalama işini API seviyesinde de halletmiş oluyoruz.

Hepinize kolay gelsin ;)

*Bu yazi http://daron.yondem.com adresinde, 2015-3-11 tarihinde yayinlanmistir.*
