import { describe, it, expect } from "vitest";
import { transformToNumber, cleanNumbers } from "./numbers";

describe("transformToNumber()", () => {
  it("should transform a string or a number to a number of type number", () => {
    // Arrange
    const input = "123";
    // Act
    const result = transformToNumber(+input);
    // Assert
    expect(result).toBe(+input);
  });

  it("should yield NaN for non transformable values", () => {
    // Arrange
    const input = "invalid";
    const input2 = {};
    // Act
    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);
    // Assert
    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe("cleanNumbers()", () => {
  it("should return an array on number values if an array of string number values is provided", () => {
    const numbervalues = ["1", "2", "3"];
    const cleanedNumbers = cleanNumbers(numbervalues);

    for (const number of cleanedNumbers) {
      expect(number).toBeTypeOf("number");
    }
    
    expect(cleanedNumbers).toHaveLength(numbervalues.length);
  });
  
  it("should throw an error if an empty string is provided in array", () => {
    const numbervalues = ["", "2", "3"];
    
    expect(() => {
      cleanNumbers(numbervalues);
    }).toThrow(/Invalid input - must not be empty/);
  });

  it("should throw an error if non numeric string is provided", () => {
    const numbervalues = ["ASD"];
    expect(() => {
      cleanNumbers(numbervalues);
    }).toThrow(/Invalid number input/);
  });
  
  it("should throw an error if a non string value is provided", () => {
    const numbervalues = [1, "2", "3"];
    expect(() => {
      cleanNumbers(numbervalues);
    }).toThrow(/value.trim is not a function/);
  });
});
