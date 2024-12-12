// server/public/js/attendance.js
document.addEventListener('DOMContentLoaded', () => {
    const attendanceForm = document.getElementById('attendanceForm');
    const attendanceList = document.getElementById('attendanceList');
    const attendancePercentage = document.getElementById('attendancePercentage');

    // Get the attendance records for a particular class
    async function getAttendanceRecords() {
        try {
            const response = await fetch('/api/attendance');
            const attendanceRecords = await response.json();
            displayAttendanceRecords(attendanceRecords);
        } catch (error) {
            console.error('Error getting attendance records:', error);
        }
    }

    // Display the attendance records
    function displayAttendanceRecords(attendanceRecords) {
        attendanceList.innerHTML = '';
        attendanceRecords.forEach(attendanceRecord => {
            const row = `
                <tr>
                    <td>${attendanceRecord.studentId.name}</td>
                    <td>${attendanceRecord.classId.name}</td>
                    <td>${attendanceRecord.date}</td>
                    <td>${attendanceRecord.status}</td>
                </tr>
            `;
            attendanceList.innerHTML += row;
        });
    }

    // Calculate the attendance percentage
    async function calculateAttendancePercentage(studentId) {
        try {
            const response = await fetch(`/api/attendance/history/${studentId}`);
            const attendanceHistory = await response.json();
            const totalClasses = attendanceHistory.length;
            const classesAttended = attendanceHistory.filter(attendanceRecord => attendanceRecord.status === 'present').length;
            const attendancePercentage = (classesAttended / totalClasses) * 100;
            displayAttendancePercentage(attendancePercentage);
        } catch (error) {
            console.error('Error calculating attendance percentage:', error);
        }
    }

    // Display the attendance percentage
    function displayAttendancePercentage(attendancePercentage) {
        attendancePercentage.innerHTML = `Attendance Percentage: ${attendancePercentage}%`;
    }

    // Calculate the attendance percentage when the form is submitted
    attendanceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studentId = attendanceForm.studentId.value;
        calculateAttendancePercentage(studentId);
    });

    // Mark the attendance
    attendanceForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(attendanceForm);
            const response = await fetch('/api/attendance', {
                method: 'POST',
                body: formData
            });
            const attendanceRecord = await response.json();
            displayAttendanceRecord(attendanceRecord);
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    });

    // Display the attendance record
    function displayAttendanceRecord(attendanceRecord) {
        const row = `
        < tr >
                <td>${attendanceRecord.studentId.name}</td>
                <td>${attendanceRecord.classId.name}</td>
                <td>${attendanceRecord.date}</td>
                <td>${attendanceRecord.status}</td>
            </tr >
        `;
        attendanceList.innerHTML += row;
    }

    // Get the attendance records when the page loads
    getAttendanceRecords();
});