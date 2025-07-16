import { it, expect } from "vitest";
import { validateNotEmpty } from "./validation";

it("should throw ValidationError if text is empty", () => {
  const testInput = "";
  const errorMessage = "Text cannot be empty";
  expect(() => {
    validateNotEmpty(testInput, errorMessage);
  }).toThrow(errorMessage);
});

it("should throw error if the type of first argument is not string", () => {
  const testInput = 123;
  expect(() => {
    validateNotEmpty(testInput);
  }).toThrow(/text.trim is not a function/i);
});

it("should throw validation error is text is empty", () => {
  const text = "      ";
  const message = "Text cannot be empty";

  expect(() => {
    validateNotEmpty(text, message);
  }).toThrow(message);
});
