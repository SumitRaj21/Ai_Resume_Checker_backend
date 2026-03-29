const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const auth = require('../middlewares/auth.middleware');


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 * @returns { success: boolean, data: user }
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @body { email, password }
 * @returns { success: boolean, data: user }
 */

router.post('/login', validate(loginSchema), authController.login);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 * @returns { success: boolean, message: string }
 */

router.get('/logout', auth, authController.logout);

/**
 * @route GET /api/auth/user
 * @desc Get the authenticated user's information
 * @access Private
 * @returns { success: boolean, data: user }
 */
router.get('/user', auth, authController.getUser);


module.exports = router;