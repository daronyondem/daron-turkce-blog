---
FallbackID: 2893
Title: Windows Phone'da Background Task'lardan PeriodicTask
PublishDate: 12/3/2014
EntryID: Windows_Phone_Background_Task_PeriodicTask
IsActive: True
Section: software
MinutesSpent: 0
Tags: Windows Phone, Windows Phone 7.5, Windows Phone 8
---
Windows Phone'da background'da işlem yaptırmak istediğiniz
seçeneklerinizden biri "PeriodicTask"ler. PeriodicTask'ler
uygulamanızdan bağımsız olarak arka planda belirli aralıklar çalışarak
işlem yapabilen parçacıklar. 1GB ve üstü belleğe sahip Windows
Phone'larda **20MB bellek** kullanabilen, daha düşük cihazlarda ise
**11MB bellek** limiti ile yaşamak zorunda olan PeriodicTask'lerin
implementasyonuna bakmadan önce istersen ne şartlar altında ve nasıl
çalıştıklarına göz atalım. Unutmadan, eğer bellek limitlerini geçerseniz
taskiniz doğrudan sonlandırılır.

### Zamanlama herşeydir...

PeriodicTask'ler uygulamanız tarafından ilk başlatıldığı ve "schedule"
edildiği andan itibaren **iki hafta süre ile çalışırlar**. İki hafta
içerisinde eğer uygulamanız kullanıcı tarafından hiç açılmazsa artık söz
konusu Task de işletim sistemi tarafından çalıştırılmaz. Tabi bilmemiz
gereken bazı istisnai durumlar var. Bunlardan ilki uygulamanız Start
ekranına pinlenmişse ortaya çıkıyor.  Uygulamanız tarafından Tile'a her
update geçildiğinde Task'in da iki haftalık timeout süresi resetleniyor.
İkinci istisnai durum ise uygulamanızın "lock screen"de notification
göstermek üzere ayarlanmış olması. Yine her notification update ile iki
haftalık task timeout süresi resetlenmiş oluyor.

Detaylar bu kadar ile bitmiyor. Eğer PeriodicTask'iniz **iki defa üst
üste hata** alarak sonlanırsa işletim sistemi tarafından doğrudan pasif
hale getiriliyor ve tekrar çalıştırılmıyor. Task'in tekrar çalışması
için ana uygulama tarafından tekrar schedule edilmesi şart.

Bir PeriodicTask normal şartlarda ortalam **30 dakikada bir
çalıştırılır**.  Bu 30 dakikalık süre bazen 20 veya 40 dakika da
olabilir. İşletim sistemi genel olarak farklı uygulamalardan gelen tüm
PeriodicTask'leri aynı anda çalıştırmaya çalışır. Çalışma anlarının
senronize edilebilmesi için 30 dakikalık aralıkları işletim sistemi
tarafından modifiye edilebilir. Bu konuda sizin pek yapabileceğiniz bir
şey yok. Bir PeriodicTask çalıştığında işini bitirmesi için **25
saniyesi** var.

### İlk PeriodicTask'imiz.

Uygulamanıza bir PeriodicTask eklemek için ilk olarak Windows Phone
projenizin bulunduğu Solution'a yeni bir "**Windows Phone Scheduled Task
Agent**" projesi eklemeniz gerekiyor. Bunun için normalde yaptığınız
gibi "Solution Explorer"'a sağ tıklayıp "Add New Project" diyip gelen
listeden proje şablonunu seçenebilirsiniz. Artık Solution içerisinde iki
proje var. Bunlardan ilki Windows Phone projeniz ikincisi ise
PeriodicTask'in bulunduğu **ScheduledTaskAgent** projesi. Bir sonraki
adımda bu iki projeyi birbiri ile ilişkilendirmek, yani yarattığımız
yeni Agent'ın bizim Windows Phone uygulaması tarafından kullanılacağını
ve yönetileceğini belirtmek için Windows Phone uygulamasının
referanslarına Agent projesini eklememiz gerekiyor. Hemen WP projesinin
References listesine sağ tıklayıp "Add Reference" diyerek "Solution /
Projects" içerisinden Agent projemizi seçiyoruz. Proje ortamını
ayarlamayı bitirdiğimize göre Agent projesinin içindeki
"ScheduledAgent.cs" dosyasına zıplayabiliriz. Bu dosya bizim
PeriodicTask için yazacağımız tüm kodları içerecek olan dosya.

