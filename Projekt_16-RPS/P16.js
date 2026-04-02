const gameSummary = {
  numbers: 0,
  win: 0,
  losses: 0,
  draw: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

//Pierwsza funkcjia
function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px yellow";
}

//Wybór komputera

function aiChoice() {
  return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

function checkResult(player, ai) {
  if (player == ai) return "draw";
  else if (
    (player === "paper" && ai === "rock") ||
    (player === "rock" && ai === "scissors") ||
    (player === "scissors" && ai === "paper")
  )
    return "win";
  else return "lose";
}
//Publikacja wyniku
function publisResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.win;
    document.querySelector('[data-summary="who-win"]').textContent = "You win";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "lose") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Computer win";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draw;
    document.querySelector('[data-summary="who-win"]').textContent = "Draw :\\";
    document.querySelector('[data-summary="who-win"]').style.color = "black";
  }
}
function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = "";
}

//Funkcja starująca

function startGame() {
  if (!game.playerHand) return alert("wybierz dłoń!!!");

  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publisResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
