# More Mocking - Frontend Testing Project

A comprehensive testing project demonstrating advanced mocking techniques using Vitest for frontend JavaScript applications.

## 📋 Project Overview

This project focuses on testing frontend JavaScript code with emphasis on:
- HTTP request mocking
- DOM manipulation testing
- Error handling validation
- Input validation testing
- Advanced mocking patterns

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd more-mocking
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:8080`

## 🧪 Testing

### Available Test Scripts

- **Run all tests once:**
  ```bash
  npm test
  ```

- **Run tests in watch mode:**
  ```bash
  npm run test:watch
  ```

- **Run specific test files:**
  ```bash
  npx vitest util/errors.test.js
  npx vitest util/validation.test.js
  ```

### Test Coverage

The project includes comprehensive tests for:
- **HTTP utilities** (`util/http.js`) - API request handling
- **Error handling** (`util/errors.js`) - Custom error classes
- **Input validation** (`util/validation.js`) - Form validation logic
- **DOM manipulation** (`util/dom.js`) - DOM interaction utilities
- **Posts functionality** (`posts/posts.js`) - Core application logic

## 📁 Project Structure

```
more-mocking/
├── app.js                 # Main application file
├── index.html            # Application entry point
├── package.json          # Dependencies and scripts
├── posts/
│   └── posts.js          # Posts-related functionality
└── util/
    ├── dom.js            # DOM manipulation utilities
    ├── errors.js         # Custom error classes
    ├── errors.test.js    # Error handling tests
    ├── http.js           # HTTP request utilities
    ├── http.test.js      # HTTP mocking tests
    ├── validation.js     # Input validation functions
    └── validation.test.js # Validation tests
```

## 🔧 Testing Techniques Used

### 1. Global Mocking with `vi.stubGlobal`
```javascript
// Mock fetch API for HTTP testing
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: 'test' })
}));
```

### 2. Error Handling Tests
```javascript
// Test custom error classes
expect(() => {
  throw new ValidationError('Invalid input');
}).toThrow('Invalid input');
```

### 3. Input Validation Testing
```javascript
// Test validation functions
expect(() => {
  validateNotEmpty('   ', 'Field cannot be empty');
}).toThrow(ValidationError);
```

### 4. DOM Manipulation Testing
Using `happy-dom` for DOM testing in Node.js environment.

## � Deep Dive: `vi.stubGlobal`

### What is `vi.stubGlobal`?
`vi.stubGlobal` is a powerful Vitest utility that allows you to mock global variables and functions during testing. It temporarily replaces global objects with mock implementations, enabling you to control external dependencies and simulate different scenarios.

### Syntax
```javascript
vi.stubGlobal(name, value)
```

**Parameters:**
- `name` (string): The name of the global property to stub
- `value` (any): The mock value or function to replace the global with

### Common Use Cases

#### 1. Mocking Fetch API
```javascript
import { vi, it, expect } from 'vitest';
import { sendDataRequest } from './http';

it('should handle successful API response', async () => {
  // Mock fetch to return successful response
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ 
      id: 1, 
      message: 'Success' 
    })
  }));

  const result = await sendDataRequest('/api/users', { name: 'John' });
  
  expect(fetch).toHaveBeenCalledWith('/api/users', expect.objectContaining({
    method: 'POST',
    body: JSON.stringify({ name: 'John' })
  }));
  expect(result).toEqual({ id: 1, message: 'Success' });
});

it('should handle API errors', async () => {
  // Mock fetch to return error response
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
    json: () => Promise.resolve({ error: 'Server Error' })
  }));

  await expect(sendDataRequest('/api/users', { name: 'John' }))
    .rejects.toThrow('Server Error');
});
```

#### 2. Mocking Browser APIs
```javascript
// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => {
    const store = { 'user': 'John Doe' };
    return store[key] || null;
  }),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
});

// Mock window.location
vi.stubGlobal('location', {
  href: 'https://example.com/test',
  pathname: '/test',
  search: '?param=value',
  reload: vi.fn()
});

