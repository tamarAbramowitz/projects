#pragma once
#include <fstream>
#include <string>
#include <stdexcept>
#include <cstring>

class FileHandler {
    std::ofstream file;
    char* buffer;

public:
    FileHandler(const std::string& filename) : buffer(nullptr) {
        file.open(filename);
        if (!file.is_open())
            throw std::runtime_error("Failed to open file: " + filename);
    }

    void write(const std::string& data) {
        if (!file.is_open())
            throw std::runtime_error("File is not open.");
        file << data << "\n";
    }

    void setBuffer(const char* data) {
        delete[] buffer;
        buffer = new char[strlen(data) + 1];
        strcpy(buffer, data);
    }

    ~FileHandler() {
        if (file.is_open()) file.close();
        delete[] buffer;
    }
};
