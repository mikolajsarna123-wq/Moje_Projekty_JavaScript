export const arrow = document.querySelector("aside h2");
export const container = document.querySelector(".container");
export const backdrop = document.querySelector(".backdrop");
export const labels = document.querySelectorAll("label");
export const basket = document.querySelector(".basket");
export const box = document.querySelector(".box");

//Logowanie

export const plikJson = "../json/pierogi.json";

export async function pobierzPrzepisy() {
  if (!box) return [];
  try {
    const odpowiedz = await fetch(plikJson);
    if (!odpowiedz.ok) return [];
    return await odpowiedz.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
