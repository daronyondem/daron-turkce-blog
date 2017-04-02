---
FallbackID: 2682
Title: ASP.NET 4.0 UrlRouting Deployment Problemi
PublishDate: 9/3/2011
EntryID: ASP_NET_4_0_UrlRouting_Deployment_Problemi
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, ASP.NET 4.0, IIS 7.0
---
Herkese Günaydın! :) ASP.NET 4.0'daki[UrlRouting
hakkında](http://daron.yondem.com/tr/post/e6f2b81a-defc-4255-ba19-d0071526aadf)
çoook önceleri, evet 2 yıl önce bir blog yazısı yazmıştım. Blog'u
yazarken de bu mekanizmayı kullandım. Deployment esnasından Web.Config
içerisinde yapmak zorunda kaldığım bir değişikliği sizlerle de paylaşmak
istiyorum ki siz de herşey bitip siteyi deploy ettikten sonra "Neden
çalışmıyor bu?" diye kıvranmayın.

**[Web.Config]**

<span style="color:blue;">    \<</span><span
style="color:#a31515;">system.webServer</span><span
style="color:blue;">\></span>\
<span style="color:blue;">        \<</span><span
style="color:#a31515;">validation</span><span
style="color:blue;"> </span><span
style="color:red;">validateIntegratedModeConfiguration</span><span
style="color:blue;">=</span>"<span
style="color:blue;">false</span>"<span style="color:blue;"> /\></span>\
<span style="color:blue;">        \<</span><span
style="color:#a31515;">modules</span><span
style="color:blue;"> </span><span
style="color:red;">runAllManagedModulesForAllRequests</span><span
style="color:blue;">=</span>"<span style="color:blue;">true</span>"<span
style="color:blue;">\></span>\
<span style="color:blue;">          \<</span><span
style="color:#a31515;">remove</span><span
style="color:blue;"> </span><span style="color:red;">name</span><span
style="color:blue;">=</span>"<span
style="color:blue;">UrlRoutingModule</span>"<span
style="color:blue;">/\></span>\
<span style="color:blue;">          \<</span><span
style="color:#a31515;">add</span><span style="color:blue;"> </span><span
style="color:red;">name</span><span style="color:blue;">=</span>"<span
style="color:blue;">UrlRoutingModule</span>"<span
style="color:blue;"> </span><span style="color:red;">type</span><span
style="color:blue;">=</span>"<span
style="color:blue;">System.Web.Routing.UrlRoutingModule, System.Web, \
               
Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a</span>"<span
style="color:blue;"> /\></span>\
<span style="color:blue;">        \</</span><span
style="color:#a31515;">modules</span><span
style="color:blue;">\></span>\
<span style="color:blue;">        \<</span><span
style="color:#a31515;">handlers</span><span
style="color:blue;">\></span>\
<span style="color:blue;">          \<</span><span
style="color:#a31515;">add</span><span style="color:blue;"> </span><span
style="color:red;">name</span><span style="color:blue;">=</span>"<span
style="color:blue;">UrlRoutingHandler</span>"<span
style="color:blue;"> </span><span
style="color:red;">preCondition</span><span
style="color:blue;">=</span>"<span
style="color:blue;">integratedMode</span>"<span
style="color:blue;"> </span><span style="color:red;">verb</span><span
style="color:blue;">=</span>"<span style="color:blue;">\*</span>"<span
style="color:blue;"> </span><span style="color:red;">path</span><span
style="color:blue;">=</span>"<span
style="color:blue;">UrlRouting.axd</span>"<span style="color:blue;"> \
               </span><span style="color:red;">type</span><span
style="color:blue;">=</span>"<span
style="color:blue;">System.Web.HttpForbiddenHandler, System.Web,</span>\
<span style="color:blue;">                         
Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a</span>"<span
style="color:blue;">/\></span>\
<span style="color:blue;">        \</</span><span
style="color:#a31515;">handlers</span><span
style="color:blue;">\></span>\
<span style="color:blue;">    \</</span><span
style="color:#a31515;">system.webServer</span><span
style="color:blue;">\></span>

İşte yukarıda gördüğünüz handler ve modüllerin siteye eklenmesi
gerekiyor. Bunlar esasında IIS ayarları fakat IIS7 ile beraber
biliyorsunuz bu ayarlar sitenin[Web.Config dosyasında
saklanıyor](http://daron.yondem.com/tr/post/c1a37cdf-9edc-4c68-a3f9-92198b0cfaed),
o nedenle rahatlıkla bu satırları ekleyip tüm sorunları çözebilirsiniz.
Unutmadan ufak bir hatırlatma daha yapiyim. Tüm bunların çalışması için
IIS'te site'ın bulunduğu Application Pool'un Integrated Mode'da olması
da şart.

Sabah sabah ufak bir ipucu ile güne başlamanın verdiği rahatlık ile :)
görüşmek üzere!


