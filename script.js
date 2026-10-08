
function setMessage(type, message) {

    const errorEl = document.getElementById("error");
    const successEl = document.getElementById("success");

    if (!errorEl || !successEl) {
        return;
    }

    errorEl.textContent = type === "error" ? message : "";
    successEl.textContent = type === "success" ? message : "";
}


function validateForm() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;

    const genderChecked =
        document.querySelector('input[name="gender"]:checked');

    const termsChecked =
        document.getElementById("terms").checked;


    if (!name) {
        setMessage("error", "Please enter your full name.");
        return false;
    }


    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage("error", "Please enter a valid email address.");
        return false;
    }


    if (!/^[0-9]{10,15}$/.test(mobile)) {
        setMessage("error", "Mobile number must contain 10 to 15 digits.");
        return false;
    }


    if (password.length < 6) {
        setMessage("error", "Password must be at least 6 characters long.");
        return false;
    }


    if (password !== confirmPassword) {
        setMessage("error", "Passwords do not match.");
        return false;
    }


    if (!course) {
        setMessage("error", "Please select your course.");
        return false;
    }


    if (!year) {
        setMessage("error", "Please select your year.");
        return false;
    }


    if (!genderChecked) {
        setMessage("error", "Please select your gender.");
        return false;
    }


    if (!termsChecked) {
        setMessage("error", "Please accept the terms and conditions.");
        return false;
    }


    return true;
}


document.addEventListener("DOMContentLoaded", () => {

    const themeButton =
        document.getElementById("themeButton");

    if (!themeButton) {
        return;
    }


    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            themeButton.textContent = "☀️ Light Mode";

            localStorage.setItem("theme", "dark");

        } else {

            themeButton.textContent = "🌙 Dark Mode";

            localStorage.setItem("theme", "light");
        }

    });


    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

        themeButton.textContent = "☀️ Light Mode";
    }

});

