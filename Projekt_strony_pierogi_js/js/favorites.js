import { box } from "./config.js";

const przyciskLiked = box.querySelector(".liked");

export function obsluzPolubienie(e, aktualnyPrzepisId, przepisy) {
  if (e.target === przyciskLiked && aktualnyPrzepisId !== null) {
    przyciskLiked.classList.toggle("active");
    const przepis = przepisy.find((p) => p.id === aktualnyPrzepisId);
    if (przepis) {
      przepis.isLiked = przyciskLiked.classList.contains("active");
    }
  }
}

export function odswiezStatusPolubienia(znalezionyPrzepis) {
  if (!przyciskLiked) return;
  if (znalezionyPrzepis.isLiked) {
    przyciskLiked.classList.add("active");
  } else {
    przyciskLiked.classList.remove("active");
  }
}
