"use strict";

var log = [];

var SuperClass = require("module-which-exports-native-class");

class SubClass extends SuperClass {
  constructor() { log.push(4); super(); }
  method() { log.push(5); super.method(); }
  static method() { log.push(6); super.method(); }
}

new SubClass().method();
SubClass.method();

assert.deepEqual(log, [ 4, 1, 5, 2, 6, 3 ]);

// Magic function to avoid transpiling class
function require() {
  return eval(`(
    class SuperClass {
      constructor() { log.push(1); }
      method() { log.push(2); }
      static method() { log.push(3); }
    }
  )`);
}
