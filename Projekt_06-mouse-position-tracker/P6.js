const h1 = document.querySelector("h1");
document.body.addEventListener("mousemove", (event) => {
  const x = event.clientX + 1;
  const y = event.clientY + 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  h1.textContent = ` (${x}, ${y})`;

  const red = Math.round(x / width) * 255;
  const green = Math.round((y / height) * 255);
  const blue = Math.round(((x + y) / (width + height)) * 255);

  //h1.textContent = ` (${event.pageX}, ${event.pageY})`;
  //h1.textContent = ` (${screen.pageX}, ${screen.pageY})`;
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});
