const loginForm = document.querySelector(".container");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentEmail = emailInput.value.toLowerCase();
  const currentPassword = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) =>
      user.email.toLowerCase() === currentEmail &&
      user.password === currentPassword,
  );

  if (foundUser) {
    window.location.href = "home.html";
  } else {
    emailInput.setCustomValidity("Błędny e-mail lub hasło!");
  }
});
