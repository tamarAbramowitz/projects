#pragma once
#include <string>
#include <iostream>
#include "InvalidBookException.h"

class Book {
protected:
    std::string name;
    std::string author;
    int year;
    std::string category;
    std::string level;

public:
    Book(const std::string& name, const std::string& author, int year,
         const std::string& category, const std::string& level)
        : name(name), author(author), year(year), category(category), level(level) {
        if (name.empty() || author.empty()) {
            throw InvalidBookException("שם הספר או המחבר לא יכולים להיות ריקים");
        }
    }

    virtual void display() const {
        std::cout << "שם: " << name << ", מחבר: " << author
                  << ", שנה: " << year << ", קטגוריה: " << category
                  << ", רמה: " << level << std::endl;
    }

    std::string getName() const { return name; }
    int getYear() const { return year; }
    virtual ~Book() = default;
};
