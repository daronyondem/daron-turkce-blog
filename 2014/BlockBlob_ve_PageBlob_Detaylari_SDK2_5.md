# BlockBlob ve PageBlob Detayları (SDK2.5)
Bloblarla ilgili birçok detayı daha önceki yazılarda inceledik. Hatta
PageBlob ile BlockBlob arasındaki farklılığa da değinmiştik. Şu ana
kadar bildiklerimizin üzerinden geçmek gerekirse PageBlob'ların 512
byte'lık paketler (max4MB'lık paket olabilir) şekilde veri
saklayabildiğini ve daha ağırlıklı olarak random read/write için uygun
olduklarını BlockBlob'ların ise daha büyük paketlerle çalışabildiklerini
(4MB gibi MAX 64MB Paket olabilir, Storage Client'taki maksimum destek 32MB'a kadar.) ve ufaktan da bir transaction
yapılarının olduğunu biliyoruz. PageBlob'lar 1TB'a kadar veri
saklayabilirken BlockBlob'lar 200GB ile sınırlı. Gelin şimdi biraz daha
detaylara girerek işlemlerin daha alt seviyelerde nasıl yapılabildiğince
göz atalım.

### Bir BlockBlob'ın kullanımı

Normal şartlarda StorageClient'ın yüksek seviyeli diyebileceğimiz
API'lerini kullandığınızda PageBlob veya BlockBlob gibi ayrımlarla
uğraşmazsınız ama eğer isterseniz birazdan yapacağımız gibi daha alt
seviyeli API'lere doğru ilerleyerek tüm kontrolü ele almanız da mümkün.

