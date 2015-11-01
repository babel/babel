import { coroutine as _coroutine } from "bluebird";

let foo = _coroutine(function* foo(bar) {
  yield baz(bar);
});
