#include <iostream>
#include <memory>
#include "Book.h"
#include "PictureBook.h"
#include "Magazine.h"
#include "Library.h"
#include "InvalidBookException.h"

int main() {
    try {
        Library library;

        // יצירת ספרים והוספתם לספרייה
        auto book1 = std::make_shared<Book>("הארי פוטר", "ג'יי קיי רולינג", 1997, "קריאה", "ילדים");
        auto book2 = std::make_shared<Book>("מלחמת העולם", "יובל נח הררי", 2014, "לימוד", "מבוגרים");
        auto book3 = std::make_shared<PictureBook>("הנסיך הקטן", "אנטואן דה סנט-אכזופרי", 1943, "קריאה", "ילדים",
                         "אנטואן דה סנט-אכזופרי", "ציור רגיל");
        auto book4 = std::make_shared<PictureBook>("טינטין", "הרז'ה", 1929, "קריאה", "ילדים", "הרז'ה", "קומיקס");

        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        library.addBook(book4);

        // יצירת מגזינים והוספתם לספרייה
        auto mag1 = std::make_shared<Magazine>("טבע הדברים", 45, "01/2024", 3);
        mag1->addCompany("הוצאת עם עובד");
        mag1->addCompany("הוצאת כתר");

        auto mag2 = std::make_shared<Magazine>("מדע פופולרי", 120, "02/2024", 2);
        mag2->addCompany("הוצאת ידיעות אחרונות");

        auto mag3 = std::make_shared<Magazine>("טבע הדברים", 46, "02/2024", 3);
        mag3->addCompany("הוצאת עם עובד");

        library.addMagazine(mag1);
        library.addMagazine(mag2);
        library.addMagazine(mag3);

        // הצגת כל האוסף
        std::cout << "=== האוסף המלא ===" << std::endl;
        library.ShowCollection();

        // הצגת ספרי תמונות בלבד
        std::cout << "\n";
        library.ShowPictureBook();

        // הצגת ספרים משנת 1943
        std::cout << "\n=== ספרים משנת 1943 ===" << std::endl;
        auto booksFrom1943 = library.ShowBooksInYear(1943);
        for (const auto& book : booksFrom1943) {
            book->display();
        }

        // מחיקת כל המגזינים מסוג "טבע הדברים"
        std::cout << "\n=== מחיקת מגזינים מסוג 'טבע הדברים' ===" << std::endl;
        library.RemoveMagazinesFromYear("טבע הדברים");

        std::cout << "\n=== האוסף לאחר המחיקה ===" << std::endl;
        library.ShowCollection();

        // שמירת האוסף לקובץ
        library.SaveCollection("library_collection.txt");
        std::cout << "\nהאוסף נשמר בהצלחה לקובץ library_collection.txt" << std::endl;

        // בדיקת חריגה - ספר עם שם ריק
        std::cout << "\n=== בדיקת חריגה ===" << std::endl;
        try {
            auto invalidBook = std::make_shared<Book>("", "מחבר כלשהו", 2020, "קריאה", "מבוגרים");
        }
        catch (const InvalidBookException& e) {
            std::cout << "נתפסה חריגה: " << e.what() << std::endl;
        }

    }
    catch (const std::exception& e) {
        std::cerr << "שגיאה: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
