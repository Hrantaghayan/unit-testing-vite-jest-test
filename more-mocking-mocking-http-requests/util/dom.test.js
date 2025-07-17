import fs from "fs";
import path from "path";
import { it, expect, vi, beforeEach } from "vitest";
import { Window } from "happy-dom";
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();

const cleanedHtml = htmlDocumentContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

const window = new Window();
const document = window.document;


vi.stubGlobal("document", document);

beforeEach(() => {
  document.body.innerHTML = ""; // Clear the document body before each test
  document.write(cleanedHtml); // Write the cleaned HTML content to the document
});

it("should add an error paragraph to the id='errors' element", () => {
  showError("Test error message");

  const errorElement = document.getElementById("errors");
  const errorParagraph = errorElement.firstElementChild;
  expect(errorParagraph).not.toBeNull();
  expect(errorParagraph.tagName).toBe("P");
});

it("should not contain error paragraph initially", () => {
  const errorElement = document.getElementById("errors");
  const errorParagraph = errorElement.firstElementChild;
  expect(errorParagraph).toBeNull();
});

it("should output the provided message in the error paragraph", () => {
  const errorMessage = "Another test error message";
  showError(errorMessage);

  const errorElement = document.getElementById("errors");
  const errorParagraph = errorElement.firstElementChild;
  expect(errorParagraph.textContent).toContain(errorMessage);
});
