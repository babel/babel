var _coroutine = require("bluebird").coroutine;
var foo = /*#__PURE__*/function () {
  var _foo = _coroutine(function* () {
    var wat = yield bar();
  });
  function foo() {
    return _foo.apply(this, arguments);
  }
  return foo;
}();
