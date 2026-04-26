#pragma once
#include <stdexcept>
#include <string>

class InvalidBookException : public std::exception {
    std::string message;
public:
    InvalidBookException(const std::string& msg) : message(msg) {}
    const char* what() const noexcept override { return message.c_str(); }
};
