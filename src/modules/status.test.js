import updateStatus from './status';

describe('updateStatus', () => {
  test('update the task status to true', () => {
    const mockTask = { description: 'test task', completed: false };
    updateStatus(mockTask, true);
    expect(mockTask.completed).toBe(true);
  });
  test('update the task status to false', () => {
    const mockTask = { description: 'test task', completed: true };
    updateStatus(mockTask, false);
    expect(mockTask.completed).toBe(false);
  });
});