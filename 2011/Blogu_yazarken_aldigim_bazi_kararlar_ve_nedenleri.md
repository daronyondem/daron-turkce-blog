# Blogu yazarken aldığım bazı kararlar ve nedenleri...
Malum yeni blogu yazarken karşılaştığım bazı şeyleri ve bulduğum
çözümleri sizlerle paylaşacağımdan bahsetmiştim. Ondan önce bana gelen
bolca soruları ve karşılaştığım karar noktaları bir sizlerle paylaşmak
istiyorum.

Blogu ASP.NET 4.0 WebForms ile yazdım. Aslında bu konuda da birçok soru
geldi. "**Neden MVC kullanmadın hocam?**" diye. Cevabım şöyle :)

-   Unit test yazma gibi bir niyetin yoktu blogun projesine başlarken
-   Separation yüzünden daha fazla zaman kaybedeceğimi düşündüm. Kısa
    bir sürede ürünü ortaya çıkarmak istiyordum.
-   Kodun %90'ına önümüzdeki 5 yılda tekrar dokunmayacağımdan eminim.

Peki bunun dışında MVC'nin getirdiği en büyük iki avantajla ilgili ne
düşünüyorum?

-   **Temiz HTML :** Yeteri kadar temizlik bana yetiyor :) Şu an
    temizlikten memnunum. Daha temiz kod için MVC'ye geçip yavaşlamak
    istemedim.
-   **URL ReWrite :** ASP.NET 4.0'dakini kullandım.

Blogu ASP.NET ile yazarken neredeyse hiçbir yerde PostBack kullanmadım
çünkü gereksizdi. Tüm sayfaların **ViewState'leri** **Disabled**
durumdadır. Postback kullandığım tek yer "Yorum Gönderme" yeridir ki
orayı da basitçe bir UpdatePanel içine alıp ajaxladım gitti :) **Neden
"PageMethods" kullanmadım?** O kadar performansa ihtiyacım yok. Temzi
çalışıyor UpdatePanel'de. Zaten ufacık yer :)

**Arama kısmı nasıl bu kadar hızlı?** Aslında orası tam fantezi oldu :)
Birincisi makale içi aramanın gerekli olduğunu düşünmediğim için Tag ve
makale başlıkları içinde aramanın yeterli olacağına karar verdim. Durum
bu olunca Tag ve Makale başlıklarının toplam boyutuna baktım 120 KB.
Eski bloğumun ana sayfasının 420 KB olduğunu ve kimsenin sesli
küfretmediğini düşünürsek :) 120KB bir sayfanın response'u için uygun
bir boyut. Yani sayfa açılırken ben Title ve Tag bilgilerini sayfanın
içine döksem sonra JavaScript bunları alıp arasa? güzel olmaz mı diye
düşündüm. Bu fikirle yola çıkıp söz konusu datayı JSON'layıp sayfadaki
JavaScript'in içine enjecte ettim. Birkaç satır da arama kodu falan
yazınca olay bitti. Son olarak bir de sayfanın output'unu GZIP'leyince
sayfa boyutu 30KB'ın altına düştü ki efsane :) Bir de sayfayı günlük
output cache'e alınca.. oh keyfinden yenmiyor.

**Yönetim paneli?** Sadece benim işime yarayacak kadarını yazdım. Günlük
işlerimi çözecek şekilde halettim gitti. Orada da biraz fantezi yaptım
ve SL ile yazdım. Desktop uygulaması olarak da aldım desktopa bitti
gitti. Makale ekleme, preview falan herşey var. FileUpload işlemini
servis üzerinde "resume" desteği ile felan yapınca özellikle büyük
fileuploadları kolaylaştı. Eski blogumda saçmalıyordu, elle atıyordum
dosyaları. SL ile FileUpload konusunda[video çoktan
burada](http://daron.yondem.com/tr/post/b4d1540e-f1ca-408f-a871-43aeef92a760)
:)

Twitter, Facebook, RSS vs entegrasyonu hep XML ile alakalı olduğu ve ben
VB kullandığım için[çıtır çerez gibi
halloldular](http://daron.yondem.com/tr/post/dce935ca-763c-4233-a4e1-6fdd3302ba4d).
Hadi burada ufak bir ipucu paylaşiyim :) Twitter vs gibi yerlerden data
çektiğim için bunları malum response yaratırken yani bir kullanıcı ile
yapmam uygun olmazdı. Aksi halde dışarıya giden isteğim uzun sürerse
siteye gelen kişiyi de bekletmiş olurdum. Bunun için async bir yol
gerekiyordu. Eski kafalı biri olarak hala ASP.NET'ten async thread
çalıştırmanın dertli olacağını düşündüm. (En azından 2.0 zamanları
öyleydi) Hiç zaman kaybetmemek adına şöyle birşey yaptım :) Response'a
Image output eden bir sayfa yarattım ve ana sayfaya o image'i ekledim :)
Image request edildiğini kendi cache kurallarımı da valide ettikten
sonra gerekiyorsa karşı tarafa istekleri yolluyorum. Böylece kaba bir
async call başlatmış oluyorum :) Sorun çıkarma şansı = 0! :)

Kabaca şimdilik ortaya atacaklarım bunlar. Aklınıza gelenler olursa
yorumlarınızı beklerim :)



*Bu yazi http://daron.yondem.com adresinde, 2011-9-2 tarihinde yayinlanmistir.*
