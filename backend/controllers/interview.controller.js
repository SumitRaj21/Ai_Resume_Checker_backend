const asyncHandler = require('../utils/asyncHandler');
const InterviewService = require('../services/interview.service');

class InterviewController {
    generateReport = asyncHandler(async (req, res) => {
        const interviewReport = await InterviewService.createInterviewReport(req);
        res.status(201).json({ success: true, message: "Interview report generated successfully", data: interviewReport });
    });

    getReportById = asyncHandler(async (req, res) => {
        const reportId = req.params.id;
        const interviewReport = await InterviewService.interviewReportById(reportId);
        res.status(200).json({ success: true, message: "Interview report retrieved successfully", data: interviewReport });
    });

    getAllReportsByUserId = asyncHandler(async (req, res) => {
        const userId = req.user.userId;
        const interviewReports = await InterviewService.getAllReportsByUserId(userId);
        res.status(200).json({ success: true, message: "Interview reports retrieved successfully", data: interviewReports });
    });
    generateResume = asyncHandler(async (req, res) => {
        const reportId = req.params.id;
        const resumePdfBuffer = await InterviewService.generateResume(reportId);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${reportId}.pdf`,
            'Content-Length': resumePdfBuffer.length
        });
        res.send(resumePdfBuffer);
    });
}

module.exports = new InterviewController();