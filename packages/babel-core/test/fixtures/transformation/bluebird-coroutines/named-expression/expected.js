import { coroutine as _coroutine } from "bluebird";
var foo = function () {
  return _coroutine(function* bar() {
    console.log(bar);
  })();
};

foo();
