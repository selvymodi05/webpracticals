let students = [];
let currentPage = 1;
let recordsPerPage = 5;

const table = document.getElementById("profileTable");
const message = document.getElementById("message");

async function fetchStudents() {

    try {

        message.textContent = "Loading student data...";

        const response = await fetch("profile.json");

        if (!response.ok) {
            throw new Error("Failed to fetch profile.json");
        }

        students = await response.json();

        console.log("Students JSON:", students);

        renderStudents();

        message.textContent = "Student data loaded successfully!";

    } catch (error) {

        console.error(error);

        message.textContent = "Error: " + error.message;

    }
}

function renderStudents() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const department =
        document.getElementById("departmentFilter").value;

    let result = students.filter(student => {

        const searchMatch =
            student.name.toLowerCase().includes(search) ||
            student.enrollment.toLowerCase().includes(search) ||
            student.department.toLowerCase().includes(search);

        const departmentMatch =
            department === "all" ||
            student.department === department;

        return searchMatch && departmentMatch;

    });

    const sort = document.getElementById("sortSelect").value;

    if (sort === "nameAsc") {
        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sort === "nameDesc") {
        result.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }

    if (sort === "semesterAsc") {
        result.sort((a, b) =>
            a.semester - b.semester
        );
    }

    if (sort === "semesterDesc") {
        result.sort((a, b) =>
            b.semester - a.semester
        );
    }

    const totalPages =
        Math.ceil(result.length / recordsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    const start =
        (currentPage - 1) * recordsPerPage;

    const end =
        start + recordsPerPage;

    const pageData =
        result.slice(start, end);

    table.innerHTML = pageData.map(student => `

        <tr>
            <td>${student.name}</td>
            <td>${student.enrollment}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td>${student.college}</td>
            <td>${student.email}</td>
        </tr>

    `).join("");

    document.getElementById("pageNumber").textContent =
        totalPages > 0
        ? "Page " + currentPage + " of " + totalPages
        : "Page 0";

    document.getElementById("previousButton").disabled =
        currentPage === 1;

    document.getElementById("nextButton").disabled =
        currentPage === totalPages || totalPages === 0;

    if (result.length === 0) {
        message.textContent = "No student records found";
    } else {
        message.textContent =
            "Showing " + result.length + " student records";
    }
}

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        currentPage = 1;
        renderStudents();

    });

document
    .getElementById("departmentFilter")
    .addEventListener("change", function() {

        currentPage = 1;
        renderStudents();

    });

document
    .getElementById("sortSelect")
    .addEventListener("change", function() {

        currentPage = 1;
        renderStudents();

    });

document
    .getElementById("previousButton")
    .addEventListener("click", function() {

        if (currentPage > 1) {

            currentPage--;
            renderStudents();

        }

    });

document
    .getElementById("nextButton")
    .addEventListener("click", function() {

        currentPage++;
        renderStudents();

    });

document
    .getElementById("resetButton")
    .addEventListener("click", function() {

        document.getElementById("searchInput").value = "";

        document.getElementById("departmentFilter").value = "all";

        document.getElementById("sortSelect").value = "default";

        currentPage = 1;

        renderStudents();

    });

fetchStudents();