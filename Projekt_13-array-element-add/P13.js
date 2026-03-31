//Projekt ma pozwolić użytkownjikowi na wprowadzenie imion
//do tablicy ale nie będzie mógł wporadzić 2 razy tego samego imienia bo wyskoczy mu alert ze już jest
const div = document.querySelector("div");
const names = [];
const addName = (e) => {
  e.preventDefault(); //nie odświeża strony po kliknięciu przycisku
  const input = document.querySelector("input");
  const newName = input.value; //pobieramy wartość z inputa i przypisujemy do zmiennej newName
  if (input.value.length) //sprawdzenie czy input nie jest pusty
  {
    for (const name of names) {
      if (name === newName) {
        alert("Imię już istnieje!");
        return;
      }
    }
    names.push(newName);
    div.textContent += newName + ", "; // można też napisac div innerHTML = names.join(", ");
    input.value = "";
  }
};

document.querySelector("button").addEventListener("click", addName);
