async function loadStudents() {

    const message = document.getElementById("message");
    const table = document.getElementById("profileTable");

    message.textContent = "Loading student profiles...";

    try {

        const students = await fetchStudents();

        table.innerHTML = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.enrollment}</td>
                <td>${student.department}</td>
                <td>${student.semester}</td>
                <td>${student.college}</td>
                <td>${student.email}</td>
            </tr>
        `).join("");

        message.textContent = "Student profiles loaded successfully!";

    } catch (error) {

        message.textContent = "Error: " + error.message;

        console.error(error);

    }
}

loadStudents();