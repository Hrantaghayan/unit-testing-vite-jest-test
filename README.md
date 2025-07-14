# JavaScript Unit Testing - The Practical Guide

Welcome to the official code repository for [JavaScript Unit Testing - The Practical Guide](https://acad.link/testing) by Maximilian Schwarzmüller.

This repository contains code snapshots, slides, and supporting materials to help you learn and master JavaScript unit testing using modern tools like **Vitest** and **Jest**.

> **Important:** These materials are for personal educational use only. Redistribution is not permitted.

---

## 📁 Repository Structure

Each course section corresponds to a separate **branch** in this repository.

* Example: The branch `03-basics` contains all the materials for Section 3 of the course.
* Use the branch dropdown at the top-left of this GitHub page to switch between course sections.

### 🔹 Inside Each Branch

* `/code`: Contains subfolders with code snapshots for that section
* `/slides`: Contains PDF slides (if used in that section)
* `/extra-files`: Contains starter or supporting files for projects

---

## 🧪 Using Code Snapshots

Snapshots in the `/code` folder help you:

* Follow along with lessons
* Debug your code
* Compare your implementation to the instructor's

### How to Use:

1. Click the green **Code** button to download or clone the branch.
2. Navigate into a snapshot folder (e.g. `01-starting-project`).
3. Run the project:

   ```bash
   npm install
   npm test
   ```

---

## ⚙️ Testing Framework: Vitest vs Jest

| Feature       | **Vitest**            | **Jest**                 |
| ------------- | --------------------- | ------------------------ |
| Speed         | 🚀 Lightning fast     | ✅ Stable                 |
| ES Modules    | ✅ Native support      | ⚠️ Extra setup needed    |
| Compatibility | ✅ Jest API-compatible | 🔷 Industry standard     |
| Best for      | New, modern apps      | Existing/mature projects |

> This course uses **Vitest** as the primary framework.

---

## 🧾 `test` vs `it`

Both `test` and `it` are interchangeable and behave identically.

### ✍️ Example:

```js
it("should calculate the sum of an array", () => {
  expect(add([1, 2, 3])).toBe(6);
});

test("should calculate the sum of an array", () => {
  expect(add([1, 2, 3])).toBe(6);
});
```

* `it` ➝ Reads like natural language (common in BDD)
* `test` ➝ More explicit and direct

✅ **Choose one and be consistent.**

---

## 📣 Verbose Mode in Testing

Add `--reporter verbose` for detailed test outputs:

```bash
npm test -- --reporter verbose
```

### 🔍 Why Use It?

* See each test's name and status
* Identify failures quickly
* Get more helpful debugging info

---

## 👀 Watch Mode

Run tests automatically when code changes:

```bash
npm run test:watch
# or
npx vitest
```

### ⌨️ Watch Mode Shortcuts

| Key | Action                     |
| --- | -------------------------- |
| `q` | Quit watch mode            |
| `r` | Re-run all tests           |
| `f` | Run failed tests only      |
| `p` | Filter by filename pattern |

Ideal for **Test-Driven Development (TDD)** and real-time feedback!

---

## 🔁 Vitest vs Jest Compatibility

Vitest maintains compatibility with Jest:

### ✅ Shared Features

* `describe`, `test`, `it`
* `expect(...).toBe()`, `toEqual()`, `toThrow()`, etc.
* Lifecycle hooks: `beforeAll`, `afterEach`, etc.
* Mocks: `vi.fn()` vs `jest.fn()`

### 🛠 Differences

* Vitest uses `vi` instead of `jest`
* Configuration is in `vite.config.js` or `vitest.config.js`

✅ **Easy migration** for existing Jest projects.

---

## ✅ Common Test Matchers

### ✔️ Existence & Truthiness

```js
expect(value).toBeDefined();
expect(value).toBeUndefined();
expect(value).toBeNull();
expect(value).toBeTruthy();
expect(value).toBeFalsy();
```

### 🔢 Value Comparison

```js
expect(5).toBe(5);              // Exact match
expect({a: 1}).toEqual({a: 1}); // Deep equality
expect(10).toBeGreaterThan(5);
expect(0.3).toBeCloseTo(0.1 + 0.2); // Floating point
```

### 📦 Arrays & Strings

```js
expect([1, 2, 3]).toContain(2);
expect("hello world").toMatch(/hello/);
```

### ⚠️ Errors & Functions

```js
expect(() => badFunc()).toThrow();
expect(() => badFunc()).toThrow("Some error message");
```

---

## 🧩 Scripts in `package.json`

```json
{
  "scripts": {
    "test": "vitest --run --reporter verbose",
    "test:watch": "vitest",
    "test:silent": "vitest --run --reporter basic",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 🎓 Learning Resources

📚 [Official Course Page](https://acad.link/testing)  
📘 [Vitest Docs](https://vitest.dev)  
📘 [Jest Docs](https://jestjs.io)

---

## 🗂️ Project Structure & Details

This repository contains **three distinct testing projects**, each demonstrating different aspects of JavaScript unit testing:

### 🎨 Frontend Testing Project (`basic-testing-frontend`)
A **browser-based testing environment** using Vitest with DOM testing capabilities.

**📁 Structure:**
```
basic-testing-frontend/
├── index.html          # Web interface for manual testing
├── app.js              # Main application entry point
├── package.json        # Project dependencies & scripts
└── src/
    ├── math.js         # Core math functions (add, etc.)
    ├── math.test.js    # Math function tests
    ├── parser.js       # Input parsing utilities
    └── util/
        ├── numbers.js      # Number utility functions
        ├── numbers.test.js # Number utility tests
        ├── validation.js   # Input validation functions
        └── validation.test.js # Validation tests
```

**🚀 Available Scripts:**
- `npm test` - Run all tests with verbose output
- `npm run test:watch` - Run tests in watch mode
- `npm start` - Start local development server (`http-server`)

**🔧 Key Features:**
- Vitest testing framework
- ES Modules support
- Browser debugging with `debugger` statements
- Live development server
- DOM-based testing capabilities

### 🔧 Node.js Testing Project (`basic-testing-nodejs`)
A **server-side testing environment** using traditional Node.js modules.

**🎯 Focus Areas:**
- CommonJS module system
- Server-side logic testing
- Node.js specific testing patterns

### 📦 ES Modules Testing Project (`basic-testing-nodejs-esmodules`)
A **modern Node.js environment** with full ES Modules support.

**🎯 Focus Areas:**
- Modern ES Modules syntax
- Import/Export statements
- Latest JavaScript features

---

## 🗂️ Quick Navigation Commands

To quickly navigate to the three main project directories in this repository:

### 🎨 Frontend Testing Project
```bash
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-frontend"
```

### 🔧 Node.js Testing Project  
```bash
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs"
```

### 📦 ES Modules Testing Project
```bash
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs-esmodules"
```

### ⚡ PowerShell Shortcuts
Create these functions in your PowerShell profile (`$PROFILE`) for instant navigation:

```powershell
function goto-frontend { 
    Set-Location "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-frontend" 
}

function goto-nodejs { 
    Set-Location "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs" 
}

function goto-esmodules { 
    Set-Location "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs-esmodules" 
}
```

Then simply use:
- `goto-frontend`
- `goto-nodejs` 
- `goto-esmodules`

### 📁 Relative Paths
If you're already in the `unit_tets` directory:

```bash
cd "code\basic-testing-frontend"
cd "code\basic-testing-nodejs"  
cd "code\basic-testing-nodejs-esmodules"
```

---

---

## 🧪 Testing Patterns & Examples

### 📝 Test Structure (AAA Pattern)
All tests follow the **Arrange-Act-Assert** pattern:

```javascript
it("should add numbers correctly", () => {
  // 🔧 Arrange - Set up test data
  const numbers = [1, 2, 3];
  
  // ⚡ Act - Execute the function
  const result = add(numbers);
  
  // ✅ Assert - Verify the result
  expect(result).toBe(6);
});
```

### 🎯 Key Testing Concepts Covered

**🔢 Math Functions (`math.js`)**
- Array processing and summation
- Number conversion and validation
- Edge cases (empty arrays, invalid inputs)

**✅ Validation Functions (`validation.js`)**
- String validation (empty, whitespace)
- Number validation (NaN, type checking)
- Error throwing and handling

**🔧 Utility Functions (`numbers.js`)**
- Number formatting and parsing
- Data transformation
- Complex business logic

### 🐛 Debugging Features

**Frontend Project includes debugging tools:**
- `debugger` statements for browser debugging
- Development server for live testing
- Browser DevTools integration

### 📊 Test Coverage Areas

- **Unit Tests**: Individual function testing
- **Integration Tests**: Component interaction
- **Error Handling**: Exception scenarios
- **Edge Cases**: Boundary conditions

---

## 💡 Best Practices Demonstrated

✅ **Clear Test Descriptions** - Tests read like specifications  
✅ **Single Responsibility** - One assertion per test  
✅ **Test Isolation** - No dependencies between tests  
✅ **Edge Case Coverage** - Testing boundary conditions  
✅ **Error Scenarios** - Testing failure paths  
✅ **Descriptive Assertions** - Clear expectation messages  

---

## 🚀 Getting Started Quick Guide

### 🎯 For Frontend Testing Project:
```bash
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-frontend"
npm install
npm test                 # Run all tests
npm run test:watch      # Watch mode for development
npm start               # Start development server (http://localhost:8080)
```

### 🎯 For Node.js Testing Projects:
```bash
# Traditional Node.js
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs"
npm install && npm test

# ES Modules Node.js  
cd "c:\Users\Asus\Desktop\unit_tets\code\basic-testing-nodejs-esmodules"
npm install && npm test
```

### 🔍 Explore the Code:
1. **Start with tests** - Look at `*.test.js` files to understand expected behavior
2. **Examine source code** - Check corresponding `*.js` files for implementation
3. **Run in watch mode** - Use `npm run test:watch` for real-time feedback
4. **Try the frontend** - Open `http://localhost:8080` after `npm start`

### 🧪 Experiment:
- Modify tests and see them fail/pass
- Add new test cases for edge scenarios  
- Try breaking the code to see test failures
- Use browser debugger in frontend project

---

## 📋 Development Workflow

### 🔄 Recommended Testing Workflow:
1. **Write failing test** (Red) ❌
2. **Write minimal code** to pass (Green) ✅  
3. **Refactor and improve** (Refactor) 🔄
4. **Repeat** for next feature

### 🛠️ Tools & Commands:
```bash
# Test specific files
npm test math.test.js

# Coverage report  
npm run test:coverage

# Debug mode (Frontend)
npm start  # Then use browser DevTools

# Watch specific pattern
npm run test:watch -- validation
```

---

Happy Testing! 🚀

> *"Tests not only prevent bugs—they document and guide your code's behavior."*

---

## 📝 Additional Notes

- Each project folder contains its own `package.json` with specific test configurations
- Use `npm run test:watch` for continuous testing during development
- Check the individual project README files for specific instructions
- Don't forget to commit your test files alongside your code!

---

## 🔧 Troubleshooting

### Common Issues & Solutions:

**❌ "Module not found" errors**
```bash
# Ensure you're in the correct directory
pwd  # Should show the project folder
npm install  # Reinstall dependencies
```

**❌ Tests not running**
```bash
# Check Node.js version (should be 14+)
node --version
npm --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**❌ Frontend server not starting**
```bash
# Check if port 8080 is available
netstat -an | findstr 8080

# Try different port
npx http-server -p 3000 -c-1
```

**❌ Debugger not working in browser**
- Open browser DevTools (F12)
- Go to Sources tab
- Look for your files under localhost:8080
- Set breakpoints or use existing `debugger` statements

### 💭 Learning Tips:

- **Start Small**: Begin with simple math tests
- **Read Tests First**: Understand what the code should do
- **Experiment**: Break things to understand how they work
- **Use Console**: Add `console.log()` for debugging
- **Ask Questions**: Comment your learning process

---

## 🎓 What You'll Learn

### 🧠 Testing Fundamentals:
- Writing effective unit tests
- Test-driven development (TDD)
- Assertion techniques
- Mock functions and testing doubles

### 🛠️ Tools Mastery:
- Vitest framework configuration
- Watch mode and live testing
- Browser debugging techniques
- Command line testing tools

### 📚 JavaScript Skills:
- ES Modules vs CommonJS
- Error handling patterns
- Function composition
- Data validation techniques

### 🚀 Best Practices:
- Test organization and structure
- Naming conventions
- Code coverage interpretation
- Continuous integration basics
