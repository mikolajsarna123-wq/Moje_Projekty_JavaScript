const squer = document.createElement("div");
const body = document.querySelector("body");
body.appendChild(squer);
let squerX = 150;
let squerY = 50;
squer.style.left = squerX + "px"; //można też pisać jak niżej
squer.style.top = `${squerY}px`;

let drawAcive = false;

let insertDivX;
let insertDivY;

squer.addEventListener("mousedown", (e) => {
  squer.style.backgroundColor = "gray";
  drawAcive = true;
  //   drawAcive = !drawAcive;

  insertDivX = e.offsetX;
  insertDivY = e.offsetY;
});

squer.addEventListener("mousemove", (e) => {
  if (!drawAcive) return;

  squerX = e.clientX - insertDivX;
  squerY = e.clientY - insertDivY;
  squer.style.left = `${squerX}px`;
  squer.style.top = `${squerY}px`;
});

squer.addEventListener("mouseup", () => {
  squer.style.backgroundColor = "black";
  drawAcive = false;
  //   drawAcive = !drawAcive;
});
