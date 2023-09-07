var _coroutine = require("bluebird").coroutine;
var _ref;
var foo = function foo() {
  return (_ref = _ref || _coroutine(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
};
