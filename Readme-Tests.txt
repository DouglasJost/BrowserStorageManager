Setting up test environment.

If the steps below are be completed, then run "npm install" from the application
root folder.



Step 1     : Initialize package.json.
Command    : npm init -y
Description: Creates a default package.json file.


Step 2     : Install testing dependencies
Command    : npm install --save-dev jest
Description: Install Jest, JavaScript testing framework to run unit tests.


Step 3     : Install dependencies for running tests in a browser
Command    : npm install --save-dev jsdom
Description: Install jsdom, which simulates a browser environment (DOM APIs).
             Basically, provides a "fake browser" for test code that
             interacts with the DOM or browser APIs.

Step 3A    : Install jest-environment-jsdom 
Command    : npm install --save-dev jest-environment-jsdom


Step 4     : Configure Jest
Command    : Create a jest.config.js file.


Step 5     : Create jest.setup.js
Command    : Create file.
Description: Provide default mock implementations.


Step 6     : Install fake-indexeddb
Command    : npm install --save-dev fake-indexeddb
Description: Need to mock indexedDB, which emulates the indexedDB API.


Step 7     : Install structured-clone (Full Polyfill)
Command    : npm install --save-dev structured-clone


Step 8     : Create tests for localStorageWrapper, sessionStorageWrapper, and indexedDBWrapper.
Command    : Add tests to Tests/storageWrapper.test.js


Step 9     : Export localStorageWrapper, sessionStorageWrapper, and indexedDBWrapper.
Description: At the end of storageWrapper.js, add 
               module.exports = {
                 localStorageWrapper, 
                 sessionStorageWrapper, 
                 indexedDBWrapper,                          
               };

Step 10    : Make sure global.indexedDB, global.IDBKeyRange, and global.structuredClone are
             initialized to mock IndexedDB.
Description: Include the following code at the top of storageWrapper.test.js 

              const { localStorageWrapper, sessionStorageWrapper, indexedDBWrapper } = require('../storageWrapper.js');

              // Allow indexedDBWrapper to use mocked IndexedDB in Node.js
              const { indexedDB, IDBKeyRange } = require('fake-indexeddb');
              global.indexedDB = indexedDB;
              global.IDBKeyRange = IDBKeyRange;

              // Polyfill structuredClone for fake-indexeddb compatibility
              const structuredClone = require('structured-clone');
              if (typeof global.structuredClone === 'undefined') {
                global.structuredClone = structuredClone;
              }


Step 11    : Export AppStorageManger.
Description: At the end of appStorageManager.js, add
               module.exports = {
                 AppStorageManager,
               };


Step 9     : Run tests.
Command    : npm jest