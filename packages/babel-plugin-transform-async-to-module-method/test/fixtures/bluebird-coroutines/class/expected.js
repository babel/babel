import { coroutine as _coroutine } from "bluebird";
class Foo {
  foo() {
    return _coroutine(function* foo() {
      var wat = yield bar();
    }).call(this);
  }
}
