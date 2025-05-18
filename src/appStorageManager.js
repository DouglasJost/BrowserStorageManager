
// Only export in Node.js environment (e.g., for Jest tests)
if (typeof module !== 'undefined' && typeof require !== 'undefined') {
  const {
    localStorageWrapper,
    sessionStorageWrapper,
    indexedDBWrapper
  } = require('./storage/storageWrapper');

  // Attach to global scope for use below (optional)
  global.localStorageWrapper = localStorageWrapper;
  global.sessionStorageWrapper = sessionStorageWrapper;
  global.indexedDBWrapper = indexedDBWrapper;
}


const AppStorageManager = {
    current: sessionStorageWrapper,
    storageDisplayType: 'Session',

    // Default storage type is Session
    setStorageType(type) {
      switch (type) {
        case 'localStorage':
          this.current = localStorageWrapper;
          this.storageDisplayType = 'Local';
          break;
        case 'indexedDB':
          this.current = indexedDBWrapper;
          this.storageDisplayType = 'IndexedDB';
          break;
        case 'sessionStorage':
        default:
          this.current = sessionStorageWrapper;
          this.storageDisplayType = 'Session';
          break;
      }
    },

    getItem(key) {
      return this.current.getItem(key);
    },
  
    setItem(key, value) {
      return this.current.setItem(key, value);
    },
  
    removeItem(key) {
      return this.current.removeItem(key);
    },
  
    clear() {
      return this.current.clear();
    },
  
    getAllKeys() {
      return this.current.getAllKeys();
    }
  };
  

// Only export in Node.js environment (e.g., for Jest tests)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { AppStorageManager };
}
