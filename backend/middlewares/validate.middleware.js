/**
 * Middleware to validate request data using Joi schemas.
 * It checks the request's params, query, and body against the provided schema.
 * If validation fails, it returns a 400 Bad Request error with details.
 */

const Joi = require('joi');
const ApiError = require('../utils/apiError');

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object[key] !== undefined) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({
            abortEarly: false,
            stripUnknown: true
        })
        .validate(object);

    if (error) {
        const errorMessage = error.details
            .map(detail => {
                return detail.message.replace(/["]/g, '')
                    .replace('body.', '');
            })
            .join(', ');

        return next(new ApiError(400, errorMessage));
    }
    if (value.body) req.body = value.body;
    if (value.params) req.params = value.params;
    if (value.query) req.query = value.query;


    return next();
};

module.exports = validate;