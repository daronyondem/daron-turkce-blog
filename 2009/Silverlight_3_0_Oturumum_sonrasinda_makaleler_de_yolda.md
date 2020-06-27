---
FallbackID: 2346
Title: "Silverlight 3.0 Oturumum sonrasında makaleler de yolda..."
date: "2009-4-12"
EntryID: Silverlight_3_0_Oturumum_sonrasinda_makaleler_de_yolda
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 3.0
old.EntryID: 307389eb-4a3b-4da4-be93-37896b29f2e2
---
# Silverlight 3.0 Oturumum sonrasında makaleler de yolda...
Bugün INETA NEXT'in ilk gününde Silverlight 3.0 oturumunu
gerçekleştirdim. Benim de ilk Silverlight 3.0 oturumumda. Zamanlama
açısından içeriği tam oturtsam da akıcılık açısından istediğimi
yakaladım diyemem. Neyse zamanla hallolur o konu da :) SL 3.0 daha çok
yeni.

Artık önümüzdeki günlerde Silverlight 3.0 ile ilgili makalelerimi
yazmaya başlayacağıma dair müjdeyi sizlerle paylaşırken bu yazımda hafif
bir giriş yaparak sonraki günlerde üzerinde çalışacağımız konularla
ilgili gerekli altyapıyı bilgisayarınızda nasıl oluşturabileceğinize
değineceğim.

Şu an yayında bulunan Silverlight 3.0 sürümünün Beta'sıdır, yani bir
anlamda test sürümüdür diyebiliriz. Hali hazırda bu sürüm ile
hazırlanmış Silverlight uygulamalarını çalıştırabilmeniz için de tabi ki
Silverlight 3.0 RunTime'ın bilgisayarınızda kurulu olması gerekiyor.
İşte tam da bu noktada aslında Microsoft bize ufak ip uçları veriyor. Şu
anda Silverlight 3.0'ın RunTime'ını haricen indirebileceğiniz herhangi
bir adres yok. Runtime sadece Silverlight 3.0'ın SDK'sını da içeren
yazılımcılar için hazırlanmış yükleme paketi içerisinde bulunuyor.
Silverlight 2.0 zamanlarında da bildiğimiz üzere bu şekilde yazılımcılar
için hazırlanmış paketlerin içindeki RunTime'lar da aynı şekilde
"Developer Runtime" olarak karşımıza çıkıyordu ve yazılımcılar için
debugging vs gibi konularda yardımcı olacak altyapılar sunuyordu. Sözün
özü şudur ki; Silverlight 3.0'ın şu anda sadece Developer Runtime'ı var!
Yani bu uygulamalarını dağıtmak mümkün değil. Zaten lisans olarak da şu
anda Go-Live lisansı yok, hazırladığınız uygulamaları müşterilerinize
açmanız, satmanız vs resmi olarak mümkün değil.

Tüm bu ticari detayları atladıktan sonra gelelim bir de teknik
detaylara. Silverlight 3.0 Beta olarak geldiğine göre tüm beta
yazılımlarda olduğu üzere Silverlight 3.0'ı da normal kullandığınız
makineye yüklememenize fayda var. Beta yazılımların yüklenmesinden
sisteminize gelebilecek olası zararlarda Microsoft dahil kimse
sorumluluk kabul etmez. Diğer yandan eğer ki hali hazırda Silverlight
2.0 uygulamaları geliştiriyorsanız zaten Silverlight 3.0 yüklemelerini
de kesinlikle yapmamaız gerekiyor. Beta aşamasında Silverlight 3.0 ile
2.0 arasında bir "targeting" sistemi yok. Bilgisayarınız SL 3.0
yüklerseniz artık Visual Studio içerisinde 2.0 projeleri yaratamazsınız.
Bu konuda farklı taktikler kullanmak mümkün olsa da benim kişisel
tavsiyem SL 3.0'a harici bir işletim sisteminde denemenizdir.

**Neler yüklemek lazım?**

Silverlight 2.0 zamanlarından da alışık olduğunuz üzere yine Visual
Studio 2008 SP1 üzerine kurulması gereken bir Tools paketimiz var. Bu
paket içerisinde Silverlight 3.0 için gerekli proje şablonları, Visual
Studio intellisense desteği, SDK ve Developer Runtime bulunuyor. Söz
konusu tüm yüklemeleri aşağıdaki adresten bulabilirsiniz.

<http://silverlight.net/getstarted/silverlight3/default.aspx>

[Silverlight 3 Beta Tools for Visual
Studio](http://go.microsoft.com/fwlink/?LinkID=143571) yüklemesini
tamamladıktan sonra sıra geliyor [Expression Blend
3](http://www.microsoft.com/expression/blendpreview) ile ilgili
yüklemelere. Hemen Blend 3'ün şu an yayında olan MIX Preview sürümünü de
indirerek bilgisayarınıza yükleyin. Aksi halde SL 3.0 projelerini eski
Blend 2.0 ile açarsanız maalesef SL 3.0'ın özelliklerine dair destek
bulamazsınız.

Tüm bunların haricinde yapabileceğiniz birkaç minik ayrı yükleme daha
var fakat onlar farklı senaryolara özel olduğu için bu yazıda
bahsetmeyeceğiz. İleriki yazılarda gerektikçe o yüklemeleri de ele alır
ve kullanımlar ile beraber inceleriz.

Hadi bakalı, hazır mısınız? :)



*Bu yazi http://daron.yondem.com adresinde, 2009-4-12 tarihinde yayinlanmistir.*
