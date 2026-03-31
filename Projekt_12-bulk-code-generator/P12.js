//Gerenrowanie 1000 róznych kodów

//Mój kod
/*
const button = document.querySelector("button");
const section = document.querySelector("section");

function GenerateCodes() {
  console.log("Generowanie kodów...");
  section.textContent = "";
  for (let i = 0; i < 1000; i++) {
    {
      const code = Math.random().toString(36).substring(2, 12);//toString(36) - konwertuje liczbę na system 36, a substring(2, 12) - pobiera 10 znaków od indeksu 2 do 12
      const p = document.createElement("p");
      p.textContent = code;
      section.appendChild(p);
    }
  }
}

button.addEventListener("click", GenerateCodes);
*/
//Kod z kursu

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const button = document.querySelector("button");
const section = document.querySelector("section");

const codesNumber = 1000;
const charsNumber = 10;

const codesGenerator = () => {
  section.textContent = "";
  for (let i = 0; i < codesNumber; i++) {
    let code = "";
    for (let j = 0; j < charsNumber; j++) {
      const index = Math.floor(Math.random() * chars.length);
      code += chars[index];
    }
    const div = document.createElement("div");
    div.textContent = code;
    section.appendChild(div);
  }
};

button.addEventListener("click", codesGenerator);
