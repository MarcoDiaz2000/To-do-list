import './style.css';
import updateStatus from './modules/status.js';
import { addTask, deleteTask, editTask } from './modules/taskAdmin.js';

let tasks = [];

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
      } else {
        description.classList.remove('strikethrough');
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
  console.log('storedTasks:', storedTasks);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  saveLocalStorage();
  return tasks;
}

tasks = loadLocalStorage();

const clearButton = document.getElementById('clear-completed');
clearButton.addEventListener('click', () => {
  clearTasks();
  saveLocalStorage();
});

const addTaskForm = document.getElementById('add-task-form');
const taskDescriptionInput = document.getElementById('task-description');

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = taskDescriptionInput.value.trim();
  if (description) {
    addTask(description, tasks);
    taskDescriptionInput.value = '';
    renderTasks();
    saveLocalStorage();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  tasks = loadLocalStorage() || tasks;
  console.log('tasks after loading from localStorage:', tasks);
  renderTasks();
});