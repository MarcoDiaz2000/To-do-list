export default function updateStatus(task, completed) {
  task.completed = completed;
}

module.exports = updateStatus;