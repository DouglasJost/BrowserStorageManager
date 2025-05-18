// Tests/storageWrapper.test.js

const { 
  localStorageWrapper, 
  sessionStorageWrapper, 
  indexedDBWrapper 
} = require('../src/storage/storageWrapper.js');

// Setup for IndexedDB.  Allow indexedDBWrapper to use mocked IndexedDB in Node.js
const { indexedDB, IDBKeyRange } = require('fake-indexeddb');
global.indexedDB = indexedDB;
global.IDBKeyRange = IDBKeyRange;

// Polyfill structuredClone for fake-indexeddb compatibility
const structuredClone = require('structured-clone');
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = structuredClone;
}

describe('localStorageWrapper', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('setItem and getItem should work correctly', async () => {
    await localStorageWrapper.setItem('testKey', 'testValue');
    const result = await localStorageWrapper.getItem('testKey');
    expect(result).toBe('testValue');
  });

  test('removeItem should delete a key', async () => {
    await localStorageWrapper.setItem('keyToRemove', 'value');
    await localStorageWrapper.removeItem('keyToRemove');
    const result = await localStorageWrapper.getItem('keyToRemove');
    expect(result).toBeNull();
  });

  test('clear should remove all keys', async () => {
    await localStorageWrapper.setItem('key1', 'value1');
    await localStorageWrapper.setItem('key2', 'value2');
    await localStorageWrapper.clear();
    const keys = await localStorageWrapper.getAllKeys();
    expect(keys).toHaveLength(0);
  });
});


describe('sessionStorageWrapper', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('setItem and getItem', async () => {
      await sessionStorageWrapper.setItem('sKey', 'sValue');
      const value = await sessionStorageWrapper.getItem('sKey');
      expect(value).toBe('sValue');
  });

  test('removeItem', async () => {
      await sessionStorageWrapper.setItem('sKey', 'sValue');
      await sessionStorageWrapper.removeItem('sKey');
      const value = await sessionStorageWrapper.getItem('sKey');
      expect(value).toBeNull();
  });

  test('clear', async () => {
      await sessionStorageWrapper.setItem('a', '1');
      await sessionStorageWrapper.setItem('b', '2');
      await sessionStorageWrapper.clear();
      const keys = await sessionStorageWrapper.getAllKeys();
      expect(keys.length).toBe(0);
  });
});


describe('indexedDBWrapper', () => {
  beforeEach(async () => {
    await indexedDBWrapper.clear(); // ensure clean state
  });

  test('setItem and getItem', async () => {
    await indexedDBWrapper.setItem('idbKey', 'idbValue');
    const result = await indexedDBWrapper.getItem('idbKey');
    expect(result).toBe('idbValue');
  });

  test('removeItem', async () => {
    await indexedDBWrapper.setItem('idbKey', 'toBeRemoved');
    await indexedDBWrapper.removeItem('idbKey');
    const result = await indexedDBWrapper.getItem('idbKey');
    expect(result).toBeUndefined();
  });

  test('clear', async () => {
    await indexedDBWrapper.setItem('idb1', 'val1');
    await indexedDBWrapper.setItem('idb2', 'val2');
    await indexedDBWrapper.clear();
    const keys = await indexedDBWrapper.getAllKeys();
    expect(keys.length).toBe(0);
  });
});
