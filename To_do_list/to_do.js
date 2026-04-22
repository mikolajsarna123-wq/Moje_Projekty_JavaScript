const btn = document.querySelector("form");
const taskNumber = document.querySelector("h1 span");
const ul = document.querySelector("ul");
const input = document.querySelector("input");

btn.addEventListener("submit", clickButton);

//--Funckje Pracujące----
function clickButton(element) {
  element.preventDefault();
  addTask();
}

function addTask() {
  const listItems = document.querySelectorAll("li").length;
  if (input.value) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const btnRemove = document.createElement("button");
    const btnEdit = document.createElement("button");
    const checkbox = document.createElement("input");

    h2.innerHTML = input.value;
    checkbox.type = "checkbox";
    btnRemove.textContent = "Usuń";
    btnEdit.textContent = "Edytuj";

    btnRemove.className = "remove";
    btnEdit.className = "edit";
    checkbox.className = "checkbox";

    li.appendChild(checkbox);
    ul.appendChild(li);
    li.appendChild(h2);
    li.appendChild(btnRemove);
    li.appendChild(btnEdit);

    input.value = "";
    taskNumber.textContent = listItems + 1;
  }
}

function removeTask(e) {
  const listItems = document.querySelectorAll("li").length;
  taskNumber.textContent = listItems - 1;
  e.target.parentNode.remove();
}

function editTask(e) {
  const li = e.target.parentNode;
  const h2 = li.querySelector("h2");
  const deletBtn = li.querySelector("button.remove");
  const checkbox = li.querySelector("input.checkbox");
  const editInput = document.createElement("input");
  editInput.className = "edit-input";

  toggleChange(h2, editInput);
  toggleButtons(deletBtn, "none");
  toggleButtons(checkbox, "none");

  const newInput = li.querySelector("input.edit-input");
  newInput.addEventListener("keydown", (element) => {
    if (element.key == "Enter" && editInput.value) {
      toggleChange(editInput, h2);
      toggleButtons(deletBtn, "block");
      toggleButtons(checkbox, "block");
    }
  });
}

function doneTask(e) {
  const li = e.target.parentNode;
  const h2 = li.querySelector("h2");
  const editBtn = li.querySelector("button.edit");
  if (h2.style.textDecoration == "line-through") {
    h2.style.textDecoration = "none";
    toggleButtons(editBtn, "block");
  } else {
    h2.style.textDecoration = "line-through";
    toggleButtons(editBtn, "none");
  }
}

//--Funckje Pomocnicze----

function witchButton() {
  ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit")) {
      editTask(e);
    } else if (e.target.classList.contains("remove")) {
      removeTask(e);
    } else if (e.target.classList.contains("checkbox")) {
      doneTask(e);
    }
  });
}

function toggleChange(elementFirst, elementSecond) {
  try {
    elementFirst.tagName == "H2"
      ? (elementSecond.value = elementFirst.textContent)
      : (elementSecond.textContent = elementFirst.value);

    elementFirst.replaceWith(elementSecond);
  } catch {} //Trzeba tu coś zrobić zeby po kliknij
  //  edytuj fukncja robiłą to samo co toogleChange
  //ale ze zmiennymi editTask
}
function toggleButtons(btn, disply) {
  btn.style.display = disply;
}

witchButton();
