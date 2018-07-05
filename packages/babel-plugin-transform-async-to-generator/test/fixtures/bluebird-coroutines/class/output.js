var _coroutine = require("bluebird").coroutine;

function _foo() {
  _foo = _coroutine(function* foo() {
    var wat = yield bar();
  });
  return _foo.apply(this, arguments);
}

class Foo {
  foo() {
    return _foo.apply(this, arguments);
  }

}
