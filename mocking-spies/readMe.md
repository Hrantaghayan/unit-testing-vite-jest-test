# Mocking and Spies in Testing

This project demonstrates the use of **mocks** and **spies** in unit testing with Vitest.

## What are Mocks?

**Mocks** are test doubles that replace real dependencies with fake implementations. They allow you to:

- Control what a dependency returns
- Verify that specific methods were called
- Isolate the code under test from external dependencies

### Example:

```javascript
// Mock an entire module
vi.mock("fs");

// Mock returns a specific value
const mockFn = vi.fn().mockReturnValue("mocked result");

// Mock with implementation
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: "mocked data" }),
  },
}));
```

### Mock Arguments and Methods:

- `vi.mock(moduleName, factory)` - Mock entire module
- `vi.fn()` - Create mock function
- `vi.fn().mockReturnValue(value)` - Return specific value
- `vi.fn().mockResolvedValue(value)` - Return resolved promise
- `vi.fn().mockRejectedValue(error)` - Return rejected promise
- `vi.fn().mockImplementation(fn)` - Custom implementation

### Real Use Cases for Mocks:

- **API calls**: Mock HTTP requests to avoid network dependencies
- **Database operations**: Mock database queries for faster tests
- **File system**: Mock file read/write operations
- **Third-party libraries**: Mock external services (payment gateways, etc.)
- **Time-dependent code**: Mock `Date.now()` for consistent tests

## What are Spies?

**Spies** are special functions that wrap around existing functions to monitor their behavior. They allow you to:

- Track if a function was called
- See what arguments were passed
- Count how many times a function was called
- Still execute the original function (unless overridden)

### Are Spies the same as `vi.fn()`?

**No, they are different:**

| Feature               | `vi.fn()`                             | `vi.spyOn()`                          |
| --------------------- | ------------------------------------- | ------------------------------------- |
| **Purpose**           | Creates a brand new mock function     | Wraps an existing function            |
| **Original Function** | No original function exists           | Preserves access to original function |
| **Default Behavior**  | Returns `undefined` by default        | Calls original function by default    |
| **Use Case**          | Replace/create functions from scratch | Monitor existing functions            |

### Examples:

```javascript
// vi.fn() - Creates a new mock function
const mockFn = vi.fn();
mockFn(); // Returns undefined
mockFn.mockReturnValue("mocked");
mockFn(); // Returns 'mocked'

// vi.spyOn() - Spies on existing function
const obj = { method: () => "original result" };
const spy = vi.spyOn(obj, "method");
spy(); // Still returns 'original result'
spy.mockReturnValue("spied result");
spy(); // Now returns 'spied result'

// You can restore the original
spy.mockRestore();
spy(); // Back to 'original result'
```

### Example:

```javascript
// Spy on an existing function
const spy = vi.spyOn(fs, "writeFile");

// Spy on object method
const obj = { method: () => "original" };
const spy = vi.spyOn(obj, "method");

// Spy with custom implementation
const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
```

### Key Differences from `vi.fn()`:

```javascript
// vi.fn() creates a completely new mock function
const mockFunction = vi.fn();
console.log(mockFunction()); // undefined (no original function)

// vi.spyOn() wraps an existing function
const realObject = {
  calculate: (a, b) => a + b,
};
const spy = vi.spyOn(realObject, "calculate");
console.log(spy(2, 3)); // 5 (original function still works)

// Both can be configured with mock behavior
mockFunction.mockReturnValue("mocked");
spy.mockReturnValue("spied");

// But only spies can be restored to original behavior
spy.mockRestore(); // Back to original function
// mockFunction.mockRestore(); // No original to restore!
```

### Spy Arguments and Methods:

- `vi.spyOn(object, methodName)` - Spy on object method
- `spy.mockImplementation(fn)` - Override with custom implementation
- `spy.mockReturnValue(value)` - Override return value
- `spy.mockRestore()` - Restore original implementation
- `spy.mockClear()` - Clear call history
- `spy.mockReset()` - Reset all mock state

### Common Spy Assertions:

