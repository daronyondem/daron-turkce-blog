---
FallbackID: 2701
Title: ASP.NET 4.5'teki dahili JS/CSS Minification
PublishDate: 9/18/2011
EntryID: ASPNET_45teki_dahili_JS_CSS_Minification
IsActive: True
Section: software
MinutesSpent: 0
Tags: .NET Framework 4.5, ASP.NET, ASP.NET 4.5, CSS, JavaScript
---
Build ikinci gün keynote'undan en çok hoşuma giden şeyler biri ASP.NET
4.5'teki JavaScript ve CSS minification özelliğiydi. Biliyorsunuz artık
projelerimizde birçok JavaScript ve CSS dosyaları bulunuyor. Bu
dosyaları ayrı ayrı HTML dosyalara include ediyoruz. Durum böyle olunca
her bir dosya için tarayıcı tarafından ayrı istekler gönderiliyor
sunucuya ve bu da sayfanın tamamen yüklenmesini geciktirmiş oluyor.
Bunun çözümü tüm bu dosyaları birleştirip tek bir dosya haline getirmek
ama bu sefer de kodların yönetimi, versyonlaması vs sıkıntılı
olabiliyor. Yine de çoğu zaman production'a geçiş sürecinin bir adımı
olarak elle minification yaptığımız oluyor.

ASP.NET 4.5 ile beraber bu işlem otomatik hale geliyor. JavaScript veya
CSS dosyalarını bir klasör altında topladıktan sonra ASP.NET 4.5
alfabetik sıra ile bu dosyaları runtime'da birleştirip stream
edebiliyor. CSS dosyalarını birleştirirken özellikle ilk başka reset.css
ve normalize.css dosyaları alınıyor birleştirmeye.

**[HTML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <script src="scripts/js" />
```

Tüm JavaScript dosyalarınızı projenize Scripts adında bir klasörü
attığınızı düşünürsek yukarıdaki gibi bir script inclusion gerekli
birleştirmenin yapılarak istemciye gönderilmesini sağlayacaktır.

**[HTML]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
    <link href="styles/css" rel="Stylesheet" />
```

CSS dosyalarınızın bulunduğu styles adında bir klasörün var olduğunu
düşünürsek CSS'lerin birleştirilip stream edilmesi için de yukarıdaki
gibi bir link yeterli olacaktır.

Eğer ki birleştirilecek dosyaların tiplerini, yerlerini ve stream
edilecek adresini değiştirmek isterseniz bunu Global.asax içerisinde
aşağıdaki şekilde yapabilirsiniz.

**[C\#]**

``` {style="font-family: Consolas; font-size: 13; color: black; background: white;"}
        Bundle Yeni = new Bundle("/Scriptlerim", typeof(JsMinify));
        Yeni.AddDirectory("/scriptklasoru", "*.js", false);
        Yeni.AddFile("/scriptklasoru/tek.js");
        BundleTable.Bundles.Add(Yeni);
```

Yukarıdaki kodumuzda birleştirilecek dosyaların sunulacağı adresi ve
birleştirmek için kullanılacak sınıfı Bundle sınıfına parametre olarak
geçiyor. Böylece yarattığım yeni birleştirme paketine sonrasında da
**AddDirectory** veya **AddFile** ile tek tek dosya veya klasör
ekliyoruz. Son olarak da BundleTable'a yarattığımız paketi ekleyip
işimizi bitiyoruz.

Şu anda yapamadığımız birşey olmasa da yapılma şeklini kolaylaştırarak
minification'ı ASP.NET'in parçası haline getirmek bence çok hoş bir
hareket olmuş.

Hepinize kolay gelsin.

Bu makale **Visual Studio 11 Express for Windows Developer Preview**\
ve **Windows 8 Developer Preview Build 8102** kullanılarak yazılmıştır.


