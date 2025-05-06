import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 15, action: Action.Add, expected: 20 },
  { a: 15, b: 5, action: Action.Subtract, expected: 10 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 15, b: 5, action: Action.Divide, expected: 3 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 15, action: 'add', expected: null },
  { a: '5', b: 15, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
