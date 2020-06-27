---
FallbackID: 2306
Title: "Silverlight içerisinde sayfa adresine ulaşmak"
date: "2009-1-14"
EntryID: Silverlight_icerisinde_sayfa_adresine_ulasmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 2.0
old.EntryID: 61a4778c-3db2-4d0c-a746-638879c29c15
---
# Silverlight içerisinde sayfa adresine ulaşmak
Bugünlerde bana sıkça gelen sorulardan biri Silverlight tarafından
uygulamanın çalıştığı adresin nasıl alınacağı ile ilgili oluyor. Aslında
basit bir şekilde Silvetlight'tan DOM'a çıkmanız bunun için yeterli
olacaktır. Peki bunu nasıl yaparız?

Silverlight içerisinden DOM'a çıkmak için yolculuğunuzun başlayacağını
namespace System.Windows.Browser namespace'i olacaktır. Bu NameSpace
içerisinden ister sayfadaki JavaScript metodlarına ulaşır ister
sayfadaki HTML elementlerine ulaşabilirsiniz.

**[C\#]**

<span
style="color: #2b91af;">MessageBox</span>.Show(System.Windows.Browser.<span
style="color: #2b91af;">HtmlPage</span>.Document.DocumentUri.AbsoluteUri.ToString());

Yukarıda gördüğünüz kod Silverlight uygulamanızın çalıştığı sayfanın tam
yolunu verecektir. **DocumentUri** üzerinden giderek bu adrese ait
farklı bilgileri de alabilirsiniz.

Hepinize kolay gelsin.



*Bu yazi http://daron.yondem.com adresinde, 2009-1-14 tarihinde yayinlanmistir.*
