/**
 * Custom error class for API errors.
 * It extends the built-in Error class and includes additional properties such as statusCode and success.
 * The constructor takes a status code and a message, which are used to create an error instance that can be thrown in route handlers or services.
 * This allows for consistent error handling across the application, as all errors can be caught and processed in a centralized error handling middleware.
 */

class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;