**[C\#]**

```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
var anaContainer = blobClient.GetContainerReference("anacontainer");
anaContainer.CreateIfNotExists();
anaContainer.SetPermissions(new BlobContainerPermissions()
                     { PublicAccess = BlobContainerPublicAccessType.Blob });
```

İlk olarak yukarıdaki giriş kodumuz ile kendimize sıfırdan bir container
yaratalım. Container'ımıza blob seviyesinde public access de verelim ki
herkes ulaşabilsin. Şimdi ise yavaş yavaş bir BlockBlob yaratarak
kullanımına bakalım.

**[C\#]**

```cs
CloudBlockBlob blob = anaContainer.GetBlockBlobReference("birblockblob");
```

Blockblobları yaratırken CloudBlockBlob nesnesini kullanıyoruz. Genel
mantık tek tek bloklar yüklemekten oluşuyor. Elinizdeki datayı
istediğiniz boyutlarda bloklara bölerek bu blobları ayrı ayrı sunucuya
gönderiyorsunuz. Her gönderdiğiniz bloğun bir de tabi ki blockID'si
oluyor. İsterseniz bu blokları asenkron olarak gönderebilirsiniz,
sırasız gönderebilirsiniz. Yani özetle kafanıza göre takılabilirsiniz :)

**[C\#]**

```cs
List<string> blockIds = new List<string>();
for (int i = 0; i < 10; i++)
{
    var newId = Convert.ToBase64String(Encoding.Default.GetBytes(i.ToString()));
    blob.PutBlock(newId, new MemoryStream(Encoding.Default.GetBytes("TEST")), null);
    blockIds.Add(newId);
}
```

Yukarıdaki örnek kodda da görebileceğiniz üzere her bir Block'u
**PutBlock** ile sunucuya gönderiyoruz. PutBlock'un toplam üç
parametresi var, bunlardan ilki söz konusu bloğa ait ID bilgisi. ID'nin
kesinlikle Base64 olması gerekiyor. İkinci parametre datamaızın ta
kendisi. Ben deneme amaçlı bir çalışma için basit bir metin gönderiyorum
ama siz elinizdeki büyük dosyaları da bloklara bölüp ayrı ayrı
gönderebilirsiniz. Hatta multithread takılıp aynı anda birden çok blok
bile gönderebilirsiniz. PutBlock'un son parametresi normalde verinin bir
MD5 Hashi oluyor. Ben tembellikten eklemedim :)

Tüm bu işlemler sürerken BlockID'lerini bir listede tutuyoruz. Bunun
nedeni ise aslında PutBlock dediğimizde verinin doğrudan Blob'a
yansımıyor olması. Tüm blokları gönderdikten sonra gönderdiğiniz
blokların ID'lerini ayrı bir liste olarak gönderip tüm block'ların
commit olmasını sağlıyorsunuz.

**[C\#]**
```cs
blob.PutBlockList(blockIds);
```

Böylece upload işlemi tamamlanmış oluyor. İşte bir BlockBlob'un çalışma
yapısı bu şekilde. Aşağıdaki kodu bir bütün olarak çalıştırıp sonuca bir
göz atın.

**[C\#]**
```cs
protected void Page_Load(object sender, EventArgs e)
{
    CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
    var anaContainer = blobClient.GetContainerReference("anacontainer");
    anaContainer.CreateIfNotExists();
    anaContainer.SetPermissions(new BlobContainerPermissions()
                 { PublicAccess = BlobContainerPublicAccessType.Blob });
    CloudBlockBlob blob = anaContainer.GetBlockBlobReference("birblockblob");
    List<string> blockIds = new List<string>();
    for (int i = 0; i < 10; i++)
    {
        var newId = Convert.ToBase64String(Encoding.Default.GetBytes(i.ToString()));
        blob.PutBlock(newId, new MemoryStream(Encoding.Default.GetBytes("TEST")), null);
        blockIds.Add(newId);
    }
    blob.PutBlockList(blockIds);    
    Response.Write(blob.Uri.ToString());
}
```

Ekrana yazdırılan adrese tarayıcıdan gittiğinizde doğal olarak arka
arkaya yazılmış 10 tane TEST kelimesi olan bir metin dosyası ile
karşılacaksınız.

Eğer isterseniz bir BlockBlob'un istediğiniz bir blokunu değiştirebilir
veya üzerine yeni bloklar da ekleyebilirsiniz. Sonrasında commit
ettiğiniz sürece dosyada değişikler anında gözükecektir. İşin güzel
tarafı SnapShot almışsanız ve sadece tek bir block değiştirmişseniz
sadece değiştirdiğiniz block'un boyutu içi para ödüyorsunuz ;)

**[C\#]**

```cs
blockIds.AddRange(blob.DownloadBlockList(BlockListingFilter.Committed)
                      .Select(b => b.Name));
blob.PutBlock(blockIds[2], new MemoryStream(Encoding.Default.GetBytes("TEST2")), null);
blob.PutBlockList(blockIds);
```

Kodumuzun ilk satırında önemli bir detay var.
**DownloadBlockList(BlockListingFilter.Committed)** dediğinizde commit
edilmiş tüm blockların ID'lerini alabiliyorsunuz. Aynı şekilde
**UnCommitted** bloklara da ulaşabilir ve commit edilmeden yine
üzerlerinde değişiklik yapabilirsiniz. Bir Storage Account'ta toplam 100.000 uncommitted block olabilir ve toplam veri miktarı da 400GB'ı geçemez. Şimdilik örnek olması amacı ile
ben gelen listeden ikinci block'u seçip metni değiştiriyorum. Sonunda
ise tekrar blockID'leri gönderiyorum ki dosya son haline toparlansın.

Kodun son hali şu şekilde;

**[C\#]**
```cs
protected void Page_Load(object sender, EventArgs e)
{
    CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
    var anaContainer = blobClient.GetContainerReference("anacontainer");
    anaContainer.CreateIfNotExists();
    anaContainer.SetPermissions(new BlobContainerPermissions()
                     { PublicAccess = BlobContainerPublicAccessType.Blob });
    CloudBlockBlob blob = anaContainer.GetBlockBlobReference("birblockblob");
    List<string> blockIds = new List<string>();
    blockIds.AddRange(blob.DownloadBlockList(BlockListingFilter.Committed)
                          .Select(b => b.Name));
    blob.PutBlock(blockIds[2], new MemoryStream(Encoding.Default.GetBytes("TEST2")), null);
    blob.PutBlockList(blockIds);
    Response.Write(blob.Uri.ToString());
}
```

Unutmadan, eğer bir bloğu bir hafta boyunca commit etmezseniz söz konusu block otomatik olarak silinecektir. Aynı şekilde upload edilmiş bir Block'un ID'si eğer bir PutBlockList listesinde bulunmazsa hemen PutBlockList komutu sonrasında listede bulunmayan ve blob'a ait diğer havada kalan blocklar silinir. 

### PageBlob'lara bakış...

PageBlob'lar daha nokta atışı çalışmaya yönelik. Ayrıca önce veriyi
veriyim sonra beraber commit ederim gibi bir durum da yok. Yapılan her
değişiklik anında sonuca yansıyor. İşin kötü tarafı ise bloblara 512
byte'ın katları şeklinde veri sakalamak zorunda olmamız :) Yani elinizde
stream varsa ona göre ilerlemeniz gerekecek.

**[C\#]**

```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
var anaContainer = blobClient.GetContainerReference("anacontainer");
anaContainer.CreateIfNotExists();
anaContainer.SetPermissions(new BlobContainerPermissions()
                 { PublicAccess = BlobContainerPublicAccessType.Blob });

```

İlk olarak yukarıdaki gibi klasik işlemlerimizi yapalım ve
PageBlob'umuzu yaratmaya hazırlanmış olalım.

**[C\#]**

```cs
CloudPageBlob pageBlob = anaContainer.GetPageBlobReference("ornekpage4.txt")
```

Yukarıdaki kodu sanırım tahmin etmişsinizdir. Güzel bir PageBlob
yaratarak yolumuza devam ediyoruz. Bundan sonrasında örnek olarak ben
diskten bir TXT dosyası okuyup onu göndereceğimiz PageBlobumuza.

**[C\#]**

```cs
CloudPageBlob pageBlob = anaContainer.GetPageBlobReference("ornekpage4.txt");

byte[] buffer;
FileStream fileStream = new FileStream(@"C:\test.txt", FileMode.Open, FileAccess.Read);
try
{
    int length = (int)fileStream.Length;  
    buffer = new byte[512];
    int count;                            
    int sum = 0;
    //BURAYA BİRŞEYLER GELECEK       
}
finally
{
    fileStream.Close();
}
```

İlk olarak gelin yukarıdaki koda hızlıca bir bakalım. PageBlob'umuzu
yaratmışız. Basit bir şekilde diskten bir dosyayı FileStream ile
açmışız. Sonra da bazı değişkenlerimizi tanımlamışız. Hazırlık belli ki
bir While ile stream'i okumak için yapılmış :) Önemli noktalardan biri
buffer'ımızın 512 byte olması. Sürekli 512 byte'lık paketler
göndereceğiz PageBlob'a. PageBlob'a gönderebileceğiniz paketler 512 byte
ile 4MB arası değişebilir ama kesinlikle 512'nin katı olmak zorundalar.

**[C\#]**

```cs
var EnYakin512Kati = ((length + 511) / 512) * 512;
pageBlob.Create(EnYakin512Kati);

while ((count = fileStream.Read(buffer, 0, 512)) > 0)
{
    pageBlob.WritePages(new MemoryStream(buffer), sum);
    buffer = new byte[512];
    sum += count; 
}
```

Bir üstteki kodun orta yerine yukarıdakini alıyoruz :) İlk olarak
elimizdeki dosyanın stream uzunluğuna en yakın 512'nin katını bularak o
boyuta denk gelecek şekilde pageBlob'un Create metodu ile Blob'u
gerçekten yaratıyoruz :) Sonra bir while ile buffer'ımızı doldurup
doldurup **WritePages** ile de bloba aktarıyoruz.

Kodun tamamını aşağıda bulabilirsiniz;

**[C\#]**
```cs
CloudStorageAccount storageAccount = CloudStorageAccount.DevelopmentStorageAccount;
CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
var anaContainer = blobClient.GetContainerReference("anacontainer");
anaContainer.CreateIfNotExists();
anaContainer.SetPermissions(new BlobContainerPermissions()
                 { PublicAccess = BlobContainerPublicAccessType.Blob });

CloudPageBlob pageBlob = anaContainer.GetPageBlobReference("ornekpage4.txt");

byte[] buffer;
FileStream fileStream = new FileStream(@"C:\test.txt", FileMode.Open, FileAccess.Read);
try
{
    int length = (int)fileStream.Length;  
    buffer = new byte[512];
    int count;                            
    int sum = 0;
    var EnYakin512Kati = ((length + 511) / 512) * 512;
    pageBlob.Create(EnYakin512Kati);
    while ((count = fileStream.Read(buffer, 0, 512)) > 0)
    {
        pageBlob.WritePages(new MemoryStream(buffer), sum);
        buffer = new byte[512];
        sum += count; 
    }       
}
finally
{
    fileStream.Close();
}
Response.Redirect(pageBlob.Uri.ToString());
```

İtiraf etmem lazım PageBlob'larla çalışma hiç kolay değil. En azından
ben BlockBlob'ları daha çok seviyorum :) PageBlob'lar ise tek tek
512bytelık aralıklara kadar müdahale sağlıyor. PageBlob'lardan snapshot
aldığınızda sadece değişen 512 byte'lar için para ödeyeceğini de
hatırlamakta fayda var ;)

Kendinize çok iyi bakın.

*Bu yazi http://daron.yondem.com adresinde, 2014-12-9 tarihinde yayinlanmistir.*
