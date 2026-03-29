const pdfParse = require('pdf-parse');
const { generateInterviewReport, generateResumePdf } = require('./ai.service');
const ApiError = require('../utils/apiError');
const InterviewReport = require('../models/interviewReport.model');

class InterviewService {
    createInterviewReport = async (req) => {
        const { jobDescription, selfDescription } = req.body;
        if (!req.file) {
            throw new ApiError(400, 'Resume file is required');
        }
        const resumeData = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const interviewReportData = await generateInterviewReport({ resume: resumeData.text, jobDescription, selfDescription })
        const interviewReport = await InterviewReport.create({
            user: req.user.userId,
            jobDescription,
            resume: resumeData.text,
            selfDescription,
            ...interviewReportData,
            title: `Interview Report for ${jobDescription.substring(0, 30)}...`
        })
        return interviewReport;
    }

    interviewReportById = async (reportId) => {
        const report = await InterviewReport.findById(reportId);
        if (!report) {
            throw new ApiError(404, 'Interview report not found');
        }
        return report;
    }

    getAllReportsByUserId = async (userId) => {
        const reports = await InterviewReport.find({ user: userId }).sort({ createdAt: -1 }).select(-resume - selfDescription - jobDescription - __v - technicalQuestions - behavioralQuestions - skillGaps - preparationPlan);
        return reports;
    }

    generateResume = async (reportId) => {
        const report = await InterviewReport.findById(reportId);
        if (!report) {
            throw new ApiError(404, 'Interview report not found');
        }
        const { resume, selfDescription, jobDescription } = report;
        const resumePdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription });
        return resumePdfBuffer;
    }
}

module.exports = new InterviewService();