import './style.css';
import { updateStatus } from './status.js';

let tasks = [
  { description: 'Task 1', completed: false, index: 0 },
  { description: 'Task 2', completed: false, index: 1 },
  { description: 'Task 3', completed: true, index: 2 },
];

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
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(description);
    todoList.appendChild(listItem);
  });
}

function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

const clearButton = document.getElementById('clear-completed');
clearButton.addEventListener('click', clearCompletedTasks);

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});