const dane = document.getElementById("dane");
const fieldA7 = document.getElementById("A7");
const fieldA6 = document.getElementById("A6");
const fieldA2 = document.getElementById("A2");
const fieldA3 = document.getElementById("A3");
//
let newY, newX, startXAfterClick, startYAfterClick, startX, startY, nazwa, clicketPawn;
//-------------
const boardMap = {};
const fields = {};
const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
window.onload = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const id = `${columns[i]}${j}`;
      fields[`field${id}`] = document.getElementById(`${columns[i]}${j}`);
    }
  }
};

columns.forEach((col, colIndex) => {
  for (let row = 1; row <= 8; row++) {
    const fieldName = col + row;
    boardMap[fieldName] = {
      xStart: 600 + colIndex * 80,
      xEnd: 600 + (colIndex + 1) * 80,
      yStart: 770 - (row - 1) * 80,
      yEnd: 770 - row * 80
    };
  }
});

function mouseDown(e) {
  clicketPawn = e.currentTarget;
  startXAfterClick = e.clientX;
  startYAfterClick = e.clientY;
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  newX = startXAfterClick - e.clientX;
  newY = startYAfterClick - e.clientY;
  startXAfterClick = e.clientX;
  startYAfterClick = e.clientY;
  clicketPawn.style.top = clicketPawn.offsetTop - newY + "px";
  clicketPawn.style.left = clicketPawn.offsetLeft - newX + "px";
}

function mouseUp() {
  document.removeEventListener("mousemove", mouseMove);
  addEventListener("click", map);
}

//Zmiana
function change() {
  switch (nazwa) {
    case "A6":
      fieldA7.classList.remove("pawn");
      fieldA6.classList.add("pawn");
      break;
    case "A3":
      fieldA2.classList.remove("pawnb");
      fieldA3.classList.add("pawnb");
  }

  //Mapowanie
}
function map(e) {
  const dystantsX = e.clientX - startX;
  const dystantsY = e.clientY - startY;
  newX = startX - e.clientX;
  newY = startY - e.clientY;
  startX = e.clientX;
  startY = e.clientY;

  nazwa = "";

  for (nazwa in boardMap) {
    if (
      startY >= Math.floor(Math.min(boardMap[nazwa].yStart, boardMap[nazwa].yEnd)) &&
      startY <= Math.floor(Math.max(boardMap[nazwa].yStart, boardMap[nazwa].yEnd)) &&
      startX >= Math.floor(Math.min(boardMap[nazwa].xStart, boardMap[nazwa].xEnd)) &&
      startX <= Math.floor(Math.max(boardMap[nazwa].xStart, boardMap[nazwa].xEnd))
    ) {
      dane.textContent = `${dystantsX}:${dystantsY}:${startX}:${startY}: nazwa pola : ${nazwa}`;
      change();
    }
  }
}
fieldA7.addEventListener("mousedown", mouseDown);
fieldA6.addEventListener("mousedown", mouseDown);
fieldA2.addEventListener("mousedown", mouseDown);
fieldA3.addEventListener("mousedown", mouseDown);
