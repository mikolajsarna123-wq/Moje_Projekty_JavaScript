const arrow = document.querySelector("aside h2");
const container = document.querySelector(".container");
const box = document.querySelector(".box");
const backdrop = document.querySelector(".backdrop");
const sections = document.querySelectorAll("section");
const cancel = document.querySelector(".cancled");
const liked = document.querySelector(".liked");
const labels = document.querySelectorAll("label");
const add = document.querySelector(".box i");
const basket = document.querySelector(".basket");

arrow.addEventListener("click", () => {
  container.classList.toggle("active");
  labels.forEach((label) => {
    label.classList.toggle("active");
  });
});
sections.forEach((singleSection) => {
  singleSection.addEventListener("click", () => {
    box.classList.add("active");
    backdrop.classList.add("active");
  });
});

cancel.addEventListener("click", () => {
  box.classList.remove("active");
  backdrop.classList.remove("active");
});

liked.addEventListener("click", (el) => {
  el.target.classList.toggle("active");
});

add.addEventListener("click", () => {
  add.classList.toggle("active");
  basket.classList.toggle("active");
});
