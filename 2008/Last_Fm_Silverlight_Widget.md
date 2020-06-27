# Last.Fm Silverlight Widget!
Yaklaşık 2 saat kadar önce
[last.fm](http://www.lastfm.com.tr/user/daronyondem/) üyesi oldum :)
Siteyi çok duymuştum ama ilgilenecek fırsat olmamıştı. Gerçekten çok
başarılı bir altyapısı var. Siteye üye olduktan sonra bilgisayarınıza
ufak bir program yüklüyorsunuz ve ister Windows Media Player ile ister
Winamp ile çaldığınız tüm şarkılar otomatik olarak sitede yerini alıyor.
Tabi bu veri yığınından yola çıkarak site bir sürü ek işlevsellik
sunuyor. Sizinle aynı şarkıları dinleyenlerden tutun en çok dinlediğiniz
şarkıların listelerini otomatik olarak arkadaşlarınızla paylaşmaya kadar
bir sürü seçenek mevcut.

Tabi siteye üye olunca hemen dinlediğim şarkıları blog okuyucularım ile
de paylaşmaya karar verdim ve daha önce sizlerle kaynak kodunu
paylaştığım [Twitter Silverlight
Widget](http://daron.yondem.com/tr/post/02884a23-9355-4a2b-885a-4577f2003d08)'a
el atarak Last.Fm uyumlu hale getirdim. Yeni uygulamayı hazırlarkenki en
büyük sorun Last.Fm'in Cross-Domain'e açık bir JSON verisi sağlamaması
olsu. Bu nedenle [ASP.NET ile sunucu taraflı
proxy](http://daron.yondem.com/tr/post/40f51ce0-3ca2-4f47-815a-5071386cd640)
hazırlamam gerekti. Proxy Last.FM üzerinden XML veriyi alarak
Silverlight tarafına JSON formatında aktarıyor. Local proxy kullanıldığı
için Widget'ın veriyi yüklemesi normale kıyasla daha uzun sürüyor, o
nedenle bir de "Loading" animasyonu ekledim.

Artık dinlediğim şarkıları blogun yan barından izleyebilirsiniz :) Tabi
daha da önemlisi hazırladığım bu uygulamayı kaynak kodları ile aşağıdaki
linkten indirebilirsiniz ;)

[Last.FM Silverlight Widget Kaynak Kodları - 13062008\_1.rar (9,29
KB)](media/Last_Fm_Silverlight_Widget/13062008_1.rar)

Hepinize iyi eğlenceler ;)



*Bu yazi http://daron.yondem.com adresinde, 2008-6-14 tarihinde yayinlanmistir.*
