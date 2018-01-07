var _coroutine = require("bluebird").coroutine;

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _coroutine(function* () {
    var wat = yield bar();
  });
  return _foo.apply(this, arguments);
}
