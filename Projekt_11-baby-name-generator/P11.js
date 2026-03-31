const button = document.querySelector("button");
const div = document.querySelector("div");
const names = ["Anna", "Bartek", "Cecylia", "Damian", "Ewa", "Kuba"];
const prefixs = [
  "Na 100% jestem pewien",
  "Zapewniam Cie",
  "Jesem Pewien",
  "Przekoasz się",
];
// console.log(names[index]); // losowe imię z tablicy
const nameGenerator = () => {
  const indexNames = Math.floor(Math.random() * names.length);
  const indexPrefixes = Math.floor(Math.random() * prefixs.length);
  div.textContent = `${prefixs[indexPrefixes]}, że najlepsze będzie imię ${names[indexNames]}`;
};

button.addEventListener("click", nameGenerator);
