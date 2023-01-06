expect(() => {
  var [] = null;
}).toThrow(TypeError);

expect(() => {
  var [] = 42;
}).toThrow(TypeError);

expect(() => {
  var [] = {};
}).toThrow(TypeError);

expect(() => {
  var [] = { [Symbol.iterator]: () => {} };
}).toThrow(TypeError);

expect(() => {
  var [] = [];
  var [] = [0, 1, 2];
  var [] = "foo";
  var [] = (function*() { throw new Error("Should not throw"); })();
  var [] = { [Symbol.iterator]: () => ({}) };
  var [] = { [Symbol.iterator]: () => () => {} };
  var [] = { [Symbol.iterator]: async function*() {} };
}).not.toThrow();

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
expect(returnCalled).toStrictEqual(true);

// #15154
expect(() => {
  var [] = { [Symbol.iterator]: () => [] };
}).not.toThrow();

// #15168
expect(() => {
  var [] = { [Symbol.iterator]: () => async function* () {} };
}).not.toThrow();
