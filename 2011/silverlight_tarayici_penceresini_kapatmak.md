---
FallbackID: 2677
Title: "Silverlight'tan tarayıcı penceresini kapatmak"
date: "2011-8-31"
EntryID: silverlight_tarayici_penceresini_kapatmak
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight, Silverlight 2.0, Silverlight 3.0, Silverlight 4, Silverlight 5
---
Geçenlerde mail ile gelen sorulardan birinde Silverlight ile tarayıcıyı
kapatmanın mümkün olup olmadığı vardı. Cevaben soruyu soran arkadaşa
"[Silverlight ve JavaScript
Kardeşliği](http://daron.yondem.com/tr/post/a1426eb0-7120-4a66-9d5c-de5027fd59ed)"
yazımı önersem de aslında çok daha basit bir çözüm olabileceği sonradan
aklıma geldi. Tabi yine JavaScript üzerinden ilerleyeceğiz :)

**[C\#]**

<span style="color:blue;">private</span> <span
style="color:blue;">void</span> button1\_Click(<span
style="color:blue;">object</span> sender, <span
style="color:#2b91af;">RoutedEventArgs</span> e)\
{\
    System.Windows.Browser.<span
style="color:#2b91af;">HtmlPage</span>.Window.Invoke(<span
style="color:#a31515;">"close"</span>);\
}

Budur :)


