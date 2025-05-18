const localStorageWrapper = {
  getItem(key) {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem(key, value) {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem(key) {
    localStorage.removeItem(key);
    return Promise.resolve();
  },

  clear() {
    localStorage.clear();
    return Promise.resolve();
  },

  getAllKeys() {
    return Promise.resolve(Object.keys(localStorage));
  }
};

const sessionStorageWrapper = {
  getItem(key) {
    return Promise.resolve(sessionStorage.getItem(key));
  },

  setItem(key, value) {
    sessionStorage.setItem(key, value);
    return Promise.resolve();
  },

  removeItem(key) {
    sessionStorage.removeItem(key);
    return Promise.resolve();
  },

  clear() {
    sessionStorage.clear();
    return Promise.resolve();
  },

  getAllKeys() {
    return Promise.resolve(Object.keys(sessionStorage));
  }
};

const indexedDBWrapper = (() => {
  const dbName = 'StorageWrapperDB';
  const storeName = 'keyval';
  const dbVersion = 1;
  let db;

  function openDB() {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);

      const request = indexedDB.open(dbName, dbVersion);

      request.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      request.onsuccess = function (e) {
        db = e.target.result;
        resolve(db);
      };

      request.onerror = function (e) {
        reject(`IndexedDB error: ${e.target.errorCode}`);
      };
    });
  }

  function withStore(mode, callback) {
    return openDB().then(db => {
      try {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        return callback(store);
      }
      catch (err) {
        return Promise.reject(new Error(`Transaction error: ${err.message}`));
      }
    });
  }

  return {
    getItem(key) {
      return withStore('readonly', store =>
        new Promise((resolve, reject) => {
          const req = store.get(key);
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(new Error(`Failed to retrieve key "${key}"`)); 
          // reject(req.error);
        })
      );
    },

    setItem(key, value) {
      //return withStore('readwrite', store => store.put(value, key));
      return withStore('readwrite', store =>
        new Promise((resolve, reject) => {
          const req = store.put(value, key);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(new Error(`Failed to store key "${key}"`));
        })
      );
    },

    removeItem(key) {
      // return withStore('readwrite', store => store.delete(key));
      return withStore('readwrite', store =>
        new Promise((resolve, reject) => {
          const req = store.delete(key);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(new Error(`Failed to delete key "${key}"`));
        })
      );
    },

    clear() {
      // return withStore('readwrite', store => store.clear());
      return withStore('readwrite', store =>
        new Promise((resolve, reject) => {
          const req = store.clear();
          req.onsuccess = () => resolve();
          req.onerror = () => reject(new Error('Failed to clear IndexedDB store.'));
        })
      );
    },

    getAllKeys() {
      return withStore('readonly', store =>
        new Promise((resolve, reject) => {
          const req = store.getAllKeys();
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(new Error('Failed to retrieve all keys.')); 
          // reject(req.error);
        })
      );
    }
  };
})();

// Only export in Node.js environment (e.g., for Jest tests)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    localStorageWrapper, 
    sessionStorageWrapper, 
    indexedDBWrapper,                          
  };
}
