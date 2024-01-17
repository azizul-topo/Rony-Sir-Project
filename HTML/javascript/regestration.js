// app.js

// Array to store signup data
let usersData = [];

// Function to check if an email is already registered
function isEmailUnique(email) {
    return !usersData.some(user => user.email === email);
}

// Function to handle signup form submission
function signUp() {
    // Get form values
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validate form data (you can add more validation if needed)
    if (!username || !email || !password) {
        alert("Please fill in all the fields");
        return;
    }

    // Check if the email is unique
    if (!isEmailUnique(email)) {
        alert("This email is already registered. Please use a different email.");
        return;
    }

    // Create an object with user data
    let userData = {
        username: username,
        email: email,
        password: password
    };

    // Push the object to the array
    usersData.push(userData);
console.log(usersData)
localStorage.setItem('usersData', JSON.stringify(usersData));
    // Clear the form
    document.getElementById("signup-form").reset();

    // Display a success message or redirect the user
    alert("Sign up successful! You can now login.");
    window.location.href = "task.html";
    
}

// Function to handle login form submission
// Function to handle login form submission


// Attach the signUp function to the signup form's submit event
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    signUp(); // Call the signUp function
});

console.log(usersData)