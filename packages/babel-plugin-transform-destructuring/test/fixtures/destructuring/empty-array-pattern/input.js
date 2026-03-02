var [] = null;
var [] = 42;
var [] = {};
var [] = { [Symbol.iterator]: () => {} };

var [] = [];
var [] = [0, 1, 2];
var [] = "foo";
var [] = (function*() { throw new Error("Should not throw"); })();
var [] = { [Symbol.iterator]: () => ({}) };
var [] = { [Symbol.iterator]: () => () => {} };
var [] = { [Symbol.iterator]: async function*() {} };

// iterator.return should be called
var returnCalled = false;
var [] = {
  [Symbol.iterator]: () => {
    return {
      return: () => {
        returnCalled = true;
        return {};
      },
    };
  },
};

// #15154
var [] = { [Symbol.iterator]: () => [] };

// #15168
var [] = { [Symbol.iterator]: () => async function* () {} };
