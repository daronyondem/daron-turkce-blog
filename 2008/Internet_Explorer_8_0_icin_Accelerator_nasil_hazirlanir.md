---
FallbackID: 2189
Title: Internet Explorer 8.0 için Accelerator nasıl hazırlanır?
PublishDate: 18/9/2008
EntryID: Internet_Explorer_8_0_icin_Accelerator_nasil_hazirlanir
IsActive: True
Section: software
MinutesSpent: 0
Tags: IE 8.0, Internet Explorer
old.EntryID: 5d3e474f-e916-4dfb-8e7a-c9d9c980ccbc
---
Internet Explorer 8.0 ile beraber yazılımcılar olarak karşılaştığımız
bir diğer uygulama geliştirme alanı da "Accelerators" yapısı.
Accelerator'lar ile tarayıcı içerisinde kullanıcıların farklı konumlarda
sadece sağ tuşa tıklayarak hızlıca bazı içeriklere veya işlevselliklere
ulaşmasını sağlayabiliyoruz. Gelin ilk olarak canlı bir örnek üzerinden
bir Accelerator'ın ne olduğuna göz atalım.

**Accelerator nedir?**

Internet Explorer'ı bilgisayarınıza ilk yüklediğinizde varsayılan
ayarları ile beraber LiveMaps'in Accelerator eklentisi de yüklenmiş
olacaktır. Bu Accelerator bize herhangi bir web sitesine bir adresi
seçip sağ tıkladığımızda o adresin doğrudan hızlı bir şekilde haritada
görebilmemizi sağlıyor. Bu işlem için herhangi bir şekilde LiveMaps web
sitesine gitmemiz gerekmiyor. Eğer ki adresi doğrudan LiveMaps'de görmek
isterseniz bu sefer de herhangi bir adresi seçip sağ tuş ile gelen
LiveMaps Accelerator'ını seçmeniz yeterli. Böylece hızlı bir şekilde
kullanıcının LiveMaps gibi bir uygulamaya herhangi bir site adresi
yazmadan kullanabilmesini sağlayabiliyoruz.

![LiveMaps Accelerator
uygulaması.](media/Internet_Explorer_8_0_icin_Accelerator_nasil_hazirlanir/17092008_1.jpg)\
*LiveMaps Accelerator uygulaması.*

**Kendi Accelerator'ımızı yazalım.**

