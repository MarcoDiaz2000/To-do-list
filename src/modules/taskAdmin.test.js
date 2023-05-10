import { addTask, deleteTask } from './taskAdmin';

describe('addTask', () => {
    test('adds a task to the tasks array', () => {
      const tasks = [];
      addTask('New task', tasks);
      expect(tasks.length).toBe(1);
      expect(tasks[0].description).toBe('New task');
    });
  });

  describe('deleteTask', () => {
    test('deletes a task from array', () => {
      const tasks = [{ description: 'Task 1', completed: false, index: 0 }];
      deleteTask(0, tasks);
      expect(tasks.length).toBe(0);
    });
  });
  