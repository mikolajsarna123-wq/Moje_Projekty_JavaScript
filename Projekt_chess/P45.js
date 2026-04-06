let dragX, dragY, newdragX, newdragY;
let idFirstElement, idSecendElement, idThridElement, pionek, starePole;
let firstElement, secendElement, thridElement;
let flaga = true;
document.addEventListener("click", mouseDown);
const div = document.getElementById("dane");

function mouseDown(e) {
  const isWhite = e.target.classList.contains("pawn");
  const isBlack = e.target.classList.contains("pawnb");
  if (!isWhite && !isBlack) return;

  if (flaga && isBlack) {
    console.log("Tura białych!");
    return;
  }

  if (!flaga && isWhite) {
    console.log("Tura czarnych!");
    return;
  }
  if (!e.target.classList.contains("pawn") && !e.target.classList.contains("pawnb")) return;
  pionek = e.target;
  starePole = pionek.parentElement;
  dragX = e.clientX;
  dragY = e.clientY;
  pionek.style.position = "absolute";
  pionek.style.pointerEvents = "none";
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  if (!pionek) return;
  newdragX = dragX - e.clientX;
  newdragY = dragY - e.clientY;
  dragX = e.clientX;
  dragY = e.clientY;
  pionek.style.top = pionek.offsetTop - newdragY + "px";
  pionek.style.left = pionek.offsetLeft - newdragX + "px";
}
function mouseUp(event) {
  {
    const allElements = document.elementsFromPoint(event.clientX, event.clientY);
    thridElement = allElements.find((el) => el.id && el.id.startsWith("line"));
    secendElement = allElements.find(
      (el) =>
        (el.classList.contains("colorSquare") || el.classList.contains("uncolorSquare")) &&
        el.id !== idFirstElement
    );
    firstElement = pionek;

    if (firstElement) {
      idFirstElement = firstElement.id;
      idSecendElement = secendElement ? secendElement.id : "brak pola";
      idThridElement = thridElement ? thridElement.id : "brak pionka";

      console.log(idFirstElement);
      console.log(idSecendElement);
      console.log(idThridElement);
    }
  }

  pawn();
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  pionek = null;
}
function center() {
  firstElement.style.position = "static";
  firstElement.style.top = "auto";
  firstElement.style.left = "auto";
  firstElement.style.pointerEvents = "auto";
}

function pawn() {
  let firstMoveSuccess = false;
  // let check = true;
  const numberStarePole = parseInt(starePole.id.slice(1));
  const numbersecendElement = parseInt(idSecendElement.slice(1));
  // if (numbersecendElement > numberStarePole) potrzbuje zeby pionki misię nie cofały

  console.log(numbersecendElement, numberStarePole);

  if (!secendElement || secendElement === starePole || secendElement.children.length > 0) {
    starePole.appendChild(firstElement);
    center();
    return;
  }

  function fisrMove() {
    //czy jest biały
    if (firstElement.className === "pawn") {
      if (idThridElement === "line5" || idThridElement === "line6") firstMoveSuccess = true;
      else {
        secondMove();
        return;
      }
    } else {
      if (idThridElement === "line3" || idThridElement === "line4") firstMoveSuccess = true;
      else {
        secondMove();
        return;
      }
    }

    if (firstMoveSuccess) {
      secendElement.appendChild(firstElement);
      center();
      flaga = !flaga;
      div.textContent = `Teraz tura: ${flaga ? "Białe" : "Czarne"}`;
    } else {
      starePole.appendChild(firstElement);
      center();
    }
  }
  //_____________________________________--
  function secondMove() {
    let secondMoveSuccess = false;
    //czy jest biały
    if (firstElement.className === "pawn") {
      if (idThridElement === "line4") secondMoveSuccess = true;
    } else {
      if (idThridElement === "line5") secondMoveSuccess = true;
    }
    if (secondMoveSuccess) {
      secendElement.appendChild(firstElement);
      center();
      flaga = !flaga;
      div.textContent = `Teraz tura: ${flaga ? "Białe" : "Czarne"}`;
    } else {
      starePole.appendChild(firstElement);
      center();
    }
  }
  fisrMove();

  // if (secendMoveSucces) {}
}
