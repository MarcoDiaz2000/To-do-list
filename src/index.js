import './style.css';
import updateStatus from './modules/status.js';
import { addTask, deleteTask } from './modules/taskAdmin.js';

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
    const threeDots = document.createElement('span');
    threeDots.textContent = '⋮';
    threeDots.classList.add('three-dots');
    const trashIcon = document.createElement('span');
    trashIcon.textContent = '🗑️';
    trashIcon.classList.add('trash-icon');
    trashIcon.style.display = 'none';
    listItem.appendChild(threeDots);
    listItem.appendChild(trashIcon);
    const enterEditMode = () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = description.textContent;
      input.addEventListener('blur', () => {
        setTimeout(() => {
          description.textContent = input.value;
          listItem.replaceChild(description, input);
          trashIcon.style.display = 'none';
        }, 100);
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          description.textContent = input.value;
          listItem.replaceChild(description, input);
          threeDots.style.display = '';
          trashIcon.style.display = 'none';
        }
      });
      listItem.replaceChild(input, description);
      input.focus();
      threeDots.style.display = 'none';
      trashIcon.style.display = '';
    };
    description.addEventListener('click', () => {
      enterEditMode();
    });
    trashIcon.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Trash icon clicked:', task.index);
      deleteTask(task.index, tasks);
      renderTasks();
      saveLocalStorage();
    });
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