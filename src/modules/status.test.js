// Importa la función updateStatus
import updateStatus from './status';

// Define tus pruebas dentro de una llamada a `describe`
describe('updateStatus', () => {
  // Este es un único test
  it('should update the task status', () => {
    // Crea una tarea ficticia
    const mockTask = { description: 'test task', completed: false };

    // Llama a updateStatus con la tarea ficticia y true
    updateStatus(mockTask, true);

    // Verifica que la tarea ahora está completa
    expect(mockTask.completed).toBe(true);

    // Llama a updateStatus con la tarea ficticia y false
    updateStatus(mockTask, false);

    // Verifica que la tarea ahora no está completa
    expect(mockTask.completed).toBe(false);
  });
});
