#pragma once
#include "Book.h"

class PictureBook : public Book {
private:
    std::string illustrator;
    std::string drawingType;

public:
    PictureBook(const std::string& name, const std::string& author, int year,
                const std::string& category, const std::string& level,
                const std::string& illustrator, const std::string& drawingType)
        : Book(name, author, year, category, level),
          illustrator(illustrator), drawingType(drawingType) {}

    void display() const override {
        Book::display();
        std::cout << "  צייר: " << illustrator << ", סוג ציור: " << drawingType << std::endl;
    }
};
