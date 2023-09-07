var _coroutine = require("bluebird").coroutine;
var _bar;
var foo = function bar() {
  return (_bar = _bar || _coroutine(function* () {
    console.log(bar);
  })).apply(this, arguments);
};
