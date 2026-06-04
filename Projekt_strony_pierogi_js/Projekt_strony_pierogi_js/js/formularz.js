import { plikJson } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const itemsContainer = document.getElementById("ordered-items-list");
  const totalPriceDisplay = document.getElementById("total-price-display");

  try {
    const usersRawData = localStorage.getItem("users");
    if (usersRawData) {
      const usersArray = JSON.parse(usersRawData);
      if (Array.isArray(usersArray) && usersArray.length > 0) {
        const loggedUser = usersArray[0];
        if (loggedUser && loggedUser.login) nameInput.value = loggedUser.login;
        if (loggedUser && loggedUser.email) emailInput.value = loggedUser.email;
      }
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const sciezkaJson = plikJson.startsWith("/") ? `..${plikJson}` : plikJson;
    const odpowiedz = await fetch(sciezkaJson).catch(() => fetch(plikJson));

    if (!odpowiedz || !odpowiedz.ok) {
      itemsContainer.innerHTML =
        "<p class='error-msg'>Błąd ładowania menu pierogarni.</p>";
      return;
    }

    const surowePrzepisy = await odpowiedz.json();
    const koszykIds = JSON.parse(localStorage.getItem("cartRecipes")) || [];

    const zamowioneProdukty = surowePrzepisy
      .filter((przepis) => koszykIds.includes(Number(przepis.id)))
      .map((przepis) => {
        return {
          id: przepis.id,
          zdjecie: przepis.url,
          nazwa: przepis.nazwa,
          cena: przepis.cena,
        };
      });

    if (!itemsContainer || !totalPriceDisplay) return;

    if (zamowioneProdukty.length === 0) {
      itemsContainer.innerHTML =
        "<p class='empty-cart-msg'>Twój koszyk jest pusty. Wróć do menu i dodaj pierogi!</p>";
      totalPriceDisplay.innerText = "0.00";
      return;
    }

    itemsContainer.innerHTML = "";
    let sumaCen = 0;

    zamowioneProdukty.forEach((produkt) => {
      const cenaNum = Number(produkt.cena);
      sumaCen += cenaNum;

      const produktHtml = `
        <div class="ordered-item">
          <div class="ordered-item-info">
            <img src="${produkt.zdjecie}" alt="${produkt.nazwa}" class="ordered-item-img" />
            <span class="ordered-item-name">${produkt.nazwa}</span>
          </div>
          <span class="ordered-item-price">${cenaNum.toFixed(2)} zł</span>
        </div>
      `;
      itemsContainer.insertAdjacentHTML("beforeend", produktHtml);
    });

    totalPriceDisplay.innerText = sumaCen.toFixed(2);
  } catch (err) {
    console.error(err);
  }
});