**[C\#]**

```cs
protected override void OnInvoke(ScheduledTask task)
{
    Microsoft.Phone.Shell.ShellToast toast = new Microsoft.Phone.Shell.ShellToast();
    toast.Title = "Background Agent Sample";
    toast.Content = "Herhangi bir mesaj içeriği!";
    toast.Show();
    // Debug modundaysak dakikada bir çalıştır
            #if DEBUG_AGENT
              ScheduledActionService.LaunchForTest(task.Name, TimeSpan.FromSeconds(60));
            #endif
    // Agent'ın işinin bittiğini işletim sistemine haber verelim.
    NotifyComplete();
}
```

Yukarıdaki kod bizim örnek Agent'ımızın kodu olacak. Burada basit bir
şekilde PeriodicTask'a ToastNotification göstertiyoruz. Siz tabi ki
gerçek uygulamalarda daha anlamlı işler yaptıracaksınız :) Önemli olan
bu kod içindeki üç noktayı yakalamak. Birincisi "**OnInvoke**" metodu.
İşletim sistemi Task'i her başlattığında bu metodu çalıştıracak. Yani
çalıştırmak istediğiniz her şeyi buraya yazmanız gerekiyor. İkinci
önemli nokta ise işiniz bittiğinde kesinlikle "**NotifyComplete**"'i
çağırmanı gerektiği. Bunu çağırmazsanız işletim sistemi taskin işini
bitirdiğini hiç bir zaman bilemeyecek. Son olarak satır arasında
yakalayabileceğiniz bir diğer detay da sadece Debug modu için araya
sıkıştırdığımız kod. Malum debugging modunda 30 dakika taski bekleyemek
istemezsiniz. Sadece Debug modunda çalışan kodumuzun çalışabilmesi için
dosyanın en üstünde <span
style="color:blue;">**\#define**</span>** DEBUG\_AGENT** tanımlamasını
yapmayı da unutmayın.

Sıra geldi hazırladığımız Agent'ı ana uygulamamızdan Schedule etmeye,
yani planlamaya.

