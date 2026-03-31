const input = document.querySelector("input");
const passwords = ["Jeden", "dwA", "tRzy"];
const messages = ["Brawo studencie !", "BRawo!", "Nie Brawo!"];
const haslo = document.querySelector("li");
haslo.textContent = `hasło to:  ${passwords}`;
const LCPasswords = passwords.map((password) => password.toLowerCase()); //LC-lowerCase
const showMessage = (e) => {
  const textInput = e.target.value.toLowerCase();
  for (let i = 0; i < LCPasswords.length; i++) {
    if (LCPasswords[i] === textInput) {
      document.querySelector("div").textContent = messages[i];
      e.target.value = "";
    }
  }
};
input.addEventListener("focus", (e) => {
  e.target.classList.toggle("active"); //add class do inputa, który jest focusowany
});

input.addEventListener("blur", (e) => {
  e.target.classList.toggle("active"); //remove class do inputa, który jest blur (nie jest focusowany)
});

input.addEventListener("input", showMessage);
