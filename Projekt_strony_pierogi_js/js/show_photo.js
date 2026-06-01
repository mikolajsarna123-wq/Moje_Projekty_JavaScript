fetch("/json/pierogi.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.querySelector("main");
    data.forEach((item) => {
      const sectionHTML = `
        <section>
          <h2>${item.nazwa}</h2>
          <img src="${item.url}" alt="img" />
        </section>
      `;
      container.insertAdjacentHTML("beforeend", sectionHTML);
    });
  })
  .catch((error) => console.error("Błąd pobierania danych:", error));
