var incPromise = x => Promise.resolve(x + 1);

var double = x => x * 2;

var result =
/*#__PURE__*/
function () {
  var _ref = babelHelpers.asyncToGenerator(function* () {
    var _;

    return _ = 10, yield (0, incPromise)(_);
  });

  return function result() {
    return _ref.apply(this, arguments);
  };
}();

var result2 =
/*#__PURE__*/
function () {
  var _ref2 = babelHelpers.asyncToGenerator(function* () {
    var _ref3, _2;

    return _ref3 = (_2 = 10, yield (0, incPromise)(_2)), double(_ref3);
  });

  return function result2() {
    return _ref2.apply(this, arguments);
  };
}();

function* foo() {
  var _3;

  return _3 = 42, (yield 10)(_3);
}
