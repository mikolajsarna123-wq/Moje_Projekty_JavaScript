const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password_repeat");
const passwordShow = document.getElementById("showAllPasswords");

const checkPassword = () => {
  if (password.value !== passwordConfirm.value) {
    passwordConfirm.setCustomValidity("Hasła nie są identyczne!");
  } else {
    passwordConfirm.setCustomValidity("");
  }
};

const show = () => {
  if (passwordShow.checked) {
    password.type = "text";
    passwordConfirm.type = "text";
  }
  if (!passwordShow.checked) {
    password.type = "password";
    passwordConfirm.type = "password";
  }
};

passwordShow.addEventListener("click", show);
password.addEventListener("input", checkPassword);
passwordConfirm.addEventListener("input", checkPassword);

const form = document.querySelector("form");
const loginInput = document.getElementById("login");
const emailInput = document.getElementById("email");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentEmail = emailInput.value.toLowerCase();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === currentEmail,
  );

  if (emailExists) {
    emailInput.setCustomValidity("Ten adres e-mail jest już zajęty!");
    return;
  }

  const userData = {
    login: loginInput.value,
    email: emailInput.value,
    password: password.value,
  };

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "home.html";
});
