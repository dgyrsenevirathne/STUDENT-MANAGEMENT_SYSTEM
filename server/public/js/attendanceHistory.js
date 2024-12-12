// server/public/js/attendanceHistory.js
document.addEventListener('DOMContentLoaded', () => {
    const attendanceHistoryForm = document.getElementById('attendanceHistoryForm');
    const attendanceHistoryList = document.getElementById('attendanceHistoryList');

    // Get the attendance history for a particular student
    async function getAttendanceHistory() {
        try {
            const studentId = attendanceHistoryForm.studentId.value;
            const response = await fetch(`/api/attendance/history/${studentId}`);
            const attendanceHistory = await response.json();
            displayAttendanceHistory(attendanceHistory);
        } catch (error) {
            console.error('Error getting attendance history:', error);
        }
    }

    // Display the attendance history
    function displayAttendanceHistory(attendanceHistory) {
        attendanceHistoryList.innerHTML = '';
        attendanceHistory.forEach(attendanceRecord => {
            const row = `
                <tr>
                    <td>${attendanceRecord.studentId.name}</td>
                    <td>${attendanceRecord.classId.name}</td>
                    <td>${attendanceRecord.date}</td>
                    <td>${attendanceRecord.status}</td>
                </tr>
            `;
            attendanceHistoryList.innerHTML += row;
        });
    }

    // Get the attendance history when the form is submitted
    attendanceHistoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        getAttendanceHistory();
    });
});