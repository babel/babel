import { coroutine as _coroutine } from "bluebird";
var foo = (function () {
  var ref = _coroutine(function* () {
    console.log(bar);
  });

  return function bar() {
    return ref.apply(this, arguments);
  };
})();
