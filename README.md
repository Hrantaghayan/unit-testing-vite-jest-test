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

## 🚀 Getting Started Quick Guide

1. **Clone or download** this repository
2. **Choose a project** from the navigation commands above
3. **Install dependencies**: `npm install`
4. **Run tests**: `npm test`
5. **Start coding** and testing! 🧪

---

Happy Testing! 🚀

> *"Tests not only prevent bugs—they document and guide your code's behavior."*

---

## 📝 Additional Notes

- Each project folder contains its own `package.json` with specific test configurations
- Use `npm run test:watch` for continuous testing during development
- Check the individual project README files for specific instructions
- Don't forget to commit your test files alongside your code!
