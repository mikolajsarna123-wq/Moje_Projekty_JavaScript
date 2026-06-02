import { basket } from "./config.js";
import { pobierzPelneObiektyKoszyka } from "./cart.js";

export function zainicjujPodgladKoszyka(przepisy) {
  if (!basket) return;

  const podgladKoszyka = document.querySelector(".accept");
  const przyciskAnuluj = podgladKoszyka?.querySelector('button[type="reset"]');
  const tloBackdrop = document.querySelector(".backdrop");
  const drugieOkienkoBox = document.querySelector(".box");
  const previewWindow = document.querySelector("span.preview");

  basket.addEventListener("click", () => {
    if (previewWindow) {
      previewWindow.classList.toggle("active");
    }
  });

  basket.addEventListener("dblclick", () => {
    const aktualneProdukty = pobierzPelneObiektyKoszyka(przepisy);
    console.log(
      "Aktualne elementy w koszyku (zdjęcie, nazwa, cena):",
      aktualneProdukty,
    );

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
