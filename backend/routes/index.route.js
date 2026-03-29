const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const interviewRoutes = require('./interview.route');

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/interview',
        route: interviewRoutes
    }


]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;