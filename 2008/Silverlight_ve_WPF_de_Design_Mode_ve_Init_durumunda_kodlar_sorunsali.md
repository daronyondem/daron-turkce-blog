---
FallbackID: 2292
Title: Silverlight ve WPF'de Design Mode ve Init durumunda kodlar sorunsalı.
PublishDate: 31/12/2008
EntryID: Silverlight_ve_WPF_de_Design_Mode_ve_Init_durumunda_kodlar_sorunsali
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, Silverlight 2.0, Visual Studio 2008, WPF
old.EntryID: 51e42b27-c0db-41c1-aead-47490f9eb177
---
WPF veya Silverlight projelerinde **Inıt** durumu ile **PageLoad** veya
**WindowLoad** event'ları arasındaki fark bazen ilk bakışta yokmuş gibi
varsayılarak kodların doğrudan **Init** kısmına yazıldığını çok gördüm.
Bazen bu durum sorun çıkarmasa da aslında tam olarak **Init** durumu
bitmediği için bazı kaynaklara veya kontrollere ulaşmama hatta bu ulaşıp
/ ulaşmama durumunun da belli olmaması :) gibi garip hatalar ile
karşılaşabilirsiniz. O nedenle benim genel tavsiyem sürekli **Loaded**
event'larının kullanılması ve **Init'in** sadece ek event-listener
tanımlamalarının yapılacağı bir konum olarak saklanması.

Bu çerçevede bir diğer sorun ise **Init** durumuna yazdığınız kodların
aslında hem Blend hem de Visual Studio tarafından Design modundayken
çalıştırılıyor olması. Eğer bu bilgiye sahip değilseniz maalesef ki
**Init** durumunda yaptığınız ağır bir işlemin bir anda Visual Studio ve
Blend'in arayüzüne de binmesi ve Page.XAML gibi bir dosyayı açtığınız
anda yüksek işlemci kullanımları ile karşılaşmanız olası. En basit çözüm
bu kodları Init'den çıkarmak ve Loaded'a yerleştirmek olabilir fakat ya
Init'i kesinlikle kullanmanız gerekiyorsa?

**[C\#]**

            <span style="color: blue;">if</span>
(System.ComponentModel.DesignerProperties.GetIsInDesignMode(<span
style="color: blue;">this</span>) == <span
style="color: blue;">false</span>)

            {

 

            }

İşte yukarıdaki gibi bir kontrol ile söz konusu Init kodunun içinde
uygulamanın DesignMode'da olup olmadığını kontrol edebilirsiniz. Böylece
eğer sayfa Visual Studio veya Blend ile Design modunda açılmış ise bu IF
içerisinde kodlar çalıştırılmayacak. Oysa programı F5 ile compile edip
çalıştırdığınızda ise herhangi bir sorun ile karşılaşamaycaksınız.

Hepinize kolay gelsin.


