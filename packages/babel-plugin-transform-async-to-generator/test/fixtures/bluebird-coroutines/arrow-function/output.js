var _coroutine = require("bluebird").coroutine;

function _wrapped() {
  _wrapped = _coroutine(function* () {
    yield foo();
  });
  return _wrapped.apply(this, arguments);
}

(function () {
  return _wrapped.apply(this, arguments);
})();
