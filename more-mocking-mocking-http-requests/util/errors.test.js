import { describe, expect, it, beforeAll, afterEach } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
  let httpsError;
  let statusCode;
  let message;
  let data;

  beforeAll(() => {
    httpsError = new HttpError(404, "Not Found", { key:"test" });
    statusCode = httpsError.statusCode;
    message = httpsError.message;
    data = httpsError.data;
  });

  afterEach(() => {
    httpsError = new HttpError(404, "Not Found", { key:"test" });
    statusCode = httpsError.statusCode;
    message = httpsError.message;
    data = httpsError.data;
  });

  it("should create an instance of httperror", () => {
    expect(httpsError).toBeInstanceOf(HttpError);
  });

  it("should have the correct statusCode", () => {
    expect(httpsError.statusCode).toBe(statusCode);
  });

  it("should have the correct message", () => {
    expect(httpsError.message).toBe(message);
  });

  it("should have the correct data", () => {
    expect(httpsError.data).toEqual(data);
  });
  it("should have data undefined if not provided", () => {
    const errorWithoutData = new HttpError(500, "Internal Server Error");
    expect(errorWithoutData.data).toBeUndefined();
  });
});

describe("ValidationError()", () => {
  let validationError;
  let errorMessage;

  beforeAll(() => {
    validationError = new ValidationError("Invalid input");
    errorMessage = validationError.message;
  });

  afterEach(() => {
    validationError = new ValidationError("Invalid input");
    errorMessage = validationError.message;
  });

  it("should create an instance of ValidationError", () => {
    expect(validationError).toBeInstanceOf(ValidationError);
  });

  it("should have the correct message", () => {
    expect(validationError.message).toBe(errorMessage);
  });

});
