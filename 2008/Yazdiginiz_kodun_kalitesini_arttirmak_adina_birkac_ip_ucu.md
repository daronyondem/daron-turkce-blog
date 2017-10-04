---
FallbackID: 2285
Title: Yazdığınız kodun kalitesini arttırmak adına birkaç ip ucu.
PublishDate: 23/12/2008
EntryID: Yazdiginiz_kodun_kalitesini_arttirmak_adina_birkac_ip_ucu
IsActive: True
Section: software
MinutesSpent: 0
Tags: Visual Basic 2008, Visual Basic .NET
old.EntryID: 2b619b4b-b0c6-4808-a826-04b1707415ef
---
Kendi kodumuzu hepimize kendimiz yazarız ve çoğu zaman da kafamıza göre
yazarız. Oysa bir ekip içerisinde çalışırken ortak bir dil kullanmak
gerekir. Hatta buna kurum bazında bakarsak daha da ileri giderek
kurumların kendi kodlama standartlarını oluşturmalarında büyük fayda
vardır. Böylece ekipler değiştiğinde, yazılımcılar gelip gittiğinde aynı
projeler üzerinde çalışmaya devam etmek bir işkence olmaktan uzaklaşır.

Ben bu yazımda çok uçuk detaylara girmeyeceğim fakat genel geçer olarak
kabul edebileceğimiz bazı kurallardan bahsederek daha kaliteli kod yazma
konusunda bir katkı sağlamak ve belki de bu yazıyı okuyan öğrenci,
free-lance programcıların yarın öbür gün bir şirkette kod yazmaya
başladıklarında karşılaşabilecekleri sorunları az da olsa giderebilmeyi
hedefliyorum.

**VB ile kod yazmanın kuralların!**

-   İç içe olanlar haricinden her class, struct, interface, enumeration
    ve delegate için ayrı dosyalar yaratarak kodları birbirinden ayrı
    tutun.
-   Option Explicit ve Option Strict'i açın. Project / Properties /
    Common Properties / Build altında bu ayarları bulabilirsiniz. Ayrıca
    isterseniz bu ayarları varsayılan ayarlar olarak da
    ayarlayabilirsiniz.
-   On Error Goto ve On Error Next komutlarını sakın kullanmayın. Adam
    gibi Try/Catch yazın.
-   Kodunuza yorumlar yazın ve önce yorumları yazıp sonra koda geçin.
-   Eksik kalan yerler varsa oralara yorumlar yerleştirerek yapılması
    gereken veya yazılması gereken kodun yapacağı işi tanımlayın.
-   Kodunuz içinde sayılar veya metinlere doğrudan yer vermeyin.
    Contsant değişkenler ve enumaration yapılarına alışın ve kullanın.
-   Lütfen artık metin birleştirme işlemlerini StringBuilder ile yapın!
-   Yarattığınız nesnelerin Dispose metodlarını çağırmayı unutmayın.
    Bunu rahatlıkla Try/Catch bloklarının Finally kısmında yapabilir
    veya söz konusu değişkenleri tanımlamak için Using deyimini
    kullanabilirsiniz.
-   Debug datalarını MessageBox ile göstermeyin! Visual Studio'nun Debug
    araçlarını kullanın. Sonra o MessageBox'lar kalıyor ve kullanıcıya
    da zırt pırt gösteriliyor!
-   Imports kullanın, tren uzunluğunda namespaceleri her yerde yazmayın.
-   Tüm değişkenleri Me. üzerinden kullanma alışkanlığınız varsa, acilen
    kurtulun!
-   80 kolondan uzun kodları alt satıra alın!
-   Pascal, Camel ve Upper Casing dışında kafanıza göre değişken
    isimleri tanımlamayın.
-   Class ve Structure tanımlarken Pascal Casing kullanın.
-   Değişken tanımlarken Camel Casing kullanın.
-   Bir metod 30 satır kodu geçiyorsa bir yerlerde hata vardır. Onu
    bölmeye çalışın.
-   Event handler tanımlarken OBJEADI\_EVENTADI kuralına uyun.

Ekleyecekleriniz varsa yorum olarak alabilirim ;) Hepinize kolay gelsin.


