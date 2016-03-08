import { coroutine as _coroutine } from "bluebird";

let foo = (() => {
  var ref = _coroutine(function* () {
    var wat = yield bar();
  });

  return function foo() {
    return ref.apply(this, arguments);
  };
})();
