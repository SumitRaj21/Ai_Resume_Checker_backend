const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index.route');
const errorHandler = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

/**
 * Handle 404 errors for undefined routes. If a request is made to a route that does not exist, this middleware will catch it and return a JSON response with a 404 status code and an error message indicating that the route was not found.
 */
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});
// Global error handling middleware
app.use(errorHandler);

module.exports = app;