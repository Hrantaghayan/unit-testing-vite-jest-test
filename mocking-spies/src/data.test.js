import { describe, it, expect, vi } from "vitest";
import { generateReportData } from "./data";

describe("generateReportData()", () => {
  it("should execute if logFn is provided", () => {
    const logger = vi.fn(); // spies
    logger.mockImplementationOnce(() => {});
    //   logger.mockImplementation(() => {
    //   console.log("Logger called");
    // });
    generateReportData(logger);
    expect(logger).toBeCalled();
  });
});