- `expect(spy).toHaveBeenCalled()` - Check if called
- `expect(spy).toHaveBeenCalledWith(arg1, arg2)` - Check arguments
- `expect(spy).toHaveBeenCalledTimes(3)` - Check call count
- `expect(spy).toHaveBeenLastCalledWith(args)` - Check last call
- `expect(spy).toHaveBeenNthCalledWith(n, args)` - Check nth call

### Real Use Cases for Spies:

- **Logging verification**: Ensure error messages are logged
- **Event tracking**: Verify analytics events are fired
- **Method call validation**: Check if cleanup methods are called
- **Integration testing**: Monitor interactions between modules
- **Performance monitoring**: Track function call frequency

## Key Differences

| Aspect                | Mocks (`vi.fn()`)               | Spies (`vi.spyOn()`)              |
| --------------------- | ------------------------------- | --------------------------------- |
| **Purpose**           | Create new mock functions       | Monitor existing functions        |
| **Original Function** | No original function            | Preserves original function       |
| **Default Behavior**  | Returns `undefined`             | Calls original function           |
| **Execution**         | Don't execute original code     | Can execute original code         |
| **Use Case**          | Replace/create dependencies     | Track function calls and behavior |
| **Control**           | Full control over return values | Can intercept and modify behavior |
| **Restoration**       | Cannot restore (no original)    | Can restore with `mockRestore()`  |

### Summary:

- **`vi.fn()`** = Creates a brand new mock function from scratch
- **`vi.spyOn()`** = Wraps an existing function to monitor it
- **Both** can use the same mock methods (`.mockReturnValue()`, `.mockImplementation()`, etc.)
- **Only spies** can be restored to their original behavior

## When to Use Each

### Use Mocks when:

- You want to completely replace external dependencies
- You need to control return values or simulate errors
- You want to prevent actual file I/O, network calls, or database operations
- You need predictable behavior for testing
- Testing error scenarios (network failures, file permission errors)

### Use Spies when:

- You want to verify that functions are called correctly
- You need to track function usage without changing behavior
- You want to test integration while still monitoring interactions
- You need to count function calls or inspect arguments
- Debugging and monitoring existing code behavior

## Practical Examples

### Mock Example - API Testing:

```javascript
// Mock axios for API testing
vi.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

it('should fetch user data', async () => {
  const userData = { id: 1, name: 'John' };
  mockAxios.get.mockResolvedValue({ data: userData });

  const result = await fetchUser(1);

  expect(mockAxios.get).toHaveBeenCalledWith('/users/1');
  expect(result).toEqual(userData);
});
```

### Spy Example - Event Tracking:

```javascript
// Spy on analytics function
const trackingSpy = vi.spyOn(analytics, "track");

it("should track button click", () => {
  const button = getByText("Submit");
  fireEvent.click(button);

  expect(trackingSpy).toHaveBeenCalledWith("button_click", {
    button_name: "Submit",
    page: "checkout",
  });
});
```

## Project Structure

```
src/
├── util/
│   ├── io.js          # Main function that writes data to files
│   └── io.test.js     # Test file demonstrating mocks
__mocks__/
└── fs.js              # Mock implementation of fs module
```

## Current Project Example

In this project, we demonstrate mocking with file system operations:

```javascript
// io.js - Function under test
export default function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}

// io.test.js - Test with mocks
vi.mock("fs"); // Mock fs module
vi.mock("path", () => {
  // Mock path module
  return {
    default: {
      join: (...args) => args[args.length - 1],
    },
  };
});

it("should execute the writeFile method", () => {
  const testData = "test data";
  const fileName = "test.txt";

  writeData(testData, fileName);

  expect(fs.writeFile).toBeCalledWith(fileName, testData);
});
```

### Why Mock Here?

- **Prevents actual file creation** during tests
- **Isolates the logic** from file system dependencies
- **Makes tests fast** and predictable
- **Allows testing error scenarios** without affecting real files

## Running Tests

```bash
npm test
```

This project shows how to mock file system operations and path utilities to create isolated, fast, and reliable unit tests.