Yapacağımız uygulamayı öğrenirken konu mankeni olarak
[zargan.com](http://www.zargan.com/) sitesini kullanalım. İngilizceden
Türkçeye ve Türkçeden İngilizceye çeviri yapan sitede herhangi bir
kelimeyi arattığınız aşağıdaki şekilde bir adres ile karşılaşıyoruz.

http://www.zargan.com/sozluk.asp?Sozcuk=deneme

Aslında bizim farklı aramalar yaptırabilmemiz için siteye bu şekilde
adresler göndermemiz yeterli olacaktır. Zargan'ın sistemini anladıktan
sonra şimdi geçelim Accelerator'ların yapısını incelemeye ve eldeki
siteye uygun bir Accelerator nasıl yazarız sorusunu cevaplamaya.

Her Accelerator bir XML dosyası içerisinde "OpenService Format" denilen
bir standarda uygun şekilde yazılır. Accelerator'ın tüm çalışma yapısı
bu XML içerisinde saklıdır. Hemen sizinle Zargan için çalışacak olan
XML'i paylaşacağım.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span> <span
style="color: red;">version</span><span
style="color: blue;">="1.0"</span> <span
style="color: red;">encoding</span><span
style="color: blue;">="UTF-8"?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">openServiceDescription</span>

    <span style="color: red;">xmlns</span><span
style="color: blue;">="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">homepageUrl</span><span
style="color: blue;">\></span>http://www.zargan.com/<span
style="color: blue;">\</</span><span
style="color: #a31515;">homepageUrl</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">display</span><span
style="color: blue;">\></span>   

        <span style="color: blue;">\<</span><span
style="color: #a31515;">name</span><span
style="color: blue;">\></span>Zargan ile cevir<span
style="color: blue;">\</</span><span
style="color: #a31515;">name</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">icon</span><span
style="color: blue;">\></span>http://www.zargan.com/favicon.ico<span
style="color: blue;">\</</span><span
style="color: #a31515;">icon</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">display</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">activity</span> <span
style="color: red;">category</span><span
style="color: blue;">="translate"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">activityAction</span> <span
style="color: red;">context</span><span
style="color: blue;">="selection"</span> <span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">preview</span> <span
style="color: red;">action</span><span
style="color: blue;">="http://www.zargan.com/sozluk.asp"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">parameter</span> <span
style="color: red;">name</span><span
style="color: blue;">="Sozcuk"</span> <span
style="color: red;">value</span><span
style="color: blue;">="{selection}"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">preview</span><span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">execute</span> <span
style="color: red;">action</span><span
style="color: blue;">="http://www.zargan.com/sozluk.asp"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">parameter</span> <span
style="color: red;">name</span><span
style="color: blue;">="Sozcuk"</span> <span
style="color: red;">value</span><span
style="color: blue;">="{selection}"</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">execute</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">activityAction</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">activity</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">openServiceDescription</span><span
style="color: blue;">\></span>

Yukarıdaki gibi bir XML'i accelerator.xml gibi bir dosyaya kaydedip
sitenize koyduktan sonra artık tek yapmanız gereken bu XML'in bir
Accelerator olarak yüklenmesini sağlayacak JavaScript kodunu yazmak.

        <span style="color: blue;">\<</span><span
style="color: #a31515;">button</span> <span
style="color: red;">onclick</span><span
style="color: blue;">="window.external.addService('accelerator.xml')"\></span>Zargan
Accelerator Ekle<span style="color: blue;">\</</span><span
style="color: #a31515;">button</span><span
style="color: blue;">\></span>

Artık kullanıcılar yukarıdaki düğmeye tıkladıklarında doğrudan
Accelerator'ı yükleyebilecek ve Internet Explorer içerisinde herhangi
bir metni seçip sağ tuşa bastıklarında gelen "Zargan ile çevir" komutunu
verirlerse seçtikleri kelimenin çevirisini gösteren zargan.com sayfası
otomatik olarak açılacaktır.

Daha da ileri gidip eğer "Zargan ile çevir" menüsünün üzerinde biraz
dururlarsa ufak bir pencere içerisinde aynı LiveMaps Accelerator'ında
olduğu gibi seçilen kelimenin arandığı sayfa da gösterilecektir. Tabi şu
an için Zargan'ın bahsettiğimiz çerçeveye uygun tasarımda bir sayfası
olmadığı için ortaya pek hoş bir manzara çıkmıyor fakat önemli olan
bizim uygulayabilmiş olmamız.

**Peki nedir bu XML'dekilerin anlamı?**

Şimdi gelin çalışan XML'i parçalayarak bölüm bölüm neyin ne olduğuna ve
ne anlama geldiğine bir göz atalım. İlk olarak XML'in ana yapısındaki
hizmet sağlayıcı ile ilgili bilgileri içeren kısma bir bakalım.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span> <span
style="color: red;">version</span><span
style="color: blue;">="1.0"</span> <span
style="color: red;">encoding</span><span
style="color: blue;">="UTF-8"?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">openServiceDescription</span>

    <span style="color: red;">xmlns</span><span
style="color: blue;">="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">homepageUrl</span><span
style="color: blue;">\></span>http://www.zargan.com/<span
style="color: blue;">\</</span><span
style="color: #a31515;">homepageUrl</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">display</span><span
style="color: blue;">\></span>   

        <span style="color: blue;">\<</span><span
style="color: #a31515;">name</span><span
style="color: blue;">\></span>Zargan ile cevir<span
style="color: blue;">\</</span><span
style="color: #a31515;">name</span><span style="color: blue;">\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">icon</span><span
style="color: blue;">\></span>http://www.zargan.com/favicon.ico<span
style="color: blue;">\</</span><span
style="color: #a31515;">icon</span><span style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">display</span><span
style="color: blue;">\></span>

    <span style="color: gray;">\<activity</span> <span
style="color: gray;">category="translate"\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<activityAction</span> <span
style="color: gray;">context="selection"</span> <span
style="color: gray;">\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<preview</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</preview\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<execute</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">type="text"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</execute\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\</activityAction\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</activity</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">openServiceDescription</span><span
style="color: blue;">\></span>

**homepageUrl** içerisinde hizmeti sağlayan sitenin tam adresini
girmemiz gerekiyor. Bu adres kullanıcılar Accelerator'ı sistemlerine
eklerken göreceklerin adresin ta kendisi, bir anlamda hizmet
sağlayıcının kimliğinin bir kanıtı olarak da kabul edebiliriz. **Name**
tagları arasında yer alan metin doğrudan Accelerator'ın sağ tuş ile
gelen menülerde gözükecek olan adı. Aynı şekilde **icon** tagları
arasında adresi verilen ikon da sağ tuş ile gelen menülerde
gösterilecektir.

Gelelim Accelerator'ımızın yapacağı işlere. Bizim Accelerator örneğimiz
sayfada seçili olan metni alarak *http://www.zargan.com/sozluk.asp*
adresine **Sozcuk** parametresi olarak göndermekle yükümlü. Bunun için
ilk olarak Accelerator altında bir **Activity** tanımlıyoruz.

<span style="color: gray;">\<?xml</span> <span
style="color: gray;">version="1.0"</span> <span
style="color: gray;">encoding="UTF-8"?\></span>

<span style="color: gray;">\<openServiceDescription</span>

<span style="color: gray">    </span> <span
style="color: gray;">xmlns="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<homepageUrl\></span><span
style="color: gray">http://www.zargan.com/</span><span
style="color: gray;">\</homepageUrl\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<display\></span><span style="color: gray">   
</span>

<span style="color: gray">        </span> <span
style="color: gray;">\<name\></span><span style="color: gray">Zargan ile
cevir</span><span style="color: gray;">\</name\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<icon\></span><span
style="color: gray">http://www.zargan.com/favicon.ico</span><span
style="color: gray;">\</icon\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</display</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">activity</span> <span
style="color: red;">category</span><span
style="color: blue;">="translate"\></span>

   <span style="color: gray">     </span> <span
style="color: gray;">\<activityAction</span> <span
style="color: gray;">context="selection"</span> <span
style="color: gray;">\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<preview</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</preview\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<execute</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">type="text"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</execute\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\</activityAction</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\</</span><span
style="color: #a31515;">activity</span><span
style="color: blue;">\></span>

<span style="color: gray;">\</openServiceDescription</span><span
style="color: blue;">\></span>

Yarattığımız **activity** tagının **category** özelliğine farklı
değerler verebiliyoruz. Bu değerler Internet Explorer'ın kategoriye göre
Accelerator'ları sıralayabilmesini sağlıyor. Kendi istediğiniz değerleri
verebileceğiniz gibi olabildiğince genel geçer olması olası değerleri
vermekte fayda var. Şu an için map (harita), blog (günlük), define
(ansiklopedi), add (Bookmarking) ve translate (Çeviri) gibi kategoriler
genel olarak kullanılanlar arasında.

<span style="color: gray;">\<?xml</span> <span
style="color: gray;">version="1.0"</span> <span
style="color: gray;">encoding="UTF-8"?\></span>

<span style="color: gray;">\<openServiceDescription</span>

<span style="color: gray">    </span> <span
style="color: gray;">xmlns="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<homepageUrl\></span><span
style="color: gray">http://www.zargan.com/</span><span
style="color: gray;">\</homepageUrl\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<display\></span><span style="color: gray">   
</span>

<span style="color: gray">        </span> <span
style="color: gray;">\<name\></span><span style="color: gray">Zargan ile
cevir</span><span style="color: gray;">\</name\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<icon\></span><span
style="color: gray">http://www.zargan.com/favicon.ico</span><span
style="color: gray;">\</icon\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</display\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<activity</span> <span
style="color: gray;">category="translate"\></span>

        <span style="color: blue;">\<</span><span
style="color: #a31515;">activityAction</span> <span
style="color: red;">context</span><span
style="color: blue;">="selection"</span> <span
style="color: blue;">\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<preview</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</preview\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<execute</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">type="text"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</execute</span><span
style="color: blue;">\></span>

        <span style="color: blue;">\</</span><span
style="color: #a31515;">activityAction</span><span
style="color: blue;">\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</activity\></span>

<span style="color: gray;">\</openServiceDescription</span><span
style="color: blue;">\></span>

Bir sonraki adımda bir **activityAction** tanımlıyoruz.
**activityAction'ın** **context** değeri için farklı seçenekler mevcut.
Bizim örneğimizde herhangi bir metin seçilerek sağ tuşa basıldığında
işlem yapılacağı için **selection** değeri atanmış durumda. İsterseniz
buraya **link** değerini de verebilirsiniz, böylece herhangi bir linke
tıklandığında yapılacak işlemi belirleyebilirsiniz.

<span style="color: gray;">\<?xml</span> <span
style="color: gray;">version="1.0"</span> <span
style="color: gray;">encoding="UTF-8"?\></span>

<span style="color: gray;">\<openServiceDescription</span>

<span style="color: gray">    </span> <span
style="color: gray;">xmlns="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<homepageUrl\></span><span
style="color: gray">http://www.zargan.com/</span><span
style="color: gray;">\</homepageUrl\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<display\></span><span style="color: gray">   
</span>

<span style="color: gray">        </span> <span
style="color: gray;">\<name\></span><span style="color: gray">Zargan ile
cevir</span><span style="color: gray;">\</name\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<icon\></span><span
style="color: gray">http://www.zargan.com/favicon.ico</span><span
style="color: gray;">\</icon\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</display\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<activity</span> <span
style="color: gray;">category="translate"\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<activityAction</span> <span
style="color: gray;">context="selection"</span> <span
style="color: gray;">\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<preview</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</preview</span><span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">execute</span> <span
style="color: red;">action</span><span
style="color: blue;">="http://www.zargan.com/sozluk.asp"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">parameter</span> <span
style="color: red;">name</span><span
style="color: blue;">="Sozcuk"</span> <span
style="color: red;">value</span><span
style="color: blue;">="{selection}"</span> <span
style="color: red;">type</span><span style="color: blue;">="text"</span>
<span style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">execute</span><span
style="color: blue;">\></span>

  <span style="color: gray">      </span> <span
style="color: gray;">\</activityAction\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</activity\></span>

<span style="color: gray;">\</openServiceDescription</span><span
style="color: blue;">\></span>

Sıra geldi execute tagları ile artık doğrudan yapılacak işleme karar
vermeye. Sağ tuş ile tıklanarak gelen menüden Accelerator'a
tıklandığında çalıştırılacak olan işlem bir POST veya GET olabilir.
**Execute** taglarına **method** özelliği vererek POST ve GET arasında
bir seçim yapabilirsiniz. Varsayılan değeri GET olduğu için ve bizim
örneğimize bu seçenek uyduğu için **method** özelliğini ayarlamamıza
gerek kalmadı. **Action** kısmına ise gidilecek adresi veriyoruz. Geriye
Zargan'a gönderilecek olan parametre kaldı. Parametrenin adı (**Name**)
Sozcuk, tipi (**Type**) metin (**text**) değeri ise kullanıcının seçtiği
metin ({**selection**}) olmalı. Böylece XML içerisinde yapıyı da sanırım
aydınlatmış olduk.

Seçili metni {selection} ile alarak parametre haline getirebildiğiniz
gibi daha bir çok bilgiyi de elde edebilirsiniz.

-   documentDomain -Kullanıcının Acceleator'ı çalıştırdığı alan adı
-   documentTitle - Accelerator'ın çalıştırıldığı sayfanın Title
    (başlık) bilgisi.
-   documentUrl -  Accelerator'ın çalıştırıldığı sayfanın tam adresi.
-    link - Eğer bir linke tıklanarak Acceleratır çalıştırılıyorsa
    linkin adresi.
-   linkDomain - Eğer bir linke tıklanarak Acceleratır çalıştırılıyorsa
    linkin alan adı.
-   linkRel - Eğer bir linke tıklanarak Acceleratır çalıştırılıyorsa
    linkin rel özelliği.
-   linkText - Eğer bir linke tıklanarak Acceleratır çalıştırılıyorsa
    linkin metni.
-   linkType - Eğer bir linke tıklanarak Acceleratır çalıştırılıyorsa
    linkin tipi.

Son olarak gelelim Accelerator'ın yanında gözüken önizleme ekranının XML
kodlarına.

<span style="color: gray;">\<?xml</span> <span
style="color: gray;">version="1.0"</span> <span
style="color: gray;">encoding="UTF-8"?\></span>

<span style="color: gray;">\<openServiceDescription</span>

<span style="color: gray">    </span> <span
style="color: gray;">xmlns="http://www.microsoft.com/schemas/openservicedescription/1.0"\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<homepageUrl\></span><span
style="color: gray">http://www.zargan.com/</span><span
style="color: gray;">\</homepageUrl\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<display\></span><span style="color: gray">   
</span>

<span style="color: gray">        </span> <span
style="color: gray;">\<name\></span><span style="color: gray">Zargan ile
cevir</span><span style="color: gray;">\</name\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<icon\></span><span
style="color: gray">http://www.zargan.com/favicon.ico</span><span
style="color: gray;">\</icon\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</display\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\<activity</span> <span
style="color: gray;">category="translate"\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\<activityAction</span> <span
style="color: gray;">context="selection"</span> <span
style="color: blue;">\></span>

            <span style="color: blue;">\<</span><span
style="color: #a31515;">preview</span> <span
style="color: red;">action</span><span
style="color: blue;">="http://www.zargan.com/sozluk.asp"\></span>

                <span style="color: blue;">\<</span><span
style="color: #a31515;">parameter</span> <span
style="color: red;">name</span><span
style="color: blue;">="Sozcuk"</span> <span
style="color: red;">value</span><span
style="color: blue;">="{selection}"</span> <span
style="color: blue;">/\></span>

            <span style="color: blue;">\</</span><span
style="color: #a31515;">preview</span><span
style="color: blue;">\></span>

<span style="color: gray">            </span> <span
style="color: gray;">\<execute</span> <span
style="color: gray;">action="http://www.zargan.com/sozluk.asp"\></span>

<span style="color: gray">                </span> <span
style="color: gray;">\<parameter</span> <span
style="color: gray;">name="Sozcuk"</span> <span
style="color: gray;">value="{selection}"</span> <span
style="color: gray;">type="text"</span> <span
style="color: gray;">/\></span><span style="color: gray"> </span>

<span style="color: gray">            </span> <span
style="color: gray;">\</execute\></span>

<span style="color: gray">        </span> <span
style="color: gray;">\</activityAction\></span>

<span style="color: gray">    </span> <span
style="color: gray;">\</activity\></span>

<span style="color: gray;">\</openServiceDescription</span><span
style="color: blue;">\></span>

Ön izleme ekranı yaratmak için **preview** taglarını kullanmamız
gerekiyor. Aynı **execute** taglarında olduğu gibi burada da **action**
ve gönderilecek olan parametrenin ayarlanması gerekiyor. Normal
şartlarda burada yönlendirilen sayfa (action) ile arama sonuçlarının
doğrudan gösterileceği sayfanın tasarım olarak farklı olması gerekir.
Buradaki sayfanın özellikle ön izleme penceresinin boyutlarına
(320\*240px) sığacak şekilde tasarlanması çok daha hoş bir kullanım
deneyimi sağlayacaktır.

Hepinize kolay gelsin.


