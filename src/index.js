import './style.css';
import updateStatus from './modules/status.js';

let tasks = [
  { description: 'Task 1', completed: false, index: 0 },
  { description: 'Task 2', completed: false, index: 1 },
  { description: 'Task 3', completed: true, index: 2 },
  { description: 'Task 4', completed: false, index: 3 },
  { description: 'Task 5', completed: false, index: 4 },
  { description: 'Task 6', completed: false, index: 5 },
];

function saveLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index).forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    const description = document.createElement('span');
    description.textContent = task.description;

    if (task.completed) {
      description.classList.add('strikethrough');
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        description.classList.add('strikethrough');
        updateStatus(task, true);
      } else {
        description.classList.remove('strikethrough');
        updateStatus(task, false);
      }

      updateStatus(task, checkbox.checked);
      saveLocalStorage();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(description);
    todoList.appendChild(listItem);
  });
}

function clearTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

function loadLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

tasks = loadLocalStorage();

const clearButton = document.getElementById('clear-completed');
clearButton.addEventListener('click', () => {
  clearTasks();
  saveLocalStorage();
});

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});