export function addTask(description, tasks) {
  const newIndex = tasks.length;
  const newTask = {
    description,
    completed: false,
    index: newIndex,
  };
  tasks.push(newTask);
}

export function deleteTask(taskIndex, tasks) {
  console.log('Trying to delete task with index:', taskIndex);
  const index = tasks.findIndex((task) => task.index === taskIndex);
  console.log('Task index in tasks array:', index);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

export function editTask(index, newDescription, tasks) {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.description = newDescription;
  }
}