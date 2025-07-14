import {
  //  test,
  it,
  expect,
} from "vitest";
import { add } from "./math.js";

// it and test  are teh same thing you can choose which to use

// test("test should summarize all number values in an array", () => {
//   //arrange face
//   const numbers = [1, 2, 3];

//   // act face
//   const result = add(numbers);

//   //assert face

//   const exepectedResult = numbers.reduce((acc, number) => acc + number, 0);
//   expect(result).toBe(exepectedResult);
// });

it("it should summarize all number values in an array", () => {
  //arrange face
  const numbers = [1, 2, 3];

  // act face
  const result = add(numbers);

  //assert face

  const exepectedResult = numbers.reduce((acc, number) => acc + number, 0);
  expect(result).toBe(exepectedResult);
});

it("should yield NaN if no numbers are provided", () => {
  const numbers = ["asdasdas", 1];

  const result = add(numbers);

  expect(result).toBeNaN();
});

it("should yield a correct sum if array of numeric strings is provided", () => {
  // Arrange
  const numbers = ["1", "2", "3"];
  // Act
  const expectedResult = numbers.reduce((acc, number) => +acc + +number, 0);
  const result = add(numbers);
  // Assert
  expect(result).toBe(expectedResult);
});

it("should yield 0 if an empty array is provided", () => {
  // Arrange
  const numbers = [];
  // Act
  const result = add(numbers);
  // Assert
  expect(result).toBe(0);
});

it("should yield NaN if no array is provided", () => {
  const input = "asdassda5525";

  const result = add(input);

  expect(result).toBeNaN();
});

it("should yield an error if no input is provided", () => {
  try {
    add();
  } catch (error) {
    expect(error).toBeDefined();
  }
});

it("should yield an error if no input is provided", () => {
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow();
});

it("should yield an error if multiple arguments are provided", () => {
  const num1 = 1;
  const num2 = 2;
  const resultFn = () => {
    add(num1, num2);
  };
  expect(resultFn).toThrow(/is not iterable/);
});
