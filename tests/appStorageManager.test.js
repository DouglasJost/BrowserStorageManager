
const { AppStorageManager } = require('../src/appStorageManager');
  
// Setup for IndexedDB.  Allow indexedDBWrapper to use mocked IndexedDB in Node.js
const { indexedDB, IDBKeyRange } = require('fake-indexeddb');
global.indexedDB = indexedDB;
global.IDBKeyRange = IDBKeyRange;
  
// Polyfill structuredClone for fake-indexeddb compatibility
const structuredClone = require('structured-clone');
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = structuredClone;
}


describe('AppStorageManager', () => {
  beforeEach(() => {
    AppStorageManager.setStorageType('sessionStorage');
  });

  test('sets and gets item from sessionStorage', async () => {
    AppStorageManager.setStorageType('sessionStorage');
    await AppStorageManager.setItem('foo', 'bar');
    const value = await AppStorageManager.getItem('foo');
    expect(value).toBe('bar');
    await AppStorageManager.removeItem('foo');
  });

  test('sets and gets item from localStorage', async () => {
    AppStorageManager.setStorageType('localStorage');
    await AppStorageManager.setItem('alpha', 'beta');
    const value = await AppStorageManager.getItem('alpha');
    expect(value).toBe('beta');
    await AppStorageManager.removeItem('alpha');
  });

  test('sets and gets item from indexedDB', async () => {
    AppStorageManager.setStorageType('indexedDB');
    await AppStorageManager.setItem('x', 'y');
    const value = await AppStorageManager.getItem('x');
    expect(value).toBe('y');
    await AppStorageManager.removeItem('x');
  });

  test('clear removes all keys', async () => {
    AppStorageManager.setStorageType('sessionStorage');
    await AppStorageManager.setItem('a', '1');
    await AppStorageManager.setItem('b', '2');
    await AppStorageManager.clear();
    const keys = await AppStorageManager.getAllKeys();
    expect(keys).toEqual([]);
  });

  test('storageDisplayType is updated correctly', () => {
    AppStorageManager.setStorageType('localStorage');
    expect(AppStorageManager.storageDisplayType).toBe('Local');
    AppStorageManager.setStorageType('sessionStorage');
    expect(AppStorageManager.storageDisplayType).toBe('Session');
    AppStorageManager.setStorageType('indexedDB');
    expect(AppStorageManager.storageDisplayType).toBe('IndexedDB');
  });
});
  