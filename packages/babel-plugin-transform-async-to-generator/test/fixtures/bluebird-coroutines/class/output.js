var _coroutine = require("bluebird").coroutine;

class Foo {
  foo() {
    return _coroutine(function* () {
      var wat = yield bar();
    })();
  }

}
