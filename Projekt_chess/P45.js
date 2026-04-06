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
    return;
  }

  if (!flaga && isWhite) {
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

      // console.log(idFirstElement);
      // console.log(idSecendElement);
      // console.log(idThridElement);
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
  const numberSecendElement = parseInt(idSecendElement.slice(1));

  //__________________
  //zakaz cofania sie
  if (firstElement.className === "pawn") {
    if (numberSecendElement >= numberStarePole) {
      starePole.appendChild(firstElement);
      center();
      return;
    }
  } else if (firstElement.className === "pawnb") {
    if (numberSecendElement <= numberStarePole) {
      starePole.appendChild(firstElement);
      center();
      return;
    }
  }

  function checkAraund() {
    //dla białych
    //sprawdza wszystkie od 7-1;
    //A sprawdza B
    //B sprawdza A i C
    //C sprawdza B i D
    //D sprawdza C i E
    //E sprawdza D i F
    //F sprawdza E i H
    //G sprawdza F i H
    //H sprawdza G

    //dla czarnych
    //sprawdza wszystkie od 1-7;
    //A sprawdza B
    //B sprawdza A i C
    //C sprawdza B i D
    //D sprawdza C i E
    //E sprawdza D i F
    //F sprawdza E i H
    //G sprawdza F i H
    //H sprawdza G

    console.log(starePole.id);
  }
  checkAraund();
  // _______________________________________
  //lista zakazów nie wchodzenie na ten sam pionek jeżeli nie jest na kratce
  // i jeżeli sie nie ruszył i porszua sie tylko po prostej lini
  //(z ostatnim bedzie problem bo trzeba bedzie zmienić bo pionki biją na ukoz)
  if (
    !secendElement ||
    secendElement === starePole ||
    secendElement.children.length > 0 ||
    starePole.id.slice(0, 1) !== idSecendElement.slice(0, 1)
  ) {
    starePole.appendChild(firstElement);
    center();
    return;
  }
  //_______________________
  //pierwszy ruch jest osobna po pionek mze ruszyć sie o 2 pola
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
  //_____________________________________-
  //Następny ruch

  function secondMove() {
    let secondMoveSuccess = false;
    //czy jest biały
    if (firstElement.className === "pawn") {
      if (idThridElement === "line4" && numberStarePole != 7) secondMoveSuccess = true;
    } else {
      if (idThridElement === "line5" && numberStarePole != 2) secondMoveSuccess = true;
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
