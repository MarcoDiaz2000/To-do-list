export function addTask(description, tasks) {
    const newIndex = tasks.length;
    const newTask = {
      description: description,
      completed: false,
      index: newIndex,
    };
    tasks.push(newTask);
  }

  export function deleteTask(index) {
    tasks = tasks.filter(task => task.index !== index);
    tasks.forEach((task, i) => {
      task.index = i;
    });
  }

  export function editTask(index, newDescription) {
    const task = tasks.find(task => task.index === index);
    if (task) {
      task.description = newDescription;
    }
  }