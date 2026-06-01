import { box, basket } from "./config.js";

const ikonaKoszyka = box.querySelector("i");

export function obsluzKoszyk(e, aktualnyPrzepisId, przepisy) {
  if (
    e.target.closest("i") === ikonaKoszyka &&
    ikonaKoszyka &&
    aktualnyPrzepisId !== null
  ) {
    ikonaKoszyka.classList.toggle("active");
    basket.classList.toggle("active");
    const przepis = przepisy.find((p) => p.id === aktualnyPrzepisId);
    if (przepis) {
      przepis.isInBasket = ikonaKoszyka.classList.contains("active");
    }
  }
}

export function odswiezStatusKoszyka(znalezionyPrzepis) {
  if (!ikonaKoszyka) return;
  if (znalezionyPrzepis.isInBasket) {
    ikonaKoszyka.classList.add("active");
  } else {
    ikonaKoszyka.classList.remove("active");
  }
}
