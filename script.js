const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const tasksList = document.getElementById("tasks");
const limitWarning = document.getElementById("task-limit-warning");

let taskCount = 0;
const MAX_TASKS = 10;

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (taskCount >= MAX_TASKS) {
    limitWarning.textContent = "Has alcanzado el límite de 10 tareas.";
    return;
  }
  addTask(taskInput.value);
  taskInput.value = "";
  taskCount++;
});

function addTask(taskText) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const priorityDot = document.createElement("span");
  priorityDot.className = "priority-dot blue";

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  const completeCheckbox = document.createElement("input");
  completeCheckbox.type = "checkbox";
  completeCheckbox.addEventListener("change", () => {
    taskContent.style.textDecoration = completeCheckbox.checked
      ? "line-through"
      : "none";
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.addEventListener("click", () => {
    tasksList.removeChild(taskItem);
    taskCount--;
    limitWarning.textContent = "";
  });

  priorityDot.addEventListener("click", () => {
    if (priorityDot.classList.contains("blue")) {
      priorityDot.className = "priority-dot yellow";
    } else if (priorityDot.classList.contains("yellow")) {
      priorityDot.className = "priority-dot red";
    } else {
      priorityDot.className = "priority-dot blue";
    }
  });

  taskItem.append(priorityDot, taskContent, completeCheckbox, deleteButton);
  tasksList.appendChild(taskItem);
}
