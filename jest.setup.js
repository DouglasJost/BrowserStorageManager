// jest.setup.js

class StorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store.hasOwnProperty(key) ? this.store[key] : null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  
    getAllKeys() {
      return Object.keys(this.store);
    }
  }
  
  // Mock localStorage and sessionStorage
  global.localStorage = new StorageMock();
  global.sessionStorage = new StorageMock();
  
  // IndexedDB support (optional — if you're using `fake-indexeddb` for tests)
  const { indexedDB, IDBKeyRange } = require('fake-indexeddb');
  global.indexedDB = indexedDB;
  global.IDBKeyRange = IDBKeyRange;
  