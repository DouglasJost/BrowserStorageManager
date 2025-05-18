# 🗂️ BrowserStorageManager

![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![Jest](https://img.shields.io/badge/tested%20with-Jest-red.svg)

**Manage browser storage** using a unified JavaScript interface for working with `localStorage`, `sessionStorage`, and `IndexedDB`. This includes support for key-value management, switching between storage types, error handling, status messaging, Jest-based testing and use of a storage manager and wrappers for each storage type.

---

## 📑 Project Structure
```
BrowserStorageManager/
├── public/
│ └── index.html                  --> Application entrypoint
│ └── styles.css                  --> Styling for the UI
├── src/                            
│ └── storage/                     
│       └── storageWrapper.js     --> Promised-based storage wrappers for localStorage, sessionStorage, and IndexedDB
│ ├── app.js                      --> UI logic using jQuery + async/await
│ ├── appStorageManager.js        --> Middle layer that delegates to selected storage wrapper
├── tests/                      
│ ├── storageWrapper.test.js      --> Unit tests for storage wrapper logic
│ └── appStorageManager.test.js   --> Unit tests for AppStorageManager
├── jest.config.js                --> Jest configuration
├── jest.setup.js                 --> Global mocks for DOM and storage APIs
├── package.json                  --> NPM metadata and test script
├── package-lock.json             --> Exact versions of all installed dependencies and their sub-dependencies
└── Readme-Test.txt               --> Step-by-step guide for setting up and configuring Jest testing for application

```
---

## 🚀 Features

- Unified interface for `localStorage`, `sessionStorage`, and `IndexedDB`
- Switch storage type via dropdown (updates UI and data source)
- Storage type managed by appStorageManager.js
- Async/await design used by UI.  Promises used by storage wrappers.
- Modular architecture (separation of storage, middle-layer, and UI)
- jQuery-based UI for managing key/value pairs
- Tests written using Jest
- Clean separation of concerns and modular structure

---

## 🧪 Running the App

1. Open `index.html` in your browser
2. Use the dropdown to select a storage type:
   - Session Storage
   - Local Storage
   - IndexedDB
3. Enter a key and value and click `Set`
4. Use the buttons to `Get`, `Set`, `Remove`, or `Clear` entries
5. The UI dynamically updates and displays messages like **Saved successfully** or **Deleted**

---

## 🧪 Running Tests

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests

```bash
npm test
```

### 3. Example Test Output

```bash
PASS  tests/storageWrapper.test.js
PASS  tests/appStorageManager.test.js

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
```

--- 

## 🧠 Technologies Used

- JavaScript (ES6+)
- jQuery
- IndexedDB API
- localStorage / sessionStorage
- Jest (for unit testing)
- fake-indexeddb (for IndexedDB mocking)

---

## 📚 Key Design Notes

- storageWrapper.js defines Promise-based wrappers for each storage engine
- appStorageManager.js acts as a middle layer, selecting the appropriate engine
- app.js contains the UI logic using async/await and jQuery event handling
- Application maintains a clear separation of concerns
- Tests cover all methods in AppStorageManager and each storage wrapper

---

## 🙌 Acknowledgments

- jQuery CDN: https://code.jquery.com
- Fake IndexedDB: https://github.com/dumbmatter/fakeIndexedDB
- Jest Test Runner: https://jestjs.io/

---
