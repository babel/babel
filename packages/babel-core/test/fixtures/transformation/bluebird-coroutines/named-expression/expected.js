import { coroutine as _coroutine } from "bluebird";
var foo = _coroutine(function* bar() {
  console.log(bar);
});

foo();
