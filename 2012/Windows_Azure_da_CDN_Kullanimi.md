---
FallbackID: 2787
Title: "Windows Azure'da CDN Kullanımı"
date: "2012-9-11"
EntryID: Windows_Azure_da_CDN_Kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Azure CDN, Windows Azure
---
# Windows Azure'da CDN Kullanımı
**[Aşağıdaki makalenin yeni Azure portalına uygun
şekilde güncellenmiş halini
[burada](http://daron.yondem.com/software/post/Microsoft_Azure_CDN_Kullanimi)
bulabilirsiniz.]**

CDN (Content Delivery Network)'leri tüm dünyaya yayılmış bir static
içerik cacheleme servisi olarak düşünebilirsiniz. Uygulamanıza veya
blob'unuza gelecek trafiğin ciddi şekilde azalmasını, kaldırılabilecek
yükün artmasını ve farklı bölgelerde önbelleklemeler sayesinde genel
performasın da tabiri caiz ise :) tavan yapmasını sağlayabilirsiniz.

Azure web yönetim panelinden aktif hale getirebileceğimiz Azure CDN
servisini bir blob için aktifleştirdiğiniz anda söz konusu blob'daki tüm
public access'i olan içerik CDN edge caching'e tabi tutulacaktır :) Yani
blobdaki bir dosyayı değiştirdiğinizde CDN'deki cache'li halinin TTL'i
bitip expire edene kadar değişiklik dışarıya yansıyamayacaktır. Bu
durumun sorun yaratacağını düşündüğünüz senaryolarda CDN seçeneğini
tekrar değerlendirmeniz faydalı olabilir.

![Yeni bir CDN Endpoint
eklerken.](media/Windows_Azure_da_CDN_Kullanimi/cdn.png)
*Yeni bir CDN Endpoint eklerken.*

Azure web yönetim panelinde "Hosted Services" tabı altında "CDN"
seçeneğini bulabilirsiniz. Hemen ribbon'dan "New Endpoint" diyerek ilk
CDN Endpoint'imizi yaratma yollarında ilerleyebiliriz.

![Endpointin kaynağını
belirlerken.](media/Windows_Azure_da_CDN_Kullanimi/cdn2.png)
*Endpointin kaynağını belirlerken.*

Endpoint'imizi yaratırken kaynak olarak blob / storage account veya web
role verebiliyoruz. Seçtiğiniz kaynağa göre endpoint adresi doğrudan
gelecektir. Ekranın alt kısmındaki seçeneklere bakarsak, birincisi
HTTPS, eğer HTTPS içeriğin de önbelleğe alınmasını istiyorsanız bunu
işaretleyebilirsiniz. Özellikle web role ve HTTPS ikilisinde önbellek
ayarlarken dikkatli olmakta fayda var. Son seçenek ise "Query String"
seçeneği. Bu seçeneği eğer blob önüne CDN alıyorsanız işaretlemenize
gerek yok çünkü anlamsız olacaktır :) Web Role üzerinden verdiğiniz
içerikleri CDN'e alıyorsanız eğer ki QueryString'e göre ayrı ayrı
cacheleme yapılsın isterseniz bu seçeneği işaretlemeyi unutmayın.

Unutmadan, istersenis CDN'lere de "custom domain", yani kendi domaininiz
ekleyebilirsiniz ;)

Görüşmek üzere!



*Bu yazi http://daron.yondem.com adresinde, 2012-9-11 tarihinde yayinlanmistir.*
