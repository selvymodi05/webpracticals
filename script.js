function changeTheme() {
    document.body.classList.toggle("dark");

    let button = document.getElementById("themeButton");

    if (document.body.classList.contains("dark")) {
        button.innerHTML = "☀️ Light Mode";
    } else {
        button.innerHTML = "🌙 Dark Mode";
    }
}

function validateForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let course = document.getElementById("course").value;
    let year = document.getElementById("year").value;
    let terms = document.getElementById("terms").checked;

    let gender = document.querySelector('input[name="gender"]:checked');

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
        error.innerHTML = "Mobile number must contain exactly 10 digits";
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

    if (captchaInput.value !== captchaText) {
        error.innerHTML = "Incorrect CAPTCHA";
        return false;
    }

    success.innerHTML = "Registration successful!";

    return false;
}


function validateEmail() {

    let email = document.getElementById("email").value.trim();
    let error = document.getElementById("error");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        error.innerHTML = "Email is required";
        return false;
    }

    if (!emailPattern.test(email)) {
        error.innerHTML = "Please enter a valid email address";
        return false;
    }

    error.innerHTML = "";
    return true;
}


function checkPasswordStrength() {

    let password = document.getElementById("password").value;
    let strength = document.getElementById("passwordStrength");

    if (password.length === 0) {
        strength.innerHTML = "";
    } else if (password.length < 6) {
        strength.innerHTML = "Weak Password";
    } else if (
        /[A-Za-z]/.test(password) &&
        /[0-9]/.test(password)
    ) {
        strength.innerHTML = "Medium Password";
    } else if (
        /[A-Za-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[@$!%*?&]/.test(password)
    ) {
        strength.innerHTML = "Strong Password";
    }
}


function realTimeName() {

    let name = document.getElementById("name").value.trim();
    let error = document.getElementById("error");
    let namePattern = /^[A-Za-z ]+$/;

    if (name !== "" && !namePattern.test(name)) {
        error.innerHTML = "Name should contain only letters";
    } else {
        error.innerHTML = "";
    }
}


function realTimeMobile() {

    let mobile = document.getElementById("mobile").value.trim();
    let error = document.getElementById("error");
    let mobilePattern = /^[0-9]{10}$/;

    if (mobile !== "" && !mobilePattern.test(mobile)) {
        error.innerHTML = "Mobile number must contain 10 digits";
    } else {
        error.innerHTML = "";
    }
}


let captchaText = "";

let captchaInput = document.createElement("input");
captchaInput.type = "text";
captchaInput.id = "captchaInput";
captchaInput.placeholder = "Enter CAPTCHA";

let captchaCanvas = document.createElement("canvas");
captchaCanvas.width = 200;
captchaCanvas.height = 60;

let captchaButton = document.createElement("button");
captchaButton.type = "button";
captchaButton.innerHTML = "Refresh CAPTCHA";

let form = document.querySelector("form");

form.insertBefore(captchaCanvas, document.getElementById("error"));
form.insertBefore(captchaInput, document.getElementById("error"));
form.insertBefore(captchaButton, document.getElementById("error"));


function generateCaptcha() {

    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    captchaText = "";

    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    let ctx = captchaCanvas.getContext("2d");

    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);

    ctx.font = "bold 30px Arial";
    ctx.fillText(captchaText, 35, 40);
}


captchaButton.onclick = generateCaptcha;

generateCaptcha();


document.getElementById("name").addEventListener("keyup", realTimeName);

document.getElementById("email").addEventListener("keyup", validateEmail);

document.getElementById("mobile").addEventListener("keyup", realTimeMobile);

document.getElementById("password").addEventListener(
    "keyup",
    checkPasswordStrength
);