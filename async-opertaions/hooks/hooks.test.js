import { it, expect, beforeAll, beforeEach, afterAll, afterEach } from "vitest";

import { User } from "./hooks";

// const testEmail = "test@test.com";
// const user = new User(testEmail);

let testEmail = "test@test.com";
let user ;

beforeAll(() => {
  console.log("beforeAll: This runs once before all tests in this file.");
  user = new User(testEmail);
});

beforeEach(() => {
  console.log("beforeEach: This runs before each test in this file.");
  testEmail = "test@test.com";
  user = new User(testEmail);
});


afterEach(() => {
  console.log("afterEach: This runs after each test in this file.");
  // testEmail = "test@test.com";
  // user = new User(testEmail);
});

afterAll(() => {
  console.log("afterAll: This runs once after all tests in this file.");
  // Cleanup resources, if any
  // e.g., close database connections, stop servers, etc.
});

it.concurrent("should update the email", () => {
  const newTestEmail = "test2@test.com";

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it.concurrent("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it.concurrent("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});

it.concurrent("should clear the email", () => {
  user.clearEmail();

  expect(user.email).toBe("");
});

it.concurrent("should still have an email property after clearing the email", () => {
  user.clearEmail();

  expect(user).toHaveProperty("email");
});
