#pragma once
#include <stdexcept>
#include <string>

class InvalidBookException : public std::runtime_error {
public:
    explicit InvalidBookException(const std::string& message)
        : std::runtime_error(message) {}
};
