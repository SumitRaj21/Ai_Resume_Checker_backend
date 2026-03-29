const Joi = require('joi');

const generateReport = {
    jobDescription: Joi.string().required(),
    selfDescription: Joi.string().required()
};

const getReportById = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}

const generateResume = {
    params: Joi.object().keys({
        id: Joi.string().hex().length(24).required()
    })
}

module.exports = {
    generateReport,
    getReportById,
    generateResume
}