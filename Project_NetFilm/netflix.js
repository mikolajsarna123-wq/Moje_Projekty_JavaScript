import dane from "./films.json" with { type: "json" };

function formatujCzas(suwak) {
  let minuty = Number(suwak.value);
  let h = Math.floor(minuty / 60);
  let m = minuty % 60;
  m < 10 ? (m = `0${m}`) : m;
  let tekst = `${h}h${m}min`;
  document.getElementById("wynik").textContent = tekst;
  suwak = `${m}${h}`;
  return minuty;
}
window.formatujCzas = formatujCzas;
//Tablica od 0-11

function Zczytaj(option, kategoria, typ, length, suwak) {
  //Wybieranie kategori
  option = document.getElementById("selectCategory");
  kategoria = option.value;
  console.log(kategoria);
  //Wybieranie typu
  option = document.getElementById("selectType");
  typ = option.value;
  console.log(typ);
  //Wybieranie długości filmu
  suwak = document.querySelector('input[type="range"]');
  length = formatujCzas(suwak);
  console.log(`minuty ${length}`);
}

console.log(dane.movies[0].Title);

document.querySelector("button").addEventListener("click", Zczytaj);
