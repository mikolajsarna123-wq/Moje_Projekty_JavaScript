import { box, basket } from "./config.js";

// NAPRAWA: Bezpieczne pobieranie ikony - jeśli box nie istnieje, przypisujemy null
const ikonaKoszykaWBoxie = box ? box.querySelector(".fa-cart-plus") : null;

function pobierzKoszykZStorage() {
  return JSON.parse(localStorage.getItem("cartRecipes")) || [];
}

// NOWA FUNKCJA: Filtruje przepisy i wyciąga ID, zdjęcie, nazwę oraz cenę dla podglądu
export function pobierzPelneObiektyKoszyka(przepisy) {
  // Zabezpieczenie przed sytuacją, gdy przepisy jeszcze się nie załadowały
  if (!przepisy || !Array.isArray(przepisy)) return [];

  return przepisy
    .filter((przepis) => przepis.isInBasket)
    .map((przepis) => {
      return {
        id: przepis.id,
        zdjecie: przepis.url,
        nazwa: przepis.nazwa,
        cena: przepis.cena,
      };
    });
}

export function odswiezLicznikKoszyka() {
  if (!basket) return;
  const licznikH2 = basket.querySelector("h2");
  if (licznikH2) {
    const produktyWKoszyku = pobierzKoszykZStorage();
    licznikH2.innerText = produktyWKoszyku.length;

    if (produktyWKoszyku.length > 0) {
      basket.classList.add("active");
    } else {
      basket.classList.remove("active");
    }
  }
}

export function obsluzKoszyk(e, aktualnyPrzepisId, przepisy) {
  // Jeśli ikona koszyka nie istnieje na tej podstronie, przerywamy funkcję
  if (!ikonaKoszykaWBoxie || aktualnyPrzepisId === null) return;

  if (
    e.target === ikonaKoszykaWBoxie ||
    e.target.closest(".fa-cart-plus") === ikonaKoszykaWBoxie
  ) {
    ikonaKoszykaWBoxie.classList.toggle("active");

    let koszykIds = pobierzKoszykZStorage();
    const czyWKoszyku = ikonaKoszykaWBoxie.classList.contains("active");

    if (czyWKoszyku) {
      if (!koszykIds.includes(aktualnyPrzepisId)) {
        koszykIds.push(aktualnyPrzepisId);
      }
    } else {
      koszykIds = koszykIds.filter((id) => id !== aktualnyPrzepisId);
    }

    localStorage.setItem("cartRecipes", JSON.stringify(koszykIds));

    odswiezLicznikKoszyka();

    const przepis = przepisy.find((p) => p.id === aktualnyPrzepisId);
    if (przepis) {
      przepis.isInBasket = czyWKoszyku;
    }
  }
}

export function odswiezStatusKoszyka(znalezionyPrzepis) {
  // Jeśli ikona koszyka nie istnieje na tej podstronie, przerywamy funkcję
  if (!ikonaKoszykaWBoxie) return;

  const koszykIds = pobierzKoszykZStorage();

  if (koszykIds.includes(znalezionyPrzepis.id)) {
    ikonaKoszykaWBoxie.classList.add("active");
  } else {
    ikonaKoszykaWBoxie.classList.remove("active");
  }
}
