import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 15,
      action: Action.Add,
    });

    expect(result).toBe(20);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 15,
      b: 5,
      action: Action.Subtract,
    });

    expect(result).toBe(10);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 5,
      action: Action.Multiply,
    });

    expect(result).toBe(25);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 15,
      b: 5,
      action: Action.Divide,
    });

    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });

    expect(result).toBe(125);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 5,
      b: 15,
      action: 'add',
    });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '5',
      b: 15,
      action: Action.Add,
    });

    expect(result).toBeNull();
  });
});
