import { coroutine as _coroutine } from "bluebird";
var foo = (function () {
  var ref = _coroutine(function* bar() {
    console.log(bar);
  });

  return function foo() {
    return ref.apply(this, arguments);
  };
})();
