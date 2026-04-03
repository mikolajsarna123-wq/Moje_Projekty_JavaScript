//po klikęciu strzałkami zatrzymuje nam sie SetInterwal
//klikamy strzałkami lewo i prawo na zmiane zdięcia ale nie robi nam sie set Interwal
//lewo keyCode = 37 prawo keyCode = 39
//utworzyć fukncje keyChangeSlide
//window.addEvenLisiner("keydown",keyChangeSlide) może trzeba bedzei zmienić set Interval
const slideList = [
  {
    img: "images/img1.jpg",
    text: "First txt",
  },
  {
    img: "images/img2.jpg",
    text: "Second txt",
  },
  {
    img: "images/img3.jpg",
    text: "Third txt",
  },
];
const image = document.querySelector("img.slider");
const h1 = document.querySelector("h1.slider");
const dots = [...document.querySelectorAll(".dots span")];

//Interfejs
const time = 3000;
let slideActive = 0;

//Implementacja

//lewo keyCode = 37 prawo keyCode = 39
const keyChangeSlide = (e) => {
  switch (e.keyCode) {
    case 37: // Strzałka w lewo
      slideActive--;
      break;
    case 39: // Strzałka w prawo
      slideActive++;
      break;
    default:
      return;
  }
  clearInterval(indexInterval);
  changeSlide();
  indexInterval = setInterval(() => {
    slideActive++;
    changeSlide();
  }, time);
};

const changeDot = () => {
  const activeDot = dots.findIndex((dot) => dot.classList.contains("active")); //ona nam przeszukuje czy wykonuje sie na każdym elemencie tablicy
  dots[activeDot].classList.remove("active");
  dots[slideActive].classList.add("active");
};

const changeSlide = () => {
  if (slideActive === slideList.length) {
    slideActive = 0;
  }
  if (slideActive < 0) {
    slideActive = slideList.length - 1;
  }
  image.src = slideList[slideActive].img;
  h1.textContent = slideList[slideActive].text;
  changeDot();
};

let indexInterval = setInterval(() => {
  slideActive++;
  changeSlide();
}, time);

window.addEventListener("keydown", keyChangeSlide);
