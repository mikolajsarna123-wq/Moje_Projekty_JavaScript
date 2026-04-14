function formatujCzas(suwak) {
  let minuty = parseInt(suwak.value);
  let h = Math.floor(minuty / 60);
  let m = minuty % 60;
  m < 10 ? (m = `0${m}`) : m;
  let tekst = `${h}h${m}min`;
  document.getElementById("wynik").textContent = tekst;
}
