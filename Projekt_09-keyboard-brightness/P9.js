// strzałka do dołu ekran body robi sie ciemniejsze
//strzałka do góry ekran body robi sie jaśniejszy
//Kod z kursu
let red = 100;
let green = 100;
let blue = 100;

document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

const changeColor = (e) => {
  //wersja - 2 instrukcja switch
  switch (e.keyCode) {
    case 38:
      document.body.style.backgroundColor = `rgb(${red <= 255 ? (red += 5) : red}, ${green <= 255 ? (green += 5) : green}, ${blue <= 255 ? (blue += 5) : blue})`;
      break;
    case 40:
      document.body.style.backgroundColor = `rgb(${red > 0 ? (red -= 5) : red}, ${green > 0 ? (green -= 5) : green}, ${blue > 0 ? (blue -= 5) : blue})`;
      break;
  }
  console.log(red);
};

window.addEventListener("keydown", changeColor);
