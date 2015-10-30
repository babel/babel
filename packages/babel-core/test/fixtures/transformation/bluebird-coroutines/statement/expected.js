import { coroutine as _coroutine } from "bluebird";

let foo = function foo() {
  return _coroutine(function* foo() {
    var wat = yield bar();
  })();
};
