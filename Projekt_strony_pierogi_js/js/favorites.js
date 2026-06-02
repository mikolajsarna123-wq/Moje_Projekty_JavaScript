import { box } from "./config.js";

const przyciskLiked = box.querySelector(".liked");

function pobierzPolubioneZStorage() {
  return JSON.parse(localStorage.getItem("likedRecipes")) || [];
}

export function obsluzPolubienie(e, aktualnyPrzepisId, przepisy) {
  if (e.target === przyciskLiked && aktualnyPrzepisId !== null) {
    przyciskLiked.classList.toggle("active");

    let polubioneIds = pobierzPolubioneZStorage();
    const czyPolubiony = przyciskLiked.classList.contains("active");

    if (czyPolubiony) {
      if (!polubioneIds.includes(aktualnyPrzepisId)) {
        polubioneIds.push(aktualnyPrzepisId);
      }
    } else {
      polubioneIds = polubioneIds.filter((id) => id !== aktualnyPrzepisId);
    }

    localStorage.setItem("likedRecipes", JSON.stringify(polubioneIds));

    const przepis = przepisy.find((p) => p.id === aktualnyPrzepisId);
    if (przepis) {
      przepis.isLiked = czyPolubiony;
    }
  }
}

export function odswiezStatusPolubienia(znalezionyPrzepis) {
  if (!przyciskLiked) return;

  const polubioneIds = pobierzPolubioneZStorage();

  if (polubioneIds.includes(znalezionyPrzepis.id)) {
    przyciskLiked.classList.add("active");
  } else {
    przyciskLiked.classList.remove("active");
  }
}
