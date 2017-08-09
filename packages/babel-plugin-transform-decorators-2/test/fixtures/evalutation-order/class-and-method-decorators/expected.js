const calls = [];

function classDec(constructor, heritage, elements) {
  calls.push("classDec evaluated");
  return {
    constructor,
    elements,
    finishers: []
  };
}

function methDec(descriptor) {
  calls.push("methDec evaluated");
  return {
    descriptor,
    extras: [],
    finishers: []
  };
}

let A = babelHelpers.decorate(class A {
  constructor() {
    calls.push("ctor called");
  }

  method1() {
    calls.push("method1 called");
  }

}, [], [["method1", [methDec]]], void 0)([classDec]);
assert.deepEqual(["methDec evaluated", "classDec evaluated"], calls);