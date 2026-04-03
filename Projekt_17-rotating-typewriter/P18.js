//3 jakieś teskty które po kolei się włączają a na 3 się kończy
//zauwazyćtrzeba ze jak sie 1 skończy to nie przeskakuje na drugi nagle tylko czeka
//migający kursor
//użyj setTimaout zamiast setInterval

const spnTxt = document.querySelector(".text");
const spnCursor = document.querySelector(".cursor");
//txt[0][2]; //0 odwołanie do 1 elementu i 2 indeksu czyli k
const txt = ["Marionetka", "Kolczuga", "Wykupić"];

// //Parametry
let activeLetter = 0; //wartość początkowa długości teksu
let activeText = 0; //wartość początkowa długości tablicy
const tablica = txt.length;

//Implemetacja
const addLetter = () => {
  const tekst = txt[activeText].length;
  // 1. Warunek pisania liter w bieżącym zdaniu
  if (activeText < tablica && activeLetter < tekst) {
    spnTxt.textContent += txt[activeText][activeLetter];
    activeLetter++;
    setTimeout(addLetter, 300);
  } else if (activeText < tablica - 1) {
    activeText++;
    activeLetter = 0;

    setTimeout(() => {
      spnTxt.textContent = "";
      addLetter();
    }, 2000);
  }
};

const cursorAnimation = () => {
  spnCursor.classList.toggle("active");
};
// const indexTyping = setInterval(addLetter, time); //Przez określony czas będzie dawać nam 1 literee
setInterval(cursorAnimation, 400);
addLetter();
