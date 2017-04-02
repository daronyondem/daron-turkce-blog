---
FallbackID: 1964
Title: Slide.Show kurulumu ve kullanımı
PublishDate: 2/20/2008
EntryID: Slide_Show_kurulumu_ve_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight
old.EntryID: e7c89bc0-0ce4-432b-82c1-325a97dbea6f
---
Silverlight çıktığından bu yana özellikle yurt dışında bir çok ücretsiz
ve açık kaynak kodlu proje yayınlandı. Bunların arasında gerçek hayatta
kullanılabilirliği en yüksek olan proje
[Slide.Show](http://www.codeplex.com/SlideShow) projesi. Bu yazıda
yukarıdan aşağıda **Slide.Show**'u inceleyerek kurulumuna ve
özelleştirilmesine değineceğiz.

Slide.Show paketini aşağıdaki adreste yer alan SlideShowSource linkine
tıklayarak bilgisayarınıza indirebilirsiniz.

<http://www.codeplex.com/SlideShow/Release/ProjectReleases.aspx?ReleaseId=8862>

Slide.Show paketini kullanmak üzere **Expression Web** ile "File / New /
Web Site" menüsünden yeni bir web sitesi yaratalım. Yarattığımız web
sitesinde de boş bir HTML dosyası ekleyelim. Örneğimizde Slide.Show'u
harici bir XML dosyasına bağlayacağız. Bir sonraki adımda Slide.Show
kontrolüne ait **Silverlight.js** ve **Slideshow.js** dosyalarını
projemize eklememiz gerekiyor. Bunun için Expression Web içerisinde
"File / Import / File" menüsünden biraz önce indirmiş olduğumuz
Slide.Show paketi içerisinde "Scripts/Release" klasöründe yer alan iki
JavaScript dosyasını seçiyoruz. Sıra geldi bu her iki dosyayı da HTML
sayfamıza linklemeye. Aşağıdaki şekilde bir kod ile o işlemi de
tamamlayabiliriz.

<span style="color: blue;">\<!</span><span
style="color: #a31515;">DOCTYPE</span> <span
style="color: red;">html</span> <span style="color: red;">PUBLIC</span>
<span style="color: blue;">"-//W3C//DTD HTML 4.01//EN"</span> <span
style="color: blue;">"http://www.w3.org/TR/html4/strict.dtd"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">meta</span> <span
style="color: red;">http-equiv</span><span
style="color: blue;">="Content-Type"</span> <span
style="color: red;">content</span><span
style="color: blue;">="text/html; charset=utf-8"/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>Daron Yöndem Photo Gallery<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

<span style="color: blue;">**\<**</span><span
style="color: #a31515;">**script**</span> <span style="color: red;">
**type**</span><span style="color: blue;">**="text/javascript"**</span>
<span style="color: red;"> **src**</span><span
style="color: blue;">**="Silverlight.js"\>\</**</span><span
style="color: #a31515;">**script**</span><span
style="color: blue;">**\>**</span>

<span style="color: blue;">**\<**</span><span
style="color: #a31515;">**script**</span> <span style="color: red;">
**type**</span><span style="color: blue;">**="text/javascript"**</span>
<span style="color: red;"> **src**</span><span
style="color: blue;">**="SlideShow.js"\>\</**</span><span
style="color: #a31515;">**script**</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

Yapacağımız örnekte Slide.Show tüm sayfayı kaplayacağı için aşağıdaki
şekilde CSS tanımlamaları da yapmamız gerekecek.

    <span style="color: blue;">\<</span><span
style="color: #a31515;">style</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"\></span>

        <span style="color: #a31515;">html</span>,<span
style="color: #a31515;">body</span>,<span
style="color: #a31515;">.SlideShow</span>

        {

            <span style="color: red;">height</span>: <span
style="color: blue;">100%</span>;

        }

        <span style="color: #a31515;">body</span>

        {

            <span style="color: red;">margin</span>: <span
style="color: blue;">0px</span>;

        }

    <span style="color: blue;">\</</span><span
style="color: #a31515;">style</span><span style="color: blue;">\></span>

Son olarak Slide.Show kontrolünü sayfaya yerleştirmek üzere gerekli
JavaScript kodunu da yazarak sayfamızın HTML yapısını aşağıdaki şekilde
tamamlıyoruz.

<span style="color: blue;">\<!</span><span
style="color: #a31515;">DOCTYPE</span> <span
style="color: red;">html</span> <span style="color: red;">PUBLIC</span>
<span style="color: blue;">"-//W3C//DTD HTML 4.01//EN"</span> <span
style="color: blue;">"http://www.w3.org/TR/html4/strict.dtd"\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">meta</span> <span
style="color: red;">http-equiv</span><span
style="color: blue;">="Content-Type"</span> <span
style="color: red;">content</span><span
style="color: blue;">="text/html; charset=utf-8"/\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">title</span><span
style="color: blue;">\></span>Daron Yöndem Photo Gallery<span
style="color: blue;">\</</span><span
style="color: #a31515;">title</span><span style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="Silverlight.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"</span> <span
style="color: red;">src</span><span
style="color: blue;">="SlideShow.js"\>\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">style</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/css"\></span>

        <span style="color: #a31515;">html</span>,<span
style="color: #a31515;">body</span>,<span
style="color: #a31515;">.SlideShow</span>

        {

            <span style="color: red;">height</span>: <span
style="color: blue;">100%</span>;

        }

        <span style="color: #a31515;">body</span>

        {

            <span style="color: red;">margin</span>: <span
style="color: blue;">0px</span>;

        }

    <span style="color: blue;">\</</span><span
style="color: #a31515;">style</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">head</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\<</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

    <span style="color: blue;">\<</span><span
style="color: #a31515;">script</span> <span
style="color: red;">type</span><span
style="color: blue;">="text/javascript"\></span>

        <span style="color: blue;">new</span> SlideShow.Control(<span
style="color: blue;">new</span> SlideShow.XmlConfigProvider());

    <span style="color: blue;">\</</span><span
style="color: #a31515;">script</span><span
style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">body</span><span style="color: blue;">\></span>

 

<span style="color: blue;">\</</span><span
style="color: #a31515;">html</span><span style="color: blue;">\></span>

Sıra geldi Silverlight.js ve Slideshow.js dosyamız ile aynı konumda
bulunacak olan ve uygulamamızla ilgili tüm ayarları içerek olan
Configuration.xml dosyasını düzenlemeye. Bunun için Expression Web
içerisinde "File / New / XML" komutunu kullanabilirsiniz. Yaratacağımız
Slide.Show uygulamasında kullanacağımız harici componentler de olacak.
Söz konusu componentler Slide.Show download paketi içerisinde
Script/Debug klasöründe bulunuyor. Bu klasörde bulunan tüm dosyaları
kendi projemizde bir Scripts klasörü oluşturarak içerisine kopyalayalım.
Böylece Configuration.xml içerisinde bu dosyaları linkleyerek
uygulamamıza ek özellikler katabileceğiz.

<span style="color: blue;">\<?</span><span
style="color: #a31515;">xml</span><span style="color: blue;">
</span><span style="color: red;">version</span><span
style="color: blue;">=</span>"<span
style="color: blue;">1.0</span>"<span style="color: blue;"> </span><span
style="color: red;">encoding</span><span
style="color: blue;">=</span>"<span
style="color: blue;">utf-8</span>"<span style="color: blue;"> ?\></span>

<span style="color: blue;">\<</span><span
style="color: #a31515;">configuration</span><span style="color: blue;">
</span><span style="color: red;">width</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">
</span><span style="color: red;">height</span><span
style="color: blue;">=</span>"<span
style="color: blue;">100%</span>"<span style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">scripts</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">AlbumViewer</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/AlbumViewer.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Button</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/Button.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">DataProvider</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/DataProvider.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">NavigationTray</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/NavigationTray.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ProgressIndicator</span>"<span
style="color: blue;"> </span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/ProgressIndicator.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideDescription</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/SlideDescription.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideViewer</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/SlideViewer.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ThumbnailViewer</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/ThumbnailViewer.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">script</span><span style="color: blue;">
</span><span style="color: red;">key</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Transition</span>"<span style="color: blue;">
</span><span style="color: red;">url</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Scripts/Transition.js</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">scripts</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">module</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideViewer</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">module</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ProgressBar</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">module</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideDescription</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">module</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">NavigationTray</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">option</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">initialAlbumView</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">true</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">module</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">modules</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">transitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">transition</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">FadeTransition</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CrossFadeTransition</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">transition</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">ShapeTransition</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CircleOutTransition</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">transition</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideTransition</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideLeftTransition</span>"<span
style="color: blue;"> /\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">transition</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideTransition</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">SlideDownTransition</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">option</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">direction</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Down</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">transition</span><span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">transition</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WipeTransition</span>"<span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">WipeRightTransition</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">      \<</span><span
style="color: #a31515;">option</span><span style="color: blue;">
</span><span style="color: red;">name</span><span
style="color: blue;">=</span>"<span
style="color: blue;">direction</span>"<span style="color: blue;">
</span><span style="color: red;">value</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Right</span>"<span style="color: blue;"> /\></span>

<span style="color: blue;">    \</</span><span
style="color: #a31515;">transition</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">transitions</span><span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">dataProvider</span><span style="color: blue;">
</span><span style="color: red;">type</span><span
style="color: blue;">=</span>"<span
style="color: blue;">XmlDataProvider</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">configuration</span><span
style="color: blue;">\></span>

Yukarıda gördüğünüz Configuration dosyası içerisinde SlideShow
uygulamamızda kullanacağımız modülleri, script dosyalarını ve geçiş
efektlerini belirliyoruz. Son olarak sıra geldi Slide.Show içerisinde
gösterilecek olan fotoğrafların bir listesini ayrı bir XML dosyası
içerisine yerleştirmeye. Bu noktada da data.xml adında bir dosya
yaratarak aşağıdaki şekilde albümler ve fotoğraflar yaratabiliyoruz.

<span style="color: blue;">\<</span><span
style="color: #a31515;">data</span><span style="color: blue;">
</span><span style="color: red;">transition</span><span
style="color: blue;">=</span>"<span
style="color: blue;">CrossFadeTransition</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">  \<</span><span
style="color: #a31515;">album</span>

<span style="color: blue;">    </span><span
style="color: red;">title</span><span
style="color: blue;">=</span>"<span style="color: blue;">Silverlight
Trainings</span>"

<span style="color: blue;">    </span><span
style="color: red;">description</span><span
style="color: blue;">=</span>"<span style="color: blue;">All around the
world</span>"

<span style="color: blue;">    </span><span
style="color: red;">image</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Images/a29.jpg</span>"<span
style="color: blue;">\></span>

<span style="color: blue;">    \<</span><span
style="color: #a31515;">slide</span>

<span style="color: blue;">      </span><span
style="color: red;">title</span><span
style="color: blue;">=</span>"<span style="color: blue;">Microsoft
Turkey Silverlight Trainings</span>"

<span style="color: blue;">      </span><span
style="color: red;">description</span><span
style="color: blue;">=</span>"<span style="color: blue;">Happy
times.</span>"

<span style="color: blue;">      </span><span
style="color: red;">image</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Images/s07.jpg</span>"

<span style="color: blue;">      </span><span
style="color: red;">thumbnail</span><span
style="color: blue;">=</span>"<span
style="color: blue;">Images/t07.jpg</span>"<span style="color: blue;">
/\></span>

<span style="color: blue;">  \</</span><span
style="color: #a31515;">album</span><span style="color: blue;">\></span>

<span style="color: blue;">\</</span><span
style="color: #a31515;">data</span><span style="color: blue;">\></span>

Yukarıdaki yapıyı takip ederek birden çok albüm ve her albüme birden çok
fotoğraf ekleyebilirsiniz. Albümlere ait kapak resmini **Album** tagının
içerisinde image özelliğine atarken her bir slayt için de **Slide**
tagına bir normal fotoğraf bir de **thumbnail** fotoğrafı aktarmanız
gerekiyor.

Tüm bu ayarları tamamladıktan sonra ayrı uygulamanızı internet üzerinden
yayınlayabilirsiniz.

Hepinize kolay gelsin.


