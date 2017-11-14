var _coroutine = require("bluebird").coroutine;

var foo =
/*#__PURE__*/
(() => {
  var _ref = _coroutine(function* () {
    console.log(bar);
  });

  function bar() {
    return _ref.apply(this, arguments);
  }

  return bar;
})();
