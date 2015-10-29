import { coroutine as _coroutine } from "bluebird";
var foo = function () {
  return _coroutine(function* () {
    var wat = yield bar();
  })();
};
