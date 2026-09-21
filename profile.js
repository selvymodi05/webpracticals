
let students = [];

let currentPage = 1;

const recordsPerPage = 5;

const profileTable = document.getElementById("profileTable");

const message = document.getElementById("message");

const searchInput = document.getElementById("searchInput");

const departmentFilter = document.getElementById("departmentFilter");

const sortSelect = document.getElementById("sortSelect");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const pageNumber = document.getElementById("pageNumber");

const resetButton = document.getElementById("resetButton");


async function loadStudents() {

    message.textContent = "Loading student profiles...";

    try {

        const response = await fetch("students.json");

        if (!response.ok) {
            throw new Error("Unable to load student data");
        }

        students = await response.json();

        message.textContent = "Student profiles loaded successfully";

        renderStudents();

    } catch (error) {

        message.textContent = "Error: " + error.message;

        profileTable.innerHTML = "";

    }

}


function getFilteredStudents() {

    const searchText = searchInput.value.toLowerCase();

    const department = departmentFilter.value;

    let filteredStudents = students.filter(student => {

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.enrollment.toLowerCase().includes(searchText) ||
            student.department.toLowerCase().includes(searchText);

        const matchesDepartment =
            department === "all" ||
            student.department === department;

        return matchesSearch && matchesDepartment;

    });

    const sortValue = sortSelect.value;

    if (sortValue === "nameAsc") {

        filteredStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (sortValue === "nameDesc") {

        filteredStudents.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    } else if (sortValue === "semesterAsc") {

        filteredStudents.sort((a, b) =>
            a.semester - b.semester
        );

    } else if (sortValue === "semesterDesc") {

        filteredStudents.sort((a, b) =>
            b.semester - a.semester
        );

    }

    return filteredStudents;

}


function renderStudents() {

    const filteredStudents = getFilteredStudents();

    const totalPages =
        Math.ceil(filteredStudents.length / recordsPerPage);

    if (totalPages === 0) {

        profileTable.innerHTML = "";

        message.textContent = "No student records found";

        pageNumber.textContent = "Page 0";

        previousButton.disabled = true;

        nextButton.disabled = true;

        return;

    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex =
        (currentPage - 1) * recordsPerPage;

    const endIndex =
        startIndex + recordsPerPage;

    const currentStudents =
        filteredStudents.slice(startIndex, endIndex);

    profileTable.innerHTML = currentStudents.map(student => `

        <tr>

            <td>${student.name}</td>

            <td>${student.enrollment}</td>

            <td>${student.department}</td>

            <td>${student.semester}</td>

            <td>${student.college}</td>

            <td>${student.email}</td>

        </tr>

    `).join("");

    message.textContent =
        "Showing " + filteredStudents.length + " student records";

    pageNumber.textContent =
        "Page " + currentPage + " of " + totalPages;

    previousButton.disabled = currentPage === 1;

    nextButton.disabled = currentPage === totalPages;

}


searchInput.addEventListener("input", () => {

    currentPage = 1;

    renderStudents();

});


departmentFilter.addEventListener("change", () => {

    currentPage = 1;

    renderStudents();

});


sortSelect.addEventListener("change", () => {

    currentPage = 1;

    renderStudents();

});


previousButton.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderStudents();

    }

});


nextButton.addEventListener("click", () => {

    const filteredStudents = getFilteredStudents();

    const totalPages =
        Math.ceil(filteredStudents.length / recordsPerPage);

    if (currentPage < totalPages) {

        currentPage++;

        renderStudents();

    }

});


resetButton.addEventListener("click", () => {

    searchInput.value = "";

    departmentFilter.value = "all";

    sortSelect.value = "default";

    currentPage = 1;

    renderStudents();

});


loadStudents();