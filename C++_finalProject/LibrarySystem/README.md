# 📚 Library Management System — C++

מערכת לניהול ספרייה הכוללת ספרים, ספרי תמונות ומגזינים.  
הפרויקט מדגים עקרונות מרכזיים בשפת C++ כגון ירושה, פולימורפיזם, ניהול זיכרון, חריגות, ומצביעים חכמים.

---

## 🗂️ מבנה הפרויקט

```
LibrarySystem/
├── Book.h                  # מחלקת בסיס לספר
├── PictureBook.h           # ספר תמונות – יורש מ-Book
├── Magazine.h              # מגזין עם מערך דינמי + Rule of 5
├── InvalidBookException.h  # חריגה מותאמת אישית
├── FileHandler.h           # ניהול כתיבה לקובץ
├── Library.h               # מחלקת הספרייה הראשית
├── main.cpp                # תוכנית ראשית עם דוגמאות
└── README.md               # קובץ זה
```

---

## 🧱 מחלקות

### 📖 `Book`
מחלקת הבסיס של כל ספר במערכת.

| שדה | סוג | תיאור |
|-----|-----|--------|
| `name` | `string` | שם הספר |
| `author` | `string` | שם המחבר |
| `year` | `int` | שנת הוצאה לאור |
| `category` | `string` | קטגוריה (קריאה, לימוד...) |
| `level` | `string` | רמה (ילדים, מבוגרים, גיל הרך...) |

**פונקציות:** קונסטרקטור, `display()` וירטואלית, getters.

---

### 🖼️ `PictureBook` ← יורש מ-`Book`
מוסיף שדות ייחודיים לספר תמונות.

| שדה | סוג | תיאור |
|-----|-----|--------|
| `illustrator` | `string` | שם הצייר |
| `illustrationType` | `string` | סוג ציור: `"Comic"` / `"Regular"` |

**פונקציות:** קונסטרקטור, דריסת `display()` — מציגה גם את פרטי הצייר.

---

### 📰 `Magazine`
מגזין עם מערך דינמי של חברות מוציאות לאור.

| שדה | סוג | תיאור |
|-----|-----|--------|
| `magazineName` | `string` | שם המגזין |
| `issueNumber` | `int` | מספר גיליון |
| `publishDate` | `string` | תאריך הוצאה לאור |
| `publishers` | `string*` | מערך דינמי של חברות |
| `maxSize` | `int` | קיבולת מקסימלית של המערך |
| `currentSize` | `int` | מספר החברות הנוכחי |

**פונקציות:**
- `addPublisher()` — מוסיפה חברה; מכפילה את גודל המערך אם מלא
- `getPublishers()` — מחזירה `vector<string>` של כל החברות
- `toString()` — מדפיסה את פרטי המגזין בפורמט מסודר

**Rule of 5 מיושם במלואו:**
| | תיאור |
|--|-------|
| Copy Constructor | העתקה עמוקה של המערך |
| Move Constructor | גניבת המצביע מהאובייקט המקורי |
| Copy Assignment | שחרור זיכרון קיים + העתקה עמוקה |
| Move Assignment | שחרור זיכרון קיים + גניבת מצביע |
| Destructor | שחרור המערך הדינמי |

---

### ⚠️ `InvalidBookException`
חריגה מותאמת אישית הנזרקת כאשר:
- שם הספר ריק
- שם המחבר ריק

יורשת מ-`std::exception` ומממשת `what()`.

---

### 💾 `FileHandler`
מחלקה לניהול כתיבה לקובץ טקסט.

| שדה | סוג | תיאור |
|-----|-----|--------|
| `file` | `std::ofstream` | אובייקט הקובץ |
| `buffer` | `char*` | זיכרון דינמי לאחסון מחרוזת |

**פונקציות:**
- קונסטרקטור — פותח קובץ, זורק `runtime_error` אם נכשל
- `write(data)` — כותבת מחרוזת לקובץ
- `setBuffer(data)` — מקצה זיכרון חדש ומעתיקה את המחרוזת
- דסטרקטור — סוגר קובץ ומשחרר זיכרון

---

### 🏛️ `Library`
מחלקת הספרייה הראשית שמנהלת את כל האוסף.

