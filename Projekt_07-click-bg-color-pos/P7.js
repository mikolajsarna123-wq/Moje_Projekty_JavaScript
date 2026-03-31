//-wykryć klikniecie
//-znaleźć pozycję kliknięcia
//-wydrukować je w konsoli
//- jęsli dla x i y bedzie parzyta to ma być kolor czerwony
//-jęsli dla x i y będzie nieparzyta to ma być kolor niebieski
//-jeśli będzie inna kombinacja to ma być kolor zielony

document.body.addEventListener("click", (event) => {
  const color = getColor(event);
  console.log(`(${event.clientX}, ${event.clientY})`);
  document.body.style.backgroundColor = color;
});

const getColor = (e) => {
  if (e.clientX % 2 === 0 && e.clientY % 2 === 0) {
    return "red";
  } else if (e.clientX % 2 !== 0 && e.clientY % 2 !== 0) {
    return "blue";
  } else {
    return "green";
  }
};
