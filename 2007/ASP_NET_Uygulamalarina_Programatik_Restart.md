---
FallbackID: 1755
Title: ASP.NET Uygulamalarına Programatik Restart
PublishDate: 8/15/2007
EntryID: ASP_NET_Uygulamalarina_Programatik_Restart
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET
old.EntryID: 0d758743-6f8e-421f-a10c-bcbfe3e95e62
---
Web uygulamaları adı üzerinde birer "uygulama" yani "application" dır.
**IIS** üzerinde her bir web uygulaması için bir "**Application**"
tanımlanır ve ancak bu şekilde uygulamalar tek başlarına çalışabilirler.
Bazı durumlarda bu uygulamaları resetlemek gerekebilir. Örneğin sitenin
ziyaretçilerinin geride bıraktıkları **Session** değişkenlerinin
**TimeOut** süreleri beklenmeden yokedilmesi için veya **.NET Garbage
Collector**'ın bazı hatalar sonucu toplamalayı unuttuğu bellekteki
objeleri yok etmek için hızlı bir restart en uygun çözümdür.

Bir web uygulamasına reset atmanın en bilinen yolu **Web.Config**
dosyasında ufak bir değişiklik yapmak veya adını değiştirip tekrar geri
almaktır. ASP.NET, söz konusu uygulama ile hayati ilişkisi olan
dosyaları takip eder ve eğer herhangi bir değişiklik yapılmış ise
uygulamayı yani **application'ı** baştan başlatır. Peki ya biz bunu
programatik olarak yapmak istersek? Yani sayfamızda bir düğme bulunsun
ve **Web.Config** vs ile uğraşmadan, FTP'den giriş yapmadan uygulamaya
bu düğme aracılığı ile istediğimiz zaman restart atabilelim.

> System.Web.HttpRuntime.UnloadAppDomain()

İşte sihirli metod yukarıda duruyor. Bu metodu klasik bir ASP.NET
düğmesine koyduğunuzda uygulamanız düğmeye basıldığında restart
atacaktır. Aslında komutun yaptığı şey var olan uygulamayı hafızadan
kaldırmak. Peki nasıl tekrar yüklenecek? Unutmayın ki tüm ASP.NET web
siteleri ve uygulamaları söz konusu web sitesinin herhangi bir sayfasına
ilk gelen istekte hafızaya yüklenir. Yani uygulamamızın tekrar hafızaya
yüklenmesi için tek yapmamız gereken herhangi bir sayfaya çağrı atmak.
Aslında bu şartı da bir ASP.NET düğmesi kullanarak yerine getirmiş
oluyoruz. Çünkü düğmeye tıklandığında uygulama hafızadan silinecek fakat
sonrasında sayfa tekrar yüklenmek zorunda. Düğmeye bastıktan ve uygulama
hafızadan silindikten sonra sayfa tekrar yüklenirken uygulamamız da
baştan başlayarak hafızaya yüklenecek. Böylece uygulamamıza restart
atmış oluyoruz.

Bu metodun tek güzel yanı işimizi programatik olarak yapabiliyor olmamız
değil. Bu metod kullanılarak yapılan restart işlemleri **Global.asax**
içerisinde yer alan **application end** gibi olayları da çalıştırıyor.
Böylece tüm restart işlemlerini loglamanız mümkün. Kabaca değerlendirmek
gerekirse en .NET dostu restart metodunu yazmış bulunuyoruz.


