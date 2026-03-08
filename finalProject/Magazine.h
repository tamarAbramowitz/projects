#pragma once
#include <string>
#include <iostream>
#include <cstring>

class Magazine {
private:
    std::string name;
    int issueNumber;
    std::string publishDate;
    std::string* companies;
    int maxSize;
    int currentSize;

public:
    Magazine(const std::string& name, int issueNumber, const std::string& publishDate, int maxSize)
        : name(name), issueNumber(issueNumber), publishDate(publishDate),
          maxSize(maxSize), currentSize(0) {
        companies = new std::string[maxSize];
    }

    ~Magazine() {
        delete[] companies;
    }

    Magazine(const Magazine& other)
        : name(other.name), issueNumber(other.issueNumber),
          publishDate(other.publishDate), maxSize(other.maxSize),
          currentSize(other.currentSize) {
        companies = new std::string[maxSize];
        for (int i = 0; i < currentSize; i++) {
            companies[i] = other.companies[i];
        }
    }

    Magazine& operator=(const Magazine& other) {
        if (this != &other) {
            delete[] companies;
            name = other.name;
            issueNumber = other.issueNumber;
            publishDate = other.publishDate;
            maxSize = other.maxSize;
            currentSize = other.currentSize;
            companies = new std::string[maxSize];
            for (int i = 0; i < currentSize; i++) {
                companies[i] = other.companies[i];
            }
        }
        return *this;
    }

    Magazine(Magazine&& other) noexcept
        : name(std::move(other.name)), issueNumber(other.issueNumber),
          publishDate(std::move(other.publishDate)), companies(other.companies),
          maxSize(other.maxSize), currentSize(other.currentSize) {
        other.companies = nullptr;
        other.maxSize = 0;
        other.currentSize = 0;
    }

    Magazine& operator=(Magazine&& other) noexcept {
        if (this != &other) {
            delete[] companies;
            name = std::move(other.name);
            issueNumber = other.issueNumber;
            publishDate = std::move(other.publishDate);
            companies = other.companies;
            maxSize = other.maxSize;
            currentSize = other.currentSize;
            other.companies = nullptr;
            other.maxSize = 0;
            other.currentSize = 0;
        }
        return *this;
    }

    void addCompany(const std::string& company) {
        if (currentSize >= maxSize) {
            int newMaxSize = maxSize * 2;
            std::string* newCompanies = new std::string[newMaxSize];
            for (int i = 0; i < currentSize; i++) {
                newCompanies[i] = companies[i];
            }
            delete[] companies;
            companies = newCompanies;
            maxSize = newMaxSize;
        }
        companies[currentSize++] = company;
    }

    std::string* getCompanies() const {
        return companies;
    }

    int getCurrentSize() const {
        return currentSize;
    }

    std::string ToString() const {
        std::string result = "מגזין: " + name + ", גיליון: " + std::to_string(issueNumber) +
                           ", תאריך: " + publishDate + "\nחברות: ";
        for (int i = 0; i < currentSize; i++) {
            result += companies[i];
            if (i < currentSize - 1) result += ", ";
        }
        return result;
    }

    std::string getName() const { return name; }
};
