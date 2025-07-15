import { it, expect, describe } from "vitest";
import { generateToken, generateTokenPromise } from "./async-example.js";

describe("generateToken()", () => {
  it("should generate a token with the provided email", (done) => {
    const userEmail = "test@test.com";
    generateToken(userEmail, (err, token) => {
      try {
        expect(token).toBeDefined();
        done();
      } catch (error) {
        done(error); // If an error occurs, pass it to done
      }
    });
  });
});

describe("generateTokenPromise()", () => {
  it("should generate token using promise with resolve or reject", () => {
    const userEmail = "test@test.com";
    expect(generateTokenPromise(userEmail)).resolves.toBeDefined();
  });

  
  it("should generate token using promise", async () => {
    const userEmail = "test@test.com";
    const token = await generateTokenPromise(userEmail);
    expect(token).toBeDefined();
  });
});
