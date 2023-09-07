var _coroutine = require("bluebird").coroutine;
var _foo;
function foo() {
  return (_foo = _foo || _coroutine(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
}
