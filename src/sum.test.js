const sum = require('./sum');

const a = 1;
const b = 2;
const expectedResult = 3;

const result = sum(a, b);

test('Sumar 1 + 2 debe retornar 3', () => {
  expect(result).toBe(expectedResult);
});