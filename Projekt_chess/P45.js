const fieldA7 = document.getElementById("A7");
const dane = document.getElementById("dane");
// const fieldA6 = document.getElementById("A6");
//-------------
const boardMap = {};
const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
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

let newY, newX, startXAfterClick, startYAfterClick, startX, startY;

function mouseDown(e) {
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
  fieldA7.style.top = fieldA7.offsetTop - newY + "px";
  fieldA7.style.left = fieldA7.offsetLeft - newX + "px";
}

function mouseUp() {
  document.removeEventListener("mousemove", mouseMove);
}
fieldA7.addEventListener("mousedown", mouseDown);

//Mapowanie
// const sprawdzanie = () => {
//   if (( startXAfterClick > 600 &&  startXAfterClick < 680,  startYAfterClick > 300 &&  startYAfterClick < 380)) {
//     console.log("kpytka");
//   }
// };
addEventListener("click", map);
function map(e) {
  const dystantsX = e.clientX - startX;
  const dystantsY = e.clientY - startY;
  newX = startX - e.clientX;
  newY = startY - e.clientY;
  startX = e.clientX;
  startY = e.clientY;

  let nazwa = "";

  for (nazwa in boardMap) {
    if (
      startY >= Math.floor(Math.min(boardMap[nazwa].yStart, boardMap[nazwa].yEnd)) &&
      startY <= Math.floor(Math.max(boardMap[nazwa].yStart, boardMap[nazwa].yEnd)) &&
      startX >= Math.floor(Math.min(boardMap[nazwa].xStart, boardMap[nazwa].xEnd)) &&
      startX <= Math.floor(Math.max(boardMap[nazwa].xStart, boardMap[nazwa].xEnd))
    ) {
      dane.textContent = `${dystantsX}:${dystantsY}${startX}:${startY}: nazwa pola : ${nazwa}`;
    }
  }
}
