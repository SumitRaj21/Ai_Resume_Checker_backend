/**
 *  this is a utility function to handle asynchronous route handlers in Express.js.
 *  It wraps the provided asynchronous function and catches any errors that occur during its execution.
 *  If an error is thrown, it passes the error to the next middleware (usually an error handler) using the `next` function.
 *  This helps to avoid repetitive try-catch blocks in each route handler and ensures that errors are properly handled.
 * @param {*} fn 
 * @returns 
 */

const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = asyncHandler;