---
FallbackID: 2276
Title: "Silverlight 2 DataGrid yenilendi! Aralık 2008 sürümü karşınızda."
date: "2008-12-15"
EntryID: Silverlight_2_DataGrid_yenilendi_Aralik_2008_surumu_karsinizda
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 36631106-ca05-4c00-b143-4d933cefad78
---
# Silverlight 2 DataGrid yenilendi! Aralık 2008 sürümü karşınızda.
Silverlight 2.0 ile beraber gelen DataGrid'in aslında SDK paketi ile
beraber geldiğini biliyoruz. Yani normal şartlarda DataGrid Silverlight
Runtime içerisinde bulunmuyor. Haricinde bir DLL içerisinde yer alan
DataGrid'i referans alarak projenize eklemeniz ve o şekilde ilerlemeniz
şart. Durum böyle olunca tabi ki bu kontrolleri yenilemek, upgrade ve
update'ler sunmak da kolaylaşıyor.

Silverlight 2 DataGrid için yeni bir Aralık 2008 sürümü yayınlandı.
Gelen yenilikler ve değişikliklerle ilgili ufak bir liste yapmak
gerekirse;

-   30'a yakın bug giderildi.
-   Focus alan satırlar ItemsSource değiştiğinde görünmez olmuyor.
-   Sorting yapıldığında artık Selection kaybolmuyor.
-   DataGrid içerisinde Popup açan kontroller artık DataGrid'in editin
    mode'undan çıkmasına neden olmuyor.
-   Geliştirilmiş FrozenColumn
-   Selection artık CurrentCellChanged event'ı ile güncelleniyor.

**Peki nasıl kullanırız?**

Eğer Visual Studio içerisinde Toolbox'ı kullanıyorsanız (ki şimdilik
Silverlight 2.0'da tavsiye etmiyorum) işiniz biraz zor olacak.
Kullanıcınıza ait AppData\\Local veya Local Settings\\Application Data
içerisinde Toolbox ile başlayan tüm dosyaları silmelisiniz. Silverlight
2.0 SDK'yı yüklediğiniz yerdeki **System.Windows.Controls.Data.dll** ve
**System.Windows.Controls.Data.Design.dll** dosyalarını download
edecekleriniz ile değiştirdiğinizde aslında işlem tamamlanmış oluyor.
Tabi daha önce bu DLL'leri kullandığınız tüm projelerdeki reference'ları
da güncellemeniz şart.

Download adresi :
<http://www.microsoft.com/downloads/details.aspx?FamilyID=084a1bb2-0078-4009-94ee-e659c6409db0&displaylang=en>

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-12-15 tarihinde yayinlanmistir.*