**[C\#]**

```cs
protected override void OnNavigatedTo(NavigationEventArgs e)
{
    string TaskAdi = "DenemeTask";
    PeriodicTask periodicTask = ScheduledActionService.Find(TaskAdi) as PeriodicTask;
    //Agent varsa önce bir kaldıralım.
    if (periodicTask != null)
    {
        ScheduledActionService.Remove(TaskAdi);
    }
    //Yeni Task yaratıyoruz.
    periodicTask = new PeriodicTask(TaskAdi);
    //Description vermemiz şart.
    //Bu açıklama Windows Phone Settings sayfalarında gözükecek.
    periodicTask.Description = "Deneme amaçlı bir Task";
    ScheduledActionService.Add(periodicTask);
    // Debug moddaysak bir dakikadan çalıştıralım Task'i.
            #if(DEBUG_AGENT)
    ScheduledActionService.LaunchForTest(TaskAdi, TimeSpan.FromSeconds(60));
            #endif
    base.OnNavigatedTo(e);
}
```

Yukarıdaki kodu adım adım inceleyelim. Ben kodu doğrudan örnek
uygulamanın ilk açılına koydum. Siz kendinize göre ayarlayabilirsiniz.
Dönelim konumuza. Her Task kendi adı ile işletim sistemine
kaydettiriliyor. Eğer aynı isimde aynı uygulamadan başka bir Task var
ise bu sizin daha önce yarattığınız bir Task olsa da onu güncelleme
şansınız yok. Eski Task'i kaldırıp yenisini tekrar koymanız gerek. Bu
arada unutmadan, her uygulamanın zaten sadece tek bir BackgroundTask'i
olabilir. Kodumuz içerisinde de dikkat ederseniz ilk olarak adı ile
Task'imizi bulmaya çalışıyoruz. Eğer aynı isimde daha önce koyduğumuz
bir Task var ise onu alıp kaldırıyoruz. Sonrasında artık yeni Task'imizi
ekleyebiliriz. Bir diğer ince nokta da her Task'in **Description'ının**
olması gerektiği. Bu Description'lar doğrudan Windows Phone'un Settings
sayfalarında gösteriliyor.

![Task'lerin Description'ları Settings sayfalarında
gözüküyor.](http://cdn.daron.yondem.com/assets/2893/task1.png)
*Task'lerin Description'ları Settings sayfalarında gözüküyor.*

Debug modunda Task'leri test edebilmekle ilgili sorunumuz burada da
kendini gösteriyor ve bu sorunu aşmak için yine aynı taktiğe
başvuruyoruz. Bu sefer **LaunchForTest** adında bir metoddan
faydalanıyoruz ve bir dakika içerisinde Task'in emülatörde çalışmasını
sağlıyoruz.

![Background Agent'dan gelen Toast
Notification.](http://cdn.daron.yondem.com/assets/2893/task2.png)
*Background Agent'dan gelen Toast Notification.*

Örneği bu noktada çalıştırdığınızda herşeyin sağlıklı bir şekilde
çalıştığını göreceksiniz ama özünde dikkat edilmesi gereken birkaç nokta
daha var. Bunlardan ilki kullanıcının kasıtlı olarak Windows Phone'un
settings sayfalarına gidip uygulamanızın Background Agent'ını kapattığı
senaryo. Bu durumda siz istediğiniz kadar Task eklemeye çalışın sürekli
olarak "**InvalidOperationException**" alırsınız. Bu hatayı alacağınız
bir diğer senaryo da arka planda çalışabilecek Task sayısı limitinin
dolmuş olması. Eğer kullanıcı Windows Phone'un arka planda
çalıştırabileceği maksimum Task sayısına gelmiş ise sizin uygulamanız
bir Task eklemeye kalktığınıda yine "**InvalidOperationException**"
alacaktır. Peki bu iki durumu nasıl ayırt ederiz?

**[C\#]**

```cs
try
{
    ScheduledActionService.Add(periodicTask);
}
catch (InvalidOperationException exception)
{
    if (exception.Message.Contains("BNS Error: The action is disabled"))
    {
        MessageBox.Show("Background Agent'ları bu uygulama için bloklamışsınız.");
    }
    if (exception.Message.Contains("BNS Error: The maximum number of ScheduledActions of this type 
                                                                        have already been added."))
    {
        //Bu noktada bir şey yapmaya gerek yok. İşletim sistemi zaten gerekli uyarıyı gösterecektir.
    }
}     
```

Yukarıdaki kodda da görebileceğiniz üzere bahsettiğimiz Exception tipini
Task'i eklerken yakalayarak Exception Message'a bakmamız gerekiyor.
Mesajın içeriğine göre kullanıcıya gerekli uyarı göstermek en doğru
yöntem olacaktır.

Sanırım hepsi bu kadar :) Son bir uyarı olarak hatırlatiyim; WP7.1
uygulamalarında emülatör Background Task'leri için bellek ve 25 saniye
çalışma süresini emüle etmez. WP8 uygulamalarında ise bu emülasyonu
kullanabilirsiniz. Eğer WP7.1 uygulaması geliştirecekseniz bu detaya
dikkat etmekte fayda var.

Örnek projenin kodlarını her zamanki gibi
[Github'da](https://github.com/daronyondem/WPMakaleOrnekleri/tree/master/PeriodicTaskOrnek)
bulabilirsiniz.

Kendinize çok iyi bakın. Görüşmek üzere.


