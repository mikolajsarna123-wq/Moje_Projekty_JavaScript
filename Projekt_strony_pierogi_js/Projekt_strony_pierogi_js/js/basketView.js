import { basket } from "./config.js";
import { pobierzPelneObiektyKoszyka, odswiezLicznikKoszyka } from "./cart.js";

export function zainicjujPodgladKoszyka(przepisy) {
  if (!basket) return;

  const podgladKoszyka = document.querySelector(".accept");
  const przyciskAnuluj = podgladKoszyka?.querySelector('button[type="reset"]');
  const tloBackdrop = document.querySelector(".backdrop");
  const drugieOkienkoBox = document.querySelector(".box");
  const previewWindow = document.querySelector("span.preview");

  function renderujPodglad(aktualneProdukty) {
    if (!previewWindow) return;

    previewWindow.innerHTML = "";

    aktualneProdukty.forEach((produkt) => {
      const sformatowanaCena = Number(produkt.cena).toFixed(2);

      const wierszProduktu = `
        <div data-id="${produkt.id}">
          <img src="${produkt.zdjecie}" alt="${produkt.nazwa}" />
          <h2>${produkt.nazwa}</h2>
          <p class="cena">${sformatowanaCena} zł</p>
          <button class="delete-btn">X</button>
        </div>
      `;
      previewWindow.insertAdjacentHTML("beforeend", wierszProduktu);
    });

    const iloscZamowien = aktualneProdukty.length;
    const sumaCen = aktualneProdukty
      .reduce((acc, produkt) => acc + Number(produkt.cena), 0)
      .toFixed(2);

    const podsumowanieHtml = `
      <div class="cart-summary">
        <div>Liczba dań: <span>${iloscZamowien}</span></div>
        <div>
          <span>Razem do zapłaty:</span>
          <span>${sumaCen} zł</span>
        </div>
      </div>
    `;
    previewWindow.insertAdjacentHTML("beforeend", podsumowanieHtml);
  }

  if (previewWindow) {
    previewWindow.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        e.stopPropagation();

        const rodzic = e.target.closest("div");
        const przepisId = Number(rodzic.dataset.id);

        let koszykIds = JSON.parse(localStorage.getItem("cartRecipes")) || [];
        koszykIds = koszykIds.filter((id) => id !== przepisId);
        localStorage.setItem("cartRecipes", JSON.stringify(koszykIds));

        const przepis = przepisy.find((p) => p.id === przepisId);
        if (przepis) {
          przepis.isInBasket = false;
        }

        odswiezLicznikKoszyka();

        const aktualneProdukty = pobierzPelneObiektyKoszyka(przepisy);

        if (aktualneProdukty.length === 0) {
          previewWindow.classList.remove("active");
        } else {
          renderujPodglad(aktualneProdukty);
        }
      }
    });
  }

  basket.addEventListener("click", (e) => {
    e.stopPropagation();
    if (previewWindow) {
      const aktualneProdukty = pobierzPelneObiektyKoszyka(przepisy);

      if (aktualneProdukty.length === 0) {
        previewWindow.classList.remove("active");
        return;
      }

      renderujPodglad(aktualneProdukty);
      previewWindow.classList.toggle("active");
    }
  });

  document.addEventListener("click", (e) => {
    if (previewWindow && previewWindow.classList.contains("active")) {
      if (!previewWindow.contains(e.target)) {
        previewWindow.classList.remove("active");
      }
    }
  });

  basket.addEventListener("dblclick", () => {
    const aktualneProdukty = pobierzPelneObiektyKoszyka(przepisy);

    if (previewWindow) {
      previewWindow.classList.remove("active");
    }
    if (podgladKoszyka) {
      podgladKoszyka.classList.add("active");
      document.body.classList.add("no-scroll");
    }
    if (tloBackdrop) {
      tloBackdrop.classList.add("active");
    }
  });

  if (przyciskAnuluj && podgladKoszyka) {
    przyciskAnuluj.addEventListener("click", () => {
      podgladKoszyka.classList.remove("active");
      document.body.classList.remove("no-scroll");
      if (previewWindow) {
        previewWindow.classList.remove("active");
      }
      if (tloBackdrop) {
        tloBackdrop.classList.remove("active");
      }
    });
  }

  if (tloBackdrop) {
    tloBackdrop.addEventListener("click", () => {
      if (podgladKoszyka) podgladKoszyka.classList.remove("active");
      if (drugieOkienkoBox) drugieOkienkoBox.classList.remove("active");
      if (previewWindow) previewWindow.classList.remove("active");
      document.body.classList.remove("no-scroll");
      tloBackdrop.classList.remove("active");
    });
  }
}
