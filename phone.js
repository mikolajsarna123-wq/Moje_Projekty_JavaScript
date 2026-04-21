function chanView() {
  const view = document.getElementById("view");
  view.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "first-arrow":
      case "forth-arrow":
        view.style.transform = "translateX(-515px)";
        break;
      case "secend-arrow":
        view.style.transform = "translateX(0px)";
        break;
      case "third-arrow":
        view.style.transform = "translateX(-1020px)";
        break;
    }
  });
}

function addTask() {
  const container = document.querySelector(".container");
  const newTask = document.querySelector("input");
  newTask.addEventListener("keydown", (e) => {
    const inputText = newTask.value;
    if (e.key == "Enter") {
      if (inputText != "") {
        const taskHtml = `   
            <li class="tasks">
              <h3>${inputText}</h3>
              <button class="aprove"><i class="fa-regular fa-calendar-check"></i></button>
              <button class="remove"><i class="fa-solid fa-trash-can"></i></button>
            </li>`;
        container.insertAdjacentHTML("beforeend", taskHtml);
        removeTask();
        newTask.value = "";
      }
    }
  });
}

function removeTask() {
  const buttons = document.querySelectorAll(".remove");
  const lastButton = buttons[buttons.length - 1];

  if (lastButton) {
    lastButton.addEventListener("click", (e) => {
      const taskItem = e.target.closest("li");
      if (taskItem) {
        taskItem.remove();
      }
    });
  }
}
addTask();
chanView();
removeTask();