// Mock navigator
vi.stubGlobal('navigator', {
  userAgent: 'Mozilla/5.0 (Test Browser)',
  language: 'en-US',
  geolocation: {
    getCurrentPosition: vi.fn()
  }
});
```

#### 3. Mocking Environment Variables
```javascript
// Mock process.env for Node.js environment
vi.stubGlobal('process', {
  env: {
    NODE_ENV: 'test',
    API_URL: 'https://test-api.com',
    DEBUG: 'true'
  }
});
```

#### 4. Mocking Custom Global Variables
```javascript
// Mock application configuration
vi.stubGlobal('APP_CONFIG', {
  apiUrl: 'https://mock-api.com',
  timeout: 5000,
  retryAttempts: 3,
  features: {
    enableAnalytics: false,
    enableLogging: true
  }
});
```

### Advanced Patterns

#### Conditional Mocking
```javascript
it('should handle different response scenarios', async () => {
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'first call' })
    })
    .mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: 'second call failed' })
    });

  vi.stubGlobal('fetch', mockFetch);

  // First call succeeds
  const result1 = await sendDataRequest('/api/test');
  expect(result1).toEqual({ data: 'first call' });

  // Second call fails
  await expect(sendDataRequest('/api/test')).rejects.toThrow();
});
```

#### Mock Implementation Validation
```javascript
// Validate input data transformation
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    // Validate that data is properly stringified
    if (typeof options.body !== "string") {
      return reject("Not a string");
    }
    // Continue with mock response...
  });
});
```

#### Dynamic Mock Behavior with `mockImplementationOnce`
```javascript
it("should handle different scenarios per call", async () => {
  // First call uses original mock (success)
  const result1 = await sendDataRequest(testData);
  expect(result1).toEqual(testResponseData);

  // Second call uses different behavior (failure)
  testFetch.mockImplementationOnce((url, options) => {
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Server error' })
    });
  });

  await expect(sendDataRequest(testData)).rejects.toThrow();
});
```

#### Try-Catch Error Testing Pattern
```javascript
it("should validate error handling", async () => {
  const testData = { key: "value" };
  let errorMessage;
  
  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }
  
  // Verify specific error conditions
  expect(errorMessage).not.toBe("Not a string");
  expect(errorMessage).toBeInstanceOf(HttpError);
});
```

### New Testing Methods and Their Usage

#### 1. **Input Validation Testing**
```javascript
// Test that data is properly transformed before sending
if (typeof options.body !== "string") {
  return reject("Not a string");
}
```
**Usage**: Validates that your function correctly stringifies JavaScript objects to JSON before sending HTTP requests. This ensures data integrity and prevents common serialization errors.

#### 2. **`mockImplementationOnce()` Method**
```javascript
testFetch.mockImplementationOnce((url, options) => {
  return new Promise((resolve) => {
    const testResponse = { ok: false, json: () => Promise.resolve(errorData) };
    resolve(testResponse);
  });
});
```
**Usage**: Temporarily changes mock behavior for a single call. Perfect for testing different scenarios (success/failure) within the same test suite without affecting other tests.

#### 3. **Instance Type Checking**
```javascript
expect(error).toBeInstanceOf(HttpError);
```
**Usage**: Verifies that your function throws the correct type of custom error. Essential for ensuring proper error handling and type safety in your application.

#### 4. **Negative Assertion Testing**
```javascript
expect(errorMessage).not.toBe("Not a string");
```
**Usage**: Confirms that certain error conditions do NOT occur. Useful for validating that your function properly handles data transformation and doesn't trigger validation errors.

#### 5. **Manual Error Handling Pattern**
```javascript
let errorMessage;
try {
  await sendDataRequest(testData);
} catch (error) {
  errorMessage = error;
}
```
**Usage**: Provides fine-grained control over error testing. Allows you to capture and examine errors without the test failing, enabling multiple assertions on the same error.

#### 6. **Conditional Promise Resolution**
```javascript
const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    // Validation logic
    if (typeof options.body !== "string") {
      return reject("Not a string");
    }
    // Success path
    resolve(testResponse);
  });
});
```
**Usage**: Creates smart mocks that can validate inputs and respond differently based on the data received. This simulates real-world API behavior where invalid data causes errors.

### Testing Patterns Demonstrated

1. **Data Transformation Testing**: Ensures objects are properly JSON-stringified
2. **Error Boundary Testing**: Validates custom error types are thrown
3. **Response Status Testing**: Checks handling of both successful and failed HTTP responses
4. **Input Validation**: Verifies proper data formatting before network requests
5. **Mock Behavior Switching**: Uses different mock implementations for different test scenarios

#### Spy on Global Functions
```javascript
it('should track console.log calls', () => {
  const consoleSpy = vi.fn();
  vi.stubGlobal('console', { log: consoleSpy });

  // Code that uses console.log
  myFunction(); // This function calls console.log internally

  expect(consoleSpy).toHaveBeenCalledWith('Expected log message');
});
```

### Cleanup and Restoration

#### Automatic Cleanup
Vitest automatically restores all global stubs after each test, ensuring test isolation.

#### Manual Restoration
```javascript
import { vi } from 'vitest';

// Restore all global stubs
vi.unstubAllGlobals();

// Restore specific global
vi.unstubGlobal('fetch');

// Use in cleanup
afterEach(() => {
  vi.unstubAllGlobals();
});
```

### Best Practices

1. **Always mock external dependencies** - Don't make real network requests in tests
2. **Keep mocks simple** - Only mock what you need for the specific test
3. **Use descriptive mock data** - Make test data meaningful and easy to understand
4. **Test different scenarios** - Mock both success and error cases
5. **Verify mock interactions** - Check that mocks were called with expected parameters

### Benefits of Using `vi.stubGlobal`

- **Test Isolation**: Prevents tests from affecting each other
- **Reliability**: Tests don't depend on external services
- **Speed**: Mocked functions are much faster than real API calls
- **Control**: You can simulate any scenario (success, failure, timeouts)
- **Consistency**: Same behavior across different environments

## �🛠️ Technologies Used

- **Testing Framework:** [Vitest](https://vitest.dev/)
- **DOM Testing:** [happy-dom](https://github.com/capricorn86/happy-dom)
- **Development Server:** [http-server](https://github.com/http-party/http-server)
- **Language:** JavaScript (ES6+)

## 📚 Key Testing Concepts

### Mocking Strategies
- **Global mocking** for browser APIs (fetch, localStorage)
- **Module mocking** for internal dependencies
- **Function mocking** for specific behaviors
- **Error simulation** for edge cases

### Test Organization
- **Unit tests** for individual functions
- **Integration tests** for component interactions
- **Error boundary tests** for exception handling
- **Validation tests** for input sanitization

## 🔍 Watch Mode Features

When running tests in watch mode (`npm run test:watch`):
- Tests automatically re-run on file changes
- Interactive commands available:
  - `a` - run all tests
  - `f` - run only failed tests
  - `q` - quit watch mode
  - `h` - show help menu

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🚀 Next Steps

- Add more comprehensive test coverage
- Implement E2E testing with Cypress/Playwright
- Add performance testing
- Integrate with CI/CD pipeline
- Add code coverage reporting

---

*Happy Testing! 🧪*