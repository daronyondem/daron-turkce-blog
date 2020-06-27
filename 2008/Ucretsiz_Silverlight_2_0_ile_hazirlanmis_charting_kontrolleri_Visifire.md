---
FallbackID: 2163
Title: "Ücretsiz Silverlight 2.0 ile hazırlanmış charting kontrolleri": Visifire
date: "2008-8-24"
EntryID: Ucretsiz_Silverlight_2_0_ile_hazirlanmis_charting_kontrolleri_Visifire
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 7f296587-2b2d-402b-a003-8beaa8b04da1
---
# Ücretsiz Silverlight 2.0 ile hazırlanmış charting kontrolleri
Silverlight 2.0 ile hazırlanmış ASP.NET sunucu kontrollerine adım adım
yaklaştığımız bu günlerde "**Charting**" kontrolleri cephesinde
**Visifire** adında bir paket ücretsiz olması ile beraber büyük
olanaklar sağlıyor. Aşağıdaki adresi ziyaret ederek hemen kendi
şablonlarınızı seçip verinizi de girerek size uygun Silverlight 2.0
Charting uygulamasının hazırlanmasını sağlayabilirsiniz.

<http://www.visifire.com/silverlight_chart_designer.php>

Uygulama hazırlandıktan sonra sitenin alt kısmında yer alan "View HTML"
düğmesine basarak hazırladığınız grafiği stienize hangi kodlar ile
yerleştirebileceğinizi görebilirsiniz. Eğer "Embed XML" işaretini
kaldırırsanız uygulamanın harici bir XML dosyasından veri almasını da
sağlayabilirsiniz. Normal şartlarda "Embed XML" işaretlenmediğinde site
size aşağıdaki gibi bir JavaScript kodu verecektir.

    \<script language="javascript" type="text/javascript"\>\
         var vChart = new Visifire("Visifire.xap",500,300);\
        vChart.setDataUri("**Data.xml**");\
         vChart.render("VisifireChart");\
    \</script\>

Bu kodun içerisinde "Data.XML" adresini rahatlıkla farklı bir Generic
Handler'a bağlayarak dinamik veri bağlantısı yapabilirsiniz. Böylece
site her açıldığında güncel XML ile Silverlight 2.0 grafiği ekrana
gelecektir.

Visifire Chart'larının sitenizde çalışması için aşağıdaki adresten
gerekli XAP dosyasını ve visifire.js adındaki harici JavaScript
dosyasını indirerek sitenize kopyalamanız gerekiyor.

<http://www.visifire.com/downloads/visifire_v1.1.1.zip>

Aşağıdaki adresten oluşturabileceğiniz Chart çeşitlerinizi ve çalışan
örneklerini de inceleyebilirsiniz.

<http://www.visifire.com/silverlight_charts_gallery.php>

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2008-8-24 tarihinde yayinlanmistir.*
