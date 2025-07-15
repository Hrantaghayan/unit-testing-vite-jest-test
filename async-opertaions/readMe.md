# 🧪 Async Testing Mastery: Callbacks, Promises & Async/Await

> **Complete guide to testing asynchronous JavaScript code with Vitest and Jest**

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Latest-yellow)](https://vitest.dev/)
[![Jest](https://img.shields.io/badge/Jest-Compatible-red)](https://jestjs.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-blue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [📁 Project Structure](#-project-structure)
- [🔄 Testing Async Patterns](#-testing-async-patterns)
  - [Testing Callbacks with `done`](#testing-callbacks-with-done)
  - [Testing Promises](#testing-promises)
  - [Testing Async/Await](#testing-asyncawait)
- [⚡ Framework Specific Features](#-framework-specific-features)
  - [Vitest Async Testing](#vitest-async-testing)
  - [Jest Async Testing](#jest-async-testing)
- [🚨 Common Pitfalls & Solutions](#-common-pitfalls--solutions)
- [✨ Best Practices](#-best-practices)
- [📚 Advanced Patterns](#-advanced-patterns)
- [🔧 Setup & Configuration](#-setup--configuration)
- [📖 Examples Repository](#-examples-repository)
- [🎣 Testing Hooks](#-testing-hooks)

---

## 🎯 Overview

This project demonstrates **professional testing strategies** for asynchronous JavaScript code across different patterns:

### 🎪 **What You'll Learn**
- ✅ **Callback Testing** - Master the `done` function and error handling
- ✅ **Promise Testing** - Modern approaches with `.resolves` and `.rejects`
- ✅ **Async/Await Testing** - Clean, readable async test patterns
- ✅ **Error Handling** - Proper exception management in async tests
- ✅ **Framework Differences** - Vitest vs Jest specific features
- ✅ **Performance** - Timeouts, parallel execution, and optimization

### 🛠️ **Technologies Covered**
- **Vitest** - Next-generation testing framework
- **Jest** - Popular JavaScript testing framework
- **JavaScript ES6+** - Modern async patterns
- **Node.js** - Runtime environment
- **JWT** - Real-world async example

---

## 📁 Project Structure

```
03-async-code-starting-project/
├── async/
│   ├── async-example.js      # 🔧 Async functions (callbacks & promises)
│   └── async-example.test.js # 🧪 Test implementations
├── package.json              # 📦 Dependencies & scripts
├── vitest.config.js          # ⚙️ Vitest configuration
├── jest.config.js            # ⚙️ Jest configuration
└── README.md                 # 📖 This comprehensive guide
```

---

## 🔄 Testing Async Patterns

### Testing Callbacks with `done`

The `done` function is **essential** for testing callback-based asynchronous code.

#### 🎯 **Basic Callback Testing**

```javascript
// ✅ CORRECT: Proper callback testing
describe("generateToken() - Callback Testing", () => {
  it("should generate a token with done callback", (done) => {
    const userEmail = "test@test.com";
    
    generateToken(userEmail, (err, token) => {
      try {
        expect(err).toBeNull();
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        done(); // ✅ Success signal
      } catch (error) {
        done(error); // ❌ Pass assertion error
      }
    });
  });
});
```

#### 🚨 **Why Try/Catch is Critical**

```javascript
// ❌ BAD: Without try/catch - Confusing errors
it("without try/catch - bad practice", (done) => {
  generateToken("test@test.com", (err, token) => {
    expect(token).toBe("wrong-value"); // Throws error
    done(); // This might still execute!
  });
});

// ✅ GOOD: With try/catch - Clear error messages
it("with try/catch - best practice", (done) => {
  generateToken("test@test.com", (err, token) => {
    try {
      expect(token).toBe("wrong-value");
      done();
    } catch (error) {
      done(error); // Clear, specific error message
    }
  });
});
```

#### 🎭 **Error Scenarios**

```javascript
describe("Error Handling in Callbacks", () => {
  it("should handle callback errors properly", (done) => {
    generateToken(null, (err, token) => {
      try {
        expect(err).toBeDefined();
        expect(token).toBeUndefined();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it("should timeout for unresponsive callbacks", (done) => {
    // Set custom timeout
    jest.setTimeout(5000); // Jest
    // or
    vi.setConfig({ testTimeout: 5000 }); // Vitest
    
    generateToken("test@test.com", (err, token) => {
      // If this callback never executes, test will timeout
      done();
    });
  });
});
```

---

### Testing Promises

Modern JavaScript heavily relies on Promises. Here's how to test them effectively:

#### 🎯 **Basic Promise Testing**

```javascript
describe("generateTokenPromise() - Promise Testing", () => {
  
  // ✅ METHOD 1: Async/Await (Recommended)
  it("should generate token with async/await", async () => {
    const userEmail = "test@test.com";
    const token = await generateTokenPromise(userEmail);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  // ✅ METHOD 2: Return Promise
  it("should generate token by returning promise", () => {
    const userEmail = "test@test.com";
    return generateTokenPromise(userEmail).then(token => {
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  // ✅ METHOD 3: Using .resolves matcher
  it("should generate token with resolves matcher", () => {
    const userEmail = "test@test.com";
    return expect(generateTokenPromise(userEmail)).resolves.toBeDefined();
  });
});
```

#### 🚨 **Promise Error Testing**

```javascript
describe("Promise Error Handling", () => {
  
  // ✅ Testing Promise Rejection with async/await
  it("should handle promise rejection with async/await", async () => {
    await expect(generateTokenPromise(null)).rejects.toThrow();
    
    // More specific error testing
    await expect(generateTokenPromise(null))
      .rejects
      .toThrow("Invalid email provided");
  });

  // ✅ Testing Promise Rejection with .catch()
  it("should handle promise rejection with catch", () => {
    return generateTokenPromise(null)
      .then(() => {
        throw new Error("Should have rejected");
      })
      .catch(error => {
        expect(error).toBeDefined();
        expect(error.message).toContain("Invalid");
      });
  });

  // ✅ Using .rejects matcher
  it("should reject with rejects matcher", () => {
    return expect(generateTokenPromise(null)).rejects.toThrow();
  });
});
```

---

### Testing Async/Await

The most modern and readable approach to async testing:

#### 🎯 **Basic Async/Await Testing**

```javascript
describe("Async/Await Testing Patterns", () => {
  
  it("should handle multiple async operations", async () => {
    const email1 = "user1@test.com";
    const email2 = "user2@test.com";
    
    // Sequential execution
    const token1 = await generateTokenPromise(email1);
    const token2 = await generateTokenPromise(email2);
    
    expect(token1).toBeDefined();
    expect(token2).toBeDefined();
    expect(token1).not.toBe(token2);
  });

  it("should handle parallel async operations", async () => {
    const emails = ["user1@test.com", "user2@test.com", "user3@test.com"];
    
    // Parallel execution with Promise.all
    const tokenPromises = emails.map(email => generateTokenPromise(email));
    const tokens = await Promise.all(tokenPromises);
    
    expect(tokens).toHaveLength(3);
    tokens.forEach(token => {
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  it("should handle async/await with error handling", async () => {
    try {
      await generateTokenPromise(null);
      fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain("Invalid");
    }
  });
});
```

#### 🎭 **Advanced Async/Await Patterns**

```javascript
describe("Advanced Async/Await Patterns", () => {
  
  it("should handle conditional async operations", async () => {
    const email = "test@test.com";
    let token;
    
    if (email.includes("@")) {
      token = await generateTokenPromise(email);
    } else {
      token = await generateTokenPromise("default@test.com");
    }
    
    expect(token).toBeDefined();
  });

  it("should handle async operations with timeouts", async () => {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), 5000)
    );
    
    const tokenPromise = generateTokenPromise("test@test.com");
    
    const token = await Promise.race([tokenPromise, timeout]);
    expect(token).toBeDefined();
  });

  it("should handle multiple async operations with some failures", async () => {
    const operations = [
      generateTokenPromise("valid@test.com"),
      generateTokenPromise(null), // This will fail
      generateTokenPromise("another@test.com")
    ];
    
    const results = await Promise.allSettled(operations);
    
    expect(results[0].status).toBe("fulfilled");
    expect(results[1].status).toBe("rejected");
    expect(results[2].status).toBe("fulfilled");
  });
});
```

---

## ⚡ Framework Specific Features

### Vitest Async Testing

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10000,    // Global timeout
    hookTimeout: 5000,     // Hook timeout
    teardownTimeout: 3000, // Teardown timeout
  },
});
```

```javascript
// Vitest-specific features
describe("Vitest Async Features", () => {
  
  it("should use vi.waitFor for polling", async () => {
    let tokenGenerated = false;
    
    generateTokenPromise("test@test.com").then(() => {
      tokenGenerated = true;
    });
    
    await vi.waitFor(() => {
      expect(tokenGenerated).toBe(true);
    });
  });

  it("should use vi.waitUntil for conditions", async () => {
    await vi.waitUntil(() => someAsyncCondition());
  });

  it("should mock timers in async tests", async () => {
    vi.useFakeTimers();
    
    const promise = new Promise(resolve => {
      setTimeout(() => resolve("done"), 1000);
    });
    
    vi.advanceTimersByTime(1000);
    const result = await promise;
    
    expect(result).toBe("done");
    vi.useRealTimers();
  });
});
```

### Jest Async Testing

```javascript
// jest.config.js
module.exports = {
  testTimeout: 10000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
```

```javascript
// Jest-specific features
describe("Jest Async Features", () => {
  
  it("should use jest.setTimeout for individual tests", async () => {
    jest.setTimeout(15000);
    
    const longRunningOperation = () => new Promise(resolve => {
      setTimeout(resolve, 12000);
    });
    
    await longRunningOperation();
  });

  it("should use jest.advanceTimersByTime", async () => {
    jest.useFakeTimers();
    
    const promise = new Promise(resolve => {
      setTimeout(() => resolve("completed"), 5000);
    });
    
    jest.advanceTimersByTime(5000);
    const result = await promise;
    
    expect(result).toBe("completed");
    jest.useRealTimers();
  });

  it("should handle async with custom matchers", async () => {
    const token = await generateTokenPromise("test@test.com");
    
    expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  });
});
```

---

## 🚨 Common Pitfalls & Solutions

### 1. **Mixing Async Patterns**

```javascript
// ❌ BAD: Mixing callbacks and promises
it("mixing patterns - bad", (done) => {
  generateTokenPromise("test@test.com")
    .then(token => {
      expect(token).toBeDefined();
      done(); // ❌ Unnecessary with promises
    });
});

// ✅ GOOD: Consistent async/await
it("consistent pattern - good", async () => {
  const token = await generateTokenPromise("test@test.com");
  expect(token).toBeDefined();
});
```

### 2. **Forgetting to Return Promises**

```javascript
// ❌ BAD: Promise not returned
it("promise not returned - bad", () => {
  generateTokenPromise("test@test.com")
    .then(token => {
      expect(token).toBeDefined();
    }); // ❌ Missing return
});

// ✅ GOOD: Promise returned
it("promise returned - good", () => {
  return generateTokenPromise("test@test.com")
    .then(token => {
      expect(token).toBeDefined();
    });
});
```

### 3. **Improper Error Handling**

```javascript
// ❌ BAD: Unhandled promise rejection
it("unhandled rejection - bad", async () => {
  await generateTokenPromise(null); // ❌ Will cause unhandled rejection
});

// ✅ GOOD: Proper error handling
it("proper error handling - good", async () => {
  await expect(generateTokenPromise(null)).rejects.toThrow();
});
```

### 4. **Done Function Misuse**

```javascript
// ❌ BAD: Using done with promises
it("done with promises - bad", (done) => {
  generateTokenPromise("test@test.com")
    .then(token => {
      expect(token).toBeDefined();
      done(); // ❌ Unnecessary complexity
    })
    .catch(done);
});

// ✅ GOOD: Pure async/await
it("pure async await - good", async () => {
  const token = await generateTokenPromise("test@test.com");
  expect(token).toBeDefined();
});
```

---

## ✨ Best Practices

### 🎯 **Testing Strategy**

```javascript
describe("Best Practices Demonstration", () => {
  
  // ✅ 1. Use descriptive test names
  it("should generate valid JWT token when provided with valid email address", async () => {
    const validEmail = "user@example.com";
    const token = await generateTokenPromise(validEmail);
    
    expect(token).toBeDefined();
    expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
  });

  // ✅ 2. Test both success and error scenarios
  it("should reject with specific error when email is null", async () => {
    await expect(generateTokenPromise(null))
      .rejects
      .toThrow("Email is required");
  });

  // ✅ 3. Use setup and teardown for consistency
  beforeEach(async () => {
    // Reset any global state
    await resetTokenCache();
  });

  afterEach(async () => {
    // Clean up after each test
    await clearTokenCache();
  });
});
```

### 🚀 **Performance Optimization**

```javascript
describe("Performance Optimized Tests", () => {
  
  // ✅ Parallel execution for independent tests
  it.concurrent("should handle multiple users concurrently", async () => {
    const users = Array.from({ length: 100 }, (_, i) => `user${i}@test.com`);
    const tokens = await Promise.all(
      users.map(user => generateTokenPromise(user))
    );
    
    expect(tokens).toHaveLength(100);
  });

  // ✅ Timeout handling for long operations
  it("should handle slow operations with timeout", async () => {
    const slowOperation = () => new Promise(resolve => 
      setTimeout(() => resolve("slow-result"), 8000)
    );
    
    const result = await Promise.race([
      slowOperation(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 5000)
      )
    ]);
    
    expect(result).toBe("slow-result");
  }, 10000); // 10 second timeout for this test
});
```

---

## 🎣 Testing Hooks

Testing hooks like `beforeAll`, `beforeEach`, `afterEach`, and `afterAll` are essential for setting up and tearing down test environments, managing shared state, and ensuring test isolation.

### � **How Testing Hooks Work**

Testing hooks provide a way to execute code at specific points in the test lifecycle:

1. **Test Suite Starts** → `beforeAll` runs once
2. **Before Each Test** → `beforeEach` runs
3. **Test Executes** → Your actual test runs
4. **After Each Test** → `afterEach` runs
5. **Test Suite Ends** → `afterAll` runs once

```
Test Suite: "User Management Tests"
│
├── beforeAll()           # Runs ONCE before all tests
│   └── Setup database, start server
│
├── Test 1: "should update email"
│   ├── beforeEach()      # Runs before this test
│   │   └── Create fresh user instance
│   ├── Test execution    # Your test code runs
│   └── afterEach()       # Runs after this test
│       └── Clean up user instance
│
├── Test 2: "should have email property"
│   ├── beforeEach()      # Runs before this test
│   │   └── Create fresh user instance
│   ├── Test execution    # Your test code runs
│   └── afterEach()       # Runs after this test
│       └── Clean up user instance
│
└── afterAll()            # Runs ONCE after all tests
    └── Close database, stop server
```

### �🔧 **Hook Types and Usage**

```javascript
import { beforeAll, beforeEach, afterEach, afterAll } from "vitest";

// 📝 What Each Hook Does:
// beforeAll()  - Runs ONCE before all tests start (expensive setup)
// beforeEach() - Runs before each individual test (fresh data, clean state)
// afterEach()  - Runs after each individual test (cleanup, reset mocks)
// afterAll()   - Runs ONCE after all tests finish (final cleanup)

describe("User Management Tests", () => {
  let testEmail;
  let user;

  // 🚀 Runs once before all tests in this file
  beforeAll(() => {
    console.log("Setting up test environment...");
       testEmail = "test@test.com";
    user = new User(testEmail);
  });

  // 🔄 Runs before each individual test
  beforeEach(() => {
    console.log("Preparing for individual test...");
    testEmail = "test@test.com";
    user = new User(testEmail);
  });

  // 🧹 Runs after each individual test
  afterEach(() => {
    console.log("Cleaning up after test...");
    // Reset user state
    testEmail = null;
    user = null;
  });

  // 🔚 Runs once after all tests in this file
  afterAll(() => {
    console.log("Tearing down test environment...");
    // Close database connections
    // Stop test servers
  });

  it("should update the email", () => {
    const newTestEmail = "test2@test.com";
    user.updateEmail(newTestEmail);
    expect(user.email).toBe(newTestEmail);
  });

  it("should have an email property", () => {
    expect(user).toHaveProperty("email");
  });
});
```

### 🎯 **Best Practices for Hooks**

- **beforeAll**: Use for expensive setup operations (database connections, server startup)
- **beforeEach**: Use for test data preparation and ensuring clean state
- **afterEach**: Use for cleanup to prevent test interference
- **afterAll**: Use for final cleanup (closing connections, stopping servers)

### 🚀 **Real-World Example: Database Testing**

```javascript
describe("User Database Operations", () => {
  let database;
  let testUser;

  beforeAll(async () => {
    console.log("🚀 Starting database connection...");
    database = await connectToDatabase();
    await database.createTestTables();
  });

  beforeEach(async () => {
    console.log("🔄 Preparing test data...");
    testUser = {
      id: generateId(),
      email: "test@example.com",
      name: "Test User"
    };
    await database.clearTestData();
  });

  afterEach(async () => {
    console.log("🧹 Cleaning up test data...");
    await database.clearTestData();
    testUser = null;
  });

  afterAll(async () => {
    console.log("🔚 Closing database connection...");
    await database.close();
  });

  it("should create a new user", async () => {
    const createdUser = await database.createUser(testUser);
    expect(createdUser.id).toBe(testUser.id);
    expect(createdUser.email).toBe(testUser.email);
  });

  it("should find user by email", async () => {
    await database.createUser(testUser);
    const foundUser = await database.findUserByEmail(testUser.email);
    expect(foundUser).toBeDefined();
    expect(foundUser.email).toBe(testUser.email);
  });
});
```

### 🔍 **Hook Execution Order with Nested Describes**

```javascript
describe("Outer describe", () => {
  beforeAll(() => console.log("1. Outer beforeAll"));
  beforeEach(() => console.log("2. Outer beforeEach"));
  afterEach(() => console.log("6. Outer afterEach"));
  afterAll(() => console.log("7. Outer afterAll"));

  describe("Inner describe", () => {
    beforeAll(() => console.log("3. Inner beforeAll"));
    beforeEach(() => console.log("4. Inner beforeEach"));
    afterEach(() => console.log("5. Inner afterEach"));
    afterAll(() => console.log("8. Inner afterAll"));

    it("should run test", () => {
      console.log("5. Test execution");
      expect(true).toBe(true);
    });
  });
});

// Output:
// 1. Outer beforeAll
// 2. Outer beforeEach
// 3. Inner beforeAll
// 4. Inner beforeEach
// 5. Test execution
// 5. Inner afterEach
// 6. Outer afterEach
// 7. Outer afterAll
// 8. Inner afterAll
```

### 🛠️ **Common Hook Patterns**

#### Pattern 1: Test Data Management
```javascript
describe("User Service", () => {
  let userService;
  let testUsers = [];

  beforeAll(() => {
    userService = new UserService();
  });

  beforeEach(() => {
    // Create fresh test data for each test
    testUsers = [
      { email: "user1@test.com", name: "User 1" },
      { email: "user2@test.com", name: "User 2" }
    ];
  });

  afterEach(() => {
    // Clean up after each test
    testUsers = [];
  });
});
```

#### Pattern 2: Mock Setup and Teardown
```javascript
describe("External API Tests", () => {
  beforeEach(() => {
    // Setup mocks before each test
    vi.mock('./api-client', () => ({
      fetchUserData: vi.fn(),
      updateUserData: vi.fn()
    }));
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
  });
});
```

#### Pattern 3: Environment Setup
```javascript
describe("Environment-specific Tests", () => {
  let originalEnv;

  beforeAll(() => {
    // Save original environment
    originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';
  });

  afterAll(() => {
    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });
});
```

### 🚨 **Hook Pitfalls to Avoid**

#### ❌ **Don't: Modify shared state without cleanup**
```javascript
describe("Bad Hook Usage", () => {
  let sharedData = [];

  beforeEach(() => {
    sharedData.push("new data"); // ❌ This accumulates across tests
  });

  // Tests will interfere with each other
});
```

#### ✅ **Do: Always clean up shared state**
```javascript
describe("Good Hook Usage", () => {
  let sharedData = [];

  beforeEach(() => {
    sharedData = []; // ✅ Reset to clean state
    sharedData.push("new data");
  });

  afterEach(() => {
    sharedData = []; // ✅ Additional cleanup
  });
});
```

### ⚡ **Async Hooks**

Hooks can be asynchronous to handle async setup and teardown operations:

```javascript
describe("Async Hook Examples", () => {
  let server;
  let database;

  beforeAll(async () => {
    console.log("🔄 Starting async setup...");
    
    // Start database connection
    database = await connectToDatabase();
    
    // Start test server
    server = await startTestServer();
    
    // Wait for server to be ready
    await waitForServer(server);
    
    console.log("✅ Async setup complete!");
  });

  beforeEach(async () => {
    // Reset database state before each test
    await database.clearAll();
    await database.seedTestData();
  });

  afterEach(async () => {
    // Clean up after each test
    await database.clearAll();
  });

  afterAll(async () => {
    console.log("🔄 Starting async teardown...");
    
    // Close database connection
    if (database) {
      await database.close();
    }
    
    // Stop test server
    if (server) {
      await server.close();
    }
    
    console.log("✅ Async teardown complete!");
  });

  it("should handle async operations", async () => {
    const response = await fetch(`${server.url}/api/users`);
    expect(response.status).toBe(200);
  });
});
```

### 🔧 **Hook Error Handling**

```javascript
describe("Hook Error Handling", () => {
  beforeAll(async () => {
    try {
      await expensiveSetup();
    } catch (error) {
      console.error("Setup failed:", error);
      throw error; // This will skip all tests in this suite
    }
  });

  beforeEach(async () => {
    try {
      await prepareTestData();
    } catch (error) {
      console.error("Test preparation failed:", error);
      throw error; // This will skip the current test
    }
  });

  afterEach(async () => {
    try {
      await cleanupTestData();
    } catch (error) {
      console.error("Cleanup failed:", error);
      // Don't throw here - let other tests continue
    }
  });

  afterAll(async () => {
    try {
      await teardownResources();
    } catch (error) {
      console.error("Teardown failed:", error);
      // Log but don't throw to prevent hanging
    }
  });
});
```

### 📊 **Performance Considerations**

```javascript
describe("Performance-Optimized Hooks", () => {
  // ✅ Expensive operations in beforeAll (runs once)
  beforeAll(async () => {
    await startDatabase();        // Expensive
    await loadConfiguration();    // Expensive
    await initializeCache();      // Expensive
  });

  // ✅ Quick operations in beforeEach (runs per test)
  beforeEach(() => {
    resetCounters();              // Quick
    clearTestFlags();             // Quick
    generateTestId();             // Quick
  });

  // ✅ Cleanup in afterEach (runs per test)
  afterEach(() => {
    clearTestData();              // Quick
    resetMocks();                 // Quick
  });

  // ✅ Expensive cleanup in afterAll (runs once)
  afterAll(async () => {
    await stopDatabase();         // Expensive
    await clearCache();           // Expensive
    await saveTestResults();      // Expensive
  });
});
```

### 🎯 **Hook Best Practices Summary**

1. **Use beforeAll for expensive setup** - Database connections, server startup
2. **Use beforeEach for test isolation** - Fresh data, reset state  
3. **Use afterEach for cleanup** - Prevent test interference
4. **Use afterAll for final cleanup** - Close connections, stop servers
5. **Handle async operations properly** - Use async/await in hooks
6. **Add error handling** - Prevent hanging tests
7. **Keep hooks focused** - One responsibility per hook
8. **Document complex setup** - Add comments explaining why

### 🔍 **Debugging Hook Issues**

```javascript
describe("Debug Hook Execution", () => {
  beforeAll(() => {
    console.log("🚀 beforeAll: Suite starting");
  });

  beforeEach(() => {
    console.log("🔄 beforeEach: Test starting");
  });

  afterEach(() => {
    console.log("🧹 afterEach: Test finished");
  });

  afterAll(() => {
    console.log("🔚 afterAll: Suite finished");
  });

  it("first test", () => {
    console.log("📝 Test 1 executing");
    expect(true).toBe(true);
  });

  it("second test", () => {
    console.log("📝 Test 2 executing");
    expect(true).toBe(true);
  });
});

// Output:
// 🚀 beforeAll: Suite starting
// 🔄 beforeEach: Test starting
// 📝 Test 1 executing  
// 🧹 afterEach: Test finished
// 🔄 beforeEach: Test starting
// 📝 Test 2 executing
// 🧹 afterEach: Test finished
// 🔚 afterAll: Suite finished
```

### 🚀 **Concurrent Testing**

Concurrent testing allows multiple tests to run simultaneously, significantly improving test execution speed. This is especially useful for independent tests that don't share state.

#### 🔧 **Basic Concurrent Testing**

```javascript
describe("Concurrent Test Examples", () => {
  
  // ✅ Individual concurrent test
  it.concurrent("should process user 1", async () => {
    const token = await generateTokenPromise("user1@test.com");
    expect(token).toBeDefined();
  });

  it.concurrent("should process user 2", async () => {
    const token = await generateTokenPromise("user2@test.com");
    expect(token).toBeDefined();
  });

  it.concurrent("should process user 3", async () => {
    const token = await generateTokenPromise("user3@test.com");
    expect(token).toBeDefined();
  });
});
```

#### 🎯 **Concurrent Test Suites**

```javascript
// Run entire describe block concurrently
describe.concurrent("User Authentication Tests", () => {
  
  it("should authenticate with email", async () => {
    const result = await authenticateUser("test@test.com", "password");
    expect(result.success).toBe(true);
  });

  it("should validate JWT token", async () => {
    const token = await generateTokenPromise("test@test.com");
    const isValid = await validateToken(token);
    expect(isValid).toBe(true);
  });

  it("should handle token expiration", async () => {
    const expiredToken = await generateExpiredToken();
    const isValid = await validateToken(expiredToken);
    expect(isValid).toBe(false);
  });
});
```

#### ⚡ **Performance Comparison**

```javascript
describe("Performance Testing", () => {
  
  // ❌ Sequential execution (slower)
  it("should process 100 users sequentially", async () => {
    const startTime = Date.now();
    
    for (let i = 0; i < 100; i++) {
      await generateTokenPromise(`user${i}@test.com`);
    }
    
    const endTime = Date.now();
    console.log(`Sequential: ${endTime - startTime}ms`);
  });

  // ✅ Concurrent execution (faster)
  it.concurrent("should process 100 users concurrently", async () => {
    const startTime = Date.now();
    
    const promises = Array.from({ length: 100 }, (_, i) => 
      generateTokenPromise(`user${i}@test.com`)
    );
    
    await Promise.all(promises);
    
    const endTime = Date.now();
    console.log(`Concurrent: ${endTime - startTime}ms`);
  });
});
```

#### 🛠️ **Concurrent Testing with Hooks**

```javascript
describe.concurrent("Concurrent with Hooks", () => {
  let testData;

  beforeEach(async () => {
    // This runs before each concurrent test
    testData = await setupTestData();
  });

  afterEach(async () => {
    // This runs after each concurrent test
    await cleanupTestData(testData);
  });

  it("should handle concurrent user creation", async () => {
    const user = await createUser(testData);
    expect(user.id).toBeDefined();
  });

  it("should handle concurrent token generation", async () => {
    const token = await generateTokenPromise(testData.email);
    expect(token).toBeDefined();
  });
});
```

#### 🚨 **When NOT to Use Concurrent Testing**

```javascript
describe("Avoid Concurrent for Shared State", () => {
  let sharedCounter = 0;

  // ❌ BAD: These tests will interfere with each other
  it.concurrent("should increment counter", async () => {
    sharedCounter++;
    await someAsyncOperation();
    expect(sharedCounter).toBe(1); // This might fail!
  });

  it.concurrent("should double counter", async () => {
    sharedCounter *= 2;
    await someAsyncOperation();
    expect(sharedCounter).toBe(2); // This might fail!
  });
});
```

#### ✅ **Best Practices for Concurrent Testing**

```javascript
describe("Concurrent Best Practices", () => {
  
  // ✅ GOOD: Independent tests with no shared state
  it.concurrent("should validate email format", async () => {
    const isValid = await validateEmail("test@test.com");
    expect(isValid).toBe(true);
  });

  it.concurrent("should hash password", async () => {
    const hash = await hashPassword("password123");
    expect(hash).toBeDefined();
    expect(hash).not.toBe("password123");
  });

  it.concurrent("should generate unique ID", async () => {
    const id = await generateUniqueId();
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
  });
});
```

#### 🔧 **Configuration for Concurrent Testing**

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Maximum number of concurrent tests
    maxConcurrency: 10,
    
    // Pool configuration for concurrent execution
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 2,
        maxThreads: 8,
      },
    },
    
    // Timeout for concurrent tests
    testTimeout: 30000,
  },
});
```

#### 📊 **Monitoring Concurrent Test Performance**

```javascript
describe("Performance Monitoring", () => {
  
  it.concurrent("should track execution time", async () => {
    const startTime = performance.now();
    
    await Promise.all([
      generateTokenPromise("user1@test.com"),
      generateTokenPromise("user2@test.com"),
      generateTokenPromise("user3@test.com")
    ]);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    console.log(`Concurrent execution time: ${executionTime}ms`);
    expect(executionTime).toBeLessThan(5000); // Should complete in under 5 seconds
  });
});
```

#### 🎯 **Concurrent Testing Summary**

- **Use `it.concurrent()`** for independent async tests
- **Use `describe.concurrent()`** for entire test suites  
- **Avoid shared state** between concurrent tests
- **Configure maxConcurrency** to optimize performance
- **Monitor execution time** to ensure benefits
- **Use Promise.all()** for batch operations within tests

---

## 📚 Advanced Patterns

### 🎭 **Mocking Async Operations**

```javascript
// Mock implementation
vi.mock('./async-example.js', () => ({
  generateTokenPromise: vi.fn(),
  generateToken: vi.fn(),
}));

describe("Mocked Async Operations", () => {
  
  it("should mock promise resolution", async () => {
    const mockToken = "mocked-jwt-token";
    generateTokenPromise.mockResolvedValue(mockToken);
    
    const token = await generateTokenPromise("test@test.com");
    expect(token).toBe(mockToken);
  });

  it("should mock promise rejection", async () => {
    const mockError = new Error("Mocked error");
    generateTokenPromise.mockRejectedValue(mockError);
    
    await expect(generateTokenPromise("test@test.com"))
      .rejects
      .toThrow("Mocked error");
  });

  it("should mock callback function", (done) => {
    const mockToken = "mocked-callback-token";
    generateToken.mockImplementation((email, callback) => {
      callback(null, mockToken);
    });
    
    generateToken("test@test.com", (err, token) => {
      try {
        expect(token).toBe(mockToken);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
```

### 🔄 **Retry Logic Testing**

```javascript
describe("Retry Logic", () => {
  
  const retryTokenGeneration = async (email, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await generateTokenPromise(email);
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  it("should retry failed operations", async () => {
    let attempts = 0;
    
    generateTokenPromise.mockImplementation(() => {
      attempts++;
      if (attempts < 3) {
        return Promise.reject(new Error("Temporary failure"));
      }
      return Promise.resolve("success-token");
    });
    
    const token = await retryTokenGeneration("test@test.com");
    expect(token).toBe("success-token");
    expect(attempts).toBe(3);
  });
});
```

---

## 🔧 Setup & Configuration

### Vitest Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    hookTimeout: 5000,
    teardownTimeout: 3000,
    maxConcurrency: 10,
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 2,
        maxThreads: 8,
      },
    },
  },
});
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000,
  maxWorkers: 4,
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'async/**/*.js',
    '!**/*.test.js',
  ],
};
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:jest": "jest",
    "test:jest:watch": "jest --watch",
    "test:jest:coverage": "jest --coverage"
  }
}
```

---

## 📖 Examples Repository

### Running Tests

```bash
# Install dependencies
npm install

# Run all tests with Vitest
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with Jest
npm run test:jest

# Run specific test file
npm test async-example.test.js
```

### Project Commands

```bash
# Initialize new project
npm init -y

# Install Vitest
npm install -D vitest

# Install Jest
npm install -D jest

# Install additional testing utilities
npm install -D @vitest/ui @vitest/coverage-c8

# Run tests in different modes
npm test -- --reporter=verbose
npm test -- --bail
npm test -- --run
```

---

## 🎓 Summary

This comprehensive guide covers:

- ✅ **Callback Testing** with proper `done` usage and error handling
- ✅ **Promise Testing** with multiple approaches and error scenarios
- ✅ **Async/Await Testing** with modern, readable patterns
- ✅ **Framework Differences** between Vitest and Jest
- ✅ **Best Practices** for maintainable async tests
- ✅ **Common Pitfalls** and how to avoid them
- ✅ **Advanced Patterns** for complex scenarios
- ✅ **Performance Optimization** techniques

### 🚀 **Next Steps**

1. **Practice** with the provided examples
2. **Experiment** with different async patterns
3. **Implement** these patterns in your projects
4. **Share** your learnings with the community

---

**🎉 Happy Testing!**

*Master async testing and write more reliable JavaScript applications!*
generateToken('user@example.com', (err, token) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Token:', token);
  }
});
```

**Pros:**
- Simple and straightforward
- Widely supported
- Easy to understand

**Cons:**
- Can lead to "callback hell"
- Error handling can be cumbersome
- Difficult to compose multiple async operations

### 2. Promise Pattern

A more modern approach using Promise objects:

```javascript
function generateTokenPromise(userEmail) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, "secret123", (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

// Usage
generateTokenPromise('user@example.com')
  .then(token => console.log('Token:', token))
  .catch(err => console.error('Error:', err));
```

**Pros:**
- Better error handling with `.catch()`
- Chainable with `.then()`
- Avoids callback hell
- Better composition of async operations

**Cons:**
- Still requires understanding of Promise mechanics
- Can become complex with nested chains

### 3. Async/Await Pattern

The most modern and readable approach:

```javascript
async function getTokenAsync(userEmail) {
  try {
    const token = await generateTokenPromise(userEmail);
    console.log('Token:', token);
    return token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
async function main() {
  try {
    const token = await getTokenAsync('user@example.com');
    // Use token...
  } catch (error) {
    // Handle error...
  }
}
```

**Pros:**
- Most readable and intuitive
- Synchronous-like syntax
- Excellent error handling with try/catch
- Easy to debug

**Cons:**
- Requires understanding of async/await
- Must be used within async functions

## 🚦 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd 03-async-code-starting-project

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🧪 Testing Async Code

Testing asynchronous code requires special handling to ensure tests wait for async operations to complete.

### Testing Callbacks

```javascript
it("should generate a token with the provided email", (done) => {
  const userEmail = "test@test.com";
  generateToken(userEmail, (err, token) => {
    expect(token).toBeDefined();
    expect(err).toBeNull();
    done(); // Signal that the async test is complete
  });
});
```

### Testing Promises

```javascript
it("should generate a token promise", async () => {
  const userEmail = "test@test.com";
  const token = await generateTokenPromise(userEmail);
  
  expect(token).toBeDefined();
  expect(typeof token).toBe('string');
});

// Or using .resolves matcher
it("should generate a token promise", () => {
  const userEmail = "test@test.com";
  return expect(generateTokenPromise(userEmail)).resolves.toBeDefined();
});
```

### Testing Error Scenarios

```javascript
it("should handle errors in token generation", async () => {
  const invalidEmail = null;
  
  await expect(generateTokenPromise(invalidEmail))
    .rejects
    .toThrow();
});
```

## ✨ Best Practices

### 1. **Always Handle Errors**
```javascript
// ❌ Bad: Unhandled promise rejection
generateTokenPromise(email);

// ✅ Good: Proper error handling
generateTokenPromise(email)
  .catch(error => console.error('Token generation failed:', error));
```

### 2. **Use Async/Await for Readability**
```javascript
// ❌ Less readable: Promise chains
function processUser(email) {
  return generateTokenPromise(email)
    .then(token => validateToken(token))
    .then(validToken => saveToken(validToken))
    .catch(error => handleError(error));
}

// ✅ More readable: Async/await
async function processUser(email) {
  try {
    const token = await generateTokenPromise(email);
    const validToken = await validateToken(token);
    const result = await saveToken(validToken);
    return result;
  } catch (error) {
    handleError(error);
  }
}
```

### 3. **Use Promise.all() for Parallel Operations**
```javascript
// ❌ Sequential execution (slower)
async function processMultipleUsers(emails) {
  const tokens = [];
  for (const email of emails) {
    const token = await generateTokenPromise(email);
    tokens.push(token);
  }
  return tokens;
}

// ✅ Parallel execution (faster)
async function processMultipleUsers(emails) {
  const tokenPromises = emails.map(email => generateTokenPromise(email));
  return Promise.all(tokenPromises);
}
```

### 4. **Set Timeouts for Long-Running Operations**
```javascript
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), ms)
    )
  ]);
}

// Usage
const tokenWithTimeout = await withTimeout(
  generateTokenPromise(email), 
  5000 // 5 seconds
);
```

## ⚠️ Common Pitfalls

### 1. **Forgetting to Return Promises**
```javascript
// ❌ Bad: Promise not returned
function processData() {
  generateTokenPromise(email)
    .then(token => console.log(token));
}

// ✅ Good: Promise returned
function processData() {
  return generateTokenPromise(email)
    .then(token => console.log(token));
}
```

### 2. **Not Handling Rejections**
```javascript
// ❌ Bad: Unhandled promise rejection
generateTokenPromise(email)
  .then(token => console.log(token));

// ✅ Good: Proper error handling
generateTokenPromise(email)
  .then(token => console.log(token))
  .catch(error => console.error(error));
```

### 3. **Mixing Async Patterns**
```javascript
// ❌ Bad: Mixing callbacks and promises
async function badExample() {
  generateToken(email, (err, token) => {
    if (err) throw err; // This won't work as expected
    return token;
  });
}

// ✅ Good: Consistent async pattern
async function goodExample() {
  try {
    const token = await generateTokenPromise(email);
    return token;
  } catch (error) {
    throw error;
  }
}
```

## 📚 Examples

### Basic Token Generation
```javascript
import { generateToken, generateTokenPromise } from './async/async-example.js';

// Using callbacks
generateToken('user@example.com', (err, token) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Generated token:', token);
  }
});

// Using promises
generateTokenPromise('user@example.com')
  .then(token => console.log('Generated token:', token))
  .catch(error => console.error('Error:', error));

// Using async/await
async function createToken() {
  try {
    const token = await generateTokenPromise('user@example.com');
    console.log('Generated token:', token);
    return token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Batch Processing
```javascript
async function generateTokensForUsers(emails) {
  try {
    const tokens = await Promise.all(
      emails.map(email => generateTokenPromise(email))
    );
    
    console.log(`Generated ${tokens.length} tokens`);
    return tokens;
  } catch (error) {
    console.error('Batch token generation failed:', error);
    throw error;
  }
}

// Usage
const userEmails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];
generateTokensForUsers(userEmails)
  .then(tokens => console.log('All tokens:', tokens))
  .catch(error => console.error('Failed to generate tokens:', error));
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **JavaScript ES6+** - Modern JavaScript features
- **JWT (jsonwebtoken)** - JSON Web Token implementation
- **Vitest** - Fast testing framework
- **ES Modules** - Modern module system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📖 Further Reading

- [MDN Web Docs: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [JavaScript Promises: An Introduction](https://developers.google.com/web/fundamentals/primers/promises)
- [Async/Await Tutorial](https://javascript.info/async-await)
- [Testing Async JavaScript](https://jestjs.io/docs/asynchronous)

---

**Happy coding! 🎉**