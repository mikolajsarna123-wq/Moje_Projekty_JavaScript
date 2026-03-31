const square = document.querySelector(".scroll1");
document.body.appendChild(square);
let size = 10;
let grow = true;
square.style.width = size + "px";
square.style.height = size + "px";

// window.innerWidth*0,5;

window.addEventListener("scroll", function () {
  if (grow) {
    size = size + 20;
    square.style.width = size + "px";
    square.style.height = size + "px";
  } else {
    size = size - 20;
    square.style.width = size + "px";
    square.style.height = size + "px";
  }
  if (size >= window.innerWidth * 0.5) {
    grow = !grow;
  } else if (size <= 0) {
    grow = !grow;
  }
});