| שדה | סוג | תיאור |
|-----|-----|--------|
| `books` | `vector<unique_ptr<Book>>` | אוסף הספרים |
| `magazines` | `vector<shared_ptr<Magazine>>` | אוסף המגזינים |

**פונקציות:**

| פונקציה | תיאור |
|---------|--------|
| `addBook(unique_ptr<Book>)` | מוסיפה ספר לאחר ולידציה |
| `addMagazine(shared_ptr<Magazine>)` | מוסיפה מגזין |
| `showCollection()` | מציגה את כל הספרים והמגזינים |
| `showPictureBooks()` | מציגה רק ספרי תמונות (dynamic_cast) |
| `showBooksInYear(year)` | מחזירה ספרים משנה מסוימת (lambda) |
| `removeMagazinesByName(name)` | מוחקת כל גיליונות מגזין לפי שם (lambda) |
| `saveCollection(filename)` | שומרת את האוסף לקובץ דרך FileHandler |

---

## ✨ עקרונות C++ שמיושמים

| עיקרון | היכן |
|--------|------|
| ירושה | `PictureBook` ← `Book` |
| פולימורפיזם | `display()` וירטואלית |
| Rule of 5 | `Magazine` |
| `unique_ptr` | ניהול ספרים ב-Library |
| `shared_ptr` | ניהול מגזינים ב-Library |
| Lambda expressions | `showBooksInYear`, `removeMagazinesByName` |
| `dynamic_cast` | `showPictureBooks` |
| חריגות מותאמות | `InvalidBookException` |
| ניהול זיכרון ידני | `Magazine::publishers`, `FileHandler::buffer` |

---

## 🔨 הידור והרצה

### דרישות מקדימות
- מהדר C++ התומך ב-**C++17** ומעלה
- `g++` (MinGW / GCC) **או** Visual Studio

---

### ▶️ הידור עם g++ (שורת פקודה)

**שלב 1 — פתח את שורת הפקודה (cmd)**

לחץ `Win + R`, הקלד `cmd` ולחץ Enter.

**שלב 2 — נווט לתיקיית הפרויקט**

```cmd
cd "c:\Users\Tamar\Desktop\כיתה ו\שיעורי בית\projects\C++_finalProject\LibrarySystem"
```

**שלב 3 — הידור**

```cmd
g++ -std=c++17 -o library main.cpp
```

**שלב 4 — הרצה**

```cmd
library.exe
```

---

### ▶️ הידור עם Visual Studio

1. פתח **Visual Studio**
2. בחר `File` → `New` → `Project`
3. בחר **Console App (C++)**
4. מחק את הקוד הקיים ב-`main.cpp`
5. העתק את כל קבצי ה-`.h` ואת `main.cpp` לתיקיית הפרויקט
6. לחץ **Ctrl+Shift+B** להידור
7. לחץ **Ctrl+F5** להרצה

---

### ▶️ הידור עם VS Code

1. התקן את התוסף **C/C++** מ-Microsoft
2. פתח את תיקיית הפרויקט ב-VS Code
3. פתח טרמינל (`Ctrl + `` ` ``)
4. הרץ:
```bash
g++ -std=c++17 -o library main.cpp
./library
```

---

## 📄 פלט לקובץ

לאחר הרצה, ייווצר קובץ `library_collection.txt` בתיקיית הפרויקט עם התוכן:

```
=== Books ===
Harry Potter
Clean Code
The Lion King
Spider-Man
The Hobbit
=== Magazines ===
Time - Issue 55
```

> מגזיני National Geographic נמחקו לפני השמירה בדוגמה שב-main.

---

## 📌 דוגמת פלט בקונסול

```
=== Books ===
Book: Harry Potter | Author: J.K. Rowling | Year: 1997 | Category: Fiction | Level: Children
Book: Clean Code | Author: Robert Martin | Year: 2008 | Category: Learning | Level: Adults
...

=== Magazines ===
-----------------------------
  Magazine   : National Geographic
  Issue      : 101
  Date       : 2023-01
  Publishers : NatGeo Inc., Science Press
-----------------------------

=== Books from 1997 ===
Book: Harry Potter | Author: J.K. Rowling | Year: 1997 | Category: Fiction | Level: Children

Caught exception: Book name cannot be empty.
Caught exception: Book author cannot be empty.
```
