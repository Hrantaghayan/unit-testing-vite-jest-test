import { it, expect, vi } from "vitest";
import { promises as fs } from "fs";
import writeData from "./io";

vi.mock("fs"); // the mocked the modul that we provide it
vi.mock("path", () => {
  return {
    default: {
      join: (...args) => {
        return args[args.length - 1];
      },
    },
  };
});

it("should execute the writeFile method", () => {
  const testData = "test data";
  const fileName = "test.txt";
  writeData(testData, fileName);
  //   expect(fs.writeFile).toBeCalled();
  expect(fs.writeFile).toBeCalledWith(fileName, testData);
});

it("should return promise the resolves to no value if it is called",async ()=>{
    const testData = "test data";
    const testFilename = "test.txt";
    const result = await writeData(testData, testFilename);
    expect(result).toBeUndefined();
})
