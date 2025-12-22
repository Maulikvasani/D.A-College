const Attendance = require('../models/Attendance');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Add or Update attendance
// @route   POST /api/attendance/add
// @access  Private (Faculty)
exports.addAttendance = asyncHandler(async (req, res, next) => {
    const { student, subject, date, status } = req.body;
    
    let attendance = await Attendance.findOne({
        student,
        subject,
        date: new Date(date)
    });

    if (attendance) {
        attendance.status = status;
        attendance = await attendance.save();
    } else {
        attendance = await Attendance.create({
            student,
            subject,
            date: new Date(date),
            status,
            faculty: req.user.id
        });
    }

    res.status(200).json({
        success: true,
        data: attendance
    });
});

// @desc    Get student attendance
// @route   GET /api/attendance/student/:studentId
// @access  Private (Student/Faculty)
exports.getStudentAttendance = asyncHandler(async (req, res, next) => {
    const attendance = await Attendance.find({
        student: req.params.studentId
    })
    .populate('subject', 'name')
    .populate('faculty', 'name');

    res.status(200).json({
        success: true,
        data: attendance
    });
});

// @desc    Request attendance change
// @route   POST /api/attendance/request
// @access  Private (Student)
exports.requestAttendanceChange = asyncHandler(async (req, res, next) => {
    const { attendanceId, message } = req.body;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
        return next(new ErrorResponse('Attendance record not found', 404));
    }

    if (attendance.student.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    attendance.requestStatus = 'pending';
    attendance.requestMessage = message;
    await attendance.save();

    res.status(200).json({
        success: true,
        data: attendance
    });
});

// @desc    Handle attendance request
// @route   PUT /api/attendance/request/:id
// @access  Private (Faculty)
exports.handleAttendanceRequest = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
        return next(new ErrorResponse('Attendance record not found', 404));
    }

    if (attendance.faculty.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    attendance.requestStatus = status;
    if (status === 'approved') {
        attendance.status = 'present';
    }
    
    await attendance.save();

    res.status(200).json({
        success: true,
        data: attendance
    });
});

// @desc    Get pending attendance requests
// @route   GET /api/attendance/requests
// @access  Private (Faculty)
exports.getPendingRequests = asyncHandler(async (req, res, next) => {
    const requests = await Attendance.find({
        requestStatus: 'pending'
    })
    .populate('student', 'name')
    .populate('subject', 'name');

    res.status(200).json({
        success: true,
        data: requests
    });
}); 