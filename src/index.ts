type BinaryOperator = "*" | "/" | "+" | "-" | "MOD";

const unaryOperator = ["NEGATE"];
type UnaryOperator = (typeof unaryOperator)[number];

type BinaryOperatorCalcul = {
  [key in BinaryOperator]: (a: number, b: number) => number;
};

type UnaryOperatorCalcul = {
  [key in UnaryOperator]: (a: number) => number;
};

const binaryOperatorCalcul: BinaryOperatorCalcul = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  'MOD': (a, b) => a % b,
}

const unaryOperatorCalcul: UnaryOperatorCalcul = {
  'NEGATE': (a) => a * -1
}

const operationErrorHandler = (b: number, operator: BinaryOperator | string) => {
  if (!binaryOperatorCalcul[operator]) throw new TypeError("Bad operator");

  if (b === 0 && (operator === 'MOD' || operator === '/')) {
    throw new TypeError("Cannot divide by 0");
  }
}

const calculateBinary = (a: number, b: number, operator: BinaryOperator | string): number => {
  operationErrorHandler(b, operator);

  return binaryOperatorCalcul[operator](a, b);
}

const calculateUnary = (a: number, operator: UnaryOperator | string): number => {
  if (isNaN(a)) throw new TypeError("No value for NEGATE");

  return unaryOperatorCalcul[operator](a);
}

const defineTypeOfAndCalculate = (item: string, stack: number[]): number => {
  if (!isNaN(Number(item))) {
    if (Number(item) < 0) throw new TypeError("Bad value");
    return Number(item);
  }

  if (unaryOperator.includes(item)) {
    let operand = item,
      a = stack.pop();

    return calculateUnary(a, operand);
  }

  let operand = item,
    b = stack.pop(),
    a = stack.pop();

  if (isNaN(a) || isNaN(b)) throw new TypeError("Not enough numbers for the number of operators");

  return calculateBinary(a, b, operand);
}

function recursiveOperation(stack: number[], exprList: string[]) {
  let item = exprList.shift();

  if (!item) return;

  const accumulator = defineTypeOfAndCalculate(item, stack);

  stack.push(accumulator);

  recursiveOperation(stack, exprList);
}

export const runRPN = (expr: string): number => {
  let exprList = expr.split(' ');

  let stack: number[] = [];

  // solution 1:
  recursiveOperation(stack, exprList);

  // solution 2: boucle for sans recursivite
  /* for (let item of exprList) {
    const accumulator = stackAccumulator(item, stack);

    stack.push(accumulator);
  } */

  if (stack.length > 1) throw new TypeError("Too many numbers for the number of operators");

  return stack.pop();
}