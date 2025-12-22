const express = require('express');
const router = express.Router();
// const { protect, authorize } = require('../middlewares/auth');
const {
    addAttendance,
    getStudentAttendance,
    requestAttendanceChange,
    handleAttendanceRequest,
    getPendingRequests
} = require('../controllers/attendanceController');

// Protected routes
// router.use(protect);

// Faculty routes
router.post('/add', addAttendance);
router.put('/request/:id', handleAttendanceRequest);
router.get('/requests', getPendingRequests);

// Student routes
router.get('/student/:studentId', getStudentAttendance);
router.post('/request', requestAttendanceChange);

module.exports = router; 