expect(function () {
  var [] = null;
}).toThrow("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");

expect(function () {
  var [] = 42;
}).toThrow("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");

expect(function () {
  var [] = {};
}).toThrow("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");

expect(function () {
  var [] = { [Symbol.iterator]: function() {} };
}).toThrow("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");

expect(function () {
  var [] = [];
  var [] = [0, 1, 2];
  var [] = "foo";
  var [] = (function*() { throw new Error("Should not throw"); })();
  var [] = { [Symbol.iterator]: function() { return {}; } }
  var [] = { [Symbol.iterator]: function() { return function() {}; } }
  var [] = { [Symbol.iterator]: async function*() {} }
}).not.toThrow();

var returnCalled = false;
var [] = {
  [Symbol.iterator]: function() {
    return {
      return: function() {
        returnCalled = true;
        return {};
      }
    };
  }
};
expect(returnCalled).toStrictEqual(true);
