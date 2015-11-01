import { coroutine as _coroutine } from "bluebird";
var foo = _coroutine(function* () {
  var wat = yield bar();
});
