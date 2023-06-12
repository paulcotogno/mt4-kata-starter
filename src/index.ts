enum Operators { Product = "*", Fraction = "/", Sum = "+", Difference = "-", Modulo = "MOD", Negative = "NEGATE" };

type Operator = Operators;

const calculate = (a: number, b: number, operator: Operator | string): number => {
  if (isNaN(a) || isNaN(b)) throw new TypeError("No value for operator")

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) throw new TypeError("Cannot divide by 0");
      return a / b;
    case 'MOD':
      if (b === 0) throw new TypeError("Cannot MOD by 0");
      return a % b;
    default:
      throw new TypeError("Bad operator");
  }
}

const negate = (a: number): number => {
  if (isNaN(a)) throw new TypeError("No value for NEGATE");

  return a * -1;
}

const checkTypeItem = (item: string, stack: number[]): number => {
  if (!isNaN(Number(item))) {
    if (Number(item) < 0) throw new TypeError("Bad value");

    return Number(item);
  } else if (item === 'NEGATE') {
    let a = stack.pop();

    const result = negate(a);

    return result;
  } else {
    let operand = item,
      b = stack.pop(),
      a = stack.pop();

    const result = calculate(a, b, operand);

    return result;
  }
}

const result = (stack: number[]): number => {
  if (stack.length > 1) throw new TypeError("Stack too long");

  return stack.pop();
}

export const runRPN = (expr: string): number => {
  let exprList = expr.split(' ');

  let stack: number[] = [];

  for (let item of exprList) {
    const stackAccumulator = checkTypeItem(item, stack);

    stack.push(stackAccumulator);
  }

  return result(stack);
}