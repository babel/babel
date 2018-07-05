var _coroutine = require("bluebird").coroutine;

function _wrapped() {
  _wrapped = _coroutine(function* () {
    var wat = yield bar();
  });
  return _wrapped.apply(this, arguments);
}

class Foo {
  foo() {
    return _wrapped.apply(this, arguments);
  }

}
