import { it, describe, expect, beforeEach } from "vitest";
import { extractPostData } from "./posts";

const testTitle = "Test Title";
const testContent = "This is a test content.";
let testFormData;

describe("extractPostData()", () => {
  beforeEach(() => {
    testFormData = {
      title: testTitle,
      content: testContent,
      get(key) {
        return this[key];
      },
    };
  });

  it("should extract title and content from the provided form data", () => {
    const result = extractPostData(testFormData);

    expect(result.title).toEqual(testTitle);
    expect(result.content).toEqual(testContent);
  });
});
