const taskInput = document.getElementById("new-task");
// The Add button has no id. It is the first button in the document.
const addButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  // innerText encodes special characters, HTML does not.
  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToOtherList);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isInEditMode = listItem.classList.contains("editMode");
  if (isInEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const moveTaskToOtherList = function () {
  const listItem = this.parentNode;
  const taskIsCompleted = listItem.parentNode === completedList;
  const targetList = taskIsCompleted ? todoList : completedList;

  targetList.appendChild(listItem);
  bindTaskEvents(listItem, moveTaskToOtherList);
};

addButton.onclick = addTask;

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

const bindExistingTasks = function (taskList) {
  for (const listItem of taskList.children) {
    bindTaskEvents(listItem, moveTaskToOtherList);
  }
};

bindExistingTasks(todoList);
bindExistingTasks(completedList);
