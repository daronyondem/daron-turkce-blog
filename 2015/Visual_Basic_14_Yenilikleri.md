---
FallbackID: 2958
Title: Visual Basic 14 Yenilikleri
PublishDate: 3/10/2015
EntryID: Visual_Basic_14_Yenilikleri
IsActive: True
Section: software
MinutesSpent: 100
Tags: Visual Basic .NET
---
Yavaş yavaş bir sonraki .NET sürümüne doğru yaklaştığımız bu günlerde gelin bu yazıda Visual Basic 14 ile beraber neler geliyor? Neler değişiyor bir göz atalım. 

```VB
Interface IAtlar
    Sub Hop(kacDefa As Integer)
End Interface

Interface IZiplar
    Sub Hop(kacDefa As Long)
End Interface

Interface ITavsan : Inherits IAtlar, IZiplar
    Overloads Sub Hop(kacDefa As Decimal)
End Interface
```

İlk olarak aslında yeni bir özellik değil de bir bug-fix'den bahsetmek istiyorum. Esasen bug da değil :) Her neyse, yukarıdaki manzarayı VB 14 öncesi yaratabilmek mümkün olmazken C# ile yapılabiliyordu. Bu durumda da tabi ki bu şekilde C# ile yazılmış kodların VB ile çağrılmasında sıkıntılar oluyordu. Bu durum artık düzeldi :)

```VB
Public Class Tavsan
    Implements ITavsan  
    Public Sub Hop(kacDefa As Long) Implements IZiplar.Hop
\#Region "Tehlikeli"
        Throw New NotImplementedException()
    End Sub  
    Public Sub Hop(kacDefa As Integer) Implements IAtlar.Hop
        Throw New NotImplementedException()
\#End Region
    End Sub  
    Public Sub Hop(kacDefa As Decimal) Implements ITavsan.Hop
        Throw New NotImplementedException()
    End Sub
End Class
```

Basit noktalardan devam ediyorum, heyecanlıları sona saklıyorum :) Artık Region'larınızı metod içinde hatta birden çok metodundan içinden dışından istediğiniz gibi kullanabilirsiniz. Kullanmasanız daha iyi olabilir, bence :D

```VB
Partial Interface ITavsan : Inherits IAtlar, IZiplar
    Overloads Sub Hop(kacDefa As Decimal)
End Interface  
Partial Module ExtendMyExtensions
End Module
```

Artık Partial Interface ve Module de var! Code-Generation her yerde :)

```VB
\#Disable Warning BC42353
Class MainWindow
    Public Function Something() As Integer    
    End Function
End Class
\#Enable Warning BC42353
```

VB'ye de Preprocessor olarak "Warning"leri kapatabilme özelliği geldi. Örneğin yukarıdaki metod bir return value döndürmemesine rağmen normal şartlarda verilmesi gereken hata olan 42353 artık o kod bloğu için verilmiyor. Aslına bakasanız hem bir önceki hem de bu yenilik cross-platform development desteğine yarıyor :) çaktırmayın.

```VB
If Not TypeOf sender Is Button Then
```

Yukarıdaki kodda yeni bir durum yok. Fakat bu gibi bir durumda IsNot kullanamamak kendimi VB yazarken en garip hissettiğim anlardan biri olmuştur yıllardır. İngilizce olarak okunması da çok acı verici bir kod zaten :) Oysa VB İngilizceye yakınlığı ile bilinir.

```VB
If TypeOf sender IsNot Button Then
```

Artık adam gibi, yukarıdaki gibi yazabiliyoruz :) Oh be!

```VB
Structure OrnekStruct
    Sub New()
        'Ben geldim!
    End Sub
End Structure
```

Struct'lara parametresiz constructor geldi! Eğer "New" diyerek structınızı yaratırsanız constructor çalışacak. İstemiyorsanız Nothing diyerek de structı alabilirsiniz. Bu durumda constructor çalışmayacak.

```VB
Dim arkadaslar = {"Örnek", 'Buraya yorum yazsak?
            "Örnek2"}
```

Sanırım yukarıdaki manzarayı açıklamama gerek yok. Eskiden oraya yorum yazmak mümkün değildi. Özellikle çoklu satırlı LINQ sorgularında bu durum çok işe yarayacak.

```VBPublic Function Something() As Integer  
End Function  
Private Sub Grid_Loaded(sender As Object, e As RoutedEventArgs)
    MessageBox.Show(NameOf(Something))
End Sub
```

NameOf yeni gelen bir operatör. Artık elle property adı yazmaya son. 

```VB
Dim nasil = "sevgili;"
Dim metin = $"Merhaba {nasil} dünya!"
```

Tahmin edin bakalım yukarıda neler oluyor? :) Zamana ihtiyacınız olabilir, itiraf ediyorum. En güzellerini ve bir o kadar da tehlikelileri sona saklayacağımı söylemiştim sanırım. Aslında yukarıda yapılan bildiğimiz String.Format'tan farklı değil ;) Sadece yazması daha kolay.

```VB
Dim Metin = "Hoppala paşam
                malkara keşan"
MessageBox.Show(metin)
```

Budur! :) Artık çoklu satırlı metinleri içeri almak için XML-Literals kullanmaya gerek yok. 

```VB
Public ReadOnly Property Adi As String = ""
```

Artık Read-Only Auto Property sahibi olabilirsiniz.

```VB
Dim adi = BirUrun?.Adi
```

İşte geldik en bomba hareketlerden birine. Yeni bir operatör daha karşınızda. Yukarıdaki kod aslında aşağıdaki işi yapıyor.

```VB
If BirUrun IsNot Nothing Then
    adi = BirUrun.Adi
End If
```

Olay bu kadar basit olsa aslında :)

Visual Basic kullanan şurada bir elin parmakları kadar kalmış olsak da Rosyln ve Language Parity idealizmi çerçevesinde bu yeniliklere sahip olabilmek güzel ;) 

Görüşmek üzere.

*[Dikkat: Bu yazının içeriğinde bahsedilen konular 23 Şubat tarihinde yayınlanmış olan Visual Studio 2015 CTP 6 kullanılarak düzenlenmiştir.]*
