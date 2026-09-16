function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let course = document.getElementById("course").value;
    let year = document.getElementById("year").value;
    let terms = document.getElementById("terms").checked;

    let gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    let namePattern = /^[A-Za-z ]+$/;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let mobilePattern = /^[0-9]{10}$/;

    let passwordPattern =
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$/;

    let error = document.getElementById("error");

    let success = document.getElementById("success");

    error.innerHTML = "";

    success.innerHTML = "";

    if (name === "") {
        error.innerHTML = "Please enter your name";
        return false;
    }

    if (!namePattern.test(name)) {
        error.innerHTML = "Name should contain only letters";
        return false;
    }

    if (email === "") {
        alert("Please enter your email address");
        error.innerHTML = "Please enter your email";
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid Email! Please enter a valid email address.");
        error.innerHTML = "Please enter a valid email";
        return false;
    }

    if (mobile === "") {
        error.innerHTML = "Please enter your mobile number";
        return false;
    }

    if (!mobilePattern.test(mobile)) {
        error.innerHTML = "Mobile number must contain 10 digits";
        return false;
    }

    if (password === "") {
        error.innerHTML = "Please enter a password";
        return false;
    }

    if (!passwordPattern.test(password)) {
        error.innerHTML =
            "Password must have 6 characters, letter, number and special character";
        return false;
    }

    if (confirmPassword === "") {
        error.innerHTML = "Please confirm your password";
        return false;
    }

    if (password !== confirmPassword) {
        error.innerHTML = "Passwords do not match";
        return false;
    }

    if (course === "") {
        error.innerHTML = "Please select your course";
        return false;
    }

    if (year === "") {
        error.innerHTML = "Please select your year";
        return false;
    }

    if (!gender) {
        error.innerHTML = "Please select your gender";
        return false;
    }

    if (!terms) {
        error.innerHTML = "Please accept the terms and conditions";
        return false;
    }

    success.innerHTML = "Registration successful!";

    return false;
}