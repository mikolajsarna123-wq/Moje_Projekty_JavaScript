const button = document.querySelector(".start");
const select = document.querySelector(".select");
let playerChoice = "";
let games = 0,
  wins = 0,
  losses = 0,
  draws = 0;

//image dowload
const imgs = {
  paper: document.querySelector('[data-option="paper"]'),
  rock: document.querySelector('[data-option="rock"]'),
  scissors: document.querySelector('[data-option="scissors"]'),
};
//Change borderd
const changeBorder = (choice) => {
  Object.values(imgs).forEach((img) => (img.style.border = "none"));
  imgs[choice].style.border = "5px solid yellow";
};
//If target is a img
const selectRPS = (e) => {
  const target = e.target;
  if (target.tagName === "IMG") {
    playerChoice = target.dataset.option;
    changeBorder(playerChoice);
  }
};
//UpdateBoard
const updateBoard = (type, value) => {
  document.querySelector(`.${type} span`).textContent = value;
};
//setSummary
const setSummary = (key, value) => {
  document.querySelector(`[data-summary="${key}"]`).textContent = value;
};
//play
const play = () => {
  if (!playerChoice) return window.alert("Choose something from images");
  const options = Object.keys(imgs);
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  setSummary("your-choice", playerChoice);
  setSummary("ai-choice", computerChoice);

  //Who win
  const win =
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper");

  updateBoard("numbers", ++games);
  if (playerChoice === computerChoice) {
    updateBoard("draws", ++draws);
    setSummary("who-win", "draw");
  } else if (win) {
    updateBoard("wins", ++wins);
    setSummary("who-win", "win");
  } else {
    updateBoard("losses", ++losses);
    setSummary("who-win", "lose");
  }
};

select.addEventListener("click", selectRPS);
button.addEventListener("click", play);
