var _coroutine = require("bluebird").coroutine;
function foo() {
  return (foo = _coroutine(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
}
