---
FallbackID: 2838
Title: "Visual Studio Blue ve beraberinde gelen yenilikler..."
date: "2013-4-1"
EntryID: Visual_Studio_Blue_ve_beraberinde_gelen_yenilikler
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
---
Biliyorsunuz son zamanlarda "Windows Blue" üzerine bolca dedikodular
geziyor. Hatta bunların çoğu dedikodu da olmaktan çıktı ve bazı kaçaklar
sonucunda Windows'un bir sonraki sürümü olduğu iddia edilen, kod adı
Blue olan Windows sürümü ile ilgili internette birçok video de
yayınlandı. Ben de bugün sizlerle yepyeni bir haberi paylaşmak
istiyorum. O da Visual Studio'nun Blue sürümü ve beraberinde gelen
yenilikler. 2015'te çıkması beklenen Visual Studio Blue'nun "Early
Preview"larından birine göz atma şansım oldu ve işte gördüklerim.

![Visual Studio Blue efsane gibi
geliyor...](media/Visual_Studio_Blue_ve_beraberinde_gelen_yenilikler/blue.jpg)\
*Visual Studio Blue efsane gibi geliyor...*

Visual Studio Blue'daki özellikler gerçekten çok şaşırtıcı ve devrim
niteliğinde. Bu özelliklerin çoğu .NET Framework'ün derinliklerinden
geliyor. İtiraf etmek gerekirse IDE anlamında çok bir yenilik göremedim
ben.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        for.Cloud (int i = 0; i < 100; i++; 150)        {                    }
```

En ilginçlerinden biri "Cloud" extension'ları. En basit For döngüsünü
bile artık Cloud'a taşıyabiliyoruz. Malum zaten artık Cloud'a taşınmayan
şey kalmadı. For döngülerimizin de taşınmış olması bence çok anlamlı.
Böylece Parallel halt yemiş oluyor. Yukarıdaki syntax'ta dikkatinizi
çektiyse for'daki local değişkenin arttırıldığı kısımdan sonra bir de
150 sayısı var. İşte oradaaki 150 Cloud'ta kaç instance olarak For
döngüsü çalıştırmak istediğimizi belirliyor.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        public async Task OrnekOperasyon()        {            awaitInTheCloud OrnekOperasyon2();        }
```

Bir diğer güzellik ise Async/Await tarafında geliyor. Artık
operasyonları beklemek için değerli yerel kaynaklarınızı kullanmak
zorunda değilsiniz. Onun yerine Cloud'da bekleyebiliyorsunuz.
"**awaitInTheCloud**" adındaki yeni bir keyword ile bu işi de çözmüş
oluyorsunuz ve app.config'te tanımladığın ayarlara göre reserve edilmiş
Cloud kaynaklarınızla beklemeye başlayabiliyorsunuz. İtiraf etmek
gerekirse bence bu keyword'ün adını değiştirmelerinde fayda var. Biraz
garip duruyor gibi ama... kısmet...

Bunlar gibi daha birçok yenilik var Visual Studio Blue'da ama özellikle
bu ikisi Cloud ile alakalı oldukları için hemen değinmek istediklerim
oldu. Diğer yenilikleri de ayrı yazılarla sizlerle en kısa zamanda
paylaşacağım. Visual Studio Blue ve .NET yerine gelen **.Blue
Framework** gerçekten yeni bir çığır açacak gibi duruyor.


