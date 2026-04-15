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

//funkcja Paska
function Zczytaj() {
  //WYBIERANIE KATEGORI
  const kategoria = document.getElementById("selectCategory").value;
  //WYBIERANIE FORMATU
  const typ = document.getElementById("selectType").value;
  //WYBIERANIE CZASU FILMU
  const suwak = document.querySelector('input[type="range"]');
  const length = formatujCzas(suwak);
  //DANE DO FILTRU
  filterToMovies(length, typ, kategoria);
}
//FILTROWANIE
function filterToMovies(length, typ, kategoria) {
  const result = dane.movies.filter((film) => {
    const time = !film.Movie_length || film.Movie_length >= length;
    const kat = kategoria === "all" || film.Category.includes(kategoria);
    const format = typ === "all" || film.Format === typ;

    return time && kat && format;
  });

  const sameTytuly = result.map((film) => film.Title);

  const filmyWKontenerze = document.querySelectorAll(".contener2 .film");
  //SPRAWDZANIE TYTUŁU
  filmyWKontenerze.forEach((div) => {
    const czyPasuje = sameTytuly.includes(div.querySelector("img").alt);
    //POJAWIANIE I ZNIKANIE SIE STYLU
    if (czyPasuje) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
  return result;
}

document.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  let img = e.target.alt;
  console.log(img);
});

function wprowadzenie(e) {
  let opis = document.querySelector(".opis");

  if (e.target.tagName === "IMG") {
    if (!opis) {
      let div = document.createElement("div");
      div.classList.add("opis");
      div.textContent = e.target.alt; //tu narazie jest film a bede chciał dodać opis
      let rodzic = e.target.parentElement;

      setTimeout(() => {
        if (e.target.parentElement && e.target.matches(":hover")) {
          rodzic.appendChild(div);
        }
      }, 2000);
    }
  } else {
    if (opis) {
      opis.remove();
    }
  }
}

document
  .querySelector(".contener2")
  .addEventListener("mouseover", wprowadzenie);

document.querySelector("button").addEventListener("click", Zczytaj);
