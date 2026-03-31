const array = [];
const tekst = document.querySelector("div");
const input = document.querySelector("input");
const button = document.querySelector("button");
const lista = document.getElementById("Wyniki");
tekst.textContent = "wprowadzona liczba min i max po spacji:";

const numberRandomInt = (min, max) => {
  array[0] = input.value;
  const newArray = array[0].split(" ");

  min = parseInt(newArray[0]);
  max = parseInt(newArray[1]);

  console.log(newArray);
  for (let i = 0; i < 10; i++) {
    const wynik = Math.floor(Math.random() * (max - min + 1) + min);
    const newDiv = document.createElement("div");
    newDiv.textContent = `wylosownao: ${wynik}`;
    lista.appendChild(newDiv);
  }
};

input.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && numberRandomInt(e),
);
button.addEventListener("click", () => {
  lista.textContent = "";
});
