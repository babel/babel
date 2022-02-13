(() => {
  "use strict";

  @dec
  class Foo {
    method() {}
  }
});

(() => {
  @dec
  class Foo {
    method() {}
  }
});
