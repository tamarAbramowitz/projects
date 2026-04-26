#pragma once
#include <iostream>
#include <string>
#include <vector>
#include <cstring>

class Magazine {
    std::string magazineName;
    int issueNumber;
    std::string publishDate;
    std::string* publishers; // dynamic array of publishing companies
    int maxSize;             // allocated capacity
    int currentSize;         // number of publishers currently stored

public:
    // Constructor: allocates the publishers array with the given max capacity
    Magazine(const std::string& name, int issue, const std::string& date, int maxSize)
        : magazineName(name), issueNumber(issue), publishDate(date),
          maxSize(maxSize), currentSize(0) {
        publishers = new std::string[maxSize];
    }

    // Copy constructor: deep-copies the publishers array
    Magazine(const Magazine& other)
        : magazineName(other.magazineName), issueNumber(other.issueNumber),
          publishDate(other.publishDate), maxSize(other.maxSize), currentSize(other.currentSize) {
        publishers = new std::string[maxSize];
        for (int i = 0; i < currentSize; i++)
            publishers[i] = other.publishers[i];
    }

    // Move constructor: steals the publishers array from the other object
    Magazine(Magazine&& other) noexcept
        : magazineName(std::move(other.magazineName)), issueNumber(other.issueNumber),
          publishDate(std::move(other.publishDate)), publishers(other.publishers),
          maxSize(other.maxSize), currentSize(other.currentSize) {
        other.publishers = nullptr;
        other.currentSize = 0;
    }

    // Copy assignment: releases current memory, then deep-copies
    Magazine& operator=(const Magazine& other) {
        if (this == &other) return *this;
        delete[] publishers;
        magazineName = other.magazineName;
        issueNumber = other.issueNumber;
        publishDate = other.publishDate;
        maxSize = other.maxSize;
        currentSize = other.currentSize;
        publishers = new std::string[maxSize];
        for (int i = 0; i < currentSize; i++)
            publishers[i] = other.publishers[i];
        return *this;
    }

    // Move assignment: releases current memory, then steals from other
    Magazine& operator=(Magazine&& other) noexcept {
        if (this == &other) return *this;
        delete[] publishers;
        magazineName = std::move(other.magazineName);
        issueNumber = other.issueNumber;
        publishDate = std::move(other.publishDate);
        publishers = other.publishers;
        maxSize = other.maxSize;
        currentSize = other.currentSize;
        other.publishers = nullptr;
        other.currentSize = 0;
        return *this;
    }

    // Destructor: frees the dynamic publishers array
    ~Magazine() { delete[] publishers; }

    // Adds a publisher; doubles the array capacity if full
    void addPublisher(const std::string& publisher) {
        if (currentSize == maxSize) {
            maxSize *= 2;
            std::string* newArr = new std::string[maxSize];
            for (int i = 0; i < currentSize; i++)
                newArr[i] = publishers[i];
            delete[] publishers;
            publishers = newArr;
        }
        publishers[currentSize++] = publisher;
    }

    // Returns all publishers as a vector for external access
    std::vector<std::string> getPublishers() const {
        return std::vector<std::string>(publishers, publishers + currentSize);
    }

    void printPublishers() const {
        std::cout << "  Publishers : ";
        for (int i = 0; i < currentSize; i++)
            std::cout << publishers[i] << (i < currentSize - 1 ? ", " : "");
        std::cout << std::endl;
    }

    void toString() const {
        std::cout << "-----------------------------" << std::endl;
        std::cout << "  Magazine   : " << magazineName << std::endl;
        std::cout << "  Issue      : " << issueNumber  << std::endl;
        std::cout << "  Date       : " << publishDate  << std::endl;
        printPublishers();
        std::cout << "-----------------------------" << std::endl;
    }

    std::string getName() const { return magazineName; }
    int getIssueNumber() const { return issueNumber; }
};
