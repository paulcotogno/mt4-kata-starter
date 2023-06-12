type Operator = "*" | "/" | "+" | "-" | "MOD";

type allOperators = {
  [key in Operator]: (a: number, b: number) => number;
};

const operatorCalcul: allOperators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  'MOD': (a, b) => a % b,
}

const operationErrorHandler = (b: number, operator: Operator | string) => {
  if (!operatorCalcul[operator]) throw new TypeError("Bad operator");

  if (b === 0 && (operator === 'MOD' || operator === '/')) {
    throw new TypeError("Cannot divide by 0");
  }
}

const calculate = (a: number, b: number, operator: Operator | string): number => {
  if (isNaN(a) || isNaN(b)) throw new TypeError("No value for operator");

  operationErrorHandler(b, operator);

  return operatorCalcul[operator](a, b);
}

const negate = (a: number): number => {
  if (isNaN(a)) throw new TypeError("No value for NEGATE");

  return a * -1;
}

const stackAccumulator = (item: string, stack: number[]): number => {
  if (!isNaN(Number(item))) {
    if (Number(item) < 0) throw new TypeError("Bad value");
    return Number(item);
  }

  if (item === 'NEGATE') {
    let a = stack.pop();

    return negate(a);
  }

  let operand = item,
    b = stack.pop(),
    a = stack.pop();

  return calculate(a, b, operand);
}

const result = (stack: number[]): number => {
  if (stack.length > 1) throw new TypeError("Stack too long");

  return stack.pop();
}

export const runRPN = (expr: string): number => {
  let exprList = expr.split(' ');

  let stack: number[] = [];

  for (let item of exprList) {
    const accumulator = stackAccumulator(item, stack);

    stack.push(accumulator);
  }

  return result(stack);
}