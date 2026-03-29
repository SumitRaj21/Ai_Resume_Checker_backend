/**
 * Middleware to handle errors in the application.
 * It captures any errors thrown in the route handlers and sends a structured JSON response with the error message and status code.
 * If no status code is provided, it defaults to 500 (Internal Server Error).
 */

const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;