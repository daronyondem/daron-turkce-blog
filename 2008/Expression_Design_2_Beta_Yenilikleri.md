---
FallbackID: 1997
Title: "Expression Design 2 Beta Yenilikleri"
date: "2008-3-21"
EntryID: Expression_Design_2_Beta_Yenilikleri
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Design
old.EntryID: eb52af92-3369-4e26-a519-61fc18518097
---
Expression Studio ürün ailesinin ikinci sürümüne adım adım yaklaştığımız
bu günlerde fırsatını buldukça Expression Studio 2 ile ilgili de gelen
yenilikleri kapsayan yazılar yazmak istiyorum. Bu çerçevede ilk olarak
**Expression Design 2** ile başlamaya karar verdim. Expression Design
2'nin şu anda Beta sürümünü
[www.microsoft.com/expression](http://www.microsoft.com/expression)
adresinden bilgisayarınıza indirebiliyorsunuz.

**Slice, Slice, Slice**

Bugün baktığımda belki de Adobe Photoshop tarafında en çok kullandığım
özelliklerden biri de **Slice** işlemleriydi diyebilirim. Buna rağmen
Expression Design içerisinde böyle bir özelliğin eksikliğini
hissetmemiştim. Herhalde Photoshop'un makinemde kurulu olmasından
kaynaklanıyor :) Her zaman olduğu gibi böyle bir eksik de hemen
kapatılmış ve Expression Design'a Slice özellikleri eklenmiş. Ve yine
her zaman olduğu gibi Microsoft kendine has özelliğini göstererek hiç
alışmadığımız ve benim muhteşem diyebileceğim yeni işlevsellikleri ile
**Slice** sistemini karşımıza çıkarıyor.

Expression Design 2 içerisinde her çizdiğiniz Slice'ı doğrudan seçerek
söz konusu Slice ile ilgili özellikleri tasarım esnasında
ayarlayabiliyorsunuz. Bu ayarlar içerisinde çok ilginç seçenekler var.
İsterseniz Slice'ların PNG, GIF, JPG gibi formatlarda kaydedilmesini
sağlayabileceğiniz gibi her bir Slice için ayrı ayrı
düzenleyebileceğiniz bu format ayarında PDF, PSD ile de karşılaşıyor
olmak çok hoş. Tabi ki bu formatların yanı sıra belki de en ilginci
Slice başına isterseniz herhangi bir Slice'ın WPF veya Silverlight XAML
olarak da çıktsını alabilmeniz.

![Slice'lara ait farklı ayarlardan bir
kısmı.](media/Expression_Design_2_Beta_Yenilikleri/21032008_1.jpg)\
*Slice'lara ait farklı ayarlardan bir kısmı.*

**Peki bunlar ne anlama geliyor?**

Aslında çok basit. Bugüne kadar herhangi bir web sitesinin tasarımını
vektörel bir çizim programı ile yaptığınızda bunu HTML'e çevirmek epey
dert oluyordu. Nitekim "Web Tasarımcı" dediğimiz iş profilinin
oluşmasının ana nedeni de budur zaten. Bu karmaşanın üzerine bir de eğer
web sitesinde animasyonlar kullanılacaksa işler daha da karışıyor.
Varsayalım ki tasarımı tamamlanmış bir web siteniz var ve sitenizin
sadece bir bölümünde animasyon uygulanması gerekecek. Bunun için
Silverlight öncesinde mecburen Flash kullanıyorduk ve sayfadaki Flash
ile geri kalan tasarım arasında bir bütünlük yaratabilmek adına ek uğraş
vermemiz gerekiyordu. Çünkü Flash içerisinde görsel tasarımı yaptığımız
program ile sitenin geri kalanını hazırladığımız programlar tamamen
birbirinden bağımsızdı. Oysa **Expression Design 2** bu sorunu çözüyor.
Expression Design 2 içerisinde tasarımını yaptığınız bir web sitesini
Slice'lara ayırırken istediğiniz Slice'ları görsel JPEG vs dosyaları
olarak bırakırken istediğiniz bir başka Slice'ı ise Silverlight olarak
ayarlayabilirsiniz. Bu şekilde Expression Design 2 içerisinde **File /
Export** menüsüne mini bir yolculuk yaptığınızda doğrudan bir HTML
sayfası çıktısı alabiliyorsunuz. İşte en büyük SÜPRSİZ geliyor :) Çıktı
aldığınız HTML dosyasına baktığınızda Silverlight olarak ayarldığınız
Slice'lara denk gelen bölgelerin Silverlight olarak sayfaya
yerleştirildiğini ve otomatik olarak XAML dosyalarının da bağlandığını
görüyorsunuz. Bu gerçekten MUHTEŞEM!

![File / Export menüsünden bir
kare.](media/Expression_Design_2_Beta_Yenilikleri/21032008_3.png)\
*File / Export menüsünden bir kare.*

Slicelar için seçtiğiniz farklı formatlara göre tabi ki farklı ayarlar
da ekrana geliyor. Bu ayarlardan tek tek bahsetmeyeceğiz. Fakat sistemin
süper olduğunu tekrar söylemek istiyorum. "Adamlar bu işi biliyor" desem
tam yeridir sanırım :)

**Slice'ları düzenlerken gelen mucizeler**

Attığım başlıklardan ne kadar heyecanlandığım sanırım belli oluyordur.
Expression Design 2 içerisinde üst üste Slice'lar yaratarak aynı Layer
mantığında olduğu gibi bu Slice'lar da düzenleyebiliyorsunuz. Hatta
düzenlediğiniz mantığa göre HTML çıktıları alıyorsunuz.

![Layer mantığında Slice'ları da
düzenleyebiliyoruz.](media/Expression_Design_2_Beta_Yenilikleri/21032008_2.png)\
*Layer mantığında Slice'ları da düzenleyebiliyoruz.*

Arka sırada bıraktığınız Slice'lar HTML dosyanız içerisinde de z-index
özelliği ile arkaplana gönderiliyor. Böylece Expression Design 2
içerisinde çalıştığınız bir dosyada oluşturduğunuz Slice'lar ile arkada
aynı görsel gözükürken onun belirli bir kısmını ön tarafta bir
Silverlight nesnesi olarak ayarlatabiliyorsunuz. Slice yaratırken
istediğiniz bir Layer'ı görünmez yaptığınızda söz konusu Slice
içerisinde o Layer'ın gözükmeyeceğini de ek bir özellik olarak
hatırlarsak aslında ciddi esnek bir yapıdan bahsediyoruz.

Daha sadece ikinci sürümüne doğru ilerleyen bir ürün olarak Expression
Design yıllardır kullandığımız diğer rakip ürünlere kıyasla çok hızlı
bir evrim geçiriyor. Slice olayına el atılmış ve bence muhteşem bir
sistem oluşturulmuş. Devamını heyecanla bekliyoruz Microsoft :)


