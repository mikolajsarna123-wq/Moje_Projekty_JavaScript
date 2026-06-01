import {
  arrow,
  container,
  backdrop,
  labels,
  box,
  pobierzPrzepisy,
} from "./config.js";
import { obsluzPolubienie, odswiezStatusPolubienia } from "./favorites.js";
import { obsluzKoszyk, odswiezStatusKoszyka } from "./cart.js";

if (arrow) {
  arrow.addEventListener("click", () => {
    container.classList.toggle("active");
    labels.forEach((label) => label.classList.toggle("active"));
  });
}

async function inicjalizuj() {
  const przepisy = await pobierzPrzepisy();
  const obrazekWBoxie = box.querySelector("img");
  const naglowekH2 = box.querySelector("h2");

  let aktualnyPrzepisId = null;

  document.addEventListener("click", (e) => {
    if (e.target.closest(".box")) {
      if (e.target.classList.contains("cancled")) {
        box.classList.remove("active");
        backdrop.classList.remove("active");
      }
      obsluzPolubienie(e, aktualnyPrzepisId, przepisy);
      obsluzKoszyk(e, aktualnyPrzepisId, przepisy);
      return;
    }

    const kliknietyKontener = e.target.closest("section");
    if (!kliknietyKontener) return;

    const tekstZEkranu = kliknietyKontener.innerText.trim();

    const znalezionyPrzepis = przepisy.find((przepis) => {
      const nazwaZJson = { ...przepis }.nazwa.trim();
      return tekstZEkranu.toLowerCase().includes(nazwaZJson.toLowerCase());
    });

    if (znalezionyPrzepis) {
      aktualnyPrzepisId = znalezionyPrzepis.id;

      if (obrazekWBoxie) {
        obrazekWBoxie.src = znalezionyPrzepis.url;
        obrazekWBoxie.alt = znalezionyPrzepis.nazwa;
      }
      if (naglowekH2) {
        naglowekH2.innerText = znalezionyPrzepis.przepis;
      }

      odswiezStatusPolubienia(znalezionyPrzepis);
      odswiezStatusKoszyka(znalezionyPrzepis);

      box.classList.add("active");
      backdrop.classList.add("active");
    }
  });
}

inicjalizuj();
