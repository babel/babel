"use strict";

const foo = {
  bar() {
    return this;
  }

};
(foo === null || foo === void 0 ? foo.bar.bind(foo) : foo.bar)();
