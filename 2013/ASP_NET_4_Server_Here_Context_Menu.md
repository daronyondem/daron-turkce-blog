# ASP.NET Server Here Context Menü - Güncelleme
Birkaç yıldır bloğumu takip edenler hatırlayacaktır. [ASP.NET Web Server
Here Context menü
extension](http://daron.yondem.com/tr/post/2efde635-a690-4339-91b1-02dc870a08de)'ı
hakkında 2.0 zamanlarında bir yazı yazmıştım. Hatta söz konusu toolun
[source
code'u](http://daron.yondem.com/en/post/3dd88a31-b300-4849-9243-%0A%0A9f1ab3d22597)
da İngilizce bloğumda vardı :)

Arada epey zaman geçti ve artık o kadar meşakkatli işlere gerek yok :)
Yeni hali ile "ASP.NET 4 Web Server Here" context menüsünü kullanmak
isteyenler basit bir Registry ayarı ile bu işlevselliğe kavuşabilirler.

``` {style="margin-left:40px"}
[32 bit (x86)]
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\VS2010 WebServer]
@="ASP.NET 4 Web Server Here"
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\VS2010 WebServer\command]
@="C:\\Program Files\\Common Files\\microsoft shared\\DevServer
\\10.0\\Webdev.WebServer40.exe /port:8086 /path:\"%1\""

[64 bit (x64)]
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\VS2010 WebServer]
@="ASP.NET 4 Web Server Here"
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell\VS2010 WebServer\command]
@="C:\\Program Files (x86)\\Common Files\\microsoft shared\\DevServer
\\10.0\\Webdev.WebServer40.exe /port:8086 /path:\"%1\""
```

Direk registry dosyasını download etmek isteyenler için de linkimiz
mevcut :)

[ASP.NET Web Server Here Registry Dosyaları - registry.zip (703
Bytes)](media/ASP_NET_4_Server_Here_Context_Menu/registry.zip)

Görüşmek üzere.



*Bu yazi http://daron.yondem.com adresinde, 2013-10-17 tarihinde yayinlanmistir.*
