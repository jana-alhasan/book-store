  const loginForm = document.getElementById('login-form');
  document.addEventListener('DOMContentLoaded', function () {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const emailOrUsername = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Retrieve user information from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Check if the user exists and if the provided credentials match
      const foundUser = users.find((user) => (user.email === emailOrUsername || user.username === emailOrUsername) && user.password === password);
  
      if (foundUser) {
        window.location.href="../pages/main.html";
      } else {
        alert('Login failed. Please check your credentials.');
     
      }
    });
  });
  
