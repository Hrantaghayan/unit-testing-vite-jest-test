import {  it, expect, describe } from "vitest";
import { validateStringNotEmpty } from "./validation";
import { validateNumber } from "./validation";

describe("validateStringNotEmpty()", () => {
  it("should throw an error if the string is empty", () => {
    const input = "";
    const resultFn = () => {
      validateStringNotEmpty(input);
    };
    expect(resultFn).toThrow("Invalid input - must not be empty.");
  });

  it("should throw an error if the string is just whitespace", () => {
    const input = "   ";
    const resultFn = () => {
      validateStringNotEmpty(input);
    };
    expect(resultFn).toThrow("Invalid input - must not be empty.");
  });

  it("should not throw an error for a valid non-empty string", () => {
    const input = "valid string";
    const resultFn = () => {
      validateStringNotEmpty(input);
    };
    expect(resultFn).not.toThrow();
  });
});

describe("validateNumber()", () => {
  it("should throw an error if the input is NaN", () => {
    const input = NaN;
    const resultFn = () => {
      validateNumber(input);
    };
    expect(resultFn).toThrow("Invalid number input.");
  });

  it("should not throw an error for a valid number", () => {
    const input = 42;
    const resultFn = () => {
      validateNumber(input);
    };
    expect(resultFn).not.toThrow();
  });

  it("should throw an error for non-numeric strings", () => {
    const input = "not a number";
    const theoreticalNumber = "1";
    const resultFn = () => {
      validateNumber(input);
      validateNumber(theoreticalNumber);
    };
    expect(resultFn).toThrow("Invalid number input.");
  });
});
