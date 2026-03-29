const mongoose = require('mongoose');

/**
 * -job description: String, required
 * -resume: String, required
 * -self description: String, required
 * -match score: Number, required
 * -Technical Questions: [{question: String, required, answer: String, required, intent: String, required}] //Array of objects with question and answer, required
 * Behavioral Questions: [{question: String, required, answer: String, required, intent: String, required}] //Array of objects with question and answer, required
 * -skill gap analysis: [{skill: String, severity: {
 * type:String, enum: ['low', 'medium', 'high']}}] //Array of objects with skill and gap, required
 * 
 *prepartion plan:[{
 * day: Number,
 * focus: String,
 * tasks: [String]}]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    intention: {
        type: String,
        required: true,
    }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    intention: {
        type: String,
        required: true,
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    }
}, { _id: false });
const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
    tasks: [{
        type: String,
        required: true,
    }]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: false,
    },
    selfDescription: {
        type: String,
        required: false,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGapAnalysis: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: {
        type: String,
        required: true,
    }

}, { timestamps: true });


const InterviewReport = mongoose.model('interviewReport', interviewReportSchema);

module.exports = InterviewReport;