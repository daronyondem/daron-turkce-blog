---
FallbackID: 2093
Title: "Soru Sorma Merkezi Açıldı!"
date: "2008-6-15"
EntryID: Soru_Sorma_Merkezi_Acildi
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
old.EntryID: c59d09ed-29b6-4eff-a1e9-cfb29deadb87
---
# Soru Sorma Merkezi Açıldı!
Son birkaç haftadır üzerinde çalıştığım minik bir projem vardı.
twitter'dan beni takip edenler "sinsi projem"i hatırlayacaklardır :)

Bundan sanırım yaklaşık bir ay önce sevgili [İbrahim
Demir](http://www.ibrahimdemir.org/) ile kafa kafaya verip IT sektörünü
kurtardığımız buluşmalarımızdan birinde ben ona bazı dertlerimi açınca
ortaya bu proje çıktı. Peki nedir bu proje?

Hepiniz sağ olun bana takıldığınız noktalarda mailler atarak sorular
soruyorsunuz. Elimden geldiğince hepsine yardımcı olmaya çalışıyorum.
Bazılarına vereceğim cevapları bekletip "*Bu konu ile ilgili en iyisi
bir makale yazmak*" diyerek belki de bir hafta sonra size makalenin
linkini gönderiyorum. Aslında tek amacım sizin sorunuza verdiğim
cevaptan aynı soruyu sorması olası başkalarının da faydalanabilmesini
sağlamak. Fakat bazı sorular oluyor ki cevapları "makale " haline
getirilebilecek şeyler değil. Peki ne yapalım? O zaman bir "**Soru Sorma
Merkezi**" yaratalım. Herkes sorularını buradan sorsun, cevaplar burada
bulunsun. Hatta benim dışımdaki arkadaşlar da cevap verebilsin. Amaç;
bir arşiv oluşsun.

<http://daron.yondem.com/tr/sorusor/>

İşte bu amaçla birkaç haftadır uğraştığım sistemi sonunda bitirdim.
ASP.NET 3.5 ve
[XLINQ](http://daron.yondem.com/tr/post/3dc9614e-471c-4c41-ad54-d7c2276b15a7)
kullanarak hazırladığım projenin açık kaynak kodlarını da sizlerle
paylaşacağım. Sistem arkaplanda tamamen XML kullanıyor, ayrıca özellikle
arama motorlarında optimizasyon amacıyla
[URLReWriting](http://daron.yondem.com/tr/post/7d7a31e7-5427-4186-bf42-7797634fb037)
de kullandım. Sistemden JSON veya RSS çıktısı da alınabiliyor. Projenin
kodlarını incelemenizi tavsiye ederim, olabildiğince açıklama satırları
ile anlaşılır hale getirmeye çalıştım. Tabi ki herşey muhteşem değil :)
sonuçta bazı noktalarda projenin hızlı bitmesi için tembellikler de
yaptım, onlar da kod içerisindeki açıklamalarda kısmen yazılı :)
Özellikle DataLayer'da XLINQ kullanımını ve **birsoru.aspx**
içerisindeki PageMethods'ların JavaScript ile kullanımı ile ortaya çıkan
yüksek performanslı editlenebilir grid yapısını incelemenizi tavsiye
ederim.

[Soru Sorma Merkezi Kaynak Kodları - 14062008\_1.rar (169,74
KB)](media/Soru_Sorma_Merkezi_Acildi/14062008_1.rar)



*Bu yazi http://daron.yondem.com adresinde, 2008-6-15 tarihinde yayinlanmistir.*
