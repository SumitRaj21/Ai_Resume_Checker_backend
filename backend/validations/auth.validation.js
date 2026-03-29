const Joi = require('joi');

const registerSchema = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
}

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

module.exports = {
    registerSchema,
    loginSchema
}