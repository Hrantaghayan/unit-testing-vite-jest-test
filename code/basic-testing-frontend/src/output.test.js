import { it, expect, describe } from "vitest";
import { generateResultText } from "./output";

describe("generateResultText", () => {
  it("should return string no matter which value is passed in.", () => {
    // Arrange
    const val1 = "invalid";
    const val2 = 123;
    const val3 = null;
    const val4 = undefined;
    const val5 = [];
    const val6 = {};

    // Act
    const resultText1 = generateResultText(val1);
    const resultText2 = generateResultText(val2);
    const resultText3 = generateResultText(val3);
    const resultText4 = generateResultText(val4);
    const resultText5 = generateResultText(val5);
    const resultText6 = generateResultText(val6);

    // Assert
    expect(resultText1).toBeTypeOf("string");
    expect(resultText2).toBeTypeOf("string");
    expect(resultText3).toBeTypeOf("string");
    expect(resultText4).toBeTypeOf("string");
    expect(resultText5).toBeTypeOf("string");
    expect(resultText6).toBeTypeOf("string");
  });

  it("should return empty string if no calc is provided as result", () => {
    const result = "no-calc";
    const resultText = generateResultText(result);
    expect(resultText).toBe("");
  });

  it("shoudl return string if invalid is provided as result", () => {
    const result = "invalid";
    const resultText = generateResultText(result);
    expect(resultText).toBe("Invalid input. You must enter valid numbers.");
  });
});
