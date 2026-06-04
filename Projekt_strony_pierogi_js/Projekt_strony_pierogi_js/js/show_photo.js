const findInput = document.getElementById("find");
const container = document.querySelector("main");
const checkboxes = document.querySelectorAll("aside input[type='checkbox']");

let wszystkiePrzepisy = [];

function wyswietlPrzepisy(przepisyDoWyswietlenia) {
  container.innerHTML = "";

  przepisyDoWyswietlenia.forEach((item) => {
    // Formatowanie ceny na dwa miejsca po przecinku (np. 29.50)
    const sformatowanaCena = Number(item.cena).toFixed(2);

    const sectionHTML = `
      <section>
        <h2>${item.nazwa}</h2>
        <img src="${item.url}" alt="img" />
        <p class="cena">${sformatowanaCena} zł</p>
      </section>
    `;
    container.insertAdjacentHTML("beforeend", sectionHTML);
  });
}

function filtrujPrzepisy() {
  const szukanaFraza = findInput ? findInput.value.trim().toLowerCase() : "";

  const zaznaczoneKategorie = Array.from(checkboxes)
    .filter((cb) => cb.checked && cb.id !== "liked")
    .map((cb) => cb.parentElement.innerText.trim().toLowerCase());

  const czyPokazacTylkoPolubione =
    document.getElementById("liked")?.checked || false;
  const polubioneIds = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  const przefiltrowane = wszystkiePrzepisy.filter((item) => {
    const pasujeTekst = item.nazwa.toLowerCase().includes(szukanaFraza);

    const pasujePolubione =
      !czyPokazacTylkoPolubione || polubioneIds.includes(item.id);

    const kategoriePrzepisu = (item.kategoria || []).map((k) =>
      k.toLowerCase(),
    );

    const pasujeKategoria =
      zaznaczoneKategorie.length === 0 ||
      zaznaczoneKategorie.some((kat) => {
        if (
          kat.includes("owoce morza") &&
          kategoriePrzepisu.some(
            (k) => k.includes("morza") || k.includes("rybne"),
          )
        ) {
          return true;
        }
        return kategoriePrzepisu.includes(kat);
      });

    return pasujeTekst && pasujePolubione && pasujeKategoria;
  });

  wyswietlPrzepisy(przefiltrowane);
}

fetch("/json/pierogi.json")
  .then((response) => response.json())
  .then((data) => {
    wszystkiePrzepisy = data;
    wyswietlPrzepisy(wszystkiePrzepisy);
  })
  .catch((error) => console.error("Błąd pobierania danych:", error));

if (findInput) {
  findInput.addEventListener("input", filtrujPrzepisy);
}

checkboxes.forEach((cb) => {
  cb.addEventListener("change", filtrujPrzepisy);
});
