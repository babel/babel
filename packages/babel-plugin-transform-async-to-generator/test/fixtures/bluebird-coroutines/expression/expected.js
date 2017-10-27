var _coroutine = require("bluebird").coroutine;

var foo = (() => {
  var _ref = _coroutine(function* () {
    var wat = yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();
