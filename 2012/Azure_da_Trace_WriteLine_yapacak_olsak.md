---
FallbackID: 2818
Title: Azure'da Trace.WriteLine yapacak olsak?
PublishDate: 25/9/2012
EntryID: Azure_da_Trace_WriteLine_yapacak_olsak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Azure
---
Development süreçlerinizde her ne kadar Azure SDK ile beraber gelen
emülatörü kullanacak olsanız da maalesef bazıt testleri doğrudan Azure
üzerinde yapmak zorunda da kalabiliyoruz. Bu çok da anormal bir durum
değil :) Sonuç itibari ile Azure üzerinde bir "Staging" ortamı tutmak
için gerekli altyapı Azure'da var. Tabi aslına bakarsanız Staging
dışında bir de Development ortamı tutmak gerekiyor ama şimdilik çok da
oraları karıştırmayalım :) Peki nedir çözüm aradığımız sorun? Basit bir
"code instrumentation" çözümü arıyoruz ve bunun da azure'daki
development ortamımızda çalışmasını istiyoruz. Eminim ki çoğunuzun
aklına "Trace"'ler gelecektir. En basit şekli ile development
süreçlerinde kullandığımız ve epey de işimize yarayan şeylerden biri
Trace'ler Azure ortamına geçince ilginç bir problem olabiliyor.

Diyelim ki attık uygulamayı Azure ortamına, scaling'i de hallettik vs...
Trace verisini nereden, nasıl toplayacaksınız? Uygulama birden çok
sunucuda çalışıyor unutmayın. Bu sunucuların her an "ReImage"
olabileceğini ve aslında state'lerinin saklanmadığını da düşünürsek
bizim Trace bilgilerini kalıcı olarak ve ortak bir yerde saklayabiliyor
olmamız gerek. Aklınıza birşey geldi mi? Azure'da kalıcı veri saklamak
için ne kullanıyorduk? Storage Servisleri :)

### Trace Verilerini doğrudan Table Services'a alsak?

Bu fikri ilk duyduğunuzda hemen aklınıza "ya maliyeti?" sorusu gelebilir
:) Her Trace'de bir REST call ile veriyi merkezi bir yere atmak hem
performans açısından hem de maddi açıdan sıkıntı yaratabilir ama
unutmayın bunu Production için düşünmüyoruz aslında. Development
süreçlerimizde kullanmak için düşünüyoruz. Aslına bakarsanız Prod için
de kullanabilirsiniz :) ama en azından bu makalede bakacağımız kısmın
üzerine bir "instance seviyesinde" cache tutup önce Trace'leri oraya
dumb etseniz ve periyodik aralıklarla Table Services'a atsanız daha iyi
olur. Nitekim bu işi yapan Azure Diagnostics servisleri de var aslında
ama tüm bunlara bulaştığınızda zaten yavaş yavaş Production kalitesinde
bir çözüme doğru ilerlemiş oluyorsunuz. Bizim istediğimiz ise basit,
anlık, herhangi bir gecikme olmadan Development ortamımızda Trace'leri
görmek! O kadar! :)

### O zaman başlayalım... Önce Table Services'a erişimimizi düzenleyelim.

