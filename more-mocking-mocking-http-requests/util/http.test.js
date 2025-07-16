import { expect, it, vi } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

const testResponseData = {
  testKey: "testData",
};

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== "string") {
      return reject("Not a string");
    }
    const testReponse = {
      ok: true,
      json: () => {
        return new Promise((resolve) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testReponse);
  });
});

vi.stubGlobal("fetch", testFetch);

it("should send data request and return response data", async () => {
  const testData = { key: "value" };
  const responseData = await sendDataRequest(testData);

  expect(responseData).toEqual(testResponseData);
});

it("should convert the provided data to json before sending the request", async () => {
  const testData = { key: "value" };
  let errorMessage;
  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).not.toBe("Not a string");
});

it("should throw an HttpError in case on non-ok responses", async () => {
  const testData = { key: "value" };
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((resolve, reject) => {
      const testReponse = {
        ok: false,
        json: () => {
          return new Promise((resolve) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testReponse);
    });
  });
  try {
    await sendDataRequest(testData);
  } catch (error) {
    expect(error).toBeInstanceOf(HttpError);
  }
});
