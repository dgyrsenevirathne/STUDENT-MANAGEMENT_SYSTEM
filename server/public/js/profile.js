// server/public/js/profile.js
document.addEventListener('DOMContentLoaded', async () => {
    const studentId = 'STUDENT_ID'; // Replace with actual student ID
    const profileForm = document.getElementById('profileForm');
    const gradesList = document.getElementById('gradesList');
    const materialsList = document.getElementById('materialsList');

    // Fetch student profile
    async function fetchProfile() {
        try {
            const response = await fetch(`/api/students/profile/${studentId}`);
            const student = await response.json();
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('age').value = student.age;
            document.getElementById('course').value = student.course;

            // Display grades
            student.grades.forEach(grade => {
                const li = document.createElement('li');
                li.textContent = `${grade.course}: ${grade.grade}`;
                gradesList.appendChild(li);
            });

            // Display materials
            student.materials.forEach(material => {
                const li = document.createElement('li');
                li.textContent = material.title;
                materialsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    // Update student profile
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedStudent = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            course: document.getElementById('course').value
        };

        try {
            const response = await fetch(`/api/students/profile/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedStudent)
            });
            const result = await response.json();
            alert('Profile updated successfully!');
            // Optionally, refresh the profile data
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });

    // Initial fetch of the profile
    fetchProfile();
}); 