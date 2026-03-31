const rectangle = document.querySelector(".scroll1");
document.body.appendChild(rectangle);
let height = 10;
let change = true; //flaga
let color = "red";

window.addEventListener("scroll", function () {
  rectangle.style.height = height + "px";
  rectangle.style.backgroundColor = color;

  if (change) {
    height += 20;
    color = "red"; //można też odwołać się do klasy w css poprzez rectangle.classList.add("scroll1"/"scroll2");
  } else {
    height -= 20;
    color = "green";
  }
  if (height >= window.innerHeight * 0.5) {
    change = false;
  } else if (height <= 0) {
    change = true;
  }
});
