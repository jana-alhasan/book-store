const users = JSON.parse(localStorage.getItem('users')) || [];
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();


  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeatpassword').value;

 
  const userExists = users.some((user) => user.email === email || user.username === username);

  if (userExists) {
    alert('A user with this email or username already exists. Please choose a different one.');
  } else if (password !== repeatPassword) {
    alert('Passwords do not match. Please check and try again.');
  } else {

    const user = {
      email,
      username,
      password, 
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully. You can now log in.');
  }
});