Table Services konusunu daha önce detayları ile toplam üç yazıda
işlemiştik.
Yazılara[buradan](http://daron.yondem.com/tr/post/Azure_Storage_Table_Services)
ulaşabilirsiniz. Çok detaylarına girmeden hızlıca Trace nesnemizi bir
yaratalım.

**[C\#]**

<span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">TraceObject</span> : <span
style="color:#2b91af;">TableServiceEntity</span>\
{\
    <span style="color:blue;">public</span> <span
style="color:blue;">string</span> Message { <span
style="color:blue;">get</span>; <span style="color:blue;">set</span>; }\
}

Trace nesnemiz görüldüğü gibi epey basit :) Sadece Trace'de verilen tek
bir metni kaydedeceğiz. Siz isterseniz ileriki adımları da biraz daha
özelleştirecek ek verilerin kaydedilmesini de sağlayabilirsiniz.

**[C\#]**

<span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">TraceContext</span> : <span
style="color:#2b91af;">TableServiceContext</span>\
{\
    <span style="color:blue;">private</span> <span
style="color:blue;">static</span> <span
style="color:#2b91af;">CloudStorageAccount</span> storageAccount =\
      <span
style="color:#2b91af;">CloudStorageAccount</span>.FromConfigurationSetting(Setup.ConfigurationSettingKey);\
\
    <span style="color:blue;">public</span> TraceContext()\
        : <span
style="color:blue;">base</span>(storageAccount.TableEndpoint.AbsoluteUri,\
            storageAccount.Credentials)\
    {\
    }\
\
    <span style="color:blue;">public</span> <span
style="color:#2b91af;">DataServiceQuery</span>\<<span
style="color:#2b91af;">TraceObject</span>\> Traces\
    {\
        <span style="color:blue;">get</span>\
        {\
            <span style="color:blue;">return</span> CreateQuery\<<span
style="color:#2b91af;">TraceObject</span>\>(<span
style="color:#a31515;">"Traces"</span>);\
        }\
    }\
}

Yukarıda Table Services'dan kullanacağımız "**Traces**" adındaki tabloya
erişim için gerekli TableContext'imizi yaratmış durumdayız. Böylece
artık işin Table Services tarafı tamamlandı gibi. Tabi söz konusu Traces
tablosunu yaratmayı da unutmayın :)

Bir sonraki adımda sıra geliyor özel bir Trace Listener yaratmaya.

**[C\#]**

<span style="color:blue;">public</span> <span
style="color:blue;">class</span> <span
style="color:#2b91af;">CustomTraceListener</span> : System.Diagnostics.<span
style="color:#2b91af;">TraceListener</span>\
{\
    <span style="color:blue;">public</span> <span
style="color:blue;">override</span> <span
style="color:blue;">void</span> Write(<span
style="color:blue;">string</span> message)\
    {\
        WriteLine(message);\
    }\
\
    <span style="color:blue;">public</span> <span
style="color:blue;">override</span> <span
style="color:blue;">void</span> WriteLine(<span
style="color:blue;">string</span> message)\
    {\
        <span style="color:blue;">var</span> traceContext = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">TraceContext</span>();\
        <span style="color:blue;">var</span> newTrace = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">TraceObject</span>\
        {\
            PartitionKey = <span
style="color:#2b91af;">DateTime</span>.Now.Year.ToString(),\
            RowKey = <span
style="color:#2b91af;">DateTime</span>.Now.ToOADate().ToString(),\
            Message = message\
        };\
        traceContext.AddObject(<span
style="color:#a31515;">"Traces"</span>, newTrace);\
        traceContext.SaveChanges();\
    }\
}

Yarattığımız bu CustomTraceListener'ın içinde **Write** ve**WriteLine**
metodlarını implemente etmemiz gerek. Siz tercihinizi göre tabi ki
farklı hareketler de yapabilirsiniz :) Bu örnekte **WriteLine**
içerisinde yeni bir **TraceObject** yaratarak Table Services'daki
tablomuza **Insert** işlemini gerçekleştiriyoruz. Böylece
her**Trace.WriteLine** çağrıldığında mesaj doğrudan Table Services'a
aktarılacak.

**[C\#]**

<span
style="color:#2b91af;">CustomTraceListener</span> TListener = <span
style="color:blue;">new</span> <span
style="color:#2b91af;">CustomTraceListener</span>();\
 Trace.Listeners.Add(TListener);

Son olarak yapmanız gereken uygulamanız başladığında bizim
**CustomTraceListener'dan** bir tane yaratıp uygulamanın **Listener**
listesine eklemek. Bunun ister WorkerRole'ün OnStart'ında ister web
sitenizin App\_Start'ında yapabilirsiniz. Artık tüm Trace'ler doğrudan
Table Services'a gidecek.

Unutmadan, diğer detayları daha önceki yazılarda inceledik diye
bahsetmedim ama :) StorageClient için ConfigurationPublisher'ı set
etmeyi unutmayın. Yukarıdaki kodlarda "Setup.ConfigurationSettingKey"
diye geçen kısıma da Storage Account connection string'ini vermeniz
gerekecek.[Table Services ve Storage Account konusunda blogda birçok
yazı var](http://daron.yondem.com/tr/tag/Azure_Storage_Services). Göz
atmanızda fayda var.

Kolay gelsin.


