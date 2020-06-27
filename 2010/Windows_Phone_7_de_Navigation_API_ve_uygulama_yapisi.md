# Windows Phone 7'de Navigation API ve uygulama yapısı.
Bu makalemizde Windows Phone 7 içerisinde uygulama geliştirirken
kullanabileceğimiz hazır gelen navigasyon sistemine göz atacağız. Fakat
bunun öncesinde tavsiyem benzerliklerinden dolayı Silverlight 3.0
içerisindeki [Navigation
API](http://daron.yondem.com/50b7d2c8-13f5-4f82-b458-4f887a538448)'yi
bir incelemeniz. Sonrasında WP7 tarafında devam edebiliriz.

![WP7 Kullanıcı Arayüzü
Yapısı](media/Windows_Phone_7_de_Navigation_API_ve_uygulama_yapisi/03052010_3.png)
*WP7 Kullanıcı Arayüzü Yapısı*

Her yeni yaratılan WP7 uygulamasında root element bir
**PhoneApplicationFrame** olarak gelir. Bu çerçeve içerisinde birden çok
sayfa farklı navigasyonlarda rahatlıkla gösterilebilir. Bu yapı kendi
içerisinde SystemTray ve ApplicationBar'ı da sunar. Ayrıca PhonePage
olarak geçen uygulama içerisindeki her sayfa da bu Frame tarafından
gösterilir. Sayfalar ile kabaca iki bölüme ayrılır. Sayfa başlığının
bulunduğu Title kısmı ve sayfanın tüm iç kontrollerinin bulunacağı
Content bölümü.

**[XAML]**
```xml
<Application
   x:Class="WindowsPhoneApplication4.App"
   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"      
   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
   xmlns:system="clr-namespace:System;assembly=mscorlib"
   xmlns:mpc="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls"
   xmlns:phoneNavigation="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation">
    <!--RootFrame points to and loads the first page of your application-->
    <Application.RootVisual>
        <phoneNavigation:PhoneApplicationFrame x:Name="RootFrame" Source="/MainPage.xaml"/>
    </Application.RootVisual>
```

Yukarıda gördüğünüz kod herhangi bir WP7 uygulamasının App.XAML
dosyasında ilk yaratıldığında bulunan kod. Kod içerisinde uygulamanın
RootVisual'ı olarak bir PhoneApplicationFrame atandığını görebiliyoruz.
Söz konusu **PhoneApplicationFrame** Microsoft.Phone.Controls.Navigation
assembly'si altında **Microsoft.Phone.Controls** namespace'inde
bulunuyor. Bahsettiğimiz namespace zaten **phoneNavigation** adında bir
XML namespace olarak XAML dosyasında tanımlanmış durumda.
PhoneAppFrame'in ilk açılıştaki **Source** değeri uygulama ilk
açıldığında gösterilecek sayfayı yani **PhoneApplicationPage'i**
hedefliyor. Söz konusu tanımlama XAP dosyasının iç yapısına ait bir Uri.
Tam da bu noktada eğer istersek farklı UriMapping kuralları da
tanımlayabiliyoruz ve buradaki Navigation API'yi aynı normal Silverlight
uygulamalarında olduğu gibi kullanabiliyoruz.

**[XAML]**
```xml
<Application
   x:Class="WindowsPhoneApplication4.App"
   xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"      
   xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
   xmlns:system="clr-namespace:System;assembly=mscorlib"
   xmlns:mpc="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls"
   xmlns:phoneNavigation="clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Navigation"
   **** xmlns:nav="clr-namespace:System.Windows.Navigation;assembly=Microsoft.Phone.Controls.Navigation">
    <!--RootFrame points to and loads the first page of your application-->
    <Application.RootVisual>
        <phoneNavigation:PhoneApplicationFrame x:Name="RootFrame" Source="/MainPage.xaml">
            <phoneNavigation:PhoneApplicationFrame.UriMapper>
                <nav:UriMapper>
                    <nav:UriMapper.UriMappings>
                        <nav:UriMapping Uri="/urun/{ID}" MappedUri="/Sayfalar/Page1.xaml?ID={ID}"/>
                    </nav:UriMapper.UriMappings>
                </nav:UriMapper>
            </phoneNavigation:PhoneApplicationFrame.UriMapper>
        </phoneNavigation:PhoneApplicationFrame>
    </Application.RootVisual>
```

Yukarıdaki XAML kodu içerisinde önemli birkaç nokta var. Bunlardan ilki
XAML NameSpace olarak tanımladığımız **nav** namespace'i. NAV
NameSpace'i de yine Microsoft.Phone.Controls.Navigation assembly'si
içerisinde fakat bu sefer **System.Windows.Navigation** altında gelen
sınıfları kullanmanız gerekiyor. İstediğimiz şey bizim PhoneAppFrame
için bir UriMapper tanımlamak. Böylece uygulama içerisinde vereceğimiz
farklı linkler doğrudan XAP dosyası içerisinde path'lere (Uri'lere)
dönüşebilecek ve uygun XAML dosyası (PhoneAppPage) sahneye gerekli
parametrelerle getirilebilecek.

