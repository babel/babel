var _coroutine = require("bluebird").coroutine;

var foo = (() => {
  var _ref = _coroutine(function* () {
    console.log(bar);
  });

  function bar() {
    return _ref.apply(this, arguments);
  }

  return bar;
})();
