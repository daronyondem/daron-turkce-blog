---
FallbackID: 1904
Title: "WPF ve LINQ'nun beraber kullanımı"
date: "2007-12-31"
EntryID: WPF_ve_LINQ_nun_beraber_kullanimi
IsActive: True
Section: software
MinutesSpent: 0
Tags: Expression Blend, LINQ, WPF
old.EntryID: 37e6d70c-61b3-4275-b5b9-5ed525b28375
---
Dün mail ile **WPF ve LINQ**'nun beraber kullanılıp kullanılamayacağı
ile ilgili güzel bir soru geldi. Ben bu soruyu hemen ufak bir blog
yazısına çevirerek bilgiyi buradan sizlerle de paylaşmak istiyorum. WPF
ile LINQ'nun beraber kullanılabilmesi aslında WPF'in **.NET Framework
3.5** ile kullanılabilmesine bağlı. WPF esasen .NET Framework 3.0'ın bir
parçasıdır fakat tabi ki .NET Framework 3.5 ile beraber de
kullanılabiliyor hatta 3.5'in 3.0 üzerine geldiğini düşünürsek aslında
WPF 3.5'in de bir parçası. Peki nasıl olacak da bir WPF uygulamasını
.NET Framework 3.5 ile çalışır hale yaratacağız. Aslında cevap pek zor
değil, doğrudan **Visual Studio 2008** kullanabilirsiniz. Tek yapmanız
gereken Visual Studio 2008'in **Multi-Targeting** özelliğinden
faydalanarak .NET Framework 3.5'i seçmek.

![Visual Studio 2008 içerisinde .NET Framework 3.5 ile WPF
Projesi](media/WPF_ve_LINQ_nun_beraber_kullanimi/31122007_1.png)\
*Visual Studio 2008 içerisinde .NET Framework 3.5 ile WPF Projesi*

Aslında esas sorun **Expression Blend** tarafında. Expression Blend
içerisinde yeni bir WPF projesi oluşturmak isterseniz projeniz otomatik
olarak .NET Framework 3.0'ı hedefleyecektir. Bunun nedeni Expression
Blend'in .NET Framework 3.5'ten önce yayınlanmış olması. Bu sorunu
şimdilik çözmek için **Expression Blend 2 December Preview**
kullanabilirsiniz.

![Expression Blend 2 December Preview içerisinde .NET Framework 3.5
desteği.](media/WPF_ve_LINQ_nun_beraber_kullanimi/31122007_2.png)\
*Expression Blend 2 December Preview içerisinde .NET Framework 3.5
desteği.*

Yukarıda Expression Blend 2'nin proje yaratma penceresinde farklı
Framework sürümlerini seçebiliyorsunuz. Tabi tüm bunlara ek olarak
unutmamak gerek ki projenizi .NET Framework 3.5 desteği ile Visual
Studio 2008 içerisinde yarattıktan sonra Expression Blend'in yayında
olan sürümüyle de söz konusu projeyi açarak düzenleyebilirsiniz. Sorun
sadece yeni proje yaratırken karşımıza çıkıyor.

.NET Framework 3.5 ile bir WPF uygulaması yaratırken tüm .NET Framework
3.5 projelerinde olduğu gibi WPF ile de LINQ'yu rahatlıkla
kullanabilirsiniz.

Hepinize mutlu yıllar :)


