# Silverlight'ın web servisine ulaşımını dinamik adreslerle yönetmek.
Silverlight projelerinizde web servisleri kullandığınızda standart
olarak "Add Service Reference" komutunu kullanıyoruz. Bu komut ile
yaratılan service proxy doğal olarak sürekli yaratıldığı andaki hedefine
göre çalışmayı amaçlıyor. Bu noktada da projenin yayına alınması
noktasında service reference'ınızı yeni adres ile update etmek zorunda
kalabiliyorsunuz.

Bir diğer sorun ise birden çok alan adının yönlendirildiği web
sitelerinde olabiliyor. Varsayalım ki hem x.com hem de y.com aslında
aynı siteyi açıyorlar ve sizin SL uygulamanıza da service reference
x.com adresi üzerinden eklendi. Bu durumda SL uygulamanız x.com'da
rahatlıkla çalışırken y.com'da çalışmayacaktır çünkü y.com'daki SL
uygulamanız hala servis için x.com'a gitmeye çalışacaktır ve bu da
cross-domain request kuralları gereği mümkün olmayacaktır.

Cross-domain'e izin verebiliriz dediğinizi duyar gibiyim fakat aslında
gerek yok. Hem bu şekilde farklı alan adlarında yayınlanan sitemizi hem
de makinemizdeki test alanı ile production'taki alanı tanıyabilen bir
Silverlight uygulaması çok daha iyi olur.

**[VB]**

    <span style="color: blue;">WithEvents</span> RSS <span
style="color: blue;">As</span> RSSService.rssSoapClient

Diyelim ki yukarıdaki şekilde tanımladığınız bir web servisiniz var.
Normalde bu servisi service referecen eklenirkenki adrese
hedefleyecektir. Oysa bu web servisini yaratırken kullandığımız
constructor'lar arasında bir de parametre alan constructorlar var. İşte
tam da o noktaya dokunmamız gerek.

**[VB]**

        <span style="color: blue;">Dim</span> uri <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
Uri(App.Current.Host.Source, <span
style="color: #a31515;">"../RSS.asmx"</span>)

        <span style="color: blue;">Dim</span> binding <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
BasicHttpBinding(BasicHttpSecurityMode.None)

        binding.MaxReceivedMessageSize = 10000000

        <span style="color: blue;">Dim</span> endpoint <span
style="color: blue;">As</span> <span style="color: blue;">New</span>
EndpointAddress(uri)

        RSS = <span style="color: blue;">New</span>
RSSService.rssSoapClient(binding, endpoint)

Yukarıda gördüğünüz kodda hem bir Binding hem de endpoint tanımlıyoruz.
Böylece yarattığımız servis hangi binding tipini ve hangi endpointi
kullanacağını bizden parametre olarak alacak. Özellikle endpoint demek
zaten ulaşmaya çalıştığımız servisin adresi demek.

İlk satırda Uri'mizi yaratırken **App.Current.Host.Source** ile XAP
dosyasının yerinin tam web adresini almış oluyoruz. Bizim örneğimizde
web servisi XAP dosyası ile aynı konumda değil bir üst klasörde yer
aldığı için bir üst klasörü çıkıp web servisimize ulaşabiliriz.

Binding'imizi de standart olarak yarattıken sonra Endpoint yaratıp
parametre olarak Uri'mizi veriyoruz. Son olarak eldeki binding ve
endpointler ile servisimizin proxy'sinden bir Client nesnesi alıp proje
içerisinde rahatlıkla kullanabiliriz. Böylelikle SL uygulaması her
açıldığında bulunduğu adrese bakıp ona göre web servisine yönelip sizin
Visual Studio içerisinde service referecen eklerken kullandığınız hedef
adresin hiçbir önemi kalmayacaktır.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-9-6 tarihinde yayinlanmistir.*
