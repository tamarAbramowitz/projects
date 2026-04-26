#pragma once
#include <vector>
#include <memory>
#include <algorithm>
#include <iostream>
#include "Book.h"
#include "PictureBook.h"
#include "Magazine.h"
#include "InvalidBookException.h"
#include "FileHandler.h"

class Library {
    std::vector<std::unique_ptr<Book>> books;
    std::vector<std::shared_ptr<Magazine>> magazines;

public:
    // Validates and adds a book to the collection (takes ownership)
    void addBook(std::unique_ptr<Book> book) {
        if (book->getName().empty())
            throw InvalidBookException("Book name cannot be empty.");
        if (book->getAuthor().empty())
            throw InvalidBookException("Book author cannot be empty.");
        books.push_back(std::move(book));
    }

    // Adds a magazine to the collection
    void addMagazine(std::shared_ptr<Magazine> magazine) {
        magazines.push_back(magazine);
    }

    // Displays all books and magazines in the collection
    void showCollection() const {
        std::cout << "\n=== Books ===" << std::endl;
        for (const auto& b : books) b->display();
        std::cout << "\n=== Magazines ===" << std::endl;
        for (const auto& m : magazines) m->toString();
    }

    // Displays only PictureBook entries using dynamic_cast
    void showPictureBooks() const {
        std::cout << "\n=== Picture Books ===" << std::endl;
        for (const auto& b : books)
            if (auto pb = dynamic_cast<const PictureBook*>(b.get()))
                pb->display();
    }

    // Returns all books published in the given year (lambda expression)
    std::vector<const Book*> showBooksInYear(int year) const {
        std::vector<const Book*> result;
        for (const auto& b : books)
            if (b->getYear() == year)
                result.push_back(b.get());
        return result;
    }

    // Removes all magazine issues with the given name (lambda expression)
    void removeMagazinesByName(const std::string& magazineName) {
        magazines.erase(
            std::remove_if(magazines.begin(), magazines.end(),
                [&magazineName](const std::shared_ptr<Magazine>& m) {
                    return m->getName() == magazineName;
                }),
            magazines.end());
    }

    // Saves all book and magazine names to a file using FileHandler
    void saveCollection(const std::string& filename) const {
        FileHandler fh(filename);
        fh.write("=== Books ===");
        for (const auto& b : books) {
            fh.setBuffer(b->getName().c_str()); // store in buffer before writing
            fh.write(b->getName());
        }
        fh.write("=== Magazines ===");
        for (const auto& m : magazines) {
            std::string entry = m->getName() + " - Issue " + std::to_string(m->getIssueNumber());
            fh.setBuffer(entry.c_str()); // store in buffer before writing
            fh.write(entry);
        }
    }
};
