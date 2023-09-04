var _coroutine = require("bluebird").coroutine;
var _ref;
var foo = function bar() {
  return (_ref = _ref || _coroutine(function* () {
    console.log(bar);
  })).apply(this, arguments);
};
