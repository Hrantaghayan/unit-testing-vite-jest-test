import { extractNumberValues } from "./src/parser.js";
import {  calculateResult } from "./src/math.js";
import { generateResultText,outPutResult } from "./src/output.js";

const form = document.querySelector("form");

function formSubmitHandler(event) {
  event.preventDefault();
  const numberValues = extractNumberValues(form);

  let result = calculateResult(numberValues);

  let resultText = generateResultText(result);

  outPutResult(resultText);
}

form.addEventListener("submit", formSubmitHandler);
