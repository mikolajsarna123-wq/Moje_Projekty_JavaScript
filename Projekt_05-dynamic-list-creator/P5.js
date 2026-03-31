//Tworzenie elementów guzik i lista
const button = document.createElement("button");
const buttonReset = document.createElement("button");
button.textContent = "START";
buttonReset.textContent = "RESET";
document.body.appendChild(button);
document.body.appendChild(buttonReset);
const ul = document.createElement("ul");
document.body.appendChild(ul);
//Kod
let counter = 0;
button.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.textContent = `nowy element ${counter++}`;
    li.style.fontSize = `${counter + 16}px`;
    document.querySelector("ul").appendChild(li);
  }
});
buttonReset.addEventListener("click", () => {
  counter = 0;
  document.querySelector("ul").textContent = "";
});
