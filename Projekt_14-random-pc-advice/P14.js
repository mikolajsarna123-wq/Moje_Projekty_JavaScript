//mamy inputa do którego wprowadzmy sobie dane do tablicy który będzie pushoway do tablicy
//z tej tablicy za pomocą pokaż rade bedziemy generować 1 z możliwych odpowiedzi
//resetuj ma nam czyści teblice do 0
//Pokaż możłiwości ma nam dać alerta z możliwościami w tablicy

// ogółem jakbyśmy robili w każej osobnej fukcnji to w reset i dodaj powinno by event.preventDefault(); po to aby nie resetować całej storny

const input = document.querySelector("input");
const buttons = document.querySelector("#buttons");
const answer = document.getElementById("answer");

const array = [];
const Tablica = (e) => {
  const action = e.target.id; //przypisanie targetu.id to action

  switch (
    action //w zależności od id guzika będzie sie zmieniać robić co innego
  ) {
    case "add": {
      const wpisanyTekst = input.value; //input value jest to co wpisujemy do tekstu
      array.push(wpisanyTekst); //wpisywanie nowej wartości do tablicy array
      input.value = "";
      break;
    }
    case "reset":
      array.splice(0); //czyszczenie tablicy od 0 do całej długości
      answer.textContent = "";
      break;
    case "showTip": {
      const index = Math.floor(Math.random() * array.length); //przupisywanie do indexu randomowej zaokrąglonej liczby
      answer.textContent = array[index];
      break;
    }
    case "showAllTip":
      alert(`To jest całą twoja tablica:${array}`); // możemy zapisać alert.options join jeżeli chcemy przerwe jakąs
      break;
  }
};

buttons.addEventListener("click", Tablica);
