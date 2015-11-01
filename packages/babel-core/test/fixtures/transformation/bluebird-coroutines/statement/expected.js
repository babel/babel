import { coroutine as _coroutine } from "bluebird";

let foo = _coroutine(function* foo() {
  var wat = yield bar();
});
