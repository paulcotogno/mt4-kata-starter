export const runRPN = (expr: string) => {
  let exprList = expr.split(' ');

  let stack: number[] = [];

  for (let item of exprList) {
    if (!isNaN(Number(item))) {
      if (Number(item) < 0) throw new TypeError("Bad value");

      stack.push(Number(item));
    } else if (item === 'NEGATE') {
      let a = stack.pop();

      if (!a) throw new TypeError("No value for NEGATE");

      stack.push(a * -1);
    } else {
      let operand = item,
        b = stack.pop(),
        a = stack.pop();

      if (isNaN(a) || isNaN(b)) throw new TypeError("No value for operator")

      switch (operand) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (b === 0) throw new TypeError("Cannot divide by 0");
          stack.push(a / b);
          break;
        case 'MOD':
          if (b === 0) throw new TypeError("Cannot MOD by 0");
          stack.push(a % b);
          break;
        default:
          throw new TypeError("Bad operator");
      }
    }
  }

  if (stack.length > 1) {
    throw new TypeError("Stack too long");
  } else {
    return stack[0];
  }
}