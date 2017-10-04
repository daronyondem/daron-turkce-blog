---
FallbackID: 2565
Title: Silverlight 5 Beta TrickPlay
PublishDate: 22/4/2011
EntryID: Silverlight_5_Beta_TrickPlay
IsActive: True
Section: software
MinutesSpent: 0
Tags: Silverlight 5
old.EntryID: 0a2038f1-db35-4009-9e22-50313a68cfe8
---
Süper kısa bir posta hoş geldiniz :) Bu aralar böyle birkaç tane süper
kısa yazılarım olacak. Silverlight 5 Beta ile beraber gelen ve önemli
olduğunu düşündüğüm fakat bir o kadar da implementasyonu basit / kolay
özelliklere değinirken konuyu çok da uzatmaya gerek olmadığını
düşünüyorum.

**TrickPlay derken?**

Özellikle PodCast ve WebCast'leri dinlerken / izlerken hiç videonun veya
sesin hızını arttırmayı düşündünüz mü? Özellikle çoğu podcast player bu
işi hali hazırda yapıyor. Silverlight 5 Beta ile beraber bu özellik
Silverlight'taki MediaElement'e de eklendi. Böylece video veya audio,
her ne oynatıyorsanız MediaElement içerisindeki oynatılma hızını
değiştirebiliyorsunuz.

**[XAML]**

<span style="color:#a31515;">     </span><span
style="color:blue;">\<</span><span
style="color:#a31515;">MediaElement</span><span
style="color:red;"> Margin</span><span
style="color:blue;">="80,86,117,94"</span> \
          <span style="color:red;"> PlaybackRate</span><span
style="color:blue;">="2"</span><span
style="color:red;"> Source</span><span
style="color:blue;">="/Kalimba.mp3"/\></span>

XAML kodunda da görebileceğiniz üzere MediaElement'in artık
**PlaybackRate** diye bir özelliği var. Bu özelliğe vereceğiniz Double
bir değer video veya sesin oynatılma hızını etkileyecektir.

*Dikkat dikkat : Bu özelliğin SL5 Beta ile beraber geldiğini söylesem de
:) aslında tam olarak gelmedi. Nasıl yani? MediaElement ile ses dosyası
oynattığınızda PlaybackRate'in çalışmadığını göreceksiniz. Bu durum çok
normal, Beta'da ses dosyalarında PlaybackRate çalışmıyor. Silverlight 5
release olduğunda çalışacak. MediaElement ile Video oynattığınızda
PlaybackRate'i değiştirirseniz bu sefer de videonun etkilendiğini,
duruma göre hızlanıp yavaşladığını fakat hiç ses gelmediğini
göreceksiniz. İşte bu da yine Beta yüzünden :) Bilginize.*


