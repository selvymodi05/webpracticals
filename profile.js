let students = [];

let currentPage = 1;

const recordsPerPage = 5;


// =========================================
// GET HTML ELEMENTS
// =========================================

const profileTable =
    document.getElementById("profileTable");

const message =
    document.getElementById("message");

const searchInput =
    document.getElementById("searchInput");

const departmentFilter =
    document.getElementById("departmentFilter");

const sortSelect =
    document.getElementById("sortSelect");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const pageNumber =
    document.getElementById("pageNumber");

const resetButton =
    document.getElementById("resetButton");


// =========================================
// LOAD STUDENTS FROM JSON
// =========================================

async function loadStudents() {

    message.textContent =
        "Loading student profiles...";

    try {

        const response =
            await fetch("students.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load students.json"
            );
        }


        students =
            await response.json();


        console.log(
            "Students loaded:",
            students
        );


        message.textContent =
            "Student profiles loaded successfully";


        renderStudents();

    }

    catch (error) {

        console.error(
            "Error loading students:",
            error
        );


        message.textContent =
            "Error: " + error.message;


        profileTable.innerHTML = "";
    }
}


// =========================================
// FILTER + SORT
// =========================================

function getFilteredStudents() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const department =
        departmentFilter.value;


    let filteredStudents =
        students.filter(student => {


            const name =
                String(student.name)
                    .toLowerCase();


            const enrollment =
                String(student.enrollment)
                    .toLowerCase();


            const studentDepartment =
                String(student.department)
                    .toLowerCase();


            const matchesSearch =

                name.includes(searchText) ||

                enrollment.includes(searchText) ||

                studentDepartment.includes(searchText);


            const matchesDepartment =

                department === "all" ||

                student.department === department;


            return (
                matchesSearch &&
                matchesDepartment
            );

        });


    // =========================================
    // SORT
    // =========================================

    const sortValue =
        sortSelect.value;


    if (sortValue === "nameAsc") {

        filteredStudents.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }


    else if (sortValue === "nameDesc") {

        filteredStudents.sort(
            (a, b) =>
                b.name.localeCompare(a.name)
        );

    }


    else if (sortValue === "semesterAsc") {

        filteredStudents.sort(
            (a, b) =>
                a.semester - b.semester
        );

    }


    else if (sortValue === "semesterDesc") {

        filteredStudents.sort(
            (a, b) =>
                b.semester - a.semester
        );

    }


    return filteredStudents;
}


// =========================================
// DISPLAY STUDENTS
// =========================================

function renderStudents() {

    const filteredStudents =
        getFilteredStudents();


    const totalPages =
        Math.ceil(
            filteredStudents.length /
            recordsPerPage
        );


    // =========================================
    // NO RECORDS
    // =========================================

    if (totalPages === 0) {

        profileTable.innerHTML = "";

        message.textContent =
            "No student records found";

        pageNumber.textContent =
            "Page 0";

        previousButton.disabled = true;

        nextButton.disabled = true;

        return;
    }


    // =========================================
    // FIX CURRENT PAGE
    // =========================================

    if (currentPage > totalPages) {

        currentPage = totalPages;
    }


    // =========================================
    // GET CURRENT PAGE DATA
    // =========================================

    const startIndex =
        (currentPage - 1) *
        recordsPerPage;


    const endIndex =
        startIndex +
        recordsPerPage;


    const currentStudents =
        filteredStudents.slice(
            startIndex,
            endIndex
        );


    // =========================================
    // CREATE TABLE ROWS
    // =========================================

    profileTable.innerHTML =
        currentStudents.map(student => `

            <tr>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.enrollment}
                </td>

                <td>
                    ${student.department}
                </td>

                <td>
                    ${student.semester}
                </td>

                <td>
                    ${student.college}
                </td>

                <td>
                    ${student.email}
                </td>

            </tr>

        `).join("");


    // =========================================
    // MESSAGE
    // =========================================

    message.textContent =
        "Showing " +
        filteredStudents.length +
        " student records";


    // =========================================
    // PAGE NUMBER
    // =========================================

    pageNumber.textContent =
        "Page " +
        currentPage +
        " of " +
        totalPages;


    // =========================================
    // BUTTON STATES
    // =========================================

    previousButton.disabled =
        currentPage === 1;


    nextButton.disabled =
        currentPage === totalPages;
}


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener(
    "input",
    function () {

        currentPage = 1;

        renderStudents();

    }
);


// =========================================
// DEPARTMENT FILTER
// =========================================

departmentFilter.addEventListener(
    "change",
    function () {

        currentPage = 1;

        renderStudents();

    }
);


// =========================================
// SORT
// =========================================

sortSelect.addEventListener(
    "change",
    function () {

        currentPage = 1;

        renderStudents();

    }
);


// =========================================
// PREVIOUS
// =========================================

previousButton.addEventListener(
    "click",
    function () {

        if (currentPage > 1) {

            currentPage--;

            renderStudents();

        }

    }
);


// =========================================
// NEXT
// =========================================

nextButton.addEventListener(
    "click",
    function () {

        const filteredStudents =
            getFilteredStudents();


        const totalPages =
            Math.ceil(
                filteredStudents.length /
                recordsPerPage
            );


        if (currentPage < totalPages) {

            currentPage++;

            renderStudents();

        }

    }
);


// =========================================
// RESET
// =========================================

resetButton.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        departmentFilter.value = "all";

        sortSelect.value = "default";

        currentPage = 1;

        renderStudents();

    }
);


// =========================================
// START
// =========================================

loadStudents();