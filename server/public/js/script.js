document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const searchInput = document.getElementById('searchInput');

    // Fetch and display students
    async function fetchStudents() {
        try {
            const response = await fetch('/api/students');
            const students = await response.json();
            displayStudents(students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    function displayStudents(students) {
        studentList.innerHTML = '';
        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>${student.course}</td>
                    <td>
                        <button onclick="editStudent('${student._id}')">Edit</button>
                        <button onclick="deleteStudent('${student._id}')">Delete</button>
                    </td>
                </tr>
            `;
            studentList.innerHTML += row;
        });
    }

    // Add Student
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const student = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            course: document.getElementById('course').value
        };

        try {
            await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            });

            form.reset();
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    });

    // Search Functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = studentList.getElementsByTagName('tr');

        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            const name = cells[0].textContent.toLowerCase();
            const email = cells[1].textContent.toLowerCase();
            const course = cells[3].textContent.toLowerCase();

            if (name.includes(searchTerm) || email.includes(searchTerm) || course.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Delete Student
    window.deleteStudent = async (id) => {
        try {
            await fetch(`/api/students/${id}`, { method: 'DELETE' });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    // Edit Student
    window.editStudent = async (id) => {
        try {
            const response = await fetch(`/api/students/${id}`);
            const student = await response.json();

            // Populate the form with the student's current data
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('age').value = student.age;
            document.getElementById('course').value = student.course;

            // Change the form submission to update the student
            form.onsubmit = async (e) => {
                e.preventDefault();
                const updatedStudent = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    age: document.getElementById('age').value,
                    course: document.getElementById('course').value
                };

                try {
                    await fetch(`/api/students/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedStudent)
                    });

                    form.reset();
                    fetchStudents();
                } catch (error) {
                    console.error('Error updating student:', error);
                }
            };
        } catch (error) {
            console.error('Error fetching student for edit:', error);
        }
    };

    // Initial fetch of students
    fetchStudents();
});


