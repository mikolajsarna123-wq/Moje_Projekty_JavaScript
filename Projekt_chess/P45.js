// 1. Zmienne globalne
let dragX, dragY, newDragX, newDragY;
let lineId, oldSquare;
let piece, square, line;
let turnFlag = true;
let isBlackPawn,
  isWhitePawn,
  isWhiteKnight,
  isBlackKnight,
  isWhiteRock,
  isBlackRock,
  isWhiteBishop,
  isBlackBishop;
const array = ["A", "B", "C", "D", "E", "F", "G", "H"];
let squareNumber, oldSquareNumber, indexo, indexn, isChangingColumn;

document.addEventListener("mousedown", mouseDown);
const displayDiv = document.getElementById("dane");

function mouseDown(e) {
  isWhitePawn = e.target.classList.contains("pawnw");
  isBlackPawn = e.target.classList.contains("pawnb");
  isWhiteKnight = e.target.classList.contains("knightw");
  isBlackKnight = e.target.classList.contains("knightb");
  isWhiteRock = e.target.classList.contains("rockw");
  isBlackRock = e.target.classList.contains("rockb");
  isWhiteBishop = e.target.classList.contains("bishopw");
  isBlackBishop = e.target.classList.contains("bishopb");

  if (
    !isWhitePawn &&
    !isBlackPawn &&
    !isWhiteKnight &&
    !isBlackKnight &&
    !isWhiteRock &&
    !isBlackRock &&
    !isWhiteBishop &&
    !isBlackBishop
  )
    return;

  //---LOGIKA TUR---
  if (turnFlag && (isBlackPawn || isBlackKnight || isBlackRock || isBlackBishop)) return;
  if (!turnFlag && (isWhitePawn || isWhiteKnight || isWhiteRock || isWhiteBishop)) return;

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
    if (isWhiteRock || isBlackRock) rockLogic();
    if (isWhiteBishop || isBlackBishop) bishopLogic();
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
  const dX2 = Math.abs(indexn - indexo) === 2;
  const dY2 = Math.abs(squareNumber - oldSquareNumber) === 2;
  const dX1 = Math.abs(indexn - indexo) === 1;
  const dY1 = Math.abs(squareNumber - oldSquareNumber) === 1;

  //kiedy dy jest równe 2 to dx ma być równe 1 i odwrotnie

  if (indexn != indexo && squareNumber != oldSquareNumber && ((dX2 && dY1) || (dY2 && dX1))) {
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

// --- LOGIKA WIERZY----
function rockLogic() {
  console.log(oldSquareNumber, indexo);
  console.log(indexn, squareNumber);
  const dX1 = Math.abs(indexn - indexo);
  const dY1 = Math.abs(squareNumber - oldSquareNumber);
  console.log(dX1, dY1);
  if ((!isFriendlyFire(square, piece) && dX1 == 0) || dY1 == 0) {
    captureLogic();
    square.appendChild(piece);
    finishTurn();
    captureLogic();
    console.log("buja");
  } else {
    reset();
  }
}
// --- LOGIKA GOŃCA----
function bishopLogic() {
  const dX1 = Math.abs(indexn - indexo);
  const dY1 = Math.abs(squareNumber - oldSquareNumber);
  console.log(dX1, dY1);
  if (!isFriendlyFire(square, piece) && dX1 == dY1) {
    captureLogic();
    square.appendChild(piece);
    finishTurn();
    captureLogic();
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
