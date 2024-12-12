// server/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
const Student = require('../models/student');
const Class = require('../models/class');

// Serve the attendance.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'attendance.html'));
});

// Get attendance records API
router.get('/records', async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('studentId').populate('classId');
        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const attendanceRecord = new Attendance(req.body);
        await attendanceRecord.save();
        res.status(201).json(attendanceRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/history/:studentId', async (req, res) => {
    try {
        const attendanceHistory = await Attendance.find({ studentId: req.params.studentId });
        res.json(attendanceHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;