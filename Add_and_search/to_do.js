const input = document.querySelector("#add-input");
const inputSearch = document.querySelector("#search");
const ul = document.querySelector("ul");

let taskArray = [];
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
inputSearch.addEventListener("input", () => {
  findElements();
});

function addTask() {
  const tekst = input.value;
  if (!tekst) return;
  const dataset = Date.now() % 100000;
  const newTekst = createLi(tekst, dataset);
  ul.appendChild(newTekst);

  const objectTekst = {
    dataset: dataset,
    title: tekst
  };
  taskArray.push(objectTekst);

  input.value = "";
}

function createLi(tekst, dataset) {
  const li = document.createElement("li");
  li.dataset.key = dataset;
  li.innerHTML = ` 
              <h2>${tekst}</h2>
              <button onclick="removeTask(this)">Usuń</button>
              <button onclick="editTask(this)">Edytuj</button>`;
  return li;
}

function removeTask(e) {
  const key = e.closest("li").dataset.key;
  taskArray = taskArray.filter((e) => e.dataset != key);
  e.parentElement.remove();
}

function editTask(e) {
  const li = e.closest("li");
  const key = e.closest("li").dataset.key;
  const zadanie = taskArray.find((e) => e.dataset == key);
  zadanie.title = changeH2Toinput(li);
  console.log(e.target);
}

function changeH2Toinput(e) {
  const h2 = e.querySelector("h2");
  const inputEdit = document.createElement("input");
  console.log(e.target);
  if (h2) {
    inputEdit.value = h2.innerText;
    h2.replaceWith(inputEdit);
  } else {
    const inputEdit = e.querySelector("input");
    const newH2 = document.createElement("h2");

    newH2.innerText = inputEdit.value;
    inputEdit.replaceWith(newH2);

    return newH2.innerText;
  }
}

function findElements() {
  const li = document.querySelectorAll("li");
  try {
    const elements = taskArray.filter((el) =>
      el.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
    const arreyKeys = elements.map((el) => String(el.dataset));

    li.forEach((e) => {
      const allKeys = e.dataset.key.trim();

      if (arreyKeys.includes(allKeys)) {
        e.style.display = "list-item";
      } else {
        e.style.display = "none";
      }
    });
  } catch {
    window.alert("nie można wyszukiwać i edytować jedocześnie");
  }
}
