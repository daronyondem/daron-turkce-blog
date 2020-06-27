---
FallbackID: 1723
Title: "Web adresi yanında ikon gösterimi - URL ICON"
date: "2007-4-8"
EntryID: Web_adresi_yaninda_ikon_gosterimi_-_URL_ICON
IsActive: True
Section: software
MinutesSpent: 0
Tags: HTML
old.EntryID: e4fb9d4e-2d54-408d-9ec2-59a1e491fc75
---
# Web adresi yanında ikon gösterimi - URL ICON
Web'de gezerken girdiğiniz her siteye göre farklı ikonların adres
çubuğunda gösterildiğini farkına varmışsınızdır. Söz konusu adres
çubuğunda gösterilen ikonlar aynı şekilde "Favorites" bölümlerine
eklediğinizde de gözükecektir. Esas mesele biz bu ikonları web sitemiz
nasıl koyarız sorusunda.

![](media/Web_adresi_yaninda_ikon_gosterimi_-_URL_ICON/07042007_1.png)

İlk olarak yapmamız gereken doğru ikon dosyasını bulmak veya hazırlamak.
Doğru ikon dosyasının **16x16 piksel 8bit 256 renk** olması gerekiyor.
Eğer elinizde bu özelliklerde bir ikon yoksa kendi ikonunuzu da
yaratabilirsiniz. Yapmanız gereken ilk olarak ikon haline çevirmek
istediğiniz resmi bir **JPEG** dosyası olarak kaydetmek ve
<http://www.rw-designer.com/online_icon_maker.php> adresindeki aracı
kullanmak. **"Online Icon Maker"** adında araca elinizdeki **JPEG**
dosyasını göndererek uygun bir ikon dosyası yaratmasını
sağlayabiliyorsunuz. **"Download Icon"** linki ile siteden ikon
dosyanızı alabilirsiniz.

Artık ikon dosyamız hazır olduğuna göre onu sitemizin ana klasörüne
(root) yükleyebiliriz. Dosyamızın adının **favicon.ico** şeklinde
düzenlenmiş olması şart. Yükleme işlemini de tamamladıktan sonra son
olarak aşağıdaki gibi kodumuzu **HTML** sayfanızın **Header** bölümüne
eklemelisiniz.

```html
<head>
	<link rel="shortcut icon" href="favicon.ico" />
	<title>İkon Sayfam <\title>
<\head>
```

Kolay gelsin ;)



*Bu yazi http://daron.yondem.com adresinde, 2007-4-8 tarihinde yayinlanmistir.*
