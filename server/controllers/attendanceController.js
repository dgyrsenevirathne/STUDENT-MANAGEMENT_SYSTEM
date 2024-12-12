// controllers/attendanceController.js
const Attendance = require('../models/attendance');
const Student = require('../models/student');
const Class = require('../models/class');

exports.getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('studentId').populate('classId');
        res.json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAttendance = async (req, res) => {
    try {
        const attendanceRecord = new Attendance(req.body);
        await attendanceRecord.save();
        res.status(201).json(attendanceRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAttendanceHistory = async (req, res) => {
    try {
        const attendanceHistory = await Attendance.find({ studentId: req.params.studentId });
        res.json(attendanceHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};