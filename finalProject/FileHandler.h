#pragma once
#include <fstream>
#include <string>
#include <stdexcept>
#include <cstring>

class FileHandler {
private:
    std::ofstream file;
    char* buffer;

public:
    FileHandler(const std::string& filename) : buffer(nullptr) {
        file.open(filename);
        if (!file.is_open()) {
            throw std::runtime_error("לא ניתן לפתוח את הקובץ: " + filename);
        }
    }

    ~FileHandler() {
        if (file.is_open()) {
            file.close();
        }
        delete[] buffer;
    }

    void write(const std::string& data) {
        if (!file.is_open()) {
            throw std::runtime_error("הקובץ לא פתוח");
        }
        file << data << std::endl;
    }

    void setBuffer(const char* data) {
        delete[] buffer;
        buffer = new char[strlen(data) + 1];
        strcpy(buffer, data);
    }
};