Örneğimizde sadece bir adet mapping var. Herhangi bir şekilde
**/urun/1** veya **/urun/2** gibi bir adrese yönlendirme yapıldığında
söz konusu sondaki ID'yi alarak XAP dosyası içerisinde **Sayfalar**
klasöründe bulunan **Page1.XAML** adındaki bir dosyaya ID parametresi
olarak gönderiyoruz. Yazım esnasında {Degisken} şeklinde tanımladığınız
her deyim aslında birer local değişken gibi davranarak sizin gelen
path'den bir değeri alarak yarattığınız hedef path'e aktarmnızı
sağlıyor. Bu şekilde tanımlanan Mapping'ler kullandığınız PhoneAppFrame
içerisindeki tüm navigasyonlarda otomatik olarak uygulanacaktır.

![Sayfalar klasörü ve içerisindeki
View'lerimiz....](media/Windows_Phone_7_de_Navigation_API_ve_uygulama_yapisi/03052010_1.png)
*Sayfalar klasörü ve içerisindeki View'lerimiz....*

Tabi bu noktaya kadar biz ne Sayfalar klasörü yarattık ne de içinde
Page1.xaml adında bir dosya var. O nedenle şimdi gelin XAP içerisinde
bir Sayfalar klasörünü yukarıdaki ekran görüntüsündeki gibi yaratalım ve
içerisine de yeni bir "Windows Phone Portrait Page" ekleyelim.

![Uygulamamız yeni bir Page
ekliyoruz.](media/Windows_Phone_7_de_Navigation_API_ve_uygulama_yapisi/03052010_2.png)
*Uygulamamız yeni bir Page ekliyoruz.*

Eklediğimiz bu sayfa bizim daha önce App.XAML içerisinde tanımladığımız
UriMapper'daki kurallar sayesinde çağrılacak. Hatırlarsanız mapping
kuralı içerisinde **Sayfalar/Page1.xaml?ID={ID}** demiştik ve {ID}
yerine de mapping esnasından uygun değer yerleştirilecekti. Peki
Page1.XAML nasıl olacak da bu ID değerine ulaşacak. Her zamanki gibi
Navigation API ile beraber gelen sistemi kullanacağız.

**[C\#]**
```cs
        void Page1_Loaded(object sender, RoutedEventArgs e)
        {
            ListName.Text = this.NavigationContext.QueryString["ID"].ToString();
        }
```

Yukarıda gördüğünüz kod **Page1.XAML** içerisinde gelen ID parametresini
yakalamanın yolu. Normal bir ASP.NET uygulamasını QueryString almaktan
pek farklı değil. Artık sayfa içerisinde gelen parametreye göre farklı
bilgiler gösterebilir, işlemler yapabilirsiniz. Şimdilik örneğimizde
sadece gelen ID'yi ekrana yansıtıyoruz ki test edebilelim.

Mapping sistemimiz hazır, hedef sayfamız hazır ve kendisine gelen
parametreyi dinliyor. Son adım olarak ana sayfada bu hedef sayfaya link
vermek kaldı.

**[XAML]**
```xml
<Grid x:Name="ContentGrid" Grid.Row="1">
    <HyperlinkButton Content="HyperlinkButton"
                            Height="30" HorizontalAlignment="Left"
                            Margin="230,217,0,0" Name="hyperlinkButton1"
                            VerticalAlignment="Top" Width="200"
                            NavigateUri="/urun/1"/>
</Grid>
```

Kodumuzda basit bir **HyperlinkButton** kullanarak tek yapmamız gereken
**NavigateUri** özelliğine istediğimiz Uri'yi vermek. Örneğimizde
**/Urun/1** adresini verdiğimiz bu adres **UriMapper** tarafından
**/Sayfalar/Page1.xaml?ID=1** şekline çevrilecek ve uygulama ekranında
Page1.XAML'ı **1** ID değerini almış olarak göreceğiz. Eğer bu
yönlendirme işlemini doğrudan bir kod ile yapmak isterseniz aşağıdaki
gibi yine **NavigationService** üzerinden **Navigate** metodunu
kullanarak Frame'i yönlendirebilirsiniz.

**[C\#]**
```cs
private void button1_Click(object sender, RoutedEventArgs e)
{
    this.NavigationService.Navigate(new Uri("/urun/2", UriKind.Relative));
}
```

Hepinize kolay gelsin.

*Bu yazi http://daron.yondem.com adresinde, 2010-5-4 tarihinde yayinlanmistir.*
