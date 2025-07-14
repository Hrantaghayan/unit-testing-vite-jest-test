# JavaScript Unit Testing - The Practical Guide Code & Course Materials

This repository contains code snapshots and other attachments (e.g., slides) for our [JavaScript Unit Testing - The Practical Guide](https://acad.link/testing) course.

You may use the provided resources to follow along with the course, debug your code or to compare your solution to Maximilian's. Re-distributing course materials (including the content provided with this repository) is not permitted.

# How To Use

This repository contains multiple [branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches). Every branch represents a course section and contains the resources that belong to that section.

For example, the branch [02-basics](https://github.com/academind/js-testing-practical-guide-code/tree/03-basics) contains all course resources (e.g., code snapshots) that belong to section 3 ("Testing Basics") of the course.

You can switch branches via the dropdown in the top left corner of this repository page.

# Provided Resources

In most branches (i.e., for most course sections), you find the following folders in the repository branch:

- **`/code`**: Contains multiple subfolders with different code snapshots for this course section (also see [Using Code Snapshots](#using-code-snapshots))
- **`/slides`**: Contains section slides (if slides were shown / used in the section)
- **`/extra-files`**: Contains any extra files that were used (e.g., starting project code snapshots)

# Using Code Snapshots

Code snapshots (which you find in `/code`) are there for you to compare your code to mine and find + fix errors you might have in your code.

You can either view my code directly here on Github (you can open + view code files without issues here) or you download the snapshots. To download (or [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)) the snapshots, simply use the **"Code" button** in the top right corner of the repository. This allows you to download the currently selected branch. You can then browse the code snapshots locally on your machine.

The subfolders in the `/code` folder are named such that mapping them to the course lectures is straightforward.

# Running The Provided Code

The provided code is primarily meant to be used for code comparisons (i.e., so that you can compare your code to mine to find + fix errors). 

But you can also run my project code by navigating into the respective code snapshots subfolder (i.e., a subfolder in the `/code` folder) and executing `npm install` followed by `npm test` there.

# Testing Framework: Vitest vs Jest

This course uses **Vitest** as the testing framework. Here's a comparison between Vitest and Jest to help you understand the differences:

## Vitest
- **Modern & Fast**: Built by the Vite team, designed for modern web development
- **Native ES Modules**: Works with ES modules out of the box (no transpilation needed)
- **Lightning Speed**: Extremely fast test execution due to Vite's optimized build system
- **Hot Module Replacement (HMR)**: Tests re-run instantly when files change
- **TypeScript Support**: Excellent TypeScript support without additional configuration
- **Jest Compatible**: API is compatible with Jest, making migration easy
- **Smaller Bundle**: Lighter and faster startup compared to Jest
- **Best For**: New projects, Vite-based applications, when performance matters

## Jest
- **Mature & Stable**: Well-established testing framework with years of development
- **Large Ecosystem**: Extensive community support and plugin ecosystem
- **Rich Documentation**: Comprehensive guides and tutorials available
- **Wide Adoption**: Industry standard, used by many major projects
- **Configuration Options**: More extensive configuration and customization options
- **ES Modules**: Requires additional setup for modern ES modules
- **Best For**: Existing projects, when you need mature ecosystem support

## When to Choose
- **Choose Vitest**: For new projects, especially with Vite, Vue, or modern React setups
- **Choose Jest**: For existing projects or when you need the mature Jest ecosystem

# Test Writing: `test` vs `it`

In this course, you'll see both `test` and `it` functions being used. Here's what you need to know:

## Similarities
- **Identical Functionality**: Both `test` and `it` do exactly the same thing
- **Same Parameters**: Both accept a description string and a test function
- **Interchangeable**: You can use either one without any difference in behavior
- **Same Results**: Both produce identical test outcomes

## Differences
- **Style & Readability**: The main difference is how they read
  - `it("should add two numbers", () => {})` - reads like natural English
  - `test("should add two numbers", () => {})` - more explicit and direct
- **Origin**: `it` comes from BDD (Behavior Driven Development) methodology
- **Convention**: `it` is often preferred for its natural language flow

## Examples
```javascript
// Using 'it' - reads like a sentence
it("should calculate the sum of an array", () => {
  const result = add([1, 2, 3]);
  expect(result).toBe(6);
});

// Using 'test' - more explicit
test("calculates the sum of an array", () => {
  const result = add([1, 2, 3]);
  expect(result).toBe(6);
});
```

## Recommendation
- **Be Consistent**: Choose one style and stick to it throughout your project
- **Team Preference**: Many teams prefer `it` for better readability
- **Personal Choice**: Use whichever feels more natural to you

# Verbose Mode in Testing

When running tests, you might notice the `--reporter verbose` flag in the test scripts. Here's what verbose mode does and why it's useful:

## What is Verbose Mode?
Verbose mode provides **detailed output** during test execution, showing more information about each test that runs.

## Purpose of Verbose Mode
- **Detailed Test Information**: Shows the name and status of each individual test
- **Better Debugging**: Helps identify which specific tests are passing or failing
- **Progress Tracking**: Displays real-time progress as tests execute
- **Error Context**: Provides more detailed error messages and stack traces
- **Test Structure**: Shows the hierarchical structure of test suites and individual tests

## Verbose vs Normal Mode

### Normal Mode Output:
```
✓ 2 tests passed
```

### Verbose Mode Output:
```
✓ should calculate the sum of an array (2ms)
✓ should handle empty arrays (1ms)
✓ should throw error for invalid input (3ms)

Tests: 3 passed, 3 total
Time: 0.5s
```

## When to Use Verbose Mode
- **Development**: When writing and debugging tests
- **CI/CD Pipelines**: For detailed logs in automated testing
- **Troubleshooting**: When you need to see exactly which tests are failing
- **Learning**: To understand test execution flow and timing

## Configuration in package.json
```json
{
  "scripts": {
    "test": "vitest --run --reporter verbose",
    "test:watch": "vitest",
    "test:silent": "vitest --run --reporter basic"
  }
}
```

## Benefits
- **Transparency**: See exactly what's happening during test execution
- **Performance Insights**: View timing information for each test
- **Debugging Aid**: Quickly identify problematic tests
- **Documentation**: Verbose output serves as living documentation of test behavior

# Watch Mode in Testing

The `test:watch` script uses Vitest's watch mode, which is a powerful feature for continuous testing during development.

## What is Watch Mode?
Watch mode **automatically re-runs tests** whenever you make changes to your code or test files, providing instant feedback during development.

## How Watch Mode Works
- **File Monitoring**: Watches for changes in source files and test files
- **Automatic Re-execution**: Runs only the tests affected by your changes
- **Instant Feedback**: Shows test results immediately after saving files
- **Interactive Mode**: Provides keyboard shortcuts for additional actions

## Benefits of Watch Mode
- **Fast Development**: No need to manually run tests after each change
- **Immediate Feedback**: Know instantly if your changes break existing functionality
- **Selective Testing**: Only runs tests related to changed files (smart testing)
- **Continuous Integration**: Keeps tests running in the background while you code

## Usage Examples
```bash
# Start watch mode
npm run test:watch

# Or directly with vitest
npx vitest
```

## Watch Mode Features
- **Press `q`**: Quit watch mode
- **Press `r`**: Re-run all tests
- **Press `f`**: Run only failed tests
- **Press `u`**: Update snapshots
- **Press `p`**: Filter tests by filename pattern

## When to Use Watch Mode
- **Active Development**: When writing new features or fixing bugs
- **Refactoring**: To ensure changes don't break existing functionality
- **Test-Driven Development (TDD)**: Perfect for red-green-refactor cycles
- **Learning**: Great for experimenting and seeing immediate results

## Configuration
```json
{
  "scripts": {
    "test": "vitest --run --reporter verbose",
    "test:watch": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

Watch mode makes testing more interactive and helps maintain code quality by providing continuous feedback during development.

# Vitest and Jest Compatibility

Yes! **Vitest is designed to be Jest-compatible**, meaning it uses most of the same properties, APIs, and syntax as Jest.

## Shared Properties and APIs

### Test Functions
```javascript
// Both Vitest and Jest use the same functions
describe("Math operations", () => {
  test("should add numbers", () => {
    expect(1 + 1).toBe(2);
  });
  
  it("should subtract numbers", () => {
    expect(5 - 3).toBe(2);
  });
});
```

### Assertion Methods
Both frameworks share the same `expect` API:
```javascript
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(array).toContain(item);
expect(string).toMatch(/pattern/);
expect(fn).toThrow();
expect(fn).toHaveBeenCalled();
```

### Lifecycle Hooks
```javascript
beforeAll(() => { /* setup */ });
beforeEach(() => { /* setup before each test */ });
afterEach(() => { /* cleanup after each test */ });
afterAll(() => { /* cleanup */ });
```

### Mocking Functions
```javascript
// Mock functions work the same way
const mockFn = vi.fn(); // Vitest uses 'vi' instead of 'jest'
const jestMockFn = jest.fn(); // Jest uses 'jest'

// But the API is identical
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(arg);
```

## Key Differences

### Global Objects
- **Jest**: Uses `jest` global object (`jest.fn()`, `jest.mock()`)
- **Vitest**: Uses `vi` global object (`vi.fn()`, `vi.mock()`)

### Configuration
- **Jest**: `jest.config.js` or `package.json` jest field
- **Vitest**: `vite.config.js` with test configuration or `vitest.config.js`

### Module Handling
- **Jest**: Requires configuration for ES modules
- **Vitest**: Native ES module support out of the box

## Migration from Jest to Vitest
Because of this compatibility, migrating from Jest to Vitest is usually straightforward:

1. **Replace global objects**: Change `jest.fn()` to `vi.fn()`
2. **Update configuration**: Move from `jest.config.js` to `vite.config.js`
3. **Update dependencies**: Replace Jest with Vitest in package.json
4. **Most test code remains unchanged**

## Why This Compatibility Matters
- **Easy Learning**: If you know Jest, you already know most of Vitest
- **Smooth Migration**: Existing Jest tests can be converted with minimal changes
- **Familiar API**: Developers don't need to learn a completely new testing syntax
- **Community Resources**: Jest tutorials and examples often work with Vitest

## Example: Same Test, Both Frameworks
```javascript
// This test works in both Jest and Vitest (with minor global object changes)
describe("Calculator", () => {
  test("should add two numbers correctly", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
    expect(result).toBeGreaterThan(4);
    expect(result).toBeLessThan(6);
  });
});
```

The main takeaway: **Vitest intentionally maintains Jest compatibility** to make adoption easier while providing modern performance benefits.

# Common Test Matchers Explained

Understanding test matchers is crucial for writing effective tests. Here are the most commonly used matchers and what they mean:

## Truthiness and Existence Matchers

### `toBeDefined()`
- **What it means**: Checks if a value is **not undefined**
- **Use case**: Verify that a variable, function return, or object property exists
```javascript
const user = { name: "John", age: 30 };
expect(user.name).toBeDefined(); // ✅ Pass - "John" is defined
expect(user.email).toBeDefined(); // ❌ Fail - email property doesn't exist (undefined)
```

### `toBeUndefined()`
- **What it means**: Checks if a value is **undefined**
- **Use case**: Verify that something doesn't exist or wasn't set
```javascript
let unsetVariable;
expect(unsetVariable).toBeUndefined(); // ✅ Pass
expect(user.email).toBeUndefined(); // ✅ Pass - property doesn't exist
```

### `toBeNull()`
- **What it means**: Checks if a value is **exactly null**
- **Use case**: Verify intentional null values
```javascript
const result = searchUser("nonexistent");
expect(result).toBeNull(); // ✅ Pass if function returns null for not found
```

### `toBeTruthy()` and `toBeFalsy()`
- **toBeTruthy()**: Value is "truthy" (not false, 0, "", null, undefined, NaN)
- **toBeFalsy()**: Value is "falsy" (false, 0, "", null, undefined, NaN)
```javascript
expect("hello").toBeTruthy(); // ✅ Pass - non-empty string is truthy
expect(1).toBeTruthy(); // ✅ Pass - positive number is truthy
expect(0).toBeFalsy(); // ✅ Pass - zero is falsy
expect("").toBeFalsy(); // ✅ Pass - empty string is falsy
```

## Value Comparison Matchers

### `toBe()` vs `toEqual()`
- **toBe()**: Exact equality (like ===), same reference for objects
- **toEqual()**: Deep equality, compares content/structure
```javascript
// Primitives - both work the same
expect(5).toBe(5); // ✅ Pass
expect(5).toEqual(5); // ✅ Pass

// Objects - different behavior
const obj1 = { name: "John" };
const obj2 = { name: "John" };
expect(obj1).toBe(obj2); // ❌ Fail - different references
expect(obj1).toEqual(obj2); // ✅ Pass - same content
```

### `toBeGreaterThan()` and `toBeLessThan()`
```javascript
expect(10).toBeGreaterThan(5); // ✅ Pass
expect(3).toBeLessThan(5); // ✅ Pass
expect(5).toBeGreaterThanOrEqual(5); // ✅ Pass
expect(5).toBeLessThanOrEqual(5); // ✅ Pass
```

## Array and String Matchers

### `toContain()`
- **What it means**: Checks if array contains item or string contains substring
```javascript
const fruits = ["apple", "banana", "orange"];
expect(fruits).toContain("banana"); // ✅ Pass

const message = "Hello World";
expect(message).toContain("World"); // ✅ Pass
```

### `toMatch()`
- **What it means**: Tests strings against regular expressions
```javascript
expect("hello@example.com").toMatch(/\S+@\S+\.\S+/); // ✅ Pass - email pattern
expect("Hello World").toMatch(/hello/i); // ✅ Pass - case insensitive
```

## Error and Function Matchers

### `toThrow()`
- **What it means**: Checks if function throws an error when called
```javascript
const badFunction = () => {
  throw new Error("Something went wrong");
};

expect(badFunction).toThrow(); // ✅ Pass - function throws
expect(badFunction).toThrow("Something went wrong"); // ✅ Pass - specific message
expect(() => add()).toThrow(); // ✅ Pass - wrapped function call
```

## Special Number Matchers

### `toBeNaN()`
- **What it means**: Checks if value is NaN (Not a Number)
```javascript
expect(parseInt("hello")).toBeNaN(); // ✅ Pass - parsing "hello" gives NaN
expect(0/0).toBeNaN(); // ✅ Pass - division by zero gives NaN
```

### `toBeCloseTo()`
- **What it means**: For floating-point number comparisons (avoids precision issues)
```javascript
expect(0.1 + 0.2).toBeCloseTo(0.3); // ✅ Pass - handles floating point precision
expect(0.1 + 0.2).toBe(0.3); // ❌ Might fail due to floating point precision
```

## Quick Reference
```javascript
// Existence
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Equality
expect(value).toBe(expected);        // Exact equality
expect(value).toEqual(expected);     // Deep equality

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeNaN();
expect(value).toBeCloseTo(3.14);

// Arrays/Strings
expect(array).toContain(item);
expect(string).toMatch(/pattern/);

// Functions
expect(fn).toThrow();
expect(fn).toThrow("error message");
```#   u n i t - t e s t i n g - v i t e - t e s t - j e s t  
 #   u n i t - t e s t i n g - v i t e - t e s t - j e s t  
 #   u n i t - t e s t i n g - v i t e - t e s t - j e s t  
 #   u n i t - t e s t i n g - v i t e - j e s t - t e s t  
 