#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <memory>
#include "Library.h"
#include "Book.h"
#include "PictureBook.h"
#include "Magazine.h"
#include "InvalidBookException.h"

int main() {
    Library library;

    // --- Add Books ---
    try {
        library.addBook(std::make_unique<Book>("Harry Potter", "J.K. Rowling", 1997, "Fiction", "Children"));
        library.addBook(std::make_unique<Book>("Clean Code", "Robert Martin", 2008, "Learning", "Adults"));
        library.addBook(std::make_unique<PictureBook>("The Lion King", "Disney", 1994, "Fiction", "Young Children", "Hans Bacher", "Regular"));
        library.addBook(std::make_unique<PictureBook>("Spider-Man", "Stan Lee", 2002, "Action", "Children", "John Romita", "Comic"));
        library.addBook(std::make_unique<Book>("The Hobbit", "J.R.R. Tolkien", 1937, "Fiction", "Adults"));
    } catch (const InvalidBookException& e) {
        std::cerr << "Error adding book: " << e.what() << std::endl;
    }

    // --- Add Magazines ---
    auto mag1 = std::make_shared<Magazine>("National Geographic", 101, "2023-01", 3);
    mag1->addPublisher("NatGeo Inc.");
    mag1->addPublisher("Science Press");

    auto mag2 = std::make_shared<Magazine>("Time", 55, "2023-03", 2);
    mag2->addPublisher("Time Warner");

    auto mag3 = std::make_shared<Magazine>("National Geographic", 102, "2023-06", 2);
    mag3->addPublisher("NatGeo Inc.");

    library.addMagazine(mag1);
    library.addMagazine(mag2);
    library.addMagazine(mag3);

    // --- Show full collection ---
    library.showCollection();

    // --- Show only PictureBooks ---
    library.showPictureBooks();

    // --- Show books from a specific year ---
    std::cout << "\n=== Books from 1997 ===" << std::endl;
    auto booksIn1997 = library.showBooksInYear(1997);
    for (const auto* b : booksIn1997) b->display();

    // --- Remove all issues of "National Geographic" ---
    std::cout << "\nRemoving all 'National Geographic' magazines..." << std::endl;
    library.removeMagazinesByName("National Geographic");

    std::cout << "\n=== Collection after removal ===" << std::endl;
    library.showCollection();

    // --- Save to file ---
    try {
        library.saveCollection("library_collection.txt");
        std::cout << "\nCollection saved to library_collection.txt" << std::endl;
    } catch (const std::runtime_error& e) {
        std::cerr << "File error: " << e.what() << std::endl;
    }

    // --- Show publishers list via getter ---
    std::cout << "\n=== Publishers of 'Time' magazine ==="  << std::endl;
    for (const auto& p : mag2->getPublishers())
        std::cout << "  - " << p << std::endl;

    // --- Test InvalidBookException: empty name ---
    try {
        library.addBook(std::make_unique<Book>("", "Unknown", 2020, "Fiction", "Adults"));
    } catch (const InvalidBookException& e) {
        std::cerr << "\nCaught exception: " << e.what() << std::endl;
    }

    // --- Test InvalidBookException: empty author ---
    try {
        library.addBook(std::make_unique<Book>("Valid Title", "", 2020, "Fiction", "Adults"));
    } catch (const InvalidBookException& e) {
        std::cerr << "Caught exception: " << e.what() << std::endl;
    }

    return 0;
}
