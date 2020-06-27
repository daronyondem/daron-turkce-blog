---
FallbackID: 2261
Title: "The silverlight managed debugging package isn't installed, yani?"
date: "2008-11-29"
EntryID: The_silverlight_managed_debugging_package_isnt_installed_yani
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: dac6d77c-4d4a-4e25-98fa-9bc9956174b2
---
Son dönemde mail olarak aldığım en sık Silverlight development
sorunlarından biri ile ilgili hızlı bir çözümü sizlerle paylaşmak
istiyorum. Özellikle Silverlight Tools paketini şans eseri eksik
yükleyenler veya makinalarına önce RC paketini yükleyenler sonrasında
bir anda Debuging konusunda sorunlar ile boğuşmak zorunda
kalabiliyorlar. Daha önceside Beta sürümlerini makinelerine
yükleyenlerden hiç bahsetmek bile istemiyorum :)

Sonuç itibari ile RC ile beraber gelen Visual Studio araçları rahatlıkla
kullanılabilir olsa da bazı makinelerde Silverlight tam olarak Release
olduktan sonra Plug-In otomatik olarak kendisini update etmiş ve SL
2.0'ın son halini almış. Bu adımdan sonra kullanıcılar Silverlight Tools
paketini yüklediklerinde sistemde zaten SL 2.0 yüklü olduğu için paket
içerisinde SL 2.0 Runtime'ı sisteme yüklenmiyor. Oysa o Runtime ile
normalde kullanıcılara Update mekanizmaları ile gönderilen Runtime
arasında farklılıklar var :)

**The silverlight managed debugging package isn't installed.**

İşte tam da bu farklılıklar sizin Visual Studio 2008 içerisinde Debuging
yaparken Runtime ile Visual Studio arasındaki Debug ilişkisini tutturan
farklılıklar :) O nedenle ne yapmanız lazım? Silverlight 2.0'ın
Developer Runtime'ını yüklemeniz gerek :) Aksi halde yazımın
başlığındaki hata ile ömür boyu uğraşmak zorunda kalabilirsiniz :)

Silverlight 2.0 Developer Runtime (Win) -
<http://go.microsoft.com/fwlink/?LinkId=119972>\
Silverlight 2.0 Developer Runtime (Mac) -
<http://go.microsoft.com/fwlink/?LinkId=119973>


