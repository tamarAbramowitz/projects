#pragma once
#include "Book.h"

class PictureBook : public Book {
    std::string illustrator;
    std::string illustrationType; // "comic" or "regular"

public:
    PictureBook(const std::string& name, const std::string& author, int year,
                const std::string& category, const std::string& level,
                const std::string& illustrator, const std::string& illustrationType)
        : Book(name, author, year, category, level),
          illustrator(illustrator), illustrationType(illustrationType) {}

    void display() const override {
        Book::display();
        std::cout << "  Illustrator: " << illustrator
                  << " | Illustration Type: " << illustrationType << std::endl;
    }
};
