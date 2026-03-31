const button = document.querySelector("button");
let number = 16;
const allLi = document.querySelectorAll("li");
button.addEventListener("click", function () {
  allLi.forEach((element) => {
    element.style.display = "block";
    element.style.fontSize = number + "px";
  });

  number += 5;
});
