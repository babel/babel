var _coroutine = require("bluebird").coroutine;

var foo = (0,
/*#__PURE__*/
function () {
  var _ref = _coroutine(function* () {
    var wat = yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
}());
