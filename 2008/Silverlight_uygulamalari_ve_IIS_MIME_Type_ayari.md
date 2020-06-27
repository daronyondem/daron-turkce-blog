---
FallbackID: 1987
Title: "Silverlight uygulamaları ve IIS MIME Type ayarı."
date: "2008-3-12"
EntryID: Silverlight_uygulamalari_ve_IIS_MIME_Type_ayari
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Silverlight 2.0
old.EntryID: 4eb9e998-e9ca-4919-9dd8-9be5bac0eb22
---
# Silverlight uygulamaları ve IIS MIME Type ayarı.
Silverlight uygulamalarında kullandığımız XAML dosyalarının bazı
durumlarda IIS tarafından istemciye gönderilmediğinden daha önceki
yazılarımda bahsetmiştim. Bazen bu durum özellikle sunucu admini
(hosting sağlayıcı) tarafından ek ücret talebi yapabilmek adına kasıtlı
olarak yapılabildiği gibi bazen de gerçekten ortada bir sorun
olabiliyor. Peki nasıl düzelteceğiz?

**MIME Type tanımı nasıl yapılır?**

Silverlight XAML dosyalarının IIS tarafından istemciye sunulabilmesi
için aşağıdaki şekilde gerekli MIME type'ların tanımlanması gerecektir.

**Dosya uzantısı**: .xaml\
 **MIME type:** application/xaml+xml

**Dosya uzantısı**: .xap\
 **MIME type:** application/x-silverlight-app

XAML'ı biliyorduk da XAP da nesi? :) XAP şu an Silverlight 2.0 Beta 1
ile beraber kullanılan bir dosya uzantısı. Eğer olur ya bir fantezi
çerçevesinde Silverlight 2.0 Beta 1 ile sanal makinenizde
geliştirdiğiniz bir uygulamayı sunucuya koymak isterseniz şu an için XAP
dosyaları için de gerekli MIME Type'ları tanımlamanız gerekecektir.
İleride Silverlight 2.0'ın yayına çıkacak orijinal sürümlerinde bu
uzantının kullanılmaya devam edeceği tabi ki garanti değil.
Bahsettiğimiz teknoloji daha beta aşamasında.

Gelelim bu tanımlama işini nasıl yapacağımıza. Sunucuda **IIS
Manager**'ı açtıktan sonra **MIME Type** ayarı yapmak istediğiniz siteyi
seçerek sağ tuş tıklayarak gelen menüden "**Properties**" komutunu
veriyoruz. Karşımıza gelen pencereden "HTTP Header" sekmesine geçerek en
alttaki "MIME Types" düğmesine tıklıyoruz.

![IIS Manager içerisinde MIME Types seçeneğini
bulduk.](media/Silverlight_uygulamalari_ve_IIS_MIME_Type_ayari/12032008_2.png)\
*IIS Manager içerisinde MIME Types seçeneğini bulduk.*

"MIME Types" bölümüne girdikten sonra hemen "New" düğmesine tıklayarak
yeni bir "MIME Type" eklemek üzere bir önceki paragraftaki ayarları
buraya aynen yazıyoruz ve gördüğümüz tüm "OK" düğmelerine basarak IIS
Manager arayüzüne geri dönüyoruz.

![Yeni bir MIME Type
ekliyoruz.](media/Silverlight_uygulamalari_ve_IIS_MIME_Type_ayari/12032008_1.jpg)\
*Yeni bir MIME Type ekliyoruz.*

Artık gerekli uzantılar tanımlandığı için herhangi bir sorun
yaşamayacağız.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-3-12 tarihinde yayinlanmistir.*
