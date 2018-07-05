var _coroutine = require("bluebird").coroutine;

function _bar() {
  _bar = _coroutine(function* bar() {
    console.log(bar);
  });
  return _bar.apply(this, arguments);
}

var foo = function bar() {
  return _bar.apply(this, arguments);
};
