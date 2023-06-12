// @ts-ignore see https://gtesthub.com/jest-communtesty/jest-extended#setup
import * as matchers from "jest-extended";
import { runRPN } from ".";

expect.extend(matchers);

test("Test soustraction", () => {
  expect(runRPN("1 1 -")).toEqual(0);
});

test("Test addition", () => {
  expect(runRPN("1 2 +")).toEqual(3);
});

test('Test multiplication', () => {
  expect(runRPN('3 2 *')).toEqual(6);
})

test('Test division', () => {
  expect(runRPN('3 2 *')).toEqual(6);
})

test("Test negate", function () {
  expect(runRPN("2 NEGATE")).toEqual(-2);
});

test("Test modulo", function () {
  expect(runRPN("7 3 MOD")).toEqual(1);
});

test("Test negate failed", function () {
  expect(() => runRPN("-2")).toThrow(TypeError);
  expect(() => runRPN("-2")).toThrow("Bad value");
});

//valeurs plus simple
test("Addition sup", function () {
  expect(runRPN("99 11 + 8 7 + +")).toEqual(125);
});

test("CONTROL: Multiplication sup", function () {
  expect(runRPN("4 7 * 5 2 * *")).toEqual(280);
});

test("CONTROL: Suppression sup", function () {
  expect(runRPN("33 3 - 10 6 - -")).toEqual(26);
});

test("CONTROL: Division sup", function () {
  expect(runRPN("90 3 / 30 5 / /")).toEqual(5);
});

test("CONTROL: All calcul at once", function () {
  expect(runRPN("15 7 1 1 + - / 3 * 2 1 1 + + -")).toEqual(5);
});

test("Bad operator", () => {
  expect(() => runRPN("2 4 &")).toThrow("Bad operator");
})

test("Wrong number of operator and value", () => {
  expect(() => runRPN('2 3 4 +')).toThrow("Stack too long");
})

test("Bad use of NEGATE", () => {
  expect(() => runRPN("NEGATE")).toThrow("No value for NEGATE");
})

test("No enough value with an operator", () => {
  expect(() => runRPN("2 +")).toThrow("No value for operator");
})

test("Divide by 0", () => {
  expect(() => runRPN("3 0 /")).toThrow("Cannot divide by 0");
})

test("Modulo by 0", () => {
  expect(() => runRPN("3 0 MOD")).toThrow("Cannot divide by 0");
})