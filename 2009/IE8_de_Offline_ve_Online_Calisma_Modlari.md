# IE8'de Offline ve Online Çalışma Modları
Özellikle RIA uygulamalarındaki en büyük sorunlardan biri anlık internet
bağlantısı kesintilerinde sayfanın bir daha geri ulaşılamayacak şekilde
ekrandan kaybolması veya farklı hataların ortaya çıkarak geri dönüşü
imkansız hale getirmesidir. Bu hoş olmayan durumu artık Internet
Explorer 8.0 ile beraber çözebiliyoruz. IE 8.0 içerisinde
**navigtor.offline** nesnesi ile istemci tarafında internet
bağlantısının o an için olup olmadığı kontrol edebildiğimiz gibi
internet bağlantısı ile ilgili değişiklikleri algılayacak event-handler
tanımlamaları da yapabiliyoruz. Bu kolaylıklar ile artık AJAX veya
Silverlight uygulamalarının istemci tarafındaki kesintileri algılayarak
uygun bir şekilde kullanıcıyı uyarmaları mümkün. Hatta belki de internet
bağlantısının koptuğunu algılayan uygulama veriyi DOMStorage'a saklayıp
bir sonraki çalıştığında sunucuya gönderebilir. Minik bir örnek ile bu
işlemleri nasıl yapabileceğimize göz atalım.

**[HTML]**

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">
</span><span style="color: red;"> **ononline**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**VarMi();**</span>"<span style="color: blue;">
**** </span><span style="color: red;">**onoffline**</span><span
style="color: blue;">**=**</span>"<span
style="color: blue;">**VarMi();**</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">form</span><span style="color: blue;">
</span><span style="color: red;">id</span><span
style="color: blue;">=</span>"<span
style="color: blue;">form1</span>"<span style="color: blue;">
</span><span style="color: red;">runat</span><span
style="color: blue;">=</span>"<span
style="color: blue;">server</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">asp:ScriptManager</span><span
style="color: blue;"> </span><span style="color: red;">ID</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ScriptManager1</span>"<span style="color: blue;">
</span><span style="color: red;">runat</span><span
style="color: blue;">=</span>"<span
style="color: blue;">server</span>"<span style="color: blue;">\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">asp:ScriptManager</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">div</span><span style="color: blue;">
</span><span style="color: red;">id</span><span
style="color: blue;">=</span>"<span
style="color: blue;">icerik</span>"<span style="color: blue;">\></span>

 

<span style="color: blue;">    \</</span><span
style="color: #a31515;">div</span><span style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">input</span><span style="color: blue;">
</span><span style="color: red;">onclick</span><span
style="color: blue;">=</span>"<span
style="color: blue;">**VarMi**();</span>"<span style="color: blue;">
</span><span style="color: red;">id</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button1</span>"<span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">button</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">form</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

Yukarıdaki HTML kodu içerisinde özellikle koyu yazılı noktalara dikkat
etmemiz gerekiyor. Birazdan yazacağımız **VarMi** adındaki JavaScript
fonksiyonumuz istemcide internet bağlantısı olup olmadığını kontrol
edecek. Fakat hangi durumlarda bu kontrolü yapacağız? İlk olarak söz
konusu fonksiyonumuzu sayfamızda bir düğmeye bağladık. Böylece
istediğimiz zaman tıklayarak internet bağlantısı olup olmadığını
öğrenebiliriz. Diğer yandan istemcide internet bağlantısı koptuğunda
veya internet bağlantısı geldiğinde de **VarMi** fonksiyonumuzun
çalışarak gerekli değişiklikleri yapmasını istiyoruz. O nedenle body’nin
**ononline** ve **onoffline** özelliklerine de söz konusu
fonksiyonumuzun adını yazıyoruz. Böylece **online** durumunda yani
internet bağlantısı geldiğinde veya **onoffline** durumunda yani
internet bağlantısı kesildiğinde de anında **VarMi** fonksiyonumuz
çalıştırılacak. Gelelim şimdi de **VarMi** fonksiyonumuzu yazmaya.

**[JScript]**

<span style="color: blue;">function</span> VarMi() {

    <span style="color: blue;">if</span> (window.navigator.onLine) {

        \$get(<span style="color: #a31515;">"icerik"</span>).innerHTML =
<span style="color: #a31515;">"İnternet Var"</span>;

    }

    <span style="color: blue;">else</span> {

        \$get(<span style="color: #a31515;">"icerik"</span>).innerHTML =
<span style="color: #a31515;">"İnternet YOK"</span>;

    };

}

Aslında kod çok basit. **navigator.onLine** metodu bize geriye bir
**Boolean** değeri döndürüyor. Eğer tarayıcıda o an internet bağlantısı
varsa sayfadaki bir DIV içerisine uygun uyarı mesajını yazıyoruz. Aynı
şekilde eğer bağlantı yoksa bu sefer de farklı bir uyarı mesajı
yazıyoruz. Siz örneklerinizde bu durumlara göre farklı işlemler
yapabilirsiniz. Böylece hazırladığınız web sitesi yeri geldiğinde belki
bazı işlemleri bir süreliğine sunucudan bağımsız olarak da yapabilir ve
nasıl çalışacağına internet bağlantısının durumuna bakarak kendisi karar
verebilirim.

Hepinize kolay gelsin...



*Bu yazi http://daron.yondem.com adresinde, 2009-1-5 tarihinde yayinlanmistir.*
