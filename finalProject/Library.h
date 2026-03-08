#pragma once
#include <vector>
#include <memory>
#include <algorithm>
#include "Book.h"
#include "PictureBook.h"
#include "Magazine.h"
#include "FileHandler.h"

class Library {
private:
    std::vector<std::shared_ptr<Book>> books;
    std::vector<std::shared_ptr<Magazine>> magazines;

public:
    void addBook(std::shared_ptr<Book> book) {
        books.push_back(book);
    }

    void addMagazine(std::shared_ptr<Magazine> magazine) {
        magazines.push_back(magazine);
    }

    void ShowCollection() const {
        std::cout << "=== ספרים ===" << std::endl;
        for (const auto& book : books) {
            book->display();
        }
        std::cout << "\n=== מגזינים ===" << std::endl;
        for (const auto& magazine : magazines) {
            std::cout << magazine->ToString() << std::endl << std::endl;
        }
    }

    void ShowPictureBook() const {
        std::cout << "=== ספרי תמונות ===" << std::endl;
        for (const auto& book : books) {
            if (auto pb = std::dynamic_pointer_cast<PictureBook>(book)) {
                pb->display();
            }
        }
    }

    std::vector<std::shared_ptr<Book>> ShowBooksInYear(int year) const {
        std::vector<std::shared_ptr<Book>> result;
        std::copy_if(books.begin(), books.end(), std::back_inserter(result),
                     [year](const std::shared_ptr<Book>& book) { return book->getYear() == year; });
        return result;
    }

    void RemoveMagazinesFromYear(const std::string& magazineName) {
        magazines.erase(
            std::remove_if(magazines.begin(), magazines.end(),
                          [&magazineName](const std::shared_ptr<Magazine>& mag) {
                              return mag->getName() == magazineName;
                          }),
            magazines.end());
    }

    void SaveCollection(const std::string& filename) {
        FileHandler handler(filename);
        handler.write("=== רשימת ספרים ===");
        for (const auto& book : books) {
            handler.setBuffer(book->getName().c_str());
            handler.write(book->getName());
        }
        handler.write("\n=== רשימת מגזינים ===");
        for (const auto& magazine : magazines) {
            handler.setBuffer(magazine->getName().c_str());
            handler.write(magazine->getName());
        }
    }
};
