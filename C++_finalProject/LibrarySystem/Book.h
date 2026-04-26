#pragma once
#include <iostream>
#include <string>

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
        : name(name), author(author), year(year), category(category), level(level) {}

    virtual void display() const {
        std::cout << "Book: " << name << " | Author: " << author
                  << " | Year: " << year << " | Category: " << category
                  << " | Level: " << level << std::endl;
    }

    std::string getName() const { return name; }
    std::string getAuthor() const { return author; }
    int getYear() const { return year; }

    virtual ~Book() = default;
};
