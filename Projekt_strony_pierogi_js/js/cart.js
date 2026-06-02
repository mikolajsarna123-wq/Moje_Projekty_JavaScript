import { box, basket } from "./config.js";

const ikonaKoszykaWBoxie = box.querySelector(".fa-cart-plus");

function pobierzKoszykZStorage() {
  return JSON.parse(localStorage.getItem("cartRecipes")) || [];
}

// NOWA FUNKCJA: Filtruje przepisy i wyciąga tylko zdjęcie, nazwę oraz cenę
export function pobierzPelneObiektyKoszyka(przepisy) {
  return przepisy
    .filter((przepis) => przepis.isInBasket)
    .map((przepis) => {
      return {
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
  if (!ikonaKoszykaWBoxie) return;

  const koszykIds = pobierzKoszykZStorage();

  if (koszykIds.includes(znalezionyPrzepis.id)) {
    ikonaKoszykaWBoxie.classList.add("active");
  } else {
    ikonaKoszykaWBoxie.classList.remove("active");
  }
}
