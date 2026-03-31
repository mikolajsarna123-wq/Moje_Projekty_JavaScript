const button = document.createElement("button");
button.textContent = "Add Element";
button.className = "button";
let oddNumber = 1;
const addElement = () => {
  const li = document.createElement("li");
  li.textContent = oddNumber;
  if (oddNumber % 3 === 0) {
    li.classList.add("font");
  }
  document.body.appendChild(li);
  oddNumber += 2;
};
button.addEventListener("click", addElement);

document.body.appendChild(button);
