// 1. Zmienne globalne
let dragX, dragY, newDragX, newDragY;
let lineId, oldSquare;
let piece, square, line;
let turnFlag = true;
let isBlackPawn, isWhitePawn, isWhiteKnight, isBlackKnight;
const array = ["A", "B", "C", "D", "E", "F", "G", "H"];
let squareNumber, oldSquareNumber, indexo, indexn, isChangingColumn;

document.addEventListener("click", mouseDown);
const displayDiv = document.getElementById("dane");

function mouseDown(e) {
  isWhitePawn = e.target.classList.contains("pawnw");
  isBlackPawn = e.target.classList.contains("pawnb");
  isWhiteKnight = e.target.classList.contains("knightw");
  isBlackKnight = e.target.classList.contains("knightb");

  if (!isWhitePawn && !isBlackPawn && !isWhiteKnight && !isBlackKnight) return;

  //---LOGIKA TUR---
  if (turnFlag && (isBlackPawn || isBlackKnight)) return;
  if (!turnFlag && (isWhitePawn || isWhiteKnight)) return;

  piece = e.target;
  oldSquare = piece.parentElement;
  dragX = e.clientX;
  dragY = e.clientY;

  piece.style.position = "absolute";
  piece.style.zIndex = "100";
  piece.style.pointerEvents = "none";

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  newDragX = dragX - e.clientX;
  newDragY = dragY - e.clientY;
  dragX = e.clientX;
  dragY = e.clientY;
  piece.style.top = piece.offsetTop - newDragY + "px";
  piece.style.left = piece.offsetLeft - newDragX + "px";
}

function mouseUp(event) {
  const allElements = document.elementsFromPoint(event.clientX, event.clientY);
  line = allElements.find((el) => el.id && el.id.startsWith("line"));
  square = allElements.find(
    (el) => el.classList.contains("colorSquare") || el.classList.contains("uncolorSquare")
  );

  if (piece && square) {
    lineId = line ? line.id : "";
    squareNumber = Number(square.id.slice(1));
    oldSquareNumber = Number(oldSquare.id.slice(1));
    indexo = array.indexOf(oldSquare.id[0]);
    indexn = array.indexOf(square.id[0]);
    isChangingColumn = oldSquare.id[0] !== square.id[0];
    //--WYWOŁYWANIE LOGIKI---
    if (isWhitePawn || isBlackPawn) pawnLogic();
    if (isWhiteKnight || isBlackKnight) knightLogic();
  } else if (piece) {
    reset();
  }

  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
}

// --- LOGIKA PIONKA ---
function pawnLogic() {
  if (square === oldSquare) {
    reset();
    return;
  }

  const hasChild = square.children.length > 0;
  const isWhite = piece.classList.contains("pawnw");

  //---BRAK COFANIA I BICIA PRSOSTO---
  if (isWhite && (squareNumber >= oldSquareNumber || (!isChangingColumn && hasChild))) {
    reset();
    return;
  }
  if (!isWhite && (squareNumber <= oldSquareNumber || (!isChangingColumn && hasChild))) {
    reset();
    return;
  }

  if (isChangingColumn) {
    const distance = isWhite ? oldSquareNumber - squareNumber : squareNumber - oldSquareNumber;
    if (distance === 1 && hasChild && !isFriendlyFire(square, piece)) {
      square.appendChild(piece);
      captureLogic();
      finishTurn();
    } else {
      reset();
    }
  } else {
    //---PORUSZANIE SIE PROSTO----
    let canMove = false;
    const diff = isWhite ? oldSquareNumber - squareNumber : squareNumber - oldSquareNumber;

    if (diff === 1) canMove = true;
    else if (diff === 2) {
      if (isWhite && (lineId === "line5" || lineId === "line6")) canMove = true;
      else if (!isWhite && (lineId === "line3" || lineId === "line4")) canMove = true;
    }

    if (canMove && !hasChild) {
      square.appendChild(piece);
      finishTurn();
    } else {
      reset();
    }
  }
}
// --- LOGIKA KONIA----
function knightLogic() {
  if (
    indexn != indexo &&
    squareNumber != oldSquareNumber &&
    (Math.abs(indexn - indexo) === 2 || Math.abs(squareNumber - oldSquareNumber) === 2)
  ) {
    if (!isFriendlyFire(square, piece)) {
      square.appendChild(piece);
      captureLogic();
      finishTurn();
    } else {
      reset();
    }
  } else {
    reset();
  }
}

// --- FUNKCJE POMOCNICZE ---

function finishTurn() {
  center();
  turnFlag = !turnFlag;
  displayDiv.textContent = `Teraz tura: ${turnFlag ? "Białe" : "Czarne"}`;
}

function reset() {
  oldSquare.appendChild(piece);
  center();
}

function center() {
  piece.style.position = "static";
  piece.style.top = "auto";
  piece.style.left = "auto";
  piece.style.pointerEvents = "auto";
}

function captureLogic() {
  if (square.children.length > 1) {
    square.removeChild(square.children[0]);
  }
}

function isFriendlyFire(targetSquare, movingPiece) {
  if (targetSquare.children.length === 0) return false;
  const myColor = movingPiece.className.slice(-1);
  const victimColor = targetSquare.children[0].className.slice(-1);
  return myColor === victimColor;
}
