function login(event) {
  // Retrieve usersData from localStorage on page load (if available)
  let usersDataStr = localStorage.getItem("usersData");
  let usersData = usersDataStr ? JSON.parse(usersDataStr) : [];

  let email = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validate form data (you can add more validation if needed)
  if (!email || !password) {
    alert("Please fill in all the fields");
    return;
  }

  // Check if the user exists and the password is correct
  let getuser = usersData.find(
    (user) => user.email === email && user.password === password
  );

  if (getuser) {
    // User found, do something (e.g., redirect to another page)
    swal("Good job!", "Login successfull", "success");
    setTimeout(function() {
        window.location.href = "task.html";
      }, 2000); 
  } else {
    swal({
        title: "Sorry, Invalid Email or Password",
        
        icon: "error",
      });
  }
}
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    login(); // Call the signUp function
  });
