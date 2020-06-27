---
FallbackID: 1754
Title: "Access 2007 Connection String ve Sunucu Yüklemesi"
date: "2007-8-14"
EntryID: Access_2007_Connection_String_ve_Sunucu_Yuklemesi
IsActive: True
Section: software
MinutesSpent: 0
Tags: ASP.NET, Access 2007
old.EntryID: 52761662-3578-4fd0-bbd1-a261011d5f6f
---
Yeni **Office 2007** ile beraber gelen yeni dosya formatlarına da
alışmaya başladık. Bu yeni dosya formatlarından biri de **Access 2007**
ile beraber gelen **accdb** uzantılı veritabanı dosyaları. Yeni bir
veritabanından bahsediyorsak tabi ki bu veritabanı için yeni bir de
**Connection String**imizin olması gerekiyor. Eğer projelerinizde siz
de benim gibi artık Access 2007 veritabanlarına geçiş yapmayı
düşünüyorsanız aşağıdaki yeni "Connection String"imizi
kullanabilirsiniz.

```
Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\veritabani1.accdb;Persist Security Info=False;
```

Ek olarak, eğer veritabanı bağlantınızda şifre kullanacaksanız, şifre
bilgisini de aşağıdaki şekilde ekleyebilirsiniz.

```
Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\veritabani1.accdb;Jet OLEDB:Database Password=MyDbPassword;
```

Tüm bunları yapmış olmak aslında yeterli değil. Eğer **Access 2007**
veritabanını **Office 2007** yüklü olmayan bir bilgisayarda kullanmak
isterseniz veya bir web sitesinde **Access 2007** veritabanı kullanacak
olursanız dikkat etmeniz gereken bir nokta var. Yukarıda yazmış
olduğumuz **"Connection String"** ile hedef bilgisayarda, yani web
sitenizin çalışacağı sunucuda veya programınızın çalışacağı bilgisayarda
**Access 2007** veritabanına ulaşabilmeniz için [2007 Office System
Driver: Data Connectivity
Components](http://www.microsoft.com/downloads/details.aspx?familyid=7554F536-8C28-4598-9B72-EF94E038C891&amp;displaylang=en)'ın
sistemde yüklü olması gerekiyor. Özellikle **Access 2007** veritabanı
kullanacağınız web siteleri için satın aldığınız barındırma hizmetleri
ile ilgili sorun yaşamanız olası. Bu durumda "Hosting" şirketinizi
arayarak durumdan haberdar etmeniz ve sunucuya gerekli araçları
yüklemelerini sağlamanız gerekiyor. Aksi halde hiçbir şekilde **Access
2007** veritabanınıza ulaşma şansınız olmayacaktır.

Access 2003 - 2007 upgrade sürecinde hepinize iyi şanslar ;)


