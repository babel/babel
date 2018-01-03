var _coroutine = require("bluebird").coroutine;

var foo = (0,
/*#__PURE__*/
function () {
  var _bar = _coroutine(function* () {
    console.log(bar);
  });

  return function bar() {
    return _bar.apply(this, arguments);
  };
}());
