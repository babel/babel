var [] = null;
var [] = 42;
var [] = {};
var [] = { [Symbol.iterator]: function() {} };

var [] = [];
var [] = [0, 1, 2];
var [] = "foo";
var [] = (function*() { throw new Error("Should not throw"); })();
var [] = { [Symbol.iterator]: function() { return {}; } }
var [] = { [Symbol.iterator]: function() { return function() {}; } }
var [] = { [Symbol.iterator]: async function*() {} }
