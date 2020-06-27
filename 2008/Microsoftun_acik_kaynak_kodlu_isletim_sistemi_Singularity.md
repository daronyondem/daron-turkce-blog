---
FallbackID: 2255
Title: "Microsoft'un açık kaynak kodlu işletim sistemi Singularity"
date: "2008-11-23"
EntryID: Microsoftun_acik_kaynak_kodlu_isletim_sistemi_Singularity
IsActive: True
Section: software
MinutesSpent: 0
Tags: 
old.EntryID: 0c43f4f8-0044-4e00-b639-6b4ce27975eb
---
# Microsoft'un açık kaynak kodlu işletim sistemi Singularity
"Açık kaynak kodlu uygulama" deyiminin genellikle ülkemiz kurumsal
dünyasında "beleş program" gibi anlaşılması hatasının yanında hiçbir
KOBİ'nin veya büyük kurumun (istisnalar kaideyi bozmaz) açık kaynak
kodlu yazılımları kendisine göre geliştirdiği veya açıp kodunu okuduğu
falan yok. Genelde açık kaynağın gerçek felsefesine uygun şekilde
kaynağın açık olmasını kaynağa katkı sağlamak ve geliştirmek amacıyla
kullananlar öğrenciler oluyor. Tabi yurt dışında durum böyle değil ama
ülkemizin ekonomik sebepleriyle durumu bu.

Açık kaynağın en büyük faydalarından biri de "*Ne, Nasıl Yapılmış?*"
sorularının cevabını en azından ilgilenenlerin rahatlıkla bulabiliyor
olması. Hani çocukken "radyoyu kırıp" içini karıştırırdık ya :) Hikaye
aslında aynı. Açık kaynağın akademide büyük bir öğretici ve deneysel
misyonu var.

İşte bu misyon çerçevesinde aslında yıllar önce duyurulmuş olan fakat
yine ilginç bir şekilde bizim ülkemizde bilinmeyen projelerden biri de
**[Singularity](http://research.microsoft.com/os/singularity/)** işletim
sistemi. Daha öncelerdeki yazılarımda da bahsetmiştim; büyük firmalar
bir noktadan sonra innovatif çalışmalar yapamıyorlar. Baktığınızda büyük
firmaların çoğunun ürünlerinin neredeyse hepsi satın almalarla artar. Bu
MS tarafında da IBM tarafında da, Adobe, Google tarafında da böyle. Bunu
engellemek için firmalar yine kendi çatılarında Ar-Ge laboratuarları
açarlar. **Microsoft Research** de bunlardan biri. Ticari ürün
geliştirme kaygısı olmadan çalışmalar yapabilen bu laboratuarlar aslında
ticari ürünlerin de farkında olmadan doğduğu yerdir :) Örneğin MS
tarafındaki [Photosynth](http://photosynth.net/). İlk başlarda sadece
bir LiveLabs projesiydi.

Konumuza dönelim :) Peki nedir Singularity? İlk olarak bahsettiğim gibi
yeni bir şey değildir :) C\# ile yazılmış bir işletim sistemi
çekirdeğidir! Tamam doğruyu söyleyeceğim :) En altta **Assembly** ve
**C** var. Üzerinde **Sing\#** ile yazılmış bir Runtime ve GC bulunuyor.
Donanım erişimi tamamen **C++** ile yazılmış fakat donanım sürücüleri
**Sing\#** ile hazırlanmış. Tüm kaynak kodlarını indirebilir, üzerinde
istediğinizi yapabilirsiniz. Akademik kullanıma açık, ticari kullanıma
kapalıdır. Singularity ile ilgili download paketlerini MS'in Open Source
portalı CodePlex üzerinde bulabilirsiniz.

<http://www.codeplex.com/singularity>

Deneysel bir işletim sistemi olarak Singularity'deki en ilginç
özelliklerden biri aynı .NET'te olduğu gibi işletim sistemi üzerindeki
her uygulamanın ayrı bir hafıza izolasyonu içerisinde çalışıyor olması.
Memory Management anlamında ilginç bir yaklaşım. Her uygulamanın kendi
GC'ı vs var :)

Açıkçası benim kodları indirip inceleyecek pek zamanım yok :) ama zamanı
olanlara kolay gelsin ;)

**Sing\# nedir?**

Konu uzun aslında :) Özünde C\# diyebiliriz. Hikaye çok eskilere
dayanıyor :) Microsoft Research ilk başta C\#'a alıp üzerine bazı
eklemeler yaparak Spec\#'ı yarattı. Sonrasında bunu bir OS yapmak için
kullanmak isteyen Research ekibi yine eklemeler yaparak bu sefer de
Sing\#'ı yarattı. C\# bilen biri olarak çok yabancılık çekmeyeceğini
söyleyebilirim.



*Bu yazi http://daron.yondem.com adresinde, 2008-11-23 tarihinde yayinlanmistir.*
