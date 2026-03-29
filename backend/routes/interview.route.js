const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const fileMiddleware = require('../middlewares/file.middleware');
const interviewController = require('../controllers/interview.controller');
const validate = require('../middlewares/validate.middleware');
const { generateReport, getReportById, generateResume } = require('../validations/interview.validation');

/**
 * @route POST /api/interview/generate-report
 * @desc Generate an interview report based on the candidate's resume , job description and self description. The report should include a match score, technical questions with answers, behavioral questions with answers, skill gap analysis and a preparation plan.
 * @access Private
 */

router.post('/generate-report', auth, validate(generateReport), fileMiddleware.single('resume'), interviewController.generateReport);


/**
 * @route GET /api/interview/report/:id
 * @desc Get the interview report by its ID
 * @access Private
 */

router.get('/report/:id', auth, validate(getReportById), interviewController.getReportById);

/**
 * @route GET /api/interview/reports
 * @desc Get all interview reports for the authenticated user
 * @access Private
 */
router.get('/reports', auth, interviewController.getAllReportsByUserId);

/**
 * @route GET /api/interview/resume/:id
 * @desc generate and download the resume pdf based on the interview report
 * @access Private
 */
router.get('/resume/:id', auth, validate(generateResume), interviewController.generateResume);

module.exports = router;