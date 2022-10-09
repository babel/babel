var a = (() => [2, 3])();

// !!! In order to run this test, this shouldn't be optimized using type inference
// If it's optimized and doesn't call toConsumableArray, please modify this test
// and exec.js
[1].concat(babelHelpers.toConsumableArray(a));
